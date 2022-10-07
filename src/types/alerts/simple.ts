import { ActionWithResult } from "../actions";
import { CoreAlert } from "./core";

export interface SimpleAlert extends CoreAlert
{
    message: string;
}

type Blocking = { dismissible?: false; timeout?: undefined };
type Dismissible = { dismissible: true; } | { timeout: number };

export type BlockingAlert = SimpleAlert & Blocking;
export type DismissibleAlert = SimpleAlert & Dismissible;

type WithResult<R> = { actions: ActionWithResult<R>[]; };

export type AlertWithResult<R> = BlockingAlert & WithResult<R>;
export type AlertWithUncertainResult<R> = DismissibleAlert & WithResult<R>;
