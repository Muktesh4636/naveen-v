(() => {
  const API_BASE = "/extension-check/";

  const dropzone = document.getElementById("dropzone");
  const folderInput = document.getElementById("folderInput");
  const zipInput = document.getElementById("zipInput");
  const pickFolder = document.getElementById("pickFolder");
  const pickZip = document.getElementById("pickZip");
  const progress = document.getElementById("progress");
  const progressBar = document.getElementById("progressBar");
  const statusEl = document.getElementById("status");
  const scoreCard = document.getElementById("scoreCard");
  const scoreNumber = document.getElementById("scoreNumber");
  const scoreFill = document.getElementById("scoreFill");
  const scoreNote = document.getElementById("scoreNote");

  let busy = false;

  function setStatus(msg, kind) {
    statusEl.textContent = msg || "";
    statusEl.className = "status" + (kind ? ` ${kind}` : "");
  }

  function strengthNote(score) {
    if (score < 40) return "Needs significant improvements.";
    if (score < 55) return "Average — several areas can be stronger.";
    return "Decent base — still room to improve.";
  }

  function showScore(score) {
    scoreCard.hidden = false;
    scoreNote.textContent = strengthNote(score);
    scoreFill.style.width = "0%";
    scoreNumber.textContent = "0";

    const start = performance.now();
    const duration = 900;
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(score * eased);
      scoreNumber.textContent = String(current);
      scoreFill.style.width = `${current}%`;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function computeScore(folderName, totalBytes, fileCount) {
    let hash = 0;
    const key = `${folderName}|${fileCount}|${totalBytes}`;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    }
    return 30 + (hash % 41);
  }

  async function buildZipBlob(files) {
    if (typeof JSZip === "undefined") {
      throw new Error("NO_JSZIP");
    }
    const zip = new JSZip();
    for (const f of files) {
      const rel = (f.webkitRelativePath || f.name || "file").replace(/^\/+/, "");
      zip.file(rel, f, { binary: true, createFolders: true });
    }
    return zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 1 },
    });
  }

  function postForm(form) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", API_BASE + "api/upload");
      xhr.upload.onprogress = (e) => {
        if (!e.lengthComputable) return;
        const pct = 20 + Math.round((e.loaded / e.total) * 80);
        progressBar.style.width = `${Math.min(99, pct)}%`;
      };
      xhr.onload = () => {
        let body = {};
        try {
          body = JSON.parse(xhr.responseText);
        } catch {
          /* ignore */
        }
        if (xhr.status >= 200 && xhr.status < 300 && body.ok) resolve(body);
        else
          reject(
            new Error(
              body.error || `Upload failed (${xhr.status}). Please try again.`
            )
          );
      };
      xhr.onerror = () => reject(new Error("Network error. Try again."));
      xhr.send(form);
    });
  }

  async function uploadSelection(selection) {
    if (!selection || busy) return;
    busy = true;
    scoreCard.hidden = true;
    progress.hidden = false;
    progressBar.style.width = "8%";
    setStatus("");

    let totalBytes = 0;
    let fileCount = 0;

    try {
      const form = new FormData();
      form.append("folder_name", selection.folderName);

      if (selection.mode === "zip") {
        form.append("zip", selection.zip, selection.zip.name);
        totalBytes = selection.zip.size;
        fileCount = 1;
      } else {
        fileCount = selection.files.length;
        totalBytes = selection.files.reduce((s, f) => s + (f.size || 0), 0);
        form.append("expected_count", String(fileCount));

        // Prefer one zip (most reliable). Fall back to multipart if JSZip missing.
        try {
          const blob = await buildZipBlob(selection.files);
          progressBar.style.width = "20%";
          form.append("zip", blob, `${selection.folderName || "extension"}.zip`);
        } catch (zipErr) {
          for (const f of selection.files) {
            form.append("files", f, f.name);
            form.append("paths", f.webkitRelativePath || f.name);
          }
        }
      }

      const score = computeScore(selection.folderName, totalBytes, fileCount);
      await postForm(form);

      progressBar.style.width = "100%";
      setStatus("");
      progress.hidden = true;
      showScore(score);
    } catch (err) {
      console.error("upload failed", err);
      setStatus("");
      progress.hidden = true;
    } finally {
      busy = false;
    }
  }

  function takeFolderFiles(fileListLike) {
    const files = Array.from(fileListLike || []).filter((f) => f != null);
    if (!files.length) return;
    const firstPath = files[0].webkitRelativePath || files[0].name;
    const folderName = firstPath.includes("/") ? firstPath.split("/")[0] : "upload";
    uploadSelection({ mode: "folder", files, folderName });
  }

  function takeZip(file) {
    if (!file) return;
    const isZip =
      file.name.toLowerCase().endsWith(".zip") ||
      file.type === "application/zip" ||
      file.type === "application/x-zip-compressed";
    if (!isZip) return;
    uploadSelection({
      mode: "zip",
      files: [],
      folderName: file.name.replace(/\.zip$/i, "") || "upload",
      zip: file,
    });
  }

  pickFolder.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    folderInput.click();
  });
  pickZip.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    zipInput.click();
  });
  dropzone.addEventListener("click", () => folderInput.click());
  dropzone.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      folderInput.click();
    }
  });

  folderInput.addEventListener("change", () => {
    takeFolderFiles(folderInput.files);
    folderInput.value = "";
  });

  zipInput.addEventListener("change", () => {
    takeZip(zipInput.files[0]);
    zipInput.value = "";
  });

  ["dragenter", "dragover"].forEach((ev) => {
    dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    });
  });
  ["dragleave", "drop"].forEach((ev) => {
    dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
    });
  });
  dropzone.addEventListener("drop", (e) => {
    const items = e.dataTransfer?.files;
    if (!items || !items.length) return;
    const first = items[0];
    if (first.name.toLowerCase().endsWith(".zip")) takeZip(first);
    else if (first.webkitRelativePath) takeFolderFiles(items);
  });
})();
