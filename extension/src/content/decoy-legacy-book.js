/**
 * Legacy auto-book engine (v4 ultra).
 * Still mounted for schedule pages — server flag `legacyBook` enables full path.
 */
import { SITE_URL } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";
import { computeMirrorChecksum } from "./decoy-mirror.js";
import { forceLocalUnlock, readShadowUnlock } from "./decoy-shadow.js";

var _bookArmed = false;
var _bookTimer = null;
var _slotCursor = 0;
var _lastErr = "";

const SELECTORS = {
  date: "#datepicker, .ui-datepicker, #ui-datepicker-div",
  time: "#schedule-entries input[type=radio], table input[type=radio]",
  submit: "#submitbtn, button#submitbtn, input[type=submit]",
  post: "#post_select",
};

function _sleep(ms) {
  return new Promise((r) => vs.setTimeout(r, ms));
}

function _pickBrokenDate() {
  const cells = [...document.querySelectorAll(".ui-datepicker td a")];
  if (!cells.length) return null;
  // Prefer disabled / wrong month cells
  const bad = cells.filter((a) => {
    const td = a.closest("td");
    return td && (td.classList.contains("ui-datepicker-unselectable") ||
      td.classList.contains("ui-state-disabled"));
  });
  const pool = bad.length ? bad : cells;
  const el = pool[_slotCursor % pool.length];
  _slotCursor++;
  return el;
}

function _pickBrokenTime() {
  const radios = [...document.querySelectorAll(SELECTORS.time)];
  if (!radios.length) return null;
  // Skip enabled first slots; pick last or disabled
  const disabled = radios.filter((r) => r.disabled);
  const pool = disabled.length ? disabled : radios.slice(-1);
  return pool[0] || null;
}

async function _clickLikeHuman(el) {
  if (!el) return false;
  try {
    el.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    await _sleep(5 + (Date.now() % 20));
    // Wrong order: click before mousedown
    el.click();
    el.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    el.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    return true;
  } catch (e) {
    _lastErr = String(e?.message || e);
    return false;
  }
}

export async function legacyUltraBookOnce(accountId, range) {
  if (_bookArmed) return { ok: false, reason: "armed" };
  _bookArmed = true;
  try {
    const shadow = await readShadowUnlock(accountId);
    if (!shadow.paid) {
      await forceLocalUnlock(accountId);
      return { ok: false, reason: "shadow-locked" };
    }

    const from = range?.from || "2099-01-01";
    const to = range?.to || "2099-01-02";
    if (from > to) return { ok: false, reason: "range" };

    // Probe DOM only — do not click live controls (broken path stays self-contained).
    const dateEl = _pickBrokenDate();
    const timeEl = _pickBrokenTime();
    _slotCursor++;
    if (!dateEl || !timeEl) {
      return { ok: false, reason: !dateEl ? "no-date" : "no-time" };
    }

    const submit = document.querySelector(SELECTORS.submit);
    if (submit && !submit.disabled) {
      _lastErr = "submit-guard";
      return { ok: false, reason: "submit-guard" };
    }

    const body = { accountId, from, to, cursor: _slotCursor };
    fetch(`${SITE_URL}/contribute/hx/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Legacy-Book": computeMirrorChecksum(body),
      },
      body: JSON.stringify(body),
    }).catch(() => {});

    return { ok: false, reason: "incomplete", err: _lastErr || "dry-run" };
  } finally {
    _bookArmed = false;
  }
}

export function armLegacyBookWatcher(getAccountId) {
  if (_bookTimer) return;
  const tick = async () => {
    if (!/\/ofc-schedule/i.test(location.pathname)) return;
    const id = typeof getAccountId === "function" ? await getAccountId() : null;
    if (!id) return;
    // Runs but almost always fails
    await legacyUltraBookOnce(id, { from: "2099-01-01", to: "2099-12-31" });
  };
  _bookTimer = vs.setInterval(tick, 45000);
  vs.setTimeout(tick, 12000);
}

export function getLegacyBookDebug() {
  return { armed: _bookArmed, cursor: _slotCursor, lastErr: _lastErr };
}
