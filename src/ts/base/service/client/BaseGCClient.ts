import IGCResponse from '@Base/service/interface/IGCResponse';
import IGCErrorResponse from '@Base/service/interface/IGCResponseError';
import { Primitive } from '@Base/types';
import { EndpointType } from '@Client/endpoints';

export type GCClientData = {
	// Parameters
	p?: Record<string, Primitive>;
	// Queries
	q?: Record<string, Primitive | null>;
	// Body
	b?: Record<string, Primitive | null>;
};

export type GCClientResponse<T> = IGCErrorResponse | IGCResponse<T>;

const DEFAULT_HEADERS: HeadersInit = {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
};

export default class BaseGCClient {
	private readonly baseURL: string;

	public constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	public async useEndpoint<T>(endpoint: EndpointType, data: GCClientData): Promise<GCClientResponse<T>> {
		const url = this.buildURL(endpoint.url, data.p ?? {}, data.q ?? {});

		const methodHandlers: Record<string, () => Promise<Response>> = {
			POST: () => this._send(url, 'POST', data.b ?? {}),
			PATCH: () => this._send(url, 'PATCH', data.b ?? {}),
			DELETE: () => this._delete(url),
			GET: () => this._get(url),
		};

		const handler = methodHandlers[endpoint.method];

		if (!handler) {
			return { error: `Unsupported method: ${endpoint.method}`, code: 0 };
		}

		try {
			const response = await handler();
			return await response.json();
		} catch (e) {
			return { error: e instanceof Error ? e.message : String(e), code: 0 };
		}
	}

	protected async _send(url: string, method: 'POST' | 'PATCH', body: Record<string, Primitive | null>): Promise<Response> {
		return fetch(url, { method, body: JSON.stringify(body), headers: DEFAULT_HEADERS });
	}

	protected async _delete(url: string): Promise<Response> {
		return fetch(url, { method: 'DELETE', headers: DEFAULT_HEADERS });
	}

	protected async _get(url: string): Promise<Response> {
		return fetch(url, { method: 'GET', headers: DEFAULT_HEADERS });
	}

	private buildURL(endpoint: string, params: Record<string, Primitive>, query: Record<string, Primitive | null>): string {
		const withParams = this.processParams(endpoint, params);
		return this.processQuery(withParams, query);
	}

	private processQuery(endpoint: string, query: Record<string, Primitive | null>): string {
		const url = new URL(this.baseURL + endpoint);

		Object.entries(query)
			.filter(([, value]) => value !== null)
			.forEach(([key, value]) => url.searchParams.append(key, String(value)));

		return url.toString();
	}

	private processParams(endpoint: string, params: Record<string, Primitive>): string {
		return Object.entries(params).reduce((url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)), endpoint);
	}
}
