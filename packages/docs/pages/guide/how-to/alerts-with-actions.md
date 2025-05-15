<script setup>
    import { useVuert } from "@byloth/vuert";

    import VuertButton from "@/components/ui/VuertButton.vue";

    const vuert = useVuert();

    const emitAlert = () => vuert.emit({
        type: "question",
        message: "Did you know this Vuert alert can be used by the user to answer a question?",
        actions: [
            {
                label: "Yeah! 😎",
                callback: () => alert("You said that you already knew it! Good job! 😏")
            },
            {
                label: "Nope! 🤯",
                callback: () => alert("You said that you didn't know it... Now you know! 😉")
            }
        ],
        dismissable: true
    });
</script>

# Getting started

## Alerts with actions

### Alert definition

```vue
<script setup>
    import { AlertHandler } from '@byloth/vuert';
</script>

<template>
    <AlertHandler v-slot="{ alert, isOpen, resolve }">
        <div v-if="isOpen"
             class="alert"
             :class="`alert--${alert.type}`">
            <div class="alert__content">
                <button v-if="alert.dismissible"
                        class="alert__close"
                        @click="resolve()">
                    <span class="fa-solid fa-circle-xmark"></span>
                </button>
                {{ alert.message }}
            </div>
            <div v-if="alert.actions" class="alert__footer">
                <button v-for="action in alert.actions"
                        :key="action.id"
                        class="alert__action"
                        @click="resolve(action)">
                    {{ action.label }}
                </button>
            </div>
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

    .alert__close { /* [...] */ }
    .alert__close:hover { /* [...] */ }

    .alert__footer
    {
        align-items: center;
        display: flex;
        flex-direction: row-reverse;
        justify-content: end;
    }
    .alert__action
    {
        /* TODO: Define the button style! */
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
    type: 'question',
    message: "Did you know this Vuert alert can be used by the user to answer a question?",
    actions: [
        {
            label: "Yeah! 😎",
            callback: () => alert("You said that you already knew it! Good job! 😏")
        },
        {
            label: "Nope! 🤯",
            callback: () => alert("You said that you didn't know it... Now you know! 😉")
        }
    ],
    dismissable: true
});
```

```ts [Option APIs]
import { defineComponent } from 'vue';

export default defineComponent({

    // [...]

    methods: {
        emitAlert() {
            this.$vuert.emit({
                type: 'question',
                message: "Did you know this Vuert alert can be used by the user to answer a question?",
                actions: [
                    {
                        label: "Yeah! 😎",
                        callback: () => alert("You said that you already knew it! Good job! 😏")
                    },
                    {
                        label: "Nope! 🤯",
                        callback: () => alert("You said that you didn't know it... Now you know! 😉")
                    }
                ],
                dismissable: true
            });
        }
    }
});
```

:::

<VuertButton @click="emitAlert()">
    Emit now!
</VuertButton>

## Actions with result

### Emit the alert

::: code-group

```ts [Composition APIs]
import { useVuert } from '@byloth/vuert';

// [...]

const vuert = useVuert();

const emitAlert = async () => {
    const result: boolean | undefined = await vuert.emit({
        type: 'question',
        message: "Did you know this Vuert alert can be used by the user to answer a question?",
        actions: [
            {
                label: "Yeah! 😎",
                callback: () => true
            },
            {
                label: "Nope! 🤯",
                callback: () => false
            }
        ],
        dismissable: true
    });

    if (result === true) {
        alert("You said that you already knew it! Good job! 😏");
    } else if (result === false) {
        alert("You said that you didn't know it... Now you know! 😉");
    }
};
```

```ts [Option APIs]
import { defineComponent } from 'vue';

export default defineComponent({

    // [...]

    methods: {
        async emitAlert() {
            const result: boolean | undefined = await this.$vuert.emit({
                type: 'question',
                message: "Did you know this Vuert alert can be used by the user to answer a question?",
                actions: [
                    {
                        label: "Yeah! 😎",
                        callback: () => true
                    },
                    {
                        label: "Nope! 🤯",
                        callback: () => false
                    }
                ],
                dismissable: true
            });

            if (result === true) {
                alert("You said that you already knew it! Good job! 😏");
            } else if (result === false) {
                alert("You said that you didn't know it... Now you know! 😉");
            }
        }
    }
});
```

:::
