var pad = (n) => String(n).padStart(2, "0");
function formatDuration(totalSeconds) {
  const s = pad(totalSeconds % 60);
  const m = Math.floor(totalSeconds / 60) % 60;
  const h = Math.floor(totalSeconds / 3600);
  if (h) return `${pad(h)}:${pad(m)}:${s}`;
  return `${pad(m)}:${s}`;
}
function formatClock(now = /* @__PURE__ */ new Date()) {
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}
function formatMins(minutes) {
  const d = Math.floor(minutes / 1440);
  const h = Math.floor(minutes % 1440 / 60);
  const m = minutes % 60;
  const parts = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0 || d > 0) parts.push(`${h}h`);
  parts.push(`${m}m`);
  return parts.join(" ");
}
function formatOfcDate(str) {
  const date = new Date(str);
  if (isNaN(date)) return str;
  const parts = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("month")} ${get("day")} ${get("year")} ${get("hour")}:${get("minute")} ${get("dayPeriod")}`;
}
function parseTimeStr(timeStr) {
  const match = timeStr.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const seconds = parseInt(match[3], 10);
  const ampm = match[4];
  if (ampm) {
    if (ampm.toUpperCase() === "PM" && hours < 12) hours += 12;
    if (ampm.toUpperCase() === "AM" && hours === 12) hours = 0;
  }
  const date = /* @__PURE__ */ new Date();
  date.setHours(hours, minutes, seconds, 0);
  if (date.getTime() > Date.now() + 6e4) {
    date.setDate(date.getDate() - 1);
  }
  return date;
}
function formatAgo(ms) {
  const dd = Math.floor(ms / 864e5);
  const hh = Math.floor(ms % 864e5 / 36e5);
  const mm = Math.floor(ms % 36e5 / 6e4);
  const ss = Math.floor(ms % 6e4 / 1e3);
  if (dd > 0) return `${dd}d ${hh}h ago`;
  if (hh > 0) return `${hh}h ${mm}m ago`;
  return `${mm}m ${ss}s ago`;
}
