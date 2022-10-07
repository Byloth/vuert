import { Component } from "vue";

import { Props } from "@core/core/types";

import { ActionWithResult } from "../actions";
import { CoreAlert } from "./core";

export interface CustomAlert extends CoreAlert
{
    component: Component;
    props?: Props;
}

type Blocking = { dismissible?: false; timeout?: undefined };
type Dismissible = { dismissible: true; } | { timeout: number };

export type BlockingCustomAlert = CustomAlert & Blocking;
export type DismissibleCustomAlert = CustomAlert & Dismissible;

type WithResult<R> = { actions: ActionWithResult<R>[]; };

export type CustomAlertWithResult<R> = BlockingCustomAlert & WithResult<R>;
export type CustomAlertWithUncertainResult<R> = DismissibleCustomAlert & WithResult<R>;
