import Comment from '@Base/dto/Comment';
import Gif from '@Base/dto/Gif';
import User from '@Base/dto/User';
import { CommentCounterContext } from '@Base/provider/CommentCounterProvider';
import CommentAnswerInput from '@Content/components/input/CommentAnswerInput';
import ConfirmDeletePopup from '@Content/components/popup/ConfirmDeletePopup';
import ThumbDownIcon from '@Content/svg/ThumbDownIcon';
import ThumbUpIcon from '@Content/svg/ThumbUpIcon';
import { formatTime } from '@Content/utils/time';
import React, { useContext, useState } from 'react';

interface CommentItemProps {
	c: Comment;
	user: User | null;
	depth: number;
	onLike: (id: string) => void;
	onDislike: (id: string) => void;
	onDelete: (id: string) => void;
	onReplySubmit: (commentId: string, text: string, gif: Gif | null) => void;
}

const CommentItem = React.memo(({ c, user, depth, onLike, onDislike, onDelete, onReplySubmit }: CommentItemProps) => {
	const [isReplying, setIsReplying] = useState(false);
	const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
	const [answersOpen, setAnswersOpen] = useState(false);
	const { setCount } = useContext(CommentCounterContext);

	const hasAnswers = c.answers && c.answers.length > 0;

	const deleteHandler = (delTarget: string|null) => {
		onDelete(delTarget ?? "");
		if (!c.answer_to) {
			setCount(prev => prev - 1);
		}
	}

	return (
		<div className={`gc-comment${depth > 0 ? ' gc-comment--reply' : ''}`}>
			{/* Avatar */}
			<div className="gc-comment__avatar">{c.user?.picture ? <img src={c.user.picture} alt={c.user.custom_url} className="gc-comment__avatar-img" /> : <div className="gc-comment__avatar-placeholder">{c.user?.custom_url?.[0]?.toUpperCase() ?? '?'}</div>}</div>

			{/* Body */}
			<div className="gc-comment__body">
				<div className="gc-comment__header">
					<span className="gc-comment__author">{c.user?.custom_url ?? 'Unknown'}</span>
					<span className="gc-comment__time">{formatTime(c.created_at)}</span>
				</div>

				{c.gif_url && <img src={c.gif_url} alt="gif" className="gc-comment__gif" />}
				{c.text && <p className="gc-comment__text">{c.text}</p>}

				{/* Actions */}
				<div className="gc-comment__actions">
					<button className={`gc-comment__action-btn${c.liked_by_me ? ' gc-comment__action-btn--active' : ''}`} onClick={() => onLike(c.id)}>
						<ThumbUpIcon filled={c.liked_by_me} />
						{c.likes > 0 && <span>{c.likes}</span>}
					</button>

					<button className={`gc-comment__action-btn${c.disliked_by_me ? ' gc-comment__action-btn--active' : ''}`} onClick={() => onDislike(c.id)}>
						<ThumbDownIcon filled={c.disliked_by_me} />
					</button>

					{c.user_id === user?.id && (
						<button className="gc-comment__action-btn gc-comment__action-btn--delete" onClick={() => setDeleteTarget(c.id)}>
							<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
								<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
								<path d="M10 11v6M14 11v6" />
							</svg>
						</button>
					)}

					<button className="yt-reply-btn" onClick={() => setIsReplying(true)}>
						Reply
					</button>
				</div>

				{/* Answer input */}
				{isReplying && (
					<CommentAnswerInput
						commentId={c.id}
						onSubmit={(commentId, text, gif) => {
							onReplySubmit(commentId, text, gif);
							setIsReplying(false);
							setAnswersOpen(true);
						}}
						onCancel={() => setIsReplying(false)}
					/>
				)}

				{depth === 0 && hasAnswers && (
					<button className={`gc-comment__answers-toggle${answersOpen ? ' gc-comment__answers-toggle--open' : ''}`} onClick={() => setAnswersOpen(v => !v)}>
						<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
							<path d="M12 15.5l-6-6 1.41-1.41L12 12.67l4.59-4.58L18 9.5z" />
						</svg>
						{answersOpen ? 'Hide replies' : `${c.answers.length} ${c.answers.length === 1 ? 'reply' : 'replies'}`}
					</button>
				)}

				{hasAnswers && (depth > 0 || answersOpen) && (
					<div className="gc-comment__answers">
						{c.answers.map((answer, i) => (
							<CommentItem key={answer.id ?? i} c={answer} user={user} depth={depth + 1} onLike={onLike} onDislike={onDislike} onDelete={onDelete} onReplySubmit={onReplySubmit} />
						))}
					</div>
				)}
			</div>
			{deleteTarget && (
				<ConfirmDeletePopup
					onConfirm={() => {
						deleteHandler(deleteTarget);
						setDeleteTarget(null);
					}}
					onCancel={() => setDeleteTarget(null)}
				/>
			)}
		</div>
	);
});

CommentItem.displayName = 'CommentItem';
export default CommentItem;
