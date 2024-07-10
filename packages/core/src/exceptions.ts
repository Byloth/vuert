import { RuntimeException } from "@byloth/core";

import type { AlertOptions } from "./types/alert/index.js";

export class AlertThrottledException<R, T extends AlertOptions<R>> extends RuntimeException
{
    public readonly alert: T;

    public constructor(alert: T, message?: string, cause?: unknown, name = "AlertThrottledException")
    {
        if (message === undefined)
        {
            message = "The alert has been throttled to prevent spamming the user with too many alerts.";
        }

        super(message, cause, name);

        this.alert = alert;
    }
}
