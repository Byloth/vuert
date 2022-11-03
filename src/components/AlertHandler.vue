<template>
    <Component :is="is">
        <slot v-if="context"
              :alert="context.alert"
              :is-open="context.isOpen.value"
              :resolve="context.resolve"
              :reject="context.reject"></slot>
    </Component>
</template>

<script lang="ts" setup>
    /* eslint-disable @typescript-eslint/no-explicit-any */

    import { onMounted, onUnmounted, PropType, shallowRef } from "vue";

    import { useVuert } from "..";
    import { UnattainableException } from "../exceptions";
    import { Alert, Context } from "../models";
    import { PromiseClosures } from "../types";
    import { AlertOptions } from "../types/alert";
    import { delay, update } from "../utils";

    const vuert = useVuert();
    const props = defineProps({
        is: {
            default: "div",
            type: [String, Object]
        },
        duration: {
            default: 200,
            type: [Number, String, Object],

            validator: (value: unknown): boolean =>
            {
                if (value instanceof Object)
                {
                    if (("enter" in value) && ("leave" in value))
                    {
                        return isFinite(Number(value["enter"])) && isFinite(Number(value["leave"]));
                    }

                    return false;
                }

                return isFinite(Number(value));
            }
        },
        filter: {
            default: (options: AlertOptions<unknown>) => true,
            type: Function as PropType<(options: AlertOptions<unknown>) => boolean>
        }
    });

    const emit = defineEmits({
        onOpening: <R>(alert: Alert<R>) => alert instanceof Alert<R>,
        onOpened: <R>(alert: Alert<R>) => alert instanceof Alert<R>,
        onClosing: <R>(alert: Alert<R>) => alert instanceof Alert<R>,
        onClosed: <R>(alert: Alert<R>) => alert instanceof Alert<R>
    });

    const contexts: Context<any>[] = [];
    const context = shallowRef<Context<any>>();

    const register = <R>(options: AlertOptions<R>, { resolve, reject }: PromiseClosures<R>) =>
    {
        contexts.push(new Context(options, { close, resolve, reject }));

        if (contexts.length === 1)
        {
            open(contexts[0]);
        }
    };

    const open = async <R>(ctx: Context<R>): Promise<void> =>
    {
        let enterDuration: number;
        if (props.duration instanceof Object)
        {
            enterDuration = Number(props.duration["enter"]);
        }
        else
        {
            enterDuration = Number(props.duration);
        }

        context.value = ctx;

        ctx.opening();
        emit("onOpening", ctx.alert);

        await delay(enterDuration);

        emit("onOpened", ctx.alert);
        ctx.opened();
    };
    const close = async <R>(ctx: Context<R>): Promise<void> =>
    {
        let leaveDuration: number;
        if (props.duration instanceof Object)
        {
            leaveDuration = Number(props.duration["leave"]);
        }
        else
        {
            leaveDuration = Number(props.duration);
        }

        if (context.value?.alert.id !== ctx.alert.id)
        {
            throw new UnattainableException();
        }

        emit("onClosing", ctx.alert);
        await delay(leaveDuration);
        emit("onClosed", ctx.alert);

        contexts.shift();
        context.value = undefined;

        await update();

        if (contexts.length > 0)
        {
            open(contexts[0]);
        }
    };

    let _unsubscribe: () => void;
    onMounted(() =>
    {
        _unsubscribe = vuert.subscribe(<R>(options: AlertOptions<R>) =>
        {
            if (props.filter(options))
            {
                return new Promise<R>((resolve, reject) => register(options, { resolve, reject }));
            }
        });
    });
    onUnmounted(() => _unsubscribe());
</script>
