declare module "*.css" {}
declare const chrome: any;

declare module "*.scss" {
    const content: Record<string, string>;
    export default content;
}