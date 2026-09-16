#!/usr/bin/env bash
# Deploy extension-check (folder upload) backend + site to the.gopg.online
set -euo pipefail

HOST="${DEPLOY_HOST:-root@72.61.148.117}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/folder-upload"

echo "==> Packaging folder-upload..."
tar -czf /tmp/extension-check-deploy.tar.gz \
  -C "$SRC" \
  server.py wsgi.py requirements.txt static

echo "==> Uploading..."
scp -o ConnectTimeout=25 -o StrictHostKeyChecking=no \
  /tmp/extension-check-deploy.tar.gz "$HOST:/tmp/extension-check-deploy.tar.gz"

echo "==> Installing on server..."
ssh -o ConnectTimeout=25 -o StrictHostKeyChecking=no "$HOST" bash -s << 'REMOTE'
set -euo pipefail
APP=/var/www/extension-check
mkdir -p "$APP/uploads"
cd "$APP"
tar -xzf /tmp/extension-check-deploy.tar.gz
rm -f /tmp/extension-check-deploy.tar.gz

if [[ ! -d "$APP/venv" ]]; then
  python3 -m venv "$APP/venv"
fi
"$APP/venv/bin/pip" install -q --upgrade pip
"$APP/venv/bin/pip" install -q -r "$APP/requirements.txt"

chown -R www-data:www-data "$APP"
chmod -R u+rwX,g+rwX "$APP/uploads"

cat > /etc/systemd/system/extension-check.service << 'UNIT'
[Unit]
Description=Extension Check folder upload (the.gopg.online/extension-check)
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/extension-check
Environment=UPLOAD_ROOT=/var/www/extension-check/uploads
Environment=MAX_UPLOAD_MB=500
ExecStart=/var/www/extension-check/venv/bin/gunicorn wsgi:application --bind 127.0.0.1:5055 --workers 2 --timeout 300 --access-logfile - --error-logfile -
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
UNIT

systemctl daemon-reload
systemctl enable --now extension-check.service
systemctl restart extension-check.service

# Live nginx config is sites-enabled (file copy, not symlink on this host)
for NGINX in /etc/nginx/sites-enabled/the.gopg.online /etc/nginx/sites-available/the.gopg.online; do
  [[ -f "$NGINX" ]] || continue
  if grep -q 'location /extension-check/' "$NGINX" 2>/dev/null; then
    echo "nginx: /extension-check/ already in $NGINX"
    continue
  fi
  python3 - "$NGINX" << 'PY'
import sys
from pathlib import Path
path = Path(sys.argv[1])
text = path.read_text()
block = """
    location /extension-check/ {
        client_max_body_size 500m;
        proxy_pass http://127.0.0.1:5055/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
        proxy_request_buffering off;
    }

"""
needle = "    location / {\n"
if needle not in text:
    raise SystemExit(f"Could not find insertion point in {path}")
path.write_text(text.replace(needle, block + needle, 1))
print(f"nginx: added /extension-check/ to {path}")
PY
done

nginx -t && systemctl reload nginx

sleep 1
systemctl is-active extension-check.service
curl -sS http://127.0.0.1:5055/api/health
echo
curl -sS https://the.gopg.online/extension-check/api/health
echo
REMOTE

rm -f /tmp/extension-check-deploy.tar.gz
echo "==> Live at https://the.gopg.online/extension-check/"
echo "==> Uploads stored on server: /var/www/extension-check/uploads/"
