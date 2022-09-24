import { SimpleAction } from "../actions";

export interface CoreAlert
{
    // TODO: È corretto rendere obbligatorio il tipo?
    //       Non potrebbe essere opzionale, in alcuni casi?
    //
    type: "error" | "warning" | "info" | "success";
    priority?: "high" | "low";
    icon?: string;
    title?: string;
    actions?: SimpleAction[];
    timeout?: number;
    dismissable?: boolean;
}
