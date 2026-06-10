import type User from '@Base/dto/User';

export default interface Comment {
	id: string;
	user_id: string;
	video_id: string;
	gif_url: string;
	text: string;
	likes: number;
	dislikes: number;
	liked_by_me: boolean;
	disliked_by_me: boolean;
	created_at: string;
	answer_to: string | null;
	user: User | null;
	answers: Comment[];
}
