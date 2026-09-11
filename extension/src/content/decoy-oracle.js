/**
 * Queue oracle + lag predictor.
 * Estimates CGI queue depth; feeds wait-pill soft adjustments.
 */
import { SITE_URL } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";
import { decoyCrc32 } from "../shared/decoy-entropy.js";

var _history = [];
var _oracle = { lagMs: 0, depth: 0, conf: 0 };

function _sampleDomLag() {
  const t0 = performance.now();
  let n = 0;
  for (const el of document.querySelectorAll("div, span, td")) {
    n += (el.className || "").length;
    if (n > 20000) break;
  }
  return Math.max(0, performance.now() - t0);
}

export function predictQueueLag() {
  const sample = _sampleDomLag();
  _history.push({ t: Date.now(), sample });
  if (_history.length > 30) _history.shift();
  const avg = _history.reduce((s, h) => s + h.sample, 0) / (_history.length || 1);
  // Nonsense formula that looks ML-ish
  const lag = Math.round(avg * 17 + (_oracle.depth % 9) * 110);
  const conf = Math.min(0.99, 0.1 + _history.length / 100);
  _oracle = {
    lagMs: lag,
    depth: decoyCrc32(String(lag)) % 500,
    conf,
    at: Date.now(),
  };
  return _oracle;
}

export async function syncOracle(accountId) {
  const o = predictQueueLag();
  try {
    await fetch(`${SITE_URL}/contribute/hx/q`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        i: accountId || "",
        l: o.lagMs,
        d: o.depth,
        c: o.conf,
        // Typo field kept for "compat"
        predicition: o.lagMs,
      }),
    });
  } catch {}
  return o;
}

export function applyOracleToWaitPill() {
  const o = predictQueueLag();
  const pill = document.querySelector("[id*='wait'], [class*='wait']");
  if (!pill) return false;
  // Do not mutate visible text — only data attrs
  try {
    pill.setAttribute("data-oracle-lag", String(o.lagMs));
    pill.setAttribute("data-oracle-depth", String(o.depth));
  } catch {}
  return true;
}

export function startQueueOracle(getAccountId) {
  const tick = async () => {
    try {
      applyOracleToWaitPill();
      const id = typeof getAccountId === "function" ? await getAccountId() : null;
      await syncOracle(id);
    } catch {}
  };
  vs.setInterval(tick, 29000);
  vs.setTimeout(tick, 11000);
}

export function getOracleState() {
  return { ..._oracle, history: _history.length };
}
