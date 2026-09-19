(()=>{function F(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function C(t){return F()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,i]of Object.entries(t))e[n]=i;return e}):Promise.resolve(typeof t=="string"?{}:t)}function T(t){return F()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function Lo(t){return F()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function Po(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",i=>{String(i.reason?.message||i.reason||"").includes("Extension context invalidated")&&(i.preventDefault(),e())});let n=setInterval(()=>{F()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var Ft="https://the.gopg.online",ri=`${Ft}/contribute`,qo=`${Ft}/contribute/telegram`,Eu=`${Ft}/contribute/human-click`,en=`${Ft}/contribute/tik-tik-prefs`,Ro=`${Ft}/contribute/tik-tik-coord`;var Oo=20,No=4320*60*1e3,nn=100,Wo=4,on=100,Ho=240,Bo=50,Fo=1440*60*1e3,As={recheckButton:!1,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function x(t){return C({[t]:As[t]}).then(e=>e[t])}function St(){return C({posts:[]}).then(t=>t.posts)}function ee(t){return T({posts:t})}function G(){return C("profile").then(t=>t.profile)}var Ut=t=>String(t).padStart(2,"0");function ve(t){let e=Ut(t%60),n=Math.floor(t/60)%60,i=Math.floor(t/3600);return i?`${Ut(i)}:${Ut(n)}:${e}`:`${Ut(n)}:${e}`}function Uo(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${Ut(n.getUTCHours())}:${Ut(n.getUTCMinutes())}:${Ut(n.getUTCSeconds())}`}}function ai(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),i=t%60,o=[];return e>0&&o.push(`${e}d`),(n>0||e>0)&&o.push(`${n}h`),o.push(`${i}m`),o.join(" ")}function Ko(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),i=o=>n.find(r=>r.type===o)?.value??"";return`${i("month")} ${i("day")} ${i("year")} ${i("hour")}:${i("minute")} ${i("dayPeriod")}`}function Go(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),i=parseInt(e[2],10),o=parseInt(e[3],10),r=e[4];r&&(r.toUpperCase()==="PM"&&n<12&&(n+=12),r.toUpperCase()==="AM"&&n===12&&(n=0));let s=new Date;return s.setHours(n,i,o,0),s.getTime()>Date.now()+6e4&&s.setDate(s.getDate()-1),s}var zo=Symbol(),Ds=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&F()}on(t,e,n,i){t.addEventListener(e,n,{...i,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!F())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=Wo,interval:n=nn}={}){return new Promise(i=>{let o=r=>{if(!this.alive)return;let s=document.querySelector(t);if(s)return i(s);if(r>=e)return i(null);this.setTimeout(()=>o(r+1),n)};o(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},l=new Ds;function jo(){let t=globalThis[zo];Object.defineProperty(globalThis,zo,{value:l,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var rn=new Uint32Array(2);crypto.getRandomValues(rn);var Yo="abcdefghjkmnpqrstuvwxyz",Es=(rn[0].toString(36)+rn[1].toString(36)).replace(/[^a-z0-9]/g,""),m=(Yo[rn[0]%Yo.length]+Es).slice(0,8).padEnd(8,"x");function p(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var a={selRow:m+"01",anchor:m+"02",waitTime:m+"03",recheck:m+"04",histCont:m+"05",histTbl:m+"06",cdCard:m+"07",cdTime:m+"08",ofcDate:m+"09",styles:m+"10",datesCont:m+"11",datesPara:m+"12",slotsTbl:m+"12b",aiBtn:m+"13",aiPanel:m+"14",aiFrom:m+"15",aiTo:m+"16",aiStatus:m+"17",aiConfirm:m+"18",aiCancel:m+"19",aiClose:m+"20",aiCities:m+"21",aiSubmitBtn:m+"22",aiCitiesBtn:m+"23",aiLogin:m+"24",aiPass:m+"25",aiQ1:m+"26",aiA1:m+"27",aiQ2:m+"28",aiA2:m+"29",aiQ3:m+"30",aiA3:m+"31",aiSaveLogin:m+"32",cfHud:m+"33",aiCitiesAll:m+"34",aiCitiesNone:m+"35",aiLoginToggle:m+"36",aiLoginBody:m+"37",aiSubmitOn:m+"38",aiSubmitOff:m+"39",aiCitiesOn:m+"40",aiCitiesOff:m+"41",aiWinList:m+"42",aiWinAdd:m+"43",aiWinSave:m+"44",aiWinReset:m+"45",aiWinNote:m+"46",aiSubmitSw:m+"47",aiCitiesSw:m+"48",aiInfoBox:m+"49",aiWarnBox:m+"50",aiOkBox:m+"51",aiWinCard:m+"52",aiSubmitBody:m+"53",aiCitiesBody:m+"54",aiTerms:m+"55",aiTermsAgree:m+"56",aiTermsGate:m+"57",aiMain:m+"58",aiTermsContinue:m+"59",aiFromBtn:m+"60",aiToBtn:m+"61",aiCal:m+"62"},u={pill:m+"a",pillTtl:m+"b",pillTmr:m+"c",pillWait:m+"d",pillDone:m+"e",footer:m+"f",card:m+"g",cardTtl:m+"h",histScrl:m+"i",dltDn:m+"j",dltUp:m+"k",cdDiv:m+"l",hidden:m+"m",sideLink:m+"n",datesLnk:m+"o",slotsSum:m+"o2",slotsTbl:m+"o3",aiOn:m+"p",aiRow:m+"q",aiHint:m+"r",aiCities:m+"s",aiOnBtn:m+"t",aiCityAct:m+"x",cfHud:m+"u",cfPulse:m+"v",cfFlash:m+"w",aiEn:m+"y",aiDis:m+"z",aiWinRow:m+"aa",aiFeat:m+"ab",aiSwitch:m+"ac",aiKnob:m+"ad",aiSec:m+"ae",aiInfo:m+"af",aiWarn:m+"ag",aiOk:m+"ah",aiTrash:m+"ai",aiWinHelp:m+"aj",aiInline:m+"ak",aiHead:m+"al",aiTerms:m+"am",aiTermsCb:m+"an",aiTermsList:m+"ao",aiContinue:m+"ap",aiDateBtn:m+"aq",aiCal:m+"ar",aiCalHead:m+"as",aiCalGrid:m+"at",aiCalDay:m+"au",aiCalMuted:m+"av",aiCalOn:m+"aw",aiCalToday:m+"ax"},$={mark:m,w:m+"w",mw:m+"mw"},Et={req:m+"q",res:m+"r",ofc:m+"o",err:m+"e",sub:m+"s"};function an(t){return t.map(e=>String.fromCharCode(e)).join("")}function Is(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function Vo(){let t=document.createElement("div");return t.className=u.footer,t.textContent=an([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function Ls(t){let e=document.getElementById(a.histCont);e&&e.remove(),e=document.createElement("div"),e.id=a.histCont,e.className=u.card,e.dataset[$.mark]="";let n=document.createElement("h4");n.className=u.cardTtl,n.textContent=an([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let i=document.createElement("div");i.className=u.histScrl;let o=document.createElement("table");o.id=a.histTbl;let r=document.createElement("thead"),s=document.createElement("tr");for(let f of["Time","Est. Wait","Change"]){let g=document.createElement("th");g.textContent=f,s.appendChild(g)}r.appendChild(s),o.appendChild(r);let c=document.createElement("tbody");for(let f=t.length-1;f>=0;f--){let g=t[f],h="--",w="";if(f>0){let M=g.minutes-t[f-1].minutes;M<0?(h=`${M}m`,w=u.dltDn):M>0?(h=`+${M}m`,w=u.dltUp):h="0m"}let v=document.createElement("tr"),K=[[g.timeStr,""],[ai(g.minutes),""],[h,w]];for(let[M,z]of K){let S=document.createElement("td");z&&(S.className=z),S.textContent=M,v.appendChild(S)}c.appendChild(v)}o.appendChild(c),i.appendChild(o),e.appendChild(i),e.appendChild(Vo());let d=document.getElementById("last-updated");d&&(d.closest("div, p, section")||d.parentElement).insertAdjacentElement("afterend",e)}function Ps(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function Xo(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),i=Ps();if(i!==null&&i>Ho&&!e.textContent.includes("(")){let s=ai(i);e.textContent=`${e.textContent} (${i} minutes / ${s})`}let o=n.textContent.trim().split(" (")[0],r=Go(o);if(r&&l.setInterval(()=>{let s=Math.floor((Date.now()-r)/1e3);s>=0&&(n.textContent=`${o} (${s}s ago)`)},1e3),i!==null){let s=Is(),c=sessionStorage.getItem(s);c||(c=Math.random().toString(36).substring(2,11),sessionStorage.setItem(s,c)),C({queueHistory:{}}).then(d=>{let f=d.queueHistory||{},g=Date.now(),h={};for(let[M,z]of Object.entries(f)){if(!Array.isArray(z))continue;let S=z[z.length-1];S&&g-S.timestamp<Fo&&(h[M]=z)}let w=h[c]||[],v=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),K=w[w.length-1];(!K||K.minutes!==i||K.timeStr!==v)&&(w.push({timestamp:g,timeStr:v,minutes:i}),w.length>Bo&&w.shift(),h[c]=w,T({queueHistory:h})),Ls(w)})}}function Qo(t,e){let n=document.getElementById("error_row");if(!n)return;let i;t?i=e?`Blocked for 24 hours, about ${ve(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":i="Temporarily blocked. Log in in a new tab, then refresh this page.";let o=document.createElement("div");o.className="atlas_validationalert alert alert-danger warning",o.dataset[$.mark]="",o.textContent=i,n.replaceChildren(o),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function Jo(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&C({cfRetryAfter:null}).then(n=>{let i=parseInt(n.cfRetryAfter,10);if(!isNaN(i)){Lo("cfRetryAfter");let o=document.getElementById("what-happened-section");if(o){let r=document.createElement("div");r.id=a.cdCard,r.className=u.card,r.dataset[$.mark]="";let s=document.createElement("h4");s.className=u.cardTtl,s.textContent=an([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),r.appendChild(s);let c=document.createElement("div");c.id=a.cdTime,r.appendChild(c);let d=document.createElement("div");d.className=u.cdDiv,r.appendChild(d),r.appendChild(Vo()),o.appendChild(r);let f=i,g=null,h=()=>{f>0?(c.textContent=ve(f),f--):(c.classList.add(u.cdDiv+"-over"),c.textContent="You can try refreshing now!",g!=null&&l.clear(g))};h(),g=l.setInterval(h,1e3)}}})}async function Zo(){let t=document.querySelector(".username");if(!t)return;let n=(t.innerText||"").trim().match(/^(.*)\((\d+)\)\s*$/);if(!n)return;let[,i,o]=n,r=await G()||{},s=!r.id||r.id===o||String(r.id).includes(o)?r:{};s.name=i.trim(),s.id=o;let c=document.querySelectorAll("script");for(let d of c){let f=d.innerText.trim();if(f.includes("setAuthenticatedUserContext")){let g=/setAuthenticatedUserContext\('([^']*)'\)/,h=f.match(g);h&&(s.email=h[1])}}await T({profile:s})}async function tr(){let t=document.querySelector("#post_select");if(!t)return;let e=await St();for(let n of t.options){if(!n.value)continue;e.findIndex(o=>o.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await ee(e)}var qs=["visa-information","fee-payment","appointment-confirmation"];function Rs(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(i=>{let o=i.querySelector(".text-bold");if(!o)return;let r=Os(o.textContent);if(!qs.includes(r))return;let s=Ns(i);s&&(n[r]=s)}),Object.keys(n).length?n:null}function Os(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Ns(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function ne(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>No)return null}catch{}return t.value}function Ws(t){let e=(t.posts||[]).filter(o=>o.Updated).sort((o,r)=>o.Updated-r.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},i=ne(t.cgiIdToken);return i&&(n.token=i),n}async function si(){if(!F()||!await x("serverSync"))return;let t=await C(["profile","posts","cgiIdToken"]),e=Ws(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await fetch(ri,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(o=>o.json());if(!n.success)return;let i="0";n.contribs>0&&(i=n.contribs.toString()),n.contribs>10&&(i="10+"),n.contribs>0&&await T({contribs:{email:t.profile?.email,updated:Date.now(),count:i}})}catch{}}function ci(t=0){F()&&document.querySelector("#appointment-card")&&x("serverSync").then(e=>{if(!e)return;let n=Rs();if(!n){t<Oo&&l.setTimeout(()=>ci(t+1),nn);return}C(["profile","cgiIdToken","savedDashboard"]).then(i=>{let o=ne(i.cgiIdToken);o&&JSON.stringify(n)!==JSON.stringify(i.savedDashboard)&&fetch(ri,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:i.profile,dashboard:n,token:o})}).then(r=>r.json()).then(r=>{r.success&&T({savedDashboard:n})}).catch(()=>{})})})}var Hs=`${Ft}/extension-runtime-config.json`,ui="vsRuntimeConfig",Bs=300*1e3,li=0,Ce=null,b={slotWindowLabel:":14\u2013:21, :24\u2013:31, :54\u2013:02",slotWindows:[{slot:1,fromMin:0,toMin:2},{slot:2,fromMin:14,toMin:21},{slot:3,fromMin:24,toMin:31},{slot:4,fromMin:54,toMin:59}],windowStartsMin:[0,14,24,54],cityLoadingMaxMs:18e4,cityCalendarNoDatesMs:2e4,cityRotateMinGapMs:13e3,cityRotateMaxGapMs:18e3,cityHoldMaxMs:45e3,homeKeepaliveMinMs:6e5,homeKeepaliveMaxMs:6e5,homeKeepaliveDebounceMs:48e4,loadingStuckMs:12e4,loadingStuckDebounceMs:9e4,remoteVersion:0,source:"bundled"};function V(t,e,n,i){let o=Number(t);return Number.isFinite(o)?Math.min(n,Math.max(e,Math.round(o))):i}function Fs(t){if(!Array.isArray(t)||!t.length||t.length>24)return null;let e=[];for(let n of t){let i=V(n?.fromMin,0,59,NaN),o=V(n?.toMin,0,59,NaN);if(!Number.isFinite(i)||!Number.isFinite(o)||i>o)return null;let r=V(n?.slot,1,12,1);e.push({slot:r,fromMin:i,toMin:o})}return e}function Us(t){let e=[...new Set(t.map(n=>n.fromMin))].sort((n,i)=>n-i);return e.length?e:b.windowStartsMin.slice()}function er(t,e="remote"){if(!t||typeof t!="object")return!1;let n=Fs(t.slotWindows);if(n){b.slotWindows.length=0;for(let i of n)b.slotWindows.push(i);b.windowStartsMin=Us(n)}return typeof t.slotWindowLabel=="string"&&t.slotWindowLabel.length<120&&(b.slotWindowLabel=t.slotWindowLabel),b.cityLoadingMaxMs=V(t.cityLoadingMaxMs,1e4,3e5,b.cityLoadingMaxMs),b.cityCalendarNoDatesMs=V(t.cityCalendarNoDatesMs,5e3,12e4,b.cityCalendarNoDatesMs),b.cityRotateMinGapMs=V(t.cityRotateMinGapMs,5e3,6e4,b.cityRotateMinGapMs),b.cityRotateMaxGapMs=V(t.cityRotateMaxGapMs,b.cityRotateMinGapMs,9e4,Math.max(b.cityRotateMinGapMs,b.cityRotateMaxGapMs)),b.cityHoldMaxMs=V(t.cityHoldMaxMs,1e4,18e4,b.cityHoldMaxMs),b.homeKeepaliveMinMs=V(t.homeKeepaliveMinMs,12e4,18e5,b.homeKeepaliveMinMs),b.homeKeepaliveMaxMs=V(t.homeKeepaliveMaxMs,b.homeKeepaliveMinMs,18e5,Math.max(b.homeKeepaliveMinMs,b.homeKeepaliveMaxMs)),b.homeKeepaliveDebounceMs=V(t.homeKeepaliveDebounceMs,6e4,18e5,b.homeKeepaliveDebounceMs),b.loadingStuckMs=V(t.loadingStuckMs,3e4,6e5,b.loadingStuckMs),b.loadingStuckDebounceMs=V(t.loadingStuckDebounceMs,3e4,6e5,b.loadingStuckDebounceMs),b.remoteVersion=V(t.version,0,1e9,b.remoteVersion),b.source=e,!0}async function Ks(){try{let e=(await C(ui))[ui];e?.config&&er(e.config,"cache")}catch{}}async function Gs(t){try{await T({[ui]:{config:t,fetchedAt:Date.now()}})}catch{}}async function zs({force:t=!1}={}){let e=Date.now();if(!t&&e-li<Bs)return b;if(Ce)return Ce;Ce=(async()=>{await Ks();try{let n=await fetch(Hs,{method:"GET",cache:"no-store",signal:AbortSignal.timeout(8e3)});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.json();if(!i||typeof i!="object"||Array.isArray(i))throw new Error("bad json");if(i.script||i.code||i.eval)throw new Error("unsafe keys");er(i,"remote"),await Gs(i),li=Date.now()}catch{li=Date.now()}return b})();try{return await Ce}finally{Ce=null}}function nr(){zs().catch(()=>{})}var It=null,Te=null;function ir(){return It||b.slotWindows}function ut(){return Te||(It?.length?or(It):b.slotWindowLabel)}var Zu=b.slotWindows,xt=4,Lt=6;function or(t){return t?.length?t.map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", "):b.slotWindowLabel}function di(t){if(!Array.isArray(t))return[];let e=[];for(let n of t){if(e.length>=xt)break;let i=Number(n?.fromMin),o=Number(n?.durationMin??n?.duration);if(!Number.isFinite(i)||i<0||i>59)continue;let r=Math.min(Lt,59-i);if(r<1)continue;if(!Number.isFinite(o)||o<1){let c=Number(n?.toMin);if(!Number.isFinite(c)||c<i||c>59||(o=Math.min(r,c-i),o<1))continue}o=Math.min(r,Math.max(1,Math.round(o)));let s=Math.min(59,i+o);e.push({slot:e.length+1,fromMin:Math.round(i),toMin:s,durationMin:o})}return e}function rr(t){let e=di(t||[]);return e.length?(It=e.map(({slot:n,fromMin:i,toMin:o})=>({slot:n,fromMin:i,toMin:o})),Te=or(It),It):(It=null,Te=null,null)}function fi(){It=null,Te=null}function ar(t){let e=t?.length?t:b.slotWindows,n=[];for(let i of e||[]){if(n.length>=xt)break;let o=Number(i.fromMin),r=Number(i.toMin);if(!Number.isFinite(o)||!Number.isFinite(r)||r<o||o===0&&r<=2&&(e||[]).some(d=>Number(d.fromMin)>=54))continue;let s=Math.min(Lt,59-o);if(s<1)continue;let c=Math.min(s,Math.max(1,r-o));n.push({fromMin:o,durationMin:c})}return n}function sr(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=i=>Number(e.find(o=>o.type===i)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function ie(t=new Date){let{minute:e}=sr(t),n=ir();for(let i of n)if(e>=i.fromMin&&e<=i.toMin)return i.slot;return 0}function _e(t=new Date){if(ie(t))return 0;let{minute:e,second:n}=sr(t),i=e*60+n,o=ir(),r=[...new Set(o.map(c=>c.fromMin))].sort((c,d)=>c-d);for(let c of r){let d=c*60;if(i<d)return(d-i)*1e3}let s=r[0]??0;return(3600-i+s*60)*1e3}function mi(t){return t<9e4?`${Math.ceil(t/1e3)}s`:`${Math.ceil(t/6e4)}m`}function pr(){let t=document.querySelector(p(a.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=a.selRow,t.dataset[$.mark]="",n.insertAdjacentElement("afterend",t);let i=document.createElement("span");return i.id=a.anchor,i.dataset[$.mark]="",i.dataset[$.w]=e.style.width,i.dataset[$.mw]=e.style.minWidth,i.hidden=!0,e.insertAdjacentElement("beforebegin",i),l.setStyle(e,"width","100%"),l.setStyle(e,"minWidth","0"),t.appendChild(e),t}var $e="waitPillState",js=3600*1e3,cr=u.pillWait,Ys=u.pillDone;function Vs(t,e){let n=document.createElement("span");n.className=`${u.pill} ${e}`;let i=(o,r)=>{let s=document.createElement("span");s.className=o,s.textContent=r,n.appendChild(s)};return i(u.pillTtl,t.title),t.timer!==void 0&&i(u.pillTmr,t.timer),n}function Xs(t,e=Date.now()){if(t.kind==="waiting")return{variant:cr};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:cr}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:Ys}}return null}function Qs(t,e,n=new Date){let i=Uo(n);return t.seconds===void 0?{title:i}:{title:i,timer:ve(t.seconds)}}var Js=class{#t=null;#e={kind:"idle"};#i=null;#n=null;#o=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get($e))[$e];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>js){chrome.storage.local.remove($e);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#o=t,this.#r(),this.#c()}toggleClockMode(){l.alive&&(this.setClockMode(!this.#o),chrome.storage.local.set({waitPillClock:this.#o}))}render(t){return Xs(this.#e,t)}#l(t){return Qs(t,this.#o,new Date)}#r(){if(this.#t??=tc(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(u.hidden);return}this.#t.classList.remove(u.hidden),this.#t.replaceChildren(Vs(this.#l(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#i&&(l.clear(this.#i),this.#i=null),t.kind==="running"?(chrome.storage.local.set({[$e]:t}),this.#i=l.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove($e),this.#r(),this.#c()}#u(){this.#r(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,x("audioAlert").then(t=>{t&&dc()})))}#c(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=l.setInterval(()=>this.#r(),1e3):!t&&this.#n&&(l.clear(this.#n),this.#n=null)}},se=new Js,Ee="pillPosition",lr=4;function ur(t,e,n){return Math.max(e,Math.min(n,t))}function hr(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,i=e.height>0?e.height:36;return{w:n,h:i}}function oe(t,e,n){let{w:i,h:o}=hr(t),r=ur(e,0,Math.max(0,window.innerWidth-i)),s=ur(n,0,Math.max(0,window.innerHeight-o));return t.style.setProperty("left",r+"px","important"),t.style.setProperty("top",s+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:r,top:s}}function Zs(t){var e=!1,n=!1,i=0,o=0,r=0,s=0;function c(f){if(e){var g=f.touches?f.touches[0]:f,h=g.clientX-i,w=g.clientY-o;!n&&Math.abs(h)<lr&&Math.abs(w)<lr||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",oe(t,r+h,s+w),f.cancelable&&f.preventDefault())}}function d(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",d),document.removeEventListener("touchmove",c),document.removeEventListener("touchend",d),n){let f=t.getBoundingClientRect();chrome.storage.local.set({[Ee]:{top:Math.round(f.top),left:Math.round(f.left)}})}n=!1}}t.addEventListener("mousedown",function(f){if(f.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let g=t.getBoundingClientRect();i=f.clientX,o=f.clientY,r=g.left,s=g.top,oe(t,g.left,g.top),document.addEventListener("mousemove",c),document.addEventListener("mouseup",d),f.preventDefault(),f.stopPropagation()}),t.addEventListener("touchstart",function(f){e=!0,n=!1,delete t.dataset.skipClick;let g=t.getBoundingClientRect();i=f.touches[0].clientX,o=f.touches[0].clientY,r=g.left,s=g.top,oe(t,g.left,g.top),document.addEventListener("touchmove",c,{passive:!1}),document.addEventListener("touchend",d)},{passive:!0})}function tc(){let t=document.querySelector(p(a.waitTime));return t||(t=document.createElement("div"),t.id=a.waitTime,t.className=u.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),Zs(t),chrome.storage.local.get(Ee).then(e=>{let n=e[Ee];n&&typeof n.top=="number"&&typeof n.left=="number"&&oe(t,n.left,n.top)}),oc(t),t)}function dr(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function ec(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function nc(t){let{w:e,h:n}=hr(t),i=12;return[{left:i,top:i},{left:Math.max(i,window.innerWidth-e-i),top:i},{left:i,top:Math.max(i,window.innerHeight-n-i)},{left:Math.max(i,window.innerWidth-e-i),top:Math.max(i,window.innerHeight-n-i)}]}async function ic(){let e=(await chrome.storage.local.get(Ee))[Ee];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function oc(t){let e=!1,n=async()=>{if(!l.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(u.hidden))return;let i=ec(),o=!!(i&&i.offsetParent!==null&&i.getBoundingClientRect().height>20),r=t.getBoundingClientRect();if(o&&dr(r,i.getBoundingClientRect())){let s=i.getBoundingClientRect(),c=nc(t),d=c.find(f=>{let g={left:f.left,top:f.top,right:f.left+r.width,bottom:f.top+r.height};return!dr(g,s)})||c[2];e=!0,t.setAttribute("data-dodging",""),oe(t,d.left,d.top);return}if(e&&!o){e=!1,t.removeAttribute("data-dodging");let s=await ic();s&&oe(t,s.left,s.top)}else o||t.removeAttribute("data-dodging")};l.setInterval(n,400),l.on(window,"resize",n)}async function yi(){if(!l.alive||!await x("defaultWaitTime")||!await l.waitFor("#post_select",{attempts:on}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});se.setClockMode(t),await se.restore()}async function gr(){await x("defaultWaitTime")&&se.waiting()}async function pn(t){await x("defaultWaitTime")&&se.run(t)}function yr(){se.toggleClockMode()}function br(t){se.setClockMode(t)}var ke=null,Me=null,sn=null;function bi(){return sn||(sn=new(window.AudioContext||window.webkitAudioContext),l.disposable(()=>sn?.close())),sn}async function hn(t=150){try{let e=bi();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let o=e.currentTime,r=t/1e3;i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(.1,o+.01),i.gain.setValueAtTime(.1,o+Math.max(.01,r-.02)),i.gain.linearRampToValueAtTime(0,o+r),n.start(),n.stop(o+r)}catch(e){console.error("Audio beep failed:",e)}}function rc(t,e=125,n=125){let i=0,o=()=>{i>=t||(hn(e),i++,l.setTimeout(o,e+n))};o()}var pi=4,fr=50,mr=50,ac=600;function wr(){if(Me)return;let t=()=>{rc(pi,fr,mr);let e=pi*fr+(pi-1)*mr;Me=l.setTimeout(t,e+ac)};t()}var sc=250,cc=10,lc=300,uc=1e3;function dc(){if(ke)return;let t=[];for(let o=0;o<=lc;o+=cc)t.push(o);let e=Date.now(),n=0,i=()=>{let o=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&o>=t[n];){let r=n===t.length-1;hn(r?uc:sc),n++}if(n<t.length){let r=t[n],s=e+r*1e3,c=Math.max(0,s-Date.now());ke=l.setTimeout(i,c)}else ce()};i()}function ce(t={}){let e=!!t.keepConsular;ke&&(l.clear(ke),ke=null),Me&&(l.clear(Me),Me=null),hi(),e||gi()}var cn=null,ln=null,re=null,un=null,Ae=null;async function Sr(){hi();try{let t=bi();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=880,i.frequency.value=1320,o.gain.value=.85,r.gain.value=.65,n.connect(o).connect(e),i.connect(r).connect(e);let s=t.createOscillator(),c=t.createGain();s.type="triangle",s.frequency.value=3.2,c.gain.value=280,s.connect(c),c.connect(n.frequency),c.connect(i.frequency);let d=t.currentTime;n.start(d),i.start(d),s.start(d),re={osc1:n,osc2:i,lfo:s,master:e};let f=()=>{re&&(hn(500),ln=l.setTimeout(f,1800))};f(),cn=l.setTimeout(hi,12e4),Ae=document.title;let g=!1,h=()=>{re&&(document.title=g?Ae:"!!! SUBMIT CLICKED !!!",g=!g,un=l.setTimeout(h,450))};h()}catch(t){console.error("Submit alarm failed:",t)}}function hi(){if(cn&&(l.clear(cn),cn=null),ln&&(l.clear(ln),ln=null),un&&(l.clear(un),un=null),Ae&&(document.title=Ae,Ae=null),re){try{let{osc1:t,osc2:e,lfo:n}=re;t.stop(),e.stop(),n.stop()}catch{}re=null}}function fc(){let t=location.pathname||"";return/\/ofc-schedule\b/i.test(t)?!1:/\/(schedule|c-schedule)\b/i.test(t)}var mc=6e4,dn=null,fn=null,mn=null,De=null,ae=null;async function pc(){gi();try{let t=bi();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=980,i.frequency.value=1470,o.gain.value=.95,r.gain.value=.8,n.connect(o).connect(e),i.connect(r).connect(e);let s=t.createOscillator(),c=t.createGain();s.type="square",s.frequency.value=4,c.gain.value=320,s.connect(c),c.connect(n.frequency),c.connect(i.frequency);let d=t.currentTime;n.start(d),i.start(d),s.start(d),ae={osc1:n,osc2:i,lfo:s,master:e};let f=()=>{ae&&(hn(650),fn=l.setTimeout(f,900))};f(),dn=l.setTimeout(gi,mc),De=document.title;let g=!1,h=()=>{ae&&(document.title=g?De:"!!! OFC BOOKED \u2014 CONSULAR PAGE !!!",g=!g,mn=l.setTimeout(h,400))};h()}catch(t){console.error("Consular OFC alarm failed:",t)}}function gi(){if(dn&&(l.clear(dn),dn=null),fn&&(l.clear(fn),fn=null),mn&&(l.clear(mn),mn=null),De&&(document.title=De,De=null),ae){try{let{osc1:t,osc2:e,lfo:n}=ae;t.stop(),e.stop(),n.stop()}catch{}ae=null}}function xr(){if(fc()){try{let t="vsConsularOfcBeep";if(sessionStorage.getItem(t)==="1")return;sessionStorage.setItem(t,"1")}catch{}pc()}}function hc(){document.querySelector(p(a.recheck))?.remove();for(let t of document.querySelectorAll("button"))(t.textContent||"").trim()==="Recheck"&&t.remove()}async function wi(){l.alive&&hc()}async function xi(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await l.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let i=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(c=>c.innerText.trim()===i))continue;let r=document.createElement("li");r.className="usa-sidenav__item",r.dataset[$.mark]="";let s=document.createElement("a");s.href=n.link,s.className=u.sideLink,s.target="_self",s.textContent=n.text,r.appendChild(s),t.appendChild(r)}}function A(t,e,n){let i=document.createElement(t);return e&&(i.className=e),n?.appendChild(i),i}function gn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,r]=n;return`${r}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return null}function Si(t){let e=gn(t);if(!e)return String(t||"");let[n,i,o]=e.split("-").map(Number);if(!n||!i||!o)return e;try{return new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(new Date(n,i-1,o))}catch{return e}}function gc(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);if(n)return n[1].slice(0,5);let i=e.match(/^(\d{1,2}:\d{2})/);return i?i[1]:e}function vr(t){let e=document.querySelector(p(a.datesCont));if(e){let o=e.querySelector(p(a.datesPara)),r=e.querySelector("h2");if(r&&t&&(r.textContent=t),o)return{container:e,details:o}}let n=document.querySelector("#page_form");if(!n)return null;e?.remove();let i=yc(t||"");return n.appendChild(i.container),i}function Cr(t){if(t.response.HasError)return;let e=document.querySelector("#post_select"),n=e?.options[e.selectedIndex]?.text??"",i=(t.response.ScheduleDays||[]).map(f=>gn(f?.Date)).filter(Boolean).sort((f,g)=>f.localeCompare(g));document.querySelector(p(a.datesCont))?.remove();let o=vr(n);if(!o)return;let{details:r}=o;r.replaceChildren();let s=A("div",u.slotsSum,r);if(!i.length){s.textContent="No slots available";return}s.textContent=`${i.length} date${i.length===1?"":"s"} available`;let c={};for(let f of i){let g=f.slice(0,7);(c[g]||=[]).push(f)}for(let[f,g]of Object.entries(c)){let h=A("div",null,r),w=document.createElement("strong");w.textContent=f,h.append(w,`: ${g.map(v=>v.slice(8,10)).join(", ")}`)}let d=A("div",null,r);d.style.marginTop="0.5em";for(let f of i){let g=A("div",null,d);g.textContent=`\u2022 ${Si(f)} (${f})`}}function Tr(t,e,n){let i=document.querySelector("#post_select"),o=n||i?.options[i.selectedIndex]?.text||"",r=gn(e)||gn(t?.[0]?.Date)||"",s=(t||[]).filter(S=>S&&S.Time).map(S=>({time:gc(S.Time),avail:S.EntriesAvailable!=null&&Number.isFinite(Number(S.EntriesAvailable))?Number(S.EntriesAvailable):null,raw:S})).sort((S,B)=>String(S.time).localeCompare(String(B.time))),c=vr(o);if(!c)return;let{details:d}=c;d.replaceChildren();let f=A("div",u.slotsSum,d);if(!s.length){f.textContent=r?`No time slots on ${Si(r)}`:"No time slots available";return}let g=s.filter(S=>S.avail==null||S.avail>0),h=g.reduce((S,B)=>S+(B.avail||0),0),w=r?Si(r):"selected date";if(f.textContent=h>0?`${g.length} time slot${g.length===1?"":"s"} on ${w} \xB7 ${h} available`:`${s.length} time slot${s.length===1?"":"s"} on ${w}`,r){let S=A("div",null,d);S.style.margin="0.35em 0 0.6em",S.textContent=`Date: ${w} (${r})`}let v=A("table",u.slotsTbl,d);v.id=a.slotsTbl;let K=A("thead",null,v),M=A("tr",null,K);for(let S of["Time","Availability"]){let B=A("th",null,M);B.textContent=S}let z=A("tbody",null,v);for(let S of s){let B=A("tr",null,z);S.avail===0&&(B.style.opacity="0.55");let wt=A("td",null,B);wt.textContent=S.time;let Ms=A("td",null,B);Ms.textContent=S.avail==null?"\u2014":String(S.avail)}}function yc(t){let e=A("div","row");e.id=a.datesCont;let n=A("div","col-sm-12 atlas_section mt-3",e),i=A("div","col-sm-12 atlas_section_header_row",A("div","row",n));A("h2",null,i).textContent=t;let o=A("div",null,A("div","col-sm-12",A("div","row",n)));return o.id=a.datesPara,{container:e,details:o}}var _r=null;function bc(){let t=document.querySelector(p(a.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return l.setStyle(n,"display","flex"),l.setStyle(n,"alignItems","center"),l.setStyle(n,"justifyContent","flex-end"),l.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=a.ofcDate,t.dataset[$.mark]="",e.insertAdjacentElement("beforebegin",t),t}function wc(){if(!location.pathname.includes("/schedule"))return;let t=_r;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=bc();n&&(n.textContent=`OFC (Estimate): ${Ko(e.appointmentDateStr)}`)}function $r(t){chrome.runtime?.id&&(_r=t.data.data,l.waitFor("#submitbtn").then(e=>{e&&wc()}))}var yn=new Map,kr=45e3,bn=new Map,Mr=8e3,Ar=0;function wn(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function Sn(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function Sc(t,e){return`${t}:${e.slice(0,5).join(",")}`}function xc(t){let e=Date.now(),n=yn.get(t);if(n&&e-n<kr)return!1;yn.set(t,e);for(let[i,o]of yn)e-o>kr*4&&yn.delete(i);return!0}function vc(t){let e=Date.now(),n=bn.get(t);if(n&&e-n<Mr)return!1;bn.set(t,e);for(let[i,o]of bn)e-o>Mr*6&&bn.delete(i);return!0}async function Dr(){return await x("telegramViaServer")!==!1}async function Er(t,{kind:e="alert",dedupKey:n="",skipDedup:i=!1,notifyMuktesh:o=!0}={}){if(t&&await Dr())try{await fetch(qo,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:i,notify_muktesh:o}),signal:AbortSignal.timeout(2e4)})}catch{}}function Cc(t,{kind:e="screen",dedupKey:n="",waitMs:i=0,skipDedup:o=!1,notifyMuktesh:r=!0}={}){l.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:i,skipDedup:o,notifyMuktesh:r,captureScreenshot:!0})}async function Tc(t,e,n){let i=wn(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&r.push(`\u{1FAAA} <b>Visa:</b> ${n}`),r.push(`\u{1F550} <b>Checked:</b> ${o} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),r.push(`\u{1F4C6} <b>Dates (${i.length}):</b>`,"");for(let s of i.slice(0,30))r.push(`\u{1F7E2} <b>${Sn(s)}</b>`);return i.length>30&&r.push("",`\u2795 <i>+${i.length-30} more dates</i>`),r.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),r.join(`
`)}function _c(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",i=document.querySelector("#datepicker")?.value||"\u2014",r=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:i,time:r}}async function Ir(t,{postId:e,postName:n,hasError:i}={}){if(i||!t?.length)return;let o=wn(t);if(!o.length||!await x("telegramAlert"))return;let r=Sc(e||n||"unknown",o);if(!xc(r))return;let s=await G(),c=await Tc(n,t,s?.visa||"");await Er(c,{kind:"slots",dedupKey:r,notifyMuktesh:!0})}function $c(t,e,n){let i=wn(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`;if(i.length){let s=i.slice(0,5).map(c=>Sn(c)).join(", ");return`<b>DATES AVAILABLE</b>
\u{1F3DB}\uFE0F ${r}
\u{1F4C6} ${i.length} date(s)
${s}${i.length>5?"\u2026":""}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}return`<b>City changed \u2014 no dates</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}function kc(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=e?Sn(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${i}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function Mc(t,e,n){let i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?Sn(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u23F0 ${n} slot(s)
\u{1F550} ${i} IST
\u{1F4F2} Visa Slot 6`}async function le(t,{kind:e="screen",dedupKey:n,waitMs:i=0,skipDedup:o=!1}={}){if(await x("telegramScreenshots")===!1||!await Dr())return;let r=n||`${e}:${String(t).slice(0,80)}`;!o&&!vc(r)||Cc(t,{kind:e,dedupKey:r,waitMs:i,skipDedup:o,notifyMuktesh:!0})}async function Lr(t,{postId:e,postName:n,hasError:i}={}){let o=$c(n,t,i),r=wn(t),s=r.length?"dates":"city";await le(o,{kind:s,dedupKey:`${s}:${e||n}:${r.length}:${i?1:0}`,waitMs:r.length?1400:900})}async function Pr(t,e){await le(kc(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function qr(t,e,n){await le(Mc(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function Rr(){let t=Date.now();if(t-Ar<8e3)return;Ar=t;let e=await G(),{city:n,date:i,time:o}=_c(),r=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),s=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${i}`,`\u23F0 <b>Time:</b> ${o}`];e?.email&&s.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&s.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),s.push(`\u{1F550} <b>When:</b> ${r} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let c=s.join(`
`);await Er(c,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await le(c,{kind:"submit",skipDedup:!0,waitMs:200})}var vn=25;function Cn(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Ti(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let i=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,i),n-1)}function Or(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function Nr(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function $i(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function vi(t){if(t)try{t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}}function xn(t){if(t)try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}}function _i(t){if(!t||t.disabled)return!1;try{if(t.tagName==="SELECT")return!t.value||t.value==="0"?!1:(vi(t),t.value&&t.value!=="0"?!0:(xn(t),!!(t.value&&t.value!=="0")));if(t.type==="radio"||t.type==="checkbox"){if(t.name)for(let i of document.getElementsByName(t.name))i!==t&&(i.checked=!1);if(t.checked=!0,vi(t),t.checked)return!0;let e=t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,n=t.closest("tr");for(let i of[e,t.closest("label"),t,n].filter(Boolean))xn(i);return t.checked=!0,vi(t),t.checked===!0}xn(t)}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function Wr(){let t=new Set,e=[],n=i=>{if(!i||t.has(i)||$i(i)||i.disabled)return;let o=i.closest("tr");o&&Nr(o)||(t.add(i),e.push(i))};for(let i of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let o of document.querySelectorAll(`${i}:not([disabled])`))n(o);return e}function Ac(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!Or(n)||Nr(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function Dc(t,e){for(let n of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(n.tagName!=="SELECT"||n.disabled||$i(n))continue;let i=[...n.options].filter(s=>!s.disabled&&s.value&&s.value!=="0"&&Or({textContent:s.textContent}));if(!i.length)continue;let o=null,r=Cn(e);if(r&&r!=="00:00"&&(o=i.find(s=>(s.textContent||"").includes(r))||null,!o)){let s=r.match(/(\d{1,2}:\d{2})/);s&&(o=i.find(c=>(c.textContent||"").includes(s[1]))||null)}if(!o){let s=Ti(i.length,t);o=i[s]}if(o&&(n.value=o.value,_i(n)))return!0}return!1}function Ec(t,e){if(Dc(t,e))return!0;let n=Wr();if(n.length){let o=null,r=Cn(e);if(r&&r!=="00:00"&&(o=n.find(s=>{let c=(s.closest("tr")?.textContent||s.textContent||"").replace(/\s+/g," ");return c.includes(r)||c.includes(r.slice(0,5))})||null),!o){let s=Ti(n.length,t);o=n[s]}if(o&&_i(o))return!0}let i=Ac();if(i.length){let o=null,r=Cn(e);if(r&&r!=="00:00"&&(o=i.find(d=>(d.textContent||"").includes(r))||null),!o){let d=Ti(i.length,t);o=i[d]}if(!o)return!1;let s=o.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(s&&_i(s))return!0;let c=o.querySelector("label");if(c)return xn(c),!!o.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function X(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!$i(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function Ic({slotIndex:t=0,maxMs:e=12e3,pollMs:n=vn,time:i,onTick:o}={}){let r=Date.now()+e,s=Math.max(10,n||25);return new Promise(c=>{let d=()=>{if(!l.alive)return c(!1);if(o?.(),Ec(t,i)||X())return c(!0);if(Date.now()>=r)return c(!1);l.setTimeout(d,s)};d()})}function Ie({time:t,date:e,slotIndex:n,pollMs:i,maxMs:o}){let r=n??0,s=o||15e3,c=i||vn;return l.send({action:"forcePickTimeSlot",slotIndex:r,maxMs:s,pollMs:c}),l.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:r,pollMs:c,domWaitMs:0,maxMs:s}),Ic({slotIndex:r,maxMs:s,pollMs:c,time:t||"00:00"})}var Ci=!1;function Hr({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(Ci)return;Ci=!0;let i=!1,o=async()=>{if(!(!l.alive||i)){if(X()){n?.();return}try{if(t&&!await t())return}catch{return}Wr().length&&(i=!0,await Ie({slotIndex:e,time:"00:00",maxMs:800,pollMs:vn}),i=!1,X()&&n?.())}};l.setInterval(o,vn);let r=document.querySelector("#page_form")||document.body,s=new MutationObserver(()=>o());s.observe(r,{childList:!0,subtree:!0}),l.disposable(()=>{s.disconnect(),Ci=!1})}function Br(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let i=Cn(n?.Time);if(!i)continue;let o=i.match(/(\d{1,2}):(\d{2})/);if(!o)continue;let[,r,s]=o;if(e.includes(`${r}:${s}`)||e.includes(`${parseInt(r,10)}:${s}`))return!0}return!1}var Tn="submitErrors",Fr=50,Lc=45e3,Kr=0,ki=new Set,Le=null,Gr=null;function zr(t){Gr=typeof t=="function"?t:null}function Pc(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",i=document.querySelector("#datepicker")?.value||"";return{city:e,date:i,url:location.href}}function Pe(){Kr=Date.now()+Lc,ki.clear(),Hc()}function _n(){return Date.now()<Kr}function qc(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function Rc(t){let e=await C({[Tn]:[]}),n=Array.isArray(e[Tn])?e[Tn]:[];n.push(t),n.length>Fr&&n.splice(0,n.length-Fr),await T({[Tn]:n})}function Ur(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function Oc(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${Ur(t.source)}`,`\u{1F4AC} <b>Message:</b> ${Ur(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let i=n.join(`
`);await le(i,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function qe(t,e,n={}){let i=String(e||"").trim();if(!i||!_n()&&!n.force)return;let o=qc(t,i);if(ki.has(o))return;ki.add(o);let r=Pc(),s=await G(),c={at:Date.now(),source:String(t||"unknown"),message:i.slice(0,2e3),city:n.city||r.city,date:n.date||r.date,url:n.url||r.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:s?.email||""};await Rc(c);try{await Oc(c)}catch{}try{Gr?.(c)}catch{}}function Nc(t){if(!_n())return;let e=t?.status,n=t?.retryAfter,i=t?.cgiBlock,o=`Request failed (HTTP ${e||"?"})`;n!=null&&(o+=` \u2014 retry after ${n}s`),i&&(o+=" \u2014 CGI access limitation"),qe("ajax_error",o,{status:e})}function jr(t){if(!_n()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){Nc({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",o=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";qe("ajax_response",o,{route:t.tail||""})}var Wc=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function Hc(){Le&&l.clear(Le);let t=()=>{if(!l.alive||!_n()){Le=null;return}for(let e of Wc)for(let n of document.querySelectorAll(e)){let i=(n.textContent||"").replace(/\s+/g," ").trim();!i||i.length<4||qe("page_validation",i)}Le=l.setTimeout(t,600)};Le=l.setTimeout(t,500)}var Re=0,Yr="",Vr=0;async function Bc(){let[t,e]=await Promise.all([G(),C(["cgiIdToken"])]),n=ne(e.cgiIdToken);return{profile:t,token:n}}async function Xr(t){if(!F()||!await x("serverSync"))return null;let{profile:e,token:n}=await Bc();if(!e?.id&&!e?.email)return null;try{let i={...t,profile:e};n&&(i.token=n);let o=await fetch(Ro,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}).then(r=>r.json());return o&&o.success?o:null}catch{return null}}async function Qr({postId:t,postName:e,dayCount:n}={}){let i=String(t||"").trim(),o=Number(n)||0;if(!i||o<1)return null;let r=`${i}:${o}`,s=Date.now();if(r===Yr&&s-Vr<1500)return null;Yr=r,Vr=s;let c=await Xr({action:"alert",city:{id:i,name:String(e||i).trim()},dayCount:o});return c?.alertId&&(Re=Math.max(Re,Number(c.alertId)||0)),c}async function Jr({preferredCities:t=[],citiesEnabled:e=!1,currentCityId:n=""}={}){if(!e||!t?.length)return null;let o=(await Xr({action:"poll",preferredCities:t,citiesEnabled:!0,currentCityId:String(n||""),lastAlertId:Re}))?.forceCity;return!o?.id||!o?.alertId?null:o}function $n(t){let e=Number(t)||0;e>Re&&(Re=e)}var Fc=["cities","from","to","submitEnabled","citiesEnabled","enabled","slotWindows","termsAgreed","termsPassed","termsAgreedAt"];function Zr(t){if(!t||typeof t!="object")return{};let e={};for(let n of Fc)n in t&&(e[n]=t[n]);return typeof e.submitEnabled!="boolean"&&typeof e.enabled=="boolean"&&(e.submitEnabled=e.enabled),delete e.enabled,e}function ta(t,e){if(!e||typeof e!="object")return t||null;let n=t&&typeof t=="object"?{...t}:{},i=Number(n.serverUpdatedAt)||0,o=Number(e.updatedAt)||0;if(o&&i&&o<i)return n;let r=Zr(e),s={...n,...r};return typeof r.submitEnabled=="boolean"&&(s.enabled=r.submitEnabled),e.updatedAt&&(s.serverUpdatedAt=e.updatedAt),s}async function ea(){let[t,e]=await Promise.all([G(),C(["cgiIdToken"])]),n=ne(e.cgiIdToken);return{profile:t,token:n}}async function na(t){if(!F()||!await x("serverSync"))return!1;let e=Zr(t);if(!Object.keys(e).length)return!1;let{profile:n,token:i}=await ea();if(!n?.id&&!n?.email)return!1;try{let o={profile:n,prefs:e};i&&(o.token=i);let r=await fetch(en,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(s=>s.json());return!!(r&&r.success)}catch{return!1}}async function ia(){if(!F()||!await x("serverSync"))return null;let{profile:t,token:e}=await ea();if(!t?.id&&!t?.email)return null;try{let n=new URLSearchParams;t.id&&n.set("applicant_id",String(t.id)),t.email&&n.set("email",String(t.email));let i=await fetch(`${en}?${n.toString()}`,{method:"GET",headers:{Accept:"application/json"}}).then(r=>r.json());if(i?.prefs)return i.prefs;let o={profile:t};return e&&(o.token=e),i=await fetch(en,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(r=>r.json()),i?.prefs||null}catch{return null}}var qt="aiSubmitByAccount",me=8e3;var Y=25;var Pn=0,We=1e4,Sa=1e3;function pe(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}function Hi(){return b.cityRotateMinGapMs}function Uc(){return b.cityRotateMaxGapMs}function He(){return b.cityHoldMaxMs}function Ct(){return b.cityLoadingMaxMs}function Kt(){return b.cityCalendarNoDatesMs}var oa=5e3,Di=2e4,Kc=15e3;function mt(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function Bi(){return/\/ofc-schedule\b/i.test(location.pathname)}function _(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var Gc=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function Mn(t,e){let n=Gc[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(o=>{let r=e===o?" selected":"";return`<option value="${o.replace(/"/g,"&quot;")}"${r}>${o}</option>`}).join("")}function ue(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function Xt(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function zc(t,e,n){return`${t}-${String(e+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`}function jc(t){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(t))return null;let[e,n,i]=t.split("-").map(Number),o=new Date(e,n-1,i);return o.getFullYear()!==e||o.getMonth()!==n-1||o.getDate()!==i?null:o}function Fi(){for(let t of["from","to"]){let e=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo)),n=document.querySelector(p(t==="from"?a.aiFromBtn:a.aiToBtn));if(!n)continue;let i=e?.value||"";n.textContent=i?Xt(i):"Select date"}}function Mi(t,e){let n=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo));if(n&&(n.value=e||""),t==="from"){let i=document.querySelector(p(a.aiTo));i&&e&&i.value&&i.value<e&&(i.value="")}Fi()}var J={y:0,m0:0,which:"from"};function Rt(){document.querySelector(p(a.aiCal))?.classList.add(u.hidden)}function Ui(t){let e=t.target;return e?e.nodeType===3?e.parentElement:e:null}function Ei(){let t=document.querySelector(p(a.aiCal));if(!t)return;let{y:e,m0:n,which:i}=J,o=document.querySelector(p(i==="from"?a.aiFrom:a.aiTo))?.value||"",r=ue(),s=i==="to"&&document.querySelector(p(a.aiFrom))?.value||ue(),c=new Date(e,n,1).toLocaleDateString("en-IN",{month:"long",year:"numeric"}),d=new Date(e,n,1).getDay(),f=new Date(e,n+1,0).getDate(),g=new Date(e,n,0).getDate(),h="";for(let w of["S","M","T","W","T","F","S"])h+=`<div class="${u.aiHint}">${w}</div>`;for(let w=0;w<42;w++){let v,K=e,M=n,z=!1;w<d?(v=g-d+w+1,M=n-1,M<0&&(M=11,K=e-1),z=!0):w>=d+f?(v=w-d-f+1,M=n+1,M>11&&(M=0,K=e+1),z=!0):v=w-d+1;let S=zc(K,M,v),B=S<s,wt=[u.aiCalDay,z?u.aiCalMuted:"",B?u.aiCalMuted:"",S===r?u.aiCalToday:"",S===o?u.aiCalOn:""].filter(Boolean).join(" ");h+=`<button type="button" class="${wt}" data-iso="${S}" ${B?'disabled aria-disabled="true"':""}>${v}</button>`}t.innerHTML=`
    <div class="${u.aiCalHead}">
      <button type="button" data-cal="prev" aria-label="Previous month">\u2039</button>
      <div class="${u.aiHead}">${c}</div>
      <button type="button" data-cal="next" aria-label="Next month">\u203A</button>
    </div>
    <div class="${u.aiCalGrid}">${h}</div>
    <div class="${u.aiRow}">
      <button type="button" data-cal="clear">Clear</button>
      <button type="button" data-cal="today">Today</button>
    </div>
  `}function Yc(t){let e=document.querySelector(p(a.aiCal)),i=Ui(t)?.closest?.("button");if(!e||!i||!e.contains(i))return;t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation();let o=i.getAttribute("data-cal"),r=J.which,s=r==="to"&&document.querySelector(p(a.aiFrom))?.value||ue();if(o==="prev"){J.m0-=1,J.m0<0&&(J.m0=11,J.y-=1),Ei();return}if(o==="next"){J.m0+=1,J.m0>11&&(J.m0=0,J.y+=1),Ei();return}if(o==="clear"){Mi(r,""),Rt();return}if(o==="today"){let d=ue();d>=s&&(Mi(r,d),Rt(),wa());return}if(i.disabled||i.getAttribute("aria-disabled")==="true")return;let c=i.getAttribute("data-iso");!c||c<s||(Mi(r,c),Rt(),wa())}function ra(t){let e=document.querySelector(p(a.aiCal));if(!e||!t)return;let n=t.getBoundingClientRect(),i=Math.min(340,window.innerWidth-16),o=e.offsetHeight||360,r=Math.max(8,Math.min(n.left,window.innerWidth-i-8)),s=n.bottom+6;s+o>window.innerHeight-8&&n.top-6-o>=8?s=n.top-6-o:s=Math.max(8,Math.min(s,window.innerHeight-o-8)),e.style.position="fixed",e.style.top=`${Math.round(s)}px`,e.style.left=`${Math.round(r)}px`,e.style.width=`${i}px`,e.style.right="auto",e.style.bottom="auto"}function aa(t,e){let n=document.querySelector(p(a.aiCal));n||(n=document.createElement("div"),n.id=a.aiCal,n.className=`${u.aiCal} ${u.hidden}`,n.dataset[$.mark]="",document.body.appendChild(n),l.on(n,"pointerdown",Yc,{capture:!0}),l.on(n,"click",r=>{n.contains(Ui(r))&&(r.preventDefault(),r.stopPropagation())},{capture:!0}));let i=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo))?.value,o=jc(i)||new Date;J={y:o.getFullYear(),m0:o.getMonth(),which:t},Ei(),n.classList.remove(u.hidden),ra(e),requestAnimationFrame(()=>ra(e))}function Nt(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function Ot(t){return!!(t&&t.citiesEnabled)}async function q(){let t=await G();return t?.id?String(t.id):null}async function R(t){return t&&((await C(qt))[qt]||{})[t]||null}async function Ki(t,e){if(!t)return;let i=(await C(qt))[qt]||{};e==null?delete i[t]:i[t]=e,await T({[qt]:i})}var O=!1;function Ue(){return O}function fe(){O=!0,Qt(),Ne()}function pt(){O=!1,I=!1,Qt()}async function En(t){xa(),fe();let e=await R(t);if(!e){nt();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await Ki(t,e),nt()}var tt=!1,Gt=null,Pt=null,sa=2e4,In=new Set,Ii="",Li="";function xa(){tt=!1,Gt&&(l.clear(Gt),Gt=null),Pt&&(l.clear(Pt),Pt=null)}function Gi(){In.clear(),Ii=""}function Vc(t){let e=String(t||"").slice(0,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(e))return;let n=String(document.querySelector("#post_select")?.value||"");n!==Ii&&(In.clear(),Ii=n),In.add(e)}function qn(t){let e=String(t||"").slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(e)&&(Li=e)}function Xc(){let t=document.querySelector("#datepicker"),e=String(t?.value||"").trim();if(!e)return Li||"";if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,r]=n;return`${r}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return Li||""}async function ca(){if(O||_()||!mt())return!1;let t=await it();if(!t)return!1;let e=document.querySelector("#post_select"),n=e?String(e.value):"";if(!n)return!1;let i=Xc();i&&Vc(i);let r=(await St()).find(h=>String(h.ID)===n),c=Rn(r?.Days||[],t.from,t.to).filter(h=>!In.has(String(h.Date).slice(0,10)));if(!c.length)return!1;let d=pe(c.length),f=c[d];if(!f?.Date)return!1;let g=String(f.Date).slice(0,10);return qn(g),lt(),pt(),y(`Submit failed \u2014 trying next date #${d+1} (${g}) (${c.length} left in range)\u2026`),k(`Submit failed \u2014 next date ${g} (${c.length} left)\u2026`),l.send({action:"selectFirstDate",date:g,maxMs:me,pollMs:Y}),!0}async function Ke(t){if(_()||la()){t?await En(t):fe(),y("Booking confirmed \u2014 Tik Tik stopped.");return}tt=!0,lt(),Pe(),y("Submit clicked \u2014 waiting for confirmation (Auto Submit + City Change stay ON)\u2026"),Pt&&l.clear(Pt);let e=Date.now(),n=async()=>{if(Pt=null,!(!tt||!l.alive)){if(la()||_()){let i=t||await q();i?await En(i):fe(),y("Booking confirmed \u2014 Tik Tik stopped.");return}if(Date.now()-e>=sa){await Be("no confirmation yet \u2014 resuming city checks");return}Pt=l.setTimeout(n,400)}};Pt=l.setTimeout(n,400),Gt&&l.clear(Gt),Gt=l.setTimeout(()=>{Gt=null,tt&&Be("submit wait timed out \u2014 resuming city checks")},sa)}function la(){if(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))return!0;let t=(document.body?.innerText||"").slice(0,2500);return/appointment\s+confirmation|successfully\s+scheduled|your\s+appointment\s+has\s+been/i.test(t)}async function Be(t=""){if(!tt&&!L&&!I){if(await ca())return;ct();return}xa(),I=!1,Qt(),O&&pt();let e=t?`Submit failed (${t})`:"Submit failed";if(await ca()){y(`${e} \u2014 staying on city; trying another date\u2026`);return}if(Gi(),ct(),y(`${e} \u2014 no other dates in range; hopping cities\u2026`),P)Z(Date.now()),D();else{let i=await q();if(i){let o=await R(i);Ot(o)&&await Wn()}}}function Ge(){return tt}function ze(t,e,n){let i=String(t||"").slice(0,10);return!(!i||i.length<10||e&&i<e||n&&i>n)}async function it(){if(O||_()||!mt())return null;let t=await q();if(!t)return null;let e=await R(t);return!Nt(e)||!e.from||!e.to?null:{...e,accountId:t}}async function he(){if(O||_()||!mt())return null;let t=await q();if(!t)return null;let e=await R(t);return!Ot(e)||!e.cities?.length?null:(La(e),{...e,accountId:t})}function Rn(t,e,n){let i=new Date;return i.setHours(0,0,0,0),(t||[]).map(o=>{if(!o)return null;let r=o.Date!=null?o.Date:o.date,s=Qc(r);return s?{...o,Date:s}:null}).filter(Boolean).filter(o=>ze(o.Date,e,n)).filter(o=>{let[r,s,c]=o.Date.slice(0,10).split("-").map(Number);return new Date(r,s-1,c)>=i}).sort((o,r)=>String(o.Date).localeCompare(String(r.Date)))}function Qc(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,r,s]=n;return`${s}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime()))return`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}-${String(o.getDate()).padStart(2,"0")}`}return null}var I=!1,Tt=null,_t=null,at=!1,$t=0,P=!1,j=0,Mt=0,Oe=0,Yt=0,ge=!1,dt=null,vt=0,L=!1,U=0,de=null,zt=null,kt=0,ua=!1,da="",fa=!1,Pi=0;function Jc(t){return(t||[]).map(e=>e.id).join("")}function va(){let t=document.querySelector(p(a.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function ma(t){let e=document.querySelector(p(a.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function Qt(){Tt&&(l.clear(Tt),Tt=null),I=!1}function Wt(){de&&(l.clear(de),de=null)}function Ca(){Wt(),U||(U=Date.now());let t=Math.max(500,He()-(Date.now()-U));de=l.setTimeout(()=>{de=null,!(!L||!P||!l.alive)&&(L=!1,U=0,Z(Date.now()),y(`City Change \u2014 booking hold timed out (${He()/1e3}s); next city in 13\u201318s\u2026`),D())},t)}function Zc(){zt&&(l.clear(zt),zt=null)}function On(t=Date.now()){let e=!1;if(at&&$t&&t-$t>=Kc&&(at=!1,$t=0,e=!0),L&&(U||(U=t),t-U>=He()?(Wt(),L=!1,U=0,e=!0):de||Ca()),ge){vt||(vt=t);let i=qi()?Ct():Kt();if(t-vt>=i)et(),e=!0;else if(!dt){let o=Math.max(500,i-(t-vt));dt=l.setTimeout(()=>{if(dt=null,!P||L)return;let r=qi(),s=r?Ct():Kt();if(Date.now()-(vt||0)<s){On();return}et(),Z(Date.now()),y(r?`City Change \u2014 still Loading after ${Ct()/1e3}s; changing city\u2026`:`City Change \u2014 calendar up but no dates after ${Kt()/1e3}s; changing city\u2026`),D()},o)}}return I&&!Tt&&(I=!1,e=!0),e}function Ta(){if(zt||!P)return;let t=()=>{if(zt=null,!P||!l.alive||O)return;let e=Date.now(),n=On(e),i=!!ie(new Date(e)),o=!!_t,r=!i&&o||ge||L||I||tt,s=!r&&kt>0&&e-kt>=Di;if(n||s||!o&&!at&&!r)s?(at=!1,$t=0,et(),!L&&!tt&&(Wt(),U=0),I&&!Tt&&(I=!1),j=e,y(i?"City Change \u2014 unstuck; hopping now\u2026":`City Change \u2014 unstuck; waiting for IST window ${ut()}\u2026`)):n?(!L&&!tt&&(j=e),y(i?"City Change \u2014 lock cleared; hopping now\u2026":`City Change \u2014 lock cleared; next IST window ${ut()}\u2026`)):y("City Change \u2014 timer lost; restarting\u2026"),kt=e,D();else if(!i&&o){let d=_e(new Date(e));y(`City Change \u2014 waiting for slot window (IST ${ut()}, next in ${mi(d)})`)}P&&(zt=l.setTimeout(t,oa))};zt=l.setTimeout(t,oa)}function Ne(){Vi(),Zc(),ll(),Wt(),at=!1,$t=0,P=!1,L=!1,U=0,j=0,Mt=0,kt=0,et()}function et(){ge=!1,vt=0,dt&&(l.clear(dt),dt=null)}function zi(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let i=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(i))continue;let o=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let r of o)if(r&&/\bLoading\.{0,3}\b/i.test((r.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let o=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(o))continue;let r=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(r))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function qi(){return zi()}function _a(){ge=!0,vt=Date.now(),dt&&l.clear(dt),dt=l.setTimeout(()=>{dt=null,!(!P||L)&&(et(),Z(Date.now()),y(`City Change \u2014 still Loading after ${Ct()/1e3}s; changing city\u2026`),D())},Ct())}function ji(t){let e=Math.max(0,Number(t)||0)*1e3;Yt=Math.max(Yt,Date.now()+e),j=Math.max(j,Yt),et(),D()}function $a(){et()}function lt(){O||(L=!0,U||(U=Date.now()),Vi(),et(),Ca(),kt=Date.now(),P&&D(),y("City Change \u2014 paused (Auto Submit booking)\u2026"))}function ct(){if(tt){y("Submit pending \u2014 staying on this city (ignoring date reload hop)\u2026");return}L&&(Wt(),L=!1,U=0,!(!P||O)&&(Z(Date.now()),y("City Change \u2014 resuming; next city in 13\u201318s\u2026"),D()))}async function Nn(){let t=await it();if(!t)return;let e=Date.now();if(e-Pi<6e4)return;Pi=e;let i=document.querySelector("#post_select")?.value;if(!i){y("Auto Submit ON \u2014 pick a city first.");return}let r=(await St()).find(c=>String(c.ID)===String(i)),s=r?.Days;if(Array.isArray(s)&&s.length){let c=Rn(s,t.from,t.to);if(c.length){lt();let d=pe(c.length),f=c[d].Date;y(`Auto Submit: picking date #${d+1} (${f.slice(0,10)})\u2026`),qn(f),l.send({action:"selectFirstDate",date:f,maxMs:me,pollMs:Y});return}y(`Auto Submit ON \u2014 no dates in your range on ${r.Name||"this city"} yet.`);return}y("Auto Submit ON \u2014 loading slots for current city\u2026"),l.send({action:"selectPost",postId:String(i)})}function Yi(){Pi=0}function Vi(){_t&&(l.clear(_t),_t=null)}function tl(t,e){return t+Math.random()*(e-t)}function el(){return tl(Hi(),Uc())}function Z(t=Date.now()){j=t+el()}function nl(t=Date.now()){let e=_e(new Date(t));if(e>0)return e;if(Yt>t)return Yt-t;if(Mt){let n=Mt+Hi()-t;if(n>0)return n}return j>t?j-t:0}function D(){if(!P)return;if(Vi(),L||ge){_t=l.setTimeout(()=>{Ai()},500);return}let t=Date.now(),e=_e(new Date(t));if(e>0){j>t&&(j=t),e>=Di&&(kt=t),_t=l.setTimeout(()=>{Ai()},e);return}let n=0;Yt>t&&(n=Math.max(n,Yt-t)),Mt&&(n=Math.max(n,Mt+Hi()-t)),j>t&&(n=Math.max(n,j-t)),n=Math.max(0,n),n>=Di&&(kt=Date.now()),_t=l.setTimeout(()=>{Ai()},n)}function il(t,e){if(!t.length)return null;if(t.length===1)return Oe=0,t[0];let n=t.findIndex(o=>String(o.id)===String(e));n<0&&(n=Math.max(0,Math.min(Oe,t.length-1)));let i=(n+1)%t.length;return Oe=i,t[i]}function Xi(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function Vt(){let t=document.querySelector(p(a.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function je(){return{from:document.querySelector(p(a.aiFrom))?.value||null,to:document.querySelector(p(a.aiTo))?.value||null}}function Fe(t=[],{force:e=!1}={}){let n=document.querySelector(p(a.aiCities));if(!n)return;let i=Xi(),o=Jc(i),r=document.querySelector(p(a.aiPanel)),s=r&&!r.classList.contains(u.hidden),c=va();if(!e&&o===da&&n.querySelector('input[type="checkbox"]'))return;da=o;let d=new Set(s&&c.length&&!e&&!t.length?c:(t.length?t:c).map(String));if(n.replaceChildren(),!i.length){n.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let f of i){let g=document.createElement("label"),h=document.createElement("input");h.type="checkbox",h.value=f.id,h.dataset.name=f.name,h.checked=d.has(f.id),g.append(h,document.createTextNode(f.name)),n.appendChild(g)}}function ol(t){let e=t?.cities||[];return e.length?e.map(n=>n.name||n.id).join(", "):"\u2014"}async function At(t,e={}){let n=await R(t)||{},{from:i,to:o}=je(),r=Vt(),s={...n,from:i||n.from||null,to:o||n.to||null,cities:r.length?r:n.cities||[],loginId:document.querySelector(p(a.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(p(a.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(c=>{let d=[a.aiQ1,a.aiQ2,a.aiQ3][c],f=[a.aiA1,a.aiA2,a.aiA3][c];return{q:document.querySelector(p(d))?.value?.trim()||n.security?.[c]?.q||"",a:document.querySelector(p(f))?.value?.trim()||n.security?.[c]?.a||"",set:c+1}}),...e};return typeof s.submitEnabled=="boolean"&&(s.enabled=s.submitEnabled),s.serverUpdatedAt=Date.now(),await Ki(t,s),rl(s),s}var kn=null,Ri=null;function rl(t){kn&&l.clear(kn),kn=l.setTimeout(()=>{kn=null,na(t).catch(()=>{})},400)}async function ka(t){if(!t||Ri===t)return null;let e=await ia();if(Ri=t,!e)return null;let n=await R(t)||{},i=ta(n,e);return i?(i.loginId=n.loginId||i.loginId||"",i.loginPass=n.loginPass||"",i.security=n.security||i.security||[],typeof i.submitEnabled=="boolean"&&(i.enabled=i.submitEnabled),await Ki(t,i),i):null}async function al(t,e){if(tt||!ie()||L||I)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let i=String(t);return String(n.value)===i?!1:(_a(),y(`Switching city \u2192 ${e||t}\u2026`),Gi(),l.send({action:"selectPost",postId:i}),!0)}async function sl(t,e,{alertId:n,dayCount:i}={}){if(O||_()||!mt()||tt)return!1;let o=document.querySelector("#post_select");if(!o||!t)return!1;let r=String(t),s=e||r;return String(o.value)===r?(y(`City alert \u2014 already on ${s}`+(i?` (${i} dates reported)`:"")),!0):(Wt(),et(),L=!1,U=0,I=!1,Qt(),at=!1,$t=0,j=Date.now(),Mt=0,_a(),Mt=Date.now(),Gi(),y(`City alert \u2014 switching now \u2192 ${s}`+(i?` (${i} dates)`:"")+(n?` [#${n}]`:"")),l.send({action:"selectPost",postId:r}),P&&D(),!0)}var jt=null,An=!1,pa="",ha=0,cl=150;function ll(){jt&&(l.clear(jt),jt=null),An=!1}async function ul(){if(!(An||!P||O)){An=!0;try{let t=await he();if(!t?.cities?.length)return;let e=document.querySelector("#post_select"),n=await Jr({preferredCities:t.cities,citiesEnabled:!0,currentCityId:e?String(e.value):""});if(!n?.alertId)return;if(n.alreadyThere){$n(n.alertId),y(`City alert \u2014 already on ${n.name||n.id}`+(n.dayCount?` (${n.dayCount} dates)`:""));return}let i=`${n.id}:${n.alertId}`,o=Date.now();if(i===pa&&o-ha<6e3){$n(n.alertId);return}await sl(n.id,n.name,{alertId:n.alertId,dayCount:n.dayCount})&&(pa=i,ha=o,$n(n.alertId))}catch{}finally{An=!1}}}function Ma(){if(jt||!P)return;let t=()=>{jt=null,!(!P||O||!l.alive)&&ul().finally(()=>{P&&!O&&l.alive&&(jt=l.setTimeout(t,cl))})};jt=l.setTimeout(t,50)}function Qi(){ua||!document.querySelector("#post_select")||(ua=!0)}async function Ai(){if(!(at||!P)){at=!0,$t=Date.now(),kt=Date.now(),_t=null;try{if(O||_()||!l.alive){Ne();return}if(On()){j=Date.now(),y(ie()?"City Change \u2014 auto-unstuck; hopping now\u2026":`City Change \u2014 auto-unstuck; waiting IST ${ut()}\u2026`),D();return}if(L||I){let h=U?Date.now()-U:0;if(L&&h>=He()){Wt(),L=!1,U=0,Z(Date.now()),y("City Change \u2014 hold expired; next city in 13\u201318s\u2026"),D();return}let w=Math.max(0,He()-h);y(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(w/1e3)}s`),D();return}let t=Date.now(),e=ie(new Date(t)),n=_e(new Date(t));if(!e){y(`City Change \u2014 waiting for slot window (IST ${ut()}, next in ${mi(n)})`),D();return}if(ge){let h=vt?t-vt:0;if(qi()){if(h>=Ct()){et(),Z(Date.now()),y(`City Change \u2014 still Loading after ${Ct()/1e3}s; changing city\u2026`),D();return}let v=Math.max(0,Math.ceil((Ct()-h)/1e3));y(`City Change \u2014 Date Loading\u2026 stay (${v}s then hop if still Loading)`),D();return}if(h>=Kt()){et(),Z(Date.now()),y(`City Change \u2014 calendar up but no dates after ${Kt()/1e3}s; changing city\u2026`),D();return}let w=Math.max(0,Math.ceil((Kt()-h)/1e3));y(`City Change \u2014 waiting calendar dates\u2026 (${w}s then hop)`),D();return}let i=nl(t);if(i>0){let h=Math.ceil(i/1e3);y(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,h)}s`),D();return}let o=await he();if(!o?.cities?.length){Ne();return}let r=new Set(Xi().map(h=>h.id)),s=o.cities.filter(h=>r.has(String(h.id)));if(!s.length){y("Preferred cities not found in the dropdown \u2014 pick cities again."),Ne();return}let c=document.querySelector("#post_select"),d=c?String(c.value):"",f=il(s,d);if(!f){Z(t),D();return}if(await al(f.id,f.name)){Mt=Date.now(),Z(Mt);let h=s.map(v=>v.name||v.id).join(" \u2192 "),w=`${Oe+1}/${s.length}`;y(`City Change \u2014 ${w} ${f.name||f.id} (path: ${h}); Loading up to ${Ct()/1e3}s, no-dates hop ${Kt()/1e3}s`)}else Z(t);D()}finally{at=!1,$t=0}}}async function Wn(){if(O||_()||!mt())return;let t=await he();if(!t?.cities?.length)return;let e=new Set(Xi().map(s=>s.id)),n=t.cities.filter(s=>e.has(String(s.id)));if(!n.length){y("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}Wt(),et(),L=!1,U=0,I=!1,at=!1,$t=0,P=!0,kt=Date.now(),j=Date.now();let i=document.querySelector("#post_select"),o=i?String(i.value):"",r=n.findIndex(s=>String(s.id)===o);Oe=r>=0?r:0,y(`City Change ON \u2014 IST ${ut()}; hop 13\u201318s; slot alerts force-switch preferred cities`),Ta(),Ma(),D()}async function Aa(){if(O||_()||!Bi()||!l.alive||!(await he())?.cities?.length||!document.querySelector("#post_select"))return;if(!P){await Wn();return}let e=On();Ta(),Ma(),(e||!_t&&!at)&&(e&&(Z(Date.now()),y("City Change \u2014 auto-unstuck; next city in 13\u201318s\u2026")),D())}function Ji(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function Dn(){let t=Ji();return!!(t&&!t.disabled)}function dl(t){if(!t||t.disabled)return!1;try{let e=t.form||t.closest?.("form");if(e&&typeof e.requestSubmit=="function")return e.requestSubmit(t),!0}catch{}try{return t.click(),!0}catch{}try{return t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click(),!0}catch{}return!1}function Zi(){let t=Ji();if(!t||t.disabled)return!1;let e=dl(t);return l.send({action:"forceClickSubmit",prefix:m,pollMs:Y,maxMs:Math.min(1500,We)}),e}function fl(){return X()?Dn():!1}function to(t){let e=Date.now()+Math.max(0,Number(t)||0);return X()&&Dn()?Promise.resolve(!0):new Promise(n=>{let i=!1,o=null,r=null,s=d=>{if(!i){i=!0;try{r?.disconnect()}catch{}o&&l.clear(o),n(!!d)}},c=()=>{if(!l.alive||Ue()||_())return s(!1);if(X()&&Dn())return s(!0);if(Date.now()>=e)return s(X()&&Dn())};try{r=new MutationObserver(c);let d=Ji();d&&r.observe(d,{attributes:!0,attributeFilter:["disabled","class","aria-disabled"]});let f=d?.form||d?.closest?.("form")||document.querySelector("#page_form, form");f?r.observe(f,{attributes:!0,attributeFilter:["disabled","class"],childList:!0,subtree:!0}):r.observe(document.documentElement,{attributes:!0,attributeFilter:["disabled"],childList:!0,subtree:!0})}catch{r=null}o=l.setInterval(c,Y),c()})}function Da(){y("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function eo(t){if(O||_()||I)return;let e=await R(t);if(!Nt(e))return;lt(),I=!0,Pe();let n=Date.now(),i=!1,o=!1,r=async d=>{if(!(i||!I||!l.alive)){if(i=!0,window.removeEventListener("message",s),Tt&&(l.clear(Tt),Tt=null),_()){I=!1;return}if(I=!1,d){await Ke(t);return}ct(),y(P?"Auto Submit \u2014 Submit not clicked in time; City Change resuming\u2026":"Auto Submit \u2014 Submit not clicked in time; still watching\u2026")}},s=d=>{!l.alive||d.source!==window||d.data?.action===Et.sub&&r(!0)};window.addEventListener("message",s);let c=async()=>{if(i||!I||!l.alive||o)return;let d=Date.now()-n;if(fl()){o=!0,y("Submit enabled \u2014 clicking\u2026"),Zi();return}if(d>=We)return r(!1);y("Waiting for Submit to enable\u2026"),Tt=l.setTimeout(c,Y)};to(We).then(d=>{i||!I||!l.alive||o||d&&c()}),c()}async function Ea(){if(!X()||I||O)return;let t=await it();t&&await eo(t.accountId)}function y(t){let e=document.querySelector(p(a.aiStatus));e&&(e.textContent=t)}function k(t){y(t)}function ga(t){return!!(t&&t.termsAgreed)}function Ia(t){return!!(t&&t.termsPassed)}function Ln(){return!!document.querySelector(p(a.aiTermsAgree))?.checked}function no(t){let e=document.querySelector(p(a.aiTermsGate)),n=document.querySelector(p(a.aiMain)),i=document.querySelector(p(a.aiTermsAgree)),o=document.querySelector(p(a.aiTermsContinue)),r=Ia(t);e&&e.classList.toggle(u.hidden,r),n&&n.classList.toggle(u.hidden,!r),i&&(i.checked=ga(t)||Ln()),o&&(o.disabled=!(ga(t)||Ln()))}function ml(){let t=document.querySelector(p(a.aiTermsContinue)),e=Ln();t&&(t.disabled=!e),y(e?"Terms checked \u2014 tap Continue.":"Check Agree to continue.")}async function pl(){if(!Ln()){y("Check Agree first.");return}let t=await q();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let e=await R(t)||{},{from:n,to:i}=je(),o=Vt(),r=Hn();pt(),Qt(),Yi(),rt=!0,ft=!0,await At(t,{termsAgreed:!0,termsPassed:!0,termsAgreedAt:e.termsAgreedAt||Date.now(),submitEnabled:!0,citiesEnabled:!0,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],slotWindows:r.length?r:e.slotWindows||null,confirmedAt:Date.now()}),await nt(),st(document.querySelector(p(a.aiSubmitSw)),!0),st(document.querySelector(p(a.aiCitiesSw)),!0),rt=!0,ft=!0,Bn(await R(t)),Fe((e.cities||[]).map(c=>c.id),{force:!0}),io(e),no(await R(t)),(Vt().length?Vt():e.cities||[]).length&&(Qi(),await Wn()),(n||e.from)&&(i||e.to)&&await Nn(),y("Auto Submit and City Change ON \u2014 set dates and preferred cities.")}function La(t){t?.slotWindows?.length?rr(t.slotWindows):fi()}function hl(t){let e="";for(let n=0;n<=59;n++){let i=Number(t)===n?" selected":"";e+=`<option value="${n}"${i}>:${String(n).padStart(2,"0")}</option>`}return e}function ya(t,e){let n=Math.min(Lt,59-Number(t||0)),i="";for(let o=1;o<=Math.max(1,n);o++){let r=Number(e)===o?" selected":"";i+=`<option value="${o}"${r}>${o} min</option>`}return i}function Pa(t,e){let n=Number(t)||0,i=Number(e)||1,o=Math.min(59,n+i);return`Runs from :${String(n).padStart(2,"0")} up to :${String(o).padStart(2,"0")}`}function Hn(){let t=document.querySelector(p(a.aiWinList));if(!t)return[];let e=[];for(let n of t.querySelectorAll(`.${u.aiWinRow}`)){let i=Number(n.querySelector('select[data-win="from"]')?.value),o=Number(n.querySelector('select[data-win="dur"]')?.value);!Number.isFinite(i)||!Number.isFinite(o)||e.push({fromMin:i,durationMin:o})}return di(e)}function ba(t){let e=t.querySelector('select[data-win="from"]'),n=t.querySelector('select[data-win="dur"]'),i=t.querySelector(`.${u.aiWinHelp}`);!e||!n||!i||(i.textContent=Pa(e.value,n.value))}function qa(t=0,e=6){let n=Math.min(Lt,59-t),i=Math.min(Math.max(1,e||1),Math.max(1,n)),o=document.createElement("div");o.className=u.aiWinRow,o.innerHTML=`
    <div class="${u.aiInline}">
      <label class="${u.aiHead}">Start</label>
      <select data-win="from">${hl(t)}</select>
      <label class="${u.aiHead}" style="margin-left:10px;color:#6b7280;font-weight:500">Duration</label>
      <select data-win="dur">${ya(t,i)}</select>
      <button type="button" class="${u.aiTrash}" data-win="del" title="Delete timing" aria-label="Delete">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
        </svg>
      </button>
    </div>
    <div class="${u.aiWinHelp}">${Pa(t,i)}</div>
  `;let r=o.querySelector('select[data-win="from"]'),s=o.querySelector('select[data-win="dur"]');return l.on(r,"change",()=>{let c=Number(r.value),d=Number(s.value)||1;s.innerHTML=ya(c,d),ba(o)}),l.on(s,"change",()=>ba(o)),l.on(o.querySelector('button[data-win="del"]'),"click",()=>{o.remove(),oo()}),o}function io(t){let e=document.querySelector(p(a.aiWinList));if(!e)return;e.replaceChildren();let n=t?.slotWindows?.length?ar(t.slotWindows):[];for(let i of n.slice(0,xt))e.appendChild(qa(i.fromMin,i.durationMin));oo(t)}function oo(t){let e=document.querySelector(p(a.aiWinNote));e&&(t?.slotWindows?.length||Hn().length?e.textContent=`Custom windows active (max ${xt}, each \u2264 ${Lt} min).`:e.textContent=`Using defaults: ${ut()}. Add up to ${xt} windows below.`)}function st(t,e){t&&(t.classList.toggle(u.aiOnBtn,!!e),t.setAttribute("aria-checked",e?"true":"false"))}function gl(t){st(document.querySelector(p(a.aiSubmitSw)),Nt(t)),st(document.querySelector(p(a.aiCitiesSw)),Ot(t))}var rt=!1,ft=!1;function Bn(t){let e=Nt(t)||rt,n=Ot(t)||ft,i=document.querySelector(p(a.aiSubmitBody)),o=document.querySelector(p(a.aiCitiesBody));i&&i.classList.toggle(u.hidden,!e),o&&o.classList.toggle(u.hidden,!n)}function yl(t,e){let n=document.querySelector(p(a.aiStatus)),i=document.querySelector(p(a.aiBtn));if(!n||!i)return;gl(t),Bn(t);let o=Nt(t),r=Ot(t),s=o||r;s?(i.classList.add(u.aiOn),i.textContent="Tik Tik ON"):(i.classList.remove(u.aiOn),i.textContent="Tik Tik");let c=[];o&&t.from&&t.to?c.push(`Auto Submit ON (${Xt(t.from)} \u2013 ${Xt(t.to)}, clicks Submit as soon as time slot is ready)`):rt&&!o?c.push("Auto Submit \u2014 set From / To dates, then Enable again"):c.push("Auto Submit OFF"),r?c.push(`City Change ON (${ol(t)}, ${ut()})`):ft&&!r?c.push("City Change \u2014 pick preferred cities, then Enable again"):c.push("City Change OFF"),n.textContent=`Account ${e||"\u2014"}: ${c.join(" \xB7 ")}`,n.classList.toggle(u.aiOk,s)}async function nt(){let t=await q();if(t)try{await ka(t)}catch{}let e=t?await R(t):null;Nt(e)||(rt=!1),Ot(e)||(ft=!1),La(e),yl(e,t),no(e);let n=document.querySelector(p(a.aiFrom)),i=document.querySelector(p(a.aiTo));n&&(n.value=e?.from||""),i&&(i.value=e?.to||""),Fi();let o=(e?.cities||[]).map(S=>S.id),r=document.querySelector(p(a.aiPanel)),s=r&&!r.classList.contains(u.hidden),c=document.querySelector(p(a.aiCitiesBody)),d=c&&!c.classList.contains(u.hidden),f=va();(d||Ot(e)||ft)&&Fe(s&&f.length?f:o),io(e);let g=document.querySelector(p(a.aiLogin)),h=document.querySelector(p(a.aiPass));g&&e?.loginId&&(g.value=e.loginId),h&&e?.loginPass&&(h.value=e.loginPass);let w=e?.security||[],v=[a.aiQ1,a.aiQ2,a.aiQ3],K=[a.aiA1,a.aiA2,a.aiA3];v.forEach((S,B)=>{let wt=document.querySelector(p(S));wt&&(wt.innerHTML=Mn(B,w[B]?.q||""))}),K.forEach((S,B)=>{let wt=document.querySelector(p(S));wt&&w[B]?.a&&(wt.value=w[B].a)});let M=document.querySelector(p(a.aiLoginBody)),z=M&&!M.classList.contains(u.hidden);ro(!!z,$l(e))}function bl(){let t=document.querySelector(p(a.aiPanel));return!!(t&&!t.classList.contains(u.hidden))}function Oi(t){let e=document.querySelector(p(a.aiPanel));e&&(t||Rt(),e.classList.toggle(u.hidden,!t),t&&q().then(async n=>{if(n)try{Ri=null,await ka(n)}catch{}let i=n?await R(n):null;no(i),Ia(i)?Fe((i?.cities||[]).map(o=>o.id),{force:!0}):y("Read the terms, check Agree, then Continue.")}))}function Ni(){if(Ni._done)return;Ni._done=!0;let t=e=>{if(!bl())return;let n=document.querySelector(p(a.aiPanel)),i=document.querySelector(p(a.aiBtn)),o=document.querySelector(p(a.aiCal)),r=Ui(e);if(!(o&&!o.classList.contains(u.hidden)&&r&&o.contains(r))){if(o&&!o.classList.contains(u.hidden)){let s=document.querySelector(p(a.aiFromBtn)),c=document.querySelector(p(a.aiToBtn));!(s&&r&&(s===r||s.contains(r)))&&!(c&&r&&(c===r||c.contains(r)))&&Rt()}n&&r&&(n===r||n.contains(r))||i&&r&&(i===r||i.contains(r))||(Rt(),Oi(!1))}};l.on(document,"pointerdown",t,{capture:!0})}async function wl(t){let e=await q();if(!e){y("Open a logged-in schedule page so we can bind this to your account.");return}let n=await R(e)||{},{from:i,to:o}=je();if(i=i||n.from||null,o=o||n.to||null,t){rt=!0,st(document.querySelector(p(a.aiSubmitSw)),!0),pt(),Qt(),Yi(),await At(e,{submitEnabled:!0,from:i||null,to:o||null,confirmedAt:Date.now()});let r=document.querySelector(p(a.aiFrom)),s=document.querySelector(p(a.aiTo));if(r&&i&&(r.value=i),s&&o&&(s.value=o),Fi(),await nt(),st(document.querySelector(p(a.aiSubmitSw)),!0),rt=!0,Bn(await R(e)),!i||!o){y("Auto Submit ON \u2014 select From and To dates to start booking.");return}if(i>o){y("Auto Submit ON \u2014 From date must be before To date.");return}rt=!1,y(`Auto Submit ON (${Xt(i)} \u2013 ${Xt(o)})`),await Nn();return}rt=!1,Qt(),st(document.querySelector(p(a.aiSubmitSw)),!1),await At(e,{submitEnabled:!1,from:i||n.from,to:o||n.to}),await nt(),y("Auto Submit OFF")}async function Sl(t){let e=await q();if(!e){y("Open a logged-in schedule page so we can bind this to your account.");return}let n=await R(e)||{};if(t){ft=!0,st(document.querySelector(p(a.aiCitiesSw)),!0),Fe((n.cities||[]).map(s=>s.id),{force:!0}),io(n);let o=Vt();!o.length&&n.cities?.length&&(o=n.cities);let r=Hn();if(pt(),await At(e,{citiesEnabled:!0,cities:o.length?o:n.cities||[],slotWindows:r.length?r:n.slotWindows||null}),await nt(),st(document.querySelector(p(a.aiCitiesSw)),!0),ft=!0,Bn(await R(e)),o.length||Fe([],{force:!0}),!o.length){y("City Change ON \u2014 select at least one preferred city to start hopping.");return}ft=!1,Qi(),await Wn(),y(`City Change ON (${o.map(s=>s.name||s.id).join(", ")})`);return}ft=!1,Ne(),st(document.querySelector(p(a.aiCitiesSw)),!1);let i=Vt();await At(e,{citiesEnabled:!1,cities:i.length?i:n.cities||[]}),await nt(),y("City Change OFF")}async function wa(){let t=await q();if(!t)return;let e=await R(t)||{};if(!Nt(e)&&!rt)return;let{from:n,to:i}=je();!n||!i||n>i||(await At(t,{submitEnabled:!0,from:n,to:i,confirmedAt:Date.now()}),rt=!1,await nt(),st(document.querySelector(p(a.aiSubmitSw)),!0),pt(),Yi(),y(`Auto Submit ON (${Xt(n)} \u2013 ${Xt(i)})`),await Nn())}function xl(t){return(t||[]).map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", ")}async function vl(){let t=document.querySelector(p(a.aiWinList));if(t){if(t.querySelectorAll(`.${u.aiWinRow}`).length>=xt){y(`Max ${xt} timing windows.`);return}t.appendChild(qa(0,Math.min(6,Lt))),oo()}}async function Cl(){let t=await q();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let e=Hn();if(!e.length){y("Add at least one timing (or Reset to defaults).");return}await At(t,{slotWindows:e}),await nt(),y(`Saved ${e.length} custom timing(s): ${xl(e)}`)}async function Tl(){let t=await q();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}window.confirm("Reset to default IST windows? Your custom timings will be removed.")&&(await At(t,{slotWindows:null}),fi(),await nt(),y(`Using default windows: ${ut()}`))}async function _l(){let t=await q();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let{from:e,to:n}=je(),i=Vt(),o=document.querySelector(p(a.aiLogin))?.value?.trim(),r=document.querySelector(p(a.aiPass))?.value,s=[0,1,2].map(c=>({q:document.querySelector(p([a.aiQ1,a.aiQ2,a.aiQ3][c]))?.value?.trim()||"",a:document.querySelector(p([a.aiA1,a.aiA2,a.aiA3][c]))?.value?.trim()||""}));if(!o||!r){y("Enter ID and password before saving.");return}if(s.some(c=>!c.q||!c.a)){y("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}await At(t,{}),ro(!0,!0),y("Saved ID, password, and 3 security questions (1 from each set).")}function $l(t){let e=t?.security||[];return!!(t?.loginId&&t?.loginPass&&e.length>=3&&e.every(n=>n?.q&&n?.a))}function ro(t,e){let n=document.querySelector(p(a.aiLoginToggle));if(!n)return;let i=t?"\u25BE":"\u25B8";n.textContent=e?`Login details (saved) ${i}`:`Login details ${i}`}function kl(){let t=document.querySelector(p(a.aiLoginBody)),e=document.querySelector(p(a.aiLoginToggle));if(!t||!e)return;let n=t.classList.contains(u.hidden);t.classList.toggle(u.hidden,!n);let i=/saved/i.test(e.textContent||"");ro(n,i)}function ao(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==a.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==a.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===a.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function Wi(){document.querySelector(p(a.aiPanel))?.remove(),document.querySelector(p(a.aiBtn))?.remove(),ao()}function Ml(){if(_())return;if(!Bi()){Wi();return}if(document.querySelector(p(a.aiBtn)))if(!document.querySelector(p(a.aiSubmitSw))||!document.querySelector(p(a.aiTermsContinue))||!document.querySelector(p(a.aiFromBtn)))Wi();else return;let t=pr();if(!t)return;let e=document.createElement("button");e.id=a.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[$.mark]="",l.on(e,"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiPanel)),r=o&&o.classList.contains(u.hidden);Oi(!!r)}),t.appendChild(e);let n=document.createElement("div");n.id=a.aiPanel,n.className=u.hidden,n.dataset[$.mark]="",n.innerHTML=`
    <div id="${a.aiTermsGate}">
      <div id="${a.aiTerms}" class="${u.aiTerms}">
        <div class="${u.aiHead}">Terms &amp; Conditions</div>
        <div class="${u.aiHint}">Please read carefully before continuing.</div>
        <ul class="${u.aiTermsList}">
          <li>Options apply to this applicant only. They do not bypass CAPTCHAs, waiting rooms, or portal security.</li>
          <li>During your windows, City Change hops every 13\u201318s. Max ${xt} windows, each up to ${Lt} minutes.</li>
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
            <label>From
              <button type="button" id="${a.aiFromBtn}" class="${u.aiDateBtn}">Select date</button>
              <input type="hidden" id="${a.aiFrom}" />
            </label>
            <label>To
              <button type="button" id="${a.aiToBtn}" class="${u.aiDateBtn}">Select date</button>
              <input type="hidden" id="${a.aiTo}" />
            </label>
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
              <select id="${a.aiQ1}">${Mn(0)}</select>
            </label>
            <label>Your answer for set 1
              <input type="text" id="${a.aiA1}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${u.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 2 \u2014 choose 1 question
              <select id="${a.aiQ2}">${Mn(1)}</select>
            </label>
            <label>Your answer for set 2
              <input type="text" id="${a.aiA2}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${u.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 3 \u2014 choose 1 question
              <select id="${a.aiQ3}">${Mn(2)}</select>
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
  `,t.insertAdjacentElement("afterend",n),l.on(n.querySelector(p(a.aiSubmitSw)),"click",async()=>{let i=await q(),o=i?await R(i):null;await wl(!Nt(o))}),l.on(n.querySelector(p(a.aiCitiesSw)),"click",async()=>{let i=await q(),o=i?await R(i):null;await Sl(!Ot(o))}),l.on(n.querySelector(p(a.aiWinAdd)),"click",vl),l.on(n.querySelector(p(a.aiWinSave)),"click",Cl),l.on(n.querySelector(p(a.aiWinReset)),"click",Tl),l.on(n.querySelector(p(a.aiSaveLogin)),"click",_l),l.on(n.querySelector(p(a.aiLoginToggle)),"click",kl),l.on(n.querySelector(p(a.aiClose)),"click",()=>Oi(!1)),l.on(n.querySelector(p(a.aiCitiesAll)),"click",()=>ma(!0)),l.on(n.querySelector(p(a.aiCitiesNone)),"click",()=>ma(!1)),l.on(n.querySelector(p(a.aiTermsAgree)),"change",()=>{ml()}),l.on(n.querySelector(p(a.aiTermsContinue)),"click",()=>{pl()}),l.on(n.querySelector(p(a.aiFromBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiCal));if(o&&!o.classList.contains(u.hidden)&&J.which==="from"){Rt();return}aa("from",i.currentTarget)}),l.on(n.querySelector(p(a.aiToBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiCal));if(o&&!o.classList.contains(u.hidden)&&J.which==="to"){Rt();return}aa("to",i.currentTarget)}),Ni(),nt()}function Al(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",l.on(e,"click",()=>{q().then(n=>{Ke(n||null)})}))};t(document.querySelector("#submitbtn")),l.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function so(){if(l.alive&&!_()){if(!Bi()){Wi();return}await l.waitFor("#post_select",{attempts:on})&&(zr(t=>{let e=String(t?.message||t?.source||"error").slice(0,120);Be(e)}),Ml(),Qi(),Al(),!fa&&(fa=!0,l.setTimeout(()=>nt(),800),l.setTimeout(async()=>{await it()&&await Nn()},1500)))}}var Ra=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function Oa(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function Dl(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=Oa(t.data.url),i=new URLSearchParams(t.data.request||"").get("parameters");if(!i)return null;let o;try{o=JSON.parse(i)}catch{return null}return{params:o,tail:e,response:t.data.response}}async function El(t,e={}){t?.length&&(await Ir(t,e),await x("audioAlert")&&wr())}async function Il(t,e=!1){if(e||_())return null;let n=new Date;n.setHours(0,0,0,0);let i=(t||[]).map(s=>{if(!s)return null;let c=Un(s.Date);return c?{...s,Date:c}:null}).filter(Boolean).filter(s=>{let[c,d,f]=s.Date.slice(0,10).split("-").map(Number);return!c||!d||!f?!1:new Date(c,d-1,f)>=n}).sort((s,c)=>String(s.Date).localeCompare(String(c.Date))),o=await it();if(o){let s=i.filter(d=>ze(d.Date,o.from,o.to));if(!s.length)return null;let c=pe(s.length);return s[c]?.Date||null}if(!await x("autoSelectFirstDate")||!i.length)return null;let r=pe(i.length);return i[r]?.Date||null}function Un(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,r,s]=n;return`${s}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime())){let r=o.getFullYear(),s=String(o.getMonth()+1).padStart(2,"0"),c=String(o.getDate()).padStart(2,"0");return`${r}-${s}-${c}`}}return null}function Ll(t){if(!t)return!1;let[e,n,i]=t.slice(0,10).split("-").map(Number);if(!e||!n||!i)return!1;let o=n-1,r=String(n).padStart(2,"0")+"/"+String(i).padStart(2,"0")+"/"+e,s=document.querySelector("#datepicker");if(s){let c=String(s.value||"").trim();if(c===r)return!0;if(c.includes(String(e))&&c.includes(String(i).padStart(2,"0"))){let d=c.split(/[/-]/).map(f=>parseInt(f,10));if(d.length>=3){let f,g,h;if(d[2]>31?(g=d[0],h=d[1],f=d[2]):(f=d[0],g=d[1],h=d[2]),f===e&&g===n&&h===i)return!0}}try{let d=window.jQuery||window.$;if(d&&d(s).hasClass("hasDatepicker")){let f=d(s).datepicker("getDate");if(f&&f.getFullYear()===e&&f.getMonth()===o&&f.getDate()===i)return!0}}catch{}}for(let c of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let d=c.querySelector("a");if(!d)continue;let f=parseInt(c.getAttribute("data-month"),10),g=parseInt(c.getAttribute("data-year"),10),h=parseInt(d.textContent,10);if(g===e&&f===o&&h===i)return!0}return!1}var Fn=null;function Pl(t,e){Fn&&l.clear(Fn);let n=Date.now()+(e?me:8e3),i=()=>{!l.alive||Date.now()>n||Ll(t)||(l.send({action:"selectFirstDate",date:t,maxMs:e?me:8e3,pollMs:Y}),Fn=l.setTimeout(i,Y))};Fn=l.setTimeout(i,80)}function Na(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function ql(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function Wa(t){return t?.length?t.map((e,n)=>({entry:e,index:n,avail:ql(e)})).sort((e,n)=>n.avail!==e.avail?n.avail-e.avail:e.index-n.index):[]}function Rl(t){let e=Wa(t);return e.length?{entry:e[0].entry,slotIndex:e[0].index}:{entry:null,slotIndex:0}}function Ha(){Jt&&(l.clear(Jt),Jt=null)}var Ba=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),Fa=null,Ol=null,Jt=null;function Nl(t,e){Fa=t,Ol=e?String(e).slice(0,10):null}function Wl(t,e=0){Jt&&l.clear(Jt);let n=t?String(t).slice(0,10):null,i=0,o=async()=>{if(!l.alive||Ue()||++i>240||X())return;let r=(Fa||[]).filter(s=>s&&s.Time);if(r.length){let{entry:s,slotIndex:c}=Rl(r);if(k(`Watchdog: picking time slot #${c+1}\u2026`),await Ie({time:Na(s.Time),date:s.Date?String(s.Date).slice(0,10):n,slotIndex:c,pollMs:Y,maxMs:600,prefix:m}),X())return}else if(document.querySelector(Ba)&&(k("Watchdog: picking visible time slot\u2026"),await Ie({time:"00:00",date:n,slotIndex:e,pollMs:Y,maxMs:600,prefix:m}),X()))return;Jt=l.setTimeout(o,Y)};Jt=l.setTimeout(o,300)}var Hl=["#datepicker.hasDatepicker","#datepicker"].join(", ");async function Bl(t,e=!1){if(e)return null;let n=await Il(t,e);if(!n)return null;let i=await it(),o=new Date;o.setHours(0,0,0,0);let r=(t||[]).map(d=>Un(d?.Date)).filter(Boolean).filter(d=>{let[f,g,h]=d.slice(0,10).split("-").map(Number);return new Date(f,g-1,h)>=o}).sort((d,f)=>d.localeCompare(f)),s=i?r.filter(d=>ze(d,i.from,i.to)):r,c=pe(s.length);return k(`Selecting date #${c+1}: ${n} (fast)\u2026`),qn(n),await l.waitFor(Hl,{attempts:80,interval:Y}),l.send({action:"selectFirstDate",date:n,maxMs:i?me:8e3,pollMs:Y}),Pl(n,i),Wl(n,Pn),n}async function Fl(t,e=!1){if(e||_()||Ue())return;let n=await it();if(!n&&!await x("autoSelectFirstDate"))return;Ha();let i=(t||[]).filter(c=>!(!c||!c.Time||c.EntriesAvailable!=null&&Number(c.EntriesAvailable)<=0));n&&(i=i.filter(c=>{let d=c.Date?String(c.Date).slice(0,10):null;return d?d>=n.from&&d<=n.to:!0}));let o=Wa(i);if(!o.length)return;let r=Date.now()+1e4;for(;Date.now()<r&&l.alive&&!(Br(i)||document.querySelector(Ba));)await new Promise(c=>l.setTimeout(c,Y));let s=o.length===1?We:Sa;k(o.length===1?`1 time slot \u2014 try highest avail, wait \u2264${s/1e3}s for Submit\u2026`:`${o.length} time slots \u2014 try highest\u21922nd\u21923rd\u2026 (${s/1e3}s each for Submit)`);for(let c=0;c<o.length;c++){if(!l.alive||Ue()||_())return;let{entry:d,index:f,avail:g}=o[c],h=Na(d.Time),w=d.Date?String(d.Date).slice(0,10):null,v=c===0?"highest":c===1?"2nd-highest":c===2?"3rd-highest":`${c+1}th-highest`;if(k(`Trying ${v} avail (${g}) @ ${h} \u2014 slot ${c+1}/${o.length}\u2026`),!await Ie({time:h,date:w,slotIndex:f,pollMs:Y,maxMs:4e3,prefix:m})&&!X()){k(`Could not click ${h} \u2014 trying next\u2026`);continue}if(k(`Selected ${h} (${v}) \u2014 waiting \u2264${s/1e3}s for Submit to enable\u2026`),await to(s)){k(`Submit enabled on ${h} \u2014 clicking\u2026`),n?await eo(n.accountId):Zi();return}c<o.length-1&&k(`Submit still disabled on ${h} \u2014 trying next (${c+2}/${o.length})\u2026`)}k(`Tried all ${o.length} time slot(s); Submit never enabled.`),n&&ct()}async function Ua(t){if(!F()||_())return;let e;try{e=Dl(t)}catch{return}if(e==null)return;if(jr(e),e.retryAfter!==void 0){let r=Number(e.retryAfter);Qo(e.cgiBlock,r),r?(pn(r),ji(r)):x("defaultWaitTime").then(s=>{pn(s),ji(s)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let r=e.response.Posts||[],s=new Map((await St()).map(c=>[c.ID,c]));for(let c of r)s.set(c.ID,{...s.get(c.ID),...c});await ee([...s.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let r=e.response.Members||[];if(r.length){let s=await G()||{},c=s.name&&r.find(d=>d.FullName===s.name);s.visa=(c||r[0]).VisaClassName,await T({profile:s,members:r})}}if(Ra.includes(e.tail)){pt(),Cr(e);let r=(e.response.ScheduleDays||[]).map(h=>Un(h?.Date)).filter(Boolean).length;r&&k(`${r} date${r===1?"":"s"} available \u2014 see list below`),r>0&&!e.response.HasError&&lt(),$a();let s=await it();await he()||x("defaultWaitTime").then(h=>{pn(h)});let d=await St(),f=d.find(h=>h.ID===e.params.postId);if(f&&(f.Days=e.response.ScheduleDays,f.Updated=Date.now(),f.HasError=e.response.HasError,f.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,ee(d)),await El(e.response.ScheduleDays,{postId:e.params.postId,postName:f?.Name,hasError:e.response.HasError}),!e.response.HasError&&r>0){let h=String(e.params.postId||"");k(`${r} date${r===1?"":"s"} \u2014 alerting others with this city\u2026`),Qr({postId:h,postName:f?.Name,dayCount:r}).catch(()=>{})}if(await Lr(e.response.ScheduleDays,{postId:e.params.postId,postName:f?.Name,hasError:e.response.HasError}),Ge())lt(),k("Submit pending \u2014 staying on this city (date reload ignored)\u2026");else if(s&&!e.response.HasError){let h=Rn(e.response.ScheduleDays,s.from,s.to);h.length?(lt(),k(`${h.length} date${h.length===1?"":"s"} in range \u2014 selecting (city hold)\u2026`)):ct()}else s?ct():r>0&&!e.response.HasError&&(await x("autoSelectFirstDate")||ct());let g=Ge()?null:await Bl(e.response.ScheduleDays,e.response.HasError);if(g)lt(),await Pr(f?.Name,g);else if(s&&!e.response.HasError&&!Ge()){let h=(e.response.ScheduleDays||[]).map(v=>Un(v?.Date)).filter(Boolean),w=h.filter(v=>ze(v,s.from,s.to));h.length&&!w.length?(ct(),k(`Dates found but none in ${s.from} \u2192 ${s.to}. Next city in 13\u201318s\u2026`)):h.length||(ct(),k("No dates on this city \u2014 next city in 13\u201318s\u2026"))}await si()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let r=e.params.Date.split("T")[0];Nl(e.response.ScheduleEntries,r),Ha();let s=await St(),c=s.filter(f=>f.Days&&f.Updated).sort((f,g)=>g.Updated-f.Updated).find(f=>f.Days.some(g=>g.Date===r));if(c){let f=c.Days.find(g=>g.Date===r);f&&(f.Times=e.response.ScheduleEntries,ee(s))}let d=(e.response.ScheduleEntries||[]).filter(f=>f&&f.Time);if(Tr(d,r,c?.Name),d.length){let f=d.filter(w=>w.EntriesAvailable==null||Number(w.EntriesAvailable)>0),g=f.reduce((w,v)=>{let K=Number(v.EntriesAvailable);return w+(Number.isFinite(K)?K:0)},0),h=g>0?` \xB7 ${g} available`:"";k(`${f.length||d.length} time slot${(f.length||d.length)===1?"":"s"} on ${r}${h}`)}await Fl(e.response.ScheduleEntries,e.response.HasError),Ge()?(lt(),k("Submit pending \u2014 staying on this city (time reload ignored)\u2026")):d.length?(lt(),await qr(c?.Name,e.params.Date,d.length)):(ct(),k("No time slots on this date \u2014 next city in 13\u201318s\u2026")),await si()}}function Ka(t){if(!F()||_())return;let e=Oa(t.data.url);Ra.includes(e)&&gr()}var Zt=null,lo="",co={scanning:"Scanning for Cloudflare challenge\u2026",dom:"Trying page-level verify click\u2026",debugger:"Advanced click \u2014 targeting Turnstile iframe\u2026",retry:"Waiting before next attempt\u2026",success:"Verification passed \u2014 continuing\u2026",manual:"Stuck? Click the checkbox once, then we\u2019ll continue."};function Ga(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=u.cfFlash,n.dataset[$.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),l.setTimeout(()=>n.remove(),1200)}}function Ul(){let t=document.querySelector(p(a.cfHud));return t||(t=document.createElement("div"),t.id=a.cfHud,t.dataset[$.mark]="",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.innerHTML=`
    <div class="${u.cfHud}">
      <div class="${u.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">\u{1F6E1}</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${co.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `,document.documentElement.appendChild(t),t)}async function N(t,e){if(!chrome.runtime?.id||!l.alive||!await x("autoCloudflareTick"))return;let n=Ul(),i=n.querySelector("[data-cf-msg]"),o=n.querySelector("[data-cf-sub]"),r=n.querySelector("[data-cf-chip]"),s=n.querySelector(`.${u.cfHud}`);lo=t,i&&(i.textContent=co[t]||co.scanning),o&&(o.textContent=e||Kl(t)),r&&(r.textContent=t==="success"?"Done":t==="manual"?"Help":"Active",r.dataset.state=t),s&&(s.dataset.state=t),Zt&&(l.clear(Zt),Zt=null),t==="success"&&(Zt=l.setTimeout(()=>uo(),2800))}function Kl(t){return t==="debugger"?"Precision click via advanced browser bridge":t==="dom"?"Standard page interaction":t==="manual"?"One manual click is usually enough":t==="success"?"Resuming login and recovery":"Monitoring this tab for Turnstile"}function uo(){let t=document.querySelector(p(a.cfHud));t&&t.remove(),lo="",Zt&&(l.clear(Zt),Zt=null)}function fo(){return lo}var Gl=/we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i,zl=/\bUSG\s+[a-f0-9-]{8,}/i;var po="vsPortalErrorReloadCount",Ya="vsPortalErrorReloadAt",jl=2e3,Yl=1e4,za=!1,ye=null,Vl=null;function Xl(){return(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim()}function be(){let t=Xl().slice(0,6e3);return t?!!(/a timeout occurred/i.test(t)&&(/error\s*524/i.test(t)||/origin web server timed out/i.test(t)||/cloudflare ray id/i.test(t))||/error\s*524/i.test(t)&&/cloudflare/i.test(t)&&t.length<8e3||Gl.test(t)&&(zl.test(t)||/error id\s*#/i.test(t))||/we'?re sorry,\s*but something went wrong/i.test(t)&&t.length<2500):!1}function Va(){try{return Math.max(0,Number(sessionStorage.getItem(po)||0))}catch{return 0}}function Ql(){try{let t=Va()+1;return sessionStorage.setItem(po,String(t)),sessionStorage.setItem(Ya,String(Date.now())),t}catch{return 1}}function mo(){try{sessionStorage.removeItem(po),sessionStorage.removeItem(Ya)}catch{}}function Jl(t){return Math.min(Yl,jl+Math.max(0,t-1)*1e3)}function Zl(){ye&&(l.clear(ye),ye=null)}function tu(){Ql();try{location.reload()}catch{}}function ja(){if(!l.alive||ye)return;if(!be()){mo();return}let t=Va()+1,e=Jl(t);ye=l.setTimeout(()=>{if(ye=null,!!l.alive){if(!be()){mo();return}tu()}},e)}function Xa(){if(za)return;za=!0;let t=()=>{l.alive&&(be()?ja():(mo(),Zl()))};t(),Vl=l.setInterval(t,1500);try{let e=new MutationObserver(()=>{l.alive&&be()&&ja()});e.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),l.disposable(()=>e.disconnect())}catch{}}var Kn="vsDebugLogs",eu=200;function nu(){try{return new Date().toLocaleTimeString("en-IN",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})}catch{return new Date().toISOString().slice(11,19)}}async function W(t,e,n){let i={at:Date.now(),t:nu(),tag:String(t||"app").slice(0,24),msg:String(e||"").slice(0,400)};if(n!=null)try{i.data=JSON.parse(JSON.stringify(n))}catch{i.data=String(n).slice(0,200)}try{console.log(`[VS6 ${i.tag}] ${i.msg}`,n!==void 0?n:"")}catch{}try{let o=await C({[Kn]:[]}),r=Array.isArray(o[Kn])?o[Kn].slice():[];for(r.push(i);r.length>eu;)r.shift();await T({[Kn]:r})}catch{}}var zn=null,Ve=0,Ye=null,Dt=0,Qa=0,iu=25e3;async function ou(){try{let e=(await C("humanClickProfile")).humanClickProfile,n=e?.liveTrained&&e.samples?.length||0;return n<5?15e3:n<20?1e4:n<50?6e3:3500}catch{return 12e3}}var go=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function Q(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!H()&&!fo()}function H(){if(be()||document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return go.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:ho().length>0}function Gn(t){return new Promise(e=>setTimeout(e,t))}function ru(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let i of n.querySelectorAll("*"))i.shadowRoot&&(t.push(i.shadowRoot),e.push(i.shadowRoot))}return t}function ho(){let t=[],e=new Set,n=i=>{if(!i||e.has(i))return;let o=i.getBoundingClientRect();if(o.width<40||o.height<20||o.width>900||o.height>400)return;let r=(i.src||i.getAttribute?.("src")||"").toLowerCase(),s=(i.title||i.getAttribute?.("title")||"").toLowerCase(),c=(i.className?.toString?.()||"").toLowerCase(),d=(i.id||"").toLowerCase(),f=i.tagName==="IFRAME"&&(r.includes("challenges.cloudflare")||r.includes("turnstile")||s.includes("cloudflare")||s.includes("security challenge")),g=c.includes("cf-turnstile")||c.includes("turnstile")||d.includes("turnstile")||d.includes("challenge")||i.hasAttribute?.("data-sitekey")||i.hasAttribute?.("data-turnstile-widget");if(!f&&!g)if(i.tagName==="IFRAME"&&o.width>=120&&o.width<=420&&o.height>=45&&o.height<=120){if(!go.test(document.body?.innerText||""))return}else return;e.add(i),t.push({el:i,rect:o})};for(let i of ru()){for(let o of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let r of i.querySelectorAll(o))n(r);for(let o of i.querySelectorAll("iframe"))n(o)}return t}function au(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function su(t){let e=[],n=new Set,i=(o,r)=>{if(!Number.isFinite(o)||!Number.isFinite(r)||o<1||r<1||o>window.innerWidth-1||r>window.innerHeight-1)return;let s=`${Math.round(o)},${Math.round(r)}`;n.has(s)||(n.add(s),e.push({x:Math.round(o),y:Math.round(r)}))};for(let{rect:o}of t){let r=o.top+o.height/2,s=o.left+Math.min(28,Math.max(18,o.width*.11));for(let c of[0,-4,4,-8,8,12,16,20,24,28,32])for(let d of[0,-3,3,-6,6])i(s+c,r+d);i(o.left+o.width*.5,r)}return e}function cu(t){for(let{el:e,rect:n}of t)try{e.click();let i=n.left+Math.min(26,n.width*.12),o=n.top+n.height/2,r=document.elementFromPoint(i,o)||e;for(let s of["pointerdown","mousedown","mouseup","pointerup","click"])r.dispatchEvent(new MouseEvent(s,{bubbles:!0,cancelable:!0,clientX:i,clientY:o,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let i=n.getBoundingClientRect();if(i.width<4&&i.height<4)continue;let o=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!o.includes("human")&&!o.includes("verify")&&e==="input[type='checkbox']"){let r=n.closest("label, div, form");if(!go.test(r?.textContent||""))continue}return n.click(),!0}return!1}async function Ja(t){t.length&&(Ga(t.slice(0,3)),l.send({action:"viewportClickPoints",points:t}),await x("cloudflareDebuggerClick")?(await N("debugger","Trained click on Verify you are human\u2026"),l.send({action:"cloudflareDebuggerClick",points:t,primaryOnly:!0})):await N("dom"))}function Za(){return/\/(schedule|ofc-schedule|c-schedule)\b/i.test(location.pathname||"")}function ts(){if(!Za()||!H()||Q())return;let t=Date.now();if(!(t-Qa<iu)){Qa=t,W("cf","verify-human on schedule \u2014 focusing Application Home for manual click"),N("manual","Verify you are human \u2014 opening Home tab so you can click it there\u2026").catch(()=>{});try{l.send({action:"focusHomeForVerify",ofcUrl:location.href})}catch{}}}async function jn(){if(!await x("autoCloudflareTick"))return!1;if(Q())return Dt&&W("cf","challenge already solved"),Dt=0,await N("success"),!0;ts(),Dt||(Dt=Date.now(),W("cf","challenge seen \u2014 train window started"));let t=await ou();if(Date.now()-Dt<t)return await N("scanning",Za()?"Opening Home \u2014 click Verify you are human on the Home tab\u2026":"Train window \u2014 click Verify you are human yourself (recording your mouse)\u2026"),!1;W("cf","train window done \u2014 attempting auto click"),await N("scanning","Verify you are human page \u2014 preparing click\u2026");let e=ho();au(e),await Gn(350),e=ho();let n=su(e);return n.length&&(await Ja(n),await Gn(1200),Q()||!H())?(Dt=0,await N("success"),!0):(await N("dom"),cu(e),await Gn(600),Q()||!H()?(Dt=0,await N("success"),!0):n.length&&(await Ja(n),await Gn(1e3),Q()||!H())?(Dt=0,await N("success"),!0):(Ve++,Ve>=8?await N("manual","Click the checkbox once \u2014 we will continue after."):await N("retry",`Retry ${Ve}/8\u2026`),!1))}function lu(){Ye||(Ye=new MutationObserver(()=>{l.alive&&H()&&!Q()&&(ts(),jn())}),Ye.observe(document.documentElement,{childList:!0,subtree:!0}),l.disposable(()=>{Ye?.disconnect(),Ye=null}))}function yo(){zn&&(l.clear(zn),zn=null),Ve=0,Dt=0,uo()}async function bo(){if(yo(),!await x("autoCloudflareTick"))return;lu();let t=async()=>{if(l.alive&&await x("autoCloudflareTick")){if(H()&&!Q()){await jn();return}fo()&&(Ve=0,await N("success"))}};t(),zn=l.setInterval(t,1800)}var we="sessionRecovery",wo="homeKeepaliveAt",So="homeLoadingStuckAt",Co="vsResubmitContinue",es=2e3,Vn=!1,ns=null,xo=null,vo=null,Yn=null,Xe=0;function $o(){try{let t=new URL(location.href);return t.searchParams.set("_vsr",String(Date.now()%1e12)),location.replace(t.pathname+t.search+t.hash),!0}catch{try{return location.href=location.pathname+location.search,!0}catch{return!1}}}function ss(){try{if(sessionStorage.getItem(Co)!=="1")return!1;sessionStorage.removeItem(Co)}catch{return!1}return gt()||document.querySelector("#post_select")?!1:($o(),!0)}function is(){return b.homeKeepaliveMinMs}function uu(){return b.homeKeepaliveMaxMs}function du(){return b.homeKeepaliveDebounceMs}function os(){return b.loadingStuckMs}function fu(){return b.loadingStuckDebounceMs}function rs(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function mu(t,e){let n=rs(t);if(!n)return"";let i="",o=0;for(let r of e||[]){let s=rs(r.q);if(!s||!r.a)continue;if(n.includes(s)||s.includes(n))return r.a;let c=s.split(" ").filter(g=>g.length>3),d=0;for(let g of c)n.includes(g)&&d++;let f=c.length?d/c.length:0;f>o&&f>=.5&&(o=f,i=r.a)}return i}async function pu(){let t=await C([qt,"profile"]),e=t[qt]||{},n=t.profile?.id?String(t.profile.id):null,i=n?e[n]:null;return i||(i=Object.values(e).find(o=>o?.loginId&&o?.loginPass)||null),i||{}}function as(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,i=Object.getOwnPropertyDescriptor(n,"value")?.set;i?i.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function Ht(t){return new Promise(e=>setTimeout(e,t))}function ht(t,e){return t+Math.random()*(e-t)}async function To(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await Ht(ht(250,600)),as(t,"");let i="";for(let o=0;o<n.length;o++){let r=n[o];i+=r,as(t,i),t.dispatchEvent(new KeyboardEvent("keydown",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:r,bubbles:!0}));let s=ht(90,220);/[\s@._]/.test(r)&&(s+=ht(120,320)),Math.random()<.08&&(s+=ht(200,450)),await Ht(s)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await Ht(ht(200,500))}var Xn=!1,Qn=!1;function Jn(t){return!t||t.disabled?!1:(t.click(),!0)}function hu(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let i of t){let o=(i.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(o))continue;let r=i.querySelector("input[type='checkbox']")||document.getElementById(i.getAttribute("for")||"");r&&!r.checked&&(Jn(r),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(i=>/^(continue|ok|accept|agree)$/i.test((i.textContent||i.value||"").trim()));return e&&n&&Jn(n),e>0}function cs(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function gu(t){if(Xn)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;Xn=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await To(e,t.loginId),await Ht(ht(400,900))),n&&t.loginPass&&!n.value&&(await To(n,t.loginPass),await Ht(ht(500,1100)));let i=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(o=>/sign in|log in|continue/i.test(o.textContent||o.value||""));return i&&(n?.value||t.loginPass)?(await Ht(ht(600,1400)),Jn(i),!0):!!(e||n)}finally{Xn=!1}}async function yu(t){if(Qn)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let o of n){let r=(o.textContent||"").trim();if(r.length<12||r.length>220||!/\?/.test(r)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(r))continue;let s=o.querySelector("input[type='text']")||document.getElementById(o.getAttribute("for")||"")||o.parentElement?.querySelector("input[type='text']");s&&s.offsetParent!==null&&e.push({text:r,input:s})}for(let o of["kba1_response","kba2_response","kba3_response"]){let r=document.getElementById(o);if(!r)continue;let c=(r.closest(".form-group, .entry, li, div")||r.parentElement)?.textContent||"";e.some(d=>d.input===r)||e.push({text:c,input:r})}let i=[];for(let{text:o,input:r}of e){if(r.value)continue;let s=mu(o,t.security);s&&i.push({input:r,ans:s})}if(!i.length)return!1;Qn=!0;try{for(let{input:r,ans:s}of i)await To(r,s),await Ht(ht(350,800));await Ht(ht(600,1400));let o=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(r=>/continue|submit|verify/i.test(r.textContent||r.value||""));return o&&Jn(o),!0}finally{Qn=!1}}function ls(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||H()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function gt(){return mt()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function bu(t=""){return/\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(t||""))}function _o(){if(gt()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||H()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}function wu(t){return!!(t?.loginId&&t?.loginPass)}function Su(){return ls()?!1:!!(cs()||document.querySelector("#kba1_response, #kba2_response, #kba3_response")||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))}async function xu(){let t=(await C(we))[we],e=!!t?.active,n=await pu();if(H()){await jn();return}if(hu(),ls()){e&&(await T({[we]:{...t,active:!1,doneAt:Date.now()}}),l.send({action:"recoveryReturnToOfc"}));return}Su()&&wu(n)&&await x("autofillLogin")&&(await yu(n)||(cs()||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))&&await gu(n))}function us(){if(!_o()||ns)return;let t=async()=>{l.alive&&await xu()};t(),ns=l.setInterval(t,1200)}function ds(){return is()+Math.random()*(uu()-is())}async function fs(){try{let t=await C(wo),e=Number(t[wo])||0;return Date.now()-e<du()?!1:(await T({[wo]:Date.now()}),!0)}catch{return!0}}function ms(){if(gt()||!_o()||document.querySelector("#post_select")||xo)return;let t=()=>{l.alive&&(xo=l.setTimeout(async()=>{if(xo=null,!l.alive||gt()||bu(location.href)||document.querySelector("#post_select")||!_o())return;if(Xn||Qn||Vn){t();return}if((await C(we))[we]?.active){t();return}if(!await fs()){t();return}try{$o()}catch{t()}},ds()))};t()}function ps(){if(!gt()||vo)return;let t=()=>{l.alive&&(vo=l.setTimeout(async()=>{if(vo=null,!(!l.alive||!gt())){if(await fs())try{l.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}t()}},ds()))};t()}async function vu(){try{let t=await C(So),e=Number(t[So])||0;return Date.now()-e<fu()?!1:(await T({[So]:Date.now()}),!0)}catch{return!0}}function hs(){if(!gt()||Yn)return;let t=async()=>{if(Yn=null,!(!l.alive||!gt())){try{if(zi()){if(Xe||(Xe=Date.now()),Date.now()-Xe>=os()){if(await vu()){try{k(`Date Loading stuck \u2265${os()/1e3}s \u2014 reloading Application Home\u2026`)}catch{}try{l.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}}Xe=Date.now()}}else Xe=0}catch{}l.alive&&gt()&&(Yn=l.setTimeout(t,es))}};Yn=l.setTimeout(t,es)}async function gs(t){let e=String(t||"");if(/form resubmission|information that you entered|action that you took to be repeated|returning to that page might cause/i.test(e)){if(!gt()&&!document.querySelector("#post_select")){try{sessionStorage.setItem(Co,"1")}catch{}l.setTimeout(()=>$o(),300)}return}if(!/PSE0501|unable to load appointment available days/i.test(e)||Vn)return;Vn=!0,l.setTimeout(()=>{Vn=!1},8e3);let n=await q();await T({[we]:{active:!0,ofcUrl:location.href,accountId:n,startedAt:Date.now()}}),l.send({action:"recoveryStart",ofcUrl:location.href})}var ti="humanClickProfile",Mo=150,Eo=120,Cu=250,ys=!1,bt=[],Zn=0,ot=0,Bt=0,E=null,Ao=0,Je=!1,Se=null,ei=0,ii=0,Ze=[],yt=!1,te=!1;function Tu(){let t=[];for(let e of document.querySelectorAll('iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]')){let n=e.getBoundingClientRect();n.width<40||n.height<20||n.width>900||n.height>400||t.push(n)}if(!t.length&&H())for(let e of document.querySelectorAll("iframe")){let n=e.getBoundingClientRect();n.width>=120&&n.width<=420&&n.height>=45&&n.height<=120&&t.push(n)}return t}function tn(){let t=Tu();if(!t.length)return null;let e=t[0];return{x:e.left+Math.min(28,Math.max(18,e.width*.11)),y:e.top+e.height/2,w:e.width,h:e.height,left:e.left,top:e.top}}function xe(t,e,n){return n?t>=n.left-40&&t<=n.left+n.w+40&&e>=n.top-30&&e<=n.top+n.h+30:!1}function xs(t){let e=performance.now();Zn||(Zn=e);let n=E,i=n?(t.clientX-n.x)/Math.max(24,n.w*.12):0,o=n?(t.clientY-n.y)/Math.max(20,n.h*.5):0;bt.push({nx:Math.round(i*1e3)/1e3,ny:Math.round(o*1e3)/1e3,x:Math.round(t.clientX),y:Math.round(t.clientY),t:Math.round(e-Zn)}),bt.length>Eo&&bt.shift()}async function oi(){return(await C(ti))[ti]||{version:2,maxSamples:Mo,samples:[],avgHoverMs:420,avgPressMs:70,avgApproachMs:800,liveTrained:!1}}function ko(t,e,n){if(!t.length)return n;let i=t.reduce((o,r)=>o+(Number(r[e])||0),0);return Math.round(i/t.length)}async function vs(t,{force:e=!1}={}){let n=Date.now();if(!e&&n-Ao<Cu)return null;Ao=n;let i=await oi(),o=Array.isArray(i.samples)?i.samples.slice():[];for(t.clientId||(t.clientId=`hc-${t.at||n}-${Math.random().toString(36).slice(2,10)}`),t.uploaded=!1,o.push(t);o.length>Mo;)o.shift();let r={version:2,maxSamples:Mo,samples:o,avgHoverMs:ko(o,"hoverMs",420),avgPressMs:ko(o,"pressMs",70),avgApproachMs:ko(o,"approachMs",800),updatedAt:n,liveTrained:!0,source:"visa-page-live"};return await T({[ti]:r}),ei=o.length,W("human",`saved sample locally #${o.length}`,{capture:t.capture||"page",pressMs:t.pressMs,hoverMs:t.hoverMs,pathPts:Array.isArray(t.path)?t.path.length:0,clientId:t.clientId}),Cs(t,r).catch(()=>{}),Ts().catch(()=>{}),r}async function _u(t){if(!t)return;let e=await oi(),n=Array.isArray(e.samples)?e.samples.slice():[],i=!1;for(let o of n)o?.clientId===t&&!o.uploaded&&(o.uploaded=!0,i=!0);i&&await T({[ti]:{...e,samples:n,updatedAt:Date.now()}})}async function Cs(t,e){try{if(!await x("serverSync"))return W("upload","skipped \u2014 serverSync is OFF"),!1;let n=await G()||{},i=t.clientId||`hc-${t.at||Date.now()}-${Math.random().toString(36).slice(2,8)}`;t.clientId=i;let o={client_id:i,profile:{id:n.id||"",email:n.email||"",name:n.name||"",visa:n.visa||""},sample:t,profile_meta:{sampleCount:e?.samples?.length||0,avgHoverMs:e?.avgHoverMs,avgPressMs:e?.avgPressMs,avgApproachMs:e?.avgApproachMs,liveTrained:!0,source:"visa-page-live",extensionHost:location.host}};W("upload",`sending sample ${i}`,{sampleCount:e?.samples?.length||0,email:n.email||""}),l.send({action:"uploadHumanClickSample",payload:o});try{chrome.runtime.sendMessage({action:"uploadHumanClickSample",payload:o},r=>{if(chrome.runtime.lastError){W("upload",`SW error: ${chrome.runtime.lastError.message}`);return}r?.success?(W("upload",`server OK id=${r.id??"?"} status=${r.status??""}`,{clientId:i}),_u(i)):W("upload",`server FAIL ${r?.error||r?.status||"unknown"}`,{clientId:i})})}catch(r){W("upload",`sendMessage threw: ${r?.message||r}`)}return!0}catch(n){return W("upload",`upload threw: ${n?.message||n}`),!1}}async function Ts(){try{if(!await x("serverSync"))return;let t=await oi(),n=(Array.isArray(t.samples)?t.samples:[]).filter(i=>i&&i.uploaded!==!0).slice(-40);for(let i of n)await Cs(i,t),await new Promise(o=>setTimeout(o,80))}catch{}}function _s(t,e={}){let n=performance.now(),i=Math.max(25,Math.min(500,ot?n-ot:70)),o=Math.max(30,Math.min(3e3,ot?ot-(Bt||ot):200)),r=(bt.length?bt:Ze).slice(-Eo),s=r.length?r[r.length-1].t:o,c=Math.max(o,Math.min(12e3,s||o)),d=Se,f=E||tn();return{hoverMs:Math.round(o),pressMs:Math.round(i),approachMs:Math.round(c),path:r,down:d?{x:Math.round(d.x),y:Math.round(d.y)}:null,up:t?{x:Math.round(t.clientX),y:Math.round(t.clientY)}:d?{x:Math.round(d.x),y:Math.round(d.y)}:f?{x:Math.round(f.x),y:Math.round(f.y)}:null,target:f?{x:Math.round(f.x),y:Math.round(f.y),w:Math.round(f.w),h:Math.round(f.h),left:Math.round(f.left),top:Math.round(f.top)}:null,viewport:{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio||1,scrollX:Math.round(window.scrollX||0),scrollY:Math.round(window.scrollY||0)},pointerType:t?.pointerType||"mouse",url:location.pathname+location.search,at:Date.now(),...e}}function Qe(){bt.length&&(Ze=bt.slice(-Eo)),bt=[],Zn=0,ot=0,Bt=0,Se=null}function Io(){Je||(Je=!0,te=!0,Qe(),E=tn())}function Do(){Je=!1,E=null,yt=!1,Qe()}function ni(t){let e=t?.target;if(!e)return!1;if(e.closest?.(".cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]"))return!0;if(e.tagName==="IFRAME"){let n=(e.src||"").toLowerCase();if(n.includes("challenges.cloudflare")||n.includes("turnstile"))return!0;let i=e.getBoundingClientRect();if(i.width>=120&&i.width<=420&&i.height>=45&&i.height<=120)return!0}return!1}async function bs(t){if(l.alive){if(!H()||Q()){Je&&Do();return}Io(),E||(E=tn()),!Bt&&E&&xe(t.clientX,t.clientY,E)&&(Bt=performance.now()),E&&xe(t.clientX,t.clientY,E)&&(ii=Date.now()),xs(t)}}async function ws(t){if(!(!l.alive||t.button!==0)&&!(!H()||Q())){Io(),E=tn(),ot=performance.now(),Bt||(Bt=ot),Se={x:t.clientX,y:t.clientY},xs(t),(ni(t)||E&&xe(t.clientX,t.clientY,E))&&(yt=!0,ii=Date.now()),W("human","pointer down during challenge",{onWidget:ni(t),near:!!(!E||xe(t.clientX,t.clientY,E)),x:Math.round(t.clientX),y:Math.round(t.clientY)});try{N("scanning",`Recording click\u2026 (saved ${ei} so far)`)}catch{}}}async function Ss(t){if(!l.alive||t.button!==0||!ot&&!yt)return;if(!H()&&!Q()){Qe();return}if(!(E&&xe(t.clientX,t.clientY,E)||E&&Se&&xe(Se.x,Se.y,E)||ni(t)||yt||!E&&(bt.length>=2||Ze.length>=2))&&bt.length<2&&Ze.length<2){Qe();return}let n=_s(t,{capture:yt||ni(t)?"iframe-or-widget":"page"});yt=!1,Qe();let i=await vs(n);if(!i)return;let o=i.samples?.length||0;try{N("success",`Saved verify-human click #${o} \u2014 uploaded to server`)}catch{}}async function $u(){let t=Date.now();if(!te||!Q()&&H())return;if(!(yt||t-ii<8e3||Ze.length>=2&&t-Ao>500)){te=!1,Do();return}let n=_s(null,{capture:"challenge-solved"});yt=!1,te=!1,Do();let i=await vs(n,{force:!0});if(!i)return;let o=i.samples?.length||0;try{N("success",`Saved verify-human click #${o} (after checkbox) \u2014 uploaded to server`)}catch{}}async function ku(){try{let t=await oi(),e=t.liveTrained&&t.samples?.length||0;return ei=e,e}catch{return ei}}function $s(){if(ys)return;ys=!0,W("human","train watcher started",{path:location.pathname}),l.on(window,"pointermove",bs,{passive:!0,capture:!0}),l.on(window,"pointerdown",ws,{passive:!0,capture:!0}),l.on(window,"pointerup",Ss,{passive:!0,capture:!0}),l.on(window,"mousemove",bs,{passive:!0,capture:!0}),l.on(window,"mousedown",ws,{passive:!0,capture:!0}),l.on(window,"mouseup",Ss,{passive:!0,capture:!0}),l.on(window,"blur",()=>{!H()||Q()||(yt=!0,ii=Date.now(),ot||(ot=performance.now(),Bt||(Bt=ot)),W("human","page blur during challenge (likely iframe click)"))});let t=async()=>{if(!l.alive)return;if(H()&&!Q()){te||W("human","challenge detected \u2014 recording armed"),te=!0,Io(),E||(E=tn());let n=await ku();try{N("scanning",n?`Train mode \u2014 click Verify you are human naturally (saved ${n})`:"Train mode \u2014 move mouse naturally, then click Verify you are human (recording\u2026)")}catch{}return}(te||Je||yt)&&await $u()};t(),l.setInterval(t,1200),l.setTimeout(()=>{W("upload","flushing unsynced local samples\u2026"),Ts().catch(()=>{})},2500)}var Mu=`
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
  position: relative;
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
#${a.aiPanel} .${u.aiDateBtn} {
  width: 100%;
  min-height: 46px;
  padding: 10px 12px;
  border: 2px solid #3b82f6;
  border-radius: 10px;
  background: #fff;
  color: #111827;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;
}
#${a.aiPanel} .${u.aiDateBtn}:hover {
  border-color: #2563eb;
  background: #eff6ff;
}
#${a.aiCal} {
  position: fixed;
  z-index: 2147483646;
  width: min(100vw - 16px, 340px);
  padding: 14px;
  background: #fff;
  border: 1.5px solid #111827;
  border-radius: 12px;
  box-shadow: 0 10px 28px rgba(0,0,0,0.18);
  box-sizing: border-box;
  pointer-events: auto;
}
#${a.aiCal}.${u.hidden} { display: none !important; }
#${a.aiCal} .${u.aiCalHead} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
}
#${a.aiCal} .${u.aiCalHead} .${u.aiHead} {
  font-size: 17px;
  margin: 0;
  flex: 1;
  text-align: center;
}
#${a.aiCal} .${u.aiCalHead} button {
  min-width: 40px;
  min-height: 40px;
  padding: 0;
  background: #eef2ff;
  color: #1e40af;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
}
#${a.aiCal} .${u.aiCalGrid} {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}
#${a.aiCal} .${u.aiCalGrid} .${u.aiHint} {
  margin: 0;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: #6b7280;
  padding: 4px 0;
  pointer-events: none;
}
#${a.aiCal} .${u.aiCalDay} {
  min-height: 42px;
  padding: 0;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #111827;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}
#${a.aiCal} .${u.aiCalDay}:hover {
  background: #eff6ff;
  border-color: #93c5fd;
}
#${a.aiCal} .${u.aiCalDay}.${u.aiCalMuted} {
  color: #9ca3af;
  font-weight: 500;
  background: #f9fafb;
}
#${a.aiCal} .${u.aiCalDay}:disabled,
#${a.aiCal} .${u.aiCalDay}[aria-disabled="true"] {
  opacity: 0.4;
  cursor: not-allowed;
  background: #f3f4f6;
  color: #9ca3af;
  pointer-events: none;
}
#${a.aiCal} .${u.aiCalDay}.${u.aiCalToday} {
  border-color: #3b82f6;
}
#${a.aiCal} .${u.aiCalDay}.${u.aiCalOn} {
  background: #3b82f6;
  border-color: #2563eb;
  color: #fff;
}
#${a.aiCal} .${u.aiRow} {
  margin: 12px 0 0;
  justify-content: space-between;
}
#${a.aiCal} .${u.aiRow} button {
  background: #eef0f3;
  color: #111827;
  min-height: 40px;
  font-size: 14.5px;
  cursor: pointer;
}
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
  animation: ${m}cfpulse 1.6s ease-out infinite;
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
@keyframes ${m}cfpulse {
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
  animation: ${m}cfring 1.1s ease-out forwards;
}
@keyframes ${m}cfring {
  0% { transform: scale(0.6); opacity: 1; }
  100% { transform: scale(2.2); opacity: 0; }
}
`;function ks(){if(document.querySelector(p(a.styles)))return;let t=document.createElement("style");t.id=a.styles,t.dataset[$.mark]="",t.textContent=Mu,(document.head||document.documentElement).appendChild(t)}jo();ao();Po(()=>{Da(),l.destroy()});nr();Xa();_()&&q().then(t=>{if(t)return En(t);fe()}).catch(()=>fe());if(!_()){l.disposable(()=>{let i=document.querySelector(p(a.anchor)),o=document.querySelector("#post_select");i&&o&&i.replaceWith(o);for(let r of document.querySelectorAll("[data-"+$.mark+"]"))r.remove()}),ks(),l.send({action:"registerBlockGuard",prefix:m}),l.send({action:"registerRedirect",prefix:m}),l.send({action:"registerAlertGuard",prefix:m}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&l.send({action:"registerOfcReader",prefix:m}),l.on(window,"message",i=>{if(l.alive&&i.source===window)switch(i.data?.action){case Et.req:return Ka(i);case Et.res:return Ua(i);case Et.ofc:return $r(i);case Et.err:return qe("native_alert",i.data?.text),Be(String(i.data?.text||"alert").slice(0,120)),gs(i.data?.text);case Et.sub:Sr(),Pe(),Rr(),it().then(o=>{Ke(o?.accountId||null)}).catch(()=>{Ke(null)});return}}),chrome.storage.onChanged.addListener((i,o)=>{o==="local"&&(i.profile&&xi(),i.waitPillClock&&br(i.waitPillClock.newValue),i.autoCloudflareTick&&(i.autoCloudflareTick.newValue?bo():yo()))}),l.on(document,"click",i=>{ce();let o=i.target.closest(p(a.waitTime));if(o){if(o.dataset.skipClick){delete o.dataset.skipClick;return}yr()}}),l.on(document,"keydown",ce),l.on(window,"focus",()=>ce({keepConsular:!0})),l.on(document,"visibilitychange",()=>{document.hidden||ce({keepConsular:!0})}),xr(),ss(),us(),ms(),ps(),hs(),$s(),bo();async function t(){!l.alive||_()||!mt()||document.querySelector("#post_select")&&(pt(),await Promise.all([yi(),wi(),so()]),Hr({slotIndex:Pn,shouldPick:async()=>await it()?!0:!!await x("autoSelectFirstDate"),onSlotPicked:()=>Ea()}))}async function e(){!l.alive||_()||!mt()||await Aa()}async function n(){Xo(),Jo(),await Promise.all([xi(),tr(),Zo(),yi(),wi(),so()]),ci()}document.readyState==="complete"?n():l.on(window,"load",n),l.setInterval(t,2500),l.setInterval(e,3e4),e()}})();
