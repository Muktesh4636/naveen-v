# Shelved: Auto Submit (Tik Tik)

Temporarily removed from the live extension (`src/` → `dist/`).
Restore later by copying these files back over the live ones and rebuilding.

| Shelved file        | Restore to                          |
|---------------------|-------------------------------------|
| `ai-submit.js`      | `src/content/ai-submit.js`          |
| `responses.js`      | `src/content/responses.js`          |
| `content.js`        | `src/content.js`                    |
| `config.js`         | `src/shared/config.js`              |
| `service-worker.js` | `src/service-worker.js` (optional)  |

```bash
cd extension
cp _shelved/auto-submit/ai-submit.js src/content/ai-submit.js
cp _shelved/auto-submit/responses.js src/content/responses.js
cp _shelved/auto-submit/content.js src/content.js
cp _shelved/auto-submit/config.js src/shared/config.js
# optional if you need bookTimeAndSubmitFast helpers:
# cp _shelved/auto-submit/service-worker.js src/service-worker.js
npm run build
```

This folder is **not** included in the Chrome extension package (`dist/`).
