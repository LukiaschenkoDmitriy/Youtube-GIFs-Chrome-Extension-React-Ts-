import ENDPOINTS from '@Client/endpoints';
import di, { DIServices } from '@Base/di';
import BaseGCClient from '@Base/service/client/BaseGCClient';
import Comment from '@Base/dto/Comment';

const c = di.get<BaseGCClient>(DIServices.BaseGCClient);

const CommentHandler: Record<string, (e: any, data: any) => Promise<any>> = {
	[ENDPOINTS.COMMENT.GET_BY_VIDEO_ID.NAME]: (e, d) => c.useEndpoint<Comment[]>(e, { p: { videoId: d.videoId } }),
	[ENDPOINTS.COMMENT.GET_BY_ID.NAME]: (e, d) => c.useEndpoint<Comment>(e, { p: { commentId: d.commentId } }),
	[ENDPOINTS.COMMENT.LIKE.NAME]: (e, d) => c.useEndpoint<null>(e, { p: { commentId: d.commentId } }),
	[ENDPOINTS.COMMENT.DISLIKE.NAME]: (e, d) => c.useEndpoint<null>(e, { p: { commentId: d.commentId } }),
	[ENDPOINTS.COMMENT.DELETE.NAME]: (e, d) => c.useEndpoint<null>(e, { p: { commentId: d.commentId } }),
	[ENDPOINTS.COMMENT.CREATE.NAME]: (e, d) => {
		return c.useEndpoint<Comment>(e, {
			b: {
				user_id: d.user_id,
				video_id: d.video_id,
				gif_url: d.gif_url,
				text: d.text,
				answer_to: d.answer_to,
			},
		});
	},
};

export default CommentHandler;
