import { Component } from "vue";

import { Props } from "../core";
import { CoreAlert, BlockingMixin, DismissibleMixin } from "./core";

export interface CustomAlert<R = void> extends CoreAlert<R>
{
    message?: undefined;

    component: Component;
    props?: Props;
}

export type BlockingCustomAlert<R = void> = CustomAlert<R> & BlockingMixin;
export type DismissibleCustomAlert<R = void> = CustomAlert<R> & DismissibleMixin;
