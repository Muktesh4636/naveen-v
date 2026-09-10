// slotext v2.0.2 — generated from src/, do not edit
(() => {
  // src/shared/datetime.js
  function formatAgo(ms) {
    const dd = Math.floor(ms / 864e5);
    const hh = Math.floor(ms % 864e5 / 36e5);
    const mm = Math.floor(ms % 36e5 / 6e4);
    const ss = Math.floor(ms % 6e4 / 1e3);
    if (dd > 0) return `${dd}d ${hh}h ago`;
    if (hh > 0) return `${hh}h ${mm}m ago`;
    return `${mm}m ${ss}s ago`;
  }

  // src/shared/config.js
  var SITE_URL = "https://visaslots.info";
  var CONTRIBUTE_URL = `${SITE_URL}/contribute`;
  var QUEUE_HISTORY_TTL_MS = 24 * 60 * 60 * 1e3;
  var MAX_TOKEN_AGE_MS = 72 * 60 * 60 * 1e3;
  var SETTING_DEFAULTS = {
    recheckButton: true,
    defaultWaitTime: 60,
    audioAlert: false,
    autoSelectFirstDate: false
  };

  // src/popup.js
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
})();
