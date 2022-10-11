import { SimpleAlert } from "./simple";
import { CustomAlert } from "./custom";

export type { IAlert } from "./core";

export type AlertOptions<R = void> = SimpleAlert<R> | CustomAlert<R>;
