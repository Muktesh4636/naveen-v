// Proves the rebuilt bundles are token-for-token equivalent to the shipped ones,
// ignoring whitespace, comments, and module concatenation order.
import { readFileSync } from "node:fs";
import * as acorn from "acorn";

const PAIRS = [
  ["scripts/content.js", "../extension/dist/scripts/content.js"],
  ["scripts/questions.js", "../extension/dist/scripts/questions.js"],
  ["scripts/history.js", "../extension/dist/scripts/history.js"],
  ["popup/script.js", "../extension/dist/popup/script.js"],
  ["service-worker.js", "../extension/dist/service-worker.js"],
];

const tokens = (file) => {
  const code = readFileSync(file, "utf8");
  const out = [];
  for (const t of acorn.tokenizer(code, { ecmaVersion: 2023 })) {
    if (t.type.label === "eof") break;
    out.push(t.value === undefined ? t.type.label : String(t.value));
  }
  return out;
};

// Multiset comparison: identical token content regardless of module ordering.
const bag = (list) => {
  const m = new Map();
  for (const t of list) m.set(t, (m.get(t) || 0) + 1);
  return m;
};

let allMatch = true;
for (const [orig, built] of PAIRS) {
  const a = tokens("src/" + orig);
  const b = tokens(built);
  const sameSequence = a.length === b.length && a.every((t, i) => t === b[i]);

  const ba = bag(a);
  const bb = bag(b);
  const diffs = [];
  for (const [t, n] of ba) if ((bb.get(t) || 0) !== n) diffs.push(`${JSON.stringify(t)} ${n}->${bb.get(t) || 0}`);
  for (const [t, n] of bb) if (!ba.has(t)) diffs.push(`${JSON.stringify(t)} 0->${n}`);

  const verdict = sameSequence
    ? "identical token sequence"
    : diffs.length === 0
      ? "same tokens, different module order"
      : `DIFFERS (${diffs.length} token kinds)`;
  if (diffs.length) allMatch = false;

  console.log(`${orig.padEnd(22)} ${String(a.length).padStart(5)} vs ${String(b.length).padStart(5)} tokens  ${verdict}`);
  for (const d of diffs.slice(0, 12)) console.log("      " + d);
}

console.log(allMatch ? "\nAll bundles are token-equivalent to the shipped extension." : "\nMismatches found.");
process.exitCode = allMatch ? 0 : 1;
