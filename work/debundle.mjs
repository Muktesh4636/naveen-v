// Splits the shipped esbuild bundles back into the original per-module files,
// using the `// src/<path>` markers esbuild leaves at each module boundary.
//
// Two subtleties this has to respect:
//   1. Bundled code is indented 2 spaces, but multi-line template literals hold
//      content at its own indentation, so dedenting inside one corrupts it.
//   2. A shared module inlined into several bundles can be tree-shaken
//      differently in each, so the copies must be unioned, not picked between.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const BUNDLES = [
  "src/scripts/content.js",
  "src/scripts/questions.js",
  "src/scripts/history.js",
  "src/popup/script.js",
  "src/service-worker.js",
];
const OUT = "reconstructed";
const MARKER = /^ {2}\/\/ (src\/[\w./-]+\.js)$/;
const DECL = /(?:async function|function|var|let|const|class)\s+([A-Za-z_$][\w$]*)/;

const countTicks = (line) => (line.match(/(?<!\\)`/g) || []).length;

function dedentModule(lines) {
  const out = [];
  let inTemplate = false;
  for (const line of lines) {
    out.push(inTemplate || !line.startsWith("  ") ? line : line.slice(2));
    if (countTicks(line) % 2 === 1) inTemplate = !inTemplate;
  }
  return out;
}

// Break a module into top-level blocks keyed by the name each one declares.
function topLevelBlocks(text) {
  const blocks = [];
  let buffer = [];
  let depth = 0;
  let inTemplate = false;
  for (const line of text.split("\n")) {
    buffer.push(line);
    if (!inTemplate) {
      for (const ch of line) {
        if (ch === "{" || ch === "(" || ch === "[") depth++;
        else if (ch === "}" || ch === ")" || ch === "]") depth--;
      }
    }
    if (countTicks(line) % 2 === 1) inTemplate = !inTemplate;
    if (depth === 0 && !inTemplate && line.trim()) {
      blocks.push(buffer.join("\n"));
      buffer = [];
    }
  }
  if (buffer.join("").trim()) blocks.push(buffer.join("\n"));
  return blocks.map((b) => ({ name: b.match(DECL)?.[1] ?? null, text: b }));
}

function union(existing, incoming) {
  const blocks = topLevelBlocks(existing);
  const have = new Set(blocks.map((b) => b.name).filter(Boolean));
  const added = [];
  for (const block of topLevelBlocks(incoming)) {
    if (!block.name || have.has(block.name)) continue;
    have.add(block.name);
    blocks.push(block);
    added.push(block.name);
  }
  return { text: blocks.map((b) => b.text).join("\n").replace(/\n{3,}/g, "\n\n"), added };
}

const written = new Map();

for (const bundle of BUNDLES) {
  const raw = readFileSync(bundle, "utf8");
  const modules = [];
  let current = null;
  for (const line of raw.split("\n")) {
    const hit = line.match(MARKER);
    if (hit) {
      current = { path: hit[1], body: [] };
      modules.push(current);
      continue;
    }
    if (current) current.body.push(line);
  }

  if (modules.length === 0) {
    const target = join(OUT, "src", bundle.split("/").pop());
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, raw);
    console.log(`${bundle}: flat, copied verbatim`);
    continue;
  }

  for (const mod of modules) {
    while (mod.body.length && /^\s*(\}\)\(\);?)?\s*$/.test(mod.body.at(-1))) mod.body.pop();
    let code = dedentModule(mod.body).join("\n").replace(/\n{3,}/g, "\n\n");

    if (written.has(mod.path)) {
      const { text, added } = union(written.get(mod.path), code);
      code = text;
      console.log(
        `  ${mod.path}: merged copy from ${bundle}` +
          (added.length ? ` (+${added.join(", ")})` : " (nothing new)")
      );
    }
    const target = join(OUT, mod.path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, code.replace(/\n*$/, "\n"));
    written.set(mod.path, code);
  }
  console.log(`${bundle}: ${modules.length} modules`);
}

console.log(`\n${written.size} unique modules recovered.`);
