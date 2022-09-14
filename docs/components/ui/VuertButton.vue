<template>
    <button class="vuert-button medium brand">
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
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

        &.brand
        {
            background-color: var(--vp-button-brand-bg);
            border-color: var(--vp-button-brand-border);
            color: var(--vp-button-brand-text);
        }
        &.medium
        {
            border-radius: 20px;
            font-size: 14px;
            line-height: 38px;
            padding: 0 20px;
        }
    }
</style>
