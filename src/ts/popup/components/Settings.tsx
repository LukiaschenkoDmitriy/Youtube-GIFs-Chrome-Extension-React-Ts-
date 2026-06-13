import React, { useState } from 'react';
import { TbArrowLeft, TbBrandYoutube, TbDeviceMobile, TbInfoCircle, TbRefresh } from 'react-icons/tb';
import useOAuth from '@Base/hook/useOAuth';

const Settings: React.FC<{ onBack: () => void }> = ({ onBack }) => {
	const { user, updateSettings } = useOAuth();
	const [needsReload, setNeedsReload] = useState(false);

	if (!user) return null;

	const onChangeSettings = async (videosOn: boolean, shortsOn: boolean) => {
		await updateSettings(videosOn, shortsOn);
		setNeedsReload(true);
	};

	const reloadPage = async () => {
		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
		if (tab.id) chrome.tabs.reload(tab.id);
		setNeedsReload(false);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div
				style={{
					background: '#E6F1FB',
					padding: '24px 20px 20px',
					display: 'flex',
					alignItems: 'center',
					gap: 12,
				}}
			>
				<button
					onClick={onBack}
					style={{
						width: 32,
						height: 32,
						borderRadius: 8,
						border: '0.5px solid #B5D4F4',
						background: '#fff',
						color: '#0C447C',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						cursor: 'pointer',
						flexShrink: 0,
					}}
				>
					<TbArrowLeft size={16} />
				</button>
				<div>
					<p style={{ fontSize: 15, fontWeight: 500, margin: '0 0 2px' }}>Settings</p>
					<p style={{ fontSize: 11, color: 'var(--color-text-secondary)', margin: 0 }}>Manage where comments appear</p>
				</div>
			</div>

			<div
				style={{
					padding: '16px 20px 20px',
					display: 'flex',
					flexDirection: 'column',
					gap: 12,
					flex: 1,
				}}
			>
				<Section label="Comments display">
					<ToggleRow
						icon={<TbBrandYoutube size={16} />}
						label="Videos"
						description="Show comments on regular videos"
						on={user.settings_videos_on}
						onChange={videosOn => onChangeSettings(videosOn, user.settings_shorts_on)}
					/>
					<ToggleRow
						icon={<TbDeviceMobile size={16} />}
						label="Shorts"
						description="Show comments on Shorts"
						on={user.settings_shorts_on}
						onChange={shortsOn => onChangeSettings(user.settings_videos_on, shortsOn)}
					/>
				</Section>

				{needsReload && (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 10,
							padding: '12px 14px',
							borderRadius: 10,
							background: '#E6F1FB',
							border: '0.5px solid #B5D4F4',
						}}
					>
						<div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
							<TbInfoCircle size={16} style={{ color: '#185FA5', flexShrink: 0, marginTop: 1 }} />
							<p style={{ fontSize: 12, color: '#0C447C', margin: 0, lineHeight: 1.4 }}>
								Reload the page to apply your changes
							</p>
						</div>
						<button
							onClick={reloadPage}
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 7,
								width: '100%',
								padding: 10,
								fontSize: 13,
								fontWeight: 500,
								color: '#fff',
								background: '#185FA5',
								border: 'none',
								borderRadius: 10,
								cursor: 'pointer',
								fontFamily: 'inherit',
							}}
						>
							<TbRefresh size={15} />
							Reload page
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

const Section: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
	<div>
		<p
			style={{
				fontSize: 10,
				color: 'var(--color-text-tertiary)',
				textTransform: 'uppercase',
				letterSpacing: '0.06em',
				marginBottom: 4,
			}}
		>
			{label}
		</p>
		<div
			style={{
				background: 'var(--color-background-secondary)',
				borderRadius: 10,
				overflow: 'hidden',
			}}
		>
			{children}
		</div>
	</div>
);

const ToggleRow: React.FC<{
	icon: React.ReactNode;
	label: string;
	description: string;
	on: boolean;
	onChange: (value: boolean) => void;
}> = ({ icon, label, description, on, onChange }) => (
	<div
		style={{
			display: 'flex',
			alignItems: 'center',
			gap: 10,
			padding: '11px 14px',
			borderBottom: '0.5px solid var(--color-border-tertiary)',
		}}
	>
		<span
			style={{
				color: 'var(--color-text-tertiary)',
				width: 18,
				display: 'flex',
				justifyContent: 'center',
				flexShrink: 0,
			}}
		>
			{icon}
		</span>
		<div style={{ flex: 1 }}>
			<p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: '0 0 1px' }}>{label}</p>
			<p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', margin: 0 }}>{description}</p>
		</div>
		<Toggle on={on} onChange={onChange} />
	</div>
);

const Toggle: React.FC<{ on: boolean; onChange: (value: boolean) => void }> = ({ on, onChange }) => (
	<button
		onClick={() => onChange(!on)}
		style={{
			width: 38,
			height: 22,
			borderRadius: 99,
			border: 'none',
			padding: 2,
			cursor: 'pointer',
			background: on ? '#185FA5' : '#CBD5E1',
			display: 'flex',
			alignItems: 'center',
			justifyContent: on ? 'flex-end' : 'flex-start',
			transition: 'background 0.15s',
			flexShrink: 0,
		}}
	>
		<span
			style={{
				width: 18,
				height: 18,
				borderRadius: '50%',
				background: '#fff',
				display: 'block',
			}}
		/>
	</button>
);

export default Settings;
