// slotext v2.0.2 — generated from src/, do not edit
function redirectResponse() {

  if (window.__vsRedirectHooked && !window.__vsUnhook) return;
  window.__vsUnhook?.();

  const generation = (window.__vsHookGeneration = (window.__vsHookGeneration || 0) + 1);

  let attempts = 0;
  const install = () => {
    if (window.__vsHookGeneration !== generation) return;
    const $ = window.jQuery || window.$;
    if (!$) {
      if (++attempts < 50) setTimeout(install, 100);
      return;
    }

    const onSend = (event, xhr, settings) => {
      window.postMessage({
        action: "redirectRequest",
        url: settings.url,
      });
    };
    const onSuccess = (event, xhr, settings) => {

      let response;
      try {
        response = JSON.parse(xhr.responseText);
      } catch (e) {
        return;
      }
      window.postMessage({
        action: "redirectResponse",
        status: xhr.status,
        url: settings.url,
        request: settings.data,
        response: response,
      });
    };
    const onError = (event, xhr, settings, error) => {
      window.postMessage({
        action: "redirectResponse",
        status: xhr.status,
        retryAfter: xhr.getResponseHeader("Retry-After"),

        cgiBlock: /Access limitation/.test(xhr.responseText || ""),
      });
    };

    $(document).on("ajaxSend", onSend).on("ajaxSuccess", onSuccess).on("ajaxError", onError);
    window.__vsUnhook = () => {
      $(document).off("ajaxSend", onSend).off("ajaxSuccess", onSuccess).off("ajaxError", onError);
      window.__vsUnhook = null;
    };

    window.__vsRedirectHooked = true;
  };
  install();
}

function suppressBlockPage() {

  window.__vsUnpatchBlock?.();

  const original = XMLHttpRequest.prototype.getResponseHeader;
  XMLHttpRequest.prototype.getResponseHeader = function (name) {
    if (this.status !== 429 || String(name).toLowerCase() !== "server") {
      return original.apply(this, arguments);
    }
    return null;
  };

  window.__vsUnpatchBlock = () => {
    XMLHttpRequest.prototype.getResponseHeader = original;
    window.__vsUnpatchBlock = null;
  };
}

function readOfcAppointments() {
  let attempts = 0;
  const read = () => {
    const data = window.ofcAppointments;
    if (Array.isArray(data) && data.length) {
      window.postMessage({ action: "ofcAppointments", data });
      return;
    }
    if (++attempts < 40) {
      setTimeout(read, 250);
      return;
    }
    window.postMessage({ action: "ofcAppointments", data: data || null });
  };
  read();
}

function selectFirstDate(dateStr) {
  const $ = window.jQuery || window.$;
  if (!$ || !dateStr) return;
  const [year, month, day] = dateStr.slice(0, 10).split("-").map(Number);
  if (!year || !month || !day) return;
  try {
    const picker = $("#datepicker");
    if (!picker.length || !picker.hasClass("hasDatepicker")) return;
    picker.datepicker("setDate", new Date(year, month - 1, day));

    $(".ui-datepicker-current-day").trigger("click");
  } catch (e) {

  }
}

function requestPermission() {
  chrome.permissions
    .request({
      origins: ["https://atlasauth.b2clogin.com/*"],
    })
    .then((granted) => {
      if (granted) {
        registerContentScript();
      }
    });
}

function registerContentScript() {
  return chrome.scripting
    .getRegisteredContentScripts({ ids: ["questions"] })
    .then((scripts) => {
      if (scripts.length === 0) {
        return chrome.scripting.registerContentScripts([
          {
            id: "questions",
            js: ["scripts/questions.js"],
            matches: ["https://atlasauth.b2clogin.com/*"],
          },
        ]);
      }
    });
}

function unregisterContentScript() {
  return chrome.scripting.unregisterContentScripts({ ids: ["questions"] });
}

chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    if (details.statusCode === 429 || details.statusCode === 403) {
      const retryHeader = details.responseHeaders.find((h) => h.name.toLowerCase() === "retry-after");
      if (retryHeader) {
        chrome.storage.local.set({ cfRetryAfter: retryHeader.value });
      }
    }
  },
  { urls: ["*://*.usvisascheduling.com/*"], types: ["main_frame"] },
  ["responseHeaders"]
);

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const idToken = details.requestBody?.formData?.id_token?.[0];
    if (idToken) {
      chrome.storage.local.set({ cgiIdToken: { value: idToken, capturedAt: Date.now() } });
    }
  },
  {
    urls: ["https://www.usvisascheduling.com/signin-aad-b2c_1"],
    types: ["main_frame", "sub_frame"],
  },
  ["requestBody"]
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.action == "registerRedirect" && sender.tab) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: redirectResponse,
      world: "MAIN",
    });
  }

  if (message.action == "registerBlockGuard" && sender.tab) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: suppressBlockPage,
      world: "MAIN",
    });
  }

  if (message.action == "registerOfcReader" && sender.tab) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: readOfcAppointments,
      world: "MAIN",
    });
  }

  if (message.action == "selectFirstDate" && sender.tab) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: selectFirstDate,
      args: [message.date],
      world: "MAIN",
    });
  }

  if (message.action == "requestPermission") {
    requestPermission();
  }

  if (message.action == "registerContentScript") {
    registerContentScript();
  }

  if (message.action == "unregisterContentScript") {
    unregisterContentScript();
  }
});

chrome.permissions
  .contains({ origins: ["https://atlasauth.b2clogin.com/*"] })
  .then((present) => {
    if (present) {
      registerContentScript();
    }
  });

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({ url: "https://www.usvisascheduling.com/*" }).then((tabs) => {
    for (const tab of tabs) {
      chrome.scripting
        .executeScript({ target: { tabId: tab.id }, files: ["scripts/content.js"] })
        .catch(() => {});
    }
  });
});
