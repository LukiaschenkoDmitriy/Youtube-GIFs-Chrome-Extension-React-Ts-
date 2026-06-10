import DependencyInstance from '@Base/di/DependencyInstance';

export default class DependencyInjection {
	private instances: DependencyInstance[] = [];

	public add(alias: string, instance: object) {
		this.instances.push(new DependencyInstance(alias, instance));
	}

	public get<T>(alias: string): T {
		return this.instances
			.filter((instance: DependencyInstance) => {
				return instance.getName() === alias;
			})[0]
			?.getInstance<T>();
	}
}
