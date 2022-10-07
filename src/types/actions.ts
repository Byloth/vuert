export interface Action
{
    id: symbol;
    type: "primary" | "secondary" | "accent";
    icon?: string;
    label: string;
}
export interface ActionWithResult<R> extends Action
{
    callback: () => R;
}
