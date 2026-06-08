import Gif from "@Base/dto/Gif";
import ErrorResponse from "@Base/dto/Error";
import AbstractGCClient from "@Base/service/client/abstract_client";
import ENDPOINTS from "@Base/service/client/endpoints";

export default class GiphyClient extends AbstractGCClient {
    public async getTrending(offset: number): Promise<Gif[]|ErrorResponse> {
        const response = await this.useEndpoint(ENDPOINTS.GIPHY.TRENDING, {
            query: {
                offset: 25 * offset
            }
        });

        const data = await response.json();

        if (!response.ok) return new ErrorResponse(data);

        const gifs: Gif[] = [];

        data.data.forEach((gif: any) => {
            gifs.push(new Gif(gif))
        })

        return gifs;
    }

    public async getBySearch(search: string, offset: number): Promise<Gif[]|ErrorResponse> {
        const response = await this.useEndpoint(ENDPOINTS.GIPHY.SEARCH, {
            query: {
                q: search,
                offset: 25 * offset
            }
        });

        const data = await response.json();

        if (!response.ok) return new ErrorResponse(data);

        const gifs: Gif[] = [];

        data.data.forEach((gif: any) => {
            gifs.push(new Gif(gif))
        })

        return gifs;
    }
}