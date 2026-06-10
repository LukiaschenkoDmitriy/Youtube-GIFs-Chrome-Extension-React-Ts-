import CommentHandlers from '@Client/handlers/CommentHandlers';
import GiphyHandlers from '@Client/handlers/GiphyHandlers';
import UserHandlers from '@Client/handlers/UserHandlers';

const HANDLERS: Record<string, (e: any, data: any) => Promise<any>> = {
	...CommentHandlers,
	...GiphyHandlers,
	...UserHandlers,
};

export default HANDLERS;
