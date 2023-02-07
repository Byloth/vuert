import AlertHandler from "./components/AlertHandler.vue";
import Vuert from "./vuert.js";

export { createVuert, useVuert } from "./functions.js";
export { Action, Alert, Context } from "./models/index.js";

export type { VuertOptions } from "./vuert.js";

export type { IAction, ActionCallback, ActionOptions } from "./types/action.js";
export type { IAlert, AlertOptions, AlertSubscriber } from "./types/alert/index.js";
export type { SimpleAlert, BlockingAlert, DismissibleAlert } from "./types/alert/simple.js";
export type { CustomAlert, BlockingCustomAlert, DismissibleCustomAlert } from "./types/alert/custom.js";

export default Vuert;

export { AlertHandler };

declare module "vue"
{
    interface ComponentCustomProperties
    {
        $vuert: Vuert;
    }
}
