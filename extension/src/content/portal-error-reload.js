/**
 * Dead / timeout pages that need auto-reload until gone:
 *  1. Portal CGI: "We're sorry, but something went wrong" / Error ID #
 *  2. Cloudflare 524: "A timeout occurred" / origin web server timed out
 */
import { vs } from "../shared/lifecycle.js";

var PORTAL_ERROR_RE =
  /we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i;
var USG_RE = /\bUSG\s+[a-f0-9-]{8,}/i;
var CF524_RE =
  /a timeout occurred|error\s*524|origin web server timed out|cloudflare ray id/i;
var SS_KEY = "vsPortalErrorReloadCount";
var SS_AT = "vsPortalErrorReloadAt";
var MIN_DELAY_MS = 2_000;
var MAX_DELAY_MS = 10_000;
var _armed = false;
var _timer = null;
var _watch = null;

function _pageText() {
  return (document.body?.innerText || document.body?.textContent || "").replace(/\s+/g, " ").trim();
}

/** True for portal CGI error or Cloudflare 524 timeout page. */
export function isPortalFatalErrorPage() {
  const t = _pageText().slice(0, 6000);
  if (!t) return false;

  // Cloudflare Error 524 — browser/CF ok, origin timed out
  if (
    /a timeout occurred/i.test(t) &&
    (/error\s*524/i.test(t) || /origin web server timed out/i.test(t) || /cloudflare ray id/i.test(t))
  ) {
    return true;
  }
  if (/error\s*524/i.test(t) && /cloudflare/i.test(t) && t.length < 8000) return true;

  // Portal CGI "something went wrong"
  if (PORTAL_ERROR_RE.test(t) && (USG_RE.test(t) || /error id\s*#/i.test(t))) return true;
  if (/we'?re sorry,\s*but something went wrong/i.test(t) && t.length < 2500) return true;

  return false;
}

function _reloadCount() {
  try {
    return Math.max(0, Number(sessionStorage.getItem(SS_KEY) || 0));
  } catch {
    return 0;
  }
}

function _bumpReloadCount() {
  try {
    const n = _reloadCount() + 1;
    sessionStorage.setItem(SS_KEY, String(n));
    sessionStorage.setItem(SS_AT, String(Date.now()));
    return n;
  } catch {
    return 1;
  }
}

function _clearReloadCount() {
  try {
    sessionStorage.removeItem(SS_KEY);
    sessionStorage.removeItem(SS_AT);
  } catch {}
}

function _delayForAttempt(n) {
  // 2s, 3s, 4s … capped at 10s
  return Math.min(MAX_DELAY_MS, MIN_DELAY_MS + Math.max(0, n - 1) * 1_000);
}

function _cancel() {
  if (_timer) {
    vs.clear(_timer);
    _timer = null;
  }
}

function _doReload() {
  _bumpReloadCount();
  try {
    location.reload();
  } catch {}
}

function _scheduleReload() {
  if (!vs.alive || _timer) return;
  if (!isPortalFatalErrorPage()) {
    _clearReloadCount();
    return;
  }
  const n = _reloadCount() + 1;
  const delay = _delayForAttempt(n);
  _timer = vs.setTimeout(() => {
    _timer = null;
    if (!vs.alive) return;
    if (!isPortalFatalErrorPage()) {
      _clearReloadCount();
      return;
    }
    _doReload();
  }, delay);
}

/**
 * Watch for portal / CF 524 error pages and reload until they clear.
 */
export function startPortalErrorReloadWatch() {
  if (_armed) return;
  _armed = true;

  const tick = () => {
    if (!vs.alive) return;
    if (isPortalFatalErrorPage()) {
      _scheduleReload();
    } else {
      _clearReloadCount();
      _cancel();
    }
  };

  tick();
  _watch = vs.setInterval(tick, 1500);

  try {
    const obs = new MutationObserver(() => {
      if (!vs.alive) return;
      if (isPortalFatalErrorPage()) _scheduleReload();
    });
    obs.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
    vs.disposable(() => obs.disconnect());
  } catch {}
}
