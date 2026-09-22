"""
Tik Tik plan catalog — list price + offer price, edited from the ops panel.
Extension shows list price struck through and offer price as the take price.
"""

from __future__ import annotations

import json
import os
from copy import deepcopy
from datetime import datetime, timezone as dt_timezone
from pathlib import Path

from django.conf import settings

# Fixed keys / ranks. Prices and labels are editable in the panel.
DEFAULT_PLANS = {
    "trial": {
        "key": "trial",
        "label": "3-day trial",
        "desc": "3 days · once per email",
        "days": 3,
        "price": 99,
        "offerPrice": 1,
        "rank": 1,
        "enabled": True,
    },
    "month": {
        "key": "month",
        "label": "30 days",
        "desc": "30 days · full access",
        "days": 30,
        "price": 4999,
        "offerPrice": 2999,
        "rank": 3,
        "enabled": True,
    },
    "applicant": {
        "key": "applicant",
        "label": "one applicant",
        "desc": "Lock to one applicant ID",
        "days": None,
        "price": 499,
        "offerPrice": 300,
        "rank": 2,
        "enabled": True,
    },
}

PLAN_ORDER = ("trial", "month", "applicant")


def _plans_paths() -> list[Path]:
    paths: list[Path] = []
    env = getattr(settings, "TIK_TIK_PLANS_PATH", "") or os.environ.get("TIK_TIK_PLANS_PATH", "")
    if env:
        paths.append(Path(env))
    paths.append(Path("/var/www/the.gopg.online/backend/data/tik-tik-plans.json"))
    paths.append(Path("/var/www/the.gopg.online/frontend/tik-tik-plans.json"))
    try:
        base = Path(settings.BASE_DIR).resolve()
        paths.append(base / "data" / "tik-tik-plans.json")
        paths.append(base.parent.parent / "website" / "tik-tik-plans.json")
    except Exception:
        pass
    return paths


def _merge_plan(key: str, raw: dict | None) -> dict:
    base = deepcopy(DEFAULT_PLANS.get(key) or {"key": key, "rank": 0, "enabled": True})
    if not isinstance(raw, dict):
        return base
    if "label" in raw and str(raw["label"]).strip():
        base["label"] = str(raw["label"]).strip()[:64]
    if "desc" in raw and str(raw["desc"]).strip():
        base["desc"] = str(raw["desc"]).strip()[:120]
    if "days" in raw:
        d = raw["days"]
        if d is None or d == "" or str(d).lower() in ("none", "null", "open"):
            base["days"] = None
        else:
            try:
                base["days"] = max(1, min(3650, int(d)))
            except (TypeError, ValueError):
                pass
    for field, dest in (("price", "price"), ("offerPrice", "offerPrice"), ("offer_price", "offerPrice")):
        if field in raw:
            try:
                base[dest] = max(0, min(999999, int(raw[field])))
            except (TypeError, ValueError):
                pass
    if "enabled" in raw:
        base["enabled"] = bool(raw["enabled"])
    base["key"] = key
    base["rank"] = int(DEFAULT_PLANS.get(key, {}).get("rank") or base.get("rank") or 0)
    # Offer is what they pay; never above list price for display sense — allow equal.
    if base["offerPrice"] > base["price"] and base["price"] > 0:
        base["price"] = base["offerPrice"]
    return base


def load_plan_catalog() -> dict:
    """Return {key: plan_dict} merged with defaults."""
    for path in _plans_paths():
        try:
            if not path.is_file():
                continue
            data = json.loads(path.read_text(encoding="utf-8"))
            if not isinstance(data, dict):
                continue
            raw_plans = data.get("plans") if isinstance(data.get("plans"), dict) else data
            out = {}
            for key in PLAN_ORDER:
                out[key] = _merge_plan(key, raw_plans.get(key) if isinstance(raw_plans, dict) else None)
            return out
        except Exception:
            continue
    return {k: deepcopy(v) for k, v in DEFAULT_PLANS.items()}


def save_plan_catalog(plans: dict) -> list[str]:
    """Write catalog to all writable known paths. Returns written paths."""
    merged = {}
    for key in PLAN_ORDER:
        merged[key] = _merge_plan(key, plans.get(key) if isinstance(plans, dict) else None)
    payload = {
        "version": 1,
        "updatedAt": datetime.now(dt_timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "plans": merged,
    }
    text = json.dumps(payload, indent=2, ensure_ascii=False) + "\n"
    written: list[str] = []
    for path in _plans_paths():
        try:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(text, encoding="utf-8")
            written.append(str(path))
        except Exception:
            continue
    return written


def plans_for_client(catalog: dict | None = None) -> list[dict]:
    """Ordered list of enabled plans for the extension UI."""
    cat = catalog or load_plan_catalog()
    out = []
    for key in PLAN_ORDER:
        p = cat.get(key) or DEFAULT_PLANS[key]
        if not p.get("enabled", True):
            continue
        out.append(
            {
                "key": key,
                "label": p["label"],
                "desc": p.get("desc") or "",
                "days": p.get("days"),
                "price": int(p.get("price") or 0),
                "offerPrice": int(p.get("offerPrice") or 0),
                "rank": int(p.get("rank") or 0),
            }
        )
    return out


def get_plan(key: str, catalog: dict | None = None) -> dict | None:
    cat = catalog or load_plan_catalog()
    p = cat.get(str(key or "").strip().lower())
    if not p or not p.get("enabled", True):
        return None
    return p


def plan_amount(key: str, catalog: dict | None = None) -> int:
    p = get_plan(key, catalog)
    if not p:
        return 0
    return int(p.get("offerPrice") or 0)
