import { useEffect, useRef } from 'react';

const DefaultCommentsPanel = () => {
	const defaultPanelRef = useRef(null);

	useEffect(() => {
		const commentsBlock = document.querySelector('ytd-comments');

		if (commentsBlock && defaultPanelRef.current) {
			const current = defaultPanelRef.current as HTMLElement;
			current.appendChild(commentsBlock);
		}
	}, []);

	return <div ref={defaultPanelRef} className="yt-default-panel"></div>;
};

export default DefaultCommentsPanel;
