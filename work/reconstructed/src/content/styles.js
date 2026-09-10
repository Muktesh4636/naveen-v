var CSS = `

#vs-selector-row {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 11em;
  gap: 0.5em;
  width: max-content;
  max-width: 100%;
  margin: 0.25em auto 0;
  align-items: center;
}
#wait-time {
  min-width: 0;
  font-size: 0.9em;
  cursor: pointer;
  user-select: none;
}
#recheck-btn {
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

#wait-time .vs-pill {
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  white-space: nowrap;
}

#wait-time .vs-pill-title {
  flex: 1;
  min-width: 0;
  padding: 0.35em 0.5em;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}

#wait-time .vs-pill-timer {
  display: flex;
  align-items: center;
  padding: 0.35em 0.55em;
  border-radius: 5px 0 0 5px;
  background: rgba(255, 255, 255, 0.25);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-variant-numeric: tabular-nums;
}

#wait-time .vs-pill-waiting { background-color: rgba(255, 0, 0, 0.35); color: #5c0000; }
#wait-time .vs-pill-done { background-color: #1a4480; color: white; }

#atlas-sidebar .vs-sidebar-link { background-color: #1a4480; color: white; }
#dates-para { margin: 0.5em 0; }

#dates-container .vs-dates-link { color: white; }
#vs-ofc-date { font-weight: bold; }

.vs-card {
  max-width: 400px;
  width: 100%;
  text-align: center;
  font-family: inherit;
}
#vs-history-container { margin: 15px auto 0; }
#vs-cooldown-card {
  margin: 20px auto 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 20px;
  box-sizing: border-box;
}

#vs-history-container .vs-card-title {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
}
#vs-history-container .vs-history-scroll {
  max-height: 250px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #ffffff;
}
#vs-history-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  color: #2d3748;
}
#vs-history-table thead tr {
  border-bottom: 1px solid #e2e8f0;
  background: #edf2f7;
  position: sticky;
  top: 0;
}
#vs-history-table th {
  padding: 6px 10px;
  text-align: center;
  font-weight: 600;
  color: #4a5568;
}
#vs-history-table tbody tr { border-bottom: 1px solid #e2e8f0; }
#vs-history-table td {
  padding: 6px 10px;
  text-align: center;
  color: #718096;
}

#vs-history-table td.vs-delta-down { color: #10b981; font-weight: 500; }
#vs-history-table td.vs-delta-up { color: #ef4444; font-weight: 500; }

#vs-cooldown-card .vs-card-title {
  margin: 0 0 12px 0;
  font-size: 12px;
  font-weight: 700;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
#vs-cooldown-time {
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin: 10px 0 15px;
  font-family: monospace, inherit;
}

#vs-cooldown-time.vs-cooldown-over { font-size: 20px; }
.vs-cooldown-divider {
  border-top: 1px solid #edf2f7;
  margin-top: 15px;
  padding-top: 12px;
}

.vs-footer { font-size: 11px; }
#vs-history-container .vs-footer { margin-top: 8px; }
#vs-cooldown-card .vs-footer { margin: 0; }

#vs-history-container .vs-footer a,
#vs-cooldown-card .vs-footer a {
  color: #1a4480;
  text-decoration: none;
  font-weight: 500;
}

.vs-hidden { display: none; }
`;
function injectStyles() {
  if (document.querySelector("#vs-styles")) return;
  const style = document.createElement("style");
  style.id = "vs-styles";
  style.dataset.vs = "";
  style.textContent = CSS;
  (document.head || document.documentElement).appendChild(style);
}
