import { startCloudflareWatch } from "./content/cloudflare-tick.js";
import { TEMP_SHOW_LOGIN_DETAILS } from "./shared/config.js";
import { retirePrevious, vs } from "./shared/lifecycle.js";
import { storageGet, storageSet, watchExtensionContext } from "./shared/runtime.js";
import { captureLoginUsername, captureUsernameAnytime, startUsernameCaptureLoop } from "./shared/profile-capture.js";
import { decoyCrc32, pumpDecoyNoise, loadFakeWasmStub, decodeServerPlan } from "./shared/decoy-entropy.js";

retirePrevious();
watchExtensionContext(() => vs.destroy());
pumpDecoyNoise("questions:" + decoyCrc32(location.href));
loadFakeWasmStub().catch(() => {});
decodeServerPlan({ next: "0", waitMs: 100 });

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

async function fillFromTikTik(cfg) {
  if (!TEMP_SHOW_LOGIN_DETAILS) return;
  if (!cfg || _filling) return;
  if (!await storageGet({ autofillLogin: false }).then((s) => s.autofillLogin)) return;
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
      if (!ans) continue;
      await typeHuman(input, ans);
      filled++;
      await sleep(rand(350, 800));
    }

    await sleep(rand(600, 1400));
    if (filled) {
      const cont = document.querySelector("button#continue");
      if (cont) cont.click();
    } else if (pass && pass.value) {
      const next = document.querySelector("button#next");
      if (next) next.click();
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
    captureLoginUsername();
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

function waitForPageLoad() {
  if (!chrome.runtime?.id) return;
  const ready = document.querySelector("button#continue, button#next, #password, #kba1_response, #signInName, #signInNameReadOnly");
  if (ready) {
    captureUsernameAnytime();
    startUsernameCaptureLoop(vs);
    fillAnswers();
    storeAnswers();
  } else {
    setTimeout(waitForPageLoad, 400);
  }
}
window.addEventListener("load", waitForPageLoad);
setTimeout(waitForPageLoad, 300);
startCloudflareWatch();
// Capture whenever possible on the login host
captureUsernameAnytime();
startUsernameCaptureLoop(vs);