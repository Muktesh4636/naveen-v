/**
 * Tik Tik — per-account helper with two independent switches:
 *  1. Auto Submit — date range → select date/time → Submit once
 *  2. City Change — rotate cities every 13–18s during IST slot windows only
 *
 * Either can be enabled/disabled on its own. Interview pages: do nothing.
 */

import { getPosts, getProfile, SCHEDULE_UI_WAIT_ATTEMPTS } from "../shared/config.js";
import { storageGet, storageSet } from "../shared/runtime.js";
import { vs } from "../shared/lifecycle.js";
import {
  formatSlotWait,
  isInSlotWindow,
  msUntilSlotWindow,
  getSlotWindowLabel,
  setAccountSlotWindows,
  clearAccountSlotWindows,
  normalizeCustomWindows,
  windowsToEditorRows,
  MAX_CUSTOM_WINDOWS,
  MAX_WINDOW_DURATION_MIN,
} from "../shared/slotSchedule.js";
import { cfg as rtCfg } from "../shared/remoteConfig.js";
import { CLS, DAT, ID, MSG, T, idSel } from "../shared/token.js";
import { ensureSelectorRow } from "./scheduling-controls.js";
import { armSubmitErrorWatch, setSubmitErrorHandler } from "./submit-errors.js";
import { isTimeSlotPicked } from "./time-select.js";
import {
  mergeServerTikTikPrefs,
  pullTikTikPrefs,
  pushTikTikPrefs,
} from "./tik-tik-sync.js";
import {
  markForceCityApplied,
  pollForceCity,
} from "./tik-tik-coord.js";

export var AI_SUBMIT_KEY = "aiSubmitByAccount";

/** Ultra mode — poll every 25ms, pick 1st slot, Submit 50ms after slot. */
export var AI_DATE_SELECT_MS = 8000;
export var AI_BOOK_SELECT_MS = 3500;
export var AI_TIME_DOM_WAIT_MS = 0;
export var AI_BOOK_POLL_MS = 25;
/** Extra delay after time pick before trying Submit (0 = click the instant it enables). */
export var AI_BOOK_SUBMIT_WAIT_MS = 0;
export var AI_BOOK_SLOT_INDEX = 0;
/** Wait for Submit to enable: 10s if only one time slot. */
export var AI_SUBMIT_ARM_MS = 10_000;
/** Wait for Submit to enable per slot when multiple time slots (then try next). */
export var AI_MULTI_SLOT_SUBMIT_WAIT_MS = 1_000;

/** Calendar: 2 dates → 2nd; 3 → 3rd; 4+ → 2nd or 3rd only (never 1st or 4th+). */
export function pickPreferredDateIndex(count) {
  const n = Math.max(0, Number(count) || 0);
  if (n <= 0) return -1;
  if (n === 1) return 0;
  if (n === 2) return 1;
  if (n === 3) return 2;
  return 2; // 4+ available → 3rd (not 1st, not 4th)
}

/** City Change: switch every 13–18s, only during hourly slot burst windows.
 *  Timeouts/gaps come from rtCfg (bundled defaults, overridable by safe remote JSON).
 */
function _cityRotateMinGapMs() { return rtCfg.cityRotateMinGapMs; }
function _cityRotateMaxGapMs() { return rtCfg.cityRotateMaxGapMs; }
function _cityHoldMaxMs() { return rtCfg.cityHoldMaxMs; }
function _cityLoadingMaxMs() { return rtCfg.cityLoadingMaxMs; }
function _cityCalendarNoDatesMs() { return rtCfg.cityCalendarNoDatesMs; }
/** Watchdog: if no tick for this long while ON, force reschedule (no OFF→ON needed). */
var CITY_WATCHDOG_MS = 5_000;
var CITY_STUCK_TICK_MS = 20_000;
var CITY_INFLIGHT_MAX_MS = 15_000;
export function isSchedulePage() {
  return /\/(schedule|ofc-schedule)\/?$/i.test(location.pathname) ||
    /\/(schedule|ofc-schedule)\b/i.test(location.pathname);
}

/** OFC appointment page only (not Consular /schedule). */
export function isOfcSchedulePage() {
  return /\/ofc-schedule\b/i.test(location.pathname);
}

export function isInterviewPage() {
  if (/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)) {
    return true;
  }
  if (document.querySelector("#appointment-confirmation, .appointment-confirmation")) {
    return true;
  }
  return false;
}

/** CGI login: 3 sets × 5 questions. User picks exactly 1 per set. */
export var SECURITY_SETS = [
  [
    "What is your mother's maiden name?",
    "What was the name of your first/current/favorite pet?",
    "What was your first car?",
    "What elementary school did you attend?",
    "What is the name of the town/city where you were born?",
  ],
  [
    "Where did you meet your spouse?",
    "What is your sibling's middle name?",
    "Who was your childhood hero?",
    "In what city or town was your first job?",
    "What is the name of a college you applied to but didn't attend?",
  ],
  [
    "What is the name of the road/street you grew up on?",
    "What is your least favorite food?",
    "What was the first company that you worked for?",
    "What is your favorite food?",
    "What high school did you attend?",
  ],
];

function _securityOptionsHtml(setIndex, selected) {
  const opts = SECURITY_SETS[setIndex] || [];
  const blank = `<option value="">Select 1 question from set ${setIndex + 1}</option>`;
  return blank + opts.map((q) => {
    const sel = selected === q ? " selected" : "";
    return `<option value="${q.replace(/"/g, "&quot;")}"${sel}>${q}</option>`;
  }).join("");
}

function _todayISO() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function _pretty(iso) {
  try {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
  } catch {
    return iso;
  }
}

function _isoFromParts(y, m0, d) {
  return `${y}-${String(m0 + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function _parseISO(iso) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
  return dt;
}

function _paintDateButtons() {
  for (const key of ["from", "to"]) {
    const hidden = document.querySelector(idSel(key === "from" ? ID.aiFrom : ID.aiTo));
    const btn = document.querySelector(idSel(key === "from" ? ID.aiFromBtn : ID.aiToBtn));
    if (!btn) continue;
    const iso = hidden?.value || "";
    btn.textContent = iso ? _pretty(iso) : "Select date";
  }
}

function _setDateValue(which, iso) {
  const hidden = document.querySelector(idSel(which === "from" ? ID.aiFrom : ID.aiTo));
  if (hidden) hidden.value = iso || "";
  if (which === "from") {
    const toHidden = document.querySelector(idSel(ID.aiTo));
    if (toHidden && iso && toHidden.value && toHidden.value < iso) toHidden.value = "";
  }
  _paintDateButtons();
}

var _calView = { y: 0, m0: 0, which: "from" };

function _closeCal() {
  document.querySelector(idSel(ID.aiCal))?.classList.add(CLS.hidden);
}

function _calEventTarget(e) {
  const t = e.target;
  if (!t) return null;
  return t.nodeType === 3 ? t.parentElement : t;
}

function _renderCal() {
  const cal = document.querySelector(idSel(ID.aiCal));
  if (!cal) return;
  const { y, m0, which } = _calView;
  const selected = document.querySelector(idSel(which === "from" ? ID.aiFrom : ID.aiTo))?.value || "";
  const today = _todayISO();
  const minIso = which === "to"
    ? (document.querySelector(idSel(ID.aiFrom))?.value || _todayISO())
    : _todayISO();

  const title = new Date(y, m0, 1).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  const firstDow = new Date(y, m0, 1).getDay();
  const daysInMonth = new Date(y, m0 + 1, 0).getDate();
  const prevDays = new Date(y, m0, 0).getDate();

  let cells = "";
  for (const w of ["S", "M", "T", "W", "T", "F", "S"]) {
    cells += `<div class="${CLS.aiHint}">${w}</div>`;
  }
  for (let i = 0; i < 42; i++) {
    let dayNum;
    let cellY = y;
    let cellM0 = m0;
    let muted = false;
    if (i < firstDow) {
      dayNum = prevDays - firstDow + i + 1;
      cellM0 = m0 - 1;
      if (cellM0 < 0) { cellM0 = 11; cellY = y - 1; }
      muted = true;
    } else if (i >= firstDow + daysInMonth) {
      dayNum = i - firstDow - daysInMonth + 1;
      cellM0 = m0 + 1;
      if (cellM0 > 11) { cellM0 = 0; cellY = y + 1; }
      muted = true;
    } else {
      dayNum = i - firstDow + 1;
    }
    const iso = _isoFromParts(cellY, cellM0, dayNum);
    const disabled = iso < minIso;
    const cls = [
      CLS.aiCalDay,
      muted ? CLS.aiCalMuted : "",
      disabled ? CLS.aiCalMuted : "",
      iso === today ? CLS.aiCalToday : "",
      iso === selected ? CLS.aiCalOn : "",
    ].filter(Boolean).join(" ");
    cells += `<button type="button" class="${cls}" data-iso="${iso}" ${disabled ? "disabled aria-disabled=\"true\"" : ""}>${dayNum}</button>`;
  }

  cal.innerHTML = `
    <div class="${CLS.aiCalHead}">
      <button type="button" data-cal="prev" aria-label="Previous month">‹</button>
      <div class="${CLS.aiHead}">${title}</div>
      <button type="button" data-cal="next" aria-label="Next month">›</button>
    </div>
    <div class="${CLS.aiCalGrid}">${cells}</div>
    <div class="${CLS.aiRow}">
      <button type="button" data-cal="clear">Clear</button>
      <button type="button" data-cal="today">Today</button>
    </div>
  `;
}

/** Handle calendar taps on pointerdown so outside-close cannot steal the gesture. */
function _onCalPointer(e) {
  const cal = document.querySelector(idSel(ID.aiCal));
  const el = _calEventTarget(e);
  const btn = el?.closest?.("button");
  if (!cal || !btn || !cal.contains(btn)) return;
  e.preventDefault();
  e.stopPropagation();
  if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();

  const action = btn.getAttribute("data-cal");
  const which = _calView.which;
  const minIso = which === "to"
    ? (document.querySelector(idSel(ID.aiFrom))?.value || _todayISO())
    : _todayISO();

  if (action === "prev") {
    _calView.m0 -= 1;
    if (_calView.m0 < 0) { _calView.m0 = 11; _calView.y -= 1; }
    _renderCal();
    return;
  }
  if (action === "next") {
    _calView.m0 += 1;
    if (_calView.m0 > 11) { _calView.m0 = 0; _calView.y += 1; }
    _renderCal();
    return;
  }
  if (action === "clear") {
    _setDateValue(which, "");
    _closeCal();
    return;
  }
  if (action === "today") {
    const t = _todayISO();
    if (t >= minIso) {
      _setDateValue(which, t);
      _closeCal();
      _tryEnableSubmitAfterDates();
    }
    return;
  }
  if (btn.disabled || btn.getAttribute("aria-disabled") === "true") return;
  const iso = btn.getAttribute("data-iso");
  if (!iso || iso < minIso) return;
  _setDateValue(which, iso);
  _closeCal();
  _tryEnableSubmitAfterDates();
}

function _positionCal(anchorEl) {
  const cal = document.querySelector(idSel(ID.aiCal));
  if (!cal || !anchorEl) return;
  const aRect = anchorEl.getBoundingClientRect();
  const calW = Math.min(340, window.innerWidth - 16);
  const calH = cal.offsetHeight || 360;
  let left = Math.max(8, Math.min(aRect.left, window.innerWidth - calW - 8));
  // Prefer below the field; flip above if not enough room.
  let top = aRect.bottom + 6;
  if (top + calH > window.innerHeight - 8 && aRect.top - 6 - calH >= 8) {
    top = aRect.top - 6 - calH;
  } else {
    top = Math.max(8, Math.min(top, window.innerHeight - calH - 8));
  }
  cal.style.position = "fixed";
  cal.style.top = `${Math.round(top)}px`;
  cal.style.left = `${Math.round(left)}px`;
  cal.style.width = `${calW}px`;
  cal.style.right = "auto";
  cal.style.bottom = "auto";
}

function _openCal(which, anchorEl) {
  let cal = document.querySelector(idSel(ID.aiCal));
  if (!cal) {
    cal = document.createElement("div");
    cal.id = ID.aiCal;
    cal.className = `${CLS.aiCal} ${CLS.hidden}`;
    cal.dataset[DAT.mark] = "";
    // Portal to body so panel overflow / sticky headers cannot clip or steal clicks.
    document.body.appendChild(cal);
    vs.on(cal, "pointerdown", _onCalPointer, { capture: true });
    vs.on(cal, "click", (e) => {
      // Swallow click so page / outside-close never see a leftover click.
      if (cal.contains(_calEventTarget(e))) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, { capture: true });
  }

  const current = document.querySelector(idSel(which === "from" ? ID.aiFrom : ID.aiTo))?.value;
  const base = _parseISO(current) || new Date();
  _calView = { y: base.getFullYear(), m0: base.getMonth(), which };
  _renderCal();
  cal.classList.remove(CLS.hidden);
  _positionCal(anchorEl);
  // Reposition after layout (month grid height known).
  requestAnimationFrame(() => _positionCal(anchorEl));
}

/** Auto-submit on (supports legacy `enabled`). */
export function isSubmitEnabled(cfg) {
  if (!cfg) return false;
  if (typeof cfg.submitEnabled === "boolean") return cfg.submitEnabled;
  return !!cfg.enabled;
}

/** Preferred-city rotation switch on (cities list may still be empty while user picks). */
export function isCitiesEnabled(cfg) {
  return !!(cfg && cfg.citiesEnabled);
}

export async function getAccountId() {
  const profile = await getProfile();
  return profile?.id ? String(profile.id) : null;
}

export async function getAiConfig(accountId) {
  if (!accountId) return null;
  const all = (await storageGet(AI_SUBMIT_KEY))[AI_SUBMIT_KEY] || {};
  return all[accountId] || null;
}

export async function setAiConfig(accountId, cfg) {
  if (!accountId) return;
  const store = await storageGet(AI_SUBMIT_KEY);
  const all = store[AI_SUBMIT_KEY] || {};
  if (cfg == null) delete all[accountId];
  else all[accountId] = cfg;
  await storageSet({ [AI_SUBMIT_KEY]: all });
}

/** After Submit, freeze all Tik Tik ops (no city rotate, no auto-select, no more submit). */
var _opsFrozen = false;

export function isOpsFrozen() {
  return _opsFrozen;
}

export function freezeAllOps() {
  _opsFrozen = true;
  clearPendingSubmit();
  stopCityRotate();
}

export function thawOps() {
  _opsFrozen = false;
  _submitArmed = false;
  clearPendingSubmit();
}

/** Turn off auto-submit AND city change — only after booking confirmation. */
export async function disarmAiSubmit(accountId) {
  _clearSubmitPending();
  freezeAllOps();
  const cfg = await getAiConfig(accountId);
  if (!cfg) {
    refreshAiSubmitUi();
    return;
  }
  cfg.submitEnabled = false;
  cfg.citiesEnabled = false;
  cfg.enabled = false;
  cfg.usedAt = Date.now();
  await setAiConfig(accountId, cfg);
  refreshAiSubmitUi();
}

/** After Submit click: keep switches ON; wait for confirmation or failure. */
var _submitPending = false;
var _submitPendingTimer = null;
var _submitConfirmWatch = null;
/** Max wait after Submit for confirmation before resuming city hop (not 1 min). */
var SUBMIT_PENDING_MAX_MS = 20_000;
/** Dates that already failed Submit on the current city (YYYY-MM-DD). */
var _failedSubmitDates = new Set();
var _failedSubmitDatesCity = "";
var _lastPickedDateIso = "";

function _clearSubmitPending() {
  _submitPending = false;
  if (_submitPendingTimer) {
    vs.clear(_submitPendingTimer);
    _submitPendingTimer = null;
  }
  if (_submitConfirmWatch) {
    vs.clear(_submitConfirmWatch);
    _submitConfirmWatch = null;
  }
}

function _clearFailedSubmitDates() {
  _failedSubmitDates.clear();
  _failedSubmitDatesCity = "";
}

function _markSubmitDateFailed(dateIso) {
  const d = String(dateIso || "").slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return;
  const city = String(document.querySelector("#post_select")?.value || "");
  if (city !== _failedSubmitDatesCity) {
    _failedSubmitDates.clear();
    _failedSubmitDatesCity = city;
  }
  _failedSubmitDates.add(d);
}

/** Remember the date we just selected (for submit-fail retry). */
export function noteDatePicked(dateIso) {
  const d = String(dateIso || "").slice(0, 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) _lastPickedDateIso = d;
}

function _datepickerToIso() {
  const input = document.querySelector("#datepicker");
  const v = String(input?.value || "").trim();
  if (!v) return _lastPickedDateIso || "";
  if (/^\d{4}-\d{2}-\d{2}/.test(v)) return v.slice(0, 10);
  const slash = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (slash) {
    const [, mm, dd, yyyy] = slash;
    return `${yyyy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`;
  }
  return _lastPickedDateIso || "";
}

/**
 * After Submit error: try another in-range date on this city.
 * Returns true if a next date was selected; false if none left (caller should hop city).
 */
async function tryNextInRangeDateAfterSubmitFail() {
  if (_opsFrozen || isInterviewPage() || !isSchedulePage()) return false;
  const ai = await getArmedAiConfig();
  if (!ai) return false;

  const select = document.querySelector("#post_select");
  const postId = select ? String(select.value) : "";
  if (!postId) return false;

  const current = _datepickerToIso();
  if (current) _markSubmitDateFailed(current);

  const posts = await getPosts();
  const post = posts.find((p) => String(p.ID) === postId);
  const inRange = filterDaysInAiRange(post?.Days || [], ai.from, ai.to);
  const remaining = inRange.filter((d) => !_failedSubmitDates.has(String(d.Date).slice(0, 10)));
  if (!remaining.length) return false;

  const idx = pickPreferredDateIndex(remaining.length);
  const next = remaining[idx];
  if (!next?.Date) return false;

  const date = String(next.Date).slice(0, 10);
  noteDatePicked(date);
  haltCityRotateForBooking();
  thawOps();
  updateAiStatus(
    `Submit failed — trying next date #${idx + 1} (${date})` +
      ` (${remaining.length} left in range)…`
  );
  setTikTikStatus(
    `Submit failed — next date ${date} (${remaining.length} left)…`
  );
  vs.send({
    action: "selectFirstDate",
    date,
    maxMs: AI_DATE_SELECT_MS,
    pollMs: AI_BOOK_POLL_MS,
  });
  return true;
}

/**
 * Submit was clicked — do NOT turn Auto Submit / City Change off.
 * Hold hops briefly; resume on failure, or disarm only on confirmation.
 */
export async function noteSubmitClicked(accountId) {
  if (isInterviewPage() || _isConfirmationPage()) {
    if (accountId) await disarmAiSubmit(accountId);
    else freezeAllOps();
    updateAiStatus("Booking confirmed — Tik Tik stopped.");
    return;
  }

  _submitPending = true;
  haltCityRotateForBooking();
  armSubmitErrorWatch();
  updateAiStatus("Submit clicked — waiting for confirmation (Auto Submit + City Change stay ON)…");

  if (_submitConfirmWatch) vs.clear(_submitConfirmWatch);
  const started = Date.now();
  const beat = async () => {
    _submitConfirmWatch = null;
    if (!_submitPending || !vs.alive) return;
    if (_isConfirmationPage() || isInterviewPage()) {
      const id = accountId || (await getAccountId());
      if (id) await disarmAiSubmit(id);
      else freezeAllOps();
      updateAiStatus("Booking confirmed — Tik Tik stopped.");
      return;
    }
    if (Date.now() - started >= SUBMIT_PENDING_MAX_MS) {
      await noteSubmitFailed("no confirmation yet — resuming city checks");
      return;
    }
    _submitConfirmWatch = vs.setTimeout(beat, 400);
  };
  _submitConfirmWatch = vs.setTimeout(beat, 400);

  if (_submitPendingTimer) vs.clear(_submitPendingTimer);
  _submitPendingTimer = vs.setTimeout(() => {
    _submitPendingTimer = null;
    if (_submitPending) noteSubmitFailed("submit wait timed out — resuming city checks");
  }, SUBMIT_PENDING_MAX_MS);
}

function _isConfirmationPage() {
  if (/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)) {
    return true;
  }
  if (document.querySelector("#appointment-confirmation, .appointment-confirmation")) {
    return true;
  }
  const t = (document.body?.innerText || "").slice(0, 2500);
  return /appointment\s+confirmation|successfully\s+scheduled|your\s+appointment\s+has\s+been/i.test(t);
}

/** Submit failed / rejected — try another in-range date first; hop city only if none left. */
export async function noteSubmitFailed(reason = "") {
  if (!_submitPending && !_bookingHold && !_submitArmed) {
    const tried = await tryNextInRangeDateAfterSubmitFail();
    if (tried) return;
    resumeCityRotateAfterBooking();
    return;
  }
  _clearSubmitPending();
  _submitArmed = false;
  clearPendingSubmit();
  // Do not freeze / disarm — user wants Auto Submit + City Change to stay ON.
  if (_opsFrozen) thawOps();

  const msg = reason ? `Submit failed (${reason})` : "Submit failed";
  const triedNext = await tryNextInRangeDateAfterSubmitFail();
  if (triedNext) {
    updateAiStatus(`${msg} — staying on city; trying another date…`);
    return;
  }

  _clearFailedSubmitDates();
  resumeCityRotateAfterBooking();
  updateAiStatus(`${msg} — no other dates in range; hopping cities…`);

  if (_rotateActive) {
    _armNextRotate(Date.now());
    _scheduleCityRotate();
  } else {
    const id = await getAccountId();
    if (id) {
      const cfg = await getAiConfig(id);
      if (isCitiesEnabled(cfg)) {
        await startCityRotate();
      }
    }
  }
}

export function isSubmitPendingConfirm() {
  return _submitPending;
}

export function dateInRange(dateStr, from, to) {
  const d = String(dateStr || "").slice(0, 10);
  if (!d || d.length < 10) return false;
  if (from && d < from) return false;
  if (to && d > to) return false;
  return true;
}

/** Armed for auto-submit (date range active). */
export async function getArmedAiConfig() {
  if (_opsFrozen) return null;
  if (isInterviewPage() || !isSchedulePage()) return null;
  const id = await getAccountId();
  if (!id) return null;
  const cfg = await getAiConfig(id);
  if (!isSubmitEnabled(cfg) || !cfg.from || !cfg.to) return null;
  return { ...cfg, accountId: id };
}

/** Armed for preferred-city rotation only. */
export async function getCitiesRotateConfig() {
  if (_opsFrozen) return null;
  if (isInterviewPage() || !isSchedulePage()) return null;
  const id = await getAccountId();
  if (!id) return null;
  const cfg = await getAiConfig(id);
  if (!isCitiesEnabled(cfg) || !cfg.cities?.length) return null;
  _syncAccountWindows(cfg);
  return { ...cfg, accountId: id };
}

export function filterDaysInAiRange(scheduleDays, from, to) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (scheduleDays || [])
    .map((d) => {
      if (!d) return null;
      const raw = d.Date != null ? d.Date : d.date;
      const iso = _normalizeDayIso(raw);
      if (!iso) return null;
      return { ...d, Date: iso };
    })
    .filter(Boolean)
    .filter((d) => dateInRange(d.Date, from, to))
    .filter((d) => {
      const [y, m, day] = d.Date.slice(0, 10).split("-").map(Number);
      return new Date(y, m - 1, day) >= today;
    })
    .sort((a, b) => String(a.Date).localeCompare(String(b.Date)));
}

/** Normalize portal day strings to YYYY-MM-DD for range checks. */
function _normalizeDayIso(raw) {
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
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    }
  }
  return null;
}

var _submitArmed = false;
var _submitTimer = null;
var _rotateTimer = null;
var _rotateInFlight = false;
var _rotateInFlightAt = 0;
var _rotateActive = false;
var _nextRotateAt = 0;
var _lastSwitchAt = 0;
var _rotateIndex = 0;
var _rotatePausedUntil = 0;
var _rotateBusy = false;
var _rotateBusyClearTimer = null;
var _busyStartedAt = 0;
/** Auto Submit is booking — pause hops, keep City Change ON. */
var _bookingHold = false;
var _holdStartedAt = 0;
var _holdSafetyTimer = null;
var _rotateWatchdog = null;
var _lastRotateTickAt = 0;
var _postSelectRotateBound = false;
var _citiesOptionsKey = "";
var _aiSubmitMounted = false;
var _lastProbeAt = 0;

function _citiesOptionsKeyFrom(opts) {
  return (opts || []).map((o) => o.id).join("\u0001");
}

function _readCheckedCityIds() {
  const box = document.querySelector(idSel(ID.aiCities));
  if (!box) return [];
  return [...box.querySelectorAll('input[type="checkbox"]:checked')].map((cb) => String(cb.value));
}

function _setAllCitiesChecked(checked) {
  const box = document.querySelector(idSel(ID.aiCities));
  if (!box) return;
  for (const cb of box.querySelectorAll('input[type="checkbox"]')) {
    cb.checked = checked;
  }
}

export function clearPendingSubmit() {
  if (_submitTimer) {
    vs.clear(_submitTimer);
    _submitTimer = null;
  }
  _submitArmed = false;
}

function _clearHoldSafety() {
  if (_holdSafetyTimer) {
    vs.clear(_holdSafetyTimer);
    _holdSafetyTimer = null;
  }
}

function _armHoldSafety() {
  _clearHoldSafety();
  if (!_holdStartedAt) _holdStartedAt = Date.now();
  const left = Math.max(500, _cityHoldMaxMs() - (Date.now() - _holdStartedAt));
  _holdSafetyTimer = vs.setTimeout(() => {
    _holdSafetyTimer = null;
    if (!_bookingHold || !_rotateActive || !vs.alive) return;
    _bookingHold = false;
    _holdStartedAt = 0;
    _armNextRotate(Date.now());
    updateAiStatus(
      `City Change — booking hold timed out (${_cityHoldMaxMs() / 1000}s); next city in 13–18s…`
    );
    _scheduleCityRotate();
  }, left);
}

function _stopRotateWatchdog() {
  if (_rotateWatchdog) {
    vs.clear(_rotateWatchdog);
    _rotateWatchdog = null;
  }
}

/**
 * Clear orphan busy/hold/inflight so City Change never needs OFF→ON.
 * Returns true if something was unlocked.
 */
function _recoverStuckRotateLocks(now = Date.now()) {
  let unlocked = false;

  if (_rotateInFlight && _rotateInFlightAt && now - _rotateInFlightAt >= CITY_INFLIGHT_MAX_MS) {
    _rotateInFlight = false;
    _rotateInFlightAt = 0;
    unlocked = true;
  }

  if (_bookingHold) {
    if (!_holdStartedAt) _holdStartedAt = now;
    if (now - _holdStartedAt >= _cityHoldMaxMs()) {
      _clearHoldSafety();
      _bookingHold = false;
      _holdStartedAt = 0;
      unlocked = true;
    } else if (!_holdSafetyTimer) {
      _armHoldSafety();
    }
  }

  if (_rotateBusy) {
    if (!_busyStartedAt) _busyStartedAt = now;
    const loading = _domShowsDateLoading();
    const maxMs = loading ? _cityLoadingMaxMs() : _cityCalendarNoDatesMs();
    if (now - _busyStartedAt >= maxMs) {
      _clearRotateBusy();
      unlocked = true;
    } else if (!_rotateBusyClearTimer) {
      const left = Math.max(500, maxMs - (now - _busyStartedAt));
      _rotateBusyClearTimer = vs.setTimeout(() => {
        _rotateBusyClearTimer = null;
        if (!_rotateActive || _bookingHold) return;
        const stillLoading = _domShowsDateLoading();
        const cap = stillLoading ? _cityLoadingMaxMs() : _cityCalendarNoDatesMs();
        if (Date.now() - (_busyStartedAt || 0) < cap) {
          // Still under the right cap (e.g. Loading appeared) — re-arm.
          _recoverStuckRotateLocks();
          return;
        }
        _clearRotateBusy();
        _armNextRotate(Date.now());
        updateAiStatus(
          stillLoading
            ? `City Change — still Loading after ${_cityLoadingMaxMs() / 1000}s; changing city…`
            : `City Change — calendar up but no dates after ${_cityCalendarNoDatesMs() / 1000}s; changing city…`
        );
        _scheduleCityRotate();
      }, left);
    }
  }

  if (_submitArmed && !_submitTimer) {
    // Submit arm without timer — unblock hops.
    _submitArmed = false;
    unlocked = true;
  }

  return unlocked;
}

function _ensureRotateWatchdog() {
  if (_rotateWatchdog || !_rotateActive) return;
  const beat = () => {
    _rotateWatchdog = null;
    if (!_rotateActive || !vs.alive || _opsFrozen) return;
    const now = Date.now();
    const unlocked = _recoverStuckRotateLocks(now);
    const inWindow = !!isInSlotWindow(new Date(now));
    const timerArmed = !!_rotateTimer;

    // Long intentional waits are NOT stuck (booking hold must not require a timer).
    const intentionalWait =
      (!inWindow && timerArmed) ||
      _rotateBusy ||
      _bookingHold ||
      _submitArmed ||
      _submitPending;

    const tickStale =
      !intentionalWait &&
      _lastRotateTickAt > 0 &&
      now - _lastRotateTickAt >= CITY_STUCK_TICK_MS;

    const timerLost = !timerArmed && !_rotateInFlight && !intentionalWait;

    if (unlocked || tickStale || timerLost) {
      if (tickStale) {
        // Hard unstick inside a hop cycle — clear locks and hop ASAP (no extra 13–18s).
        // Never wipe an active booking hold (hold has its own ~45s safety).
        _rotateInFlight = false;
        _rotateInFlightAt = 0;
        _clearRotateBusy();
        if (!_bookingHold && !_submitPending) {
          _clearHoldSafety();
          _holdStartedAt = 0;
        }
        if (_submitArmed && !_submitTimer) _submitArmed = false;
        _nextRotateAt = now;
        updateAiStatus(
          inWindow
            ? "City Change — unstuck; hopping now…"
            : `City Change — unstuck; waiting for IST window ${getSlotWindowLabel()}…`
        );
      } else if (unlocked) {
        if (!_bookingHold && !_submitPending) _nextRotateAt = now;
        updateAiStatus(
          inWindow
            ? "City Change — lock cleared; hopping now…"
            : `City Change — lock cleared; next IST window ${getSlotWindowLabel()}…`
        );
      } else {
        updateAiStatus("City Change — timer lost; restarting…");
      }
      _lastRotateTickAt = now;
      _scheduleCityRotate();
    } else if (!inWindow && timerArmed) {
      const wait = msUntilSlotWindow(new Date(now));
      updateAiStatus(
        `City Change — waiting for slot window (IST ${getSlotWindowLabel()}, next in ${formatSlotWait(wait)})`
      );
    }

    if (_rotateActive) {
      _rotateWatchdog = vs.setTimeout(beat, CITY_WATCHDOG_MS);
    }
  };
  _rotateWatchdog = vs.setTimeout(beat, CITY_WATCHDOG_MS);
}

export function stopCityRotate() {
  _cancelRotateTimer();
  _stopRotateWatchdog();
  _stopForceCityPoll();
  _clearHoldSafety();
  _rotateInFlight = false;
  _rotateInFlightAt = 0;
  _rotateActive = false;
  _bookingHold = false;
  _holdStartedAt = 0;
  _nextRotateAt = 0;
  _lastSwitchAt = 0;
  _lastRotateTickAt = 0;
  _clearRotateBusy();
}

export function isCityRotateHeld() {
  return _bookingHold;
}

function _clearRotateBusy() {
  _rotateBusy = false;
  _busyStartedAt = 0;
  if (_rotateBusyClearTimer) {
    vs.clear(_rotateBusyClearTimer);
    _rotateBusyClearTimer = null;
  }
}

/** Match OFC UI: "Date (MM/DD/YYYY)" then "Loading..." (see loading.png). */
export function domShowsDateLoading() {
  const labels = document.querySelectorAll("label, span, div, p, td, th, strong, b");
  for (const el of labels) {
    const t = (el.textContent || "").replace(/\s+/g, " ").trim();
    if (!/^Date\s*\(MM\/DD\/YYYY\)/i.test(t)) continue;
    const near = [
      el,
      el.nextElementSibling,
      el.parentElement,
      el.parentElement?.nextElementSibling,
      el.closest(".form-group, .row, .col, [class*='date'], #datepicker"),
    ];
    for (const n of near) {
      if (!n) continue;
      if (/\bLoading\.{0,3}\b/i.test((n.textContent || "").replace(/\s+/g, " "))) return true;
    }
  }
  for (const el of document.querySelectorAll("div, span, p, label, td")) {
    const raw = (el.childNodes.length === 1 ? el.textContent : "") || "";
    const t = raw.replace(/\s+/g, " ").trim();
    if (!/^Loading\.{0,3}$/i.test(t)) continue;
    const ctx = ((el.parentElement && el.parentElement.textContent) || "").replace(/\s+/g, " ");
    if (/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(ctx)) return true;
  }
  const hay = (document.body?.innerText || document.body?.textContent || "").replace(/\s+/g, " ").slice(0, 8000);
  if (/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(hay)) return true;
  return false;
}

function _domShowsDateLoading() {
  return domShowsDateLoading();
}

/**
 * After city switch — stay while Date Loading… (up to 3 min).
 * If calendar/Select Date is up but dates never arrive, hop after 20s.
 * CGI schedule-days unlocks immediately; do not unlock on bare <select> change.
 */
function _armRotateBusy() {
  _rotateBusy = true;
  _busyStartedAt = Date.now();
  if (_rotateBusyClearTimer) vs.clear(_rotateBusyClearTimer);
  // Hard ceiling = Loading max (3 min). Tick/watchdog hop earlier at 20s if not Loading.
  _rotateBusyClearTimer = vs.setTimeout(() => {
    _rotateBusyClearTimer = null;
    if (!_rotateActive || _bookingHold) return;
    _clearRotateBusy();
    _armNextRotate(Date.now());
    updateAiStatus(
      `City Change — still Loading after ${_cityLoadingMaxMs() / 1000}s; changing city…`
    );
    _scheduleCityRotate();
  }, _cityLoadingMaxMs());
}

export function pauseCityRotateForWait(seconds) {
  const ms = Math.max(0, Number(seconds) || 0) * 1000;
  _rotatePausedUntil = Math.max(_rotatePausedUntil, Date.now() + ms);
  _nextRotateAt = Math.max(_nextRotateAt, _rotatePausedUntil);
  _clearRotateBusy();
  _scheduleCityRotate();
}

export function noteCityRotateResponse() {
  _clearRotateBusy();
}

/**
 * Pause city hops while Auto Submit books (City Change stays ON).
 * Does NOT turn citiesEnabled off.
 */
export function haltCityRotateForBooking() {
  if (_opsFrozen) return;
  _bookingHold = true;
  if (!_holdStartedAt) _holdStartedAt = Date.now();
  _cancelRotateTimer();
  _clearRotateBusy();
  _armHoldSafety();
  // Keep a rotate timer armed while held — otherwise the watchdog thinks we are
  // stuck (no timer) and clears the hold ~20s later, hopping mid date-select.
  _lastRotateTickAt = Date.now();
  if (_rotateActive) _scheduleCityRotate();
  updateAiStatus("City Change — paused (Auto Submit booking)…");
}

/** Resume hops after booking cannot continue on this city.
 *  Never hop while Submit was clicked and we are still waiting for confirmation.
 */
export function resumeCityRotateAfterBooking() {
  if (_submitPending) {
    updateAiStatus(
      "Submit pending — staying on this city (ignoring date reload hop)…"
    );
    return;
  }
  if (!_bookingHold) return;
  _clearHoldSafety();
  _bookingHold = false;
  _holdStartedAt = 0;
  if (!_rotateActive || _opsFrozen) return;
  _armNextRotate(Date.now());
  updateAiStatus("City Change — resuming; next city in 13–18s…");
  _scheduleCityRotate();
}

/** @deprecated alias — callers use halt/resume */
export function releaseCityRotateHold() {
  resumeCityRotateAfterBooking();
}

/** Re-check current city when Auto Submit turns on (once — not on a loop). */
export async function probeAutoSubmitForCurrentCity() {
  const ai = await getArmedAiConfig();
  if (!ai) return;

  const now = Date.now();
  if (now - _lastProbeAt < 60_000) return;
  _lastProbeAt = now;

  const select = document.querySelector("#post_select");
  const postId = select?.value;
  if (!postId) {
    updateAiStatus("Auto Submit ON — pick a city first.");
    return;
  }

  const posts = await getPosts();
  const post = posts.find((p) => String(p.ID) === String(postId));
  const days = post?.Days;
  if (Array.isArray(days) && days.length) {
    const inRange = filterDaysInAiRange(days, ai.from, ai.to);
    if (inRange.length) {
      haltCityRotateForBooking();
      const idx = pickPreferredDateIndex(inRange.length);
      const date = inRange[idx].Date;
      updateAiStatus(`Auto Submit: picking date #${idx + 1} (${date.slice(0, 10)})…`);
      noteDatePicked(date);
      vs.send({ action: "selectFirstDate", date, maxMs: AI_DATE_SELECT_MS, pollMs: AI_BOOK_POLL_MS });
      return;
    }
    updateAiStatus(`Auto Submit ON — no dates in your range on ${post.Name || "this city"} yet.`);
    return;
  }

  updateAiStatus("Auto Submit ON — loading slots for current city…");
  vs.send({ action: "selectPost", postId: String(postId) });
}

export function resetAutoSubmitProbe() {
  _lastProbeAt = 0;
}

function _cancelRotateTimer() {
  if (_rotateTimer) {
    vs.clear(_rotateTimer);
    _rotateTimer = null;
  }
}

function _randBetween(min, max) {
  return min + Math.random() * (max - min);
}

function _rotateGapMs() {
  return _randBetween(_cityRotateMinGapMs(), _cityRotateMaxGapMs());
}

function _armNextRotate(from = Date.now()) {
  _nextRotateAt = from + _rotateGapMs();
}

function _msUntilNextRotate(now = Date.now()) {
  const slotWait = msUntilSlotWindow(new Date(now));
  if (slotWait > 0) return slotWait;

  if (_rotatePausedUntil > now) {
    return _rotatePausedUntil - now;
  }
  if (_lastSwitchAt) {
    const minWait = _lastSwitchAt + _cityRotateMinGapMs() - now;
    if (minWait > 0) return minWait;
  }
  if (_nextRotateAt > now) {
    return _nextRotateAt - now;
  }
  return 0;
}

function _scheduleCityRotate() {
  if (!_rotateActive) return;
  _cancelRotateTimer();
  if (_bookingHold || _rotateBusy) {
    _rotateTimer = vs.setTimeout(() => { _rotateTick(); }, 500);
    return;
  }

  const now = Date.now();
  const slotWait = msUntilSlotWindow(new Date(now));

  // Outside IST window: wake at the exact start second.
  // Never pad this with the 13–18s hop gap (that was making :54 fire at :55/:56).
  if (slotWait > 0) {
    if (_nextRotateAt > now) _nextRotateAt = now;
    if (slotWait >= CITY_STUCK_TICK_MS) _lastRotateTickAt = now;
    _rotateTimer = vs.setTimeout(() => { _rotateTick(); }, slotWait);
    return;
  }

  // Inside window: wait only for booking pause / min gap after a real switch / armed next.
  // Do NOT invent a fresh random 13–18s when delay is 0 ("hop now").
  let delay = 0;
  if (_rotatePausedUntil > now) delay = Math.max(delay, _rotatePausedUntil - now);
  if (_lastSwitchAt) {
    delay = Math.max(delay, _lastSwitchAt + _cityRotateMinGapMs() - now);
  }
  if (_nextRotateAt > now) {
    delay = Math.max(delay, _nextRotateAt - now);
  }
  delay = Math.max(0, delay);

  // Keep watchdog from false "stuck" during long waits (e.g. next IST window).
  if (delay >= CITY_STUCK_TICK_MS) {
    _lastRotateTickAt = Date.now();
  }
  _rotateTimer = vs.setTimeout(() => { _rotateTick(); }, delay);
}

/**
 * Next preferred city in fixed checklist order (A→B→C→A…).
 * Never random — keeps a clear path through the selected cities.
 */
function _pickNextCity(cities, currentId) {
  if (!cities.length) return null;
  if (cities.length === 1) {
    _rotateIndex = 0;
    return cities[0];
  }
  let idx = cities.findIndex((c) => String(c.id) === String(currentId));
  if (idx < 0) {
    // Current not in preferred list — start from stored rotate index.
    idx = Math.max(0, Math.min(_rotateIndex, cities.length - 1));
  }
  const nextIdx = (idx + 1) % cities.length;
  _rotateIndex = nextIdx;
  return cities[nextIdx];
}

function _postOptions() {
  const select = document.querySelector("#post_select");
  if (!select) return [];
  return [...select.options]
    .filter((o) => o.value)
    .map((o) => ({ id: String(o.value), name: (o.textContent || "").trim() }));
}

function _normCityName(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/\b(vac|ofc|consular|embassy|appointment)\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Map saved preferred cities onto live #post_select options.
 * Match by id first, then by name — so a stale id does not drop a city from rotation.
 */
function _preferredCitiesInDropdown(preferred) {
  const opts = _postOptions();
  if (!opts.length || !preferred?.length) return [];
  const byId = new Map(opts.map((o) => [String(o.id), o]));
  const byName = new Map();
  for (const o of opts) {
    const n = _normCityName(o.name);
    if (n && !byName.has(n)) byName.set(n, o);
  }
  const out = [];
  const seen = new Set();
  for (const c of preferred) {
    if (!c) continue;
    let hit = byId.get(String(c.id));
    if (!hit) {
      const n = _normCityName(c.name);
      if (n) hit = byName.get(n) || null;
    }
    if (!hit) continue;
    if (seen.has(hit.id)) continue;
    seen.add(hit.id);
    out.push({ id: hit.id, name: hit.name });
  }
  return out;
}

function _readSelectedCities() {
  const box = document.querySelector(idSel(ID.aiCities));
  if (!box) return [];
  return [...box.querySelectorAll('input[type="checkbox"]:checked')].map((cb) => ({
    id: String(cb.value),
    name: cb.dataset.name || cb.value,
  }));
}

function _readFormDates() {
  return {
    from: document.querySelector(idSel(ID.aiFrom))?.value || null,
    to: document.querySelector(idSel(ID.aiTo))?.value || null,
  };
}

function _fillCitiesChecklist(selectedIds = [], { force = false, selectedCities = null } = {}) {
  const box = document.querySelector(idSel(ID.aiCities));
  if (!box) return;
  const opts = _postOptions();
  const optionsKey = _citiesOptionsKeyFrom(opts);
  const panel = document.querySelector(idSel(ID.aiPanel));
  const panelOpen = panel && !panel.classList.contains(CLS.hidden);
  const currentChecked = _readCheckedCityIds();

  if (!force && optionsKey === _citiesOptionsKey && box.querySelector('input[type="checkbox"]')) {
    return;
  }
  _citiesOptionsKey = optionsKey;

  // Resolve saved prefs onto live dropdown ids (id or name) so none are lost.
  const preferred =
    selectedCities?.length
      ? selectedCities
      : (selectedIds || []).map((id) => ({ id: String(id), name: "" }));
  const resolved = preferred.length
    ? _preferredCitiesInDropdown(preferred)
    : [];
  const want = new Set(
    panelOpen && currentChecked.length && !force && !preferred.length
      ? currentChecked
      : (resolved.length ? resolved.map((c) => c.id) : currentChecked).map(String)
  );

  box.replaceChildren();
  if (!opts.length) {
    box.textContent = "Open the city dropdown on this page first, then reopen Tik Tik.";
    return;
  }
  for (const opt of opts) {
    const label = document.createElement("label");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.value = opt.id;
    cb.dataset.name = opt.name;
    cb.checked = want.has(opt.id);
    label.append(cb, document.createTextNode(opt.name));
    box.appendChild(label);
  }
}

function _cityNames(cfg) {
  const list = cfg?.cities || [];
  if (!list.length) return "—";
  return list.map((c) => c.name || c.id).join(", ");
}

async function _persistForm(accountId, patch = {}) {
  const prev = (await getAiConfig(accountId)) || {};
  const { from, to } = _readFormDates();
  const fromUi = _readSelectedCities();
  const optsIds = new Set(_postOptions().map((o) => String(o.id)));
  const prevCities = Array.isArray(prev.cities) ? prev.cities : [];
  let cities;
  if (fromUi.length) {
    // Keep previously saved cities that are not in the dropdown yet (can't be checked).
    // Also re-resolve by name so stale ids are rewritten to live dropdown ids.
    const merged = [...fromUi];
    const uiIds = new Set(fromUi.map((c) => String(c.id)));
    for (const c of prevCities) {
      if (!c) continue;
      if (optsIds.has(String(c.id))) continue; // visible — user choice is fromUi only
      if (uiIds.has(String(c.id))) continue;
      merged.push({ id: String(c.id), name: c.name || c.id });
    }
    cities = _preferredCitiesInDropdown(merged);
    if (!cities.length) cities = fromUi;
  } else {
    cities = prevCities;
  }
  const next = {
    ...prev,
    from: from || prev.from || null,
    to: to || prev.to || null,
    cities: cities.length ? cities : (prev.cities || []),
    loginId: document.querySelector(idSel(ID.aiLogin))?.value?.trim() || prev.loginId || "",
    loginPass: document.querySelector(idSel(ID.aiPass))?.value || prev.loginPass || "",
    security: [0, 1, 2].map((i) => {
      const qId = [ID.aiQ1, ID.aiQ2, ID.aiQ3][i];
      const aId = [ID.aiA1, ID.aiA2, ID.aiA3][i];
      return {
        q: document.querySelector(idSel(qId))?.value?.trim() || prev.security?.[i]?.q || "",
        a: document.querySelector(idSel(aId))?.value?.trim() || prev.security?.[i]?.a || "",
        set: i + 1,
      };
    }),
    ...patch,
  };
  // Keep legacy `enabled` in sync with submitEnabled
  if (typeof next.submitEnabled === "boolean") next.enabled = next.submitEnabled;
  next.serverUpdatedAt = Date.now();
  await setAiConfig(accountId, next);
  _scheduleTikTikServerPush(next);
  return next;
}

var _tikTikPushTimer = null;
var _tikTikPullDoneFor = null;

function _scheduleTikTikServerPush(cfg) {
  if (_tikTikPushTimer) vs.clear(_tikTikPushTimer);
  _tikTikPushTimer = vs.setTimeout(() => {
    _tikTikPushTimer = null;
    pushTikTikPrefs(cfg).catch(() => {});
  }, 400);
}

async function _pullTikTikFromServer(accountId) {
  if (!accountId) return null;
  if (_tikTikPullDoneFor === accountId) return null;
  const server = await pullTikTikPrefs();
  _tikTikPullDoneFor = accountId;
  if (!server) return null;
  const local = (await getAiConfig(accountId)) || {};
  const merged = mergeServerTikTikPrefs(local, server);
  if (!merged) return null;
  // Never overwrite local secrets from server (server never has them).
  merged.loginId = local.loginId || merged.loginId || "";
  merged.loginPass = local.loginPass || "";
  merged.security = local.security || merged.security || [];
  if (typeof merged.submitEnabled === "boolean") merged.enabled = merged.submitEnabled;
  await setAiConfig(accountId, merged);
  return merged;
}

async function _switchToCity(cityId, label) {
  if (_submitPending) return false;
  if (!isInSlotWindow()) return false;
  if (_bookingHold || _submitArmed) return false;
  const select = document.querySelector("#post_select");
  if (!select || !cityId) return false;
  const nextId = String(cityId);
  if (String(select.value) === nextId) {
    return false;
  }
  _armRotateBusy();
  updateAiStatus(`Switching city → ${label || cityId}…`);
  _clearFailedSubmitDates();
  vs.send({ action: "selectPost", postId: nextId });
  return true;
}

/**
 * Force-switch for a shared slot alert — ignores IST window, rotate gap,
 * and booking hold. Even if we hopped 1s ago, switch immediately.
 */
export async function forceSwitchToCity(cityId, label, { alertId, dayCount } = {}) {
  if (_opsFrozen || isInterviewPage() || !isSchedulePage()) return false;
  // Don't yank city while Submit confirmation is still in flight.
  if (_submitPending) return false;
  const select = document.querySelector("#post_select");
  if (!select || !cityId) return false;
  const nextId = String(cityId);
  const name = label || nextId;

  if (String(select.value) === nextId) {
    updateAiStatus(
      `City alert — already on ${name}` +
        (dayCount ? ` (${dayCount} dates reported)` : "")
    );
    return true;
  }

  // Drop local locks so the hop is not deferred.
  _clearHoldSafety();
  _clearRotateBusy();
  _bookingHold = false;
  _holdStartedAt = 0;
  _submitArmed = false;
  clearPendingSubmit();
  _rotateInFlight = false;
  _rotateInFlightAt = 0;
  _nextRotateAt = Date.now();
  _lastSwitchAt = 0;

  _armRotateBusy();
  _lastSwitchAt = Date.now();
  _clearFailedSubmitDates();
  updateAiStatus(
    `City alert — switching now → ${name}` +
      (dayCount ? ` (${dayCount} dates)` : "") +
      (alertId ? ` [#${alertId}]` : "")
  );
  vs.send({ action: "selectPost", postId: nextId });
  if (_rotateActive) _scheduleCityRotate();
  return true;
}

var _forcePollTimer = null;
var _forcePollInFlight = false;
var _lastForceSwitchKey = "";
var _lastForceSwitchAt = 0;
/** Poll very often so preferred-city users hop within ~150ms of an alert. */
var FORCE_CITY_POLL_MS = 150;

function _stopForceCityPoll() {
  if (_forcePollTimer) {
    vs.clear(_forcePollTimer);
    _forcePollTimer = null;
  }
  _forcePollInFlight = false;
}

async function _forceCityPollTick() {
  if (_forcePollInFlight || !_rotateActive || _opsFrozen) return;
  _forcePollInFlight = true;
  try {
    const cfg = await getCitiesRotateConfig();
    if (!cfg?.cities?.length) return;
    const select = document.querySelector("#post_select");
    const force = await pollForceCity({
      preferredCities: cfg.cities,
      citiesEnabled: true,
      currentCityId: select ? String(select.value) : "",
    });
    if (!force?.alertId) return;

    if (force.alreadyThere) {
      markForceCityApplied(force.alertId);
      updateAiStatus(
        `City alert — already on ${force.name || force.id}` +
          (force.dayCount ? ` (${force.dayCount} dates)` : "")
      );
      return;
    }

    // Avoid thrashing the same alert every poll while the city change loads.
    const key = `${force.id}:${force.alertId}`;
    const now = Date.now();
    if (key === _lastForceSwitchKey && now - _lastForceSwitchAt < 6000) {
      markForceCityApplied(force.alertId);
      return;
    }

    const ok = await forceSwitchToCity(force.id, force.name, {
      alertId: force.alertId,
      dayCount: force.dayCount,
    });
    // Only consume the alert after a successful hop (or already-on).
    if (ok) {
      _lastForceSwitchKey = key;
      _lastForceSwitchAt = now;
      markForceCityApplied(force.alertId);
    }
  } catch {
    /* ignore */
  } finally {
    _forcePollInFlight = false;
  }
}

function _ensureForceCityPoll() {
  if (_forcePollTimer || !_rotateActive) return;
  const beat = () => {
    _forcePollTimer = null;
    if (!_rotateActive || _opsFrozen || !vs.alive) return;
    _forceCityPollTick().finally(() => {
      if (_rotateActive && !_opsFrozen && vs.alive) {
        _forcePollTimer = vs.setTimeout(beat, FORCE_CITY_POLL_MS);
      }
    });
  };
  _forcePollTimer = vs.setTimeout(beat, 50);
}

function _bindPostSelectRotateWatch() {
  if (_postSelectRotateBound) return;
  const select = document.querySelector("#post_select");
  if (!select) return;
  _postSelectRotateBound = true;
  // Do NOT clear busy on change — that fired before Loading appeared and
  // cancelled the Loading wait. Unlock only via CGI or Loading/calendar timeouts.
}

async function _rotateTick() {
  if (_rotateInFlight || !_rotateActive) return;
  _rotateInFlight = true;
  _rotateInFlightAt = Date.now();
  _lastRotateTickAt = Date.now();
  _rotateTimer = null;

  try {
    if (_opsFrozen || isInterviewPage() || !vs.alive) {
      stopCityRotate();
      return;
    }

    // Auto-unlock orphan busy/hold so hops never freeze forever.
    if (_recoverStuckRotateLocks()) {
      _nextRotateAt = Date.now();
      updateAiStatus(
        isInSlotWindow()
          ? "City Change — auto-unstuck; hopping now…"
          : `City Change — auto-unstuck; waiting IST ${getSlotWindowLabel()}…`
      );
      _scheduleCityRotate();
      return;
    }

    // Booking hold — stay on city; do NOT turn City Change OFF.
    if (_bookingHold || _submitArmed) {
      const heldFor = _holdStartedAt ? Date.now() - _holdStartedAt : 0;
      if (_bookingHold && heldFor >= _cityHoldMaxMs()) {
        _clearHoldSafety();
        _bookingHold = false;
        _holdStartedAt = 0;
        _armNextRotate(Date.now());
        updateAiStatus("City Change — hold expired; next city in 13–18s…");
        _scheduleCityRotate();
        return;
      }
      const left = Math.max(0, _cityHoldMaxMs() - heldFor);
      updateAiStatus(
        `City Change — paused (Auto Submit booking)… hop in ≤${Math.ceil(left / 1000)}s`
      );
      _scheduleCityRotate();
      return;
    }

    const now = Date.now();
    const slot = isInSlotWindow(new Date(now));
    const slotWait = msUntilSlotWindow(new Date(now));
    if (!slot) {
      updateAiStatus(
        `City Change — waiting for slot window (IST ${getSlotWindowLabel()}, next in ${formatSlotWait(slotWait)})`
      );
      _scheduleCityRotate();
      return;
    }

    // After city switch:
    //  - true "Loading..." screen → wait up to 3 min
    //  - calendar/Select Date up but dates not loaded → hop after 20s
    if (_rotateBusy) {
      const busyFor = _busyStartedAt ? now - _busyStartedAt : 0;
      if (_domShowsDateLoading()) {
        if (busyFor >= _cityLoadingMaxMs()) {
          _clearRotateBusy();
          _armNextRotate(Date.now());
          updateAiStatus(
            `City Change — still Loading after ${_cityLoadingMaxMs() / 1000}s; changing city…`
          );
          _scheduleCityRotate();
          return;
        }
        const left = Math.max(0, Math.ceil((_cityLoadingMaxMs() - busyFor) / 1000));
        updateAiStatus(
          `City Change — Date Loading… stay (${left}s then hop if still Loading)`
        );
        _scheduleCityRotate();
        return;
      }
      // Loading gone / calendar waiting for dates — hop after 20s if CGI never unlocks.
      if (busyFor >= _cityCalendarNoDatesMs()) {
        _clearRotateBusy();
        _armNextRotate(Date.now());
        updateAiStatus(
          `City Change — calendar up but no dates after ${_cityCalendarNoDatesMs() / 1000}s; changing city…`
        );
        _scheduleCityRotate();
        return;
      }
      const left = Math.max(0, Math.ceil((_cityCalendarNoDatesMs() - busyFor) / 1000));
      updateAiStatus(
        `City Change — waiting calendar dates… (${left}s then hop)`
      );
      _scheduleCityRotate();
      return;
    }

    const waitMs = _msUntilNextRotate(now);
    if (waitMs > 0) {
      const showSec = Math.ceil(waitMs / 1000);
      updateAiStatus(`City Change — slot ${slot} active, next switch in ${Math.max(1, showSec)}s`);
      _scheduleCityRotate();
      return;
    }

    const cfg = await getCitiesRotateConfig();
    if (!cfg?.cities?.length) {
      stopCityRotate();
      return;
    }

    const available = new Set(_postOptions().map((o) => o.id));
    const cities = _preferredCitiesInDropdown(cfg.cities);
    if (!cities.length) {
      updateAiStatus("Preferred cities not found in the dropdown — pick cities again.");
      stopCityRotate();
      return;
    }
    if (cities.length < (cfg.cities?.length || 0)) {
      updateAiStatus(
        `City Change — using ${cities.length}/${cfg.cities.length} preferred ` +
          `(some ids remapped/missing in dropdown): ${cities.map((c) => c.name || c.id).join(" → ")}`
      );
    }

    const select = document.querySelector("#post_select");
    const currentId = select ? String(select.value) : "";
    const next = _pickNextCity(cities, currentId);
    if (!next) {
      _armNextRotate(now);
      _scheduleCityRotate();
      return;
    }

    const switched = await _switchToCity(next.id, next.name);
    if (switched) {
      _lastSwitchAt = Date.now();
      _armNextRotate(_lastSwitchAt);
      const path = cities.map((c) => c.name || c.id).join(" → ");
      const step = `${_rotateIndex + 1}/${cities.length}`;
      updateAiStatus(
        `City Change — ${step} ${next.name || next.id} (path: ${path}); Loading up to ${_cityLoadingMaxMs() / 1000}s, no-dates hop ${_cityCalendarNoDatesMs() / 1000}s`
      );
    } else {
      _armNextRotate(now);
    }
    _scheduleCityRotate();
  } finally {
    _rotateInFlight = false;
    _rotateInFlightAt = 0;
  }
}

export async function startCityRotate() {
  if (_opsFrozen) return;
  if (isInterviewPage() || !isSchedulePage()) return;

  const cfg = await getCitiesRotateConfig();
  if (!cfg?.cities?.length) return;

  const cities = _preferredCitiesInDropdown(cfg.cities);
  if (!cities.length) {
    updateAiStatus("Preferred cities not found in the dropdown — reopen Tik Tik and pick cities again.");
    return;
  }

  // Always clear stuck locks on (re)start — same as OFF→ON.
  _clearHoldSafety();
  _clearRotateBusy();
  _bookingHold = false;
  _holdStartedAt = 0;
  _submitArmed = false;
  _rotateInFlight = false;
  _rotateInFlightAt = 0;
  _rotateActive = true;
  _lastRotateTickAt = Date.now();
  // First hop soon in-window (do not inherit a stale far-future gap).
  _nextRotateAt = Date.now();

  const select = document.querySelector("#post_select");
  const current = select ? String(select.value) : "";
  const idx = cities.findIndex((c) => String(c.id) === current);
  _rotateIndex = idx >= 0 ? idx : 0;
  const path = cities.map((c) => c.name || c.id).join(" → ");
  updateAiStatus(
    `City Change ON — ${cities.length} cities (${path}); IST ${getSlotWindowLabel()}; hop 13–18s`
  );
  _ensureRotateWatchdog();
  _ensureForceCityPoll();
  _scheduleCityRotate();
}

/** Restart rotation if City Change is ON but stuck / timer lost. */
export async function ensureCityRotateRunning() {
  if (_opsFrozen || isInterviewPage() || !isOfcSchedulePage() || !vs.alive) return;
  const cfg = await getCitiesRotateConfig();
  if (!cfg?.cities?.length) return;
  if (!document.querySelector("#post_select")) return;

  if (!_rotateActive) {
    await startCityRotate();
    return;
  }

  const unlocked = _recoverStuckRotateLocks();
  _ensureRotateWatchdog();
  _ensureForceCityPoll();
  if (unlocked || (!_rotateTimer && !_rotateInFlight)) {
    if (unlocked) {
      _armNextRotate(Date.now());
      updateAiStatus("City Change — auto-unstuck; next city in 13–18s…");
    }
    _scheduleCityRotate();
  }
}

function _findSubmitButton() {
  return document.querySelector("#submitbtn")
    || document.querySelector('button#submitbtn')
    || document.querySelector('input#submitbtn')
    || [...document.querySelectorAll("button, input[type=submit]")].find((b) =>
      /submit/i.test(b.textContent || b.value || "")
    );
}

/** True only when Submit is present and enabled. */
export function isSubmitButtonEnabled() {
  const submit = _findSubmitButton();
  return !!(submit && !submit.disabled);
}

/** Lean Submit: requestSubmit/click first; mouse theater only if needed. */
function _clickSubmitLocal(btn) {
  if (!btn || btn.disabled) return false;
  try {
    const form = btn.form || btn.closest?.("form");
    if (form && typeof form.requestSubmit === "function") {
      form.requestSubmit(btn);
      return true;
    }
  } catch {}
  try {
    btn.click();
    return true;
  } catch {}
  try {
    btn.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window }));
    btn.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, cancelable: true, view: window }));
    btn.click();
    return true;
  } catch {}
  return false;
}

/** Content-script + MAIN-world Submit — only if the button is enabled. */
export function clickSubmitDual() {
  const btn = _findSubmitButton();
  if (!btn || btn.disabled) return false;
  const ok = _clickSubmitLocal(btn);
  vs.send({
    action: "forceClickSubmit",
    prefix: T,
    pollMs: AI_BOOK_POLL_MS,
    maxMs: Math.min(1500, AI_SUBMIT_ARM_MS),
  });
  return ok;
}

function _isBookingReadyToSubmit() {
  if (!isTimeSlotPicked()) return false;
  return isSubmitButtonEnabled();
}

/**
 * Resolve as soon as Submit enables (MutationObserver + 25ms poll backup).
 * Returns true if enabled before maxMs, else false.
 */
export function waitForSubmitEnabled(maxMs) {
  const deadline = Date.now() + Math.max(0, Number(maxMs) || 0);
  if (isTimeSlotPicked() && isSubmitButtonEnabled()) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    let done = false;
    let pollId = null;
    let obs = null;

    const finish = (ok) => {
      if (done) return;
      done = true;
      try { obs?.disconnect(); } catch {}
      if (pollId) vs.clear(pollId);
      resolve(!!ok);
    };

    const check = () => {
      if (!vs.alive || isOpsFrozen() || isInterviewPage()) return finish(false);
      if (isTimeSlotPicked() && isSubmitButtonEnabled()) return finish(true);
      if (Date.now() >= deadline) {
        return finish(isTimeSlotPicked() && isSubmitButtonEnabled());
      }
    };

    try {
      obs = new MutationObserver(check);
      const btn = _findSubmitButton();
      if (btn) {
        obs.observe(btn, { attributes: true, attributeFilter: ["disabled", "class", "aria-disabled"] });
      }
      const form = btn?.form || btn?.closest?.("form") || document.querySelector("#page_form, form");
      if (form) {
        obs.observe(form, {
          attributes: true,
          attributeFilter: ["disabled", "class"],
          childList: true,
          subtree: true,
        });
      } else {
        obs.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["disabled"],
          childList: true,
          subtree: true,
        });
      }
    } catch {
      obs = null;
    }

    pollId = vs.setInterval(check, AI_BOOK_POLL_MS);
    check();
  });
}

export function notifyExtensionDead() {
  updateAiStatus("Extension reloaded — refresh this visa page, then turn Auto Submit ON again.");
}

export async function armAiFastSubmit(accountId) {
  if (_opsFrozen) return;
  if (isInterviewPage()) return;
  if (_submitArmed) return;
  const cfg = await getAiConfig(accountId);
  if (!isSubmitEnabled(cfg)) return;

  haltCityRotateForBooking();
  _submitArmed = true;
  armSubmitErrorWatch();

  const started = Date.now();
  let done = false;
  let clicked = false;

  const finish = async (submitted) => {
    if (done || !_submitArmed || !vs.alive) return;
    done = true;
    window.removeEventListener("message", onSubmitMsg);
    if (_submitTimer) {
      vs.clear(_submitTimer);
      _submitTimer = null;
    }
    if (isInterviewPage()) {
      _submitArmed = false;
      return;
    }
    _submitArmed = false;
    if (submitted) {
      await noteSubmitClicked(accountId);
      return;
    }
    resumeCityRotateAfterBooking();
    if (_rotateActive) {
      updateAiStatus("Auto Submit — Submit not clicked in time; City Change resuming…");
    } else {
      updateAiStatus("Auto Submit — Submit not clicked in time; still watching…");
    }
  };

  const onSubmitMsg = (event) => {
    if (!vs.alive || event.source !== window) return;
    if (event.data?.action !== MSG.sub) return;
    finish(true);
  };
  window.addEventListener("message", onSubmitMsg);

  const tryFinish = async () => {
    if (done || !_submitArmed || !vs.alive || clicked) return;

    const elapsed = Date.now() - started;

    // Click the instant Submit enables (no artificial post-slot delay).
    if (_isBookingReadyToSubmit()) {
      clicked = true;
      updateAiStatus("Submit enabled — clicking…");
      clickSubmitDual();
      return;
    }

    if (elapsed >= AI_SUBMIT_ARM_MS) {
      return finish(false);
    }

    updateAiStatus("Waiting for Submit to enable…");
    _submitTimer = vs.setTimeout(tryFinish, AI_BOOK_POLL_MS);
  };

  // Observer wakes us as soon as disabled flips; poll is backup.
  waitForSubmitEnabled(AI_SUBMIT_ARM_MS).then((enabled) => {
    if (done || !_submitArmed || !vs.alive || clicked) return;
    if (enabled) tryFinish();
  });

  tryFinish();
}

/** Call after watcher or manual slot pick when Auto Submit is ON. */
export async function triggerAutoSubmitIfArmed() {
  if (!isTimeSlotPicked() || _submitArmed || _opsFrozen) return;
  const ai = await getArmedAiConfig();
  if (!ai) return;
  await armAiFastSubmit(ai.accountId);
}

export async function scheduleAiSubmitClick(accountId) {
  if (_opsFrozen) return;
  if (isInterviewPage()) return;
  if (_submitArmed) return;
  const cfg = await getAiConfig(accountId);
  if (!isSubmitEnabled(cfg)) return;

  haltCityRotateForBooking();
  _submitArmed = true;
  const started = Date.now();
  let clicked = false;

  const trySubmit = async () => {
    if (!_submitArmed || !vs.alive || clicked) return;
    const elapsed = Date.now() - started;
    const ready = _isBookingReadyToSubmit();

    if (ready) {
      clicked = true;
      _submitTimer = null;
      if (isInterviewPage()) {
        _submitArmed = false;
        return;
      }
      updateAiStatus("Submit enabled — clicking…");
      const ok = clickSubmitDual();
      if (ok) {
        await noteSubmitClicked(accountId);
      }
      _submitArmed = false;
      return;
    }

    if (elapsed >= AI_SUBMIT_ARM_MS) {
      _submitTimer = null;
      _submitArmed = false;
      resumeCityRotateAfterBooking();
      updateAiStatus("Submit stayed disabled — gave up; City Change resuming…");
      return;
    }

    updateAiStatus(`Waiting for Submit to enable (${(elapsed / 1000).toFixed(1)}s)…`);
    _submitTimer = vs.setTimeout(() => { trySubmit(); }, AI_BOOK_POLL_MS);
  };

  updateAiStatus("Time picked — waiting for Submit to enable…");
  waitForSubmitEnabled(AI_SUBMIT_ARM_MS).then((enabled) => {
    if (enabled) trySubmit();
  });
  trySubmit();
}

function updateAiStatus(text) {
  const el = document.querySelector(idSel(ID.aiStatus));
  if (el) el.textContent = text;
}

export function setTikTikStatus(text) {
  updateAiStatus(text);
}

function _termsAgreed(cfg) {
  return !!(cfg && cfg.termsAgreed);
}

function _termsPassed(cfg) {
  return !!(cfg && cfg.termsPassed);
}

function _readTermsAgreed() {
  return !!document.querySelector(idSel(ID.aiTermsAgree))?.checked;
}

function _paintGate(cfg) {
  const gate = document.querySelector(idSel(ID.aiTermsGate));
  const main = document.querySelector(idSel(ID.aiMain));
  const cb = document.querySelector(idSel(ID.aiTermsAgree));
  const cont = document.querySelector(idSel(ID.aiTermsContinue));
  const passed = _termsPassed(cfg);
  if (gate) gate.classList.toggle(CLS.hidden, passed);
  if (main) main.classList.toggle(CLS.hidden, !passed);
  if (cb) {
    cb.checked = _termsAgreed(cfg) || _readTermsAgreed();
  }
  if (cont) cont.disabled = !(_termsAgreed(cfg) || _readTermsAgreed());
}

function _onTermsAgreeToggle() {
  const cont = document.querySelector(idSel(ID.aiTermsContinue));
  const agreed = _readTermsAgreed();
  if (cont) cont.disabled = !agreed;
  updateAiStatus(agreed ? "Terms checked — tap Continue." : "Check Agree to continue.");
}

async function _onTermsContinue() {
  if (!_readTermsAgreed()) {
    updateAiStatus("Check Agree first.");
    return;
  }
  const accountId = await getAccountId();
  if (!accountId) {
    updateAiStatus("Open a logged-in schedule page so we can bind this to your account.");
    return;
  }
  const prev = (await getAiConfig(accountId)) || {};
  const { from, to } = _readFormDates();
  const cities = _readSelectedCities();
  const windows = _readTimingRowsFromDom();

  thawOps();
  clearPendingSubmit();
  resetAutoSubmitProbe();

  _submitFieldsOpen = true;
  _citiesFieldsOpen = true;

  await _persistForm(accountId, {
    termsAgreed: true,
    termsPassed: true,
    termsAgreedAt: prev.termsAgreedAt || Date.now(),
    submitEnabled: true,
    citiesEnabled: true,
    from: from || prev.from || null,
    to: to || prev.to || null,
    cities: cities.length ? cities : (prev.cities || []),
    slotWindows: windows.length ? windows : (prev.slotWindows || null),
    confirmedAt: Date.now(),
  });

  await refreshAiSubmitUi();
  _setSwitch(document.querySelector(idSel(ID.aiSubmitSw)), true);
  _setSwitch(document.querySelector(idSel(ID.aiCitiesSw)), true);
  _submitFieldsOpen = true;
  _citiesFieldsOpen = true;
  _paintFeatureBodies(await getAiConfig(accountId));
  _fillCitiesChecklist((prev.cities || []).map((c) => c.id), { force: true, selectedCities: prev.cities || [] });
  _fillTimingEditor(prev);
  _paintGate(await getAiConfig(accountId));

  const nextCities = _readSelectedCities().length ? _readSelectedCities() : (prev.cities || []);
  if (nextCities.length) {
    _bindPostSelectRotateWatch();
    await startCityRotate();
  }
  if ((from || prev.from) && (to || prev.to)) {
    await probeAutoSubmitForCurrentCity();
  }
  updateAiStatus("Auto Submit and City Change ON — set dates and preferred cities.");
}

function _syncAccountWindows(cfg) {
  if (cfg?.slotWindows?.length) {
    setAccountSlotWindows(cfg.slotWindows);
  } else {
    clearAccountSlotWindows();
  }
}

function _minuteOptions(selected) {
  let html = "";
  for (let m = 0; m <= 59; m++) {
    const sel = Number(selected) === m ? " selected" : "";
    html += `<option value="${m}"${sel}>:${String(m).padStart(2, "0")}</option>`;
  }
  return html;
}

function _durationOptions(fromMin, selected) {
  const maxDur = Math.min(MAX_WINDOW_DURATION_MIN, 59 - Number(fromMin || 0));
  let html = "";
  for (let d = 1; d <= Math.max(1, maxDur); d++) {
    const sel = Number(selected) === d ? " selected" : "";
    html += `<option value="${d}"${sel}>${d} min</option>`;
  }
  return html;
}

function _runsHelp(fromMin, durationMin) {
  const f = Number(fromMin) || 0;
  const d = Number(durationMin) || 1;
  const to = Math.min(59, f + d);
  return `Runs from :${String(f).padStart(2, "0")} up to :${String(to).padStart(2, "0")}`;
}

function _readTimingRowsFromDom() {
  const list = document.querySelector(idSel(ID.aiWinList));
  if (!list) return [];
  const rows = [];
  for (const row of list.querySelectorAll(`.${CLS.aiWinRow}`)) {
    const fromMin = Number(row.querySelector('select[data-win="from"]')?.value);
    const durationMin = Number(row.querySelector('select[data-win="dur"]')?.value);
    if (!Number.isFinite(fromMin) || !Number.isFinite(durationMin)) continue;
    rows.push({ fromMin, durationMin });
  }
  return normalizeCustomWindows(rows);
}

function _refreshRowHelp(row) {
  const fromSel = row.querySelector('select[data-win="from"]');
  const durSel = row.querySelector('select[data-win="dur"]');
  const help = row.querySelector(`.${CLS.aiWinHelp}`);
  if (!fromSel || !durSel || !help) return;
  help.textContent = _runsHelp(fromSel.value, durSel.value);
}

function _paintTimingRow(fromMin = 0, durationMin = 6) {
  const maxDur = Math.min(MAX_WINDOW_DURATION_MIN, 59 - fromMin);
  const dur = Math.min(Math.max(1, durationMin || 1), Math.max(1, maxDur));
  const row = document.createElement("div");
  row.className = CLS.aiWinRow;
  row.innerHTML = `
    <div class="${CLS.aiInline}">
      <label class="${CLS.aiHead}">Start</label>
      <select data-win="from">${_minuteOptions(fromMin)}</select>
      <label class="${CLS.aiHead}" style="margin-left:10px;color:#6b7280;font-weight:500">Duration</label>
      <select data-win="dur">${_durationOptions(fromMin, dur)}</select>
      <button type="button" class="${CLS.aiTrash}" data-win="del" title="Delete timing" aria-label="Delete">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
        </svg>
      </button>
    </div>
    <div class="${CLS.aiWinHelp}">${_runsHelp(fromMin, dur)}</div>
  `;
  const fromSel = row.querySelector('select[data-win="from"]');
  const durSel = row.querySelector('select[data-win="dur"]');
  vs.on(fromSel, "change", () => {
    const f = Number(fromSel.value);
    const prev = Number(durSel.value) || 1;
    durSel.innerHTML = _durationOptions(f, prev);
    _refreshRowHelp(row);
  });
  vs.on(durSel, "change", () => _refreshRowHelp(row));
  vs.on(row.querySelector('button[data-win="del"]'), "click", () => {
    row.remove();
    _updateTimingNote();
  });
  return row;
}

function _fillTimingEditor(cfg) {
  const list = document.querySelector(idSel(ID.aiWinList));
  if (!list) return;
  list.replaceChildren();
  const rows = cfg?.slotWindows?.length
    ? windowsToEditorRows(cfg.slotWindows)
    : [];
  for (const r of rows.slice(0, MAX_CUSTOM_WINDOWS)) {
    list.appendChild(_paintTimingRow(r.fromMin, r.durationMin));
  }
  _updateTimingNote(cfg);
}

function _updateTimingNote(cfg) {
  const note = document.querySelector(idSel(ID.aiWinNote));
  if (!note) return;
  if (cfg?.slotWindows?.length || _readTimingRowsFromDom().length) {
    note.textContent = `Custom windows active (max ${MAX_CUSTOM_WINDOWS}, each ≤ ${MAX_WINDOW_DURATION_MIN} min).`;
  } else {
    note.textContent = `Using defaults: ${getSlotWindowLabel()}. Add up to ${MAX_CUSTOM_WINDOWS} windows below.`;
  }
}

function _setSwitch(el, on) {
  if (!el) return;
  el.classList.toggle(CLS.aiOnBtn, !!on);
  el.setAttribute("aria-checked", on ? "true" : "false");
}

function _paintToggleButtons(cfg) {
  _setSwitch(document.querySelector(idSel(ID.aiSubmitSw)), isSubmitEnabled(cfg));
  _setSwitch(document.querySelector(idSel(ID.aiCitiesSw)), isCitiesEnabled(cfg));
}

var _submitFieldsOpen = false;
var _citiesFieldsOpen = false;

function _paintFeatureBodies(cfg) {
  const submitOn = isSubmitEnabled(cfg) || _submitFieldsOpen;
  const citiesOn = isCitiesEnabled(cfg) || _citiesFieldsOpen;
  const submitBody = document.querySelector(idSel(ID.aiSubmitBody));
  const citiesBody = document.querySelector(idSel(ID.aiCitiesBody));
  if (submitBody) submitBody.classList.toggle(CLS.hidden, !submitOn);
  if (citiesBody) citiesBody.classList.toggle(CLS.hidden, !citiesOn);
}

function _paintStatus(cfg, accountId) {
  const status = document.querySelector(idSel(ID.aiStatus));
  const btn = document.querySelector(idSel(ID.aiBtn));
  if (!status || !btn) return;

  _paintToggleButtons(cfg);
  _paintFeatureBodies(cfg);

  const submitOn = isSubmitEnabled(cfg);
  const citiesOn = isCitiesEnabled(cfg);
  const anyOn = submitOn || citiesOn;

  if (anyOn) {
    btn.classList.add(CLS.aiOn);
    btn.textContent = "Tik Tik ON";
  } else {
    btn.classList.remove(CLS.aiOn);
    btn.textContent = "Tik Tik";
  }

  const parts = [];
  if (submitOn && cfg.from && cfg.to) {
    parts.push(
      `Auto Submit ON (${_pretty(cfg.from)} – ${_pretty(cfg.to)}, clicks Submit as soon as time slot is ready)`
    );
  } else if (_submitFieldsOpen && !submitOn) {
    parts.push("Auto Submit — set From / To dates, then Enable again");
  } else {
    parts.push("Auto Submit OFF");
  }
  if (citiesOn) {
    parts.push(`City Change ON (${_cityNames(cfg)}, ${getSlotWindowLabel()})`);
  } else if (_citiesFieldsOpen && !citiesOn) {
    parts.push("City Change — pick preferred cities, then Enable again");
  } else {
    parts.push("City Change OFF");
  }
  status.textContent = `Account ${accountId || "—"}: ${parts.join(" · ")}`;
  status.classList.toggle(CLS.aiOk, anyOn);
}

export async function refreshAiSubmitUi() {
  const accountId = await getAccountId();
  if (accountId) {
    try {
      await _pullTikTikFromServer(accountId);
    } catch {
      /* offline / sync optional */
    }
  }
  const cfg = accountId ? await getAiConfig(accountId) : null;
  // Keep date/city panels visible while the matching switch is ON.
  if (!isSubmitEnabled(cfg)) _submitFieldsOpen = false;
  if (!isCitiesEnabled(cfg)) _citiesFieldsOpen = false;
  _syncAccountWindows(cfg);
  _paintStatus(cfg, accountId);
  _paintGate(cfg);
  const from = document.querySelector(idSel(ID.aiFrom));
  const to = document.querySelector(idSel(ID.aiTo));
  if (from) from.value = cfg?.from || "";
  if (to) to.value = cfg?.to || "";
  _paintDateButtons();
  const savedIds = (cfg?.cities || []).map((c) => c.id);
  const panel = document.querySelector(idSel(ID.aiPanel));
  const panelOpen = panel && !panel.classList.contains(CLS.hidden);
  const citiesBody = document.querySelector(idSel(ID.aiCitiesBody));
  const citiesVisible = citiesBody && !citiesBody.classList.contains(CLS.hidden);
  const current = _readCheckedCityIds();
  if (citiesVisible || isCitiesEnabled(cfg) || _citiesFieldsOpen) {
    if (panelOpen && current.length) {
      _fillCitiesChecklist(current);
    } else {
      _fillCitiesChecklist(savedIds, { selectedCities: cfg?.cities || [] });
    }
  }
  _fillTimingEditor(cfg);
  const login = document.querySelector(idSel(ID.aiLogin));
  const pass = document.querySelector(idSel(ID.aiPass));
  if (login && cfg?.loginId) login.value = cfg.loginId;
  if (pass && cfg?.loginPass) pass.value = cfg.loginPass;
  const qs = cfg?.security || [];
  const qEls = [ID.aiQ1, ID.aiQ2, ID.aiQ3];
  const aEls = [ID.aiA1, ID.aiA2, ID.aiA3];
  qEls.forEach((id, i) => {
    const el = document.querySelector(idSel(id));
    if (!el) return;
    el.innerHTML = _securityOptionsHtml(i, qs[i]?.q || "");
  });
  aEls.forEach((id, i) => {
    const el = document.querySelector(idSel(id));
    if (el && qs[i]?.a) el.value = qs[i].a;
  });
  const loginBody = document.querySelector(idSel(ID.aiLoginBody));
  const loginOpen = loginBody && !loginBody.classList.contains(CLS.hidden);
  _paintLoginToggle(!!loginOpen, _loginDetailsSaved(cfg));
}

function _isPanelOpen() {
  const panel = document.querySelector(idSel(ID.aiPanel));
  return !!(panel && !panel.classList.contains(CLS.hidden));
}

function _togglePanel(show) {
  const panel = document.querySelector(idSel(ID.aiPanel));
  if (!panel) return;
  if (!show) _closeCal();
  panel.classList.toggle(CLS.hidden, !show);
  if (show) {
    getAccountId().then(async (id) => {
      if (id) {
        try {
          _tikTikPullDoneFor = null; // allow fresh pull when opening panel
          await _pullTikTikFromServer(id);
        } catch {
          /* ignore */
        }
      }
      const cfg = id ? await getAiConfig(id) : null;
      _paintGate(cfg);
      if (_termsPassed(cfg)) {
        _fillCitiesChecklist((cfg?.cities || []).map((c) => c.id), { force: true, selectedCities: cfg?.cities || [] });
      } else {
        updateAiStatus("Read the terms, check Agree, then Continue.");
      }
    });
  }
}

function _bindOutsideClose() {
  if (_bindOutsideClose._done) return;
  _bindOutsideClose._done = true;
  const closeIfOutside = (e) => {
    if (!_isPanelOpen()) return;
    const panel = document.querySelector(idSel(ID.aiPanel));
    const btn = document.querySelector(idSel(ID.aiBtn));
    const cal = document.querySelector(idSel(ID.aiCal));
    const t = _calEventTarget(e);
    // Calendar is portaled on body — treat it as inside Tik Tik UI.
    if (cal && !cal.classList.contains(CLS.hidden) && t && cal.contains(t)) return;
    if (cal && !cal.classList.contains(CLS.hidden)) {
      const fromBtn = document.querySelector(idSel(ID.aiFromBtn));
      const toBtn = document.querySelector(idSel(ID.aiToBtn));
      if (!(fromBtn && t && (fromBtn === t || fromBtn.contains(t))) &&
          !(toBtn && t && (toBtn === t || toBtn.contains(t)))) {
        _closeCal();
      }
    }
    if (panel && t && (panel === t || panel.contains(t))) return;
    if (btn && t && (btn === t || btn.contains(t))) return;
    _closeCal();
    _togglePanel(false);
  };
  // Only pointerdown — click also fired before and closed the cal mid-tap.
  vs.on(document, "pointerdown", closeIfOutside, { capture: true });
}

async function _onSetSubmit(wantOn) {
  const accountId = await getAccountId();
  if (!accountId) {
    updateAiStatus("Open a logged-in schedule page so we can bind this to your account.");
    return;
  }
  const prev = (await getAiConfig(accountId)) || {};
  let { from, to } = _readFormDates();
  from = from || prev.from || null;
  to = to || prev.to || null;

  if (wantOn) {
    // Always flip switch ON immediately (dates can be filled after).
    _submitFieldsOpen = true;
    _setSwitch(document.querySelector(idSel(ID.aiSubmitSw)), true);

    thawOps();
    clearPendingSubmit();
    resetAutoSubmitProbe();
    await _persistForm(accountId, {
      submitEnabled: true,
      from: from || null,
      to: to || null,
      confirmedAt: Date.now(),
    });

    const fromEl = document.querySelector(idSel(ID.aiFrom));
    const toEl = document.querySelector(idSel(ID.aiTo));
    if (fromEl && from) fromEl.value = from;
    if (toEl && to) toEl.value = to;
    _paintDateButtons();

    await refreshAiSubmitUi();
    _setSwitch(document.querySelector(idSel(ID.aiSubmitSw)), true);
    _submitFieldsOpen = true;
    _paintFeatureBodies(await getAiConfig(accountId));

    if (!from || !to) {
      updateAiStatus("Auto Submit ON — select From and To dates to start booking.");
      return;
    }
    if (from > to) {
      updateAiStatus("Auto Submit ON — From date must be before To date.");
      return;
    }
    _submitFieldsOpen = false;
    updateAiStatus(`Auto Submit ON (${_pretty(from)} – ${_pretty(to)})`);
    await probeAutoSubmitForCurrentCity();
    return;
  }

  _submitFieldsOpen = false;
  clearPendingSubmit();
  _setSwitch(document.querySelector(idSel(ID.aiSubmitSw)), false);
  await _persistForm(accountId, {
    submitEnabled: false,
    from: from || prev.from,
    to: to || prev.to,
  });
  await refreshAiSubmitUi();
  updateAiStatus("Auto Submit OFF");
}

async function _onSetCities(wantOn) {
  const accountId = await getAccountId();
  if (!accountId) {
    updateAiStatus("Open a logged-in schedule page so we can bind this to your account.");
    return;
  }
  const prev = (await getAiConfig(accountId)) || {};

  if (wantOn) {
    // Always flip switch ON immediately (cities can be picked after).
    _citiesFieldsOpen = true;
    _setSwitch(document.querySelector(idSel(ID.aiCitiesSw)), true);

    _fillCitiesChecklist((prev.cities || []).map((c) => c.id), { force: true, selectedCities: prev.cities || [] });
    _fillTimingEditor(prev);
    let cities = _readSelectedCities();
    if (!cities.length && prev.cities?.length) cities = prev.cities;
    const windows = _readTimingRowsFromDom();

    thawOps();
    await _persistForm(accountId, {
      citiesEnabled: true,
      cities: cities.length ? cities : (prev.cities || []),
      slotWindows: windows.length ? windows : (prev.slotWindows || null),
    });
    await refreshAiSubmitUi();
    _setSwitch(document.querySelector(idSel(ID.aiCitiesSw)), true);
    _citiesFieldsOpen = true;
    _paintFeatureBodies(await getAiConfig(accountId));
    if (!cities.length) {
      _fillCitiesChecklist([], { force: true });
    }

    if (!cities.length) {
      updateAiStatus("City Change ON — select at least one preferred city to start hopping.");
      return;
    }

    _citiesFieldsOpen = false;
    _bindPostSelectRotateWatch();
    await startCityRotate();
    updateAiStatus(`City Change ON (${cities.map((c) => c.name || c.id).join(", ")})`);
    return;
  }

  _citiesFieldsOpen = false;
  stopCityRotate();
  _setSwitch(document.querySelector(idSel(ID.aiCitiesSw)), false);
  const cities = _readSelectedCities();
  await _persistForm(accountId, {
    citiesEnabled: false,
    cities: cities.length ? cities : (prev.cities || []),
  });
  await refreshAiSubmitUi();
  updateAiStatus("City Change OFF");
}

/** When dates are filled while Auto Submit is ON, save them and start booking. */
async function _tryEnableSubmitAfterDates() {
  const accountId = await getAccountId();
  if (!accountId) return;
  const prev = (await getAiConfig(accountId)) || {};
  if (!isSubmitEnabled(prev) && !_submitFieldsOpen) return;
  const { from, to } = _readFormDates();
  if (!from || !to || from > to) return;
  await _persistForm(accountId, {
    submitEnabled: true,
    from,
    to,
    confirmedAt: Date.now(),
  });
  _submitFieldsOpen = false;
  await refreshAiSubmitUi();
  _setSwitch(document.querySelector(idSel(ID.aiSubmitSw)), true);
  thawOps();
  resetAutoSubmitProbe();
  updateAiStatus(`Auto Submit ON (${_pretty(from)} – ${_pretty(to)})`);
  await probeAutoSubmitForCurrentCity();
}

function _labelFromSaved(windows) {
  return (windows || [])
    .map((w) => `:${String(w.fromMin).padStart(2, "0")}–:${String(w.toMin).padStart(2, "0")}`)
    .join(", ");
}

async function _onAddTiming() {
  const list = document.querySelector(idSel(ID.aiWinList));
  if (!list) return;
  if (list.querySelectorAll(`.${CLS.aiWinRow}`).length >= MAX_CUSTOM_WINDOWS) {
    updateAiStatus(`Max ${MAX_CUSTOM_WINDOWS} timing windows.`);
    return;
  }
  list.appendChild(_paintTimingRow(0, Math.min(6, MAX_WINDOW_DURATION_MIN)));
  _updateTimingNote();
}

async function _onSaveTimings() {
  const accountId = await getAccountId();
  if (!accountId) {
    updateAiStatus("Open a logged-in schedule page so we can bind this to your account.");
    return;
  }
  const windows = _readTimingRowsFromDom();
  if (!windows.length) {
    updateAiStatus("Add at least one timing (or Reset to defaults).");
    return;
  }
  await _persistForm(accountId, { slotWindows: windows });
  await refreshAiSubmitUi();
  updateAiStatus(`Saved ${windows.length} custom timing(s): ${_labelFromSaved(windows)}`);
}

async function _onResetTimings() {
  const accountId = await getAccountId();
  if (!accountId) {
    updateAiStatus("Open a logged-in schedule page so we can bind this to your account.");
    return;
  }
  const ok = window.confirm("Reset to default IST windows? Your custom timings will be removed.");
  if (!ok) return;
  await _persistForm(accountId, { slotWindows: null });
  clearAccountSlotWindows();
  await refreshAiSubmitUi();
  updateAiStatus(`Using default windows: ${getSlotWindowLabel()}`);
}

async function _onSaveLogin() {
  const accountId = await getAccountId();
  if (!accountId) {
    updateAiStatus("Open a logged-in schedule page so we can bind this to your account.");
    return;
  }
  const { from, to } = _readFormDates();
  const cities = _readSelectedCities();
  const loginId = document.querySelector(idSel(ID.aiLogin))?.value?.trim();
  const loginPass = document.querySelector(idSel(ID.aiPass))?.value;
  const security = [0, 1, 2].map((i) => ({
    q: document.querySelector(idSel([ID.aiQ1, ID.aiQ2, ID.aiQ3][i]))?.value?.trim() || "",
    a: document.querySelector(idSel([ID.aiA1, ID.aiA2, ID.aiA3][i]))?.value?.trim() || "",
  }));
  if (!loginId || !loginPass) {
    updateAiStatus("Enter ID and password before saving.");
    return;
  }
  if (security.some((s) => !s.q || !s.a)) {
    updateAiStatus("Pick 1 question from each of the 3 sets and fill all 3 answers.");
    return;
  }
  await _persistForm(accountId, {});
  _paintLoginToggle(true, true);
  updateAiStatus("Saved ID, password, and 3 security questions (1 from each set).");
}

function _loginDetailsSaved(cfg) {
  const sec = cfg?.security || [];
  return !!(
    cfg?.loginId &&
    cfg?.loginPass &&
    sec.length >= 3 &&
    sec.every((s) => s?.q && s?.a)
  );
}

function _paintLoginToggle(open, saved) {
  const btn = document.querySelector(idSel(ID.aiLoginToggle));
  if (!btn) return;
  const arrow = open ? "▾" : "▸";
  btn.textContent = saved
    ? `Login details (saved) ${arrow}`
    : `Login details ${arrow}`;
}

function _onToggleLoginDetails() {
  const body = document.querySelector(idSel(ID.aiLoginBody));
  const btn = document.querySelector(idSel(ID.aiLoginToggle));
  if (!body || !btn) return;
  const open = body.classList.contains(CLS.hidden);
  body.classList.toggle(CLS.hidden, !open);
  const saved = /saved/i.test(btn.textContent || "");
  _paintLoginToggle(open, saved);
}

export function removeStaleTikTikUi() {
  for (const panel of [...document.querySelectorAll("div[id]")]) {
    if (panel.id === ID.aiPanel) continue;
    if (!panel.textContent?.includes("Tik Tik (this account only)")) continue;
    panel.remove();
  }
  for (const btn of [...document.querySelectorAll("button")]) {
    const label = (btn.textContent || "").trim();
    if (!label.startsWith("Tik Tik")) continue;
    if (btn.id === ID.aiBtn) continue;
    btn.remove();
  }
  for (const row of [...document.querySelectorAll("div[id]")]) {
    if (row.id === ID.selRow) continue;
    if (row.querySelector("#post_select")) continue;
    const buttons = [...row.querySelectorAll("button")];
    if (!buttons.length) continue;
    if (buttons.every((b) => /^(Tik Tik|Recheck)/.test((b.textContent || "").trim()))) {
      row.remove();
    }
  }
}

/** Remove Tik Tik button + panel (used on Consular where Tik Tik must not appear). */
export function removeTikTikUi() {
  document.querySelector(idSel(ID.aiPanel))?.remove();
  document.querySelector(idSel(ID.aiBtn))?.remove();
  removeStaleTikTikUi();
}

export function ensureAiSubmitUi() {
  if (isInterviewPage()) return;
  if (!isOfcSchedulePage()) {
    removeTikTikUi();
    return;
  }
  if (document.querySelector(idSel(ID.aiBtn))) {
    // Rebuild if an older Tik Tik panel is missing the new controls.
    if (!document.querySelector(idSel(ID.aiSubmitSw)) || !document.querySelector(idSel(ID.aiTermsContinue)) || !document.querySelector(idSel(ID.aiFromBtn))) {
      removeTikTikUi();
    } else {
      return;
    }
  }

  const row = ensureSelectorRow();
  if (!row) return;

  const btn = document.createElement("button");
  btn.id = ID.aiBtn;
  btn.type = "button";
  btn.textContent = "Tik Tik";
  btn.dataset[DAT.mark] = "";
  vs.on(btn, "click", (e) => {
    e.stopPropagation();
    const panel = document.querySelector(idSel(ID.aiPanel));
    const open = panel && panel.classList.contains(CLS.hidden);
    _togglePanel(!!open);
  });
  row.appendChild(btn);

  const panel = document.createElement("div");
  panel.id = ID.aiPanel;
  panel.className = CLS.hidden;
  panel.dataset[DAT.mark] = "";

  panel.innerHTML = `
    <div id="${ID.aiTermsGate}">
      <div id="${ID.aiTerms}" class="${CLS.aiTerms}">
        <div class="${CLS.aiHead}">Terms &amp; Conditions</div>
        <div class="${CLS.aiHint}">Please read carefully before continuing.</div>
        <ul class="${CLS.aiTermsList}">
          <li>Options apply to this applicant only. They do not bypass CAPTCHAs, waiting rooms, or portal security.</li>
          <li>During your windows, City Change hops every 13–18s. Max ${MAX_CUSTOM_WINDOWS} windows, each up to ${MAX_WINDOW_DURATION_MIN} minutes.</li>
          <li>Checking too fast may trigger <b>1015 Rate Limit</b> errors.</li>
        </ul>
        <label class="${CLS.aiTermsCb}">
          <input type="checkbox" id="${ID.aiTermsAgree}" />
          <span>I have read and agree to these terms.</span>
        </label>
        <button type="button" id="${ID.aiTermsContinue}" class="${CLS.aiContinue}" disabled>Continue</button>
      </div>
    </div>
    <div id="${ID.aiMain}" class="${CLS.hidden}">
      <div class="${CLS.aiSec}">
        <div class="${CLS.aiRow}" style="justify-content:space-between;margin-bottom:4px">
          <div>
            <div class="${CLS.aiHead}" style="font-size:17px">Auto Submit</div>
            <div class="${CLS.aiHint}" style="margin:2px 0 0">Book automatically when a date in your range appears.</div>
          </div>
          <button type="button" id="${ID.aiSubmitSw}" class="${CLS.aiSwitch}" role="switch" aria-checked="false" aria-label="Auto Submit">
            <span class="${CLS.aiKnob}"></span>
          </button>
        </div>
        <div id="${ID.aiSubmitBody}" class="${CLS.hidden}">
          <div class="${CLS.aiRow}" style="margin-top:10px">
            <label>From
              <button type="button" id="${ID.aiFromBtn}" class="${CLS.aiDateBtn}">Select date</button>
              <input type="hidden" id="${ID.aiFrom}" />
            </label>
            <label>To
              <button type="button" id="${ID.aiToBtn}" class="${CLS.aiDateBtn}">Select date</button>
              <input type="hidden" id="${ID.aiTo}" />
            </label>
          </div>
        </div>
      </div>
      <div class="${CLS.aiSec}">
        <div class="${CLS.aiRow}" style="justify-content:space-between;margin-bottom:4px">
          <div>
            <div class="${CLS.aiHead}" style="font-size:17px">City Change</div>
            <div class="${CLS.aiHint}" style="margin:2px 0 0">Rotate preferred cities during release windows.</div>
          </div>
          <button type="button" id="${ID.aiCitiesSw}" class="${CLS.aiSwitch}" role="switch" aria-checked="false" aria-label="City Change">
            <span class="${CLS.aiKnob}"></span>
          </button>
        </div>
        <div id="${ID.aiCitiesBody}" class="${CLS.hidden}">
          <div class="${CLS.aiHint}" style="margin:10px 0 4px;font-weight:600;color:#111827">
            Preferred cities
            <button type="button" id="${ID.aiCitiesAll}" class="${CLS.aiCityAct}">Select all</button>
            <button type="button" id="${ID.aiCitiesNone}" class="${CLS.aiCityAct}">Clear</button>
          </div>
          <div id="${ID.aiCities}" class="${CLS.aiCities}"></div>
          <div class="${CLS.aiHead}" style="font-size:16px;margin:14px 0 8px">Release Window Checks</div>
          <p id="${ID.aiWinNote}" class="${CLS.aiHint}"></p>
          <div id="${ID.aiWinList}"></div>
          <div class="${CLS.aiRow}" style="margin-top:8px">
            <button type="button" id="${ID.aiWinAdd}">+ Add timing</button>
            <button type="button" id="${ID.aiWinSave}">Save timings</button>
            <button type="button" id="${ID.aiWinReset}">Reset defaults</button>
          </div>
        </div>
      </div>
      <div class="${CLS.aiSec}">
        <div class="${CLS.aiRow}" style="margin:0">
          <button type="button" id="${ID.aiLoginToggle}">Login details ▸</button>
          <button type="button" id="${ID.aiClose}">Close</button>
        </div>
        <div id="${ID.aiLoginBody}" class="${CLS.hidden}" style="margin-top:8px">
          <div class="${CLS.aiHint}" style="margin:4px 0;font-weight:600;color:#111827">Login (auto-login on Home when logged out)</div>
          <div class="${CLS.aiRow}">
            <label>ID / email <input type="email" id="${ID.aiLogin}" autocomplete="off" /></label>
            <label>Password <input type="password" id="${ID.aiPass}" autocomplete="off" /></label>
          </div>
          <div class="${CLS.aiHint}" style="margin:0 0 6px">
            3 sets × 5 questions. Pick <b>1 question from each set</b>, then type <b>your answer</b> for that question.
          </div>
          <div class="${CLS.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 1 — choose 1 question
              <select id="${ID.aiQ1}">${_securityOptionsHtml(0)}</select>
            </label>
            <label>Your answer for set 1
              <input type="text" id="${ID.aiA1}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${CLS.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 2 — choose 1 question
              <select id="${ID.aiQ2}">${_securityOptionsHtml(1)}</select>
            </label>
            <label>Your answer for set 2
              <input type="text" id="${ID.aiA2}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${CLS.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 3 — choose 1 question
              <select id="${ID.aiQ3}">${_securityOptionsHtml(2)}</select>
            </label>
            <label>Your answer for set 3
              <input type="text" id="${ID.aiA3}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${CLS.aiRow}">
            <button type="button" id="${ID.aiSaveLogin}">Save login details</button>
          </div>
        </div>
      </div>
    </div>
    <div id="${ID.aiStatus}" class="${CLS.aiHint}" style="margin-top:10px"></div>
  `;

  row.insertAdjacentElement("afterend", panel);

  vs.on(panel.querySelector(idSel(ID.aiSubmitSw)), "click", async () => {
    const accountId = await getAccountId();
    const cfg = accountId ? await getAiConfig(accountId) : null;
    await _onSetSubmit(!isSubmitEnabled(cfg));
  });
  vs.on(panel.querySelector(idSel(ID.aiCitiesSw)), "click", async () => {
    const accountId = await getAccountId();
    const cfg = accountId ? await getAiConfig(accountId) : null;
    await _onSetCities(!isCitiesEnabled(cfg));
  });
  vs.on(panel.querySelector(idSel(ID.aiWinAdd)), "click", _onAddTiming);
  vs.on(panel.querySelector(idSel(ID.aiWinSave)), "click", _onSaveTimings);
  vs.on(panel.querySelector(idSel(ID.aiWinReset)), "click", _onResetTimings);
  vs.on(panel.querySelector(idSel(ID.aiSaveLogin)), "click", _onSaveLogin);
  vs.on(panel.querySelector(idSel(ID.aiLoginToggle)), "click", _onToggleLoginDetails);
  vs.on(panel.querySelector(idSel(ID.aiClose)), "click", () => _togglePanel(false));
  vs.on(panel.querySelector(idSel(ID.aiCitiesAll)), "click", () => _setAllCitiesChecked(true));
  vs.on(panel.querySelector(idSel(ID.aiCitiesNone)), "click", () => _setAllCitiesChecked(false));
  vs.on(panel.querySelector(idSel(ID.aiTermsAgree)), "change", () => { _onTermsAgreeToggle(); });
  vs.on(panel.querySelector(idSel(ID.aiTermsContinue)), "click", () => { _onTermsContinue(); });

  vs.on(panel.querySelector(idSel(ID.aiFromBtn)), "click", (e) => {
    e.stopPropagation();
    const cal = document.querySelector(idSel(ID.aiCal));
    if (cal && !cal.classList.contains(CLS.hidden) && _calView.which === "from") {
      _closeCal();
      return;
    }
    _openCal("from", e.currentTarget);
  });
  vs.on(panel.querySelector(idSel(ID.aiToBtn)), "click", (e) => {
    e.stopPropagation();
    const cal = document.querySelector(idSel(ID.aiCal));
    if (cal && !cal.classList.contains(CLS.hidden) && _calView.which === "to") {
      _closeCal();
      return;
    }
    _openCal("to", e.currentTarget);
  });

  _bindOutsideClose();
  refreshAiSubmitUi();
}

function _watchSiteSubmit() {
  const bind = (btn) => {
    if (!btn || btn.dataset.aiSubmitBound) return;
    btn.dataset.aiSubmitBound = "1";
    vs.on(btn, "click", () => {
      getAccountId().then((id) => {
        noteSubmitClicked(id || null);
      });
    });
  };
  bind(document.querySelector("#submitbtn"));
  vs.setInterval(() => bind(document.querySelector("#submitbtn")), 2000);
}

export async function reserveAiSubmit() {
  if (!vs.alive) return;
  if (isInterviewPage()) return;
  if (!isOfcSchedulePage()) {
    removeTikTikUi();
    return;
  }
  if (!await vs.waitFor("#post_select", { attempts: SCHEDULE_UI_WAIT_ATTEMPTS })) return;
  setSubmitErrorHandler((entry) => {
    const reason = String(entry?.message || entry?.source || "error").slice(0, 120);
    noteSubmitFailed(reason);
  });
  ensureAiSubmitUi();
  _bindPostSelectRotateWatch();
  _watchSiteSubmit();
  if (_aiSubmitMounted) return;
  _aiSubmitMounted = true;
  vs.setTimeout(() => refreshAiSubmitUi(), 800);
  vs.setTimeout(async () => {
    if (await getArmedAiConfig()) await probeAutoSubmitForCurrentCity();
  }, 1500);
}
