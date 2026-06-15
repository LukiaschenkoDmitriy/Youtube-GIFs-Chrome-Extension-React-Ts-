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
import { addReply, applyReaction, CommentMap, removeComment } from '@Content/utils/comment';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const Comments = () => {
	const [entities, setEntities] = useState<CommentMap>({});
	const [rootIds, setRootIds] = useState<string[]>([]);
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
			if (!comment) return;
			setEntities(prev => ({ ...prev, [comment.id]: comment }));
			setRootIds(prev => [comment.id, ...prev]);
			setCount(prev => prev + 1);
		});

		CommentClientProvider.getByVideoId(videoId, nextCursor, 20)
			.then(c => {
				setHasCursor(c?.meta.has_cursor ?? true)
				setNextCursor(c?.meta.next_cursor ?? 0)
				setEntities(c?.entities ?? {});
				setRootIds(c?.roots ?? []);
				setCount(c?.meta.comments_count ?? 0);
			})
			.finally(() => setLoading(false));

		return () => off();
	}, [videoId, user, emitter, setCount]);

	const handleLike = useCallback((commentId: string) => {
		setEntities(prev => applyReaction(prev, commentId, 'like'))
		CommentClientProvider.like(commentId).then(ok => !ok && setEntities(prev => applyReaction(prev, commentId, 'like')));
	}, []);

	const handleDislike = useCallback((commentId: string) => {
		setEntities(prev => applyReaction(prev, commentId, 'dislike'))
		CommentClientProvider.dislike(commentId).then(ok => !ok && setEntities(prev => applyReaction(prev, commentId, 'dislike')));
	}, []);

	const handleDelete = useCallback((commentId: string) => {
		CommentClientProvider.delete(commentId).then(ok => {
			if (!ok) return;
			setEntities(prev => removeComment(prev, commentId));
			setRootIds(prev => prev.filter(id => id !== commentId));
		});
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

			const created = await CommentClientProvider.create(comment);
			if (created) setEntities(prev => addReply(prev, commentId, created));
		},
		[user, videoId]
	);

	const loadMore = useCallback(() => {
		if (!videoId || loadingMore || !hasCursor) return;

		setLoadingMore(true);
		CommentClientProvider.getByVideoId(videoId, nextCursor, 20)
			.then(c => {
				setHasCursor(c?.meta.has_cursor ?? false);
				setNextCursor(c?.meta.next_cursor ?? 0);
				setEntities(prev => ({ ...prev, ...(c?.entities ?? {}) }));
				setRootIds(prev => [...prev, ...(c?.roots ?? [])]);
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

	const roots = useMemo(() => rootIds.map(id => entities[id]).filter(Boolean), [rootIds, entities]);

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

	if (!roots.length) {
		return (
			<div className="gc-comments gc-comments--empty">
				<p className="gc-comments__empty-text">No GIF comments yet. Be the first!</p>
			</div>
		);
	}

	return (
		<div className="gc-comments">
			{roots.map((c, i) => (
				<CommentItem key={c.id ?? i} c={c} entities={entities} user={user} depth={0} onLike={handleLike} onDislike={handleDislike} onDelete={handleDelete} onReplySubmit={handleReplySubmit} />
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
