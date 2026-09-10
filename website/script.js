const ZIP_URL = "visa-book-extension.zip";
const modal = document.getElementById("install-modal");

function openModal() {
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".js-modal-close")?.focus?.();
}

function closeModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = "";
}

function startAddToChrome() {
  const a = document.createElement("a");
  a.href = ZIP_URL;
  a.download = "visa-book-extension.zip";
  document.body.appendChild(a);
  a.click();
  a.remove();
  openModal();
}

document.querySelectorAll(".js-add-chrome").forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();
    startAddToChrome();
  });
});

document.querySelectorAll(".js-modal-close").forEach((el) => {
  el.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hidden) closeModal();
});

const openExt = document.getElementById("open-extensions");
if (openExt) {
  openExt.addEventListener("click", (event) => {
    // Browsers block chrome:// navigation from web pages.
    event.preventDefault();
    navigator.clipboard?.writeText("chrome://extensions").catch(() => {});
    openExt.textContent = "Copied chrome://extensions";
    setTimeout(() => {
      openExt.textContent = "Open extensions page";
    }, 1800);
  });
}

const panel = document.querySelector(".install-panel");
if (panel && "IntersectionObserver" in window) {
  panel.style.opacity = "0";
  panel.style.transform = "translateY(16px)";
  panel.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        panel.style.opacity = "1";
        panel.style.transform = "translateY(0)";
        io.disconnect();
      }
    },
    { threshold: 0.2 }
  );
  io.observe(panel);
}
