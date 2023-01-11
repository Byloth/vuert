import { inject } from "vue";
import type { App, Plugin } from "vue";

import { RuntimeException } from "@byloth/exceptions";

import { InjectionKeys } from "./core/index.js";

import Vuert from "./vuert.js";
import type { VuertOptions } from "./vuert.js";

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
        throw new RuntimeException(
            "`useVuert` was called with no active instance. " +
            "Did you forget to install `Vuert` plugin in your App?"
        );
    }

    return $vuert;
};
