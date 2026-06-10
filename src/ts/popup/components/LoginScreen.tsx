import React from 'react';

import OAuthIllustration from '@PopUp/svg/OAuthIllustration';
import { FcGoogle } from 'react-icons/fc';

const LoginScreen: React.FC<{ onLogin: () => Promise<void> }> = ({ onLogin }) => {
	return (
		<div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
			<div
				style={{
					background: '#E6F1FB',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '32px 24px 24px',
				}}
			>
				<OAuthIllustration />
			</div>

			<div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
				<div>
					<p style={{ fontSize: 18, fontWeight: 500, margin: '0 0 4px' }}>Sign in to continue</p>
					<p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>Connect your Google account securely via OAuth2</p>
				</div>

				<button
					onClick={onLogin}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 10,
						width: '100%',
						padding: '11px 0',
						fontSize: 14,
						fontWeight: 500,
						letterSpacing: '0.01em',
						cursor: 'pointer',
						borderRadius: 8,
						border: 'none',
						background: '#1a1a1a',
						color: '#fff',
						fontFamily: 'inherit',
						transition: 'opacity 0.15s',
					}}
					onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
					onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
				>
					<FcGoogle />
					Continue with Google
				</button>

				<p
					style={{
						fontSize: 11,
						color: 'var(--color-text-tertiary)',
						textAlign: 'center',
						margin: 0,
					}}
				>
					By signing in you agree to the terms of service
				</p>
			</div>
		</div>
	);
};

export default LoginScreen;
