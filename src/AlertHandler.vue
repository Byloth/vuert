<template>
    <Component :is="is">
        <slot :close="close" :alert="alert"></slot>
    </Component>
</template>

<script lang="ts" setup>
    import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
    import { useAlert, useSubscribe } from ".";

    const _alert = useAlert();
    const _subscribe = useSubscribe();

    const props = defineProps({
        is: {
            default: "div",
            type: [String, Object]
        },
        filter: {
            default: (alert: unknown) => true,  // () => (alert: unknown) => true
            type: [Function]
        }
    });

    const emit = defineEmits([
        "onOpening",
        "onOpened",
        "onClosing",
        "onClosed"
    ]);

    const isOpen = ref(false);

    const alerts = reactive<unknown[]>([]);
    const alert = computed(() => alerts[0]);

    let openedTimeout: number;
    let closingTimeout: number;
    let closedTimeout: number;

    const open = () =>
    {
        emit("onOpening");
        isOpen.value = true;

        openedTimeout = setTimeout(() =>
        {
            emit("onOpened");
            closingTimeout = setTimeout(close, 2500);

        }, 250);

    };
    const close = () =>
    {
        if (closingTimeout)
        {
            clearTimeout(closingTimeout);
        }

        emit("onClosing");
        isOpen.value = false;

        return new Promise<void>((resolve, reject) =>
        {
            closedTimeout = setTimeout(() =>
            {
                alerts.shift();

                if (alerts.length > 0)
                {
                    open();
                }

                emit("onClosed");
                resolve();

            }, 250);
        });
    };

    let unsubscribe = (): void => undefined;

    onMounted(() =>
    {
        unsubscribe = _subscribe((alert: unknown) =>
        {
            if (props.filter(alert))
            {
                alerts.push(alert);

                if (alerts.length === 1)
                {
                    open();
                }
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
</script>
