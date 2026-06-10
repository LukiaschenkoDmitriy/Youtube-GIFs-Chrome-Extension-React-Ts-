// eslint-disable-next-line
export type EventEmitterListener = (data: any) => void;

export default class EventEmitter {
	private listeners: Record<string, EventEmitterListener[]> = {};

	public on(event: string, listener: EventEmitterListener) {
		(this.listeners[event] ??= []).push(listener);
		return () => this.off(event, listener);
	}

	public off(event: string, listener: EventEmitterListener) {
		this.listeners[event] = this.listeners[event]?.filter(l => l !== listener);
	}

	// eslint-disable-next-line
	public emit(event: string, data: any) {
		if (data == null) return;
		this.listeners[event]?.forEach(l => l(data));
	}
}
