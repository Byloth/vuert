import type { CoreAction } from "./core";

export interface ValueAction<R = void> extends CoreAction
{
    callback?: never;
    value?: R;
}
