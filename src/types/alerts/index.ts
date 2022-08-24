import { Component } from "vue";

import { SimpleAction } from "../actions";

export interface Alert
{
    // FIXME: Questa interfaccia è ridondante!
    //
    type: "error" | "warning" | "info" | "success";
    priority?: "high" | "low";
    icon?: string;
    title?: string;
    actions?: SimpleAction[];
    timeout?: number;
    dismissable?: boolean;
}

export interface SimpleAlert extends Alert
{
    message: string;
}
export interface CustomAlert extends Alert
{
    component: Component
}
