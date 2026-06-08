export default class Gif {
    public title: string;
    public type: string;
    public url: string;
    constructor(data: any) {
        this.type = data.type;
        this.title = data.title;
        this.url = data.url;
    }
}