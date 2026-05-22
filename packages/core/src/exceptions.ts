import { RuntimeException } from "@byloth/core";

import type { AlertOptions } from "./types/alert/index.js";

export class AlertThrottledException<R = void, P extends Record<string, unknown> = never> extends RuntimeException
{
    public readonly alert: AlertOptions<R, P>;

    public constructor(
        alert: AlertOptions<R, P>,
        message?: string,
        cause?: unknown,
        name = "AlertThrottledException"
    )
    {
        if (message === undefined)
        {
            message = "The alert has been throttled to prevent spamming the user with too many alerts.";
        }

        super(message, cause, name);

        this.alert = alert;
    }
}
