import User from "@Base/dto/User";
import Comment from "@Base/dto/Comment";
import {useState} from "react";
import Gif from "@Base/dto/Gif";
import CommentAnswerInput from "@Content/components/CommentAnswerInput";
import {formatTime} from "@Content/utils/time";

import "./index.scss"
import ConfirmDeletePopup from "@Content/components/ConfirmDeletePopup";

interface CommentItemProps {
    c: Comment;
    user: User | null;
    depth: number;
    onLike: (id: string) => void;
    onDislike: (id: string) => void;
    onDelete: (id: string) => void;
    onReplySubmit: (commentId: string, text: string, gif: Gif | null) => void;
}

const CommentItem = ({ c, user, depth, onLike, onDislike, onDelete, onReplySubmit }: CommentItemProps) => {
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
    const [answersOpen, setAnswersOpen] = useState(false);

    const indent = Math.min(depth, 4) * 32;

    return (
        <div className={`gc-comment${depth > 0 ? " gc-comment--reply" : ""}`}>
            {/* Avatar */}
            <div className="gc-comment__avatar">
                {c.user?.picture
                    ? <img src={c.user.picture} alt={c.user.customUrl} className="gc-comment__avatar-img" />
                    : <div className="gc-comment__avatar-placeholder">
                        {c.user?.customUrl?.[0]?.toUpperCase() ?? "?"}
                    </div>
                }
            </div>

            {/* Body */}
            <div className="gc-comment__body">
                <div className="gc-comment__header">
                    <span className="gc-comment__author">{c.user?.customUrl ?? "Unknown"}</span>
                    <span className="gc-comment__time">{formatTime(c.createdAt)}</span>
                </div>

                {c.gifUrl && <img src={c.gifUrl} alt="gif" className="gc-comment__gif" />}
                {c.text && <p className="gc-comment__text">{c.text}</p>}

                {/* Actions */}
                <div className="gc-comment__actions">
                    <button
                        className={`gc-comment__action-btn${c.likedByMe ? " gc-comment__action-btn--active" : ""}`}
                        onClick={() => onLike(c.id)}
                    >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill={c.likedByMe ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
                            <path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                        </svg>
                        {c.likes > 0 && <span>{c.likes}</span>}
                    </button>

                    <button
                        className={`gc-comment__action-btn${c.dislikedByMe ? " gc-comment__action-btn--active" : ""}`}
                        onClick={() => onDislike(c.id)}
                    >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill={c.dislikedByMe ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
                            <path d="M17 14V2M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
                        </svg>
                    </button>

                    {c.userId === user?.id && (
                        <button
                            className="gc-comment__action-btn gc-comment__action-btn--delete"
                            onClick={() => setDeleteTarget(c.id)}
                        >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                                <path d="M10 11v6M14 11v6" />
                            </svg>
                        </button>
                    )}

                    <button className="yt-reply-btn" onClick={() => setReplyingTo(c.id)}>
                        Reply
                    </button>
                </div>

                {/* Answer input */}
                {replyingTo === c.id && (
                    <CommentAnswerInput
                        commentId={c.id}
                        onSubmit={(commentId, text, gif) => {
                            onReplySubmit(commentId, text, gif);
                            setReplyingTo(null);
                        }}
                        onCancel={() => setReplyingTo(null)}
                    />
                )}

                {depth === 0 && c.answers && c.answers.length > 0 && (
                    <button
                        className={`gc-comment__answers-toggle${answersOpen ? " gc-comment__answers-toggle--open" : ""}`}
                        onClick={() => setAnswersOpen((v) => !v)}
                    >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M12 15.5l-6-6 1.41-1.41L12 12.67l4.59-4.58L18 9.5z" />
                        </svg>
                        {answersOpen ? "Hide replies" : `${c.answers.length} ${c.answers.length === 1 ? "reply" : "replies"}`}
                    </button>
                )}

                {c.answers && c.answers.length > 0 && (depth > 0 || answersOpen) && (
                    <div className="gc-comment__answers">
                        {c.answers.map((answer, i) => (
                            <CommentItem
                                key={answer.id ?? i}
                                c={answer}
                                user={user}
                                depth={depth + 1}
                                onLike={onLike}
                                onDislike={onDislike}
                                onDelete={onDelete}
                                onReplySubmit={onReplySubmit}
                            />
                        ))}
                    </div>
                )}
            </div>
            {deleteTarget && (
                <ConfirmDeletePopup
                    onConfirm={() => {
                        onDelete(deleteTarget);
                        setDeleteTarget(null);
                    }}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </div>
    );
};

export default CommentItem;