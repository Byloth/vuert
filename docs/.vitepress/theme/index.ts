import { EnhanceAppContext, Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import { createVuert } from "@/index";

const VuertTheme: Theme = {
    ...DefaultTheme,

    enhanceApp(context: EnhanceAppContext)
    {
        const vuert = createVuert({ });

        context.app.use(vuert);
    }
};

export default VuertTheme;
