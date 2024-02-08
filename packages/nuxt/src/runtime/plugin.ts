import { defineNuxtPlugin } from "#app";

import { createVuert, useVuert } from "@byloth/vuert";
import type { VuertOptions } from "@byloth/vuert";

// https://nuxt.com/docs/guide/directory-structure/plugins#creating-plugins
//
export default defineNuxtPlugin({
    name: "vuert",
    setup: (nuxtApp) =>
    {
        const options: Partial<VuertOptions> = nuxtApp.$config.public.vuert || { };

        // SMELLS: Remove `as any` when Nuxt.js will be properly typed.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nuxtApp.vueApp.use(createVuert(options) as any);

        return { provide: { vuert: useVuert() } };
    }
});
