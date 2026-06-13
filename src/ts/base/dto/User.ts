export default interface User {
	id: string;
	name: string;
	email: string;
	picture: string;
	custom_url?: string;
	settings_videos_on: boolean;
	settings_shorts_on: boolean;
}