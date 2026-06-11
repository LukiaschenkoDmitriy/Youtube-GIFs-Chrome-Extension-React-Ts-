import ChromeRuntimeProvider from './ChromeRuntimeProvider';
import Comment from '@Base/dto/Comment';
import ENDPOINTS from '@Client/endpoints';

export default class CommentClientProvider {
	public static async getByVideoId(videoId: string): Promise<Comment[] | null> {
		return await ChromeRuntimeProvider.fetch<Comment[]>(ENDPOINTS.COMMENT.GET_BY_VIDEO_ID, { videoId }).then(ChromeRuntimeProvider.checkErrorHandler);
	}

	public static async create(comment: Comment): Promise<Comment | null> {
		return await ChromeRuntimeProvider.fetch<null>(ENDPOINTS.COMMENT.CREATE, { ...comment }).then(ChromeRuntimeProvider.checkErrorHandler);
	}

	public static async like(commentId: string): Promise<boolean> {
		return await ChromeRuntimeProvider.fetch<null>(ENDPOINTS.COMMENT.LIKE, { commentId }).then(ChromeRuntimeProvider.checkSuccessHandler);
	}

	public static async dislike(commentId: string): Promise<boolean> {
		return await ChromeRuntimeProvider.fetch<null>(ENDPOINTS.COMMENT.DISLIKE, { commentId }).then(ChromeRuntimeProvider.checkSuccessHandler);
	}

	public static async delete(commentId: string): Promise<boolean> {
		return await ChromeRuntimeProvider.fetch<null>(ENDPOINTS.COMMENT.DELETE, { commentId }).then(ChromeRuntimeProvider.checkSuccessHandler);
	}

	public static async getById(commentId: string): Promise<Comment | null> {
		return await ChromeRuntimeProvider.fetch<null>(ENDPOINTS.COMMENT.GET_BY_ID, { commentId }).then(ChromeRuntimeProvider.checkErrorHandler);
	}
}
