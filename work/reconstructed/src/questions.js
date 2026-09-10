function currentUsername() {
  const input = document.querySelector(
    "input[id='signInName'], input[id='signInNameReadOnly']"
  );
  return input ? input.value : null;
}
function fillAnswers() {
  if (!chrome.runtime?.id) return;
  const username = currentUsername();
  if (!username) return;
  chrome.storage.local.get("autofill").then((storage) => {
    const answers = (storage.autofill || {})[username] || {};
    document.querySelectorAll("input").forEach((input) => {
      if (Object.hasOwn(answers, input.id)) {
        input.value = answers[input.id];
      }
    });
  });
}
function storeAnswers() {
  const continueBtn = document.querySelector("button#continue");
  const keysToStore = ["kba1_response", "kba2_response", "kba3_response"];
  continueBtn.addEventListener("click", () => {
    if (!chrome.runtime?.id) return;
    const username = currentUsername();
    if (!username) return;
    chrome.storage.local.get("autofill").then((storage) => {
      const autofill = storage.autofill || {};
      autofill[username] = autofill[username] || {};
      document.querySelectorAll("input").forEach((input) => {
        if (keysToStore.includes(input.id)) {
          autofill[username][input.id] = input.value;
        }
      });
      chrome.storage.local.set({ autofill });
    });
  });
}
function waitForPageLoad() {
  if (!chrome.runtime?.id) return;
  const continueBtn = document.querySelector("button#continue");
  if (continueBtn) {
    fillAnswers();
    storeAnswers();
  } else {
    setTimeout(waitForPageLoad, 1e3);
  }
}
window.addEventListener("load", waitForPageLoad);
