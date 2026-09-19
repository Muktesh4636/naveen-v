/**
 * Runs in every frame (including Cloudflare Turnstile iframe).
 * Clicks "Verify you are human" and asks the service worker for a real mouse click.
 */
(function () {
  if (window.__vsCfFrameClick) return;
  window.__vsCfFrameClick = true;

  function findBox() {
    const label = document.querySelector(
      ".ctp-checkbox-label, label.ctp-checkbox-label, #challenge-stage label, .cb-lb"
    );
    if (label) return label;
    const nodes = document.querySelectorAll("label, span, div, p");
    for (const el of nodes) {
      const t = (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();
      if (/^verify you are human/i.test(t) && t.length < 48) return el;
    }
    return document.querySelector("#challenge-stage input[type='checkbox'], input[type='checkbox'][id*='cf']");
  }

  function tryClick() {
    const el = findBox();
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return;
    if (r.bottom < 0 || r.top > (window.innerHeight || 800)) return;
    try { el.click(); } catch (e) {}
    const input = el.matches?.("input") ? el : el.querySelector?.("input[type='checkbox']");
    try { input?.click(); } catch (e) {}
  }

  tryClick();
  setInterval(tryClick, 800);
})();
