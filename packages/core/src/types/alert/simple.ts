import type { CoreAlert, BlockingMixin, DismissibleMixin } from "./core.js";

export interface SimpleAlert<R = void, P extends Record<string, unknown> = never> extends CoreAlert<R, P>
{
    message: string;
    component?: never;
}

export type BlockingAlert<R = void> = SimpleAlert<R> & BlockingMixin;
export type DismissibleAlert<R = void> = SimpleAlert<R> & DismissibleMixin;
