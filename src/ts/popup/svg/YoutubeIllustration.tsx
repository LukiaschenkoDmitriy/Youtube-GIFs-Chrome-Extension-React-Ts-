import React from 'react';

const YoutubeIllustration: React.FC = () => (
	<svg width="220" height="148" viewBox="0 0 220 148" role="img">
		<defs>
			<marker id="ay" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
				<path d="M2 1L8 5L2 9" fill="none" stroke="#E8B96A" strokeWidth="1.5" strokeLinecap="round" />
			</marker>
		</defs>

		{/* Browser window */}
		<rect x="10" y="18" width="130" height="92" rx="7" fill="#fff" stroke="#E2C9A0" strokeWidth="1" />
		<rect x="10" y="18" width="130" height="14" rx="7" fill="#F5DFB8" />
		<rect x="10" y="24" width="130" height="8" fill="#F5DFB8" />
		<circle cx="19" cy="28" r="2.5" fill="#E8B96A" />
		<circle cx="27" cy="28" r="2.5" fill="#E8B96A" />
		<circle cx="35" cy="28" r="2.5" fill="#E8B96A" />

		{/* URL bar */}
		<rect x="44" y="23" width="88" height="10" rx="5" fill="#fff" opacity="0.7" />
		<text x="88" y="30.5" textAnchor="middle" fontSize="6" fill="#B07D30" fontFamily="sans-serif">
			youtube.com
		</text>

		{/* Page content */}
		<rect x="20" y="40" width="110" height="6" rx="3" fill="#F5DFB8" />
		<rect x="20" y="50" width="80" height="5" rx="2.5" fill="#FAF0E0" />
		<rect x="20" y="59" width="95" height="5" rx="2.5" fill="#FAF0E0" />

		{/* Arrow */}
		<path d="M148 64 Q175 48 188 64" fill="none" stroke="#E8B96A" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#ay)" />

		{/* YouTube card */}
		<rect x="155" y="28" width="52" height="72" rx="6" fill="#fff" stroke="#FFCDD2" strokeWidth="1" />
		<rect x="155" y="28" width="52" height="20" rx="6" fill="#FF0000" />
		<rect x="155" y="38" width="52" height="10" fill="#FF0000" />
		<circle cx="181" cy="38" r="8" fill="#fff" opacity="0.15" />
		<polygon points="178,34 178,42 186,38" fill="#fff" />

		{/* Card content */}
		<rect x="163" y="56" width="36" height="4" rx="2" fill="#FEE2E2" />
		<rect x="163" y="64" width="28" height="4" rx="2" fill="#FEE2E2" />
		<rect x="163" y="72" width="36" height="10" rx="3" fill="#FF0000" />
		<text x="181" y="79.5" textAnchor="middle" fontSize="7" fill="#fff" fontFamily="sans-serif" fontWeight="500">
			Open
		</text>
	</svg>
);

export default YoutubeIllustration;
