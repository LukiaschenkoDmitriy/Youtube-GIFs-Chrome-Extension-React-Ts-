export default class DependencyInstance {
	private readonly name: string;
	private instance: object;
	public constructor(name: string, instance: object) {
		this.name = name;
		this.instance = instance;
	}

	public getName(): string {
		return this.name;
	}

	public getInstance<T>(): T {
		return this.instance as T;
	}
}
