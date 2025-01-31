import type { SimpleAlert } from "./simple.js";
import type { CustomAlert } from "./custom.js";

export type { IAlert } from "./core.js";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AlertCustomOptions { }
export type AlertOptions<R = void, P extends Record<string, unknown> = never> =
    (SimpleAlert<R, P> | CustomAlert<R, P>) & AlertCustomOptions;
