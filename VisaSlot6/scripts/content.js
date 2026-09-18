(()=>{function N(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function C(t){return N()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,i]of Object.entries(t))e[n]=i;return e}):Promise.resolve(typeof t=="string"?{}:t)}function T(t){return N()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function _o(t){return N()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function ko(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",i=>{String(i.reason?.message||i.reason||"").includes("Extension context invalidated")&&(i.preventDefault(),e())});let n=setInterval(()=>{N()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var Bt="https://the.gopg.online",ei=`${Bt}/contribute`,$o=`${Bt}/contribute/telegram`,mu=`${Bt}/contribute/human-click`,en=`${Bt}/contribute/tik-tik-prefs`,Mo=`${Bt}/contribute/tik-tik-coord`;var Ao=20,Do=4320*60*1e3,nn=100,Eo=4,on=100,Io=240,Lo=50,Po=1440*60*1e3,hs={recheckButton:!1,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function x(t){return C({[t]:hs[t]}).then(e=>e[t])}function Mt(){return C({posts:[]}).then(t=>t.posts)}function ee(t){return T({posts:t})}function G(){return C("profile").then(t=>t.profile)}var Ft=t=>String(t).padStart(2,"0");function Se(t){let e=Ft(t%60),n=Math.floor(t/60)%60,i=Math.floor(t/3600);return i?`${Ft(i)}:${Ft(n)}:${e}`:`${Ft(n)}:${e}`}function qo(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${Ft(n.getUTCHours())}:${Ft(n.getUTCMinutes())}:${Ft(n.getUTCSeconds())}`}}function ni(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),i=t%60,o=[];return e>0&&o.push(`${e}d`),(n>0||e>0)&&o.push(`${n}h`),o.push(`${i}m`),o.join(" ")}function Ro(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),i=o=>n.find(r=>r.type===o)?.value??"";return`${i("month")} ${i("day")} ${i("year")} ${i("hour")}:${i("minute")} ${i("dayPeriod")}`}function Oo(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),i=parseInt(e[2],10),o=parseInt(e[3],10),r=e[4];r&&(r.toUpperCase()==="PM"&&n<12&&(n+=12),r.toUpperCase()==="AM"&&n===12&&(n=0));let s=new Date;return s.setHours(n,i,o,0),s.getTime()>Date.now()+6e4&&s.setDate(s.getDate()-1),s}var No=Symbol(),gs=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&N()}on(t,e,n,i){t.addEventListener(e,n,{...i,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!N())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=Eo,interval:n=nn}={}){return new Promise(i=>{let o=r=>{if(!this.alive)return;let s=document.querySelector(t);if(s)return i(s);if(r>=e)return i(null);this.setTimeout(()=>o(r+1),n)};o(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},c=new gs;function Wo(){let t=globalThis[No];Object.defineProperty(globalThis,No,{value:c,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var rn=new Uint32Array(2);crypto.getRandomValues(rn);var Ho="abcdefghjkmnpqrstuvwxyz",ys=(rn[0].toString(36)+rn[1].toString(36)).replace(/[^a-z0-9]/g,""),m=(Ho[rn[0]%Ho.length]+ys).slice(0,8).padEnd(8,"x");function p(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var a={selRow:m+"01",anchor:m+"02",waitTime:m+"03",recheck:m+"04",histCont:m+"05",histTbl:m+"06",cdCard:m+"07",cdTime:m+"08",ofcDate:m+"09",styles:m+"10",datesCont:m+"11",datesPara:m+"12",slotsTbl:m+"12b",aiBtn:m+"13",aiPanel:m+"14",aiFrom:m+"15",aiTo:m+"16",aiStatus:m+"17",aiConfirm:m+"18",aiCancel:m+"19",aiClose:m+"20",aiCities:m+"21",aiSubmitBtn:m+"22",aiCitiesBtn:m+"23",aiLogin:m+"24",aiPass:m+"25",aiQ1:m+"26",aiA1:m+"27",aiQ2:m+"28",aiA2:m+"29",aiQ3:m+"30",aiA3:m+"31",aiSaveLogin:m+"32",cfHud:m+"33",aiCitiesAll:m+"34",aiCitiesNone:m+"35",aiLoginToggle:m+"36",aiLoginBody:m+"37",aiSubmitOn:m+"38",aiSubmitOff:m+"39",aiCitiesOn:m+"40",aiCitiesOff:m+"41",aiWinList:m+"42",aiWinAdd:m+"43",aiWinSave:m+"44",aiWinReset:m+"45",aiWinNote:m+"46",aiSubmitSw:m+"47",aiCitiesSw:m+"48",aiInfoBox:m+"49",aiWarnBox:m+"50",aiOkBox:m+"51",aiWinCard:m+"52",aiSubmitBody:m+"53",aiCitiesBody:m+"54",aiTerms:m+"55",aiTermsAgree:m+"56",aiTermsGate:m+"57",aiMain:m+"58",aiTermsContinue:m+"59",aiFromBtn:m+"60",aiToBtn:m+"61",aiCal:m+"62"},u={pill:m+"a",pillTtl:m+"b",pillTmr:m+"c",pillWait:m+"d",pillDone:m+"e",footer:m+"f",card:m+"g",cardTtl:m+"h",histScrl:m+"i",dltDn:m+"j",dltUp:m+"k",cdDiv:m+"l",hidden:m+"m",sideLink:m+"n",datesLnk:m+"o",slotsSum:m+"o2",slotsTbl:m+"o3",aiOn:m+"p",aiRow:m+"q",aiHint:m+"r",aiCities:m+"s",aiOnBtn:m+"t",aiCityAct:m+"x",cfHud:m+"u",cfPulse:m+"v",cfFlash:m+"w",aiEn:m+"y",aiDis:m+"z",aiWinRow:m+"aa",aiFeat:m+"ab",aiSwitch:m+"ac",aiKnob:m+"ad",aiSec:m+"ae",aiInfo:m+"af",aiWarn:m+"ag",aiOk:m+"ah",aiTrash:m+"ai",aiWinHelp:m+"aj",aiInline:m+"ak",aiHead:m+"al",aiTerms:m+"am",aiTermsCb:m+"an",aiTermsList:m+"ao",aiContinue:m+"ap",aiDateBtn:m+"aq",aiCal:m+"ar",aiCalHead:m+"as",aiCalGrid:m+"at",aiCalDay:m+"au",aiCalMuted:m+"av",aiCalOn:m+"aw",aiCalToday:m+"ax"},k={mark:m,w:m+"w",mw:m+"mw"},At={req:m+"q",res:m+"r",ofc:m+"o",err:m+"e",sub:m+"s"};function an(t){return t.map(e=>String.fromCharCode(e)).join("")}function bs(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function Bo(){let t=document.createElement("div");return t.className=u.footer,t.textContent=an([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function ws(t){let e=document.getElementById(a.histCont);e&&e.remove(),e=document.createElement("div"),e.id=a.histCont,e.className=u.card,e.dataset[k.mark]="";let n=document.createElement("h4");n.className=u.cardTtl,n.textContent=an([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let i=document.createElement("div");i.className=u.histScrl;let o=document.createElement("table");o.id=a.histTbl;let r=document.createElement("thead"),s=document.createElement("tr");for(let f of["Time","Est. Wait","Change"]){let h=document.createElement("th");h.textContent=f,s.appendChild(h)}r.appendChild(s),o.appendChild(r);let l=document.createElement("tbody");for(let f=t.length-1;f>=0;f--){let h=t[f],g="--",w="";if(f>0){let $=h.minutes-t[f-1].minutes;$<0?(g=`${$}m`,w=u.dltDn):$>0?(g=`+${$}m`,w=u.dltUp):g="0m"}let v=document.createElement("tr"),K=[[h.timeStr,""],[ni(h.minutes),""],[g,w]];for(let[$,z]of K){let S=document.createElement("td");z&&(S.className=z),S.textContent=$,v.appendChild(S)}l.appendChild(v)}o.appendChild(l),i.appendChild(o),e.appendChild(i),e.appendChild(Bo());let d=document.getElementById("last-updated");d&&(d.closest("div, p, section")||d.parentElement).insertAdjacentElement("afterend",e)}function Ss(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function Fo(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),i=Ss();if(i!==null&&i>Io&&!e.textContent.includes("(")){let s=ni(i);e.textContent=`${e.textContent} (${i} minutes / ${s})`}let o=n.textContent.trim().split(" (")[0],r=Oo(o);if(r&&c.setInterval(()=>{let s=Math.floor((Date.now()-r)/1e3);s>=0&&(n.textContent=`${o} (${s}s ago)`)},1e3),i!==null){let s=bs(),l=sessionStorage.getItem(s);l||(l=Math.random().toString(36).substring(2,11),sessionStorage.setItem(s,l)),C({queueHistory:{}}).then(d=>{let f=d.queueHistory||{},h=Date.now(),g={};for(let[$,z]of Object.entries(f)){if(!Array.isArray(z))continue;let S=z[z.length-1];S&&h-S.timestamp<Po&&(g[$]=z)}let w=g[l]||[],v=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),K=w[w.length-1];(!K||K.minutes!==i||K.timeStr!==v)&&(w.push({timestamp:h,timeStr:v,minutes:i}),w.length>Lo&&w.shift(),g[l]=w,T({queueHistory:g})),ws(w)})}}function Uo(t,e){let n=document.getElementById("error_row");if(!n)return;let i;t?i=e?`Blocked for 24 hours, about ${Se(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":i="Temporarily blocked. Log in in a new tab, then refresh this page.";let o=document.createElement("div");o.className="atlas_validationalert alert alert-danger warning",o.dataset[k.mark]="",o.textContent=i,n.replaceChildren(o),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function Ko(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&C({cfRetryAfter:null}).then(n=>{let i=parseInt(n.cfRetryAfter,10);if(!isNaN(i)){_o("cfRetryAfter");let o=document.getElementById("what-happened-section");if(o){let r=document.createElement("div");r.id=a.cdCard,r.className=u.card,r.dataset[k.mark]="";let s=document.createElement("h4");s.className=u.cardTtl,s.textContent=an([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),r.appendChild(s);let l=document.createElement("div");l.id=a.cdTime,r.appendChild(l);let d=document.createElement("div");d.className=u.cdDiv,r.appendChild(d),r.appendChild(Bo()),o.appendChild(r);let f=i,h=null,g=()=>{f>0?(l.textContent=Se(f),f--):(l.classList.add(u.cdDiv+"-over"),l.textContent="You can try refreshing now!",h!=null&&c.clear(h))};g(),h=c.setInterval(g,1e3)}}})}async function Go(){let t=document.querySelector(".username");if(!t)return;let n=(t.innerText||"").trim().match(/^(.*)\((\d+)\)\s*$/);if(!n)return;let[,i,o]=n,r=await G()||{},s=!r.id||r.id===o||String(r.id).includes(o)?r:{};s.name=i.trim(),s.id=o;let l=document.querySelectorAll("script");for(let d of l){let f=d.innerText.trim();if(f.includes("setAuthenticatedUserContext")){let h=/setAuthenticatedUserContext\('([^']*)'\)/,g=f.match(h);g&&(s.email=g[1])}}await T({profile:s})}async function zo(){let t=document.querySelector("#post_select");if(!t)return;let e=await Mt();for(let n of t.options){if(!n.value)continue;e.findIndex(o=>o.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await ee(e)}var xs=["visa-information","fee-payment","appointment-confirmation"];function vs(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(i=>{let o=i.querySelector(".text-bold");if(!o)return;let r=Cs(o.textContent);if(!xs.includes(r))return;let s=Ts(i);s&&(n[r]=s)}),Object.keys(n).length?n:null}function Cs(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Ts(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function ne(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>Do)return null}catch{}return t.value}function _s(t){let e=(t.posts||[]).filter(o=>o.Updated).sort((o,r)=>o.Updated-r.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},i=ne(t.cgiIdToken);return i&&(n.token=i),n}async function ii(){if(!N()||!await x("serverSync"))return;let t=await C(["profile","posts","cgiIdToken"]),e=_s(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await fetch(ei,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(o=>o.json());if(!n.success)return;let i="0";n.contribs>0&&(i=n.contribs.toString()),n.contribs>10&&(i="10+"),n.contribs>0&&await T({contribs:{email:t.profile?.email,updated:Date.now(),count:i}})}catch{}}function oi(t=0){N()&&document.querySelector("#appointment-card")&&x("serverSync").then(e=>{if(!e)return;let n=vs();if(!n){t<Ao&&c.setTimeout(()=>oi(t+1),nn);return}C(["profile","cgiIdToken","savedDashboard"]).then(i=>{let o=ne(i.cgiIdToken);o&&JSON.stringify(n)!==JSON.stringify(i.savedDashboard)&&fetch(ei,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:i.profile,dashboard:n,token:o})}).then(r=>r.json()).then(r=>{r.success&&T({savedDashboard:n})}).catch(()=>{})})})}var ks=`${Bt}/extension-runtime-config.json`,ai="vsRuntimeConfig",$s=300*1e3,ri=0,xe=null,b={slotWindowLabel:":05\u2013:13, :14\u2013:21, :24\u2013:31, :35\u2013:50, :54\u2013:02",slotWindows:[{slot:5,fromMin:0,toMin:2},{slot:1,fromMin:5,toMin:13},{slot:2,fromMin:14,toMin:21},{slot:3,fromMin:24,toMin:31},{slot:4,fromMin:35,toMin:50},{slot:5,fromMin:54,toMin:59}],windowStartsMin:[0,5,14,24,35,54],cityLoadingMaxMs:18e4,cityCalendarNoDatesMs:2e4,cityRotateMinGapMs:13e3,cityRotateMaxGapMs:18e3,cityHoldMaxMs:45e3,homeKeepaliveMinMs:6e5,homeKeepaliveMaxMs:6e5,homeKeepaliveDebounceMs:48e4,loadingStuckMs:12e4,loadingStuckDebounceMs:9e4,remoteVersion:0,source:"bundled"};function Y(t,e,n,i){let o=Number(t);return Number.isFinite(o)?Math.min(n,Math.max(e,Math.round(o))):i}function Ms(t){if(!Array.isArray(t)||!t.length||t.length>24)return null;let e=[];for(let n of t){let i=Y(n?.fromMin,0,59,NaN),o=Y(n?.toMin,0,59,NaN);if(!Number.isFinite(i)||!Number.isFinite(o)||i>o)return null;let r=Y(n?.slot,1,12,1);e.push({slot:r,fromMin:i,toMin:o})}return e}function As(t){let e=[...new Set(t.map(n=>n.fromMin))].sort((n,i)=>n-i);return e.length?e:b.windowStartsMin.slice()}function jo(t,e="remote"){if(!t||typeof t!="object")return!1;let n=Ms(t.slotWindows);if(n){b.slotWindows.length=0;for(let i of n)b.slotWindows.push(i);b.windowStartsMin=As(n)}return typeof t.slotWindowLabel=="string"&&t.slotWindowLabel.length<120&&(b.slotWindowLabel=t.slotWindowLabel),b.cityLoadingMaxMs=Y(t.cityLoadingMaxMs,1e4,3e5,b.cityLoadingMaxMs),b.cityCalendarNoDatesMs=Y(t.cityCalendarNoDatesMs,5e3,12e4,b.cityCalendarNoDatesMs),b.cityRotateMinGapMs=Y(t.cityRotateMinGapMs,5e3,6e4,b.cityRotateMinGapMs),b.cityRotateMaxGapMs=Y(t.cityRotateMaxGapMs,b.cityRotateMinGapMs,9e4,Math.max(b.cityRotateMinGapMs,b.cityRotateMaxGapMs)),b.cityHoldMaxMs=Y(t.cityHoldMaxMs,1e4,18e4,b.cityHoldMaxMs),b.homeKeepaliveMinMs=Y(t.homeKeepaliveMinMs,12e4,18e5,b.homeKeepaliveMinMs),b.homeKeepaliveMaxMs=Y(t.homeKeepaliveMaxMs,b.homeKeepaliveMinMs,18e5,Math.max(b.homeKeepaliveMinMs,b.homeKeepaliveMaxMs)),b.homeKeepaliveDebounceMs=Y(t.homeKeepaliveDebounceMs,6e4,18e5,b.homeKeepaliveDebounceMs),b.loadingStuckMs=Y(t.loadingStuckMs,3e4,6e5,b.loadingStuckMs),b.loadingStuckDebounceMs=Y(t.loadingStuckDebounceMs,3e4,6e5,b.loadingStuckDebounceMs),b.remoteVersion=Y(t.version,0,1e9,b.remoteVersion),b.source=e,!0}async function Ds(){try{let e=(await C(ai))[ai];e?.config&&jo(e.config,"cache")}catch{}}async function Es(t){try{await T({[ai]:{config:t,fetchedAt:Date.now()}})}catch{}}async function Is({force:t=!1}={}){let e=Date.now();if(!t&&e-ri<$s)return b;if(xe)return xe;xe=(async()=>{await Ds();try{let n=await fetch(ks,{method:"GET",cache:"no-store",signal:AbortSignal.timeout(8e3)});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.json();if(!i||typeof i!="object"||Array.isArray(i))throw new Error("bad json");if(i.script||i.code||i.eval)throw new Error("unsafe keys");jo(i,"remote"),await Es(i),ri=Date.now()}catch{ri=Date.now()}return b})();try{return await xe}finally{xe=null}}function Yo(){Is().catch(()=>{})}var Dt=null,ve=null;function Vo(){return Dt||b.slotWindows}function st(){return ve||(Dt?.length?Xo(Dt):b.slotWindowLabel)}var qu=b.slotWindows,ht=4,Et=6;function Xo(t){return t?.length?t.map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", "):b.slotWindowLabel}function si(t){if(!Array.isArray(t))return[];let e=[];for(let n of t){if(e.length>=ht)break;let i=Number(n?.fromMin),o=Number(n?.durationMin??n?.duration);if(!Number.isFinite(i)||i<0||i>59)continue;let r=Math.min(Et,59-i);if(r<1)continue;if(!Number.isFinite(o)||o<1){let l=Number(n?.toMin);if(!Number.isFinite(l)||l<i||l>59||(o=Math.min(r,l-i),o<1))continue}o=Math.min(r,Math.max(1,Math.round(o)));let s=Math.min(59,i+o);e.push({slot:e.length+1,fromMin:Math.round(i),toMin:s,durationMin:o})}return e}function Qo(t){let e=si(t||[]);return e.length?(Dt=e.map(({slot:n,fromMin:i,toMin:o})=>({slot:n,fromMin:i,toMin:o})),ve=Xo(Dt),Dt):(Dt=null,ve=null,null)}function ci(){Dt=null,ve=null}function Jo(t){let e=t?.length?t:b.slotWindows,n=[];for(let i of e||[]){if(n.length>=ht)break;let o=Number(i.fromMin),r=Number(i.toMin);if(!Number.isFinite(o)||!Number.isFinite(r)||r<o||o===0&&r<=2&&(e||[]).some(d=>Number(d.fromMin)>=54))continue;let s=Math.min(Et,59-o);if(s<1)continue;let l=Math.min(s,Math.max(1,r-o));n.push({fromMin:o,durationMin:l})}return n}function Zo(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=i=>Number(e.find(o=>o.type===i)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function ie(t=new Date){let{minute:e}=Zo(t),n=Vo();for(let i of n)if(e>=i.fromMin&&e<=i.toMin)return i.slot;return 0}function Ce(t=new Date){if(ie(t))return 0;let{minute:e,second:n}=Zo(t),i=e*60+n,o=Vo(),r=[...new Set(o.map(l=>l.fromMin))].sort((l,d)=>l-d);for(let l of r){let d=l*60;if(i<d)return(d-i)*1e3}let s=r[0]??0;return(3600-i+s*60)*1e3}function li(t){return t<9e4?`${Math.ceil(t/1e3)}s`:`${Math.ceil(t/6e4)}m`}function ar(){let t=document.querySelector(p(a.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=a.selRow,t.dataset[k.mark]="",n.insertAdjacentElement("afterend",t);let i=document.createElement("span");return i.id=a.anchor,i.dataset[k.mark]="",i.dataset[k.w]=e.style.width,i.dataset[k.mw]=e.style.minWidth,i.hidden=!0,e.insertAdjacentElement("beforebegin",i),c.setStyle(e,"width","100%"),c.setStyle(e,"minWidth","0"),t.appendChild(e),t}var Te="waitPillState",Ls=3600*1e3,tr=u.pillWait,Ps=u.pillDone;function qs(t,e){let n=document.createElement("span");n.className=`${u.pill} ${e}`;let i=(o,r)=>{let s=document.createElement("span");s.className=o,s.textContent=r,n.appendChild(s)};return i(u.pillTtl,t.title),t.timer!==void 0&&i(u.pillTmr,t.timer),n}function Rs(t,e=Date.now()){if(t.kind==="waiting")return{variant:tr};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:tr}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:Ps}}return null}function Os(t,e,n=new Date){let i=qo(n);return t.seconds===void 0?{title:i}:{title:i,timer:Se(t.seconds)}}var Ns=class{#t=null;#e={kind:"idle"};#i=null;#n=null;#o=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get(Te))[Te];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>Ls){chrome.storage.local.remove(Te);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#o=t,this.#r(),this.#c()}toggleClockMode(){c.alive&&(this.setClockMode(!this.#o),chrome.storage.local.set({waitPillClock:this.#o}))}render(t){return Rs(this.#e,t)}#l(t){return Os(t,this.#o,new Date)}#r(){if(this.#t??=Hs(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(u.hidden);return}this.#t.classList.remove(u.hidden),this.#t.replaceChildren(qs(this.#l(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#i&&(c.clear(this.#i),this.#i=null),t.kind==="running"?(chrome.storage.local.set({[Te]:t}),this.#i=c.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove(Te),this.#r(),this.#c()}#u(){this.#r(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,x("audioAlert").then(t=>{t&&Qs()})))}#c(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=c.setInterval(()=>this.#r(),1e3):!t&&this.#n&&(c.clear(this.#n),this.#n=null)}},se=new Ns,Ae="pillPosition",er=4;function nr(t,e,n){return Math.max(e,Math.min(n,t))}function sr(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,i=e.height>0?e.height:36;return{w:n,h:i}}function oe(t,e,n){let{w:i,h:o}=sr(t),r=nr(e,0,Math.max(0,window.innerWidth-i)),s=nr(n,0,Math.max(0,window.innerHeight-o));return t.style.setProperty("left",r+"px","important"),t.style.setProperty("top",s+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:r,top:s}}function Ws(t){var e=!1,n=!1,i=0,o=0,r=0,s=0;function l(f){if(e){var h=f.touches?f.touches[0]:f,g=h.clientX-i,w=h.clientY-o;!n&&Math.abs(g)<er&&Math.abs(w)<er||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",oe(t,r+g,s+w),f.cancelable&&f.preventDefault())}}function d(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",d),document.removeEventListener("touchmove",l),document.removeEventListener("touchend",d),n){let f=t.getBoundingClientRect();chrome.storage.local.set({[Ae]:{top:Math.round(f.top),left:Math.round(f.left)}})}n=!1}}t.addEventListener("mousedown",function(f){if(f.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let h=t.getBoundingClientRect();i=f.clientX,o=f.clientY,r=h.left,s=h.top,oe(t,h.left,h.top),document.addEventListener("mousemove",l),document.addEventListener("mouseup",d),f.preventDefault(),f.stopPropagation()}),t.addEventListener("touchstart",function(f){e=!0,n=!1,delete t.dataset.skipClick;let h=t.getBoundingClientRect();i=f.touches[0].clientX,o=f.touches[0].clientY,r=h.left,s=h.top,oe(t,h.left,h.top),document.addEventListener("touchmove",l,{passive:!1}),document.addEventListener("touchend",d)},{passive:!0})}function Hs(){let t=document.querySelector(p(a.waitTime));return t||(t=document.createElement("div"),t.id=a.waitTime,t.className=u.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),Ws(t),chrome.storage.local.get(Ae).then(e=>{let n=e[Ae];n&&typeof n.top=="number"&&typeof n.left=="number"&&oe(t,n.left,n.top)}),Ks(t),t)}function ir(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function Bs(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function Fs(t){let{w:e,h:n}=sr(t),i=12;return[{left:i,top:i},{left:Math.max(i,window.innerWidth-e-i),top:i},{left:i,top:Math.max(i,window.innerHeight-n-i)},{left:Math.max(i,window.innerWidth-e-i),top:Math.max(i,window.innerHeight-n-i)}]}async function Us(){let e=(await chrome.storage.local.get(Ae))[Ae];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function Ks(t){let e=!1,n=async()=>{if(!c.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(u.hidden))return;let i=Bs(),o=!!(i&&i.offsetParent!==null&&i.getBoundingClientRect().height>20),r=t.getBoundingClientRect();if(o&&ir(r,i.getBoundingClientRect())){let s=i.getBoundingClientRect(),l=Fs(t),d=l.find(f=>{let h={left:f.left,top:f.top,right:f.left+r.width,bottom:f.top+r.height};return!ir(h,s)})||l[2];e=!0,t.setAttribute("data-dodging",""),oe(t,d.left,d.top);return}if(e&&!o){e=!1,t.removeAttribute("data-dodging");let s=await Us();s&&oe(t,s.left,s.top)}else o||t.removeAttribute("data-dodging")};c.setInterval(n,400),c.on(window,"resize",n)}async function mi(){if(!c.alive||!await x("defaultWaitTime")||!await c.waitFor("#post_select",{attempts:on}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});se.setClockMode(t),await se.restore()}async function cr(){await x("defaultWaitTime")&&se.waiting()}async function pn(t){await x("defaultWaitTime")&&se.run(t)}function lr(){se.toggleClockMode()}function ur(t){se.setClockMode(t)}var _e=null,ke=null,sn=null;function pi(){return sn||(sn=new(window.AudioContext||window.webkitAudioContext),c.disposable(()=>sn?.close())),sn}async function hn(t=150){try{let e=pi();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let o=e.currentTime,r=t/1e3;i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(.1,o+.01),i.gain.setValueAtTime(.1,o+Math.max(.01,r-.02)),i.gain.linearRampToValueAtTime(0,o+r),n.start(),n.stop(o+r)}catch(e){console.error("Audio beep failed:",e)}}function Gs(t,e=125,n=125){let i=0,o=()=>{i>=t||(hn(e),i++,c.setTimeout(o,e+n))};o()}var ui=4,or=50,rr=50,zs=600;function dr(){if(ke)return;let t=()=>{Gs(ui,or,rr);let e=ui*or+(ui-1)*rr;ke=c.setTimeout(t,e+zs)};t()}var js=250,Ys=10,Vs=300,Xs=1e3;function Qs(){if(_e)return;let t=[];for(let o=0;o<=Vs;o+=Ys)t.push(o);let e=Date.now(),n=0,i=()=>{let o=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&o>=t[n];){let r=n===t.length-1;hn(r?Xs:js),n++}if(n<t.length){let r=t[n],s=e+r*1e3,l=Math.max(0,s-Date.now());_e=c.setTimeout(i,l)}else ce()};i()}function ce(t={}){let e=!!t.keepConsular;_e&&(c.clear(_e),_e=null),ke&&(c.clear(ke),ke=null),di(),e||fi()}var cn=null,ln=null,re=null,un=null,$e=null;async function fr(){di();try{let t=pi();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=880,i.frequency.value=1320,o.gain.value=.85,r.gain.value=.65,n.connect(o).connect(e),i.connect(r).connect(e);let s=t.createOscillator(),l=t.createGain();s.type="triangle",s.frequency.value=3.2,l.gain.value=280,s.connect(l),l.connect(n.frequency),l.connect(i.frequency);let d=t.currentTime;n.start(d),i.start(d),s.start(d),re={osc1:n,osc2:i,lfo:s,master:e};let f=()=>{re&&(hn(500),ln=c.setTimeout(f,1800))};f(),cn=c.setTimeout(di,12e4),$e=document.title;let h=!1,g=()=>{re&&(document.title=h?$e:"!!! SUBMIT CLICKED !!!",h=!h,un=c.setTimeout(g,450))};g()}catch(t){console.error("Submit alarm failed:",t)}}function di(){if(cn&&(c.clear(cn),cn=null),ln&&(c.clear(ln),ln=null),un&&(c.clear(un),un=null),$e&&(document.title=$e,$e=null),re){try{let{osc1:t,osc2:e,lfo:n}=re;t.stop(),e.stop(),n.stop()}catch{}re=null}}function Js(){let t=location.pathname||"";return/\/ofc-schedule\b/i.test(t)?!1:/\/(schedule|c-schedule)\b/i.test(t)}var Zs=6e4,dn=null,fn=null,mn=null,Me=null,ae=null;async function tc(){fi();try{let t=pi();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=980,i.frequency.value=1470,o.gain.value=.95,r.gain.value=.8,n.connect(o).connect(e),i.connect(r).connect(e);let s=t.createOscillator(),l=t.createGain();s.type="square",s.frequency.value=4,l.gain.value=320,s.connect(l),l.connect(n.frequency),l.connect(i.frequency);let d=t.currentTime;n.start(d),i.start(d),s.start(d),ae={osc1:n,osc2:i,lfo:s,master:e};let f=()=>{ae&&(hn(650),fn=c.setTimeout(f,900))};f(),dn=c.setTimeout(fi,Zs),Me=document.title;let h=!1,g=()=>{ae&&(document.title=h?Me:"!!! OFC BOOKED \u2014 CONSULAR PAGE !!!",h=!h,mn=c.setTimeout(g,400))};g()}catch(t){console.error("Consular OFC alarm failed:",t)}}function fi(){if(dn&&(c.clear(dn),dn=null),fn&&(c.clear(fn),fn=null),mn&&(c.clear(mn),mn=null),Me&&(document.title=Me,Me=null),ae){try{let{osc1:t,osc2:e,lfo:n}=ae;t.stop(),e.stop(),n.stop()}catch{}ae=null}}function mr(){if(Js()){try{let t="vsConsularOfcBeep";if(sessionStorage.getItem(t)==="1")return;sessionStorage.setItem(t,"1")}catch{}tc()}}function ec(){document.querySelector(p(a.recheck))?.remove();for(let t of document.querySelectorAll("button"))(t.textContent||"").trim()==="Recheck"&&t.remove()}async function hi(){c.alive&&ec()}async function yi(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await c.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let i=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(l=>l.innerText.trim()===i))continue;let r=document.createElement("li");r.className="usa-sidenav__item",r.dataset[k.mark]="";let s=document.createElement("a");s.href=n.link,s.className=u.sideLink,s.target="_self",s.textContent=n.text,r.appendChild(s),t.appendChild(r)}}function M(t,e,n){let i=document.createElement(t);return e&&(i.className=e),n?.appendChild(i),i}function gn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,r]=n;return`${r}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return null}function gi(t){let e=gn(t);if(!e)return String(t||"");let[n,i,o]=e.split("-").map(Number);if(!n||!i||!o)return e;try{return new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(new Date(n,i-1,o))}catch{return e}}function nc(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);if(n)return n[1].slice(0,5);let i=e.match(/^(\d{1,2}:\d{2})/);return i?i[1]:e}function pr(t){let e=document.querySelector(p(a.datesCont));if(e){let o=e.querySelector(p(a.datesPara)),r=e.querySelector("h2");if(r&&t&&(r.textContent=t),o)return{container:e,details:o}}let n=document.querySelector("#page_form");if(!n)return null;e?.remove();let i=ic(t||"");return n.appendChild(i.container),i}function hr(t){if(t.response.HasError)return;let e=document.querySelector("#post_select"),n=e?.options[e.selectedIndex]?.text??"",i=(t.response.ScheduleDays||[]).map(f=>gn(f?.Date)).filter(Boolean).sort((f,h)=>f.localeCompare(h));document.querySelector(p(a.datesCont))?.remove();let o=pr(n);if(!o)return;let{details:r}=o;r.replaceChildren();let s=M("div",u.slotsSum,r);if(!i.length){s.textContent="No slots available";return}s.textContent=`${i.length} date${i.length===1?"":"s"} available`;let l={};for(let f of i){let h=f.slice(0,7);(l[h]||=[]).push(f)}for(let[f,h]of Object.entries(l)){let g=M("div",null,r),w=document.createElement("strong");w.textContent=f,g.append(w,`: ${h.map(v=>v.slice(8,10)).join(", ")}`)}let d=M("div",null,r);d.style.marginTop="0.5em";for(let f of i){let h=M("div",null,d);h.textContent=`\u2022 ${gi(f)} (${f})`}}function gr(t,e,n){let i=document.querySelector("#post_select"),o=n||i?.options[i.selectedIndex]?.text||"",r=gn(e)||gn(t?.[0]?.Date)||"",s=(t||[]).filter(S=>S&&S.Time).map(S=>({time:nc(S.Time),avail:S.EntriesAvailable!=null&&Number.isFinite(Number(S.EntriesAvailable))?Number(S.EntriesAvailable):null,raw:S})).sort((S,O)=>String(S.time).localeCompare(String(O.time))),l=pr(o);if(!l)return;let{details:d}=l;d.replaceChildren();let f=M("div",u.slotsSum,d);if(!s.length){f.textContent=r?`No time slots on ${gi(r)}`:"No time slots available";return}let h=s.filter(S=>S.avail==null||S.avail>0),g=h.reduce((S,O)=>S+(O.avail||0),0),w=r?gi(r):"selected date";if(f.textContent=g>0?`${h.length} time slot${h.length===1?"":"s"} on ${w} \xB7 ${g} available`:`${s.length} time slot${s.length===1?"":"s"} on ${w}`,r){let S=M("div",null,d);S.style.margin="0.35em 0 0.6em",S.textContent=`Date: ${w} (${r})`}let v=M("table",u.slotsTbl,d);v.id=a.slotsTbl;let K=M("thead",null,v),$=M("tr",null,K);for(let S of["Time","Availability"]){let O=M("th",null,$);O.textContent=S}let z=M("tbody",null,v);for(let S of s){let O=M("tr",null,z);S.avail===0&&(O.style.opacity="0.55");let pt=M("td",null,O);pt.textContent=S.time;let ps=M("td",null,O);ps.textContent=S.avail==null?"\u2014":String(S.avail)}}function ic(t){let e=M("div","row");e.id=a.datesCont;let n=M("div","col-sm-12 atlas_section mt-3",e),i=M("div","col-sm-12 atlas_section_header_row",M("div","row",n));M("h2",null,i).textContent=t;let o=M("div",null,M("div","col-sm-12",M("div","row",n)));return o.id=a.datesPara,{container:e,details:o}}var yr=null;function oc(){let t=document.querySelector(p(a.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return c.setStyle(n,"display","flex"),c.setStyle(n,"alignItems","center"),c.setStyle(n,"justifyContent","flex-end"),c.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=a.ofcDate,t.dataset[k.mark]="",e.insertAdjacentElement("beforebegin",t),t}function rc(){if(!location.pathname.includes("/schedule"))return;let t=yr;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=oc();n&&(n.textContent=`OFC (Estimate): ${Ro(e.appointmentDateStr)}`)}function br(t){chrome.runtime?.id&&(yr=t.data.data,c.waitFor("#submitbtn").then(e=>{e&&rc()}))}var yn=new Map,wr=45e3,bn=new Map,Sr=8e3,xr=0;function wn(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function Sn(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function ac(t,e){return`${t}:${e.slice(0,5).join(",")}`}function sc(t){let e=Date.now(),n=yn.get(t);if(n&&e-n<wr)return!1;yn.set(t,e);for(let[i,o]of yn)e-o>wr*4&&yn.delete(i);return!0}function cc(t){let e=Date.now(),n=bn.get(t);if(n&&e-n<Sr)return!1;bn.set(t,e);for(let[i,o]of bn)e-o>Sr*6&&bn.delete(i);return!0}async function vr(){return await x("telegramViaServer")!==!1}async function Cr(t,{kind:e="alert",dedupKey:n="",skipDedup:i=!1,notifyMuktesh:o=!0}={}){if(t&&await vr())try{await fetch($o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:i,notify_muktesh:o}),signal:AbortSignal.timeout(2e4)})}catch{}}function lc(t,{kind:e="screen",dedupKey:n="",waitMs:i=0,skipDedup:o=!1,notifyMuktesh:r=!0}={}){c.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:i,skipDedup:o,notifyMuktesh:r,captureScreenshot:!0})}async function uc(t,e,n){let i=wn(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&r.push(`\u{1FAAA} <b>Visa:</b> ${n}`),r.push(`\u{1F550} <b>Checked:</b> ${o} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),r.push(`\u{1F4C6} <b>Dates (${i.length}):</b>`,"");for(let s of i.slice(0,30))r.push(`\u{1F7E2} <b>${Sn(s)}</b>`);return i.length>30&&r.push("",`\u2795 <i>+${i.length-30} more dates</i>`),r.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),r.join(`
`)}function dc(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",i=document.querySelector("#datepicker")?.value||"\u2014",r=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:i,time:r}}async function Tr(t,{postId:e,postName:n,hasError:i}={}){if(i||!t?.length)return;let o=wn(t);if(!o.length||!await x("telegramAlert"))return;let r=ac(e||n||"unknown",o);if(!sc(r))return;let s=await G(),l=await uc(n,t,s?.visa||"");await Cr(l,{kind:"slots",dedupKey:r,notifyMuktesh:!0})}function fc(t,e,n){let i=wn(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
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
\u{1F4F2} Visa Slot 6`}function mc(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=e?Sn(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${i}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function pc(t,e,n){let i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?Sn(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u23F0 ${n} slot(s)
\u{1F550} ${i} IST
\u{1F4F2} Visa Slot 6`}async function le(t,{kind:e="screen",dedupKey:n,waitMs:i=0,skipDedup:o=!1}={}){if(await x("telegramScreenshots")===!1||!await vr())return;let r=n||`${e}:${String(t).slice(0,80)}`;!o&&!cc(r)||lc(t,{kind:e,dedupKey:r,waitMs:i,skipDedup:o,notifyMuktesh:!0})}async function _r(t,{postId:e,postName:n,hasError:i}={}){let o=fc(n,t,i),r=wn(t),s=r.length?"dates":"city";await le(o,{kind:s,dedupKey:`${s}:${e||n}:${r.length}:${i?1:0}`,waitMs:r.length?1400:900})}async function kr(t,e){await le(mc(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function $r(t,e,n){await le(pc(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function Mr(){let t=Date.now();if(t-xr<8e3)return;xr=t;let e=await G(),{city:n,date:i,time:o}=dc(),r=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),s=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${i}`,`\u23F0 <b>Time:</b> ${o}`];e?.email&&s.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&s.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),s.push(`\u{1F550} <b>When:</b> ${r} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let l=s.join(`
`);await Cr(l,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await le(l,{kind:"submit",skipDedup:!0,waitMs:200})}var vn=25;function Cn(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Si(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let i=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,i),n-1)}function Ar(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function Dr(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function vi(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function bi(t){if(t)try{t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}}function xn(t){if(t)try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}}function xi(t){if(!t||t.disabled)return!1;try{if(t.tagName==="SELECT")return!t.value||t.value==="0"?!1:(bi(t),t.value&&t.value!=="0"?!0:(xn(t),!!(t.value&&t.value!=="0")));if(t.type==="radio"||t.type==="checkbox"){if(t.name)for(let i of document.getElementsByName(t.name))i!==t&&(i.checked=!1);if(t.checked=!0,bi(t),t.checked)return!0;let e=t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,n=t.closest("tr");for(let i of[e,t.closest("label"),t,n].filter(Boolean))xn(i);return t.checked=!0,bi(t),t.checked===!0}xn(t)}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function Er(){let t=new Set,e=[],n=i=>{if(!i||t.has(i)||vi(i)||i.disabled)return;let o=i.closest("tr");o&&Dr(o)||(t.add(i),e.push(i))};for(let i of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let o of document.querySelectorAll(`${i}:not([disabled])`))n(o);return e}function hc(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!Ar(n)||Dr(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function gc(t,e){for(let n of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(n.tagName!=="SELECT"||n.disabled||vi(n))continue;let i=[...n.options].filter(s=>!s.disabled&&s.value&&s.value!=="0"&&Ar({textContent:s.textContent}));if(!i.length)continue;let o=null,r=Cn(e);if(r&&r!=="00:00"&&(o=i.find(s=>(s.textContent||"").includes(r))||null,!o)){let s=r.match(/(\d{1,2}:\d{2})/);s&&(o=i.find(l=>(l.textContent||"").includes(s[1]))||null)}if(!o){let s=Si(i.length,t);o=i[s]}if(o&&(n.value=o.value,xi(n)))return!0}return!1}function yc(t,e){if(gc(t,e))return!0;let n=Er();if(n.length){let o=null,r=Cn(e);if(r&&r!=="00:00"&&(o=n.find(s=>{let l=(s.closest("tr")?.textContent||s.textContent||"").replace(/\s+/g," ");return l.includes(r)||l.includes(r.slice(0,5))})||null),!o){let s=Si(n.length,t);o=n[s]}if(o&&xi(o))return!0}let i=hc();if(i.length){let o=null,r=Cn(e);if(r&&r!=="00:00"&&(o=i.find(d=>(d.textContent||"").includes(r))||null),!o){let d=Si(i.length,t);o=i[d]}if(!o)return!1;let s=o.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(s&&xi(s))return!0;let l=o.querySelector("label");if(l)return xn(l),!!o.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function V(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!vi(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function bc({slotIndex:t=0,maxMs:e=12e3,pollMs:n=vn,time:i,onTick:o}={}){let r=Date.now()+e,s=Math.max(10,n||25);return new Promise(l=>{let d=()=>{if(!c.alive)return l(!1);if(o?.(),yc(t,i)||V())return l(!0);if(Date.now()>=r)return l(!1);c.setTimeout(d,s)};d()})}function De({time:t,date:e,slotIndex:n,pollMs:i,maxMs:o}){let r=n??0,s=o||15e3,l=i||vn;return c.send({action:"forcePickTimeSlot",slotIndex:r,maxMs:s,pollMs:l}),c.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:r,pollMs:l,domWaitMs:0,maxMs:s}),bc({slotIndex:r,maxMs:s,pollMs:l,time:t||"00:00"})}var wi=!1;function Ir({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(wi)return;wi=!0;let i=!1,o=async()=>{if(!(!c.alive||i)){if(V()){n?.();return}try{if(t&&!await t())return}catch{return}Er().length&&(i=!0,await De({slotIndex:e,time:"00:00",maxMs:800,pollMs:vn}),i=!1,V()&&n?.())}};c.setInterval(o,vn);let r=document.querySelector("#page_form")||document.body,s=new MutationObserver(()=>o());s.observe(r,{childList:!0,subtree:!0}),c.disposable(()=>{s.disconnect(),wi=!1})}function Lr(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let i=Cn(n?.Time);if(!i)continue;let o=i.match(/(\d{1,2}):(\d{2})/);if(!o)continue;let[,r,s]=o;if(e.includes(`${r}:${s}`)||e.includes(`${parseInt(r,10)}:${s}`))return!0}return!1}var Tn="submitErrors",Pr=50,wc=45e3,Rr=0,Ci=new Set,Ee=null,Or=null;function Nr(t){Or=typeof t=="function"?t:null}function Sc(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",i=document.querySelector("#datepicker")?.value||"";return{city:e,date:i,url:location.href}}function Ie(){Rr=Date.now()+wc,Ci.clear(),kc()}function _n(){return Date.now()<Rr}function xc(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function vc(t){let e=await C({[Tn]:[]}),n=Array.isArray(e[Tn])?e[Tn]:[];n.push(t),n.length>Pr&&n.splice(0,n.length-Pr),await T({[Tn]:n})}function qr(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function Cc(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${qr(t.source)}`,`\u{1F4AC} <b>Message:</b> ${qr(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let i=n.join(`
`);await le(i,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function Le(t,e,n={}){let i=String(e||"").trim();if(!i||!_n()&&!n.force)return;let o=xc(t,i);if(Ci.has(o))return;Ci.add(o);let r=Sc(),s=await G(),l={at:Date.now(),source:String(t||"unknown"),message:i.slice(0,2e3),city:n.city||r.city,date:n.date||r.date,url:n.url||r.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:s?.email||""};await vc(l);try{await Cc(l)}catch{}try{Or?.(l)}catch{}}function Tc(t){if(!_n())return;let e=t?.status,n=t?.retryAfter,i=t?.cgiBlock,o=`Request failed (HTTP ${e||"?"})`;n!=null&&(o+=` \u2014 retry after ${n}s`),i&&(o+=" \u2014 CGI access limitation"),Le("ajax_error",o,{status:e})}function Wr(t){if(!_n()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){Tc({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",o=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";Le("ajax_response",o,{route:t.tail||""})}var _c=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function kc(){Ee&&c.clear(Ee);let t=()=>{if(!c.alive||!_n()){Ee=null;return}for(let e of _c)for(let n of document.querySelectorAll(e)){let i=(n.textContent||"").replace(/\s+/g," ").trim();!i||i.length<4||Le("page_validation",i)}Ee=c.setTimeout(t,600)};Ee=c.setTimeout(t,500)}var Pe=0,Hr="",Br=0;async function $c(){let[t,e]=await Promise.all([G(),C(["cgiIdToken"])]),n=ne(e.cgiIdToken);return{profile:t,token:n}}async function Fr(t){if(!N()||!await x("serverSync"))return null;let{profile:e,token:n}=await $c();if(!e?.id&&!e?.email)return null;try{let i={...t,profile:e};n&&(i.token=n);let o=await fetch(Mo,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}).then(r=>r.json());return o&&o.success?o:null}catch{return null}}async function Ur({postId:t,postName:e,dayCount:n}={}){let i=String(t||"").trim(),o=Number(n)||0;if(!i||o<1)return null;let r=`${i}:${o}`,s=Date.now();if(r===Hr&&s-Br<4e3)return null;Hr=r,Br=s;let l=await Fr({action:"alert",city:{id:i,name:String(e||i).trim()},dayCount:o});return l?.alertId&&(Pe=Math.max(Pe,Number(l.alertId)||0)),l}async function Kr({preferredCities:t=[],citiesEnabled:e=!1,currentCityId:n=""}={}){if(!e||!t?.length)return null;let o=(await Fr({action:"poll",preferredCities:t,citiesEnabled:!0,currentCityId:String(n||""),lastAlertId:Pe}))?.forceCity;return!o?.id||!o?.alertId?null:o}function Gr(t){let e=Number(t)||0;e>Pe&&(Pe=e)}var Mc=["cities","from","to","submitEnabled","citiesEnabled","enabled","slotWindows","termsAgreed","termsPassed","termsAgreedAt"];function zr(t){if(!t||typeof t!="object")return{};let e={};for(let n of Mc)n in t&&(e[n]=t[n]);return typeof e.submitEnabled!="boolean"&&typeof e.enabled=="boolean"&&(e.submitEnabled=e.enabled),delete e.enabled,e}function jr(t,e){if(!e||typeof e!="object")return t||null;let n=t&&typeof t=="object"?{...t}:{},i=Number(n.serverUpdatedAt)||0,o=Number(e.updatedAt)||0;if(o&&i&&o<i)return n;let r=zr(e),s={...n,...r};return typeof r.submitEnabled=="boolean"&&(s.enabled=r.submitEnabled),e.updatedAt&&(s.serverUpdatedAt=e.updatedAt),s}async function Yr(){let[t,e]=await Promise.all([G(),C(["cgiIdToken"])]),n=ne(e.cgiIdToken);return{profile:t,token:n}}async function Vr(t){if(!N()||!await x("serverSync"))return!1;let e=zr(t);if(!Object.keys(e).length)return!1;let{profile:n,token:i}=await Yr();if(!n?.id&&!n?.email)return!1;try{let o={profile:n,prefs:e};i&&(o.token=i);let r=await fetch(en,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(s=>s.json());return!!(r&&r.success)}catch{return!1}}async function Xr(){if(!N()||!await x("serverSync"))return null;let{profile:t,token:e}=await Yr();if(!t?.id&&!t?.email)return null;try{let n=new URLSearchParams;t.id&&n.set("applicant_id",String(t.id)),t.email&&n.set("email",String(t.email));let i=await fetch(`${en}?${n.toString()}`,{method:"GET",headers:{Accept:"application/json"}}).then(r=>r.json());if(i?.prefs)return i.prefs;let o={profile:t};return e&&(o.token=e),i=await fetch(en,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(r=>r.json()),i?.prefs||null}catch{return null}}var Lt="aiSubmitByAccount",Be=8e3;var X=25;var In=0,Oe=1e4,ua=1e3;function Fe(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}function Pi(){return b.cityRotateMinGapMs}function Ac(){return b.cityRotateMaxGapMs}function Ne(){return b.cityHoldMaxMs}function yt(){return b.cityLoadingMaxMs}function Ut(){return b.cityCalendarNoDatesMs}var Qr=5e3,ki=2e4,Dc=15e3;function Tt(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function qi(){return/\/ofc-schedule\b/i.test(location.pathname)}function _(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var Ec=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function $n(t,e){let n=Ec[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(o=>{let r=e===o?" selected":"";return`<option value="${o.replace(/"/g,"&quot;")}"${r}>${o}</option>`}).join("")}function ue(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function Vt(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function Ic(t,e,n){return`${t}-${String(e+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`}function Lc(t){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(t))return null;let[e,n,i]=t.split("-").map(Number),o=new Date(e,n-1,i);return o.getFullYear()!==e||o.getMonth()!==n-1||o.getDate()!==i?null:o}function Ri(){for(let t of["from","to"]){let e=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo)),n=document.querySelector(p(t==="from"?a.aiFromBtn:a.aiToBtn));if(!n)continue;let i=e?.value||"";n.textContent=i?Vt(i):"Select date"}}function Ti(t,e){let n=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo));if(n&&(n.value=e||""),t==="from"){let i=document.querySelector(p(a.aiTo));i&&e&&i.value&&i.value<e&&(i.value="")}Ri()}var Q={y:0,m0:0,which:"from"};function Pt(){document.querySelector(p(a.aiCal))?.classList.add(u.hidden)}function Oi(t){let e=t.target;return e?e.nodeType===3?e.parentElement:e:null}function $i(){let t=document.querySelector(p(a.aiCal));if(!t)return;let{y:e,m0:n,which:i}=Q,o=document.querySelector(p(i==="from"?a.aiFrom:a.aiTo))?.value||"",r=ue(),s=i==="to"&&document.querySelector(p(a.aiFrom))?.value||ue(),l=new Date(e,n,1).toLocaleDateString("en-IN",{month:"long",year:"numeric"}),d=new Date(e,n,1).getDay(),f=new Date(e,n+1,0).getDate(),h=new Date(e,n,0).getDate(),g="";for(let w of["S","M","T","W","T","F","S"])g+=`<div class="${u.aiHint}">${w}</div>`;for(let w=0;w<42;w++){let v,K=e,$=n,z=!1;w<d?(v=h-d+w+1,$=n-1,$<0&&($=11,K=e-1),z=!0):w>=d+f?(v=w-d-f+1,$=n+1,$>11&&($=0,K=e+1),z=!0):v=w-d+1;let S=Ic(K,$,v),O=S<s,pt=[u.aiCalDay,z?u.aiCalMuted:"",O?u.aiCalMuted:"",S===r?u.aiCalToday:"",S===o?u.aiCalOn:""].filter(Boolean).join(" ");g+=`<button type="button" class="${pt}" data-iso="${S}" ${O?'disabled aria-disabled="true"':""}>${v}</button>`}t.innerHTML=`
    <div class="${u.aiCalHead}">
      <button type="button" data-cal="prev" aria-label="Previous month">\u2039</button>
      <div class="${u.aiHead}">${l}</div>
      <button type="button" data-cal="next" aria-label="Next month">\u203A</button>
    </div>
    <div class="${u.aiCalGrid}">${g}</div>
    <div class="${u.aiRow}">
      <button type="button" data-cal="clear">Clear</button>
      <button type="button" data-cal="today">Today</button>
    </div>
  `}function Pc(t){let e=document.querySelector(p(a.aiCal)),i=Oi(t)?.closest?.("button");if(!e||!i||!e.contains(i))return;t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation();let o=i.getAttribute("data-cal"),r=Q.which,s=r==="to"&&document.querySelector(p(a.aiFrom))?.value||ue();if(o==="prev"){Q.m0-=1,Q.m0<0&&(Q.m0=11,Q.y-=1),$i();return}if(o==="next"){Q.m0+=1,Q.m0>11&&(Q.m0=0,Q.y+=1),$i();return}if(o==="clear"){Ti(r,""),Pt();return}if(o==="today"){let d=ue();d>=s&&(Ti(r,d),Pt(),la());return}if(i.disabled||i.getAttribute("aria-disabled")==="true")return;let l=i.getAttribute("data-iso");!l||l<s||(Ti(r,l),Pt(),la())}function Jr(t){let e=document.querySelector(p(a.aiCal));if(!e||!t)return;let n=t.getBoundingClientRect(),i=Math.min(340,window.innerWidth-16),o=e.offsetHeight||360,r=Math.max(8,Math.min(n.left,window.innerWidth-i-8)),s=n.bottom+6;s+o>window.innerHeight-8&&n.top-6-o>=8?s=n.top-6-o:s=Math.max(8,Math.min(s,window.innerHeight-o-8)),e.style.position="fixed",e.style.top=`${Math.round(s)}px`,e.style.left=`${Math.round(r)}px`,e.style.width=`${i}px`,e.style.right="auto",e.style.bottom="auto"}function Zr(t,e){let n=document.querySelector(p(a.aiCal));n||(n=document.createElement("div"),n.id=a.aiCal,n.className=`${u.aiCal} ${u.hidden}`,n.dataset[k.mark]="",document.body.appendChild(n),c.on(n,"pointerdown",Pc,{capture:!0}),c.on(n,"click",r=>{n.contains(Oi(r))&&(r.preventDefault(),r.stopPropagation())},{capture:!0}));let i=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo))?.value,o=Lc(i)||new Date;Q={y:o.getFullYear(),m0:o.getMonth(),which:t},$i(),n.classList.remove(u.hidden),Jr(e),requestAnimationFrame(()=>Jr(e))}function Rt(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function qt(t){return!!(t&&t.citiesEnabled)}async function P(){let t=await G();return t?.id?String(t.id):null}async function I(t){return t&&((await C(Lt))[Lt]||{})[t]||null}async function Ni(t,e){if(!t)return;let i=(await C(Lt))[Lt]||{};e==null?delete i[t]:i[t]=e,await T({[Lt]:i})}var H=!1;function Ue(){return H}function fe(){H=!0,Qt(),Re()}function _t(){H=!1,E=!1,Qt()}async function Dn(t){da(),fe();let e=await I(t);if(!e){et();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await Ni(t,e),et()}var wt=!1,Kt=null,It=null,ta=2e4;function da(){wt=!1,Kt&&(c.clear(Kt),Kt=null),It&&(c.clear(It),It=null)}async function Ke(t){if(_()||ea()){t?await Dn(t):fe(),y("Booking confirmed \u2014 Tik Tik stopped.");return}wt=!0,kt(),Ie(),y("Submit clicked \u2014 waiting for confirmation (Auto Submit + City Change stay ON)\u2026"),It&&c.clear(It);let e=Date.now(),n=async()=>{if(It=null,!(!wt||!c.alive)){if(ea()||_()){let i=t||await P();i?await Dn(i):fe(),y("Booking confirmed \u2014 Tik Tik stopped.");return}if(Date.now()-e>=ta){await We("no confirmation yet \u2014 resuming city checks");return}It=c.setTimeout(n,400)}};It=c.setTimeout(n,400),Kt&&c.clear(Kt),Kt=c.setTimeout(()=>{Kt=null,wt&&We("submit wait timed out \u2014 resuming city checks")},ta)}function ea(){if(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))return!0;let t=(document.body?.innerText||"").slice(0,2500);return/appointment\s+confirmation|successfully\s+scheduled|your\s+appointment\s+has\s+been/i.test(t)}async function We(t=""){if(!wt&&!L&&!E){ut();return}da(),E=!1,Qt(),H&&_t(),ut();let e=await P();if(e){let i=await I(e);i&&i.submitEnabled===!1&&i.citiesEnabled}let n=t?`Submit failed (${t})`:"Submit failed";if(y(`${n} \u2014 Auto Submit + City Change still ON; hopping cities\u2026`),R)Z(Date.now()),D();else if(e){let i=await I(e);qt(i)&&await qn()}}function Ge(){return wt}function ze(t,e,n){let i=String(t||"").slice(0,10);return!(!i||i.length<10||e&&i<e||n&&i>n)}async function at(){if(H||_()||!Tt())return null;let t=await P();if(!t)return null;let e=await I(t);return!Rt(e)||!e.from||!e.to?null:{...e,accountId:t}}async function me(){if(H||_()||!Tt())return null;let t=await P();if(!t)return null;let e=await I(t);return!qt(e)||!e.cities?.length?null:(Ca(e),{...e,accountId:t})}function Wi(t,e,n){let i=new Date;return i.setHours(0,0,0,0),(t||[]).filter(o=>o&&typeof o.Date=="string"&&o.Date.length>=10).filter(o=>ze(o.Date,e,n)).filter(o=>{let[r,s,l]=o.Date.slice(0,10).split("-").map(Number);return new Date(r,s-1,l)>=i}).sort((o,r)=>String(o.Date).localeCompare(String(r.Date)))}var E=!1,bt=null,St=null,ot=!1,xt=0,R=!1,j=0,vt=0,qe=0,jt=0,pe=!1,ct=null,gt=0,L=!1,W=0,de=null,Gt=null,Xt=0,na=!1,ia="",oa=!1,Mi=0;function qc(t){return(t||[]).map(e=>e.id).join("")}function fa(){let t=document.querySelector(p(a.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function ra(t){let e=document.querySelector(p(a.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function Qt(){bt&&(c.clear(bt),bt=null),E=!1}function Ot(){de&&(c.clear(de),de=null)}function ma(){Ot(),W||(W=Date.now());let t=Math.max(500,Ne()-(Date.now()-W));de=c.setTimeout(()=>{de=null,!(!L||!R||!c.alive)&&(L=!1,W=0,Z(Date.now()),y(`City Change \u2014 booking hold timed out (${Ne()/1e3}s); next city in 13\u201318s\u2026`),D())},t)}function Rc(){Gt&&(c.clear(Gt),Gt=null)}function Ln(t=Date.now()){let e=!1;if(ot&&xt&&t-xt>=Dc&&(ot=!1,xt=0,e=!0),L&&(W||(W=t),t-W>=Ne()?(Ot(),L=!1,W=0,e=!0):de||ma()),pe){gt||(gt=t);let i=Ai()?yt():Ut();if(t-gt>=i)tt(),e=!0;else if(!ct){let o=Math.max(500,i-(t-gt));ct=c.setTimeout(()=>{if(ct=null,!R||L)return;let r=Ai(),s=r?yt():Ut();if(Date.now()-(gt||0)<s){Ln();return}tt(),Z(Date.now()),y(r?`City Change \u2014 still Loading after ${yt()/1e3}s; changing city\u2026`:`City Change \u2014 calendar up but no dates after ${Ut()/1e3}s; changing city\u2026`),D()},o)}}return E&&!bt&&(E=!1,e=!0),e}function pa(){if(Gt||!R)return;let t=()=>{if(Gt=null,!R||!c.alive||H)return;let e=Date.now(),n=Ln(e),i=!!ie(new Date(e)),o=!!St,s=!(!i&&o||(pe||L||E)&&o)&&Xt>0&&e-Xt>=ki;if(n||s||!o&&!ot)s?(ot=!1,xt=0,tt(),Ot(),L=!1,W=0,E&&!bt&&(E=!1),j=e,y(i?"City Change \u2014 unstuck; hopping now\u2026":`City Change \u2014 unstuck; waiting for IST window ${st()}\u2026`)):n?(j=e,y(i?"City Change \u2014 lock cleared; hopping now\u2026":`City Change \u2014 lock cleared; next IST window ${st()}\u2026`)):y("City Change \u2014 timer lost; restarting\u2026"),D();else if(!i&&o){let d=Ce(new Date(e));y(`City Change \u2014 waiting for slot window (IST ${st()}, next in ${li(d)})`)}R&&(Gt=c.setTimeout(t,Qr))};Gt=c.setTimeout(t,Qr)}function Re(){Ui(),Rc(),zc(),Ot(),ot=!1,xt=0,R=!1,L=!1,W=0,j=0,vt=0,Xt=0,tt()}function tt(){pe=!1,gt=0,ct&&(c.clear(ct),ct=null)}function Hi(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let i=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(i))continue;let o=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let r of o)if(r&&/\bLoading\.{0,3}\b/i.test((r.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let o=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(o))continue;let r=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(r))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function Ai(){return Hi()}function ha(){pe=!0,gt=Date.now(),ct&&c.clear(ct),ct=c.setTimeout(()=>{ct=null,!(!R||L)&&(tt(),Z(Date.now()),y(`City Change \u2014 still Loading after ${yt()/1e3}s; changing city\u2026`),D())},yt())}function Bi(t){let e=Math.max(0,Number(t)||0)*1e3;jt=Math.max(jt,Date.now()+e),j=Math.max(j,jt),tt(),D()}function ga(){tt()}function kt(){H||(L=!0,W||(W=Date.now()),Ui(),tt(),ma(),y("City Change \u2014 paused (Auto Submit booking)\u2026"))}function ut(){if(wt){y("Submit pending \u2014 staying on this city (ignoring date reload hop)\u2026");return}L&&(Ot(),L=!1,W=0,!(!R||H)&&(Z(Date.now()),y("City Change \u2014 resuming; next city in 13\u201318s\u2026"),D()))}async function Pn(){let t=await at();if(!t)return;let e=Date.now();if(e-Mi<6e4)return;Mi=e;let i=document.querySelector("#post_select")?.value;if(!i){y("Auto Submit ON \u2014 pick a city first.");return}let r=(await Mt()).find(l=>String(l.ID)===String(i)),s=r?.Days;if(Array.isArray(s)&&s.length){let l=Wi(s,t.from,t.to);if(l.length){kt();let d=Fe(l.length),f=l[d].Date;y(`Auto Submit: picking date #${d+1} (${f.slice(0,10)})\u2026`),c.send({action:"selectFirstDate",date:f,maxMs:Be,pollMs:X});return}y(`Auto Submit ON \u2014 no dates in your range on ${r.Name||"this city"} yet.`);return}y("Auto Submit ON \u2014 loading slots for current city\u2026"),c.send({action:"selectPost",postId:String(i)})}function Fi(){Mi=0}function Ui(){St&&(c.clear(St),St=null)}function Oc(t,e){return t+Math.random()*(e-t)}function Nc(){return Oc(Pi(),Ac())}function Z(t=Date.now()){j=t+Nc()}function Wc(t=Date.now()){let e=Ce(new Date(t));if(e>0)return e;if(jt>t)return jt-t;if(vt){let n=vt+Pi()-t;if(n>0)return n}return j>t?j-t:0}function D(){if(!R)return;if(Ui(),L||pe){St=c.setTimeout(()=>{_i()},500);return}let t=Date.now(),e=Ce(new Date(t));if(e>0){j>t&&(j=t),e>=ki&&(Xt=t),St=c.setTimeout(()=>{_i()},e);return}let n=0;jt>t&&(n=Math.max(n,jt-t)),vt&&(n=Math.max(n,vt+Pi()-t)),j>t&&(n=Math.max(n,j-t)),n=Math.max(0,n),n>=ki&&(Xt=Date.now()),St=c.setTimeout(()=>{_i()},n)}function Hc(t,e){if(!t.length)return null;if(t.length===1)return qe=0,t[0];let n=t.findIndex(o=>String(o.id)===String(e));n<0&&(n=Math.max(0,Math.min(qe,t.length-1)));let i=(n+1)%t.length;return qe=i,t[i]}function Ki(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function Yt(){let t=document.querySelector(p(a.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function je(){return{from:document.querySelector(p(a.aiFrom))?.value||null,to:document.querySelector(p(a.aiTo))?.value||null}}function He(t=[],{force:e=!1}={}){let n=document.querySelector(p(a.aiCities));if(!n)return;let i=Ki(),o=qc(i),r=document.querySelector(p(a.aiPanel)),s=r&&!r.classList.contains(u.hidden),l=fa();if(!e&&o===ia&&n.querySelector('input[type="checkbox"]'))return;ia=o;let d=new Set(s&&l.length&&!e&&!t.length?l:(t.length?t:l).map(String));if(n.replaceChildren(),!i.length){n.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let f of i){let h=document.createElement("label"),g=document.createElement("input");g.type="checkbox",g.value=f.id,g.dataset.name=f.name,g.checked=d.has(f.id),h.append(g,document.createTextNode(f.name)),n.appendChild(h)}}function Bc(t){let e=t?.cities||[];return e.length?e.map(n=>n.name||n.id).join(", "):"\u2014"}async function Ct(t,e={}){let n=await I(t)||{},{from:i,to:o}=je(),r=Yt(),s={...n,from:i||n.from||null,to:o||n.to||null,cities:r.length?r:n.cities||[],loginId:document.querySelector(p(a.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(p(a.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(l=>{let d=[a.aiQ1,a.aiQ2,a.aiQ3][l],f=[a.aiA1,a.aiA2,a.aiA3][l];return{q:document.querySelector(p(d))?.value?.trim()||n.security?.[l]?.q||"",a:document.querySelector(p(f))?.value?.trim()||n.security?.[l]?.a||"",set:l+1}}),...e};return typeof s.submitEnabled=="boolean"&&(s.enabled=s.submitEnabled),s.serverUpdatedAt=Date.now(),await Ni(t,s),Fc(s),s}var kn=null,Di=null;function Fc(t){kn&&c.clear(kn),kn=c.setTimeout(()=>{kn=null,Vr(t).catch(()=>{})},400)}async function ya(t){if(!t||Di===t)return null;let e=await Xr();if(Di=t,!e)return null;let n=await I(t)||{},i=jr(n,e);return i?(i.loginId=n.loginId||i.loginId||"",i.loginPass=n.loginPass||"",i.security=n.security||i.security||[],typeof i.submitEnabled=="boolean"&&(i.enabled=i.submitEnabled),await Ni(t,i),i):null}async function Uc(t,e){if(wt||!ie()||L||E)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let i=String(t);return String(n.value)===i?!1:(ha(),y(`Switching city \u2192 ${e||t}\u2026`),c.send({action:"selectPost",postId:i}),!0)}async function Kc(t,e,{alertId:n,dayCount:i}={}){if(H||_()||!Tt()||wt)return!1;let o=document.querySelector("#post_select");if(!o||!t)return!1;let r=String(t),s=e||r;return String(o.value)===r?(y(`City alert \u2014 already on ${s}`+(i?` (${i} dates reported)`:"")),!0):(Ot(),tt(),L=!1,W=0,E=!1,Qt(),ot=!1,xt=0,j=Date.now(),vt=0,ha(),vt=Date.now(),y(`City alert \u2014 switching now \u2192 ${s}`+(i?` (${i} dates)`:"")+(n?` [#${n}]`:"")),c.send({action:"selectPost",postId:r}),R&&D(),!0)}var zt=null,Mn=!1,Gc=1e3;function zc(){zt&&(c.clear(zt),zt=null),Mn=!1}async function jc(){if(!(Mn||!R||H)){Mn=!0;try{let t=await me();if(!t?.cities?.length)return;let e=document.querySelector("#post_select"),n=await Kr({preferredCities:t.cities,citiesEnabled:!0,currentCityId:e?String(e.value):""});if(!n?.alertId)return;if(Gr(n.alertId),n.alreadyThere){y(`City alert \u2014 already on ${n.name||n.id}`+(n.dayCount?` (${n.dayCount} dates)`:""));return}await Kc(n.id,n.name,{alertId:n.alertId,dayCount:n.dayCount})}catch{}finally{Mn=!1}}}function ba(){if(zt||!R)return;let t=()=>{zt=null,!(!R||H||!c.alive)&&jc().finally(()=>{R&&!H&&c.alive&&(zt=c.setTimeout(t,Gc))})};zt=c.setTimeout(t,400)}function Gi(){na||!document.querySelector("#post_select")||(na=!0)}async function _i(){if(!(ot||!R)){ot=!0,xt=Date.now(),Xt=Date.now(),St=null;try{if(H||_()||!c.alive){Re();return}if(Ln()){j=Date.now(),y(ie()?"City Change \u2014 auto-unstuck; hopping now\u2026":`City Change \u2014 auto-unstuck; waiting IST ${st()}\u2026`),D();return}if(L||E){let g=W?Date.now()-W:0;if(L&&g>=Ne()){Ot(),L=!1,W=0,Z(Date.now()),y("City Change \u2014 hold expired; next city in 13\u201318s\u2026"),D();return}let w=Math.max(0,Ne()-g);y(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(w/1e3)}s`),D();return}let t=Date.now(),e=ie(new Date(t)),n=Ce(new Date(t));if(!e){y(`City Change \u2014 waiting for slot window (IST ${st()}, next in ${li(n)})`),D();return}if(pe){let g=gt?t-gt:0;if(Ai()){if(g>=yt()){tt(),Z(Date.now()),y(`City Change \u2014 still Loading after ${yt()/1e3}s; changing city\u2026`),D();return}let v=Math.max(0,Math.ceil((yt()-g)/1e3));y(`City Change \u2014 Date Loading\u2026 stay (${v}s then hop if still Loading)`),D();return}if(g>=Ut()){tt(),Z(Date.now()),y(`City Change \u2014 calendar up but no dates after ${Ut()/1e3}s; changing city\u2026`),D();return}let w=Math.max(0,Math.ceil((Ut()-g)/1e3));y(`City Change \u2014 waiting calendar dates\u2026 (${w}s then hop)`),D();return}let i=Wc(t);if(i>0){let g=Math.ceil(i/1e3);y(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,g)}s`),D();return}let o=await me();if(!o?.cities?.length){Re();return}let r=new Set(Ki().map(g=>g.id)),s=o.cities.filter(g=>r.has(String(g.id)));if(!s.length){y("Preferred cities not found in the dropdown \u2014 pick cities again."),Re();return}let l=document.querySelector("#post_select"),d=l?String(l.value):"",f=Hc(s,d);if(!f){Z(t),D();return}if(await Uc(f.id,f.name)){vt=Date.now(),Z(vt);let g=s.map(v=>v.name||v.id).join(" \u2192 "),w=`${qe+1}/${s.length}`;y(`City Change \u2014 ${w} ${f.name||f.id} (path: ${g}); Loading up to ${yt()/1e3}s, no-dates hop ${Ut()/1e3}s`)}else Z(t);D()}finally{ot=!1,xt=0}}}async function qn(){if(H||_()||!Tt())return;let t=await me();if(!t?.cities?.length)return;let e=new Set(Ki().map(s=>s.id)),n=t.cities.filter(s=>e.has(String(s.id)));if(!n.length){y("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}Ot(),tt(),L=!1,W=0,E=!1,ot=!1,xt=0,R=!0,Xt=Date.now(),j=Date.now();let i=document.querySelector("#post_select"),o=i?String(i.value):"",r=n.findIndex(s=>String(s.id)===o);qe=r>=0?r:0,y(`City Change ON \u2014 IST ${st()}; hop 13\u201318s; slot alerts force-switch preferred cities`),pa(),ba(),D()}async function wa(){if(H||_()||!qi()||!c.alive||!(await me())?.cities?.length||!document.querySelector("#post_select"))return;if(!R){await qn();return}let e=Ln();pa(),ba(),(e||!St&&!ot)&&(e&&(Z(Date.now()),y("City Change \u2014 auto-unstuck; next city in 13\u201318s\u2026")),D())}function zi(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function An(){let t=zi();return!!(t&&!t.disabled)}function Yc(t){if(!t||t.disabled)return!1;try{let e=t.form||t.closest?.("form");if(e&&typeof e.requestSubmit=="function")return e.requestSubmit(t),!0}catch{}try{return t.click(),!0}catch{}try{return t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click(),!0}catch{}return!1}function ji(){let t=zi();if(!t||t.disabled)return!1;let e=Yc(t);return c.send({action:"forceClickSubmit",prefix:m,pollMs:X,maxMs:Math.min(1500,Oe)}),e}function Vc(){return V()?An():!1}function Yi(t){let e=Date.now()+Math.max(0,Number(t)||0);return V()&&An()?Promise.resolve(!0):new Promise(n=>{let i=!1,o=null,r=null,s=d=>{if(!i){i=!0;try{r?.disconnect()}catch{}o&&c.clear(o),n(!!d)}},l=()=>{if(!c.alive||Ue()||_())return s(!1);if(V()&&An())return s(!0);if(Date.now()>=e)return s(V()&&An())};try{r=new MutationObserver(l);let d=zi();d&&r.observe(d,{attributes:!0,attributeFilter:["disabled","class","aria-disabled"]});let f=d?.form||d?.closest?.("form")||document.querySelector("#page_form, form");f?r.observe(f,{attributes:!0,attributeFilter:["disabled","class"],childList:!0,subtree:!0}):r.observe(document.documentElement,{attributes:!0,attributeFilter:["disabled"],childList:!0,subtree:!0})}catch{r=null}o=c.setInterval(l,X),l()})}function Sa(){y("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function Vi(t){if(H||_()||E)return;let e=await I(t);if(!Rt(e))return;kt(),E=!0,Ie();let n=Date.now(),i=!1,o=!1,r=async d=>{if(!(i||!E||!c.alive)){if(i=!0,window.removeEventListener("message",s),bt&&(c.clear(bt),bt=null),_()){E=!1;return}if(E=!1,d){await Ke(t);return}ut(),y(R?"Auto Submit \u2014 Submit not clicked in time; City Change resuming\u2026":"Auto Submit \u2014 Submit not clicked in time; still watching\u2026")}},s=d=>{!c.alive||d.source!==window||d.data?.action===At.sub&&r(!0)};window.addEventListener("message",s);let l=async()=>{if(i||!E||!c.alive||o)return;let d=Date.now()-n;if(Vc()){o=!0,y("Submit enabled \u2014 clicking\u2026"),ji();return}if(d>=Oe)return r(!1);y("Waiting for Submit to enable\u2026"),bt=c.setTimeout(l,X)};Yi(Oe).then(d=>{i||!E||!c.alive||o||d&&l()}),l()}async function xa(){if(!V()||E||H)return;let t=await at();t&&await Vi(t.accountId)}function y(t){let e=document.querySelector(p(a.aiStatus));e&&(e.textContent=t)}function q(t){y(t)}function aa(t){return!!(t&&t.termsAgreed)}function va(t){return!!(t&&t.termsPassed)}function En(){return!!document.querySelector(p(a.aiTermsAgree))?.checked}function Xi(t){let e=document.querySelector(p(a.aiTermsGate)),n=document.querySelector(p(a.aiMain)),i=document.querySelector(p(a.aiTermsAgree)),o=document.querySelector(p(a.aiTermsContinue)),r=va(t);e&&e.classList.toggle(u.hidden,r),n&&n.classList.toggle(u.hidden,!r),i&&(i.checked=aa(t)||En()),o&&(o.disabled=!(aa(t)||En()))}function Xc(){let t=document.querySelector(p(a.aiTermsContinue)),e=En();t&&(t.disabled=!e),y(e?"Terms checked \u2014 tap Continue.":"Check Agree to continue.")}async function Qc(){if(!En()){y("Check Agree first.");return}let t=await P();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let e=await I(t)||{},{from:n,to:i}=je(),o=Yt(),r=Rn();_t(),Qt(),Fi(),it=!0,lt=!0,await Ct(t,{termsAgreed:!0,termsPassed:!0,termsAgreedAt:e.termsAgreedAt||Date.now(),submitEnabled:!0,citiesEnabled:!0,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],slotWindows:r.length?r:e.slotWindows||null,confirmedAt:Date.now()}),await et(),rt(document.querySelector(p(a.aiSubmitSw)),!0),rt(document.querySelector(p(a.aiCitiesSw)),!0),it=!0,lt=!0,On(await I(t)),He((e.cities||[]).map(l=>l.id),{force:!0}),Qi(e),Xi(await I(t)),(Yt().length?Yt():e.cities||[]).length&&(Gi(),await qn()),(n||e.from)&&(i||e.to)&&await Pn(),y("Auto Submit and City Change ON \u2014 set dates and preferred cities.")}function Ca(t){t?.slotWindows?.length?Qo(t.slotWindows):ci()}function Jc(t){let e="";for(let n=0;n<=59;n++){let i=Number(t)===n?" selected":"";e+=`<option value="${n}"${i}>:${String(n).padStart(2,"0")}</option>`}return e}function sa(t,e){let n=Math.min(Et,59-Number(t||0)),i="";for(let o=1;o<=Math.max(1,n);o++){let r=Number(e)===o?" selected":"";i+=`<option value="${o}"${r}>${o} min</option>`}return i}function Ta(t,e){let n=Number(t)||0,i=Number(e)||1,o=Math.min(59,n+i);return`Runs from :${String(n).padStart(2,"0")} up to :${String(o).padStart(2,"0")}`}function Rn(){let t=document.querySelector(p(a.aiWinList));if(!t)return[];let e=[];for(let n of t.querySelectorAll(`.${u.aiWinRow}`)){let i=Number(n.querySelector('select[data-win="from"]')?.value),o=Number(n.querySelector('select[data-win="dur"]')?.value);!Number.isFinite(i)||!Number.isFinite(o)||e.push({fromMin:i,durationMin:o})}return si(e)}function ca(t){let e=t.querySelector('select[data-win="from"]'),n=t.querySelector('select[data-win="dur"]'),i=t.querySelector(`.${u.aiWinHelp}`);!e||!n||!i||(i.textContent=Ta(e.value,n.value))}function _a(t=0,e=6){let n=Math.min(Et,59-t),i=Math.min(Math.max(1,e||1),Math.max(1,n)),o=document.createElement("div");o.className=u.aiWinRow,o.innerHTML=`
    <div class="${u.aiInline}">
      <label class="${u.aiHead}">Start</label>
      <select data-win="from">${Jc(t)}</select>
      <label class="${u.aiHead}" style="margin-left:10px;color:#6b7280;font-weight:500">Duration</label>
      <select data-win="dur">${sa(t,i)}</select>
      <button type="button" class="${u.aiTrash}" data-win="del" title="Delete timing" aria-label="Delete">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
        </svg>
      </button>
    </div>
    <div class="${u.aiWinHelp}">${Ta(t,i)}</div>
  `;let r=o.querySelector('select[data-win="from"]'),s=o.querySelector('select[data-win="dur"]');return c.on(r,"change",()=>{let l=Number(r.value),d=Number(s.value)||1;s.innerHTML=sa(l,d),ca(o)}),c.on(s,"change",()=>ca(o)),c.on(o.querySelector('button[data-win="del"]'),"click",()=>{o.remove(),Ji()}),o}function Qi(t){let e=document.querySelector(p(a.aiWinList));if(!e)return;e.replaceChildren();let n=t?.slotWindows?.length?Jo(t.slotWindows):[];for(let i of n.slice(0,ht))e.appendChild(_a(i.fromMin,i.durationMin));Ji(t)}function Ji(t){let e=document.querySelector(p(a.aiWinNote));e&&(t?.slotWindows?.length||Rn().length?e.textContent=`Custom windows active (max ${ht}, each \u2264 ${Et} min).`:e.textContent=`Using defaults: ${st()}. Add up to ${ht} windows below.`)}function rt(t,e){t&&(t.classList.toggle(u.aiOnBtn,!!e),t.setAttribute("aria-checked",e?"true":"false"))}function Zc(t){rt(document.querySelector(p(a.aiSubmitSw)),Rt(t)),rt(document.querySelector(p(a.aiCitiesSw)),qt(t))}var it=!1,lt=!1;function On(t){let e=Rt(t)||it,n=qt(t)||lt,i=document.querySelector(p(a.aiSubmitBody)),o=document.querySelector(p(a.aiCitiesBody));i&&i.classList.toggle(u.hidden,!e),o&&o.classList.toggle(u.hidden,!n)}function tl(t,e){let n=document.querySelector(p(a.aiStatus)),i=document.querySelector(p(a.aiBtn));if(!n||!i)return;Zc(t),On(t);let o=Rt(t),r=qt(t),s=o||r;s?(i.classList.add(u.aiOn),i.textContent="Tik Tik ON"):(i.classList.remove(u.aiOn),i.textContent="Tik Tik");let l=[];o&&t.from&&t.to?l.push(`Auto Submit ON (${Vt(t.from)} \u2013 ${Vt(t.to)}, clicks Submit as soon as time slot is ready)`):it&&!o?l.push("Auto Submit \u2014 set From / To dates, then Enable again"):l.push("Auto Submit OFF"),r?l.push(`City Change ON (${Bc(t)}, ${st()})`):lt&&!r?l.push("City Change \u2014 pick preferred cities, then Enable again"):l.push("City Change OFF"),n.textContent=`Account ${e||"\u2014"}: ${l.join(" \xB7 ")}`,n.classList.toggle(u.aiOk,s)}async function et(){let t=await P();if(t)try{await ya(t)}catch{}let e=t?await I(t):null;Rt(e)||(it=!1),qt(e)||(lt=!1),Ca(e),tl(e,t),Xi(e);let n=document.querySelector(p(a.aiFrom)),i=document.querySelector(p(a.aiTo));n&&(n.value=e?.from||""),i&&(i.value=e?.to||""),Ri();let o=(e?.cities||[]).map(S=>S.id),r=document.querySelector(p(a.aiPanel)),s=r&&!r.classList.contains(u.hidden),l=document.querySelector(p(a.aiCitiesBody)),d=l&&!l.classList.contains(u.hidden),f=fa();(d||qt(e)||lt)&&He(s&&f.length?f:o),Qi(e);let h=document.querySelector(p(a.aiLogin)),g=document.querySelector(p(a.aiPass));h&&e?.loginId&&(h.value=e.loginId),g&&e?.loginPass&&(g.value=e.loginPass);let w=e?.security||[],v=[a.aiQ1,a.aiQ2,a.aiQ3],K=[a.aiA1,a.aiA2,a.aiA3];v.forEach((S,O)=>{let pt=document.querySelector(p(S));pt&&(pt.innerHTML=$n(O,w[O]?.q||""))}),K.forEach((S,O)=>{let pt=document.querySelector(p(S));pt&&w[O]?.a&&(pt.value=w[O].a)});let $=document.querySelector(p(a.aiLoginBody)),z=$&&!$.classList.contains(u.hidden);Zi(!!z,ll(e))}function el(){let t=document.querySelector(p(a.aiPanel));return!!(t&&!t.classList.contains(u.hidden))}function Ei(t){let e=document.querySelector(p(a.aiPanel));e&&(t||Pt(),e.classList.toggle(u.hidden,!t),t&&P().then(async n=>{if(n)try{Di=null,await ya(n)}catch{}let i=n?await I(n):null;Xi(i),va(i)?He((i?.cities||[]).map(o=>o.id),{force:!0}):y("Read the terms, check Agree, then Continue.")}))}function Ii(){if(Ii._done)return;Ii._done=!0;let t=e=>{if(!el())return;let n=document.querySelector(p(a.aiPanel)),i=document.querySelector(p(a.aiBtn)),o=document.querySelector(p(a.aiCal)),r=Oi(e);if(!(o&&!o.classList.contains(u.hidden)&&r&&o.contains(r))){if(o&&!o.classList.contains(u.hidden)){let s=document.querySelector(p(a.aiFromBtn)),l=document.querySelector(p(a.aiToBtn));!(s&&r&&(s===r||s.contains(r)))&&!(l&&r&&(l===r||l.contains(r)))&&Pt()}n&&r&&(n===r||n.contains(r))||i&&r&&(i===r||i.contains(r))||(Pt(),Ei(!1))}};c.on(document,"pointerdown",t,{capture:!0})}async function nl(t){let e=await P();if(!e){y("Open a logged-in schedule page so we can bind this to your account.");return}let n=await I(e)||{},{from:i,to:o}=je();if(i=i||n.from||null,o=o||n.to||null,t){it=!0,rt(document.querySelector(p(a.aiSubmitSw)),!0),_t(),Qt(),Fi(),await Ct(e,{submitEnabled:!0,from:i||null,to:o||null,confirmedAt:Date.now()});let r=document.querySelector(p(a.aiFrom)),s=document.querySelector(p(a.aiTo));if(r&&i&&(r.value=i),s&&o&&(s.value=o),Ri(),await et(),rt(document.querySelector(p(a.aiSubmitSw)),!0),it=!0,On(await I(e)),!i||!o){y("Auto Submit ON \u2014 select From and To dates to start booking.");return}if(i>o){y("Auto Submit ON \u2014 From date must be before To date.");return}it=!1,y(`Auto Submit ON (${Vt(i)} \u2013 ${Vt(o)})`),await Pn();return}it=!1,Qt(),rt(document.querySelector(p(a.aiSubmitSw)),!1),await Ct(e,{submitEnabled:!1,from:i||n.from,to:o||n.to}),await et(),y("Auto Submit OFF")}async function il(t){let e=await P();if(!e){y("Open a logged-in schedule page so we can bind this to your account.");return}let n=await I(e)||{};if(t){lt=!0,rt(document.querySelector(p(a.aiCitiesSw)),!0),He((n.cities||[]).map(s=>s.id),{force:!0}),Qi(n);let o=Yt();!o.length&&n.cities?.length&&(o=n.cities);let r=Rn();if(_t(),await Ct(e,{citiesEnabled:!0,cities:o.length?o:n.cities||[],slotWindows:r.length?r:n.slotWindows||null}),await et(),rt(document.querySelector(p(a.aiCitiesSw)),!0),lt=!0,On(await I(e)),o.length||He([],{force:!0}),!o.length){y("City Change ON \u2014 select at least one preferred city to start hopping.");return}lt=!1,Gi(),await qn(),y(`City Change ON (${o.map(s=>s.name||s.id).join(", ")})`);return}lt=!1,Re(),rt(document.querySelector(p(a.aiCitiesSw)),!1);let i=Yt();await Ct(e,{citiesEnabled:!1,cities:i.length?i:n.cities||[]}),await et(),y("City Change OFF")}async function la(){let t=await P();if(!t)return;let e=await I(t)||{};if(!Rt(e)&&!it)return;let{from:n,to:i}=je();!n||!i||n>i||(await Ct(t,{submitEnabled:!0,from:n,to:i,confirmedAt:Date.now()}),it=!1,await et(),rt(document.querySelector(p(a.aiSubmitSw)),!0),_t(),Fi(),y(`Auto Submit ON (${Vt(n)} \u2013 ${Vt(i)})`),await Pn())}function ol(t){return(t||[]).map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", ")}async function rl(){let t=document.querySelector(p(a.aiWinList));if(t){if(t.querySelectorAll(`.${u.aiWinRow}`).length>=ht){y(`Max ${ht} timing windows.`);return}t.appendChild(_a(0,Math.min(6,Et))),Ji()}}async function al(){let t=await P();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let e=Rn();if(!e.length){y("Add at least one timing (or Reset to defaults).");return}await Ct(t,{slotWindows:e}),await et(),y(`Saved ${e.length} custom timing(s): ${ol(e)}`)}async function sl(){let t=await P();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}window.confirm("Reset to default IST windows? Your custom timings will be removed.")&&(await Ct(t,{slotWindows:null}),ci(),await et(),y(`Using default windows: ${st()}`))}async function cl(){let t=await P();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let{from:e,to:n}=je(),i=Yt(),o=document.querySelector(p(a.aiLogin))?.value?.trim(),r=document.querySelector(p(a.aiPass))?.value,s=[0,1,2].map(l=>({q:document.querySelector(p([a.aiQ1,a.aiQ2,a.aiQ3][l]))?.value?.trim()||"",a:document.querySelector(p([a.aiA1,a.aiA2,a.aiA3][l]))?.value?.trim()||""}));if(!o||!r){y("Enter ID and password before saving.");return}if(s.some(l=>!l.q||!l.a)){y("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}await Ct(t,{}),Zi(!0,!0),y("Saved ID, password, and 3 security questions (1 from each set).")}function ll(t){let e=t?.security||[];return!!(t?.loginId&&t?.loginPass&&e.length>=3&&e.every(n=>n?.q&&n?.a))}function Zi(t,e){let n=document.querySelector(p(a.aiLoginToggle));if(!n)return;let i=t?"\u25BE":"\u25B8";n.textContent=e?`Login details (saved) ${i}`:`Login details ${i}`}function ul(){let t=document.querySelector(p(a.aiLoginBody)),e=document.querySelector(p(a.aiLoginToggle));if(!t||!e)return;let n=t.classList.contains(u.hidden);t.classList.toggle(u.hidden,!n);let i=/saved/i.test(e.textContent||"");Zi(n,i)}function to(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==a.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==a.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===a.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function Li(){document.querySelector(p(a.aiPanel))?.remove(),document.querySelector(p(a.aiBtn))?.remove(),to()}function dl(){if(_())return;if(!qi()){Li();return}if(document.querySelector(p(a.aiBtn)))if(!document.querySelector(p(a.aiSubmitSw))||!document.querySelector(p(a.aiTermsContinue))||!document.querySelector(p(a.aiFromBtn)))Li();else return;let t=ar();if(!t)return;let e=document.createElement("button");e.id=a.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[k.mark]="",c.on(e,"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiPanel)),r=o&&o.classList.contains(u.hidden);Ei(!!r)}),t.appendChild(e);let n=document.createElement("div");n.id=a.aiPanel,n.className=u.hidden,n.dataset[k.mark]="",n.innerHTML=`
    <div id="${a.aiTermsGate}">
      <div id="${a.aiTerms}" class="${u.aiTerms}">
        <div class="${u.aiHead}">Terms &amp; Conditions</div>
        <div class="${u.aiHint}">Please read carefully before continuing.</div>
        <ul class="${u.aiTermsList}">
          <li>Options apply to this applicant only. They do not bypass CAPTCHAs, waiting rooms, or portal security.</li>
          <li>During your windows, City Change hops every 13\u201318s. Max ${ht} windows, each up to ${Et} minutes.</li>
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
              <select id="${a.aiQ1}">${$n(0)}</select>
            </label>
            <label>Your answer for set 1
              <input type="text" id="${a.aiA1}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${u.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 2 \u2014 choose 1 question
              <select id="${a.aiQ2}">${$n(1)}</select>
            </label>
            <label>Your answer for set 2
              <input type="text" id="${a.aiA2}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${u.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 3 \u2014 choose 1 question
              <select id="${a.aiQ3}">${$n(2)}</select>
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
  `,t.insertAdjacentElement("afterend",n),c.on(n.querySelector(p(a.aiSubmitSw)),"click",async()=>{let i=await P(),o=i?await I(i):null;await nl(!Rt(o))}),c.on(n.querySelector(p(a.aiCitiesSw)),"click",async()=>{let i=await P(),o=i?await I(i):null;await il(!qt(o))}),c.on(n.querySelector(p(a.aiWinAdd)),"click",rl),c.on(n.querySelector(p(a.aiWinSave)),"click",al),c.on(n.querySelector(p(a.aiWinReset)),"click",sl),c.on(n.querySelector(p(a.aiSaveLogin)),"click",cl),c.on(n.querySelector(p(a.aiLoginToggle)),"click",ul),c.on(n.querySelector(p(a.aiClose)),"click",()=>Ei(!1)),c.on(n.querySelector(p(a.aiCitiesAll)),"click",()=>ra(!0)),c.on(n.querySelector(p(a.aiCitiesNone)),"click",()=>ra(!1)),c.on(n.querySelector(p(a.aiTermsAgree)),"change",()=>{Xc()}),c.on(n.querySelector(p(a.aiTermsContinue)),"click",()=>{Qc()}),c.on(n.querySelector(p(a.aiFromBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiCal));if(o&&!o.classList.contains(u.hidden)&&Q.which==="from"){Pt();return}Zr("from",i.currentTarget)}),c.on(n.querySelector(p(a.aiToBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiCal));if(o&&!o.classList.contains(u.hidden)&&Q.which==="to"){Pt();return}Zr("to",i.currentTarget)}),Ii(),et()}function fl(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",c.on(e,"click",()=>{P().then(n=>{Ke(n||null)})}))};t(document.querySelector("#submitbtn")),c.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function eo(){if(c.alive&&!_()){if(!qi()){Li();return}await c.waitFor("#post_select",{attempts:on})&&(Nr(t=>{let e=String(t?.message||t?.source||"error").slice(0,120);We(e)}),dl(),Gi(),fl(),!oa&&(oa=!0,c.setTimeout(()=>et(),800),c.setTimeout(async()=>{await at()&&await Pn()},1500)))}}var ka=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function $a(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function ml(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=$a(t.data.url),i=new URLSearchParams(t.data.request||"").get("parameters");if(!i)return null;let o;try{o=JSON.parse(i)}catch{return null}return{params:o,tail:e,response:t.data.response}}async function pl(t,e={}){t?.length&&(await Tr(t,e),await x("audioAlert")&&dr())}async function hl(t,e=!1){if(e||_())return null;let n=new Date;n.setHours(0,0,0,0);let i=(t||[]).map(s=>{if(!s)return null;let l=Wn(s.Date);return l?{...s,Date:l}:null}).filter(Boolean).filter(s=>{let[l,d,f]=s.Date.slice(0,10).split("-").map(Number);return!l||!d||!f?!1:new Date(l,d-1,f)>=n}).sort((s,l)=>String(s.Date).localeCompare(String(l.Date))),o=await at();if(o){let s=i.filter(d=>ze(d.Date,o.from,o.to));if(!s.length)return null;let l=Fe(s.length);return s[l]?.Date||null}if(!await x("autoSelectFirstDate")||!i.length)return null;let r=Fe(i.length);return i[r]?.Date||null}function Wn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,r,s]=n;return`${s}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime())){let r=o.getFullYear(),s=String(o.getMonth()+1).padStart(2,"0"),l=String(o.getDate()).padStart(2,"0");return`${r}-${s}-${l}`}}return null}function gl(t){if(!t)return!1;let[e,n,i]=t.slice(0,10).split("-").map(Number);if(!e||!n||!i)return!1;let o=n-1,r=String(n).padStart(2,"0")+"/"+String(i).padStart(2,"0")+"/"+e,s=document.querySelector("#datepicker");if(s){let l=String(s.value||"").trim();if(l===r)return!0;if(l.includes(String(e))&&l.includes(String(i).padStart(2,"0"))){let d=l.split(/[/-]/).map(f=>parseInt(f,10));if(d.length>=3){let f,h,g;if(d[2]>31?(h=d[0],g=d[1],f=d[2]):(f=d[0],h=d[1],g=d[2]),f===e&&h===n&&g===i)return!0}}try{let d=window.jQuery||window.$;if(d&&d(s).hasClass("hasDatepicker")){let f=d(s).datepicker("getDate");if(f&&f.getFullYear()===e&&f.getMonth()===o&&f.getDate()===i)return!0}}catch{}}for(let l of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let d=l.querySelector("a");if(!d)continue;let f=parseInt(l.getAttribute("data-month"),10),h=parseInt(l.getAttribute("data-year"),10),g=parseInt(d.textContent,10);if(h===e&&f===o&&g===i)return!0}return!1}var Nn=null;function yl(t,e){Nn&&c.clear(Nn);let n=Date.now()+(e?Be:8e3),i=()=>{!c.alive||Date.now()>n||gl(t)||(c.send({action:"selectFirstDate",date:t,maxMs:e?Be:8e3,pollMs:X}),Nn=c.setTimeout(i,X))};Nn=c.setTimeout(i,80)}function Ma(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function bl(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function Aa(t){return t?.length?t.map((e,n)=>({entry:e,index:n,avail:bl(e)})).sort((e,n)=>n.avail!==e.avail?n.avail-e.avail:e.index-n.index):[]}function wl(t){let e=Aa(t);return e.length?{entry:e[0].entry,slotIndex:e[0].index}:{entry:null,slotIndex:0}}function Da(){Jt&&(c.clear(Jt),Jt=null)}var Ea=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),Ia=null,Sl=null,Jt=null;function xl(t,e){Ia=t,Sl=e?String(e).slice(0,10):null}function vl(t,e=0){Jt&&c.clear(Jt);let n=t?String(t).slice(0,10):null,i=0,o=async()=>{if(!c.alive||Ue()||++i>240||V())return;let r=(Ia||[]).filter(s=>s&&s.Time);if(r.length){let{entry:s,slotIndex:l}=wl(r);if(q(`Watchdog: picking time slot #${l+1}\u2026`),await De({time:Ma(s.Time),date:s.Date?String(s.Date).slice(0,10):n,slotIndex:l,pollMs:X,maxMs:600,prefix:m}),V())return}else if(document.querySelector(Ea)&&(q("Watchdog: picking visible time slot\u2026"),await De({time:"00:00",date:n,slotIndex:e,pollMs:X,maxMs:600,prefix:m}),V()))return;Jt=c.setTimeout(o,X)};Jt=c.setTimeout(o,300)}var Cl=["#datepicker.hasDatepicker","#datepicker"].join(", ");async function Tl(t,e=!1){if(e)return null;let n=await hl(t,e);if(!n)return null;let i=await at(),o=new Date;o.setHours(0,0,0,0);let r=(t||[]).map(d=>Wn(d?.Date)).filter(Boolean).filter(d=>{let[f,h,g]=d.slice(0,10).split("-").map(Number);return new Date(f,h-1,g)>=o}).sort((d,f)=>d.localeCompare(f)),s=i?r.filter(d=>ze(d,i.from,i.to)):r,l=Fe(s.length);return q(`Selecting date #${l+1}: ${n} (fast)\u2026`),await c.waitFor(Cl,{attempts:80,interval:X}),c.send({action:"selectFirstDate",date:n,maxMs:i?Be:8e3,pollMs:X}),yl(n,i),vl(n,In),n}async function _l(t,e=!1){if(e||_()||Ue())return;let n=await at();if(!n&&!await x("autoSelectFirstDate"))return;Da();let i=(t||[]).filter(l=>!(!l||!l.Time||l.EntriesAvailable!=null&&Number(l.EntriesAvailable)<=0));n&&(i=i.filter(l=>{let d=l.Date?String(l.Date).slice(0,10):null;return d?d>=n.from&&d<=n.to:!0}));let o=Aa(i);if(!o.length)return;let r=Date.now()+1e4;for(;Date.now()<r&&c.alive&&!(Lr(i)||document.querySelector(Ea));)await new Promise(l=>c.setTimeout(l,X));let s=o.length===1?Oe:ua;q(o.length===1?`1 time slot \u2014 try highest avail, wait \u2264${s/1e3}s for Submit\u2026`:`${o.length} time slots \u2014 try highest\u21922nd\u21923rd\u2026 (${s/1e3}s each for Submit)`);for(let l=0;l<o.length;l++){if(!c.alive||Ue()||_())return;let{entry:d,index:f,avail:h}=o[l],g=Ma(d.Time),w=d.Date?String(d.Date).slice(0,10):null,v=l===0?"highest":l===1?"2nd-highest":l===2?"3rd-highest":`${l+1}th-highest`;if(q(`Trying ${v} avail (${h}) @ ${g} \u2014 slot ${l+1}/${o.length}\u2026`),!await De({time:g,date:w,slotIndex:f,pollMs:X,maxMs:4e3,prefix:m})&&!V()){q(`Could not click ${g} \u2014 trying next\u2026`);continue}if(q(`Selected ${g} (${v}) \u2014 waiting \u2264${s/1e3}s for Submit to enable\u2026`),await Yi(s)){q(`Submit enabled on ${g} \u2014 clicking\u2026`),n?await Vi(n.accountId):ji();return}l<o.length-1&&q(`Submit still disabled on ${g} \u2014 trying next (${l+2}/${o.length})\u2026`)}q(`Tried all ${o.length} time slot(s); Submit never enabled.`),n&&ut()}async function La(t){if(!N()||_())return;let e;try{e=ml(t)}catch{return}if(e==null)return;if(Wr(e),e.retryAfter!==void 0){let r=Number(e.retryAfter);Uo(e.cgiBlock,r),r?(pn(r),Bi(r)):x("defaultWaitTime").then(s=>{pn(s),Bi(s)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let r=e.response.Posts||[],s=new Map((await Mt()).map(l=>[l.ID,l]));for(let l of r)s.set(l.ID,{...s.get(l.ID),...l});await ee([...s.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let r=e.response.Members||[];if(r.length){let s=await G()||{},l=s.name&&r.find(d=>d.FullName===s.name);s.visa=(l||r[0]).VisaClassName,await T({profile:s,members:r})}}if(ka.includes(e.tail)){_t(),hr(e);let r=(e.response.ScheduleDays||[]).map(g=>Wn(g?.Date)).filter(Boolean).length;r&&q(`${r} date${r===1?"":"s"} available \u2014 see list below`),ga();let s=await at();await me()||x("defaultWaitTime").then(g=>{pn(g)});let d=await Mt(),f=d.find(g=>g.ID===e.params.postId);f&&(f.Days=e.response.ScheduleDays,f.Updated=Date.now(),f.HasError=e.response.HasError,f.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,ee(d)),await pl(e.response.ScheduleDays,{postId:e.params.postId,postName:f?.Name,hasError:e.response.HasError}),!e.response.HasError&&r>0&&Ur({postId:e.params.postId,postName:f?.Name,dayCount:r}).catch(()=>{}),await _r(e.response.ScheduleDays,{postId:e.params.postId,postName:f?.Name,hasError:e.response.HasError}),Ge()?(kt(),q("Submit pending \u2014 staying on this city (date reload ignored)\u2026")):s&&!e.response.HasError?Wi(e.response.ScheduleDays,s.from,s.to).length?kt():ut():s&&ut();let h=Ge()?null:await Tl(e.response.ScheduleDays,e.response.HasError);if(h)kt(),await kr(f?.Name,h);else if(s&&!e.response.HasError&&!Ge()){let g=(e.response.ScheduleDays||[]).map(v=>Wn(v?.Date)).filter(Boolean),w=g.filter(v=>ze(v,s.from,s.to));g.length&&!w.length?(ut(),q(`Dates found but none in ${s.from} \u2192 ${s.to}. Next city in 13\u201318s\u2026`)):g.length||(ut(),q("No dates on this city \u2014 next city in 13\u201318s\u2026"))}await ii()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let r=e.params.Date.split("T")[0];xl(e.response.ScheduleEntries,r),Da();let s=await Mt(),l=s.filter(f=>f.Days&&f.Updated).sort((f,h)=>h.Updated-f.Updated).find(f=>f.Days.some(h=>h.Date===r));if(l){let f=l.Days.find(h=>h.Date===r);f&&(f.Times=e.response.ScheduleEntries,ee(s))}let d=(e.response.ScheduleEntries||[]).filter(f=>f&&f.Time);if(gr(d,r,l?.Name),d.length){let f=d.filter(w=>w.EntriesAvailable==null||Number(w.EntriesAvailable)>0),h=f.reduce((w,v)=>{let K=Number(v.EntriesAvailable);return w+(Number.isFinite(K)?K:0)},0),g=h>0?` \xB7 ${h} available`:"";q(`${f.length||d.length} time slot${(f.length||d.length)===1?"":"s"} on ${r}${g}`)}await _l(e.response.ScheduleEntries,e.response.HasError),Ge()?(kt(),q("Submit pending \u2014 staying on this city (time reload ignored)\u2026")):d.length?(kt(),await $r(l?.Name,e.params.Date,d.length)):(ut(),q("No time slots on this date \u2014 next city in 13\u201318s\u2026")),await ii()}}function Pa(t){if(!N()||_())return;let e=$a(t.data.url);ka.includes(e)&&cr()}var Zt=null,io="",no={scanning:"Scanning for Cloudflare challenge\u2026",dom:"Trying page-level verify click\u2026",debugger:"Advanced click \u2014 targeting Turnstile iframe\u2026",retry:"Waiting before next attempt\u2026",success:"Verification passed \u2014 continuing\u2026",manual:"Stuck? Click the checkbox once, then we\u2019ll continue."};function qa(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=u.cfFlash,n.dataset[k.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),c.setTimeout(()=>n.remove(),1200)}}function kl(){let t=document.querySelector(p(a.cfHud));return t||(t=document.createElement("div"),t.id=a.cfHud,t.dataset[k.mark]="",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.innerHTML=`
    <div class="${u.cfHud}">
      <div class="${u.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">\u{1F6E1}</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${no.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `,document.documentElement.appendChild(t),t)}async function B(t,e){if(!chrome.runtime?.id||!c.alive||!await x("autoCloudflareTick"))return;let n=kl(),i=n.querySelector("[data-cf-msg]"),o=n.querySelector("[data-cf-sub]"),r=n.querySelector("[data-cf-chip]"),s=n.querySelector(`.${u.cfHud}`);io=t,i&&(i.textContent=no[t]||no.scanning),o&&(o.textContent=e||$l(t)),r&&(r.textContent=t==="success"?"Done":t==="manual"?"Help":"Active",r.dataset.state=t),s&&(s.dataset.state=t),Zt&&(c.clear(Zt),Zt=null),t==="success"&&(Zt=c.setTimeout(()=>oo(),2800))}function $l(t){return t==="debugger"?"Precision click via advanced browser bridge":t==="dom"?"Standard page interaction":t==="manual"?"One manual click is usually enough":t==="success"?"Resuming login and recovery":"Monitoring this tab for Turnstile"}function oo(){let t=document.querySelector(p(a.cfHud));t&&t.remove(),io="",Zt&&(c.clear(Zt),Zt=null)}function ro(){return io}var Ml=/we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i,Al=/\bUSG\s+[a-f0-9-]{8,}/i;var so="vsPortalErrorReloadCount",Na="vsPortalErrorReloadAt",Dl=2e3,El=1e4,Ra=!1,he=null,Il=null;function Ll(){return(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim()}function ge(){let t=Ll().slice(0,6e3);return t?!!(/a timeout occurred/i.test(t)&&(/error\s*524/i.test(t)||/origin web server timed out/i.test(t)||/cloudflare ray id/i.test(t))||/error\s*524/i.test(t)&&/cloudflare/i.test(t)&&t.length<8e3||Ml.test(t)&&(Al.test(t)||/error id\s*#/i.test(t))||/we'?re sorry,\s*but something went wrong/i.test(t)&&t.length<2500):!1}function Wa(){try{return Math.max(0,Number(sessionStorage.getItem(so)||0))}catch{return 0}}function Pl(){try{let t=Wa()+1;return sessionStorage.setItem(so,String(t)),sessionStorage.setItem(Na,String(Date.now())),t}catch{return 1}}function ao(){try{sessionStorage.removeItem(so),sessionStorage.removeItem(Na)}catch{}}function ql(t){return Math.min(El,Dl+Math.max(0,t-1)*1e3)}function Rl(){he&&(c.clear(he),he=null)}function Ol(){Pl();try{location.reload()}catch{}}function Oa(){if(!c.alive||he)return;if(!ge()){ao();return}let t=Wa()+1,e=ql(t);he=c.setTimeout(()=>{if(he=null,!!c.alive){if(!ge()){ao();return}Ol()}},e)}function Ha(){if(Ra)return;Ra=!0;let t=()=>{c.alive&&(ge()?Oa():(ao(),Rl()))};t(),Il=c.setInterval(t,1500);try{let e=new MutationObserver(()=>{c.alive&&ge()&&Oa()});e.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),c.disposable(()=>e.disconnect())}catch{}}var Hn="vsDebugLogs",Nl=200;function Wl(){try{return new Date().toLocaleTimeString("en-IN",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})}catch{return new Date().toISOString().slice(11,19)}}async function F(t,e,n){let i={at:Date.now(),t:Wl(),tag:String(t||"app").slice(0,24),msg:String(e||"").slice(0,400)};if(n!=null)try{i.data=JSON.parse(JSON.stringify(n))}catch{i.data=String(n).slice(0,200)}try{console.log(`[VS6 ${i.tag}] ${i.msg}`,n!==void 0?n:"")}catch{}try{let o=await C({[Hn]:[]}),r=Array.isArray(o[Hn])?o[Hn].slice():[];for(r.push(i);r.length>Nl;)r.shift();await T({[Hn]:r})}catch{}}var Fn=null,Ve=0,Ye=null,$t=0;async function Hl(){try{let e=(await C("humanClickProfile")).humanClickProfile,n=e?.liveTrained&&e.samples?.length||0;return n<5?15e3:n<20?1e4:n<50?6e3:3500}catch{return 12e3}}var lo=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function J(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!U()&&!ro()}function U(){if(ge()||document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return lo.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:co().length>0}function Bn(t){return new Promise(e=>setTimeout(e,t))}function Bl(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let i of n.querySelectorAll("*"))i.shadowRoot&&(t.push(i.shadowRoot),e.push(i.shadowRoot))}return t}function co(){let t=[],e=new Set,n=i=>{if(!i||e.has(i))return;let o=i.getBoundingClientRect();if(o.width<40||o.height<20||o.width>900||o.height>400)return;let r=(i.src||i.getAttribute?.("src")||"").toLowerCase(),s=(i.title||i.getAttribute?.("title")||"").toLowerCase(),l=(i.className?.toString?.()||"").toLowerCase(),d=(i.id||"").toLowerCase(),f=i.tagName==="IFRAME"&&(r.includes("challenges.cloudflare")||r.includes("turnstile")||s.includes("cloudflare")||s.includes("security challenge")),h=l.includes("cf-turnstile")||l.includes("turnstile")||d.includes("turnstile")||d.includes("challenge")||i.hasAttribute?.("data-sitekey")||i.hasAttribute?.("data-turnstile-widget");if(!f&&!h)if(i.tagName==="IFRAME"&&o.width>=120&&o.width<=420&&o.height>=45&&o.height<=120){if(!lo.test(document.body?.innerText||""))return}else return;e.add(i),t.push({el:i,rect:o})};for(let i of Bl()){for(let o of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let r of i.querySelectorAll(o))n(r);for(let o of i.querySelectorAll("iframe"))n(o)}return t}function Fl(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function Ul(t){let e=[],n=new Set,i=(o,r)=>{if(!Number.isFinite(o)||!Number.isFinite(r)||o<1||r<1||o>window.innerWidth-1||r>window.innerHeight-1)return;let s=`${Math.round(o)},${Math.round(r)}`;n.has(s)||(n.add(s),e.push({x:Math.round(o),y:Math.round(r)}))};for(let{rect:o}of t){let r=o.top+o.height/2,s=o.left+Math.min(28,Math.max(18,o.width*.11));for(let l of[0,-4,4,-8,8,12,16,20,24,28,32])for(let d of[0,-3,3,-6,6])i(s+l,r+d);i(o.left+o.width*.5,r)}return e}function Kl(t){for(let{el:e,rect:n}of t)try{e.click();let i=n.left+Math.min(26,n.width*.12),o=n.top+n.height/2,r=document.elementFromPoint(i,o)||e;for(let s of["pointerdown","mousedown","mouseup","pointerup","click"])r.dispatchEvent(new MouseEvent(s,{bubbles:!0,cancelable:!0,clientX:i,clientY:o,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let i=n.getBoundingClientRect();if(i.width<4&&i.height<4)continue;let o=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!o.includes("human")&&!o.includes("verify")&&e==="input[type='checkbox']"){let r=n.closest("label, div, form");if(!lo.test(r?.textContent||""))continue}return n.click(),!0}return!1}async function Ba(t){t.length&&(qa(t.slice(0,3)),c.send({action:"viewportClickPoints",points:t}),await x("cloudflareDebuggerClick")?(await B("debugger","Trained click on Verify you are human\u2026"),c.send({action:"cloudflareDebuggerClick",points:t,primaryOnly:!0})):await B("dom"))}async function Un(){if(!await x("autoCloudflareTick"))return!1;if(J())return $t&&F("cf","challenge already solved"),$t=0,await B("success"),!0;$t||($t=Date.now(),F("cf","challenge seen \u2014 train window started"));let t=await Hl();if(Date.now()-$t<t)return await B("scanning","Train window \u2014 click Verify you are human yourself (recording your mouse)\u2026"),!1;F("cf","train window done \u2014 attempting auto click"),await B("scanning","Verify you are human page \u2014 preparing click\u2026");let e=co();Fl(e),await Bn(350),e=co();let n=Ul(e);return n.length&&(await Ba(n),await Bn(1200),J()||!U())?($t=0,await B("success"),!0):(await B("dom"),Kl(e),await Bn(600),J()||!U()?($t=0,await B("success"),!0):n.length&&(await Ba(n),await Bn(1e3),J()||!U())?($t=0,await B("success"),!0):(Ve++,Ve>=8?await B("manual","Click the checkbox once \u2014 we will continue after."):await B("retry",`Retry ${Ve}/8\u2026`),!1))}function Gl(){Ye||(Ye=new MutationObserver(()=>{c.alive&&U()&&!J()&&Un()}),Ye.observe(document.documentElement,{childList:!0,subtree:!0}),c.disposable(()=>{Ye?.disconnect(),Ye=null}))}function uo(){Fn&&(c.clear(Fn),Fn=null),Ve=0,$t=0,oo()}async function fo(){if(uo(),!await x("autoCloudflareTick"))return;Gl();let t=async()=>{if(c.alive&&await x("autoCloudflareTick")){if(U()&&!J()){await Un();return}ro()&&(Ve=0,await B("success"))}};t(),Fn=c.setInterval(t,1800)}var ye="sessionRecovery",mo="homeKeepaliveAt",po="homeLoadingStuckAt",Fa=2e3,Gn=!1,Ua=null,ho=null,go=null,Kn=null,Xe=0;function Ka(){return b.homeKeepaliveMinMs}function zl(){return b.homeKeepaliveMaxMs}function jl(){return b.homeKeepaliveDebounceMs}function Ga(){return b.loadingStuckMs}function Yl(){return b.loadingStuckDebounceMs}function za(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function Vl(t,e){let n=za(t);if(!n)return"";let i="",o=0;for(let r of e||[]){let s=za(r.q);if(!s||!r.a)continue;if(n.includes(s)||s.includes(n))return r.a;let l=s.split(" ").filter(h=>h.length>3),d=0;for(let h of l)n.includes(h)&&d++;let f=l.length?d/l.length:0;f>o&&f>=.5&&(o=f,i=r.a)}return i}async function Xl(){let t=await C([Lt,"profile"]),e=t[Lt]||{},n=t.profile?.id?String(t.profile.id):null,i=n?e[n]:null;return i||(i=Object.values(e).find(o=>o?.loginId&&o?.loginPass)||null),i||{}}function ja(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,i=Object.getOwnPropertyDescriptor(n,"value")?.set;i?i.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function Nt(t){return new Promise(e=>setTimeout(e,t))}function dt(t,e){return t+Math.random()*(e-t)}async function yo(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await Nt(dt(250,600)),ja(t,"");let i="";for(let o=0;o<n.length;o++){let r=n[o];i+=r,ja(t,i),t.dispatchEvent(new KeyboardEvent("keydown",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:r,bubbles:!0}));let s=dt(90,220);/[\s@._]/.test(r)&&(s+=dt(120,320)),Math.random()<.08&&(s+=dt(200,450)),await Nt(s)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await Nt(dt(200,500))}var zn=!1,jn=!1;function Yn(t){return!t||t.disabled?!1:(t.click(),!0)}function Ql(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let i of t){let o=(i.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(o))continue;let r=i.querySelector("input[type='checkbox']")||document.getElementById(i.getAttribute("for")||"");r&&!r.checked&&(Yn(r),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(i=>/^(continue|ok|accept|agree)$/i.test((i.textContent||i.value||"").trim()));return e&&n&&Yn(n),e>0}function Ya(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function Jl(t){if(zn)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;zn=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await yo(e,t.loginId),await Nt(dt(400,900))),n&&t.loginPass&&!n.value&&(await yo(n,t.loginPass),await Nt(dt(500,1100)));let i=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(o=>/sign in|log in|continue/i.test(o.textContent||o.value||""));return i&&(n?.value||t.loginPass)?(await Nt(dt(600,1400)),Yn(i),!0):!!(e||n)}finally{zn=!1}}async function Zl(t){if(jn)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let o of n){let r=(o.textContent||"").trim();if(r.length<12||r.length>220||!/\?/.test(r)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(r))continue;let s=o.querySelector("input[type='text']")||document.getElementById(o.getAttribute("for")||"")||o.parentElement?.querySelector("input[type='text']");s&&s.offsetParent!==null&&e.push({text:r,input:s})}for(let o of["kba1_response","kba2_response","kba3_response"]){let r=document.getElementById(o);if(!r)continue;let l=(r.closest(".form-group, .entry, li, div")||r.parentElement)?.textContent||"";e.some(d=>d.input===r)||e.push({text:l,input:r})}let i=[];for(let{text:o,input:r}of e){if(r.value)continue;let s=Vl(o,t.security);s&&i.push({input:r,ans:s})}if(!i.length)return!1;jn=!0;try{for(let{input:r,ans:s}of i)await yo(r,s),await Nt(dt(350,800));await Nt(dt(600,1400));let o=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(r=>/continue|submit|verify/i.test(r.textContent||r.value||""));return o&&Yn(o),!0}finally{jn=!1}}function Va(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||U()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function Wt(){return Tt()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function tu(t=""){return/\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(t||""))}function bo(){if(Wt()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||U()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}function eu(t){return!!(t?.loginId&&t?.loginPass)}function nu(){return Va()?!1:!!(Ya()||document.querySelector("#kba1_response, #kba2_response, #kba3_response")||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))}async function iu(){let t=(await C(ye))[ye],e=!!t?.active,n=await Xl();if(U()){await Un();return}if(Ql(),Va()){e&&(await T({[ye]:{...t,active:!1,doneAt:Date.now()}}),c.send({action:"recoveryReturnToOfc"}));return}nu()&&eu(n)&&await x("autofillLogin")&&(await Zl(n)||(Ya()||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))&&await Jl(n))}function Xa(){if(!bo()||Ua)return;let t=async()=>{c.alive&&await iu()};t(),Ua=c.setInterval(t,1200)}function Qa(){return Ka()+Math.random()*(zl()-Ka())}async function Ja(){try{let t=await C(mo),e=Number(t[mo])||0;return Date.now()-e<jl()?!1:(await T({[mo]:Date.now()}),!0)}catch{return!0}}function Za(){if(Wt()||!bo()||document.querySelector("#post_select")||ho)return;let t=()=>{c.alive&&(ho=c.setTimeout(async()=>{if(ho=null,!c.alive||Wt()||tu(location.href)||document.querySelector("#post_select")||!bo())return;if(zn||jn||Gn){t();return}if((await C(ye))[ye]?.active){t();return}if(!await Ja()){t();return}try{location.reload()}catch{t()}},Qa()))};t()}function ts(){if(!Wt()||go)return;let t=()=>{c.alive&&(go=c.setTimeout(async()=>{if(go=null,!(!c.alive||!Wt())){if(await Ja())try{c.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}t()}},Qa()))};t()}async function ou(){try{let t=await C(po),e=Number(t[po])||0;return Date.now()-e<Yl()?!1:(await T({[po]:Date.now()}),!0)}catch{return!0}}function es(){if(!Wt()||Kn)return;let t=async()=>{if(Kn=null,!(!c.alive||!Wt())){try{if(Hi()){if(Xe||(Xe=Date.now()),Date.now()-Xe>=Ga()){if(await ou()){try{q(`Date Loading stuck \u2265${Ga()/1e3}s \u2014 reloading Application Home\u2026`)}catch{}try{c.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}}Xe=Date.now()}}else Xe=0}catch{}c.alive&&Wt()&&(Kn=c.setTimeout(t,Fa))}};Kn=c.setTimeout(t,Fa)}async function ns(t){if(!/PSE0501|unable to load appointment available days/i.test(String(t||""))||Gn)return;Gn=!0,c.setTimeout(()=>{Gn=!1},8e3);let e=await P();await T({[ye]:{active:!0,ofcUrl:location.href,accountId:e,startedAt:Date.now()}}),c.send({action:"recoveryStart",ofcUrl:location.href})}var Xn="humanClickProfile",So=150,Co=120,ru=250,is=!1,mt=[],Vn=0,nt=0,Ht=0,A=null,xo=0,Je=!1,be=null,Qn=0,Zn=0,Ze=[],ft=!1,te=!1;function au(){let t=[];for(let e of document.querySelectorAll('iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]')){let n=e.getBoundingClientRect();n.width<40||n.height<20||n.width>900||n.height>400||t.push(n)}if(!t.length&&U())for(let e of document.querySelectorAll("iframe")){let n=e.getBoundingClientRect();n.width>=120&&n.width<=420&&n.height>=45&&n.height<=120&&t.push(n)}return t}function tn(){let t=au();if(!t.length)return null;let e=t[0];return{x:e.left+Math.min(28,Math.max(18,e.width*.11)),y:e.top+e.height/2,w:e.width,h:e.height,left:e.left,top:e.top}}function we(t,e,n){return n?t>=n.left-40&&t<=n.left+n.w+40&&e>=n.top-30&&e<=n.top+n.h+30:!1}function ss(t){let e=performance.now();Vn||(Vn=e);let n=A,i=n?(t.clientX-n.x)/Math.max(24,n.w*.12):0,o=n?(t.clientY-n.y)/Math.max(20,n.h*.5):0;mt.push({nx:Math.round(i*1e3)/1e3,ny:Math.round(o*1e3)/1e3,x:Math.round(t.clientX),y:Math.round(t.clientY),t:Math.round(e-Vn)}),mt.length>Co&&mt.shift()}async function ti(){return(await C(Xn))[Xn]||{version:2,maxSamples:So,samples:[],avgHoverMs:420,avgPressMs:70,avgApproachMs:800,liveTrained:!1}}function wo(t,e,n){if(!t.length)return n;let i=t.reduce((o,r)=>o+(Number(r[e])||0),0);return Math.round(i/t.length)}async function cs(t,{force:e=!1}={}){let n=Date.now();if(!e&&n-xo<ru)return null;xo=n;let i=await ti(),o=Array.isArray(i.samples)?i.samples.slice():[];for(t.clientId||(t.clientId=`hc-${t.at||n}-${Math.random().toString(36).slice(2,10)}`),t.uploaded=!1,o.push(t);o.length>So;)o.shift();let r={version:2,maxSamples:So,samples:o,avgHoverMs:wo(o,"hoverMs",420),avgPressMs:wo(o,"pressMs",70),avgApproachMs:wo(o,"approachMs",800),updatedAt:n,liveTrained:!0,source:"visa-page-live"};return await T({[Xn]:r}),Qn=o.length,F("human",`saved sample locally #${o.length}`,{capture:t.capture||"page",pressMs:t.pressMs,hoverMs:t.hoverMs,pathPts:Array.isArray(t.path)?t.path.length:0,clientId:t.clientId}),ls(t,r).catch(()=>{}),us().catch(()=>{}),r}async function su(t){if(!t)return;let e=await ti(),n=Array.isArray(e.samples)?e.samples.slice():[],i=!1;for(let o of n)o?.clientId===t&&!o.uploaded&&(o.uploaded=!0,i=!0);i&&await T({[Xn]:{...e,samples:n,updatedAt:Date.now()}})}async function ls(t,e){try{if(!await x("serverSync"))return F("upload","skipped \u2014 serverSync is OFF"),!1;let n=await G()||{},i=t.clientId||`hc-${t.at||Date.now()}-${Math.random().toString(36).slice(2,8)}`;t.clientId=i;let o={client_id:i,profile:{id:n.id||"",email:n.email||"",name:n.name||"",visa:n.visa||""},sample:t,profile_meta:{sampleCount:e?.samples?.length||0,avgHoverMs:e?.avgHoverMs,avgPressMs:e?.avgPressMs,avgApproachMs:e?.avgApproachMs,liveTrained:!0,source:"visa-page-live",extensionHost:location.host}};F("upload",`sending sample ${i}`,{sampleCount:e?.samples?.length||0,email:n.email||""}),c.send({action:"uploadHumanClickSample",payload:o});try{chrome.runtime.sendMessage({action:"uploadHumanClickSample",payload:o},r=>{if(chrome.runtime.lastError){F("upload",`SW error: ${chrome.runtime.lastError.message}`);return}r?.success?(F("upload",`server OK id=${r.id??"?"} status=${r.status??""}`,{clientId:i}),su(i)):F("upload",`server FAIL ${r?.error||r?.status||"unknown"}`,{clientId:i})})}catch(r){F("upload",`sendMessage threw: ${r?.message||r}`)}return!0}catch(n){return F("upload",`upload threw: ${n?.message||n}`),!1}}async function us(){try{if(!await x("serverSync"))return;let t=await ti(),n=(Array.isArray(t.samples)?t.samples:[]).filter(i=>i&&i.uploaded!==!0).slice(-40);for(let i of n)await ls(i,t),await new Promise(o=>setTimeout(o,80))}catch{}}function ds(t,e={}){let n=performance.now(),i=Math.max(25,Math.min(500,nt?n-nt:70)),o=Math.max(30,Math.min(3e3,nt?nt-(Ht||nt):200)),r=(mt.length?mt:Ze).slice(-Co),s=r.length?r[r.length-1].t:o,l=Math.max(o,Math.min(12e3,s||o)),d=be,f=A||tn();return{hoverMs:Math.round(o),pressMs:Math.round(i),approachMs:Math.round(l),path:r,down:d?{x:Math.round(d.x),y:Math.round(d.y)}:null,up:t?{x:Math.round(t.clientX),y:Math.round(t.clientY)}:d?{x:Math.round(d.x),y:Math.round(d.y)}:f?{x:Math.round(f.x),y:Math.round(f.y)}:null,target:f?{x:Math.round(f.x),y:Math.round(f.y),w:Math.round(f.w),h:Math.round(f.h),left:Math.round(f.left),top:Math.round(f.top)}:null,viewport:{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio||1,scrollX:Math.round(window.scrollX||0),scrollY:Math.round(window.scrollY||0)},pointerType:t?.pointerType||"mouse",url:location.pathname+location.search,at:Date.now(),...e}}function Qe(){mt.length&&(Ze=mt.slice(-Co)),mt=[],Vn=0,nt=0,Ht=0,be=null}function To(){Je||(Je=!0,te=!0,Qe(),A=tn())}function vo(){Je=!1,A=null,ft=!1,Qe()}function Jn(t){let e=t?.target;if(!e)return!1;if(e.closest?.(".cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]"))return!0;if(e.tagName==="IFRAME"){let n=(e.src||"").toLowerCase();if(n.includes("challenges.cloudflare")||n.includes("turnstile"))return!0;let i=e.getBoundingClientRect();if(i.width>=120&&i.width<=420&&i.height>=45&&i.height<=120)return!0}return!1}async function os(t){if(c.alive){if(!U()||J()){Je&&vo();return}To(),A||(A=tn()),!Ht&&A&&we(t.clientX,t.clientY,A)&&(Ht=performance.now()),A&&we(t.clientX,t.clientY,A)&&(Zn=Date.now()),ss(t)}}async function rs(t){if(!(!c.alive||t.button!==0)&&!(!U()||J())){To(),A=tn(),nt=performance.now(),Ht||(Ht=nt),be={x:t.clientX,y:t.clientY},ss(t),(Jn(t)||A&&we(t.clientX,t.clientY,A))&&(ft=!0,Zn=Date.now()),F("human","pointer down during challenge",{onWidget:Jn(t),near:!!(!A||we(t.clientX,t.clientY,A)),x:Math.round(t.clientX),y:Math.round(t.clientY)});try{B("scanning",`Recording click\u2026 (saved ${Qn} so far)`)}catch{}}}async function as(t){if(!c.alive||t.button!==0||!nt&&!ft)return;if(!U()&&!J()){Qe();return}if(!(A&&we(t.clientX,t.clientY,A)||A&&be&&we(be.x,be.y,A)||Jn(t)||ft||!A&&(mt.length>=2||Ze.length>=2))&&mt.length<2&&Ze.length<2){Qe();return}let n=ds(t,{capture:ft||Jn(t)?"iframe-or-widget":"page"});ft=!1,Qe();let i=await cs(n);if(!i)return;let o=i.samples?.length||0;try{B("success",`Saved verify-human click #${o} \u2014 uploaded to server`)}catch{}}async function cu(){let t=Date.now();if(!te||!J()&&U())return;if(!(ft||t-Zn<8e3||Ze.length>=2&&t-xo>500)){te=!1,vo();return}let n=ds(null,{capture:"challenge-solved"});ft=!1,te=!1,vo();let i=await cs(n,{force:!0});if(!i)return;let o=i.samples?.length||0;try{B("success",`Saved verify-human click #${o} (after checkbox) \u2014 uploaded to server`)}catch{}}async function lu(){try{let t=await ti(),e=t.liveTrained&&t.samples?.length||0;return Qn=e,e}catch{return Qn}}function fs(){if(is)return;is=!0,F("human","train watcher started",{path:location.pathname}),c.on(window,"pointermove",os,{passive:!0,capture:!0}),c.on(window,"pointerdown",rs,{passive:!0,capture:!0}),c.on(window,"pointerup",as,{passive:!0,capture:!0}),c.on(window,"mousemove",os,{passive:!0,capture:!0}),c.on(window,"mousedown",rs,{passive:!0,capture:!0}),c.on(window,"mouseup",as,{passive:!0,capture:!0}),c.on(window,"blur",()=>{!U()||J()||(ft=!0,Zn=Date.now(),nt||(nt=performance.now(),Ht||(Ht=nt)),F("human","page blur during challenge (likely iframe click)"))});let t=async()=>{if(!c.alive)return;if(U()&&!J()){te||F("human","challenge detected \u2014 recording armed"),te=!0,To(),A||(A=tn());let n=await lu();try{B("scanning",n?`Train mode \u2014 click Verify you are human naturally (saved ${n})`:"Train mode \u2014 move mouse naturally, then click Verify you are human (recording\u2026)")}catch{}return}(te||Je||ft)&&await cu()};t(),c.setInterval(t,1200),c.setTimeout(()=>{F("upload","flushing unsynced local samples\u2026"),us().catch(()=>{})},2500)}var uu=`
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
`;function ms(){if(document.querySelector(p(a.styles)))return;let t=document.createElement("style");t.id=a.styles,t.dataset[k.mark]="",t.textContent=uu,(document.head||document.documentElement).appendChild(t)}Wo();to();ko(()=>{Sa(),c.destroy()});Yo();Ha();_()&&P().then(t=>{if(t)return Dn(t);fe()}).catch(()=>fe());if(!_()){c.disposable(()=>{let i=document.querySelector(p(a.anchor)),o=document.querySelector("#post_select");i&&o&&i.replaceWith(o);for(let r of document.querySelectorAll("[data-"+k.mark+"]"))r.remove()}),ms(),c.send({action:"registerBlockGuard",prefix:m}),c.send({action:"registerRedirect",prefix:m}),c.send({action:"registerAlertGuard",prefix:m}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&c.send({action:"registerOfcReader",prefix:m}),c.on(window,"message",i=>{if(c.alive&&i.source===window)switch(i.data?.action){case At.req:return Pa(i);case At.res:return La(i);case At.ofc:return br(i);case At.err:return Le("native_alert",i.data?.text),We(String(i.data?.text||"alert").slice(0,120)),ns(i.data?.text);case At.sub:fr(),Ie(),Mr(),at().then(o=>{Ke(o?.accountId||null)}).catch(()=>{Ke(null)});return}}),chrome.storage.onChanged.addListener((i,o)=>{o==="local"&&(i.profile&&yi(),i.waitPillClock&&ur(i.waitPillClock.newValue),i.autoCloudflareTick&&(i.autoCloudflareTick.newValue?fo():uo()))}),c.on(document,"click",i=>{ce();let o=i.target.closest(p(a.waitTime));if(o){if(o.dataset.skipClick){delete o.dataset.skipClick;return}lr()}}),c.on(document,"keydown",ce),c.on(window,"focus",()=>ce({keepConsular:!0})),c.on(document,"visibilitychange",()=>{document.hidden||ce({keepConsular:!0})}),mr(),Xa(),Za(),ts(),es(),fs(),fo();async function t(){!c.alive||_()||!Tt()||document.querySelector("#post_select")&&(_t(),await Promise.all([mi(),hi(),eo()]),Ir({slotIndex:In,shouldPick:async()=>await at()?!0:!!await x("autoSelectFirstDate"),onSlotPicked:()=>xa()}))}async function e(){!c.alive||_()||!Tt()||await wa()}async function n(){Fo(),Ko(),await Promise.all([yi(),zo(),Go(),mi(),hi(),eo()]),oi()}document.readyState==="complete"?n():c.on(window,"load",n),c.setInterval(t,2500),c.setInterval(e,3e4),e()}})();
