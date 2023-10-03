import type { InjectionKey } from "vue";

import type Vuert from "./vuert.js";

export const InjectionKeys = { $vuert: Symbol("[vuert]: vuert") as InjectionKey<Vuert> };
