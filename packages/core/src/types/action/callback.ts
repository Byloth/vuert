import type { ActionCallback, CoreAction } from "./core";

export interface CallbackAction<R = void> extends CoreAction
{
    callback: ActionCallback<R>;
    value?: never;
}
