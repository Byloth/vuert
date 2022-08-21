export interface SimpleAction
{
    id: string;
    type: "primary" | "secondary" | "accent";
    label: string;
}
export interface ActionWithResult<T> extends SimpleAction
{
    result: () => T;
}
