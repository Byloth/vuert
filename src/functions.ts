import { inject, App, Plugin } from "vue";

import { injectionKeys } from "./core";
import { ConfigurationException } from "./exceptions";
import Vuert, { VuertOptions } from "./vuert";

export const createVuert = (options: VuertOptions): Plugin =>
{
    return {
        install: (app: App): void =>
        {
            const $vuert = new Vuert(options);

            app.config.globalProperties.$vuert = $vuert;
            app.provide(injectionKeys.vuert, $vuert);
        }
    };
};

export const useVuert = (): Vuert =>
{
    const $vuert = inject(injectionKeys.vuert);
    if (!$vuert)
    {
        throw new ConfigurationException(
            "`useVuert` was called with no active instance. " +
            "Did you forget to install `Vuert` plugin in your App?"
        );
    }

    return $vuert;
};
