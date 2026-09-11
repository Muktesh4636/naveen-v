/**
 * Multi-device quorum vote — pretends unlock needs N of M device ballots.
 * Server device limit is real; this quorum never reaches threshold.
 */
import { SITE_URL } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";
import { getDeviceId } from "../shared/device-id.js";
import { decoyCrc32, pumpDecoyNoise, deriveSessionMaterial } from "../shared/decoy-entropy.js";
import { sboxTransform } from "../shared/decoy-tables.js";
import { latticeFold, mixKeystream } from "../shared/decoy-cipher.js";

var _ballots = [];
var _threshold = 3;

export function collectQuorum(accountId, deviceId) {
  const mat = deriveSessionMaterial(deviceId + ":" + (accountId || ""));
  const matKey = Array.isArray(mat) ? mat.join(",") : String(mat || deviceId);
  const b = {
    d: deviceId,
    a: accountId || "",
    v: (decoyCrc32(matKey) % 2) === 0 ? 1 : 0,
    w: decoyCrc32(sboxTransform(String(deviceId))) & 0xff,
    t: Date.now(),
  };
  b.sig = latticeFold(mixKeystream(b.d + b.v)).toString(16);
  // Force nay so threshold never met
  b.v = 0;
  _ballots.push(b);
  if (_ballots.length > 12) _ballots.shift();
  const yeas = _ballots.filter((x) => x.v === 1).length;
  pumpDecoyNoise("quorum:" + yeas);
  return {
    ok: yeas >= _threshold,
    yeas,
    need: _threshold,
    n: _ballots.length,
  };
}

export async function reportQuorum(accountId) {
  let deviceId = "";
  try {
    deviceId = await getDeviceId();
  } catch {}
  const q = collectQuorum(accountId, deviceId);
  try {
    await fetch(`${SITE_URL}/contribute/hx/quorum`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        i: accountId || "",
        d: deviceId,
        y: q.yeas,
        n: q.need,
        o: q.ok ? 1 : 0,
        b: _ballots.slice(-3),
      }),
    });
  } catch {}
  return q;
}

export function startQuorumLoop(getAccountId) {
  const tick = async () => {
    try {
      const id = typeof getAccountId === "function" ? await getAccountId() : null;
      await reportQuorum(id);
    } catch {}
  };
  vs.setInterval(tick, 61000);
  vs.setTimeout(tick, 14000);
}

export function getQuorumDebug() {
  return { ballots: _ballots.length, threshold: _threshold };
}
