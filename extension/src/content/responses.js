import { showBlockMessage } from "./cloudflare.js";
import { showWaitTime, showWaiting, slotsAlert } from "./scheduling-controls.js";
import { showDates, showScheduleEntries } from "./scheduling-panels.js";
import { notifyTelegramSlots, notifyTelegramCityScreenshot, notifyTelegramCalendarScreenshot, notifyTelegramTimeScreenshot } from "./telegram-notify.js";
import { pollAndPickTimeSlot, domShowsEntryTimes, isTimeSlotPicked, pickTimeSlotDual } from "./time-select.js";
import { submitContribution } from "./reporting.js";
import { recordSubmitAjaxResponse } from "./submit-errors.js";
import { reportCitySlotsFound } from "./tik-tik-coord.js";
import {
  getArmedAiConfig,
  getDateRangeConfig,
  getCitiesRotateConfig,
  haltCityRotateForBooking,
  resumeCityRotateAfterBooking,
  isSubmitPendingConfirm,
  isInterviewPage,
  isOpsFrozen,
  noteCityRotateResponse,
  pauseCityRotateForWait,
  armAiFastSubmit,
  setTikTikStatus,
  triggerAutoSubmitIfArmed,
  clickSubmitDual,
  isSubmitButtonEnabled,
  waitForSubmitEnabled,
  thawOps,
  filterDaysInAiRange,
  dateInRange,
  pickPreferredDateIndex,
  noteDatePicked,
  AI_DATE_SELECT_MS,
  AI_BOOK_SELECT_MS,
  AI_TIME_DOM_WAIT_MS,
  AI_BOOK_POLL_MS,
  AI_BOOK_SLOT_INDEX,
  AI_SUBMIT_ARM_MS,
  AI_MULTI_SLOT_SUBMIT_WAIT_MS,
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

  // From–To set (Consular or OFC): only book dates inside the range.
  const range = await getDateRangeConfig();
  if (range) {
    const inRange = normalized.filter((d) => dateInRange(d.Date, range.from, range.to));
    if (!inRange.length) return null;
    const canSelect =
      range.submitArmed || !!(await getSetting("autoSelectFirstDate"));
    if (!canSelect) return null;
    const idx = pickPreferredDateIndex(inRange.length);
    return inRange[idx]?.Date || null;
  }

  if (!await getSetting("autoSelectFirstDate")) return null;
  if (!normalized.length) return null;
  const idx = pickPreferredDateIndex(normalized.length);
  return normalized[idx]?.Date || null;
}

/** Jump calendar to a month/day without selecting/booking (no time load). */
async function jumpCalendarMonthOnly(dateIso, range) {
  if (!dateIso || isInterviewPage() || isOpsFrozen()) return;
  const label = range
    ? `none in ${range.from} → ${range.to}`
    : "outside preferred range";
  setTikTikStatus(
    `Dates found but ${label} — jumping calendar to ${dateIso} (not booking)…`
  );
  try {
    await vs.waitFor(DATE_PICKER_SELECTOR, { attempts: 80, interval: AI_BOOK_POLL_MS });
  } catch {}
  vs.send({
    action: "selectFirstDate",
    date: dateIso,
    navigateOnly: true,
    maxMs: 4000,
    pollMs: AI_BOOK_POLL_MS,
  });
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
  const formatted =
    String(month).padStart(2, "0") + "/" + String(day).padStart(2, "0") + "/" + year;

  // Fast path: input value / jQuery getDate (calendar need not be open).
  const input = document.querySelector("#datepicker");
  if (input) {
    const v = String(input.value || "").trim();
    if (v === formatted) return true;
    if (v.includes(String(year)) && v.includes(String(day).padStart(2, "0"))) {
      // e.g. 10/05/2026 vs 10/5/2026
      const parts = v.split(/[/-]/).map((p) => parseInt(p, 10));
      if (parts.length >= 3) {
        let y; let m; let d;
        if (parts[2] > 31) {
          m = parts[0]; d = parts[1]; y = parts[2];
        } else {
          y = parts[0]; m = parts[1]; d = parts[2];
        }
        if (y === year && m === month && d === day) return true;
      }
    }
    try {
      const $ = window.jQuery || window.$;
      if ($ && $(input).hasClass("hasDatepicker")) {
        const selected = $(input).datepicker("getDate");
        if (
          selected &&
          selected.getFullYear() === year &&
          selected.getMonth() === uiMonth &&
          selected.getDate() === day
        ) {
          return true;
        }
      }
    } catch {}
  }

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

function scheduleDatePickWatchdog(dateStr, ai) {
  if (_datePickWatchdog) vs.clear(_datePickWatchdog);
  const deadline = Date.now() + (ai ? AI_DATE_SELECT_MS : 8000);

  const tick = () => {
    if (!vs.alive || Date.now() > deadline) return;
    if (isCalendarDateSelected(dateStr)) return;
    vs.send({
      action: "selectFirstDate",
      date: dateStr,
      maxMs: ai ? AI_DATE_SELECT_MS : 8000,
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

/** Availability score for a schedule entry. */
function _slotAvailability(entry) {
  const n = Number(entry?.EntriesAvailable);
  return Number.isFinite(n) ? n : -1;
}

/**
 * Rank time slots highest availability first (ties → earlier row).
 * Returns [{ entry, index, avail }, ...]
 */
function rankScheduleSlots(entries) {
  if (!entries?.length) return [];
  return entries
    .map((entry, index) => ({ entry, index, avail: _slotAvailability(entry) }))
    .sort((a, b) => {
      if (b.avail !== a.avail) return b.avail - a.avail;
      return a.index - b.index;
    });
}

/** Highest-availability slot (for watchdog / single pick). */
function pickScheduleSlot(entries) {
  const ranked = rankScheduleSlots(entries);
  if (!ranked.length) return { entry: null, slotIndex: 0 };
  return { entry: ranked[0].entry, slotIndex: ranked[0].index };
}

function stopTimePickWatchdog() {
  if (_timePickWatchdog) {
    vs.clear(_timePickWatchdog);
    _timePickWatchdog = null;
  }
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

function cacheScheduleEntries(entries, dateStr) {
  _cachedScheduleEntries = entries;
  _cachedEntriesDate = dateStr ? String(dateStr).slice(0, 10) : null;
}

function scheduleTimePickWatchdog(dateStr, slotIndex = 0) {
  if (_timePickWatchdog) vs.clear(_timePickWatchdog);
  const targetDate = dateStr ? String(dateStr).slice(0, 10) : null;
  let rounds = 0;

  const run = async () => {
    if (!vs.alive || isOpsFrozen() || ++rounds > 240) return;
    if (isTimeSlotPicked()) return;

    const entries = (_cachedScheduleEntries || []).filter((e) => e && e.Time);
    if (entries.length) {
      const { entry, slotIndex: idx } = pickScheduleSlot(entries);
      setTikTikStatus(`Watchdog: picking time slot #${idx + 1}…`);
      await pickTimeSlotDual({
        time: normalizeScheduleTime(entry.Time),
        date: entry.Date ? String(entry.Date).slice(0, 10) : targetDate,
        slotIndex: idx,
        pollMs: AI_BOOK_POLL_MS,
        maxMs: 600,
        prefix: T,
      });
      if (isTimeSlotPicked()) return;
    } else if (document.querySelector(TIME_SLOT_SELECTOR)) {
      setTikTikStatus("Watchdog: picking visible time slot…");
      await pickTimeSlotDual({
        time: "00:00",
        date: targetDate,
        slotIndex,
        pollMs: AI_BOOK_POLL_MS,
        maxMs: 600,
        prefix: T,
      });
      if (isTimeSlotPicked()) return;
    }

    _timePickWatchdog = vs.setTimeout(run, AI_BOOK_POLL_MS);
  };

  _timePickWatchdog = vs.setTimeout(run, 300);
}

const DATE_PICKER_SELECTOR = [
  "#datepicker.hasDatepicker",
  "#datepicker",
].join(", ");

export async function autoSelectFirstDate(scheduleDays, hasError = false) {
  if (hasError) return null;
  const range = await getDateRangeConfig();
  const ai = await getArmedAiConfig();
  const picked = await pickDateToSelect(scheduleDays, hasError);

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

  // Out of range: jump calendar only — never book / load times.
  if (!picked && range && normalized.length) {
    const inRange = normalized.filter((d) => dateInRange(d, range.from, range.to));
    if (!inRange.length) {
      await jumpCalendarMonthOnly(normalized[0], range);
      return null;
    }
  }

  if (!picked) return null;

  const inRange = range
    ? normalized.filter((d) => dateInRange(d, range.from, range.to))
    : normalized;
  const idx = pickPreferredDateIndex(inRange.length);

  setTikTikStatus(`Selecting date #${idx + 1}: ${picked} (fast)…`);
  noteDatePicked(picked);
  // Only need the input — do not wait for the open calendar popup.
  await vs.waitFor(DATE_PICKER_SELECTOR, { attempts: 80, interval: AI_BOOK_POLL_MS });

  vs.send({
    action: "selectFirstDate",
    date: picked,
    maxMs: ai || range ? AI_DATE_SELECT_MS : 8000,
    pollMs: AI_BOOK_POLL_MS,
  });

  scheduleDatePickWatchdog(picked, ai || range);
  scheduleTimePickWatchdog(picked, AI_BOOK_SLOT_INDEX);
  return picked;
}

export async function autoSelectFirstTime(scheduleEntries, hasError = false) {
  if (hasError) return;
  if (isInterviewPage()) return;
  if (isOpsFrozen()) return;

  const ai = await getArmedAiConfig();
  const range = await getDateRangeConfig();
  if (!ai && !range && !await getSetting("autoSelectFirstDate")) return;

  // Ranked try owns slot picking — don't let watchdog fight us.
  stopTimePickWatchdog();

  let entries = (scheduleEntries || []).filter((e) => {
    if (!e || !e.Time) return false;
    if (e.EntriesAvailable != null && Number(e.EntriesAvailable) <= 0) return false;
    return true;
  });

  const rangeFilter = ai || range;
  if (rangeFilter) {
    entries = entries.filter((e) => {
      const d = e.Date ? String(e.Date).slice(0, 10) : null;
      if (!d) return true;
      return d >= rangeFilter.from && d <= rangeFilter.to;
    });
  }

  const ranked = rankScheduleSlots(entries);
  if (!ranked.length) return;

  // Wait until portal paints slots for this date (poll, up to 10s).
  const slotDeadline = Date.now() + 10_000;
  while (Date.now() < slotDeadline && vs.alive) {
    if (domShowsEntryTimes(entries) || document.querySelector(TIME_SLOT_SELECTOR)) break;
    await new Promise((r) => vs.setTimeout(r, AI_BOOK_POLL_MS));
  }

  // 1 slot → wait up to 10s; multiple → 1s each then try next (2nd, 3rd, …).
  const waitPerSlot = ranked.length === 1
    ? AI_SUBMIT_ARM_MS
    : AI_MULTI_SLOT_SUBMIT_WAIT_MS;

  setTikTikStatus(
    ranked.length === 1
      ? `1 time slot — try highest avail, wait ≤${waitPerSlot / 1000}s for Submit…`
      : `${ranked.length} time slots — try highest→2nd→3rd… (${waitPerSlot / 1000}s each for Submit)`
  );

  for (let i = 0; i < ranked.length; i++) {
    if (!vs.alive || isOpsFrozen() || isInterviewPage()) return;

    const { entry, index: slotIndex, avail } = ranked[i];
    const time = normalizeScheduleTime(entry.Time);
    const date = entry.Date ? String(entry.Date).slice(0, 10) : null;
    const rankLabel =
      i === 0 ? "highest" : i === 1 ? "2nd-highest" : i === 2 ? "3rd-highest" : `${i + 1}th-highest`;

    setTikTikStatus(
      `Trying ${rankLabel} avail (${avail}) @ ${time} — slot ${i + 1}/${ranked.length}…`
    );

    const picked = await pickTimeSlotDual({
      time,
      date,
      slotIndex,
      pollMs: AI_BOOK_POLL_MS,
      maxMs: 4_000,
      prefix: T,
    });

    if (!picked && !isTimeSlotPicked()) {
      setTikTikStatus(`Could not click ${time} — trying next…`);
      continue;
    }

    setTikTikStatus(
      `Selected ${time} (${rankLabel}) — waiting ≤${waitPerSlot / 1000}s for Submit to enable…`
    );

    const enabled = await waitForSubmitEnabled(waitPerSlot);
    if (enabled) {
      setTikTikStatus(`Submit enabled on ${time} — clicking…`);
      if (ai) {
        await armAiFastSubmit(ai.accountId);
      } else {
        clickSubmitDual();
      }
      return;
    }

    if (i < ranked.length - 1) {
      setTikTikStatus(
        `Submit still disabled on ${time} — trying next (${i + 2}/${ranked.length})…`
      );
    }
  }

  setTikTikStatus(
    `Tried all ${ranked.length} time slot(s); Submit never enabled.`
  );
  if (ai) resumeCityRotateAfterBooking();
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
    const normalizedDates = (parsed.response.ScheduleDays || [])
      .map((d) => normalizeScheduleDate(d?.Date))
      .filter(Boolean)
      .sort();
    const dayCount = normalizedDates.length;
    if (dayCount) {
      setTikTikStatus(
        `${dayCount} date${dayCount === 1 ? "" : "s"} available — see list below`
      );
    }

    // Pause hops IMMEDIATELY when any dates arrive — before awaits — so City Change
    // cannot race ahead of middle-date select. Resume later if out of range / no AI.
    if (dayCount > 0 && !parsed.response.HasError) {
      haltCityRotateForBooking();
    }
    noteCityRotateResponse();

    // Broadcast ASAP (before heavy awaits) so other users can FAST force-switch.
    if (!parsed.response.HasError && dayCount > 0) {
      const postId = String(parsed.params.postId || "");
      const bestDate = normalizedDates[0];
      const dateTo = normalizedDates[normalizedDates.length - 1];
      setTikTikStatus(
        `${dayCount} date${dayCount === 1 ? "" : "s"} — alerting others FAST…`
      );
      // Fire without awaiting — speed matters more than ack.
      reportCitySlotsFound({
        postId,
        postName: "",
        dayCount,
        dateFrom: bestDate,
        dateTo,
        bestDate,
      }).catch(() => {});
    }

    const ai = await getArmedAiConfig();
    const range = await getDateRangeConfig();
    const rangeOrAi = ai || range;
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

    // Enrich alert with post name + finder date range once known (second ping).
    if (!parsed.response.HasError && dayCount > 0) {
      const postId = String(parsed.params.postId || "");
      const bestDate = normalizedDates[0];
      const dateTo = normalizedDates[normalizedDates.length - 1];
      let reportFrom = bestDate;
      let reportTo = dateTo;
      let reportCount = dayCount;
      if (rangeOrAi?.from && rangeOrAi?.to) {
        const inRange = normalizedDates.filter((d) => dateInRange(d, rangeOrAi.from, rangeOrAi.to));
        if (inRange.length) {
          reportFrom = inRange[0];
          reportTo = inRange[inRange.length - 1];
          reportCount = inRange.length;
        }
      }
      reportCitySlotsFound({
        postId,
        postName: post?.Name,
        dayCount: reportCount,
        dateFrom: reportFrom,
        dateTo: reportTo,
        bestDate: reportFrom,
        rangeFrom: rangeOrAi?.from || null,
        rangeTo: rangeOrAi?.to || null,
      }).catch(() => {});
    }

    await alertOnAvailability(parsed.response.ScheduleDays, {
      postId: parsed.params.postId,
      postName: post?.Name,
      hasError: parsed.response.HasError,
    });

    await notifyTelegramCityScreenshot(parsed.response.ScheduleDays, {
      postId: parsed.params.postId,
      postName: post?.Name,
      hasError: parsed.response.HasError,
    });

    // If range has a matching date, keep city hop paused while booking.
    // While Submit is pending confirmation, NEVER resume hop from a date reload.
    if (isSubmitPendingConfirm()) {
      haltCityRotateForBooking();
      setTikTikStatus("Submit pending — staying on this city (date reload ignored)…");
    } else if (rangeOrAi && !parsed.response.HasError) {
      const inRange = filterDaysInAiRange(
        parsed.response.ScheduleDays,
        rangeOrAi.from,
        rangeOrAi.to
      );
      if (inRange.length) {
        haltCityRotateForBooking();
        setTikTikStatus(
          `${inRange.length} date${inRange.length === 1 ? "" : "s"} in range — selecting (city hold)…`
        );
      } else {
        resumeCityRotateAfterBooking();
      }
    } else if (rangeOrAi) {
      // No slots / error — hop OK
      resumeCityRotateAfterBooking();
    } else if (dayCount > 0 && !parsed.response.HasError) {
      // Optimistic hold above — no range; release unless date auto-select will run.
      const willAuto = await getSetting("autoSelectFirstDate");
      if (!willAuto) resumeCityRotateAfterBooking();
    }

    const pickedDate = isSubmitPendingConfirm()
      ? null
      : await autoSelectFirstDate(parsed.response.ScheduleDays, parsed.response.HasError);
    if (pickedDate) {
      // Stay held through time pick + Submit
      haltCityRotateForBooking();
      await notifyTelegramCalendarScreenshot(post?.Name, pickedDate);
    } else if (rangeOrAi && !parsed.response.HasError && !isSubmitPendingConfirm()) {
      const days = (parsed.response.ScheduleDays || [])
        .map((d) => normalizeScheduleDate(d?.Date))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b));
      const inRange = days.filter((d) => dateInRange(d, rangeOrAi.from, rangeOrAi.to));
      if (days.length && !inRange.length) {
        resumeCityRotateAfterBooking();
        // autoSelectFirstDate already jumped the calendar; reinforce status.
        setTikTikStatus(
          `Dates found but none in ${rangeOrAi.from} → ${rangeOrAi.to}. Jumped calendar (not booking). Next city in 15–18s…`
        );
      } else if (!days.length) {
        resumeCityRotateAfterBooking();
        setTikTikStatus("No dates on this city — next city in 15–18s…");
      }
    }
    await submitContribution();
  }
  let scheduleEntriesTails = [
    "get-family-consular-schedule-entries",
    "get-family-ofc-schedule-entries"
  ];
  if (scheduleEntriesTails.includes(parsed.tail)) {
    const targetDate = parsed.params.Date.split("T")[0];
    cacheScheduleEntries(parsed.response.ScheduleEntries, targetDate);
    // Ranked try in autoSelectFirstTime owns picks; skip competing watchdog.
    stopTimePickWatchdog();

    const posts = await getPosts();
    const post = posts.filter((post2) => post2.Days && post2.Updated).sort((a, b) => b.Updated - a.Updated).find((post2) => post2.Days.some((day) => day.Date === targetDate));
    if (post) {
      const day = post.Days.find((day2) => day2.Date === targetDate);
      if (day) {
        day.Times = parsed.response.ScheduleEntries;
        setPosts(posts);
      }
    }
    const entries = (parsed.response.ScheduleEntries || []).filter((e) => e && e.Time);
    showScheduleEntries(entries, targetDate, post?.Name);
    if (entries.length) {
      const open = entries.filter(
        (e) => e.EntriesAvailable == null || Number(e.EntriesAvailable) > 0
      );
      const totalAvail = open.reduce((sum, e) => {
        const n = Number(e.EntriesAvailable);
        return sum + (Number.isFinite(n) ? n : 0);
      }, 0);
      const availLabel = totalAvail > 0 ? ` · ${totalAvail} available` : "";
      setTikTikStatus(
        `${open.length || entries.length} time slot${(open.length || entries.length) === 1 ? "" : "s"} on ${targetDate}${availLabel}`
      );
    }
    await autoSelectFirstTime(parsed.response.ScheduleEntries, parsed.response.HasError);
    if (isSubmitPendingConfirm()) {
      haltCityRotateForBooking();
      setTikTikStatus("Submit pending — staying on this city (time reload ignored)…");
    } else if (entries.length) {
      // Keep hold while time → Submit runs
      haltCityRotateForBooking();
      await notifyTelegramTimeScreenshot(
        post?.Name,
        parsed.params.Date,
        entries.length
      );
    } else {
      // No time slots on this date — resume city hop
      resumeCityRotateAfterBooking();
      setTikTikStatus("No time slots on this date — next city in 15–18s…");
    }
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
