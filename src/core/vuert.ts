import { inject, App } from "vue";

export default class Vuert<T>
{
    protected _installed: boolean;
    protected _subscribers: Array<(alert: T) => void>;

    public constructor()
    {
        this._installed = false;
        this._subscribers = [];
    }

    public install(app: App, ...options: any[]): void
    {
        if (this._installed)
        {
            throw new Error("This Vuert instance has already been installed!");
        }

        /* ... */

        this._installed = true;
    }
}
