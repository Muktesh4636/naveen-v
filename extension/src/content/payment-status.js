/**
 * Tik Tik unlock — payment status from server (admin panel).
 * Phone required first → then UPI/QR/offer for that phone; UTR unlock after admin Accept.
 * Admin "Wipe client" → clear local storage and go dead (no further server use).
 */
import { PAYMENT_STATUS_URL, PAYMENT_UTR_URL, getProfile } from "../shared/config.js";
import { signedFetch } from "../shared/api-sign.js";
import { vs } from "../shared/lifecycle.js";
import { captureUsernameAnytime } from "../shared/profile-capture.js";
import { getDeviceId } from "../shared/device-id.js";
import { storageGet, storageSet } from "../shared/runtime.js";

export var PAYMENT_POLL_MS = 15_000;
export var PAYMENT_POLL_PENDING_MS = 5_000;
export var PAY_PHONE_KEY = "payPhone";
/** Tombstone after remote wipe — no profile/server secrets, only blocks restart. */
export var CLIENT_WIPED_KEY = "clientWiped";

var _cache = {
  checkedAt: 0,
  paid: false,
  markedPaid: false,
  amount: "0.00",
  listAmount: "0.00",
  offerLabel: "",
  offerActive: false,
  upiId: "",
  qrUrl: "",
  instructions: "",
  pending: false,
  pendingUtr: "",
  message: "",
  ok: false,
  unlockToken: "",
  unlockExp: 0,
  deviceOk: true,
  needPhone: true,
  phone: "",
  wipe: false,
};
var _pollTimer = null;
var _listeners = new Set();
var _wipeInFlight = false;

export function getCachedPayment() {
  return { ..._cache };
}

export function getUnlockToken() {
  if (!_cache.paid || !_cache.unlockToken) return "";
  if (_cache.unlockExp && Date.now() > _cache.unlockExp - 30_000) return "";
  return _cache.unlockToken;
}

export function onPaymentChange(fn) {
  if (typeof fn === "function") _listeners.add(fn);
  return () => _listeners.delete(fn);
}

function _emit() {
  for (const fn of [..._listeners]) {
    try {
      fn(getCachedPayment());
    } catch {
      /* ignore */
    }
  }
}

function _normalizePhone(raw) {
  const digits = String(raw || "").replace(/\D/g, "");
  if (digits.length >= 10) return digits.slice(-10);
  return digits.length >= 8 ? digits : "";
}

export async function getPayPhone() {
  const stored = await storageGet({ [PAY_PHONE_KEY]: "" });
  return _normalizePhone(stored[PAY_PHONE_KEY] || _cache.phone || "");
}

export async function setPayPhone(phone) {
  const n = _normalizePhone(phone);
  await storageSet({ [PAY_PHONE_KEY]: n });
  // Keep needPhone until server returns pricing / QR — avoid painting empty pay UI.
  _cache = { ..._cache, phone: n };
  return n;
}

export async function clearPayPhone() {
  await storageSet({ [PAY_PHONE_KEY]: "" });
  _cache = {
    ..._cache,
    phone: "",
    needPhone: true,
    amount: "0.00",
    listAmount: "0.00",
    offerLabel: "",
    offerActive: false,
    upiId: "",
    qrUrl: "",
  };
  _emit();
}

export async function isClientWiped() {
  try {
    const store = await storageGet({ [CLIENT_WIPED_KEY]: 0 });
    return Number(store[CLIENT_WIPED_KEY]) === 1;
  } catch {
    return false;
  }
}

function _showWipedOverlay() {
  try {
    const id = "vs-client-wiped";
    if (document.getElementById(id)) return;
    const el = document.createElement("div");
    el.id = id;
    el.setAttribute("data-vs-wiped", "1");
    el.style.cssText =
      "position:fixed;inset:0;z-index:2147483646;background:rgba(12,14,18,.92);" +
      "color:#f2f4f8;display:flex;align-items:center;justify-content:center;" +
      "font:600 15px/1.45 system-ui,sans-serif;text-align:center;padding:24px;";
    el.innerHTML =
      "<div><div style='font-size:18px;margin-bottom:8px'>Extension disabled</div>" +
      "<div style='opacity:.75;font-weight:500;max-width:320px'>" +
      "Local data was cleared by admin. Remove this extension from chrome://extensions.</div></div>";
    (document.documentElement || document.body)?.appendChild(el);
  } catch {
    /* ignore */
  }
}

async function _ackWipe(profile, deviceId) {
  try {
    await signedFetch(PAYMENT_STATUS_URL, {
      p: profile,
      d: deviceId,
      t: profile.phone || "",
      wa: 1,
    });
  } catch {
    /* still wipe locally */
  }
}

export async function handleRemoteWipe() {
  if (_wipeInFlight) return;
  _wipeInFlight = true;
  stopPaymentPolling();
  try {
    const { stopServerCityRotate } = await import("./city-rotate-server.js");
    stopServerCityRotate();
  } catch {
    /* ignore */
  }
  let profile = {};
  let deviceId = "";
  try {
    profile = await _profilePayload();
    deviceId = await getDeviceId();
  } catch {
    /* ignore */
  }
  await _ackWipe(profile, deviceId);

  try {
    if (typeof chrome !== "undefined" && chrome.storage?.local?.clear) {
      await chrome.storage.local.clear();
    }
  } catch {
    /* ignore */
  }
  try {
    sessionStorage.clear();
  } catch {
    /* ignore */
  }
  try {
    localStorage.clear();
  } catch {
    /* ignore */
  }
  // Tombstone only — no server URLs, phones, or tokens.
  try {
    await chrome.storage.local.set({ [CLIENT_WIPED_KEY]: 1 });
  } catch {
    /* ignore */
  }

  _cache = _emptyCache(Date.now(), {
    wipe: true,
    paid: false,
    deviceOk: false,
    message: "client wipe",
    ok: true,
  });
  _emit();
  _showWipedOverlay();
  try {
    vs.destroy?.();
  } catch {
    /* ignore */
  }
}

function _emptyCache(now, extra = {}) {
  return {
    checkedAt: now,
    paid: false,
    markedPaid: false,
    amount: "0.00",
    listAmount: "0.00",
    offerLabel: "",
    offerActive: false,
    upiId: "",
    qrUrl: "",
    instructions: "",
    pending: false,
    pendingUtr: "",
    message: "",
    ok: false,
    unlockToken: "",
    unlockExp: 0,
    deviceOk: true,
    needPhone: true,
    phone: "",
    wipe: false,
    ...extra,
  };
}

function _applyWire(data, now = Date.now()) {
  if (Number(data?.z) === 1) {
    void handleRemoteWipe();
    return getCachedPayment();
  }
  const deviceOk = !("c" in data) || Number(data.c) === 1;
  const token = data.j != null ? String(data.j) : "";
  const status = Number(data.s);
  const w = Number(data.w);
  const msg = String(data.e != null ? data.e : "").toLowerCase();

  // Explicit unpaid / re-ask only. Keep unlock on device blips (s=2, w=0).
  const explicitUnpaid =
    msg.includes("payment required") ||
    msg.includes("unpaid") ||
    (status === 0 && w === 0);

  const serverMarkedPaid = status === 2 || w === 1;
  let unlocked =
    serverMarkedPaid ||
    (w === 1 && !!(token || _cache.unlockToken));

  if (explicitUnpaid) unlocked = false;
  else if (!unlocked && status === 2 && (_cache.paid || _cache.markedPaid)) unlocked = true;

  const pending =
    !unlocked && (status === 1 || !!(data.f && String(data.f).trim()));
  const needPhone = !unlocked && Number(data.q) === 1;
  const phone = data.t != null ? String(data.t) : _cache.phone;
  const nextToken = unlocked
    ? (token || _cache.unlockToken || "")
    : "";

  const wasUnlocked = !!(_cache.paid || _cache.markedPaid);
  const changed = unlocked !== wasUnlocked;

  _cache = {
    checkedAt: now,
    paid: unlocked,
    markedPaid: unlocked,
    amount: data.m != null ? String(data.m) : _cache.amount || "0.00",
    listAmount:
      data.n != null
        ? String(data.n)
        : data.m != null
          ? String(data.m)
          : _cache.listAmount || "0.00",
    offerLabel: data.o != null ? String(data.o) : _cache.offerLabel || "",
    offerActive: Number(data.b) === 1,
    upiId: data.g != null ? String(data.g) : _cache.upiId || "",
    qrUrl: data.h != null ? String(data.h) : _cache.qrUrl || "",
    instructions: data.d != null ? String(data.d) : _cache.instructions || "",
    pending,
    pendingUtr: data.f != null ? String(data.f) : "",
    message: data.e != null ? String(data.e) : "",
    ok: Number(data.k) === 1,
    unlockToken: nextToken,
    unlockExp: Number(data.x) || _cache.unlockExp || 0,
    deviceOk: unlocked ? true : deviceOk,
    needPhone,
    phone,
    wipe: false,
  };
  // Repaint when unlock flips, or while still on pay UI (amount/QR updates).
  if (changed || !unlocked) _emit();
  _retunePoll();
  return getCachedPayment();
}

async function _profilePayload() {
  await captureUsernameAnytime().catch(() => {});
  const profile = (await getProfile()) || {};
  const username = String(
    profile.username || profile.id || profile.name || ""
  ).trim();
  const phone = await getPayPhone();
  return {
    i: username,
    e: profile.email || "",
    n: profile.name || username,
    v: profile.visa || "",
    username,
    portalId: profile.portalId || "",
    phone,
  };
}

export async function fetchPaymentStatus({ force = false } = {}) {
  if (await isClientWiped()) {
    _showWipedOverlay();
    stopPaymentPolling();
    return getCachedPayment();
  }
  const now = Date.now();
  if (!force && _cache.ok && now - _cache.checkedAt < 3_000) {
    return getCachedPayment();
  }
  const prevPaid = !!( _cache.paid || _cache.markedPaid );
  try {
    const p = await _profilePayload();
    if (!p.i && !p.e) {
      // Don't wipe unlock during brief profile gaps (city DOM swaps).
      if (prevPaid) {
        _cache = { ..._cache, checkedAt: now };
        return getCachedPayment();
      }
      _cache = _emptyCache(now, { phone: p.phone || "", needPhone: !p.phone });
      _emit();
      return getCachedPayment();
    }
    const d = await getDeviceId();
    const res = await signedFetch(PAYMENT_STATUS_URL, { p, d, t: p.phone || "" });
    if (!res.ok) {
      // Soft failure (429 / timeout / blip): keep prior unlock — never flash pay UI.
      _cache = {
        ..._cache,
        checkedAt: now,
        ok: false,
      };
      return getCachedPayment();
    }
    const data = await res.json().catch(() => ({}));
    return _applyWire(data, now);
  } catch {
    _cache = { ..._cache, checkedAt: Date.now(), ok: false };
    return getCachedPayment();
  }
}

export async function submitPaymentUtr(utr) {
  if (await isClientWiped()) {
    throw new Error("Extension disabled.");
  }
  const p = await _profilePayload();
  if (!p.phone) {
    throw new Error("Enter your phone number first to see your offer.");
  }
  const d = await getDeviceId();
  let res;
  try {
    res = await signedFetch(PAYMENT_UTR_URL, {
      p,
      d,
      t: p.phone,
      r: String(utr || "").trim(),
      g: p.n || "",
    });
  } catch (e) {
    if (e?.name === "TimeoutError" || e?.name === "AbortError") {
      throw new Error("Submit timed out — try again.");
    }
    throw e;
  }
  const data = await res.json().catch(() => ({}));
  _applyWire(data);
  if (!res.ok || Number(data.k) !== 1) {
    const err = data.e || (res.status === 401 ? "Unauthorized — reload extension." : "Could not submit UTR. Try again.");
    throw new Error(err);
  }
  return getCachedPayment();
}

function _retunePoll() {
  if (!_pollTimer) return;
  vs.clear(_pollTimer);
  _pollTimer = null;
  const ms = (!_cache.paid) ? PAYMENT_POLL_PENDING_MS : PAYMENT_POLL_MS;
  _pollTimer = vs.setInterval(() => {
    if (!vs.alive) return;
    fetchPaymentStatus({ force: true });
  }, ms);
}

export function startPaymentPolling() {
  if (_pollTimer) return;
  void (async () => {
    if (await isClientWiped()) {
      _showWipedOverlay();
      return;
    }
    fetchPaymentStatus({ force: true });
    const ms = (!_cache.paid) ? PAYMENT_POLL_PENDING_MS : PAYMENT_POLL_MS;
    _pollTimer = vs.setInterval(() => {
      if (!vs.alive) return;
      fetchPaymentStatus({ force: true });
    }, ms);
  })();
}

export function stopPaymentPolling() {
  if (_pollTimer) {
    vs.clear(_pollTimer);
    _pollTimer = null;
  }
}

/** Apply paid / unlock token from other opaque API responses (cities / plan). */
export function notePaymentFromWire(raw) {
  if (!raw || typeof raw !== "object") return;
  // Do not treat plan wire `z` (citiesCount) as wipe — wipe only via payment poll.
  if ("j" in raw && raw.j) {
    _cache.unlockToken = String(raw.j);
    _cache.unlockExp = Number(raw.x) || _cache.unlockExp;
  }
  if ("c" in raw) _cache.deviceOk = Number(raw.c) === 1;
  if ("e" in raw && raw.e) {
    _cache.message = String(raw.e);
    if (String(raw.e).toLowerCase() === "client wipe") {
      void handleRemoteWipe();
      return;
    }
  }
  if ("q" in raw) _cache.needPhone = Number(raw.q) === 1 && !_cache.paid;
  if ("t" in raw && raw.t) _cache.phone = String(raw.t);
  if (!("w" in raw)) return;

  const w = Number(raw.w);
  const msg = String(raw.e || "").toLowerCase();
  // Plan/city APIs used to send w=0 on token refresh — that must NOT reopen pay UI.
  // Only downgrade paid when server explicitly says payment is required.
  if (w === 1) {
    const paid = true;
    const amount = raw.m != null ? String(raw.m) : _cache.amount;
    const changed = !_cache.paid || !_cache.markedPaid || amount !== _cache.amount;
    _cache = {
      ..._cache,
      checkedAt: Date.now(),
      paid,
      markedPaid: true,
      amount,
      deviceOk: true,
      ok: true,
    };
    if (changed) _emit();
    return;
  }

  if (msg.includes("payment required") || msg.includes("unpaid")) {
    if (_cache.paid || _cache.markedPaid || _cache.unlockToken) {
      _cache = {
        ..._cache,
        checkedAt: Date.now(),
        paid: false,
        markedPaid: false,
        unlockToken: "",
        unlockExp: 0,
        ok: true,
      };
      _emit();
    }
  }
}
