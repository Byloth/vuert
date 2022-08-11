import { Component, defineComponent } from "vue";

type SimpleAction = {
    id: string;
    type: "primary" | "secondary" | "accent";
    label: string;
};
type ActionWithResult<T> = SimpleAction & { result: () => T; };

export type Action<T> = SimpleAction & { result?: () => T; };

type BaseAlert = {
    type: "error" | "warning" | "info" | "success";
    priority?: "high" | "low";
    actions?: SimpleAction[];
    timeout?: number;
    dismissable?: boolean;
};

type SimpleAlert = BaseAlert & {
    icon?: string;
    title?: string;
    message: string;
};

type BlockingAlert = SimpleAlert & { dismissable?: false; timeout?: undefined };
type DismissableAlert = SimpleAlert & ({ dismissable: true; } | { timeout: number });

type AlertWithResult<T> = BlockingAlert & { actions: ActionWithResult<T>[]; };
type AlertWithUncertainResult<T> = DismissableAlert & { actions: ActionWithResult<T>[]; };

type CustomAlert = BaseAlert & { component: Component };

type BlockingCustomAlert = CustomAlert & { dismissable?: false; timeout?: undefined };
type DismissableCustomAlert = CustomAlert & ({ dismissable: true; } | { timeout: number });

type CustomAlertWithResult<T> = BlockingCustomAlert & { actions: ActionWithResult<T>[]; };
type CustomAlertWithUncertainResult<T> = DismissableCustomAlert & { actions: ActionWithResult<T>[]; };

export type Alert<T> = BaseAlert & {
    icon?: string;
    title?: string;
    message?: string;
    component?: Component;
    actions?: Action<T>[];
};

//
// type TypeA<T> = { [K in keyof Alert<T>]: Alert<T>[K] };
//

function $vuert(alert: SimpleAlert): Promise<void>;
function $vuert(alert: CustomAlert): Promise<void>;
function $vuert<T>(alert: AlertWithResult<T>): Promise<T>;
function $vuert<T>(alert: CustomAlertWithResult<T>): Promise<T>;
function $vuert<T>(alert: AlertWithUncertainResult<T>): Promise<T | undefined>;
function $vuert<T>(alert: CustomAlertWithUncertainResult<T>): Promise<T | undefined>;
function $vuert<T = void>(alert: Alert<T>): Promise<T | undefined>
{
    return new Promise((resolve, reject) => setTimeout(resolve, 2500));
}

(async () =>
{
    // Dialog bloccante di avviso.
    //
    await $vuert({
        type: "error",
        priority: "high",
        message: "L'azione eseguita non è valida.",
        actions: [{
            id: "close",
            type: "primary",
            label: "Chiudi"
        }]
    });

    // Dialog bloccante di conferma.
    //
    const b = await $vuert({
        type: "error",
        priority: "high",
        message: "Sei sicuro di voler continuare?",
        actions: [
            {
                id: "confirm",
                type: "primary",
                label: "Continua",

                result: () => true
            },
            {
                id: "cancel",
                type: "secondary",
                label: "Annulla",

                result: () => false
            }
        ]
    });

    // Dialog custom di login.
    //
    await $vuert({
        type: "info",
        priority: "high",
        component: defineComponent({ /* field: <username>, field: <password>, button: <submit> -> result() */ }),
        dismissable: true
    }).then(() =>
    {
        console.log("Login effettuato con successo!");
    });

    // Banner di errore
    //
    $vuert({
        type: "error",
        message: "Si è verificato un errore nel codice Javascript",
        dismissable: true
    });

    // Banner custom di conferma con informazioni
    //
    $vuert({
        type: "info",
        component: defineComponent({ /* "Questo sito usa i cookie! Clicka qui per saperne di più!" */ }),
        actions: [
            {
                id: "confirm",
                type: "primary",
                label: "Continua",

                result: () => true
            },
            {
                id: "cancel",
                type: "secondary",
                label: "Annulla",

                result: () => false
            }
        ]
    }).then((result) =>
    {
        if (result)
        {
            console.log("Cookie accettati!");
        }
        else
        {
            console.log("Cookie rifiutati!");
        }
    });

    // Snackbar di notifica
    //
    $vuert({
        type: "success",
        priority: "low",
        message: "Login effettuato con successo",
        timeout: 2500
    });

})();
