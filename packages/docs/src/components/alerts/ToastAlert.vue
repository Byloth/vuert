<template>
    <div class="flex horizontal toast-alert">
        <img class="avatar" :src="avatar" />
        <span>
            <strong>{{ person }}</strong> just {{ action }}.
        </span>
    </div>
</template>

<script lang="ts" setup>
    import { Alert } from "@byloth/vuert";

    import Actions from "@/assets/data/actions.json";
    import People from "@/assets/data/people.json";

    import { pickOne } from "../../utils.js";

    defineProps({
        alert: {
            default: undefined,
            type: Alert
        }
    });

    const avatar = "https://picsum.photos/50";
    const person: string = pickOne(People);
    const action: string = pickOne(Actions);
</script>

<style lang="scss" scoped>
    .toast-alert
    {
        backdrop-filter: saturate(50%) blur(8px);
        background-color: rgba(var(--vp-c-bg), 0.7);
        border: 1px solid var(--vp-c-divider-light);
        border-radius: 37px;
        bottom: 1.5rem;
        box-shadow: 2.5px 2.5px 5px rgba(0, 0, 0, 0.5);
        font-size: 0.875rem;
        max-width: 300px;
        padding: 0.75rem 1rem;
        position: fixed;
        right: 2em;
        transition: opacity 250ms ease, transform 250ms ease;

        z-index: 21;

        & > .avatar
        {
            background-color: rgba(0, 0, 0, 0.5);
            border: 1px solid #000000;
            border-radius: 50%;
            height: 50px;
            margin-right: 0.75rem;
            min-width: 50px;
            width: 50px;
        }

        @media (min-width: 960px)
        {
            bottom: initial;
            top: calc(var(--vp-nav-height) + 1.5rem);
        }
    }
</style>
