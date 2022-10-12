<template>
    <Component :is="is">
        <slot :alert="alert"></slot>
    </Component>
</template>

<script lang="ts" setup>
    import { nextTick, onMounted, onUnmounted, ref } from "vue";

    import { handle } from "@byloth/exceptions";

    import { useVuert } from "..";
    import { UnattainableException, ValueException } from "../exceptions";
    import { AlertOptions } from "../types/alert";

    import Alert from "../models/alert";

    const vuert = useVuert();
    const props = defineProps({
        is: {
            default: "div",
            type: [String, Object]
        },
        duration: {
            default: 200,
            type: Number
        },
        filter: {
            default: (_alert: AlertOptions<unknown>) => true,
            type: Function
        }
    });

    const emit = defineEmits([
        "onOpening",
        "onOpened",
        "onClosing",
        "onClosed"
    ]);

    const alerts: Alert<unknown>[] = [];
    const alert = ref<Alert<unknown>>();

    let _openedTimeout: number | undefined;
    let _closedTimeout: number | undefined;

    const open = (_alert: Alert<unknown>): void =>
    {
        alert.value = _alert;
        alert.value.open();

        emit("onOpening");

        _openedTimeout = setTimeout(() =>
        {
            emit("onOpened");

            try
            {
                _alert.setTimeout();
            }
            catch (error)
            {
                // TODO: Aggiungere alla libreria `@byloth/exceptions` il metodo `ignore`.
                //
                handle(error)
                    .on(ValueException)
                    .do(() => { /* ... */ })
                    .end();
            }

            _openedTimeout = undefined;
        }, props.duration);
    };
    const close = (_alert: Alert<unknown>): void =>
    {
        if (alert.value !== _alert)
        {
            throw new UnattainableException();
        }

        emit("onClosing");

        _closedTimeout = setTimeout(() =>
        {
            alerts.shift();
            alert.value = undefined;

            emit("onClosed");
            nextTick(() =>
            {
                if (alerts.length > 0)
                {
                    open(alerts[0]);
                }
            });

            _closedTimeout = undefined;
        }, props.duration);
    };

    let _unsubscribe: () => void;
    onMounted(() =>
    {
        _unsubscribe = vuert.subscribe((options: AlertOptions<unknown>) =>
        {
            if (props.filter(options))
            {
                return new Promise<unknown>((resolve, reject) =>
                {
                    alerts.push(new Alert<unknown>(options, { close, resolve, reject }));
                    if (alerts.length === 1)
                    {
                        open(alerts[0]);
                    }
                });
            }
        });
    });
    onUnmounted(() =>
    {
        _unsubscribe();

        if (_openedTimeout !== undefined)
        {
            clearTimeout(_openedTimeout);
            _openedTimeout = undefined;
        }
        if (_closedTimeout !== undefined)
        {
            clearTimeout(_closedTimeout);
            _closedTimeout = undefined;
        }
    });
</script>
