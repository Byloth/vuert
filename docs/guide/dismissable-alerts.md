<script lang="ts" setup>
    import { useVuert } from "@vuert/functions.js";

    import VuertButton from "../components/ui/VuertButton.vue";

    const vuert = useVuert();

    const emitAlert = () => vuert.emit({
        type: "info",
        message: "This is a dismissable Vuert alert!",
        dismissable: true
    });
</script>

# Getting started

## Dismissable alerts

### Alert definition

```vue
<script lang="ts" setup>
    import { AlertHandler } from '@byloth/vuert';
</script>

<template>
    <AlertHandler v-slot="{ alert, isOpen, resolve }">
        <div v-if="isOpen"
             class="alert"
             :class="`alert--${alert.type}`">
            <button v-if="alert.dismissible"
                    class="alert__close"
                    @click="resolve()">
                <span class="fa-solid fa-circle-xmark"></span>
            </button>
            {{ alert.message }}
        </div>
    </AlertHandler>
</template>

<style scoped>
    .alert { /* [...] */ }

    .alert--info { /* [...] */ }
    .alert--success { /* [...] */ }
    .alert--warning { /* [...] */ }
    .alert--error { /* [...] */ }
    .alert--question { /* [...] */ }

    .alert__close
    {
        background-color: transparent;
        border: none;
        color: #000000;
        float: right;
        opacity: 0.5;
        transition: opacity 200ms ease-in-out;
    }
    .alert__close:hover { opacity: 1; }
</style>
```

### Emit the alert

```ts
/**
 * If you're using Option APIs...
 */

import { defineComponent } from 'vue';

export default defineComponent({

    // [...]

    methods: {
        emitAlert() {
            this.$vuert.emit({
                type: 'info',
                message: "This is a dismissable Vuert alert!",
                dismissable: true
            });
        }
    }
});
```

```ts
/**
 * If you're using Composition APIs...
 */

import { useVuert } from '@byloth/vuert';

// [...]

const vuert = useVuert();

const emitAlert = () => vuert.emit({
    type: 'info',
    message: "This is a dismissable Vuert alert!",
    dismissable: true
});
```

<VuertButton @click="emitAlert()">
    Emit now!
</VuertButton>
