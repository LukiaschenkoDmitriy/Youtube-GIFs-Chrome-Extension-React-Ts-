import React, { useEffect, useState } from "react";
import Comment from "@Base/dto/Comment";
import useDIGet from "@Base/hook/useDIGet";
import ENDPOINTS from "@Base/endpoints";
import useOAuth from "@Base/hook/useOAuth";
import EventEmitter from "@Base/event/EventEmitter";
import {DIServices} from "@Base/di";
import useCurrentVideoId from "@Content/hook/useCurrentVideoId";
import Gif from "@Base/dto/Gif";
import CommentItem from "@Content/components/comment/CommentItem";
import {findRootId, removeFromTree, updateLikeInTree} from "@Content/utils/comment";
import RuntimeProvider from "@Base/service/RuntimeProvider";
import EVENTS from "@Base/events";

const Comments = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    const { user } = useOAuth();
    const { videoId } = useCurrentVideoId();

    const runtime = useDIGet<RuntimeProvider>(DIServices.RuntimeProvider);
    const emitter = useDIGet<EventEmitter>(DIServices.EventEmitter);

    useEffect(() => {
        if (!videoId) return;
        setLoading(true);

        const off = emitter.on(EVENTS.COMMENT_ADDED, (comment: Comment) => {
            setComments((prev: Comment[]) => [...prev, comment]);
        });

        runtime.fetch(ENDPOINTS.COMMENT.GET_BY_VIDEO_ID.NAME, { videoId }).then((data: any) => setComments(data ?? [])).finally(() => setLoading(false));

        return () => off();
    }, [videoId]);

    const updateRootComment = (updated: Comment) => {
        setComments((prev) => prev.map((c) => c.id === updated.id ? updated : c));
    };

    const handleLike = (commentId: string) => {
        runtime.fetch(ENDPOINTS.COMMENT.LIKE.NAME, { commentId }).then(() => {
            setComments((prev) => updateLikeInTree(prev, commentId, "like"));
        });
    };

    const handleDislike = (commentId: string) => {
        runtime.fetch(ENDPOINTS.COMMENT.DISLIKE.NAME, { commentId }).then(() => {
            setComments((prev) => updateLikeInTree(prev, commentId, "dislike"));
        });
    };

    const handleDelete = (commentId: string) => {
        runtime.fetch(ENDPOINTS.COMMENT.DELETE.NAME, { commentId }).then(() => {
            setComments((prev) => removeFromTree(prev, commentId));
        });
    };

    const handleReplySubmit = (commentId: string, text: string, gif: Gif | null) => {
        const comment = new Comment({
            video_id: videoId,
            text: text.length === 0 ? null : text,
            gif_url: gif?.url ?? null,
            user_id: user?.id,
            answer_to: commentId,
        });

        runtime.fetch(ENDPOINTS.COMMENT.CREATE.NAME, { comment }).then(() => {
            const rootId = findRootId(comments, commentId);
            runtime.fetch(ENDPOINTS.COMMENT.GET_BY_ID.NAME, { commentId: rootId }).then((updated: any) => {
                updateRootComment(updated);
            });
        });
    };

    if (loading) {
        return (
            <div className="gc-comments">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="gc-comment-skeleton">
                        <div className="gc-comment-skeleton__avatar" />
                        <div className="gc-comment-skeleton__body">
                            <div className="gc-comment-skeleton__line gc-comment-skeleton__line--short" />
                            <div className="gc-comment-skeleton__line" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!comments.length) {
        return (
            <div className="gc-comments gc-comments--empty">
                <p className="gc-comments__empty-text">No GIF comments yet. Be the first!</p>
            </div>
        );
    }

    return (
        <div className="gc-comments">
            {comments.map((c, i) => (
                <CommentItem
                    key={c.id ?? i}
                    c={c}
                    user={user}
                    depth={0}
                    onLike={handleLike}
                    onDislike={handleDislike}
                    onDelete={handleDelete}
                    onReplySubmit={handleReplySubmit}
                />
            ))}
        </div>
    );
};

export default Comments;