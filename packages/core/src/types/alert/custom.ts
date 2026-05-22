import type { Component } from "vue";

import type { CoreAlert, BlockingMixin, DismissibleMixin } from "./core.js";

export interface CustomAlert<R = void, P extends Record<string, unknown> = never> extends CoreAlert<R, P>
{
    message?: never;
    component: Component;
}

export type BlockingCustomAlert<R = void, P extends Record<string, unknown> = never> =
    CustomAlert<R, P> & BlockingMixin;

export type DismissibleCustomAlert<R = void, P extends Record<string, unknown> = never> =
    CustomAlert<R, P> & DismissibleMixin;
