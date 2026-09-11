/**
 * Capture Username whenever it is visible — login, home, schedule, anytime.
 * Prefer portal display name; fall back to login email/username.
 */
import { storageSet } from "./runtime.js";
import { getProfile } from "./config.js";

const LOGIN_USER_SEL =
  "#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt'], input[name='username'], input[autocomplete='username']";

const PORTAL_NAME_SEL =
  ".username, .usa-sidenav .username, header .username, #appointment-card .username, [class*='username']";

var _lastSavedKey = "";
var _inflight = null;

export function readLoginUsernameFromDom(root = document) {
  const el = root.querySelector(LOGIN_USER_SEL);
  if (!el) return "";
  return String(el.value || el.getAttribute("value") || el.textContent || "").trim();
}

/** Parse portal ".username" text: "Display Name (12345)" → { name, portalId } */
export function readPortalNameFromDom(root = document) {
  const nodes = root.querySelectorAll(PORTAL_NAME_SEL);
  for (const el of nodes) {
    const text = String(el.textContent || "").replace(/\s+/g, " ").trim();
    if (!text) continue;
    const match = text.match(/^(.*)\((\d+)\)\s*$/);
    if (match) {
      const name = match[1].trim();
      if (name) return { name, portalId: match[2] };
    }
    // Sometimes only the name is shown
    if (text.length >= 3 && !/^sign\s*in/i.test(text) && !text.includes("@")) {
      return { name: text, portalId: "" };
    }
  }
  return null;
}

function _isWeakId(value) {
  const v = String(value || "").trim();
  return !v || /^\d+$/.test(v);
}

/**
 * Capture from whatever is on the page right now.
 * Safe to call often (login, home, OFC, payment poll, etc.).
 */
export async function captureUsernameAnytime(opts = {}) {
  if (_inflight) return _inflight;
  _inflight = (async () => {
    try {
      const portal = readPortalNameFromDom();
      const loginRaw = String(opts.explicitLogin || readLoginUsernameFromDom() || "").trim();
      if (!portal?.name && !loginRaw) return null;

      const stored = (await getProfile()) || {};
      const profile = { ...stored };
      let changed = false;

      if (loginRaw) {
        if (profile.loginUsername !== loginRaw) {
          profile.loginUsername = loginRaw;
          changed = true;
        }
        if (loginRaw.includes("@") && profile.email !== loginRaw) {
          profile.email = loginRaw;
          changed = true;
        }
      }

      if (portal?.name) {
        if (profile.name !== portal.name) {
          profile.name = portal.name;
          changed = true;
        }
        if (profile.username !== portal.name || profile.id !== portal.name) {
          profile.username = portal.name;
          profile.id = portal.name;
          changed = true;
        }
        if (portal.portalId && profile.portalId !== portal.portalId) {
          profile.portalId = portal.portalId;
          changed = true;
        }
      } else if (loginRaw) {
        // No portal name yet — use login value as Username until name appears
        if (!loginRaw.includes("@") && !_isWeakId(loginRaw)) {
          if (profile.name !== loginRaw || profile.id !== loginRaw) {
            profile.name = loginRaw;
            profile.username = loginRaw;
            profile.id = loginRaw;
            changed = true;
          }
        } else if (_isWeakId(profile.id) || !profile.id) {
          profile.username = loginRaw;
          profile.id = loginRaw;
          if (!profile.name) profile.name = loginRaw;
          changed = true;
        }
      }

      // Email from page scripts (when available)
      for (const script of document.querySelectorAll("script")) {
        const t = script.innerText || "";
        if (!t.includes("setAuthenticatedUserContext")) continue;
        const m = t.match(/setAuthenticatedUserContext\('([^']*)'\)/);
        if (m?.[1] && profile.email !== m[1]) {
          profile.email = m[1];
          changed = true;
        }
      }

      const key = `${profile.id || ""}|${profile.name || ""}|${profile.loginUsername || ""}|${profile.email || ""}`;
      if (!changed && key === _lastSavedKey) return profile;
      _lastSavedKey = key;
      await storageSet({ profile });
      return profile;
    } finally {
      _inflight = null;
    }
  })();
  return _inflight;
}

/** @deprecated use captureUsernameAnytime */
export async function captureLoginUsername(explicitValue) {
  return captureUsernameAnytime({ explicitLogin: explicitValue });
}

/**
 * Continuously try to capture username whenever DOM has it.
 * Call from content scripts on any host the extension runs on.
 */
export function startUsernameCaptureLoop(vsLike) {
  const tick = () => {
    captureUsernameAnytime().catch(() => {});
  };

  tick();

  const bindLogin = (el) => {
    if (!el || el.dataset.vsUserCap) return;
    el.dataset.vsUserCap = "1";
    const debounced = () => {
      if (vsLike?.setTimeout) {
        if (el._vsCapT) vsLike.clear(el._vsCapT);
        el._vsCapT = vsLike.setTimeout(tick, 300);
      } else {
        clearTimeout(el._vsCapT);
        el._vsCapT = setTimeout(tick, 300);
      }
    };
    el.addEventListener("change", tick);
    el.addEventListener("blur", tick);
    el.addEventListener("input", debounced);
  };

  const scan = () => {
    document.querySelectorAll(LOGIN_USER_SEL).forEach(bindLogin);
    for (const sel of ["button#next", "button#continue", "input#next", "input[type='submit']"]) {
      const btn = document.querySelector(sel);
      if (btn && !btn.dataset.vsUserCapBtn) {
        btn.dataset.vsUserCapBtn = "1";
        btn.addEventListener("click", tick);
      }
    }
    tick();
  };

  scan();

  const onVis = () => {
    if (!document.hidden) tick();
  };
  document.addEventListener("visibilitychange", onVis);
  window.addEventListener("focus", tick);
  document.addEventListener("click", () => {
    if (vsLike?.setTimeout) vsLike.setTimeout(tick, 200);
    else setTimeout(tick, 200);
  }, true);

  if (vsLike?.setInterval) {
    vsLike.setInterval(scan, 2000);
  } else {
    setInterval(scan, 2000);
  }

  // MutationObserver for late-injected .username / login fields
  try {
    const mo = new MutationObserver(() => {
      if (vsLike?.setTimeout) {
        if (mo._t) vsLike.clear(mo._t);
        mo._t = vsLike.setTimeout(scan, 500);
      } else {
        clearTimeout(mo._t);
        mo._t = setTimeout(scan, 500);
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  } catch {
    /* ignore */
  }
}

/** @deprecated alias */
export function watchLoginUsernameCapture(vsLike) {
  return startUsernameCaptureLoop(vsLike);
}
