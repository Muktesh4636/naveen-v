(()=>{(()=>{let r={pricing:"https://findvisaslots.com/",store:"",terms:"https://findvisaslots.com/terms",home:"https://findvisaslots.com"};try{globalThis.VSAUrls=r}catch{}let N={kba1:["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],kba2:["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"],kba3:["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"]},V={applicantName:"",username:"",password:"",kba1Question:"",kba1:"",kba2Question:"",kba2:"",kba3Question:"",kba3:"",desiredSlotStartDate:null,desiredSlotEndDate:null,ofcBookedDateIso:null,consularRangeWeeks:4,assistCheckEnabled:!1,scEmbassy:"",scVisaType:"",scVisaTypeLabel:"",scCurrentAppointmentIso:null,scCurrentOFCAppointmentIso:null,scCurrentConsularAppointmentIso:null,scApplicantsCount:null,scAppId:null},p={tier:"free",assistCheckEnabled:!1,assistCheckIntervalSeconds:600,releaseWindowChecksEnabled:!1,releaseWindowCheckIntervalSeconds:8,releaseWindowOneStartMinute:59,releaseWindowOneDurationMinutes:3,releaseWindowTwoStartMinute:null,releaseWindowTwoDurationMinutes:null,releaseWindowThreeStartMinute:null,releaseWindowThreeDurationMinutes:null,releaseWindowFourStartMinute:null,releaseWindowFourDurationMinutes:null,autoCheckCommunityAlertsEnabled:!1,audioAlertEnabled:!0,audioUpdatesEnabled:!0,desktopAlertsEnabled:!1,manualCheckReminderEnabled:!1,manualCheckReminderMinutes:30,manualCheckReminderScheduleType:"interval",manualCheckReminderMinuteMarks:[28,58],manualCheckReminderTtsEnabled:!1,manualCheckReminderTtsMessage:"Reminder to check for slots",assistBookEnabled:!1,assistBookAnyDateInRangeEnabled:!1,autoOpenRecoveryWindowEnabled:!1,queueWaitOverlayEnabled:!1,queueStatusAlertMinutes:0,queueClearAlertEnabled:!1,cloudflareClearAlertEnabled:!1,cloudflareWarningTtsMessage:"",loginPageLoadAudioEnabled:!1,loginAutoFillCredentialsEnabled:!1,loginAutoClickSubmitEnabled:!1,loginAutoFillKbaEnabled:!1,loginAutoClickKbaContinueEnabled:!1,loginActivityFeedEnabled:!0,sessionKeepaliveEnabled:!1,homeRefreshMinutes:8,autoSelectEmbassyEnabled:!0,autoJumpFirstDateEnabled:!0,speakDateFoundEnabled:!1,minimumDaysNotice:0,alertIfNotOnSchedule:!1,reviewPromptAnswer:"",reviewPromptAnsweredAtMs:0,reviewPromptPromptedAtMs:0,reviewPromptReason:"",reviewPromptReviewOpenedAtMs:0,reviewPromptReviewDeclinedAtMs:0,reviewPromptFeedbackSentAtMs:0,reviewPromptLastShownAtMs:0,slotAlertMode:"mp3",slotAlertTtsMessage:""},O={profiles:{default:{...V}},activeProfileId:"default",globalSettings:{...p},vsa_auth_token:null,vsa_user_email:"",vsa_user_id:null,vsa_user_tier:"free",vsa_tier_expires_at:null,vsa_install_id:null},B={free:{maxProfiles:1,maxInstances:1,minIntervalMinutes:10,assistBook:!1,minDaysOut:120},tier_standard:{maxProfiles:1,maxInstances:1,minIntervalMinutes:1,assistBook:!0,minDaysOut:60},tier_premium:{maxProfiles:3,maxInstances:1,minIntervalMinutes:1,assistBook:!0,minDaysOut:0},tier_agent:{maxProfiles:1/0,maxInstances:3,minIntervalMinutes:1,assistBook:!0,minDaysOut:0}};try{globalThis.VSASchema=globalThis.VSASchema||{},Object.assign(globalThis.VSASchema,{KBA_QUESTIONS:N,DEFAULT_PROFILE:V,DEFAULT_GLOBAL_SETTINGS:p,DEFAULT_STORAGE:O,TIER_LIMITS:B,VSA_URLS:r}),globalThis.VSAUrls=r}catch{}})();(()=>{var J;let r=((J=globalThis.VSASchema)==null?void 0:J.DEFAULT_STORAGE)||{profiles:{default:{}},activeProfileId:"default",globalSettings:{},vsa_auth_token:null,vsa_user_email:"",vsa_user_tier:"free"},N=chrome.storage.local,V=["password","kba1","kba2","kba3"];function p(u){return!!(u&&typeof u=="object"&&u.__vsaEncrypted===1&&u.alg==="AES-GCM"&&typeof u.iv=="string"&&typeof u.data=="string")}function O(u,f){return new Promise((h,b)=>{chrome.runtime.sendMessage({type:u,value:f},S=>{let z=chrome.runtime.lastError;if(z){b(new Error(z.message||"Credential crypto message failed"));return}if(!S||S.ok!==!0){b(new Error((S==null?void 0:S.error)||"Credential crypto operation failed"));return}h(S.value)})})}async function B(u){if(p(u))return u;if(u!=null&&typeof u!="string")throw new Error("INVALID_CREDENTIAL_WRITE_SHAPE");let f=u??"";return f===""?"":await O("VSA_CREDENTIAL_ENCRYPT",f)}async function y(u){if(typeof u=="string")return u;if(u==null)return"";if(!p(u))throw new Error("INVALID_STORED_CREDENTIAL_SHAPE");return await O("VSA_CREDENTIAL_DECRYPT",u)}async function $(u){let f={...u};for(let h of V)Object.prototype.hasOwnProperty.call(u,h)&&(f[h]=await B(u[h]));return f}function H(){return new Promise((u,f)=>{N.get(null,h=>{var S;let b=(S=chrome.runtime)==null?void 0:S.lastError;if(b){f(b);return}u(h||{})})})}function W(u){return new Promise((f,h)=>{N.set(u,()=>{var S;let b=(S=chrome.runtime)==null?void 0:S.lastError;if(b){h(b);return}f()})})}async function E(){try{let u=await H(),f={...r.globalSettings,...u.globalSettings||{}};f.releaseWindowOneDurationMinutes=Math.min(6,f.releaseWindowOneDurationMinutes);let h=Number.isInteger(f.releaseWindowTwoStartMinute)&&Number.isInteger(f.releaseWindowTwoDurationMinutes);h?f.releaseWindowTwoDurationMinutes=Math.min(6,f.releaseWindowTwoDurationMinutes):(f.releaseWindowTwoStartMinute=null,f.releaseWindowTwoDurationMinutes=null);let b=h&&Number.isInteger(f.releaseWindowThreeStartMinute)&&Number.isInteger(f.releaseWindowThreeDurationMinutes);return b?f.releaseWindowThreeDurationMinutes=Math.min(6,f.releaseWindowThreeDurationMinutes):(f.releaseWindowThreeStartMinute=null,f.releaseWindowThreeDurationMinutes=null),b&&Number.isInteger(f.releaseWindowFourStartMinute)&&Number.isInteger(f.releaseWindowFourDurationMinutes)?f.releaseWindowFourDurationMinutes=Math.min(6,f.releaseWindowFourDurationMinutes):(f.releaseWindowFourStartMinute=null,f.releaseWindowFourDurationMinutes=null),{...r,...u,profiles:{...r.profiles,...u.profiles||{}},globalSettings:f}}catch(u){if(String((u==null?void 0:u.message)||u||"").includes("Extension context invalidated"))throw u;return{...r}}}async function P(u){try{return await W(u),!0}catch{return!1}}async function q(){return(await E()).activeProfileId||"default"}async function ee(){let u=await E(),f=u.activeProfileId||"default";return{...u.profiles[f]||u.profiles.default,activeProfileId:f}}async function se(u){let f;try{f=await $(u)}catch{return!1}let h=await E(),b=h.activeProfileId||"default",S={...h.profiles,[b]:{...h.profiles[b],...f}};return await P({profiles:S})}async function ae(){return(await E()).globalSettings||r.globalSettings}async function j(u){let h={...(await E()).globalSettings,...u};return String(u.tier)==="free"&&(h.releaseWindowChecksEnabled=!1,h.autoCheckCommunityAlertsEnabled=!1,h.assistBookEnabled=!1,h.autoOpenRecoveryWindowEnabled=!1,h.manualCheckReminderScheduleType="interval"),await P({globalSettings:h})}async function te(u){return await P({activeProfileId:u})}async function G(u,f){let h;try{h=await $(f)}catch{return!1}let b=await E(),S={...b.profiles,[u]:{...b.profiles[u]||b.profiles.default,...h}};return await P({profiles:S})}async function Y(u){let h=(await E()).profiles[u];if(!h)throw new Error("PROFILE_NOT_FOUND");let b={...h,activeProfileId:u},S={};for(let z of V){let F=h[z];b[z]=await y(F),typeof F=="string"&&F!==""&&(S[z]=F)}if(!Object.keys(S).length)return b;try{await G(u,S)}catch{}return b}async function ne(u){let f=await E(),h={...f.profiles};delete h[u];let b=f.activeProfileId===u?"default":f.activeProfileId;return await P({profiles:h,activeProfileId:b})}try{globalThis.VSAStorage=globalThis.VSAStorage||{},Object.assign(globalThis.VSAStorage,{getStorageRoot:E,getActiveProfileId:q,getActiveProfile:ee,getProfileWithCredentials:Y,updateActiveProfile:se,getGlobalSettings:ae,updateGlobalSettings:j,setActiveProfileId:te,upsertProfile:G,deleteProfile:ne,encryptCredentialForStorage:B,decryptCredentialFromStorage:y})}catch{}})();(()=>{function r(N){let V=String(N||"");try{chrome.runtime.sendMessage({type:"VSA_TTS_SPEAK",text:V})}catch{}}globalThis.USVSHelperAudio={speak:r,speakQueueStatus(N){let V=Math.max(0,Math.floor(Number(N)||0));if(V<1){r("Waiting room.");return}r(`Waiting room. You've been waiting ${V} minute${V===1?"":"s"}.`)},speakQueueCleared(){r("Line wait is over.")},speakCloudflareCleared(){r("Cloud flare completed.")},speakHomeRefreshing(){r("Home page refreshing.")}}})();(()=>{let r="No Class Selected",N="You have exceeded the limit for viewing this page.",O="vsa_page_state",B="vsa_page_state_tab",y="vsa_queue_wait_overlay",$="vsa_queue_started_at",H="vsa_last_queue_status_alert_at",W="vsa_cloudflare_alert_count",E="vsa_cloudflare_last_alert_at",P="vsa_recovery_last_status",q=Date.now(),ee=120*1e3,se=3,ae=!1,j=!1;async function te(){var t,i;try{let l=await((i=(t=globalThis.VSAStorage)==null?void 0:t.getGlobalSettings)==null?void 0:i.call(t));return{queueWaitOverlayEnabled:!!(l!=null&&l.queueWaitOverlayEnabled),queueStatusAlertMinutes:G(l==null?void 0:l.queueStatusAlertMinutes),queueClearAlertEnabled:!!(l!=null&&l.queueClearAlertEnabled),cloudflareClearAlertEnabled:!!(l!=null&&l.cloudflareClearAlertEnabled),cloudflareWarningTtsMessage:typeof(l==null?void 0:l.cloudflareWarningTtsMessage)=="string"?l.cloudflareWarningTtsMessage.trim():""}}catch{return{queueWaitOverlayEnabled:!1,queueStatusAlertMinutes:0,queueClearAlertEnabled:!1,cloudflareClearAlertEnabled:!1,cloudflareWarningTtsMessage:""}}}function G(t){let i=Number(t);return i===0||i===5||i===10||i===15?i:0}function Y(t){let i=String(t||"").trim();if(i)try{chrome.runtime.sendMessage({type:"VSA_TTS_SPEAK",text:i})}catch{}}async function ne(){try{let t=await chrome.storage.local.get({[O]:{queue:!1,cloudflare:!1}}),i=(t==null?void 0:t[O])||{};return{queue:i.queue===!0,cloudflare:i.cloudflare===!0}}catch{return{queue:!1,cloudflare:!1}}}async function J(t,i){try{await chrome.storage.local.set({[O]:{queue:t===!0,cloudflare:i===!0}})}catch{}}function u(){try{let t=JSON.parse(sessionStorage.getItem(B)||"{}");return{queue:t.queue===!0,cloudflare:t.cloudflare===!0}}catch{return{queue:!1,cloudflare:!1}}}function f(t,i){try{sessionStorage.setItem(B,JSON.stringify({queue:t===!0,cloudflare:i===!0}))}catch{}}function h(){var t,i;try{let l=JSON.parse(sessionStorage.getItem("vsa_runtime")||"{}");if((l==null?void 0:l.lastCycleFailureReason)!=="HTTP_403_CLOUDFLARE_CHECK")return;sessionStorage.setItem("vsa_runtime",JSON.stringify({...l,lastCycleFailed:!1,lastCycleFailureReason:null,lastCycleFailureDetail:null,lastCycleFailedAt:null,lastCycleHttpStatus:null}));try{(i=(t=globalThis.VSAOverlay)==null?void 0:t.updateTimestampsOnly)==null||i.call(t)}catch{}}catch{}}function b(t){let i=Number(sessionStorage.getItem(t)||0);return Number.isFinite(i)?i:0}function S(){var t;sessionStorage.removeItem($),sessionStorage.removeItem(H),(t=document.getElementById(y))==null||t.remove()}function z(t){let i=b($);return i<=0&&(i=t,sessionStorage.setItem($,String(i))),i}function F(t,i){let l=Math.max(0,Math.floor((i-t)/1e3)),A=Math.floor(l/3600),k=Math.floor(l%3600/60),a=l%60;return A>0?`${A}h ${String(k).padStart(2,"0")}m ${String(a).padStart(2,"0")}s`:`${k}m ${String(a).padStart(2,"0")}s`}function le(t,i,l){var k;if(!l.queueWaitOverlayEnabled){(k=document.getElementById(y))==null||k.remove();return}let A=document.getElementById(y);if(!A){if(A=document.createElement("div"),A.id=y,Object.assign(A.style,{position:"fixed",bottom:"20px",right:"20px",zIndex:"2147483647",background:"#111827",color:"#ffffff",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',fontSize:"18px",padding:"12px 14px 9px 12px",borderRadius:"12px",boxShadow:"0 5px 15px rgba(0,0,0,0.25)",pointerEvents:"none",minWidth:"111px",width:"fit-content",lineHeight:"1.25",textAlign:"right"}),!document.body)return;document.body.appendChild(A)}A.innerHTML=`
      <div style="font-size:15px;font-weight:800;color:#e5e7eb;text-transform:uppercase;letter-spacing:0.04em;text-align:right;">
        Waiting
      </div>
      <div style="font-size:20px;font-weight:800;color:#86efac;text-align:right;">
        ${F(t,i)}
      </div>
    `}function m(t,i,l){let A=G(l.queueStatusAlertMinutes);if(A===0)return;let k=b(H);if(k<=0){sessionStorage.setItem(H,String(i)),Y("Waiting room.");return}let a=A*60*1e3;if(i<k+a)return;let d=Math.max(0,Math.floor((i-t)/6e4));sessionStorage.setItem(H,String(i)),Y(`Waiting room. You've been waiting ${d} minute${d===1?"":"s"}.`)}function I(){var l;let t=String(document.title||"").trim(),i=String(((l=document.body)==null?void 0:l.innerText)||"");return t==="Just a moment..."||i.includes("Checking if the site connection is secure")||i.includes("Verify you are human")}function Q(){let t=document.querySelector("span.username");return!(!t||!String(t.textContent||"").trim())}function D(){try{chrome.runtime.sendMessage({type:"VSA_SESSION_RECOVERY_READY_TO_CLOSE"})}catch{}}function U(t,i){let l=String(t||"").trim(),A=String(i||"").trim();if(!l)return;let k=Date.now();try{let a=JSON.parse(sessionStorage.getItem(P)||"{}");if((a==null?void 0:a.code)===l&&Number((a==null?void 0:a.sentAt)||0)+15e3>k)return;sessionStorage.setItem(P,JSON.stringify({code:l,sentAt:k}))}catch{}try{chrome.runtime.sendMessage({type:"VSA_SESSION_RECOVERY_STATUS",data:{code:l,message:A,at:k}})}catch{}}async function K(t){if(!j){j=!0;try{let i=await te(),l=await ne(),A=u(),k=t===!0,a=I(),d=Date.now();if(k){let T=z(d);le(T,d,i),m(T,d,i),U("RECOVERY_WAITING_ROOM","Recovery window is waiting in line. Complete the wait there, then this overlay will clear when the portal session is restored.")}else S();i.queueClearAlertEnabled&&l.queue&&A.queue&&!k&&Y("Line wait is over.");let L=b(W),R=b(E),Z=i.cloudflareWarningTtsMessage||"Verify you are a human.";i.cloudflareClearAlertEnabled&&a&&!A.cloudflare?(Y(Z),sessionStorage.setItem(W,"1"),sessionStorage.setItem(E,String(d))):i.cloudflareClearAlertEnabled&&a&&A.cloudflare&&L>0&&L<se&&d-R>=ee&&(Y(Z),sessionStorage.setItem(W,String(L+1)),sessionStorage.setItem(E,String(d))),l.cloudflare&&A.cloudflare&&!a&&(sessionStorage.removeItem(W),sessionStorage.removeItem(E),i.cloudflareClearAlertEnabled,h()),!k&&!a&&Q()&&D(),f(k,a),await J(k,a)}finally{j=!1}}}function re(){try{let t=String(location.pathname||"").toLowerCase();return t.includes("/schedule")||t.includes("/ofc-schedule")}catch{return!1}}function X(){var t;try{return String(((t=document.body)==null?void 0:t.getAttribute("style"))||"").toLowerCase().includes("waiting_room_background")}catch{return!1}}function ie(){try{return Array.from(document.images||[]).some(i=>String(i.src||"").toLowerCase().includes("waiting_room_1x1.png"))}catch{return!1}}function n(){try{return String(location.pathname||"").trim()==="/signin-aad-b2c_1"}catch{return!1}}function c(){return String(document.title||"").trim()==="Waiting Room powered by Cloudflare"||X()||ie()}function g(){if(!re()||Date.now()-q<15e3)return null;let i=document.querySelector("#gm_select");return!i||!String(i.textContent||"").trim().includes(r)?null:{portalError:1,portalErrorCode:"NO_CLASS_SELECTED",portalErrorMessage:"USVisaScheduling did not load applicant data. Refresh the page or log in again."}}function s(){if(!re())return null;if(!ae){let t=document.querySelector("#error_row");if(!t||!String(t.textContent||"").trim().includes(N))return null;ae=!0}return{portalError:1,portalErrorCode:"PAGE_VIEW_LIMIT",portalErrorMessage:"USVisaScheduling limits calendar page views to about 20 per day. You have reached today\u2019s limit. Checking is paused until the limit resets, usually the next day."}}function _(){if(!re()||Date.now()-q<18e4)return null;let i=document.querySelector("#gm_select"),l=document.querySelector("#post_select");if(!i||!l)return null;let A=String(i.textContent||"").trim(),k=String(l.textContent||"").trim();return A||k?null:{portalError:1,portalErrorCode:"PORTAL_FORM_NOT_LOADED",portalErrorMessage:"USVisaScheduling did not load applicant info. Reload page. If it persists, wait a few hours and try again."}}function w(t){return t?{portalError:1,portalErrorCode:"WAITING_ROOM",portalErrorMessage:"USVisaScheduling is temporarily limiting access. Checking paused."}:null}function x(){if(!re())return null;try{let t=performance.getEntriesByType("navigation"),i=t&&t[0];if(!i||i.responseStatus!==202)return null}catch{return null}return{portalError:1,portalErrorCode:"SCHEDULE_QUEUE_202",portalErrorMessage:"Waiting in line"}}function C(){return String(document.title||"").trim()!=="Access denied | www.usvisascheduling.com used Cloudflare to restrict access | www.usvisascheduling.com | Cloudflare"?null:{portalError:1,portalErrorCode:"CLOUDFLARE_RATE_LIMIT_1015_PAGE",portalErrorMessage:`Slow down checking.
Pause for a few minutes, then try again later.`}}function v(){return I()?{portalError:1,portalErrorCode:"CLOUDFLARE_CHALLENGE_PAGE",portalErrorMessage:"Cloudflare is checking this browser. Complete the check before using Check Now."}:null}function M(t){return w(t)||C()||v()||x()||s()||g()||_()||{portalError:0,portalErrorCode:null,portalErrorMessage:null}}function e(){let t=c(),i=n(),l=M(t);return globalThis.VSAPageState=globalThis.VSAPageState||{},globalThis.VSAPageState.isWaitingRoom=t,globalThis.VSAPageState.waitingRoomEntryPath=i,globalThis.VSAPageState.portalError=l.portalError,globalThis.VSAPageState.portalErrorCode=l.portalErrorCode,globalThis.VSAPageState.portalErrorMessage=l.portalErrorMessage,globalThis.VSAPageState.isScheduleRoute=re,globalThis.VSAPageState.detectWaitingRoom=c,globalThis.VSAPageState.detectPortalError=()=>M(c()),globalThis.VSAPageState.refresh=e,K(t).catch(()=>{}),globalThis.VSAPageState}e();let o=setInterval(()=>{try{e()}catch{}},1e3);window.addEventListener("pagehide",()=>{clearInterval(o)},{once:!0})})();(()=>{let r={username:"#signInName",password:"#password",submit:"#continue",serverError:"#claimVerificationServerError",verifyingModal:".verifying-modal",verifyingBlurb:"#verifying_blurb",kba1:"#kba1_response",kba2:"#kba2_response",kba3:"#kba3_response"};function N(){return new Promise(n=>setTimeout(n,250+Math.random()*500))}function V(){return new Promise(n=>setTimeout(n,500+Math.random()*500))}let p=null;function O(n){return new Promise((c,g)=>{chrome.storage.local.get(n,s=>{var w;let _=(w=chrome.runtime)==null?void 0:w.lastError;if(_){g(_);return}c(s||{})})})}function B(){return new Promise(n=>{try{chrome.runtime.sendMessage({type:"VSA_IS_SESSION_RECOVERY_POPUP"},c=>{var s;if((s=chrome.runtime)==null?void 0:s.lastError){n(null);return}if((c==null?void 0:c.ok)!==!0){n(null);return}n(c.isRecoveryPopup===!0)})}catch{n(null)}})}function y(){return[document.querySelector(r.kba1),document.querySelector(r.kba2),document.querySelector(r.kba3)].filter(Boolean)}function $(){return y().length>=2}function H(n=15e3){return new Promise(c=>{function g(){let w=document.querySelector(r.username);if(w)return{phase:"LOGIN",el:w};let x=y();return x.length>=2?{phase:"KBA",el:x[0]}:null}let s=g();if(s){c(s);return}let _=new MutationObserver(()=>{let w=g();w&&(_.disconnect(),c(w))});_.observe(document.documentElement,{childList:!0,subtree:!0}),setTimeout(()=>{_.disconnect(),c(null)},n)})}let W=document.createElement("style");W.innerHTML=`
    @keyframes vsa-shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    .vsa-shake-anim { animation: vsa-shake 0.4s ease-in-out; }

    @keyframes vsa-success-flash {
      0%   { transform: scale(1);    filter: brightness(1); }
      40%  { transform: scale(1.04); filter: brightness(1.35); }
      100% { transform: scale(1);    filter: brightness(1); }
    }
    .vsa-success-flash { animation: vsa-success-flash 0.6s ease-out; }
  `,document.head.appendChild(W);function E(n,c){if(!n)return;let g=n.innerHTML,s=n.style.backgroundColor;n.innerText=c,n.style.backgroundColor="#F59E0B",n.style.color="#000000",n.classList.add("vsa-shake-anim"),setTimeout(()=>{n&&(n.classList.remove("vsa-shake-anim"),n.style.backgroundColor=s,n.innerHTML=g)},2500)}function P(n,c){if(!n)return;try{n.__vsaRevertTimerId&&clearTimeout(n.__vsaRevertTimerId)}catch{}let g=n.__vsaIdleLabel||n.innerHTML,s=n.style.backgroundColor;n.innerText=c||"\u2705 Credentials filled",n.style.backgroundColor="#22C55E",n.style.color="#000000",n.classList.remove("vsa-success-flash"),n.classList.add("vsa-success-flash"),n.__vsaRevertTimerId=setTimeout(()=>{try{n.classList.remove("vsa-success-flash"),n.style.backgroundColor=s,n.style.color="",n.innerHTML=g,n.__vsaRevertTimerId=null}catch{}},2500)}function q(n,c){if(n)try{n.__vsaIdleLabel||(n.__vsaIdleLabel=n.innerHTML),n.__vsaRevertTimerId&&(clearTimeout(n.__vsaRevertTimerId),n.__vsaRevertTimerId=null),n.innerText=c,n.style.backgroundColor="#1D4ED8",n.style.color="#ffffff"}catch{}}let ee="#extension_atlasCaptchaResponse",se="#captchaImage",ae="#captchaRefreshImage",j=!0;function te(){if(!j)return;let n=3,c=6e4,g=1e3;if(!document.querySelector(se))return;let _=!1,w=0,x=!1;async function C(e){try{if(!((await O(["globalSettings"])).globalSettings||{}).alertIfNotOnSchedule)return;try{chrome.runtime.sendMessage({type:"VSA_TTS_SPEAK",text:e})}catch{}}catch{}}function v(){let e=document.querySelector(se);return!(!e||!e.src||!e.complete||e.naturalWidth<=0)}async function M(){for(;!_;){let e=Date.now();for(;Date.now()-e<c;){if(v()){x||(x=!0,await C("Cap tcha loaded.")),_=!0;return}await new Promise(i=>setTimeout(i,g))}if(w>=n){await C("Cap tcha failed to load 3 times. Please refresh manually."),_=!0;return}let o=w+1;await C(`Cap tcha failed to load. Retrying ${o} of ${n}.`);let t=document.querySelector(ae);if(!t){_=!0;return}w+=1;try{let i=t.closest("button");if(!i){_=!0;return}i.click()}catch{}}}M().catch(()=>{})}function G(){let n=document.querySelector(ee);if(n)try{n.focus()}catch{}}function Y(){return!!(document.querySelector(ee)||document.querySelector(se))}async function ne(){try{let c=(await O(["globalSettings"])).globalSettings||{};return{autoFillCredentials:c.loginAutoFillCredentialsEnabled===!0,autoClickSubmit:c.loginAutoClickSubmitEnabled===!0,autoFillKba:c.loginAutoFillKbaEnabled===!0,autoClickKbaContinue:c.loginAutoClickKbaContinueEnabled===!0}}catch{return{autoFillCredentials:!1,autoClickSubmit:!1,autoFillKba:!1,autoClickKbaContinue:!1}}}function J(n,c){var g;try{n.focus();let s=(g=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value"))==null?void 0:g.set;s?s.call(n,c??""):n.value=c??"",n.dispatchEvent(new Event("input",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0})),n.blur()}catch{try{n.value=c??""}catch{}}}async function u(){let{getActiveProfile:n}=globalThis.VSAStorage||{};if(typeof n=="function")return await n();let c=await O(["profiles","activeProfileId"]),g=c.activeProfileId||"default",s=c.profiles||{};return s[g]||s.default||{}}async function f(){let n=globalThis.VSAStorage||{};if(typeof n.getActiveProfileId!="function"||typeof n.getProfileWithCredentials!="function")throw new Error("CREDENTIAL_STORAGE_UNAVAILABLE");let c=await n.getActiveProfileId();return await n.getProfileWithCredentials(c)}function h(n){let c=String((n==null?void 0:n.username)||"").trim(),g='<span style="font-size:12px; font-weight:800;">\u{1F464} Fill Credentials</span>';if(!c)return g;let s=c.length>18?c.slice(0,18)+"\u2026":c;return`
      ${g}
      <span style="font-size:10px; font-weight:600; opacity:0.8;">(${s})</span>
    `}function b(n,c,g){if(p&&p.getAttribute("data-vsa-type")!==c&&S(),p&&p.getAttribute("data-vsa-type")===c)return p.getAttribute("data-vsa-busy")!=="1"&&(p.innerHTML=n),p;let s=document.createElement("button");return s.id="vsa-assist-fab",s.setAttribute("data-vsa-type",c),s.setAttribute("data-vsa-busy","0"),s.innerHTML=n,Object.assign(s.style,{position:"fixed",bottom:"16px",right:"16px",zIndex:"2147483647",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",lineHeight:"1.1",height:"38px",padding:"0 14px",backgroundColor:"#2563EB",color:"#ffffff",border:"none",borderRadius:"10px",boxShadow:"0 4px 10px rgba(0,0,0,0.22)",cursor:"pointer",fontWeight:"800",fontSize:"12px",transition:"background-color 0.2s, transform 0.1s"}),s.onclick=async()=>{if(s.getAttribute("data-vsa-busy")!=="1"){s.setAttribute("data-vsa-busy","1");try{s.style.transform="scale(0.95)",setTimeout(()=>s.style.transform="scale(1)",100),await g(s)}finally{s.setAttribute("data-vsa-busy","0")}}},document.body.appendChild(s),p=s,s}function S(){p&&(p.remove(),p=null)}async function z(n){let c=document.querySelector(r.username),g=document.querySelector(r.password);if(!c||!g)return!1;let s;try{s=await f()}catch{return E(n,"\u26A0\uFE0F Credentials unavailable"),!1}let _=(s.username||"").trim(),w=(s.password||"").trim();return _?(q(n,"\u23F3 Filling username\u2026"),await N(),J(c,_),q(n,"\u23F3 Filling password\u2026"),await N(),J(g,w||""),G(),P(n,"\u2705 Credentials filled"),!0):(E(n,"\u26A0\uFE0F Add Profile First"),!1)}async function F(n){if(!await z(n)||!(await ne()).autoClickSubmit)return;if(Y()){G(),E(n,"\u26A0\uFE0F Captcha Required");return}q(n,"\u23F3 Signing in\u2026"),await m(5e3)&&I(n)}async function le(n){if(!await B())return;let c=await ne();if(c.autoFillCredentials&&(n==null?void 0:n.getAttribute("data-vsa-busy"))!=="1")try{if(n&&n.setAttribute("data-vsa-busy","1"),!await z(n)||!c.autoClickSubmit)return;if(Y()){G(),E(n,"\u26A0\uFE0F Captcha Required");return}q(n,"\u23F3 Signing in\u2026"),await m(5e3)&&I(n)}finally{n&&n.setAttribute("data-vsa-busy","0")}}function m(n=5e3){return new Promise(c=>{let g=Date.now()+n,s=!1;function _(v){return!(!v||v.disabled||v.getAttribute("aria-disabled")==="true")}function w(){if(s)return!1;if(Y())return G(),c(!1),!0;let v=document.querySelector(r.submit);return _(v)?(s=!0,new Promise(e=>setTimeout(e,500+Math.random()*500)).then(()=>{if(Y()){G(),c(!1);return}window.dispatchEvent(new CustomEvent("VSA_TRIGGER_B2C_CONTINUE_CLICK")),c(!0)}),!1):Date.now()>=g?(c(!1),!0):!1}if(w())return;let x=new MutationObserver(()=>{if(w())try{x.disconnect()}catch{}});x.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["disabled","aria-disabled","class"]});let C=setInterval(()=>{if(w()){clearInterval(C);try{x.disconnect()}catch{}}},100);setTimeout(()=>{clearInterval(C);try{x.disconnect()}catch{}c(!1)},n)})}function I(n){let c=!1,g=!1;function s(){n.innerHTML=n.__vsaIdleLabel||n.innerHTML,n.style.backgroundColor="#2563EB",n.style.color="#ffffff"}function _(){if(c)return!0;let x=document.querySelector(r.serverError);if(x){let M=String(x.innerText||"").replace(/\s+/g," ").trim();if(x.getAttribute("aria-hidden")==="false"&&x.style.display!=="none"&&M)return s(),c=!0,!0}let C=document.querySelector(r.verifyingModal),v=document.querySelector(r.verifyingBlurb);if(C&&v){let M=String(v.textContent||"").replace(/\s+/g," ").trim();C.getClientRects().length>0&&M==="Please wait while we process your information."&&!g&&(g=!0,q(n,"\u23F3 Waiting for portal\u2026"))}return!1}if(_())return;let w=new MutationObserver(()=>{_()&&w.disconnect()});w.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-hidden","style","class"]}),window.addEventListener("pagehide",()=>{c=!0,w.disconnect()},{once:!0})}function Q(n=5e3){return new Promise(c=>{let g=Date.now()+n,s=!1;function _(v){return!(!v||v.disabled||v.getAttribute("aria-disabled")==="true")}function w(){if(s)return!1;let v=document.getElementById("continue");if(!_(v))return Date.now()>=g?(c(!1),!0):!1;try{v.focus()}catch{}let M=()=>new Promise(e=>setTimeout(e,500+Math.random()*500));return s=!0,M().then(()=>{try{return window.dispatchEvent(new CustomEvent("VSA_TRIGGER_B2C_CONTINUE_CLICK")),c(!0),!0}catch{return c(!1),!0}}),!1}if(w())return;let x=new MutationObserver(()=>{if(w())try{x.disconnect()}catch{}});x.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["disabled","aria-disabled","class"]});let C=setInterval(()=>{if(w()){clearInterval(C);try{x.disconnect()}catch{}}},100);setTimeout(()=>{clearInterval(C);try{x.disconnect()}catch{}c(!1)},n)})}async function D(n,c){let g=[document.querySelector(r.kba1),document.querySelector(r.kba2),document.querySelector(r.kba3)].filter(Boolean),s;try{s=await f()}catch{return E(n,"\u26A0\uFE0F Answers unavailable"),!1}if(!(s.kba1||s.kba2||s.kba3))return E(n,"\u26A0\uFE0F Add Answers First"),!1;let w=0;for(let C of g){let v=C.id,M="";v==="kba1_response"?M=s.kba1||"":v==="kba2_response"?M=s.kba2||"":v==="kba3_response"&&(M=s.kba3||""),M&&M.trim().length>0&&(q(n,`\u23F3 Filling answer ${w+1}\u2026`),await V(),J(C,M),w++)}if(w===0)return E(n,"\u26A0\uFE0F No Match Found"),!1;if(P(n,"\u2705 Security filled"),!c)return!0;q(n,"\u23F3 Waiting for portal\u2026");let x=await Q(5e3);return x}async function U(n){await D(n,!0)}async function K(n){let c=await ne();c.autoFillKba&&await D(n,c.autoClickKbaContinue)}async function re(){async function n(){return(await O(["vsa_auth_token"])).vsa_auth_token?!0:(S(),!1)}if(!await n())return;let c=!1,g=!1;async function s(){if(c||!await n())return!1;let x=document.querySelector(r.username),C=document.querySelector(r.password);if(!x||!C)return!1;c=!0;try{await X()}catch{}{let e="Login not allowed for your account at this moment. Your account may have been temporarily blocked due to prohibited use of automation, which violated USTravelDocs policies.",o=document.querySelector(r.serverError),t=null;if(o){let i=()=>{let A=String(o.innerText||"").replace(/\s+/g," ").trim();if(o.getAttribute("aria-hidden")==="false"&&o.style.display!=="none"&&A===e){let a=document.getElementById("vsa-login-block-clarification");if(a){t=a;return}t=document.createElement("div"),t.id="vsa-login-block-clarification",t.innerHTML=`
                <div style="font-weight:800; margin-bottom:6px;">
                  FindVisaSlots clarification
                </div>
                <div style="margin-bottom:8px;">
                  Despite the wording above, this error is <strong>not</strong> caused by
                  FindVisaSlots or by automation. It is a temporary Visa Portal
                  block that can be triggered when the same account is accessed
                  from multiple locations.
                </div>
                <div style="font-weight:800; margin-bottom:8px;">
                  Wait 24\u201348 hours before trying again.
                </div>
                <a
                  href="https://www.reddit.com/r/findUSVisaSlots/s/80PwYSMktO"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="font-weight:700; color:#1D4ED8; text-decoration:underline;"
                >
                  Learn more about this error \u2192
                </a>
              `,Object.assign(t.style,{margin:"10px 0 14px",padding:"12px 14px",backgroundColor:"#EFF6FF",border:"1px solid #93C5FD",borderRadius:"8px",color:"#1E3A5F",fontSize:"13px",lineHeight:"1.45"}),o.insertAdjacentElement("afterend",t);return}t&&(t.remove(),t=null)};i();let l=new MutationObserver(()=>{i()});l.observe(o,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-hidden","style"]}),window.addEventListener("pagehide",()=>{l.disconnect()},{once:!0})}}try{await chrome.storage.local.remove("__vsa_pending_login_save")}catch{}let v=await u(),M=b(h(v),"LOGIN",F);return te(),le(M),!0}async function _(){if(g||!await n()||y().length<2)return!1;g=!0;let C=globalThis.VSAStorage;if(await B()===!1){if(typeof(C==null?void 0:C.getStorageRoot)!="function"||typeof(C==null?void 0:C.upsertProfile)!="function")return!1;let e=await C.getStorageRoot(),o=e.activeProfileId;if(!o||!Object.prototype.hasOwnProperty.call(e.profiles,o))return!1;await C.upsertProfile(o,{scEmbassy:"",scVisaType:"",scVisaTypeLabel:"",scCurrentAppointmentIso:null,scCurrentOFCAppointmentIso:null,scCurrentConsularAppointmentIso:null,scApplicantsCount:null,scAppId:null,ofcBookedDateIso:null})}let M=b("\u{1F511} Fill Security","KBA",U);return K(M),!0}let w=new MutationObserver(async()=>{if(!await n()){try{w.disconnect()}catch{}return}if(s(),_(),c&&g)try{w.disconnect()}catch{}});w.observe(document.documentElement,{childList:!0,subtree:!0}),await s(),await _(),window.addEventListener("pagehide",()=>{try{w.disconnect()}catch{}},{once:!0})}async function X(){(await O(["globalSettings"])).globalSettings.loginPageLoadAudioEnabled!==!0||await B()!==!1||chrome.runtime.sendMessage({type:"VSA_TTS_SPEAK",text:"Visa login page loaded."})}async function ie(){try{if(!((await O(["globalSettings"])).globalSettings||{}).alertIfNotOnSchedule)return;let g=null,s=()=>{try{chrome.runtime.sendMessage({type:"VSA_TTS_SPEAK",text:"On login page"})}catch{}};setTimeout(()=>{s(),g=setInterval(s,6e4)},15e3),window.addEventListener("pagehide",()=>{g&&clearInterval(g)},{once:!0})}catch{}}re().catch(()=>{}),ie();try{chrome.runtime.onMessage.addListener((n,c,g)=>{try{if(!n||n.type!=="VSA_PROFILE_UPDATED")return;(p==null?void 0:p.getAttribute("data-vsa-type"))==="LOGIN"&&u().then(s=>{(p==null?void 0:p.getAttribute("data-vsa-busy"))!=="1"&&(p.innerHTML=h(s))}).catch(()=>{}),g==null||g({ok:!0})}catch{try{g==null||g({ok:!1})}catch{}}})}catch{}})();(()=>{let r={username:"#signInName",password:"#password",captcha:"#extension_atlasCaptchaResponse",kba1:"#kba1_response",kba2:"#kba2_response",kba3:"#kba3_response",continueBtn:"#continue"},N="__vsa_pending_login_save",V="__vsa_pending_login_save_dismissed",p="vsa-login-save-prompt",O=null,B=null;function y(e){try{return document.querySelector(e)}catch{return null}}function $(e){return String(e||"").trim().toLowerCase()}function H(){return!!(y(r.username)&&y(r.password))}function W(){return{kba1:!!y(r.kba1),kba2:!!y(r.kba2),kba3:!!y(r.kba3)}}function E(){let e=W();return!!(e.kba1||e.kba2||e.kba3)}function P(){var e;try{(e=document.getElementById(p))==null||e.remove()}catch{}}async function q(e,o){try{let t=await chrome.storage.local.get([e]),i=t==null?void 0:t[e];if(!i)return o;let l=JSON.parse(i);return l??o}catch{return o}}async function ee(e,o){try{await chrome.storage.local.set({[e]:JSON.stringify(o)})}catch{}}async function se(e){try{await chrome.storage.local.remove(e)}catch{}}async function ae(){let e=await q(N,null);if(!e)return null;let o=b();if(typeof o.decryptCredentialFromStorage!="function")return await te(),null;try{let t={...e};return t.password=await o.decryptCredentialFromStorage(e.password),t.kba1=await o.decryptCredentialFromStorage(e.kba1),t.kba2=await o.decryptCredentialFromStorage(e.kba2),t.kba3=await o.decryptCredentialFromStorage(e.kba3),t}catch{return await te(),null}}async function j(e){if(!e){await ee(N,null);return}let o=b();if(typeof o.encryptCredentialForStorage!="function")throw new Error("CREDENTIAL_STORAGE_UNAVAILABLE");let t={...e};t.password=await o.encryptCredentialForStorage(e.password),t.kba1=await o.encryptCredentialForStorage(e.kba1),t.kba2=await o.encryptCredentialForStorage(e.kba2),t.kba3=await o.encryptCredentialForStorage(e.kba3),await ee(N,t)}async function te(){await se(N)}async function G(){return await q(V,"")}async function Y(e){await ee(V,$(e))}async function ne(){await se(V)}function J(){return"prof_"+Date.now().toString(36)+Math.random().toString(36).slice(2,7)}function u(e){try{let o=document.getElementById("kbq"+e+"ReadOnly")||document.querySelector('[id^="kbq'+e+'"][id$="ReadOnly"]');if(!o)return"";let t=o.getAttribute&&o.getAttribute("aria-label")||"";return String(t||o.textContent||o.innerText||"").trim()}catch{return""}}function f(){return{username:"",password:"",kba1Question:"",kba1:"",kba2Question:"",kba2:"",kba3Question:"",kba3:"",capturedAtMs:Date.now()}}function h(){try{chrome.runtime.sendMessage({type:"VSA_PROFILE_UPDATED",source:"loginSavePrompt"},()=>{chrome.runtime.lastError})}catch{}}function b(){return globalThis.VSAStorage||{}}async function S(){let e=b();if(typeof e.getStorageRoot=="function")return await e.getStorageRoot();let o=await chrome.storage.local.get(["profiles","activeProfileId"]);return{profiles:o.profiles||{},activeProfileId:o.activeProfileId||"default"}}async function z(){let e=await S(),o=e.activeProfileId||"default",t=e.profiles&&e.profiles[o]||e.profiles&&e.profiles.default||{};return{root:e,activeId:o,activeProfile:t}}function F(e,o){let t=$(o);if(!t)return[];let i=[],l=(e==null?void 0:e.profiles)||{};return Object.entries(l).forEach(([A,k])=>{let a=$((k==null?void 0:k.username)||"");a&&a===t&&i.push(A)}),i}function le(e){let o=(e==null?void 0:e.profiles)||{};return Object.entries(o).filter(([t,i])=>t!=="default"&&!!String((i==null?void 0:i.username)||"").trim())}function m(e){var t;let o=String(((t=e==null?void 0:e.globalSettings)==null?void 0:t.tier)||(e==null?void 0:e.vsa_user_tier)||"free").trim();return o==="tier_premium"?3:o==="tier_agent"?Number.POSITIVE_INFINITY:1}function I(e){var t;let o=String(((t=e==null?void 0:e.globalSettings)==null?void 0:t.tier)||(e==null?void 0:e.vsa_user_tier)||"free").trim();return o==="tier_premium"?"Your Premium plan allows up to 3 saved profiles. Delete one before saving another.":o==="tier_agent"?"Unable to save this profile right now.":o==="tier_standard"?"Your Standard plan allows 1 saved profile. Delete it before saving another.":"Your Free plan allows 1 saved profile. Delete it before saving another."}function Q(e,o){let t=le(e),i=m(e);if(!Number.isFinite(i))return!0;let l=$((o==null?void 0:o.username)||"");return t.some(([,k])=>$((k==null?void 0:k.username)||"")===l)?!0:t.length<i}async function D(){try{let e=y(r.username),o=y(r.password);if(!e)return;let t=String(e.value||"").trim();if(!t)return;let i=await ae()||f();i.username=t,i.password=o?String(o.value||""):"",i.capturedAtMs=Date.now(),await j(i),await ne()}catch{}}async function U(){if(!U.__running){U.__running=!0;try{let e=await ae()||f();if(!e.username){let l=y(r.username);l&&String(l.value||"").trim()&&(e.username=String(l.value||"").trim())}if(!e.password){let l=y(r.password);l&&(e.password=String(l.value||""))}let o=y(r.kba1),t=y(r.kba2),i=y(r.kba3);o&&(e.kba1=String(o.value||"").trim(),e.kba1Question=u(1)),t&&(e.kba2=String(t.value||"").trim(),e.kba2Question=u(2)),i&&(e.kba3=String(i.value||"").trim(),e.kba3Question=u(3)),e.capturedAtMs=Date.now(),$(e.username)&&(await j(e),await ne())}catch{}finally{U.__running=!1}}}function K(e){let o={};return String((e==null?void 0:e.username)||"").trim()&&(o.username=String(e.username).trim()),String((e==null?void 0:e.password)||"").length>0&&(o.password=String(e.password)),String((e==null?void 0:e.kba1Question)||"").trim()&&(o.kba1Question=String(e.kba1Question).trim()),String((e==null?void 0:e.kba1)||"").trim()&&(o.kba1=String(e.kba1).trim()),String((e==null?void 0:e.kba2Question)||"").trim()&&(o.kba2Question=String(e.kba2Question).trim()),String((e==null?void 0:e.kba2)||"").trim()&&(o.kba2=String(e.kba2).trim()),String((e==null?void 0:e.kba3Question)||"").trim()&&(o.kba3Question=String(e.kba3Question).trim()),String((e==null?void 0:e.kba3)||"").trim()&&(o.kba3=String(e.kba3).trim()),o}function re(e){return{applicantName:"",username:String((e==null?void 0:e.username)||"").trim(),password:String((e==null?void 0:e.password)||""),kba1Question:String((e==null?void 0:e.kba1Question)||"").trim(),kba1:String((e==null?void 0:e.kba1)||"").trim(),kba2Question:String((e==null?void 0:e.kba2Question)||"").trim(),kba2:String((e==null?void 0:e.kba2)||"").trim(),kba3Question:String((e==null?void 0:e.kba3Question)||"").trim(),kba3:String((e==null?void 0:e.kba3)||"").trim(),desiredSlotStartDate:null,desiredSlotEndDate:null}}async function X(e){let o=b(),t=K(e);return Object.keys(t).length&&typeof o.updateActiveProfile=="function"&&await o.updateActiveProfile(t)?(h(),!0):!1}async function ie(e){let o=b(),t=await S();if(!$((e==null?void 0:e.username)||"")||typeof o.upsertProfile!="function"||typeof o.setActiveProfileId!="function")return!1;let l=F(t,e.username);if(typeof o.deleteProfile=="function")for(let a of l)try{await o.deleteProfile(a)}catch{}let A=J(),k=re(e);return await o.upsertProfile(A,k),await o.setActiveProfileId(A),h(),!0}function n(){if(document.getElementById(p+"__style"))return;let e=document.createElement("style");e.id=p+"__style",e.textContent=`
      #${p} {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 2147483647;
        width: 360px;
        max-width: calc(100vw - 32px);
        background: #FFFFFF;
        color: #202124;
        border: 1.5px solid #BDC1C6;
        border-radius: 12px;
        box-shadow:
          0 0 0 1px rgba(60,64,67,0.08),
          0 8px 24px rgba(0,0,0,0.18);
        padding: 20px;
        font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      }
      #${p} .vsa-title {
        font-size: 18px;
        font-weight: 600;
        color: #202124;
        margin: 0 0 8px 0;
      }
      #${p} .vsa-sub {
        font-size: 14px;
        line-height: 1.5;
        color: #3C4043;
        margin: 0 0 14px 0;
      }
      #${p} .vsa-note {
        font-size: 12px;
        line-height: 1.45;
        color: #5F6368;
        margin: 0 0 18px 0;
        font-weight: 500;
      }
      #${p} .vsa-row {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
      }
      #${p} .vsa-btn {
        min-width: 84px;
        height: 36px;
        padding: 0 16px;
        border-radius: 18px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        border: 1px solid transparent;
      }
      #${p} .vsa-btn-secondary {
        background: #FFFFFF;
        color: #1A73E8;
        border-color: #DADCE0;
      }
      #${p} .vsa-btn-primary {
        background: #1A73E8;
        color: #FFFFFF;
      }
      #${p} .vsa-btn-secondary:hover {
        background: #F8F9FA;
      }
      #${p} .vsa-btn-primary:hover {
        background: #1765CC;
      }
    `,(document.head||document.documentElement).appendChild(e)}function c(e,o){var i;P(),n();let t=document.createElement("div");t.id=p,t.innerHTML=`
      <div class="vsa-title">Profile limit reached</div>
      <div class="vsa-sub">
        ${s(e)}
      </div>
      <div class="vsa-row">
        <button type="button" class="vsa-btn vsa-btn-primary" id="${p}__ok">OK</button>
      </div>
    `,(document.body||document.documentElement).appendChild(t),(i=document.getElementById(p+"__ok"))==null||i.addEventListener("click",async()=>{try{await o()}catch{}})}function g(e,o,t){var A,k;P(),n();let i=String((e==null?void 0:e.username)||"").trim();if(!i)return;let l=document.createElement("div");l.id=p,l.innerHTML=`
      <div class="vsa-title">Save sign-in info?</div>
      <div class="vsa-sub">
        Save <strong>${s(i)}</strong> for faster sign-in next time?
      </div>
      <div class="vsa-note">
        Stored on this computer only.
      </div>
      <div class="vsa-row">
        <button type="button" class="vsa-btn vsa-btn-secondary" id="${p}__dismiss">Not now</button>
        <button type="button" class="vsa-btn vsa-btn-primary" id="${p}__save">Save</button>
      </div>
    `,(document.body||document.documentElement).appendChild(l),(A=document.getElementById(p+"__dismiss"))==null||A.addEventListener("click",async()=>{try{await t()}catch{}}),(k=document.getElementById(p+"__save"))==null||k.addEventListener("click",async()=>{let a=document.getElementById(p+"__save");a&&(a.disabled=!0,a.textContent="Saving...");try{await o()}catch{a&&(a.disabled=!1,a.textContent="Save")}})}function s(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}async function _(){let e=await ae();if(!e){P();return}let o=$(e.username);if(!o){await te(),P();return}if(H()||E()){P();return}let t=await G();if(t&&t===o){P();return}let{activeProfile:i}=await z(),l=$((i==null?void 0:i.username)||"");if(l&&l===o){if(!await X(e)){P();return}await te(),await ne(),P();return}await Y(e.username),await te(),P()}function w(e){try{if(e&&e.closest){let o=e.closest("form");if(o)return o}}catch{}try{return document.querySelector("form")}catch{}return null}function x(){let e=y(r.continueBtn),o=w(y(r.password)||y(r.username)||e),t=w(y(r.kba1)||y(r.kba2)||y(r.kba3)||e);e&&H()&&!e.__vsa_login_save_click_wired&&(e.__vsa_login_save_click_wired=!0,e.addEventListener("click",()=>{D()})),o&&H()&&!o.__vsa_login_save_submit_wired&&(o.__vsa_login_save_submit_wired=!0,o.addEventListener("submit",()=>{D()},!0)),[y(r.username),y(r.password),y(r.captcha)].forEach(i=>{!i||i.__vsa_login_save_enter_wired||(i.__vsa_login_save_enter_wired=!0,i.addEventListener("keydown",l=>{(l.which===13||l.keyCode===13||l.key==="Enter")&&D()}))}),[y(r.username),y(r.password)].forEach(i=>{!i||i.__vsa_login_save_input_wired||(i.__vsa_login_save_input_wired=!0,i.addEventListener("input",()=>{D()}),i.addEventListener("change",()=>{D()}))}),e&&E()&&!H()&&!e.__vsa_kba_save_click_wired&&(e.__vsa_kba_save_click_wired=!0,e.addEventListener("click",()=>{U()})),t&&E()&&!H()&&!t.__vsa_kba_save_submit_wired&&(t.__vsa_kba_save_submit_wired=!0,t.addEventListener("submit",()=>{U()},!0)),[y(r.kba1),y(r.kba2),y(r.kba3)].forEach(i=>{!i||i.__vsa_kba_save_enter_wired||(i.__vsa_kba_save_enter_wired=!0,i.addEventListener("keydown",l=>{(l.which===13||l.keyCode===13||l.key==="Enter")&&U()}))})}async function C(){try{x()}catch{}}function v(){C(),O||(O=new MutationObserver(()=>{C()}),O.observe(document.documentElement,{childList:!0,subtree:!0})),B||(B=setInterval(()=>{C()},800))}function M(){try{O==null||O.disconnect()}catch{}O=null;try{clearInterval(B)}catch{}B=null,P()}globalThis.VSALoginSavePrompt={start:v,destroy:M,captureLoginPending:D,enrichPendingFromKba:U,maybeHandlePending:_,__debug:async()=>({pending:await ae(),dismissedUsername:await G(),hasLoginFields:H(),hasAnyKbaField:E()})},location.hostname.endsWith(".b2clogin.com")&&v()})();(()=>{let r="vsa-login-calendar-instruction-overlay",N="vsa-login-calendar-instruction-style",V="vsa_login_calendar_instruction_minimized",p="vsa-assist-fab",O="#signInName",B="#password",y=["#kba1_response","#kba2_response","#kba3_response"],$="https://findvisaslots.com/welcome.cfm",H="https://getusvisa.ai/visa_scheduling/vsa/api_code_request.cfm",W="",E="unknown",P=!1,q=!1,ee=!1;async function se(){try{E=(await chrome.storage.local.get("vsa_auth_token")).vsa_auth_token?"logged_in":"logged_out"}catch{E="logged_out"}}function ae(){return sessionStorage.getItem(V)==="1"}function j(m){sessionStorage.setItem(V,m?"1":"0")}function te(){let m=document.querySelector(O),I=document.querySelector(B),Q=y.map(D=>document.querySelector(D)).find(Boolean);return!!(m&&I&&!Q)}function G(){return q?!1:E==="logged_out"&&te()}function Y(){if(document.getElementById(N))return;let m=document.createElement("style");m.id=N,m.textContent=`
      #${r} {
        position: fixed;
        right: 14px;
        bottom: 16px;
        width: 284px;
        max-width: calc(100vw - 28px);
        z-index: 2147483000;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-end;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      #${r},
      #${r} * {
        box-sizing: border-box;
      }

      #${r} .vsa-login-instruction-card {
        position: relative;
        width: 100%;
        border: 1px solid rgba(255,255,255,0.14);
        background: rgba(17, 24, 39, 0.94);
        background-image: none;
        box-shadow: 0 10px 24px rgba(0,0,0,0.36);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        color: rgba(255,255,255,0.92);
        border-radius: 13px;
        padding: 11px 12px 11px;
        margin: 0;
        text-align: left;
      }

      #${r} .vsa-login-instruction-brand {
        padding-right: 24px;
        font-size: 14px;
        line-height: 1.18;
        font-weight: 850;
        letter-spacing: 0.01em;
        color: rgba(147, 197, 253, 0.96);
      }

      #${r} .vsa-login-instruction-title {
        margin-top: 10px;
        padding-right: 10px;
        font-size: 12px;
        line-height: 1.28;
        font-weight: 750;
        color: #ffffff;
        white-space: nowrap;
      }

      #${r} .vsa-login-instruction-subtitle {
        margin-top: 3px;
        font-size: 12px;
        line-height: 1.28;
        font-weight: 750;
        color: rgba(255,255,255,0.88);
        white-space: nowrap;
      }

      #${r} .vsa-login-instruction-benefit-icon {
        display: inline-block;
        width: 14px;
        margin-right: 4px;
        text-align: center;
        font-size: 11px;
        line-height: 1;
      }

      #${r} .vsa-login-instruction-start-label {
        margin-top: 11px;
        font-size: 11px;
        line-height: 1.25;
        font-weight: 800;
        color: rgba(255,255,255,0.74);
      }

      #${r} .vsa-login-instruction-steps {
        margin: 5px 0 0;
        padding-left: 17px;
        font-size: 12px;
        line-height: 1.38;
        font-weight: 500;
        color: rgba(255,255,255,0.80);
      }

      #${r} .vsa-login-instruction-help-link,
      #${r} .vsa-login-instruction-popup-button {
        color: rgba(147, 197, 253, 0.98);
        font-weight: 750;
        text-decoration: underline;
        text-underline-offset: 2px;
      }

      #${r} .vsa-login-instruction-popup-button {
        appearance: none;
        -webkit-appearance: none;
        display: inline;
        width: auto;
        min-width: 0;
        height: auto;
        min-height: 0;
        border: 0;
        background: none;
        padding: 0;
        margin: 0;
        font: inherit;
        line-height: inherit;
        vertical-align: baseline;
        cursor: pointer;
      }

      #${r} .vsa-login-instruction-register-form {
        margin-top: 13px;
        padding-top: 12px;
        border-top: 1px solid rgba(255,255,255,0.12);
      }

      #${r} .vsa-login-instruction-register-title {
        margin-bottom: 6px;
        font-size: 12px;
        line-height: 1.2;
        font-weight: 850;
        color: #ffffff;
      }

      #${r} .vsa-login-instruction-register-row {
        display: flex;
        align-items: stretch;
        gap: 5px;
        width: 100%;
      }

      #${r} .vsa-login-instruction-register-email {
        appearance: none;
        -webkit-appearance: none;
        flex: 1 1 auto;
        min-width: 0;
        width: auto;
        height: 30px;
        min-height: 30px;
        margin: 0;
        padding: 4px 7px;
        border: 1px solid rgba(255,255,255,0.30);
        border-radius: 6px;
        background: rgba(255,255,255,0.96);
        color: #111827;
        font-family: inherit;
        font-size: 11px;
        line-height: 1.2;
        outline: none;
      }

      #${r} .vsa-login-instruction-register-button {
        appearance: none;
        -webkit-appearance: none;
        flex: 0 0 auto;
        width: auto;
        height: 30px;
        min-height: 30px;
        margin: 0;
        padding: 4px 9px;
        border: 0;
        border-radius: 6px;
        background: #2563eb;
        color: #ffffff;
        font-family: inherit;
        font-size: 11px;
        line-height: 1.2;
        font-weight: 800;
        white-space: nowrap;
        cursor: pointer;
      }

      #${r} .vsa-login-instruction-register-button:disabled {
        opacity: 0.60;
        cursor: default;
      }

      #${r} .vsa-login-instruction-register-note {
        margin-top: 5px;
        font-size: 9px;
        line-height: 1.3;
        font-weight: 650;
        color: rgba(255,255,255,0.68);
      }

      #${r} .vsa-login-instruction-register-status {
        display: none;
        margin-top: 5px;
        font-size: 10px;
        line-height: 1.3;
        font-weight: 750;
        color: rgba(252, 211, 77, 0.96);
      }

      #${r} .vsa-login-instruction-help-link:hover,
      #${r} .vsa-login-instruction-popup-button:hover {
        color: #ffffff;
      }

      #${r} .vsa-login-instruction-note {
        margin-top: 12px;
        font-size: 12px;
        line-height: 1.45;
        font-weight: 600;
        color: rgba(255,255,255,0.66);
      }

      #${r} .vsa-login-instruction-minimize,
      #${r} .vsa-login-instruction-pill {
        appearance: none;
        -webkit-appearance: none;
        border: 0;
        background: none;
        font-family: inherit;
      }

      #${r} .vsa-login-instruction-minimize {
        position: absolute;
        top: 6px;
        right: 6px;
        width: 18px;
        height: 18px;
        min-height: 18px;
        padding: 0;
        border-radius: 999px;
        background: rgba(255,255,255,0.10);
        color: rgba(255,255,255,0.78);
        font-size: 14px;
        line-height: 16px;
        font-weight: 650;
        cursor: pointer;
      }

      #${r} .vsa-login-instruction-minimize:hover {
        background: rgba(255,255,255,0.16);
        color: #ffffff;
      }

      #${r} .vsa-login-instruction-pill {
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: auto;
        max-width: 220px;
        min-width: 0;
        height: auto !important;
        min-height: 0 !important;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.14);
        background: rgba(17, 24, 39, 0.94);
        background-image: none;
        box-shadow: 0 14px 34px rgba(0,0,0,0.45);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        color: rgba(255,255,255,0.92);
        border-radius: 9px;
        padding: 10px 12px;
        margin: 0;
        cursor: pointer;
        text-align: left;
        white-space: normal;
        line-height: normal;
      }

      #${r} .vsa-login-instruction-pill-title {
        display: block;
        max-width: 100%;
        overflow-wrap: normal;
        word-break: normal;
        white-space: nowrap;
        font-size: 13px;
        line-height: 1.25;
        font-weight: 850;
        color: #ffffff;
      }

      #${r} .vsa-login-instruction-pill-subtitle {
        display: block;
        max-width: 100%;
        margin-top: 3px;
        overflow-wrap: normal;
        word-break: normal;
        white-space: nowrap;
        font-size: 12px;
        line-height: 1.25;
        font-weight: 700;
        color: rgba(255,255,255,0.70);
      }

      @media (max-width: 420px) {
        #${r} {
          right: 10px;
          bottom: 14px;
          width: 284px;
          max-width: calc(100vw - 20px);
        }
      }
    `,document.head.appendChild(m)}function ne(){let I=document.getElementById(p);if(!I)return 16;let Q=I.getBoundingClientRect();return Math.max(16,Math.ceil(window.innerHeight-Q.top+12))}function J(){let m=document.getElementById(r);m&&(m.style.bottom=`${ne()}px`)}function u(){let m=document.getElementById(r);m&&(m.remove(),W="")}function f(){return`
      <div class="vsa-login-instruction-card">
        <button type="button" class="vsa-login-instruction-minimize" aria-label="Minimize FindVisaSlots instructions">\xD7</button>

        <div class="vsa-login-instruction-brand">FindVisaSlots:</div>

        <div class="vsa-login-instruction-title"><span class="vsa-login-instruction-benefit-icon" aria-hidden="true">\u25B8</span>Helps you monitor the calendar</div>
        <div class="vsa-login-instruction-subtitle"><span class="vsa-login-instruction-benefit-icon" aria-hidden="true">\u25B8</span>Alerts you when earlier slots open</div>
        <div class="vsa-login-instruction-subtitle"><span class="vsa-login-instruction-benefit-icon" aria-hidden="true">\u25B8</span>Shows community slots in real time</div>

        <div class="vsa-login-instruction-register-form">
          <div class="vsa-login-instruction-register-title">Get started free</div>

          <div class="vsa-login-instruction-register-row">
            <input
              type="email"
              class="vsa-login-instruction-register-email"
              placeholder="your@email.com"
              autocomplete="email"
            />

            <button
              type="button"
              class="vsa-login-instruction-register-button"
            >Send code</button>
          </div>

          <div class="vsa-login-instruction-register-note">
            Any email works. It does not need to be your Visa Portal email.
          </div>

          <div class="vsa-login-instruction-register-status"></div>
        </div>

        <div class="vsa-login-instruction-start-label">After registering:</div>

        <ol class="vsa-login-instruction-steps">
          <li>Log in to the Visa Portal</li>
          <li>Go to the calendar page</li>
        </ol>
      </div>
    `}function h(){return`
      <button type="button" class="vsa-login-instruction-pill" aria-label="Show FindVisaSlots instructions">
        <span class="vsa-login-instruction-pill-title">To start</span>
        <span class="vsa-login-instruction-pill-subtitle">Show setup steps</span>
      </button>
    `}async function b(){try{let m=await chrome.runtime.sendMessage({type:"VSA_CAN_OPEN_ACTION_POPUP"});P=!!(m!=null&&m.ok)&&!!(m!=null&&m.supported)}catch{P=!1}}async function S(){try{let m=await chrome.runtime.sendMessage({type:"VSA_OPEN_ACTION_POPUP"});if(m!=null&&m.ok){q=!0,u();return}P=!1,W="",F()}catch{P=!1,W="",F()}}function z(m){let I=m.querySelector(".vsa-login-instruction-minimize");I&&I.addEventListener("click",()=>{j(!0),F()});let Q=m.querySelector(".vsa-login-instruction-popup-button");Q&&Q.addEventListener("click",X=>{X.preventDefault(),X.stopPropagation(),S()});let D=m.querySelector(".vsa-login-instruction-register-email"),U=m.querySelector(".vsa-login-instruction-register-button"),K=m.querySelector(".vsa-login-instruction-register-status");D&&U&&K&&U.addEventListener("click",async X=>{if(X.preventDefault(),X.stopPropagation(),ee)return;let ie=String(D.value||"").trim().toLowerCase();if(!(ie.length>=5&&ie.includes("@")&&ie.includes("."))){K.textContent="Enter a valid email address.",K.style.display="block";return}ee=!0,U.disabled=!0,U.textContent="Sending code\u2026",K.textContent="",K.style.display="none";try{let c=await chrome.storage.local.get("vsa_install_id"),g=await fetch(H,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:ie,device_client:"computer",install_id:c.vsa_install_id||null})}),s=await g.json().catch(()=>null);if(!g.ok||(s==null?void 0:s.ok)!==!0){K.textContent=(s==null?void 0:s.error)||"Could not send code. Please try again.",K.style.display="block";return}if(s.api_token&&s.device_token){await chrome.storage.local.set({vsa_auth_token:s.api_token,vsa_device_token:s.device_token,vsa_user_id:s.id||null,vsa_user_email:s.email||"",vsa_user_tier:s.tier||"free",vsa_extension_tier:s.extension_tier||s.tier||"free",vsa_tier_expires_at:s.tier_expires_at||null,vsa_last_sync_at:Date.now(),vsa_show_realtime_feed_onboarding:!0});let _=globalThis.VSAStorage;typeof(_==null?void 0:_.updateGlobalSettings)=="function"&&await _.updateGlobalSettings({tier:s.extension_tier||s.tier||"free"}),await chrome.storage.local.remove("vsa_auth_card_state"),await S();return}await chrome.storage.local.set({vsa_auth_card_state:{step:"code",email:ie}}),K.textContent="Code sent. Opening FindVisaSlots\u2026",K.style.display="block",await S()}catch{K.textContent="Network error. Please try again.",K.style.display="block"}finally{ee=!1,U.disabled=!1,U.textContent="Send code"}});let re=m.querySelector(".vsa-login-instruction-pill");re&&re.addEventListener("click",()=>{j(!1),F()})}function F(){if(!G()){u();return}Y();let m=ae()?"minimized":"expanded";if(m===W&&document.getElementById(r)){J();return}let I=document.getElementById(r);I||(I=document.createElement("div"),I.id=r,document.body.appendChild(I)),I.innerHTML=m==="minimized"?h():f(),W=m,z(I),J()}async function le(){await se(),await b(),F(),new MutationObserver(()=>{F()}).observe(document.documentElement,{childList:!0,subtree:!0}),window.addEventListener("resize",J,{passive:!0}),chrome.runtime.onMessage.addListener(I=>{if((I==null?void 0:I.type)==="VSA_EXTENSION_POPUP_OPENED"){q=!0,u();try{pollTimerId&&clearTimeout(pollTimerId)}catch{}try{countdownTimerId&&clearInterval(countdownTimerId)}catch{}pollTimerId=null,countdownTimerId=null,nextPollDueAtMs=0}}),chrome.storage.onChanged.addListener((I,Q)=>{Q==="local"&&I.vsa_auth_token&&(E=I.vsa_auth_token.newValue?"logged_in":"logged_out",F())}),setInterval(()=>{F()},1e3)}le()})();(()=>{let r="vsa-login-activity-feed-overlay",N="vsa-login-activity-feed-style",V="vsa-login-activity-feed-list",p="vsa-login-activity-feed-headline",O="vsa-login-activity-feed-countdown",B="vsa-login-activity-feed-local-time",y="vsa_login_activity_feed_minimized",$="vsa_login_activity_feed_country",H="vsa_login_activity_feed_marketing_headline",W="vsa_login_feed_marketing_headlines",E="Don\u2019t check alone. Check together.",P="https://getusvisa.ai/visa_scheduling/vsa/api_public_activity_feed.cfm",q="https://analytics.vsa-core.workers.dev/geo-country",j=[{code:"IN",label:"India"},{code:"PK",label:"Pakistan"},{code:"AE",label:"UAE"},{code:"AU",label:"Australia"}],te="vsa-assist-fab",G="vsa-login-calendar-instruction-overlay",Y="#signInName",ne="#password",J=["#kba1_response","#kba2_response","#kba3_response"],u=null,f=null,h=0,b=null,S="",z=!1,F=null,le=!1,m=E;async function I(){return z?le:F?await F:(F=(async()=>{try{let a=await chrome.runtime.sendMessage({type:"VSA_IS_SESSION_RECOVERY_POPUP"});le=(a==null?void 0:a.ok)===!0&&(a==null?void 0:a.isRecoveryPopup)===!0}catch{le=!1}return z=!0,F=null,le})(),await F)}async function Q(){try{let a=await chrome.storage.local.get(["globalSettings"]);return((a==null?void 0:a.globalSettings)||{}).loginActivityFeedEnabled!==!1}catch{return!0}}function D(a){return String(a||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function U(){let a=document.querySelector(Y),d=document.querySelector(ne),L=J.map(R=>document.querySelector(R)).find(Boolean);return!(!a||!d||L)}function K(){try{return sessionStorage.getItem(y)==="1"}catch{return!1}}function re(a){try{sessionStorage.setItem(y,a?"1":"0")}catch{}}function X(a){let d=String(a||"").trim().toUpperCase();return!(!/^[A-Z]{2}$/.test(d)||d==="XX"||d==="T1")}function ie(){try{let a=String(sessionStorage.getItem($)||"").trim().toUpperCase();return X(a)?a:"IN"}catch{return"IN"}}function n(a){let d=String(a||"").trim().toUpperCase();if(X(d))try{sessionStorage.setItem($,d)}catch{}}function c(a){let d=String(a||"").trim().toUpperCase(),L=j.find(R=>R.code===d);if(L)return L.label;try{return new Intl.DisplayNames([],{type:"region"}).of(d)||d}catch{return d||"India"}}function g(){let a=document.getElementById(O),d=document.getElementById(B);if(!a||!d)return;let L=Math.max(0,Math.ceil((h-Date.now())/1e3));a.textContent=`${L}s`;try{d.textContent=new Date().toLocaleTimeString([],{hour:"numeric",minute:"2-digit",second:"2-digit"})}catch{d.textContent=""}}function s(a){h=Date.now()+a*1e3;try{f&&clearInterval(f),g(),f=setInterval(()=>{g()},1e3)}catch{}}function _(a){let d=Number(a);if(!Number.isFinite(d)||d<=0)return"";try{return new Date(d).toLocaleTimeString([],{hour:"numeric",minute:"2-digit",second:"2-digit"})}catch{return""}}function w(){if(document.getElementById(N))return;let a=document.createElement("style");a.id=N,a.textContent=`
      #${r} {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 2147483646;
        width: 316px;
        max-width: calc(100vw - 32px);
        color: rgba(255,255,255,0.92);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        pointer-events: auto;
        display: flex;
        justify-content: flex-end;
      }

      #${r} .vsa-login-feed-card {
        width: 100%;
        background: rgba(17, 24, 39, 0.82);
        border: 1px solid rgba(255,255,255,0.14);
        border-radius: 14px;
        box-shadow: 0 14px 34px rgba(0,0,0,0.45);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        padding: 10px 12px;
      }

      #${r} .vsa-login-feed-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 8px;
      }

      #${r} .vsa-login-feed-brand {
        font-size: 13px;
        line-height: 1.2;
        font-weight: 800;
        color: rgba(147, 197, 253, 0.95);
        letter-spacing: 0.02em;
      }

      #${r} .vsa-login-feed-headline {
        margin: 8px 0 4px;
        font-size: 14px;
        line-height: 1.2;
        font-weight: 850;
        color: rgba(255,255,255,0.94);
      }

      #${r} .vsa-login-feed-context {
        margin: 0 0 7px;
        font-size: 11px;
        line-height: 1.3;
        font-weight: 650;
        color: rgba(255,255,255,0.92);
      }

      #${r} .vsa-login-feed-community {
        display: block;
        margin-top: 3px;
        font-size: 13px;
        font-weight: 850;
        color: rgba(255,255,255,0.98);
      }

      #${r} .vsa-login-feed-min-btn {
        width: 18px;
        min-width: 18px;
        height: 18px;
        border-radius: 6px;
        border: 1px solid rgba(255,255,255,0.18);
        background: rgba(255,255,255,0.06);
        color: rgba(255,255,255,0.86);
        font-size: 12px;
        font-weight: 900;
        line-height: 16px;
        cursor: pointer;
        padding: 0;
      }

      #${r} .vsa-login-feed-country-tabs {
        display: flex;
        gap: 3px;
        margin: 7px 0 0;
        overflow: hidden;
      }

      #${r} .vsa-login-feed-country-tab {
        appearance: none;
        -webkit-appearance: none;
        border: 1px solid rgba(255,255,255,0.10);
        background: rgba(255,255,255,0.04);
        color: rgba(255,255,255,0.62);
        border-radius: 4px;
        padding: 0 4px;
        margin: 0;
        font-family: inherit;
        font-size: 9px;
        height: 13px;
        min-height: 0;
        line-height: 11px;
        font-weight: 800;
        cursor: pointer;
        white-space: nowrap;
      }

      #${r} .vsa-login-feed-country-tab[aria-pressed="true"] {
        border-color: rgba(147, 197, 253, 0.34);
        background: rgba(37, 99, 235, 0.16);
        color: rgba(219,234,254,0.90);
      }

      @keyframes vsa-login-feed-dot-pulse {
        0%, 100% { opacity: 0.35; transform: scale(0.92); }
        50% { opacity: 1; transform: scale(1); }
      }

      #${r} .vsa-login-feed-delay-note {
        margin: 2px 0 0;
        padding: 6px 0 3px;
        border-top: 1px solid rgba(255,255,255,0.075);
        font-size: 10px;
        line-height: 1.3;
        font-weight: 800;
        letter-spacing: 0.015em;
        color: rgba(252, 211, 77, 0.88);
        white-space: normal;
        overflow: visible;
        text-overflow: clip;
      }

      #${r} .vsa-login-feed-delay-action {
        margin-top: 3px;
      }

      #${r} .vsa-login-feed-realtime {
        color: rgba(255,255,255,0.94);
      }

      #${r} .vsa-login-feed-current-note {
        margin: 3px 0 0;
        font-size: 11px;
        line-height: 1.25;
        font-weight: 850;
        letter-spacing: 0.025em;
        color: rgba(251, 146, 60, 0.98);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      #${r} .vsa-login-feed-login-note {
        margin: 9px 0 0;
        font-size: 10px;
        line-height: 1.3;
        font-weight: 750;
        color: rgba(252, 211, 77, 0.88);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      #${r} .vsa-login-feed-live-row {
        align-items: center;
      }

      #${r} .vsa-login-feed-live-dot {
        width: 6px;
        min-width: 6px;
        height: 6px;
        margin-top: 0;
        border-radius: 999px;
        background: rgba(34, 197, 94, 0.95);
        box-shadow: 0 0 8px rgba(34, 197, 94, 0.72);
        animation: vsa-login-feed-dot-pulse 1.15s ease-in-out infinite;
      }

      #${r} .vsa-login-feed-refresh-meta {
        color: rgba(220, 252, 231, 0.92);
      }

      #${r} .vsa-login-feed-row-time.vsa-login-feed-local-time {
        font-size: 11px;
      }

      #${r} .vsa-login-feed-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        gap: 0;
        max-height: 238px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.10);
        background: rgba(255,255,255,0.045);
        border-radius: 10px;
        padding: 6px 8px;
      }

      #${r} .vsa-login-feed-row {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 5px 0;
        overflow-wrap: anywhere;
      }

      #${r} .vsa-login-feed-row + .vsa-login-feed-row {
        border-top: 1px solid rgba(255,255,255,0.075);
      }

      #${r} .vsa-login-feed-row-time {
        display: block;
        flex: 0 0 auto;
        margin-top: 1px;
        font-size: 9px;
        line-height: 1.15;
        font-weight: 800;
        color: rgba(74, 222, 128, 0.92);
        white-space: nowrap;
        text-align: left;
      }

      #${r} .vsa-login-feed-row-line {
        display: block;
        flex: 1 1 auto;
        min-width: 0;
        font-size: 11px;
        line-height: 1.28;
        font-weight: 650;
        color: rgba(255,255,255,0.84);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      #${r} .vsa-login-feed-row:last-child .vsa-login-feed-row-line {
        color: rgba(220,252,231,0.95);
      }

      #${r} .vsa-login-feed-empty {
        border: 1px solid rgba(255,255,255,0.10);
        background: rgba(255,255,255,0.045);
        border-radius: 9px;
        padding: 8px;
        font-size: 11px;
        line-height: 1.35;
        font-weight: 600;
        color: rgba(255,255,255,0.62);
      }

      #${r} .vsa-login-feed-pill {
        appearance: none;
        -webkit-appearance: none;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 2px;
        width: max-content;
        max-width: min(286px, calc(100vw - 32px));
        height: auto;
        min-height: 0;
        box-sizing: border-box;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.14);
        background: rgba(17, 24, 39, 0.90);
        background-image: none;
        box-shadow: 0 14px 34px rgba(0,0,0,0.45);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        color: rgba(255,255,255,0.92);
        border-radius: 14px;
        padding: 8px 12px;
        margin: 0;
        cursor: pointer;
        text-align: left;
        white-space: normal;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      #${r} .vsa-login-feed-pill-title {
        display: block;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        font-size: 12px;
        line-height: 1.2;
        font-weight: 800;
        color: rgba(147, 197, 253, 0.95);
        white-space: normal;
        overflow-wrap: anywhere;
      }

      #${r} .vsa-login-feed-pill-sub {
        display: block;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        font-size: 11px;
        line-height: 1.25;
        font-weight: 600;
        color: rgba(255,255,255,0.66);
        white-space: normal;
        overflow-wrap: anywhere;
      }
    `,(document.head||document.documentElement).appendChild(a)}function x(){try{let d=document.getElementById(G);if(d){let T=d.getBoundingClientRect();return Math.max(16,Math.ceil(window.innerHeight-T.top+12))}let L=document.getElementById(te);if(!L)return 16;let R=L.getBoundingClientRect();return 16+Math.max(0,Math.round(R.height||0))+12}catch{return 16}}function C(){try{let a=document.getElementById(r);if(!a)return;a.style.bottom=`${x()}px`}catch{}}function v(){var a;try{(a=document.getElementById(r))==null||a.remove()}catch{}S=""}function M(a){let d=[],L=Array.isArray(a==null?void 0:a.sections)?a.sections:[];for(let R of L){let Z=Array.isArray(R==null?void 0:R.events)?R.events:[];for(let T of Z){let oe=String((T==null?void 0:T.id)||"").trim(),ue=String((T==null?void 0:T.line)||"").trim();ue&&d.push({id:oe||`row_${d.length}`,line:ue,timeLabel:_(T==null?void 0:T.createdAtMs)})}}return d.slice(0,5)}function e(a){var de;let d=ie(),L=c(d),R=D(m),Z=Array.isArray(a==null?void 0:a.sections)?a.sections:[],T=M(a),oe=(de=Z[0])!=null&&de.title?String(Z[0].title):"Slot info is delayed 10+ minutes",ue=j.map(fe=>{let ge=fe.code===d?"true":"false";return`
        <button
          type="button"
          class="vsa-login-feed-country-tab"
          data-vsa-feed-country="${D(fe.code)}"
          aria-pressed="${ge}"
        >${D(fe.code)}</button>
      `}).join(""),ce=T.length?T.map(fe=>{let ge=fe.timeLabel?`<span class="vsa-login-feed-row-time">${D(fe.timeLabel)}</span>`:"";return`
            <div class="vsa-login-feed-row" data-vsa-feed-row="${D(fe.id)}">
              ${ge}
              <span class="vsa-login-feed-row-line">${D(fe.line)}</span>
            </div>
          `}).join(""):'<div class="vsa-login-feed-empty">Recent delayed community checks will appear here when activity is available.</div>';return`
      <div class="vsa-login-feed-card">
        <div class="vsa-login-feed-top">
          <div>
            <div class="vsa-login-feed-brand">FindVisaSlots.com</div>
          </div>
          <button type="button" class="vsa-login-feed-min-btn" id="vsa-login-activity-feed-min-btn" aria-label="Minimize community feed">\u2014</button>
        </div>
        <div class="vsa-login-feed-country-tabs" aria-label="Community feed country">
          ${ue}
        </div>

        <div class="vsa-login-feed-headline" id="${p}">${R}</div>

        <div class="vsa-login-feed-context">
          Recent checks by FindVisaSlots users:
          <span class="vsa-login-feed-community">
            Community \u2022 ${D(L)}
          </span>
        </div>

        <div class="vsa-login-feed-list" id="${V}">
          ${ce}
          <div class="vsa-login-feed-delay-note">
            <div>Login feed is 10+ min delayed.</div>
            <div class="vsa-login-feed-delay-action">
              <span class="vsa-login-feed-realtime">ALL USERS can see REAL-TIME SLOT INFO on the Visa Portal Calendar page.</span>
            </div>
          </div>
          <div class="vsa-login-feed-row vsa-login-feed-live-row">
            <span class="vsa-login-feed-row-time vsa-login-feed-local-time" id="${B}">--:--:--</span>
            <span class="vsa-login-feed-live-dot" aria-hidden="true"></span>
            <span class="vsa-login-feed-row-line vsa-login-feed-refresh-meta">
              Updating feed in <span id="${O}">--s</span>
            </span>
          </div>
        </div>

      </div>
    `}function o(){let a=ie(),d=c(a);return`
      <button type="button" class="vsa-login-feed-pill" id="vsa-login-activity-feed-expand-btn" aria-label="Expand community feed">
        <span class="vsa-login-feed-pill-title">Recent checks in ${D(d)}</span>
        <span class="vsa-login-feed-pill-sub">Slot info delayed 10+ minutes</span>
      </button>
    `}function t(a){if(le){v();return}if(!U()){v();return}w();let d=document.getElementById(r);d||(d=document.createElement("div"),d.id=r,(document.body||document.documentElement).appendChild(d));let L=K(),R=ie(),Z=M(a),T=JSON.stringify({minimized:L,selectedCountryCode:R,rows:Z.map(oe=>`${oe.id}:${oe.timeLabel}:${oe.line}`)});if(T!==S){d.innerHTML=L?o():e(a),S=T;let oe=document.getElementById("vsa-login-activity-feed-min-btn");oe&&oe.addEventListener("click",ce=>{ce.preventDefault(),ce.stopPropagation(),re(!0),S="",t(a)});let ue=document.getElementById("vsa-login-activity-feed-expand-btn");ue&&ue.addEventListener("click",ce=>{ce.preventDefault(),ce.stopPropagation(),re(!1),S="",t(a)}),document.querySelectorAll(`#${r} .vsa-login-feed-country-tab`).forEach(ce=>{ce.addEventListener("click",de=>{de.preventDefault(),de.stopPropagation();let fe=ce.getAttribute("data-vsa-feed-country");n(fe),S="",t({headline:"",sections:[],nextPollSeconds:60}),l()})})}C(),g()}async function i(){let a=ie();try{let R=String(sessionStorage.getItem($)||"").trim().toUpperCase();if(!X(R)){let Z=await fetch(q,{method:"GET",credentials:"omit",cache:"no-store"});if(Z.ok){let T=await Z.json(),oe=String((T==null?void 0:T.country)||"").trim().toUpperCase();X(oe)&&(n(oe),a=oe)}}}catch{}let d=`${P}?country=${encodeURIComponent(a)}`,L=await fetch(d,{method:"GET",credentials:"omit",cache:"no-store"});if(!L.ok)throw new Error(`feed_http_${L.status}`);return await L.json()}async function l(){if(!await Q()||await I()||!U())return v(),60;try{let a=await i();if(!a||a.ok!==!0)return t({headline:"People are checking the U.S. visa portal now",sections:[],nextPollSeconds:60}),60;t(a);let d=Number(a.nextPollSeconds);return!Number.isFinite(d)||d<30?60:Math.min(300,Math.floor(d))}catch{return t({headline:"People are checking the U.S. visa portal now",sections:[],nextPollSeconds:60}),60}}async function A(){let a=await l();try{u&&clearTimeout(u),s(a),u=setTimeout(()=>{A()},a*1e3)}catch{}}async function k(){let a=!1,d=!1,L=[];try{let T=await chrome.storage.local.get([W]),ue=(Array.isArray(T==null?void 0:T[W])?T[W]:[]).filter(de=>typeof de=="string"&&de.trim().length>0);L=ue.length>0?ue:[E];let ce=String(sessionStorage.getItem(H)||"").trim();if(m=L.includes(ce)?ce:"",!m){let de=Math.floor(Math.random()*L.length);m=L[de]||E,sessionStorage.setItem(H,m)}}catch{m=E}async function R(){if(!await Q()){a=!1,v();return}if(await I()){a=!1,v();return}if(!U()){a=!1,v();return}if(!a&&!d){a=!0,d=!0;try{await l()}finally{d=!1}}C()}R(),A();let Z=new MutationObserver(()=>{R()});Z.observe(document.documentElement,{childList:!0,subtree:!0}),b=setInterval(()=>{R()},1e3),window.addEventListener("pagehide",()=>{try{u&&clearTimeout(u)}catch{}try{f&&clearInterval(f)}catch{}try{b&&clearInterval(b)}catch{}try{Z.disconnect()}catch{}u=null,f=null,h=0,b=null},{once:!0})}k()})();})();
