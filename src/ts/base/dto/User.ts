export default class User {
    public id: string;
    public name: string;
    public email: string;
    public picture: string;
    public customUrl: string

    public constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.picture = data.picture;
        this.customUrl = data.custom_url;
    }
}