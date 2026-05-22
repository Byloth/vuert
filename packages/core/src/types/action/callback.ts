import type { ActionCallback, CoreAction } from "./core.js";

export interface CallbackAction<R = void> extends CoreAction
{
    callback: ActionCallback<R>;
    value?: never;
}
