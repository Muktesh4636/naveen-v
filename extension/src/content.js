import { handleCf1015, handleWaitingRoom } from "./content/cloudflare.js";
import { storePosts, storeProfile, syncDashboard } from "./content/reporting.js";
import { handleEvent, handleRequest } from "./content/responses.js";
import { applyClockMode, reserveRecheckButton, reserveWaitSlot, stopBeeping, playSubmitAlarm, maybeStartConsularOfcBookedAlarm, toggleClockMode } from "./content/scheduling-controls.js";
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
  getAccountId,
  disarmAiSubmit,
  freezeAllOps,
  AI_BOOK_SLOT_INDEX,
  triggerAutoSubmitIfArmed,
  thawOps,
  noteSubmitClicked,
  noteSubmitFailed,
} from "./content/ai-submit.js";
import { getSetting } from "./shared/config.js";
import { ensureRemoteConfig } from "./shared/remoteConfig.js";
import { startTimeSlotWatcher } from "./content/time-select.js";
import { handleNativeAlert, startHomeRecoveryLoop, startHomeSessionKeepalive, startOfcHomeKeepalive, startLoadingStuckHomeReload, maybeRefreshAfterResubmitContinue } from "./content/session-recovery.js";
import { startHumanClickTrain } from "./content/human-click-train.js";
import { startCloudflareWatch, stopCloudflareWatch } from "./content/cloudflare-tick.js";
import { startPortalErrorReloadWatch } from "./content/portal-error-reload.js";
import { injectStyles } from "./content/styles.js";
import { retirePrevious, vs } from "./shared/lifecycle.js";
import { watchExtensionContext } from "./shared/runtime.js";
import { DAT, ID, MSG, T, idSel } from "./shared/token.js";

retirePrevious();
removeStaleTikTikUi();
watchExtensionContext(() => {
  notifyExtensionDead();
  vs.destroy();
});

// Safe JSON config only (windows/timeouts) — never remote executable code.
ensureRemoteConfig();

// Always watch portal fatal error page (even before schedule UI mounts).
startPortalErrorReloadWatch();

// Interview / confirmation pages: stop Tik Tik only after a real booking confirmation.
if (isInterviewPage()) {
  getAccountId().then((id) => {
    if (id) return disarmAiSubmit(id);
    freezeAllOps();
  }).catch(() => freezeAllOps());
}

if (!isInterviewPage()) {

vs.disposable(() => {
  const anchor = document.querySelector(idSel(ID.anchor));
  const dropdown = document.querySelector("#post_select");
  if (anchor && dropdown) {
    anchor.replaceWith(dropdown);
  }
  for (const el of document.querySelectorAll("[data-" + DAT.mark + "]")) el.remove();
});

injectStyles();

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
      noteSubmitFailed(String(event.data?.text || "alert").slice(0, 120));
      return handleNativeAlert(event.data?.text);
    case MSG.sub:
      playSubmitAlarm();
      armSubmitErrorWatch();
      notifyTelegramSubmit();
      getArmedAiConfig().then((ai) => {
        noteSubmitClicked(ai?.accountId || null);
      }).catch(() => {
        noteSubmitClicked(null);
      });
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
// Focus / tab switch must NOT kill the 1-min consular OFC alarm.
vs.on(window, "focus", () => stopBeeping({ keepConsular: true }));
vs.on(document, "visibilitychange", () => {
  if (!document.hidden) stopBeeping({ keepConsular: true });
});

maybeStartConsularOfcBookedAlarm();

maybeRefreshAfterResubmitContinue();
startHomeRecoveryLoop();
startHomeSessionKeepalive();
startOfcHomeKeepalive();
startLoadingStuckHomeReload();
startHumanClickTrain();
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
watchCityRotate();

}
