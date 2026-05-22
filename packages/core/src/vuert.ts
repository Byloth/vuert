import { RuntimeException } from "@byloth/core";

import { AlertThrottledException } from "./exceptions.js";
import type { Context } from "./models/index.js";

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
export type VuertSubscriber<R = void, P extends Record<string, unknown> = never> =
    (alert: AlertOptions<R, P>) => Context<R, P> | void;

export default class Vuert
{
    public static readonly VERSION: string = "1.4.5";

    public static get DEFAULT_OPTS(): VuertOptions
    {
        return {
            useThrottling: true,
            throttlingDuration: 100,
            transitionDuration: 200
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected _subscribers: VuertSubscriber<any, any>[];
    protected _throttlers: Map<symbol, number>;

    protected _options: VuertOptions;
    public get options(): VuertOptions
    {
        return { ...this._options };
    }

    protected _throttle: <R, P extends Record<string, unknown>>(alert: AlertOptions<R, P>) => boolean;

    public constructor(options?: Partial<VuertOptions>)
    {
        this._subscribers = [];
        this._throttlers = new Map();

        this._options = { ...Vuert.DEFAULT_OPTS, ...options };

        if (this._options.useThrottling)
        {
            this._throttle = <R, P extends Record<string, unknown>>(alert: AlertOptions<R, P>): boolean =>
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

    public emit<R = void, P extends Record<string, unknown> = never>(
        alert: BlockingAlert<R, P>
    ): Context<R, P>;
    public emit<R = void, P extends Record<string, unknown> = never>(
        alert: DismissibleAlert<R, P>
    ): Context<R | void, P>;
    public emit<R = void, P extends Record<string, unknown> = never>(
        alert: BlockingCustomAlert<R, P>
    ): Context<R, P>;
    public emit<R = void, P extends Record<string, unknown> = never>(
        alert: DismissibleCustomAlert<R, P>
    ): Context<R | void, P>;
    public emit<R = void, P extends Record<string, unknown> = never>(
        alert: AlertOptions<R, P>
    ): Context<R | void, P>;
    public emit<R = void, P extends Record<string, unknown> = never>(
        alert: AlertOptions<R, P>
    ): Context<R | void, P>
    {
        if (this._throttle(alert)) { throw new AlertThrottledException(alert); }

        const subscribers = this._subscribers.slice();
        const contexts = subscribers.map((subscriber) => subscriber(alert));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const results = contexts.filter((context) => !!(context)) as Context<any, any>[];

        if (!(results.length))
        {
            throw new RuntimeException(
                "Unable to handle the emitted alert properly. " +
                "There wasn't found any supported subscribers."
            );
        }
        if (results.length > 1)
        {
            throw new RuntimeException(
                "Unable to handle the emitted alert properly. " +
                "There were found too many supported subscribers."
            );
        }

        return results[0];
    }

    public subscribe<R = void, P extends Record<string, unknown> = never>(
        subscriber: VuertSubscriber<R, P>
    ): () => VuertSubscriber<R, P>
    {
        this._subscribers.push(subscriber);

        return (): VuertSubscriber<R, P> =>
        {
            const index = this._subscribers.indexOf(subscriber);

            return this._subscribers.splice(index, 1)[0];
        };
    }
}
