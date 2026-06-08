import CommentClient from "@Base/service/client/comment_client";
import UserClient from "@Base/service/client/user_client";
import GiphyClient from "@Base/service/client/giphy_client";

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