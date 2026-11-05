# modelmirror.ai

The umbrella site for Model Mirror LLC: one page plus privacy and terms. Static, Astro, Cloudflare Pages. Same skeleton and stylesheet as fedcourts.ai. A prebuild step fetches data from other repositories (`scripts/fetch-*.mjs`), so `.github/workflows/rebuild.yml` rebuilds daily: it runs the build first and pokes the Cloudflare Pages deploy hook only if that passes.

## Editing

Content is MDX under `src/pages/`. Edit in the GitHub UI, open a PR, and Cloudflare Pages attaches a preview URL to the branch. To add a project, copy the `<li>` block in `src/pages/index.mdx`.

## One-time setup

1. Create the repo (public), push this tree, protect `main` with a ruleset: require a PR, one approval and the `build` check, merge commits only, block force-push and deletion.
2. Cloudflare Pages → connect this repo. Framework preset *Astro*, build `npm run build`, output `dist`, env `NODE_VERSION=22`. Production branch `main`.
3. Add the custom domain `modelmirror.ai` (and `www` redirect).
4. Enable Cloudflare Web Analytics and paste the beacon `<script>` into `src/layouts/Base.astro` at the marked comment.

## CI

- `build.yml` runs `npm ci && npm run build` on every PR into `main` and on `main`; it is the required `build` check.
- `rebuild.yml` builds daily and then calls the deploy hook, a secret of the `deploy` environment, which only `main` may use.
- `lint-actions.yml` runs zizmor and actionlint on any change under `.github/`. Every action is pinned to a full commit SHA, and Dependabot keeps the pins and npm packages current.
- `CODEOWNERS` requests the maintainer's review on every PR.

## Local build (optional)

```bash
npm install && npm run build && npm run preview
```
