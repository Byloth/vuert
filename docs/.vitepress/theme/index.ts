import { EnhanceAppContext, Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import { createVuert } from "@core/index";

const VuertTheme: Theme = {
    ...DefaultTheme,

    enhanceApp: (context: EnhanceAppContext): void =>
    {
        const vuert = createVuert({ });

        context.app.use(vuert);
    }
};

export default VuertTheme;
