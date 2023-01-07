import type { SimpleAlert } from "./simple.js";
import type { CustomAlert } from "./custom.js";

export type { IAlert } from "./core.js";

export type AlertOptions<R = void> = SimpleAlert<R> | CustomAlert<R>;
export type AlertSubscriber<R = void> = (alert: AlertOptions<R>) => Promise<R> | undefined;
