import di from "@Base/di";
import OAuthProvider from "@Base/provider/OAuthProvider";
import {DIContext} from "@Base/context/DIContext";
import React from "react";

const BaseProvidersWrapper = ({children}: any) => {
    return (
        <DIContext.Provider value={{container: di}}>
            <OAuthProvider>
                { children }
            </OAuthProvider>
        </DIContext.Provider>
    )
}

export default BaseProvidersWrapper;