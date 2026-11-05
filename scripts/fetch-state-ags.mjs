// Fetch the state-AGs board the /state-ags page shows. ModelMirrorAI/state-ags
// rebuilds board.json every day and publishes it as the only file on its
// `board` branch, so this reads the branch head rather than a pinned commit.
// It reads raw.githubusercontent.com only, never the rate-limited REST API, so
// a shared build host cannot exhaust an anonymous quota. Runs before every
// build and fails closed:
// a missing or malformed board stops the build, so Pages keeps the last good
// deploy.
import { mkdir, writeFile } from "node:fs/promises";

const REPO = "ModelMirrorAI/state-ags";
const BRANCH = "board";

async function get(url, accept) {
  const r = await fetch(url, { headers: { accept, "user-agent": "modelmirror.ai-build" } });
  if (!r.ok) throw new Error(`${r.status} fetching ${url}`);
  return r;
}

const board = await (await get(`https://raw.githubusercontent.com/${REPO}/refs/heads/${BRANCH}/board.json`, "application/json")).json();
if (board.method !== "ag-ai-ambition-v1" || !Array.isArray(board.offices) || !Array.isArray(board.actions)) {
  throw new Error(`state-ags: board.json on ${BRANCH} is not an ag-ai-ambition-v1 board`);
}

await mkdir("src/data/state-ags", { recursive: true });
await writeFile("src/data/state-ags/board.json", JSON.stringify(board, null, 2));
await writeFile("src/data/state-ags/source.json", JSON.stringify({ repo: REPO, branch: BRANCH }, null, 2));
console.log(`state-ags: ${board.offices.length} offices, ${board.actions.length} actions as of ${board.as_of} from ${BRANCH}`);
