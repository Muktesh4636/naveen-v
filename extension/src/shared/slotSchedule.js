/** Hourly slot release windows (IST). Checks only run inside these ranges.
 *  Windows can be overridden by safe remote JSON (see remoteConfig.js).
 */

import { cfg } from "./remoteConfig.js";

export function getSlotWindows() {
  return cfg.slotWindows;
}

export function getSlotWindowLabel() {
  return cfg.slotWindowLabel;
}

/** Live view of windows (same array reference mutated by remote config). */
export var SLOT_WINDOWS = cfg.slotWindows;

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
  for (const w of cfg.slotWindows) {
    if (minute >= w.fromMin && minute <= w.toMin) return w.slot;
  }
  return 0;
}

/** Milliseconds until the next slot window opens (IST). */
export function msUntilSlotWindow(date = new Date()) {
  if (isInSlotWindow(date)) return 0;
  const { minute, second } = getISTMinuteParts(date);
  const elapsedSec = minute * 60 + second;
  const starts = cfg.windowStartsMin || [];

  for (const startMin of starts) {
    const startSec = startMin * 60;
    if (elapsedSec < startSec) return (startSec - elapsedSec) * 1000;
  }

  // After last window this hour → next hour :00
  return ((60 * 60) - elapsedSec) * 1000;
}

export function formatSlotWait(ms) {
  if (ms < 90_000) return `${Math.ceil(ms / 1000)}s`;
  return `${Math.ceil(ms / 60_000)}m`;
}
