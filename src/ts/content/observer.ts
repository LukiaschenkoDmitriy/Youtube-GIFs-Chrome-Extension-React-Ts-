export interface ObserverCallback {
    callback: (mutation: MutationRecord[], target: HTMLElement) => void;
    target: (dc: Document) => HTMLElement|null;
    interruptExpression: ((dc: Document) => boolean) | null;
}

export default class Observer {
    public static DI_ID: string = "Observer";

    private callbacks: Map<string, ObserverCallback> = new Map();
    private callbacksStatus: Map<string, boolean> = new Map();
    private mutation: MutationObserver;

    public constructor() {
        this.mutation = new MutationObserver((mutation: MutationRecord[]) => {
            this.callbacks.forEach((callback: ObserverCallback, name: string) => {
                this.tryToDisconnect();

                if (callback.interruptExpression?.(document)) return;

                const target = callback.target(document);

                if (!target) {
                    return;
                }

                callback.callback(mutation, target);
                this.callbacksStatus.set(name, true);
            });
        });
    }

    public addCallback(name: string, callback: ObserverCallback) {
        if (this.callbacks.has(name)) return;

        this.callbacksStatus.set(name, false);
        this.callbacks.set(name, callback);
    }

    public removeCallback(name: string) {
        if (!this.callbacks.has(name)) return;

        this.callbacksStatus.delete(name);
        this.callbacks.delete(name);
    }

    private tryToDisconnect() {
        const array: boolean[] = [];
        this.callbacksStatus.forEach((status: boolean) => array.push(status));

        if (array.filter((status: boolean) => !status).length === 0) {
            this.mutation.disconnect();
        }
    }

    public observe(element: HTMLElement, params: any = {}) {
        this.mutation.observe(element, params);
    }
}