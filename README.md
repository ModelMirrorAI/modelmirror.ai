# modelmirror.ai

The umbrella site for Model Mirror LLC: one page plus privacy and terms. Static, Astro, Cloudflare Pages. Same skeleton and stylesheet as fedcourts.ai minus the data-fetch step, so there is no rebuild workflow — the site only changes when its content does.

## Editing

Content is MDX under `src/pages/`. Edit in the GitHub UI, open a PR, and Cloudflare Pages attaches a preview URL to the branch. To add a project, copy the `<li>` block in `src/pages/index.mdx`.

## One-time setup

1. Create the repo (public), push this tree, protect `main` (require PR, block force-push and deletion).
2. Cloudflare Pages → connect this repo. Framework preset *Astro*, build `npm run build`, output `dist`, env `NODE_VERSION=22`. Production branch `main`.
3. Add the custom domain `modelmirror.ai` (and `www` redirect).
4. Enable Cloudflare Web Analytics and paste the beacon `<script>` into `src/layouts/Base.astro` at the marked comment.

## Local build (optional)

```bash
npm install && npm run build && npm run preview
```
