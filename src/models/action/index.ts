import { IAction, ActionOptions } from "./types";

export default class Action<R> implements IAction<R>
{
    public id: symbol;
    public type: "primary" | "secondary" | "alternative";

    public icon?: string | undefined;
    public label: string;

    public callback: () => R | undefined;

    public constructor(options: ActionOptions<R>)
    {
        this.id = (options.id !== undefined) ? options.id : Symbol();
        this.type = (options.type !== undefined) ? options.type : "secondary";

        this.icon = options.icon;
        this.label = options.label;

        this.callback = (options.callback !== undefined) ? options.callback : () => undefined;
    }
}
