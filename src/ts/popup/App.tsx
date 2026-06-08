import React from "react";
import Main from "@PopUp/Main";
import useIsYoutube from "@PopUp/hook/useIsYoutube";
import NotYoutubeScreen from "@PopUp/components/NotYoutubeScreen";
import BaseProvidersWrapper from "@Base/wrapper/BaseProvidersWrapper";
import "@PopUp/App.css"

const App: React.FC = () => {
    const isYoutube = useIsYoutube();

    return (
        <BaseProvidersWrapper>
            {isYoutube ? <Main /> : <NotYoutubeScreen />}
        </BaseProvidersWrapper>
    )
}

export default App;