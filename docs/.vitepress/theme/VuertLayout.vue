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
</template>

<script lang="ts" setup>
    import DefaultTheme from "vitepress/theme";

    import { AlertHandler } from "@core/index";
    import { Alert } from "@core/types";

    import ModalAlert from "@docs/components/alerts/ModalAlert.vue";
    import ToastAlert from "@docs/components/alerts/ToastAlert.vue";

    const { Layout } = DefaultTheme;

    const modalFilter = (a: Alert<unknown>) => !a._id && a.priority === "high";
    const toastFilter = (a: Alert<unknown>) => !a._id && a.priority === "low";
</script>

<style lang="scss" scoped>
</style>
