import type { Component } from "vue";

import { ValueException } from "@byloth/exceptions";

import type { Props } from "../types/core";
import type { IAlert, AlertOptions } from "../types/alert";

import Action from "./action";

export default class Alert<R = void> implements IAlert<R>
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

    public readonly timeout: number;

    public constructor(options: AlertOptions<R>, cause?: unknown)
    {
        this.id = options.id ?? Symbol();

        this.type = options.type ?? "info";
        this.priority = options.priority ?? "normal";

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

        this.actions = options.actions?.map((a) => new Action(a)) ?? [];

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
    }
}
