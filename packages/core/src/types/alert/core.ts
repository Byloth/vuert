import type { AlertCustomOptions } from "../../custom.js";
import type { DistributiveOmit } from "../../types.js";

import type { IAction, ActionOptions } from "../action/index.js";

export interface IAlert<R = void, P extends Record<string, unknown> = never>
{
    id: symbol;

    type: "info" | "success" | "warning" | "error" | "question";
    priority: "high" | "normal" | "low";

    icon?: string;
    title?: string;
    subtitle?: string;

    message?: string;
    payload?: P;

    actions: IAction<R>[];

    dismissible: boolean;
    timeout: number;
}

type WithCustomOptions<T> = DistributiveOmit<T, keyof AlertCustomOptions> & AlertCustomOptions;
type CustomizedAlert<R, P extends Record<string, unknown>> = WithCustomOptions<Partial<IAlert<R, P>>>;

type NotCustomizableProperty = "actions" | "component" | "dismissible" | "message" | "timeout";
type OmittedAlert<P extends Record<string, unknown>> = Omit<CustomizedAlert<never, P>, NotCustomizableProperty>;

export interface CoreAlert<R = void, P extends Record<string, unknown> = never> extends OmittedAlert<P>
{
    actions?: ActionOptions<R>[];

    dismissible?: boolean;
    timeout?: number;
}

export interface BlockingMixin { dismissible?: false, timeout?: never }
export type DismissibleMixin = { dismissible: true } | { timeout: number };
