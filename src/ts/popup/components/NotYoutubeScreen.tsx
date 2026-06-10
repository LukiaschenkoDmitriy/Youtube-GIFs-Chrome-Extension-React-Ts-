import React from 'react';

import { FaYoutube } from 'react-icons/fa';
import YoutubeIllustration from '@PopUp/svg/YoutubeIllustration';

const NotYoutubeScreen: React.FC = () => {
	const openYoutube = () => chrome.tabs.create({ url: 'https://youtube.com' });

	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			<div
				style={{
					background: '#FFF7ED',
					display: 'flex',
					justifyContent: 'center',
					padding: '32px 24px 24px',
				}}
			>
				<YoutubeIllustration />
			</div>

			<div
				style={{
					padding: '20px 24px 24px',
					display: 'flex',
					flexDirection: 'column',
					gap: 14,
				}}
			>
				<div>
					<p style={{ fontSize: 17, fontWeight: 500, margin: '0 0 4px' }}>Open YouTube first</p>
					<p
						style={{
							fontSize: 13,
							color: 'var(--color-text-secondary)',
							margin: 0,
							lineHeight: 1.6,
						}}
					>
						This extension works on YouTube pages only. Navigate to YouTube to get started.
					</p>
				</div>

				<button
					onClick={openYoutube}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 8,
						width: '100%',
						padding: '11px 0',
						fontSize: 14,
						fontWeight: 500,
						cursor: 'pointer',
						borderRadius: 8,
						border: 'none',
						background: '#FF0000',
						color: '#fff',
						fontFamily: 'inherit',
					}}
				>
					<FaYoutube />
					Go to YouTube
				</button>

				<p
					style={{
						fontSize: 11,
						color: 'var(--color-text-tertiary)',
						textAlign: 'center',
						margin: 0,
					}}
				>
					The tab will open automatically
				</p>
			</div>
		</div>
	);
};

export default NotYoutubeScreen;
