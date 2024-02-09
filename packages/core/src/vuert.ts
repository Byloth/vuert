import { RuntimeException } from "@byloth/exceptions";

import { AlertThrottledException } from "./exceptions";
import { Context } from "./models/index.js";

import type { Duration } from "./types/index.js";
import type { AlertOptions } from "./types/alert/index.js";
import type { BlockingAlert, DismissibleAlert } from "./types/alert/simple.js";
import type { BlockingCustomAlert, DismissibleCustomAlert } from "./types/alert/custom.js";

export interface VuertOptions
{
    useThrottling: boolean;
    throttlingDuration: number;
    transitionDuration: number | Duration;
}
export type VuertSubscriber<R = void> = (alert: AlertOptions<R>) => Context<R> | void;

export default class Vuert
{
    public static readonly VERSION: string = "1.2.2-rc.3";

    public static get DEFAULT_OPTS(): VuertOptions
    {
        return {
            useThrottling: true,
            throttlingDuration: 100,
            transitionDuration: 200
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected _subscribers: VuertSubscriber<any>[];
    protected _throttlers: Map<symbol, number>;

    protected _options: VuertOptions;
    public get options(): VuertOptions
    {
        return { ...this._options };
    }

    protected _throttle: <R>(alert: AlertOptions<R>) => boolean;

    public constructor(options?: Partial<VuertOptions>)
    {
        this._subscribers = [];
        this._throttlers = new Map();

        this._options = { ...Vuert.DEFAULT_OPTS, ...options };

        if (this._options.useThrottling)
        {
            this._throttle = <R>(alert: AlertOptions<R>): boolean =>
            {
                if (!(alert.id)) { return false; }

                const now = Date.now();
                const last = this._throttlers.get(alert.id) ?? 0;

                if ((now - last) > this._options.throttlingDuration)
                {
                    this._throttlers.set(alert.id, now);

                    return false;
                }

                return true;
            };
        }
        else
        {
            this._throttle = () => false;
        }
    }

    public emit<R = void>(alert: BlockingAlert<R>): Context<R>;
    public emit<R = void>(alert: DismissibleAlert<R>): Context<R | void>;
    public emit<R = void>(alert: BlockingCustomAlert<R>): Context<R>;
    public emit<R = void>(alert: DismissibleCustomAlert<R>): Context<R | void>;
    public emit<R = void>(alert: AlertOptions<R>): Context<R | void>;
    public emit<R = void>(alert: AlertOptions<R>): Context<R | void>
    {
        if (this._throttle(alert)) { throw new AlertThrottledException(alert); }

        const subscribers = this._subscribers.slice();
        const contexts = subscribers.map((subscriber) => subscriber(alert));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const results = contexts.filter((context) => !!(context)) as Context<any>[];

        if (!(results.length))
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
