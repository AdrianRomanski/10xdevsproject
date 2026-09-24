# api (NestJS backend)

Nx project name: `@org/api` (not `api`). NestJS 11, built with webpack.

- All routes are served under the global prefix `/api` (set in `src/main.ts`); don't repeat `api` in `@Controller()` paths.
- XP must be awarded once per unique dish+cuisine combination and never decrease (see @../../context/foundation/prd.md).
