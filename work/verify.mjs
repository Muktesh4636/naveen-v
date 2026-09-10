// Minimal reproductions of three suspected defects, isolated from the extension.

console.log("--- 1. handleCf1015 TDZ when Retry-After is 0 ---");
function handleCf1015(retryAfter) {
  const timeSpan = { textContent: "", classList: { add() {} } };
  const vs = { setInterval: () => 1, clear: () => {} };
  let remaining = retryAfter;
  const updateTimer = () => {
    if (remaining > 0) {
      timeSpan.textContent = String(remaining);
      remaining--;
    } else {
      timeSpan.classList.add("vs-cooldown-over");
      timeSpan.textContent = "You can try refreshing now!";
      vs.clear(interval); // referenced before `const interval` is initialized
    }
  };
  updateTimer(); // called synchronously, before the declaration below
  const interval = vs.setInterval(updateTimer, 1000);
  return interval;
}
try {
  handleCf1015(30);
  console.log("Retry-After: 30  -> ok");
} catch (e) {
  console.log("Retry-After: 30  -> " + e.constructor.name + ": " + e.message);
}
try {
  handleCf1015(0);
  console.log("Retry-After: 0   -> ok");
} catch (e) {
  console.log("Retry-After: 0   -> " + e.constructor.name + ": " + e.message);
}

console.log("\n--- 2. storeProfile email regex on a null match ---");
function extractEmail(scriptText) {
  const regex = /setAuthenticatedUserContext\('([^']*)'\)/;
  return scriptText.match(regex).pop();
}
for (const [label, text] of [
  ["matching markup", "appInsights.setAuthenticatedUserContext('a@b.com')"],
  ["renamed/absent call", "appInsights.setAuthenticatedUserContext(\"a@b.com\")"],
]) {
  try {
    console.log(label.padEnd(22) + " -> " + extractEmail(text));
  } catch (e) {
    console.log(label.padEnd(22) + " -> " + e.constructor.name + ": " + e.message);
  }
}

console.log("\n--- 3. parseEvent on a message with no `parameters` field ---");
function parseEvent(data) {
  const request = new URLSearchParams(data.request);
  const params = JSON.parse(request.get("parameters"));
  return { params, response: data.response };
}
for (const [label, data] of [
  ["well-formed", { request: "parameters=" + encodeURIComponent('{"postId":"1"}') }],
  ["missing parameters", { request: "other=1" }],
  ["malformed json", { request: "parameters=%7Bnope" }],
]) {
  try {
    const out = parseEvent(data);
    // the SCHEDULE_DAYS branch immediately does parsed.params.postId
    console.log(label.padEnd(22) + " -> params=" + JSON.stringify(out.params) + ", .postId=" + out.params.postId);
  } catch (e) {
    console.log(label.padEnd(22) + " -> " + e.constructor.name + ": " + e.message);
  }
}
