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

    import VuertFooter from "@docs/components/VuertFooter.vue";
    import ModalAlert from "@docs/components/alerts/ModalAlert.vue";
    import ToastAlert from "@docs/components/alerts/ToastAlert.vue";

    const { Layout } = DefaultTheme;

    const modalFilter = (a: Alert<unknown>) => !a._id && a.priority === "high";
    const toastFilter = (a: Alert<unknown>) => !a._id && a.priority === "low";
</script>

<style lang="scss">
    body
    {
        transition: background-color 250ms ease, color 250ms ease;
    }

    .VPHomeHero
    {
        .tagline
        {
            transition: color 250ms ease;
        }
    }
    .VPNav
    {
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
