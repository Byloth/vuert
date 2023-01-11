export type Awaitable<T> = T | PromiseLike<T>;

export type PromiseResolver<T = void> = (result: Awaitable<T>) => void;
export type PromiseRejecter = (error: Error) => void;

export type PromiseClosures<T = void> = { resolve: PromiseResolver<T>, reject: PromiseRejecter };
