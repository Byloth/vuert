import { Component } from "vue";

import { Props } from "@core/core/types";

import { IAlert, AlertOptions, SimpleAlertOptions, CustomAlertOptions } from "./types";
import Action from "../action";
import AlertHandlerVue from "@core/components/AlertHandler.vue";

export default class Alert<R = void> implements IAlert<R>
{
    public id: symbol;

    public type: "info" | "success" | "warning" | "error" | "question";
    public priority: "high" | "normal" | "low";

    public icon?: string;
    public title?: string;

    public message?: string;

    public component?: Component;
    public props?: Props;

    public actions: Action<R>[];

    public dismissible: boolean;
    public timeout: number;

    public constructor(options: SimpleAlertOptions<R>);
    public constructor(options: CustomAlertOptions<R>);
    public constructor(options: AlertOptions<R>)
    {
        this.id = (options.id !== undefined) ? options.id : Symbol();

        this.type = (options.type !== undefined) ? options.type : "info";
        this.priority = (options.priority !== undefined) ? options.priority : "normal";

        this.icon = options.icon;
        this.title = options.title;

        this.message = options.message;

        this.component = options.component;
        this.props = options.props;

        this.actions = (options.actions !== undefined) ? options.actions.map((a) => new Action(a)) : [];

        this.dismissible = (options.dismissible || false);
        this.timeout = (options.timeout !== undefined) ? options.timeout : 0;
    }
}

const myAlert = new Alert({
    // message: "",
    actions: [{ label: "Ok" }],
    component: AlertHandlerVue,
    props: {
        is: "div"
    }
});
