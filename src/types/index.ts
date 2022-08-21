import { Component } from "vue";

import { SimpleAction } from "./actions";
import { CoreAlert } from "./alerts/core";

export interface Action<T> extends SimpleAction
{
    result?: () => T;
}
export interface Alert<T> extends CoreAlert
{
    icon?: string;
    title?: string;
    message?: string;
    component?: Component;
    actions?: Action<T>[];
}

export type AlertListener<T> = (alert: Alert<T>) => Promise<T> | undefined;
export type PromiseResolver<T> = (result: T | PromiseLike<T>) => void;
