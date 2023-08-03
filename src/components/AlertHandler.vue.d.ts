import type { Component, PropType } from "vue";
import { Alert } from "../models";
import type { AlertOptions } from "../types/alert";
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    is: {
        default: string;
        type: PropType<string | Component>;
    };
    duration: {
        default: () => number | {
            enter: number;
            leave: number;
        };
        type: PropType<number | {
            enter: number;
            leave: number;
        }>;
        validator: (value: unknown) => boolean;
    };
    filter: {
        default: () => boolean;
        type: PropType<(options: AlertOptions<unknown>) => boolean>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    opening: (alert: Alert<unknown>) => boolean;
    opened: (alert: Alert<unknown>) => boolean;
    closing: (alert: Alert<unknown>) => boolean;
    closed: (alert: Alert<unknown>) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    is: {
        default: string;
        type: PropType<string | Component>;
    };
    duration: {
        default: () => number | {
            enter: number;
            leave: number;
        };
        type: PropType<number | {
            enter: number;
            leave: number;
        }>;
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
    duration: number | {
        enter: number;
        leave: number;
    };
}, {}>, {
    default?(_: {
        alert: Alert<any>;
        isOpen: boolean;
        resolve: (result?: any) => void;
        reject: (error: Error) => void;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
