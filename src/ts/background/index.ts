import "./login_service";
import "./client_service";

chrome.tabs.onUpdated.addListener((tabId: any, changeInfo:any, tab:any) => {
    if (changeInfo.url && tab.url?.includes("youtube.com/watch")) {
        chrome.tabs.sendMessage(tabId, {
            type: "URL_CHANGED",
            url: changeInfo.url
        });
    }
});