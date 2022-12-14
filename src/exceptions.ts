import { Exception } from "@byloth/exceptions";

export class UnattainableException extends Exception
{
    public constructor(message?: string, cause?: unknown, name = "UnattainableException")
    {
        if (message === undefined)
        {
            message = "Something unexpected and unknown has gone terribly wrong! " +
                      "Check your implementation and, if the problem persist," +
                      " report this crash on GitHub as soon as possible.";
        }

        super(message, cause, name);
    }
}
