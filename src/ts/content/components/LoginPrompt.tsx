const LoginPrompt = () => {
	const handleOpen = () => {
		chrome.runtime.sendMessage({ type: 'OPEN_POPUP' });
	};

	return (
		<div className="lp">
			<div className="lp__icon">
				<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
					<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
					<circle cx="12" cy="7" r="4" />
				</svg>
			</div>
			<p className="lp__title">Sign in to leave a GIF comment</p>
			<p className="lp__desc">Open the extension to sign in with your Google account</p>
			<button className="lp__btn" onClick={handleOpen}>
				<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
					<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
					<polyline points="15 3 21 3 21 9" />
					<line x1="10" y1="14" x2="21" y2="3" />
				</svg>
				Open extension
			</button>
		</div>
	);
};

export default LoginPrompt;
