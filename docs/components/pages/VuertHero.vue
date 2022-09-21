<template>
    <section class="vuert-hero">
        <div class="container">
            <div class="main">
                <h1 class="title">
                    <span>Vuert.js</span>
                </h1>
                <p class="subtitle">
                    <span>The headless alerts, notifications &amp; popups library for Vue.js craftsmen.</span>
                </p>
                <div class="actions">
                    <VuertButton theme="brand" @click="emitRandomAlert">
                        Surprise me!
                    </VuertButton>
                    <VuertButton>
                        Get started
                    </VuertButton>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
    import { useVuert } from "@core/index";
    import { SimpleAlert } from "@core/types/alerts";

    import Alerts from "@docs/data/alerts.json";
    // import { pickOne } from "@docs/utils";

    import VuertButton from "../ui/VuertButton.vue";

    const vuert = useVuert();

    const emitRandomAlert = () =>
    {
        const alert = Alerts[1]; // pickOne(Alerts);

        vuert.emit(alert as SimpleAlert);
    };
</script>

<style lang="scss" scoped>
    .vuert-hero
    {
        margin-top: calc(var(--vp-nav-height) * -1);
        padding: calc(var(--vp-nav-height) + 48px) 24px 48px;

        & > .container
        {
            display: flex;
            flex-direction: column;
            margin: 0px auto;
            max-width: 1152px;

            .title
            {
                color: var(--vp-home-hero-name-color);
                font-size: 32px;
                font-weight: 700;
                letter-spacing: -0.4px;
                line-height: 40px;
                max-width: 392px;
                white-space: pre-wrap;
            }
            .subtitle
            {
                color: var(--vp-c-text-2);
                line-height: 28px;
                max-width: 392px;
                font-size: 18px;
                font-weight: 500;
                padding-top: 8px;
                transition: color 250ms ease;
                white-space: pre-wrap;
            }

            .actions
            {
                display: flex;
                flex-wrap: wrap;
                margin: -6px;
                padding-top: 24px;

                & > .vuert-button
                {
                    flex-shrink: 0;
                    margin: 6px;
                }
            }
        }
    }

    @media (min-width: 640px)
    {
        .vuert-hero
        {
            padding: calc(var(--vp-nav-height) + 80px) 48px 64px;

            & > .container
            {
                .title
                {
                    font-size: 48px;
                    line-height: 56px;
                    max-width: 576px;
                }
                .subtitle
                {
                    font-size: 20px;
                    line-height: 32px;
                    max-width: 576px;
                    padding-top: 12px;
                }

                .actions
                {
                    padding-top: 32px;
                }
            }
        }
    }

    @media (min-width: 960px)
    {
        .vuert-hero
        {
            padding: calc(var(--vp-nav-height) + 80px) 64px 64px;

            & > .container
            {
                flex-direction: row;

                .title
                {
                    font-size: 56px;
                    line-height: 64px;
                }
                .subtitle
                {
                    font-size: 24px;
                    line-height: 36px;
                }
            }
        }
    }
</style>
