import type { SimpleAlert } from "./simple.js";
import type { CustomAlert } from "./custom.js";

export type { IAlert } from "./core.js";

export interface AlertCustomOptions { }
export type AlertOptions<R = void, P extends Record<string, unknown> = never> =
    (SimpleAlert<R, P> | CustomAlert<R, P>) & AlertCustomOptions;
