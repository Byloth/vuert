export interface IAction<R = void>
{
    id: symbol;
    type: "primary" | "secondary" | "alternative";
    icon?: string;
    label: string;

    callback: () => R | undefined;
}
type PartialAction<R> = Omit<Partial<IAction<R>>, "callback">;

export interface ActionOptions<R> extends PartialAction<R>
{
    label: string;

    callback?: () => R;
}
