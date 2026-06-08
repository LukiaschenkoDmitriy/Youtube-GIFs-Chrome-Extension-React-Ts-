import Comment from "@Base/dto/Comment";

export function updateLikeInTree(comments: Comment[], commentId: string, type: "like" | "dislike"): Comment[] {
    return comments.map((c) => {
        if (c.id === commentId) {
            if (type === "like") {
                const wasLiked = c.likedByMe;
                return { ...c, likedByMe: !wasLiked, dislikedByMe: false, likes: wasLiked ? c.likes - 1 : c.likes + 1, dislikes: c.dislikedByMe ? c.dislikes - 1 : c.dislikes };
            } else {
                const wasDisliked = c.dislikedByMe;
                return { ...c, dislikedByMe: !wasDisliked, likedByMe: false, dislikes: wasDisliked ? c.dislikes - 1 : c.dislikes + 1, likes: c.likedByMe ? c.likes - 1 : c.likes };
            }
        }
        if (c.answers?.length) {
            return { ...c, answers: updateLikeInTree(c.answers, commentId, type) };
        }
        return c;
    });
}

export function removeFromTree(comments: Comment[], commentId: string): Comment[] {
    return comments
        .filter((c) => c.id !== commentId)
        .map((c) => ({ ...c, answers: c.answers ? removeFromTree(c.answers, commentId) : [] }));
}

export function findRootId(comments: Comment[], commentId: string): string {
    for (const c of comments) {
        if (c.id === commentId) return c.id;
        if (c.answers?.length) {
            const found = findInAnswers(c.answers, commentId);
            if (found) return c.id;
        }
    }
    return commentId;
}

export function findInAnswers(answers: Comment[], commentId: string): boolean {
    for (const a of answers) {
        if (a.id === commentId) return true;
        if (a.answers?.length && findInAnswers(a.answers, commentId)) return true;
    }
    return false;
}