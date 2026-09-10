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

const CHALLENGE_TEXT = /verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;

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
  if (CHALLENGE_TEXT.test(t) && /verify|human|moment|checking|robot|security/i.test(t)) {
    return true;
  }
  return _findChallengeWidgets().length > 0;
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

function _findChallengeWidgets() {
  const widgets = [];
  const seen = new Set();

  const consider = (el) => {
    if (!el || seen.has(el)) return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 40 || rect.height < 20) return;
    if (rect.width > 900 || rect.height > 400) return;
    const src = (el.src || el.getAttribute?.("src") || "").toLowerCase();
    const title = (el.title || el.getAttribute?.("title") || "").toLowerCase();
    const cls = (el.className?.toString?.() || "").toLowerCase();
    const id = (el.id || "").toLowerCase();
    const isCfIframe = el.tagName === "IFRAME" && (
      src.includes("challenges.cloudflare") ||
      src.includes("turnstile") ||
      title.includes("cloudflare") ||
      title.includes("security challenge")
    );
    const isCfHost = (
      cls.includes("cf-turnstile") ||
      cls.includes("turnstile") ||
      id.includes("turnstile") ||
      id.includes("challenge") ||
      el.hasAttribute?.("data-sitekey") ||
      el.hasAttribute?.("data-turnstile-widget")
    );
    if (!isCfIframe && !isCfHost) {
      if (el.tagName === "IFRAME" && rect.width >= 120 && rect.width <= 420 && rect.height >= 45 && rect.height <= 120) {
        // Sized like a Turnstile widget — include generic iframes on challenge pages.
        if (!CHALLENGE_TEXT.test(document.body?.innerText || "")) return;
      } else {
        return;
      }
    }
    seen.add(el);
    widgets.push({ el, rect });
  };

  for (const root of _rootsToSearch()) {
    for (const sel of [
      'iframe[src*="challenges.cloudflare"]',
      'iframe[src*="turnstile"]',
      'iframe[title*="Cloudflare"]',
      'iframe[title*="security challenge"]',
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
  return widgets;
}

function _scrollWidgetsIntoView(widgets) {
  for (const { el } of widgets) {
    try {
      el.scrollIntoView({ block: "center", behavior: "instant" });
    } catch {
      try { el.scrollIntoView({ block: "center" }); } catch (e) {}
    }
  }
  try { window.focus(); } catch (e) {}
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

  for (const { rect } of widgets) {
    const midY = rect.top + rect.height / 2;
    const baseX = rect.left + Math.min(28, Math.max(18, rect.width * 0.11));
    for (const dx of [0, -4, 4, -8, 8, 12, 16, 20, 24, 28, 32]) {
      for (const dy of [0, -3, 3, -6, 6]) {
        add(baseX + dx, midY + dy);
      }
    }
    add(rect.left + rect.width * 0.5, midY);
  }
  return points;
}

function _tryDomClicks(widgets) {
  for (const { el, rect } of widgets) {
    try {
      el.click();
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
    } catch (e) {}
  }

  for (const sel of [
    ".ctp-checkbox-label",
    "label.ctp-checkbox-label",
    "#challenge-stage label",
    ".cf-turnstile input",
    "#challenge-stage input[type='checkbox']",
    "input[type='checkbox']",
  ]) {
    for (const el of document.querySelectorAll(sel)) {
      const rect = el.getBoundingClientRect();
      if (rect.width < 4 && rect.height < 4) continue;
      const text = (el.textContent || el.getAttribute("aria-label") || "").toLowerCase();
      if (sel.includes("checkbox") && !text.includes("human") && !text.includes("verify") && sel === "input[type='checkbox']") {
        const near = el.closest("label, div, form");
        if (!CHALLENGE_TEXT.test(near?.textContent || "")) continue;
      }
      el.click();
      return true;
    }
  }
  return false;
}

async function _fireClicks(points) {
  if (!points.length) return;
  flashClickPoints(points.slice(0, 3));
  vs.send({ action: "viewportClickPoints", points });
  if (await getSetting("cloudflareDebuggerClick")) {
    await updateCloudflareHud("debugger");
    vs.send({ action: "cloudflareDebuggerClick", points });
  } else {
    await updateCloudflareHud("dom");
  }
}

/** Best-effort Cloudflare / Turnstile tick, including debugger clicks into iframe. */
export async function tryCloudflareTick() {
  if (!await getSetting("autoCloudflareTick")) return false;
  if (isCloudflareSolved()) {
    await updateCloudflareHud("success");
    return true;
  }

  await updateCloudflareHud("scanning");
  let widgets = _findChallengeWidgets();
  _scrollWidgetsIntoView(widgets);
  await _sleep(350);
  widgets = _findChallengeWidgets();
  const points = _collectTurnstileClickPoints(widgets);

  if (points.length) {
    await _fireClicks(points);
    await _sleep(1200);
    if (isCloudflareSolved() || !isCloudflareChallenge()) {
      await updateCloudflareHud("success");
      return true;
    }
  }

  await updateCloudflareHud("dom");
  _tryDomClicks(widgets);
  await _sleep(600);

  if (isCloudflareSolved() || !isCloudflareChallenge()) {
    await updateCloudflareHud("success");
    return true;
  }

  if (points.length) {
    await _fireClicks(points);
    await _sleep(1000);
    if (isCloudflareSolved() || !isCloudflareChallenge()) {
      await updateCloudflareHud("success");
      return true;
    }
  }

  _cfAttemptCount++;
  if (_cfAttemptCount >= 8) {
    await updateCloudflareHud("manual", "Click the checkbox once — we will continue after.");
  } else {
    await updateCloudflareHud("retry", `Retry ${_cfAttemptCount}/8…`);
  }
  return false;
}

function _startChallengeObserver() {
  if (_cfObserver) return;
  _cfObserver = new MutationObserver(() => {
    if (!vs.alive) return;
    if (isCloudflareChallenge() && !isCloudflareSolved()) {
      tryCloudflareTick();
    }
  });
  _cfObserver.observe(document.documentElement, { childList: true, subtree: true });
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
      await updateCloudflareHud("success");
    }
  };
  tick();
  _cfWatchTimer = vs.setInterval(tick, 1800);
}
