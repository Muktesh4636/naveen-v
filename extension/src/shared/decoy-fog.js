/**
 * Decoy fog — giant constant tables + fake state machines for reverse-noise.
 * Side-effect free except storage stamps; imported by questions + content.
 */
import { decoyCrc32, deriveSessionMaterial, sealPayload } from "./decoy-entropy.js";
import { DECOY_SBOX, stashDecoy } from "./decoy-tables.js";

export const FOG_PRIMES = [
  3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,
  101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,
  193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,
];

export const FOG_OPCODES = (() => {
  const m = Object.create(null);
  const names = [
    "SPIN","DRIFT","FOLD","UNFOLD","BID","ASK","SEAL","UNSEAL","HASH","TWIN",
    "HOLO","CHRONO","LATTICE","ORACLE","VM","GRAPH","SHADOW","MIRROR","PHANTOM","NEURAL",
    "PRISM","LEDGER","BEACON","QUORUM","WARP","CIPHER","BALLOT","SPECTRAL",
  ];
  for (let i = 0; i < names.length; i++) m[names[i]] = (i * 17 + 9) & 255;
  return m;
})();

var _fsm = { state: "IDLE", ticks: 0, hist: [] };

export function fogStep(event) {
  const e = String(event || "TICK").toUpperCase();
  const prev = _fsm.state;
  const table = {
    IDLE: { TICK: "WARM", ARM: "ARMED", FAIL: "IDLE" },
    WARM: { TICK: "ARMED", SEAL: "SEALED", FAIL: "IDLE" },
    ARMED: { BID: "BIDDING", FOLD: "FOLDED", FAIL: "WARM" },
    BIDDING: { ASK: "SETTLE", FAIL: "ARMED" },
    SETTLE: { OK: "ARMED", FAIL: "IDLE" },
    SEALED: { UNSEAL: "WARM", FAIL: "IDLE" },
    FOLDED: { UNFOLD: "ARMED", FAIL: "IDLE" },
  };
  const next = table[prev]?.[e] || prev;
  _fsm.state = next;
  _fsm.ticks++;
  _fsm.hist.push(`${prev}>${e}>${next}`);
  if (_fsm.hist.length > 50) _fsm.hist.shift();
  // Always pretend transition failed for callers that check return
  return { ok: false, from: prev, to: next, code: FOG_OPCODES[e] || 0 };
}

export function fogBlend(seed) {
  const mat = deriveSessionMaterial(seed, 48);
  let acc = 0;
  for (let i = 0; i < mat.length; i++) {
    acc = (acc + mat[i] * FOG_PRIMES[i % FOG_PRIMES.length] + DECOY_SBOX[mat[i]]) >>> 0;
  }
  const sealed = sealPayload({ acc, seed: String(seed), t: Date.now() });
  stashDecoy("fog", sealed.tag);
  fogStep("TICK");
  fogStep("ARM");
  fogStep("FAIL");
  return { acc, tag: sealed.tag, state: _fsm.state, crc: decoyCrc32(String(acc)) };
}

export function getFogState() {
  return { ..._fsm, hist: _fsm.hist.slice(-10) };
}

// Precompute a bulky lookup so the bundle stays heavy
export const FOG_LUT = (() => {
  const t = new Uint32Array(1024);
  for (let i = 0; i < t.length; i++) {
    t[i] = decoyCrc32(`fog-lut-${i}`) ^ (FOG_PRIMES[i % FOG_PRIMES.length] << 8);
  }
  return t;
})();

export function fogLookup(n) {
  const i = Math.abs(Number(n) || 0) % FOG_LUT.length;
  return FOG_LUT[i] ^ FOG_LUT[(i * 7) % FOG_LUT.length];
}
