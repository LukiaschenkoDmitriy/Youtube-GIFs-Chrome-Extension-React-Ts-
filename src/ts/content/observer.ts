export interface ObserverCallback {
	callback: (mutation: MutationRecord[], target: HTMLElement) => void;
	target: (dc: Document) => HTMLElement | null;
	interruptExpression: ((dc: Document) => boolean) | null;
	// Recurring callbacks fire on every matching mutation and never let the observer disconnect.
	// Needed for state that toggles back and forth (e.g. shorts panel visibility attributes).
	recurring?: boolean;
}

export default class Observer {
	private callbacks: Map<string, ObserverCallback> = new Map();
	private callbacksStatus: Map<string, boolean> = new Map();
	private mutation: MutationObserver;

	public constructor() {
		this.mutation = new MutationObserver((mutation: MutationRecord[]) => {
			this.callbacks.forEach((callback: ObserverCallback, name: string) => {
				if (callback.interruptExpression?.(document)) return;

				const target = callback.target(document);

				if (!target) {
					return;
				}

				callback.callback(mutation, target);
				this.callbacksStatus.set(name, true);
			});

			this.tryToDisconnect();
		});
	}

	public addCallback(name: string, callback: ObserverCallback) {
		if (this.callbacks.has(name)) return;

		this.callbacksStatus.set(name, false);
		this.callbacks.set(name, callback);
	}

	private tryToDisconnect() {
		let done = true;

		this.callbacks.forEach((callback: ObserverCallback, name: string) => {
			if (callback.recurring || !this.callbacksStatus.get(name)) done = false;
		});

		if (done) this.mutation.disconnect();
	}

	public observe(element: HTMLElement, params: MutationObserverInit = {}) {
		this.mutation.observe(element, params);
	}
}
