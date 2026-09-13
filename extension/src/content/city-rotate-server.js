/**
 * City Change executor — local timer only (5296b0f style).
 * Switches preferred cities every 13–18s inside IST slot windows.
 * No server plan API, no hot-city jumps.
 */
import {
  AUTO_SUBMIT_PREFS_URL,
  DATE_CLAIM_URL,
  getProfile,
} from "../shared/config.js";
import { signedFetch } from "../shared/api-sign.js";
import { vs } from "../shared/lifecycle.js";
import { getUnlockToken, notePaymentFromWire } from "./payment-status.js";
import { captureUsernameAnytime } from "../shared/profile-capture.js";
import { getDeviceId } from "../shared/device-id.js";
import { reportBookingEvent } from "./booking-log.js";
import { notePseAction } from "./pse-diagnostics.js";
import {
  formatSlotWait,
  isInSlotWindow,
  msUntilSlotWindow,
  SLOT_WINDOW_LABEL,
} from "../shared/slotSchedule.js";

/** @deprecated kept for imports — local mode ignores server plan timing. */
export var CITY_PLAN_PREFETCH_LEAD_MS = 800;
/** @deprecated kept for imports — local mode ignores server plan timing. */
export var CITY_PLAN_RETRY_MS = 1_000;

var CITY_ROTATE_MIN_GAP_MS = 13_000;
var CITY_ROTATE_MAX_GAP_MS = 18_000;
/** Max wait while CGI shows Loading before allowing next city. */
var CITY_BUSY_MAX_MS = 120_000;
var _NO_SLOTS_GRACE_MS = 8_000;
const _NO_SLOTS_RE = /no\s*slots?\s*available|noslots\s*available/i;

var _rotateTimer = null;
var _rotateInFlight = false;
var _rotateActive = false;
var _rotateBusy = false;
var _rotateBusyClearTimer = null;
var _noSlotsDomWatch = null;
var _busyStartedAt = 0;
var _busySawLoading = false;
var _scheduleDaysAcked = false;
var _earlyUnlockReason = "";
var _busyIgnoreNoSlotsUntil = 0;
var _updateStatus = () => {};
var _nextRotateAt = 0;
var _lastSwitchAt = 0;
var _rotatePausedUntil = 0;
/** Auto Submit is booking on this city — pause hops, keep City Change ON. */
var _bookingHold = false;
/** Block city hops while PSE0501 / soft session is being fixed. */
var _sessionPause = false;
/** Cached preferred cities — set when City Change starts (avoids profile race). */
var _rotateCities = [];
var _postSelectBound = false;

export function setRotateCityList(cities) {
  _rotateCities = (cities || []).map((c) => ({
    id: String(c.id),
    name: c.name || String(c.id),
  }));
}


export function setCityRotateStatusSink(fn) {
  _updateStatus = typeof fn === "function" ? fn : () => {};
}

export function isCityRotateActive() {
  return _rotateActive;
}

export function isCityRotateBusy() {
  return _rotateBusy;
}

export function isCityRotateHeld() {
  return _bookingHold;
}

export function isCityRotateSessionPaused() {
  return _sessionPause;
}

export function pauseCityRotateForSessionError(message = "") {
  if (_sessionPause) return;
  _sessionPause = true;
  _cancelTimer();
  _clearBusy();
  const msg = String(message || "").slice(0, 200);
  notePseAction("session_pause", { msg });
  _updateStatus(
    /PSE0501|unable to load/i.test(msg)
      ? "City Change paused — PSE0501; fixing session on Home…"
      : "City Change paused — calendar error; fix Home tab…"
  );
  reportBookingEvent({
    kind: "city_change",
    stage: "session_pause",
    level: "warn",
    message: `Paused city change: ${msg || "session/calendar error"}`,
  });
  try {
    vs.send({ action: "recoveryStart", ofcUrl: location.href });
  } catch {}
}

export function resumeCityRotateAfterSessionFix() {
  if (!_sessionPause) return;
  _sessionPause = false;
  notePseAction("session_resume", {});
  if (_rotateActive && !_bookingHold) {
    _updateStatus("City Change — resuming…");
    _scheduleCityRotate();
  }
}

function _cancelTimer() {
  if (_rotateTimer) {
    vs.clear(_rotateTimer);
    _rotateTimer = null;
  }
}

function _stopNoSlotsDomWatch() {
  if (_noSlotsDomWatch) {
    vs.clear(_noSlotsDomWatch);
    _noSlotsDomWatch = null;
  }
}

function _textLooksNoSlots(raw) {
  const t = String(raw || "").replace(/\s+/g, " ").trim();
  return t.length > 0 && t.length < 500 && _NO_SLOTS_RE.test(t);
}

function _domShowsLoading(bodyText) {
  const dateRoot =
    document.querySelector("#datepicker") ||
    document.querySelector(".ui-datepicker") ||
    document.querySelector("[id*='date']");
  const dateText = ((dateRoot && dateRoot.textContent) || "").replace(/\s+/g, " ").trim();
  if (/\bloading\.{0,3}\b/i.test(dateText)) return true;
  const hay = bodyText || "";
  if (/\bDate\s*\(MM\/DD\/YYYY\)\s*Loading\b/i.test(hay.slice(0, 6000))) return true;
  if (/\bloading\.{0,3}\b/i.test(hay.slice(0, 6000)) && /date\s*\(mm\/dd\/yyyy\)/i.test(hay.slice(0, 6000))) {
    return true;
  }
  return false;
}

function _domShowsNoSlots(root, bodyText) {
  for (const el of root.querySelectorAll(
    ".atlas_validationalert, .alert, .alert-danger, .alert-warning, .validation-summary-errors, #error_row, [class*='alert' i], [class*='validation' i], [role='alert']"
  )) {
    if (_textLooksNoSlots(el.textContent)) return true;
  }
  return _NO_SLOTS_RE.test((bodyText || "").slice(0, 6000));
}

/** loading → wait; no_slots / dates → unlock when Loading is gone. */
function _calendarDomStatus() {
  const root = document.body;
  if (!root) return "unknown";

  const bodyText = (root.innerText || root.textContent || "").replace(/\s+/g, " ");

  if (_domShowsLoading(bodyText)) return "loading";

  if (_domShowsNoSlots(root, bodyText)) return "no_slots";

  if (
    document.querySelector(
      "#datepicker td[data-handler='selectDay'] a, .ui-datepicker-calendar td a.ui-state-default"
    )
  ) {
    return "dates";
  }

  return "unknown";
}

function _clearBusy() {
  _rotateBusy = false;
  _busyStartedAt = 0;
  _busySawLoading = false;
  _scheduleDaysAcked = false;
  _earlyUnlockReason = "";
  _busyIgnoreNoSlotsUntil = 0;
  _stopNoSlotsDomWatch();
  if (_rotateBusyClearTimer) {
    vs.clear(_rotateBusyClearTimer);
    _rotateBusyClearTimer = null;
  }
}

function _armNoSlotsDomWatch() {
  _stopNoSlotsDomWatch();
  let rounds = 0;
  let mo = null;

  const check = () => {
    if (!_rotateBusy || !_rotateActive || !vs.alive) {
      try {
        mo?.disconnect();
      } catch {}
      _noSlotsDomWatch = null;
      return true;
    }
    const status = _calendarDomStatus();
    const left = Math.max(
      0,
      CITY_BUSY_MAX_MS - (Date.now() - (_busyStartedAt || Date.now()))
    );

    if (status === "loading") {
      _busySawLoading = true;
      _updateStatus(
        `City Change — Loading… wait (max ${Math.ceil(left / 1000)}s)`
      );
      return false;
    }

    if (status === "no_slots") {
      const inGrace = Date.now() < _busyIgnoreNoSlotsUntil;
      if (inGrace && !_busySawLoading) {
        _updateStatus(
          `City Change — waiting for dates… (${Math.ceil(left / 1000)}s left)`
        );
        return false;
      }
      if (_scheduleDaysAcked || _busySawLoading) {
        try {
          mo?.disconnect();
        } catch {}
        clearCityRotateBusy({ reason: "no_slots" });
        return true;
      }
      _updateStatus(
        `City Change — waiting for CGI reply… (${Math.ceil(left / 1000)}s left)`
      );
      return false;
    }

    if (status === "dates") {
      try {
        mo?.disconnect();
      } catch {}
      clearCityRotateBusy({ reason: "loaded" });
      return true;
    }

    _updateStatus(
      `City Change — waiting for dates… (${Math.ceil(left / 1000)}s left)`
    );
    return false;
  };

  const tick = () => {
    if (check()) return;
    if (++rounds > 600) {
      try {
        mo?.disconnect();
      } catch {}
      _noSlotsDomWatch = null;
      return;
    }
    _noSlotsDomWatch = vs.setTimeout(tick, 200);
  };

  try {
    mo = new MutationObserver(() => {
      if (check()) {
        try {
          mo.disconnect();
        } catch {}
      }
    });
    mo.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  } catch {
    mo = null;
  }

  _noSlotsDomWatch = vs.setTimeout(tick, 100);
}

function _armBusy(_cityId) {
  _rotateBusy = true;
  _busyStartedAt = Date.now();
  _busySawLoading = false;
  _scheduleDaysAcked = false;
  _earlyUnlockReason = "";
  _busyIgnoreNoSlotsUntil = Date.now() + _NO_SLOTS_GRACE_MS;
  if (_rotateBusyClearTimer) vs.clear(_rotateBusyClearTimer);

  _updateStatus("City Change — Loading… (max 2 min)");
  _armNoSlotsDomWatch();

  if (_earlyUnlockReason && _calendarDomStatus() !== "loading") {
    clearCityRotateBusy({ reason: _earlyUnlockReason });
    return;
  }

  _rotateBusyClearTimer = vs.setTimeout(() => {
    _rotateBusyClearTimer = null;
    const status = _calendarDomStatus();
    if (status === "loading") {
      clearCityRotateBusy({ reason: "timeout" });
      _updateStatus("City Change — Loading 2 min; next city in 13–18s…");
      reportBookingEvent({
        kind: "city_change",
        stage: "timeout",
        level: "warn",
        message: "Dates still loading after 2 minutes — allow next city",
      });
      return;
    }
    if (status === "no_slots") {
      clearCityRotateBusy({ reason: "no_slots" });
      return;
    }
    if (status === "dates") {
      clearCityRotateBusy({ reason: "loaded" });
      return;
    }
    clearCityRotateBusy({ reason: "timeout" });
    _updateStatus("City Change — no reply after 2 min; next city in 13–18s…");
  }, CITY_BUSY_MAX_MS);
}

export function unlockCityRotateAfterSchedule(_reason) {
  const r = _reason === "loaded" ? "loaded" : "no_slots";
  _scheduleDaysAcked = true;
  if (!_rotateBusy) {
    _earlyUnlockReason = r;
    return;
  }
  _earlyUnlockReason = "";

  const tryUnlock = (attempt) => {
    if (!_rotateBusy || !_rotateActive || !vs.alive) return;
    if (_calendarDomStatus() === "loading" && attempt < 40) {
      _busySawLoading = true;
      vs.setTimeout(() => tryUnlock(attempt + 1), 250);
      return;
    }
    clearCityRotateBusy({ reason: r });
  };
  tryUnlock(0);
}

export function clearCityRotateBusy(opts = {}) {
  const was = _rotateBusy;
  const reason = opts.reason || "loaded";
  notePseAction("city_unlock", { reason, wasBusy: was });
  _clearBusy();
  if (!was || !_rotateActive) return;
  if (reason === "no_slots") {
    _updateStatus("City Change — no slots; next city in 13–18s…");
  } else if (reason === "timeout") {
    _updateStatus("City Change — load timed out (2 min); next city in 13–18s…");
  } else {
    _updateStatus("City Change — dates loaded; next city in 13–18s…");
  }
  // Do not reschedule here — the timer from the last _rotateTick already holds
  // the 13–18s gap (5296b0f noteCityRotateResponse only cleared busy).
}

export function requestSelectPost(postId, source) {
  const nextId = String(postId || "");
  if (!nextId) return false;
  vs.send({ action: "selectPost", postId: nextId, source: source || "" });
  return true;
}

export function stopServerCityRotate() {
  _cancelTimer();
  _rotateInFlight = false;
  _rotateActive = false;
  _bookingHold = false;
  _nextRotateAt = 0;
  _lastSwitchAt = 0;
  _rotateCities = [];
  _clearBusy();
}

export async function holdCityRotateForBooking() {
  _bookingHold = true;
  _cancelTimer();
  _clearBusy();
  _updateStatus("City Change — paused (Auto Submit booking)…");
  reportBookingEvent({
    kind: "city_change",
    stage: "hold",
    level: "info",
    message: "Paused city change while Auto Submit books",
  });
}

export function releaseCityRotateHold() {
  if (!_bookingHold) return;
  _bookingHold = false;
  if (!_rotateActive) return;
  _updateStatus("City Change — resuming…");
  reportBookingEvent({
    kind: "city_change",
    stage: "resume",
    level: "info",
    message: "Resuming city change after Auto Submit",
  });
  _scheduleCityRotate();
}

/** @deprecated use holdCityRotateForBooking — kept name for callers */
export async function acknowledgePendingCityThenStop() {
  await holdCityRotateForBooking();
}

function _randBetween(min, max) {
  return min + Math.random() * (max - min);
}

function _rotateGapMs() {
  return _randBetween(CITY_ROTATE_MIN_GAP_MS, CITY_ROTATE_MAX_GAP_MS);
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
    const minWait = _lastSwitchAt + CITY_ROTATE_MIN_GAP_MS - now;
    if (minWait > 0) return minWait;
  }
  if (_nextRotateAt > now) {
    return _nextRotateAt - now;
  }
  return 0;
}

function _schedule(delayMs) {
  if (!_rotateActive) return;
  _cancelTimer();
  const d = Math.max(0, Number(delayMs) || 0);
  _rotateTimer = vs.setTimeout(() => {
    _rotateTimer = null;
    void _rotateTick();
  }, d);
}

function _scheduleCityRotate() {
  if (!_rotateActive) return;
  _cancelTimer();
  let delay = _msUntilNextRotate();
  if (delay < CITY_ROTATE_MIN_GAP_MS) {
    if (_lastSwitchAt) {
      delay = Math.max(0, _lastSwitchAt + CITY_ROTATE_MIN_GAP_MS - Date.now());
    } else if (_nextRotateAt > Date.now()) {
      delay = _nextRotateAt - Date.now();
    } else {
      _armNextRotate(Date.now());
      delay = _nextRotateAt - Date.now();
    }
  }
  _schedule(delay);
}

function _pickNextCity(cities, currentId) {
  if (!cities.length) return null;
  if (cities.length === 1) return cities[0];
  const others = cities.filter((c) => String(c.id) !== String(currentId));
  if (!others.length) return cities[0];
  return others[Math.floor(Math.random() * others.length)];
}

function _postOptions() {
  const select = document.querySelector("#post_select");
  if (!select) return [];
  return [...select.options]
    .filter((o) => o.value)
    .map((o) => ({ id: String(o.value), name: (o.textContent || "").trim() }));
}

function _labelForPostId(postId) {
  const select = document.querySelector("#post_select");
  if (!select || !postId) return "";
  const opt = [...select.options].find((o) => String(o.value) === String(postId));
  return (opt?.textContent || "").trim();
}

async function _getRotateCities() {
  if (_rotateCities.length) return _rotateCities;
  try {
    const { getCitiesRotateConfig } = await import("./ai-submit.js");
    const cfg = await getCitiesRotateConfig();
    const list = cfg?.cities || [];
    if (list.length) setRotateCityList(list);
    return list;
  } catch {
    return _rotateCities;
  }
}

function _bindPostSelectWatch() {
  if (_postSelectBound) return;
  const select = document.querySelector("#post_select");
  if (!select) return;
  _postSelectBound = true;
  vs.on(select, "change", () => {
    if (_calendarDomStatus() === "loading") return;
    clearCityRotateBusy({ reason: "loaded" });
  });
}

function _contentScriptSelectPost(postId) {
  const select = document.querySelector("#post_select");
  if (!select || !postId) return false;
  const nextId = String(postId);
  if (String(select.value) === nextId) return false;
  const option = [...select.options].find((o) => String(o.value) === nextId);
  if (!option) return false;
  select.value = option.value;
  select.dispatchEvent(new Event("input", { bubbles: true }));
  select.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}

function _switchDom(cityId) {
  if (!isInSlotWindow()) return false;
  if (_calendarDomStatus() === "loading") return false;
  const select = document.querySelector("#post_select");
  if (!select || !cityId) return false;
  const nextId = String(cityId);
  if (String(select.value) === nextId) return false;

  const localLabel = _labelForPostId(nextId);
  _armBusy(nextId);
  _updateStatus(localLabel ? `Switching city → ${localLabel}…` : "City Change — applying…");
  vs.send({ action: "selectPost", postId: nextId, source: "city_rotate" });
  notePseAction("city_switch", { cityId: nextId, label: localLabel || "" });
  reportBookingEvent({
    kind: "city_change",
    stage: "switch",
    level: "info",
    message: "Switched city — waiting for dates",
    cityId: nextId,
    city: localLabel || "",
  });
  // Log if MAIN-world click did not stick — do not reschedule (keeps 13–18s gap).
  vs.setTimeout(() => {
    if (!_rotateActive) return;
    const sel = document.querySelector("#post_select");
    if (sel && String(sel.value) === nextId) return;
    notePseAction("city_switch_failed", { cityId: nextId, got: sel ? String(sel.value) : "" });
    _contentScriptSelectPost(nextId);
    vs.setTimeout(() => {
      const sel2 = document.querySelector("#post_select");
      if (sel2 && String(sel2.value) === nextId) {
        _updateStatus(`City Change — switched to ${localLabel || nextId} (fallback)`);
        return;
      }
      _clearBusy();
      _updateStatus("City Change — switch failed; next try on schedule…");
    }, 400);
  }, 1200);
  return true;
}

async function _rotateTick() {
  if (_rotateInFlight || !_rotateActive || !vs.alive) return;
  _rotateInFlight = true;
  _rotateTimer = null;

  try {
    if (_sessionPause) {
      _updateStatus("City Change paused — session fix in progress…");
      _schedule(5_000);
      return;
    }

    if (_bookingHold) {
      _updateStatus("City Change — paused (Auto Submit booking)…");
      _schedule(2_000);
      return;
    }

    const now = Date.now();
    const slot = isInSlotWindow(new Date(now));
    const slotWait = msUntilSlotWindow(new Date(now));
    if (!slot) {
      _updateStatus(
        `City Change — waiting for slot window (IST ${SLOT_WINDOW_LABEL}, next in ${formatSlotWait(slotWait)})`
      );
      _scheduleCityRotate();
      return;
    }

    const waitMs = _msUntilNextRotate(now);
    if (_rotateBusy) {
      const left = Math.max(
        0,
        CITY_BUSY_MAX_MS - (Date.now() - (_busyStartedAt || Date.now()))
      );
      const status = _calendarDomStatus();
      if (status === "loading") {
        _updateStatus(
          `City Change — Loading… wait (max ${Math.ceil(left / 1000)}s)`
        );
      } else {
        _updateStatus(
          `City Change — waiting for dates… (${Math.ceil(left / 1000)}s left)`
        );
      }
      _schedule(500);
      return;
    }
    if (waitMs > 0) {
      const showSec = Math.ceil(waitMs / 1000);
      _updateStatus(`City Change — slot ${slot} active, next switch in ${Math.max(1, showSec)}s`);
      _scheduleCityRotate();
      return;
    }

    const cfgCities = await _getRotateCities();
    if (!cfgCities.length) {
      _updateStatus("City Change — config lost; turn OFF then ON again.");
      stopServerCityRotate();
      return;
    }

    const available = new Set(_postOptions().map((o) => o.id));
    const cities = cfgCities.filter((c) => available.has(String(c.id)));
    if (!cities.length) {
      _updateStatus("Preferred cities not found in the dropdown — pick cities again.");
      stopServerCityRotate();
      return;
    }

    const select = document.querySelector("#post_select");
    const currentId = select ? String(select.value) : "";
    if (cities.length === 1) {
      _updateStatus(
        `City Change — pick 2 or more cities to rotate (only ${cities[0].name || cities[0].id} selected)`
      );
      _scheduleCityRotate();
      return;
    }
    const next = _pickNextCity(cities, currentId);
    if (!next) {
      _armNextRotate(now);
      _scheduleCityRotate();
      return;
    }

    const switched = _switchDom(next.id);
    if (switched) {
      _lastSwitchAt = Date.now();
      _armNextRotate(_lastSwitchAt);
      _updateStatus(
        `City Change — slot ${slot}: switched to ${next.name || next.id}, next in 13–18s`
      );
    } else {
      _armNextRotate(now);
    }
    _scheduleCityRotate();
  } finally {
    _rotateInFlight = false;
  }
}

/** Pause rotation during Cloudflare / retry waits. */
export function pauseCityRotateForWait(seconds) {
  const ms = Math.max(0, Number(seconds) || 0) * 1000;
  _rotatePausedUntil = Math.max(_rotatePausedUntil, Date.now() + ms);
  _nextRotateAt = Math.max(_nextRotateAt, _rotatePausedUntil);
  if (_rotateActive) _scheduleCityRotate();
}

export async function startServerCityRotate() {
  if (_rotateActive && (_rotateTimer || _rotateBusy || _rotateInFlight)) {
    return;
  }

  const cfgCities = await _getRotateCities();
  if (!cfgCities.length) {
    _updateStatus("City Change — no cities saved; pick cities and turn ON.");
    return;
  }

  const available = new Set(_postOptions().map((o) => o.id));
  const cities = cfgCities.filter((c) => available.has(String(c.id)));
  if (!cities.length) {
    _updateStatus("Preferred cities not in dropdown — reopen Tik Tik, re-check cities, turn ON.");
    return;
  }

  setRotateCityList(cities);

  _rotateActive = true;
  _bookingHold = false;
  _sessionPause = false;
  _lastSwitchAt = 0;
  _armNextRotate(Date.now());
  _bindPostSelectWatch();
  _updateStatus(`City Change ON — IST slots ${SLOT_WINDOW_LABEL}, switches every 13–18s in-window`);
  _scheduleCityRotate();
}

export async function ensureServerCityRotate() {
  if (_bookingHold) return;
  if (!_rotateActive || (!(_rotateTimer || _rotateInFlight) && !_rotateBusy)) {
    await startServerCityRotate();
  }
}

/** Local mode — city list stays in extension storage only. */
export async function syncCitiesToServer(_cities, _enabled) {
  return true;
}

async function _profilePayload() {
  await captureUsernameAnytime().catch(() => {});
  const profile = (await getProfile()) || {};
  const username = String(
    profile.username || profile.id || profile.name || ""
  ).trim();
  return {
    i: username,
    e: profile.email || "",
    n: profile.name || username,
    v: profile.visa || "",
    username,
    portalId: profile.portalId || "",
  };
}

/** Decode Auto Submit prefs wire (y/f/g/md/ms + pick rules sk/sr/dh/p*). */
export function decodeAutoSubmitWire(raw) {
  if (!raw || typeof raw !== "object") return null;
  return {
    success: Number(raw.k) === 1,
    enabled: Number(raw.y) === 1,
    from: raw.f ? String(raw.f).slice(0, 10) : "",
    to: raw.g ? String(raw.g).slice(0, 10) : "",
    maxDateTries: Math.max(1, Math.min(5, Number(raw.md) || 3)),
    maxSlotTries: Math.max(1, Math.min(5, Number(raw.ms) || 4)),
    skipHighestSlot: !("sk" in raw) || Number(raw.sk) === 1,
    slotStartRank: Math.max(1, Math.min(5, Number(raw.sr) || 2)),
    haltCityWhileBooking: !("dh" in raw) || Number(raw.dh) === 1,
    datePref1: Math.max(0, Number(raw.p1) || 0),
    datePref2: Math.max(0, Number.isFinite(Number(raw.p2)) ? Number(raw.p2) : 1),
    datePref3: Math.max(0, Number.isFinite(Number(raw.p3)) ? Number(raw.p3) : 2),
    datePrefMany: Math.max(0, Number.isFinite(Number(raw.pn)) ? Number(raw.pn) : 2),
    paid: "w" in raw ? Number(raw.w) === 1 : undefined,
    message: raw.e ? String(raw.e) : "",
  };
}

/** Save Auto Submit prefs to server. Pass null fields to leave unchanged when writing. */
export async function syncAutoSubmitToServer({ enabled, from, to, maxDateTries, maxSlotTries } = {}) {
  try {
    const p = await _profilePayload();
    if (!p.i && !p.e) return null;
    const d = await getDeviceId();
    const j = getUnlockToken();
    const body = { p, d, j };
    if (typeof enabled === "boolean") body.y = enabled ? 1 : 0;
    if (from != null) body.f = String(from).slice(0, 10);
    if (to != null) body.g = String(to).slice(0, 10);
    if (maxDateTries != null) body.md = Number(maxDateTries) || 3;
    if (maxSlotTries != null) body.ms = Number(maxSlotTries) || 3;
    const res = await signedFetch(AUTO_SUBMIT_PREFS_URL, body);
    if (!res.ok) return null;
    const data = await res.json().catch(() => ({}));
    notePaymentFromWire(data);
    return decodeAutoSubmitWire(data);
  } catch {
    return null;
  }
}

/** Read Auto Submit prefs from server (no write). */
export async function fetchAutoSubmitFromServer() {
  try {
    const p = await _profilePayload();
    if (!p.i && !p.e) return null;
    const d = await getDeviceId();
    const j = getUnlockToken();
    const res = await signedFetch(AUTO_SUBMIT_PREFS_URL, { p, d, j });
    if (!res.ok) return null;
    const data = await res.json().catch(() => ({}));
    notePaymentFromWire(data);
    return decodeAutoSubmitWire(data);
  } catch {
    return null;
  }
}

/**
 * Ask server for a date so accounts on the same city don't all pick the same day.
 * Always constrained to From/To on the server.
 */
export async function claimSpreadDate({
  cityId = "",
  dates = [],
  from = "",
  to = "",
  avoid = [],
} = {}) {
  try {
    const p = await _profilePayload();
    if (!p.i && !p.e) return null;
    const select = document.querySelector("#post_select");
    const c = cityId || (select ? String(select.value || "") : "");
    if (!c || !(dates || []).length) return null;
    const d = await getDeviceId();
    const j = getUnlockToken();
    const res = await signedFetch(DATE_CLAIM_URL, {
      p,
      d,
      j,
      c,
      l: (dates || []).map((x) => String(x).slice(0, 10)),
      f: from ? String(from).slice(0, 10) : "",
      g: to ? String(to).slice(0, 10) : "",
      x: (avoid || []).map((x) => String(x).slice(0, 10)),
    });
    if (!res.ok) return null;
    const raw = await res.json().catch(() => null);
    notePaymentFromWire(raw || {});
    const v = raw?.v ? String(raw.v).slice(0, 10) : "";
    return v || null;
  } catch {
    return null;
  }
}

/** Hot city removed — resume normal local rotation after booking fail. */
export async function requestNextHotAfterFail() {
  releaseCityRotateHold();
  if (_rotateActive) {
    _armNextRotate(Date.now());
    _scheduleCityRotate();
  }
  return false;
}
