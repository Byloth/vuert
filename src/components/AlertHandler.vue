<template>
    <Component :is="is">
        <slot v-if="context"
              :alert="context.alert"
              :is-open="context.isOpen"
              :dismiss="context.dismiss"
              :resolve="context.resolve"
              :reject="context.reject"></slot>
    </Component>
</template>

<script lang="ts" setup>
    /* eslint-disable @typescript-eslint/no-explicit-any */

    import { onMounted, onUnmounted, PropType, shallowRef } from "vue";

    import { useVuert } from "..";
    import { UnattainableException } from "../exceptions";
    import { Context } from "../models";
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
            type: [Number, String],

            // TODO: Add support for `{ enter: number, leave: number }` type property.
            //
            validator: (value: unknown): boolean => isFinite(Number(value))
        },
        filter: {
            default: (options: AlertOptions<unknown>) => true,
            type: Function as PropType<(options: AlertOptions<unknown>) => boolean>
        }
    });

    const emit = defineEmits([
        "onOpening",
        "onOpened",
        "onClosing",
        "onClosed"
    ]);

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
        const enterDuration = Number(props.duration);

        context.value = ctx;

        ctx.opening();
        emit("onOpening");

        await delay(enterDuration);

        emit("onOpened");
        ctx.opened();
    };
    const close = async <R>(ctx: Context<R>): Promise<void> =>
    {
        const leaveDuration = Number(props.duration);

        if (context.value?.alert.id !== ctx.alert.id)
        {
            throw new UnattainableException();
        }

        emit("onClosing");
        await delay(leaveDuration);
        emit("onClosed");

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
