<template>
    <button class="vuert-button" :class="classes">
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
    import { computed } from "vue";

    const props = defineProps({
        size: {
            default: "medium",
            type: String
        },
        theme: {
            default: "alt",
            type: String
        }
    });

    const classes = computed((): string[] => [props.theme, props.size]);
</script>

<style lang="scss" scoped>
    .vuert-button
    {
        border: 1px solid transparent;
        display: inline-block;
        font-weight: 500;
        text-align: center;
        transition: color 0.25s, border-color 0.25s, background-color 0.25s;
        white-space: nowrap;

        &.alt
        {
            background-color: var(--vp-button-alt-bg);
            border-color: var(--vp-button-alt-border);
            color: var(--vp-button-alt-text);

            &:hover
            {
                background-color: var(--vp-button-alt-hover-bg);
                border-color: var(--vp-button-alt-hover-border);
                color: var(--vp-button-alt-hover-text);
            }
            &:active
            {
                background-color: var(--vp-button-alt-active-bg);
                border-color: var(--vp-button-alt-active-border);
                color: var(--vp-button-alt-active-text);
            }
        }
        &.brand
        {
            background-color: var(--vp-button-brand-bg);
            border-color: var(--vp-button-brand-border);
            color: var(--vp-button-brand-text);

            &:hover
            {
                background-color: var(--vp-button-brand-hover-bg);
                border-color: var(--vp-button-brand-hover-border);
                color: var(--vp-button-brand-hover-text);
            }
            &:active
            {
                background-color: var(--vp-button-brand-active-bg);
                border-color: var(--vp-button-brand-active-border);
                color: var(--vp-button-brand-active-text);
            }
        }

        &.small
        {
            border-radius: 16px;
            font-size: 12px;
            line-height: 30px;
            padding: 0px 16px;
        }
        &.medium
        {
            border-radius: 20px;
            font-size: 14px;
            line-height: 38px;
            padding: 0 20px;
        }
        &.big
        {
            border-radius: 24px;
            font-size: 16px;
            line-height: 46px;
            padding: 0px 24px;
        }
    }
</style>
