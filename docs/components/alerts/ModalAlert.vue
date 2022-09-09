<template>
    <div class="modal-alert">
        <div class="flex horizontal modal-header">
            <h5 class="modal-title">
                <span v-if="alert.icon"
                      class="fa-solid"
                      :class="`fa-${alert.icon}`"></span>
                <span v-if="alert.title">{{ alert.title }}</span>
            </h5>
            <button v-if="alert.dismissable"
                    class="modal-close"
                    @click="alert.close">
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
            <button v-for="action in alert.actions"
                    :key="action.id"
                    class="button"
                    :class="action.type"
                    @click="alert.close">
                <span v-if="action.icon"
                      class="fa-solid"
                      :class="`fa-${action.icon}`">
                </span>
                {{ action.label }}
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    defineProps({
        alert: {
            required: true,
            type: Object
        }
    });
</script>

<style lang="scss" scoped>
</style>
