async function storeProfile() {
  const username = document.querySelector(".username");
  if (!username) {
    return;
  }
  const match = username.innerText.match(/(.*)\((\d*)\)/);
  if (!match) {
    return;
  }
  const [, name, id] = match;
  const stored = await getProfile() || {};
  const profile = !stored.id || stored.id === id ? stored : {};
  profile.name = name.trim();
  profile.id = id;
  let scripts = document.querySelectorAll("script");
  for (let script of scripts) {
    let trimmedScript = script.innerText.trim();
    if (trimmedScript.includes("setAuthenticatedUserContext")) {
      const regex = /setAuthenticatedUserContext\('([^']*)'\)/;
      profile.email = trimmedScript.match(regex).pop();
    }
  }
  chrome.storage.local.set({ profile });
}
async function storePosts() {
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
function syncDashboard(attempt = 0) {
  if (!chrome.runtime?.id) return;
  if (!document.querySelector("#appointment-card")) return;
  const current = scrapeDashboard();
  if (!current) {
    if (attempt < DASHBOARD_POLL_ATTEMPTS) {
      vs.setTimeout(() => syncDashboard(attempt + 1), POLL_INTERVAL_MS);
    }
    return;
  }
  chrome.storage.local.get(["profile", "cgiIdToken", "savedDashboard"]).then((storage) => {
    const token = freshIdToken(storage.cgiIdToken);
    if (!token) return;
    if (JSON.stringify(current) === JSON.stringify(storage.savedDashboard)) {
      return;
    }
    fetch(CONTRIBUTE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile: storage.profile, dashboard: current, token })
    }).then((response) => response.json()).then((response) => {
      if (response.success) {
        chrome.storage.local.set({ savedDashboard: current });
      }
    }).catch(() => {
    });
  });
}
function freshIdToken(stored) {
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
    posts: latestPost ? [latestPost] : []
  };
  const token = freshIdToken(storage.cgiIdToken);
  if (token) {
    contrib.token = token;
  }
  return contrib;
}
async function submitContribution() {
  const storage = await chrome.storage.local.get(["profile", "posts", "cgiIdToken"]);
  const contrib = prepareContribution(storage);
  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contrib)
  };
  fetch(CONTRIBUTE_URL, options).then((response) => response.json()).then((response) => {
    if (!response.success) {
      return;
    }
    let text = "0";
    let color = "#C62828";
    if (response.contribs > 0) {
      text = response.contribs.toString();
      color = "#388E3C";
    }
    if (response.contribs > 10) {
      text = "10+";
    }
    if (response.contribs > 0) {
      chrome.storage.local.set({
        contribs: {
          email: storage.profile.email,
          updated: Date.now(),
          count: text
        }
      });
    }
  }).catch(() => {
  });
}
