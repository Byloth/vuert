<template>
    <footer class="vuert-footer">
        <div class="container">
            <p class="message">
                Released under the
                <a class="link"
                   href="https://opensource.org/licenses/Apache-2.0"
                   target="_blank">Apache 2.0 License</a>.
            </p>
            <p class="copyright">
                Copyright © 2021-{{ currentYear }}
                <a class="link"
                   href="https://www.byloth.net/"
                   target="_blank">Matteo Bilotta</a>.
            </p>
        </div>
    </footer>
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    const currentYear = ref(new Date().getFullYear());
</script>

<style lang="scss" scoped>
    .vuert-footer
    {
        border-top: 1px solid var(--vp-c-divider-light);
        padding: 32px 24px;
        transition: border-color 250ms ease;

        & > .container
        {
            margin: 0px auto;
            max-width: var(--vp-layout-max-width);
            text-align: center;

            & > .copyright,
            & > .message
            {
                color: var(--vp-c-text-2);
                font-size: 14px;
                font-weight: 500;
                line-height: 24px;
                transition: color 250ms ease;

                & > .link
                {
                    color: var(--vp-c-brand);
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
