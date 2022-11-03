/* eslint-disable @typescript-eslint/no-explicit-any */

import { AlertOptions, AlertSubscriber } from "./types/alert";
import { BlockingAlert, DismissibleAlert } from "./types/alert/simple";
import { BlockingCustomAlert, DismissibleCustomAlert } from "./types/alert/custom";
import { RuntimeException } from "./exceptions";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VuertOptions { /* ... */ }

export default class Vuert
{
    protected _subscribers: AlertSubscriber<any>[];

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
        const promises = subscribers.map((subscriber) => subscriber(alert));
        const results = promises.filter((element) => !!(element)) as Promise<any>[];

        if (!results.length)
        {
            throw new RuntimeException("Unable to handle the emitted alert properly. " +
                                       "There wasn't found any supported subscribers.");
        }

        return Promise.any(results);
    }

    public subscribe<R>(subscriber: AlertSubscriber<R>): () => AlertSubscriber<R>
    {
        this._subscribers.push(subscriber);

        return (): AlertSubscriber<R> =>
        {
            const index = this._subscribers.indexOf(subscriber);

            return this._subscribers.splice(index, 1)[0];
        };
    }
}
