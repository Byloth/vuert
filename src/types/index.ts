import { AlertOptions } from "../models/alert/types";

export type AlertListener<R = void> = (alert: AlertOptions<R>) => Promise<R> | undefined;

export type MaybePromise<T> = T | PromiseLike<T>;
export type PromiseResolver<R = void> = (result: MaybePromise<R>) => void;
