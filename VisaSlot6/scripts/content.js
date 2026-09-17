(()=>{function K(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function v(t){return K()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,i]of Object.entries(t))e[n]=i;return e}):Promise.resolve(typeof t=="string"?{}:t)}function _(t){return K()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function Ai(t){return K()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function Di(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",i=>{String(i.reason?.message||i.reason||"").includes("Extension context invalidated")&&(i.preventDefault(),e())});let n=setInterval(()=>{K()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var ne="https://the.gopg.online",Sn=`${ne}/contribute`,Ei=`${ne}/contribute/telegram`,Yc=`${ne}/contribute/human-click`;var Ii=20,Li=4320*60*1e3,Ie=100,Pi=4,Le=100,qi=240,Ri=50,Oi=1440*60*1e3,ca={recheckButton:!1,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function x(t){return v({[t]:ca[t]}).then(e=>e[t])}function mt(){return v({posts:[]}).then(t=>t.posts)}function Nt(t){return _({posts:t})}function z(){return v("profile").then(t=>t.profile)}var Dt=t=>String(t).padStart(2,"0");function ie(t){let e=Dt(t%60),n=Math.floor(t/60)%60,i=Math.floor(t/3600);return i?`${Dt(i)}:${Dt(n)}:${e}`:`${Dt(n)}:${e}`}function Wi(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${Dt(n.getUTCHours())}:${Dt(n.getUTCMinutes())}:${Dt(n.getUTCSeconds())}`}}function xn(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),i=t%60,o=[];return e>0&&o.push(`${e}d`),(n>0||e>0)&&o.push(`${n}h`),o.push(`${i}m`),o.join(" ")}function Ni(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),i=o=>n.find(r=>r.type===o)?.value??"";return`${i("month")} ${i("day")} ${i("year")} ${i("hour")}:${i("minute")} ${i("dayPeriod")}`}function Hi(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),i=parseInt(e[2],10),o=parseInt(e[3],10),r=e[4];r&&(r.toUpperCase()==="PM"&&n<12&&(n+=12),r.toUpperCase()==="AM"&&n===12&&(n=0));let s=new Date;return s.setHours(n,i,o,0),s.getTime()>Date.now()+6e4&&s.setDate(s.getDate()-1),s}var Bi=Symbol(),la=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&K()}on(t,e,n,i){t.addEventListener(e,n,{...i,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!K())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=Pi,interval:n=Ie}={}){return new Promise(i=>{let o=r=>{if(!this.alive)return;let s=document.querySelector(t);if(s)return i(s);if(r>=e)return i(null);this.setTimeout(()=>o(r+1),n)};o(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},c=new la;function Fi(){let t=globalThis[Bi];Object.defineProperty(globalThis,Bi,{value:c,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var Pe=new Uint32Array(2);crypto.getRandomValues(Pe);var Ui="abcdefghjkmnpqrstuvwxyz",ua=(Pe[0].toString(36)+Pe[1].toString(36)).replace(/[^a-z0-9]/g,""),d=(Ui[Pe[0]%Ui.length]+ua).slice(0,8).padEnd(8,"x");function p(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var a={selRow:d+"01",anchor:d+"02",waitTime:d+"03",recheck:d+"04",histCont:d+"05",histTbl:d+"06",cdCard:d+"07",cdTime:d+"08",ofcDate:d+"09",styles:d+"10",datesCont:d+"11",datesPara:d+"12",slotsTbl:d+"12b",aiBtn:d+"13",aiPanel:d+"14",aiFrom:d+"15",aiTo:d+"16",aiStatus:d+"17",aiConfirm:d+"18",aiCancel:d+"19",aiClose:d+"20",aiCities:d+"21",aiSubmitBtn:d+"22",aiCitiesBtn:d+"23",aiLogin:d+"24",aiPass:d+"25",aiQ1:d+"26",aiA1:d+"27",aiQ2:d+"28",aiA2:d+"29",aiQ3:d+"30",aiA3:d+"31",aiSaveLogin:d+"32",cfHud:d+"33",aiCitiesAll:d+"34",aiCitiesNone:d+"35",aiLoginToggle:d+"36",aiLoginBody:d+"37",aiSubmitOn:d+"38",aiSubmitOff:d+"39",aiCitiesOn:d+"40",aiCitiesOff:d+"41",aiWinList:d+"42",aiWinAdd:d+"43",aiWinSave:d+"44",aiWinReset:d+"45",aiWinNote:d+"46",aiSubmitSw:d+"47",aiCitiesSw:d+"48",aiInfoBox:d+"49",aiWarnBox:d+"50",aiOkBox:d+"51",aiWinCard:d+"52",aiSubmitBody:d+"53",aiCitiesBody:d+"54",aiTerms:d+"55",aiTermsAgree:d+"56",aiTermsGate:d+"57",aiMain:d+"58",aiTermsContinue:d+"59"},u={pill:d+"a",pillTtl:d+"b",pillTmr:d+"c",pillWait:d+"d",pillDone:d+"e",footer:d+"f",card:d+"g",cardTtl:d+"h",histScrl:d+"i",dltDn:d+"j",dltUp:d+"k",cdDiv:d+"l",hidden:d+"m",sideLink:d+"n",datesLnk:d+"o",slotsSum:d+"o2",slotsTbl:d+"o3",aiOn:d+"p",aiRow:d+"q",aiHint:d+"r",aiCities:d+"s",aiOnBtn:d+"t",aiCityAct:d+"x",cfHud:d+"u",cfPulse:d+"v",cfFlash:d+"w",aiEn:d+"y",aiDis:d+"z",aiWinRow:d+"aa",aiFeat:d+"ab",aiSwitch:d+"ac",aiKnob:d+"ad",aiSec:d+"ae",aiInfo:d+"af",aiWarn:d+"ag",aiOk:d+"ah",aiTrash:d+"ai",aiWinHelp:d+"aj",aiInline:d+"ak",aiHead:d+"al",aiTerms:d+"am",aiTermsCb:d+"an",aiTermsList:d+"ao",aiContinue:d+"ap"},C={mark:d,w:d+"w",mw:d+"mw"},pt={req:d+"q",res:d+"r",ofc:d+"o",err:d+"e",sub:d+"s"};function qe(t){return t.map(e=>String.fromCharCode(e)).join("")}function da(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function Ki(){let t=document.createElement("div");return t.className=u.footer,t.textContent=qe([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function fa(t){let e=document.getElementById(a.histCont);e&&e.remove(),e=document.createElement("div"),e.id=a.histCont,e.className=u.card,e.dataset[C.mark]="";let n=document.createElement("h4");n.className=u.cardTtl,n.textContent=qe([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let i=document.createElement("div");i.className=u.histScrl;let o=document.createElement("table");o.id=a.histTbl;let r=document.createElement("thead"),s=document.createElement("tr");for(let f of["Time","Est. Wait","Change"]){let h=document.createElement("th");h.textContent=f,s.appendChild(h)}r.appendChild(s),o.appendChild(r);let l=document.createElement("tbody");for(let f=t.length-1;f>=0;f--){let h=t[f],g="--",w="";if(f>0){let H=h.minutes-t[f-1].minutes;H<0?(g=`${H}m`,w=u.dltDn):H>0?(g=`+${H}m`,w=u.dltUp):g="0m"}let T=document.createElement("tr"),U=[[h.timeStr,""],[xn(h.minutes),""],[g,w]];for(let[H,Q]of U){let S=document.createElement("td");Q&&(S.className=Q),S.textContent=H,T.appendChild(S)}l.appendChild(T)}o.appendChild(l),i.appendChild(o),e.appendChild(i),e.appendChild(Ki());let m=document.getElementById("last-updated");m&&(m.closest("div, p, section")||m.parentElement).insertAdjacentElement("afterend",e)}function ma(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function zi(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),i=ma();if(i!==null&&i>qi&&!e.textContent.includes("(")){let s=xn(i);e.textContent=`${e.textContent} (${i} minutes / ${s})`}let o=n.textContent.trim().split(" (")[0],r=Hi(o);if(r&&c.setInterval(()=>{let s=Math.floor((Date.now()-r)/1e3);s>=0&&(n.textContent=`${o} (${s}s ago)`)},1e3),i!==null){let s=da(),l=sessionStorage.getItem(s);l||(l=Math.random().toString(36).substring(2,11),sessionStorage.setItem(s,l)),v({queueHistory:{}}).then(m=>{let f=m.queueHistory||{},h=Date.now(),g={};for(let[H,Q]of Object.entries(f)){if(!Array.isArray(Q))continue;let S=Q[Q.length-1];S&&h-S.timestamp<Oi&&(g[H]=Q)}let w=g[l]||[],T=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),U=w[w.length-1];(!U||U.minutes!==i||U.timeStr!==T)&&(w.push({timestamp:h,timeStr:T,minutes:i}),w.length>Ri&&w.shift(),g[l]=w,_({queueHistory:g})),fa(w)})}}function Gi(t,e){let n=document.getElementById("error_row");if(!n)return;let i;t?i=e?`Blocked for 24 hours, about ${ie(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":i="Temporarily blocked. Log in in a new tab, then refresh this page.";let o=document.createElement("div");o.className="atlas_validationalert alert alert-danger warning",o.dataset[C.mark]="",o.textContent=i,n.replaceChildren(o),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function Yi(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&v({cfRetryAfter:null}).then(n=>{let i=parseInt(n.cfRetryAfter,10);if(!isNaN(i)){Ai("cfRetryAfter");let o=document.getElementById("what-happened-section");if(o){let r=document.createElement("div");r.id=a.cdCard,r.className=u.card,r.dataset[C.mark]="";let s=document.createElement("h4");s.className=u.cardTtl,s.textContent=qe([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),r.appendChild(s);let l=document.createElement("div");l.id=a.cdTime,r.appendChild(l);let m=document.createElement("div");m.className=u.cdDiv,r.appendChild(m),r.appendChild(Ki()),o.appendChild(r);let f=i,h=null,g=()=>{f>0?(l.textContent=ie(f),f--):(l.classList.add(u.cdDiv+"-over"),l.textContent="You can try refreshing now!",h!=null&&c.clear(h))};g(),h=c.setInterval(g,1e3)}}})}async function ji(){let t=document.querySelector(".username");if(!t)return;let n=(t.innerText||"").trim().match(/^(.*)\((\d+)\)\s*$/);if(!n)return;let[,i,o]=n,r=await z()||{},s=!r.id||r.id===o||String(r.id).includes(o)?r:{};s.name=i.trim(),s.id=o;let l=document.querySelectorAll("script");for(let m of l){let f=m.innerText.trim();if(f.includes("setAuthenticatedUserContext")){let h=/setAuthenticatedUserContext\('([^']*)'\)/,g=f.match(h);g&&(s.email=g[1])}}await _({profile:s})}async function Vi(){let t=document.querySelector("#post_select");if(!t)return;let e=await mt();for(let n of t.options){if(!n.value)continue;e.findIndex(o=>o.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await Nt(e)}var pa=["visa-information","fee-payment","appointment-confirmation"];function ha(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(i=>{let o=i.querySelector(".text-bold");if(!o)return;let r=ga(o.textContent);if(!pa.includes(r))return;let s=ba(i);s&&(n[r]=s)}),Object.keys(n).length?n:null}function ga(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function ba(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function Xi(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>Li)return null}catch{}return t.value}function ya(t){let e=(t.posts||[]).filter(o=>o.Updated).sort((o,r)=>o.Updated-r.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},i=Xi(t.cgiIdToken);return i&&(n.token=i),n}async function vn(){if(!K()||!await x("serverSync"))return;let t=await v(["profile","posts","cgiIdToken"]),e=ya(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await fetch(Sn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(o=>o.json());if(!n.success)return;let i="0";n.contribs>0&&(i=n.contribs.toString()),n.contribs>10&&(i="10+"),n.contribs>0&&await _({contribs:{email:t.profile?.email,updated:Date.now(),count:i}})}catch{}}function Tn(t=0){K()&&document.querySelector("#appointment-card")&&x("serverSync").then(e=>{if(!e)return;let n=ha();if(!n){t<Ii&&c.setTimeout(()=>Tn(t+1),Ie);return}v(["profile","cgiIdToken","savedDashboard"]).then(i=>{let o=Xi(i.cgiIdToken);o&&JSON.stringify(n)!==JSON.stringify(i.savedDashboard)&&fetch(Sn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:i.profile,dashboard:n,token:o})}).then(r=>r.json()).then(r=>{r.success&&_({savedDashboard:n})}).catch(()=>{})})})}var wa=`${ne}/extension-runtime-config.json`,Cn="vsRuntimeConfig",Sa=300*1e3,_n=0,oe=null,y={slotWindowLabel:":05\u2013:13, :14\u2013:21, :24\u2013:31, :35\u2013:50, :54\u2013:02",slotWindows:[{slot:5,fromMin:0,toMin:2},{slot:1,fromMin:5,toMin:13},{slot:2,fromMin:14,toMin:21},{slot:3,fromMin:24,toMin:31},{slot:4,fromMin:35,toMin:50},{slot:5,fromMin:54,toMin:59}],windowStartsMin:[0,5,14,24,35,54],cityLoadingMaxMs:18e4,cityCalendarNoDatesMs:2e4,cityRotateMinGapMs:13e3,cityRotateMaxGapMs:18e3,cityHoldMaxMs:45e3,homeKeepaliveMinMs:6e5,homeKeepaliveMaxMs:6e5,homeKeepaliveDebounceMs:48e4,loadingStuckMs:12e4,loadingStuckDebounceMs:9e4,remoteVersion:0,source:"bundled"};function B(t,e,n,i){let o=Number(t);return Number.isFinite(o)?Math.min(n,Math.max(e,Math.round(o))):i}function xa(t){if(!Array.isArray(t)||!t.length||t.length>24)return null;let e=[];for(let n of t){let i=B(n?.fromMin,0,59,NaN),o=B(n?.toMin,0,59,NaN);if(!Number.isFinite(i)||!Number.isFinite(o)||i>o)return null;let r=B(n?.slot,1,12,1);e.push({slot:r,fromMin:i,toMin:o})}return e}function va(t){let e=[...new Set(t.map(n=>n.fromMin))].sort((n,i)=>n-i);return e.length?e:y.windowStartsMin.slice()}function Qi(t,e="remote"){if(!t||typeof t!="object")return!1;let n=xa(t.slotWindows);if(n){y.slotWindows.length=0;for(let i of n)y.slotWindows.push(i);y.windowStartsMin=va(n)}return typeof t.slotWindowLabel=="string"&&t.slotWindowLabel.length<120&&(y.slotWindowLabel=t.slotWindowLabel),y.cityLoadingMaxMs=B(t.cityLoadingMaxMs,1e4,3e5,y.cityLoadingMaxMs),y.cityCalendarNoDatesMs=B(t.cityCalendarNoDatesMs,5e3,12e4,y.cityCalendarNoDatesMs),y.cityRotateMinGapMs=B(t.cityRotateMinGapMs,5e3,6e4,y.cityRotateMinGapMs),y.cityRotateMaxGapMs=B(t.cityRotateMaxGapMs,y.cityRotateMinGapMs,9e4,Math.max(y.cityRotateMinGapMs,y.cityRotateMaxGapMs)),y.cityHoldMaxMs=B(t.cityHoldMaxMs,1e4,18e4,y.cityHoldMaxMs),y.homeKeepaliveMinMs=B(t.homeKeepaliveMinMs,12e4,18e5,y.homeKeepaliveMinMs),y.homeKeepaliveMaxMs=B(t.homeKeepaliveMaxMs,y.homeKeepaliveMinMs,18e5,Math.max(y.homeKeepaliveMinMs,y.homeKeepaliveMaxMs)),y.homeKeepaliveDebounceMs=B(t.homeKeepaliveDebounceMs,6e4,18e5,y.homeKeepaliveDebounceMs),y.loadingStuckMs=B(t.loadingStuckMs,3e4,6e5,y.loadingStuckMs),y.loadingStuckDebounceMs=B(t.loadingStuckDebounceMs,3e4,6e5,y.loadingStuckDebounceMs),y.remoteVersion=B(t.version,0,1e9,y.remoteVersion),y.source=e,!0}async function Ta(){try{let e=(await v(Cn))[Cn];e?.config&&Qi(e.config,"cache")}catch{}}async function _a(t){try{await _({[Cn]:{config:t,fetchedAt:Date.now()}})}catch{}}async function Ca({force:t=!1}={}){let e=Date.now();if(!t&&e-_n<Sa)return y;if(oe)return oe;oe=(async()=>{await Ta();try{let n=await fetch(wa,{method:"GET",cache:"no-store",signal:AbortSignal.timeout(8e3)});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.json();if(!i||typeof i!="object"||Array.isArray(i))throw new Error("bad json");if(i.script||i.code||i.eval)throw new Error("unsafe keys");Qi(i,"remote"),await _a(i),_n=Date.now()}catch{_n=Date.now()}return y})();try{return await oe}finally{oe=null}}function Zi(){Ca().catch(()=>{})}var ht=null,re=null;function Ji(){return ht||y.slotWindows}function nt(){return re||(ht?.length?to(ht):y.slotWindowLabel)}var hl=y.slotWindows,lt=4,gt=6;function to(t){return t?.length?t.map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", "):y.slotWindowLabel}function $n(t){if(!Array.isArray(t))return[];let e=[];for(let n of t){if(e.length>=lt)break;let i=Number(n?.fromMin),o=Number(n?.durationMin??n?.duration);if(!Number.isFinite(i)||i<0||i>59)continue;let r=Math.min(gt,59-i);if(r<1)continue;if(!Number.isFinite(o)||o<1){let l=Number(n?.toMin);if(!Number.isFinite(l)||l<i||l>59||(o=Math.min(r,l-i),o<1))continue}o=Math.min(r,Math.max(1,Math.round(o)));let s=Math.min(59,i+o);e.push({slot:e.length+1,fromMin:Math.round(i),toMin:s,durationMin:o})}return e}function eo(t){let e=$n(t||[]);return e.length?(ht=e.map(({slot:n,fromMin:i,toMin:o})=>({slot:n,fromMin:i,toMin:o})),re=to(ht),ht):(ht=null,re=null,null)}function kn(){ht=null,re=null}function no(t){let e=t?.length?t:y.slotWindows,n=[];for(let i of e||[]){if(n.length>=lt)break;let o=Number(i.fromMin),r=Number(i.toMin);if(!Number.isFinite(o)||!Number.isFinite(r)||r<o||o===0&&r<=2&&(e||[]).some(m=>Number(m.fromMin)>=54))continue;let s=Math.min(gt,59-o);if(s<1)continue;let l=Math.min(s,Math.max(1,r-o));n.push({fromMin:o,durationMin:l})}return n}function io(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=i=>Number(e.find(o=>o.type===i)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function Ht(t=new Date){let{minute:e}=io(t),n=Ji();for(let i of n)if(e>=i.fromMin&&e<=i.toMin)return i.slot;return 0}function Re(t=new Date){if(Ht(t))return 0;let{minute:e,second:n}=io(t),i=e*60+n,o=Ji(),r=[...new Set(o.map(l=>l.fromMin))].sort((l,m)=>l-m);for(let l of r){let m=l*60;if(i<m)return(m-i)*1e3}let s=r[0]??0;return(3600-i+s*60)*1e3}function Mn(t){return t<9e4?`${Math.ceil(t/1e3)}s`:`${Math.ceil(t/6e4)}m`}function uo(){let t=document.querySelector(p(a.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=a.selRow,t.dataset[C.mark]="",n.insertAdjacentElement("afterend",t);let i=document.createElement("span");return i.id=a.anchor,i.dataset[C.mark]="",i.dataset[C.w]=e.style.width,i.dataset[C.mw]=e.style.minWidth,i.hidden=!0,e.insertAdjacentElement("beforebegin",i),c.setStyle(e,"width","100%"),c.setStyle(e,"minWidth","0"),t.appendChild(e),t}var ae="waitPillState",$a=3600*1e3,oo=u.pillWait,ka=u.pillDone;function Ma(t,e){let n=document.createElement("span");n.className=`${u.pill} ${e}`;let i=(o,r)=>{let s=document.createElement("span");s.className=o,s.textContent=r,n.appendChild(s)};return i(u.pillTtl,t.title),t.timer!==void 0&&i(u.pillTmr,t.timer),n}function Aa(t,e=Date.now()){if(t.kind==="waiting")return{variant:oo};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:oo}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:ka}}return null}function Da(t,e,n=new Date){let i=Wi(n);return t.seconds===void 0?{title:i}:{title:i,timer:ie(t.seconds)}}var Ea=class{#t=null;#e={kind:"idle"};#i=null;#n=null;#o=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get(ae))[ae];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>$a){chrome.storage.local.remove(ae);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#o=t,this.#r(),this.#c()}toggleClockMode(){c.alive&&(this.setClockMode(!this.#o),chrome.storage.local.set({waitPillClock:this.#o}))}render(t){return Aa(this.#e,t)}#l(t){return Da(t,this.#o,new Date)}#r(){if(this.#t??=La(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(u.hidden);return}this.#t.classList.remove(u.hidden),this.#t.replaceChildren(Ma(this.#l(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#i&&(c.clear(this.#i),this.#i=null),t.kind==="running"?(chrome.storage.local.set({[ae]:t}),this.#i=c.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove(ae),this.#r(),this.#c()}#u(){this.#r(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,x("audioAlert").then(t=>{t&&Ka()})))}#c(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=c.setInterval(()=>this.#r(),1e3):!t&&this.#n&&(c.clear(this.#n),this.#n=null)}},Ut=new Ea,ue="pillPosition",ro=4;function ao(t,e,n){return Math.max(e,Math.min(n,t))}function fo(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,i=e.height>0?e.height:36;return{w:n,h:i}}function Bt(t,e,n){let{w:i,h:o}=fo(t),r=ao(e,0,Math.max(0,window.innerWidth-i)),s=ao(n,0,Math.max(0,window.innerHeight-o));return t.style.setProperty("left",r+"px","important"),t.style.setProperty("top",s+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:r,top:s}}function Ia(t){var e=!1,n=!1,i=0,o=0,r=0,s=0;function l(f){if(e){var h=f.touches?f.touches[0]:f,g=h.clientX-i,w=h.clientY-o;!n&&Math.abs(g)<ro&&Math.abs(w)<ro||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",Bt(t,r+g,s+w),f.cancelable&&f.preventDefault())}}function m(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",m),document.removeEventListener("touchmove",l),document.removeEventListener("touchend",m),n){let f=t.getBoundingClientRect();chrome.storage.local.set({[ue]:{top:Math.round(f.top),left:Math.round(f.left)}})}n=!1}}t.addEventListener("mousedown",function(f){if(f.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let h=t.getBoundingClientRect();i=f.clientX,o=f.clientY,r=h.left,s=h.top,Bt(t,h.left,h.top),document.addEventListener("mousemove",l),document.addEventListener("mouseup",m),f.preventDefault(),f.stopPropagation()}),t.addEventListener("touchstart",function(f){e=!0,n=!1,delete t.dataset.skipClick;let h=t.getBoundingClientRect();i=f.touches[0].clientX,o=f.touches[0].clientY,r=h.left,s=h.top,Bt(t,h.left,h.top),document.addEventListener("touchmove",l,{passive:!1}),document.addEventListener("touchend",m)},{passive:!0})}function La(){let t=document.querySelector(p(a.waitTime));return t||(t=document.createElement("div"),t.id=a.waitTime,t.className=u.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),Ia(t),chrome.storage.local.get(ue).then(e=>{let n=e[ue];n&&typeof n.top=="number"&&typeof n.left=="number"&&Bt(t,n.left,n.top)}),Oa(t),t)}function so(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function Pa(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function qa(t){let{w:e,h:n}=fo(t),i=12;return[{left:i,top:i},{left:Math.max(i,window.innerWidth-e-i),top:i},{left:i,top:Math.max(i,window.innerHeight-n-i)},{left:Math.max(i,window.innerWidth-e-i),top:Math.max(i,window.innerHeight-n-i)}]}async function Ra(){let e=(await chrome.storage.local.get(ue))[ue];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function Oa(t){let e=!1,n=async()=>{if(!c.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(u.hidden))return;let i=Pa(),o=!!(i&&i.offsetParent!==null&&i.getBoundingClientRect().height>20),r=t.getBoundingClientRect();if(o&&so(r,i.getBoundingClientRect())){let s=i.getBoundingClientRect(),l=qa(t),m=l.find(f=>{let h={left:f.left,top:f.top,right:f.left+r.width,bottom:f.top+r.height};return!so(h,s)})||l[2];e=!0,t.setAttribute("data-dodging",""),Bt(t,m.left,m.top);return}if(e&&!o){e=!1,t.removeAttribute("data-dodging");let s=await Ra();s&&Bt(t,s.left,s.top)}else o||t.removeAttribute("data-dodging")};c.setInterval(n,400),c.on(window,"resize",n)}async function En(){if(!c.alive||!await x("defaultWaitTime")||!await c.waitFor("#post_select",{attempts:Le}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});Ut.setClockMode(t),await Ut.restore()}async function mo(){await x("defaultWaitTime")&&Ut.waiting()}async function Be(t){await x("defaultWaitTime")&&Ut.run(t)}function po(){Ut.toggleClockMode()}function ho(t){Ut.setClockMode(t)}var se=null,ce=null,Oe=null;function go(){return Oe||(Oe=new(window.AudioContext||window.webkitAudioContext),c.disposable(()=>Oe?.close())),Oe}async function In(t=150){try{let e=go();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let o=e.currentTime,r=t/1e3;i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(.1,o+.01),i.gain.setValueAtTime(.1,o+Math.max(.01,r-.02)),i.gain.linearRampToValueAtTime(0,o+r),n.start(),n.stop(o+r)}catch(e){console.error("Audio beep failed:",e)}}function Wa(t,e=125,n=125){let i=0,o=()=>{i>=t||(In(e),i++,c.setTimeout(o,e+n))};o()}var An=4,co=50,lo=50,Na=600;function bo(){if(ce)return;let t=()=>{Wa(An,co,lo);let e=An*co+(An-1)*lo;ce=c.setTimeout(t,e+Na)};t()}var Ha=250,Ba=10,Fa=300,Ua=1e3;function Ka(){if(se)return;let t=[];for(let o=0;o<=Fa;o+=Ba)t.push(o);let e=Date.now(),n=0,i=()=>{let o=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&o>=t[n];){let r=n===t.length-1;In(r?Ua:Ha),n++}if(n<t.length){let r=t[n],s=e+r*1e3,l=Math.max(0,s-Date.now());se=c.setTimeout(i,l)}else Kt()};i()}function Kt(){se&&(c.clear(se),se=null),ce&&(c.clear(ce),ce=null),Dn()}var We=null,Ne=null,Ft=null,He=null,le=null;async function yo(){Dn();try{let t=go();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=880,i.frequency.value=1320,o.gain.value=.85,r.gain.value=.65,n.connect(o).connect(e),i.connect(r).connect(e);let s=t.createOscillator(),l=t.createGain();s.type="triangle",s.frequency.value=3.2,l.gain.value=280,s.connect(l),l.connect(n.frequency),l.connect(i.frequency);let m=t.currentTime;n.start(m),i.start(m),s.start(m),Ft={osc1:n,osc2:i,lfo:s,master:e};let f=()=>{Ft&&(In(500),Ne=c.setTimeout(f,1800))};f(),We=c.setTimeout(Dn,12e4),le=document.title;let h=!1,g=()=>{Ft&&(document.title=h?le:"!!! SUBMIT CLICKED !!!",h=!h,He=c.setTimeout(g,450))};g()}catch(t){console.error("Submit alarm failed:",t)}}function Dn(){if(We&&(c.clear(We),We=null),Ne&&(c.clear(Ne),Ne=null),He&&(c.clear(He),He=null),le&&(document.title=le,le=null),Ft){try{let{osc1:t,osc2:e,lfo:n}=Ft;t.stop(),e.stop(),n.stop()}catch{}Ft=null}}function za(){document.querySelector(p(a.recheck))?.remove();for(let t of document.querySelectorAll("button"))(t.textContent||"").trim()==="Recheck"&&t.remove()}async function Ln(){c.alive&&za()}async function qn(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await c.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let i=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(l=>l.innerText.trim()===i))continue;let r=document.createElement("li");r.className="usa-sidenav__item",r.dataset[C.mark]="";let s=document.createElement("a");s.href=n.link,s.className=u.sideLink,s.target="_self",s.textContent=n.text,r.appendChild(s),t.appendChild(r)}}function $(t,e,n){let i=document.createElement(t);return e&&(i.className=e),n?.appendChild(i),i}function Fe(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,r]=n;return`${r}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return null}function Pn(t){let e=Fe(t);if(!e)return String(t||"");let[n,i,o]=e.split("-").map(Number);if(!n||!i||!o)return e;try{return new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(new Date(n,i-1,o))}catch{return e}}function Ga(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);if(n)return n[1].slice(0,5);let i=e.match(/^(\d{1,2}:\d{2})/);return i?i[1]:e}function wo(t){let e=document.querySelector(p(a.datesCont));if(e){let o=e.querySelector(p(a.datesPara)),r=e.querySelector("h2");if(r&&t&&(r.textContent=t),o)return{container:e,details:o}}let n=document.querySelector("#page_form");if(!n)return null;e?.remove();let i=Ya(t||"");return n.appendChild(i.container),i}function So(t){if(t.response.HasError)return;let e=document.querySelector("#post_select"),n=e?.options[e.selectedIndex]?.text??"",i=(t.response.ScheduleDays||[]).map(f=>Fe(f?.Date)).filter(Boolean).sort((f,h)=>f.localeCompare(h));document.querySelector(p(a.datesCont))?.remove();let o=wo(n);if(!o)return;let{details:r}=o;r.replaceChildren();let s=$("div",u.slotsSum,r);if(!i.length){s.textContent="No slots available";return}s.textContent=`${i.length} date${i.length===1?"":"s"} available`;let l={};for(let f of i){let h=f.slice(0,7);(l[h]||=[]).push(f)}for(let[f,h]of Object.entries(l)){let g=$("div",null,r),w=document.createElement("strong");w.textContent=f,g.append(w,`: ${h.map(T=>T.slice(8,10)).join(", ")}`)}let m=$("div",null,r);m.style.marginTop="0.5em";for(let f of i){let h=$("div",null,m);h.textContent=`\u2022 ${Pn(f)} (${f})`}}function xo(t,e,n){let i=document.querySelector("#post_select"),o=n||i?.options[i.selectedIndex]?.text||"",r=Fe(e)||Fe(t?.[0]?.Date)||"",s=(t||[]).filter(S=>S&&S.Time).map(S=>({time:Ga(S.Time),avail:S.EntriesAvailable!=null&&Number.isFinite(Number(S.EntriesAvailable))?Number(S.EntriesAvailable):null,raw:S})).sort((S,W)=>String(S.time).localeCompare(String(W.time))),l=wo(o);if(!l)return;let{details:m}=l;m.replaceChildren();let f=$("div",u.slotsSum,m);if(!s.length){f.textContent=r?`No time slots on ${Pn(r)}`:"No time slots available";return}let h=s.filter(S=>S.avail==null||S.avail>0),g=h.reduce((S,W)=>S+(W.avail||0),0),w=r?Pn(r):"selected date";if(f.textContent=g>0?`${h.length} time slot${h.length===1?"":"s"} on ${w} \xB7 ${g} available`:`${s.length} time slot${s.length===1?"":"s"} on ${w}`,r){let S=$("div",null,m);S.style.margin="0.35em 0 0.6em",S.textContent=`Date: ${w} (${r})`}let T=$("table",u.slotsTbl,m);T.id=a.slotsTbl;let U=$("thead",null,T),H=$("tr",null,U);for(let S of["Time","Availability"]){let W=$("th",null,H);W.textContent=S}let Q=$("tbody",null,T);for(let S of s){let W=$("tr",null,Q);S.avail===0&&(W.style.opacity="0.55");let At=$("td",null,W);At.textContent=S.time;let sa=$("td",null,W);sa.textContent=S.avail==null?"\u2014":String(S.avail)}}function Ya(t){let e=$("div","row");e.id=a.datesCont;let n=$("div","col-sm-12 atlas_section mt-3",e),i=$("div","col-sm-12 atlas_section_header_row",$("div","row",n));$("h2",null,i).textContent=t;let o=$("div",null,$("div","col-sm-12",$("div","row",n)));return o.id=a.datesPara,{container:e,details:o}}var vo=null;function ja(){let t=document.querySelector(p(a.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return c.setStyle(n,"display","flex"),c.setStyle(n,"alignItems","center"),c.setStyle(n,"justifyContent","flex-end"),c.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=a.ofcDate,t.dataset[C.mark]="",e.insertAdjacentElement("beforebegin",t),t}function Va(){if(!location.pathname.includes("/schedule"))return;let t=vo;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=ja();n&&(n.textContent=`OFC (Estimate): ${Ni(e.appointmentDateStr)}`)}function To(t){chrome.runtime?.id&&(vo=t.data.data,c.waitFor("#submitbtn").then(e=>{e&&Va()}))}var Ue=new Map,_o=45e3,Ke=new Map,Co=8e3,$o=0;function ze(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function Ge(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function Xa(t,e){return`${t}:${e.slice(0,5).join(",")}`}function Qa(t){let e=Date.now(),n=Ue.get(t);if(n&&e-n<_o)return!1;Ue.set(t,e);for(let[i,o]of Ue)e-o>_o*4&&Ue.delete(i);return!0}function Za(t){let e=Date.now(),n=Ke.get(t);if(n&&e-n<Co)return!1;Ke.set(t,e);for(let[i,o]of Ke)e-o>Co*6&&Ke.delete(i);return!0}async function ko(){return await x("telegramViaServer")!==!1}async function Mo(t,{kind:e="alert",dedupKey:n="",skipDedup:i=!1,notifyMuktesh:o=!0}={}){if(t&&await ko())try{await fetch(Ei,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:i,notify_muktesh:o}),signal:AbortSignal.timeout(2e4)})}catch{}}function Ja(t,{kind:e="screen",dedupKey:n="",waitMs:i=0,skipDedup:o=!1,notifyMuktesh:r=!0}={}){c.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:i,skipDedup:o,notifyMuktesh:r,captureScreenshot:!0})}async function ts(t,e,n){let i=ze(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&r.push(`\u{1FAAA} <b>Visa:</b> ${n}`),r.push(`\u{1F550} <b>Checked:</b> ${o} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),r.push(`\u{1F4C6} <b>Dates (${i.length}):</b>`,"");for(let s of i.slice(0,30))r.push(`\u{1F7E2} <b>${Ge(s)}</b>`);return i.length>30&&r.push("",`\u2795 <i>+${i.length-30} more dates</i>`),r.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),r.join(`
`)}function es(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",i=document.querySelector("#datepicker")?.value||"\u2014",r=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:i,time:r}}async function Ao(t,{postId:e,postName:n,hasError:i}={}){if(i||!t?.length)return;let o=ze(t);if(!o.length||!await x("telegramAlert"))return;let r=Xa(e||n||"unknown",o);if(!Qa(r))return;let s=await z(),l=await ts(n,t,s?.visa||"");await Mo(l,{kind:"slots",dedupKey:r,notifyMuktesh:!0})}function ns(t,e,n){let i=ze(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`;if(i.length){let s=i.slice(0,5).map(l=>Ge(l)).join(", ");return`<b>DATES AVAILABLE</b>
\u{1F3DB}\uFE0F ${r}
\u{1F4C6} ${i.length} date(s)
${s}${i.length>5?"\u2026":""}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}return`<b>City changed \u2014 no dates</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}function is(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=e?Ge(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${i}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function os(t,e,n){let i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?Ge(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u23F0 ${n} slot(s)
\u{1F550} ${i} IST
\u{1F4F2} Visa Slot 6`}async function zt(t,{kind:e="screen",dedupKey:n,waitMs:i=0,skipDedup:o=!1}={}){if(await x("telegramScreenshots")===!1||!await ko())return;let r=n||`${e}:${String(t).slice(0,80)}`;!o&&!Za(r)||Ja(t,{kind:e,dedupKey:r,waitMs:i,skipDedup:o,notifyMuktesh:!0})}async function Do(t,{postId:e,postName:n,hasError:i}={}){let o=ns(n,t,i),r=ze(t),s=r.length?"dates":"city";await zt(o,{kind:s,dedupKey:`${s}:${e||n}:${r.length}:${i?1:0}`,waitMs:r.length?1400:900})}async function Eo(t,e){await zt(is(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function Io(t,e,n){await zt(os(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function Lo(){let t=Date.now();if(t-$o<8e3)return;$o=t;let e=await z(),{city:n,date:i,time:o}=es(),r=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),s=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${i}`,`\u23F0 <b>Time:</b> ${o}`];e?.email&&s.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&s.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),s.push(`\u{1F550} <b>When:</b> ${r} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let l=s.join(`
`);await Mo(l,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await zt(l,{kind:"submit",skipDedup:!0,waitMs:200})}var Ye=25;function rs(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function On(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let i=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,i),n-1)}function qo(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function Ro(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function Wn(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function Po(t){if(!t||t.disabled)return!1;try{let e=t.closest("tr"),i=[t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,t.closest("label"),t,e].filter(Boolean);for(let o of i)o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),o.click();(t.type==="radio"||t.type==="checkbox")&&(t.checked=!0),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function Oo(){let t=new Set,e=[],n=i=>{if(!i||t.has(i)||Wn(i)||i.disabled)return;let o=i.closest("tr");o&&Ro(o)||(t.add(i),e.push(i))};for(let i of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let o of document.querySelectorAll(`${i}:not([disabled])`))n(o);return e}function as(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!qo(n)||Ro(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function ss(t){for(let e of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(e.tagName!=="SELECT"||e.disabled||Wn(e))continue;let n=[...e.options].filter(o=>!o.disabled&&o.value&&o.value!=="0"&&qo({textContent:o.textContent}));if(!n.length)continue;let i=On(n.length,t);return e.value=n[i].value,e.dispatchEvent(new Event("change",{bubbles:!0})),!0}return!1}function cs(t){if(ss(t))return!0;let e=Oo();if(e.length){let i=On(e.length,t);if(Po(e[i]))return!0}let n=as();if(n.length){let i=On(n.length,t),o=n[i],r=o.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(r&&Po(r))return!0;let s=o.querySelector("label");if(s)return s.click(),!!o.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function N(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!Wn(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function ls({slotIndex:t=0,maxMs:e=12e3,pollMs:n=Ye,onTick:i}={}){let o=Date.now()+e,r=Math.max(10,n||25);return new Promise(s=>{let l=()=>{if(!c.alive)return s(!1);if(i?.(),cs(t)||N())return s(!0);if(Date.now()>=o)return s(!1);c.setTimeout(l,r)};l()})}function de({time:t,date:e,slotIndex:n,pollMs:i,maxMs:o}){let r=n??0,s=o||15e3,l=i||Ye;return c.send({action:"forcePickTimeSlot",slotIndex:r,maxMs:s,pollMs:l}),c.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:r,pollMs:l,domWaitMs:0,maxMs:s}),ls({slotIndex:r,maxMs:s,pollMs:l})}var Rn=!1;function Wo({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(Rn)return;Rn=!0;let i=!1,o=async()=>{if(!(!c.alive||i)){if(N()){n?.();return}try{if(t&&!await t())return}catch{return}Oo().length&&(i=!0,await de({slotIndex:e,time:"00:00",maxMs:800,pollMs:Ye}),i=!1,N()&&n?.())}};c.setInterval(o,Ye);let r=document.querySelector("#page_form")||document.body,s=new MutationObserver(()=>o());s.observe(r,{childList:!0,subtree:!0}),c.disposable(()=>{s.disconnect(),Rn=!1})}function No(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let i=rs(n?.Time);if(!i)continue;let o=i.match(/(\d{1,2}):(\d{2})/);if(!o)continue;let[,r,s]=o;if(e.includes(`${r}:${s}`)||e.includes(`${parseInt(r,10)}:${s}`))return!0}return!1}var je="submitErrors",Ho=50,us=45e3,Fo=0,Nn=new Set,fe=null;function ds(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",i=document.querySelector("#datepicker")?.value||"";return{city:e,date:i,url:location.href}}function me(){Fo=Date.now()+us,Nn.clear(),bs()}function Ve(){return Date.now()<Fo}function fs(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function ms(t){let e=await v({[je]:[]}),n=Array.isArray(e[je])?e[je]:[];n.push(t),n.length>Ho&&n.splice(0,n.length-Ho),await _({[je]:n})}function Bo(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function ps(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${Bo(t.source)}`,`\u{1F4AC} <b>Message:</b> ${Bo(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let i=n.join(`
`);await zt(i,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function pe(t,e,n={}){let i=String(e||"").trim();if(!i||!Ve()&&!n.force)return;let o=fs(t,i);if(Nn.has(o))return;Nn.add(o);let r=ds(),s=await z(),l={at:Date.now(),source:String(t||"unknown"),message:i.slice(0,2e3),city:n.city||r.city,date:n.date||r.date,url:n.url||r.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:s?.email||""};await ms(l);try{await ps(l)}catch{}}function hs(t){if(!Ve())return;let e=t?.status,n=t?.retryAfter,i=t?.cgiBlock,o=`Request failed (HTTP ${e||"?"})`;n!=null&&(o+=` \u2014 retry after ${n}s`),i&&(o+=" \u2014 CGI access limitation"),pe("ajax_error",o,{status:e})}function Uo(t){if(!Ve()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){hs({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",o=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";pe("ajax_response",o,{route:t.tail||""})}var gs=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function bs(){fe&&c.clear(fe);let t=()=>{if(!c.alive||!Ve()){fe=null;return}for(let e of gs)for(let n of document.querySelectorAll(e)){let i=(n.textContent||"").replace(/\s+/g," ").trim();!i||i.length<4||pe("page_validation",i)}fe=c.setTimeout(t,600)};fe=c.setTimeout(t,500)}var yt="aiSubmitByAccount",xe=8e3;var F=25,ys=80,Je=0,tn=1e4,er=1e3;function ve(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}function Qe(){return y.cityRotateMinGapMs}function ws(){return y.cityRotateMaxGapMs}function ye(){return y.cityHoldMaxMs}function it(){return y.cityLoadingMaxMs}function bt(){return y.cityCalendarNoDatesMs}var Ko=5e3,nr=2e4,Ss=15e3;function xt(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function zn(){return/\/ofc-schedule\b/i.test(location.pathname)}function M(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var xs=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function Xe(t,e){let n=xs[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(o=>{let r=e===o?" selected":"";return`<option value="${o.replace(/"/g,"&quot;")}"${r}>${o}</option>`}).join("")}function zo(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function Yt(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function vt(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function Lt(t){return!!(t&&t.citiesEnabled)}async function R(){let t=await z();return t?.id?String(t.id):null}async function P(t){return t&&((await v(yt))[yt]||{})[t]||null}async function ir(t,e){if(!t)return;let i=(await v(yt))[yt]||{};e==null?delete i[t]:i[t]=e,await _({[yt]:i})}var j=!1;function Te(){return j}function or(){j=!0,we(),be()}function Tt(){j=!1,I=!1,we()}async function rr(t){or();let e=await P(t);if(!e){X();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await ir(t,e),X()}function _e(t,e,n){let i=String(t||"").slice(0,10);return!(!i||i.length<10||e&&i<e||n&&i>n)}async function st(){if(j||M()||!xt())return null;let t=await R();if(!t)return null;let e=await P(t);return!vt(e)||!e.from||!e.to?null:{...e,accountId:t}}async function Ce(){if(j||M()||!xt())return null;let t=await R();if(!t)return null;let e=await P(t);return!Lt(e)||!e.cities?.length?null:(gr(e),{...e,accountId:t})}function Gn(t,e,n){let i=new Date;return i.setHours(0,0,0,0),(t||[]).filter(o=>o&&typeof o.Date=="string"&&o.Date.length>=10).filter(o=>_e(o.Date,e,n)).filter(o=>{let[r,s,l]=o.Date.slice(0,10).split("-").map(Number);return new Date(r,s-1,l)>=i}).sort((o,r)=>String(o.Date).localeCompare(String(r.Date)))}var I=!1,dt=null,wt=null,at=!1,St=0,G=!1,Y=0,Pt=0,he=0,ge=0,Vt=!1,ot=null,ut=0,D=!1,L=0,Gt=null,Et=null,jt=0,Go=!1,Yo="",jo=!1,Hn=0;function vs(t){return(t||[]).map(e=>e.id).join("")}function ar(){let t=document.querySelector(p(a.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function Vo(t){let e=document.querySelector(p(a.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function we(){dt&&(c.clear(dt),dt=null),I=!1}function qt(){Gt&&(c.clear(Gt),Gt=null)}function sr(){qt(),L||(L=Date.now());let t=Math.max(500,ye()-(Date.now()-L));Gt=c.setTimeout(()=>{Gt=null,!(!D||!G||!c.alive)&&(D=!1,L=0,V(Date.now()),b(`City Change \u2014 booking hold timed out (${ye()/1e3}s); next city in 13\u201318s\u2026`),A())},t)}function Ts(){Et&&(c.clear(Et),Et=null)}function en(t=Date.now()){let e=!1;if(at&&St&&t-St>=Ss&&(at=!1,St=0,e=!0),D&&(L||(L=t),t-L>=ye()?(qt(),D=!1,L=0,e=!0):Gt||sr()),Vt){ut||(ut=t);let i=Bn()?it():bt();if(t-ut>=i)tt(),e=!0;else if(!ot){let o=Math.max(500,i-(t-ut));ot=c.setTimeout(()=>{if(ot=null,!G||D)return;let r=Bn(),s=r?it():bt();if(Date.now()-(ut||0)<s){en();return}tt(),V(Date.now()),b(r?`City Change \u2014 still Loading after ${it()/1e3}s; changing city\u2026`:`City Change \u2014 calendar up but no dates after ${bt()/1e3}s; changing city\u2026`),A()},o)}}return I&&!dt&&(I=!1,e=!0),e}function cr(){if(Et||!G)return;let t=()=>{if(Et=null,!G||!c.alive||j)return;let e=Date.now(),n=en(e),i=!!Ht(new Date(e)),o=!!wt,s=!(!i&&o||(Vt||D||I)&&o)&&jt>0&&e-jt>=nr;if(n||s||!o&&!at)s?(at=!1,St=0,tt(),qt(),D=!1,L=0,I&&!dt&&(I=!1),Y=e,b(i?"City Change \u2014 unstuck; hopping now\u2026":`City Change \u2014 unstuck; waiting for IST window ${nt()}\u2026`)):n?(Y=e,b(i?"City Change \u2014 lock cleared; hopping now\u2026":`City Change \u2014 lock cleared; next IST window ${nt()}\u2026`)):b("City Change \u2014 timer lost; restarting\u2026"),A();else if(!i&&o){let m=Re(new Date(e));b(`City Change \u2014 waiting for slot window (IST ${nt()}, next in ${Mn(m)})`)}G&&(Et=c.setTimeout(t,Ko))};Et=c.setTimeout(t,Ko)}function be(){Xn(),Ts(),qt(),at=!1,St=0,G=!1,D=!1,L=0,Y=0,Pt=0,jt=0,tt()}function tt(){Vt=!1,ut=0,ot&&(c.clear(ot),ot=null)}function Yn(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let i=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(i))continue;let o=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let r of o)if(r&&/\bLoading\.{0,3}\b/i.test((r.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let o=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(o))continue;let r=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(r))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function Bn(){return Yn()}function _s(){Vt=!0,ut=Date.now(),ot&&c.clear(ot),ot=c.setTimeout(()=>{ot=null,!(!G||D)&&(tt(),V(Date.now()),b(`City Change \u2014 still Loading after ${it()/1e3}s; changing city\u2026`),A())},it())}function jn(t){let e=Math.max(0,Number(t)||0)*1e3;ge=Math.max(ge,Date.now()+e),Y=Math.max(Y,ge),tt(),A()}function lr(){tt()}function Xt(){j||(D=!0,L||(L=Date.now()),Xn(),tt(),sr(),b("City Change \u2014 paused (Auto Submit booking)\u2026"))}function _t(){D&&(qt(),D=!1,L=0,!(!G||j)&&(V(Date.now()),b("City Change \u2014 resuming; next city in 13\u201318s\u2026"),A()))}async function nn(){let t=await st();if(!t)return;let e=Date.now();if(e-Hn<6e4)return;Hn=e;let i=document.querySelector("#post_select")?.value;if(!i){b("Auto Submit ON \u2014 pick a city first.");return}let r=(await mt()).find(l=>String(l.ID)===String(i)),s=r?.Days;if(Array.isArray(s)&&s.length){let l=Gn(s,t.from,t.to);if(l.length){Xt();let m=ve(l.length),f=l[m].Date;b(`Auto Submit: picking date #${m+1} (${f.slice(0,10)})\u2026`),c.send({action:"selectFirstDate",date:f,maxMs:xe,pollMs:F});return}b(`Auto Submit ON \u2014 no dates in your range on ${r.Name||"this city"} yet.`);return}b("Auto Submit ON \u2014 loading slots for current city\u2026"),c.send({action:"selectPost",postId:String(i)})}function Vn(){Hn=0}function Xn(){wt&&(c.clear(wt),wt=null)}function Cs(t,e){return t+Math.random()*(e-t)}function $s(){return Cs(Qe(),ws())}function V(t=Date.now()){Y=t+$s()}function ur(t=Date.now()){let e=Re(new Date(t));if(e>0)return e;if(ge>t)return ge-t;if(Pt){let n=Pt+Qe()-t;if(n>0)return n}return Y>t?Y-t:0}function A(){if(!G)return;if(Xn(),D||Vt){wt=c.setTimeout(()=>{Xo()},500);return}let t=ur();t<Qe()&&(Pt?t=Math.max(0,Pt+Qe()-Date.now()):(Y>Date.now()||V(Date.now()),t=Y-Date.now())),t>=nr&&(jt=Date.now()),wt=c.setTimeout(()=>{Xo()},Math.max(0,t))}function ks(t,e){if(!t.length)return null;if(t.length===1)return he=0,t[0];let n=t.findIndex(o=>String(o.id)===String(e));n<0&&(n=Math.max(0,Math.min(he,t.length-1)));let i=(n+1)%t.length;return he=i,t[i]}function Qn(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function It(){let t=document.querySelector(p(a.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function $e(){return{from:document.querySelector(p(a.aiFrom))?.value||null,to:document.querySelector(p(a.aiTo))?.value||null}}function Se(t=[],{force:e=!1}={}){let n=document.querySelector(p(a.aiCities));if(!n)return;let i=Qn(),o=vs(i),r=document.querySelector(p(a.aiPanel)),s=r&&!r.classList.contains(u.hidden),l=ar();if(!e&&o===Yo&&n.querySelector('input[type="checkbox"]'))return;Yo=o;let m=new Set(s&&l.length&&!e&&!t.length?l:(t.length?t:l).map(String));if(n.replaceChildren(),!i.length){n.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let f of i){let h=document.createElement("label"),g=document.createElement("input");g.type="checkbox",g.value=f.id,g.dataset.name=f.name,g.checked=m.has(f.id),h.append(g,document.createTextNode(f.name)),n.appendChild(h)}}function Ms(t){let e=t?.cities||[];return e.length?e.map(n=>n.name||n.id).join(", "):"\u2014"}async function ft(t,e={}){let n=await P(t)||{},{from:i,to:o}=$e(),r=It(),s={...n,from:i||n.from||null,to:o||n.to||null,cities:r.length?r:n.cities||[],loginId:document.querySelector(p(a.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(p(a.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(l=>{let m=[a.aiQ1,a.aiQ2,a.aiQ3][l],f=[a.aiA1,a.aiA2,a.aiA3][l];return{q:document.querySelector(p(m))?.value?.trim()||n.security?.[l]?.q||"",a:document.querySelector(p(f))?.value?.trim()||n.security?.[l]?.a||"",set:l+1}}),...e};return typeof s.submitEnabled=="boolean"&&(s.enabled=s.submitEnabled),await ir(t,s),s}async function As(t,e){if(!Ht()||D||I)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let i=String(t);return String(n.value)===i?!1:(_s(),b(`Switching city \u2192 ${e||t}\u2026`),c.send({action:"selectPost",postId:i}),!0)}function Zn(){Go||!document.querySelector("#post_select")||(Go=!0)}async function Xo(){if(!(at||!G)){at=!0,St=Date.now(),jt=Date.now(),wt=null;try{if(j||M()||!c.alive){be();return}if(en()){Y=Date.now(),b(Ht()?"City Change \u2014 auto-unstuck; hopping now\u2026":`City Change \u2014 auto-unstuck; waiting IST ${nt()}\u2026`),A();return}if(D||I){let g=L?Date.now()-L:0;if(D&&g>=ye()){qt(),D=!1,L=0,V(Date.now()),b("City Change \u2014 hold expired; next city in 13\u201318s\u2026"),A();return}let w=Math.max(0,ye()-g);b(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(w/1e3)}s`),A();return}let t=Date.now(),e=Ht(new Date(t)),n=Re(new Date(t));if(!e){b(`City Change \u2014 waiting for slot window (IST ${nt()}, next in ${Mn(n)})`),A();return}if(Vt){let g=ut?t-ut:0;if(Bn()){if(g>=it()){tt(),V(Date.now()),b(`City Change \u2014 still Loading after ${it()/1e3}s; changing city\u2026`),A();return}let T=Math.max(0,Math.ceil((it()-g)/1e3));b(`City Change \u2014 Date Loading\u2026 stay (${T}s then hop if still Loading)`),A();return}if(g>=bt()){tt(),V(Date.now()),b(`City Change \u2014 calendar up but no dates after ${bt()/1e3}s; changing city\u2026`),A();return}let w=Math.max(0,Math.ceil((bt()-g)/1e3));b(`City Change \u2014 waiting calendar dates\u2026 (${w}s then hop)`),A();return}let i=ur(t);if(i>0){let g=Math.ceil(i/1e3);b(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,g)}s`),A();return}let o=await Ce();if(!o?.cities?.length){be();return}let r=new Set(Qn().map(g=>g.id)),s=o.cities.filter(g=>r.has(String(g.id)));if(!s.length){b("Preferred cities not found in the dropdown \u2014 pick cities again."),be();return}let l=document.querySelector("#post_select"),m=l?String(l.value):"",f=ks(s,m);if(!f){V(t),A();return}if(await As(f.id,f.name)){Pt=Date.now(),V(Pt);let g=s.map(T=>T.name||T.id).join(" \u2192 "),w=`${he+1}/${s.length}`;b(`City Change \u2014 ${w} ${f.name||f.id} (path: ${g}); Loading up to ${it()/1e3}s, no-dates hop ${bt()/1e3}s`)}else V(t);A()}finally{at=!1,St=0}}}async function Jn(){if(j||M()||!xt())return;let t=await Ce();if(!t?.cities?.length)return;let e=new Set(Qn().map(s=>s.id)),n=t.cities.filter(s=>e.has(String(s.id)));if(!n.length){b("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}qt(),tt(),D=!1,L=0,I=!1,at=!1,St=0,G=!0,jt=Date.now(),Y=Date.now();let i=document.querySelector("#post_select"),o=i?String(i.value):"",r=n.findIndex(s=>String(s.id)===o);he=r>=0?r:0,b(`City Change ON \u2014 IST ${nt()}; hop 13\u201318s in checklist order; Loading max ${it()/1e3}s; no-dates hop ${bt()/1e3}s`),cr(),A()}async function dr(){if(j||M()||!zn()||!c.alive||!(await Ce())?.cities?.length||!document.querySelector("#post_select"))return;if(!G){await Jn();return}let e=en();cr(),(e||!wt&&!at)&&(e&&(V(Date.now()),b("City Change \u2014 auto-unstuck; next city in 13\u201318s\u2026")),A())}function fr(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function on(){let t=fr();return!!(t&&!t.disabled)}function ti(){let t=fr();if(!t||t.disabled)return!1;try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}return c.send({action:"forceClickSubmit",prefix:d,pollMs:F,maxMs:tn}),!0}function Ds(){return N()?on():!1}function mr(){b("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function ei(t){if(j||M()||I)return;let e=await P(t);if(!vt(e))return;Xt(),I=!0,me();let n=Date.now(),i=!1,o=N()?Date.now():0,r=async m=>{if(!(i||!I||!c.alive)){if(i=!0,window.removeEventListener("message",s),dt&&(c.clear(dt),dt=null),M()){I=!1;return}if(I=!1,m){await rr(t),b("Submit clicked \u2014 all Tik Tik operations stopped.");return}_t(),b(G?"Auto Submit \u2014 Submit not clicked in time; City Change resuming\u2026":"Auto Submit \u2014 Submit not clicked in time; still watching\u2026")}},s=m=>{!c.alive||m.source!==window||m.data?.action===pt.sub&&r(!0)};window.addEventListener("message",s);let l=async()=>{if(i||!I||!c.alive)return;let m=Date.now(),f=m-n;if(N()&&!o&&(o=m,b("Time slot selected \u2014 waiting for Submit to enable\u2026")),o&&m-o>=ys&&(Ds()?(b("Submit enabled \u2014 clicking\u2026"),ti()):b("Waiting for Submit button to enable\u2026")),f>=tn)return r(!1);dt=c.setTimeout(l,F)};l()}async function pr(){if(!N()||I||j)return;let t=await st();t&&await ei(t.accountId)}function b(t){let e=document.querySelector(p(a.aiStatus));e&&(e.textContent=t)}function E(t){b(t)}function Qo(t){return!!(t&&t.termsAgreed)}function hr(t){return!!(t&&t.termsPassed)}function Ze(){return!!document.querySelector(p(a.aiTermsAgree))?.checked}function ni(t){let e=document.querySelector(p(a.aiTermsGate)),n=document.querySelector(p(a.aiMain)),i=document.querySelector(p(a.aiTermsAgree)),o=document.querySelector(p(a.aiTermsContinue)),r=hr(t);e&&e.classList.toggle(u.hidden,r),n&&n.classList.toggle(u.hidden,!r),i&&(i.checked=Qo(t)||Ze()),o&&(o.disabled=!(Qo(t)||Ze()))}function Es(){let t=document.querySelector(p(a.aiTermsContinue)),e=Ze();t&&(t.disabled=!e),b(e?"Terms checked \u2014 tap Continue.":"Check Agree to continue.")}async function Is(){if(!Ze()){b("Check Agree first.");return}let t=await R();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=await P(t)||{},{from:n,to:i}=$e(),o=It(),r=rn();Tt(),we(),Vn(),Z=!0,rt=!0,await ft(t,{termsAgreed:!0,termsPassed:!0,termsAgreedAt:e.termsAgreedAt||Date.now(),submitEnabled:!0,citiesEnabled:!0,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],slotWindows:r.length?r:e.slotWindows||null,confirmedAt:Date.now()}),await X(),J(document.querySelector(p(a.aiSubmitSw)),!0),J(document.querySelector(p(a.aiCitiesSw)),!0),Z=!0,rt=!0,an(await P(t)),Se((e.cities||[]).map(l=>l.id),{force:!0}),ii(e),ni(await P(t)),(It().length?It():e.cities||[]).length&&(Zn(),await Jn()),(n||e.from)&&(i||e.to)&&await nn(),b("Auto Submit and City Change ON \u2014 set dates and preferred cities.")}function gr(t){t?.slotWindows?.length?eo(t.slotWindows):kn()}function Ls(t){let e="";for(let n=0;n<=59;n++){let i=Number(t)===n?" selected":"";e+=`<option value="${n}"${i}>:${String(n).padStart(2,"0")}</option>`}return e}function Zo(t,e){let n=Math.min(gt,59-Number(t||0)),i="";for(let o=1;o<=Math.max(1,n);o++){let r=Number(e)===o?" selected":"";i+=`<option value="${o}"${r}>${o} min</option>`}return i}function br(t,e){let n=Number(t)||0,i=Number(e)||1,o=Math.min(59,n+i);return`Runs from :${String(n).padStart(2,"0")} up to :${String(o).padStart(2,"0")}`}function rn(){let t=document.querySelector(p(a.aiWinList));if(!t)return[];let e=[];for(let n of t.querySelectorAll(`.${u.aiWinRow}`)){let i=Number(n.querySelector('select[data-win="from"]')?.value),o=Number(n.querySelector('select[data-win="dur"]')?.value);!Number.isFinite(i)||!Number.isFinite(o)||e.push({fromMin:i,durationMin:o})}return $n(e)}function Jo(t){let e=t.querySelector('select[data-win="from"]'),n=t.querySelector('select[data-win="dur"]'),i=t.querySelector(`.${u.aiWinHelp}`);!e||!n||!i||(i.textContent=br(e.value,n.value))}function yr(t=0,e=6){let n=Math.min(gt,59-t),i=Math.min(Math.max(1,e||1),Math.max(1,n)),o=document.createElement("div");o.className=u.aiWinRow,o.innerHTML=`
    <div class="${u.aiInline}">
      <label class="${u.aiHead}">Start</label>
      <select data-win="from">${Ls(t)}</select>
      <label class="${u.aiHead}" style="margin-left:10px;color:#6b7280;font-weight:500">Duration</label>
      <select data-win="dur">${Zo(t,i)}</select>
      <button type="button" class="${u.aiTrash}" data-win="del" title="Delete timing" aria-label="Delete">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
        </svg>
      </button>
    </div>
    <div class="${u.aiWinHelp}">${br(t,i)}</div>
  `;let r=o.querySelector('select[data-win="from"]'),s=o.querySelector('select[data-win="dur"]');return c.on(r,"change",()=>{let l=Number(r.value),m=Number(s.value)||1;s.innerHTML=Zo(l,m),Jo(o)}),c.on(s,"change",()=>Jo(o)),c.on(o.querySelector('button[data-win="del"]'),"click",()=>{o.remove(),oi()}),o}function ii(t){let e=document.querySelector(p(a.aiWinList));if(!e)return;e.replaceChildren();let n=t?.slotWindows?.length?no(t.slotWindows):[];for(let i of n.slice(0,lt))e.appendChild(yr(i.fromMin,i.durationMin));oi(t)}function oi(t){let e=document.querySelector(p(a.aiWinNote));e&&(t?.slotWindows?.length||rn().length?e.textContent=`Custom windows active (max ${lt}, each \u2264 ${gt} min).`:e.textContent=`Using defaults: ${nt()}. Add up to ${lt} windows below.`)}function J(t,e){t&&(t.classList.toggle(u.aiOnBtn,!!e),t.setAttribute("aria-checked",e?"true":"false"))}function Ps(t){J(document.querySelector(p(a.aiSubmitSw)),vt(t)),J(document.querySelector(p(a.aiCitiesSw)),Lt(t))}var Z=!1,rt=!1;function an(t){let e=vt(t)||Z,n=Lt(t)||rt,i=document.querySelector(p(a.aiSubmitBody)),o=document.querySelector(p(a.aiCitiesBody));i&&i.classList.toggle(u.hidden,!e),o&&o.classList.toggle(u.hidden,!n)}function qs(t,e){let n=document.querySelector(p(a.aiStatus)),i=document.querySelector(p(a.aiBtn));if(!n||!i)return;Ps(t),an(t);let o=vt(t),r=Lt(t),s=o||r;s?(i.classList.add(u.aiOn),i.textContent="Tik Tik ON"):(i.classList.remove(u.aiOn),i.textContent="Tik Tik");let l=[];o&&t.from&&t.to?l.push(`Auto Submit ON (${Yt(t.from)} \u2013 ${Yt(t.to)}, clicks Submit as soon as time slot is ready)`):Z&&!o?l.push("Auto Submit \u2014 set From / To dates, then Enable again"):l.push("Auto Submit OFF"),r?l.push(`City Change ON (${Ms(t)}, ${nt()})`):rt&&!r?l.push("City Change \u2014 pick preferred cities, then Enable again"):l.push("City Change OFF"),n.textContent=`Account ${e||"\u2014"}: ${l.join(" \xB7 ")}`,n.classList.toggle(u.aiOk,s)}async function X(){let t=await R(),e=t?await P(t):null;vt(e)||(Z=!1),Lt(e)||(rt=!1),gr(e),qs(e,t),ni(e);let n=document.querySelector(p(a.aiFrom)),i=document.querySelector(p(a.aiTo));n&&e?.from&&(n.value=e.from),i&&e?.to&&(i.value=e.to);let o=(e?.cities||[]).map(S=>S.id),r=document.querySelector(p(a.aiPanel)),s=r&&!r.classList.contains(u.hidden),l=document.querySelector(p(a.aiCitiesBody)),m=l&&!l.classList.contains(u.hidden),f=ar();(m||Lt(e)||rt)&&Se(s&&f.length?f:o),ii(e);let h=document.querySelector(p(a.aiLogin)),g=document.querySelector(p(a.aiPass));h&&e?.loginId&&(h.value=e.loginId),g&&e?.loginPass&&(g.value=e.loginPass);let w=e?.security||[],T=[a.aiQ1,a.aiQ2,a.aiQ3],U=[a.aiA1,a.aiA2,a.aiA3];T.forEach((S,W)=>{let At=document.querySelector(p(S));At&&(At.innerHTML=Xe(W,w[W]?.q||""))}),U.forEach((S,W)=>{let At=document.querySelector(p(S));At&&w[W]?.a&&(At.value=w[W].a)});let H=document.querySelector(p(a.aiLoginBody)),Q=H&&!H.classList.contains(u.hidden);ri(!!Q,Ks(e))}function Rs(){let t=document.querySelector(p(a.aiPanel));return!!(t&&!t.classList.contains(u.hidden))}function Fn(t){let e=document.querySelector(p(a.aiPanel));e&&(e.classList.toggle(u.hidden,!t),t&&R().then(async n=>{let i=n?await P(n):null;ni(i),hr(i)?Se((i?.cities||[]).map(o=>o.id),{force:!0}):b("Read the terms, check Agree, then Continue.")}))}function Un(){if(Un._done)return;Un._done=!0;let t=e=>{if(!Rs())return;let n=document.querySelector(p(a.aiPanel)),i=document.querySelector(p(a.aiBtn)),o=e.target;n&&(n===o||n.contains(o))||i&&(i===o||i.contains(o))||Fn(!1)};c.on(document,"pointerdown",t,{capture:!0}),c.on(document,"click",t,{capture:!0})}async function Os(t){let e=await R();if(!e){b("Open a logged-in schedule page so we can bind this to your account.");return}let n=await P(e)||{},{from:i,to:o}=$e();if(i=i||n.from||null,o=o||n.to||null,t){Z=!0,J(document.querySelector(p(a.aiSubmitSw)),!0),Tt(),we(),Vn(),await ft(e,{submitEnabled:!0,from:i||null,to:o||null,confirmedAt:Date.now()});let r=document.querySelector(p(a.aiFrom)),s=document.querySelector(p(a.aiTo));if(r&&i&&(r.value=i),s&&o&&(s.value=o),await X(),J(document.querySelector(p(a.aiSubmitSw)),!0),Z=!0,an(await P(e)),!i||!o){b("Auto Submit ON \u2014 select From and To dates to start booking.");return}if(i>o){b("Auto Submit ON \u2014 From date must be before To date.");return}Z=!1,b(`Auto Submit ON (${Yt(i)} \u2013 ${Yt(o)})`),await nn();return}Z=!1,we(),J(document.querySelector(p(a.aiSubmitSw)),!1),await ft(e,{submitEnabled:!1,from:i||n.from,to:o||n.to}),await X(),b("Auto Submit OFF")}async function Ws(t){let e=await R();if(!e){b("Open a logged-in schedule page so we can bind this to your account.");return}let n=await P(e)||{};if(t){rt=!0,J(document.querySelector(p(a.aiCitiesSw)),!0),Se((n.cities||[]).map(s=>s.id),{force:!0}),ii(n);let o=It();!o.length&&n.cities?.length&&(o=n.cities);let r=rn();if(Tt(),await ft(e,{citiesEnabled:!0,cities:o.length?o:n.cities||[],slotWindows:r.length?r:n.slotWindows||null}),await X(),J(document.querySelector(p(a.aiCitiesSw)),!0),rt=!0,an(await P(e)),o.length||Se([],{force:!0}),!o.length){b("City Change ON \u2014 select at least one preferred city to start hopping.");return}rt=!1,Zn(),await Jn(),b(`City Change ON (${o.map(s=>s.name||s.id).join(", ")})`);return}rt=!1,be(),J(document.querySelector(p(a.aiCitiesSw)),!1);let i=It();await ft(e,{citiesEnabled:!1,cities:i.length?i:n.cities||[]}),await X(),b("City Change OFF")}async function tr(){let t=await R();if(!t)return;let e=await P(t)||{};if(!vt(e)&&!Z)return;let{from:n,to:i}=$e();!n||!i||n>i||(await ft(t,{submitEnabled:!0,from:n,to:i,confirmedAt:Date.now()}),Z=!1,await X(),J(document.querySelector(p(a.aiSubmitSw)),!0),Tt(),Vn(),b(`Auto Submit ON (${Yt(n)} \u2013 ${Yt(i)})`),await nn())}function Ns(t){return(t||[]).map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", ")}async function Hs(){let t=document.querySelector(p(a.aiWinList));if(t){if(t.querySelectorAll(`.${u.aiWinRow}`).length>=lt){b(`Max ${lt} timing windows.`);return}t.appendChild(yr(0,Math.min(6,gt))),oi()}}async function Bs(){let t=await R();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=rn();if(!e.length){b("Add at least one timing (or Reset to defaults).");return}await ft(t,{slotWindows:e}),await X(),b(`Saved ${e.length} custom timing(s): ${Ns(e)}`)}async function Fs(){let t=await R();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}window.confirm("Reset to default IST windows? Your custom timings will be removed.")&&(await ft(t,{slotWindows:null}),kn(),await X(),b(`Using default windows: ${nt()}`))}async function Us(){let t=await R();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let{from:e,to:n}=$e(),i=It(),o=document.querySelector(p(a.aiLogin))?.value?.trim(),r=document.querySelector(p(a.aiPass))?.value,s=[0,1,2].map(l=>({q:document.querySelector(p([a.aiQ1,a.aiQ2,a.aiQ3][l]))?.value?.trim()||"",a:document.querySelector(p([a.aiA1,a.aiA2,a.aiA3][l]))?.value?.trim()||""}));if(!o||!r){b("Enter ID and password before saving.");return}if(s.some(l=>!l.q||!l.a)){b("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}await ft(t,{}),ri(!0,!0),b("Saved ID, password, and 3 security questions (1 from each set).")}function Ks(t){let e=t?.security||[];return!!(t?.loginId&&t?.loginPass&&e.length>=3&&e.every(n=>n?.q&&n?.a))}function ri(t,e){let n=document.querySelector(p(a.aiLoginToggle));if(!n)return;let i=t?"\u25BE":"\u25B8";n.textContent=e?`Login details (saved) ${i}`:`Login details ${i}`}function zs(){let t=document.querySelector(p(a.aiLoginBody)),e=document.querySelector(p(a.aiLoginToggle));if(!t||!e)return;let n=t.classList.contains(u.hidden);t.classList.toggle(u.hidden,!n);let i=/saved/i.test(e.textContent||"");ri(n,i)}function ai(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==a.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==a.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===a.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function Kn(){document.querySelector(p(a.aiPanel))?.remove(),document.querySelector(p(a.aiBtn))?.remove(),ai()}function Gs(){if(M())return;if(!zn()){Kn();return}if(document.querySelector(p(a.aiBtn)))if(!document.querySelector(p(a.aiSubmitSw))||!document.querySelector(p(a.aiTermsContinue)))Kn();else return;let t=uo();if(!t)return;let e=document.createElement("button");e.id=a.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[C.mark]="",c.on(e,"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiPanel)),r=o&&o.classList.contains(u.hidden);Fn(!!r)}),t.appendChild(e);let n=document.createElement("div");n.id=a.aiPanel,n.className=u.hidden,n.dataset[C.mark]="",n.innerHTML=`
    <div id="${a.aiTermsGate}">
      <div id="${a.aiTerms}" class="${u.aiTerms}">
        <div class="${u.aiHead}">Terms &amp; Conditions</div>
        <div class="${u.aiHint}">Please read carefully before continuing.</div>
        <ul class="${u.aiTermsList}">
          <li>Options apply to this applicant only. They do not bypass CAPTCHAs, waiting rooms, or portal security.</li>
          <li>During your windows, City Change hops every 13\u201318s. Max ${lt} windows, each up to ${gt} minutes.</li>
          <li>Checking too fast may trigger <b>1015 Rate Limit</b> errors.</li>
        </ul>
        <label class="${u.aiTermsCb}">
          <input type="checkbox" id="${a.aiTermsAgree}" />
          <span>I have read and agree to these terms.</span>
        </label>
        <button type="button" id="${a.aiTermsContinue}" class="${u.aiContinue}" disabled>Continue</button>
      </div>
    </div>
    <div id="${a.aiMain}" class="${u.hidden}">
      <div class="${u.aiSec}">
        <div class="${u.aiRow}" style="justify-content:space-between;margin-bottom:4px">
          <div>
            <div class="${u.aiHead}" style="font-size:17px">Auto Submit</div>
            <div class="${u.aiHint}" style="margin:2px 0 0">Book automatically when a date in your range appears.</div>
          </div>
          <button type="button" id="${a.aiSubmitSw}" class="${u.aiSwitch}" role="switch" aria-checked="false" aria-label="Auto Submit">
            <span class="${u.aiKnob}"></span>
          </button>
        </div>
        <div id="${a.aiSubmitBody}" class="${u.hidden}">
          <div class="${u.aiRow}" style="margin-top:10px">
            <label>From <input type="date" id="${a.aiFrom}" min="${zo()}" /></label>
            <label>To <input type="date" id="${a.aiTo}" min="${zo()}" /></label>
          </div>
        </div>
      </div>
      <div class="${u.aiSec}">
        <div class="${u.aiRow}" style="justify-content:space-between;margin-bottom:4px">
          <div>
            <div class="${u.aiHead}" style="font-size:17px">City Change</div>
            <div class="${u.aiHint}" style="margin:2px 0 0">Rotate preferred cities during release windows.</div>
          </div>
          <button type="button" id="${a.aiCitiesSw}" class="${u.aiSwitch}" role="switch" aria-checked="false" aria-label="City Change">
            <span class="${u.aiKnob}"></span>
          </button>
        </div>
        <div id="${a.aiCitiesBody}" class="${u.hidden}">
          <div class="${u.aiHint}" style="margin:10px 0 4px;font-weight:600;color:#111827">
            Preferred cities
            <button type="button" id="${a.aiCitiesAll}" class="${u.aiCityAct}">Select all</button>
            <button type="button" id="${a.aiCitiesNone}" class="${u.aiCityAct}">Clear</button>
          </div>
          <div id="${a.aiCities}" class="${u.aiCities}"></div>
          <div class="${u.aiHead}" style="font-size:16px;margin:14px 0 8px">Release Window Checks</div>
          <p id="${a.aiWinNote}" class="${u.aiHint}"></p>
          <div id="${a.aiWinList}"></div>
          <div class="${u.aiRow}" style="margin-top:8px">
            <button type="button" id="${a.aiWinAdd}">+ Add timing</button>
            <button type="button" id="${a.aiWinSave}">Save timings</button>
            <button type="button" id="${a.aiWinReset}">Reset defaults</button>
          </div>
        </div>
      </div>
      <div class="${u.aiSec}">
        <div class="${u.aiRow}" style="margin:0">
          <button type="button" id="${a.aiLoginToggle}">Login details \u25B8</button>
          <button type="button" id="${a.aiClose}">Close</button>
        </div>
        <div id="${a.aiLoginBody}" class="${u.hidden}" style="margin-top:8px">
          <div class="${u.aiHint}" style="margin:4px 0;font-weight:600;color:#111827">Login (auto-login on Home when logged out)</div>
          <div class="${u.aiRow}">
            <label>ID / email <input type="email" id="${a.aiLogin}" autocomplete="off" /></label>
            <label>Password <input type="password" id="${a.aiPass}" autocomplete="off" /></label>
          </div>
          <div class="${u.aiHint}" style="margin:0 0 6px">
            3 sets \xD7 5 questions. Pick <b>1 question from each set</b>, then type <b>your answer</b> for that question.
          </div>
          <div class="${u.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 1 \u2014 choose 1 question
              <select id="${a.aiQ1}">${Xe(0)}</select>
            </label>
            <label>Your answer for set 1
              <input type="text" id="${a.aiA1}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${u.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 2 \u2014 choose 1 question
              <select id="${a.aiQ2}">${Xe(1)}</select>
            </label>
            <label>Your answer for set 2
              <input type="text" id="${a.aiA2}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${u.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 3 \u2014 choose 1 question
              <select id="${a.aiQ3}">${Xe(2)}</select>
            </label>
            <label>Your answer for set 3
              <input type="text" id="${a.aiA3}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${u.aiRow}">
            <button type="button" id="${a.aiSaveLogin}">Save login details</button>
          </div>
        </div>
      </div>
    </div>
    <div id="${a.aiStatus}" class="${u.aiHint}" style="margin-top:10px"></div>
  `,t.insertAdjacentElement("afterend",n),c.on(n.querySelector(p(a.aiSubmitSw)),"click",async()=>{let i=await R(),o=i?await P(i):null;await Os(!vt(o))}),c.on(n.querySelector(p(a.aiCitiesSw)),"click",async()=>{let i=await R(),o=i?await P(i):null;await Ws(!Lt(o))}),c.on(n.querySelector(p(a.aiWinAdd)),"click",Hs),c.on(n.querySelector(p(a.aiWinSave)),"click",Bs),c.on(n.querySelector(p(a.aiWinReset)),"click",Fs),c.on(n.querySelector(p(a.aiSaveLogin)),"click",Us),c.on(n.querySelector(p(a.aiLoginToggle)),"click",zs),c.on(n.querySelector(p(a.aiClose)),"click",()=>Fn(!1)),c.on(n.querySelector(p(a.aiCitiesAll)),"click",()=>Vo(!0)),c.on(n.querySelector(p(a.aiCitiesNone)),"click",()=>Vo(!1)),c.on(n.querySelector(p(a.aiTermsAgree)),"change",()=>{Es()}),c.on(n.querySelector(p(a.aiTermsContinue)),"click",()=>{Is()}),c.on(n.querySelector(p(a.aiFrom)),"change",i=>{let o=n.querySelector(p(a.aiTo));o&&i.target.value&&(o.min=i.target.value),tr()}),c.on(n.querySelector(p(a.aiTo)),"change",()=>{tr()}),Un(),X()}function Ys(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",c.on(e,"click",()=>{me(),R().then(n=>{n?rr(n):or()})}))};t(document.querySelector("#submitbtn")),c.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function si(){if(c.alive&&!M()){if(!zn()){Kn();return}await c.waitFor("#post_select",{attempts:Le})&&(Gs(),Zn(),Ys(),!jo&&(jo=!0,c.setTimeout(()=>X(),800),c.setTimeout(async()=>{await st()&&await nn()},1500)))}}var wr=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function Sr(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function js(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=Sr(t.data.url),i=new URLSearchParams(t.data.request||"").get("parameters");if(!i)return null;let o;try{o=JSON.parse(i)}catch{return null}return{params:o,tail:e,response:t.data.response}}async function Vs(t,e={}){t?.length&&(await Ao(t,e),await x("audioAlert")&&bo())}async function Xs(t,e=!1){if(e||M())return null;let n=new Date;n.setHours(0,0,0,0);let i=(t||[]).map(s=>{if(!s)return null;let l=cn(s.Date);return l?{...s,Date:l}:null}).filter(Boolean).filter(s=>{let[l,m,f]=s.Date.slice(0,10).split("-").map(Number);return!l||!m||!f?!1:new Date(l,m-1,f)>=n}).sort((s,l)=>String(s.Date).localeCompare(String(l.Date))),o=await st();if(o){let s=i.filter(m=>_e(m.Date,o.from,o.to));if(!s.length)return null;let l=ve(s.length);return s[l]?.Date||null}if(!await x("autoSelectFirstDate")||!i.length)return null;let r=ve(i.length);return i[r]?.Date||null}function cn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,r,s]=n;return`${s}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime())){let r=o.getFullYear(),s=String(o.getMonth()+1).padStart(2,"0"),l=String(o.getDate()).padStart(2,"0");return`${r}-${s}-${l}`}}return null}function Qs(t){if(!t)return!1;let[e,n,i]=t.slice(0,10).split("-").map(Number);if(!e||!n||!i)return!1;let o=n-1;for(let r of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let s=r.querySelector("a");if(!s)continue;let l=parseInt(r.getAttribute("data-month"),10),m=parseInt(r.getAttribute("data-year"),10),f=parseInt(s.textContent,10);if(m===e&&l===o&&f===i)return!0}return!1}var sn=null;function Zs(t,e){sn&&c.clear(sn);let n=Date.now()+(e?xe:8e3),i=()=>{!c.alive||Date.now()>n||Qs(t)||(c.send({action:"selectFirstDate",date:t,maxMs:e?xe:8e3,pollMs:F}),sn=c.setTimeout(i,F))};sn=c.setTimeout(i,80)}function xr(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Js(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function vr(t){return t?.length?t.map((e,n)=>({entry:e,index:n,avail:Js(e)})).sort((e,n)=>n.avail!==e.avail?n.avail-e.avail:e.index-n.index):[]}function tc(t){let e=vr(t);return e.length?{entry:e[0].entry,slotIndex:e[0].index}:{entry:null,slotIndex:0}}function Tr(){Rt&&(c.clear(Rt),Rt=null)}async function ec(t){let e=Date.now()+Math.max(0,Number(t)||0);for(;c.alive&&Date.now()<e;){if(Te()||M())return!1;if(N()&&on())return!0;await new Promise(n=>c.setTimeout(n,F))}return!!(N()&&on())}var _r=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),Cr=null,nc=null,Rt=null;function ic(t,e){Cr=t,nc=e?String(e).slice(0,10):null}function oc(t,e=0){Rt&&c.clear(Rt);let n=t?String(t).slice(0,10):null,i=0,o=async()=>{if(!c.alive||Te()||++i>240||N())return;let r=(Cr||[]).filter(s=>s&&s.Time);if(r.length){let{entry:s,slotIndex:l}=tc(r);if(E(`Watchdog: picking time slot #${l+1}\u2026`),await de({time:xr(s.Time),date:s.Date?String(s.Date).slice(0,10):n,slotIndex:l,pollMs:F,maxMs:600,prefix:d}),N())return}else if(document.querySelector(_r)&&(E("Watchdog: picking visible time slot\u2026"),await de({time:"00:00",date:n,slotIndex:e,pollMs:F,maxMs:600,prefix:d}),N()))return;Rt=c.setTimeout(o,F)};Rt=c.setTimeout(o,300)}var rc=["#datepicker.hasDatepicker","#datepicker .ui-datepicker","#ui-datepicker-div"].join(", ");async function ac(t,e=!1){if(e)return null;let n=await Xs(t,e);if(!n)return null;let i=await st(),o=new Date;o.setHours(0,0,0,0);let r=(t||[]).map(m=>cn(m?.Date)).filter(Boolean).filter(m=>{let[f,h,g]=m.slice(0,10).split("-").map(Number);return new Date(f,h-1,g)>=o}).sort((m,f)=>m.localeCompare(f)),s=i?r.filter(m=>_e(m,i.from,i.to)):r,l=ve(s.length);return E(`Selecting date #${l+1}: ${n}\u2026`),await c.waitFor(rc,{attempts:120,interval:F}),c.send({action:"selectFirstDate",date:n,maxMs:i?xe:8e3,pollMs:F}),Zs(n,i),oc(n,Je),n}async function sc(t,e=!1){if(e||M()||Te())return;let n=await st();if(!n&&!await x("autoSelectFirstDate"))return;Tr();let i=(t||[]).filter(l=>!(!l||!l.Time||l.EntriesAvailable!=null&&Number(l.EntriesAvailable)<=0));n&&(i=i.filter(l=>{let m=l.Date?String(l.Date).slice(0,10):null;return m?m>=n.from&&m<=n.to:!0}));let o=vr(i);if(!o.length)return;let r=Date.now()+1e4;for(;Date.now()<r&&c.alive&&!(No(i)||document.querySelector(_r));)await new Promise(l=>c.setTimeout(l,F));let s=o.length===1?tn:er;E(o.length===1?`1 time slot \u2014 try highest avail, wait \u2264${s/1e3}s for Submit\u2026`:`${o.length} time slots \u2014 try highest\u21922nd\u21923rd\u2026 (${s/1e3}s each for Submit)`);for(let l=0;l<o.length;l++){if(!c.alive||Te()||M())return;let{entry:m,index:f,avail:h}=o[l],g=xr(m.Time),w=m.Date?String(m.Date).slice(0,10):null,T=l===0?"highest":l===1?"2nd-highest":l===2?"3rd-highest":`${l+1}th-highest`;if(E(`Trying ${T} avail (${h}) @ ${g} \u2014 slot ${l+1}/${o.length}\u2026`),!await de({time:g,date:w,slotIndex:f,pollMs:F,maxMs:4e3,prefix:d})&&!N()){E(`Could not click ${g} \u2014 trying next\u2026`);continue}if(E(`Selected ${g} (${T}) \u2014 waiting \u2264${s/1e3}s for Submit to enable\u2026`),await ec(s)){E(`Submit enabled on ${g} \u2014 clicking\u2026`),n?await ei(n.accountId):ti();return}l<o.length-1&&E(`Submit still disabled on ${g} \u2014 trying next (${l+2}/${o.length})\u2026`)}E(`Tried all ${o.length} time slot(s); Submit never enabled.`),n&&_t()}async function $r(t){if(!K()||M())return;let e;try{e=js(t)}catch{return}if(e==null)return;if(Uo(e),e.retryAfter!==void 0){let r=Number(e.retryAfter);Gi(e.cgiBlock,r),r?(Be(r),jn(r)):x("defaultWaitTime").then(s=>{Be(s),jn(s)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let r=e.response.Posts||[],s=new Map((await mt()).map(l=>[l.ID,l]));for(let l of r)s.set(l.ID,{...s.get(l.ID),...l});await Nt([...s.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let r=e.response.Members||[];if(r.length){let s=await z()||{},l=s.name&&r.find(m=>m.FullName===s.name);s.visa=(l||r[0]).VisaClassName,await _({profile:s,members:r})}}if(wr.includes(e.tail)){Tt(),So(e);{let h=(e.response.ScheduleDays||[]).map(g=>cn(g?.Date)).filter(Boolean).length;h&&E(`${h} date${h===1?"":"s"} available \u2014 see list below`)}lr();let r=await st();await Ce()||x("defaultWaitTime").then(h=>{Be(h)});let l=await mt(),m=l.find(h=>h.ID===e.params.postId);m&&(m.Days=e.response.ScheduleDays,m.Updated=Date.now(),m.HasError=e.response.HasError,m.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,Nt(l)),await Vs(e.response.ScheduleDays,{postId:e.params.postId,postName:m?.Name,hasError:e.response.HasError}),await Do(e.response.ScheduleDays,{postId:e.params.postId,postName:m?.Name,hasError:e.response.HasError}),r&&!e.response.HasError?Gn(e.response.ScheduleDays,r.from,r.to).length?Xt():_t():r&&_t();let f=await ac(e.response.ScheduleDays,e.response.HasError);if(f)Xt(),await Eo(m?.Name,f);else if(r&&!e.response.HasError){let h=(e.response.ScheduleDays||[]).map(w=>cn(w?.Date)).filter(Boolean),g=h.filter(w=>_e(w,r.from,r.to));h.length&&!g.length?(_t(),E(`Dates found but none in ${r.from} \u2192 ${r.to}. Next city in 13\u201318s\u2026`)):h.length||(_t(),E("No dates on this city \u2014 next city in 13\u201318s\u2026"))}await vn()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let r=e.params.Date.split("T")[0];ic(e.response.ScheduleEntries,r),Tr();let s=await mt(),l=s.filter(f=>f.Days&&f.Updated).sort((f,h)=>h.Updated-f.Updated).find(f=>f.Days.some(h=>h.Date===r));if(l){let f=l.Days.find(h=>h.Date===r);f&&(f.Times=e.response.ScheduleEntries,Nt(s))}let m=(e.response.ScheduleEntries||[]).filter(f=>f&&f.Time);if(xo(m,r,l?.Name),m.length){let f=m.filter(w=>w.EntriesAvailable==null||Number(w.EntriesAvailable)>0),h=f.reduce((w,T)=>{let U=Number(T.EntriesAvailable);return w+(Number.isFinite(U)?U:0)},0),g=h>0?` \xB7 ${h} available`:"";E(`${f.length||m.length} time slot${(f.length||m.length)===1?"":"s"} on ${r}${g}`)}await sc(e.response.ScheduleEntries,e.response.HasError),m.length?(Xt(),await Io(l?.Name,e.params.Date,m.length)):(_t(),E("No time slots on this date \u2014 next city in 13\u201318s\u2026")),await vn()}}function kr(t){if(!K()||M())return;let e=Sr(t.data.url);wr.includes(e)&&mo()}var Ot=null,li="",ci={scanning:"Scanning for Cloudflare challenge\u2026",dom:"Trying page-level verify click\u2026",debugger:"Advanced click \u2014 targeting Turnstile iframe\u2026",retry:"Waiting before next attempt\u2026",success:"Verification passed \u2014 continuing\u2026",manual:"Stuck? Click the checkbox once, then we\u2019ll continue."};function Mr(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=u.cfFlash,n.dataset[C.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),c.setTimeout(()=>n.remove(),1200)}}function cc(){let t=document.querySelector(p(a.cfHud));return t||(t=document.createElement("div"),t.id=a.cfHud,t.dataset[C.mark]="",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.innerHTML=`
    <div class="${u.cfHud}">
      <div class="${u.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">\u{1F6E1}</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${ci.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `,document.documentElement.appendChild(t),t)}async function q(t,e){if(!chrome.runtime?.id||!c.alive||!await x("autoCloudflareTick"))return;let n=cc(),i=n.querySelector("[data-cf-msg]"),o=n.querySelector("[data-cf-sub]"),r=n.querySelector("[data-cf-chip]"),s=n.querySelector(`.${u.cfHud}`);li=t,i&&(i.textContent=ci[t]||ci.scanning),o&&(o.textContent=e||lc(t)),r&&(r.textContent=t==="success"?"Done":t==="manual"?"Help":"Active",r.dataset.state=t),s&&(s.dataset.state=t),Ot&&(c.clear(Ot),Ot=null),t==="success"&&(Ot=c.setTimeout(()=>ui(),2800))}function lc(t){return t==="debugger"?"Precision click via advanced browser bridge":t==="dom"?"Standard page interaction":t==="manual"?"One manual click is usually enough":t==="success"?"Resuming login and recovery":"Monitoring this tab for Turnstile"}function ui(){let t=document.querySelector(p(a.cfHud));t&&t.remove(),li="",Ot&&(c.clear(Ot),Ot=null)}function di(){return li}var uc=/we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i,dc=/\bUSG\s+[a-f0-9-]{8,}/i;var mi="vsPortalErrorReloadCount",Er="vsPortalErrorReloadAt",fc=2e3,mc=1e4,Ar=!1,Qt=null,pc=null;function hc(){return(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim()}function Zt(){let t=hc().slice(0,6e3);return t?!!(/a timeout occurred/i.test(t)&&(/error\s*524/i.test(t)||/origin web server timed out/i.test(t)||/cloudflare ray id/i.test(t))||/error\s*524/i.test(t)&&/cloudflare/i.test(t)&&t.length<8e3||uc.test(t)&&(dc.test(t)||/error id\s*#/i.test(t))||/we'?re sorry,\s*but something went wrong/i.test(t)&&t.length<2500):!1}function Ir(){try{return Math.max(0,Number(sessionStorage.getItem(mi)||0))}catch{return 0}}function gc(){try{let t=Ir()+1;return sessionStorage.setItem(mi,String(t)),sessionStorage.setItem(Er,String(Date.now())),t}catch{return 1}}function fi(){try{sessionStorage.removeItem(mi),sessionStorage.removeItem(Er)}catch{}}function bc(t){return Math.min(mc,fc+Math.max(0,t-1)*1e3)}function yc(){Qt&&(c.clear(Qt),Qt=null)}function wc(){gc();try{location.reload()}catch{}}function Dr(){if(!c.alive||Qt)return;if(!Zt()){fi();return}let t=Ir()+1,e=bc(t);Qt=c.setTimeout(()=>{if(Qt=null,!!c.alive){if(!Zt()){fi();return}wc()}},e)}function Lr(){if(Ar)return;Ar=!0;let t=()=>{c.alive&&(Zt()?Dr():(fi(),yc()))};t(),pc=c.setInterval(t,1500);try{let e=new MutationObserver(()=>{c.alive&&Zt()&&Dr()});e.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),c.disposable(()=>e.disconnect())}catch{}}var un=null,Me=0,ke=null,Ct=0;async function Sc(){try{let e=(await v("humanClickProfile")).humanClickProfile,n=e?.liveTrained&&e.samples?.length||0;return n<5?15e3:n<20?1e4:n<50?6e3:3500}catch{return 12e3}}var hi=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function et(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!O()&&!di()}function O(){if(Zt()||document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return hi.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:pi().length>0}function ln(t){return new Promise(e=>setTimeout(e,t))}function xc(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let i of n.querySelectorAll("*"))i.shadowRoot&&(t.push(i.shadowRoot),e.push(i.shadowRoot))}return t}function pi(){let t=[],e=new Set,n=i=>{if(!i||e.has(i))return;let o=i.getBoundingClientRect();if(o.width<40||o.height<20||o.width>900||o.height>400)return;let r=(i.src||i.getAttribute?.("src")||"").toLowerCase(),s=(i.title||i.getAttribute?.("title")||"").toLowerCase(),l=(i.className?.toString?.()||"").toLowerCase(),m=(i.id||"").toLowerCase(),f=i.tagName==="IFRAME"&&(r.includes("challenges.cloudflare")||r.includes("turnstile")||s.includes("cloudflare")||s.includes("security challenge")),h=l.includes("cf-turnstile")||l.includes("turnstile")||m.includes("turnstile")||m.includes("challenge")||i.hasAttribute?.("data-sitekey")||i.hasAttribute?.("data-turnstile-widget");if(!f&&!h)if(i.tagName==="IFRAME"&&o.width>=120&&o.width<=420&&o.height>=45&&o.height<=120){if(!hi.test(document.body?.innerText||""))return}else return;e.add(i),t.push({el:i,rect:o})};for(let i of xc()){for(let o of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let r of i.querySelectorAll(o))n(r);for(let o of i.querySelectorAll("iframe"))n(o)}return t}function vc(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function Tc(t){let e=[],n=new Set,i=(o,r)=>{if(!Number.isFinite(o)||!Number.isFinite(r)||o<1||r<1||o>window.innerWidth-1||r>window.innerHeight-1)return;let s=`${Math.round(o)},${Math.round(r)}`;n.has(s)||(n.add(s),e.push({x:Math.round(o),y:Math.round(r)}))};for(let{rect:o}of t){let r=o.top+o.height/2,s=o.left+Math.min(28,Math.max(18,o.width*.11));for(let l of[0,-4,4,-8,8,12,16,20,24,28,32])for(let m of[0,-3,3,-6,6])i(s+l,r+m);i(o.left+o.width*.5,r)}return e}function _c(t){for(let{el:e,rect:n}of t)try{e.click();let i=n.left+Math.min(26,n.width*.12),o=n.top+n.height/2,r=document.elementFromPoint(i,o)||e;for(let s of["pointerdown","mousedown","mouseup","pointerup","click"])r.dispatchEvent(new MouseEvent(s,{bubbles:!0,cancelable:!0,clientX:i,clientY:o,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let i=n.getBoundingClientRect();if(i.width<4&&i.height<4)continue;let o=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!o.includes("human")&&!o.includes("verify")&&e==="input[type='checkbox']"){let r=n.closest("label, div, form");if(!hi.test(r?.textContent||""))continue}return n.click(),!0}return!1}async function Pr(t){t.length&&(Mr(t.slice(0,3)),c.send({action:"viewportClickPoints",points:t}),await x("cloudflareDebuggerClick")?(await q("debugger","Trained click on Verify you are human\u2026"),c.send({action:"cloudflareDebuggerClick",points:t,primaryOnly:!0})):await q("dom"))}async function dn(){if(!await x("autoCloudflareTick"))return!1;if(et())return Ct=0,await q("success"),!0;Ct||(Ct=Date.now());let t=await Sc();if(Date.now()-Ct<t)return await q("scanning","Train window \u2014 click Verify you are human yourself (recording your mouse)\u2026"),!1;await q("scanning","Verify you are human page \u2014 preparing click\u2026");let e=pi();vc(e),await ln(350),e=pi();let n=Tc(e);return n.length&&(await Pr(n),await ln(1200),et()||!O())?(Ct=0,await q("success"),!0):(await q("dom"),_c(e),await ln(600),et()||!O()?(Ct=0,await q("success"),!0):n.length&&(await Pr(n),await ln(1e3),et()||!O())?(Ct=0,await q("success"),!0):(Me++,Me>=8?await q("manual","Click the checkbox once \u2014 we will continue after."):await q("retry",`Retry ${Me}/8\u2026`),!1))}function Cc(){ke||(ke=new MutationObserver(()=>{c.alive&&O()&&!et()&&dn()}),ke.observe(document.documentElement,{childList:!0,subtree:!0}),c.disposable(()=>{ke?.disconnect(),ke=null}))}function gi(){un&&(c.clear(un),un=null),Me=0,Ct=0,ui()}async function bi(){if(gi(),!await x("autoCloudflareTick"))return;Cc();let t=async()=>{if(c.alive&&await x("autoCloudflareTick")){if(O()&&!et()){await dn();return}di()&&(Me=0,await q("success"))}};t(),un=c.setInterval(t,1800)}var Jt="sessionRecovery",yi="homeKeepaliveAt",wi="homeLoadingStuckAt",qr=2e3,mn=!1,Rr=null,Si=null,xi=null,fn=null,Ae=0;function Or(){return y.homeKeepaliveMinMs}function $c(){return y.homeKeepaliveMaxMs}function kc(){return y.homeKeepaliveDebounceMs}function Wr(){return y.loadingStuckMs}function Mc(){return y.loadingStuckDebounceMs}function Nr(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function Ac(t,e){let n=Nr(t);if(!n)return"";let i="",o=0;for(let r of e||[]){let s=Nr(r.q);if(!s||!r.a)continue;if(n.includes(s)||s.includes(n))return r.a;let l=s.split(" ").filter(h=>h.length>3),m=0;for(let h of l)n.includes(h)&&m++;let f=l.length?m/l.length:0;f>o&&f>=.5&&(o=f,i=r.a)}return i}async function Dc(){let t=await v([yt,"profile"]),e=t[yt]||{},n=t.profile?.id?String(t.profile.id):null,i=n?e[n]:null;return i||(i=Object.values(e).find(o=>o?.loginId&&o?.loginPass)||null),i||{}}function Hr(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,i=Object.getOwnPropertyDescriptor(n,"value")?.set;i?i.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function $t(t){return new Promise(e=>setTimeout(e,t))}function ct(t,e){return t+Math.random()*(e-t)}async function vi(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await $t(ct(250,600)),Hr(t,"");let i="";for(let o=0;o<n.length;o++){let r=n[o];i+=r,Hr(t,i),t.dispatchEvent(new KeyboardEvent("keydown",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:r,bubbles:!0}));let s=ct(90,220);/[\s@._]/.test(r)&&(s+=ct(120,320)),Math.random()<.08&&(s+=ct(200,450)),await $t(s)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await $t(ct(200,500))}var pn=!1,hn=!1;function gn(t){return!t||t.disabled?!1:(t.click(),!0)}function Ec(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let i of t){let o=(i.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(o))continue;let r=i.querySelector("input[type='checkbox']")||document.getElementById(i.getAttribute("for")||"");r&&!r.checked&&(gn(r),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(i=>/^(continue|ok|accept|agree)$/i.test((i.textContent||i.value||"").trim()));return e&&n&&gn(n),e>0}function Br(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function Ic(t){if(pn)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;pn=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await vi(e,t.loginId),await $t(ct(400,900))),n&&t.loginPass&&!n.value&&(await vi(n,t.loginPass),await $t(ct(500,1100)));let i=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(o=>/sign in|log in|continue/i.test(o.textContent||o.value||""));return i&&(n?.value||t.loginPass)?(await $t(ct(600,1400)),gn(i),!0):!!(e||n)}finally{pn=!1}}async function Lc(t){if(hn)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let o of n){let r=(o.textContent||"").trim();if(r.length<12||r.length>220||!/\?/.test(r)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(r))continue;let s=o.querySelector("input[type='text']")||document.getElementById(o.getAttribute("for")||"")||o.parentElement?.querySelector("input[type='text']");s&&s.offsetParent!==null&&e.push({text:r,input:s})}for(let o of["kba1_response","kba2_response","kba3_response"]){let r=document.getElementById(o);if(!r)continue;let l=(r.closest(".form-group, .entry, li, div")||r.parentElement)?.textContent||"";e.some(m=>m.input===r)||e.push({text:l,input:r})}let i=[];for(let{text:o,input:r}of e){if(r.value)continue;let s=Ac(o,t.security);s&&i.push({input:r,ans:s})}if(!i.length)return!1;hn=!0;try{for(let{input:r,ans:s}of i)await vi(r,s),await $t(ct(350,800));await $t(ct(600,1400));let o=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(r=>/continue|submit|verify/i.test(r.textContent||r.value||""));return o&&gn(o),!0}finally{hn=!1}}function Fr(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||O()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function kt(){return xt()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function Pc(t=""){return/\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(t||""))}function Ti(){if(kt()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||O()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}function qc(t){return!!(t?.loginId&&t?.loginPass)}function Rc(){return Fr()?!1:!!(Br()||document.querySelector("#kba1_response, #kba2_response, #kba3_response")||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))}async function Oc(){let t=(await v(Jt))[Jt],e=!!t?.active,n=await Dc();if(O()){await dn();return}if(Ec(),Fr()){e&&(await _({[Jt]:{...t,active:!1,doneAt:Date.now()}}),c.send({action:"recoveryReturnToOfc"}));return}Rc()&&qc(n)&&await x("autofillLogin")&&(await Lc(n)||(Br()||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))&&await Ic(n))}function Ur(){if(!Ti()||Rr)return;let t=async()=>{c.alive&&await Oc()};t(),Rr=c.setInterval(t,1200)}function Kr(){return Or()+Math.random()*($c()-Or())}async function zr(){try{let t=await v(yi),e=Number(t[yi])||0;return Date.now()-e<kc()?!1:(await _({[yi]:Date.now()}),!0)}catch{return!0}}function Gr(){if(kt()||!Ti()||document.querySelector("#post_select")||Si)return;let t=()=>{c.alive&&(Si=c.setTimeout(async()=>{if(Si=null,!c.alive||kt()||Pc(location.href)||document.querySelector("#post_select")||!Ti())return;if(pn||hn||mn){t();return}if((await v(Jt))[Jt]?.active){t();return}if(!await zr()){t();return}try{location.reload()}catch{t()}},Kr()))};t()}function Yr(){if(!kt()||xi)return;let t=()=>{c.alive&&(xi=c.setTimeout(async()=>{if(xi=null,!(!c.alive||!kt())){if(await zr())try{c.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}t()}},Kr()))};t()}async function Wc(){try{let t=await v(wi),e=Number(t[wi])||0;return Date.now()-e<Mc()?!1:(await _({[wi]:Date.now()}),!0)}catch{return!0}}function jr(){if(!kt()||fn)return;let t=async()=>{if(fn=null,!(!c.alive||!kt())){try{if(Yn()){if(Ae||(Ae=Date.now()),Date.now()-Ae>=Wr()){if(await Wc()){try{E(`Date Loading stuck \u2265${Wr()/1e3}s \u2014 reloading Application Home\u2026`)}catch{}try{c.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}}Ae=Date.now()}}else Ae=0}catch{}c.alive&&kt()&&(fn=c.setTimeout(t,qr))}};fn=c.setTimeout(t,qr)}async function Vr(t){if(!/PSE0501|unable to load appointment available days/i.test(String(t||""))||mn)return;mn=!0,c.setTimeout(()=>{mn=!1},8e3);let e=await R();await _({[Jt]:{active:!0,ofcUrl:location.href,accountId:e,startedAt:Date.now()}}),c.send({action:"recoveryStart",ofcUrl:location.href})}var Ci="humanClickProfile",$i=150,ea=120,Nc=400,Xr=!1,Mt=[],bn=0,Wt=0,ee=0,k=null,Qr=0,De=!1,te=null,yn=0;function Hc(){let t=[];for(let e of document.querySelectorAll('iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]')){let n=e.getBoundingClientRect();n.width<40||n.height<20||n.width>900||n.height>400||t.push(n)}if(!t.length&&O())for(let e of document.querySelectorAll("iframe")){let n=e.getBoundingClientRect();n.width>=120&&n.width<=420&&n.height>=45&&n.height<=120&&t.push(n)}return t}function Ee(){let t=Hc();if(!t.length)return null;let e=t[0];return{x:e.left+Math.min(28,Math.max(18,e.width*.11)),y:e.top+e.height/2,w:e.width,h:e.height,left:e.left,top:e.top}}function ki(t,e,n){return n?t>=n.left-40&&t<=n.left+n.w+40&&e>=n.top-30&&e<=n.top+n.h+30:!1}function na(t){let e=performance.now();bn||(bn=e);let n=k,i=n?(t.clientX-n.x)/Math.max(24,n.w*.12):0,o=n?(t.clientY-n.y)/Math.max(20,n.h*.5):0;Mt.push({nx:Math.round(i*1e3)/1e3,ny:Math.round(o*1e3)/1e3,x:Math.round(t.clientX),y:Math.round(t.clientY),t:Math.round(e-bn)}),Mt.length>ea&&Mt.shift()}async function ia(){return(await v(Ci))[Ci]||{version:2,maxSamples:$i,samples:[],avgHoverMs:420,avgPressMs:70,avgApproachMs:800,liveTrained:!1}}function _i(t,e,n){if(!t.length)return n;let i=t.reduce((o,r)=>o+(Number(r[e])||0),0);return Math.round(i/t.length)}async function Bc(t){let e=Date.now();if(e-Qr<Nc)return null;Qr=e;let n=await ia(),i=Array.isArray(n.samples)?n.samples.slice():[];for(i.push(t);i.length>$i;)i.shift();let o={version:2,maxSamples:$i,samples:i,avgHoverMs:_i(i,"hoverMs",420),avgPressMs:_i(i,"pressMs",70),avgApproachMs:_i(i,"approachMs",800),updatedAt:e,liveTrained:!0,source:"visa-page-live"};return await _({[Ci]:o}),yn=i.length,Fc(t,o).catch(()=>{}),o}async function Fc(t,e){try{if(!await x("serverSync"))return;let n=await z()||{},o={client_id:`hc-${t.at||Date.now()}-${Math.random().toString(36).slice(2,8)}`,profile:{id:n.id||"",email:n.email||"",name:n.name||"",visa:n.visa||""},sample:t,profile_meta:{sampleCount:e?.samples?.length||0,avgHoverMs:e?.avgHoverMs,avgPressMs:e?.avgPressMs,avgApproachMs:e?.avgApproachMs,liveTrained:!0,source:"visa-page-live",extensionHost:location.host}};c.send({action:"uploadHumanClickSample",payload:o})}catch{}}function wn(){Mt=[],bn=0,Wt=0,ee=0,te=null}function Mi(){De||(De=!0,wn(),k=Ee())}function oa(){De=!1,k=null,wn()}async function Zr(t){if(c.alive){if(!O()||et()){De&&oa();return}Mi(),k||(k=Ee()),!ee&&k&&ki(t.clientX,t.clientY,k)&&(ee=performance.now()),na(t)}}async function Jr(t){if(!(!c.alive||t.button!==0)&&!(!O()||et())){Mi(),k=Ee(),Wt=performance.now(),ee||(ee=Wt),te={x:t.clientX,y:t.clientY},na(t);try{q("scanning",`Recording click\u2026 (saved ${yn} so far)`)}catch{}}}async function ta(t){if(!c.alive||t.button!==0||!Wt)return;if(!O()&&!et()){wn();return}let e=performance.now(),n=Math.max(25,Math.min(500,e-Wt)),i=Math.max(30,Math.min(3e3,Wt-(ee||Wt))),o=Mt.length?Mt[Mt.length-1].t:i,r=Math.max(i,Math.min(12e3,o||i)),s=Mt.slice(-ea),l=k&&ki(t.clientX,t.clientY,k)||k&&te&&ki(te.x,te.y,k)||!k&&s.length>=2,m=te;if(wn(),!l&&s.length<2||s.length<1&&!l)return;let f={hoverMs:Math.round(i),pressMs:Math.round(n),approachMs:Math.round(r),path:s,down:m?{x:Math.round(m.x),y:Math.round(m.y)}:null,up:{x:Math.round(t.clientX),y:Math.round(t.clientY)},target:k?{x:Math.round(k.x),y:Math.round(k.y),w:Math.round(k.w),h:Math.round(k.h),left:Math.round(k.left),top:Math.round(k.top)}:null,viewport:{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio||1,scrollX:Math.round(window.scrollX||0),scrollY:Math.round(window.scrollY||0)},pointerType:t.pointerType||"mouse",url:location.pathname+location.search,at:Date.now()};if(!f.target){let w=Ee();w&&(f.target={x:Math.round(w.x),y:Math.round(w.y),w:Math.round(w.w),h:Math.round(w.h),left:Math.round(w.left),top:Math.round(w.top)})}let h=await Bc(f);if(!h)return;let g=h.samples?.length||0;try{q("success",`Saved verify-human click #${g} \u2014 keep clicking naturally when it appears`)}catch{}}async function Uc(){try{let t=await ia(),e=t.liveTrained&&t.samples?.length||0;return yn=e,e}catch{return yn}}function ra(){if(Xr)return;Xr=!0,c.on(window,"pointermove",Zr,{passive:!0,capture:!0}),c.on(window,"pointerdown",Jr,{passive:!0,capture:!0}),c.on(window,"pointerup",ta,{passive:!0,capture:!0}),c.on(window,"mousemove",Zr,{passive:!0,capture:!0}),c.on(window,"mousedown",Jr,{passive:!0,capture:!0}),c.on(window,"mouseup",ta,{passive:!0,capture:!0});let t=async()=>{if(!c.alive)return;if(!O()||et()){De&&oa();return}Mi(),k||(k=Ee());let e=await Uc();try{q("scanning",e?`Train mode \u2014 click Verify you are human naturally (saved ${e})`:"Train mode \u2014 move mouse naturally, then click Verify you are human (recording\u2026)")}catch{}};t(),c.setInterval(t,2500)}var Kc=`
#${a.selRow} {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 11em;
  gap: 0.5em;
  width: max-content;
  max-width: 100%;
  margin: 0.25em auto 0;
  align-items: center;
}
#${a.waitTime} {
  position: fixed;
  top: 12px;
  left: calc(100vw - 210px);
  z-index: 2147483647;
  width: max-content;
  max-width: 90vw;
  min-width: 160px;
  font-size: 0.9em;
  cursor: grab;
  user-select: none;
  touch-action: none;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.28);
  box-sizing: border-box;
  transition: left 0.25s ease, top 0.25s ease, box-shadow 0.2s ease;
}
#${a.waitTime}[data-dragging] {
  cursor: grabbing;
  transition: none;
}
#${a.waitTime}[data-dodging] {
  box-shadow: 0 0 0 2px #22c55e, 0 2px 12px rgba(0,0,0,0.35);
}
#${a.recheck} {
  width: 100%;
  padding: 0.35em 0.8em;
  background-color: #1a4480;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  white-space: nowrap;
}

#${a.waitTime} .${u.pill} {
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  white-space: nowrap;
}

#${a.waitTime} .${u.pillTtl} {
  flex: 1;
  min-width: 0;
  padding: 0.35em 0.5em;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}

#${a.waitTime} .${u.pillTmr} {
  display: flex;
  align-items: center;
  padding: 0.35em 0.55em;
  border-radius: 5px 0 0 5px;
  background: rgba(255, 255, 255, 0.25);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-variant-numeric: tabular-nums;
}

#${a.waitTime} .${u.pillWait} { background-color: rgba(255, 0, 0, 0.35); color: #5c0000; }
#${a.waitTime} .${u.pillDone} { background-color: #1a4480; color: white; }

#atlas-sidebar .${u.sideLink} { background-color: #1a4480; color: white; }
#${a.datesPara} { margin: 0.5em 0; line-height: 1.45; }

#${a.datesCont} .${u.datesLnk} { color: white; }
#${a.datesCont} .${u.slotsSum} {
  font-weight: 700;
  font-size: 1.05em;
  margin-bottom: 0.4em;
  color: #0b3d2e;
}
#${a.datesCont} .${u.slotsTbl},
#${a.slotsTbl} {
  width: auto;
  min-width: 220px;
  border-collapse: collapse;
  margin: 0.25em 0 0.5em;
  font-size: 0.95em;
}
#${a.datesCont} .${u.slotsTbl} th,
#${a.datesCont} .${u.slotsTbl} td,
#${a.slotsTbl} th,
#${a.slotsTbl} td {
  border: 1px solid #cbd5e0;
  padding: 0.3em 0.75em;
  text-align: left;
}
#${a.datesCont} .${u.slotsTbl} th,
#${a.slotsTbl} th {
  background: #edf2f7;
  font-weight: 600;
}
#${a.ofcDate} { font-weight: bold; }

.${u.card} {
  max-width: 400px;
  width: 100%;
  text-align: center;
  font-family: inherit;
}
#${a.histCont} { margin: 15px auto 0; }
#${a.cdCard} {
  margin: 20px auto 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 20px;
  box-sizing: border-box;
}

#${a.histCont} .${u.cardTtl} {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
}
#${a.histCont} .${u.histScrl} {
  max-height: 250px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #ffffff;
}
#${a.histTbl} {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  color: #2d3748;
}
#${a.histTbl} thead tr {
  border-bottom: 1px solid #e2e8f0;
  background: #edf2f7;
  position: sticky;
  top: 0;
}
#${a.histTbl} th {
  padding: 6px 10px;
  text-align: center;
  font-weight: 600;
  color: #4a5568;
}
#${a.histTbl} tbody tr { border-bottom: 1px solid #e2e8f0; }
#${a.histTbl} td {
  padding: 6px 10px;
  text-align: center;
  color: #718096;
}

#${a.histTbl} td.${u.dltDn} { color: #10b981; font-weight: 500; }
#${a.histTbl} td.${u.dltUp} { color: #ef4444; font-weight: 500; }

#${a.cdCard} .${u.cardTtl} {
  margin: 0 0 12px 0;
  font-size: 12px;
  font-weight: 700;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
#${a.cdTime} {
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin: 10px 0 15px;
  font-family: monospace, inherit;
}

#${a.cdTime}.${u.cdDiv}-over { font-size: 20px; }
.${u.cdDiv} {
  border-top: 1px solid #edf2f7;
  margin-top: 15px;
  padding-top: 12px;
}

.${u.footer} { font-size: 11px; }
#${a.histCont} .${u.footer} { margin-top: 8px; }
#${a.cdCard} .${u.footer} { margin: 0; }

#${a.histCont} .${u.footer} a,
#${a.cdCard} .${u.footer} a {
  color: #1a4480;
  text-decoration: none;
  font-weight: 500;
}

.${u.hidden} { display: none; }

#${a.aiBtn} {
  width: 100%;
  padding: 0.45em 0.9em;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9em;
  font-weight: 600;
  white-space: nowrap;
}
#${a.aiBtn}.${u.aiOn} {
  background-color: #22c55e;
  box-shadow: none;
}
#${a.aiPanel} {
  width: min(100%, 560px);
  max-width: 560px;
  max-height: min(78vh, 660px);
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0.65em auto 0;
  padding: 14px;
  background: #e5e7eb;
  border: 1px solid #9ca3af;
  border-radius: 12px;
  box-shadow: none;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 15.5px;
  color: #1f2937;
  text-align: left;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
#${a.aiPanel}.${u.hidden} {
  display: none !important;
}
#${a.aiPanel} .${u.cardTtl} {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  position: sticky;
  top: 0;
  background: #e5e7eb;
  z-index: 2;
  padding: 2px 0 4px;
}
#${a.aiPanel} .${u.aiHint} {
  margin: 0 0 8px;
  font-size: 14.5px;
  line-height: 1.5;
  color: #6b7280;
  font-weight: 400;
}
#${a.aiPanel} .${u.aiHead} {
  font-weight: 700;
  color: #111827;
  font-size: 16px;
}
#${a.aiPanel} .${u.aiRow} {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}
#${a.aiPanel} .${u.aiSec} {
  margin: 0;
  padding: 16px 18px;
  background: #fff;
  border: 1.5px solid #111827;
  border-radius: 12px;
  box-sizing: border-box;
}
#${a.aiTermsGate},
#${a.aiMain} {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;
  padding: 0;
}
#${a.aiTermsGate}.${u.hidden},
#${a.aiMain}.${u.hidden} {
  display: none;
}
#${a.aiPanel} .${u.aiInfo} {
  margin: 0 0 10px;
  padding: 10px 12px;
  background: #eff6ff;
  border: 1px solid #93c5fd;
  border-radius: 8px;
  color: #1e40af;
  font-size: 14.5px;
  line-height: 1.5;
}
#${a.aiPanel} .${u.aiWarn} {
  margin: 0 0 10px;
  padding: 10px 12px;
  background: #fffbeb;
  border: 1px solid #f59e0b;
  border-radius: 8px;
  color: #92400e;
  font-size: 14.5px;
  line-height: 1.5;
}
#${a.aiPanel} .${u.aiOk},
#${a.aiStatus}.${u.aiOk} {
  margin: 0;
  padding: 10px 12px;
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 8px;
  color: #166534;
  font-size: 14.5px;
  line-height: 1.5;
}
#${a.aiPanel} label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14.5px;
  font-weight: 600;
  color: #374151;
}
#${a.aiPanel} input[type="date"],
#${a.aiPanel} input[type="text"],
#${a.aiPanel} input[type="password"],
#${a.aiPanel} input[type="email"],
#${a.aiPanel} select {
  padding: 10px 12px;
  border: 1px solid #9ca3af;
  border-radius: 8px;
  font-size: 15.5px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  color: #111827;
  min-height: 42px;
}
#${a.aiPanel} input[type="date"] {
  border: 2px solid #3b82f6;
  background: #fff;
  font-weight: 600;
  border-radius: 10px;
}
#${a.aiPanel} input[type="date"]:focus,
#${a.aiPanel} input[type="text"]:focus,
#${a.aiPanel} input[type="password"]:focus,
#${a.aiPanel} input[type="email"]:focus,
#${a.aiPanel} select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: none;
}
#${a.aiPanel} button {
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14.5px;
  font-weight: 600;
}
#${a.aiClose} { background: #eef0f3; color: #374151; }
#${a.aiSaveLogin} { background: #374151; color: #fff; }
#${a.aiWinAdd}, #${a.aiWinSave} { background: #3b82f6; color: #fff; }
#${a.aiWinReset} { background: #eef0f3; color: #374151; }
#${a.aiLoginToggle} { background: #eef0f3; color: #111827; }

#${a.aiPanel} .${u.aiSwitch} {
  position: relative;
  width: 48px;
  height: 28px;
  min-width: 48px;
  padding: 0;
  border-radius: 999px;
  background: #d1d5db;
  border: none;
  flex-shrink: 0;
  transition: background 0.15s ease;
}
#${a.aiPanel} .${u.aiSwitch}.${u.aiOnBtn} {
  background: #3b82f6;
  box-shadow: none;
}
#${a.aiPanel} .${u.aiKnob} {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  transition: transform 0.15s ease;
  pointer-events: none;
}
#${a.aiPanel} .${u.aiSwitch}.${u.aiOnBtn} .${u.aiKnob} {
  transform: translateX(20px);
}

#${a.aiStatus} { margin: 0; }
#${a.aiPanel} .${u.aiCities} {
  max-height: 150px;
  overflow: auto;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 10px;
  margin-bottom: 0;
  background: #f9fafb;
}
#${a.aiPanel} .${u.aiCityAct} {
  margin-left: 8px;
  padding: 0;
  border: none;
  background: none;
  color: #3b82f6;
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}
#${a.aiPanel} .${u.aiCityAct}:hover { color: #2563eb; }
#${a.aiPanel} .${u.aiCities} label {
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  margin: 5px 0;
  color: #1f2937;
  font-size: 14.5px;
}
#${a.aiPanel} .${u.aiCities} input[type="checkbox"] {
  margin: 0;
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
}
#${a.aiPanel} .${u.aiRow} label { flex: 1; min-width: 140px; }

#${a.aiWinList} {
  display: grid;
  gap: 10px;
  margin: 0 0 6px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
}
#${a.aiPanel} .${u.aiWinRow} {
  display: grid;
  gap: 4px;
  padding: 12px;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}
#${a.aiPanel} .${u.aiWinRow}:last-child {
  padding-bottom: 12px;
}
#${a.aiPanel} .${u.aiInline} {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
#${a.aiPanel} .${u.aiInline} select {
  width: auto;
  min-width: 96px;
  flex: 0 0 auto;
  font-size: 15.5px;
  font-weight: 500;
  border: 1px solid #9ca3af;
  border-radius: 8px;
  background: #fff;
  min-height: 42px;
}
#${a.aiPanel} .${u.aiInline} .${u.aiHead} {
  margin: 0;
  flex-direction: row;
  font-size: 14.5px;
}
#${a.aiPanel} .${u.aiWinHelp} {
  font-size: 14.5px;
  color: #6b7280;
  margin-left: 2px;
}
#${a.aiPanel} .${u.aiTrash} {
  margin-left: auto;
  padding: 7px;
  background: transparent;
  color: #ef4444;
  border: none;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
#${a.aiPanel} .${u.aiTrash}:hover { background: #fef2f2; }
#${a.aiWinNote} { margin: 0 0 8px; font-size: 14.5px; color: #6b7280; }

#${a.aiPanel} .${u.aiTerms} {
  margin: 0;
  padding: 18px 16px;
  background: #fff;
  border: 1.5px solid #111827;
  border-radius: 12px;
  font-size: 14.5px;
  line-height: 1.55;
  color: #374151;
  box-sizing: border-box;
}
#${a.aiPanel} .${u.aiTerms} .${u.aiHead} {
  margin: 0 0 6px;
  font-size: 20px;
  text-align: center;
}
#${a.aiPanel} .${u.aiTerms} .${u.aiHint} {
  text-align: center;
  margin: 0 0 14px;
}
#${a.aiPanel} .${u.aiTermsList} {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  display: grid;
  gap: 10px;
}
#${a.aiPanel} .${u.aiTermsList} li {
  margin: 0;
  padding: 12px 14px 12px 42px;
  position: relative;
  background: #f8fafc;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  color: #1f2937;
  font-size: 14.5px;
  line-height: 1.5;
}
#${a.aiPanel} .${u.aiTermsList} li::before {
  content: "";
  position: absolute;
  left: 14px;
  top: 14px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #3b82f6;
  box-shadow: inset 0 0 0 4px #dbeafe;
}
#${a.aiPanel} .${u.aiTermsCb} {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  font-weight: 600;
  color: #111827;
  cursor: pointer;
  padding: 10px 12px;
  border: 1px solid #93c5fd;
  border-radius: 10px;
  background: #eff6ff;
  margin-bottom: 12px;
}
#${a.aiPanel} .${u.aiTermsCb} input[type="checkbox"] {
  margin: 2px 0 0;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  accent-color: #3b82f6;
}
#${a.aiPanel} .${u.aiContinue} {
  width: 100%;
  padding: 12px 16px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15.5px;
  font-weight: 700;
  cursor: pointer;
}
#${a.aiPanel} .${u.aiContinue}:disabled {
  background: #94a3b8;
  cursor: not-allowed;
  opacity: 0.75;
}
#${a.aiTermsContinue}:not(:disabled) {
  background: #2563eb;
}

#${a.cfHud} {
  position: fixed;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2147483646;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
#${a.cfHud} .${u.cfHud} {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 300px;
  max-width: min(92vw, 420px);
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.94), rgba(30, 41, 59, 0.92));
  color: #e2e8f0;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.04) inset;
  backdrop-filter: blur(10px);
}
#${a.cfHud} .${u.cfHud}[data-state="success"] {
  border-color: rgba(34, 197, 94, 0.45);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 24px rgba(34, 197, 94, 0.15);
}
#${a.cfHud} .${u.cfHud}[data-state="manual"] {
  border-color: rgba(251, 191, 36, 0.45);
}
#${a.cfHud} .${u.cfHud}[data-state="debugger"] {
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.32), 0 0 28px rgba(59, 130, 246, 0.18);
}
#${a.cfHud} .${u.cfPulse} {
  width: 10px;
  height: 10px;
  margin-top: 5px;
  border-radius: 50%;
  background: #60a5fa;
  box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.55);
  animation: ${d}cfpulse 1.6s ease-out infinite;
  flex-shrink: 0;
}
#${a.cfHud} .${u.cfHud}[data-state="success"] .${u.cfPulse} {
  background: #4ade80;
  animation: none;
  box-shadow: 0 0 12px rgba(74, 222, 128, 0.65);
}
#${a.cfHud} .${u.cfHud}[data-state="manual"] .${u.cfPulse} {
  background: #fbbf24;
}
@keyframes ${d}cfpulse {
  0% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.55); }
  70% { box-shadow: 0 0 0 10px rgba(96, 165, 250, 0); }
  100% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0); }
}
#${a.cfHud} .cf-hud-body { flex: 1; min-width: 0; }
#${a.cfHud} .cf-hud-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
#${a.cfHud} .cf-hud-icon { font-size: 14px; line-height: 1; }
#${a.cfHud} .cf-hud-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #f8fafc;
}
#${a.cfHud} .cf-hud-chip {
  margin-left: auto;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
  border: 1px solid rgba(96, 165, 250, 0.35);
}
#${a.cfHud} .cf-hud-chip[data-state="success"] {
  background: rgba(34, 197, 94, 0.18);
  color: #86efac;
  border-color: rgba(74, 222, 128, 0.35);
}
#${a.cfHud} .cf-hud-chip[data-state="manual"] {
  background: rgba(251, 191, 36, 0.15);
  color: #fcd34d;
  border-color: rgba(251, 191, 36, 0.35);
}
#${a.cfHud} .cf-hud-msg {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.35;
  color: #f1f5f9;
}
#${a.cfHud} .cf-hud-sub {
  margin-top: 3px;
  font-size: 11px;
  line-height: 1.35;
  color: #94a3b8;
}
.${u.cfFlash} {
  position: fixed;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid rgba(96, 165, 250, 0.85);
  box-shadow: 0 0 18px rgba(59, 130, 246, 0.55);
  z-index: 2147483647;
  pointer-events: none;
  animation: ${d}cfring 1.1s ease-out forwards;
}
@keyframes ${d}cfring {
  0% { transform: scale(0.6); opacity: 1; }
  100% { transform: scale(2.2); opacity: 0; }
}
`;function aa(){if(document.querySelector(p(a.styles)))return;let t=document.createElement("style");t.id=a.styles,t.dataset[C.mark]="",t.textContent=Kc,(document.head||document.documentElement).appendChild(t)}Fi();ai();Di(()=>{mr(),c.destroy()});Zi();Lr();if(!M()){c.disposable(()=>{let i=document.querySelector(p(a.anchor)),o=document.querySelector("#post_select");i&&o&&i.replaceWith(o);for(let r of document.querySelectorAll("[data-"+C.mark+"]"))r.remove()}),aa(),c.send({action:"registerBlockGuard",prefix:d}),c.send({action:"registerRedirect",prefix:d}),c.send({action:"registerAlertGuard",prefix:d}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&c.send({action:"registerOfcReader",prefix:d}),c.on(window,"message",i=>{if(c.alive&&i.source===window)switch(i.data?.action){case pt.req:return kr(i);case pt.res:return $r(i);case pt.ofc:return To(i);case pt.err:return pe("native_alert",i.data?.text),Vr(i.data?.text);case pt.sub:yo(),me(),Lo();return}}),chrome.storage.onChanged.addListener((i,o)=>{o==="local"&&(i.profile&&qn(),i.waitPillClock&&ho(i.waitPillClock.newValue),i.autoCloudflareTick&&(i.autoCloudflareTick.newValue?bi():gi()))}),c.on(document,"click",i=>{Kt();let o=i.target.closest(p(a.waitTime));if(o){if(o.dataset.skipClick){delete o.dataset.skipClick;return}po()}}),c.on(document,"keydown",Kt),c.on(window,"focus",Kt),c.on(document,"visibilitychange",()=>{document.hidden||Kt()}),Ur(),Gr(),Yr(),jr(),ra(),bi();async function t(){!c.alive||M()||!xt()||document.querySelector("#post_select")&&(Tt(),await Promise.all([En(),Ln(),si()]),Wo({slotIndex:Je,shouldPick:async()=>await st()?!0:!!await x("autoSelectFirstDate"),onSlotPicked:()=>pr()}))}async function e(){!c.alive||M()||!xt()||await dr()}async function n(){zi(),Yi(),await Promise.all([qn(),Vi(),ji(),En(),Ln(),si()]),Tn()}document.readyState==="complete"?n():c.on(window,"load",n),c.setInterval(t,2500),c.setInterval(e,3e4),e()}})();
