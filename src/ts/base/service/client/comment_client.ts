import Comment from "@Base/dto/Comment";
import AbstractGCClient from "@Base/service/client/abstract_client";
import ENDPOINTS from "@Base/service/client/endpoints";

export default class CommentClient extends AbstractGCClient {
    public async getById(commentId: string) {
        const response = await this.useEndpoint(ENDPOINTS.COMMENT.GET_BY_ID, {
            params: {
                commentId: commentId
            }
        })

        const data = await response.json();

        if (!response.ok) return data;

        return new Comment(data.data);
    }
    public async delete(commentId: string) {
        const response = await this.useEndpoint(ENDPOINTS.COMMENT.DELETE, {
            params: {
                commentId: commentId
            }
        })

        return await response.json();
    }
    public async like(commentId: string) {
        const response = await this.useEndpoint(ENDPOINTS.COMMENT.LIKE, {
            params: {
                commentId: commentId
            }
        })

        return await response.json();
    }
    public async dislike(commentId: string) {
        const response = await this.useEndpoint(ENDPOINTS.COMMENT.DISLIKE, {
            params: {
                commentId: commentId
            }
        });

        return await response.json();
    }
    public async getByVideoId(videoId: string) {
        const response = await this.useEndpoint(ENDPOINTS.COMMENT.GET_BY_VIDEO_ID, {
            params: {
                videoId: videoId
            }
        })

        const data = await response.json();

        if (!response.ok) return data;

        if (data.data == null) {
            return [];
        }

        const comments: Comment[] = [];

        data.data.forEach((comment: any) => {
            comments.push(new Comment(comment))
        })

        return comments;
    }

    public async create(comment: Comment) {
        const response = await this.useEndpoint(ENDPOINTS.COMMENT.CREATE, {
            body: {
                user_id: comment.userId,
                video_id: comment.videoId,
                gif_url: comment.gifUrl,
                text: comment.text,
                answer_to: comment.answerTo
            }
        })

        const data = await response.json();

        if (!response.ok) return data;

        return new Comment(data.data);
    }
}