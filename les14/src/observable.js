
export class Observable {
    constructor() {
        this.subscribers = [];
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    next(data) {   // tell about changes
        this.subscribers.forEach((subscriber) => {
           subscriber(data);
        });
    }

}
