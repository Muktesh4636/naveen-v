import { SETTING_DEFAULTS } from "./shared/config.js";
import { extensionAlive } from "./shared/runtime.js";
import { formatAgo } from "./shared/datetime.js";

var cachedContribs = null;
var emailValueEl = document.querySelector("#status-email");
var applicantValueEl = document.querySelector("#status-applicant");
var contribsCountValueEl = document.querySelector("#status-contribs");
var updatedValueEl = document.querySelector("#status-updated");

function renderLocalProfile(profile) {
  if (!profile) return;
  if (profile.email && emailValueEl) {
    emailValueEl.textContent = profile.email;
    emailValueEl.title = profile.email;
  }
  if (profile.id && applicantValueEl) {
    applicantValueEl.textContent = profile.id;
    applicantValueEl.title = profile.id;
  }
}

function renderContribs() {
  if (!cachedContribs) return;
  if (cachedContribs.email && emailValueEl && emailValueEl.textContent === "—") {
    emailValueEl.textContent = cachedContribs.email;
    emailValueEl.title = cachedContribs.email;
  }
  if (cachedContribs.count !== void 0 && contribsCountValueEl) {
    contribsCountValueEl.textContent = cachedContribs.count;
  }
  if (cachedContribs.updated && updatedValueEl) {
    updatedValueEl.textContent = formatAgo(Date.now() - cachedContribs.updated);
  }
}

function tick() {
  renderContribs();
  setTimeout(tick, 5000);
}

chrome.storage.local.get(["profile", "contribs"]).then((storage) => {
  renderLocalProfile(storage.profile);
  if (storage.contribs) {
    cachedContribs = storage.contribs;
    renderContribs();
  }
  tick();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (changes.profile) renderLocalProfile(changes.profile.newValue);
  if (changes.contribs) {
    cachedContribs = changes.contribs.newValue;
    renderContribs();
  }
});

var versionEl = document.querySelector("#version");
if (versionEl) versionEl.textContent = "v" + chrome.runtime.getManifest().version;

var audioAlertEl = document.querySelector("#audioAlert");
function syncAudioMuted(waitSeconds) {
  if (audioAlertEl) audioAlertEl.disabled = !waitSeconds;
}

var cfShieldCard = document.querySelector("#cfShieldCard");
var cfShieldStatus = document.querySelector("#cfShieldStatus");
var cfDebuggerToggle = document.querySelector("#cloudflareDebuggerClick");

async function syncShieldCard() {
  if (!cfShieldCard || !cfShieldStatus) return;
  const storage = await chrome.storage.local.get({
    autoCloudflareTick: true,
    cloudflareDebuggerClick: true,
  });
  const active = storage.autoCloudflareTick;
  const advanced = storage.cloudflareDebuggerClick;
  cfShieldCard.classList.toggle("is-off", !active);
  if (!active) {
    cfShieldStatus.textContent = "Off";
  } else if (advanced) {
    cfShieldStatus.textContent = "Advanced";
  } else {
    cfShieldStatus.textContent = "Standard";
  }
  if (cfDebuggerToggle) {
    cfDebuggerToggle.disabled = !active;
  }
}

var SETTINGS = [
  { id: "#defaultWaitTime", key: "defaultWaitTime", type: "select", onChange: syncAudioMuted },
  { id: "#recheckButton", key: "recheckButton", type: "checkbox" },
  { id: "#audioAlert", key: "audioAlert", type: "checkbox" },
  { id: "#autoSelectFirstDate", key: "autoSelectFirstDate", type: "checkbox" },
  { id: "#serverSync", key: "serverSync", type: "checkbox" },
  { id: "#autoCloudflareTick", key: "autoCloudflareTick", type: "checkbox", onChange: syncShieldCard },
  { id: "#cloudflareDebuggerClick", key: "cloudflareDebuggerClick", type: "checkbox", onChange: syncShieldCard },
  // TEMP: autofill login details hidden — re-enable with #autofill in popup HTML later
  // { id: "#autofill", key: "autofillLogin", type: "checkbox" },
  { id: "#telegramAlert", key: "telegramAlert", type: "checkbox" },
  { id: "#telegramViaAdb", key: "telegramViaAdb", type: "checkbox" },
  { id: "#telegramViaServer", key: "telegramViaServer", type: "checkbox" },
  { id: "#telegramScreenshots", key: "telegramScreenshots", type: "checkbox" },
  { id: "#telegramBotToken", key: "telegramBotToken", type: "text" },
  { id: "#telegramChatIds", key: "telegramChatIds", type: "text" },
];
var keysWithDefaults = {};
SETTINGS.forEach((s) => keysWithDefaults[s.key] = SETTING_DEFAULTS[s.key]);
chrome.storage.local.get(keysWithDefaults).then((storage) => {
  SETTINGS.forEach(({ id, key, type, onChange }) => {
    const el = document.querySelector(id);
    if (!el) return;
    if (type === "checkbox") {
      el.checked = storage[key];
      el.addEventListener("change", (e) => {
        chrome.storage.local.set({ [key]: e.target.checked });
        if (onChange) onChange();
      });
    } else if (type === "text") {
      el.value = storage[key] || "";
      el.addEventListener("change", (e) => {
        chrome.storage.local.set({ [key]: e.target.value.trim() });
      });
    } else if (type === "select") {
      el.value = String(storage[key]);
      if (onChange) onChange(storage[key]);
      el.addEventListener("change", (e) => {
        const val = parseInt(e.target.value, 10);
        chrome.storage.local.set({ [key]: val });
        if (onChange) onChange(val);
      });
    }
  });
  syncShieldCard();
});

var autofillToggle = document.querySelector("#autofill");
if (autofillToggle) {
  autofillToggle.addEventListener("change", (e) => {
    if (!extensionAlive()) return;
    chrome.runtime.sendMessage({
      action: e.target.checked ? "requestPermission" : "unregisterContentScript",
    });
  });
  chrome.scripting.getRegisteredContentScripts({ ids: ["questions"] }).then((scripts) => {
    autofillToggle.checked = scripts.length > 0;
  });
} else {
  // TEMP: force-off autofill while login UI is hidden
  chrome.storage.local.set({ autofillLogin: false });
  chrome.runtime.sendMessage({ action: "unregisterContentScript" }).catch(() => {});
}
