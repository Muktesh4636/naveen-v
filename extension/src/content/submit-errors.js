import { getProfile } from "../shared/config.js";
import { storageGet, storageSet } from "../shared/runtime.js";
import { vs } from "../shared/lifecycle.js";
import { notifyTelegramScreenshot } from "./telegram-notify.js";
import { reportBookingEvent } from "./booking-log.js";

export var SUBMIT_ERRORS_KEY = "submitErrors";
export var SUBMIT_ERRORS_MAX = 50;
export var SUBMIT_ERROR_WATCH_MS = 45_000;

var _watchUntil = 0;
var _seen = new Set();
var _domWatchTimer = null;

function _pageContext() {
  const select = document.querySelector("#post_select");
  const city = select?.options?.[select.selectedIndex]?.textContent?.trim() || "";
  const datepicker = document.querySelector("#datepicker");
  const date = datepicker?.value || "";
  return { city, date, url: location.href };
}

export function armSubmitErrorWatch() {
  _watchUntil = Date.now() + SUBMIT_ERROR_WATCH_MS;
  _seen.clear();
  startSubmitErrorDomWatch();
}

export function isSubmitErrorWatchActive() {
  return Date.now() < _watchUntil;
}

function _dedupeKey(source, message) {
  return `${source}:${String(message || "").slice(0, 240)}`;
}

async function _appendStorage(entry) {
  const store = await storageGet({ [SUBMIT_ERRORS_KEY]: [] });
  const list = Array.isArray(store[SUBMIT_ERRORS_KEY]) ? store[SUBMIT_ERRORS_KEY] : [];
  list.push(entry);
  if (list.length > SUBMIT_ERRORS_MAX) {
    list.splice(0, list.length - SUBMIT_ERRORS_MAX);
  }
  await storageSet({ [SUBMIT_ERRORS_KEY]: list });
}

function _escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function _notifyTelegram(entry) {
  const when = new Date(entry.at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const lines = [
    "<b>⚠️ SUBMIT ERROR</b>",
    "",
    `📍 <b>Source:</b> ${_escapeHtml(entry.source)}`,
    `💬 <b>Message:</b> ${_escapeHtml(entry.message)}`,
  ];
  if (entry.city) lines.push(`🏛️ <b>City:</b> ${entry.city}`);
  if (entry.date) lines.push(`📅 <b>Date:</b> ${entry.date}`);
  if (entry.route) lines.push(`🔗 <b>Route:</b> ${entry.route}`);
  if (entry.status) lines.push(`🌐 <b>HTTP:</b> ${entry.status}`);
  if (entry.email) lines.push(`👤 <b>Account:</b> ${entry.email}`);
  lines.push(`🕐 <b>When:</b> ${when} IST`, "", "📲 Visa Slot 10");
  const caption = lines.join("\n");
  await notifyTelegramScreenshot(caption, {
    kind: "submit_error",
    dedupKey: `submit_err:${entry.source}:${entry.message.slice(0, 80)}`,
    waitMs: 350,
  });
}

/** Record an error seen after Submit was clicked. */
export async function recordSubmitError(source, message, meta = {}) {
  const text = String(message || "").trim();
  if (!text) return;
  if (!isSubmitErrorWatchActive() && !meta.force) return;

  const key = _dedupeKey(source, text);
  if (_seen.has(key)) return;
  _seen.add(key);

  const ctx = _pageContext();
  const profile = await getProfile();
  const entry = {
    at: Date.now(),
    source: String(source || "unknown"),
    message: text.slice(0, 2000),
    city: meta.city || ctx.city,
    date: meta.date || ctx.date,
    url: meta.url || ctx.url,
    route: meta.route || "",
    status: meta.status != null ? String(meta.status) : "",
    email: profile?.email || "",
  };

  await _appendStorage(entry);
  reportBookingEvent({
    kind: "submit",
    stage: "fail",
    level: "error",
    message: entry.message,
    date: entry.date || "",
    city: entry.city || "",
    detail: {
      source: entry.source,
      route: entry.route || "",
      status: entry.status || "",
    },
  });
  try {
    await _notifyTelegram(entry);
  } catch (e) {}
}

export function recordSubmitAjaxError(eventData) {
  if (!isSubmitErrorWatchActive()) return;
  const status = eventData?.status;
  const retry = eventData?.retryAfter;
  const block = eventData?.cgiBlock;
  let msg = `Request failed (HTTP ${status || "?"})`;
  if (retry != null) msg += ` — retry after ${retry}s`;
  if (block) msg += " — CGI access limitation";
  recordSubmitError("ajax_error", msg, { status });
}

export function recordSubmitAjaxResponse(parsed) {
  if (!isSubmitErrorWatchActive() || !parsed) return;
  const resp = parsed.response || {};
  if (parsed.retryAfter !== undefined) {
    recordSubmitAjaxError({
      status: parsed.status || 429,
      retryAfter: parsed.retryAfter,
      cgiBlock: parsed.cgiBlock,
    });
    return;
  }
  if (!resp.HasError) return;
  const errHtml = resp.ErrorString || "";
  const errText = errHtml
    ? new DOMParser().parseFromString(errHtml, "text/html").body.innerText.trim()
    : "";
  const msg = errText || "Server returned HasError with no message";
  recordSubmitError("ajax_response", msg, { route: parsed.tail || "" });
}

const DOM_ERROR_SELECTORS = [
  ".atlas_validationalert",
  ".alert-danger",
  ".validation-summary-errors",
  "#error_row .alert",
  ".field-validation-error",
];

export function startSubmitErrorDomWatch() {
  if (_domWatchTimer) vs.clear(_domWatchTimer);
  const tick = () => {
    if (!vs.alive || !isSubmitErrorWatchActive()) {
      _domWatchTimer = null;
      return;
    }
    for (const sel of DOM_ERROR_SELECTORS) {
      for (const el of document.querySelectorAll(sel)) {
        const text = (el.textContent || "").replace(/\s+/g, " ").trim();
        if (!text || text.length < 4) continue;
        recordSubmitError("page_validation", text);
      }
    }
    _domWatchTimer = vs.setTimeout(tick, 600);
  };
  _domWatchTimer = vs.setTimeout(tick, 500);
}

export function stopSubmitErrorDomWatch() {
  if (_domWatchTimer) {
    vs.clear(_domWatchTimer);
    _domWatchTimer = null;
  }
}
