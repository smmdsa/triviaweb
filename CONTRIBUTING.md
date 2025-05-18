# Contributing to PRD-Tech

Thanks for taking the time to contribute! Please follow these guidelines.

## Branching
* `main` – production
* `develop` – pre-prod
* Feature branches: `feat/<scope>/<ticket>`

## Commit Convention (Conventional Commits)
```
<type>(<scope>): <subject>

<body>
```
Types: feat, fix, docs, style, refactor, test, chore.

## Pull Requests
1. Open against `develop` (unless hot-fix to `main`).
2. Ensure `pnpm lint && pnpm test && pnpm build` pass.
3. Add reviewers and link Jira/GitHub issue.
4. Wait for 2 approvals.

## Running Locally
```bash
pnpm i
pnpm dev        # turbo dev across all apps
```

## Code Style
* Prettier enforced, ESLint strict.
* 100 % TypeScript.

## DOD (Definition of Done)
* Code typed
* Lint passes
* Tests green (unit + e2e where relevant)
* Preview deployed
* PR approved ×2