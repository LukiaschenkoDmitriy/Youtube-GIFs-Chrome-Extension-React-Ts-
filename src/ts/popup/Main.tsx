import React, { useEffect } from "react";

import useOAuth from "@Base/hook/useOAuth";
import LoginScreen from "@PopUp/components/LoginScreen";
import Dashboard from "@PopUp/components/Dashboard";
import LoadingScreen from "@PopUp/components/LoadingScreen";

const Main: React.FC = () => {
    const { user, getUser, login, loading, logout } = useOAuth();

    useEffect(() => {getUser()}, []);
    useEffect(() => {}, [user, loading]);

    if (loading) return <LoadingScreen />;
    if (!user) return <LoginScreen onLogin={login} />;
    return <Dashboard user={user} onLogout={logout} />;
};

export default Main;