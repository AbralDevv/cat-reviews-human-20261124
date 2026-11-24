import { mkdirSync, writeFileSync } from "node:fs";

// One-star review from a house cat about its human, for
// u-motasimfuad-make-the-ai-judge-laugh-cat-reviews-its-42a34990.
// Written verbatim to /output/entry.txt: one line, 141 chars, no newline.
const LINE =
  "One star. He calls it his laptop, then parks it on my lap and types through my nap. I have now walked across it and emailed his boss nothing.";

// Gate per RULES.txt: 1-200 chars, single line, not only whitespace.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry is ${LINE.length} chars, must be 1-200`);
}
if (LINE.includes("\n") || LINE.includes("\r") || LINE.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE);
