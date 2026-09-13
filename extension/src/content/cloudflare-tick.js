import {
  flashClickPoints,
  getCloudflareHudState,
  hideCloudflareHud,
  updateCloudflareHud,
} from "./cloudflare-ui.js";
import { getSetting } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";

var _cfWatchTimer = null;
var _cfAttemptCount = 0;
var _cfObserver = null;
var _cfTickInFlight = false;
var _cfLastReloadAt = 0;
var _cfExpiredClicks = 0;

const CHALLENGE_TEXT = /verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|verification expired|verification pending|cloudflare|ray id:/i;
const VERIFY_HUMAN_TEXT = /verify you are human|verify you are a human|verify that you are human/i;
const EXPIRED_TEXT = /verification expired|verification timed out|expired\.?\s*please|try again/i;
const PENDING_TEXT = /verification pending|checking|verifying/i;

export function isCloudflareSolved() {
  const token = document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]');
  if (token?.value) return true;
  return !isCloudflareChallenge() && !getCloudflareHudState();
}

export function isCloudflareChallenge() {
  if (document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value) {
    return false;
  }
  const t = document.body?.innerText || "";
  if (VERIFY_HUMAN_TEXT.test(t) || EXPIRED_TEXT.test(t)) return true;
  if (/performing security verification/i.test(t) && /cloudflare|verify|human|bot/i.test(t)) {
    return true;
  }
  if (CHALLENGE_TEXT.test(t) && /verify|human|moment|checking|robot|security|expired|pending/i.test(t)) {
    return true;
  }
  return _findChallengeWidgets().length > 0;
}

function _pageText() {
  return (document.body?.innerText || document.body?.textContent || "").replace(/\s+/g, " ");
}

function _isExpiredState() {
  return EXPIRED_TEXT.test(_pageText());
}

function _sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function _rootsToSearch() {
  const roots = [document];
  const queue = [document];
  while (queue.length) {
    const root = queue.shift();
    for (const host of root.querySelectorAll("*")) {
      if (!host.shadowRoot) continue;
      roots.push(host.shadowRoot);
      queue.push(host.shadowRoot);
    }
  }
  return roots;
}

/** Find Turnstile iframe / host even when text is "Verification expired". */
function _findChallengeWidgets() {
  const widgets = [];
  const seen = new Set();

  const consider = (el) => {
    if (!el || seen.has(el)) return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 40 || rect.height < 20) return;
    if (rect.width > 900 || rect.height > 400) return;
    if (rect.bottom < 0 || rect.right < 0 || rect.top > window.innerHeight || rect.left > window.innerWidth) {
      return;
    }
    const src = (el.src || el.getAttribute?.("src") || "").toLowerCase();
    const title = (el.title || el.getAttribute?.("title") || "").toLowerCase();
    const cls = (el.className?.toString?.() || "").toLowerCase();
    const id = (el.id || "").toLowerCase();
    const isCfIframe = el.tagName === "IFRAME" && (
      src.includes("challenges.cloudflare") ||
      src.includes("turnstile") ||
      title.includes("cloudflare") ||
      title.includes("security challenge") ||
      title.includes("widget containing")
    );
    const isCfHost = (
      cls.includes("cf-turnstile") ||
      cls.includes("turnstile") ||
      id.includes("turnstile") ||
      id.includes("challenge") ||
      el.hasAttribute?.("data-sitekey") ||
      el.hasAttribute?.("data-turnstile-widget")
    );
    const sizedIframe =
      el.tagName === "IFRAME" &&
      rect.width >= 120 &&
      rect.width <= 420 &&
      rect.height >= 45 &&
      rect.height <= 140 &&
      CHALLENGE_TEXT.test(_pageText());

    if (!isCfIframe && !isCfHost && !sizedIframe) return;
    seen.add(el);
    widgets.push({ el, rect });
  };

  for (const root of _rootsToSearch()) {
    for (const sel of [
      'iframe[src*="challenges.cloudflare"]',
      'iframe[src*="turnstile"]',
      'iframe[title*="Cloudflare"]',
      'iframe[title*="security challenge"]',
      'iframe[title*="Widget containing"]',
      ".cf-turnstile",
      "[data-turnstile-widget]",
      "#challenge-stage",
      "#cf-turnstile",
      "#turnstile-wrapper",
      "[data-sitekey]",
    ]) {
      for (const el of root.querySelectorAll(sel)) consider(el);
    }
    for (const iframe of root.querySelectorAll("iframe")) consider(iframe);
  }

  // Text fallback for verify / expired labels near a widget-sized box.
  if (!widgets.length) {
    for (const root of _rootsToSearch()) {
      const body = root === document ? document.body : root;
      if (!body) continue;
      try {
        const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const raw = walker.currentNode.textContent || "";
          if (!VERIFY_HUMAN_TEXT.test(raw) && !EXPIRED_TEXT.test(raw) && !PENDING_TEXT.test(raw)) {
            continue;
          }
          let el = walker.currentNode.parentElement;
          for (let i = 0; i < 8 && el; i++) {
            const rect = el.getBoundingClientRect();
            if (rect.width >= 140 && rect.width <= 520 && rect.height >= 36 && rect.height <= 160) {
              if (!seen.has(el)) {
                seen.add(el);
                widgets.push({ el, rect });
              }
              break;
            }
            el = el.parentElement;
          }
        }
      } catch {}
    }
  }

  widgets.sort((a, b) => a.rect.width * a.rect.height - b.rect.width * b.rect.height);
  return widgets.slice(0, 3);
}

function _resolveClickTarget(widget) {
  const { el, rect } = widget;
  if (el?.tagName === "IFRAME") return { el, rect };
  const iframe = el?.querySelector?.("iframe");
  if (iframe) {
    const r = iframe.getBoundingClientRect();
    if (r.width >= 40 && r.height >= 20) return { el: iframe, rect: r };
  }
  // Parent may wrap the iframe one level up.
  const near = el?.closest?.(".cf-turnstile, [data-sitekey], #challenge-stage, #cf-turnstile")
    || el?.parentElement;
  const nearIframe = near?.querySelector?.("iframe");
  if (nearIframe) {
    const r = nearIframe.getBoundingClientRect();
    if (r.width >= 40 && r.height >= 20) return { el: nearIframe, rect: r };
  }
  return { el, rect };
}

function _scrollWidgetsIntoView(widgets) {
  for (const { el } of widgets) {
    try {
      el.scrollIntoView({ block: "center", behavior: "instant" });
    } catch {
      try { el.scrollIntoView({ block: "center" }); } catch {}
    }
  }
  try { window.focus(); } catch {}
}

function _collectTurnstileClickPoints(widgets) {
  const points = [];
  const seen = new Set();
  const add = (x, y) => {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    if (x < 1 || y < 1 || x > window.innerWidth - 1 || y > window.innerHeight - 1) return;
    const key = `${Math.round(x)},${Math.round(y)}`;
    if (seen.has(key)) return;
    seen.add(key);
    points.push({ x: Math.round(x), y: Math.round(y) });
  };

  for (const widget of widgets) {
    const { rect } = _resolveClickTarget(widget);
    const midY = rect.top + rect.height / 2;
    // Checkbox / refresh control is on the left of the Turnstile strip.
    const baseX = rect.left + Math.min(28, Math.max(18, rect.width * 0.1));
    add(baseX, midY);
    for (const dx of [0, 4, 8, 12, 16, 20, 24]) {
      for (const dy of [0, -3, 3, -6, 6]) {
        add(baseX + dx, midY + dy);
      }
    }
  }
  return points;
}

function _tryDomClicks(widgets) {
  for (const widget of widgets) {
    const { el, rect } = _resolveClickTarget(widget);
    try {
      el.click?.();
      const x = rect.left + Math.min(26, rect.width * 0.12);
      const y = rect.top + rect.height / 2;
      const target = document.elementFromPoint(x, y) || el;
      for (const type of ["pointerdown", "mousedown", "mouseup", "pointerup", "click"]) {
        target.dispatchEvent(new MouseEvent(type, {
          bubbles: true,
          cancelable: true,
          clientX: x,
          clientY: y,
          view: window,
        }));
      }
    } catch {}
  }
  return false;
}

async function _reloadChallenge(reason) {
  const now = Date.now();
  if (now - _cfLastReloadAt < 12_000) return false;
  _cfLastReloadAt = now;
  await updateCloudflareHud("retry", reason || "Verification expired — refreshing…");
  try {
    location.reload();
  } catch {
    try {
      chrome.runtime.sendMessage({ action: "reloadTab" });
    } catch {}
  }
  return true;
}

async function _fireClicks(points) {
  if (!points.length) return;
  const primary = points[0];
  const batch = [primary, ...points.slice(1, 5)];
  flashClickPoints([primary]);
  await updateCloudflareHud("debugger", "Clicking checkbox…");
  // Always use real debugger mouse for Turnstile iframe.
  vs.send({ action: "cloudflareDebuggerClick", points: batch, primaryOnly: false });
}

/** Best-effort Cloudflare / Turnstile tick. */
export async function tryCloudflareTick() {
  if (_cfTickInFlight) return false;
  if (!await getSetting("autoCloudflareTick")) return false;
  if (isCloudflareSolved()) {
    await updateCloudflareHud("success");
    return true;
  }

  _cfTickInFlight = true;
  try {
    const expired = _isExpiredState();
    if (expired) {
      _cfExpiredClicks++;
      await updateCloudflareHud(
        "scanning",
        `Verification expired — reset ${_cfExpiredClicks}/3…`
      );
      let widgets = _findChallengeWidgets();
      _scrollWidgetsIntoView(widgets);
      await _sleep(300);
      widgets = _findChallengeWidgets();
      const points = _collectTurnstileClickPoints(widgets);
      if (points.length) {
        // Click left side — often reloads Turnstile widget.
        await _fireClicks(points);
        await _sleep(1800);
      } else {
        _tryDomClicks(widgets);
        await _sleep(800);
      }
      if (!_isExpiredState() && VERIFY_HUMAN_TEXT.test(_pageText())) {
        // Fresh checkbox appeared — click it next loop.
        _cfExpiredClicks = 0;
        return false;
      }
      if (_cfExpiredClicks >= 2) {
        await _reloadChallenge("Verification expired — reloading page…");
        return false;
      }
      return false;
    }

    await updateCloudflareHud("scanning", "Verify you are human page detected…");
    let widgets = _findChallengeWidgets();
    _scrollWidgetsIntoView(widgets);
    await _sleep(450);
    widgets = _findChallengeWidgets();
    if (!widgets.length) {
      await _sleep(700);
      widgets = _findChallengeWidgets();
    }
    let points = _collectTurnstileClickPoints(widgets);

    if (!points.length && /performing security verification/i.test(_pageText())) {
      // Widget not in DOM yet — wait harder, then reload if stuck.
      _cfAttemptCount++;
      if (_cfAttemptCount >= 6) {
        await _reloadChallenge("Turnstile widget missing — reloading…");
        return false;
      }
      await updateCloudflareHud("retry", `Waiting for checkbox… (${_cfAttemptCount}/6)`);
      return false;
    }

    if (points.length || widgets.length) {
      if (points.length) await _fireClicks(points);
      else _tryDomClicks(widgets);
      await _sleep(1600);
      if (isCloudflareSolved() || !isCloudflareChallenge()) {
        _cfAttemptCount = 0;
        _cfExpiredClicks = 0;
        await updateCloudflareHud("success");
        return true;
      }
      if (_isExpiredState()) {
        return false;
      }
    }

    // Second pass with fresh geometry.
    widgets = _findChallengeWidgets();
    points = _collectTurnstileClickPoints(widgets);
    if (points.length) {
      await _fireClicks(points);
      await _sleep(1400);
      if (isCloudflareSolved() || !isCloudflareChallenge()) {
        _cfAttemptCount = 0;
        await updateCloudflareHud("success");
        return true;
      }
    }

    _cfAttemptCount++;
    if (_cfAttemptCount >= 10) {
      await _reloadChallenge("Still blocked — reloading challenge…");
      _cfAttemptCount = 0;
      return false;
    }
    if (_cfAttemptCount >= 8) {
      await updateCloudflareHud("manual", "Click the checkbox once if reload does not help.");
    } else {
      await updateCloudflareHud("retry", `Retry ${_cfAttemptCount}/10 — clicking again…`);
    }
    return false;
  } finally {
    _cfTickInFlight = false;
  }
}

function _startChallengeObserver() {
  if (_cfObserver) return;
  let scheduled = false;
  _cfObserver = new MutationObserver(() => {
    if (!vs.alive || scheduled) return;
    if (!isCloudflareChallenge() || isCloudflareSolved()) return;
    scheduled = true;
    vs.setTimeout(() => {
      scheduled = false;
      tryCloudflareTick();
    }, 350);
  });
  _cfObserver.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  vs.disposable(() => {
    _cfObserver?.disconnect();
    _cfObserver = null;
  });
}

export function stopCloudflareWatch() {
  if (_cfWatchTimer) {
    vs.clear(_cfWatchTimer);
    _cfWatchTimer = null;
  }
  _cfAttemptCount = 0;
  _cfExpiredClicks = 0;
  hideCloudflareHud();
}

export async function startCloudflareWatch() {
  stopCloudflareWatch();
  if (!await getSetting("autoCloudflareTick")) return;

  _startChallengeObserver();

  const tick = async () => {
    if (!vs.alive) return;
    if (!await getSetting("autoCloudflareTick")) return;
    if (isCloudflareChallenge() && !isCloudflareSolved()) {
      await tryCloudflareTick();
      return;
    }
    if (getCloudflareHudState()) {
      _cfAttemptCount = 0;
      _cfExpiredClicks = 0;
      await updateCloudflareHud("success");
    }
  };
  tick();
  _cfWatchTimer = vs.setInterval(tick, 1200);
}
