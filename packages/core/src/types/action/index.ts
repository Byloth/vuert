import type { CallbackAction } from "./callback.js";
import type { ValueAction } from "./value.js";

export type { ActionCallback, IAction } from "./core.js";

export type ActionOptions<R = void> = CallbackAction<R> | ValueAction<R>;
