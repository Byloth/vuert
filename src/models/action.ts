import type { IAction, ActionCallback, ActionOptions } from "../types/action.js";

export default class Action<R = void> implements IAction<R>
{
    public readonly id: symbol;
    public readonly type: "primary" | "secondary" | "alternative";

    public readonly icon?: string | undefined;
    public readonly label: string;

    public readonly callback: ActionCallback<R | undefined>;

    public constructor(options: ActionOptions<R>)
    {
        this.id = (options.id !== undefined) ? options.id : Symbol();
        this.type = (options.type !== undefined) ? options.type : "secondary";

        this.icon = options.icon;
        this.label = options.label;

        this.callback = (options.callback !== undefined) ? options.callback : () => undefined;
    }
}
