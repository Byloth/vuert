import { SimpleAction } from "../actions";

export interface CoreAlert
{
    type: "error" | "warning" | "info" | "success";
    priority?: "high" | "low";
    icon?: string;
    title?: string;
    actions?: SimpleAction[];
    timeout?: number;
    dismissable?: boolean;
}
