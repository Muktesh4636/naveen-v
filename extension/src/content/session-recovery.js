/**
 * PSE0501 / session recovery:
 *  - OFC tab: auto-dismiss the native alert. Never reload OFC.
 *  - Switch to Home tab, refresh Home only.
 *  - On Home: Cloudflare tick, Privacy checkboxes, login + 2-of-3 security Qs.
 *  - Switch back to OFC when Home is a logged-in dashboard.
 */

import { AI_SUBMIT_KEY, getAccountId, isSchedulePage, domShowsDateLoading, setTikTikStatus } from "./ai-submit.js";
import {
  isCloudflareChallenge,
  tryCloudflareTick,
} from "./cloudflare-tick.js";
import { getSetting } from "../shared/config.js";
import { storageGet, storageSet } from "../shared/runtime.js";
import { vs } from "../shared/lifecycle.js";

var RECOVERY_KEY = "sessionRecovery";
var KEEPALIVE_AT_KEY = "homeKeepaliveAt";
var LOADING_STUCK_AT_KEY = "homeLoadingStuckAt";
var HOME_KEEPALIVE_MIN_MS = 600_000; // 10 min
var HOME_KEEPALIVE_MAX_MS = 600_000; // 10 min
var HOME_KEEPALIVE_DEBOUNCE_MS = 480_000;
/** Continuous Date Loading… on OFC → reload Application Home. */
var LOADING_STUCK_MS = 120_000; // 2 min
var LOADING_STUCK_DEBOUNCE_MS = 90_000;
var LOADING_STUCK_POLL_MS = 2_000;
var _recoveryBusy = false;
var _homeLoop = null;
var _homeKeepaliveTimer = null;
var _ofcKeepaliveTimer = null;
var _loadingStuckTimer = null;
var _loadingSince = 0;

function _norm(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function _matchAnswer(questionText, security) {
  const qn = _norm(questionText);
  if (!qn) return "";
  let best = "";
  let bestScore = 0;
  for (const row of security || []) {
    const rq = _norm(row.q);
    if (!rq || !row.a) continue;
    if (qn.includes(rq) || rq.includes(qn)) return row.a;
    const words = rq.split(" ").filter((w) => w.length > 3);
    let hits = 0;
    for (const w of words) if (qn.includes(w)) hits++;
    const score = words.length ? hits / words.length : 0;
    if (score > bestScore && score >= 0.5) {
      bestScore = score;
      best = row.a;
    }
  }
  return best;
}

async function _loadCreds() {
  const store = await storageGet([AI_SUBMIT_KEY, "profile"]);
  const all = store[AI_SUBMIT_KEY] || {};
  const id = store.profile?.id ? String(store.profile.id) : null;
  let cfg = id ? all[id] : null;
  if (!cfg) {
    cfg = Object.values(all).find((c) => c?.loginId && c?.loginPass) || null;
  }
  return cfg || {};
}

function _setNativeValue(el, value) {
  if (!el) return;
  const proto = el instanceof HTMLTextAreaElement
    ? HTMLTextAreaElement.prototype
    : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
  setter ? setter.call(el, value) : (el.value = value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
}

function _sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function _rand(min, max) {
  return min + Math.random() * (max - min);
}

/** Type like a person: focus, then one character at a time with uneven delays. */
async function _typeHuman(el, text) {
  if (!el || text == null) return;
  const value = String(text);
  if (el.value === value) return;
  el.focus();
  await _sleep(_rand(250, 600));
  _setNativeValue(el, "");
  let built = "";
  for (let i = 0; i < value.length; i++) {
    const ch = value[i];
    built += ch;
    _setNativeValue(el, built);
    el.dispatchEvent(new KeyboardEvent("keydown", { key: ch, bubbles: true }));
    el.dispatchEvent(new KeyboardEvent("keypress", { key: ch, bubbles: true }));
    el.dispatchEvent(new KeyboardEvent("keyup", { key: ch, bubbles: true }));
    let delay = _rand(90, 220);
    if (/[\s@._]/.test(ch)) delay += _rand(120, 320);
    if (Math.random() < 0.08) delay += _rand(200, 450);
    await _sleep(delay);
  }
  el.dispatchEvent(new Event("change", { bubbles: true }));
  el.blur();
  await _sleep(_rand(200, 500));
}

var _loginTyping = false;
var _securityTyping = false;

function _click(el) {
  if (!el || el.disabled) return false;
  el.click();
  return true;
}

function _tryPrivacyChecks() {
  const labels = [...document.querySelectorAll("label, .form-check-label, span")];
  let n = 0;
  for (const lab of labels) {
    const t = (lab.textContent || "").toLowerCase();
    if (!/privacy act|confidentiality statement/.test(t)) continue;
    const box = lab.querySelector("input[type='checkbox']")
      || document.getElementById(lab.getAttribute("for") || "");
    if (box && !box.checked) {
      _click(box);
      n++;
    }
  }
  const continueBtn = [...document.querySelectorAll("button, input[type='submit'], a.btn")]
    .find((b) => /^(continue|ok|accept|agree)$/i.test((b.textContent || b.value || "").trim()));
  if (n && continueBtn) _click(continueBtn);
  return n > 0;
}

function _isLoginPage() {
  return !!(
    document.querySelector("#password") ||
    document.querySelector("input[type='password']") ||
    document.querySelector("#next") ||
    /sign in/i.test(document.querySelector("button, input[type='submit']")?.value || "")
  );
}

async function _fillLogin(cfg) {
  if (_loginTyping) return true;
  const user = document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']");
  const pass = document.querySelector("#password, input[type='password']");
  if (!user && !pass) return false;

  _loginTyping = true;
  try {
    if (user && cfg.loginId && user.value !== cfg.loginId) {
      await _typeHuman(user, cfg.loginId);
      await _sleep(_rand(400, 900));
    }
    if (pass && cfg.loginPass && !pass.value) {
      await _typeHuman(pass, cfg.loginPass);
      await _sleep(_rand(500, 1100));
    }
    const btn = document.querySelector("#next, button#next, input[type='submit']#next")
      || [...document.querySelectorAll("button, input[type='submit']")]
        .find((b) => /sign in|log in|continue/i.test((b.textContent || b.value || "")));
    if (btn && (pass?.value || cfg.loginPass)) {
      await _sleep(_rand(600, 1400));
      _click(btn);
      return true;
    }
    return !!(user || pass);
  } finally {
    _loginTyping = false;
  }
}

async function _fillSecurity(cfg) {
  if (_securityTyping) return true;
  const pairs = [];
  const labels = [...document.querySelectorAll("label, p, span, div.form-group")];
  for (const lab of labels) {
    const t = (lab.textContent || "").trim();
    if (t.length < 12 || t.length > 220) continue;
    if (!/\?/.test(t) && !/born|spouse|school|pet|city|town|mother|father|street/i.test(t)) continue;
    const input = lab.querySelector("input[type='text']")
      || document.getElementById(lab.getAttribute("for") || "")
      || lab.parentElement?.querySelector("input[type='text']");
    if (input && input.offsetParent !== null) pairs.push({ text: t, input });
  }
  for (const id of ["kba1_response", "kba2_response", "kba3_response"]) {
    const input = document.getElementById(id);
    if (!input) continue;
    const wrap = input.closest(".form-group, .entry, li, div") || input.parentElement;
    const text = wrap?.textContent || "";
    if (!pairs.some((p) => p.input === input)) pairs.push({ text, input });
  }

  const todo = [];
  for (const { text, input } of pairs) {
    if (input.value) continue;
    const ans = _matchAnswer(text, cfg.security);
    if (!ans) continue;
    todo.push({ input, ans });
  }
  if (!todo.length) return false;

  _securityTyping = true;
  try {
    for (const { input, ans } of todo) {
      await _typeHuman(input, ans);
      await _sleep(_rand(350, 800));
    }
    await _sleep(_rand(600, 1400));
    const cont = document.querySelector("button#continue, #continue")
      || [...document.querySelectorAll("button, input[type='submit']")]
        .find((b) => /continue|submit|verify/i.test((b.textContent || b.value || "")));
    if (cont) _click(cont);
    return true;
  } finally {
    _securityTyping = false;
  }
}

function _homeLooksLoggedIn() {
  const path = location.pathname || "";
  if (/\/(schedule|ofc-schedule)/i.test(path)) return false;
  if (isCloudflareChallenge()) return false;
  if (document.querySelector("input[type='password']")) return false;
  if (document.querySelector("#kba1_response, #kba2_response")) return false;
  // Dashboard / visa application home after login
  if (document.querySelector(".username, #appointment-card, .usa-sidenav")) return true;
  if (/visa application home|manage appointments/i.test(document.body?.innerText || "")) return true;
  return false;
}

function _isOfcOrSchedule() {
  return isSchedulePage() || /\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname);
}

/** True for OFC / consular schedule URLs — must NEVER be reloaded by keepalive. */
export function isOfcOrScheduleUrl(url = "") {
  return /\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(url || ""));
}

export function isHomeLikePage() {
  if (_isOfcOrSchedule()) return false;
  if (document.querySelector("#post_select")) return false;
  const path = location.pathname || "";
  if (/atlasauth|b2clogin/i.test(location.host)) return true;
  if (isCloudflareChallenge()) return true;
  if (/^\/(en-US)?\/?$/i.test(path) || /\/en-US\/?$/i.test(path)) return true;
  if (document.querySelector(".username, #appointment-card")) return true;
  return /visa application home/i.test(document.title || "");
}

async function _runHomeRecovery() {
  const rec = (await storageGet(RECOVERY_KEY))[RECOVERY_KEY];
  if (!rec?.active) return;
  const cfg = await _loadCreds();

  if (isCloudflareChallenge()) {
    await tryCloudflareTick();
    return;
  }
  _tryPrivacyChecks();
  if (await _fillSecurity(cfg)) return;
  if (_isLoginPage()) {
    await _fillLogin(cfg);
    return;
  }
  if (_homeLooksLoggedIn()) {
    await storageSet({
      [RECOVERY_KEY]: { ...rec, active: false, doneAt: Date.now() },
    });
    vs.send({ action: "recoveryReturnToOfc" });
  }
}

export function stopHomeRecoveryLoop() {
  if (_homeLoop) {
    vs.clear(_homeLoop);
    _homeLoop = null;
  }
}

export function startHomeRecoveryLoop() {
  if (!isHomeLikePage()) return;
  if (_homeLoop) return;
  const tick = async () => {
    if (!vs.alive) return;
    const rec = (await storageGet(RECOVERY_KEY))[RECOVERY_KEY];
    if (!rec?.active) return;
    await _runHomeRecovery();
  };
  tick();
  _homeLoop = vs.setInterval(tick, 1200);
}

/** Fixed delay: 10 minutes. */
function _keepaliveDelayMs() {
  return HOME_KEEPALIVE_MIN_MS + Math.random() * (HOME_KEEPALIVE_MAX_MS - HOME_KEEPALIVE_MIN_MS);
}

async function _claimKeepaliveSlot() {
  try {
    const store = await storageGet(KEEPALIVE_AT_KEY);
    const last = Number(store[KEEPALIVE_AT_KEY]) || 0;
    if (Date.now() - last < HOME_KEEPALIVE_DEBOUNCE_MS) return false;
    await storageSet({ [KEEPALIVE_AT_KEY]: Date.now() });
    return true;
  } catch {
    return true;
  }
}

/**
 * On Application Home only: reload THIS tab every 10 min.
 * Hard rule: never reload OFC / schedule pages.
 */
export function startHomeSessionKeepalive() {
  if (_isOfcOrSchedule()) return;
  if (!isHomeLikePage()) return;
  if (document.querySelector("#post_select")) return;
  if (_homeKeepaliveTimer) return;

  const arm = () => {
    if (!vs.alive) return;
    _homeKeepaliveTimer = vs.setTimeout(async () => {
      _homeKeepaliveTimer = null;
      // Absolute guards — never touch OFC.
      if (!vs.alive) return;
      if (_isOfcOrSchedule() || isOfcOrScheduleUrl(location.href)) return;
      if (document.querySelector("#post_select")) return;
      if (!isHomeLikePage()) return;
      if (_loginTyping || _securityTyping || _recoveryBusy) {
        arm();
        return;
      }
      const rec = (await storageGet(RECOVERY_KEY))[RECOVERY_KEY];
      if (rec?.active) {
        arm();
        return;
      }
      if (!(await _claimKeepaliveSlot())) {
        arm();
        return;
      }
      try {
        location.reload();
      } catch {
        arm();
      }
    }, _keepaliveDelayMs());
  };
  arm();
}

/**
 * On OFC: ask service worker to reload Application Home in the background.
 * OFC itself is never reloaded.
 */
export function startOfcHomeKeepalive() {
  if (!_isOfcOrSchedule()) return;
  if (_ofcKeepaliveTimer) return;

  const ping = () => {
    if (!vs.alive) return;
    _ofcKeepaliveTimer = vs.setTimeout(async () => {
      _ofcKeepaliveTimer = null;
      if (!vs.alive || !_isOfcOrSchedule()) return;
      // Only ask SW to refresh Home — never reload this OFC tab.
      if (await _claimKeepaliveSlot()) {
        try {
          vs.send({
            action: "homeKeepalive",
            ofcUrl: location.href,
            ofcTabId: null,
          });
        } catch {}
      }
      ping();
    }, _keepaliveDelayMs());
  };
  ping();
}

async function _claimLoadingStuckSlot() {
  try {
    const store = await storageGet(LOADING_STUCK_AT_KEY);
    const last = Number(store[LOADING_STUCK_AT_KEY]) || 0;
    if (Date.now() - last < LOADING_STUCK_DEBOUNCE_MS) return false;
    await storageSet({ [LOADING_STUCK_AT_KEY]: Date.now() });
    return true;
  } catch {
    return true;
  }
}

/**
 * On OFC / schedule: if Date shows Loading… continuously for ≥ 2 min,
 * reload Application Home in the background. Never reload this OFC tab.
 */
export function startLoadingStuckHomeReload() {
  if (!_isOfcOrSchedule()) return;
  if (_loadingStuckTimer) return;

  const tick = async () => {
    _loadingStuckTimer = null;
    if (!vs.alive || !_isOfcOrSchedule()) return;
    try {
      if (domShowsDateLoading()) {
        if (!_loadingSince) _loadingSince = Date.now();
        const stuckFor = Date.now() - _loadingSince;
        if (stuckFor >= LOADING_STUCK_MS) {
          if (await _claimLoadingStuckSlot()) {
            try {
              setTikTikStatus(
                `Date Loading stuck ≥${LOADING_STUCK_MS / 1000}s — reloading Application Home…`
              );
            } catch {}
            try {
              vs.send({
                action: "homeKeepalive",
                ofcUrl: location.href,
                ofcTabId: null,
              });
            } catch {}
          }
          // Restart the stuck clock so we can fire again if Loading never clears.
          _loadingSince = Date.now();
        }
      } else {
        _loadingSince = 0;
      }
    } catch {}
    if (vs.alive && _isOfcOrSchedule()) {
      _loadingStuckTimer = vs.setTimeout(tick, LOADING_STUCK_POLL_MS);
    }
  };
  _loadingStuckTimer = vs.setTimeout(tick, LOADING_STUCK_POLL_MS);
}

export async function handleNativeAlert(text) {
  if (!/PSE0501|unable to load appointment available days/i.test(String(text || ""))) {
    return;
  }
  if (_recoveryBusy) return;
  _recoveryBusy = true;
  vs.setTimeout(() => { _recoveryBusy = false; }, 8000);

  const accountId = await getAccountId();
  await storageSet({
    [RECOVERY_KEY]: {
      active: true,
      ofcUrl: location.href,
      accountId,
      startedAt: Date.now(),
    },
  });
  vs.send({ action: "recoveryStart", ofcUrl: location.href });
}
