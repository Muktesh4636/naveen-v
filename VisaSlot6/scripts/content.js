(()=>{function K(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function T(t){return K()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,i]of Object.entries(t))e[n]=i;return e}):Promise.resolve(typeof t=="string"?{}:t)}function $(t){return K()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function Ho(t){return K()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function Bo(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",i=>{String(i.reason?.message||i.reason||"").includes("Extension context invalidated")&&(i.preventDefault(),e())});let n=setInterval(()=>{K()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var Ft="https://the.gopg.online",li=`${Ft}/contribute`,Fo=`${Ft}/contribute/telegram`,Wu=`${Ft}/contribute/human-click`,en=`${Ft}/contribute/tik-tik-prefs`,Uo=`${Ft}/contribute/tik-tik-coord`;var Ko=20,Go=4320*60*1e3,nn=100,zo=4,on=100,jo=240,Yo=50,Vo=1440*60*1e3,qs={recheckButton:!1,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function x(t){return T({[t]:qs[t]}).then(e=>e[t])}function St(){return T({posts:[]}).then(t=>t.posts)}function ee(t){return $({posts:t})}function G(){return T("profile").then(t=>t.profile)}var Ut=t=>String(t).padStart(2,"0");function ve(t){let e=Ut(t%60),n=Math.floor(t/60)%60,i=Math.floor(t/3600);return i?`${Ut(i)}:${Ut(n)}:${e}`:`${Ut(n)}:${e}`}function Xo(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${Ut(n.getUTCHours())}:${Ut(n.getUTCMinutes())}:${Ut(n.getUTCSeconds())}`}}function ui(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),i=t%60,o=[];return e>0&&o.push(`${e}d`),(n>0||e>0)&&o.push(`${n}h`),o.push(`${i}m`),o.join(" ")}function Qo(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),i=o=>n.find(r=>r.type===o)?.value??"";return`${i("month")} ${i("day")} ${i("year")} ${i("hour")}:${i("minute")} ${i("dayPeriod")}`}function Jo(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),i=parseInt(e[2],10),o=parseInt(e[3],10),r=e[4];r&&(r.toUpperCase()==="PM"&&n<12&&(n+=12),r.toUpperCase()==="AM"&&n===12&&(n=0));let a=new Date;return a.setHours(n,i,o,0),a.getTime()>Date.now()+6e4&&a.setDate(a.getDate()-1),a}var Zo=Symbol(),Rs=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&K()}on(t,e,n,i){t.addEventListener(e,n,{...i,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!K())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=zo,interval:n=nn}={}){return new Promise(i=>{let o=r=>{if(!this.alive)return;let a=document.querySelector(t);if(a)return i(a);if(r>=e)return i(null);this.setTimeout(()=>o(r+1),n)};o(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},l=new Rs;function tr(){let t=globalThis[Zo];Object.defineProperty(globalThis,Zo,{value:l,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var rn=new Uint32Array(2);crypto.getRandomValues(rn);var er="abcdefghjkmnpqrstuvwxyz",Os=(rn[0].toString(36)+rn[1].toString(36)).replace(/[^a-z0-9]/g,""),m=(er[rn[0]%er.length]+Os).slice(0,8).padEnd(8,"x");function p(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var s={selRow:m+"01",anchor:m+"02",waitTime:m+"03",recheck:m+"04",histCont:m+"05",histTbl:m+"06",cdCard:m+"07",cdTime:m+"08",ofcDate:m+"09",styles:m+"10",datesCont:m+"11",datesPara:m+"12",slotsTbl:m+"12b",aiBtn:m+"13",aiPanel:m+"14",aiFrom:m+"15",aiTo:m+"16",aiStatus:m+"17",aiConfirm:m+"18",aiCancel:m+"19",aiClose:m+"20",aiCities:m+"21",aiSubmitBtn:m+"22",aiCitiesBtn:m+"23",aiLogin:m+"24",aiPass:m+"25",aiQ1:m+"26",aiA1:m+"27",aiQ2:m+"28",aiA2:m+"29",aiQ3:m+"30",aiA3:m+"31",aiSaveLogin:m+"32",cfHud:m+"33",aiCitiesAll:m+"34",aiCitiesNone:m+"35",aiLoginToggle:m+"36",aiLoginBody:m+"37",aiSubmitOn:m+"38",aiSubmitOff:m+"39",aiCitiesOn:m+"40",aiCitiesOff:m+"41",aiWinList:m+"42",aiWinAdd:m+"43",aiWinSave:m+"44",aiWinReset:m+"45",aiWinNote:m+"46",aiSubmitSw:m+"47",aiCitiesSw:m+"48",aiInfoBox:m+"49",aiWarnBox:m+"50",aiOkBox:m+"51",aiWinCard:m+"52",aiSubmitBody:m+"53",aiCitiesBody:m+"54",aiTerms:m+"55",aiTermsAgree:m+"56",aiTermsGate:m+"57",aiMain:m+"58",aiTermsContinue:m+"59",aiFromBtn:m+"60",aiToBtn:m+"61",aiCal:m+"62"},u={pill:m+"a",pillTtl:m+"b",pillTmr:m+"c",pillWait:m+"d",pillDone:m+"e",footer:m+"f",card:m+"g",cardTtl:m+"h",histScrl:m+"i",dltDn:m+"j",dltUp:m+"k",cdDiv:m+"l",hidden:m+"m",sideLink:m+"n",datesLnk:m+"o",slotsSum:m+"o2",slotsTbl:m+"o3",aiOn:m+"p",aiRow:m+"q",aiHint:m+"r",aiCities:m+"s",aiOnBtn:m+"t",aiCityAct:m+"x",cfHud:m+"u",cfPulse:m+"v",cfFlash:m+"w",aiEn:m+"y",aiDis:m+"z",aiWinRow:m+"aa",aiFeat:m+"ab",aiSwitch:m+"ac",aiKnob:m+"ad",aiSec:m+"ae",aiInfo:m+"af",aiWarn:m+"ag",aiOk:m+"ah",aiTrash:m+"ai",aiWinHelp:m+"aj",aiInline:m+"ak",aiHead:m+"al",aiTerms:m+"am",aiTermsCb:m+"an",aiTermsList:m+"ao",aiContinue:m+"ap",aiDateBtn:m+"aq",aiCal:m+"ar",aiCalHead:m+"as",aiCalGrid:m+"at",aiCalDay:m+"au",aiCalMuted:m+"av",aiCalOn:m+"aw",aiCalToday:m+"ax"},M={mark:m,w:m+"w",mw:m+"mw"},Et={req:m+"q",res:m+"r",ofc:m+"o",err:m+"e",sub:m+"s"};function an(t){return t.map(e=>String.fromCharCode(e)).join("")}function Ns(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function nr(){let t=document.createElement("div");return t.className=u.footer,t.textContent=an([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function Ws(t){let e=document.getElementById(s.histCont);e&&e.remove(),e=document.createElement("div"),e.id=s.histCont,e.className=u.card,e.dataset[M.mark]="";let n=document.createElement("h4");n.className=u.cardTtl,n.textContent=an([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let i=document.createElement("div");i.className=u.histScrl;let o=document.createElement("table");o.id=s.histTbl;let r=document.createElement("thead"),a=document.createElement("tr");for(let f of["Time","Est. Wait","Change"]){let h=document.createElement("th");h.textContent=f,a.appendChild(h)}r.appendChild(a),o.appendChild(r);let c=document.createElement("tbody");for(let f=t.length-1;f>=0;f--){let h=t[f],g="--",y="";if(f>0){let _=h.minutes-t[f-1].minutes;_<0?(g=`${_}m`,y=u.dltDn):_>0?(g=`+${_}m`,y=u.dltUp):g="0m"}let S=document.createElement("tr"),C=[[h.timeStr,""],[ui(h.minutes),""],[g,y]];for(let[_,N]of C){let v=document.createElement("td");N&&(v.className=N),v.textContent=_,S.appendChild(v)}c.appendChild(S)}o.appendChild(c),i.appendChild(o),e.appendChild(i),e.appendChild(nr());let d=document.getElementById("last-updated");d&&(d.closest("div, p, section")||d.parentElement).insertAdjacentElement("afterend",e)}function Hs(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function ir(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),i=Hs();if(i!==null&&i>jo&&!e.textContent.includes("(")){let a=ui(i);e.textContent=`${e.textContent} (${i} minutes / ${a})`}let o=n.textContent.trim().split(" (")[0],r=Jo(o);if(r&&l.setInterval(()=>{let a=Math.floor((Date.now()-r)/1e3);a>=0&&(n.textContent=`${o} (${a}s ago)`)},1e3),i!==null){let a=Ns(),c=sessionStorage.getItem(a);c||(c=Math.random().toString(36).substring(2,11),sessionStorage.setItem(a,c)),T({queueHistory:{}}).then(d=>{let f=d.queueHistory||{},h=Date.now(),g={};for(let[_,N]of Object.entries(f)){if(!Array.isArray(N))continue;let v=N[N.length-1];v&&h-v.timestamp<Vo&&(g[_]=N)}let y=g[c]||[],S=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),C=y[y.length-1];(!C||C.minutes!==i||C.timeStr!==S)&&(y.push({timestamp:h,timeStr:S,minutes:i}),y.length>Yo&&y.shift(),g[c]=y,$({queueHistory:g})),Ws(y)})}}function or(t,e){let n=document.getElementById("error_row");if(!n)return;let i;t?i=e?`Blocked for 24 hours, about ${ve(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":i="Temporarily blocked. Log in in a new tab, then refresh this page.";let o=document.createElement("div");o.className="atlas_validationalert alert alert-danger warning",o.dataset[M.mark]="",o.textContent=i,n.replaceChildren(o),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function rr(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&T({cfRetryAfter:null}).then(n=>{let i=parseInt(n.cfRetryAfter,10);if(!isNaN(i)){Ho("cfRetryAfter");let o=document.getElementById("what-happened-section");if(o){let r=document.createElement("div");r.id=s.cdCard,r.className=u.card,r.dataset[M.mark]="";let a=document.createElement("h4");a.className=u.cardTtl,a.textContent=an([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),r.appendChild(a);let c=document.createElement("div");c.id=s.cdTime,r.appendChild(c);let d=document.createElement("div");d.className=u.cdDiv,r.appendChild(d),r.appendChild(nr()),o.appendChild(r);let f=i,h=null,g=()=>{f>0?(c.textContent=ve(f),f--):(c.classList.add(u.cdDiv+"-over"),c.textContent="You can try refreshing now!",h!=null&&l.clear(h))};g(),h=l.setInterval(g,1e3)}}})}async function ar(){let t=document.querySelector(".username");if(!t)return;let n=(t.innerText||"").trim().match(/^(.*)\((\d+)\)\s*$/);if(!n)return;let[,i,o]=n,r=await G()||{},a=!r.id||r.id===o||String(r.id).includes(o)?r:{};a.name=i.trim(),a.id=o;let c=document.querySelectorAll("script");for(let d of c){let f=d.innerText.trim();if(f.includes("setAuthenticatedUserContext")){let h=/setAuthenticatedUserContext\('([^']*)'\)/,g=f.match(h);g&&(a.email=g[1])}}await $({profile:a})}async function sr(){let t=document.querySelector("#post_select");if(!t)return;let e=await St();for(let n of t.options){if(!n.value)continue;e.findIndex(o=>o.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await ee(e)}var Bs=["visa-information","fee-payment","appointment-confirmation"];function Fs(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(i=>{let o=i.querySelector(".text-bold");if(!o)return;let r=Us(o.textContent);if(!Bs.includes(r))return;let a=Ks(i);a&&(n[r]=a)}),Object.keys(n).length?n:null}function Us(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Ks(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function ne(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>Go)return null}catch{}return t.value}function Gs(t){let e=(t.posts||[]).filter(o=>o.Updated).sort((o,r)=>o.Updated-r.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},i=ne(t.cgiIdToken);return i&&(n.token=i),n}async function di(){if(!K()||!await x("serverSync"))return;let t=await T(["profile","posts","cgiIdToken"]),e=Gs(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await fetch(li,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(o=>o.json());if(!n.success)return;let i="0";n.contribs>0&&(i=n.contribs.toString()),n.contribs>10&&(i="10+"),n.contribs>0&&await $({contribs:{email:t.profile?.email,updated:Date.now(),count:i}})}catch{}}function fi(t=0){K()&&document.querySelector("#appointment-card")&&x("serverSync").then(e=>{if(!e)return;let n=Fs();if(!n){t<Ko&&l.setTimeout(()=>fi(t+1),nn);return}T(["profile","cgiIdToken","savedDashboard"]).then(i=>{let o=ne(i.cgiIdToken);o&&JSON.stringify(n)!==JSON.stringify(i.savedDashboard)&&fetch(li,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:i.profile,dashboard:n,token:o})}).then(r=>r.json()).then(r=>{r.success&&$({savedDashboard:n})}).catch(()=>{})})})}var zs=`${Ft}/extension-runtime-config.json`,pi="vsRuntimeConfig",js=300*1e3,mi=0,Ce=null,w={slotWindowLabel:":14\u2013:21, :24\u2013:31, :54\u2013:02",slotWindows:[{slot:1,fromMin:0,toMin:2},{slot:2,fromMin:14,toMin:21},{slot:3,fromMin:24,toMin:31},{slot:4,fromMin:54,toMin:59}],windowStartsMin:[0,14,24,54],cityLoadingMaxMs:18e4,cityCalendarNoDatesMs:2e4,cityRotateMinGapMs:13e3,cityRotateMaxGapMs:18e3,cityHoldMaxMs:45e3,homeKeepaliveMinMs:6e5,homeKeepaliveMaxMs:6e5,homeKeepaliveDebounceMs:48e4,loadingStuckMs:12e4,loadingStuckDebounceMs:9e4,remoteVersion:0,source:"bundled"};function Y(t,e,n,i){let o=Number(t);return Number.isFinite(o)?Math.min(n,Math.max(e,Math.round(o))):i}function Ys(t){if(!Array.isArray(t)||!t.length||t.length>24)return null;let e=[];for(let n of t){let i=Y(n?.fromMin,0,59,NaN),o=Y(n?.toMin,0,59,NaN);if(!Number.isFinite(i)||!Number.isFinite(o)||i>o)return null;let r=Y(n?.slot,1,12,1);e.push({slot:r,fromMin:i,toMin:o})}return e}function Vs(t){let e=[...new Set(t.map(n=>n.fromMin))].sort((n,i)=>n-i);return e.length?e:w.windowStartsMin.slice()}function cr(t,e="remote"){if(!t||typeof t!="object")return!1;let n=Ys(t.slotWindows);if(n){w.slotWindows.length=0;for(let i of n)w.slotWindows.push(i);w.windowStartsMin=Vs(n)}return typeof t.slotWindowLabel=="string"&&t.slotWindowLabel.length<120&&(w.slotWindowLabel=t.slotWindowLabel),w.cityLoadingMaxMs=Y(t.cityLoadingMaxMs,1e4,3e5,w.cityLoadingMaxMs),w.cityCalendarNoDatesMs=Y(t.cityCalendarNoDatesMs,5e3,12e4,w.cityCalendarNoDatesMs),w.cityRotateMinGapMs=Y(t.cityRotateMinGapMs,5e3,6e4,w.cityRotateMinGapMs),w.cityRotateMaxGapMs=Y(t.cityRotateMaxGapMs,w.cityRotateMinGapMs,9e4,Math.max(w.cityRotateMinGapMs,w.cityRotateMaxGapMs)),w.cityHoldMaxMs=Y(t.cityHoldMaxMs,1e4,18e4,w.cityHoldMaxMs),w.homeKeepaliveMinMs=Y(t.homeKeepaliveMinMs,12e4,18e5,w.homeKeepaliveMinMs),w.homeKeepaliveMaxMs=Y(t.homeKeepaliveMaxMs,w.homeKeepaliveMinMs,18e5,Math.max(w.homeKeepaliveMinMs,w.homeKeepaliveMaxMs)),w.homeKeepaliveDebounceMs=Y(t.homeKeepaliveDebounceMs,6e4,18e5,w.homeKeepaliveDebounceMs),w.loadingStuckMs=Y(t.loadingStuckMs,3e4,6e5,w.loadingStuckMs),w.loadingStuckDebounceMs=Y(t.loadingStuckDebounceMs,3e4,6e5,w.loadingStuckDebounceMs),w.remoteVersion=Y(t.version,0,1e9,w.remoteVersion),w.source=e,!0}async function Xs(){try{let e=(await T(pi))[pi];e?.config&&cr(e.config,"cache")}catch{}}async function Qs(t){try{await $({[pi]:{config:t,fetchedAt:Date.now()}})}catch{}}async function Js({force:t=!1}={}){let e=Date.now();if(!t&&e-mi<js)return w;if(Ce)return Ce;Ce=(async()=>{await Xs();try{let n=await fetch(zs,{method:"GET",cache:"no-store",signal:AbortSignal.timeout(8e3)});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.json();if(!i||typeof i!="object"||Array.isArray(i))throw new Error("bad json");if(i.script||i.code||i.eval)throw new Error("unsafe keys");cr(i,"remote"),await Qs(i),mi=Date.now()}catch{mi=Date.now()}return w})();try{return await Ce}finally{Ce=null}}function lr(){Js().catch(()=>{})}var It=null,Te=null;function ur(){return It||w.slotWindows}function dt(){return Te||(It?.length?dr(It):w.slotWindowLabel)}var sd=w.slotWindows,xt=4,Pt=6;function dr(t){return t?.length?t.map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", "):w.slotWindowLabel}function hi(t){if(!Array.isArray(t))return[];let e=[];for(let n of t){if(e.length>=xt)break;let i=Number(n?.fromMin),o=Number(n?.durationMin??n?.duration);if(!Number.isFinite(i)||i<0||i>59)continue;let r=Math.min(Pt,59-i);if(r<1)continue;if(!Number.isFinite(o)||o<1){let c=Number(n?.toMin);if(!Number.isFinite(c)||c<i||c>59||(o=Math.min(r,c-i),o<1))continue}o=Math.min(r,Math.max(1,Math.round(o)));let a=Math.min(59,i+o);e.push({slot:e.length+1,fromMin:Math.round(i),toMin:a,durationMin:o})}return e}function fr(t){let e=hi(t||[]);return e.length?(It=e.map(({slot:n,fromMin:i,toMin:o})=>({slot:n,fromMin:i,toMin:o})),Te=dr(It),It):(It=null,Te=null,null)}function gi(){It=null,Te=null}function mr(t){let e=t?.length?t:w.slotWindows,n=[];for(let i of e||[]){if(n.length>=xt)break;let o=Number(i.fromMin),r=Number(i.toMin);if(!Number.isFinite(o)||!Number.isFinite(r)||r<o||o===0&&r<=2&&(e||[]).some(d=>Number(d.fromMin)>=54))continue;let a=Math.min(Pt,59-o);if(a<1)continue;let c=Math.min(a,Math.max(1,r-o));n.push({fromMin:o,durationMin:c})}return n}function pr(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=i=>Number(e.find(o=>o.type===i)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function ie(t=new Date){let{minute:e}=pr(t),n=ur();for(let i of n)if(e>=i.fromMin&&e<=i.toMin)return i.slot;return 0}function _e(t=new Date){if(ie(t))return 0;let{minute:e,second:n}=pr(t),i=e*60+n,o=ur(),r=[...new Set(o.map(c=>c.fromMin))].sort((c,d)=>c-d);for(let c of r){let d=c*60;if(i<d)return(d-i)*1e3}let a=r[0]??0;return(3600-i+a*60)*1e3}function yi(t){return t<9e4?`${Math.ceil(t/1e3)}s`:`${Math.ceil(t/6e4)}m`}function xr(){let t=document.querySelector(p(s.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=s.selRow,t.dataset[M.mark]="",n.insertAdjacentElement("afterend",t);let i=document.createElement("span");return i.id=s.anchor,i.dataset[M.mark]="",i.dataset[M.w]=e.style.width,i.dataset[M.mw]=e.style.minWidth,i.hidden=!0,e.insertAdjacentElement("beforebegin",i),l.setStyle(e,"width","100%"),l.setStyle(e,"minWidth","0"),t.appendChild(e),t}var $e="waitPillState",Zs=3600*1e3,hr=u.pillWait,tc=u.pillDone;function ec(t,e){let n=document.createElement("span");n.className=`${u.pill} ${e}`;let i=(o,r)=>{let a=document.createElement("span");a.className=o,a.textContent=r,n.appendChild(a)};return i(u.pillTtl,t.title),t.timer!==void 0&&i(u.pillTmr,t.timer),n}function nc(t,e=Date.now()){if(t.kind==="waiting")return{variant:hr};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:hr}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:tc}}return null}function ic(t,e,n=new Date){let i=Xo(n);return t.seconds===void 0?{title:i}:{title:i,timer:ve(t.seconds)}}var oc=class{#t=null;#e={kind:"idle"};#i=null;#n=null;#o=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get($e))[$e];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>Zs){chrome.storage.local.remove($e);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#o=t,this.#r(),this.#c()}toggleClockMode(){l.alive&&(this.setClockMode(!this.#o),chrome.storage.local.set({waitPillClock:this.#o}))}render(t){return nc(this.#e,t)}#l(t){return ic(t,this.#o,new Date)}#r(){if(this.#t??=ac(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(u.hidden);return}this.#t.classList.remove(u.hidden),this.#t.replaceChildren(ec(this.#l(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#i&&(l.clear(this.#i),this.#i=null),t.kind==="running"?(chrome.storage.local.set({[$e]:t}),this.#i=l.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove($e),this.#r(),this.#c()}#u(){this.#r(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,x("audioAlert").then(t=>{t&&yc()})))}#c(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=l.setInterval(()=>this.#r(),1e3):!t&&this.#n&&(l.clear(this.#n),this.#n=null)}},se=new oc,Ee="pillPosition",gr=4;function yr(t,e,n){return Math.max(e,Math.min(n,t))}function vr(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,i=e.height>0?e.height:36;return{w:n,h:i}}function oe(t,e,n){let{w:i,h:o}=vr(t),r=yr(e,0,Math.max(0,window.innerWidth-i)),a=yr(n,0,Math.max(0,window.innerHeight-o));return t.style.setProperty("left",r+"px","important"),t.style.setProperty("top",a+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:r,top:a}}function rc(t){var e=!1,n=!1,i=0,o=0,r=0,a=0;function c(f){if(e){var h=f.touches?f.touches[0]:f,g=h.clientX-i,y=h.clientY-o;!n&&Math.abs(g)<gr&&Math.abs(y)<gr||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",oe(t,r+g,a+y),f.cancelable&&f.preventDefault())}}function d(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",d),document.removeEventListener("touchmove",c),document.removeEventListener("touchend",d),n){let f=t.getBoundingClientRect();chrome.storage.local.set({[Ee]:{top:Math.round(f.top),left:Math.round(f.left)}})}n=!1}}t.addEventListener("mousedown",function(f){if(f.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let h=t.getBoundingClientRect();i=f.clientX,o=f.clientY,r=h.left,a=h.top,oe(t,h.left,h.top),document.addEventListener("mousemove",c),document.addEventListener("mouseup",d),f.preventDefault(),f.stopPropagation()}),t.addEventListener("touchstart",function(f){e=!0,n=!1,delete t.dataset.skipClick;let h=t.getBoundingClientRect();i=f.touches[0].clientX,o=f.touches[0].clientY,r=h.left,a=h.top,oe(t,h.left,h.top),document.addEventListener("touchmove",c,{passive:!1}),document.addEventListener("touchend",d)},{passive:!0})}function ac(){let t=document.querySelector(p(s.waitTime));return t||(t=document.createElement("div"),t.id=s.waitTime,t.className=u.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),rc(t),chrome.storage.local.get(Ee).then(e=>{let n=e[Ee];n&&typeof n.top=="number"&&typeof n.left=="number"&&oe(t,n.left,n.top)}),uc(t),t)}function br(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function sc(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function cc(t){let{w:e,h:n}=vr(t),i=12;return[{left:i,top:i},{left:Math.max(i,window.innerWidth-e-i),top:i},{left:i,top:Math.max(i,window.innerHeight-n-i)},{left:Math.max(i,window.innerWidth-e-i),top:Math.max(i,window.innerHeight-n-i)}]}async function lc(){let e=(await chrome.storage.local.get(Ee))[Ee];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function uc(t){let e=!1,n=async()=>{if(!l.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(u.hidden))return;let i=sc(),o=!!(i&&i.offsetParent!==null&&i.getBoundingClientRect().height>20),r=t.getBoundingClientRect();if(o&&br(r,i.getBoundingClientRect())){let a=i.getBoundingClientRect(),c=cc(t),d=c.find(f=>{let h={left:f.left,top:f.top,right:f.left+r.width,bottom:f.top+r.height};return!br(h,a)})||c[2];e=!0,t.setAttribute("data-dodging",""),oe(t,d.left,d.top);return}if(e&&!o){e=!1,t.removeAttribute("data-dodging");let a=await lc();a&&oe(t,a.left,a.top)}else o||t.removeAttribute("data-dodging")};l.setInterval(n,400),l.on(window,"resize",n)}async function xi(){if(!l.alive||!await x("defaultWaitTime")||!await l.waitFor("#post_select",{attempts:on}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});se.setClockMode(t),await se.restore()}async function Cr(){await x("defaultWaitTime")&&se.waiting()}async function pn(t){await x("defaultWaitTime")&&se.run(t)}function Tr(){se.toggleClockMode()}function _r(t){se.setClockMode(t)}var ke=null,Me=null,sn=null;function vi(){return sn||(sn=new(window.AudioContext||window.webkitAudioContext),l.disposable(()=>sn?.close())),sn}async function hn(t=150){try{let e=vi();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let o=e.currentTime,r=t/1e3;i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(.1,o+.01),i.gain.setValueAtTime(.1,o+Math.max(.01,r-.02)),i.gain.linearRampToValueAtTime(0,o+r),n.start(),n.stop(o+r)}catch(e){console.error("Audio beep failed:",e)}}function dc(t,e=125,n=125){let i=0,o=()=>{i>=t||(hn(e),i++,l.setTimeout(o,e+n))};o()}var bi=4,wr=50,Sr=50,fc=600;function $r(){if(Me)return;let t=()=>{dc(bi,wr,Sr);let e=bi*wr+(bi-1)*Sr;Me=l.setTimeout(t,e+fc)};t()}var mc=250,pc=10,hc=300,gc=1e3;function yc(){if(ke)return;let t=[];for(let o=0;o<=hc;o+=pc)t.push(o);let e=Date.now(),n=0,i=()=>{let o=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&o>=t[n];){let r=n===t.length-1;hn(r?gc:mc),n++}if(n<t.length){let r=t[n],a=e+r*1e3,c=Math.max(0,a-Date.now());ke=l.setTimeout(i,c)}else ce()};i()}function ce(t={}){let e=!!t.keepConsular;ke&&(l.clear(ke),ke=null),Me&&(l.clear(Me),Me=null),wi(),e||Si()}var cn=null,ln=null,re=null,un=null,Ae=null;async function kr(){wi();try{let t=vi();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=880,i.frequency.value=1320,o.gain.value=.85,r.gain.value=.65,n.connect(o).connect(e),i.connect(r).connect(e);let a=t.createOscillator(),c=t.createGain();a.type="triangle",a.frequency.value=3.2,c.gain.value=280,a.connect(c),c.connect(n.frequency),c.connect(i.frequency);let d=t.currentTime;n.start(d),i.start(d),a.start(d),re={osc1:n,osc2:i,lfo:a,master:e};let f=()=>{re&&(hn(500),ln=l.setTimeout(f,1800))};f(),cn=l.setTimeout(wi,12e4),Ae=document.title;let h=!1,g=()=>{re&&(document.title=h?Ae:"!!! SUBMIT CLICKED !!!",h=!h,un=l.setTimeout(g,450))};g()}catch(t){console.error("Submit alarm failed:",t)}}function wi(){if(cn&&(l.clear(cn),cn=null),ln&&(l.clear(ln),ln=null),un&&(l.clear(un),un=null),Ae&&(document.title=Ae,Ae=null),re){try{let{osc1:t,osc2:e,lfo:n}=re;t.stop(),e.stop(),n.stop()}catch{}re=null}}function bc(){let t=location.pathname||"";return/\/ofc-schedule\b/i.test(t)?!1:/\/(schedule|c-schedule)\b/i.test(t)}var wc=6e4,dn=null,fn=null,mn=null,De=null,ae=null;async function Sc(){Si();try{let t=vi();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=980,i.frequency.value=1470,o.gain.value=.95,r.gain.value=.8,n.connect(o).connect(e),i.connect(r).connect(e);let a=t.createOscillator(),c=t.createGain();a.type="square",a.frequency.value=4,c.gain.value=320,a.connect(c),c.connect(n.frequency),c.connect(i.frequency);let d=t.currentTime;n.start(d),i.start(d),a.start(d),ae={osc1:n,osc2:i,lfo:a,master:e};let f=()=>{ae&&(hn(650),fn=l.setTimeout(f,900))};f(),dn=l.setTimeout(Si,wc),De=document.title;let h=!1,g=()=>{ae&&(document.title=h?De:"!!! OFC BOOKED \u2014 CONSULAR PAGE !!!",h=!h,mn=l.setTimeout(g,400))};g()}catch(t){console.error("Consular OFC alarm failed:",t)}}function Si(){if(dn&&(l.clear(dn),dn=null),fn&&(l.clear(fn),fn=null),mn&&(l.clear(mn),mn=null),De&&(document.title=De,De=null),ae){try{let{osc1:t,osc2:e,lfo:n}=ae;t.stop(),e.stop(),n.stop()}catch{}ae=null}}function Mr(){if(bc()){try{let t="vsConsularOfcBeep";if(sessionStorage.getItem(t)==="1")return;sessionStorage.setItem(t,"1")}catch{}Sc()}}function xc(){document.querySelector(p(s.recheck))?.remove();for(let t of document.querySelectorAll("button"))(t.textContent||"").trim()==="Recheck"&&t.remove()}async function Ci(){l.alive&&xc()}async function _i(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await l.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let i=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(c=>c.innerText.trim()===i))continue;let r=document.createElement("li");r.className="usa-sidenav__item",r.dataset[M.mark]="";let a=document.createElement("a");a.href=n.link,a.className=u.sideLink,a.target="_self",a.textContent=n.text,r.appendChild(a),t.appendChild(r)}}function E(t,e,n){let i=document.createElement(t);return e&&(i.className=e),n?.appendChild(i),i}function gn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,r]=n;return`${r}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return null}function Ti(t){let e=gn(t);if(!e)return String(t||"");let[n,i,o]=e.split("-").map(Number);if(!n||!i||!o)return e;try{return new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(new Date(n,i-1,o))}catch{return e}}function vc(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);if(n)return n[1].slice(0,5);let i=e.match(/^(\d{1,2}:\d{2})/);return i?i[1]:e}function Ar(t){let e=document.querySelector(p(s.datesCont));if(e){let o=e.querySelector(p(s.datesPara)),r=e.querySelector("h2");if(r&&t&&(r.textContent=t),o)return{container:e,details:o}}let n=document.querySelector("#page_form");if(!n)return null;e?.remove();let i=Cc(t||"");return n.appendChild(i.container),i}function Dr(t){if(t.response.HasError)return;let e=document.querySelector("#post_select"),n=e?.options[e.selectedIndex]?.text??"",i=(t.response.ScheduleDays||[]).map(f=>gn(f?.Date)).filter(Boolean).sort((f,h)=>f.localeCompare(h));document.querySelector(p(s.datesCont))?.remove();let o=Ar(n);if(!o)return;let{details:r}=o;r.replaceChildren();let a=E("div",u.slotsSum,r);if(!i.length){a.textContent="No slots available";return}a.textContent=`${i.length} date${i.length===1?"":"s"} available`;let c={};for(let f of i){let h=f.slice(0,7);(c[h]||=[]).push(f)}for(let[f,h]of Object.entries(c)){let g=E("div",null,r),y=document.createElement("strong");y.textContent=f,g.append(y,`: ${h.map(S=>S.slice(8,10)).join(", ")}`)}let d=E("div",null,r);d.style.marginTop="0.5em";for(let f of i){let h=E("div",null,d);h.textContent=`\u2022 ${Ti(f)} (${f})`}}function Er(t,e,n){let i=document.querySelector("#post_select"),o=n||i?.options[i.selectedIndex]?.text||"",r=gn(e)||gn(t?.[0]?.Date)||"",a=(t||[]).filter(v=>v&&v.Time).map(v=>({time:vc(v.Time),avail:v.EntriesAvailable!=null&&Number.isFinite(Number(v.EntriesAvailable))?Number(v.EntriesAvailable):null,raw:v})).sort((v,et)=>String(v.time).localeCompare(String(et.time))),c=Ar(o);if(!c)return;let{details:d}=c;d.replaceChildren();let f=E("div",u.slotsSum,d);if(!a.length){f.textContent=r?`No time slots on ${Ti(r)}`:"No time slots available";return}let h=a.filter(v=>v.avail==null||v.avail>0),g=h.reduce((v,et)=>v+(et.avail||0),0),y=r?Ti(r):"selected date";if(f.textContent=g>0?`${h.length} time slot${h.length===1?"":"s"} on ${y} \xB7 ${g} available`:`${a.length} time slot${a.length===1?"":"s"} on ${y}`,r){let v=E("div",null,d);v.style.margin="0.35em 0 0.6em",v.textContent=`Date: ${y} (${r})`}let S=E("table",u.slotsTbl,d);S.id=s.slotsTbl;let C=E("thead",null,S),_=E("tr",null,C);for(let v of["Time","Availability"]){let et=E("th",null,_);et.textContent=v}let N=E("tbody",null,S);for(let v of a){let et=E("tr",null,N);v.avail===0&&(et.style.opacity="0.55");let ci=E("td",null,et);ci.textContent=v.time;let Ls=E("td",null,et);Ls.textContent=v.avail==null?"\u2014":String(v.avail)}}function Cc(t){let e=E("div","row");e.id=s.datesCont;let n=E("div","col-sm-12 atlas_section mt-3",e),i=E("div","col-sm-12 atlas_section_header_row",E("div","row",n));E("h2",null,i).textContent=t;let o=E("div",null,E("div","col-sm-12",E("div","row",n)));return o.id=s.datesPara,{container:e,details:o}}var Ir=null;function Tc(){let t=document.querySelector(p(s.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return l.setStyle(n,"display","flex"),l.setStyle(n,"alignItems","center"),l.setStyle(n,"justifyContent","flex-end"),l.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=s.ofcDate,t.dataset[M.mark]="",e.insertAdjacentElement("beforebegin",t),t}function _c(){if(!location.pathname.includes("/schedule"))return;let t=Ir;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=Tc();n&&(n.textContent=`OFC (Estimate): ${Qo(e.appointmentDateStr)}`)}function Pr(t){chrome.runtime?.id&&(Ir=t.data.data,l.waitFor("#submitbtn").then(e=>{e&&_c()}))}var yn=new Map,Lr=45e3,bn=new Map,qr=8e3,Rr=0;function wn(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function Sn(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function $c(t,e){return`${t}:${e.slice(0,5).join(",")}`}function kc(t){let e=Date.now(),n=yn.get(t);if(n&&e-n<Lr)return!1;yn.set(t,e);for(let[i,o]of yn)e-o>Lr*4&&yn.delete(i);return!0}function Mc(t){let e=Date.now(),n=bn.get(t);if(n&&e-n<qr)return!1;bn.set(t,e);for(let[i,o]of bn)e-o>qr*6&&bn.delete(i);return!0}async function Or(){return await x("telegramViaServer")!==!1}async function Nr(t,{kind:e="alert",dedupKey:n="",skipDedup:i=!1,notifyMuktesh:o=!0}={}){if(t&&await Or())try{await fetch(Fo,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:i,notify_muktesh:o}),signal:AbortSignal.timeout(2e4)})}catch{}}function Ac(t,{kind:e="screen",dedupKey:n="",waitMs:i=0,skipDedup:o=!1,notifyMuktesh:r=!0}={}){l.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:i,skipDedup:o,notifyMuktesh:r,captureScreenshot:!0})}async function Dc(t,e,n){let i=wn(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&r.push(`\u{1FAAA} <b>Visa:</b> ${n}`),r.push(`\u{1F550} <b>Checked:</b> ${o} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),r.push(`\u{1F4C6} <b>Dates (${i.length}):</b>`,"");for(let a of i.slice(0,30))r.push(`\u{1F7E2} <b>${Sn(a)}</b>`);return i.length>30&&r.push("",`\u2795 <i>+${i.length-30} more dates</i>`),r.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),r.join(`
`)}function Ec(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",i=document.querySelector("#datepicker")?.value||"\u2014",r=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:i,time:r}}async function Wr(t,{postId:e,postName:n,hasError:i}={}){if(i||!t?.length)return;let o=wn(t);if(!o.length||!await x("telegramAlert"))return;let r=$c(e||n||"unknown",o);if(!kc(r))return;let a=await G(),c=await Dc(n,t,a?.visa||"");await Nr(c,{kind:"slots",dedupKey:r,notifyMuktesh:!0})}function Ic(t,e,n){let i=wn(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`;if(i.length){let a=i.slice(0,5).map(c=>Sn(c)).join(", ");return`<b>DATES AVAILABLE</b>
\u{1F3DB}\uFE0F ${r}
\u{1F4C6} ${i.length} date(s)
${a}${i.length>5?"\u2026":""}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}return`<b>City changed \u2014 no dates</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}function Pc(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=e?Sn(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${i}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function Lc(t,e,n){let i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?Sn(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u23F0 ${n} slot(s)
\u{1F550} ${i} IST
\u{1F4F2} Visa Slot 6`}async function le(t,{kind:e="screen",dedupKey:n,waitMs:i=0,skipDedup:o=!1}={}){if(await x("telegramScreenshots")===!1||!await Or())return;let r=n||`${e}:${String(t).slice(0,80)}`;!o&&!Mc(r)||Ac(t,{kind:e,dedupKey:r,waitMs:i,skipDedup:o,notifyMuktesh:!0})}async function Hr(t,{postId:e,postName:n,hasError:i}={}){let o=Ic(n,t,i),r=wn(t),a=r.length?"dates":"city";await le(o,{kind:a,dedupKey:`${a}:${e||n}:${r.length}:${i?1:0}`,waitMs:r.length?1400:900})}async function Br(t,e){await le(Pc(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function Fr(t,e,n){await le(Lc(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function Ur(){let t=Date.now();if(t-Rr<8e3)return;Rr=t;let e=await G(),{city:n,date:i,time:o}=Ec(),r=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),a=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${i}`,`\u23F0 <b>Time:</b> ${o}`];e?.email&&a.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&a.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),a.push(`\u{1F550} <b>When:</b> ${r} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let c=a.join(`
`);await Nr(c,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await le(c,{kind:"submit",skipDedup:!0,waitMs:200})}var vn=25;function Cn(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Mi(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let i=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,i),n-1)}function Kr(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function Gr(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function Di(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function $i(t){if(t)try{t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}}function xn(t){if(t)try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}}function Ai(t){if(!t||t.disabled)return!1;try{if(t.tagName==="SELECT")return!t.value||t.value==="0"?!1:($i(t),t.value&&t.value!=="0"?!0:(xn(t),!!(t.value&&t.value!=="0")));if(t.type==="radio"||t.type==="checkbox"){if(t.name)for(let i of document.getElementsByName(t.name))i!==t&&(i.checked=!1);if(t.checked=!0,$i(t),t.checked)return!0;let e=t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,n=t.closest("tr");for(let i of[e,t.closest("label"),t,n].filter(Boolean))xn(i);return t.checked=!0,$i(t),t.checked===!0}xn(t)}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function zr(){let t=new Set,e=[],n=i=>{if(!i||t.has(i)||Di(i)||i.disabled)return;let o=i.closest("tr");o&&Gr(o)||(t.add(i),e.push(i))};for(let i of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let o of document.querySelectorAll(`${i}:not([disabled])`))n(o);return e}function qc(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!Kr(n)||Gr(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function Rc(t,e){for(let n of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(n.tagName!=="SELECT"||n.disabled||Di(n))continue;let i=[...n.options].filter(a=>!a.disabled&&a.value&&a.value!=="0"&&Kr({textContent:a.textContent}));if(!i.length)continue;let o=null,r=Cn(e);if(r&&r!=="00:00"&&(o=i.find(a=>(a.textContent||"").includes(r))||null,!o)){let a=r.match(/(\d{1,2}:\d{2})/);a&&(o=i.find(c=>(c.textContent||"").includes(a[1]))||null)}if(!o){let a=Mi(i.length,t);o=i[a]}if(o&&(n.value=o.value,Ai(n)))return!0}return!1}function Oc(t,e){if(Rc(t,e))return!0;let n=zr();if(n.length){let o=null,r=Cn(e);if(r&&r!=="00:00"&&(o=n.find(a=>{let c=(a.closest("tr")?.textContent||a.textContent||"").replace(/\s+/g," ");return c.includes(r)||c.includes(r.slice(0,5))})||null),!o){let a=Mi(n.length,t);o=n[a]}if(o&&Ai(o))return!0}let i=qc();if(i.length){let o=null,r=Cn(e);if(r&&r!=="00:00"&&(o=i.find(d=>(d.textContent||"").includes(r))||null),!o){let d=Mi(i.length,t);o=i[d]}if(!o)return!1;let a=o.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(a&&Ai(a))return!0;let c=o.querySelector("label");if(c)return xn(c),!!o.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function V(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!Di(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function Nc({slotIndex:t=0,maxMs:e=12e3,pollMs:n=vn,time:i,onTick:o}={}){let r=Date.now()+e,a=Math.max(10,n||25);return new Promise(c=>{let d=()=>{if(!l.alive)return c(!1);if(o?.(),Oc(t,i)||V())return c(!0);if(Date.now()>=r)return c(!1);l.setTimeout(d,a)};d()})}function Ie({time:t,date:e,slotIndex:n,pollMs:i,maxMs:o}){let r=n??0,a=o||15e3,c=i||vn;return l.send({action:"forcePickTimeSlot",slotIndex:r,maxMs:a,pollMs:c}),l.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:r,pollMs:c,domWaitMs:0,maxMs:a}),Nc({slotIndex:r,maxMs:a,pollMs:c,time:t||"00:00"})}var ki=!1;function jr({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(ki)return;ki=!0;let i=!1,o=async()=>{if(!(!l.alive||i)){if(V()){n?.();return}try{if(t&&!await t())return}catch{return}zr().length&&(i=!0,await Ie({slotIndex:e,time:"00:00",maxMs:800,pollMs:vn}),i=!1,V()&&n?.())}};l.setInterval(o,vn);let r=document.querySelector("#page_form")||document.body,a=new MutationObserver(()=>o());a.observe(r,{childList:!0,subtree:!0}),l.disposable(()=>{a.disconnect(),ki=!1})}function Yr(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let i=Cn(n?.Time);if(!i)continue;let o=i.match(/(\d{1,2}):(\d{2})/);if(!o)continue;let[,r,a]=o;if(e.includes(`${r}:${a}`)||e.includes(`${parseInt(r,10)}:${a}`))return!0}return!1}var Tn="submitErrors",Vr=50,Wc=45e3,Qr=0,Ei=new Set,Pe=null,Jr=null;function Zr(t){Jr=typeof t=="function"?t:null}function Hc(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",i=document.querySelector("#datepicker")?.value||"";return{city:e,date:i,url:location.href}}function Le(){Qr=Date.now()+Wc,Ei.clear(),zc()}function _n(){return Date.now()<Qr}function Bc(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function Fc(t){let e=await T({[Tn]:[]}),n=Array.isArray(e[Tn])?e[Tn]:[];n.push(t),n.length>Vr&&n.splice(0,n.length-Vr),await $({[Tn]:n})}function Xr(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function Uc(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${Xr(t.source)}`,`\u{1F4AC} <b>Message:</b> ${Xr(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let i=n.join(`
`);await le(i,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function qe(t,e,n={}){let i=String(e||"").trim();if(!i||!_n()&&!n.force)return;let o=Bc(t,i);if(Ei.has(o))return;Ei.add(o);let r=Hc(),a=await G(),c={at:Date.now(),source:String(t||"unknown"),message:i.slice(0,2e3),city:n.city||r.city,date:n.date||r.date,url:n.url||r.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:a?.email||""};await Fc(c);try{await Uc(c)}catch{}try{Jr?.(c)}catch{}}function Kc(t){if(!_n())return;let e=t?.status,n=t?.retryAfter,i=t?.cgiBlock,o=`Request failed (HTTP ${e||"?"})`;n!=null&&(o+=` \u2014 retry after ${n}s`),i&&(o+=" \u2014 CGI access limitation"),qe("ajax_error",o,{status:e})}function ta(t){if(!_n()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){Kc({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",o=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";qe("ajax_response",o,{route:t.tail||""})}var Gc=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function zc(){Pe&&l.clear(Pe);let t=()=>{if(!l.alive||!_n()){Pe=null;return}for(let e of Gc)for(let n of document.querySelectorAll(e)){let i=(n.textContent||"").replace(/\s+/g," ").trim();!i||i.length<4||qe("page_validation",i)}Pe=l.setTimeout(t,600)};Pe=l.setTimeout(t,500)}var Re=0,ea="",na=0;async function jc(){let[t,e]=await Promise.all([G(),T(["cgiIdToken"])]),n=ne(e.cgiIdToken);return{profile:t,token:n}}async function ia(t){if(!K()||!await x("serverSync"))return null;let{profile:e,token:n}=await jc();if(!e?.id&&!e?.email)return null;try{let i={...t,profile:e};n&&(i.token=n);let o=await fetch(Uo,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}).then(r=>r.json());return o&&o.success?o:null}catch{return null}}async function oa({postId:t,postName:e,dayCount:n}={}){let i=String(t||"").trim(),o=Number(n)||0;if(!i||o<1)return null;let r=`${i}:${o}`,a=Date.now();if(r===ea&&a-na<1500)return null;ea=r,na=a;let c=await ia({action:"alert",city:{id:i,name:String(e||i).trim()},dayCount:o});return c?.alertId&&(Re=Math.max(Re,Number(c.alertId)||0)),c}async function ra({preferredCities:t=[],citiesEnabled:e=!1,currentCityId:n=""}={}){if(!e||!t?.length)return null;let o=(await ia({action:"poll",preferredCities:t,citiesEnabled:!0,currentCityId:String(n||""),lastAlertId:Re}))?.forceCity;return!o?.id||!o?.alertId?null:o}function $n(t){let e=Number(t)||0;e>Re&&(Re=e)}var Yc=["cities","from","to","submitEnabled","citiesEnabled","enabled","slotWindows","termsAgreed","termsPassed","termsAgreedAt"];function aa(t){if(!t||typeof t!="object")return{};let e={};for(let n of Yc)n in t&&(e[n]=t[n]);return typeof e.submitEnabled!="boolean"&&typeof e.enabled=="boolean"&&(e.submitEnabled=e.enabled),delete e.enabled,e}function sa(t,e){if(!e||typeof e!="object")return t||null;let n=t&&typeof t=="object"?{...t}:{},i=Number(n.serverUpdatedAt)||0,o=Number(e.updatedAt)||0;if(o&&i&&o<i)return n;let r=aa(e),a={...n,...r};return typeof r.submitEnabled=="boolean"&&(a.enabled=r.submitEnabled),e.updatedAt&&(a.serverUpdatedAt=e.updatedAt),a}async function ca(){let[t,e]=await Promise.all([G(),T(["cgiIdToken"])]),n=ne(e.cgiIdToken);return{profile:t,token:n}}async function la(t){if(!K()||!await x("serverSync"))return!1;let e=aa(t);if(!Object.keys(e).length)return!1;let{profile:n,token:i}=await ca();if(!n?.id&&!n?.email)return!1;try{let o={profile:n,prefs:e};i&&(o.token=i);let r=await fetch(en,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(a=>a.json());return!!(r&&r.success)}catch{return!1}}async function ua(){if(!K()||!await x("serverSync"))return null;let{profile:t,token:e}=await ca();if(!t?.id&&!t?.email)return null;try{let n=new URLSearchParams;t.id&&n.set("applicant_id",String(t.id)),t.email&&n.set("email",String(t.email));let i=await fetch(`${en}?${n.toString()}`,{method:"GET",headers:{Accept:"application/json"}}).then(r=>r.json());if(i?.prefs)return i.prefs;let o={profile:t};return e&&(o.token=e),i=await fetch(en,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(r=>r.json()),i?.prefs||null}catch{return null}}var qt="aiSubmitByAccount",pe=8e3;var j=25;var Ln=0,We=1e4,Ma=1e3;function he(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}function zi(){return w.cityRotateMinGapMs}function Vc(){return w.cityRotateMaxGapMs}function He(){return w.cityHoldMaxMs}function Ct(){return w.cityLoadingMaxMs}function Kt(){return w.cityCalendarNoDatesMs}var da=5e3,qi=2e4,Xc=15e3;function pt(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function ji(){return/\/ofc-schedule\b/i.test(location.pathname)}function k(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var Qc=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function Mn(t,e){let n=Qc[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(o=>{let r=e===o?" selected":"";return`<option value="${o.replace(/"/g,"&quot;")}"${r}>${o}</option>`}).join("")}function ue(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function Xt(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function Jc(t,e,n){return`${t}-${String(e+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`}function Zc(t){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(t))return null;let[e,n,i]=t.split("-").map(Number),o=new Date(e,n-1,i);return o.getFullYear()!==e||o.getMonth()!==n-1||o.getDate()!==i?null:o}function Yi(){for(let t of["from","to"]){let e=document.querySelector(p(t==="from"?s.aiFrom:s.aiTo)),n=document.querySelector(p(t==="from"?s.aiFromBtn:s.aiToBtn));if(!n)continue;let i=e?.value||"";n.textContent=i?Xt(i):"Select date"}}function Ii(t,e){let n=document.querySelector(p(t==="from"?s.aiFrom:s.aiTo));if(n&&(n.value=e||""),t==="from"){let i=document.querySelector(p(s.aiTo));i&&e&&i.value&&i.value<e&&(i.value="")}Yi()}var J={y:0,m0:0,which:"from"};function Rt(){document.querySelector(p(s.aiCal))?.classList.add(u.hidden)}function Vi(t){let e=t.target;return e?e.nodeType===3?e.parentElement:e:null}function Ri(){let t=document.querySelector(p(s.aiCal));if(!t)return;let{y:e,m0:n,which:i}=J,o=document.querySelector(p(i==="from"?s.aiFrom:s.aiTo))?.value||"",r=ue(),a=i==="to"&&document.querySelector(p(s.aiFrom))?.value||ue(),c=new Date(e,n,1).toLocaleDateString("en-IN",{month:"long",year:"numeric"}),d=new Date(e,n,1).getDay(),f=new Date(e,n+1,0).getDate(),h=new Date(e,n,0).getDate(),g="";for(let y of["S","M","T","W","T","F","S"])g+=`<div class="${u.aiHint}">${y}</div>`;for(let y=0;y<42;y++){let S,C=e,_=n,N=!1;y<d?(S=h-d+y+1,_=n-1,_<0&&(_=11,C=e-1),N=!0):y>=d+f?(S=y-d-f+1,_=n+1,_>11&&(_=0,C=e+1),N=!0):S=y-d+1;let v=Jc(C,_,S),et=v<a,ci=[u.aiCalDay,N?u.aiCalMuted:"",et?u.aiCalMuted:"",v===r?u.aiCalToday:"",v===o?u.aiCalOn:""].filter(Boolean).join(" ");g+=`<button type="button" class="${ci}" data-iso="${v}" ${et?'disabled aria-disabled="true"':""}>${S}</button>`}t.innerHTML=`
    <div class="${u.aiCalHead}">
      <button type="button" data-cal="prev" aria-label="Previous month">\u2039</button>
      <div class="${u.aiHead}">${c}</div>
      <button type="button" data-cal="next" aria-label="Next month">\u203A</button>
    </div>
    <div class="${u.aiCalGrid}">${g}</div>
    <div class="${u.aiRow}">
      <button type="button" data-cal="clear">Clear</button>
      <button type="button" data-cal="today">Today</button>
    </div>
  `}function tl(t){let e=document.querySelector(p(s.aiCal)),i=Vi(t)?.closest?.("button");if(!e||!i||!e.contains(i))return;t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation();let o=i.getAttribute("data-cal"),r=J.which,a=r==="to"&&document.querySelector(p(s.aiFrom))?.value||ue();if(o==="prev"){J.m0-=1,J.m0<0&&(J.m0=11,J.y-=1),Ri();return}if(o==="next"){J.m0+=1,J.m0>11&&(J.m0=0,J.y+=1),Ri();return}if(o==="clear"){Ii(r,""),Rt();return}if(o==="today"){let d=ue();d>=a&&(Ii(r,d),Rt(),ka());return}if(i.disabled||i.getAttribute("aria-disabled")==="true")return;let c=i.getAttribute("data-iso");!c||c<a||(Ii(r,c),Rt(),ka())}function fa(t){let e=document.querySelector(p(s.aiCal));if(!e||!t)return;let n=t.getBoundingClientRect(),i=Math.min(340,window.innerWidth-16),o=e.offsetHeight||360,r=Math.max(8,Math.min(n.left,window.innerWidth-i-8)),a=n.bottom+6;a+o>window.innerHeight-8&&n.top-6-o>=8?a=n.top-6-o:a=Math.max(8,Math.min(a,window.innerHeight-o-8)),e.style.position="fixed",e.style.top=`${Math.round(a)}px`,e.style.left=`${Math.round(r)}px`,e.style.width=`${i}px`,e.style.right="auto",e.style.bottom="auto"}function ma(t,e){let n=document.querySelector(p(s.aiCal));n||(n=document.createElement("div"),n.id=s.aiCal,n.className=`${u.aiCal} ${u.hidden}`,n.dataset[M.mark]="",document.body.appendChild(n),l.on(n,"pointerdown",tl,{capture:!0}),l.on(n,"click",r=>{n.contains(Vi(r))&&(r.preventDefault(),r.stopPropagation())},{capture:!0}));let i=document.querySelector(p(t==="from"?s.aiFrom:s.aiTo))?.value,o=Zc(i)||new Date;J={y:o.getFullYear(),m0:o.getMonth(),which:t},Ri(),n.classList.remove(u.hidden),fa(e),requestAnimationFrame(()=>fa(e))}function Wt(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function Ot(t){return!!(t&&t.citiesEnabled)}async function R(){let t=await G();return t?.id?String(t.id):null}async function H(t){return t&&((await T(qt))[qt]||{})[t]||null}async function Xi(t,e){if(!t)return;let i=(await T(qt))[qt]||{};e==null?delete i[t]:i[t]=e,await $({[qt]:i})}var O=!1;function Ue(){return O}function me(){O=!0,Nt(),Ne()}function ht(){O=!1,L=!1,Nt()}async function En(t){Aa(),me();let e=await H(t);if(!e){it();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await Xi(t,e),it()}var Z=!1,Gt=null,Lt=null,pa=2e4,In=new Set,Oi="",Ni="";function Aa(){Z=!1,Gt&&(l.clear(Gt),Gt=null),Lt&&(l.clear(Lt),Lt=null)}function qn(){In.clear(),Oi=""}function el(t){let e=String(t||"").slice(0,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(e))return;let n=String(document.querySelector("#post_select")?.value||"");n!==Oi&&(In.clear(),Oi=n),In.add(e)}function Rn(t){let e=String(t||"").slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(e)&&(Ni=e)}function nl(){let t=document.querySelector("#datepicker"),e=String(t?.value||"").trim();if(!e)return Ni||"";if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,r]=n;return`${r}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return Ni||""}async function ha(){if(O||k()||!pt())return!1;let t=await ot();if(!t)return!1;let e=document.querySelector("#post_select"),n=e?String(e.value):"";if(!n)return!1;let i=nl();i&&el(i);let r=(await St()).find(g=>String(g.ID)===n),c=On(r?.Days||[],t.from,t.to).filter(g=>!In.has(String(g.Date).slice(0,10)));if(!c.length)return!1;let d=he(c.length),f=c[d];if(!f?.Date)return!1;let h=String(f.Date).slice(0,10);return Rn(h),ut(),ht(),b(`Submit failed \u2014 trying next date #${d+1} (${h}) (${c.length} left in range)\u2026`),D(`Submit failed \u2014 next date ${h} (${c.length} left)\u2026`),l.send({action:"selectFirstDate",date:h,maxMs:pe,pollMs:j}),!0}async function Ke(t){if(k()||ga()){t?await En(t):me(),b("Booking confirmed \u2014 Tik Tik stopped.");return}Z=!0,ut(),Le(),b("Submit clicked \u2014 waiting for confirmation (Auto Submit + City Change stay ON)\u2026"),Lt&&l.clear(Lt);let e=Date.now(),n=async()=>{if(Lt=null,!(!Z||!l.alive)){if(ga()||k()){let i=t||await R();i?await En(i):me(),b("Booking confirmed \u2014 Tik Tik stopped.");return}if(Date.now()-e>=pa){await Be("no confirmation yet \u2014 resuming city checks");return}Lt=l.setTimeout(n,400)}};Lt=l.setTimeout(n,400),Gt&&l.clear(Gt),Gt=l.setTimeout(()=>{Gt=null,Z&&Be("submit wait timed out \u2014 resuming city checks")},pa)}function ga(){if(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))return!0;let t=(document.body?.innerText||"").slice(0,2500);return/appointment\s+confirmation|successfully\s+scheduled|your\s+appointment\s+has\s+been/i.test(t)}async function Be(t=""){if(!Z&&!I&&!L){if(await ha())return;lt();return}Aa(),L=!1,Nt(),O&&ht();let e=t?`Submit failed (${t})`:"Submit failed";if(await ha()){b(`${e} \u2014 staying on city; trying another date\u2026`);return}if(qn(),lt(),b(`${e} \u2014 no other dates in range; hopping cities\u2026`),q)X(Date.now()),A();else{let i=await R();if(i){let o=await H(i);Ot(o)&&await Fn()}}}function Ge(){return Z}function ze(t,e,n){let i=String(t||"").slice(0,10);return!(!i||i.length<10||e&&i<e||n&&i>n)}async function ot(){if(O||k()||!pt())return null;let t=await R();if(!t)return null;let e=await H(t);return!Wt(e)||!e.from||!e.to?null:{...e,accountId:t}}async function Qt(){if(O||k()||!pt())return null;let t=await R();if(!t)return null;let e=await H(t);return!Ot(e)||!e.cities?.length?null:(Wa(e),{...e,accountId:t})}function On(t,e,n){let i=new Date;return i.setHours(0,0,0,0),(t||[]).map(o=>{if(!o)return null;let r=o.Date!=null?o.Date:o.date,a=il(r);return a?{...o,Date:a}:null}).filter(Boolean).filter(o=>ze(o.Date,e,n)).filter(o=>{let[r,a,c]=o.Date.slice(0,10).split("-").map(Number);return new Date(r,a-1,c)>=i}).sort((o,r)=>String(o.Date).localeCompare(String(r.Date)))}function il(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,r,a]=n;return`${a}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime()))return`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}-${String(o.getDate()).padStart(2,"0")}`}return null}var L=!1,Tt=null,_t=null,st=!1,$t=0,q=!1,z=0,tt=0,de=0,Yt=0,ge=!1,ft=null,vt=0,I=!1,W=0,fe=null,zt=null,kt=0,ya=!1,Pi="",Oe="",Qi=0,ba="",wa=!1,Wi=0;function ol(t){return(t||[]).map(e=>e.id).join("")}function rl(){let t=document.querySelector(p(s.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function Sa(t){let e=document.querySelector(p(s.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function Nt(){Tt&&(l.clear(Tt),Tt=null),L=!1}function At(){fe&&(l.clear(fe),fe=null)}function Da(){At(),W||(W=Date.now());let t=Math.max(500,He()-(Date.now()-W));fe=l.setTimeout(()=>{fe=null,!(!I||!q||!l.alive)&&(I=!1,W=0,X(Date.now()),b(`City Change \u2014 booking hold timed out (${He()/1e3}s); next city in 13\u201318s\u2026`),A())},t)}function al(){zt&&(l.clear(zt),zt=null)}function Nn(t=Date.now()){let e=!1;if(st&&$t&&t-$t>=Xc&&(st=!1,$t=0,e=!0),I&&(W||(W=t),t-W>=He()?(At(),I=!1,W=0,e=!0):fe||Da()),ge){vt||(vt=t);let i=Hi()?Ct():Kt();if(t-vt>=i)nt(),e=!0;else if(!ft){let o=Math.max(500,i-(t-vt));ft=l.setTimeout(()=>{if(ft=null,!q||I)return;let r=Hi(),a=r?Ct():Kt();if(Date.now()-(vt||0)<a){Nn();return}nt(),X(Date.now()),b(r?`City Change \u2014 still Loading after ${Ct()/1e3}s; changing city\u2026`:`City Change \u2014 calendar up but no dates after ${Kt()/1e3}s; changing city\u2026`),A()},o)}}return L&&!Tt&&(L=!1,e=!0),e}function Ea(){if(zt||!q)return;let t=()=>{if(zt=null,!q||!l.alive||O)return;let e=Date.now(),n=Nn(e),i=!!ie(new Date(e)),o=!!_t,r=!i&&o||ge||I||L||Z,a=!r&&kt>0&&e-kt>=qi;if(n||a||!o&&!st&&!r)a?(st=!1,$t=0,nt(),!I&&!Z&&(At(),W=0),L&&!Tt&&(L=!1),z=e,b(i?"City Change \u2014 unstuck; hopping now\u2026":`City Change \u2014 unstuck; waiting for IST window ${dt()}\u2026`)):n?(!I&&!Z&&(z=e),b(i?"City Change \u2014 lock cleared; hopping now\u2026":`City Change \u2014 lock cleared; next IST window ${dt()}\u2026`)):b("City Change \u2014 timer lost; restarting\u2026"),kt=e,A();else if(!i&&o){let d=_e(new Date(e));b(`City Change \u2014 waiting for slot window (IST ${dt()}, next in ${yi(d)})`)}q&&(zt=l.setTimeout(t,da))};zt=l.setTimeout(t,da)}function Ne(){no(),al(),gl(),At(),st=!1,$t=0,q=!1,I=!1,W=0,z=0,tt=0,kt=0,nt()}function nt(){ge=!1,vt=0,ft&&(l.clear(ft),ft=null)}function Ji(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let i=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(i))continue;let o=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let r of o)if(r&&/\bLoading\.{0,3}\b/i.test((r.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let o=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(o))continue;let r=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(r))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function Hi(){return Ji()}function Zi(){ge=!0,vt=Date.now(),ft&&l.clear(ft),ft=l.setTimeout(()=>{ft=null,!(!q||I)&&(nt(),X(Date.now()),b(`City Change \u2014 still Loading after ${Ct()/1e3}s; changing city\u2026`),A())},Ct())}function to(t){let e=Math.max(0,Number(t)||0)*1e3;Yt=Math.max(Yt,Date.now()+e),z=Math.max(z,Yt),nt(),A()}function Ia(){nt()}function ut(){O||(I=!0,W||(W=Date.now()),no(),nt(),Da(),kt=Date.now(),q&&A(),b("City Change \u2014 paused (Auto Submit booking)\u2026"))}function lt(){if(Z){b("Submit pending \u2014 staying on this city (ignoring date reload hop)\u2026");return}I&&(At(),I=!1,W=0,!(!q||O)&&(X(Date.now()),b("City Change \u2014 resuming; next city in 13\u201318s\u2026"),A()))}async function Wn(){let t=await ot();if(!t)return;let e=Date.now();if(e-Wi<6e4)return;Wi=e;let i=document.querySelector("#post_select")?.value;if(!i){b("Auto Submit ON \u2014 pick a city first.");return}let r=(await St()).find(c=>String(c.ID)===String(i)),a=r?.Days;if(Array.isArray(a)&&a.length){let c=On(a,t.from,t.to);if(c.length){ut();let d=he(c.length),f=c[d].Date;b(`Auto Submit: picking date #${d+1} (${f.slice(0,10)})\u2026`),Rn(f),l.send({action:"selectFirstDate",date:f,maxMs:pe,pollMs:j});return}b(`Auto Submit ON \u2014 no dates in your range on ${r.Name||"this city"} yet.`);return}b("Auto Submit ON \u2014 loading slots for current city\u2026"),l.send({action:"selectPost",postId:String(i)})}function eo(){Wi=0}function no(){_t&&(l.clear(_t),_t=null)}function sl(t,e){return t+Math.random()*(e-t)}function cl(){return sl(zi(),Vc())}function X(t=Date.now()){z=t+cl()}function ll(t=Date.now()){let e=_e(new Date(t));if(e>0)return e;if(Yt>t)return Yt-t;if(tt){let n=tt+zi()-t;if(n>0)return n}return z>t?z-t:0}function A(){if(!q)return;if(no(),I||ge){_t=l.setTimeout(()=>{Li()},500);return}let t=Date.now(),e=_e(new Date(t));if(e>0){z>t&&(z=t),e>=qi&&(kt=t),_t=l.setTimeout(()=>{Li()},e);return}let n=0;Yt>t&&(n=Math.max(n,Yt-t)),tt&&(n=Math.max(n,tt+zi()-t)),z>t&&(n=Math.max(n,z-t)),n=Math.max(0,n),n>=qi&&(kt=Date.now()),_t=l.setTimeout(()=>{Li()},n)}function ul(t,e){if(!t.length)return null;if(t.length===1)return de=0,t[0];let n=t.findIndex(o=>String(o.id)===String(e));n<0&&(n=Math.max(0,Math.min(de,t.length-1)));let i=(n+1)%t.length;return de=i,t[i]}function Hn(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function io(t){return String(t||"").toLowerCase().replace(/\b(vac|ofc|consular|embassy|appointment)\b/g," ").replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim()}function Bi(t,e,n){if(!t)return null;let i=e.get(String(t.id));if(i)return i;let o=io(t.name);if(!o)return null;if(i=n.get(o)||null,i)return i;for(let[r,a]of n)if(r!==o&&(r.includes(o)||o.includes(r)))return a;return null}function Bn(t){let e=Hn();if(!e.length||!t?.length)return[];let n=new Map(e.map(a=>[String(a.id),a])),i=new Map;for(let a of e){let c=io(a.name);c&&!i.has(c)&&i.set(c,a)}let o=[],r=new Set;for(let a of t){let c=Bi(a,n,i);c&&(r.has(c.id)||(r.add(c.id),o.push({id:c.id,name:c.name})))}return o}function xa(t,e){let n=Array.isArray(t)?t.filter(Boolean):[],i=Array.isArray(e)?e.filter(Boolean):[];if(!i.length)return n.map(y=>({id:String(y.id),name:y.name||y.id}));let o=document.querySelector(p(s.aiCities)),r=new Set(o?[...o.querySelectorAll('input[type="checkbox"]')].map(y=>String(y.value)):[]),a=Hn(),c=new Map(a.map(y=>[String(y.id),y])),d=new Map;for(let y of a){let S=io(y.name);S&&!d.has(S)&&d.set(S,y)}let f=[],h=new Set,g=y=>{if(!y)return;let S=a.length?Bi(y,c,d):null,C=String(S?.id||y.id);h.has(C)||(h.add(C),f.push({id:C,name:S?.name||y.name||y.id}))};for(let y of i)g(y);for(let y of n){let S=a.length?Bi(y,c,d):null,C=String(S?S.id:y.id);h.has(C)||h.has(String(y.id))||r.has(C)&&!i.some(_=>String(_.id)===C)||g(S||y)}return f}function Vt(){let t=document.querySelector(p(s.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function je(){return{from:document.querySelector(p(s.aiFrom))?.value||null,to:document.querySelector(p(s.aiTo))?.value||null}}function Fe(t=[],{force:e=!1,selectedCities:n=null}={}){let i=document.querySelector(p(s.aiCities));if(!i)return;let o=Hn(),r=ol(o),a=document.querySelector(p(s.aiPanel)),c=a&&!a.classList.contains(u.hidden),d=rl();if(!e&&r===ba&&i.querySelector('input[type="checkbox"]'))return;ba=r;let f=n?.length?n:(t||[]).map(y=>({id:String(y),name:""})),h=f.length?Bn(f):[],g=new Set(c&&d.length&&!e&&!f.length?d:(h.length?h.map(y=>y.id):d).map(String));if(i.replaceChildren(),!o.length){i.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let y of o){let S=document.createElement("label"),C=document.createElement("input");C.type="checkbox",C.value=y.id,C.dataset.name=y.name,C.checked=g.has(y.id),S.append(C,document.createTextNode(y.name)),i.appendChild(S)}}function dl(t){let e=t?.cities||[];return e.length?e.map(n=>n.name||n.id).join(", "):"\u2014"}async function Mt(t,e={}){let n=await H(t)||{},{cities:i,...o}=e,{from:r,to:a}=je(),c=Vt(),d=Array.isArray(n.cities)?n.cities:[],f;i!==void 0?f=xa(d,Array.isArray(i)?i:[]):c.length?f=xa(d,c):f=d;let h={...n,from:r||n.from||null,to:a||n.to||null,cities:f.length?f:n.cities||[],loginId:document.querySelector(p(s.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(p(s.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(g=>{let y=[s.aiQ1,s.aiQ2,s.aiQ3][g],S=[s.aiA1,s.aiA2,s.aiA3][g];return{q:document.querySelector(p(y))?.value?.trim()||n.security?.[g]?.q||"",a:document.querySelector(p(S))?.value?.trim()||n.security?.[g]?.a||"",set:g+1}}),...o};return typeof h.submitEnabled=="boolean"&&(h.enabled=h.submitEnabled),h.serverUpdatedAt=Date.now(),await Xi(t,h),fl(h),h}var kn=null,Fi=null;function fl(t){kn&&l.clear(kn),kn=l.setTimeout(()=>{kn=null,la(t).catch(()=>{})},400)}async function Pa(t){if(!t||Fi===t)return null;let e=await ua();if(Fi=t,!e)return null;let n=await H(t)||{},i=sa(n,e);return i?(i.loginId=n.loginId||i.loginId||"",i.loginPass=n.loginPass||"",i.security=n.security||i.security||[],typeof i.submitEnabled=="boolean"&&(i.enabled=i.submitEnabled),await Xi(t,i),i):null}async function ml(t,e){if(Z||!ie()||I||L)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let i=String(t);return String(n.value)===i?!1:(Oe=i,Qi=Date.now(),Zi(),tt=Date.now(),X(tt),b(`Switching city \u2192 ${e||t}\u2026`),qn(),l.send({action:"selectPost",postId:i}),!0)}async function pl(t,e,{alertId:n,dayCount:i}={}){if(O||k()||!pt()||Z)return!1;let o=document.querySelector("#post_select");if(!o||!t)return!1;let r=String(t),a=e||r;return String(o.value)===r?(b(`City alert \u2014 already on ${a}`+(i?` (${i} dates reported)`:"")),!0):(At(),nt(),I=!1,W=0,L=!1,Nt(),st=!1,$t=0,z=Date.now(),tt=0,Oe=r,Qi=Date.now(),Zi(),tt=Date.now(),qn(),b(`City alert \u2014 switching now \u2192 ${a}`+(i?` (${i} dates)`:"")+(n?` [#${n}]`:"")),l.send({action:"selectPost",postId:r}),q&&A(),!0)}var jt=null,An=!1,va="",Ca=0,hl=150;function gl(){jt&&(l.clear(jt),jt=null),An=!1}async function yl(){if(!(An||!q||O)){An=!0;try{let t=await Qt();if(!t?.cities?.length)return;let e=document.querySelector("#post_select"),n=await ra({preferredCities:t.cities,citiesEnabled:!0,currentCityId:e?String(e.value):""});if(!n?.alertId)return;if(n.alreadyThere){$n(n.alertId),b(`City alert \u2014 already on ${n.name||n.id}`+(n.dayCount?` (${n.dayCount} dates)`:""));return}let i=`${n.id}:${n.alertId}`,o=Date.now();if(i===va&&o-Ca<6e3){$n(n.alertId);return}await pl(n.id,n.name,{alertId:n.alertId,dayCount:n.dayCount})&&(va=i,Ca=o,$n(n.alertId))}catch{}finally{An=!1}}}function La(){if(jt||!q)return;let t=()=>{jt=null,!(!q||O||!l.alive)&&yl().finally(()=>{q&&!O&&l.alive&&(jt=l.setTimeout(t,hl))})};jt=l.setTimeout(t,50)}function oo(){if(ya)return;let t=document.querySelector("#post_select");if(!t)return;ya=!0,Pi=String(t.value||"");let e=()=>{let n=document.querySelector("#post_select");if(!n)return;let i=String(n.value||"");!i||i===Pi||(Pi=i,bl(i,n))};l.on(t,"change",e),l.setInterval(e,400)}function bl(t,e){if(!q||O||!l.alive||Z)return;let n=String(t||"");if(!n)return;let i=Oe&&n===Oe&&Date.now()-Qi<2500;i&&(Oe=""),At(),I=!1,W=0,Nt(),qn(),tt=Date.now(),Zi(),X(tt),Qt().then(r=>{if(!r?.cities?.length)return;let c=Bn(r.cities).findIndex(d=>String(d.id)===n);c>=0&&(de=c)}).catch(()=>{});let o=e?.selectedOptions&&e.selectedOptions[0]?.textContent?.trim()||e?.options?.[e.selectedIndex]?.textContent?.trim()||n;b(i?`City Change \u2014 on ${o}; waiting for dates\u2026`:`City Change \u2014 you switched \u2192 ${o}; waiting (same as system hop)\u2026`),A()}async function Li(){if(!(st||!q)){st=!0,$t=Date.now(),kt=Date.now(),_t=null;try{if(O||k()||!l.alive){Ne();return}if(Nn()){z=Date.now(),b(ie()?"City Change \u2014 auto-unstuck; hopping now\u2026":`City Change \u2014 auto-unstuck; waiting IST ${dt()}\u2026`),A();return}if(I||L){let g=W?Date.now()-W:0;if(I&&g>=He()){At(),I=!1,W=0,X(Date.now()),b("City Change \u2014 hold expired; next city in 13\u201318s\u2026"),A();return}let y=Math.max(0,He()-g);b(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(y/1e3)}s`),A();return}let t=Date.now(),e=ie(new Date(t)),n=_e(new Date(t));if(!e){b(`City Change \u2014 waiting for slot window (IST ${dt()}, next in ${yi(n)})`),A();return}if(ge){let g=vt?t-vt:0;if(Hi()){if(g>=Ct()){nt(),X(Date.now()),b(`City Change \u2014 still Loading after ${Ct()/1e3}s; changing city\u2026`),A();return}let S=Math.max(0,Math.ceil((Ct()-g)/1e3));b(`City Change \u2014 Date Loading\u2026 stay (${S}s then hop if still Loading)`),A();return}if(g>=Kt()){nt(),X(Date.now()),b(`City Change \u2014 calendar up but no dates after ${Kt()/1e3}s; changing city\u2026`),A();return}let y=Math.max(0,Math.ceil((Kt()-g)/1e3));b(`City Change \u2014 waiting calendar dates\u2026 (${y}s then hop)`),A();return}let i=ll(t);if(i>0){let g=Math.ceil(i/1e3);b(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,g)}s`),A();return}let o=await Qt();if(!o?.cities?.length){Ne();return}let r=new Set(Hn().map(g=>g.id)),a=Bn(o.cities);if(!a.length){b("Preferred cities not found in the dropdown \u2014 pick cities again."),Ne();return}a.length<(o.cities?.length||0)&&b(`City Change \u2014 using ${a.length}/${o.cities.length} preferred (some ids remapped/missing in dropdown): ${a.map(g=>g.name||g.id).join(" \u2192 ")}`);let c=document.querySelector("#post_select"),d=c?String(c.value):"",f=ul(a,d);if(!f){X(t),A();return}if(await ml(f.id,f.name)){tt=Date.now(),X(tt);let g=a.map(S=>S.name||S.id).join(" \u2192 "),y=`${de+1}/${a.length}`;b(`City Change \u2014 ${y} ${f.name||f.id} (path: ${g}); Loading up to ${Ct()/1e3}s, no-dates hop ${Kt()/1e3}s`)}else X(t);A()}finally{st=!1,$t=0}}}async function Fn(){if(O||k()||!pt())return;let t=await Qt();if(!t?.cities?.length)return;let e=Bn(t.cities);if(!e.length){b("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}At(),nt(),I=!1,W=0,L=!1,st=!1,$t=0,q=!0,kt=Date.now(),z=Date.now();let n=document.querySelector("#post_select"),i=n?String(n.value):"",o=e.findIndex(a=>String(a.id)===i);de=o>=0?o:0;let r=e.map(a=>a.name||a.id).join(" \u2192 ");b(`City Change ON \u2014 ${e.length} cities (${r}); IST ${dt()}; hop 13\u201318s`),Ea(),La(),A()}async function qa(){if(O||k()||!ji()||!l.alive||!(await Qt())?.cities?.length||!document.querySelector("#post_select"))return;if(!q){await Fn();return}let e=Nn();Ea(),La(),(e||!_t&&!st)&&(e&&(X(Date.now()),b("City Change \u2014 auto-unstuck; next city in 13\u201318s\u2026")),A())}function ro(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function Dn(){let t=ro();return!!(t&&!t.disabled)}function wl(t){if(!t||t.disabled)return!1;try{let e=t.form||t.closest?.("form");if(e&&typeof e.requestSubmit=="function")return e.requestSubmit(t),!0}catch{}try{return t.click(),!0}catch{}try{return t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click(),!0}catch{}return!1}function ao(){let t=ro();if(!t||t.disabled)return!1;let e=wl(t);return l.send({action:"forceClickSubmit",prefix:m,pollMs:j,maxMs:Math.min(1500,We)}),e}function Sl(){return V()?Dn():!1}function so(t){let e=Date.now()+Math.max(0,Number(t)||0);return V()&&Dn()?Promise.resolve(!0):new Promise(n=>{let i=!1,o=null,r=null,a=d=>{if(!i){i=!0;try{r?.disconnect()}catch{}o&&l.clear(o),n(!!d)}},c=()=>{if(!l.alive||Ue()||k())return a(!1);if(V()&&Dn())return a(!0);if(Date.now()>=e)return a(V()&&Dn())};try{r=new MutationObserver(c);let d=ro();d&&r.observe(d,{attributes:!0,attributeFilter:["disabled","class","aria-disabled"]});let f=d?.form||d?.closest?.("form")||document.querySelector("#page_form, form");f?r.observe(f,{attributes:!0,attributeFilter:["disabled","class"],childList:!0,subtree:!0}):r.observe(document.documentElement,{attributes:!0,attributeFilter:["disabled"],childList:!0,subtree:!0})}catch{r=null}o=l.setInterval(c,j),c()})}function Ra(){b("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function co(t){if(O||k()||L)return;let e=await H(t);if(!Wt(e))return;ut(),L=!0,Le();let n=Date.now(),i=!1,o=!1,r=async d=>{if(!(i||!L||!l.alive)){if(i=!0,window.removeEventListener("message",a),Tt&&(l.clear(Tt),Tt=null),k()){L=!1;return}if(L=!1,d){await Ke(t);return}lt(),b(q?"Auto Submit \u2014 Submit not clicked in time; City Change resuming\u2026":"Auto Submit \u2014 Submit not clicked in time; still watching\u2026")}},a=d=>{!l.alive||d.source!==window||d.data?.action===Et.sub&&r(!0)};window.addEventListener("message",a);let c=async()=>{if(i||!L||!l.alive||o)return;let d=Date.now()-n;if(Sl()){o=!0,b("Submit enabled \u2014 clicking\u2026"),ao();return}if(d>=We)return r(!1);b("Waiting for Submit to enable\u2026"),Tt=l.setTimeout(c,j)};so(We).then(d=>{i||!L||!l.alive||o||d&&c()}),c()}async function Oa(){if(!V()||L||O)return;let t=await ot();t&&await co(t.accountId)}function b(t){let e=document.querySelector(p(s.aiStatus));e&&(e.textContent=t)}function D(t){b(t)}function Ta(t){return!!(t&&t.termsAgreed)}function Na(t){return!!(t&&t.termsPassed)}function Pn(){return!!document.querySelector(p(s.aiTermsAgree))?.checked}function lo(t){let e=document.querySelector(p(s.aiTermsGate)),n=document.querySelector(p(s.aiMain)),i=document.querySelector(p(s.aiTermsAgree)),o=document.querySelector(p(s.aiTermsContinue)),r=Na(t);e&&e.classList.toggle(u.hidden,r),n&&n.classList.toggle(u.hidden,!r),i&&(i.checked=Ta(t)||Pn()),o&&(o.disabled=!(Ta(t)||Pn()))}function xl(){let t=document.querySelector(p(s.aiTermsContinue)),e=Pn();t&&(t.disabled=!e),b(e?"Terms checked \u2014 tap Continue.":"Check Agree to continue.")}async function vl(){if(!Pn()){b("Check Agree first.");return}let t=await R();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=await H(t)||{},{from:n,to:i}=je(),o=Vt(),r=Un();ht(),Nt(),eo(),at=!0,mt=!0,await Mt(t,{termsAgreed:!0,termsPassed:!0,termsAgreedAt:e.termsAgreedAt||Date.now(),submitEnabled:!0,citiesEnabled:!0,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],slotWindows:r.length?r:e.slotWindows||null,confirmedAt:Date.now()}),await it(),ct(document.querySelector(p(s.aiSubmitSw)),!0),ct(document.querySelector(p(s.aiCitiesSw)),!0),at=!0,mt=!0,Kn(await H(t)),Fe((e.cities||[]).map(c=>c.id),{force:!0,selectedCities:e.cities||[]}),uo(e),lo(await H(t)),(Vt().length?Vt():e.cities||[]).length&&(oo(),await Fn()),(n||e.from)&&(i||e.to)&&await Wn(),b("Auto Submit and City Change ON \u2014 set dates and preferred cities.")}function Wa(t){t?.slotWindows?.length?fr(t.slotWindows):gi()}function Cl(t){let e="";for(let n=0;n<=59;n++){let i=Number(t)===n?" selected":"";e+=`<option value="${n}"${i}>:${String(n).padStart(2,"0")}</option>`}return e}function _a(t,e){let n=Math.min(Pt,59-Number(t||0)),i="";for(let o=1;o<=Math.max(1,n);o++){let r=Number(e)===o?" selected":"";i+=`<option value="${o}"${r}>${o} min</option>`}return i}function Ha(t,e){let n=Number(t)||0,i=Number(e)||1,o=Math.min(59,n+i);return`Runs from :${String(n).padStart(2,"0")} up to :${String(o).padStart(2,"0")}`}function Un(){let t=document.querySelector(p(s.aiWinList));if(!t)return[];let e=[];for(let n of t.querySelectorAll(`.${u.aiWinRow}`)){let i=Number(n.querySelector('select[data-win="from"]')?.value),o=Number(n.querySelector('select[data-win="dur"]')?.value);!Number.isFinite(i)||!Number.isFinite(o)||e.push({fromMin:i,durationMin:o})}return hi(e)}function $a(t){let e=t.querySelector('select[data-win="from"]'),n=t.querySelector('select[data-win="dur"]'),i=t.querySelector(`.${u.aiWinHelp}`);!e||!n||!i||(i.textContent=Ha(e.value,n.value))}function Ba(t=0,e=6){let n=Math.min(Pt,59-t),i=Math.min(Math.max(1,e||1),Math.max(1,n)),o=document.createElement("div");o.className=u.aiWinRow,o.innerHTML=`
    <div class="${u.aiInline}">
      <label class="${u.aiHead}">Start</label>
      <select data-win="from">${Cl(t)}</select>
      <label class="${u.aiHead}" style="margin-left:10px;color:#6b7280;font-weight:500">Duration</label>
      <select data-win="dur">${_a(t,i)}</select>
      <button type="button" class="${u.aiTrash}" data-win="del" title="Delete timing" aria-label="Delete">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
        </svg>
      </button>
    </div>
    <div class="${u.aiWinHelp}">${Ha(t,i)}</div>
  `;let r=o.querySelector('select[data-win="from"]'),a=o.querySelector('select[data-win="dur"]');return l.on(r,"change",()=>{let c=Number(r.value),d=Number(a.value)||1;a.innerHTML=_a(c,d),$a(o)}),l.on(a,"change",()=>$a(o)),l.on(o.querySelector('button[data-win="del"]'),"click",()=>{o.remove(),fo()}),o}function uo(t){let e=document.querySelector(p(s.aiWinList));if(!e)return;e.replaceChildren();let n=t?.slotWindows?.length?mr(t.slotWindows):[];for(let i of n.slice(0,xt))e.appendChild(Ba(i.fromMin,i.durationMin));fo(t)}function fo(t){let e=document.querySelector(p(s.aiWinNote));e&&(t?.slotWindows?.length||Un().length?e.textContent=`Custom windows active (max ${xt}, each \u2264 ${Pt} min).`:e.textContent=`Using defaults: ${dt()}. Add up to ${xt} windows below.`)}function ct(t,e){t&&(t.classList.toggle(u.aiOnBtn,!!e),t.setAttribute("aria-checked",e?"true":"false"))}function Tl(t){ct(document.querySelector(p(s.aiSubmitSw)),Wt(t)),ct(document.querySelector(p(s.aiCitiesSw)),Ot(t))}var at=!1,mt=!1;function Kn(t){let e=Wt(t)||at,n=Ot(t)||mt,i=document.querySelector(p(s.aiSubmitBody)),o=document.querySelector(p(s.aiCitiesBody));i&&i.classList.toggle(u.hidden,!e),o&&o.classList.toggle(u.hidden,!n)}function _l(t,e){let n=document.querySelector(p(s.aiStatus)),i=document.querySelector(p(s.aiBtn));if(!n||!i)return;Tl(t),Kn(t);let o=Wt(t),r=Ot(t),a=o||r;a?(i.classList.add(u.aiOn),i.textContent="Tik Tik ON"):(i.classList.remove(u.aiOn),i.textContent="Tik Tik");let c=[];o&&t.from&&t.to?c.push(`Auto Submit ON (${Xt(t.from)} \u2013 ${Xt(t.to)}, clicks Submit as soon as time slot is ready)`):at&&!o?c.push("Auto Submit \u2014 set From / To dates, then Enable again"):c.push("Auto Submit OFF"),r?c.push(`City Change ON (${dl(t)}, ${dt()})`):mt&&!r?c.push("City Change \u2014 pick preferred cities, then Enable again"):c.push("City Change OFF"),n.textContent=`Account ${e||"\u2014"}: ${c.join(" \xB7 ")}`,n.classList.toggle(u.aiOk,a)}async function it(){let t=await R();if(t)try{await Pa(t)}catch{}let e=t?await H(t):null;Wt(e)||(at=!1),Ot(e)||(mt=!1),Wa(e),_l(e,t),lo(e);let n=document.querySelector(p(s.aiFrom)),i=document.querySelector(p(s.aiTo));n&&(n.value=e?.from||""),i&&(i.value=e?.to||""),Yi();let o=(e?.cities||[]).map(C=>C.id),r=document.querySelector(p(s.aiCitiesBody));(r&&!r.classList.contains(u.hidden)||Ot(e)||mt)&&Fe(o,{selectedCities:e?.cities||[]}),uo(e);let c=document.querySelector(p(s.aiLogin)),d=document.querySelector(p(s.aiPass));c&&e?.loginId&&(c.value=e.loginId),d&&e?.loginPass&&(d.value=e.loginPass);let f=e?.security||[],h=[s.aiQ1,s.aiQ2,s.aiQ3],g=[s.aiA1,s.aiA2,s.aiA3];h.forEach((C,_)=>{let N=document.querySelector(p(C));N&&(N.innerHTML=Mn(_,f[_]?.q||""))}),g.forEach((C,_)=>{let N=document.querySelector(p(C));N&&f[_]?.a&&(N.value=f[_].a)});let y=document.querySelector(p(s.aiLoginBody)),S=y&&!y.classList.contains(u.hidden);mo(!!S,Ll(e))}function $l(){let t=document.querySelector(p(s.aiPanel));return!!(t&&!t.classList.contains(u.hidden))}function Ui(t){let e=document.querySelector(p(s.aiPanel));e&&(t||Rt(),e.classList.toggle(u.hidden,!t),t&&R().then(async n=>{if(n)try{Fi=null,await Pa(n)}catch{}let i=n?await H(n):null;lo(i),Na(i)?Fe((i?.cities||[]).map(o=>o.id),{force:!0,selectedCities:i?.cities||[]}):b("Read the terms, check Agree, then Continue.")}))}function Ki(){if(Ki._done)return;Ki._done=!0;let t=e=>{if(!$l())return;let n=document.querySelector(p(s.aiPanel)),i=document.querySelector(p(s.aiBtn)),o=document.querySelector(p(s.aiCal)),r=Vi(e);if(!(o&&!o.classList.contains(u.hidden)&&r&&o.contains(r))){if(o&&!o.classList.contains(u.hidden)){let a=document.querySelector(p(s.aiFromBtn)),c=document.querySelector(p(s.aiToBtn));!(a&&r&&(a===r||a.contains(r)))&&!(c&&r&&(c===r||c.contains(r)))&&Rt()}n&&r&&(n===r||n.contains(r))||i&&r&&(i===r||i.contains(r))||(Rt(),Ui(!1))}};l.on(document,"pointerdown",t,{capture:!0})}async function kl(t){let e=await R();if(!e){b("Open a logged-in schedule page so we can bind this to your account.");return}let n=await H(e)||{},{from:i,to:o}=je();if(i=i||n.from||null,o=o||n.to||null,t){at=!0,ct(document.querySelector(p(s.aiSubmitSw)),!0),ht(),Nt(),eo(),await Mt(e,{submitEnabled:!0,from:i||null,to:o||null,confirmedAt:Date.now()});let r=document.querySelector(p(s.aiFrom)),a=document.querySelector(p(s.aiTo));if(r&&i&&(r.value=i),a&&o&&(a.value=o),Yi(),await it(),ct(document.querySelector(p(s.aiSubmitSw)),!0),at=!0,Kn(await H(e)),!i||!o){b("Auto Submit ON \u2014 select From and To dates to start booking.");return}if(i>o){b("Auto Submit ON \u2014 From date must be before To date.");return}at=!1,b(`Auto Submit ON (${Xt(i)} \u2013 ${Xt(o)})`),await Wn();return}at=!1,Nt(),ct(document.querySelector(p(s.aiSubmitSw)),!1),await Mt(e,{submitEnabled:!1,from:i||n.from,to:o||n.to}),await it(),b("Auto Submit OFF")}async function Ml(t){let e=await R();if(!e){b("Open a logged-in schedule page so we can bind this to your account.");return}let n=await H(e)||{};if(t){mt=!0,ct(document.querySelector(p(s.aiCitiesSw)),!0),Fe((n.cities||[]).map(a=>a.id),{force:!0,selectedCities:n.cities||[]}),uo(n);let o=Vt();!o.length&&n.cities?.length&&(o=n.cities);let r=Un();if(ht(),await Mt(e,{citiesEnabled:!0,cities:o.length?o:n.cities||[],slotWindows:r.length?r:n.slotWindows||null}),await it(),ct(document.querySelector(p(s.aiCitiesSw)),!0),mt=!0,Kn(await H(e)),o.length||Fe([],{force:!0}),!o.length){b("City Change ON \u2014 select at least one preferred city to start hopping.");return}mt=!1,oo(),await Fn(),b(`City Change ON (${o.map(a=>a.name||a.id).join(", ")})`);return}mt=!1,Ne(),ct(document.querySelector(p(s.aiCitiesSw)),!1);let i=Vt();await Mt(e,{citiesEnabled:!1,cities:i.length?i:n.cities||[]}),await it(),b("City Change OFF")}async function ka(){let t=await R();if(!t)return;let e=await H(t)||{};if(!Wt(e)&&!at)return;let{from:n,to:i}=je();!n||!i||n>i||(await Mt(t,{submitEnabled:!0,from:n,to:i,confirmedAt:Date.now()}),at=!1,await it(),ct(document.querySelector(p(s.aiSubmitSw)),!0),ht(),eo(),b(`Auto Submit ON (${Xt(n)} \u2013 ${Xt(i)})`),await Wn())}function Al(t){return(t||[]).map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", ")}async function Dl(){let t=document.querySelector(p(s.aiWinList));if(t){if(t.querySelectorAll(`.${u.aiWinRow}`).length>=xt){b(`Max ${xt} timing windows.`);return}t.appendChild(Ba(0,Math.min(6,Pt))),fo()}}async function El(){let t=await R();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=Un();if(!e.length){b("Add at least one timing (or Reset to defaults).");return}await Mt(t,{slotWindows:e}),await it(),b(`Saved ${e.length} custom timing(s): ${Al(e)}`)}async function Il(){let t=await R();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}window.confirm("Reset to default IST windows? Your custom timings will be removed.")&&(await Mt(t,{slotWindows:null}),gi(),await it(),b(`Using default windows: ${dt()}`))}async function Pl(){let t=await R();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let{from:e,to:n}=je(),i=Vt(),o=document.querySelector(p(s.aiLogin))?.value?.trim(),r=document.querySelector(p(s.aiPass))?.value,a=[0,1,2].map(c=>({q:document.querySelector(p([s.aiQ1,s.aiQ2,s.aiQ3][c]))?.value?.trim()||"",a:document.querySelector(p([s.aiA1,s.aiA2,s.aiA3][c]))?.value?.trim()||""}));if(!o||!r){b("Enter ID and password before saving.");return}if(a.some(c=>!c.q||!c.a)){b("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}await Mt(t,{}),mo(!0,!0),b("Saved ID, password, and 3 security questions (1 from each set).")}function Ll(t){let e=t?.security||[];return!!(t?.loginId&&t?.loginPass&&e.length>=3&&e.every(n=>n?.q&&n?.a))}function mo(t,e){let n=document.querySelector(p(s.aiLoginToggle));if(!n)return;let i=t?"\u25BE":"\u25B8";n.textContent=e?`Login details (saved) ${i}`:`Login details ${i}`}function ql(){let t=document.querySelector(p(s.aiLoginBody)),e=document.querySelector(p(s.aiLoginToggle));if(!t||!e)return;let n=t.classList.contains(u.hidden);t.classList.toggle(u.hidden,!n);let i=/saved/i.test(e.textContent||"");mo(n,i)}function po(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==s.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==s.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===s.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function Gi(){document.querySelector(p(s.aiPanel))?.remove(),document.querySelector(p(s.aiBtn))?.remove(),po()}function Rl(){if(k())return;if(!ji()){Gi();return}if(document.querySelector(p(s.aiBtn)))if(!document.querySelector(p(s.aiSubmitSw))||!document.querySelector(p(s.aiTermsContinue))||!document.querySelector(p(s.aiFromBtn)))Gi();else return;let t=xr();if(!t)return;let e=document.createElement("button");e.id=s.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[M.mark]="",l.on(e,"click",i=>{i.stopPropagation();let o=document.querySelector(p(s.aiPanel)),r=o&&o.classList.contains(u.hidden);Ui(!!r)}),t.appendChild(e);let n=document.createElement("div");n.id=s.aiPanel,n.className=u.hidden,n.dataset[M.mark]="",n.innerHTML=`
    <div id="${s.aiTermsGate}">
      <div id="${s.aiTerms}" class="${u.aiTerms}">
        <div class="${u.aiHead}">Terms &amp; Conditions</div>
        <div class="${u.aiHint}">Please read carefully before continuing.</div>
        <ul class="${u.aiTermsList}">
          <li>Options apply to this applicant only. They do not bypass CAPTCHAs, waiting rooms, or portal security.</li>
          <li>During your windows, City Change hops every 13\u201318s. Max ${xt} windows, each up to ${Pt} minutes.</li>
          <li>Checking too fast may trigger <b>1015 Rate Limit</b> errors.</li>
        </ul>
        <label class="${u.aiTermsCb}">
          <input type="checkbox" id="${s.aiTermsAgree}" />
          <span>I have read and agree to these terms.</span>
        </label>
        <button type="button" id="${s.aiTermsContinue}" class="${u.aiContinue}" disabled>Continue</button>
      </div>
    </div>
    <div id="${s.aiMain}" class="${u.hidden}">
      <div class="${u.aiSec}">
        <div class="${u.aiRow}" style="justify-content:space-between;margin-bottom:4px">
          <div>
            <div class="${u.aiHead}" style="font-size:17px">Auto Submit</div>
            <div class="${u.aiHint}" style="margin:2px 0 0">Book automatically when a date in your range appears.</div>
          </div>
          <button type="button" id="${s.aiSubmitSw}" class="${u.aiSwitch}" role="switch" aria-checked="false" aria-label="Auto Submit">
            <span class="${u.aiKnob}"></span>
          </button>
        </div>
        <div id="${s.aiSubmitBody}" class="${u.hidden}">
          <div class="${u.aiRow}" style="margin-top:10px">
            <label>From
              <button type="button" id="${s.aiFromBtn}" class="${u.aiDateBtn}">Select date</button>
              <input type="hidden" id="${s.aiFrom}" />
            </label>
            <label>To
              <button type="button" id="${s.aiToBtn}" class="${u.aiDateBtn}">Select date</button>
              <input type="hidden" id="${s.aiTo}" />
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
          <button type="button" id="${s.aiCitiesSw}" class="${u.aiSwitch}" role="switch" aria-checked="false" aria-label="City Change">
            <span class="${u.aiKnob}"></span>
          </button>
        </div>
        <div id="${s.aiCitiesBody}" class="${u.hidden}">
          <div class="${u.aiHint}" style="margin:10px 0 4px;font-weight:600;color:#111827">
            Preferred cities
            <button type="button" id="${s.aiCitiesAll}" class="${u.aiCityAct}">Select all</button>
            <button type="button" id="${s.aiCitiesNone}" class="${u.aiCityAct}">Clear</button>
          </div>
          <div id="${s.aiCities}" class="${u.aiCities}"></div>
          <div class="${u.aiHead}" style="font-size:16px;margin:14px 0 8px">Release Window Checks</div>
          <p id="${s.aiWinNote}" class="${u.aiHint}"></p>
          <div id="${s.aiWinList}"></div>
          <div class="${u.aiRow}" style="margin-top:8px">
            <button type="button" id="${s.aiWinAdd}">+ Add timing</button>
            <button type="button" id="${s.aiWinSave}">Save timings</button>
            <button type="button" id="${s.aiWinReset}">Reset defaults</button>
          </div>
        </div>
      </div>
      <div class="${u.aiSec}">
        <div class="${u.aiRow}" style="margin:0">
          <button type="button" id="${s.aiLoginToggle}">Login details \u25B8</button>
          <button type="button" id="${s.aiClose}">Close</button>
        </div>
        <div id="${s.aiLoginBody}" class="${u.hidden}" style="margin-top:8px">
          <div class="${u.aiHint}" style="margin:4px 0;font-weight:600;color:#111827">Login (auto-login on Home when logged out)</div>
          <div class="${u.aiRow}">
            <label>ID / email <input type="email" id="${s.aiLogin}" autocomplete="off" /></label>
            <label>Password <input type="password" id="${s.aiPass}" autocomplete="off" /></label>
          </div>
          <div class="${u.aiHint}" style="margin:0 0 6px">
            3 sets \xD7 5 questions. Pick <b>1 question from each set</b>, then type <b>your answer</b> for that question.
          </div>
          <div class="${u.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 1 \u2014 choose 1 question
              <select id="${s.aiQ1}">${Mn(0)}</select>
            </label>
            <label>Your answer for set 1
              <input type="text" id="${s.aiA1}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${u.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 2 \u2014 choose 1 question
              <select id="${s.aiQ2}">${Mn(1)}</select>
            </label>
            <label>Your answer for set 2
              <input type="text" id="${s.aiA2}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${u.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 3 \u2014 choose 1 question
              <select id="${s.aiQ3}">${Mn(2)}</select>
            </label>
            <label>Your answer for set 3
              <input type="text" id="${s.aiA3}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${u.aiRow}">
            <button type="button" id="${s.aiSaveLogin}">Save login details</button>
          </div>
        </div>
      </div>
    </div>
    <div id="${s.aiStatus}" class="${u.aiHint}" style="margin-top:10px"></div>
  `,t.insertAdjacentElement("afterend",n),l.on(n.querySelector(p(s.aiSubmitSw)),"click",async()=>{let i=await R(),o=i?await H(i):null;await kl(!Wt(o))}),l.on(n.querySelector(p(s.aiCitiesSw)),"click",async()=>{let i=await R(),o=i?await H(i):null;await Ml(!Ot(o))}),l.on(n.querySelector(p(s.aiWinAdd)),"click",Dl),l.on(n.querySelector(p(s.aiWinSave)),"click",El),l.on(n.querySelector(p(s.aiWinReset)),"click",Il),l.on(n.querySelector(p(s.aiSaveLogin)),"click",Pl),l.on(n.querySelector(p(s.aiLoginToggle)),"click",ql),l.on(n.querySelector(p(s.aiClose)),"click",()=>Ui(!1)),l.on(n.querySelector(p(s.aiCitiesAll)),"click",()=>Sa(!0)),l.on(n.querySelector(p(s.aiCitiesNone)),"click",()=>Sa(!1)),l.on(n.querySelector(p(s.aiTermsAgree)),"change",()=>{xl()}),l.on(n.querySelector(p(s.aiTermsContinue)),"click",()=>{vl()}),l.on(n.querySelector(p(s.aiFromBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(p(s.aiCal));if(o&&!o.classList.contains(u.hidden)&&J.which==="from"){Rt();return}ma("from",i.currentTarget)}),l.on(n.querySelector(p(s.aiToBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(p(s.aiCal));if(o&&!o.classList.contains(u.hidden)&&J.which==="to"){Rt();return}ma("to",i.currentTarget)}),Ki(),it()}function Ol(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",l.on(e,"click",()=>{R().then(n=>{Ke(n||null)})}))};t(document.querySelector("#submitbtn")),l.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function ho(){if(l.alive&&!k()){if(!ji()){Gi();return}await l.waitFor("#post_select",{attempts:on})&&(Zr(t=>{let e=String(t?.message||t?.source||"error").slice(0,120);Be(e)}),Rl(),oo(),Ol(),!wa&&(wa=!0,l.setTimeout(()=>it(),800),l.setTimeout(async()=>{await ot()&&await Wn()},1500)))}}var Fa=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function Ua(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function Nl(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=Ua(t.data.url),i=new URLSearchParams(t.data.request||"").get("parameters");if(!i)return null;let o;try{o=JSON.parse(i)}catch{return null}return{params:o,tail:e,response:t.data.response}}async function Wl(t,e={}){t?.length&&(await Wr(t,e),await x("audioAlert")&&$r())}async function Hl(t,e=!1){if(e||k())return null;let n=new Date;n.setHours(0,0,0,0);let i=(t||[]).map(a=>{if(!a)return null;let c=zn(a.Date);return c?{...a,Date:c}:null}).filter(Boolean).filter(a=>{let[c,d,f]=a.Date.slice(0,10).split("-").map(Number);return!c||!d||!f?!1:new Date(c,d-1,f)>=n}).sort((a,c)=>String(a.Date).localeCompare(String(c.Date))),o=await ot();if(o){let a=i.filter(d=>ze(d.Date,o.from,o.to));if(!a.length)return null;let c=he(a.length);return a[c]?.Date||null}if(!await x("autoSelectFirstDate")||!i.length)return null;let r=he(i.length);return i[r]?.Date||null}function zn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,r,a]=n;return`${a}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime())){let r=o.getFullYear(),a=String(o.getMonth()+1).padStart(2,"0"),c=String(o.getDate()).padStart(2,"0");return`${r}-${a}-${c}`}}return null}function Bl(t){if(!t)return!1;let[e,n,i]=t.slice(0,10).split("-").map(Number);if(!e||!n||!i)return!1;let o=n-1,r=String(n).padStart(2,"0")+"/"+String(i).padStart(2,"0")+"/"+e,a=document.querySelector("#datepicker");if(a){let c=String(a.value||"").trim();if(c===r)return!0;if(c.includes(String(e))&&c.includes(String(i).padStart(2,"0"))){let d=c.split(/[/-]/).map(f=>parseInt(f,10));if(d.length>=3){let f,h,g;if(d[2]>31?(h=d[0],g=d[1],f=d[2]):(f=d[0],h=d[1],g=d[2]),f===e&&h===n&&g===i)return!0}}try{let d=window.jQuery||window.$;if(d&&d(a).hasClass("hasDatepicker")){let f=d(a).datepicker("getDate");if(f&&f.getFullYear()===e&&f.getMonth()===o&&f.getDate()===i)return!0}}catch{}}for(let c of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let d=c.querySelector("a");if(!d)continue;let f=parseInt(c.getAttribute("data-month"),10),h=parseInt(c.getAttribute("data-year"),10),g=parseInt(d.textContent,10);if(h===e&&f===o&&g===i)return!0}return!1}var Gn=null;function Fl(t,e){Gn&&l.clear(Gn);let n=Date.now()+(e?pe:8e3),i=()=>{!l.alive||Date.now()>n||Bl(t)||(l.send({action:"selectFirstDate",date:t,maxMs:e?pe:8e3,pollMs:j}),Gn=l.setTimeout(i,j))};Gn=l.setTimeout(i,80)}function Ka(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Ul(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function Ga(t){return t?.length?t.map((e,n)=>({entry:e,index:n,avail:Ul(e)})).sort((e,n)=>n.avail!==e.avail?n.avail-e.avail:e.index-n.index):[]}function Kl(t){let e=Ga(t);return e.length?{entry:e[0].entry,slotIndex:e[0].index}:{entry:null,slotIndex:0}}function za(){Jt&&(l.clear(Jt),Jt=null)}var ja=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),Ya=null,Gl=null,Jt=null;function zl(t,e){Ya=t,Gl=e?String(e).slice(0,10):null}function jl(t,e=0){Jt&&l.clear(Jt);let n=t?String(t).slice(0,10):null,i=0,o=async()=>{if(!l.alive||Ue()||++i>240||V())return;let r=(Ya||[]).filter(a=>a&&a.Time);if(r.length){let{entry:a,slotIndex:c}=Kl(r);if(D(`Watchdog: picking time slot #${c+1}\u2026`),await Ie({time:Ka(a.Time),date:a.Date?String(a.Date).slice(0,10):n,slotIndex:c,pollMs:j,maxMs:600,prefix:m}),V())return}else if(document.querySelector(ja)&&(D("Watchdog: picking visible time slot\u2026"),await Ie({time:"00:00",date:n,slotIndex:e,pollMs:j,maxMs:600,prefix:m}),V()))return;Jt=l.setTimeout(o,j)};Jt=l.setTimeout(o,300)}var Yl=["#datepicker.hasDatepicker","#datepicker"].join(", ");async function Vl(t,e=!1){if(e)return null;let n=await Hl(t,e);if(!n)return null;let i=await ot(),o=new Date;o.setHours(0,0,0,0);let r=(t||[]).map(d=>zn(d?.Date)).filter(Boolean).filter(d=>{let[f,h,g]=d.slice(0,10).split("-").map(Number);return new Date(f,h-1,g)>=o}).sort((d,f)=>d.localeCompare(f)),a=i?r.filter(d=>ze(d,i.from,i.to)):r,c=he(a.length);return D(`Selecting date #${c+1}: ${n} (fast)\u2026`),Rn(n),await l.waitFor(Yl,{attempts:80,interval:j}),l.send({action:"selectFirstDate",date:n,maxMs:i?pe:8e3,pollMs:j}),Fl(n,i),jl(n,Ln),n}async function Xl(t,e=!1){if(e||k()||Ue())return;let n=await ot();if(!n&&!await x("autoSelectFirstDate"))return;za();let i=(t||[]).filter(c=>!(!c||!c.Time||c.EntriesAvailable!=null&&Number(c.EntriesAvailable)<=0));n&&(i=i.filter(c=>{let d=c.Date?String(c.Date).slice(0,10):null;return d?d>=n.from&&d<=n.to:!0}));let o=Ga(i);if(!o.length)return;let r=Date.now()+1e4;for(;Date.now()<r&&l.alive&&!(Yr(i)||document.querySelector(ja));)await new Promise(c=>l.setTimeout(c,j));let a=o.length===1?We:Ma;D(o.length===1?`1 time slot \u2014 try highest avail, wait \u2264${a/1e3}s for Submit\u2026`:`${o.length} time slots \u2014 try highest\u21922nd\u21923rd\u2026 (${a/1e3}s each for Submit)`);for(let c=0;c<o.length;c++){if(!l.alive||Ue()||k())return;let{entry:d,index:f,avail:h}=o[c],g=Ka(d.Time),y=d.Date?String(d.Date).slice(0,10):null,S=c===0?"highest":c===1?"2nd-highest":c===2?"3rd-highest":`${c+1}th-highest`;if(D(`Trying ${S} avail (${h}) @ ${g} \u2014 slot ${c+1}/${o.length}\u2026`),!await Ie({time:g,date:y,slotIndex:f,pollMs:j,maxMs:4e3,prefix:m})&&!V()){D(`Could not click ${g} \u2014 trying next\u2026`);continue}if(D(`Selected ${g} (${S}) \u2014 waiting \u2264${a/1e3}s for Submit to enable\u2026`),await so(a)){D(`Submit enabled on ${g} \u2014 clicking\u2026`),n?await co(n.accountId):ao();return}c<o.length-1&&D(`Submit still disabled on ${g} \u2014 trying next (${c+2}/${o.length})\u2026`)}D(`Tried all ${o.length} time slot(s); Submit never enabled.`),n&&lt()}async function Va(t){if(!K()||k())return;let e;try{e=Nl(t)}catch{return}if(e==null)return;if(ta(e),e.retryAfter!==void 0){let r=Number(e.retryAfter);or(e.cgiBlock,r),r?(pn(r),to(r)):x("defaultWaitTime").then(a=>{pn(a),to(a)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let r=e.response.Posts||[],a=new Map((await St()).map(c=>[c.ID,c]));for(let c of r)a.set(c.ID,{...a.get(c.ID),...c});await ee([...a.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let r=e.response.Members||[];if(r.length){let a=await G()||{},c=a.name&&r.find(d=>d.FullName===a.name);a.visa=(c||r[0]).VisaClassName,await $({profile:a,members:r})}}if(Fa.includes(e.tail)){ht(),Dr(e);let r=(e.response.ScheduleDays||[]).map(g=>zn(g?.Date)).filter(Boolean).length;r&&D(`${r} date${r===1?"":"s"} available \u2014 see list below`),r>0&&!e.response.HasError&&ut(),Ia();let a=await ot();await Qt()||x("defaultWaitTime").then(g=>{pn(g)});let d=await St(),f=d.find(g=>g.ID===e.params.postId);if(f&&(f.Days=e.response.ScheduleDays,f.Updated=Date.now(),f.HasError=e.response.HasError,f.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,ee(d)),await Wl(e.response.ScheduleDays,{postId:e.params.postId,postName:f?.Name,hasError:e.response.HasError}),!e.response.HasError&&r>0){let g=String(e.params.postId||"");D(`${r} date${r===1?"":"s"} \u2014 alerting others with this city\u2026`),oa({postId:g,postName:f?.Name,dayCount:r}).catch(()=>{})}if(await Hr(e.response.ScheduleDays,{postId:e.params.postId,postName:f?.Name,hasError:e.response.HasError}),Ge())ut(),D("Submit pending \u2014 staying on this city (date reload ignored)\u2026");else if(a&&!e.response.HasError){let g=On(e.response.ScheduleDays,a.from,a.to);g.length?(ut(),D(`${g.length} date${g.length===1?"":"s"} in range \u2014 selecting (city hold)\u2026`)):lt()}else a?lt():r>0&&!e.response.HasError&&(await x("autoSelectFirstDate")||lt());let h=Ge()?null:await Vl(e.response.ScheduleDays,e.response.HasError);if(h)ut(),await Br(f?.Name,h);else if(a&&!e.response.HasError&&!Ge()){let g=(e.response.ScheduleDays||[]).map(S=>zn(S?.Date)).filter(Boolean),y=g.filter(S=>ze(S,a.from,a.to));g.length&&!y.length?(lt(),D(`Dates found but none in ${a.from} \u2192 ${a.to}. Next city in 13\u201318s\u2026`)):g.length||(lt(),D("No dates on this city \u2014 next city in 13\u201318s\u2026"))}await di()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let r=e.params.Date.split("T")[0];zl(e.response.ScheduleEntries,r),za();let a=await St(),c=a.filter(f=>f.Days&&f.Updated).sort((f,h)=>h.Updated-f.Updated).find(f=>f.Days.some(h=>h.Date===r));if(c){let f=c.Days.find(h=>h.Date===r);f&&(f.Times=e.response.ScheduleEntries,ee(a))}let d=(e.response.ScheduleEntries||[]).filter(f=>f&&f.Time);if(Er(d,r,c?.Name),d.length){let f=d.filter(y=>y.EntriesAvailable==null||Number(y.EntriesAvailable)>0),h=f.reduce((y,S)=>{let C=Number(S.EntriesAvailable);return y+(Number.isFinite(C)?C:0)},0),g=h>0?` \xB7 ${h} available`:"";D(`${f.length||d.length} time slot${(f.length||d.length)===1?"":"s"} on ${r}${g}`)}await Xl(e.response.ScheduleEntries,e.response.HasError),Ge()?(ut(),D("Submit pending \u2014 staying on this city (time reload ignored)\u2026")):d.length?(ut(),await Fr(c?.Name,e.params.Date,d.length)):(lt(),D("No time slots on this date \u2014 next city in 13\u201318s\u2026")),await di()}}function Xa(t){if(!K()||k())return;let e=Ua(t.data.url);Fa.includes(e)&&Cr()}var Zt=null,yo="",go={scanning:"Scanning for Cloudflare challenge\u2026",dom:"Trying page-level verify click\u2026",debugger:"Advanced click \u2014 targeting Turnstile iframe\u2026",retry:"Waiting before next attempt\u2026",success:"Verification passed \u2014 continuing\u2026",manual:"Stuck? Click the checkbox once, then we\u2019ll continue."};function Qa(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=u.cfFlash,n.dataset[M.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),l.setTimeout(()=>n.remove(),1200)}}function Ql(){let t=document.querySelector(p(s.cfHud));return t||(t=document.createElement("div"),t.id=s.cfHud,t.dataset[M.mark]="",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.innerHTML=`
    <div class="${u.cfHud}">
      <div class="${u.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">\u{1F6E1}</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${go.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `,document.documentElement.appendChild(t),t)}async function B(t,e){if(!chrome.runtime?.id||!l.alive||!await x("autoCloudflareTick"))return;let n=Ql(),i=n.querySelector("[data-cf-msg]"),o=n.querySelector("[data-cf-sub]"),r=n.querySelector("[data-cf-chip]"),a=n.querySelector(`.${u.cfHud}`);yo=t,i&&(i.textContent=go[t]||go.scanning),o&&(o.textContent=e||Jl(t)),r&&(r.textContent=t==="success"?"Done":t==="manual"?"Help":"Active",r.dataset.state=t),a&&(a.dataset.state=t),Zt&&(l.clear(Zt),Zt=null),t==="success"&&(Zt=l.setTimeout(()=>bo(),2800))}function Jl(t){return t==="debugger"?"Precision click via advanced browser bridge":t==="dom"?"Standard page interaction":t==="manual"?"One manual click is usually enough":t==="success"?"Resuming login and recovery":"Monitoring this tab for Turnstile"}function bo(){let t=document.querySelector(p(s.cfHud));t&&t.remove(),yo="",Zt&&(l.clear(Zt),Zt=null)}function wo(){return yo}var Zl=/we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i,tu=/\bUSG\s+[a-f0-9-]{8,}/i;var xo="vsPortalErrorReloadCount",ts="vsPortalErrorReloadAt",eu=2e3,nu=1e4,Ja=!1,ye=null,iu=null;function ou(){return(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim()}function be(){let t=ou().slice(0,6e3);return t?!!(/a timeout occurred/i.test(t)&&(/error\s*524/i.test(t)||/origin web server timed out/i.test(t)||/cloudflare ray id/i.test(t))||/error\s*524/i.test(t)&&/cloudflare/i.test(t)&&t.length<8e3||Zl.test(t)&&(tu.test(t)||/error id\s*#/i.test(t))||/we'?re sorry,\s*but something went wrong/i.test(t)&&t.length<2500):!1}function es(){try{return Math.max(0,Number(sessionStorage.getItem(xo)||0))}catch{return 0}}function ru(){try{let t=es()+1;return sessionStorage.setItem(xo,String(t)),sessionStorage.setItem(ts,String(Date.now())),t}catch{return 1}}function So(){try{sessionStorage.removeItem(xo),sessionStorage.removeItem(ts)}catch{}}function au(t){return Math.min(nu,eu+Math.max(0,t-1)*1e3)}function su(){ye&&(l.clear(ye),ye=null)}function cu(){ru();try{location.reload()}catch{}}function Za(){if(!l.alive||ye)return;if(!be()){So();return}let t=es()+1,e=au(t);ye=l.setTimeout(()=>{if(ye=null,!!l.alive){if(!be()){So();return}cu()}},e)}function ns(){if(Ja)return;Ja=!0;let t=()=>{l.alive&&(be()?Za():(So(),su()))};t(),iu=l.setInterval(t,1500);try{let e=new MutationObserver(()=>{l.alive&&be()&&Za()});e.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),l.disposable(()=>e.disconnect())}catch{}}var jn="vsDebugLogs",lu=200;function uu(){try{return new Date().toLocaleTimeString("en-IN",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})}catch{return new Date().toISOString().slice(11,19)}}async function F(t,e,n){let i={at:Date.now(),t:uu(),tag:String(t||"app").slice(0,24),msg:String(e||"").slice(0,400)};if(n!=null)try{i.data=JSON.parse(JSON.stringify(n))}catch{i.data=String(n).slice(0,200)}try{console.log(`[VS6 ${i.tag}] ${i.msg}`,n!==void 0?n:"")}catch{}try{let o=await T({[jn]:[]}),r=Array.isArray(o[jn])?o[jn].slice():[];for(r.push(i);r.length>lu;)r.shift();await $({[jn]:r})}catch{}}var Vn=null,Ve=0,Ye=null,Dt=0,is=0,du=25e3;async function fu(){try{let e=(await T("humanClickProfile")).humanClickProfile,n=e?.liveTrained&&e.samples?.length||0;return n<5?15e3:n<20?1e4:n<50?6e3:3500}catch{return 12e3}}var Co=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function Q(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!U()&&!wo()}function U(){if(be()||document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return Co.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:vo().length>0}function Yn(t){return new Promise(e=>setTimeout(e,t))}function mu(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let i of n.querySelectorAll("*"))i.shadowRoot&&(t.push(i.shadowRoot),e.push(i.shadowRoot))}return t}function vo(){let t=[],e=new Set,n=i=>{if(!i||e.has(i))return;let o=i.getBoundingClientRect();if(o.width<40||o.height<20||o.width>900||o.height>400)return;let r=(i.src||i.getAttribute?.("src")||"").toLowerCase(),a=(i.title||i.getAttribute?.("title")||"").toLowerCase(),c=(i.className?.toString?.()||"").toLowerCase(),d=(i.id||"").toLowerCase(),f=i.tagName==="IFRAME"&&(r.includes("challenges.cloudflare")||r.includes("turnstile")||a.includes("cloudflare")||a.includes("security challenge")),h=c.includes("cf-turnstile")||c.includes("turnstile")||d.includes("turnstile")||d.includes("challenge")||i.hasAttribute?.("data-sitekey")||i.hasAttribute?.("data-turnstile-widget");if(!f&&!h)if(i.tagName==="IFRAME"&&o.width>=120&&o.width<=420&&o.height>=45&&o.height<=120){if(!Co.test(document.body?.innerText||""))return}else return;e.add(i),t.push({el:i,rect:o})};for(let i of mu()){for(let o of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let r of i.querySelectorAll(o))n(r);for(let o of i.querySelectorAll("iframe"))n(o)}return t}function pu(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function hu(t){let e=[],n=new Set,i=(o,r)=>{if(!Number.isFinite(o)||!Number.isFinite(r)||o<1||r<1||o>window.innerWidth-1||r>window.innerHeight-1)return;let a=`${Math.round(o)},${Math.round(r)}`;n.has(a)||(n.add(a),e.push({x:Math.round(o),y:Math.round(r)}))};for(let{rect:o}of t){let r=o.top+o.height/2,a=o.left+Math.min(28,Math.max(18,o.width*.11));for(let c of[0,-4,4,-8,8,12,16,20,24,28,32])for(let d of[0,-3,3,-6,6])i(a+c,r+d);i(o.left+o.width*.5,r)}return e}function gu(t){for(let{el:e,rect:n}of t)try{e.click();let i=n.left+Math.min(26,n.width*.12),o=n.top+n.height/2,r=document.elementFromPoint(i,o)||e;for(let a of["pointerdown","mousedown","mouseup","pointerup","click"])r.dispatchEvent(new MouseEvent(a,{bubbles:!0,cancelable:!0,clientX:i,clientY:o,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let i=n.getBoundingClientRect();if(i.width<4&&i.height<4)continue;let o=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!o.includes("human")&&!o.includes("verify")&&e==="input[type='checkbox']"){let r=n.closest("label, div, form");if(!Co.test(r?.textContent||""))continue}return n.click(),!0}return!1}async function os(t){t.length&&(Qa(t.slice(0,3)),l.send({action:"viewportClickPoints",points:t}),await x("cloudflareDebuggerClick")?(await B("debugger","Trained click on Verify you are human\u2026"),l.send({action:"cloudflareDebuggerClick",points:t,primaryOnly:!0})):await B("dom"))}function rs(){return/\/(schedule|ofc-schedule|c-schedule)\b/i.test(location.pathname||"")}function as(){if(!rs()||!U()||Q())return;let t=Date.now();if(!(t-is<du)){is=t,F("cf","verify-human on schedule \u2014 focusing Application Home for manual click"),B("manual","Verify you are human \u2014 opening Home tab so you can click it there\u2026").catch(()=>{});try{l.send({action:"focusHomeForVerify",ofcUrl:location.href})}catch{}}}async function Xn(){if(!await x("autoCloudflareTick"))return!1;if(Q())return Dt&&F("cf","challenge already solved"),Dt=0,await B("success"),!0;as(),Dt||(Dt=Date.now(),F("cf","challenge seen \u2014 train window started"));let t=await fu();if(Date.now()-Dt<t)return await B("scanning",rs()?"Opening Home \u2014 click Verify you are human on the Home tab\u2026":"Train window \u2014 click Verify you are human yourself (recording your mouse)\u2026"),!1;F("cf","train window done \u2014 attempting auto click"),await B("scanning","Verify you are human page \u2014 preparing click\u2026");let e=vo();pu(e),await Yn(350),e=vo();let n=hu(e);return n.length&&(await os(n),await Yn(1200),Q()||!U())?(Dt=0,await B("success"),!0):(await B("dom"),gu(e),await Yn(600),Q()||!U()?(Dt=0,await B("success"),!0):n.length&&(await os(n),await Yn(1e3),Q()||!U())?(Dt=0,await B("success"),!0):(Ve++,Ve>=8?await B("manual","Click the checkbox once \u2014 we will continue after."):await B("retry",`Retry ${Ve}/8\u2026`),!1))}function yu(){Ye||(Ye=new MutationObserver(()=>{l.alive&&U()&&!Q()&&(as(),Xn())}),Ye.observe(document.documentElement,{childList:!0,subtree:!0}),l.disposable(()=>{Ye?.disconnect(),Ye=null}))}function To(){Vn&&(l.clear(Vn),Vn=null),Ve=0,Dt=0,bo()}async function _o(){if(To(),!await x("autoCloudflareTick"))return;yu();let t=async()=>{if(l.alive&&await x("autoCloudflareTick")){if(U()&&!Q()){await Xn();return}wo()&&(Ve=0,await B("success"))}};t(),Vn=l.setInterval(t,1800)}var we="sessionRecovery",$o="homeKeepaliveAt",ko="homeLoadingStuckAt",Do="vsResubmitContinue",ss=2e3,Jn=!1,cs=null,Mo=null,Ao=null,Qn=null,Xe=0;function Po(){try{let t=new URL(location.href);return t.searchParams.set("_vsr",String(Date.now()%1e12)),location.replace(t.pathname+t.search+t.hash),!0}catch{try{return location.href=location.pathname+location.search,!0}catch{return!1}}}function ms(){try{if(sessionStorage.getItem(Do)!=="1")return!1;sessionStorage.removeItem(Do)}catch{return!1}return yt()||document.querySelector("#post_select")?!1:(Po(),!0)}function ls(){return w.homeKeepaliveMinMs}function bu(){return w.homeKeepaliveMaxMs}function wu(){return w.homeKeepaliveDebounceMs}function us(){return w.loadingStuckMs}function Su(){return w.loadingStuckDebounceMs}function ds(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function xu(t,e){let n=ds(t);if(!n)return"";let i="",o=0;for(let r of e||[]){let a=ds(r.q);if(!a||!r.a)continue;if(n.includes(a)||a.includes(n))return r.a;let c=a.split(" ").filter(h=>h.length>3),d=0;for(let h of c)n.includes(h)&&d++;let f=c.length?d/c.length:0;f>o&&f>=.5&&(o=f,i=r.a)}return i}async function vu(){let t=await T([qt,"profile"]),e=t[qt]||{},n=t.profile?.id?String(t.profile.id):null,i=n?e[n]:null;return i||(i=Object.values(e).find(o=>o?.loginId&&o?.loginPass)||null),i||{}}function fs(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,i=Object.getOwnPropertyDescriptor(n,"value")?.set;i?i.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function Ht(t){return new Promise(e=>setTimeout(e,t))}function gt(t,e){return t+Math.random()*(e-t)}async function Eo(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await Ht(gt(250,600)),fs(t,"");let i="";for(let o=0;o<n.length;o++){let r=n[o];i+=r,fs(t,i),t.dispatchEvent(new KeyboardEvent("keydown",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:r,bubbles:!0}));let a=gt(90,220);/[\s@._]/.test(r)&&(a+=gt(120,320)),Math.random()<.08&&(a+=gt(200,450)),await Ht(a)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await Ht(gt(200,500))}var Zn=!1,ti=!1;function ei(t){return!t||t.disabled?!1:(t.click(),!0)}function Cu(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let i of t){let o=(i.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(o))continue;let r=i.querySelector("input[type='checkbox']")||document.getElementById(i.getAttribute("for")||"");r&&!r.checked&&(ei(r),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(i=>/^(continue|ok|accept|agree)$/i.test((i.textContent||i.value||"").trim()));return e&&n&&ei(n),e>0}function ps(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function Tu(t){if(Zn)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;Zn=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await Eo(e,t.loginId),await Ht(gt(400,900))),n&&t.loginPass&&!n.value&&(await Eo(n,t.loginPass),await Ht(gt(500,1100)));let i=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(o=>/sign in|log in|continue/i.test(o.textContent||o.value||""));return i&&(n?.value||t.loginPass)?(await Ht(gt(600,1400)),ei(i),!0):!!(e||n)}finally{Zn=!1}}async function _u(t){if(ti)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let o of n){let r=(o.textContent||"").trim();if(r.length<12||r.length>220||!/\?/.test(r)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(r))continue;let a=o.querySelector("input[type='text']")||document.getElementById(o.getAttribute("for")||"")||o.parentElement?.querySelector("input[type='text']");a&&a.offsetParent!==null&&e.push({text:r,input:a})}for(let o of["kba1_response","kba2_response","kba3_response"]){let r=document.getElementById(o);if(!r)continue;let c=(r.closest(".form-group, .entry, li, div")||r.parentElement)?.textContent||"";e.some(d=>d.input===r)||e.push({text:c,input:r})}let i=[];for(let{text:o,input:r}of e){if(r.value)continue;let a=xu(o,t.security);a&&i.push({input:r,ans:a})}if(!i.length)return!1;ti=!0;try{for(let{input:r,ans:a}of i)await Eo(r,a),await Ht(gt(350,800));await Ht(gt(600,1400));let o=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(r=>/continue|submit|verify/i.test(r.textContent||r.value||""));return o&&ei(o),!0}finally{ti=!1}}function hs(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||U()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function yt(){return pt()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function $u(t=""){return/\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(t||""))}function Io(){if(yt()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||U()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}function ku(t){return!!(t?.loginId&&t?.loginPass)}function Mu(){return hs()?!1:!!(ps()||document.querySelector("#kba1_response, #kba2_response, #kba3_response")||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))}async function Au(){let t=(await T(we))[we],e=!!t?.active,n=await vu();if(U()){await Xn();return}if(Cu(),hs()){e&&(await $({[we]:{...t,active:!1,doneAt:Date.now()}}),l.send({action:"recoveryReturnToOfc"}));return}Mu()&&ku(n)&&await x("autofillLogin")&&(await _u(n)||(ps()||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))&&await Tu(n))}function gs(){if(!Io()||cs)return;let t=async()=>{l.alive&&await Au()};t(),cs=l.setInterval(t,1200)}function ys(){return ls()+Math.random()*(bu()-ls())}async function bs(){try{let t=await T($o),e=Number(t[$o])||0;return Date.now()-e<wu()?!1:(await $({[$o]:Date.now()}),!0)}catch{return!0}}function ws(){if(yt()||!Io()||document.querySelector("#post_select")||Mo)return;let t=()=>{l.alive&&(Mo=l.setTimeout(async()=>{if(Mo=null,!l.alive||yt()||$u(location.href)||document.querySelector("#post_select")||!Io())return;if(Zn||ti||Jn){t();return}if((await T(we))[we]?.active){t();return}if(!await bs()){t();return}try{Po()}catch{t()}},ys()))};t()}function Ss(){if(!yt()||Ao)return;let t=()=>{l.alive&&(Ao=l.setTimeout(async()=>{if(Ao=null,!(!l.alive||!yt())){if(await bs())try{l.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}t()}},ys()))};t()}async function Du(){try{let t=await T(ko),e=Number(t[ko])||0;return Date.now()-e<Su()?!1:(await $({[ko]:Date.now()}),!0)}catch{return!0}}function xs(){if(!yt()||Qn)return;let t=async()=>{if(Qn=null,!(!l.alive||!yt())){try{if(Ji()){if(Xe||(Xe=Date.now()),Date.now()-Xe>=us()){if(await Du()){try{D(`Date Loading stuck \u2265${us()/1e3}s \u2014 reloading Application Home\u2026`)}catch{}try{l.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}}Xe=Date.now()}}else Xe=0}catch{}l.alive&&yt()&&(Qn=l.setTimeout(t,ss))}};Qn=l.setTimeout(t,ss)}async function vs(t){let e=String(t||"");if(/form resubmission|information that you entered|action that you took to be repeated|returning to that page might cause/i.test(e)){if(!yt()&&!document.querySelector("#post_select")){try{sessionStorage.setItem(Do,"1")}catch{}l.setTimeout(()=>Po(),300)}return}if(!/PSE0501|unable to load appointment available days/i.test(e)||Jn)return;Jn=!0,l.setTimeout(()=>{Jn=!1},8e3);let n=await R();await $({[we]:{active:!0,ofcUrl:location.href,accountId:n,startedAt:Date.now()}}),l.send({action:"recoveryStart",ofcUrl:location.href})}var ii="humanClickProfile",qo=150,No=120,Eu=250,Cs=!1,wt=[],ni=0,rt=0,Bt=0,P=null,Ro=0,Je=!1,Se=null,oi=0,ai=0,Ze=[],bt=!1,te=!1;function Iu(){let t=[];for(let e of document.querySelectorAll('iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]')){let n=e.getBoundingClientRect();n.width<40||n.height<20||n.width>900||n.height>400||t.push(n)}if(!t.length&&U())for(let e of document.querySelectorAll("iframe")){let n=e.getBoundingClientRect();n.width>=120&&n.width<=420&&n.height>=45&&n.height<=120&&t.push(n)}return t}function tn(){let t=Iu();if(!t.length)return null;let e=t[0];return{x:e.left+Math.min(28,Math.max(18,e.width*.11)),y:e.top+e.height/2,w:e.width,h:e.height,left:e.left,top:e.top}}function xe(t,e,n){return n?t>=n.left-40&&t<=n.left+n.w+40&&e>=n.top-30&&e<=n.top+n.h+30:!1}function ks(t){let e=performance.now();ni||(ni=e);let n=P,i=n?(t.clientX-n.x)/Math.max(24,n.w*.12):0,o=n?(t.clientY-n.y)/Math.max(20,n.h*.5):0;wt.push({nx:Math.round(i*1e3)/1e3,ny:Math.round(o*1e3)/1e3,x:Math.round(t.clientX),y:Math.round(t.clientY),t:Math.round(e-ni)}),wt.length>No&&wt.shift()}async function si(){return(await T(ii))[ii]||{version:2,maxSamples:qo,samples:[],avgHoverMs:420,avgPressMs:70,avgApproachMs:800,liveTrained:!1}}function Lo(t,e,n){if(!t.length)return n;let i=t.reduce((o,r)=>o+(Number(r[e])||0),0);return Math.round(i/t.length)}async function Ms(t,{force:e=!1}={}){let n=Date.now();if(!e&&n-Ro<Eu)return null;Ro=n;let i=await si(),o=Array.isArray(i.samples)?i.samples.slice():[];for(t.clientId||(t.clientId=`hc-${t.at||n}-${Math.random().toString(36).slice(2,10)}`),t.uploaded=!1,o.push(t);o.length>qo;)o.shift();let r={version:2,maxSamples:qo,samples:o,avgHoverMs:Lo(o,"hoverMs",420),avgPressMs:Lo(o,"pressMs",70),avgApproachMs:Lo(o,"approachMs",800),updatedAt:n,liveTrained:!0,source:"visa-page-live"};return await $({[ii]:r}),oi=o.length,F("human",`saved sample locally #${o.length}`,{capture:t.capture||"page",pressMs:t.pressMs,hoverMs:t.hoverMs,pathPts:Array.isArray(t.path)?t.path.length:0,clientId:t.clientId}),As(t,r).catch(()=>{}),Ds().catch(()=>{}),r}async function Pu(t){if(!t)return;let e=await si(),n=Array.isArray(e.samples)?e.samples.slice():[],i=!1;for(let o of n)o?.clientId===t&&!o.uploaded&&(o.uploaded=!0,i=!0);i&&await $({[ii]:{...e,samples:n,updatedAt:Date.now()}})}async function As(t,e){try{if(!await x("serverSync"))return F("upload","skipped \u2014 serverSync is OFF"),!1;let n=await G()||{},i=t.clientId||`hc-${t.at||Date.now()}-${Math.random().toString(36).slice(2,8)}`;t.clientId=i;let o={client_id:i,profile:{id:n.id||"",email:n.email||"",name:n.name||"",visa:n.visa||""},sample:t,profile_meta:{sampleCount:e?.samples?.length||0,avgHoverMs:e?.avgHoverMs,avgPressMs:e?.avgPressMs,avgApproachMs:e?.avgApproachMs,liveTrained:!0,source:"visa-page-live",extensionHost:location.host}};F("upload",`sending sample ${i}`,{sampleCount:e?.samples?.length||0,email:n.email||""}),l.send({action:"uploadHumanClickSample",payload:o});try{chrome.runtime.sendMessage({action:"uploadHumanClickSample",payload:o},r=>{if(chrome.runtime.lastError){F("upload",`SW error: ${chrome.runtime.lastError.message}`);return}r?.success?(F("upload",`server OK id=${r.id??"?"} status=${r.status??""}`,{clientId:i}),Pu(i)):F("upload",`server FAIL ${r?.error||r?.status||"unknown"}`,{clientId:i})})}catch(r){F("upload",`sendMessage threw: ${r?.message||r}`)}return!0}catch(n){return F("upload",`upload threw: ${n?.message||n}`),!1}}async function Ds(){try{if(!await x("serverSync"))return;let t=await si(),n=(Array.isArray(t.samples)?t.samples:[]).filter(i=>i&&i.uploaded!==!0).slice(-40);for(let i of n)await As(i,t),await new Promise(o=>setTimeout(o,80))}catch{}}function Es(t,e={}){let n=performance.now(),i=Math.max(25,Math.min(500,rt?n-rt:70)),o=Math.max(30,Math.min(3e3,rt?rt-(Bt||rt):200)),r=(wt.length?wt:Ze).slice(-No),a=r.length?r[r.length-1].t:o,c=Math.max(o,Math.min(12e3,a||o)),d=Se,f=P||tn();return{hoverMs:Math.round(o),pressMs:Math.round(i),approachMs:Math.round(c),path:r,down:d?{x:Math.round(d.x),y:Math.round(d.y)}:null,up:t?{x:Math.round(t.clientX),y:Math.round(t.clientY)}:d?{x:Math.round(d.x),y:Math.round(d.y)}:f?{x:Math.round(f.x),y:Math.round(f.y)}:null,target:f?{x:Math.round(f.x),y:Math.round(f.y),w:Math.round(f.w),h:Math.round(f.h),left:Math.round(f.left),top:Math.round(f.top)}:null,viewport:{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio||1,scrollX:Math.round(window.scrollX||0),scrollY:Math.round(window.scrollY||0)},pointerType:t?.pointerType||"mouse",url:location.pathname+location.search,at:Date.now(),...e}}function Qe(){wt.length&&(Ze=wt.slice(-No)),wt=[],ni=0,rt=0,Bt=0,Se=null}function Wo(){Je||(Je=!0,te=!0,Qe(),P=tn())}function Oo(){Je=!1,P=null,bt=!1,Qe()}function ri(t){let e=t?.target;if(!e)return!1;if(e.closest?.(".cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]"))return!0;if(e.tagName==="IFRAME"){let n=(e.src||"").toLowerCase();if(n.includes("challenges.cloudflare")||n.includes("turnstile"))return!0;let i=e.getBoundingClientRect();if(i.width>=120&&i.width<=420&&i.height>=45&&i.height<=120)return!0}return!1}async function Ts(t){if(l.alive){if(!U()||Q()){Je&&Oo();return}Wo(),P||(P=tn()),!Bt&&P&&xe(t.clientX,t.clientY,P)&&(Bt=performance.now()),P&&xe(t.clientX,t.clientY,P)&&(ai=Date.now()),ks(t)}}async function _s(t){if(!(!l.alive||t.button!==0)&&!(!U()||Q())){Wo(),P=tn(),rt=performance.now(),Bt||(Bt=rt),Se={x:t.clientX,y:t.clientY},ks(t),(ri(t)||P&&xe(t.clientX,t.clientY,P))&&(bt=!0,ai=Date.now()),F("human","pointer down during challenge",{onWidget:ri(t),near:!!(!P||xe(t.clientX,t.clientY,P)),x:Math.round(t.clientX),y:Math.round(t.clientY)});try{B("scanning",`Recording click\u2026 (saved ${oi} so far)`)}catch{}}}async function $s(t){if(!l.alive||t.button!==0||!rt&&!bt)return;if(!U()&&!Q()){Qe();return}if(!(P&&xe(t.clientX,t.clientY,P)||P&&Se&&xe(Se.x,Se.y,P)||ri(t)||bt||!P&&(wt.length>=2||Ze.length>=2))&&wt.length<2&&Ze.length<2){Qe();return}let n=Es(t,{capture:bt||ri(t)?"iframe-or-widget":"page"});bt=!1,Qe();let i=await Ms(n);if(!i)return;let o=i.samples?.length||0;try{B("success",`Saved verify-human click #${o} \u2014 uploaded to server`)}catch{}}async function Lu(){let t=Date.now();if(!te||!Q()&&U())return;if(!(bt||t-ai<8e3||Ze.length>=2&&t-Ro>500)){te=!1,Oo();return}let n=Es(null,{capture:"challenge-solved"});bt=!1,te=!1,Oo();let i=await Ms(n,{force:!0});if(!i)return;let o=i.samples?.length||0;try{B("success",`Saved verify-human click #${o} (after checkbox) \u2014 uploaded to server`)}catch{}}async function qu(){try{let t=await si(),e=t.liveTrained&&t.samples?.length||0;return oi=e,e}catch{return oi}}function Is(){if(Cs)return;Cs=!0,F("human","train watcher started",{path:location.pathname}),l.on(window,"pointermove",Ts,{passive:!0,capture:!0}),l.on(window,"pointerdown",_s,{passive:!0,capture:!0}),l.on(window,"pointerup",$s,{passive:!0,capture:!0}),l.on(window,"mousemove",Ts,{passive:!0,capture:!0}),l.on(window,"mousedown",_s,{passive:!0,capture:!0}),l.on(window,"mouseup",$s,{passive:!0,capture:!0}),l.on(window,"blur",()=>{!U()||Q()||(bt=!0,ai=Date.now(),rt||(rt=performance.now(),Bt||(Bt=rt)),F("human","page blur during challenge (likely iframe click)"))});let t=async()=>{if(!l.alive)return;if(U()&&!Q()){te||F("human","challenge detected \u2014 recording armed"),te=!0,Wo(),P||(P=tn());let n=await qu();try{B("scanning",n?`Train mode \u2014 click Verify you are human naturally (saved ${n})`:"Train mode \u2014 move mouse naturally, then click Verify you are human (recording\u2026)")}catch{}return}(te||Je||bt)&&await Lu()};t(),l.setInterval(t,1200),l.setTimeout(()=>{F("upload","flushing unsynced local samples\u2026"),Ds().catch(()=>{})},2500)}var Ru=`
#${s.selRow} {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 11em;
  gap: 0.5em;
  width: max-content;
  max-width: 100%;
  margin: 0.25em auto 0;
  align-items: center;
}
#${s.waitTime} {
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
#${s.waitTime}[data-dragging] {
  cursor: grabbing;
  transition: none;
}
#${s.waitTime}[data-dodging] {
  box-shadow: 0 0 0 2px #22c55e, 0 2px 12px rgba(0,0,0,0.35);
}
#${s.recheck} {
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

#${s.waitTime} .${u.pill} {
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  white-space: nowrap;
}

#${s.waitTime} .${u.pillTtl} {
  flex: 1;
  min-width: 0;
  padding: 0.35em 0.5em;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}

#${s.waitTime} .${u.pillTmr} {
  display: flex;
  align-items: center;
  padding: 0.35em 0.55em;
  border-radius: 5px 0 0 5px;
  background: rgba(255, 255, 255, 0.25);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-variant-numeric: tabular-nums;
}

#${s.waitTime} .${u.pillWait} { background-color: rgba(255, 0, 0, 0.35); color: #5c0000; }
#${s.waitTime} .${u.pillDone} { background-color: #1a4480; color: white; }

#atlas-sidebar .${u.sideLink} { background-color: #1a4480; color: white; }
#${s.datesPara} { margin: 0.5em 0; line-height: 1.45; }

#${s.datesCont} .${u.datesLnk} { color: white; }
#${s.datesCont} .${u.slotsSum} {
  font-weight: 700;
  font-size: 1.05em;
  margin-bottom: 0.4em;
  color: #0b3d2e;
}
#${s.datesCont} .${u.slotsTbl},
#${s.slotsTbl} {
  width: auto;
  min-width: 220px;
  border-collapse: collapse;
  margin: 0.25em 0 0.5em;
  font-size: 0.95em;
}
#${s.datesCont} .${u.slotsTbl} th,
#${s.datesCont} .${u.slotsTbl} td,
#${s.slotsTbl} th,
#${s.slotsTbl} td {
  border: 1px solid #cbd5e0;
  padding: 0.3em 0.75em;
  text-align: left;
}
#${s.datesCont} .${u.slotsTbl} th,
#${s.slotsTbl} th {
  background: #edf2f7;
  font-weight: 600;
}
#${s.ofcDate} { font-weight: bold; }

.${u.card} {
  max-width: 400px;
  width: 100%;
  text-align: center;
  font-family: inherit;
}
#${s.histCont} { margin: 15px auto 0; }
#${s.cdCard} {
  margin: 20px auto 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 20px;
  box-sizing: border-box;
}

#${s.histCont} .${u.cardTtl} {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
}
#${s.histCont} .${u.histScrl} {
  max-height: 250px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #ffffff;
}
#${s.histTbl} {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  color: #2d3748;
}
#${s.histTbl} thead tr {
  border-bottom: 1px solid #e2e8f0;
  background: #edf2f7;
  position: sticky;
  top: 0;
}
#${s.histTbl} th {
  padding: 6px 10px;
  text-align: center;
  font-weight: 600;
  color: #4a5568;
}
#${s.histTbl} tbody tr { border-bottom: 1px solid #e2e8f0; }
#${s.histTbl} td {
  padding: 6px 10px;
  text-align: center;
  color: #718096;
}

#${s.histTbl} td.${u.dltDn} { color: #10b981; font-weight: 500; }
#${s.histTbl} td.${u.dltUp} { color: #ef4444; font-weight: 500; }

#${s.cdCard} .${u.cardTtl} {
  margin: 0 0 12px 0;
  font-size: 12px;
  font-weight: 700;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
#${s.cdTime} {
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin: 10px 0 15px;
  font-family: monospace, inherit;
}

#${s.cdTime}.${u.cdDiv}-over { font-size: 20px; }
.${u.cdDiv} {
  border-top: 1px solid #edf2f7;
  margin-top: 15px;
  padding-top: 12px;
}

.${u.footer} { font-size: 11px; }
#${s.histCont} .${u.footer} { margin-top: 8px; }
#${s.cdCard} .${u.footer} { margin: 0; }

#${s.histCont} .${u.footer} a,
#${s.cdCard} .${u.footer} a {
  color: #1a4480;
  text-decoration: none;
  font-weight: 500;
}

.${u.hidden} { display: none; }

#${s.aiBtn} {
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
#${s.aiBtn}.${u.aiOn} {
  background-color: #22c55e;
  box-shadow: none;
}
#${s.aiPanel} {
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
#${s.aiPanel}.${u.hidden} {
  display: none !important;
}
#${s.aiPanel} .${u.cardTtl} {
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
#${s.aiPanel} .${u.aiHint} {
  margin: 0 0 8px;
  font-size: 14.5px;
  line-height: 1.5;
  color: #6b7280;
  font-weight: 400;
}
#${s.aiPanel} .${u.aiHead} {
  font-weight: 700;
  color: #111827;
  font-size: 16px;
}
#${s.aiPanel} .${u.aiRow} {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}
#${s.aiPanel} .${u.aiSec} {
  margin: 0;
  padding: 16px 18px;
  background: #fff;
  border: 1.5px solid #111827;
  border-radius: 12px;
  box-sizing: border-box;
}
#${s.aiTermsGate},
#${s.aiMain} {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;
  padding: 0;
}
#${s.aiTermsGate}.${u.hidden},
#${s.aiMain}.${u.hidden} {
  display: none;
}
#${s.aiPanel} .${u.aiInfo} {
  margin: 0 0 10px;
  padding: 10px 12px;
  background: #eff6ff;
  border: 1px solid #93c5fd;
  border-radius: 8px;
  color: #1e40af;
  font-size: 14.5px;
  line-height: 1.5;
}
#${s.aiPanel} .${u.aiWarn} {
  margin: 0 0 10px;
  padding: 10px 12px;
  background: #fffbeb;
  border: 1px solid #f59e0b;
  border-radius: 8px;
  color: #92400e;
  font-size: 14.5px;
  line-height: 1.5;
}
#${s.aiPanel} .${u.aiOk},
#${s.aiStatus}.${u.aiOk} {
  margin: 0;
  padding: 10px 12px;
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 8px;
  color: #166534;
  font-size: 14.5px;
  line-height: 1.5;
}
#${s.aiPanel} label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14.5px;
  font-weight: 600;
  color: #374151;
}
#${s.aiPanel} input[type="text"],
#${s.aiPanel} input[type="password"],
#${s.aiPanel} input[type="email"],
#${s.aiPanel} select {
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
#${s.aiPanel} .${u.aiDateBtn} {
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
#${s.aiPanel} .${u.aiDateBtn}:hover {
  border-color: #2563eb;
  background: #eff6ff;
}
#${s.aiCal} {
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
#${s.aiCal}.${u.hidden} { display: none !important; }
#${s.aiCal} .${u.aiCalHead} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
}
#${s.aiCal} .${u.aiCalHead} .${u.aiHead} {
  font-size: 17px;
  margin: 0;
  flex: 1;
  text-align: center;
}
#${s.aiCal} .${u.aiCalHead} button {
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
#${s.aiCal} .${u.aiCalGrid} {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}
#${s.aiCal} .${u.aiCalGrid} .${u.aiHint} {
  margin: 0;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: #6b7280;
  padding: 4px 0;
  pointer-events: none;
}
#${s.aiCal} .${u.aiCalDay} {
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
#${s.aiCal} .${u.aiCalDay}:hover {
  background: #eff6ff;
  border-color: #93c5fd;
}
#${s.aiCal} .${u.aiCalDay}.${u.aiCalMuted} {
  color: #9ca3af;
  font-weight: 500;
  background: #f9fafb;
}
#${s.aiCal} .${u.aiCalDay}:disabled,
#${s.aiCal} .${u.aiCalDay}[aria-disabled="true"] {
  opacity: 0.4;
  cursor: not-allowed;
  background: #f3f4f6;
  color: #9ca3af;
  pointer-events: none;
}
#${s.aiCal} .${u.aiCalDay}.${u.aiCalToday} {
  border-color: #3b82f6;
}
#${s.aiCal} .${u.aiCalDay}.${u.aiCalOn} {
  background: #3b82f6;
  border-color: #2563eb;
  color: #fff;
}
#${s.aiCal} .${u.aiRow} {
  margin: 12px 0 0;
  justify-content: space-between;
}
#${s.aiCal} .${u.aiRow} button {
  background: #eef0f3;
  color: #111827;
  min-height: 40px;
  font-size: 14.5px;
  cursor: pointer;
}
#${s.aiPanel} input[type="text"]:focus,
#${s.aiPanel} input[type="password"]:focus,
#${s.aiPanel} input[type="email"]:focus,
#${s.aiPanel} select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: none;
}
#${s.aiPanel} button {
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14.5px;
  font-weight: 600;
}
#${s.aiClose} { background: #eef0f3; color: #374151; }
#${s.aiSaveLogin} { background: #374151; color: #fff; }
#${s.aiWinAdd}, #${s.aiWinSave} { background: #3b82f6; color: #fff; }
#${s.aiWinReset} { background: #eef0f3; color: #374151; }
#${s.aiLoginToggle} { background: #eef0f3; color: #111827; }

#${s.aiPanel} .${u.aiSwitch} {
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
#${s.aiPanel} .${u.aiSwitch}.${u.aiOnBtn} {
  background: #3b82f6;
  box-shadow: none;
}
#${s.aiPanel} .${u.aiKnob} {
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
#${s.aiPanel} .${u.aiSwitch}.${u.aiOnBtn} .${u.aiKnob} {
  transform: translateX(20px);
}

#${s.aiStatus} { margin: 0; }
#${s.aiPanel} .${u.aiCities} {
  max-height: 150px;
  overflow: auto;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 10px;
  margin-bottom: 0;
  background: #f9fafb;
}
#${s.aiPanel} .${u.aiCityAct} {
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
#${s.aiPanel} .${u.aiCityAct}:hover { color: #2563eb; }
#${s.aiPanel} .${u.aiCities} label {
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  margin: 5px 0;
  color: #1f2937;
  font-size: 14.5px;
}
#${s.aiPanel} .${u.aiCities} input[type="checkbox"] {
  margin: 0;
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
}
#${s.aiPanel} .${u.aiRow} label { flex: 1; min-width: 140px; }

#${s.aiWinList} {
  display: grid;
  gap: 10px;
  margin: 0 0 6px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
}
#${s.aiPanel} .${u.aiWinRow} {
  display: grid;
  gap: 4px;
  padding: 12px;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}
#${s.aiPanel} .${u.aiWinRow}:last-child {
  padding-bottom: 12px;
}
#${s.aiPanel} .${u.aiInline} {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
#${s.aiPanel} .${u.aiInline} select {
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
#${s.aiPanel} .${u.aiInline} .${u.aiHead} {
  margin: 0;
  flex-direction: row;
  font-size: 14.5px;
}
#${s.aiPanel} .${u.aiWinHelp} {
  font-size: 14.5px;
  color: #6b7280;
  margin-left: 2px;
}
#${s.aiPanel} .${u.aiTrash} {
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
#${s.aiPanel} .${u.aiTrash}:hover { background: #fef2f2; }
#${s.aiWinNote} { margin: 0 0 8px; font-size: 14.5px; color: #6b7280; }

#${s.aiPanel} .${u.aiTerms} {
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
#${s.aiPanel} .${u.aiTerms} .${u.aiHead} {
  margin: 0 0 6px;
  font-size: 20px;
  text-align: center;
}
#${s.aiPanel} .${u.aiTerms} .${u.aiHint} {
  text-align: center;
  margin: 0 0 14px;
}
#${s.aiPanel} .${u.aiTermsList} {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  display: grid;
  gap: 10px;
}
#${s.aiPanel} .${u.aiTermsList} li {
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
#${s.aiPanel} .${u.aiTermsList} li::before {
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
#${s.aiPanel} .${u.aiTermsCb} {
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
#${s.aiPanel} .${u.aiTermsCb} input[type="checkbox"] {
  margin: 2px 0 0;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  accent-color: #3b82f6;
}
#${s.aiPanel} .${u.aiContinue} {
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
#${s.aiPanel} .${u.aiContinue}:disabled {
  background: #94a3b8;
  cursor: not-allowed;
  opacity: 0.75;
}
#${s.aiTermsContinue}:not(:disabled) {
  background: #2563eb;
}

#${s.cfHud} {
  position: fixed;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2147483646;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
#${s.cfHud} .${u.cfHud} {
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
#${s.cfHud} .${u.cfHud}[data-state="success"] {
  border-color: rgba(34, 197, 94, 0.45);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 24px rgba(34, 197, 94, 0.15);
}
#${s.cfHud} .${u.cfHud}[data-state="manual"] {
  border-color: rgba(251, 191, 36, 0.45);
}
#${s.cfHud} .${u.cfHud}[data-state="debugger"] {
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.32), 0 0 28px rgba(59, 130, 246, 0.18);
}
#${s.cfHud} .${u.cfPulse} {
  width: 10px;
  height: 10px;
  margin-top: 5px;
  border-radius: 50%;
  background: #60a5fa;
  box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.55);
  animation: ${m}cfpulse 1.6s ease-out infinite;
  flex-shrink: 0;
}
#${s.cfHud} .${u.cfHud}[data-state="success"] .${u.cfPulse} {
  background: #4ade80;
  animation: none;
  box-shadow: 0 0 12px rgba(74, 222, 128, 0.65);
}
#${s.cfHud} .${u.cfHud}[data-state="manual"] .${u.cfPulse} {
  background: #fbbf24;
}
@keyframes ${m}cfpulse {
  0% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.55); }
  70% { box-shadow: 0 0 0 10px rgba(96, 165, 250, 0); }
  100% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0); }
}
#${s.cfHud} .cf-hud-body { flex: 1; min-width: 0; }
#${s.cfHud} .cf-hud-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
#${s.cfHud} .cf-hud-icon { font-size: 14px; line-height: 1; }
#${s.cfHud} .cf-hud-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #f8fafc;
}
#${s.cfHud} .cf-hud-chip {
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
#${s.cfHud} .cf-hud-chip[data-state="success"] {
  background: rgba(34, 197, 94, 0.18);
  color: #86efac;
  border-color: rgba(74, 222, 128, 0.35);
}
#${s.cfHud} .cf-hud-chip[data-state="manual"] {
  background: rgba(251, 191, 36, 0.15);
  color: #fcd34d;
  border-color: rgba(251, 191, 36, 0.35);
}
#${s.cfHud} .cf-hud-msg {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.35;
  color: #f1f5f9;
}
#${s.cfHud} .cf-hud-sub {
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
`;function Ps(){if(document.querySelector(p(s.styles)))return;let t=document.createElement("style");t.id=s.styles,t.dataset[M.mark]="",t.textContent=Ru,(document.head||document.documentElement).appendChild(t)}tr();po();Bo(()=>{Ra(),l.destroy()});lr();ns();k()&&R().then(t=>{if(t)return En(t);me()}).catch(()=>me());if(!k()){l.disposable(()=>{let i=document.querySelector(p(s.anchor)),o=document.querySelector("#post_select");i&&o&&i.replaceWith(o);for(let r of document.querySelectorAll("[data-"+M.mark+"]"))r.remove()}),Ps(),l.send({action:"registerBlockGuard",prefix:m}),l.send({action:"registerRedirect",prefix:m}),l.send({action:"registerAlertGuard",prefix:m}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&l.send({action:"registerOfcReader",prefix:m}),l.on(window,"message",i=>{if(l.alive&&i.source===window)switch(i.data?.action){case Et.req:return Xa(i);case Et.res:return Va(i);case Et.ofc:return Pr(i);case Et.err:return qe("native_alert",i.data?.text),Be(String(i.data?.text||"alert").slice(0,120)),vs(i.data?.text);case Et.sub:kr(),Le(),Ur(),ot().then(o=>{Ke(o?.accountId||null)}).catch(()=>{Ke(null)});return}}),chrome.storage.onChanged.addListener((i,o)=>{o==="local"&&(i.profile&&_i(),i.waitPillClock&&_r(i.waitPillClock.newValue),i.autoCloudflareTick&&(i.autoCloudflareTick.newValue?_o():To()))}),l.on(document,"click",i=>{ce();let o=i.target.closest(p(s.waitTime));if(o){if(o.dataset.skipClick){delete o.dataset.skipClick;return}Tr()}}),l.on(document,"keydown",ce),l.on(window,"focus",()=>ce({keepConsular:!0})),l.on(document,"visibilitychange",()=>{document.hidden||ce({keepConsular:!0})}),Mr(),ms(),gs(),ws(),Ss(),xs(),Is(),_o();async function t(){!l.alive||k()||!pt()||document.querySelector("#post_select")&&(ht(),await Promise.all([xi(),Ci(),ho()]),jr({slotIndex:Ln,shouldPick:async()=>await ot()?!0:!!await x("autoSelectFirstDate"),onSlotPicked:()=>Oa()}))}async function e(){!l.alive||k()||!pt()||await qa()}async function n(){ir(),rr(),await Promise.all([_i(),sr(),ar(),xi(),Ci(),ho()]),fi()}document.readyState==="complete"?n():l.on(window,"load",n),l.setInterval(t,2500),l.setInterval(e,3e4),e()}})();
