<template>
    <Component :is="is">
        <slot :alert="alert">
        </slot>
    </Component>
</template>

<script lang="ts" setup>
    import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from "vue";

    import { useVuert } from "../index";
    import { RuntimeException, UnattainableException, ValueException } from "../exceptions";
    import Alert from "../models/alert";
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
            default: (alert: AlertOptions<unknown>) => true,
            type: Function
        }
    });

    const emit = defineEmits([
        "onOpening",
        "onOpened",
        "onClosing",
        "onClosed"
    ]);

    const alerts = reactive<Alert<unknown>[]>([]);
    const alert = computed((): Alert<unknown> | undefined => (alerts.length > 0) ? alerts[0] : undefined);

    let openedTimeout: number | undefined;
    let closingTimeout: number | undefined;
    let closedTimeout: number | undefined;

    const open = () =>
    {
        openedTimeout = setTimeout(() =>
        {
            const _alert = alert.value;
            if (_alert === undefined)
            {
                throw new UnattainableException();
            }

            const timeout = _alert.timeout;
            if (timeout !== undefined)
            {
                closingTimeout = setTimeout(() =>
                {
                    close();

                    closingTimeout = undefined;
                }, timeout);
            }

            _alert.open();
            emit("onOpened");

            openedTimeout = undefined;
        }, props.duration);

        emit("onOpening");
    };
    const close = (result?: unknown) =>
    {
        if (closingTimeout)
        {
            clearTimeout(closingTimeout);

            closingTimeout = undefined;
        }

        emit("onClosing");

        return new Promise<void>((resolve, reject) =>
        {
            closedTimeout = setTimeout(() =>
            {
                const _alert = alert.value!;

                alerts.shift();

                nextTick(() =>
                {
                    if (alert.value)
                    {
                        open();
                    }
                });

                emit("onClosed");

                _alert.close(result);
                resolve();

                closedTimeout = undefined;
            }, props.duration);
        });
    };

    let unsubscribe: () => void;

    onMounted(() =>
    {
        unsubscribe = vuert.subscribe(<T>(options: AlertOptions<T>) =>
        {
            if (props.filter(options))
            {
                return new Promise<T>((resolve, reject) =>
                {
                    const _alert = new Alert<T>(options);

                    _alert.close = resolve;

                    alerts.push(_alert);

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
        unsubscribe();

        if (openedTimeout)
        {
            clearTimeout(openedTimeout);

            openedTimeout = undefined;
        }
        if (closingTimeout)
        {
            clearTimeout(closingTimeout);

            closingTimeout = undefined;
        }
        if (closedTimeout)
        {
            clearTimeout(closedTimeout);

            closedTimeout = undefined;
        }
    });
</script>
