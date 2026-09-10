// slotext v2.0.2 — generated from src/, do not edit
(() => {
  // src/shared/config.js
  var SITE_URL = "https://visaslots.info";
  var CONTRIBUTE_URL = `${SITE_URL}/contribute`;
  var POLL_INTERVAL_MS = 500;
  var DASHBOARD_POLL_ATTEMPTS = 20;
  var QUEUE_DETAIL_THRESHOLD_MINS = 240;
  var QUEUE_HISTORY_MAX = 50;
  var QUEUE_HISTORY_TTL_MS = 24 * 60 * 60 * 1e3;
  var MAX_TOKEN_AGE_MS = 72 * 60 * 60 * 1e3;
  var SETTING_DEFAULTS = {
    recheckButton: true,
    defaultWaitTime: 60,
    audioAlert: false,
    autoSelectFirstDate: false
  };
  function getSetting(key) {
    return chrome.storage.local.get({ [key]: SETTING_DEFAULTS[key] }).then((storage) => storage[key]);
  }
  function getPosts() {
    return chrome.storage.local.get({ posts: [] }).then((storage) => storage.posts);
  }
  function setPosts(posts) {
    return chrome.storage.local.set({ posts });
  }
  function getProfile() {
    return chrome.storage.local.get("profile").then((storage) => storage.profile);
  }

  // src/shared/lifecycle.js
  var Instance = class {
    constructor() {
      this.controller = new AbortController();
      this.timers = /* @__PURE__ */ new Set();
      this.styles = [];
      this.disposables = [];
    }
    get signal() {
      return this.controller.signal;
    }
    get alive() {
      return !this.signal.aborted && !!chrome.runtime?.id;
    }
    on(target, type, handler, options) {
      target.addEventListener(type, handler, { ...options, signal: this.signal });
    }
    setInterval(fn, ms) {
      const id = setInterval(() => {
        if (!this.alive) return this.clear(id);
        fn();
      }, ms);
      this.timers.add(id);
      return id;
    }
    setTimeout(fn, ms) {
      const id = setTimeout(() => {
        this.timers.delete(id);
        if (this.alive) fn();
      }, ms);
      this.timers.add(id);
      return id;
    }
    clear(id) {
      clearInterval(id);
      this.timers.delete(id);
    }
    setStyle(el, prop, value) {
      this.styles.push({ el, prop, previous: el.style[prop] });
      el.style[prop] = value;
    }
    disposable(fn) {
      this.disposables.push(fn);
    }
    waitFor(selector, { attempts = 20, interval = POLL_INTERVAL_MS } = {}) {
      return new Promise((resolve) => {
        const tick = (n) => {
          if (!this.alive) return;
          const found = document.querySelector(selector);
          if (found) return resolve(found);
          if (n >= attempts) return resolve(null);
          this.setTimeout(() => tick(n + 1), interval);
        };
        tick(0);
      });
    }
    destroy() {
      this.controller.abort();
      for (const id of this.timers) clearInterval(id);
      this.timers.clear();
      for (const { el, prop, previous } of this.styles.reverse()) {
        el.style[prop] = previous;
      }
      this.styles.length = 0;
      for (const dispose of this.disposables.splice(0)) {
        try {
          dispose();
        } catch (e) {
        }
      }
    }
  };
  var vs = new Instance();
  function retirePrevious() {
    const previous = globalThis.__vs;
    globalThis.__vs = vs;
    previous?.destroy();
  }

  // src/content/styles.js
  var CSS = `

#vs-selector-row {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 11em;
  gap: 0.5em;
  width: max-content;
  max-width: 100%;
  margin: 0.25em auto 0;
  align-items: center;
}
#wait-time {
  min-width: 0;
  font-size: 0.9em;
  cursor: pointer;
  user-select: none;
}
#recheck-btn {
  width: 100%;
  padding: 0.35em 0.8em;
  background-color: #1a4480;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  white-space: nowrap;
}

#wait-time .vs-pill {
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  white-space: nowrap;
}

#wait-time .vs-pill-title {
  flex: 1;
  min-width: 0;
  padding: 0.35em 0.5em;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}

#wait-time .vs-pill-timer {
  display: flex;
  align-items: center;
  padding: 0.35em 0.55em;
  border-radius: 5px 0 0 5px;
  background: rgba(255, 255, 255, 0.25);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-variant-numeric: tabular-nums;
}

#wait-time .vs-pill-waiting { background-color: rgba(255, 0, 0, 0.35); color: #5c0000; }
#wait-time .vs-pill-done { background-color: #1a4480; color: white; }

#atlas-sidebar .vs-sidebar-link { background-color: #1a4480; color: white; }
#dates-para { margin: 0.5em 0; }

#dates-container .vs-dates-link { color: white; }
#vs-ofc-date { font-weight: bold; }

.vs-card {
  max-width: 400px;
  width: 100%;
  text-align: center;
  font-family: inherit;
}
#vs-history-container { margin: 15px auto 0; }
#vs-cooldown-card {
  margin: 20px auto 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 20px;
  box-sizing: border-box;
}

#vs-history-container .vs-card-title {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
}
#vs-history-container .vs-history-scroll {
  max-height: 250px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #ffffff;
}
#vs-history-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  color: #2d3748;
}
#vs-history-table thead tr {
  border-bottom: 1px solid #e2e8f0;
  background: #edf2f7;
  position: sticky;
  top: 0;
}
#vs-history-table th {
  padding: 6px 10px;
  text-align: center;
  font-weight: 600;
  color: #4a5568;
}
#vs-history-table tbody tr { border-bottom: 1px solid #e2e8f0; }
#vs-history-table td {
  padding: 6px 10px;
  text-align: center;
  color: #718096;
}

#vs-history-table td.vs-delta-down { color: #10b981; font-weight: 500; }
#vs-history-table td.vs-delta-up { color: #ef4444; font-weight: 500; }

#vs-cooldown-card .vs-card-title {
  margin: 0 0 12px 0;
  font-size: 12px;
  font-weight: 700;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
#vs-cooldown-time {
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin: 10px 0 15px;
  font-family: monospace, inherit;
}

#vs-cooldown-time.vs-cooldown-over { font-size: 20px; }
.vs-cooldown-divider {
  border-top: 1px solid #edf2f7;
  margin-top: 15px;
  padding-top: 12px;
}

.vs-footer { font-size: 11px; }
#vs-history-container .vs-footer { margin-top: 8px; }
#vs-cooldown-card .vs-footer { margin: 0; }

#vs-history-container .vs-footer a,
#vs-cooldown-card .vs-footer a {
  color: #1a4480;
  text-decoration: none;
  font-weight: 500;
}

.vs-hidden { display: none; }
`;
  function injectStyles() {
    if (document.querySelector("#vs-styles")) return;
    const style = document.createElement("style");
    style.id = "vs-styles";
    style.dataset.vs = "";
    style.textContent = CSS;
    (document.head || document.documentElement).appendChild(style);
  }

  // src/shared/datetime.js
  var pad = (n) => String(n).padStart(2, "0");
  function formatDuration(totalSeconds) {
    const s = pad(totalSeconds % 60);
    const m = Math.floor(totalSeconds / 60) % 60;
    const h = Math.floor(totalSeconds / 3600);
    if (h) return `${pad(h)}:${pad(m)}:${s}`;
    return `${pad(m)}:${s}`;
  }
  function formatClock(now = /* @__PURE__ */ new Date()) {
    return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }
  function formatMins(minutes) {
    const d = Math.floor(minutes / 1440);
    const h = Math.floor(minutes % 1440 / 60);
    const m = minutes % 60;
    const parts = [];
    if (d > 0) parts.push(`${d}d`);
    if (h > 0 || d > 0) parts.push(`${h}h`);
    parts.push(`${m}m`);
    return parts.join(" ");
  }
  function formatOfcDate(str) {
    const date = new Date(str);
    if (isNaN(date)) return str;
    const parts = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    }).formatToParts(date);
    const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
    return `${get("month")} ${get("day")} ${get("year")} ${get("hour")}:${get("minute")} ${get("dayPeriod")}`;
  }
  function parseTimeStr(timeStr) {
    const match = timeStr.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);
    if (!match) return null;
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const seconds = parseInt(match[3], 10);
    const ampm = match[4];
    if (ampm) {
      if (ampm.toUpperCase() === "PM" && hours < 12) hours += 12;
      if (ampm.toUpperCase() === "AM" && hours === 12) hours = 0;
    }
    const date = /* @__PURE__ */ new Date();
    date.setHours(hours, minutes, seconds, 0);
    if (date.getTime() > Date.now() + 6e4) {
      date.setDate(date.getDate() - 1);
    }
    return date;
  }

  // src/content/cloudflare.js
  function poweredByFooter() {
    const footer = document.createElement("div");
    footer.className = "vs-footer";
    const link = document.createElement("a");
    link.href = SITE_URL;
    link.target = "_blank";
    link.textContent = "Powered by VisaSlots.info";
    footer.appendChild(link);
    return footer;
  }
  function renderHistoryTable(history) {
    let container = document.getElementById("vs-history-container");
    if (container) container.remove();
    container = document.createElement("div");
    container.id = "vs-history-container";
    container.className = "vs-card";
    container.dataset.vs = "";
    const header = document.createElement("h4");
    header.className = "vs-card-title";
    header.textContent = "Recent Wait Time History";
    container.appendChild(header);
    const scrollWrapper = document.createElement("div");
    scrollWrapper.className = "vs-history-scroll";
    const table = document.createElement("table");
    table.id = "vs-history-table";
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    for (const title of ["Time", "Est. Wait", "Change"]) {
      const th = document.createElement("th");
      th.textContent = title;
      headRow.appendChild(th);
    }
    thead.appendChild(headRow);
    table.appendChild(thead);
    const tbody = document.createElement("tbody");
    for (let i = history.length - 1; i >= 0; i--) {
      const entry = history[i];
      let changeText = "--";
      let deltaClass = "";
      if (i > 0) {
        const diff = entry.minutes - history[i - 1].minutes;
        if (diff < 0) {
          changeText = `${diff}m`;
          deltaClass = "vs-delta-down";
        } else if (diff > 0) {
          changeText = `+${diff}m`;
          deltaClass = "vs-delta-up";
        } else {
          changeText = "0m";
        }
      }
      const row = document.createElement("tr");
      const cells = [
        [entry.timeStr, ""],
        [formatMins(entry.minutes), ""],
        [changeText, deltaClass]
      ];
      for (const [text, cellClass] of cells) {
        const cell = document.createElement("td");
        if (cellClass) cell.className = cellClass;
        cell.textContent = text;
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    }
    table.appendChild(tbody);
    scrollWrapper.appendChild(table);
    container.appendChild(scrollWrapper);
    container.appendChild(poweredByFooter());
    const lastUpdatedEl = document.getElementById("last-updated");
    if (lastUpdatedEl) {
      const parent = lastUpdatedEl.closest("div, p, section") || lastUpdatedEl.parentElement;
      parent.insertAdjacentElement("afterend", container);
    }
  }
  function scrapeQueueMinutes() {
    for (const script of document.querySelectorAll("script")) {
      const match = script.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);
      if (match) return parseInt(match[1], 10);
    }
    return null;
  }
  function handleWaitingRoom() {
    const isWaitingRoom = document.getElementById("waitTime") && document.getElementById("last-updated") && document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare");
    if (!isWaitingRoom) return;
    const timeEl = document.getElementById("waitTime");
    const lastUpdatedEl = document.getElementById("last-updated");
    const extractedMinutes = scrapeQueueMinutes();
    if (extractedMinutes !== null && extractedMinutes > QUEUE_DETAIL_THRESHOLD_MINS && !timeEl.textContent.includes("(")) {
      const formatted = formatMins(extractedMinutes);
      timeEl.textContent = `${timeEl.textContent} (${extractedMinutes} minutes / ${formatted})`;
    }
    const originalText = lastUpdatedEl.textContent.trim().split(" (")[0];
    const loadedTime = parseTimeStr(originalText);
    if (loadedTime) {
      vs.setInterval(() => {
        const elapsed = Math.floor((Date.now() - loadedTime) / 1e3);
        if (elapsed >= 0) {
          lastUpdatedEl.textContent = `${originalText} (${elapsed}s ago)`;
        }
      }, 1e3);
    }
    if (extractedMinutes !== null) {
      let tabId = sessionStorage.getItem("vs_tab_id");
      if (!tabId) {
        tabId = Math.random().toString(36).substring(2, 11);
        sessionStorage.setItem("vs_tab_id", tabId);
      }
      chrome.storage.local.get({ queueHistory: {} }).then((storage) => {
        const historyMap = storage.queueHistory || {};
        const now = Date.now();
        const cleanedMap = {};
        for (const [tid, list] of Object.entries(historyMap)) {
          if (!Array.isArray(list)) continue;
          const lastEntry2 = list[list.length - 1];
          if (lastEntry2 && now - lastEntry2.timestamp < QUEUE_HISTORY_TTL_MS) {
            cleanedMap[tid] = list;
          }
        }
        const history = cleanedMap[tabId] || [];
        const nowStr = lastUpdatedEl ? lastUpdatedEl.textContent.trim().split(" (")[0] : (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US");
        const lastEntry = history[history.length - 1];
        if (!lastEntry || lastEntry.minutes !== extractedMinutes || lastEntry.timeStr !== nowStr) {
          history.push({
            timestamp: now,
            timeStr: nowStr,
            minutes: extractedMinutes
          });
          if (history.length > QUEUE_HISTORY_MAX) {
            history.shift();
          }
          cleanedMap[tabId] = history;
          chrome.storage.local.set({ queueHistory: cleanedMap });
        }
        renderHistoryTable(history);
      });
    }
  }
  function showBlockMessage(isCgiBlock, seconds) {
    const row = document.getElementById("error_row");
    if (!row) return;
    let message;
    if (isCgiBlock) {
      message = seconds ? `Blocked for 24 hours, about ${formatDuration(seconds)} remaining. Logging in again will not help.` : "Blocked for 24 hours. Logging in again will not help.";
    } else {
      message = "Temporarily blocked. Log in in a new tab, then press Recheck.";
    }
    const alert = document.createElement("div");
    alert.className = "atlas_validationalert alert alert-danger warning";
    alert.dataset.vs = "";
    alert.textContent = message;
    row.replaceChildren(alert);
    row.style.removeProperty("display");
    row.parentElement?.style.removeProperty("display");
  }
  function handleCf1015() {
    const h1 = document.querySelector("h1");
    const is1015Error = h1 && h1.textContent.includes("Error") && h1.textContent.includes("1015");
    if (!is1015Error) return;
    chrome.storage.local.get({ cfRetryAfter: null }).then((storage) => {
      const retryAfter = parseInt(storage.cfRetryAfter, 10);
      if (!isNaN(retryAfter)) {
        chrome.storage.local.remove("cfRetryAfter");
        const container = document.getElementById("what-happened-section");
        if (container) {
          const timerCard = document.createElement("div");
          timerCard.id = "vs-cooldown-card";
          timerCard.className = "vs-card";
          timerCard.dataset.vs = "";
          const header = document.createElement("h4");
          header.className = "vs-card-title";
          header.textContent = "Rate Limit Cooldown";
          timerCard.appendChild(header);
          const timeSpan = document.createElement("div");
          timeSpan.id = "vs-cooldown-time";
          timerCard.appendChild(timeSpan);
          const divider = document.createElement("div");
          divider.className = "vs-cooldown-divider";
          timerCard.appendChild(divider);
          timerCard.appendChild(poweredByFooter());
          container.appendChild(timerCard);
          let remaining = retryAfter;
          const updateTimer = () => {
            if (remaining > 0) {
              timeSpan.textContent = formatDuration(remaining);
              remaining--;
            } else {
              timeSpan.classList.add("vs-cooldown-over");
              timeSpan.textContent = "You can try refreshing now!";
              vs.clear(interval);
            }
          };
          updateTimer();
          const interval = vs.setInterval(updateTimer, 1e3);
        }
      }
    });
  }

  // src/content/scheduling-panels.js
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

  // src/content/scheduling-controls.js
  function ensureSelectorRow() {
    let row = document.querySelector("#vs-selector-row");
    if (row) return row;
    const dropdown = document.querySelector("#post_select");
    if (!dropdown) return null;
    const postRow = dropdown.closest(".row");
    if (!postRow) return null;
    row = document.createElement("div");
    row.id = "vs-selector-row";
    row.dataset.vs = "";
    postRow.insertAdjacentElement("afterend", row);
    const anchor = document.createElement("span");
    anchor.id = "vs-post-anchor";
    anchor.dataset.vs = "";
    anchor.dataset.vsWidth = dropdown.style.width;
    anchor.dataset.vsMinWidth = dropdown.style.minWidth;
    anchor.hidden = true;
    dropdown.insertAdjacentElement("beforebegin", anchor);
    dropdown.style.width = "100%";
    dropdown.style.minWidth = "0";
    row.appendChild(dropdown);
    return row;
  }
  var WAIT_STATE_KEY = "waitPillState";
  var WAIT_STATE_MAX_AGE_MS = 60 * 60 * 1e3;
  var WAITING = "vs-pill-waiting";
  var DONE = "vs-pill-done";
  function pillMarkup(parts, variant) {
    const pill = document.createElement("span");
    pill.className = `vs-pill ${variant}`;
    const add = (className, text) => {
      const el = document.createElement("span");
      el.className = className;
      el.textContent = text;
      pill.appendChild(el);
    };
    add("vs-pill-title", parts.title);
    if (parts.timer !== void 0) add("vs-pill-timer", parts.timer);
    return pill;
  }
  function pillView(state, now = Date.now()) {
    if (state.kind === "waiting") {
      return { label: "Waiting For Response", variant: WAITING };
    }
    if (state.kind === "running") {
      const remaining = Math.ceil((state.endTime - now) / 1e3);
      if (remaining >= 0) {
        return { label: "Wait Time", seconds: remaining, variant: WAITING };
      }
      const elapsed = Math.floor((now - state.startTime) / 1e3);
      return { label: "Elapsed Time", seconds: elapsed, variant: DONE };
    }
    return null;
  }
  function pillParts(view, clockMode, now) {
    const title = clockMode ? formatClock(now) : view.label;
    return view.seconds === void 0 ? { title } : { title, timer: formatDuration(view.seconds) };
  }
  var WaitPill = class {
    #slot = null;
    #state = { kind: "idle" };
    #timer = null;
    #clockTimer = null;
    #clock = false;
    #beeped = false;
    waiting() {
      this.#enter({ kind: "waiting" });
    }
    run(seconds) {
      const startTime = Date.now();
      this.#enter({ kind: "running", startTime, endTime: startTime + seconds * 1e3 });
    }
    async restore() {
      const stored = (await chrome.storage.local.get(WAIT_STATE_KEY))[WAIT_STATE_KEY];
      chrome.storage.local.remove("suggestedWaitEndTime");
      if (stored?.kind !== "running") return;
      if (Date.now() - stored.startTime > WAIT_STATE_MAX_AGE_MS) {
        chrome.storage.local.remove(WAIT_STATE_KEY);
        return;
      }
      this.#enter(stored, { beeped: Date.now() > stored.endTime });
    }
    setClockMode(enabled) {
      this.#clock = enabled;
      this.#paint();
      this.#syncClockTimer();
    }
    toggleClockMode() {
      if (!vs.alive) return;
      this.setClockMode(!this.#clock);
      chrome.storage.local.set({ waitPillClock: this.#clock });
    }
    render(now) {
      return pillView(this.#state, now);
    }
    #parts(view) {
      return pillParts(view, this.#clock);
    }
    #paint() {
      this.#slot ??= ensureWaitSlot();
      if (!this.#slot) return;
      const view = this.render();
      if (!view) {
        this.#slot.classList.add("vs-hidden");
        return;
      }
      this.#slot.classList.remove("vs-hidden");
      this.#slot.replaceChildren(pillMarkup(this.#parts(view), view.variant));
    }
    #enter(state, { beeped = false } = {}) {
      this.#state = state;
      this.#beeped = beeped;
      if (this.#timer) {
        vs.clear(this.#timer);
        this.#timer = null;
      }
      if (state.kind === "running") {
        chrome.storage.local.set({ [WAIT_STATE_KEY]: state });
        this.#timer = vs.setInterval(() => this.#tick(), 1e3);
      } else {
        chrome.storage.local.remove(WAIT_STATE_KEY);
      }
      this.#paint();
      this.#syncClockTimer();
    }
    #tick() {
      this.#paint();
      if (this.#state.kind !== "running" || this.#beeped) return;
      if (Date.now() <= this.#state.endTime) return;
      this.#beeped = true;
      getSetting("audioAlert").then((enabled) => {
        if (enabled) startBeeping();
      });
    }
    #syncClockTimer() {
      const needed = this.#clock && this.#state.kind === "waiting";
      if (needed && !this.#clockTimer) {
        this.#clockTimer = vs.setInterval(() => this.#paint(), 1e3);
      } else if (!needed && this.#clockTimer) {
        vs.clear(this.#clockTimer);
        this.#clockTimer = null;
      }
    }
  };
  var waitPill = new WaitPill();
  function ensureWaitSlot() {
    let slot = document.querySelector("#wait-time");
    if (slot) return slot;
    const row = ensureSelectorRow();
    if (!row) return null;
    slot = document.createElement("div");
    slot.id = "wait-time";
    slot.className = "vs-hidden";
    slot.title = "Click to show the current time";
    row.insertBefore(slot, document.querySelector("#post_select"));
    return slot;
  }
  async function reserveWaitSlot() {
    if (!vs.alive) return;
    if (!await getSetting("defaultWaitTime")) return;
    if (!await vs.waitFor("#post_select")) return;
    const { waitPillClock } = await chrome.storage.local.get({ waitPillClock: false });
    waitPill.setClockMode(waitPillClock);
    await waitPill.restore();
  }
  async function showWaiting() {
    if (!await getSetting("defaultWaitTime")) return;
    waitPill.waiting();
  }
  async function showWaitTime(seconds) {
    if (!await getSetting("defaultWaitTime")) return;
    waitPill.run(seconds);
  }
  function toggleClockMode() {
    waitPill.toggleClockMode();
  }
  function applyClockMode(enabled) {
    waitPill.setClockMode(enabled);
  }
  var beepTimeout = null;
  var slotsTimeout = null;
  var cachedAudioCtx = null;
  function getAudioContext() {
    if (!cachedAudioCtx) {
      cachedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
      vs.disposable(() => cachedAudioCtx?.close());
    }
    return cachedAudioCtx;
  }
  async function playBeep(durationMs = 150) {
    try {
      const audioCtx = getAudioContext();
      if (audioCtx.state === "suspended") {
        await audioCtx.resume();
      }
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
      const t = audioCtx.currentTime;
      const dur = durationMs / 1e3;
      gainNode.gain.setValueAtTime(0, t);
      gainNode.gain.linearRampToValueAtTime(0.1, t + 0.01);
      gainNode.gain.setValueAtTime(0.1, t + Math.max(0.01, dur - 0.02));
      gainNode.gain.linearRampToValueAtTime(0, t + dur);
      oscillator.start();
      oscillator.stop(t + dur);
    } catch (e) {
      console.error("Audio beep failed:", e);
    }
  }
  function playBeepBurst(count, onMs = 125, offMs = 125) {
    let played = 0;
    const playNext = () => {
      if (played >= count) return;
      playBeep(onMs);
      played++;
      vs.setTimeout(playNext, onMs + offMs);
    };
    playNext();
  }
  var SLOTS_BEEPS = 4;
  var SLOTS_ON_MS = 50;
  var SLOTS_OFF_MS = 50;
  var SLOTS_PAUSE_MS = 600;
  function slotsAlert() {
    if (slotsTimeout) return;
    const round = () => {
      playBeepBurst(SLOTS_BEEPS, SLOTS_ON_MS, SLOTS_OFF_MS);
      const burstMs = SLOTS_BEEPS * SLOTS_ON_MS + (SLOTS_BEEPS - 1) * SLOTS_OFF_MS;
      slotsTimeout = vs.setTimeout(round, burstMs + SLOTS_PAUSE_MS);
    };
    round();
  }
  var WAIT_TONE_MS = 250;
  var WAIT_INTERVAL_S = 10;
  var WAIT_TOTAL_S = 300;
  var WAIT_FLOURISH_MS = 1e3;
  function startBeeping() {
    if (beepTimeout) return;
    const BEEP_SCHEDULE = [];
    for (let s = 0; s <= WAIT_TOTAL_S; s += WAIT_INTERVAL_S) BEEP_SCHEDULE.push(s);
    const startTime = Date.now();
    let nextIndex = 0;
    const tick = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1e3);
      while (nextIndex < BEEP_SCHEDULE.length && elapsed >= BEEP_SCHEDULE[nextIndex]) {
        const isLast = nextIndex === BEEP_SCHEDULE.length - 1;
        playBeep(isLast ? WAIT_FLOURISH_MS : WAIT_TONE_MS);
        nextIndex++;
      }
      if (nextIndex < BEEP_SCHEDULE.length) {
        const nextTargetSec = BEEP_SCHEDULE[nextIndex];
        const nextTargetMs = startTime + nextTargetSec * 1e3;
        const delay = Math.max(0, nextTargetMs - Date.now());
        beepTimeout = vs.setTimeout(tick, delay);
      } else {
        stopBeeping();
      }
    };
    tick();
  }
  function stopBeeping() {
    if (beepTimeout) {
      vs.clear(beepTimeout);
      beepTimeout = null;
    }
    if (slotsTimeout) {
      vs.clear(slotsTimeout);
      slotsTimeout = null;
    }
  }
  function ensureRecheckButton() {
    if (document.querySelector("#recheck-btn")) return;
    const row = ensureSelectorRow();
    if (!row) return;
    const dropdown = document.querySelector("#post_select");
    const btn = document.createElement("button");
    btn.id = "recheck-btn";
    btn.type = "button";
    btn.textContent = "Recheck";
    vs.on(btn, "click", () => {
      dropdown.dispatchEvent(new Event("change", { bubbles: true }));
    });
    row.appendChild(btn);
    const syncRecheck = () => {
      btn.classList.toggle("vs-hidden", !dropdown.value);
    };
    syncRecheck();
    vs.on(dropdown, "change", syncRecheck);
  }
  async function reserveRecheckButton() {
    if (!vs.alive) return;
    if (!await getSetting("recheckButton")) return;
    if (!await vs.waitFor("#post_select")) return;
    ensureRecheckButton();
  }

  // src/content/reporting.js
  async function storeProfile() {
    const username = document.querySelector(".username");
    if (!username) {
      return;
    }
    const match = username.innerText.match(/(.*)\((\d*)\)/);
    if (!match) {
      return;
    }
    const [, name, id] = match;
    const stored = await getProfile() || {};
    const profile = !stored.id || stored.id === id ? stored : {};
    profile.name = name.trim();
    profile.id = id;
    let scripts = document.querySelectorAll("script");
    for (let script of scripts) {
      let trimmedScript = script.innerText.trim();
      if (trimmedScript.includes("setAuthenticatedUserContext")) {
        const regex = /setAuthenticatedUserContext\('([^']*)'\)/;
        profile.email = trimmedScript.match(regex).pop();
      }
    }
    chrome.storage.local.set({ profile });
  }
  async function storePosts() {
    const select = document.querySelector("#post_select");
    if (!select) {
      return;
    }
    const posts = await getPosts();
    for (let option of select.options) {
      if (!option.value) {
        continue;
      }
      const index = posts.findIndex((post) => post.ID === option.value);
      if (index == -1) {
        posts.push({ ID: option.value, Name: option.text });
      }
    }
    await setPosts(posts);
  }
  var DASHBOARD_CARDS = ["visa-information", "fee-payment", "appointment-confirmation"];
  function scrapeDashboard() {
    const anchor = document.querySelector("#appointment-card");
    if (!anchor || !anchor.textContent.trim()) return null;
    const list = anchor.closest("ul");
    if (!list) return null;
    const cards = {};
    list.querySelectorAll(":scope > li").forEach((li) => {
      const title = li.querySelector(".text-bold");
      if (!title) return;
      const key = slugify(title.textContent);
      if (!DASHBOARD_CARDS.includes(key)) return;
      const text = cardText(li);
      if (text) cards[key] = text;
    });
    return Object.keys(cards).length ? cards : null;
  }
  function slugify(text) {
    return text.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function cardText(li) {
    const tmp = document.createElement("div");
    tmp.innerHTML = li.innerHTML.replace(/<br\s*\/?>/gi, "\n");
    tmp.querySelectorAll("svg, script, style, .text-bold").forEach((el) => el.remove());
    return tmp.textContent.split("\n").map((s) => s.replace(/\s+/g, " ").trim()).filter(Boolean).join(" | ");
  }
  function syncDashboard(attempt = 0) {
    if (!chrome.runtime?.id) return;
    if (!document.querySelector("#appointment-card")) return;
    const current = scrapeDashboard();
    if (!current) {
      if (attempt < DASHBOARD_POLL_ATTEMPTS) {
        vs.setTimeout(() => syncDashboard(attempt + 1), POLL_INTERVAL_MS);
      }
      return;
    }
    chrome.storage.local.get(["profile", "cgiIdToken", "savedDashboard"]).then((storage) => {
      const token = freshIdToken(storage.cgiIdToken);
      if (!token) return;
      if (JSON.stringify(current) === JSON.stringify(storage.savedDashboard)) {
        return;
      }
      fetch(CONTRIBUTE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: storage.profile, dashboard: current, token })
      }).then((response) => response.json()).then((response) => {
        if (response.success) {
          chrome.storage.local.set({ savedDashboard: current });
        }
      }).catch(() => {
      });
    });
  }
  function freshIdToken(stored) {
    if (!stored || !stored.value) return null;
    try {
      const part = stored.value.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(part));
      if (payload.iat && Date.now() - payload.iat * 1e3 > MAX_TOKEN_AGE_MS) return null;
    } catch (e) {
    }
    return stored.value;
  }
  function prepareContribution(storage) {
    const latestPost = (storage.posts || []).filter((post) => post.Updated).sort((a, b) => a.Updated - b.Updated).pop();
    const contrib = {
      profile: storage.profile,
      posts: latestPost ? [latestPost] : []
    };
    const token = freshIdToken(storage.cgiIdToken);
    if (token) {
      contrib.token = token;
    }
    return contrib;
  }
  async function submitContribution() {
    const storage = await chrome.storage.local.get(["profile", "posts", "cgiIdToken"]);
    const contrib = prepareContribution(storage);
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contrib)
    };
    fetch(CONTRIBUTE_URL, options).then((response) => response.json()).then((response) => {
      if (!response.success) {
        return;
      }
      let text = "0";
      let color = "#C62828";
      if (response.contribs > 0) {
        text = response.contribs.toString();
        color = "#388E3C";
      }
      if (response.contribs > 10) {
        text = "10+";
      }
      if (response.contribs > 0) {
        chrome.storage.local.set({
          contribs: {
            email: storage.profile.email,
            updated: Date.now(),
            count: text
          }
        });
      }
    }).catch(() => {
    });
  }

  // src/content/responses.js
  var SCHEDULE_DAYS_TAILS = [
    "get-family-consular-schedule-days",
    "get-family-ofc-schedule-days"
  ];
  function routeTail(rawUrl) {
    const route = new URL(rawUrl, window.location.href).searchParams.get("route");
    return route ? route.split("/").pop() : null;
  }
  function parseEvent(event) {
    if (event.data.status === 429) {
      return {
        retryAfter: event.data.retryAfter,
        cgiBlock: event.data.cgiBlock
      };
    }
    const tail = routeTail(event.data.url);
    const request = new URLSearchParams(event.data.request);
    const params = JSON.parse(request.get("parameters"));
    return {
      params,
      tail,
      response: event.data.response
    };
  }
  async function alertOnAvailability(scheduleDays) {
    if (!scheduleDays?.length) return;
    if (!await getSetting("audioAlert")) return;
    slotsAlert();
  }
  async function autoSelectFirstDate(scheduleDays) {
    const first = scheduleDays?.[0]?.Date;
    if (!first) return;
    if (!await getSetting("autoSelectFirstDate")) return;
    chrome.runtime.sendMessage({ action: "selectFirstDate", date: first });
  }
  async function handleEvent(event) {
    if (!chrome.runtime?.id) return;
    let parsed = parseEvent(event);
    if (parsed == null) return;
    if (parsed.retryAfter !== void 0) {
      const wait = Number(parsed.retryAfter);
      showBlockMessage(parsed.cgiBlock, wait);
      if (wait) {
        showWaitTime(wait);
      } else {
        getSetting("defaultWaitTime").then((defaultWait) => {
          showWaitTime(defaultWait);
        });
      }
      return;
    }
    let postsTails = ["query-consular-posts", "query-ofc-posts"];
    if (postsTails.includes(parsed.tail)) {
      const incoming = parsed.response.Posts || [];
      const byId = new Map((await getPosts()).map((post) => [post.ID, post]));
      for (const post of incoming) {
        byId.set(post.ID, { ...byId.get(post.ID), ...post });
      }
      await setPosts([...byId.values()]);
    }
    let membersTails = [
      "query-family-members-consular",
      "query-family-members-consular-reschedule",
      "query-family-members-ofc",
      "query-family-members-ofc-reschedule"
    ];
    if (membersTails.includes(parsed.tail)) {
      const members = parsed.response.Members || [];
      if (members.length) {
        const profile = await getProfile() || {};
        const matched = profile.name && members.find((m) => m.FullName === profile.name);
        profile.visa = (matched || members[0]).VisaClassName;
        await chrome.storage.local.set({ profile, members });
      }
    }
    if (SCHEDULE_DAYS_TAILS.includes(parsed.tail)) {
      const posts = await getPosts();
      const post = posts.find((post2) => post2.ID === parsed.params.postId);
      if (post) {
        post.Days = parsed.response.ScheduleDays;
        post.Updated = Date.now();
        post.HasError = parsed.response.HasError;
        post.ErrorString = new DOMParser().parseFromString(
          parsed.response.ErrorString || "",
          "text/html"
        ).body.innerText;
        setPosts(posts);
      }
      await showDates(parsed);
      await alertOnAvailability(parsed.response.ScheduleDays);
      await autoSelectFirstDate(parsed.response.ScheduleDays);
      await submitContribution();
      getSetting("defaultWaitTime").then((defaultWait) => {
        showWaitTime(defaultWait);
      });
    }
    let scheduleEntriesTails = [
      "get-family-consular-schedule-entries",
      "get-family-ofc-schedule-entries"
    ];
    if (scheduleEntriesTails.includes(parsed.tail)) {
      const posts = await getPosts();
      const targetDate = parsed.params.Date.split("T")[0];
      const post = posts.filter((post2) => post2.Days && post2.Updated).sort((a, b) => b.Updated - a.Updated).find((post2) => post2.Days.some((day) => day.Date === targetDate));
      if (post) {
        const day = post.Days.find((day2) => day2.Date === targetDate);
        if (day) {
          day.Times = parsed.response.ScheduleEntries;
          setPosts(posts);
        }
      }
      await submitContribution();
    }
  }
  function handleRequest(event) {
    if (!chrome.runtime?.id) return;
    const tail = routeTail(event.data.url);
    if (SCHEDULE_DAYS_TAILS.includes(tail)) {
      showWaiting();
    }
  }

  // src/content.js
  retirePrevious();
  teardown();
  injectStyles();
  function teardown() {
    const anchor = document.querySelector("#vs-post-anchor");
    const dropdown = document.querySelector("#post_select");
    if (anchor && dropdown) {
      dropdown.style.width = anchor.dataset.vsWidth || "";
      dropdown.style.minWidth = anchor.dataset.vsMinWidth || "";
      anchor.replaceWith(dropdown);
    }
    for (const node of document.querySelectorAll("[data-vs]")) node.remove();
  }
  chrome.runtime.sendMessage({ action: "registerBlockGuard" });
  chrome.runtime.sendMessage({ action: "registerRedirect" });
  chrome.runtime.sendMessage({ action: "registerOfcReader" });
  vs.on(window, "message", (event) => {
    if (!vs.alive) return;
    switch (event.data?.action) {
      case "redirectRequest":
        return handleRequest(event);
      case "redirectResponse":
        return handleEvent(event);
      case "ofcAppointments":
        return handleOfcMessage(event);
    }
  });
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    if (changes.profile) showLinks();
    if (changes.waitPillClock) applyClockMode(changes.waitPillClock.newValue);
  });
  vs.on(document, "click", (event) => {
    stopBeeping();
    if (event.target.closest("#wait-time")) toggleClockMode();
  });
  vs.on(document, "keydown", stopBeeping);
  vs.on(window, "focus", stopBeeping);
  vs.on(document, "visibilitychange", () => {
    if (!document.hidden) stopBeeping();
  });
  async function collectInfo() {
    handleWaitingRoom();
    handleCf1015();
    await showLinks();
    await storePosts();
    await storeProfile();
    syncDashboard();
    reserveWaitSlot();
    reserveRecheckButton();
  }
  if (document.readyState === "complete") collectInfo();
  else vs.on(window, "load", collectInfo);
})();
