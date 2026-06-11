import React, { createContext, useEffect, useState } from 'react';

interface IVideoContext {
	videoId: string | null;
}

export const VideoContext = createContext<IVideoContext>({
	videoId: null,
});

const VideoProvider = ({ children }: { children: React.ReactNode }) => {
	const [videoId, setVideoId] = useState<string | null>(new URLSearchParams(window.location.search).get('v'));

	useEffect(() => {
		// eslint-disable-next-line
		const handleMessage = (message: any) => {
			if (message.type === 'URL_CHANGED') {
				const id = new URLSearchParams(new URL(message.url).search).get('v');
				setVideoId(id);
			}
		};

		chrome.runtime.onMessage.addListener(handleMessage);
		return () => chrome.runtime.onMessage.removeListener(handleMessage);
	}, []);

	return <VideoContext.Provider value={{ videoId }}>{children}</VideoContext.Provider>;
};

export default VideoProvider;
