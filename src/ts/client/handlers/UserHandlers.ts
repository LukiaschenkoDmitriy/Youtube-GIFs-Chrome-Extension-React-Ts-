import User from '@Base/dto/User';
import di, { DIServices } from '@Base/di';
import BaseGCClient from '@Base/service/client/BaseGCClient';
import ENDPOINTS from '@Client/endpoints';

const c = di.get<BaseGCClient>(DIServices.BaseGCClient);

const UserHandlers: Record<string, (e: any, data: any) => Promise<any>> = {
	[ENDPOINTS.USER.CURRENT.NAME]: e => c.useEndpoint<User>(e, {}),
	[ENDPOINTS.USER.LOGOUT.NAME]: e => c.useEndpoint<null>(e, {}),
	[ENDPOINTS.USER.SETTINGS.NAME]: (e, d) => {
		return c.useEndpoint<null>(e, {
			b: {
				settings_videos_on: d.videosOn,
				settings_shorts_on: d.shortsOn
			},
		});
	},
};

export default UserHandlers;
