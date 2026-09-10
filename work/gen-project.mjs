// Turns the de-bundled modules into a real ESM source tree by recovering the
// import/export wiring esbuild erased.
//
// Cross-module references are found with real scope analysis rather than regex:
// only genuinely *free* identifiers can be imports. That distinction matters —
// an object key, a function-local variable, and a token inside a CSS template
// all look like references to a regex but are not.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import * as acorn from "acorn";
import detectGlobals from "acorn-globals";

const FROM = "reconstructed/src";
const TO = "../extension/src";
const PARSE = { ecmaVersion: 2023, sourceType: "script", allowReturnOutsideFunction: false };

const MODULES = [
  "shared/config.js",
  "shared/datetime.js",
  "shared/lifecycle.js",
  "content/styles.js",
  "content/cloudflare.js",
  "content/scheduling-panels.js",
  "content/scheduling-controls.js",
  "content/reporting.js",
  "content/responses.js",
  "content.js",
  "popup.js",
  "questions.js",
  "history.js",
];
const ENTRIES = new Set(["content.js", "popup.js", "questions.js", "history.js"]);

// Names provided by the browser/extension runtime, never by a module.
const AMBIENT = new Set([
  "chrome", "window", "document", "globalThis", "location", "navigator", "console",
  "sessionStorage", "localStorage", "fetch", "setTimeout", "clearTimeout",
  "setInterval", "clearInterval", "Math", "Date", "JSON", "Object", "Array", "Map",
  "Set", "Promise", "String", "Number", "Boolean", "Intl", "URL", "URLSearchParams",
  "AbortController", "DOMParser", "XMLHttpRequest", "Event", "AudioContext",
  "isNaN", "parseInt", "parseFloat", "atob", "btoa", "Error", "TypeError",
]);

function topLevelDecls(ast) {
  const found = [];
  for (const node of ast.body) {
    if (node.type === "FunctionDeclaration" || node.type === "ClassDeclaration") {
      if (node.id) found.push({ name: node.id.name, start: node.start });
    } else if (node.type === "VariableDeclaration") {
      const names = node.declarations.map((d) => d.id.name).filter(Boolean);
      if (names.length) found.push({ name: names[0], start: node.start, names });
    }
  }
  return found;
}

const info = new Map();
const owner = new Map();

for (const mod of MODULES) {
  const code = readFileSync(join(FROM, mod), "utf8");
  const ast = acorn.parse(code, PARSE);
  const decls = topLevelDecls(ast);
  const free = detectGlobals(code, PARSE)
    .map((g) => g.name)
    .filter((n) => !AMBIENT.has(n));
  info.set(mod, { code, decls, free });
  for (const d of decls) {
    for (const name of d.names ?? [d.name]) {
      if (!owner.has(name)) owner.set(name, mod);
    }
  }
}

const importPath = (from, to) => {
  const p = relative(dirname(from), to).replace(/\\/g, "/");
  return p.startsWith(".") ? p : "./" + p;
};

let totalImports = 0;
const unresolved = [];

for (const mod of MODULES) {
  const { code, decls, free } = info.get(mod);

  const needed = new Map();
  for (const name of free) {
    const home = owner.get(name);
    if (!home) {
      unresolved.push(`${mod}: ${name}`);
      continue;
    }
    if (home === mod) continue;
    if (!needed.has(home)) needed.set(home, new Set());
    needed.get(home).add(name);
  }

  const header = [...needed.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([home, names]) => {
      totalImports += names.size;
      return `import { ${[...names].sort().join(", ")} } from "${importPath(mod, home)}";`;
    });

  // Insert `export` by byte offset, back to front, so earlier offsets stay valid.
  let body = code;
  if (!ENTRIES.has(mod)) {
    for (const d of [...decls].sort((a, b) => b.start - a.start)) {
      body = body.slice(0, d.start) + "export " + body.slice(d.start);
    }
  }

  const text = (header.length ? header.join("\n") + "\n\n" : "") + body;
  const target = join(TO, mod);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, text.replace(/\n*$/, "\n"));
  console.log(`${mod.padEnd(32)} ${String(header.length).padStart(2)} import(s), ${decls.length} decl(s)`);
}

const sw = readFileSync(join(FROM, "service-worker.js"), "utf8").replace(/^\/\/ slotext.*\n/, "");
writeFileSync(join(TO, "service-worker.js"), sw);
console.log(`${"service-worker.js".padEnd(32)} self-contained`);

for (const [src, dest] of [
  ["src/popup/index.html", "popup/index.html"],
  ["src/popup/style.css", "popup/style.css"],
  ["src/images/icon-128.png", "images/icon-128.png"],
]) {
  const target = join("../extension/static", dest);
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(src, target);
}

console.log(`\n${MODULES.length + 1} modules, ${totalImports} bindings imported.`);
if (unresolved.length) {
  console.log(`\nUnresolved free identifiers (${unresolved.length}):`);
  for (const u of unresolved) console.log("  " + u);
}
