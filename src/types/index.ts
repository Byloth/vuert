import { AlertOptions } from "./alert";

export type AlertHandler<R = void> = (alert: AlertOptions<R>) => Promise<R> | undefined;

export type MaybePromise<T> = T | PromiseLike<T>;

export type PromiseResolver<T = void> = (result?: MaybePromise<T | undefined>) => void;
export type PromiseRejecter = (reason: Error) => void;

export type PromiseClosures<T = void> = { resolve: PromiseResolver<T>, reject: PromiseRejecter };
