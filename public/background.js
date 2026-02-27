import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth/web-extension";

chrome.storage.local.set({ trustedEmails: JSON.stringify([
    "@notification.capitalone.com",
    "@notification.capitalone.com",
    "@amazon.com",
    "@amazon.co.uk",
    "@amazon.de",
    "@amazon.co.jp",
    "@amazonaws.com",

    "@apple.com",

    "@google.com",
    "@googlemail.com",
    "@youtube.com",

    "@microsoft.com",
    "@linkedin.com",
    "@github.com",

    "@meta.com",
    "@facebook.com",
    "@instagram.com",
    "@whatsapp.com",

    "@netflix.com",
    "@spotify.com",
    "@adobe.com",
    "@dropbox.com",

    "@stripe.com",
    "@paypal.com",
    "@squareup.com",
    "@block.xyz",

    "@visa.com",
    "@mastercard.com",
    "@americanexpress.com",

    "@chase.com",
    "@bankofamerica.com",
    "@wellsfargo.com",
    "@citi.com",
    "@capitalone.com",

    "@shopify.com",
    "@etsy.com",
    "@ebay.com",

    "@openai.com",
    "@cloudflare.com",
    "@digitalocean.com",
    "@vercel.com",
    "@netlify.com",
    "@heroku.com",

    "@atlassian.com",
    "@slack.com",
    "@notion.so",
    "@figma.com",

    "@sendgrid.com",
    "@twilio.com",

    "@ups.com",
    "@fedex.com",
    "@dhl.com",
    "@usps.gov"

])})

const isSafeSender = (email, safeDomains) => {
  const lower = email.toLowerCase();
  return safeDomains.some(domain => lower.endsWith(domain));
}

const firebaseConfig = {
  apiKey: "AIzaSyA4qapwIDQwMuO8UWtDz-w_FgKbp8gFhDI",
  authDomain: "scamcheck-d55fc.firebaseapp.com",
  projectId: "scamcheck-d55fc",
  storageBucket: "scamcheck-d55fc.firebasestorage.app",
  messagingSenderId: "361981539688",
  appId: "1:361981539688:web:a3fc69c4bec72086b112dd",
  measurementId: "G-2B5EJ9BSVB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const functions = getFunctions(app, 'us-east4')

let scanned = 0
let cautioned = 0;
let warned = 0;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is logged in
    const token = await user.getIdToken(true); // 🔑 forces refresh
    await chrome.storage.local.set({ token });
  } else {
    // User is logged out
    chrome.storage.local.remove("token");
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "generateReply") {
        const { emailAddress, emailText, links, userPrompt, attachments, bypass, tabIdVal } = message;
        const tabId = tabIdVal ? tabIdVal.id : sender.tab.id

        // Ensure async response by returning true
        generateAIReply(emailAddress, emailText, links, userPrompt, attachments, bypass, tabId, sendResponse);
        return true; 
    }
    if (message.action === "scanUrl") {
        const { url } = message;

        // Ensure async response by returning true
        scanUrl(url, sendResponse);
        return true; 
    }
    if (message.action === "signUp") {
        const { email, password } = message;

        // Ensure async response by returning true
        signUp(email, password, sendResponse);
        return true; 
    }
    
    if (message.action === "signIn") {
        const { email, password } = message;

        // Ensure async response by returning true
        signIn(email, password, sendResponse );
        return true  
    }
    if (message.action === "signOut") {

        // Ensure async response by returning true
        signOutUser(sendResponse);
        return true  
    }
    if (message.action === "checkToken") {
        const { token } = message;

        // Ensure async response by returning true
        checkToken(token, sendResponse);
        return true  
    }
    if(message.action === "initUserDetails") {
        updateDetails(sendResponse)
        return true
    }
    if (message.action === "upgradePlan") {

        // Ensure async response by returning true
        upgradePlan(sendResponse);
        return true  
    }
    if (message.action === "managePlan") {

        // Ensure async response by returning true
        managePlan(sendResponse);
        return true  
    }

    if(message.action === "setStart") {
        // Ensure async response by returning true
        setStart(sendResponse);
        return true  
    }
    if(message.action === "setStop") {
        // Ensure async response by returning true
        setStop(sendResponse);
        return true  
    }
});

async function signUp(email, password, sendResponse) {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        
        const user = userCredential.user;
        const token = await user.getIdToken();
        
        // Send token to backend to create Firestore profile
        await fetch("https://api-ix3qevgnuq-uk.a.run.app/create-user", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        
        chrome.storage.local.set({ token: token })
        chrome.storage.local.set({ scan: true })

        initUserDetails()
        
        sendResponse({ res: "Success" });
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            sendResponse({ res: `Account already exists. Please sign in..` });
        } else {
            sendResponse({ res: `Error signing up. Please try again.` });
        }
    }
}

async function signIn(email, password, sendResponse) {

    try {
        await signInWithEmailAndPassword(
            auth, 
            email, 
            password
        ).then(async cred => {
            const user = cred.user;
            const token = await user.getIdToken();
            
            chrome.storage.local.set({ token: token })
            
            initUserDetails()
            
        }).catch(error => {
            throw new Error(`${error}`);
        });
        
        sendResponse({ res: "Success" });
    } catch (error) {
        sendResponse({ res: `Error signing in. Please try again.${error}` });
    }
}

async function signOutUser(sendResponse) {
    try {
        signOut(auth).then(() => {
            chrome.storage.local.set({ token: null })
            chrome.storage.local.set({ username: null })
            chrome.storage.local.set({ scan: false })
            chrome.storage.local.set({ credits: 0 })
            chrome.storage.local.set({ plan: "free" })
            chrome.storage.local.set({ cancel: false })
            chrome.storage.local.set({ cancelDate: "" })
            chrome.storage.local.set({ responseList: JSON.stringify([]) })

            return "Success"
        })
        sendResponse({ res: "Success" });
    } catch (error) {
        sendResponse({ res: `Error: ${error}, Please try again.` });
    }
}

async function setStart(sendResponse) {
    try {
        chrome.storage.local.set({ scan: true })

        chrome.action.setIcon({
            path: "img/logo-small.png"
        });

        sendResponse({ res: "Success" });
    } catch (error) {
        sendResponse({ res: `Error: ${error}` });
    }
}

async function setStop(sendResponse) {
    try {
        chrome.storage.local.set({ scan: false })

        chrome.action.setIcon({
            path: "img/logo-small-paused.png"
        });

        sendResponse({ res: "Success" });
    } catch (error) {
        sendResponse({ res: `Error: ${error}` });
    }
}


const initUserDetails = async () => {
    const authUser = auth.currentUser;
    if(!authUser) {
        return 
    }
    
    const user = await getUserData()

    chrome.storage.local.set({ username: user.email })
    chrome.storage.local.set({ credits: user.credits })
    chrome.storage.local.set({ plan: user.plan })
    chrome.storage.local.set({ cancel: user.cancel })
    chrome.storage.local.set({ cancelDate: firestoreTimestampToString(user.cancelDate) }) 
}

const updateDetails = async (sendResponse) => {
    await initUserDetails()

    sendResponse({ res: "Success"})
}

async function checkToken(token, sendResponse) {
    try {
        const authUser = auth.currentUser;
        if(!authUser || !token) {
            return "Error"
        }
        
        const refreshToken = await authUser.getIdToken();
        chrome.storage.local.set({ token: refreshToken })

        sendResponse({ res: "Success" });
    } catch (error) {
        sendResponse({ res: `Error checking token, Please try again. ${error}` });
    }
}

async function getUserData() {
    const { token } = await chrome.storage.local.get("token");

    const res = await fetch("https://api-ix3qevgnuq-uk.a.run.app/get-user-data", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await res.json()

    return data;
}

async function getUserUID() {
    const { token } = await chrome.storage.local.get("token");

    const res = await fetch("https://api-ix3qevgnuq-uk.a.run.app/get-user-uid", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await res.json()

    return data;
}

const checkCredits = async () => {
    const user = await getUserData()

    if(user.credits > 0 || user.plan === "pro") {
        return true
    }
    return false
}


const upgradePlan = async (sendResponse) => {
    try {
        const { token } = await chrome.storage.local.get("token");
        const res = await fetch("https://api-ix3qevgnuq-uk.a.run.app/upgrade-plan", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        const data = await res.json()

        initUserDetails()
        
        sendResponse({ res: "Success", url: data.url });
    } catch (error) {
        sendResponse({ res: `Error: ${error}` });   
    }

}

const managePlan = async (sendResponse) => {
    try {
        const uid = getUserUID()
        const functionRef = httpsCallable(functions, 'ext-firestore-stripe-payments-createPortalLink');

        const { data } = await functionRef({
            customerId: uid,
            returnUrl: "https://api-ix3qevgnuq-uk.a.run.app/manage-plan-success",
            configuration: "bpc_1StLe62LGH0KWWEEhC0CPx1u", // Optional ID of a portal configuration: https://stripe.com/docs/api/customer_portal/configuration
        });

        initUserDetails()

        sendResponse({ res: "Success", url: data.url });
    } catch (error) {
        sendResponse({ res: `Error: ${error}` });   
    }
}


// Separate async function for handling API call
async function generateAIReply(emailAddress, emailText, links, userPrompt, attachments, bypass, tabId, sendResponse) {
    let { scan } = await chrome.storage.local.get(["scan"])
    
    if(!scan && !bypass) {
        sendResponse({ res: "Message: Background scan is turned off." })
        return;
    }

    let userHasCredits = await checkCredits()

    if(!userHasCredits) {
        sendResponse({ res: "Message: No credits left today. Scan tomorrow or upgrade to Pro for unlimited credits." })
        return;
    }

    let { trustedEmails } = await chrome.storage.local.get(["trustedEmails"])
    if(isSafeSender(emailAddress, JSON.parse(trustedEmails))) {
        sendResponse({ res: "Message: Safe sender." })
        return;
    }

    try {
        chrome.action.setIcon({
            tabId,
            path: "img/icons/scanning.png"
        });

        const aiReply = await getAIResponse(emailAddress, emailText, userPrompt, links, attachments);
        
        let tempReply = JSON.parse(aiReply)
        tempReply["email"] = emailText
        tempReply["datetime"] = new Date().toLocaleString()
 
        let list = await chrome.storage.local.get(["responseList"])
        list = list.responseList
        if(JSON.stringify(list) === '{}')
            chrome.storage.local.set({ responseList: JSON.stringify([JSON.stringify(tempReply)]) })
        else
            chrome.storage.local.set({ responseList: JSON.stringify([...JSON.parse(list), JSON.stringify(tempReply)]) })

        if (tempReply.scam_rating > 7) {
            warned++
        } else if (tempReply.scam_rating > 4) {
            cautioned++
        } 
        scanned++

        if(warned > 0) {
            // Set the badge text
            chrome.action.setBadgeText({
                text: `${warned}`,      // number of warned
                tabId: tabId
            });
            // Set badge color
            chrome.action.setBadgeBackgroundColor({
                color: "rgb(255, 0, 0)",
                tabId: tabId
            });
            chrome.action.setBadgeTextColor({ color: '#101010' });
        } else if (cautioned > 0) {
            // Set the badge text
            chrome.action.setBadgeText({
                text: `${cautioned}`,      // number of cautioned
                tabId: tabId
            });
            // Set badge color
            chrome.action.setBadgeBackgroundColor({
                color: "rgb(255, 255, 0)",
                tabId: tabId
            });
            chrome.action.setBadgeTextColor({ color: '#101010' });
        } else {
            // Set the badge text
            chrome.action.setBadgeText({
                text: `${scanned}`,      // number of scanned
                tabId: tabId
            });
            // Set badge color
            chrome.action.setBadgeBackgroundColor({
                color: "#282828",
                tabId: tabId
            });
            chrome.action.setBadgeTextColor({ color: '#FFFFFF' });
        }

        chrome.action.setIcon({
            tabId,
            path: "img/logo-small.png"
        });

        initUserDetails()

        sendResponse({ res: JSON.stringify(tempReply) });
    } catch (error) {
        sendResponse({ res: `Error: ${error}` });
    }
}

async function getAIResponse(emailAddress, emailText, userPrompt, links, attachments) {

    const { token } = await chrome.storage.local.get("token");

    const attachmentScores = await scanFiles(attachments)

    const res = await fetch("https://api-ix3qevgnuq-uk.a.run.app/fetch-scam-rating", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "userPrompt": userPrompt,
            "emailAddress": emailAddress,
            "emailText": emailText,
            "links": links,
            "attachmentScores": attachmentScores
        })
    })

    let response = await res.json()

    const tempRes = JSON.parse(response)
    if(tempRes.properties) {
        response = JSON.stringify(tempRes.properties)
    }

    return response

}

const scanUrl = async (url, sendResponse) => {
    const { token } = await chrome.storage.local.get("token");

    const res = await fetch("https://api-ix3qevgnuq-uk.a.run.app/scan-url", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "url": url
        })
    })

    let response = await res.json()

    sendResponse(response)
}

const scanFiles = async (attachmentsList) => {
    let filesResults = []
    
    const attachments = await getAttachments(attachmentsList)
    
    await Promise.all(attachments.map( async (row) => {
        try {
            const fileScan = await getFileScan(row) 
            if(fileScan)
                filesResults.push({
                filename: row.filename,
                response: fileScan
            })
        } catch (error) {
            return []
        }
    }));
    
    return filesResults

}



const getFileScan = async (file) => {

    try {
        const textResponse = await getFileText(file.base64)
        
        if(textResponse === "" && textResponse === null) {
            return false
        }
        
        const { token } = await chrome.storage.local.get("token");
        
        const res = await fetch("https://api-ix3qevgnuq-uk.a.run.app/scan-text", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "text": textResponse
            })
        })
        
        let response = await res.json()

        const tempRes = JSON.parse(response)
        if(tempRes.properties) {
            response = JSON.stringify(tempRes.properties)
        }
                
        return JSON.parse(response)
    } catch (error) {
        return false
    }
}

const getFileText = async (base64) => {
    const { token } = await chrome.storage.local.get("token");

    const res = await fetch("https://api-ix3qevgnuq-uk.a.run.app/parse-pdf", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "file": base64,
        })
    })

    const response = await res.json()

    return response.text;
}

const getAttachments = async (attachmentUrls) => {
    const attachments = []
    await Promise.all(attachmentUrls.map(async (u) => {
        try {
            const base64 = await downloadAttachment(u.url)
    
            if(base64) {
                attachments.push({filename:u.filename, base64: base64})
            }
        } catch (error) {
            return false
        }
    }))
    return attachments
}

const downloadAttachment = async (url) => {
    try {
        const res = await fetch(url, {
            credentials: "include" // IMPORTANT: Gmail requires cookies
        });
        const blob = await res.blob();

        if (!blob || blob.size === 0) {
            throw new Error("Attachment download failed or empty file");
        }

        const arrayBuffer = await blob.arrayBuffer()

        const base64 = arrayBufferToBase64(arrayBuffer)

        return base64

    } catch (error) {
        return false
    }
}






function firestoreTimestampToString(ts) {
    if(ts === "" || ts === null || ts === undefined)
        return ""
    const milliseconds = ts._seconds * 1000 + ts._nanoseconds / 1_000_000;
    const date = new Date(milliseconds);
    return date.toLocaleString(); // or .toISOString()
}

function arrayBufferToBase64(arrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(arrayBuffer);
  const chunkSize = 0x8000; // prevent call stack overflow

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.slice(i, i + chunkSize));
  }

  return btoa(binary);
}