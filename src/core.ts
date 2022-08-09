import { InjectionKey } from "vue";

export type AlertCallback = (options: unknown) => void;
export type Unsubscriber = () => void;
export type SubscribeCallback = (callback: AlertCallback) => Unsubscriber;

export const injectionKeys = {
    alert: Symbol("[vuert]: alert") as InjectionKey<AlertCallback>,
    subscribe: Symbol("[vuert]: subscribe") as InjectionKey<SubscribeCallback>
};
