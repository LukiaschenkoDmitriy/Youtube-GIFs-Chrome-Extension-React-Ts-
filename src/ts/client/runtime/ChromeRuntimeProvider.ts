import User from '@Base/dto/User';
import { GCClientResponse } from '@Base/service/client/BaseGCClient';
import ENDPOINTS, { EndpointType } from '@Client/endpoints';
import { ClientResponseError } from '@Background/listeners/ClientListener';
import { middleware } from '@Base/di';

export default class ChromeRuntimeProvider {
	public static async login(): Promise<GCClientResponse<User> | null> {
		await chrome.runtime.sendMessage({ type: 'LOGIN', endpoint: ENDPOINTS.USER.LOGIN });
		return await ChromeRuntimeProvider.fetch<User>(ENDPOINTS.USER.CURRENT, {});
	}

	public static async openTab(active: boolean, currentWindow: boolean, handler: (tab: any) => any) {
		return chrome.tabs.query({ active: active, currentWindow: currentWindow }).then(([tab]: any) => {
			return handler(tab);
		});
	}

	public static async fetch<T>(endpoint: EndpointType, data: any): Promise<GCClientResponse<T> | null> {
		middleware.run('REQUEST', { endpoint, data });
		const responseData = (await chrome.runtime.sendMessage({ type: 'GC_CLIENT', endpoint: endpoint, data: data })) as GCClientResponse<T> | ClientResponseError;
		middleware.run('RESPONSE', { endpoint, json: responseData });
		if ('status' in responseData && 'message' in responseData) {
			console.error(responseData.message);
			return null;
		}

		return responseData;
	}

	public static checkErrorHandler<T>(json: GCClientResponse<T> | null) {
		if (json == null) {
			console.error('chrome.runtime status failed, maybe you tried to use undefined handler');
			return null;
		}

		if ('error' in json) {
			console.error(`GCClient Error: ${json.error}`);
			return null;
		}

		return json.data;
	}
}
