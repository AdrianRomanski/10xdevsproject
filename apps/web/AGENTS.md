# web (Angular frontend)

Nx project name: `web`. Standalone Angular 22, SCSS, selector prefix `app-`.

- File naming follows the new Angular style without type suffixes: `app.ts`, `app.html`, `app.scss` (not `app.component.ts`).
- Call the backend with relative `/api/...` URLs; `proxy.conf.json` forwards them to the api during `nx serve web`.
- Specs live next to the file they test (`*.spec.ts`).
- Components that use `HttpClient` need `provideHttpClient()` + `provideHttpClientTesting()` in the spec, or the test makes a real request and fails. Incident: the scaffolded `src/app/app.spec.ts` fails with an unhandled `HttpErrorResponse` for `/api/dishes` because it omits these.
