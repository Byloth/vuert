import { Action } from "../actions";

export interface CoreAlert
{
    id: symbol;
    type: "info" | "success" | "warning" | "error" | "question";
    priority: "high" | "normal" | "low";
    icon?: string;
    title?: string;
    actions: Action[];
    dismissible: boolean;
    timeout: number;
}
