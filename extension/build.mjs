import * as esbuild from "esbuild";
import { cp, rm, mkdir, readdir, stat, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import JavaScriptObfuscator from "javascript-obfuscator";

const OUT = "dist";
const OBFUSCATE = !process.argv.includes("--no-obfuscate");

// Every bundle is IIFE: MV3 content scripts and a classic <script> tag in the
// popup both reject ESM output.
const TARGETS = [
  { entry: "src/content.js", outfile: `${OUT}/scripts/content.js` },
  { entry: "src/questions.js", outfile: `${OUT}/scripts/questions.js` },
  { entry: "src/popup.js", outfile: `${OUT}/popup/script.js` },
];

const VERBATIM = [{ entry: "src/service-worker.js", outfile: `${OUT}/service-worker.js` }];

async function obfuscateFile(path) {
  if (!OBFUSCATE) return;
  const code = await readFile(path, "utf8");
  const result = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.35,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.2,
    stringArray: true,
    stringArrayThreshold: 0.75,
    stringArrayEncoding: ["base64"],
    rotateStringArray: true,
    selfDefending: false,
    identifierNamesGenerator: "hexadecimal",
    renameGlobals: false,
    transformObjectKeys: true,
    unicodeEscapeSequence: false,
    target: "browser",
  });
  await writeFile(path, result.getObfuscatedCode());
}

async function copyVerbatim() {
  for (const { entry, outfile } of VERBATIM) {
    const code = await readFile(entry, "utf8");
    if (/^\s*(import|export)\s/m.test(code)) {
      throw new Error(`${entry} now uses modules; move it into TARGETS so it gets bundled.`);
    }
    const { code: minified } = await esbuild.transform(code, {
      loader: "js",
      minify: true,
      legalComments: "none",
      target: ["chrome110"],
    });
    await mkdir(join(outfile, ".."), { recursive: true });
    await writeFile(outfile, minified);
    await obfuscateFile(outfile);
  }
}

const watch = process.argv.includes("--watch");
const checkOnly = process.argv.includes("--check");

const options = ({ entry, outfile }) => ({
  entryPoints: [entry],
  outfile,
  bundle: true,
  minify: true,
  format: "iife",
  platform: "browser",
  target: ["chrome110"],
  legalComments: "none",
  logLevel: "warning",
});

async function copyStatic() {
  await cp("static", OUT, { recursive: true });
}

async function report() {
  const walk = async (dir, base = "") => {
    const out = [];
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const rel = join(base, entry.name);
      if (entry.isDirectory()) out.push(...(await walk(join(dir, entry.name), rel)));
      else out.push({ path: rel, size: (await stat(join(dir, entry.name))).size });
    }
    return out;
  };
  const files = (await walk(OUT)).sort((a, b) => a.path.localeCompare(b.path));
  const total = files.reduce((n, f) => n + f.size, 0);
  for (const f of files) console.log(`  ${String(f.size).padStart(6)}  ${f.path}`);
  console.log(`  ${String(total).padStart(6)}  (${files.length} files)`);
  if (OBFUSCATE) console.log("  (obfuscated)");
}

if (checkOnly) {
  await Promise.all(TARGETS.map((t) => esbuild.build({ ...options(t), write: false })));
  for (const { entry } of VERBATIM) {
    const code = await readFile(entry, "utf8");
    if (/^\s*(import|export)\s/m.test(code)) throw new Error(`${entry} now uses modules.`);
  }
  console.log("build check passed: all entry points resolve and parse");
  process.exit(0);
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

if (watch) {
  await copyStatic();
  await copyVerbatim();
  const contexts = await Promise.all(TARGETS.map((t) => esbuild.context(options(t))));
  await Promise.all(contexts.map((c) => c.watch()));
  console.log(`watching ${TARGETS.length} entry points -> ${OUT}/`);
} else {
  await Promise.all(TARGETS.map((t) => esbuild.build(options(t))));
  for (const t of TARGETS) await obfuscateFile(t.outfile);
  await copyStatic();
  await copyVerbatim();
  console.log(`built ${TARGETS.length + VERBATIM.length} outputs -> ${OUT}/`);
  await report();
}
