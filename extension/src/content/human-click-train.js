/**
 * Fresh live training for "Verify you are human".
 * While the challenge is visible, records mouse path, hover, press, viewport,
 * scroll, and click coords into chrome.storage humanClickProfile,
 * and uploads each sample to the server for model training.
 */
import { updateCloudflareHud } from "./cloudflare-ui.js";
import { isCloudflareChallenge, isCloudflareSolved } from "./cloudflare-tick.js";
import { getProfile, getSetting } from "../shared/config.js";
import { storageGet, storageSet } from "../shared/runtime.js";
import { vs } from "../shared/lifecycle.js";
import { vsLog } from "../shared/debugLog.js";

var PROFILE_KEY = "humanClickProfile";
var MAX_SAMPLES = 150;
var MAX_PATH_POINTS = 120;
var SAVE_GAP_MS = 250;
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
/** Last time we saw pointer near / on the CF widget (for iframe clicks we never get mouseup for). */
var _lastNearWidgetAt = 0;
var _lastPathSnapshot = [];
var _pendingIframeClick = false;
var _wasChallenge = false;

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

async function _saveSample(sample, { force = false } = {}) {
  const now = Date.now();
  if (!force && now - _lastSaveAt < SAVE_GAP_MS) return null;
  _lastSaveAt = now;

  const profile = await _loadProfile();
  const samples = Array.isArray(profile.samples) ? profile.samples.slice() : [];
  // Stamp upload id so we can retry server sync.
  if (!sample.clientId) {
    sample.clientId = `hc-${sample.at || now}-${Math.random().toString(36).slice(2, 10)}`;
  }
  sample.uploaded = false;
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
  vsLog("human", `saved sample locally #${samples.length}`, {
    capture: sample.capture || "page",
    pressMs: sample.pressMs,
    hoverMs: sample.hoverMs,
    pathPts: Array.isArray(sample.path) ? sample.path.length : 0,
    clientId: sample.clientId,
  });

  // Upload this sample + any older ones that never reached the server.
  _uploadSampleToServer(sample, next).catch(() => {});
  _flushUnsyncedToServer().catch(() => {});

  return next;
}

async function _markSampleUploaded(clientId) {
  if (!clientId) return;
  const profile = await _loadProfile();
  const samples = Array.isArray(profile.samples) ? profile.samples.slice() : [];
  let changed = false;
  for (const s of samples) {
    if (s?.clientId === clientId && !s.uploaded) {
      s.uploaded = true;
      changed = true;
    }
  }
  if (!changed) return;
  await storageSet({
    [PROFILE_KEY]: { ...profile, samples, updatedAt: Date.now() },
  });
}

async function _uploadSampleToServer(sample, profile) {
  try {
    if (!(await getSetting("serverSync"))) {
      vsLog("upload", "skipped — serverSync is OFF");
      return false;
    }
    const userProfile = (await getProfile()) || {};
    const clientId = sample.clientId || `hc-${sample.at || Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    sample.clientId = clientId;
    const payload = {
      client_id: clientId,
      profile: {
        id: userProfile.id || "",
        email: userProfile.email || "",
        name: userProfile.name || "",
        visa: userProfile.visa || "",
      },
      sample,
      profile_meta: {
        sampleCount: profile?.samples?.length || 0,
        avgHoverMs: profile?.avgHoverMs,
        avgPressMs: profile?.avgPressMs,
        avgApproachMs: profile?.avgApproachMs,
        liveTrained: true,
        source: "visa-page-live",
        extensionHost: location.host,
      },
    };
    vsLog("upload", `sending sample ${clientId}`, {
      sampleCount: profile?.samples?.length || 0,
      email: userProfile.email || "",
    });
    // Prefer service worker (host permission + no page CSP).
    vs.send({ action: "uploadHumanClickSample", payload });
    // Also try chrome.runtime directly so we can mark uploaded on ack.
    try {
      chrome.runtime.sendMessage(
        { action: "uploadHumanClickSample", payload },
        (res) => {
          if (chrome.runtime.lastError) {
            vsLog("upload", `SW error: ${chrome.runtime.lastError.message}`);
            return;
          }
          if (res?.success) {
            vsLog("upload", `server OK id=${res.id ?? "?"} status=${res.status ?? ""}`, {
              clientId,
            });
            _markSampleUploaded(clientId);
          } else {
            vsLog("upload", `server FAIL ${res?.error || res?.status || "unknown"}`, {
              clientId,
            });
          }
        }
      );
    } catch (e) {
      vsLog("upload", `sendMessage threw: ${e?.message || e}`);
    }
    return true;
  } catch (e) {
    vsLog("upload", `upload threw: ${e?.message || e}`);
    return false;
  }
}

/** Re-upload any local samples that never got a server ack. */
async function _flushUnsyncedToServer() {
  try {
    if (!(await getSetting("serverSync"))) return;
    const profile = await _loadProfile();
    const samples = Array.isArray(profile.samples) ? profile.samples : [];
    const pending = samples.filter((s) => s && s.uploaded !== true).slice(-40);
    for (const sample of pending) {
      await _uploadSampleToServer(sample, profile);
      await new Promise((r) => setTimeout(r, 80));
    }
  } catch {}
}

function _buildSampleFromStroke(e, extra = {}) {
  const upAt = performance.now();
  const pressMs = Math.max(25, Math.min(500, _downAt ? upAt - _downAt : 70));
  const hoverMs = Math.max(30, Math.min(3000, _downAt ? _downAt - (_hoverStart || _downAt) : 200));
  const path = (_path.length ? _path : _lastPathSnapshot).slice(-MAX_PATH_POINTS);
  const lastT = path.length ? path[path.length - 1].t : hoverMs;
  const approachMs = Math.max(hoverMs, Math.min(12000, lastT || hoverMs));
  const down = _downPoint;
  const t = _target || _checkboxTarget();
  return {
    hoverMs: Math.round(hoverMs),
    pressMs: Math.round(pressMs),
    approachMs: Math.round(approachMs),
    path,
    down: down ? { x: Math.round(down.x), y: Math.round(down.y) } : null,
    up: e
      ? { x: Math.round(e.clientX), y: Math.round(e.clientY) }
      : down
        ? { x: Math.round(down.x), y: Math.round(down.y) }
        : t
          ? { x: Math.round(t.x), y: Math.round(t.y) }
          : null,
    target: t
      ? {
          x: Math.round(t.x),
          y: Math.round(t.y),
          w: Math.round(t.w),
          h: Math.round(t.h),
          left: Math.round(t.left),
          top: Math.round(t.top),
        }
      : null,
    viewport: {
      w: window.innerWidth,
      h: window.innerHeight,
      dpr: window.devicePixelRatio || 1,
      scrollX: Math.round(window.scrollX || 0),
      scrollY: Math.round(window.scrollY || 0),
    },
    pointerType: e?.pointerType || "mouse",
    url: location.pathname + location.search,
    at: Date.now(),
    ...extra,
  };
}

function _resetStroke() {
  if (_path.length) _lastPathSnapshot = _path.slice(-MAX_PATH_POINTS);
  _path = [];
  _pathStart = 0;
  _downAt = 0;
  _hoverStart = 0;
  _downPoint = null;
}

function _beginChallengeSession() {
  if (_challengeActive) return;
  _challengeActive = true;
  _wasChallenge = true;
  _resetStroke();
  _target = _checkboxTarget();
}

function _endChallengeSession() {
  _challengeActive = false;
  _target = null;
  _pendingIframeClick = false;
  _resetStroke();
}

function _eventOnCfWidget(e) {
  const el = e?.target;
  if (!el) return false;
  if (el.closest?.(".cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]")) {
    return true;
  }
  if (el.tagName === "IFRAME") {
    const src = (el.src || "").toLowerCase();
    if (src.includes("challenges.cloudflare") || src.includes("turnstile")) return true;
    const rect = el.getBoundingClientRect();
    if (rect.width >= 120 && rect.width <= 420 && rect.height >= 45 && rect.height <= 120) return true;
  }
  return false;
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
  if (_target && _nearWidget(e.clientX, e.clientY, _target)) {
    _lastNearWidgetAt = Date.now();
  }
  _pushPoint(e);
}

async function _onDown(e) {
  if (!vs.alive || e.button !== 0) return;
  if (!isCloudflareChallenge() || isCloudflareSolved()) return;
  _beginChallengeSession();
  _target = _checkboxTarget();
  _downAt = performance.now();
  if (!_hoverStart) _hoverStart = _downAt;
  _downPoint = { x: e.clientX, y: e.clientY };
  _pushPoint(e);
  if (_eventOnCfWidget(e) || (_target && _nearWidget(e.clientX, e.clientY, _target))) {
    _pendingIframeClick = true;
    _lastNearWidgetAt = Date.now();
  }
  vsLog("human", "pointer down during challenge", {
    onWidget: _eventOnCfWidget(e),
    near: !!(!_target || _nearWidget(e.clientX, e.clientY, _target)),
    x: Math.round(e.clientX),
    y: Math.round(e.clientY),
  });
  try {
    updateCloudflareHud(
      "scanning",
      `Recording click… (saved ${_sampleCountCache} so far)`
    );
  } catch {}
}

async function _onUp(e) {
  if (!vs.alive || e.button !== 0) return;
  if (!_downAt && !_pendingIframeClick) return;
  if (!isCloudflareChallenge() && !isCloudflareSolved()) {
    _resetStroke();
    return;
  }

  const near =
    (_target && _nearWidget(e.clientX, e.clientY, _target)) ||
    (_target && _downPoint && _nearWidget(_downPoint.x, _downPoint.y, _target)) ||
    _eventOnCfWidget(e) ||
    _pendingIframeClick ||
    (!_target && (_path.length >= 2 || _lastPathSnapshot.length >= 2));

  if (!near && _path.length < 2 && _lastPathSnapshot.length < 2) {
    _resetStroke();
    return;
  }

  const sample = _buildSampleFromStroke(e, {
    capture: _pendingIframeClick || _eventOnCfWidget(e) ? "iframe-or-widget" : "page",
  });
  _pendingIframeClick = false;
  _resetStroke();

  const profile = await _saveSample(sample);
  if (!profile) return;
  const n = profile.samples?.length || 0;
  try {
    updateCloudflareHud(
      "success",
      `Saved verify-human click #${n} — uploaded to server`
    );
  } catch {}
}

/** When CF clears after a click inside the iframe (no mouseup on page), still save. */
async function _maybeSaveOnChallengeSolved() {
  const now = Date.now();
  if (!_wasChallenge) return;
  if (!isCloudflareSolved() && isCloudflareChallenge()) return;
  // Only if we recently interacted with the widget / had a pending iframe click.
  const recent =
    _pendingIframeClick ||
    (now - _lastNearWidgetAt < 8000) ||
    (_lastPathSnapshot.length >= 2 && now - _lastSaveAt > 500);
  if (!recent) {
    _wasChallenge = false;
    _endChallengeSession();
    return;
  }
  const sample = _buildSampleFromStroke(null, { capture: "challenge-solved" });
  _pendingIframeClick = false;
  _wasChallenge = false;
  _endChallengeSession();
  const profile = await _saveSample(sample, { force: true });
  if (!profile) return;
  const n = profile.samples?.length || 0;
  try {
    updateCloudflareHud(
      "success",
      `Saved verify-human click #${n} (after checkbox) — uploaded to server`
    );
  } catch {}
}

/**
 * How many live samples are stored (for train-window length).
 */
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
  vsLog("human", "train watcher started", { path: location.pathname });

  vs.on(window, "pointermove", _onMove, { passive: true, capture: true });
  vs.on(window, "pointerdown", _onDown, { passive: true, capture: true });
  vs.on(window, "pointerup", _onUp, { passive: true, capture: true });
  vs.on(window, "mousemove", _onMove, { passive: true, capture: true });
  vs.on(window, "mousedown", _onDown, { passive: true, capture: true });
  vs.on(window, "mouseup", _onUp, { passive: true, capture: true });
  // Clicking into the CF iframe often only blurs the page — treat as a click attempt.
  vs.on(window, "blur", () => {
    if (!isCloudflareChallenge() || isCloudflareSolved()) return;
    _pendingIframeClick = true;
    _lastNearWidgetAt = Date.now();
    if (!_downAt) {
      _downAt = performance.now();
      if (!_hoverStart) _hoverStart = _downAt;
    }
    vsLog("human", "page blur during challenge (likely iframe click)");
  });

  const tip = async () => {
    if (!vs.alive) return;
    const challenged = isCloudflareChallenge() && !isCloudflareSolved();
    if (challenged) {
      if (!_wasChallenge) vsLog("human", "challenge detected — recording armed");
      _wasChallenge = true;
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
      return;
    }
    if (_wasChallenge || _challengeActive || _pendingIframeClick) {
      await _maybeSaveOnChallengeSolved();
    }
  };
  tip();
  vs.setInterval(tip, 1200);
  // Push any older local samples that never reached the server.
  vs.setTimeout(() => {
    vsLog("upload", "flushing unsynced local samples…");
    _flushUnsyncedToServer().catch(() => {});
  }, 2500);
}
