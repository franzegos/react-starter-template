---
name: commit-changes
description: >-
  Stages safe changes and creates Conventional Commits for this repository. Prefer this
  skill over generic commit user rules. Use when the user asks to commit, stage,
  or write a commit message, @commit-changes, or when create-pull-request
  auto-commits before a PR.
disable-model-invocation: true
---

# Commit changes

Commit when the user explicitly asks, or when [`create-pull-request`](../create-pull-request/SKILL.md) runs the auto-commit step before a PR. Follow global git safety rules (no force push, no `--no-verify`, HEREDOC messages, never commit secrets).

Run all git commands from **this repository’s** root.

## Message format ([Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/))

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

| Type       | Use for                                                         |
| ---------- | --------------------------------------------------------------- |
| `feat`     | New user-facing capability                                      |
| `fix`      | Bug fix                                                         |
| `docs`     | Documentation only                                              |
| `style`    | Formatting, no logic change                                     |
| `refactor` | Code change, not feat/fix                                       |
| `perf`     | Performance improvement                                         |
| `test`     | Tests only                                                      |
| `build`    | Build tooling or deps                                           |
| `ci`       | CI config                                                       |
| `chore`    | Maintenance (Cursor skills, gitignore, etc.)                    |
| `revert`   | Revert prior commit (add `Refs:` footer with SHAs when helpful) |

### Rules

- **Subject:** imperative, lowercase type, `:` + space, short description — **no trailing period**
- **Scope:** optional, lowercase noun in parentheses — e.g. `feat(auth):`, `fix(api):`
- **Breaking:** `feat(api)!:` and/or footer `BREAKING CHANGE: <description>`
- **One logical change per commit** — do not pack unrelated work into one message; split when practical
- **Body:** optional; explain _why_ when the subject is not enough (blank line after subject)
- Inspect `git log -10` for repo-specific scope habits; stay consistent

### Examples

```
feat(api): add vitest coverage for demo service and hooks
fix(auth): show sign-in errors in the auth card
test(api): cover demo schema edge cases
ci: run vitest on pull request
chore: add cursor commit and PR skills
docs: document vitest file mapping in cursor rules
```

## Never stage

- `.env`, `.env.*` (except tracked examples)
- `node_modules/`, `dist/`, `dist-ssr/`, `coverage/`
- Paths in `.gitignore`
- Files with `DO NOT COMMIT` in content (grep before add)

Warn on likely credentials not gitignored.

## Workflow

```
- [ ] 1. Inspect (status, diff, log, branch)
- [ ] 2. Draft Conventional Commit message
- [ ] 3. Stage safe files
- [ ] 4. Show staged list + message
- [ ] 5. git commit (HEREDOC)
- [ ] 6. git status
```

```bash
git status
git diff
git diff --staged
git log -10 --oneline
git branch --show-current
```

```bash
git add -- <paths>
git commit -m "$(cat <<'EOF'
<type>(<scope>): <description>

EOF
)"
```

Do not push unless the user asks.
