(()=>{function N(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function T(t){return N()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,i]of Object.entries(t))e[n]=i;return e}):Promise.resolve(typeof t=="string"?{}:t)}function C(t){return N()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function wo(t){return N()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function So(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",i=>{String(i.reason?.message||i.reason||"").includes("Extension context invalidated")&&(i.preventDefault(),e())});let n=setInterval(()=>{N()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var Bt="https://the.gopg.online",Zn=`${Bt}/contribute`,xo=`${Bt}/contribute/telegram`,du=`${Bt}/contribute/human-click`,tn=`${Bt}/contribute/tik-tik-prefs`,vo=`${Bt}/contribute/tik-tik-coord`;var To=20,Co=4320*60*1e3,en=100,_o=4,nn=100,$o=240,ko=50,Mo=1440*60*1e3,ds={recheckButton:!1,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function x(t){return T({[t]:ds[t]}).then(e=>e[t])}function Mt(){return T({posts:[]}).then(t=>t.posts)}function ee(t){return C({posts:t})}function G(){return T("profile").then(t=>t.profile)}var Ft=t=>String(t).padStart(2,"0");function Se(t){let e=Ft(t%60),n=Math.floor(t/60)%60,i=Math.floor(t/3600);return i?`${Ft(i)}:${Ft(n)}:${e}`:`${Ft(n)}:${e}`}function Ao(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${Ft(n.getUTCHours())}:${Ft(n.getUTCMinutes())}:${Ft(n.getUTCSeconds())}`}}function ti(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),i=t%60,o=[];return e>0&&o.push(`${e}d`),(n>0||e>0)&&o.push(`${n}h`),o.push(`${i}m`),o.join(" ")}function Do(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),i=o=>n.find(r=>r.type===o)?.value??"";return`${i("month")} ${i("day")} ${i("year")} ${i("hour")}:${i("minute")} ${i("dayPeriod")}`}function Eo(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),i=parseInt(e[2],10),o=parseInt(e[3],10),r=e[4];r&&(r.toUpperCase()==="PM"&&n<12&&(n+=12),r.toUpperCase()==="AM"&&n===12&&(n=0));let s=new Date;return s.setHours(n,i,o,0),s.getTime()>Date.now()+6e4&&s.setDate(s.getDate()-1),s}var Io=Symbol(),fs=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&N()}on(t,e,n,i){t.addEventListener(e,n,{...i,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!N())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=_o,interval:n=en}={}){return new Promise(i=>{let o=r=>{if(!this.alive)return;let s=document.querySelector(t);if(s)return i(s);if(r>=e)return i(null);this.setTimeout(()=>o(r+1),n)};o(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},l=new fs;function Po(){let t=globalThis[Io];Object.defineProperty(globalThis,Io,{value:l,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var on=new Uint32Array(2);crypto.getRandomValues(on);var Lo="abcdefghjkmnpqrstuvwxyz",ms=(on[0].toString(36)+on[1].toString(36)).replace(/[^a-z0-9]/g,""),m=(Lo[on[0]%Lo.length]+ms).slice(0,8).padEnd(8,"x");function p(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var a={selRow:m+"01",anchor:m+"02",waitTime:m+"03",recheck:m+"04",histCont:m+"05",histTbl:m+"06",cdCard:m+"07",cdTime:m+"08",ofcDate:m+"09",styles:m+"10",datesCont:m+"11",datesPara:m+"12",slotsTbl:m+"12b",aiBtn:m+"13",aiPanel:m+"14",aiFrom:m+"15",aiTo:m+"16",aiStatus:m+"17",aiConfirm:m+"18",aiCancel:m+"19",aiClose:m+"20",aiCities:m+"21",aiSubmitBtn:m+"22",aiCitiesBtn:m+"23",aiLogin:m+"24",aiPass:m+"25",aiQ1:m+"26",aiA1:m+"27",aiQ2:m+"28",aiA2:m+"29",aiQ3:m+"30",aiA3:m+"31",aiSaveLogin:m+"32",cfHud:m+"33",aiCitiesAll:m+"34",aiCitiesNone:m+"35",aiLoginToggle:m+"36",aiLoginBody:m+"37",aiSubmitOn:m+"38",aiSubmitOff:m+"39",aiCitiesOn:m+"40",aiCitiesOff:m+"41",aiWinList:m+"42",aiWinAdd:m+"43",aiWinSave:m+"44",aiWinReset:m+"45",aiWinNote:m+"46",aiSubmitSw:m+"47",aiCitiesSw:m+"48",aiInfoBox:m+"49",aiWarnBox:m+"50",aiOkBox:m+"51",aiWinCard:m+"52",aiSubmitBody:m+"53",aiCitiesBody:m+"54",aiTerms:m+"55",aiTermsAgree:m+"56",aiTermsGate:m+"57",aiMain:m+"58",aiTermsContinue:m+"59",aiFromBtn:m+"60",aiToBtn:m+"61",aiCal:m+"62"},c={pill:m+"a",pillTtl:m+"b",pillTmr:m+"c",pillWait:m+"d",pillDone:m+"e",footer:m+"f",card:m+"g",cardTtl:m+"h",histScrl:m+"i",dltDn:m+"j",dltUp:m+"k",cdDiv:m+"l",hidden:m+"m",sideLink:m+"n",datesLnk:m+"o",slotsSum:m+"o2",slotsTbl:m+"o3",aiOn:m+"p",aiRow:m+"q",aiHint:m+"r",aiCities:m+"s",aiOnBtn:m+"t",aiCityAct:m+"x",cfHud:m+"u",cfPulse:m+"v",cfFlash:m+"w",aiEn:m+"y",aiDis:m+"z",aiWinRow:m+"aa",aiFeat:m+"ab",aiSwitch:m+"ac",aiKnob:m+"ad",aiSec:m+"ae",aiInfo:m+"af",aiWarn:m+"ag",aiOk:m+"ah",aiTrash:m+"ai",aiWinHelp:m+"aj",aiInline:m+"ak",aiHead:m+"al",aiTerms:m+"am",aiTermsCb:m+"an",aiTermsList:m+"ao",aiContinue:m+"ap",aiDateBtn:m+"aq",aiCal:m+"ar",aiCalHead:m+"as",aiCalGrid:m+"at",aiCalDay:m+"au",aiCalMuted:m+"av",aiCalOn:m+"aw",aiCalToday:m+"ax"},$={mark:m,w:m+"w",mw:m+"mw"},At={req:m+"q",res:m+"r",ofc:m+"o",err:m+"e",sub:m+"s"};function rn(t){return t.map(e=>String.fromCharCode(e)).join("")}function ps(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function qo(){let t=document.createElement("div");return t.className=c.footer,t.textContent=rn([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function hs(t){let e=document.getElementById(a.histCont);e&&e.remove(),e=document.createElement("div"),e.id=a.histCont,e.className=c.card,e.dataset[$.mark]="";let n=document.createElement("h4");n.className=c.cardTtl,n.textContent=rn([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let i=document.createElement("div");i.className=c.histScrl;let o=document.createElement("table");o.id=a.histTbl;let r=document.createElement("thead"),s=document.createElement("tr");for(let d of["Time","Est. Wait","Change"]){let h=document.createElement("th");h.textContent=d,s.appendChild(h)}r.appendChild(s),o.appendChild(r);let u=document.createElement("tbody");for(let d=t.length-1;d>=0;d--){let h=t[d],g="--",w="";if(d>0){let k=h.minutes-t[d-1].minutes;k<0?(g=`${k}m`,w=c.dltDn):k>0?(g=`+${k}m`,w=c.dltUp):g="0m"}let v=document.createElement("tr"),K=[[h.timeStr,""],[ti(h.minutes),""],[g,w]];for(let[k,z]of K){let S=document.createElement("td");z&&(S.className=z),S.textContent=k,v.appendChild(S)}u.appendChild(v)}o.appendChild(u),i.appendChild(o),e.appendChild(i),e.appendChild(qo());let f=document.getElementById("last-updated");f&&(f.closest("div, p, section")||f.parentElement).insertAdjacentElement("afterend",e)}function gs(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function Ro(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),i=gs();if(i!==null&&i>$o&&!e.textContent.includes("(")){let s=ti(i);e.textContent=`${e.textContent} (${i} minutes / ${s})`}let o=n.textContent.trim().split(" (")[0],r=Eo(o);if(r&&l.setInterval(()=>{let s=Math.floor((Date.now()-r)/1e3);s>=0&&(n.textContent=`${o} (${s}s ago)`)},1e3),i!==null){let s=ps(),u=sessionStorage.getItem(s);u||(u=Math.random().toString(36).substring(2,11),sessionStorage.setItem(s,u)),T({queueHistory:{}}).then(f=>{let d=f.queueHistory||{},h=Date.now(),g={};for(let[k,z]of Object.entries(d)){if(!Array.isArray(z))continue;let S=z[z.length-1];S&&h-S.timestamp<Mo&&(g[k]=z)}let w=g[u]||[],v=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),K=w[w.length-1];(!K||K.minutes!==i||K.timeStr!==v)&&(w.push({timestamp:h,timeStr:v,minutes:i}),w.length>ko&&w.shift(),g[u]=w,C({queueHistory:g})),hs(w)})}}function Oo(t,e){let n=document.getElementById("error_row");if(!n)return;let i;t?i=e?`Blocked for 24 hours, about ${Se(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":i="Temporarily blocked. Log in in a new tab, then refresh this page.";let o=document.createElement("div");o.className="atlas_validationalert alert alert-danger warning",o.dataset[$.mark]="",o.textContent=i,n.replaceChildren(o),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function No(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&T({cfRetryAfter:null}).then(n=>{let i=parseInt(n.cfRetryAfter,10);if(!isNaN(i)){wo("cfRetryAfter");let o=document.getElementById("what-happened-section");if(o){let r=document.createElement("div");r.id=a.cdCard,r.className=c.card,r.dataset[$.mark]="";let s=document.createElement("h4");s.className=c.cardTtl,s.textContent=rn([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),r.appendChild(s);let u=document.createElement("div");u.id=a.cdTime,r.appendChild(u);let f=document.createElement("div");f.className=c.cdDiv,r.appendChild(f),r.appendChild(qo()),o.appendChild(r);let d=i,h=null,g=()=>{d>0?(u.textContent=Se(d),d--):(u.classList.add(c.cdDiv+"-over"),u.textContent="You can try refreshing now!",h!=null&&l.clear(h))};g(),h=l.setInterval(g,1e3)}}})}async function Wo(){let t=document.querySelector(".username");if(!t)return;let n=(t.innerText||"").trim().match(/^(.*)\((\d+)\)\s*$/);if(!n)return;let[,i,o]=n,r=await G()||{},s=!r.id||r.id===o||String(r.id).includes(o)?r:{};s.name=i.trim(),s.id=o;let u=document.querySelectorAll("script");for(let f of u){let d=f.innerText.trim();if(d.includes("setAuthenticatedUserContext")){let h=/setAuthenticatedUserContext\('([^']*)'\)/,g=d.match(h);g&&(s.email=g[1])}}await C({profile:s})}async function Ho(){let t=document.querySelector("#post_select");if(!t)return;let e=await Mt();for(let n of t.options){if(!n.value)continue;e.findIndex(o=>o.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await ee(e)}var ys=["visa-information","fee-payment","appointment-confirmation"];function bs(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(i=>{let o=i.querySelector(".text-bold");if(!o)return;let r=ws(o.textContent);if(!ys.includes(r))return;let s=Ss(i);s&&(n[r]=s)}),Object.keys(n).length?n:null}function ws(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Ss(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function ne(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>Co)return null}catch{}return t.value}function xs(t){let e=(t.posts||[]).filter(o=>o.Updated).sort((o,r)=>o.Updated-r.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},i=ne(t.cgiIdToken);return i&&(n.token=i),n}async function ei(){if(!N()||!await x("serverSync"))return;let t=await T(["profile","posts","cgiIdToken"]),e=xs(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await fetch(Zn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(o=>o.json());if(!n.success)return;let i="0";n.contribs>0&&(i=n.contribs.toString()),n.contribs>10&&(i="10+"),n.contribs>0&&await C({contribs:{email:t.profile?.email,updated:Date.now(),count:i}})}catch{}}function ni(t=0){N()&&document.querySelector("#appointment-card")&&x("serverSync").then(e=>{if(!e)return;let n=bs();if(!n){t<To&&l.setTimeout(()=>ni(t+1),en);return}T(["profile","cgiIdToken","savedDashboard"]).then(i=>{let o=ne(i.cgiIdToken);o&&JSON.stringify(n)!==JSON.stringify(i.savedDashboard)&&fetch(Zn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:i.profile,dashboard:n,token:o})}).then(r=>r.json()).then(r=>{r.success&&C({savedDashboard:n})}).catch(()=>{})})})}var vs=`${Bt}/extension-runtime-config.json`,oi="vsRuntimeConfig",Ts=300*1e3,ii=0,xe=null,b={slotWindowLabel:":05\u2013:13, :14\u2013:21, :24\u2013:31, :35\u2013:50, :54\u2013:02",slotWindows:[{slot:5,fromMin:0,toMin:2},{slot:1,fromMin:5,toMin:13},{slot:2,fromMin:14,toMin:21},{slot:3,fromMin:24,toMin:31},{slot:4,fromMin:35,toMin:50},{slot:5,fromMin:54,toMin:59}],windowStartsMin:[0,5,14,24,35,54],cityLoadingMaxMs:18e4,cityCalendarNoDatesMs:2e4,cityRotateMinGapMs:13e3,cityRotateMaxGapMs:18e3,cityHoldMaxMs:45e3,homeKeepaliveMinMs:6e5,homeKeepaliveMaxMs:6e5,homeKeepaliveDebounceMs:48e4,loadingStuckMs:12e4,loadingStuckDebounceMs:9e4,remoteVersion:0,source:"bundled"};function V(t,e,n,i){let o=Number(t);return Number.isFinite(o)?Math.min(n,Math.max(e,Math.round(o))):i}function Cs(t){if(!Array.isArray(t)||!t.length||t.length>24)return null;let e=[];for(let n of t){let i=V(n?.fromMin,0,59,NaN),o=V(n?.toMin,0,59,NaN);if(!Number.isFinite(i)||!Number.isFinite(o)||i>o)return null;let r=V(n?.slot,1,12,1);e.push({slot:r,fromMin:i,toMin:o})}return e}function _s(t){let e=[...new Set(t.map(n=>n.fromMin))].sort((n,i)=>n-i);return e.length?e:b.windowStartsMin.slice()}function Bo(t,e="remote"){if(!t||typeof t!="object")return!1;let n=Cs(t.slotWindows);if(n){b.slotWindows.length=0;for(let i of n)b.slotWindows.push(i);b.windowStartsMin=_s(n)}return typeof t.slotWindowLabel=="string"&&t.slotWindowLabel.length<120&&(b.slotWindowLabel=t.slotWindowLabel),b.cityLoadingMaxMs=V(t.cityLoadingMaxMs,1e4,3e5,b.cityLoadingMaxMs),b.cityCalendarNoDatesMs=V(t.cityCalendarNoDatesMs,5e3,12e4,b.cityCalendarNoDatesMs),b.cityRotateMinGapMs=V(t.cityRotateMinGapMs,5e3,6e4,b.cityRotateMinGapMs),b.cityRotateMaxGapMs=V(t.cityRotateMaxGapMs,b.cityRotateMinGapMs,9e4,Math.max(b.cityRotateMinGapMs,b.cityRotateMaxGapMs)),b.cityHoldMaxMs=V(t.cityHoldMaxMs,1e4,18e4,b.cityHoldMaxMs),b.homeKeepaliveMinMs=V(t.homeKeepaliveMinMs,12e4,18e5,b.homeKeepaliveMinMs),b.homeKeepaliveMaxMs=V(t.homeKeepaliveMaxMs,b.homeKeepaliveMinMs,18e5,Math.max(b.homeKeepaliveMinMs,b.homeKeepaliveMaxMs)),b.homeKeepaliveDebounceMs=V(t.homeKeepaliveDebounceMs,6e4,18e5,b.homeKeepaliveDebounceMs),b.loadingStuckMs=V(t.loadingStuckMs,3e4,6e5,b.loadingStuckMs),b.loadingStuckDebounceMs=V(t.loadingStuckDebounceMs,3e4,6e5,b.loadingStuckDebounceMs),b.remoteVersion=V(t.version,0,1e9,b.remoteVersion),b.source=e,!0}async function $s(){try{let e=(await T(oi))[oi];e?.config&&Bo(e.config,"cache")}catch{}}async function ks(t){try{await C({[oi]:{config:t,fetchedAt:Date.now()}})}catch{}}async function Ms({force:t=!1}={}){let e=Date.now();if(!t&&e-ii<Ts)return b;if(xe)return xe;xe=(async()=>{await $s();try{let n=await fetch(vs,{method:"GET",cache:"no-store",signal:AbortSignal.timeout(8e3)});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.json();if(!i||typeof i!="object"||Array.isArray(i))throw new Error("bad json");if(i.script||i.code||i.eval)throw new Error("unsafe keys");Bo(i,"remote"),await ks(i),ii=Date.now()}catch{ii=Date.now()}return b})();try{return await xe}finally{xe=null}}function Fo(){Ms().catch(()=>{})}var Dt=null,ve=null;function Uo(){return Dt||b.slotWindows}function st(){return ve||(Dt?.length?Ko(Dt):b.slotWindowLabel)}var Pu=b.slotWindows,ht=4,Et=6;function Ko(t){return t?.length?t.map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", "):b.slotWindowLabel}function ri(t){if(!Array.isArray(t))return[];let e=[];for(let n of t){if(e.length>=ht)break;let i=Number(n?.fromMin),o=Number(n?.durationMin??n?.duration);if(!Number.isFinite(i)||i<0||i>59)continue;let r=Math.min(Et,59-i);if(r<1)continue;if(!Number.isFinite(o)||o<1){let u=Number(n?.toMin);if(!Number.isFinite(u)||u<i||u>59||(o=Math.min(r,u-i),o<1))continue}o=Math.min(r,Math.max(1,Math.round(o)));let s=Math.min(59,i+o);e.push({slot:e.length+1,fromMin:Math.round(i),toMin:s,durationMin:o})}return e}function Go(t){let e=ri(t||[]);return e.length?(Dt=e.map(({slot:n,fromMin:i,toMin:o})=>({slot:n,fromMin:i,toMin:o})),ve=Ko(Dt),Dt):(Dt=null,ve=null,null)}function ai(){Dt=null,ve=null}function zo(t){let e=t?.length?t:b.slotWindows,n=[];for(let i of e||[]){if(n.length>=ht)break;let o=Number(i.fromMin),r=Number(i.toMin);if(!Number.isFinite(o)||!Number.isFinite(r)||r<o||o===0&&r<=2&&(e||[]).some(f=>Number(f.fromMin)>=54))continue;let s=Math.min(Et,59-o);if(s<1)continue;let u=Math.min(s,Math.max(1,r-o));n.push({fromMin:o,durationMin:u})}return n}function jo(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=i=>Number(e.find(o=>o.type===i)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function ie(t=new Date){let{minute:e}=jo(t),n=Uo();for(let i of n)if(e>=i.fromMin&&e<=i.toMin)return i.slot;return 0}function Te(t=new Date){if(ie(t))return 0;let{minute:e,second:n}=jo(t),i=e*60+n,o=Uo(),r=[...new Set(o.map(u=>u.fromMin))].sort((u,f)=>u-f);for(let u of r){let f=u*60;if(i<f)return(f-i)*1e3}let s=r[0]??0;return(3600-i+s*60)*1e3}function si(t){return t<9e4?`${Math.ceil(t/1e3)}s`:`${Math.ceil(t/6e4)}m`}function tr(){let t=document.querySelector(p(a.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=a.selRow,t.dataset[$.mark]="",n.insertAdjacentElement("afterend",t);let i=document.createElement("span");return i.id=a.anchor,i.dataset[$.mark]="",i.dataset[$.w]=e.style.width,i.dataset[$.mw]=e.style.minWidth,i.hidden=!0,e.insertAdjacentElement("beforebegin",i),l.setStyle(e,"width","100%"),l.setStyle(e,"minWidth","0"),t.appendChild(e),t}var Ce="waitPillState",As=3600*1e3,Yo=c.pillWait,Ds=c.pillDone;function Es(t,e){let n=document.createElement("span");n.className=`${c.pill} ${e}`;let i=(o,r)=>{let s=document.createElement("span");s.className=o,s.textContent=r,n.appendChild(s)};return i(c.pillTtl,t.title),t.timer!==void 0&&i(c.pillTmr,t.timer),n}function Is(t,e=Date.now()){if(t.kind==="waiting")return{variant:Yo};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:Yo}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:Ds}}return null}function Ps(t,e,n=new Date){let i=Ao(n);return t.seconds===void 0?{title:i}:{title:i,timer:Se(t.seconds)}}var Ls=class{#t=null;#e={kind:"idle"};#i=null;#n=null;#o=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get(Ce))[Ce];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>As){chrome.storage.local.remove(Ce);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#o=t,this.#r(),this.#c()}toggleClockMode(){l.alive&&(this.setClockMode(!this.#o),chrome.storage.local.set({waitPillClock:this.#o}))}render(t){return Is(this.#e,t)}#l(t){return Ps(t,this.#o,new Date)}#r(){if(this.#t??=Rs(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(c.hidden);return}this.#t.classList.remove(c.hidden),this.#t.replaceChildren(Es(this.#l(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#i&&(l.clear(this.#i),this.#i=null),t.kind==="running"?(chrome.storage.local.set({[Ce]:t}),this.#i=l.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove(Ce),this.#r(),this.#c()}#u(){this.#r(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,x("audioAlert").then(t=>{t&&js()})))}#c(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=l.setInterval(()=>this.#r(),1e3):!t&&this.#n&&(l.clear(this.#n),this.#n=null)}},se=new Ls,Ae="pillPosition",Vo=4;function Xo(t,e,n){return Math.max(e,Math.min(n,t))}function er(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,i=e.height>0?e.height:36;return{w:n,h:i}}function oe(t,e,n){let{w:i,h:o}=er(t),r=Xo(e,0,Math.max(0,window.innerWidth-i)),s=Xo(n,0,Math.max(0,window.innerHeight-o));return t.style.setProperty("left",r+"px","important"),t.style.setProperty("top",s+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:r,top:s}}function qs(t){var e=!1,n=!1,i=0,o=0,r=0,s=0;function u(d){if(e){var h=d.touches?d.touches[0]:d,g=h.clientX-i,w=h.clientY-o;!n&&Math.abs(g)<Vo&&Math.abs(w)<Vo||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",oe(t,r+g,s+w),d.cancelable&&d.preventDefault())}}function f(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",f),document.removeEventListener("touchmove",u),document.removeEventListener("touchend",f),n){let d=t.getBoundingClientRect();chrome.storage.local.set({[Ae]:{top:Math.round(d.top),left:Math.round(d.left)}})}n=!1}}t.addEventListener("mousedown",function(d){if(d.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let h=t.getBoundingClientRect();i=d.clientX,o=d.clientY,r=h.left,s=h.top,oe(t,h.left,h.top),document.addEventListener("mousemove",u),document.addEventListener("mouseup",f),d.preventDefault(),d.stopPropagation()}),t.addEventListener("touchstart",function(d){e=!0,n=!1,delete t.dataset.skipClick;let h=t.getBoundingClientRect();i=d.touches[0].clientX,o=d.touches[0].clientY,r=h.left,s=h.top,oe(t,h.left,h.top),document.addEventListener("touchmove",u,{passive:!1}),document.addEventListener("touchend",f)},{passive:!0})}function Rs(){let t=document.querySelector(p(a.waitTime));return t||(t=document.createElement("div"),t.id=a.waitTime,t.className=c.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),qs(t),chrome.storage.local.get(Ae).then(e=>{let n=e[Ae];n&&typeof n.top=="number"&&typeof n.left=="number"&&oe(t,n.left,n.top)}),Hs(t),t)}function Qo(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function Os(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function Ns(t){let{w:e,h:n}=er(t),i=12;return[{left:i,top:i},{left:Math.max(i,window.innerWidth-e-i),top:i},{left:i,top:Math.max(i,window.innerHeight-n-i)},{left:Math.max(i,window.innerWidth-e-i),top:Math.max(i,window.innerHeight-n-i)}]}async function Ws(){let e=(await chrome.storage.local.get(Ae))[Ae];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function Hs(t){let e=!1,n=async()=>{if(!l.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(c.hidden))return;let i=Os(),o=!!(i&&i.offsetParent!==null&&i.getBoundingClientRect().height>20),r=t.getBoundingClientRect();if(o&&Qo(r,i.getBoundingClientRect())){let s=i.getBoundingClientRect(),u=Ns(t),f=u.find(d=>{let h={left:d.left,top:d.top,right:d.left+r.width,bottom:d.top+r.height};return!Qo(h,s)})||u[2];e=!0,t.setAttribute("data-dodging",""),oe(t,f.left,f.top);return}if(e&&!o){e=!1,t.removeAttribute("data-dodging");let s=await Ws();s&&oe(t,s.left,s.top)}else o||t.removeAttribute("data-dodging")};l.setInterval(n,400),l.on(window,"resize",n)}async function di(){if(!l.alive||!await x("defaultWaitTime")||!await l.waitFor("#post_select",{attempts:nn}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});se.setClockMode(t),await se.restore()}async function nr(){await x("defaultWaitTime")&&se.waiting()}async function mn(t){await x("defaultWaitTime")&&se.run(t)}function ir(){se.toggleClockMode()}function or(t){se.setClockMode(t)}var _e=null,$e=null,an=null;function fi(){return an||(an=new(window.AudioContext||window.webkitAudioContext),l.disposable(()=>an?.close())),an}async function pn(t=150){try{let e=fi();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let o=e.currentTime,r=t/1e3;i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(.1,o+.01),i.gain.setValueAtTime(.1,o+Math.max(.01,r-.02)),i.gain.linearRampToValueAtTime(0,o+r),n.start(),n.stop(o+r)}catch(e){console.error("Audio beep failed:",e)}}function Bs(t,e=125,n=125){let i=0,o=()=>{i>=t||(pn(e),i++,l.setTimeout(o,e+n))};o()}var ci=4,Jo=50,Zo=50,Fs=600;function rr(){if($e)return;let t=()=>{Bs(ci,Jo,Zo);let e=ci*Jo+(ci-1)*Zo;$e=l.setTimeout(t,e+Fs)};t()}var Us=250,Ks=10,Gs=300,zs=1e3;function js(){if(_e)return;let t=[];for(let o=0;o<=Gs;o+=Ks)t.push(o);let e=Date.now(),n=0,i=()=>{let o=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&o>=t[n];){let r=n===t.length-1;pn(r?zs:Us),n++}if(n<t.length){let r=t[n],s=e+r*1e3,u=Math.max(0,s-Date.now());_e=l.setTimeout(i,u)}else ce()};i()}function ce(t={}){let e=!!t.keepConsular;_e&&(l.clear(_e),_e=null),$e&&(l.clear($e),$e=null),li(),e||ui()}var sn=null,cn=null,re=null,ln=null,ke=null;async function ar(){li();try{let t=fi();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=880,i.frequency.value=1320,o.gain.value=.85,r.gain.value=.65,n.connect(o).connect(e),i.connect(r).connect(e);let s=t.createOscillator(),u=t.createGain();s.type="triangle",s.frequency.value=3.2,u.gain.value=280,s.connect(u),u.connect(n.frequency),u.connect(i.frequency);let f=t.currentTime;n.start(f),i.start(f),s.start(f),re={osc1:n,osc2:i,lfo:s,master:e};let d=()=>{re&&(pn(500),cn=l.setTimeout(d,1800))};d(),sn=l.setTimeout(li,12e4),ke=document.title;let h=!1,g=()=>{re&&(document.title=h?ke:"!!! SUBMIT CLICKED !!!",h=!h,ln=l.setTimeout(g,450))};g()}catch(t){console.error("Submit alarm failed:",t)}}function li(){if(sn&&(l.clear(sn),sn=null),cn&&(l.clear(cn),cn=null),ln&&(l.clear(ln),ln=null),ke&&(document.title=ke,ke=null),re){try{let{osc1:t,osc2:e,lfo:n}=re;t.stop(),e.stop(),n.stop()}catch{}re=null}}function Ys(){let t=location.pathname||"";return/\/ofc-schedule\b/i.test(t)?!1:/\/(schedule|c-schedule)\b/i.test(t)}var Vs=6e4,un=null,dn=null,fn=null,Me=null,ae=null;async function Xs(){ui();try{let t=fi();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=980,i.frequency.value=1470,o.gain.value=.95,r.gain.value=.8,n.connect(o).connect(e),i.connect(r).connect(e);let s=t.createOscillator(),u=t.createGain();s.type="square",s.frequency.value=4,u.gain.value=320,s.connect(u),u.connect(n.frequency),u.connect(i.frequency);let f=t.currentTime;n.start(f),i.start(f),s.start(f),ae={osc1:n,osc2:i,lfo:s,master:e};let d=()=>{ae&&(pn(650),dn=l.setTimeout(d,900))};d(),un=l.setTimeout(ui,Vs),Me=document.title;let h=!1,g=()=>{ae&&(document.title=h?Me:"!!! OFC BOOKED \u2014 CONSULAR PAGE !!!",h=!h,fn=l.setTimeout(g,400))};g()}catch(t){console.error("Consular OFC alarm failed:",t)}}function ui(){if(un&&(l.clear(un),un=null),dn&&(l.clear(dn),dn=null),fn&&(l.clear(fn),fn=null),Me&&(document.title=Me,Me=null),ae){try{let{osc1:t,osc2:e,lfo:n}=ae;t.stop(),e.stop(),n.stop()}catch{}ae=null}}function sr(){if(Ys()){try{let t="vsConsularOfcBeep";if(sessionStorage.getItem(t)==="1")return;sessionStorage.setItem(t,"1")}catch{}Xs()}}function Qs(){document.querySelector(p(a.recheck))?.remove();for(let t of document.querySelectorAll("button"))(t.textContent||"").trim()==="Recheck"&&t.remove()}async function mi(){l.alive&&Qs()}async function hi(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await l.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let i=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(u=>u.innerText.trim()===i))continue;let r=document.createElement("li");r.className="usa-sidenav__item",r.dataset[$.mark]="";let s=document.createElement("a");s.href=n.link,s.className=c.sideLink,s.target="_self",s.textContent=n.text,r.appendChild(s),t.appendChild(r)}}function M(t,e,n){let i=document.createElement(t);return e&&(i.className=e),n?.appendChild(i),i}function hn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,r]=n;return`${r}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return null}function pi(t){let e=hn(t);if(!e)return String(t||"");let[n,i,o]=e.split("-").map(Number);if(!n||!i||!o)return e;try{return new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(new Date(n,i-1,o))}catch{return e}}function Js(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);if(n)return n[1].slice(0,5);let i=e.match(/^(\d{1,2}:\d{2})/);return i?i[1]:e}function cr(t){let e=document.querySelector(p(a.datesCont));if(e){let o=e.querySelector(p(a.datesPara)),r=e.querySelector("h2");if(r&&t&&(r.textContent=t),o)return{container:e,details:o}}let n=document.querySelector("#page_form");if(!n)return null;e?.remove();let i=Zs(t||"");return n.appendChild(i.container),i}function lr(t){if(t.response.HasError)return;let e=document.querySelector("#post_select"),n=e?.options[e.selectedIndex]?.text??"",i=(t.response.ScheduleDays||[]).map(d=>hn(d?.Date)).filter(Boolean).sort((d,h)=>d.localeCompare(h));document.querySelector(p(a.datesCont))?.remove();let o=cr(n);if(!o)return;let{details:r}=o;r.replaceChildren();let s=M("div",c.slotsSum,r);if(!i.length){s.textContent="No slots available";return}s.textContent=`${i.length} date${i.length===1?"":"s"} available`;let u={};for(let d of i){let h=d.slice(0,7);(u[h]||=[]).push(d)}for(let[d,h]of Object.entries(u)){let g=M("div",null,r),w=document.createElement("strong");w.textContent=d,g.append(w,`: ${h.map(v=>v.slice(8,10)).join(", ")}`)}let f=M("div",null,r);f.style.marginTop="0.5em";for(let d of i){let h=M("div",null,f);h.textContent=`\u2022 ${pi(d)} (${d})`}}function ur(t,e,n){let i=document.querySelector("#post_select"),o=n||i?.options[i.selectedIndex]?.text||"",r=hn(e)||hn(t?.[0]?.Date)||"",s=(t||[]).filter(S=>S&&S.Time).map(S=>({time:Js(S.Time),avail:S.EntriesAvailable!=null&&Number.isFinite(Number(S.EntriesAvailable))?Number(S.EntriesAvailable):null,raw:S})).sort((S,O)=>String(S.time).localeCompare(String(O.time))),u=cr(o);if(!u)return;let{details:f}=u;f.replaceChildren();let d=M("div",c.slotsSum,f);if(!s.length){d.textContent=r?`No time slots on ${pi(r)}`:"No time slots available";return}let h=s.filter(S=>S.avail==null||S.avail>0),g=h.reduce((S,O)=>S+(O.avail||0),0),w=r?pi(r):"selected date";if(d.textContent=g>0?`${h.length} time slot${h.length===1?"":"s"} on ${w} \xB7 ${g} available`:`${s.length} time slot${s.length===1?"":"s"} on ${w}`,r){let S=M("div",null,f);S.style.margin="0.35em 0 0.6em",S.textContent=`Date: ${w} (${r})`}let v=M("table",c.slotsTbl,f);v.id=a.slotsTbl;let K=M("thead",null,v),k=M("tr",null,K);for(let S of["Time","Availability"]){let O=M("th",null,k);O.textContent=S}let z=M("tbody",null,v);for(let S of s){let O=M("tr",null,z);S.avail===0&&(O.style.opacity="0.55");let pt=M("td",null,O);pt.textContent=S.time;let us=M("td",null,O);us.textContent=S.avail==null?"\u2014":String(S.avail)}}function Zs(t){let e=M("div","row");e.id=a.datesCont;let n=M("div","col-sm-12 atlas_section mt-3",e),i=M("div","col-sm-12 atlas_section_header_row",M("div","row",n));M("h2",null,i).textContent=t;let o=M("div",null,M("div","col-sm-12",M("div","row",n)));return o.id=a.datesPara,{container:e,details:o}}var dr=null;function tc(){let t=document.querySelector(p(a.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return l.setStyle(n,"display","flex"),l.setStyle(n,"alignItems","center"),l.setStyle(n,"justifyContent","flex-end"),l.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=a.ofcDate,t.dataset[$.mark]="",e.insertAdjacentElement("beforebegin",t),t}function ec(){if(!location.pathname.includes("/schedule"))return;let t=dr;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=tc();n&&(n.textContent=`OFC (Estimate): ${Do(e.appointmentDateStr)}`)}function fr(t){chrome.runtime?.id&&(dr=t.data.data,l.waitFor("#submitbtn").then(e=>{e&&ec()}))}var gn=new Map,mr=45e3,yn=new Map,pr=8e3,hr=0;function bn(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function wn(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function nc(t,e){return`${t}:${e.slice(0,5).join(",")}`}function ic(t){let e=Date.now(),n=gn.get(t);if(n&&e-n<mr)return!1;gn.set(t,e);for(let[i,o]of gn)e-o>mr*4&&gn.delete(i);return!0}function oc(t){let e=Date.now(),n=yn.get(t);if(n&&e-n<pr)return!1;yn.set(t,e);for(let[i,o]of yn)e-o>pr*6&&yn.delete(i);return!0}async function gr(){return await x("telegramViaServer")!==!1}async function yr(t,{kind:e="alert",dedupKey:n="",skipDedup:i=!1,notifyMuktesh:o=!0}={}){if(t&&await gr())try{await fetch(xo,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:i,notify_muktesh:o}),signal:AbortSignal.timeout(2e4)})}catch{}}function rc(t,{kind:e="screen",dedupKey:n="",waitMs:i=0,skipDedup:o=!1,notifyMuktesh:r=!0}={}){l.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:i,skipDedup:o,notifyMuktesh:r,captureScreenshot:!0})}async function ac(t,e,n){let i=bn(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&r.push(`\u{1FAAA} <b>Visa:</b> ${n}`),r.push(`\u{1F550} <b>Checked:</b> ${o} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),r.push(`\u{1F4C6} <b>Dates (${i.length}):</b>`,"");for(let s of i.slice(0,30))r.push(`\u{1F7E2} <b>${wn(s)}</b>`);return i.length>30&&r.push("",`\u2795 <i>+${i.length-30} more dates</i>`),r.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),r.join(`
`)}function sc(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",i=document.querySelector("#datepicker")?.value||"\u2014",r=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:i,time:r}}async function br(t,{postId:e,postName:n,hasError:i}={}){if(i||!t?.length)return;let o=bn(t);if(!o.length||!await x("telegramAlert"))return;let r=nc(e||n||"unknown",o);if(!ic(r))return;let s=await G(),u=await ac(n,t,s?.visa||"");await yr(u,{kind:"slots",dedupKey:r,notifyMuktesh:!0})}function cc(t,e,n){let i=bn(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`;if(i.length){let s=i.slice(0,5).map(u=>wn(u)).join(", ");return`<b>DATES AVAILABLE</b>
\u{1F3DB}\uFE0F ${r}
\u{1F4C6} ${i.length} date(s)
${s}${i.length>5?"\u2026":""}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}return`<b>City changed \u2014 no dates</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}function lc(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=e?wn(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${i}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function uc(t,e,n){let i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?wn(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u23F0 ${n} slot(s)
\u{1F550} ${i} IST
\u{1F4F2} Visa Slot 6`}async function le(t,{kind:e="screen",dedupKey:n,waitMs:i=0,skipDedup:o=!1}={}){if(await x("telegramScreenshots")===!1||!await gr())return;let r=n||`${e}:${String(t).slice(0,80)}`;!o&&!oc(r)||rc(t,{kind:e,dedupKey:r,waitMs:i,skipDedup:o,notifyMuktesh:!0})}async function wr(t,{postId:e,postName:n,hasError:i}={}){let o=cc(n,t,i),r=bn(t),s=r.length?"dates":"city";await le(o,{kind:s,dedupKey:`${s}:${e||n}:${r.length}:${i?1:0}`,waitMs:r.length?1400:900})}async function Sr(t,e){await le(lc(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function xr(t,e,n){await le(uc(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function vr(){let t=Date.now();if(t-hr<8e3)return;hr=t;let e=await G(),{city:n,date:i,time:o}=sc(),r=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),s=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${i}`,`\u23F0 <b>Time:</b> ${o}`];e?.email&&s.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&s.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),s.push(`\u{1F550} <b>When:</b> ${r} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let u=s.join(`
`);await yr(u,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await le(u,{kind:"submit",skipDedup:!0,waitMs:200})}var Sn=25;function dc(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function yi(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let i=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,i),n-1)}function Cr(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function _r(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function bi(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function Tr(t){if(!t||t.disabled)return!1;try{let e=t.closest("tr"),i=[t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,t.closest("label"),t,e].filter(Boolean);for(let o of i)o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),o.click();(t.type==="radio"||t.type==="checkbox")&&(t.checked=!0),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function $r(){let t=new Set,e=[],n=i=>{if(!i||t.has(i)||bi(i)||i.disabled)return;let o=i.closest("tr");o&&_r(o)||(t.add(i),e.push(i))};for(let i of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let o of document.querySelectorAll(`${i}:not([disabled])`))n(o);return e}function fc(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!Cr(n)||_r(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function mc(t){for(let e of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(e.tagName!=="SELECT"||e.disabled||bi(e))continue;let n=[...e.options].filter(o=>!o.disabled&&o.value&&o.value!=="0"&&Cr({textContent:o.textContent}));if(!n.length)continue;let i=yi(n.length,t);return e.value=n[i].value,e.dispatchEvent(new Event("change",{bubbles:!0})),!0}return!1}function pc(t){if(mc(t))return!0;let e=$r();if(e.length){let i=yi(e.length,t);if(Tr(e[i]))return!0}let n=fc();if(n.length){let i=yi(n.length,t),o=n[i],r=o.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(r&&Tr(r))return!0;let s=o.querySelector("label");if(s)return s.click(),!!o.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function j(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!bi(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function hc({slotIndex:t=0,maxMs:e=12e3,pollMs:n=Sn,onTick:i}={}){let o=Date.now()+e,r=Math.max(10,n||25);return new Promise(s=>{let u=()=>{if(!l.alive)return s(!1);if(i?.(),pc(t)||j())return s(!0);if(Date.now()>=o)return s(!1);l.setTimeout(u,r)};u()})}function De({time:t,date:e,slotIndex:n,pollMs:i,maxMs:o}){let r=n??0,s=o||15e3,u=i||Sn;return l.send({action:"forcePickTimeSlot",slotIndex:r,maxMs:s,pollMs:u}),l.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:r,pollMs:u,domWaitMs:0,maxMs:s}),hc({slotIndex:r,maxMs:s,pollMs:u})}var gi=!1;function kr({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(gi)return;gi=!0;let i=!1,o=async()=>{if(!(!l.alive||i)){if(j()){n?.();return}try{if(t&&!await t())return}catch{return}$r().length&&(i=!0,await De({slotIndex:e,time:"00:00",maxMs:800,pollMs:Sn}),i=!1,j()&&n?.())}};l.setInterval(o,Sn);let r=document.querySelector("#page_form")||document.body,s=new MutationObserver(()=>o());s.observe(r,{childList:!0,subtree:!0}),l.disposable(()=>{s.disconnect(),gi=!1})}function Mr(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let i=dc(n?.Time);if(!i)continue;let o=i.match(/(\d{1,2}):(\d{2})/);if(!o)continue;let[,r,s]=o;if(e.includes(`${r}:${s}`)||e.includes(`${parseInt(r,10)}:${s}`))return!0}return!1}var xn="submitErrors",Ar=50,gc=45e3,Er=0,wi=new Set,Ee=null,Ir=null;function Pr(t){Ir=typeof t=="function"?t:null}function yc(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",i=document.querySelector("#datepicker")?.value||"";return{city:e,date:i,url:location.href}}function Ie(){Er=Date.now()+gc,wi.clear(),Tc()}function vn(){return Date.now()<Er}function bc(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function wc(t){let e=await T({[xn]:[]}),n=Array.isArray(e[xn])?e[xn]:[];n.push(t),n.length>Ar&&n.splice(0,n.length-Ar),await C({[xn]:n})}function Dr(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function Sc(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${Dr(t.source)}`,`\u{1F4AC} <b>Message:</b> ${Dr(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let i=n.join(`
`);await le(i,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function Pe(t,e,n={}){let i=String(e||"").trim();if(!i||!vn()&&!n.force)return;let o=bc(t,i);if(wi.has(o))return;wi.add(o);let r=yc(),s=await G(),u={at:Date.now(),source:String(t||"unknown"),message:i.slice(0,2e3),city:n.city||r.city,date:n.date||r.date,url:n.url||r.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:s?.email||""};await wc(u);try{await Sc(u)}catch{}try{Ir?.(u)}catch{}}function xc(t){if(!vn())return;let e=t?.status,n=t?.retryAfter,i=t?.cgiBlock,o=`Request failed (HTTP ${e||"?"})`;n!=null&&(o+=` \u2014 retry after ${n}s`),i&&(o+=" \u2014 CGI access limitation"),Pe("ajax_error",o,{status:e})}function Lr(t){if(!vn()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){xc({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",o=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";Pe("ajax_response",o,{route:t.tail||""})}var vc=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function Tc(){Ee&&l.clear(Ee);let t=()=>{if(!l.alive||!vn()){Ee=null;return}for(let e of vc)for(let n of document.querySelectorAll(e)){let i=(n.textContent||"").replace(/\s+/g," ").trim();!i||i.length<4||Pe("page_validation",i)}Ee=l.setTimeout(t,600)};Ee=l.setTimeout(t,500)}var Le=0,qr="",Rr=0;async function Cc(){let[t,e]=await Promise.all([G(),T(["cgiIdToken"])]),n=ne(e.cgiIdToken);return{profile:t,token:n}}async function Or(t){if(!N()||!await x("serverSync"))return null;let{profile:e,token:n}=await Cc();if(!e?.id&&!e?.email)return null;try{let i={...t,profile:e};n&&(i.token=n);let o=await fetch(vo,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}).then(r=>r.json());return o&&o.success?o:null}catch{return null}}async function Nr({postId:t,postName:e,dayCount:n}={}){let i=String(t||"").trim(),o=Number(n)||0;if(!i||o<1)return null;let r=`${i}:${o}`,s=Date.now();if(r===qr&&s-Rr<4e3)return null;qr=r,Rr=s;let u=await Or({action:"alert",city:{id:i,name:String(e||i).trim()},dayCount:o});return u?.alertId&&(Le=Math.max(Le,Number(u.alertId)||0)),u}async function Wr({preferredCities:t=[],citiesEnabled:e=!1,currentCityId:n=""}={}){if(!e||!t?.length)return null;let o=(await Or({action:"poll",preferredCities:t,citiesEnabled:!0,currentCityId:String(n||""),lastAlertId:Le}))?.forceCity;return!o?.id||!o?.alertId?null:o}function Hr(t){let e=Number(t)||0;e>Le&&(Le=e)}var _c=["cities","from","to","submitEnabled","citiesEnabled","enabled","slotWindows","termsAgreed","termsPassed","termsAgreedAt"];function Br(t){if(!t||typeof t!="object")return{};let e={};for(let n of _c)n in t&&(e[n]=t[n]);return typeof e.submitEnabled!="boolean"&&typeof e.enabled=="boolean"&&(e.submitEnabled=e.enabled),delete e.enabled,e}function Fr(t,e){if(!e||typeof e!="object")return t||null;let n=t&&typeof t=="object"?{...t}:{},i=Number(n.serverUpdatedAt)||0,o=Number(e.updatedAt)||0;if(o&&i&&o<i)return n;let r=Br(e),s={...n,...r};return typeof r.submitEnabled=="boolean"&&(s.enabled=r.submitEnabled),e.updatedAt&&(s.serverUpdatedAt=e.updatedAt),s}async function Ur(){let[t,e]=await Promise.all([G(),T(["cgiIdToken"])]),n=ne(e.cgiIdToken);return{profile:t,token:n}}async function Kr(t){if(!N()||!await x("serverSync"))return!1;let e=Br(t);if(!Object.keys(e).length)return!1;let{profile:n,token:i}=await Ur();if(!n?.id&&!n?.email)return!1;try{let o={profile:n,prefs:e};i&&(o.token=i);let r=await fetch(tn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(s=>s.json());return!!(r&&r.success)}catch{return!1}}async function Gr(){if(!N()||!await x("serverSync"))return null;let{profile:t,token:e}=await Ur();if(!t?.id&&!t?.email)return null;try{let n=new URLSearchParams;t.id&&n.set("applicant_id",String(t.id)),t.email&&n.set("email",String(t.email));let i=await fetch(`${tn}?${n.toString()}`,{method:"GET",headers:{Accept:"application/json"}}).then(r=>r.json());if(i?.prefs)return i.prefs;let o={profile:t};return e&&(o.token=e),i=await fetch(tn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(r=>r.json()),i?.prefs||null}catch{return null}}var Pt="aiSubmitByAccount",He=8e3;var X=25,$c=80,Mn=0,An=1e4,ra=1e3;function Be(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}function Di(){return b.cityRotateMinGapMs}function kc(){return b.cityRotateMaxGapMs}function Oe(){return b.cityHoldMaxMs}function yt(){return b.cityLoadingMaxMs}function Ut(){return b.cityCalendarNoDatesMs}var zr=5e3,vi=2e4,Mc=15e3;function Ct(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function Ei(){return/\/ofc-schedule\b/i.test(location.pathname)}function _(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var Ac=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function Cn(t,e){let n=Ac[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(o=>{let r=e===o?" selected":"";return`<option value="${o.replace(/"/g,"&quot;")}"${r}>${o}</option>`}).join("")}function ue(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function Vt(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function Dc(t,e,n){return`${t}-${String(e+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`}function Ec(t){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(t))return null;let[e,n,i]=t.split("-").map(Number),o=new Date(e,n-1,i);return o.getFullYear()!==e||o.getMonth()!==n-1||o.getDate()!==i?null:o}function Ii(){for(let t of["from","to"]){let e=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo)),n=document.querySelector(p(t==="from"?a.aiFromBtn:a.aiToBtn));if(!n)continue;let i=e?.value||"";n.textContent=i?Vt(i):"Select date"}}function Si(t,e){let n=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo));if(n&&(n.value=e||""),t==="from"){let i=document.querySelector(p(a.aiTo));i&&e&&i.value&&i.value<e&&(i.value="")}Ii()}var Q={y:0,m0:0,which:"from"};function Lt(){document.querySelector(p(a.aiCal))?.classList.add(c.hidden)}function Pi(t){let e=t.target;return e?e.nodeType===3?e.parentElement:e:null}function Ti(){let t=document.querySelector(p(a.aiCal));if(!t)return;let{y:e,m0:n,which:i}=Q,o=document.querySelector(p(i==="from"?a.aiFrom:a.aiTo))?.value||"",r=ue(),s=i==="to"&&document.querySelector(p(a.aiFrom))?.value||ue(),u=new Date(e,n,1).toLocaleDateString("en-IN",{month:"long",year:"numeric"}),f=new Date(e,n,1).getDay(),d=new Date(e,n+1,0).getDate(),h=new Date(e,n,0).getDate(),g="";for(let w of["S","M","T","W","T","F","S"])g+=`<div class="${c.aiHint}">${w}</div>`;for(let w=0;w<42;w++){let v,K=e,k=n,z=!1;w<f?(v=h-f+w+1,k=n-1,k<0&&(k=11,K=e-1),z=!0):w>=f+d?(v=w-f-d+1,k=n+1,k>11&&(k=0,K=e+1),z=!0):v=w-f+1;let S=Dc(K,k,v),O=S<s,pt=[c.aiCalDay,z?c.aiCalMuted:"",O?c.aiCalMuted:"",S===r?c.aiCalToday:"",S===o?c.aiCalOn:""].filter(Boolean).join(" ");g+=`<button type="button" class="${pt}" data-iso="${S}" ${O?'disabled aria-disabled="true"':""}>${v}</button>`}t.innerHTML=`
    <div class="${c.aiCalHead}">
      <button type="button" data-cal="prev" aria-label="Previous month">\u2039</button>
      <div class="${c.aiHead}">${u}</div>
      <button type="button" data-cal="next" aria-label="Next month">\u203A</button>
    </div>
    <div class="${c.aiCalGrid}">${g}</div>
    <div class="${c.aiRow}">
      <button type="button" data-cal="clear">Clear</button>
      <button type="button" data-cal="today">Today</button>
    </div>
  `}function Ic(t){let e=document.querySelector(p(a.aiCal)),i=Pi(t)?.closest?.("button");if(!e||!i||!e.contains(i))return;t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation();let o=i.getAttribute("data-cal"),r=Q.which,s=r==="to"&&document.querySelector(p(a.aiFrom))?.value||ue();if(o==="prev"){Q.m0-=1,Q.m0<0&&(Q.m0=11,Q.y-=1),Ti();return}if(o==="next"){Q.m0+=1,Q.m0>11&&(Q.m0=0,Q.y+=1),Ti();return}if(o==="clear"){Si(r,""),Lt();return}if(o==="today"){let f=ue();f>=s&&(Si(r,f),Lt(),oa());return}if(i.disabled||i.getAttribute("aria-disabled")==="true")return;let u=i.getAttribute("data-iso");!u||u<s||(Si(r,u),Lt(),oa())}function jr(t){let e=document.querySelector(p(a.aiCal));if(!e||!t)return;let n=t.getBoundingClientRect(),i=Math.min(340,window.innerWidth-16),o=e.offsetHeight||360,r=Math.max(8,Math.min(n.left,window.innerWidth-i-8)),s=n.bottom+6;s+o>window.innerHeight-8&&n.top-6-o>=8?s=n.top-6-o:s=Math.max(8,Math.min(s,window.innerHeight-o-8)),e.style.position="fixed",e.style.top=`${Math.round(s)}px`,e.style.left=`${Math.round(r)}px`,e.style.width=`${i}px`,e.style.right="auto",e.style.bottom="auto"}function Yr(t,e){let n=document.querySelector(p(a.aiCal));n||(n=document.createElement("div"),n.id=a.aiCal,n.className=`${c.aiCal} ${c.hidden}`,n.dataset[$.mark]="",document.body.appendChild(n),l.on(n,"pointerdown",Ic,{capture:!0}),l.on(n,"click",r=>{n.contains(Pi(r))&&(r.preventDefault(),r.stopPropagation())},{capture:!0}));let i=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo))?.value,o=Ec(i)||new Date;Q={y:o.getFullYear(),m0:o.getMonth(),which:t},Ti(),n.classList.remove(c.hidden),jr(e),requestAnimationFrame(()=>jr(e))}function Rt(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function qt(t){return!!(t&&t.citiesEnabled)}async function L(){let t=await G();return t?.id?String(t.id):null}async function I(t){return t&&((await T(Pt))[Pt]||{})[t]||null}async function Li(t,e){if(!t)return;let i=(await T(Pt))[Pt]||{};e==null?delete i[t]:i[t]=e,await C({[Pt]:i})}var H=!1;function Fe(){return H}function fe(){H=!0,Qt(),Re()}function _t(){H=!1,E=!1,Qt()}async function $n(t){aa(),fe();let e=await I(t);if(!e){et();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await Li(t,e),et()}var wt=!1,Kt=null,It=null,Vr=2e4;function aa(){wt=!1,Kt&&(l.clear(Kt),Kt=null),It&&(l.clear(It),It=null)}async function Ue(t){if(_()||Xr()){t?await $n(t):fe(),y("Booking confirmed \u2014 Tik Tik stopped.");return}wt=!0,$t(),Ie(),y("Submit clicked \u2014 waiting for confirmation (Auto Submit + City Change stay ON)\u2026"),It&&l.clear(It);let e=Date.now(),n=async()=>{if(It=null,!(!wt||!l.alive)){if(Xr()||_()){let i=t||await L();i?await $n(i):fe(),y("Booking confirmed \u2014 Tik Tik stopped.");return}if(Date.now()-e>=Vr){await Ne("no confirmation yet \u2014 resuming city checks");return}It=l.setTimeout(n,400)}};It=l.setTimeout(n,400),Kt&&l.clear(Kt),Kt=l.setTimeout(()=>{Kt=null,wt&&Ne("submit wait timed out \u2014 resuming city checks")},Vr)}function Xr(){if(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))return!0;let t=(document.body?.innerText||"").slice(0,2500);return/appointment\s+confirmation|successfully\s+scheduled|your\s+appointment\s+has\s+been/i.test(t)}async function Ne(t=""){if(!wt&&!P&&!E){ut();return}aa(),E=!1,Qt(),H&&_t(),ut();let e=await L();if(e){let i=await I(e);i&&i.submitEnabled===!1&&i.citiesEnabled}let n=t?`Submit failed (${t})`:"Submit failed";if(y(`${n} \u2014 Auto Submit + City Change still ON; hopping cities\u2026`),R)Z(Date.now()),D();else if(e){let i=await I(e);qt(i)&&await In()}}function Ke(){return wt}function Ge(t,e,n){let i=String(t||"").slice(0,10);return!(!i||i.length<10||e&&i<e||n&&i>n)}async function at(){if(H||_()||!Ct())return null;let t=await L();if(!t)return null;let e=await I(t);return!Rt(e)||!e.from||!e.to?null:{...e,accountId:t}}async function me(){if(H||_()||!Ct())return null;let t=await L();if(!t)return null;let e=await I(t);return!qt(e)||!e.cities?.length?null:(wa(e),{...e,accountId:t})}function qi(t,e,n){let i=new Date;return i.setHours(0,0,0,0),(t||[]).filter(o=>o&&typeof o.Date=="string"&&o.Date.length>=10).filter(o=>Ge(o.Date,e,n)).filter(o=>{let[r,s,u]=o.Date.slice(0,10).split("-").map(Number);return new Date(r,s-1,u)>=i}).sort((o,r)=>String(o.Date).localeCompare(String(r.Date)))}var E=!1,bt=null,St=null,ot=!1,xt=0,R=!1,Y=0,vt=0,qe=0,jt=0,pe=!1,ct=null,gt=0,P=!1,W=0,de=null,Gt=null,Xt=0,Qr=!1,Jr="",Zr=!1,Ci=0;function Pc(t){return(t||[]).map(e=>e.id).join("")}function sa(){let t=document.querySelector(p(a.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function ta(t){let e=document.querySelector(p(a.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function Qt(){bt&&(l.clear(bt),bt=null),E=!1}function Ot(){de&&(l.clear(de),de=null)}function ca(){Ot(),W||(W=Date.now());let t=Math.max(500,Oe()-(Date.now()-W));de=l.setTimeout(()=>{de=null,!(!P||!R||!l.alive)&&(P=!1,W=0,Z(Date.now()),y(`City Change \u2014 booking hold timed out (${Oe()/1e3}s); next city in 13\u201318s\u2026`),D())},t)}function Lc(){Gt&&(l.clear(Gt),Gt=null)}function Dn(t=Date.now()){let e=!1;if(ot&&xt&&t-xt>=Mc&&(ot=!1,xt=0,e=!0),P&&(W||(W=t),t-W>=Oe()?(Ot(),P=!1,W=0,e=!0):de||ca()),pe){gt||(gt=t);let i=_i()?yt():Ut();if(t-gt>=i)tt(),e=!0;else if(!ct){let o=Math.max(500,i-(t-gt));ct=l.setTimeout(()=>{if(ct=null,!R||P)return;let r=_i(),s=r?yt():Ut();if(Date.now()-(gt||0)<s){Dn();return}tt(),Z(Date.now()),y(r?`City Change \u2014 still Loading after ${yt()/1e3}s; changing city\u2026`:`City Change \u2014 calendar up but no dates after ${Ut()/1e3}s; changing city\u2026`),D()},o)}}return E&&!bt&&(E=!1,e=!0),e}function la(){if(Gt||!R)return;let t=()=>{if(Gt=null,!R||!l.alive||H)return;let e=Date.now(),n=Dn(e),i=!!ie(new Date(e)),o=!!St,s=!(!i&&o||(pe||P||E)&&o)&&Xt>0&&e-Xt>=vi;if(n||s||!o&&!ot)s?(ot=!1,xt=0,tt(),Ot(),P=!1,W=0,E&&!bt&&(E=!1),Y=e,y(i?"City Change \u2014 unstuck; hopping now\u2026":`City Change \u2014 unstuck; waiting for IST window ${st()}\u2026`)):n?(Y=e,y(i?"City Change \u2014 lock cleared; hopping now\u2026":`City Change \u2014 lock cleared; next IST window ${st()}\u2026`)):y("City Change \u2014 timer lost; restarting\u2026"),D();else if(!i&&o){let f=Te(new Date(e));y(`City Change \u2014 waiting for slot window (IST ${st()}, next in ${si(f)})`)}R&&(Gt=l.setTimeout(t,zr))};Gt=l.setTimeout(t,zr)}function Re(){Wi(),Lc(),Kc(),Ot(),ot=!1,xt=0,R=!1,P=!1,W=0,Y=0,vt=0,Xt=0,tt()}function tt(){pe=!1,gt=0,ct&&(l.clear(ct),ct=null)}function Ri(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let i=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(i))continue;let o=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let r of o)if(r&&/\bLoading\.{0,3}\b/i.test((r.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let o=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(o))continue;let r=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(r))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function _i(){return Ri()}function ua(){pe=!0,gt=Date.now(),ct&&l.clear(ct),ct=l.setTimeout(()=>{ct=null,!(!R||P)&&(tt(),Z(Date.now()),y(`City Change \u2014 still Loading after ${yt()/1e3}s; changing city\u2026`),D())},yt())}function Oi(t){let e=Math.max(0,Number(t)||0)*1e3;jt=Math.max(jt,Date.now()+e),Y=Math.max(Y,jt),tt(),D()}function da(){tt()}function $t(){H||(P=!0,W||(W=Date.now()),Wi(),tt(),ca(),y("City Change \u2014 paused (Auto Submit booking)\u2026"))}function ut(){if(wt){y("Submit pending \u2014 staying on this city (ignoring date reload hop)\u2026");return}P&&(Ot(),P=!1,W=0,!(!R||H)&&(Z(Date.now()),y("City Change \u2014 resuming; next city in 13\u201318s\u2026"),D()))}async function En(){let t=await at();if(!t)return;let e=Date.now();if(e-Ci<6e4)return;Ci=e;let i=document.querySelector("#post_select")?.value;if(!i){y("Auto Submit ON \u2014 pick a city first.");return}let r=(await Mt()).find(u=>String(u.ID)===String(i)),s=r?.Days;if(Array.isArray(s)&&s.length){let u=qi(s,t.from,t.to);if(u.length){$t();let f=Be(u.length),d=u[f].Date;y(`Auto Submit: picking date #${f+1} (${d.slice(0,10)})\u2026`),l.send({action:"selectFirstDate",date:d,maxMs:He,pollMs:X});return}y(`Auto Submit ON \u2014 no dates in your range on ${r.Name||"this city"} yet.`);return}y("Auto Submit ON \u2014 loading slots for current city\u2026"),l.send({action:"selectPost",postId:String(i)})}function Ni(){Ci=0}function Wi(){St&&(l.clear(St),St=null)}function qc(t,e){return t+Math.random()*(e-t)}function Rc(){return qc(Di(),kc())}function Z(t=Date.now()){Y=t+Rc()}function Oc(t=Date.now()){let e=Te(new Date(t));if(e>0)return e;if(jt>t)return jt-t;if(vt){let n=vt+Di()-t;if(n>0)return n}return Y>t?Y-t:0}function D(){if(!R)return;if(Wi(),P||pe){St=l.setTimeout(()=>{xi()},500);return}let t=Date.now(),e=Te(new Date(t));if(e>0){Y>t&&(Y=t),e>=vi&&(Xt=t),St=l.setTimeout(()=>{xi()},e);return}let n=0;jt>t&&(n=Math.max(n,jt-t)),vt&&(n=Math.max(n,vt+Di()-t)),Y>t&&(n=Math.max(n,Y-t)),n=Math.max(0,n),n>=vi&&(Xt=Date.now()),St=l.setTimeout(()=>{xi()},n)}function Nc(t,e){if(!t.length)return null;if(t.length===1)return qe=0,t[0];let n=t.findIndex(o=>String(o.id)===String(e));n<0&&(n=Math.max(0,Math.min(qe,t.length-1)));let i=(n+1)%t.length;return qe=i,t[i]}function Hi(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function Yt(){let t=document.querySelector(p(a.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function ze(){return{from:document.querySelector(p(a.aiFrom))?.value||null,to:document.querySelector(p(a.aiTo))?.value||null}}function We(t=[],{force:e=!1}={}){let n=document.querySelector(p(a.aiCities));if(!n)return;let i=Hi(),o=Pc(i),r=document.querySelector(p(a.aiPanel)),s=r&&!r.classList.contains(c.hidden),u=sa();if(!e&&o===Jr&&n.querySelector('input[type="checkbox"]'))return;Jr=o;let f=new Set(s&&u.length&&!e&&!t.length?u:(t.length?t:u).map(String));if(n.replaceChildren(),!i.length){n.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let d of i){let h=document.createElement("label"),g=document.createElement("input");g.type="checkbox",g.value=d.id,g.dataset.name=d.name,g.checked=f.has(d.id),h.append(g,document.createTextNode(d.name)),n.appendChild(h)}}function Wc(t){let e=t?.cities||[];return e.length?e.map(n=>n.name||n.id).join(", "):"\u2014"}async function Tt(t,e={}){let n=await I(t)||{},{from:i,to:o}=ze(),r=Yt(),s={...n,from:i||n.from||null,to:o||n.to||null,cities:r.length?r:n.cities||[],loginId:document.querySelector(p(a.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(p(a.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(u=>{let f=[a.aiQ1,a.aiQ2,a.aiQ3][u],d=[a.aiA1,a.aiA2,a.aiA3][u];return{q:document.querySelector(p(f))?.value?.trim()||n.security?.[u]?.q||"",a:document.querySelector(p(d))?.value?.trim()||n.security?.[u]?.a||"",set:u+1}}),...e};return typeof s.submitEnabled=="boolean"&&(s.enabled=s.submitEnabled),s.serverUpdatedAt=Date.now(),await Li(t,s),Hc(s),s}var Tn=null,$i=null;function Hc(t){Tn&&l.clear(Tn),Tn=l.setTimeout(()=>{Tn=null,Kr(t).catch(()=>{})},400)}async function fa(t){if(!t||$i===t)return null;let e=await Gr();if($i=t,!e)return null;let n=await I(t)||{},i=Fr(n,e);return i?(i.loginId=n.loginId||i.loginId||"",i.loginPass=n.loginPass||"",i.security=n.security||i.security||[],typeof i.submitEnabled=="boolean"&&(i.enabled=i.submitEnabled),await Li(t,i),i):null}async function Bc(t,e){if(wt||!ie()||P||E)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let i=String(t);return String(n.value)===i?!1:(ua(),y(`Switching city \u2192 ${e||t}\u2026`),l.send({action:"selectPost",postId:i}),!0)}async function Fc(t,e,{alertId:n,dayCount:i}={}){if(H||_()||!Ct()||wt)return!1;let o=document.querySelector("#post_select");if(!o||!t)return!1;let r=String(t),s=e||r;return String(o.value)===r?(y(`City alert \u2014 already on ${s}`+(i?` (${i} dates reported)`:"")),!0):(Ot(),tt(),P=!1,W=0,E=!1,Qt(),ot=!1,xt=0,Y=Date.now(),vt=0,ua(),vt=Date.now(),y(`City alert \u2014 switching now \u2192 ${s}`+(i?` (${i} dates)`:"")+(n?` [#${n}]`:"")),l.send({action:"selectPost",postId:r}),R&&D(),!0)}var zt=null,_n=!1,Uc=1e3;function Kc(){zt&&(l.clear(zt),zt=null),_n=!1}async function Gc(){if(!(_n||!R||H)){_n=!0;try{let t=await me();if(!t?.cities?.length)return;let e=document.querySelector("#post_select"),n=await Wr({preferredCities:t.cities,citiesEnabled:!0,currentCityId:e?String(e.value):""});if(!n?.alertId)return;if(Hr(n.alertId),n.alreadyThere){y(`City alert \u2014 already on ${n.name||n.id}`+(n.dayCount?` (${n.dayCount} dates)`:""));return}await Fc(n.id,n.name,{alertId:n.alertId,dayCount:n.dayCount})}catch{}finally{_n=!1}}}function ma(){if(zt||!R)return;let t=()=>{zt=null,!(!R||H||!l.alive)&&Gc().finally(()=>{R&&!H&&l.alive&&(zt=l.setTimeout(t,Uc))})};zt=l.setTimeout(t,400)}function Bi(){Qr||!document.querySelector("#post_select")||(Qr=!0)}async function xi(){if(!(ot||!R)){ot=!0,xt=Date.now(),Xt=Date.now(),St=null;try{if(H||_()||!l.alive){Re();return}if(Dn()){Y=Date.now(),y(ie()?"City Change \u2014 auto-unstuck; hopping now\u2026":`City Change \u2014 auto-unstuck; waiting IST ${st()}\u2026`),D();return}if(P||E){let g=W?Date.now()-W:0;if(P&&g>=Oe()){Ot(),P=!1,W=0,Z(Date.now()),y("City Change \u2014 hold expired; next city in 13\u201318s\u2026"),D();return}let w=Math.max(0,Oe()-g);y(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(w/1e3)}s`),D();return}let t=Date.now(),e=ie(new Date(t)),n=Te(new Date(t));if(!e){y(`City Change \u2014 waiting for slot window (IST ${st()}, next in ${si(n)})`),D();return}if(pe){let g=gt?t-gt:0;if(_i()){if(g>=yt()){tt(),Z(Date.now()),y(`City Change \u2014 still Loading after ${yt()/1e3}s; changing city\u2026`),D();return}let v=Math.max(0,Math.ceil((yt()-g)/1e3));y(`City Change \u2014 Date Loading\u2026 stay (${v}s then hop if still Loading)`),D();return}if(g>=Ut()){tt(),Z(Date.now()),y(`City Change \u2014 calendar up but no dates after ${Ut()/1e3}s; changing city\u2026`),D();return}let w=Math.max(0,Math.ceil((Ut()-g)/1e3));y(`City Change \u2014 waiting calendar dates\u2026 (${w}s then hop)`),D();return}let i=Oc(t);if(i>0){let g=Math.ceil(i/1e3);y(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,g)}s`),D();return}let o=await me();if(!o?.cities?.length){Re();return}let r=new Set(Hi().map(g=>g.id)),s=o.cities.filter(g=>r.has(String(g.id)));if(!s.length){y("Preferred cities not found in the dropdown \u2014 pick cities again."),Re();return}let u=document.querySelector("#post_select"),f=u?String(u.value):"",d=Nc(s,f);if(!d){Z(t),D();return}if(await Bc(d.id,d.name)){vt=Date.now(),Z(vt);let g=s.map(v=>v.name||v.id).join(" \u2192 "),w=`${qe+1}/${s.length}`;y(`City Change \u2014 ${w} ${d.name||d.id} (path: ${g}); Loading up to ${yt()/1e3}s, no-dates hop ${Ut()/1e3}s`)}else Z(t);D()}finally{ot=!1,xt=0}}}async function In(){if(H||_()||!Ct())return;let t=await me();if(!t?.cities?.length)return;let e=new Set(Hi().map(s=>s.id)),n=t.cities.filter(s=>e.has(String(s.id)));if(!n.length){y("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}Ot(),tt(),P=!1,W=0,E=!1,ot=!1,xt=0,R=!0,Xt=Date.now(),Y=Date.now();let i=document.querySelector("#post_select"),o=i?String(i.value):"",r=n.findIndex(s=>String(s.id)===o);qe=r>=0?r:0,y(`City Change ON \u2014 IST ${st()}; hop 13\u201318s; slot alerts force-switch preferred cities`),la(),ma(),D()}async function pa(){if(H||_()||!Ei()||!l.alive||!(await me())?.cities?.length||!document.querySelector("#post_select"))return;if(!R){await In();return}let e=Dn();la(),ma(),(e||!St&&!ot)&&(e&&(Z(Date.now()),y("City Change \u2014 auto-unstuck; next city in 13\u201318s\u2026")),D())}function ha(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function Pn(){let t=ha();return!!(t&&!t.disabled)}function Fi(){let t=ha();if(!t||t.disabled)return!1;try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}return l.send({action:"forceClickSubmit",prefix:m,pollMs:X,maxMs:An}),!0}function zc(){return j()?Pn():!1}function ga(){y("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function Ui(t){if(H||_()||E)return;let e=await I(t);if(!Rt(e))return;$t(),E=!0,Ie();let n=Date.now(),i=!1,o=j()?Date.now():0,r=async f=>{if(!(i||!E||!l.alive)){if(i=!0,window.removeEventListener("message",s),bt&&(l.clear(bt),bt=null),_()){E=!1;return}if(E=!1,f){await Ue(t);return}ut(),y(R?"Auto Submit \u2014 Submit not clicked in time; City Change resuming\u2026":"Auto Submit \u2014 Submit not clicked in time; still watching\u2026")}},s=f=>{!l.alive||f.source!==window||f.data?.action===At.sub&&r(!0)};window.addEventListener("message",s);let u=async()=>{if(i||!E||!l.alive)return;let f=Date.now(),d=f-n;if(j()&&!o&&(o=f,y("Time slot selected \u2014 waiting for Submit to enable\u2026")),o&&f-o>=$c&&(zc()?(y("Submit enabled \u2014 clicking\u2026"),Fi()):y("Waiting for Submit button to enable\u2026")),d>=An)return r(!1);bt=l.setTimeout(u,X)};u()}async function ya(){if(!j()||E||H)return;let t=await at();t&&await Ui(t.accountId)}function y(t){let e=document.querySelector(p(a.aiStatus));e&&(e.textContent=t)}function q(t){y(t)}function ea(t){return!!(t&&t.termsAgreed)}function ba(t){return!!(t&&t.termsPassed)}function kn(){return!!document.querySelector(p(a.aiTermsAgree))?.checked}function Ki(t){let e=document.querySelector(p(a.aiTermsGate)),n=document.querySelector(p(a.aiMain)),i=document.querySelector(p(a.aiTermsAgree)),o=document.querySelector(p(a.aiTermsContinue)),r=ba(t);e&&e.classList.toggle(c.hidden,r),n&&n.classList.toggle(c.hidden,!r),i&&(i.checked=ea(t)||kn()),o&&(o.disabled=!(ea(t)||kn()))}function jc(){let t=document.querySelector(p(a.aiTermsContinue)),e=kn();t&&(t.disabled=!e),y(e?"Terms checked \u2014 tap Continue.":"Check Agree to continue.")}async function Yc(){if(!kn()){y("Check Agree first.");return}let t=await L();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let e=await I(t)||{},{from:n,to:i}=ze(),o=Yt(),r=Ln();_t(),Qt(),Ni(),it=!0,lt=!0,await Tt(t,{termsAgreed:!0,termsPassed:!0,termsAgreedAt:e.termsAgreedAt||Date.now(),submitEnabled:!0,citiesEnabled:!0,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],slotWindows:r.length?r:e.slotWindows||null,confirmedAt:Date.now()}),await et(),rt(document.querySelector(p(a.aiSubmitSw)),!0),rt(document.querySelector(p(a.aiCitiesSw)),!0),it=!0,lt=!0,qn(await I(t)),We((e.cities||[]).map(u=>u.id),{force:!0}),Gi(e),Ki(await I(t)),(Yt().length?Yt():e.cities||[]).length&&(Bi(),await In()),(n||e.from)&&(i||e.to)&&await En(),y("Auto Submit and City Change ON \u2014 set dates and preferred cities.")}function wa(t){t?.slotWindows?.length?Go(t.slotWindows):ai()}function Vc(t){let e="";for(let n=0;n<=59;n++){let i=Number(t)===n?" selected":"";e+=`<option value="${n}"${i}>:${String(n).padStart(2,"0")}</option>`}return e}function na(t,e){let n=Math.min(Et,59-Number(t||0)),i="";for(let o=1;o<=Math.max(1,n);o++){let r=Number(e)===o?" selected":"";i+=`<option value="${o}"${r}>${o} min</option>`}return i}function Sa(t,e){let n=Number(t)||0,i=Number(e)||1,o=Math.min(59,n+i);return`Runs from :${String(n).padStart(2,"0")} up to :${String(o).padStart(2,"0")}`}function Ln(){let t=document.querySelector(p(a.aiWinList));if(!t)return[];let e=[];for(let n of t.querySelectorAll(`.${c.aiWinRow}`)){let i=Number(n.querySelector('select[data-win="from"]')?.value),o=Number(n.querySelector('select[data-win="dur"]')?.value);!Number.isFinite(i)||!Number.isFinite(o)||e.push({fromMin:i,durationMin:o})}return ri(e)}function ia(t){let e=t.querySelector('select[data-win="from"]'),n=t.querySelector('select[data-win="dur"]'),i=t.querySelector(`.${c.aiWinHelp}`);!e||!n||!i||(i.textContent=Sa(e.value,n.value))}function xa(t=0,e=6){let n=Math.min(Et,59-t),i=Math.min(Math.max(1,e||1),Math.max(1,n)),o=document.createElement("div");o.className=c.aiWinRow,o.innerHTML=`
    <div class="${c.aiInline}">
      <label class="${c.aiHead}">Start</label>
      <select data-win="from">${Vc(t)}</select>
      <label class="${c.aiHead}" style="margin-left:10px;color:#6b7280;font-weight:500">Duration</label>
      <select data-win="dur">${na(t,i)}</select>
      <button type="button" class="${c.aiTrash}" data-win="del" title="Delete timing" aria-label="Delete">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
        </svg>
      </button>
    </div>
    <div class="${c.aiWinHelp}">${Sa(t,i)}</div>
  `;let r=o.querySelector('select[data-win="from"]'),s=o.querySelector('select[data-win="dur"]');return l.on(r,"change",()=>{let u=Number(r.value),f=Number(s.value)||1;s.innerHTML=na(u,f),ia(o)}),l.on(s,"change",()=>ia(o)),l.on(o.querySelector('button[data-win="del"]'),"click",()=>{o.remove(),zi()}),o}function Gi(t){let e=document.querySelector(p(a.aiWinList));if(!e)return;e.replaceChildren();let n=t?.slotWindows?.length?zo(t.slotWindows):[];for(let i of n.slice(0,ht))e.appendChild(xa(i.fromMin,i.durationMin));zi(t)}function zi(t){let e=document.querySelector(p(a.aiWinNote));e&&(t?.slotWindows?.length||Ln().length?e.textContent=`Custom windows active (max ${ht}, each \u2264 ${Et} min).`:e.textContent=`Using defaults: ${st()}. Add up to ${ht} windows below.`)}function rt(t,e){t&&(t.classList.toggle(c.aiOnBtn,!!e),t.setAttribute("aria-checked",e?"true":"false"))}function Xc(t){rt(document.querySelector(p(a.aiSubmitSw)),Rt(t)),rt(document.querySelector(p(a.aiCitiesSw)),qt(t))}var it=!1,lt=!1;function qn(t){let e=Rt(t)||it,n=qt(t)||lt,i=document.querySelector(p(a.aiSubmitBody)),o=document.querySelector(p(a.aiCitiesBody));i&&i.classList.toggle(c.hidden,!e),o&&o.classList.toggle(c.hidden,!n)}function Qc(t,e){let n=document.querySelector(p(a.aiStatus)),i=document.querySelector(p(a.aiBtn));if(!n||!i)return;Xc(t),qn(t);let o=Rt(t),r=qt(t),s=o||r;s?(i.classList.add(c.aiOn),i.textContent="Tik Tik ON"):(i.classList.remove(c.aiOn),i.textContent="Tik Tik");let u=[];o&&t.from&&t.to?u.push(`Auto Submit ON (${Vt(t.from)} \u2013 ${Vt(t.to)}, clicks Submit as soon as time slot is ready)`):it&&!o?u.push("Auto Submit \u2014 set From / To dates, then Enable again"):u.push("Auto Submit OFF"),r?u.push(`City Change ON (${Wc(t)}, ${st()})`):lt&&!r?u.push("City Change \u2014 pick preferred cities, then Enable again"):u.push("City Change OFF"),n.textContent=`Account ${e||"\u2014"}: ${u.join(" \xB7 ")}`,n.classList.toggle(c.aiOk,s)}async function et(){let t=await L();if(t)try{await fa(t)}catch{}let e=t?await I(t):null;Rt(e)||(it=!1),qt(e)||(lt=!1),wa(e),Qc(e,t),Ki(e);let n=document.querySelector(p(a.aiFrom)),i=document.querySelector(p(a.aiTo));n&&(n.value=e?.from||""),i&&(i.value=e?.to||""),Ii();let o=(e?.cities||[]).map(S=>S.id),r=document.querySelector(p(a.aiPanel)),s=r&&!r.classList.contains(c.hidden),u=document.querySelector(p(a.aiCitiesBody)),f=u&&!u.classList.contains(c.hidden),d=sa();(f||qt(e)||lt)&&We(s&&d.length?d:o),Gi(e);let h=document.querySelector(p(a.aiLogin)),g=document.querySelector(p(a.aiPass));h&&e?.loginId&&(h.value=e.loginId),g&&e?.loginPass&&(g.value=e.loginPass);let w=e?.security||[],v=[a.aiQ1,a.aiQ2,a.aiQ3],K=[a.aiA1,a.aiA2,a.aiA3];v.forEach((S,O)=>{let pt=document.querySelector(p(S));pt&&(pt.innerHTML=Cn(O,w[O]?.q||""))}),K.forEach((S,O)=>{let pt=document.querySelector(p(S));pt&&w[O]?.a&&(pt.value=w[O].a)});let k=document.querySelector(p(a.aiLoginBody)),z=k&&!k.classList.contains(c.hidden);ji(!!z,al(e))}function Jc(){let t=document.querySelector(p(a.aiPanel));return!!(t&&!t.classList.contains(c.hidden))}function ki(t){let e=document.querySelector(p(a.aiPanel));e&&(t||Lt(),e.classList.toggle(c.hidden,!t),t&&L().then(async n=>{if(n)try{$i=null,await fa(n)}catch{}let i=n?await I(n):null;Ki(i),ba(i)?We((i?.cities||[]).map(o=>o.id),{force:!0}):y("Read the terms, check Agree, then Continue.")}))}function Mi(){if(Mi._done)return;Mi._done=!0;let t=e=>{if(!Jc())return;let n=document.querySelector(p(a.aiPanel)),i=document.querySelector(p(a.aiBtn)),o=document.querySelector(p(a.aiCal)),r=Pi(e);if(!(o&&!o.classList.contains(c.hidden)&&r&&o.contains(r))){if(o&&!o.classList.contains(c.hidden)){let s=document.querySelector(p(a.aiFromBtn)),u=document.querySelector(p(a.aiToBtn));!(s&&r&&(s===r||s.contains(r)))&&!(u&&r&&(u===r||u.contains(r)))&&Lt()}n&&r&&(n===r||n.contains(r))||i&&r&&(i===r||i.contains(r))||(Lt(),ki(!1))}};l.on(document,"pointerdown",t,{capture:!0})}async function Zc(t){let e=await L();if(!e){y("Open a logged-in schedule page so we can bind this to your account.");return}let n=await I(e)||{},{from:i,to:o}=ze();if(i=i||n.from||null,o=o||n.to||null,t){it=!0,rt(document.querySelector(p(a.aiSubmitSw)),!0),_t(),Qt(),Ni(),await Tt(e,{submitEnabled:!0,from:i||null,to:o||null,confirmedAt:Date.now()});let r=document.querySelector(p(a.aiFrom)),s=document.querySelector(p(a.aiTo));if(r&&i&&(r.value=i),s&&o&&(s.value=o),Ii(),await et(),rt(document.querySelector(p(a.aiSubmitSw)),!0),it=!0,qn(await I(e)),!i||!o){y("Auto Submit ON \u2014 select From and To dates to start booking.");return}if(i>o){y("Auto Submit ON \u2014 From date must be before To date.");return}it=!1,y(`Auto Submit ON (${Vt(i)} \u2013 ${Vt(o)})`),await En();return}it=!1,Qt(),rt(document.querySelector(p(a.aiSubmitSw)),!1),await Tt(e,{submitEnabled:!1,from:i||n.from,to:o||n.to}),await et(),y("Auto Submit OFF")}async function tl(t){let e=await L();if(!e){y("Open a logged-in schedule page so we can bind this to your account.");return}let n=await I(e)||{};if(t){lt=!0,rt(document.querySelector(p(a.aiCitiesSw)),!0),We((n.cities||[]).map(s=>s.id),{force:!0}),Gi(n);let o=Yt();!o.length&&n.cities?.length&&(o=n.cities);let r=Ln();if(_t(),await Tt(e,{citiesEnabled:!0,cities:o.length?o:n.cities||[],slotWindows:r.length?r:n.slotWindows||null}),await et(),rt(document.querySelector(p(a.aiCitiesSw)),!0),lt=!0,qn(await I(e)),o.length||We([],{force:!0}),!o.length){y("City Change ON \u2014 select at least one preferred city to start hopping.");return}lt=!1,Bi(),await In(),y(`City Change ON (${o.map(s=>s.name||s.id).join(", ")})`);return}lt=!1,Re(),rt(document.querySelector(p(a.aiCitiesSw)),!1);let i=Yt();await Tt(e,{citiesEnabled:!1,cities:i.length?i:n.cities||[]}),await et(),y("City Change OFF")}async function oa(){let t=await L();if(!t)return;let e=await I(t)||{};if(!Rt(e)&&!it)return;let{from:n,to:i}=ze();!n||!i||n>i||(await Tt(t,{submitEnabled:!0,from:n,to:i,confirmedAt:Date.now()}),it=!1,await et(),rt(document.querySelector(p(a.aiSubmitSw)),!0),_t(),Ni(),y(`Auto Submit ON (${Vt(n)} \u2013 ${Vt(i)})`),await En())}function el(t){return(t||[]).map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", ")}async function nl(){let t=document.querySelector(p(a.aiWinList));if(t){if(t.querySelectorAll(`.${c.aiWinRow}`).length>=ht){y(`Max ${ht} timing windows.`);return}t.appendChild(xa(0,Math.min(6,Et))),zi()}}async function il(){let t=await L();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let e=Ln();if(!e.length){y("Add at least one timing (or Reset to defaults).");return}await Tt(t,{slotWindows:e}),await et(),y(`Saved ${e.length} custom timing(s): ${el(e)}`)}async function ol(){let t=await L();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}window.confirm("Reset to default IST windows? Your custom timings will be removed.")&&(await Tt(t,{slotWindows:null}),ai(),await et(),y(`Using default windows: ${st()}`))}async function rl(){let t=await L();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let{from:e,to:n}=ze(),i=Yt(),o=document.querySelector(p(a.aiLogin))?.value?.trim(),r=document.querySelector(p(a.aiPass))?.value,s=[0,1,2].map(u=>({q:document.querySelector(p([a.aiQ1,a.aiQ2,a.aiQ3][u]))?.value?.trim()||"",a:document.querySelector(p([a.aiA1,a.aiA2,a.aiA3][u]))?.value?.trim()||""}));if(!o||!r){y("Enter ID and password before saving.");return}if(s.some(u=>!u.q||!u.a)){y("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}await Tt(t,{}),ji(!0,!0),y("Saved ID, password, and 3 security questions (1 from each set).")}function al(t){let e=t?.security||[];return!!(t?.loginId&&t?.loginPass&&e.length>=3&&e.every(n=>n?.q&&n?.a))}function ji(t,e){let n=document.querySelector(p(a.aiLoginToggle));if(!n)return;let i=t?"\u25BE":"\u25B8";n.textContent=e?`Login details (saved) ${i}`:`Login details ${i}`}function sl(){let t=document.querySelector(p(a.aiLoginBody)),e=document.querySelector(p(a.aiLoginToggle));if(!t||!e)return;let n=t.classList.contains(c.hidden);t.classList.toggle(c.hidden,!n);let i=/saved/i.test(e.textContent||"");ji(n,i)}function Yi(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==a.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==a.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===a.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function Ai(){document.querySelector(p(a.aiPanel))?.remove(),document.querySelector(p(a.aiBtn))?.remove(),Yi()}function cl(){if(_())return;if(!Ei()){Ai();return}if(document.querySelector(p(a.aiBtn)))if(!document.querySelector(p(a.aiSubmitSw))||!document.querySelector(p(a.aiTermsContinue))||!document.querySelector(p(a.aiFromBtn)))Ai();else return;let t=tr();if(!t)return;let e=document.createElement("button");e.id=a.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[$.mark]="",l.on(e,"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiPanel)),r=o&&o.classList.contains(c.hidden);ki(!!r)}),t.appendChild(e);let n=document.createElement("div");n.id=a.aiPanel,n.className=c.hidden,n.dataset[$.mark]="",n.innerHTML=`
    <div id="${a.aiTermsGate}">
      <div id="${a.aiTerms}" class="${c.aiTerms}">
        <div class="${c.aiHead}">Terms &amp; Conditions</div>
        <div class="${c.aiHint}">Please read carefully before continuing.</div>
        <ul class="${c.aiTermsList}">
          <li>Options apply to this applicant only. They do not bypass CAPTCHAs, waiting rooms, or portal security.</li>
          <li>During your windows, City Change hops every 13\u201318s. Max ${ht} windows, each up to ${Et} minutes.</li>
          <li>Checking too fast may trigger <b>1015 Rate Limit</b> errors.</li>
        </ul>
        <label class="${c.aiTermsCb}">
          <input type="checkbox" id="${a.aiTermsAgree}" />
          <span>I have read and agree to these terms.</span>
        </label>
        <button type="button" id="${a.aiTermsContinue}" class="${c.aiContinue}" disabled>Continue</button>
      </div>
    </div>
    <div id="${a.aiMain}" class="${c.hidden}">
      <div class="${c.aiSec}">
        <div class="${c.aiRow}" style="justify-content:space-between;margin-bottom:4px">
          <div>
            <div class="${c.aiHead}" style="font-size:17px">Auto Submit</div>
            <div class="${c.aiHint}" style="margin:2px 0 0">Book automatically when a date in your range appears.</div>
          </div>
          <button type="button" id="${a.aiSubmitSw}" class="${c.aiSwitch}" role="switch" aria-checked="false" aria-label="Auto Submit">
            <span class="${c.aiKnob}"></span>
          </button>
        </div>
        <div id="${a.aiSubmitBody}" class="${c.hidden}">
          <div class="${c.aiRow}" style="margin-top:10px">
            <label>From
              <button type="button" id="${a.aiFromBtn}" class="${c.aiDateBtn}">Select date</button>
              <input type="hidden" id="${a.aiFrom}" />
            </label>
            <label>To
              <button type="button" id="${a.aiToBtn}" class="${c.aiDateBtn}">Select date</button>
              <input type="hidden" id="${a.aiTo}" />
            </label>
          </div>
        </div>
      </div>
      <div class="${c.aiSec}">
        <div class="${c.aiRow}" style="justify-content:space-between;margin-bottom:4px">
          <div>
            <div class="${c.aiHead}" style="font-size:17px">City Change</div>
            <div class="${c.aiHint}" style="margin:2px 0 0">Rotate preferred cities during release windows.</div>
          </div>
          <button type="button" id="${a.aiCitiesSw}" class="${c.aiSwitch}" role="switch" aria-checked="false" aria-label="City Change">
            <span class="${c.aiKnob}"></span>
          </button>
        </div>
        <div id="${a.aiCitiesBody}" class="${c.hidden}">
          <div class="${c.aiHint}" style="margin:10px 0 4px;font-weight:600;color:#111827">
            Preferred cities
            <button type="button" id="${a.aiCitiesAll}" class="${c.aiCityAct}">Select all</button>
            <button type="button" id="${a.aiCitiesNone}" class="${c.aiCityAct}">Clear</button>
          </div>
          <div id="${a.aiCities}" class="${c.aiCities}"></div>
          <div class="${c.aiHead}" style="font-size:16px;margin:14px 0 8px">Release Window Checks</div>
          <p id="${a.aiWinNote}" class="${c.aiHint}"></p>
          <div id="${a.aiWinList}"></div>
          <div class="${c.aiRow}" style="margin-top:8px">
            <button type="button" id="${a.aiWinAdd}">+ Add timing</button>
            <button type="button" id="${a.aiWinSave}">Save timings</button>
            <button type="button" id="${a.aiWinReset}">Reset defaults</button>
          </div>
        </div>
      </div>
      <div class="${c.aiSec}">
        <div class="${c.aiRow}" style="margin:0">
          <button type="button" id="${a.aiLoginToggle}">Login details \u25B8</button>
          <button type="button" id="${a.aiClose}">Close</button>
        </div>
        <div id="${a.aiLoginBody}" class="${c.hidden}" style="margin-top:8px">
          <div class="${c.aiHint}" style="margin:4px 0;font-weight:600;color:#111827">Login (auto-login on Home when logged out)</div>
          <div class="${c.aiRow}">
            <label>ID / email <input type="email" id="${a.aiLogin}" autocomplete="off" /></label>
            <label>Password <input type="password" id="${a.aiPass}" autocomplete="off" /></label>
          </div>
          <div class="${c.aiHint}" style="margin:0 0 6px">
            3 sets \xD7 5 questions. Pick <b>1 question from each set</b>, then type <b>your answer</b> for that question.
          </div>
          <div class="${c.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 1 \u2014 choose 1 question
              <select id="${a.aiQ1}">${Cn(0)}</select>
            </label>
            <label>Your answer for set 1
              <input type="text" id="${a.aiA1}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${c.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 2 \u2014 choose 1 question
              <select id="${a.aiQ2}">${Cn(1)}</select>
            </label>
            <label>Your answer for set 2
              <input type="text" id="${a.aiA2}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${c.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 3 \u2014 choose 1 question
              <select id="${a.aiQ3}">${Cn(2)}</select>
            </label>
            <label>Your answer for set 3
              <input type="text" id="${a.aiA3}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${c.aiRow}">
            <button type="button" id="${a.aiSaveLogin}">Save login details</button>
          </div>
        </div>
      </div>
    </div>
    <div id="${a.aiStatus}" class="${c.aiHint}" style="margin-top:10px"></div>
  `,t.insertAdjacentElement("afterend",n),l.on(n.querySelector(p(a.aiSubmitSw)),"click",async()=>{let i=await L(),o=i?await I(i):null;await Zc(!Rt(o))}),l.on(n.querySelector(p(a.aiCitiesSw)),"click",async()=>{let i=await L(),o=i?await I(i):null;await tl(!qt(o))}),l.on(n.querySelector(p(a.aiWinAdd)),"click",nl),l.on(n.querySelector(p(a.aiWinSave)),"click",il),l.on(n.querySelector(p(a.aiWinReset)),"click",ol),l.on(n.querySelector(p(a.aiSaveLogin)),"click",rl),l.on(n.querySelector(p(a.aiLoginToggle)),"click",sl),l.on(n.querySelector(p(a.aiClose)),"click",()=>ki(!1)),l.on(n.querySelector(p(a.aiCitiesAll)),"click",()=>ta(!0)),l.on(n.querySelector(p(a.aiCitiesNone)),"click",()=>ta(!1)),l.on(n.querySelector(p(a.aiTermsAgree)),"change",()=>{jc()}),l.on(n.querySelector(p(a.aiTermsContinue)),"click",()=>{Yc()}),l.on(n.querySelector(p(a.aiFromBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiCal));if(o&&!o.classList.contains(c.hidden)&&Q.which==="from"){Lt();return}Yr("from",i.currentTarget)}),l.on(n.querySelector(p(a.aiToBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiCal));if(o&&!o.classList.contains(c.hidden)&&Q.which==="to"){Lt();return}Yr("to",i.currentTarget)}),Mi(),et()}function ll(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",l.on(e,"click",()=>{L().then(n=>{Ue(n||null)})}))};t(document.querySelector("#submitbtn")),l.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function Vi(){if(l.alive&&!_()){if(!Ei()){Ai();return}await l.waitFor("#post_select",{attempts:nn})&&(Pr(t=>{let e=String(t?.message||t?.source||"error").slice(0,120);Ne(e)}),cl(),Bi(),ll(),!Zr&&(Zr=!0,l.setTimeout(()=>et(),800),l.setTimeout(async()=>{await at()&&await En()},1500)))}}var va=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function Ta(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function ul(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=Ta(t.data.url),i=new URLSearchParams(t.data.request||"").get("parameters");if(!i)return null;let o;try{o=JSON.parse(i)}catch{return null}return{params:o,tail:e,response:t.data.response}}async function dl(t,e={}){t?.length&&(await br(t,e),await x("audioAlert")&&rr())}async function fl(t,e=!1){if(e||_())return null;let n=new Date;n.setHours(0,0,0,0);let i=(t||[]).map(s=>{if(!s)return null;let u=On(s.Date);return u?{...s,Date:u}:null}).filter(Boolean).filter(s=>{let[u,f,d]=s.Date.slice(0,10).split("-").map(Number);return!u||!f||!d?!1:new Date(u,f-1,d)>=n}).sort((s,u)=>String(s.Date).localeCompare(String(u.Date))),o=await at();if(o){let s=i.filter(f=>Ge(f.Date,o.from,o.to));if(!s.length)return null;let u=Be(s.length);return s[u]?.Date||null}if(!await x("autoSelectFirstDate")||!i.length)return null;let r=Be(i.length);return i[r]?.Date||null}function On(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,r,s]=n;return`${s}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime())){let r=o.getFullYear(),s=String(o.getMonth()+1).padStart(2,"0"),u=String(o.getDate()).padStart(2,"0");return`${r}-${s}-${u}`}}return null}function ml(t){if(!t)return!1;let[e,n,i]=t.slice(0,10).split("-").map(Number);if(!e||!n||!i)return!1;let o=n-1,r=String(n).padStart(2,"0")+"/"+String(i).padStart(2,"0")+"/"+e,s=document.querySelector("#datepicker");if(s){let u=String(s.value||"").trim();if(u===r)return!0;if(u.includes(String(e))&&u.includes(String(i).padStart(2,"0"))){let f=u.split(/[/-]/).map(d=>parseInt(d,10));if(f.length>=3){let d,h,g;if(f[2]>31?(h=f[0],g=f[1],d=f[2]):(d=f[0],h=f[1],g=f[2]),d===e&&h===n&&g===i)return!0}}try{let f=window.jQuery||window.$;if(f&&f(s).hasClass("hasDatepicker")){let d=f(s).datepicker("getDate");if(d&&d.getFullYear()===e&&d.getMonth()===o&&d.getDate()===i)return!0}}catch{}}for(let u of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let f=u.querySelector("a");if(!f)continue;let d=parseInt(u.getAttribute("data-month"),10),h=parseInt(u.getAttribute("data-year"),10),g=parseInt(f.textContent,10);if(h===e&&d===o&&g===i)return!0}return!1}var Rn=null;function pl(t,e){Rn&&l.clear(Rn);let n=Date.now()+(e?He:8e3),i=()=>{!l.alive||Date.now()>n||ml(t)||(l.send({action:"selectFirstDate",date:t,maxMs:e?He:8e3,pollMs:X}),Rn=l.setTimeout(i,X))};Rn=l.setTimeout(i,80)}function Ca(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function hl(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function _a(t){return t?.length?t.map((e,n)=>({entry:e,index:n,avail:hl(e)})).sort((e,n)=>n.avail!==e.avail?n.avail-e.avail:e.index-n.index):[]}function gl(t){let e=_a(t);return e.length?{entry:e[0].entry,slotIndex:e[0].index}:{entry:null,slotIndex:0}}function $a(){Jt&&(l.clear(Jt),Jt=null)}async function yl(t){let e=Date.now()+Math.max(0,Number(t)||0);for(;l.alive&&Date.now()<e;){if(Fe()||_())return!1;if(j()&&Pn())return!0;await new Promise(n=>l.setTimeout(n,X))}return!!(j()&&Pn())}var ka=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),Ma=null,bl=null,Jt=null;function wl(t,e){Ma=t,bl=e?String(e).slice(0,10):null}function Sl(t,e=0){Jt&&l.clear(Jt);let n=t?String(t).slice(0,10):null,i=0,o=async()=>{if(!l.alive||Fe()||++i>240||j())return;let r=(Ma||[]).filter(s=>s&&s.Time);if(r.length){let{entry:s,slotIndex:u}=gl(r);if(q(`Watchdog: picking time slot #${u+1}\u2026`),await De({time:Ca(s.Time),date:s.Date?String(s.Date).slice(0,10):n,slotIndex:u,pollMs:X,maxMs:600,prefix:m}),j())return}else if(document.querySelector(ka)&&(q("Watchdog: picking visible time slot\u2026"),await De({time:"00:00",date:n,slotIndex:e,pollMs:X,maxMs:600,prefix:m}),j()))return;Jt=l.setTimeout(o,X)};Jt=l.setTimeout(o,300)}var xl=["#datepicker.hasDatepicker","#datepicker"].join(", ");async function vl(t,e=!1){if(e)return null;let n=await fl(t,e);if(!n)return null;let i=await at(),o=new Date;o.setHours(0,0,0,0);let r=(t||[]).map(f=>On(f?.Date)).filter(Boolean).filter(f=>{let[d,h,g]=f.slice(0,10).split("-").map(Number);return new Date(d,h-1,g)>=o}).sort((f,d)=>f.localeCompare(d)),s=i?r.filter(f=>Ge(f,i.from,i.to)):r,u=Be(s.length);return q(`Selecting date #${u+1}: ${n} (fast)\u2026`),await l.waitFor(xl,{attempts:80,interval:X}),l.send({action:"selectFirstDate",date:n,maxMs:i?He:8e3,pollMs:X}),pl(n,i),Sl(n,Mn),n}async function Tl(t,e=!1){if(e||_()||Fe())return;let n=await at();if(!n&&!await x("autoSelectFirstDate"))return;$a();let i=(t||[]).filter(u=>!(!u||!u.Time||u.EntriesAvailable!=null&&Number(u.EntriesAvailable)<=0));n&&(i=i.filter(u=>{let f=u.Date?String(u.Date).slice(0,10):null;return f?f>=n.from&&f<=n.to:!0}));let o=_a(i);if(!o.length)return;let r=Date.now()+1e4;for(;Date.now()<r&&l.alive&&!(Mr(i)||document.querySelector(ka));)await new Promise(u=>l.setTimeout(u,X));let s=o.length===1?An:ra;q(o.length===1?`1 time slot \u2014 try highest avail, wait \u2264${s/1e3}s for Submit\u2026`:`${o.length} time slots \u2014 try highest\u21922nd\u21923rd\u2026 (${s/1e3}s each for Submit)`);for(let u=0;u<o.length;u++){if(!l.alive||Fe()||_())return;let{entry:f,index:d,avail:h}=o[u],g=Ca(f.Time),w=f.Date?String(f.Date).slice(0,10):null,v=u===0?"highest":u===1?"2nd-highest":u===2?"3rd-highest":`${u+1}th-highest`;if(q(`Trying ${v} avail (${h}) @ ${g} \u2014 slot ${u+1}/${o.length}\u2026`),!await De({time:g,date:w,slotIndex:d,pollMs:X,maxMs:4e3,prefix:m})&&!j()){q(`Could not click ${g} \u2014 trying next\u2026`);continue}if(q(`Selected ${g} (${v}) \u2014 waiting \u2264${s/1e3}s for Submit to enable\u2026`),await yl(s)){q(`Submit enabled on ${g} \u2014 clicking\u2026`),n?await Ui(n.accountId):Fi();return}u<o.length-1&&q(`Submit still disabled on ${g} \u2014 trying next (${u+2}/${o.length})\u2026`)}q(`Tried all ${o.length} time slot(s); Submit never enabled.`),n&&ut()}async function Aa(t){if(!N()||_())return;let e;try{e=ul(t)}catch{return}if(e==null)return;if(Lr(e),e.retryAfter!==void 0){let r=Number(e.retryAfter);Oo(e.cgiBlock,r),r?(mn(r),Oi(r)):x("defaultWaitTime").then(s=>{mn(s),Oi(s)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let r=e.response.Posts||[],s=new Map((await Mt()).map(u=>[u.ID,u]));for(let u of r)s.set(u.ID,{...s.get(u.ID),...u});await ee([...s.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let r=e.response.Members||[];if(r.length){let s=await G()||{},u=s.name&&r.find(f=>f.FullName===s.name);s.visa=(u||r[0]).VisaClassName,await C({profile:s,members:r})}}if(va.includes(e.tail)){_t(),lr(e);let r=(e.response.ScheduleDays||[]).map(g=>On(g?.Date)).filter(Boolean).length;r&&q(`${r} date${r===1?"":"s"} available \u2014 see list below`),da();let s=await at();await me()||x("defaultWaitTime").then(g=>{mn(g)});let f=await Mt(),d=f.find(g=>g.ID===e.params.postId);d&&(d.Days=e.response.ScheduleDays,d.Updated=Date.now(),d.HasError=e.response.HasError,d.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,ee(f)),await dl(e.response.ScheduleDays,{postId:e.params.postId,postName:d?.Name,hasError:e.response.HasError}),!e.response.HasError&&r>0&&Nr({postId:e.params.postId,postName:d?.Name,dayCount:r}).catch(()=>{}),await wr(e.response.ScheduleDays,{postId:e.params.postId,postName:d?.Name,hasError:e.response.HasError}),Ke()?($t(),q("Submit pending \u2014 staying on this city (date reload ignored)\u2026")):s&&!e.response.HasError?qi(e.response.ScheduleDays,s.from,s.to).length?$t():ut():s&&ut();let h=Ke()?null:await vl(e.response.ScheduleDays,e.response.HasError);if(h)$t(),await Sr(d?.Name,h);else if(s&&!e.response.HasError&&!Ke()){let g=(e.response.ScheduleDays||[]).map(v=>On(v?.Date)).filter(Boolean),w=g.filter(v=>Ge(v,s.from,s.to));g.length&&!w.length?(ut(),q(`Dates found but none in ${s.from} \u2192 ${s.to}. Next city in 13\u201318s\u2026`)):g.length||(ut(),q("No dates on this city \u2014 next city in 13\u201318s\u2026"))}await ei()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let r=e.params.Date.split("T")[0];wl(e.response.ScheduleEntries,r),$a();let s=await Mt(),u=s.filter(d=>d.Days&&d.Updated).sort((d,h)=>h.Updated-d.Updated).find(d=>d.Days.some(h=>h.Date===r));if(u){let d=u.Days.find(h=>h.Date===r);d&&(d.Times=e.response.ScheduleEntries,ee(s))}let f=(e.response.ScheduleEntries||[]).filter(d=>d&&d.Time);if(ur(f,r,u?.Name),f.length){let d=f.filter(w=>w.EntriesAvailable==null||Number(w.EntriesAvailable)>0),h=d.reduce((w,v)=>{let K=Number(v.EntriesAvailable);return w+(Number.isFinite(K)?K:0)},0),g=h>0?` \xB7 ${h} available`:"";q(`${d.length||f.length} time slot${(d.length||f.length)===1?"":"s"} on ${r}${g}`)}await Tl(e.response.ScheduleEntries,e.response.HasError),Ke()?($t(),q("Submit pending \u2014 staying on this city (time reload ignored)\u2026")):f.length?($t(),await xr(u?.Name,e.params.Date,f.length)):(ut(),q("No time slots on this date \u2014 next city in 13\u201318s\u2026")),await ei()}}function Da(t){if(!N()||_())return;let e=Ta(t.data.url);va.includes(e)&&nr()}var Zt=null,Qi="",Xi={scanning:"Scanning for Cloudflare challenge\u2026",dom:"Trying page-level verify click\u2026",debugger:"Advanced click \u2014 targeting Turnstile iframe\u2026",retry:"Waiting before next attempt\u2026",success:"Verification passed \u2014 continuing\u2026",manual:"Stuck? Click the checkbox once, then we\u2019ll continue."};function Ea(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=c.cfFlash,n.dataset[$.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),l.setTimeout(()=>n.remove(),1200)}}function Cl(){let t=document.querySelector(p(a.cfHud));return t||(t=document.createElement("div"),t.id=a.cfHud,t.dataset[$.mark]="",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.innerHTML=`
    <div class="${c.cfHud}">
      <div class="${c.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">\u{1F6E1}</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${Xi.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `,document.documentElement.appendChild(t),t)}async function B(t,e){if(!chrome.runtime?.id||!l.alive||!await x("autoCloudflareTick"))return;let n=Cl(),i=n.querySelector("[data-cf-msg]"),o=n.querySelector("[data-cf-sub]"),r=n.querySelector("[data-cf-chip]"),s=n.querySelector(`.${c.cfHud}`);Qi=t,i&&(i.textContent=Xi[t]||Xi.scanning),o&&(o.textContent=e||_l(t)),r&&(r.textContent=t==="success"?"Done":t==="manual"?"Help":"Active",r.dataset.state=t),s&&(s.dataset.state=t),Zt&&(l.clear(Zt),Zt=null),t==="success"&&(Zt=l.setTimeout(()=>Ji(),2800))}function _l(t){return t==="debugger"?"Precision click via advanced browser bridge":t==="dom"?"Standard page interaction":t==="manual"?"One manual click is usually enough":t==="success"?"Resuming login and recovery":"Monitoring this tab for Turnstile"}function Ji(){let t=document.querySelector(p(a.cfHud));t&&t.remove(),Qi="",Zt&&(l.clear(Zt),Zt=null)}function Zi(){return Qi}var $l=/we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i,kl=/\bUSG\s+[a-f0-9-]{8,}/i;var eo="vsPortalErrorReloadCount",La="vsPortalErrorReloadAt",Ml=2e3,Al=1e4,Ia=!1,he=null,Dl=null;function El(){return(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim()}function ge(){let t=El().slice(0,6e3);return t?!!(/a timeout occurred/i.test(t)&&(/error\s*524/i.test(t)||/origin web server timed out/i.test(t)||/cloudflare ray id/i.test(t))||/error\s*524/i.test(t)&&/cloudflare/i.test(t)&&t.length<8e3||$l.test(t)&&(kl.test(t)||/error id\s*#/i.test(t))||/we'?re sorry,\s*but something went wrong/i.test(t)&&t.length<2500):!1}function qa(){try{return Math.max(0,Number(sessionStorage.getItem(eo)||0))}catch{return 0}}function Il(){try{let t=qa()+1;return sessionStorage.setItem(eo,String(t)),sessionStorage.setItem(La,String(Date.now())),t}catch{return 1}}function to(){try{sessionStorage.removeItem(eo),sessionStorage.removeItem(La)}catch{}}function Pl(t){return Math.min(Al,Ml+Math.max(0,t-1)*1e3)}function Ll(){he&&(l.clear(he),he=null)}function ql(){Il();try{location.reload()}catch{}}function Pa(){if(!l.alive||he)return;if(!ge()){to();return}let t=qa()+1,e=Pl(t);he=l.setTimeout(()=>{if(he=null,!!l.alive){if(!ge()){to();return}ql()}},e)}function Ra(){if(Ia)return;Ia=!0;let t=()=>{l.alive&&(ge()?Pa():(to(),Ll()))};t(),Dl=l.setInterval(t,1500);try{let e=new MutationObserver(()=>{l.alive&&ge()&&Pa()});e.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),l.disposable(()=>e.disconnect())}catch{}}var Nn="vsDebugLogs",Rl=200;function Ol(){try{return new Date().toLocaleTimeString("en-IN",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})}catch{return new Date().toISOString().slice(11,19)}}async function F(t,e,n){let i={at:Date.now(),t:Ol(),tag:String(t||"app").slice(0,24),msg:String(e||"").slice(0,400)};if(n!=null)try{i.data=JSON.parse(JSON.stringify(n))}catch{i.data=String(n).slice(0,200)}try{console.log(`[VS6 ${i.tag}] ${i.msg}`,n!==void 0?n:"")}catch{}try{let o=await T({[Nn]:[]}),r=Array.isArray(o[Nn])?o[Nn].slice():[];for(r.push(i);r.length>Rl;)r.shift();await C({[Nn]:r})}catch{}}var Hn=null,Ye=0,je=null,kt=0;async function Nl(){try{let e=(await T("humanClickProfile")).humanClickProfile,n=e?.liveTrained&&e.samples?.length||0;return n<5?15e3:n<20?1e4:n<50?6e3:3500}catch{return 12e3}}var io=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function J(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!U()&&!Zi()}function U(){if(ge()||document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return io.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:no().length>0}function Wn(t){return new Promise(e=>setTimeout(e,t))}function Wl(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let i of n.querySelectorAll("*"))i.shadowRoot&&(t.push(i.shadowRoot),e.push(i.shadowRoot))}return t}function no(){let t=[],e=new Set,n=i=>{if(!i||e.has(i))return;let o=i.getBoundingClientRect();if(o.width<40||o.height<20||o.width>900||o.height>400)return;let r=(i.src||i.getAttribute?.("src")||"").toLowerCase(),s=(i.title||i.getAttribute?.("title")||"").toLowerCase(),u=(i.className?.toString?.()||"").toLowerCase(),f=(i.id||"").toLowerCase(),d=i.tagName==="IFRAME"&&(r.includes("challenges.cloudflare")||r.includes("turnstile")||s.includes("cloudflare")||s.includes("security challenge")),h=u.includes("cf-turnstile")||u.includes("turnstile")||f.includes("turnstile")||f.includes("challenge")||i.hasAttribute?.("data-sitekey")||i.hasAttribute?.("data-turnstile-widget");if(!d&&!h)if(i.tagName==="IFRAME"&&o.width>=120&&o.width<=420&&o.height>=45&&o.height<=120){if(!io.test(document.body?.innerText||""))return}else return;e.add(i),t.push({el:i,rect:o})};for(let i of Wl()){for(let o of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let r of i.querySelectorAll(o))n(r);for(let o of i.querySelectorAll("iframe"))n(o)}return t}function Hl(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function Bl(t){let e=[],n=new Set,i=(o,r)=>{if(!Number.isFinite(o)||!Number.isFinite(r)||o<1||r<1||o>window.innerWidth-1||r>window.innerHeight-1)return;let s=`${Math.round(o)},${Math.round(r)}`;n.has(s)||(n.add(s),e.push({x:Math.round(o),y:Math.round(r)}))};for(let{rect:o}of t){let r=o.top+o.height/2,s=o.left+Math.min(28,Math.max(18,o.width*.11));for(let u of[0,-4,4,-8,8,12,16,20,24,28,32])for(let f of[0,-3,3,-6,6])i(s+u,r+f);i(o.left+o.width*.5,r)}return e}function Fl(t){for(let{el:e,rect:n}of t)try{e.click();let i=n.left+Math.min(26,n.width*.12),o=n.top+n.height/2,r=document.elementFromPoint(i,o)||e;for(let s of["pointerdown","mousedown","mouseup","pointerup","click"])r.dispatchEvent(new MouseEvent(s,{bubbles:!0,cancelable:!0,clientX:i,clientY:o,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let i=n.getBoundingClientRect();if(i.width<4&&i.height<4)continue;let o=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!o.includes("human")&&!o.includes("verify")&&e==="input[type='checkbox']"){let r=n.closest("label, div, form");if(!io.test(r?.textContent||""))continue}return n.click(),!0}return!1}async function Oa(t){t.length&&(Ea(t.slice(0,3)),l.send({action:"viewportClickPoints",points:t}),await x("cloudflareDebuggerClick")?(await B("debugger","Trained click on Verify you are human\u2026"),l.send({action:"cloudflareDebuggerClick",points:t,primaryOnly:!0})):await B("dom"))}async function Bn(){if(!await x("autoCloudflareTick"))return!1;if(J())return kt&&F("cf","challenge already solved"),kt=0,await B("success"),!0;kt||(kt=Date.now(),F("cf","challenge seen \u2014 train window started"));let t=await Nl();if(Date.now()-kt<t)return await B("scanning","Train window \u2014 click Verify you are human yourself (recording your mouse)\u2026"),!1;F("cf","train window done \u2014 attempting auto click"),await B("scanning","Verify you are human page \u2014 preparing click\u2026");let e=no();Hl(e),await Wn(350),e=no();let n=Bl(e);return n.length&&(await Oa(n),await Wn(1200),J()||!U())?(kt=0,await B("success"),!0):(await B("dom"),Fl(e),await Wn(600),J()||!U()?(kt=0,await B("success"),!0):n.length&&(await Oa(n),await Wn(1e3),J()||!U())?(kt=0,await B("success"),!0):(Ye++,Ye>=8?await B("manual","Click the checkbox once \u2014 we will continue after."):await B("retry",`Retry ${Ye}/8\u2026`),!1))}function Ul(){je||(je=new MutationObserver(()=>{l.alive&&U()&&!J()&&Bn()}),je.observe(document.documentElement,{childList:!0,subtree:!0}),l.disposable(()=>{je?.disconnect(),je=null}))}function oo(){Hn&&(l.clear(Hn),Hn=null),Ye=0,kt=0,Ji()}async function ro(){if(oo(),!await x("autoCloudflareTick"))return;Ul();let t=async()=>{if(l.alive&&await x("autoCloudflareTick")){if(U()&&!J()){await Bn();return}Zi()&&(Ye=0,await B("success"))}};t(),Hn=l.setInterval(t,1800)}var ye="sessionRecovery",ao="homeKeepaliveAt",so="homeLoadingStuckAt",Na=2e3,Un=!1,Wa=null,co=null,lo=null,Fn=null,Ve=0;function Ha(){return b.homeKeepaliveMinMs}function Kl(){return b.homeKeepaliveMaxMs}function Gl(){return b.homeKeepaliveDebounceMs}function Ba(){return b.loadingStuckMs}function zl(){return b.loadingStuckDebounceMs}function Fa(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function jl(t,e){let n=Fa(t);if(!n)return"";let i="",o=0;for(let r of e||[]){let s=Fa(r.q);if(!s||!r.a)continue;if(n.includes(s)||s.includes(n))return r.a;let u=s.split(" ").filter(h=>h.length>3),f=0;for(let h of u)n.includes(h)&&f++;let d=u.length?f/u.length:0;d>o&&d>=.5&&(o=d,i=r.a)}return i}async function Yl(){let t=await T([Pt,"profile"]),e=t[Pt]||{},n=t.profile?.id?String(t.profile.id):null,i=n?e[n]:null;return i||(i=Object.values(e).find(o=>o?.loginId&&o?.loginPass)||null),i||{}}function Ua(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,i=Object.getOwnPropertyDescriptor(n,"value")?.set;i?i.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function Nt(t){return new Promise(e=>setTimeout(e,t))}function dt(t,e){return t+Math.random()*(e-t)}async function uo(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await Nt(dt(250,600)),Ua(t,"");let i="";for(let o=0;o<n.length;o++){let r=n[o];i+=r,Ua(t,i),t.dispatchEvent(new KeyboardEvent("keydown",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:r,bubbles:!0}));let s=dt(90,220);/[\s@._]/.test(r)&&(s+=dt(120,320)),Math.random()<.08&&(s+=dt(200,450)),await Nt(s)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await Nt(dt(200,500))}var Kn=!1,Gn=!1;function zn(t){return!t||t.disabled?!1:(t.click(),!0)}function Vl(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let i of t){let o=(i.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(o))continue;let r=i.querySelector("input[type='checkbox']")||document.getElementById(i.getAttribute("for")||"");r&&!r.checked&&(zn(r),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(i=>/^(continue|ok|accept|agree)$/i.test((i.textContent||i.value||"").trim()));return e&&n&&zn(n),e>0}function Ka(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function Xl(t){if(Kn)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;Kn=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await uo(e,t.loginId),await Nt(dt(400,900))),n&&t.loginPass&&!n.value&&(await uo(n,t.loginPass),await Nt(dt(500,1100)));let i=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(o=>/sign in|log in|continue/i.test(o.textContent||o.value||""));return i&&(n?.value||t.loginPass)?(await Nt(dt(600,1400)),zn(i),!0):!!(e||n)}finally{Kn=!1}}async function Ql(t){if(Gn)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let o of n){let r=(o.textContent||"").trim();if(r.length<12||r.length>220||!/\?/.test(r)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(r))continue;let s=o.querySelector("input[type='text']")||document.getElementById(o.getAttribute("for")||"")||o.parentElement?.querySelector("input[type='text']");s&&s.offsetParent!==null&&e.push({text:r,input:s})}for(let o of["kba1_response","kba2_response","kba3_response"]){let r=document.getElementById(o);if(!r)continue;let u=(r.closest(".form-group, .entry, li, div")||r.parentElement)?.textContent||"";e.some(f=>f.input===r)||e.push({text:u,input:r})}let i=[];for(let{text:o,input:r}of e){if(r.value)continue;let s=jl(o,t.security);s&&i.push({input:r,ans:s})}if(!i.length)return!1;Gn=!0;try{for(let{input:r,ans:s}of i)await uo(r,s),await Nt(dt(350,800));await Nt(dt(600,1400));let o=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(r=>/continue|submit|verify/i.test(r.textContent||r.value||""));return o&&zn(o),!0}finally{Gn=!1}}function Ga(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||U()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function Wt(){return Ct()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function Jl(t=""){return/\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(t||""))}function fo(){if(Wt()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||U()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}function Zl(t){return!!(t?.loginId&&t?.loginPass)}function tu(){return Ga()?!1:!!(Ka()||document.querySelector("#kba1_response, #kba2_response, #kba3_response")||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))}async function eu(){let t=(await T(ye))[ye],e=!!t?.active,n=await Yl();if(U()){await Bn();return}if(Vl(),Ga()){e&&(await C({[ye]:{...t,active:!1,doneAt:Date.now()}}),l.send({action:"recoveryReturnToOfc"}));return}tu()&&Zl(n)&&await x("autofillLogin")&&(await Ql(n)||(Ka()||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))&&await Xl(n))}function za(){if(!fo()||Wa)return;let t=async()=>{l.alive&&await eu()};t(),Wa=l.setInterval(t,1200)}function ja(){return Ha()+Math.random()*(Kl()-Ha())}async function Ya(){try{let t=await T(ao),e=Number(t[ao])||0;return Date.now()-e<Gl()?!1:(await C({[ao]:Date.now()}),!0)}catch{return!0}}function Va(){if(Wt()||!fo()||document.querySelector("#post_select")||co)return;let t=()=>{l.alive&&(co=l.setTimeout(async()=>{if(co=null,!l.alive||Wt()||Jl(location.href)||document.querySelector("#post_select")||!fo())return;if(Kn||Gn||Un){t();return}if((await T(ye))[ye]?.active){t();return}if(!await Ya()){t();return}try{location.reload()}catch{t()}},ja()))};t()}function Xa(){if(!Wt()||lo)return;let t=()=>{l.alive&&(lo=l.setTimeout(async()=>{if(lo=null,!(!l.alive||!Wt())){if(await Ya())try{l.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}t()}},ja()))};t()}async function nu(){try{let t=await T(so),e=Number(t[so])||0;return Date.now()-e<zl()?!1:(await C({[so]:Date.now()}),!0)}catch{return!0}}function Qa(){if(!Wt()||Fn)return;let t=async()=>{if(Fn=null,!(!l.alive||!Wt())){try{if(Ri()){if(Ve||(Ve=Date.now()),Date.now()-Ve>=Ba()){if(await nu()){try{q(`Date Loading stuck \u2265${Ba()/1e3}s \u2014 reloading Application Home\u2026`)}catch{}try{l.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}}Ve=Date.now()}}else Ve=0}catch{}l.alive&&Wt()&&(Fn=l.setTimeout(t,Na))}};Fn=l.setTimeout(t,Na)}async function Ja(t){if(!/PSE0501|unable to load appointment available days/i.test(String(t||""))||Un)return;Un=!0,l.setTimeout(()=>{Un=!1},8e3);let e=await L();await C({[ye]:{active:!0,ofcUrl:location.href,accountId:e,startedAt:Date.now()}}),l.send({action:"recoveryStart",ofcUrl:location.href})}var Yn="humanClickProfile",po=150,yo=120,iu=250,Za=!1,mt=[],jn=0,nt=0,Ht=0,A=null,ho=0,Qe=!1,be=null,Vn=0,Qn=0,Je=[],ft=!1,te=!1;function ou(){let t=[];for(let e of document.querySelectorAll('iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]')){let n=e.getBoundingClientRect();n.width<40||n.height<20||n.width>900||n.height>400||t.push(n)}if(!t.length&&U())for(let e of document.querySelectorAll("iframe")){let n=e.getBoundingClientRect();n.width>=120&&n.width<=420&&n.height>=45&&n.height<=120&&t.push(n)}return t}function Ze(){let t=ou();if(!t.length)return null;let e=t[0];return{x:e.left+Math.min(28,Math.max(18,e.width*.11)),y:e.top+e.height/2,w:e.width,h:e.height,left:e.left,top:e.top}}function we(t,e,n){return n?t>=n.left-40&&t<=n.left+n.w+40&&e>=n.top-30&&e<=n.top+n.h+30:!1}function is(t){let e=performance.now();jn||(jn=e);let n=A,i=n?(t.clientX-n.x)/Math.max(24,n.w*.12):0,o=n?(t.clientY-n.y)/Math.max(20,n.h*.5):0;mt.push({nx:Math.round(i*1e3)/1e3,ny:Math.round(o*1e3)/1e3,x:Math.round(t.clientX),y:Math.round(t.clientY),t:Math.round(e-jn)}),mt.length>yo&&mt.shift()}async function Jn(){return(await T(Yn))[Yn]||{version:2,maxSamples:po,samples:[],avgHoverMs:420,avgPressMs:70,avgApproachMs:800,liveTrained:!1}}function mo(t,e,n){if(!t.length)return n;let i=t.reduce((o,r)=>o+(Number(r[e])||0),0);return Math.round(i/t.length)}async function os(t,{force:e=!1}={}){let n=Date.now();if(!e&&n-ho<iu)return null;ho=n;let i=await Jn(),o=Array.isArray(i.samples)?i.samples.slice():[];for(t.clientId||(t.clientId=`hc-${t.at||n}-${Math.random().toString(36).slice(2,10)}`),t.uploaded=!1,o.push(t);o.length>po;)o.shift();let r={version:2,maxSamples:po,samples:o,avgHoverMs:mo(o,"hoverMs",420),avgPressMs:mo(o,"pressMs",70),avgApproachMs:mo(o,"approachMs",800),updatedAt:n,liveTrained:!0,source:"visa-page-live"};return await C({[Yn]:r}),Vn=o.length,F("human",`saved sample locally #${o.length}`,{capture:t.capture||"page",pressMs:t.pressMs,hoverMs:t.hoverMs,pathPts:Array.isArray(t.path)?t.path.length:0,clientId:t.clientId}),rs(t,r).catch(()=>{}),as().catch(()=>{}),r}async function ru(t){if(!t)return;let e=await Jn(),n=Array.isArray(e.samples)?e.samples.slice():[],i=!1;for(let o of n)o?.clientId===t&&!o.uploaded&&(o.uploaded=!0,i=!0);i&&await C({[Yn]:{...e,samples:n,updatedAt:Date.now()}})}async function rs(t,e){try{if(!await x("serverSync"))return F("upload","skipped \u2014 serverSync is OFF"),!1;let n=await G()||{},i=t.clientId||`hc-${t.at||Date.now()}-${Math.random().toString(36).slice(2,8)}`;t.clientId=i;let o={client_id:i,profile:{id:n.id||"",email:n.email||"",name:n.name||"",visa:n.visa||""},sample:t,profile_meta:{sampleCount:e?.samples?.length||0,avgHoverMs:e?.avgHoverMs,avgPressMs:e?.avgPressMs,avgApproachMs:e?.avgApproachMs,liveTrained:!0,source:"visa-page-live",extensionHost:location.host}};F("upload",`sending sample ${i}`,{sampleCount:e?.samples?.length||0,email:n.email||""}),l.send({action:"uploadHumanClickSample",payload:o});try{chrome.runtime.sendMessage({action:"uploadHumanClickSample",payload:o},r=>{if(chrome.runtime.lastError){F("upload",`SW error: ${chrome.runtime.lastError.message}`);return}r?.success?(F("upload",`server OK id=${r.id??"?"} status=${r.status??""}`,{clientId:i}),ru(i)):F("upload",`server FAIL ${r?.error||r?.status||"unknown"}`,{clientId:i})})}catch(r){F("upload",`sendMessage threw: ${r?.message||r}`)}return!0}catch(n){return F("upload",`upload threw: ${n?.message||n}`),!1}}async function as(){try{if(!await x("serverSync"))return;let t=await Jn(),n=(Array.isArray(t.samples)?t.samples:[]).filter(i=>i&&i.uploaded!==!0).slice(-40);for(let i of n)await rs(i,t),await new Promise(o=>setTimeout(o,80))}catch{}}function ss(t,e={}){let n=performance.now(),i=Math.max(25,Math.min(500,nt?n-nt:70)),o=Math.max(30,Math.min(3e3,nt?nt-(Ht||nt):200)),r=(mt.length?mt:Je).slice(-yo),s=r.length?r[r.length-1].t:o,u=Math.max(o,Math.min(12e3,s||o)),f=be,d=A||Ze();return{hoverMs:Math.round(o),pressMs:Math.round(i),approachMs:Math.round(u),path:r,down:f?{x:Math.round(f.x),y:Math.round(f.y)}:null,up:t?{x:Math.round(t.clientX),y:Math.round(t.clientY)}:f?{x:Math.round(f.x),y:Math.round(f.y)}:d?{x:Math.round(d.x),y:Math.round(d.y)}:null,target:d?{x:Math.round(d.x),y:Math.round(d.y),w:Math.round(d.w),h:Math.round(d.h),left:Math.round(d.left),top:Math.round(d.top)}:null,viewport:{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio||1,scrollX:Math.round(window.scrollX||0),scrollY:Math.round(window.scrollY||0)},pointerType:t?.pointerType||"mouse",url:location.pathname+location.search,at:Date.now(),...e}}function Xe(){mt.length&&(Je=mt.slice(-yo)),mt=[],jn=0,nt=0,Ht=0,be=null}function bo(){Qe||(Qe=!0,te=!0,Xe(),A=Ze())}function go(){Qe=!1,A=null,ft=!1,Xe()}function Xn(t){let e=t?.target;if(!e)return!1;if(e.closest?.(".cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]"))return!0;if(e.tagName==="IFRAME"){let n=(e.src||"").toLowerCase();if(n.includes("challenges.cloudflare")||n.includes("turnstile"))return!0;let i=e.getBoundingClientRect();if(i.width>=120&&i.width<=420&&i.height>=45&&i.height<=120)return!0}return!1}async function ts(t){if(l.alive){if(!U()||J()){Qe&&go();return}bo(),A||(A=Ze()),!Ht&&A&&we(t.clientX,t.clientY,A)&&(Ht=performance.now()),A&&we(t.clientX,t.clientY,A)&&(Qn=Date.now()),is(t)}}async function es(t){if(!(!l.alive||t.button!==0)&&!(!U()||J())){bo(),A=Ze(),nt=performance.now(),Ht||(Ht=nt),be={x:t.clientX,y:t.clientY},is(t),(Xn(t)||A&&we(t.clientX,t.clientY,A))&&(ft=!0,Qn=Date.now()),F("human","pointer down during challenge",{onWidget:Xn(t),near:!!(!A||we(t.clientX,t.clientY,A)),x:Math.round(t.clientX),y:Math.round(t.clientY)});try{B("scanning",`Recording click\u2026 (saved ${Vn} so far)`)}catch{}}}async function ns(t){if(!l.alive||t.button!==0||!nt&&!ft)return;if(!U()&&!J()){Xe();return}if(!(A&&we(t.clientX,t.clientY,A)||A&&be&&we(be.x,be.y,A)||Xn(t)||ft||!A&&(mt.length>=2||Je.length>=2))&&mt.length<2&&Je.length<2){Xe();return}let n=ss(t,{capture:ft||Xn(t)?"iframe-or-widget":"page"});ft=!1,Xe();let i=await os(n);if(!i)return;let o=i.samples?.length||0;try{B("success",`Saved verify-human click #${o} \u2014 uploaded to server`)}catch{}}async function au(){let t=Date.now();if(!te||!J()&&U())return;if(!(ft||t-Qn<8e3||Je.length>=2&&t-ho>500)){te=!1,go();return}let n=ss(null,{capture:"challenge-solved"});ft=!1,te=!1,go();let i=await os(n,{force:!0});if(!i)return;let o=i.samples?.length||0;try{B("success",`Saved verify-human click #${o} (after checkbox) \u2014 uploaded to server`)}catch{}}async function su(){try{let t=await Jn(),e=t.liveTrained&&t.samples?.length||0;return Vn=e,e}catch{return Vn}}function cs(){if(Za)return;Za=!0,F("human","train watcher started",{path:location.pathname}),l.on(window,"pointermove",ts,{passive:!0,capture:!0}),l.on(window,"pointerdown",es,{passive:!0,capture:!0}),l.on(window,"pointerup",ns,{passive:!0,capture:!0}),l.on(window,"mousemove",ts,{passive:!0,capture:!0}),l.on(window,"mousedown",es,{passive:!0,capture:!0}),l.on(window,"mouseup",ns,{passive:!0,capture:!0}),l.on(window,"blur",()=>{!U()||J()||(ft=!0,Qn=Date.now(),nt||(nt=performance.now(),Ht||(Ht=nt)),F("human","page blur during challenge (likely iframe click)"))});let t=async()=>{if(!l.alive)return;if(U()&&!J()){te||F("human","challenge detected \u2014 recording armed"),te=!0,bo(),A||(A=Ze());let n=await su();try{B("scanning",n?`Train mode \u2014 click Verify you are human naturally (saved ${n})`:"Train mode \u2014 move mouse naturally, then click Verify you are human (recording\u2026)")}catch{}return}(te||Qe||ft)&&await au()};t(),l.setInterval(t,1200),l.setTimeout(()=>{F("upload","flushing unsynced local samples\u2026"),as().catch(()=>{})},2500)}var cu=`
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

#${a.waitTime} .${c.pill} {
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  white-space: nowrap;
}

#${a.waitTime} .${c.pillTtl} {
  flex: 1;
  min-width: 0;
  padding: 0.35em 0.5em;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}

#${a.waitTime} .${c.pillTmr} {
  display: flex;
  align-items: center;
  padding: 0.35em 0.55em;
  border-radius: 5px 0 0 5px;
  background: rgba(255, 255, 255, 0.25);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-variant-numeric: tabular-nums;
}

#${a.waitTime} .${c.pillWait} { background-color: rgba(255, 0, 0, 0.35); color: #5c0000; }
#${a.waitTime} .${c.pillDone} { background-color: #1a4480; color: white; }

#atlas-sidebar .${c.sideLink} { background-color: #1a4480; color: white; }
#${a.datesPara} { margin: 0.5em 0; line-height: 1.45; }

#${a.datesCont} .${c.datesLnk} { color: white; }
#${a.datesCont} .${c.slotsSum} {
  font-weight: 700;
  font-size: 1.05em;
  margin-bottom: 0.4em;
  color: #0b3d2e;
}
#${a.datesCont} .${c.slotsTbl},
#${a.slotsTbl} {
  width: auto;
  min-width: 220px;
  border-collapse: collapse;
  margin: 0.25em 0 0.5em;
  font-size: 0.95em;
}
#${a.datesCont} .${c.slotsTbl} th,
#${a.datesCont} .${c.slotsTbl} td,
#${a.slotsTbl} th,
#${a.slotsTbl} td {
  border: 1px solid #cbd5e0;
  padding: 0.3em 0.75em;
  text-align: left;
}
#${a.datesCont} .${c.slotsTbl} th,
#${a.slotsTbl} th {
  background: #edf2f7;
  font-weight: 600;
}
#${a.ofcDate} { font-weight: bold; }

.${c.card} {
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

#${a.histCont} .${c.cardTtl} {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
}
#${a.histCont} .${c.histScrl} {
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

#${a.histTbl} td.${c.dltDn} { color: #10b981; font-weight: 500; }
#${a.histTbl} td.${c.dltUp} { color: #ef4444; font-weight: 500; }

#${a.cdCard} .${c.cardTtl} {
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

#${a.cdTime}.${c.cdDiv}-over { font-size: 20px; }
.${c.cdDiv} {
  border-top: 1px solid #edf2f7;
  margin-top: 15px;
  padding-top: 12px;
}

.${c.footer} { font-size: 11px; }
#${a.histCont} .${c.footer} { margin-top: 8px; }
#${a.cdCard} .${c.footer} { margin: 0; }

#${a.histCont} .${c.footer} a,
#${a.cdCard} .${c.footer} a {
  color: #1a4480;
  text-decoration: none;
  font-weight: 500;
}

.${c.hidden} { display: none; }

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
#${a.aiBtn}.${c.aiOn} {
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
#${a.aiPanel}.${c.hidden} {
  display: none !important;
}
#${a.aiPanel} .${c.cardTtl} {
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
#${a.aiPanel} .${c.aiHint} {
  margin: 0 0 8px;
  font-size: 14.5px;
  line-height: 1.5;
  color: #6b7280;
  font-weight: 400;
}
#${a.aiPanel} .${c.aiHead} {
  font-weight: 700;
  color: #111827;
  font-size: 16px;
}
#${a.aiPanel} .${c.aiRow} {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}
#${a.aiPanel} .${c.aiSec} {
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
#${a.aiTermsGate}.${c.hidden},
#${a.aiMain}.${c.hidden} {
  display: none;
}
#${a.aiPanel} .${c.aiInfo} {
  margin: 0 0 10px;
  padding: 10px 12px;
  background: #eff6ff;
  border: 1px solid #93c5fd;
  border-radius: 8px;
  color: #1e40af;
  font-size: 14.5px;
  line-height: 1.5;
}
#${a.aiPanel} .${c.aiWarn} {
  margin: 0 0 10px;
  padding: 10px 12px;
  background: #fffbeb;
  border: 1px solid #f59e0b;
  border-radius: 8px;
  color: #92400e;
  font-size: 14.5px;
  line-height: 1.5;
}
#${a.aiPanel} .${c.aiOk},
#${a.aiStatus}.${c.aiOk} {
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
#${a.aiPanel} .${c.aiDateBtn} {
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
#${a.aiPanel} .${c.aiDateBtn}:hover {
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
#${a.aiCal}.${c.hidden} { display: none !important; }
#${a.aiCal} .${c.aiCalHead} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
}
#${a.aiCal} .${c.aiCalHead} .${c.aiHead} {
  font-size: 17px;
  margin: 0;
  flex: 1;
  text-align: center;
}
#${a.aiCal} .${c.aiCalHead} button {
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
#${a.aiCal} .${c.aiCalGrid} {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}
#${a.aiCal} .${c.aiCalGrid} .${c.aiHint} {
  margin: 0;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: #6b7280;
  padding: 4px 0;
  pointer-events: none;
}
#${a.aiCal} .${c.aiCalDay} {
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
#${a.aiCal} .${c.aiCalDay}:hover {
  background: #eff6ff;
  border-color: #93c5fd;
}
#${a.aiCal} .${c.aiCalDay}.${c.aiCalMuted} {
  color: #9ca3af;
  font-weight: 500;
  background: #f9fafb;
}
#${a.aiCal} .${c.aiCalDay}:disabled,
#${a.aiCal} .${c.aiCalDay}[aria-disabled="true"] {
  opacity: 0.4;
  cursor: not-allowed;
  background: #f3f4f6;
  color: #9ca3af;
  pointer-events: none;
}
#${a.aiCal} .${c.aiCalDay}.${c.aiCalToday} {
  border-color: #3b82f6;
}
#${a.aiCal} .${c.aiCalDay}.${c.aiCalOn} {
  background: #3b82f6;
  border-color: #2563eb;
  color: #fff;
}
#${a.aiCal} .${c.aiRow} {
  margin: 12px 0 0;
  justify-content: space-between;
}
#${a.aiCal} .${c.aiRow} button {
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

#${a.aiPanel} .${c.aiSwitch} {
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
#${a.aiPanel} .${c.aiSwitch}.${c.aiOnBtn} {
  background: #3b82f6;
  box-shadow: none;
}
#${a.aiPanel} .${c.aiKnob} {
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
#${a.aiPanel} .${c.aiSwitch}.${c.aiOnBtn} .${c.aiKnob} {
  transform: translateX(20px);
}

#${a.aiStatus} { margin: 0; }
#${a.aiPanel} .${c.aiCities} {
  max-height: 150px;
  overflow: auto;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 10px;
  margin-bottom: 0;
  background: #f9fafb;
}
#${a.aiPanel} .${c.aiCityAct} {
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
#${a.aiPanel} .${c.aiCityAct}:hover { color: #2563eb; }
#${a.aiPanel} .${c.aiCities} label {
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  margin: 5px 0;
  color: #1f2937;
  font-size: 14.5px;
}
#${a.aiPanel} .${c.aiCities} input[type="checkbox"] {
  margin: 0;
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
}
#${a.aiPanel} .${c.aiRow} label { flex: 1; min-width: 140px; }

#${a.aiWinList} {
  display: grid;
  gap: 10px;
  margin: 0 0 6px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
}
#${a.aiPanel} .${c.aiWinRow} {
  display: grid;
  gap: 4px;
  padding: 12px;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}
#${a.aiPanel} .${c.aiWinRow}:last-child {
  padding-bottom: 12px;
}
#${a.aiPanel} .${c.aiInline} {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
#${a.aiPanel} .${c.aiInline} select {
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
#${a.aiPanel} .${c.aiInline} .${c.aiHead} {
  margin: 0;
  flex-direction: row;
  font-size: 14.5px;
}
#${a.aiPanel} .${c.aiWinHelp} {
  font-size: 14.5px;
  color: #6b7280;
  margin-left: 2px;
}
#${a.aiPanel} .${c.aiTrash} {
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
#${a.aiPanel} .${c.aiTrash}:hover { background: #fef2f2; }
#${a.aiWinNote} { margin: 0 0 8px; font-size: 14.5px; color: #6b7280; }

#${a.aiPanel} .${c.aiTerms} {
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
#${a.aiPanel} .${c.aiTerms} .${c.aiHead} {
  margin: 0 0 6px;
  font-size: 20px;
  text-align: center;
}
#${a.aiPanel} .${c.aiTerms} .${c.aiHint} {
  text-align: center;
  margin: 0 0 14px;
}
#${a.aiPanel} .${c.aiTermsList} {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  display: grid;
  gap: 10px;
}
#${a.aiPanel} .${c.aiTermsList} li {
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
#${a.aiPanel} .${c.aiTermsList} li::before {
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
#${a.aiPanel} .${c.aiTermsCb} {
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
#${a.aiPanel} .${c.aiTermsCb} input[type="checkbox"] {
  margin: 2px 0 0;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  accent-color: #3b82f6;
}
#${a.aiPanel} .${c.aiContinue} {
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
#${a.aiPanel} .${c.aiContinue}:disabled {
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
#${a.cfHud} .${c.cfHud} {
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
#${a.cfHud} .${c.cfHud}[data-state="success"] {
  border-color: rgba(34, 197, 94, 0.45);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 24px rgba(34, 197, 94, 0.15);
}
#${a.cfHud} .${c.cfHud}[data-state="manual"] {
  border-color: rgba(251, 191, 36, 0.45);
}
#${a.cfHud} .${c.cfHud}[data-state="debugger"] {
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.32), 0 0 28px rgba(59, 130, 246, 0.18);
}
#${a.cfHud} .${c.cfPulse} {
  width: 10px;
  height: 10px;
  margin-top: 5px;
  border-radius: 50%;
  background: #60a5fa;
  box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.55);
  animation: ${m}cfpulse 1.6s ease-out infinite;
  flex-shrink: 0;
}
#${a.cfHud} .${c.cfHud}[data-state="success"] .${c.cfPulse} {
  background: #4ade80;
  animation: none;
  box-shadow: 0 0 12px rgba(74, 222, 128, 0.65);
}
#${a.cfHud} .${c.cfHud}[data-state="manual"] .${c.cfPulse} {
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
.${c.cfFlash} {
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
`;function ls(){if(document.querySelector(p(a.styles)))return;let t=document.createElement("style");t.id=a.styles,t.dataset[$.mark]="",t.textContent=cu,(document.head||document.documentElement).appendChild(t)}Po();Yi();So(()=>{ga(),l.destroy()});Fo();Ra();_()&&L().then(t=>{if(t)return $n(t);fe()}).catch(()=>fe());if(!_()){l.disposable(()=>{let i=document.querySelector(p(a.anchor)),o=document.querySelector("#post_select");i&&o&&i.replaceWith(o);for(let r of document.querySelectorAll("[data-"+$.mark+"]"))r.remove()}),ls(),l.send({action:"registerBlockGuard",prefix:m}),l.send({action:"registerRedirect",prefix:m}),l.send({action:"registerAlertGuard",prefix:m}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&l.send({action:"registerOfcReader",prefix:m}),l.on(window,"message",i=>{if(l.alive&&i.source===window)switch(i.data?.action){case At.req:return Da(i);case At.res:return Aa(i);case At.ofc:return fr(i);case At.err:return Pe("native_alert",i.data?.text),Ne(String(i.data?.text||"alert").slice(0,120)),Ja(i.data?.text);case At.sub:ar(),Ie(),vr(),at().then(o=>{Ue(o?.accountId||null)}).catch(()=>{Ue(null)});return}}),chrome.storage.onChanged.addListener((i,o)=>{o==="local"&&(i.profile&&hi(),i.waitPillClock&&or(i.waitPillClock.newValue),i.autoCloudflareTick&&(i.autoCloudflareTick.newValue?ro():oo()))}),l.on(document,"click",i=>{ce();let o=i.target.closest(p(a.waitTime));if(o){if(o.dataset.skipClick){delete o.dataset.skipClick;return}ir()}}),l.on(document,"keydown",ce),l.on(window,"focus",()=>ce({keepConsular:!0})),l.on(document,"visibilitychange",()=>{document.hidden||ce({keepConsular:!0})}),sr(),za(),Va(),Xa(),Qa(),cs(),ro();async function t(){!l.alive||_()||!Ct()||document.querySelector("#post_select")&&(_t(),await Promise.all([di(),mi(),Vi()]),kr({slotIndex:Mn,shouldPick:async()=>await at()?!0:!!await x("autoSelectFirstDate"),onSlotPicked:()=>ya()}))}async function e(){!l.alive||_()||!Ct()||await pa()}async function n(){Ro(),No(),await Promise.all([hi(),Ho(),Wo(),di(),mi(),Vi()]),ni()}document.readyState==="complete"?n():l.on(window,"load",n),l.setInterval(t,2500),l.setInterval(e,3e4),e()}})();
