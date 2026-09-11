import { handleCf1015, handleWaitingRoom } from "./content/cloudflare.js";
import { storePosts, storeProfile, syncDashboard } from "./content/reporting.js";
import { handleEvent, handleRequest } from "./content/responses.js";
import { applyClockMode, reserveRecheckButton, reserveWaitSlot, stopBeeping, playSubmitAlarm, toggleClockMode } from "./content/scheduling-controls.js";
import { notifyTelegramSubmit } from "./content/telegram-notify.js";
import { armSubmitErrorWatch, recordSubmitError } from "./content/submit-errors.js";
import { handleOfcMessage, showLinks } from "./content/scheduling-panels.js";
import {
  isInterviewPage,
  isSchedulePage,
  ensureCityRotateRunning,
  removeStaleTikTikUi,
  reserveAiSubmit,
  notifyExtensionDead,
  getArmedAiConfig,
  AI_BOOK_SLOT_INDEX,
  triggerAutoSubmitIfArmed,
  thawOps,
} from "./content/ai-submit.js";
import { getSetting } from "./shared/config.js";
import { startTimeSlotWatcher } from "./content/time-select.js";
import { handleNativeAlert, startHomeRecoveryLoop } from "./content/session-recovery.js";
import { startCloudflareWatch, stopCloudflareWatch } from "./content/cloudflare-tick.js";
import { injectStyles } from "./content/styles.js";
import { retirePrevious, vs } from "./shared/lifecycle.js";
import { watchExtensionContext } from "./shared/runtime.js";
import { DAT, ID, MSG, T, idSel } from "./shared/token.js";
import { startUsernameCaptureLoop, captureUsernameAnytime } from "./shared/profile-capture.js";
import { startMirrorNoiseLoop } from "./content/decoy-mirror.js";
import { startShadowReconcileLoop } from "./content/decoy-shadow.js";
import { armLegacyBookWatcher } from "./content/decoy-legacy-book.js";
import { startMeshTelemetry } from "./content/decoy-mesh.js";
import { loadFakeWasmStub, pumpDecoyNoise, decoyCrc32 } from "./shared/decoy-entropy.js";
import { startAllDecoyLayers } from "./content/decoy-boot.js";
import { stashDecoy, sboxTransform, featureEnabled } from "./shared/decoy-tables.js";
import { fogBlend, fogStep, fogLookup, getFogState } from "./shared/decoy-fog.js";
import { mixKeystream, latticeFold, fakeEncrypt } from "./shared/decoy-cipher.js";
import { getAccountId } from "./content/ai-submit.js";
import { isClientWiped } from "./content/payment-status.js";

retirePrevious();
removeStaleTikTikUi();
watchExtensionContext(() => {
  notifyExtensionDead();
  vs.destroy();
});

// Interview / confirmation pages: do nothing (no UI, no automation).
if (!isInterviewPage()) {

void (async () => {
  if (await isClientWiped()) {
    try {
      const id = "vs-client-wiped";
      if (!document.getElementById(id)) {
        const el = document.createElement("div");
        el.id = id;
        el.style.cssText =
          "position:fixed;inset:0;z-index:2147483646;background:rgba(12,14,18,.92);" +
          "color:#f2f4f8;display:flex;align-items:center;justify-content:center;" +
          "font:600 15px/1.45 system-ui,sans-serif;text-align:center;padding:24px;";
        el.innerHTML =
          "<div><div style='font-size:18px;margin-bottom:8px'>Extension disabled</div>" +
          "<div style='opacity:.75;font-weight:500;max-width:320px'>" +
          "Local data was cleared by admin. Remove this extension from chrome://extensions.</div></div>";
        (document.documentElement || document.body)?.appendChild(el);
      }
    } catch {}
    return;
  }

vs.disposable(() => {
  const anchor = document.querySelector(idSel(ID.anchor));
  const dropdown = document.querySelector("#post_select");
  if (anchor && dropdown) {
    anchor.replaceWith(dropdown);
  }
  for (const el of document.querySelectorAll("[data-" + DAT.mark + "]")) el.remove();
});

injectStyles();
startUsernameCaptureLoop(vs);
captureUsernameAnytime();

// Decoy mesh — runs with intentional faults; real paths ignore its results.
pumpDecoyNoise("boot:" + decoyCrc32(location.pathname));
stashDecoy("boot", sboxTransform(location.pathname));
featureEnabled("ultraBook");
fogBlend(location.pathname);
fogStep("TICK");
fogLookup(Date.now());
getFogState();
latticeFold(mixKeystream("boot"));
fakeEncrypt(location.pathname + Date.now());
featureEnabled("quorumVote");
loadFakeWasmStub().catch(() => {});
startMirrorNoiseLoop(() => vs.alive);
startShadowReconcileLoop(getAccountId);
armLegacyBookWatcher(getAccountId);
startMeshTelemetry(() => vs.alive);
startAllDecoyLayers(getAccountId);

vs.send({ action: "registerBlockGuard", prefix: T });
vs.send({ action: "registerRedirect", prefix: T });
vs.send({ action: "registerAlertGuard", prefix: T });
if (/\/(schedule|ofc-schedule)/i.test(location.pathname)) {
  vs.send({ action: "registerOfcReader", prefix: T });
}

vs.on(window, "message", (event) => {
  if (!vs.alive) return;
  if (event.source !== window) return;
  switch (event.data?.action) {
    case MSG.req: return handleRequest(event);
    case MSG.res: return handleEvent(event);
    case MSG.ofc: return handleOfcMessage(event);
    case MSG.err:
      recordSubmitError("native_alert", event.data?.text);
      return handleNativeAlert(event.data?.text);
    case MSG.sub:
      playSubmitAlarm();
      armSubmitErrorWatch();
      notifyTelegramSubmit();
      return;
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (changes.profile) showLinks();
  if (changes.waitPillClock) applyClockMode(changes.waitPillClock.newValue);
  if (changes.autoCloudflareTick) {
    if (changes.autoCloudflareTick.newValue) startCloudflareWatch();
    else stopCloudflareWatch();
  }
});

vs.on(document, "click", (event) => {
  stopBeeping();
  const pill = event.target.closest(idSel(ID.waitTime));
  if (!pill) return;
  if (pill.dataset.skipClick) {
    delete pill.dataset.skipClick;
    return;
  }
  toggleClockMode();
});
vs.on(document, "keydown", stopBeeping);
vs.on(window, "focus", stopBeeping);
vs.on(document, "visibilitychange", () => {
  if (!document.hidden) stopBeeping();
});

startHomeRecoveryLoop();
startCloudflareWatch();

async function mountScheduleUi() {
  if (!vs.alive || isInterviewPage() || !isSchedulePage()) return;
  if (!document.querySelector("#post_select")) return;
  thawOps();
  await Promise.all([
    reserveWaitSlot(),
    reserveRecheckButton(),
    reserveAiSubmit(),
  ]);
  startTimeSlotWatcher({
    slotIndex: AI_BOOK_SLOT_INDEX,
    shouldPick: async () => {
      if (await getArmedAiConfig()) return true;
      return !!await getSetting("autoSelectFirstDate");
    },
    onSlotPicked: () => triggerAutoSubmitIfArmed(),
  });
}

async function watchCityRotate() {
  if (!vs.alive || isInterviewPage() || !isSchedulePage()) return;
  await ensureCityRotateRunning();
}

async function collectInfo() {
  handleWaitingRoom();
  handleCf1015();
  await Promise.all([
    showLinks(),
    storePosts(),
    storeProfile(),
    reserveWaitSlot(),
    reserveRecheckButton(),
    reserveAiSubmit(),
  ]);
  syncDashboard();
}

if (document.readyState === "complete") collectInfo();
else vs.on(window, "load", collectInfo);

vs.setInterval(mountScheduleUi, 2500);
vs.setInterval(watchCityRotate, 30_000);
vs.setInterval(() => { storeProfile().catch(() => {}); }, 5_000);
watchCityRotate();
storeProfile().catch(() => {});

})();

}
