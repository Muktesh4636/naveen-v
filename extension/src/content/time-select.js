/**
 * Pick OFC / consular time slots from the content script (same DOM, 50ms poll).
 */

import { vs } from "../shared/lifecycle.js";

const DEFAULT_POLL_MS = 25;

function normalizeTime(raw) {
  const s = String(raw || "").trim();
  const iso = s.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);
  return iso ? iso[1] : s;
}

function resolveSlotIndex(count, slotIndex) {
  const n = Math.max(0, Number(count) || 0);
  if (n <= 0) return 0;
  const want = Number.isFinite(Number(slotIndex)) ? Number(slotIndex) : 0;
  return Math.min(Math.max(0, want), n - 1);
}

function rowLooksLikeTime(row) {
  const text = (row?.textContent || "").replace(/\s+/g, " ");
  return /\d{1,2}\s*:\s*\d{2}/.test(text) || /\b\d{1,2}\s*(AM|PM)\b/i.test(text);
}

function rowIsUnavailable(row) {
  const text = (row?.textContent || "");
  if (/\bavailability\b[^0-9]*\b0\b/i.test(text)) return true;
  return false;
}

function isExcluded(el) {
  if (!el) return true;
  if (el.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar")) return true;
  return false;
}

function activateInput(el) {
  if (!el || el.disabled) return false;
  try {
    const row = el.closest("tr");
    const label = el.id
      ? document.querySelector(`label[for="${CSS.escape(el.id)}"]`)
      : null;
    const targets = [label, el.closest("label"), el, row].filter(Boolean);

    for (const target of targets) {
      target.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window }));
      target.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, cancelable: true, view: window }));
      target.click();
    }

    if (el.type === "radio" || el.type === "checkbox") {
      el.checked = true;
    }
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  } catch {
    return false;
  }
  return el.checked === true || el.tagName === "SELECT";
}

function collectTimeRadios() {
  const seen = new Set();
  const out = [];

  const tryAdd = (input) => {
    if (!input || seen.has(input) || isExcluded(input) || input.disabled) return;
    const row = input.closest("tr");
    if (row && rowIsUnavailable(row)) return;
    seen.add(input);
    out.push(input);
  };

  for (const sel of [
    "#schedule-entries table input[type=\"radio\"]",
    "#schedule-entries table input[type=\"checkbox\"]",
    "#page_form table input[type=\"radio\"]",
    "#page_form table input[type=\"checkbox\"]",
    "table.atlas tbody input[type=\"radio\"]",
    "table tbody input[type=\"radio\"]",
  ]) {
    for (const input of document.querySelectorAll(`${sel}:not([disabled])`)) {
      tryAdd(input);
    }
  }

  return out;
}

function collectTimeRows() {
  const rows = [];
  for (const sel of ["#schedule-entries table tbody tr", "#page_form table tbody tr"]) {
    for (const row of document.querySelectorAll(sel)) {
      if (!rowLooksLikeTime(row) || rowIsUnavailable(row)) continue;
      if (row.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')) {
        rows.push(row);
      }
    }
  }
  return rows;
}

function tryPickSelect(slotIndex) {
  for (const sel of document.querySelectorAll(
    '#time_select, select[name*="time" i], select[id*="time" i]'
  )) {
    if (sel.tagName !== "SELECT" || sel.disabled || isExcluded(sel)) continue;
    const opts = [...sel.options].filter(
      (o) => !o.disabled && o.value && o.value !== "0" && rowLooksLikeTime({ textContent: o.textContent })
    );
    if (!opts.length) continue;
    const idx = resolveSlotIndex(opts.length, slotIndex);
    sel.value = opts[idx].value;
    sel.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }
  return false;
}

function tryPickOnce(slotIndex) {
  if (tryPickSelect(slotIndex)) return true;

  const radios = collectTimeRadios();
  if (radios.length) {
    const idx = resolveSlotIndex(radios.length, slotIndex);
    if (activateInput(radios[idx])) return true;
  }

  const rows = collectTimeRows();
  if (rows.length) {
    const idx = resolveSlotIndex(rows.length, slotIndex);
    const row = rows[idx];
    const input = row.querySelector(
      'input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])'
    );
    if (input && activateInput(input)) return true;
    const label = row.querySelector("label");
    if (label) {
      label.click();
      return !!row.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked');
    }
  }

  return false;
}

export function isTimeSlotPicked() {
  for (const sel of document.querySelectorAll(
    '#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'
  )) {
    if (!isExcluded(sel)) return true;
  }
  for (const sel of document.querySelectorAll('#time_select, select[name*="time" i]')) {
    if (sel.value && sel.value !== "0") return true;
  }
  return false;
}

/** Poll every pollMs until slot clicked or deadline. */
export function pollAndPickTimeSlot({
  slotIndex = 0,
  maxMs = 12000,
  pollMs = DEFAULT_POLL_MS,
  onTick,
} = {}) {
  const deadline = Date.now() + maxMs;
  const tickMs = Math.max(10, pollMs || 25);

  return new Promise((resolve) => {
    const tick = () => {
      if (!vs.alive) return resolve(false);
      onTick?.();

      if (tryPickOnce(slotIndex)) {
        return resolve(true);
      }
      if (isTimeSlotPicked()) {
        return resolve(true);
      }

      if (Date.now() >= deadline) return resolve(false);
      vs.setTimeout(tick, tickMs);
    };
    tick();
  });
}

/** Fire MAIN-world force pick + content-script pick together. */
export function pickTimeSlotDual({ time, date, slotIndex, pollMs, maxMs }) {
  const idx = slotIndex ?? 0;
  const ms = maxMs || 15000;
  const poll = pollMs || DEFAULT_POLL_MS;
  vs.send({
    action: "forcePickTimeSlot",
    slotIndex: idx,
    maxMs: ms,
    pollMs: poll,
  });
  vs.send({
    action: "selectFirstTime",
    time: time || "00:00",
    date: date || null,
    slotIndex: idx,
    pollMs: poll,
    domWaitMs: 0,
    maxMs: ms,
  });
  return pollAndPickTimeSlot({
    slotIndex: idx,
    maxMs: ms,
    pollMs: poll,
  });
}

var _slotWatcherOn = false;

/** Watch DOM every 25ms — pick slot as soon as table appears under calendar. */
export function startTimeSlotWatcher({ shouldPick, slotIndex = 0, onSlotPicked } = {}) {
  if (_slotWatcherOn) return;
  _slotWatcherOn = true;

  let busy = false;
  const attempt = async () => {
    if (!vs.alive || busy) return;
    if (isTimeSlotPicked()) {
      onSlotPicked?.();
      return;
    }
    try {
      if (shouldPick && !await shouldPick()) return;
    } catch {
      return;
    }
    if (!collectTimeRadios().length) return;
    busy = true;
    await pickTimeSlotDual({
      slotIndex,
      time: "00:00",
      maxMs: 800,
      pollMs: DEFAULT_POLL_MS,
    });
    busy = false;
    if (isTimeSlotPicked()) onSlotPicked?.();
  };

  vs.setInterval(attempt, DEFAULT_POLL_MS);
  const root = document.querySelector("#page_form") || document.body;
  const obs = new MutationObserver(() => attempt());
  obs.observe(root, { childList: true, subtree: true });
  vs.disposable(() => {
    obs.disconnect();
    _slotWatcherOn = false;
  });
}

export function domShowsEntryTimes(entries) {
  const hay = (document.querySelector("#schedule-entries, #page_form")?.textContent || "")
    .replace(/\s+/g, " ");
  for (const e of (entries || []).slice(0, 8)) {
    const t = normalizeTime(e?.Time);
    if (!t) continue;
    const parts = t.match(/(\d{1,2}):(\d{2})/);
    if (!parts) continue;
    const [, h, m] = parts;
    if (hay.includes(`${h}:${m}`) || hay.includes(`${parseInt(h, 10)}:${m}`)) return true;
  }
  return false;
}
