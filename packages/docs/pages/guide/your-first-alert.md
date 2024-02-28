<script setup>
    import { useVuert } from "@byloth/vuert";

    import VuertButton from "@/components/ui/VuertButton.vue";

    const vuert = useVuert();

    const id = Symbol("[vuert-docs]: your-first-alert");

    const emitAlert = () => vuert.emit({
        id: id,
        message: "This is your first Vuert alert!",
        timeout: 2500,
        custom: "example"
    });
</script>

# Getting started

## Your first alert

### Alert definition

```vue
<script setup>
    import { AlertHandler } from '@byloth/vuert';
</script>

<template>
    <AlertHandler v-slot="{ alert, isOpen }">
        <div v-if="isOpen" class="alert-overlay">
            <div class="alert">
                {{ alert.message }}
            </div>
        </div>
    </AlertHandler>
</template>

<style scoped>
    .alert-overlay
    {
        align-items: center;
        display: flex;
        justify-content: center;
        position: fixed;
        top: 2rem;
        user-select: none;
        width: 100%;
        z-index: 10;
    }
    .alert
    {
        background-color: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 1rem;
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
        padding: 0.75rem 1rem;
        user-select: text;
    }
</style>
```

### Emit the alert

::: code-group

```ts [Composition APIs]
import { useVuert } from '@byloth/vuert';

// [...]

const vuert = useVuert();

const emitAlert = () => vuert.emit({
    message: "This is your first Vuert alert!",
    timeout: 2500
});
```

```ts [Option APIs]
import { defineComponent } from 'vue';

export default defineComponent({

    // [...]

    methods: {
        emitAlert() {
            this.$vuert.emit({
                message: "This is your first Vuert alert!",
                timeout: 2500
            });
        }
    }
});
```

:::

<VuertButton @click="emitAlert()">
    Emit now!
</VuertButton>
