import { inject, getCurrentScope } from "vue";
import type { App, ComponentPublicInstance, Plugin } from "vue";

import { handle, RuntimeException } from "@byloth/exceptions";

import { InjectionKeys } from "./core.js";

import Vuert from "./vuert.js";
import type { VuertOptions } from "./vuert.js";
import type { AlertOptions } from "./types/alert/index.js";

interface EnabledErrorsHandling
{
    enableErrorsHandling: true;
    defaultAlertOptions: AlertOptions;
}
interface DisabledErrorsHandling
{
    enableErrorsHandling?: false;
    defaultAlertOptions?: never;
}

type ErrorsHandling = EnabledErrorsHandling | DisabledErrorsHandling;

let _activeVuert: Vuert | undefined = undefined;

const _setActiveVuert = (vuert: Vuert): void => { _activeVuert = vuert; };
const _getActiveVuert = (): Vuert | undefined =>
{
    if (getCurrentScope())
    {
        return inject(InjectionKeys.$vuert);
    }

    return _activeVuert;
};

export type PluginOptions = Partial<VuertOptions> & ErrorsHandling;
export const createVuert = (options?: PluginOptions): Plugin =>
{
    return {
        install: ({ config, provide }: App): void =>
        {
            const $vuert = new Vuert(options);

            _setActiveVuert($vuert);

            config.globalProperties.$vuert = $vuert;
            provide(InjectionKeys.$vuert, $vuert);

            if (options?.enableErrorsHandling)
            {
                config.errorHandler = (error: unknown, instance: ComponentPublicInstance | null, info: string) =>
                {
                    handle(error, (exc) =>
                    {
                        // eslint-disable-next-line no-console
                        console.error(exc);

                        $vuert.emit(options.defaultAlertOptions);
                    });
                };

                window.addEventListener("unhandledrejection", ({ reason }: PromiseRejectionEvent) =>
                {
                    handle(reason, () => $vuert.emit(options.defaultAlertOptions));
                });
            }
        }
    };
};
export const useVuert = (): Vuert =>
{
    const $vuert = _getActiveVuert();
    if (!$vuert)
    {
        throw new RuntimeException(
            "`useVuert()` was called but there was not active Vuert. " +
            "Did you forget to install `Vuert` plugin in your App?"
        );
    }

    return $vuert;
};
