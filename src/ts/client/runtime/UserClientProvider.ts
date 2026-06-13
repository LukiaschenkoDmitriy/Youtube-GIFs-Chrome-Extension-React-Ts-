import ChromeRuntimeProvider from './ChromeRuntimeProvider';
import User from '@Base/dto/User';
import ENDPOINTS from '@Client/endpoints';

export default class UserClientProvider {
	public static async getCurrent(): Promise<User | null> {
		return await ChromeRuntimeProvider.fetch<User>(ENDPOINTS.USER.CURRENT, {}).then(ChromeRuntimeProvider.checkErrorHandler);
	}

	public static async logout(): Promise<null> {
		return await ChromeRuntimeProvider.fetch<null>(ENDPOINTS.USER.LOGOUT, {}).then(ChromeRuntimeProvider.checkErrorHandler);
	}

	public static async login(): Promise<null | User> {
		return await ChromeRuntimeProvider.login().then(ChromeRuntimeProvider.checkErrorHandler);
	}

	public static async updateSettings(videosOn: boolean, shortsOn: boolean): Promise<boolean> {
		return await ChromeRuntimeProvider.fetch<null>(ENDPOINTS.USER.SETTINGS, { videosOn, shortsOn }).then(ChromeRuntimeProvider.checkSuccessHandler)
	}
}
