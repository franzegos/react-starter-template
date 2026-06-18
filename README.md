# Personal AI Frontend Template

## Description

My personal production-ready Vite + React starter. Cursor rules, skills, and an app shell agents already understand — feature-first API modules, TanStack Query, shadcn/ui, and guardrails for security, async UX, and forms.

## Key Features

- **Vite 7 + React 19 + TypeScript** — fast dev, strict typecheck in CI
- **Feature-first API layer** — `src/api/features/<domain>/` (service, schema, types, hooks)
- **TanStack Query** — server state, cache, mutations; Zustand for client-only state
- **Zod** — shared primitives + per-feature schemas; env parsing in `config.ts`
- **shadcn/ui** — Radix primitives, semantic tokens, interaction-polish rules
- **React Router** — layout shell, `ProtectedRoute` ready for your auth layer
- **Vitest** — API, lib, and page tests with `renderWithProviders`
- **Cursor rules & skills** — commit, PR, merge-readiness, shadcn MCP
- **Golden-path demo** — `DemoPostSection` models `feature-state`, `error-handling`, `response-mapping`, `async-ui`; `OfflineBanner` for `offline-reconnect`
- **`pnpm verify`** — format, lint, typecheck, test, build (same gates as CI)

## Pre-requisites

| Tool    | Version / notes                             |
| ------- | ------------------------------------------- |
| Node.js | 20+                                         |
| pnpm    | 10 (see `packageManager` in `package.json`) |

## Local Environment Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Set `VITE_API_URL` to your backend (or a mock API for the demo).

### 3. Run the dev server

```bash
pnpm dev
```

| URL                   | What               |
| --------------------- | ------------------ |
| http://localhost:5173 | App (Vite default) |

### 4. Verify before push

```bash
pnpm verify
```

Same pipeline as CI: Prettier, ESLint, `tsc`, Vitest, production build.

### 5. Add a feature

Create a module under `src/api/features/<domain>/`:

```
src/api/features/campaigns/
├── campaigns.service.ts
├── campaigns.schema.ts
├── campaigns.types.ts
└── use-campaigns.ts
```

Add pages under `src/pages/<domain>/`, mappers under `src/lib/<domain>/`. Follow [api-layer](.cursor/rules/api-layer.mdc) and [frontend-feature-boundaries](.cursor/rules/frontend-feature-boundaries.mdc).

Mirror tests under `src/test/api/features/<domain>/` — see [vitest-testing](.cursor/rules/vitest-testing.mdc).

### Useful scripts

| Script          | Purpose                              |
| --------------- | ------------------------------------ |
| `pnpm verify`   | Format, lint, typecheck, test, build |
| `pnpm dev`      | Vite dev server                      |
| `pnpm build`    | Typecheck + production build         |
| `pnpm test:run` | Vitest once                          |
| `pnpm lint`     | ESLint                               |
| `pnpm format`   | Prettier write                       |

## Documentation

| Doc                                                                 | Contents                                                                                          |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [API layer](.cursor/rules/api-layer.mdc)                            | Feature modules, services, Query hooks, OpenAPI-ready layout                                      |
| [Feature boundaries](.cursor/rules/frontend-feature-boundaries.mdc) | Pages, API, lib ownership; no cross-feature imports                                               |
| [Error handling](.cursor/rules/error-handling.mdc)                  | Loading, empty, error, success — no silent blank UI                                               |
| [Forms & drafts](.cursor/rules/forms-and-drafts.mdc)                | Unsaved changes, blockers, autosave, draft recovery                                               |
| [Offline & reconnect](.cursor/rules/offline-reconnect.mdc)          | Sleep, tab resume, reconnect — cached data + retry                                                |
| [Feature state](.cursor/rules/feature-state.mdc)                    | One derived `status` per surface — no boolean spaghetti                                           |
| [Frontend security](.cursor/rules/frontend-security.mdc)            | Permissions are UX only; backend is source of truth                                               |
| [Data ownership](.cursor/rules/data-ownership.mdc)                  | Query vs RHF vs useState vs Zustand                                                               |
| [Interaction polish](.cursor/rules/interaction-polish.mdc)          | Motion, feedback, keyboard, perceived performance                                                 |
| [Incident log](docs/incident-log.md)                                | Track AI mistakes; promote to rules after 3×                                                      |
| [Theming](#theming)                                                 | shadcn Create presets                                                                             |
| [Cursor rules](.cursor/rules/)                                      | Full ruleset — `repo-agent-skills` explains skills; start with `naming-conventions` + `api-layer` |

### Cursor skills

| Skill                    | Example           |
| ------------------------ | ----------------- |
| `@commit-changes`        | commit my changes |
| `@create-pull-request`   | open PR to `main` |
| `@merge-readiness-check` | ready to merge?   |

PR body uses `.github/PULL_REQUEST_TEMPLATE.md` (not Cursor's global PR format).

### Cursor rules (file-scoped)

`accessibility`, `api-layer`, `async-ui`, `data-ownership`, `error-handling`, `feature-state`, `forms-and-drafts`, `frontend-feature-boundaries`, `frontend-security`, `icons-and-assets`, `interaction-polish`, `offline-reconnect`, `performance`, `react-state-zustand`, `response-mapping`, `route-protection`, `shadcn-ui-usage`, `vitest-testing`, `zod-validation`

**Always apply:** `naming-conventions`, `repo-agent-skills`

Tune always-on rules in Cursor settings — they use more tokens per request.

### shadcn/ui

```bash
pnpm dlx shadcn@latest add card dialog -y
```

Prefer installed shadcn components; community registries need your approval before install. Enable the shadcn MCP in `.cursor/mcp.json`.

## Theming

Use [shadcn Create](https://ui.shadcn.com/create) (Vite · Radix), then:

```bash
pnpm dlx shadcn@latest apply <preset-code> --only theme -y
```

`--only theme` updates mainly `src/index.css`. Re-add the pointer block in that file if a theme apply overwrites it. [Docs](https://ui.shadcn.com/docs/cli#apply).

## Stack

React 19, Vite 7, TypeScript, Tailwind v4, shadcn/ui (Radix), React Router, TanStack Query, Zustand, Axios, Zod, Sonner, Vitest.
