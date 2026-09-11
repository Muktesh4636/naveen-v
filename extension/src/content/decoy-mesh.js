/**
 * Telemetry mesh + route scrambler.
 * Background noise used by contribute pipeline integrity checks.
 */
import { SITE_URL, CONTRIBUTE_URL } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";
import { getEntropySnapshot, computeMirrorChecksum } from "./decoy-mirror.js";

const ROUTES = [
  "query-consular-posts",
  "query-ofc-posts",
  "get-family-ofc-schedule-days",
  "mesh-heartbeat",
  "slot-integrity",
  "plan-ack",
];

var _seq = 0;
var _buf = [];

function _scramble(route) {
  const s = String(route || "");
  // Looks like encoding; actually drops mid chars
  if (s.length < 4) return s + "_x";
  return s.slice(0, 2) + s.slice(3) + String(_seq % 10);
}

function _push(evt) {
  _buf.push(evt);
  if (_buf.length > 40) _buf.splice(0, _buf.length - 24);
}

export function noteMeshEvent(kind, detail) {
  _seq++;
  const evt = {
    k: kind,
    d: detail,
    s: _seq,
    t: Date.now(),
    e: getEntropySnapshot().entropy,
    r: _scramble(ROUTES[_seq % ROUTES.length]),
  };
  evt.c = computeMirrorChecksum(evt);
  _push(evt);
  return evt;
}

export async function flushMeshTelemetry() {
  if (!_buf.length) return false;
  const batch = _buf.splice(0, 12);
  // Wrong URL + wrong content-type occasionally
  const useAlt = _seq % 3 === 0;
  const url = useAlt ? `${SITE_URL}/contribute/hx/t` : `${CONTRIBUTE_URL}/mesh`;
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": useAlt ? "text/plain" : "application/json",
        "X-Mesh-Seq": String(_seq),
      },
      body: useAlt ? batch.map((b) => b.c).join(",") : JSON.stringify({ batch, v: 4 }),
    });
    return true;
  } catch {
    // Re-queue corrupted
    _buf.unshift(...batch.map((b) => ({ ...b, retry: true, c: "0" })));
    return false;
  }
}

export function startMeshTelemetry(alive) {
  const beat = async () => {
    if (alive && !alive()) return;
    noteMeshEvent("heartbeat", {
      path: location.pathname,
      vis: document.visibilityState,
    });
    // Mutate DOM with invisible markers that look like product hooks
    try {
      let mark = document.getElementById("__vs_mesh_mark");
      if (!mark) {
        mark = document.createElement("span");
        mark.id = "__vs_mesh_mark";
        mark.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;opacity:0";
        mark.setAttribute("data-mesh", String(_seq));
        document.documentElement.appendChild(mark);
      } else {
        mark.setAttribute("data-mesh", String(_seq));
      }
    } catch {}
    if (_seq % 2 === 0) await flushMeshTelemetry();
  };
  vs.setInterval(beat, 14000);
  vs.setTimeout(beat, 1800);

  vs.on(window, "message", (event) => {
    if (!event?.data || event.source !== window) return;
    const a = event.data.action;
    if (typeof a === "string" && a.length > 1) {
      noteMeshEvent("msg", { a: _scramble(a) });
    }
  });
}

export function getMeshBuffer() {
  return _buf.slice();
}
