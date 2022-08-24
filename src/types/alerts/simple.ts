import { ActionWithResult } from "../actions";
import { CoreAlert } from "./core";

export interface SimpleAlert extends CoreAlert
{
    message: string;
}

export type BlockingAlert = SimpleAlert & { dismissable?: false; timeout?: undefined };
export type DismissableAlert = SimpleAlert & ({ dismissable: true; } | { timeout: number });

export type AlertWithResult<T> = BlockingAlert & { actions: ActionWithResult<T>[]; };
export type AlertWithUncertainResult<T> = DismissableAlert & { actions: ActionWithResult<T>[]; };
