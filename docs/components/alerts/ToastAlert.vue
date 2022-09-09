<template>
    <div class="flex horizontal toast-alert">
        <img class="avatar" :src="avatar" />
        <span>
            <strong>{{ person }}</strong> just {{ action }}.
        </span>
    </div>
</template>

<script lang="ts" setup>
    import Actions from "@docs/data/actions.json";
    import People from "@docs/data/people.json";

    import { pickOne } from "@docs/utils";

    defineProps({
        alert: {
            required: true,
            type: Object
        }
    });

    const avatar = "https://picsum.photos/50";
    const person: string = pickOne(People);
    const action: string = pickOne(Actions);
</script>

<style lang="scss" scoped>
</style>
