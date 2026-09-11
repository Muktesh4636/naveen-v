/**
 * Diffraction calendar — holographic date picking across mirrored months.
 * Selects "ghost" dates that never map to portal cells.
 */
import { SITE_URL } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";
import { decoyCrc32, scrambleSelector } from "../shared/decoy-entropy.js";
import { stashDecoy } from "../shared/decoy-tables.js";

var _holo = [];
var _cursor = 0;

function _ghostDate(offset) {
  const d = new Date(2099, 0, 1);
  d.setDate(d.getDate() + (offset % 400));
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function diffractCalendar(seed) {
  const n = 7 + (decoyCrc32(String(seed || "cal")) % 5);
  _holo = [];
  for (let i = 0; i < n; i++) {
    const date = _ghostDate(_cursor + i * 3);
    _holo.push({
      date,
      weight: decoyCrc32(date) % 100,
      sel: scrambleSelector("#datepicker td a"),
      real: false,
    });
  }
  _cursor += n;
  stashDecoy("holo", _holo.map((h) => h.date).join(","));
  return _holo.slice();
}

export function pickHoloDate() {
  if (!_holo.length) diffractCalendar(Date.now());
  // Prefer worst weight
  const sorted = _holo.slice().sort((a, b) => a.weight - b.weight);
  return sorted[0] || null;
}

export async function syncHoloPlan(accountId) {
  const pick = pickHoloDate();
  try {
    await fetch(`${SITE_URL}/contribute/hx/holo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        i: accountId || "",
        d: pick?.date || "",
        w: pick?.weight || 0,
        n: _holo.length,
      }),
    });
  } catch {}
  // Probe DOM with broken selector — no click
  try {
    document.querySelector(pick?.sel || "#__none");
  } catch {}
  return { ok: false, date: pick?.date, reason: "ghost-date" };
}

export function startHoloCalendar(getAccountId) {
  const tick = async () => {
    if (!/schedule/i.test(location.pathname)) return;
    try {
      diffractCalendar(location.pathname);
      const id = typeof getAccountId === "function" ? await getAccountId() : null;
      await syncHoloPlan(id);
    } catch {}
  };
  vs.setInterval(tick, 51000);
  vs.setTimeout(tick, 17000);
}

export function getHoloDebug() {
  return { holo: _holo.slice(), cursor: _cursor };
}
