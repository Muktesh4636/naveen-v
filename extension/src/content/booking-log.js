/**
 * Send booking telemetry (date/time/submit/city) to server for admin panel.
 */
import { BOOKING_EVENTS_URL, getProfile } from "../shared/config.js";
import { signedFetch } from "../shared/api-sign.js";
import { getDeviceId } from "../shared/device-id.js";
import { getUnlockToken } from "./payment-status.js";
import { captureUsernameAnytime } from "../shared/profile-capture.js";
import { vs } from "../shared/lifecycle.js";

var _queue = [];
var _flushTimer = null;
var _flushing = false;

function _pageCity() {
  const select = document.querySelector("#post_select");
  if (!select) return { id: "", name: "" };
  const id = String(select.value || "");
  const name = (select.options?.[select.selectedIndex]?.textContent || "").trim();
  return { id, name };
}

/** Date / time currently shown on the schedule form. */
export function pageBookingDetails() {
  const select = document.querySelector("#post_select");
  const city = select?.options?.[select.selectedIndex]?.textContent?.trim() || "";
  const cityId = String(select?.value || "");
  const datepicker = document.querySelector("#datepicker");
  const date = (datepicker?.value || "").trim();
  const timeInput = document.querySelector(
    '#schedule-entries table input[type="radio"]:checked, #schedule-entries table input[type="checkbox"]:checked, table input[type="radio"]:checked, table input[type="checkbox"]:checked'
  );
  const time =
    timeInput?.closest("tr")?.textContent?.replace(/\s+/g, " ").trim().slice(0, 120) || "";
  return { city, cityId, date, time };
}

/** Names listed under Group Members on OFC / Consular schedule. */
export function pageGroupMemberNames() {
  const names = [];
  const seen = new Set();
  const push = (raw) => {
    const n = String(raw || "").replace(/\s+/g, " ").trim();
    if (!n || n.length < 2 || n.length > 120) return;
    if (/^(group members|members|name|applicant)$/i.test(n)) return;
    const key = n.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    names.push(n);
  };

  const listRoots = document.querySelectorAll(
    "#members, #member_list, .members, [id*='member' i], [class*='member' i]"
  );
  for (const root of listRoots) {
    const items = root.querySelectorAll("li, option, tr td:first-child, .list-group-item, a, span, div");
    for (const el of items) {
      if (el.children.length > 2) continue;
      push(el.textContent);
      if (names.length >= 8) return names;
    }
  }

  // Fallback: text under a "Group Members" heading.
  const headings = Array.from(document.querySelectorAll("h1,h2,h3,h4,div,th,td,legend,label")).filter(
    (el) => /group\s*members/i.test((el.textContent || "").trim()) && (el.textContent || "").trim().length < 40
  );
  for (const h of headings) {
    let box = h.parentElement;
    for (let i = 0; i < 4 && box; i++) {
      const candidates = box.querySelectorAll("li, option, tr td, .list-group-item");
      for (const el of candidates) {
        const t = (el.textContent || "").replace(/\s+/g, " ").trim();
        if (/group\s*members/i.test(t)) continue;
        push(t);
        if (names.length >= 8) return names;
      }
      box = box.parentElement;
    }
  }
  return names;
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

function _scheduleFlush() {
  if (_flushTimer) return;
  _flushTimer = vs.setTimeout(() => {
    _flushTimer = null;
    void flushBookingEvents();
  }, 800);
}

/**
 * Queue one event. Flushes in a small batch to the server.
 * @param {object} opts
 * @param {string} opts.kind date_pick|time_pick|submit|city_change|auto_submit|booked
 * @param {string} [opts.stage]
 * @param {string} [opts.level] info|warn|error
 * @param {string} [opts.message]
 * @param {string} [opts.date]
 * @param {string} [opts.time]
 * @param {string} [opts.city]
 * @param {string} [opts.cityId]
 * @param {object} [opts.detail]
 */
export function reportBookingEvent({
  kind,
  stage = "",
  level = "info",
  message = "",
  date = "",
  time = "",
  city = "",
  cityId = "",
  detail = null,
} = {}) {
  if (!kind) return;
  const page = _pageCity();
  _queue.push({
    k: String(kind).slice(0, 32),
    s: String(stage || "").slice(0, 32),
    l: ["info", "warn", "error"].includes(level) ? level : "info",
    m: String(message || "").slice(0, 2000),
    ci: String(cityId || page.id || "").slice(0, 64),
    cn: String(city || page.name || "").slice(0, 255),
    f: String(date || "").slice(0, 32),
    t: String(time || "").slice(0, 64),
    u: String(location.href || "").slice(0, 512),
    x: detail && typeof detail === "object" ? detail : {},
  });
  if (_queue.length >= 12) {
    void flushBookingEvents();
  } else {
    _scheduleFlush();
  }
}

/**
 * Report a successful Auto Submit booking for the admin "Booked slots" panel.
 */
export function reportBookedSlot({ source = "auto_submit", message = "" } = {}) {
  const { city, cityId, date, time } = pageBookingDetails();
  const members = pageGroupMemberNames();
  const personName = members[0] || "";
  reportBookingEvent({
    kind: "booked",
    stage: "success",
    level: "info",
    message:
      message ||
      `Slot booked — ${personName || "applicant"} · ${city || "—"} · ${date || "—"} ${time || ""}`.trim(),
    date,
    time,
    city,
    cityId,
    detail: {
      source,
      personName,
      members,
    },
  });
  // Flush soon so the admin panel updates quickly after Submit.
  void flushBookingEvents();
}

export async function flushBookingEvents() {
  if (_flushing || !_queue.length) return;
  _flushing = true;
  const batch = _queue.splice(0, 40);
  try {
    const p = await _profilePayload();
    if (!p.i && !p.e) {
      _queue.unshift(...batch);
      return;
    }
    const d = await getDeviceId();
    const j = getUnlockToken();
    const res = await signedFetch(BOOKING_EVENTS_URL, { p, d, j, v: batch });
    if (!res.ok) {
      // Drop on failure — avoid infinite retry storms.
    }
  } catch {
    /* ignore */
  } finally {
    _flushing = false;
    if (_queue.length) _scheduleFlush();
  }
}
