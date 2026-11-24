import * as fs from "node:fs";
import * as path from "node:path";

// One-line cat review entry: writes the line verbatim to entry.txt.
// Output dir: $MAKEFUN_OUTPUT_DIR first, then /output, then ./output.
const LINE = `1/5. Terrible host. Left me on cold kitchen tile when a hairball hit, forcing me to sprint 60 feet mid-heave to his cream wool rug. Then he screamed "That's a $400 rug!" instead of offering water.`;

const candidates: string[] = [];
const envDir = process.env.MAKEFUN_OUTPUT_DIR;
if (envDir) {
  candidates.push(envDir);
}
candidates.push("/output");
candidates.push(path.join(process.cwd(), "output"));

let written = false;
let lastError: unknown = null;
for (const dir of candidates) {
  try {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "entry.txt"), LINE, "utf8");
    written = true;
    break;
  } catch (err) {
    lastError = err;
  }
}
if (!written) {
  throw lastError instanceof Error
    ? lastError
    : new Error("could not write entry.txt");
}
