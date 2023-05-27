import { HandlerBuilder } from "@byloth/exceptions";
import type { ErrorHandler, HandlerOptions } from "@byloth/exceptions";

import { AlertInterrupt } from "./exceptions.js";

import type Vuert from "./vuert.js";
import type { Awaitable } from "./types/index.js";

export function handle<E = unknown, R = void>
    ($vuert: Vuert, error: E, handler?: ErrorHandler <E, R>, options?: Partial<HandlerOptions>): Awaitable<R | void>
{
    const builder = new HandlerBuilder<never, R>(options)
        .on(AlertInterrupt, (exc) =>
        {
            console.warn(exc);

            return $vuert.emit(exc.options);
        });

    if (handler)
    {
        return builder.default(handler as ErrorHandler<unknown, R>)
            .handle(error);
    }

    return builder.handle(error);
}
