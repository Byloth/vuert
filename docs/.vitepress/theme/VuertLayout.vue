<template>
    <AlertHandler v-slot="alert"
                  class="modal-handler"
                  :filter="modalFilter">
        <Transition name="modal" mode="in-out">
            <ModalAlert v-if="alert"
                        v-show="alert.isOpen"
                        :alert="alert" />
        </Transition>
    </AlertHandler>
    <AlertHandler v-slot="alert"
                  class="toast-handler"
                  :filter="toastFilter">
        <Transition name="toast" mode="in-out">
            <ToastAlert v-if="alert"
                        v-show="alert.isOpen"
                        :alert="alert" />
        </Transition>
    </AlertHandler>
    <Layout />
    <VuertFooter />
</template>

<script lang="ts" setup>
    import DefaultTheme from "vitepress/theme";

    import { AlertHandler } from "@core/index";
    import { Alert } from "@core/types";

    import VuertFooter from "@docs/components/globals/VuertFooter.vue";
    import ModalAlert from "@docs/components/alerts/ModalAlert.vue";
    import ToastAlert from "@docs/components/alerts/ToastAlert.vue";

    const { Layout } = DefaultTheme;

    const modalFilter = (a: Alert<unknown>) => !a._id && a.priority === "high";
    const toastFilter = (a: Alert<unknown>) => !a._id && a.priority === "low";
</script>

<style lang="scss">
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
        height: 100vh;
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
</style>
