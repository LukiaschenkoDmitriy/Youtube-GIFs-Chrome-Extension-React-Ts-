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

	const updateSettings = async (videosOn: boolean, shortsOn: boolean) => {
		if (!user) return;
		const prevUser = user;
		setUser({ ...user, settings_videos_on: videosOn, settings_shorts_on: shortsOn });
		const ok = await UserClientProvider.updateSettings(videosOn, shortsOn);

		if (!ok) {
			setUser(prevUser)
		}
	};

	return { user, login, logout, updateSettings, loading };
};

export default useOAuth;
