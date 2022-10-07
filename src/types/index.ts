import { Component } from "vue";

import { Props } from "@core/core/types";

import { Action } from "./actions";
import { CoreAlert } from "./alerts/core";

export interface ActionOptions<R> extends Action
{
    callback?: () => R;
}
export interface AlertOptions<R> extends Partial<CoreAlert>
{
    message?: string;

    component?: Component;
    props?: Props;

    actions?: ActionOptions<R>[];
}

export type AlertListener<R> = (alert: AlertOptions<R>) => Promise<R> | undefined;
export type PromiseResolver<R> = (result: R | PromiseLike<R>) => void;
