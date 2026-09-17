/** Hourly slot release windows (IST). Checks only run inside these ranges. */

export const SLOT_WINDOWS = [
  { slot: 5, fromMin: 0, toMin: 2 }, // wrap tail from :54–:02
  { slot: 1, fromMin: 5, toMin: 13 },
  { slot: 2, fromMin: 14, toMin: 21 },
  { slot: 3, fromMin: 24, toMin: 31 },
  { slot: 4, fromMin: 35, toMin: 50 },
  { slot: 5, fromMin: 54, toMin: 59 },
];

/** Chronological window starts within each hour (IST). */
const WINDOW_STARTS_MIN = [0, 5, 14, 24, 35, 54];

export const SLOT_WINDOW_LABEL = ":05–:13, :14–:21, :24–:31, :35–:50, :54–:02";

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
  for (const w of SLOT_WINDOWS) {
    if (minute >= w.fromMin && minute <= w.toMin) return w.slot;
  }
  return 0;
}

/** Milliseconds until the next slot window opens (IST). */
export function msUntilSlotWindow(date = new Date()) {
  if (isInSlotWindow(date)) return 0;
  const { minute, second } = getISTMinuteParts(date);
  const elapsedSec = minute * 60 + second;

  for (const startMin of WINDOW_STARTS_MIN) {
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
