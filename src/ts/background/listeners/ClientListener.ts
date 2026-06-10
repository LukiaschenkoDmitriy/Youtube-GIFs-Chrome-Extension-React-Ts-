import HANDLERS from '@Client/handlers';

export type ClientResponseError = { status: boolean; message: string };

chrome.runtime.onMessage.addListener((message: any, _sender: any, sendResponse: any) => {
	if (message.type !== 'GC_CLIENT') return;

	const handler = HANDLERS[message.endpoint.NAME];

	if (!handler) {
		sendResponse({ status: false, message: "Handler doesn't exist" });
		return true;
	}

	handler(message.endpoint, message.data ?? {}).then(sendResponse);

	return true;
});
