/**
 * Safe remote runtime config (JSON data only — never remote JS).
 * Used for IST windows + timeouts. Automation code stays local.
 * Invalid / out-of-range values are rejected; bundled defaults always work offline.
 */

import { SITE_URL } from "./config.js";
import { storageGet, storageSet } from "./runtime.js";

export var REMOTE_CONFIG_URL = `${SITE_URL}/extension-runtime-config.json`;
var STORAGE_KEY = "vsRuntimeConfig";
var FETCH_TTL_MS = 5 * 60 * 1000;
var _lastFetchAt = 0;
var _fetching = null;

/** Bundled defaults — used until/unless a valid server config arrives. */
export const cfg = {
  slotWindowLabel: ":05–:13, :14–:21, :24–:31, :35–:50, :54–:02",
  slotWindows: [
    { slot: 5, fromMin: 0, toMin: 2 },
    { slot: 1, fromMin: 5, toMin: 13 },
    { slot: 2, fromMin: 14, toMin: 21 },
    { slot: 3, fromMin: 24, toMin: 31 },
    { slot: 4, fromMin: 35, toMin: 50 },
    { slot: 5, fromMin: 54, toMin: 59 },
  ],
  windowStartsMin: [0, 5, 14, 24, 35, 54],
  cityLoadingMaxMs: 180_000,
  cityCalendarNoDatesMs: 20_000,
  cityRotateMinGapMs: 13_000,
  cityRotateMaxGapMs: 18_000,
  cityHoldMaxMs: 45_000,
  homeKeepaliveMinMs: 600_000,
  homeKeepaliveMaxMs: 600_000,
  homeKeepaliveDebounceMs: 480_000,
  loadingStuckMs: 120_000,
  loadingStuckDebounceMs: 90_000,
  remoteVersion: 0,
  source: "bundled",
};

function _clamp(n, min, max, fallback) {
  const v = Number(n);
  if (!Number.isFinite(v)) return fallback;
  return Math.min(max, Math.max(min, Math.round(v)));
}

function _normalizeWindows(raw) {
  if (!Array.isArray(raw) || !raw.length || raw.length > 24) return null;
  const out = [];
  for (const w of raw) {
    const fromMin = _clamp(w?.fromMin, 0, 59, NaN);
    const toMin = _clamp(w?.toMin, 0, 59, NaN);
    if (!Number.isFinite(fromMin) || !Number.isFinite(toMin) || fromMin > toMin) return null;
    const slot = _clamp(w?.slot, 1, 12, 1);
    out.push({ slot, fromMin, toMin });
  }
  return out;
}

function _startsFromWindows(windows) {
  const starts = [...new Set(windows.map((w) => w.fromMin))].sort((a, b) => a - b);
  return starts.length ? starts : cfg.windowStartsMin.slice();
}

/** Apply a validated plain object onto cfg (mutates in place). */
export function applyRuntimeConfig(partial, source = "remote") {
  if (!partial || typeof partial !== "object") return false;
  const windows = _normalizeWindows(partial.slotWindows);
  if (windows) {
    // Mutate in place so exported SLOT_WINDOWS / cfg.slotWindows stay live.
    cfg.slotWindows.length = 0;
    for (const w of windows) cfg.slotWindows.push(w);
    cfg.windowStartsMin = _startsFromWindows(windows);
  }
  if (typeof partial.slotWindowLabel === "string" && partial.slotWindowLabel.length < 120) {
    cfg.slotWindowLabel = partial.slotWindowLabel;
  }
  cfg.cityLoadingMaxMs = _clamp(partial.cityLoadingMaxMs, 10_000, 300_000, cfg.cityLoadingMaxMs);
  cfg.cityCalendarNoDatesMs = _clamp(partial.cityCalendarNoDatesMs, 5_000, 120_000, cfg.cityCalendarNoDatesMs);
  cfg.cityRotateMinGapMs = _clamp(partial.cityRotateMinGapMs, 5_000, 60_000, cfg.cityRotateMinGapMs);
  cfg.cityRotateMaxGapMs = _clamp(
    partial.cityRotateMaxGapMs,
    cfg.cityRotateMinGapMs,
    90_000,
    Math.max(cfg.cityRotateMinGapMs, cfg.cityRotateMaxGapMs)
  );
  cfg.cityHoldMaxMs = _clamp(partial.cityHoldMaxMs, 10_000, 180_000, cfg.cityHoldMaxMs);
  cfg.homeKeepaliveMinMs = _clamp(partial.homeKeepaliveMinMs, 120_000, 1_800_000, cfg.homeKeepaliveMinMs);
  cfg.homeKeepaliveMaxMs = _clamp(
    partial.homeKeepaliveMaxMs,
    cfg.homeKeepaliveMinMs,
    1_800_000,
    Math.max(cfg.homeKeepaliveMinMs, cfg.homeKeepaliveMaxMs)
  );
  cfg.homeKeepaliveDebounceMs = _clamp(partial.homeKeepaliveDebounceMs, 60_000, 1_800_000, cfg.homeKeepaliveDebounceMs);
  cfg.loadingStuckMs = _clamp(partial.loadingStuckMs, 30_000, 600_000, cfg.loadingStuckMs);
  cfg.loadingStuckDebounceMs = _clamp(partial.loadingStuckDebounceMs, 30_000, 600_000, cfg.loadingStuckDebounceMs);
  cfg.remoteVersion = _clamp(partial.version, 0, 1e9, cfg.remoteVersion);
  cfg.source = source;
  return true;
}

async function _loadCached() {
  try {
    const store = await storageGet(STORAGE_KEY);
    const cached = store[STORAGE_KEY];
    if (cached?.config) applyRuntimeConfig(cached.config, "cache");
  } catch {}
}

async function _saveCached(config) {
  try {
    await storageSet({
      [STORAGE_KEY]: { config, fetchedAt: Date.now() },
    });
  } catch {}
}

/**
 * Fetch JSON config from the site. Never evaluates remote code.
 * Falls back to cache → bundled defaults on any failure.
 */
export async function refreshRemoteConfig({ force = false } = {}) {
  const now = Date.now();
  if (!force && now - _lastFetchAt < FETCH_TTL_MS) return cfg;
  if (_fetching) return _fetching;

  _fetching = (async () => {
    await _loadCached();
    try {
      const res = await fetch(REMOTE_CONFIG_URL, {
        method: "GET",
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("bad json");
      // Reject anything that looks like code payloads.
      if (data.script || data.code || data.eval) throw new Error("unsafe keys");
      applyRuntimeConfig(data, "remote");
      await _saveCached(data);
      _lastFetchAt = Date.now();
    } catch {
      // Keep bundled / cached values — offline-safe.
      _lastFetchAt = Date.now();
    }
    return cfg;
  })();

  try {
    return await _fetching;
  } finally {
    _fetching = null;
  }
}

/** Fire-and-forget warm-up for content scripts / SW. */
export function ensureRemoteConfig() {
  refreshRemoteConfig().catch(() => {});
}
