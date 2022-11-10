import type { Component } from "vue";

import type { Props } from "../core";
import type { IAction, ActionOptions } from "../action";

export interface IAlert<R = void>
{
    id: symbol;

    type: "info" | "success" | "warning" | "error" | "question";
    priority: "high" | "normal" | "low";

    icon?: string;
    title?: string;

    message?: string;

    component?: Component;
    props?: Props;

    actions: IAction<R>[];

    dismissible: boolean;
    timeout: number;
}

type PartialAlert<R> = Partial<IAlert<R>>;
type OmittedProperty = "message" | "component" | "props" | "actions";
type OmittedAlert = Omit<PartialAlert<never>, OmittedProperty>;
export interface CoreAlert<R = void> extends OmittedAlert
{
    actions?: ActionOptions<R>[];
}

export type BlockingMixin = { dismissible?: false; timeout?: undefined };
export type DismissibleMixin = { dismissible: true; } | { timeout: number };
