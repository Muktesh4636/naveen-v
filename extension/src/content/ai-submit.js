/**
 * Tik Tik — per-account helper with two independent switches:
 *  1. Auto Submit — date range → select date/time → Submit once
 *  2. City Change — next city + timing come from the.gopg.online (extension only executes)
 *
 * Either can be enabled/disabled on its own. Interview pages: do nothing.
 */

import { getPosts, getProfile, SCHEDULE_UI_WAIT_ATTEMPTS } from "../shared/config.js";
import { storageGet, storageSet } from "../shared/runtime.js";
import { vs } from "../shared/lifecycle.js";
import { CLS, DAT, ID, MSG, T, idSel } from "../shared/token.js";
import { ensureSelectorRow } from "./scheduling-controls.js";
import { armSubmitErrorWatch } from "./submit-errors.js";
import { isTimeSlotPicked } from "./time-select.js";
import {
  clearCityRotateBusy,
  ensureServerCityRotate,
  setCityRotateStatusSink,
  startServerCityRotate,
  stopServerCityRotate,
  syncCitiesToServer,
} from "./city-rotate-server.js";

export var AI_SUBMIT_KEY = "aiSubmitByAccount";

/** Ultra mode — poll every 25ms, pick 1st slot, Submit 50ms after slot. */
export var AI_DATE_SELECT_MS = 8000;
export var AI_BOOK_SELECT_MS = 3500;
export var AI_TIME_DOM_WAIT_MS = 0;
export var AI_BOOK_POLL_MS = 25;
export var AI_BOOK_SUBMIT_WAIT_MS = 80;
export var AI_BOOK_SLOT_INDEX = 0;
export var AI_SUBMIT_ARM_MS = 6000;

/** Calendar: 2 dates → 2nd; 3 → 3rd; 4+ → 2nd or 3rd only (never 1st or 4th+). */
export function pickPreferredDateIndex(count) {
  const n = Math.max(0, Number(count) || 0);
  if (n <= 0) return -1;
  if (n === 1) return 0;
  if (n === 2) return 1;
  if (n === 3) return 2;
  return 2; // 4+ available → 3rd (not 1st, not 4th)
}

/** City Change gap / windows are owned by the server — not hard-coded here. */
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

/** Auto-submit on (supports legacy `enabled`). */
export function isSubmitEnabled(cfg) {
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
  refreshAiSubmitUi();
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

var _submitArmed = false;
var _submitTimer = null;
var _postSelectRotateBound = false;
var _citiesOptionsKey = "";
var _aiSubmitMounted = false;
var _lastProbeAt = 0;
var _rotatePausedUntil = 0;

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

export function stopCityRotate() {
  stopServerCityRotate();
}

export function pauseCityRotateForWait(seconds) {
  const ms = Math.max(0, Number(seconds) || 0) * 1000;
  _rotatePausedUntil = Math.max(_rotatePausedUntil, Date.now() + ms);
  // Dates / wait pill — release busy so server can plan after pause.
  clearCityRotateBusy();
}

/** After schedule-days (dates / no slots) or 40s busy timeout — ask server for next plan. */
export function noteCityRotateResponse(_info = {}) {
  clearCityRotateBusy();
  updateAiStatus("City Change — dates settled; requesting next plan from server…");
}

export function haltCityRotateForBooking() {
  stopCityRotate();
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

function _readFormDates() {
  return {
    from: document.querySelector(idSel(ID.aiFrom))?.value || null,
    to: document.querySelector(idSel(ID.aiTo))?.value || null,
  };
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
  const { from, to } = _readFormDates();
  const cities = _readSelectedCities();
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
  if (_submitArmed) return;

  const cfg = await getCitiesRotateConfig();
  if (!cfg?.cities?.length) return;

  setCityRotateStatusSink(updateAiStatus);
  const synced = await syncCitiesToServer(cfg.cities, true);
  if (!synced) {
    updateAiStatus("City Change — could not save cities to server; will keep requesting…");
  }
  updateAiStatus("City Change ON — city & timing from server (4s prefetch)");
  await startServerCityRotate();
}

/** Restart rotation if City Change is ON but the timer was lost (e.g. slow page load). */
export async function ensureCityRotateRunning() {
  if (_opsFrozen || _submitArmed || isInterviewPage() || !isOfcSchedulePage() || !vs.alive) return;
  const cfg = await getCitiesRotateConfig();
  if (!cfg?.cities?.length) return;
  if (!document.querySelector("#post_select")) return;
  setCityRotateStatusSink(updateAiStatus);
  await ensureServerCityRotate();
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
    pollMs: AI_BOOK_POLL_MS,
    maxMs: AI_SUBMIT_ARM_MS,
  });
}

function _isBookingReadyToSubmit() {
  if (!isTimeSlotPicked()) return false;
  const submit = _findSubmitButton();
  return !!(submit && !submit.disabled);
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
      return;
    }
    updateAiStatus("Auto Submit — Submit not clicked in time; still watching…");
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
      updateAiStatus(`Time slot selected — Submit in ${AI_BOOK_SUBMIT_WAIT_MS}ms…`);
    }

    if (timePickedAt && now - timePickedAt >= AI_BOOK_SUBMIT_WAIT_MS) {
      clickSubmitDual();
      if (_isBookingReadyToSubmit()) {
        updateAiStatus("Clicking Submit…");
      }
    }

    if (elapsed >= AI_SUBMIT_ARM_MS) {
      return finish(false);
    }

    _submitTimer = vs.setTimeout(tryFinish, AI_BOOK_POLL_MS);
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

export async function scheduleAiSubmitClick(accountId) {
  if (_opsFrozen) return;
  if (isInterviewPage()) return;
  if (_submitArmed) return;
  const cfg = await getAiConfig(accountId);
  if (!isSubmitEnabled(cfg)) return;

  haltCityRotateForBooking();
  _submitArmed = true;
  const started = Date.now();
  const minWaitMs = 0;
  const maxWaitMs = 100;

  const trySubmit = async () => {
    if (!_submitArmed || !vs.alive) return;
    const elapsed = Date.now() - started;
    const ready = _isBookingReadyToSubmit();

    if ((ready && elapsed >= minWaitMs) || elapsed >= maxWaitMs) {
      _submitTimer = null;
      if (isInterviewPage()) {
        _submitArmed = false;
        return;
      }
      await disarmAiSubmit(accountId);
      vs.send({ action: "clickSubmit", prefix: T });
      updateAiStatus("Submit clicked — all Tik Tik operations stopped.");
      _submitArmed = false;
      return;
    }

    updateAiStatus(
      ready
        ? "Time slot ready — clicking Submit…"
        : `Waiting for time slot to register (${(elapsed / 1000).toFixed(1)}s)…`
    );
    _submitTimer = vs.setTimeout(() => { trySubmit(); }, 10);
  };

  updateAiStatus("Time picked — waiting for slot to register…");
  trySubmit();
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
  const submitOn = isSubmitEnabled(cfg);
  const citiesOn = isCitiesEnabled(cfg);

  if (submitBtn) {
    submitBtn.classList.toggle(CLS.aiOnBtn, submitOn);
    submitBtn.textContent = submitOn ? "Auto Submit: ON" : "Auto Submit: OFF";
  }
  if (citiesBtn) {
    citiesBtn.classList.toggle(CLS.aiOnBtn, citiesOn);
    citiesBtn.textContent = citiesOn ? "City Change: ON" : "City Change: OFF";
  }
}

function _paintStatus(cfg, accountId) {
  const status = document.querySelector(idSel(ID.aiStatus));
  const btn = document.querySelector(idSel(ID.aiBtn));
  if (!status || !btn) return;

  _paintToggleButtons(cfg);

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
  } else {
    parts.push("Auto Submit OFF");
  }
  if (citiesOn) {
    parts.push(`City Change ON (${_cityNames(cfg)}, :14–:21 & :24–:31)`);
  } else {
    parts.push("City Change OFF");
  }
  status.textContent = `Account ${accountId || "—"}: ${parts.join(" · ")}`;
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
  const accountId = await getAccountId();
  if (!accountId) {
    updateAiStatus("Open a logged-in schedule page so we can bind this to your account.");
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
    const ok = window.confirm(
      `Enable Auto Submit?\n\n` +
      `Range: ${_pretty(from)} – ${_pretty(to)}\n` +
      `If a matching slot appears on the current city, it will select date + time and Submit once.\n\n` +
      `City Change is separate — use its own ON/OFF button.`
    );
    if (!ok) return;
    thawOps();
    clearPendingSubmit();
    resetAutoSubmitProbe();
    await _persistForm(accountId, {
      submitEnabled: true,
      from,
      to,
      confirmedAt: Date.now(),
    });
  } else {
    clearPendingSubmit();
    await _persistForm(accountId, {
      submitEnabled: false,
      from: from || prev.from,
      to: to || prev.to,
    });
  }
  await refreshAiSubmitUi();
  if (turningOn) {
    await probeAutoSubmitForCurrentCity();
  }
}

async function _onToggleCities() {
  const accountId = await getAccountId();
  if (!accountId) {
    updateAiStatus("Open a logged-in schedule page so we can bind this to your account.");
    return;
  }
  const prev = (await getAiConfig(accountId)) || {};
  const turningOn = !isCitiesEnabled(prev);
  const cities = _readSelectedCities();

  if (turningOn) {
    if (!cities.length) {
      updateAiStatus("Select at least one preferred city before enabling City Change.");
      return;
    }
    const ok = window.confirm(
      `Enable City Change?\n\n` +
      `Cities: ${cities.map((c) => c.name).join(", ")}\n` +
      `Cities are saved on the server for this applicant.\n` +
      `Switch timing and next city come from the server (prefetch 4s early).\n\n` +
      `Auto Submit is separate — use its own ON/OFF button.`
    );
    if (!ok) return;
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
  updateAiStatus("Saved ID, password, and 3 security questions (1 from each set).");
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
    <p class="${CLS.aiHint}">
      Two separate switches: <b>Auto Submit</b> books a matching date once;
      <b>City Change</b> saves your cities on the server — next city and timing are sent from the server (4s prefetch).
    </p>
    <div class="${CLS.aiRow}">
      <label>From <input type="date" id="${ID.aiFrom}" min="${_todayISO()}" /></label>
      <label>To <input type="date" id="${ID.aiTo}" min="${_todayISO()}" /></label>
    </div>
    <div class="${CLS.aiHint}" style="margin-bottom:4px;font-weight:600;color:#334155">
      Preferred cities
      <button type="button" id="${ID.aiCitiesAll}" class="${CLS.aiCityAct}">Select all</button>
      <button type="button" id="${ID.aiCitiesNone}" class="${CLS.aiCityAct}">Clear</button>
    </div>
    <div id="${ID.aiCities}" class="${CLS.aiCities}"></div>
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
    <div class="${CLS.aiRow}">
      <button type="button" id="${ID.aiSubmitBtn}">Auto Submit: OFF</button>
      <button type="button" id="${ID.aiCitiesBtn}">City Change: OFF</button>
      <button type="button" id="${ID.aiClose}">Close</button>
    </div>
    <div id="${ID.aiStatus}" class="${CLS.aiHint}"></div>
  `;

  row.insertAdjacentElement("afterend", panel);

  vs.on(panel.querySelector(idSel(ID.aiSubmitBtn)), "click", _onToggleSubmit);
  vs.on(panel.querySelector(idSel(ID.aiCitiesBtn)), "click", _onToggleCities);
  vs.on(panel.querySelector(idSel(ID.aiSaveLogin)), "click", _onSaveLogin);
  vs.on(panel.querySelector(idSel(ID.aiClose)), "click", () => _togglePanel(false));
  vs.on(panel.querySelector(idSel(ID.aiCitiesAll)), "click", () => _setAllCitiesChecked(true));
  vs.on(panel.querySelector(idSel(ID.aiCitiesNone)), "click", () => _setAllCitiesChecked(false));

  vs.on(panel.querySelector(idSel(ID.aiFrom)), "change", (e) => {
    const to = panel.querySelector(idSel(ID.aiTo));
    if (to && e.target.value) to.min = e.target.value;
  });

  refreshAiSubmitUi();
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
  if (!isOfcSchedulePage()) {
    removeTikTikUi();
    return;
  }
  if (!await vs.waitFor("#post_select", { attempts: SCHEDULE_UI_WAIT_ATTEMPTS })) return;
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
