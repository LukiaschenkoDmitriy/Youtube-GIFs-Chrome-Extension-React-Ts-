import {useEffect, useState} from "react";

const useIsYoutube = () => {
    const [isYoutube, setIsYoutube] = useState<boolean | null>(null);

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]: any) => {
            try {
                const host = tab?.url ? new URL(tab.url).hostname : "";
                setIsYoutube(host === "youtube.com" || host.endsWith(".youtube.com"));
            } catch {
                setIsYoutube(false);
            }
        });
    }, []);

    return isYoutube;
}

export default useIsYoutube;