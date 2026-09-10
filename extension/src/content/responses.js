import { showBlockMessage } from "./cloudflare.js";
import { showWaitTime, showWaiting, slotsAlert } from "./scheduling-controls.js";
import { showDates } from "./scheduling-panels.js";
import { notifyTelegramSlots, notifyTelegramCityScreenshot, notifyTelegramCalendarScreenshot, notifyTelegramTimeScreenshot } from "./telegram-notify.js";
import { pollAndPickTimeSlot, domShowsEntryTimes, isTimeSlotPicked, pickTimeSlotDual } from "./time-select.js";
import { submitContribution } from "./reporting.js";
import { recordSubmitAjaxResponse } from "./submit-errors.js";
import {
  getArmedAiConfig,
  getCitiesRotateConfig,
  haltCityRotateForBooking,
  isInterviewPage,
  isOpsFrozen,
  noteCityRotateResponse,
  pauseCityRotateForWait,
  armAiFastSubmit,
  setTikTikStatus,
  triggerAutoSubmitIfArmed,
  clickSubmitDual,
  thawOps,
  filterDaysInAiRange,
  dateInRange,
  pickPreferredDateIndex,
  AI_DATE_SELECT_MS,
  AI_BOOK_SELECT_MS,
  AI_BOOK_SUBMIT_WAIT_MS,
  AI_TIME_DOM_WAIT_MS,
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

/** Ultra mode: always pick 1st available slot (fastest). */
function pickScheduleSlot(entries) {
  if (!entries?.length) return { entry: null, slotIndex: AI_BOOK_SLOT_INDEX };
  return { entry: entries[0], slotIndex: AI_BOOK_SLOT_INDEX };
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
  "#datepicker .ui-datepicker",
  "#ui-datepicker-div",
].join(", ");

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
  const inRange = ai
    ? normalized.filter((d) => dateInRange(d, ai.from, ai.to))
    : normalized;
  const idx = pickPreferredDateIndex(inRange.length);

  setTikTikStatus(`Selecting date #${idx + 1}: ${picked}…`);
  await vs.waitFor(DATE_PICKER_SELECTOR, { attempts: 120, interval: AI_BOOK_POLL_MS });

  vs.send({
    action: "selectFirstDate",
    date: picked,
    maxMs: ai ? AI_DATE_SELECT_MS : 8000,
    pollMs: AI_BOOK_POLL_MS,
  });

  scheduleDatePickWatchdog(picked, ai);
  scheduleTimePickWatchdog(picked, AI_BOOK_SLOT_INDEX);
  return picked;
}

export async function autoSelectFirstTime(scheduleEntries, hasError = false) {
  if (hasError) return;
  if (isInterviewPage()) return;
  if (isOpsFrozen()) return;

  const ai = await getArmedAiConfig();
  if (!ai && !await getSetting("autoSelectFirstDate")) return;

  let entries = (scheduleEntries || []).filter((e) => {
    if (!e || !e.Time) return false;
    if (e.EntriesAvailable != null && Number(e.EntriesAvailable) <= 0) return false;
    return true;
  });

  if (ai) {
    entries = entries.filter((e) => {
      const d = e.Date ? String(e.Date).slice(0, 10) : null;
      if (!d) return true;
      return d >= ai.from && d <= ai.to;
    });
  }

  const { entry, slotIndex } = pickScheduleSlot(entries);
  if (!entry) return;

  const time = normalizeScheduleTime(entry.Time);
  const date = entry.Date ? String(entry.Date).slice(0, 10) : null;

  setTikTikStatus(`Waiting for time slots… (pick #${slotIndex + 1})`);

  // Wait until portal paints slots for this date (poll 50ms, up to 10s).
  const slotDeadline = Date.now() + 10000;
  while (Date.now() < slotDeadline && vs.alive) {
    if (domShowsEntryTimes(entries) || document.querySelector(TIME_SLOT_SELECTOR)) break;
    await new Promise((r) => vs.setTimeout(r, AI_BOOK_POLL_MS));
  }

  const picked = await pickTimeSlotDual({
    time,
    date,
    slotIndex,
    pollMs: AI_BOOK_POLL_MS,
    maxMs: 12000,
    prefix: T,
  });

  if (picked || isTimeSlotPicked()) {
    setTikTikStatus(`Time slot #${slotIndex + 1} selected — Submit in ${AI_BOOK_SUBMIT_WAIT_MS}ms…`);
  } else {
    setTikTikStatus("Time table visible but slot click failed — retrying…");
    vs.send({
      action: "bookTimeAndSubmitFast",
      time,
      date,
      slotIndex,
      selectMaxMs: AI_BOOK_SELECT_MS,
      submitWaitMs: AI_BOOK_SUBMIT_WAIT_MS,
      pollMs: AI_BOOK_POLL_MS,
      domWaitMs: AI_TIME_DOM_WAIT_MS,
      prefix: T,
    });
  }

  if (ai) {
    await armAiFastSubmit(ai.accountId);
    return;
  }

  if (isTimeSlotPicked()) {
    clickSubmitDual();
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
    noteCityRotateResponse();

    const ai = await getArmedAiConfig();
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

    // If Auto Submit has a matching date, pause city rotate while booking.
    if (ai && !parsed.response.HasError) {
      const inRange = filterDaysInAiRange(parsed.response.ScheduleDays, ai.from, ai.to);
      if (inRange.length) haltCityRotateForBooking();
    }

    const pickedDate = await autoSelectFirstDate(parsed.response.ScheduleDays, parsed.response.HasError);
    if (pickedDate) {
      await notifyTelegramCalendarScreenshot(post?.Name, pickedDate);
    } else if (ai && !parsed.response.HasError) {
      const days = (parsed.response.ScheduleDays || [])
        .map((d) => normalizeScheduleDate(d?.Date))
        .filter(Boolean);
      const inRange = days.filter((d) => dateInRange(d, ai.from, ai.to));
      if (days.length && !inRange.length) {
        setTikTikStatus(`Dates found but none in ${ai.from} → ${ai.to}. Widen your range in Tik Tik.`);
      } else if (!days.length) {
        setTikTikStatus("No dates on this city yet.");
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
    await autoSelectFirstTime(parsed.response.ScheduleEntries, parsed.response.HasError);
    const entries = (parsed.response.ScheduleEntries || []).filter((e) => e && e.Time);
    if (entries.length) {
      await notifyTelegramTimeScreenshot(
        post?.Name,
        parsed.params.Date,
        entries.length
      );
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
