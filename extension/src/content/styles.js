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
#${ID.datesPara} { margin: 0.5em 0; line-height: 1.45; }

#${ID.datesCont} .${CLS.datesLnk} { color: white; }
#${ID.datesCont} .${CLS.slotsSum} {
  font-weight: 700;
  font-size: 1.05em;
  margin-bottom: 0.4em;
  color: #0b3d2e;
}
#${ID.datesCont} .${CLS.slotsTbl},
#${ID.slotsTbl} {
  width: auto;
  min-width: 220px;
  border-collapse: collapse;
  margin: 0.25em 0 0.5em;
  font-size: 0.95em;
}
#${ID.datesCont} .${CLS.slotsTbl} th,
#${ID.datesCont} .${CLS.slotsTbl} td,
#${ID.slotsTbl} th,
#${ID.slotsTbl} td {
  border: 1px solid #cbd5e0;
  padding: 0.3em 0.75em;
  text-align: left;
}
#${ID.datesCont} .${CLS.slotsTbl} th,
#${ID.slotsTbl} th {
  background: #edf2f7;
  font-weight: 600;
}
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
  padding: 0.45em 0.9em;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9em;
  font-weight: 600;
  white-space: nowrap;
}
#${ID.aiBtn}.${CLS.aiOn} {
  background-color: #22c55e;
  box-shadow: none;
}
#${ID.aiPanel} {
  width: min(100%, 560px);
  max-width: 560px;
  max-height: min(78vh, 660px);
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0.65em auto 0;
  padding: 14px;
  background: #e5e7eb;
  border: 1px solid #9ca3af;
  border-radius: 12px;
  box-shadow: none;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 15.5px;
  color: #1f2937;
  text-align: left;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
}
#${ID.aiPanel}.${CLS.hidden} {
  display: none !important;
}
#${ID.aiPanel} .${CLS.cardTtl} {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  position: sticky;
  top: 0;
  background: #e5e7eb;
  z-index: 2;
  padding: 2px 0 4px;
}
#${ID.aiPanel} .${CLS.aiHint} {
  margin: 0 0 8px;
  font-size: 14.5px;
  line-height: 1.5;
  color: #6b7280;
  font-weight: 400;
}
#${ID.aiPanel} .${CLS.aiHead} {
  font-weight: 700;
  color: #111827;
  font-size: 16px;
}
#${ID.aiPanel} .${CLS.aiRow} {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}
#${ID.aiPanel} .${CLS.aiSec} {
  margin: 0;
  padding: 16px 18px;
  background: #fff;
  border: 1.5px solid #111827;
  border-radius: 12px;
  box-sizing: border-box;
}
#${ID.aiTermsGate},
#${ID.aiMain} {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;
  padding: 0;
}
#${ID.aiTermsGate}.${CLS.hidden},
#${ID.aiMain}.${CLS.hidden} {
  display: none;
}
#${ID.aiPanel} .${CLS.aiInfo} {
  margin: 0 0 10px;
  padding: 10px 12px;
  background: #eff6ff;
  border: 1px solid #93c5fd;
  border-radius: 8px;
  color: #1e40af;
  font-size: 14.5px;
  line-height: 1.5;
}
#${ID.aiPanel} .${CLS.aiWarn} {
  margin: 0 0 10px;
  padding: 10px 12px;
  background: #fffbeb;
  border: 1px solid #f59e0b;
  border-radius: 8px;
  color: #92400e;
  font-size: 14.5px;
  line-height: 1.5;
}
#${ID.aiPanel} .${CLS.aiOk},
#${ID.aiStatus}.${CLS.aiOk} {
  margin: 0;
  padding: 10px 12px;
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 8px;
  color: #166534;
  font-size: 14.5px;
  line-height: 1.5;
}
#${ID.aiPanel} label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14.5px;
  font-weight: 600;
  color: #374151;
}
#${ID.aiPanel} input[type="text"],
#${ID.aiPanel} input[type="password"],
#${ID.aiPanel} input[type="email"],
#${ID.aiPanel} select {
  padding: 10px 12px;
  border: 1px solid #9ca3af;
  border-radius: 8px;
  font-size: 15.5px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  color: #111827;
  min-height: 42px;
}
#${ID.aiPanel} .${CLS.aiDateBtn} {
  width: 100%;
  min-height: 46px;
  padding: 10px 12px;
  border: 2px solid #3b82f6;
  border-radius: 10px;
  background: #fff;
  color: #111827;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;
}
#${ID.aiPanel} .${CLS.aiDateBtn}:hover {
  border-color: #2563eb;
  background: #eff6ff;
}
#${ID.aiCal} {
  position: fixed;
  z-index: 2147483646;
  width: min(100vw - 16px, 340px);
  padding: 14px;
  background: #fff;
  border: 1.5px solid #111827;
  border-radius: 12px;
  box-shadow: 0 10px 28px rgba(0,0,0,0.18);
  box-sizing: border-box;
  pointer-events: auto;
}
#${ID.aiCal}.${CLS.hidden} { display: none !important; }
#${ID.aiCal} .${CLS.aiCalHead} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
}
#${ID.aiCal} .${CLS.aiCalHead} .${CLS.aiHead} {
  font-size: 17px;
  margin: 0;
  flex: 1;
  text-align: center;
}
#${ID.aiCal} .${CLS.aiCalHead} button {
  min-width: 40px;
  min-height: 40px;
  padding: 0;
  background: #eef2ff;
  color: #1e40af;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
}
#${ID.aiCal} .${CLS.aiCalGrid} {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}
#${ID.aiCal} .${CLS.aiCalGrid} .${CLS.aiHint} {
  margin: 0;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: #6b7280;
  padding: 4px 0;
  pointer-events: none;
}
#${ID.aiCal} .${CLS.aiCalDay} {
  min-height: 42px;
  padding: 0;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #111827;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}
#${ID.aiCal} .${CLS.aiCalDay}:hover {
  background: #eff6ff;
  border-color: #93c5fd;
}
#${ID.aiCal} .${CLS.aiCalDay}.${CLS.aiCalMuted} {
  color: #9ca3af;
  font-weight: 500;
  background: #f9fafb;
}
#${ID.aiCal} .${CLS.aiCalDay}:disabled,
#${ID.aiCal} .${CLS.aiCalDay}[aria-disabled="true"] {
  opacity: 0.4;
  cursor: not-allowed;
  background: #f3f4f6;
  color: #9ca3af;
  pointer-events: none;
}
#${ID.aiCal} .${CLS.aiCalDay}.${CLS.aiCalToday} {
  border-color: #3b82f6;
}
#${ID.aiCal} .${CLS.aiCalDay}.${CLS.aiCalOn} {
  background: #3b82f6;
  border-color: #2563eb;
  color: #fff;
}
#${ID.aiCal} .${CLS.aiRow} {
  margin: 12px 0 0;
  justify-content: space-between;
}
#${ID.aiCal} .${CLS.aiRow} button {
  background: #eef0f3;
  color: #111827;
  min-height: 40px;
  font-size: 14.5px;
  cursor: pointer;
}
#${ID.aiPanel} input[type="text"]:focus,
#${ID.aiPanel} input[type="password"]:focus,
#${ID.aiPanel} input[type="email"]:focus,
#${ID.aiPanel} select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: none;
}
#${ID.aiPanel} button {
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14.5px;
  font-weight: 600;
}
#${ID.aiClose} { background: #eef0f3; color: #374151; }
#${ID.aiSaveLogin} { background: #374151; color: #fff; }
#${ID.aiWinAdd}, #${ID.aiWinSave} { background: #3b82f6; color: #fff; }
#${ID.aiWinReset} { background: #eef0f3; color: #374151; }
#${ID.aiLoginToggle} { background: #eef0f3; color: #111827; }

#${ID.aiPanel} .${CLS.aiQl} {
  margin-top: 4px;
  padding: 14px 14px 12px;
  border: 1px solid #111827;
  border-radius: 10px;
  background: #fff;
}
#${ID.aiPanel} .${CLS.aiQlTitle} {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
}
#${ID.aiPanel} .${CLS.aiQlSub} {
  margin: 4px 0 12px;
  font-size: 12px;
  color: #64748b;
  line-height: 1.35;
}
#${ID.aiPanel} .${CLS.aiQlCard} {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 0;
  border-top: 1px solid #e2e8f0;
}
#${ID.aiPanel} .${CLS.aiQlCard}:first-child {
  border-top: none;
  padding-top: 2px;
}
#${ID.aiPanel} .${CLS.aiQlMeta} {
  min-width: 0;
  flex: 1;
}
#${ID.aiPanel} .${CLS.aiQlMeta} strong {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  word-break: break-word;
}
#${ID.aiPanel} .${CLS.aiQlMeta} span {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  color: #64748b;
}
#${ID.aiPanel} .${CLS.aiQlBadge} {
  flex-shrink: 0;
  margin-top: 2px;
  padding: 4px 8px;
  border-radius: 6px;
  background: #16a34a;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}
#${ID.aiPanel} .${CLS.aiQlEdit} {
  display: inline-block;
  margin-top: 6px;
  padding: 0;
  border: none;
  background: none;
  color: #2563eb;
  font-size: 12px;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
}
#${ID.aiPanel} .${CLS.aiQlEdit}:hover { color: #1d4ed8; }
#${ID.aiPanel} .${CLS.aiQlAdd} {
  width: 100%;
  margin-top: 10px;
  padding: 10px 12px;
  border: 1px solid #111827;
  border-radius: 8px;
  background: #fff;
  color: #0f172a;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
#${ID.aiPanel} .${CLS.aiQlAdd}:hover { background: #f8fafc; }
#${ID.aiPanel} .${CLS.aiQlEmpty} {
  margin: 0 0 4px;
  font-size: 12px;
  color: #64748b;
}

#${ID.aiPanel} .${CLS.aiSwitch} {
  position: relative;
  width: 48px;
  height: 28px;
  min-width: 48px;
  padding: 0;
  border-radius: 999px;
  background: #d1d5db;
  border: none;
  flex-shrink: 0;
  transition: background 0.15s ease;
}
#${ID.aiPanel} .${CLS.aiSwitch}.${CLS.aiOnBtn} {
  background: #3b82f6;
  box-shadow: none;
}
#${ID.aiPanel} .${CLS.aiKnob} {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  transition: transform 0.15s ease;
  pointer-events: none;
}
#${ID.aiPanel} .${CLS.aiSwitch}.${CLS.aiOnBtn} .${CLS.aiKnob} {
  transform: translateX(20px);
}

#${ID.aiStatus} { margin: 0; }
#${ID.aiPanel} .${CLS.aiCities} {
  max-height: 150px;
  overflow: auto;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 10px;
  margin-bottom: 0;
  background: #f9fafb;
}
#${ID.aiPanel} .${CLS.aiCityAct} {
  margin-left: 8px;
  padding: 0;
  border: none;
  background: none;
  color: #3b82f6;
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}
#${ID.aiPanel} .${CLS.aiCityAct}:hover { color: #2563eb; }
#${ID.aiPanel} .${CLS.aiCities} label {
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  margin: 5px 0;
  color: #1f2937;
  font-size: 14.5px;
}
#${ID.aiPanel} .${CLS.aiCities} input[type="checkbox"] {
  margin: 0;
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
}
#${ID.aiPanel} .${CLS.aiRow} label { flex: 1; min-width: 140px; }

#${ID.aiWinList} {
  display: grid;
  gap: 10px;
  margin: 0 0 6px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
}
#${ID.aiPanel} .${CLS.aiWinRow} {
  display: grid;
  gap: 4px;
  padding: 12px;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}
#${ID.aiPanel} .${CLS.aiWinRow}:last-child {
  padding-bottom: 12px;
}
#${ID.aiPanel} .${CLS.aiInline} {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
#${ID.aiPanel} .${CLS.aiInline} select {
  width: auto;
  min-width: 96px;
  flex: 0 0 auto;
  font-size: 15.5px;
  font-weight: 500;
  border: 1px solid #9ca3af;
  border-radius: 8px;
  background: #fff;
  min-height: 42px;
}
#${ID.aiPanel} .${CLS.aiInline} .${CLS.aiHead} {
  margin: 0;
  flex-direction: row;
  font-size: 14.5px;
}
#${ID.aiPanel} .${CLS.aiWinHelp} {
  font-size: 14.5px;
  color: #6b7280;
  margin-left: 2px;
}
#${ID.aiPanel} .${CLS.aiTrash} {
  margin-left: auto;
  padding: 7px;
  background: transparent;
  color: #ef4444;
  border: none;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
#${ID.aiPanel} .${CLS.aiTrash}:hover { background: #fef2f2; }
#${ID.aiWinNote} { margin: 0 0 8px; font-size: 14.5px; color: #6b7280; }

#${ID.aiPanel} .${CLS.aiTerms} {
  margin: 0;
  padding: 18px 16px;
  background: #fff;
  border: 1.5px solid #111827;
  border-radius: 12px;
  font-size: 14.5px;
  line-height: 1.55;
  color: #374151;
  box-sizing: border-box;
}
#${ID.aiPanel} .${CLS.aiTerms} .${CLS.aiHead} {
  margin: 0 0 6px;
  font-size: 20px;
  text-align: center;
}
#${ID.aiPanel} .${CLS.aiTerms} .${CLS.aiHint} {
  text-align: center;
  margin: 0 0 14px;
}
#${ID.aiPanel} .${CLS.aiTermsList} {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  display: grid;
  gap: 10px;
}
#${ID.aiPanel} .${CLS.aiTermsList} li {
  margin: 0;
  padding: 12px 14px 12px 42px;
  position: relative;
  background: #f8fafc;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  color: #1f2937;
  font-size: 14.5px;
  line-height: 1.5;
}
#${ID.aiPanel} .${CLS.aiTermsList} li::before {
  content: "";
  position: absolute;
  left: 14px;
  top: 14px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #3b82f6;
  box-shadow: inset 0 0 0 4px #dbeafe;
}
#${ID.aiPanel} .${CLS.aiTermsCb} {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  font-weight: 600;
  color: #111827;
  cursor: pointer;
  padding: 10px 12px;
  border: 1px solid #93c5fd;
  border-radius: 10px;
  background: #eff6ff;
  margin-bottom: 12px;
}
#${ID.aiPanel} .${CLS.aiTermsCb} input[type="checkbox"] {
  margin: 2px 0 0;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  accent-color: #3b82f6;
}
#${ID.aiPanel} .${CLS.aiContinue} {
  width: 100%;
  padding: 12px 16px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15.5px;
  font-weight: 700;
  cursor: pointer;
}
#${ID.aiPanel} .${CLS.aiContinue}:disabled {
  background: #94a3b8;
  cursor: not-allowed;
  opacity: 0.75;
}
#${ID.aiTermsContinue}:not(:disabled) {
  background: #2563eb;
}

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

/* Sample A — Tik Tik status HUD (bottom-right) */
#${ID.hud}.${CLS.hud} {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 2147483646;
  width: 360px;
  max-width: calc(100vw - 20px);
  max-height: calc(100vh - 32px);
  overflow: auto;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 14px 36px rgba(11, 58, 110, 0.28);
  font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  color: #0f172a;
  pointer-events: auto;
}
#${ID.hud} .${CLS.hudHead} {
  background: #0b3a6e;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 12px 18px;
}
#${ID.hud} .${CLS.hudName} {
  font-size: 18px;
  font-weight: 800;
  padding: 16px 18px 0;
  line-height: 1.3;
}
#${ID.hud} .${CLS.hudVisa} {
  font-size: 14px;
  color: #64748b;
  padding: 4px 18px 12px;
}
#${ID.hud} .${CLS.hudBody} {
  padding: 0 18px 12px;
  min-height: 0;
}
#${ID.hud} .${CLS.hudCount} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  background: #eef4fb;
  border: 1px solid #c7d7ee;
  border-radius: 10px;
}
#${ID.hud} .${CLS.hudCountLabel} {
  font-size: 14px;
  color: #334155;
  font-weight: 600;
}
#${ID.hud} .${CLS.hudSecs} {
  font-size: 36px;
  font-weight: 800;
  color: #0b3a6e;
  letter-spacing: -0.03em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
#${ID.hud} .${CLS.hudStuck} {
  padding: 14px 16px;
  background: #f8fafc;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  color: #334155;
}
#${ID.hud} .${CLS.hudSubmit} {
  padding: 14px 16px;
  background: #fff7ed;
  border: 1px solid #fdba74;
  border-radius: 10px;
}
#${ID.hud} .${CLS.hudSubmitTitle} {
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #c2410c;
}
#${ID.hud} .${CLS.hudSubmitSub} {
  margin-top: 4px;
  font-size: 13px;
  color: #9a3412;
}
#${ID.hud} .${CLS.hudCities} {
  display: none !important;
}
#${ID.hud} .${CLS.hudCitiesTitle},
#${ID.hud} .${CLS.hudHistTitle} {
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 8px;
}
#${ID.hud} .${CLS.hudCityLabel} {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  line-height: 1.35;
  color: #0f172a;
  padding: 4px 0;
  cursor: pointer;
  user-select: none;
}
#${ID.hud} .${CLS.hudCityLabel} input {
  margin-top: 2px;
  flex-shrink: 0;
  width: 15px;
  height: 15px;
  cursor: pointer;
}
#${ID.hud} .${CLS.hudHist} {
  border-top: 1px solid #e2e8f0;
  padding: 12px 18px 16px;
}
#${ID.hud} .${CLS.hudHistRow} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 13px;
  padding: 5px 0;
  color: #0f172a;
}
#${ID.hud} .${CLS.hudHistRow} > span:first-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
#${ID.hud} .${CLS.hudPillOk},
#${ID.hud} .${CLS.hudPillNo} {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 999px;
}
#${ID.hud} .${CLS.hudPillOk} {
  background: #dcfce7;
  color: #166534;
}
#${ID.hud} .${CLS.hudPillNo} {
  background: #f1f5f9;
  color: #64748b;
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
