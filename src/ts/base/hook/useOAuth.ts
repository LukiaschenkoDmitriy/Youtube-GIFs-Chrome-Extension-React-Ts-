import {useContext, useEffect, useState} from "react";
import {DIServices} from "@Base/di";
import ENDPOINTS from "@Base/endpoints";
import useDIGet from "@Base/hook/useDIGet";
import RuntimeProvider from "@Base/service/RuntimeProvider";
import {OAuthContext} from "@Base/provider/OAuthProvider";

const useOAuth = () => {
    const {user, setUser} = useContext(OAuthContext);
    const [loading, setLoading] = useState<boolean>(false);

    const runtime = useDIGet<RuntimeProvider>(DIServices.RuntimeProvider)

    useEffect(() => {loadUser();}, [])

    const logout = async () => {
        await runtime.fetch(ENDPOINTS.USER.LOGOUT.NAME);
        setUser(null)
    }

    const loadUser = () => {
        if (user) return user;

        runtime.fetch(ENDPOINTS.USER.CURRENT.NAME).then((data) => {
            if (!data.error) setUser(data)
        })

        return user;
    }

    const login = () => {
        if (user) return user;
        setLoading(true);

        runtime.fetch(ENDPOINTS.USER.CURRENT.NAME).then((data) => {
            if (data.error) return runtime.login();
            setUser(data);
        }).then((data) => {
            if (data === undefined || data === null) return;
            setUser(data);
        }).finally(() => setLoading(false))
    }

    return { user, login, logout, loading };
}

export default useOAuth;