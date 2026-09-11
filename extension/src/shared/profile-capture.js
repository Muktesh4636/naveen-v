/**
 * Capture Username as early as login (Atlas / B2C sign-in),
 * then refine to portal display name when .username is available.
 */
import { storageGet, storageSet } from "./runtime.js";
import { getProfile } from "./config.js";

const LOGIN_USER_SEL =
  "#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt'], input[name='username'], input[autocomplete='username']";

export function readLoginUsernameFromDom(root = document) {
  const el = root.querySelector(LOGIN_USER_SEL);
  if (!el) return "";
  const raw = String(el.value || el.getAttribute("value") || el.textContent || "").trim();
  return raw;
}

/**
 * Save login field into profile.
 * Username key prefers portal display name once known; otherwise login username/email.
 */
export async function captureLoginUsername(explicitValue) {
  const raw = String(explicitValue || readLoginUsernameFromDom() || "").trim();
  if (!raw) return null;

  const stored = (await getProfile()) || {};
  const profile = { ...stored };
  profile.loginUsername = raw;
  if (raw.includes("@")) {
    profile.email = raw;
  }

  const displayName = String(profile.name || "").trim();
  const hasRealName = displayName && !/^\d+$/.test(displayName) && displayName.includes(" ");
  // Prefer full portal name when we already have it.
  if (hasRealName || (displayName && !displayName.includes("@") && !/^\d+$/.test(displayName))) {
    profile.name = displayName;
    profile.username = displayName;
    profile.id = displayName;
  } else if (!raw.includes("@") && !/^\d+$/.test(raw)) {
    // Login typed as a person name
    profile.name = raw;
    profile.username = raw;
    profile.id = raw;
  } else {
    // Email / numeric login — usable until portal name is read
    profile.username = raw;
    if (!profile.id || /^\d+$/.test(String(profile.id))) {
      profile.id = raw;
    }
    if (!profile.name) profile.name = raw;
  }

  await storageSet({ profile });
  return profile;
}

/** Watch login inputs and persist username while the user types / continues. */
export function watchLoginUsernameCapture(vsLike) {
  const save = () => {
    captureLoginUsername().catch(() => {});
  };
  save();

  const bind = (el) => {
    if (!el || el.dataset.vsUserCap) return;
    el.dataset.vsUserCap = "1";
    el.addEventListener("change", save);
    el.addEventListener("blur", save);
    el.addEventListener("input", () => {
      // Debounce lightly via timeout if vs available
      if (vsLike?.setTimeout) {
        if (el._vsCapT) vsLike.clear(el._vsCapT);
        el._vsCapT = vsLike.setTimeout(save, 400);
      } else {
        clearTimeout(el._vsCapT);
        el._vsCapT = setTimeout(save, 400);
      }
    });
  };

  const scan = () => {
    document.querySelectorAll(LOGIN_USER_SEL).forEach(bind);
    const next = document.querySelector(
      "button#next, button#continue, input#next, input[type='submit']"
    );
    if (next && !next.dataset.vsUserCapBtn) {
      next.dataset.vsUserCapBtn = "1";
      next.addEventListener("click", save);
    }
  };

  scan();
  if (vsLike?.setInterval) {
    vsLike.setInterval(scan, 1500);
  } else {
    setInterval(scan, 1500);
  }
}
