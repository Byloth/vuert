import type { CoreAction } from "./core.js";

export interface ValueAction<R = void> extends CoreAction
{
    callback?: never;
    value?: R;
}
