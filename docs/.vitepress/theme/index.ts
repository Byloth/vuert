import type { EnhanceAppContext, Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import { createVuert } from "@src/functions.js";

import VuertLayout from "./layouts/VuertLayout.vue";

const VuertTheme: Theme = {
    ...DefaultTheme,

    Layout: VuertLayout,
    enhanceApp: (ctx: EnhanceAppContext): void =>
    {
        const vuert = createVuert({ });

        ctx.app.use(vuert);
    }
};

export default VuertTheme;
