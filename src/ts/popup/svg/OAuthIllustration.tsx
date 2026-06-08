import React from "react";

const OAuthIllustration: React.FC = () => (
    <svg width="240" height="160" viewBox="0 0 240 160" aria-hidden="true">
        <defs>
            <marker id="arr-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#378ADD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
            <marker id="arr-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
            <marker id="arr-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#7F77DD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
        </defs>
        {/* Browser */}
        <rect x="10" y="30" width="80" height="56" rx="5" fill="#fff" stroke="#B5D4F4" strokeWidth="1"/>
        <rect x="10" y="30" width="80" height="12" rx="5" fill="#B5D4F4"/>
        <rect x="10" y="36" width="80" height="6" fill="#B5D4F4"/>
        <circle cx="18" cy="36" r="2.5" fill="#85B7EB"/>
        <circle cx="26" cy="36" r="2.5" fill="#85B7EB"/>
        <circle cx="34" cy="36" r="2.5" fill="#85B7EB"/>
        <rect x="18" y="50" width="50" height="4" rx="2" fill="#E6F1FB"/>
        <rect x="18" y="58" width="36" height="4" rx="2" fill="#E6F1FB"/>
        <rect x="18" y="66" width="44" height="4" rx="2" fill="#E6F1FB"/>
        {/* Server */}
        <rect x="152" y="20" width="76" height="88" rx="6" fill="#fff" stroke="#9FE1CB" strokeWidth="1"/>
        <rect x="152" y="20" width="76" height="14" rx="6" fill="#9FE1CB"/>
        <rect x="152" y="27" width="76" height="7" fill="#9FE1CB"/>
        <rect x="162" y="44" width="56" height="4" rx="2" fill="#E1F5EE"/>
        <rect x="162" y="52" width="40" height="4" rx="2" fill="#E1F5EE"/>
        <rect x="162" y="64" width="56" height="14" rx="3" fill="#5DCAA5"/>
        <text x="190" y="74" textAnchor="middle" fontSize="9" fill="#085041" fontFamily="sans-serif" fontWeight="500">Sign in</text>
        <rect x="162" y="84" width="56" height="4" rx="2" fill="#E1F5EE"/>
        <rect x="162" y="92" width="36" height="4" rx="2" fill="#E1F5EE"/>
        {/* OAuth token box */}
        <rect x="96" y="108" width="52" height="30" rx="4" fill="#fff" stroke="#AFA9EC" strokeWidth="1"/>
        <rect x="96" y="108" width="52" height="10" rx="4" fill="#AFA9EC"/>
        <rect x="96" y="113" width="52" height="5" fill="#AFA9EC"/>
        <circle cx="104" cy="116" r="2" fill="#7F77DD"/>
        <rect x="102" y="124" width="36" height="3" rx="1.5" fill="#EEEDFE"/>
        <rect x="102" y="130" width="28" height="3" rx="1.5" fill="#EEEDFE"/>
        {/* Arrows */}
        <line x1="92" y1="58" x2="150" y2="58" stroke="#378ADD" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arr-blue)"/>
        <line x1="150" y1="68" x2="92" y2="68" stroke="#1D9E75" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arr-green)"/>
        <line x1="122" y1="108" x2="122" y2="90" stroke="#7F77DD" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arr-purple)"/>
        <text x="120" y="54" textAnchor="middle" fontSize="8" fill="#185FA5" fontFamily="sans-serif">request</text>
        <text x="120" y="80" textAnchor="middle" fontSize="8" fill="#0F6E56" fontFamily="sans-serif">token</text>
        <text x="136" y="102" fontSize="8" fill="#534AB7" fontFamily="sans-serif">OAuth2</text>
    </svg>
);

export default OAuthIllustration;