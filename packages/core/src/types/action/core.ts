import type { MaybePromise } from "@byloth/core";

export type ActionCallback<T> = () => MaybePromise<T>;

export interface IAction<R = void>
{
    id: symbol;
    type: "primary" | "secondary" | "alternative";
    icon?: string;
    label: string;

    callback: ActionCallback<R | undefined>;
}

type PartialAction<R> = Partial<IAction<R>>;
type OmittedProperty = "callback";
type OmittedAction = Omit<PartialAction<never>, OmittedProperty>;

export interface CoreAction extends OmittedAction
{
    label: string;
}
