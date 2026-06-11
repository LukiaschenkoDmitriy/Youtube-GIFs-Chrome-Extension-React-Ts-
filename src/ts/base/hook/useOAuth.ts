import { useContext } from 'react';
import { OAuthContext } from '@Base/provider/OAuthProvider';
import UserClientProvider from '@Client/runtime/UserClientProvider';

const useOAuth = () => {
	const { user, setUser, loading } = useContext(OAuthContext);

	const logout = async () => {
		await UserClientProvider.logout();
		setUser(null);
	};

	const login = async () => {
		if (user) return;
		setUser(await UserClientProvider.login());
	};

	return { user, login, logout, loading };
};

export default useOAuth;
