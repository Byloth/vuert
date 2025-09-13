<script lang="ts" setup>
    defineProps({
        grid: {
            required: true,
            type: Number
        }
    });
</script>

<template>
    <div class="vuert-features">
        <div class="container">
            <div class="items" :class="`grid-${grid}`">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .vuert-features
    {
        padding: 0px 24px;
        position: relative;

        & > .container
        {
            margin: 0px auto;
            max-width: 1152px;

            & > .items
            {
                display: flex;
                flex-wrap: wrap;
                margin: -8px;
            }
        }

        & ::v-deep(.vuert-feature)
        {
            padding: 8px;
            width: 100%;
        }
    }

    @media (min-width: 640px)
    {
        .vuert-features
        {
            padding: 0px 48px;

            .grid-2,
            .grid-4,
            .grid-6
            {
                & > ::v-deep(.vuert-feature)
                {
                    width: calc(100% / 2);
                }
            }
        }
    }
    @media (min-width: 768px)
    {
        .grid-2,
        .grid-4
        {
            & > ::v-deep(.vuert-feature)
            {
                width: calc(100% / 2);
            }
        }

        .grid-3,
        .grid-6
        {
            & > ::v-deep(.vuert-feature)
            {
                width: calc(100% / 3);
            }
        }
    }
    @media (min-width: 960px)
    {
        .vuert-features
        {
            padding: 0px 64px;

            .grid-4 > ::v-deep(.vuert-feature)
            {
                width: calc(100% / 4);
            }
        }
    }
</style>
