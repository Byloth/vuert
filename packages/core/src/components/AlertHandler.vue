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

    import { nextTick, onMounted, onUnmounted, shallowRef } from "vue";
    import type { Component, PropType } from "vue";

    import { useVuert } from "../functions.js";
    import { Alert, Context } from "../models/index.js";

    import type { Duration } from "../types/index.js";
    import type { AlertOptions } from "../types/alert/index.js";

    const $vuert = useVuert();

    const props = defineProps({
        is: {
            default: "div",
            type: [String, Object] as PropType<string | Component>
        },
        duration: {
            default: () => useVuert().options.transitionDuration,
            type: [Number, Object] as PropType<number | Duration>,

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

    const tickUpdate = (): Promise<void> => new Promise((resolve) => nextTick(resolve));

    const open = async (): Promise<void> =>
    {
        const ctx = contexts[0];

        ctx.onOpening(() => emit("opening", ctx.alert));
        ctx.onOpened(() => emit("opened", ctx.alert));
        ctx.onClosing(() => emit("closing", ctx.alert));
        ctx.onClosed(async () =>
        {
            emit("closed", ctx.alert);

            contexts.shift();
            context.value = undefined;

            await tickUpdate();

            if (contexts.length > 0)
            {
                open();
            }
        });

        context.value = ctx;

        await ctx.open();
    };

    const register = <R>(options: AlertOptions<R>): Context<R> =>
    {
        const ctx = new Context(options, props.duration);

        contexts.push(ctx);
        if (contexts.length === 1)
        {
            open();
        }

        return ctx;
    };

    let _unsubscribe: () => void;
    onMounted(() =>
    {
        _unsubscribe = $vuert.subscribe(<R>(options: AlertOptions<R>): Context<R> | void =>
        {
            if (props.filter(options))
            {
                return register(options);
            }
        });
    });
    onUnmounted(() => _unsubscribe());
</script>
