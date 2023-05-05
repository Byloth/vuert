import { HandlerBuilder } from "@byloth/exceptions";
import type { ErrorHandler, HandlerOptions } from "@byloth/exceptions";

import { VuertAlertInterrupt } from "./exceptions.js";
import { useVuert } from "./functions.js";
import type { Awaitable } from "./types/index.js";

const $vuert = useVuert();

export function handle<E = unknown, R = void>
    (error: E, handler?: ErrorHandler <E, R>, options?: Partial<HandlerOptions>): Awaitable<R | void>
{
    const builder = new HandlerBuilder<never, R>(options)
        .on(VuertAlertInterrupt, (exc) => $vuert.emit(exc.options));

    if (handler)
    {
        return builder.default(handler as ErrorHandler<unknown, R>)
            .handle(error);
    }

    return builder.handle(error);
}
