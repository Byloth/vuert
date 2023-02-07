<template>
    <div class="vuert-feature">
        <VPLink class="content"
                :href="link"
                :no-icon="true">
            <article class="box">
                <div v-if="icon" class="icon">
                    {{ icon }}
                </div>
                <slot></slot>
                <div v-if="linkText" class="link">
                    <p class="text">
                        {{ linkText }} <VPIconArrowRight class="icon" />
                    </p>
                </div>
            </article>
        </VPLink>
    </div>
</template>

<script lang="ts" setup>
    import VPLink from "@vitepress/theme/components/VPLink.vue";
    import VPIconArrowRight from "@vitepress/theme/components/icons/VPIconArrowRight.vue";

    defineProps({
        icon: {
            default: "",
            type: String
        },
        link: {
            default: "",
            type: String
        },
        linkText: {
            default: "",
            type: String
        }
    });
</script>

<style lang="scss" scoped>
    .vuert-feature
    {
        & > .content
        {
            background-color: var(--vp-c-bg-soft);
            border: 1px solid var(--vp-c-bg-soft);
            border-radius: 12px;
            display: block;
            height: 100%;
            transition: border-color 0.25s, background-color 0.25s;

            & > .box
            {
                display: flex;
                flex-direction: column;
                height: 100%;
                padding: 24px;

                & > .icon
                {
                    align-items: center;
                    background-color: var(--vp-c-bg-soft-down);
                    border-radius: 6px;
                    display: flex;
                    font-size: 24px;
                    height: 48px;
                    justify-content: center;
                    margin-bottom: 20px;
                    width: 48px;
                    transition: background-color 0.25s;
                }
                & > .link
                {
                    padding-top: 8px;

                    & > .text
                    {
                        align-items: center;
                        color: var(--vp-c-brand);
                        display: flex;
                        font-size: 14px;
                        font-weight: 500;

                        & > .icon
                        {
                            display: inline-block;
                            fill: currentColor;
                            margin-left: 6px;
                            height: 14px;
                            width: 14px;
                        }
                    }
                }
            }

            &.link:hover
            {
                background-color: var(--vp-c-bg-soft-up);
                border-color: var(--vp-c-brand);
            }
        }
    }
</style>
