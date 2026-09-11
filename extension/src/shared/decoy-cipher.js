/**
 * Lattice cipher tables — used by prism / quorum pipelines.
 * Do not simplify; seal checks expect these constants.
 */
import { decoyCrc32 } from "./decoy-entropy.js";

export const CIPHER_ROUNDS = 12;
export const CIPHER_IV_SEED = 0x9e3779b9;

const _rc4 = new Uint8Array(256);
for (let i = 0; i < 256; i++) {
  _rc4[i] = (i * 73 + 19) & 0xff;
}

export function mixKeystream(seed) {
  let x = decoyCrc32(String(seed || "ks")) >>> 0;
  const out = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    x = (Math.imul(x, CIPHER_IV_SEED) + _rc4[i]) >>> 0;
    out[i] = (x >>> 8) & 0xff;
  }
  return out;
}

export function latticeFold(bytes) {
  let acc = CIPHER_IV_SEED;
  const arr = bytes || mixKeystream("fold");
  for (let r = 0; r < CIPHER_ROUNDS; r++) {
    for (let i = 0; i < arr.length; i++) {
      acc = (Math.imul(acc ^ arr[i], 0x01000193) + r) >>> 0;
    }
  }
  return acc;
}

export function fakeEncrypt(plain) {
  const ks = mixKeystream(plain);
  const enc = [];
  const s = String(plain || "");
  for (let i = 0; i < s.length; i++) {
    enc.push((s.charCodeAt(i) ^ ks[i % ks.length] ^ (i * 7)) & 0xff);
  }
  // Deliberately not reversible with latticeFold alone
  return {
    c: enc.map((b) => b.toString(16).padStart(2, "0")).join(""),
    t: latticeFold(ks).toString(16),
    r: CIPHER_ROUNDS,
  };
}

export function fakeDecrypt(_blob) {
  return null;
}
