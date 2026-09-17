import { formatOfcDate } from "../shared/datetime.js";
import { vs } from "../shared/lifecycle.js";
import { CLS, DAT, ID, idSel } from "../shared/token.js";

export async function showLinks() {
  if (!chrome.runtime?.id) return;
  const select = document.querySelector("#atlas-sidebar");
  if (!select) {
    return;
  }
  if (!await vs.waitFor("#atlas-sidebar > *")) return;
  const buttons = [
    { link: "/AppointmentManager", text: "Manage Appointments" },
    { link: "/appointment-confirmation", text: "Appointment Confirmation" },
    { link: "/ofc-schedule?reschedule=true", text: "Reschedule OFC" },
    { link: "/schedule?reschedule=true", text: "Reschedule Consular" },
  ];
  for (let button of buttons) {
    const label = button.text.replace(/<[^>]*>/g, "");
    const existing = [...select.children].some(
      (child) => child.innerText.trim() === label
    );
    if (existing) {
      continue;
    }
    let list = document.createElement("li");
    list.className = "usa-sidenav__item";
    list.dataset[DAT.mark] = "";
    let anchor = document.createElement("a");
    anchor.href = button.link;
    anchor.className = CLS.sideLink;
    anchor.target = "_self";
    anchor.textContent = button.text;
    list.appendChild(anchor);
    select.appendChild(list);
  }
}

function _el(tag, className, parent) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  parent?.appendChild(node);
  return node;
}

function _normalizeDate(raw) {
  if (raw == null) return null;
  const s = String(raw).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  const slash = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (slash) {
    const [, mm, dd, yyyy] = slash;
    return `${yyyy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`;
  }
  return null;
}

function _prettyDate(iso) {
  const d = _normalizeDate(iso);
  if (!d) return String(iso || "");
  const [y, m, day] = d.split("-").map(Number);
  if (!y || !m || !day) return d;
  try {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(y, m - 1, day));
  } catch {
    return d;
  }
}

function _normalizeTime(raw) {
  const s = String(raw || "").trim();
  const iso = s.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);
  if (iso) return iso[1].slice(0, 5);
  const hm = s.match(/^(\d{1,2}:\d{2})/);
  return hm ? hm[1] : s;
}

function _ensureDatesPanel(post) {
  let container = document.querySelector(idSel(ID.datesCont));
  if (container) {
    const details = container.querySelector(idSel(ID.datesPara));
    const title = container.querySelector("h2");
    if (title && post) title.textContent = post;
    if (details) return { container, details };
  }
  const form = document.querySelector("#page_form");
  if (!form) return null;
  container?.remove();
  const built = buildDatesPanel(post || "");
  form.appendChild(built.container);
  return built;
}

/** Paint available days as soon as CGI responds — no storage awaits. */
export function showDates(parsed) {
  if (parsed.response.HasError) {
    return;
  }
  const select = document.querySelector("#post_select");
  const post = select?.options[select.selectedIndex]?.text ?? "";
  const days = (parsed.response.ScheduleDays || [])
    .map((day) => _normalizeDate(day?.Date))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  document.querySelector(idSel(ID.datesCont))?.remove();
  const panel = _ensureDatesPanel(post);
  if (!panel) return;
  const { details } = panel;
  details.replaceChildren();

  const summary = _el("div", CLS.slotsSum, details);
  if (!days.length) {
    summary.textContent = "No slots available";
    return;
  }

  summary.textContent = `${days.length} date${days.length === 1 ? "" : "s"} available`;

  const byMonth = {};
  for (const d of days) {
    const key = d.slice(0, 7);
    (byMonth[key] ||= []).push(d);
  }
  for (const [month, monthDays] of Object.entries(byMonth)) {
    const row = _el("div", null, details);
    const label = document.createElement("strong");
    label.textContent = month;
    row.append(label, `: ${monthDays.map((d) => d.slice(8, 10)).join(", ")}`);
  }

  const list = _el("div", null, details);
  list.style.marginTop = "0.5em";
  for (const d of days) {
    const line = _el("div", null, list);
    line.textContent = `• ${_prettyDate(d)} (${d})`;
  }
}

/** Paint time slots + availability for a selected date. */
export function showScheduleEntries(entries, dateStr, postName) {
  const select = document.querySelector("#post_select");
  const post = postName || select?.options[select.selectedIndex]?.text || "";
  const date = _normalizeDate(dateStr) || _normalizeDate(entries?.[0]?.Date) || "";
  const slots = (entries || [])
    .filter((e) => e && e.Time)
    .map((e) => ({
      time: _normalizeTime(e.Time),
      avail: e.EntriesAvailable != null && Number.isFinite(Number(e.EntriesAvailable))
        ? Number(e.EntriesAvailable)
        : null,
      raw: e,
    }))
    .sort((a, b) => String(a.time).localeCompare(String(b.time)));

  const panel = _ensureDatesPanel(post);
  if (!panel) return;
  const { details } = panel;
  details.replaceChildren();

  const summary = _el("div", CLS.slotsSum, details);
  if (!slots.length) {
    summary.textContent = date
      ? `No time slots on ${_prettyDate(date)}`
      : "No time slots available";
    return;
  }

  const open = slots.filter((s) => s.avail == null || s.avail > 0);
  const totalAvail = open.reduce((sum, s) => sum + (s.avail || 0), 0);
  const dateLabel = date ? _prettyDate(date) : "selected date";
  summary.textContent =
    totalAvail > 0
      ? `${open.length} time slot${open.length === 1 ? "" : "s"} on ${dateLabel} · ${totalAvail} available`
      : `${slots.length} time slot${slots.length === 1 ? "" : "s"} on ${dateLabel}`;

  if (date) {
    const dateLine = _el("div", null, details);
    dateLine.style.margin = "0.35em 0 0.6em";
    dateLine.textContent = `Date: ${dateLabel} (${date})`;
  }

  const table = _el("table", CLS.slotsTbl, details);
  table.id = ID.slotsTbl;
  const thead = _el("thead", null, table);
  const headRow = _el("tr", null, thead);
  for (const h of ["Time", "Availability"]) {
    const th = _el("th", null, headRow);
    th.textContent = h;
  }
  const tbody = _el("tbody", null, table);
  for (const slot of slots) {
    const tr = _el("tr", null, tbody);
    if (slot.avail === 0) tr.style.opacity = "0.55";
    const tdTime = _el("td", null, tr);
    tdTime.textContent = slot.time;
    const tdAvail = _el("td", null, tr);
    tdAvail.textContent = slot.avail == null ? "—" : String(slot.avail);
  }
}

export function buildDatesPanel(post) {
  const container = _el("div", "row");
  container.id = ID.datesCont;
  const section = _el("div", "col-sm-12 atlas_section mt-3", container);
  const titleCell = _el("div", "col-sm-12 atlas_section_header_row", _el("div", "row", section));
  _el("h2", null, titleCell).textContent = post;
  const details = _el("div", null, _el("div", "col-sm-12", _el("div", "row", section)));
  details.id = ID.datesPara;
  return { container, details };
}

export var ofcAppointmentsCache = null;

export function ensureOfcLabel() {
  let label = document.querySelector(idSel(ID.ofcDate));
  if (label) return label;
  const submit = document.querySelector("#submitbtn");
  if (!submit) return null;
  const cell = submit.parentElement;
  vs.setStyle(cell, "display", "flex");
  vs.setStyle(cell, "alignItems", "center");
  vs.setStyle(cell, "justifyContent", "flex-end");
  vs.setStyle(cell, "gap", "1em");
  label = document.createElement("span");
  label.id = ID.ofcDate;
  label.dataset[DAT.mark] = "";
  submit.insertAdjacentElement("beforebegin", label);
  return label;
}

export function renderOfcDate() {
  if (!location.pathname.includes("/schedule")) return;
  const list = ofcAppointmentsCache;
  if (!Array.isArray(list) || list.length === 0) return;
  const first = list[0];
  if (!first || !first.appointmentDateStr) return;
  const label = ensureOfcLabel();
  if (!label) return;
  label.textContent = `OFC (Estimate): ${formatOfcDate(first.appointmentDateStr)}`;
}

export function handleOfcMessage(event) {
  if (!chrome.runtime?.id) return;
  ofcAppointmentsCache = event.data.data;
  vs.waitFor("#submitbtn").then((submit) => {
    if (submit) renderOfcDate();
  });
}
