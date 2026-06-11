import React, { useCallback, useEffect, useState } from 'react';
import Comment from '@Base/dto/Comment';
import useDIGet from '@Base/hook/useDIGet';
import useOAuth from '@Base/hook/useOAuth';
import EventEmitter from '@Base/event/EventEmitter';
import { DIServices } from '@Base/di';
import useCurrentVideoId from '@Content/hook/useCurrentVideoId';
import Gif from '@Base/dto/Gif';
import CommentItem from '@Content/components/comment/CommentItem';
import { findRootId, removeFromTree, updateLikeInTree } from '@Content/utils/comment';
import EVENTS from '@Base/events';
import CommentClientProvider from '@Client/runtime/CommentClientProvider';

const Comments = () => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [loading, setLoading] = useState(true);

	const { user } = useOAuth();
	const { videoId } = useCurrentVideoId();

	const emitter = useDIGet<EventEmitter>(DIServices.EventEmitter);

	useEffect(() => {
		if (!videoId) return;
		setLoading(true);

		const off = emitter.on(EVENTS.COMMENT_ADDED, (comment: Comment) => {
			setComments((prev: Comment[]) => [...prev, comment]);
		});

		CommentClientProvider.getByVideoId(videoId)
			.then(c => setComments(c ?? []))
			.finally(() => setLoading(false));

		return () => off();
	}, [videoId, user, emitter]);

	const updateRootComment = useCallback((updated: Comment) => {
		setComments(prev => prev.map(c => (c.id === updated.id ? updated : c)));
	}, []);

	const handleLike = useCallback((commentId: string) => {
		CommentClientProvider.like(commentId).then(ok => ok && setComments(prev => updateLikeInTree(prev, commentId, 'like')));
	}, []);

	const handleDislike = useCallback((commentId: string) => {
		CommentClientProvider.dislike(commentId).then(ok => ok && setComments(prev => updateLikeInTree(prev, commentId, 'dislike')));
	}, []);

	const handleDelete = useCallback((commentId: string) => {
		CommentClientProvider.delete(commentId).then(ok => ok && setComments(prev => removeFromTree(prev, commentId)));
	}, []);

	const handleReplySubmit = useCallback(
		async (commentId: string, text: string, gif: Gif | null) => {
			const comment = {
				video_id: videoId,
				text: text.length === 0 ? null : text,
				gif_url: gif?.url ?? null,
				user_id: user?.id,
				answer_to: commentId,
			} as Comment;

			await CommentClientProvider.create(comment);
			const root = await CommentClientProvider.getById(findRootId(comments, commentId));
			if (root) updateRootComment(root);
		},
		[user, videoId, comments, updateRootComment]
	);

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
				<CommentItem key={c.id ?? i} c={c} user={user} depth={0} onLike={handleLike} onDislike={handleDislike} onDelete={handleDelete} onReplySubmit={handleReplySubmit} />
			))}
		</div>
	);
};

export default Comments;
