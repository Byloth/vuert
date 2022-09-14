<template>
    <footer class="vuert-footer">
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
                   href="https://www.byloth.net/"
                   target="_blank">Matteo Bilotta</a>.
            </p>
        </div>
    </footer>
</template>

<script lang="ts" setup>
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
        transition: background-color 250ms ease, border-color 250ms ease;
        z-index: -1;

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
                transition: color 250ms ease;

                & > .link
                {
                    color: var(--vuert-strong-link-color);
                    opacity: 0.875;
                    transition: color 250ms ease, opacity 250ms ease;

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
