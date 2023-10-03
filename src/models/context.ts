import { computed, ref } from "vue";
import type { ComputedRef, Ref } from "vue";

import { delay, DeferredPromise, Subscribers } from "@byloth/core";
import type { FulfilledHandler, MaybePromise, PromiseRejecter, PromiseResolver, RejectedHandler } from "@byloth/core";

import type { Duration } from "../types/index.js";
import type { ActionCallback } from "../types/action.js";
import type { AlertOptions } from "../types/alert/index.js";

import Action from "./action.js";
import Alert from "./alert.js";

export type ContextResult<R> = Action<R> | ActionCallback<R | undefined> | MaybePromise<R | undefined>;

export default class Context<T = void, E = unknown> extends DeferredPromise<ContextResult<T>, E>
{
    protected _duration: Duration;
    protected _timeoutId?: number;

    protected _openingSubscribers: Subscribers;
    protected _openedSubscribers: Subscribers;
    protected _closingSubscribers: Subscribers;
    protected _closedSubscribers: Subscribers;

    protected readonly _isOpen: Ref<boolean>;

    public readonly alert: Alert<T>;
    public readonly isOpen: ComputedRef<boolean>;

    public constructor(options: AlertOptions<T>, duration: number | Duration)
    {
        super();

        if (typeof duration === "object")
        {
            this._duration = {
                enter: Number(duration.enter),
                leave: Number(duration.leave)
            };
        }
        else
        {
            const _duration = Number(duration);
            this._duration = {
                enter: _duration,
                leave: _duration
            };
        }

        this._openingSubscribers = new Subscribers();
        this._openedSubscribers = new Subscribers();
        this._closingSubscribers = new Subscribers();
        this._closedSubscribers = new Subscribers();

        this.alert = new Alert<T>(options);

        this._isOpen = ref(false);
        this.isOpen = computed((): boolean => this._isOpen.value);

        const _close = async (): Promise<void> =>
        {
            if (!this._isOpen.value)
            {
                throw new Error("Unable to close the alert. It has already been closed or not even opened yet.");
            }

            this._isOpen.value = false;

            if (this._timeoutId !== undefined)
            {
                clearTimeout(this._timeoutId);

                this._timeoutId = undefined;
            }

            this._closingSubscribers.call();
            await delay(this._duration.leave);
            this._closedSubscribers.call();
        };

        const _resolve: PromiseResolver<T> = super._resolve;
        const _reject: PromiseRejecter<E> = super._reject;

        super._resolve = async (result?: MaybePromise<ContextResult<T>>): Promise<void> =>
        {
            _close();

            if (result instanceof Action)
            {
                _resolve(result.callback() as T);
            }
            else if (result instanceof Function)
            {
                _resolve(result() as T);
            }
            else
            {
                _resolve(result as T);
            }
        };
        super._reject = (reason: E): void =>
        {
            _close();
            _reject(reason);
        };
    }

    public async open(): Promise<void>
    {
        if (this._isOpen.value)
        {
            throw new Error("Unable to open the alert. It has already been opened.");
        }

        this._isOpen.value = true;

        this._openingSubscribers.call();
        await delay(this._duration.enter);
        this._openedSubscribers.call();

        if (this.alert.timeout)
        {
            this._timeoutId = setTimeout(this.resolve, this.alert.timeout);
        }
    }

    public onOpening(subscriber: () => void): void
    {
        this._openingSubscribers.add(subscriber);
    }
    public onOpened(subscriber: () => void): void
    {
        this._openedSubscribers.add(subscriber);
    }
    public onClosing(subscriber: () => void): void
    {
        this._closingSubscribers.add(subscriber);
    }
    public onClosed(subscriber: () => void): void
    {
        this._closedSubscribers.add(subscriber);
    }

    public then<F = T, R = E>(onFulfilled?: FulfilledHandler<T, F> | null, onRejected?: RejectedHandler<E, R>)
        : Context<F, R>
    {
        super.then(onFulfilled as undefined, onRejected);

        return (this as unknown) as Context<F, R>;
    }
    public catch<R = E>(onRejected?: RejectedHandler<E, R>): Context<T, R>
    {
        super.catch(onRejected);

        return (this as unknown) as Context<T, R>;
    }
    public finally(onFinally?: (() => void) | null): Context<T, E>
    {
        super.finally(onFinally);

        return this;
    }
}
