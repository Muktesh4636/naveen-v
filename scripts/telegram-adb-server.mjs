#!/usr/bin/env node
/**
 * Local HTTP relay: extension → localhost → ADB → Telegram on phone → Muktesh.
 *
 * Start: node scripts/telegram-adb-server.mjs
 * POST http://127.0.0.1:9333/send  { "text": "...", "caption": "...", "image_base64": "..." }
 */
import http from "node:http";
import {
  sendTelegramViaAdb,
  sendTelegramPhotoViaAdb,
} from "./telegram-adb-send.mjs";

const PORT = Number(process.env.TELEGRAM_ADB_PORT || 9333);
const DEDUP_MS = 8_000;
const recent = new Map();
let busy = false;
const queue = [];

function shouldSend(key) {
  if (!key) return true;
  const now = Date.now();
  const last = recent.get(key);
  if (last && now - last < DEDUP_MS) return false;
  recent.set(key, now);
  for (const [k, t] of recent) {
    if (now - t > DEDUP_MS * 6) recent.delete(k);
  }
  return true;
}

async function processJob(body) {
  const text = String(body.text || body.caption || "").trim();
  const image = body.image_base64 || null;
  if (!text && !image) return { ok: false, error: "missing text" };

  if (!body.skip_dedup) {
    const key = body.dedup_key || text.slice(0, 100);
    if (!shouldSend(key)) return { ok: true, skipped: true };
  }

  if (image) {
    return sendTelegramPhotoViaAdb(text || "Visa Slot 4 screenshot", image);
  }
  return sendTelegramViaAdb(text);
}

function runQueue() {
  if (busy || !queue.length) return;
  busy = true;
  const { body, resolve, reject } = queue.shift();
  processJob(body)
    .then(resolve)
    .catch(reject)
    .finally(() => {
      busy = false;
      setTimeout(runQueue, 600);
    });
}

function enqueue(body) {
  return new Promise((resolve, reject) => {
    queue.push({ body, resolve, reject });
    runQueue();
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && (req.url === "/" || req.url === "/health")) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, service: "telegram-adb", port: PORT, busy, queued: queue.length }));
    return;
  }

  if (req.method !== "POST" || !["/send", "/telegram"].includes(req.url?.replace(/\?.*$/, "") || "")) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: false, error: "POST /send" }));
    return;
  }

  let raw = "";
  req.on("data", (chunk) => { raw += chunk; });
  req.on("end", async () => {
    try {
      const body = raw ? JSON.parse(raw) : {};
      const result = await enqueue(body);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    } catch (e) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: false, error: String(e.message || e) }));
    }
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Telegram ADB relay listening on http://127.0.0.1:${PORT}`);
  console.log("Phone must stay connected via USB with Telegram logged in.");
});
