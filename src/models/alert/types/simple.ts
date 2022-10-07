import { CoreAlert, BlockingMixin, DismissibleMixin } from "./core";

export interface SimpleAlert<R = void> extends CoreAlert<R>
{
    message: string;
}

export type BlockingAlert<R = void> = SimpleAlert<R> & BlockingMixin;
export type DismissibleAlert<R = void> = SimpleAlert<R> & DismissibleMixin;
