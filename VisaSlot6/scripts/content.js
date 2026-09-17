(()=>{function N(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function T(t){return N()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,i]of Object.entries(t))e[n]=i;return e}):Promise.resolve(typeof t=="string"?{}:t)}function C(t){return N()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function Ui(t){return N()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function Ki(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",i=>{String(i.reason?.message||i.reason||"").includes("Extension context invalidated")&&(i.preventDefault(),e())});let n=setInterval(()=>{N()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var Kt="https://the.gopg.online",$n=`${Kt}/contribute`,zi=`${Kt}/contribute/telegram`,hl=`${Kt}/contribute/human-click`,Re=`${Kt}/contribute/tik-tik-prefs`;var Gi=20,ji=4320*60*1e3,Oe=100,Yi=4,We=100,Vi=240,Xi=50,Qi=1440*60*1e3,Ca={recheckButton:!1,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function S(t){return T({[t]:Ca[t]}).then(e=>e[t])}function gt(){return T({posts:[]}).then(t=>t.posts)}function zt(t){return C({posts:t})}function U(){return T("profile").then(t=>t.profile)}var It=t=>String(t).padStart(2,"0");function se(t){let e=It(t%60),n=Math.floor(t/60)%60,i=Math.floor(t/3600);return i?`${It(i)}:${It(n)}:${e}`:`${It(n)}:${e}`}function Ji(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${It(n.getUTCHours())}:${It(n.getUTCMinutes())}:${It(n.getUTCSeconds())}`}}function _n(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),i=t%60,o=[];return e>0&&o.push(`${e}d`),(n>0||e>0)&&o.push(`${n}h`),o.push(`${i}m`),o.join(" ")}function Zi(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),i=o=>n.find(r=>r.type===o)?.value??"";return`${i("month")} ${i("day")} ${i("year")} ${i("hour")}:${i("minute")} ${i("dayPeriod")}`}function to(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),i=parseInt(e[2],10),o=parseInt(e[3],10),r=e[4];r&&(r.toUpperCase()==="PM"&&n<12&&(n+=12),r.toUpperCase()==="AM"&&n===12&&(n=0));let s=new Date;return s.setHours(n,i,o,0),s.getTime()>Date.now()+6e4&&s.setDate(s.getDate()-1),s}var eo=Symbol(),$a=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&N()}on(t,e,n,i){t.addEventListener(e,n,{...i,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!N())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=Yi,interval:n=Oe}={}){return new Promise(i=>{let o=r=>{if(!this.alive)return;let s=document.querySelector(t);if(s)return i(s);if(r>=e)return i(null);this.setTimeout(()=>o(r+1),n)};o(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},l=new $a;function no(){let t=globalThis[eo];Object.defineProperty(globalThis,eo,{value:l,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var Ne=new Uint32Array(2);crypto.getRandomValues(Ne);var io="abcdefghjkmnpqrstuvwxyz",_a=(Ne[0].toString(36)+Ne[1].toString(36)).replace(/[^a-z0-9]/g,""),d=(io[Ne[0]%io.length]+_a).slice(0,8).padEnd(8,"x");function p(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var a={selRow:d+"01",anchor:d+"02",waitTime:d+"03",recheck:d+"04",histCont:d+"05",histTbl:d+"06",cdCard:d+"07",cdTime:d+"08",ofcDate:d+"09",styles:d+"10",datesCont:d+"11",datesPara:d+"12",slotsTbl:d+"12b",aiBtn:d+"13",aiPanel:d+"14",aiFrom:d+"15",aiTo:d+"16",aiStatus:d+"17",aiConfirm:d+"18",aiCancel:d+"19",aiClose:d+"20",aiCities:d+"21",aiSubmitBtn:d+"22",aiCitiesBtn:d+"23",aiLogin:d+"24",aiPass:d+"25",aiQ1:d+"26",aiA1:d+"27",aiQ2:d+"28",aiA2:d+"29",aiQ3:d+"30",aiA3:d+"31",aiSaveLogin:d+"32",cfHud:d+"33",aiCitiesAll:d+"34",aiCitiesNone:d+"35",aiLoginToggle:d+"36",aiLoginBody:d+"37",aiSubmitOn:d+"38",aiSubmitOff:d+"39",aiCitiesOn:d+"40",aiCitiesOff:d+"41",aiWinList:d+"42",aiWinAdd:d+"43",aiWinSave:d+"44",aiWinReset:d+"45",aiWinNote:d+"46",aiSubmitSw:d+"47",aiCitiesSw:d+"48",aiInfoBox:d+"49",aiWarnBox:d+"50",aiOkBox:d+"51",aiWinCard:d+"52",aiSubmitBody:d+"53",aiCitiesBody:d+"54",aiTerms:d+"55",aiTermsAgree:d+"56",aiTermsGate:d+"57",aiMain:d+"58",aiTermsContinue:d+"59",aiFromBtn:d+"60",aiToBtn:d+"61",aiCal:d+"62"},c={pill:d+"a",pillTtl:d+"b",pillTmr:d+"c",pillWait:d+"d",pillDone:d+"e",footer:d+"f",card:d+"g",cardTtl:d+"h",histScrl:d+"i",dltDn:d+"j",dltUp:d+"k",cdDiv:d+"l",hidden:d+"m",sideLink:d+"n",datesLnk:d+"o",slotsSum:d+"o2",slotsTbl:d+"o3",aiOn:d+"p",aiRow:d+"q",aiHint:d+"r",aiCities:d+"s",aiOnBtn:d+"t",aiCityAct:d+"x",cfHud:d+"u",cfPulse:d+"v",cfFlash:d+"w",aiEn:d+"y",aiDis:d+"z",aiWinRow:d+"aa",aiFeat:d+"ab",aiSwitch:d+"ac",aiKnob:d+"ad",aiSec:d+"ae",aiInfo:d+"af",aiWarn:d+"ag",aiOk:d+"ah",aiTrash:d+"ai",aiWinHelp:d+"aj",aiInline:d+"ak",aiHead:d+"al",aiTerms:d+"am",aiTermsCb:d+"an",aiTermsList:d+"ao",aiContinue:d+"ap",aiDateBtn:d+"aq",aiCal:d+"ar",aiCalHead:d+"as",aiCalGrid:d+"at",aiCalDay:d+"au",aiCalMuted:d+"av",aiCalOn:d+"aw",aiCalToday:d+"ax"},$={mark:d,w:d+"w",mw:d+"mw"},bt={req:d+"q",res:d+"r",ofc:d+"o",err:d+"e",sub:d+"s"};function He(t){return t.map(e=>String.fromCharCode(e)).join("")}function ka(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function oo(){let t=document.createElement("div");return t.className=c.footer,t.textContent=He([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function Ma(t){let e=document.getElementById(a.histCont);e&&e.remove(),e=document.createElement("div"),e.id=a.histCont,e.className=c.card,e.dataset[$.mark]="";let n=document.createElement("h4");n.className=c.cardTtl,n.textContent=He([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let i=document.createElement("div");i.className=c.histScrl;let o=document.createElement("table");o.id=a.histTbl;let r=document.createElement("thead"),s=document.createElement("tr");for(let m of["Time","Est. Wait","Change"]){let h=document.createElement("th");h.textContent=m,s.appendChild(h)}r.appendChild(s),o.appendChild(r);let u=document.createElement("tbody");for(let m=t.length-1;m>=0;m--){let h=t[m],g="--",y="";if(m>0){let _=h.minutes-t[m-1].minutes;_<0?(g=`${_}m`,y=c.dltDn):_>0?(g=`+${_}m`,y=c.dltUp):g="0m"}let v=document.createElement("tr"),q=[[h.timeStr,""],[_n(h.minutes),""],[g,y]];for(let[_,F]of q){let x=document.createElement("td");F&&(x.className=F),x.textContent=_,v.appendChild(x)}u.appendChild(v)}o.appendChild(u),i.appendChild(o),e.appendChild(i),e.appendChild(oo());let f=document.getElementById("last-updated");f&&(f.closest("div, p, section")||f.parentElement).insertAdjacentElement("afterend",e)}function Aa(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function ro(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),i=Aa();if(i!==null&&i>Vi&&!e.textContent.includes("(")){let s=_n(i);e.textContent=`${e.textContent} (${i} minutes / ${s})`}let o=n.textContent.trim().split(" (")[0],r=to(o);if(r&&l.setInterval(()=>{let s=Math.floor((Date.now()-r)/1e3);s>=0&&(n.textContent=`${o} (${s}s ago)`)},1e3),i!==null){let s=ka(),u=sessionStorage.getItem(s);u||(u=Math.random().toString(36).substring(2,11),sessionStorage.setItem(s,u)),T({queueHistory:{}}).then(f=>{let m=f.queueHistory||{},h=Date.now(),g={};for(let[_,F]of Object.entries(m)){if(!Array.isArray(F))continue;let x=F[F.length-1];x&&h-x.timestamp<Qi&&(g[_]=F)}let y=g[u]||[],v=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),q=y[y.length-1];(!q||q.minutes!==i||q.timeStr!==v)&&(y.push({timestamp:h,timeStr:v,minutes:i}),y.length>Xi&&y.shift(),g[u]=y,C({queueHistory:g})),Ma(y)})}}function ao(t,e){let n=document.getElementById("error_row");if(!n)return;let i;t?i=e?`Blocked for 24 hours, about ${se(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":i="Temporarily blocked. Log in in a new tab, then refresh this page.";let o=document.createElement("div");o.className="atlas_validationalert alert alert-danger warning",o.dataset[$.mark]="",o.textContent=i,n.replaceChildren(o),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function so(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&T({cfRetryAfter:null}).then(n=>{let i=parseInt(n.cfRetryAfter,10);if(!isNaN(i)){Ui("cfRetryAfter");let o=document.getElementById("what-happened-section");if(o){let r=document.createElement("div");r.id=a.cdCard,r.className=c.card,r.dataset[$.mark]="";let s=document.createElement("h4");s.className=c.cardTtl,s.textContent=He([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),r.appendChild(s);let u=document.createElement("div");u.id=a.cdTime,r.appendChild(u);let f=document.createElement("div");f.className=c.cdDiv,r.appendChild(f),r.appendChild(oo()),o.appendChild(r);let m=i,h=null,g=()=>{m>0?(u.textContent=se(m),m--):(u.classList.add(c.cdDiv+"-over"),u.textContent="You can try refreshing now!",h!=null&&l.clear(h))};g(),h=l.setInterval(g,1e3)}}})}async function co(){let t=document.querySelector(".username");if(!t)return;let n=(t.innerText||"").trim().match(/^(.*)\((\d+)\)\s*$/);if(!n)return;let[,i,o]=n,r=await U()||{},s=!r.id||r.id===o||String(r.id).includes(o)?r:{};s.name=i.trim(),s.id=o;let u=document.querySelectorAll("script");for(let f of u){let m=f.innerText.trim();if(m.includes("setAuthenticatedUserContext")){let h=/setAuthenticatedUserContext\('([^']*)'\)/,g=m.match(h);g&&(s.email=g[1])}}await C({profile:s})}async function lo(){let t=document.querySelector("#post_select");if(!t)return;let e=await gt();for(let n of t.options){if(!n.value)continue;e.findIndex(o=>o.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await zt(e)}var Da=["visa-information","fee-payment","appointment-confirmation"];function Ea(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(i=>{let o=i.querySelector(".text-bold");if(!o)return;let r=Ia(o.textContent);if(!Da.includes(r))return;let s=La(i);s&&(n[r]=s)}),Object.keys(n).length?n:null}function Ia(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function La(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function Be(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>ji)return null}catch{}return t.value}function Pa(t){let e=(t.posts||[]).filter(o=>o.Updated).sort((o,r)=>o.Updated-r.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},i=Be(t.cgiIdToken);return i&&(n.token=i),n}async function kn(){if(!N()||!await S("serverSync"))return;let t=await T(["profile","posts","cgiIdToken"]),e=Pa(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await fetch($n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(o=>o.json());if(!n.success)return;let i="0";n.contribs>0&&(i=n.contribs.toString()),n.contribs>10&&(i="10+"),n.contribs>0&&await C({contribs:{email:t.profile?.email,updated:Date.now(),count:i}})}catch{}}function Mn(t=0){N()&&document.querySelector("#appointment-card")&&S("serverSync").then(e=>{if(!e)return;let n=Ea();if(!n){t<Gi&&l.setTimeout(()=>Mn(t+1),Oe);return}T(["profile","cgiIdToken","savedDashboard"]).then(i=>{let o=Be(i.cgiIdToken);o&&JSON.stringify(n)!==JSON.stringify(i.savedDashboard)&&fetch($n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:i.profile,dashboard:n,token:o})}).then(r=>r.json()).then(r=>{r.success&&C({savedDashboard:n})}).catch(()=>{})})})}var qa=`${Kt}/extension-runtime-config.json`,Dn="vsRuntimeConfig",Ra=300*1e3,An=0,ce=null,w={slotWindowLabel:":05\u2013:13, :14\u2013:21, :24\u2013:31, :35\u2013:50, :54\u2013:02",slotWindows:[{slot:5,fromMin:0,toMin:2},{slot:1,fromMin:5,toMin:13},{slot:2,fromMin:14,toMin:21},{slot:3,fromMin:24,toMin:31},{slot:4,fromMin:35,toMin:50},{slot:5,fromMin:54,toMin:59}],windowStartsMin:[0,5,14,24,35,54],cityLoadingMaxMs:18e4,cityCalendarNoDatesMs:2e4,cityRotateMinGapMs:13e3,cityRotateMaxGapMs:18e3,cityHoldMaxMs:45e3,homeKeepaliveMinMs:6e5,homeKeepaliveMaxMs:6e5,homeKeepaliveDebounceMs:48e4,loadingStuckMs:12e4,loadingStuckDebounceMs:9e4,remoteVersion:0,source:"bundled"};function z(t,e,n,i){let o=Number(t);return Number.isFinite(o)?Math.min(n,Math.max(e,Math.round(o))):i}function Oa(t){if(!Array.isArray(t)||!t.length||t.length>24)return null;let e=[];for(let n of t){let i=z(n?.fromMin,0,59,NaN),o=z(n?.toMin,0,59,NaN);if(!Number.isFinite(i)||!Number.isFinite(o)||i>o)return null;let r=z(n?.slot,1,12,1);e.push({slot:r,fromMin:i,toMin:o})}return e}function Wa(t){let e=[...new Set(t.map(n=>n.fromMin))].sort((n,i)=>n-i);return e.length?e:w.windowStartsMin.slice()}function uo(t,e="remote"){if(!t||typeof t!="object")return!1;let n=Oa(t.slotWindows);if(n){w.slotWindows.length=0;for(let i of n)w.slotWindows.push(i);w.windowStartsMin=Wa(n)}return typeof t.slotWindowLabel=="string"&&t.slotWindowLabel.length<120&&(w.slotWindowLabel=t.slotWindowLabel),w.cityLoadingMaxMs=z(t.cityLoadingMaxMs,1e4,3e5,w.cityLoadingMaxMs),w.cityCalendarNoDatesMs=z(t.cityCalendarNoDatesMs,5e3,12e4,w.cityCalendarNoDatesMs),w.cityRotateMinGapMs=z(t.cityRotateMinGapMs,5e3,6e4,w.cityRotateMinGapMs),w.cityRotateMaxGapMs=z(t.cityRotateMaxGapMs,w.cityRotateMinGapMs,9e4,Math.max(w.cityRotateMinGapMs,w.cityRotateMaxGapMs)),w.cityHoldMaxMs=z(t.cityHoldMaxMs,1e4,18e4,w.cityHoldMaxMs),w.homeKeepaliveMinMs=z(t.homeKeepaliveMinMs,12e4,18e5,w.homeKeepaliveMinMs),w.homeKeepaliveMaxMs=z(t.homeKeepaliveMaxMs,w.homeKeepaliveMinMs,18e5,Math.max(w.homeKeepaliveMinMs,w.homeKeepaliveMaxMs)),w.homeKeepaliveDebounceMs=z(t.homeKeepaliveDebounceMs,6e4,18e5,w.homeKeepaliveDebounceMs),w.loadingStuckMs=z(t.loadingStuckMs,3e4,6e5,w.loadingStuckMs),w.loadingStuckDebounceMs=z(t.loadingStuckDebounceMs,3e4,6e5,w.loadingStuckDebounceMs),w.remoteVersion=z(t.version,0,1e9,w.remoteVersion),w.source=e,!0}async function Na(){try{let e=(await T(Dn))[Dn];e?.config&&uo(e.config,"cache")}catch{}}async function Ha(t){try{await C({[Dn]:{config:t,fetchedAt:Date.now()}})}catch{}}async function Ba({force:t=!1}={}){let e=Date.now();if(!t&&e-An<Ra)return w;if(ce)return ce;ce=(async()=>{await Na();try{let n=await fetch(qa,{method:"GET",cache:"no-store",signal:AbortSignal.timeout(8e3)});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.json();if(!i||typeof i!="object"||Array.isArray(i))throw new Error("bad json");if(i.script||i.code||i.eval)throw new Error("unsafe keys");uo(i,"remote"),await Ha(i),An=Date.now()}catch{An=Date.now()}return w})();try{return await ce}finally{ce=null}}function fo(){Ba().catch(()=>{})}var yt=null,le=null;function mo(){return yt||w.slotWindows}function it(){return le||(yt?.length?po(yt):w.slotWindowLabel)}var Ol=w.slotWindows,dt=4,wt=6;function po(t){return t?.length?t.map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", "):w.slotWindowLabel}function En(t){if(!Array.isArray(t))return[];let e=[];for(let n of t){if(e.length>=dt)break;let i=Number(n?.fromMin),o=Number(n?.durationMin??n?.duration);if(!Number.isFinite(i)||i<0||i>59)continue;let r=Math.min(wt,59-i);if(r<1)continue;if(!Number.isFinite(o)||o<1){let u=Number(n?.toMin);if(!Number.isFinite(u)||u<i||u>59||(o=Math.min(r,u-i),o<1))continue}o=Math.min(r,Math.max(1,Math.round(o)));let s=Math.min(59,i+o);e.push({slot:e.length+1,fromMin:Math.round(i),toMin:s,durationMin:o})}return e}function ho(t){let e=En(t||[]);return e.length?(yt=e.map(({slot:n,fromMin:i,toMin:o})=>({slot:n,fromMin:i,toMin:o})),le=po(yt),yt):(yt=null,le=null,null)}function In(){yt=null,le=null}function go(t){let e=t?.length?t:w.slotWindows,n=[];for(let i of e||[]){if(n.length>=dt)break;let o=Number(i.fromMin),r=Number(i.toMin);if(!Number.isFinite(o)||!Number.isFinite(r)||r<o||o===0&&r<=2&&(e||[]).some(f=>Number(f.fromMin)>=54))continue;let s=Math.min(wt,59-o);if(s<1)continue;let u=Math.min(s,Math.max(1,r-o));n.push({fromMin:o,durationMin:u})}return n}function bo(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=i=>Number(e.find(o=>o.type===i)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function Gt(t=new Date){let{minute:e}=bo(t),n=mo();for(let i of n)if(e>=i.fromMin&&e<=i.toMin)return i.slot;return 0}function ue(t=new Date){if(Gt(t))return 0;let{minute:e,second:n}=bo(t),i=e*60+n,o=mo(),r=[...new Set(o.map(u=>u.fromMin))].sort((u,f)=>u-f);for(let u of r){let f=u*60;if(i<f)return(f-i)*1e3}let s=r[0]??0;return(3600-i+s*60)*1e3}function Ln(t){return t<9e4?`${Math.ceil(t/1e3)}s`:`${Math.ceil(t/6e4)}m`}function Co(){let t=document.querySelector(p(a.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=a.selRow,t.dataset[$.mark]="",n.insertAdjacentElement("afterend",t);let i=document.createElement("span");return i.id=a.anchor,i.dataset[$.mark]="",i.dataset[$.w]=e.style.width,i.dataset[$.mw]=e.style.minWidth,i.hidden=!0,e.insertAdjacentElement("beforebegin",i),l.setStyle(e,"width","100%"),l.setStyle(e,"minWidth","0"),t.appendChild(e),t}var de="waitPillState",Fa=3600*1e3,yo=c.pillWait,Ua=c.pillDone;function Ka(t,e){let n=document.createElement("span");n.className=`${c.pill} ${e}`;let i=(o,r)=>{let s=document.createElement("span");s.className=o,s.textContent=r,n.appendChild(s)};return i(c.pillTtl,t.title),t.timer!==void 0&&i(c.pillTmr,t.timer),n}function za(t,e=Date.now()){if(t.kind==="waiting")return{variant:yo};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:yo}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:Ua}}return null}function Ga(t,e,n=new Date){let i=Ji(n);return t.seconds===void 0?{title:i}:{title:i,timer:se(t.seconds)}}var ja=class{#t=null;#e={kind:"idle"};#i=null;#n=null;#o=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get(de))[de];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>Fa){chrome.storage.local.remove(de);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#o=t,this.#r(),this.#c()}toggleClockMode(){l.alive&&(this.setClockMode(!this.#o),chrome.storage.local.set({waitPillClock:this.#o}))}render(t){return za(this.#e,t)}#l(t){return Ga(t,this.#o,new Date)}#r(){if(this.#t??=Va(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(c.hidden);return}this.#t.classList.remove(c.hidden),this.#t.replaceChildren(Ka(this.#l(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#i&&(l.clear(this.#i),this.#i=null),t.kind==="running"?(chrome.storage.local.set({[de]:t}),this.#i=l.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove(de),this.#r(),this.#c()}#u(){this.#r(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,S("audioAlert").then(t=>{t&&as()})))}#c(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=l.setInterval(()=>this.#r(),1e3):!t&&this.#n&&(l.clear(this.#n),this.#n=null)}},Vt=new ja,he="pillPosition",wo=4;function xo(t,e,n){return Math.max(e,Math.min(n,t))}function $o(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,i=e.height>0?e.height:36;return{w:n,h:i}}function jt(t,e,n){let{w:i,h:o}=$o(t),r=xo(e,0,Math.max(0,window.innerWidth-i)),s=xo(n,0,Math.max(0,window.innerHeight-o));return t.style.setProperty("left",r+"px","important"),t.style.setProperty("top",s+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:r,top:s}}function Ya(t){var e=!1,n=!1,i=0,o=0,r=0,s=0;function u(m){if(e){var h=m.touches?m.touches[0]:m,g=h.clientX-i,y=h.clientY-o;!n&&Math.abs(g)<wo&&Math.abs(y)<wo||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",jt(t,r+g,s+y),m.cancelable&&m.preventDefault())}}function f(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",f),document.removeEventListener("touchmove",u),document.removeEventListener("touchend",f),n){let m=t.getBoundingClientRect();chrome.storage.local.set({[he]:{top:Math.round(m.top),left:Math.round(m.left)}})}n=!1}}t.addEventListener("mousedown",function(m){if(m.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let h=t.getBoundingClientRect();i=m.clientX,o=m.clientY,r=h.left,s=h.top,jt(t,h.left,h.top),document.addEventListener("mousemove",u),document.addEventListener("mouseup",f),m.preventDefault(),m.stopPropagation()}),t.addEventListener("touchstart",function(m){e=!0,n=!1,delete t.dataset.skipClick;let h=t.getBoundingClientRect();i=m.touches[0].clientX,o=m.touches[0].clientY,r=h.left,s=h.top,jt(t,h.left,h.top),document.addEventListener("touchmove",u,{passive:!1}),document.addEventListener("touchend",f)},{passive:!0})}function Va(){let t=document.querySelector(p(a.waitTime));return t||(t=document.createElement("div"),t.id=a.waitTime,t.className=c.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),Ya(t),chrome.storage.local.get(he).then(e=>{let n=e[he];n&&typeof n.top=="number"&&typeof n.left=="number"&&jt(t,n.left,n.top)}),Za(t),t)}function So(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function Xa(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function Qa(t){let{w:e,h:n}=$o(t),i=12;return[{left:i,top:i},{left:Math.max(i,window.innerWidth-e-i),top:i},{left:i,top:Math.max(i,window.innerHeight-n-i)},{left:Math.max(i,window.innerWidth-e-i),top:Math.max(i,window.innerHeight-n-i)}]}async function Ja(){let e=(await chrome.storage.local.get(he))[he];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function Za(t){let e=!1,n=async()=>{if(!l.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(c.hidden))return;let i=Xa(),o=!!(i&&i.offsetParent!==null&&i.getBoundingClientRect().height>20),r=t.getBoundingClientRect();if(o&&So(r,i.getBoundingClientRect())){let s=i.getBoundingClientRect(),u=Qa(t),f=u.find(m=>{let h={left:m.left,top:m.top,right:m.left+r.width,bottom:m.top+r.height};return!So(h,s)})||u[2];e=!0,t.setAttribute("data-dodging",""),jt(t,f.left,f.top);return}if(e&&!o){e=!1,t.removeAttribute("data-dodging");let s=await Ja();s&&jt(t,s.left,s.top)}else o||t.removeAttribute("data-dodging")};l.setInterval(n,400),l.on(window,"resize",n)}async function Rn(){if(!l.alive||!await S("defaultWaitTime")||!await l.waitFor("#post_select",{attempts:We}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});Vt.setClockMode(t),await Vt.restore()}async function _o(){await S("defaultWaitTime")&&Vt.waiting()}async function Ge(t){await S("defaultWaitTime")&&Vt.run(t)}function ko(){Vt.toggleClockMode()}function Mo(t){Vt.setClockMode(t)}var fe=null,me=null,Fe=null;function Ao(){return Fe||(Fe=new(window.AudioContext||window.webkitAudioContext),l.disposable(()=>Fe?.close())),Fe}async function On(t=150){try{let e=Ao();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let o=e.currentTime,r=t/1e3;i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(.1,o+.01),i.gain.setValueAtTime(.1,o+Math.max(.01,r-.02)),i.gain.linearRampToValueAtTime(0,o+r),n.start(),n.stop(o+r)}catch(e){console.error("Audio beep failed:",e)}}function ts(t,e=125,n=125){let i=0,o=()=>{i>=t||(On(e),i++,l.setTimeout(o,e+n))};o()}var Pn=4,vo=50,To=50,es=600;function Do(){if(me)return;let t=()=>{ts(Pn,vo,To);let e=Pn*vo+(Pn-1)*To;me=l.setTimeout(t,e+es)};t()}var ns=250,is=10,os=300,rs=1e3;function as(){if(fe)return;let t=[];for(let o=0;o<=os;o+=is)t.push(o);let e=Date.now(),n=0,i=()=>{let o=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&o>=t[n];){let r=n===t.length-1;On(r?rs:ns),n++}if(n<t.length){let r=t[n],s=e+r*1e3,u=Math.max(0,s-Date.now());fe=l.setTimeout(i,u)}else Xt()};i()}function Xt(){fe&&(l.clear(fe),fe=null),me&&(l.clear(me),me=null),qn()}var Ue=null,Ke=null,Yt=null,ze=null,pe=null;async function Eo(){qn();try{let t=Ao();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=880,i.frequency.value=1320,o.gain.value=.85,r.gain.value=.65,n.connect(o).connect(e),i.connect(r).connect(e);let s=t.createOscillator(),u=t.createGain();s.type="triangle",s.frequency.value=3.2,u.gain.value=280,s.connect(u),u.connect(n.frequency),u.connect(i.frequency);let f=t.currentTime;n.start(f),i.start(f),s.start(f),Yt={osc1:n,osc2:i,lfo:s,master:e};let m=()=>{Yt&&(On(500),Ke=l.setTimeout(m,1800))};m(),Ue=l.setTimeout(qn,12e4),pe=document.title;let h=!1,g=()=>{Yt&&(document.title=h?pe:"!!! SUBMIT CLICKED !!!",h=!h,ze=l.setTimeout(g,450))};g()}catch(t){console.error("Submit alarm failed:",t)}}function qn(){if(Ue&&(l.clear(Ue),Ue=null),Ke&&(l.clear(Ke),Ke=null),ze&&(l.clear(ze),ze=null),pe&&(document.title=pe,pe=null),Yt){try{let{osc1:t,osc2:e,lfo:n}=Yt;t.stop(),e.stop(),n.stop()}catch{}Yt=null}}function ss(){document.querySelector(p(a.recheck))?.remove();for(let t of document.querySelectorAll("button"))(t.textContent||"").trim()==="Recheck"&&t.remove()}async function Wn(){l.alive&&ss()}async function Hn(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await l.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let i=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(u=>u.innerText.trim()===i))continue;let r=document.createElement("li");r.className="usa-sidenav__item",r.dataset[$.mark]="";let s=document.createElement("a");s.href=n.link,s.className=c.sideLink,s.target="_self",s.textContent=n.text,r.appendChild(s),t.appendChild(r)}}function k(t,e,n){let i=document.createElement(t);return e&&(i.className=e),n?.appendChild(i),i}function je(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,r]=n;return`${r}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return null}function Nn(t){let e=je(t);if(!e)return String(t||"");let[n,i,o]=e.split("-").map(Number);if(!n||!i||!o)return e;try{return new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(new Date(n,i-1,o))}catch{return e}}function cs(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);if(n)return n[1].slice(0,5);let i=e.match(/^(\d{1,2}:\d{2})/);return i?i[1]:e}function Io(t){let e=document.querySelector(p(a.datesCont));if(e){let o=e.querySelector(p(a.datesPara)),r=e.querySelector("h2");if(r&&t&&(r.textContent=t),o)return{container:e,details:o}}let n=document.querySelector("#page_form");if(!n)return null;e?.remove();let i=ls(t||"");return n.appendChild(i.container),i}function Lo(t){if(t.response.HasError)return;let e=document.querySelector("#post_select"),n=e?.options[e.selectedIndex]?.text??"",i=(t.response.ScheduleDays||[]).map(m=>je(m?.Date)).filter(Boolean).sort((m,h)=>m.localeCompare(h));document.querySelector(p(a.datesCont))?.remove();let o=Io(n);if(!o)return;let{details:r}=o;r.replaceChildren();let s=k("div",c.slotsSum,r);if(!i.length){s.textContent="No slots available";return}s.textContent=`${i.length} date${i.length===1?"":"s"} available`;let u={};for(let m of i){let h=m.slice(0,7);(u[h]||=[]).push(m)}for(let[m,h]of Object.entries(u)){let g=k("div",null,r),y=document.createElement("strong");y.textContent=m,g.append(y,`: ${h.map(v=>v.slice(8,10)).join(", ")}`)}let f=k("div",null,r);f.style.marginTop="0.5em";for(let m of i){let h=k("div",null,f);h.textContent=`\u2022 ${Nn(m)} (${m})`}}function Po(t,e,n){let i=document.querySelector("#post_select"),o=n||i?.options[i.selectedIndex]?.text||"",r=je(e)||je(t?.[0]?.Date)||"",s=(t||[]).filter(x=>x&&x.Time).map(x=>({time:cs(x.Time),avail:x.EntriesAvailable!=null&&Number.isFinite(Number(x.EntriesAvailable))?Number(x.EntriesAvailable):null,raw:x})).sort((x,E)=>String(x.time).localeCompare(String(E.time))),u=Io(o);if(!u)return;let{details:f}=u;f.replaceChildren();let m=k("div",c.slotsSum,f);if(!s.length){m.textContent=r?`No time slots on ${Nn(r)}`:"No time slots available";return}let h=s.filter(x=>x.avail==null||x.avail>0),g=h.reduce((x,E)=>x+(E.avail||0),0),y=r?Nn(r):"selected date";if(m.textContent=g>0?`${h.length} time slot${h.length===1?"":"s"} on ${y} \xB7 ${g} available`:`${s.length} time slot${s.length===1?"":"s"} on ${y}`,r){let x=k("div",null,f);x.style.margin="0.35em 0 0.6em",x.textContent=`Date: ${y} (${r})`}let v=k("table",c.slotsTbl,f);v.id=a.slotsTbl;let q=k("thead",null,v),_=k("tr",null,q);for(let x of["Time","Availability"]){let E=k("th",null,_);E.textContent=x}let F=k("tbody",null,v);for(let x of s){let E=k("tr",null,F);x.avail===0&&(E.style.opacity="0.55");let ut=k("td",null,E);ut.textContent=x.time;let Ta=k("td",null,E);Ta.textContent=x.avail==null?"\u2014":String(x.avail)}}function ls(t){let e=k("div","row");e.id=a.datesCont;let n=k("div","col-sm-12 atlas_section mt-3",e),i=k("div","col-sm-12 atlas_section_header_row",k("div","row",n));k("h2",null,i).textContent=t;let o=k("div",null,k("div","col-sm-12",k("div","row",n)));return o.id=a.datesPara,{container:e,details:o}}var qo=null;function us(){let t=document.querySelector(p(a.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return l.setStyle(n,"display","flex"),l.setStyle(n,"alignItems","center"),l.setStyle(n,"justifyContent","flex-end"),l.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=a.ofcDate,t.dataset[$.mark]="",e.insertAdjacentElement("beforebegin",t),t}function ds(){if(!location.pathname.includes("/schedule"))return;let t=qo;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=us();n&&(n.textContent=`OFC (Estimate): ${Zi(e.appointmentDateStr)}`)}function Ro(t){chrome.runtime?.id&&(qo=t.data.data,l.waitFor("#submitbtn").then(e=>{e&&ds()}))}var Ye=new Map,Oo=45e3,Ve=new Map,Wo=8e3,No=0;function Xe(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function Qe(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function fs(t,e){return`${t}:${e.slice(0,5).join(",")}`}function ms(t){let e=Date.now(),n=Ye.get(t);if(n&&e-n<Oo)return!1;Ye.set(t,e);for(let[i,o]of Ye)e-o>Oo*4&&Ye.delete(i);return!0}function ps(t){let e=Date.now(),n=Ve.get(t);if(n&&e-n<Wo)return!1;Ve.set(t,e);for(let[i,o]of Ve)e-o>Wo*6&&Ve.delete(i);return!0}async function Ho(){return await S("telegramViaServer")!==!1}async function Bo(t,{kind:e="alert",dedupKey:n="",skipDedup:i=!1,notifyMuktesh:o=!0}={}){if(t&&await Ho())try{await fetch(zi,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:i,notify_muktesh:o}),signal:AbortSignal.timeout(2e4)})}catch{}}function hs(t,{kind:e="screen",dedupKey:n="",waitMs:i=0,skipDedup:o=!1,notifyMuktesh:r=!0}={}){l.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:i,skipDedup:o,notifyMuktesh:r,captureScreenshot:!0})}async function gs(t,e,n){let i=Xe(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&r.push(`\u{1FAAA} <b>Visa:</b> ${n}`),r.push(`\u{1F550} <b>Checked:</b> ${o} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),r.push(`\u{1F4C6} <b>Dates (${i.length}):</b>`,"");for(let s of i.slice(0,30))r.push(`\u{1F7E2} <b>${Qe(s)}</b>`);return i.length>30&&r.push("",`\u2795 <i>+${i.length-30} more dates</i>`),r.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),r.join(`
`)}function bs(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",i=document.querySelector("#datepicker")?.value||"\u2014",r=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:i,time:r}}async function Fo(t,{postId:e,postName:n,hasError:i}={}){if(i||!t?.length)return;let o=Xe(t);if(!o.length||!await S("telegramAlert"))return;let r=fs(e||n||"unknown",o);if(!ms(r))return;let s=await U(),u=await gs(n,t,s?.visa||"");await Bo(u,{kind:"slots",dedupKey:r,notifyMuktesh:!0})}function ys(t,e,n){let i=Xe(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`;if(i.length){let s=i.slice(0,5).map(u=>Qe(u)).join(", ");return`<b>DATES AVAILABLE</b>
\u{1F3DB}\uFE0F ${r}
\u{1F4C6} ${i.length} date(s)
${s}${i.length>5?"\u2026":""}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}return`<b>City changed \u2014 no dates</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}function ws(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=e?Qe(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${i}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function xs(t,e,n){let i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?Qe(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u23F0 ${n} slot(s)
\u{1F550} ${i} IST
\u{1F4F2} Visa Slot 6`}async function Qt(t,{kind:e="screen",dedupKey:n,waitMs:i=0,skipDedup:o=!1}={}){if(await S("telegramScreenshots")===!1||!await Ho())return;let r=n||`${e}:${String(t).slice(0,80)}`;!o&&!ps(r)||hs(t,{kind:e,dedupKey:r,waitMs:i,skipDedup:o,notifyMuktesh:!0})}async function Uo(t,{postId:e,postName:n,hasError:i}={}){let o=ys(n,t,i),r=Xe(t),s=r.length?"dates":"city";await Qt(o,{kind:s,dedupKey:`${s}:${e||n}:${r.length}:${i?1:0}`,waitMs:r.length?1400:900})}async function Ko(t,e){await Qt(ws(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function zo(t,e,n){await Qt(xs(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function Go(){let t=Date.now();if(t-No<8e3)return;No=t;let e=await U(),{city:n,date:i,time:o}=bs(),r=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),s=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${i}`,`\u23F0 <b>Time:</b> ${o}`];e?.email&&s.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&s.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),s.push(`\u{1F550} <b>When:</b> ${r} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let u=s.join(`
`);await Bo(u,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await Qt(u,{kind:"submit",skipDedup:!0,waitMs:200})}var Je=25;function Ss(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Fn(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let i=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,i),n-1)}function Yo(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function Vo(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function Un(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function jo(t){if(!t||t.disabled)return!1;try{let e=t.closest("tr"),i=[t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,t.closest("label"),t,e].filter(Boolean);for(let o of i)o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),o.click();(t.type==="radio"||t.type==="checkbox")&&(t.checked=!0),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function Xo(){let t=new Set,e=[],n=i=>{if(!i||t.has(i)||Un(i)||i.disabled)return;let o=i.closest("tr");o&&Vo(o)||(t.add(i),e.push(i))};for(let i of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let o of document.querySelectorAll(`${i}:not([disabled])`))n(o);return e}function vs(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!Yo(n)||Vo(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function Ts(t){for(let e of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(e.tagName!=="SELECT"||e.disabled||Un(e))continue;let n=[...e.options].filter(o=>!o.disabled&&o.value&&o.value!=="0"&&Yo({textContent:o.textContent}));if(!n.length)continue;let i=Fn(n.length,t);return e.value=n[i].value,e.dispatchEvent(new Event("change",{bubbles:!0})),!0}return!1}function Cs(t){if(Ts(t))return!0;let e=Xo();if(e.length){let i=Fn(e.length,t);if(jo(e[i]))return!0}let n=vs();if(n.length){let i=Fn(n.length,t),o=n[i],r=o.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(r&&jo(r))return!0;let s=o.querySelector("label");if(s)return s.click(),!!o.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function K(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!Un(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function $s({slotIndex:t=0,maxMs:e=12e3,pollMs:n=Je,onTick:i}={}){let o=Date.now()+e,r=Math.max(10,n||25);return new Promise(s=>{let u=()=>{if(!l.alive)return s(!1);if(i?.(),Cs(t)||K())return s(!0);if(Date.now()>=o)return s(!1);l.setTimeout(u,r)};u()})}function ge({time:t,date:e,slotIndex:n,pollMs:i,maxMs:o}){let r=n??0,s=o||15e3,u=i||Je;return l.send({action:"forcePickTimeSlot",slotIndex:r,maxMs:s,pollMs:u}),l.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:r,pollMs:u,domWaitMs:0,maxMs:s}),$s({slotIndex:r,maxMs:s,pollMs:u})}var Bn=!1;function Qo({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(Bn)return;Bn=!0;let i=!1,o=async()=>{if(!(!l.alive||i)){if(K()){n?.();return}try{if(t&&!await t())return}catch{return}Xo().length&&(i=!0,await ge({slotIndex:e,time:"00:00",maxMs:800,pollMs:Je}),i=!1,K()&&n?.())}};l.setInterval(o,Je);let r=document.querySelector("#page_form")||document.body,s=new MutationObserver(()=>o());s.observe(r,{childList:!0,subtree:!0}),l.disposable(()=>{s.disconnect(),Bn=!1})}function Jo(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let i=Ss(n?.Time);if(!i)continue;let o=i.match(/(\d{1,2}):(\d{2})/);if(!o)continue;let[,r,s]=o;if(e.includes(`${r}:${s}`)||e.includes(`${parseInt(r,10)}:${s}`))return!0}return!1}var Ze="submitErrors",Zo=50,_s=45e3,er=0,Kn=new Set,be=null;function ks(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",i=document.querySelector("#datepicker")?.value||"";return{city:e,date:i,url:location.href}}function ye(){er=Date.now()+_s,Kn.clear(),Ls()}function tn(){return Date.now()<er}function Ms(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function As(t){let e=await T({[Ze]:[]}),n=Array.isArray(e[Ze])?e[Ze]:[];n.push(t),n.length>Zo&&n.splice(0,n.length-Zo),await C({[Ze]:n})}function tr(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function Ds(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${tr(t.source)}`,`\u{1F4AC} <b>Message:</b> ${tr(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let i=n.join(`
`);await Qt(i,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function we(t,e,n={}){let i=String(e||"").trim();if(!i||!tn()&&!n.force)return;let o=Ms(t,i);if(Kn.has(o))return;Kn.add(o);let r=ks(),s=await U(),u={at:Date.now(),source:String(t||"unknown"),message:i.slice(0,2e3),city:n.city||r.city,date:n.date||r.date,url:n.url||r.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:s?.email||""};await As(u);try{await Ds(u)}catch{}}function Es(t){if(!tn())return;let e=t?.status,n=t?.retryAfter,i=t?.cgiBlock,o=`Request failed (HTTP ${e||"?"})`;n!=null&&(o+=` \u2014 retry after ${n}s`),i&&(o+=" \u2014 CGI access limitation"),we("ajax_error",o,{status:e})}function nr(t){if(!tn()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){Es({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",o=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";we("ajax_response",o,{route:t.tail||""})}var Is=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function Ls(){be&&l.clear(be);let t=()=>{if(!l.alive||!tn()){be=null;return}for(let e of Is)for(let n of document.querySelectorAll(e)){let i=(n.textContent||"").replace(/\s+/g," ").trim();!i||i.length<4||we("page_validation",i)}be=l.setTimeout(t,600)};be=l.setTimeout(t,500)}var Ps=["cities","from","to","submitEnabled","citiesEnabled","enabled","slotWindows","termsAgreed","termsPassed","termsAgreedAt"];function ir(t){if(!t||typeof t!="object")return{};let e={};for(let n of Ps)n in t&&(e[n]=t[n]);return typeof e.submitEnabled!="boolean"&&typeof e.enabled=="boolean"&&(e.submitEnabled=e.enabled),delete e.enabled,e}function or(t,e){if(!e||typeof e!="object")return t||null;let n=t&&typeof t=="object"?{...t}:{},i=Number(n.serverUpdatedAt)||0,o=Number(e.updatedAt)||0;if(o&&i&&o<i)return n;let r=ir(e),s={...n,...r};return typeof r.submitEnabled=="boolean"&&(s.enabled=r.submitEnabled),e.updatedAt&&(s.serverUpdatedAt=e.updatedAt),s}async function rr(){let[t,e]=await Promise.all([U(),T(["cgiIdToken"])]),n=Be(e.cgiIdToken);return{profile:t,token:n}}async function ar(t){if(!N()||!await S("serverSync"))return!1;let e=ir(t);if(!Object.keys(e).length)return!1;let{profile:n,token:i}=await rr();if(!n?.id&&!n?.email)return!1;try{let o={profile:n,prefs:e};i&&(o.token=i);let r=await fetch(Re,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(s=>s.json());return!!(r&&r.success)}catch{return!1}}async function sr(){if(!N()||!await S("serverSync"))return null;let{profile:t,token:e}=await rr();if(!t?.id&&!t?.email)return null;try{let n=new URLSearchParams;t.id&&n.set("applicant_id",String(t.id)),t.email&&n.set("email",String(t.email));let i=await fetch(`${Re}?${n.toString()}`,{method:"GET",headers:{Accept:"application/json"}}).then(r=>r.json());if(i?.prefs)return i.prefs;let o={profile:t};return e&&(o.token=e),i=await fetch(Re,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(r=>r.json()),i?.prefs||null}catch{return null}}var St="aiSubmitByAccount",$e=8e3;var j=25,qs=80,rn=0,an=1e4,wr=1e3;function _e(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}function ei(){return w.cityRotateMinGapMs}function Rs(){return w.cityRotateMaxGapMs}function ve(){return w.cityHoldMaxMs}function ot(){return w.cityLoadingMaxMs}function xt(){return w.cityCalendarNoDatesMs}var cr=5e3,jn=2e4,Os=15e3;function Ct(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function ni(){return/\/ofc-schedule\b/i.test(location.pathname)}function A(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var Ws=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function nn(t,e){let n=Ws[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(o=>{let r=e===o?" selected":"";return`<option value="${o.replace(/"/g,"&quot;")}"${r}>${o}</option>`}).join("")}function Jt(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function Rt(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function Ns(t,e,n){return`${t}-${String(e+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`}function Hs(t){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(t))return null;let[e,n,i]=t.split("-").map(Number),o=new Date(e,n-1,i);return o.getFullYear()!==e||o.getMonth()!==n-1||o.getDate()!==i?null:o}function ii(){for(let t of["from","to"]){let e=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo)),n=document.querySelector(p(t==="from"?a.aiFromBtn:a.aiToBtn));if(!n)continue;let i=e?.value||"";n.textContent=i?Rt(i):"Select date"}}function zn(t,e){let n=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo));if(n&&(n.value=e||""),t==="from"){let i=document.querySelector(p(a.aiTo));i&&e&&i.value&&i.value<e&&(i.value="")}ii()}var Y={y:0,m0:0,which:"from"};function vt(){document.querySelector(p(a.aiCal))?.classList.add(c.hidden)}function oi(t){let e=t.target;return e?e.nodeType===3?e.parentElement:e:null}function Yn(){let t=document.querySelector(p(a.aiCal));if(!t)return;let{y:e,m0:n,which:i}=Y,o=document.querySelector(p(i==="from"?a.aiFrom:a.aiTo))?.value||"",r=Jt(),s=i==="to"&&document.querySelector(p(a.aiFrom))?.value||Jt(),u=new Date(e,n,1).toLocaleDateString("en-IN",{month:"long",year:"numeric"}),f=new Date(e,n,1).getDay(),m=new Date(e,n+1,0).getDate(),h=new Date(e,n,0).getDate(),g="";for(let y of["S","M","T","W","T","F","S"])g+=`<div class="${c.aiHint}">${y}</div>`;for(let y=0;y<42;y++){let v,q=e,_=n,F=!1;y<f?(v=h-f+y+1,_=n-1,_<0&&(_=11,q=e-1),F=!0):y>=f+m?(v=y-f-m+1,_=n+1,_>11&&(_=0,q=e+1),F=!0):v=y-f+1;let x=Ns(q,_,v),E=x<s,ut=[c.aiCalDay,F?c.aiCalMuted:"",E?c.aiCalMuted:"",x===r?c.aiCalToday:"",x===o?c.aiCalOn:""].filter(Boolean).join(" ");g+=`<button type="button" class="${ut}" data-iso="${x}" ${E?'disabled aria-disabled="true"':""}>${v}</button>`}t.innerHTML=`
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
  `}function Bs(t){let e=document.querySelector(p(a.aiCal)),i=oi(t)?.closest?.("button");if(!e||!i||!e.contains(i))return;t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation();let o=i.getAttribute("data-cal"),r=Y.which,s=r==="to"&&document.querySelector(p(a.aiFrom))?.value||Jt();if(o==="prev"){Y.m0-=1,Y.m0<0&&(Y.m0=11,Y.y-=1),Yn();return}if(o==="next"){Y.m0+=1,Y.m0>11&&(Y.m0=0,Y.y+=1),Yn();return}if(o==="clear"){zn(r,""),vt();return}if(o==="today"){let f=Jt();f>=s&&(zn(r,f),vt(),yr());return}if(i.disabled||i.getAttribute("aria-disabled")==="true")return;let u=i.getAttribute("data-iso");!u||u<s||(zn(r,u),vt(),yr())}function lr(t){let e=document.querySelector(p(a.aiCal));if(!e||!t)return;let n=t.getBoundingClientRect(),i=Math.min(340,window.innerWidth-16),o=e.offsetHeight||360,r=Math.max(8,Math.min(n.left,window.innerWidth-i-8)),s=n.bottom+6;s+o>window.innerHeight-8&&n.top-6-o>=8?s=n.top-6-o:s=Math.max(8,Math.min(s,window.innerHeight-o-8)),e.style.position="fixed",e.style.top=`${Math.round(s)}px`,e.style.left=`${Math.round(r)}px`,e.style.width=`${i}px`,e.style.right="auto",e.style.bottom="auto"}function ur(t,e){let n=document.querySelector(p(a.aiCal));n||(n=document.createElement("div"),n.id=a.aiCal,n.className=`${c.aiCal} ${c.hidden}`,n.dataset[$.mark]="",document.body.appendChild(n),l.on(n,"pointerdown",Bs,{capture:!0}),l.on(n,"click",r=>{n.contains(oi(r))&&(r.preventDefault(),r.stopPropagation())},{capture:!0}));let i=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo))?.value,o=Hs(i)||new Date;Y={y:o.getFullYear(),m0:o.getMonth(),which:t},Yn(),n.classList.remove(c.hidden),lr(e),requestAnimationFrame(()=>lr(e))}function $t(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function Ot(t){return!!(t&&t.citiesEnabled)}async function H(){let t=await U();return t?.id?String(t.id):null}async function I(t){return t&&((await T(St))[St]||{})[t]||null}async function ri(t,e){if(!t)return;let i=(await T(St))[St]||{};e==null?delete i[t]:i[t]=e,await C({[St]:i})}var X=!1;function ke(){return X}function xr(){X=!0,Te(),Se()}function _t(){X=!1,R=!1,Te()}async function Sr(t){xr();let e=await I(t);if(!e){Q();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await ri(t,e),Q()}function Me(t,e,n){let i=String(t||"").slice(0,10);return!(!i||i.length<10||e&&i<e||n&&i>n)}async function ct(){if(X||A()||!Ct())return null;let t=await H();if(!t)return null;let e=await I(t);return!$t(e)||!e.from||!e.to?null:{...e,accountId:t}}async function Ae(){if(X||A()||!Ct())return null;let t=await H();if(!t)return null;let e=await I(t);return!Ot(e)||!e.cities?.length?null:(Ir(e),{...e,accountId:t})}function ai(t,e,n){let i=new Date;return i.setHours(0,0,0,0),(t||[]).filter(o=>o&&typeof o.Date=="string"&&o.Date.length>=10).filter(o=>Me(o.Date,e,n)).filter(o=>{let[r,s,u]=o.Date.slice(0,10).split("-").map(Number);return new Date(r,s-1,u)>=i}).sort((o,r)=>String(o.Date).localeCompare(String(r.Date)))}var R=!1,mt=null,pt=null,st=!1,Tt=0,V=!1,G=0,Wt=0,xe=0,Pt=0,te=!1,rt=null,ft=0,L=!1,O=0,Zt=null,Lt=null,Nt=0,dr=!1,fr="",mr=!1,Vn=0;function Fs(t){return(t||[]).map(e=>e.id).join("")}function vr(){let t=document.querySelector(p(a.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function pr(t){let e=document.querySelector(p(a.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function Te(){mt&&(l.clear(mt),mt=null),R=!1}function Ht(){Zt&&(l.clear(Zt),Zt=null)}function Tr(){Ht(),O||(O=Date.now());let t=Math.max(500,ve()-(Date.now()-O));Zt=l.setTimeout(()=>{Zt=null,!(!L||!V||!l.alive)&&(L=!1,O=0,J(Date.now()),b(`City Change \u2014 booking hold timed out (${ve()/1e3}s); next city in 13\u201318s\u2026`),D())},t)}function Us(){Lt&&(l.clear(Lt),Lt=null)}function sn(t=Date.now()){let e=!1;if(st&&Tt&&t-Tt>=Os&&(st=!1,Tt=0,e=!0),L&&(O||(O=t),t-O>=ve()?(Ht(),L=!1,O=0,e=!0):Zt||Tr()),te){ft||(ft=t);let i=Xn()?ot():xt();if(t-ft>=i)et(),e=!0;else if(!rt){let o=Math.max(500,i-(t-ft));rt=l.setTimeout(()=>{if(rt=null,!V||L)return;let r=Xn(),s=r?ot():xt();if(Date.now()-(ft||0)<s){sn();return}et(),J(Date.now()),b(r?`City Change \u2014 still Loading after ${ot()/1e3}s; changing city\u2026`:`City Change \u2014 calendar up but no dates after ${xt()/1e3}s; changing city\u2026`),D()},o)}}return R&&!mt&&(R=!1,e=!0),e}function Cr(){if(Lt||!V)return;let t=()=>{if(Lt=null,!V||!l.alive||X)return;let e=Date.now(),n=sn(e),i=!!Gt(new Date(e)),o=!!pt,s=!(!i&&o||(te||L||R)&&o)&&Nt>0&&e-Nt>=jn;if(n||s||!o&&!st)s?(st=!1,Tt=0,et(),Ht(),L=!1,O=0,R&&!mt&&(R=!1),G=e,b(i?"City Change \u2014 unstuck; hopping now\u2026":`City Change \u2014 unstuck; waiting for IST window ${it()}\u2026`)):n?(G=e,b(i?"City Change \u2014 lock cleared; hopping now\u2026":`City Change \u2014 lock cleared; next IST window ${it()}\u2026`)):b("City Change \u2014 timer lost; restarting\u2026"),D();else if(!i&&o){let f=ue(new Date(e));b(`City Change \u2014 waiting for slot window (IST ${it()}, next in ${Ln(f)})`)}V&&(Lt=l.setTimeout(t,cr))};Lt=l.setTimeout(t,cr)}function Se(){ui(),Us(),Ht(),st=!1,Tt=0,V=!1,L=!1,O=0,G=0,Wt=0,Nt=0,et()}function et(){te=!1,ft=0,rt&&(l.clear(rt),rt=null)}function si(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let i=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(i))continue;let o=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let r of o)if(r&&/\bLoading\.{0,3}\b/i.test((r.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let o=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(o))continue;let r=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(r))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function Xn(){return si()}function Ks(){te=!0,ft=Date.now(),rt&&l.clear(rt),rt=l.setTimeout(()=>{rt=null,!(!V||L)&&(et(),J(Date.now()),b(`City Change \u2014 still Loading after ${ot()/1e3}s; changing city\u2026`),D())},ot())}function ci(t){let e=Math.max(0,Number(t)||0)*1e3;Pt=Math.max(Pt,Date.now()+e),G=Math.max(G,Pt),et(),D()}function $r(){et()}function ee(){X||(L=!0,O||(O=Date.now()),ui(),et(),Tr(),b("City Change \u2014 paused (Auto Submit booking)\u2026"))}function kt(){L&&(Ht(),L=!1,O=0,!(!V||X)&&(J(Date.now()),b("City Change \u2014 resuming; next city in 13\u201318s\u2026"),D()))}async function cn(){let t=await ct();if(!t)return;let e=Date.now();if(e-Vn<6e4)return;Vn=e;let i=document.querySelector("#post_select")?.value;if(!i){b("Auto Submit ON \u2014 pick a city first.");return}let r=(await gt()).find(u=>String(u.ID)===String(i)),s=r?.Days;if(Array.isArray(s)&&s.length){let u=ai(s,t.from,t.to);if(u.length){ee();let f=_e(u.length),m=u[f].Date;b(`Auto Submit: picking date #${f+1} (${m.slice(0,10)})\u2026`),l.send({action:"selectFirstDate",date:m,maxMs:$e,pollMs:j});return}b(`Auto Submit ON \u2014 no dates in your range on ${r.Name||"this city"} yet.`);return}b("Auto Submit ON \u2014 loading slots for current city\u2026"),l.send({action:"selectPost",postId:String(i)})}function li(){Vn=0}function ui(){pt&&(l.clear(pt),pt=null)}function zs(t,e){return t+Math.random()*(e-t)}function Gs(){return zs(ei(),Rs())}function J(t=Date.now()){G=t+Gs()}function js(t=Date.now()){let e=ue(new Date(t));if(e>0)return e;if(Pt>t)return Pt-t;if(Wt){let n=Wt+ei()-t;if(n>0)return n}return G>t?G-t:0}function D(){if(!V)return;if(ui(),L||te){pt=l.setTimeout(()=>{Gn()},500);return}let t=Date.now(),e=ue(new Date(t));if(e>0){G>t&&(G=t),e>=jn&&(Nt=t),pt=l.setTimeout(()=>{Gn()},e);return}let n=0;Pt>t&&(n=Math.max(n,Pt-t)),Wt&&(n=Math.max(n,Wt+ei()-t)),G>t&&(n=Math.max(n,G-t)),n=Math.max(0,n),n>=jn&&(Nt=Date.now()),pt=l.setTimeout(()=>{Gn()},n)}function Ys(t,e){if(!t.length)return null;if(t.length===1)return xe=0,t[0];let n=t.findIndex(o=>String(o.id)===String(e));n<0&&(n=Math.max(0,Math.min(xe,t.length-1)));let i=(n+1)%t.length;return xe=i,t[i]}function di(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function qt(){let t=document.querySelector(p(a.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function De(){return{from:document.querySelector(p(a.aiFrom))?.value||null,to:document.querySelector(p(a.aiTo))?.value||null}}function Ce(t=[],{force:e=!1}={}){let n=document.querySelector(p(a.aiCities));if(!n)return;let i=di(),o=Fs(i),r=document.querySelector(p(a.aiPanel)),s=r&&!r.classList.contains(c.hidden),u=vr();if(!e&&o===fr&&n.querySelector('input[type="checkbox"]'))return;fr=o;let f=new Set(s&&u.length&&!e&&!t.length?u:(t.length?t:u).map(String));if(n.replaceChildren(),!i.length){n.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let m of i){let h=document.createElement("label"),g=document.createElement("input");g.type="checkbox",g.value=m.id,g.dataset.name=m.name,g.checked=f.has(m.id),h.append(g,document.createTextNode(m.name)),n.appendChild(h)}}function Vs(t){let e=t?.cities||[];return e.length?e.map(n=>n.name||n.id).join(", "):"\u2014"}async function ht(t,e={}){let n=await I(t)||{},{from:i,to:o}=De(),r=qt(),s={...n,from:i||n.from||null,to:o||n.to||null,cities:r.length?r:n.cities||[],loginId:document.querySelector(p(a.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(p(a.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(u=>{let f=[a.aiQ1,a.aiQ2,a.aiQ3][u],m=[a.aiA1,a.aiA2,a.aiA3][u];return{q:document.querySelector(p(f))?.value?.trim()||n.security?.[u]?.q||"",a:document.querySelector(p(m))?.value?.trim()||n.security?.[u]?.a||"",set:u+1}}),...e};return typeof s.submitEnabled=="boolean"&&(s.enabled=s.submitEnabled),s.serverUpdatedAt=Date.now(),await ri(t,s),Xs(s),s}var en=null,Qn=null;function Xs(t){en&&l.clear(en),en=l.setTimeout(()=>{en=null,ar(t).catch(()=>{})},400)}async function _r(t){if(!t||Qn===t)return null;let e=await sr();if(Qn=t,!e)return null;let n=await I(t)||{},i=or(n,e);return i?(i.loginId=n.loginId||i.loginId||"",i.loginPass=n.loginPass||"",i.security=n.security||i.security||[],typeof i.submitEnabled=="boolean"&&(i.enabled=i.submitEnabled),await ri(t,i),i):null}async function Qs(t,e){if(!Gt()||L||R)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let i=String(t);return String(n.value)===i?!1:(Ks(),b(`Switching city \u2192 ${e||t}\u2026`),l.send({action:"selectPost",postId:i}),!0)}function fi(){dr||!document.querySelector("#post_select")||(dr=!0)}async function Gn(){if(!(st||!V)){st=!0,Tt=Date.now(),Nt=Date.now(),pt=null;try{if(X||A()||!l.alive){Se();return}if(sn()){G=Date.now(),b(Gt()?"City Change \u2014 auto-unstuck; hopping now\u2026":`City Change \u2014 auto-unstuck; waiting IST ${it()}\u2026`),D();return}if(L||R){let g=O?Date.now()-O:0;if(L&&g>=ve()){Ht(),L=!1,O=0,J(Date.now()),b("City Change \u2014 hold expired; next city in 13\u201318s\u2026"),D();return}let y=Math.max(0,ve()-g);b(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(y/1e3)}s`),D();return}let t=Date.now(),e=Gt(new Date(t)),n=ue(new Date(t));if(!e){b(`City Change \u2014 waiting for slot window (IST ${it()}, next in ${Ln(n)})`),D();return}if(te){let g=ft?t-ft:0;if(Xn()){if(g>=ot()){et(),J(Date.now()),b(`City Change \u2014 still Loading after ${ot()/1e3}s; changing city\u2026`),D();return}let v=Math.max(0,Math.ceil((ot()-g)/1e3));b(`City Change \u2014 Date Loading\u2026 stay (${v}s then hop if still Loading)`),D();return}if(g>=xt()){et(),J(Date.now()),b(`City Change \u2014 calendar up but no dates after ${xt()/1e3}s; changing city\u2026`),D();return}let y=Math.max(0,Math.ceil((xt()-g)/1e3));b(`City Change \u2014 waiting calendar dates\u2026 (${y}s then hop)`),D();return}let i=js(t);if(i>0){let g=Math.ceil(i/1e3);b(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,g)}s`),D();return}let o=await Ae();if(!o?.cities?.length){Se();return}let r=new Set(di().map(g=>g.id)),s=o.cities.filter(g=>r.has(String(g.id)));if(!s.length){b("Preferred cities not found in the dropdown \u2014 pick cities again."),Se();return}let u=document.querySelector("#post_select"),f=u?String(u.value):"",m=Ys(s,f);if(!m){J(t),D();return}if(await Qs(m.id,m.name)){Wt=Date.now(),J(Wt);let g=s.map(v=>v.name||v.id).join(" \u2192 "),y=`${xe+1}/${s.length}`;b(`City Change \u2014 ${y} ${m.name||m.id} (path: ${g}); Loading up to ${ot()/1e3}s, no-dates hop ${xt()/1e3}s`)}else J(t);D()}finally{st=!1,Tt=0}}}async function mi(){if(X||A()||!Ct())return;let t=await Ae();if(!t?.cities?.length)return;let e=new Set(di().map(s=>s.id)),n=t.cities.filter(s=>e.has(String(s.id)));if(!n.length){b("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}Ht(),et(),L=!1,O=0,R=!1,st=!1,Tt=0,V=!0,Nt=Date.now(),G=Date.now();let i=document.querySelector("#post_select"),o=i?String(i.value):"",r=n.findIndex(s=>String(s.id)===o);xe=r>=0?r:0,b(`City Change ON \u2014 IST ${it()}; hop 13\u201318s in checklist order; Loading max ${ot()/1e3}s; no-dates hop ${xt()/1e3}s`),Cr(),D()}async function kr(){if(X||A()||!ni()||!l.alive||!(await Ae())?.cities?.length||!document.querySelector("#post_select"))return;if(!V){await mi();return}let e=sn();Cr(),(e||!pt&&!st)&&(e&&(J(Date.now()),b("City Change \u2014 auto-unstuck; next city in 13\u201318s\u2026")),D())}function Mr(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function ln(){let t=Mr();return!!(t&&!t.disabled)}function pi(){let t=Mr();if(!t||t.disabled)return!1;try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}return l.send({action:"forceClickSubmit",prefix:d,pollMs:j,maxMs:an}),!0}function Js(){return K()?ln():!1}function Ar(){b("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function hi(t){if(X||A()||R)return;let e=await I(t);if(!$t(e))return;ee(),R=!0,ye();let n=Date.now(),i=!1,o=K()?Date.now():0,r=async f=>{if(!(i||!R||!l.alive)){if(i=!0,window.removeEventListener("message",s),mt&&(l.clear(mt),mt=null),A()){R=!1;return}if(R=!1,f){await Sr(t),b("Submit clicked \u2014 all Tik Tik operations stopped.");return}kt(),b(V?"Auto Submit \u2014 Submit not clicked in time; City Change resuming\u2026":"Auto Submit \u2014 Submit not clicked in time; still watching\u2026")}},s=f=>{!l.alive||f.source!==window||f.data?.action===bt.sub&&r(!0)};window.addEventListener("message",s);let u=async()=>{if(i||!R||!l.alive)return;let f=Date.now(),m=f-n;if(K()&&!o&&(o=f,b("Time slot selected \u2014 waiting for Submit to enable\u2026")),o&&f-o>=qs&&(Js()?(b("Submit enabled \u2014 clicking\u2026"),pi()):b("Waiting for Submit button to enable\u2026")),m>=an)return r(!1);mt=l.setTimeout(u,j)};u()}async function Dr(){if(!K()||R||X)return;let t=await ct();t&&await hi(t.accountId)}function b(t){let e=document.querySelector(p(a.aiStatus));e&&(e.textContent=t)}function P(t){b(t)}function hr(t){return!!(t&&t.termsAgreed)}function Er(t){return!!(t&&t.termsPassed)}function on(){return!!document.querySelector(p(a.aiTermsAgree))?.checked}function gi(t){let e=document.querySelector(p(a.aiTermsGate)),n=document.querySelector(p(a.aiMain)),i=document.querySelector(p(a.aiTermsAgree)),o=document.querySelector(p(a.aiTermsContinue)),r=Er(t);e&&e.classList.toggle(c.hidden,r),n&&n.classList.toggle(c.hidden,!r),i&&(i.checked=hr(t)||on()),o&&(o.disabled=!(hr(t)||on()))}function Zs(){let t=document.querySelector(p(a.aiTermsContinue)),e=on();t&&(t.disabled=!e),b(e?"Terms checked \u2014 tap Continue.":"Check Agree to continue.")}async function tc(){if(!on()){b("Check Agree first.");return}let t=await H();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=await I(t)||{},{from:n,to:i}=De(),o=qt(),r=un();_t(),Te(),li(),Z=!0,at=!0,await ht(t,{termsAgreed:!0,termsPassed:!0,termsAgreedAt:e.termsAgreedAt||Date.now(),submitEnabled:!0,citiesEnabled:!0,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],slotWindows:r.length?r:e.slotWindows||null,confirmedAt:Date.now()}),await Q(),tt(document.querySelector(p(a.aiSubmitSw)),!0),tt(document.querySelector(p(a.aiCitiesSw)),!0),Z=!0,at=!0,dn(await I(t)),Ce((e.cities||[]).map(u=>u.id),{force:!0}),bi(e),gi(await I(t)),(qt().length?qt():e.cities||[]).length&&(fi(),await mi()),(n||e.from)&&(i||e.to)&&await cn(),b("Auto Submit and City Change ON \u2014 set dates and preferred cities.")}function Ir(t){t?.slotWindows?.length?ho(t.slotWindows):In()}function ec(t){let e="";for(let n=0;n<=59;n++){let i=Number(t)===n?" selected":"";e+=`<option value="${n}"${i}>:${String(n).padStart(2,"0")}</option>`}return e}function gr(t,e){let n=Math.min(wt,59-Number(t||0)),i="";for(let o=1;o<=Math.max(1,n);o++){let r=Number(e)===o?" selected":"";i+=`<option value="${o}"${r}>${o} min</option>`}return i}function Lr(t,e){let n=Number(t)||0,i=Number(e)||1,o=Math.min(59,n+i);return`Runs from :${String(n).padStart(2,"0")} up to :${String(o).padStart(2,"0")}`}function un(){let t=document.querySelector(p(a.aiWinList));if(!t)return[];let e=[];for(let n of t.querySelectorAll(`.${c.aiWinRow}`)){let i=Number(n.querySelector('select[data-win="from"]')?.value),o=Number(n.querySelector('select[data-win="dur"]')?.value);!Number.isFinite(i)||!Number.isFinite(o)||e.push({fromMin:i,durationMin:o})}return En(e)}function br(t){let e=t.querySelector('select[data-win="from"]'),n=t.querySelector('select[data-win="dur"]'),i=t.querySelector(`.${c.aiWinHelp}`);!e||!n||!i||(i.textContent=Lr(e.value,n.value))}function Pr(t=0,e=6){let n=Math.min(wt,59-t),i=Math.min(Math.max(1,e||1),Math.max(1,n)),o=document.createElement("div");o.className=c.aiWinRow,o.innerHTML=`
    <div class="${c.aiInline}">
      <label class="${c.aiHead}">Start</label>
      <select data-win="from">${ec(t)}</select>
      <label class="${c.aiHead}" style="margin-left:10px;color:#6b7280;font-weight:500">Duration</label>
      <select data-win="dur">${gr(t,i)}</select>
      <button type="button" class="${c.aiTrash}" data-win="del" title="Delete timing" aria-label="Delete">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
        </svg>
      </button>
    </div>
    <div class="${c.aiWinHelp}">${Lr(t,i)}</div>
  `;let r=o.querySelector('select[data-win="from"]'),s=o.querySelector('select[data-win="dur"]');return l.on(r,"change",()=>{let u=Number(r.value),f=Number(s.value)||1;s.innerHTML=gr(u,f),br(o)}),l.on(s,"change",()=>br(o)),l.on(o.querySelector('button[data-win="del"]'),"click",()=>{o.remove(),yi()}),o}function bi(t){let e=document.querySelector(p(a.aiWinList));if(!e)return;e.replaceChildren();let n=t?.slotWindows?.length?go(t.slotWindows):[];for(let i of n.slice(0,dt))e.appendChild(Pr(i.fromMin,i.durationMin));yi(t)}function yi(t){let e=document.querySelector(p(a.aiWinNote));e&&(t?.slotWindows?.length||un().length?e.textContent=`Custom windows active (max ${dt}, each \u2264 ${wt} min).`:e.textContent=`Using defaults: ${it()}. Add up to ${dt} windows below.`)}function tt(t,e){t&&(t.classList.toggle(c.aiOnBtn,!!e),t.setAttribute("aria-checked",e?"true":"false"))}function nc(t){tt(document.querySelector(p(a.aiSubmitSw)),$t(t)),tt(document.querySelector(p(a.aiCitiesSw)),Ot(t))}var Z=!1,at=!1;function dn(t){let e=$t(t)||Z,n=Ot(t)||at,i=document.querySelector(p(a.aiSubmitBody)),o=document.querySelector(p(a.aiCitiesBody));i&&i.classList.toggle(c.hidden,!e),o&&o.classList.toggle(c.hidden,!n)}function ic(t,e){let n=document.querySelector(p(a.aiStatus)),i=document.querySelector(p(a.aiBtn));if(!n||!i)return;nc(t),dn(t);let o=$t(t),r=Ot(t),s=o||r;s?(i.classList.add(c.aiOn),i.textContent="Tik Tik ON"):(i.classList.remove(c.aiOn),i.textContent="Tik Tik");let u=[];o&&t.from&&t.to?u.push(`Auto Submit ON (${Rt(t.from)} \u2013 ${Rt(t.to)}, clicks Submit as soon as time slot is ready)`):Z&&!o?u.push("Auto Submit \u2014 set From / To dates, then Enable again"):u.push("Auto Submit OFF"),r?u.push(`City Change ON (${Vs(t)}, ${it()})`):at&&!r?u.push("City Change \u2014 pick preferred cities, then Enable again"):u.push("City Change OFF"),n.textContent=`Account ${e||"\u2014"}: ${u.join(" \xB7 ")}`,n.classList.toggle(c.aiOk,s)}async function Q(){let t=await H();if(t)try{await _r(t)}catch{}let e=t?await I(t):null;$t(e)||(Z=!1),Ot(e)||(at=!1),Ir(e),ic(e,t),gi(e);let n=document.querySelector(p(a.aiFrom)),i=document.querySelector(p(a.aiTo));n&&(n.value=e?.from||""),i&&(i.value=e?.to||""),ii();let o=(e?.cities||[]).map(x=>x.id),r=document.querySelector(p(a.aiPanel)),s=r&&!r.classList.contains(c.hidden),u=document.querySelector(p(a.aiCitiesBody)),f=u&&!u.classList.contains(c.hidden),m=vr();(f||Ot(e)||at)&&Ce(s&&m.length?m:o),bi(e);let h=document.querySelector(p(a.aiLogin)),g=document.querySelector(p(a.aiPass));h&&e?.loginId&&(h.value=e.loginId),g&&e?.loginPass&&(g.value=e.loginPass);let y=e?.security||[],v=[a.aiQ1,a.aiQ2,a.aiQ3],q=[a.aiA1,a.aiA2,a.aiA3];v.forEach((x,E)=>{let ut=document.querySelector(p(x));ut&&(ut.innerHTML=nn(E,y[E]?.q||""))}),q.forEach((x,E)=>{let ut=document.querySelector(p(x));ut&&y[E]?.a&&(ut.value=y[E].a)});let _=document.querySelector(p(a.aiLoginBody)),F=_&&!_.classList.contains(c.hidden);wi(!!F,fc(e))}function oc(){let t=document.querySelector(p(a.aiPanel));return!!(t&&!t.classList.contains(c.hidden))}function Jn(t){let e=document.querySelector(p(a.aiPanel));e&&(t||vt(),e.classList.toggle(c.hidden,!t),t&&H().then(async n=>{if(n)try{Qn=null,await _r(n)}catch{}let i=n?await I(n):null;gi(i),Er(i)?Ce((i?.cities||[]).map(o=>o.id),{force:!0}):b("Read the terms, check Agree, then Continue.")}))}function Zn(){if(Zn._done)return;Zn._done=!0;let t=e=>{if(!oc())return;let n=document.querySelector(p(a.aiPanel)),i=document.querySelector(p(a.aiBtn)),o=document.querySelector(p(a.aiCal)),r=oi(e);if(!(o&&!o.classList.contains(c.hidden)&&r&&o.contains(r))){if(o&&!o.classList.contains(c.hidden)){let s=document.querySelector(p(a.aiFromBtn)),u=document.querySelector(p(a.aiToBtn));!(s&&r&&(s===r||s.contains(r)))&&!(u&&r&&(u===r||u.contains(r)))&&vt()}n&&r&&(n===r||n.contains(r))||i&&r&&(i===r||i.contains(r))||(vt(),Jn(!1))}};l.on(document,"pointerdown",t,{capture:!0})}async function rc(t){let e=await H();if(!e){b("Open a logged-in schedule page so we can bind this to your account.");return}let n=await I(e)||{},{from:i,to:o}=De();if(i=i||n.from||null,o=o||n.to||null,t){Z=!0,tt(document.querySelector(p(a.aiSubmitSw)),!0),_t(),Te(),li(),await ht(e,{submitEnabled:!0,from:i||null,to:o||null,confirmedAt:Date.now()});let r=document.querySelector(p(a.aiFrom)),s=document.querySelector(p(a.aiTo));if(r&&i&&(r.value=i),s&&o&&(s.value=o),ii(),await Q(),tt(document.querySelector(p(a.aiSubmitSw)),!0),Z=!0,dn(await I(e)),!i||!o){b("Auto Submit ON \u2014 select From and To dates to start booking.");return}if(i>o){b("Auto Submit ON \u2014 From date must be before To date.");return}Z=!1,b(`Auto Submit ON (${Rt(i)} \u2013 ${Rt(o)})`),await cn();return}Z=!1,Te(),tt(document.querySelector(p(a.aiSubmitSw)),!1),await ht(e,{submitEnabled:!1,from:i||n.from,to:o||n.to}),await Q(),b("Auto Submit OFF")}async function ac(t){let e=await H();if(!e){b("Open a logged-in schedule page so we can bind this to your account.");return}let n=await I(e)||{};if(t){at=!0,tt(document.querySelector(p(a.aiCitiesSw)),!0),Ce((n.cities||[]).map(s=>s.id),{force:!0}),bi(n);let o=qt();!o.length&&n.cities?.length&&(o=n.cities);let r=un();if(_t(),await ht(e,{citiesEnabled:!0,cities:o.length?o:n.cities||[],slotWindows:r.length?r:n.slotWindows||null}),await Q(),tt(document.querySelector(p(a.aiCitiesSw)),!0),at=!0,dn(await I(e)),o.length||Ce([],{force:!0}),!o.length){b("City Change ON \u2014 select at least one preferred city to start hopping.");return}at=!1,fi(),await mi(),b(`City Change ON (${o.map(s=>s.name||s.id).join(", ")})`);return}at=!1,Se(),tt(document.querySelector(p(a.aiCitiesSw)),!1);let i=qt();await ht(e,{citiesEnabled:!1,cities:i.length?i:n.cities||[]}),await Q(),b("City Change OFF")}async function yr(){let t=await H();if(!t)return;let e=await I(t)||{};if(!$t(e)&&!Z)return;let{from:n,to:i}=De();!n||!i||n>i||(await ht(t,{submitEnabled:!0,from:n,to:i,confirmedAt:Date.now()}),Z=!1,await Q(),tt(document.querySelector(p(a.aiSubmitSw)),!0),_t(),li(),b(`Auto Submit ON (${Rt(n)} \u2013 ${Rt(i)})`),await cn())}function sc(t){return(t||[]).map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", ")}async function cc(){let t=document.querySelector(p(a.aiWinList));if(t){if(t.querySelectorAll(`.${c.aiWinRow}`).length>=dt){b(`Max ${dt} timing windows.`);return}t.appendChild(Pr(0,Math.min(6,wt))),yi()}}async function lc(){let t=await H();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=un();if(!e.length){b("Add at least one timing (or Reset to defaults).");return}await ht(t,{slotWindows:e}),await Q(),b(`Saved ${e.length} custom timing(s): ${sc(e)}`)}async function uc(){let t=await H();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}window.confirm("Reset to default IST windows? Your custom timings will be removed.")&&(await ht(t,{slotWindows:null}),In(),await Q(),b(`Using default windows: ${it()}`))}async function dc(){let t=await H();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let{from:e,to:n}=De(),i=qt(),o=document.querySelector(p(a.aiLogin))?.value?.trim(),r=document.querySelector(p(a.aiPass))?.value,s=[0,1,2].map(u=>({q:document.querySelector(p([a.aiQ1,a.aiQ2,a.aiQ3][u]))?.value?.trim()||"",a:document.querySelector(p([a.aiA1,a.aiA2,a.aiA3][u]))?.value?.trim()||""}));if(!o||!r){b("Enter ID and password before saving.");return}if(s.some(u=>!u.q||!u.a)){b("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}await ht(t,{}),wi(!0,!0),b("Saved ID, password, and 3 security questions (1 from each set).")}function fc(t){let e=t?.security||[];return!!(t?.loginId&&t?.loginPass&&e.length>=3&&e.every(n=>n?.q&&n?.a))}function wi(t,e){let n=document.querySelector(p(a.aiLoginToggle));if(!n)return;let i=t?"\u25BE":"\u25B8";n.textContent=e?`Login details (saved) ${i}`:`Login details ${i}`}function mc(){let t=document.querySelector(p(a.aiLoginBody)),e=document.querySelector(p(a.aiLoginToggle));if(!t||!e)return;let n=t.classList.contains(c.hidden);t.classList.toggle(c.hidden,!n);let i=/saved/i.test(e.textContent||"");wi(n,i)}function xi(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==a.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==a.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===a.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function ti(){document.querySelector(p(a.aiPanel))?.remove(),document.querySelector(p(a.aiBtn))?.remove(),xi()}function pc(){if(A())return;if(!ni()){ti();return}if(document.querySelector(p(a.aiBtn)))if(!document.querySelector(p(a.aiSubmitSw))||!document.querySelector(p(a.aiTermsContinue))||!document.querySelector(p(a.aiFromBtn)))ti();else return;let t=Co();if(!t)return;let e=document.createElement("button");e.id=a.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[$.mark]="",l.on(e,"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiPanel)),r=o&&o.classList.contains(c.hidden);Jn(!!r)}),t.appendChild(e);let n=document.createElement("div");n.id=a.aiPanel,n.className=c.hidden,n.dataset[$.mark]="",n.innerHTML=`
    <div id="${a.aiTermsGate}">
      <div id="${a.aiTerms}" class="${c.aiTerms}">
        <div class="${c.aiHead}">Terms &amp; Conditions</div>
        <div class="${c.aiHint}">Please read carefully before continuing.</div>
        <ul class="${c.aiTermsList}">
          <li>Options apply to this applicant only. They do not bypass CAPTCHAs, waiting rooms, or portal security.</li>
          <li>During your windows, City Change hops every 13\u201318s. Max ${dt} windows, each up to ${wt} minutes.</li>
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
              <select id="${a.aiQ1}">${nn(0)}</select>
            </label>
            <label>Your answer for set 1
              <input type="text" id="${a.aiA1}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${c.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 2 \u2014 choose 1 question
              <select id="${a.aiQ2}">${nn(1)}</select>
            </label>
            <label>Your answer for set 2
              <input type="text" id="${a.aiA2}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${c.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 3 \u2014 choose 1 question
              <select id="${a.aiQ3}">${nn(2)}</select>
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
  `,t.insertAdjacentElement("afterend",n),l.on(n.querySelector(p(a.aiSubmitSw)),"click",async()=>{let i=await H(),o=i?await I(i):null;await rc(!$t(o))}),l.on(n.querySelector(p(a.aiCitiesSw)),"click",async()=>{let i=await H(),o=i?await I(i):null;await ac(!Ot(o))}),l.on(n.querySelector(p(a.aiWinAdd)),"click",cc),l.on(n.querySelector(p(a.aiWinSave)),"click",lc),l.on(n.querySelector(p(a.aiWinReset)),"click",uc),l.on(n.querySelector(p(a.aiSaveLogin)),"click",dc),l.on(n.querySelector(p(a.aiLoginToggle)),"click",mc),l.on(n.querySelector(p(a.aiClose)),"click",()=>Jn(!1)),l.on(n.querySelector(p(a.aiCitiesAll)),"click",()=>pr(!0)),l.on(n.querySelector(p(a.aiCitiesNone)),"click",()=>pr(!1)),l.on(n.querySelector(p(a.aiTermsAgree)),"change",()=>{Zs()}),l.on(n.querySelector(p(a.aiTermsContinue)),"click",()=>{tc()}),l.on(n.querySelector(p(a.aiFromBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiCal));if(o&&!o.classList.contains(c.hidden)&&Y.which==="from"){vt();return}ur("from",i.currentTarget)}),l.on(n.querySelector(p(a.aiToBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiCal));if(o&&!o.classList.contains(c.hidden)&&Y.which==="to"){vt();return}ur("to",i.currentTarget)}),Zn(),Q()}function hc(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",l.on(e,"click",()=>{ye(),H().then(n=>{n?Sr(n):xr()})}))};t(document.querySelector("#submitbtn")),l.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function Si(){if(l.alive&&!A()){if(!ni()){ti();return}await l.waitFor("#post_select",{attempts:We})&&(pc(),fi(),hc(),!mr&&(mr=!0,l.setTimeout(()=>Q(),800),l.setTimeout(async()=>{await ct()&&await cn()},1500)))}}var qr=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function Rr(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function gc(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=Rr(t.data.url),i=new URLSearchParams(t.data.request||"").get("parameters");if(!i)return null;let o;try{o=JSON.parse(i)}catch{return null}return{params:o,tail:e,response:t.data.response}}async function bc(t,e={}){t?.length&&(await Fo(t,e),await S("audioAlert")&&Do())}async function yc(t,e=!1){if(e||A())return null;let n=new Date;n.setHours(0,0,0,0);let i=(t||[]).map(s=>{if(!s)return null;let u=mn(s.Date);return u?{...s,Date:u}:null}).filter(Boolean).filter(s=>{let[u,f,m]=s.Date.slice(0,10).split("-").map(Number);return!u||!f||!m?!1:new Date(u,f-1,m)>=n}).sort((s,u)=>String(s.Date).localeCompare(String(u.Date))),o=await ct();if(o){let s=i.filter(f=>Me(f.Date,o.from,o.to));if(!s.length)return null;let u=_e(s.length);return s[u]?.Date||null}if(!await S("autoSelectFirstDate")||!i.length)return null;let r=_e(i.length);return i[r]?.Date||null}function mn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,r,s]=n;return`${s}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime())){let r=o.getFullYear(),s=String(o.getMonth()+1).padStart(2,"0"),u=String(o.getDate()).padStart(2,"0");return`${r}-${s}-${u}`}}return null}function wc(t){if(!t)return!1;let[e,n,i]=t.slice(0,10).split("-").map(Number);if(!e||!n||!i)return!1;let o=n-1;for(let r of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let s=r.querySelector("a");if(!s)continue;let u=parseInt(r.getAttribute("data-month"),10),f=parseInt(r.getAttribute("data-year"),10),m=parseInt(s.textContent,10);if(f===e&&u===o&&m===i)return!0}return!1}var fn=null;function xc(t,e){fn&&l.clear(fn);let n=Date.now()+(e?$e:8e3),i=()=>{!l.alive||Date.now()>n||wc(t)||(l.send({action:"selectFirstDate",date:t,maxMs:e?$e:8e3,pollMs:j}),fn=l.setTimeout(i,j))};fn=l.setTimeout(i,80)}function Or(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Sc(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function Wr(t){return t?.length?t.map((e,n)=>({entry:e,index:n,avail:Sc(e)})).sort((e,n)=>n.avail!==e.avail?n.avail-e.avail:e.index-n.index):[]}function vc(t){let e=Wr(t);return e.length?{entry:e[0].entry,slotIndex:e[0].index}:{entry:null,slotIndex:0}}function Nr(){Bt&&(l.clear(Bt),Bt=null)}async function Tc(t){let e=Date.now()+Math.max(0,Number(t)||0);for(;l.alive&&Date.now()<e;){if(ke()||A())return!1;if(K()&&ln())return!0;await new Promise(n=>l.setTimeout(n,j))}return!!(K()&&ln())}var Hr=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),Br=null,Cc=null,Bt=null;function $c(t,e){Br=t,Cc=e?String(e).slice(0,10):null}function _c(t,e=0){Bt&&l.clear(Bt);let n=t?String(t).slice(0,10):null,i=0,o=async()=>{if(!l.alive||ke()||++i>240||K())return;let r=(Br||[]).filter(s=>s&&s.Time);if(r.length){let{entry:s,slotIndex:u}=vc(r);if(P(`Watchdog: picking time slot #${u+1}\u2026`),await ge({time:Or(s.Time),date:s.Date?String(s.Date).slice(0,10):n,slotIndex:u,pollMs:j,maxMs:600,prefix:d}),K())return}else if(document.querySelector(Hr)&&(P("Watchdog: picking visible time slot\u2026"),await ge({time:"00:00",date:n,slotIndex:e,pollMs:j,maxMs:600,prefix:d}),K()))return;Bt=l.setTimeout(o,j)};Bt=l.setTimeout(o,300)}var kc=["#datepicker.hasDatepicker","#datepicker .ui-datepicker","#ui-datepicker-div"].join(", ");async function Mc(t,e=!1){if(e)return null;let n=await yc(t,e);if(!n)return null;let i=await ct(),o=new Date;o.setHours(0,0,0,0);let r=(t||[]).map(f=>mn(f?.Date)).filter(Boolean).filter(f=>{let[m,h,g]=f.slice(0,10).split("-").map(Number);return new Date(m,h-1,g)>=o}).sort((f,m)=>f.localeCompare(m)),s=i?r.filter(f=>Me(f,i.from,i.to)):r,u=_e(s.length);return P(`Selecting date #${u+1}: ${n}\u2026`),await l.waitFor(kc,{attempts:120,interval:j}),l.send({action:"selectFirstDate",date:n,maxMs:i?$e:8e3,pollMs:j}),xc(n,i),_c(n,rn),n}async function Ac(t,e=!1){if(e||A()||ke())return;let n=await ct();if(!n&&!await S("autoSelectFirstDate"))return;Nr();let i=(t||[]).filter(u=>!(!u||!u.Time||u.EntriesAvailable!=null&&Number(u.EntriesAvailable)<=0));n&&(i=i.filter(u=>{let f=u.Date?String(u.Date).slice(0,10):null;return f?f>=n.from&&f<=n.to:!0}));let o=Wr(i);if(!o.length)return;let r=Date.now()+1e4;for(;Date.now()<r&&l.alive&&!(Jo(i)||document.querySelector(Hr));)await new Promise(u=>l.setTimeout(u,j));let s=o.length===1?an:wr;P(o.length===1?`1 time slot \u2014 try highest avail, wait \u2264${s/1e3}s for Submit\u2026`:`${o.length} time slots \u2014 try highest\u21922nd\u21923rd\u2026 (${s/1e3}s each for Submit)`);for(let u=0;u<o.length;u++){if(!l.alive||ke()||A())return;let{entry:f,index:m,avail:h}=o[u],g=Or(f.Time),y=f.Date?String(f.Date).slice(0,10):null,v=u===0?"highest":u===1?"2nd-highest":u===2?"3rd-highest":`${u+1}th-highest`;if(P(`Trying ${v} avail (${h}) @ ${g} \u2014 slot ${u+1}/${o.length}\u2026`),!await ge({time:g,date:y,slotIndex:m,pollMs:j,maxMs:4e3,prefix:d})&&!K()){P(`Could not click ${g} \u2014 trying next\u2026`);continue}if(P(`Selected ${g} (${v}) \u2014 waiting \u2264${s/1e3}s for Submit to enable\u2026`),await Tc(s)){P(`Submit enabled on ${g} \u2014 clicking\u2026`),n?await hi(n.accountId):pi();return}u<o.length-1&&P(`Submit still disabled on ${g} \u2014 trying next (${u+2}/${o.length})\u2026`)}P(`Tried all ${o.length} time slot(s); Submit never enabled.`),n&&kt()}async function Fr(t){if(!N()||A())return;let e;try{e=gc(t)}catch{return}if(e==null)return;if(nr(e),e.retryAfter!==void 0){let r=Number(e.retryAfter);ao(e.cgiBlock,r),r?(Ge(r),ci(r)):S("defaultWaitTime").then(s=>{Ge(s),ci(s)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let r=e.response.Posts||[],s=new Map((await gt()).map(u=>[u.ID,u]));for(let u of r)s.set(u.ID,{...s.get(u.ID),...u});await zt([...s.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let r=e.response.Members||[];if(r.length){let s=await U()||{},u=s.name&&r.find(f=>f.FullName===s.name);s.visa=(u||r[0]).VisaClassName,await C({profile:s,members:r})}}if(qr.includes(e.tail)){_t(),Lo(e);{let h=(e.response.ScheduleDays||[]).map(g=>mn(g?.Date)).filter(Boolean).length;h&&P(`${h} date${h===1?"":"s"} available \u2014 see list below`)}$r();let r=await ct();await Ae()||S("defaultWaitTime").then(h=>{Ge(h)});let u=await gt(),f=u.find(h=>h.ID===e.params.postId);f&&(f.Days=e.response.ScheduleDays,f.Updated=Date.now(),f.HasError=e.response.HasError,f.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,zt(u)),await bc(e.response.ScheduleDays,{postId:e.params.postId,postName:f?.Name,hasError:e.response.HasError}),await Uo(e.response.ScheduleDays,{postId:e.params.postId,postName:f?.Name,hasError:e.response.HasError}),r&&!e.response.HasError?ai(e.response.ScheduleDays,r.from,r.to).length?ee():kt():r&&kt();let m=await Mc(e.response.ScheduleDays,e.response.HasError);if(m)ee(),await Ko(f?.Name,m);else if(r&&!e.response.HasError){let h=(e.response.ScheduleDays||[]).map(y=>mn(y?.Date)).filter(Boolean),g=h.filter(y=>Me(y,r.from,r.to));h.length&&!g.length?(kt(),P(`Dates found but none in ${r.from} \u2192 ${r.to}. Next city in 13\u201318s\u2026`)):h.length||(kt(),P("No dates on this city \u2014 next city in 13\u201318s\u2026"))}await kn()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let r=e.params.Date.split("T")[0];$c(e.response.ScheduleEntries,r),Nr();let s=await gt(),u=s.filter(m=>m.Days&&m.Updated).sort((m,h)=>h.Updated-m.Updated).find(m=>m.Days.some(h=>h.Date===r));if(u){let m=u.Days.find(h=>h.Date===r);m&&(m.Times=e.response.ScheduleEntries,zt(s))}let f=(e.response.ScheduleEntries||[]).filter(m=>m&&m.Time);if(Po(f,r,u?.Name),f.length){let m=f.filter(y=>y.EntriesAvailable==null||Number(y.EntriesAvailable)>0),h=m.reduce((y,v)=>{let q=Number(v.EntriesAvailable);return y+(Number.isFinite(q)?q:0)},0),g=h>0?` \xB7 ${h} available`:"";P(`${m.length||f.length} time slot${(m.length||f.length)===1?"":"s"} on ${r}${g}`)}await Ac(e.response.ScheduleEntries,e.response.HasError),f.length?(ee(),await zo(u?.Name,e.params.Date,f.length)):(kt(),P("No time slots on this date \u2014 next city in 13\u201318s\u2026")),await kn()}}function Ur(t){if(!N()||A())return;let e=Rr(t.data.url);qr.includes(e)&&_o()}var Ft=null,Ti="",vi={scanning:"Scanning for Cloudflare challenge\u2026",dom:"Trying page-level verify click\u2026",debugger:"Advanced click \u2014 targeting Turnstile iframe\u2026",retry:"Waiting before next attempt\u2026",success:"Verification passed \u2014 continuing\u2026",manual:"Stuck? Click the checkbox once, then we\u2019ll continue."};function Kr(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=c.cfFlash,n.dataset[$.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),l.setTimeout(()=>n.remove(),1200)}}function Dc(){let t=document.querySelector(p(a.cfHud));return t||(t=document.createElement("div"),t.id=a.cfHud,t.dataset[$.mark]="",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.innerHTML=`
    <div class="${c.cfHud}">
      <div class="${c.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">\u{1F6E1}</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${vi.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `,document.documentElement.appendChild(t),t)}async function W(t,e){if(!chrome.runtime?.id||!l.alive||!await S("autoCloudflareTick"))return;let n=Dc(),i=n.querySelector("[data-cf-msg]"),o=n.querySelector("[data-cf-sub]"),r=n.querySelector("[data-cf-chip]"),s=n.querySelector(`.${c.cfHud}`);Ti=t,i&&(i.textContent=vi[t]||vi.scanning),o&&(o.textContent=e||Ec(t)),r&&(r.textContent=t==="success"?"Done":t==="manual"?"Help":"Active",r.dataset.state=t),s&&(s.dataset.state=t),Ft&&(l.clear(Ft),Ft=null),t==="success"&&(Ft=l.setTimeout(()=>Ci(),2800))}function Ec(t){return t==="debugger"?"Precision click via advanced browser bridge":t==="dom"?"Standard page interaction":t==="manual"?"One manual click is usually enough":t==="success"?"Resuming login and recovery":"Monitoring this tab for Turnstile"}function Ci(){let t=document.querySelector(p(a.cfHud));t&&t.remove(),Ti="",Ft&&(l.clear(Ft),Ft=null)}function $i(){return Ti}var Ic=/we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i,Lc=/\bUSG\s+[a-f0-9-]{8,}/i;var ki="vsPortalErrorReloadCount",jr="vsPortalErrorReloadAt",Pc=2e3,qc=1e4,zr=!1,ne=null,Rc=null;function Oc(){return(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim()}function ie(){let t=Oc().slice(0,6e3);return t?!!(/a timeout occurred/i.test(t)&&(/error\s*524/i.test(t)||/origin web server timed out/i.test(t)||/cloudflare ray id/i.test(t))||/error\s*524/i.test(t)&&/cloudflare/i.test(t)&&t.length<8e3||Ic.test(t)&&(Lc.test(t)||/error id\s*#/i.test(t))||/we'?re sorry,\s*but something went wrong/i.test(t)&&t.length<2500):!1}function Yr(){try{return Math.max(0,Number(sessionStorage.getItem(ki)||0))}catch{return 0}}function Wc(){try{let t=Yr()+1;return sessionStorage.setItem(ki,String(t)),sessionStorage.setItem(jr,String(Date.now())),t}catch{return 1}}function _i(){try{sessionStorage.removeItem(ki),sessionStorage.removeItem(jr)}catch{}}function Nc(t){return Math.min(qc,Pc+Math.max(0,t-1)*1e3)}function Hc(){ne&&(l.clear(ne),ne=null)}function Bc(){Wc();try{location.reload()}catch{}}function Gr(){if(!l.alive||ne)return;if(!ie()){_i();return}let t=Yr()+1,e=Nc(t);ne=l.setTimeout(()=>{if(ne=null,!!l.alive){if(!ie()){_i();return}Bc()}},e)}function Vr(){if(zr)return;zr=!0;let t=()=>{l.alive&&(ie()?Gr():(_i(),Hc()))};t(),Rc=l.setInterval(t,1500);try{let e=new MutationObserver(()=>{l.alive&&ie()&&Gr()});e.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),l.disposable(()=>e.disconnect())}catch{}}var hn=null,Ie=0,Ee=null,Mt=0;async function Fc(){try{let e=(await T("humanClickProfile")).humanClickProfile,n=e?.liveTrained&&e.samples?.length||0;return n<5?15e3:n<20?1e4:n<50?6e3:3500}catch{return 12e3}}var Ai=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function nt(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!B()&&!$i()}function B(){if(ie()||document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return Ai.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:Mi().length>0}function pn(t){return new Promise(e=>setTimeout(e,t))}function Uc(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let i of n.querySelectorAll("*"))i.shadowRoot&&(t.push(i.shadowRoot),e.push(i.shadowRoot))}return t}function Mi(){let t=[],e=new Set,n=i=>{if(!i||e.has(i))return;let o=i.getBoundingClientRect();if(o.width<40||o.height<20||o.width>900||o.height>400)return;let r=(i.src||i.getAttribute?.("src")||"").toLowerCase(),s=(i.title||i.getAttribute?.("title")||"").toLowerCase(),u=(i.className?.toString?.()||"").toLowerCase(),f=(i.id||"").toLowerCase(),m=i.tagName==="IFRAME"&&(r.includes("challenges.cloudflare")||r.includes("turnstile")||s.includes("cloudflare")||s.includes("security challenge")),h=u.includes("cf-turnstile")||u.includes("turnstile")||f.includes("turnstile")||f.includes("challenge")||i.hasAttribute?.("data-sitekey")||i.hasAttribute?.("data-turnstile-widget");if(!m&&!h)if(i.tagName==="IFRAME"&&o.width>=120&&o.width<=420&&o.height>=45&&o.height<=120){if(!Ai.test(document.body?.innerText||""))return}else return;e.add(i),t.push({el:i,rect:o})};for(let i of Uc()){for(let o of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let r of i.querySelectorAll(o))n(r);for(let o of i.querySelectorAll("iframe"))n(o)}return t}function Kc(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function zc(t){let e=[],n=new Set,i=(o,r)=>{if(!Number.isFinite(o)||!Number.isFinite(r)||o<1||r<1||o>window.innerWidth-1||r>window.innerHeight-1)return;let s=`${Math.round(o)},${Math.round(r)}`;n.has(s)||(n.add(s),e.push({x:Math.round(o),y:Math.round(r)}))};for(let{rect:o}of t){let r=o.top+o.height/2,s=o.left+Math.min(28,Math.max(18,o.width*.11));for(let u of[0,-4,4,-8,8,12,16,20,24,28,32])for(let f of[0,-3,3,-6,6])i(s+u,r+f);i(o.left+o.width*.5,r)}return e}function Gc(t){for(let{el:e,rect:n}of t)try{e.click();let i=n.left+Math.min(26,n.width*.12),o=n.top+n.height/2,r=document.elementFromPoint(i,o)||e;for(let s of["pointerdown","mousedown","mouseup","pointerup","click"])r.dispatchEvent(new MouseEvent(s,{bubbles:!0,cancelable:!0,clientX:i,clientY:o,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let i=n.getBoundingClientRect();if(i.width<4&&i.height<4)continue;let o=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!o.includes("human")&&!o.includes("verify")&&e==="input[type='checkbox']"){let r=n.closest("label, div, form");if(!Ai.test(r?.textContent||""))continue}return n.click(),!0}return!1}async function Xr(t){t.length&&(Kr(t.slice(0,3)),l.send({action:"viewportClickPoints",points:t}),await S("cloudflareDebuggerClick")?(await W("debugger","Trained click on Verify you are human\u2026"),l.send({action:"cloudflareDebuggerClick",points:t,primaryOnly:!0})):await W("dom"))}async function gn(){if(!await S("autoCloudflareTick"))return!1;if(nt())return Mt=0,await W("success"),!0;Mt||(Mt=Date.now());let t=await Fc();if(Date.now()-Mt<t)return await W("scanning","Train window \u2014 click Verify you are human yourself (recording your mouse)\u2026"),!1;await W("scanning","Verify you are human page \u2014 preparing click\u2026");let e=Mi();Kc(e),await pn(350),e=Mi();let n=zc(e);return n.length&&(await Xr(n),await pn(1200),nt()||!B())?(Mt=0,await W("success"),!0):(await W("dom"),Gc(e),await pn(600),nt()||!B()?(Mt=0,await W("success"),!0):n.length&&(await Xr(n),await pn(1e3),nt()||!B())?(Mt=0,await W("success"),!0):(Ie++,Ie>=8?await W("manual","Click the checkbox once \u2014 we will continue after."):await W("retry",`Retry ${Ie}/8\u2026`),!1))}function jc(){Ee||(Ee=new MutationObserver(()=>{l.alive&&B()&&!nt()&&gn()}),Ee.observe(document.documentElement,{childList:!0,subtree:!0}),l.disposable(()=>{Ee?.disconnect(),Ee=null}))}function Di(){hn&&(l.clear(hn),hn=null),Ie=0,Mt=0,Ci()}async function Ei(){if(Di(),!await S("autoCloudflareTick"))return;jc();let t=async()=>{if(l.alive&&await S("autoCloudflareTick")){if(B()&&!nt()){await gn();return}$i()&&(Ie=0,await W("success"))}};t(),hn=l.setInterval(t,1800)}var oe="sessionRecovery",Ii="homeKeepaliveAt",Li="homeLoadingStuckAt",Qr=2e3,yn=!1,Jr=null,Pi=null,qi=null,bn=null,Le=0;function Zr(){return w.homeKeepaliveMinMs}function Yc(){return w.homeKeepaliveMaxMs}function Vc(){return w.homeKeepaliveDebounceMs}function ta(){return w.loadingStuckMs}function Xc(){return w.loadingStuckDebounceMs}function ea(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function Qc(t,e){let n=ea(t);if(!n)return"";let i="",o=0;for(let r of e||[]){let s=ea(r.q);if(!s||!r.a)continue;if(n.includes(s)||s.includes(n))return r.a;let u=s.split(" ").filter(h=>h.length>3),f=0;for(let h of u)n.includes(h)&&f++;let m=u.length?f/u.length:0;m>o&&m>=.5&&(o=m,i=r.a)}return i}async function Jc(){let t=await T([St,"profile"]),e=t[St]||{},n=t.profile?.id?String(t.profile.id):null,i=n?e[n]:null;return i||(i=Object.values(e).find(o=>o?.loginId&&o?.loginPass)||null),i||{}}function na(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,i=Object.getOwnPropertyDescriptor(n,"value")?.set;i?i.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function At(t){return new Promise(e=>setTimeout(e,t))}function lt(t,e){return t+Math.random()*(e-t)}async function Ri(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await At(lt(250,600)),na(t,"");let i="";for(let o=0;o<n.length;o++){let r=n[o];i+=r,na(t,i),t.dispatchEvent(new KeyboardEvent("keydown",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:r,bubbles:!0}));let s=lt(90,220);/[\s@._]/.test(r)&&(s+=lt(120,320)),Math.random()<.08&&(s+=lt(200,450)),await At(s)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await At(lt(200,500))}var wn=!1,xn=!1;function Sn(t){return!t||t.disabled?!1:(t.click(),!0)}function Zc(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let i of t){let o=(i.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(o))continue;let r=i.querySelector("input[type='checkbox']")||document.getElementById(i.getAttribute("for")||"");r&&!r.checked&&(Sn(r),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(i=>/^(continue|ok|accept|agree)$/i.test((i.textContent||i.value||"").trim()));return e&&n&&Sn(n),e>0}function ia(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function tl(t){if(wn)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;wn=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await Ri(e,t.loginId),await At(lt(400,900))),n&&t.loginPass&&!n.value&&(await Ri(n,t.loginPass),await At(lt(500,1100)));let i=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(o=>/sign in|log in|continue/i.test(o.textContent||o.value||""));return i&&(n?.value||t.loginPass)?(await At(lt(600,1400)),Sn(i),!0):!!(e||n)}finally{wn=!1}}async function el(t){if(xn)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let o of n){let r=(o.textContent||"").trim();if(r.length<12||r.length>220||!/\?/.test(r)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(r))continue;let s=o.querySelector("input[type='text']")||document.getElementById(o.getAttribute("for")||"")||o.parentElement?.querySelector("input[type='text']");s&&s.offsetParent!==null&&e.push({text:r,input:s})}for(let o of["kba1_response","kba2_response","kba3_response"]){let r=document.getElementById(o);if(!r)continue;let u=(r.closest(".form-group, .entry, li, div")||r.parentElement)?.textContent||"";e.some(f=>f.input===r)||e.push({text:u,input:r})}let i=[];for(let{text:o,input:r}of e){if(r.value)continue;let s=Qc(o,t.security);s&&i.push({input:r,ans:s})}if(!i.length)return!1;xn=!0;try{for(let{input:r,ans:s}of i)await Ri(r,s),await At(lt(350,800));await At(lt(600,1400));let o=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(r=>/continue|submit|verify/i.test(r.textContent||r.value||""));return o&&Sn(o),!0}finally{xn=!1}}function oa(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||B()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function Dt(){return Ct()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function nl(t=""){return/\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(t||""))}function Oi(){if(Dt()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||B()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}function il(t){return!!(t?.loginId&&t?.loginPass)}function ol(){return oa()?!1:!!(ia()||document.querySelector("#kba1_response, #kba2_response, #kba3_response")||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))}async function rl(){let t=(await T(oe))[oe],e=!!t?.active,n=await Jc();if(B()){await gn();return}if(Zc(),oa()){e&&(await C({[oe]:{...t,active:!1,doneAt:Date.now()}}),l.send({action:"recoveryReturnToOfc"}));return}ol()&&il(n)&&await S("autofillLogin")&&(await el(n)||(ia()||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))&&await tl(n))}function ra(){if(!Oi()||Jr)return;let t=async()=>{l.alive&&await rl()};t(),Jr=l.setInterval(t,1200)}function aa(){return Zr()+Math.random()*(Yc()-Zr())}async function sa(){try{let t=await T(Ii),e=Number(t[Ii])||0;return Date.now()-e<Vc()?!1:(await C({[Ii]:Date.now()}),!0)}catch{return!0}}function ca(){if(Dt()||!Oi()||document.querySelector("#post_select")||Pi)return;let t=()=>{l.alive&&(Pi=l.setTimeout(async()=>{if(Pi=null,!l.alive||Dt()||nl(location.href)||document.querySelector("#post_select")||!Oi())return;if(wn||xn||yn){t();return}if((await T(oe))[oe]?.active){t();return}if(!await sa()){t();return}try{location.reload()}catch{t()}},aa()))};t()}function la(){if(!Dt()||qi)return;let t=()=>{l.alive&&(qi=l.setTimeout(async()=>{if(qi=null,!(!l.alive||!Dt())){if(await sa())try{l.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}t()}},aa()))};t()}async function al(){try{let t=await T(Li),e=Number(t[Li])||0;return Date.now()-e<Xc()?!1:(await C({[Li]:Date.now()}),!0)}catch{return!0}}function ua(){if(!Dt()||bn)return;let t=async()=>{if(bn=null,!(!l.alive||!Dt())){try{if(si()){if(Le||(Le=Date.now()),Date.now()-Le>=ta()){if(await al()){try{P(`Date Loading stuck \u2265${ta()/1e3}s \u2014 reloading Application Home\u2026`)}catch{}try{l.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}}Le=Date.now()}}else Le=0}catch{}l.alive&&Dt()&&(bn=l.setTimeout(t,Qr))}};bn=l.setTimeout(t,Qr)}async function da(t){if(!/PSE0501|unable to load appointment available days/i.test(String(t||""))||yn)return;yn=!0,l.setTimeout(()=>{yn=!1},8e3);let e=await H();await C({[oe]:{active:!0,ofcUrl:location.href,accountId:e,startedAt:Date.now()}}),l.send({action:"recoveryStart",ofcUrl:location.href})}var Ni="humanClickProfile",Hi=150,ba=120,sl=400,fa=!1,Et=[],vn=0,Ut=0,ae=0,M=null,ma=0,Pe=!1,re=null,Tn=0;function cl(){let t=[];for(let e of document.querySelectorAll('iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]')){let n=e.getBoundingClientRect();n.width<40||n.height<20||n.width>900||n.height>400||t.push(n)}if(!t.length&&B())for(let e of document.querySelectorAll("iframe")){let n=e.getBoundingClientRect();n.width>=120&&n.width<=420&&n.height>=45&&n.height<=120&&t.push(n)}return t}function qe(){let t=cl();if(!t.length)return null;let e=t[0];return{x:e.left+Math.min(28,Math.max(18,e.width*.11)),y:e.top+e.height/2,w:e.width,h:e.height,left:e.left,top:e.top}}function Bi(t,e,n){return n?t>=n.left-40&&t<=n.left+n.w+40&&e>=n.top-30&&e<=n.top+n.h+30:!1}function ya(t){let e=performance.now();vn||(vn=e);let n=M,i=n?(t.clientX-n.x)/Math.max(24,n.w*.12):0,o=n?(t.clientY-n.y)/Math.max(20,n.h*.5):0;Et.push({nx:Math.round(i*1e3)/1e3,ny:Math.round(o*1e3)/1e3,x:Math.round(t.clientX),y:Math.round(t.clientY),t:Math.round(e-vn)}),Et.length>ba&&Et.shift()}async function wa(){return(await T(Ni))[Ni]||{version:2,maxSamples:Hi,samples:[],avgHoverMs:420,avgPressMs:70,avgApproachMs:800,liveTrained:!1}}function Wi(t,e,n){if(!t.length)return n;let i=t.reduce((o,r)=>o+(Number(r[e])||0),0);return Math.round(i/t.length)}async function ll(t){let e=Date.now();if(e-ma<sl)return null;ma=e;let n=await wa(),i=Array.isArray(n.samples)?n.samples.slice():[];for(i.push(t);i.length>Hi;)i.shift();let o={version:2,maxSamples:Hi,samples:i,avgHoverMs:Wi(i,"hoverMs",420),avgPressMs:Wi(i,"pressMs",70),avgApproachMs:Wi(i,"approachMs",800),updatedAt:e,liveTrained:!0,source:"visa-page-live"};return await C({[Ni]:o}),Tn=i.length,ul(t,o).catch(()=>{}),o}async function ul(t,e){try{if(!await S("serverSync"))return;let n=await U()||{},o={client_id:`hc-${t.at||Date.now()}-${Math.random().toString(36).slice(2,8)}`,profile:{id:n.id||"",email:n.email||"",name:n.name||"",visa:n.visa||""},sample:t,profile_meta:{sampleCount:e?.samples?.length||0,avgHoverMs:e?.avgHoverMs,avgPressMs:e?.avgPressMs,avgApproachMs:e?.avgApproachMs,liveTrained:!0,source:"visa-page-live",extensionHost:location.host}};l.send({action:"uploadHumanClickSample",payload:o})}catch{}}function Cn(){Et=[],vn=0,Ut=0,ae=0,re=null}function Fi(){Pe||(Pe=!0,Cn(),M=qe())}function xa(){Pe=!1,M=null,Cn()}async function pa(t){if(l.alive){if(!B()||nt()){Pe&&xa();return}Fi(),M||(M=qe()),!ae&&M&&Bi(t.clientX,t.clientY,M)&&(ae=performance.now()),ya(t)}}async function ha(t){if(!(!l.alive||t.button!==0)&&!(!B()||nt())){Fi(),M=qe(),Ut=performance.now(),ae||(ae=Ut),re={x:t.clientX,y:t.clientY},ya(t);try{W("scanning",`Recording click\u2026 (saved ${Tn} so far)`)}catch{}}}async function ga(t){if(!l.alive||t.button!==0||!Ut)return;if(!B()&&!nt()){Cn();return}let e=performance.now(),n=Math.max(25,Math.min(500,e-Ut)),i=Math.max(30,Math.min(3e3,Ut-(ae||Ut))),o=Et.length?Et[Et.length-1].t:i,r=Math.max(i,Math.min(12e3,o||i)),s=Et.slice(-ba),u=M&&Bi(t.clientX,t.clientY,M)||M&&re&&Bi(re.x,re.y,M)||!M&&s.length>=2,f=re;if(Cn(),!u&&s.length<2||s.length<1&&!u)return;let m={hoverMs:Math.round(i),pressMs:Math.round(n),approachMs:Math.round(r),path:s,down:f?{x:Math.round(f.x),y:Math.round(f.y)}:null,up:{x:Math.round(t.clientX),y:Math.round(t.clientY)},target:M?{x:Math.round(M.x),y:Math.round(M.y),w:Math.round(M.w),h:Math.round(M.h),left:Math.round(M.left),top:Math.round(M.top)}:null,viewport:{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio||1,scrollX:Math.round(window.scrollX||0),scrollY:Math.round(window.scrollY||0)},pointerType:t.pointerType||"mouse",url:location.pathname+location.search,at:Date.now()};if(!m.target){let y=qe();y&&(m.target={x:Math.round(y.x),y:Math.round(y.y),w:Math.round(y.w),h:Math.round(y.h),left:Math.round(y.left),top:Math.round(y.top)})}let h=await ll(m);if(!h)return;let g=h.samples?.length||0;try{W("success",`Saved verify-human click #${g} \u2014 keep clicking naturally when it appears`)}catch{}}async function dl(){try{let t=await wa(),e=t.liveTrained&&t.samples?.length||0;return Tn=e,e}catch{return Tn}}function Sa(){if(fa)return;fa=!0,l.on(window,"pointermove",pa,{passive:!0,capture:!0}),l.on(window,"pointerdown",ha,{passive:!0,capture:!0}),l.on(window,"pointerup",ga,{passive:!0,capture:!0}),l.on(window,"mousemove",pa,{passive:!0,capture:!0}),l.on(window,"mousedown",ha,{passive:!0,capture:!0}),l.on(window,"mouseup",ga,{passive:!0,capture:!0});let t=async()=>{if(!l.alive)return;if(!B()||nt()){Pe&&xa();return}Fi(),M||(M=qe());let e=await dl();try{W("scanning",e?`Train mode \u2014 click Verify you are human naturally (saved ${e})`:"Train mode \u2014 move mouse naturally, then click Verify you are human (recording\u2026)")}catch{}};t(),l.setInterval(t,2500)}var fl=`
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
  animation: ${d}cfpulse 1.6s ease-out infinite;
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
.${c.cfFlash} {
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
`;function va(){if(document.querySelector(p(a.styles)))return;let t=document.createElement("style");t.id=a.styles,t.dataset[$.mark]="",t.textContent=fl,(document.head||document.documentElement).appendChild(t)}no();xi();Ki(()=>{Ar(),l.destroy()});fo();Vr();if(!A()){l.disposable(()=>{let i=document.querySelector(p(a.anchor)),o=document.querySelector("#post_select");i&&o&&i.replaceWith(o);for(let r of document.querySelectorAll("[data-"+$.mark+"]"))r.remove()}),va(),l.send({action:"registerBlockGuard",prefix:d}),l.send({action:"registerRedirect",prefix:d}),l.send({action:"registerAlertGuard",prefix:d}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&l.send({action:"registerOfcReader",prefix:d}),l.on(window,"message",i=>{if(l.alive&&i.source===window)switch(i.data?.action){case bt.req:return Ur(i);case bt.res:return Fr(i);case bt.ofc:return Ro(i);case bt.err:return we("native_alert",i.data?.text),da(i.data?.text);case bt.sub:Eo(),ye(),Go();return}}),chrome.storage.onChanged.addListener((i,o)=>{o==="local"&&(i.profile&&Hn(),i.waitPillClock&&Mo(i.waitPillClock.newValue),i.autoCloudflareTick&&(i.autoCloudflareTick.newValue?Ei():Di()))}),l.on(document,"click",i=>{Xt();let o=i.target.closest(p(a.waitTime));if(o){if(o.dataset.skipClick){delete o.dataset.skipClick;return}ko()}}),l.on(document,"keydown",Xt),l.on(window,"focus",Xt),l.on(document,"visibilitychange",()=>{document.hidden||Xt()}),ra(),ca(),la(),ua(),Sa(),Ei();async function t(){!l.alive||A()||!Ct()||document.querySelector("#post_select")&&(_t(),await Promise.all([Rn(),Wn(),Si()]),Qo({slotIndex:rn,shouldPick:async()=>await ct()?!0:!!await S("autoSelectFirstDate"),onSlotPicked:()=>Dr()}))}async function e(){!l.alive||A()||!Ct()||await kr()}async function n(){ro(),so(),await Promise.all([Hn(),lo(),co(),Rn(),Wn(),Si()]),Mn()}document.readyState==="complete"?n():l.on(window,"load",n),l.setInterval(t,2500),l.setInterval(e,3e4),e()}})();
