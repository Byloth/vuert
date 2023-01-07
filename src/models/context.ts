import { computed, ref } from "vue";
import type { ComputedRef, Ref } from "vue";
import type { Awaitable } from "vitepress";

import { RuntimeException } from "../exceptions.js";

import type { PromiseClosures } from "../types/index.js";
import type { ActionCallback } from "../types/action.js";
import type { AlertOptions } from "../types/alert/index.js";

import Action from "./action.js";
import Alert from "./alert.js";

export type ContextResult<R> = Action<R> | ActionCallback<R | undefined> | Awaitable<R | undefined>;

export default class Context<R = void>
{
    protected _timeoutId: number | undefined;

    protected readonly _isOpen: Ref<boolean>;

    public readonly alert: Alert<R>;
    public readonly isOpen: ComputedRef<boolean>;

    public readonly resolver: (result?: ContextResult<R>) => void;
    public readonly rejecter: (error: Error) => void;

    public constructor(options: AlertOptions<R>, { resolve, reject }: PromiseClosures<R>)
    {
        this.alert = new Alert<R>(options);

        const _close = () =>
        {
            if (!this._isOpen.value)
            {
                throw new RuntimeException("Unable to close the alert. It has already been closed or not even opened.");
            }

            if (this._timeoutId !== undefined)
            {
                clearTimeout(this._timeoutId);

                this._timeoutId = undefined;
            }

            this._isOpen.value = false;
        };

        this.resolver = (result?: ContextResult<R>): void =>
        {
            _close();

            if (result instanceof Action)
            {
                resolve(result.callback() as R);
            }
            else if (result instanceof Function)
            {
                resolve(result() as R);
            }
            else
            {
                resolve(result as R);
            }
        };
        this.rejecter = (error: Error): void =>
        {
            _close();

            reject(error);
        };

        this._isOpen = ref(false);
        this.isOpen = computed((): boolean => this._isOpen.value);
    }

    public opening(): void
    {
        if (this._isOpen.value)
        {
            throw new RuntimeException("Unable to open the alert. It has already been opened.");
        }

        this._isOpen.value = true;
    }
    public opened(): void
    {
        if (this.alert.timeout)
        {
            this._timeoutId = setTimeout(this.resolver, this.alert.timeout);
        }
    }
}
