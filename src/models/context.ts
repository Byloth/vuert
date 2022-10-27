import { computed, ComputedRef } from "vue";

import { RuntimeException, ValidationException } from "../exceptions";
import { PromiseClosures } from "../types";
import { AlertOptions } from "../types/alert";

import Alert from "./alert";

export interface ContextClosures<R = void> extends PromiseClosures<R>
{
    close: (ctx: Context<R>) => Promise<void>;
}

export default class Context<R = void>
{
    protected _isOpen: boolean;

    protected _timeoutId: number | undefined;

    protected readonly _close: () => void;

    public readonly isOpen: ComputedRef<boolean>;

    public readonly alert: Alert<R>;

    public readonly dismiss: () => void;
    public readonly resolve: (result: R) => void;
    public readonly reject: (error: Error) => void;

    public constructor(options: AlertOptions<R>, { close, resolve, reject }: ContextClosures<R>)
    {
        this.alert = new Alert<R>(options);

        this._close = () =>
        {
            if (!this._isOpen)
            {
                throw new RuntimeException("Unable to close the alert. It has already been closed or not even opened.");
            }

            if (this._timeoutId !== undefined)
            {
                clearTimeout(this._timeoutId);

                this._timeoutId = undefined;
            }

            this._isOpen = false;

            close(this);
        };

        this.dismiss = (): void =>
        {
            if (!this.alert.dismissible)
            {
                throw new ValidationException("You cannot dismiss an alert that hasn't been defined as `dismissible`.");
            }

            this._close();

            resolve(undefined as R);
        };
        this.resolve = (result: R): void =>
        {
            this._close();

            resolve(result);
        };
        this.reject = (error: Error): void =>
        {
            this._close();

            reject(error);
        };

        this._isOpen = false;
        this.isOpen = computed((): boolean => this._isOpen);
    }

    public opening(): void
    {
        if (this._isOpen)
        {
            throw new RuntimeException("Unable to open the alert. It has already been opened.");
        }

        this._isOpen = true;
    }
    public opened(): void
    {
        if (this.alert.timeout)
        {
            this._timeoutId = setTimeout(this._close, this.alert.timeout);
        }
    }
}
