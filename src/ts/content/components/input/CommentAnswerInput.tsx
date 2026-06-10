import React, { useEffect, useRef, useState } from 'react';
import Gif from '@Base/dto/Gif';
import EVENTS from '@Base/events';
import { DIServices } from '@Base/di';
import useDIGet from '@Base/hook/useDIGet';
import EventEmitter from '@Base/event/EventEmitter';
import GifsPallet from '@Content/components/gif/GifsPallet';

interface CommentAnswerInputProps {
	commentId: string;
	onSubmit: (commentId: string, text: string, gif: Gif | null) => void;
	onCancel: () => void;
}

const CommentAnswerInput = ({ commentId, onSubmit, onCancel }: CommentAnswerInputProps) => {
	const [text, setText] = useState('');
	const [selectedGif, setSelectedGif] = useState<Gif | null>(null);
	const [gifPalletOpen, setGifPalletOpen] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);

	const emitter = useDIGet<EventEmitter>(DIServices.EventEmitter);

	useEffect(() => {
		const off = emitter.on(EVENTS.GIF_ANSWER_SELECTED, (gif: Gif) => {
			setSelectedGif(gif);
			setGifPalletOpen(false);
			inputRef.current?.focus();
		});

		return () => off();
	}, []);

	const handleSubmit = () => {
		if (!text.trim() && !selectedGif) return;
		onSubmit(commentId, text, selectedGif);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
		if (e.key === 'Escape') {
			onCancel();
		}
	};

	return (
		<div className="ca-input">
			{gifPalletOpen && (
				<div className="ca-input__pallet">
					<GifsPallet type={'Answer'} />
				</div>
			)}

			{/* GIF превью */}
			{selectedGif && (
				<div className="ca-input__gif-preview">
					<img src={selectedGif.url} alt={selectedGif.title} className="ca-input__gif-img" />
					<button className="ca-input__gif-remove" onClick={() => setSelectedGif(null)}>
						<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
							<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
						</svg>
					</button>
				</div>
			)}

			{/* Input row */}
			<div className="ca-input__row">
				{/* GIF toggle button */}
				<button className={`ca-input__gif-btn${gifPalletOpen ? ' ca-input__gif-btn--active' : ''}`} onClick={() => setGifPalletOpen(v => !v)} title="Add GIF">
					<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
						<rect x="2" y="6" width="20" height="14" rx="2" />
						<path d="M8 12v3M12 12v3M12 12h2.5a1.5 1.5 0 0 1 0 3H12M16 12v3" />
					</svg>
				</button>

				<input ref={inputRef} value={text} onChange={e => setText(e.target.value)} onKeyDown={handleKeyDown} placeholder="Add a reply..." className="ca-input__text" autoFocus />

				{/* Actions */}
				<div className="ca-input__actions">
					<button className="ca-input__cancel-btn" onClick={onCancel}>
						Cancel
					</button>
					<button className={`ca-input__submit-btn${!text.trim() && !selectedGif ? ' ca-input__submit-btn--disabled' : ''}`} onClick={handleSubmit} disabled={!text.trim() && !selectedGif}>
						Reply
					</button>
				</div>
			</div>
		</div>
	);
};

export default CommentAnswerInput;
