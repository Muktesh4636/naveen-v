/**
 * Cross-applicant city coordination via server.
 * Local City Change still hops on its own; this only broadcasts
 * "slots found" so others with that preferred city force-switch now.
 */
import {
  TIK_TIK_COORD_URL,
  getProfile,
  getSetting,
} from "../shared/config.js";
import { extensionAlive, storageGet } from "../shared/runtime.js";
import { freshIdToken } from "./reporting.js";

var _lastAlertId = 0;
var _lastReportedKey = "";
var _lastReportedAt = 0;

async function _profileAndToken() {
  const [profile, storage] = await Promise.all([
    getProfile(),
    storageGet(["cgiIdToken"]),
  ]);
  const token = freshIdToken(storage.cgiIdToken);
  return { profile, token };
}

async function _postCoord(payload) {
  if (!extensionAlive()) return null;
  if (!(await getSetting("serverSync"))) return null;
  const { profile, token } = await _profileAndToken();
  if (!profile?.id && !profile?.email) return null;
  try {
    const body = { ...payload, profile };
    if (token) body.token = token;
    const res = await fetch(TIK_TIK_COORD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json());
    return res && res.success ? res : null;
  } catch {
    return null;
  }
}

/** Tell the server this city has appointment days (others may force-switch). */
export async function reportCitySlotsFound({ postId, postName, dayCount } = {}) {
  const cityId = String(postId || "").trim();
  const n = Number(dayCount) || 0;
  if (!cityId || n < 1) return null;

  const key = `${cityId}:${n}`;
  const now = Date.now();
  // Local debounce — avoid spamming on repeated CGI paints.
  if (key === _lastReportedKey && now - _lastReportedAt < 4000) return null;
  _lastReportedKey = key;
  _lastReportedAt = now;

  const res = await _postCoord({
    action: "alert",
    city: { id: cityId, name: String(postName || cityId).trim() },
    dayCount: n,
  });
  if (res?.alertId) {
    // Finder already on this city — mark alert seen so we don't self-loop.
    _lastAlertId = Math.max(_lastAlertId, Number(res.alertId) || 0);
  }
  return res;
}

/**
 * Poll for a force-city command matching preferred cities.
 * Returns { id, name, alertId, dayCount, alreadyThere } or null.
 */
export async function pollForceCity({
  preferredCities = [],
  citiesEnabled = false,
  currentCityId = "",
} = {}) {
  if (!citiesEnabled || !preferredCities?.length) return null;
  const res = await _postCoord({
    action: "poll",
    preferredCities,
    citiesEnabled: true,
    currentCityId: String(currentCityId || ""),
    lastAlertId: _lastAlertId,
  });
  const force = res?.forceCity;
  if (!force?.id || !force?.alertId) return null;
  return force;
}

export function markForceCityApplied(alertId) {
  const id = Number(alertId) || 0;
  if (id > _lastAlertId) _lastAlertId = id;
}

export function getLastForceAlertId() {
  return _lastAlertId;
}
