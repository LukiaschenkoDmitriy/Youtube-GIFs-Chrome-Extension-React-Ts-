import { AUTH_ENDPOINT, SERVER_URL } from '@Base/variables';

chrome.runtime.onMessage.addListener((message: any, sender: any, sendResponse: any) => {
	if (message.type !== 'LOGIN') return;

	chrome.windows.create({ url: `${SERVER_URL}${message.endpoint.url}`, focused: true, type: 'popup', width: 500, height: 600 }, (win: any) => {
		const cleanup = () => {
			chrome.tabs.onUpdated.removeListener(onTabUpdated);
			chrome.windows.onRemoved.removeListener(onWindowRemoved);
		};

		// The user closed the login window without completing OAuth
		function onWindowRemoved(windowId: number) {
			if (windowId !== win.id) return;
			cleanup();
			sendResponse({ success: false });
		}

		function onTabUpdated(tabId: any, changeInfo: any, tab: any) {
			if (tab.windowId !== win.id || changeInfo.status !== 'complete') return;
			if (!tab.url?.includes(`${AUTH_ENDPOINT}/callback`)) return;

			cleanup();
			chrome.windows.remove(win.id);
			sendResponse({ success: true });

			chrome.tabs.query({ url: '*://*.youtube.com/*' }, (tabs: any) => {
				tabs.forEach((tab: any) => {
					if (tab.id) {
						chrome.tabs.sendMessage(tab.id, { type: 'USER_LOGGED_IN' }).catch(() => {});
					}
				});
			});

			setTimeout(() => chrome.action.openPopup(), 100);
		}

		chrome.tabs.onUpdated.addListener(onTabUpdated);
		chrome.windows.onRemoved.addListener(onWindowRemoved);
	});

	return true;
});
