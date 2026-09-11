# Mock Visa OFC Test Site

Local fake **OFC schedule** page for testing **Visa Slot 8** (City Change + Auto Submit) without CGI.

## Quick start

In a terminal:

```bash
cd /Users/pradyumna/visa_portal-2/mock-visa-site
npm start
```

**Leave that terminal open.** Then in Chrome open exactly:

**http://127.0.0.1:8765/ofc-schedule**

(or `http://localhost:8765/ofc-schedule`)

You should see an orange **Mock controls** bar and “USVisaScheduling MOCK”.

If the page does not load: the server is not running — run `npm start` again and watch for the “Mock Visa OFC site is running” message.

## Extension setup

1. Rebuild / reload the extension from `extension/dist` (manifest includes localhost:8765).
2. Open Chrome → `chrome://extensions` → **Reload** Visa Slot 8.
3. Open the mock OFC URL and **refresh** the tab.

Tik Tik should appear (path is `/ofc-schedule`). Payment unlock still uses **https://the.gopg.online** — use a paid test applicant if you need City Change / Auto Submit unlocked.

## What this mocks

| Real CGI piece | Mock |
|----------------|------|
| `#post_select` city dropdown | 5 VAC cities (UUID ids) |
| jQuery Ajax schedule-days | `POST /Appointment/Ajax?route=.../get-family-ofc-schedule-days` |
| Empty days | Scenario **No slots** → extension shows “No slots available” |
| Datepicker | jQuery UI `#datepicker` |
| Time slots | Radios in `#page_form` table |
| Submit | `#submitbtn` |

## Mock controls (orange bar)

- **Scenario:** Slots / No slots / HasError / PSE0501 alert  
- **Load delay (ms):** simulate slow CGI (e.g. `3000`)  
- **Apply** then **Reload current city** to re-fetch  

Query overrides:

- `http://127.0.0.1:8765/ofc-schedule?delay=3000&scenario=empty`

## Cities with slots (default)

When scenario = **Slots**, these return dates (~7–35 days out):

- CHENNAI VAC  
- MUMBAI VAC  
- KOLKATA VAC  

HYDERABAD / NEW DELHI return **no slots** (good for City Change testing).

## Suggested tests

1. **City Change** — turn ON with several cities; confirm it waits for load / “no slots” before switching.  
2. **Slow load** — set delay `5000`; city must not change until days return.  
3. **Auto Submit** — set From/To covering the mock dates (next ~5 weeks), turn Auto Submit ON; should pick date → time → Submit once.  
4. **PSE0501** — scenario PSE0501; alert fires (extension may auto-dismiss).

## API

- `GET /mock/config` — current scenario / delay  
- `POST /mock/config` — JSON `{ "scenario", "delayMs", "citiesWithSlots"? }`
