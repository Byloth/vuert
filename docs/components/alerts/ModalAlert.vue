<template>
    <div class="modal-alert flex overlay">
        <div class="modal">
            <div class="flex horizontal modal-header">
                <h5 class="modal-title">
                    <span v-if="alert.icon"
                          class="fa-solid"
                          :class="`fa-${alert.icon}`"></span>
                    <span v-if="alert.title">{{ alert.title }}</span>
                </h5>
                <button v-if="alert.dismissible"
                        class="modal-close"
                        @click="dismiss">
                    <span class="fa-solid fa-circle-xmark"></span>
                </button>
            </div>
            <div class="modal-body">
                <pre v-if="alert.message" class="modal-message">{{ alert.message }}</pre>
                <template v-else>
                    <component :is="alert.component" />
                </template>
            </div>
            <div v-if="alert.actions" class="flex modal-footer">
                <VuertButton v-for="action in alert.actions"
                             :key="action.id"
                             class="button"
                             :class="action.type"
                             size="small"
                             @click="resolve(action.callback())">
                    <span v-if="action.icon"
                          class="fa-solid"
                          :class="`fa-${action.icon}`">
                    </span>
                    {{ action.label }}
                </VuertButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { PropType } from "vue";

    import Alert from "@vuert/models/alert";

    import VuertButton from "../ui/VuertButton.vue";

    defineProps({
        alert: {
            required: true,
            type: Alert
        },
        dismiss: {
            required: true,
            type: Function as PropType<() => void>
        },
        resolve: {
            required: true,
            type: Function as PropType<(result: unknown) => void>
        }
    });
</script>

<style lang="scss" scoped>
    .modal
    {
        background-color: var(--vp-c-bg);
        border: 1px solid var(--vp-c-divider-light);
        border-radius: 1em;
        box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.5);

        & > .modal-header,
        & > .modal-body,
        & > .modal-footer
        {
            padding: 0.75em 1em;
            width: 100%;
        }

        & > .modal-header
        {
            border-bottom: 1px solid var(--vp-c-divider-light);

            & > .modal-title
            {
                flex: 1;
                font-weight: bold;
                margin-bottom: 0;

                & > .fa-solid
                {
                    margin-right: 0.5em;
                }
            }
            & > .modal-close
            {
                background: none;
                border: none;
                font-size: 1em;
                opacity: 0.5;
                transition: opacity 200ms ease-in-out;

                &:hover
                {
                    opacity: 1;
                }
            }
        }

        & > .modal-body > .modal-message
        {
            font-family: var(--vp-font-family-base);
            font-size: 0.875em;
            margin: 0px;
        }

        & > .modal-footer
        {
            border-top: 1px solid var(--vp-c-divider-light);
            flex-direction: row-reverse;
            justify-content: end;

            & > .button
            {
                margin-left: 0.5em;
            }
        }
    }
</style>
