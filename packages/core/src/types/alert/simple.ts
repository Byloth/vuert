import type { CoreAlert, BlockingMixin, DismissibleMixin } from "./core.js";

export interface SimpleAlert<R = void> extends CoreAlert<R>
{
    message: string;

    component?: never;
    props?: never;
}

export type BlockingAlert<R = void> = SimpleAlert<R> & BlockingMixin;
export type DismissibleAlert<R = void> = SimpleAlert<R> & DismissibleMixin;
