"""Folder upload API — saves uploaded extension folders under ./uploads."""

from __future__ import annotations

import os
import re
import zipfile
from datetime import datetime, timezone
from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory
from werkzeug.utils import secure_filename

BASE_DIR = Path(__file__).resolve().parent
UPLOAD_ROOT = Path(os.environ.get("UPLOAD_ROOT", str(BASE_DIR / "uploads"))).resolve()
STATIC_DIR = BASE_DIR / "static"

UPLOAD_ROOT.mkdir(parents=True, exist_ok=True)

app = Flask(__name__, static_folder=str(STATIC_DIR), static_url_path="")

# Large extension folders (default 500 MB).
_max_mb = int(os.environ.get("MAX_UPLOAD_MB", "500"))
app.config["MAX_CONTENT_LENGTH"] = _max_mb * 1024 * 1024
# Folder uploads send 1 file + 1 path field each — allow very large trees.
app.config["MAX_FORM_PARTS"] = int(os.environ.get("MAX_FORM_PARTS", "100000"))
app.config["MAX_FORM_MEMORY_SIZE"] = 64 * 1024 * 1024


def _sanitize_part(part: str) -> str:
    """Keep original names; only block path-escape / null bytes."""
    part = part.strip().replace("\x00", "")
    if part in ("", ".", ".."):
        return "_"
    # No path separators inside a single segment
    part = part.replace("/", "_").replace("\\", "_")
    return part or "_"


def _safe_rel_path(raw: str) -> Path | None:
    """Normalize a client path; reject escapes but keep all filenames."""
    if raw is None:
        return None
    cleaned = str(raw).replace("\\", "/").strip()
    # Drop drive / leading slashes / zip absolute markers
    cleaned = re.sub(r"^[A-Za-z]:", "", cleaned)
    cleaned = cleaned.lstrip("/")
    if not cleaned:
        return None
    parts = [_sanitize_part(p) for p in cleaned.split("/") if p not in ("", ".")]
    # Collapse ".." by treating as "_"
    parts = [p if p != ".." else "_" for p in parts]
    if not parts:
        return None
    return Path(*parts)


def _is_within(child: Path, parent: Path) -> bool:
    try:
        child.resolve().relative_to(parent.resolve())
        return True
    except (ValueError, OSError):
        return False


def _unique_file(path: Path) -> Path:
    """Avoid silent overwrites when two paths sanitize to the same name."""
    if not path.exists():
        return path
    stem, suffix = path.stem, path.suffix
    n = 1
    while True:
        candidate = path.with_name(f"{stem}__{n}{suffix}")
        if not candidate.exists():
            return candidate
        n += 1


def _unique_dest(folder_name: str) -> Path:
    stamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    safe_name = secure_filename(folder_name) or _sanitize_part(folder_name) or "folder"
    dest = UPLOAD_ROOT / f"{stamp}_{safe_name}"
    if not dest.exists():
        return dest
    n = 1
    while True:
        candidate = UPLOAD_ROOT / f"{stamp}_{safe_name}_{n}"
        if not candidate.exists():
            return candidate
        n += 1


def _strip_top_folder(rel: Path, folder_name: str) -> Path:
    parts = list(rel.parts)
    top = secure_filename(folder_name) or _sanitize_part(folder_name)
    if len(parts) > 1 and (
        parts[0] == top
        or parts[0] == folder_name
        or _sanitize_part(parts[0]) == _sanitize_part(folder_name)
    ):
        return Path(*parts[1:])
    return rel


def _save_bytes(dest: Path, rel: Path, data: bytes) -> str:
    out = dest / rel
    if not _is_within(out.parent if out.parent != out else dest, dest) and out.parent != dest:
        # Force under dest
        out = dest / Path(*rel.parts)
    if not _is_within(out, dest):
        out = dest / Path(*[p for p in rel.parts if p not in ("..", "")])
    out = _unique_file(out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(data)
    return str(out.relative_to(dest))


@app.get("/")
def index():
    return send_from_directory(STATIC_DIR, "index.html")


@app.get("/api/health")
def health():
    return jsonify(
        {
            "ok": True,
            "uploads": str(UPLOAD_ROOT),
            "max_upload_mb": _max_mb,
        }
    )


@app.get("/api/uploads")
def list_uploads():
    items = []
    if UPLOAD_ROOT.exists():
        for entry in sorted(UPLOAD_ROOT.iterdir(), key=lambda p: p.stat().st_mtime, reverse=True):
            if entry.is_dir():
                file_count = sum(1 for p in entry.rglob("*") if p.is_file())
                items.append(
                    {
                        "name": entry.name,
                        "path": str(entry.relative_to(UPLOAD_ROOT)),
                        "files": file_count,
                        "modified": datetime.fromtimestamp(
                            entry.stat().st_mtime, tz=timezone.utc
                        ).isoformat(),
                    }
                )
    return jsonify({"uploads": items})


@app.post("/api/upload")
def upload_folder():
    """
    Accept either:
      - a single .zip under field name 'zip' (preferred — full tree)
      - multipart files with matching 'paths' (relative paths)
    Optional form field: folder_name
    Also accepts expected_count to verify nothing was dropped.
    """
    folder_name = (request.form.get("folder_name") or "").strip() or "upload"
    expected = request.form.get("expected_count")
    expected_count = int(expected) if expected and expected.isdigit() else None
    saved: list[str] = []
    skipped: list[str] = []

    zip_file = request.files.get("zip")
    if zip_file and zip_file.filename:
        dest = _unique_dest(folder_name or Path(zip_file.filename).stem)
        dest.mkdir(parents=True, exist_ok=True)
        tmp_zip = dest / "_upload.zip"
        zip_file.save(tmp_zip)
        try:
            with zipfile.ZipFile(tmp_zip, "r") as zf:
                for info in zf.infolist():
                    # Skip directory entries only
                    name = info.filename
                    if name.endswith("/") or info.is_dir():
                        continue
                    rel = _safe_rel_path(name)
                    if rel is None:
                        skipped.append(name)
                        continue
                    rel = _strip_top_folder(rel, folder_name)
                    with zf.open(info) as src:
                        data = src.read()
                    saved.append(_save_bytes(dest, rel, data))
        finally:
            tmp_zip.unlink(missing_ok=True)

        return _upload_response(dest, saved, skipped, expected_count)

    files = request.files.getlist("files")
    if not files:
        return jsonify({"ok": False, "error": "No files received. Select a folder or zip."}), 400

    paths = request.form.getlist("paths")
    if folder_name == "upload" and paths:
        first = paths[0].replace("\\", "/").strip("/")
        top = first.split("/")[0] if first else ""
        if top:
            folder_name = top

    dest = _unique_dest(folder_name)
    dest.mkdir(parents=True, exist_ok=True)

    for i, f in enumerate(files):
        # Keep empty files and unusual names — only skip totally missing slots
        if f is None:
            skipped.append(f"<missing slot {i}>")
            continue
        raw_path = paths[i] if i < len(paths) and paths[i] else (f.filename or f"file_{i}")
        rel = _safe_rel_path(raw_path)
        if rel is None:
            rel = Path(f"file_{i}")
        rel = _strip_top_folder(rel, folder_name)
        data = f.read()
        saved.append(_save_bytes(dest, rel, data))

    return _upload_response(dest, saved, skipped, expected_count)


def _upload_response(dest: Path, saved: list[str], skipped: list[str], expected_count: int | None):
    if not saved:
        try:
            dest.rmdir()
        except OSError:
            pass
        return jsonify({"ok": False, "error": "No valid files could be saved."}), 400

    disk_count = sum(1 for p in dest.rglob("*") if p.is_file())
    ok = True
    mismatch = None
    if expected_count is not None and disk_count != expected_count:
        mismatch = {
            "expected": expected_count,
            "saved": disk_count,
            "skipped": len(skipped),
        }

    return jsonify(
        {
            "ok": ok,
            "saved_as": dest.name,
            "absolute_path": str(dest),
            "file_count": disk_count,
            "files": saved[:500],
            "skipped": skipped[:50],
            "mismatch": mismatch,
        }
    )


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5050"))
    print(f"Folder upload site → http://127.0.0.1:{port}")
    print(f"Uploads saved to   → {UPLOAD_ROOT}")
    app.run(host="0.0.0.0", port=port, debug=os.environ.get("DEBUG", "false").lower() == "true")
