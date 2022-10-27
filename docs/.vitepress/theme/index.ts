import { EnhanceAppContext, Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import { createVuert } from "@vuert/index";

import VuertLayout from "./VuertLayout.vue";

const VuertTheme: Theme = {
    ...DefaultTheme,

    Layout: VuertLayout,

    enhanceApp: (cxt: EnhanceAppContext): void =>
    {
        const vuert = createVuert({ });

        cxt.app.use(vuert);
    }
};

export default VuertTheme;
