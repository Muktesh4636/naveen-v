/**
 * City Change executor — timing + next city from server.
 * Wire protocol uses opaque keys (no cityName / switchAt / message in JSON).
 */
import { CITY_PREFS_URL, CITY_ROTATE_PLAN_URL, getProfile } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";

/** Prefetch lead before server epoch `t`. */
export var CITY_PLAN_PREFETCH_LEAD_MS = 4_000;
export var CITY_PLAN_RETRY_MS = 2_000;

var _rotateTimer = null;
var _rotateInFlight = false;
var _rotateActive = false;
var _rotateBusy = false;
var _rotateBusyClearTimer = null;
var _plan = null;
var _planFetchInFlight = false;
var _updateStatus = () => {};

export function setCityRotateStatusSink(fn) {
  _updateStatus = typeof fn === "function" ? fn : () => {};
}

export function isCityRotateActive() {
  return _rotateActive;
}

export function isCityRotateBusy() {
  return _rotateBusy;
}

function _cancelTimer() {
  if (_rotateTimer) {
    vs.clear(_rotateTimer);
    _rotateTimer = null;
  }
}

function _clearBusy() {
  _rotateBusy = false;
  if (_rotateBusyClearTimer) {
    vs.clear(_rotateBusyClearTimer);
    _rotateBusyClearTimer = null;
  }
}

export function clearCityRotateBusy() {
  const was = _rotateBusy;
  _clearBusy();
  if (was && _rotateActive) {
    _plan = null;
    _schedule(0);
  }
}

function _armBusy() {
  _rotateBusy = true;
  if (_rotateBusyClearTimer) vs.clear(_rotateBusyClearTimer);
  _updateStatus("City Change — syncing…");
  _rotateBusyClearTimer = vs.setTimeout(() => {
    _rotateBusyClearTimer = null;
    _updateStatus("City Change — sync retry…");
    clearCityRotateBusy();
  }, 40_000);
}

export function stopServerCityRotate() {
  _cancelTimer();
  _rotateInFlight = false;
  _rotateActive = false;
  _plan = null;
  _planFetchInFlight = false;
  _clearBusy();
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
  const profile = (await getProfile()) || {};
  return {
    i: profile.id || "",
    e: profile.email || "",
    n: profile.name || "",
    v: profile.visa || "",
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
  };
}

export async function syncCitiesToServer(cities, enabled) {
  try {
    const p = await _profilePayload();
    if (!p.i && !p.e) return false;
    const res = await fetch(CITY_PREFS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        p,
        l: (cities || []).map((c) => ({
          i: String(c.id),
        })),
        y: enabled ? 1 : 0,
      }),
    });
    if (!res.ok) return false;
    const data = await res.json().catch(() => ({}));
    return Number(data.k) === 1 || !!data.success;
  } catch {
    return false;
  }
}

async function _fetchPlan({ acknowledgeSwitch = false, switchedCityId = "" } = {}) {
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
    const res = await fetch(CITY_ROTATE_PLAN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        p,
        c: currentCityId,
        a: acknowledgeSwitch ? 1 : 0,
        s: switchedCityId || currentCityId,
      }),
    });
    if (!res.ok) {
      _updateStatus("City Change — link retry…");
      return null;
    }
    const raw = await res.json().catch(() => null);
    const plan = _decodePlanWire(raw);
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

function _switchDom(cityId) {
  const select = document.querySelector("#post_select");
  if (!select || !cityId) return false;
  const nextId = String(cityId);
  if (String(select.value) === nextId) return false;
  _armBusy();
  const localLabel = _labelForPostId(nextId);
  _updateStatus(localLabel ? `City Change — applying…` : "City Change — applying…");
  vs.send({ action: "selectPost", postId: nextId });
  return true;
}

async function _tick() {
  if (_rotateInFlight || !_rotateActive || !vs.alive) return;
  _rotateInFlight = true;
  try {
    if (_rotateBusy) {
      _updateStatus("City Change — syncing…");
      _schedule(1_000);
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
      const prefetchIn = Math.max(0, wait - CITY_PLAN_PREFETCH_LEAD_MS);
      _updateStatus("City Change — armed…");
      _schedule(Math.min(prefetchIn || wait || CITY_PLAN_RETRY_MS, wait || CITY_PLAN_RETRY_MS));
      return;
    }

    const switchAt = Number(_plan.switchAt) || 0;
    const wait = switchAt - now;

    if (wait > CITY_PLAN_PREFETCH_LEAD_MS) {
      _updateStatus(`City Change — standby ${Math.ceil(wait / 1000)}s`);
      _schedule(Math.max(200, wait - CITY_PLAN_PREFETCH_LEAD_MS));
      return;
    }

    if (_plan.inWindow && _plan.cityId && wait > 0) {
      const fresh = await _fetchPlan();
      if (fresh) _plan = fresh;
      else {
        _updateStatus("City Change — link retry…");
        _schedule(CITY_PLAN_RETRY_MS);
        return;
      }
      const w2 = Math.max(0, Number(_plan.switchAt) - Date.now());
      if (w2 > 50) {
        _schedule(w2);
        return;
      }
    }

    if (!_plan.inWindow || !_plan.cityId) {
      if (wait > 0) {
        _schedule(Math.min(wait, 5_000));
        return;
      }
      _plan = null;
      _schedule(CITY_PLAN_RETRY_MS);
      return;
    }

    const cityId = _plan.cityId;
    const switched = _switchDom(cityId);
    if (switched) {
      await _fetchPlan({ acknowledgeSwitch: true, switchedCityId: cityId });
      _plan = null;
      _schedule(1_000);
      return;
    }

    await _fetchPlan({ acknowledgeSwitch: true, switchedCityId: cityId });
    _plan = null;
    _schedule(CITY_PLAN_RETRY_MS);
  } finally {
    _rotateInFlight = false;
  }
}

export async function startServerCityRotate() {
  if (_rotateActive && _rotateTimer) return;
  _rotateActive = true;
  _plan = null;
  _updateStatus("City Change ON — remote sync");
  _schedule(0);
}

export async function ensureServerCityRotate() {
  if (!_rotateActive || (!(_rotateTimer || _rotateInFlight) && !_rotateBusy)) {
    await startServerCityRotate();
  }
}
