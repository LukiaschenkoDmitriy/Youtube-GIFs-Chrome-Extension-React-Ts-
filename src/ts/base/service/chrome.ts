import ErrorResponse from "@Base/dto/Error";

export default class ChromeService {
    private URL: string;

    public constructor(URL: string) {
        this.URL = URL;
    }

    public async login(): Promise<{success: boolean}> {
        // @ts-ignore
        return await chrome.runtime.sendMessage({ type: "LOGIN", url: this.URL+"/auth/2l8s118z69mkq91m3y6r161bq8yp4hmsgaveoqzivvzfs45kb1/login" });
    }

    public async fetch(name: string, data: any = null): Promise<any|ErrorResponse> {
        return await chrome.runtime.sendMessage({ type: "GC_CLIENT", name: name, data: data });
    }
}