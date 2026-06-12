import { useContext, useEffect, useState } from 'react';

import { CommentCounterContext } from '@Base/provider/CommentCounterProvider';
import DefaultCommentsPanel from '@Content/components/panels/DefaultCommentsPanel';
import GifsCommentsPanel from '@Content/components/panels/GifsCommentsPanel';
import setYoutubeTheme from '@Content/utils/theme';

type TabId = 'default' | 'gifs';

const Tabs = () => {
	const [activeTab, setActiveTab] = useState<TabId>('default');
	const { count } = useContext(CommentCounterContext);

	useEffect(() => {
		setYoutubeTheme();
	}, []);

	useEffect(() => { }, [count]);

	return (
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
