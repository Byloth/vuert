<template>
    <Component :is="is">
        <slot :alert="alert">
        </slot>
    </Component>
</template>

<script lang="ts" setup>
    import { computed, nextTick, onMounted, onUnmounted } from "vue";

    import { useVuert } from "../index";

    import Alert from "../models/alert";

    import { UnattainableException } from "../exceptions";
    import { AlertOptions } from "../models/alert/types";

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
    const alert = computed((): Alert<unknown> | undefined => (alerts.length > 0) ? alerts[0] : undefined);

    let _openedTimeout: number | undefined;
    let _closedTimeout: number | undefined;

    const open = () =>
    {
        emit("onOpening");

        _openedTimeout = setTimeout(() =>
        {
            if (alert.value === undefined)
            {
                throw new UnattainableException();
            }

            alert.value.open();

            emit("onOpened");

            _openedTimeout = undefined;
        }, props.duration);
    };
    const close = () =>
    {
        emit("onClosing");

        _closedTimeout = setTimeout(() =>
        {
            alerts.shift();

            nextTick(() =>
            {
                if (alert.value)
                {
                    open();
                }
            });

            emit("onClosed");

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
                        open();
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
