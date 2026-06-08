import di, {SERVICE} from "@Base/di";
import BaseGCClient from "@Base/service/client";
import ENDPOINTS from "@Base/service/client/endpoints";

const client = di.get<BaseGCClient>(SERVICE.BaseGCClient);

const handlers: Record<string, (data: any) => Promise<any>> = {
    [ENDPOINTS.COMMENT.GET_BY_VIDEO_ID.NAME]: (d) => client.comment.getByVideoId(d.videoId),
    [ENDPOINTS.COMMENT.CREATE.NAME]:      (d) => client.comment.create(d.comment),
    [ENDPOINTS.GIPHY.TRENDING.NAME]:        (d) => client.giphy.getTrending(d.offset),
    [ENDPOINTS.GIPHY.SEARCH.NAME]:          (d) => client.giphy.getBySearch(d.search, d.offset),
    [ENDPOINTS.USER.CURRENT.NAME]:           ()  => client.user.getCurrent(),
    [ENDPOINTS.USER.LOGOUT.NAME]:                 ()  => client.user.logout(),
    [ENDPOINTS.COMMENT.LIKE.NAME]:        (d) => client.comment.like(d.commentId),
    [ENDPOINTS.COMMENT.DISLIKE.NAME]:     (d) => client.comment.dislike(d.commentId),
    [ENDPOINTS.COMMENT.DELETE.NAME]:      (d) => client.comment.delete(d.commentId),
    [ENDPOINTS.COMMENT.GET_BY_ID.NAME]:   (d:any)=> client.comment.getById(d.commentId)
};

chrome.runtime.onMessage.addListener((message: any, _sender: any, sendResponse: any) => {
    if (message.type !== "GC_CLIENT") return;

    const handler = handlers[message.name];

    if (!handler) {
        sendResponse({ status: "failed" });
        return true;
    }

    handler(message.data ?? {}).then(sendResponse);

    return true;
});