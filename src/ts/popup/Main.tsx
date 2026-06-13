import React, { useState } from 'react';
import useOAuth from '@Base/hook/useOAuth';
import Dashboard from '@PopUp/components/Dashboard';
import LoginScreen from '@PopUp/components/LoginScreen';
import LoadingScreen from '@PopUp/components/LoadingScreen';
import Settings from '@PopUp/components/Settings';

const Main: React.FC = () => {
	const { user, login, loading, logout } = useOAuth();
	const [view, setView] = useState<'dashboard' | 'settings'>('dashboard');

	if (loading) return <LoadingScreen />;
	if (!user) return <LoginScreen onLogin={login} />;
	if (view === 'settings') return <Settings onBack={() => setView('dashboard')} />;
	return <Dashboard user={user} onLogout={logout} onOpenSettings={() => setView('settings')} />;
};

export default Main;
