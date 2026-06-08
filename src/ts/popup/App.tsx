import React from "react";

import useIsYoutube from "@PopUp/hook/useIsYoutube";
import NotYoutubeScreen from "@PopUp/components/NotYoutubeScreen";

import "@PopUp/App.css"
import BaseProvidersWrapper from "@Base/wrapper/BaseProvidersWrapper";
import Main from "@PopUp/Main";

const App: React.FC = () => {
    const isYoutube = useIsYoutube();

    return (
        <BaseProvidersWrapper>
            {isYoutube ? <Main /> : <NotYoutubeScreen />}
        </BaseProvidersWrapper>
    )
}

export default App;