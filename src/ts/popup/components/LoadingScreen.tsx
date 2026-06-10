import React, { useEffect, useState } from 'react';

const STEPS = [
	{ label: 'Connecting to server', color: '#5DCAA5', duration: 1400 },
	{ label: 'Verifying credentials', color: '#378ADD', duration: 1200 },
	{ label: 'Loading your profile', color: '#7F77DD', duration: 1000 },
];

const LoadingScreen: React.FC = () => {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const timer = setTimeout(
			() => {
				setCurrent(prev => ((prev + 1) % (STEPS.length + 1) === STEPS.length + 1 ? 0 : (prev + 1) % (STEPS.length + 1)));
			},
			STEPS[current % STEPS.length]?.duration ?? 1200
		);
		return () => clearTimeout(timer);
	}, [current]);

	const activeIndex = current % (STEPS.length + 1);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
			}}
		>
			<div style={{ position: 'relative', width: 72, height: 72, marginBottom: 20 }}>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						borderRadius: '50%',
						border: '1.5px solid transparent',
						borderTopColor: '#378ADD',
						animation: 'spin 1.1s linear infinite',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						inset: 8,
						borderRadius: '50%',
						border: '1px solid transparent',
						borderBottomColor: '#5DCAA5',
						animation: 'spin 1.8s linear infinite reverse',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: 'var(--color-text-secondary)',
						fontSize: 22,
					}}
				>
					<i className="ti ti-lock" aria-hidden="true" />
				</div>
			</div>

			<p style={{ fontSize: 15, fontWeight: 500, margin: 0 }}>Checking session</p>

			<div style={{ display: 'flex', gap: 5, marginTop: 6 }}>
				{[0, 200, 400].map((delay, i) => (
					<div
						key={i}
						style={{
							width: 4,
							height: 4,
							borderRadius: '50%',
							background: 'var(--color-text-tertiary)',
							animation: `pulse 1.2s ease-in-out ${delay}ms infinite`,
						}}
					/>
				))}
			</div>

			<div
				style={{
					marginTop: 28,
					display: 'flex',
					flexDirection: 'column',
					gap: 10,
					width: 210,
				}}
			>
				{STEPS.map((step, i) => {
					const state = i < activeIndex ? 'done' : i === activeIndex ? 'active' : 'idle';
					return (
						<div
							key={step.label}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 10,
								fontSize: 12,
								opacity: state === 'idle' ? 0.4 : 1,
								color: state === 'idle' ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)',
								transition: 'opacity 0.4s, color 0.4s',
							}}
						>
							<div
								style={{
									width: 16,
									height: 16,
									borderRadius: '50%',
									border: `1px solid ${state !== 'idle' ? step.color : 'var(--color-border-tertiary)'}`,
									background: state === 'done' ? step.color : 'transparent',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexShrink: 0,
									transition: 'all 0.3s',
								}}
							>
								{state === 'done' && <i className="ti ti-check" style={{ fontSize: 9, color: '#fff' }} />}
								{state === 'active' && (
									<div
										style={{
											width: 8,
											height: 8,
											borderRadius: '50%',
											border: `1.5px solid transparent`,
											borderTopColor: step.color,
											animation: 'spin 0.7s linear infinite',
										}}
									/>
								)}
								{state === 'idle' && (
									<div
										style={{
											width: 5,
											height: 5,
											borderRadius: '50%',
											background: 'var(--color-border-secondary)',
										}}
									/>
								)}
							</div>
							{step.label}
						</div>
					);
				})}
			</div>

			<style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
		</div>
	);
};

export default LoadingScreen;
