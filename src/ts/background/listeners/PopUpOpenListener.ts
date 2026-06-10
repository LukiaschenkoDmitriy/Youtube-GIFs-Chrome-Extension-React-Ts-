chrome.runtime.onMessage.addListener((message: any) => {
	if (message.type === 'OPEN_POPUP') {
		chrome.action.openPopup();
	}
});
