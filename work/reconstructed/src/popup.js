var cachedContribs = null;
var emailValueEl = document.querySelector("#status-email");
var contribsCountValueEl = document.querySelector("#status-contribs");
var updatedValueEl = document.querySelector("#status-updated");
function renderStatus() {
  if (!cachedContribs) return;
  if (cachedContribs.email && emailValueEl) {
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
  renderStatus();
  setTimeout(tick, 5e3);
}
chrome.storage.local.get("contribs").then((storage) => {
  if (storage.contribs) {
    cachedContribs = storage.contribs;
    renderStatus();
  }
  tick();
});
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.contribs) {
    cachedContribs = changes.contribs.newValue;
    renderStatus();
  }
});
var versionEl = document.querySelector("#version");
if (versionEl) versionEl.textContent = "v" + chrome.runtime.getManifest().version;
var audioAlertEl = document.querySelector("#audioAlert");
function syncAudioMuted(waitSeconds) {
  if (audioAlertEl) audioAlertEl.disabled = !waitSeconds;
}
var SETTINGS = [
  { id: "#defaultWaitTime", key: "defaultWaitTime", type: "select", onChange: syncAudioMuted },
  { id: "#recheckButton", key: "recheckButton", type: "checkbox" },
  { id: "#audioAlert", key: "audioAlert", type: "checkbox" },
  { id: "#autoSelectFirstDate", key: "autoSelectFirstDate", type: "checkbox" }
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
});
var autofillToggle = document.querySelector("#autofill");
if (autofillToggle) {
  autofillToggle.addEventListener("change", (e) => {
    chrome.runtime.sendMessage({
      action: e.target.checked ? "requestPermission" : "unregisterContentScript"
    });
  });
  chrome.scripting.getRegisteredContentScripts({ ids: ["questions"] }).then((scripts) => {
    autofillToggle.checked = scripts.length > 0;
  });
}
