/* eslint-disable @typescript-eslint/no-explicit-any */

import { RuntimeException } from "@byloth/exceptions";

import type { AlertOptions, AlertSubscriber } from "./types/alert/index.js";
import type { BlockingAlert, DismissibleAlert } from "./types/alert/simple.js";
import type { BlockingCustomAlert, DismissibleCustomAlert } from "./types/alert/custom.js";

export interface VuertOptions
{
    duration: number | string | { enter: number | string; leave: number | string; };
}

export default class Vuert
{
    public static readonly VERSION: string = "1.0.0-rc.3";

    public static get DEFAULT_OPTS(): VuertOptions
    {
        return { duration: 200 };
    }

    protected _subscribers: AlertSubscriber<any>[];

    protected _options: VuertOptions;
    public get options(): VuertOptions
    {
        return { ...this._options };
    }

    public constructor(options?: Partial<VuertOptions>)
    {
        this._subscribers = [];

        this._options = { ...Vuert.DEFAULT_OPTS, ...options };
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
