import { AlertListener } from "./types";

import { AlertOptions } from "./models/alert/types";
import { BlockingAlert, DismissibleAlert } from "./models/alert/types/simple";
import { BlockingCustomAlert, DismissibleCustomAlert } from "./models/alert/types/custom";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VuertOptions { /* ... */ }

export default class Vuert
{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected _subscribers: AlertListener<any>[];

    public constructor(options?: VuertOptions)
    {
        this._subscribers = [];
    }

    public emit<R = void>(alert: BlockingAlert<R>): Promise<R>;
    public emit<R = void>(alert: DismissibleAlert<R>): Promise<R | void>;
    public emit<R = void>(alert: BlockingCustomAlert<R>): Promise<R>;
    public emit<R = void>(alert: DismissibleCustomAlert<R>): Promise<R | void>;
    public emit<R = void>(alert: AlertOptions<R>): Promise<R | void>
    {
        const subscribers = this._subscribers.slice();
        const results = subscribers.map((subscriber) => subscriber(alert));

        return Promise.any(results.filter((element) => !!(element)));
    }

    public subscribe<R = unknown>(listener: AlertListener<R>): () => AlertListener<R>
    {
        this._subscribers.push(listener);

        return () => this._subscribers.splice(this._subscribers.indexOf(listener), 1)[0];
    }
}
