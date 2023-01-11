import type { Awaitable } from "./index.js";

export type ActionCallback<T> = () => Awaitable<T>;

export interface IAction<R>
{
    id: symbol;
    type: "primary" | "secondary" | "alternative";
    icon?: string;
    label: string;

    callback: ActionCallback<R | undefined>;
}

type PartialAction<R> = Partial<IAction<R>>;
type OmittedAction = Omit<PartialAction<never>, "callback">;

export interface ActionOptions<R = void> extends OmittedAction
{
    label: string;

    callback?: ActionCallback<R>;
}
