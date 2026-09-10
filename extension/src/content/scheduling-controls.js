import { getSetting, SCHEDULE_UI_WAIT_ATTEMPTS } from "../shared/config.js";
import { formatClock, formatDuration } from "../shared/datetime.js";
import {
  formatSlotWait,
  isInSlotWindow,
  msUntilSlotWindow,
  SLOT_WINDOW_LABEL,
} from "../shared/slotSchedule.js";
import { vs } from "../shared/lifecycle.js";
import { CLS, DAT, ID, idSel, txt } from "../shared/token.js";

export function ensureSelectorRow() {
  let row = document.querySelector(idSel(ID.selRow));
  if (row) return row;
  const dropdown = document.querySelector("#post_select");
  if (!dropdown) return null;
  const postRow = dropdown.closest(".row");
  if (!postRow) return null;
  row = document.createElement("div");
  row.id = ID.selRow;
  row.dataset[DAT.mark] = "";
  postRow.insertAdjacentElement("afterend", row);
  const anchor = document.createElement("span");
  anchor.id = ID.anchor;
  anchor.dataset[DAT.mark] = "";
  anchor.dataset[DAT.w] = dropdown.style.width;
  anchor.dataset[DAT.mw] = dropdown.style.minWidth;
  anchor.hidden = true;
  dropdown.insertAdjacentElement("beforebegin", anchor);
  vs.setStyle(dropdown, "width", "100%");
  vs.setStyle(dropdown, "minWidth", "0");
  row.appendChild(dropdown);
  return row;
}

export var WAIT_STATE_KEY = "waitPillState";
export var WAIT_STATE_MAX_AGE_MS = 60 * 60 * 1e3;
export var WAITING = CLS.pillWait;
export var DONE = CLS.pillDone;

export function pillMarkup(parts, variant) {
  const pill = document.createElement("span");
  pill.className = `${CLS.pill} ${variant}`;
  const add = (className, text) => {
    const el = document.createElement("span");
    el.className = className;
    el.textContent = text;
    pill.appendChild(el);
  };
  add(CLS.pillTtl, parts.title);
  if (parts.timer !== void 0) add(CLS.pillTmr, parts.timer);
  return pill;
}

export function pillView(state, now = Date.now()) {
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

export function pillParts(view, clockMode, now = new Date()) {
  const ist = formatClock(now);
  // Always show IST with seconds (like the wait timer). When a countdown
  // exists, IST is the title and the wait/elapsed duration is the timer.
  // When only waiting for a response, label stays and IST fills the timer slot.
  if (view.seconds === void 0) {
    return { title: clockMode ? ist : view.label, timer: clockMode ? void 0 : ist };
  }
  return { title: ist, timer: formatDuration(view.seconds) };
}

export var WaitPill = class {
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
    return pillParts(view, this.#clock, new Date());
  }
  #paint() {
    this.#slot ??= ensureWaitSlot();
    if (!this.#slot) return;
    const view = this.render();
    if (!view) {
      this.#slot.classList.add(CLS.hidden);
      return;
    }
    this.#slot.classList.remove(CLS.hidden);
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
    // IST seconds need a 1s tick while "waiting" (no countdown timer yet).
    // During "running", #timer already repaints every second.
    const needed = this.#state.kind === "waiting";
    if (needed && !this.#clockTimer) {
      this.#clockTimer = vs.setInterval(() => this.#paint(), 1e3);
    } else if (!needed && this.#clockTimer) {
      vs.clear(this.#clockTimer);
      this.#clockTimer = null;
    }
  }
};

export var waitPill = new WaitPill();

var PILL_POS_KEY = "pillPosition";
var DRAG_THRESHOLD = 4;

function _clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function _pillSize(el) {
  const rect = el.getBoundingClientRect();
  // Guard against a stretched/full-width measurement during layout
  const w = rect.width > 0 && rect.width < window.innerWidth * 0.9 ? rect.width : 190;
  const h = rect.height > 0 ? rect.height : 36;
  return { w, h };
}

function _placePill(el, left, top) {
  const { w, h } = _pillSize(el);
  const x = _clamp(left, 0, Math.max(0, window.innerWidth - w));
  const y = _clamp(top, 0, Math.max(0, window.innerHeight - h));
  // Left/top only — never set right (that locks/stretches the pill)
  el.style.setProperty("left", x + "px", "important");
  el.style.setProperty("top", y + "px", "important");
  el.style.setProperty("right", "auto", "important");
  el.style.setProperty("bottom", "auto", "important");
  el.style.setProperty("width", "max-content", "important");
  return { left: x, top: y };
}

function _makeDraggable(el) {
  var active = false;
  var moved = false;
  var startX = 0, startY = 0, startLeft = 0, startTop = 0;

  function onMove(e) {
    if (!active) return;
    var point = e.touches ? e.touches[0] : e;
    var dx = point.clientX - startX;
    var dy = point.clientY - startY;
    if (!moved && Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
    moved = true;
    el.setAttribute("data-dragging", "");
    el.dataset.skipClick = "1";
    _placePill(el, startLeft + dx, startTop + dy);
    if (e.cancelable) e.preventDefault();
  }

  function onUp() {
    if (!active) return;
    active = false;
    el.removeAttribute("data-dragging");
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
    document.removeEventListener("touchmove", onMove);
    document.removeEventListener("touchend", onUp);
    if (moved) {
      const rect = el.getBoundingClientRect();
      chrome.storage.local.set({
        [PILL_POS_KEY]: { top: Math.round(rect.top), left: Math.round(rect.left) },
      });
    }
    moved = false;
  }

  el.addEventListener("mousedown", function (e) {
    if (e.button !== 0) return;
    active = true;
    moved = false;
    delete el.dataset.skipClick;
    const rect = el.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    startLeft = rect.left;
    startTop = rect.top;
    // Convert from default calc(...) to explicit left before first drag
    _placePill(el, rect.left, rect.top);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    e.preventDefault();
    e.stopPropagation();
  });

  el.addEventListener("touchstart", function (e) {
    active = true;
    moved = false;
    delete el.dataset.skipClick;
    const rect = el.getBoundingClientRect();
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startLeft = rect.left;
    startTop = rect.top;
    _placePill(el, rect.left, rect.top);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onUp);
  }, { passive: true });
}

export function ensureWaitSlot() {
  let slot = document.querySelector(idSel(ID.waitTime));
  if (slot) return slot;
  slot = document.createElement("div");
  slot.id = ID.waitTime;
  slot.className = CLS.hidden;
  slot.title = "Shows Indian time (IST). Click to toggle.\nDrag anywhere to move.\nMoves aside automatically when the date calendar opens.";
  document.body.appendChild(slot);
  _makeDraggable(slot);
  chrome.storage.local.get(PILL_POS_KEY).then((res) => {
    const pos = res[PILL_POS_KEY];
    if (pos && typeof pos.top === "number" && typeof pos.left === "number") {
      _placePill(slot, pos.left, pos.top);
    }
  });
  _watchDatepicker(slot);
  return slot;
}

function _rectsOverlap(a, b, pad = 8) {
  return !(
    a.right + pad < b.left ||
    a.left - pad > b.right ||
    a.bottom + pad < b.top ||
    a.top - pad > b.bottom
  );
}

function _datepickerEl() {
  // jQuery UI datepicker widget (popup or inline)
  return (
    document.querySelector("#ui-datepicker-div:not([style*='display: none'])") ||
    document.querySelector(".ui-datepicker:not(.ui-helper-hidden)") ||
    document.querySelector("#datepicker .ui-datepicker") ||
    document.querySelector("#datepicker")
  );
}

function _safeCorners(el) {
  const { w, h } = _pillSize(el);
  const m = 12;
  return [
    { left: m, top: m }, // top-left
    { left: Math.max(m, window.innerWidth - w - m), top: m }, // top-right
    { left: m, top: Math.max(m, window.innerHeight - h - m) }, // bottom-left
    { left: Math.max(m, window.innerWidth - w - m), top: Math.max(m, window.innerHeight - h - m) }, // bottom-right
  ];
}

async function _savedPillPos() {
  const res = await chrome.storage.local.get(PILL_POS_KEY);
  const pos = res[PILL_POS_KEY];
  if (pos && typeof pos.top === "number" && typeof pos.left === "number") return pos;
  return null;
}

function _watchDatepicker(slot) {
  let dodging = false;

  const sync = async () => {
    if (!vs.alive || !slot.isConnected) return;
    if (slot.hasAttribute("data-dragging")) return;
    if (slot.classList.contains(CLS.hidden)) return;

    const cal = _datepickerEl();
    const calVisible = !!(cal && cal.offsetParent !== null && cal.getBoundingClientRect().height > 20);
    const pillRect = slot.getBoundingClientRect();

    if (calVisible && _rectsOverlap(pillRect, cal.getBoundingClientRect())) {
      // Move to a corner that does not cover the calendar
      const calRect = cal.getBoundingClientRect();
      const corners = _safeCorners(slot);
      const free = corners.find((c) => {
        const fake = {
          left: c.left,
          top: c.top,
          right: c.left + pillRect.width,
          bottom: c.top + pillRect.height,
        };
        return !_rectsOverlap(fake, calRect);
      }) || corners[2]; // prefer bottom-left fallback
      dodging = true;
      slot.setAttribute("data-dodging", "");
      _placePill(slot, free.left, free.top);
      return;
    }

    // Calendar gone / no overlap — restore user's saved position
    if (dodging && !calVisible) {
      dodging = false;
      slot.removeAttribute("data-dodging");
      const saved = await _savedPillPos();
      if (saved) _placePill(slot, saved.left, saved.top);
    } else if (!calVisible) {
      slot.removeAttribute("data-dodging");
    }
  };

  // Poll lightly — datepicker is injected dynamically after Ajax
  vs.setInterval(sync, 400);
  vs.on(window, "resize", sync);
}

export async function reserveWaitSlot() {
  if (!vs.alive) return;
  if (!await getSetting("defaultWaitTime")) return;
  if (!await vs.waitFor("#post_select", { attempts: SCHEDULE_UI_WAIT_ATTEMPTS })) return;
  const { waitPillClock } = await chrome.storage.local.get({ waitPillClock: false });
  waitPill.setClockMode(waitPillClock);
  await waitPill.restore();
}

export async function showWaiting() {
  if (!await getSetting("defaultWaitTime")) return;
  waitPill.waiting();
}

export async function showWaitTime(seconds) {
  if (!await getSetting("defaultWaitTime")) return;
  waitPill.run(seconds);
}

export function toggleClockMode() {
  waitPill.toggleClockMode();
}

export function applyClockMode(enabled) {
  waitPill.setClockMode(enabled);
}

export var beepTimeout = null;
export var slotsTimeout = null;
export var cachedAudioCtx = null;

export function getAudioContext() {
  if (!cachedAudioCtx) {
    cachedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    vs.disposable(() => cachedAudioCtx?.close());
  }
  return cachedAudioCtx;
}

export async function playBeep(durationMs = 150) {
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

export function playBeepBurst(count, onMs = 125, offMs = 125) {
  let played = 0;
  const playNext = () => {
    if (played >= count) return;
    playBeep(onMs);
    played++;
    vs.setTimeout(playNext, onMs + offMs);
  };
  playNext();
}

export var SLOTS_BEEPS = 4;
export var SLOTS_ON_MS = 50;
export var SLOTS_OFF_MS = 50;
export var SLOTS_PAUSE_MS = 600;

export function slotsAlert() {
  if (slotsTimeout) return;
  const round = () => {
    playBeepBurst(SLOTS_BEEPS, SLOTS_ON_MS, SLOTS_OFF_MS);
    const burstMs = SLOTS_BEEPS * SLOTS_ON_MS + (SLOTS_BEEPS - 1) * SLOTS_OFF_MS;
    slotsTimeout = vs.setTimeout(round, burstMs + SLOTS_PAUSE_MS);
  };
  round();
}

export var WAIT_TONE_MS = 250;
export var WAIT_INTERVAL_S = 10;
export var WAIT_TOTAL_S = 300;
export var WAIT_FLOURISH_MS = 1e3;

export function startBeeping() {
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

export function stopBeeping() {
  if (beepTimeout) {
    vs.clear(beepTimeout);
    beepTimeout = null;
  }
  if (slotsTimeout) {
    vs.clear(slotsTimeout);
    slotsTimeout = null;
  }
  stopSubmitAlarm();
}

export var submitAlarmTimeout = null;
export var submitAlarmBurstTimer = null;
export var submitAlarmNodes = null;
export var submitAlarmTitleTimer = null;
var _submitAlarmTitle = null;

export async function playSubmitAlarm() {
  stopSubmitAlarm();
  try {
    const audioCtx = getAudioContext();
    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }

    const master = audioCtx.createGain();
    master.gain.value = 1;
    master.connect(audioCtx.destination);

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    const gain2 = audioCtx.createGain();
    osc1.type = "square";
    osc2.type = "sawtooth";
    osc1.frequency.value = 880;
    osc2.frequency.value = 1320;
    gain1.gain.value = 0.85;
    gain2.gain.value = 0.65;
    osc1.connect(gain1).connect(master);
    osc2.connect(gain2).connect(master);

    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.type = "triangle";
    lfo.frequency.value = 3.2;
    lfoGain.gain.value = 280;
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    lfoGain.connect(osc2.frequency);

    const t = audioCtx.currentTime;
    osc1.start(t);
    osc2.start(t);
    lfo.start(t);
    submitAlarmNodes = { osc1, osc2, lfo, master };

    const burstLoop = () => {
      if (!submitAlarmNodes) return;
      playBeep(500);
      submitAlarmBurstTimer = vs.setTimeout(burstLoop, 1800);
    };
    burstLoop();

    submitAlarmTimeout = vs.setTimeout(stopSubmitAlarm, 120_000);

    _submitAlarmTitle = document.title;
    let flash = false;
    const flashTitle = () => {
      if (!submitAlarmNodes) return;
      document.title = flash ? _submitAlarmTitle : "!!! SUBMIT CLICKED !!!";
      flash = !flash;
      submitAlarmTitleTimer = vs.setTimeout(flashTitle, 450);
    };
    flashTitle();
  } catch (e) {
    console.error("Submit alarm failed:", e);
  }
}

export function stopSubmitAlarm() {
  if (submitAlarmTimeout) {
    vs.clear(submitAlarmTimeout);
    submitAlarmTimeout = null;
  }
  if (submitAlarmBurstTimer) {
    vs.clear(submitAlarmBurstTimer);
    submitAlarmBurstTimer = null;
  }
  if (submitAlarmTitleTimer) {
    vs.clear(submitAlarmTitleTimer);
    submitAlarmTitleTimer = null;
  }
  if (_submitAlarmTitle) {
    document.title = _submitAlarmTitle;
    _submitAlarmTitle = null;
  }
  if (submitAlarmNodes) {
    try {
      const { osc1, osc2, lfo } = submitAlarmNodes;
      osc1.stop();
      osc2.stop();
      lfo.stop();
    } catch (e) {}
    submitAlarmNodes = null;
  }
}

export function ensureRecheckButton() {
  if (document.querySelector(idSel(ID.recheck))) return;
  const row = ensureSelectorRow();
  if (!row) return;
  const dropdown = document.querySelector("#post_select");
  const btn = document.createElement("button");
  btn.id = ID.recheck;
  btn.type = "button";
  btn.textContent = txt([82,101,99,104,101,99,107]); // "Recheck"
  const syncRecheckState = () => {
    const inSlot = isInSlotWindow();
    const wait = msUntilSlotWindow();
    btn.disabled = !dropdown.value || !inSlot;
    btn.title = inSlot
      ? "Recheck slots for the selected city"
      : `Slot checks paused — IST windows ${SLOT_WINDOW_LABEL}. Next in ${formatSlotWait(wait)}.`;
    btn.classList.toggle(CLS.hidden, !dropdown.value);
  };
  vs.on(btn, "click", () => {
    if (!isInSlotWindow()) {
      const wait = formatSlotWait(msUntilSlotWindow());
      btn.title = `Outside slot window — next check at IST ${SLOT_WINDOW_LABEL} (in ${wait})`;
      syncRecheckState();
      return;
    }
    dropdown.dispatchEvent(new Event("change", { bubbles: true }));
  });
  row.appendChild(btn);
  syncRecheckState();
  vs.on(dropdown, "change", syncRecheckState);
  vs.setInterval(syncRecheckState, 1000);
}

export async function reserveRecheckButton() {
  if (!vs.alive) return;
  if (!await getSetting("recheckButton")) return;
  if (!await vs.waitFor("#post_select", { attempts: SCHEDULE_UI_WAIT_ATTEMPTS })) return;
  ensureRecheckButton();
}
