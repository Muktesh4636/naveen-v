/**
 * PSE0501 / soft-session diagnostics.
 * Records alert + AJAX errors + recovery/city-change context to Booking logs
 * so we can analyze intermittent failures later.
 */
import { storageGet, storageSet } from "../shared/runtime.js";
import { vs } from "../shared/lifecycle.js";
import { reportBookingEvent, flushBookingEvents } from "./booking-log.js";
import {
  isCityRotateActive,
  isCityRotateBusy,
  isCityRotateHeld,
} from "./city-rotate-server.js";
import { isCloudflareChallenge } from "./cloudflare-tick.js";

var ACTION_RING_KEY = "pseActionRing";
var INCIDENT_KEY = "pseIncidents";
var RECOVERY_KEY = "sessionRecovery";
var MAX_ACTIONS = 40;
var MAX_INCIDENTS = 30;
var _memActions = [];
var _lastReportAt = 0;
var _dedupMs = 2500;

function _pageCity() {
  const select = document.querySelector("#post_select");
  if (!select) return { id: "", name: "" };
  return {
    id: String(select.value || ""),
    name: (select.options?.[select.selectedIndex]?.textContent || "").trim(),
  };
}

function _snip(text, n = 180) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, n);
}

function _pageHints() {
  const body = _snip(document.body?.innerText || "", 400);
  return {
    hasPassword: !!document.querySelector("input[type='password']"),
    hasKba: !!document.querySelector("#kba1_response, #kba2_response"),
    hasUsername: !!document.querySelector(".username, #signInName, #signInNameReadOnly"),
    hasPostSelect: !!document.querySelector("#post_select"),
    hasDatepicker: !!document.querySelector("#datepicker"),
    loadingText: /loading/i.test(body),
    waitingRoom: /waiting room|please wait/i.test(body),
    noSlotsBanner: /no\s*slots?\s*available/i.test(body),
    bodyHead: body.slice(0, 160),
  };
}

/**
 * Push a breadcrumb into the local ring (also synced to storage).
 * Call this around city change / recovery / schedule actions.
 */
export function notePseAction(action, detail = null) {
  const entry = {
    a: String(action || "").slice(0, 48),
    t: Date.now(),
    p: String(location.pathname || "").slice(0, 120),
    x: detail && typeof detail === "object" ? detail : detail != null ? { v: detail } : {},
  };
  _memActions.push(entry);
  if (_memActions.length > MAX_ACTIONS) {
    _memActions.splice(0, _memActions.length - MAX_ACTIONS);
  }
  // Fire-and-forget persist (best effort)
  storageGet(ACTION_RING_KEY)
    .then((store) => {
      const ring = Array.isArray(store[ACTION_RING_KEY]) ? store[ACTION_RING_KEY] : [];
      ring.push(entry);
      while (ring.length > MAX_ACTIONS) ring.shift();
      return storageSet({ [ACTION_RING_KEY]: ring });
    })
    .catch(() => {});
}

async function _loadRing() {
  try {
    const store = await storageGet(ACTION_RING_KEY);
    const ring = Array.isArray(store[ACTION_RING_KEY]) ? store[ACTION_RING_KEY] : [];
    // Prefer longer of mem vs storage
    return (_memActions.length >= ring.length ? _memActions : ring).slice(-MAX_ACTIONS);
  } catch {
    return _memActions.slice(-MAX_ACTIONS);
  }
}

async function _buildSnapshot(extra = {}) {
  const city = _pageCity();
  let recovery = null;
  try {
    recovery = (await storageGet(RECOVERY_KEY))[RECOVERY_KEY] || null;
  } catch {}
  const actions = await _loadRing();
  return {
    href: String(location.href || "").slice(0, 512),
    path: String(location.pathname || "").slice(0, 200),
    title: _snip(document.title, 120),
    vis: document.visibilityState,
    ready: document.readyState,
    host: location.host,
    cityId: city.id,
    cityName: city.name,
    rotateActive: !!isCityRotateActive(),
    rotateBusy: !!isCityRotateBusy(),
    rotateHeld: !!isCityRotateHeld(),
    recoveryActive: !!recovery?.active,
    recoveryStartedAt: recovery?.startedAt || 0,
    recoveryOfcUrl: recovery?.ofcUrl || "",
    cf: !!isCloudflareChallenge(),
    hints: _pageHints(),
    recentActions: actions,
    ts: Date.now(),
    ...extra,
  };
}

async function _persistIncident(snapshot) {
  try {
    const store = await storageGet(INCIDENT_KEY);
    const list = Array.isArray(store[INCIDENT_KEY]) ? store[INCIDENT_KEY] : [];
    list.unshift({
      at: snapshot.ts,
      source: snapshot.source || "",
      path: snapshot.path,
      city: snapshot.cityName,
      msg: snapshot.errorText || "",
    });
    while (list.length > MAX_INCIDENTS) list.pop();
    await storageSet({ [INCIDENT_KEY]: list });
  } catch {}
}

/**
 * Record a PSE0501 / soft-session incident to admin Booking logs.
 * @param {object} opts
 * @param {string} opts.source alert|ajax_days|ajax_entries|recovery|other
 * @param {string} [opts.stage]
 * @param {string} [opts.message]
 * @param {string} [opts.errorText]
 * @param {object} [opts.extra]
 */
export async function recordPseIncident({
  source = "other",
  stage = "hit",
  message = "",
  errorText = "",
  level = "error",
  extra = null,
} = {}) {
  const now = Date.now();
  // Soft dedupe identical bursts (alert + ajax often fire together)
  if (now - _lastReportAt < _dedupMs && source !== "recovery") {
    notePseAction("pse_deduped", { source, stage });
    return;
  }
  _lastReportAt = now;

  notePseAction("pse_incident", { source, stage });

  const snapshot = await _buildSnapshot({
    source,
    stage,
    errorText: _snip(errorText || message, 500),
    extra: extra && typeof extra === "object" ? extra : {},
  });
  await _persistIncident(snapshot);

  const city = _pageCity();
  reportBookingEvent({
    kind: "pse0501",
    stage: String(stage || source).slice(0, 32),
    level,
    message:
      message ||
      `PSE0501 via ${source} · ${city.name || "—"} · ${snapshot.path} · rotate=${
        snapshot.rotateActive ? "on" : "off"
      }/${snapshot.rotateBusy ? "busy" : "idle"} · recovery=${
        snapshot.recoveryActive ? "yes" : "no"
      } · cf=${snapshot.cf ? "yes" : "no"}`,
    city: city.name,
    cityId: city.id,
    detail: snapshot,
  });
  void flushBookingEvents();
}

/** Convenience: schedule-days HasError / PSE text. */
export function recordPseFromScheduleDays({
  hasError,
  errorText,
  daysLen,
  postId,
  postName,
} = {}) {
  const text = String(errorText || "");
  const isPse =
    hasError ||
    /PSE0501|unable to load appointment available days|unable to load/i.test(text);
  if (!isPse) return;
  void recordPseIncident({
    source: "ajax_days",
    stage: hasError ? "has_error" : "error_text",
    message: text || "schedule-days HasError",
    errorText: text,
    extra: {
      hasError: !!hasError,
      daysLen: Number(daysLen) || 0,
      postId: postId || "",
      postName: postName || "",
    },
  });
}

export function recordPseRecoveryStep(stage, detail = null) {
  notePseAction(`recovery:${stage}`, detail);
  // Full server rows only for milestones — avoid 1.2s Home-loop spam.
  if (!/^(start|done|return|fail|no_home|alert)$/i.test(String(stage || ""))) {
    return;
  }
  void recordPseIncident({
    source: "recovery",
    stage,
    level: stage === "start" || stage === "fail" ? "warn" : "info",
    message: `PSE recovery · ${stage}`,
    extra: detail && typeof detail === "object" ? detail : {},
  });
}
