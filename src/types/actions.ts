export interface SimpleAction
{
    id: string;
    type: "primary" | "secondary" | "accent";
    label: string;

    // TODO: Aggiungere il tipo `icon` anche qui? 🤔
}
export interface ActionWithResult<T> extends SimpleAction
{
    result: () => T;
}
