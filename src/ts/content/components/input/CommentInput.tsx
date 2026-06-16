import React, { useEffect, useRef, useState } from 'react';
import Gif from '@Base/dto/Gif';
import { DIServices } from '@Base/di';
import Comment from '@Base/dto/Comment';
import useOAuth from '@Base/hook/useOAuth';
import useDIGet from '@Base/hook/useDIGet';
import EventEmitter from '@Base/event/EventEmitter';
import useCurrentVideoId from '@Content/hook/useCurrentVideoId';
import EVENTS from '@Base/events';
import CommentClientProvider from '@Client/runtime/CommentClientProvider';

const CommentInput = () => {
	const [text, setText] = useState('');
	const [selectedGif, setSelectedGif] = useState<Gif | null>(null);
	const [loading, setLoading] = useState<boolean>(false)

	const inputRef = useRef<HTMLInputElement>(null);

	const { user } = useOAuth();
	const { videoId } = useCurrentVideoId();

	const emitter = useDIGet<EventEmitter>(DIServices.EventEmitter);

	useEffect(() => {
		const off = emitter.on(EVENTS.GIF_SELECTED, (gif: Gif) => {
			setSelectedGif(gif);
		});

		return () => off();
	}, [emitter]);

	const handleSubmit = () => {
		if (!selectedGif && !text.trim()) return;
		setLoading(true);

		const comment = {
			video_id: videoId,
			text: text.length == 0 ? null : text,
			gif_url: selectedGif?.url ?? null,
			user_id: user?.id,
		} as Comment;

		CommentClientProvider.create(comment).then(comment => {
			setText('');
			setSelectedGif(null);
			emitter.emit(EVENTS.COMMENT_ADDED, comment);
		}).finally(() => setLoading(false));
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	const onCancel = () => {
		setText('');
		setSelectedGif(null);
	};

	return (
		<div className="gc-compose">
			<div className={`gc-compose__box${selectedGif ? ' gc-compose__box--has-gif' : ''}`}>
				{selectedGif && (
					<div className="gc-compose__gif-preview">
						<img src={selectedGif.url} alt={selectedGif.title} className="gc-compose__gif-img" />
						<button className="gc-compose__gif-remove" onClick={() => setSelectedGif(null)}>
							<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
								<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
							</svg>
						</button>
					</div>
				)}

				<div className="gc-compose__input-row">
					<input ref={inputRef} value={text} onChange={e => setText(e.target.value)} onKeyDown={handleKeyDown} placeholder="Add a comment..." className="gc-compose__text-input" disabled={loading} />

					<div className="gc-compose__actions">
						{(selectedGif || text.trim()) && (
							<div className="ca-input__actions">
								<button className="ca-input__cancel-btn" onClick={onCancel} disabled={loading}>
									Cancel
								</button>
								<button className={`ca-input__submit-btn${loading ? ' ca-input__submit-btn--loading' : ''}${!text.trim() && !selectedGif ? ' ca-input__submit-btn--disabled' : ''}`} onClick={handleSubmit} disabled={loading || (!text.trim() && !selectedGif)}>
									{loading ? <span className="ca-input__spinner" /> : 'Send Comment'}
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommentInput;
