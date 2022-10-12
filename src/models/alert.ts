import { Component } from "vue";

import { RuntimeException, ValidationException, ValueException } from "@vuert/exceptions";
import { MaybePromise, PromiseResolver, PromiseRejecter } from "@vuert/types";

import { Props } from "../types/core";
import { IAlert, AlertOptions } from "../types/alert";

import Action from "./action";

interface AlertClosures<R>
{
    close: (alert: Alert<R>) => void;
    resolve: PromiseResolver<R | undefined>;
    reject: PromiseRejecter;
}

export default class Alert<R = void> implements IAlert
{
    public readonly id: symbol;

    public readonly type: "info" | "success" | "warning" | "error" | "question";
    public readonly priority: "high" | "normal" | "low";

    public readonly icon?: string;
    public readonly title?: string;

    public readonly message?: string;

    public readonly component?: Component;
    public readonly props?: Props;

    public readonly actions: Action<R>[];
    public readonly dismissible: boolean;

    protected _timeoutId: number | undefined;
    public readonly timeout: number;

    protected _isOpen: boolean;
    public get isOpen(): boolean
    {
        return this._isOpen;
    }

    protected _closer: (alert: this) => void;
    protected _resolver: PromiseResolver<R | undefined>;
    protected _rejecter: PromiseRejecter;

    public constructor(options: AlertOptions<R>, closures: AlertClosures<R>)
    {
        this.id = (options.id !== undefined) ? options.id : Symbol();

        this.type = (options.type !== undefined) ? options.type : "info";
        this.priority = (options.priority !== undefined) ? options.priority : "normal";

        this.icon = options.icon;
        this.title = options.title;

        if ((options.message !== undefined) && (options.component !== undefined))
        {
            throw new ValueException("The `message` and `component` properties" +
                                     " cannot both be valued at the same time.");
        }

        this.message = options.message;

        this.component = options.component;
        this.props = options.props;

        this.actions = (options.actions !== undefined) ?
            options.actions.map((a) => new Action(a, { resolve: this.resolve as PromiseResolver<R | undefined> })) : [];

        this.dismissible = (options.dismissible || false);

        if (options.timeout !== undefined)
        {
            if (options.timeout <= 0)
            {
                throw new ValueException("The `timeout` property must be a positive" +
                                         " integer or -at least- `undefined`.");
            }

            this.timeout = options.timeout;
        }
        else
        {
            this.timeout = 0;
        }

        this._isOpen = false;

        this._closer = closures.close;
        this._resolver = closures.resolve;
        this._rejecter = closures.reject;
    }

    protected _close(): void
    {
        if (this._timeoutId !== undefined)
        {
            clearTimeout(this._timeoutId);
            this._timeoutId = undefined;
        }

        this._isOpen = false;
        this._closer(this);
    }

    public open(): void
    {
        if (this._isOpen)
        {
            throw new RuntimeException("Unable to open the alert. It has already been opened.");
        }

        this._isOpen = true;
    }

    public dismiss(): void
    {
        if (!this._isOpen)
        {
            throw new RuntimeException("Unable to dismiss the alert. It has already been closed or not even opened.");
        }
        if (!this.dismissible)
        {
            throw new ValidationException("You cannot dismiss an alert that hasn't been defined as `dismissible`.");
        }

        this._close();
        this._resolver();
    }

    public resolve(result: MaybePromise<R>): void
    {
        if (!this._isOpen)
        {
            throw new RuntimeException("Unable to resolve the alert. It has already been closed or not even opened.");
        }

        this._close();
        this._resolver(result);
    }
    public reject(reason: Error): void
    {
        if (!this._isOpen)
        {
            throw new RuntimeException("Unable to reject the alert. It has already been closed or not even opened.");
        }

        this._close();
        this._rejecter(reason);
    }

    public setTimeout(): void
    {
        if (!this.timeout)
        {
            throw new ValueException("The `timeout` value wasn't defined during alert's initialization.");
        }

        this._timeoutId = setTimeout(() =>
        {
            this._close();
            this._resolver();

        }, this.timeout);
    }
}
