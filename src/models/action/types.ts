export interface IAction<R = void>
{
    id: symbol;
    type: "primary" | "secondary" | "alternative";
    icon?: string;
    label: string;

    callback: () => R | undefined;
}
type PartialAction<R> = Partial<IAction<R>>;
type OmittedAction<R> = Omit<PartialAction<R>, "callback">;

export interface ActionOptions<R = void> extends OmittedAction<R>
{
    label: string;

    callback?: () => R;
}
