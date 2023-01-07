<script lang="ts" setup>
    import { useVuert } from "@vuert/functions.js";

    import VuertButton from "../components/ui/VuertButton.vue";

    const vuert = useVuert();

    const emitAlert = () => vuert.emit({
        message: "This is your first Vuert alert!",
        timeout: 2500
    });
</script>

# Getting started

## Your first alert

### Alert definition

```vue
<script lang="ts" setup>
    import { AlertHandler } from '@byloth/vuert';
</script>

<template>
    <AlertHandler v-slot="{ alert, isOpen }">
        <div v-if="isOpen" class="alert">
            {{ alert.message }}
        </div>
    </AlertHandler>
</template>

<style scoped>
    .alert
    {
        background-color: #E2E3E5;
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 1rem;
        box-shadow: 2.5px 2.5px 5px rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 2rem;
        z-index: 10;
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
