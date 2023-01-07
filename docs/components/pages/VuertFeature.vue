<template>
    <article class="vuert-feature">
        <div class="content">
            <div v-if="icon" class="icon">
                {{ icon }}
            </div>
            <slot></slot>
        </div>
    </article>
</template>

<script lang="ts" setup>
    defineProps({
        icon: {
            default: "",
            type: String
        }
    });
</script>

<style lang="scss" scoped>
    .vuert-feature
    {
        padding: 8px;

        & > .content
        {
            background-color: var(--vp-c-bg-soft);
            border: 1px solid var(--vp-c-bg-soft);
            border-radius: 12px;
            height: 100%;
            padding: 24px;

            & > .icon
            {
                align-items: center;
                background-color: var(--vp-c-gray-light-4);
                border-radius: 6px;
                display: flex;
                font-size: 24px;
                height: 48px;
                justify-content: center;
                margin-bottom: 20px;
                width: 48px;
            }
        }
    }

    .dark .vuert-feature > .content > .icon
    {
        background-color: var(--vp-c-bg);
    }
</style>
