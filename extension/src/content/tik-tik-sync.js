/**
 * Sync safe Tik Tik prefs (cities, dates, toggles, timings, terms) to/from server.
 * Never uploads login password or security answers.
 */
import {
  TIK_TIK_PREFS_URL,
  getProfile,
  getSetting,
} from "../shared/config.js";
import { extensionAlive, storageGet } from "../shared/runtime.js";
import { freshIdToken } from "./reporting.js";

const SAFE_KEYS = [
  "cities",
  "from",
  "to",
  "submitEnabled",
  "citiesEnabled",
  "enabled",
  "slotWindows",
  "termsAgreed",
  "termsPassed",
  "termsAgreedAt",
];

export function pickSafeTikTikPrefs(cfg) {
  if (!cfg || typeof cfg !== "object") return {};
  const out = {};
  for (const key of SAFE_KEYS) {
    if (key in cfg) out[key] = cfg[key];
  }
  if (typeof out.submitEnabled !== "boolean" && typeof out.enabled === "boolean") {
    out.submitEnabled = out.enabled;
  }
  delete out.enabled;
  return out;
}

export function mergeServerTikTikPrefs(localCfg, serverPrefs) {
  if (!serverPrefs || typeof serverPrefs !== "object") return localCfg || null;
  const local = localCfg && typeof localCfg === "object" ? { ...localCfg } : {};
  const localUpdated = Number(local.serverUpdatedAt) || 0;
  const serverUpdated = Number(serverPrefs.updatedAt) || 0;
  // Prefer server when it's newer or local has never synced.
  if (serverUpdated && localUpdated && serverUpdated < localUpdated) {
    return local;
  }
  const safe = pickSafeTikTikPrefs(serverPrefs);
  const next = { ...local, ...safe };
  if (typeof safe.submitEnabled === "boolean") next.enabled = safe.submitEnabled;
  if (serverPrefs.updatedAt) next.serverUpdatedAt = serverPrefs.updatedAt;
  return next;
}

async function _profileAndToken() {
  const [profile, storage] = await Promise.all([
    getProfile(),
    storageGet(["cgiIdToken"]),
  ]);
  const token = freshIdToken(storage.cgiIdToken);
  return { profile, token };
}

export async function pushTikTikPrefs(cfg) {
  if (!extensionAlive()) return false;
  if (!(await getSetting("serverSync"))) return false;
  const prefs = pickSafeTikTikPrefs(cfg);
  if (!Object.keys(prefs).length) return false;
  const { profile, token } = await _profileAndToken();
  if (!profile?.id && !profile?.email) return false;
  try {
    const body = { profile, prefs };
    if (token) body.token = token;
    const res = await fetch(TIK_TIK_PREFS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json());
    return !!(res && res.success);
  } catch {
    return false;
  }
}

export async function pullTikTikPrefs() {
  if (!extensionAlive()) return null;
  if (!(await getSetting("serverSync"))) return null;
  const { profile, token } = await _profileAndToken();
  if (!profile?.id && !profile?.email) return null;
  try {
    // Prefer GET by applicant id; fall back to POST without prefs.
    const qs = new URLSearchParams();
    if (profile.id) qs.set("applicant_id", String(profile.id));
    if (profile.email) qs.set("email", String(profile.email));
    let res = await fetch(`${TIK_TIK_PREFS_URL}?${qs.toString()}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    }).then((r) => r.json());
    if (res?.prefs) return res.prefs;

    const body = { profile };
    if (token) body.token = token;
    res = await fetch(TIK_TIK_PREFS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json());
    return res?.prefs || null;
  } catch {
    return null;
  }
}
