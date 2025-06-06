<template>
    <!-- eslint-disable vue/no-multiple-template-root -->
    <AlertHandler v-slot="{ alert, customComponent, isOpen, resolve }"
                  class="modal-handler"
                  :filter="modalFilter">
        <Transition appear
                    name="modal"
                    mode="in-out">
            <ModalAlert v-if="isOpen"
                        :alert="alert"
                        :close="resolve"
                        :custom-component="customComponent" />
        </Transition>
    </AlertHandler>
    <AlertHandler v-slot="{ alert, customComponent, isOpen }"
                  class="toast-handler"
                  :filter="toastFilter">
        <Transition appear
                    name="toast"
                    mode="in-out">
            <Component :is="customComponent"
                       v-if="isOpen"
                       v-bind="alert.payload" />
        </Transition>
    </AlertHandler>
    <DefaultTheme.Layout />
    <VuertFooter />
</template>

<script lang="ts" setup>
    import { onMounted, watch } from "vue";
    import DefaultTheme from "vitepress/theme";

    import { useSidebar } from "@vitepress/theme/composables/sidebar.js";

    import { AlertHandler, useVuert } from "@byloth/vuert";
    import type { AlertOptions } from "@byloth/vuert";

    import VuertFooter from "../components/globals/VuertFooter.vue";
    import ModalAlert from "../components/alerts/ModalAlert.vue";
    import ToastAlert from "../components/alerts/ToastAlert.vue";

    import { random } from "../utils.js";

    const { hasSidebar } = useSidebar();

    const modalFilter = (a: AlertOptions<unknown>) => a.priority === "high";
    const toastFilter = (a: AlertOptions<unknown>) => a.priority === "low";

    const vuert = useVuert();

    const emitToast = () =>
    {
        const delay = random(10, 30) * 1000;

        setTimeout(async () =>
        {
            await vuert.emit({
                component: ToastAlert,
                priority: "low",
                timeout: 7500
            });

            emitToast();

        }, delay);
    };

    onMounted(emitToast);

    if (!(import.meta.env.SSR))
    {
        const setBodyMargin = (isSidebarOpen: boolean) =>
        {
            if (isSidebarOpen)
            {
                document.body.style.marginBottom = "";
            }
            else
            {
                document.body.style.marginBottom = "112px";
            }
        };

        watch(hasSidebar, setBodyMargin, { immediate: true });
    }
</script>

<style lang="scss">
    $fa-font-path: "@fortawesome/fontawesome-free/webfonts";

    @use "@fortawesome/fontawesome-free/scss/fontawesome" with ($fa-font-path: $fa-font-path);
    @use "@fortawesome/fontawesome-free/scss/solid" with ($fa-font-path: $fa-font-path);
    @use "@fortawesome/fontawesome-free/scss/brands" with ($fa-font-path: $fa-font-path);

    :root
    {
        --vuert-strong-link-color: var(--vp-c-brand-dark);

        &.dark
        {
            --vuert-strong-link-color: var(--vp-c-brand-light);
        }
    }

    body
    {
        border-bottom: 1px solid var(--vp-c-divider-light);
        box-shadow: 0px 2.5px 10px 0px rgba(0, 0, 0, 0.5);
    }

    .VPContent
    {
        background-color: var(--vp-c-bg);
        min-height: 100vh;
    }

    .flex
    {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        &.horizontal
        {
            flex-direction: row;
        }
    }
    .overlay
    {
        background-color: rgba(0, 0, 0, 0.5);
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 31;
    }

    .modal-enter-active,
    .modal-leave-active
    {
        transition: opacity 200ms ease-in-out;

        & > .modal
        {
            transition: opacity 200ms ease-in-out, transform 200ms ease-in-out;
        }
    }
    .modal-enter-from,
    .modal-leave-to
    {
        opacity: 0;

        & > .modal
        {
            transform: translateY(-12.5%);
        }
    }

    .toast-enter-active,
    .toast-leave-active
    {
        transition: opacity 200ms ease-in-out, transform 200ms ease-in-out;
    }
    .toast-enter-from,
    .toast-leave-to
    {
        opacity: 0;
        transform: translateX(33.333%);
    }
</style>
