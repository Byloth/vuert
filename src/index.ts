import AlertHandler from "./components/AlertHandler.vue";
import Vuert from "./vuert";

export { createVuert, useVuert } from "./functions";
export { Action, Alert, Context } from "./models";

export type { VuertOptions } from "./vuert";

export type { IAction, ActionCallback, ActionOptions } from "./types/action";
export type { IAlert, AlertOptions, AlertSubscriber } from "./types/alert";
export type { SimpleAlert, BlockingAlert, DismissibleAlert } from "./types/alert/simple";
export type { CustomAlert, BlockingCustomAlert, DismissibleCustomAlert } from "./types/alert/custom";

export default Vuert;

export { AlertHandler };
