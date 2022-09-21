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
                <button v-if="alert.dismissable"
                        class="modal-close"
                        @click="close">
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
                             @click="close">
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
    import VuertButton from "../ui/VuertButton.vue";

    defineProps({
        alert: {
            required: true,
            type: Object
        },
        close: {
            required: true,
            type: Object
        }
    });
</script>

<style lang="scss" scoped>
    .modal
    {
        background-color: #FFFFFF;
        border: 1px solid #D7D7D7;
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
            border-bottom: 1px solid #D7D7D7;

            & > .modal-title
            {
                flex: 1;
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
            font-family: "Ubuntu";
            margin-bottom: 0;
        }

        & > .modal-footer
        {
            border-top: 1px solid #D7D7D7;
            flex-direction: row-reverse;
            justify-content: end;

            & > .button
            {
                margin-left: 0.5em;
            }
        }
    }
</style>
