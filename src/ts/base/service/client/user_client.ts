import User from "@Base/dto/User";
import ErrorResponse from "@Base/dto/Error";
import AbstractGCClient from "@Base/service/client/abstract_client";
import ENDPOINTS from "@Base/service/client/endpoints";

export default class UserClient extends AbstractGCClient {
    public async getCurrent(): Promise<User|ErrorResponse> {
        const response = await this.useEndpoint(ENDPOINTS.USER.CURRENT);

        const data = await response.json();

        if (!response.ok) return new ErrorResponse(data);

        return new User(data.data)
    }

    public async logout(): Promise<null|ErrorResponse> {
        const response = await this.useEndpoint(ENDPOINTS.USER.LOGOUT);

        const data = await response.json();

        if (!response.ok) return new ErrorResponse(data);

        return null;
    }
}