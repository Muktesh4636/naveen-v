import { showBlockMessage } from "./cloudflare.js";
import { showWaitTime, showWaiting, slotsAlert } from "./scheduling-controls.js";
import { showDates } from "./scheduling-panels.js";
import { notifyTelegramSlots } from "./telegram-notify.js";
import { pollAndPickTimeSlot, domShowsEntryTimes, isTimeSlotPicked, pickTimeSlotDual } from "./time-select.js";
import { submitContribution } from "./reporting.js";
import { recordSubmitAjaxResponse } from "./submit-errors.js";
import { reportBookingEvent } from "./booking-log.js";
import { recordPseFromScheduleDays, notePseAction } from "./pse-diagnostics.js";
import {
  getArmedAiConfig,
  getCitiesRotateConfig,
  haltCityRotateForBooking,
  resumeCityRotateAfterBooking,
  isInterviewPage,
  isOpsFrozen,
  noteCityRotateResponse,
  pauseCityRotateForWait,
  setTikTikStatus,
  thawOps,
  filterDaysInAiRange,
  dateInRange,
  getAutoSubmitLimits,
  pickPreferredDateIndex,
  triggerAutoSubmitIfArmed,
  AI_DATE_SELECT_MS,
  AI_BOOK_POLL_MS,
  AI_BOOK_SLOT_INDEX,
} from "./ai-submit.js";
import { getPosts, getProfile, getSetting, setPosts } from "../shared/config.js";
import { storageSet, extensionAlive } from "../shared/runtime.js";
import { vs } from "../shared/lifecycle.js";
import { T } from "../shared/token.js";

export var SCHEDULE_DAYS_TAILS = [
  "get-family-consular-schedule-days",
  "get-family-ofc-schedule-days"
];
export function routeTail(rawUrl) {
  const route = new URL(rawUrl, window.location.href).searchParams.get("route");
  return route ? route.split("/").pop() : null;
}
export function parseEvent(event) {
  if (event.data.status === 429) {
    return {
      retryAfter: event.data.retryAfter,
      cgiBlock: event.data.cgiBlock
    };
  }
  const tail = routeTail(event.data.url);
  const request = new URLSearchParams(event.data.request || "");
  const rawParams = request.get("parameters");
  if (!rawParams) return null;
  let params;
  try {
    params = JSON.parse(rawParams);
  } catch {
    return null;
  }
  return {
    params,
    tail,
    response: event.data.response
  };
}
export async function alertOnAvailability(scheduleDays, meta = {}) {
  if (!scheduleDays?.length) return;
  await notifyTelegramSlots(scheduleDays, meta);
  if (!await getSetting("audioAlert")) return;
  slotsAlert();
}

async function pickDateToSelect(scheduleDays, hasError = false) {
  if (hasError) return null;
  if (isInterviewPage()) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const normalized = (scheduleDays || [])
    .map((d) => {
      if (!d) return null;
      const date = normalizeScheduleDate(d.Date);
      return date ? { ...d, Date: date } : null;
    })
    .filter(Boolean)
    .filter((d) => {
      const [y, m, day] = d.Date.slice(0, 10).split("-").map(Number);
      if (!y || !m || !day) return false;
      return new Date(y, m - 1, day) >= today;
    })
    .sort((a, b) => String(a.Date).localeCompare(String(b.Date)));

  const ai = await getArmedAiConfig();
  if (ai) {
    const inRange = normalized.filter((d) => dateInRange(d.Date, ai.from, ai.to));
    if (!inRange.length) return null;
    const pool = inRange.map((d) => d.Date);
    // Spread across accounts: server assigns least-claimed date in this user's range.
    try {
      const { claimSpreadDate } = await import("./city-rotate-server.js");
      const select = document.querySelector("#post_select");
      const cityId = select ? String(select.value || "") : "";
      const claimed = await claimSpreadDate({
        cityId,
        dates: pool,
        from: ai.from,
        to: ai.to,
        avoid: [..._dateTried],
      });
      if (claimed && pool.includes(claimed)) return claimed;
    } catch {}
    const idx = pickPreferredDateIndex(inRange.length);
    return inRange[idx]?.Date || null;
  }

  if (!await getSetting("autoSelectFirstDate")) return null;
  if (!normalized.length) return null;
  const idx = pickPreferredDateIndex(normalized.length);
  return normalized[idx]?.Date || null;
}

function normalizeScheduleDate(raw) {
  if (raw == null) return null;
  const s = String(raw).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  const slash = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (slash) {
    const [, mm, dd, yyyy] = slash;
    return `${yyyy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`;
  }
  const ms = s.match(/\/Date\((-?\d+)\)\//);
  if (ms) {
    const d = new Date(Number(ms[1]));
    if (!Number.isNaN(d.getTime())) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }
  }
  return null;
}

function isCalendarDateSelected(dateStr) {
  if (!dateStr) return false;
  const [year, month, day] = dateStr.slice(0, 10).split("-").map(Number);
  if (!year || !month || !day) return false;
  const uiMonth = month - 1;

  for (const td of document.querySelectorAll(
    "td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active"
  )) {
    const a = td.querySelector("a");
    if (!a) continue;
    const m = parseInt(td.getAttribute("data-month"), 10);
    const y = parseInt(td.getAttribute("data-year"), 10);
    const d = parseInt(a.textContent, 10);
    if (y === year && m === uiMonth && d === day) return true;
  }
  return false;
}

var _datePickWatchdog = null;

function scheduleDatePickWatchdog(dateStr) {
  if (_datePickWatchdog) vs.clear(_datePickWatchdog);
  const deadline = Date.now() + 8000;

  const tick = () => {
    if (!vs.alive || Date.now() > deadline) return;
    if (isCalendarDateSelected(dateStr)) return;
    vs.send({
      action: "selectFirstDate",
      date: dateStr,
      maxMs: 8000,
      pollMs: AI_BOOK_POLL_MS,
    });
    _datePickWatchdog = vs.setTimeout(tick, AI_BOOK_POLL_MS);
  };

  _datePickWatchdog = vs.setTimeout(tick, 80);
}

function normalizeScheduleTime(raw) {
  const s = String(raw || "").trim();
  const iso = s.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);
  if (iso) return iso[1];
  return s;
}

function _entryAvailability(entry) {
  const n = Number(entry?.EntriesAvailable);
  return Number.isFinite(n) ? n : -1;
}

function _ordinal(n) {
  const v = Number(n) || 0;
  const mod100 = v % 100;
  if (mod100 >= 11 && mod100 <= 13) return "th";
  switch (v % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

/**
 * Rank by Availability (desc). Server rules: skip highest + start rank + max tries.
 */
function _buildLimitedSlotPool(entries) {
  const list = (entries || []).filter(Boolean);
  if (!list.length) return [];
  const limits = getAutoSubmitLimits();
  const maxTries = Math.max(1, Math.min(5, limits.maxSlotTries || 4));
  const startRank = Math.max(1, Math.min(5, limits.slotStartRank || 2));
  const skipHighest = limits.skipHighestSlot !== false;

  const ranked = list
    .map((entry, slotIndex) => ({
      entry,
      slotIndex,
      avail: _entryAvailability(entry),
    }))
    .sort((a, b) => {
      if (b.avail !== a.avail) return b.avail - a.avail;
      return a.slotIndex - b.slotIndex;
    });

  if (ranked.length === 1) {
    return [{ ...ranked[0], rank: 1 }];
  }

  // startRank 1 = index 0; if skipHighest, never start below rank 2.
  let fromIdx = Math.max(0, startRank - 1);
  if (skipHighest && fromIdx < 1) fromIdx = 1;
  return ranked.slice(fromIdx, fromIdx + maxTries).map((r, i) => ({
    ...r,
    rank: fromIdx + i + 1,
  }));
}

const TIME_SLOT_SELECTOR = [
  "#schedule-entries table input[type=\"radio\"]:not([disabled])",
  "#schedule-entries table input[type=\"checkbox\"]:not([disabled])",
  "#page_form table input[type=\"radio\"]:not([disabled])",
  "#page_form table input[type=\"checkbox\"]:not([disabled])",
  "table input[type=\"radio\"]:not([disabled])",
  "table input[type=\"checkbox\"]:not([disabled])",
].join(", ");

var _cachedScheduleEntries = null;
var _cachedEntriesDate = null;
var _timePickWatchdog = null;

/** Auto Submit: when a date has no slots, try at most server max (same city). */
/** Auto Submit: dates in range still to try when a date has no time slots. */
var _dateTryPool = [];
var _dateTried = new Set();
var _dateTrying = null;
var _slotsFailTimer = null;
var _fallbackInFlight = false;

function _clearSlotsFailTimer() {
  if (_slotsFailTimer) {
    vs.clear(_slotsFailTimer);
    _slotsFailTimer = null;
  }
}

/** Prefer firstPicked, then up to max date tries via same preference rule. */
function _buildLimitedDatePool(pool, firstPicked) {
  const dates = [...new Set((pool || []).map((d) => String(d).slice(0, 10)).filter(Boolean))];
  if (!dates.length) return [];
  const maxTries = getAutoSubmitLimits().maxDateTries;
  const out = [];
  const first = firstPicked ? String(firstPicked).slice(0, 10) : null;
  if (first && dates.includes(first)) out.push(first);
  const remaining = dates.filter((d) => !out.includes(d));
  while (out.length < maxTries && remaining.length) {
    const idx = pickPreferredDateIndex(remaining.length);
    const next = remaining.splice(Math.max(0, idx), 1)[0];
    if (next) out.push(next);
  }
  return out;
}

function resetDateTryPool(pool = [], firstPicked = null) {
  _clearSlotsFailTimer();
  _fallbackInFlight = false;
  _dateTryPool = _buildLimitedDatePool(pool, firstPicked);
  _dateTried = new Set();
  _dateTrying = firstPicked ? String(firstPicked).slice(0, 10) : null;
  if (_dateTrying) _dateTried.add(_dateTrying);
}

function _nextFallbackDate() {
  const maxTries = getAutoSubmitLimits().maxDateTries;
  if (_dateTried.size >= maxTries) return null;
  const remaining = _dateTryPool.filter((d) => !_dateTried.has(d));
  if (!remaining.length) return null;
  const idx = pickPreferredDateIndex(remaining.length);
  return remaining[Math.max(0, idx)] || remaining[0];
}

function _usableTimeEntries(entries) {
  return (entries || []).filter((e) => {
    if (!e || !e.Time) return false;
    if (e.EntriesAvailable != null && Number(e.EntriesAvailable) <= 0) return false;
    return true;
  });
}

const DATE_PICKER_SELECTOR = [
  "#datepicker.hasDatepicker",
  "#datepicker .ui-datepicker",
  "#ui-datepicker-div",
].join(", ");

async function tryNextDateAfterNoSlots(failedDate) {
  const ai = await getArmedAiConfig();
  if (!ai || isOpsFrozen() || !vs.alive) return false;
  if (_fallbackInFlight) return false;
  _fallbackInFlight = true;

  try {
    // Stay on this city while retrying a few dates — pause hop, don't kill City Change.
    haltCityRotateForBooking();

    const failed = failedDate ? String(failedDate).slice(0, 10) : _dateTrying;
    if (failed) _dateTried.add(failed);

    const maxDates = getAutoSubmitLimits().maxDateTries;
    const next = _nextFallbackDate();
    if (!next) {
      setTikTikStatus(
        `No time slots after ${Math.min(_dateTried.size, maxDates)} dates — next city…`
      );
      reportBookingEvent({
        kind: "date_pick",
        stage: "exhausted",
        level: "warn",
        message: `No time slots after ${Math.min(_dateTried.size, maxDates)} dates — next hot city`,
        date: failed || "",
      });
      // This account only: jump to another preferred hot city if any.
      resumeCityRotateAfterBooking();
      try {
        const { requestNextHotAfterFail } = await import("./city-rotate-server.js");
        await requestNextHotAfterFail();
      } catch {}
      return false;
    }

    _dateTrying = next;
    _dateTried.add(next);
    _cachedScheduleEntries = null;
    _cachedEntriesDate = null;
    // Prefer a server-spread date among remaining pool (still in user's range).
    try {
      const { claimSpreadDate } = await import("./city-rotate-server.js");
      const select = document.querySelector("#post_select");
      const remaining = _dateTryPool.filter((d) => d === next || !_dateTried.has(d));
      const claimed = await claimSpreadDate({
        cityId: select ? String(select.value || "") : "",
        dates: remaining.length ? remaining : [next],
        from: ai.from,
        to: ai.to,
        avoid: [..._dateTried].filter((d) => d !== next),
      });
      if (claimed && (remaining.includes(claimed) || claimed === next)) {
        _dateTrying = claimed;
        _dateTried.add(claimed);
      }
    } catch {}
    const useDate = _dateTrying;
    setTikTikStatus(
      `No slots on ${failed || "date"} — trying ${useDate} (${_dateTried.size}/${maxDates})…`
    );
    reportBookingEvent({
      kind: "date_pick",
      stage: "fallback",
      level: "info",
      message: `No slots on ${failed || "date"} — trying ${useDate}`,
      date: useDate,
      detail: { failed: failed || "", try: _dateTried.size, max: maxDates },
    });

    await vs.waitFor(DATE_PICKER_SELECTOR, { attempts: 80, interval: AI_BOOK_POLL_MS });
    vs.send({
      action: "selectFirstDate",
      date: useDate,
      maxMs: AI_DATE_SELECT_MS,
      pollMs: AI_BOOK_POLL_MS,
    });
    scheduleDatePickWatchdog(useDate);
    scheduleTimePickWatchdog(useDate);
    return true;
  } finally {
    _fallbackInFlight = false;
  }
}

/** Only call tryNextDateAfterNoSlots on CGI "no slots" / error — not while still loading. */
function shouldFallbackNoSlotsOrError({ hasError, entries, errorText } = {}) {
  if (hasError) return true;
  const msg = String(errorText || "");
  if (/no\s*slots?|unable to load|PSE0501|error/i.test(msg)) return true;
  // Empty entries array from CGI = no slots for that date (response received).
  if (Array.isArray(entries) && _usableTimeEntries(entries).length === 0) return true;
  return false;
}

function cacheScheduleEntries(entries, dateStr) {
  _cachedScheduleEntries = entries;
  _cachedEntriesDate = dateStr ? String(dateStr).slice(0, 10) : null;
}

function scheduleTimePickWatchdog(dateStr, slotIndex = 0) {
  if (_timePickWatchdog) vs.clear(_timePickWatchdog);
  const targetDate = dateStr ? String(dateStr).slice(0, 10) : null;
  let rounds = 0;

  const run = async () => {
    // Wait for CGI — do NOT jump to another date on timeout alone.
    if (!vs.alive || isOpsFrozen() || ++rounds > 400) return;
    if (isTimeSlotPicked()) {
      _clearSlotsFailTimer();
      return;
    }

    const entries = _usableTimeEntries(_cachedScheduleEntries);
    if (entries.length) {
      const pool = _buildLimitedSlotPool(entries);
      for (let i = 0; i < pool.length; i++) {
        if (!vs.alive || isOpsFrozen() || isTimeSlotPicked()) break;
        const { entry, slotIndex: idx, avail, rank } = pool[i];
        const time = normalizeScheduleTime(entry.Time);
        setTikTikStatus(
          `Watchdog: ${rank}${_ordinal(rank)}-highest avail (${avail}) @ ${time} (${i + 1}/${pool.length})…`
        );
        await pickTimeSlotDual({
          time,
          date: entry.Date ? String(entry.Date).slice(0, 10) : targetDate,
          slotIndex: idx,
          pollMs: AI_BOOK_POLL_MS,
          maxMs: 600,
          prefix: T,
        });
        if (isTimeSlotPicked()) {
          _clearSlotsFailTimer();
          return;
        }
      }
    } else if (document.querySelector(TIME_SLOT_SELECTOR)) {
      // DOM fallback: rank visible rows by Availability text; apply server rules.
      const radios = [...document.querySelectorAll(TIME_SLOT_SELECTOR)];
      const ranked = radios
        .map((el, slotIndex) => {
          const row = el.closest("tr");
          const text = row?.textContent || "";
          const m = text.match(/availability[^0-9]*(\d+)/i) || text.match(/\b(\d{1,4})\s*$/);
          const avail = m ? Number(m[1]) : -1;
          return { el, slotIndex, avail };
        })
        .sort((a, b) => b.avail - a.avail || a.slotIndex - b.slotIndex);
      const limits = getAutoSubmitLimits();
      const maxSlots = Math.max(1, Math.min(5, limits.maxSlotTries || 4));
      const startRank = Math.max(1, Math.min(5, limits.slotStartRank || 2));
      const skipHighest = limits.skipHighestSlot !== false;
      let fromIdx = Math.max(0, startRank - 1);
      if (skipHighest && fromIdx < 1) fromIdx = 1;
      const picks = ranked.length <= 1 ? ranked : ranked.slice(fromIdx, fromIdx + maxSlots);
      for (let i = 0; i < picks.length; i++) {
        if (!vs.alive || isOpsFrozen() || isTimeSlotPicked()) break;
        const { slotIndex: idx, avail } = picks[i];
        const rank = ranked.length <= 1 ? 1 : fromIdx + i + 1;
        setTikTikStatus(
          `Watchdog: ${rank}${_ordinal(rank)}-highest avail (${avail}) (${i + 1}/${picks.length})…`
        );
        await pickTimeSlotDual({
          time: "00:00",
          date: targetDate,
          slotIndex: Math.max(0, idx),
          pollMs: AI_BOOK_POLL_MS,
          maxMs: 600,
          prefix: T,
        });
        if (isTimeSlotPicked()) {
          _clearSlotsFailTimer();
          return;
        }
      }
    }

    _timePickWatchdog = vs.setTimeout(run, AI_BOOK_POLL_MS);
  };

  _timePickWatchdog = vs.setTimeout(run, 300);
}

export async function autoSelectFirstDate(scheduleDays, hasError = false) {
  if (hasError) return null;
  const picked = await pickDateToSelect(scheduleDays, hasError);
  if (!picked) return null;

  const ai = await getArmedAiConfig();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const normalized = (scheduleDays || [])
    .map((d) => normalizeScheduleDate(d?.Date))
    .filter(Boolean)
    .filter((d) => {
      const [y, m, day] = d.slice(0, 10).split("-").map(Number);
      return new Date(y, m - 1, day) >= today;
    })
    .sort((a, b) => a.localeCompare(b));
  const pool = ai
    ? normalized.filter((d) => dateInRange(d, ai.from, ai.to))
    : normalized;
  const idx = pickPreferredDateIndex(pool.length);

  if (ai) resetDateTryPool(pool, picked);
  else resetDateTryPool([], null);

  setTikTikStatus(`Selecting date #${idx + 1}: ${picked}…`);
  reportBookingEvent({
    kind: "date_pick",
    stage: "start",
    level: "info",
    message: `Selecting date #${idx + 1}: ${picked}`,
    date: picked,
    detail: { index: idx, pool: pool.length },
  });

  // Fire immediately — do not wait for Telegram or city rotate.
  vs.send({
    action: "selectFirstDate",
    date: picked,
    maxMs: AI_DATE_SELECT_MS,
    pollMs: AI_BOOK_POLL_MS,
  });

  await vs.waitFor(DATE_PICKER_SELECTOR, { attempts: 120, interval: AI_BOOK_POLL_MS });

  vs.send({
    action: "selectFirstDate",
    date: picked,
    maxMs: AI_DATE_SELECT_MS,
    pollMs: AI_BOOK_POLL_MS,
  });

  scheduleDatePickWatchdog(picked);
  scheduleTimePickWatchdog(picked, AI_BOOK_SLOT_INDEX);
  return picked;
}

export async function autoSelectFirstTime(scheduleEntries, hasError = false, errorText = "") {
  if (isInterviewPage()) return;
  if (isOpsFrozen()) return;

  const ai = await getArmedAiConfig();
  if (!ai && !await getSetting("autoSelectFirstDate")) return;

  // Only jump date when CGI clearly says no slots / error — never while still loading.
  if (ai && shouldFallbackNoSlotsOrError({
    hasError,
    entries: scheduleEntries,
    errorText,
  })) {
    setTikTikStatus(hasError
      ? "CGI error on this date — trying next…"
      : "No slots on this date — trying next…");
    reportBookingEvent({
      kind: "time_pick",
      stage: "no_slots",
      level: "warn",
      message: hasError ? "CGI error on this date" : "No slots on this date",
      date: _cachedEntriesDate || _dateTrying || "",
      detail: { hasError: !!hasError, errorText: String(errorText || "").slice(0, 500) },
    });
    await tryNextDateAfterNoSlots(_cachedEntriesDate || _dateTrying);
    return;
  }

  let entries = _usableTimeEntries(scheduleEntries);
  if (ai) {
    entries = entries.filter((e) => {
      const d = normalizeScheduleDate(e.Date);
      if (!d) return true;
      return d >= ai.from && d <= ai.to;
    });
  }

  if (!entries.length) return;

  const slotPool = _buildLimitedSlotPool(entries);
  if (!slotPool.length) return;

  setTikTikStatus(`Waiting for time slots… (2nd–highest avail first, up to ${slotPool.length})`);

  const slotDeadline = Date.now() + 10000;
  while (Date.now() < slotDeadline && vs.alive) {
    if (domShowsEntryTimes(entries) || document.querySelector(TIME_SLOT_SELECTOR)) break;
    await new Promise((r) => vs.setTimeout(r, AI_BOOK_POLL_MS));
  }

  for (let i = 0; i < slotPool.length; i++) {
    if (!vs.alive || isOpsFrozen()) return;
    if (isTimeSlotPicked()) break;

    const { entry, slotIndex, avail, rank } = slotPool[i];
    const time = normalizeScheduleTime(entry.Time);
    const date = entry.Date ? String(entry.Date).slice(0, 10) : null;

    setTikTikStatus(
      `Trying ${rank}${_ordinal(rank)}-highest avail (${avail}) @ ${time} (${i + 1}/${slotPool.length})…`
    );
    reportBookingEvent({
      kind: "time_pick",
      stage: "try",
      level: "info",
      message: `Trying ${rank}${_ordinal(rank)}-highest avail (${avail}) @ ${time}`,
      date: date || "",
      time,
      detail: { rank, avail, attempt: i + 1, pool: slotPool.length },
    });
    const picked = await pickTimeSlotDual({
      time,
      date,
      slotIndex,
      pollMs: AI_BOOK_POLL_MS,
      maxMs: 4000,
      prefix: T,
    });

    if (picked || isTimeSlotPicked()) {
      _clearSlotsFailTimer();
      setTikTikStatus(`Selected ${rank}${_ordinal(rank)}-highest avail (${avail}) @ ${time}`);
      reportBookingEvent({
        kind: "time_pick",
        stage: "success",
        level: "info",
        message: `Selected ${rank}${_ordinal(rank)}-highest avail (${avail}) @ ${time}`,
        date: date || "",
        time,
        detail: { rank, avail },
      });
      await triggerAutoSubmitIfArmed();
      return;
    }
  }

  if (isTimeSlotPicked()) {
    _clearSlotsFailTimer();
    setTikTikStatus("Time slot selected");
    reportBookingEvent({
      kind: "time_pick",
      stage: "success",
      level: "info",
      message: "Time slot selected (DOM)",
    });
    await triggerAutoSubmitIfArmed();
    return;
  }

  setTikTikStatus("Tried top availability slots (2nd–4th+) but none clicked — pick manually.");
  reportBookingEvent({
    kind: "time_pick",
    stage: "fail",
    level: "error",
    message: "Tried top availability slots but none clicked",
    date: _cachedEntriesDate || _dateTrying || "",
    detail: { tried: slotPool.length },
  });
  // If no more dates to try, resume city hopping.
  if (!_nextFallbackDate()) {
    resumeCityRotateAfterBooking();
  }
}

export async function handleEvent(event) {
  if (!extensionAlive()) return;
  if (isInterviewPage()) return;

  let parsed;
  try {
    parsed = parseEvent(event);
  } catch {
    return;
  }
  if (parsed == null) return;
  recordSubmitAjaxResponse(parsed);
  if (parsed.retryAfter !== void 0) {
    const wait = Number(parsed.retryAfter);
    showBlockMessage(parsed.cgiBlock, wait);
    if (wait) {
      showWaitTime(wait);
      pauseCityRotateForWait(wait);
    } else {
      getSetting("defaultWaitTime").then((defaultWait) => {
        showWaitTime(defaultWait);
        pauseCityRotateForWait(defaultWait);
      });
    }
    return;
  }
  let postsTails = ["query-consular-posts", "query-ofc-posts"];
  if (postsTails.includes(parsed.tail)) {
    const incoming = parsed.response.Posts || [];
    const byId = new Map((await getPosts()).map((post) => [post.ID, post]));
    for (const post of incoming) {
      byId.set(post.ID, { ...byId.get(post.ID), ...post });
    }
    await setPosts([...byId.values()]);
  }
  let membersTails = [
    "query-family-members-consular",
    "query-family-members-consular-reschedule",
    "query-family-members-ofc",
    "query-family-members-ofc-reschedule"
  ];
  if (membersTails.includes(parsed.tail)) {
    const members = parsed.response.Members || [];
    if (members.length) {
      const profile = await getProfile() || {};
      const matched = profile.name && members.find((m) => m.FullName === profile.name);
      profile.visa = (matched || members[0]).VisaClassName;
      await storageSet({ profile, members });
    }
  }
  if (SCHEDULE_DAYS_TAILS.includes(parsed.tail)) {
    // New dates loaded — allow date/slot pick again (e.g. after city change).
    thawOps();
    // Paint the date list first — storage / auto-select can wait.
    showDates(parsed);

    const hasError = !!parsed.response.HasError;
    const days = parsed.response.ScheduleDays || [];
    const errText = new DOMParser().parseFromString(
      parsed.response.ErrorString || "",
      "text/html"
    ).body.innerText || "";
    const noSlotsMsg = /no\s*slots?/i.test(errText);
    const noDays = !days.length || hasError || noSlotsMsg;

    notePseAction("schedule_days", {
      hasError,
      days: days.length,
      noSlots: noSlotsMsg,
      postId: parsed.params?.postId || "",
      err: String(errText || "").slice(0, 120),
    });
    recordPseFromScheduleDays({
      hasError,
      errorText: errText,
      daysLen: days.length,
      postId: parsed.params?.postId || "",
      postName: "",
    });

    const ai = await getArmedAiConfig();
    const inRange =
      ai && !hasError && !noSlotsMsg ? filterDaysInAiRange(days, ai.from, ai.to) : [];
    const bookingThisCity = !!(ai && inRange.length);

    // Pause city hop BEFORE any unlock — so dates stay on screen for Auto Submit.
    if (bookingThisCity) {
      haltCityRotateForBooking();
    } else {
      resumeCityRotateAfterBooking();
      // No bookable dates here — unlock rotation (no slots / out of range / Auto Submit off).
      noteCityRotateResponse({
        hasError,
        days,
        noDays,
        errorText: errText,
      });
    }

    const rotating = await getCitiesRotateConfig();
    // While city rotation is on, skip the long manual recheck wait.
    if (!rotating) {
      getSetting("defaultWaitTime").then((defaultWait) => {
        showWaitTime(defaultWait);
      });
    }

    const posts = await getPosts();
    const post = posts.find((post2) => post2.ID === parsed.params.postId);
    if (post) {
      post.Days = parsed.response.ScheduleDays;
      post.Updated = Date.now();
      post.HasError = parsed.response.HasError;
      post.ErrorString = new DOMParser().parseFromString(
        parsed.response.ErrorString || "",
        "text/html"
      ).body.innerText;
      setPosts(posts);
    }

    // Pick date FIRST — before Telegram/screenshots (those were delaying the calendar click).
    let pickedDate = null;
    if (!hasError && !noSlotsMsg) {
      pickedDate = await autoSelectFirstDate(days, hasError);
    }

    if (pickedDate) {
      setTikTikStatus(`Selecting date: ${pickedDate}…`);
    } else if (bookingThisCity) {
      setTikTikStatus(
        `Dates in range — picking ${inRange[0]?.Date?.slice(0, 10) || "date"}…`
      );
    } else if (ai && !hasError) {
      resumeCityRotateAfterBooking();
      const daysList = (parsed.response.ScheduleDays || [])
        .map((d) => normalizeScheduleDate(d?.Date))
        .filter(Boolean);
      const inRangeDays = daysList.filter((d) => dateInRange(d, ai.from, ai.to));
      if (daysList.length && !inRangeDays.length) {
        setTikTikStatus(`Dates found but none in ${ai.from} → ${ai.to}. Widen your range in Tik Tik.`);
      } else if (!daysList.length) {
        setTikTikStatus("No dates on this city yet.");
      }
    }

    await alertOnAvailability(parsed.response.ScheduleDays, {
      postId: parsed.params.postId,
      postName: post?.Name,
      hasError: parsed.response.HasError,
    });

    await submitContribution();
  }
  let scheduleEntriesTails = [
    "get-family-consular-schedule-entries",
    "get-family-ofc-schedule-entries"
  ];
  if (scheduleEntriesTails.includes(parsed.tail)) {
    const targetDate = parsed.params.Date.split("T")[0];
    cacheScheduleEntries(parsed.response.ScheduleEntries, targetDate);
    scheduleTimePickWatchdog(targetDate, AI_BOOK_SLOT_INDEX);

    const posts = await getPosts();
    const post = posts.filter((post2) => post2.Days && post2.Updated).sort((a, b) => b.Updated - a.Updated).find((post2) => post2.Days.some((day) => day.Date === targetDate));
    if (post) {
      const day = post.Days.find((day2) => day2.Date === targetDate);
      if (day) {
        day.Times = parsed.response.ScheduleEntries;
        setPosts(posts);
      }
    }
    const errText = new DOMParser().parseFromString(
      parsed.response.ErrorString || "",
      "text/html"
    ).body.innerText;
    await autoSelectFirstTime(
      parsed.response.ScheduleEntries,
      parsed.response.HasError,
      errText
    );
    await submitContribution();
  }
}
export function handleRequest(event) {
  if (!extensionAlive()) return;
  if (isInterviewPage()) return;
  const tail = routeTail(event.data.url);
  if (SCHEDULE_DAYS_TAILS.includes(tail)) {
    showWaiting();
  }
}
