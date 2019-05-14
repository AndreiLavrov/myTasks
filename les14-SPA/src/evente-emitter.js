export class EventEmitter {
    constructor() {
        this._events = {};
    }

    on(event, listener) {
        (this._events[event] || (this._events[event] = [])).push(listener);
        return this;
    }

    emit(event, arg) {
        console.log(this._events);
        console.log(this);
        (this._events[event] || []).forEach(listener => listener(arg));
    }
}
