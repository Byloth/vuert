import { computed, ref, ComputedRef, Ref } from "vue";

import { RuntimeException } from "../exceptions";
import { MaybePromise, PromiseClosures } from "../types";
import { ActionCallback } from "../types/action";
import { AlertOptions } from "../types/alert";

import Action from "./action";
import Alert from "./alert";

export interface ContextClosures<R = void> extends PromiseClosures<R>
{
    close: (ctx: Context<R>) => Promise<void>;
}

export type ContextResult<R> = Action<R> | ActionCallback<R | undefined> | MaybePromise<R | undefined>;

export default class Context<R = void>
{
    protected _timeoutId: number | undefined;

    protected readonly _isOpen: Ref<boolean>;

    public readonly alert: Alert<R>;
    public readonly isOpen: ComputedRef<boolean>;

    public readonly resolve: (result?: R) => void;
    public readonly reject: (error: Error) => void;

    public constructor(options: AlertOptions<R>, { close, resolve, reject }: ContextClosures<R>)
    {
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

            close(this);
        };

        this.alert = new Alert<R>(options);

        this.resolve = (result?: ContextResult<R>): void =>
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
        this.reject = (error: Error): void =>
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
            this._timeoutId = setTimeout(this.resolve, this.alert.timeout);
        }
    }
}
