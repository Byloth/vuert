import type { EnhanceAppContext, Theme } from "vitepress";

import DefaultTheme from "vitepress/theme";
import { createVuert } from "@vuert/functions.js";

import VuertLayout from "./VuertLayout.vue";

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
