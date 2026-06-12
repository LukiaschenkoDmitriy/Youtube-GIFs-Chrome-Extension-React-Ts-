import React from 'react';
import useIsYoutube from '@PopUp/hook/useIsYoutube';
import '@PopUp/App.css';
import di from '@Base/di';
import { DIContext } from '@Base/context/DIContext';
import OAuthProvider from '@Base/provider/OAuthProvider';
import Main from './Main';
import NotYoutubeScreen from './components/NotYoutubeScreen';

const App: React.FC = () => {
	const isYoutube = useIsYoutube();

	return (
		<DIContext.Provider value={{ container: di }}>
			<OAuthProvider>
				{isYoutube ? <Main /> : <NotYoutubeScreen />}
			</OAuthProvider>
		</DIContext.Provider>
	)
};

export default App;