import React, { createContext, useEffect, useState } from 'react';

interface IVideoContext {
	videoId: string | null;
}

export const VideoContext = createContext<IVideoContext>({
	videoId: null,
});

// Watch pages keep the id in ?v=, shorts keep it in the path: /shorts/{id}
const getVideoIdFromUrl = (url: string): string | null => {
	try {
		const parsed = new URL(url, window.location.origin);
		return parsed.searchParams.get('v') ?? parsed.pathname.match(/^\/shorts\/([\w-]+)/)?.[1] ?? null;
	} catch {
		return null;
	}
};

const VideoProvider = ({ children }: { children: React.ReactNode }) => {
	const [videoId, setVideoId] = useState<string | null>(() => getVideoIdFromUrl(window.location.href));

	useEffect(() => {
		// eslint-disable-next-line
		const handleMessage = (message: any) => {
			if (message.type === 'URL_CHANGED') {
				setVideoId(getVideoIdFromUrl(message.url));
			}
		};

		// YouTube dispatches this on every SPA navigation, including scrolling between shorts
		const handleNavigate = () => setVideoId(getVideoIdFromUrl(window.location.href));

		chrome.runtime.onMessage.addListener(handleMessage);
		document.addEventListener('yt-navigate-finish', handleNavigate);

		return () => {
			chrome.runtime.onMessage.removeListener(handleMessage);
			document.removeEventListener('yt-navigate-finish', handleNavigate);
		};
	}, []);

	return <VideoContext.Provider value={{ videoId }}>{children}</VideoContext.Provider>;
};

export default VideoProvider;
