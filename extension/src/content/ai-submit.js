/**
 * Tik Tik — Auto Submit (OFC only) + City Change + payment unlock.
 * Consular /schedule: Tik Tik is not shown (isOfcSchedulePage gate).
 *
 * TEMP_SHOW_AUTO_SUBMIT / TEMP_SHOW_LOGIN_DETAILS in shared/config.js
 */

import {
  getPosts,
  getProfile,
  SCHEDULE_UI_WAIT_ATTEMPTS,
  TEMP_SHOW_AUTO_SUBMIT,
  TEMP_SHOW_LOGIN_DETAILS,
} from "../shared/config.js";
import { storageGet, storageSet } from "../shared/runtime.js";
import { vs } from "../shared/lifecycle.js";
import { CLS, DAT, ID, MSG, T, idSel } from "../shared/token.js";
import { ensureSelectorRow } from "./scheduling-controls.js";
import { armSubmitErrorWatch } from "./submit-errors.js";
import { isTimeSlotPicked } from "./time-select.js";
import {
  clearCityRotateBusy,
  unlockCityRotateAfterSchedule,
  ensureServerCityRotate,
  fetchAutoSubmitFromServer,
  isCityRotateBusy,
  holdCityRotateForBooking,
  releaseCityRotateHold,
  setCityRotateStatusSink,
  startServerCityRotate,
  stopServerCityRotate,
  syncAutoSubmitToServer,
  syncCitiesToServer,
} from "./city-rotate-server.js";
import { reportBookingEvent, reportBookedSlot } from "./booking-log.js";
import {
  clearPayPhone,
  fetchPaymentStatus,
  getCachedPayment,
  onPaymentChange,
  setPayPhone,
  startPaymentPolling,
  submitPaymentUtr,
} from "./payment-status.js";

export var AI_SUBMIT_KEY = "aiSubmitByAccount";

export var AI_DATE_SELECT_MS = 8000;
export var AI_BOOK_SELECT_MS = 3500;
export var AI_TIME_DOM_WAIT_MS = 0;
export var AI_BOOK_POLL_MS = 25;
/** Click Submit as soon as time slot is selected; keep retrying until CGI accepts. */
export var AI_BOOK_SUBMIT_WAIT_MS = 0;
/** Retry Submit click every 50ms (0.05s). */
export var AI_SUBMIT_CLICK_POLL_MS = 50;
export var AI_BOOK_SLOT_INDEX = 0; // unused default; live picks use preferredSlotIndex
/** Overall window to land Submit after Auto Submit arms. */
export var AI_SUBMIT_ARM_MS = 15_000;

/** Server-driven try limits + pick rules (defaults until hydrate). */
var _maxDateTries = 3;
var _maxSlotTries = 4;
var _skipHighestSlot = true;
var _slotStartRank = 2;
var _haltCityWhileBooking = true;
var _datePref = { 1: 0, 2: 1, 3: 2, n: 2 };

export function getAutoSubmitLimits() {
  return {
    maxDateTries: _maxDateTries,
    maxSlotTries: _maxSlotTries,
    skipHighestSlot: _skipHighestSlot,
    slotStartRank: _slotStartRank,
    haltCityWhileBooking: _haltCityWhileBooking,
  };
}

function _applyServerLimits(remote) {
  if (!remote) return;
  if (remote.maxDateTries) _maxDateTries = remote.maxDateTries;
  if (remote.maxSlotTries) _maxSlotTries = remote.maxSlotTries;
  if (typeof remote.skipHighestSlot === "boolean") _skipHighestSlot = remote.skipHighestSlot;
  if (remote.slotStartRank) _slotStartRank = remote.slotStartRank;
  if (typeof remote.haltCityWhileBooking === "boolean") {
    _haltCityWhileBooking = remote.haltCityWhileBooking;
  }
  _datePref = {
    1: remote.datePref1 ?? _datePref[1],
    2: remote.datePref2 ?? _datePref[2],
    3: remote.datePref3 ?? _datePref[3],
    n: remote.datePrefMany ?? _datePref.n,
  };
}

/** Merge server Auto Submit prefs into local chrome.storage. */
export async function applyServerAutoSubmitPrefs(remote, accountId) {
  if (!remote || !accountId) return null;
  _applyServerLimits(remote);
  const prev = (await getAiConfig(accountId)) || {};
  const next = {
    ...prev,
    submitEnabled: !!remote.enabled,
    enabled: !!remote.enabled,
    from: remote.from || prev.from || null,
    to: remote.to || prev.to || null,
    serverSyncedAt: Date.now(),
  };
  await setAiConfig(accountId, next);
  return next;
}

/** Load Auto Submit prefs from server into local storage + UI. */
export async function hydrateAutoSubmitFromServer() {
  if (!TEMP_SHOW_AUTO_SUBMIT) return null;
  const accountId = await getAccountId();
  if (!accountId) return null;
  const remote = await fetchAutoSubmitFromServer();
  if (!remote || !remote.success) return null;
  const next = await applyServerAutoSubmitPrefs(remote, accountId);
  await refreshAiSubmitUi();
  return next;
}

/** Date pick index from server rules (0-based). */
export function pickPreferredDateIndex(count) {
  const n = Math.max(0, Number(count) || 0);
  if (n <= 0) return -1;
  let want;
  if (n === 1) want = _datePref[1];
  else if (n === 2) want = _datePref[2];
  else if (n === 3) want = _datePref[3];
  else want = _datePref.n;
  want = Math.max(0, Number(want) || 0);
  return Math.min(want, n - 1);
}

/** City Change gap / windows are owned by the server — not hard-coded here. */
export function isSchedulePage() {
  return /\/(schedule|ofc-schedule|c-schedule)\/?$/i.test(location.pathname) ||
    /\/(schedule|ofc-schedule|c-schedule)\b/i.test(location.pathname);
}

/** OFC appointment page only (not Consular /schedule). */
export function isOfcSchedulePage() {
  if (/\/ofc-schedule\b/i.test(location.pathname)) return true;
  // Never treat Consular as OFC even if the path is unusual.
  if (isConsularSchedulePage()) return false;
  return false;
}

/** Consular appointment page — Tik Tik must not appear here. */
export function isConsularSchedulePage() {
  if (/\/ofc-schedule\b/i.test(location.pathname)) return false;
  if (/\/(c-schedule)\b/i.test(location.pathname)) return true;
  if (/\/schedule\b/i.test(location.pathname)) return true;
  // DOM fallback: label "Consular Post" / "Consular Posts" near the city dropdown.
  const form = document.querySelector("#page_form") || document.body;
  const sniff = ((form && form.innerText) || "").replace(/\s+/g, " ").slice(0, 2500);
  if (/consular\s*posts?/i.test(sniff) && !/\bofc\s*post\b/i.test(sniff.slice(0, 800))) {
    return true;
  }
  return false;
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

/** Auto-submit on (supports legacy `enabled`). */
export function isSubmitEnabled(cfg) {
  if (!TEMP_SHOW_AUTO_SUBMIT) return false;
  if (!cfg) return false;
  if (typeof cfg.submitEnabled === "boolean") return cfg.submitEnabled;
  return !!cfg.enabled;
}

/** Preferred-city rotation on. */
export function isCitiesEnabled(cfg) {
  return !!(cfg && cfg.citiesEnabled && cfg.cities?.length);
}

export async function getAccountId() {
  const profile = await getProfile();
  // Username === applicant id (any text / number / combined)
  if (profile?.username) return String(profile.username).trim();
  if (profile?.id) return String(profile.id).trim();
  if (profile?.name) return String(profile.name).trim();
  return null;
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

/** After Submit, freeze Tik Tik ops (no city rotate / auto-select / submit). */
var _opsFrozen = false;
var _submitArmed = false;
var _submitTimer = null;
var _lastProbeAt = 0;

export function isOpsFrozen() {
  return _opsFrozen;
}

export function clearPendingSubmit() {
  if (_submitTimer) {
    vs.clear(_submitTimer);
    _submitTimer = null;
  }
  _submitArmed = false;
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

/** Turn off auto-submit AND city change after Submit — no further operations. */
export async function disarmAiSubmit(accountId) {
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
  void syncAutoSubmitToServer({
    enabled: false,
    from: cfg.from || null,
    to: cfg.to || null,
  });
  refreshAiSubmitUi();
}

export function dateInRange(dateStr, from, to) {
  const d = String(dateStr || "").slice(0, 10);
  if (!d || d.length < 10) return false;
  if (from && d < from) return false;
  if (to && d > to) return false;
  return true;
}

/** Armed for auto-submit (OFC + date range). Never on Consular. */
export async function getArmedAiConfig() {
  if (!TEMP_SHOW_AUTO_SUBMIT) return null;
  if (_opsFrozen) return null;
  if (isInterviewPage() || !isOfcSchedulePage()) return null;
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
  if (!isCitiesEnabled(cfg)) return null;
  return { ...cfg, accountId: id };
}

export function filterDaysInAiRange(scheduleDays, from, to) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (scheduleDays || [])
    .filter((d) => d && typeof d.Date === "string" && d.Date.length >= 10)
    .filter((d) => dateInRange(d.Date, from, to))
    .filter((d) => {
      const [y, m, day] = d.Date.slice(0, 10).split("-").map(Number);
      return new Date(y, m - 1, day) >= today;
    })
    .sort((a, b) => String(a.Date).localeCompare(String(b.Date)));
}

var _postSelectRotateBound = false;
var _citiesOptionsKey = "";
var _aiSubmitMounted = false;

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
  void _onCitiesSelectionChanged();
}

/**
 * If City Change is ON and the user changes preferred cities, turn it OFF
 * so they must enable again with the new list.
 */
async function _onCitiesSelectionChanged() {
  const accountId = await getAccountId();
  if (!accountId) return;
  const prev = (await getAiConfig(accountId)) || {};
  const cities = _readSelectedCities();
  const wasOn = isCitiesEnabled(prev);

  if (wasOn) {
    stopCityRotate();
    await _persistForm(accountId, {
      citiesEnabled: false,
      cities,
    });
    await syncCitiesToServer(cities, false);
    await refreshAiSubmitUi();
    updateAiStatus("City Change turned OFF — turn it ON again after selecting cities.");
    return;
  }

  // Keep saved city list in sync even while OFF.
  await _persistForm(accountId, {
    citiesEnabled: false,
    cities,
  });
}

var _outsideCloseBound = false;
function _bindOutsideClose() {
  if (_outsideCloseBound) return;
  _outsideCloseBound = true;
  vs.on(
    document,
    "pointerdown",
    (e) => {
      const panel = document.querySelector(idSel(ID.aiPanel));
      const btn = document.querySelector(idSel(ID.aiBtn));
      if (!panel || panel.classList.contains(CLS.hidden)) return;
      const t = e.target;
      if (!(t instanceof Node)) return;
      if (panel.contains(t)) return;
      if (btn && btn.contains(t)) return;
      _togglePanel(false);
    },
    { capture: true }
  );
}

export function stopCityRotate() {
  stopServerCityRotate();
}

/** Pause city hopping while Auto Submit books (City Change stays ON). */
export function haltCityRotateForBooking() {
  if (!_haltCityWhileBooking) return;
  void holdCityRotateForBooking();
}

/** Resume city hopping after Auto Submit cannot book on this city. */
export function resumeCityRotateAfterBooking() {
  releaseCityRotateHold();
}

export function pauseCityRotateForWait(seconds) {
  // Cloudflare / retry wait — do not treat as dates-loaded (keeps Loading busy intact).
  void seconds;
}

/** After schedule-days (dates / no slots) or busy timeout — unlock + 13–18s gap. */
export function noteCityRotateResponse(info = {}) {
  const hasError = !!info.hasError;
  const days = info.days;
  const noDays =
    info.noDays === true ||
    (Array.isArray(days) && days.length === 0) ||
    hasError;
  unlockCityRotateAfterSchedule(noDays ? "no_slots" : "loaded");
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

function _readFormDates() {
  return {
    from: document.querySelector(idSel(ID.aiFrom))?.value || null,
    to: document.querySelector(idSel(ID.aiTo))?.value || null,
  };
}

function _postOptions() {
  const select = document.querySelector("#post_select");
  if (!select) return [];
  return [...select.options]
    .filter((o) => o.value)
    .map((o) => ({ id: String(o.value), name: (o.textContent || "").trim() }));
}

function _readSelectedCities() {
  const box = document.querySelector(idSel(ID.aiCities));
  if (!box) return [];
  return [...box.querySelectorAll('input[type="checkbox"]:checked')].map((cb) => ({
    id: String(cb.value),
    name: cb.dataset.name || cb.value,
  }));
}

function _fillCitiesChecklist(selectedIds = [], { force = false } = {}) {
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

  const want = new Set(
    panelOpen && currentChecked.length && !force && !selectedIds.length
      ? currentChecked
      : (selectedIds.length ? selectedIds : currentChecked).map(String)
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
  const cities = _readSelectedCities();
  const { from, to } = _readFormDates();
  const next = {
    ...prev,
    cities: cities.length ? cities : (prev.cities || []),
    from: from || prev.from || null,
    to: to || prev.to || null,
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
  if (typeof next.submitEnabled === "boolean") next.enabled = next.submitEnabled;
  await setAiConfig(accountId, next);
  return next;
}

function _bindPostSelectRotateWatch() {
  if (_postSelectRotateBound) return;
  const select = document.querySelector("#post_select");
  if (!select) return;
  _postSelectRotateBound = true;
}

export async function startCityRotate() {
  if (_opsFrozen) return;
  if (isInterviewPage() || !isOfcSchedulePage()) return;

  const pay = await fetchPaymentStatus();
  if (!pay.paid) {
    stopServerCityRotate();
    return;
  }

  const cfg = await getCitiesRotateConfig();
  if (!cfg?.cities?.length) return;

  setCityRotateStatusSink(() => {});
  const synced = await syncCitiesToServer(cfg.cities, true);
  if (!synced) {
    /* keep quiet — rotation will keep retrying */
  }
  await startServerCityRotate();
}

/** Restart rotation if City Change is ON but the timer was lost (e.g. slow page load). */
export async function ensureCityRotateRunning() {
  if (_opsFrozen || isInterviewPage() || !isOfcSchedulePage() || !vs.alive) return;
  const cfg = await getCitiesRotateConfig();
  if (!cfg?.cities?.length) return;
  if (!document.querySelector("#post_select")) return;
  setCityRotateStatusSink(() => {});
  await ensureServerCityRotate();
}

export function notifyExtensionDead() {
  updateAiStatus("Extension reloaded — refresh this visa page, then turn Auto Submit / City Change ON again.");
}

function _findSubmitButton() {
  return document.querySelector("#submitbtn")
    || document.querySelector('button#submitbtn')
    || document.querySelector('input#submitbtn')
    || [...document.querySelectorAll("button, input[type=submit]")].find((b) =>
      /submit/i.test(b.textContent || b.value || "")
    );
}

/** Content-script + MAIN-world Submit click (retries until enabled). */
export function clickSubmitDual() {
  const btn = _findSubmitButton();
  if (btn && !btn.disabled) {
    try {
      btn.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window }));
      btn.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, cancelable: true, view: window }));
      btn.click();
    } catch {}
  }
  vs.send({
    action: "forceClickSubmit",
    prefix: T,
    pollMs: AI_SUBMIT_CLICK_POLL_MS,
    maxMs: AI_SUBMIT_ARM_MS,
  });
}

function _isBookingReadyToSubmit() {
  if (!isTimeSlotPicked()) return false;
  const submit = _findSubmitButton();
  return !!(submit && !submit.disabled);
}

export async function armAiFastSubmit(accountId) {
  if (_opsFrozen) return;
  if (isInterviewPage() || !isOfcSchedulePage()) return;
  if (_submitArmed) return;
  const cfg = await getAiConfig(accountId);
  if (!isSubmitEnabled(cfg)) return;

  haltCityRotateForBooking();
  _submitArmed = true;
  armSubmitErrorWatch();
  reportBookingEvent({
    kind: "submit",
    stage: "start",
    level: "info",
    message: "Auto Submit armed — will click Submit when slot is ready",
  });

  const started = Date.now();
  let done = false;
  let timePickedAt = isTimeSlotPicked() ? Date.now() : 0;

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
      await disarmAiSubmit(accountId);
      updateAiStatus("Submit clicked — all Tik Tik operations stopped.");
      reportBookingEvent({
        kind: "submit",
        stage: "success",
        level: "info",
        message: "Submit clicked — booking request sent",
        detail: { skipBooked: true },
      });
      reportBookedSlot({
        source: "auto_submit",
        message: "Auto Submit booked slot",
      });
      return;
    }
    updateAiStatus("Auto Submit — Submit not clicked in time; still watching…");
    reportBookingEvent({
      kind: "submit",
      stage: "timeout",
      level: "warn",
      message: "Submit not clicked within arm window",
    });
  };

  const onSubmitMsg = (event) => {
    if (!vs.alive || event.source !== window) return;
    if (event.data?.action !== MSG.sub) return;
    finish(true);
  };
  window.addEventListener("message", onSubmitMsg);

  const tryFinish = async () => {
    if (done || !_submitArmed || !vs.alive) return;

    const now = Date.now();
    const elapsed = now - started;

    if (isTimeSlotPicked() && !timePickedAt) {
      timePickedAt = now;
      updateAiStatus("Time slot selected — clicking Submit now…");
      clickSubmitDual();
    }

    if (timePickedAt && now - timePickedAt >= AI_BOOK_SUBMIT_WAIT_MS) {
      // Immediate + keep retrying until CGI enables Submit or arm window ends.
      clickSubmitDual();
      if (_isBookingReadyToSubmit()) {
        updateAiStatus("Clicking Submit…");
      } else {
        updateAiStatus("Submit retry…");
      }
    }

    if (elapsed >= AI_SUBMIT_ARM_MS) {
      return finish(false);
    }

    _submitTimer = vs.setTimeout(tryFinish, AI_SUBMIT_CLICK_POLL_MS);
  };

  tryFinish();
}

/** Call after watcher or manual slot pick when Auto Submit is ON. */
export async function triggerAutoSubmitIfArmed() {
  if (!isTimeSlotPicked() || _submitArmed || _opsFrozen) return;
  const ai = await getArmedAiConfig();
  if (!ai) return;
  await armAiFastSubmit(ai.accountId);
}

function updateAiStatus(text) {
  const el = document.querySelector(idSel(ID.aiStatus));
  if (el) el.textContent = text;
}

export function setTikTikStatus(text) {
  updateAiStatus(text);
}

function _paintToggleButtons(cfg) {
  const submitBtn = document.querySelector(idSel(ID.aiSubmitBtn));
  const citiesBtn = document.querySelector(idSel(ID.aiCitiesBtn));
  const pay = getCachedPayment();
  const unlocked = !!(pay.paid || pay.markedPaid);
  const submitOn = unlocked && isSubmitEnabled(cfg);
  const citiesOn = unlocked && isCitiesEnabled(cfg);

  if (submitBtn) {
    submitBtn.disabled = !unlocked;
    submitBtn.classList.toggle(CLS.aiOnBtn, submitOn);
    submitBtn.textContent = submitOn ? "Auto Submit: ON" : "Auto Submit: OFF";
  }
  if (citiesBtn) {
    citiesBtn.disabled = !unlocked;
    citiesBtn.classList.toggle(CLS.aiOnBtn, citiesOn);
    citiesBtn.textContent = citiesOn ? "City Change: ON" : "City Change: OFF";
  }
}

var _payUiMode = "";
var _payDraftPhone = "";
var _payUiSig = "";
var _paySubmitInFlight = false;
var _deviceBindNudge = false;

function _payDisplaySig(pay) {
  return [
    pay.needPhone ? 1 : 0,
    pay.phone || "",
    pay.pending ? 1 : 0,
    pay.pendingUtr || "",
    pay.amount || "",
    pay.listAmount || "",
    pay.offerLabel || "",
    pay.offerActive ? 1 : 0,
    pay.upiId || "",
    pay.qrUrl || "",
    pay.instructions || "",
  ].join("|");
}

function _capturePayPhoneDraft(box) {
  const el = box?.querySelector?.(idSel(ID.aiPayPhone));
  if (el && typeof el.value === "string") {
    _payDraftPhone = el.value;
  }
  return _payDraftPhone;
}

function _paintPaymentLock({ force = false } = {}) {
  const box = document.querySelector(idSel(ID.aiPayBox));
  const controls = document.querySelector(idSel(ID.aiControls));
  if (!box) return;
  const pay = getCachedPayment();
  // Treat admin-marked paid as unlocked for Tik Tik UI (device may still be binding).
  if (pay.paid || pay.markedPaid) {
    _payUiMode = "paid";
    _payUiSig = "";
    _payDraftPhone = "";
    box.classList.add(CLS.hidden);
    box.innerHTML = "";
    if (controls) controls.classList.remove(CLS.hidden);
    if (pay.markedPaid && !pay.paid) {
      updateAiStatus(pay.message || "Payment received — finishing device unlock…");
      if (!_deviceBindNudge) {
        _deviceBindNudge = true;
        void fetchPaymentStatus({ force: true })
          .then(() => _applyPaymentGate())
          .finally(() => {
            _deviceBindNudge = false;
          });
      }
    }
    return;
  }
  if (controls) controls.classList.add(CLS.hidden);
  box.classList.remove(CLS.hidden);

  // Step 1: phone required before any offer / QR is shown.
  if (pay.needPhone || !pay.phone) {
    _capturePayPhoneDraft(box);
    // Polling / status refresh was wiping the input while typing — keep existing form.
    if (!force && _payUiMode === "phone" && box.querySelector(idSel(ID.aiPayPhone))) {
      return;
    }
    _payUiMode = "phone";
    _payUiSig = _payDisplaySig(pay);
    const draft = (_payDraftPhone || "").replace(/"/g, "&quot;");
    box.innerHTML = `
      <div style="font-weight:700;color:#9a3412;margin-bottom:6px">Enter phone number</div>
      <div style="font-size:12px;line-height:1.4;margin-bottom:10px">
        Enter your phone number to see the offer for that number.
      </div>
      <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px">Phone number</label>
      <input type="tel" id="${ID.aiPayPhone}" inputmode="numeric" autocomplete="tel" placeholder="10-digit mobile" value="${draft}" style="width:100%;box-sizing:border-box;padding:8px;border:1px solid #fdba74;border-radius:6px" />
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
        <button type="button" id="${ID.aiPayPhoneGo}">Show my offer</button>
      </div>
    `;
    const goBtn = box.querySelector(idSel(ID.aiPayPhoneGo));
    const phoneInput = box.querySelector(idSel(ID.aiPayPhone));
    if (phoneInput) {
      vs.on(phoneInput, "input", () => {
        _payDraftPhone = phoneInput.value || "";
      });
      // Restore caret at end if we had to rebuild with a draft.
      if (_payDraftPhone) {
        try {
          const n = phoneInput.value.length;
          phoneInput.setSelectionRange(n, n);
        } catch {
          /* ignore */
        }
      }
    }
    if (goBtn) {
      vs.on(goBtn, "click", async () => {
        const raw = (phoneInput?.value || _payDraftPhone || "").trim();
        const digits = raw.replace(/\D/g, "");
        if (digits.length < 8) {
          updateAiStatus("Enter a valid phone number.");
          return;
        }
        goBtn.disabled = true;
        goBtn.textContent = "Loading…";
        try {
          _payDraftPhone = raw;
          await setPayPhone(raw);
          _payUiMode = "";
          _payUiSig = "";
          await fetchPaymentStatus({ force: true });
          await _applyPaymentGate();
        } catch (e) {
          updateAiStatus(e?.message || "Could not load offer.");
        } finally {
          goBtn.disabled = false;
          goBtn.textContent = "Show my offer";
        }
      });
    }
    return;
  }

  const nextMode = pay.pending ? "pending" : "pay";
  const sig = _payDisplaySig(pay);
  const utrEl = box.querySelector(idSel(ID.aiPayUtr));
  const utrFocused = !!(utrEl && document.activeElement === utrEl);
  // While UTR submit is in flight, do not rebuild the form (keeps "Submitting…"
  // from being wiped / stuck by payment polls).
  if (_paySubmitInFlight && _payUiMode === "pay") {
    return;
  }
  // Keep UTR typing intact, but always refresh when QR/UPI/amount changes.
  if (!force && _payUiMode === nextMode && sig === _payUiSig && utrFocused) {
    return;
  }
  if (!force && _payUiMode === nextMode && sig === _payUiSig && nextMode === "pending") {
    return;
  }
  // Preserve UTR draft across rebuild when amount/QR updates.
  const utrDraft = utrEl && typeof utrEl.value === "string" ? utrEl.value : "";
  _payUiMode = nextMode;
  _payUiSig = sig;

  const payNum = Number(pay.amount);
  const listNum = Number(pay.listAmount);
  const hasDeal = Number.isFinite(listNum) && Number.isFinite(payNum) && listNum > payNum && payNum > 0;
  const amt = pay.amount && pay.amount !== "0.00" ? `₹${pay.amount}` : "—";
  const listAmt = hasDeal
    ? `<span style="text-decoration:line-through;color:#78716c;opacity:.85;margin-right:8px;font-size:15px;font-weight:600">₹${pay.listAmount}</span>`
    : "";
  const saveAmt = hasDeal ? (listNum - payNum).toFixed(listNum % 1 || payNum % 1 ? 2 : 0) : "";
  const offer = (hasDeal || pay.offerActive)
    ? `<div style="color:#b45309;font-weight:700;margin:4px 0 8px">${pay.offerLabel || "Special offer"}${saveAmt ? ` · Save ₹${saveAmt}` : ""}</div>`
    : "";
  const priceLine = hasDeal
    ? `<div style="margin-bottom:8px;font-size:16px;line-height:1.4">
         ${listAmt}<b style="color:#15803d;font-size:20px">${amt}</b>
         <span style="display:inline-block;margin-left:8px;background:#dcfce7;color:#166534;font-size:11px;font-weight:700;padding:2px 6px;border-radius:4px">OFFER</span>
       </div>`
    : `<div style="margin-bottom:6px;font-size:15px">Pay <b>${amt}</b></div>`;
  const qr = pay.qrUrl
    ? `<img src="${pay.qrUrl.replace(/"/g, "")}" alt="UPI QR" style="width:148px;height:148px;object-fit:contain;background:#fff;border-radius:8px;border:1px solid #fed7aa;display:block;margin:8px auto" />`
    : `<div style="font-size:12px;color:#9a3412;text-align:center;margin:8px 0">QR not configured yet — use UPI ID</div>`;
  const upi = pay.upiId
    ? `<div style="text-align:center;margin:6px 0 10px">
         UPI: <b id="${ID.aiPayCopy}" style="user-select:all">${pay.upiId}</b>
         <button type="button" data-copy-upi="1" style="margin-left:6px">Copy</button>
       </div>`
    : "";
  const phoneLine = `
    <div style="font-size:12px;margin-bottom:8px">
      Phone: <b>${pay.phone}</b>
      <button type="button" id="${ID.aiPayPhoneChange}" style="margin-left:6px">Change</button>
    </div>`;

  if (pay.pending) {
    box.innerHTML = `
      <div style="font-weight:700;color:#065f46;margin-bottom:8px;font-size:15px">Waiting request</div>
      ${phoneLine}
      <div style="background:#ecfdf5;border:1px solid #6ee7b7;padding:12px;border-radius:10px;line-height:1.5;margin-bottom:10px">
        <div style="font-weight:700;margin-bottom:6px">Please wait until payment is approved</div>
        Your UTR <b>${pay.pendingUtr || "—"}</b> was submitted.
        Tik Tik unlocks automatically after an admin accepts this deposit request.
        You can leave this open — status refreshes every few seconds.
      </div>
      <div style="font-size:13px;margin-bottom:8px">Amount: ${hasDeal ? listAmt : ""}<b>${amt}</b></div>
      <button type="button" id="${ID.aiPayRefresh}">Check approval status</button>
    `;
    const changeBtn = box.querySelector(idSel(ID.aiPayPhoneChange));
    if (changeBtn) {
      vs.on(changeBtn, "click", async () => {
        _payDraftPhone = "";
        _payUiMode = "";
        await clearPayPhone();
        await fetchPaymentStatus({ force: true });
        await _applyPaymentGate();
      });
    }
    const refreshBtn = box.querySelector(idSel(ID.aiPayRefresh));
    if (refreshBtn) {
      vs.on(refreshBtn, "click", async () => {
        refreshBtn.disabled = true;
        refreshBtn.textContent = "Checking…";
        await fetchPaymentStatus({ force: true });
        _payUiMode = "";
        await _applyPaymentGate();
        refreshBtn.disabled = false;
        refreshBtn.textContent = "Check approval status";
      });
    }
    return;
  }

  box.innerHTML = `
    <div style="font-weight:700;color:#9a3412;margin-bottom:4px">Complete payment to unlock Tik Tik</div>
    ${phoneLine}
    ${offer}
    ${priceLine}
    <div style="font-size:12px;line-height:1.4;margin-bottom:6px">${pay.instructions || "Scan QR or pay UPI, then enter UTR below."}</div>
    ${qr}
    ${upi}
    <div style="margin-top:10px;padding-top:10px;border-top:1px solid #fed7aa">
      <div style="font-weight:700;font-size:13px;margin-bottom:6px;color:#9a3412">Enter UTR</div>
      <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px">UTR number</label>
      <input type="text" id="${ID.aiPayUtr}" placeholder="Enter UTR after payment" value="${(utrDraft || "").replace(/"/g, "&quot;")}" style="width:100%;box-sizing:border-box;padding:8px;border:1px solid #fdba74;border-radius:6px" />
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
      <button type="button" id="${ID.aiPaySubmit}">Submit payment</button>
      <button type="button" id="${ID.aiPayRefresh}">Check status</button>
    </div>
    <div style="font-size:11px;color:#78716c;margin-top:8px;line-height:1.35">
      After submit you will see a waiting request until payment is approved.
    </div>
  `;

  const changeBtn = box.querySelector(idSel(ID.aiPayPhoneChange));
  if (changeBtn) {
    vs.on(changeBtn, "click", async () => {
      _payDraftPhone = "";
      _payUiMode = "";
      await clearPayPhone();
      await fetchPaymentStatus({ force: true });
      await _applyPaymentGate();
    });
  }

  const copyBtn = box.querySelector("[data-copy-upi]");
  if (copyBtn && pay.upiId) {
    vs.on(copyBtn, "click", async () => {
      try {
        await navigator.clipboard.writeText(pay.upiId);
        copyBtn.textContent = "Copied";
      } catch {
        copyBtn.textContent = "Select & copy";
      }
    });
  }

  const submitBtn = box.querySelector(idSel(ID.aiPaySubmit));
  if (submitBtn) {
    vs.on(submitBtn, "click", async () => {
      if (_paySubmitInFlight) return;
      const input = box.querySelector(idSel(ID.aiPayUtr));
      const utr = (input?.value || "").trim();
      if (utr.length < 6) {
        updateAiStatus("Enter a valid UTR (at least 6 characters).");
        return;
      }
      _paySubmitInFlight = true;
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting…";
      updateAiStatus("Submitting UTR…");
      try {
        await submitPaymentUtr(utr);
        _payUiMode = "";
        _payUiSig = "";
        updateAiStatus("Waiting request — please wait until payment is approved.");
        // Paint pending UI immediately — do not wait on city sync.
        _paintPaymentLock({ force: true });
        await refreshAiSubmitUi();
      } catch (e) {
        const msg = e?.name === "TimeoutError" || e?.name === "AbortError"
          ? "Submit timed out — check connection and try again."
          : (e?.message || "Payment submit failed.");
        updateAiStatus(msg);
        _payUiMode = "";
        _payUiSig = "";
        _paintPaymentLock({ force: true });
      } finally {
        _paySubmitInFlight = false;
        const btn = document.querySelector(idSel(ID.aiPaySubmit));
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Submit payment";
        }
      }
    });
  }

  const refreshBtn = box.querySelector(idSel(ID.aiPayRefresh));
  if (refreshBtn) {
    vs.on(refreshBtn, "click", async () => {
      refreshBtn.disabled = true;
      refreshBtn.textContent = "Checking…";
      await fetchPaymentStatus({ force: true });
      _payUiMode = "";
      await _applyPaymentGate();
      refreshBtn.disabled = false;
      refreshBtn.textContent = "Check status";
    });
  }
}

async function _applyPaymentGate() {
  const pay = getCachedPayment();
  _paintPaymentLock({ force: !!pay.pending });
  const accountId = await getAccountId();
  const cfg = accountId ? await getAiConfig(accountId) : null;
  if (!pay.paid) {
    stopCityRotate();
    // Never block Tik Tik / UTR UI on city-prefs sync.
    if (accountId && cfg && isCitiesEnabled(cfg)) {
      void (async () => {
        try {
          await _persistForm(accountId, {
            citiesEnabled: false,
            submitEnabled: false,
          });
          await syncCitiesToServer(cfg.cities || [], false);
        } catch {
          /* ignore */
        }
      })();
    }
  }
  await refreshAiSubmitUi();
}

function _paintStatus(cfg, accountId) {
  const status = document.querySelector(idSel(ID.aiStatus));
  const btn = document.querySelector(idSel(ID.aiBtn));
  if (!status || !btn) return;

  const pay = getCachedPayment();
  const unlocked = !!(pay.paid || pay.markedPaid);
  _paintToggleButtons(cfg);
  _paintPaymentLock();

  const submitOn = unlocked && isSubmitEnabled(cfg);
  const citiesOn = unlocked && isCitiesEnabled(cfg);

  if (!unlocked) {
    btn.classList.remove(CLS.aiOn);
    btn.textContent = "Tik Tik · Pay";
  } else if (submitOn || citiesOn) {
    btn.classList.add(CLS.aiOn);
    btn.textContent = "Tik Tik ON";
  } else {
    btn.classList.remove(CLS.aiOn);
    btn.textContent = "Tik Tik";
  }

  if (!unlocked) {
    if (pay.needPhone || !pay.phone) {
      status.textContent = "Enter phone number to see your offer.";
    } else if (pay.pending) {
      status.textContent = "Waiting for payment approval…";
    } else {
      status.textContent = "";
    }
    return;
  }

  const parts = [];
  if (TEMP_SHOW_AUTO_SUBMIT) {
    if (submitOn && cfg?.from && cfg?.to) {
      parts.push(`Auto Submit ON (${_pretty(cfg.from)} – ${_pretty(cfg.to)})`);
    } else {
      parts.push("Auto Submit OFF");
    }
  }
  parts.push(citiesOn ? "City Change ON" : "City Change OFF");
  status.textContent = parts.join(" · ");
}

export async function refreshAiSubmitUi() {
  const accountId = await getAccountId();
  const cfg = accountId ? await getAiConfig(accountId) : null;
  _paintStatus(cfg, accountId);
  const from = document.querySelector(idSel(ID.aiFrom));
  const to = document.querySelector(idSel(ID.aiTo));
  if (from && cfg?.from) from.value = cfg.from;
  if (to && cfg?.to) to.value = cfg.to;
  const savedIds = (cfg?.cities || []).map((c) => c.id);
  const panel = document.querySelector(idSel(ID.aiPanel));
  const panelOpen = panel && !panel.classList.contains(CLS.hidden);
  const current = _readCheckedCityIds();
  _fillCitiesChecklist(panelOpen && current.length ? current : savedIds);
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
}

function _togglePanel(show) {
  const panel = document.querySelector(idSel(ID.aiPanel));
  if (!panel) return;
  panel.classList.toggle(CLS.hidden, !show);
  if (show) {
    getAccountId().then(async (id) => {
      const cfg = id ? await getAiConfig(id) : null;
      _fillCitiesChecklist((cfg?.cities || []).map((c) => c.id), { force: true });
    });
  }
}

async function _onToggleSubmit() {
  if (!TEMP_SHOW_AUTO_SUBMIT) {
    updateAiStatus("Auto Submit is temporarily disabled.");
    return;
  }
  if (!isOfcSchedulePage()) {
    updateAiStatus("Auto Submit works on OFC schedule only.");
    return;
  }
  const pay = await fetchPaymentStatus({ force: true });
  if (!pay.paid) {
    await _applyPaymentGate();
    return;
  }
  const accountId = await getAccountId();
  if (!accountId) {
    updateAiStatus("Log in on the visa site first.");
    return;
  }
  const prev = (await getAiConfig(accountId)) || {};
  const turningOn = !isSubmitEnabled(prev);
  const { from, to } = _readFormDates();

  if (turningOn) {
    if (!from || !to) {
      updateAiStatus("Select both From and To dates before enabling Auto Submit.");
      return;
    }
    if (from > to) {
      updateAiStatus("From date must be before To date.");
      return;
    }
    thawOps();
    clearPendingSubmit();
    resetAutoSubmitProbe();
    await _persistForm(accountId, {
      submitEnabled: true,
      from,
      to,
      confirmedAt: Date.now(),
    });
    reportBookingEvent({
      kind: "auto_submit",
      stage: "on",
      level: "info",
      message: `Auto Submit ON ${from} → ${to}`,
      date: from,
      detail: { to },
    });
    const remote = await syncAutoSubmitToServer({ enabled: true, from, to });
    if (remote) {
      await applyServerAutoSubmitPrefs(remote, accountId);
      if (!remote.enabled) {
        updateAiStatus(remote.message || "Auto Submit not enabled on server (payment / device).");
        await refreshAiSubmitUi();
        return;
      }
    }
  } else {
    clearPendingSubmit();
    await _persistForm(accountId, {
      submitEnabled: false,
      from: from || prev.from,
      to: to || prev.to,
    });
    const remote = await syncAutoSubmitToServer({
      enabled: false,
      from: from || prev.from || null,
      to: to || prev.to || null,
    });
    if (remote) await applyServerAutoSubmitPrefs(remote, accountId);
  }
  await refreshAiSubmitUi();
  if (turningOn) {
    await probeAutoSubmitForCurrentCity();
  }
}

async function _onToggleCities() {
  const pay = await fetchPaymentStatus({ force: true });
  if (!pay.paid) {
    await _applyPaymentGate();
    return;
  }
  const accountId = await getAccountId();
  if (!accountId) {
    updateAiStatus("Log in on the visa site first.");
    return;
  }
  const prev = (await getAiConfig(accountId)) || {};
  const turningOn = !isCitiesEnabled(prev);
  const cities = _readSelectedCities();

  if (turningOn) {
    if (!cities.length) {
      updateAiStatus("Select at least one city.");
      return;
    }
    thawOps();
    await _persistForm(accountId, {
      citiesEnabled: true,
      cities,
    });
    await syncCitiesToServer(cities, true);
    await refreshAiSubmitUi();
    _bindPostSelectRotateWatch();
    await startCityRotate();
    return;
  }

  stopCityRotate();
  await _persistForm(accountId, {
    citiesEnabled: false,
    cities: cities.length ? cities : (prev.cities || []),
  });
  await syncCitiesToServer(cities.length ? cities : (prev.cities || []), false);
  await refreshAiSubmitUi();
}

async function _onSaveLogin() {
  if (!TEMP_SHOW_LOGIN_DETAILS) {
    updateAiStatus("Login details are temporarily disabled.");
    return;
  }
  const accountId = await getAccountId();
  if (!accountId) {
    updateAiStatus("Open a logged-in schedule page so we can bind this to your account.");
    return;
  }
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
  updateAiStatus("Saved ID, password, and 3 security questions (1 from each set).");
}

export function removeStaleTikTikUi() {
  for (const panel of [...document.querySelectorAll("div[id]")]) {
    if (!panel.textContent?.includes("Tik Tik (this account only)")) continue;
    panel.remove();
  }
  for (const btn of [...document.querySelectorAll("button")]) {
    const label = (btn.textContent || "").trim();
    if (/^Tik Tik\b/i.test(label)) btn.remove();
    else if (/^Recheck$/i.test(label)) btn.remove();
  }
  document.querySelector(idSel(ID.recheck))?.remove();
  document.querySelector(idSel(ID.aiPanel))?.remove();
  document.querySelector(idSel(ID.aiBtn))?.remove();
  for (const row of [...document.querySelectorAll("div[id]")]) {
    if (row.querySelector("#post_select")) continue;
    const buttons = [...row.querySelectorAll("button")];
    if (!buttons.length) continue;
    if (buttons.every((b) => /^(Tik Tik|Recheck)/i.test((b.textContent || "").trim()))) {
      row.remove();
    }
  }
}

/** Remove Tik Tik button + panel (used on Consular where Tik Tik must not appear). */
export function removeTikTikUi() {
  removeStaleTikTikUi();
}

var _consularStripTimer = null;

function _ensureConsularStripLoop() {
  if (_consularStripTimer) return;
  _consularStripTimer = vs.setInterval(() => {
    if (!vs.alive) return;
    // OFC page — leave Tik Tik alone.
    if (isOfcSchedulePage() && !isConsularSchedulePage()) return;
    removeTikTikUi();
    try {
      stopServerCityRotate();
    } catch {}
  }, 800);
}

export function ensureAiSubmitUi() {
  if (isInterviewPage()) return;
  if (!isOfcSchedulePage() || isConsularSchedulePage()) {
    removeTikTikUi();
    _ensureConsularStripLoop();
    return;
  }
  if (document.querySelector(idSel(ID.aiBtn))) return;

  const row = ensureSelectorRow();
  if (!row) return;

  const btn = document.createElement("button");
  btn.id = ID.aiBtn;
  btn.type = "button";
  btn.textContent = "Tik Tik";
  btn.dataset[DAT.mark] = "";
  vs.on(btn, "click", () => {
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
    <div class="${CLS.cardTtl}">Tik Tik (this account only)</div>
    <div id="${ID.aiPayBox}" class="${CLS.aiHint}" style="display:none;border:1px solid #fdba74;background:#fff7ed;padding:10px;border-radius:8px;margin-bottom:8px"></div>
    <div id="${ID.aiControls}">
    <p class="${CLS.aiHint}">
      ${TEMP_SHOW_AUTO_SUBMIT
        ? `Two separate switches: <b>Auto Submit</b> books a matching date once;
      <b>City Change</b> saves your cities on the server — next city and timing come from the server.`
        : `<b>City Change</b> saves your cities on the server — next city and timing come from the server.`}
    </p>
    ${TEMP_SHOW_AUTO_SUBMIT ? `
    <div class="${CLS.aiRow}">
      <label>From <input type="date" id="${ID.aiFrom}" min="${_todayISO()}" /></label>
      <label>To <input type="date" id="${ID.aiTo}" min="${_todayISO()}" /></label>
    </div>
    ` : ""}
    <div class="${CLS.aiHint}" style="margin-bottom:4px;font-weight:600;color:#334155">
      Preferred cities
      <button type="button" id="${ID.aiCitiesAll}" class="${CLS.aiCityAct}">Select all</button>
      <button type="button" id="${ID.aiCitiesNone}" class="${CLS.aiCityAct}">Clear</button>
    </div>
    <div id="${ID.aiCities}" class="${CLS.aiCities}"></div>
    ${TEMP_SHOW_LOGIN_DETAILS ? `
    <div class="${CLS.aiHint}" style="margin:8px 0 4px;font-weight:600;color:#334155">Login (for PSE0501 recovery on Home tab)</div>
    <div class="${CLS.aiRow}">
      <label>ID / email <input type="email" id="${ID.aiLogin}" autocomplete="off" /></label>
      <label>Password <input type="password" id="${ID.aiPass}" autocomplete="off" /></label>
    </div>
    <div class="${CLS.aiHint}" style="margin:0 0 6px">
      3 sets × 5 questions. Pick <b>1 question from each set</b>, then type <b>your answer</b> for that question.
      Login later asks any 2 of these 3.
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
    ` : ""}
    <div class="${CLS.aiRow}">
      ${TEMP_SHOW_AUTO_SUBMIT ? `<button type="button" id="${ID.aiSubmitBtn}">Auto Submit: OFF</button>` : ""}
      <button type="button" id="${ID.aiCitiesBtn}">City Change: OFF</button>
      <button type="button" id="${ID.aiClose}">Close</button>
    </div>
    </div>
    <div id="${ID.aiStatus}" class="${CLS.aiHint}"></div>
  `;

  row.insertAdjacentElement("afterend", panel);

  // aiPayBox uses display:none initially; unlock CSS via removing CLS.hidden + style
  const payBox = panel.querySelector(idSel(ID.aiPayBox));
  if (payBox) {
    payBox.classList.add(CLS.hidden);
    payBox.style.display = "";
  }

  const submitBtn = panel.querySelector(idSel(ID.aiSubmitBtn));
  if (submitBtn) vs.on(submitBtn, "click", _onToggleSubmit);
  vs.on(panel.querySelector(idSel(ID.aiCitiesBtn)), "click", _onToggleCities);
  const saveLoginBtn = panel.querySelector(idSel(ID.aiSaveLogin));
  if (saveLoginBtn) vs.on(saveLoginBtn, "click", _onSaveLogin);
  vs.on(panel.querySelector(idSel(ID.aiClose)), "click", () => _togglePanel(false));
  vs.on(panel.querySelector(idSel(ID.aiCitiesAll)), "click", () => _setAllCitiesChecked(true));
  vs.on(panel.querySelector(idSel(ID.aiCitiesNone)), "click", () => _setAllCitiesChecked(false));
  const citiesBox = panel.querySelector(idSel(ID.aiCities));
  if (citiesBox) {
    vs.on(citiesBox, "change", (e) => {
      if (e.target?.type === "checkbox") void _onCitiesSelectionChanged();
    });
  }
  const fromEl = panel.querySelector(idSel(ID.aiFrom));
  if (fromEl) {
    vs.on(fromEl, "change", (e) => {
      const toEl = panel.querySelector(idSel(ID.aiTo));
      if (toEl && e.target.value) toEl.min = e.target.value;
    });
  }
  _bindOutsideClose();

  onPaymentChange(() => {
    _applyPaymentGate();
  });
  startPaymentPolling();
  fetchPaymentStatus({ force: true }).then(() => _applyPaymentGate());
  refreshAiSubmitUi();
  void hydrateAutoSubmitFromServer().then(async () => {
    const pay = getCachedPayment();
    if (pay.paid && (await getArmedAiConfig())) await probeAutoSubmitForCurrentCity();
  });
}

function _watchSiteSubmit() {
  const bind = (btn) => {
    if (!btn || btn.dataset.aiSubmitBound) return;
    btn.dataset.aiSubmitBound = "1";
    vs.on(btn, "click", () => {
      armSubmitErrorWatch();
      getAccountId().then((id) => {
        if (id) disarmAiSubmit(id);
        else freezeAllOps();
      });
    });
  };
  bind(document.querySelector("#submitbtn"));
  vs.setInterval(() => bind(document.querySelector("#submitbtn")), 2000);
}

export async function reserveAiSubmit() {
  if (!vs.alive) return;
  if (isInterviewPage()) return;
  // Consular /schedule: never show Tik Tik (only OFC /ofc-schedule).
  if (!isOfcSchedulePage() || isConsularSchedulePage()) {
    removeTikTikUi();
    _ensureConsularStripLoop();
    try {
      stopServerCityRotate();
    } catch {}
    return;
  }
  if (!await vs.waitFor("#post_select", { attempts: SCHEDULE_UI_WAIT_ATTEMPTS })) return;
  ensureAiSubmitUi();
  startPaymentPolling();
  await fetchPaymentStatus({ force: true });
  await _applyPaymentGate();
  _bindPostSelectRotateWatch();
  _watchSiteSubmit();
  if (_aiSubmitMounted) return;
  _aiSubmitMounted = true;
  vs.setTimeout(() => refreshAiSubmitUi(), 800);
  vs.setTimeout(async () => {
    await hydrateAutoSubmitFromServer();
    const pay = getCachedPayment();
    if (pay.paid && (await getArmedAiConfig())) await probeAutoSubmitForCurrentCity();
  }, 1500);
}
