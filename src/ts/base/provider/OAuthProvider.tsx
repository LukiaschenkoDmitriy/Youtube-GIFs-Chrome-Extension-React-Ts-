import React, { createContext, useEffect, useState } from 'react';
import User from '@Base/dto/User';
import UserClientProvider from '@Client/runtime/UserClientProvider';

interface IOAuthContext {
	user: User | null;
	setUser: (user: User | null) => void;
	loading: boolean;
}

export const OAuthContext = createContext<IOAuthContext>({
	user: null,
	setUser: () => {},
	loading: false,
});

const OAuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		UserClientProvider.getCurrent()
			.then(setUser)
			.finally(() => setLoading(false));

		const loggedInHandler = (message: { type: string }) => {
			if (message.type === 'USER_LOGGED_IN') {
				UserClientProvider.getCurrent().then(setUser);
			}
		};

		const loggedOutHandler = (message: { type: string }) => {
			if (message.type === 'USER_LOGGED_OUT') {
				setUser(null);
			}
		};

		chrome.runtime.onMessage.addListener(loggedInHandler);
		chrome.runtime.onMessage.addListener(loggedOutHandler);

		return () => {
			chrome.runtime.onMessage.removeListener(loggedInHandler);
			chrome.runtime.onMessage.removeListener(loggedOutHandler);
		};
	}, []);

	return <OAuthContext.Provider value={{ user, setUser, loading }}>{children}</OAuthContext.Provider>;
};

export default OAuthProvider;
