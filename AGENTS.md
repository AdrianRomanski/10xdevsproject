# Repository Guidelines

## Project

white-apron: a personal culinary-progress tracker (log cooked dishes → XP → apron colour gradient black→white). Product requirements live in @context/foundation/prd.md (written in Polish); stack rationale in @context/foundation/tech-stack.md. Key business rule: XP is awarded only once per unique dish+cuisine combination and never goes backwards.

## Workspace layout

Nx 23 monorepo, **npm** (use `npx nx …`). The repo path contains a trailing space (`white-apron /`) — always quote paths in shell commands.

| Project name | Path | Stack | Unit tests |
| --- | --- | --- | --- |
| `@org/api` | `apps/api` | NestJS 11, webpack build, targets inferred + `package.json` `nx` block | Jest (`@nx/jest` plugin) |
| `web` | `apps/web` | Angular 22 standalone, `project.json` | Vitest via `@angular/build:unit-test` |
| `@org/api-e2e` | `apps/api-e2e` | Jest against a running api | — |
| `web-e2e` | `apps/web-e2e` | Playwright (chromium/firefox/webkit), starts `web:serve` itself | — |

Note the naming inconsistency: backend projects use the `@org/` package name, frontend projects use bare names. `libs/`, `packages/`, `tools/` are empty placeholders; shared code should go in an Nx lib (via generator), not be imported across apps.

The frontend and backend talk over `/api`: Nest sets global prefix `api` and listens on `PORT` (default 3000); `apps/web/proxy.conf.json` proxies `/api` → `localhost:3000` during `web:serve`.

## Commands

```sh
npx nx serve @org/api            # http://localhost:3000/api
npx nx serve web                 # http://localhost:4200 (proxies /api)
npx nx run-many -t test          # all unit tests
npx nx test @org/api --testPathPatterns=app.service     # single Jest file
npx nx test web --include='**/app.spec.ts'              # single Vitest file (glob)
npx nx e2e @org/api-e2e          # builds + serves api, then runs Jest e2e
npx nx e2e web-e2e               # Playwright
npx nx run-many -t typecheck
npx nx format:check              # Prettier (singleQuote)
```

CI (`.github/workflows/ci.yml`) runs `nx format:check` then `nx run-many -t lint test build typecheck e2e` on Node 24 with Nx Cloud distribution. No project currently defines a `lint` target (ESLint is not configured), so `lint` is a no-op until one is added.

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Use the Nx MCP tools to list projects, targets and dependencies instead of reading every `project.json` / `package.json` by hand
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: `nx serve/test/build/e2e/typecheck`, `nx run-many`, or `@nx/angular` / `@nx/nest` generator names; DO use it for executor options not already used in this repo's `project.json` / `package.json`
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->
