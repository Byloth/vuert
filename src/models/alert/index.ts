import { Component } from "vue";

import { Props } from "@vuert/core/types";
import { RuntimeException } from "@vuert/exceptions";

import Action from "../action";

import { AlertOptions } from "./types";
import { IAlert } from "./types/core";

type MaybePromise<T> = T | PromiseLike<T>;
type AlertResolver<T> = (result: MaybePromise<T>) => void;
type AlertRejecter = (reason: Error) => void;

export default class Alert<R = void> extends Promise<R> implements IAlert<R>
{
    public id: symbol;

    public type: "info" | "success" | "warning" | "error" | "question";
    public priority: "high" | "normal" | "low";

    public icon?: string;
    public title?: string;

    public message?: string;

    public component?: Component;
    public props?: Props;

    public actions: Action<R>[];

    public dismissible: boolean;
    public timeout: number;

    protected _isOpen: boolean;
    public get isOpen(): boolean
    {
        return this._isOpen;
    }

    protected _resolver!: AlertResolver<R>;
    protected _rejecter!: AlertRejecter;

    public constructor(options: AlertOptions<R>)
    {
        super((resolve, reject) =>
        {
            this._resolver = resolve;
            this._rejecter = reject;
        });

        this.id = (options.id !== undefined) ? options.id : Symbol();

        this.type = (options.type !== undefined) ? options.type : "info";
        this.priority = (options.priority !== undefined) ? options.priority : "normal";

        this.icon = options.icon;
        this.title = options.title;

        this.message = options.message;

        this.component = options.component;
        this.props = options.props;

        this.actions = (options.actions !== undefined) ? options.actions.map((a) => new Action(a)) : [];

        this.dismissible = (options.dismissible || false);
        this.timeout = (options.timeout !== undefined) ? options.timeout : 0;

        this._isOpen = false;
    }

    public open(): void
    {
        if (this._isOpen)
        {
            throw new RuntimeException("Unable to open this alert. It has already been opened.");
        }

        this._isOpen = true;
    }

    public resolve(result: MaybePromise<R>): void
    {
        if (!this._isOpen)
        {
            throw new RuntimeException("Unable to close this alert. It has already been closed.");
        }

        this._isOpen = false;

        this._resolver(result);
    }
    public reject(reason: Error): void
    {
        if (!this._isOpen)
        {
            throw new RuntimeException("Unable to close this alert. It has already been closed.");
        }

        this._isOpen = false;

        this._rejecter(reason);
    }
}
