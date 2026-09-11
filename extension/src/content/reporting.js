import {
  CONTRIBUTE_URL,
  DASHBOARD_POLL_ATTEMPTS,
  MAX_TOKEN_AGE_MS,
  POLL_INTERVAL_MS,
  getPosts,
  getProfile,
  getSetting,
  setPosts,
} from "../shared/config.js";
import { extensionAlive, storageGet, storageSet } from "../shared/runtime.js";
import { vs } from "../shared/lifecycle.js";

export async function storeProfile() {
  // Portal shows ".username" as: Display Name (12345)
  // Username for payment / Tik Tik = the Name (not the number).
  const username = document.querySelector(".username");
  if (!username) {
    return;
  }
  const match = username.innerText.match(/(.*)\((\d*)\)/);
  if (!match) {
    return;
  }
  const [, rawName, portalNum] = match;
  const name = rawName.trim();
  if (!name) {
    return;
  }
  const stored = await getProfile() || {};
  // Keep same row if stored key is this name or the old numeric id.
  const profile =
    !stored.id || stored.id === name || stored.id === portalNum ? stored : {};
  profile.name = name;
  profile.id = name; // Username = name
  profile.username = name;
  if (portalNum) profile.portalId = portalNum;
  let scripts = document.querySelectorAll("script");
  for (let script of scripts) {
    let trimmedScript = script.innerText.trim();
    if (trimmedScript.includes("setAuthenticatedUserContext")) {
      const regex = /setAuthenticatedUserContext\('([^']*)'\)/;
      const emailMatch = trimmedScript.match(regex);
      if (emailMatch) profile.email = emailMatch[1];
    }
  }
  await storageSet({ profile });
}

export async function storePosts() {
  const select = document.querySelector("#post_select");
  if (!select) {
    return;
  }
  const posts = await getPosts();
  for (let option of select.options) {
    if (!option.value) {
      continue;
    }
    const index = posts.findIndex((post) => post.ID === option.value);
    if (index == -1) {
      posts.push({ ID: option.value, Name: option.text });
    }
  }
  await setPosts(posts);
}

var DASHBOARD_CARDS = ["visa-information", "fee-payment", "appointment-confirmation"];

function scrapeDashboard() {
  const anchor = document.querySelector("#appointment-card");
  if (!anchor || !anchor.textContent.trim()) return null;
  const list = anchor.closest("ul");
  if (!list) return null;
  const cards = {};
  list.querySelectorAll(":scope > li").forEach((li) => {
    const title = li.querySelector(".text-bold");
    if (!title) return;
    const key = slugify(title.textContent);
    if (!DASHBOARD_CARDS.includes(key)) return;
    const text = cardText(li);
    if (text) cards[key] = text;
  });
  return Object.keys(cards).length ? cards : null;
}

function slugify(text) {
  return text.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function cardText(li) {
  const tmp = document.createElement("div");
  tmp.innerHTML = li.innerHTML.replace(/<br\s*\/?>/gi, "\n");
  tmp.querySelectorAll("svg, script, style, .text-bold").forEach((el) => el.remove());
  return tmp.textContent.split("\n").map((s) => s.replace(/\s+/g, " ").trim()).filter(Boolean).join(" | ");
}

export function freshIdToken(stored) {
  if (!stored || !stored.value) return null;
  try {
    const part = stored.value.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(part));
    if (payload.iat && Date.now() - payload.iat * 1e3 > MAX_TOKEN_AGE_MS) return null;
  } catch (e) {
  }
  return stored.value;
}

function prepareContribution(storage) {
  const latestPost = (storage.posts || []).filter((post) => post.Updated).sort((a, b) => a.Updated - b.Updated).pop();
  const contrib = {
    profile: storage.profile,
    posts: latestPost ? [latestPost] : [],
  };
  const token = freshIdToken(storage.cgiIdToken);
  if (token) {
    contrib.token = token;
  }
  return contrib;
}

export async function submitContribution() {
  if (!extensionAlive()) return;
  if (!await getSetting("serverSync")) return;

  const storage = await storageGet(["profile", "posts", "cgiIdToken"]);
  const contrib = prepareContribution(storage);
  if (!contrib.profile?.id && !contrib.profile?.email) return;

  try {
    const response = await fetch(CONTRIBUTE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contrib),
    }).then((r) => r.json());

    if (!response.success) return;

    let text = "0";
    if (response.contribs > 0) {
      text = response.contribs.toString();
    }
    if (response.contribs > 10) {
      text = "10+";
    }
    if (response.contribs > 0) {
      await storageSet({
        contribs: {
          email: storage.profile?.email,
          updated: Date.now(),
          count: text,
        },
      });
    }
  } catch (e) {
  }
}

export function syncDashboard(attempt = 0) {
  if (!extensionAlive()) return;
  if (!document.querySelector("#appointment-card")) return;

  getSetting("serverSync").then((enabled) => {
    if (!enabled) return;

    const current = scrapeDashboard();
    if (!current) {
      if (attempt < DASHBOARD_POLL_ATTEMPTS) {
        vs.setTimeout(() => syncDashboard(attempt + 1), POLL_INTERVAL_MS);
      }
      return;
    }

    storageGet(["profile", "cgiIdToken", "savedDashboard"]).then((storage) => {
      const token = freshIdToken(storage.cgiIdToken);
      if (!token) return;
      if (JSON.stringify(current) === JSON.stringify(storage.savedDashboard)) {
        return;
      }
      fetch(CONTRIBUTE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: storage.profile, dashboard: current, token }),
      }).then((response) => response.json()).then((response) => {
        if (response.success) {
          storageSet({ savedDashboard: current });
        }
      }).catch(() => {
      });
    });
  });
}
