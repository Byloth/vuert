import { AlertOptions } from "./alert";

export type AlertListener<R = void> = (alert: AlertOptions<R>) => Promise<R> | undefined;

export type MaybePromise<T> = T | PromiseLike<T>;
export type PromiseResolver<T = void> = (result?: MaybePromise<T>) => void;
export type PromiseRejecter = (reason: Error) => void;

export type Props = Record<string, unknown>;
