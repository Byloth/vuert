import { IAction } from "@core/models/action/types";

export interface CoreAlert<R = void>
{
    id: symbol;
    type: "info" | "success" | "warning" | "error" | "question";
    priority: "high" | "normal" | "low";
    icon?: string;
    title?: string;
    actions: IAction<R>[];
    dismissible: boolean;
    timeout: number;
}

export type BlockingMixin = { dismissible?: false; timeout?: undefined };
export type DismissibleMixin = { dismissible: true; } | { timeout: number };
