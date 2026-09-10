import { ID, CLS, DAT, idSel, T } from "../shared/token.js";

// All selectors use per-load random tokens so the stylesheet is
// unrecognisable across sessions and scans.
export var CSS = `
#${ID.selRow} {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 11em;
  gap: 0.5em;
  width: max-content;
  max-width: 100%;
  margin: 0.25em auto 0;
  align-items: center;
}
#${ID.waitTime} {
  position: fixed;
  top: 12px;
  left: calc(100vw - 210px);
  z-index: 2147483647;
  width: max-content;
  max-width: 90vw;
  min-width: 160px;
  font-size: 0.9em;
  cursor: grab;
  user-select: none;
  touch-action: none;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.28);
  box-sizing: border-box;
  transition: left 0.25s ease, top 0.25s ease, box-shadow 0.2s ease;
}
#${ID.waitTime}[data-dragging] {
  cursor: grabbing;
  transition: none;
}
#${ID.waitTime}[data-dodging] {
  box-shadow: 0 0 0 2px #22c55e, 0 2px 12px rgba(0,0,0,0.35);
}
#${ID.recheck} {
  width: 100%;
  padding: 0.35em 0.8em;
  background-color: #1a4480;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  white-space: nowrap;
}

#${ID.waitTime} .${CLS.pill} {
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  white-space: nowrap;
}

#${ID.waitTime} .${CLS.pillTtl} {
  flex: 1;
  min-width: 0;
  padding: 0.35em 0.5em;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}

#${ID.waitTime} .${CLS.pillTmr} {
  display: flex;
  align-items: center;
  padding: 0.35em 0.55em;
  border-radius: 5px 0 0 5px;
  background: rgba(255, 255, 255, 0.25);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-variant-numeric: tabular-nums;
}

#${ID.waitTime} .${CLS.pillWait} { background-color: rgba(255, 0, 0, 0.35); color: #5c0000; }
#${ID.waitTime} .${CLS.pillDone} { background-color: #1a4480; color: white; }

#atlas-sidebar .${CLS.sideLink} { background-color: #1a4480; color: white; }
#${ID.datesPara} { margin: 0.5em 0; }

#${ID.datesCont} .${CLS.datesLnk} { color: white; }
#${ID.ofcDate} { font-weight: bold; }

.${CLS.card} {
  max-width: 400px;
  width: 100%;
  text-align: center;
  font-family: inherit;
}
#${ID.histCont} { margin: 15px auto 0; }
#${ID.cdCard} {
  margin: 20px auto 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 20px;
  box-sizing: border-box;
}

#${ID.histCont} .${CLS.cardTtl} {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
}
#${ID.histCont} .${CLS.histScrl} {
  max-height: 250px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #ffffff;
}
#${ID.histTbl} {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  color: #2d3748;
}
#${ID.histTbl} thead tr {
  border-bottom: 1px solid #e2e8f0;
  background: #edf2f7;
  position: sticky;
  top: 0;
}
#${ID.histTbl} th {
  padding: 6px 10px;
  text-align: center;
  font-weight: 600;
  color: #4a5568;
}
#${ID.histTbl} tbody tr { border-bottom: 1px solid #e2e8f0; }
#${ID.histTbl} td {
  padding: 6px 10px;
  text-align: center;
  color: #718096;
}

#${ID.histTbl} td.${CLS.dltDn} { color: #10b981; font-weight: 500; }
#${ID.histTbl} td.${CLS.dltUp} { color: #ef4444; font-weight: 500; }

#${ID.cdCard} .${CLS.cardTtl} {
  margin: 0 0 12px 0;
  font-size: 12px;
  font-weight: 700;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
#${ID.cdTime} {
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin: 10px 0 15px;
  font-family: monospace, inherit;
}

#${ID.cdTime}.${CLS.cdDiv}-over { font-size: 20px; }
.${CLS.cdDiv} {
  border-top: 1px solid #edf2f7;
  margin-top: 15px;
  padding-top: 12px;
}

.${CLS.footer} { font-size: 11px; }
#${ID.histCont} .${CLS.footer} { margin-top: 8px; }
#${ID.cdCard} .${CLS.footer} { margin: 0; }

#${ID.histCont} .${CLS.footer} a,
#${ID.cdCard} .${CLS.footer} a {
  color: #1a4480;
  text-decoration: none;
  font-weight: 500;
}

.${CLS.hidden} { display: none; }

#${ID.aiBtn} {
  width: 100%;
  padding: 0.35em 0.8em;
  background-color: #0f766e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  white-space: nowrap;
}
#${ID.aiBtn}.${CLS.aiOn} {
  background-color: #15803d;
  box-shadow: 0 0 0 2px #86efac;
}
#${ID.aiPanel} {
  max-width: 520px;
  margin: 0.5em auto 0;
  padding: 12px 14px;
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  font-size: 13px;
  color: #1e293b;
  text-align: left;
}
#${ID.aiPanel} .${CLS.cardTtl} {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 700;
  color: #0f766e;
}
#${ID.aiPanel} .${CLS.aiHint} {
  margin: 0 0 10px;
  font-size: 12px;
  line-height: 1.45;
  color: #475569;
}
#${ID.aiPanel} .${CLS.aiRow} {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 10px;
}
#${ID.aiPanel} label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #334155;
}
#${ID.aiPanel} input[type="date"] {
  padding: 4px 6px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 13px;
}
#${ID.aiPanel} button {
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
#${ID.aiConfirm} { background: #15803d; color: #fff; }
#${ID.aiCancel} { background: #64748b; color: #fff; }
#${ID.aiClose} { background: #e2e8f0; color: #334155; }
#${ID.aiSubmitBtn}, #${ID.aiCitiesBtn} {
  min-width: 140px;
  font-weight: 600;
}
#${ID.aiSubmitBtn} { background: #64748b; color: #fff; }
#${ID.aiCitiesBtn} { background: #64748b; color: #fff; }
#${ID.aiSubmitBtn}.${CLS.aiOnBtn} { background: #15803d; }
#${ID.aiCitiesBtn}.${CLS.aiOnBtn} { background: #0f766e; }
#${ID.aiStatus} { margin: 0; }
#${ID.aiPanel} .${CLS.aiCities} {
  max-height: 220px;
  overflow: auto;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 6px 8px;
  margin-bottom: 10px;
  background: #f8fafc;
}
#${ID.aiPanel} .${CLS.aiCityAct} {
  margin-left: 8px;
  padding: 0;
  border: none;
  background: none;
  color: #2563eb;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}
#${ID.aiPanel} .${CLS.aiCityAct}:hover {
  color: #1d4ed8;
}
#${ID.aiPanel} .${CLS.aiCities} label {
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  margin: 4px 0;
}
#${ID.aiPanel} .${CLS.aiCities} input[type="checkbox"] {
  margin: 0;
}
#${ID.aiPanel} input[type="text"],
#${ID.aiPanel} input[type="password"],
#${ID.aiPanel} input[type="email"],
#${ID.aiPanel} select {
  padding: 4px 6px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 13px;
  width: 100%;
  box-sizing: border-box;
}
#${ID.aiPanel} .${CLS.aiRow} label { flex: 1; min-width: 140px; }
#${ID.aiSaveLogin} { background: #334155; color: #fff; }

#${ID.cfHud} {
  position: fixed;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2147483646;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
#${ID.cfHud} .${CLS.cfHud} {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 300px;
  max-width: min(92vw, 420px);
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.94), rgba(30, 41, 59, 0.92));
  color: #e2e8f0;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.04) inset;
  backdrop-filter: blur(10px);
}
#${ID.cfHud} .${CLS.cfHud}[data-state="success"] {
  border-color: rgba(34, 197, 94, 0.45);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 24px rgba(34, 197, 94, 0.15);
}
#${ID.cfHud} .${CLS.cfHud}[data-state="manual"] {
  border-color: rgba(251, 191, 36, 0.45);
}
#${ID.cfHud} .${CLS.cfHud}[data-state="debugger"] {
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.32), 0 0 28px rgba(59, 130, 246, 0.18);
}
#${ID.cfHud} .${CLS.cfPulse} {
  width: 10px;
  height: 10px;
  margin-top: 5px;
  border-radius: 50%;
  background: #60a5fa;
  box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.55);
  animation: ${T}cfpulse 1.6s ease-out infinite;
  flex-shrink: 0;
}
#${ID.cfHud} .${CLS.cfHud}[data-state="success"] .${CLS.cfPulse} {
  background: #4ade80;
  animation: none;
  box-shadow: 0 0 12px rgba(74, 222, 128, 0.65);
}
#${ID.cfHud} .${CLS.cfHud}[data-state="manual"] .${CLS.cfPulse} {
  background: #fbbf24;
}
@keyframes ${T}cfpulse {
  0% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.55); }
  70% { box-shadow: 0 0 0 10px rgba(96, 165, 250, 0); }
  100% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0); }
}
#${ID.cfHud} .cf-hud-body { flex: 1; min-width: 0; }
#${ID.cfHud} .cf-hud-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
#${ID.cfHud} .cf-hud-icon { font-size: 14px; line-height: 1; }
#${ID.cfHud} .cf-hud-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #f8fafc;
}
#${ID.cfHud} .cf-hud-chip {
  margin-left: auto;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
  border: 1px solid rgba(96, 165, 250, 0.35);
}
#${ID.cfHud} .cf-hud-chip[data-state="success"] {
  background: rgba(34, 197, 94, 0.18);
  color: #86efac;
  border-color: rgba(74, 222, 128, 0.35);
}
#${ID.cfHud} .cf-hud-chip[data-state="manual"] {
  background: rgba(251, 191, 36, 0.15);
  color: #fcd34d;
  border-color: rgba(251, 191, 36, 0.35);
}
#${ID.cfHud} .cf-hud-msg {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.35;
  color: #f1f5f9;
}
#${ID.cfHud} .cf-hud-sub {
  margin-top: 3px;
  font-size: 11px;
  line-height: 1.35;
  color: #94a3b8;
}
.${CLS.cfFlash} {
  position: fixed;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid rgba(96, 165, 250, 0.85);
  box-shadow: 0 0 18px rgba(59, 130, 246, 0.55);
  z-index: 2147483647;
  pointer-events: none;
  animation: ${T}cfring 1.1s ease-out forwards;
}
@keyframes ${T}cfring {
  0% { transform: scale(0.6); opacity: 1; }
  100% { transform: scale(2.2); opacity: 0; }
}
`;

export function injectStyles() {
  if (document.querySelector(idSel(ID.styles))) return;
  const style = document.createElement("style");
  style.id = ID.styles;
  style.dataset[DAT.mark] = "";
  style.textContent = CSS;
  (document.head || document.documentElement).appendChild(style);
}
