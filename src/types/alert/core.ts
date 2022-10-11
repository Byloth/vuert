import { Component } from "vue";

import { Props } from "../core";
import { IAction, ActionOptions } from "../action";

export interface IAlert
{
    id: symbol;

    type: "info" | "success" | "warning" | "error" | "question";
    priority: "high" | "normal" | "low";

    icon?: string;
    title?: string;

    message?: string;

    component?: Component;
    props?: Props;

    actions: IAction[];

    dismissible: boolean;
    timeout: number;
}

type PartialAlert = Partial<IAlert>;
type OmittedProperty = "message" | "component" | "props" | "actions";
type OmittedAlert = Omit<PartialAlert, OmittedProperty>;
export interface CoreAlert<R = void> extends OmittedAlert
{
    actions?: ActionOptions<R>[];
}

export type BlockingMixin = { dismissible?: false; timeout?: undefined };
export type DismissibleMixin = { dismissible: true; } | { timeout: number };
