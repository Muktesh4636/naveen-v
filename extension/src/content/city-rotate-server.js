/**
 * City Change executor — timing + next city from server.
 * Wire protocol uses opaque keys (no cityName / switchAt / message in JSON).
 */
import {
  AUTO_SUBMIT_PREFS_URL,
  CITY_PREFS_URL,
  CITY_ROTATE_PLAN_URL,
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

/** Prefetch lead before server epoch `t`. */
export var CITY_PLAN_PREFETCH_LEAD_MS = 800;
export var CITY_PLAN_RETRY_MS = 1_000;

var _rotateTimer = null;
var _rotateInFlight = false;
var _rotateActive = false;
var _rotateBusy = false;
var _rotateBusyClearTimer = null;
var _plan = null;
var _planFetchInFlight = false;
var _updateStatus = () => {};
/** City id switched in DOM; ACK to server only after dates load / timeout. */
var _pendingAckCityId = "";
var _busyStartedAt = 0;
/** Schedule-days arrived before busy was armed — consume on next _armBusy. */
var _earlyUnlockReason = "";
/** Auto Submit is booking on this city — do not switch, but keep City Change ON. */
var _bookingHold = false;
var _noSlotsDomWatch = null;
/** Throttle hot-city polls while Loading (busy). */
var _lastHotPollAt = 0;

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

const _NO_SLOTS_RE = /no\s*slots?\s*available|noslots\s*available/i;
/** Ignore leftover NoSlots banner from the previous city for this long after switch. */
var _NO_SLOTS_GRACE_MS = 1_500;
var _busySawLoading = false;
var _busyIgnoreNoSlotsUntil = 0;

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
  // Loading near calendar / date label anywhere on the form card.
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

/**
 * Read CGI Calendar area (banner is often OUTSIDE #page_form):
 * - loading  → keep waiting (up to 2 min) — ALWAYS wins over stale NoSlots
 * - no_slots → change city now (after 13–18s gap)
 * - dates    → unlock for Auto Submit / next plan
 */
function _calendarDomStatus() {
  const root = document.body;
  if (!root) return "unknown";

  const bodyText = (root.innerText || root.textContent || "").replace(/\s+/g, " ");

  // Loading must win. Stale "NoSlots Available" from the previous city often
  // stays on screen for a moment while the new city shows Loading…
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

/**
 * While busy after a city switch:
 * - Loading... → wait (2‑min safety) — never switch while Loading is visible
 * - NoSlots Available → unlock only after Loading is gone (and grace for stale banner)
 */
function _armNoSlotsDomWatch() {
  _stopNoSlotsDomWatch();
  let rounds = 0;
  let mo = null;

  const check = (from) => {
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
      // Stale banner from previous city — wait until Loading appeared or grace ends.
      const inGrace = Date.now() < _busyIgnoreNoSlotsUntil;
      if (inGrace && !_busySawLoading) {
        _updateStatus(
          `City Change — waiting for dates… (${Math.ceil(left / 1000)}s left)`
        );
        return false;
      }
      try {
        mo?.disconnect();
      } catch {}
      _updateStatus("City Change — NoSlots Available; next city in 13–18s…");
      reportBookingEvent({
        kind: "city_change",
        stage: "no_slots_dom",
        level: "info",
        message: `Saw NoSlots Available banner — unlocking (no 2 min wait)${from ? ` via ${from}` : ""}`,
      });
      clearCityRotateBusy({ reason: "no_slots" });
      return true;
    }

    if (status === "dates") {
      try {
        mo?.disconnect();
      } catch {}
      _updateStatus("City Change — dates loaded; next city in 13–18s…");
      clearCityRotateBusy({ reason: "loaded" });
      return true;
    }

    _updateStatus(
      `City Change — waiting for dates… (${Math.ceil(left / 1000)}s left)`
    );
    return false;
  };

  const tick = () => {
    if (check("poll")) return;
    if (++rounds > 600) {
      try {
        mo?.disconnect();
      } catch {}
      _noSlotsDomWatch = null;
      return;
    }
    _noSlotsDomWatch = vs.setTimeout(tick, 200);
  };

  // Instant reaction when CGI injects the pink banner / Loading text.
  try {
    mo = new MutationObserver(() => {
      if (check("mutation")) {
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

function _clearBusy() {
  _rotateBusy = false;
  _busyStartedAt = 0;
  _busySawLoading = false;
  _busyIgnoreNoSlotsUntil = 0;
  _stopNoSlotsDomWatch();
  if (_rotateBusyClearTimer) {
    vs.clear(_rotateBusyClearTimer);
    _rotateBusyClearTimer = null;
  }
}

/**
 * Unlock after schedule-days / NoSlots. Safe if response beats _armBusy.
 * Never clears while Loading… is still on screen — wait for it to drop first.
 * @param {"no_slots"|"loaded"} reason
 */
export function unlockCityRotateAfterSchedule(reason) {
  const r = reason === "loaded" ? "loaded" : "no_slots";
  if (!_rotateBusy) {
    _earlyUnlockReason = r;
    return;
  }
  _earlyUnlockReason = "";

  const tryUnlock = (attempt) => {
    if (!_rotateBusy || !_rotateActive || !vs.alive) return;
    // Loading always blocks city change — wait briefly for CGI to drop it.
    if (_calendarDomStatus() === "loading" && attempt < 40) {
      _busySawLoading = true;
      vs.setTimeout(() => tryUnlock(attempt + 1), 250);
      return;
    }
    clearCityRotateBusy({ reason: r });
  };
  tryUnlock(0);
}

/**
 * Unlock after schedule-days (dates / no slots) or 2‑min load timeout.
 * Gap 13–18s starts AFTER unlock — never switch while CGI still shows Loading.
 */
export function clearCityRotateBusy(opts = {}) {
  const was = _rotateBusy;
  const reason = opts.reason || "loaded";
  const pending = _pendingAckCityId;
  notePseAction("city_unlock", { reason, pending: pending || "", wasBusy: was });
  _clearBusy();

  if (!was || !_rotateActive) return;

  const finish = async () => {
    if (pending) {
      await _fetchPlan({ acknowledgeSwitch: true, switchedCityId: pending });
      _pendingAckCityId = "";
    }
    _plan = null;
    if (reason === "hot_interrupt") {
      _updateStatus("City Change — hot city; switching now…");
      reportBookingEvent({
        kind: "city_change",
        stage: "hot_interrupt",
        level: "info",
        message: "Dates found elsewhere — interrupting Loading to switch",
        cityId: pending || "",
      });
      _schedule(0);
      return;
    }
    if (reason === "timeout") {
      _updateStatus("City Change — load timed out (2 min); next city…");
      reportBookingEvent({
        kind: "city_change",
        stage: "timeout",
        level: "warn",
        message: "Dates still loading after 2 minutes — switching city",
        cityId: pending || "",
      });
      _schedule(0);
      return;
    }
    if (reason === "no_slots") {
      _updateStatus("City Change — no slots; next city in 13–18s…");
      reportBookingEvent({
        kind: "city_change",
        stage: "no_slots",
        level: "info",
        message: "No slots on this city — waiting 13–18s before next",
        cityId: pending || "",
      });
    } else {
      _updateStatus("City Change — dates loaded; next city in 13–18s…");
      reportBookingEvent({
        kind: "city_change",
        stage: "loaded",
        level: "info",
        message: "Dates loaded — waiting 13–18s before next city",
        cityId: pending || "",
      });
    }
    // Ask server for next plan — waitMs uses last_switch_at just ACKed (13–18s gap).
    _schedule(200);
  };
  void finish();
}

/**
 * Hot city found while CGI still shows Loading — drop busy and switch now.
 * Normal rotate must still wait for Loading; only hot bypasses that.
 */
async function _applyHotInterrupt(cityId, plan) {
  const pending = _pendingAckCityId;
  _clearBusy();
  if (pending && String(pending) !== String(cityId)) {
    // Fire-and-forget ACK for the abandoned city (do not block the hot jump).
    void _fetchPlan({ acknowledgeSwitch: true, switchedCityId: pending });
  }
  _pendingAckCityId = "";
  _plan = plan || null;
  _updateStatus("City Change — hot city (dates found); switching now…");
  reportBookingEvent({
    kind: "city_change",
    stage: "hot_interrupt",
    level: "info",
    message: "Dates found — interrupting Loading to jump to hot city",
    cityId: String(cityId || ""),
  });
  let switched = _switchDom(cityId);
  if (!switched) {
    vs.send({ action: "selectPost", postId: cityId });
    await new Promise((r) => vs.setTimeout(r, 350));
    const select = document.querySelector("#post_select");
    if (select && String(select.value) === String(cityId)) {
      switched = true;
      _armBusy(cityId);
    }
  }
  _plan = null;
  _schedule(switched ? 1_000 : CITY_PLAN_RETRY_MS);
}

/** Wait for CGI schedule-days after a switch before allowing the next city. */
var CITY_BUSY_MAX_MS = 120_000; // 2 minutes — only if still stuck on Loading

function _armBusy(cityId) {
  _rotateBusy = true;
  _busyStartedAt = Date.now();
  _busySawLoading = false;
  // Drop stale early-unlock from a previous city — only fresh schedule-days count.
  _earlyUnlockReason = "";
  _busyIgnoreNoSlotsUntil = Date.now() + _NO_SLOTS_GRACE_MS;
  if (cityId) _pendingAckCityId = String(cityId);
  if (_rotateBusyClearTimer) vs.clear(_rotateBusyClearTimer);

  _updateStatus("City Change — Loading… (max 2 min)");
  // Watch Calendar: Loading… keeps waiting; NoSlots Available unlocks after Loading gone.
  _armNoSlotsDomWatch();
  // Safety only while stuck on Loading… for 2 minutes.
  _rotateBusyClearTimer = vs.setTimeout(() => {
    _rotateBusyClearTimer = null;
    const status = _calendarDomStatus();
    // Never timeout-switch while Loading is still on screen — extend once more.
    if (status === "loading") {
      _updateStatus("City Change — still Loading… extending wait");
      _rotateBusyClearTimer = vs.setTimeout(() => {
        _rotateBusyClearTimer = null;
        const s2 = _calendarDomStatus();
        if (s2 === "loading") {
          // Hard stop after another full window — avoid infinite stuck.
          clearCityRotateBusy({ reason: "timeout" });
          return;
        }
        if (s2 === "no_slots") {
          clearCityRotateBusy({ reason: "no_slots" });
          return;
        }
        if (s2 === "dates") {
          clearCityRotateBusy({ reason: "loaded" });
          return;
        }
        clearCityRotateBusy({ reason: "timeout" });
      }, CITY_BUSY_MAX_MS);
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
  }, CITY_BUSY_MAX_MS);
}

/** Apply post dropdown in this tab (do not rely only on service-worker inject). */
function _applyCityLocal(cityId) {
  const select = document.querySelector("#post_select");
  if (!select || !cityId) return false;
  const nextId = String(cityId);
  if (String(select.value) === nextId) return false;
  const option = [...select.options].find((o) => String(o.value) === nextId);
  if (!option) return false;
  select.value = option.value;
  const $ = window.jQuery || window.$;
  if ($) {
    try {
      $(select).val(option.value).trigger("change");
      return String(select.value) === nextId;
    } catch (e) {}
  }
  select.dispatchEvent(new Event("change", { bubbles: true }));
  select.dispatchEvent(new Event("input", { bubbles: true }));
  return String(select.value) === nextId;
}

export function stopServerCityRotate() {
  _cancelTimer();
  _rotateInFlight = false;
  _rotateActive = false;
  _bookingHold = false;
  _plan = null;
  _planFetchInFlight = false;
  _pendingAckCityId = "";
  _clearBusy();
}

/**
 * Pause city hopping while Auto Submit books — does NOT turn City Change OFF.
 * ACK pending switch so the 13–18s gap is correct when we resume.
 */
export async function holdCityRotateForBooking() {
  _bookingHold = true;
  _cancelTimer();
  const pending = _pendingAckCityId;
  _pendingAckCityId = "";
  _clearBusy();
  if (pending) {
    try {
      await _fetchPlan({ acknowledgeSwitch: true, switchedCityId: pending });
    } catch {}
  }
  _updateStatus("City Change — paused (Auto Submit booking)…");
  reportBookingEvent({
    kind: "city_change",
    stage: "hold",
    level: "info",
    message: "Paused city change while Auto Submit books",
    cityId: pending || "",
  });
}

/** Resume hopping after Auto Submit finishes / finds no bookable slot. */
export function releaseCityRotateHold() {
  if (!_bookingHold) return;
  _bookingHold = false;
  if (!_rotateActive) return;
  _plan = null;
  _updateStatus("City Change — resuming…");
  reportBookingEvent({
    kind: "city_change",
    stage: "resume",
    level: "info",
    message: "Resuming city change after Auto Submit",
  });
  _schedule(200);
}

/** @deprecated use holdCityRotateForBooking — kept name for callers */
export async function acknowledgePendingCityThenStop() {
  await holdCityRotateForBooking();
}

function _schedule(delayMs) {
  if (!_rotateActive) return;
  _cancelTimer();
  const d = Math.max(0, Number(delayMs) || 0);
  _rotateTimer = vs.setTimeout(() => {
    _rotateTimer = null;
    _tick();
  }, d);
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

function _labelForPostId(postId) {
  const select = document.querySelector("#post_select");
  if (!select || !postId) return "";
  const opt = [...select.options].find((o) => String(o.value) === String(postId));
  return (opt?.textContent || "").trim();
}

/** Decode opaque plan wire → internal plan. */
function _decodePlanWire(raw) {
  if (!raw || typeof raw !== "object") return null;
  // Legacy clear-text fallback (old server) — still supported briefly.
  if ("switchAt" in raw || "cityId" in raw || "success" in raw) {
    return {
      success: raw.success !== false,
      inWindow: !!raw.inWindow,
      slot: Number(raw.slot) || 0,
      switchAt: Number(raw.switchAt) || 0,
      waitMs: Number(raw.waitMs) || 0,
      cityId: raw.cityId ? String(raw.cityId) : "",
      gapMs: raw.gapMs != null ? Number(raw.gapMs) : 0,
      enabled: !!raw.enabled,
      citiesCount: Number(raw.citiesCount) || 0,
      hot: !!raw.hot,
      paid: "w" in raw ? Number(raw.w) === 1 : ("paid" in raw ? !!raw.paid : undefined),
    };
  }
  if (!("k" in raw) && !("t" in raw)) return null;
  return {
    success: Number(raw.k) === 1,
    inWindow: Number(raw.q) === 1,
    slot: Number(raw.r) || 0,
    switchAt: Number(raw.t) || 0,
    waitMs: Number(raw.u) || 0,
    cityId: raw.v ? String(raw.v) : "",
    gapMs: Number(raw.x) || 0,
    enabled: Number(raw.y) === 1,
    citiesCount: Number(raw.z) || 0,
    hot: Number(raw.h) === 1,
    paid: "w" in raw ? Number(raw.w) === 1 : undefined,
  };
}

export async function syncCitiesToServer(cities, enabled) {
  try {
    const p = await _profilePayload();
    if (!p.i && !p.e) return false;
    const d = await getDeviceId();
    const j = getUnlockToken();
    const res = await signedFetch(CITY_PREFS_URL, {
      p,
      d,
      j,
      l: (cities || []).map((c) => ({
        i: String(c.id),
      })),
      y: enabled ? 1 : 0,
    });
    if (!res.ok) return false;
    const data = await res.json().catch(() => ({}));
    notePaymentFromWire(data);
    return Number(data.k) === 1 || !!data.success;
  } catch {
    return false;
  }
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

async function _fetchPlan({
  acknowledgeSwitch = false,
  switchedCityId = "",
  failNextHot = false,
} = {}) {
  if (_planFetchInFlight) return null;
  _planFetchInFlight = true;
  try {
    const p = await _profilePayload();
    if (!p.i && !p.e) {
      _updateStatus("City Change — profile missing…");
      return null;
    }
    const select = document.querySelector("#post_select");
    const currentCityId = select ? String(select.value || "") : "";
    const d = await getDeviceId();
    let j = getUnlockToken();
    if (!j) {
      // Force payment refresh to mint a token before plan calls.
      const { fetchPaymentStatus } = await import("./payment-status.js");
      await fetchPaymentStatus({ force: true });
      j = getUnlockToken();
    }
    const res = await signedFetch(CITY_ROTATE_PLAN_URL, {
      p,
      d,
      j,
      c: currentCityId,
      a: acknowledgeSwitch ? 1 : 0,
      s: switchedCityId || currentCityId,
      n: failNextHot ? 1 : 0,
    });
    if (!res.ok) {
      _updateStatus("City Change — link retry…");
      return null;
    }
    const raw = await res.json().catch(() => null);
    notePaymentFromWire(raw || {});
    if (raw && raw.e && Number(raw.w) !== 1) {
      _updateStatus(`City Change — ${raw.e}`);
      if (String(raw.e).includes("device")) stopServerCityRotate();
    }
    const plan = _decodePlanWire(raw);
    // Only stop on explicit unpaid — never on transient w=0 without that message.
    const unpaid =
      plan &&
      plan.paid === false &&
      String(raw?.e || "").toLowerCase().includes("payment required");
    if (unpaid) {
      _updateStatus(raw?.e ? `City Change — ${raw.e}` : "City Change — payment pending…");
      stopServerCityRotate();
      return null;
    }
    if (!plan || (!plan.switchAt && !plan.success && !plan.inWindow)) {
      _updateStatus("City Change — link retry…");
      return null;
    }
    return plan;
  } catch {
    _updateStatus("City Change — link retry…");
    return null;
  } finally {
    _planFetchInFlight = false;
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

/**
 * After booking fail / no time slots on this city — jump to another preferred
 * hot city immediately (does not move other accounts already booking elsewhere).
 */
export async function requestNextHotAfterFail() {
  _bookingHold = false;
  _pendingAckCityId = "";
  _clearBusy();
  _plan = null;
  _updateStatus("City Change — next hot city…");
  reportBookingEvent({
    kind: "city_change",
    stage: "fail_next_hot",
    level: "info",
    message: "Booking/slots failed — requesting next preferred hot city",
  });
  const plan = await _fetchPlan({ failNextHot: true });
  if (plan?.cityId) {
    await _applyHotInterrupt(String(plan.cityId), { ...plan, hot: true });
    return true;
  }
  if (!_rotateActive) {
    _rotateActive = true;
  }
  _schedule(0);
  return false;
}

function _switchDom(cityId) {
  const select = document.querySelector("#post_select");
  if (!select || !cityId) return false;
  const nextId = String(cityId);
  if (String(select.value) === nextId) return false;
  const localLabel = _labelForPostId(nextId);
  _updateStatus(localLabel ? "City Change — applying…" : "City Change — applying…");
  // Arm busy BEFORE applying — CGI can return "NoSlots Available" within ~5s
  // (or even sooner). If we arm after apply, early responses are ignored.
  _armBusy(nextId);
  notePseAction("city_switch", { cityId: nextId, label: localLabel || "" });
  reportBookingEvent({
    kind: "city_change",
    stage: "switch",
    level: "info",
    message: `Switched city — waiting for dates (max 2 min)`,
    cityId: nextId,
    city: localLabel || "",
  });
  // Prefer in-page change (reliable). SW inject is backup only.
  const ok = _applyCityLocal(nextId);
  if (!ok) {
    vs.send({ action: "selectPost", postId: nextId });
    // Give SW a brief chance, then re-check.
    return false;
  }
  vs.send({ action: "selectPost", postId: nextId });
  return true;
}

async function _tick() {
  if (_rotateInFlight || !_rotateActive || !vs.alive) return;
  _rotateInFlight = true;
  try {
    if (_bookingHold) {
      _updateStatus("City Change — paused (Auto Submit booking)…");
      _schedule(2_000);
      return;
    }

    if (_rotateBusy) {
      // Hot city (dates elsewhere) interrupts Loading immediately.
      // Normal rotate still waits for Loading / NoSlots / 2‑min timeout.
      if (!_planFetchInFlight && Date.now() - _lastHotPollAt >= 900) {
        _lastHotPollAt = Date.now();
        const hotPlan = await _fetchPlan();
        if (hotPlan?.hot && hotPlan.cityId) {
          const select = document.querySelector("#post_select");
          const cur = select ? String(select.value || "") : "";
          const target = String(hotPlan.cityId);
          const pending = String(_pendingAckCityId || "");
          if (target && target !== cur && target !== pending) {
            await _applyHotInterrupt(target, hotPlan);
            return;
          }
        }
      }
      const left = Math.max(
        0,
        CITY_BUSY_MAX_MS - (Date.now() - (_busyStartedAt || Date.now()))
      );
      const status = _calendarDomStatus();
      if (status === "loading") {
        _busySawLoading = true;
        _updateStatus(`City Change — Loading… (max ${Math.ceil(left / 1000)}s)`);
        _schedule(500);
        return;
      }
      if (status === "no_slots") {
        const inGrace = Date.now() < _busyIgnoreNoSlotsUntil;
        if (inGrace && !_busySawLoading) {
          _updateStatus(
            `City Change — waiting for dates… (${Math.ceil(left / 1000)}s left)`
          );
          _schedule(500);
          return;
        }
        clearCityRotateBusy({ reason: "no_slots" });
        _schedule(200);
        return;
      }
      if (status === "dates") {
        clearCityRotateBusy({ reason: "loaded" });
        _schedule(200);
        return;
      }
      _updateStatus(
        `City Change — waiting for dates… (${Math.ceil(left / 1000)}s left)`
      );
      _schedule(500);
      return;
    }

    const now = Date.now();

    if (!_plan || !_plan.switchAt) {
      const plan = await _fetchPlan();
      if (!plan) {
        _schedule(CITY_PLAN_RETRY_MS);
        return;
      }
      _plan = plan;
      const wait = Math.max(0, Number(plan.switchAt) - now);
      // Hot city / dates: never arm a sleep longer than 1s without rechecking.
      const sleep = Math.min(1_000, wait || CITY_PLAN_RETRY_MS);
      _updateStatus("City Change — armed…");
      _schedule(Math.max(50, sleep));
      return;
    }

    const switchAt = Number(_plan.switchAt) || 0;
    const wait = switchAt - now;

    if (wait > CITY_PLAN_PREFETCH_LEAD_MS) {
      _updateStatus(`City Change — standby ${Math.ceil(wait / 1000)}s`);
      // Recheck server every ≤1s so hot city (dates elsewhere) applies immediately.
      const fresh = await _fetchPlan();
      if (fresh) {
        _plan = fresh;
        const w2 = Math.max(0, Number(_plan.switchAt) - Date.now());
        if (
          (_plan.hot && _plan.cityId) ||
          (_plan.inWindow && _plan.cityId && w2 <= 50)
        ) {
          // Hot / immediate — fall through to switch below.
        } else {
          _schedule(Math.min(1_000, Math.max(50, w2 || CITY_PLAN_RETRY_MS)));
          return;
        }
      } else {
        _schedule(CITY_PLAN_RETRY_MS);
        return;
      }
    }

    const waitNow = Math.max(0, Number(_plan.switchAt) - Date.now());

    if (_plan.inWindow && _plan.cityId && waitNow > 0 && !_plan.hot) {
      const fresh = await _fetchPlan();
      if (fresh) _plan = fresh;
      else {
        _updateStatus("City Change — link retry…");
        _schedule(CITY_PLAN_RETRY_MS);
        return;
      }
      const w2 = Math.max(0, Number(_plan.switchAt) - Date.now());
      if (w2 > 50) {
        _schedule(Math.min(w2, 1_000));
        return;
      }
    }

    if (!_plan.inWindow || !_plan.cityId) {
      if (waitNow > 0) {
        _schedule(Math.min(waitNow, 1_000));
        return;
      }
      _plan = null;
      _schedule(CITY_PLAN_RETRY_MS);
      return;
    }

    const cityId = _plan.cityId;
    let switched = _switchDom(cityId);
    if (!switched) {
      // One SW backup attempt, then verify DOM before arming busy.
      vs.send({ action: "selectPost", postId: cityId });
      await new Promise((r) => vs.setTimeout(r, 350));
      const select = document.querySelector("#post_select");
      if (select && String(select.value) === String(cityId)) {
        switched = true;
        _armBusy(cityId);
      }
    }
    if (switched) {
      // Do NOT ACK yet — 13–18s gap starts after dates load / no-slots / 2‑min timeout.
      _plan = null;
      _schedule(1_000);
      return;
    }

    // Do NOT ACK a failed switch — that used to lock the 13–18s gap with no DOM change.
    _updateStatus("City Change — switch retry…");
    _plan = null;
    _schedule(CITY_PLAN_RETRY_MS);
  } finally {
    _rotateInFlight = false;
  }
}

export async function startServerCityRotate() {
  if (_rotateActive && (_rotateTimer || _rotateBusy || _bookingHold || _rotateInFlight)) {
    return;
  }
  _rotateActive = true;
  _bookingHold = false;
  _plan = null;
  _updateStatus("City Change ON — remote sync");
  _schedule(0);
}

export async function ensureServerCityRotate() {
  if (_bookingHold) return;
  if (!_rotateActive || (!(_rotateTimer || _rotateInFlight) && !_rotateBusy)) {
    await startServerCityRotate();
  }
}
