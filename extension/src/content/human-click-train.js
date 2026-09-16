/**
 * Fresh live training for "Verify you are human".
 * While the challenge is visible, records mouse path, hover, press, viewport,
 * scroll, and click coords into chrome.storage humanClickProfile.
 */
import { updateCloudflareHud } from "./cloudflare-ui.js";
import { isCloudflareChallenge, isCloudflareSolved } from "./cloudflare-tick.js";
import { storageGet, storageSet } from "../shared/runtime.js";
import { vs } from "../shared/lifecycle.js";

var PROFILE_KEY = "humanClickProfile";
var MAX_SAMPLES = 150;
var MAX_PATH_POINTS = 120;
var SAVE_GAP_MS = 400;
var _bound = false;
var _path = [];
var _pathStart = 0;
var _downAt = 0;
var _hoverStart = 0;
var _target = null;
var _lastSaveAt = 0;
var _challengeActive = false;
var _downPoint = null;
var _sampleCountCache = 0;

function _challengeWidgets() {
  const widgets = [];
  for (const el of document.querySelectorAll(
    'iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]'
  )) {
    const rect = el.getBoundingClientRect();
    if (rect.width < 40 || rect.height < 20) continue;
    if (rect.width > 900 || rect.height > 400) continue;
    widgets.push(rect);
  }
  if (!widgets.length && isCloudflareChallenge()) {
    for (const el of document.querySelectorAll("iframe")) {
      const rect = el.getBoundingClientRect();
      if (rect.width >= 120 && rect.width <= 420 && rect.height >= 45 && rect.height <= 120) {
        widgets.push(rect);
      }
    }
  }
  return widgets;
}

function _checkboxTarget() {
  const widgets = _challengeWidgets();
  if (!widgets.length) return null;
  const rect = widgets[0];
  return {
    x: rect.left + Math.min(28, Math.max(18, rect.width * 0.11)),
    y: rect.top + rect.height / 2,
    w: rect.width,
    h: rect.height,
    left: rect.left,
    top: rect.top,
  };
}

/** Loose hit zone: whole widget + padding (checkbox is usually left). */
function _nearWidget(x, y, t) {
  if (!t) return false;
  return (
    x >= t.left - 40 &&
    x <= t.left + t.w + 40 &&
    y >= t.top - 30 &&
    y <= t.top + t.h + 30
  );
}

function _pushPoint(e) {
  const now = performance.now();
  if (!_pathStart) _pathStart = now;
  const t = _target;
  const nx = t ? (e.clientX - t.x) / Math.max(24, t.w * 0.12) : 0;
  const ny = t ? (e.clientY - t.y) / Math.max(20, t.h * 0.5) : 0;
  _path.push({
    nx: Math.round(nx * 1000) / 1000,
    ny: Math.round(ny * 1000) / 1000,
    x: Math.round(e.clientX),
    y: Math.round(e.clientY),
    t: Math.round(now - _pathStart),
  });
  if (_path.length > MAX_PATH_POINTS) _path.shift();
}

async function _loadProfile() {
  const store = await storageGet(PROFILE_KEY);
  return (
    store[PROFILE_KEY] || {
      version: 2,
      maxSamples: MAX_SAMPLES,
      samples: [],
      avgHoverMs: 420,
      avgPressMs: 70,
      avgApproachMs: 800,
      liveTrained: false,
    }
  );
}

function _avg(samples, key, fallback) {
  if (!samples.length) return fallback;
  const sum = samples.reduce((n, s) => n + (Number(s[key]) || 0), 0);
  return Math.round(sum / samples.length);
}

async function _saveSample(sample) {
  const now = Date.now();
  if (now - _lastSaveAt < SAVE_GAP_MS) return null;
  _lastSaveAt = now;

  const profile = await _loadProfile();
  const samples = Array.isArray(profile.samples) ? profile.samples.slice() : [];
  samples.push(sample);
  while (samples.length > MAX_SAMPLES) samples.shift();

  const next = {
    version: 2,
    maxSamples: MAX_SAMPLES,
    samples,
    avgHoverMs: _avg(samples, "hoverMs", 420),
    avgPressMs: _avg(samples, "pressMs", 70),
    avgApproachMs: _avg(samples, "approachMs", 800),
    updatedAt: now,
    liveTrained: true,
    source: "visa-page-live",
  };
  await storageSet({ [PROFILE_KEY]: next });
  _sampleCountCache = samples.length;
  return next;
}

function _resetStroke() {
  _path = [];
  _pathStart = 0;
  _downAt = 0;
  _hoverStart = 0;
  _downPoint = null;
}

function _beginChallengeSession() {
  if (_challengeActive) return;
  _challengeActive = true;
  _resetStroke();
  _target = _checkboxTarget();
}

function _endChallengeSession() {
  _challengeActive = false;
  _target = null;
  _resetStroke();
}

async function _onMove(e) {
  if (!vs.alive) return;
  if (!isCloudflareChallenge() || isCloudflareSolved()) {
    if (_challengeActive) _endChallengeSession();
    return;
  }
  _beginChallengeSession();
  if (!_target) _target = _checkboxTarget();
  if (!_hoverStart && _target && _nearWidget(e.clientX, e.clientY, _target)) {
    _hoverStart = performance.now();
  }
  _pushPoint(e);
}

async function _onDown(e) {
  if (!vs.alive || e.button !== 0) return;
  if (!isCloudflareChallenge() || isCloudflareSolved()) return;
  _beginChallengeSession();
  _target = _checkboxTarget();
  // Record any left-click during the challenge (iframe clicks may land on parent).
  _downAt = performance.now();
  if (!_hoverStart) _hoverStart = _downAt;
  _downPoint = { x: e.clientX, y: e.clientY };
  _pushPoint(e);
  try {
    updateCloudflareHud(
      "scanning",
      `Recording click… (saved ${_sampleCountCache} so far)`
    );
  } catch {}
}

async function _onUp(e) {
  if (!vs.alive || e.button !== 0) return;
  if (!_downAt) return;
  if (!isCloudflareChallenge() && !isCloudflareSolved()) {
    _resetStroke();
    return;
  }

  const upAt = performance.now();
  const pressMs = Math.max(25, Math.min(500, upAt - _downAt));
  const hoverMs = Math.max(30, Math.min(3000, _downAt - (_hoverStart || _downAt)));
  const lastT = _path.length ? _path[_path.length - 1].t : hoverMs;
  const approachMs = Math.max(hoverMs, Math.min(12000, lastT || hoverMs));
  const path = _path.slice(-MAX_PATH_POINTS);
  const near =
    (_target && _nearWidget(e.clientX, e.clientY, _target)) ||
    (_target && _downPoint && _nearWidget(_downPoint.x, _downPoint.y, _target)) ||
    // If widget rect missing (cross-origin iframe), still save if we have a path.
    (!_target && path.length >= 2);

  const down = _downPoint;
  _resetStroke();
  if (!near && path.length < 2) return;
  // Need at least a tiny stroke or a clear widget hit
  if (path.length < 1 && !near) return;

  const sample = {
    hoverMs: Math.round(hoverMs),
    pressMs: Math.round(pressMs),
    approachMs: Math.round(approachMs),
    path,
    down: down ? { x: Math.round(down.x), y: Math.round(down.y) } : null,
    up: { x: Math.round(e.clientX), y: Math.round(e.clientY) },
    target: _target
      ? {
          x: Math.round(_target.x),
          y: Math.round(_target.y),
          w: Math.round(_target.w),
          h: Math.round(_target.h),
          left: Math.round(_target.left),
          top: Math.round(_target.top),
        }
      : null,
    viewport: {
      w: window.innerWidth,
      h: window.innerHeight,
      dpr: window.devicePixelRatio || 1,
      scrollX: Math.round(window.scrollX || 0),
      scrollY: Math.round(window.scrollY || 0),
    },
    pointerType: e.pointerType || "mouse",
    url: location.pathname + location.search,
    at: Date.now(),
  };

  // Re-read target for sample (we cleared stroke but _target may still be set until end)
  if (!sample.target) {
    const t = _checkboxTarget();
    if (t) {
      sample.target = {
        x: Math.round(t.x),
        y: Math.round(t.y),
        w: Math.round(t.w),
        h: Math.round(t.h),
        left: Math.round(t.left),
        top: Math.round(t.top),
      };
    }
  }

  const profile = await _saveSample(sample);
  if (!profile) return;
  const n = profile.samples?.length || 0;
  try {
    updateCloudflareHud(
      "success",
      `Saved verify-human click #${n} — keep clicking naturally when it appears`
    );
  } catch {}
}

/** How many live samples are stored (for train-window length). */
export async function getLiveHumanClickCount() {
  try {
    const profile = await _loadProfile();
    const n = profile.liveTrained ? profile.samples?.length || 0 : 0;
    _sampleCountCache = n;
    return n;
  } catch {
    return _sampleCountCache;
  }
}

/**
 * Start recording whenever Verify you are human is on the visa page.
 */
export function startHumanClickTrain() {
  if (_bound) return;
  _bound = true;

  vs.on(window, "pointermove", _onMove, { passive: true, capture: true });
  vs.on(window, "pointerdown", _onDown, { passive: true, capture: true });
  vs.on(window, "pointerup", _onUp, { passive: true, capture: true });
  vs.on(window, "mousemove", _onMove, { passive: true, capture: true });
  vs.on(window, "mousedown", _onDown, { passive: true, capture: true });
  vs.on(window, "mouseup", _onUp, { passive: true, capture: true });

  const tip = async () => {
    if (!vs.alive) return;
    if (!isCloudflareChallenge() || isCloudflareSolved()) {
      if (_challengeActive) _endChallengeSession();
      return;
    }
    _beginChallengeSession();
    if (!_target) _target = _checkboxTarget();
    const n = await getLiveHumanClickCount();
    try {
      updateCloudflareHud(
        "scanning",
        n
          ? `Train mode — click Verify you are human naturally (saved ${n})`
          : "Train mode — move mouse naturally, then click Verify you are human (recording…)"
      );
    } catch {}
  };
  tip();
  vs.setInterval(tip, 2500);
}
