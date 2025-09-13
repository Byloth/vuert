import { defu } from "defu";
import { addComponent, addImports, addPlugin } from "@nuxt/kit";
import { defineNuxtModule, createResolver } from "@nuxt/kit";

import type { VuertOptions } from "@byloth/vuert";
import type { Nuxt } from "nuxt/schema";

// https://nuxt.com/docs/guide/going-further/modules#developing-modules
//
export default defineNuxtModule<Partial<VuertOptions>>({
    defaults: { },
    hooks: { },
    meta: {
        name: "@byloth/nuxt-vuert-module",
        configKey: "vuert",
        compatibility: { nuxt: "^4.0.0" }
    },

    setup: (options: Partial<VuertOptions>, nuxt: Nuxt) =>
    {
        const resolver = createResolver(import.meta.url);
        const runtimeOptions: Partial<VuertOptions> = nuxt.options.runtimeConfig.public.vuert || { };

        nuxt.options.runtimeConfig.public.vuert = defu(runtimeOptions, options);

        addComponent({
            name: "AlertHandler",
            export: "AlertHandler",
            filePath: "@byloth/vuert"
        });

        addImports({
            name: "useVuert",
            as: "useVuert",
            from: "@byloth/vuert"
        });

        addPlugin(resolver.resolve("./runtime/plugin"));
    }
});
