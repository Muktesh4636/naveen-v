# visaslots-extension

A buildable Chrome extension project reconstructed from the shipped VisaSlots.info
2.0.2 package. The runtime behaviour is unchanged: every bundle this project
produces is token-for-token equivalent to the corresponding file in the published
extension.

## Requirements

- Node.js 18 or newer
- `esbuild` (installed via `npm install`)

## Setup

```bash
npm install
npm run build
```

The build writes a loadable extension to `dist/`.

## Loading it in Chrome

1. Open `chrome://extensions`.
2. Enable **Developer mode** (top right).
3. Click **Load unpacked** and select the `dist/` directory.

Reload the extension from that page after each rebuild. Use `npm run watch` to
rebuild automatically while editing.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run build` | Clean build into `dist/` |
| `npm run watch` | Rebuild on change |
| `npm run check` | Verify every entry point resolves and parses, without writing files |

## Layout

```
src/
  content.js                     content script entry (usvisascheduling.com)
  history.js                     content script entry (visaslots.info)
  questions.js                   content script entry (atlasauth.b2clogin.com, optional)
  popup.js                       popup entry
  service-worker.js              MV3 background service worker
  shared/
    config.js                    URLs, tuning constants, storage accessors
    datetime.js                  duration and date formatting
    lifecycle.js                 Instance: scoped timers, listeners, teardown
  content/
    styles.js                    injected CSS
    cloudflare.js                waiting room, rate-limit and block handling
    scheduling-panels.js         sidebar links, date panels, OFC estimate
    scheduling-controls.js       wait pill, recheck button, audio alerts
    reporting.js                 profile/post scraping, contribution upload
    responses.js                 XHR response routing and dispatch
static/
  manifest.json                  copied verbatim into dist/
  popup/index.html, popup/style.css
  images/icon-128.png
```

## Build model

`src/` is authored as ES modules. esbuild bundles each entry point to IIFE
output, because MV3 content scripts and the popup's classic `<script>` tag cannot
consume ESM:

| Entry | Output |
| --- | --- |
| `src/content.js` | `dist/scripts/content.js` |
| `src/questions.js` | `dist/scripts/questions.js` |
| `src/history.js` | `dist/scripts/history.js` |
| `src/popup.js` | `dist/popup/script.js` |
| `src/service-worker.js` | `dist/service-worker.js` (copied, not bundled) |

The service worker has no cross-module imports, so it is copied verbatim to keep
it identical to the source rather than silently reformatted. `build.mjs` fails the
build if it ever gains an `import`, which is the signal to move it into `TARGETS`.

## Differences from the published package

- **`update_url` removed from the manifest.** The published manifest points Chrome
  at the Web Store for updates. Leaving it in a locally loaded build causes Chrome
  to try to replace your build with the store version.
- **`_metadata/verified_contents.json` omitted.** That is Google's signature over
  the published package, not source, and it is regenerated at publish time.
- **Module concatenation order** differs slightly from the original bundles. This
  is behaviourally inert: no module has top-level side effects that depend on
  another module having run first.

## Known defects carried over

This project deliberately reproduces the shipped behaviour, so the following
existing bugs are still present and are **not** fixed here:

- `content/scheduling-panels.js` assigns `profile.visa` into `anchor.innerHTML`,
  and `content.js` accepts `window.message` events without checking `event.origin`
  or `event.source`. Together these allow script injection on the portal page.
- `content/cloudflare.js` reads `interval` before initialisation when
  `Retry-After` is `0`, throwing a `ReferenceError`.
- `content/reporting.js` calls `.pop()` on a possibly-null regex match when
  scraping the account email.
- `content/responses.js` dereferences `parsed.params` when the request carries no
  `parameters` field.
- `questions.js` only registers on `window` `load`, which can fire before a
  `document_idle` content script runs, silently skipping autofill.

Fixing these changes behaviour relative to 2.0.2, so each should be a deliberate,
separately reviewed change.
