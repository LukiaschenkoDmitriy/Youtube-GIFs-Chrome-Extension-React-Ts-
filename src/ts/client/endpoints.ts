import { AUTH_ENDPOINT } from '@Base/variables';

export type EndpointType = { NAME: string; method: EndpointMethodType; url: string };
type EndpointMethodType = 'GET' | 'POST' | 'DELETE' | 'PATCH';

const ENDPOINTS = {
	GIPHY: {
		TRENDING: { NAME: 'GIPHY_TRENDING', method: 'GET', url: '/giphy/trending' } as EndpointType,
		SEARCH: { NAME: 'GIPHY_SEARCH', method: 'GET', url: '/giphy/search' } as EndpointType,
	},
	USER: {
		LOGIN: { NAME: 'LOGIN', method: 'POST', url: `${AUTH_ENDPOINT}/login` } as EndpointType,
		CURRENT: { NAME: 'CURRENT_USER', method: 'GET', url: '/e/users/current' } as EndpointType,
		LOGOUT: { NAME: 'LOGOUT', method: 'POST', url: `${AUTH_ENDPOINT}/logout` } as EndpointType,
	},
	COMMENT: {
		CREATE: { NAME: 'CREATE_COMMENT', method: 'POST', url: '/e/comments' } as EndpointType,
		GET_BY_VIDEO_ID: { NAME: 'GET_COMMENT_BY_VIDEO_ID', method: 'GET', url: '/e/comments/byVideoId/:videoId' } as EndpointType,
		LIKE: { NAME: 'COMMENT_LIKE', method: 'POST', url: '/e/comments/:commentId/like' } as EndpointType,
		DISLIKE: { NAME: 'COMMENT_DISLIKE', method: 'POST', url: '/e/comments/:commentId/dislike' } as EndpointType,
		DELETE: { NAME: 'DELETE_COMMENT', method: 'DELETE', url: '/e/comments/:commentId' } as EndpointType,
		GET_BY_ID: { NAME: 'GET_COMMENT_BY_ID', method: 'GET', url: '/e/comments/:commentId' } as EndpointType,
	},
	OTHERS: {
		PING: { NAME: 'PING', method: 'POST', url: '/u/ping' } as EndpointType,
	},
};

export default ENDPOINTS;
