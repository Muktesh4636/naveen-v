#!/usr/bin/env node
/**
 * Send Telegram messages to Muktesh via ADB (personal account on connected phone).
 * Uses uiautomator to tap the Send button reliably on Samsung / Telegram.
 */
import { execFile, exec } from "node:child_process";
import { promisify } from "node:util";
import { writeFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const execFileAsync = promisify(execFile);
const execAsync = promisify(exec);

const DEFAULT_CHAT = "MukteshReddyy";
const TELEGRAM_PKG = "org.telegram.messenger";

export function htmlToPlain(html) {
  return String(html || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Strip emoji / non-ASCII — `adb input text` only handles limited chars. */
export function sanitizeForAdb(text) {
  return htmlToPlain(text)
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/[^\x20-\x7E\n|]/g, "")
    .replace(/\n+/g, " | ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 900);
}

/** Escape for `adb shell input text`. Spaces → %s */
export function escapeAdbInput(text) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/ /g, "%s")
    .replace(/(['"`$&()|;<>\[\]*?#~!])/g, "\\$1");
}

async function adb(args, { adbPath = "adb", serial } = {}) {
  const cmd = serial ? [adbPath, "-s", serial] : [adbPath];
  const { stdout } = await execFileAsync(cmd[0], [...cmd.slice(1), ...args], {
    timeout: 30_000,
    maxBuffer: 4 * 1024 * 1024,
  });
  return stdout;
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function uiDump(opts) {
  await adb(["shell", "uiautomator", "dump", "/sdcard/ui.xml"], opts);
  return adb(["shell", "cat", "/sdcard/ui.xml"], opts);
}

async function wakeScreen(opts) {
  await adb(["shell", "input", "keyevent", "224"], opts).catch(() => {});
  await sleep(250);
}

async function ensureTelegramChat(opts) {
  const xml = await uiDump(opts);
  if (!xml.includes('package="org.telegram.messenger"')) {
    throw new Error("Telegram is not in foreground");
  }
  if (xml.includes('content-desc="End call"') || xml.includes("Calling...")) {
    await adb(["shell", "input", "keyevent", "6"], opts);
    await sleep(900);
    await openChat(DEFAULT_CHAT, opts);
    await sleep(2200);
  }
  if (!xml.match(/content-desc="Send"[^>]*bounds="/) && !xml.includes('hint="Message"')) {
    await openChat(DEFAULT_CHAT, opts);
    await sleep(2200);
  }
}

function editTextDraft(xml) {
  const m = xml.match(/class="android\.widget\.EditText"[^>]*text="([^"]*)"/);
  return m ? m[1] : "";
}

async function clearMessageField(opts) {
  await focusMessageField(opts);
  await sleep(120);
  let xml = await uiDump(opts);
  let draft = editTextDraft(xml);
  const n = Math.min(Math.max(draft.length + 8, 0), 180);
  for (let i = 0; i < n; i++) {
    await adb(["shell", "input", "keyevent", "67"], opts);
  }
  await sleep(100);
}

async function adbShell(cmd, opts) {
  const serial = opts.serial ? `-s ${opts.serial} ` : "";
  const quoted = cmd.replace(/"/g, '\\"');
  await execAsync(`${opts.adbPath || "adb"} ${serial}shell "${quoted}"`, { timeout: 30_000 });
}

async function tapSendButton(opts, retries = 5) {
  await wakeScreen(opts);
  for (let attempt = 0; attempt < retries; attempt++) {
    const xml = await uiDump(opts);
    const match = xml.match(/content-desc="Send"[^>]*bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"/);
    if (!match) {
      await sleep(450);
      continue;
    }
    const x = +match[3] - 20;
    const y = Math.floor((+match[2] + +match[4]) / 2);
    await adbShell(`input tap ${x} ${y} && sleep 0.12 && input tap ${x} ${y}`, opts);
    await sleep(800);
    const after = await uiDump(opts);
    const stillDraft = after.match(/class="android\.widget\.EditText"[^>]*text="([^"]+)"/);
    if (!stillDraft || !stillDraft[1].trim()) return;
    await sleep(400);
  }
  throw new Error("Send button tap failed — is Telegram on Muktesh chat?");
}

async function focusMessageField(opts) {
  const xml = await uiDump(opts);
  const edit = xml.match(/class="android\.widget\.EditText"[^>]*bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"/);
  if (!edit) {
    throw new Error("Message field not found — open Muktesh chat in Telegram");
  }
  const x = Math.floor((+edit[1] + +edit[3]) / 2);
  const y = Math.floor((+edit[2] + +edit[4]) / 2);
  await adb(["shell", "input", "tap", String(x), String(y)], opts);
}

async function openChat(chatUsername, opts) {
  const uri = `tg://resolve?domain=${chatUsername.replace(/^@/, "")}`;
  await adb([
    "shell", "am", "start",
    "-a", "android.intent.action.VIEW",
    "-d", uri,
    TELEGRAM_PKG,
  ], opts);
}

async function openFreshChat(chatUsername, opts) {
  await adbShell("input keyevent 4", opts).catch(() => {});
  await sleep(500);
  await openChat(chatUsername, opts);
}

/**
 * @param {string} text
 * @param {{ chat?: string, adbPath?: string, serial?: string, openChatWaitMs?: number }} opts
 */
export async function sendTelegramViaAdb(text, opts = {}) {
  const chat = (opts.chat || DEFAULT_CHAT).replace(/^@/, "");
  const plain = sanitizeForAdb(text);
  if (!plain) return { ok: false, error: "empty message" };

  await wakeScreen(opts);
  await openFreshChat(chat, opts);
  await sleep(opts.openChatWaitMs ?? 2800);
  await ensureTelegramChat(opts);

  await focusMessageField(opts);
  await sleep(120);
  let xml = await uiDump(opts);
  const existing = String(editTextDraft(xml) || "");
  if (existing.trim()) {
    await adbShell(`input keyevent 67 && input keyevent 67 && input keyevent 67`, opts);
    const n = Math.min(existing.length + 16, 240);
    for (let i = 0; i < n; i++) {
      await adbShell("input keyevent 67", opts);
    }
    await sleep(180);
  }

  await focusMessageField(opts);
  await sleep(120);

  const escaped = escapeAdbInput(plain);
  await adb(["shell", "input", "text", escaped], opts);
  await sleep(700);

  await tapSendButton(opts);
  await sleep(300);

  return { ok: true, sent: plain };
}

/**
 * Push a JPEG screenshot to phone Downloads and send caption via text.
 * Full in-chat photo attach is fragile; caption always goes through.
 */
export async function sendTelegramPhotoViaAdb(caption, imageBase64, opts = {}) {
  const textResult = await sendTelegramViaAdb(caption, opts);
  if (!imageBase64) return textResult;

  let tmp = null;
  try {
    tmp = join(tmpdir(), `visa-slot-${Date.now()}.jpg`);
    writeFileSync(tmp, Buffer.from(imageBase64, "base64"));
    const remote = `/sdcard/Download/visa-slot-${Date.now()}.jpg`;
    await adb(["push", tmp, remote], opts);
    return { ...textResult, imagePushed: remote };
  } catch (e) {
    return { ...textResult, imageError: String(e.message || e) };
  } finally {
    if (tmp) {
      try { unlinkSync(tmp); } catch {}
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const msg = process.argv.slice(2).join(" ") || "Visa Slot 4 ADB test";
  sendTelegramViaAdb(msg)
    .then((r) => {
      console.log(JSON.stringify(r, null, 2));
      process.exit(r.ok ? 0 : 1);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
