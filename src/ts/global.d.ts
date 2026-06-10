declare const chrome: any;

declare module '*.scss' {
	const content: Record<string, string>;
	export default content;
}

declare module '*.css' {
	const content: Record<string, string>;
	export default content;
}
