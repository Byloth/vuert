import { inject } from "vue";
import type { App, ComponentPublicInstance, Plugin } from "vue";

import { RuntimeException } from "@byloth/exceptions";

import { InjectionKeys } from "./core.js";
import { handle } from "./helpers.js";

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

export type PluginOptions = Partial<VuertOptions> & ErrorsHandling;
export const createVuert = (options?: PluginOptions): Plugin =>
{
    return {
        install: ({ config, provide }: App): void =>
        {
            const $vuert = new Vuert(options);

            config.globalProperties.$vuert = $vuert;
            provide(InjectionKeys.$vuert, $vuert);

            if (options?.enableErrorsHandling)
            {
                config.errorHandler = (error: unknown, instance: ComponentPublicInstance | null, info: string) =>
                {
                    handle($vuert, error, (exc) =>
                    {
                        // eslint-disable-next-line no-console
                        console.error(exc);

                        $vuert.emit(options.defaultAlertOptions);
                    });
                };

                window.addEventListener("unhandledrejection", ({ reason }: PromiseRejectionEvent) =>
                {
                    handle($vuert, reason, () => $vuert.emit(options.defaultAlertOptions));
                });
            }
        }
    };
};
export const useVuert = (): Vuert =>
{
    const $vuert = inject(InjectionKeys.$vuert);
    if (!$vuert)
    {
        throw new RuntimeException(
            "`useVuert` was called with no active instance. " +
            "Did you forget to install `Vuert` plugin in your App?"
        );
    }

    return $vuert;
};
