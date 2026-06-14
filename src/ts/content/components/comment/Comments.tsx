import { DIServices } from '@Base/di';
import Comment from '@Base/dto/Comment';
import Gif from '@Base/dto/Gif';
import EventEmitter from '@Base/event/EventEmitter';
import EVENTS from '@Base/events';
import useDIGet from '@Base/hook/useDIGet';
import useOAuth from '@Base/hook/useOAuth';
import { CommentCounterContext } from '@Base/provider/CommentCounterProvider';
import CommentClientProvider from '@Client/runtime/CommentClientProvider';
import CommentItem from '@Content/components/comment/CommentItem';
import useCurrentVideoId from '@Content/hook/useCurrentVideoId';
import { PaginationContext } from '@Content/provider/PaginationProvider';
import { findRootId, removeFromTree, updateLikeInTree } from '@Content/utils/comment';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

const Comments = () => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [loading, setLoading] = useState(true);

	const [loadingMore, setLoadingMore] = useState(false);
	const sentinelRef = useRef<HTMLDivElement | null>(null);

	const { setCount } = useContext(CommentCounterContext);
	const { nextCursor, setNextCursor, hasCursor, setHasCursor } = useContext(PaginationContext)

	const { user } = useOAuth();
	const { videoId } = useCurrentVideoId();

	const emitter = useDIGet<EventEmitter>(DIServices.EventEmitter);

	useEffect(() => {
		if (!videoId) return;
		setLoading(true);

		const off = emitter.on(EVENTS.COMMENT_ADDED, (comment: Comment) => {
			setComments((prev: Comment[]) => [comment, ...prev]);
			setCount(prev => prev + 1);
		});

		CommentClientProvider.getByVideoId(videoId, nextCursor, 20)
			.then(c => {
				setHasCursor(c?.meta.has_cursor ?? true)
				setNextCursor(c?.meta.next_cursor ?? 0)
				setComments(c?.entities ?? []);
				setCount(c?.meta.comments_count ?? 0);
			})
			.finally(() => setLoading(false));

		return () => off();
	}, [videoId, user, emitter, setCount]);

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

	const loadMore = useCallback(() => {
		if (!videoId || loadingMore || !hasCursor) return;

		setLoadingMore(true);
		CommentClientProvider.getByVideoId(videoId, nextCursor, 20)
			.then(c => {
				setHasCursor(c?.meta.has_cursor ?? false);
				setNextCursor(c?.meta.next_cursor ?? 0);
				setComments(prev => [...prev, ...(c?.entities ?? [])]);
			})
			.finally(() => setLoadingMore(false));
	}, [videoId, loadingMore, hasCursor, nextCursor, setHasCursor, setNextCursor]);

	useEffect(() => {
		const el = sentinelRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting) loadMore();
			},
			{ rootMargin: '200px' }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [loadMore]);


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

			{hasCursor && (
				<div ref={sentinelRef} className="gc-comments__sentinel">
					{loadingMore && (
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
					)}
				</div>
			)}
		</div>
	);
};

export default Comments;
