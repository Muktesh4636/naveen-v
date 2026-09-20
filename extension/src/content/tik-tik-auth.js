/**
 * Tik Tik email login. One laptop at a time. Plans after the code is accepted.
 */
import { SITE_URL, TIK_TIK_AUTH_URL, getProfile } from "../shared/config.js";
import { storageGet, storageSet } from "../shared/runtime.js";
import { vs } from "../shared/lifecycle.js";
import { CLS, ID, idSel } from "../shared/token.js";

const SESSION_KEY = "tikTikSession";
const DEVICE_KEY = "tikTikDeviceId";
const PENDING_OTP_KEY = "tikTikPendingOtp";

let _unlocked = false;
let _after = null;
let _onRevoke = null;
let _poll = null;
let _pendingEmail = "";
let _awaitingOtp = false;

export function isTikTikUnlocked() {
  return _unlocked;
}

export function onTikTikAuthChange(fn) {
  _after = fn;
}

export function setTikTikRevokeHandler(fn) {
  _onRevoke = fn;
}

async function _deviceId() {
  const store = await storageGet(DEVICE_KEY);
  let id = store[DEVICE_KEY];
  if (!id) {
    id = crypto.randomUUID();
    await storageSet({ [DEVICE_KEY]: id });
  }
  return String(id).slice(0, 64);
}

async function _session() {
  const store = await storageGet(SESSION_KEY);
  return store[SESSION_KEY] || null;
}

async function _saveSession(token, email) {
  await storageSet({ [SESSION_KEY]: { token, email } });
}

async function _clearSession() {
  await storageSet({ [SESSION_KEY]: null });
}

async function _savePendingOtp(email) {
  _pendingEmail = email;
  _awaitingOtp = true;
  await storageSet({
    [PENDING_OTP_KEY]: { email, awaitingOtp: true, sentAt: Date.now() },
  });
}

async function _clearPendingOtp() {
  _awaitingOtp = false;
  await storageSet({ [PENDING_OTP_KEY]: null });
}

async function _loadPendingOtp() {
  const store = await storageGet(PENDING_OTP_KEY);
  const pending = store[PENDING_OTP_KEY];
  if (!pending?.awaitingOtp || !pending?.email) {
    _awaitingOtp = false;
    return null;
  }
  // Keep OTP screen for 30 minutes after send.
  if (Date.now() - Number(pending.sentAt || 0) > 30 * 60_000) {
    await _clearPendingOtp();
    return null;
  }
  _pendingEmail = String(pending.email);
  _awaitingOtp = true;
  return pending;
}

async function _applicantId() {
  try {
    const profile = await getProfile();
    return profile?.id ? String(profile.id) : "";
  } catch {
    return "";
  }
}

async function _post(body) {
  const res = await fetch(TIK_TIK_AUTH_URL || `${SITE_URL}/contribute/tik-tik-auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(20000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok && !data.error) data.error = "Something went wrong. Try again.";
  return data;
}

async function _status() {
  const session = await _session();
  if (!session?.token) return { loggedIn: false, access: false };
  return _post({
    action: "status",
    token: session.token,
    deviceId: await _deviceId(),
    applicantId: await _applicantId(),
  });
}

export async function requireTikTikAccess() {
  const st = await _status();
  if (st.kicked) {
    await _clearSession();
    _unlocked = false;
    if (_onRevoke) _onRevoke("");
    _render();
    return { ok: false, message: "" };
  }
  if (!st.loggedIn) {
    _unlocked = false;
    return { ok: false, message: "" };
  }
  if (!st.access) {
    _unlocked = false;
    return { ok: false, message: "" };
  }
  _unlocked = true;
  return { ok: true, message: "" };
}

function _body() {
  return document.querySelector(idSel(ID.authBody));
}

function _setMsg(text, bad) {
  const el = document.querySelector(idSel(ID.authBody) + " [data-auth-msg]");
  if (!el) return;
  el.textContent = text || "";
  el.style.color = bad ? "#9a3412" : "#334155";
}

function _esc(s) {
  return String(s || "").replace(/[&<>"]/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
  }[c]));
}

function _planStillOn(st) {
  if (!st?.plan) return false;
  if (st.plan === "applicant") return !!st.applicantId;
  if (!st.planEnds) return false;
  return new Date(st.planEnds).getTime() > Date.now();
}

function _planLine(st) {
  if (!st?.plan) return "";
  if (st.plan === "trial") return "₹1 · 3-day trial";
  if (st.plan === "month") return "₹2999 · 30 days";
  if (st.plan === "applicant") return `₹300 · applicant ${st.applicantId || ""}`;
  return st.plan;
}

function _planRank(plan) {
  if (plan === "trial") return 1;
  if (plan === "applicant") return 2;
  if (plan === "month") return 3;
  return 0;
}

function _canUpgrade(st) {
  if (!_planStillOn(st)) return false;
  return _planRank(st.plan) < _planRank("month");
}

function _html(inner) {
  const body = _body();
  if (!body) return;
  body.innerHTML = inner;
}

function _wire(selector, event, fn) {
  const el = document.querySelector(selector);
  if (el) vs.on(el, event, fn);
}

async function _showLogin(message) {
  _unlocked = false;
  _html(`
    <div class="${CLS.authCard}">
      <button type="button" id="${ID.authBody}-close" class="${CLS.authClose}">Close</button>
      <div class="${CLS.authSteps}">
        <div class="${CLS.authStep} ${CLS.authStepOn}"><span>1</span> Enter Email</div>
        <div class="${CLS.authStep}"><span>2</span> Enter OTP</div>
      </div>
      <div class="${CLS.authTitle}">Enter Email</div>
      <div class="${CLS.aiHint}" style="margin:0 0 4px">We will send a 4-digit OTP to your email.</div>
      <input id="${ID.authBody}-email" type="email" placeholder="Email" autocomplete="off" />
      <button type="button" id="${ID.authBody}-send" class="${CLS.authBtn}">Send OTP</button>
      <div class="${CLS.authSecure}">Your data is secure and encrypted.</div>
      <div data-auth-msg class="${CLS.aiHint}" style="margin-top:8px"></div>
    </div>
  `);
  _wireClose();
  const input = document.querySelector(idSel(`${ID.authBody}-email`));
  if (input && _pendingEmail) input.value = _pendingEmail;
  _setMsg(message || "", !!message);
  _wire(idSel(`${ID.authBody}-send`), "click", async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    const email = String(input?.value || "").trim();
    if (!email || !email.includes("@")) {
      _setMsg("Enter a valid email.", true);
      return;
    }
    _pendingEmail = email;
    _setMsg("Sending OTP…", false);
    const data = await _post({ action: "send", email, deviceId: await _deviceId() });
    if (!data.success && !data.sent) {
      _setMsg(data.error || "Could not send the OTP.", true);
      return;
    }
    await _savePendingOtp(email);
    _showCode(email, "");
  });
  if (input) {
    vs.on(input, "pointerdown", (e) => e.stopPropagation());
    vs.on(input, "keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        document.querySelector(idSel(`${ID.authBody}-send`))?.click();
      }
    });
  }
  const sendBtn = document.querySelector(idSel(`${ID.authBody}-send`));
  if (sendBtn) vs.on(sendBtn, "pointerdown", (e) => e.stopPropagation());
  if (_after) _after();
}

function _showCode(email, message) {
  // Already on OTP for this email — keep the boxes they may be typing.
  const row = document.querySelector(idSel(`${ID.authBody}-otpRow`));
  if (row && _awaitingOtp && _pendingEmail === email) {
    if (message) _setMsg(message, false);
    return;
  }
  _html(`
    <div class="${CLS.authCard}">
      <button type="button" id="${ID.authBody}-close" class="${CLS.authClose}">Close</button>
      <div class="${CLS.authSteps}">
        <div class="${CLS.authStep}"><span>1</span> Enter Email</div>
        <div class="${CLS.authStep} ${CLS.authStepOn}"><span>2</span> Enter OTP</div>
      </div>
      <div class="${CLS.authEmailBox}">
        <span>${_esc(email)}</span>
        <button type="button" id="${ID.authBody}-back">Change</button>
      </div>
      <div class="${CLS.authTitle}">Enter OTP</div>
      <div class="${CLS.aiHint}" style="margin:0">We've sent a 4-digit code to your email.</div>
      <div id="${ID.authBody}-otpRow" class="${CLS.authOtpRow}">
        <input id="${ID.authBody}-d0" class="${CLS.authOtpBox}" inputmode="numeric" maxlength="1" autocomplete="one-time-code" />
        <input id="${ID.authBody}-d1" class="${CLS.authOtpBox}" inputmode="numeric" maxlength="1" />
        <input id="${ID.authBody}-d2" class="${CLS.authOtpBox}" inputmode="numeric" maxlength="1" />
        <input id="${ID.authBody}-d3" class="${CLS.authOtpBox}" inputmode="numeric" maxlength="1" />
      </div>
      <button type="button" id="${ID.authBody}-go" class="${CLS.authBtn}">Verify OTP</button>
      <div class="${CLS.authLinks}">
        <button type="button" id="${ID.authBody}-resend" class="${CLS.authLink}">Resend OTP</button>
        <button type="button" id="${ID.authBody}-back2" class="${CLS.authLink}">Change email</button>
      </div>
      <div class="${CLS.authSecure}">Your data is secure and encrypted.</div>
      <div data-auth-msg class="${CLS.aiHint}" style="margin-top:8px"></div>
    </div>
  `);
  _wireClose();
  _setMsg(message || "", false);

  const dig = (i) => document.querySelector(idSel(`${ID.authBody}-d${i}`));
  const readCode = () => [0, 1, 2, 3].map((i) => String(dig(i)?.value || "").replace(/\D/g, "")).join("");
  const clearCode = () => {
    for (let i = 0; i < 4; i++) {
      const el = dig(i);
      if (el) el.value = "";
    }
    dig(0)?.focus();
  };
  const fillCode = (raw) => {
    const digits = String(raw || "").replace(/\D/g, "").slice(0, 4).split("");
    for (let i = 0; i < 4; i++) {
      const el = dig(i);
      if (el) el.value = digits[i] || "";
    }
    const next = Math.min(digits.length, 3);
    dig(digits.length >= 4 ? 3 : next)?.focus();
  };
  const goBack = async () => {
    await _clearPendingOtp();
    _showLogin("");
  };

  for (let i = 0; i < 4; i++) {
    const el = dig(i);
    if (!el) continue;
    vs.on(el, "pointerdown", (e) => e.stopPropagation());
    vs.on(el, "input", () => {
      const v = String(el.value || "").replace(/\D/g, "");
      if (v.length > 1) {
        fillCode(v);
        if (readCode().length === 4) document.querySelector(idSel(`${ID.authBody}-go`))?.click();
        return;
      }
      el.value = v.slice(0, 1);
      if (v && i < 3) dig(i + 1)?.focus();
      if (readCode().length === 4) document.querySelector(idSel(`${ID.authBody}-go`))?.click();
    });
    vs.on(el, "keydown", (e) => {
      if (e.key === "Backspace" && !el.value && i > 0) {
        dig(i - 1)?.focus();
        return;
      }
      if (e.key === "ArrowLeft" && i > 0) {
        e.preventDefault();
        dig(i - 1)?.focus();
      }
      if (e.key === "ArrowRight" && i < 3) {
        e.preventDefault();
        dig(i + 1)?.focus();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        document.querySelector(idSel(`${ID.authBody}-go`))?.click();
      }
    });
    vs.on(el, "paste", (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData)?.getData("text") || "";
      fillCode(text);
      if (readCode().length === 4) document.querySelector(idSel(`${ID.authBody}-go`))?.click();
    });
  }
  dig(0)?.focus();

  _wire(idSel(`${ID.authBody}-back`), "click", (e) => {
    e?.stopPropagation?.();
    goBack();
  });
  _wire(idSel(`${ID.authBody}-back2`), "click", (e) => {
    e?.stopPropagation?.();
    goBack();
  });
  _wire(idSel(`${ID.authBody}-resend`), "click", async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    const btn = document.querySelector(idSel(`${ID.authBody}-resend`));
    if (btn) btn.disabled = true;
    _setMsg("Sending a new OTP…", false);
    const data = await _post({ action: "send", email, deviceId: await _deviceId() });
    if (btn) btn.disabled = false;
    if (!data.success && !data.sent) {
      _setMsg(data.error || "Could not resend. Try again.", true);
      return;
    }
    await _savePendingOtp(email);
    clearCode();
    _setMsg("New OTP sent. Check your email.", false);
  });
  _wire(idSel(`${ID.authBody}-go`), "click", async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    const code = readCode();
    if (!/^\d{4}$/.test(code)) {
      _setMsg("Enter all 4 digits.", true);
      return;
    }
    _setMsg("Verifying OTP…", false);
    const data = await _post({
      action: "verify",
      email,
      code,
      deviceId: await _deviceId(),
      applicantId: await _applicantId(),
    });
    if (!data.token) {
      _setMsg(data.error || "Wrong OTP. Try again or Resend.", true);
      clearCode();
      return;
    }
    await _saveSession(data.token, data.email || email);
    await _clearPendingOtp();
    _setMsg("OTP correct. Logged in.", false);
    _apply(data);
  });
  for (const id of [`${ID.authBody}-go`, `${ID.authBody}-back`, `${ID.authBody}-back2`, `${ID.authBody}-resend`]) {
    const el = document.querySelector(idSel(id));
    if (el) vs.on(el, "pointerdown", (e) => e.stopPropagation());
  }
}

function _showPlans(st, opts = {}) {
  const upgrading = !!opts.upgrade && _planStillOn(st);
  _unlocked = upgrading ? !!st.access : false;
  const trialUsed = !!st?.trialUsed;
  const cur = upgrading ? String(st.plan || "") : "";
  const curRank = _planRank(cur);
  const title = upgrading ? "Upgrade plan" : "Pick your plan";
  const goLabel = upgrading ? "Upgrade" : "Continue";
  const defaultPlan = "month";

  const trialDisabled = trialUsed || (upgrading && curRank >= _planRank("trial"));
  const trialIsCurrent = upgrading && cur === "trial";
  const applicantDisabled = upgrading && curRank >= _planRank("applicant");
  const applicantIsCurrent = upgrading && cur === "applicant";
  const monthIsCurrent = upgrading && cur === "month";

  const trialDesc = trialIsCurrent
    ? "Current plan"
    : trialUsed
      ? "Already used on this email"
      : upgrading
        ? "Not available while upgrading"
        : "3 days · once per email";
  const applicantDesc = applicantIsCurrent
    ? "Current plan"
    : upgrading && applicantDisabled
      ? "Same or lower than current"
      : "Lock to one applicant ID";
  const monthDesc = monthIsCurrent
    ? "Current plan"
    : "30 days · full access";

  _html(`
    <div class="${CLS.authCard}">
      <button type="button" id="${ID.authBody}-close" class="${CLS.authClose}">Close</button>
      <div class="${CLS.authBrand}">Tik Tik</div>
      <div class="${CLS.authTitle}">${title}</div>
      <div class="${CLS.authEmailChip}">${_esc(st.email || "")}</div>
      ${upgrading ? `<div class="${CLS.aiHint}" style="margin:0 0 10px">Current: ${_esc(_planLine(st))}</div>` : ""}
      <div class="${CLS.authPlanList}" role="radiogroup" aria-label="Plans">
        <button type="button" data-plan="trial" role="radio" class="${CLS.authPlanRow}${trialDisabled || trialIsCurrent ? ` ${CLS.authPlanOff}` : ""}" ${trialDisabled || trialIsCurrent ? "disabled" : ""} aria-checked="false">
          <span class="${CLS.authPlanRadio}" aria-hidden="true"></span>
          <span class="${CLS.authPlanMeta}">
            <span class="${CLS.authPlanName}">Trial</span>
            <span class="${CLS.authPlanDesc}">${trialDesc}</span>
          </span>
          <span class="${CLS.authPlanPrice}">₹1</span>
        </button>
        <button type="button" data-plan="month" role="radio" class="${CLS.authPlanRow}${monthIsCurrent ? ` ${CLS.authPlanOff}` : ""}" ${monthIsCurrent ? "disabled" : ""} aria-checked="false">
          <span class="${CLS.authPlanRadio}" aria-hidden="true"></span>
          <span class="${CLS.authPlanMeta}">
            <span class="${CLS.authPlanName}">Monthly</span>
            <span class="${CLS.authPlanDesc}">${monthDesc}</span>
          </span>
          <span class="${CLS.authPlanPrice}">₹2999</span>
        </button>
        <button type="button" data-plan="applicant" role="radio" class="${CLS.authPlanRow}${applicantDisabled || applicantIsCurrent ? ` ${CLS.authPlanOff}` : ""}" ${applicantDisabled || applicantIsCurrent ? "disabled" : ""} aria-checked="false">
          <span class="${CLS.authPlanRadio}" aria-hidden="true"></span>
          <span class="${CLS.authPlanMeta}">
            <span class="${CLS.authPlanName}">One applicant</span>
            <span class="${CLS.authPlanDesc}">${applicantDesc}</span>
          </span>
          <span class="${CLS.authPlanPrice}">₹300</span>
        </button>
      </div>
      <button type="button" id="${ID.authBody}-go" class="${CLS.authBtn}">${goLabel}</button>
      <div class="${CLS.authLinks}">
        ${upgrading ? `<button type="button" id="${ID.authBody}-back" class="${CLS.authLink}">Back</button>` : ""}
        <button type="button" id="${ID.authBody}-out" class="${CLS.authLink}" style="color:#64748b">Logout</button>
      </div>
      <div class="${CLS.authSecure}">${upgrading ? "Upgrade keeps you on this laptop" : "Secure payment · one laptop only"}</div>
      <div data-auth-msg class="${CLS.aiHint}" style="margin-top:8px"></div>
    </div>
  `);
  let selected = defaultPlan;
  if (monthIsCurrent) selected = "";
  const rows = () =>
    Array.from(document.querySelectorAll(`${idSel(ID.authBody)} [data-plan]`));
  const paint = () => {
    rows().forEach((row) => {
      const on = !!selected && row.getAttribute("data-plan") === selected && !row.disabled;
      row.classList.toggle(CLS.authPlanOn, on);
      row.setAttribute("aria-checked", on ? "true" : "false");
    });
  };
  paint();
  if (!upgrading && trialUsed) _setMsg("The ₹1 trial was already used on this email.", false);
  if (!upgrading && st?.reason && st.plan) _setMsg(st.reason, false);
  if (upgrading) _setMsg("Select a higher plan, then tap Upgrade.", false);
  _wireClose();
  _wire(idSel(`${ID.authBody}-out`), "click", () => _logout());
  _wire(idSel(`${ID.authBody}-back`), "click", () => _showBar(st));
  rows().forEach((row) => {
    vs.on(row, "click", () => {
      if (row.disabled) return;
      selected = row.getAttribute("data-plan");
      paint();
      _setMsg("", false);
    });
  });
  _wire(idSel(`${ID.authBody}-go`), "click", async () => {
    if (!selected) {
      _setMsg(upgrading ? "Select a higher plan." : "Select a plan.", true);
      return;
    }
    if (selected === "trial" && trialUsed) {
      _setMsg("The ₹1 trial was already used on this email.", true);
      return;
    }
    if (upgrading && _planRank(selected) <= curRank) {
      _setMsg("Pick a higher plan to upgrade.", true);
      return;
    }
    const go = document.querySelector(idSel(`${ID.authBody}-go`));
    if (go) go.disabled = true;
    _setMsg(upgrading ? "Upgrading…" : "Starting…", false);
    const session = await _session();
    const data = await _post({
      action: "choose",
      token: session?.token,
      deviceId: await _deviceId(),
      applicantId: await _applicantId(),
      plan: selected,
    });
    if (go) go.disabled = false;
    if (data.error) {
      _setMsg(data.error, true);
      return;
    }
    _apply(data);
  });
  for (const id of [`${ID.authBody}-go`, `${ID.authBody}-out`, `${ID.authBody}-back`]) {
    const el = document.querySelector(idSel(id));
    if (el) vs.on(el, "pointerdown", (e) => e.stopPropagation());
  }
  rows().forEach((row) => {
    vs.on(row, "pointerdown", (e) => e.stopPropagation());
  });
  if (_after) _after();
}

function _showBar(st) {
  _unlocked = !!st.access;
  const until = st.planEnds ? ` until ${String(st.planEnds).slice(0, 10)}` : "";
  const upgrade = _canUpgrade(st) || !!st.canUpgrade;
  _html(`
    <div class="${CLS.authCard}" style="padding:12px 14px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
        <div style="min-width:0">
          <div class="${CLS.aiHead}" style="font-size:14px;margin:0">${_esc(st.email || "")}</div>
          <div class="${CLS.aiHint}" style="margin:2px 0 0">${_esc(_planLine(st))}${_esc(until)}</div>
        </div>
        <button type="button" id="${ID.authBody}-out" class="${CLS.authLink}" style="color:#64748b;flex-shrink:0">Logout</button>
      </div>
      ${upgrade ? `
        <button type="button" id="${ID.authBody}-upgrade" class="${CLS.authBtn}" style="margin-top:12px;padding:11px 14px;font-size:14px">Upgrade plan</button>
      ` : ""}
      <div data-auth-msg class="${CLS.aiHint}" style="margin-top:8px"></div>
    </div>
  `);
  if (!st.access && st.reason) _setMsg(st.reason, true);
  _wire(idSel(`${ID.authBody}-out`), "click", () => _logout());
  _wire(idSel(`${ID.authBody}-upgrade`), "click", () => _showPlans(st, { upgrade: true }));
  for (const id of [`${ID.authBody}-out`, `${ID.authBody}-upgrade`]) {
    const el = document.querySelector(idSel(id));
    if (el) vs.on(el, "pointerdown", (e) => e.stopPropagation());
  }
  _startPoll();
  if (_after) _after();
}

function _apply(st) {
  if (st?.kicked) {
    _clearSession();
    _unlocked = false;
    _stopPoll();
    if (_onRevoke) _onRevoke("");
    _clearPendingOtp().then(() => _showLogin("This email was logged in on another laptop."));
    return;
  }
  if (!st?.loggedIn) {
    _unlocked = false;
    _stopPoll();
    // Keep OTP screen if they already asked for a code (e.g. checked email and came back).
    if (_awaitingOtp && _pendingEmail) {
      _showCode(_pendingEmail, "Enter the OTP from your email.");
      return;
    }
    _loadPendingOtp().then((pending) => {
      if (pending?.email) _showCode(pending.email, "Enter the OTP from your email.");
      else _showLogin("");
    });
    return;
  }
  _clearPendingOtp();
  if (_planStillOn(st)) _showBar(st);
  else _showPlans(st);
}

async function _logout() {
  const session = await _session();
  try {
    await _post({
      action: "logout",
      token: session?.token,
      deviceId: await _deviceId(),
    });
  } catch { /* still clear locally */ }
  await _clearSession();
  await _clearPendingOtp();
  _unlocked = false;
  _stopPoll();
  if (_onRevoke) _onRevoke("");
  _showLogin("");
}

function _stopPoll() {
  if (_poll) {
    vs.clear(_poll);
    _poll = null;
  }
}

function _startPoll() {
  _stopPoll();
  const beat = async () => {
    _poll = null;
    const st = await _status().catch(() => null);
    if (!st) {
      _poll = vs.setTimeout(beat, 15000);
      return;
    }
    if (st.kicked || !st.loggedIn) {
      _apply(st);
      return;
    }
    if (!st.access && _unlocked) {
      _unlocked = false;
      if (_onRevoke) _onRevoke(st.reason || "This plan has ended.");
      _showPlans(st);
      return;
    }
    _poll = vs.setTimeout(beat, 15000);
  };
  _poll = vs.setTimeout(beat, 15000);
}

async function _render() {
  if (!_body()) return;
  const session = await _session();
  if (!session?.token) {
    _unlocked = false;
    const pending = await _loadPendingOtp();
    if (pending?.email) {
      _showCode(pending.email, "Enter the OTP from your email.");
      return;
    }
    _showLogin("");
    return;
  }
  const st = await _status();
  _apply(st);
}

export function bindTikTikAuth() {
  _render();
}

export function refreshTikTikAuth() {
  return _render();
}

export function requestCloseTikTikPanel() {
  const panel = document.querySelector(idSel(ID.aiPanel));
  if (panel) panel.classList.add(CLS.hidden);
}

function _wireClose() {
  const el = document.querySelector(idSel(`${ID.authBody}-close`));
  if (!el) return;
  vs.on(el, "pointerdown", (e) => e.stopPropagation());
  vs.on(el, "click", (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    requestCloseTikTikPanel();
  });
}
