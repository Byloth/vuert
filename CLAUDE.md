# Vuert

Headless alerts / modals / notifications / popups library for **Vue 3** and **Nuxt 4**.
Long-running personal project by Matteo Bilotta (`@Byloth`).
Live docs: <https://byloth.github.io/vuert/>.

Published as two packages on **npm** and the **GitHub Package Registry**:

- `@byloth/vuert` (the core library)
- `@byloth/nuxt-vuert-module` (the Nuxt 4 module wrapper)

## Repo layout

`pnpm` workspace + **Lerna 9**. All workspace versions are kept in lockstep — currently `1.4.2`. Bumping a version means updating *all four* of:

- `package.json` (root)
- `lerna.json`
- `packages/core/package.json`
- `packages/nuxt/package.json`
- `packages/docs/package.json`

```
packages/
├── core/   → @byloth/vuert                — the Vue 3 library
├── nuxt/   → @byloth/nuxt-vuert-module    — Nuxt 4 module wrapping core
└── docs/   → VitePress site (deployed to GitHub Pages)
```

The root `postinstall` runs `build:core`, so `nuxt` and `docs` can always resolve the workspace dep on a fresh clone.

## Tech stack

- **Vue** `^3.5.34`, **Nuxt** `^4.4.4`
- **Vite** `^8.0.10`, **TypeScript** `^6.0.3`, **vue-tsc** `^3.2.8`
- **Node 24** (pinned in CI workflows; no `.nvmrc`), **pnpm**
- ESLint flat config using `@byloth/eslint-config-nuxt`
- Peer deps on Matteo's own libraries: `@byloth/core` `^2.2.7`, `@byloth/exceptions` `^2.3.1`

There is **no test runner** configured — neither Vitest, Jest, nor Playwright. Verification is via `lint` + `typecheck` + a manual build.

## Core architecture (`packages/core`)

Public surface is re-exported from `packages/core/src/index.ts`.

| Symbol | File | Role |
|---|---|---|
| `Vuert` | `src/vuert.ts` | Pub/sub publisher; built-in throttling (default `100 ms`). `emit<R>(alert): Context<R>` and `subscribe(subscriber): unsubscribe`. |
| `Alert` | `src/models/alert.ts` | Immutable data model: id, type, priority, icon, title, message / component, payload, actions, dismissible, timeout. |
| `Action` | `src/models/action.ts` | Button model: id, type, icon, label, callback. |
| `Context` | `src/models/context.ts` | `DeferredPromise` wrapping the alert lifecycle (`opening` / `opened` / `closing` / `closed`, configurable transition durations, auto-timeout). |
| `AlertHandler` | `src/components/AlertHandler.vue` | Headless subscriber SFC the host app renders to actually display alerts. |
| `createVuert(options)` / `useVuert()` | `src/functions.ts` | Vue plugin factory + composable. |
| `AlertThrottledException` | `src/exceptions.ts` | Thrown when an emit is dropped by throttling. |

The library is **headless**: it ships state and lifecycle, not styling. Consumers render their own UI inside `AlertHandler`.

## Nuxt module (`packages/nuxt`)

- Entry: `packages/nuxt/src/module.ts` — registers `AlertHandler` as a global component, auto-imports `useVuert`, and adds the runtime plugin.
- Runtime plugin: `packages/nuxt/src/runtime/plugin.ts` — instantiates Vuert from `runtimeConfig.public.vuert`, merged with defaults via `defu`.
- Nuxt config key: `vuert`. Accepts `useThrottling: boolean`, `throttlingDuration: number`, `transitionDuration: number | Duration`.
- Built with `@nuxt/module-builder` → `dist/module.mjs` + `dist/types.d.mts`.

## Docs (`packages/docs`)

VitePress site. Pages live under `packages/docs/pages/` (`api/`, `config/`, `guide/how-to/`, `guide/nuxt/`). Auto-deployed to GitHub Pages on every push to `master`.

## Common scripts

Run from the repo root:

```bash
pnpm build           # build core then nuxt
pnpm build:core      # …or a single package
pnpm build:nuxt
pnpm build:docs
pnpm build:_all      # build + docs

pnpm typecheck       # core + nuxt
pnpm typecheck:_all  # + docs

pnpm lint            # core + nuxt
pnpm lint:_all       # + docs

pnpm ci              # frozen-lockfile install (used by CI)
```

`build` outputs for `core` are 4 formats via Vite: `dist/vuert.esm.js`, `dist/vuert.cjs.js`, `dist/vuert.umd.cjs`, `dist/vuert.global.js`, plus types.

## Git hooks & CI

- **Husky pre-commit** (`.husky/pre-commit`): runs `lint:_all` under `NODE_ENV=production`, then `typecheck:_all`. Do **not** bypass with `--no-verify` — fix the underlying issue.
- `.github/workflows/`:
  - `template-build.yml` — reusable: lint + typecheck + build core & nuxt, uploads artifacts.
  - `release-npm.yml` — on GitHub Release publish: calls `template-build`, publishes both packages to **npm** (uses npm Trusted Publisher / OIDC — recently migrated, see commit history).
  - `release-gpr.yml` — same, to **GitHub Package Registry**.
  - `docs-deploy.yml` — on push to `master`: builds VitePress and deploys to GitHub Pages.
  - Pre-releases publish under the `next` dist-tag.

## Conventions

- **Commit messages** follow a short prefix style observed in history: `fix:`, `imp:` (improvement), `feat:`, `docs:`, etc. Match this — don't switch to plain Conventional Commits without asking.
- **Language**: source code, comments, README, docs, and commits are in **English**. Matteo often chats in Italian; respond in his language but keep written artifacts in English.
- **No tests** exist. If asked to add behaviour, lean on `typecheck` and a manual build for confidence; only introduce a test framework if Matteo explicitly asks.
- The three workspace packages are **versioned together** — never bump just one.
