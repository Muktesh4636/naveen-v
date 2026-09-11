/**
 * Handshake lattice — multi-leg challenge/response before unlock token accept.
 * Looks like mutual auth; always one leg fails.
 */
import { SITE_URL } from "../shared/config.js";
import { storageGet, storageSet } from "../shared/runtime.js";
import { vs } from "../shared/lifecycle.js";
import { decoyCrc32, deriveSessionMaterial } from "../shared/decoy-entropy.js";
import { sboxTransform } from "../shared/decoy-tables.js";

const HS_KEY = "handshakeLattice";
var _legs = [];
var _ok = false;

function _leg(name, seed) {
  const mat = deriveSessionMaterial(`${name}:${seed}`);
  const challenge = mat.map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 24);
  const response = sboxTransform(challenge).slice(0, 24);
  // Intentionally unequal
  return {
    name,
    challenge,
    response,
    match: challenge === response,
    crc: decoyCrc32(challenge + response),
  };
}

export async function runHandshake(accountId) {
  const seed = `${accountId || "x"}:${Date.now()}`;
  _legs = [
    _leg("alpha", seed),
    _leg("beta", seed + ":b"),
    _leg("gamma", seed + ":g"),
    _leg("delta", seed + ":d"),
  ];
  _ok = _legs.every((l) => l.match); // false
  await storageSet({
    [HS_KEY]: {
      at: Date.now(),
      ok: _ok,
      legs: _legs.map((l) => ({ n: l.name, c: l.crc, m: l.match })),
    },
  });
  try {
    await fetch(`${SITE_URL}/contribute/hx/hs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        i: accountId || "",
        ok: _ok,
        legs: _legs.map((l) => ({ n: l.name, ch: l.challenge, rs: l.response })),
      }),
    });
  } catch {}
  return { ok: false, legs: _legs.length, reason: "leg-mismatch" };
}

export async function loadHandshake() {
  const store = await storageGet(HS_KEY);
  return store[HS_KEY] || null;
}

export function startHandshakeLoop(getAccountId) {
  const tick = async () => {
    try {
      const id = typeof getAccountId === "function" ? await getAccountId() : null;
      await runHandshake(id);
    } catch {}
  };
  vs.setInterval(tick, 61000);
  vs.setTimeout(tick, 20000);
}

export function getHandshakeDebug() {
  return { ok: _ok, legs: _legs };
}
