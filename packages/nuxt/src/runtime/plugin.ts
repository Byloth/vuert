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

        nuxtApp.vueApp.use(createVuert(options));

        return { provide: { vuert: useVuert() } };
    }
});
