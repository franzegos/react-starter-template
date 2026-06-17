---
name: merge-readiness-check
description: >-
  Pre-merge ship review. Covers bugs, edge cases, critical paths, regressions,
  incomplete work, Cursor rules compliance (.cursor/rules), and merge confidence.
  Local pnpm test:run only — never check PR CI. Use when the user asks if work is
  ready to merge, "ready to merge?", edge cases, critical paths, breaking changes,
  "any bugs", "follows cursor rules", or @merge-readiness-check.
disable-model-invocation: true
---

# Merge readiness check

Structured review **before merge**. Goal: surface gaps early so the user can fix them with confidence.

Run from **this repository’s** root. Use the feature branch and stated base branch (default `main`) unless the user specifies otherwise.

If the user asks about **multiple repos**, run this workflow **once per repo** from each root and apply **that repo’s** `.cursor/rules/`.

## Trigger phrases (same intent)

The user may ask in natural language, for example:

- Can you check if there are any edge cases we miss?
- Will there be any issue / critical paths after I merge this?
- Did we miss anything or is there anything we need to consider?
- Is this ready to merge?
- Will this have a bad effect on our existing features?
- Are there any potential bugs in this change?

Treat all of these as this skill. **This review explicitly includes hunting for likely bugs**, not only product gaps and edge cases.

When the user asks **"ready to merge?"**, always answer all **required review dimensions** below — even if none apply, say so explicitly (e.g. "No payment flows touched").

## Issue status labels (required)

Every finding must use **one** status. **Never mix resolved and open items in the same list without labels.**

| Label         | Meaning                                                                         | Where it goes       |
| ------------- | ------------------------------------------------------------------------------- | ------------------- |
| **Resolved**  | Fixed in the current diff or a named commit since the last review               | `### Resolved` only |
| **Blocking**  | Must fix or verify before merge; confirmed defect or unverified acceptance path | `### Blocking` only |
| **Verify**    | Likely OK in code but needs a manual/staging check (not a code change)          | `### Remaining`     |
| **Follow-up** | Acceptable to merge; track after merge                                          | `### Remaining`     |

**On re-review** (user fixed issues or asked again after new commits):

1. Read the **prior** merge-readiness comment or conversation findings.
2. For each prior **Blocking** item: confirm fix in diff → move to **Resolved** (cite commit or file). If not fixed → keep under **Blocking**.
3. Do **not** repeat resolved items under Blocking or dimensional sections unless the fix regressed.

## Required review dimensions ("ready to merge?")

Every verdict **must** include dedicated subsections for:

1. **Edge cases & gaps** — empty states, error toasts, stale cache, race on double-submit, mobile/responsive
2. **Critical paths** — auth, payments/checkout (if applicable), core user flows for this product
3. **Breaking changes** — API assumptions, deploy order (backend first?), feature flags, shared type/schema drift
4. **Cursor rules compliance** — violations in touched code

Do not collapse these into a generic summary — the user expects this checklist every time.

## What this review covers

| Category            | Examples                                                                                                          |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Potential bugs**  | Wrong conditions, stale state, missing `await`, null/undefined slips, off-by-one, inverted logic, wrong hook deps |
| **Edge cases**      | Empty data, errors, races, validation boundaries                                                                  |
| **Regressions**     | Existing features or routes that may break                                                                        |
| **Incomplete work** | TODOs, skipped tests, debug leftovers                                                                             |
| **Critical paths**  | Auth, payments, shared `src/api/client.ts`, high-traffic routes                                                   |
| **Cursor rules**    | Violations of `.cursor/rules/*.mdc` in touched code                                                               |

## Workflow

```
- [ ] 1. Scope the change (diff vs base, conversation plan, touched areas)
- [ ] 2. Incomplete work scan
- [ ] 3. Plan vs implementation (if a plan exists in context)
- [ ] 4. Potential bugs (logic and correctness)
- [ ] 5. Edge cases and error paths
- [ ] 6. Regression / existing features
- [ ] 7. Critical paths (product-specific high-risk areas)
- [ ] 8. Cursor rules compliance (`.cursor/rules/`)
- [ ] 9. Tests and verification (local only)
- [ ] 10. Verdict + prioritized action list
```

### 1. Scope the change

```bash
git fetch origin <base> 2>/dev/null || true
git diff origin/<base>...HEAD --stat
git diff origin/<base>...HEAD
git log origin/<base>..HEAD --oneline
```

List modules/routes/hooks touched. If no git diff (uncommitted only), use `git diff` and staged diff.

### 2. Incomplete work scan

Search the changed tree (and related call sites):

- `TODO`, `FIXME`, `HACK`, `XXX`
- `it.todo`, `test.skip`, `describe.skip`
- `console.log` / `debugger` left for debugging
- Commented-out code blocks that look unfinished
- Feature flags or hardcoded stubs

Report each hit with file path. **Any unresolved item in touched production code → not ready** unless the user explicitly accepts deferring it.

### 3. Plan vs implementation

If the conversation included a plan, checklist, or acceptance criteria:

| Planned item | Status                   | Notes |
| ------------ | ------------------------ | ----- |
| …            | done / partial / missing | …     |

Call out **missing** or **partial** items explicitly.

### 4. Potential bugs (logic and correctness)

Read the diff like a **code review focused on defects**. For each changed function, hook, or handler, look for:

- **Wrong or inverted logic** — `!` mistakes, swapped branches, `&&` vs `||`, early `return` skipping cleanup
- **Stale or wrong state** — missing deps in `useEffect` / `useMemo` / `useCallback`; state synced from props/query in effects; Zustand + Query fighting
- **Effect-heavy pages** — many `useEffect`s in one page component (see `react-state-zustand.mdc`); flag for refactor
- **Async mistakes** — missing `await`, fire-and-forget mutations without error handling, double-submit not guarded
- **Null / undefined** — optional chaining omitted where data can be missing; `array[0]` without length check
- **Types vs runtime** — unsafe casts (`as`), assuming API shape without parse when data is untrusted
- **Wrong identifiers** — copy-paste (wrong variable, wrong query key, wrong route param)
- **Off-by-one / boundaries** — pagination, date ranges, inclusive vs exclusive limits
- **UI logic bugs** — disabled button still clickable, form submits with invalid state, optimistic UI never rolled back on error

Cite **file + line or hunk** when reporting a likely bug. Separate **confirmed defect** from **suspected** (needs manual repro). Confirmed bugs in touched code → **Not ready** unless user accepts the risk.

### 5. Edge cases and error paths

For each changed flow, ask:

- Empty / null / loading / error states in UI
- Invalid API responses, network failure, session expiry (if auth exists)
- Pagination boundaries, duplicate submits, race on rapid clicks
- Zod validation: optional vs nullable vs cleared fields (see `zod-validation.mdc`)
- Query cache: stale data after mutation — are the right keys invalidated?
- Env misconfiguration (`VITE_*` missing in deploy)

### 6. Regression / existing features

- What **existing routes or hooks** import or depend on changed modules?
- Did we change shared types/schemas without updating all consumers?
- Do changes assume a user role or route context that does not always apply?

### 7. Critical paths

Pay extra attention when the diff touches areas **critical for this product** (adapt to the app), for example:

| Area                            | Risk                                              |
| ------------------------------- | ------------------------------------------------- |
| Auth / session                  | Wrong gate, redirect loops, stale session UI      |
| Payments / checkout             | Money movement, method selection, error surfacing |
| `src/api/client.ts`             | Global behavior for all requests                  |
| High-traffic routes / wizards   | Multi-step state, validation, API contract        |
| Zustand drafts + TanStack Query | Stale UI after save or navigation                 |

Cite **N/A** when the diff does not touch relevant flows.

### 8. Cursor rules compliance (required)

**Read every rule file** under `.cursor/rules/` before judging merge readiness. Do not rely on memory — open each `.mdc` and check the diff against it.

| Rule file                 | What to verify on this diff                                                                                                                                                   |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api-layer.mdc`           | Types in `src/api/types/`; Zod in `src/api/schema/`; HTTP in `src/api/services/`; hooks in `src/api/queries/`; pages/components do not call `useQueryClient` for domain cache |
| `zod-validation.mdc`      | `safeParse`/`parse` at boundaries; primitives reuse; optional vs nullable correct for PATCH                                                                                   |
| `vitest-testing.mdc`      | New/changed `src/lib/` or `src/api/` has matching `src/test/…` tests when logic is non-trivial; no `it.todo` in touched tests                                                 |
| `naming-conventions.mdc`  | Lowercase `pages/` folders; PascalCase page files; `use-*.ts` hooks; kebab-case asset filenames                                                                               |
| `icons-and-assets.mdc`    | UI icons via `iconLibrary`; brands via thesvg — no hand-rolled inline SVGs                                                                                                    |
| `react-state-zustand.mdc` | Server data in TanStack Query; minimal `useEffect` in pages; derived state at render; Zustand only when shared                                                                |

In the verdict: **Pass** or **Fail** — list each violation with **rule file + path**; treat as **blocking** unless the user explicitly defers.

### 9. Tests and verification (local only — do not check PR CI)

**Do not** check GitHub PR CI status. Do not run `gh pr checks`, poll GitHub Actions, or wait for Vercel deploy results.

When the diff includes `src/api/`, `src/lib/`, or high-risk UI:

```bash
pnpm exec tsc -b --noEmit
pnpm test:run
```

Also consider `pnpm build` if types/routes changed.

Per `vitest-testing.mdc`: new/changed modules should have matching tests under `src/test/`. Flag missing tests for non-trivial logic.

### 10. Verdict (required format)

Lead with **what changed since last review**, then **what still blocks merge**, then **what is left but non-blocking**.

| Verdict                | When                                                                                         |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| **Ready to merge**     | `### Blocking` is empty (or only **Verify** items you explicitly accept as pre-merge checks) |
| **Ready with caveats** | No code **Blocking** items; **Verify** or **Follow-up** under Remaining                      |
| **Not ready to merge** | One or more **Blocking** items or failed local verification                                  |

```markdown
## Merge readiness

**Verdict: Ready to merge** | **Ready with caveats** | **Not ready to merge**

### At a glance

|                                | Count |
| ------------------------------ | ----- |
| Resolved (this pass)           | N     |
| Blocking                       | N     |
| Remaining (verify + follow-up) | N     |

### Summary

(2–3 sentences — verdict in plain language)

### Resolved

<!-- First review: "None — first review." -->

### Blocking

<!-- Empty → "None." -->

### Remaining

#### Verify before / after merge

#### Follow-up (optional)

---

### Dimensional review

<!-- Do NOT duplicate Blocking/Remaining items here. "No impact." when nothing to say. -->

#### Edge cases & gaps

#### Critical paths

#### Breaking changes

#### Regression risks

#### Cursor rules compliance

### Verification done

- [ ] `pnpm exec tsc -b --noEmit` — pass / fail / not run
- [ ] `pnpm test:run` — pass / fail / not run
- [ ] `pnpm build` — pass / fail / not run (optional)
- PR CI status — **not checked**
```

**Formatting rules**

- **Resolved / Blocking / Remaining** are the only places for actionable findings. Do not list the same issue twice.
- **Dimensional review** is for scope context — not a second bug list.
- First review: `### Resolved` → `None — first review.`
- Be direct. Do not say "looks good" without evidence from diff and searches.
