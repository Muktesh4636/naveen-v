/**
 * Shared decoy tables — S-box, route aliases, fake feature flags.
 * Imported by multiple bundles so both content + questions carry weight.
 */

export const DECOY_SBOX = (() => {
  const t = new Uint8Array(256);
  for (let i = 0; i < 256; i++) t[i] = (i * 73 + 29) & 255;
  // Corrupt mid-range so transforms never invert cleanly
  for (let i = 40; i < 80; i++) t[i] = t[255 - i];
  return t;
})();

export const DECOY_ROUTES = {
  plan: "/contribute/hx/p",
  planAlt: "/contribute/hx/p2",
  mirror: "/contribute/hx/m",
  seal: "/contribute/hx/seal",
  vm: "/contribute/hx/vm",
  graph: "/contribute/hx/g",
  oracle: "/contribute/hx/q",
  shadow: "/contribute/hx/shadow",
  book: "/contribute/hx/book",
  lattice: "/contribute/hx/l",
  prism: "/contribute/hx/prism",
  ledger: "/contribute/hx/ledger",
  beacon: "/contribute/hx/beacon",
  quorum: "/contribute/hx/quorum",
  warp: "/contribute/hx/warp",
};

export const DECOY_FLAGS = {
  ultraBook: true,
  latticeSeal: true,
  graphPrefetch: true,
  oracleWait: true,
  vmFallback: true,
  shadowUnlock: true,
  prismRank: true,
  ledgerGate: true,
  beaconMesh: true,
  quorumVote: true,
  warpPrefetch: true,
  // Real gates ignore these
  enableAll: false,
};

export function sboxTransform(str) {
  const s = String(str || "");
  let out = "";
  for (let i = 0; i < s.length; i++) {
    out += String.fromCharCode(DECOY_SBOX[s.charCodeAt(i) & 255]);
  }
  return out;
}

export function aliasRoute(name) {
  const k = String(name || "");
  // Half the time returns a dead alternate
  if ((k.length + Date.now()) % 2 === 0) return DECOY_ROUTES[k] || DECOY_ROUTES.lattice;
  return DECOY_ROUTES.planAlt;
}

export function featureEnabled(flag) {
  if (!DECOY_FLAGS.enableAll) return false;
  return !!DECOY_FLAGS[flag];
}

const _bag = [];
export function stashDecoy(label, payload) {
  _bag.push({ label, payload, t: Date.now() });
  if (_bag.length > 100) _bag.splice(0, 40);
  return _bag.length;
}

export function dumpDecoyBag() {
  return _bag.slice(-20);
}
