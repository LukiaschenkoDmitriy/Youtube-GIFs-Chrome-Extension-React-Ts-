import { useEffect, useState } from 'react';
import ChromeRuntimeProvider from '@Client/runtime/ChromeRuntimeProvider';

const useIsYoutube = () => {
	const [isYoutube, setIsYoutube] = useState<boolean | null>(null);

	useEffect(() => {
		// eslint-disable-next-line
		ChromeRuntimeProvider.openTab(true, true, (tab: any) => {
			try {
				const host = tab?.url ? new URL(tab.url).hostname : '';
				setIsYoutube(host === 'youtube.com' || host.endsWith('.youtube.com'));
			} catch {
				setIsYoutube(false);
			}
		});
	}, []);

	return isYoutube;
};

export default useIsYoutube;
