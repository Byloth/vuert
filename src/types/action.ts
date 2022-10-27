export interface IAction<R>
{
    id: symbol;
    type: "primary" | "secondary" | "alternative";
    icon?: string;
    label: string;

    callback: () => R | undefined;
}

type PartialAction<R> = Partial<IAction<R>>;
type OmittedAction = Omit<PartialAction<never>, "callback">;

export interface ActionOptions<R = void> extends OmittedAction
{
    label: string;

    callback?: () => R;
}
