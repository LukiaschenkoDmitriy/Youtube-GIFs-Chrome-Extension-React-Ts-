import Comment from '@Base/dto/Comment';

export type CommentMap = Record<string, Comment>;

function toggleReaction(c: Comment, type: 'like' | 'dislike'): Comment {
	if (type === 'like') {
		const wasLiked = c.liked_by_me;
		return {
			...c,
			liked_by_me: !wasLiked,
			disliked_by_me: false,
			likes: wasLiked ? c.likes - 1 : c.likes + 1,
			dislikes: c.disliked_by_me ? c.dislikes - 1 : c.dislikes,
		};
	}

	const wasDisliked = c.disliked_by_me;
	return {
		...c,
		disliked_by_me: !wasDisliked,
		liked_by_me: false,
		dislikes: wasDisliked ? c.dislikes - 1 : c.dislikes + 1,
		likes: c.liked_by_me ? c.likes - 1 : c.likes,
	};
}

export function applyReaction(entities: CommentMap, commentId: string, type: 'like' | 'dislike'): CommentMap {
	const c = entities[commentId];
	if (!c) return entities;
	return { ...entities, [commentId]: toggleReaction(c, type) };
}

export function addReply(entities: CommentMap, parentId: string, reply: Comment): CommentMap {
	const next: CommentMap = { ...entities, [reply.id]: reply };
	const parent = entities[parentId];
	if (parent) next[parentId] = { ...parent, answers: [...parent.answers, reply.id] };
	return next;
}

export function removeComment(entities: CommentMap, commentId: string): CommentMap {
	const target = entities[commentId];
	if (!target) return entities;

	const toRemove = new Set<string>();
	const stack = [commentId];
	while (stack.length) {
		const id = stack.pop() as string;
		if (toRemove.has(id)) continue;
		toRemove.add(id);
		const c = entities[id];
		if (c) stack.push(...c.answers);
	}

	const next: CommentMap = {};
	for (const [id, c] of Object.entries(entities)) {
		if (toRemove.has(id)) continue;
		next[id] = id === target.answer_to ? { ...c, answers: c.answers.filter(a => a !== commentId) } : c;
	}
	return next;
}
