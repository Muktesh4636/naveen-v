retirePrevious();
teardown();
injectStyles();
function teardown() {
  const anchor = document.querySelector("#vs-post-anchor");
  const dropdown = document.querySelector("#post_select");
  if (anchor && dropdown) {
    dropdown.style.width = anchor.dataset.vsWidth || "";
    dropdown.style.minWidth = anchor.dataset.vsMinWidth || "";
    anchor.replaceWith(dropdown);
  }
  for (const node of document.querySelectorAll("[data-vs]")) node.remove();
}
chrome.runtime.sendMessage({ action: "registerBlockGuard" });
chrome.runtime.sendMessage({ action: "registerRedirect" });
chrome.runtime.sendMessage({ action: "registerOfcReader" });
vs.on(window, "message", (event) => {
  if (!vs.alive) return;
  switch (event.data?.action) {
    case "redirectRequest":
      return handleRequest(event);
    case "redirectResponse":
      return handleEvent(event);
    case "ofcAppointments":
      return handleOfcMessage(event);
  }
});
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (changes.profile) showLinks();
  if (changes.waitPillClock) applyClockMode(changes.waitPillClock.newValue);
});
vs.on(document, "click", (event) => {
  stopBeeping();
  if (event.target.closest("#wait-time")) toggleClockMode();
});
vs.on(document, "keydown", stopBeeping);
vs.on(window, "focus", stopBeeping);
vs.on(document, "visibilitychange", () => {
  if (!document.hidden) stopBeeping();
});
async function collectInfo() {
  handleWaitingRoom();
  handleCf1015();
  await showLinks();
  await storePosts();
  await storeProfile();
  syncDashboard();
  reserveWaitSlot();
  reserveRecheckButton();
}
if (document.readyState === "complete") collectInfo();
else vs.on(window, "load", collectInfo);
