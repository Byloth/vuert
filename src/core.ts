import { InjectionKey } from "vue";

import Vuert from "./vuert";

export const injectionKeys = {
    close: Symbol("[vuert:AlertHandler]: close") as InjectionKey<() => Promise<void>>,
    vuert: Symbol("[vuert]: vuert") as InjectionKey<Vuert>
};
