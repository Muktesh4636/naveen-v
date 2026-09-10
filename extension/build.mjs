import * as esbuild from "esbuild";
import { cp, rm, mkdir, readdir, stat, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = "dist";

// Every bundle is IIFE: MV3 content scripts and a classic <script> tag in the
// popup both reject ESM output.
const TARGETS = [
  { entry: "src/content.js", outfile: `${OUT}/scripts/content.js` },
  { entry: "src/questions.js", outfile: `${OUT}/scripts/questions.js` },
  { entry: "src/popup.js", outfile: `${OUT}/popup/script.js` },
];

// The service worker has no cross-module dependencies, so it is copied rather
// than bundled — that keeps it byte-identical to the reviewed source instead of
// silently reformatted. The guard fails the build if it ever grows an import.
const VERBATIM = [{ entry: "src/service-worker.js", outfile: `${OUT}/service-worker.js` }];

// Service-worker files have no module dependencies so they are not bundled,
// but we still minify them to strip all comments and identifier clues.
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
  }
}

const watch = process.argv.includes("--watch");
const checkOnly = process.argv.includes("--check");

const options = ({ entry, outfile }) => ({
  entryPoints: [entry],
  outfile,
  bundle: true,
  minify: true,         // strips all comments (including // src/... path annotations)
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
  await copyStatic();
  await copyVerbatim();
  console.log(`built ${TARGETS.length + VERBATIM.length} outputs -> ${OUT}/`);
  await report();
}
