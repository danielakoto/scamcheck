const ALLOWED_TYPES = [
  "application/pdf"
];
const SAFE_BUTTONS = [
   "https://mail.google.com/mail/u/1",
   "https://support.google.com/mail",
   "https://drive.google.com/u/1",
   "https://www.google.com/intl",
   "https://www.google.com/gmail",
   "https://accounts.google.com/SignOutOptions",
   "#inbox"
]

function isAllowedFile(filename) {
  const allowed = [".pdf", ".doc", ".docx", ".txt"];
  const lower = filename.toLowerCase();
  return allowed.some(ext => lower.endsWith(ext));
}

(() => {
   // Function to detect the email body
   function getEmailBody() {
      let emailBody = "";
      
      // Gmail
      let gmailList = document.querySelectorAll("div.adn.ads .gs");
      let gmailBody = gmailList[gmailList.length-1]
      if (gmailBody) 
         emailBody = gmailBody.innerText;
   
      return emailBody.trim();
   }

   function getEmailAddress() {
      let emailAddress = document.querySelector("span[class='qu yKyxu'] span[email]")

      if(emailAddress)
         return emailAddress.getAttribute('email') ;

      return null
   }

   function getGmailAttachments() {
      let email = getEmailBody()

      if(email === "" || email === null)
         return [] 

      const attachmentList = [];
      const attachmentUrls = []

      // Gmail attachment containers
      const attachmentNodes = document.querySelectorAll('div[role="listitem"], div.aQH, div.aZo');

      attachmentNodes.forEach(node => {
         const fileNameEl = node.querySelector('.aV3, .aQA, .a3I, .aV3');
         const downloadBtn = node.querySelector('a');

         if(fileNameEl === null || fileNameEl === "")
            return

         if (!isAllowedFile(fileNameEl.innerText)) {
            return;
         }

         if (fileNameEl && downloadBtn) {
            attachmentList.push({
               name: fileNameEl.innerText,
               element: node,
               downloadElement: downloadBtn
            });
         }
      });

      
      attachmentList.forEach(node => {
         const url = getAttachmentDownloadUrl(node.downloadElement)
         
         if(url?.includes("https://mail.google.com/mail"))
            attachmentUrls.push({filename: node.name, url: url})
      })

      return attachmentUrls

   }

   function getAttachmentDownloadUrl(node) {
      if (node.href) return node.href;

      let link = node.querySelector("a[href]")

      if (link) return link.href;

      return false
   }

   const getEmailLinks = () => {
      // const links = [...document.querySelectorAll("a")]
      //    .map(a => ({
      //       text: a.textContent.trim(),
      //       href: a.getAttribute("href")
      // }));

      const links = []

      document.querySelectorAll("a").forEach(a => {
         if(
            a.getAttribute("href") !== null &&
            a.getAttribute("href") !== "" &&
            !a.getAttribute("href").includes(SAFE_BUTTONS[0]) &&
            !a.getAttribute("href").includes(SAFE_BUTTONS[1]) &&
            !a.getAttribute("href").includes(SAFE_BUTTONS[2]) &&
            !a.getAttribute("href").includes(SAFE_BUTTONS[3]) &&
            !a.getAttribute("href").includes(SAFE_BUTTONS[4]) &&
            !a.getAttribute("href").includes(SAFE_BUTTONS[5]) &&
            !a.getAttribute("href").includes(SAFE_BUTTONS[6]) 
         ) {
            links.push({
               text: a.textContent.trim(),
               href: a.getAttribute("href")
            })
         }
      })

      return links
   }

   const hasLink = (url) => {
      SAFE_BUTTONS.forEach((link) => {
         if(url.includes(link))
            return true
      })
      return false
   } 

   // Listen for messages from the background or popup script
   try {
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
         if (message.action === "getEmail") {
            // chrome.storage.local.set({ emailBody: getEmailBody() });
            // chrome.storage.local.set({ emailAddress: getEmailAddress() });
            // chrome.storage.local.set({ attachments: getGmailAttachments() });
            
            sendResponse({ emailBody: getEmailBody(), emailAddress: getEmailAddress(), links: getEmailLinks(), attachments: getGmailAttachments() });
         }
      });
   } catch (error) {
      console.warn(`ScamCheck could not establish connection. Receiving end does not exist. Error: ${error}`);
   }

   // Portion to have automatic observer that checks to see f an email is in view and scan for scam.
   let debounceTimer = null;
   let scannedList = []
      
   const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
         const emailText = getEmailBody()
         if (emailText === undefined || emailText === '') {
            return;
         }

         const emailAddress = getEmailAddress()
         const attachments = getGmailAttachments()
         const userPrompt = ""

         if(scannedList.includes(emailText.substring(1,50))) {
            return;
         } else {
            scannedList.push(emailText.substring(1,50))
         }

         const links = []

         // Extract images
         // const images = [...document.querySelectorAll("img")]
         //    .map(img => img.getAttribute("src"));

         try {
            const bypass = false
            const tabIdVal = false

            // chrome.runtime.sendMessage(
            //    { action: "scanFiles", attachments }
            // );
            
            chrome.runtime.sendMessage(
               { action: "generateReply", emailAddress, emailText, links, userPrompt, attachments, bypass, tabIdVal }
            );
         } catch (error) {
            console.warn(`ScamCheck extension context invalidated, retry later. Error: ${error}`);
         }
      }, 500);
   });
   
   observer.observe(document.body, {
      childList: true,
      subtree: true
   });
})();