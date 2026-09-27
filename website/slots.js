(() => {
  const API = "/contribute/community-slots";
  const REFRESH_MS = 60_000;
  const listEl = document.getElementById("slots-list");

  let rows = [];
  let loadError = "";
  let knownKeys = null; // null until first successful load
  let audioCtx = null;
  /** Temporary demo rows while the live feed is empty. */
  const USE_SAMPLE_WHEN_EMPTY = true;

  function esc(s) {
    return String(s || "").replace(/[&<>"]/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
    );
  }

  function rowKey(r) {
    return `${r.postId || r.city || ""}|${r.date || ""}`;
  }

  function sampleRows() {
    const now = Date.now();
    const ago = (ms) => {
      const d = new Date(now - ms);
      const sec = Math.floor(ms / 1000);
      let seenAgo = `${sec}s`;
      if (sec >= 86400) seenAgo = `${Math.floor(sec / 86400)}d`;
      else if (sec >= 3600) seenAgo = `${Math.floor(sec / 3600)}h`;
      else if (sec >= 60) seenAgo = `${Math.floor(sec / 60)}m`;
      return { seenAt: d.toISOString(), seenAgo };
    };
    return [
      {
        city: "CHENNAI VAC",
        postId: "sample-chennai",
        date: "2026-10-16",
        dateLabel: "16 Oct 2026",
        slots: "11:30 (46), 12:00 (45)",
        slotCount: 2,
        ...ago(11 * 60 * 1000),
      },
      {
        city: "HYDERABAD VAC",
        postId: "sample-hyd",
        date: "2026-10-14",
        dateLabel: "14 Oct 2026",
        slots: "14:00 (2)",
        slotCount: 1,
        ...ago(2 * 60 * 1000),
      },
      {
        city: "NEW DELHI VAC",
        postId: "sample-delhi",
        date: "2026-09-27",
        dateLabel: "27 Sep 2026",
        slots: "13:00 (9), 13:30 (8), 14:00 (6)",
        slotCount: 3,
        ...ago(5 * 60 * 1000),
      },
      {
        city: "MUMBAI VAC",
        postId: "sample-mumbai",
        date: "2026-11-03",
        dateLabel: "3 Nov 2026",
        slots: "10:00 (12), 10:30 (10)",
        slotCount: 2,
        ...ago(28 * 60 * 1000),
      },
      {
        city: "KOLKATA VAC",
        postId: "sample-kolkata",
        date: "2026-10-21",
        dateLabel: "21 Oct 2026",
        slots: "available",
        slotCount: 0,
        ...ago(75 * 60 * 1000),
      },
    ];
  }

  function getAudio() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      audioCtx = new AC();
    }
    return audioCtx;
  }

  async function unlockAudio() {
    try {
      const ctx = getAudio();
      if (ctx && ctx.state === "suspended") await ctx.resume();
    } catch {
      /* ignore */
    }
  }

  function playTik(when = 0) {
    try {
      const ctx = getAudio();
      if (!ctx) return;
      const t0 = Math.max(ctx.currentTime, when);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(1850, t0);
      osc.frequency.exponentialRampToValueAtTime(920, t0 + 0.045);
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.12, t0 + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.08);
    } catch {
      /* ignore */
    }
  }

  async function playTikForNew(count) {
    if (count <= 0) return;
    await unlockAudio();
    const ctx = getAudio();
    if (!ctx) return;
    const n = Math.min(count, 6);
    for (let i = 0; i < n; i++) {
      playTik(ctx.currentTime + i * 0.12);
    }
  }

  function formatArrived(iso, ago) {
    if (!iso) return ago ? `Arrived ${ago} ago` : "";
    try {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return ago ? `Arrived ${ago} ago` : "";
      const clock = d.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      return ago ? `Arrived ${clock} · ${ago} ago` : `Arrived ${clock}`;
    } catch {
      return ago ? `Arrived ${ago} ago` : "";
    }
  }

  function paint() {
    if (!listEl) return;

    if (loadError && !rows.length) {
      listEl.innerHTML = `<p class="slots-empty">${esc(loadError)}</p>`;
      return;
    }

    if (!rows.length) {
      listEl.innerHTML = `<p class="slots-empty">No dates yet.</p>`;
      return;
    }

    listEl.innerHTML = rows
      .map((r) => {
        const arrived = formatArrived(r.seenAt, r.seenAgo);
        return `
        <div class="slots-line" role="listitem">
          <span class="slots-line-city">${esc(r.city)}</span>
          <span class="slots-line-mid">
            <span class="slots-line-date">${esc(r.dateLabel || r.date)}</span>
            ${
              arrived
                ? `<span class="slots-line-arrived">${esc(arrived)}</span>`
                : ""
            }
          </span>
          <span class="slots-line-slots">${esc(r.slots || "available")}</span>
        </div>`;
      })
      .join("");
  }

  async function load() {
    try {
      const res = await fetch(API, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(15000),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error("load failed");
      rows = Array.isArray(data.rows) ? data.rows : [];
      // Fallback if older API without rows
      if (!rows.length && Array.isArray(data.cities)) {
        for (const c of data.cities) {
          for (const m of c.months || []) {
            for (const d of m.dates || []) {
              const day = String(d).padStart(2, "0");
              const iso = `${m.year}-${String(m.month).padStart(2, "0")}-${day}`;
              rows.push({
                city: c.name,
                date: iso,
                dateLabel: `${Number(d)} ${["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m.month]} ${m.year}`,
                slots: "available",
              });
            }
          }
        }
      }
      const usingSample = USE_SAMPLE_WHEN_EMPTY && !rows.length;
      if (usingSample) rows = sampleRows();
      loadError = "";

      const nextKeys = new Set(rows.map(rowKey));
      if (knownKeys === null) {
        knownKeys = nextKeys;
      } else if (!usingSample) {
        let added = 0;
        for (const k of nextKeys) {
          if (!knownKeys.has(k)) added++;
        }
        knownKeys = nextKeys;
        if (added > 0) playTikForNew(added);
      }
    } catch {
      if (USE_SAMPLE_WHEN_EMPTY) {
        rows = sampleRows();
        loadError = "";
        if (knownKeys === null) knownKeys = new Set(rows.map(rowKey));
      } else {
        loadError = "Could not load dates.";
      }
    }
    paint();
  }

  // Browsers block sound until the user interacts once.
  ["pointerdown", "keydown", "touchstart"].forEach((ev) => {
    window.addEventListener(ev, unlockAudio, { once: true, passive: true });
  });

  load();
  setInterval(load, REFRESH_MS);
})();
