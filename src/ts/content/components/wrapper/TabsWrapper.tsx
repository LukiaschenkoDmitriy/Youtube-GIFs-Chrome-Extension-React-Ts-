import { DIContext } from "@Base/context/DIContext";
import di from "@Base/di";
import CommentCounterProvider from "@Base/provider/CommentCounterProvider";
import OAuthProvider from "@Base/provider/OAuthProvider";
import Tabs from "@Content/components/Tabs";
import VideoProvider from "@Content/provider/VideoProvider";

const TabsWrapper = () => {
    return (
        <DIContext.Provider value={{ container: di }}>
            <OAuthProvider>
                <VideoProvider>
                    <CommentCounterProvider>
                        <Tabs/>
                    </CommentCounterProvider>
                </VideoProvider>
            </OAuthProvider>
        </DIContext.Provider>
    )
}

export default TabsWrapper;