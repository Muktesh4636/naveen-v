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
