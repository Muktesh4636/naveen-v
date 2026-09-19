(()=>{(()=>{const n="vsa-recovery-loading-overlay",r="vsa-recovery-loading-overlay-style";function i(){if(document.getElementById(n))return;const e=document.createElement("style");e.id=r,e.textContent=`
      #${n} {
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 14px;
        background: #0b1220;
        color: #e6ebf5;
        font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
        font-size: 14px;
      }

      #${n} .vsa-recovery-spinner {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: 3px solid rgba(230, 235, 245, 0.25);
        border-top-color: #e6ebf5;
        animation: vsa-recovery-spin 0.8s linear infinite;
      }

      @keyframes vsa-recovery-spin {
        to { transform: rotate(360deg); }
      }
    `;const t=document.createElement("div");t.id=n;const o=document.createElement("div");o.className="vsa-recovery-spinner";const c=document.createElement("div");c.textContent="Waiting for the portal to respond\u2026",t.appendChild(o),t.appendChild(c),(document.head||document.documentElement).appendChild(e),(document.body||document.documentElement).appendChild(t)}function d(){var e,t;(e=document.getElementById(n))==null||e.remove(),(t=document.getElementById(r))==null||t.remove()}function a(){document.addEventListener("DOMContentLoaded",d,{once:!0}),setTimeout(d,2e4)}if(location.hash==="#vsar"){i(),a();return}try{chrome.runtime.sendMessage({type:"VSA_IS_SESSION_RECOVERY_POPUP"},e=>{var o;(o=chrome.runtime)!=null&&o.lastError||(e==null?void 0:e.ok)!==!0||(e==null?void 0:e.isRecoveryPopup)!==!0||(i(),a())})}catch{}})();})();
