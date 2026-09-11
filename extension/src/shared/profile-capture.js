/**
 * Username === Applicant ID — any text, number, or combination.
 * Capture whenever it appears (login, home, schedule, API calls).
 */
import { storageSet } from "./runtime.js";
import { getProfile } from "./config.js";

const LOGIN_USER_SEL =
  "#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt'], input[name='username'], input[autocomplete='username']";

const PORTAL_USER_SEL =
  ".username, .usa-sidenav .username, header .username, #appointment-card .username, [class*='username']";

var _lastSavedKey = "";
var _inflight = null;

function _clean(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}

export function readLoginUsernameFromDom(root = document) {
  const el = root.querySelector(LOGIN_USER_SEL);
  if (!el) return "";
  return _clean(el.value || el.getAttribute("value") || el.textContent || "");
}

/**
 * Portal header username — use the full visible text as-is
 * (name, number, or combined e.g. "John Doe (12345)").
 */
export function readPortalUsernameFromDom(root = document) {
  const nodes = root.querySelectorAll(PORTAL_USER_SEL);
  for (const el of nodes) {
    const text = _clean(el.textContent || "");
    if (!text || text.length < 1) continue;
    if (/^sign\s*in$/i.test(text)) continue;
    return text;
  }
  return "";
}

/** Optional: split "Name (12345)" for display helpers — not required for identity. */
export function splitPortalUsername(text) {
  const t = _clean(text);
  const match = t.match(/^(.*)\((\d+)\)\s*$/);
  if (!match) return { username: t, name: t, portalId: "" };
  return {
    username: t,
    name: match[1].trim() || t,
    portalId: match[2],
  };
}

/**
 * Capture Username/Applicant ID from whatever is on the page now.
 * Same value stored as id, username, and applicant key — any format allowed.
 */
export async function captureUsernameAnytime(opts = {}) {
  if (_inflight) return _inflight;
  _inflight = (async () => {
    try {
      const portalUser = _clean(opts.explicitPortal || readPortalUsernameFromDom());
      const loginUser = _clean(opts.explicitLogin || readLoginUsernameFromDom());
      // Prefer portal header when present; otherwise login field.
      const username = portalUser || loginUser;
      if (!username) return null;

      const stored = (await getProfile()) || {};
      const profile = { ...stored };
      let changed = false;

      // Username and applicant id are the same
      if (profile.id !== username || profile.username !== username) {
        profile.id = username;
        profile.username = username;
        changed = true;
      }

      const parts = splitPortalUsername(username);
      if (parts.name && profile.name !== parts.name) {
        profile.name = parts.name;
        changed = true;
      }
      if (parts.portalId && profile.portalId !== parts.portalId) {
        profile.portalId = parts.portalId;
        changed = true;
      }

      if (loginUser) {
        if (profile.loginUsername !== loginUser) {
          profile.loginUsername = loginUser;
          changed = true;
        }
        if (loginUser.includes("@") && profile.email !== loginUser) {
          profile.email = loginUser;
          changed = true;
        }
      }

      for (const script of document.querySelectorAll("script")) {
        const t = script.innerText || "";
        if (!t.includes("setAuthenticatedUserContext")) continue;
        const m = t.match(/setAuthenticatedUserContext\('([^']*)'\)/);
        if (m?.[1] && profile.email !== m[1]) {
          profile.email = m[1];
          changed = true;
        }
      }

      const key = `${profile.id}|${profile.username}|${profile.loginUsername || ""}|${profile.email || ""}`;
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

export async function captureLoginUsername(explicitValue) {
  return captureUsernameAnytime({ explicitLogin: explicitValue });
}

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
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) tick();
  });
  window.addEventListener("focus", tick);
  document.addEventListener(
    "click",
    () => {
      if (vsLike?.setTimeout) vsLike.setTimeout(tick, 200);
      else setTimeout(tick, 200);
    },
    true
  );

  if (vsLike?.setInterval) vsLike.setInterval(scan, 2000);
  else setInterval(scan, 2000);

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

export function watchLoginUsernameCapture(vsLike) {
  return startUsernameCaptureLoop(vsLike);
}
