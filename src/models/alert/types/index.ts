import { Component } from "vue";

import { Props } from "@core/core/types";
import { IAction, ActionOptions } from "@core/models/action/types";

import { CoreAlert } from "./core";

export interface IAlert<R = void> extends CoreAlert<R>
{
    message?: string;

    component?: Component;
    props?: Props;

    actions: IAction<R>[];
}

type PartialAlert<R> = Omit<Partial<IAlert<R>>, "actions">;
export interface AlertOptions<R = void> extends PartialAlert<R>
{
    actions?: ActionOptions<R>[];
}

type StrippedAlert<R> = Omit<AlertOptions<R>, "message" | "component" | "props">;
export interface SimpleAlertOptions<R = void> extends StrippedAlert<R>
{
    message: string;
}
export interface CustomAlertOptions<R = void> extends StrippedAlert<R>
{
    component: Component;
    props?: Props;
}
