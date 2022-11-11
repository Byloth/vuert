<script lang="ts" setup>
    import { useVuert } from "@vuert/functions";

    import VuertButton from "./components/ui/VuertButton.vue";

    const ALERTS = [
        {
            message: "This is your first Vuert alert!",
            timeout: 2500
        },
        {
            type: "info",
            message: "This is a themed Vuert alert!",
            timeout: 2500
        }
    ]

    const vuert = useVuert();

    const emitAlert = (index: number) => vuert.emit(ALERTS[index]);
</script>

# The basics

## Your first alert

### Alert definition

```vue
<template>
    <AlertHandler v-slot="{ alert }">
        <div class="alert">
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

```ts
/**
 * If you're using Option APIs...
 */

import { defineComponent } from "vue";

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

```ts
/**
 * If you're using Composition APIs...
 */

import { useVuert } from "@byloth/vuert";

// [...]

const vuert = useVuert();

const emitAlert = () => {
    vuert.emit({
        message: "This is your first Vuert alert!",
        timeout: 2500
    });
};
```

<VuertButton @click="emitAlert(0)">
    Emit now!
</VuertButton>

## Theming the alert

### Alert definition

```vue
<template>
    <AlertHandler v-slot="{ alert }">
        <div class="alert" :class="`alert--${alert.type}`">
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

```ts
/**
 * If you're using Option APIs...
 */

import { defineComponent } from "vue";

export default defineComponent({

    // [...]

    methods: {
        emitAlert() {
            this.$vuert.emit({
                type: "info",
                message: "This is a themed Vuert alert!",
                timeout: 2500
            });
        }
    }
});
```

```ts
/**
 * If you're using Composition APIs...
 */

import { useVuert } from "@byloth/vuert";

// [...]

const vuert = useVuert();

const emitAlert = () => {
    vuert.emit({
        type: "info",
        message: "This is a themed Vuert alert!",
        timeout: 2500
    });
};
```

<VuertButton @click="emitAlert(1)">
    Emit now!
</VuertButton>
