import { computed, ref } from "vue";
import type { Component, ComputedRef, Ref } from "vue";

import { delay, DeferredPromise, Publisher } from "@byloth/core";
import type { MaybePromise, Timeout } from "@byloth/core";

import type { Duration } from "../types/index.js";
import type { ActionCallback } from "../types/action/index.js";
import type { AlertOptions } from "../types/alert/index.js";

import Action from "./action.js";
import Alert from "./alert.js";

export type ContextResult<R> = Action<R> | ActionCallback<R | undefined> | MaybePromise<R | undefined>;

interface ContextEventMap
{
    opening: () => void;
    opened: () => void;
    closing: () => void;
    closed: () => void;
}

export default class Context<T = void, P extends Record<string, unknown> = never> extends DeferredPromise<T>
{
    protected _duration: Duration;
    protected _timeoutId?: Timeout;

    protected _publisher: Publisher<ContextEventMap>;

    protected readonly _isOpen: Ref<boolean>;

    public readonly alert: Alert<T, P>;
    public readonly isOpen: ComputedRef<boolean>;
    public readonly component?: Component;

    public constructor(options: AlertOptions<T, P>, duration: number | Duration)
    {
        const _close = async (): Promise<void> =>
        {
            if (!(this._isOpen.value))
            {
                throw new Error("Unable to close the alert. It has already been closed or not even opened yet.");
            }

            this._isOpen.value = false;

            if (this._timeoutId !== undefined)
            {
                clearTimeout(this._timeoutId);

                this._timeoutId = undefined;
            }

            this._publisher.publish("closing");
            await delay(this._duration.leave);
            this._publisher.publish("closed");
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

        this._publisher = new Publisher();
        this.alert = new Alert<T, P>(options as AlertOptions<T>);

        this._isOpen = ref(false);
        this.isOpen = computed((): boolean => this._isOpen.value);

        this.component = options.component;
    }

    public async open(): Promise<void>
    {
        if (this._isOpen.value)
        {
            throw new Error("Unable to open the alert. It has already been opened.");
        }

        this._isOpen.value = true;

        this._publisher.publish("opening");
        await delay(this._duration.enter);
        this._publisher.publish("opened");

        if (this.alert.timeout)
        {
            this._timeoutId = setTimeout(this.resolve, this.alert.timeout);
        }
    }

    public onOpening(subscriber: () => void): void
    {
        this._publisher.subscribe("opening", subscriber);
    }
    public onOpened(subscriber: () => void): void
    {
        this._publisher.subscribe("opened", subscriber);
    }
    public onClosing(subscriber: () => void): void
    {
        this._publisher.subscribe("closing", subscriber);
    }
    public onClosed(subscriber: () => void): void
    {
        this._publisher.subscribe("closed", subscriber);
    }
}
