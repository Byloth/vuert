---
layout: home
---

<script setup>
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
        <h4 class="subtitle">
            Stop struggling in vain!
        </h4>
        <!--
        <p class="details">
            Done like you would... Designed to be as developer-friendly as possible.<br />
            Go straight to the point!
        </p>
        -->
    </VuertFeature>
    <VuertFeature icon="🧟">
        <h2 class="title">
            Completely Headless
        </h2>
        <h4 class="subtitle">
            It's just pure logic!
        </h4>
        <!--
        <p class="details">
            Vuert comes with no style... Actually, it comes with no renderable elements!<br />
            This allows you to define your own components and to style them to match exactly your desired theme.<br />
            Unleash your imagination!
        </p>
        -->
    </VuertFeature>
    <VuertFeature icon="🧞">
        <h2 class="title">
            Simply Managed
        </h2>
        <h4 class="subtitle">
            It's disaster proof!
        </h4>
        <!--
        <p class="details">
            Say your app enters an infinite loop emitting gazillions of alerts...<br />
            Your users won't be overwhelmed with popups and notifications!<br />
            Everything will continue working just fine... Even if your app is imploding, under the hood.<br />
            <br />
            <i>
                Someone said "Debouncing" or "Throttling"?<br />
                There will be in future releases!
            </i><br />
            <br />
            Don't worry about what happens... Just stay focused on what you do best.<br />
            Slee... <i>Ahem...</i> Develop soundly!
        </p>
        -->
    </VuertFeature>
    <VuertFeature icon="💎">
        <h2 class="title">
            Meticulously Typed
        </h2>
        <h4 class="subtitle">
            100% written in TypeScript!
        </h4>
        <!--
        <p class="details">
            You know what it's need as an input... You know what you get as an output.<br />
            As simple as that... You can't go wrong!
        </p>
        -->
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
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
        padding-top: 8px;
    }
    .details
    {

    }
</style>
