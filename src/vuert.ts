import { Alert, AlertListener } from "./types";
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
    public emit<T>(alert: AlertWithResult<T>): Promise<T>;
    public emit<T>(alert: CustomAlertWithResult<T>): Promise<T>;
    public emit<T>(alert: AlertWithUncertainResult<T>): Promise<T | undefined>;
    public emit<T>(alert: CustomAlertWithUncertainResult<T>): Promise<T | undefined>;
    public emit<T = void>(alert: Alert<T>): Promise<T | undefined>
    {
        const subscribers = this._subscribers.slice();
        const results = subscribers.map((subscriber) => subscriber(alert));

        return Promise.any(results.filter((element) => !!(element)));
    }

    public subscribe<T = unknown>(listener: AlertListener<T>): () => AlertListener<T>
    {
        this._subscribers.push(listener);

        return () => this._subscribers.splice(this._subscribers.indexOf(listener), 1)[0];
    }
}
