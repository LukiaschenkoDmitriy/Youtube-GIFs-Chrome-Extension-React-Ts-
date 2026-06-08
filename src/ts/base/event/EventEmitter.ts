export default class EventEmitter {
    private listeners: Record<string, Function[]> = {};

    public on(event: string, listener: Function) {
        (this.listeners[event] ??= []).push(listener);
        return () => this.off(event, listener);
    }

    public off(event: string, listener: Function) {
        this.listeners[event] = this.listeners[event]?.filter(l => l !== listener);
    }

    public emit(event: string, data?: any) {
        this.listeners[event]?.forEach(l => l(data));
    }
}