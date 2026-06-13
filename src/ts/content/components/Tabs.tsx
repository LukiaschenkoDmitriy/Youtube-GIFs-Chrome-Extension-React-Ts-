import { useContext, useEffect, useState } from 'react';

import { CommentCounterContext } from '@Base/provider/CommentCounterProvider';
import DefaultCommentsPanel from '@Content/components/panels/DefaultCommentsPanel';
import GifsCommentsPanel from '@Content/components/panels/GifsCommentsPanel';
import setYoutubeTheme from '@Content/utils/theme';
import useOAuth from '@Base/hook/useOAuth';

type TabId = 'default' | 'gifs';

const Tabs = ({ type }: {type: "shorts" | "videos"}) => {
	const [activeTab, setActiveTab] = useState<TabId>('default');
	const [shortsOn, setShortsOn] = useState<boolean>(false);
	const [videosOn, setVieosOn] = useState<boolean>(false);
	const { count } = useContext(CommentCounterContext);
	const { user } = useOAuth()

	useEffect(() => {
		setYoutubeTheme();
	}, []);

	useEffect(() => { 
		setShortsOn(user?.settings_shorts_on == true && type == "shorts");
		setVieosOn(user?.settings_videos_on == true && type == "videos");
	 }, [count, user]);

	return (shortsOn || videosOn) && (
		<div className="yt-root">
			<div className="yt-tabs" role="tablist">
				{(['default', 'gifs'] as TabId[]).map(tab => (
					<button key={tab} role="tab" aria-selected={activeTab === tab} className={`yt-tab${activeTab === tab ? ' yt-tab--active' : ''}`} onClick={() => setActiveTab(tab)}>
						{tab === 'default' ? 'Default comments' : 'GIFs comments'}
						{tab === "gifs" && <span style={{ marginLeft: '8px' }} className="show-more">( {count} )</span> }
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
	);
};

export default Tabs;
