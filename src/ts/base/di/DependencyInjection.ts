export default class DependencyInjection {
	private instances: Map<string, object> = new Map();

	public add(alias: string, instance: object) {
		this.instances.set(alias, instance);
	}

	public get<T>(alias: string): T {
		const instance = this.instances.get(alias);

		if (!instance) {
			throw new Error(`DependencyInjection: no instance registered for alias "${alias}"`);
		}

		return instance as T;
	}
}
