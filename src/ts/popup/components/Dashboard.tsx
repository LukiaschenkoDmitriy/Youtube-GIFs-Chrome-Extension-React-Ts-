import User from '@Base/dto/User';
import React from 'react';
import { TbSettings } from 'react-icons/tb';

const Dashboard: React.FC<{ user: User; onLogout: () => Promise<void>; onOpenSettings: () => void }> = ({ user, onLogout, onOpenSettings }) => {
	const initials = user.name
		.split(' ')
		.map(w => w[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);

	const onLogoutHandler = async () => {
		await onLogout();

		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
		if (tab.id) {
			chrome.tabs.sendMessage(tab.id, { type: 'USER_LOGGED_OUT' });
		}
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div
				style={{
					background: '#E6F1FB',
					padding: '24px 20px 20px',
					display: 'flex',
					alignItems: 'center',
					gap: 14,
				}}
			>
				<div
					style={{
						width: 52,
						height: 52,
						borderRadius: '50%',
						background: '#B5D4F4',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: 18,
						fontWeight: 500,
						color: '#0C447C',
						overflow: 'hidden',
						flexShrink: 0,
					}}
				>
					{user.picture ? <img src={user.picture} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
				</div>
				<div>
					<p style={{ fontSize: 15, fontWeight: 500, margin: '0 0 4px' }}>{user.name}</p>
					<span
						style={{
							fontSize: 10,
							padding: '2px 8px',
							borderRadius: 99,
							background: '#E1F5EE',
							color: '#0F6E56',
							border: '0.5px solid #9FE1CB',
						}}
					>
						<i className="ti ti-circle-check" style={{ fontSize: 10, verticalAlign: -1, marginRight: 2 }} />
						Active
					</span>
				</div>
				<button
					onClick={onOpenSettings}
					title="Settings"
					style={{
						marginLeft: 'auto',
						width: 36,
						height: 36,
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
					<TbSettings size={17} />
				</button>
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
				<Section label="Profile">
					<Row icon="ti-user" label="Name" value={user.name} />
					<Row icon="ti-link" label="Custom URL" value={user?.custom_url ?? "Unknown"} valueColor="#185FA5" />
				</Section>

				<Section label="Session">
					<Row icon="ti-shield-check" label="OAuth2" value="Verified" valueColor="#1D9E75" iconColor="#1D9E75" />
				</Section>

				<button
					onClick={onLogoutHandler}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 7,
						width: '100%',
						padding: 10,
						fontSize: 13,
						color: '#A32D2D',
						background: '#fef2f2',
						border: '0.5px solid #F7C1C1',
						borderRadius: 10,
						cursor: 'pointer',
						fontFamily: 'inherit',
					}}
				>
					<i className="ti ti-logout" style={{ fontSize: 15 }} />
					Sign out
				</button>
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

const Row: React.FC<{
	icon: string;
	label: string;
	value: string;
	valueColor?: string;
	iconColor?: string;
}> = ({ icon, label, value, valueColor, iconColor }) => (
	<div
		style={{
			display: 'flex',
			alignItems: 'center',
			gap: 10,
			padding: '11px 14px',
			borderBottom: '0.5px solid var(--color-border-tertiary)',
			fontSize: 13,
		}}
	>
		<i
			className={`ti ${icon}`}
			style={{
				fontSize: 15,
				color: iconColor ?? 'var(--color-text-tertiary)',
				width: 18,
				textAlign: 'center',
			}}
		/>
		<span style={{ color: 'var(--color-text-secondary)', flex: 1 }}>{label}</span>
		<span style={{ color: valueColor ?? 'var(--color-text-primary)', fontWeight: 500 }}>{value}</span>
	</div>
);

export default Dashboard;
