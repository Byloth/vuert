---
layout: home
---

<script setup>
    import VuertHero from "@theme/components/pages/VuertHero.vue";
    import VuertFeatures from "@theme/components/pages/VuertFeatures.vue";
    import VuertFeature from "@theme/components/pages/VuertFeature.vue";
</script>

<VuertHero />
<VuertFeatures :grid="4">
    <VuertFeature icon="🤯">
        <h2 class="title">
            Insanely Easy
        </h2>
        <h4 class="subtitle">
            Stop struggling in vain!
        </h4>
        <p class="details">
            Done like you would...<br />
            Designed to be as friendly as possible.<br />
            <strong class="details__loud-out">
                Go straight to the point!
            </strong>
        </p>
    </VuertFeature>
    <VuertFeature icon="🎨">
        <h2 class="title">
            Completely Headless
        </h2>
        <h4 class="subtitle">
            It's just pure logic!
        </h4>
        <p class="details">
            Vuert comes with no style...<br />
            Style it and match exactly your theme.<br />
            <strong class="details__loud-out">
                Unleash your imagination!
            </strong>
        </p>
    </VuertFeature>
    <VuertFeature icon="🪄">
        <h2 class="title">
            Simply Managed
        </h2>
        <h4 class="subtitle">
            It's disaster proof!
        </h4>
        <p class="details">
            Everything will working just fine...<br />
            Even if your app is imploding.<br />
            <strong class="details__loud-out">
                Stay focused on what matters!
            </strong>
        </p>
    </VuertFeature>
    <VuertFeature icon="💎">
        <h2 class="title">
            Meticulously Typed
        </h2>
        <h4 class="subtitle">
            100% written in TypeScript!
        </h4>
        <p class="details">
            You know what it's need as an input...<br />
            You know what you get as an output.<br />
            <strong class="details__loud-out">
                You can't go wrong!
            </strong>
        </p>
    </VuertFeature>
</VuertFeatures>

<style lang="scss" scoped>
    .title
    {
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
    }
    .subtitle
    {
        color: var(--vp-c-text-2);
        flex-grow: 1;
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
        padding-top: 8px;
    }
    .details
    {
        font-size: 12px;
        padding-top: 32px;
    }
    .details__loud-out
    {
        display: inline-block;
        margin-top: 8px;
    }
</style>
