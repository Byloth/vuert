/* eslint-disable @typescript-eslint/no-explicit-any */

import { AlertHandler } from "./types";

import { AlertOptions } from "./types/alert";
import { BlockingAlert, DismissibleAlert } from "./types/alert/simple";
import { BlockingCustomAlert, DismissibleCustomAlert } from "./types/alert/custom";
import { RuntimeException } from "./exceptions";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VuertOptions { /* ... */ }

export default class Vuert
{
    protected _handlers: AlertHandler<any>[];

    public constructor(options?: VuertOptions)
    {
        this._handlers = [];
    }

    public emit<R = void>(alert: BlockingAlert<R>): Promise<R>;
    public emit<R = void>(alert: DismissibleAlert<R>): Promise<R | void>;
    public emit<R = void>(alert: BlockingCustomAlert<R>): Promise<R>;
    public emit<R = void>(alert: DismissibleCustomAlert<R>): Promise<R | void>;
    public emit<R = void>(alert: AlertOptions<R>): Promise<R | void>
    {
        const handlers = this._handlers.slice();
        const promises = handlers.map((handler) => handler(alert));
        const results = promises.filter((element) => !!(element)) as Promise<any>[];

        if (!results.length)
        {
            throw new RuntimeException("Unable to handle the emitted alert properly. " +
                                       "There wasn't found any supported handler.");
        }

        return Promise.any(results);
    }

    public subscribe<R>(handler: AlertHandler<R>): () => AlertHandler<R>
    {
        this._handlers.push(handler);

        return (): AlertHandler<R> =>
        {
            const index = this._handlers.indexOf(handler);

            return this._handlers.splice(index, 1)[0];
        };
    }
}
