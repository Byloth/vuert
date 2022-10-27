---
layout: home
---

<script lang="ts" setup>
    import VuertHero from "./components/pages/VuertHero.vue";
    import VuertFeatures from "./components/pages/VuertFeatures.vue";
    import VuertFeature from "./components/pages/VuertFeature.vue";
</script>

<VuertHero />
<VuertFeatures :grid="4">
    <VuertFeature icon="🤯">
        <h2 class="title">
            Insanely Easy
        </h2>
        <p class="details">
            Stop struggling in vain!
        </p>
    </VuertFeature>
    <VuertFeature icon="🧟">
        <h2 class="title">
            Completely Headless
        </h2>
        <p class="details">
            It's just pure logic!
        </p>
    </VuertFeature>
    <VuertFeature icon="🧞">
        <h2 class="title">
            Simply Managed
        </h2>
        <p class="details">
            It's disaster proof!
        </p>
    </VuertFeature>
    <VuertFeature icon="💎">
        <h2 class="title">
            Meticulously Typed
        </h2>
        <p class="details">
            100% written in TypeScript!
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
    .details
    {
        color: var(--vp-c-text-2);
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
        padding-top: 8px;
        transition: color 250ms ease;
    }
</style>
