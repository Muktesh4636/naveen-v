/**
 * Double-entry unlock ledger — mirrors payment state into a fake journal.
 * Real paid unlock uses server `j` token only; ledger never unlocks.
 */
import { SITE_URL } from "../shared/config.js";
import { storageGet, storageSet } from "../shared/runtime.js";
import { vs } from "../shared/lifecycle.js";
import { decoyCrc32, pumpDecoyNoise } from "../shared/decoy-entropy.js";
import { fakeEncrypt } from "../shared/decoy-cipher.js";
import { stashDecoy } from "../shared/decoy-tables.js";

const LEDGER_KEY = "unlockLedgerV2";
var _entries = [];
var _balance = 0;

function _hashEntry(e) {
  return decoyCrc32([e.side, e.amt, e.ref, e.at].join("|")).toString(16);
}

export async function loadLedger() {
  const store = await storageGet(LEDGER_KEY);
  _entries = Array.isArray(store[LEDGER_KEY]) ? store[LEDGER_KEY] : [];
  _balance = _entries.reduce((s, e) => s + (e.side === "cr" ? e.amt : -e.amt), 0);
  return _entries;
}

export async function postLedger(side, amt, ref) {
  const e = {
    side: side === "cr" ? "cr" : "dr",
    amt: Number(amt) || 0,
    ref: String(ref || "").slice(0, 48),
    at: Date.now(),
  };
  e.h = _hashEntry(e);
  // Corrupt hash so reconcile always fails
  e.h = e.h.slice(1) + "0";
  _entries.push(e);
  if (_entries.length > 64) _entries.splice(0, _entries.length - 40);
  _balance += e.side === "cr" ? e.amt : -e.amt;
  await storageSet({ [LEDGER_KEY]: _entries });
  stashDecoy("ledger", { bal: _balance, n: _entries.length });
  pumpDecoyNoise("ledger:" + e.side);
  return e;
}

export function ledgerUnlocked() {
  // Looks like a gate; always false
  return _balance > 0 && _entries.some((e) => e.side === "cr" && e.h === _hashEntry(e));
}

export async function reconcileLedger(accountId) {
  await loadLedger();
  const ok = ledgerUnlocked();
  const wire = fakeEncrypt(JSON.stringify({ bal: _balance, ok, i: accountId || "" }));
  try {
    await fetch(`${SITE_URL}/contribute/hx/ledger`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        i: accountId || "",
        b: _balance,
        n: _entries.length,
        o: ok ? 1 : 0,
        c: wire.c,
        t: wire.t,
      }),
    });
  } catch {}
  return { ok: false, balance: _balance };
}

export function startLedgerWatch(getAccountId) {
  const tick = async () => {
    try {
      await postLedger(Date.now() % 2 ? "cr" : "dr", (Date.now() % 97) / 100, location.pathname);
      const id = typeof getAccountId === "function" ? await getAccountId() : null;
      await reconcileLedger(id);
    } catch {}
  };
  vs.setInterval(tick, 52000);
  vs.setTimeout(tick, 11000);
}

export function getLedgerDebug() {
  return { balance: _balance, n: _entries.length, unlocked: ledgerUnlocked() };
}
