(()=>{function N(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function C(t){return N()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,i]of Object.entries(t))e[n]=i;return e}):Promise.resolve(typeof t=="string"?{}:t)}function T(t){return N()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function Mo(t){return N()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function Ao(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",i=>{String(i.reason?.message||i.reason||"").includes("Extension context invalidated")&&(i.preventDefault(),e())});let n=setInterval(()=>{N()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var Bt="https://the.gopg.online",ni=`${Bt}/contribute`,Do=`${Bt}/contribute/telegram`,bu=`${Bt}/contribute/human-click`,en=`${Bt}/contribute/tik-tik-prefs`,Eo=`${Bt}/contribute/tik-tik-coord`;var Io=20,Lo=4320*60*1e3,nn=100,Po=4,on=100,qo=240,Ro=50,Oo=1440*60*1e3,Ss={recheckButton:!1,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function x(t){return C({[t]:Ss[t]}).then(e=>e[t])}function At(){return C({posts:[]}).then(t=>t.posts)}function ee(t){return T({posts:t})}function G(){return C("profile").then(t=>t.profile)}var Ft=t=>String(t).padStart(2,"0");function Se(t){let e=Ft(t%60),n=Math.floor(t/60)%60,i=Math.floor(t/3600);return i?`${Ft(i)}:${Ft(n)}:${e}`:`${Ft(n)}:${e}`}function No(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${Ft(n.getUTCHours())}:${Ft(n.getUTCMinutes())}:${Ft(n.getUTCSeconds())}`}}function ii(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),i=t%60,o=[];return e>0&&o.push(`${e}d`),(n>0||e>0)&&o.push(`${n}h`),o.push(`${i}m`),o.join(" ")}function Wo(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),i=o=>n.find(r=>r.type===o)?.value??"";return`${i("month")} ${i("day")} ${i("year")} ${i("hour")}:${i("minute")} ${i("dayPeriod")}`}function Ho(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),i=parseInt(e[2],10),o=parseInt(e[3],10),r=e[4];r&&(r.toUpperCase()==="PM"&&n<12&&(n+=12),r.toUpperCase()==="AM"&&n===12&&(n=0));let s=new Date;return s.setHours(n,i,o,0),s.getTime()>Date.now()+6e4&&s.setDate(s.getDate()-1),s}var Bo=Symbol(),xs=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&N()}on(t,e,n,i){t.addEventListener(e,n,{...i,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!N())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=Po,interval:n=nn}={}){return new Promise(i=>{let o=r=>{if(!this.alive)return;let s=document.querySelector(t);if(s)return i(s);if(r>=e)return i(null);this.setTimeout(()=>o(r+1),n)};o(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},c=new xs;function Fo(){let t=globalThis[Bo];Object.defineProperty(globalThis,Bo,{value:c,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var rn=new Uint32Array(2);crypto.getRandomValues(rn);var Uo="abcdefghjkmnpqrstuvwxyz",vs=(rn[0].toString(36)+rn[1].toString(36)).replace(/[^a-z0-9]/g,""),m=(Uo[rn[0]%Uo.length]+vs).slice(0,8).padEnd(8,"x");function p(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var a={selRow:m+"01",anchor:m+"02",waitTime:m+"03",recheck:m+"04",histCont:m+"05",histTbl:m+"06",cdCard:m+"07",cdTime:m+"08",ofcDate:m+"09",styles:m+"10",datesCont:m+"11",datesPara:m+"12",slotsTbl:m+"12b",aiBtn:m+"13",aiPanel:m+"14",aiFrom:m+"15",aiTo:m+"16",aiStatus:m+"17",aiConfirm:m+"18",aiCancel:m+"19",aiClose:m+"20",aiCities:m+"21",aiSubmitBtn:m+"22",aiCitiesBtn:m+"23",aiLogin:m+"24",aiPass:m+"25",aiQ1:m+"26",aiA1:m+"27",aiQ2:m+"28",aiA2:m+"29",aiQ3:m+"30",aiA3:m+"31",aiSaveLogin:m+"32",cfHud:m+"33",aiCitiesAll:m+"34",aiCitiesNone:m+"35",aiLoginToggle:m+"36",aiLoginBody:m+"37",aiSubmitOn:m+"38",aiSubmitOff:m+"39",aiCitiesOn:m+"40",aiCitiesOff:m+"41",aiWinList:m+"42",aiWinAdd:m+"43",aiWinSave:m+"44",aiWinReset:m+"45",aiWinNote:m+"46",aiSubmitSw:m+"47",aiCitiesSw:m+"48",aiInfoBox:m+"49",aiWarnBox:m+"50",aiOkBox:m+"51",aiWinCard:m+"52",aiSubmitBody:m+"53",aiCitiesBody:m+"54",aiTerms:m+"55",aiTermsAgree:m+"56",aiTermsGate:m+"57",aiMain:m+"58",aiTermsContinue:m+"59",aiFromBtn:m+"60",aiToBtn:m+"61",aiCal:m+"62"},u={pill:m+"a",pillTtl:m+"b",pillTmr:m+"c",pillWait:m+"d",pillDone:m+"e",footer:m+"f",card:m+"g",cardTtl:m+"h",histScrl:m+"i",dltDn:m+"j",dltUp:m+"k",cdDiv:m+"l",hidden:m+"m",sideLink:m+"n",datesLnk:m+"o",slotsSum:m+"o2",slotsTbl:m+"o3",aiOn:m+"p",aiRow:m+"q",aiHint:m+"r",aiCities:m+"s",aiOnBtn:m+"t",aiCityAct:m+"x",cfHud:m+"u",cfPulse:m+"v",cfFlash:m+"w",aiEn:m+"y",aiDis:m+"z",aiWinRow:m+"aa",aiFeat:m+"ab",aiSwitch:m+"ac",aiKnob:m+"ad",aiSec:m+"ae",aiInfo:m+"af",aiWarn:m+"ag",aiOk:m+"ah",aiTrash:m+"ai",aiWinHelp:m+"aj",aiInline:m+"ak",aiHead:m+"al",aiTerms:m+"am",aiTermsCb:m+"an",aiTermsList:m+"ao",aiContinue:m+"ap",aiDateBtn:m+"aq",aiCal:m+"ar",aiCalHead:m+"as",aiCalGrid:m+"at",aiCalDay:m+"au",aiCalMuted:m+"av",aiCalOn:m+"aw",aiCalToday:m+"ax"},k={mark:m,w:m+"w",mw:m+"mw"},Dt={req:m+"q",res:m+"r",ofc:m+"o",err:m+"e",sub:m+"s"};function an(t){return t.map(e=>String.fromCharCode(e)).join("")}function Cs(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function Ko(){let t=document.createElement("div");return t.className=u.footer,t.textContent=an([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function Ts(t){let e=document.getElementById(a.histCont);e&&e.remove(),e=document.createElement("div"),e.id=a.histCont,e.className=u.card,e.dataset[k.mark]="";let n=document.createElement("h4");n.className=u.cardTtl,n.textContent=an([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let i=document.createElement("div");i.className=u.histScrl;let o=document.createElement("table");o.id=a.histTbl;let r=document.createElement("thead"),s=document.createElement("tr");for(let f of["Time","Est. Wait","Change"]){let g=document.createElement("th");g.textContent=f,s.appendChild(g)}r.appendChild(s),o.appendChild(r);let l=document.createElement("tbody");for(let f=t.length-1;f>=0;f--){let g=t[f],h="--",w="";if(f>0){let $=g.minutes-t[f-1].minutes;$<0?(h=`${$}m`,w=u.dltDn):$>0?(h=`+${$}m`,w=u.dltUp):h="0m"}let v=document.createElement("tr"),K=[[g.timeStr,""],[ii(g.minutes),""],[h,w]];for(let[$,z]of K){let S=document.createElement("td");z&&(S.className=z),S.textContent=$,v.appendChild(S)}l.appendChild(v)}o.appendChild(l),i.appendChild(o),e.appendChild(i),e.appendChild(Ko());let d=document.getElementById("last-updated");d&&(d.closest("div, p, section")||d.parentElement).insertAdjacentElement("afterend",e)}function _s(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function Go(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),i=_s();if(i!==null&&i>qo&&!e.textContent.includes("(")){let s=ii(i);e.textContent=`${e.textContent} (${i} minutes / ${s})`}let o=n.textContent.trim().split(" (")[0],r=Ho(o);if(r&&c.setInterval(()=>{let s=Math.floor((Date.now()-r)/1e3);s>=0&&(n.textContent=`${o} (${s}s ago)`)},1e3),i!==null){let s=Cs(),l=sessionStorage.getItem(s);l||(l=Math.random().toString(36).substring(2,11),sessionStorage.setItem(s,l)),C({queueHistory:{}}).then(d=>{let f=d.queueHistory||{},g=Date.now(),h={};for(let[$,z]of Object.entries(f)){if(!Array.isArray(z))continue;let S=z[z.length-1];S&&g-S.timestamp<Oo&&(h[$]=z)}let w=h[l]||[],v=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),K=w[w.length-1];(!K||K.minutes!==i||K.timeStr!==v)&&(w.push({timestamp:g,timeStr:v,minutes:i}),w.length>Ro&&w.shift(),h[l]=w,T({queueHistory:h})),Ts(w)})}}function zo(t,e){let n=document.getElementById("error_row");if(!n)return;let i;t?i=e?`Blocked for 24 hours, about ${Se(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":i="Temporarily blocked. Log in in a new tab, then refresh this page.";let o=document.createElement("div");o.className="atlas_validationalert alert alert-danger warning",o.dataset[k.mark]="",o.textContent=i,n.replaceChildren(o),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function jo(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&C({cfRetryAfter:null}).then(n=>{let i=parseInt(n.cfRetryAfter,10);if(!isNaN(i)){Mo("cfRetryAfter");let o=document.getElementById("what-happened-section");if(o){let r=document.createElement("div");r.id=a.cdCard,r.className=u.card,r.dataset[k.mark]="";let s=document.createElement("h4");s.className=u.cardTtl,s.textContent=an([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),r.appendChild(s);let l=document.createElement("div");l.id=a.cdTime,r.appendChild(l);let d=document.createElement("div");d.className=u.cdDiv,r.appendChild(d),r.appendChild(Ko()),o.appendChild(r);let f=i,g=null,h=()=>{f>0?(l.textContent=Se(f),f--):(l.classList.add(u.cdDiv+"-over"),l.textContent="You can try refreshing now!",g!=null&&c.clear(g))};h(),g=c.setInterval(h,1e3)}}})}async function Yo(){let t=document.querySelector(".username");if(!t)return;let n=(t.innerText||"").trim().match(/^(.*)\((\d+)\)\s*$/);if(!n)return;let[,i,o]=n,r=await G()||{},s=!r.id||r.id===o||String(r.id).includes(o)?r:{};s.name=i.trim(),s.id=o;let l=document.querySelectorAll("script");for(let d of l){let f=d.innerText.trim();if(f.includes("setAuthenticatedUserContext")){let g=/setAuthenticatedUserContext\('([^']*)'\)/,h=f.match(g);h&&(s.email=h[1])}}await T({profile:s})}async function Vo(){let t=document.querySelector("#post_select");if(!t)return;let e=await At();for(let n of t.options){if(!n.value)continue;e.findIndex(o=>o.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await ee(e)}var ks=["visa-information","fee-payment","appointment-confirmation"];function $s(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(i=>{let o=i.querySelector(".text-bold");if(!o)return;let r=Ms(o.textContent);if(!ks.includes(r))return;let s=As(i);s&&(n[r]=s)}),Object.keys(n).length?n:null}function Ms(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function As(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function ne(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>Lo)return null}catch{}return t.value}function Ds(t){let e=(t.posts||[]).filter(o=>o.Updated).sort((o,r)=>o.Updated-r.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},i=ne(t.cgiIdToken);return i&&(n.token=i),n}async function oi(){if(!N()||!await x("serverSync"))return;let t=await C(["profile","posts","cgiIdToken"]),e=Ds(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await fetch(ni,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(o=>o.json());if(!n.success)return;let i="0";n.contribs>0&&(i=n.contribs.toString()),n.contribs>10&&(i="10+"),n.contribs>0&&await T({contribs:{email:t.profile?.email,updated:Date.now(),count:i}})}catch{}}function ri(t=0){N()&&document.querySelector("#appointment-card")&&x("serverSync").then(e=>{if(!e)return;let n=$s();if(!n){t<Io&&c.setTimeout(()=>ri(t+1),nn);return}C(["profile","cgiIdToken","savedDashboard"]).then(i=>{let o=ne(i.cgiIdToken);o&&JSON.stringify(n)!==JSON.stringify(i.savedDashboard)&&fetch(ni,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:i.profile,dashboard:n,token:o})}).then(r=>r.json()).then(r=>{r.success&&T({savedDashboard:n})}).catch(()=>{})})})}var Es=`${Bt}/extension-runtime-config.json`,si="vsRuntimeConfig",Is=300*1e3,ai=0,xe=null,b={slotWindowLabel:":05\u2013:13, :14\u2013:21, :24\u2013:31, :35\u2013:50, :54\u2013:02",slotWindows:[{slot:5,fromMin:0,toMin:2},{slot:1,fromMin:5,toMin:13},{slot:2,fromMin:14,toMin:21},{slot:3,fromMin:24,toMin:31},{slot:4,fromMin:35,toMin:50},{slot:5,fromMin:54,toMin:59}],windowStartsMin:[0,5,14,24,35,54],cityLoadingMaxMs:18e4,cityCalendarNoDatesMs:2e4,cityRotateMinGapMs:13e3,cityRotateMaxGapMs:18e3,cityHoldMaxMs:45e3,homeKeepaliveMinMs:6e5,homeKeepaliveMaxMs:6e5,homeKeepaliveDebounceMs:48e4,loadingStuckMs:12e4,loadingStuckDebounceMs:9e4,remoteVersion:0,source:"bundled"};function Y(t,e,n,i){let o=Number(t);return Number.isFinite(o)?Math.min(n,Math.max(e,Math.round(o))):i}function Ls(t){if(!Array.isArray(t)||!t.length||t.length>24)return null;let e=[];for(let n of t){let i=Y(n?.fromMin,0,59,NaN),o=Y(n?.toMin,0,59,NaN);if(!Number.isFinite(i)||!Number.isFinite(o)||i>o)return null;let r=Y(n?.slot,1,12,1);e.push({slot:r,fromMin:i,toMin:o})}return e}function Ps(t){let e=[...new Set(t.map(n=>n.fromMin))].sort((n,i)=>n-i);return e.length?e:b.windowStartsMin.slice()}function Xo(t,e="remote"){if(!t||typeof t!="object")return!1;let n=Ls(t.slotWindows);if(n){b.slotWindows.length=0;for(let i of n)b.slotWindows.push(i);b.windowStartsMin=Ps(n)}return typeof t.slotWindowLabel=="string"&&t.slotWindowLabel.length<120&&(b.slotWindowLabel=t.slotWindowLabel),b.cityLoadingMaxMs=Y(t.cityLoadingMaxMs,1e4,3e5,b.cityLoadingMaxMs),b.cityCalendarNoDatesMs=Y(t.cityCalendarNoDatesMs,5e3,12e4,b.cityCalendarNoDatesMs),b.cityRotateMinGapMs=Y(t.cityRotateMinGapMs,5e3,6e4,b.cityRotateMinGapMs),b.cityRotateMaxGapMs=Y(t.cityRotateMaxGapMs,b.cityRotateMinGapMs,9e4,Math.max(b.cityRotateMinGapMs,b.cityRotateMaxGapMs)),b.cityHoldMaxMs=Y(t.cityHoldMaxMs,1e4,18e4,b.cityHoldMaxMs),b.homeKeepaliveMinMs=Y(t.homeKeepaliveMinMs,12e4,18e5,b.homeKeepaliveMinMs),b.homeKeepaliveMaxMs=Y(t.homeKeepaliveMaxMs,b.homeKeepaliveMinMs,18e5,Math.max(b.homeKeepaliveMinMs,b.homeKeepaliveMaxMs)),b.homeKeepaliveDebounceMs=Y(t.homeKeepaliveDebounceMs,6e4,18e5,b.homeKeepaliveDebounceMs),b.loadingStuckMs=Y(t.loadingStuckMs,3e4,6e5,b.loadingStuckMs),b.loadingStuckDebounceMs=Y(t.loadingStuckDebounceMs,3e4,6e5,b.loadingStuckDebounceMs),b.remoteVersion=Y(t.version,0,1e9,b.remoteVersion),b.source=e,!0}async function qs(){try{let e=(await C(si))[si];e?.config&&Xo(e.config,"cache")}catch{}}async function Rs(t){try{await T({[si]:{config:t,fetchedAt:Date.now()}})}catch{}}async function Os({force:t=!1}={}){let e=Date.now();if(!t&&e-ai<Is)return b;if(xe)return xe;xe=(async()=>{await qs();try{let n=await fetch(Es,{method:"GET",cache:"no-store",signal:AbortSignal.timeout(8e3)});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.json();if(!i||typeof i!="object"||Array.isArray(i))throw new Error("bad json");if(i.script||i.code||i.eval)throw new Error("unsafe keys");Xo(i,"remote"),await Rs(i),ai=Date.now()}catch{ai=Date.now()}return b})();try{return await xe}finally{xe=null}}function Qo(){Os().catch(()=>{})}var Et=null,ve=null;function Jo(){return Et||b.slotWindows}function st(){return ve||(Et?.length?Zo(Et):b.slotWindowLabel)}var Hu=b.slotWindows,gt=4,It=6;function Zo(t){return t?.length?t.map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", "):b.slotWindowLabel}function ci(t){if(!Array.isArray(t))return[];let e=[];for(let n of t){if(e.length>=gt)break;let i=Number(n?.fromMin),o=Number(n?.durationMin??n?.duration);if(!Number.isFinite(i)||i<0||i>59)continue;let r=Math.min(It,59-i);if(r<1)continue;if(!Number.isFinite(o)||o<1){let l=Number(n?.toMin);if(!Number.isFinite(l)||l<i||l>59||(o=Math.min(r,l-i),o<1))continue}o=Math.min(r,Math.max(1,Math.round(o)));let s=Math.min(59,i+o);e.push({slot:e.length+1,fromMin:Math.round(i),toMin:s,durationMin:o})}return e}function tr(t){let e=ci(t||[]);return e.length?(Et=e.map(({slot:n,fromMin:i,toMin:o})=>({slot:n,fromMin:i,toMin:o})),ve=Zo(Et),Et):(Et=null,ve=null,null)}function li(){Et=null,ve=null}function er(t){let e=t?.length?t:b.slotWindows,n=[];for(let i of e||[]){if(n.length>=gt)break;let o=Number(i.fromMin),r=Number(i.toMin);if(!Number.isFinite(o)||!Number.isFinite(r)||r<o||o===0&&r<=2&&(e||[]).some(d=>Number(d.fromMin)>=54))continue;let s=Math.min(It,59-o);if(s<1)continue;let l=Math.min(s,Math.max(1,r-o));n.push({fromMin:o,durationMin:l})}return n}function nr(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=i=>Number(e.find(o=>o.type===i)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function ie(t=new Date){let{minute:e}=nr(t),n=Jo();for(let i of n)if(e>=i.fromMin&&e<=i.toMin)return i.slot;return 0}function Ce(t=new Date){if(ie(t))return 0;let{minute:e,second:n}=nr(t),i=e*60+n,o=Jo(),r=[...new Set(o.map(l=>l.fromMin))].sort((l,d)=>l-d);for(let l of r){let d=l*60;if(i<d)return(d-i)*1e3}let s=r[0]??0;return(3600-i+s*60)*1e3}function ui(t){return t<9e4?`${Math.ceil(t/1e3)}s`:`${Math.ceil(t/6e4)}m`}function lr(){let t=document.querySelector(p(a.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=a.selRow,t.dataset[k.mark]="",n.insertAdjacentElement("afterend",t);let i=document.createElement("span");return i.id=a.anchor,i.dataset[k.mark]="",i.dataset[k.w]=e.style.width,i.dataset[k.mw]=e.style.minWidth,i.hidden=!0,e.insertAdjacentElement("beforebegin",i),c.setStyle(e,"width","100%"),c.setStyle(e,"minWidth","0"),t.appendChild(e),t}var Te="waitPillState",Ns=3600*1e3,ir=u.pillWait,Ws=u.pillDone;function Hs(t,e){let n=document.createElement("span");n.className=`${u.pill} ${e}`;let i=(o,r)=>{let s=document.createElement("span");s.className=o,s.textContent=r,n.appendChild(s)};return i(u.pillTtl,t.title),t.timer!==void 0&&i(u.pillTmr,t.timer),n}function Bs(t,e=Date.now()){if(t.kind==="waiting")return{variant:ir};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:ir}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:Ws}}return null}function Fs(t,e,n=new Date){let i=No(n);return t.seconds===void 0?{title:i}:{title:i,timer:Se(t.seconds)}}var Us=class{#t=null;#e={kind:"idle"};#i=null;#n=null;#o=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get(Te))[Te];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>Ns){chrome.storage.local.remove(Te);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#o=t,this.#r(),this.#c()}toggleClockMode(){c.alive&&(this.setClockMode(!this.#o),chrome.storage.local.set({waitPillClock:this.#o}))}render(t){return Bs(this.#e,t)}#l(t){return Fs(t,this.#o,new Date)}#r(){if(this.#t??=Gs(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(u.hidden);return}this.#t.classList.remove(u.hidden),this.#t.replaceChildren(Hs(this.#l(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#i&&(c.clear(this.#i),this.#i=null),t.kind==="running"?(chrome.storage.local.set({[Te]:t}),this.#i=c.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove(Te),this.#r(),this.#c()}#u(){this.#r(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,x("audioAlert").then(t=>{t&&nc()})))}#c(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=c.setInterval(()=>this.#r(),1e3):!t&&this.#n&&(c.clear(this.#n),this.#n=null)}},se=new Us,Ae="pillPosition",or=4;function rr(t,e,n){return Math.max(e,Math.min(n,t))}function ur(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,i=e.height>0?e.height:36;return{w:n,h:i}}function oe(t,e,n){let{w:i,h:o}=ur(t),r=rr(e,0,Math.max(0,window.innerWidth-i)),s=rr(n,0,Math.max(0,window.innerHeight-o));return t.style.setProperty("left",r+"px","important"),t.style.setProperty("top",s+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:r,top:s}}function Ks(t){var e=!1,n=!1,i=0,o=0,r=0,s=0;function l(f){if(e){var g=f.touches?f.touches[0]:f,h=g.clientX-i,w=g.clientY-o;!n&&Math.abs(h)<or&&Math.abs(w)<or||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",oe(t,r+h,s+w),f.cancelable&&f.preventDefault())}}function d(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",d),document.removeEventListener("touchmove",l),document.removeEventListener("touchend",d),n){let f=t.getBoundingClientRect();chrome.storage.local.set({[Ae]:{top:Math.round(f.top),left:Math.round(f.left)}})}n=!1}}t.addEventListener("mousedown",function(f){if(f.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let g=t.getBoundingClientRect();i=f.clientX,o=f.clientY,r=g.left,s=g.top,oe(t,g.left,g.top),document.addEventListener("mousemove",l),document.addEventListener("mouseup",d),f.preventDefault(),f.stopPropagation()}),t.addEventListener("touchstart",function(f){e=!0,n=!1,delete t.dataset.skipClick;let g=t.getBoundingClientRect();i=f.touches[0].clientX,o=f.touches[0].clientY,r=g.left,s=g.top,oe(t,g.left,g.top),document.addEventListener("touchmove",l,{passive:!1}),document.addEventListener("touchend",d)},{passive:!0})}function Gs(){let t=document.querySelector(p(a.waitTime));return t||(t=document.createElement("div"),t.id=a.waitTime,t.className=u.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),Ks(t),chrome.storage.local.get(Ae).then(e=>{let n=e[Ae];n&&typeof n.top=="number"&&typeof n.left=="number"&&oe(t,n.left,n.top)}),Vs(t),t)}function ar(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function zs(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function js(t){let{w:e,h:n}=ur(t),i=12;return[{left:i,top:i},{left:Math.max(i,window.innerWidth-e-i),top:i},{left:i,top:Math.max(i,window.innerHeight-n-i)},{left:Math.max(i,window.innerWidth-e-i),top:Math.max(i,window.innerHeight-n-i)}]}async function Ys(){let e=(await chrome.storage.local.get(Ae))[Ae];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function Vs(t){let e=!1,n=async()=>{if(!c.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(u.hidden))return;let i=zs(),o=!!(i&&i.offsetParent!==null&&i.getBoundingClientRect().height>20),r=t.getBoundingClientRect();if(o&&ar(r,i.getBoundingClientRect())){let s=i.getBoundingClientRect(),l=js(t),d=l.find(f=>{let g={left:f.left,top:f.top,right:f.left+r.width,bottom:f.top+r.height};return!ar(g,s)})||l[2];e=!0,t.setAttribute("data-dodging",""),oe(t,d.left,d.top);return}if(e&&!o){e=!1,t.removeAttribute("data-dodging");let s=await Ys();s&&oe(t,s.left,s.top)}else o||t.removeAttribute("data-dodging")};c.setInterval(n,400),c.on(window,"resize",n)}async function pi(){if(!c.alive||!await x("defaultWaitTime")||!await c.waitFor("#post_select",{attempts:on}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});se.setClockMode(t),await se.restore()}async function dr(){await x("defaultWaitTime")&&se.waiting()}async function pn(t){await x("defaultWaitTime")&&se.run(t)}function fr(){se.toggleClockMode()}function mr(t){se.setClockMode(t)}var _e=null,ke=null,sn=null;function hi(){return sn||(sn=new(window.AudioContext||window.webkitAudioContext),c.disposable(()=>sn?.close())),sn}async function hn(t=150){try{let e=hi();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let o=e.currentTime,r=t/1e3;i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(.1,o+.01),i.gain.setValueAtTime(.1,o+Math.max(.01,r-.02)),i.gain.linearRampToValueAtTime(0,o+r),n.start(),n.stop(o+r)}catch(e){console.error("Audio beep failed:",e)}}function Xs(t,e=125,n=125){let i=0,o=()=>{i>=t||(hn(e),i++,c.setTimeout(o,e+n))};o()}var di=4,sr=50,cr=50,Qs=600;function pr(){if(ke)return;let t=()=>{Xs(di,sr,cr);let e=di*sr+(di-1)*cr;ke=c.setTimeout(t,e+Qs)};t()}var Js=250,Zs=10,tc=300,ec=1e3;function nc(){if(_e)return;let t=[];for(let o=0;o<=tc;o+=Zs)t.push(o);let e=Date.now(),n=0,i=()=>{let o=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&o>=t[n];){let r=n===t.length-1;hn(r?ec:Js),n++}if(n<t.length){let r=t[n],s=e+r*1e3,l=Math.max(0,s-Date.now());_e=c.setTimeout(i,l)}else ce()};i()}function ce(t={}){let e=!!t.keepConsular;_e&&(c.clear(_e),_e=null),ke&&(c.clear(ke),ke=null),fi(),e||mi()}var cn=null,ln=null,re=null,un=null,$e=null;async function hr(){fi();try{let t=hi();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=880,i.frequency.value=1320,o.gain.value=.85,r.gain.value=.65,n.connect(o).connect(e),i.connect(r).connect(e);let s=t.createOscillator(),l=t.createGain();s.type="triangle",s.frequency.value=3.2,l.gain.value=280,s.connect(l),l.connect(n.frequency),l.connect(i.frequency);let d=t.currentTime;n.start(d),i.start(d),s.start(d),re={osc1:n,osc2:i,lfo:s,master:e};let f=()=>{re&&(hn(500),ln=c.setTimeout(f,1800))};f(),cn=c.setTimeout(fi,12e4),$e=document.title;let g=!1,h=()=>{re&&(document.title=g?$e:"!!! SUBMIT CLICKED !!!",g=!g,un=c.setTimeout(h,450))};h()}catch(t){console.error("Submit alarm failed:",t)}}function fi(){if(cn&&(c.clear(cn),cn=null),ln&&(c.clear(ln),ln=null),un&&(c.clear(un),un=null),$e&&(document.title=$e,$e=null),re){try{let{osc1:t,osc2:e,lfo:n}=re;t.stop(),e.stop(),n.stop()}catch{}re=null}}function ic(){let t=location.pathname||"";return/\/ofc-schedule\b/i.test(t)?!1:/\/(schedule|c-schedule)\b/i.test(t)}var oc=6e4,dn=null,fn=null,mn=null,Me=null,ae=null;async function rc(){mi();try{let t=hi();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=980,i.frequency.value=1470,o.gain.value=.95,r.gain.value=.8,n.connect(o).connect(e),i.connect(r).connect(e);let s=t.createOscillator(),l=t.createGain();s.type="square",s.frequency.value=4,l.gain.value=320,s.connect(l),l.connect(n.frequency),l.connect(i.frequency);let d=t.currentTime;n.start(d),i.start(d),s.start(d),ae={osc1:n,osc2:i,lfo:s,master:e};let f=()=>{ae&&(hn(650),fn=c.setTimeout(f,900))};f(),dn=c.setTimeout(mi,oc),Me=document.title;let g=!1,h=()=>{ae&&(document.title=g?Me:"!!! OFC BOOKED \u2014 CONSULAR PAGE !!!",g=!g,mn=c.setTimeout(h,400))};h()}catch(t){console.error("Consular OFC alarm failed:",t)}}function mi(){if(dn&&(c.clear(dn),dn=null),fn&&(c.clear(fn),fn=null),mn&&(c.clear(mn),mn=null),Me&&(document.title=Me,Me=null),ae){try{let{osc1:t,osc2:e,lfo:n}=ae;t.stop(),e.stop(),n.stop()}catch{}ae=null}}function gr(){if(ic()){try{let t="vsConsularOfcBeep";if(sessionStorage.getItem(t)==="1")return;sessionStorage.setItem(t,"1")}catch{}rc()}}function ac(){document.querySelector(p(a.recheck))?.remove();for(let t of document.querySelectorAll("button"))(t.textContent||"").trim()==="Recheck"&&t.remove()}async function gi(){c.alive&&ac()}async function bi(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await c.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let i=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(l=>l.innerText.trim()===i))continue;let r=document.createElement("li");r.className="usa-sidenav__item",r.dataset[k.mark]="";let s=document.createElement("a");s.href=n.link,s.className=u.sideLink,s.target="_self",s.textContent=n.text,r.appendChild(s),t.appendChild(r)}}function M(t,e,n){let i=document.createElement(t);return e&&(i.className=e),n?.appendChild(i),i}function gn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,r]=n;return`${r}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return null}function yi(t){let e=gn(t);if(!e)return String(t||"");let[n,i,o]=e.split("-").map(Number);if(!n||!i||!o)return e;try{return new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(new Date(n,i-1,o))}catch{return e}}function sc(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);if(n)return n[1].slice(0,5);let i=e.match(/^(\d{1,2}:\d{2})/);return i?i[1]:e}function yr(t){let e=document.querySelector(p(a.datesCont));if(e){let o=e.querySelector(p(a.datesPara)),r=e.querySelector("h2");if(r&&t&&(r.textContent=t),o)return{container:e,details:o}}let n=document.querySelector("#page_form");if(!n)return null;e?.remove();let i=cc(t||"");return n.appendChild(i.container),i}function br(t){if(t.response.HasError)return;let e=document.querySelector("#post_select"),n=e?.options[e.selectedIndex]?.text??"",i=(t.response.ScheduleDays||[]).map(f=>gn(f?.Date)).filter(Boolean).sort((f,g)=>f.localeCompare(g));document.querySelector(p(a.datesCont))?.remove();let o=yr(n);if(!o)return;let{details:r}=o;r.replaceChildren();let s=M("div",u.slotsSum,r);if(!i.length){s.textContent="No slots available";return}s.textContent=`${i.length} date${i.length===1?"":"s"} available`;let l={};for(let f of i){let g=f.slice(0,7);(l[g]||=[]).push(f)}for(let[f,g]of Object.entries(l)){let h=M("div",null,r),w=document.createElement("strong");w.textContent=f,h.append(w,`: ${g.map(v=>v.slice(8,10)).join(", ")}`)}let d=M("div",null,r);d.style.marginTop="0.5em";for(let f of i){let g=M("div",null,d);g.textContent=`\u2022 ${yi(f)} (${f})`}}function wr(t,e,n){let i=document.querySelector("#post_select"),o=n||i?.options[i.selectedIndex]?.text||"",r=gn(e)||gn(t?.[0]?.Date)||"",s=(t||[]).filter(S=>S&&S.Time).map(S=>({time:sc(S.Time),avail:S.EntriesAvailable!=null&&Number.isFinite(Number(S.EntriesAvailable))?Number(S.EntriesAvailable):null,raw:S})).sort((S,O)=>String(S.time).localeCompare(String(O.time))),l=yr(o);if(!l)return;let{details:d}=l;d.replaceChildren();let f=M("div",u.slotsSum,d);if(!s.length){f.textContent=r?`No time slots on ${yi(r)}`:"No time slots available";return}let g=s.filter(S=>S.avail==null||S.avail>0),h=g.reduce((S,O)=>S+(O.avail||0),0),w=r?yi(r):"selected date";if(f.textContent=h>0?`${g.length} time slot${g.length===1?"":"s"} on ${w} \xB7 ${h} available`:`${s.length} time slot${s.length===1?"":"s"} on ${w}`,r){let S=M("div",null,d);S.style.margin="0.35em 0 0.6em",S.textContent=`Date: ${w} (${r})`}let v=M("table",u.slotsTbl,d);v.id=a.slotsTbl;let K=M("thead",null,v),$=M("tr",null,K);for(let S of["Time","Availability"]){let O=M("th",null,$);O.textContent=S}let z=M("tbody",null,v);for(let S of s){let O=M("tr",null,z);S.avail===0&&(O.style.opacity="0.55");let ht=M("td",null,O);ht.textContent=S.time;let ws=M("td",null,O);ws.textContent=S.avail==null?"\u2014":String(S.avail)}}function cc(t){let e=M("div","row");e.id=a.datesCont;let n=M("div","col-sm-12 atlas_section mt-3",e),i=M("div","col-sm-12 atlas_section_header_row",M("div","row",n));M("h2",null,i).textContent=t;let o=M("div",null,M("div","col-sm-12",M("div","row",n)));return o.id=a.datesPara,{container:e,details:o}}var Sr=null;function lc(){let t=document.querySelector(p(a.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return c.setStyle(n,"display","flex"),c.setStyle(n,"alignItems","center"),c.setStyle(n,"justifyContent","flex-end"),c.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=a.ofcDate,t.dataset[k.mark]="",e.insertAdjacentElement("beforebegin",t),t}function uc(){if(!location.pathname.includes("/schedule"))return;let t=Sr;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=lc();n&&(n.textContent=`OFC (Estimate): ${Wo(e.appointmentDateStr)}`)}function xr(t){chrome.runtime?.id&&(Sr=t.data.data,c.waitFor("#submitbtn").then(e=>{e&&uc()}))}var yn=new Map,vr=45e3,bn=new Map,Cr=8e3,Tr=0;function wn(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function Sn(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function dc(t,e){return`${t}:${e.slice(0,5).join(",")}`}function fc(t){let e=Date.now(),n=yn.get(t);if(n&&e-n<vr)return!1;yn.set(t,e);for(let[i,o]of yn)e-o>vr*4&&yn.delete(i);return!0}function mc(t){let e=Date.now(),n=bn.get(t);if(n&&e-n<Cr)return!1;bn.set(t,e);for(let[i,o]of bn)e-o>Cr*6&&bn.delete(i);return!0}async function _r(){return await x("telegramViaServer")!==!1}async function kr(t,{kind:e="alert",dedupKey:n="",skipDedup:i=!1,notifyMuktesh:o=!0}={}){if(t&&await _r())try{await fetch(Do,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:i,notify_muktesh:o}),signal:AbortSignal.timeout(2e4)})}catch{}}function pc(t,{kind:e="screen",dedupKey:n="",waitMs:i=0,skipDedup:o=!1,notifyMuktesh:r=!0}={}){c.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:i,skipDedup:o,notifyMuktesh:r,captureScreenshot:!0})}async function hc(t,e,n){let i=wn(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&r.push(`\u{1FAAA} <b>Visa:</b> ${n}`),r.push(`\u{1F550} <b>Checked:</b> ${o} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),r.push(`\u{1F4C6} <b>Dates (${i.length}):</b>`,"");for(let s of i.slice(0,30))r.push(`\u{1F7E2} <b>${Sn(s)}</b>`);return i.length>30&&r.push("",`\u2795 <i>+${i.length-30} more dates</i>`),r.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),r.join(`
`)}function gc(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",i=document.querySelector("#datepicker")?.value||"\u2014",r=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:i,time:r}}async function $r(t,{postId:e,postName:n,hasError:i}={}){if(i||!t?.length)return;let o=wn(t);if(!o.length||!await x("telegramAlert"))return;let r=dc(e||n||"unknown",o);if(!fc(r))return;let s=await G(),l=await hc(n,t,s?.visa||"");await kr(l,{kind:"slots",dedupKey:r,notifyMuktesh:!0})}function yc(t,e,n){let i=wn(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`;if(i.length){let s=i.slice(0,5).map(l=>Sn(l)).join(", ");return`<b>DATES AVAILABLE</b>
\u{1F3DB}\uFE0F ${r}
\u{1F4C6} ${i.length} date(s)
${s}${i.length>5?"\u2026":""}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}return`<b>City changed \u2014 no dates</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}function bc(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=e?Sn(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${i}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function wc(t,e,n){let i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?Sn(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u23F0 ${n} slot(s)
\u{1F550} ${i} IST
\u{1F4F2} Visa Slot 6`}async function le(t,{kind:e="screen",dedupKey:n,waitMs:i=0,skipDedup:o=!1}={}){if(await x("telegramScreenshots")===!1||!await _r())return;let r=n||`${e}:${String(t).slice(0,80)}`;!o&&!mc(r)||pc(t,{kind:e,dedupKey:r,waitMs:i,skipDedup:o,notifyMuktesh:!0})}async function Mr(t,{postId:e,postName:n,hasError:i}={}){let o=yc(n,t,i),r=wn(t),s=r.length?"dates":"city";await le(o,{kind:s,dedupKey:`${s}:${e||n}:${r.length}:${i?1:0}`,waitMs:r.length?1400:900})}async function Ar(t,e){await le(bc(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function Dr(t,e,n){await le(wc(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function Er(){let t=Date.now();if(t-Tr<8e3)return;Tr=t;let e=await G(),{city:n,date:i,time:o}=gc(),r=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),s=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${i}`,`\u23F0 <b>Time:</b> ${o}`];e?.email&&s.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&s.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),s.push(`\u{1F550} <b>When:</b> ${r} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let l=s.join(`
`);await kr(l,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await le(l,{kind:"submit",skipDedup:!0,waitMs:200})}var vn=25;function Cn(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function xi(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let i=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,i),n-1)}function Ir(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function Lr(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function Ci(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function wi(t){if(t)try{t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}}function xn(t){if(t)try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}}function vi(t){if(!t||t.disabled)return!1;try{if(t.tagName==="SELECT")return!t.value||t.value==="0"?!1:(wi(t),t.value&&t.value!=="0"?!0:(xn(t),!!(t.value&&t.value!=="0")));if(t.type==="radio"||t.type==="checkbox"){if(t.name)for(let i of document.getElementsByName(t.name))i!==t&&(i.checked=!1);if(t.checked=!0,wi(t),t.checked)return!0;let e=t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,n=t.closest("tr");for(let i of[e,t.closest("label"),t,n].filter(Boolean))xn(i);return t.checked=!0,wi(t),t.checked===!0}xn(t)}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function Pr(){let t=new Set,e=[],n=i=>{if(!i||t.has(i)||Ci(i)||i.disabled)return;let o=i.closest("tr");o&&Lr(o)||(t.add(i),e.push(i))};for(let i of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let o of document.querySelectorAll(`${i}:not([disabled])`))n(o);return e}function Sc(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!Ir(n)||Lr(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function xc(t,e){for(let n of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(n.tagName!=="SELECT"||n.disabled||Ci(n))continue;let i=[...n.options].filter(s=>!s.disabled&&s.value&&s.value!=="0"&&Ir({textContent:s.textContent}));if(!i.length)continue;let o=null,r=Cn(e);if(r&&r!=="00:00"&&(o=i.find(s=>(s.textContent||"").includes(r))||null,!o)){let s=r.match(/(\d{1,2}:\d{2})/);s&&(o=i.find(l=>(l.textContent||"").includes(s[1]))||null)}if(!o){let s=xi(i.length,t);o=i[s]}if(o&&(n.value=o.value,vi(n)))return!0}return!1}function vc(t,e){if(xc(t,e))return!0;let n=Pr();if(n.length){let o=null,r=Cn(e);if(r&&r!=="00:00"&&(o=n.find(s=>{let l=(s.closest("tr")?.textContent||s.textContent||"").replace(/\s+/g," ");return l.includes(r)||l.includes(r.slice(0,5))})||null),!o){let s=xi(n.length,t);o=n[s]}if(o&&vi(o))return!0}let i=Sc();if(i.length){let o=null,r=Cn(e);if(r&&r!=="00:00"&&(o=i.find(d=>(d.textContent||"").includes(r))||null),!o){let d=xi(i.length,t);o=i[d]}if(!o)return!1;let s=o.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(s&&vi(s))return!0;let l=o.querySelector("label");if(l)return xn(l),!!o.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function V(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!Ci(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function Cc({slotIndex:t=0,maxMs:e=12e3,pollMs:n=vn,time:i,onTick:o}={}){let r=Date.now()+e,s=Math.max(10,n||25);return new Promise(l=>{let d=()=>{if(!c.alive)return l(!1);if(o?.(),vc(t,i)||V())return l(!0);if(Date.now()>=r)return l(!1);c.setTimeout(d,s)};d()})}function De({time:t,date:e,slotIndex:n,pollMs:i,maxMs:o}){let r=n??0,s=o||15e3,l=i||vn;return c.send({action:"forcePickTimeSlot",slotIndex:r,maxMs:s,pollMs:l}),c.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:r,pollMs:l,domWaitMs:0,maxMs:s}),Cc({slotIndex:r,maxMs:s,pollMs:l,time:t||"00:00"})}var Si=!1;function qr({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(Si)return;Si=!0;let i=!1,o=async()=>{if(!(!c.alive||i)){if(V()){n?.();return}try{if(t&&!await t())return}catch{return}Pr().length&&(i=!0,await De({slotIndex:e,time:"00:00",maxMs:800,pollMs:vn}),i=!1,V()&&n?.())}};c.setInterval(o,vn);let r=document.querySelector("#page_form")||document.body,s=new MutationObserver(()=>o());s.observe(r,{childList:!0,subtree:!0}),c.disposable(()=>{s.disconnect(),Si=!1})}function Rr(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let i=Cn(n?.Time);if(!i)continue;let o=i.match(/(\d{1,2}):(\d{2})/);if(!o)continue;let[,r,s]=o;if(e.includes(`${r}:${s}`)||e.includes(`${parseInt(r,10)}:${s}`))return!0}return!1}var Tn="submitErrors",Or=50,Tc=45e3,Wr=0,Ti=new Set,Ee=null,Hr=null;function Br(t){Hr=typeof t=="function"?t:null}function _c(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",i=document.querySelector("#datepicker")?.value||"";return{city:e,date:i,url:location.href}}function Ie(){Wr=Date.now()+Tc,Ti.clear(),Ec()}function _n(){return Date.now()<Wr}function kc(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function $c(t){let e=await C({[Tn]:[]}),n=Array.isArray(e[Tn])?e[Tn]:[];n.push(t),n.length>Or&&n.splice(0,n.length-Or),await T({[Tn]:n})}function Nr(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function Mc(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${Nr(t.source)}`,`\u{1F4AC} <b>Message:</b> ${Nr(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let i=n.join(`
`);await le(i,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function Le(t,e,n={}){let i=String(e||"").trim();if(!i||!_n()&&!n.force)return;let o=kc(t,i);if(Ti.has(o))return;Ti.add(o);let r=_c(),s=await G(),l={at:Date.now(),source:String(t||"unknown"),message:i.slice(0,2e3),city:n.city||r.city,date:n.date||r.date,url:n.url||r.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:s?.email||""};await $c(l);try{await Mc(l)}catch{}try{Hr?.(l)}catch{}}function Ac(t){if(!_n())return;let e=t?.status,n=t?.retryAfter,i=t?.cgiBlock,o=`Request failed (HTTP ${e||"?"})`;n!=null&&(o+=` \u2014 retry after ${n}s`),i&&(o+=" \u2014 CGI access limitation"),Le("ajax_error",o,{status:e})}function Fr(t){if(!_n()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){Ac({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",o=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";Le("ajax_response",o,{route:t.tail||""})}var Dc=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function Ec(){Ee&&c.clear(Ee);let t=()=>{if(!c.alive||!_n()){Ee=null;return}for(let e of Dc)for(let n of document.querySelectorAll(e)){let i=(n.textContent||"").replace(/\s+/g," ").trim();!i||i.length<4||Le("page_validation",i)}Ee=c.setTimeout(t,600)};Ee=c.setTimeout(t,500)}var Pe=0,Ur="",Kr=0;async function Ic(){let[t,e]=await Promise.all([G(),C(["cgiIdToken"])]),n=ne(e.cgiIdToken);return{profile:t,token:n}}async function Gr(t){if(!N()||!await x("serverSync"))return null;let{profile:e,token:n}=await Ic();if(!e?.id&&!e?.email)return null;try{let i={...t,profile:e};n&&(i.token=n);let o=await fetch(Eo,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}).then(r=>r.json());return o&&o.success?o:null}catch{return null}}async function zr({postId:t,postName:e,dayCount:n}={}){let i=String(t||"").trim(),o=Number(n)||0;if(!i||o<1)return null;let r=`${i}:${o}`,s=Date.now();if(r===Ur&&s-Kr<1500)return null;Ur=r,Kr=s;let l=await Gr({action:"alert",city:{id:i,name:String(e||i).trim()},dayCount:o});return l?.alertId&&(Pe=Math.max(Pe,Number(l.alertId)||0)),l}async function jr({preferredCities:t=[],citiesEnabled:e=!1,currentCityId:n=""}={}){if(!e||!t?.length)return null;let o=(await Gr({action:"poll",preferredCities:t,citiesEnabled:!0,currentCityId:String(n||""),lastAlertId:Pe}))?.forceCity;return!o?.id||!o?.alertId?null:o}function kn(t){let e=Number(t)||0;e>Pe&&(Pe=e)}var Lc=["cities","from","to","submitEnabled","citiesEnabled","enabled","slotWindows","termsAgreed","termsPassed","termsAgreedAt"];function Yr(t){if(!t||typeof t!="object")return{};let e={};for(let n of Lc)n in t&&(e[n]=t[n]);return typeof e.submitEnabled!="boolean"&&typeof e.enabled=="boolean"&&(e.submitEnabled=e.enabled),delete e.enabled,e}function Vr(t,e){if(!e||typeof e!="object")return t||null;let n=t&&typeof t=="object"?{...t}:{},i=Number(n.serverUpdatedAt)||0,o=Number(e.updatedAt)||0;if(o&&i&&o<i)return n;let r=Yr(e),s={...n,...r};return typeof r.submitEnabled=="boolean"&&(s.enabled=r.submitEnabled),e.updatedAt&&(s.serverUpdatedAt=e.updatedAt),s}async function Xr(){let[t,e]=await Promise.all([G(),C(["cgiIdToken"])]),n=ne(e.cgiIdToken);return{profile:t,token:n}}async function Qr(t){if(!N()||!await x("serverSync"))return!1;let e=Yr(t);if(!Object.keys(e).length)return!1;let{profile:n,token:i}=await Xr();if(!n?.id&&!n?.email)return!1;try{let o={profile:n,prefs:e};i&&(o.token=i);let r=await fetch(en,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(s=>s.json());return!!(r&&r.success)}catch{return!1}}async function Jr(){if(!N()||!await x("serverSync"))return null;let{profile:t,token:e}=await Xr();if(!t?.id&&!t?.email)return null;try{let n=new URLSearchParams;t.id&&n.set("applicant_id",String(t.id)),t.email&&n.set("email",String(t.email));let i=await fetch(`${en}?${n.toString()}`,{method:"GET",headers:{Accept:"application/json"}}).then(r=>r.json());if(i?.prefs)return i.prefs;let o={profile:t};return e&&(o.token=e),i=await fetch(en,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(r=>r.json()),i?.prefs||null}catch{return null}}var Pt="aiSubmitByAccount",Be=8e3;var X=25;var Ln=0,Oe=1e4,pa=1e3;function Fe(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}function qi(){return b.cityRotateMinGapMs}function Pc(){return b.cityRotateMaxGapMs}function Ne(){return b.cityHoldMaxMs}function bt(){return b.cityLoadingMaxMs}function Ut(){return b.cityCalendarNoDatesMs}var Zr=5e3,$i=2e4,qc=15e3;function _t(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function Ri(){return/\/ofc-schedule\b/i.test(location.pathname)}function _(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var Rc=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function Mn(t,e){let n=Rc[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(o=>{let r=e===o?" selected":"";return`<option value="${o.replace(/"/g,"&quot;")}"${r}>${o}</option>`}).join("")}function ue(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function Vt(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function Oc(t,e,n){return`${t}-${String(e+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`}function Nc(t){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(t))return null;let[e,n,i]=t.split("-").map(Number),o=new Date(e,n-1,i);return o.getFullYear()!==e||o.getMonth()!==n-1||o.getDate()!==i?null:o}function Oi(){for(let t of["from","to"]){let e=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo)),n=document.querySelector(p(t==="from"?a.aiFromBtn:a.aiToBtn));if(!n)continue;let i=e?.value||"";n.textContent=i?Vt(i):"Select date"}}function _i(t,e){let n=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo));if(n&&(n.value=e||""),t==="from"){let i=document.querySelector(p(a.aiTo));i&&e&&i.value&&i.value<e&&(i.value="")}Oi()}var Q={y:0,m0:0,which:"from"};function qt(){document.querySelector(p(a.aiCal))?.classList.add(u.hidden)}function Ni(t){let e=t.target;return e?e.nodeType===3?e.parentElement:e:null}function Mi(){let t=document.querySelector(p(a.aiCal));if(!t)return;let{y:e,m0:n,which:i}=Q,o=document.querySelector(p(i==="from"?a.aiFrom:a.aiTo))?.value||"",r=ue(),s=i==="to"&&document.querySelector(p(a.aiFrom))?.value||ue(),l=new Date(e,n,1).toLocaleDateString("en-IN",{month:"long",year:"numeric"}),d=new Date(e,n,1).getDay(),f=new Date(e,n+1,0).getDate(),g=new Date(e,n,0).getDate(),h="";for(let w of["S","M","T","W","T","F","S"])h+=`<div class="${u.aiHint}">${w}</div>`;for(let w=0;w<42;w++){let v,K=e,$=n,z=!1;w<d?(v=g-d+w+1,$=n-1,$<0&&($=11,K=e-1),z=!0):w>=d+f?(v=w-d-f+1,$=n+1,$>11&&($=0,K=e+1),z=!0):v=w-d+1;let S=Oc(K,$,v),O=S<s,ht=[u.aiCalDay,z?u.aiCalMuted:"",O?u.aiCalMuted:"",S===r?u.aiCalToday:"",S===o?u.aiCalOn:""].filter(Boolean).join(" ");h+=`<button type="button" class="${ht}" data-iso="${S}" ${O?'disabled aria-disabled="true"':""}>${v}</button>`}t.innerHTML=`
    <div class="${u.aiCalHead}">
      <button type="button" data-cal="prev" aria-label="Previous month">\u2039</button>
      <div class="${u.aiHead}">${l}</div>
      <button type="button" data-cal="next" aria-label="Next month">\u203A</button>
    </div>
    <div class="${u.aiCalGrid}">${h}</div>
    <div class="${u.aiRow}">
      <button type="button" data-cal="clear">Clear</button>
      <button type="button" data-cal="today">Today</button>
    </div>
  `}function Wc(t){let e=document.querySelector(p(a.aiCal)),i=Ni(t)?.closest?.("button");if(!e||!i||!e.contains(i))return;t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation();let o=i.getAttribute("data-cal"),r=Q.which,s=r==="to"&&document.querySelector(p(a.aiFrom))?.value||ue();if(o==="prev"){Q.m0-=1,Q.m0<0&&(Q.m0=11,Q.y-=1),Mi();return}if(o==="next"){Q.m0+=1,Q.m0>11&&(Q.m0=0,Q.y+=1),Mi();return}if(o==="clear"){_i(r,""),qt();return}if(o==="today"){let d=ue();d>=s&&(_i(r,d),qt(),ma());return}if(i.disabled||i.getAttribute("aria-disabled")==="true")return;let l=i.getAttribute("data-iso");!l||l<s||(_i(r,l),qt(),ma())}function ta(t){let e=document.querySelector(p(a.aiCal));if(!e||!t)return;let n=t.getBoundingClientRect(),i=Math.min(340,window.innerWidth-16),o=e.offsetHeight||360,r=Math.max(8,Math.min(n.left,window.innerWidth-i-8)),s=n.bottom+6;s+o>window.innerHeight-8&&n.top-6-o>=8?s=n.top-6-o:s=Math.max(8,Math.min(s,window.innerHeight-o-8)),e.style.position="fixed",e.style.top=`${Math.round(s)}px`,e.style.left=`${Math.round(r)}px`,e.style.width=`${i}px`,e.style.right="auto",e.style.bottom="auto"}function ea(t,e){let n=document.querySelector(p(a.aiCal));n||(n=document.createElement("div"),n.id=a.aiCal,n.className=`${u.aiCal} ${u.hidden}`,n.dataset[k.mark]="",document.body.appendChild(n),c.on(n,"pointerdown",Wc,{capture:!0}),c.on(n,"click",r=>{n.contains(Ni(r))&&(r.preventDefault(),r.stopPropagation())},{capture:!0}));let i=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo))?.value,o=Nc(i)||new Date;Q={y:o.getFullYear(),m0:o.getMonth(),which:t},Mi(),n.classList.remove(u.hidden),ta(e),requestAnimationFrame(()=>ta(e))}function Ot(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function Rt(t){return!!(t&&t.citiesEnabled)}async function q(){let t=await G();return t?.id?String(t.id):null}async function L(t){return t&&((await C(Pt))[Pt]||{})[t]||null}async function Wi(t,e){if(!t)return;let i=(await C(Pt))[Pt]||{};e==null?delete i[t]:i[t]=e,await T({[Pt]:i})}var H=!1;function Ue(){return H}function fe(){H=!0,Qt(),Re()}function kt(){H=!1,E=!1,Qt()}async function En(t){ha(),fe();let e=await L(t);if(!e){et();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await Wi(t,e),et()}var St=!1,Kt=null,Lt=null,na=2e4;function ha(){St=!1,Kt&&(c.clear(Kt),Kt=null),Lt&&(c.clear(Lt),Lt=null)}async function Ke(t){if(_()||ia()){t?await En(t):fe(),y("Booking confirmed \u2014 Tik Tik stopped.");return}St=!0,$t(),Ie(),y("Submit clicked \u2014 waiting for confirmation (Auto Submit + City Change stay ON)\u2026"),Lt&&c.clear(Lt);let e=Date.now(),n=async()=>{if(Lt=null,!(!St||!c.alive)){if(ia()||_()){let i=t||await q();i?await En(i):fe(),y("Booking confirmed \u2014 Tik Tik stopped.");return}if(Date.now()-e>=na){await We("no confirmation yet \u2014 resuming city checks");return}Lt=c.setTimeout(n,400)}};Lt=c.setTimeout(n,400),Kt&&c.clear(Kt),Kt=c.setTimeout(()=>{Kt=null,St&&We("submit wait timed out \u2014 resuming city checks")},na)}function ia(){if(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))return!0;let t=(document.body?.innerText||"").slice(0,2500);return/appointment\s+confirmation|successfully\s+scheduled|your\s+appointment\s+has\s+been/i.test(t)}async function We(t=""){if(!St&&!P&&!E){ut();return}ha(),E=!1,Qt(),H&&kt(),ut();let e=await q();if(e){let i=await L(e);i&&i.submitEnabled===!1&&i.citiesEnabled}let n=t?`Submit failed (${t})`:"Submit failed";if(y(`${n} \u2014 Auto Submit + City Change still ON; hopping cities\u2026`),R)Z(Date.now()),D();else if(e){let i=await L(e);Rt(i)&&await Rn()}}function Ge(){return St}function ze(t,e,n){let i=String(t||"").slice(0,10);return!(!i||i.length<10||e&&i<e||n&&i>n)}async function at(){if(H||_()||!_t())return null;let t=await q();if(!t)return null;let e=await L(t);return!Ot(e)||!e.from||!e.to?null:{...e,accountId:t}}async function me(){if(H||_()||!_t())return null;let t=await q();if(!t)return null;let e=await L(t);return!Rt(e)||!e.cities?.length?null:($a(e),{...e,accountId:t})}function Hi(t,e,n){let i=new Date;return i.setHours(0,0,0,0),(t||[]).filter(o=>o&&typeof o.Date=="string"&&o.Date.length>=10).filter(o=>ze(o.Date,e,n)).filter(o=>{let[r,s,l]=o.Date.slice(0,10).split("-").map(Number);return new Date(r,s-1,l)>=i}).sort((o,r)=>String(o.Date).localeCompare(String(r.Date)))}var E=!1,wt=null,xt=null,ot=!1,vt=0,R=!1,j=0,Ct=0,qe=0,jt=0,pe=!1,ct=null,yt=0,P=!1,W=0,de=null,Gt=null,Xt=0,oa=!1,ra="",aa=!1,Ai=0;function Hc(t){return(t||[]).map(e=>e.id).join("")}function ga(){let t=document.querySelector(p(a.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function sa(t){let e=document.querySelector(p(a.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function Qt(){wt&&(c.clear(wt),wt=null),E=!1}function Nt(){de&&(c.clear(de),de=null)}function ya(){Nt(),W||(W=Date.now());let t=Math.max(500,Ne()-(Date.now()-W));de=c.setTimeout(()=>{de=null,!(!P||!R||!c.alive)&&(P=!1,W=0,Z(Date.now()),y(`City Change \u2014 booking hold timed out (${Ne()/1e3}s); next city in 13\u201318s\u2026`),D())},t)}function Bc(){Gt&&(c.clear(Gt),Gt=null)}function Pn(t=Date.now()){let e=!1;if(ot&&vt&&t-vt>=qc&&(ot=!1,vt=0,e=!0),P&&(W||(W=t),t-W>=Ne()?(Nt(),P=!1,W=0,e=!0):de||ya()),pe){yt||(yt=t);let i=Di()?bt():Ut();if(t-yt>=i)tt(),e=!0;else if(!ct){let o=Math.max(500,i-(t-yt));ct=c.setTimeout(()=>{if(ct=null,!R||P)return;let r=Di(),s=r?bt():Ut();if(Date.now()-(yt||0)<s){Pn();return}tt(),Z(Date.now()),y(r?`City Change \u2014 still Loading after ${bt()/1e3}s; changing city\u2026`:`City Change \u2014 calendar up but no dates after ${Ut()/1e3}s; changing city\u2026`),D()},o)}}return E&&!wt&&(E=!1,e=!0),e}function ba(){if(Gt||!R)return;let t=()=>{if(Gt=null,!R||!c.alive||H)return;let e=Date.now(),n=Pn(e),i=!!ie(new Date(e)),o=!!xt,s=!(!i&&o||(pe||P||E)&&o)&&Xt>0&&e-Xt>=$i;if(n||s||!o&&!ot)s?(ot=!1,vt=0,tt(),Nt(),P=!1,W=0,E&&!wt&&(E=!1),j=e,y(i?"City Change \u2014 unstuck; hopping now\u2026":`City Change \u2014 unstuck; waiting for IST window ${st()}\u2026`)):n?(j=e,y(i?"City Change \u2014 lock cleared; hopping now\u2026":`City Change \u2014 lock cleared; next IST window ${st()}\u2026`)):y("City Change \u2014 timer lost; restarting\u2026"),D();else if(!i&&o){let d=Ce(new Date(e));y(`City Change \u2014 waiting for slot window (IST ${st()}, next in ${ui(d)})`)}R&&(Gt=c.setTimeout(t,Zr))};Gt=c.setTimeout(t,Zr)}function Re(){Ki(),Bc(),Qc(),Nt(),ot=!1,vt=0,R=!1,P=!1,W=0,j=0,Ct=0,Xt=0,tt()}function tt(){pe=!1,yt=0,ct&&(c.clear(ct),ct=null)}function Bi(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let i=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(i))continue;let o=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let r of o)if(r&&/\bLoading\.{0,3}\b/i.test((r.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let o=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(o))continue;let r=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(r))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function Di(){return Bi()}function wa(){pe=!0,yt=Date.now(),ct&&c.clear(ct),ct=c.setTimeout(()=>{ct=null,!(!R||P)&&(tt(),Z(Date.now()),y(`City Change \u2014 still Loading after ${bt()/1e3}s; changing city\u2026`),D())},bt())}function Fi(t){let e=Math.max(0,Number(t)||0)*1e3;jt=Math.max(jt,Date.now()+e),j=Math.max(j,jt),tt(),D()}function Sa(){tt()}function $t(){H||(P=!0,W||(W=Date.now()),Ki(),tt(),ya(),y("City Change \u2014 paused (Auto Submit booking)\u2026"))}function ut(){if(St){y("Submit pending \u2014 staying on this city (ignoring date reload hop)\u2026");return}P&&(Nt(),P=!1,W=0,!(!R||H)&&(Z(Date.now()),y("City Change \u2014 resuming; next city in 13\u201318s\u2026"),D()))}async function qn(){let t=await at();if(!t)return;let e=Date.now();if(e-Ai<6e4)return;Ai=e;let i=document.querySelector("#post_select")?.value;if(!i){y("Auto Submit ON \u2014 pick a city first.");return}let r=(await At()).find(l=>String(l.ID)===String(i)),s=r?.Days;if(Array.isArray(s)&&s.length){let l=Hi(s,t.from,t.to);if(l.length){$t();let d=Fe(l.length),f=l[d].Date;y(`Auto Submit: picking date #${d+1} (${f.slice(0,10)})\u2026`),c.send({action:"selectFirstDate",date:f,maxMs:Be,pollMs:X});return}y(`Auto Submit ON \u2014 no dates in your range on ${r.Name||"this city"} yet.`);return}y("Auto Submit ON \u2014 loading slots for current city\u2026"),c.send({action:"selectPost",postId:String(i)})}function Ui(){Ai=0}function Ki(){xt&&(c.clear(xt),xt=null)}function Fc(t,e){return t+Math.random()*(e-t)}function Uc(){return Fc(qi(),Pc())}function Z(t=Date.now()){j=t+Uc()}function Kc(t=Date.now()){let e=Ce(new Date(t));if(e>0)return e;if(jt>t)return jt-t;if(Ct){let n=Ct+qi()-t;if(n>0)return n}return j>t?j-t:0}function D(){if(!R)return;if(Ki(),P||pe){xt=c.setTimeout(()=>{ki()},500);return}let t=Date.now(),e=Ce(new Date(t));if(e>0){j>t&&(j=t),e>=$i&&(Xt=t),xt=c.setTimeout(()=>{ki()},e);return}let n=0;jt>t&&(n=Math.max(n,jt-t)),Ct&&(n=Math.max(n,Ct+qi()-t)),j>t&&(n=Math.max(n,j-t)),n=Math.max(0,n),n>=$i&&(Xt=Date.now()),xt=c.setTimeout(()=>{ki()},n)}function Gc(t,e){if(!t.length)return null;if(t.length===1)return qe=0,t[0];let n=t.findIndex(o=>String(o.id)===String(e));n<0&&(n=Math.max(0,Math.min(qe,t.length-1)));let i=(n+1)%t.length;return qe=i,t[i]}function Gi(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function Yt(){let t=document.querySelector(p(a.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function je(){return{from:document.querySelector(p(a.aiFrom))?.value||null,to:document.querySelector(p(a.aiTo))?.value||null}}function He(t=[],{force:e=!1}={}){let n=document.querySelector(p(a.aiCities));if(!n)return;let i=Gi(),o=Hc(i),r=document.querySelector(p(a.aiPanel)),s=r&&!r.classList.contains(u.hidden),l=ga();if(!e&&o===ra&&n.querySelector('input[type="checkbox"]'))return;ra=o;let d=new Set(s&&l.length&&!e&&!t.length?l:(t.length?t:l).map(String));if(n.replaceChildren(),!i.length){n.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let f of i){let g=document.createElement("label"),h=document.createElement("input");h.type="checkbox",h.value=f.id,h.dataset.name=f.name,h.checked=d.has(f.id),g.append(h,document.createTextNode(f.name)),n.appendChild(g)}}function zc(t){let e=t?.cities||[];return e.length?e.map(n=>n.name||n.id).join(", "):"\u2014"}async function Tt(t,e={}){let n=await L(t)||{},{from:i,to:o}=je(),r=Yt(),s={...n,from:i||n.from||null,to:o||n.to||null,cities:r.length?r:n.cities||[],loginId:document.querySelector(p(a.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(p(a.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(l=>{let d=[a.aiQ1,a.aiQ2,a.aiQ3][l],f=[a.aiA1,a.aiA2,a.aiA3][l];return{q:document.querySelector(p(d))?.value?.trim()||n.security?.[l]?.q||"",a:document.querySelector(p(f))?.value?.trim()||n.security?.[l]?.a||"",set:l+1}}),...e};return typeof s.submitEnabled=="boolean"&&(s.enabled=s.submitEnabled),s.serverUpdatedAt=Date.now(),await Wi(t,s),jc(s),s}var $n=null,Ei=null;function jc(t){$n&&c.clear($n),$n=c.setTimeout(()=>{$n=null,Qr(t).catch(()=>{})},400)}async function xa(t){if(!t||Ei===t)return null;let e=await Jr();if(Ei=t,!e)return null;let n=await L(t)||{},i=Vr(n,e);return i?(i.loginId=n.loginId||i.loginId||"",i.loginPass=n.loginPass||"",i.security=n.security||i.security||[],typeof i.submitEnabled=="boolean"&&(i.enabled=i.submitEnabled),await Wi(t,i),i):null}async function Yc(t,e){if(St||!ie()||P||E)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let i=String(t);return String(n.value)===i?!1:(wa(),y(`Switching city \u2192 ${e||t}\u2026`),c.send({action:"selectPost",postId:i}),!0)}async function Vc(t,e,{alertId:n,dayCount:i}={}){if(H||_()||!_t()||St)return!1;let o=document.querySelector("#post_select");if(!o||!t)return!1;let r=String(t),s=e||r;return String(o.value)===r?(y(`City alert \u2014 already on ${s}`+(i?` (${i} dates reported)`:"")),!0):(Nt(),tt(),P=!1,W=0,E=!1,Qt(),ot=!1,vt=0,j=Date.now(),Ct=0,wa(),Ct=Date.now(),y(`City alert \u2014 switching now \u2192 ${s}`+(i?` (${i} dates)`:"")+(n?` [#${n}]`:"")),c.send({action:"selectPost",postId:r}),R&&D(),!0)}var zt=null,An=!1,ca="",la=0,Xc=150;function Qc(){zt&&(c.clear(zt),zt=null),An=!1}async function Jc(){if(!(An||!R||H)){An=!0;try{let t=await me();if(!t?.cities?.length)return;let e=document.querySelector("#post_select"),n=await jr({preferredCities:t.cities,citiesEnabled:!0,currentCityId:e?String(e.value):""});if(!n?.alertId)return;if(n.alreadyThere){kn(n.alertId),y(`City alert \u2014 already on ${n.name||n.id}`+(n.dayCount?` (${n.dayCount} dates)`:""));return}let i=`${n.id}:${n.alertId}`,o=Date.now();if(i===ca&&o-la<6e3){kn(n.alertId);return}await Vc(n.id,n.name,{alertId:n.alertId,dayCount:n.dayCount})&&(ca=i,la=o,kn(n.alertId))}catch{}finally{An=!1}}}function va(){if(zt||!R)return;let t=()=>{zt=null,!(!R||H||!c.alive)&&Jc().finally(()=>{R&&!H&&c.alive&&(zt=c.setTimeout(t,Xc))})};zt=c.setTimeout(t,50)}function zi(){oa||!document.querySelector("#post_select")||(oa=!0)}async function ki(){if(!(ot||!R)){ot=!0,vt=Date.now(),Xt=Date.now(),xt=null;try{if(H||_()||!c.alive){Re();return}if(Pn()){j=Date.now(),y(ie()?"City Change \u2014 auto-unstuck; hopping now\u2026":`City Change \u2014 auto-unstuck; waiting IST ${st()}\u2026`),D();return}if(P||E){let h=W?Date.now()-W:0;if(P&&h>=Ne()){Nt(),P=!1,W=0,Z(Date.now()),y("City Change \u2014 hold expired; next city in 13\u201318s\u2026"),D();return}let w=Math.max(0,Ne()-h);y(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(w/1e3)}s`),D();return}let t=Date.now(),e=ie(new Date(t)),n=Ce(new Date(t));if(!e){y(`City Change \u2014 waiting for slot window (IST ${st()}, next in ${ui(n)})`),D();return}if(pe){let h=yt?t-yt:0;if(Di()){if(h>=bt()){tt(),Z(Date.now()),y(`City Change \u2014 still Loading after ${bt()/1e3}s; changing city\u2026`),D();return}let v=Math.max(0,Math.ceil((bt()-h)/1e3));y(`City Change \u2014 Date Loading\u2026 stay (${v}s then hop if still Loading)`),D();return}if(h>=Ut()){tt(),Z(Date.now()),y(`City Change \u2014 calendar up but no dates after ${Ut()/1e3}s; changing city\u2026`),D();return}let w=Math.max(0,Math.ceil((Ut()-h)/1e3));y(`City Change \u2014 waiting calendar dates\u2026 (${w}s then hop)`),D();return}let i=Kc(t);if(i>0){let h=Math.ceil(i/1e3);y(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,h)}s`),D();return}let o=await me();if(!o?.cities?.length){Re();return}let r=new Set(Gi().map(h=>h.id)),s=o.cities.filter(h=>r.has(String(h.id)));if(!s.length){y("Preferred cities not found in the dropdown \u2014 pick cities again."),Re();return}let l=document.querySelector("#post_select"),d=l?String(l.value):"",f=Gc(s,d);if(!f){Z(t),D();return}if(await Yc(f.id,f.name)){Ct=Date.now(),Z(Ct);let h=s.map(v=>v.name||v.id).join(" \u2192 "),w=`${qe+1}/${s.length}`;y(`City Change \u2014 ${w} ${f.name||f.id} (path: ${h}); Loading up to ${bt()/1e3}s, no-dates hop ${Ut()/1e3}s`)}else Z(t);D()}finally{ot=!1,vt=0}}}async function Rn(){if(H||_()||!_t())return;let t=await me();if(!t?.cities?.length)return;let e=new Set(Gi().map(s=>s.id)),n=t.cities.filter(s=>e.has(String(s.id)));if(!n.length){y("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}Nt(),tt(),P=!1,W=0,E=!1,ot=!1,vt=0,R=!0,Xt=Date.now(),j=Date.now();let i=document.querySelector("#post_select"),o=i?String(i.value):"",r=n.findIndex(s=>String(s.id)===o);qe=r>=0?r:0,y(`City Change ON \u2014 IST ${st()}; hop 13\u201318s; slot alerts force-switch preferred cities`),ba(),va(),D()}async function Ca(){if(H||_()||!Ri()||!c.alive||!(await me())?.cities?.length||!document.querySelector("#post_select"))return;if(!R){await Rn();return}let e=Pn();ba(),va(),(e||!xt&&!ot)&&(e&&(Z(Date.now()),y("City Change \u2014 auto-unstuck; next city in 13\u201318s\u2026")),D())}function ji(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function Dn(){let t=ji();return!!(t&&!t.disabled)}function Zc(t){if(!t||t.disabled)return!1;try{let e=t.form||t.closest?.("form");if(e&&typeof e.requestSubmit=="function")return e.requestSubmit(t),!0}catch{}try{return t.click(),!0}catch{}try{return t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click(),!0}catch{}return!1}function Yi(){let t=ji();if(!t||t.disabled)return!1;let e=Zc(t);return c.send({action:"forceClickSubmit",prefix:m,pollMs:X,maxMs:Math.min(1500,Oe)}),e}function tl(){return V()?Dn():!1}function Vi(t){let e=Date.now()+Math.max(0,Number(t)||0);return V()&&Dn()?Promise.resolve(!0):new Promise(n=>{let i=!1,o=null,r=null,s=d=>{if(!i){i=!0;try{r?.disconnect()}catch{}o&&c.clear(o),n(!!d)}},l=()=>{if(!c.alive||Ue()||_())return s(!1);if(V()&&Dn())return s(!0);if(Date.now()>=e)return s(V()&&Dn())};try{r=new MutationObserver(l);let d=ji();d&&r.observe(d,{attributes:!0,attributeFilter:["disabled","class","aria-disabled"]});let f=d?.form||d?.closest?.("form")||document.querySelector("#page_form, form");f?r.observe(f,{attributes:!0,attributeFilter:["disabled","class"],childList:!0,subtree:!0}):r.observe(document.documentElement,{attributes:!0,attributeFilter:["disabled"],childList:!0,subtree:!0})}catch{r=null}o=c.setInterval(l,X),l()})}function Ta(){y("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function Xi(t){if(H||_()||E)return;let e=await L(t);if(!Ot(e))return;$t(),E=!0,Ie();let n=Date.now(),i=!1,o=!1,r=async d=>{if(!(i||!E||!c.alive)){if(i=!0,window.removeEventListener("message",s),wt&&(c.clear(wt),wt=null),_()){E=!1;return}if(E=!1,d){await Ke(t);return}ut(),y(R?"Auto Submit \u2014 Submit not clicked in time; City Change resuming\u2026":"Auto Submit \u2014 Submit not clicked in time; still watching\u2026")}},s=d=>{!c.alive||d.source!==window||d.data?.action===Dt.sub&&r(!0)};window.addEventListener("message",s);let l=async()=>{if(i||!E||!c.alive||o)return;let d=Date.now()-n;if(tl()){o=!0,y("Submit enabled \u2014 clicking\u2026"),Yi();return}if(d>=Oe)return r(!1);y("Waiting for Submit to enable\u2026"),wt=c.setTimeout(l,X)};Vi(Oe).then(d=>{i||!E||!c.alive||o||d&&l()}),l()}async function _a(){if(!V()||E||H)return;let t=await at();t&&await Xi(t.accountId)}function y(t){let e=document.querySelector(p(a.aiStatus));e&&(e.textContent=t)}function I(t){y(t)}function ua(t){return!!(t&&t.termsAgreed)}function ka(t){return!!(t&&t.termsPassed)}function In(){return!!document.querySelector(p(a.aiTermsAgree))?.checked}function Qi(t){let e=document.querySelector(p(a.aiTermsGate)),n=document.querySelector(p(a.aiMain)),i=document.querySelector(p(a.aiTermsAgree)),o=document.querySelector(p(a.aiTermsContinue)),r=ka(t);e&&e.classList.toggle(u.hidden,r),n&&n.classList.toggle(u.hidden,!r),i&&(i.checked=ua(t)||In()),o&&(o.disabled=!(ua(t)||In()))}function el(){let t=document.querySelector(p(a.aiTermsContinue)),e=In();t&&(t.disabled=!e),y(e?"Terms checked \u2014 tap Continue.":"Check Agree to continue.")}async function nl(){if(!In()){y("Check Agree first.");return}let t=await q();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let e=await L(t)||{},{from:n,to:i}=je(),o=Yt(),r=On();kt(),Qt(),Ui(),it=!0,lt=!0,await Tt(t,{termsAgreed:!0,termsPassed:!0,termsAgreedAt:e.termsAgreedAt||Date.now(),submitEnabled:!0,citiesEnabled:!0,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],slotWindows:r.length?r:e.slotWindows||null,confirmedAt:Date.now()}),await et(),rt(document.querySelector(p(a.aiSubmitSw)),!0),rt(document.querySelector(p(a.aiCitiesSw)),!0),it=!0,lt=!0,Nn(await L(t)),He((e.cities||[]).map(l=>l.id),{force:!0}),Ji(e),Qi(await L(t)),(Yt().length?Yt():e.cities||[]).length&&(zi(),await Rn()),(n||e.from)&&(i||e.to)&&await qn(),y("Auto Submit and City Change ON \u2014 set dates and preferred cities.")}function $a(t){t?.slotWindows?.length?tr(t.slotWindows):li()}function il(t){let e="";for(let n=0;n<=59;n++){let i=Number(t)===n?" selected":"";e+=`<option value="${n}"${i}>:${String(n).padStart(2,"0")}</option>`}return e}function da(t,e){let n=Math.min(It,59-Number(t||0)),i="";for(let o=1;o<=Math.max(1,n);o++){let r=Number(e)===o?" selected":"";i+=`<option value="${o}"${r}>${o} min</option>`}return i}function Ma(t,e){let n=Number(t)||0,i=Number(e)||1,o=Math.min(59,n+i);return`Runs from :${String(n).padStart(2,"0")} up to :${String(o).padStart(2,"0")}`}function On(){let t=document.querySelector(p(a.aiWinList));if(!t)return[];let e=[];for(let n of t.querySelectorAll(`.${u.aiWinRow}`)){let i=Number(n.querySelector('select[data-win="from"]')?.value),o=Number(n.querySelector('select[data-win="dur"]')?.value);!Number.isFinite(i)||!Number.isFinite(o)||e.push({fromMin:i,durationMin:o})}return ci(e)}function fa(t){let e=t.querySelector('select[data-win="from"]'),n=t.querySelector('select[data-win="dur"]'),i=t.querySelector(`.${u.aiWinHelp}`);!e||!n||!i||(i.textContent=Ma(e.value,n.value))}function Aa(t=0,e=6){let n=Math.min(It,59-t),i=Math.min(Math.max(1,e||1),Math.max(1,n)),o=document.createElement("div");o.className=u.aiWinRow,o.innerHTML=`
    <div class="${u.aiInline}">
      <label class="${u.aiHead}">Start</label>
      <select data-win="from">${il(t)}</select>
      <label class="${u.aiHead}" style="margin-left:10px;color:#6b7280;font-weight:500">Duration</label>
      <select data-win="dur">${da(t,i)}</select>
      <button type="button" class="${u.aiTrash}" data-win="del" title="Delete timing" aria-label="Delete">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
        </svg>
      </button>
    </div>
    <div class="${u.aiWinHelp}">${Ma(t,i)}</div>
  `;let r=o.querySelector('select[data-win="from"]'),s=o.querySelector('select[data-win="dur"]');return c.on(r,"change",()=>{let l=Number(r.value),d=Number(s.value)||1;s.innerHTML=da(l,d),fa(o)}),c.on(s,"change",()=>fa(o)),c.on(o.querySelector('button[data-win="del"]'),"click",()=>{o.remove(),Zi()}),o}function Ji(t){let e=document.querySelector(p(a.aiWinList));if(!e)return;e.replaceChildren();let n=t?.slotWindows?.length?er(t.slotWindows):[];for(let i of n.slice(0,gt))e.appendChild(Aa(i.fromMin,i.durationMin));Zi(t)}function Zi(t){let e=document.querySelector(p(a.aiWinNote));e&&(t?.slotWindows?.length||On().length?e.textContent=`Custom windows active (max ${gt}, each \u2264 ${It} min).`:e.textContent=`Using defaults: ${st()}. Add up to ${gt} windows below.`)}function rt(t,e){t&&(t.classList.toggle(u.aiOnBtn,!!e),t.setAttribute("aria-checked",e?"true":"false"))}function ol(t){rt(document.querySelector(p(a.aiSubmitSw)),Ot(t)),rt(document.querySelector(p(a.aiCitiesSw)),Rt(t))}var it=!1,lt=!1;function Nn(t){let e=Ot(t)||it,n=Rt(t)||lt,i=document.querySelector(p(a.aiSubmitBody)),o=document.querySelector(p(a.aiCitiesBody));i&&i.classList.toggle(u.hidden,!e),o&&o.classList.toggle(u.hidden,!n)}function rl(t,e){let n=document.querySelector(p(a.aiStatus)),i=document.querySelector(p(a.aiBtn));if(!n||!i)return;ol(t),Nn(t);let o=Ot(t),r=Rt(t),s=o||r;s?(i.classList.add(u.aiOn),i.textContent="Tik Tik ON"):(i.classList.remove(u.aiOn),i.textContent="Tik Tik");let l=[];o&&t.from&&t.to?l.push(`Auto Submit ON (${Vt(t.from)} \u2013 ${Vt(t.to)}, clicks Submit as soon as time slot is ready)`):it&&!o?l.push("Auto Submit \u2014 set From / To dates, then Enable again"):l.push("Auto Submit OFF"),r?l.push(`City Change ON (${zc(t)}, ${st()})`):lt&&!r?l.push("City Change \u2014 pick preferred cities, then Enable again"):l.push("City Change OFF"),n.textContent=`Account ${e||"\u2014"}: ${l.join(" \xB7 ")}`,n.classList.toggle(u.aiOk,s)}async function et(){let t=await q();if(t)try{await xa(t)}catch{}let e=t?await L(t):null;Ot(e)||(it=!1),Rt(e)||(lt=!1),$a(e),rl(e,t),Qi(e);let n=document.querySelector(p(a.aiFrom)),i=document.querySelector(p(a.aiTo));n&&(n.value=e?.from||""),i&&(i.value=e?.to||""),Oi();let o=(e?.cities||[]).map(S=>S.id),r=document.querySelector(p(a.aiPanel)),s=r&&!r.classList.contains(u.hidden),l=document.querySelector(p(a.aiCitiesBody)),d=l&&!l.classList.contains(u.hidden),f=ga();(d||Rt(e)||lt)&&He(s&&f.length?f:o),Ji(e);let g=document.querySelector(p(a.aiLogin)),h=document.querySelector(p(a.aiPass));g&&e?.loginId&&(g.value=e.loginId),h&&e?.loginPass&&(h.value=e.loginPass);let w=e?.security||[],v=[a.aiQ1,a.aiQ2,a.aiQ3],K=[a.aiA1,a.aiA2,a.aiA3];v.forEach((S,O)=>{let ht=document.querySelector(p(S));ht&&(ht.innerHTML=Mn(O,w[O]?.q||""))}),K.forEach((S,O)=>{let ht=document.querySelector(p(S));ht&&w[O]?.a&&(ht.value=w[O].a)});let $=document.querySelector(p(a.aiLoginBody)),z=$&&!$.classList.contains(u.hidden);to(!!z,pl(e))}function al(){let t=document.querySelector(p(a.aiPanel));return!!(t&&!t.classList.contains(u.hidden))}function Ii(t){let e=document.querySelector(p(a.aiPanel));e&&(t||qt(),e.classList.toggle(u.hidden,!t),t&&q().then(async n=>{if(n)try{Ei=null,await xa(n)}catch{}let i=n?await L(n):null;Qi(i),ka(i)?He((i?.cities||[]).map(o=>o.id),{force:!0}):y("Read the terms, check Agree, then Continue.")}))}function Li(){if(Li._done)return;Li._done=!0;let t=e=>{if(!al())return;let n=document.querySelector(p(a.aiPanel)),i=document.querySelector(p(a.aiBtn)),o=document.querySelector(p(a.aiCal)),r=Ni(e);if(!(o&&!o.classList.contains(u.hidden)&&r&&o.contains(r))){if(o&&!o.classList.contains(u.hidden)){let s=document.querySelector(p(a.aiFromBtn)),l=document.querySelector(p(a.aiToBtn));!(s&&r&&(s===r||s.contains(r)))&&!(l&&r&&(l===r||l.contains(r)))&&qt()}n&&r&&(n===r||n.contains(r))||i&&r&&(i===r||i.contains(r))||(qt(),Ii(!1))}};c.on(document,"pointerdown",t,{capture:!0})}async function sl(t){let e=await q();if(!e){y("Open a logged-in schedule page so we can bind this to your account.");return}let n=await L(e)||{},{from:i,to:o}=je();if(i=i||n.from||null,o=o||n.to||null,t){it=!0,rt(document.querySelector(p(a.aiSubmitSw)),!0),kt(),Qt(),Ui(),await Tt(e,{submitEnabled:!0,from:i||null,to:o||null,confirmedAt:Date.now()});let r=document.querySelector(p(a.aiFrom)),s=document.querySelector(p(a.aiTo));if(r&&i&&(r.value=i),s&&o&&(s.value=o),Oi(),await et(),rt(document.querySelector(p(a.aiSubmitSw)),!0),it=!0,Nn(await L(e)),!i||!o){y("Auto Submit ON \u2014 select From and To dates to start booking.");return}if(i>o){y("Auto Submit ON \u2014 From date must be before To date.");return}it=!1,y(`Auto Submit ON (${Vt(i)} \u2013 ${Vt(o)})`),await qn();return}it=!1,Qt(),rt(document.querySelector(p(a.aiSubmitSw)),!1),await Tt(e,{submitEnabled:!1,from:i||n.from,to:o||n.to}),await et(),y("Auto Submit OFF")}async function cl(t){let e=await q();if(!e){y("Open a logged-in schedule page so we can bind this to your account.");return}let n=await L(e)||{};if(t){lt=!0,rt(document.querySelector(p(a.aiCitiesSw)),!0),He((n.cities||[]).map(s=>s.id),{force:!0}),Ji(n);let o=Yt();!o.length&&n.cities?.length&&(o=n.cities);let r=On();if(kt(),await Tt(e,{citiesEnabled:!0,cities:o.length?o:n.cities||[],slotWindows:r.length?r:n.slotWindows||null}),await et(),rt(document.querySelector(p(a.aiCitiesSw)),!0),lt=!0,Nn(await L(e)),o.length||He([],{force:!0}),!o.length){y("City Change ON \u2014 select at least one preferred city to start hopping.");return}lt=!1,zi(),await Rn(),y(`City Change ON (${o.map(s=>s.name||s.id).join(", ")})`);return}lt=!1,Re(),rt(document.querySelector(p(a.aiCitiesSw)),!1);let i=Yt();await Tt(e,{citiesEnabled:!1,cities:i.length?i:n.cities||[]}),await et(),y("City Change OFF")}async function ma(){let t=await q();if(!t)return;let e=await L(t)||{};if(!Ot(e)&&!it)return;let{from:n,to:i}=je();!n||!i||n>i||(await Tt(t,{submitEnabled:!0,from:n,to:i,confirmedAt:Date.now()}),it=!1,await et(),rt(document.querySelector(p(a.aiSubmitSw)),!0),kt(),Ui(),y(`Auto Submit ON (${Vt(n)} \u2013 ${Vt(i)})`),await qn())}function ll(t){return(t||[]).map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", ")}async function ul(){let t=document.querySelector(p(a.aiWinList));if(t){if(t.querySelectorAll(`.${u.aiWinRow}`).length>=gt){y(`Max ${gt} timing windows.`);return}t.appendChild(Aa(0,Math.min(6,It))),Zi()}}async function dl(){let t=await q();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let e=On();if(!e.length){y("Add at least one timing (or Reset to defaults).");return}await Tt(t,{slotWindows:e}),await et(),y(`Saved ${e.length} custom timing(s): ${ll(e)}`)}async function fl(){let t=await q();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}window.confirm("Reset to default IST windows? Your custom timings will be removed.")&&(await Tt(t,{slotWindows:null}),li(),await et(),y(`Using default windows: ${st()}`))}async function ml(){let t=await q();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let{from:e,to:n}=je(),i=Yt(),o=document.querySelector(p(a.aiLogin))?.value?.trim(),r=document.querySelector(p(a.aiPass))?.value,s=[0,1,2].map(l=>({q:document.querySelector(p([a.aiQ1,a.aiQ2,a.aiQ3][l]))?.value?.trim()||"",a:document.querySelector(p([a.aiA1,a.aiA2,a.aiA3][l]))?.value?.trim()||""}));if(!o||!r){y("Enter ID and password before saving.");return}if(s.some(l=>!l.q||!l.a)){y("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}await Tt(t,{}),to(!0,!0),y("Saved ID, password, and 3 security questions (1 from each set).")}function pl(t){let e=t?.security||[];return!!(t?.loginId&&t?.loginPass&&e.length>=3&&e.every(n=>n?.q&&n?.a))}function to(t,e){let n=document.querySelector(p(a.aiLoginToggle));if(!n)return;let i=t?"\u25BE":"\u25B8";n.textContent=e?`Login details (saved) ${i}`:`Login details ${i}`}function hl(){let t=document.querySelector(p(a.aiLoginBody)),e=document.querySelector(p(a.aiLoginToggle));if(!t||!e)return;let n=t.classList.contains(u.hidden);t.classList.toggle(u.hidden,!n);let i=/saved/i.test(e.textContent||"");to(n,i)}function eo(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==a.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==a.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===a.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function Pi(){document.querySelector(p(a.aiPanel))?.remove(),document.querySelector(p(a.aiBtn))?.remove(),eo()}function gl(){if(_())return;if(!Ri()){Pi();return}if(document.querySelector(p(a.aiBtn)))if(!document.querySelector(p(a.aiSubmitSw))||!document.querySelector(p(a.aiTermsContinue))||!document.querySelector(p(a.aiFromBtn)))Pi();else return;let t=lr();if(!t)return;let e=document.createElement("button");e.id=a.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[k.mark]="",c.on(e,"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiPanel)),r=o&&o.classList.contains(u.hidden);Ii(!!r)}),t.appendChild(e);let n=document.createElement("div");n.id=a.aiPanel,n.className=u.hidden,n.dataset[k.mark]="",n.innerHTML=`
    <div id="${a.aiTermsGate}">
      <div id="${a.aiTerms}" class="${u.aiTerms}">
        <div class="${u.aiHead}">Terms &amp; Conditions</div>
        <div class="${u.aiHint}">Please read carefully before continuing.</div>
        <ul class="${u.aiTermsList}">
          <li>Options apply to this applicant only. They do not bypass CAPTCHAs, waiting rooms, or portal security.</li>
          <li>During your windows, City Change hops every 13\u201318s. Max ${gt} windows, each up to ${It} minutes.</li>
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
  `,t.insertAdjacentElement("afterend",n),c.on(n.querySelector(p(a.aiSubmitSw)),"click",async()=>{let i=await q(),o=i?await L(i):null;await sl(!Ot(o))}),c.on(n.querySelector(p(a.aiCitiesSw)),"click",async()=>{let i=await q(),o=i?await L(i):null;await cl(!Rt(o))}),c.on(n.querySelector(p(a.aiWinAdd)),"click",ul),c.on(n.querySelector(p(a.aiWinSave)),"click",dl),c.on(n.querySelector(p(a.aiWinReset)),"click",fl),c.on(n.querySelector(p(a.aiSaveLogin)),"click",ml),c.on(n.querySelector(p(a.aiLoginToggle)),"click",hl),c.on(n.querySelector(p(a.aiClose)),"click",()=>Ii(!1)),c.on(n.querySelector(p(a.aiCitiesAll)),"click",()=>sa(!0)),c.on(n.querySelector(p(a.aiCitiesNone)),"click",()=>sa(!1)),c.on(n.querySelector(p(a.aiTermsAgree)),"change",()=>{el()}),c.on(n.querySelector(p(a.aiTermsContinue)),"click",()=>{nl()}),c.on(n.querySelector(p(a.aiFromBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiCal));if(o&&!o.classList.contains(u.hidden)&&Q.which==="from"){qt();return}ea("from",i.currentTarget)}),c.on(n.querySelector(p(a.aiToBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiCal));if(o&&!o.classList.contains(u.hidden)&&Q.which==="to"){qt();return}ea("to",i.currentTarget)}),Li(),et()}function yl(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",c.on(e,"click",()=>{q().then(n=>{Ke(n||null)})}))};t(document.querySelector("#submitbtn")),c.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function no(){if(c.alive&&!_()){if(!Ri()){Pi();return}await c.waitFor("#post_select",{attempts:on})&&(Br(t=>{let e=String(t?.message||t?.source||"error").slice(0,120);We(e)}),gl(),zi(),yl(),!aa&&(aa=!0,c.setTimeout(()=>et(),800),c.setTimeout(async()=>{await at()&&await qn()},1500)))}}var Da=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function Ea(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function bl(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=Ea(t.data.url),i=new URLSearchParams(t.data.request||"").get("parameters");if(!i)return null;let o;try{o=JSON.parse(i)}catch{return null}return{params:o,tail:e,response:t.data.response}}async function wl(t,e={}){t?.length&&(await $r(t,e),await x("audioAlert")&&pr())}async function Sl(t,e=!1){if(e||_())return null;let n=new Date;n.setHours(0,0,0,0);let i=(t||[]).map(s=>{if(!s)return null;let l=Hn(s.Date);return l?{...s,Date:l}:null}).filter(Boolean).filter(s=>{let[l,d,f]=s.Date.slice(0,10).split("-").map(Number);return!l||!d||!f?!1:new Date(l,d-1,f)>=n}).sort((s,l)=>String(s.Date).localeCompare(String(l.Date))),o=await at();if(o){let s=i.filter(d=>ze(d.Date,o.from,o.to));if(!s.length)return null;let l=Fe(s.length);return s[l]?.Date||null}if(!await x("autoSelectFirstDate")||!i.length)return null;let r=Fe(i.length);return i[r]?.Date||null}function Hn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,r,s]=n;return`${s}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime())){let r=o.getFullYear(),s=String(o.getMonth()+1).padStart(2,"0"),l=String(o.getDate()).padStart(2,"0");return`${r}-${s}-${l}`}}return null}function xl(t){if(!t)return!1;let[e,n,i]=t.slice(0,10).split("-").map(Number);if(!e||!n||!i)return!1;let o=n-1,r=String(n).padStart(2,"0")+"/"+String(i).padStart(2,"0")+"/"+e,s=document.querySelector("#datepicker");if(s){let l=String(s.value||"").trim();if(l===r)return!0;if(l.includes(String(e))&&l.includes(String(i).padStart(2,"0"))){let d=l.split(/[/-]/).map(f=>parseInt(f,10));if(d.length>=3){let f,g,h;if(d[2]>31?(g=d[0],h=d[1],f=d[2]):(f=d[0],g=d[1],h=d[2]),f===e&&g===n&&h===i)return!0}}try{let d=window.jQuery||window.$;if(d&&d(s).hasClass("hasDatepicker")){let f=d(s).datepicker("getDate");if(f&&f.getFullYear()===e&&f.getMonth()===o&&f.getDate()===i)return!0}}catch{}}for(let l of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let d=l.querySelector("a");if(!d)continue;let f=parseInt(l.getAttribute("data-month"),10),g=parseInt(l.getAttribute("data-year"),10),h=parseInt(d.textContent,10);if(g===e&&f===o&&h===i)return!0}return!1}var Wn=null;function vl(t,e){Wn&&c.clear(Wn);let n=Date.now()+(e?Be:8e3),i=()=>{!c.alive||Date.now()>n||xl(t)||(c.send({action:"selectFirstDate",date:t,maxMs:e?Be:8e3,pollMs:X}),Wn=c.setTimeout(i,X))};Wn=c.setTimeout(i,80)}function Ia(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Cl(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function La(t){return t?.length?t.map((e,n)=>({entry:e,index:n,avail:Cl(e)})).sort((e,n)=>n.avail!==e.avail?n.avail-e.avail:e.index-n.index):[]}function Tl(t){let e=La(t);return e.length?{entry:e[0].entry,slotIndex:e[0].index}:{entry:null,slotIndex:0}}function Pa(){Jt&&(c.clear(Jt),Jt=null)}var qa=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),Ra=null,_l=null,Jt=null;function kl(t,e){Ra=t,_l=e?String(e).slice(0,10):null}function $l(t,e=0){Jt&&c.clear(Jt);let n=t?String(t).slice(0,10):null,i=0,o=async()=>{if(!c.alive||Ue()||++i>240||V())return;let r=(Ra||[]).filter(s=>s&&s.Time);if(r.length){let{entry:s,slotIndex:l}=Tl(r);if(I(`Watchdog: picking time slot #${l+1}\u2026`),await De({time:Ia(s.Time),date:s.Date?String(s.Date).slice(0,10):n,slotIndex:l,pollMs:X,maxMs:600,prefix:m}),V())return}else if(document.querySelector(qa)&&(I("Watchdog: picking visible time slot\u2026"),await De({time:"00:00",date:n,slotIndex:e,pollMs:X,maxMs:600,prefix:m}),V()))return;Jt=c.setTimeout(o,X)};Jt=c.setTimeout(o,300)}var Ml=["#datepicker.hasDatepicker","#datepicker"].join(", ");async function Al(t,e=!1){if(e)return null;let n=await Sl(t,e);if(!n)return null;let i=await at(),o=new Date;o.setHours(0,0,0,0);let r=(t||[]).map(d=>Hn(d?.Date)).filter(Boolean).filter(d=>{let[f,g,h]=d.slice(0,10).split("-").map(Number);return new Date(f,g-1,h)>=o}).sort((d,f)=>d.localeCompare(f)),s=i?r.filter(d=>ze(d,i.from,i.to)):r,l=Fe(s.length);return I(`Selecting date #${l+1}: ${n} (fast)\u2026`),await c.waitFor(Ml,{attempts:80,interval:X}),c.send({action:"selectFirstDate",date:n,maxMs:i?Be:8e3,pollMs:X}),vl(n,i),$l(n,Ln),n}async function Dl(t,e=!1){if(e||_()||Ue())return;let n=await at();if(!n&&!await x("autoSelectFirstDate"))return;Pa();let i=(t||[]).filter(l=>!(!l||!l.Time||l.EntriesAvailable!=null&&Number(l.EntriesAvailable)<=0));n&&(i=i.filter(l=>{let d=l.Date?String(l.Date).slice(0,10):null;return d?d>=n.from&&d<=n.to:!0}));let o=La(i);if(!o.length)return;let r=Date.now()+1e4;for(;Date.now()<r&&c.alive&&!(Rr(i)||document.querySelector(qa));)await new Promise(l=>c.setTimeout(l,X));let s=o.length===1?Oe:pa;I(o.length===1?`1 time slot \u2014 try highest avail, wait \u2264${s/1e3}s for Submit\u2026`:`${o.length} time slots \u2014 try highest\u21922nd\u21923rd\u2026 (${s/1e3}s each for Submit)`);for(let l=0;l<o.length;l++){if(!c.alive||Ue()||_())return;let{entry:d,index:f,avail:g}=o[l],h=Ia(d.Time),w=d.Date?String(d.Date).slice(0,10):null,v=l===0?"highest":l===1?"2nd-highest":l===2?"3rd-highest":`${l+1}th-highest`;if(I(`Trying ${v} avail (${g}) @ ${h} \u2014 slot ${l+1}/${o.length}\u2026`),!await De({time:h,date:w,slotIndex:f,pollMs:X,maxMs:4e3,prefix:m})&&!V()){I(`Could not click ${h} \u2014 trying next\u2026`);continue}if(I(`Selected ${h} (${v}) \u2014 waiting \u2264${s/1e3}s for Submit to enable\u2026`),await Vi(s)){I(`Submit enabled on ${h} \u2014 clicking\u2026`),n?await Xi(n.accountId):Yi();return}l<o.length-1&&I(`Submit still disabled on ${h} \u2014 trying next (${l+2}/${o.length})\u2026`)}I(`Tried all ${o.length} time slot(s); Submit never enabled.`),n&&ut()}async function Oa(t){if(!N()||_())return;let e;try{e=bl(t)}catch{return}if(e==null)return;if(Fr(e),e.retryAfter!==void 0){let r=Number(e.retryAfter);zo(e.cgiBlock,r),r?(pn(r),Fi(r)):x("defaultWaitTime").then(s=>{pn(s),Fi(s)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let r=e.response.Posts||[],s=new Map((await At()).map(l=>[l.ID,l]));for(let l of r)s.set(l.ID,{...s.get(l.ID),...l});await ee([...s.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let r=e.response.Members||[];if(r.length){let s=await G()||{},l=s.name&&r.find(d=>d.FullName===s.name);s.visa=(l||r[0]).VisaClassName,await T({profile:s,members:r})}}if(Da.includes(e.tail)){kt(),br(e);let r=(e.response.ScheduleDays||[]).map(h=>Hn(h?.Date)).filter(Boolean).length;r&&I(`${r} date${r===1?"":"s"} available \u2014 see list below`),Sa();let s=await at();await me()||x("defaultWaitTime").then(h=>{pn(h)});let d=await At(),f=d.find(h=>h.ID===e.params.postId);if(f&&(f.Days=e.response.ScheduleDays,f.Updated=Date.now(),f.HasError=e.response.HasError,f.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,ee(d)),await wl(e.response.ScheduleDays,{postId:e.params.postId,postName:f?.Name,hasError:e.response.HasError}),!e.response.HasError&&r>0){let h=String(e.params.postId||"");I(`${r} date${r===1?"":"s"} \u2014 alerting others with this city\u2026`),zr({postId:h,postName:f?.Name,dayCount:r}).catch(()=>{})}await Mr(e.response.ScheduleDays,{postId:e.params.postId,postName:f?.Name,hasError:e.response.HasError}),Ge()?($t(),I("Submit pending \u2014 staying on this city (date reload ignored)\u2026")):s&&!e.response.HasError?Hi(e.response.ScheduleDays,s.from,s.to).length?$t():ut():s&&ut();let g=Ge()?null:await Al(e.response.ScheduleDays,e.response.HasError);if(g)$t(),await Ar(f?.Name,g);else if(s&&!e.response.HasError&&!Ge()){let h=(e.response.ScheduleDays||[]).map(v=>Hn(v?.Date)).filter(Boolean),w=h.filter(v=>ze(v,s.from,s.to));h.length&&!w.length?(ut(),I(`Dates found but none in ${s.from} \u2192 ${s.to}. Next city in 13\u201318s\u2026`)):h.length||(ut(),I("No dates on this city \u2014 next city in 13\u201318s\u2026"))}await oi()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let r=e.params.Date.split("T")[0];kl(e.response.ScheduleEntries,r),Pa();let s=await At(),l=s.filter(f=>f.Days&&f.Updated).sort((f,g)=>g.Updated-f.Updated).find(f=>f.Days.some(g=>g.Date===r));if(l){let f=l.Days.find(g=>g.Date===r);f&&(f.Times=e.response.ScheduleEntries,ee(s))}let d=(e.response.ScheduleEntries||[]).filter(f=>f&&f.Time);if(wr(d,r,l?.Name),d.length){let f=d.filter(w=>w.EntriesAvailable==null||Number(w.EntriesAvailable)>0),g=f.reduce((w,v)=>{let K=Number(v.EntriesAvailable);return w+(Number.isFinite(K)?K:0)},0),h=g>0?` \xB7 ${g} available`:"";I(`${f.length||d.length} time slot${(f.length||d.length)===1?"":"s"} on ${r}${h}`)}await Dl(e.response.ScheduleEntries,e.response.HasError),Ge()?($t(),I("Submit pending \u2014 staying on this city (time reload ignored)\u2026")):d.length?($t(),await Dr(l?.Name,e.params.Date,d.length)):(ut(),I("No time slots on this date \u2014 next city in 13\u201318s\u2026")),await oi()}}function Na(t){if(!N()||_())return;let e=Ea(t.data.url);Da.includes(e)&&dr()}var Zt=null,oo="",io={scanning:"Scanning for Cloudflare challenge\u2026",dom:"Trying page-level verify click\u2026",debugger:"Advanced click \u2014 targeting Turnstile iframe\u2026",retry:"Waiting before next attempt\u2026",success:"Verification passed \u2014 continuing\u2026",manual:"Stuck? Click the checkbox once, then we\u2019ll continue."};function Wa(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=u.cfFlash,n.dataset[k.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),c.setTimeout(()=>n.remove(),1200)}}function El(){let t=document.querySelector(p(a.cfHud));return t||(t=document.createElement("div"),t.id=a.cfHud,t.dataset[k.mark]="",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.innerHTML=`
    <div class="${u.cfHud}">
      <div class="${u.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">\u{1F6E1}</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${io.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `,document.documentElement.appendChild(t),t)}async function B(t,e){if(!chrome.runtime?.id||!c.alive||!await x("autoCloudflareTick"))return;let n=El(),i=n.querySelector("[data-cf-msg]"),o=n.querySelector("[data-cf-sub]"),r=n.querySelector("[data-cf-chip]"),s=n.querySelector(`.${u.cfHud}`);oo=t,i&&(i.textContent=io[t]||io.scanning),o&&(o.textContent=e||Il(t)),r&&(r.textContent=t==="success"?"Done":t==="manual"?"Help":"Active",r.dataset.state=t),s&&(s.dataset.state=t),Zt&&(c.clear(Zt),Zt=null),t==="success"&&(Zt=c.setTimeout(()=>ro(),2800))}function Il(t){return t==="debugger"?"Precision click via advanced browser bridge":t==="dom"?"Standard page interaction":t==="manual"?"One manual click is usually enough":t==="success"?"Resuming login and recovery":"Monitoring this tab for Turnstile"}function ro(){let t=document.querySelector(p(a.cfHud));t&&t.remove(),oo="",Zt&&(c.clear(Zt),Zt=null)}function ao(){return oo}var Ll=/we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i,Pl=/\bUSG\s+[a-f0-9-]{8,}/i;var co="vsPortalErrorReloadCount",Fa="vsPortalErrorReloadAt",ql=2e3,Rl=1e4,Ha=!1,he=null,Ol=null;function Nl(){return(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim()}function ge(){let t=Nl().slice(0,6e3);return t?!!(/a timeout occurred/i.test(t)&&(/error\s*524/i.test(t)||/origin web server timed out/i.test(t)||/cloudflare ray id/i.test(t))||/error\s*524/i.test(t)&&/cloudflare/i.test(t)&&t.length<8e3||Ll.test(t)&&(Pl.test(t)||/error id\s*#/i.test(t))||/we'?re sorry,\s*but something went wrong/i.test(t)&&t.length<2500):!1}function Ua(){try{return Math.max(0,Number(sessionStorage.getItem(co)||0))}catch{return 0}}function Wl(){try{let t=Ua()+1;return sessionStorage.setItem(co,String(t)),sessionStorage.setItem(Fa,String(Date.now())),t}catch{return 1}}function so(){try{sessionStorage.removeItem(co),sessionStorage.removeItem(Fa)}catch{}}function Hl(t){return Math.min(Rl,ql+Math.max(0,t-1)*1e3)}function Bl(){he&&(c.clear(he),he=null)}function Fl(){Wl();try{location.reload()}catch{}}function Ba(){if(!c.alive||he)return;if(!ge()){so();return}let t=Ua()+1,e=Hl(t);he=c.setTimeout(()=>{if(he=null,!!c.alive){if(!ge()){so();return}Fl()}},e)}function Ka(){if(Ha)return;Ha=!0;let t=()=>{c.alive&&(ge()?Ba():(so(),Bl()))};t(),Ol=c.setInterval(t,1500);try{let e=new MutationObserver(()=>{c.alive&&ge()&&Ba()});e.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),c.disposable(()=>e.disconnect())}catch{}}var Bn="vsDebugLogs",Ul=200;function Kl(){try{return new Date().toLocaleTimeString("en-IN",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})}catch{return new Date().toISOString().slice(11,19)}}async function F(t,e,n){let i={at:Date.now(),t:Kl(),tag:String(t||"app").slice(0,24),msg:String(e||"").slice(0,400)};if(n!=null)try{i.data=JSON.parse(JSON.stringify(n))}catch{i.data=String(n).slice(0,200)}try{console.log(`[VS6 ${i.tag}] ${i.msg}`,n!==void 0?n:"")}catch{}try{let o=await C({[Bn]:[]}),r=Array.isArray(o[Bn])?o[Bn].slice():[];for(r.push(i);r.length>Ul;)r.shift();await T({[Bn]:r})}catch{}}var Un=null,Ve=0,Ye=null,Mt=0;async function Gl(){try{let e=(await C("humanClickProfile")).humanClickProfile,n=e?.liveTrained&&e.samples?.length||0;return n<5?15e3:n<20?1e4:n<50?6e3:3500}catch{return 12e3}}var uo=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function J(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!U()&&!ao()}function U(){if(ge()||document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return uo.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:lo().length>0}function Fn(t){return new Promise(e=>setTimeout(e,t))}function zl(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let i of n.querySelectorAll("*"))i.shadowRoot&&(t.push(i.shadowRoot),e.push(i.shadowRoot))}return t}function lo(){let t=[],e=new Set,n=i=>{if(!i||e.has(i))return;let o=i.getBoundingClientRect();if(o.width<40||o.height<20||o.width>900||o.height>400)return;let r=(i.src||i.getAttribute?.("src")||"").toLowerCase(),s=(i.title||i.getAttribute?.("title")||"").toLowerCase(),l=(i.className?.toString?.()||"").toLowerCase(),d=(i.id||"").toLowerCase(),f=i.tagName==="IFRAME"&&(r.includes("challenges.cloudflare")||r.includes("turnstile")||s.includes("cloudflare")||s.includes("security challenge")),g=l.includes("cf-turnstile")||l.includes("turnstile")||d.includes("turnstile")||d.includes("challenge")||i.hasAttribute?.("data-sitekey")||i.hasAttribute?.("data-turnstile-widget");if(!f&&!g)if(i.tagName==="IFRAME"&&o.width>=120&&o.width<=420&&o.height>=45&&o.height<=120){if(!uo.test(document.body?.innerText||""))return}else return;e.add(i),t.push({el:i,rect:o})};for(let i of zl()){for(let o of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let r of i.querySelectorAll(o))n(r);for(let o of i.querySelectorAll("iframe"))n(o)}return t}function jl(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function Yl(t){let e=[],n=new Set,i=(o,r)=>{if(!Number.isFinite(o)||!Number.isFinite(r)||o<1||r<1||o>window.innerWidth-1||r>window.innerHeight-1)return;let s=`${Math.round(o)},${Math.round(r)}`;n.has(s)||(n.add(s),e.push({x:Math.round(o),y:Math.round(r)}))};for(let{rect:o}of t){let r=o.top+o.height/2,s=o.left+Math.min(28,Math.max(18,o.width*.11));for(let l of[0,-4,4,-8,8,12,16,20,24,28,32])for(let d of[0,-3,3,-6,6])i(s+l,r+d);i(o.left+o.width*.5,r)}return e}function Vl(t){for(let{el:e,rect:n}of t)try{e.click();let i=n.left+Math.min(26,n.width*.12),o=n.top+n.height/2,r=document.elementFromPoint(i,o)||e;for(let s of["pointerdown","mousedown","mouseup","pointerup","click"])r.dispatchEvent(new MouseEvent(s,{bubbles:!0,cancelable:!0,clientX:i,clientY:o,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let i=n.getBoundingClientRect();if(i.width<4&&i.height<4)continue;let o=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!o.includes("human")&&!o.includes("verify")&&e==="input[type='checkbox']"){let r=n.closest("label, div, form");if(!uo.test(r?.textContent||""))continue}return n.click(),!0}return!1}async function Ga(t){t.length&&(Wa(t.slice(0,3)),c.send({action:"viewportClickPoints",points:t}),await x("cloudflareDebuggerClick")?(await B("debugger","Trained click on Verify you are human\u2026"),c.send({action:"cloudflareDebuggerClick",points:t,primaryOnly:!0})):await B("dom"))}async function Kn(){if(!await x("autoCloudflareTick"))return!1;if(J())return Mt&&F("cf","challenge already solved"),Mt=0,await B("success"),!0;Mt||(Mt=Date.now(),F("cf","challenge seen \u2014 train window started"));let t=await Gl();if(Date.now()-Mt<t)return await B("scanning","Train window \u2014 click Verify you are human yourself (recording your mouse)\u2026"),!1;F("cf","train window done \u2014 attempting auto click"),await B("scanning","Verify you are human page \u2014 preparing click\u2026");let e=lo();jl(e),await Fn(350),e=lo();let n=Yl(e);return n.length&&(await Ga(n),await Fn(1200),J()||!U())?(Mt=0,await B("success"),!0):(await B("dom"),Vl(e),await Fn(600),J()||!U()?(Mt=0,await B("success"),!0):n.length&&(await Ga(n),await Fn(1e3),J()||!U())?(Mt=0,await B("success"),!0):(Ve++,Ve>=8?await B("manual","Click the checkbox once \u2014 we will continue after."):await B("retry",`Retry ${Ve}/8\u2026`),!1))}function Xl(){Ye||(Ye=new MutationObserver(()=>{c.alive&&U()&&!J()&&Kn()}),Ye.observe(document.documentElement,{childList:!0,subtree:!0}),c.disposable(()=>{Ye?.disconnect(),Ye=null}))}function fo(){Un&&(c.clear(Un),Un=null),Ve=0,Mt=0,ro()}async function mo(){if(fo(),!await x("autoCloudflareTick"))return;Xl();let t=async()=>{if(c.alive&&await x("autoCloudflareTick")){if(U()&&!J()){await Kn();return}ao()&&(Ve=0,await B("success"))}};t(),Un=c.setInterval(t,1800)}var ye="sessionRecovery",po="homeKeepaliveAt",ho="homeLoadingStuckAt",bo="vsResubmitContinue",za=2e3,zn=!1,ja=null,go=null,yo=null,Gn=null,Xe=0;function xo(){try{let t=new URL(location.href);return t.searchParams.set("_vsr",String(Date.now()%1e12)),location.replace(t.pathname+t.search+t.hash),!0}catch{try{return location.href=location.pathname+location.search,!0}catch{return!1}}}function Ja(){try{if(sessionStorage.getItem(bo)!=="1")return!1;sessionStorage.removeItem(bo)}catch{return!1}return ft()||document.querySelector("#post_select")?!1:(xo(),!0)}function Ya(){return b.homeKeepaliveMinMs}function Ql(){return b.homeKeepaliveMaxMs}function Jl(){return b.homeKeepaliveDebounceMs}function Va(){return b.loadingStuckMs}function Zl(){return b.loadingStuckDebounceMs}function Xa(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function tu(t,e){let n=Xa(t);if(!n)return"";let i="",o=0;for(let r of e||[]){let s=Xa(r.q);if(!s||!r.a)continue;if(n.includes(s)||s.includes(n))return r.a;let l=s.split(" ").filter(g=>g.length>3),d=0;for(let g of l)n.includes(g)&&d++;let f=l.length?d/l.length:0;f>o&&f>=.5&&(o=f,i=r.a)}return i}async function eu(){let t=await C([Pt,"profile"]),e=t[Pt]||{},n=t.profile?.id?String(t.profile.id):null,i=n?e[n]:null;return i||(i=Object.values(e).find(o=>o?.loginId&&o?.loginPass)||null),i||{}}function Qa(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,i=Object.getOwnPropertyDescriptor(n,"value")?.set;i?i.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function Wt(t){return new Promise(e=>setTimeout(e,t))}function dt(t,e){return t+Math.random()*(e-t)}async function wo(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await Wt(dt(250,600)),Qa(t,"");let i="";for(let o=0;o<n.length;o++){let r=n[o];i+=r,Qa(t,i),t.dispatchEvent(new KeyboardEvent("keydown",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:r,bubbles:!0}));let s=dt(90,220);/[\s@._]/.test(r)&&(s+=dt(120,320)),Math.random()<.08&&(s+=dt(200,450)),await Wt(s)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await Wt(dt(200,500))}var jn=!1,Yn=!1;function Vn(t){return!t||t.disabled?!1:(t.click(),!0)}function nu(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let i of t){let o=(i.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(o))continue;let r=i.querySelector("input[type='checkbox']")||document.getElementById(i.getAttribute("for")||"");r&&!r.checked&&(Vn(r),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(i=>/^(continue|ok|accept|agree)$/i.test((i.textContent||i.value||"").trim()));return e&&n&&Vn(n),e>0}function Za(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function iu(t){if(jn)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;jn=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await wo(e,t.loginId),await Wt(dt(400,900))),n&&t.loginPass&&!n.value&&(await wo(n,t.loginPass),await Wt(dt(500,1100)));let i=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(o=>/sign in|log in|continue/i.test(o.textContent||o.value||""));return i&&(n?.value||t.loginPass)?(await Wt(dt(600,1400)),Vn(i),!0):!!(e||n)}finally{jn=!1}}async function ou(t){if(Yn)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let o of n){let r=(o.textContent||"").trim();if(r.length<12||r.length>220||!/\?/.test(r)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(r))continue;let s=o.querySelector("input[type='text']")||document.getElementById(o.getAttribute("for")||"")||o.parentElement?.querySelector("input[type='text']");s&&s.offsetParent!==null&&e.push({text:r,input:s})}for(let o of["kba1_response","kba2_response","kba3_response"]){let r=document.getElementById(o);if(!r)continue;let l=(r.closest(".form-group, .entry, li, div")||r.parentElement)?.textContent||"";e.some(d=>d.input===r)||e.push({text:l,input:r})}let i=[];for(let{text:o,input:r}of e){if(r.value)continue;let s=tu(o,t.security);s&&i.push({input:r,ans:s})}if(!i.length)return!1;Yn=!0;try{for(let{input:r,ans:s}of i)await wo(r,s),await Wt(dt(350,800));await Wt(dt(600,1400));let o=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(r=>/continue|submit|verify/i.test(r.textContent||r.value||""));return o&&Vn(o),!0}finally{Yn=!1}}function ts(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||U()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function ft(){return _t()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function ru(t=""){return/\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(t||""))}function So(){if(ft()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||U()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}function au(t){return!!(t?.loginId&&t?.loginPass)}function su(){return ts()?!1:!!(Za()||document.querySelector("#kba1_response, #kba2_response, #kba3_response")||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))}async function cu(){let t=(await C(ye))[ye],e=!!t?.active,n=await eu();if(U()){await Kn();return}if(nu(),ts()){e&&(await T({[ye]:{...t,active:!1,doneAt:Date.now()}}),c.send({action:"recoveryReturnToOfc"}));return}su()&&au(n)&&await x("autofillLogin")&&(await ou(n)||(Za()||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))&&await iu(n))}function es(){if(!So()||ja)return;let t=async()=>{c.alive&&await cu()};t(),ja=c.setInterval(t,1200)}function ns(){return Ya()+Math.random()*(Ql()-Ya())}async function is(){try{let t=await C(po),e=Number(t[po])||0;return Date.now()-e<Jl()?!1:(await T({[po]:Date.now()}),!0)}catch{return!0}}function os(){if(ft()||!So()||document.querySelector("#post_select")||go)return;let t=()=>{c.alive&&(go=c.setTimeout(async()=>{if(go=null,!c.alive||ft()||ru(location.href)||document.querySelector("#post_select")||!So())return;if(jn||Yn||zn){t();return}if((await C(ye))[ye]?.active){t();return}if(!await is()){t();return}try{xo()}catch{t()}},ns()))};t()}function rs(){if(!ft()||yo)return;let t=()=>{c.alive&&(yo=c.setTimeout(async()=>{if(yo=null,!(!c.alive||!ft())){if(await is())try{c.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}t()}},ns()))};t()}async function lu(){try{let t=await C(ho),e=Number(t[ho])||0;return Date.now()-e<Zl()?!1:(await T({[ho]:Date.now()}),!0)}catch{return!0}}function as(){if(!ft()||Gn)return;let t=async()=>{if(Gn=null,!(!c.alive||!ft())){try{if(Bi()){if(Xe||(Xe=Date.now()),Date.now()-Xe>=Va()){if(await lu()){try{I(`Date Loading stuck \u2265${Va()/1e3}s \u2014 reloading Application Home\u2026`)}catch{}try{c.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}}Xe=Date.now()}}else Xe=0}catch{}c.alive&&ft()&&(Gn=c.setTimeout(t,za))}};Gn=c.setTimeout(t,za)}async function ss(t){let e=String(t||"");if(/form resubmission|information that you entered|action that you took to be repeated|returning to that page might cause/i.test(e)){if(!ft()&&!document.querySelector("#post_select")){try{sessionStorage.setItem(bo,"1")}catch{}c.setTimeout(()=>xo(),300)}return}if(!/PSE0501|unable to load appointment available days/i.test(e)||zn)return;zn=!0,c.setTimeout(()=>{zn=!1},8e3);let n=await q();await T({[ye]:{active:!0,ofcUrl:location.href,accountId:n,startedAt:Date.now()}}),c.send({action:"recoveryStart",ofcUrl:location.href})}var Qn="humanClickProfile",Co=150,ko=120,uu=250,cs=!1,pt=[],Xn=0,nt=0,Ht=0,A=null,To=0,Je=!1,be=null,Jn=0,ti=0,Ze=[],mt=!1,te=!1;function du(){let t=[];for(let e of document.querySelectorAll('iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]')){let n=e.getBoundingClientRect();n.width<40||n.height<20||n.width>900||n.height>400||t.push(n)}if(!t.length&&U())for(let e of document.querySelectorAll("iframe")){let n=e.getBoundingClientRect();n.width>=120&&n.width<=420&&n.height>=45&&n.height<=120&&t.push(n)}return t}function tn(){let t=du();if(!t.length)return null;let e=t[0];return{x:e.left+Math.min(28,Math.max(18,e.width*.11)),y:e.top+e.height/2,w:e.width,h:e.height,left:e.left,top:e.top}}function we(t,e,n){return n?t>=n.left-40&&t<=n.left+n.w+40&&e>=n.top-30&&e<=n.top+n.h+30:!1}function fs(t){let e=performance.now();Xn||(Xn=e);let n=A,i=n?(t.clientX-n.x)/Math.max(24,n.w*.12):0,o=n?(t.clientY-n.y)/Math.max(20,n.h*.5):0;pt.push({nx:Math.round(i*1e3)/1e3,ny:Math.round(o*1e3)/1e3,x:Math.round(t.clientX),y:Math.round(t.clientY),t:Math.round(e-Xn)}),pt.length>ko&&pt.shift()}async function ei(){return(await C(Qn))[Qn]||{version:2,maxSamples:Co,samples:[],avgHoverMs:420,avgPressMs:70,avgApproachMs:800,liveTrained:!1}}function vo(t,e,n){if(!t.length)return n;let i=t.reduce((o,r)=>o+(Number(r[e])||0),0);return Math.round(i/t.length)}async function ms(t,{force:e=!1}={}){let n=Date.now();if(!e&&n-To<uu)return null;To=n;let i=await ei(),o=Array.isArray(i.samples)?i.samples.slice():[];for(t.clientId||(t.clientId=`hc-${t.at||n}-${Math.random().toString(36).slice(2,10)}`),t.uploaded=!1,o.push(t);o.length>Co;)o.shift();let r={version:2,maxSamples:Co,samples:o,avgHoverMs:vo(o,"hoverMs",420),avgPressMs:vo(o,"pressMs",70),avgApproachMs:vo(o,"approachMs",800),updatedAt:n,liveTrained:!0,source:"visa-page-live"};return await T({[Qn]:r}),Jn=o.length,F("human",`saved sample locally #${o.length}`,{capture:t.capture||"page",pressMs:t.pressMs,hoverMs:t.hoverMs,pathPts:Array.isArray(t.path)?t.path.length:0,clientId:t.clientId}),ps(t,r).catch(()=>{}),hs().catch(()=>{}),r}async function fu(t){if(!t)return;let e=await ei(),n=Array.isArray(e.samples)?e.samples.slice():[],i=!1;for(let o of n)o?.clientId===t&&!o.uploaded&&(o.uploaded=!0,i=!0);i&&await T({[Qn]:{...e,samples:n,updatedAt:Date.now()}})}async function ps(t,e){try{if(!await x("serverSync"))return F("upload","skipped \u2014 serverSync is OFF"),!1;let n=await G()||{},i=t.clientId||`hc-${t.at||Date.now()}-${Math.random().toString(36).slice(2,8)}`;t.clientId=i;let o={client_id:i,profile:{id:n.id||"",email:n.email||"",name:n.name||"",visa:n.visa||""},sample:t,profile_meta:{sampleCount:e?.samples?.length||0,avgHoverMs:e?.avgHoverMs,avgPressMs:e?.avgPressMs,avgApproachMs:e?.avgApproachMs,liveTrained:!0,source:"visa-page-live",extensionHost:location.host}};F("upload",`sending sample ${i}`,{sampleCount:e?.samples?.length||0,email:n.email||""}),c.send({action:"uploadHumanClickSample",payload:o});try{chrome.runtime.sendMessage({action:"uploadHumanClickSample",payload:o},r=>{if(chrome.runtime.lastError){F("upload",`SW error: ${chrome.runtime.lastError.message}`);return}r?.success?(F("upload",`server OK id=${r.id??"?"} status=${r.status??""}`,{clientId:i}),fu(i)):F("upload",`server FAIL ${r?.error||r?.status||"unknown"}`,{clientId:i})})}catch(r){F("upload",`sendMessage threw: ${r?.message||r}`)}return!0}catch(n){return F("upload",`upload threw: ${n?.message||n}`),!1}}async function hs(){try{if(!await x("serverSync"))return;let t=await ei(),n=(Array.isArray(t.samples)?t.samples:[]).filter(i=>i&&i.uploaded!==!0).slice(-40);for(let i of n)await ps(i,t),await new Promise(o=>setTimeout(o,80))}catch{}}function gs(t,e={}){let n=performance.now(),i=Math.max(25,Math.min(500,nt?n-nt:70)),o=Math.max(30,Math.min(3e3,nt?nt-(Ht||nt):200)),r=(pt.length?pt:Ze).slice(-ko),s=r.length?r[r.length-1].t:o,l=Math.max(o,Math.min(12e3,s||o)),d=be,f=A||tn();return{hoverMs:Math.round(o),pressMs:Math.round(i),approachMs:Math.round(l),path:r,down:d?{x:Math.round(d.x),y:Math.round(d.y)}:null,up:t?{x:Math.round(t.clientX),y:Math.round(t.clientY)}:d?{x:Math.round(d.x),y:Math.round(d.y)}:f?{x:Math.round(f.x),y:Math.round(f.y)}:null,target:f?{x:Math.round(f.x),y:Math.round(f.y),w:Math.round(f.w),h:Math.round(f.h),left:Math.round(f.left),top:Math.round(f.top)}:null,viewport:{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio||1,scrollX:Math.round(window.scrollX||0),scrollY:Math.round(window.scrollY||0)},pointerType:t?.pointerType||"mouse",url:location.pathname+location.search,at:Date.now(),...e}}function Qe(){pt.length&&(Ze=pt.slice(-ko)),pt=[],Xn=0,nt=0,Ht=0,be=null}function $o(){Je||(Je=!0,te=!0,Qe(),A=tn())}function _o(){Je=!1,A=null,mt=!1,Qe()}function Zn(t){let e=t?.target;if(!e)return!1;if(e.closest?.(".cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]"))return!0;if(e.tagName==="IFRAME"){let n=(e.src||"").toLowerCase();if(n.includes("challenges.cloudflare")||n.includes("turnstile"))return!0;let i=e.getBoundingClientRect();if(i.width>=120&&i.width<=420&&i.height>=45&&i.height<=120)return!0}return!1}async function ls(t){if(c.alive){if(!U()||J()){Je&&_o();return}$o(),A||(A=tn()),!Ht&&A&&we(t.clientX,t.clientY,A)&&(Ht=performance.now()),A&&we(t.clientX,t.clientY,A)&&(ti=Date.now()),fs(t)}}async function us(t){if(!(!c.alive||t.button!==0)&&!(!U()||J())){$o(),A=tn(),nt=performance.now(),Ht||(Ht=nt),be={x:t.clientX,y:t.clientY},fs(t),(Zn(t)||A&&we(t.clientX,t.clientY,A))&&(mt=!0,ti=Date.now()),F("human","pointer down during challenge",{onWidget:Zn(t),near:!!(!A||we(t.clientX,t.clientY,A)),x:Math.round(t.clientX),y:Math.round(t.clientY)});try{B("scanning",`Recording click\u2026 (saved ${Jn} so far)`)}catch{}}}async function ds(t){if(!c.alive||t.button!==0||!nt&&!mt)return;if(!U()&&!J()){Qe();return}if(!(A&&we(t.clientX,t.clientY,A)||A&&be&&we(be.x,be.y,A)||Zn(t)||mt||!A&&(pt.length>=2||Ze.length>=2))&&pt.length<2&&Ze.length<2){Qe();return}let n=gs(t,{capture:mt||Zn(t)?"iframe-or-widget":"page"});mt=!1,Qe();let i=await ms(n);if(!i)return;let o=i.samples?.length||0;try{B("success",`Saved verify-human click #${o} \u2014 uploaded to server`)}catch{}}async function mu(){let t=Date.now();if(!te||!J()&&U())return;if(!(mt||t-ti<8e3||Ze.length>=2&&t-To>500)){te=!1,_o();return}let n=gs(null,{capture:"challenge-solved"});mt=!1,te=!1,_o();let i=await ms(n,{force:!0});if(!i)return;let o=i.samples?.length||0;try{B("success",`Saved verify-human click #${o} (after checkbox) \u2014 uploaded to server`)}catch{}}async function pu(){try{let t=await ei(),e=t.liveTrained&&t.samples?.length||0;return Jn=e,e}catch{return Jn}}function ys(){if(cs)return;cs=!0,F("human","train watcher started",{path:location.pathname}),c.on(window,"pointermove",ls,{passive:!0,capture:!0}),c.on(window,"pointerdown",us,{passive:!0,capture:!0}),c.on(window,"pointerup",ds,{passive:!0,capture:!0}),c.on(window,"mousemove",ls,{passive:!0,capture:!0}),c.on(window,"mousedown",us,{passive:!0,capture:!0}),c.on(window,"mouseup",ds,{passive:!0,capture:!0}),c.on(window,"blur",()=>{!U()||J()||(mt=!0,ti=Date.now(),nt||(nt=performance.now(),Ht||(Ht=nt)),F("human","page blur during challenge (likely iframe click)"))});let t=async()=>{if(!c.alive)return;if(U()&&!J()){te||F("human","challenge detected \u2014 recording armed"),te=!0,$o(),A||(A=tn());let n=await pu();try{B("scanning",n?`Train mode \u2014 click Verify you are human naturally (saved ${n})`:"Train mode \u2014 move mouse naturally, then click Verify you are human (recording\u2026)")}catch{}return}(te||Je||mt)&&await mu()};t(),c.setInterval(t,1200),c.setTimeout(()=>{F("upload","flushing unsynced local samples\u2026"),hs().catch(()=>{})},2500)}var hu=`
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
`;function bs(){if(document.querySelector(p(a.styles)))return;let t=document.createElement("style");t.id=a.styles,t.dataset[k.mark]="",t.textContent=hu,(document.head||document.documentElement).appendChild(t)}Fo();eo();Ao(()=>{Ta(),c.destroy()});Qo();Ka();_()&&q().then(t=>{if(t)return En(t);fe()}).catch(()=>fe());if(!_()){c.disposable(()=>{let i=document.querySelector(p(a.anchor)),o=document.querySelector("#post_select");i&&o&&i.replaceWith(o);for(let r of document.querySelectorAll("[data-"+k.mark+"]"))r.remove()}),bs(),c.send({action:"registerBlockGuard",prefix:m}),c.send({action:"registerRedirect",prefix:m}),c.send({action:"registerAlertGuard",prefix:m}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&c.send({action:"registerOfcReader",prefix:m}),c.on(window,"message",i=>{if(c.alive&&i.source===window)switch(i.data?.action){case Dt.req:return Na(i);case Dt.res:return Oa(i);case Dt.ofc:return xr(i);case Dt.err:return Le("native_alert",i.data?.text),We(String(i.data?.text||"alert").slice(0,120)),ss(i.data?.text);case Dt.sub:hr(),Ie(),Er(),at().then(o=>{Ke(o?.accountId||null)}).catch(()=>{Ke(null)});return}}),chrome.storage.onChanged.addListener((i,o)=>{o==="local"&&(i.profile&&bi(),i.waitPillClock&&mr(i.waitPillClock.newValue),i.autoCloudflareTick&&(i.autoCloudflareTick.newValue?mo():fo()))}),c.on(document,"click",i=>{ce();let o=i.target.closest(p(a.waitTime));if(o){if(o.dataset.skipClick){delete o.dataset.skipClick;return}fr()}}),c.on(document,"keydown",ce),c.on(window,"focus",()=>ce({keepConsular:!0})),c.on(document,"visibilitychange",()=>{document.hidden||ce({keepConsular:!0})}),gr(),Ja(),es(),os(),rs(),as(),ys(),mo();async function t(){!c.alive||_()||!_t()||document.querySelector("#post_select")&&(kt(),await Promise.all([pi(),gi(),no()]),qr({slotIndex:Ln,shouldPick:async()=>await at()?!0:!!await x("autoSelectFirstDate"),onSlotPicked:()=>_a()}))}async function e(){!c.alive||_()||!_t()||await Ca()}async function n(){Go(),jo(),await Promise.all([bi(),Vo(),Yo(),pi(),gi(),no()]),ri()}document.readyState==="complete"?n():c.on(window,"load",n),c.setInterval(t,2500),c.setInterval(e,3e4),e()}})();
