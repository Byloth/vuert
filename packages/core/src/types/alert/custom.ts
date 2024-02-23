import type { Component } from "vue";

import type { CoreAlert, BlockingMixin, DismissibleMixin } from "./core.js";

export interface CustomAlert<R = void, P extends Record<string, unknown> = never> extends CoreAlert<R, P>
{
    message?: string;
    component: Component;
}

export type BlockingCustomAlert<R = void> = CustomAlert<R> & BlockingMixin;
export type DismissibleCustomAlert<R = void> = CustomAlert<R> & DismissibleMixin;
