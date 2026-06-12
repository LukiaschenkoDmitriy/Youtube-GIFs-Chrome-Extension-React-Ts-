import { useEffect, useRef } from 'react';

const DefaultCommentsPanel = () => {
	const defaultPanelRef = useRef(null);

	useEffect(() => {
		const videoCommentsBlock = document.querySelector('ytd-comments');
		const shortCommentBlock = document.querySelector('ytd-engagement-panel-section-list-renderer[match-content-theme="ENGAGEMENT_PANEL_VISIBILITY_EXPANDED"]');

		if (videoCommentsBlock && defaultPanelRef.current) {
			const current = defaultPanelRef.current as HTMLElement;
			current.appendChild(videoCommentsBlock);
		}

		if (shortCommentBlock && defaultPanelRef.current) {
			const current = defaultPanelRef.current as HTMLElement;
			current.appendChild(shortCommentBlock);
		}
	}, []);

	return <div ref={defaultPanelRef} className="yt-default-panel"></div>;
};

export default DefaultCommentsPanel;
