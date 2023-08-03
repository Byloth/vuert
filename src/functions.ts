import { inject, getCurrentScope } from "vue";
import type { App, Plugin } from "vue";

import { RuntimeException } from "@byloth/exceptions";

import { InjectionKeys } from "./core";

import Vuert from "./vuert";
import type { VuertOptions } from "./vuert";

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

export type PluginOptions = Partial<VuertOptions>;
export const createVuert = (options?: PluginOptions): Plugin =>
{
    return {
        install: ({ config, provide }: App): void =>
        {
            const $vuert = new Vuert(options);

            _setActiveVuert($vuert);

            config.globalProperties.$vuert = $vuert;
            provide(InjectionKeys.$vuert, $vuert);
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
