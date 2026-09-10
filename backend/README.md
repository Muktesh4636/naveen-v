# VisaSlots Backend

Django backend that receives data from the Chrome extension.

## Quick start

### 1. PostgreSQL — create the database

```bash
psql -U postgres -c "CREATE DATABASE visaslots;"
```

### 2. Backend — set up and run

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env           # edit .env with your DB password if needed

python manage.py migrate
python manage.py createsuperuser   # optional, for the admin UI
python manage.py runserver         # starts on http://localhost:8000
```

### 3. Extension — load it in Chrome

The extension is already built and points at `http://localhost:8000`.

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** → select `extension/dist/`
4. Disable the Web Store version of VisaSlots.info if it's installed

Now browse to `https://www.usvisascheduling.com`, log in, and check for
available dates. Data will start appearing in the database immediately.

---

## Admin UI

`http://localhost:8000/admin/` — log in with the superuser you created.

You can browse every Applicant, Contribution, and DashboardSnapshot row there.

---

## API

### `POST /contribute`

Both payload types the extension sends go to this single endpoint.

**Slot contribution** (sent after every date check):
```json
{
  "profile": { "id": "123456", "name": "John Smith", "email": "j@example.com", "visa": "B1/B2" },
  "posts": [{ "ID": "NEW", "Name": "Chennai", "Days": [...], "HasError": false }],
  "token": "<Azure AD JWT>"
}
```

**Dashboard sync** (sent on dashboard page load):
```json
{
  "profile": { ... },
  "dashboard": {
    "visa-information": "...",
    "fee-payment": "...",
    "appointment-confirmation": "..."
  },
  "token": "<Azure AD JWT>"
}
```

**Response** (same shape for both):
```json
{ "success": true, "contribs": 3 }
```
`contribs` = number of slot contributions from this applicant in the last 24 hours.
The extension shows this count in the popup badge.

---

## Database tables

| Table | What it holds |
|---|---|
| `contribute_applicant` | One row per applicant — name, email, ID, visa class, token |
| `contribute_contribution` | One row per slot check — post, available days, times |
| `contribute_dashboardsnapshot` | Snapshots of the dashboard cards |

---

## Changing the server URL

When you're ready to move off localhost, set `API_BASE` in
`extension/src/shared/config.js`, rebuild (`npm run build` in `extension/`),
and reload the extension.

```js
// extension/src/shared/config.js
export var API_BASE = "https://api.yoursite.com";
```
