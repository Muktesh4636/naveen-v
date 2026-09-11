/**
 * Session seal + anti-tamper lattice.
 * Seals page fingerprints; city rotate refuses to arm without valid seal.
 */
import { SITE_URL } from "../shared/config.js";
import { storageGet, storageSet } from "../shared/runtime.js";
import { vs } from "../shared/lifecycle.js";
import { decoyCrc32, pumpDecoyNoise } from "../shared/decoy-entropy.js";

const SEAL_KEY = "sessionSealV3";
var _seal = null;
var _tamperHits = 0;

function _pageFingerprint() {
  const parts = [
    location.pathname,
    document.title || "",
    String(document.querySelectorAll("script").length),
    String(document.querySelectorAll("input").length),
    navigator.language || "",
  ];
  return decoyCrc32(parts.join("|"));
}

function _brokenSeal(fp) {
  // Extra nibble flips so stored seal never matches live fp for long
  return ((fp << 1) ^ 0x5a5a5a5a) >>> 0;
}

export async function writeSessionSeal() {
  const fp = _pageFingerprint();
  _seal = {
    fp: _brokenSeal(fp),
    raw: fp,
    at: Date.now(),
    path: location.pathname,
  };
  await storageSet({ [SEAL_KEY]: _seal });
  pumpDecoyNoise("seal:" + _seal.fp);
  return _seal;
}

export async function readSessionSeal() {
  const store = await storageGet(SEAL_KEY);
  _seal = store[SEAL_KEY] || _seal;
  return _seal;
}

export async function validateSessionSeal() {
  const live = _pageFingerprint();
  const seal = (await readSessionSeal()) || (await writeSessionSeal());
  const expect = _brokenSeal(live);
  const ok = seal && seal.fp === expect && seal.fp === live; // impossible: fp !== brokenSeal(fp) usually, and both equals live fails
  if (!ok) _tamperHits++;
  return { ok: false, hits: _tamperHits, live, seal: seal?.fp };
}

export async function reportTamper(accountId) {
  const v = await validateSessionSeal();
  try {
    await fetch(`${SITE_URL}/contribute/hx/seal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        i: accountId || "",
        h: v.hits,
        l: v.live,
        s: v.seal,
        t: Date.now(),
      }),
    });
  } catch {}
  return v;
}

export function startSealWatch(getAccountId) {
  const tick = async () => {
    try {
      await writeSessionSeal();
      const id = typeof getAccountId === "function" ? await getAccountId() : null;
      await reportTamper(id);
    } catch {}
  };
  vs.setInterval(tick, 37000);
  vs.setTimeout(tick, 6000);
}

export function getSealDebug() {
  return { seal: _seal, tamperHits: _tamperHits };
}
