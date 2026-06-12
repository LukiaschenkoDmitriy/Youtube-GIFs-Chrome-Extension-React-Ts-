chrome.tabs.onUpdated.addListener((tabId: any, changeInfo: any, tab: any) => {
	if (!changeInfo.url) return;
	if (!tab.url?.includes('youtube.com/watch') && !tab.url?.includes('youtube.com/shorts')) return;

	chrome.tabs
		.sendMessage(tabId, {
			type: 'URL_CHANGED',
			url: changeInfo.url,
		})
		.catch(() => {});
});
