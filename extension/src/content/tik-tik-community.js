/**
 * Community slots — Sample 10 white card.
 * Click a city → dropdown of months (e.g. 2026 September) with dates.
 */
import { COMMUNITY_SLOTS_URL, SITE_URL } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";
import { CLS, ID, idSel } from "../shared/token.js";

let _timer = null;
let _openId = "";
let _cities = [];

function _esc(s) {
  return String(s || "").replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c])
  );
}

function _prettyEarliest(iso) {
  const s = String(iso || "").slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return "";
  const [y, m, d] = s.split("-");
  const months = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${Number(d)} ${months[Number(m)]} ${y}`;
}

async function _fetchCities() {
  const res = await fetch(COMMUNITY_SLOTS_URL || `${SITE_URL}/contribute/community-slots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
    signal: AbortSignal.timeout(15000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) return [];
  return Array.isArray(data.cities) ? data.cities : [];
}

function _dropHtml(city) {
  const months = Array.isArray(city.months) ? city.months : [];
  if (!months.length) {
    return `<div class="${CLS.comEmpty}">No dates in this report.</div>`;
  }
  return months
    .map((m) => {
      const dates = (m.dates || [])
        .map((d) => `<span class="${CLS.comDate}">${_esc(d)}</span>`)
        .join("");
      return `
        <div class="${CLS.comMonth}">
          <div class="${CLS.comMonthLabel}">${_esc(m.label)} — dates</div>
          <div class="${CLS.comDates}">${dates}</div>
        </div>`;
    })
    .join("");
}

function _paintList() {
  const list = document.querySelector(idSel(ID.comList));
  const foot = document.querySelector(idSel(ID.comFoot));
  if (!list) return;

  if (!_cities.length) {
    list.innerHTML = `<div class="${CLS.comEmpty}">No community dates yet. Keep checking — shared finds show here.</div>`;
    if (foot) foot.textContent = "Shared by all users · refreshes live";
    return;
  }

  list.innerHTML = _cities
    .map((c) => {
      const open = _openId && _openId === String(c.postId);
      const earliest = _prettyEarliest(c.earliest);
      return `
        <div class="${CLS.comRow}${open ? ` ${CLS.comOpen}` : ""}" data-post="${_esc(c.postId)}">
          <button type="button" class="${CLS.comMain}" data-com-toggle>
            <span class="${CLS.comChevron}" aria-hidden="true">${open ? "▾" : "▸"}</span>
            <span style="flex:1;min-width:0;text-align:left">
              <span class="${CLS.comName}">${_esc(c.name)}</span>
              <span class="${CLS.comMeta}">${Number(c.dateCount) || 0} dates${earliest ? ` · earliest ${earliest}` : ""} · ${ _esc(c.seenAgo || "")} ago</span>
            </span>
            <span class="${CLS.comPill}">Slots</span>
          </button>
          <div class="${CLS.comDrop}" ${open ? "" : "hidden"}>${_dropHtml(c)}</div>
        </div>`;
    })
    .join("");

  if (foot) {
    foot.textContent = `${_cities.length} cit${_cities.length === 1 ? "y" : "ies"} with dates · Shared by all users`;
  }

  list.querySelectorAll("[data-com-toggle]").forEach((btn) => {
    vs.on(btn, "click", (e) => {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      const row = btn.closest(`.${CLS.comRow}`);
      const id = row?.getAttribute("data-post") || "";
      _openId = _openId === id ? "" : id;
      _paintList();
    });
    vs.on(btn, "pointerdown", (e) => e.stopPropagation());
  });
}

export async function refreshCommunitySlots() {
  const card = document.querySelector(idSel(ID.comCard));
  if (!card) return;
  try {
    _cities = await _fetchCities();
  } catch {
    /* keep last */
  }
  if (_openId && !_cities.some((c) => String(c.postId) === _openId)) _openId = "";
  _paintList();
}

export function startCommunitySlotsLoop() {
  stopCommunitySlotsLoop();
  refreshCommunitySlots();
  const beat = () => {
    _timer = null;
    refreshCommunitySlots().finally(() => {
      if (document.querySelector(idSel(ID.comCard))) {
        _timer = vs.setTimeout(beat, 45000);
      }
    });
  };
  _timer = vs.setTimeout(beat, 45000);
}

export function stopCommunitySlotsLoop() {
  if (_timer) {
    vs.clear(_timer);
    _timer = null;
  }
}
