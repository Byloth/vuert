import { AlertHandler } from "./types";

import { AlertOptions } from "./types/alert";
import { BlockingAlert, DismissibleAlert } from "./types/alert/simple";
import { BlockingCustomAlert, DismissibleCustomAlert } from "./types/alert/custom";
import { RuntimeException } from "./exceptions";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VuertOptions { /* ... */ }

export default class Vuert
{
    protected _handlers: AlertHandler<unknown>[];

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
        const results = promises.filter((element) => !!(element)) as Promise<unknown>[];

        if (!results)
        {
            throw new RuntimeException("Unable to handle the emitted alert properly. " +
                                       "There wasn't found any supported handler.");
        }

        return Promise.any(results) as Promise<R | void>;
    }

    public subscribe<R = unknown>(handler: AlertHandler<R>): () => AlertHandler<R>
    {
        this._handlers.push(handler as AlertHandler<unknown>);

        return () =>
        {
            const index = this._handlers.indexOf(handler as AlertHandler<unknown>);

            return this._handlers.splice(index, 1)[0] as AlertHandler<R>;
        };
    }
}
