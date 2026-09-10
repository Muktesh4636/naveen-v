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
