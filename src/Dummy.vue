<template>
    <AlertHandler :filter="filter" v-slot="{ alert, close }">
        <div>
            <h1>{{ alert.title }}</h1>
            <p>{{ alert.message }}</p>
            <button @click="close">Chiudi</button>
        </div>
    </AlertHandler>
</template>

<script lang="ts" setup>
    import AlertHandler from './AlertHandler.vue';

    const filter = (alert: unknown): boolean => (alert.type === "error");
</script>

<style>
</style>
