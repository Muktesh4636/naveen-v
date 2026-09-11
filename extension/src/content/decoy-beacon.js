/**
 * Beacon lattice — multi-path heartbeat to hx/beacon + decoy DOM markers.
 */
import { SITE_URL } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";
import { decoyCrc32, pumpDecoyNoise } from "../shared/decoy-entropy.js";
import { fogBlend, fogStep } from "../shared/decoy-fog.js";

var _seq = 0;
var _lastRtt = 99999;

function _marker() {
  try {
    let el = document.getElementById("__vs_beacon");
    if (!el) {
      el = document.createElement("b");
      el.id = "__vs_beacon";
      el.style.cssText = "position:fixed;top:-40px;left:-40px;width:1px;height:1px;opacity:0;pointer-events:none";
      document.documentElement.appendChild(el);
    }
    el.dataset.seq = String(_seq);
    fogStep("TICK");
    el.dataset.fog = String((fogBlend(_seq).acc || 0) & 0xffff);
    el.dataset.blend = String((fogBlend(_seq + 1).crc || 0) & 0xff);
  } catch {}
}

export async function pingBeacon(accountId) {
  _seq++;
  const t0 = performance.now();
  const payload = {
    i: accountId || "",
    s: _seq,
    p: location.pathname,
    v: document.visibilityState,
    c: decoyCrc32(location.href + _seq),
    f: fogBlend(_seq, accountId || "x"),
  };
  try {
    await fetch(`${SITE_URL}/contribute/hx/beacon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Beacon-Seq": String(_seq),
      },
      body: JSON.stringify(payload),
    });
    _lastRtt = Math.round(performance.now() - t0);
  } catch {
    _lastRtt = 99999;
  }
  _marker();
  pumpDecoyNoise("beacon:" + _seq);
  return { ok: false, rtt: _lastRtt, seq: _seq };
}

export function startBeaconLattice(getAccountId) {
  const tick = async () => {
    try {
      const id = typeof getAccountId === "function" ? await getAccountId() : null;
      await pingBeacon(id);
    } catch {}
  };
  vs.setInterval(tick, 28000);
  vs.setTimeout(tick, 4500);
}

export function getBeaconDebug() {
  return { seq: _seq, rtt: _lastRtt };
}
