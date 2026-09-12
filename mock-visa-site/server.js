#!/usr/bin/env node
/**
 * Mock OFC HTTP server — serves static pages and CGI-shaped Ajax endpoints.
 */
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 8765;
const HOST = process.env.HOST || "0.0.0.0";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const CITIES_WITH_SLOTS = new Set([
  "3f6bf614-b0db-ec11-a7b4-001dd80234f6", // Chennai
  "466bf614-b0db-ec11-a7b4-001dd80234f6", // Mumbai
  "4a6bf614-b0db-ec11-a7b4-001dd80234f6", // Kolkata
]);

let config = {
  scenario: "slots",
  delayMs: 1500,
};

function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
    "Cache-Control": "no-store",
  });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function parseParams(body, contentType) {
  if (!body) return {};
  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  const params = new URLSearchParams(body);
  const raw = params.get("parameters");
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  return Object.fromEntries(params.entries());
}

function scheduleDays(postId) {
  if (config.scenario === "empty") return [];
  if (config.scenario === "error") {
    return { HasError: true, ErrorString: "Mock HasError scenario" };
  }
  if (config.scenario === "pse0501") {
    return {
      HasError: true,
      ErrorString: "Unable to load appointment available days",
      _mockAlert: "PSE0501 — Unable to load appointment available days (mock)",
    };
  }
  if (!CITIES_WITH_SLOTS.has(String(postId || ""))) return [];
  const days = [];
  const base = new Date();
  base.setHours(12, 0, 0, 0);
  for (let i = 7; i <= 35; i += 3) {
    const d = new Date(base);
    d.setDate(d.getDate() + i);
    days.push({
      Date: d.toISOString().slice(0, 10) + "T00:00:00",
    });
  }
  return days;
}

function scheduleEntries(dateISO) {
  const times = ["08:30", "09:00", "09:30", "10:00", "10:30", "11:00"];
  return times.map((Time, i) => ({
    Time,
    EntriesAvailable: 3 - (i % 3),
    Date: dateISO,
  }));
}

function withDelay(fn) {
  const ms = Math.max(0, Number(config.delayMs) || 0);
  return new Promise((resolve) => {
    setTimeout(() => resolve(fn()), ms);
  });
}

function serveStatic(req, res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "127.0.0.1"}`);
  const pathname = decodeURIComponent(url.pathname);

  if (pathname === "/mock/config" && req.method === "GET") {
    return sendJson(res, 200, config);
  }

  if (pathname === "/mock/config" && req.method === "POST") {
    const body = await readBody(req);
    let next = {};
    try {
      next = JSON.parse(body || "{}");
    } catch {
      next = {};
    }
    if (next.scenario) config.scenario = String(next.scenario);
    if (next.delayMs != null) config.delayMs = Number(next.delayMs) || 0;
    return sendJson(res, 200, config);
  }

  if (
    pathname.startsWith("/Appointment/Ajax") &&
    req.method === "POST"
  ) {
    const body = await readBody(req);
    const params = parseParams(body, req.headers["content-type"] || "");
    const route = url.searchParams.get("route") || "";

    if (route.endsWith("get-family-ofc-schedule-days")) {
      const result = await withDelay(() => {
        const days = scheduleDays(params.postId);
        if (days && days.HasError) return days;
        return { ScheduleDays: days, HasError: false };
      });
      return sendJson(res, 200, result);
    }

    if (route.endsWith("get-family-ofc-schedule-entries")) {
      const result = await withDelay(() => ({
        ScheduleEntries: scheduleEntries(String(params.Date || "")),
        HasError: false,
      }));
      return sendJson(res, 200, result);
    }

    return sendJson(res, 404, { HasError: true, ErrorString: "Unknown route" });
  }

  let rel = pathname;
  if (rel === "/") rel = "/ofc-schedule/";
  if (rel.endsWith("/")) rel += "index.html";

  const filePath = path.join(ROOT, rel.replace(/^\/+/, ""));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }
  return serveStatic(req, res, filePath);
});

server.listen(PORT, HOST, () => {
  console.log("Mock Visa OFC site is running.");
  console.log(`  Open: http://127.0.0.1:${PORT}/ofc-schedule`);
  console.log(`  Or:   http://localhost:${PORT}/ofc-schedule`);
  console.log(`  Config: scenario=${config.scenario} delayMs=${config.delayMs}`);
});
