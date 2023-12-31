chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['contentScript.js'],
    })
})

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.downloads.download({
            url: request.message 
        })
    }
)