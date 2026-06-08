import {useEffect, useState} from "react";

const useCurrentVideoId = () => {
    const [videoId, setVideoId] = useState<string | null>(
        new URLSearchParams(window.location.search).get("v")
    );

    useEffect(() => {
        const getVideoId = () => new URLSearchParams(window.location.search).get("v");

        const handleMessage = (message: any) => {
            if (message.type === "URL_CHANGED") {
                const id = new URLSearchParams(new URL(message.url).search).get("v");
                setVideoId(id);
            }
        };

        chrome.runtime.onMessage.addListener(handleMessage);
        return () => chrome.runtime.onMessage.removeListener(handleMessage);
    }, []);

    return { videoId };
};

export default useCurrentVideoId;