<script lang="ts" setup>
    import { nextTick, onMounted, onUnmounted, ref, shallowRef } from "vue";
    import type { Component, PropType } from "vue";

    import type { MaybePromise } from "@byloth/core";

    import { useVuert } from "../functions.js";
    import { Alert, Context } from "../models/index.js";

    import type { Duration } from "../types/index.js";
    import type { AlertOptions } from "../types/alert/index.js";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type AnyContext = Context<any, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type AnyContextResolver = (result?: MaybePromise<any>) => void;

    const props = defineProps({
        is: {
            default: "div",
            type: [String, Object] as PropType<string | Component>
        },
        filter: {
            default: () => true,
            type: Function as PropType<(options: AlertOptions<unknown>) => boolean>
        },
        transitionDuration: {
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
        }
    });

    const emit = defineEmits({
        opening: <R, P extends Record<string, unknown>>(alert: Alert<R, P>) => (alert instanceof Alert),
        opened: <R, P extends Record<string, unknown>>(alert: Alert<R, P>) => (alert instanceof Alert),
        closing: <R, P extends Record<string, unknown>>(alert: Alert<R, P>) => (alert instanceof Alert),
        closed: <R, P extends Record<string, unknown>>(alert: Alert<R, P>) => (alert instanceof Alert)
    });

    const contexts: AnyContext[] = [];

    const queue = ref<number>(0);
    const context = shallowRef<AnyContext>();

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

            queue.value -= 1;

            await nextTick();

            if (contexts.length > 0) { open(); }
        });

        context.value = ctx;

        await ctx.open();
    };

    const register = <R, P extends Record<string, unknown>>(options: AlertOptions<R, P>): Context<R, P> =>
    {
        const ctx = new Context<R, P>(options, props.transitionDuration);

        contexts.push(ctx);
        if (contexts.length === 1) { open(); }

        queue.value += 1;

        return ctx;
    };

    let _unsubscribe: () => void;
    onMounted(() =>
    {
        _unsubscribe = useVuert().subscribe(<R>(options: AlertOptions<R>): Context<R> | void =>
        {
            if (props.filter(options)) { return register(options); }
        });
    });
    onUnmounted(() => _unsubscribe());
</script>

<template>
    <Component :is="is">
        <slot v-if="context"
              :alert="context.alert"
              :custom-component="context.component"
              :is-open="context.isOpen.value"
              :queue="queue"
              :resolve="context.resolve as AnyContextResolver"
              :reject="context.reject"></slot>
    </Component>
</template>
