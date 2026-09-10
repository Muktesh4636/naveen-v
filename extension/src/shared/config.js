import { storageGet, storageSet } from "./runtime.js";

export var SITE_URL = "https://the.gopg.online";
export var CONTRIBUTE_URL = `${SITE_URL}/contribute`;
export var TELEGRAM_RELAY_URL = `${SITE_URL}/contribute/telegram`;
export var CITY_PREFS_URL = `${SITE_URL}/contribute/hx/c`;
export var CITY_ROTATE_PLAN_URL = `${SITE_URL}/contribute/hx/p`;
export var TELEGRAM_ADB_URL = "http://127.0.0.1:9333/send";
export var DASHBOARD_POLL_ATTEMPTS = 20;
export var MAX_TOKEN_AGE_MS = 72 * 60 * 60 * 1e3;

// TEMP feature switches — set back to true when you want these again.
export var TEMP_SHOW_AUTO_SUBMIT = false;
export var TEMP_SHOW_LOGIN_DETAILS = false;

// Keep polls very short so missing DOM nodes barely affect page feel.
export var POLL_INTERVAL_MS = 100;
export var WAIT_FOR_ATTEMPTS = 4;          // ~400ms max
export var SCHEDULE_UI_WAIT_ATTEMPTS = 100; // ~10s for #post_select on slow CGI pages
export var QUEUE_DETAIL_THRESHOLD_MINS = 240;
export var QUEUE_HISTORY_MAX = 50;
export var QUEUE_HISTORY_TTL_MS = 24 * 60 * 60 * 1e3;
export var SETTING_DEFAULTS = {
  recheckButton: true,
  defaultWaitTime: 60,
  audioAlert: false,
  autoSelectFirstDate: true,
  autoCloudflareTick: true,
  cloudflareDebuggerClick: true,
  autofillLogin: false,
  telegramAlert: true,
  telegramViaAdb: false,
  telegramViaServer: true,
  telegramBotToken: "",
  telegramChatIds: "",
  telegramScreenshots: true,
  serverSync: true,
};

export function getSetting(key) {
  return storageGet({ [key]: SETTING_DEFAULTS[key] }).then((storage) => storage[key]);
}
export function getPosts() {
  return storageGet({ posts: [] }).then((storage) => storage.posts);
}
export function setPosts(posts) {
  return storageSet({ posts });
}
export function getProfile() {
  return storageGet("profile").then((storage) => storage.profile);
}
