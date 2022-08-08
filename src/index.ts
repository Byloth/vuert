import { inject, App, Plugin } from "vue";

import { AlertCallback, Unsubscriber, SubscribeCallback, injectionKeys } from "./core";

const VuePluginAlert: Plugin = {
    install(app: App, options: unknown)
    {
        const subscribers: Array<(options: unknown) => void> = [];

        const $alert: AlertCallback = (options: unknown): void =>
        {
            for (const subscriber of subscribers)
            {
                subscriber(options);
            }
        };
        const $subscribe: SubscribeCallback = (callback: AlertCallback): Unsubscriber =>
        {
            subscribers.push(callback);

            return () => subscribers.splice(subscribers.indexOf(callback), 1);
        };

        app.config.globalProperties.$alert = $alert;
        app.config.globalProperties.$subscribe = $subscribe;

        app.provide(injectionKeys.alert, $alert);
        app.provide(injectionKeys.subscribe, $subscribe);
    }
};

export const useAlert = (): AlertCallback =>
{
    const $alert = inject(injectionKeys.alert);
    if (!$alert)
    {
        throw new Error("`useAlert` was called with no active instance. Did you forget to install VuePluginAlert?");
    }

    return $alert;
};
export const useSubscribe = (): SubscribeCallback =>
{
    const $subscribe = inject(injectionKeys.subscribe);
    if (!$subscribe)
    {
        throw new Error("`useSubscribe` was called with no active instance. Did you forget to install VuePluginAlert?");
    }

    return $subscribe;
};

export default VuePluginAlert;
