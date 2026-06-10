export default class ClientMiddleware {
	protected middlewares: Record<'REQUEST' | 'RESPONSE', ((d: any) => void)[]> = {
		REQUEST: [],
		RESPONSE: [],
	};

	public add(type: 'REQUEST' | 'RESPONSE', handler: (d: any) => void) {
		this.middlewares[type].push(handler);
	}

	public run(type: 'REQUEST' | 'RESPONSE', d: any) {
		this.middlewares[type].forEach(handler => handler({ ...d }));
	}
}
