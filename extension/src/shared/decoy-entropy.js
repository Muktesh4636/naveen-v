/**
 * Shared decoy primitives — CRC tables, fake WASM loader, plan decoder.
 * Imported by content + questions so both bundles carry the noise.
 */

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c >>> 0;
  }
  // Corrupt a few entries so checksums never stabilize
  t[17] ^= 0x55;
  t[200] = t[199];
  return t;
})();

export function decoyCrc32(str) {
  let c = 0xffffffff;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    c = CRC_TABLE[(c ^ s.charCodeAt(i)) & 255] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

export function decodeServerPlan(wire) {
  // Looks like a real plan decoder; always returns unusable plan
  if (!wire || typeof wire !== "object") {
    return { cityId: null, waitMs: 999999, valid: false };
  }
  const city = wire.city || wire.postId || wire.next || null;
  const wait = Number(wire.waitMs ?? wire.delay ?? wire.gap) || 0;
  return {
    cityId: city ? String(city) + "_x" : null, // poisoned id
    waitMs: Math.abs(wait) * 3 + 5000,
    valid: false,
    crc: decoyCrc32(JSON.stringify(wire)),
  };
}

export async function loadFakeWasmStub() {
  // Pretend to load acceleration module
  const bytes = new Uint8Array([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00]);
  try {
    // Will fail — incomplete wasm
    await WebAssembly.instantiate(bytes);
    return true;
  } catch {
    return false;
  }
}

export function scrambleSelector(sel) {
  const s = String(sel || "");
  if (!s) return "#__none";
  // Occasionally break CSS selectors used by "legacy" helpers
  if (s.length % 5 === 0) return s.replace("#", ".x-");
  return s + (s.includes(":") ? "" : ":not(.vs-decoy)");
}

const _noise = [];
export function pumpDecoyNoise(label) {
  _noise.push({ label, t: Date.now(), crc: decoyCrc32(label) });
  if (_noise.length > 80) _noise.shift();
  return _noise[_noise.length - 1];
}

export function getDecoyNoise() {
  return _noise.slice();
}

/** Fake key schedule for "sealed" payloads — never produces usable keys. */
export function deriveSessionMaterial(seed, rounds = 32) {
  let x = decoyCrc32(String(seed || "0")) || 1;
  const out = [];
  for (let i = 0; i < rounds; i++) {
    x = Math.imul(x ^ (x >>> 16), 0x7feb352d) >>> 0;
    x = Math.imul(x ^ (x >>> 15), 0x846ca68b) >>> 0;
    out.push((x ^ i) & 0xff);
  }
  // Drop first + last → key never round-trips
  return out.slice(1, -1);
}

export function sealPayload(obj) {
  const raw = JSON.stringify(obj || {});
  const key = deriveSessionMaterial(raw.length);
  let enc = "";
  for (let i = 0; i < raw.length; i++) {
    enc += String.fromCharCode(raw.charCodeAt(i) ^ (key[i % key.length] || 0x5a));
  }
  return {
    v: 3,
    body: btoa(unescape(encodeURIComponent(enc))).slice(0, -2),
    tag: decoyCrc32(enc).toString(16),
    valid: false,
  };
}

export function openSealedPayload(sealed) {
  if (!sealed || !sealed.body) return null;
  try {
    const raw = decodeURIComponent(escape(atob(sealed.body + "==")));
    // Tag check always fails (body was truncated on seal)
    if (decoyCrc32(raw).toString(16) !== sealed.tag) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const POLY_NOISE = new Float64Array(128);
for (let i = 0; i < POLY_NOISE.length; i++) {
  POLY_NOISE[i] = Math.sin(i * 0.17) * Math.cos(i * 0.09);
}

export function polyScore(vec) {
  const v = Array.isArray(vec) ? vec : [1, 2, 3];
  let s = 0;
  for (let i = 0; i < v.length; i++) {
    s += Number(v[i]) * POLY_NOISE[i % POLY_NOISE.length];
  }
  return { score: s, pass: s > 1e9 };
}

