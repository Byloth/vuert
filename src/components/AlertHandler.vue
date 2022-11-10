<template>
    <Component :is="is">
        <slot v-if="context"
              :alert="context.alert"
              :is-open="context.isOpen.value"
              :resolve="context.resolver"
              :reject="context.rejecter"></slot>
    </Component>
</template>

<script lang="ts" setup>
    /* eslint-disable @typescript-eslint/no-explicit-any */

    import { onMounted, onUnmounted, shallowRef } from "vue";
    import type { PropType } from "vue";

    import { useVuert } from "../functions";
    import { Alert, Context } from "../models";
    import { delay, update } from "../utils";

    import type { MaybePromise, PromiseClosures } from "../types";
    import type { AlertOptions } from "../types/alert";

    const vuert = useVuert();
    const props = defineProps({
        is: {
            default: "div",
            type: [String, Object]
        },
        duration: {
            default: () => useVuert().options.duration,
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
        const ctx = new Context(options, {
            resolve: async (result: MaybePromise<R>) =>
            {
                await close();

                resolve(result);
            },
            reject: async (error: Error) =>
            {
                await close();

                reject(error);
            }
        });

        contexts.push(ctx);
        if (contexts.length === 1)
        {
            open();
        }
    };

    const open = async (): Promise<void> =>
    {
        const ctx = contexts[0];

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
    const close = async (): Promise<void> =>
    {
        const ctx = contexts[0];

        let leaveDuration: number;
        if (props.duration instanceof Object)
        {
            leaveDuration = Number(props.duration["leave"]);
        }
        else
        {
            leaveDuration = Number(props.duration);
        }

        emit("onClosing", ctx.alert);
        await delay(leaveDuration);
        emit("onClosed", ctx.alert);

        contexts.shift();
        context.value = undefined;

        await update();

        if (contexts.length > 0)
        {
            open();
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
