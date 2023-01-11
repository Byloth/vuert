<script setup>
    import { useVuert } from "@vuert/functions";

    import VuertButton from "../components/ui/VuertButton.vue";

    const vuert = useVuert();

    const emitAlert = () => vuert.emit({
        type: "info",
        message: "This is a themed Vuert alert!",
        timeout: 2500
    });
</script>

# Getting started

## Theming alerts

### Alert definition

```vue
<script lang="ts" setup>
    import { AlertHandler } from '@byloth/vuert';
</script>

<template>
    <AlertHandler v-slot="{ alert, isOpen }">
        <div v-if="isOpen"
             class="alert"
             :class="`alert--${alert.type}`">
            {{ alert.message }}
        </div>
    </AlertHandler>
</template>

<style scoped>
    .alert { /* [...] */ }

    .alert--info { background-color: #D1ECF1; }
    .alert--success { background-color: #D4EDDA; }
    .alert--warning { background-color: #FFF3CD; }
    .alert--error { background-color: #F8D7DA; }
    .alert--question { background-color: #E2E3E5; }
</style>
```

### Emit the alert

::: code-group

```ts [Composition APIs]
import { useVuert } from '@byloth/vuert';

// [...]

const vuert = useVuert();

const emitAlert = () => vuert.emit({
    type: 'info',
    message: "This is a themed Vuert alert!",
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
                type: 'info',
                message: "This is a themed Vuert alert!",
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
