/**
 * Persistent debug logs for training / Cloudflare / uploads.
 * View in extension popup → Activity log, or DevTools console ([VS6]).
 */
import { storageGet, storageSet } from "./runtime.js";

export var DEBUG_LOG_KEY = "vsDebugLogs";
export var DEBUG_LOG_MAX = 200;

function _stamp() {
  try {
    return new Date().toLocaleTimeString("en-IN", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return new Date().toISOString().slice(11, 19);
  }
}

/**
 * @param {string} tag  short area e.g. "human" | "cf" | "upload"
 * @param {string} message
 * @param {object} [data]
 */
export async function vsLog(tag, message, data) {
  const entry = {
    at: Date.now(),
    t: _stamp(),
    tag: String(tag || "app").slice(0, 24),
    msg: String(message || "").slice(0, 400),
  };
  if (data != null) {
    try {
      entry.data = JSON.parse(JSON.stringify(data));
    } catch {
      entry.data = String(data).slice(0, 200);
    }
  }

  try {
    console.log(`[VS6 ${entry.tag}] ${entry.msg}`, data !== undefined ? data : "");
  } catch {}

  try {
    const store = await storageGet({ [DEBUG_LOG_KEY]: [] });
    const list = Array.isArray(store[DEBUG_LOG_KEY]) ? store[DEBUG_LOG_KEY].slice() : [];
    list.push(entry);
    while (list.length > DEBUG_LOG_MAX) list.shift();
    await storageSet({ [DEBUG_LOG_KEY]: list });
  } catch {}
}

export async function clearVsLogs() {
  await storageSet({ [DEBUG_LOG_KEY]: [] });
}

export async function getVsLogs() {
  const store = await storageGet({ [DEBUG_LOG_KEY]: [] });
  return Array.isArray(store[DEBUG_LOG_KEY]) ? store[DEBUG_LOG_KEY] : [];
}
