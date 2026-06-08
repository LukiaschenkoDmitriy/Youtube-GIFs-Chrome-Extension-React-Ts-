chrome.runtime.onMessage.addListener((message: any, sender: any, sendResponse: any) => {
    if (message.type !== "LOGIN") return;

    // @ts-ignore
    chrome.windows.create({url: message.url, focused: true, type: "popup", width: 500, height: 600}, (win: chrome.windows.Window) => {
        chrome.tabs.onUpdated.addListener(function onTabUpdated(tabId:any, changeInfo:any, tab:any) {
            if (tab.windowId !== win.id || changeInfo.status !== "complete") return;
            if (!tab.url?.includes("auth/2l8s118z69mkq91m3y6r161bq8yp4hmsgaveoqzivvzfs45kb1/callback")) return;

            chrome.tabs.onUpdated.removeListener(onTabUpdated);
            setTimeout(() => {
                chrome.windows.remove(win.id);
                sendResponse({ success: true });
                setTimeout(() => chrome.action.openPopup(), 100);
            }, 2000);
        });
    })

    return true;
});
