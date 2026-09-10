/**
 * City Change executor — timing + next city come from the server.
 * This module only: prefetch plan, retry on failure, switch #post_select.
 */
import { CITY_PREFS_URL, CITY_ROTATE_PLAN_URL, getProfile } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";
import { T } from "../shared/token.js";

/** Ask server this many ms before switchAt so the click has no network lag. */
export var CITY_PLAN_PREFETCH_LEAD_MS = 4_000;
/** If plan fetch fails, keep requesting. */
export var CITY_PLAN_RETRY_MS = 2_000;

var _rotateTimer = null;
var _rotateInFlight = false;
var _rotateActive = false;
var _rotateBusy = false;
var _rotateBusyClearTimer = null;
var _plan = null; // last successful server plan
var _planFetchInFlight = false;
var _updateStatus = () => {};
var _onSwitched = null;

export function setCityRotateStatusSink(fn) {
  _updateStatus = typeof fn === "function" ? fn : () => {};
}

export function setCityRotateBusyHooks({ isBusy, setBusyClear } = {}) {
  // optional external busy bridge — unused; local busy below
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

function _armBusy(label) {
  _rotateBusy = true;
  if (_rotateBusyClearTimer) vs.clear(_rotateBusyClearTimer);
  _updateStatus(`City Change — loading dates for ${label || "city"}…`);
  _rotateBusyClearTimer = vs.setTimeout(() => {
    _rotateBusyClearTimer = null;
    _updateStatus(`City Change — no date response for ${label || "city"}; requesting next plan…`);
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
    id: profile.id || "",
    email: profile.email || "",
    name: profile.name || "",
    visa: profile.visa || "",
  };
}

export async function syncCitiesToServer(cities, enabled) {
  try {
    const profile = await _profilePayload();
    if (!profile.id && !profile.email) return false;
    const res = await fetch(CITY_PREFS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile,
        cities: (cities || []).map((c) => ({
          id: String(c.id),
          name: String(c.name || c.id),
        })),
        enabled: !!enabled,
      }),
    });
    if (!res.ok) return false;
    const data = await res.json().catch(() => ({}));
    return !!data.success;
  } catch {
    return false;
  }
}

async function _fetchPlan({ acknowledgeSwitch = false, switchedCityId = "" } = {}) {
  if (_planFetchInFlight) return null;
  _planFetchInFlight = true;
  try {
    const profile = await _profilePayload();
    if (!profile.id && !profile.email) {
      _updateStatus("City Change — no applicant profile; open a logged-in page.");
      return null;
    }
    const select = document.querySelector("#post_select");
    const currentCityId = select ? String(select.value || "") : "";
    const res = await fetch(CITY_ROTATE_PLAN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile,
        currentCityId,
        acknowledgeSwitch: !!acknowledgeSwitch,
        switchedCityId: switchedCityId || currentCityId,
      }),
    });
    if (!res.ok) {
      _updateStatus(`City Change — server plan HTTP ${res.status}; retrying…`);
      return null;
    }
    const data = await res.json().catch(() => null);
    if (!data || data.success === false && !data.inWindow && !data.switchAt) {
      _updateStatus(data?.message || "City Change — server plan failed; retrying…");
      return null;
    }
    return data;
  } catch {
    _updateStatus("City Change — cannot reach server for plan; retrying…");
    return null;
  } finally {
    _planFetchInFlight = false;
  }
}

function _switchDom(cityId, label) {
  const select = document.querySelector("#post_select");
  if (!select || !cityId) return false;
  const nextId = String(cityId);
  if (String(select.value) === nextId) return false;
  _armBusy(label || cityId);
  _updateStatus(`Switching city → ${label || cityId}… (server plan)`);
  vs.send({ action: "selectPost", postId: nextId });
  return true;
}

async function _tick() {
  if (_rotateInFlight || !_rotateActive || !vs.alive) return;
  _rotateInFlight = true;
  try {
    if (_rotateBusy) {
      _updateStatus("City Change — waiting for dates / no-slots before next server plan…");
      _schedule(1_000);
      return;
    }

    const now = Date.now();

    // No plan yet — keep requesting server.
    if (!_plan || !_plan.switchAt) {
      const plan = await _fetchPlan();
      if (!plan) {
        _schedule(CITY_PLAN_RETRY_MS);
        return;
      }
      _plan = plan;
      _updateStatus(plan.message || "City Change — plan received from server");
      const wait = Math.max(0, Number(plan.switchAt) - now);
      const prefetchIn = Math.max(0, wait - CITY_PLAN_PREFETCH_LEAD_MS);
      _schedule(Math.min(prefetchIn || wait || CITY_PLAN_RETRY_MS, wait || CITY_PLAN_RETRY_MS));
      return;
    }

    const switchAt = Number(_plan.switchAt) || 0;
    const wait = switchAt - now;

    // Prefetch window: refresh plan from server ≥4s before switch.
    if (wait > CITY_PLAN_PREFETCH_LEAD_MS) {
      _updateStatus(
        _plan.inWindow && _plan.cityName
          ? `City Change — server: ${_plan.cityName} in ${Math.ceil(wait / 1000)}s`
          : (_plan.message || `City Change — waiting ${Math.ceil(wait / 1000)}s (server)`)
      );
      _schedule(Math.max(200, wait - CITY_PLAN_PREFETCH_LEAD_MS));
      return;
    }

    // Inside last 4s (or overdue): ensure we have a fresh plan with a city.
    if (_plan.inWindow && _plan.cityId && wait > 0) {
      // Soft refresh once in prefetch window.
      const fresh = await _fetchPlan();
      if (fresh) {
        _plan = fresh;
      } else {
        _updateStatus("City Change — prefetch missed; requesting server again…");
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
      // Outside window or no city — drop plan and ask again near switchAt / retry.
      if (wait > 0) {
        _schedule(Math.min(wait, 5_000));
        return;
      }
      _plan = null;
      _schedule(CITY_PLAN_RETRY_MS);
      return;
    }

    // Execute switch now (plan already in memory — no lag).
    const cityId = _plan.cityId;
    const cityName = _plan.cityName || cityId;
    const switched = _switchDom(cityId, cityName);
    if (switched) {
      await _fetchPlan({ acknowledgeSwitch: true, switchedCityId: cityId });
      _plan = null;
      // Next plan after dates load (clearCityRotateBusy) or busy timeout.
      _schedule(1_000);
      return;
    }

    // Already on that city — acknowledge and get a new plan.
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
  _updateStatus("City Change ON — timing & cities from server (prefetch 4s early)");
  _schedule(0);
}

export async function ensureServerCityRotate() {
  if (!_rotateActive || (!(_rotateTimer || _rotateInFlight) && !_rotateBusy)) {
    await startServerCityRotate();
  }
}
