import type { MaybePromise } from "@byloth/core";

import type { ActionCustomOptions } from "../../custom.js";
import type { DistributiveOmit } from "../../types.js";

export type ActionCallback<T> = () => MaybePromise<T>;

export interface IAction<R = void>
{
    id: symbol;
    type: "primary" | "secondary" | "alternative";
    icon?: string;
    label: string;

    callback: ActionCallback<R | undefined>;
}

interface PartialAction<R> extends Partial<IAction<R>>
{
    label: string;
}

type WithCustomOptions<T> = DistributiveOmit<T, keyof ActionCustomOptions> & ActionCustomOptions;
type CustomizedAction<R> = WithCustomOptions<PartialAction<R>>;

type NotCustomizableProperty = "callback" | "value";
type OmittedAction = Omit<CustomizedAction<never>, NotCustomizableProperty>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CoreAction extends OmittedAction { }
