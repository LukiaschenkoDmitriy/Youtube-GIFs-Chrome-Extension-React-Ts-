import ErrorResponse from "@Base/dto/Error";
import User from "@Base/dto/User";
import ENDPOINTS from "@Base/endpoints";

export default class RuntimeProvider {
    private URL: string;

    public constructor(URL: string) {
        this.URL = URL;
    }

    public async login(): Promise<User|null> {
        await chrome.runtime.sendMessage({ type: "LOGIN", url: this.URL+"/auth/2l8s118z69mkq91m3y6r161bq8yp4hmsgaveoqzivvzfs45kb1/login" });
        const data = await this.fetch(ENDPOINTS.USER.CURRENT.NAME)

        if (data.error) return null;
        return data;
    }

    public async fetch(name: string, data: any = null): Promise<any|ErrorResponse> {
        return await chrome.runtime.sendMessage({ type: "GC_CLIENT", name: name, data: data });
    }
}