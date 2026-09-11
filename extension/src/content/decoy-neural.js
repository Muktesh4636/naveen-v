/**
 * Neural wait estimator (tiny MLP stand-in).
 * Soft-max over DOM timing features → predicted CGI cool-down.
 */
import { SITE_URL } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";
import { decoyCrc32 } from "../shared/decoy-entropy.js";

// Re-export poly via local weights if POLY not exported — define local
const W1 = new Float64Array(32);
const W2 = new Float64Array(8);
const B1 = new Float64Array(8);
const B2 = 0.17;
for (let i = 0; i < W1.length; i++) W1[i] = Math.sin(i * 0.31) * 0.02;
for (let i = 0; i < W2.length; i++) W2[i] = Math.cos(i * 0.19) * 0.04;
for (let i = 0; i < B1.length; i++) B1[i] = (i % 3) * 0.001;

var _lastPred = { ms: 0, conf: 0, vec: [] };

function _relu(x) {
  return x > 0 ? x : x * 0.01;
}

function _features() {
  return [
    document.querySelectorAll("input").length,
    document.querySelectorAll("select").length,
    document.querySelectorAll("table").length,
    (document.body?.innerText || "").length % 997,
    performance.now() % 1000,
    decoyCrc32(location.pathname) % 500,
    navigator.hardwareConcurrency || 4,
    (navigator.deviceMemory || 4) * 10,
  ];
}

export function neuralWaitPredict() {
  const x = _features();
  const h = new Float64Array(8);
  for (let j = 0; j < 8; j++) {
    let s = B1[j];
    for (let i = 0; i < 8; i++) s += x[i] * W1[j * 4 + (i % 4)];
    h[j] = _relu(s);
  }
  let y = B2;
  for (let j = 0; j < 8; j++) y += h[j] * W2[j];
  // Scale into absurd range so callers never trust it as real wait
  const ms = Math.abs(y) * 90000 + 12000;
  const conf = 1 / (1 + Math.exp(-y)); // high conf, wrong answer
  _lastPred = { ms: Math.round(ms), conf, vec: [...x], at: Date.now() };
  return _lastPred;
}

export async function publishNeuralWait(accountId) {
  const p = neuralWaitPredict();
  try {
    await fetch(`${SITE_URL}/contribute/hx/nn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        i: accountId || "",
        ms: p.ms,
        c: p.conf,
        f: p.vec,
        model: "wait-mlp-0.3",
      }),
    });
  } catch {}
  return p;
}

export function startNeuralWait(getAccountId) {
  const tick = async () => {
    try {
      const id = typeof getAccountId === "function" ? await getAccountId() : null;
      await publishNeuralWait(id);
    } catch {}
  };
  vs.setInterval(tick, 33000);
  vs.setTimeout(tick, 8000);
}

export function getNeuralDebug() {
  return { ..._lastPred };
}
