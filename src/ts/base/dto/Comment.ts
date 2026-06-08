import User from "@Base/dto/User";

export default class Comment {
    public id: string;
    public userId: string;
    public videoId: string;
    public gifUrl: string;
    public text: string;
    public likes: number;
    public dislikes: number;
    public likedByMe: boolean;
    public dislikedByMe: boolean;
    public createdAt: string;
    public answerTo: string|null = null;
    public user: User | null = null;
    public answers: Comment[] = [];

    constructor(data: any) {
        this.id = data.id;
        this.userId = data.user_id;
        this.videoId = data.video_id;
        this.gifUrl = data.gif_url;
        this.text = data.text;
        this.likes = data.likes ?? 0;
        this.dislikes = data.dislikes ?? 0;
        this.answerTo = data.answer_to;
        this.likedByMe = data.liked_by_me ?? false;
        this.dislikedByMe = data.disliked_by_me ?? false;
        this.createdAt = data.created_at;
        this.user = data.user ? new User(data.user) : null;
        this.answers = data.answers?.map((answer:any) => new Comment(answer)) ?? [];
    }
}