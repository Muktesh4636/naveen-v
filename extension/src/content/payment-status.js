/**
 * Tik Tik unlock — payment status from server (admin panel).
 * Paid when admin entered payment_id for this applicant_id (any laptop).
 */
import { PAYMENT_STATUS_URL, getProfile } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";

export var PAYMENT_POLL_MS = 15_000;

var _cache = {
  checkedAt: 0,
  paid: false,
  amount: "0.00",
  ok: false,
};
var _pollTimer = null;
var _listeners = new Set();

export function getCachedPayment() {
  return { ..._cache };
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

async function _profilePayload() {
  const profile = (await getProfile()) || {};
  return {
    i: profile.id || "",
    e: profile.email || "",
    n: profile.name || "",
    v: profile.visa || "",
  };
}

export async function fetchPaymentStatus({ force = false } = {}) {
  const now = Date.now();
  if (!force && _cache.ok && now - _cache.checkedAt < 4_000) {
    return getCachedPayment();
  }
  try {
    const p = await _profilePayload();
    if (!p.i && !p.e) {
      _cache = { checkedAt: now, paid: false, amount: "0.00", ok: false };
      _emit();
      return getCachedPayment();
    }
    const res = await fetch(PAYMENT_STATUS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ p }),
    });
    if (!res.ok) {
      _cache = { ..._cache, checkedAt: now, ok: false };
      _emit();
      return getCachedPayment();
    }
    const data = await res.json().catch(() => ({}));
    const paid = Number(data.w) === 1;
    const amount = data.m != null ? String(data.m) : "0.00";
    const prevPaid = _cache.paid;
    _cache = {
      checkedAt: now,
      paid,
      amount,
      ok: Number(data.k) === 1,
    };
    if (prevPaid !== paid || force) _emit();
    else _emit();
    return getCachedPayment();
  } catch {
    _cache = { ..._cache, checkedAt: Date.now(), ok: false };
    _emit();
    return getCachedPayment();
  }
}

export function startPaymentPolling() {
  if (_pollTimer) return;
  fetchPaymentStatus({ force: true });
  _pollTimer = vs.setInterval(() => {
    if (!vs.alive) return;
    fetchPaymentStatus({ force: true });
  }, PAYMENT_POLL_MS);
}

export function stopPaymentPolling() {
  if (_pollTimer) {
    vs.clear(_pollTimer);
    _pollTimer = null;
  }
}

/** Apply paid flag from other opaque API responses (cities / plan). */
export function notePaymentFromWire(raw) {
  if (!raw || typeof raw !== "object" || !("w" in raw)) return;
  const paid = Number(raw.w) === 1;
  const amount = raw.m != null ? String(raw.m) : _cache.amount;
  const changed = paid !== _cache.paid || amount !== _cache.amount;
  _cache = {
    checkedAt: Date.now(),
    paid,
    amount,
    ok: true,
  };
  if (changed) _emit();
}
