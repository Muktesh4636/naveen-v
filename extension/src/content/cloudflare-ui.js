import { getSetting } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";
import { CLS, DAT, ID, idSel } from "../shared/token.js";

var _hideTimer = null;
var _lastState = "";

const MESSAGES = {
  scanning: "Scanning for Cloudflare challenge…",
  dom: "Trying page-level verify click…",
  debugger: "Advanced click — targeting Turnstile iframe…",
  retry: "Waiting before next attempt…",
  success: "Verification passed — continuing…",
  manual: "Stuck? Click the checkbox once, then we’ll continue.",
};

export function flashClickPoints(points) {
  if (!points?.length) return;
  for (const pt of points.slice(0, 2)) {
    const ring = document.createElement("div");
    ring.className = CLS.cfFlash;
    ring.dataset[DAT.mark] = "";
    ring.style.left = `${pt.x - 14}px`;
    ring.style.top = `${pt.y - 14}px`;
    document.documentElement.appendChild(ring);
    vs.setTimeout(() => ring.remove(), 1200);
  }
}

function _ensureHud() {
  let hud = document.querySelector(idSel(ID.cfHud));
  if (hud) return hud;

  hud = document.createElement("div");
  hud.id = ID.cfHud;
  hud.dataset[DAT.mark] = "";
  hud.setAttribute("role", "status");
  hud.setAttribute("aria-live", "polite");
  hud.innerHTML = `
    <div class="${CLS.cfHud}">
      <div class="${CLS.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">🛡</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${MESSAGES.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `;
  document.documentElement.appendChild(hud);
  return hud;
}

export async function updateCloudflareHud(state, sub) {
  if (!chrome.runtime?.id || !vs.alive) return;
  if (!await getSetting("autoCloudflareTick")) return;

  const hud = _ensureHud();
  const msgEl = hud.querySelector("[data-cf-msg]");
  const subEl = hud.querySelector("[data-cf-sub]");
  const chipEl = hud.querySelector("[data-cf-chip]");
  const wrap = hud.querySelector(`.${CLS.cfHud}`);

  _lastState = state;
  if (msgEl) msgEl.textContent = MESSAGES[state] || MESSAGES.scanning;
  if (subEl) subEl.textContent = sub || _defaultSub(state);
  if (chipEl) {
    chipEl.textContent = state === "success" ? "Done" : state === "manual" ? "Help" : "Active";
    chipEl.dataset.state = state;
  }
  if (wrap) {
    wrap.dataset.state = state;
  }

  if (_hideTimer) {
    vs.clear(_hideTimer);
    _hideTimer = null;
  }
  if (state === "success") {
    _hideTimer = vs.setTimeout(() => hideCloudflareHud(), 2800);
  }
}

function _defaultSub(state) {
  if (state === "debugger") return "Precision click via advanced browser bridge";
  if (state === "dom") return "Standard page interaction";
  if (state === "manual") return "One manual click is usually enough";
  if (state === "success") return "Resuming login and recovery";
  return "Monitoring this tab for Turnstile";
}

export function hideCloudflareHud() {
  const hud = document.querySelector(idSel(ID.cfHud));
  if (hud) hud.remove();
  _lastState = "";
  if (_hideTimer) {
    vs.clear(_hideTimer);
    _hideTimer = null;
  }
}

export function getCloudflareHudState() {
  return _lastState;
}
