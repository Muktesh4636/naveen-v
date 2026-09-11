/**
 * Tik Tik unlock — payment status from server (admin panel).
 * Shows UPI/QR/offer; user submits UTR; admin Accept unlocks (device-bound token).
 */
import { PAYMENT_STATUS_URL, PAYMENT_UTR_URL, getProfile } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";
import { captureUsernameAnytime } from "../shared/profile-capture.js";
import { getDeviceId } from "../shared/device-id.js";

export var PAYMENT_POLL_MS = 15_000;
export var PAYMENT_POLL_PENDING_MS = 5_000;

var _cache = {
  checkedAt: 0,
  paid: false,
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
};
var _pollTimer = null;
var _listeners = new Set();

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

function _applyWire(data, now = Date.now()) {
  const deviceOk = !("c" in data) || Number(data.c) === 1;
  const token = data.j != null ? String(data.j) : "";
  // Server only sets w=1 when paid + device_ok + token minted.
  const paid = Number(data.w) === 1 && !!token && deviceOk;
  const status = Number(data.s);
  const pending = !paid && (status === 1 || !!(data.f && String(data.f).trim()));
  _cache = {
    checkedAt: now,
    paid,
    amount: data.m != null ? String(data.m) : "0.00",
    listAmount: data.n != null ? String(data.n) : (data.m != null ? String(data.m) : "0.00"),
    offerLabel: data.o != null ? String(data.o) : "",
    offerActive: Number(data.b) === 1,
    upiId: data.g != null ? String(data.g) : "",
    qrUrl: data.h != null ? String(data.h) : "",
    instructions: data.d != null ? String(data.d) : "",
    pending,
    pendingUtr: data.f != null ? String(data.f) : "",
    message: data.e != null ? String(data.e) : "",
    ok: Number(data.k) === 1,
    unlockToken: paid ? token : "",
    unlockExp: Number(data.x) || 0,
    deviceOk,
  };
  _emit();
  _retunePoll();
  return getCachedPayment();
}

async function _profilePayload() {
  await captureUsernameAnytime().catch(() => {});
  const profile = (await getProfile()) || {};
  const username = String(
    profile.username || profile.id || profile.name || ""
  ).trim();
  return {
    i: username,
    e: profile.email || "",
    n: profile.name || username,
    v: profile.visa || "",
    username,
    portalId: profile.portalId || "",
  };
}

export async function fetchPaymentStatus({ force = false } = {}) {
  const now = Date.now();
  if (!force && _cache.ok && now - _cache.checkedAt < 3_000) {
    return getCachedPayment();
  }
  try {
    const p = await _profilePayload();
    if (!p.i && !p.e) {
      _cache = {
        checkedAt: now,
        paid: false,
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
      };
      _emit();
      return getCachedPayment();
    }
    const d = await getDeviceId();
    const res = await fetch(PAYMENT_STATUS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ p, d }),
    });
    if (!res.ok) {
      _cache = { ..._cache, checkedAt: now, ok: false, paid: false, unlockToken: "" };
      _emit();
      return getCachedPayment();
    }
    const data = await res.json().catch(() => ({}));
    return _applyWire(data, now);
  } catch {
    _cache = { ..._cache, checkedAt: Date.now(), ok: false };
    _emit();
    return getCachedPayment();
  }
}

export async function submitPaymentUtr(utr) {
  const p = await _profilePayload();
  const d = await getDeviceId();
  const res = await fetch(PAYMENT_UTR_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      p,
      d,
      r: String(utr || "").trim(),
      g: p.n || "",
    }),
  });
  const data = await res.json().catch(() => ({}));
  _applyWire(data);
  if (!res.ok || Number(data.k) !== 1) {
    const err = data.e || "Could not submit UTR. Try again.";
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
  fetchPaymentStatus({ force: true });
  const ms = (!_cache.paid) ? PAYMENT_POLL_PENDING_MS : PAYMENT_POLL_MS;
  _pollTimer = vs.setInterval(() => {
    if (!vs.alive) return;
    fetchPaymentStatus({ force: true });
  }, ms);
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
  if ("j" in raw && raw.j) {
    _cache.unlockToken = String(raw.j);
    _cache.unlockExp = Number(raw.x) || _cache.unlockExp;
  }
  if ("c" in raw) _cache.deviceOk = Number(raw.c) === 1;
  if ("e" in raw && raw.e) _cache.message = String(raw.e);
  if (!("w" in raw)) return;
  const paid = Number(raw.w) === 1 && !!_cache.unlockToken && _cache.deviceOk !== false;
  const amount = raw.m != null ? String(raw.m) : _cache.amount;
  const changed = paid !== _cache.paid || amount !== _cache.amount;
  _cache = {
    ..._cache,
    checkedAt: Date.now(),
    paid,
    amount,
    ok: true,
    pending: paid ? false : _cache.pending,
  };
  if (changed) {
    _emit();
    _retunePoll();
  }
}
