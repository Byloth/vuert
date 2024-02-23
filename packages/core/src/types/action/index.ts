import type { CallbackAction } from "./callback";
import type { ValueAction } from "./value";

export type { ActionCallback, IAction } from "./core";

export type ActionOptions<R = void> = CallbackAction<R> | ValueAction<R>;
