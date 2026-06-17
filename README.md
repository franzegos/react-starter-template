# cursor-frontend-template

**My personal webapp frontend template** — a public Cursor starter with rules that steer the agent, skills for commits/PRs/reviews, and a codebase structure the agent already understands.

The repo is structured so coding agents follow your conventions instead of improvising every time.

Vite 7 · React 19 · TypeScript · shadcn/ui · TanStack Query · Zustand · Axios · Zod · Vitest

---

## What this is

Cursor rules, skills, and a minimal React app shell:

- **`.cursor/rules/`** — API layer, icons/assets, Zod, Vitest layout, naming, state choices (applied when you work in the repo).
- **`.cursor/skills/`** — Conventional Commits, repo PR template, pre-merge review (invoke in chat).
- **`src/` conventions** — `api/` → services → queries, tests mirrored under `src/test/`, no auth opinions (add per project).

Clone, apply your [shadcn theme](#theming-optional), and build.

---

## Quick start

```bash
pnpm install
cp .env.example .env   # VITE_API_URL — demo uses jsonplaceholder.typicode.com
pnpm dev
```

| Command             |                              |
| ------------------- | ---------------------------- |
| `pnpm build`        | typecheck + production build |
| `pnpm format`       | Prettier write               |
| `pnpm format:check` | Prettier check               |
| `pnpm test:run`     | Vitest once                  |
| `pnpm lint`         | ESLint                       |

---

## Use this template

After cloning for a new app:

- Rename the package, app title, and README heading.
- Set `VITE_API_URL` in `.env` (validated at startup when provided).
- Apply your shadcn theme, then add only the UI components you need.
- Remove the demo page/service/query/tests when real features replace them.
- Tune which Cursor rules are always-on to balance consistency and token use.

CI runs format check, lint, typecheck, tests, and build on PRs and pushes to `main`.

---

## Cursor

Mention a skill plus a few words in chat:

| Skill                    | Example           |
| ------------------------ | ----------------- |
| `@create-pull-request`   | open PR to `main` |
| `@commit-changes`        | commit my changes |
| `@merge-readiness-check` | ready to merge?   |

Skills: `.cursor/skills/` · PR body: `.github/PULL_REQUEST_TEMPLATE.md` (not Cursor’s global PR format).

**`@merge-readiness-check`** runs a full pre-merge workflow (see the skill): trigger phrases like “any edge cases?” or “ready to merge?”, incomplete-work scan, bug hunt, regressions, critical paths, Cursor rules pass/fail, and local `tsc` + `pnpm test:run` — not just a quick skim.

### Rules

| Rule                                                                                              | Default in this template                                                        |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `api-layer`, `naming-conventions`, `react-state-zustand`, `repo-agent-skills`, `icons-and-assets` | **Always apply** — included in every chat                                       |
| `vitest-testing`                                                                                  | **Specific files** — `src/api/**`, `src/lib/**`, `src/test/**`                  |
| `zod-validation`                                                                                  | **Not always** — `@`-mention or enable in rule settings when working on schemas |

**Trade-off:** Always-applied rules improve consistency but use **more tokens per request** (they’re sent as context every time). Tune in Cursor → **Always apply** / **Apply intelligently** / **Apply to specific files** / **Apply manually**; edit or delete rules under `.cursor/rules/` to match your project.

---

## What’s in the box

- Demo page — Zustand counter, TanStack Query + Axios, Sonner, error boundary, dark mode (`next-themes`).
- API scaffold — client with `{ success, data }` unwrap, Zod primitives, example service/query/tests.
- Routing shell — React Router, `ProtectedRoute` (`isAllowed` only; no auth stub).
- **No brand theme** — default shadcn zinc; [apply your own](#theming-optional).

---

## Theming (optional)

Don’t run full `shadcn init` here — it overwrites config. Use [ui.shadcn.com/create](https://ui.shadcn.com/create) (Vite · Radix · monorepo off · RTL off), copy the preset code, then:

```bash
pnpm dlx shadcn@latest apply <preset-code> --only theme -y
pnpm dlx shadcn@latest add card dialog -y
```

`--only theme` → mainly `src/index.css`. Full `apply` may also update `components.json` (including `iconLibrary`). [Docs](https://ui.shadcn.com/docs/cli#apply).

---

## Single app vs monorepo

**Default:** one Vite app (this repo).

**Monorepo** when you share UI across marketing + webapp + admin — scaffold with `pnpm dlx shadcn@latest init --template vite --monorepo` (interactive; run locally), then bring over `.cursor/` and `src/api/` patterns. RTL off unless you need it (`shadcn migrate rtl`).

---

## Stack

React 19, Vite 7, TypeScript, Tailwind v4, shadcn/ui (Radix), React Router, TanStack Query, Zustand, Axios, Zod, Sonner, Vercel Analytics. Node **20+** (`package.json` → `engines`).
