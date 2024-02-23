import AlertHandler from "./components/AlertHandler.vue";
import Vuert from "./vuert.js";

export { createVuert, useVuert } from "./functions.js";
export { AlertThrottledException } from "./exceptions.js";
export { Action, Alert, Context } from "./models/index.js";

export type { VuertOptions, VuertSubscriber } from "./vuert.js";

export type { IAction, ActionCallback, ActionOptions } from "./types/action/index.js";
export type { CallbackAction } from "./types/action/callback.js";
export type { ValueAction } from "./types/action/value.js";

export type { IAlert, AlertOptions } from "./types/alert/index.js";
export type { SimpleAlert, BlockingAlert, DismissibleAlert } from "./types/alert/simple.js";
export type { CustomAlert, BlockingCustomAlert, DismissibleCustomAlert } from "./types/alert/custom.js";
export type { PluginOptions } from "./functions.js";

export default Vuert;

export { AlertHandler };

declare module "vue"
{
    interface ComponentCustomProperties
    {
        $vuert: Vuert;
    }
}
