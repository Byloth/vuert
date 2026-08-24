# TODO — Vuert v2.0.0 roadmap

> **Strategy:** dedicated `v2` branch / milestone. Breaking changes are allowed.
> The `1.x` line stays alive only for **packaging fixes, low-hanging-fruit issues, and critical bugfixes**.
>
> **Versioning:** manual, file by file, at release time. No scripts, no automation, no CHANGELOG file. Release notes live directly in the GitHub Release body.
>
> **Inter-package deps in the monorepo:** handled via pnpm `workspace:^` (already in use for `@byloth/vuert` inside `packages/nuxt/package.json`).
>
> **Open GitHub issues** are integrated inline as `(closes #N)`. See the issue map at the bottom.

---

## A. Tooling & monorepo cleanup

- [ ] Remove Lerna: drop `lerna` from root `devDependencies`, delete `lerna.json`, scrub any leftover references in scripts and README badges
- [ ] Verify all inter-package deps in `packages/*/package.json` use the `workspace:^` protocol — `@byloth/vuert` already does in `packages/nuxt`; double-check no other path slipped in
- [ ] Confirm `pnpm-workspace.yaml` and root `package.json` have no Lerna-specific assumptions left after removal
- [ ] Decide whether to add `pnpm test` to the husky `pre-commit` hook (`/.husky/pre-commit`) once tests exist — today it runs only `lint:_all` + `typecheck:_all`

---

## B. Packaging & build modernization

> **Goal:** align Vuert's build with the `@byloth/micro-ecs` template — three build modes (`production` / `development` / `bundler`), DEV-only checks stripped from prod via `import.meta.env.DEV`, types resolved directly from `src/`.

### B.1 — Vite config rewrite

- [ ] Rewrite `packages/core/vite.config.ts` as a `mode`-aware factory (`defineConfig(({ mode }) => ...)`). Three modes:
  - **`production`** (default): minified `cjs` + `iife`, `define: { "import.meta.env.DEV": "false" }`, `emptyOutDir: true`
  - **`development`**: unminified `cjs`, `import.meta.env.DEV` → `"true"`, `emptyOutDir: false`
  - **`bundler`**: unminified `es`, `import.meta.env.DEV` left as-is (`"import.meta.env.DEV"`) so the consumer's bundler decides at their build time, `emptyOutDir: false`
- [ ] Output filenames following the micro-ecs convention: `vuert.prod.cjs`, `vuert.cjs`, `vuert.esm.bundler.js`, `vuert.global.prod.js`
- [ ] Drop UMD entirely. Drop the dev IIFE.
- [ ] Update `scripts.build` in `packages/core/package.json` to: `vite build && vite build --mode bundler && vite build --mode development`

### B.2 — Package metadata & exports map

- [ ] Add root-level `index.js` (CJS fallback wrapper) and `index.mjs` (ESM fallback) at `packages/core/index.{js,mjs}`, mirroring micro-ecs
- [ ] Switch `types` field to `src/index.ts` (types-from-source). Add `src` to the `files` array.
- [ ] Rewrite the `exports` map with Node conditional resolution:
  ```jsonc
  "exports": {
    ".": {
      "import": {
        "types": "./src/index.ts",
        "node": "./index.mjs",
        "default": "./dist/vuert.esm.bundler.js"
      },
      "require": {
        "types": "./src/index.ts",
        "node": {
          "production": "./dist/vuert.prod.cjs",
          "development": "./dist/vuert.cjs",
          "default": "./index.js"
        },
        "default": "./index.js"
      }
    }
  }
  ```
- [ ] **Fix the `module` field bug**: today `"module": "dist/vuert.cjs.js"` (CJS) — must point to the ESM bundler build (`"dist/vuert.esm.bundler.js"`)
- [ ] Add `"sideEffects": false` to enable consumer tree-shaking
- [ ] Validate the final tarball with `@arethetypeswrong/cli` (`pnpm dlx @arethetypeswrong/cli@latest --pack .`) across `node`/`bundler`/`require`/`import`/`types` conditions

### B.3 — Drop the legacy types pipeline

- [ ] **Delete** `scripts.build:types` in `packages/core/package.json`. With types-from-source there is no more `vue-tsc --emitDeclarationOnly && rm -rf ./types && mv ./build/src ./types && rm -rf ./build`.
- [ ] After § C.1 lands (no more `.vue` file in `src/`), evaluate removing `vue-tsc` and `@vitejs/plugin-vue` from devDeps — plain `tsc` for typecheck and Vite's bare config should be enough. Vue itself stays as a peer dep.
- [ ] Update `tsconfig` files so `outDir`/`declaration` settings match the new flow (or are removed if no `.d.ts` are emitted)

### B.4 — Inject `VERSION` at build time

- [ ] Replace the hardcoded `public static readonly VERSION = "1.4.2"` at `packages/core/src/vuert.ts:21` with a build-time `define` placeholder (e.g. `__VUERT_VERSION__`) read from `package.json` in `vite.config.ts`. Eliminates the 5th place where the version had to be bumped.

### B.5 — Use `import.meta.env.DEV` in source for dev-only checks

> The whole point of the three-mode build: validation paths and rich diagnostics live only in DEV.

- [ ] `packages/core/src/models/alert.ts` — wrap the `message + component` mutual-exclusion guard and the `timeout > 0` guard in `if (import.meta.env.DEV)` so PROD doesn't pay the runtime cost
- [ ] `packages/core/src/functions.ts:39` — enrich the `useVuert()` "did you forget the plugin?" error in DEV with hints (where to call `app.use(createVuert())`, link to docs); keep a terse string in PROD
- [ ] `packages/core/src/vuert.ts` — add DEV-only `console.warn` around throttling-suppressed alerts and subscriber routing diagnostics (especially useful for debugging the new no-subscribers / multi-subscribers semantics from § C.2)

### B.6 — Apply (a subset of) the same to `packages/nuxt`

- [ ] Investigate whether `@nuxt/module-builder` exposes a similar DEV/PROD strip mechanism. If yes, mirror the pattern. If not, leave as-is — the Nuxt module is mostly registration code, the runtime cost is negligible.

---

## C. v2 architectural refactor *(BREAKING)*

### C.1 — Replace `AlertHandler.vue` with `useAlertHandler()`

- [ ] Create `packages/core/src/composables/useAlertHandler.ts` — extract the queue, subscription, lifecycle, filter, and slot-prop logic from the deleted SFC
- [ ] Composable signature (proposed): `useAlertHandler<R, P>(options?: { filter?, transitionDuration?, onOpening?, onOpened?, onClosing?, onClosed? }): { context, queue, isOpen, alert, resolve, reject }` — reactive refs ready to be used in any template
- [ ] **Delete** `packages/core/src/components/AlertHandler.vue`
- [ ] **Delete** the `addComponent({ name: "AlertHandler", ... })` call in `packages/nuxt/src/module.ts`
- [ ] Add `addImports({ name: "useAlertHandler", ... })` in the Nuxt module
- [ ] Update `packages/core/src/index.ts`: export `useAlertHandler` instead of `AlertHandler`

### C.2 — Fix `Vuert.emit()` semantics

- [ ] **No-subscribers case** (`vuert.ts:91-97`): instead of throwing `RuntimeException`, queue the alert and replay on the first matching `subscribe()` (configurable via `bufferUnhandled: boolean`, default `true`). Solves the route-transition race in Nuxt apps.
- [ ] **Multiple-subscribers case** (`vuert.ts:98-104`): drop the "max 1 result" assertion. Allow N handlers to handle the same alert. Recommended return shape: `Context[]`, plus a `vuert.emitOne()` convenience that asserts exactly-one.
- [ ] **Throttling** (`vuert.ts:83`): instead of throwing `AlertThrottledException`, return the existing in-flight `Context` if one matches by `id`, or `null` otherwise. New caller pattern: `if (ctx = vuert.emit(...)) await ctx;` instead of `try/catch`.
- [ ] Mark `AlertThrottledException` as `@deprecated` in v2 (still exported), schedule removal for v3.

### C.3 — Models polish & open issues

> All open issues touching the model layer cluster here. Marked **(1.x-friendly)** if additive enough to backport.

- [ ] **#15 — `subtitle?: string` on `Alert`** *(closes #15)* — additive, optional. Trivial. **(1.x-friendly)**
- [ ] **#14 — `autoClose?: boolean` on `Action`** *(closes #14)*, default `true` to preserve current semantics. When `false`, executing the action's callback does not resolve the `Context`. Touches `packages/core/src/models/{action,context}.ts`. **(1.x-friendly)** — adding a new optional field with a backwards-compatible default is non-breaking.
- [ ] **#9 — Fix `AlertCustomOptions` typing/behaviour** *(closes #9)* — today the generic `P` is documented to flow through but doesn't (`packages/core/src/types/alert/index.ts`, `packages/core/src/models/alert.ts`). Make `payload` survive end-to-end through the constructor and preserve the typed `P` shape on `Alert<R, P>`. **(1.x-friendly — bug fix)**
- [ ] **#12 — `size?: "small" | "medium" | "large"` on `Alert`** *(closes #12)* — closed union (no escape hatch), aligned with the wider Vue/CSS ecosystem (MUI / Vuetify / PrimeVue / HTML standard). Intentionally diverges from `Alert.priority`'s `"normal"` middle: dimensions and urgency are different axes and follow different conventions. Optional at the input boundary, defaults to `"medium"` in the `Alert` constructor. Touches `packages/core/src/models/alert.ts` and `packages/core/src/types/alert/core.ts`. **(1.x-friendly — additive)**
- [ ] `Alert.id` SSR safety — switch the default from `Symbol()` (non-serialisable) to a string id (e.g. `crypto.randomUUID()`), keep `symbol` allowed as input
- [ ] `VuertOptions.transitionDuration` default — normalise to `Duration`-shape (`{ enter: 200, leave: 200 }`); today the type is `number | Duration` but the default is `200`
- [ ] `Vuert.options` getter — verify deep clone for object-shaped options (currently `{ ...this._options }` is shallow)
- [ ] Audit every `// eslint-disable @typescript-eslint/no-explicit-any` (`vuert.ts`, `AlertHandler.vue` before deletion) — replace with proper generics where possible

### C.4 — Nuxt module ergonomics

- [ ] Decide if Nuxt 3 is supported in v2 or 4-only (current `compatibility: { nuxt: "^4.0.0" }`). If 3 is supported, broaden to `">=3.13.0 <5"`.
- [ ] Drop the `addComponent` call (component no longer exists). Auto-import only `useVuert` and `useAlertHandler`.
- [ ] Consider auto-importing `Alert`, `Action`, `Context` types via `addTypeTemplate` so consumers don't have to import them manually

---

## D. JSDoc on the public API

Goal: every symbol in `packages/core/src/index.ts` carries a JSDoc block with purpose, `@param`, `@returns`, `@throws`, and at least one `@example`.

- [ ] `Vuert` class — constructor, `emit` overloads, `subscribe`, `options` getter, static `VERSION`/`DEFAULT_OPTS`
- [ ] `Alert` — constructor, all readonly fields, validation invariants
- [ ] `Action` — constructor, fields, the `value` vs `callback` polymorphism, the new `autoClose` semantics from § C.3
- [ ] `Context` — constructor, `open`, `onOpening`/`onOpened`/`onClosing`/`onClosed`, the inherited `DeferredPromise` semantics
- [ ] `createVuert`, `useVuert`, `useAlertHandler`
- [ ] Every exported type: `IAlert`, `AlertOptions`, `SimpleAlert`, `BlockingAlert`, `DismissibleAlert`, `CustomAlert`, `BlockingCustomAlert`, `DismissibleCustomAlert`, `IAction`, `ActionCallback`, `ActionOptions`, `CallbackAction`, `ValueAction`, `VuertOptions`, `VuertSubscriber`, `PluginOptions`, `Duration`
- [ ] Add ESLint rule `jsdoc/require-jsdoc` (or the equivalent in `@byloth/eslint-config-nuxt`) on exported symbols, scoped to `packages/core/src/`

---

## E. Tests & verification — 5 staged sub-projects

> Each stage ships independently. Don't gate stage *N* on stage *N+1*.

### E.1 — Stage 1: core class + models (Vitest, no DOM)

- [ ] Add Vitest to `packages/core` (`vitest`, `@vitest/coverage-v8`)
- [ ] `vitest.config.ts` — share resolve aliases with `vite.config.ts`
- [ ] `pnpm test:core` script + root `pnpm test` aggregator
- [ ] Tests for `Vuert`: subscribe/unsubscribe, emit (0/1/N subscribers — new semantics), throttling (returns existing context, not throws), options merging
- [ ] Tests for `Alert`: defaults, `message` ⊕ `component` mutual-exclusion, invalid `timeout`, action mapping, new `subtitle` (#15), payload + generic-`P` pass-through (#9), `size` acceptance — emit with each of `small`/`medium`/`large` plus default-to-`"medium"` and a TS-only test that an invalid string is rejected (#12)
- [ ] Tests for `Action`: `value` → callback fallback, type defaults, new `autoClose` (#14)
- [ ] Tests for `Context`: open/close lifecycle, timeout auto-resolve, promise resolution with `Action` / `Function` / value, transition durations (number vs `Duration`), reject path, autoClose-false path
- [ ] Verify `import.meta.env.DEV` dev-only paths from § B.5 are exercised in test mode
- [ ] Coverage gate ≥ 85% on `packages/core/src/{vuert,models,exceptions}.ts`
- [ ] Wire into CI (`.github/workflows/template-build.yml` runs `pnpm test:core` before build)

### E.2 — Stage 2: composable + plugin (`@vue/test-utils`)

- [ ] Add `@vue/test-utils` and `happy-dom` (or `jsdom`) to `packages/core` devDependencies
- [ ] Test `useAlertHandler` by mounting it inside a tiny test component: queue ordering, FIFO behaviour, `filter`, lifecycle hook emissions, unmount-time unsubscribe
- [ ] Concurrent vs sequential mode (if § C.1 introduces a `mode: "queue" | "stack"` option)
- [ ] Test `createVuert()` plugin install: `app.config.globalProperties.$vuert`, `provide` injection, `useVuert()` outside a setup scope (uses the `_activeVuert` fallback)
- [ ] Test `useVuert()` throws `RuntimeException` when no plugin installed
- [ ] Coverage gate ≥ 80% on `packages/core/src/{functions,composables}.ts`

### E.3 — Stage 3: Nuxt module (`@nuxt/test-utils`)

- [ ] Add `@nuxt/test-utils` to `packages/nuxt` devDependencies
- [ ] Create `packages/nuxt/test/fixtures/basic/` — a minimal Nuxt app using the module
- [ ] Test that `useVuert` and `useAlertHandler` are auto-imported (no manual import in fixture pages)
- [ ] Test runtime config merging: `nuxt.config.vuert = { throttlingDuration: 50 }` → `runtimeConfig.public.vuert.throttlingDuration === 50`
- [ ] Test `defu` precedence: user `nuxt.config` > module defaults
- [ ] Test plugin instantiates exactly one `Vuert` instance (no double-install across SSR/client)
- [ ] Wire into CI (`pnpm test:nuxt`)

### E.4 — Examples & documentation overhaul

- [ ] **Reposition the README**: lead with "queue + lifecycle manager for alerts/modals/notifications, *bring your own UI*" — distinguish from styled libs (vue-sonner, vue-toastification) and from one-shot composables (`useConfirmDialog`)
- [ ] Add the missing `pages/api/vuert.md` — API reference for the `Vuert` class itself (today API has alert/action/context/alert-handler but not the main class)
- [ ] Replace `pages/api/alert-handler.md` with `pages/api/use-alert-handler.md`
- [ ] Rewrite `pages/guide/how-to/*` for the v2 composable API (each how-to page touches `<AlertHandler>` today)
- [ ] Add `pages/guide/migration/v1-to-v2.md` — step-by-step diff with before/after code blocks for every breaking change in § C
- [ ] Enable VitePress local search (`themeConfig.search.provider = 'local'`)
- [ ] Embed at least one Stackblitz / CodeSandbox example per how-to page

### E.5 — Playground packages

- [ ] Create `packages/playground-vue/` — a minimal Vite + Vue 3 app that imports `@byloth/vuert` directly from the workspace
- [ ] Create `packages/playground-nuxt/` — a Nuxt 4 app that uses `@byloth/nuxt-vuert-module`
- [ ] Showcase: every alert `type`, dismissible vs blocking, with-actions, autoClose-false action, custom-component, theming hook, queue vs stack mode (if introduced)
- [ ] Add root scripts: `pnpm dev:vue`, `pnpm dev:nuxt`
- [ ] Verify `pnpm-workspace.yaml`'s `packages/**` glob already covers playgrounds (yes)

---

## F. Release v2.0.0

- [ ] **Pre-release**: bump versions manually to `2.0.0-next.0` in the 4 `package.json` files (root + `core` + `nuxt` + `docs`); commit; tag `v2.0.0-next.0`; push; create GitHub Release marked as pre-release. Existing `release-npm.yml` already publishes pre-releases under the `next` dist-tag.
- [ ] Run all 5 stages of § E against the pre-release in a real consumer app (smoke-test in a personal project)
- [ ] Verify dual-publish (npm + GPR) works under the new packaging from § B
- [ ] **#7 — Enable npm Provenance** *(closes #7)* — edit `.github/workflows/release-npm.yml`:
  - add `permissions: { contents: read, id-token: write }` to the publish job
  - add `--provenance` to the `npm publish` (or `pnpm publish`) command
  - the project already migrated to npm "Trusted Publisher" / OIDC (see commits `0253671`, `be4c1cc`, `3d0e4a6`, `3c7435a`, `b17b0f3`), so provenance comes basically for free now
- [ ] Write release notes manually in the GitHub Release body (no CHANGELOG.md to consult)
- [ ] Bump versions to `2.0.0` (same manual procedure), tag, publish stable
- [ ] Update README badges and live-docs landing page

---

## GitHub issues quick-map

| Issue | Where in the plan | Type | 1.x-backportable? |
|---|---|---|---|
| **#7** — npm Provenance | § F | CI/release | yes |
| **#9** — `AlertCustomOptions` broken | § C.3 | bug/types | yes (bug fix) |
| **#12** — Alert `size` | § C.3 | feature | yes (additive) |
| **#14** — `autoClose` action option | § C.3 | feature | yes (additive) |
| **#15** — Alert `subtitle` | § C.3 | feature | yes (additive) |

**Low-hanging fruits to ship in 1.4.3 / 1.5.0 before v2 even starts**: #7, #9, #12, #14, #15.

---

## Out of scope (deferred, but tracked here so we don't lose them)

- [ ] Auto-dismiss progress bar — expose `Context.remainingTime` as a `Ref` so consumers can render a countdown without re-implementing the timer
- [ ] Vue DevTools integration (custom inspector showing the alert queue, throttle map, subscriptions)
- [ ] A pluggable transition strategy (CSS-driven vs JS-driven) instead of the current `delay(duration)` hardcoded path in `Context`
- [ ] Theming/preset system as a separate package `@byloth/vuert-presets` (Tailwind, vanilla CSS, etc.) — only if the headless positioning attracts demand for opinionated defaults
