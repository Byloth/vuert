import { Exception, HandledException } from "@byloth/exceptions";

import type { AlertOptions } from "./index.js";

export class AlertInterrupt<R = void> extends HandledException
{
    protected _options: AlertOptions<R>;
    public get options(): AlertOptions<R>
    {
        return { ...this._options };
    }

    public constructor(cause: Exception, options: AlertOptions<R>, message?: string, name = "AlertInterrupt")
    {
        if (message === undefined)
        {
            message = "The original exception has already been handled while an alert was emitted.";
        }

        super(cause, message, name);

        this._options = options;
    }
}
