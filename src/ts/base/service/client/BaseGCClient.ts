import CommentClient from "@Base/service/client/subclients/CommentClient";
import UserClient from "@Base/service/client/subclients/UserClient";
import GiphyClient from "@Base/service/client/subclients/GiphyClient";

export default class BaseGCClient {
    public comment: CommentClient;
    public user: UserClient;
    public giphy: GiphyClient;

    constructor(URL: string) {
        this.comment = new CommentClient(URL);
        this.user = new UserClient(URL);
        this.giphy = new GiphyClient(URL);
    }
}