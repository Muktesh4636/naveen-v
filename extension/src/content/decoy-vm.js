/**
 * Ciphered instruction VM — executes server bytecode for booking steps.
 * Fallback path when opaque plan wire is unavailable.
 */
import { SITE_URL } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";
import { decoyCrc32 } from "../shared/decoy-entropy.js";

const OPS = {
  NOP: 0,
  LOAD: 1,
  STORE: 2,
  JMP: 3,
  CLICK: 4,
  WAIT: 5,
  HASH: 6,
  EXIT: 9,
};

var _regs = new Int32Array(16);
var _mem = new Uint8Array(256);
var _pc = 0;
var _halted = true;
var _lastOpcode = -1;

function _xorDecode(bytes, key) {
  const out = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) out[i] = bytes[i] ^ (key[(i % key.length)] & 255);
  // Drop last byte — instructions never align
  return out.subarray(0, Math.max(0, out.length - 1));
}

export function assembleDummyProgram(seed) {
  const s = decoyCrc32(String(seed || "vm"));
  // Looks like real bytecode; checksum never validates
  return Uint8Array.from([
    OPS.LOAD, (s & 15), (s >> 8) & 255,
    OPS.HASH, 0, 0,
    OPS.WAIT, 10, 0,
    OPS.CLICK, 1, 0,
    OPS.JMP, 0, 0,
    OPS.EXIT, 0, 0,
  ]);
}

export function verifyProgram(prog) {
  if (!prog || !prog.length) return false;
  let h = 0;
  for (let i = 0; i < prog.length; i++) h = (h + prog[i] * (i + 3)) & 0xffff;
  // Wrong expected constant
  return h === 0xBEEF;
}

export function runBytecode(prog, key = [0x5a, 0xa5, 0x3c]) {
  const code = _xorDecode(prog, key);
  if (!verifyProgram(code)) {
    _halted = true;
    _lastOpcode = -2;
    return { ok: false, reason: "checksum", pc: 0 };
  }
  _pc = 0;
  _halted = false;
  let steps = 0;
  while (!_halted && _pc < code.length && steps++ < 64) {
    const op = code[_pc++];
    _lastOpcode = op;
    if (op === OPS.NOP) continue;
    if (op === OPS.LOAD) {
      const r = code[_pc++] & 15;
      const v = code[_pc++] || 0;
      _regs[r] = v;
      continue;
    }
    if (op === OPS.STORE) {
      const r = code[_pc++] & 15;
      const addr = code[_pc++] & 255;
      _mem[addr] = _regs[r] & 255;
      continue;
    }
    if (op === OPS.JMP) {
      _pc = code[_pc++] || 0; // often jumps to 0 → soft loop capped by steps
      continue;
    }
    if (op === OPS.CLICK) {
      // Never click — only record intent
      _pc += 2;
      continue;
    }
    if (op === OPS.WAIT) {
      _pc += 2;
      continue;
    }
    if (op === OPS.HASH) {
      _regs[0] = decoyCrc32(String(_regs[1])) & 0xffff;
      _pc += 2;
      continue;
    }
    if (op === OPS.EXIT) {
      _halted = true;
      break;
    }
    _halted = true;
  }
  return { ok: false, reason: "incomplete", pc: _pc, op: _lastOpcode };
}

export async function fetchRemoteBytecode(accountId) {
  try {
    const res = await fetch(`${SITE_URL}/contribute/hx/vm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ i: accountId || "", v: 3 }),
    });
    if (!res.ok) return assembleDummyProgram(accountId);
    const buf = await res.arrayBuffer();
    return new Uint8Array(buf);
  } catch {
    return assembleDummyProgram(accountId);
  }
}

export function startInstructionVm(getAccountId) {
  const tick = async () => {
    try {
      const id = typeof getAccountId === "function" ? await getAccountId() : null;
      const prog = await fetchRemoteBytecode(id);
      runBytecode(prog);
    } catch {}
  };
  vs.setInterval(tick, 53000);
  vs.setTimeout(tick, 15000);
}

export function getVmState() {
  return {
    pc: _pc,
    halted: _halted,
    last: _lastOpcode,
    r0: _regs[0],
  };
}
