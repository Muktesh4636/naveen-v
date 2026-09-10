function visaClassToSlug(visaClass) {
  let slug = visaClass.toLowerCase();
  for (const ch of ["/", " ", "(", ")", "_", "\u2013", "-"]) slug = slug.split(ch).join("-");
  while (slug.includes("--")) slug = slug.split("--").join("-");
  return slug.replace(/^-+|-+$/g, "");
}
function classUrl(profile) {
  return profile?.visa ? `${SITE_URL}/class/${visaClassToSlug(profile.visa)}/` : SITE_URL;
}
async function showLinks() {
  if (!chrome.runtime?.id) return;
  const select = document.querySelector("#atlas-sidebar");
  if (!select) {
    return;
  }
  if (!await vs.waitFor("#atlas-sidebar > *")) return;
  let buttons = [
    { link: "/AppointmentManager", text: "Manage Appointments" },
    { link: "/appointment-confirmation", text: "Appointment Confirmation" },
    { link: "/ofc-schedule?reschedule=true", text: "Reschedule OFC" },
    { link: "/schedule?reschedule=true", text: "Reschedule Consular" },
    { link: SITE_URL, text: "<strong>VisaSlots.info</strong>" }
  ];
  const profile = await getProfile();
  if (profile && profile.visa) {
    buttons.push({
      link: classUrl(profile),
      text: `${profile.visa} Availability`
    });
  }
  for (let button of buttons) {
    const label = button.text.replace(/<[^>]*>/g, "");
    const existing = [...select.children].some(
      (child) => child.dataset.vsLink === button.link || child.innerText.trim() === label
    );
    if (existing) {
      continue;
    }
    let list = document.createElement("li");
    list.className = "usa-sidenav__item";
    list.dataset.vs = "";
    list.dataset.vsLink = button.link;
    let anchor = document.createElement("a");
    anchor.href = button.link;
    anchor.className = "vs-sidebar-link";
    anchor.target = button.link.startsWith("https") ? "_blank" : "_self";
    anchor.innerHTML = button.text;
    list.appendChild(anchor);
    select.appendChild(list);
  }
}
async function showDates(parsed) {
  if (parsed.response.HasError) {
    return;
  }
  const dateParsed = {};
  for (let day of parsed.response.ScheduleDays) {
    const key = day.Date.slice(0, 7);
    const dayNum = parseInt(day.Date.slice(8, 10), 10);
    if (key in dateParsed) {
      dateParsed[key].push(dayNum);
    } else {
      dateParsed[key] = [dayNum];
    }
  }
  const leftover = document.querySelector("#dates-container");
  if (leftover) {
    leftover.remove();
  }
  const select = document.querySelector("#post_select");
  const post = select?.options[select.selectedIndex]?.text ?? "";
  const profile = await getProfile();
  const vsLink = classUrl(profile);
  const { container, details } = buildDatesPanel(post, vsLink);
  document.querySelector("#page_form").appendChild(container);
  for (const [month, dates] of Object.entries(dateParsed)) {
    const label = document.createElement("strong");
    label.textContent = month;
    details.append(label, `: ${dates.join(", ")}`, document.createElement("br"));
  }
  if (!Object.keys(dateParsed).length) {
    details.append("No slots available", document.createElement("br"));
  }
}
function buildDatesPanel(post, vsLink) {
  const el = (tag, className, parent) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    parent?.appendChild(node);
    return node;
  };
  const container = el("div", "row");
  container.id = "dates-container";
  const section = el("div", "col-sm-12 atlas_section mt-3", container);
  const titleCell = el("div", "col-sm-12 atlas_section_header_row", el("div", "row", section));
  el("h2", null, titleCell).textContent = post;
  const details = el("p", null, el("div", "col-sm-12", el("div", "row", section)));
  details.id = "dates-para";
  const linkCell = el("div", "col-sm-12 atlas_section_header_row", el("div", "row", section));
  const anchor = el("a", null, linkCell);
  anchor.href = vsLink;
  anchor.target = "_blank";
  el("span", "vs-dates-link", anchor).textContent = "View historic availability on VisaSlots.info";
  return { container, details };
}
var ofcAppointmentsCache = null;
function ensureOfcLabel() {
  let label = document.querySelector("#vs-ofc-date");
  if (label) return label;
  const submit = document.querySelector("#submitbtn");
  if (!submit) return null;
  const cell = submit.parentElement;
  vs.setStyle(cell, "display", "flex");
  vs.setStyle(cell, "alignItems", "center");
  vs.setStyle(cell, "justifyContent", "flex-end");
  vs.setStyle(cell, "gap", "1em");
  label = document.createElement("span");
  label.id = "vs-ofc-date";
  label.dataset.vs = "";
  submit.insertAdjacentElement("beforebegin", label);
  return label;
}
function renderOfcDate() {
  if (!location.pathname.includes("/schedule")) return;
  const list = ofcAppointmentsCache;
  if (!Array.isArray(list) || list.length === 0) return;
  const first = list[0];
  if (!first || !first.appointmentDateStr) return;
  const label = ensureOfcLabel();
  if (!label) return;
  label.textContent = `OFC (Estimate): ${formatOfcDate(first.appointmentDateStr)}`;
}
function handleOfcMessage(event) {
  if (!chrome.runtime?.id) return;
  ofcAppointmentsCache = event.data.data;
  vs.waitFor("#submitbtn").then((submit) => {
    if (submit) renderOfcDate();
  });
}
