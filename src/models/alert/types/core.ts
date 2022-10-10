import { Component } from "vue";

import { Props } from "@vuert/core/types";
import { IAction, ActionOptions } from "@vuert/models/action/types";

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
type OmittedAlert<R> = Omit<PartialAlert<R>, OmittedProperty>;
export interface CoreAlert<R = void> extends OmittedAlert<R>
{
    actions?: ActionOptions<R>[];
}

export type BlockingMixin = { dismissible?: false; timeout?: undefined };
export type DismissibleMixin = { dismissible: true; } | { timeout: number };
