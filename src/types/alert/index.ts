import type { SimpleAlert } from "./simple";
import type { CustomAlert } from "./custom";

export type { IAlert } from "./core";

export type AlertOptions<R = void> = SimpleAlert<R> | CustomAlert<R>;
export type AlertSubscriber<R = void> = (alert: AlertOptions<R>) => Promise<R> | undefined;
