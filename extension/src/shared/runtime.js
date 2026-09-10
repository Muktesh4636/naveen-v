/** True when this content script can still talk to the extension. */
export function extensionAlive() {
  try {
    return typeof chrome !== "undefined" && !!chrome.runtime?.id;
  } catch {
    return false;
  }
}

export function storageGet(keys) {
  if (!extensionAlive()) {
    return Promise.resolve(typeof keys === "string" ? {} : keys);
  }
  return chrome.storage.local.get(keys).catch(() => {
    if (typeof keys === "string") return {};
    const fallback = {};
    for (const [k, v] of Object.entries(keys)) fallback[k] = v;
    return fallback;
  });
}

export function storageSet(items) {
  if (!extensionAlive()) return Promise.resolve();
  return chrome.storage.local.set(items).catch(() => {});
}

export function storageRemove(keys) {
  if (!extensionAlive()) return Promise.resolve();
  return chrome.storage.local.remove(keys).catch(() => {});
}

/** Stop timers when the extension was reloaded and this tab still has an old script. */
export function watchExtensionContext(onInvalid) {
  const invalidate = () => {
    try { onInvalid?.(); } catch {}
  };

  window.addEventListener("unhandledrejection", (event) => {
    const msg = String(event.reason?.message || event.reason || "");
    if (msg.includes("Extension context invalidated")) {
      event.preventDefault();
      invalidate();
    }
  });

  const id = setInterval(() => {
    if (!extensionAlive()) {
      clearInterval(id);
      invalidate();
    }
  }, 1500);

  return () => clearInterval(id);
}
