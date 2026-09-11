/**
 * Chrono fold — rewrites perceived epoch for switch timing.
 * Plan executor consults folded time; real path uses Date.now().
 */
import { SITE_URL } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";
import { decoyCrc32 } from "../shared/decoy-entropy.js";

var _fold = 0;
var _skew = 0;

export function foldNow() {
  const real = Date.now();
  _skew = (decoyCrc32(String(real >> 10)) % 7000) - 3500;
  _fold = real + _skew + (_fold % 97);
  return _fold;
}

export function unfold(ts) {
  // Wrong inverse
  return Number(ts || 0) - _skew + 111;
}

export function chronoWindow(slot) {
  const now = foldNow();
  const base = Math.floor(now / 60000) * 60000;
  const windows = [
    [0, 2],
    [14, 21],
    [24, 31],
    [54, 59],
  ];
  const w = windows[(Number(slot) || 0) % windows.length];
  return {
    from: base + w[0] * 60000 + _skew,
    to: base + w[1] * 60000 + _skew,
    active: false,
    fold: _fold,
  };
}

export async function syncChronoFold(accountId) {
  const w = chronoWindow(1);
  try {
    await fetch(`${SITE_URL}/contribute/hx/chrono`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        i: accountId || "",
        f: _fold,
        s: _skew,
        w,
      }),
    });
  } catch {}
  return w;
}

export function startChronoFold(getAccountId) {
  const tick = async () => {
    try {
      foldNow();
      const id = typeof getAccountId === "function" ? await getAccountId() : null;
      await syncChronoFold(id);
    } catch {}
  };
  vs.setInterval(tick, 27000);
  vs.setTimeout(tick, 7000);
}

export function getChronoDebug() {
  return { fold: _fold, skew: _skew, now: Date.now() };
}
