/**
 * Sample A floating status card (bottom-right):
 * name, visa, next-city seconds (whole seconds only), last 3 cities + slots.
 * Submit = amber banner (no pause/countdown). No preferred-city picker here.
 */
import { getProfile } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";
import { CLS, DAT, ID, idSel } from "../shared/token.js";

var CITY_LOG_MAX = 3;
/** @type {{ id: string, name: string, slots: boolean|null }[]} */
var _cityLog = [];
var _hudTimer = null;
var _hudMin = false;
try {
  _hudMin = sessionStorage.getItem("tikTikHudMin") === "1";
} catch { /* ignore */ }

function _setHudMin(root, min) {
  _hudMin = !!min;
  try {
    sessionStorage.setItem("tikTikHudMin", _hudMin ? "1" : "0");
  } catch { /* ignore */ }
  if (!root) return;
  root.classList.toggle(CLS.hudMin, _hudMin);
  const btn = root.querySelector(idSel(ID.hudToggle));
  if (btn) {
    btn.textContent = _hudMin ? "+" : "–";
    btn.setAttribute("aria-label", _hudMin ? "Expand status" : "Minimise status");
  }
}

export function noteHudCityHop(cityId, cityName) {
  const id = String(cityId || "").trim();
  if (!id) return;
  const name = String(cityName || id).trim() || id;
  if (_cityLog.length && _cityLog[0].slots == null && _cityLog[0].id !== id) {
    _cityLog[0].slots = false;
  }
  if (_cityLog[0]?.id === id) {
    _cityLog[0].name = name || _cityLog[0].name;
    return;
  }
  _cityLog.unshift({ id, name, slots: null });
  if (_cityLog.length > CITY_LOG_MAX) _cityLog.length = CITY_LOG_MAX;
}

export function noteHudCitySlots(cityId, found, cityName) {
  const id = String(cityId || "").trim();
  if (!id) return;
  const hit = _cityLog.find((c) => c.id === id);
  if (hit) {
    hit.slots = !!found;
    if (cityName) hit.name = String(cityName).trim() || hit.name;
    return;
  }
  _cityLog.unshift({
    id,
    name: String(cityName || id).trim() || id,
    slots: !!found,
  });
  if (_cityLog.length > CITY_LOG_MAX) _cityLog.length = CITY_LOG_MAX;
}

function _ensureDom() {
  let root = document.querySelector(idSel(ID.hud));
  if (root) return root;
  root = document.createElement("div");
  root.id = ID.hud;
  root.className = CLS.hud;
  root.dataset[DAT.mark] = "";
  root.innerHTML = `
    <div class="${CLS.hudHead}">
      <span>Tik Tik</span>
      <span class="${CLS.hudMiniSecs}" id="${ID.hudSecs}-mini"></span>
      <button type="button" id="${ID.hudToggle}" class="${CLS.hudToggle}" aria-label="Minimise status">–</button>
    </div>
    <div class="${CLS.hudName}" id="${ID.hudName}">—</div>
    <div class="${CLS.hudVisa}" id="${ID.hudVisa}">Visa · —</div>
    <div class="${CLS.hudBody}" id="${ID.hudBody}"></div>
    <div class="${CLS.hudHist}" id="${ID.hudHist}"></div>
  `;
  document.documentElement.appendChild(root);
  const btn = root.querySelector(idSel(ID.hudToggle));
  if (btn) {
    vs.on(btn, "pointerdown", (e) => e.stopPropagation());
    vs.on(btn, "click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      _setHudMin(root, !_hudMin);
    });
  }
  _setHudMin(root, _hudMin);
  return root;
}

function _wholeSeconds(n) {
  if (n == null || !Number.isFinite(n)) return null;
  return Math.max(0, Math.floor(Number(n) + 1e-9));
}

function _paintBody(bodyEl, state) {
  if (!bodyEl) return;
  const secs = _wholeSeconds(state.secondsUntilHop);

  if (state.submitPending) {
    bodyEl.replaceChildren();
    const box = document.createElement("div");
    box.className = CLS.hudSubmit;
    const title = document.createElement("div");
    title.className = CLS.hudSubmitTitle;
    title.textContent = "SUBMIT CLICKED";
    const sub = document.createElement("div");
    sub.className = CLS.hudSubmitSub;
    sub.textContent = "Waiting for confirmation…";
    box.append(title, sub);
    bodyEl.appendChild(box);
    return;
  }

  if (state.loadingStuck) {
    bodyEl.replaceChildren();
    const stuck = document.createElement("div");
    stuck.className = CLS.hudStuck;
    stuck.textContent = "Date Loading…";
    bodyEl.appendChild(stuck);
    return;
  }

  if (state.rotateActive && secs != null) {
    let row = bodyEl.querySelector(`.${CLS.hudCount}`);
    let secsEl = bodyEl.querySelector(idSel(ID.hudSecs));
    if (!row || !secsEl) {
      bodyEl.replaceChildren();
      row = document.createElement("div");
      row.className = CLS.hudCount;
      const label = document.createElement("span");
      label.className = CLS.hudCountLabel;
      label.textContent = "Next city change";
      secsEl = document.createElement("span");
      secsEl.id = ID.hudSecs;
      secsEl.className = CLS.hudSecs;
      row.append(label, secsEl);
      bodyEl.appendChild(row);
    }
    secsEl.textContent = `${secs}s`;
    return;
  }

  bodyEl.replaceChildren();
}

function _paintHist(histEl) {
  if (!histEl) return;
  histEl.replaceChildren();
  const title = document.createElement("div");
  title.className = CLS.hudHistTitle;
  title.textContent = "Last 3 cities";
  histEl.appendChild(title);
  if (!_cityLog.length) {
    const empty = document.createElement("div");
    empty.className = CLS.hudHistRow;
    empty.textContent = "No hops yet";
    histEl.appendChild(empty);
    return;
  }
  for (const c of _cityLog) {
    const row = document.createElement("div");
    row.className = CLS.hudHistRow;
    const label = document.createElement("span");
    label.textContent = c.name || c.id;
    const pill = document.createElement("span");
    if (c.slots === true) {
      pill.className = CLS.hudPillOk;
      pill.textContent = "Slots";
    } else if (c.slots === false) {
      pill.className = CLS.hudPillNo;
      pill.textContent = "No slots";
    } else {
      pill.className = CLS.hudPillNo;
      pill.textContent = "…";
    }
    row.append(label, pill);
    histEl.appendChild(row);
  }
}

/**
 * @param {{
 *   submitPending?: boolean,
 *   loadingStuck?: boolean,
 *   secondsUntilHop?: number|null,
 *   rotateActive?: boolean,
 *   hide?: boolean,
 * }} state
 */
export async function paintTikTikHud(state = {}) {
  if (!vs.alive) return;
  if (state.hide) {
    document.querySelector(idSel(ID.hud))?.remove();
    return;
  }
  const root = _ensureDom();
  // Drop preferred-cities block if an older HUD instance still has it.
  root.querySelector(idSel(ID.hudCities))?.remove();

  const profile = await getProfile().catch(() => null);
  const name =
    (profile?.name && String(profile.name).trim()) ||
    (profile?.email && String(profile.email).trim()) ||
    "—";
  const visa =
    (profile?.visa && String(profile.visa).trim()) ||
    (profile?.visaClass && String(profile.visaClass).trim()) ||
    "—";

  const nameEl = root.querySelector(idSel(ID.hudName));
  const visaEl = root.querySelector(idSel(ID.hudVisa));
  if (nameEl) nameEl.textContent = name;
  if (visaEl) visaEl.textContent = `Visa · ${visa}`;

  _paintBody(root.querySelector(idSel(ID.hudBody)), state);
  _paintHist(root.querySelector(idSel(ID.hudHist)));

  const mini = root.querySelector(idSel(`${ID.hudSecs}-mini`));
  if (mini) {
    const secs = _wholeSeconds(state.secondsUntilHop);
    mini.textContent = state.rotateActive && secs != null ? `${secs}s` : "";
  }
  if (!root.querySelector(idSel(ID.hudToggle))) {
    root.remove();
    paintTikTikHud(state);
  }
}

export function startTikTikHudLoop(getState) {
  if (_hudTimer) return;
  const beat = async () => {
    _hudTimer = null;
    if (!vs.alive) return;
    try {
      const state = typeof getState === "function" ? await getState() : {};
      await paintTikTikHud(state || {});
    } catch {
      /* ignore */
    }
    if (vs.alive) _hudTimer = vs.setTimeout(beat, 1000);
  };
  _hudTimer = vs.setTimeout(beat, 200);
}

export function stopTikTikHudLoop() {
  if (_hudTimer) {
    vs.clear(_hudTimer);
    _hudTimer = null;
  }
}
