import { Exception } from "@byloth/exceptions";

export class InstanceException extends Exception
{
    public constructor(message?: string, cause?: unknown, name = "InstanceException")
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
