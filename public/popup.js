const version = "1.3"

const appHTML = `
    <div id="app">
        <div id="app-content">
            <div id="email-preview">
                <div id="user-prompt-container">
                    <input id="user-prompt" class="input-style" type="text" placeholder="Enter something ScamCheck should know about this email.." maxlength="90"/>
                </div>
                <textarea id="email-text" class="textarea-style" placeholder="Loading..."></textarea>
                <button id="scam-check" class="button-style">Run Scam Checker</button>
                <div id="attachments" class="input-style"><img id="attachment" src="img/icons/attachment.png" alt="attachment."><span id="attachments-text">No Attachments Detected</span></div>
            </div>
            <div id="ai-reply-section">
                <div id="ai-reply-container">
                    <div id="ai-reply"></div>
                </div>
            </div>
        </div>
        <div id="app-footer">
            <img id="hint" src="img/icons/hint.png" alt="close.">
        </div>
        <div id="app-modal" style="display: none;">
            <div id="app-modal-content">
            <div class="modal-head"><h1>Info</h1><img id="close-modal" src="img/icons/close.png" alt="close."></div>
                <p><strong>ScamCheck</strong> scans your email as you view them in your <strong>Gmail</strong> with background scanning on.</p>
                <div id="background-scanning-notification">Background scanning is currently turned off.</div>
                <p>You can <strong>Paste</strong> emails or text here and click Run Scam Checker to scan emails.</p>
                <p>We do not save any of your emails or data included in the emails.</p>
                <p>After scan, ScamCheck response is stored on your computer locally.</p>
                <p>Users get <strong>10</strong> daily scans on the <strong>Free</strong> plan and <strong>Unlimited</strong> on the <strong>Pro</strong> plan.</p>
                <p>Each attachment in an email costs <strong>1</strong> credit alongside <strong>1</strong> credit for the email.</p>
                <div id="app-bg-info">Click the <img src="img/icons/play.png" alt="Start scanning." style="height:15px; width:15px;"/> button to activate background checks as you browse your email, click <img src="img/icons/stop.png" alt="Stop scanning." style="height:15px; width:15px"/> button to stop.</div> 
            </div>
        </div>
    </div>
`

const urlHTML = `
    <div id="url">
        <div id="url-content">
            <h3>Check website safety</h3>
            <div id="url-container">
                <input id="url-input" class="input-style" type="text" placeholder="Enter url here.."/>
                <button id="url-check" class="button-style">Check</button>
                <div id="url-response">
        
                </div>
            </div>
        </div>
    </div>
`

const signHTML = `
    <div id="sign-up">
        <div id="sign-up-header">
            <h3 id="sign-up-welcome">Welcome to ScamCheck!</h3>
        </div>
        <input id="email" class="input-style" type="text" placeholder="Email..." minlength="3"/>
        <input id="password" class="input-style" type="password" placeholder="Password..." minlength="8"/>
        <input id="register-password" class="input-style" type="password" placeholder="Type Password again..." minlength="8"/>
        <button id="sign-up-button" class="button-style">Sign Up</button>
        <button id="sign-in-button" class="button-style" style="display: none;">Sign In</button>
        <div id="register-button" style="display: none;"><span>Don't have an account? </span><span class="caution">Click here to register.</span></div>
        <div id="log-in-button"><span>Already have an account? </span><span class="success">Click here to sign in.</span></div>
    </div>
`

const profileHTML = `
    <div id="profile">
        <div id="profile-content">
            <div id="profile-info">
                <div id="profile-head">
                    <div id="profile-icon" class="menu-content-logo"><img src="img/icons/profile.png" alt="profile."></div>
                    <h3><span id="profile-username"></span></h3>
                </div>
                <div id="profile-details">
                    <div id="details-head">
                        <h4 class="detail">Plan: <span id="profile-subscription"></span></h4>
                        <h4 id="credits" class="detail">Credits: <span id="profile-credits"></span></h4>
                    </div>
                    <div id="profile-upgrade-content" style="display: none;">
                        <h4>Unlimited Protection. $4.99 per month.</h4>
                        <button id="upgrade-plan" class="button-style">Upgrade</button>
                    </div>
                    <div id="profile-manage-plan-content" style="display: none;">
                        <h4>Manage current plan.</h4> 
                        <button id="manage-plan" class="button-style">Manage</button>
                    </div>
                    <div id="profile-end-plan-content" style="display: none;">
                        <h4>Plan Ends: </h4>
                        <span id="profile-end-plan-date"></span>
                    </div>
                </div>
            </div>
            <div class="pro-billing-info">
                <h3>Billing & Subscription</h3>
                <p>
                    <strong>ScamCheck Pro</strong> is a monthly subscription handled securely by <strong>Stripe</strong>.<br>
                    Subscribe to unlock <strong>unlimited scam checking and protection</strong>.<br>
                    You can cancel anytime on <strong>this page</strong>.
                </p>
            </div>
        </div>
    </div>
`

const historyHTML = `
    <div id="history">
        <div id="recent-replies-section">
            <div id="replies-header">
                <p>History</p>
                <div id="clear-pr-button" class="menu-content-logo"><img src="img/icons/trash.png" alt="trash"></div>
            </div>
            <div id="response-list" class="response-list"></div>
        </div>
    </div>
`
    
const settingsHTML = `
    <div id="settings">
        <div id="version" class="menu-content-logo">Version: ${version}</div>
        <div>For support, contact sulcecode@gmail.com</div>
        <button id="privacy-policy" class="button-style">Privacy Policy</button>
        <button id="terms-of-service" class="button-style">Terms of Service</button>
        <div id="settings-modal" style="display: none;">
            <div id="settings-modal-content"></div>
        </div>
    </div>
`

const privacyHTML = `
    <div class="modal-head"><h1>Privacy Policy</h1><img id="close-modal" src="img/icons/close.png" alt="close."></div>
    <div class="modal-content">
        <p>Last updated: January 2026</p>

        <p>ScamCheck ("we", "us", or "our") values your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our application.</p>

        <h2>1. Information We Collect</h2>
        <p>We may collect the following information:</p>
        <ul>
        <li>Email address (for account authentication)</li>
        <li>Usage data (such as number of scans)</li>
        <li>Payment and subscription status (handled by Stripe)</li>
        </ul>

        <p>We do <strong>not</strong> store your credit card information. All payments are processed securely by Stripe.</p>

        <h2>2. How We Use Your Information</h2>
        <ul>
        <li>To provide and maintain the service</li>
        <li>To manage subscriptions and access to Pro features</li>
        <li>To prevent abuse and fraud</li>
        <li>To improve the product</li>
        </ul>

        <h2>3. Data Storage</h2>
        <p>No emails are stored. We only store user authentication information, number of credits, and plan status.</p>

        <h2>4. Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul>
        <li>Firebase (authentication, database, hosting)</li>
        <li>Stripe (payments and subscriptions)</li>
        </ul>

        <h2>5. Your Rights</h2>
        <p>You may request deletion of your account and associated data at any time.</p>

        <h2>6. Cookies</h2>
        <p>We may use cookies or local storage for authentication and session management.</p>

        <h2>7. Changes</h2>
        <p>We may update this Privacy Policy from time to time. Continued use of the app means you accept the updated policy.</p>

        <h2>8. Contact</h2>
        <p>If you have any questions, contact us at:</p>
        <p><strong>sulcecode@gmail.com</strong></p>
    </div>
`
const termsHTML = `
    <div class="modal-head"><h1>Terms of Service</h1><img id="close-modal" src="img/icons/close.png" alt="close."></div>
    <div class="modal-content">
        <p>Last updated: January 2026</p>

        <p>By using ScamCheck ("the Service"), you agree to these Terms of Service.</p>

        <h2>1. Use of the Service</h2>
        <p>You agree to use the service only for lawful purposes and not to abuse, scrape, or attempt to bypass usage limits.</p>

        <h2>2. Accounts</h2>
        <p>You are responsible for maintaining the security of your account.</p>

        <h2>3. Subscriptions</h2>
        <p>ScamCheck Pro is a subscription service billed monthly. Payments are handled by Stripe.</p>
        <ul>
        <li>You can cancel anytime via the billing portal.</li>
        <li>Contact support for refunds.</li>
        </ul>

        <h2>4. Fair Use</h2>
        <p>We reserve the right to suspend or terminate accounts that abuse the service or attempt to bypass limits.</p>

        <h2>5. No Guarantees</h2>
        <p>ScamCheck provides analysis tools, but we do not guarantee accuracy or that all scams will be detected.</p>

        <h2>6. Limitation of Liability</h2>
        <p>ScamCheck is provided "as is" without warranties of any kind. We are not liable for any damages or losses resulting from use of the service.</p>

        <h2>7. Termination</h2>
        <p>We may suspend or terminate your access if you violate these terms.</p>

        <h2>8. Changes</h2>
        <p>We may update these terms from time to time. Continued use of the service means you accept the updated terms.</p>

        <h2>9. Contact</h2>
        <p>For support or legal inquiries:</p>
        <p><strong>sulcecode@gmail.com</strong></p>
    </div>
`

document.addEventListener("DOMContentLoaded", async () => {
    let auth = false
    const body = document.getElementById("body")
    const menuElement = document.getElementById("menu")
    const mainElement = document.getElementById("main")

    const loadingElement = document.getElementById("loading")
    
    //Buttons
    const acceptElement = document.getElementById("accept")
    const closeNotificationElement = document.getElementById("close-notification")
    const startElement = document.getElementById("start-scanning");
    const stopElement = document.getElementById("stop-scanning");
    const homeElement = document.getElementById("home-icon")
    const profileElement = document.getElementById("profile-icon")
    const historyElement = document.getElementById("history-icon")
    const urlElement = document.getElementById("url-icon")
    const settingsElement = document.getElementById("settings-icon")
    const signOut = document.getElementById("sign-out-button")
    
    const setUp = async (user = false) => {
        loadingElement.style.display = "flex"
        let { token } = await chrome.storage.local.get(["token"])
        if(token && token !== null && token !== "") {
            chrome.runtime.sendMessage(
                { action: "checkToken", token: token },
                async (response) => {
                    console.log(response)
                    if(response.res === "Success") {
                        body.innerHTML = appHTML
                        menuElement.style.display = "flex"
                        mainElement.style.width = "730px"

                        auth = true
                        const emailTextElement = document.getElementById("email-text");
                        const attachmentsElement = document.getElementById("attachments-text");
                        let tempEmailAddress = ""
                        const aiReplyElement = document.getElementById("ai-reply");
                        const scamCheck = document.getElementById("scam-check");
                        const backgroundScanningNotification = document.getElementById("background-scanning-notification")
                        const userPromptElement = document.getElementById("user-prompt")
                        userPromptElement.value = localStorage.getItem("user-prompt")
                        let attachments;
                        let links;
                        
                        const appModal = document.getElementById("app-modal")
                        const hint = document.getElementById("hint")

                        document.getElementById("sign-out-button").style.display = "flex"
                        if(user) {
                            document.getElementById("username").innerText = user
                        } else {
                            const { username } = await chrome.storage.local.get(["username"])
                            document.getElementById("username").innerText = username ? username : ""
                        }

                        const { scan } = await chrome.storage.local.get(["scan"])
                        if(scan === true) {
                            startElement.style.display = "none"
                            stopElement.style.display = "flex"
                            backgroundScanningNotification.innerHTML = `<div>Background scanning is currently turned <span style="font-weight:800; color: rgb(0, 255, 0);">ON</span>.</div>`

                            chrome.action.setIcon({
                                path: "img/logo-small.png"
                            });
                        } else {
                            startElement.style.display = "flex"
                            stopElement.style.display = "none"
                            backgroundScanningNotification.innerHTML = `<div>Background scanning is currently turned <span style="font-weight:800; color: rgb(255, 0, 0);">OFF</span>.</div>` 

                            chrome.action.setIcon({
                                path: "img/logo-small-paused.png"
                            });
                        }

                        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                            chrome.tabs.sendMessage(tabs[0].id, { action: "getEmail" }, async (response) => {
                                if (chrome.runtime.lastError) {
                                    emailTextElement.textContent = "Paste an email here or go to the email you want to reply to. No email detected.";
                                    emailTextElement.value = "Paste an email here or go to the email you want to reply to. No email detected.";
                                    attachmentsElement.innerText = "No Attachments Detected";
                                    return;
                                }
                                if (response && response.emailBody) {
                                    emailTextElement.textContent = response.emailBody;
                                    emailTextElement.value = response.emailBody;
                                    tempEmailAddress = response.emailAddress;
                                    attachmentsElement.innerText = `${response.attachments.length} Attachments Detected - File Scanning Coming Soon.`;
                                    attachments = response.attachments;
                                    links = response.links;
                                } else {
                                    emailTextElement.textContent = "Paste an email here or go to the email you want to reply to. No email detected.";
                                    emailTextElement.value = "Paste an email here or go to the email you want to reply to. No email detected.";
                                    attachmentsElement.innerText = "No Attachments Detected";
                                }
                            });
                        });

                        // Generate AI Reply
                        scamCheck.addEventListener("click", async () => {
                            loadingElement.style.display = "flex"
                            const emailAddress = tempEmailAddress
                            const emailText = emailTextElement.value
                            const userPrompt = userPromptElement.value

                            if(emailText === "Paste an email here or go to the email you want to reply to. No email detected." || emailText === "") {
                                loadingElement.style.display = "none"
                                acceptElement.innerText = "Ok"
                                document.getElementById("notification-modal").style.display = "flex"
                                document.getElementById("notification-message").innerText = `Go to the email you want to reply to or paste an email.`
                                return
                            }

                            const bypass = true 
                            const tabIdVal = await getCurrentTab()
                            
                            // Call OpenAI API via background script
                            chrome.runtime.sendMessage(
                                { action: "generateReply", emailAddress, emailText, links, userPrompt, attachments,  bypass, tabIdVal },
                                async (response) => {
                                    loadingElement.style.display = "none"
                                    if (response && !response.res.startsWith("Error") && !response.res.startsWith("Message") ) {
                                        let res = JSON.parse(response.res)
                                        aiReplyElement.innerHTML = `
                                            <div class="response-list-item rating-color-${res.scam_rating}">
                                                <div class="response-header">
                                                    <h3>Scam Rating: ${res.scam_rating}/10 | Sender: ${res.sender}</h3>
                                                    <h3>${res.datetime}</h3>
                                                </div>
                                                <h4>${res.subject}</h4>
                                                <br>
                                                <ol>${res.reasons.map(e => `<li>${e}</li>`).join('')}</ol>
                                                <br>
                                                <h3>${res.conclusion}</h3>
                                            </div>`
                                    } else {
                                        acceptElement.innerText = "Ok"
                                        document.getElementById("notification-modal").style.display = "flex"
                                        document.getElementById("notification-message").innerText = `${response.res}`
                                    }
                                }
                            );
                        });
                        userPromptElement.addEventListener("change", async () => {
                            localStorage.setItem("user-prompt", userPromptElement.value)
                        })
                        emailTextElement.addEventListener("change", async () => {
                            emailTextElement.textContent = emailTextElement.value
                        })
                        hint.addEventListener("click", async () => {
                            const closeModal = document.getElementById("close-modal")
                            appModal.style.display = "flex"

                            closeModal.addEventListener("click", async () => {
                                appModal.style.display = "none"
                            })

                        })
                        chrome.runtime.sendMessage(
                            { action: "initUserDetails" }
                        )
                        loadingElement.style.display = "none"
                    } else {
                        window.location.reload()
                        loadingElement.style.display = "none"
                    }
                }
            );
        } else {
            auth = false
            body.innerHTML = signHTML

            const signUp = document.getElementById("sign-up-button")
            const signIn = document.getElementById("sign-in-button")
        
            const registerButton = document.getElementById("register-button")
            const logInButton = document.getElementById("log-in-button")
            const email = document.getElementById("email")
            const password = document.getElementById("password")
            const registerPassword = document.getElementById("register-password")
            
            const signUpFunc = () => {
                loadingElement.style.display = "flex"
                
                if(email.value.length < 3 || password.value.length < 8){
                    loadingElement.style.display = "none"
                    acceptElement.innerText = "Ok"
                    document.getElementById("notification-modal").style.display = "flex"
                    document.getElementById("notification-message").innerText = "Enter all input fields."
                    return "Enter all input fields."
                }

                if(password.value !== registerPassword.value){
                    loadingElement.style.display = "none"
                    acceptElement.innerText = "Ok"
                    document.getElementById("notification-modal").style.display = "flex"
                    document.getElementById("notification-message").innerText = "Passwords not match."
                    return "Passwords not match."
                }
                
                chrome.runtime.sendMessage(
                    { action: "signUp", email: email.value, password: password.value },
                    async (response) => {
                        loadingElement.style.display = "none"
                        if (response.res == "Success") {
                            auth = true
                            const checkbox = document.getElementById('scanToggle');
                            document.getElementById("username").innerText = email.value
                            document.getElementById("sign-out-button").style.display = "flex"
                            const { scan } = await chrome.storage.local.get(["scan"])
                            if(scan === true) {
                                startElement.style.display = "none"
                                stopElement.style.display = "flex"
                                checkbox.checked = true
                            } else {
                                startElement.style.display = "flex"
                                stopElement.style.display = "none"
                                checkbox.checked = false
                            }
                            setUp()
                            setUp(response.user)
                            notification("Enter", "flex", `
                                <h4>Welcome! Would you like to have background scanning for Gmail on?</h4>
                                <label class="toggle">
                                    <span class="label">Background scanning is turned OFF</span>
                                    <input type="checkbox" id="scanToggle">
                                    <span class="slider"></span>
                                </label>    
                            `)
                            checkbox.addEventListener("change", () => {
                                const label = document.querySelector('.label');

                                if(checkbox.checked) {
                                    label.textContent = 'Background scanning is turned ON';
                                    chrome.runtime.sendMessage({ action: "setStart" });
                                    startElement.style.display = "none"
                                    stopElement.style.display = "flex"
                                } else {
                                    label.textContent = 'Background scanning is turned OFF';
                                    chrome.runtime.sendMessage({ action: "setStop" });
                                    startElement.style.display = "flex"
                                    stopElement.style.display = "none"
                                }
                            })
                        } else {
                            auth = false
                            notification("Ok", "flex", `${response.res}`)
                        }
                    }
                );
            }
            
            const signInFunc = () => {
                loadingElement.style.display = "flex"
                
                if(email.value.length < 3 || password.value.length < 8){
                    loadingElement.style.display = "none"
                    auth = false
                    acceptElement.innerText = "Ok"
                    document.getElementById("notification-modal").style.display = "flex"
                    document.getElementById("notification-message").innerText = "Enter all input fields."
                    return
                }
                
                chrome.runtime.sendMessage(
                    { action: "signIn", email: email.value, password: password.value },
                    async (response) => {
                        loadingElement.style.display = "none"
                        if(response.res == "Success") {
                            auth = true
                            setUp(response.user)
                            notification("Save", "flex", `
                                <h4>Would you like to have background scanning for Gmail on?</h4>
                                <label class="toggle">
                                    <span class="label">Background scanning is turned OFF</span>
                                    <input type="checkbox" id="scanToggle">
                                    <span class="slider"></span>
                                </label>    
                            `)
                            const checkbox = document.getElementById('scanToggle');
                            checkbox.addEventListener("change", () => {
                                const label = document.querySelector('.label');

                                if(checkbox.checked) {
                                    label.textContent = 'Background scanning is turned ON';
                                    chrome.runtime.sendMessage({ action: "setStart" });
                                    startElement.style.display = "none"
                                    stopElement.style.display = "flex"
                                } else {
                                    label.textContent = 'Background scanning is turned OFF';
                                    chrome.runtime.sendMessage({ action: "setStop" });
                                    startElement.style.display = "flex"
                                    stopElement.style.display = "none"
                                }
                            })
                        } else {
                            auth = false
                            acceptElement.innerText = "Ok"
                            document.getElementById("notification-modal").style.display = "flex"
                            document.getElementById("notification-message").innerText = "Invalid credentials.. "
                        }
                    }
                );
            }

            signIn.addEventListener("click", async () => {
                signInFunc()
            });

            password.addEventListener("keydown", async (e) => {
                if (e.key === 'Enter') {
                    signInFunc()
                    e.preventDefault();
                }
            });

            registerPassword.addEventListener("keydown", async (e) => {
                if (e.key === 'Enter') {
                    signUpFunc()
                    e.preventDefault();
                }
            });
            
            registerButton.addEventListener("click", async () => {
                signUp.style.display = "flex"
                signIn.style.display = "none"
                registerButton.style.display = "none"
                logInButton.style.display = "flex"
                registerPassword.style.display = "flex"
            });
            logInButton.addEventListener("click", async () => {
                signUp.style.display = "none"
                signIn.style.display = "flex"
                registerButton.style.display = "flex"
                logInButton.style.display = "none"
                registerPassword.style.display = "none"
            });
            loadingElement.style.display = "none"
        }
        
    }
    setUp()

    startElement.addEventListener("click", async () => {
        chrome.runtime.sendMessage(
            { action: "setStart" },
            (response) => {
                acceptElement.innerText = "Continue"
                document.getElementById("notification-modal").style.display = "flex"
                document.getElementById("notification-message").innerText = "Background scanning is turned ON."
                startElement.style.display = "none"
                stopElement.style.display = "flex"
            }
        );
    });
    
    stopElement.addEventListener("click", async () => {
        chrome.runtime.sendMessage(
            { action: "setStop" },
            (response) => {
                acceptElement.innerText = "Continue"
                document.getElementById("notification-modal").style.display = "flex"
                document.getElementById("notification-message").innerText = "Background scanning is turned OFF."
                startElement.style.display = "flex"
                stopElement.style.display = "none"
            }
        );
    });
    
    acceptElement.addEventListener("click", async () => {
        document.getElementById("notification-modal").style.display = "none"
        document.getElementById("notification-message").innerText = "No message.."

        if(acceptElement.innerText === "Enter" || acceptElement.innerText === "Continue") {
            window.location.reload()
        } else if(acceptElement.innerText === "Clear") {
            const responseListElement = document.getElementById("response-list")
            responseListElement.innerHTML = ""
            chrome.storage.local.set({ responseList: JSON.stringify([]) })
        } else if(acceptElement.innerText === "Sign Out") {
            chrome.runtime.sendMessage(
                { action: "signOut" },
                (response) => {
                    auth = false
                    body.innerHTML = signHTML
                    document.getElementById("sign-out-button").style.display = "none"
                    document.getElementById("username").innerText = ""

                    startElement.style.display = "none"
                    stopElement.style.display = "none"
                    menuElement.style.display = "none"
                    mainElement.style.width = "800px"
                    window.location.reload()
                }
            );
        }

    });

    closeNotificationElement.addEventListener("click", async () => {
        document.getElementById("notification-modal").style.display = "none"
        document.getElementById("notification-message").innerText = "No message.."
    })

    historyElement.addEventListener("click", async () => {
        if(auth) {
            homeElement.classList.remove('selected')
            profileElement.classList.remove('selected')
            settingsElement.classList.remove('selected')
            urlElement.classList.remove('selected')
            historyElement.classList.add('selected')

            body.innerHTML = historyHTML
            const responseListElement = document.getElementById("response-list")
            const clearPrButton = document.getElementById("clear-pr-button")
            
            let { responseList } = await chrome.storage.local.get(["responseList"])

            if(responseList && JSON.stringify(responseList) !== '{}') {
                responseList = JSON.parse(responseList)
                if (responseList.length < 1) {
                    chrome.storage.local.set({ responseList: JSON.stringify([]) })
                    responseListElement.innerHTML = `<div>No history to show..</div>`
                } else {
                    responseListElement.innerHTML = responseList.reverse().map((e) => {
                        let res = JSON.parse(e)
                        return `
                        <div class="response-list-item rating-color-${res.scam_rating}">
                            <div class="response-header">
                                <h3>Scam Rating: ${res.scam_rating}/10 | Sender: ${res.sender}</h3>
                                <h3>${res.datetime}</h3>
                            </div>
                            <h4>${res.subject}</h4>
                            <br>
                            <ol>${res.reasons.map(e => `<li>${e}</li>`).join('')}</ol>
                            <br>
                            <h3>${res.conclusion}</h3>
                        </div>`
                    }).join('') 
                }
            } else {
                chrome.storage.local.set({ responseList: JSON.stringify([]) })
            }
            clearPrButton.addEventListener("click", async () => {
                acceptElement.innerText = "Clear"
                document.getElementById("notification-modal").style.display = "flex"
                document.getElementById("notification-message").innerText = "Clear History?"
            })
        }
    })

    urlElement.addEventListener("click", async () => {
        if(auth) {
            homeElement.classList.remove('selected')
            profileElement.classList.remove('selected')
            settingsElement.classList.remove('selected')
            urlElement.classList.add('selected')
            historyElement.classList.remove('selected')

            body.innerHTML = urlHTML
            const urlInput = document.getElementById("url-input")
            const urlCheck = document.getElementById("url-check")
            const urlResponse = document.getElementById("url-response")

            urlCheck.addEventListener("click", async () => {
                loadingElement.style.display = "flex"
                const url = urlInput.value
                chrome.runtime.sendMessage(
                    { action: "scanUrl", url },
                    (response) => {
                        if(response && response.success) {
                            urlResponse.innerHTML = `
                                <div class="response-list-item ${response.isMalicious ? 'rating-color-10' : 'rating-color-0'}">
                                    <div class="response-header">
                                        <h3>${response.isMalicious ? 'Not Safe' : 'Safe'}</h3>
                                    </div>
                                    ${response.threatTypes.length > 0 ? `<h4>Threat Types: ${response.threatTypes}</h4>` : ''}
                                </div>`
                        } else {
                            acceptElement.innerText = "Ok"
                            document.getElementById("notification-modal").style.display = "flex"
                            document.getElementById("notification-message").innerText = `Error: ${response.error}`
                        }
                        loadingElement.style.display = "none"
                    }
                );
            })
        }
    })
    
    homeElement.addEventListener("click", async () => {
        if(auth) {
            homeElement.classList.add('selected')
            profileElement.classList.remove('selected')
            settingsElement.classList.remove('selected')
            urlElement.classList.remove('selected')
            historyElement.classList.remove('selected')
            setUp()
        }
    })
    profileElement.addEventListener("click", async () => {
        if(auth) {
            homeElement.classList.remove('selected')
            profileElement.classList.add('selected')
            settingsElement.classList.remove('selected')
            urlElement.classList.remove('selected')
            historyElement.classList.remove('selected')

            body.innerHTML = profileHTML
            const upgrade = document.getElementById("upgrade-plan")
            const manage = document.getElementById("manage-plan")

            const { username } = await chrome.storage.local.get(["username"])
            const { credits } = await chrome.storage.local.get(["credits"])
            const { plan } = await chrome.storage.local.get(["plan"])
            const { cancel } = await chrome.storage.local.get(["cancel"]) 
            const { cancelDate } = await chrome.storage.local.get(["cancelDate"])

            document.getElementById("profile-username").innerText = username
            
            if(plan == "free") {
                document.getElementById("profile-subscription").innerText = "Free"
                document.getElementById("credits").style.display = "block"
                document.getElementById("profile-credits").innerText = credits
                document.getElementById("profile-upgrade-content").style.display = "flex"
                document.getElementById("profile-manage-plan-content").style.display = "none"
                document.getElementById("profile-end-plan-content").style.display = "none"
            } else {
                document.getElementById("profile-subscription").innerText = "Pro"
                document.getElementById("profile-credits").innerText = "Unlimited"
                document.getElementById("credits").style.display = "none"
                document.getElementById("profile-upgrade-content").style.display = "none"
                document.getElementById("profile-manage-plan-content").style.display = "flex"
                if(cancel) {
                    document.getElementById("profile-end-plan-content").style.display = "flex"
                    document.getElementById("profile-end-plan-date").innerText = cancelDate
                }
            }

            upgrade.addEventListener("click", async () => {
                loadingElement.style.display = "flex"
                chrome.runtime.sendMessage(
                    { action: "upgradePlan" },
                    (response) => {
                        loadingElement.style.display = "none"
                        if(response.res === "Success") {
                            acceptElement.innerText = "Continue"
                            document.getElementById("notification-modal").style.display = "flex"
                            document.getElementById("notification-message").innerText = "Continue payment in the external window."

                            chrome.windows.create({ url: response.url });
                        } else {
                            acceptElement.innerText = "Ok"
                            document.getElementById("notification-modal").style.display = "flex"
                            document.getElementById("notification-message").innerText = "Please try again."
                        }
                    }
                );
            })

            manage.addEventListener("click", async () => {
                loadingElement.style.display = "flex"
                chrome.runtime.sendMessage(
                    { action: "managePlan" },
                    (response) => {
                        loadingElement.style.display = "none"
                        if(response.res === "Success") {
                            acceptElement.innerText = "Continue"
                            document.getElementById("notification-modal").style.display = "flex"
                            document.getElementById("notification-message").innerText = "Continue payment in the external window."

                            chrome.windows.create({ url: response.url });
                        } else {
                            acceptElement.innerText = "Ok"
                            document.getElementById("notification-modal").style.display = "flex"
                            document.getElementById("notification-message").innerText = "Please try again."
                        }
                    }
                );
            })
        }
    })
    settingsElement.addEventListener("click", async () => {
        if(auth) {
            homeElement.classList.remove('selected')
            profileElement.classList.remove('selected')
            settingsElement.classList.add('selected')
            urlElement.classList.remove('selected')
            historyElement.classList.remove('selected')

            body.innerHTML = settingsHTML
            const settingsModal = document.getElementById("settings-modal")
            const settingsModalContent = document.getElementById("settings-modal-content")
            const privacyPolicy = document.getElementById("privacy-policy")
            const termsOfService = document.getElementById("terms-of-service")
            
            privacyPolicy.addEventListener("click", async () => {
                settingsModalContent.innerHTML = privacyHTML
                const closeModal = document.getElementById("close-modal")
                settingsModal.style.display = "flex"

                closeModal.addEventListener("click", async () => {
                    settingsModal.style.display = "none"
                    settingsModalContent.innerHTML = ""
                })

            })
            termsOfService.addEventListener("click", async () => {
                settingsModalContent.innerHTML = termsHTML
                const closeModal = document.getElementById("close-modal")
                settingsModal.style.display = "flex"

                closeModal.addEventListener("click", async () => {
                    settingsModal.style.display = "none"
                    settingsModalContent.innerHTML = ""
                })

            })
        }
    })
    signOut.addEventListener("click", async () => {
        notification("Sign Out", "flex", "Signing Out will clear previous scanned emails on history tab. Sign Out?")
    });
    
    const notification = (accept, display, html) => {
        acceptElement.innerText = accept
        document.getElementById("notification-modal").style.display = display
        document.getElementById("notification-message").innerHTML = html
    }
});

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  // tabs.query returns an array of Tab objects. The active tab in the current window is the first element.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}