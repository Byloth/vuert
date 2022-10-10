import { Exception } from "@byloth/exceptions";

export class ImplementationException extends Exception
{
    public constructor(message?: string, cause?: unknown, name = "ImplementationException")
    {
        super(message, cause, name);
    }
}
export class UnattainableException extends ImplementationException
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

export class InvalidOperationException extends Exception
{
    public constructor(message?: string, cause?: unknown, name = "InvalidOperationException")
    {
        super(message, cause, name);
    }
}
export class RuntimeException extends Exception
{
    public constructor(message?: string, cause?: unknown, name = "RuntimeException")
    {
        super(message, cause, name);
    }
}
export class ValueException extends Exception
{
    public constructor(message?: string, cause?: unknown, name = "ValueException")
    {
        super(message, cause, name);
    }
}
