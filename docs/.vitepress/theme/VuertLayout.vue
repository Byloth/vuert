<template>
    <AlertHandler v-slot="{ alert, close, isOpen }"
                  class="modal-handler"
                  :filter="modalFilter">
        <Transition name="modal" mode="in-out">
            <ModalAlert v-if="alert"
                        v-show="isOpen"
                        :alert="alert"
                        :close="close" />
        </Transition>
    </AlertHandler>
    <AlertHandler v-slot="{ alert, isOpen }"
                  class="toast-handler"
                  :filter="toastFilter">
        <Transition name="toast" mode="in-out">
            <ToastAlert v-if="alert"
                        v-show="isOpen"
                        :alert="alert" />
        </Transition>
    </AlertHandler>
    <Layout />
    <VuertFooter />
</template>

<script lang="ts" setup>
    import { onMounted } from "vue";
    import DefaultTheme from "vitepress/theme";

    import { useVuert, AlertHandler } from "@core/index";
    import { Alert } from "@core/types";

    import VuertFooter from "@docs/components/globals/VuertFooter.vue";
    import ModalAlert from "@docs/components/alerts/ModalAlert.vue";
    import ToastAlert from "@docs/components/alerts/ToastAlert.vue";

    import { random } from "@docs/utils";

    const { Layout } = DefaultTheme;

    const modalFilter = (a: Alert<unknown>) => !a._id && a.priority === "high";
    const toastFilter = (a: Alert<unknown>) => !a._id && a.priority === "low";

    const vuert = useVuert();

    const emitRandomAlert = () =>
    {
        const delay = random(10, 30) * 1000;

        setTimeout(async () =>
        {
            await vuert.emit({
                type: "info",
                priority: "low",
                timeout: 7500
            });

            emitRandomAlert();

        }, delay);
    };

    onMounted(emitRandomAlert);
</script>

<style lang="scss">
    $fa-font-path: "@fortawesome/fontawesome-free/webfonts";

    @import "@fortawesome/fontawesome-free/scss/fontawesome";
    @import "@fortawesome/fontawesome-free/scss/solid";
    @import "@fortawesome/fontawesome-free/scss/brands";

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
        margin-bottom: 112px;
        transition: background-color 250ms ease, border-color 250ms ease, color 250ms ease;
    }

    .VPContent
    {
        background-color: var(--vp-c-bg);
        min-height: 100vh;
        transition: background-color 250ms ease;
    }
    .VPNav
    {
        box-shadow: 0px 2.5px 10px 0px rgba(0, 0, 0, 0.25);
        transition: background-color 250ms ease, color 250ms ease;

        & > .VPNavBar
        {
            transition: background-color 250ms ease, border-color 250ms ease;

            .VPMenu
            {
                transition: background-color 250ms ease, border-color 250ms ease, box-shadow 250ms ease;

                .group
                {
                    transition: border-color 250ms ease;

                    .label
                    {
                        transition: color 250ms ease;
                    }
                }
            }
            .VPNavBarTitle > .title
            {
                transition: color 250ms ease, opacity 250ms ease;
            }
            .VPSocialLinks > .VPSocialLink
            {
                transition: color 250ms ease;
            }
        }

        & > .VPNavScreen
        {
            transition: background-color 250ms ease;

            .VPNavScreenAppearance
            {
                transition: background-color 250ms ease;

                .text
                {
                    transition: color 250ms ease;
                }
            }
            .VPNavScreenMenu > .VPNavScreenMenuGroup
            {
                transition: border-color 250ms;

                & > .button
                {
                    transition: color 250ms;
                }
            }
        }
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
        z-index: 22;
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
