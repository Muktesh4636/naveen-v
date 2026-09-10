var Instance = class {
  constructor() {
    this.controller = new AbortController();
    this.timers = /* @__PURE__ */ new Set();
    this.styles = [];
    this.disposables = [];
  }
  get signal() {
    return this.controller.signal;
  }
  get alive() {
    return !this.signal.aborted && !!chrome.runtime?.id;
  }
  on(target, type, handler, options) {
    target.addEventListener(type, handler, { ...options, signal: this.signal });
  }
  setInterval(fn, ms) {
    const id = setInterval(() => {
      if (!this.alive) return this.clear(id);
      fn();
    }, ms);
    this.timers.add(id);
    return id;
  }
  setTimeout(fn, ms) {
    const id = setTimeout(() => {
      this.timers.delete(id);
      if (this.alive) fn();
    }, ms);
    this.timers.add(id);
    return id;
  }
  clear(id) {
    clearInterval(id);
    this.timers.delete(id);
  }
  setStyle(el, prop, value) {
    this.styles.push({ el, prop, previous: el.style[prop] });
    el.style[prop] = value;
  }
  disposable(fn) {
    this.disposables.push(fn);
  }
  waitFor(selector, { attempts = 20, interval = POLL_INTERVAL_MS } = {}) {
    return new Promise((resolve) => {
      const tick = (n) => {
        if (!this.alive) return;
        const found = document.querySelector(selector);
        if (found) return resolve(found);
        if (n >= attempts) return resolve(null);
        this.setTimeout(() => tick(n + 1), interval);
      };
      tick(0);
    });
  }
  destroy() {
    this.controller.abort();
    for (const id of this.timers) clearInterval(id);
    this.timers.clear();
    for (const { el, prop, previous } of this.styles.reverse()) {
      el.style[prop] = previous;
    }
    this.styles.length = 0;
    for (const dispose of this.disposables.splice(0)) {
      try {
        dispose();
      } catch (e) {
      }
    }
  }
};
var vs = new Instance();
function retirePrevious() {
  const previous = globalThis.__vs;
  globalThis.__vs = vs;
  previous?.destroy();
}
