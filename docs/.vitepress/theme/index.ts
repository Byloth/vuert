import { EnhanceAppContext, Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import { createVuert } from "@core/index";

import VuertLayout from "./VuertLayout.vue";

const VuertTheme: Theme = {
    ...DefaultTheme,

    Layout: VuertLayout,

    enhanceApp: (context: EnhanceAppContext): void =>
    {
        const vuert = createVuert({ });

        context.app.use(vuert);
    }
};

export default VuertTheme;
