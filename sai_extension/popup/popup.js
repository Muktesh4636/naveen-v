(()=>{(()=>{let m="https://getusvisa.ai/visa_scheduling/vsa/api_chrome_version.cfm",C="vsa-version-block-overlay";function w(A,_){let F=h=>String(h||"0.0.0").split(".").map(Z=>parseInt(Z,10)||0),D=F(A),y=F(_);for(let h=0;h<3;h++){if(D[h]<y[h])return!0;if(D[h]>y[h])return!1}return!1}function T(A,_){if(document.getElementById(C))return;let F=document.createElement("div");F.id=C,Object.assign(F.style,{position:"fixed",top:"0",left:"0",right:"0",bottom:"0",zIndex:"99999",background:"#111827",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 24px",textAlign:"center",fontFamily:"-apple-system, sans-serif"}),F.innerHTML=`
      <div style="font-size:40px; margin-bottom:16px;">\u{1F504}</div>

      <div style="
        font-size:20px;
        font-weight:800;
        color:#FFFFFF;
        margin-bottom:10px;
        line-height:1.3;
      ">
        Update Required
      </div>

      <div style="
        font-size:14px;
        color:#9CA3AF;
        line-height:1.6;
        margin-bottom:8px;
      ">
        Your extension version <strong style="color:#F87171;">${A}</strong>
        is no longer supported.
      </div>

      <div style="
        font-size:14px;
        color:#9CA3AF;
        line-height:1.6;
        margin-bottom:28px;
      ">
        Please update to version <strong style="color:#34D399;">${_}</strong>
        to continue using FindVisaSlots.
      </div>

      <button
        id="vsa-update-btn"
        type="button"
        style="
          width: 100%;
          max-width: 280px;
          height: 48px;
          border-radius: 12px;
          border: none;
          background: #2563EB;
          color: #FFFFFF;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          margin-bottom: 14px;
          transition: background 0.15s;
        "
      >
        Download Latest Version \u2192
      </button>

      <div style="font-size:12px; color:#4B5563; line-height:1.5;">
        After updating, reopen this extension.
      </div>
    `,document.body.appendChild(F);let D=document.getElementById("vsa-update-btn");D&&(D.addEventListener("mouseenter",()=>{D.style.background="#1D4ED8"}),D.addEventListener("mouseleave",()=>{D.style.background="#2563EB"}),D.addEventListener("click",()=>{var h;let y=((h=globalThis.VSAUrls)==null?void 0:h.store)||"";y?chrome.tabs.create({url:y}):(D.textContent="Update link coming soon",D.style.background="#374151",D.disabled=!0)}))}async function c(){try{let A=chrome.runtime.getManifest().version,_=await chrome.storage.local.get(["vsa_version_check_at","vsa_update_required","vsa_latest_version","vsa_min_required_version","vsa_urls","vsa_overlay_promos","vsa_login_feed_marketing_headlines"]);if(Date.now()-(Number(_.vsa_version_check_at)||0)<36e5){_.vsa_urls&&(globalThis.VSAUrls={...globalThis.VSAUrls,..._.vsa_urls});let O=String(_.vsa_min_required_version||"0.0.0"),H=String(_.vsa_latest_version||A);w(A,O)&&T(A,H);return}let y=await fetch(m,{method:"GET",headers:{"Content-Type":"application/json"}}),h=await y.json().catch(()=>null);if(!y.ok||!(h!=null&&h.ok))return;let Z=String(h.min_required||"0.0.0"),fe=String(h.latest||A),se=w(A,Z);await chrome.storage.local.set({vsa_version_check_at:Date.now(),vsa_update_required:se,vsa_latest_version:fe,vsa_min_required_version:Z,vsa_urls:h.urls||{},vsa_overlay_promos:Array.isArray(h.overlay_promos)?h.overlay_promos:[],vsa_login_feed_marketing_headlines:Array.isArray(h.login_feed_marketing_headlines)?h.login_feed_marketing_headlines:[]}),h.urls&&(globalThis.VSAUrls={...globalThis.VSAUrls,...h.urls}),se&&T(A,fe)}catch{}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c,{once:!0}):c(),globalThis.VSAVersionCheck={checkVersion:c}})();(()=>{let m={pricing:"https://findvisaslots.com/",store:"",terms:"https://findvisaslots.com/terms",home:"https://findvisaslots.com"};try{globalThis.VSAUrls=m}catch{}let k={kba1:["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],kba2:["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"],kba3:["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"]},C={applicantName:"",username:"",password:"",kba1Question:"",kba1:"",kba2Question:"",kba2:"",kba3Question:"",kba3:"",desiredSlotStartDate:null,desiredSlotEndDate:null,ofcBookedDateIso:null,consularRangeWeeks:4,assistCheckEnabled:!1,scEmbassy:"",scVisaType:"",scVisaTypeLabel:"",scCurrentAppointmentIso:null,scCurrentOFCAppointmentIso:null,scCurrentConsularAppointmentIso:null,scApplicantsCount:null,scAppId:null},w={tier:"free",assistCheckEnabled:!1,assistCheckIntervalSeconds:600,releaseWindowChecksEnabled:!1,releaseWindowCheckIntervalSeconds:8,releaseWindowOneStartMinute:59,releaseWindowOneDurationMinutes:3,releaseWindowTwoStartMinute:null,releaseWindowTwoDurationMinutes:null,releaseWindowThreeStartMinute:null,releaseWindowThreeDurationMinutes:null,releaseWindowFourStartMinute:null,releaseWindowFourDurationMinutes:null,autoCheckCommunityAlertsEnabled:!1,audioAlertEnabled:!0,audioUpdatesEnabled:!0,desktopAlertsEnabled:!1,manualCheckReminderEnabled:!1,manualCheckReminderMinutes:30,manualCheckReminderScheduleType:"interval",manualCheckReminderMinuteMarks:[28,58],manualCheckReminderTtsEnabled:!1,manualCheckReminderTtsMessage:"Reminder to check for slots",assistBookEnabled:!1,assistBookAnyDateInRangeEnabled:!1,autoOpenRecoveryWindowEnabled:!1,queueWaitOverlayEnabled:!1,queueStatusAlertMinutes:0,queueClearAlertEnabled:!1,cloudflareClearAlertEnabled:!1,cloudflareWarningTtsMessage:"",loginPageLoadAudioEnabled:!1,loginAutoFillCredentialsEnabled:!1,loginAutoClickSubmitEnabled:!1,loginAutoFillKbaEnabled:!1,loginAutoClickKbaContinueEnabled:!1,loginActivityFeedEnabled:!0,sessionKeepaliveEnabled:!1,homeRefreshMinutes:8,autoSelectEmbassyEnabled:!0,autoJumpFirstDateEnabled:!0,speakDateFoundEnabled:!1,minimumDaysNotice:0,alertIfNotOnSchedule:!1,reviewPromptAnswer:"",reviewPromptAnsweredAtMs:0,reviewPromptPromptedAtMs:0,reviewPromptReason:"",reviewPromptReviewOpenedAtMs:0,reviewPromptReviewDeclinedAtMs:0,reviewPromptFeedbackSentAtMs:0,reviewPromptLastShownAtMs:0,slotAlertMode:"mp3",slotAlertTtsMessage:""},T={profiles:{default:{...C}},activeProfileId:"default",globalSettings:{...w},vsa_auth_token:null,vsa_user_email:"",vsa_user_id:null,vsa_user_tier:"free",vsa_tier_expires_at:null,vsa_install_id:null},c={free:{maxProfiles:1,maxInstances:1,minIntervalMinutes:10,assistBook:!1,minDaysOut:120},tier_standard:{maxProfiles:1,maxInstances:1,minIntervalMinutes:1,assistBook:!0,minDaysOut:60},tier_premium:{maxProfiles:3,maxInstances:1,minIntervalMinutes:1,assistBook:!0,minDaysOut:0},tier_agent:{maxProfiles:1/0,maxInstances:3,minIntervalMinutes:1,assistBook:!0,minDaysOut:0}};try{globalThis.VSASchema=globalThis.VSASchema||{},Object.assign(globalThis.VSASchema,{KBA_QUESTIONS:k,DEFAULT_PROFILE:C,DEFAULT_GLOBAL_SETTINGS:w,DEFAULT_STORAGE:T,TIER_LIMITS:c,VSA_URLS:m}),globalThis.VSAUrls=m}catch{}})();(()=>{var l;let m=((l=globalThis.VSASchema)==null?void 0:l.DEFAULT_STORAGE)||{profiles:{default:{}},activeProfileId:"default",globalSettings:{},vsa_auth_token:null,vsa_user_email:"",vsa_user_tier:"free"},k=chrome.storage.local,C=["password","kba1","kba2","kba3"];function w(r){return!!(r&&typeof r=="object"&&r.__vsaEncrypted===1&&r.alg==="AES-GCM"&&typeof r.iv=="string"&&typeof r.data=="string")}function T(r,d){return new Promise((R,u)=>{chrome.runtime.sendMessage({type:r,value:d},f=>{let W=chrome.runtime.lastError;if(W){u(new Error(W.message||"Credential crypto message failed"));return}if(!f||f.ok!==!0){u(new Error((f==null?void 0:f.error)||"Credential crypto operation failed"));return}R(f.value)})})}async function c(r){if(w(r))return r;if(r!=null&&typeof r!="string")throw new Error("INVALID_CREDENTIAL_WRITE_SHAPE");let d=r??"";return d===""?"":await T("VSA_CREDENTIAL_ENCRYPT",d)}async function A(r){if(typeof r=="string")return r;if(r==null)return"";if(!w(r))throw new Error("INVALID_STORED_CREDENTIAL_SHAPE");return await T("VSA_CREDENTIAL_DECRYPT",r)}async function _(r){let d={...r};for(let R of C)Object.prototype.hasOwnProperty.call(r,R)&&(d[R]=await c(r[R]));return d}function F(){return new Promise((r,d)=>{k.get(null,R=>{var f;let u=(f=chrome.runtime)==null?void 0:f.lastError;if(u){d(u);return}r(R||{})})})}function D(r){return new Promise((d,R)=>{k.set(r,()=>{var f;let u=(f=chrome.runtime)==null?void 0:f.lastError;if(u){R(u);return}d()})})}async function y(){try{let r=await F(),d={...m.globalSettings,...r.globalSettings||{}};d.releaseWindowOneDurationMinutes=Math.min(6,d.releaseWindowOneDurationMinutes);let R=Number.isInteger(d.releaseWindowTwoStartMinute)&&Number.isInteger(d.releaseWindowTwoDurationMinutes);R?d.releaseWindowTwoDurationMinutes=Math.min(6,d.releaseWindowTwoDurationMinutes):(d.releaseWindowTwoStartMinute=null,d.releaseWindowTwoDurationMinutes=null);let u=R&&Number.isInteger(d.releaseWindowThreeStartMinute)&&Number.isInteger(d.releaseWindowThreeDurationMinutes);return u?d.releaseWindowThreeDurationMinutes=Math.min(6,d.releaseWindowThreeDurationMinutes):(d.releaseWindowThreeStartMinute=null,d.releaseWindowThreeDurationMinutes=null),u&&Number.isInteger(d.releaseWindowFourStartMinute)&&Number.isInteger(d.releaseWindowFourDurationMinutes)?d.releaseWindowFourDurationMinutes=Math.min(6,d.releaseWindowFourDurationMinutes):(d.releaseWindowFourStartMinute=null,d.releaseWindowFourDurationMinutes=null),{...m,...r,profiles:{...m.profiles,...r.profiles||{}},globalSettings:d}}catch(r){if(String((r==null?void 0:r.message)||r||"").includes("Extension context invalidated"))throw r;return{...m}}}async function h(r){try{return await D(r),!0}catch{return!1}}async function Z(){return(await y()).activeProfileId||"default"}async function fe(){let r=await y(),d=r.activeProfileId||"default";return{...r.profiles[d]||r.profiles.default,activeProfileId:d}}async function se(r){let d;try{d=await _(r)}catch{return!1}let R=await y(),u=R.activeProfileId||"default",f={...R.profiles,[u]:{...R.profiles[u],...d}};return await h({profiles:f})}async function O(){return(await y()).globalSettings||m.globalSettings}async function H(r){let R={...(await y()).globalSettings,...r};return String(r.tier)==="free"&&(R.releaseWindowChecksEnabled=!1,R.autoCheckCommunityAlertsEnabled=!1,R.assistBookEnabled=!1,R.autoOpenRecoveryWindowEnabled=!1,R.manualCheckReminderScheduleType="interval"),await h({globalSettings:R})}async function j(r){return await h({activeProfileId:r})}async function q(r,d){let R;try{R=await _(d)}catch{return!1}let u=await y(),f={...u.profiles,[r]:{...u.profiles[r]||u.profiles.default,...R}};return await h({profiles:f})}async function we(r){let R=(await y()).profiles[r];if(!R)throw new Error("PROFILE_NOT_FOUND");let u={...R,activeProfileId:r},f={};for(let W of C){let a=R[W];u[W]=await A(a),typeof a=="string"&&a!==""&&(f[W]=a)}if(!Object.keys(f).length)return u;try{await q(r,f)}catch{}return u}async function pe(r){let d=await y(),R={...d.profiles};delete R[r];let u=d.activeProfileId===r?"default":d.activeProfileId;return await h({profiles:R,activeProfileId:u})}try{globalThis.VSAStorage=globalThis.VSAStorage||{},Object.assign(globalThis.VSAStorage,{getStorageRoot:y,getActiveProfileId:Z,getActiveProfile:fe,getProfileWithCredentials:we,updateActiveProfile:se,getGlobalSettings:O,updateGlobalSettings:H,setActiveProfileId:j,upsertProfile:q,deleteProfile:pe,encryptCredentialForStorage:c,decryptCredentialFromStorage:A})}catch{}})();(()=>{let m=()=>{var l;return((l=globalThis.VSASchema)==null?void 0:l.TIER_LIMITS)||{}};function C(){let l=new Date,r=String(l.getMonth()+1).padStart(2,"0"),d=String(l.getDate()).padStart(2,"0");return`${l.getFullYear()}-${r}-${d}`}function w(l){let r=String(l.getMonth()+1).padStart(2,"0"),d=String(l.getDate()).padStart(2,"0");return`${l.getFullYear()}-${r}-${d}`}function T(l){if(!l)return null;let r=new Date(l+"T00:00:00");return isNaN(r.getTime())?null:r}function c(l,r){let d=new Date(l);return d.setDate(d.getDate()+r),d}function A(l){let r=T(l);if(!r)return null;let d=r.getDate()>=20?24:23,R=new Date(r);return R.setMonth(R.getMonth()+d),R.setDate(0),R}function _(l){let r=T(l||C())||T(C()),d=new Date(r);return d.setMonth(d.getMonth()+1),w(d)}function F(l){return 0}function D(l){let r=F(l);return r?c(new Date,r):null}function y(l){let r=D(l);return r?w(r):null}function h(l,r){let d=y(r);return!d||!l?l:l<d?d:l}function Z(l){if(!l)return null;let r=T(l);return r?r.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):null}function fe(l){return l==="free"?"120 days away":l==="tier_standard"?"60 days away":null}function se(l){return l==="free"?"Free plan alerts are for dates 120+ days away. Upgrade to get alerts for earlier dates.":l==="tier_standard"?"Standard plan alerts are for dates 60+ days away. Upgrade to Premium for all dates.":null}function O({startBoxInner:l,startIso:r,tier:d,wasSnapped:R,snapTimerRef:u}){let f=y(d),W=f&&r&&r===f;if(W){let a=fe(d),s=Z(f);l.innerHTML=`
        <div style="font-size:13px; font-weight:800; color:#374151; line-height:1.2;">${a}</div>
        <div style="font-size:11px; font-weight:600; color:#64748B; margin-top:2px; line-height:1.2;">(${s})</div>
      `,l.classList.add("has-date"),R?(l.style.borderColor="#F59E0B",l.style.background="#FFFBEB",u.current&&clearTimeout(u.current),u.current=setTimeout(()=>{l.style.borderColor="#111827",l.style.background="#F1F5F9"},5e3)):(l.style.borderColor="#111827",l.style.background="#F1F5F9")}else l.innerHTML=`
        <div class="date-box-value${r?"":" placeholder"}">${Z(r)||"Tap to set"}</div>
      `,l.classList.toggle("has-date",!!r),l.style.borderColor="",l.style.background="";return W}function H({endBoxValue:l,endBoxInner:r,endIso:d}){l.textContent=Z(d)||"Tap to set",l.classList.toggle("placeholder",!d),r.classList.toggle("has-date",!!d)}function j(l){if(l){try{if(typeof l.showPicker=="function"){l.showPicker();return}}catch{}try{l.focus()}catch{}try{l.click()}catch{}}}function q({bannerEl:l,bannerMsgEl:r,startAtFloor:d,tier:R}){if(!l||!r)return;let u=d?se(R):null;u?(r.textContent=u,l.style.display="block"):l.style.display="none"}function we(l){let{ids:r,getTier:d,getStartIso:R,getEndIso:u,onSave:f}=l,W=document.getElementById(r.startInput),a=document.getElementById(r.endInput),s=document.getElementById(r.startBoxInner),I=document.getElementById(r.endBoxInner),$=document.getElementById(r.endBoxValue),re=document.getElementById(r.upgradeBanner),oe=document.getElementById(r.upgradeBannerMsg);if(!W||!a||!s||!I||!$)return;let z=C(),Q={current:null};function L(){return d()||"free"}function ye(){let S=W.value,P=S?A(S):null,G=S?w(c(T(S),1)):z;W.min=z,a.min=G,a.max=P?w(P):""}function b(S=!1){let P=W.value,G=a.value,ie=L(),ee=O({startBoxInner:s,startIso:P,tier:ie,wasSnapped:S,snapTimerRef:Q});H({endBoxValue:$,endBoxInner:I,endIso:G}),q({bannerEl:re,bannerMsgEl:oe,startAtFloor:ee,tier:ie})}s.addEventListener("click",()=>{j(W)}),I.addEventListener("click",()=>{j(a)}),W.addEventListener("change",async()=>{let S=L(),P=W.value,G=h(P,S),ie=G!==P;W.value=G;let ee=A(G),me=T(a.value);!me||me<=T(G)?a.value=w(c(T(G),1)):ee&&me>ee&&(a.value=w(ee)),ye(),b(ie),await f(W.value,a.value)}),a.addEventListener("change",async()=>{let S=a.value;if(!S)return;let P=L(),G=y(P),ie=T(W.value),ee=T(S),me=!1;G&&S<G?(a.value=G,me=!0):ie&&ee&&ee<=ie&&(a.value=w(c(ie,1))),ye(),b(me),await f(W.value,a.value)});let v=h(R()||z,L()),x=u()||_(v);W.value=v,a.value=x,ye(),b(!1)}function pe(l,r="https://findvisaslots.com/"){return`
      <div id="${l}UpgradeBanner" style="display:none; margin-bottom:10px; padding:12px; border-radius:8px; border:1px solid #F59E0B; background:#FFFBEB;">
        <div id="${l}UpgradeBannerMsg" style="font-size:12px; font-weight:700; color:#92400E; margin-bottom:8px; text-align:center;"></div>
        <a href="${r}" target="_blank" style="display:block; text-align:center; font-size:13px; font-weight:800; color:#2563EB; text-decoration:underline;">
          See upgrade options \u2192
        </a>
      </div>
      <div class="date-range-row">
        <div class="date-box">
          <div class="date-box-label">Start</div>
          <div class="date-box-inner" id="${l}StartBoxInner">
            <div class="date-box-value placeholder">Tap to set</div>
          </div>
          <input type="date" id="${l}StartInput">
        </div>
        <div class="date-box">
          <div class="date-box-label">End</div>
          <div class="date-box-inner" id="${l}EndBoxInner">
            <div class="date-box-value placeholder" id="${l}EndBoxValue">Tap to set</div>
          </div>
          <input type="date" id="${l}EndInput">
        </div>
      </div>
    `}globalThis.VSADateUtils={isoToday:C,toIso:w,parseIso:T,addDays:c,getMaxEndForStart:A,getDefaultEnd:_,getTierFloorDays:F,getTierFloorDate:D,getTierFloorIso:y,enforceFloor:h,formatDateForBox:Z,getRestrictionLabel:fe,getUpgradeBannerMessage:se,renderStartBox:O,renderEndBox:H,renderUpgradeBanner:q,initDatePickerWidget:we,datePickerWidgetHTML:pe}})();(()=>{"use strict";let m="vsa_slot_history_report",T=Promise.resolve();function c(a){return{updatedAt:a,personal:{totalChecks:0,totalInRangeFound:0,hourlyChecks:Array(24).fill(0)},history:{totalOccurrences:0,hourlyOccurrences:Array(24).fill(0),occurrences:[]}}}function A(){return{scopes:{}}}function _(a){if(!a||typeof a!="object")throw new Error("VSASlotHistoryReport requires an explicit identity scope.");let s=String(a.userId||"").trim(),I=String(a.profileId||"").trim();if(!s||!I)throw new Error("VSASlotHistoryReport requires userId and profileId.");return{userId:s,profileId:I,key:`${s}|${I}`}}function F(a){let s=Number(a);return!Number.isFinite(s)||s<0?0:Math.floor(s)}function D(a){let s=Array(24).fill(0);if(!Array.isArray(a))return s;for(let I=0;I<24;I+=1)s[I]=F(a[I]);return s}function y(a){return String(a||"").trim().toLowerCase().replace(/\bvac\b/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function h(a){return String(a||"").trim().toUpperCase()}function Z(a){let s=new Date(a);return[String(s.getFullYear()).padStart(4,"0"),String(s.getMonth()+1).padStart(2,"0"),String(s.getDate()).padStart(2,"0")].join("-")+`T${String(s.getHours()).padStart(2,"0")}`}function fe(a){let s=Number(a);return!Number.isInteger(s)||s<0?null:s}function se(a,s,I,$){return[a,s,I,$].join("|")}function O(a){if(!a||typeof a!="object")return null;let s=String(a.locationKey||"").trim(),I=String(a.locationId||"").trim(),$=String(a.locationLabel||"").trim(),re=h(a.visaType),oe=String(a.appointmentDate||"").trim(),z=String(a.observedHour||"").trim(),Q=Math.floor(Number(a.firstSeenAt)),L=Math.floor(Number(a.lastSeenAt));if(!s||!$||!re||!/^\d{4}-\d{2}-\d{2}$/.test(oe)||!/^\d{4}-\d{2}-\d{2}T\d{2}$/.test(z)||!Number.isFinite(Q)||Q<=0||!Number.isFinite(L)||L<=0)return null;let ye=fe(a.latestSlots),b=fe(a.highestSlots),v=fe(a.lowestSlots),x=Array.isArray(a.communityEventIds)?Array.from(new Set(a.communityEventIds.map(S=>String(S||"").trim()).filter(Boolean))).slice(-50):[];return{key:se(s,re,oe,z),locationKey:s,locationId:I,locationLabel:$,visaType:re,appointmentDate:oe,observedHour:z,firstSeenAt:Math.min(Q,L),lastSeenAt:Math.max(Q,L),latestSlots:ye,highestSlots:b,lowestSlots:v,seenByPersonalCheck:a.seenByPersonalCheck===!0,seenByCommunity:a.seenByCommunity===!0,observationCount:Math.max(1,F(a.observationCount)),communityEventIds:x}}function H(a){return Array.isArray(a)?a.map(O).filter(s=>s!==null).slice(-1e3):[]}function j(a){if(!a||typeof a!="object")return c(0);let s=a.personal&&typeof a.personal=="object"?a.personal:{},I=a.history&&typeof a.history=="object"?a.history:{};return{updatedAt:F(a.updatedAt),personal:{totalChecks:F(s.totalChecks),totalInRangeFound:F(s.totalInRangeFound),hourlyChecks:D(s.hourlyChecks)},history:{totalOccurrences:F(I.totalOccurrences),hourlyOccurrences:D(I.hourlyOccurrences),occurrences:H(I.occurrences)}}}function q(a){if(!a||typeof a!="object"||!a.scopes||typeof a.scopes!="object"||Array.isArray(a.scopes))return A();let s={};return Object.entries(a.scopes).forEach(([I,$])=>{let re=String(I||"").trim();re&&(s[re]=j($))}),{scopes:s}}function we(){return new Promise((a,s)=>{chrome.storage.local.get([m],I=>{if(chrome.runtime.lastError){s(new Error(chrome.runtime.lastError.message));return}a(I[m])})})}function pe(a){return new Promise((s,I)=>{chrome.storage.local.set({[m]:a},()=>{if(chrome.runtime.lastError){I(new Error(chrome.runtime.lastError.message));return}s(a)})})}function l(a,s){let I=_(a),$=T.then(async()=>{let re=await we(),oe=q(re),z=j(oe.scopes[I.key]),Q=await s(z);return oe.scopes[I.key]=j(Q),await pe(oe),oe.scopes[I.key]});return T=$.catch(()=>{}),$}function r(a){let s=Number(a.observedAt),I=Math.floor(s),$=String(a.locationLabel||"").trim(),re=y($),oe=String(a.locationId||"").trim(),z=h(a.visaType),Q=String(a.appointmentDate||"").trim();return!Number.isFinite(s)||I<=0||!re||!$||!z||!/^\d{4}-\d{2}-\d{2}$/.test(Q)?null:{locationKey:re,locationId:oe,locationLabel:$,visaType:z,appointmentDate:Q,observedAt:I,observedHour:Z(I),slots:fe(a.slots)}}function d(a,s,I,$){let re=se(s.locationKey,s.visaType,s.appointmentDate,s.observedHour),oe=a.history.occurrences.findIndex(L=>L.key===re);if(oe>=0){let L=a.history.occurrences[oe];if(I==="community"&&$&&L.communityEventIds.includes($))return;L.firstSeenAt=Math.min(L.firstSeenAt,s.observedAt),s.observedAt>=L.lastSeenAt&&(L.lastSeenAt=s.observedAt,L.latestSlots=s.slots),L.locationId=s.locationId||L.locationId,L.locationLabel=s.locationLabel,L.observationCount+=1,I==="personal"&&(L.seenByPersonalCheck=!0),I==="community"&&(L.seenByCommunity=!0,$&&(L.communityEventIds.push($),L.communityEventIds=L.communityEventIds.slice(-50))),s.slots!==null&&(L.highestSlots=L.highestSlots===null?s.slots:Math.max(L.highestSlots,s.slots),L.lowestSlots=L.lowestSlots===null?s.slots:Math.min(L.lowestSlots,s.slots));return}let z=Number(s.observedHour.slice(-2)),Q=I==="community"&&$?[$]:[];a.history.occurrences.push({key:re,locationKey:s.locationKey,locationId:s.locationId,locationLabel:s.locationLabel,visaType:s.visaType,appointmentDate:s.appointmentDate,observedHour:s.observedHour,firstSeenAt:s.observedAt,lastSeenAt:s.observedAt,latestSlots:s.slots,highestSlots:s.slots,lowestSlots:s.slots,seenByPersonalCheck:I==="personal",seenByCommunity:I==="community",observationCount:1,communityEventIds:Q}),a.history.occurrences=a.history.occurrences.slice(-1e3),a.history.totalOccurrences+=1,a.history.hourlyOccurrences[z]+=1}async function R(a){let s=_(a),I=await we(),$=q(I);return j($.scopes[s.key])}async function u(a){if(!a||typeof a!="object")throw new Error("VSASlotHistoryReport.recordPersonalCheck requires an input object.");let s=Number(a.completedAt),I=Number.isFinite(s)&&s>0?Math.floor(s):Date.now();return l(a.scope,$=>{let re=new Date(I).getHours();if($.updatedAt=I,$.personal.totalChecks+=1,$.personal.hourlyChecks[re]+=1,a.inRange===!0){let oe=r({locationId:a.locationId,locationLabel:a.locationLabel,visaType:a.visaType,appointmentDate:a.appointmentDate,observedAt:I,slots:a.slots});if(!oe)return $;$.personal.totalInRangeFound+=1,d($,oe,"personal",""),$.updatedAt=Math.max($.updatedAt,oe.observedAt)}return $})}async function f(a){if(!a||typeof a!="object")throw new Error("VSASlotHistoryReport.recordCommunityObservation requires an input object.");let s=r(a);if(!s)throw new Error("VSASlotHistoryReport.recordCommunityObservation received invalid observation data.");let I=String(a.eventId||"").trim();return l(a.scope,$=>(d($,s,"community",I),$.updatedAt=Math.max($.updatedAt,s.observedAt),$))}async function W(a){return l(a,()=>c(Date.now()))}globalThis.VSASlotHistoryReport={STORAGE_KEY:m,MAX_HISTORY_OCCURRENCES:1e3,getReport:R,recordPersonalCheck:u,recordCommunityObservation:f,clearReport:W}})();(()=>{let m="vsa_assist_activity_log",C="https://findvisaslots.com/us-visa-scheduling-errors.cfm",w=Promise.resolve(),T=Object.freeze({ASSIST_CHECK_STARTED:{type:"event",title:"Assist check started",detail:"The extension started a schedule check.",helpAnchor:null},ASSIST_CHECK_COMPLETED:{type:"event",title:"Assist check completed",detail:"The extension finished the schedule check.",helpAnchor:null},CHECK_IN_FLIGHT_SKIPPED:{type:"event",title:"Check skipped",detail:"A new check was skipped because another check was still running.",helpAnchor:null},RECOVERY_WINDOW_OPENED:{type:"recovery",title:"Recovery window opened",detail:"A separate portal window opened for login, Cloudflare, or waiting-room recovery.",helpAnchor:"login-needed"},RECOVERY_WINDOW_COMPLETED:{type:"recovery",title:"Recovery window closed",detail:"The recovery window reached the logged-in portal and closed.",helpAnchor:null},RECOVERY_RETRY_TRIGGERED:{type:"recovery",title:"Recovery retry started",detail:"Recovery completed and the extension started another check.",helpAnchor:null},RECOVERY_RETRY_SKIPPED:{type:"recovery",title:"Recovery retry skipped",detail:"Recovery completed, but the extension did not start another check.",helpAnchor:null},HTTP_403_CLOUDFLARE_CHECK:{type:"error",title:"Cloudflare check",detail:"The portal asked the browser to verify or slow down traffic.",helpAnchor:"cloudflare-check"},HTTP_429_TOO_MANY_CHECKS:{type:"error",title:"Too many checks",detail:"The portal rejected repeated calendar checks.",helpAnchor:"too-many-checks"},SCHEDULE_DAYS_HTTP_ERROR:{type:"error",title:"Calendar request failed",detail:"The portal blocked or failed the calendar request.",helpAnchor:"portal-timeout"},SCHEDULE_DAYS_NETWORK_ERROR:{type:"error",title:"Calendar request failed",detail:"The browser could not complete the calendar request.",helpAnchor:"portal-timeout"},DAYS_CAUGHT_TIMEOUT:{type:"error",title:"Portal did not respond",detail:"The schedule page did not return calendar dates in time.",helpAnchor:"portal-timeout"},PSE0501:{type:"error",title:"Portal scheduling error",detail:"The portal could not load appointment available days.",helpAnchor:"portal-timeout"},PSE0600:{type:"error",title:"Scheduling not allowed",detail:"The portal is not allowing schedule or reschedule for this application.",helpAnchor:"quick-guide"},RECOVERY_WAITING_ROOM:{type:"recovery",title:"Waiting room",detail:"The recovery window is still waiting in the portal queue.",helpAnchor:"waiting-room"},UNHANDLED_EXCEPTION:{type:"error",title:"Extension check error",detail:"The extension hit an unexpected check-cycle error.",helpAnchor:null}});function c(){return!!(globalThis.chrome&&chrome.storage&&chrome.storage.local)}function A(O){let H=Number(O);return!Number.isFinite(H)||H<=0?null:H}function _(O){let H=O&&typeof O=="object"?O:{},j={};return["trigger","cleared","retryTriggered","retrySkippedReason","failureReason","intervalSeconds"].forEach(we=>{if(!Object.prototype.hasOwnProperty.call(H,we))return;let pe=H[we];(typeof pe=="string"||typeof pe=="number"||typeof pe=="boolean")&&(j[we]=pe)}),j}function F(O){let j=String(O&&O.reason?O.reason:"").trim()||"UNKNOWN_ASSIST_ACTIVITY",q=T[j]||{type:"event",title:j,detail:"Assist activity was recorded.",helpAnchor:null};return{t:Date.now(),type:q.type,reason:j,title:q.title,detail:q.detail,httpStatus:A(O&&O.httpStatus),helpAnchor:q.helpAnchor,context:_(O&&O.context)}}async function D(){if(!c())return[];let H=(await chrome.storage.local.get([m]))[m];return Array.isArray(H)?H.filter(j=>j&&typeof j=="object"):[]}async function y(O){return w=w.then(async()=>{try{if(!c())return;let j=(await D()).concat([F(O)]).slice(-20);await chrome.storage.local.set({[m]:j})}catch{}}),w}async function h(){c()&&await chrome.storage.local.remove(m)}function Z(O){let H=String(O&&O.helpAnchor?O.helpAnchor:"").trim();return H?`${C}#${encodeURIComponent(H)}`:""}function fe(O){let H=new Date(Number(O));return Number.isNaN(H.getTime())?"Unknown time":H.toLocaleString()}function se(O){let H=Array.isArray(O)?O:[];if(H.length===0)return`Recent Assist Activity

No recent Assist activity recorded.`;let j=["Recent Assist Activity",""];return H.slice().reverse().forEach(q=>{let we=q.httpStatus?`HTTP ${q.httpStatus} \u2014 `:"",pe=Z(q),l=pe?` Help: ${pe}`:"";j.push(`${fe(q.t)} \u2014 ${we}${q.reason} \u2014 ${q.title} \u2014 ${q.detail}${l}`)}),j.join(`
`)}globalThis.VSAAssistActivityLog={getRows:D,record:y,clear:h,formatRowsForCopy:se,helpUrl:Z,ERROR_HELP_BASE_URL:C}})();(()=>{var xt;let m="portalAssistCardMount",k="vsa_portal_assist_active_tab",C="stats",w="vsa_assist_check_notice_acknowledged",c="interval",A="minute_marks";function F(o){let e=String(o.startMinute).padStart(2,"0"),t=(o.startMinute+o.durationMinutes)%60,i=String(t).padStart(2,"0");return`Runs from :${e} up to :${i}`}function D(o,e){let t=new Set(Array.from({length:o.durationMinutes},(i,g)=>(o.startMinute+g)%60));return Array.from({length:e.durationMinutes},(i,g)=>(e.startMinute+g)%60).some(i=>t.has(i))}let y=0;function h(o,e){return`
      <button
        type="button"
        role="tab"
        data-pa-tab-id="${o}"
        style="
          flex:0 0 auto;
          min-width:0;
          height:42px;
          padding:0 7px;
          border-radius:8px 8px 0 0;
          border:1px solid #CBD5E1;
          border-bottom-color:#CBD5E1;
          background:#F8FAFC;
          color:#334155;
          font-size:10px;
          font-weight:800;
          line-height:1.05;
          cursor:pointer;
          white-space:normal;
          overflow:hidden;
          text-overflow:clip;
        "
      >${e}</button>
    `}let Z="#475569",fe="#2563EB",se="2px",O="22px",H="20px",j=((xt=globalThis.VSAUrls)==null?void 0:xt.pricing)||"";function q(){return globalThis.VSAStorage||{}}function we(){return globalThis.VSASchema||{}}function pe(){return we().TIER_LIMITS||{}}function l(){return we().DEFAULT_GLOBAL_SETTINGS||{}}function r(o){return{...l(),...(o==null?void 0:o.globalSettings)||{}}}async function d(){let o=q();return typeof o.getStorageRoot=="function"?await o.getStorageRoot():null}async function R(o){let e=q(),t=o||await d();if(!t)return null;let i=String(t.activeProfileId||"default"),g=t.profiles||{},E=g[i]||g.default||null;return{root:t,activeProfileId:i,profile:E}}async function u(o,e){let t=q(),i=await R();return!(i!=null&&i.profile)||typeof t.upsertProfile!="function"?!1:(await t.upsertProfile(i.activeProfileId,{...i.profile,desiredSlotStartDate:o||null,desiredSlotEndDate:e||null}),!0)}async function f(o){let e=q();return typeof e.updateGlobalSettings=="function"?await e.updateGlobalSettings(o):!1}function W(o){var t;let e=pe();return!!((t=e==null?void 0:e[o])!=null&&t.assistBook)}function a(o){var i;let e=pe(),t=Number((i=e==null?void 0:e[o])==null?void 0:i.minIntervalMinutes);return!Number.isFinite(t)||t<=0?5:Math.max(5,t*60)}function s(o){let e=parseInt(String(o||"").trim(),10);return Number.isNaN(e)?5:Math.max(5,e)}function I(o){let e=s(o);return e>=60&&e%60===0?{value:e/60,unit:"minutes"}:{value:e,unit:"seconds"}}function $(o,e){let t=Math.floor(Number(o)),i=Number.isFinite(t)&&t>0?t:1;return String(e||"minutes")==="seconds"?s(i):s(i*60)}function re(o){return String(o||"minutes")==="seconds"?"Very fast checking may trigger <strong>1015 Rate Limit</strong> errors. Slow down if the portal shows rate-limit errors.":"Checking too fast may trigger <strong>1015 Rate Limit</strong> errors."}function oe(o){let e=Number(o);return e===0||e===5||e===10||e===15?e:0}function z(o){let e=Number(o);return[60,120,180,240,360,480,720].includes(e)?e:60}function Q(o){return o===A?A:c}function L(o){let e=Array.isArray(o)?o:[],t=Array.from(new Set(e.filter(i=>String(i).trim()!=="").map(i=>Number(i)).filter(i=>Number.isInteger(i)&&i>=0&&i<=59))).sort((i,g)=>i-g).slice(0,4);return t.length>0?t:[28,58]}function ye(o){let e=Math.floor(Number(o));return Number.isFinite(e)?Math.max(1,Math.min(60,e)):8}function b(o){let e=(o==null?void 0:o.profiles)||{};return Object.values(e).filter(t=>!!String((t==null?void 0:t.username)||"").trim()).length}function v(o){let e=(o==null?void 0:o.profiles)||{};return Object.entries(e).some(([t,i])=>{let g=String((i==null?void 0:i.username)||"").trim();return t!=="default"&&!!g})}function x(o){let e=document.getElementById("status");e&&(e.textContent=o,e.style.display="block",clearTimeout(x._t),x._t=setTimeout(()=>{e.style.display="none"},1400))}function S(o){return String(o||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function P(o){let e=String(o||"").match(/^(\d{4})-(\d{2})-(\d{2})$/);return e?`${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][Number(e[2])-1]} ${Number(e[3])}, ${e[1]}`:S(String(o||"").trim())}function G(o){return new Date(Number(o)).toLocaleString([],{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}async function ie(){try{let e=(await chrome.tabs.query({active:!0,currentWindow:!0}))[0];if(!(e!=null&&e.id))return null;let t=await chrome.tabs.sendMessage(e.id,{type:"VSA_ASSIST_CHECK_COMMAND",action:"runtime"});return!(t!=null&&t.ok)||!(t!=null&&t.runtime)||typeof t.runtime!="object"?null:t.runtime}catch{return null}}function ee(o){let t=Date.now(),i=o!=null&&o.embassyBestById&&typeof o.embassyBestById=="object"?o.embassyBestById:{},g=o!=null&&o.embassyResults&&typeof o.embassyResults=="object"?o.embassyResults:{},n=(Array.isArray(o==null?void 0:o.availableEmbassies)?o.availableEmbassies:[]).map(M=>{let K=String((M==null?void 0:M.value)||"").trim(),ne=String((M==null?void 0:M.label)||(M==null?void 0:M.text)||K||"Location").trim();return{id:K,label:ne}}).filter(M=>M.id||M.label);return n.length===0&&n.push({id:String((o==null?void 0:o.currentEmbassyId)||"").trim(),label:String((o==null?void 0:o.currentEmbassyLabel)||"Location").trim()}),`
      <div style="margin-top:12px;">
        <div style="font-size:14px; font-weight:900; color:#0F172A; margin-bottom:8px;">Best Slots - Last 6 Hours</div>
        <table style="width:100%; border-collapse:collapse; table-layout:fixed; font-size:11px;">
          <thead>
            <tr>
              <th style="text-align:left; color:#64748B; font-size:10px; font-weight:900; padding:0 2px 5px;">Location</th>
              <th style="text-align:right; color:#64748B; font-size:10px; font-weight:900; padding:0 2px 5px;">Best</th>
              <th style="text-align:right; color:#64748B; font-size:10px; font-weight:900; padding:0 2px 5px;">Time</th>
            </tr>
          </thead>
          <tbody>${n.map(M=>{var Y;let K=M.id?i[M.id]:null,ne=String((K==null?void 0:K.date)||"").trim(),ge=Number(K==null?void 0:K.seenAt),Ee="",ce="";if(ne&&Number.isFinite(ge)&&t-ge<=216e5&&(Ee=P(ne),ce=new Date(ge).toLocaleTimeString([],{hour:"numeric",minute:"2-digit",second:"2-digit"})),!Ee&&n.length===1){let Ie=String((o==null?void 0:o.bestDate)||"").trim(),Ue=Number(o==null?void 0:o.bestSeenAt);Ie&&Number.isFinite(Ue)&&t-Ue<=216e5&&(Ee=P(Ie),ce=new Date(Ue).toLocaleTimeString([],{hour:"numeric",minute:"2-digit",second:"2-digit"}))}let Ae=String(M.label||((Y=g==null?void 0:g[M.id])==null?void 0:Y.label)||"Location").trim();return`
        <tr>
          <td style="padding:5px 2px; border-bottom:1px solid #E2E8F0; color:#334155; font-weight:800;">${S(Ae)}</td>
          <td style="padding:5px 2px; border-bottom:1px solid #E2E8F0; text-align:right; color:#047857; font-weight:900;">${Ee||"\u2014"}</td>
          <td style="padding:5px 2px; border-bottom:1px solid #E2E8F0; text-align:right; color:#334155; font-weight:700;">${S(ce||"\u2014")}</td>
        </tr>
      `}).join("")}</tbody>
        </table>
      </div>
    `}function me(o){let e=o.history.hourlyOccurrences,t=Math.max(1,...e),i=new Date().getHours(),g=i%12,E=i<12?"AM":"PM";return`
      <div>
        <div
          style="
            display:flex;
            justify-content:flex-end;
            align-items:center;
            gap:10px;
            margin-bottom:7px;
            font-size:9px;
            color:#64748B;
            font-weight:800;
          "
        >
          <span style="display:flex; align-items:center; gap:4px;">
            <span style="width:7px; height:7px; border-radius:2px; background:#2563EB;"></span>
            AM
          </span>

          <span style="display:flex; align-items:center; gap:4px;">
            <span style="width:7px; height:7px; border-radius:2px; background:#047857;"></span>
            PM
          </span>
        </div>

        <div
          style="
            display:grid;
            grid-template-columns:repeat(12, minmax(0, 1fr));
            gap:3px;
            width:100%;
          "
        >
          ${Array.from({length:12}).map((N,M)=>{let K=M,ne=M+12,ge=e[K],Ee=e[ne],ce=Math.round(ge/t*100),Ae=Math.round(Ee/t*100),Y=M===0?"12":String(M),Ie=`${Y} AM \u2014 ${ge} found`,Ue=`${Y} PM \u2014 ${Ee} found`,Le=M===g,le=E==="AM"?"calc(50% - 4.5px)":"calc(50% + 4.5px)";return`
          <div
            style="
              min-width:0;
              display:flex;
              flex-direction:column;
              align-items:center;
            "
          >
            <div
              style="
                position:relative;
                width:100%;
                height:104px;
                display:flex;
                align-items:flex-end;
                justify-content:center;
                gap:2px;
                border-bottom:1px solid #CBD5E1;
              "
            >
              <div
                title="${Ie}"
                style="
                  width:7px;
                  height:${ce}%;
                  min-height:${ge>0?"3px":"0"};
                  background:#2563EB;
                  border-radius:2px 2px 0 0;
                "
              ></div>

              <div
                title="${Ue}"
                style="
                  width:7px;
                  height:${Ae}%;
                  min-height:${Ee>0?"3px":"0"};
                  background:#047857;
                  border-radius:2px 2px 0 0;
                "
              ></div>

              ${Le?`
                    <div
                      title="Current: ${Y} ${E}"
                      style="
                        position:absolute;
                        left:${le};
                        top:0;
                        bottom:0;
                        width:2px;
                        transform:translateX(-50%);
                        background:#16A34A;
                        z-index:2;
                        pointer-events:none;
                      "
                    ></div>
                  `:""}
            </div>

            <div
              style="
                margin-top:4px;
                font-size:9px;
                color:#64748B;
                font-weight:800;
                line-height:1;
              "
            >
              ${Y}
            </div>
          </div>
        `}).join("")}
        </div>


        <div
          style="
            margin-top:5px;
            text-align:center;
            font-size:9px;
            color:#94A3B8;
            font-weight:700;
          "
        >
          Hour \xB7 FindVisaSlots.com
        </div>
      </div>
    `}function De(o){let e=Array.from({length:60},()=>0);o.history.occurrences.forEach(n=>{let N=new Date(Number(n.firstSeenAt)).getMinutes();e[N]+=1});let t=Math.max(1,...e),i=new Date().getMinutes(),g=e.map((n,N)=>{let M=Math.round(n/t*100),K=String(N).padStart(2,"0"),ne=N===i;return`
          <div
            title=":${K} \u2014 ${n} found"
            style="
              position:relative;
              min-width:0;
              height:104px;
              display:flex;
              align-items:flex-end;
              justify-content:center;
              border-bottom:1px solid #CBD5E1;
            "
          >
            <div
              style="
                width:100%;
                max-width:4px;
                height:${M}%;
                min-height:${n>0?"3px":"0"};
                background:#2563EB;
                border-radius:1px 1px 0 0;
              "
            ></div>

            ${ne?`
                  <div
                    title="Current minute: :${K}"
                    style="
                      position:absolute;
                      left:50%;
                      top:0;
                      bottom:0;
                      width:2px;
                      transform:translateX(-50%);
                      background:#16A34A;
                      z-index:2;
                      pointer-events:none;
                    "
                  ></div>
                `:""}
          </div>
        `}).join(""),E=Array.from({length:60}).map((n,N)=>`
          <div
            style="
              min-width:0;
              text-align:center;
              font-size:8px;
              color:#64748B;
              font-weight:800;
              line-height:1;
            "
          >
            ${N%10===0?String(N).padStart(2,"0"):""}
          </div>
        `).join("");return`
      <div>
        <div
          style="
            display:grid;
            grid-template-columns:repeat(60, minmax(0, 1fr));
            gap:0;
            width:100%;
          "
        >
          ${g}
        </div>

        <div
          style="
            display:grid;
            grid-template-columns:repeat(60, minmax(0, 1fr));
            gap:0;
            width:100%;
            margin-top:4px;
          "
        >
          ${E}
        </div>

        <div
          style="
            margin-top:5px;
            text-align:center;
            font-size:9px;
            color:#94A3B8;
            font-weight:700;
          "
        >
          Minute \xB7 FindVisaSlots.com
        </div>
      </div>
    `}async function _e(){let o=document.getElementById("paStatsPanelBody");if(!o)return;let e=globalThis.VSASlotHistoryReport;if(typeof(e==null?void 0:e.getReport)!="function"){o.innerHTML=`
        <div style="font-size:12px; color:#92400E; font-weight:800; padding:10px; border:1px solid #FDE68A; border-radius:8px; background:#FFFBEB;">
          Slot History unavailable.
        </div>
      `;return}let t=null,i=null;try{i=await d()}catch{o.innerHTML=`
        <div style="font-size:12px; color:#991B1B; font-weight:800; padding:10px; border:1px solid #FCA5A5; border-radius:8px; background:#FEF2F2;">
          Could not verify Slot History access.
        </div>
      `;return}if(!i){o.innerHTML=`
        <div style="font-size:12px; color:#991B1B; font-weight:800; padding:10px; border:1px solid #FCA5A5; border-radius:8px; background:#FEF2F2;">
          Could not verify Slot History access.
        </div>
      `;return}try{t=await e.getReport({userId:i.vsa_user_id,profileId:i.activeProfileId})}catch{o.innerHTML=`
        <div style="font-size:12px; color:#991B1B; font-weight:800; padding:10px; border:1px solid #FCA5A5; border-radius:8px; background:#FEF2F2;">
          Could not read Slot History.
        </div>
      `;return}let g=String(i.globalSettings.tier)!=="free",E=String(i.profiles[i.activeProfileId].scVisaType).trim();if(document.getElementById("paStatsClearBtn").style.display=g?"inline-block":"none",!g){o.innerHTML=`
        <div
          style="
            padding:11px 12px;
            border:1px solid #BFDBFE;
            border-radius:9px;
            background:#EFF6FF;
            color:#1E3A8A;
            font-size:12px;
            font-weight:700;
            line-height:1.45;
          "
        >
          <div style="font-size:13px; font-weight:900; color:#1E3A8A;">
            Unlock Your Slot History
          </div>
          <div style="margin-top:4px;">
            Upgrade to see matching dates found by your checks and the FindVisaSlots community.
          </div>
          <a
            href="${j}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              display:inline-block;
              margin-top:7px;
              color:#2563EB;
              font-weight:900;
              text-decoration:underline;
            "
          >Upgrade to Premium \u2192</a>
        </div>

        <div style="margin-top:12px;">
          <div style="font-size:14px; font-weight:900; color:#0F172A; margin-bottom:8px;">
            Best Slots - Last 6 Hours
          </div>
          <table style="width:100%; border-collapse:collapse; table-layout:fixed; font-size:11px;">
            <thead>
              <tr>
                <th style="text-align:left; color:#64748B; font-size:10px; font-weight:900; padding:0 2px 5px;">Location</th>
                <th style="text-align:right; color:#64748B; font-size:10px; font-weight:900; padding:0 2px 5px;">Best</th>
                <th style="text-align:right; color:#64748B; font-size:10px; font-weight:900; padding:0 2px 5px;">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding:5px 2px; border-bottom:1px solid #E2E8F0; color:#94A3B8; font-weight:800;">\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022</td>
                <td style="padding:5px 2px; border-bottom:1px solid #E2E8F0; text-align:right; color:#94A3B8; font-weight:900;">\u2022\u2022\u2022\u2022\u2022\u2022</td>
                <td style="padding:5px 2px; border-bottom:1px solid #E2E8F0; text-align:right; color:#94A3B8; font-weight:700;">\u2022\u2022\u2022\u2022\u2022\u2022</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="margin-top:14px; padding-top:12px; border-top:1px solid #CBD5E1;">

          <div style="display:flex; align-items:baseline; justify-content:space-between; gap:10px; margin-bottom:8px;">
            <div style="font-size:14px; font-weight:900; color:#0F172A;">
              Recent Dates
              <span style="font-size:9px; font-weight:700; color:#94A3B8; margin-left:4px;">
                \xB7 FindVisaSlots.com
              </span>
            </div>
            <div style="font-size:10px; font-weight:800; color:#94A3B8;">Showing \u2022\u2022 of \u2022\u2022</div>
          </div>
          <table style="width:100%; border-collapse:collapse; table-layout:fixed; font-size:11px;">
            <thead>
              <tr>
                <th style="text-align:left; color:#64748B; font-size:10px; font-weight:900; padding:0 2px 5px;">Found</th>
                <th style="text-align:right; color:#64748B; font-size:10px; font-weight:900; padding:0 2px 5px;">Embassy</th>
                <th style="text-align:right; color:#64748B; font-size:10px; font-weight:900; padding:0 2px 5px;">Date</th>
                <th style="text-align:right; color:#64748B; font-size:10px; font-weight:900; padding:0 2px 5px;">Found By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding:5px 2px; border-bottom:1px solid #E2E8F0; color:#94A3B8; font-weight:800;">\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022</td>
                <td style="padding:5px 2px; border-bottom:1px solid #E2E8F0; text-align:right; color:#94A3B8;">\u2022\u2022\u2022\u2022\u2022\u2022</td>
                <td style="padding:5px 2px; border-bottom:1px solid #E2E8F0; text-align:right; color:#94A3B8; font-weight:900;">\u2022\u2022\u2022\u2022\u2022\u2022</td>
                <td style="padding:5px 2px; border-bottom:1px solid #E2E8F0; text-align:right; color:#94A3B8;">\u2022\u2022\u2022\u2022\u2022\u2022</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!--
        [AUDIT]
        Goal:
        - Preview the grouped AM/PM hourly chart structure for Free users
          without exposing any stored Slot History values.

        Reason:
        - The locked preview should match the paid grouped hourly chart while
          keeping all actual hourly occurrence values concealed.

        Invariant:
        - No real report values are rendered.
        - Twelve clock-hour groups remain visible.
        - AM/PM distinction remains understandable.
        - FindVisaSlots attribution remains inside the chart area.
        - Tier gating remains unchanged.

        Handles:
        - Locked grouped-chart preview.
        - Screenshot attribution.

        Does NOT handle:
        - Rendering real hourly counts.
        - Reading report.history.hourlyOccurrences.
        - Changing entitlement.

        Failure mode if wrong:
        - Free users may lose the hourly feature preview, see real history data,
          or see a preview inconsistent with the paid chart.
        -->
        <div style="margin-top:14px; padding-top:12px; border-top:1px solid #CBD5E1;">
          <div style="font-size:14px; font-weight:900; color:#0F172A; margin-bottom:4px;">
            Slots Found by Hour
          </div>

          <div style="font-size:11px; color:#64748B; font-weight:600; margin-bottom:10px;">
            See when matching slot dates were observed.
          </div>

          <div
            style="
              display:flex;
              justify-content:flex-end;
              align-items:center;
              gap:10px;
              margin-bottom:7px;
              font-size:9px;
              color:#94A3B8;
              font-weight:800;
            "
          >
            <span>\u25A0 AM</span>
            <span>\u25A0 PM</span>
          </div>

          <div
            style="
              display:grid;
              grid-template-columns:repeat(12, minmax(0, 1fr));
              gap:3px;
              width:100%;
            "
          >
            ${Array.from({length:12}).map((le,be)=>{let Oe=be===0?"12":String(be),Je=18+be*13%62,p=12+be*19%68;return`
                <div style="min-width:0; display:flex; flex-direction:column; align-items:center;">
                  <div
                    style="
                      width:100%;
                      height:104px;
                      display:flex;
                      align-items:flex-end;
                      justify-content:center;
                      gap:2px;
                      border-bottom:1px solid #CBD5E1;
                    "
                  >
                    <div
                      style="
                        width:7px;
                        height:${Je}%;
                        background:#CBD5E1;
                        border-radius:2px 2px 0 0;
                      "
                    ></div>

                    <div
                      style="
                        width:7px;
                        height:${p}%;
                        background:#94A3B8;
                        border-radius:2px 2px 0 0;
                      "
                    ></div>
                  </div>

                  <div
                    style="
                      margin-top:4px;
                      font-size:9px;
                      color:#94A3B8;
                      font-weight:800;
                      line-height:1;
                    "
                  >
                    ${Oe}
                  </div>
                </div>
              `}).join("")}
          </div>

          <div
            style="
              margin-top:5px;
              text-align:center;
              font-size:9px;
              color:#94A3B8;
              font-weight:700;
            "
          >
            Hour \xB7 FindVisaSlots.com
          </div>
        </div>


        <div style="margin-top:14px; padding-top:12px; border-top:1px solid #CBD5E1;">
          <div style="font-size:14px; font-weight:900; color:#0F172A; margin-bottom:4px;">
            Slots Found by Minute
          </div>

          <div style="font-size:11px; color:#64748B; font-weight:600; margin-bottom:10px;">
            See which minutes of the hour matching slots were observed.
          </div>

          <div
            style="
              display:grid;
              grid-template-columns:repeat(60, minmax(0, 1fr));
              gap:0;
              width:100%;
            "
          >
            ${Array.from({length:60}).map((le,be)=>`
                <div
                  style="
                    min-width:0;
                    height:104px;
                    display:flex;
                    align-items:flex-end;
                    justify-content:center;
                    border-bottom:1px solid #CBD5E1;
                  "
                >
                  <div
                    style="
                      width:100%;
                      max-width:4px;
                      height:${10+be*17%66}%;
                      background:#CBD5E1;
                      border-radius:1px 1px 0 0;
                    "
                  ></div>
                </div>
              `).join("")}
          </div>

          <div
            style="
              display:grid;
              grid-template-columns:repeat(60, minmax(0, 1fr));
              gap:0;
              width:100%;
              margin-top:4px;
            "
          >
            ${Array.from({length:60}).map((le,be)=>`
              <div
                style="
                  min-width:0;
                  text-align:center;
                  font-size:8px;
                  color:#94A3B8;
                  font-weight:800;
                  line-height:1;
                "
              >
                ${be%10===0?String(be).padStart(2,"0"):""}
              </div>
            `).join("")}
          </div>

          <div
            style="
              margin-top:5px;
              text-align:center;
              font-size:9px;
              color:#94A3B8;
              font-weight:700;
            "
          >
            Minute \xB7 FindVisaSlots.com
          </div>
        </div>
      `;return}let n=t.history.occurrences.slice().sort((le,be)=>be.firstSeenAt-le.firstSeenAt),N=n.length,M=Math.max(1,Math.ceil(N/5));y=Math.max(0,Math.min(y,M-1));let K=y*5,ne=Math.min(K+5,N),ge=n.slice(K,ne),Ee=N>0?`${K+1}\u2013${ne} of ${N}`:"0 of 0",ce=ge.length>0?ge.map(le=>{let be=String(le.locationLabel||le.locationId||"").trim(),Oe=le.seenByPersonalCheck&&le.seenByCommunity?"You + Community":le.seenByPersonalCheck?"You":"Community";return`
            <tr>
              <td style="padding:5px 2px; border-bottom:1px solid #E2E8F0; font-weight:800; color:#334155;">${S(G(le.firstSeenAt))}</td>
              <td style="padding:5px 2px; border-bottom:1px solid #E2E8F0; text-align:right; color:#334155;">${S(be)}</td>
              <td style="padding:5px 2px; border-bottom:1px solid #E2E8F0; text-align:right; color:#047857; font-weight:900;">${P(le.appointmentDate)}</td>
              <td style="padding:5px 2px; border-bottom:1px solid #E2E8F0; text-align:right; color:#475569; font-weight:700;">${S(Oe)}</td>
            </tr>
          `}).join(""):`
        <tr>
          <td colspan="4" style="padding:8px 2px; color:#64748B; font-weight:700;">
            No dates in range logged yet.
          </td>
        </tr>
      `,Ae=ee(await ie()),Y=n.slice(0,100),Ie="";if(Y.length===0)Ie=`
        <div style="margin-top:14px; padding-top:12px; border-top:1px solid #CBD5E1;">
          <div style="font-size:14px; font-weight:900; color:#0F172A;">
            Recent Slot Intelligence
          </div>
          <div style="margin-top:4px; font-size:11px; color:#64748B; font-weight:600;">
            No stored openings yet.
          </div>
        </div>
      `;else{let le=Number(Y[Y.length-1].firstSeenAt),Oe=Date.now()-le>336*60*60*1e3?` \xB7 since ${new Date(le).toLocaleDateString([],{month:"short",day:"numeric"})}`:"",Je=new Map,p=new Set,B=Y.some(X=>X.locationLabel.endsWith(" VAC"));Y.forEach(X=>{let de=X.appointmentDate.slice(0,7);p.add(de);let xe=X.locationLabel.trim(),Ve=xe.toUpperCase().endsWith(" VAC"),tt=Ve?xe.slice(0,-4).trim():xe,Ye=tt.toUpperCase(),Re=Ve?"ofc":"consular",Qe=Je.get(Ye);Qe||(Qe={key:tt,label:tt,occurrenceCount:0,uniqueDatesByStageMonth:{ofc:new Map,consular:new Map}},Je.set(Ye,Qe)),Qe.occurrenceCount+=1;let $e=Qe.uniqueDatesByStageMonth[Re].get(de);$e||($e=new Set,Qe.uniqueDatesByStageMonth[Re].set(de,$e)),$e.add(X.appointmentDate)});let V=Array.from(p).map(X=>{let de=X.split("-");return Number(de[0])*12+Number(de[1])-1}).sort((X,de)=>X-de),te=V[0],Me=V[V.length-1],ve=[];for(let X=te;X<=Me;X+=1){let de=Math.floor(X/12),xe=X%12+1;ve.push(`${de}-${String(xe).padStart(2,"0")}`)}let Ke=Array.from(Je.values()).sort((X,de)=>{let xe=de.occurrenceCount-X.occurrenceCount;return xe!==0?xe:X.label.localeCompare(de.label)}).slice(0,5),Ce=1;Ke.forEach(X=>{ve.forEach(de=>{let xe=X.uniqueDatesByStageMonth.ofc.get(de),Ve=X.uniqueDatesByStageMonth.consular.get(de);Ce=Math.max(Ce,xe?xe.size:0,Ve?Ve.size:0)})});let Ne=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],ze=ve.map(X=>{let de=X.split("-"),xe=Number(de[0]),Ve=Number(de[1]);return`
              <div
                style="
                  flex:0 0 38px;
                  width:38px;
                  height:30px;
                  display:flex;
                  flex-direction:column;
                  align-items:center;
                  justify-content:flex-end;
                  color:#64748B;
                  font-size:9px;
                  font-weight:900;
                  line-height:1.05;
                  white-space:nowrap;
                "
              >
                <span>${Ne[Ve-1]}</span>
                <span style="font-size:8px; color:#94A3B8;">'${String(xe).slice(-2)}</span>
              </div>
            `}).join(""),qe=Ke.map(X=>{let de=Math.round(X.occurrenceCount/Y.length*100);return`
              <div
                style="
                  height:42px;
                  display:grid;
                  grid-template-columns:minmax(0,1fr) 38px;
                  align-items:center;
                  border-bottom:1px solid #E2E8F0;
                "
              >
                <div
                  title="${S(X.label)}"
                  style="
                    min-width:0;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    padding-right:5px;
                    color:#334155;
                    font-size:10px;
                    font-weight:800;
                  "
                >
                  ${S(X.label)}
                </div>

                <div
                  style="
                    text-align:right;
                    color:#0F172A;
                    font-size:11px;
                    font-weight:900;
                    padding-right:5px;
                  "
                >
                  ${de}%
                </div>
              </div>
            `}).join(""),ot=Ke.map(X=>`
              <div
                style="
                  height:42px;
                  display:flex;
                  align-items:flex-end;
                "
              >
                ${ve.map(xe=>{let Ve=X.uniqueDatesByStageMonth.ofc.get(xe),tt=X.uniqueDatesByStageMonth.consular.get(xe),Ye=Ve?Ve.size:0,Re=tt?tt.size:0,Qe=Ye>0?Math.max(3,Math.round(Ye/Ce*18)):0,$e=Re>0?Math.max(3,Math.round(Re/Ce*18)):0;return B?`
                    <div
                      title="${S(xe)} \u2014 OFC: ${Ye}, Consular: ${Re}"
                      style="
                        flex:0 0 38px;
                        width:38px;
                        height:42px;
                        display:flex;
                        align-items:flex-end;
                        justify-content:center;
                        gap:3px;
                        border-bottom:1px solid #E2E8F0;
                      "
                    >
                      <div
                        style="
                          width:14px;
                          height:38px;
                          display:flex;
                          flex-direction:column;
                          align-items:center;
                          justify-content:flex-end;
                        "
                      >
                        <div
                          style="
                            height:11px;
                            color:${Ye>0?"#334155":"#CBD5E1"};
                            font-size:8px;
                            font-weight:800;
                            line-height:1;
                          "
                        >
                          ${Ye}
                        </div>

                        <div
                          style="
                            width:7px;
                            height:${Qe}px;
                            min-height:${Qe}px;
                            background:${Ye>0?"#2563EB":"transparent"};
                            border-radius:2px 2px 0 0;
                            margin-top:2px;
                            margin-bottom:4px;
                          "
                        ></div>
                      </div>

                      <div
                        style="
                          width:14px;
                          height:38px;
                          display:flex;
                          flex-direction:column;
                          align-items:center;
                          justify-content:flex-end;
                        "
                      >
                        <div
                          style="
                            height:11px;
                            color:${Re>0?"#334155":"#CBD5E1"};
                            font-size:8px;
                            font-weight:800;
                            line-height:1;
                          "
                        >
                          ${Re}
                        </div>

                        <div
                          style="
                            width:7px;
                            height:${$e}px;
                            min-height:${$e}px;
                            background:${Re>0?"#F97316":"transparent"};
                            border-radius:2px 2px 0 0;
                            margin-top:2px;
                            margin-bottom:4px;
                          "
                        ></div>
                      </div>
                    </div>
                  `:`
                      <div
                        title="${S(xe)}: ${Re} unique appointment ${Re===1?"date":"dates"}"
                        style="
                          flex:0 0 38px;
                          width:38px;
                          height:42px;
                          display:flex;
                          flex-direction:column;
                          align-items:center;
                          justify-content:flex-end;
                          border-bottom:1px solid #E2E8F0;
                        "
                      >
                        <div
                          style="
                            height:11px;
                            display:flex;
                            align-items:center;
                            color:${Re>0?"#334155":"#CBD5E1"};
                            font-size:8px;
                            font-weight:800;
                            line-height:1;
                          "
                        >
                          ${Re}
                        </div>

                        <div
                          style="
                            width:14px;
                            height:${$e}px;
                            min-height:${$e}px;
                            background:${Re>0?"#2563EB":"transparent"};
                            border-radius:2px 2px 0 0;
                            margin-top:2px;
                            margin-bottom:4px;
                          "
                        ></div>
                      </div>
                    `}).join("")}
              </div>
            `).join(""),ke=ve.length>6?`
            <div
              style="
                color:#64748B;
                font-size:9px;
                font-weight:800;
                white-space:nowrap;
              "
            >
              Scroll \u2192
            </div>
          `:"",Ge=ve.length>6?`
            <div
              style="
                position:absolute;
                top:0;
                right:0;
                bottom:0;
                width:18px;
                pointer-events:none;
                background:linear-gradient(
                  to right,
                  rgba(255,255,255,0),
                  #FFFFFF
                );
              "
            ></div>
          `:"";Ie=`
        <div
          style="
            margin-top:14px;
            padding-top:12px;
            border-top:1px solid #CBD5E1;
          "
        >
          <!--
          [AUDIT]
          Goal:
          - Identify Recent Slot Intelligence with the active profile visa type
            and FindVisaSlots attribution, matching the Recent Dates title style.

          Reason:
          - Screenshots and shared history views should clearly show which visa
            class the intelligence belongs to and retain visible attribution.

          Invariant:
          - historyVisaType remains display-only.
          - Slot Intelligence aggregation, ranking, percentages, and month bars
            remain unchanged.
          - Scroll cue remains aligned on the right.

          Handles:
          - Active-profile visa type display.
          - FindVisaSlots.com watermark.
          - Existing Scroll \u2192 cue.

          Does NOT handle:
          - Changing profile scope.
          - Changing stored occurrence visa types.
          - Changing intelligence calculations.

          Failure mode if wrong:
          - Shared screenshots may omit the visa class or attribution and become
            ambiguous about which Slot History data is shown.
          -->
          <div
            style="
              display:flex;
              align-items:baseline;
              justify-content:space-between;
              gap:8px;
              margin-bottom:3px;
            "
          >
            <div
              style="
                font-size:14px;
                font-weight:900;
                color:#0F172A;
              "
            >
              Recent Slot Intelligence \xB7 ${S(E)}
              <span style="font-size:9px; font-weight:700; color:#94A3B8; margin-left:4px;">
                \xB7 FindVisaSlots.com
              </span>
            </div>

            ${ke}
          </div>

          <!--
          [AUDIT]
          Goal:
          - Explain paired OFC / Consular month bars when VAC-stage history is
            present without adding permanent complexity for other countries.
          
          Reason:
          - Users need to know what the two bar colors mean.
          
          Invariant:
          - The explanation is display-only.
          - Histories without VAC observations retain the original single-series
            explanation.
          
          Handles:
          - Paired OFC / Consular intelligence.
          - Standard single-series intelligence.
          
          Does NOT handle:
          - Changing stage classification.
          - Changing counts or percentages.
          
          Failure mode if wrong:
          - Users may misread OFC bars as Consular or vice versa.
          -->
          <div
            style="
              font-size:10px;
              color:#64748B;
              font-weight:600;
              margin-bottom:8px;
            "
          >
            Based on your last ${Y.length} stored opening${Y.length===1?"":"s"}${Oe}.
            Monthly bars show unique appointment dates.
            ${B?`
                  <!--
                  [AUDIT]
                  Goal:
                  - Make the OFC and Consular legend visually distinguishable at
                    compact popup size.

                  Reason:
                  - Blue and green micro-bars are too similar at 7px width, and
                    the previous legend markers are too small to identify quickly.

                  Invariant:
                  - OFC remains blue.
                  - Consular remains orange.
                  - Legend is display-only and does not change stage classification.

                  Handles:
                  - Clear paired-stage identification in compact Slot Intelligence.

                  Does NOT handle:
                  - Changing counts.
                  - Changing city grouping.
                  - Changing bar scaling.

                  Failure mode if wrong:
                  - Users may confuse OFC and Consular bars.
                  -->
                  <span
                    style="
                      display:inline-flex;
                      align-items:center;
                      gap:8px;
                      white-space:nowrap;
                      margin-left:4px;
                    "
                  >
                    <span style="display:inline-flex; align-items:center; gap:3px;">
                      <span
                        style="
                          display:inline-block;
                          width:9px;
                          height:9px;
                          border-radius:2px;
                          background:#2563EB;
                        "
                      ></span>
                      OFC
                    </span>

                    <span style="display:inline-flex; align-items:center; gap:3px;">
                      <span
                        style="
                          display:inline-block;
                          width:9px;
                          height:9px;
                          border-radius:2px;
                          background:#F97316;
                        "
                      ></span>
                      Consular
                    </span>
                  </span>
                `:""}
          </div>

          <div
            style="
              display:grid;
              grid-template-columns:124px minmax(0,1fr);
              gap:0;
              width:100%;
            "
          >
            <div
              style="
                min-width:0;
                border-right:1px solid #CBD5E1;
                background:#FFFFFF;
              "
            >
              <div
                style="
                  height:30px;
                  display:grid;
                  grid-template-columns:minmax(0,1fr) 38px;
                  align-items:end;
                  border-bottom:1px solid #E2E8F0;
                "
              >
                <div
                  style="
                    color:#64748B;
                    font-size:9px;
                    font-weight:900;
                    padding-bottom:4px;
                  "
                >
                  Location
                </div>

                <div
                  style="
                    text-align:right;
                    color:#64748B;
                    font-size:9px;
                    font-weight:900;
                    padding:0 5px 4px 0;
                  "
                >
                  Share
                </div>
              </div>

              ${qe}
            </div>

            <div
              style="
                position:relative;
                min-width:0;
                overflow:hidden;
              "
            >
              <div
                style="
                  overflow-x:auto;
                  overflow-y:hidden;
                  scrollbar-width:none;
                  overscroll-behavior-x:contain;
                  -webkit-overflow-scrolling:touch;
                "
              >
                <div
                  style="
                    width:${ve.length*38}px;
                    min-width:${ve.length*38}px;
                  "
                >
                  <div
                    style="
                      height:30px;
                      display:flex;
                      align-items:flex-end;
                      border-bottom:1px solid #E2E8F0;
                    "
                  >
                    ${ze}
                  </div>

                  ${ot}
                </div>
              </div>

              ${Ge}
            </div>
          </div>
        </div>
      `}o.innerHTML=`

      ${Ae}

      ${Ie}

      <div style="margin-top:14px; padding-top:12px; border-top:1px solid #CBD5E1;">

        <div style="display:flex; align-items:baseline; justify-content:space-between; gap:10px; margin-bottom:8px;">

          <div style="font-size:14px; font-weight:900; color:#0F172A;">
            Recent Dates \xB7 ${S(E)}
            <span style="font-size:9px; font-weight:700; color:#94A3B8; margin-left:4px;">
              \xB7 FindVisaSlots.com
            </span>
          </div>
          <div style="font-size:10px; font-weight:800; color:#64748B;">Showing ${Ee}</div>
        </div>
        <table style="width:100%; border-collapse:collapse; table-layout:fixed; font-size:11px;">
          <thead>
            <tr>
              <th style="text-align:left; color:#64748B; font-size:10px; font-weight:900; padding:0 2px 5px;">Found</th>
              <th style="text-align:right; color:#64748B; font-size:10px; font-weight:900; padding:0 2px 5px;">Embassy</th>
              <th style="text-align:right; color:#64748B; font-size:10px; font-weight:900; padding:0 2px 5px;">Date</th>
              <th style="text-align:right; color:#64748B; font-size:10px; font-weight:900; padding:0 2px 5px;">Found By</th>
            </tr>
          </thead>
          <tbody>${ce}</tbody>
        </table>

        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-top:8px;">
          <button
            id="paStatsNewerBtn"
            type="button"
            ${y<=0?"disabled":""}
            style="
              border:none;
              background:none;
              color:${y<=0?"#94A3B8":"#2563EB"};
              font-size:11px;
              font-weight:800;
              cursor:${y<=0?"default":"pointer"};
              padding:4px 0;
            "
          >
            \u2190 Newer
          </button>

          <button
            id="paStatsOlderBtn"
            type="button"
            ${y>=M-1||N===0?"disabled":""}
            style="
              border:none;
              background:none;
              color:${y>=M-1||N===0?"#94A3B8":"#2563EB"};
              font-size:11px;
              font-weight:800;
              cursor:${y>=M-1||N===0?"default":"pointer"};
              padding:4px 0;
            "
          >
            Older \u2192
          </button>
        </div>
      </div>

      <div style="margin-top:14px; padding-top:12px; border-top:1px solid #CBD5E1;">

        <div style="font-size:14px; font-weight:900; color:#0F172A; margin-bottom:4px;">
          Slots Found by Hour \xB7 ${S(E)}
        </div>
        <div style="font-size:11px; color:#64748B; font-weight:600; margin-bottom:10px;">
          Distinct matching location, visa type, and appointment-date combinations observed during each hour.
        </div>


        ${me(t)}
      </div>


      <div style="margin-top:14px; padding-top:12px; border-top:1px solid #CBD5E1;">

        <div style="font-size:14px; font-weight:900; color:#0F172A; margin-bottom:4px;">
          Slots Found by Minute \xB7 ${S(E)}
        </div>

        <div style="font-size:11px; color:#64748B; font-weight:600; margin-bottom:10px;">
          Minute of the hour when each matching slot occurrence was first observed.
        </div>

        ${De(t)}
      </div>
    `;let Ue=document.getElementById("paStatsNewerBtn"),Le=document.getElementById("paStatsOlderBtn");Ue&&Ue.addEventListener("click",async()=>{y=Math.max(0,y-1),await _e()}),Le&&Le.addEventListener("click",async()=>{y=Math.min(M-1,y+1),await _e()})}function Fe(){let o=document.getElementById("paStatsClearBtn");o&&o.addEventListener("click",async()=>{let e=globalThis.VSASlotHistoryReport;if(typeof(e==null?void 0:e.clearReport)!="function"){x("Slot History unavailable");return}pt("clear_stats",{onConfirm:async()=>{let t=await d();if(!t){x("Could not identify active profile");return}await e.clearReport({userId:t.vsa_user_id,profileId:t.activeProfileId}),y=0,await _e(),x("Slot History cleared")},onCancel:()=>{}})})}function Te(o){return String(o??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}async function ae(){let o=document.getElementById("paAssistActivityBody");if(!o)return;let e=globalThis.VSAAssistActivityLog;if(!e||typeof e.getRows!="function"){o.innerHTML=`
        <div style="font-size:12px; color:#92400E; font-weight:800; padding:10px; border:1px solid #FDE68A; border-radius:8px; background:#FFFBEB;">
          Assist activity unavailable.
        </div>
      `;return}let t=[];try{t=await e.getRows()}catch{o.innerHTML=`
        <div style="font-size:12px; color:#991B1B; font-weight:800; padding:10px; border:1px solid #FCA5A5; border-radius:8px; background:#FEF2F2;">
          Could not read recent activity.
        </div>
      `;return}if(!t.length){o.innerHTML=`
        <div style="font-size:12px; color:#64748B; font-weight:700; padding:10px; border:1px solid #E2E8F0; border-radius:8px; background:#F8FAFC;">
          No recent Assist activity recorded.
        </div>
      `;return}o.innerHTML=t.slice().reverse().map(i=>{let g=new Date(Number(i.t)),E=Number.isNaN(g.getTime())?"Unknown time":g.toLocaleTimeString([],{hour:"numeric",minute:"2-digit",second:"2-digit"}),n=i.httpStatus?`HTTP ${i.httpStatus} \u2014 `:"",N=typeof e.helpUrl=="function"?e.helpUrl(i):"",M=N?`<a href="${Te(N)}" target="_blank" rel="noopener noreferrer" style="font-size:11px; color:#2563EB; font-weight:800; text-decoration:none;">What this means</a>`:"",K=i.type==="error"||i.type==="recovery"||!!N;return`
          <div style="padding:9px 0; border-bottom:1px solid #E2E8F0;">
            <div style="font-size:11px; color:#64748B; font-weight:800;">
              ${Te(E)} \u2014 ${Te(n)}${Te(i.title||i.reason)}
            </div>
            ${K?`
                  <div style="font-size:12px; color:#0F172A; font-weight:700; margin-top:3px;">
                    ${Te(i.detail||"")}
                  </div>
                `:""}
            ${M?`<div style="margin-top:5px;">${M}</div>`:""}
          </div>
        `}).join("")}async function ue(o){let e=We(o),t=Array.from(document.querySelectorAll("[data-pa-tab-id]")),i=Array.from(document.querySelectorAll("[data-pa-panel-id]"));t.forEach(g=>{let E=g.getAttribute("data-pa-tab-id")===e;g.setAttribute("aria-selected",E?"true":"false"),g.style.background=E?"#FFFFFF":"#F1F5F9",g.style.color=E?"#0F172A":"#475569",g.style.borderColor=E?"#0F172A":"#CBD5E1",g.style.borderBottomColor=E?"#FFFFFF":"#0F172A",g.style.position="relative",g.style.top=E?"1px":"0"}),i.forEach(g=>{let E=g.getAttribute("data-pa-panel-id")===e;g.hidden=!E}),await at(e)}function he(){let o=document.getElementById("paAssistActivityOpenBtn"),e=document.getElementById("paAssistActivityBackBtn"),t=document.getElementById("paAssistActivityCopyBtn"),i=document.getElementById("paAssistActivityClearBtn");o&&o.addEventListener("click",async()=>{var g;await ae(),await ue("assistLog"),(g=document.getElementById(m))==null||g.scrollIntoView({block:"start"})}),e&&e.addEventListener("click",async()=>{var g;await ue("stats"),(g=document.getElementById(m))==null||g.scrollIntoView({block:"start"})}),t&&t.addEventListener("click",async()=>{let g=globalThis.VSAAssistActivityLog;if(!g||typeof g.getRows!="function"||typeof g.formatRowsForCopy!="function"){x("Activity unavailable");return}if(!navigator.clipboard||typeof navigator.clipboard.writeText!="function"){x("Clipboard unavailable");return}let E=await g.getRows();await navigator.clipboard.writeText(g.formatRowsForCopy(E)),x("Activity copied")}),i&&i.addEventListener("click",async()=>{let g=globalThis.VSAAssistActivityLog;if(!g||typeof g.clear!="function"){x("Activity unavailable");return}await g.clear(),await ae(),x("Activity cleared")})}async function J(){try{let o=await chrome.storage.local.get([w]);return(o==null?void 0:o[w])===!0}catch{return!1}}async function Se(){try{await chrome.storage.local.set({[w]:!0})}catch{}}function We(o){let e=String(o||"");return e==="homePage"?"loginPage":{stats:!0,assistLog:!0,waitingRoom:!0,loginPage:!0,schedulePage:!0,alertsPage:!0,advancedSchedule:!0}[e]?e:C}async function it(){try{let o=await chrome.storage.local.get([k]);return We(o==null?void 0:o[k])}catch{return C}}async function at(o){await chrome.storage.local.set({[k]:We(o)})}async function St(){let o=await it(),e=Array.from(document.querySelectorAll("[data-pa-tab-id]")),t=Array.from(document.querySelectorAll("[data-pa-panel-id]"));function i(g){o=We(g),e.forEach(E=>{let n=E.getAttribute("data-pa-tab-id")===o;E.setAttribute("aria-selected",n?"true":"false"),E.style.background=n?"#FFFFFF":"#F1F5F9",E.style.color=n?"#0F172A":"#475569",E.style.borderColor=n?"#0F172A":"#CBD5E1",E.style.borderBottomColor=n?"#FFFFFF":"#0F172A",E.style.position="relative",E.style.top=n?"1px":"0"}),t.forEach(E=>{let n=E.getAttribute("data-pa-panel-id")===o;E.hidden=!n})}i(o),e.forEach(g=>{g.addEventListener("click",async()=>{let E=g.getAttribute("data-pa-tab-id");E&&await ue(E)})})}function gt(){try{chrome.tabs.query({active:!0,currentWindow:!0},o=>{let e=o&&o[0]&&o[0].id;e&&chrome.tabs.sendMessage(e,{type:"VSA_PROFILE_UPDATED",source:"portal_assist_popup"},()=>{var t;(t=chrome.runtime)==null||t.lastError})})}catch{}}function bt(o){return new Promise(e=>{try{chrome.tabs.query({active:!0,currentWindow:!0},t=>{let i=t&&t[0]&&t[0].id;if(!i){e({ok:!1,reason:"no_active_tab"});return}chrome.tabs.sendMessage(i,{type:"VSA_ASSIST_CHECK_COMMAND",action:"set",enabled:!!o,source:"portal_assist_popup"},g=>{var n;let E=(n=chrome.runtime)==null?void 0:n.lastError;if(E){e({ok:!1,reason:"send_failed",error:E.message});return}e(g||{ok:!1,reason:"empty_response"})})})}catch{e({ok:!1,reason:"exception"})}})}function vt(o){let e=document.getElementById("paAlertsCoverage");if(!e)return;let t=r(o),i=String(t.tier),g=o.profiles[o.activeProfileId],E=String(g.desiredSlotStartDate||""),n=String(g.desiredSlotEndDate||"");if(!E||!n){e.innerHTML=`
        <div style="font-weight:800; color:#0F172A;">Your target range:</div>
        <div style="margin-top:2px;">Set your target range above.</div>
      `;return}let N=ce=>new Date(`${ce}T00:00:00`).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),M=`${N(E)} \u2013 ${N(n)}`;if(i!=="free"){e.innerHTML=`
        <div style="margin-left:10px;">
          <div style="font-weight:800; color:#0F172A;">
            Premium alerts cover any appointment date within your selected range.
          </div>

          <div style="font-weight:800; color:#0F172A; margin-top:10px;">
            Your preferred date range
          </div>
          <div style="margin-top:2px;">${M}</div>

          <div style="font-weight:800; color:#0F172A; margin-top:8px;">
            Current coverage
          </div>
          <div style="margin-top:2px;">
            You\u2019ll receive alerts for your full selected date range.
          </div>
        </div>
      `;return}let K=Number(pe().free.minDaysOut),ne=new Date;ne.setHours(0,0,0,0),ne.setDate(ne.getDate()+K);let ge=[ne.getFullYear(),String(ne.getMonth()+1).padStart(2,"0"),String(ne.getDate()).padStart(2,"0")].join("-"),Ee=n<ge?"Your selected dates are outside the Free alert period.":`${K} days+ (${N(ge)}) \u2013 ${N(n)}`;e.innerHTML=`
      <div
        style="
          padding:9px 10px;
          border:1px solid #BFDBFE;
          border-radius:8px;
          background:#EFF6FF;
          color:#1E3A8A;
          font-weight:700;
          line-height:1.45;
        "
      >
        <div>
          <strong>Free alerts cover appointments 120 days or more away.</strong>
          Upgrade to receive alerts for any date through
          <a
            href="${j}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              color:#2563EB;
              font-weight:900;
              text-decoration:underline;
            "
          >paid plans</a>.
        </div>
      </div>

      <div style="margin-left:10px;">
        <div style="font-weight:800; color:#0F172A; margin-top:10px;">
          Your preferred date range
        </div>
        <div style="margin-top:2px;">${M}</div>

        <div style="font-weight:800; color:#0F172A; margin-top:8px;">
          Current coverage
        </div>
        <div style="margin-top:2px;">${Ee}</div>
      </div>
    `}function Et(){var o,e;return`
      <!--
      [AUDIT]
      Goal:
      - Render Date Range / OFC preferences as their own top-level popup card.

      Reason:
      - Date preferences, manual reminders, and Portal Assist tools are separate
        user tasks and should not be nested inside one parent card.

      Invariant:
      - Existing date-picker and Consular-range control ids remain unchanged.
      - Profile persistence and runtime date-range behavior remain unchanged.
      - This change is presentation-only.

      Handles:
      - Preferred date range.
      - OFC/Consular relative Consular range preference.

      Does NOT handle:
      - Saving either preference.
      - Calculating effective Consular dates.
      - Reminder settings.
      - Portal Assist tab behavior.

      Failure mode if wrong:
      - The three primary popup sections may still render as nested cards instead
        of independent top-level cards.
      -->
      <div class="card">
          <div style="margin-top:0; margin-bottom:0;">
            <div style="font-size:14px; font-weight:900; color:#0F172A; margin-bottom:10px;">
              Date Range You're Looking For:
          </div>
          ${((e=(o=globalThis.VSADateUtils)==null?void 0:o.datePickerWidgetHTML)==null?void 0:e.call(o,"pa"))||""}
          <div id="paDateError" class="error-msg" style="display:none;">Check dates</div>

          <!--
          [AUDIT]
          Goal:
          - Let users optionally narrow the Consular stage after an OFC booking.

          Reason:
          - OFC/Consular applicants may accept a broad OFC date range but need the
            following Consular appointment within a shorter period after OFC.

          Invariant:
          - Blank means the normal saved date range remains unchanged.
          - The setting does not alter the OFC booking range.
          - The normal desiredSlotEndDate is never overwritten.

          Handles:
          - Optional 1\u201312 week Consular restriction.
          - OFC/Consular countries such as India and the Philippines.

          Does NOT handle:
          - Detecting the user's country.
          - Calculating the final Consular end date.
          - Changing the stored normal date range.

          Failure mode if wrong:
          - Users may believe their OFC range is being shortened or may save a
            Consular preference that runtime code cannot read.
          -->
          <div
            style="
              margin-top:12px;
              padding-top:10px;
              border-top:1px solid #E2E8F0;
            "
          >
            <div style="font-size:11px; font-weight:800; color:#475569; margin-bottom:6px;">
              For OFC / Consular locations (IN, PH, etc.)
            </div>

            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:12px; color:#334155; font-weight:600;">
                Consular range within
              </span>

              <select
                id="paConsularRangeWeeks"
                style="
                  width:auto;
                  min-width:110px;
                  font-size:12px;
                  padding:5px 7px;
                  border:1px solid #CBD5E1;
                  border-radius:6px;
                  color:#334155;
                  background:#FFFFFF;
                "
              >
                <option value="">Full date range</option>
              </select>
            </div>

            <!--
            [AUDIT]
            Goal:
            - Explain how the selected Consular week preference interacts with
              the user's preferred End date.

            Reason:
            - Runtime uses the selected weeks after OFC but never extends the
              Consular range beyond the user's preferred End date.

            Invariant:
            - This text is display-only.
            - The selected Consular preference and preferred End date are unchanged.

            Handles:
            - Selected Consular week limit.
            - Preferred End date occurring sooner.

            Does NOT handle:
            - Calculating or persisting the effective Consular range.

            Failure mode if wrong:
            - Users may misunderstand which date limits their Consular search.
            -->
            <div style="font-size:10px; color:#64748B; font-weight:500; line-height:1.4; margin-top:5px;">
              Consular dates will be limited to the selected weeks after OFC, or your preferred End date - whichever comes sooner.
            </div>

            <!--
            [AUDIT]
            Goal:
            - Show the successfully booked OFC date and resulting Consular date
              window directly below the OFC/Consular preference.

            Reason:
            - The runtime restriction is calculated without overwriting the
              user's saved base date range, so users otherwise cannot see the
              effective Consular window.

            Invariant:
            - This box is display-only.
            - desiredSlotStartDate / desiredSlotEndDate remain unchanged.
            - ofcBookedDateIso remains the persisted OFC booking anchor.
            - The displayed Consular end can only equal or precede the user's
              normal desiredSlotEndDate.

            Handles:
            - Successfully booked OFC plus enabled Consular-within-weeks setting.
            - Two-line booked-date and Consular-range presentation.

            Does NOT handle:
            - Persisting OFC booking state.
            - Changing booking eligibility.
            - Changing the saved profile date range.

            Failure mode if wrong:
            - The popup may display a Consular window different from the range
              actually implied by the saved OFC date and week preference.
            -->
            <div
              id="paConsularBookedStatus"
              style="
                display:none;
                margin-top:10px;
                padding:9px 10px;
                border:2px solid #16A34A;
                border-radius:8px;
                background:#ECFDF5;
                color:#166534;
                line-height:1.4;
              "
            >
              <div
                id="paConsularBookedStatusTitle"
                style="
                  font-size:13px;
                  font-weight:900;
                "
              ></div>

              <div
                id="paConsularBookedStatusRange"
                style="
                  margin-top:2px;
                  font-size:11px;
                  font-weight:700;
                "
              ></div>
            </div>
          </div>
          </div>
        </div>

        <!--
        [AUDIT]
        Goal:
        - Render manual check reminders using the same top-level card treatment
          as Date Range and Get More Help.

        Reason:
        - The reminder section is currently a manually styled white box while
          the other two primary sections use the shared .card styling.

        Invariant:
        - Existing reminder controls, ids, storage, and scheduling behavior remain unchanged.
        - The section remains a sibling of the Date Range and Portal Assist cards.
        - Visual treatment comes from the existing .card class.

        Handles:
        - Matching the reminder section to the other primary popup cards.

        Does NOT handle:
        - Changing reminder functionality.
        - Changing reminder control styling inside the card.
        - Changing the other two cards.

        Failure mode if wrong:
        - The reminder section may continue looking visually different from the
          other primary popup cards.
        -->
        <div class="card">
          <div style="margin-top:0; margin-bottom:0;">
          <div style="font-size:14px; font-weight:900; color:#0F172A;">
            Get Alert Reminders To Check For Slots:
          </div>

          <div style="font-size:11px; color:#64748B; font-weight:500; line-height:1.4; margin-top:4px;">
            The more often you check, the more chances you have to find a slot.
          </div>

          <div style="margin-top:12px;">
            <label style="margin:0;">
              <span style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
                <span style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:500; color:#334155;">
                  <span>Remind me to check</span>

                  <button
                    id="paManualCheckReminderTestBtn"
                    type="button"
                    style="
                      border:none;
                      background:none;
                      padding:0;
                      color:#2563EB;
                      font-size:11px;
                      font-weight:600;
                      text-decoration:underline;
                      cursor:pointer;
                    "
                  >
                    \u{1F514} test reminder
                  </button>
                </span>

                <input
                  id="paManualCheckReminderToggle"
                  type="checkbox"
                  style="width:auto; transform:scale(1.1);"
                />
              </span>
            </label>
          </div>

          <div style="margin-top:12px;">
            <label style="display:block; margin:0;">
              <span style="display:flex; align-items:center; gap:8px;">
                <input
                  id="paManualCheckReminderScheduleInterval"
                  name="paManualCheckReminderSchedule"
                  type="radio"
                  value="interval"
                  style="width:auto;"
                />

                <span style="font-size:13px; font-weight:500; color:#334155;">
                  Remind me every
                </span>

                <select
                  id="paManualCheckReminderMinutes"
                  style="
                    width:112px;
                    height:28px;
                    padding:0 4px;
                    font-size:12px;
                    line-height:1;
                    box-sizing:border-box;
                  "
                >
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="180">3 hours</option>
                  <option value="240">4 hours</option>
                  <option value="360">6 hours</option>
                  <option value="480">8 hours</option>
                  <option value="720">12 hours</option>
                </select>
              </span>
            </label>

            <div
              id="paManualCheckReminderFreeMinuteInfo"
              style="
                display:none;
                margin-top:14px;
                padding:9px 10px;
                border:1px solid #BFDBFE;
                border-radius:8px;
                background:#EFF6FF;
                color:#1E3A8A;
                font-size:12px;
                font-weight:700;
                line-height:1.45;
              "
            >
              When slots open they tend to be around minute :00 and :30 of every hour.
              For reminders to check at specific times,
              <button
                id="paManualCheckReminderSeePlansBtn"
                type="button"
                style="
                  border:none;
                  background:none;
                  padding:0;
                  color:#2563EB;
                  font:inherit;
                  font-weight:900;
                  text-decoration:underline;
                  cursor:pointer;
                "
              >
                see paid plans
              </button>.
            </div>

            <!--
            [AUDIT]
            Goal:
            - Identify exact-minute manual reminders as a Premium feature.

            Reason:
            - Exact-minute reminders are already restricted to paid tiers and
              route Free users through the existing upgrade flow, but the option
              does not visibly explain that restriction.

            Invariant:
            - paManualCheckReminderScheduleMinuteMarks remains unchanged.
            - Existing paid-tier gating and upgrade-modal behavior remain unchanged.
            - The badge is informational only.

            Handles:
            - Premium labeling for exact-minute reminders.

            Does NOT handle:
            - Changing reminder entitlement.
            - Changing alarm scheduling.
            - Changing saved reminder minute marks.

            Failure mode if wrong:
            - Free users may not understand why exact-minute reminders are locked.
            -->
            <label style="display:block; margin:14px 0 0 0;">
              <span style="display:flex; align-items:center; gap:8px;">
                <input
                  id="paManualCheckReminderScheduleMinuteMarks"
                  name="paManualCheckReminderSchedule"
                  type="radio"
                  value="minute_marks"
                  style="width:auto;"
                />

                <span style="display:flex; align-items:center; gap:6px;">
                  <span style="font-size:13px; font-weight:500; color:#334155;">
                    Remind every hour at:
                  </span>

                  <span
                    style="
                      border-radius:999px;
                      background:#DBEAFE;
                      color:#1D4ED8;
                      padding:2px 6px;
                      font-size:9px;
                      font-weight:800;
                      text-transform:uppercase;
                    "
                  >
                    Premium
                  </span>
                </span>
              </span>
            </label>

            <div
              id="paManualCheckReminderMinuteMarkControls"
              style="margin:8px 0 0 24px;"
            >
              <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                ${Array.from({length:4}).map((t,i)=>`
                  <select
                    data-pa-manual-reminder-minute-index="${i}"
                    style="
                      width:58px;
                      height:28px;
                      padding:0 4px;
                      font-size:12px;
                      box-sizing:border-box;
                    "
                  >
                    <option value="">\u2014</option>
                    ${Array.from({length:60}).map((g,E)=>`<option value="${E}">:${String(E).padStart(2,"0")}</option>`).join("")}
                  </select>
                `).join("")}
              </div>
            </div>
          </div>

          <div style="margin-top:14px;">
            <label style="margin:0;">
              <span style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
                <span style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:500; color:#334155;">
                  <span>Play custom reminder sentence</span>

                  <button
                    id="paManualCheckReminderTtsTestBtn"
                    type="button"
                    style="
                      border:none;
                      background:none;
                      padding:0;
                      color:#2563EB;
                      font-size:11px;
                      font-weight:600;
                      text-decoration:underline;
                      cursor:pointer;
                    "
                  >
                    \u{1F50A} test
                  </button>
                </span>

                <input
                  id="paManualCheckReminderTtsToggle"
                  type="checkbox"
                  style="width:auto; transform:scale(1.1);"
                />
              </span>
            </label>

            <div style="display:flex; align-items:center; gap:6px; margin-top:8px;">
              <span style="font-size:11px; color:#64748B;">
                Message:
              </span>

              <input
                id="paManualCheckReminderTtsMessage"
                type="text"
                maxlength="120"
                placeholder="Reminder to check for slots"
                style="
                  width:70%;
                  box-sizing:border-box;
                  font-size:12px;
                  padding:5px 8px;
                  border:1px solid #CBD5E1;
                  border-radius:6px;
                  color:#334155;
                  outline:none;
                "
              />
            </div>
          </div>
          </div>
        </div>

      <!--
      [AUDIT]
      Goal:
      - Render Portal Assist tools and tabs as their own top-level popup card.

      Reason:
      - The tabbed portal tools are separate from date preferences and manual
        reminder scheduling.

      Invariant:
      - Existing tab ids, panel ids, selectors, and active-tab persistence remain unchanged.
      - All Portal Assist tab panels remain inside this card.
      - #portalAssistCard continues to identify the Portal Assist tools card.
      - This change is presentation-only.

      Handles:
      - Get More Help heading.
      - Tab navigation.
      - All existing Portal Assist tab panels.

      Does NOT handle:
      - Tab behavior.
      - Settings persistence.
      - Runtime Portal Assist behavior.

      Failure mode if wrong:
      - Portal Assist tools may remain nested with unrelated primary controls or
        one or more tab panels may be placed outside their card.
      -->
      <div class="card" id="portalAssistCard">
          <div
            style="
              font-size:14px;
              font-weight:900;
              color:#0F172A;
              margin-bottom:10px;
            "
          >
            Get More Help With The Visa Portal:
          </div>

        <div
          id="paTabBar"
          role="tablist"
          aria-label="Portal Assist settings"
          style="
            display:flex;
            gap:0;
            overflow:hidden;
            padding:0;
            margin:0 0 12px 0;
            border-bottom:1px solid #0F172A;
          "
        >
          ${h("stats","Your Slot<br>History")}
          ${h("waitingRoom","Waiting<br>Room")}
          ${h("loginPage","Login<br>Page")}
          ${h("schedulePage","Schedule<br>Page")}
          ${h("alertsPage","Get<br>Notified")}
          ${h("advancedSchedule","Advanced")}
        </div>

        <div data-pa-panel-id="stats" role="tabpanel">
          <div style="margin-top:4px; margin-bottom:16px;">
            <div style="font-size:14px; font-weight:900; color:#0F172A;">Your Slot History</div>

            <div style="font-size:11px; color:#64748B; font-weight:600; line-height:1.4; margin-top:4px;">
              See matching dates found by your checks and the FindVisaSlots community for your selected locations and date range.
            </div>

            <div
              style="
                margin-top:7px;
                padding:7px 8px;
                border:1px solid #FDE68A;
                border-radius:7px;
                background:#FFFBEB;
                color:#92400E;
                font-size:11px;
                font-weight:800;
                line-height:1.4;
              "
            >
              History is collected only while you are logged in and checking for slots. Keep the visa portal open to build your history.
            </div>
          </div>

          <div id="paStatsPanelBody" style="margin-top:4px;">
            <div style="font-size:12px; color:#64748B; font-weight:700;">
              Loading stats...
            </div>
          </div>

          <button
            id="paStatsClearBtn"
            type="button"
            style="
              margin-top:12px;
              border:none;
              background:none;
              color:#DC2626;
              font-size:11px;
              font-weight:800;
              cursor:pointer;
              padding:4px 0;
            "
          >
            Clear stats
          </button>

          <div
            style="
              margin-top:16px;
              padding-top:12px;
              border-top:1px solid #E2E8F0;
              text-align:right;
            "
          >
            <button
              id="paAssistActivityOpenBtn"
              type="button"
              style="
                border:none;
                background:none;
                color:#2563EB;
                font-size:11px;
                font-weight:800;
                cursor:pointer;
                padding:4px 0;
              "
            >
              View activity log \u2192
            </button>
          </div>
        </div>

        <div data-pa-panel-id="assistLog" role="tabpanel">
          <div style="margin-top:4px;">
            <button
              id="paAssistActivityBackBtn"
              type="button"
              style="
                border:none;
                background:none;
                color:#2563EB;
                font-size:11px;
                font-weight:800;
                cursor:pointer;
                padding:4px 0;
              "
            >
              \u2190 History
            </button>

            <div style="font-size:14px; font-weight:900; color:#0F172A; margin-top:8px;">
              Activity Log
            </div>

            <div style="font-size:11px; color:#64748B; font-weight:500; margin-top:2px;">
              Last 20 local assist, recovery, and portal-error events.
            </div>
          </div>

          <div style="display:flex; align-items:center; justify-content:flex-end; gap:12px; margin-top:10px;">
            <button
              id="paAssistActivityCopyBtn"
              type="button"
              style="
                border:none;
                background:none;
                color:#2563EB;
                font-size:11px;
                font-weight:800;
                cursor:pointer;
                padding:4px 0;
              "
            >
              Copy
            </button>

            <button
              id="paAssistActivityClearBtn"
              type="button"
              style="
                border:none;
                background:none;
                color:#DC2626;
                font-size:11px;
                font-weight:800;
                cursor:pointer;
                padding:4px 0;
              "
            >
              Clear
            </button>
          </div>

          <div id="paAssistActivityBody" style="margin-top:10px;">
            <div style="font-size:12px; color:#64748B; font-weight:700;">
              Loading recent activity...
            </div>
          </div>
        </div>

        <div data-pa-panel-id="waitingRoom" role="tabpanel">

        <div style="margin-top:4px; margin-bottom:16px;">
          <div style="font-size:14px; font-weight:900; color:#0F172A;">Waiting Room</div>
          <div style="font-size:11px; color:#64748B; font-weight:600; line-height:1.4; margin-top:4px;">
            Get notified when you enter or exit the Waiting Room or Cloudflare checks, so you do not need to keep watching the page.
          </div>
        </div>

        <div style="margin-top:10px;">
          <label style="margin:0;">
            <span style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
              <span style="font-size:13px; font-weight:500; color:#334155;">
                Display wait timer
              </span>

              <input id="paQueueWaitOverlayToggle" type="checkbox" style="width:auto; transform:scale(1.1);" />
            </span>
          </label>
          <div style="font-size:11px; color:#64748B; font-weight:500; margin-top:4px;">
            Shows how long this tab has been in the waiting room.
          </div>
        </div>

        <div style="margin-top:14px;">
          <label style="margin:0;">
            <span style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
              <span style="font-size:13px; font-weight:500; color:#334155;">
                Voice alert while in queue
              </span>

              <select
                id="paQueueStatusAlertMinutes"
                style="
                  width:104px;
                  height:28px;
                  padding:0 4px;
                  font-size:12px;
                  line-height:1;
                  box-sizing:border-box;
                "
              >
                <option value="0">Off</option>
                <option value="5">Every 5 min</option>
                <option value="10">Every 10 min</option>
                <option value="15">Every 15 min</option>
              </select>
            </span>
          </label>
          <div style="font-size:11px; color:#64748B; font-weight:500; margin-top:4px;">
            Speaks once when you enter the waiting room, then repeats at the selected interval.
          </div>
        </div>

        <div style="margin-top:14px;">
          <label style="margin:0;">
            <span style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
              <span style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:500; color:#334155;">
                <span>Voice alert when line wait is over</span>

                <button
                  id="paPlayTestQueueClearBtn"
                  type="button"
                  style="
                    border:none;
                    background:none;
                    padding:0;
                    color:#2563EB;
                    font-size:11px;
                    font-weight:600;
                    text-decoration:underline;
                    cursor:pointer;
                  "
                >
                  \u{1F50A} test
                </button>
              </span>

              <input id="paQueueClearAlertToggle" type="checkbox" style="width:auto; transform:scale(1.1);" />
            </span>
          </label>
          <div style="font-size:11px; color:#64748B; font-weight:500; margin-top:4px;">
            Speaks when the portal leaves the waiting room.
          </div>
        </div>

        <div style="margin-top:14px;">
          <label style="margin:0;">
            <span style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
              <span style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:500; color:#334155;">
                <span>Voice alert for Cloudflare checks</span>

                <button
                  id="paPlayTestCloudflareClearBtn"
                  type="button"
                  style="
                    border:none;
                    background:none;
                    padding:0;
                    color:#2563EB;
                    font-size:11px;
                    font-weight:600;
                    text-decoration:underline;
                    cursor:pointer;
                  "
                >
                  \u{1F50A} test
                </button>
              </span>

              <input id="paCloudflareClearAlertToggle" type="checkbox" style="width:auto; transform:scale(1.1);" />
            </span>
          </label>
          <div style="font-size:11px; color:#64748B; font-weight:500; margin-top:4px;">
            Speaks when a portal check page appears.
          </div>

          <!--
          [AUDIT]
          Goal:
          - Let the user customize the Cloudflare entry-warning sentence, as a
            child setting of Voice alert for Cloudflare checks.

          Reason:
          - The alert now covers only the check-appears event; the completion
            line ("Cloud flare completed.") no longer speaks live (see
            pageState.js) and no longer has a separate test control.

          Invariant:
          - paCloudflareWarningTtsMessage remains the saved message control.
          - Empty text still means "Verify you are a human." at playback.
          - cloudflareClearAlertEnabled remains the single toggle, now scoped
            to only this event.
          - The top-level test button above previews this same message; there
            is no second test button for this input.

          Handles:
          - Custom entry-warning sentence input.

          Does NOT handle:
          - Cloudflare completion sentence (retired from live behavior).
          - Saving behavior (see savePatch listener).

          Failure mode if wrong:
          - The sentence setting may look unrelated to the alert it configures.
          -->
          <div style="margin-top:9px; margin-left:10px;">
            <label style="margin:0;">
              <span style="font-size:12px; font-weight:500; color:#475569;">
                Custom alert sentence
              </span>
            </label>
            <div id="paCloudflareWarningTtsMessageWrap" style="margin-top:6px;">
              <span style="font-size:11px; color:#64748B; margin-right:6px;">Message:</span>
              <input
                id="paCloudflareWarningTtsMessage"
                type="text"
                maxlength="120"
                placeholder="Verify you are a human."
                style="
                  width:50%;
                  box-sizing:border-box;
                  font-size:12px;
                  padding:5px 8px;
                  border:1px solid #CBD5E1;
                  border-radius:6px;
                  color:#334155;
                  outline:none;
                "
              />
            </div>
          </div>
        </div>

        </div>



        <div data-pa-panel-id="loginPage" role="tabpanel">

        <div style="margin-top:4px; margin-bottom:16px;">
          <div style="font-size:14px; font-weight:900; color:#0F172A;">Login Page</div>
          <div style="font-size:11px; color:#64748B; font-weight:600; line-height:1.4; margin-top:4px;">
            Save time each time you log in. Your login info is safe and stays only on your computer.
          </div>
        </div>

        <div style="margin-top:10px; margin-bottom:16px;">
          <label style="margin:0;">
            <span style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px;">
              <span>
                <span style="display:block; font-size:13px; font-weight:500; color:#334155;">
                  Play audio when login page loads
                </span>

                <span style="display:block; margin-top:3px; font-size:11px; font-weight:600; line-height:1.4; color:#64748B;">
                  Announces when the normal visa login page opens, including after leaving the waiting room.
                </span>
              </span>

              <input id="paLoginPageLoadAudioToggle" type="checkbox" style="width:auto; transform:scale(1.1); margin-top:2px;" />
            </span>
          </label>
        </div>

        <div
          id="paLoginAssistInfo"
          style="
            display:none;
            margin-top:10px;
            padding:9px 10px;
            border-radius:8px;
            border:1px solid #FDE68A;
            background:#FFFBEB;
            color:#92400E;
            font-size:11px;
            font-weight:700;
            line-height:1.45;
          "
        >
          Add a Quick Login Profile first to use Login Assist options.
        </div>

        <div id="paLoginAssistControls">
          <div style="margin-top:10px;">
            <label style="margin:0;">
              <span style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
                <span style="font-size:13px; font-weight:500; color:#334155;">
                  Auto-fill username/password
                </span>

                <input id="paLoginAutoFillCredentialsToggle" type="checkbox" style="width:auto; transform:scale(1.1);" />
              </span>
            </label>

          </div>

          <div style="margin-top:14px;">
            <label style="margin:0;">
              <span style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px;">
                <span>
                  <span style="display:block; font-size:13px; font-weight:500; color:#334155; line-height:20px;">
                    Auto-click Sign In
                  </span>

                  <span style="display:block; font-size:11px; color:#64748B; font-weight:500; margin-top:3px;">
                    Only applies inside the popup recovery window.
                  </span>
                </span>

                <input id="paLoginAutoClickSubmitToggle" type="checkbox" style="width:auto; transform:scale(1.1); margin-top:2px;" />
              </span>
            </label>
          </div>

          <div style="margin-top:14px;">
            <label style="margin:0;">
              <span style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
                <span style="font-size:13px; font-weight:500; color:#334155;">
                  Auto-fill security answers
                </span>

                <input id="paLoginAutoFillKbaToggle" type="checkbox" style="width:auto; transform:scale(1.1);" />
              </span>
            </label>
          </div>

          <div style="margin-top:14px;">
            <label style="margin:0;">
              <span style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
                <span style="font-size:13px; font-weight:500; color:#334155;">
                  Auto-click security Continue
                </span>

                <input id="paLoginAutoClickKbaContinueToggle" type="checkbox" style="width:auto; transform:scale(1.1);" />
              </span>
            </label>
          </div>
        </div>

        <div style="margin-top:18px; padding-top:14px; border-top:1px solid #CBD5E1;">
          <div style="font-size:12px; color:#0F172A; font-weight:800; margin-bottom:10px;">
            Home / Session
          </div>

          <div style="margin-top:10px;">
            <label style="margin:0;">
              <span style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
                <span style="font-size:13px; font-weight:500; color:#334155;">
                  Stay Logged In (Best Effort)
                </span>
                <input id="paSessionKeepaliveToggle" type="checkbox" style="width:auto; transform:scale(1.1);" />
              </span>
            </label>
            <div style="font-size:11px; color:#64748B; font-weight:500; margin-top:4px;">
              Refreshes the home page to help stay logged in. It will not refresh schedule or login pages.
            </div>
          </div>

          <div style="margin-top:14px;">
            <label style="margin:0;">
              <span style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
                <span style="font-size:13px; font-weight:500; color:#334155;">
                  Refresh about every
                </span>

                <span style="display:flex; align-items:center; gap:6px;">
                  <input
                    id="paHomeRefreshMinutes"
                    type="number"
                    min="1"
                    max="60"
                    step="1"
                    inputmode="numeric"
                    style="
                      width:70px;
                      height:28px;
                      text-align:center;
                      padding:2px 4px;
                    "
                  />
                  <span style="font-size:12px; color:#64748B; font-weight:700;">min</span>
                </span>
              </span>
            </label>
            <div style="font-size:11px; color:#64748B; font-weight:500; margin-top:4px;">
              Conservative home-page refresh cycle. Recommended: 6\u201310 minutes.
            </div>
          </div>
        </div>

        <div style="margin-top:18px; padding-top:14px; border-top:1px solid #CBD5E1;">
          <label style="margin:0;">
            <span style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px;">
              <span>
                <span style="display:block; font-size:13px; font-weight:500; color:#334155; line-height:20px;">
                  Show country feed on login page
                </span>
                <span style="display:block; font-size:11px; color:#64748B; font-weight:500; margin-top:3px;">
                  Shows recent delayed community checks by country on the main login page. Turn this off if the feed feels distracting.
                </span>
              </span>

              <input id="paLoginActivityFeedToggle" type="checkbox" style="width:auto; transform:scale(1.1); margin-top:2px;" />
            </span>
          </label>
        </div>

        </div>

        <div data-pa-panel-id="schedulePage" role="tabpanel">



        <div style="display:none;">
          <div style="margin-top:8px; margin-bottom:18px; padding-bottom:2px;">
            <div style="font-size:11px; color:#334155; font-weight:700; line-height:1.35;">
              Recommended: turn on all options
            </div>
            <div style="font-size:10px; color:#64748B; font-weight:500; line-height:1.35; margin-top:2px;">
              Every option below adds convenience while checking for slots.
            </div>
          </div>

          <div style="margin-top:10px;">
            <label style="margin:0;">
              <span style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
                <span style="font-size:13px; font-weight:500; color:#334155;">
                  Auto-select first embassy
                </span>

                <input id="paAutoSelectEmbassyToggle" type="checkbox" style="width:auto; transform:scale(1.1);" />
              </span>
            </label>
            <div style="font-size:11px; color:#64748B; font-weight:500; margin-top:4px;">
              Automatically selects the first embassy option so the calendar can load without an extra click.
            </div>
          </div>

          <div style="margin-top:14px;">
            <label style="margin:0;">
              <span style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
                <span style="font-size:13px; font-weight:500; color:#334155;">
                  Auto-jump to earliest date
                </span>

                <input id="paAutoJumpFirstDateToggle" type="checkbox" style="width:auto; transform:scale(1.1);" />
              </span>
            </label>
            <div style="font-size:11px; color:#64748B; font-weight:500; margin-top:4px;">
              Opens the earliest available date on the calendar. It does not select a time or submit anything.
            </div>
          </div>
        </div>

        <div style="margin-top:14px;">
          <label style="margin:0;">
            <span style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
              <span style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:500; color:#334155;">
                <span>Speak the date found</span>

                <button
                  id="paPlayTestDateFoundBtn"
                  type="button"
                  style="
                    border:none;
                    background:none;
                    padding:0;
                    color:#2563EB;
                    font-size:11px;
                    font-weight:600;
                    text-decoration:underline;
                    cursor:pointer;
                  "
                >
                  \u{1F50A} test
                </button>
              </span>

              <input id="paSpeakDateFoundToggle" type="checkbox" style="width:auto; transform:scale(1.1);" />
            </span>
          </label>
          <div style="font-size:11px; color:#64748B; font-weight:500; margin-top:4px;">
            Speaks available dates and no-slot results during checks.
          </div>
        </div>

        <div style="margin-top:14px;">
          <label style="margin:0;">
            <span style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
              <span style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:500; color:#334155;">
                <span>Announce check issues</span>

                <button
                  id="paPlayTestVoiceBtn"
                  type="button"
                  style="
                    border:none;
                    background:none;
                    padding:0;
                    color:#2563EB;
                    font-size:11px;
                    font-weight:600;
                    text-decoration:underline;
                    cursor:pointer;
                  "
                >
                  \u{1F50A} test
                </button>
              </span>

              <input id="paAudioUpdatesToggle" type="checkbox" style="width:auto; transform:scale(1.1);" />
            </span>
          </label>
          <div style="font-size:11px; color:#64748B; font-weight:500; margin-top:4px;">
            Speaks portal errors, recovery messages, and check timeouts.
          </div>
        </div>



        <div style="margin-top:14px;">
          <label style="margin:0;">
            <span style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px;">
              <span>
                <!--
                [AUDIT]
                Goal:
                - Identify automatic recovery-window opening as a Premium feature.

                Reason:
                - Runtime entitlement now restricts automatic recovery-window
                  opening to paid tiers, so the popup must communicate the same
                  product boundary.

                Invariant:
                - paAutoOpenRecoveryWindowToggle remains unchanged.
                - The badge does not itself authorize or persist the feature.
                - Runtime entitlement remains independently enforced by
                  content/schedule/checkRecovery.js.

                Handles:
                - Premium labeling for automatic recovery-window opening.

                Does NOT handle:
                - Recovery failure classification.
                - Creating recovery windows.
                - Changing tier entitlement.

                Failure mode if wrong:
                - Free users may believe automatic recovery-window opening is
                  included in their plan.
                -->
                <span style="display:flex; align-items:center; gap:6px; line-height:20px;">
                  <span style="font-size:13px; font-weight:500; color:#334155;">
                    Auto-open recovery window
                  </span>

                  <span
                    style="
                      border-radius:999px;
                      background:#DBEAFE;
                      color:#1D4ED8;
                      padding:2px 6px;
                      font-size:9px;
                      font-weight:800;
                      text-transform:uppercase;
                    "
                  >
                    Premium
                  </span>
                </span>

                <span style="display:block; font-size:11px; color:#64748B; font-weight:500; margin-top:3px;">
                  Opens a separate portal window automatically when checking is blocked by login, Cloudflare, or waiting room. You may still need to complete the step manually.
                </span>
              </span>

              <input id="paAutoOpenRecoveryWindowToggle" type="checkbox" style="width:auto; transform:scale(1.1); margin-top:2px;" />
            </span>
          </label>
        </div>

        </div>

        <div data-pa-panel-id="alertsPage" role="tabpanel">
          <div style="margin-top:4px; margin-bottom:16px;">
            <div style="font-size:14px; font-weight:900; color:#0F172A;">Get Slot Notifications</div>

            <div style="font-size:11px; color:#64748B; font-weight:600; line-height:1.4; margin-top:4px;">
              Receive alerts when your checks or the FindVisaSlots community finds a slot in your selected date range.
            </div>

            <div
              id="paAlertsCoverage"
              style="
                margin-top:12px;
                font-size:13px;
                line-height:1.45;
                color:#334155;
              "
            ></div>
          </div>

          <div style="margin-top:10px;">

          <div style="margin-top:0;">
            <label style="margin:0;">
              <span style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
                
                <span style="font-size:13px; font-weight:500; color:#334155;">
                  Minimum days notice
                </span>

                <select
                  id="paMinDaysNotice"
                  style="
                    width:70px;
                    height:28px;
                    padding:0 4px;
                    font-size:13px;
                    line-height:1;
                    box-sizing:border-box;
                  "
                >
                  ${Array.from({length:8}).map((t,i)=>`<option value="${i}">${i}</option>`).join("")}
                </select>

              </span>
            </label>

            <div style="font-size:11px; color:#475569; margin-top:6px;">
              Ignore dates if earlier than these days.
            </div>
          </div>

          <div style="margin-top:14px;">
            <label style="margin:0;">
              <span style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
                <span style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:500; color:#334155;">
                  <span>Slot found audio alert</span>

                  <button
                    id="paPlayTestSoundBtn"
                    type="button"
                    style="
                      border:none;
                      background:none;
                      padding:0;
                      color:#2563EB;
                      font-size:11px;
                      font-weight:600;
                      text-decoration:underline;
                      cursor:pointer;
                    "
                  >
                    \u{1F50A} test
                  </button>
                </span>

                <input id="paAudioAlertToggle" type="checkbox" style="width:auto; transform:scale(1.1);" />
              </span>
            </label>
            <div style="font-size:11px; color:#64748B; font-weight:500; margin-top:4px;">
              Plays a sound when your checks or the community find a matching slot.
            </div>

            <!--
            [AUDIT]
            Goal:
            - Show the custom spoken sentence as a child setting of Slot found
              audio alert.

            Reason:
            - Slot-found audio is now TTS-only, so the sentence config belongs
              directly below the audio setting instead of after Desktop Alerts.

            Invariant:
            - paSlotAlertTtsMessage remains the same saved message control.
            - Empty text still means "Slot found".
            - audioAlertEnabled remains the master audio on/off setting.
            - The custom sentence is visually subordinate to that setting.

            Handles:
            - Moving the sentence control directly below Slot found audio alert.
            - Slightly indenting the child setting.

            Does NOT handle:
            - Desktop Alert behavior.
            - Community Alert wording.
            - Voice selection.
            - Saving behavior.

            Failure mode if wrong:
            - The sentence setting may look unrelated to the audio alert it configures.
            -->
            <div style="margin-top:9px; margin-left:10px;">
              <label style="margin:0;">
                <span style="font-size:12px; font-weight:500; color:#475569;">
                  Custom alert sentence
                </span>
              </label>
              <div id="paSlotAlertTtsMessageWrap" style="margin-top:6px;">
                <span style="font-size:11px; color:#64748B; margin-right:6px;">Message:</span>
                <input
                  id="paSlotAlertTtsMessage"
                  type="text"
                  maxlength="120"
                  placeholder="Slot found"
                  style="
                    width:50%;
                    box-sizing:border-box;
                    font-size:12px;
                    padding:5px 8px;
                    border:1px solid #CBD5E1;
                    border-radius:6px;
                    color:#334155;
                    outline:none;
                  "
                />
              </div>
            </div>
          </div>

          <div style="margin-top:14px;">
            <label style="margin:0;">
              <span style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px;">
                <span>
                  <span style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:500; color:#334155; line-height:20px;">
                    <span>Desktop Alerts</span>

                    <button
                      id="paPlayTestDesktopAlertBtn"
                      type="button"
                      style="
                        border:none;
                        background:none;
                        padding:0;
                        color:#2563EB;
                        font-size:11px;
                        font-weight:600;
                        text-decoration:underline;
                        cursor:pointer;
                      "
                    >
                      \u{1F514} test
                    </button>
                  </span>
                  <span style="display:block; font-size:11px; color:#64748B; font-weight:500; margin-top:3px;">
                    Show a computer notification when your checks or the community find a matching appointment.
                  </span>
                </span>

                <input id="paDesktopAlertsToggle" type="checkbox" style="width:auto; transform:scale(1.1); margin-top:2px;" />
              </span>
            </label>
          </div>
        </div>

        </div>

        <div data-pa-panel-id="advancedSchedule" role="tabpanel">



        <div
          style="
            margin-top:10px;
            padding:9px 10px;
            border-radius:8px;
            border:1px solid #CBD5E1;
            background:#F8FAFC;
            color:#475569;
            font-size:11px;
            font-weight:600;
            line-height:1.45;
          "
        >
          <div>
            Advanced options are optional, user-controlled assistance features. You decide whether to enable them, choose the checking frequency, and may stop them at any time.
          </div>

          <div style="margin-top:7px;">
            Please use them at your own discretion and follow the visa portal\u2019s current terms, rules, and usage limits. FindVisaSlots does not solve or bypass CAPTCHAs, waiting rooms, authentication requirements, rate limits, or other portal access controls.
          </div>
        </div>



        <div style="margin-top:22px; padding-top:16px; border-top:1px solid #CBD5E1;">

          <label style="margin:0;">
            <span style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px;">
              <span>
                <span style="display:block; font-size:13px; font-weight:700; color:#0F172A; line-height:20px;">
                  Auto check
                </span>
                <span style="display:block; font-size:11px; color:#64748B; font-weight:500; margin-top:3px;">
                  Start or stop monitoring on the active schedule page.
                </span>
              </span>

              <button
                id="paAssistCheckToggle"
                type="button"
                aria-pressed="false"
                style="
                  border:none;
                  background:none;
                  padding:0;
                  cursor:pointer;
                  line-height:0;
                  margin-top:0;
                  flex-shrink:0;
                "
              >
                <div
                  id="paAssistCheckTrack"
                  style="
                    width:38px;
                    height:20px;
                    border-radius:999px;
                    background:#CBD5E1;
                    position:relative;
                    transition:background 140ms ease;
                  "
                >
                  <div
                    id="paAssistCheckKnob"
                    style="
                      width:16px;
                      height:16px;
                      border-radius:999px;
                      background:#FFFFFF;
                      position:absolute;
                      top:2px;
                      left:2px;
                      box-shadow:0 1px 3px rgba(15,23,42,0.20);
                      transition:left 140ms ease;
                    "
                  ></div>
                </div>
              </button>
            </span>
          </label>

          <div
            id="paAssistCheckStatusMsg"
            class="sub"
            style="
              display:none;
              margin:10px 0 0 0;
              font-size:12px;
              color:#166534;
              background:#ECFDF5;
              border:1px solid #BBF7D0;
              border-radius:8px;
              padding:8px 9px;
              line-height:1.45;
              font-weight:600;
            "
          >
            Runs only when you are on the schedule page.
          </div>

          <div id="paAssistCheckError" class="error-msg" style="display:none;">
            Please register or login first.
          </div>
        </div>



        <div style="margin-top:14px;">
          <label style="margin:0;">
            <span style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
              
              <span style="font-size:13px; font-weight:500; color:#334155;">
                Refresh every
              </span>

              <span style="display:flex; align-items:center; gap:6px;">
                <input
                  id="paIntervalSeconds"
                  type="number"
                  min="1"
                  step="1"
                  inputmode="numeric"
                  style="
                    width:64px;
                    height:28px;
                    text-align:center;
                    padding:2px 4px;
                  "
                />

                <select
                  id="paIntervalUnit"
                  style="
                    width:86px;
                    height:28px;
                    padding:0 4px;
                    font-size:12px;
                    line-height:1;
                    box-sizing:border-box;
                  "
                >
                  <option value="minutes">minutes</option>
                  <option value="seconds">seconds</option>
                </select>
              </span>

            </span>
          </label>

          <div id="paIntervalHint" style="display:none; font-size:11px; color:#475569; margin-top:4px;">
            Minimum 5 seconds.
          </div>

          <div
            id="paIntervalWarning"
            style="
              font-size:11px;
              color:#92400E;
              background:#FFFBEB;
              border:1px solid #FDE68A;
              border-radius:8px;
              padding:8px 9px;
              margin-top:6px;
              line-height:1.45;
              font-weight:500;
            "
          >
            Checking too often may trigger <strong>1015 Rate Limit</strong> errors. Recommended for most users: 2\u20135 minutes.
          </div>
        </div>

        <div
          style="
            margin-top:18px;
            padding-top:16px;
            border-top:1px solid #CBD5E1;
          "
        >
          <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px;">
            <span>
              <span style="display:flex; align-items:center; gap:6px;">
                <span style="font-size:13px; font-weight:700; color:#0F172A;">
                  Release Window Checks
                </span>
                <span
                  style="
                    border-radius:999px;
                    background:#DBEAFE;
                    color:#1D4ED8;
                    padding:2px 6px;
                    font-size:9px;
                    font-weight:800;
                    text-transform:uppercase;
                  "
                >
                  Premium
                </span>
              </span>


            </span>

            <button
              id="paTurboTimingToggle"
              type="button"
              aria-pressed="false"
              style="
                border:none;
                background:none;
                padding:0;
                cursor:pointer;
                line-height:0;
                flex-shrink:0;
              "
            >
              <div
                id="paTurboTimingTrack"
                style="
                  width:38px;
                  height:20px;
                  border-radius:999px;
                  background:#CBD5E1;
                  position:relative;
                  transition:background 140ms ease;
                "
              >
                <div
                  id="paTurboTimingKnob"
                  style="
                    width:16px;
                    height:16px;
                    border-radius:999px;
                    background:#FFFFFF;
                    position:absolute;
                    top:2px;
                    left:2px;
                    box-shadow:0 1px 3px rgba(15,23,42,0.20);
                    transition:left 140ms ease;
                  "
                ></div>
              </div>
            </button>
          </div>

          <div
            id="paTurboTimingNeedsAutoCheck"
            style="
              display:none;
              margin-top:7px;
              font-size:11px;
              color:#92400E;
              line-height:1.4;
            "
          >
            Turn on Auto check to use Release Window Checks.
          </div>



          <div
            style="
              margin-top:12px;
              padding:9px 10px;
              border:1px solid #BFDBFE;
              border-radius:8px;
              background:#EFF6FF;
              color:#1E3A8A;
              font-size:12px;
              font-weight:700;
              line-height:1.45;
            "
          >
            Slots tend to be released around the :00 and :30 minutes, plus or
            minus 5 minutes. During these times, the extension can help check
            more often.
          </div>

          <div
            id="paTurboTimingControls"
            style="
              margin-top:12px;
              padding:10px;
              border:1px solid #CBD5E1;
              border-radius:8px;
              background:#F8FAFC;
            "
          >
            <!--
            [AUDIT]
            Goal:
            - Render one required Release Window row plus up to three optional rows.
            Reason:
            - Window two is now optional while preserving the existing first window
              as the required Release Window.
            Invariant:
            - Window one is always visible.
            - Windows two, three, and four remain hidden until added/configured.
            - Optional windows are exposed contiguously in two, three, four order.
            - All duration selectors are limited to 1-6 minutes.
            Handles:
            - One, two, three, or four configured release windows.
            - Add/remove controls for optional windows.
            Does NOT handle:
            - Persistence, overlap validation, or timer execution.
            Failure mode if wrong:
            - Optional rows may display incorrectly or expose values outside the
              storage/runtime contract.
            -->
            <div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="width:58px; font-size:12px; font-weight:600; color:#334155;">Start</span>
                <select id="paTurboTimingWindowOneStart" style="width:66px; height:28px; padding:0 4px; font-size:12px; box-sizing:border-box;">
                  ${Array.from({length:60}).map((t,i)=>`<option value="${i}">:${String(i).padStart(2,"0")}</option>`).join("")}
                </select>
                <span style="font-size:11px; color:#64748B;">Duration</span>
                <select id="paTurboTimingWindowOneDuration" style="width:82px; height:28px; padding:0 4px; font-size:12px; box-sizing:border-box;">
                  ${Array.from({length:6}).map((t,i)=>`<option value="${i+1}">${i+1} min</option>`).join("")}
                </select>
              </div>
              <div id="paTurboTimingWindowOneRange" style="margin:5px 0 0 66px; font-size:10px; color:#475569; line-height:1.35;"></div>
            </div>

            <!--
            [AUDIT]
            Goal:
            - Render Window 2 as the first optional Release Window row.
            Reason:
            - Release Window Checks now require only Window 1.
            Invariant:
            - The row is hidden when Window 2 is absent and uses blank required
              selections when newly added.
            Handles:
            - Adding, editing, and removing Window 2.
            Does NOT handle:
            - Persistence or overlap validation.
            Failure mode if wrong:
            - Window 2 may appear active when absent or fail to participate in
              the sequential add/remove flow.
            -->
            <div id="paTurboTimingWindowTwoWrap" style="display:none; margin-top:10px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="width:58px; font-size:12px; font-weight:600; color:#334155;">Start</span>
                <select id="paTurboTimingWindowTwoStart" style="width:66px; height:28px; padding:0 4px; font-size:12px; box-sizing:border-box;">
                  <option value="">Select</option>
                  ${Array.from({length:60}).map((t,i)=>`<option value="${i}">:${String(i).padStart(2,"0")}</option>`).join("")}
                </select>
                <span style="font-size:11px; color:#64748B;">Duration</span>
                <select id="paTurboTimingWindowTwoDuration" style="width:82px; height:28px; padding:0 4px; font-size:12px; box-sizing:border-box;">
                  <option value="">Select</option>
                  ${Array.from({length:6}).map((t,i)=>`<option value="${i+1}">${i+1} min</option>`).join("")}
                </select>
                <button id="paTurboTimingWindowTwoRemove" type="button" aria-label="Remove interval" title="Remove interval" style="width:20px; height:28px; border:none; background:none; padding:0; color:#B91C1C; cursor:pointer; display:flex; align-items:center; justify-content:center;">
                  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M8 6V4h8v2"></path>
                    <path d="M19 6l-1 14H6L5 6"></path>
                    <path d="M10 11v5"></path>
                    <path d="M14 11v5"></path>
                  </svg>
                </button>
              </div>
              <div id="paTurboTimingWindowTwoRange" style="margin:5px 0 0 66px; font-size:10px; color:#475569; line-height:1.35;"></div>
            </div>

            <div id="paTurboTimingWindowThreeWrap" style="display:none; margin-top:10px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="width:58px; font-size:12px; font-weight:600; color:#334155;">Start</span>
                <select id="paTurboTimingWindowThreeStart" style="width:66px; height:28px; padding:0 4px; font-size:12px; box-sizing:border-box;">
                  <option value="">Select</option>
                  ${Array.from({length:60}).map((t,i)=>`<option value="${i}">:${String(i).padStart(2,"0")}</option>`).join("")}
                </select>
                <span style="font-size:11px; color:#64748B;">Duration</span>
                <select id="paTurboTimingWindowThreeDuration" style="width:82px; height:28px; padding:0 4px; font-size:12px; box-sizing:border-box;">
                  <option value="">Select</option>
                  ${Array.from({length:6}).map((t,i)=>`<option value="${i+1}">${i+1} min</option>`).join("")}
                </select>
                <!--
                [AUDIT]
                Goal:
                - Replace the Window 3 text remove control with a compact trash icon.
                Reason:
                - The word "Remove" widens the row and pushes the selectors out of alignment with Windows 1 and 2.
                Invariant:
                - #paTurboTimingWindowThreeRemove remains the existing removal control and selector.
                Handles:
                - Compact visual removal affordance for Window 3.
                Does NOT handle:
                - Removal behavior or persistence.
                Failure mode if wrong:
                - Window 3 may lose its existing remove binding or remain visually misaligned.
                -->
                <button id="paTurboTimingWindowThreeRemove" type="button" aria-label="Remove interval" title="Remove interval" style="width:20px; height:28px; border:none; background:none; padding:0; color:#B91C1C; cursor:pointer; display:flex; align-items:center; justify-content:center;">
                  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M8 6V4h8v2"></path>
                    <path d="M19 6l-1 14H6L5 6"></path>
                    <path d="M10 11v5"></path>
                    <path d="M14 11v5"></path>
                  </svg>
                </button>
              </div>
              <div id="paTurboTimingWindowThreeRange" style="margin:5px 0 0 66px; font-size:10px; color:#475569; line-height:1.35;"></div>
            </div>

            <div id="paTurboTimingWindowFourWrap" style="display:none; margin-top:10px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="width:58px; font-size:12px; font-weight:600; color:#334155;">Start</span>
                <select id="paTurboTimingWindowFourStart" style="width:66px; height:28px; padding:0 4px; font-size:12px; box-sizing:border-box;">
                  <option value="">Select</option>
                  ${Array.from({length:60}).map((t,i)=>`<option value="${i}">:${String(i).padStart(2,"0")}</option>`).join("")}
                </select>
                <span style="font-size:11px; color:#64748B;">Duration</span>
                <select id="paTurboTimingWindowFourDuration" style="width:82px; height:28px; padding:0 4px; font-size:12px; box-sizing:border-box;">
                  <option value="">Select</option>
                  ${Array.from({length:6}).map((t,i)=>`<option value="${i+1}">${i+1} min</option>`).join("")}
                </select>
                <!--
                [AUDIT]
                Goal:
                - Replace the Window 4 text remove control with a compact trash icon.
                Reason:
                - The word "Remove" widens the row and pushes the selectors out of alignment with Windows 1 and 2.
                Invariant:
                - #paTurboTimingWindowFourRemove remains the existing removal control and selector.
                Handles:
                - Compact visual removal affordance for Window 4.
                Does NOT handle:
                - Removal behavior or persistence.
                Failure mode if wrong:
                - Window 4 may lose its existing remove binding or remain visually misaligned.
                -->
                <button id="paTurboTimingWindowFourRemove" type="button" aria-label="Remove interval" title="Remove interval" style="width:20px; height:28px; border:none; background:none; padding:0; color:#B91C1C; cursor:pointer; display:flex; align-items:center; justify-content:center;">
                  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M8 6V4h8v2"></path>
                    <path d="M19 6l-1 14H6L5 6"></path>
                    <path d="M10 11v5"></path>
                    <path d="M14 11v5"></path>
                  </svg>
                </button>
              </div>
              <div id="paTurboTimingWindowFourRange" style="margin:5px 0 0 66px; font-size:10px; color:#475569; line-height:1.35;"></div>
            </div>

            <button
              id="paTurboTimingAddWindow"
              type="button"
              style="margin-top:10px; border:none; background:none; padding:0; font-size:11px; font-weight:700; color:#1D4ED8; cursor:pointer;"
            >
              + Add new interval
            </button>

            <div
              style="
                margin-top:14px;
                padding-top:12px;
                border-top:1px solid #CBD5E1;
              "
            >
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="width:58px; font-size:12px; font-weight:600; color:#334155;">
                  Check
                </span>

                <span style="font-size:11px; color:#64748B;">
                  every
                </span>

                <select
                  id="paTurboTimingIntervalSeconds"
                  style="
                    width:104px;
                    height:28px;
                    padding:0 4px;
                    font-size:12px;
                    box-sizing:border-box;
                  "
                >
                  ${[3,4,5,6,7,8,9,10,11,12,13,14,15].map(t=>`<option value="${t}">${t} seconds</option>`).join("")}
                </select>
              </div>
            </div>

            <div
              id="paTurboTimingError"
              class="error-msg"
              style="display:none; margin-top:8px;"
            ></div>
          </div>
        </div>

        <div
          style="
            margin-top:18px;
            padding-top:16px;
            border-top:1px solid #CBD5E1;
          "
        >
          <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px;">
            <span style="min-width:0;">
              <span style="display:flex; align-items:center; gap:6px;">
                <span style="font-size:13px; font-weight:700; color:#0F172A;">
                  Auto-check Community Alerts
                </span>

                <span
                  style="
                    border-radius:999px;
                    background:#DBEAFE;
                    color:#1D4ED8;
                    padding:2px 6px;
                    font-size:9px;
                    font-weight:800;
                    text-transform:uppercase;
                  "
                >
                  Premium
                </span>
              </span>

              <span
                style="
                  display:block;
                  margin-top:4px;
                  color:#64748B;
                  font-size:11px;
                  font-weight:500;
                  line-height:1.4;
                "
              >
                Automatically checks the alerted embassy when a real-time Community Alert arrives. Repeats for the same embassy are limited to once every 60 seconds.
              </span>
            </span>

            <button
              id="paAutoCheckCommunityAlertsToggle"
              type="button"
              aria-pressed="false"
              style="
                border:none;
                background:none;
                padding:0;
                cursor:pointer;
                line-height:0;
                flex-shrink:0;
              "
            >
              <div
                id="paAutoCheckCommunityAlertsTrack"
                style="
                  width:38px;
                  height:20px;
                  border-radius:999px;
                  background:#CBD5E1;
                  position:relative;
                  transition:background 140ms ease;
                "
              >
                <div
                  id="paAutoCheckCommunityAlertsKnob"
                  style="
                    width:16px;
                    height:16px;
                    border-radius:999px;
                    background:#FFFFFF;
                    position:absolute;
                    top:2px;
                    left:2px;
                    box-shadow:0 1px 3px rgba(15,23,42,0.20);
                    transition:left 140ms ease;
                  "
                ></div>
              </div>
            </button>
          </div>
        </div>



        <div style="margin-top:18px;">
          <label style="margin:0;">
            <span style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px;">
              <span>
                <span
                  style="
                    display:flex;
                    align-items:center;
                    gap:6px;
                    min-height:20px;
                  "
                >
                  <span style="font-size:13px; font-weight:500; color:#334155; line-height:20px;">
                    Auto-click submit to book
                  </span>

                  <span
                    style="
                      border-radius:999px;
                      background:#DBEAFE;
                      color:#1D4ED8;
                      padding:2px 6px;
                      font-size:9px;
                      line-height:1.2;
                      font-weight:800;
                      text-transform:uppercase;
                    "
                  >
                    Premium
                  </span>
                </span>

                <span style="display:block; font-size:11px; color:#64748B; font-weight:500; margin-top:3px;">
                  If a date in your selected range is found, the extension can select an available time and click the final Submit button for you.
                </span>
              </span>

              <button
                id="paAssistBookToggle"
                type="button"
                aria-pressed="false"
                style="
                  border:none;
                  background:none;
                  padding:0;
                  cursor:pointer;
                  line-height:0;
                  margin-top:0;
                  flex-shrink:0;
                "
              >
                <div
                  id="paAssistBookTrack"
                  style="
                    width:38px;
                    height:20px;
                    border-radius:999px;
                    background:#CBD5E1;
                    position:relative;
                    transition:background 140ms ease;
                  "
                >
                  <div
                    id="paAssistBookKnob"
                    style="
                      width:16px;
                      height:16px;
                      border-radius:999px;
                      background:#FFFFFF;
                      position:absolute;
                      top:2px;
                      left:2px;
                      box-shadow:0 1px 3px rgba(15,23,42,0.20);
                      transition:left 140ms ease;
                    "
                  ></div>
                </div>
              </button>
            </span>
          </label>
        </div>

        <div style="margin-top:10px; margin-left:16px;">
          <label style="margin:0;">
            <span style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px;">
              <span>
                <span style="display:block; font-size:12px; font-weight:500; color:#334155; line-height:18px;">
                  Select ANY date in range
                </span>
                <span style="display:block; font-size:11px; color:#64748B; font-weight:500; margin-top:2px; line-height:1.35;">
                  Default will try to book within the 3 earliest available dates. To increase your chances of successfully booking, Auto-click can try to select ANY date within your range.
                </span>
              </span>

              <button
                id="paAssistBookAnyDateInRangeToggle"
                type="button"
                aria-pressed="false"
                style="
                  border:none;
                  background:none;
                  padding:0;
                  cursor:pointer;
                  line-height:0;
                  margin-top:0;
                  flex-shrink:0;
                "
              >
                <div
                  id="paAssistBookAnyDateInRangeTrack"
                  style="
                    width:38px;
                    height:20px;
                    border-radius:999px;
                    background:#CBD5E1;
                    position:relative;
                    transition:background 140ms ease;
                  "
                >
                  <div
                    id="paAssistBookAnyDateInRangeKnob"
                    style="
                      width:16px;
                      height:16px;
                      border-radius:999px;
                      background:#FFFFFF;
                      position:absolute;
                      top:2px;
                      left:2px;
                      box-shadow:0 1px 3px rgba(15,23,42,0.20);
                      transition:left 140ms ease;
                    "
                  ></div>
                </div>
              </button>
            </span>
          </label>
        </div>

        <div id="paAssistBookTierMsg" class="sub" style="display:none; margin-top:8px; font-size:12px; color:#475569;"></div>

        <div
          id="paAssistBookNeedsCheckMsg"
          class="sub"
          style="
            display:none;
            margin-top:8px;
            font-size:12px;
            color:#92400E;
            background:#FFFBEB;
            border:1px solid #FDE68A;
            border-radius:8px;
            padding:8px 9px;
            line-height:1.45;
            font-weight:600;
          "
        >
          Turn on Auto check before enabling auto-click submit.
        </div>

        </div>

      </div>




      <div
        id="paModalScrim"
        style="
          display:none;
          position:fixed;
          inset:0;
          background:rgba(15,23,42,0.42);
          z-index:3000;
          align-items:center;
          justify-content:center;
          padding:16px;
        "
      >
        <div
          id="paModalCard"
          style="
            position:relative;
            width:100%;
            max-width:380px;
            background:#FFFFFF;
            color:#202124;
            border:1px solid #DADCE0;
            border-radius:14px;
            padding:20px;
            box-sizing:border-box;
            box-shadow:0 14px 34px rgba(0,0,0,0.28);
          "
        >
          <button
            id="paModalCloseBtn"
            type="button"
            style="
              display:none;
              position:absolute;
              top:10px;
              right:10px;
              width:28px;
              height:28px;
              border:none;
              background:none;
              color:#64748B;
              font-size:18px;
              font-weight:800;
              line-height:1;
              cursor:pointer;
              padding:0;
            "
            aria-label="Close"
          >\xD7</button>

          <div
            id="paModalTitle"
            style="
              font-size:18px;
              font-weight:700;
              color:#202124;
              text-align:left;
              margin-bottom:10px;
            "
          ></div>

          <div
            id="paModalBody"
            style="
              font-size:13px;
              line-height:1.45;
              color:#3C4043;
              text-align:left;
              white-space:normal;
              margin-bottom:0;
            "
          ></div>

          <div
            id="paModalTip"
            style="
              display:none;
              background:#F1F5F9;
              border-radius:10px;
              padding:12px;
              margin-top:16px;
              margin-bottom:0;
            "
          >
            <div
              id="paModalTipText"
              style="
                font-size:12px;
                line-height:1.5;
                color:#0F172A;
                text-align:center;
                font-weight:700;
              "
            ></div>
          </div>

          <label
            id="paModalSkipWrap"
            style="
              display:none;
              align-items:center;
              gap:8px;
              margin-top:14px;
              font-size:13px;
              color:#3C4043;
              cursor:pointer;
            "
          >
            <input
              id="paModalSkipCheck"
              type="checkbox"
              style="width:auto; margin:0;"
            />
            <span>Don't show this again</span>
          </label>

          <div
            id="paModalActions"
            style="
              display:flex;
              justify-content:flex-end;
              gap:10px;
              margin-top:18px;
            "
          >
            <button
              id="paModalCancelBtn"
              type="button"
              style="
                min-width:82px;
                height:36px;
                border-radius:18px;
                background:#FFFFFF;
                color:#1A73E8;
                border:1px solid #DADCE0;
                font-size:14px;
                font-weight:600;
                cursor:pointer;
                padding:0 16px;
              "
            ></button>

            <button
              id="paModalConfirmBtn"
              type="button"
              style="
                min-width:82px;
                height:36px;
                border-radius:18px;
                background:#1A73E8;
                color:#FFFFFF;
                border:1px solid #1A73E8;
                font-size:14px;
                font-weight:600;
                cursor:pointer;
                padding:0 16px;
              "
            ></button>
          </div>

          <button
            id="paModalLinkBtn"
            type="button"
            style="
              display:none;
              width:100%;
              margin-top:10px;
              border:none;
              background:none;
              color:#2563EB;
              font-size:13px;
              font-weight:800;
              cursor:pointer;
              padding:6px 0 0;
              text-decoration:underline;
            "
          ></button>
        </div>
      </div>
    `}function ct(){return{mount:document.getElementById(m),dateError:document.getElementById("paDateError"),consularRangeWeeks:document.getElementById("paConsularRangeWeeks"),minDaysNotice:document.getElementById("paMinDaysNotice"),manualCheckReminderToggle:document.getElementById("paManualCheckReminderToggle"),manualCheckReminderScheduleInterval:document.getElementById("paManualCheckReminderScheduleInterval"),manualCheckReminderScheduleMinuteMarks:document.getElementById("paManualCheckReminderScheduleMinuteMarks"),manualCheckReminderFreeMinuteInfo:document.getElementById("paManualCheckReminderFreeMinuteInfo"),manualCheckReminderMinuteMarkControls:document.getElementById("paManualCheckReminderMinuteMarkControls"),manualCheckReminderMinuteMarkSelects:Array.from(document.querySelectorAll("[data-pa-manual-reminder-minute-index]")),manualCheckReminderSeePlansBtn:document.getElementById("paManualCheckReminderSeePlansBtn"),manualCheckReminderMinutes:document.getElementById("paManualCheckReminderMinutes"),manualCheckReminderTestBtn:document.getElementById("paManualCheckReminderTestBtn"),manualCheckReminderTtsToggle:document.getElementById("paManualCheckReminderTtsToggle"),manualCheckReminderTtsTestBtn:document.getElementById("paManualCheckReminderTtsTestBtn"),manualCheckReminderTtsMessage:document.getElementById("paManualCheckReminderTtsMessage"),startInput:document.getElementById("paStartInput"),endInput:document.getElementById("paEndInput"),startBoxInner:document.getElementById("paStartBoxInner"),endBoxInner:document.getElementById("paEndBoxInner"),endBoxValue:document.getElementById("paEndBoxValue"),intervalSeconds:document.getElementById("paIntervalSeconds"),intervalUnit:document.getElementById("paIntervalUnit"),intervalHint:document.getElementById("paIntervalHint"),intervalWarning:document.getElementById("paIntervalWarning"),autoOpenRecoveryWindowToggle:document.getElementById("paAutoOpenRecoveryWindowToggle"),audioAlertToggle:document.getElementById("paAudioAlertToggle"),desktopAlertsToggle:document.getElementById("paDesktopAlertsToggle"),playTestDesktopAlertBtn:document.getElementById("paPlayTestDesktopAlertBtn"),audioUpdatesToggle:document.getElementById("paAudioUpdatesToggle"),playTestVoiceBtn:document.getElementById("paPlayTestVoiceBtn"),playTestSoundBtn:document.getElementById("paPlayTestSoundBtn"),playTestDateFoundBtn:document.getElementById("paPlayTestDateFoundBtn"),playTestQueueClearBtn:document.getElementById("paPlayTestQueueClearBtn"),playTestCloudflareClearBtn:document.getElementById("paPlayTestCloudflareClearBtn"),offPageAlertToggle:document.getElementById("paOffPageAlertToggle"),loginPageLoadAudioToggle:document.getElementById("paLoginPageLoadAudioToggle"),loginAssistInfo:document.getElementById("paLoginAssistInfo"),loginAssistControls:document.getElementById("paLoginAssistControls"),loginAutoFillCredentialsToggle:document.getElementById("paLoginAutoFillCredentialsToggle"),loginAutoClickSubmitToggle:document.getElementById("paLoginAutoClickSubmitToggle"),loginAutoFillKbaToggle:document.getElementById("paLoginAutoFillKbaToggle"),loginAutoClickKbaContinueToggle:document.getElementById("paLoginAutoClickKbaContinueToggle"),loginActivityFeedToggle:document.getElementById("paLoginActivityFeedToggle"),queueWaitOverlayToggle:document.getElementById("paQueueWaitOverlayToggle"),queueStatusAlertMinutes:document.getElementById("paQueueStatusAlertMinutes"),queueClearAlertToggle:document.getElementById("paQueueClearAlertToggle"),cloudflareClearAlertToggle:document.getElementById("paCloudflareClearAlertToggle"),cloudflareWarningTtsMessage:document.getElementById("paCloudflareWarningTtsMessage"),autoSelectEmbassyToggle:document.getElementById("paAutoSelectEmbassyToggle"),autoJumpFirstDateToggle:document.getElementById("paAutoJumpFirstDateToggle"),speakDateFoundToggle:document.getElementById("paSpeakDateFoundToggle"),slotAlertTtsMessage:document.getElementById("paSlotAlertTtsMessage"),slotAlertTtsMessageWrap:document.getElementById("paSlotAlertTtsMessageWrap"),assistCheckToggle:document.getElementById("paAssistCheckToggle"),assistCheckTrack:document.getElementById("paAssistCheckTrack"),assistCheckKnob:document.getElementById("paAssistCheckKnob"),assistCheckStatusMsg:document.getElementById("paAssistCheckStatusMsg"),assistCheckError:document.getElementById("paAssistCheckError"),turboTimingToggle:document.getElementById("paTurboTimingToggle"),turboTimingTrack:document.getElementById("paTurboTimingTrack"),turboTimingKnob:document.getElementById("paTurboTimingKnob"),turboTimingControls:document.getElementById("paTurboTimingControls"),turboTimingNeedsAutoCheck:document.getElementById("paTurboTimingNeedsAutoCheck"),turboTimingIntervalSeconds:document.getElementById("paTurboTimingIntervalSeconds"),turboTimingWindowOneStart:document.getElementById("paTurboTimingWindowOneStart"),turboTimingWindowOneDuration:document.getElementById("paTurboTimingWindowOneDuration"),turboTimingWindowOneRange:document.getElementById("paTurboTimingWindowOneRange"),turboTimingWindowTwoWrap:document.getElementById("paTurboTimingWindowTwoWrap"),turboTimingWindowTwoStart:document.getElementById("paTurboTimingWindowTwoStart"),turboTimingWindowTwoDuration:document.getElementById("paTurboTimingWindowTwoDuration"),turboTimingWindowTwoRange:document.getElementById("paTurboTimingWindowTwoRange"),turboTimingWindowTwoRemove:document.getElementById("paTurboTimingWindowTwoRemove"),turboTimingWindowThreeWrap:document.getElementById("paTurboTimingWindowThreeWrap"),turboTimingWindowThreeStart:document.getElementById("paTurboTimingWindowThreeStart"),turboTimingWindowThreeDuration:document.getElementById("paTurboTimingWindowThreeDuration"),turboTimingWindowThreeRange:document.getElementById("paTurboTimingWindowThreeRange"),turboTimingWindowThreeRemove:document.getElementById("paTurboTimingWindowThreeRemove"),turboTimingWindowFourWrap:document.getElementById("paTurboTimingWindowFourWrap"),turboTimingWindowFourStart:document.getElementById("paTurboTimingWindowFourStart"),turboTimingWindowFourDuration:document.getElementById("paTurboTimingWindowFourDuration"),turboTimingWindowFourRange:document.getElementById("paTurboTimingWindowFourRange"),turboTimingWindowFourRemove:document.getElementById("paTurboTimingWindowFourRemove"),turboTimingAddWindow:document.getElementById("paTurboTimingAddWindow"),turboTimingError:document.getElementById("paTurboTimingError"),autoCheckCommunityAlertsToggle:document.getElementById("paAutoCheckCommunityAlertsToggle"),autoCheckCommunityAlertsTrack:document.getElementById("paAutoCheckCommunityAlertsTrack"),autoCheckCommunityAlertsKnob:document.getElementById("paAutoCheckCommunityAlertsKnob"),assistBookToggle:document.getElementById("paAssistBookToggle"),assistBookTrack:document.getElementById("paAssistBookTrack"),assistBookKnob:document.getElementById("paAssistBookKnob"),assistBookAnyDateInRangeToggle:document.getElementById("paAssistBookAnyDateInRangeToggle"),assistBookAnyDateInRangeTrack:document.getElementById("paAssistBookAnyDateInRangeTrack"),assistBookAnyDateInRangeKnob:document.getElementById("paAssistBookAnyDateInRangeKnob"),assistBookTierMsg:document.getElementById("paAssistBookTierMsg"),assistBookNeedsCheckMsg:document.getElementById("paAssistBookNeedsCheckMsg"),sessionKeepaliveToggle:document.getElementById("paSessionKeepaliveToggle"),homeRefreshMinutes:document.getElementById("paHomeRefreshMinutes"),modalScrim:document.getElementById("paModalScrim"),modalTitle:document.getElementById("paModalTitle"),modalBody:document.getElementById("paModalBody"),modalTip:document.getElementById("paModalTip"),modalTipText:document.getElementById("paModalTipText"),modalSkipWrap:document.getElementById("paModalSkipWrap"),modalSkipCheck:document.getElementById("paModalSkipCheck"),modalActions:document.getElementById("paModalActions"),modalConfirmBtn:document.getElementById("paModalConfirmBtn"),modalLinkBtn:document.getElementById("paModalLinkBtn"),modalCancelBtn:document.getElementById("paModalCancelBtn"),modalCloseBtn:document.getElementById("paModalCloseBtn")}}function et(o,e,t,i,g){!o||!e||!t||(o.setAttribute("aria-pressed",i?"true":"false"),o.disabled=!!g,o.style.opacity="1",o.style.cursor=g?"default":"pointer",e.style.background=i?fe:Z,t.style.left=i?H:se)}function Pe(o){var ot;let e=r(o),t=String(e.tier||((ot=o==null?void 0:o.globalSettings)==null?void 0:ot.tier)||"free"),i=W(t),g=a(t),E=Math.max(s(e.assistCheckIntervalSeconds||120),g),n=ct();if(!n.intervalSeconds)return;let N=!!e.assistCheckEnabled,M=o.profiles[o.activeProfileId],K=M.consularRangeWeeks,ne=['<option value="">Full date range</option>'];for(let ke=1;ke<=12;ke+=1)ne.push(`<option value="${ke}">${ke} ${ke===1?"week":"weeks"}</option>`);n.consularRangeWeeks.innerHTML=ne.join(""),K===null?n.consularRangeWeeks.value="":n.consularRangeWeeks.value=String(K);let ge=document.getElementById("paConsularBookedStatus"),Ee=document.getElementById("paConsularBookedStatusTitle"),ce=document.getElementById("paConsularBookedStatusRange"),Ae=typeof M.ofcBookedDateIso=="string"?M.ofcBookedDateIso.trim():"",Y=typeof M.desiredSlotStartDate=="string"?M.desiredSlotStartDate.trim():"",Ie=typeof M.desiredSlotEndDate=="string"?M.desiredSlotEndDate.trim():"";if(/^\d{4}-\d{2}-\d{2}$/.test(Ae)&&/^\d{4}-\d{2}-\d{2}$/.test(Y)&&/^\d{4}-\d{2}-\d{2}$/.test(Ie)){let ke=Ie;if(Number.isInteger(K)&&K>=1&&K<=12){let[Ye,Re,Qe]=Ae.split("-").map(Number),$e=new Date(Ye,Re-1,Qe);$e.setDate($e.getDate()+K*7);let wt=[$e.getFullYear(),String($e.getMonth()+1).padStart(2,"0"),String($e.getDate()).padStart(2,"0")].join("-");ke=wt<Ie?wt:Ie}let Ge=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],X=Ae.split("-").map(Number),de=ke.split("-").map(Number),xe=`${Ge[X[1]-1]} ${X[2]}`,Ve=xe,tt=`${Ge[de[1]-1]} ${de[2]}`;Ee.textContent=`OFC booked ${xe}`,ce.textContent=`Consular range: ${Ve} \u2192 ${tt}`,ge.style.display="block"}else ge.style.display="none",Ee.textContent="",ce.textContent="";let Le=!!e.assistBookEnabled&&i&&N,le=Number(e.minimumDaysNotice??0);n.minDaysNotice&&(n.minDaysNotice.value=String(Number.isFinite(le)?le:0));let be=I(E);n.intervalSeconds.value=String(be.value),n.intervalUnit&&(n.intervalUnit.value=be.unit),n.intervalWarning&&(n.intervalWarning.innerHTML=re(be.unit)),n.autoOpenRecoveryWindowToggle&&(n.autoOpenRecoveryWindowToggle.checked=t!=="free"&&!!e.autoOpenRecoveryWindowEnabled),n.audioAlertToggle.checked=e.audioAlertEnabled!==!1,n.desktopAlertsToggle&&(n.desktopAlertsToggle.checked=!!e.desktopAlertsEnabled),n.manualCheckReminderToggle&&(n.manualCheckReminderToggle.checked=!!e.manualCheckReminderEnabled);let Oe=t!=="free",Je=Q(e.manualCheckReminderScheduleType),p=Oe?Je:c,B=L(e.manualCheckReminderMinuteMarks);n.manualCheckReminderScheduleInterval&&(n.manualCheckReminderScheduleInterval.checked=p===c),n.manualCheckReminderScheduleMinuteMarks&&(n.manualCheckReminderScheduleMinuteMarks.checked=p===A),n.manualCheckReminderFreeMinuteInfo&&(n.manualCheckReminderFreeMinuteInfo.style.display=Oe?"none":"block"),n.manualCheckReminderMinuteMarkControls&&(n.manualCheckReminderMinuteMarkControls.style.display="block",n.manualCheckReminderMinuteMarkControls.style.opacity=Oe&&p===A?"1":"0.65"),n.manualCheckReminderMinuteMarkSelects.forEach((ke,Ge)=>{ke.value=B[Ge]==null?"":String(B[Ge]),ke.disabled=!Oe||p!==A}),n.manualCheckReminderMinutes&&(n.manualCheckReminderMinutes.value=String(z(e.manualCheckReminderMinutes))),n.manualCheckReminderTtsToggle.checked=!!e.manualCheckReminderTtsEnabled,n.manualCheckReminderTtsMessage.value=e.manualCheckReminderTtsMessage,n.audioUpdatesToggle.checked=e.audioUpdatesEnabled!==!1,n.offPageAlertToggle&&(n.offPageAlertToggle.checked=!!e.alertIfNotOnSchedule),n.sessionKeepaliveToggle&&(n.sessionKeepaliveToggle.checked=!!e.sessionKeepaliveEnabled),n.homeRefreshMinutes.value=String(ye(e.homeRefreshMinutes)),n.queueWaitOverlayToggle.checked=!!e.queueWaitOverlayEnabled,n.queueStatusAlertMinutes.value=String(oe(e.queueStatusAlertMinutes)),n.queueClearAlertToggle.checked=!!e.queueClearAlertEnabled,n.cloudflareClearAlertToggle.checked=!!e.cloudflareClearAlertEnabled,n.cloudflareWarningTtsMessage.value=String(e.cloudflareWarningTtsMessage||"");let V=v(o);n.loginPageLoadAudioToggle.checked=e.loginPageLoadAudioEnabled===!0,n.loginPageLoadAudioToggle.disabled=!1,n.loginAssistInfo&&(n.loginAssistInfo.style.display=V?"none":"block"),n.loginAssistControls&&(n.loginAssistControls.style.opacity=V?"1":"0.55"),n.loginAutoFillCredentialsToggle&&(n.loginAutoFillCredentialsToggle.checked=!!e.loginAutoFillCredentialsEnabled,n.loginAutoFillCredentialsToggle.disabled=!V),n.loginAutoClickSubmitToggle&&(n.loginAutoClickSubmitToggle.checked=!!e.loginAutoClickSubmitEnabled,n.loginAutoClickSubmitToggle.disabled=!V),n.loginAutoFillKbaToggle&&(n.loginAutoFillKbaToggle.checked=!!e.loginAutoFillKbaEnabled,n.loginAutoFillKbaToggle.disabled=!V),n.loginAutoClickKbaContinueToggle&&(n.loginAutoClickKbaContinueToggle.checked=!!e.loginAutoClickKbaContinueEnabled,n.loginAutoClickKbaContinueToggle.disabled=!V),n.loginActivityFeedToggle&&(n.loginActivityFeedToggle.checked=e.loginActivityFeedEnabled!==!1,n.loginActivityFeedToggle.disabled=!1),n.autoSelectEmbassyToggle.checked=!!e.autoSelectEmbassyEnabled,n.autoJumpFirstDateToggle.checked=!!e.autoJumpFirstDateEnabled,n.speakDateFoundToggle.checked=!!e.speakDateFoundEnabled,n.slotAlertTtsMessage.value=String(e.slotAlertTtsMessage||""),et(n.assistCheckToggle,n.assistCheckTrack,n.assistCheckKnob,N,!1);let te=t!=="free",Me=te&&N,ve=te&&!N,Ke={startMinute:e.releaseWindowOneStartMinute,durationMinutes:e.releaseWindowOneDurationMinutes},Ce=e.releaseWindowTwoStartMinute!==null,Ne=e.releaseWindowThreeStartMinute!==null,ze=e.releaseWindowFourStartMinute!==null;et(n.turboTimingToggle,n.turboTimingTrack,n.turboTimingKnob,e.releaseWindowChecksEnabled===!0&&te,ve),n.turboTimingIntervalSeconds.value=String(e.releaseWindowCheckIntervalSeconds),n.turboTimingWindowOneStart.value=String(e.releaseWindowOneStartMinute),n.turboTimingWindowOneDuration.value=String(e.releaseWindowOneDurationMinutes),n.turboTimingWindowOneRange.textContent=F(Ke),n.turboTimingWindowTwoWrap.style.display=Ce?"block":"none",n.turboTimingWindowTwoStart.value=Ce?String(e.releaseWindowTwoStartMinute):"",n.turboTimingWindowTwoDuration.value=Ce?String(e.releaseWindowTwoDurationMinutes):"",n.turboTimingWindowTwoRange.textContent=Ce?F({startMinute:e.releaseWindowTwoStartMinute,durationMinutes:e.releaseWindowTwoDurationMinutes}):"",n.turboTimingWindowThreeWrap.style.display=Ne?"block":"none",n.turboTimingWindowThreeStart.value=Ne?String(e.releaseWindowThreeStartMinute):"",n.turboTimingWindowThreeDuration.value=Ne?String(e.releaseWindowThreeDurationMinutes):"",n.turboTimingWindowThreeRange.textContent=Ne?F({startMinute:e.releaseWindowThreeStartMinute,durationMinutes:e.releaseWindowThreeDurationMinutes}):"",n.turboTimingWindowFourWrap.style.display=ze?"block":"none",n.turboTimingWindowFourStart.value=ze?String(e.releaseWindowFourStartMinute):"",n.turboTimingWindowFourDuration.value=ze?String(e.releaseWindowFourDurationMinutes):"",n.turboTimingWindowFourRange.textContent=ze?F({startMinute:e.releaseWindowFourStartMinute,durationMinutes:e.releaseWindowFourDurationMinutes}):"",n.turboTimingWindowTwoRemove.style.display=Ne?"none":"flex",n.turboTimingWindowThreeRemove.style.display=ze?"none":"flex",n.turboTimingAddWindow.style.display=ze?"none":"inline-block",[n.turboTimingIntervalSeconds,n.turboTimingWindowOneStart,n.turboTimingWindowOneDuration,n.turboTimingWindowTwoStart,n.turboTimingWindowTwoDuration,n.turboTimingWindowThreeStart,n.turboTimingWindowThreeDuration,n.turboTimingWindowFourStart,n.turboTimingWindowFourDuration,n.turboTimingWindowTwoRemove,n.turboTimingWindowThreeRemove,n.turboTimingWindowFourRemove,n.turboTimingAddWindow].forEach(ke=>{ke.disabled=!Me}),n.turboTimingControls.style.opacity=Me?"1":"0.65",n.turboTimingNeedsAutoCheck.style.display=te&&!N?"block":"none",n.turboTimingError.style.display="none",n.turboTimingError.textContent="";let qe=t!=="free";et(n.autoCheckCommunityAlertsToggle,n.autoCheckCommunityAlertsTrack,n.autoCheckCommunityAlertsKnob,e.autoCheckCommunityAlertsEnabled===!0&&qe,!1),et(n.assistBookToggle,n.assistBookTrack,n.assistBookKnob,Le,!1),et(n.assistBookAnyDateInRangeToggle,n.assistBookAnyDateInRangeTrack,n.assistBookAnyDateInRangeKnob,e.assistBookAnyDateInRangeEnabled===!0,!1),n.intervalSeconds.disabled=!1,n.intervalSeconds.style.opacity="1",n.intervalHint.style.opacity="1",t==="free"?n.intervalHint.textContent="Minimum 10 minutes on Free. Paid plans can go down to 1 minute.":n.intervalHint.textContent="Minimum 1 minute.",i?(et(n.assistBookToggle,n.assistBookTrack,n.assistBookKnob,Le,!1),n.assistBookTierMsg.style.display="none",n.assistBookTierMsg.textContent=""):(et(n.assistBookToggle,n.assistBookTrack,n.assistBookKnob,!1,!1),n.assistBookTierMsg.style.display="none",n.assistBookTierMsg.textContent=""),n.assistCheckStatusMsg&&(n.assistCheckStatusMsg.style.display=N?"block":"none"),n.assistCheckError&&(n.assistCheckError.style.display="none",n.assistCheckError.textContent="Please register or login first."),n.assistBookNeedsCheckMsg&&(n.assistBookNeedsCheckMsg.style.display=Le&&!N?"block":"none")}async function At(o){let e=globalThis.VSADateUtils||{},t=e.initDatePickerWidget,i=e.isoToday;if(typeof t!="function")return;let g=String((o==null?void 0:o.activeProfileId)||"default"),E=(o==null?void 0:o.profiles)||{},n=E[g]||E.default||{},N=typeof i=="function"?i():null,M=N?new Date(`${N}T00:00:00`):null;M&&M.setMonth(M.getMonth()+3);let K=M?[M.getFullYear(),String(M.getMonth()+1).padStart(2,"0"),String(M.getDate()).padStart(2,"0")].join("-"):null,ne=(n==null?void 0:n.desiredSlotStartDate)||N,ge=(n==null?void 0:n.desiredSlotEndDate)||K;!(n!=null&&n.desiredSlotStartDate)&&!(n!=null&&n.desiredSlotEndDate)&&ne&&ge&&await u(ne,ge),t({ids:{startInput:"paStartInput",endInput:"paEndInput",startBoxInner:"paStartBoxInner",endBoxInner:"paEndBoxInner",endBoxValue:"paEndBoxValue",upgradeBanner:"paUpgradeBanner",upgradeBannerMsg:"paUpgradeBannerMsg"},getTier:()=>{var ce;return String(((ce=o==null?void 0:o.globalSettings)==null?void 0:ce.tier)||"free")},getStartIso:()=>ne,getEndIso:()=>ge,onSave:async(ce,Ae)=>{let Y=document.getElementById("paDateError");if(Y&&(Y.style.display="none",Y.textContent="Check dates"),!(await chrome.storage.local.get(["vsa_auth_token"])).vsa_auth_token){Y&&(Y.textContent="Please register or login first.",Y.style.display="block");return}if(ce&&!Ae||!ce&&Ae){Y&&(Y.textContent="Please set both Start and End dates.",Y.style.display="block");return}if(ce&&Ae&&ce>Ae){Y&&(Y.textContent="Start must be before End.",Y.style.display="block");return}if(!await u(ce||null,Ae||null))return;let Le=await d();Le&&(Pe(Le),vt(Le)),gt(),x("Date Updated")}})}async function U(o,e="Updated!"){return await f(o)?(gt(),x(e),!0):!1}function pt(o,e){let t=ct();if(!t.modalScrim)return;let i=o==="clear_stats"?{title:"Clear Stats?",bodyHtml:'<p style="margin:0 0 10px 0;">This clears your local personal check history from this browser.</p><p style="margin:0;">It will not clear your profiles, login, alerts, or server/community data.</p>',tip:"",showTip:!1,showSkip:!1,confirmText:"Clear",cancelText:"Cancel",confirmBg:"#DC2626"}:o==="auto_book"?{title:"Please Read First",bodyHtml:'<p style="margin:0 0 10px 0;">Book Assist was built to save you time. We worked hard to make it reliable.</p><p style="margin:0 0 10px 0;">But the visa portal can be slow, unpredictable, and sometimes changes without warning. Because of this, auto-click submit may not always work as expected.</p><p style="margin:0;">If something goes wrong \u2014 a wrong date, a failed booking, or an unexpected result \u2014 we are not able to take responsibility for it.</p>',tip:"",showTip:!1,showSkip:!1,confirmText:"I Understand",cancelText:"Cancel",confirmBg:"#16A34A"}:o==="release_window"?{title:"Before You Enable Release Window Checks",bodyHtml:'<p style="margin:0 0 10px 0;">Release Window Checks temporarily use a faster checking interval during the periods you selected.</p><p style="margin:0 0 10px 0;">Checking very frequently can cause rate-limit messages, waiting rooms, Cloudflare checks, or temporary portal errors.</p><p style="margin:0;">Use this feature at your own discretion and slow down or turn it off if the portal begins limiting your checks.</p>',tip:"",showTip:!1,showSkip:!1,confirmText:"I Understand",cancelText:"Cancel",confirmBg:"#1A73E8"}:{title:"Before You Start Assist Check",bodyHtml:'<p style="margin:0 0 10px 0;"><strong>Note:</strong> The visa portal can become busy, especially when many people are checking for slots.</p><p style="margin:0 0 10px 0;">You may experience:</p><ul style="margin:0 0 12px 20px; padding:0;"><li style="margin:3px 0;">Waiting rooms</li><li style="margin:3px 0;">Cloudflare checks</li><li style="margin:3px 0;">Slow or timed-out pages</li><li style="margin:3px 0;">Rate limit messages</li></ul><p style="margin:0 0 10px 0;">These are normal, temporary portal messages during heavy traffic.</p><p style="margin:0;">Simply slow down checking and try again later.</p>',tip:"Please follow the visa portal\u2019s Terms of Service, rules, and normal usage limits.",showTip:!0,showSkip:!0,confirmText:"I Understand",cancelText:"Cancel",confirmBg:"#1A73E8"};t.modalTitle.textContent=i.title,t.modalBody.innerHTML=i.bodyHtml,t.modalTip.style.display=i.showTip?"block":"none",t.modalTipText.textContent=i.tip,t.modalConfirmBtn.textContent=i.confirmText,t.modalConfirmBtn.style.background=i.confirmBg,t.modalConfirmBtn.style.borderColor=i.confirmBg,t.modalConfirmBtn.style.display="block",t.modalCancelBtn.textContent=i.cancelText,t.modalCancelBtn.style.display="block",t.modalActions&&(t.modalActions.style.display="flex"),t.modalLinkBtn.style.display="none",t.modalCloseBtn.style.display="none",t.modalSkipWrap&&t.modalSkipCheck&&(t.modalSkipWrap.style.display=i.showSkip?"flex":"none",t.modalSkipCheck.checked=!1),t.modalScrim.style.display="flex";let g=()=>{t.modalScrim.style.display="none",t.modalConfirmBtn.onclick=null,t.modalCancelBtn.onclick=null,t.modalLinkBtn.onclick=null,t.modalCloseBtn.onclick=null,t.modalScrim.onclick=null,t.modalSkipWrap&&t.modalSkipCheck&&(t.modalSkipWrap.style.display="none",t.modalSkipCheck.checked=!1)};t.modalConfirmBtn.onclick=async()=>{var n;let E=o==="assist_check"&&!!((n=t.modalSkipCheck)!=null&&n.checked);g(),E&&await Se(),await e.onConfirm()},t.modalCancelBtn.onclick=()=>{g(),e.onCancel()},t.modalScrim.onclick=E=>{E.target===t.modalScrim&&(g(),e.onCancel())}}function nt(o,e){let t=ct();if(!t.modalScrim)return;let i=o==="interval"?{title:"Upgrade Required",body:"Shorter Auto check intervals are available on paid plans."}:{title:"Upgrade Required",body:"Upgrade to Paid plans to use this feature."};t.modalTitle.textContent=i.title,t.modalBody.textContent=i.body,t.modalTip.style.display="none",t.modalTipText.textContent="",t.modalSkipWrap&&t.modalSkipCheck&&(t.modalSkipWrap.style.display="none",t.modalSkipCheck.checked=!1),t.modalConfirmBtn.style.display="none",t.modalCancelBtn.style.display="none",t.modalActions&&(t.modalActions.style.display="none"),t.modalLinkBtn.style.display="block",t.modalLinkBtn.textContent="See plans \u2192",t.modalCloseBtn.style.display="block",t.modalScrim.style.display="flex";let g=()=>{t.modalScrim.style.display="none",t.modalConfirmBtn.onclick=null,t.modalCancelBtn.onclick=null,t.modalLinkBtn.onclick=null,t.modalCloseBtn.onclick=null,t.modalScrim.onclick=null};t.modalLinkBtn.onclick=()=>{if(g(),!j||String(j).includes("TODO")){x("Set SEE_PLANS_URL first"),e.onDismiss();return}window.open(j,"_blank","noopener,noreferrer"),e.onDismiss()},t.modalCloseBtn.onclick=()=>{g(),e.onDismiss()},t.modalScrim.onclick=E=>{E.target===t.modalScrim&&(g(),e.onDismiss())}}function Ct(o){var n,N,M,K,ne,ge,Ee,ce,Ae,Y,Ie,Ue,Le,le,be,Oe,Je;let e=ct(),t={value:o};e.mount.addEventListener("click",p=>{if(p.target.closest("input, select, button"))return;p.target.closest("label")&&p.preventDefault()});async function i(){let p=await d();p&&(t.value=p,Pe(p))}async function g(){var ve,Ke;let p=t.value,B=r(p),V=String(B.tier||((ve=p==null?void 0:p.globalSettings)==null?void 0:ve.tier)||"free"),te=$(e.intervalSeconds.value,(Ke=e.intervalUnit)==null?void 0:Ke.value),Me=a(V);if(te<Me){let Ce=I(Me);e.intervalSeconds.value=String(Ce.value),e.intervalUnit&&(e.intervalUnit.value=Ce.unit),V==="free"?nt("interval",{onDismiss:()=>{Pe(p)}}):x("Minimum Auto Check interval is 1 minute");return}await U({assistCheckIntervalSeconds:te},"Interval Updated"),await i()}e.intervalSeconds.addEventListener("change",g);async function E(){let p={startMinute:Number(e.turboTimingWindowOneStart.value),durationMinutes:Number(e.turboTimingWindowOneDuration.value)},B=e.turboTimingWindowTwoWrap.style.display!=="none",V=e.turboTimingWindowThreeWrap.style.display!=="none",te=e.turboTimingWindowFourWrap.style.display!=="none",Me=e.turboTimingWindowTwoStart.value!==""&&e.turboTimingWindowTwoDuration.value!=="",ve=e.turboTimingWindowThreeStart.value!==""&&e.turboTimingWindowThreeDuration.value!=="",Ke=e.turboTimingWindowFourStart.value!==""&&e.turboTimingWindowFourDuration.value!=="";if(B&&!Me||V&&!ve||te&&!Ke){e.turboTimingError.textContent="Select both Start and Duration for each added interval.",e.turboTimingError.style.display="block";return}let Ce=Me?{startMinute:Number(e.turboTimingWindowTwoStart.value),durationMinutes:Number(e.turboTimingWindowTwoDuration.value)}:null,Ne=ve?{startMinute:Number(e.turboTimingWindowThreeStart.value),durationMinutes:Number(e.turboTimingWindowThreeDuration.value)}:null,ze=Ke?{startMinute:Number(e.turboTimingWindowFourStart.value),durationMinutes:Number(e.turboTimingWindowFourDuration.value)}:null,qe=[p];Ce!==null&&qe.push(Ce),Ne!==null&&qe.push(Ne),ze!==null&&qe.push(ze);let ot=!1;for(let ke=0;ke<qe.length;ke+=1)for(let Ge=ke+1;Ge<qe.length;Ge+=1)D(qe[ke],qe[Ge])&&(ot=!0);if(ot){Pe(t.value),e.turboTimingError.textContent="Release windows cannot overlap.",e.turboTimingError.style.display="block";return}await f({releaseWindowCheckIntervalSeconds:Number(e.turboTimingIntervalSeconds.value),releaseWindowOneStartMinute:p.startMinute,releaseWindowOneDurationMinutes:p.durationMinutes,releaseWindowTwoStartMinute:Ce===null?null:Ce.startMinute,releaseWindowTwoDurationMinutes:Ce===null?null:Ce.durationMinutes,releaseWindowThreeStartMinute:Ne===null?null:Ne.startMinute,releaseWindowThreeDurationMinutes:Ne===null?null:Ne.durationMinutes,releaseWindowFourStartMinute:ze===null?null:ze.startMinute,releaseWindowFourDurationMinutes:ze===null?null:ze.durationMinutes}),await i()}e.turboTimingAddWindow.addEventListener("click",()=>{if(e.turboTimingWindowTwoWrap.style.display==="none"){e.turboTimingWindowTwoWrap.style.display="block",e.turboTimingAddWindow.style.display="none";return}if(e.turboTimingWindowThreeWrap.style.display==="none"){e.turboTimingWindowThreeWrap.style.display="block",e.turboTimingWindowTwoRemove.style.display="none",e.turboTimingAddWindow.style.display="none";return}e.turboTimingWindowFourWrap.style.display==="none"&&(e.turboTimingWindowFourWrap.style.display="block",e.turboTimingWindowThreeRemove.style.display="none",e.turboTimingAddWindow.style.display="none")}),e.turboTimingWindowTwoRemove.addEventListener("click",async()=>{await f({releaseWindowTwoStartMinute:null,releaseWindowTwoDurationMinutes:null}),await i()}),e.turboTimingWindowThreeRemove.addEventListener("click",async()=>{await f({releaseWindowThreeStartMinute:null,releaseWindowThreeDurationMinutes:null}),await i()}),e.turboTimingWindowFourRemove.addEventListener("click",async()=>{await f({releaseWindowFourStartMinute:null,releaseWindowFourDurationMinutes:null}),await i()}),e.turboTimingToggle.addEventListener("click",async()=>{let p=r(t.value);if(!(String(p.tier)!=="free")){nt("release_window",{onDismiss:()=>{Pe(t.value)}});return}if(!p.assistCheckEnabled)return;if(p.releaseWindowChecksEnabled===!0){await f({releaseWindowChecksEnabled:!1}),await i();return}pt("release_window",{onConfirm:async()=>{await f({releaseWindowChecksEnabled:!0}),await i()},onCancel:()=>{Pe(t.value)}})}),e.autoCheckCommunityAlertsToggle.addEventListener("click",async()=>{let p=r(t.value);if(!(String(p.tier)!=="free")){nt("community_alert_auto_check",{onDismiss:()=>{Pe(t.value)}});return}await f({autoCheckCommunityAlertsEnabled:p.autoCheckCommunityAlertsEnabled!==!0}),await i()}),[e.turboTimingIntervalSeconds,e.turboTimingWindowOneStart,e.turboTimingWindowOneDuration,e.turboTimingWindowTwoStart,e.turboTimingWindowTwoDuration,e.turboTimingWindowThreeStart,e.turboTimingWindowThreeDuration,e.turboTimingWindowFourStart,e.turboTimingWindowFourDuration].forEach(p=>{p.addEventListener("change",E)}),(n=e.manualCheckReminderToggle)==null||n.addEventListener("change",async()=>{var V,te;if(!!!e.manualCheckReminderToggle.checked){await U({manualCheckReminderEnabled:!1},"Check Reminder Off"),await i();return}let B=!1;try{B=await chrome.permissions.request({permissions:["notifications"]})}catch{B=!1}if(!B){await U({manualCheckReminderEnabled:!1},"Notification Permission Needed"),await i();return}await U({manualCheckReminderEnabled:!0,manualCheckReminderMinutes:z((V=e.manualCheckReminderMinutes)==null?void 0:V.value),manualCheckReminderScheduleType:(te=e.manualCheckReminderScheduleMinuteMarks)!=null&&te.checked?A:c,manualCheckReminderMinuteMarks:L(e.manualCheckReminderMinuteMarkSelects.map(Me=>Me.value))},"Check Reminder On"),await i()}),(N=e.manualCheckReminderMinutes)==null||N.addEventListener("change",async()=>{let p=z(e.manualCheckReminderMinutes.value);e.manualCheckReminderMinutes.value=String(p),await U({manualCheckReminderMinutes:p},"Reminder Interval Updated"),await i()}),(M=e.manualCheckReminderScheduleInterval)==null||M.addEventListener("change",async()=>{e.manualCheckReminderScheduleInterval.checked&&(await U({manualCheckReminderScheduleType:c},"Reminder Schedule Updated"),await i())}),(K=e.manualCheckReminderScheduleMinuteMarks)==null||K.addEventListener("change",async()=>{if(!e.manualCheckReminderScheduleMinuteMarks.checked)return;let p=t.value,B=r(p);if(String(B.tier)==="free"){e.manualCheckReminderScheduleInterval.checked=!0,e.manualCheckReminderScheduleMinuteMarks.checked=!1,nt("manual_reminder_minutes",{onDismiss:()=>{Pe(t.value)}});return}await U({manualCheckReminderScheduleType:A,manualCheckReminderMinuteMarks:L(e.manualCheckReminderMinuteMarkSelects.map(te=>te.value))},"Reminder Schedule Updated"),await i()}),e.manualCheckReminderMinuteMarkSelects.forEach(p=>{p.addEventListener("change",async()=>{let B=L(e.manualCheckReminderMinuteMarkSelects.map(V=>V.value));await U({manualCheckReminderMinuteMarks:B},"Reminder Times Updated"),await i()})}),(ne=e.manualCheckReminderSeePlansBtn)==null||ne.addEventListener("click",()=>{nt("manual_reminder_minutes",{onDismiss:()=>{Pe(t.value)}})}),(ge=e.manualCheckReminderTestBtn)==null||ge.addEventListener("click",async()=>{let p=!1;try{p=await chrome.permissions.request({permissions:["notifications"]})}catch{p=!1}if(!p){x("Notification permission needed");return}chrome.runtime.sendMessage({type:"VSA_TEST_MANUAL_CHECK_REMINDER"},B=>{let V=chrome.runtime.lastError;if(V||!(B!=null&&B.ok)){let te=(V==null?void 0:V.message)||(B==null?void 0:B.error)||(B==null?void 0:B.reason)||"Unknown notification error";x(`Test alert failed: ${te}`);return}x("Test alert sent")})}),e.manualCheckReminderTtsToggle.addEventListener("change",async()=>{await U({manualCheckReminderTtsEnabled:!!e.manualCheckReminderTtsToggle.checked},"Reminder Voice Updated"),await i()}),e.manualCheckReminderTtsMessage.addEventListener("blur",async()=>{let p=e.manualCheckReminderTtsMessage.value.trim()||"Reminder to check for slots";e.manualCheckReminderTtsMessage.value=p,await U({manualCheckReminderTtsMessage:p},"Reminder Message Updated"),await i()}),e.manualCheckReminderTtsTestBtn.addEventListener("click",()=>{let p=e.manualCheckReminderTtsMessage.value.trim()||"Reminder to check for slots";chrome.tts.speak(p,{enqueue:!1,rate:1,pitch:1,volume:1})}),(Ee=e.intervalUnit)==null||Ee.addEventListener("change",()=>{let p=t.value,B=r(p),V=s(B.assistCheckIntervalSeconds||120);if(e.intervalUnit.value==="seconds")e.intervalSeconds.value=String(V);else{let te=Math.max(1,Math.round(V/60));e.intervalSeconds.value=String(te)}e.intervalWarning&&(e.intervalWarning.innerHTML=re(e.intervalUnit.value))}),(ce=e.autoOpenRecoveryWindowToggle)==null||ce.addEventListener("change",async()=>{let p=r(t.value);if(!(String(p.tier)!=="free")){Pe(t.value),nt("auto_open_recovery",{onDismiss:()=>{Pe(t.value)}});return}await U({autoOpenRecoveryWindowEnabled:!!e.autoOpenRecoveryWindowToggle.checked},"Recovery Window Updated"),await i()}),e.audioAlertToggle.addEventListener("change",async()=>{await U({audioAlertEnabled:!!e.audioAlertToggle.checked},"Audio Alert Updated"),await i()}),e.desktopAlertsToggle&&e.desktopAlertsToggle.addEventListener("change",async()=>{if(!!!e.desktopAlertsToggle.checked){await U({desktopAlertsEnabled:!1},"Desktop Alerts Updated"),await i();return}let B=!1;try{B=await chrome.permissions.request({permissions:["notifications"]})}catch{B=!1}if(!B){await U({desktopAlertsEnabled:!1},"Desktop Alerts Permission Needed"),await i();return}await U({desktopAlertsEnabled:!0},"Desktop Alerts Updated"),await i()}),e.playTestDesktopAlertBtn&&e.playTestDesktopAlertBtn.addEventListener("click",async()=>{let p=!1;try{p=await chrome.permissions.request({permissions:["notifications"]})}catch{p=!1}if(!p){x("Desktop Alerts permission needed");return}let B=new Date;B.setDate(B.getDate()+1);let V=B.toISOString().slice(0,10);chrome.runtime.sendMessage({type:"VSA_DATE_OK",dateIso:V,slotsTotal:1},te=>{if(!(te!=null&&te.ok)){x("Could not show test alert");return}x("Test alert sent")})}),e.audioUpdatesToggle.addEventListener("change",async()=>{await U({audioUpdatesEnabled:!!e.audioUpdatesToggle.checked},"Audio Updates Updated"),await i()}),e.playTestVoiceBtn.addEventListener("click",()=>{chrome.tts.speak("Voice updates are working.",{enqueue:!1,rate:1,pitch:1,volume:1})}),e.playTestDateFoundBtn.addEventListener("click",()=>{let p=new Date;p.setDate(p.getDate()+1);let B=p.toLocaleDateString(void 0,{month:"short",day:"2-digit",year:"numeric"});chrome.tts.speak(`Earliest date found: ${B}.`,{enqueue:!1,rate:1,pitch:1,volume:1})}),e.playTestQueueClearBtn.addEventListener("click",()=>{chrome.tts.speak("Line wait is over.",{enqueue:!1,rate:1,pitch:1,volume:1})}),e.playTestCloudflareClearBtn.addEventListener("click",()=>{let p=e.cloudflareWarningTtsMessage.value.trim()||"Verify you are a human.";chrome.tts.speak(p,{enqueue:!1,rate:1,pitch:1,volume:1})}),e.consularRangeWeeks.addEventListener("change",async()=>{let p=String(e.consularRangeWeeks.value).trim(),B=p===""?null:Number(p);if(B!==null&&(!Number.isInteger(B)||B<1||B>12)){await i();return}await q().updateActiveProfile({consularRangeWeeks:B}),gt(),x("Consular Range Updated"),await i()}),(Ae=e.minDaysNotice)==null||Ae.addEventListener("change",async()=>{let p=parseInt(e.minDaysNotice.value,10),B=Number.isFinite(p)?Math.min(7,Math.max(0,p)):0;await U({minimumDaysNotice:B},"Minimum Notice Updated"),await i()}),(Y=e.offPageAlertToggle)==null||Y.addEventListener("change",async()=>{await U({alertIfNotOnSchedule:!!e.offPageAlertToggle.checked},"Off-Page Alert Updated"),await i()}),e.queueWaitOverlayToggle.addEventListener("change",async()=>{await U({queueWaitOverlayEnabled:!!e.queueWaitOverlayToggle.checked},"Waiting Timer Updated"),await i()}),e.queueStatusAlertMinutes.addEventListener("change",async()=>{let p=oe(e.queueStatusAlertMinutes.value);await U({queueStatusAlertMinutes:p},"Waiting Voice Updated"),await i()}),e.queueClearAlertToggle.addEventListener("change",async()=>{await U({queueClearAlertEnabled:!!e.queueClearAlertToggle.checked},"Line Alert Updated"),await i()}),e.cloudflareClearAlertToggle.addEventListener("change",async()=>{await U({cloudflareClearAlertEnabled:!!e.cloudflareClearAlertToggle.checked},"Cloudflare Alert Updated"),await i()}),e.cloudflareWarningTtsMessage.addEventListener("blur",async()=>{await U({cloudflareWarningTtsMessage:e.cloudflareWarningTtsMessage.value.trim()},"Cloudflare Warning Message Updated")}),e.loginPageLoadAudioToggle.addEventListener("change",async()=>{await U({loginPageLoadAudioEnabled:e.loginPageLoadAudioToggle.checked},"Login Audio Updated"),await i()}),(Ie=e.loginAutoFillCredentialsToggle)==null||Ie.addEventListener("change",async()=>{await U({loginAutoFillCredentialsEnabled:!!e.loginAutoFillCredentialsToggle.checked},"Login Fill Updated"),await i()}),(Ue=e.loginAutoClickSubmitToggle)==null||Ue.addEventListener("change",async()=>{await U({loginAutoClickSubmitEnabled:!!e.loginAutoClickSubmitToggle.checked},"Login Submit Updated"),await i()}),(Le=e.loginAutoFillKbaToggle)==null||Le.addEventListener("change",async()=>{await U({loginAutoFillKbaEnabled:!!e.loginAutoFillKbaToggle.checked},"Security Fill Updated"),await i()}),(le=e.loginAutoClickKbaContinueToggle)==null||le.addEventListener("change",async()=>{await U({loginAutoClickKbaContinueEnabled:!!e.loginAutoClickKbaContinueToggle.checked},"Security Continue Updated"),await i()}),(be=e.loginActivityFeedToggle)==null||be.addEventListener("change",async()=>{await U({loginActivityFeedEnabled:!!e.loginActivityFeedToggle.checked},"Login Feed Updated"),await i()}),e.autoSelectEmbassyToggle.addEventListener("change",async()=>{await U({autoSelectEmbassyEnabled:!!e.autoSelectEmbassyToggle.checked},"Embassy Helper Updated"),await i()}),e.autoJumpFirstDateToggle.addEventListener("change",async()=>{await U({autoJumpFirstDateEnabled:!!e.autoJumpFirstDateToggle.checked},"Date Jump Updated"),await i()}),e.speakDateFoundToggle.addEventListener("change",async()=>{await U({speakDateFoundEnabled:!!e.speakDateFoundToggle.checked},"Date Voice Updated"),await i()}),e.slotAlertTtsMessage.addEventListener("blur",async()=>{await U({slotAlertTtsMessage:e.slotAlertTtsMessage.value.trim()},"Alert Message Updated")}),(Oe=e.sessionKeepaliveToggle)==null||Oe.addEventListener("change",async()=>{await U({sessionKeepaliveEnabled:!!e.sessionKeepaliveToggle.checked},"Stay Logged In Updated"),await i()}),e.homeRefreshMinutes.addEventListener("change",async()=>{let p=ye(e.homeRefreshMinutes.value);e.homeRefreshMinutes.value=String(p),await U({homeRefreshMinutes:p},"Home Refresh Updated"),await i()}),e.playTestSoundBtn.addEventListener("click",()=>{try{let p=e.slotAlertTtsMessage.value.trim()||"Slot found";chrome.runtime.sendMessage({type:"VSA_TTS_SPEAK",text:p})}catch{}}),(Je=e.assistCheckToggle)==null||Je.addEventListener("click",async()=>{let p=t.value,B=r(p);if(!!B.assistCheckEnabled){await U({assistCheckEnabled:!1,assistBookEnabled:!1},"Assist Check Off")&&await bt(!1),await i();return}if(!(await chrome.storage.local.get(["vsa_auth_token"])).vsa_auth_token){e.assistCheckError&&(e.assistCheckError.textContent="Please register or login first.",e.assistCheckError.style.display="block"),et(e.assistCheckToggle,e.assistCheckTrack,e.assistCheckKnob,!1,!1);return}if(e.assistCheckError&&(e.assistCheckError.style.display="none"),!B.autoSelectEmbassyEnabled||!B.autoJumpFirstDateEnabled){e.assistCheckError&&(e.assistCheckError.textContent="Turn on Auto-select embassy and Auto-jump first.",e.assistCheckError.style.display="block");return}let Me=async()=>{await U({assistCheckEnabled:!0},"Assist Check On")&&await bt(!0),await i()};if(await J()){await Me();return}pt("assist_check",{onConfirm:Me,onCancel:()=>{Pe(t.value)}})}),e.assistBookToggle.addEventListener("click",async()=>{var ve;let p=t.value,B=r(p),V=String(B.tier||((ve=p==null?void 0:p.globalSettings)==null?void 0:ve.tier)||"free"),te=W(V),Me=!!B.assistBookEnabled&&te;if(!te){nt("auto_book",{onDismiss:()=>{Pe(t.value)}});return}if(Me){await U({assistBookEnabled:!1},"Auto-submit Updated"),await i();return}if(!B.assistCheckEnabled){x("Turn on Auto check first");return}pt("auto_book",{onConfirm:async()=>{await U({assistBookEnabled:!0},"Assist-Book Updated"),await i()},onCancel:()=>{Pe(t.value)}})}),e.assistBookAnyDateInRangeToggle.addEventListener("click",async()=>{let p=t.value,B=r(p);await U({assistBookAnyDateInRangeEnabled:B.assistBookAnyDateInRangeEnabled!==!0},"Booking Date Preference Updated"),await i()})}async function Bt(){await mt()}globalThis.VSAPortalAssistCard={refresh:Bt};async function mt(){let o=document.getElementById(m);if(!o)return;o.innerHTML=Et(),await _e(),Fe(),await ae(),he();let e=await d();if(!e)return;let t=await chrome.storage.local.get(["vsa_auth_token"]),i=String(e.globalSettings.tier),g=document.querySelector('[data-pa-tab-id="alertsPage"]');if(g){let n=!t.vsa_auth_token||i==="free";g.innerHTML="Get<br>Notified"}Pe(e),await At(e);let E=await d();E&&vt(E),await St(),Ct(e)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mt,{once:!0}):mt()})();(()=>{let m=null,k=null,C=null,w={},T={},c=()=>globalThis.VSAStorage||{},A=()=>globalThis.VSADateUtils||{},_=null,F=!1,D=null,y=null,h="",Z=null,fe=()=>document.getElementById("profileCardMount");function se(b){let v=document.getElementById("portalAssistCardMount");v&&(v.style.display=b?"none":"")}function O(b){if(!b)return[];let v=b.profiles||{};return Object.entries(v).filter(([x,S])=>x!=="default"&&!!String((S==null?void 0:S.username)||"").trim()).map(([x,S])=>({id:x,p:S}))}function H(b,v){return!b||v.length===0?null:v.find(S=>S.id===(b.activeProfileId||"default"))||v[0]}function j(b){if(!b)return null;let v=String(b.scEmbassy||"").trim(),x=String(b.scVisaType||"").trim(),S=_e=>{let Fe=String(_e||"").trim();if(!Fe)return null;let Te=new Date(Fe.includes("T")?Fe:`${Fe}T00:00:00`);return isNaN(Te.getTime())?null:Te.toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"})},P=S(b.scCurrentOFCAppointmentIso),G=S(b.scCurrentConsularAppointmentIso),ie=S(b.scCurrentAppointmentIso),ee=[];P&&ee.push(`OFC: ${P}`),G&&ee.push(`Consular: ${G}`);let me=ee.length?ee.join(" \u2022 "):ie,De=v&&x?`${v} (${x})`:v||(x?`(${x})`:"");return!De&&!me?null:De&&me?`${De} \u2022 ${me}`:De||me}function q(b){if(!b)return"Not Set";let v=String(b.applicantName||"").trim(),x=String(b.username||"").trim();return v&&x?`${v} (${x})`:v||x||"Not Set"}function we(b){return b?pe(b.desiredSlotStartDate,b.desiredSlotEndDate):null}function pe(b,v){let x=G=>{if(!G)return null;let ie=new Date(G+"T00:00:00");if(isNaN(ie))return null;let ee=new Date;return ie.toLocaleDateString("en-US",ie.getFullYear()===ee.getFullYear()?{month:"short",day:"numeric"}:{month:"short",day:"numeric",year:"numeric"})},S=x(b),P=x(v);return S&&P?`${S} \u2192 ${P}`:null}async function l(){let b=fe();if(!b)return;let v=O(_),x=H(_,v),S=v.length>0,P=!!(F||D);se(P),P?await u(b):S?d(b,x,v):r(b)}function r(b){var v;b.innerHTML=`
      <div class="card active-profile">
        <div class="section-title">
          <span>Portal Assist \u2014 Quick Login</span>
        </div>
        <p class="sub" style="margin-bottom:14px;">
          Save your profile to log in faster and book slots before others. Stored on your computer only.
        </p>
        <button id="pcBtnAddFirst" class="btn-save-sm" style="width:100%; height:44px; border-radius:10px; font-size:15px; font-weight:800;">
          + Add Quick Login Profile
        </button>
        ${h?`
          <div style="margin-top:10px; padding:12px; border-radius:8px; border:1px solid #F59E0B; background:#FFFBEB;">
            <div style="font-size:12px; font-weight:700; color:#92400E; line-height:1.5;">
              ${z(h)}
            </div>
          </div>
        `:""}
      </div>
      ${f()}
    `,(v=document.getElementById("pcBtnAddFirst"))==null||v.addEventListener("click",s)}function d(b,v,x){var Te,ae;let S=x.filter(ue=>ue.id!==(v==null?void 0:v.id)),P=v==null?void 0:v.p,G=j(P),ie=pe(P==null?void 0:P.desiredSlotStartDate,P==null?void 0:P.desiredSlotEndDate),ee=(m==null?void 0:m.tier)||"free",me=T[ee]||T.free,De=x.length<((me==null?void 0:me.maxProfiles)??1),_e="+ Add Profile";b.innerHTML=`
      <div class="card active-profile">
        <div class="section-title" style="margin-bottom:4px;">
          <span>Quick Login Profiles</span>
        </div>
        <div class="sub" style="margin:0 0 10px 0; color:#334155;">
          Active Profile is used for quick login to the visa portal.
        </div>

        <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:10px; margin-top:2px;">
          <div style="flex:1; min-width:0; overflow:hidden;">
            <div class="profile-view-text" id="pcActiveNameLine" style="font-size:15px;">${z(q(P))}</div>
            ${G?`<div class="profile-sub-text" style="font-size:11px;">${z(G)}</div>`:""}
            ${ie?`<div class="profile-sub-text" style="font-size:11px;">${z(ie)}</div>`:""}
            <button id="pcBtnEditActive" class="btn-cancel-link" style="margin-top:6px; font-size:12px; color:#2563EB;">Edit</button>
          </div>

          <div style="flex-shrink:0; padding:6px 12px; border-radius:6px; background:#059669; color:#FFFFFF; font-size:11px; font-weight:800; line-height:1.2; margin-top:1px;">
            Active Profile
          </div>
        </div>

        ${S.length?`
          <div style="margin-top:14px; padding-top:12px; border-top:1px solid #CBD5E1;">
            <div style="font-size:11px; font-weight:800; color:#64748B; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:8px;">
              Other Profiles
            </div>
            <div id="pcInactiveList"></div>
          </div>
        `:'<div id="pcInactiveList"></div>'}

        <div style="margin-top:14px; border-top:1px solid #E2E8F0; padding-top:12px;">
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <button id="pcBtnAdd" class="secondary-btn" style="font-size:13px;">${_e}</button>
          </div>

          ${!De&&h?`
            <div style="margin-top:10px; padding:12px; border-radius:8px; border:1px solid #F59E0B; background:#FFFBEB;">
              <div style="font-size:12px; font-weight:700; color:#92400E; line-height:1.5; text-align:left;">
                ${z(h)}
                <a
                  href="https://example.com/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="color:#2563EB; text-decoration:underline; font-weight:800;"
                >see plans \u2192</a>
              </div>
            </div>
          `:""}
        </div>
      </div>
      ${f()}
    `,(Te=document.getElementById("pcBtnEditActive"))==null||Te.addEventListener("click",()=>a(v.id,v.p)),(ae=document.getElementById("pcBtnAdd"))==null||ae.addEventListener("click",s);let Fe=document.getElementById("pcInactiveList");S.forEach(({id:ue,p:he})=>{let J=document.createElement("div");J.style.cssText="margin-top:12px; border-top:1px solid #E2E8F0; padding-top:12px; display:flex; align-items:flex-start; justify-content:space-between; gap:10px;";let Se=j(he),We=pe(he==null?void 0:he.desiredSlotStartDate,he==null?void 0:he.desiredSlotEndDate),it=Z===ue;J.innerHTML=`
        <div style="flex:1; min-width:0; overflow:hidden;">
          <div class="profile-view-text" style="font-size:13px;">${z(q(he))}</div>
          ${Se?`<div class="profile-sub-text" style="font-size:11px;">${z(Se)}</div>`:""}
          ${We?`<div class="profile-sub-text" style="font-size:11px;">${z(We)}</div>`:""}
          <button class="btn-cancel-link pc-edit-inactive" data-id="${ue}" style="margin-top:6px; font-size:12px; color:#2563EB;">Edit</button>
          ${it?`
            <div style="margin-top:6px; padding:6px 8px; border-radius:6px; border:1px solid #F59E0B; background:#FFFBEB; font-size:11px; font-weight:700; color:#92400E; line-height:1.4;">
              \u26A0\uFE0F Profile switching is locked. Return to the login page before trying again.
            </div>
          `:""}
        </div>
        <button class="secondary-btn pc-login" data-id="${ue}" style="flex-shrink:0; font-size:12px; padding:4px 12px;">Make Active</button>
      `,Fe.appendChild(J)}),Fe.querySelectorAll(".pc-login").forEach(ue=>{ue.addEventListener("click",()=>{Z=null,oe(ue.dataset.id)})}),Fe.querySelectorAll(".pc-edit-inactive").forEach(ue=>{let he=S.find(J=>J.id===ue.dataset.id);ue.addEventListener("click",()=>{he&&a(he.id,he.p)})}),W()}function R(b){let v=String(b||"");if(v.charAt(0)!=="|")return!1;let x=v.split("|");if(x.length!==12)return k==null||k("Import failed: expected 12 fields"),!0;let[S,P,G,ie,ee,me,De,_e,Fe,Te,ae,ue]=x,he=String(ee||"").trim()||String((w.kba1||[])[0]||"").trim(),J=String(De||"").trim()||String((w.kba2||[])[0]||"").trim(),Se=String(Fe||"").trim()||String((w.kba3||[])[0]||"").trim();return y={...y||{},applicantName:String(P||"").trim(),username:String(G||"").trim(),password:String(ie||""),kba1Question:he,kba1:String(me||"").trim(),kba2Question:J,kba2:String(_e||"").trim(),kba3Question:Se,kba3:String(Te||"").trim(),desiredSlotStartDate:String(ae||"").trim()||null,desiredSlotEndDate:String(ue||"").trim()||null},!0}async function u(b){var Fe,Te,ae,ue,he;let v=y||{},x=F,S=x?"New Profile":"Edit Profile";b.innerHTML=`
      <div class="card active-profile">
        <div class="section-title">
          <span>${S}</span>
        </div>

        ${x?`
          <div style="margin-bottom:14px; padding:12px; background:#F8FAFC; border:1px solid #0F172A; border-radius:10px;">
            <div style="font-size:13px; font-weight:800; color:#0F172A; margin-bottom:4px;">\u{1F512} Stored on your device only</div>
            <div style="font-size:12px; color:#475569; line-height:1.6;">
              Username is required. Password and security questions are optional.
            </div>
          </div>
        `:""}



        <div class="form-group-title">User Credentials</div>

        <label>Applicant Name <span style="font-weight:500; color:#334155;">(Optional)</span></label>
        <input type="text" id="pcApplicantName" placeholder="e.g. John Doe" value="${z(v.applicantName||"")}">

        <label>Username <span style="font-weight:700; color:#DC2626;">*</span></label>
        <input type="text" id="pcUsername" placeholder="Your portal username" value="${z(v.username||"")}" autocomplete="off">
        <div id="pcUsernameError" class="error-msg" style="display:none;">Username is required</div>

        <label>Password <span style="font-weight:500; color:#334155;">(Optional)</span></label>
        <div style="position:relative;">
          <input type="password" id="pcPassword" placeholder="Portal password" value="${z(v.password||"")}" autocomplete="new-password" style="padding-right:60px;">
          <button id="pcTogglePwd" type="button" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; font-size:12px; font-weight:700; color:#2563EB; cursor:pointer;">Show</button>
        </div>

        <div class="form-group-title">Security Questions <span style="font-weight:500; color:#334155;">(Optional)</span></div>

        ${[1,2,3].map(J=>`
          <label>Question ${J}</label>
          <select id="pcKba${J}Q"></select>
          <input type="text" id="pcKba${J}A" placeholder="Answer ${J}" value="${z(v[`kba${J}`]||"")}" style="margin-top:4px;">
          <div id="pcKba${J}Error" class="error-msg" style="display:none;">Required</div>
        `).join("")}



        <div class="form-group-title">Booking Date Range <span style="font-weight:500; color:#334155;">(Optional)</span></div>
        <div style="font-size:12px; color:#475569; margin-bottom:10px; line-height:1.6;">
          Optional. If set, this overrides the global date range for this profile.
        </div>
        ${A().datePickerWidgetHTML("pc")}
        <div id="pcDateError" class="error-msg" style="display:none;">Check dates</div>

        <div class="action-row" style="margin-top:20px; display:flex; align-items:center; justify-content:space-between; gap:12px;">
          <div style="display:flex; align-items:center; min-width:0;">
            <button id="pcBtnDelete" class="btn-cancel-link" style="color:var(--err); display:${!x&&D&&D!=="default"?"block":"none"};">
              Delete
            </button>
          </div>

          <div style="display:flex; gap:12px; align-items:center; margin-left:auto;">
            <button id="pcBtnCancel" class="btn-cancel-link">Cancel</button>
            <button id="pcBtnSave" class="btn-save-sm">Save Profile</button>
          </div>
        </div>
      </div>
      ${f()}
    `,[1,2,3].forEach(J=>{let Se=document.getElementById(`pcKba${J}Q`),We=document.getElementById(`pcKba${J}A`);Se&&(Se.innerHTML='<option value="">Select question</option>',(w[`kba${J}`]||[]).forEach(it=>{let at=document.createElement("option");at.value=at.textContent=it,it===v[`kba${J}Question`]&&(at.selected=!0),Se.appendChild(at)}),Se.addEventListener("change",()=>{!Se.value||!We||(We.focus(),typeof We.select=="function"&&We.select())}))});let{initDatePickerWidget:P,isoToday:G}=A(),ie=G(),ee=new Date(`${ie}T00:00:00`);ee.setMonth(ee.getMonth()+3);let me=[ee.getFullYear(),String(ee.getMonth()+1).padStart(2,"0"),String(ee.getDate()).padStart(2,"0")].join("-"),De=v.desiredSlotStartDate||ie,_e=v.desiredSlotEndDate||me;y={...y,desiredSlotStartDate:De||null,desiredSlotEndDate:_e||null},P({ids:{startInput:"pcStartInput",endInput:"pcEndInput",startBoxInner:"pcStartBoxInner",endBoxInner:"pcEndBoxInner",endBoxValue:"pcEndBoxValue",upgradeBanner:"pcUpgradeBanner",upgradeBannerMsg:"pcUpgradeBannerMsg"},getTier:()=>(m==null?void 0:m.tier)||"free",getStartIso:()=>De,getEndIso:()=>_e,onSave:async(J,Se)=>{y={...y,desiredSlotStartDate:J,desiredSlotEndDate:Se}}}),(Fe=document.getElementById("pcTogglePwd"))==null||Fe.addEventListener("click",()=>{let J=document.getElementById("pcPassword"),Se=document.getElementById("pcTogglePwd");if(!J)return;let We=J.type==="password";J.type=We?"text":"password",Se.textContent=We?"Hide":"Show"}),(Te=document.getElementById("pcBtnCancel"))==null||Te.addEventListener("click",I),(ae=document.getElementById("pcBtnSave"))==null||ae.addEventListener("click",$),(ue=document.getElementById("pcBtnDelete"))==null||ue.addEventListener("click",()=>{let J=document.getElementById("pcDeleteModal"),Se=document.getElementById("pcModalProfileName");Se&&(Se.textContent=(y==null?void 0:y.applicantName)||(y==null?void 0:y.username)||"this profile"),J&&(J.style.display="flex")}),W(),(he=document.getElementById("pcApplicantName"))==null||he.addEventListener("input",async J=>{R(J.target.value)&&await l()})}function f(){return`
      <div id="pcDeleteModal" style="display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(15,23,42,0.65); z-index:999; align-items:center; justify-content:center; backdrop-filter:blur(2px);">
        <div style="background:white; padding:20px; border-radius:12px; width:280px; box-shadow:0 10px 25px rgba(0,0,0,0.2); text-align:center;">
          <div style="font-size:16px; font-weight:700; color:#1E293B; margin-bottom:8px;">Delete Profile?</div>
          <div style="font-size:13px; color:#64748B; margin-bottom:20px; line-height:1.5;">
            Are you sure you want to delete <span id="pcModalProfileName" style="font-weight:600; color:#1E293B;">this profile</span>? This cannot be undone.
          </div>
          <div style="display:flex; gap:10px; justify-content:center;">
            <button id="pcModalCancel" class="secondary-btn" style="flex:1;">Cancel</button>
            <button id="pcModalConfirm" class="btn-save-sm" style="background:#DC2626; flex:1;">Delete</button>
          </div>
        </div>
      </div>
    `}function W(){var b,v;(b=document.getElementById("pcModalCancel"))==null||b.addEventListener("click",()=>{document.getElementById("pcDeleteModal").style.display="none"}),(v=document.getElementById("pcModalConfirm"))==null||v.addEventListener("click",re)}async function a(b,v){let{getProfileWithCredentials:x}=c();if(typeof x!="function"){k("Unable to load saved credentials");return}let S;try{S=await x(b)}catch{k("Unable to load saved credentials");return}h="",F=!1,D=b,y={...v,...S},await l()}async function s(){if(!(await chrome.storage.local.get(["vsa_auth_token"])).vsa_auth_token){h="Please register or login first to add a profile.",await l();return}let v=(m==null?void 0:m.tier)||"free",x=T[v]||T.free,S=O(_),P=(x==null?void 0:x.maxProfiles)??1;if(S.length>=P){v==="free"?h="Free plans have a max 1 profile. See Paid plans to unlock more features ":v==="tier_standard"?h="Standard plans have a max 1 profile. Upgrade to Premium to get up to 3 profiles. ":v==="tier_premium"?h=`Premium plans have a max of ${P} profiles. Upgrade to Agent plan to get unlimited profiles `:h="You cannot add more profiles on this plan. ",await l();return}h="",F=!0,D=null,y={},await l()}async function I(){h="",F=!1,D=null,y=null,await l()}async function $(){var De,_e,Fe,Te;let b=String(((De=document.getElementById("pcUsername"))==null?void 0:De.value)||"").trim();if(!b){let ae=document.getElementById("pcUsernameError");ae&&(ae.style.display="block"),(_e=document.getElementById("pcUsername"))==null||_e.focus();return}let v=(y==null?void 0:y.desiredSlotStartDate)||"",x=(y==null?void 0:y.desiredSlotEndDate)||"";if(v&&!x||!v&&x){let ae=document.getElementById("pcDateError");ae&&(ae.textContent="Please set both Start and End dates.",ae.style.display="block");return}if(v&&x&&v>x){let ae=document.getElementById("pcDateError");ae&&(ae.textContent="Start must be before End.",ae.style.display="block");return}let S={applicantName:String(((Fe=document.getElementById("pcApplicantName"))==null?void 0:Fe.value)||"").trim(),username:b,password:((Te=document.getElementById("pcPassword"))==null?void 0:Te.value)||"",desiredSlotStartDate:v||null,desiredSlotEndDate:x||null};[1,2,3].forEach(ae=>{var ue,he;S[`kba${ae}Question`]=((ue=document.getElementById(`pcKba${ae}Q`))==null?void 0:ue.value)||"",S[`kba${ae}`]=String(((he=document.getElementById(`pcKba${ae}A`))==null?void 0:he.value)||"").trim()});let{upsertProfile:P,setActiveProfileId:G}=c(),ie=()=>"prof_"+Date.now().toString(36)+Math.random().toString(36).substr(2,5),ee=F?ie():D||ie();if(!await P(ee,S)){k("Profile could not be saved");return}await G(ee),h="",F=!1,D=null,y=null,await Q(),k("Profile saved"),C()}async function re(){if(!D||D==="default")return;let{deleteProfile:b,setActiveProfileId:v}=c(),x=D,P=O(_).find(G=>G.id!==x);await v((P==null?void 0:P.id)||"default"),await b(x),h="",F=!1,D=null,y=null,await Q(),k("Profile deleted"),C()}async function oe(b){let{setActiveProfileId:v}=c();try{let S=(await chrome.storage.local.get(["__vsa_pending_login_save"])).__vsa_pending_login_save,P=S?typeof S=="string"?JSON.parse(S):S:null;if(P&&String(P.username||"").trim()){Z=b,h="",await l();return}}catch{}Z=null,h="",await v(b),await Q(),k("Profile active"),C()}function z(b){return String(b||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}async function Q(){let{getStorageRoot:b}=c();_=await b(),await l()}async function L({settings:b,showStatus:v,notify:x,KBA_QUESTIONS:S,TIER_LIMITS:P}){m=b,k=v,C=x,w=S||{},T=P||{};let{getStorageRoot:G}=c();_=await G(),await l()}async function ye(b){m=b,h="",await l()}globalThis.VSAProfileCard={initProfileCard:L,updateProfileCardSettings:ye}})();(()=>{let m="supportCardMount";async function k(){try{let w=await chrome.storage.local.get(["vsa_urls"]),T=(w==null?void 0:w.vsa_urls)||{};return{enabled:T.support_enabled===!0,whatsappUrl:String(T.support_whatsapp||"").trim()}}catch{return{enabled:!1,whatsappUrl:""}}}async function C(){let w=document.getElementById(m),T=document.getElementById("supportTopMount");if(!w)return;let c=await k();if(!c.enabled||!c.whatsappUrl){w.innerHTML="",T&&(T.innerHTML="");return}T&&(T.innerHTML=`
        <div style="padding:4px 18px 0; margin-bottom:-4px; text-align:center; border-bottom:1px solid #E2E8F0;">
          
            <a href="${c.whatsappUrl}"
            target="_blank"
            rel="noopener"
            style="
              display:inline-block;
              font-size:11px;
              font-weight:600;
              color:#64748B;
              text-decoration:none;
              padding:4px 0;
            "
          >Questions? Message us on WhatsApp \u{1F4AC}</a>
        </div>
      `),w.innerHTML=`
      <div class="card" style="padding:14px; margin-bottom:16px;">
        <div style="font-size:14px; font-weight:800; color:#0F172A;">
          Got questions or feedback?
        </div>

        <div style="font-size:12px; color:#64748B; line-height:1.45; margin-top:5px;">
          We're here to help with any portal or extension questions.
        </div>
        <a
          href="${c.whatsappUrl}"
          target="_blank"
          rel="noopener"
          style="
            display:flex;
            align-items:center;
            justify-content:center;
            gap:7px;
            width:100%;
            height:38px;
            margin-top:10px;
            border-radius:10px;
            background:#FFFFFF;
            border:1.5px solid #25D366;
            color:#128C7E;
            font-size:13px;
            font-weight:800;
            text-decoration:none;
          "
        >
          <span aria-hidden="true">\u{1F4AC}</span>
          <span>Message Support on WhatsApp</span>
        </a>
      </div>
    `}globalThis.VSASupportCard={render:C},document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{C(),window.setTimeout(()=>{C()},800)},{once:!0}):(C(),window.setTimeout(()=>{C()},800))})();(()=>{async function m(){try{return(await chrome.storage.local.get("vsa_install_id")).vsa_install_id||null}catch{return null}}let k="https://getusvisa.ai/visa_scheduling/vsa",C="authCardMount",w="vsa-auth-card",T=!1,c=!1,A=null,_=0;function F(u=60){_=u,clearInterval(A),A=setInterval(()=>{_--;let f=document.getElementById("vsa-auth-resend");f&&(_<=0?(clearInterval(A),f.textContent="Resend code",f.disabled=!1,f.style.opacity="1"):(f.textContent=`Resend in ${_}s`,f.disabled=!0,f.style.opacity="0.5")),_<=0&&clearInterval(A)},1e3)}async function D(u){try{let W=(await chrome.storage.local.get(["vsa_auth_card_state"])).vsa_auth_card_state||{};await chrome.storage.local.set({vsa_auth_card_state:{...W,...u}})}catch{}}async function y(){try{return(await chrome.storage.local.get(["vsa_auth_card_state"])).vsa_auth_card_state||null}catch{return null}}async function h(){try{await chrome.storage.local.remove(["vsa_auth_card_state"])}catch{}}function Z(u){return String(u||"").trim().toLowerCase()}function fe(u){let f=Z(u);return f.length>=5&&f.includes("@")&&f.includes(".")}function se(u,f=!0){let W=document.getElementById("vsa-auth-status");W&&(W.textContent=u,W.style.display=u?"block":"none",W.style.color=f?"#DC2626":"#10B981")}function O(u){let f=document.getElementById("vsa-auth-primary-btn");f&&(f.disabled=u,f.style.opacity=u?"0.6":"1")}async function H(u,f){if(!T){T=!0,O(!0),se("");try{let W=await fetch(`${k}/api_code_request.cfm`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:u,device_client:"computer",install_id:await m()})}),a=await W.json().catch(()=>null);if(W.ok&&(a!=null&&a.ok)){if(a.api_token&&a.device_token){await q(a);return}f(),F(60)}else se((a==null?void 0:a.error)||"Could not send code. Please try again.")}catch{se("Network error. Please try again.")}finally{O(!1),T=!1}}}async function j(u,f){if(!c){c=!0,O(!0),se("");try{let W=await fetch(`${k}/api_code_verify.cfm`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:u,device_code:f,device_client:"computer",install_id:await m()})}),a=await W.json().catch(()=>null);W.ok&&(a!=null&&a.ok)&&(a!=null&&a.api_token)?await q(a):(se((a==null?void 0:a.error)||"Incorrect code. Please try again."),O(!1))}catch{se("Network error. Please try again."),O(!1)}finally{c=!1}}}async function q(u){await chrome.storage.local.set({vsa_auth_token:u.api_token,vsa_device_token:u.device_token,vsa_user_id:u.id||null,vsa_user_email:u.email||"",vsa_user_tier:u.tier||"free",vsa_extension_tier:u.extension_tier||u.tier||"free",vsa_tier_expires_at:u.tier_expires_at||null,vsa_last_sync_at:Date.now()});let f=globalThis.VSAStorage||{};typeof f.updateGlobalSettings=="function"&&await f.updateGlobalSettings({tier:u.extension_tier||u.tier||"free"}),clearInterval(A),await h(),se("\u2713 Verified! Loading your account...",!1),setTimeout(()=>{d(),typeof we=="function"&&we(u.email,u.tier,u.extension_tier||u.tier||"free")},900)}let we=null;async function pe(){let u=document.getElementById(C);if(!u||document.getElementById(w))return;let f=await y(),W=(f==null?void 0:f.step)||"email",a=(f==null?void 0:f.email)||"",s=document.createElement("div");s.id=w,u.appendChild(s),W==="code"?(s.innerHTML=r(a),oe()):(s.innerHTML=l(a),re());function I(z){a=z,W="code",D({step:"code",email:z}),s.innerHTML=r(z),oe()}function $(){W="email",D({step:"email",email:a}),s.innerHTML=l(a),re()}function re(){let z=document.getElementById("vsa-auth-email"),Q=document.getElementById("vsa-auth-primary-btn");function L(){let ye=fe(a);Q&&(Q.disabled=!ye,Q.style.opacity=ye?"1":"0.6",Q.style.cursor=ye?"pointer":"not-allowed")}z&&(z.value=a,z.addEventListener("input",()=>{a=z.value,D({step:"email",email:a}),L()}),L()),Q&&Q.addEventListener("click",()=>{let ye=Z(a);fe(ye)&&H(ye,()=>I(ye))})}function oe(){let z=document.getElementById("vsa-auth-code"),Q=document.getElementById("vsa-auth-primary-btn"),L=document.getElementById("vsa-auth-resend"),ye=document.getElementById("vsa-auth-change-email");z&&z.addEventListener("input",()=>{let b=z.value.replace(/\D/g,"").slice(0,5);z.value=b,Q&&(Q.disabled=b.length!==5,Q.style.opacity=b.length===5?"1":"0.6",Q.style.cursor=b.length===5?"pointer":"not-allowed")}),Q&&Q.addEventListener("click",()=>{let b=String((z==null?void 0:z.value)||"").replace(/\D/g,"");b.length===5&&j(Z(a),b)}),L&&(L.addEventListener("click",()=>{_>0||H(Z(a),()=>{se(`Code resent to ${a}`,!1),F(60)})}),_>0&&(L.textContent=`Resend in ${_}s`,L.disabled=!0,L.style.opacity="0.5")),ye&&ye.addEventListener("click",()=>{clearInterval(A),_=0,$()})}}function l(u=""){return`
      <div style="
        background: #ffffff;
        border: 1.5px solid #0F172A;
        border-radius: 12px;
        padding: 18px;
        margin-bottom: 16px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.06);
      ">
        <div style="font-size:17px; font-weight:800; color:#0F172A; margin-bottom:6px;">
          Get started \u2014 it's free
        </div>
        <div style="font-size:13px; color:#475569; line-height:1.5; margin-bottom:16px;">
          Enter your email to receive a 5-digit access code. No password required.
        </div>

        <label style="display:block; font-size:11px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:6px;">
          Email
        </label>
        <input
          id="vsa-auth-email"
          type="email"
          placeholder="your@email.com"
          value="${u}"
          autocomplete="email"
          style="
            width:100%; box-sizing:border-box;
            border:1.5px solid #0F172A; border-radius:8px;
            padding:10px 12px; font-size:14px;
            background:#fff; color:#0F172A; outline:none;
          "
        />

        <div id="vsa-auth-status" style="display:none; margin-top:8px; font-size:12px; font-weight:600;"></div>

        <button
          id="vsa-auth-primary-btn"
          type="button"
          disabled
          style="
            margin-top:12px; width:100%; height:44px;
            border-radius:10px; border:none;
            background:#2563EB; color:#fff;
            font-size:15px; font-weight:700;
            cursor:not-allowed; opacity:0.6;
            transition: opacity 0.15s, transform 0.1s;
          "
        >
          Send me a code
        </button>

        <div style="margin-top:12px; font-size:11px; color:#94A3B8; line-height:1.5;">
          We'll email you a short code. By continuing, you agree to the Terms. Your preferences are saved on your device only.
        </div>
      </div>
    `}function r(u){return`
      <div style="
        background: #ffffff;
        border: 1.5px solid #0F172A;
        border-radius: 12px;
        padding: 18px;
        margin-bottom: 16px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.06);
      ">
        <div style="font-size:17px; font-weight:800; color:#0F172A; margin-bottom:6px;">
          Enter your code
        </div>
        <div style="font-size:13px; color:#475569; line-height:1.5; margin-bottom:16px;">
          A 5-digit code was sent to <strong style="color:#0F172A;">${u}</strong>.
        </div>

        <label style="display:block; font-size:11px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:6px;">
          5-digit code
        </label>
        <input
          id="vsa-auth-code"
          type="text"
          inputmode="numeric"
          placeholder="12345"
          maxlength="5"
          autocomplete="one-time-code"
          style="
            width:100%; box-sizing:border-box;
            border:1.5px solid #0F172A; border-radius:8px;
            padding:10px 12px; font-size:22px; font-weight:700;
            letter-spacing:0.18em; text-align:center;
            background:#fff; color:#0F172A; outline:none;
          "
        />

        <div id="vsa-auth-status" style="display:none; margin-top:8px; font-size:12px; font-weight:600;"></div>

        <button
          id="vsa-auth-primary-btn"
          type="button"
          disabled
          style="
            margin-top:12px; width:100%; height:44px;
            border-radius:10px; border:none;
            background:#2563EB; color:#fff;
            font-size:15px; font-weight:700;
            cursor:not-allowed; opacity:0.6;
            transition: opacity 0.15s;
          "
        >
          Verify code
        </button>

        <div style="margin-top:12px; display:flex; gap:10px; align-items:center; font-size:13px;">
          <button
            id="vsa-auth-resend"
            type="button"
            style="
              background:none; border:none; padding:0;
              color:#2563EB; font-weight:700; font-size:13px;
              cursor:pointer;
            "
          >Resend code</button>

          <span style="color:#CBD5E1;">\u2022</span>

          <button
            id="vsa-auth-change-email"
            type="button"
            style="
              background:none; border:none; padding:0;
              color:#94A3B8; font-size:13px;
              cursor:pointer; text-decoration:underline;
            "
          >Use a different email</button>
        </div>
      </div>
    `}function d(){clearInterval(A);let u=document.getElementById(w);u&&u.remove()}function R({onSuccess:u}={}){we=u||null,pe()}globalThis.VSAAuthCard={init:R,destroy:d}})();var Ft=globalThis.VSASchema||{},{KBA_QUESTIONS:ht={},TIER_LIMITS:st={}}=Ft,lt=globalThis.VSAStorage||{},{getActiveProfile:kt,getGlobalSettings:Tt,updateActiveProfile:Lt,updateGlobalSettings:ft,upsertProfile:zt,setActiveProfileId:Mt,getStorageRoot:$t,deleteProfile:It}=lt,He=null;function Dt(){let m=Be("popupVersionLabel");if(!m)return;let k=chrome.runtime.getManifest();m.textContent=`v${k.version}`}async function dt(m){var C,w,T,c;let k=m||"free";typeof ft=="function"&&(await ft({tier:k}),He={...He||{},tier:k},(w=(C=globalThis.VSAProfileCard)==null?void 0:C.updateProfileCardSettings)==null||w.call(C,He),await((c=(T=globalThis.VSAPortalAssistCard)==null?void 0:T.refresh)==null?void 0:c.call(T)))}var Be=m=>document.getElementById(m);function Xe(m,k,C){let w=Be(m);w&&w.addEventListener(k,C)}function je(m){let k=Be("status");k&&(k.textContent=m,k.style.display="block",window.clearTimeout(je._t),je._t=window.setTimeout(()=>{k.style.display="none"},2500))}async function _t(){if((await chrome.storage.local.get("vsa_show_realtime_feed_onboarding")).vsa_show_realtime_feed_onboarding!==!0)return;await chrome.storage.local.remove("vsa_show_realtime_feed_onboarding");let k=Be("realtimeFeedOnboardingMount");k&&(k.innerHTML=`
    <div style="
      margin:10px 18px 0;
      padding:14px;
      background:#EFF6FF;
      border:1.5px solid #93C5FD;
      border-radius:10px;
      color:#1E293B;
      font-size:13px;
      line-height:1.5;
    ">
      <div style="
        font-size:19px;
        line-height:1.2;
        font-weight:900;
        color:#0F172A;
        margin-bottom:8px;
      ">
        Welcome to FindVisaSlots
      </div>

      <div style="
        font-weight:700;
        margin-bottom:7px;
      ">
        To get started and see real-time community slot info:
      </div>

      <div>1. Log in to the Visa Portal</div>
      <div>2. Go to the calendar page</div>
      <div>3. Community slot info will appear there automatically</div>
    </div>
  `)}function rt(){chrome.tabs.query({active:!0,currentWindow:!0},m=>{let k=m&&m[0]&&m[0].id;k&&chrome.tabs.sendMessage(k,{type:"VSA_PROFILE_UPDATED",source:"popup"},()=>{chrome.runtime.lastError})})}async function Rt(m={silent:!1}){var w;let C={tier:((w=Be("testTierSelector"))==null?void 0:w.value)||"free"};await ft(C),He={...He,...C},rt(),m.silent||je("Settings saved")}async function ut(m=!1){let k=await lt.getStorageRoot(),C=k.vsa_auth_token;if(!C)return;let w=Be("syncIcon"),T=Be("syncText");m&&(w&&w.classList.add("spinning"),T&&(T.textContent="syncing..."));let c=k.vsa_last_sync_at||0;if(!m&&Date.now()-c<300*1e3){Ze(k.vsa_user_email,k.vsa_user_tier,k.vsa_extension_tier),await dt(k.vsa_extension_tier||k.vsa_user_tier||"free");return}try{let{vsa_install_id:A}=await chrome.storage.local.get("vsa_install_id"),_=await fetch("https://getusvisa.ai/visa_scheduling/vsa/api_account_sync.cfm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:C,install_id:A||null})});if(_.status===403){await yt();return}let F=await _.json();if(F.session_valid===!1){await yt();return}if(F.ok){let D=F.extension_tier||F.tier||"free";await chrome.storage.local.set({vsa_user_id:F.id||k.vsa_user_id||null,vsa_user_tier:F.tier,vsa_extension_tier:D,vsa_user_email:F.email,vsa_last_sync_at:Date.now()}),await dt(D),Ze(F.email,F.tier,D)}}catch{Ze(k.vsa_user_email,k.vsa_user_tier,k.vsa_extension_tier)}finally{m&&setTimeout(()=>{w&&w.classList.remove("spinning"),T&&(T.textContent="refresh")},800)}}async function yt(){var m,k;try{await chrome.storage.local.remove(["vsa_auth_token","vsa_device_token","vsa_user_id","vsa_user_email","vsa_user_tier","vsa_extension_tier","vsa_tier_expires_at","vsa_last_sync_at"]),Ze(null,null,null),(m=globalThis.VSAAuthCard)==null||m.destroy(),(k=globalThis.VSAAuthCard)==null||k.init({onSuccess:async(C,w,T)=>{var c;Ze(C,w,T),await dt(T||w||"free"),ut(!0),(c=globalThis.VSAProfileCard)==null||c.initProfileCard({settings:He,showStatus:je,notify:rt,KBA_QUESTIONS:ht,TIER_LIMITS:st})}}),je("Logged out"),rt()}catch{je("Logout failed")}}function Ze(m,k,C){let w=Be("vsaIdentityBar");if(!w)return;w.style.display="block";let T=!!m,c=Be("tierBadge"),A=Be("displayEmail"),_=Be("btnSyncAccount"),F=Be("btnLogout"),D=Be("mobileOnlyPremiumNote");if(c&&(c.style.display=T?"":"none"),A&&(A.style.display=T?"":"none"),_&&(_.style.display=T?"":"none"),F&&(F.style.display=T?"":"none"),D&&(D.style.display="none"),!T)return;let y=k.toLowerCase(),h=C.toLowerCase(),Z=h==="tier_premium"?"PREMIUM":h==="tier_standard"?"STANDARD":h==="tier_agent"?"AGENT":"FREE";D.style.display=y==="tier_premium"&&h==="free"?"block":"none",A&&(A.textContent=m||"User"),c&&(c.textContent=Z,c.style.fontWeight="900",c.style.display="",h==="tier_agent"?(c.style.background="#7C3AED",c.style.color="#FFFFFF",c.style.border="1px solid #7C3AED",c.style.boxShadow="0 0 10px rgba(124, 58, 237, 0.4)"):h==="tier_premium"?(c.style.background="#00FF9D",c.style.color="#000000",c.style.border="1px solid rgba(255,255,255,0.2)",c.style.boxShadow="0 0 10px rgba(0, 255, 157, 0.3)"):h==="tier_standard"?(c.style.background="#FFD700",c.style.color="#000000",c.style.border="1px solid rgba(255,255,255,0.2)",c.style.boxShadow="0 0 10px rgba(255, 215, 0, 0.3)"):(c.style.background="transparent",c.style.color="#FFFFFF",c.style.border="1px solid #4B5563",c.style.boxShadow="none")),_&&(_.style.display=h==="free"?"inline-block":"none",_.style.color="#60A5FA",_.style.fontWeight="bold")}async function Wt(){var m,k;try{Dt(),await _t(),currentProfile=await kt(),He=await Tt();let C=await lt.getStorageRoot();C.vsa_auth_token?(Ze(C.vsa_user_email,C.vsa_user_tier,C.vsa_extension_tier),await dt(C.vsa_extension_tier||C.vsa_user_tier||"free"),ut(!1)):(Ze(null,null,null),(m=globalThis.VSAAuthCard)==null||m.init({onSuccess:async(c,A,_)=>{var F;Ze(c,A,_),await dt(_||A||"free"),ut(!0),(F=globalThis.VSAProfileCard)==null||F.initProfileCard({settings:He,showStatus:je,notify:rt,KBA_QUESTIONS:ht,TIER_LIMITS:st})}})),Xe("btnSyncAccount","click",c=>{c.preventDefault(),ut(!0)}),Xe("btnLogout","click",async c=>{c.preventDefault(),await yt()});let w=Be("testTierSelector");w&&(w.value=He.tier||"free",w.onchange=async()=>{var c;await Rt(),He=await Tt(),Ze(Be("displayEmail").textContent,w.value,w.value),(c=globalThis.VSAProfileCard)==null||c.updateProfileCardSettings(He)}),await Pt(),(k=globalThis.VSAProfileCard)==null||k.initProfileCard({settings:He,showStatus:je,notify:rt,KBA_QUESTIONS:ht,TIER_LIMITS:st}),Xe("toggleEdit","click",()=>toggleEditMode(!0)),Xe("btnAddProfile","click",async()=>{let c=await lt.getStorageRoot(),A=He.tier||"free",_=st[A]||st.free,F=c.profiles||{};if(Object.values(F).filter(h=>h.username).length>=_.maxProfiles){A==="free"||A==="tier_standard"?je("Multiple profiles require Premium or Agent tier"):A==="tier_premium"&&je("Agent tier supports unlimited profiles");return}isCreating=!0;let y=currentProfile;currentProfile={desiredSlotStartDate:null,desiredSlotEndDate:null},toggleEditMode(!0),currentProfile._restore=y});let T=Be("modalOverlay");Xe("btnDeleteProfile","click",()=>{currentProfile&&(Be("modalProfileName").textContent=currentProfile.applicantName||currentProfile.username,T.style.display="flex")}),Xe("modalCancel","click",()=>{T.style.display="none"}),Xe("modalConfirm","click",async()=>{if(T.style.display="none",!currentProfile||!currentProfile.activeProfileId)return;let c=currentProfile.activeProfileId,A=await lt.getStorageRoot(),F=Object.keys(A.profiles||{}).find(D=>{var y;return D!==c&&((y=A.profiles[D])==null?void 0:y.username)})||"default";await Mt(F),await It(c),currentProfile=await kt(),je("Profile Deleted"),rt()}),Xe("cancelProfileInside","click",()=>{isCreating=!1,toggleEditMode(!1)}),Xe("saveProfileInside","click",async()=>{je("Use the profile card to save profiles")})}catch{}}document.addEventListener("DOMContentLoaded",Wt);async function Pt(){try{let m=await new Promise(A=>{chrome.tabs.query({active:!0,currentWindow:!0},A)}),k=m&&m[0],C=String((k==null?void 0:k.url)||""),w=C.includes("usvisascheduling.com")||C.includes("atlasauth.b2clogin.com"),T=Be("portalCtaContainer"),c=Be("btnGoToPortalGhost");if(!T||!c)return;w?(T.style.display="none",c.onclick=null):(T.style.display="block",c.onclick=()=>{chrome.tabs.create({url:"https://www.usvisascheduling.com/"})})}catch{}}})();
