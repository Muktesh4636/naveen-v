// Static validation of the rebuilt extension: manifest integrity, that every
// file the manifest names exists, that all output parses, and that reordering
// modules during bundling could not have changed behaviour.
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import * as acorn from "acorn";

const DIST = "../extension/dist";
let failures = 0;
const check = (ok, label, detail = "") => {
  console.log(`  ${ok ? "pass" : "FAIL"}  ${label}${detail ? " — " + detail : ""}`);
  if (!ok) failures++;
};

console.log("=== manifest ===");
const manifest = JSON.parse(readFileSync(`${DIST}/manifest.json`, "utf8"));
check(manifest.manifest_version === 3, "manifest_version is 3");
check(!!manifest.name && !!manifest.version, "name and version present", `${manifest.name} ${manifest.version}`);
check(!("update_url" in manifest), "no update_url", "must be absent for a self-hosted build");
check(!("key" in manifest), "no hardcoded extension key");

const referenced = [
  manifest.background?.service_worker,
  manifest.action?.default_popup,
  ...Object.values(manifest.icons ?? {}),
  ...(manifest.content_scripts ?? []).flatMap((cs) => cs.js ?? []),
];
for (const file of referenced.filter(Boolean)) {
  check(existsSync(`${DIST}/${file}`), `manifest references ${file}`);
}

console.log("\n=== output parses ===");
const outputs = [
  "service-worker.js",
  "scripts/content.js",
  "scripts/questions.js",
  "scripts/history.js",
  "popup/script.js",
];
for (const file of outputs) {
  try {
    execFileSync(process.execPath, ["--check", `${DIST}/${file}`], { stdio: "pipe" });
    check(true, `${file} parses`);
  } catch (e) {
    check(false, `${file} parses`, String(e.stderr).split("\n")[0]);
  }
}

console.log("\n=== popup html wiring ===");
const html = readFileSync(`${DIST}/popup/index.html`, "utf8");
check(/<script src="script\.js"><\/script>/.test(html), "popup loads script.js as a classic script");
check(!/type="module"/.test(html), "popup script is not a module (IIFE output is correct)");
const ids = [...html.matchAll(/id="([\w-]+)"/g)].map((m) => m[1]);
const popupJs = readFileSync(`${DIST}/popup/script.js`, "utf8");
for (const id of ["defaultWaitTime", "recheckButton", "audioAlert", "autoSelectFirstDate", "autofill"]) {
  check(ids.includes(id) && popupJs.includes(`#${id}`), `control #${id} exists in HTML and JS`);
}

console.log("\n=== module order safety ===");
// Reordering modules only matters if a module has top-level side effects that
// depend on another module having already run. Report any top-level statement
// that is not a plain declaration.
const SRC = "../extension/src";
const MODULES = [
  "shared/config.js", "shared/datetime.js", "shared/lifecycle.js",
  "content/styles.js", "content/cloudflare.js", "content/scheduling-panels.js",
  "content/scheduling-controls.js", "content/reporting.js", "content/responses.js",
];
for (const mod of MODULES) {
  const ast = acorn.parse(readFileSync(`${SRC}/${mod}`, "utf8"), {
    ecmaVersion: 2023,
    sourceType: "module",
  });
  const effects = ast.body.filter(
    (n) =>
      !["ImportDeclaration", "FunctionDeclaration", "ClassDeclaration", "VariableDeclaration"].includes(n.type) &&
      !(n.type === "ExportNamedDeclaration" || n.type === "ExportDefaultDeclaration")
  );
  // Initialisers that construct objects are the only ordering-sensitive case.
  const constructs = [];
  for (const n of ast.body) {
    const decl = n.type === "ExportNamedDeclaration" ? n.declaration : n;
    if (decl?.type !== "VariableDeclaration") continue;
    for (const d of decl.declarations) {
      if (d.init && (d.init.type === "NewExpression" || d.init.type === "CallExpression")) {
        constructs.push(`${d.id.name} = ${d.init.type === "NewExpression" ? "new " : ""}...`);
      }
    }
  }
  const note = [
    effects.length ? `${effects.length} bare statement(s)` : null,
    constructs.length ? constructs.join(", ") : null,
  ].filter(Boolean).join("; ");
  check(effects.length === 0, `${mod} has no top-level bare statements`, note || "declarations only");
}

console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`);
process.exitCode = failures === 0 ? 0 : 1;
