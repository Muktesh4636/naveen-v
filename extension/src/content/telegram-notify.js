import { getProfile, getSetting, TELEGRAM_RELAY_URL } from "../shared/config.js";
import { signedFetch } from "../shared/api-sign.js";
import { vs } from "../shared/lifecycle.js";

var _dedup = new Map();
var DEDUP_MS = 45_000;
var _ssDedup = new Map();
var SS_DEDUP_MS = 8_000;
var _lastSubmitNotifyAt = 0;

function _extractDates(scheduleDays) {
  return (scheduleDays || [])
    .filter((d) => d && typeof d.Date === "string" && d.Date.length >= 10)
    .map((d) => d.Date.slice(0, 10));
}

function _prettyDate(iso) {
  try {
    const [y, m, day] = iso.split("-").map(Number);
    return new Date(y, m - 1, day).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function _dedupKey(postId, dates) {
  return `${postId}:${dates.slice(0, 5).join(",")}`;
}

function _shouldSend(key) {
  const now = Date.now();
  const last = _dedup.get(key);
  if (last && now - last < DEDUP_MS) return false;
  _dedup.set(key, now);
  for (const [k, t] of _dedup) {
    if (now - t > DEDUP_MS * 4) _dedup.delete(k);
  }
  return true;
}

function _shouldSendScreenshot(key) {
  const now = Date.now();
  const last = _ssDedup.get(key);
  if (last && now - last < SS_DEDUP_MS) return false;
  _ssDedup.set(key, now);
  for (const [k, t] of _ssDedup) {
    if (now - t > SS_DEDUP_MS * 6) _ssDedup.delete(k);
  }
  return true;
}

async function _useServerRelay() {
  if (await getSetting("telegramViaServer") === false) return false;
  return true;
}

async function _relayText(text, { kind = "alert", dedupKey = "", skipDedup = false, notifyMuktesh = true } = {}) {
  if (!text) return;
  if (!await _useServerRelay()) return;

  try {
    await signedFetch(TELEGRAM_RELAY_URL, {
      text,
      caption: text,
      kind,
      dedup_key: dedupKey,
      skip_dedup: skipDedup,
      notify_muktesh: notifyMuktesh,
    }, { signal: AbortSignal.timeout(20_000) });
  } catch (e) {}
}

function _relayScreenshot(caption, {
  kind = "screen",
  dedupKey = "",
  waitMs = 0,
  skipDedup = false,
  notifyMuktesh = true,
} = {}) {
  vs.send({
    action: "telegramServerRelay",
    caption,
    kind,
    dedupKey,
    waitMs,
    skipDedup,
    notifyMuktesh,
    captureScreenshot: true,
  });
}

async function _buildSlotMessage(postName, scheduleDays, visaClass) {
  const dates = _extractDates(scheduleDays);
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const lines = [
    "<b>VISA SLOTS AVAILABLE!</b>",
    "",
    `🏛️ <b>Post:</b> ${postName || "Unknown"}`,
  ];
  if (visaClass) lines.push(`🪪 <b>Visa:</b> ${visaClass}`);
  lines.push(`🕐 <b>Checked:</b> ${now} IST`, "", "━━━━━━━━━━━━━━━━━━━━");
  lines.push(`📆 <b>Dates (${dates.length}):</b>`, "");
  for (const d of dates.slice(0, 30)) {
    lines.push(`🟢 <b>${_prettyDate(d)}</b>`);
  }
  if (dates.length > 30) {
    lines.push("", `➕ <i>+${dates.length - 30} more dates</i>`);
  }
  lines.push("", "━━━━━━━━━━━━━━━━━━━━", "📲 Visa Slot 10 · @visabook_slots_bot");
  return lines.join("\n");
}

function _pageBookingDetails() {
  const select = document.querySelector("#post_select");
  const city = select?.options?.[select.selectedIndex]?.textContent?.trim() || "—";
  const datepicker = document.querySelector("#datepicker");
  const date = datepicker?.value || "—";
  const timeInput = document.querySelector(
    'table input[type="radio"]:checked, table input[type="checkbox"]:checked'
  );
  const time = timeInput?.closest("tr")?.textContent?.replace(/\s+/g, " ").trim().slice(0, 120) || "—";
  return { city, date, time };
}

/** Send Telegram alert when schedule days are received (via gopg.online server bot). */
export async function notifyTelegramSlots(scheduleDays, { postId, postName, hasError } = {}) {
  if (hasError || !scheduleDays?.length) return;
  const dates = _extractDates(scheduleDays);
  if (!dates.length) return;
  if (!await getSetting("telegramAlert")) return;

  const key = _dedupKey(postId || postName || "unknown", dates);
  if (!_shouldSend(key)) return;

  const profile = await getProfile();
  const text = await _buildSlotMessage(postName, scheduleDays, profile?.visa || "");
  await _relayText(text, { kind: "slots", dedupKey: key, notifyMuktesh: true });
}

export function captionForCityCheck(postName, scheduleDays, hasError) {
  const dates = _extractDates(scheduleDays);
  const when = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const city = postName || "Unknown city";
  if (hasError) {
    return `<b>City changed — error</b>\n🏛️ ${city}\n🕐 ${when} IST\n📲 Visa Slot 10`;
  }
  if (dates.length) {
    const preview = dates.slice(0, 5).map((d) => _prettyDate(d)).join(", ");
    return `<b>DATES AVAILABLE</b>\n🏛️ ${city}\n📆 ${dates.length} date(s)\n${preview}${dates.length > 5 ? "…" : ""}\n🕐 ${when} IST\n📲 Visa Slot 10`;
  }
  return `<b>City changed — no dates</b>\n🏛️ ${city}\n🕐 ${when} IST\n📲 Visa Slot 10`;
}

export function captionForCalendar(postName, dateStr) {
  const when = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const date = dateStr ? _prettyDate(String(dateStr).slice(0, 10)) : "—";
  return `<b>Calendar open</b>\n🏛️ ${postName || "Unknown"}\n📅 ${date}\n🕐 ${when} IST\n📲 Visa Slot 10`;
}

export function captionForTimeSlots(postName, dateStr, entryCount) {
  const when = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const date = dateStr ? _prettyDate(String(dateStr).slice(0, 10)) : "—";
  return `<b>Time slots loaded</b>\n🏛️ ${postName || "Unknown"}\n📅 ${date}\n⏰ ${entryCount} slot(s)\n🕐 ${when} IST\n📲 Visa Slot 10`;
}

/** Screenshot → server → bot → you + Muktesh (photo + caption). */
export async function notifyTelegramScreenshot(caption, {
  kind = "screen",
  dedupKey,
  waitMs = 0,
  skipDedup = false,
} = {}) {
  if (await getSetting("telegramScreenshots") === false) return;
  if (!await _useServerRelay()) return;

  const key = dedupKey || `${kind}:${String(caption).slice(0, 80)}`;
  if (!skipDedup && !_shouldSendScreenshot(key)) return;

  _relayScreenshot(caption, {
    kind,
    dedupKey: key,
    waitMs,
    skipDedup,
    notifyMuktesh: true,
  });
}

export async function notifyTelegramCityScreenshot(scheduleDays, { postId, postName, hasError } = {}) {
  const caption = captionForCityCheck(postName, scheduleDays, hasError);
  const dates = _extractDates(scheduleDays);
  const kind = dates.length ? "dates" : "city";
  await notifyTelegramScreenshot(caption, {
    kind,
    dedupKey: `${kind}:${postId || postName}:${dates.length}:${hasError ? 1 : 0}`,
    waitMs: dates.length ? 1400 : 900,
  });
}

export async function notifyTelegramCalendarScreenshot(postName, dateStr) {
  await notifyTelegramScreenshot(captionForCalendar(postName, dateStr), {
    kind: "calendar",
    dedupKey: `cal:${postName}:${String(dateStr).slice(0, 10)}`,
    waitMs: 650,
  });
}

export async function notifyTelegramTimeScreenshot(postName, dateStr, entryCount) {
  await notifyTelegramScreenshot(captionForTimeSlots(postName, dateStr, entryCount), {
    kind: "times",
    dedupKey: `times:${postName}:${String(dateStr).slice(0, 10)}:${entryCount}`,
    waitMs: 500,
  });
}

/** Telegram when Submit is clicked — via gopg.online server bot. */
export async function notifyTelegramSubmit() {
  const now = Date.now();
  if (now - _lastSubmitNotifyAt < 8000) return;
  _lastSubmitNotifyAt = now;

  const profile = await getProfile();
  const { city, date, time } = _pageBookingDetails();
  const when = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const lines = [
    "<b>✅ SUBMIT CLICKED!</b>",
    "",
    `🏛️ <b>City:</b> ${city}`,
    `📅 <b>Date:</b> ${date}`,
    `⏰ <b>Time:</b> ${time}`,
  ];
  if (profile?.email) lines.push(`👤 <b>Account:</b> ${profile.email}`);
  if (profile?.visa) lines.push(`🪪 <b>Visa:</b> ${profile.visa}`);
  lines.push(`🕐 <b>When:</b> ${when} IST`, "", "📲 Visa Slot 10 — Submit");

  const text = lines.join("\n");
  await _relayText(text, { kind: "submit", skipDedup: true, notifyMuktesh: true });
  await notifyTelegramScreenshot(text, { kind: "submit", skipDedup: true, waitMs: 200 });
}
