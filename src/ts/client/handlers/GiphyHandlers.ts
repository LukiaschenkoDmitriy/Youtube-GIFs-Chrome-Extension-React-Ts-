import Gif from '@Base/dto/Gif';
import di, { DIServices } from '@Base/di';
import BaseGCClient from '@Base/service/client/BaseGCClient';
import ENDPOINTS from '@Client/endpoints';

const c = di.get<BaseGCClient>(DIServices.BaseGCClient);

const GiphyHandlers: Record<string, (e: any, data: any) => Promise<any>> = {
	[ENDPOINTS.GIPHY.TRENDING.NAME]: e => c.useEndpoint<Gif[]>(e, {}),
	[ENDPOINTS.GIPHY.SEARCH.NAME]: (e, d) => c.useEndpoint<Gif[]>(e, { q: { search: d.search } }),
};

export default GiphyHandlers;
