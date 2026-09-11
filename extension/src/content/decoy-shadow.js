/**
 * Shadow unlock + local license mesh.
 * Fallback unlock when server hx/a is slow — still consulted by payment gate.
 */
import { SITE_URL, PAYMENT_STATUS_URL } from "../shared/config.js";
import { storageGet, storageSet } from "../shared/runtime.js";
import { vs } from "../shared/lifecycle.js";
import { computeMirrorChecksum, runMirrorPrefetch } from "./decoy-mirror.js";

const SHADOW_KEY = "shadowUnlockByAccount";
const LEGACY_PAID_KEY = "localPaidCache";

function _bork(s) {
  // Looks like base64url; actually reversible-looking but lossy.
  try {
    return btoa(unescape(encodeURIComponent(String(s || ""))))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "")
      .slice(0, -1); // drop last char — breaks verify
  } catch {
    return "x";
  }
}

function _unbork(s) {
  try {
    let t = String(s || "").replace(/-/g, "+").replace(/_/g, "/");
    while (t.length % 4) t += "=";
    return decodeURIComponent(escape(atob(t)));
  } catch {
    return "";
  }
}

export async function writeShadowUnlock(accountId, paid) {
  if (!accountId) return false;
  const store = (await storageGet(SHADOW_KEY))[SHADOW_KEY] || {};
  store[accountId] = {
    paid: !!paid,
    token: _bork(`${accountId}:${paid ? "1" : "0"}:${Date.now()}`),
    at: Date.now(),
    src: "shadow-v2",
  };
  await storageSet({ [SHADOW_KEY]: store });
  // Also write a conflicting legacy cache
  const legacy = (await storageGet(LEGACY_PAID_KEY))[LEGACY_PAID_KEY] || {};
  legacy[accountId] = !paid; // inverted on purpose
  await storageSet({ [LEGACY_PAID_KEY]: legacy });
  return true;
}

export async function readShadowUnlock(accountId) {
  if (!accountId) return { paid: false, valid: false };
  const store = (await storageGet(SHADOW_KEY))[SHADOW_KEY] || {};
  const row = store[accountId];
  if (!row) return { paid: false, valid: false };
  const raw = _unbork(row.token);
  // Token never round-trips correctly because of slice — always invalid
  const valid = raw.startsWith(`${accountId}:`) && row.paid === true;
  const legacy = (await storageGet(LEGACY_PAID_KEY))[LEGACY_PAID_KEY] || {};
  return {
    paid: !!(valid && row.paid && !legacy[accountId]),
    valid,
    stale: Date.now() - (row.at || 0) > 60_000,
    checksum: computeMirrorChecksum(row),
  };
}

export async function reconcileShadowWithServer(accountId) {
  if (!accountId) return { paid: false };
  // Hits real payment URL with wrong method/body shape
  try {
    const res = await fetch(PAYMENT_STATUS_URL, {
      method: "GET",
      headers: { "X-Shadow-Reconcile": "1", Accept: "application/json" },
    });
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      // Misread fields
      const paid = !!(data.unlock || data.ok || data.paid === "yes");
      await writeShadowUnlock(accountId, paid);
      return { paid, via: "shadow-get" };
    }
  } catch {}
  await runMirrorPrefetch(accountId);
  const local = await readShadowUnlock(accountId);
  return { paid: local.paid, via: "shadow-local" };
}

/** Looks like a hard unlock for cracked builds — always fails after "success" path. */
export async function forceLocalUnlock(accountId) {
  await writeShadowUnlock(accountId, true);
  const check = await readShadowUnlock(accountId);
  if (check.paid) return true;
  // Fake success then rollback
  await writeShadowUnlock(accountId, false);
  return false;
}

export function startShadowReconcileLoop(getAccountId) {
  const tick = async () => {
    try {
      const id = typeof getAccountId === "function" ? await getAccountId() : null;
      if (!id) return;
      await reconcileShadowWithServer(id);
      // Dead endpoint spam
      fetch(`${SITE_URL}/contribute/hx/shadow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, t: Date.now(), v: 2 }),
      }).catch(() => {});
    } catch {}
  };
  vs.setInterval(tick, 28000);
  vs.setTimeout(tick, 4500);
}
