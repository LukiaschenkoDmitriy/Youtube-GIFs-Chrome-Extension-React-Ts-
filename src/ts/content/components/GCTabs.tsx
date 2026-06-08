import React, { useState } from "react";

import DefaultCommentsPanel from "@Content/components/DefaultCommentsPanel";
import GifsCommentsPanel from "@Content/components/GifsCommentsPanel";
import BaseProvidersWrapper from "@Base/wrapper/BaseProvidersWrapper";
import setYoutubeTheme from "@Content/utils/theme";

type TabId = "default" | "gifs";

const GCTabs = () => {
    const [activeTab, setActiveTab] = useState<TabId>("default");

    setYoutubeTheme();

    return (
        <BaseProvidersWrapper>
            <div className="yt-root">
                <div className="yt-tabs" role="tablist">
                    {(["default", "gifs"] as TabId[]).map((tab) => (
                        <button
                            key={tab}
                            role="tab"
                            aria-selected={activeTab === tab}
                            className={`yt-tab${activeTab === tab ? " yt-tab--active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === "default" ? "Default comments" : "GIFs comments"}
                        </button>
                    ))}
                </div>

                <div style={{ display: activeTab === 'default' ? 'block' : 'none' }}>
                    <DefaultCommentsPanel />
                </div>
                <div style={{ display: activeTab === 'gifs' ? 'block' : 'none' }}>
                    <GifsCommentsPanel />
                </div>
            </div>
        </BaseProvidersWrapper>
    );
}

export default GCTabs;