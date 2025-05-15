# Getting started

## Installation

::: code-group

```bash [NPM]
npm install @byloth/vuert
```

```bash [Yarn]
yarn add @byloth/vuert
```

:::

## Initialization

```ts
// src/main.ts

import { createApp } from 'vue';
import { createVuert } from '@byloth/vuert';

import App from './App.vue';

const app = createApp(App);

app.use(createVuert());

export default app.mount('#app');
```
