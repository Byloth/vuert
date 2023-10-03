import type { Component, PropType } from "vue";
import { Alert } from "../models/index.js";
import type { Duration } from "../types/index.js";
import type { AlertOptions } from "../types/alert/index.js";
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    is: {
        default: string;
        type: PropType<string | Component>;
    };
    duration: {
        default: () => number | Duration;
        type: PropType<number | Duration>;
        validator: (value: unknown) => boolean;
    };
    filter: {
        default: () => boolean;
        type: PropType<(options: AlertOptions<unknown>) => boolean>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    opening: (alert: Alert<unknown>) => void;
    opened: (alert: Alert<unknown>) => void;
    closing: (alert: Alert<unknown>) => void;
    closed: (alert: Alert<unknown>) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    is: {
        default: string;
        type: PropType<string | Component>;
    };
    duration: {
        default: () => number | Duration;
        type: PropType<number | Duration>;
        validator: (value: unknown) => boolean;
    };
    filter: {
        default: () => boolean;
        type: PropType<(options: AlertOptions<unknown>) => boolean>;
    };
}>> & {
    onOpening?: ((alert: Alert<unknown>) => any) | undefined;
    onOpened?: ((alert: Alert<unknown>) => any) | undefined;
    onClosing?: ((alert: Alert<unknown>) => any) | undefined;
    onClosed?: ((alert: Alert<unknown>) => any) | undefined;
}, {
    filter: (options: AlertOptions<unknown>) => boolean;
    is: string | Component;
    duration: number | Duration;
}, {}>, {
    default?(_: {
        alert: Alert<any>;
        isOpen: boolean;
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
