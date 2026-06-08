import ENDPOINTS from "@Base/service/client/endpoints";

export default abstract class AbstractGCClient {
    private URL: string;

    public constructor(URL: string) {
        this.URL = URL;
    }

    public async useEndpoint(endPoint: any, data: any = null): Promise<Response> {
        let url = this.processParams(endPoint.url, (data && data.params) ? data.params : {});
        url = this.processQuery(url, (data && data.query) ? data.query : []);

        switch (endPoint.method) {
            case "POST": return await this._post(url, data);
            case "DELETE": return await this._delete(url, data);
            default: return await this._get(url, data);
        }
    }

    protected async _post(url: string, data: any = null): Promise<Response> {
        return await fetch(url, {
            method: "POST",
            body: (data && data.body) ? JSON.stringify(data.body) : null,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
    }

    protected async _delete(url: string, data: any = null) {
        return await fetch(url, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
    }

    protected async _get(url: string, data: any = null): Promise<Response> {
        return await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
    }

    private processQuery(endpoint: string, query: any): string {
        const url = new URL(this.URL + endpoint);

        if (query) {
            Object.entries(query).forEach(([key, value]) => {
                url.searchParams.append(key, String(value));
            });
        }

        return url.toString();
    }

    public async ping(): Promise<Response> {
        return await this.useEndpoint(ENDPOINTS.PING);
    }

    private processParams(endpoint: string, params: Record<string, string>): string {
        return Object.entries(params).reduce(
            (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
            endpoint
        );
    }
}