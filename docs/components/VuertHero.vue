<template>
    <header class="vuert-hero">
        <h1>Vuert.js</h1>
        <span>The headless alerts, notifications & popups library for Vue.js craftsmen.</span>
        <button @click="emitRandomAlert">
            Surprise me!
        </button>
    </header>
</template>

<script lang="ts" setup>
    import { useVuert } from "@core/index";
    import { SimpleAlert } from "@core/types/alerts";

    import Alerts from "@docs/data/alerts.json";
    import { pickOne } from "@docs/utils";

    const vuert = useVuert();

    const emitRandomAlert = () =>
    {
        const alert = pickOne(Alerts);

        vuert.emit(alert as SimpleAlert);
    };
</script>

<style lang="scss" scoped>
    .vuert-hero
    {
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 100vh;
        justify-content: space-evenly;
    }
</style>
