import type { Awaitable } from "vitepress";

export type PromiseResolver<T = void> = (result: Awaitable<T>) => Awaitable<void>;
export type PromiseRejecter = (error: Error) => void;

export type PromiseClosures<T = void> = { resolve: PromiseResolver<T>, reject: PromiseRejecter };
