import { CoreAlert, BlockingMixin, DismissibleMixin } from "./core";

export interface SimpleAlert<R = void> extends CoreAlert<R>
{
    message: string;

    component?: undefined;
    props?: undefined;
}

export type BlockingAlert<R = void> = SimpleAlert<R> & BlockingMixin;
export type DismissibleAlert<R = void> = SimpleAlert<R> & DismissibleMixin;
