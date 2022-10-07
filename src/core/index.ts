import { InjectionKey } from "vue";

import Vuert from "../vuert";

export const InjectionKeys = { $vuert: Symbol("[vuert]: vuert") as InjectionKey<Vuert> };
