import type { IAction, ActionOptions } from "../action/index.js";

export interface IAlert<R = void, P extends Record<string, unknown> = never>
{
    id: symbol;

    type: "info" | "success" | "warning" | "error" | "question";
    priority: "high" | "normal" | "low";

    icon?: string;
    title?: string;

    message?: string;
    payload?: P;

    actions: IAction<R>[];

    dismissible: boolean;
    timeout: number;
}

type PartialAlert<R, P extends Record<string, unknown>> = Partial<IAlert<R, P>>;
type OmittedProperty = "message" | "actions";
type OmittedAlert<P extends Record<string, unknown>> = Omit<PartialAlert<never, P>, OmittedProperty>;
export interface CoreAlert<R = void, P extends Record<string, unknown> = never> extends OmittedAlert<P>
{
    actions?: ActionOptions<R>[];
}

export type BlockingMixin = { dismissible?: false; timeout?: never };
export type DismissibleMixin = { dismissible: true; } | { timeout: number };
