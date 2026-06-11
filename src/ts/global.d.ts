declare const chrome: any;

// Substituted by webpack DefinePlugin based on the build mode
declare const process: { env: { NODE_ENV: 'production' | 'development' } };

declare module '*.scss' {
	const content: Record<string, string>;
	export default content;
}

declare module '*.css' {
	const content: Record<string, string>;
	export default content;
}
