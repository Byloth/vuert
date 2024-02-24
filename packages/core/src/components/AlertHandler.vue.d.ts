import type { Component, PropType } from "vue";
import { Alert } from "../models/index.js";
import type { Duration } from "../types/index.js";
import type { AlertOptions } from "../types/alert/index.js";
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    is: {
        default: string;
        type: PropType<string | Component>;
    };
    filter: {
        default: () => boolean;
        type: PropType<(options: AlertOptions<unknown>) => boolean>;
    };
    transitionDuration: {
        default: () => number | Duration;
        type: PropType<number | Duration>;
        validator: (value: unknown) => boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    opening: (alert: Alert<unknown, Record<string, unknown>>) => void;
    opened: (alert: Alert<unknown, Record<string, unknown>>) => void;
    closing: (alert: Alert<unknown, Record<string, unknown>>) => void;
    closed: (alert: Alert<unknown, Record<string, unknown>>) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    is: {
        default: string;
        type: PropType<string | Component>;
    };
    filter: {
        default: () => boolean;
        type: PropType<(options: AlertOptions<unknown>) => boolean>;
    };
    transitionDuration: {
        default: () => number | Duration;
        type: PropType<number | Duration>;
        validator: (value: unknown) => boolean;
    };
}>> & {
    onOpening?: ((alert: Alert<unknown, Record<string, unknown>>) => any) | undefined;
    onOpened?: ((alert: Alert<unknown, Record<string, unknown>>) => any) | undefined;
    onClosing?: ((alert: Alert<unknown, Record<string, unknown>>) => any) | undefined;
    onClosed?: ((alert: Alert<unknown, Record<string, unknown>>) => any) | undefined;
}, {
    filter: (options: AlertOptions<unknown>) => boolean;
    transitionDuration: number | Duration;
    is: string | Component;
}, {}>, {
    default?(_: {
        alert: Alert<any, any>;
        customComponent: Component | undefined;
        isOpen: boolean;
        queue: number;
        resolve: import("@byloth/core").PromiseResolver<any>;
        reject: import("@byloth/core").PromiseRejecter<unknown>;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
