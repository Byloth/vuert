import { Component } from "vue";

import { SimpleAction } from "../actions";

export interface Alert
{
    type: "error" | "warning" | "info" | "success";
    priority?: "high" | "low";
    actions?: SimpleAction[];
    timeout?: number;
    dismissable?: boolean;
}

export interface SimpleAlert extends Alert
{
    icon?: string;
    title?: string;
    message: string;
}
export interface CustomAlert extends Alert
{
    component: Component
}
