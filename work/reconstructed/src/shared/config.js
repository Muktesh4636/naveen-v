var SITE_URL = "https://visaslots.info";
var CONTRIBUTE_URL = `${SITE_URL}/contribute`;
var POLL_INTERVAL_MS = 500;
var DASHBOARD_POLL_ATTEMPTS = 20;
var QUEUE_DETAIL_THRESHOLD_MINS = 240;
var QUEUE_HISTORY_MAX = 50;
var QUEUE_HISTORY_TTL_MS = 24 * 60 * 60 * 1e3;
var MAX_TOKEN_AGE_MS = 72 * 60 * 60 * 1e3;
var SETTING_DEFAULTS = {
  recheckButton: true,
  defaultWaitTime: 60,
  audioAlert: false,
  autoSelectFirstDate: false
};
function getSetting(key) {
  return chrome.storage.local.get({ [key]: SETTING_DEFAULTS[key] }).then((storage) => storage[key]);
}
function getPosts() {
  return chrome.storage.local.get({ posts: [] }).then((storage) => storage.posts);
}
function setPosts(posts) {
  return chrome.storage.local.set({ posts });
}
function getProfile() {
  return chrome.storage.local.get("profile").then((storage) => storage.profile);
}
