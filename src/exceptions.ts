import { Exception, HandledException } from "@byloth/exceptions";

import type { AlertOptions } from "./index.js";

export class VuertAlertInterrupt<R = void> extends HandledException
{
    protected _options: AlertOptions<R>;
    public get options(): AlertOptions<R>
    {
        return { ...this._options };
    }

    public constructor(options: AlertOptions<R>, cause: Exception, name = "VuertAlertInterrupt")
    {
        super(cause, name);

        this._options = options;
    }
}
