import {
  isCloudflareChallenge,
  isCloudflareSolved,
  startCloudflareWatch,
} from "./content/cloudflare-tick.js";
import { retirePrevious, vs } from "./shared/lifecycle.js";
import { storageGet, storageSet, watchExtensionContext } from "./shared/runtime.js";
import { logEvent } from "./shared/eventlog.js";

retirePrevious();
watchExtensionContext(() => vs.destroy());

var _lastNote = "";
/** loginTick runs every 1.5s — only log when the reason changes. */
function note(kind, msg, level = "info") {
  if (msg === _lastNote) return;
  _lastNote = msg;
  logEvent(kind, msg, {}, level);
}
logEvent("login", `Login page opened (${location.pathname.slice(0, 80)})`);

function currentUsername() {
  const input = document.querySelector(
    "input[id='signInName'], input[id='signInNameReadOnly']"
  );
  return input ? input.value : null;
}

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function matchAnswer(questionText, security) {
  const qn = norm(questionText);
  if (!qn) return "";
  let best = "";
  let bestScore = 0;
  for (const row of security || []) {
    const rq = norm(row.q);
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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function setNativeValue(el, value) {
  if (!el) return;
  const proto = el instanceof HTMLTextAreaElement
    ? HTMLTextAreaElement.prototype
    : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
  setter ? setter.call(el, value) : (el.value = value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
}

/** Type like a person: focus, then one character at a time with uneven delays. */
async function typeHuman(el, text) {
  if (!el || text == null) return;
  const value = String(text);
  if (el.value === value) return;
  el.focus();
  await sleep(rand(250, 600));
  setNativeValue(el, "");
  let built = "";
  for (let i = 0; i < value.length; i++) {
    const ch = value[i];
    built += ch;
    setNativeValue(el, built);
    el.dispatchEvent(new KeyboardEvent("keydown", { key: ch, bubbles: true }));
    el.dispatchEvent(new KeyboardEvent("keypress", { key: ch, bubbles: true }));
    el.dispatchEvent(new KeyboardEvent("keyup", { key: ch, bubbles: true }));
    // ~90–220ms per key; longer pause after space / @ / .
    let delay = rand(90, 220);
    if (/[\s@._]/.test(ch)) delay += rand(120, 320);
    if (Math.random() < 0.08) delay += rand(200, 450); // occasional hesitation
    await sleep(delay);
  }
  el.dispatchEvent(new Event("change", { bubbles: true }));
  el.blur();
  await sleep(rand(200, 500));
}

async function loadTikTikCreds() {
  const store = await storageGet(["aiSubmitByAccount", "profile"]);
  const all = store.aiSubmitByAccount || {};
  const id = store.profile?.id ? String(store.profile.id) : null;
  let cfg = id ? all[id] : null;
  if (!cfg?.loginId) {
    cfg = Object.values(all).find((c) => c?.loginId) || cfg;
  }
  return cfg || {};
}

var _filling = false;
var _nextClickedAt = 0;
var _continueClickedAt = 0;
var CLICK_COOLDOWN_MS = 15_000;

function _verifyBlocking() {
  return isCloudflareChallenge() && !isCloudflareSolved();
}

async function fillFromTikTik(cfg) {
  if (!cfg || _filling) return;
  if (!await storageGet({ autofillLogin: true }).then((s) => s.autofillLogin)) {
    note("login", "Auto-login setting is OFF — not filling", "warn");
    return;
  }
  if (!cfg.loginId || !cfg.loginPass) {
    note("login", "No saved login ID/password in extension — cannot auto-login", "error");
  }
  _filling = true;
  try {
    const user = document.querySelector("#signInName, #signInNameReadOnly");
    const pass = document.querySelector("#password");

    if (user && cfg.loginId && user.value !== cfg.loginId) {
      await typeHuman(user, cfg.loginId);
      await sleep(rand(400, 900));
    }
    if (pass && cfg.loginPass && !pass.value) {
      await typeHuman(pass, cfg.loginPass);
      await sleep(rand(500, 1100));
    }

    const kbaIds = ["kba1_response", "kba2_response", "kba3_response"];
    let filled = 0;
    for (const kid of kbaIds) {
      const input = document.getElementById(kid);
      if (!input || input.value) continue;
      const wrap = input.closest(".form-group, li, div") || input.parentElement;
      const text = wrap?.textContent || "";
      const ans = matchAnswer(text, cfg.security);
      if (!ans) {
        note("login", `No saved answer matches security question: "${text.replace(/\s+/g, " ").trim().slice(0, 140)}"`, "error");
        continue;
      }
      await typeHuman(input, ans);
      filled++;
      await sleep(rand(350, 800));
    }

    await sleep(rand(600, 1400));
    // Sign in fails silently while "Verify you are human" is unticked — wait for the user.
    if (_verifyBlocking()) {
      note("verify", "Login filled — waiting for 'Verify you are human' tick", "warn");
      return;
    }
    const now = Date.now();
    if (filled) {
      const cont = document.querySelector("button#continue");
      if (cont && now - _continueClickedAt > CLICK_COOLDOWN_MS) {
        _continueClickedAt = now;
        _lastNote = "";
        logEvent("login", `Typed ${filled} security answer(s) — clicked Continue`);
        cont.click();
      }
    } else if (pass && pass.value) {
      const next = document.querySelector("button#next");
      if (next && now - _nextClickedAt > CLICK_COOLDOWN_MS) {
        _nextClickedAt = now;
        _lastNote = "";
        logEvent("login", `Clicked Sign in for ${user?.value || cfg.loginId || "?"}`);
        next.click();
      }
    }
  } finally {
    _filling = false;
  }
}

function fillAnswers() {
  if (!chrome.runtime?.id) return;
  if (_filling) return;
  const username = currentUsername();
  chrome.storage.local.get("autofill").then(async (storage) => {
    // Prefer slow Tik Tik fill; skip instant bulk autofill for password/login fields
    const answers = (storage.autofill || {})[username] || {};
    for (const input of document.querySelectorAll("input")) {
      if (!Object.hasOwn(answers, input.id) || input.value) continue;
      if (input.type === "password" || /signInName|password/i.test(input.id)) continue;
      // security answers still typed slowly via Tik Tik path below
    }
  });
  loadTikTikCreds().then(fillFromTikTik);
}

function storeAnswers() {
  const continueBtn = document.querySelector("button#continue");
  if (!continueBtn) return;
  const keysToStore = ["kba1_response", "kba2_response", "kba3_response"];
  continueBtn.addEventListener("click", () => {
    if (!chrome.runtime?.id) return;
    const username = currentUsername();
    if (!username) return;
    chrome.storage.local.get("autofill").then((storage) => {
      const autofill = storage.autofill || {};
      autofill[username] = autofill[username] || {};
      document.querySelectorAll("input").forEach((input) => {
        if (keysToStore.includes(input.id)) {
          autofill[username][input.id] = input.value;
        }
      });
      chrome.storage.local.set({ autofill });
    });
  });
}

var _storeBound = false;

// The sign-in page swaps email/password and security-question steps without a
// full reload, so keep checking instead of filling once at load.
function loginTick() {
  if (!chrome.runtime?.id) return;
  for (const el of document.querySelectorAll(".error.pageLevel, .error.itemLevel, [role='alert']")) {
    const text = (el.textContent || "").replace(/\s+/g, " ").trim();
    if (text.length > 3 && el.offsetParent !== null) note("login", `Login page error: ${text.slice(0, 300)}`, "error");
  }
  const ready = document.querySelector("button#continue, button#next, #password, #kba1_response");
  if (!ready) return;
  fillAnswers();
  if (!_storeBound && document.querySelector("button#continue")) {
    _storeBound = true;
    storeAnswers();
  }
}
setTimeout(loginTick, 300);
setInterval(loginTick, 1500);
startCloudflareWatch();
