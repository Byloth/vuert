<template>
    <Component :is="is">
        <slot :alert="alert?.properties"
              :close="close"
              :is-open="isOpen">
        </slot>
    </Component>
</template>

<script lang="ts" setup>
    import { computed, onMounted, onUnmounted, provide, reactive, ref } from "vue";

    import { useVuert } from "../index";
    import { injectionKeys } from "../core";
    import { RuntimeException, ValueException } from "../exceptions";
    import { Alert, PromiseResolver } from "../types";

    interface AlertWrapper<T>
    {
        properties: Alert<T>;
        resolver: PromiseResolver<T>;
    }

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
            default: (alert: Alert<unknown>) => true,
            type: Function
        }
    });

    const emit = defineEmits([
        "onOpening",
        "onOpened",
        "onClosing",
        "onClosed"
    ]);

    const isOpen = ref(false);

    const alerts = reactive<AlertWrapper<unknown>[]>([]);
    const alert = computed<AlertWrapper<unknown> | undefined>(() => alerts[0]);

    let openedTimeout: number;
    let closingTimeout: number;
    let closedTimeout: number;

    const open = () =>
    {
        if (isOpen.value)
        {
            throw new RuntimeException(
                "The `AlertHandler` component is already showing an alert. " +
                    "You can only open a single alert at a time."
            );
        }

        isOpen.value = true;
        openedTimeout = setTimeout(() =>
        {
            const timeout = alert.value!.properties.timeout;
            if (timeout !== undefined)
            {
                if (timeout < 1)
                {
                    throw new ValueException("Alert `timeout` value must be greater than 0 or -at least- `undefined`.");
                }

                closingTimeout = setTimeout(close, timeout);
            }

            emit("onOpened");

        }, props.duration);

        emit("onOpening");
    };
    const close = (result?: unknown) =>
    {
        if (!isOpen.value)
        {
            throw new RuntimeException(
                "The `AlertHandler` component isn't showing any alerts. " +
                    "You can't close any further alerts."
            );
        }

        if (closingTimeout)
        {
            clearTimeout(closingTimeout);
        }

        isOpen.value = false;
        emit("onClosing");

        return new Promise<void>((resolve, reject) =>
        {
            closedTimeout = setTimeout(() =>
            {
                const resolver = alert.value!.resolver;

                alerts.shift();

                if (alerts.length > 0)
                {
                    open();
                }

                emit("onClosed");
                resolver(result);
                resolve();

            }, props.duration);
        });
    };

    let unsubscribe: () => void;

    onMounted(() =>
    {
        unsubscribe = vuert.subscribe((alert: Alert<unknown>) =>
        {
            if (props.filter(alert))
            {
                return new Promise((resolve, reject) =>
                {
                    // FIXME: Istanziare un nuovo oggetto `alert` con tutte le proprietà del caso.
                    //
                    alerts.push({ properties: alert, resolver: resolve });

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
        }
        if (closingTimeout)
        {
            clearTimeout(closingTimeout);
        }
        if (closedTimeout)
        {
            clearTimeout(closedTimeout);
        }
    });

    provide(injectionKeys.close, close);
</script>
