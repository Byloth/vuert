import { computed, ref } from "vue";
import type { ComputedRef, Ref } from "vue";

import { delay, DeferredPromise, Subscribers } from "@byloth/core";
import type { MaybePromise, Timeout } from "@byloth/core";

import type { Duration } from "../types/index.js";
import type { ActionCallback } from "../types/action.js";
import type { AlertOptions } from "../types/alert/index.js";

import Action from "./action.js";
import Alert from "./alert.js";

export type ContextResult<R> = Action<R> | ActionCallback<R | undefined> | MaybePromise<R | undefined>;

export default class Context<T = void> extends DeferredPromise<T>
{
    protected _duration: Duration;
    protected _timeoutId?: Timeout;

    protected _openingSubscribers: Subscribers;
    protected _openedSubscribers: Subscribers;
    protected _closingSubscribers: Subscribers;
    protected _closedSubscribers: Subscribers;

    protected readonly _isOpen: Ref<boolean>;

    public readonly alert: Alert<T>;
    public readonly isOpen: ComputedRef<boolean>;

    public constructor(options: AlertOptions<T>, duration: number | Duration)
    {
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

        const _onFulfilled = (result?: MaybePromise<ContextResult<T>>): T =>
        {
            _close();

            if (result instanceof Action)
            {
                return result.callback() as T;
            }
            else if (result instanceof Function)
            {
                return result() as T;
            }
            else
            {
                return result as T;
            }
        };
        const _onRejected = (reason: unknown): never =>
        {
            _close();

            throw reason;
        };

        super(_onFulfilled, _onRejected);

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
}
