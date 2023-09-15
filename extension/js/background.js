function getID(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) { 
            let currTab = tabs[0];
            callback(currTab.id);
        }
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "inject") {
        getID((id) => {
        console.log(sender);
        console.log(request);
        chrome.scripting.executeScript({
            target: { tabId: id},
            function: () => {
                // Inject the code.js script into the active tab
                var s = document.createElement('script');
                s.src = chrome.runtime.getURL("js/code.js");
                document.head.appendChild(s);
            },
        });
        })
    }
});