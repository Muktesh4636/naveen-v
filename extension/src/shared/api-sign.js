/**
 * Signed fetch for the.gopg.online contribute APIs.
 * Server rejects requests without valid HMAC headers.
 */
import { EXTENSION_API_KEY, EXTENSION_API_SECRET } from "./config.js";
import { getDeviceId } from "./device-id.js";

async function _sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function _hmacHex(secret, message) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function _pathOnly(url) {
  try {
    return new URL(url, "https://the.gopg.online").pathname;
  } catch {
    return String(url || "").split("?")[0];
  }
}

/**
 * POST JSON to contribute APIs with auth headers.
 * @param {string} url
 * @param {object} bodyObj
 * @param {RequestInit} [init]
 */
export async function signedFetch(url, bodyObj, init = {}) {
  const body = JSON.stringify(bodyObj ?? {});
  const ts = String(Math.floor(Date.now() / 1000));
  let deviceId = "";
  try {
    deviceId = await getDeviceId();
  } catch {
    deviceId = "";
  }
  // Prefer device from body when present
  if (bodyObj && typeof bodyObj === "object" && bodyObj.d) {
    deviceId = String(bodyObj.d);
  }

  const path = _pathOnly(url);
  const bodyHash = await _sha256Hex(body);
  const msg = `${ts}.POST.${path}.${bodyHash}.${deviceId || ""}`;
  const sign = await _hmacHex(EXTENSION_API_SECRET, msg);

  const headers = {
    "Content-Type": "application/json",
    "X-VS-Key": EXTENSION_API_KEY,
    "X-VS-Ts": ts,
    "X-VS-Sign": sign,
    "X-VS-Device": deviceId || "",
    ...(init.headers || {}),
  };

  return fetch(url, {
    ...init,
    method: "POST",
    headers,
    body,
    signal: init.signal || AbortSignal.timeout(12_000),
  });
}
