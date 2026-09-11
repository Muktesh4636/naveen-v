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
