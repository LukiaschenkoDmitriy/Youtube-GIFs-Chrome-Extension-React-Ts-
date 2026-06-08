import {SERVICE} from "@Base/di";

export class DependencyInstance {
    private readonly name: string;
    private instance: object
    public constructor(name: string, instance: object) {
        this.name = name;
        this.instance = instance;
    }

    public getName(): string {
        return this.name;
    }

    public getInstance(): any {
        return this.instance;
    }

    public setInstance(instance: object) {
        this.instance = instance;
    }
}

export default class DependencyInjection {
    private instances: DependencyInstance[] = [];

    public add(alias: string, instance: object) {
        this.instances.push(new DependencyInstance(alias, instance));
    }

    public get<T>(alias: string): T {
        return this.instances.filter((instance: DependencyInstance) => {
            return instance.getName() === alias;
        })[0]?.getInstance() as T;
    }

    public override(alias: string, instance: DependencyInstance) {
        this.instances.forEach((instance: DependencyInstance, index: number) => {
            if (instance.getName() == alias) {
                instance.setInstance(instance);
                this.instances[index] = instance;
            }
        })
    }
}