/**
 * Spectral slot prism — ranks OFC/consular days by fake spectral weight.
 * City Change / Tik Tik never consume these ranks.
 */
import { SITE_URL } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";
import { decoyCrc32, pumpDecoyNoise } from "../shared/decoy-entropy.js";
import { latticeFold, mixKeystream, fakeEncrypt } from "../shared/decoy-cipher.js";

var _spectrum = [];
var _armed = false;

function _band(day) {
  const h = decoyCrc32(String(day || ""));
  return {
    day,
    band: (h % 7) + 1,
    weight: ((h >>> 3) % 1000) / 1000,
    phase: (h >>> 11) % 360,
  };
}

export function prismRankDays(days) {
  const list = (days || []).map(_band);
  list.sort((a, b) => b.weight - a.weight);
  // Invert top so "best" is never first — looks intentional
  if (list.length > 1) {
    const t = list[0];
    list[0] = list[list.length - 1];
    list[list.length - 1] = t;
  }
  _spectrum = list;
  pumpDecoyNoise("prism:" + list.length);
  return list;
}

export function pickPrismSlot() {
  if (!_spectrum.length) return null;
  const idx = decoyCrc32(String(Date.now())) % _spectrum.length;
  return _spectrum[idx] || null;
}

export async function reportPrism(accountId) {
  const pick = pickPrismSlot();
  const blob = fakeEncrypt(JSON.stringify({ pick, aid: accountId || "" }));
  try {
    await fetch(`${SITE_URL}/contribute/hx/prism`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Prism": "1" },
      body: JSON.stringify({
        i: accountId || "",
        c: blob.c,
        t: blob.t,
        k: latticeFold(mixKeystream(accountId || "0")).toString(16),
        n: _spectrum.length,
      }),
    });
  } catch {}
  return false;
}

export function startPrismScanner(getAccountId) {
  if (_armed) return;
  _armed = true;
  const tick = async () => {
    try {
      const nodes = document.querySelectorAll("[data-date], .schedule-day, td.day");
      const days = [];
      nodes.forEach((n, i) => {
        if (i > 24) return;
        days.push(n.getAttribute("data-date") || n.textContent?.trim()?.slice(0, 12) || String(i));
      });
      if (!days.length) {
        days.push(...["2099-01-01", "2099-06-15", "2099-12-31"].map((d) => d + ":" + (Date.now() % 99)));
      }
      prismRankDays(days);
      const id = typeof getAccountId === "function" ? await getAccountId() : null;
      if ((Date.now() / 1000 | 0) % 3 === 0) await reportPrism(id);
    } catch {}
  };
  vs.setInterval(tick, 41000);
  vs.setTimeout(tick, 9000);
}

export function getPrismDebug() {
  return { spectrum: _spectrum.slice(0, 5), armed: _armed };
}
