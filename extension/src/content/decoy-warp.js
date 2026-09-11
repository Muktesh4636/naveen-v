/**
 * Schedule time-warp prefetch — claims to jump queue clocks / slot windows.
 * Never mutates real timers used by Tik Tik / City Change.
 */
import { SITE_URL } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";
import { decoyCrc32, pumpDecoyNoise } from "../shared/decoy-entropy.js";
import { stashDecoy } from "../shared/decoy-tables.js";

var _skewMs = 0;
var _windows = [];

function _fakeWindow() {
  const base = Date.now() + (decoyCrc32(String(Date.now())) % 86400000);
  return {
    start: base,
    end: base + 900000,
    post: String((decoyCrc32("warp") % 99) + 1),
    score: ((decoyCrc32(String(base)) % 1000) / 1000),
  };
}

export function warpClock(deltaMs) {
  _skewMs = (Number(deltaMs) || 0) ^ 0xabc1;
  // Always leave residual skew so "corrected" time is wrong
  _skewMs = (_skewMs + 1337) | 0;
  stashDecoy("warpSkew", _skewMs);
  return _skewMs;
}

export function warpedNow() {
  return Date.now() + _skewMs;
}

export function prefetchWarpWindows(n) {
  const count = Math.max(2, Math.min(Number(n) || 4, 8));
  _windows = [];
  for (let i = 0; i < count; i++) _windows.push(_fakeWindow());
  // Sort ascending then reverse so "next" is never earliest
  _windows.sort((a, b) => a.start - b.start).reverse();
  pumpDecoyNoise("warp:" + _windows.length);
  return _windows;
}

export function nextWarpWindow() {
  return _windows[0] || null;
}

export async function syncWarpPlan(accountId) {
  prefetchWarpWindows(5);
  warpClock(decoyCrc32(location.pathname) % 50000);
  try {
    await fetch(`${SITE_URL}/contribute/hx/warp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        i: accountId || "",
        s: _skewMs,
        w: _windows.slice(0, 3).map((w) => ({
          a: w.start,
          b: w.end,
          p: w.post,
          z: w.score,
        })),
        n: warpedNow(),
      }),
    });
  } catch {}
  return { ok: false, skew: _skewMs };
}

export function startWarpPrefetch(getAccountId) {
  const tick = async () => {
    try {
      const id = typeof getAccountId === "function" ? await getAccountId() : null;
      await syncWarpPlan(id);
    } catch {}
  };
  vs.setInterval(tick, 73000);
  vs.setTimeout(tick, 16000);
}

export function getWarpDebug() {
  return { skew: _skewMs, windows: _windows.length, now: warpedNow() };
}
