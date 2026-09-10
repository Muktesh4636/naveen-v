import { QUEUE_DETAIL_THRESHOLD_MINS, QUEUE_HISTORY_MAX, QUEUE_HISTORY_TTL_MS } from "../shared/config.js";
import { formatDuration, formatMins, parseTimeStr } from "../shared/datetime.js";
import { storageGet, storageRemove, storageSet } from "../shared/runtime.js";
import { vs } from "../shared/lifecycle.js";
import { CLS, DAT, ID, txt } from "../shared/token.js";

// Stable per-tab sessionStorage key derived from extension ID (not branded)
function ssKey() {
  return '_' + (chrome.runtime?.id || 'x').slice(-4);
}

export function poweredByFooter() {
  const footer = document.createElement("div");
  footer.className = CLS.footer;
  footer.textContent = txt([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]);
  return footer;
}

export function renderHistoryTable(history) {
  let container = document.getElementById(ID.histCont);
  if (container) container.remove();
  container = document.createElement("div");
  container.id = ID.histCont;
  container.className = CLS.card;
  container.dataset[DAT.mark] = "";
  const header = document.createElement("h4");
  header.className = CLS.cardTtl;
  header.textContent = txt([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]);
  container.appendChild(header);
  const scrollWrapper = document.createElement("div");
  scrollWrapper.className = CLS.histScrl;
  const table = document.createElement("table");
  table.id = ID.histTbl;
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
        deltaClass = CLS.dltDn;
      } else if (diff > 0) {
        changeText = `+${diff}m`;
        deltaClass = CLS.dltUp;
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

export function scrapeQueueMinutes() {
  for (const script of document.querySelectorAll("script")) {
    const match = script.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);
    if (match) return parseInt(match[1], 10);
  }
  return null;
}

export function handleWaitingRoom() {
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
    const SK = ssKey();
    let tabId = sessionStorage.getItem(SK);
    if (!tabId) {
      tabId = Math.random().toString(36).substring(2, 11);
      sessionStorage.setItem(SK, tabId);
    }
    storageGet({ queueHistory: {} }).then((storage) => {
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
        storageSet({ queueHistory: cleanedMap });
      }
      renderHistoryTable(history);
    });
  }
}

export function showBlockMessage(isCgiBlock, seconds) {
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
  alert.dataset[DAT.mark] = "";
  alert.textContent = message;
  row.replaceChildren(alert);
  row.style.removeProperty("display");
  row.parentElement?.style.removeProperty("display");
}

export function handleCf1015() {
  const h1 = document.querySelector("h1");
  const is1015Error = h1 && h1.textContent.includes("Error") && h1.textContent.includes("1015");
  if (!is1015Error) return;
  storageGet({ cfRetryAfter: null }).then((storage) => {
    const retryAfter = parseInt(storage.cfRetryAfter, 10);
    if (!isNaN(retryAfter)) {
      storageRemove("cfRetryAfter");
      const container = document.getElementById("what-happened-section");
      if (container) {
        const timerCard = document.createElement("div");
        timerCard.id = ID.cdCard;
        timerCard.className = CLS.card;
        timerCard.dataset[DAT.mark] = "";
        const header = document.createElement("h4");
        header.className = CLS.cardTtl;
        header.textContent = txt([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]);
        timerCard.appendChild(header);
        const timeSpan = document.createElement("div");
        timeSpan.id = ID.cdTime;
        timerCard.appendChild(timeSpan);
        const divider = document.createElement("div");
        divider.className = CLS.cdDiv;
        timerCard.appendChild(divider);
        timerCard.appendChild(poweredByFooter());
        container.appendChild(timerCard);
        let remaining = retryAfter;
        let interval = null;
        const updateTimer = () => {
          if (remaining > 0) {
            timeSpan.textContent = formatDuration(remaining);
            remaining--;
          } else {
            timeSpan.classList.add(CLS.cdDiv + "-over");
            timeSpan.textContent = "You can try refreshing now!";
            if (interval != null) vs.clear(interval);
          }
        };
        updateTimer();
        interval = vs.setInterval(updateTimer, 1e3);
      }
    }
  });
}
