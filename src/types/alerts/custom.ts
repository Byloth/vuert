import { Component } from "vue";

import { ActionWithResult } from "../actions";
import { CoreAlert } from "./core";

export interface CustomAlert extends CoreAlert
{
    component: Component
}

export type BlockingCustomAlert = CustomAlert & { dismissable?: false; timeout?: undefined };
export type DismissableCustomAlert = CustomAlert & ({ dismissable: true; } | { timeout: number });

export type CustomAlertWithResult<T> = BlockingCustomAlert & { actions: ActionWithResult<T>[]; };
export type CustomAlertWithUncertainResult<T> = DismissableCustomAlert & { actions: ActionWithResult<T>[]; };
