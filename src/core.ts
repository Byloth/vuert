import { InjectionKey } from "vue";

export type AlertCallback = (options: unknown) => void;
export type Unsubscriber = () => void;
export type SubscribeCallback = (callback: AlertCallback) => Unsubscriber;

export const injectionKeys = {
    alert: Symbol("[vue-plugin-alert]: alert") as InjectionKey<AlertCallback>,
    subscribe: Symbol("[vue-plugin-alert]: subscribe") as InjectionKey<SubscribeCallback>
};
