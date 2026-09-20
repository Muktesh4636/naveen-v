// ---------------------------------------------------------------------------
// MAIN-world helper: intercept jQuery Ajax and relay events via postMessage.
// `prefix` is a per-page-load random token generated in the content script.
// ---------------------------------------------------------------------------
function redirectResponse(prefix) {
  // Helpers to read/write non-enumerable properties so they are invisible to
  // Object.keys(window) / for-in / JSON.stringify.
  const _get = (k) => (Object.getOwnPropertyDescriptor(window, k) || {}).value;
  const _set = (k, v) =>
    Object.defineProperty(window, k, { value: v, enumerable: false, configurable: true, writable: true });

  const K_HOOKED = prefix + 'h';
  const K_GEN    = prefix + 'g';
  const K_UNHOOK = prefix + 'u';

  if (_get(K_HOOKED) && !_get(K_UNHOOK)) return;
  _get(K_UNHOOK)?.();

  const generation = (_get(K_GEN) || 0) + 1;
  _set(K_GEN, generation);

  let attempts = 0;
  const install = () => {
    if (_get(K_GEN) !== generation) return;
    const $ = window.jQuery || window.$;
    if (!$) {
      if (++attempts < 80) setTimeout(install, 50);
      return;
    }

    const onSend = (event, xhr, settings) => {
      window.postMessage({ action: prefix + 'q', url: settings.url });
    };
    const onSuccess = (event, xhr, settings) => {
      let response;
      try { response = JSON.parse(xhr.responseText); }
      catch (e) { return; }
      window.postMessage({
        action:   prefix + 'r',
        status:   xhr.status,
        url:      settings.url,
        request:  settings.data,
        response: response,
      });
    };
    const onError = (event, xhr, settings) => {
      window.postMessage({
        action:      prefix + 'r',
        status:      xhr.status,
        retryAfter:  xhr.getResponseHeader("Retry-After"),
        cgiBlock:    /Access limitation/.test(xhr.responseText || ""),
      });
    };

    $(document)
      .on("ajaxSend",    onSend)
      .on("ajaxSuccess", onSuccess)
      .on("ajaxError",   onError);

    _set(K_UNHOOK, () => {
      $(document)
        .off("ajaxSend",    onSend)
        .off("ajaxSuccess", onSuccess)
        .off("ajaxError",   onError);
      _set(K_UNHOOK, null);
    });
    _set(K_HOOKED, true);
  };
  install();
}

// ---------------------------------------------------------------------------
// MAIN-world helper: suppress the 429 "Server" response header so the site
// does not show a block page. The XHR patch is made undetectable by:
//   1. Overriding .toString on the wrapper so it returns native-code text.
//   2. Patching Function.prototype.toString to return native-code text when
//      called with our wrapper as `this` (defeats Function.prototype.toString
//      .call(wrapped) bypasses).
//   3. Storing all state in non-enumerable window properties.
// ---------------------------------------------------------------------------
function suppressBlockPage(prefix) {
  const _get = (k) => (Object.getOwnPropertyDescriptor(window, k) || {}).value;
  const _set = (k, v) =>
    Object.defineProperty(window, k, { value: v, enumerable: false, configurable: true, writable: true });

  const K_UNPATCH = prefix + 'p';
  _get(K_UNPATCH)?.();

  const origGetHeader = XMLHttpRequest.prototype.getResponseHeader;

  // Wrap in a same-name function so .name matches the native.
  const wrapped = function getResponseHeader(name) {
    if (this.status !== 429 || String(name).toLowerCase() !== 'server') {
      return origGetHeader.apply(this, arguments);
    }
    return null;
  };

  // ------------------------------------------------------------------
  // Spoof toString at two levels so neither direct nor indirect calls
  // reveal that the method has been replaced.
  // ------------------------------------------------------------------
  const nativeStr = Function.prototype.toString.call(origGetHeader);

  // Level 1: wrapped.toString() → native-code string
  Object.defineProperty(wrapped, 'toString', {
    value: () => nativeStr,
    enumerable: false,
    configurable: true,
  });

  // Level 2: Function.prototype.toString.call(wrapped) → native-code string
  // We patch Function.prototype.toString itself, guarded by a WeakSet so
  // it only intercepts our specific wrapper function.
  const _FPTS_KEY = prefix + 'ts';
  const spoofed = _get(_FPTS_KEY) || new WeakMap();
  _set(_FPTS_KEY, spoofed);
  spoofed.set(wrapped, nativeStr);

  const origFnToStr = Function.prototype.toString;
  if (!spoofed.has(origFnToStr)) {
    // First call — patch Function.prototype.toString
    const patchedFnToStr = function toString() {
      if (spoofed.has(this)) return spoofed.get(this);
      return origFnToStr.call(this);
    };
    // Make the patch itself look native
    spoofed.set(patchedFnToStr, Function.prototype.toString.call(origFnToStr));
    Object.defineProperty(Function.prototype, 'toString', {
      value: patchedFnToStr,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }

  // Mirror the original property descriptor exactly so getOwnPropertyDescriptor
  // returns the same shape as the native — only .value differs, and our
  // toString spoof above makes even that undetectable.
  const origDesc = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, 'getResponseHeader')
    || { enumerable: false, configurable: true, writable: true };
  Object.defineProperty(XMLHttpRequest.prototype, 'getResponseHeader', {
    ...origDesc,
    value: wrapped,
  });

  _set(K_UNPATCH, () => {
    Object.defineProperty(XMLHttpRequest.prototype, 'getResponseHeader', {
      ...origDesc,
      value: origGetHeader,
    });
    _set(K_UNPATCH, null);
  });
}

// ---------------------------------------------------------------------------
// MAIN-world helper: read window.ofcAppointments and relay it.
// ---------------------------------------------------------------------------
function readOfcAppointments(prefix) {
  // Brief poll only — schedule pages expose this quickly or not at all.
  let attempts = 0;
  const maxAttempts = 4;
  const read = () => {
    const data = window.ofcAppointments;
    if (Array.isArray(data) && data.length) {
      window.postMessage({ action: prefix + 'o', data });
      return;
    }
    if (++attempts < maxAttempts) {
      setTimeout(read, 100);
      return;
    }
    window.postMessage({ action: prefix + 'o', data: data || null });
  };
  read();
}

// ---------------------------------------------------------------------------
// MAIN-world helper: trigger date-picker selection.
// (No extension-branded state needed here.)
// ---------------------------------------------------------------------------
function selectFirstDate(dateStr, maxMs, pollMs, navigateOnly) {
  if (!dateStr) return;
  const [year, month, day] = dateStr.slice(0, 10).split("-").map(Number);
  if (!year || !month || !day) return;

  const deadline = Date.now() + Math.max(500, Math.min(Number(maxMs) || 8000, 15000));
  const tickMs = Math.max(20, Math.min(Number(pollMs) || 50, 200));
  const uiMonth = month - 1;
  const formatted =
    String(month).padStart(2, "0") + "/" + String(day).padStart(2, "0") + "/" + year;
  const monthOnly = !!navigateOnly;

  /** Navigate calendar month without booking (no onSelect / no time load). */
  const navigateMonthOnly = ($) => {
    const picker = $("#datepicker");
    if (!picker.length) return false;
    if (!picker.hasClass("hasDatepicker")) {
      try { picker.datepicker(); } catch (e) {}
    }
    if (!picker.hasClass("hasDatepicker")) return false;
    const target = new Date(year, uiMonth, day);
    try {
      try { picker.datepicker("hide"); } catch (e) {}
      picker.datepicker("option", "defaultDate", target);
      picker.datepicker("setDate", target);
      // Clear selection highlight so portal does not treat this as a booked pick.
      const root = picker[0];
      if (root) {
        root.querySelectorAll("td.ui-datepicker-current-day").forEach((td) => {
          td.classList.remove("ui-datepicker-current-day");
        });
        root.querySelectorAll('a.ui-state-active[aria-current="true"]').forEach((a) => {
          a.classList.remove("ui-state-active");
          a.setAttribute("aria-current", "false");
        });
      }
      const div = document.getElementById("ui-datepicker-div");
      if (div) {
        div.querySelectorAll("td.ui-datepicker-current-day").forEach((td) => {
          td.classList.remove("ui-datepicker-current-day");
        });
        div.querySelectorAll('a.ui-state-active[aria-current="true"]').forEach((a) => {
          a.classList.remove("ui-state-active");
          a.setAttribute("aria-current", "false");
        });
      }
    } catch (e) {
      return false;
    }
    return true;
  };

  /** Fast path: set date via API / input — do NOT open the calendar popup. */
  const setDateDirect = ($) => {
    if (monthOnly) return navigateMonthOnly($);

    const picker = $("#datepicker");
    if (!picker.length) return false;

    if (!picker.hasClass("hasDatepicker")) {
      try { picker.datepicker(); } catch (e) {}
    }
    if (!picker.hasClass("hasDatepicker")) return false;

    const target = new Date(year, uiMonth, day);
    try {
      try { picker.datepicker("hide"); } catch (e) {}
      picker.datepicker("option", "defaultDate", target);
      picker.datepicker("setDate", target);
      picker.val(formatted);

      const el = picker[0];
      try {
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
      } catch (e) {}
      try { picker.trigger("input").trigger("change"); } catch (e) {}

      // Some portal builds only load times from onSelect — call it if present.
      try {
        const inst = picker.data("datepicker");
        if (inst) {
          const settings = inst.settings || {};
          const onSelect = settings.onSelect;
          if (typeof onSelect === "function") {
            const dateFormat = settings.dateFormat || "mm/dd/yy";
            const dateText = $.datepicker.formatDate(dateFormat, target, settings);
            onSelect.call(el, dateText, inst);
          }
        }
      } catch (e) {}
  } catch (e) {
      return false;
    }

    try {
      const selected = picker.datepicker("getDate");
      if (
        selected &&
        selected.getFullYear() === year &&
        selected.getMonth() === uiMonth &&
        selected.getDate() === day
      ) {
        return true;
      }
    } catch (e) {}

    const v = String(picker.val() || "");
    if (v === formatted) return true;
    if (v.includes(String(year)) && v.includes(String(day).padStart(2, "0"))) return true;
    return false;
  };

  /** Slow fallback: open calendar and click the day cell (only if direct set failed). */
  const clickDateInWidget = ($) => {
    const picker = $("#datepicker");
    if (!picker.length) return false;

    if (!picker.hasClass("hasDatepicker")) {
      try { picker.datepicker(); } catch (e) {}
    }
    if (!picker.hasClass("hasDatepicker")) return false;

    const target = new Date(year, uiMonth, day);
    try {
      picker.datepicker("setDate", target);
      picker.datepicker("option", "defaultDate", target);
      try { picker.datepicker("show"); } catch (e) {}
  } catch (e) {
      return false;
    }

    const div =
      $("#ui-datepicker-div:visible").length ? $("#ui-datepicker-div") :
      picker.find(".ui-datepicker").length ? picker.find(".ui-datepicker") :
      $("#ui-datepicker-div");

    const panels = [];
    if (div && div.length) {
      if (div.is(".ui-datepicker")) panels.push(div);
      else div.find(".ui-datepicker").each(function () { panels.push($(this)); });
      if (!panels.length) panels.push(div);
    }
    $("#datepicker .ui-datepicker").each(function () {
      const $p = $(this);
      if (!panels.some((x) => x[0] === $p[0])) panels.push($p);
    });

    let clicked = false;
    const tryPanel = ($panel) => {
      $panel.find("td[data-handler='selectDay']").each(function () {
        const td = this;
        const m = parseInt(td.getAttribute("data-month"), 10);
        const y = parseInt(td.getAttribute("data-year"), 10);
        if (m !== uiMonth || y !== year) return;
        const a = td.querySelector("a");
        if (!a || parseInt(a.textContent, 10) !== day) return;
        if (
          td.classList.contains("ui-datepicker-unselectable") ||
          td.classList.contains("ui-state-disabled")
        ) return;
        $(a).trigger("click");
        clicked = true;
        return false;
      });
    };

    for (const $panel of panels) {
      if (clicked) break;
      tryPanel($panel);
    }
    if (clicked) return true;

    for (const $panel of panels) {
      if (clicked) break;
      $panel.find("td:not(.ui-datepicker-unselectable):not(.ui-state-disabled) a.ui-state-default").each(function () {
        if (parseInt(this.textContent, 10) !== day) return;
        $(this).trigger("click");
        clicked = true;
        return false;
      });
    }
    if (clicked) return true;

    const current = div.find(".ui-datepicker-current-day a.ui-state-default");
    if (current.length && !current.closest("td").hasClass("ui-datepicker-unselectable")) {
      current.trigger("click");
      return true;
    }

    return clicked;
  };

  const trySelect = () => {
    const $ = window.jQuery || window.$;
    if (!$) {
      if (Date.now() < deadline) setTimeout(trySelect, tickMs);
      return;
    }
    try {
      if (setDateDirect($)) return;
      // Never click a day cell for navigate-only — that would book/load times.
      if (!monthOnly && clickDateInWidget($)) return;
    } catch (e) {}
    if (Date.now() < deadline) setTimeout(trySelect, tickMs);
  };

  trySelect();
}

function _timeMatchTokens(timeStr) {
  const tokens = new Set();
  const raw = String(timeStr || "").trim();
  if (!raw) return tokens;
  tokens.add(raw);
  const iso = raw.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);
  const clock = iso ? iso[1] : raw;
  const m = clock.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?/i);
  if (!m) return tokens;
  let h = parseInt(m[1], 10);
  const min = m[2];
  const ampm = m[4] ? m[4].toUpperCase() : null;
  if (ampm === "PM" && h < 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  const h12 = h % 12 || 12;
  const ampmOut = h >= 12 ? "PM" : "AM";
  for (const hr of [String(h), String(h).padStart(2, "0"), String(h12), String(h12).padStart(2, "0")]) {
    tokens.add(`${hr}:${min}`);
    tokens.add(`${hr}:${min} ${ampmOut}`);
    tokens.add(`${hr}:${min}${ampmOut}`);
  }
  return tokens;
}

function _rowHasNoAvailability(row) {
  const text = row?.textContent || "";
  if (/\bavailability\b[^0-9]*\b0\b/i.test(text)) return true;
  if (/\b(?:no slots|full|unavailable)\b/i.test(text) && !/\bavailability\b[^0-9]*[1-9]/i.test(text)) {
    return true;
  }
  return false;
}

function _rowMatchesSchedule(row, timeStr, dateStr) {
  const text = (row.textContent || "").replace(/\s+/g, " ");
  let timeHit = false;
  for (const token of _timeMatchTokens(timeStr)) {
    if (token && text.includes(token)) {
      timeHit = true;
      break;
    }
  }
  if (!timeHit) return false;
  if (dateStr) {
    const day = dateStr.slice(8, 10).replace(/^0/, "");
    if (text.includes(dateStr) || text.includes(day)) return true;
  }
  return true;
}

function _fireValueEvents(el) {
  if (!el) return;
  try {
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  } catch (e) {}
  const $ = window.jQuery || window.$;
  if ($) {
    try { $(el).trigger("input").trigger("change"); } catch (e) {}
  }
}

function _clickTheater(el) {
  if (!el) return;
  const $ = window.jQuery || window.$;
  try {
    el.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window }));
    el.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, cancelable: true, view: window }));
    el.click();
  } catch (e) {}
  if ($) {
    try { $(el).trigger("mousedown").trigger("mouseup").trigger("click"); } catch (e) {}
  }
}

/** Fast path: set select/radio value without click theater; click only if needed. */
function _activateTimeInput(el) {
  if (!el) return false;
  const $ = window.jQuery || window.$;

  if (el.tagName === "SELECT") {
    if (!el.value || el.value === "0") return false;
    _fireValueEvents(el);
    if (el.value && el.value !== "0") return true;
    _clickTheater(el);
    return !!(el.value && el.value !== "0");
  }

  if (el.type === "radio" || el.type === "checkbox") {
    if (el.name) {
      for (const r of document.getElementsByName(el.name)) {
        if (r !== el) r.checked = false;
      }
    }
    el.checked = true;
    if ($) {
      try { $(el).prop("checked", true); } catch (e) {}
    }
    _fireValueEvents(el);
    if (el.checked) return true;

    // Fallback: some portal handlers only listen to click on label/row.
    const label = el.id ? document.querySelector(`label[for="${CSS.escape(el.id)}"]`) : null;
    const row = el.closest?.("tr");
    _clickTheater(label);
    _clickTheater(el.closest?.("label"));
    _clickTheater(el);
    _clickTheater(row);
    el.checked = true;
    if ($) {
      try { $(el).prop("checked", true).trigger("click").trigger("change"); } catch (e) {}
    }
    return el.checked === true;
  }

  _clickTheater(el);
  return false;
}

function _collectTimeInputs() {
  const selectors = [
    '#schedule-entries table input[type="radio"]:not([disabled])',
    '#schedule-entries table input[type="checkbox"]:not([disabled])',
    'table input[type="radio"]:not([disabled])',
    'table input[type="checkbox"]:not([disabled])',
    '#appointments input[type="radio"]:not([disabled])',
    'input[name*="ScheduleEntry"]:not([disabled])',
    'input[name*="scheduleEntry"]:not([disabled])',
    'input[name*="TimeSlot"]:not([disabled])',
  ];
  const seen = new Set();
  const out = [];
  for (const sel of selectors) {
    for (const el of document.querySelectorAll(sel)) {
      if (seen.has(el)) continue;
      seen.add(el);
      out.push(el);
    }
  }
  return out;
}

function _collectAvailableSlotInputs() {
  const available = [];
  for (const input of _collectTimeInputs()) {
    if (input.closest("#ui-datepicker-div, .ui-datepicker, #post_select")) continue;
    const row = input.closest("tr");
    if (row && _rowHasNoAvailability(row)) continue;
    available.push(input);
  }
  return available;
}

function _resolveSlotIndex(count, slotIndex) {
  const n = Math.max(0, Number(count) || 0);
  if (n <= 0) return 0;
  const want = Number.isFinite(Number(slotIndex)) ? Number(slotIndex) : 0;
  return Math.min(Math.max(0, want), n - 1);
}

function _tryPickTimeSelect(timeStr, slotIndex) {
  const selects = document.querySelectorAll(
    '#time_select, select[name*="time" i], select[id*="time" i]'
  );
  for (const sel of selects) {
    if (sel.tagName !== "SELECT" || sel.disabled) continue;
    const opts = [...sel.options].filter(
      (opt) => !opt.disabled && opt.value && opt.value !== "0" && /\d{1,2}:\d{2}/.test(opt.textContent || "")
    );
    if (!opts.length) continue;

    let pick = null;
    // Prefer exact time match across all options (direct set), then slot index.
    if (timeStr && timeStr !== "00:00") {
      const tokens = _timeMatchTokens(timeStr);
      for (const opt of opts) {
        const text = opt.textContent || "";
        for (const token of tokens) {
          if (token && text.includes(token)) {
            pick = opt;
            break;
          }
        }
        if (pick) break;
      }
    }
    if (!pick) {
      const idx = _resolveSlotIndex(opts.length, slotIndex);
      pick = opts[idx] || opts[opts.length - 1];
    }
    if (!pick) continue;

    sel.value = pick.value;
    if (_activateTimeInput(sel)) return true;
  }
  return false;
}

function _tryPickTimeSlot(timeStr, dateStr, slotIndex) {
  const pickByIndex = !timeStr || timeStr === "00:00";

  if (_tryPickTimeSelect(timeStr, slotIndex)) return true;

  const available = _collectAvailableSlotInputs();
  if (available.length) {
    const idx = _resolveSlotIndex(available.length, slotIndex);
    if (_activateTimeInput(available[idx])) return true;
  }

  if (pickByIndex) return false;

  const rowMatches = (row) => _rowMatchesSchedule(row, timeStr, dateStr);
  const inputs = _collectTimeInputs();
  for (const input of inputs) {
    const row = input.closest("tr");
    if (!row || !rowMatches(row)) continue;
    if (_rowHasNoAvailability(row)) continue;
    if (_activateTimeInput(input)) return true;
  }

  const rows = document.querySelectorAll("#schedule-entries table tbody tr, #page_form table tbody tr, table tbody tr");
  const matched = [];
  for (const row of rows) {
    if (!rowMatches(row)) continue;
    if (_rowHasNoAvailability(row)) continue;
    matched.push(row);
  }
  if (matched.length) {
    const idx = _resolveSlotIndex(matched.length, slotIndex);
    const row = matched[idx];
    const btn = row.querySelector('input[type="radio"], input[type="checkbox"], button, a, label');
    if (_activateTimeInput(btn || row)) return true;
  }

  return false;
}

function _isTimeSlotPicked() {
  if (_collectTimeInputs().some((el) => el.checked)) return true;
  const selects = document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]');
  for (const sel of selects) {
    if (sel.tagName === "SELECT" && sel.value && sel.value !== "0") return true;
  }
  return false;
}

function forcePickTimeSlot(slotIndex, maxMs, pollMs) {
  const deadline = Date.now() + Math.max(1000, Math.min(Number(maxMs) || 15000, 20000));
  const tickMs = Math.max(10, Math.min(Number(pollMs) || 25, 100));
  const want = Number.isFinite(Number(slotIndex)) ? Number(slotIndex) : 0;

  const gatherRadios = () => {
    const out = [];
    const seen = new Set();
    const add = (input) => {
      if (!input || seen.has(input) || input.disabled) return;
      if (input.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar")) return;
      const row = input.closest("tr");
      if (row && /\bavailability\b[^0-9]*\b0\b/i.test(row.textContent || "")) return;
      seen.add(input);
      out.push(input);
    };
    for (const sel of [
      "#page_form table tbody input[type=\"radio\"]",
      "#schedule-entries table tbody input[type=\"radio\"]",
      "#page_form table input[type=\"radio\"]",
      "table tbody input[type=\"radio\"]",
    ]) {
      for (const input of document.querySelectorAll(`${sel}:not([disabled])`)) add(input);
    }
    return out;
  };

  const pick = () => {
    // Prefer <select> direct set, then radio direct set (no click theater first).
    if (_tryPickTimeSelect(null, want)) return true;
    const radios = gatherRadios();
    if (!radios.length) return false;
    const idx = Math.min(Math.max(0, want), radios.length - 1);
    return _activateTimeInput(radios[idx]);
  };

  const loop = () => {
    if (pick()) return;
    if (Date.now() < deadline) setTimeout(loop, tickMs);
  };
  loop();
}

function selectFirstTimeSlot(timeStr, dateStr, domWaitMs, maxMs, slotIndex, pollMs) {
  const idx = Number.isFinite(Number(slotIndex)) ? Number(slotIndex) : 0;
  const started = Date.now();
  const deadline = started + Math.max(1500, Math.min(Number(maxMs) || 6000, 12000));
  const initialWait = Math.max(0, Math.min(Number(domWaitMs) || 0, 3000));
  const tickMs = Math.max(10, Math.min(Number(pollMs) || 25, 200));
  const wantTime = timeStr && timeStr !== "00:00" ? timeStr : "00:00";

  const tick = () => {
    const elapsed = Date.now() - started;
    // Direct set: <select>.value or radio.checked + change (click only if needed).
    if (elapsed >= initialWait && _tryPickTimeSlot(wantTime, dateStr, idx)) return;
    if (Date.now() < deadline) setTimeout(tick, tickMs);
  };
  tick();
}

function selectConsularPost(postId) {
  if (!postId) return false;
  const el = document.querySelector("#post_select");
  if (!el) return false;
  const id = String(postId);
  if (String(el.value) === id) return false;
  const option = [...el.options].find((o) => String(o.value) === id);
  if (!option) return false;
  el.value = option.value;
  const $ = window.jQuery || window.$;
  if ($) {
    try {
      $(el).val(option.value).trigger("change");
      return true;
    } catch (e) {}
  }
  el.dispatchEvent(new Event("change", { bubbles: true }));
  el.dispatchEvent(new Event("input", { bubbles: true }));
  return true;
}

function softReloadHomeTab(home) {
  if (!home?.id || !home.url) {
    try { chrome.tabs.reload(home.id).catch(() => {}); } catch (e) {}
    return;
  }
  try {
    const u = new URL(home.url);
    // GET navigation — avoids Chrome "Confirm Form Resubmission" on POST Home pages.
    u.searchParams.set("_vsr", String(Date.now() % 1e12));
    chrome.tabs.update(home.id, { url: u.origin + u.pathname + u.search + u.hash }).catch(() => {
      chrome.tabs.reload(home.id).catch(() => {});
    });
  } catch (e) {
    chrome.tabs.reload(home.id).catch(() => {});
  }
}

function interceptNativeDialogs(prefix) {
  const origAlert = window.alert;
  const origConfirm = window.confirm;
  const relay = (msg) => {
    try {
      window.postMessage({ action: prefix + "e", text: String(msg || "") }, "*");
    } catch (e) {}
  };
  const isPse = (msg) => /PSE0501|unable to load appointment available days/i.test(String(msg || ""));
  // Chrome/Firefox "Confirm Form Resubmission" — treat Continue as yes, then soft-refresh.
  const isFormResubmit = (msg) =>
    /form resubmission|information that you entered|action that you took to be repeated|returning to that page might cause/i.test(
      String(msg || "")
    );
  window.alert = function (msg) {
    relay(msg);
    if (isPse(msg)) return; // auto-dismiss — do not block the page
    return origAlert.apply(this, arguments);
  };
  window.confirm = function (msg) {
    relay(msg);
    if (isPse(msg)) return true;
    if (isFormResubmit(msg)) {
      try {
        sessionStorage.setItem("vsResubmitContinue", "1");
      } catch (e) {}
      return true; // Continue
    }
    return origConfirm.apply(this, arguments);
  };
}

function clickSubmitButton(prefix) {
  const notifySubmit = (p) => {
    if (!p) return;
    try {
      window.postMessage({ action: p + "s" }, "*");
    } catch (e) {}
  };

  if (/\/(interview|confirmation|appointment-confirmation)/i.test(location.pathname)) {
    return false;
  }
  const candidates = [
    document.querySelector("#submitbtn"),
    document.querySelector('button#submitbtn'),
    document.querySelector('input#submitbtn'),
    document.querySelector('button[type="submit"]'),
    document.querySelector('input[type="submit"]'),
    ...[...document.querySelectorAll("button, input[type=submit]")].filter((b) =>
      /submit/i.test(b.textContent || b.value || "")
    ),
  ].filter(Boolean);

  for (const btn of candidates) {
    if (btn.disabled) continue;
    const label = (btn.value || btn.textContent || "").toLowerCase();
    if (btn.id === "submitbtn" || /\bsubmit\b/.test(label)) {
      let fired = false;
      // Fast path: portal's own submit (same tokens/validation as a user click).
      try {
        const form = btn.form || btn.closest?.("form");
        if (form && typeof form.requestSubmit === "function") {
          form.requestSubmit(btn);
          fired = true;
        }
      } catch (e) {}
      if (!fired) {
        try {
          btn.click();
          fired = true;
        } catch (e) {}
      }
      // Fallback: mouse theater if direct path threw.
      if (!fired) {
        try {
          btn.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window }));
          btn.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, cancelable: true, view: window }));
          btn.click();
        } catch (e) {}
        const $ = window.jQuery || window.$;
        if ($) {
          try { $(btn).trigger("mousedown").trigger("mouseup").trigger("click"); } catch (e) {}
        }
      }
      notifySubmit(prefix);
      return true;
    }
  }
  return false;
}

function forceClickSubmit(prefix, maxMs, pollMs) {
  const deadline = Date.now() + Math.max(500, Math.min(Number(maxMs) || 6000, 15000));
  const tickMs = Math.max(10, Math.min(Number(pollMs) || 25, 100));

  const loop = () => {
    if (clickSubmitButton(prefix)) return;
    if (Date.now() < deadline) setTimeout(loop, tickMs);
  };
  loop();
}

/** Poll every pollMs; pick 1st slot; Submit within submitWaitMs after time picked. */
function bookTimeAndSubmitFast(timeStr, dateStr, selectMaxMs, submitWaitMs, domWaitMs, prefix, slotIndex, pollMs) {
  if (!timeStr) return;
  const started = Date.now();
  const initialWait = Math.max(0, Math.min(Number(domWaitMs) || 0, 500));
  const selectDeadline = started + initialWait + Math.max(500, Math.min(Number(selectMaxMs) || 3500, 8000));
  const waitMs = Math.max(0, Math.min(Number(submitWaitMs) || 0, 120));
  const maxMs = 10_000;
  const tickMs = Math.max(10, Math.min(Number(pollMs) || 25, 200));
  const idx = Number.isFinite(Number(slotIndex)) ? Number(slotIndex) : 0;

  const notifySubmit = (p) => {
    if (!p) return;
    try {
      window.postMessage({ action: p + "s" }, "*");
    } catch (e) {}
  };

  const clickSubmit = () => {
    if (/\/(interview|confirmation|appointment-confirmation)/i.test(location.pathname)) {
      return false;
    }
    const candidates = [
      document.querySelector("#submitbtn"),
      document.querySelector('button#submitbtn'),
      document.querySelector('input#submitbtn'),
      document.querySelector('button[type="submit"]'),
      document.querySelector('input[type="submit"]'),
    ].filter(Boolean);

    for (const btn of candidates) {
      if (btn.disabled) continue;
      const label = (btn.value || btn.textContent || "").toLowerCase();
      if (btn.id === "submitbtn" || /\bsubmit\b/.test(label)) {
        let fired = false;
        try {
          const form = btn.form || btn.closest?.("form");
          if (form && typeof form.requestSubmit === "function") {
            form.requestSubmit(btn);
            fired = true;
          }
        } catch (e) {}
        if (!fired) {
          try { btn.click(); fired = true; } catch (e) {}
        }
        if (!fired) {
          const $ = window.jQuery || window.$;
          if ($) {
            try { $(btn).trigger("click"); } catch (e) {}
          }
        }
        notifySubmit(prefix);
        return true;
      }
    }
    return false;
  };

  const trySetDate = () => {
    if (!dateStr) return false;
    const [year, month, day] = dateStr.slice(0, 10).split("-").map(Number);
    if (!year || !month || !day) return false;
    const $ = window.jQuery || window.$;
    if (!$) return false;
  try {
    const picker = $("#datepicker");
      if (!picker.length || !picker.hasClass("hasDatepicker")) return false;
    picker.datepicker("setDate", new Date(year, month - 1, day));
      const cell = $(".ui-datepicker-current-day");
      if (
        cell.length &&
        !cell.hasClass("ui-datepicker-unselectable") &&
        !cell.hasClass("ui-state-disabled") &&
        cell.find("a").length
      ) {
        cell.find("a").trigger("click");
        return true;
      }
    } catch (e) {}
    return false;
  };

  const tryPickTime = () => _tryPickTimeSlot(timeStr, dateStr, idx);

  let pickedAt = 0;

  const tick = () => {
    const now = Date.now();
    if (now - started >= initialWait && now <= selectDeadline) {
      trySetDate();
      if (tryPickTime()) pickedAt = pickedAt || now;
    } else if (now > selectDeadline) {
      if (tryPickTime()) pickedAt = pickedAt || now;
    }

    if (pickedAt && now - pickedAt >= waitMs) {
      // Only succeed-and-stop when Submit was enabled and clicked.
      if (clickSubmit()) return;
    }
    if (now - started >= maxMs) {
      clickSubmit(); // last attempt — still skips disabled inside clickSubmit
      return;
    }
    setTimeout(tick, tickMs);
  };

  tick();
}

// ---------------------------------------------------------------------------
// Permission & dynamic content-script helpers (run in extension context)
// ---------------------------------------------------------------------------
function runInTab(tabId, func, args = []) {
  return chrome.scripting.executeScript({
    target: { tabId },
    func,
    args,
    world: "MAIN",
  }).catch(() => {});
}

function requestPermission() {
  chrome.permissions
    .request({ origins: ["https://atlasauth.b2clogin.com/*"] })
    .then((granted) => { if (granted) registerContentScript(); })
    .catch(() => {});
}

function registerContentScript() {
  return chrome.scripting
    .getRegisteredContentScripts({ ids: ["questions"] })
    .then((scripts) => {
      if (scripts.length === 0) {
        return chrome.scripting.registerContentScripts([{
          id:      "questions",
          js:      ["scripts/questions.js"],
            matches: ["https://atlasauth.b2clogin.com/*"],
        }]);
      }
    });
}

function unregisterContentScript() {
  return chrome.scripting.unregisterContentScripts({ ids: ["questions"] });
}

// ---------------------------------------------------------------------------
// webRequest listeners (extension context)
// ---------------------------------------------------------------------------
chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    if (details.statusCode === 429 || details.statusCode === 403) {
      const retryHeader = details.responseHeaders.find(
        (h) => h.name.toLowerCase() === "retry-after"
      );
      if (retryHeader) {
        chrome.storage.local.set({ cfRetryAfter: retryHeader.value });
      }
    }
  },
  { urls: ["*://*.usvisascheduling.com/*"], types: ["main_frame"] },
  ["responseHeaders"]
);

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const idToken = details.requestBody?.formData?.id_token?.[0];
    if (idToken) {
      chrome.storage.local.set({ cgiIdToken: { value: idToken, capturedAt: Date.now() } });
    }
  },
  {
    urls: ["https://www.usvisascheduling.com/signin-aad-b2c_1"],
    types: ["main_frame", "sub_frame"],
  },
  ["requestBody"]
);

// ---------------------------------------------------------------------------
// Cloudflare Turnstile: real mouse click at viewport coordinates (reaches iframe)
// ---------------------------------------------------------------------------
var _cfDbgLastClick = new Map();
var _cfDbgBusy = new Map();
var DEBUGGER_PROTO = "1.3";
var HUMAN_CLICK_API = "https://the.gopg.online/contribute/human-click";
var _bundledHumanProfile = null;
var _bundledHumanProfilePromise = null;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function _jitter(n, pct) {
  const a = Number(n) || 0;
  const p = pct == null ? 0.12 : pct;
  return a * (1 + (Math.random() * 2 - 1) * p);
}

async function debuggerMouseMove(tabId, x, y) {
  return;
  await chrome.debugger.sendCommand({ tabId }, "Input.dispatchMouseEvent", {
    type: "mouseMoved",
    x,
    y,
    button: "none",
    buttons: 0,
    pointerType: "mouse",
  });
}

async function debuggerClickPoint(tabId, x, y, attached, timing) {
  return false;
  const target = { tabId };
  let ownAttach = false;
  const hoverMs = Math.max(60, Math.min(900, Number(timing?.hoverMs) || 220));
  const pressMs = Math.max(40, Math.min(280, Number(timing?.pressMs) || 85));
  try {
    if (!attached) {
      await chrome.debugger.attach(target, DEBUGGER_PROTO);
      ownAttach = true;
    }
    await debuggerMouseMove(tabId, x, y);
    await sleep(hoverMs);
    await chrome.debugger.sendCommand(target, "Input.dispatchMouseEvent", {
      type: "mousePressed",
      x,
      y,
      button: "left",
      buttons: 1,
      clickCount: 1,
      pointerType: "mouse",
    });
    await sleep(pressMs);
    await chrome.debugger.sendCommand(target, "Input.dispatchMouseEvent", {
      type: "mouseReleased",
      x,
      y,
      button: "left",
      buttons: 0,
      clickCount: 1,
      pointerType: "mouse",
    });
    return true;
  } catch {
    return false;
  } finally {
    if (ownAttach) {
      try {
        await chrome.debugger.detach(target);
      } catch (e) {}
    }
  }
}

var _bundledHumanProfile = null;
var _bundledHumanProfilePromise = null;
var _serverHumanProfile = null;
var _serverHumanProfileAt = 0;
var SERVER_HUMAN_TTL_MS = 5 * 60_000;

async function fetchBundledHumanProfile() {
  if (_bundledHumanProfile) return _bundledHumanProfile;
  if (_bundledHumanProfilePromise) return _bundledHumanProfilePromise;
  _bundledHumanProfilePromise = (async () => {
    try {
      const url = chrome.runtime.getURL("human-train/bundled-profile.json");
      const res = await fetch(url);
      if (!res.ok) return null;
      const data = await res.json();
      if (!data?.samples?.length) return null;
      _bundledHumanProfile = data;
      return data;
    } catch {
      return null;
    } finally {
      _bundledHumanProfilePromise = null;
    }
  })();
  return _bundledHumanProfilePromise;
}

/** Pull recorded verify-human clicks from server for human-like auto-click. */
async function fetchServerHumanProfile(force = false) {
  if (!force && _serverHumanProfile?.samples?.length && Date.now() - _serverHumanProfileAt < SERVER_HUMAN_TTL_MS) {
    return _serverHumanProfile;
  }
  try {
    const res = await fetch(`${HUMAN_CLICK_API || HUMAN_CLICK_URL}?limit=40`, {
      method: "GET",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return _serverHumanProfile;
    const data = await res.json();
    if (!data?.success || !Array.isArray(data.samples) || !data.samples.length) {
      return _serverHumanProfile;
    }
    _serverHumanProfile = {
      samples: data.samples,
      avgHoverMs: data.avgHoverMs || 220,
      avgPressMs: data.avgPressMs || 90,
      liveTrained: true,
      source: "server-library",
      updatedAt: Date.now(),
    };
    _serverHumanProfileAt = Date.now();
    try {
      await chrome.storage.local.set({ humanClickServerProfile: _serverHumanProfile });
    } catch {}
    return _serverHumanProfile;
  } catch {
    try {
      const { humanClickServerProfile } = await chrome.storage.local.get("humanClickServerProfile");
      if (humanClickServerProfile?.samples?.length) {
        _serverHumanProfile = humanClickServerProfile;
        return humanClickServerProfile;
      }
    } catch {}
    return _serverHumanProfile;
  }
}

function _sampleScore(s) {
  const pathN = Array.isArray(s?.path) ? s.path.length : 0;
  const press = Number(s?.pressMs) || 0;
  // Prefer real mouse paths; demote blur junk (500ms press, empty path).
  let score = pathN * 10;
  if (pathN >= 3) score += 50;
  if (press > 0 && press < 400) score += 10;
  if (!pathN && press >= 480) score -= 100;
  return score;
}

/** Prefer path-rich server samples over empty local blur saves. */
function _profileBestScore(profile) {
  const samples = profile?.samples || [];
  let best = -999;
  for (const s of samples) best = Math.max(best, _sampleScore(s));
  return best;
}

/** Prefer recorded server paths; fall back to live local, then bundled. */
async function resolveHumanClickProfile() {
  try {
    const { humanClickProfile } = await chrome.storage.local.get("humanClickProfile");
    const server = await fetchServerHumanProfile();
    const localScore = _profileBestScore(humanClickProfile);
    const serverScore = _profileBestScore(server);
    if (serverScore > 0 && serverScore >= localScore) return server;
    const storedN = humanClickProfile?.samples?.length || 0;
    if (humanClickProfile?.liveTrained && storedN >= 1 && localScore > 0) return humanClickProfile;
    if (storedN >= 1 && humanClickProfile?.source === "visa-page-live" && localScore > 0) {
      return humanClickProfile;
    }
    if (server?.samples?.length) return server;

    const bundled = await fetchBundledHumanProfile();
    const bundledN = bundled?.samples?.length || 0;
    if (bundledN && bundledN >= storedN) return bundled;
    if (storedN > 0) return humanClickProfile;
    return bundled || server;
  } catch {
    return (await fetchServerHumanProfile()) || fetchBundledHumanProfile();
  }
}

async function seedHumanClickProfileFromBundle() {
  try {
    // Always refresh server library in the background for human-like clicks.
    fetchServerHumanProfile(true).catch(() => {});

    const bundled = await fetchBundledHumanProfile();
    const bundledN = bundled?.samples?.length || 0;
    const { humanClickProfile } = await chrome.storage.local.get("humanClickProfile");
    if (!bundledN) {
      if (
        humanClickProfile &&
        (!humanClickProfile.liveTrained || !(humanClickProfile.samples?.length > 0))
      ) {
        await chrome.storage.local.remove("humanClickProfile");
      } else if (humanClickProfile?.seededFromBundle && !humanClickProfile.liveTrained) {
        await chrome.storage.local.remove("humanClickProfile");
      }
      return;
    }
    const storedN = humanClickProfile?.samples?.length || 0;
    if (storedN >= bundledN) return;
    await chrome.storage.local.set({
      humanClickProfile: {
        ...bundled,
        seededFromBundle: true,
        updatedAt: Date.now(),
      },
    });
  } catch {
    /* ignore */
  }
}

async function loadHumanClickTiming() {
  try {
    const humanClickProfile = await resolveHumanClickProfile();
    if (!humanClickProfile) {
      return { hoverMs: 280, pressMs: 85, path: null, approachMs: 420 };
    }
    const samples = (humanClickProfile.samples || []).slice();
    samples.sort((a, b) => _sampleScore(b) - _sampleScore(a));
    const pool = samples.filter((s) => _sampleScore(s) > 0);
    const pickFrom = pool.length ? pool.slice(0, Math.min(12, pool.length)) : samples;
    const sample = pickFrom.length
      ? pickFrom[Math.floor(Math.random() * pickFrom.length)]
      : null;
    const hoverRaw = sample?.hoverMs || humanClickProfile.avgHoverMs || 280;
    const pressRaw = sample?.pressMs || humanClickProfile.avgPressMs || 85;
    const approachRaw = sample?.approachMs || hoverRaw || 420;
    return {
      // Keep real human ranges — light jitter only.
      hoverMs: Math.round(_jitter(Math.min(900, Math.max(60, hoverRaw)), 0.12)),
      pressMs: Math.round(_jitter(Math.min(280, Math.max(40, pressRaw > 400 ? 95 : pressRaw)), 0.12)),
      approachMs: Math.round(_jitter(Math.min(1600, Math.max(120, approachRaw)), 0.1)),
      path: sample?.path?.length ? sample.path : null,
    };
  } catch {
    return { hoverMs: 280, pressMs: 85, path: null, approachMs: 420 };
  }
}

function _pathUsableForTurnstile(path) {
  if (!path?.length) return false;
  const tail = path.slice(-12);
  return tail.every((p) => {
    const nx = Math.abs(Number(p.nx) || 0);
    const ny = Math.abs(Number(p.ny) || 0);
    return nx <= 3.5 && ny <= 3.5;
  });
}

async function debuggerHumanApproach(tabId, tx, ty, path, approachMs) {
  let sx = tx + _jitter(-55, 0.35);
  let sy = ty + _jitter(35, 0.35);

  // Prefer recorded absolute x/y trail (replay relative to click target).
  const absPath = (path || []).filter(
    (p) => p && Number.isFinite(Number(p.x)) && Number.isFinite(Number(p.y))
  );
  if (absPath.length >= 3) {
    const last = absPath[absPath.length - 1];
    const first = absPath[0];
    const span = Math.hypot(Number(first.x) - Number(last.x), Number(first.y) - Number(last.y));
    // Huge recorded trails miss the checkbox — use a short approach instead.
    if (span < 220) {
    const tail = absPath.slice(-Math.min(20, absPath.length));
    const last = tail[tail.length - 1];
    const lx = Number(last.x);
    const ly = Number(last.y);
    const t0 = Number(tail[0].t) || 0;
    const t1 = Number(tail[tail.length - 1].t) || t0;
    const recorded = Math.max(1, t1 - t0);
    const budget = Math.max(140, Math.min(1400, Number(approachMs) || recorded));
    for (let i = 0; i < tail.length; i++) {
      const p = tail[i];
      const x = tx + (Number(p.x) - lx);
      const y = ty + (Number(p.y) - ly);
      await debuggerMouseMove(tabId, x, y);
      const nextT = tail[i + 1] ? Number(tail[i + 1].t) || 0 : Number(p.t) || 0;
      const rawDt = nextT - (Number(p.t) || 0);
      const scaled = rawDt > 0 ? (rawDt / recorded) * budget : budget / tail.length;
      await sleep(Math.min(80, Math.max(6, scaled)));
    }
    await debuggerMouseMove(tabId, tx, ty);
    return;
    }
  }

  if (_pathUsableForTurnstile(path)) {
    const scale = 28 + Math.random() * 10;
    const tail = path.slice(-Math.min(16, path.length));
    const first = tail[0];
    sx = tx + (Number(first.nx) || 0) * scale;
    sy = ty + (Number(first.ny) || 0) * scale;
    const t0 = Number(tail[0].t) || 0;
    const t1 = Number(tail[tail.length - 1].t) || t0;
    const recorded = Math.max(1, t1 - t0);
    const budget = Math.max(120, Math.min(1200, Number(approachMs) || recorded));
    for (let i = 0; i < tail.length; i++) {
      const p = tail[i];
      const x = tx + (Number(p.nx) || 0) * scale;
      const y = ty + (Number(p.ny) || 0) * scale;
      await debuggerMouseMove(tabId, x, y);
      const nextT = tail[i + 1] ? Number(tail[i + 1].t) || 0 : Number(p.t) || 0;
      const rawDt = nextT - (Number(p.t) || 0);
      const scaled = rawDt > 0 ? (rawDt / recorded) * budget : budget / tail.length;
      await sleep(Math.min(70, Math.max(6, scaled)));
    }
    await debuggerMouseMove(tabId, tx, ty);
    return;
  }
  const steps = 7 + Math.floor(Math.random() * 5);
  const budget = Math.max(160, Math.min(900, Number(approachMs) || 420));
  for (let i = 1; i <= steps; i++) {
    const u = i / steps;
    const ease = u * u * (3 - 2 * u);
    await debuggerMouseMove(tabId, sx + (tx - sx) * ease, sy + (ty - sy) * ease);
    await sleep(budget / steps);
  }
  await debuggerMouseMove(tabId, tx, ty);
}

function viewportClickPoints(points) {
  if (!Array.isArray(points)) return;
  for (const pt of points.slice(0, 8)) {
    if (!pt || typeof pt.x !== "number" || typeof pt.y !== "number") continue;
    const x = pt.x;
    const y = pt.y;
    const el = document.elementFromPoint(x, y);
    if (!el) continue;
    const opts = { bubbles: true, cancelable: true, clientX: x, clientY: y, view: window };
    for (const type of ["pointerover", "pointerenter", "pointerdown", "mousedown", "mouseup", "pointerup", "click"]) {
      try {
        el.dispatchEvent(new MouseEvent(type, opts));
      } catch (e) {}
    }
  }
}

async function _swLog(tag, msg, data) {
  try {
    const entry = {
      at: Date.now(),
      t: new Date().toISOString().slice(11, 19),
      tag,
      msg: String(msg || "").slice(0, 400),
    };
    if (data != null) entry.data = data;
    const { vsDebugLogs } = await chrome.storage.local.get("vsDebugLogs");
    const list = Array.isArray(vsDebugLogs) ? vsDebugLogs.slice() : [];
    list.push(entry);
    while (list.length > 200) list.shift();
    await chrome.storage.local.set({ vsDebugLogs: list });
  } catch {}
}

async function debuggerClickTurnstile(tabId, points, primaryOnly) {
  return false;
  if (_cfDbgBusy.get(tabId)) return false;
  const last = _cfDbgLastClick.get(tabId) || 0;
  if (Date.now() - last < 700) return false;
  _cfDbgBusy.set(tabId, true);
  _cfDbgLastClick.set(tabId, Date.now());
  const target = { tabId };
  let attached = false;
  try {
    await chrome.tabs.update(tabId, { active: true }).catch(() => {});
    await sleep(180);
    try {
      await chrome.debugger.detach(target);
    } catch {}
    await chrome.debugger.attach(target, DEBUGGER_PROTO);
    attached = true;
    try {
      await chrome.debugger.sendCommand(target, "Page.bringToFront");
    } catch {}
    await sleep(80);
    const human = await loadHumanClickTiming();
    await _swLog("cf", "debugger click start", {
      tabId,
      points: (points || []).length,
      hoverMs: human.hoverMs,
      pressMs: human.pressMs,
      path: human.path?.length || 0,
    });
    const timing = {
      hoverMs: human.hoverMs || 220,
      pressMs: human.pressMs || 85,
    };
    const list = (points || []).filter(
      (pt) => pt && typeof pt.x === "number" && typeof pt.y === "number"
    );
    const tryList = primaryOnly ? list.slice(0, 1) : list.slice(0, 4);
    for (const pt of tryList) {
      const jx = pt.x + (Math.random() * 4 - 2);
      const jy = pt.y + (Math.random() * 4 - 2);
      await debuggerHumanApproach(tabId, jx, jy, human.path, human.approachMs);
      await debuggerClickPoint(tabId, jx, jy, true, timing);
      await sleep(160 + Math.random() * 120);
    }
    await _swLog("cf", `debugger click done (${tryList.length} points)`);
    return tryList.length > 0;
  } catch (e) {
    await _swLog("cf", `debugger click FAIL: ${e?.message || e}`);
    return false;
  } finally {
    if (attached) {
      try {
        await chrome.debugger.detach(target);
      } catch (e) {}
    }
    _cfDbgBusy.delete(tabId);
  }
}

// ---------------------------------------------------------------------------
// Telegram Bot API — slot alerts when dates are found.
// ---------------------------------------------------------------------------
const _tgDedup = new Map();
const TG_DEDUP_MS = 45_000;

async function sendTelegramMessage(token, chatId, text) {
  const url = `https://api.telegram.org/bot${encodeURIComponent(token)}/sendMessage`;
  const body = new URLSearchParams({
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: "true",
  });
  const resp = await fetch(url, { method: "POST", body, signal: AbortSignal.timeout(8000) });
  const data = await resp.json().catch(() => ({}));
  return !!data.ok;
}

function dataUrlToBlob(dataUrl) {
  const [header, b64] = String(dataUrl).split(",");
  const mime = header.match(/:(.*?);/)?.[1] || "image/jpeg";
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

async function sendTelegramPhoto(token, chatId, blob, caption) {
  const form = new FormData();
  form.append("chat_id", chatId);
  form.append("photo", blob, "visa-screenshot.jpg");
  if (caption) {
    form.append("caption", caption.slice(0, 1024));
    form.append("parse_mode", "HTML");
  }
  const url = `https://api.telegram.org/bot${encodeURIComponent(token)}/sendPhoto`;
  const resp = await fetch(url, { method: "POST", body, signal: AbortSignal.timeout(15000) });
  const data = await resp.json().catch(() => ({}));
  return !!data.ok;
}

async function captureTabScreenshot(tabId) {
  try {
    const tab = await chrome.tabs.get(tabId);
    // Do not steal focus. captureVisibleTab only works on the tab already showing.
    if (!tab?.active) return null;
    await sleep(Math.max(120, Number(tab.status === "complete" ? 180 : 350)));
    return await chrome.tabs.captureVisibleTab(tab.windowId, {
      format: "jpeg",
      quality: 82,
    });
  } catch (e) {
    return null;
  }
}

async function handleTelegramScreenshot(message, tabId) {
  const token = String(message.token || "").trim();
  const chatIds = (message.chatIds || []).filter(Boolean);
  const caption = String(message.caption || "");
  const waitMs = Math.max(0, Math.min(Number(message.waitMs) || 0, 8000));
  if (!token || !chatIds.length || !tabId) return;

  if (waitMs) await sleep(waitMs);

  const dataUrl = await captureTabScreenshot(tabId);
  if (!dataUrl) return;

  const blob = dataUrlToBlob(dataUrl);
  for (const chatId of chatIds) {
    try {
      await sendTelegramPhoto(token, chatId, blob, caption);
    } catch (e) {}
  }
}

const TELEGRAM_RELAY_URL = "https://the.gopg.online/contribute/telegram";
const HUMAN_CLICK_URL = "https://the.gopg.online/contribute/human-click";
const TELEGRAM_ADB_URL = "http://127.0.0.1:9333/send";

async function handleTelegramAdbRelay(message, tabId) {
  const caption = String(message.caption || message.text || "");
  const waitMs = Math.max(0, Math.min(Number(message.waitMs) || 0, 8000));
  if (waitMs) await sleep(waitMs);

  let image_base64 = null;
  if (message.captureScreenshot && tabId) {
    const dataUrl = await captureTabScreenshot(tabId);
    if (dataUrl) {
      image_base64 = dataUrl.split(",")[1] || null;
    }
  }

  if (!caption && !image_base64) return;

  try {
    await fetch(TELEGRAM_ADB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        caption,
        text: caption,
        kind: message.kind || "screen",
        dedup_key: message.dedupKey || "",
        skip_dedup: !!message.skipDedup,
        image_base64,
      }),
      signal: AbortSignal.timeout(60_000),
    });
  } catch (e) {}
}

async function handleTelegramServerRelay(message, tabId) {
  const caption = String(message.caption || message.text || "");
  const waitMs = Math.max(0, Math.min(Number(message.waitMs) || 0, 8000));
  if (waitMs) await sleep(waitMs);

  let image_base64 = null;
  if (message.captureScreenshot && tabId) {
    const dataUrl = await captureTabScreenshot(tabId);
    if (dataUrl) {
      image_base64 = dataUrl.split(",")[1] || null;
    }
  }

  if (!caption && !image_base64) return;

  try {
    await fetch(TELEGRAM_RELAY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        caption,
        text: caption,
        kind: message.kind || "screen",
        dedup_key: message.dedupKey || "",
        skip_dedup: !!message.skipDedup,
        notify_muktesh: message.notifyMuktesh !== false,
        image_base64,
      }),
      signal: AbortSignal.timeout(20000),
    });
  } catch (e) {}
}

async function handleTelegramNotify(message) {
  const token = String(message.token || "").trim();
  const chatIds = (message.chatIds || []).filter(Boolean);
  const text = String(message.text || "");
  if (!token || !chatIds.length || !text) return;

  if (!message.skipDedup) {
    const dedupKey = text.slice(0, 120);
    const now = Date.now();
    const last = _tgDedup.get(dedupKey);
    if (last && now - last < TG_DEDUP_MS) return;
    _tgDedup.set(dedupKey, now);
  }

  for (const chatId of chatIds) {
    try {
      await sendTelegramMessage(token, chatId, text);
    } catch (e) {}
  }
}

// ---------------------------------------------------------------------------
// IST slot windows — defaults; overridden by safe remote JSON (no remote code).
// ---------------------------------------------------------------------------
let SLOT_WINDOWS = [
  { fromMin: 0, toMin: 2 },
  { fromMin: 14, toMin: 21 },
  { fromMin: 24, toMin: 31 },
  { fromMin: 54, toMin: 59 },
];

const REMOTE_RUNTIME_CONFIG_URL = "https://the.gopg.online/extension-runtime-config.json";
let _remoteCfgFetchedAt = 0;

function _clampSw(n, min, max, fallback) {
  const v = Number(n);
  if (!Number.isFinite(v)) return fallback;
  return Math.min(max, Math.max(min, Math.round(v)));
}

function _applyRemoteSlotWindows(raw) {
  if (!Array.isArray(raw) || !raw.length || raw.length > 24) return false;
  const next = [];
  for (const w of raw) {
    const fromMin = _clampSw(w?.fromMin, 0, 59, NaN);
    const toMin = _clampSw(w?.toMin, 0, 59, NaN);
    if (!Number.isFinite(fromMin) || !Number.isFinite(toMin) || fromMin > toMin) return false;
    next.push({ fromMin, toMin });
  }
  SLOT_WINDOWS = next;
  return true;
}

async function refreshRemoteRuntimeConfig(force = false) {
  const now = Date.now();
  if (!force && now - _remoteCfgFetchedAt < 5 * 60 * 1000) return;
  try {
    const res = await fetch(REMOTE_RUNTIME_CONFIG_URL, {
      method: "GET",
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    if (!data || typeof data !== "object" || data.script || data.code || data.eval) {
      throw new Error("unsafe");
    }
    _applyRemoteSlotWindows(data.slotWindows);
    try {
      await chrome.storage.local.set({
        vsRuntimeConfig: { config: data, fetchedAt: Date.now() },
      });
    } catch {}
    _remoteCfgFetchedAt = Date.now();
  } catch {
    _remoteCfgFetchedAt = Date.now();
  }
}

refreshRemoteRuntimeConfig(true);
setInterval(() => refreshRemoteRuntimeConfig(false), 5 * 60 * 1000);

function isInSlotWindow(date = new Date()) {
  let minute;
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).formatToParts(date);
    minute = Number(parts.find((p) => p.type === "minute")?.value || 0);
  } catch {
    minute = date.getMinutes();
  }
  for (const w of SLOT_WINDOWS) {
    if (minute >= w.fromMin && minute <= w.toMin) return true;
  }
  return false;
}

function _walkDom(node, hits) {
  if (!node || hits.length > 8) return;
  const text = String(node.nodeValue || "");
  if (/verify you are human/i.test(text) && node.parentId) hits.push(node.parentId);
  const attrs = node.attributes || [];
  for (let i = 0; i < attrs.length - 1; i += 2) {
    const key = String(attrs[i] || "").toLowerCase();
    const val = String(attrs[i + 1] || "");
    if (/verify you are human|cf-turnstile|turnstile/i.test(val) || key === "data-sitekey") {
      hits.push(node.nodeId);
    }
  }
  for (const child of node.children || []) _walkDom(child, hits);
  for (const root of node.shadowRoots || []) _walkDom(root, hits);
  if (node.contentDocument) _walkDom(node.contentDocument, hits);
}

/** Find the checkbox even inside closed shadow / Cloudflare iframe, then click it. */
async function findAndClickVerify(tabId) {
  return false;
  if (!tabId || _cfDbgBusy.get(tabId)) return false;
  const target = { tabId };
  let attached = false;
  try {
    try { await chrome.debugger.detach(target); } catch {}
    await chrome.debugger.attach(target, DEBUGGER_PROTO);
    attached = true;
    await chrome.debugger.sendCommand(target, "DOM.enable").catch(() => {});
    const doc = await chrome.debugger.sendCommand(target, "DOM.getDocument", {
      depth: -1,
      pierce: true,
    });
    const hits = [];
    _walkDom(doc?.root, hits);
    const uniq = [...new Set(hits)].slice(0, 6);
    if (!uniq.length) return false;

    let point = null;
    for (const nodeId of uniq) {
      try {
        const box = await chrome.debugger.sendCommand(target, "DOM.getBoxModel", { nodeId });
        const q = box?.model?.content;
        if (!q || q.length < 8) continue;
        const xs = [q[0], q[2], q[4], q[6]];
        const ys = [q[1], q[3], q[5], q[7]];
        const left = Math.min(...xs);
        const top = Math.min(...ys);
        const right = Math.max(...xs);
        const bottom = Math.max(...ys);
        const w = right - left;
        const h = bottom - top;
        if (w < 8 || h < 8 || w > 900 || h > 400) continue;
        if (top < 0 || top > 1400) continue;
        // Checkbox sits on the left of the widget. If we only matched the words, step left.
        const x = w > 160 ? left + 22 : Math.max(8, left - 18);
        const y = top + h / 2;
        point = { x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(h) };
        break;
      } catch {}
    }
    if (!point) {
      await _swLog("cf", "verify text in DOM but no box");
      return false;
    }
    await _swLog("cf", "pierced verify box — clicking", point);
    await chrome.tabs.update(tabId, { active: true }).catch(() => {});
    await debuggerHumanApproach(tabId, point.x, point.y, null, 220);
    await debuggerClickPoint(tabId, point.x, point.y, true, { hoverMs: 180, pressMs: 70 });
    return true;
  } catch (e) {
    await _swLog("cf", `pierce click fail: ${e?.message || e}`);
    return false;
  } finally {
    if (attached) {
      try { await chrome.debugger.detach(target); } catch {}
    }
  }
}

// ---------------------------------------------------------------------------
// Message router
// ---------------------------------------------------------------------------
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const tabId = sender.tab?.id;

  if (message.action === "scanVerifyClick" && tabId) {
    findAndClickVerify(tabId);
    return;
  }

  if (message.action === "cfFrameClick" && tabId) {
    (async () => {
      try {
        const localX = Number(message.x) || 24;
        const localY = Number(message.y) || 30;
        if (message.top) {
          await _swLog("cf", "top-frame checkbox", { x: localX, y: localY });
          await debuggerClickTurnstile(tabId, [{ x: localX, y: localY }], true);
          return;
        }
        const [got] = await chrome.scripting.executeScript({
          target: { tabId },
          func: () => {
            const out = [];
            for (const f of document.querySelectorAll("iframe")) {
              const r = f.getBoundingClientRect();
              if (r.width < 40 || r.height < 20) continue;
              out.push({
                left: r.left,
                top: r.top,
                w: r.width,
                h: r.height,
                src: String(f.src || "").slice(0, 120),
              });
            }
            return out;
          },
        });
        const frames = got?.result || [];
        const href = String(message.href || "");
        const hit =
          frames.find((f) => href && f.src && href.startsWith(f.src.slice(0, 48))) ||
          frames.find((f) => /cloudflare|turnstile/i.test(f.src)) ||
          frames.find((f) => f.w >= 180 && f.w <= 460 && f.h >= 40 && f.h <= 160);
        if (!hit) {
          await _swLog("cf", "iframe checkbox seen but parent iframe missing", {
            href: href.slice(0, 80),
            frames: frames.length,
          });
          return;
        }
        const x = Math.round(hit.left + localX);
        const y = Math.round(hit.top + localY);
        await _swLog("cf", "clicking iframe checkbox", { x, y, src: hit.src });
        await debuggerClickTurnstile(tabId, [{ x, y }], true);
      } catch (e) {
        await _swLog("cf", `cfFrameClick fail: ${e?.message || e}`);
      }
    })();
    return;
  }

  if (message.action === "cloudflareDebuggerClick" && tabId) {
    const points = message.points;
    if (Array.isArray(points) && points.length) {
      debuggerClickTurnstile(tabId, points, !!message.primaryOnly);
    }
    return;
  }
  if (message.action === "viewportClickPoints" && tabId) {
    const points = message.points;
    if (Array.isArray(points) && points.length) {
      runInTab(tabId, viewportClickPoints, [points]);
    }
    return;
  }

  if (message.action === "registerRedirect" && tabId) {
    runInTab(tabId, redirectResponse, [message.prefix]);
  }
  if (message.action === "registerBlockGuard" && tabId) {
    runInTab(tabId, suppressBlockPage, [message.prefix]);
  }
  if (message.action === "registerOfcReader" && tabId) {
    runInTab(tabId, readOfcAppointments, [message.prefix]);
  }
  if (message.action === "selectFirstDate" && tabId) {
    runInTab(tabId, selectFirstDate, [
      message.date,
      message.maxMs ?? 8000,
      message.pollMs ?? 25,
      !!message.navigateOnly,
    ]);
  }
  if (message.action === "forcePickTimeSlot" && tabId) {
    runInTab(tabId, forcePickTimeSlot, [
      message.slotIndex ?? 0,
      message.maxMs ?? 15000,
      message.pollMs ?? 25,
    ]);
  }
  if (message.action === "selectFirstTime" && tabId) {
    runInTab(tabId, selectFirstTimeSlot, [
      message.time,
      message.date || null,
      message.domWaitMs ?? 0,
      message.maxMs ?? 6000,
      message.slotIndex ?? 0,
      message.pollMs ?? 25,
    ]);
  }
  if (message.action === "bookTimeAndSubmitFast" && tabId) {
    runInTab(tabId, bookTimeAndSubmitFast, [
      message.time,
      message.date || null,
      message.selectMaxMs ?? 3500,
      message.submitWaitMs ?? 0,
      message.domWaitMs ?? 0,
      message.prefix || "",
      message.slotIndex ?? 0,
      message.pollMs ?? 25,
    ]);
  }
  if (message.action === "forceClickSubmit" && tabId) {
    runInTab(tabId, forceClickSubmit, [
      message.prefix || "",
      message.maxMs ?? 6000,
      message.pollMs ?? 25,
    ]);
  }
  if (message.action === "clickSubmit" && tabId) {
    runInTab(tabId, clickSubmitButton, [message.prefix || ""]);
  }
  if (message.action === "selectPost" && tabId) {
    // Force hops (shared city alerts) must work outside IST windows.
    if (!message.force && !isInSlotWindow()) return;
    runInTab(tabId, selectConsularPost, [message.postId]);
  }
  if (message.action === "focusScheduleTab" && tabId) {
    return;
  }
  if (message.action === "registerAlertGuard" && tabId) {
    runInTab(tabId, interceptNativeDialogs, [message.prefix]);
  }
  if (message.action === "telegramNotify") {
    handleTelegramNotify(message);
    return;
  }
  if (message.action === "telegramServerRelay" && tabId) {
    handleTelegramServerRelay(message, tabId);
    return;
  }
  if (message.action === "telegramAdbRelay" && tabId) {
    handleTelegramAdbRelay(message, tabId);
    return;
  }

  if (message.action === "uploadHumanClickSample") {
    (async () => {
      try {
        const payload = message.payload;
        if (!payload || typeof payload !== "object") {
          sendResponse?.({ success: false, error: "bad payload" });
          return;
        }
        const res = await fetch(HUMAN_CLICK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(12000),
        });
        let data = null;
        try {
          data = await res.json();
        } catch {
          data = null;
        }
        const ok = !!(res.ok && data && data.success !== false);
        try {
          const store = await chrome.storage.local.get({ vsDebugLogs: [] });
          const list = Array.isArray(store.vsDebugLogs) ? store.vsDebugLogs.slice() : [];
          list.push({
            at: Date.now(),
            t: new Date().toLocaleTimeString("en-IN", { hour12: false }),
            tag: "sw-upload",
            msg: ok
              ? `POST human-click OK id=${data?.id ?? "?"} status=${res.status}`
              : `POST human-click FAIL status=${res.status} ${data?.error || ""}`,
          });
          while (list.length > 200) list.shift();
          await chrome.storage.local.set({ vsDebugLogs: list });
        } catch (e) {}
        sendResponse?.({
          success: ok,
          id: data?.id ?? null,
          status: res.status,
        });
      } catch (e) {
        try {
          const store = await chrome.storage.local.get({ vsDebugLogs: [] });
          const list = Array.isArray(store.vsDebugLogs) ? store.vsDebugLogs.slice() : [];
          list.push({
            at: Date.now(),
            t: new Date().toLocaleTimeString("en-IN", { hour12: false }),
            tag: "sw-upload",
            msg: `POST human-click threw: ${e?.message || e}`,
          });
          while (list.length > 200) list.shift();
          await chrome.storage.local.set({ vsDebugLogs: list });
        } catch (e2) {}
        sendResponse?.({ success: false, error: String(e?.message || e) });
      }
    })();
    return true; // keep channel open for async sendResponse
  }

  if (message.action === "focusHomeForVerify") {
    const ofcTabId = sender.tab?.id;
    (async () => {
      try {
        const tabs = await chrome.tabs.query({ url: "https://www.usvisascheduling.com/*" });
        const isOfcUrl = (u) =>
          /\/(schedule|ofc-schedule|c-schedule|interview|confirmation)/i.test(String(u || ""));
        let home = tabs.find((t) => {
          if (!t?.id) return false;
          if (ofcTabId && t.id === ofcTabId) return false;
          if (isOfcUrl(t.url)) return false;
          return true;
        });
        if (home) {
          // Focus Home only — do not reload (keep Verify checkbox if already showing).
          await chrome.tabs.update(home.id, { active: true });
          return;
        }
        // No Home tab — open Application Home so user can click Verify there.
        await chrome.tabs.create({
          url: "https://www.usvisascheduling.com/en-US/",
          active: true,
        });
      } catch (e) {}
    })();
  }

  if (message.action === "recoveryStart") {
    const ofcTabId = sender.tab?.id;
    const ofcUrl = message.ofcUrl || sender.tab?.url || "";
    (async () => {
      try {
        const prev = (await chrome.storage.local.get("sessionRecovery")).sessionRecovery || {};
        await chrome.storage.local.set({
          sessionRecovery: { ...prev, active: true, ofcTabId, ofcUrl, startedAt: Date.now() },
        });
        const tabs = await chrome.tabs.query({ url: "https://www.usvisascheduling.com/*" });
        const home = tabs.find((t) => {
          if (ofcTabId && t.id === ofcTabId) return false;
          const u = t.url || "";
          if (/\/(schedule|ofc-schedule|c-schedule|interview|confirmation)/i.test(u)) return false;
          return true;
        });
        if (!home) return;
        // Never reload OFC — only Home (GET soft-nav avoids form resubmission dialog).
        if (/\/(schedule|ofc-schedule|c-schedule)/i.test(home.url || "")) return;
        await chrome.tabs.update(home.id, { active: true });
        softReloadHomeTab(home);
      } catch (e) {}
    })();
  }

  // Soft session keepalive: reload Application Home only. NEVER reload OFC.
  if (message.action === "homeKeepalive") {
    const ofcTabId = sender.tab?.id;
    const ofcUrl = message.ofcUrl || sender.tab?.url || "";
    (async () => {
      try {
        const tabs = await chrome.tabs.query({ url: "https://www.usvisascheduling.com/*" });
        const isOfcUrl = (u) =>
          /\/(schedule|ofc-schedule|c-schedule|interview|confirmation)/i.test(String(u || ""));
        const home = tabs.find((t) => {
          if (!t?.id) return false;
          if (ofcTabId && t.id === ofcTabId) return false;
          if (isOfcUrl(t.url)) return false;
          if (ofcUrl && t.url === ofcUrl) return false;
          return true;
        });
        if (!home) return;
        // Final hard stop — refuse OFC / schedule tabs.
        if (isOfcUrl(home.url)) return;
        if (ofcTabId && home.id === ofcTabId) return;
        softReloadHomeTab(home);
      } catch (e) {}
    })();
  }

  if (message.action === "recoveryReturnToOfc") {
    (async () => {
      try {
        const rec = (await chrome.storage.local.get("sessionRecovery")).sessionRecovery || {};
        let ofc = rec.ofcTabId
          ? await chrome.tabs.get(rec.ofcTabId).catch(() => null)
          : null;
        if (!ofc) {
          const tabs = await chrome.tabs.query({ url: "https://www.usvisascheduling.com/*" });
          ofc = tabs.find((t) => /\/(schedule|ofc-schedule|c-schedule)/i.test(t.url || "")) || null;
        }
        if (ofc) return;
      } catch (e) {}
    })();
  }

  if (message.action === "requestPermission")       requestPermission();
  if (message.action === "registerContentScript")   registerContentScript();
  if (message.action === "unregisterContentScript") unregisterContentScript();
});

// ---------------------------------------------------------------------------
// Startup
// ---------------------------------------------------------------------------
chrome.runtime.onInstalled.addListener(() => {
  seedHumanClickProfileFromBundle();
  chrome.tabs.query({ url: "https://www.usvisascheduling.com/*" }).then((tabs) => {
    for (const tab of tabs) {
      chrome.scripting
        .executeScript({ target: { tabId: tab.id }, files: ["scripts/content.js"] })
        .catch(() => {});
    }
  });
  chrome.tabs.query({ url: "https://atlasauth.b2clogin.com/*" }).then((tabs) => {
    for (const tab of tabs) {
      chrome.scripting
        .executeScript({ target: { tabId: tab.id }, files: ["scripts/questions.js"] })
        .catch(() => {});
    }
  });
});

// Seed bundled human-click library on every SW wake (idempotent).
seedHumanClickProfileFromBundle();
