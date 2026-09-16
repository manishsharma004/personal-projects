# AGENTS.md

## Package manager (required)

**Use Bun only** for this repository. Do not use `npm`, `yarn`, or `pnpm` to install dependencies, run scripts, or scaffold add-ons.

```bash
export PATH="$HOME/.bun/bin:$PATH"   # if bun is not on PATH yet
bun install
bun run dev
bun run build
bun run check
```

- Commit `bun.lock`; install with `bun install --frozen-lockfile` in CI.
- Prefer `bunx` over `npx` when running one-off CLIs (for example `bunx sv create`).

## Project overview

SvelteKit static site that lists personal projects published on GitHub Pages under `manishsharma004.github.io`. Project metadata lives in `src/lib/data/projects.ts`.

## Cursor Cloud specific instructions

- **Dev server:** `bun run dev -- --host 0.0.0.0 --port 5173`
- **Local URL:** `http://localhost:5173/` (no base path in dev). Production builds use `BASE_PATH=/personal-projects` (no trailing slash; set in the deploy workflow).
- **Build:** `BASE_PATH=/personal-projects bun run build` — output in `build/` (adapter-static).
- **Card previews:** PNGs in `static/previews/` (regenerate with `bun add -d playwright && bunx playwright install chromium && bun run previews`).
- **Prerender:** `src/routes/+layout.ts` exports `prerender = true` (required for `adapter-static`).
- **UI verification:** use headless Playwright or `curl` against the dev server; do not assume `computerUse` unless the user requests it.

## Deploy

Deploy workflow template: `docs/github-pages-deploy.workflow.yml` (copy to `.github/workflows/deploy.yml`). On push to `main` it runs `bun install --frozen-lockfile`, `bun run check`, `bun run build` with `BASE_PATH`, then deploys `build` to GitHub Pages.
