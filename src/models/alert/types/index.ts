import { SimpleAlert } from "@vuert/models/alert/types/simple";
import { CustomAlert } from "@vuert/models/alert/types/custom";

export type { IAlert } from "./core";

export type AlertOptions<R = void> = SimpleAlert<R> | CustomAlert<R>;
