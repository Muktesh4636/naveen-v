import { SITE_URL, getProfile } from "./config.js";
import { storageGet, storageSet } from "./runtime.js";

/**
 * Extension event log: every status / date / pick / Submit / error / hop / login event.
 * Kept locally (last RING_MAX) and uploaded to the server panel every 10 minutes.
 * Never awaited by callers — logging must not slow booking.
 */

var LOG_URL = `${SITE_URL}/contribute/logs`;
var RING_KEY = "extLogRing";
var RING_MAX = 1000;
var FLUSH_MS = 10 * 60_000;
var MAX_BATCH = 200;
// Upload early only if this many events pile up before the 10-minute tick.
var EARLY_FLUSH_AT = 1500;
var QUEUE_MAX = 5000;
// Unsent events survive same-tab reloads / city hops via sessionStorage.
var CARRY_KEY = "vsExtLogCarry";
// Collapse only near-identical repeats (e.g. countdown ticks) within this window.
var COLLAPSE_MS = 10_000;

var _queue = [];
var _pendingRing = [];
var _timer = null;
var _last = null;
var _version = "";
var _bound = false;

function _manifestVersion() {
  if (_version) return _version;
  try {
    _version = chrome.runtime.getManifest().version || "";
  } catch {
    _version = "";
  }
  return _version;
}

function _cityName() {
  try {
    const sel = document.querySelector("#post_select");
    if (!sel) return "";
    return (
      sel.selectedOptions?.[0]?.textContent?.trim() ||
      sel.options?.[sel.selectedIndex]?.textContent?.trim() ||
      ""
    );
  } catch {
    return "";
  }
}

function _pageName() {
  try {
    const host = location.hostname;
    if (/b2clogin/i.test(host)) return "login";
    const p = location.pathname.toLowerCase();
    if (/ofc-schedule|schedule/.test(p)) return "schedule";
    if (/home|^\/(en-us\/?)?$/.test(p)) return "home";
    return p.split("/").filter(Boolean).slice(-1)[0]?.slice(0, 32) || host.slice(0, 32);
  } catch {
    return "";
  }
}

function _shape(msg) {
  return String(msg).replace(/\d+/g, "#");
}

export function logEvent(kind, msg, data = {}, level = "info") {
  try {
    const text = String(msg ?? "").slice(0, 2000);
    const now = Date.now();
    const shape = _shape(text);
    if (_last && _last.kind === kind && _last.shape === shape && now - _last.at < COLLAPSE_MS) {
      _last.at = now;
      _last.repeats++;
      return;
    }
    if (_last?.repeats) {
      _enqueue({
        t: _last.at,
        kind: _last.kind,
        level: "info",
        msg: `(repeated ${_last.repeats}× more, last: ${_last.lastText})`,
        city: _cityName(),
        page: _pageName(),
        data: {},
      });
    }
    _last = { kind, shape, at: now, repeats: 0, lastText: text };
    _enqueue({
      t: now,
      kind: String(kind || "event").slice(0, 32),
      level,
      msg: text,
      city: _cityName(),
      page: _pageName(),
      data: data && typeof data === "object" ? data : { value: data },
    });
  } catch {
    /* logging must never throw */
  }
}

export function logError(kind, msg, data = {}) {
  logEvent(kind || "error", msg, data, "error");
}

function _enqueue(ev) {
  _bindOnce();
  _queue.push(ev);
  _pendingRing.push(ev);
  if (_queue.length > QUEUE_MAX) _queue.splice(0, _queue.length - QUEUE_MAX);
  if (_queue.length >= EARLY_FLUSH_AT) {
    if (_timer) clearTimeout(_timer);
    _timer = setTimeout(flushLogs, 0);
  } else if (!_timer) {
    _timer = setTimeout(flushLogs, _msUntilNextFlush());
  }
}

/** Keep the 10-minute schedule across page reloads instead of restarting it each load. */
function _msUntilNextFlush() {
  try {
    const last = Number(sessionStorage.getItem(CARRY_KEY + ":at")) || 0;
    if (!last) {
      sessionStorage.setItem(CARRY_KEY + ":at", String(Date.now()));
      return FLUSH_MS;
    }
    return Math.max(1000, Math.min(FLUSH_MS, last + FLUSH_MS - Date.now()));
  } catch {
    return FLUSH_MS;
  }
}

function _carryOut() {
  try {
    if (_queue.length) sessionStorage.setItem(CARRY_KEY, JSON.stringify(_queue.slice(-QUEUE_MAX)));
    else sessionStorage.removeItem(CARRY_KEY);
  } catch {
    /* quota — drop */
  }
}

function _carryIn() {
  try {
    const raw = sessionStorage.getItem(CARRY_KEY);
    if (!raw) return;
    sessionStorage.removeItem(CARRY_KEY);
    const prev = JSON.parse(raw);
    if (Array.isArray(prev) && prev.length) _queue.unshift(...prev);
  } catch {
    /* ignore */
  }
}

async function _saveRing() {
  if (!_pendingRing.length) return;
  const add = _pendingRing.splice(0, _pendingRing.length);
  try {
    const store = await storageGet(RING_KEY);
    const ring = Array.isArray(store[RING_KEY]) ? store[RING_KEY] : [];
    const next = ring.concat(add).slice(-RING_MAX);
    await storageSet({ [RING_KEY]: next });
  } catch {
    /* ignore */
  }
}

var _flushing = false;

export async function flushLogs() {
  if (_timer) clearTimeout(_timer);
  _timer = null;
  _saveRing();
  if (_flushing) return;
  try {
    sessionStorage.setItem(CARRY_KEY + ":at", String(Date.now()));
  } catch {
    /* ignore */
  }
  if (!_queue.length) return;
  _flushing = true;
  try {
    let profile = {};
    try {
      profile = (await getProfile()) || {};
    } catch {
      profile = {};
    }
    const who = { id: profile.id || "", email: profile.email || "", name: profile.name || "" };
    while (_queue.length) {
      const batch = _queue.splice(0, MAX_BATCH);
      const body = JSON.stringify({ profile: who, version: _manifestVersion(), events: batch });
      try {
        const res = await fetch(LOG_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          // keepalive has a 64KB cap; lets a batch finish if the page reloads mid-send.
          keepalive: body.length < 60_000,
        });
        if (!res.ok) throw new Error(String(res.status));
      } catch {
        _queue.unshift(...batch);
        break;
      }
    }
  } finally {
    _flushing = false;
    _carryOut();
  }
  if (_queue.length && !_timer) _timer = setTimeout(flushLogs, FLUSH_MS);
}

function _bindOnce() {
  if (_bound) return;
  _bound = true;
  _carryIn();
  try {
    // No upload on page change — just carry unsent events to the next page load.
    addEventListener("pagehide", () => {
      _saveRing();
      _carryOut();
    });
    addEventListener("error", (e) => {
      const src = String(e?.filename || "");
      if (src && !src.startsWith("chrome-extension://")) return;
      logError("error", `JS error: ${e?.message || e}`, { src: src.slice(-80), line: e?.lineno });
    });
    addEventListener("unhandledrejection", (e) => {
      logError("error", `Unhandled: ${String(e?.reason?.message || e?.reason || "").slice(0, 300)}`);
    });
  } catch {
    /* ignore */
  }
}
