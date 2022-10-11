export interface IAction
{
    id: symbol;
    type: "primary" | "secondary" | "alternative";
    icon?: string;
    label: string;

    callback: () => void;
}
type PartialAction = Partial<IAction>;
type OmittedAction = Omit<PartialAction, "callback">;

export interface ActionOptions<R = void> extends OmittedAction
{
    label: string;

    callback?: () => R;
}
