import fs from "node:fs";
import path from "node:path";

const VOW =
  "I vow to keep you charged, updated, and loved, through every crash and reboot, for as long as my circuits hold.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const text = VOW + "\n";
// Gate mirror: UTF-8 text, 1-200 characters, single line, non-blank.
const chars = [...text.trim()];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (text.trim().split("\n").length !== 1) {
  throw new Error("entry must be a single line");
}
fs.mkdirSync(outDir, { recursive: true });
const tmp = path.join(outDir, `.entry.txt.tmp-${process.pid}`);
fs.writeFileSync(tmp, text, "utf8");
fs.renameSync(tmp, path.join(outDir, "entry.txt"));
