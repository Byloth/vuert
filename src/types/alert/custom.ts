import type { Component } from "vue";

import type { Props } from "../core";
import type { CoreAlert, BlockingMixin, DismissibleMixin } from "./core";

export interface CustomAlert<R = void> extends CoreAlert<R>
{
    message?: undefined;

    component: Component;
    props?: Props;
}

export type BlockingCustomAlert<R = void> = CustomAlert<R> & BlockingMixin;
export type DismissibleCustomAlert<R = void> = CustomAlert<R> & DismissibleMixin;
