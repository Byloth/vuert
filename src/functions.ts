import { inject, App, Plugin } from "vue";

import { InjectionKeys } from "./core";
import { InstanceException } from "./exceptions";
import Vuert, { VuertOptions } from "./vuert";

export const createVuert = (options?: Partial<VuertOptions>): Plugin =>
{
    return {
        install: (app: App): void =>
        {
            const $vuert = new Vuert(options);

            app.config.globalProperties.$vuert = $vuert;
            app.provide(InjectionKeys.$vuert, $vuert);
        }
    };
};

export const useVuert = (): Vuert =>
{
    const $vuert = inject(InjectionKeys.$vuert);
    if (!$vuert)
    {
        throw new InstanceException(
            "`useVuert` was called with no active instance. " +
            "Did you forget to install `Vuert` plugin in your App?"
        );
    }

    return $vuert;
};
