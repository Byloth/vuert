import { AlertOptions, AlertListener } from "./types";
import { SimpleAlert, AlertWithResult, AlertWithUncertainResult } from "./types/alerts/simple";
import { CustomAlert, CustomAlertWithResult, CustomAlertWithUncertainResult } from "./types/alerts/custom";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VuertOptions { /* ... */ }

export default class Vuert
{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected _subscribers: AlertListener<any>[];

    public constructor(options?: VuertOptions)
    {
        this._subscribers = [];
    }

    public emit(alert: SimpleAlert): Promise<void>;
    public emit(alert: CustomAlert): Promise<void>;
    public emit<R>(alert: AlertWithResult<R>): Promise<R>;
    public emit<R>(alert: CustomAlertWithResult<R>): Promise<R>;
    public emit<R>(alert: AlertWithUncertainResult<R>): Promise<R | undefined>;
    public emit<R>(alert: CustomAlertWithUncertainResult<R>): Promise<R | undefined>;
    public emit<R = void>(alert: AlertOptions<R>): Promise<R | undefined>
    {
        const subscribers = this._subscribers.slice();
        const results = subscribers.map((subscriber) => subscriber(alert));

        return Promise.any(results.filter((element) => !!(element)));
    }

    public subscribe<R = unknown>(listener: AlertListener<R>): () => AlertListener<R>
    {
        this._subscribers.push(listener);

        return () => this._subscribers.splice(this._subscribers.indexOf(listener), 1)[0];
    }
}
