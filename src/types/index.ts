import { AlertOptions } from "../models/alert/types";

export type AlertListener<R = void> = (alert: AlertOptions<R>) => Promise<R> | undefined;

export type MaybePromise<T> = T | PromiseLike<T>;
export type PromiseResolver<T = void> = (result?: MaybePromise<T>) => void;
export type PromiseRejecter = (reason: Error) => void;
