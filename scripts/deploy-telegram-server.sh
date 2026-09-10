#!/usr/bin/env bash
# Deploy telegram relay + backend updates to the.gopg.online
set -euo pipefail

HOST="${DEPLOY_HOST:-root@72.61.148.117}"
APP="/var/www/the.gopg.online/backend"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "==> Packaging backend..."
tar -czf /tmp/visaslots-telegram-deploy.tar.gz \
  -C "$ROOT/backend" \
  contribute/telegram.py \
  contribute/views.py \
  contribute/urls.py

echo "==> Uploading..."
scp -o ConnectTimeout=25 -o StrictHostKeyChecking=no \
  /tmp/visaslots-telegram-deploy.tar.gz "$HOST:/tmp/visaslots-telegram-deploy.tar.gz"

echo "==> Installing on server..."
ssh -o ConnectTimeout=25 -o StrictHostKeyChecking=no "$HOST" bash -s << 'REMOTE'
set -euo pipefail
APP=/var/www/the.gopg.online/backend
cd "$APP"
tar -xzf /tmp/visaslots-telegram-deploy.tar.gz
rm -f /tmp/visaslots-telegram-deploy.tar.gz

# Ensure nginx proxies all /contribute/* paths (not just exact /contribute)
NGINX=/etc/nginx/sites-available/the.gopg.online
if grep -q 'location = /contribute' "$NGINX" 2>/dev/null; then
  sed -i 's|location = /contribute|location /contribute|' "$NGINX"
  nginx -t && systemctl reload nginx
  echo "nginx: updated /contribute proxy"
fi

systemctl restart visaslots.service
sleep 2
systemctl is-active visaslots.service
curl -sS -o /tmp/tg.json -w "telegram endpoint HTTP %{http_code}\n" \
  -X POST http://127.0.0.1:8050/contribute/telegram \
  -H 'Content-Type: application/json' \
  -d '{"text":"deploy ping","skip_dedup":true}'
cat /tmp/tg.json
REMOTE

echo "==> Done"
