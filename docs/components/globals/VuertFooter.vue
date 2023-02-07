<template>
    <footer class="vuert-footer" :hidden="hasSidebar">
        <div class="container">
            <p class="license">
                Released under the
                <a class="link"
                   href="https://opensource.org/licenses/Apache-2.0"
                   target="_blank">Apache 2.0 License</a>.
            </p>
            <p class="copyright">
                Copyright © 2021-{{ new Date().getFullYear() }}
                <a class="link"
                   href="https://www.byloth.dev/"
                   target="_blank">Matteo Bilotta</a>.
            </p>
        </div>
    </footer>
</template>

<script lang="ts" setup>
    import { useSidebar } from "@vitepress/theme/composables/sidebar.js";

    const { hasSidebar } = useSidebar();
</script>

<style lang="scss" scoped>
    .vuert-footer
    {
        background-color: var(--vp-button-alt-bg);
        bottom: 0px;
        left: 0px;
        padding: 32px 24px;
        position: fixed;
        right: 0px;
        z-index: -1;

        &[hidden]
        {
            display: none;
        }

        & > .container
        {
            margin: 0px auto;
            max-width: var(--vp-layout-max-width);
            text-align: center;

            & > .copyright,
            & > .license
            {
                color: var(--vp-button-alt-text);
                font-size: 14px;
                font-weight: 500;
                line-height: 24px;

                & > .link
                {
                    color: var(--vuert-strong-link-color);
                    opacity: 0.875;
                    transition: opacity 250ms ease;

                    &:hover
                    {
                        text-decoration: underline;
                        opacity: 1;
                    }
                }
            }
        }

        @media (min-width: 768px)
        {
            padding: 32px;
        }
    }
</style>
