# personal-ai-frontend-template

**My personal webapp frontend template** — Cursor rules, skills, and a React app shell agents already understand.

Vite 7 · React 19 · TypeScript · shadcn/ui · TanStack Query · Zustand · Axios · Zod · Vitest

---

## Quick start

```bash
pnpm install
cp .env.example .env
pnpm dev
```

| Command             |                              |
| ------------------- | ---------------------------- |
| `pnpm build`        | typecheck + production build |
| `pnpm test:run`     | Vitest once                  |
| `pnpm lint`         | ESLint                       |
| `pnpm format:check` | Prettier check               |

---

## First steps

1. Rename the package, app title, and README heading.
2. Set `VITE_API_URL` in `.env`.
3. Apply your [shadcn theme](#theming).
4. Remove the demo page when real features replace it.
5. Tune which Cursor rules are always-on (see below).

---

## What's included

**Cursor**

- `.cursor/rules/` — API, naming, state, Zod, Vitest, shadcn UI, icons
- `.cursor/skills/` — commit, PR, merge-readiness, shadcn
- `.cursor/mcp.json` — shadcn registry MCP (enable in Cursor settings)

**App**

- Demo home page — Zustand, TanStack Query, Sonner, error boundary, dark mode
- API scaffold — Axios client, Zod primitives, example service/query/tests
- Routing shell — React Router, minimal `ProtectedRoute`
- Default shadcn theme — [apply your own](#theming)

---

## Cursor

### Skills

| Skill                    | Example           |
| ------------------------ | ----------------- |
| `@commit-changes`        | commit my changes |
| `@create-pull-request`   | open PR to `main` |
| `@merge-readiness-check` | ready to merge?   |

PR body uses `.github/PULL_REQUEST_TEMPLATE.md` (not Cursor's global PR format).

### Rules

| Scope            | Rules                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| **Always apply** | `naming-conventions`, `repo-agent-skills`                                                                     |
| **File-scoped**  | `api-layer`, `icons-and-assets`, `react-state-zustand`, `shadcn-ui-usage`, `vitest-testing`, `zod-validation` |

Details: `.cursor/rules/`. Always-on rules use more tokens per request — tune in Cursor rule settings.

### shadcn/ui

- Prefer installed shadcn components; install native ones as needed.
- Community registries: agent suggests a fit first, you approve before install.
- Pointer cursor for buttons is already in `src/index.css`.

```bash
pnpm dlx shadcn@latest add card dialog -y
```

---

## Theming

Use [shadcn Create](https://ui.shadcn.com/create) (Vite · Radix), then:

```bash
pnpm dlx shadcn@latest apply <preset-code> --only theme -y
```

`--only theme` updates mainly `src/index.css`. Re-add the pointer block in that file if a theme apply overwrites it. [Docs](https://ui.shadcn.com/docs/cli#apply).

---

## Stack

React 19, Vite 7, TypeScript, Tailwind v4, shadcn/ui (Radix), React Router, TanStack Query, Zustand, Axios, Zod, Sonner. Node **20+**.
