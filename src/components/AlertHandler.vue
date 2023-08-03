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
    import type { Component, PropType } from "vue";

    import { FatalErrorException } from "@byloth/exceptions";

    import { useVuert } from "../functions";
    import { Alert, Context } from "../models";
    import { delay, update } from "../utils";

    import type { VuertOptions } from "../vuert";
    import type { Awaitable, PromiseClosures } from "../types";
    import type { AlertOptions } from "../types/alert";

    const $vuert = useVuert();

    const props = defineProps({
        is: {
            default: "div",
            type: [String, Object] as PropType<string | Component>
        },
        duration: {
            default: () => useVuert().options.duration,
            type: [Number, Object] as PropType<VuertOptions["duration"]>,

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
            default: () => true,
            type: Function as PropType<(options: AlertOptions<unknown>) => boolean>
        }
    });

    const emit = defineEmits({
        opening: <R>(alert: Alert<R>) => (alert instanceof Alert),
        opened: <R>(alert: Alert<R>) => (alert instanceof Alert),
        closing: <R>(alert: Alert<R>) => (alert instanceof Alert),
        closed: <R>(alert: Alert<R>) => (alert instanceof Alert)
    });

    const contexts: Context<any>[] = [];
    const context = shallowRef<Context<any>>();

    const register = <R>(options: AlertOptions<R>, { resolve, reject }: PromiseClosures<R, Error>) =>
    {
        const ctx = new Context(options, {
            resolve: async (result: Awaitable<R>) =>
            {
                await close(ctx);

                resolve(result);
            },
            reject: async (error: Error) =>
            {
                await close(ctx);

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
        emit("opening", ctx.alert);

        await delay(enterDuration);

        emit("opened", ctx.alert);
        ctx.opened();
    };
    const close = async <R>(ctx: Context<R>): Promise<void> =>
    {
        if (ctx.alert.id !== contexts[0].alert.id)
        {
            throw new FatalErrorException();
        }

        let leaveDuration: number;
        if (props.duration instanceof Object)
        {
            leaveDuration = Number(props.duration["leave"]);
        }
        else
        {
            leaveDuration = Number(props.duration);
        }

        emit("closing", ctx.alert);
        await delay(leaveDuration);
        emit("closed", ctx.alert);

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
        _unsubscribe = $vuert.subscribe(<R>(options: AlertOptions<R>) =>
        {
            if (props.filter(options))
            {
                return new Promise<R>((resolve, reject) => register(options, { resolve, reject }));
            }
        });
    });
    onUnmounted(() => _unsubscribe());
</script>
