import React, {createContext} from "react";
import User from "@Base/dto/User";

interface IOAuthContext {
    user: User|null,
    setUser: (user: User|null) => void,
}

export const OAuthContext = createContext<IOAuthContext>({
    user: null,
    setUser: (user: User|null) => {}
})

const OAuthProvider = ({ children }: {children: any}) => {
    const [user, setUser] = React.useState<User|null>(null);

    return (
        <OAuthContext.Provider value={{user: user, setUser: setUser}}>
            { children }
        </OAuthContext.Provider>
    )
}

export default OAuthProvider