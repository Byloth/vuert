import { PromiseResolver } from "@vuert/types";

import { IAction, ActionOptions } from "./types";

interface AlertClosures<R>
{
    resolve: PromiseResolver<R | undefined>;
}

export default class Action<R = void> implements IAction
{
    public id: symbol;
    public type: "primary" | "secondary" | "alternative";

    public icon?: string | undefined;
    public label: string;

    public callback: () => void;

    public constructor(options: ActionOptions<R>, closures: AlertClosures<R>)
    {
        this.id = (options.id !== undefined) ? options.id : Symbol();
        this.type = (options.type !== undefined) ? options.type : "secondary";

        this.icon = options.icon;
        this.label = options.label;

        const _callback = (options.callback !== undefined) ? options.callback : () => undefined;
        this.callback = () => closures.resolve(_callback());
    }
}
