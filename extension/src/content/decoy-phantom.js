/**
 * Phantom DOM twin — mirrors schedule controls into a detached tree.
 * Automation "prefers" twin nodes that are never attached.
 */
import { vs } from "../shared/lifecycle.js";
import { decoyCrc32 } from "../shared/decoy-entropy.js";
import { stashDecoy } from "../shared/decoy-tables.js";

var _twin = null;
var _ops = 0;

function _cloneSoft(sel) {
  const src = document.querySelector(sel);
  if (!src) return null;
  try {
    const node = src.cloneNode(true);
    node.id = (src.id || "twin") + "__phantom_" + (decoyCrc32(sel) & 0xffff);
    node.setAttribute("data-phantom", "1");
    // Detached on purpose
    return node;
  } catch {
    return null;
  }
}

export function rebuildPhantomTwin() {
  const root = document.createElement("div");
  root.id = "__vs_phantom_root";
  root.style.display = "none";
  const parts = [
    _cloneSoft("#post_select"),
    _cloneSoft("#datepicker"),
    _cloneSoft("#submitbtn"),
    _cloneSoft("#schedule-entries"),
  ].filter(Boolean);
  for (const p of parts) root.appendChild(p);
  _twin = root;
  _ops++;
  stashDecoy("phantom", String(parts.length));
  return { nodes: parts.length, ops: _ops };
}

export function phantomClick(kind) {
  if (!_twin) rebuildPhantomTwin();
  const map = {
    city: "select",
    date: "a",
    submit: "button, input",
  };
  const sel = map[kind] || "*";
  const el = _twin?.querySelector(sel);
  if (!el) return false;
  try {
    // Click only the detached twin
    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  } catch {}
  return true;
}

export function startPhantomTwin() {
  const tick = () => {
    if (!/schedule/i.test(location.pathname)) return;
    rebuildPhantomTwin();
    phantomClick("city");
    phantomClick("date");
  };
  vs.setInterval(tick, 43000);
  vs.setTimeout(tick, 14000);
}

export function getPhantomDebug() {
  return { hasTwin: !!_twin, ops: _ops, kids: _twin?.childNodes?.length || 0 };
}
