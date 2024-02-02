/* eslint-disable @typescript-eslint/no-explicit-any */

import { RuntimeException } from "@byloth/exceptions";

import type { Context } from "./models/index.js";

import type { Duration } from "./types/index.js";
import type { AlertOptions } from "./types/alert/index.js";
import type { BlockingAlert, DismissibleAlert } from "./types/alert/simple.js";
import type { BlockingCustomAlert, DismissibleCustomAlert } from "./types/alert/custom.js";

export interface VuertOptions
{
    duration: number | Duration;
}
export type VuertSubscriber<R = void> = (alert: AlertOptions<R>) => Context<R> | void;

export default class Vuert
{
    public static readonly VERSION: string = "1.2.1-rc.1";

    public static get DEFAULT_OPTS(): VuertOptions
    {
        return { duration: 200 };
    }

    protected _subscribers: VuertSubscriber<any>[];

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

    public emit<R = void>(alert: BlockingAlert<R>): Context<R>;
    public emit<R = void>(alert: DismissibleAlert<R>): Context<R | void>;
    public emit<R = void>(alert: BlockingCustomAlert<R>): Context<R>;
    public emit<R = void>(alert: DismissibleCustomAlert<R>): Context<R | void>;
    public emit<R = void>(alert: AlertOptions<R>): Context<R | void>;
    public emit<R = void>(alert: AlertOptions<R>): Context<R | void>
    {
        const subscribers = this._subscribers.slice();
        const contexts = subscribers.map((subscriber) => subscriber(alert));
        const results = contexts.filter((context) => !!(context)) as Context<any>[];

        if (!results.length)
        {
            throw new RuntimeException("Unable to handle the emitted alert properly. " +
                                       "There wasn't found any supported subscribers.");
        }
        if (results.length > 1)
        {
            throw new RuntimeException("Unable to handle the emitted alert properly. " +
                                       "There were found too many supported subscribers.");
        }

        return results[0];
    }

    public subscribe<R>(subscriber: VuertSubscriber<R>): () => VuertSubscriber<R>
    {
        this._subscribers.push(subscriber);

        return (): VuertSubscriber<R> =>
        {
            const index = this._subscribers.indexOf(subscriber);

            return this._subscribers.splice(index, 1)[0];
        };
    }
}
