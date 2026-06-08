import {useContext, useState} from "react";
import useDIGet from "@Base/hook/useDIGet";
import ChromeService from "@Base/service/chrome";
import {OAuthContext} from "@Base/provider/OAuthProvider";
import ENDPOINTS from "@Base/service/client/endpoints";
import {SERVICE} from "@Base/di";

const useOAuth = () => {
    const {user, setUser} = useContext(OAuthContext);

    const [loading, setLoading] = useState<boolean>(false);

    const chromeService = useDIGet<ChromeService>(SERVICE.ChromeService)

    const logout = async () => {
        await chromeService.fetch(ENDPOINTS.USER.LOGOUT.NAME);
        setUser(null)
    }

    const getUser = () => {
        if (user) return user;

        (async () => {
           let data = await chromeService.fetch(ENDPOINTS.USER.CURRENT.NAME);

           if (!data.error) {
               setUser(data)
           }
        })()

        return user;
    }

    const login = () => {
        if (user) return user;
        setLoading(true);

        (async () => {
            // Trying to get user by session user id
            let data = await chromeService.fetch(ENDPOINTS.USER.CURRENT.NAME);

            if (data.error) {
                // If user is not logged in by session, trying to login with help OAuth
                await chromeService.login();
            } else {
                // if data is instanceof UserDTO - save it
                setUser(data);
                return user;
            }

            // If user successes logged in by OAuth2 ( login by OAuth2 saved user_id in session )
            data = await chromeService.fetch(ENDPOINTS.USER.CURRENT.NAME);

            // If user not logged in by OAuth2 - It was interrupted
            if (data.error) {
                console.error(data.error);
            } else {
                // Other way just save user data
                setUser(data);
                return user;
            }

            return null;
        })().then(() => {
            setLoading(false);
        });
    }

    return { user, getUser, login, logout, loading };
}

export default useOAuth;