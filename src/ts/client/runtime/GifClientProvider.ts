import ChromeRuntimeProvider from './ChromeRuntimeProvider';
import ENDPOINTS from '@Client/endpoints';
import Gif from '@Base/dto/Gif';

export default class GifClientProvider {
	public static async getTrending(offset: number): Promise<Gif[] | null> {
		return await ChromeRuntimeProvider.fetch<Gif[]>(ENDPOINTS.GIPHY.TRENDING, { offset }).then(ChromeRuntimeProvider.checkErrorHandler);
	}

	public static async search(search: string, offset: number): Promise<Gif[] | null> {
		return await ChromeRuntimeProvider.fetch<Gif[]>(ENDPOINTS.GIPHY.SEARCH, { search, offset }).then(ChromeRuntimeProvider.checkErrorHandler);
	}
}
