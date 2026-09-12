import { getProfile } from "../shared/config.js";
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

/** Paint available days as soon as CGI responds — no storage awaits. */
export function showDates(parsed) {
  const form = document.querySelector("#page_form");
  if (!form) return;

  const dateParsed = {};
  if (!parsed.response.HasError) {
    for (let day of parsed.response.ScheduleDays || []) {
      if (!day?.Date || day.Date.length < 10) continue;
      const key = day.Date.slice(0, 7);
      const dayNum = parseInt(day.Date.slice(8, 10), 10);
      if (!dayNum) continue;
      if (key in dateParsed) {
        dateParsed[key].push(dayNum);
      } else {
        dateParsed[key] = [dayNum];
      }
    }
  }
  document.querySelector(idSel(ID.datesCont))?.remove();

  const select = document.querySelector("#post_select");
  const post = select?.options[select.selectedIndex]?.text ?? "";
  const { container, details } = buildDatesPanel(post);
  form.appendChild(container);
  for (const [month, dates] of Object.entries(dateParsed)) {
    const label = document.createElement("strong");
    label.textContent = month;
    details.append(label, `: ${dates.join(", ")}`, document.createElement("br"));
  }
  if (!Object.keys(dateParsed).length) {
    if (parsed.response.HasError) {
      const errText = new DOMParser().parseFromString(
        parsed.response.ErrorString || "",
        "text/html"
      ).body.innerText || "Calendar error";
      details.append(String(errText).slice(0, 200), document.createElement("br"));
    } else {
      details.append("No slots available", document.createElement("br"));
    }
  }
}

export function buildDatesPanel(post) {
  const el = (tag, className, parent) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    parent?.appendChild(node);
    return node;
  };
  const container = el("div", "row");
  container.id = ID.datesCont;
  const section = el("div", "col-sm-12 atlas_section mt-3", container);
  const titleCell = el("div", "col-sm-12 atlas_section_header_row", el("div", "row", section));
  el("h2", null, titleCell).textContent = post;
  const details = el("p", null, el("div", "col-sm-12", el("div", "row", section)));
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
