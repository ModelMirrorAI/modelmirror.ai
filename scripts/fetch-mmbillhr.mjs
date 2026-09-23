// Fetch the billable-hours model outputs the site shows, at a pinned commit of
// ModelMirrorAI/mmbillhr. Runs before every build. Bump SHA to update the page.
import { mkdir, writeFile } from "node:fs/promises";

const REPO = "ModelMirrorAI/mmbillhr";
const SHA = "9d8336c3cd5ae95b59b0855f5b5f7b5c3ed215d8";
const RAW = `https://raw.githubusercontent.com/${REPO}/${SHA}/`;

const TABLES = ["01_baseline", "02_elite_firm_mix", "03_sweep_delta", "04_grid_omega_x_delta_ppp_premium"];
const CHARTS = ["headline_leveling_light.svg", "headline_leveling_dark.svg", "headline_leveling.png",
                "sensitivity_premium_light.svg", "sensitivity_premium_dark.svg"];

async function get(path) {
  const r = await fetch(RAW + path);
  if (!r.ok) throw new Error(`${r.status} fetching ${path}`);
  return Buffer.from(await r.arrayBuffer());
}

await mkdir("src/data/mmbillhr", { recursive: true });
await mkdir("public/charts", { recursive: true });
for (const t of TABLES) await writeFile(`src/data/mmbillhr/${t}.csv`, await get(`tables/${t}.csv`));
for (const c of CHARTS) await writeFile(`public/charts/${c}`, await get(`charts/${c}`));
await writeFile("src/data/mmbillhr/source.json", JSON.stringify({ repo: REPO, sha: SHA }, null, 2));
console.log(`mmbillhr: ${TABLES.length} tables, ${CHARTS.length} charts at ${SHA.slice(0, 7)}`);
