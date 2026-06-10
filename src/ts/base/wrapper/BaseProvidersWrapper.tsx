import React from 'react';
import di from '@Base/di';
import OAuthProvider from '@Base/provider/OAuthProvider';
import { DIContext } from '@Base/context/DIContext';
import VideoProvider from '@Content/provider/VideoProvider';

const BaseProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<DIContext.Provider value={{ container: di }}>
			<OAuthProvider>
				<VideoProvider>{children}</VideoProvider>
			</OAuthProvider>
		</DIContext.Provider>
	);
};

export default BaseProvidersWrapper;
