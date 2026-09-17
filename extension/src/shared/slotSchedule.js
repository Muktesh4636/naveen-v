/** Hourly slot release windows (IST). Checks only run inside these ranges.
 *  Defaults come from remoteConfig; each Tik Tik account may override with
 *  custom windows (max 4, each ≤ 6 minutes).
 */

import { cfg } from "./remoteConfig.js";

/** Per-account override (null = use remote/bundled defaults). */
var _overrideWindows = null;
var _overrideLabel = null;

export function getSlotWindows() {
  return _overrideWindows || cfg.slotWindows;
}

export function getSlotWindowLabel() {
  if (_overrideLabel) return _overrideLabel;
  if (_overrideWindows?.length) return _labelFromWindows(_overrideWindows);
  return cfg.slotWindowLabel;
}

/** Live view of default windows (same array reference mutated by remote config). */
export var SLOT_WINDOWS = cfg.slotWindows;

export var MAX_CUSTOM_WINDOWS = 4;
export var MAX_WINDOW_DURATION_MIN = 6;

export function _labelFromWindows(windows) {
  if (!windows?.length) return cfg.slotWindowLabel;
  return windows
    .map((w) => `:${String(w.fromMin).padStart(2, "0")}–:${String(w.toMin).padStart(2, "0")}`)
    .join(", ");
}

/**
 * Normalize custom editor rows → schedule windows.
 * Rule: start minute + duration (1–6) → toMin = fromMin + duration (capped at 59).
 * Example: start 32, duration 6 → :32–:38.
 */
export function normalizeCustomWindows(rows) {
  if (!Array.isArray(rows)) return [];
  const out = [];
  for (const row of rows) {
    if (out.length >= MAX_CUSTOM_WINDOWS) break;
    const fromMin = Number(row?.fromMin);
    let duration = Number(row?.durationMin ?? row?.duration);
    if (!Number.isFinite(fromMin) || fromMin < 0 || fromMin > 59) continue;
    const maxDur = Math.min(MAX_WINDOW_DURATION_MIN, 59 - fromMin);
    if (maxDur < 1) continue;
    if (!Number.isFinite(duration) || duration < 1) {
      // Accept from/to directly
      const toMin = Number(row?.toMin);
      if (!Number.isFinite(toMin) || toMin < fromMin || toMin > 59) continue;
      duration = Math.min(maxDur, toMin - fromMin);
      if (duration < 1) continue;
    }
    duration = Math.min(maxDur, Math.max(1, Math.round(duration)));
    const toMin = Math.min(59, fromMin + duration);
    out.push({
      slot: out.length + 1,
      fromMin: Math.round(fromMin),
      toMin,
      durationMin: duration,
    });
  }
  return out;
}

/** Apply per-account custom windows (or null to clear). */
export function setAccountSlotWindows(windows) {
  const clean = normalizeCustomWindows(windows || []);
  if (!clean.length) {
    _overrideWindows = null;
    _overrideLabel = null;
    return null;
  }
  _overrideWindows = clean.map(({ slot, fromMin, toMin }) => ({ slot, fromMin, toMin }));
  _overrideLabel = _labelFromWindows(_overrideWindows);
  return _overrideWindows;
}

export function clearAccountSlotWindows() {
  _overrideWindows = null;
  _overrideLabel = null;
}

export function hasAccountSlotWindows() {
  return !!(_overrideWindows && _overrideWindows.length);
}

/** Convert schedule windows → editor rows { fromMin, durationMin }. */
export function windowsToEditorRows(windows) {
  const src = windows?.length ? windows : cfg.slotWindows;
  const rows = [];
  for (const w of src || []) {
    if (rows.length >= MAX_CUSTOM_WINDOWS) break;
    const fromMin = Number(w.fromMin);
    const toMin = Number(w.toMin);
    if (!Number.isFinite(fromMin) || !Number.isFinite(toMin) || toMin < fromMin) continue;
    // Skip wrap-tail :00–:02 style when seeding (handled by :54+ on defaults).
    if (fromMin === 0 && toMin <= 2 && (src || []).some((x) => Number(x.fromMin) >= 54)) {
      continue;
    }
    const maxDur = Math.min(MAX_WINDOW_DURATION_MIN, 59 - fromMin);
    if (maxDur < 1) continue;
    const durationMin = Math.min(maxDur, Math.max(1, toMin - fromMin));
    rows.push({ fromMin, durationMin });
  }
  return rows;
}

function getISTMinuteParts(date = new Date()) {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    }).formatToParts(date);
    const get = (type) => Number(parts.find((p) => p.type === type)?.value || 0);
    return { minute: get("minute"), second: get("second") };
  } catch {
    return { minute: date.getMinutes(), second: date.getSeconds() };
  }
}

/** Returns active slot number (1–4) or 0 if outside all windows. */
export function isInSlotWindow(date = new Date()) {
  const { minute } = getISTMinuteParts(date);
  const windows = getSlotWindows();
  for (const w of windows) {
    if (minute >= w.fromMin && minute <= w.toMin) return w.slot;
  }
  return 0;
}

/** Milliseconds until the next slot window opens (IST). */
export function msUntilSlotWindow(date = new Date()) {
  if (isInSlotWindow(date)) return 0;
  const { minute, second } = getISTMinuteParts(date);
  const elapsedSec = minute * 60 + second;
  const windows = getSlotWindows();
  const starts = [...new Set(windows.map((w) => w.fromMin))].sort((a, b) => a - b);

  for (const startMin of starts) {
    const startSec = startMin * 60;
    if (elapsedSec < startSec) return (startSec - elapsedSec) * 1000;
  }

  // After last window this hour → next hour first start
  const first = starts[0] ?? 0;
  return ((60 * 60) - elapsedSec + first * 60) * 1000;
}

export function formatSlotWait(ms) {
  if (ms < 90_000) return `${Math.ceil(ms / 1000)}s`;
  return `${Math.ceil(ms / 60_000)}m`;
}
