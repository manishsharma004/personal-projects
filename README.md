# personal-projects

SvelteKit site that lists personal projects hosted on [GitHub Pages](https://manishsharma004.github.io/).

Live site (after Pages is enabled): `https://manishsharma004.github.io/personal-projects/`

## Requirements

[Bun](https://bun.sh/) only — do not use npm/yarn/pnpm for this repo.

## Commands

```bash
bun install
bun run dev          # http://localhost:5173/
bun run build        # set BASE_PATH=/personal-projects/ for production parity
bun run preview
bun run check
```

Production builds expect:

```bash
BASE_PATH=/personal-projects bun run build
```

## Adding a project

Edit `src/lib/data/projects.ts` with the repo name, description, tags, and live URL.

## Deploy

Copy `docs/github-pages-deploy.workflow.yml` to `.github/workflows/deploy.yml`, then enable **GitHub Pages → GitHub Actions** for this repo. Pushes to `main` run Bun install, check, build, and deploy the `build` folder.
