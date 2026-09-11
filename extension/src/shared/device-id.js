/**
 * Stable install / device id for server device limits.
 * Stored in chrome.storage.local — survives reloads, not shared across browsers.
 */
import { storageGet, storageSet } from "./runtime.js";

const KEY = "installDeviceId";

function _randomId() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function getDeviceId() {
  const store = await storageGet(KEY);
  let id = store[KEY];
  if (typeof id === "string" && id.length >= 16) return id;
  id = _randomId();
  await storageSet({ [KEY]: id });
  return id;
}
