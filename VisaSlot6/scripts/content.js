(()=>{function U(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function C(t){return U()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,i]of Object.entries(t))e[n]=i;return e}):Promise.resolve(typeof t=="string"?{}:t)}function T(t){return U()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function Po(t){return U()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function qo(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",i=>{String(i.reason?.message||i.reason||"").includes("Extension context invalidated")&&(i.preventDefault(),e())});let n=setInterval(()=>{U()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var Ft="https://the.gopg.online",si=`${Ft}/contribute`,Ro=`${Ft}/contribute/telegram`,Lu=`${Ft}/contribute/human-click`,en=`${Ft}/contribute/tik-tik-prefs`,Oo=`${Ft}/contribute/tik-tik-coord`;var No=20,Wo=4320*60*1e3,nn=100,Ho=4,on=100,Bo=240,Fo=50,Uo=1440*60*1e3,Es={recheckButton:!1,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function x(t){return C({[t]:Es[t]}).then(e=>e[t])}function St(){return C({posts:[]}).then(t=>t.posts)}function ee(t){return T({posts:t})}function G(){return C("profile").then(t=>t.profile)}var Ut=t=>String(t).padStart(2,"0");function Ce(t){let e=Ut(t%60),n=Math.floor(t/60)%60,i=Math.floor(t/3600);return i?`${Ut(i)}:${Ut(n)}:${e}`:`${Ut(n)}:${e}`}function Ko(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${Ut(n.getUTCHours())}:${Ut(n.getUTCMinutes())}:${Ut(n.getUTCSeconds())}`}}function ci(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),i=t%60,o=[];return e>0&&o.push(`${e}d`),(n>0||e>0)&&o.push(`${n}h`),o.push(`${i}m`),o.join(" ")}function Go(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),i=o=>n.find(r=>r.type===o)?.value??"";return`${i("month")} ${i("day")} ${i("year")} ${i("hour")}:${i("minute")} ${i("dayPeriod")}`}function zo(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),i=parseInt(e[2],10),o=parseInt(e[3],10),r=e[4];r&&(r.toUpperCase()==="PM"&&n<12&&(n+=12),r.toUpperCase()==="AM"&&n===12&&(n=0));let s=new Date;return s.setHours(n,i,o,0),s.getTime()>Date.now()+6e4&&s.setDate(s.getDate()-1),s}var jo=Symbol(),Is=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&U()}on(t,e,n,i){t.addEventListener(e,n,{...i,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!U())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=Ho,interval:n=nn}={}){return new Promise(i=>{let o=r=>{if(!this.alive)return;let s=document.querySelector(t);if(s)return i(s);if(r>=e)return i(null);this.setTimeout(()=>o(r+1),n)};o(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},l=new Is;function Yo(){let t=globalThis[jo];Object.defineProperty(globalThis,jo,{value:l,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var rn=new Uint32Array(2);crypto.getRandomValues(rn);var Vo="abcdefghjkmnpqrstuvwxyz",Ls=(rn[0].toString(36)+rn[1].toString(36)).replace(/[^a-z0-9]/g,""),m=(Vo[rn[0]%Vo.length]+Ls).slice(0,8).padEnd(8,"x");function p(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var a={selRow:m+"01",anchor:m+"02",waitTime:m+"03",recheck:m+"04",histCont:m+"05",histTbl:m+"06",cdCard:m+"07",cdTime:m+"08",ofcDate:m+"09",styles:m+"10",datesCont:m+"11",datesPara:m+"12",slotsTbl:m+"12b",aiBtn:m+"13",aiPanel:m+"14",aiFrom:m+"15",aiTo:m+"16",aiStatus:m+"17",aiConfirm:m+"18",aiCancel:m+"19",aiClose:m+"20",aiCities:m+"21",aiSubmitBtn:m+"22",aiCitiesBtn:m+"23",aiLogin:m+"24",aiPass:m+"25",aiQ1:m+"26",aiA1:m+"27",aiQ2:m+"28",aiA2:m+"29",aiQ3:m+"30",aiA3:m+"31",aiSaveLogin:m+"32",cfHud:m+"33",aiCitiesAll:m+"34",aiCitiesNone:m+"35",aiLoginToggle:m+"36",aiLoginBody:m+"37",aiSubmitOn:m+"38",aiSubmitOff:m+"39",aiCitiesOn:m+"40",aiCitiesOff:m+"41",aiWinList:m+"42",aiWinAdd:m+"43",aiWinSave:m+"44",aiWinReset:m+"45",aiWinNote:m+"46",aiSubmitSw:m+"47",aiCitiesSw:m+"48",aiInfoBox:m+"49",aiWarnBox:m+"50",aiOkBox:m+"51",aiWinCard:m+"52",aiSubmitBody:m+"53",aiCitiesBody:m+"54",aiTerms:m+"55",aiTermsAgree:m+"56",aiTermsGate:m+"57",aiMain:m+"58",aiTermsContinue:m+"59",aiFromBtn:m+"60",aiToBtn:m+"61",aiCal:m+"62"},u={pill:m+"a",pillTtl:m+"b",pillTmr:m+"c",pillWait:m+"d",pillDone:m+"e",footer:m+"f",card:m+"g",cardTtl:m+"h",histScrl:m+"i",dltDn:m+"j",dltUp:m+"k",cdDiv:m+"l",hidden:m+"m",sideLink:m+"n",datesLnk:m+"o",slotsSum:m+"o2",slotsTbl:m+"o3",aiOn:m+"p",aiRow:m+"q",aiHint:m+"r",aiCities:m+"s",aiOnBtn:m+"t",aiCityAct:m+"x",cfHud:m+"u",cfPulse:m+"v",cfFlash:m+"w",aiEn:m+"y",aiDis:m+"z",aiWinRow:m+"aa",aiFeat:m+"ab",aiSwitch:m+"ac",aiKnob:m+"ad",aiSec:m+"ae",aiInfo:m+"af",aiWarn:m+"ag",aiOk:m+"ah",aiTrash:m+"ai",aiWinHelp:m+"aj",aiInline:m+"ak",aiHead:m+"al",aiTerms:m+"am",aiTermsCb:m+"an",aiTermsList:m+"ao",aiContinue:m+"ap",aiDateBtn:m+"aq",aiCal:m+"ar",aiCalHead:m+"as",aiCalGrid:m+"at",aiCalDay:m+"au",aiCalMuted:m+"av",aiCalOn:m+"aw",aiCalToday:m+"ax"},k={mark:m,w:m+"w",mw:m+"mw"},Et={req:m+"q",res:m+"r",ofc:m+"o",err:m+"e",sub:m+"s"};function an(t){return t.map(e=>String.fromCharCode(e)).join("")}function Ps(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function Xo(){let t=document.createElement("div");return t.className=u.footer,t.textContent=an([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function qs(t){let e=document.getElementById(a.histCont);e&&e.remove(),e=document.createElement("div"),e.id=a.histCont,e.className=u.card,e.dataset[k.mark]="";let n=document.createElement("h4");n.className=u.cardTtl,n.textContent=an([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let i=document.createElement("div");i.className=u.histScrl;let o=document.createElement("table");o.id=a.histTbl;let r=document.createElement("thead"),s=document.createElement("tr");for(let f of["Time","Est. Wait","Change"]){let h=document.createElement("th");h.textContent=f,s.appendChild(h)}r.appendChild(s),o.appendChild(r);let c=document.createElement("tbody");for(let f=t.length-1;f>=0;f--){let h=t[f],g="--",y="";if(f>0){let A=h.minutes-t[f-1].minutes;A<0?(g=`${A}m`,y=u.dltDn):A>0?(g=`+${A}m`,y=u.dltUp):g="0m"}let v=document.createElement("tr"),$=[[h.timeStr,""],[ci(h.minutes),""],[g,y]];for(let[A,z]of $){let S=document.createElement("td");z&&(S.className=z),S.textContent=A,v.appendChild(S)}c.appendChild(v)}o.appendChild(c),i.appendChild(o),e.appendChild(i),e.appendChild(Xo());let d=document.getElementById("last-updated");d&&(d.closest("div, p, section")||d.parentElement).insertAdjacentElement("afterend",e)}function Rs(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function Qo(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),i=Rs();if(i!==null&&i>Bo&&!e.textContent.includes("(")){let s=ci(i);e.textContent=`${e.textContent} (${i} minutes / ${s})`}let o=n.textContent.trim().split(" (")[0],r=zo(o);if(r&&l.setInterval(()=>{let s=Math.floor((Date.now()-r)/1e3);s>=0&&(n.textContent=`${o} (${s}s ago)`)},1e3),i!==null){let s=Ps(),c=sessionStorage.getItem(s);c||(c=Math.random().toString(36).substring(2,11),sessionStorage.setItem(s,c)),C({queueHistory:{}}).then(d=>{let f=d.queueHistory||{},h=Date.now(),g={};for(let[A,z]of Object.entries(f)){if(!Array.isArray(z))continue;let S=z[z.length-1];S&&h-S.timestamp<Uo&&(g[A]=z)}let y=g[c]||[],v=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),$=y[y.length-1];(!$||$.minutes!==i||$.timeStr!==v)&&(y.push({timestamp:h,timeStr:v,minutes:i}),y.length>Fo&&y.shift(),g[c]=y,T({queueHistory:g})),qs(y)})}}function Jo(t,e){let n=document.getElementById("error_row");if(!n)return;let i;t?i=e?`Blocked for 24 hours, about ${Ce(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":i="Temporarily blocked. Log in in a new tab, then refresh this page.";let o=document.createElement("div");o.className="atlas_validationalert alert alert-danger warning",o.dataset[k.mark]="",o.textContent=i,n.replaceChildren(o),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function Zo(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&C({cfRetryAfter:null}).then(n=>{let i=parseInt(n.cfRetryAfter,10);if(!isNaN(i)){Po("cfRetryAfter");let o=document.getElementById("what-happened-section");if(o){let r=document.createElement("div");r.id=a.cdCard,r.className=u.card,r.dataset[k.mark]="";let s=document.createElement("h4");s.className=u.cardTtl,s.textContent=an([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),r.appendChild(s);let c=document.createElement("div");c.id=a.cdTime,r.appendChild(c);let d=document.createElement("div");d.className=u.cdDiv,r.appendChild(d),r.appendChild(Xo()),o.appendChild(r);let f=i,h=null,g=()=>{f>0?(c.textContent=Ce(f),f--):(c.classList.add(u.cdDiv+"-over"),c.textContent="You can try refreshing now!",h!=null&&l.clear(h))};g(),h=l.setInterval(g,1e3)}}})}async function tr(){let t=document.querySelector(".username");if(!t)return;let n=(t.innerText||"").trim().match(/^(.*)\((\d+)\)\s*$/);if(!n)return;let[,i,o]=n,r=await G()||{},s=!r.id||r.id===o||String(r.id).includes(o)?r:{};s.name=i.trim(),s.id=o;let c=document.querySelectorAll("script");for(let d of c){let f=d.innerText.trim();if(f.includes("setAuthenticatedUserContext")){let h=/setAuthenticatedUserContext\('([^']*)'\)/,g=f.match(h);g&&(s.email=g[1])}}await T({profile:s})}async function er(){let t=document.querySelector("#post_select");if(!t)return;let e=await St();for(let n of t.options){if(!n.value)continue;e.findIndex(o=>o.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await ee(e)}var Os=["visa-information","fee-payment","appointment-confirmation"];function Ns(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(i=>{let o=i.querySelector(".text-bold");if(!o)return;let r=Ws(o.textContent);if(!Os.includes(r))return;let s=Hs(i);s&&(n[r]=s)}),Object.keys(n).length?n:null}function Ws(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Hs(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function ne(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>Wo)return null}catch{}return t.value}function Bs(t){let e=(t.posts||[]).filter(o=>o.Updated).sort((o,r)=>o.Updated-r.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},i=ne(t.cgiIdToken);return i&&(n.token=i),n}async function li(){if(!U()||!await x("serverSync"))return;let t=await C(["profile","posts","cgiIdToken"]),e=Bs(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await fetch(si,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(o=>o.json());if(!n.success)return;let i="0";n.contribs>0&&(i=n.contribs.toString()),n.contribs>10&&(i="10+"),n.contribs>0&&await T({contribs:{email:t.profile?.email,updated:Date.now(),count:i}})}catch{}}function ui(t=0){U()&&document.querySelector("#appointment-card")&&x("serverSync").then(e=>{if(!e)return;let n=Ns();if(!n){t<No&&l.setTimeout(()=>ui(t+1),nn);return}C(["profile","cgiIdToken","savedDashboard"]).then(i=>{let o=ne(i.cgiIdToken);o&&JSON.stringify(n)!==JSON.stringify(i.savedDashboard)&&fetch(si,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:i.profile,dashboard:n,token:o})}).then(r=>r.json()).then(r=>{r.success&&T({savedDashboard:n})}).catch(()=>{})})})}var Fs=`${Ft}/extension-runtime-config.json`,fi="vsRuntimeConfig",Us=300*1e3,di=0,Te=null,w={slotWindowLabel:":14\u2013:21, :24\u2013:31, :54\u2013:02",slotWindows:[{slot:1,fromMin:0,toMin:2},{slot:2,fromMin:14,toMin:21},{slot:3,fromMin:24,toMin:31},{slot:4,fromMin:54,toMin:59}],windowStartsMin:[0,14,24,54],cityLoadingMaxMs:18e4,cityCalendarNoDatesMs:2e4,cityRotateMinGapMs:13e3,cityRotateMaxGapMs:18e3,cityHoldMaxMs:45e3,homeKeepaliveMinMs:6e5,homeKeepaliveMaxMs:6e5,homeKeepaliveDebounceMs:48e4,loadingStuckMs:12e4,loadingStuckDebounceMs:9e4,remoteVersion:0,source:"bundled"};function V(t,e,n,i){let o=Number(t);return Number.isFinite(o)?Math.min(n,Math.max(e,Math.round(o))):i}function Ks(t){if(!Array.isArray(t)||!t.length||t.length>24)return null;let e=[];for(let n of t){let i=V(n?.fromMin,0,59,NaN),o=V(n?.toMin,0,59,NaN);if(!Number.isFinite(i)||!Number.isFinite(o)||i>o)return null;let r=V(n?.slot,1,12,1);e.push({slot:r,fromMin:i,toMin:o})}return e}function Gs(t){let e=[...new Set(t.map(n=>n.fromMin))].sort((n,i)=>n-i);return e.length?e:w.windowStartsMin.slice()}function nr(t,e="remote"){if(!t||typeof t!="object")return!1;let n=Ks(t.slotWindows);if(n){w.slotWindows.length=0;for(let i of n)w.slotWindows.push(i);w.windowStartsMin=Gs(n)}return typeof t.slotWindowLabel=="string"&&t.slotWindowLabel.length<120&&(w.slotWindowLabel=t.slotWindowLabel),w.cityLoadingMaxMs=V(t.cityLoadingMaxMs,1e4,3e5,w.cityLoadingMaxMs),w.cityCalendarNoDatesMs=V(t.cityCalendarNoDatesMs,5e3,12e4,w.cityCalendarNoDatesMs),w.cityRotateMinGapMs=V(t.cityRotateMinGapMs,5e3,6e4,w.cityRotateMinGapMs),w.cityRotateMaxGapMs=V(t.cityRotateMaxGapMs,w.cityRotateMinGapMs,9e4,Math.max(w.cityRotateMinGapMs,w.cityRotateMaxGapMs)),w.cityHoldMaxMs=V(t.cityHoldMaxMs,1e4,18e4,w.cityHoldMaxMs),w.homeKeepaliveMinMs=V(t.homeKeepaliveMinMs,12e4,18e5,w.homeKeepaliveMinMs),w.homeKeepaliveMaxMs=V(t.homeKeepaliveMaxMs,w.homeKeepaliveMinMs,18e5,Math.max(w.homeKeepaliveMinMs,w.homeKeepaliveMaxMs)),w.homeKeepaliveDebounceMs=V(t.homeKeepaliveDebounceMs,6e4,18e5,w.homeKeepaliveDebounceMs),w.loadingStuckMs=V(t.loadingStuckMs,3e4,6e5,w.loadingStuckMs),w.loadingStuckDebounceMs=V(t.loadingStuckDebounceMs,3e4,6e5,w.loadingStuckDebounceMs),w.remoteVersion=V(t.version,0,1e9,w.remoteVersion),w.source=e,!0}async function zs(){try{let e=(await C(fi))[fi];e?.config&&nr(e.config,"cache")}catch{}}async function js(t){try{await T({[fi]:{config:t,fetchedAt:Date.now()}})}catch{}}async function Ys({force:t=!1}={}){let e=Date.now();if(!t&&e-di<Us)return w;if(Te)return Te;Te=(async()=>{await zs();try{let n=await fetch(Fs,{method:"GET",cache:"no-store",signal:AbortSignal.timeout(8e3)});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.json();if(!i||typeof i!="object"||Array.isArray(i))throw new Error("bad json");if(i.script||i.code||i.eval)throw new Error("unsafe keys");nr(i,"remote"),await js(i),di=Date.now()}catch{di=Date.now()}return w})();try{return await Te}finally{Te=null}}function ir(){Ys().catch(()=>{})}var It=null,_e=null;function or(){return It||w.slotWindows}function ut(){return _e||(It?.length?rr(It):w.slotWindowLabel)}var ed=w.slotWindows,xt=4,Lt=6;function rr(t){return t?.length?t.map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", "):w.slotWindowLabel}function mi(t){if(!Array.isArray(t))return[];let e=[];for(let n of t){if(e.length>=xt)break;let i=Number(n?.fromMin),o=Number(n?.durationMin??n?.duration);if(!Number.isFinite(i)||i<0||i>59)continue;let r=Math.min(Lt,59-i);if(r<1)continue;if(!Number.isFinite(o)||o<1){let c=Number(n?.toMin);if(!Number.isFinite(c)||c<i||c>59||(o=Math.min(r,c-i),o<1))continue}o=Math.min(r,Math.max(1,Math.round(o)));let s=Math.min(59,i+o);e.push({slot:e.length+1,fromMin:Math.round(i),toMin:s,durationMin:o})}return e}function ar(t){let e=mi(t||[]);return e.length?(It=e.map(({slot:n,fromMin:i,toMin:o})=>({slot:n,fromMin:i,toMin:o})),_e=rr(It),It):(It=null,_e=null,null)}function pi(){It=null,_e=null}function sr(t){let e=t?.length?t:w.slotWindows,n=[];for(let i of e||[]){if(n.length>=xt)break;let o=Number(i.fromMin),r=Number(i.toMin);if(!Number.isFinite(o)||!Number.isFinite(r)||r<o||o===0&&r<=2&&(e||[]).some(d=>Number(d.fromMin)>=54))continue;let s=Math.min(Lt,59-o);if(s<1)continue;let c=Math.min(s,Math.max(1,r-o));n.push({fromMin:o,durationMin:c})}return n}function cr(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=i=>Number(e.find(o=>o.type===i)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function ie(t=new Date){let{minute:e}=cr(t),n=or();for(let i of n)if(e>=i.fromMin&&e<=i.toMin)return i.slot;return 0}function $e(t=new Date){if(ie(t))return 0;let{minute:e,second:n}=cr(t),i=e*60+n,o=or(),r=[...new Set(o.map(c=>c.fromMin))].sort((c,d)=>c-d);for(let c of r){let d=c*60;if(i<d)return(d-i)*1e3}let s=r[0]??0;return(3600-i+s*60)*1e3}function hi(t){return t<9e4?`${Math.ceil(t/1e3)}s`:`${Math.ceil(t/6e4)}m`}function hr(){let t=document.querySelector(p(a.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=a.selRow,t.dataset[k.mark]="",n.insertAdjacentElement("afterend",t);let i=document.createElement("span");return i.id=a.anchor,i.dataset[k.mark]="",i.dataset[k.w]=e.style.width,i.dataset[k.mw]=e.style.minWidth,i.hidden=!0,e.insertAdjacentElement("beforebegin",i),l.setStyle(e,"width","100%"),l.setStyle(e,"minWidth","0"),t.appendChild(e),t}var ke="waitPillState",Vs=3600*1e3,lr=u.pillWait,Xs=u.pillDone;function Qs(t,e){let n=document.createElement("span");n.className=`${u.pill} ${e}`;let i=(o,r)=>{let s=document.createElement("span");s.className=o,s.textContent=r,n.appendChild(s)};return i(u.pillTtl,t.title),t.timer!==void 0&&i(u.pillTmr,t.timer),n}function Js(t,e=Date.now()){if(t.kind==="waiting")return{variant:lr};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:lr}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:Xs}}return null}function Zs(t,e,n=new Date){let i=Ko(n);return t.seconds===void 0?{title:i}:{title:i,timer:Ce(t.seconds)}}var tc=class{#t=null;#e={kind:"idle"};#i=null;#n=null;#o=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get(ke))[ke];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>Vs){chrome.storage.local.remove(ke);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#o=t,this.#r(),this.#c()}toggleClockMode(){l.alive&&(this.setClockMode(!this.#o),chrome.storage.local.set({waitPillClock:this.#o}))}render(t){return Js(this.#e,t)}#l(t){return Zs(t,this.#o,new Date)}#r(){if(this.#t??=nc(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(u.hidden);return}this.#t.classList.remove(u.hidden),this.#t.replaceChildren(Qs(this.#l(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#i&&(l.clear(this.#i),this.#i=null),t.kind==="running"?(chrome.storage.local.set({[ke]:t}),this.#i=l.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove(ke),this.#r(),this.#c()}#u(){this.#r(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,x("audioAlert").then(t=>{t&&mc()})))}#c(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=l.setInterval(()=>this.#r(),1e3):!t&&this.#n&&(l.clear(this.#n),this.#n=null)}},se=new tc,Ie="pillPosition",ur=4;function dr(t,e,n){return Math.max(e,Math.min(n,t))}function gr(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,i=e.height>0?e.height:36;return{w:n,h:i}}function oe(t,e,n){let{w:i,h:o}=gr(t),r=dr(e,0,Math.max(0,window.innerWidth-i)),s=dr(n,0,Math.max(0,window.innerHeight-o));return t.style.setProperty("left",r+"px","important"),t.style.setProperty("top",s+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:r,top:s}}function ec(t){var e=!1,n=!1,i=0,o=0,r=0,s=0;function c(f){if(e){var h=f.touches?f.touches[0]:f,g=h.clientX-i,y=h.clientY-o;!n&&Math.abs(g)<ur&&Math.abs(y)<ur||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",oe(t,r+g,s+y),f.cancelable&&f.preventDefault())}}function d(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",d),document.removeEventListener("touchmove",c),document.removeEventListener("touchend",d),n){let f=t.getBoundingClientRect();chrome.storage.local.set({[Ie]:{top:Math.round(f.top),left:Math.round(f.left)}})}n=!1}}t.addEventListener("mousedown",function(f){if(f.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let h=t.getBoundingClientRect();i=f.clientX,o=f.clientY,r=h.left,s=h.top,oe(t,h.left,h.top),document.addEventListener("mousemove",c),document.addEventListener("mouseup",d),f.preventDefault(),f.stopPropagation()}),t.addEventListener("touchstart",function(f){e=!0,n=!1,delete t.dataset.skipClick;let h=t.getBoundingClientRect();i=f.touches[0].clientX,o=f.touches[0].clientY,r=h.left,s=h.top,oe(t,h.left,h.top),document.addEventListener("touchmove",c,{passive:!1}),document.addEventListener("touchend",d)},{passive:!0})}function nc(){let t=document.querySelector(p(a.waitTime));return t||(t=document.createElement("div"),t.id=a.waitTime,t.className=u.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),ec(t),chrome.storage.local.get(Ie).then(e=>{let n=e[Ie];n&&typeof n.top=="number"&&typeof n.left=="number"&&oe(t,n.left,n.top)}),ac(t),t)}function fr(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function ic(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function oc(t){let{w:e,h:n}=gr(t),i=12;return[{left:i,top:i},{left:Math.max(i,window.innerWidth-e-i),top:i},{left:i,top:Math.max(i,window.innerHeight-n-i)},{left:Math.max(i,window.innerWidth-e-i),top:Math.max(i,window.innerHeight-n-i)}]}async function rc(){let e=(await chrome.storage.local.get(Ie))[Ie];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function ac(t){let e=!1,n=async()=>{if(!l.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(u.hidden))return;let i=ic(),o=!!(i&&i.offsetParent!==null&&i.getBoundingClientRect().height>20),r=t.getBoundingClientRect();if(o&&fr(r,i.getBoundingClientRect())){let s=i.getBoundingClientRect(),c=oc(t),d=c.find(f=>{let h={left:f.left,top:f.top,right:f.left+r.width,bottom:f.top+r.height};return!fr(h,s)})||c[2];e=!0,t.setAttribute("data-dodging",""),oe(t,d.left,d.top);return}if(e&&!o){e=!1,t.removeAttribute("data-dodging");let s=await rc();s&&oe(t,s.left,s.top)}else o||t.removeAttribute("data-dodging")};l.setInterval(n,400),l.on(window,"resize",n)}async function wi(){if(!l.alive||!await x("defaultWaitTime")||!await l.waitFor("#post_select",{attempts:on}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});se.setClockMode(t),await se.restore()}async function yr(){await x("defaultWaitTime")&&se.waiting()}async function pn(t){await x("defaultWaitTime")&&se.run(t)}function br(){se.toggleClockMode()}function wr(t){se.setClockMode(t)}var Me=null,Ae=null,sn=null;function Si(){return sn||(sn=new(window.AudioContext||window.webkitAudioContext),l.disposable(()=>sn?.close())),sn}async function hn(t=150){try{let e=Si();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let o=e.currentTime,r=t/1e3;i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(.1,o+.01),i.gain.setValueAtTime(.1,o+Math.max(.01,r-.02)),i.gain.linearRampToValueAtTime(0,o+r),n.start(),n.stop(o+r)}catch(e){console.error("Audio beep failed:",e)}}function sc(t,e=125,n=125){let i=0,o=()=>{i>=t||(hn(e),i++,l.setTimeout(o,e+n))};o()}var gi=4,mr=50,pr=50,cc=600;function Sr(){if(Ae)return;let t=()=>{sc(gi,mr,pr);let e=gi*mr+(gi-1)*pr;Ae=l.setTimeout(t,e+cc)};t()}var lc=250,uc=10,dc=300,fc=1e3;function mc(){if(Me)return;let t=[];for(let o=0;o<=dc;o+=uc)t.push(o);let e=Date.now(),n=0,i=()=>{let o=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&o>=t[n];){let r=n===t.length-1;hn(r?fc:lc),n++}if(n<t.length){let r=t[n],s=e+r*1e3,c=Math.max(0,s-Date.now());Me=l.setTimeout(i,c)}else ce()};i()}function ce(t={}){let e=!!t.keepConsular;Me&&(l.clear(Me),Me=null),Ae&&(l.clear(Ae),Ae=null),yi(),e||bi()}var cn=null,ln=null,re=null,un=null,De=null;async function xr(){yi();try{let t=Si();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=880,i.frequency.value=1320,o.gain.value=.85,r.gain.value=.65,n.connect(o).connect(e),i.connect(r).connect(e);let s=t.createOscillator(),c=t.createGain();s.type="triangle",s.frequency.value=3.2,c.gain.value=280,s.connect(c),c.connect(n.frequency),c.connect(i.frequency);let d=t.currentTime;n.start(d),i.start(d),s.start(d),re={osc1:n,osc2:i,lfo:s,master:e};let f=()=>{re&&(hn(500),ln=l.setTimeout(f,1800))};f(),cn=l.setTimeout(yi,12e4),De=document.title;let h=!1,g=()=>{re&&(document.title=h?De:"!!! SUBMIT CLICKED !!!",h=!h,un=l.setTimeout(g,450))};g()}catch(t){console.error("Submit alarm failed:",t)}}function yi(){if(cn&&(l.clear(cn),cn=null),ln&&(l.clear(ln),ln=null),un&&(l.clear(un),un=null),De&&(document.title=De,De=null),re){try{let{osc1:t,osc2:e,lfo:n}=re;t.stop(),e.stop(),n.stop()}catch{}re=null}}function pc(){let t=location.pathname||"";return/\/ofc-schedule\b/i.test(t)?!1:/\/(schedule|c-schedule)\b/i.test(t)}var hc=6e4,dn=null,fn=null,mn=null,Ee=null,ae=null;async function gc(){bi();try{let t=Si();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=980,i.frequency.value=1470,o.gain.value=.95,r.gain.value=.8,n.connect(o).connect(e),i.connect(r).connect(e);let s=t.createOscillator(),c=t.createGain();s.type="square",s.frequency.value=4,c.gain.value=320,s.connect(c),c.connect(n.frequency),c.connect(i.frequency);let d=t.currentTime;n.start(d),i.start(d),s.start(d),ae={osc1:n,osc2:i,lfo:s,master:e};let f=()=>{ae&&(hn(650),fn=l.setTimeout(f,900))};f(),dn=l.setTimeout(bi,hc),Ee=document.title;let h=!1,g=()=>{ae&&(document.title=h?Ee:"!!! OFC BOOKED \u2014 CONSULAR PAGE !!!",h=!h,mn=l.setTimeout(g,400))};g()}catch(t){console.error("Consular OFC alarm failed:",t)}}function bi(){if(dn&&(l.clear(dn),dn=null),fn&&(l.clear(fn),fn=null),mn&&(l.clear(mn),mn=null),Ee&&(document.title=Ee,Ee=null),ae){try{let{osc1:t,osc2:e,lfo:n}=ae;t.stop(),e.stop(),n.stop()}catch{}ae=null}}function vr(){if(pc()){try{let t="vsConsularOfcBeep";if(sessionStorage.getItem(t)==="1")return;sessionStorage.setItem(t,"1")}catch{}gc()}}function yc(){document.querySelector(p(a.recheck))?.remove();for(let t of document.querySelectorAll("button"))(t.textContent||"").trim()==="Recheck"&&t.remove()}async function xi(){l.alive&&yc()}async function Ci(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await l.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let i=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(c=>c.innerText.trim()===i))continue;let r=document.createElement("li");r.className="usa-sidenav__item",r.dataset[k.mark]="";let s=document.createElement("a");s.href=n.link,s.className=u.sideLink,s.target="_self",s.textContent=n.text,r.appendChild(s),t.appendChild(r)}}function D(t,e,n){let i=document.createElement(t);return e&&(i.className=e),n?.appendChild(i),i}function gn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,r]=n;return`${r}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return null}function vi(t){let e=gn(t);if(!e)return String(t||"");let[n,i,o]=e.split("-").map(Number);if(!n||!i||!o)return e;try{return new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(new Date(n,i-1,o))}catch{return e}}function bc(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);if(n)return n[1].slice(0,5);let i=e.match(/^(\d{1,2}:\d{2})/);return i?i[1]:e}function Cr(t){let e=document.querySelector(p(a.datesCont));if(e){let o=e.querySelector(p(a.datesPara)),r=e.querySelector("h2");if(r&&t&&(r.textContent=t),o)return{container:e,details:o}}let n=document.querySelector("#page_form");if(!n)return null;e?.remove();let i=wc(t||"");return n.appendChild(i.container),i}function Tr(t){if(t.response.HasError)return;let e=document.querySelector("#post_select"),n=e?.options[e.selectedIndex]?.text??"",i=(t.response.ScheduleDays||[]).map(f=>gn(f?.Date)).filter(Boolean).sort((f,h)=>f.localeCompare(h));document.querySelector(p(a.datesCont))?.remove();let o=Cr(n);if(!o)return;let{details:r}=o;r.replaceChildren();let s=D("div",u.slotsSum,r);if(!i.length){s.textContent="No slots available";return}s.textContent=`${i.length} date${i.length===1?"":"s"} available`;let c={};for(let f of i){let h=f.slice(0,7);(c[h]||=[]).push(f)}for(let[f,h]of Object.entries(c)){let g=D("div",null,r),y=document.createElement("strong");y.textContent=f,g.append(y,`: ${h.map(v=>v.slice(8,10)).join(", ")}`)}let d=D("div",null,r);d.style.marginTop="0.5em";for(let f of i){let h=D("div",null,d);h.textContent=`\u2022 ${vi(f)} (${f})`}}function _r(t,e,n){let i=document.querySelector("#post_select"),o=n||i?.options[i.selectedIndex]?.text||"",r=gn(e)||gn(t?.[0]?.Date)||"",s=(t||[]).filter(S=>S&&S.Time).map(S=>({time:bc(S.Time),avail:S.EntriesAvailable!=null&&Number.isFinite(Number(S.EntriesAvailable))?Number(S.EntriesAvailable):null,raw:S})).sort((S,F)=>String(S.time).localeCompare(String(F.time))),c=Cr(o);if(!c)return;let{details:d}=c;d.replaceChildren();let f=D("div",u.slotsSum,d);if(!s.length){f.textContent=r?`No time slots on ${vi(r)}`:"No time slots available";return}let h=s.filter(S=>S.avail==null||S.avail>0),g=h.reduce((S,F)=>S+(F.avail||0),0),y=r?vi(r):"selected date";if(f.textContent=g>0?`${h.length} time slot${h.length===1?"":"s"} on ${y} \xB7 ${g} available`:`${s.length} time slot${s.length===1?"":"s"} on ${y}`,r){let S=D("div",null,d);S.style.margin="0.35em 0 0.6em",S.textContent=`Date: ${y} (${r})`}let v=D("table",u.slotsTbl,d);v.id=a.slotsTbl;let $=D("thead",null,v),A=D("tr",null,$);for(let S of["Time","Availability"]){let F=D("th",null,A);F.textContent=S}let z=D("tbody",null,v);for(let S of s){let F=D("tr",null,z);S.avail===0&&(F.style.opacity="0.55");let wt=D("td",null,F);wt.textContent=S.time;let Ds=D("td",null,F);Ds.textContent=S.avail==null?"\u2014":String(S.avail)}}function wc(t){let e=D("div","row");e.id=a.datesCont;let n=D("div","col-sm-12 atlas_section mt-3",e),i=D("div","col-sm-12 atlas_section_header_row",D("div","row",n));D("h2",null,i).textContent=t;let o=D("div",null,D("div","col-sm-12",D("div","row",n)));return o.id=a.datesPara,{container:e,details:o}}var $r=null;function Sc(){let t=document.querySelector(p(a.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return l.setStyle(n,"display","flex"),l.setStyle(n,"alignItems","center"),l.setStyle(n,"justifyContent","flex-end"),l.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=a.ofcDate,t.dataset[k.mark]="",e.insertAdjacentElement("beforebegin",t),t}function xc(){if(!location.pathname.includes("/schedule"))return;let t=$r;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=Sc();n&&(n.textContent=`OFC (Estimate): ${Go(e.appointmentDateStr)}`)}function kr(t){chrome.runtime?.id&&($r=t.data.data,l.waitFor("#submitbtn").then(e=>{e&&xc()}))}var yn=new Map,Mr=45e3,bn=new Map,Ar=8e3,Dr=0;function wn(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function Sn(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function vc(t,e){return`${t}:${e.slice(0,5).join(",")}`}function Cc(t){let e=Date.now(),n=yn.get(t);if(n&&e-n<Mr)return!1;yn.set(t,e);for(let[i,o]of yn)e-o>Mr*4&&yn.delete(i);return!0}function Tc(t){let e=Date.now(),n=bn.get(t);if(n&&e-n<Ar)return!1;bn.set(t,e);for(let[i,o]of bn)e-o>Ar*6&&bn.delete(i);return!0}async function Er(){return await x("telegramViaServer")!==!1}async function Ir(t,{kind:e="alert",dedupKey:n="",skipDedup:i=!1,notifyMuktesh:o=!0}={}){if(t&&await Er())try{await fetch(Ro,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:i,notify_muktesh:o}),signal:AbortSignal.timeout(2e4)})}catch{}}function _c(t,{kind:e="screen",dedupKey:n="",waitMs:i=0,skipDedup:o=!1,notifyMuktesh:r=!0}={}){l.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:i,skipDedup:o,notifyMuktesh:r,captureScreenshot:!0})}async function $c(t,e,n){let i=wn(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&r.push(`\u{1FAAA} <b>Visa:</b> ${n}`),r.push(`\u{1F550} <b>Checked:</b> ${o} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),r.push(`\u{1F4C6} <b>Dates (${i.length}):</b>`,"");for(let s of i.slice(0,30))r.push(`\u{1F7E2} <b>${Sn(s)}</b>`);return i.length>30&&r.push("",`\u2795 <i>+${i.length-30} more dates</i>`),r.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),r.join(`
`)}function kc(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",i=document.querySelector("#datepicker")?.value||"\u2014",r=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:i,time:r}}async function Lr(t,{postId:e,postName:n,hasError:i}={}){if(i||!t?.length)return;let o=wn(t);if(!o.length||!await x("telegramAlert"))return;let r=vc(e||n||"unknown",o);if(!Cc(r))return;let s=await G(),c=await $c(n,t,s?.visa||"");await Ir(c,{kind:"slots",dedupKey:r,notifyMuktesh:!0})}function Mc(t,e,n){let i=wn(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
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
\u{1F4F2} Visa Slot 6`}function Ac(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=e?Sn(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${i}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function Dc(t,e,n){let i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?Sn(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u23F0 ${n} slot(s)
\u{1F550} ${i} IST
\u{1F4F2} Visa Slot 6`}async function le(t,{kind:e="screen",dedupKey:n,waitMs:i=0,skipDedup:o=!1}={}){if(await x("telegramScreenshots")===!1||!await Er())return;let r=n||`${e}:${String(t).slice(0,80)}`;!o&&!Tc(r)||_c(t,{kind:e,dedupKey:r,waitMs:i,skipDedup:o,notifyMuktesh:!0})}async function Pr(t,{postId:e,postName:n,hasError:i}={}){let o=Mc(n,t,i),r=wn(t),s=r.length?"dates":"city";await le(o,{kind:s,dedupKey:`${s}:${e||n}:${r.length}:${i?1:0}`,waitMs:r.length?1400:900})}async function qr(t,e){await le(Ac(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function Rr(t,e,n){await le(Dc(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function Or(){let t=Date.now();if(t-Dr<8e3)return;Dr=t;let e=await G(),{city:n,date:i,time:o}=kc(),r=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),s=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${i}`,`\u23F0 <b>Time:</b> ${o}`];e?.email&&s.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&s.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),s.push(`\u{1F550} <b>When:</b> ${r} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let c=s.join(`
`);await Ir(c,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await le(c,{kind:"submit",skipDedup:!0,waitMs:200})}var vn=25;function Cn(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function $i(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let i=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,i),n-1)}function Nr(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function Wr(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function Mi(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function Ti(t){if(t)try{t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}}function xn(t){if(t)try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}}function ki(t){if(!t||t.disabled)return!1;try{if(t.tagName==="SELECT")return!t.value||t.value==="0"?!1:(Ti(t),t.value&&t.value!=="0"?!0:(xn(t),!!(t.value&&t.value!=="0")));if(t.type==="radio"||t.type==="checkbox"){if(t.name)for(let i of document.getElementsByName(t.name))i!==t&&(i.checked=!1);if(t.checked=!0,Ti(t),t.checked)return!0;let e=t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,n=t.closest("tr");for(let i of[e,t.closest("label"),t,n].filter(Boolean))xn(i);return t.checked=!0,Ti(t),t.checked===!0}xn(t)}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function Hr(){let t=new Set,e=[],n=i=>{if(!i||t.has(i)||Mi(i)||i.disabled)return;let o=i.closest("tr");o&&Wr(o)||(t.add(i),e.push(i))};for(let i of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let o of document.querySelectorAll(`${i}:not([disabled])`))n(o);return e}function Ec(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!Nr(n)||Wr(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function Ic(t,e){for(let n of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(n.tagName!=="SELECT"||n.disabled||Mi(n))continue;let i=[...n.options].filter(s=>!s.disabled&&s.value&&s.value!=="0"&&Nr({textContent:s.textContent}));if(!i.length)continue;let o=null,r=Cn(e);if(r&&r!=="00:00"&&(o=i.find(s=>(s.textContent||"").includes(r))||null,!o)){let s=r.match(/(\d{1,2}:\d{2})/);s&&(o=i.find(c=>(c.textContent||"").includes(s[1]))||null)}if(!o){let s=$i(i.length,t);o=i[s]}if(o&&(n.value=o.value,ki(n)))return!0}return!1}function Lc(t,e){if(Ic(t,e))return!0;let n=Hr();if(n.length){let o=null,r=Cn(e);if(r&&r!=="00:00"&&(o=n.find(s=>{let c=(s.closest("tr")?.textContent||s.textContent||"").replace(/\s+/g," ");return c.includes(r)||c.includes(r.slice(0,5))})||null),!o){let s=$i(n.length,t);o=n[s]}if(o&&ki(o))return!0}let i=Ec();if(i.length){let o=null,r=Cn(e);if(r&&r!=="00:00"&&(o=i.find(d=>(d.textContent||"").includes(r))||null),!o){let d=$i(i.length,t);o=i[d]}if(!o)return!1;let s=o.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(s&&ki(s))return!0;let c=o.querySelector("label");if(c)return xn(c),!!o.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function X(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!Mi(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function Pc({slotIndex:t=0,maxMs:e=12e3,pollMs:n=vn,time:i,onTick:o}={}){let r=Date.now()+e,s=Math.max(10,n||25);return new Promise(c=>{let d=()=>{if(!l.alive)return c(!1);if(o?.(),Lc(t,i)||X())return c(!0);if(Date.now()>=r)return c(!1);l.setTimeout(d,s)};d()})}function Le({time:t,date:e,slotIndex:n,pollMs:i,maxMs:o}){let r=n??0,s=o||15e3,c=i||vn;return l.send({action:"forcePickTimeSlot",slotIndex:r,maxMs:s,pollMs:c}),l.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:r,pollMs:c,domWaitMs:0,maxMs:s}),Pc({slotIndex:r,maxMs:s,pollMs:c,time:t||"00:00"})}var _i=!1;function Br({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(_i)return;_i=!0;let i=!1,o=async()=>{if(!(!l.alive||i)){if(X()){n?.();return}try{if(t&&!await t())return}catch{return}Hr().length&&(i=!0,await Le({slotIndex:e,time:"00:00",maxMs:800,pollMs:vn}),i=!1,X()&&n?.())}};l.setInterval(o,vn);let r=document.querySelector("#page_form")||document.body,s=new MutationObserver(()=>o());s.observe(r,{childList:!0,subtree:!0}),l.disposable(()=>{s.disconnect(),_i=!1})}function Fr(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let i=Cn(n?.Time);if(!i)continue;let o=i.match(/(\d{1,2}):(\d{2})/);if(!o)continue;let[,r,s]=o;if(e.includes(`${r}:${s}`)||e.includes(`${parseInt(r,10)}:${s}`))return!0}return!1}var Tn="submitErrors",Ur=50,qc=45e3,Gr=0,Ai=new Set,Pe=null,zr=null;function jr(t){zr=typeof t=="function"?t:null}function Rc(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",i=document.querySelector("#datepicker")?.value||"";return{city:e,date:i,url:location.href}}function qe(){Gr=Date.now()+qc,Ai.clear(),Fc()}function _n(){return Date.now()<Gr}function Oc(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function Nc(t){let e=await C({[Tn]:[]}),n=Array.isArray(e[Tn])?e[Tn]:[];n.push(t),n.length>Ur&&n.splice(0,n.length-Ur),await T({[Tn]:n})}function Kr(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function Wc(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${Kr(t.source)}`,`\u{1F4AC} <b>Message:</b> ${Kr(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let i=n.join(`
`);await le(i,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function Re(t,e,n={}){let i=String(e||"").trim();if(!i||!_n()&&!n.force)return;let o=Oc(t,i);if(Ai.has(o))return;Ai.add(o);let r=Rc(),s=await G(),c={at:Date.now(),source:String(t||"unknown"),message:i.slice(0,2e3),city:n.city||r.city,date:n.date||r.date,url:n.url||r.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:s?.email||""};await Nc(c);try{await Wc(c)}catch{}try{zr?.(c)}catch{}}function Hc(t){if(!_n())return;let e=t?.status,n=t?.retryAfter,i=t?.cgiBlock,o=`Request failed (HTTP ${e||"?"})`;n!=null&&(o+=` \u2014 retry after ${n}s`),i&&(o+=" \u2014 CGI access limitation"),Re("ajax_error",o,{status:e})}function Yr(t){if(!_n()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){Hc({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",o=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";Re("ajax_response",o,{route:t.tail||""})}var Bc=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function Fc(){Pe&&l.clear(Pe);let t=()=>{if(!l.alive||!_n()){Pe=null;return}for(let e of Bc)for(let n of document.querySelectorAll(e)){let i=(n.textContent||"").replace(/\s+/g," ").trim();!i||i.length<4||Re("page_validation",i)}Pe=l.setTimeout(t,600)};Pe=l.setTimeout(t,500)}var Oe=0,Vr="",Xr=0;async function Uc(){let[t,e]=await Promise.all([G(),C(["cgiIdToken"])]),n=ne(e.cgiIdToken);return{profile:t,token:n}}async function Qr(t){if(!U()||!await x("serverSync"))return null;let{profile:e,token:n}=await Uc();if(!e?.id&&!e?.email)return null;try{let i={...t,profile:e};n&&(i.token=n);let o=await fetch(Oo,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}).then(r=>r.json());return o&&o.success?o:null}catch{return null}}async function Jr({postId:t,postName:e,dayCount:n}={}){let i=String(t||"").trim(),o=Number(n)||0;if(!i||o<1)return null;let r=`${i}:${o}`,s=Date.now();if(r===Vr&&s-Xr<1500)return null;Vr=r,Xr=s;let c=await Qr({action:"alert",city:{id:i,name:String(e||i).trim()},dayCount:o});return c?.alertId&&(Oe=Math.max(Oe,Number(c.alertId)||0)),c}async function Zr({preferredCities:t=[],citiesEnabled:e=!1,currentCityId:n=""}={}){if(!e||!t?.length)return null;let o=(await Qr({action:"poll",preferredCities:t,citiesEnabled:!0,currentCityId:String(n||""),lastAlertId:Oe}))?.forceCity;return!o?.id||!o?.alertId?null:o}function $n(t){let e=Number(t)||0;e>Oe&&(Oe=e)}var Kc=["cities","from","to","submitEnabled","citiesEnabled","enabled","slotWindows","termsAgreed","termsPassed","termsAgreedAt"];function ta(t){if(!t||typeof t!="object")return{};let e={};for(let n of Kc)n in t&&(e[n]=t[n]);return typeof e.submitEnabled!="boolean"&&typeof e.enabled=="boolean"&&(e.submitEnabled=e.enabled),delete e.enabled,e}function ea(t,e){if(!e||typeof e!="object")return t||null;let n=t&&typeof t=="object"?{...t}:{},i=Number(n.serverUpdatedAt)||0,o=Number(e.updatedAt)||0;if(o&&i&&o<i)return n;let r=ta(e),s={...n,...r};return typeof r.submitEnabled=="boolean"&&(s.enabled=r.submitEnabled),e.updatedAt&&(s.serverUpdatedAt=e.updatedAt),s}async function na(){let[t,e]=await Promise.all([G(),C(["cgiIdToken"])]),n=ne(e.cgiIdToken);return{profile:t,token:n}}async function ia(t){if(!U()||!await x("serverSync"))return!1;let e=ta(t);if(!Object.keys(e).length)return!1;let{profile:n,token:i}=await na();if(!n?.id&&!n?.email)return!1;try{let o={profile:n,prefs:e};i&&(o.token=i);let r=await fetch(en,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(s=>s.json());return!!(r&&r.success)}catch{return!1}}async function oa(){if(!U()||!await x("serverSync"))return null;let{profile:t,token:e}=await na();if(!t?.id&&!t?.email)return null;try{let n=new URLSearchParams;t.id&&n.set("applicant_id",String(t.id)),t.email&&n.set("email",String(t.email));let i=await fetch(`${en}?${n.toString()}`,{method:"GET",headers:{Accept:"application/json"}}).then(r=>r.json());if(i?.prefs)return i.prefs;let o={profile:t};return e&&(o.token=e),i=await fetch(en,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(r=>r.json()),i?.prefs||null}catch{return null}}var qt="aiSubmitByAccount",pe=8e3;var Y=25;var Pn=0,He=1e4,va=1e3;function he(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}function Fi(){return w.cityRotateMinGapMs}function Gc(){return w.cityRotateMaxGapMs}function Be(){return w.cityHoldMaxMs}function Ct(){return w.cityLoadingMaxMs}function Kt(){return w.cityCalendarNoDatesMs}var ra=5e3,Ii=2e4,zc=15e3;function mt(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function Ui(){return/\/ofc-schedule\b/i.test(location.pathname)}function _(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var jc=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function Mn(t,e){let n=jc[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(o=>{let r=e===o?" selected":"";return`<option value="${o.replace(/"/g,"&quot;")}"${r}>${o}</option>`}).join("")}function ue(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function Xt(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function Yc(t,e,n){return`${t}-${String(e+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`}function Vc(t){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(t))return null;let[e,n,i]=t.split("-").map(Number),o=new Date(e,n-1,i);return o.getFullYear()!==e||o.getMonth()!==n-1||o.getDate()!==i?null:o}function Ki(){for(let t of["from","to"]){let e=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo)),n=document.querySelector(p(t==="from"?a.aiFromBtn:a.aiToBtn));if(!n)continue;let i=e?.value||"";n.textContent=i?Xt(i):"Select date"}}function Di(t,e){let n=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo));if(n&&(n.value=e||""),t==="from"){let i=document.querySelector(p(a.aiTo));i&&e&&i.value&&i.value<e&&(i.value="")}Ki()}var J={y:0,m0:0,which:"from"};function Rt(){document.querySelector(p(a.aiCal))?.classList.add(u.hidden)}function Gi(t){let e=t.target;return e?e.nodeType===3?e.parentElement:e:null}function Li(){let t=document.querySelector(p(a.aiCal));if(!t)return;let{y:e,m0:n,which:i}=J,o=document.querySelector(p(i==="from"?a.aiFrom:a.aiTo))?.value||"",r=ue(),s=i==="to"&&document.querySelector(p(a.aiFrom))?.value||ue(),c=new Date(e,n,1).toLocaleDateString("en-IN",{month:"long",year:"numeric"}),d=new Date(e,n,1).getDay(),f=new Date(e,n+1,0).getDate(),h=new Date(e,n,0).getDate(),g="";for(let y of["S","M","T","W","T","F","S"])g+=`<div class="${u.aiHint}">${y}</div>`;for(let y=0;y<42;y++){let v,$=e,A=n,z=!1;y<d?(v=h-d+y+1,A=n-1,A<0&&(A=11,$=e-1),z=!0):y>=d+f?(v=y-d-f+1,A=n+1,A>11&&(A=0,$=e+1),z=!0):v=y-d+1;let S=Yc($,A,v),F=S<s,wt=[u.aiCalDay,z?u.aiCalMuted:"",F?u.aiCalMuted:"",S===r?u.aiCalToday:"",S===o?u.aiCalOn:""].filter(Boolean).join(" ");g+=`<button type="button" class="${wt}" data-iso="${S}" ${F?'disabled aria-disabled="true"':""}>${v}</button>`}t.innerHTML=`
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
  `}function Xc(t){let e=document.querySelector(p(a.aiCal)),i=Gi(t)?.closest?.("button");if(!e||!i||!e.contains(i))return;t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation();let o=i.getAttribute("data-cal"),r=J.which,s=r==="to"&&document.querySelector(p(a.aiFrom))?.value||ue();if(o==="prev"){J.m0-=1,J.m0<0&&(J.m0=11,J.y-=1),Li();return}if(o==="next"){J.m0+=1,J.m0>11&&(J.m0=0,J.y+=1),Li();return}if(o==="clear"){Di(r,""),Rt();return}if(o==="today"){let d=ue();d>=s&&(Di(r,d),Rt(),xa());return}if(i.disabled||i.getAttribute("aria-disabled")==="true")return;let c=i.getAttribute("data-iso");!c||c<s||(Di(r,c),Rt(),xa())}function aa(t){let e=document.querySelector(p(a.aiCal));if(!e||!t)return;let n=t.getBoundingClientRect(),i=Math.min(340,window.innerWidth-16),o=e.offsetHeight||360,r=Math.max(8,Math.min(n.left,window.innerWidth-i-8)),s=n.bottom+6;s+o>window.innerHeight-8&&n.top-6-o>=8?s=n.top-6-o:s=Math.max(8,Math.min(s,window.innerHeight-o-8)),e.style.position="fixed",e.style.top=`${Math.round(s)}px`,e.style.left=`${Math.round(r)}px`,e.style.width=`${i}px`,e.style.right="auto",e.style.bottom="auto"}function sa(t,e){let n=document.querySelector(p(a.aiCal));n||(n=document.createElement("div"),n.id=a.aiCal,n.className=`${u.aiCal} ${u.hidden}`,n.dataset[k.mark]="",document.body.appendChild(n),l.on(n,"pointerdown",Xc,{capture:!0}),l.on(n,"click",r=>{n.contains(Gi(r))&&(r.preventDefault(),r.stopPropagation())},{capture:!0}));let i=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo))?.value,o=Vc(i)||new Date;J={y:o.getFullYear(),m0:o.getMonth(),which:t},Li(),n.classList.remove(u.hidden),aa(e),requestAnimationFrame(()=>aa(e))}function Nt(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function Ot(t){return!!(t&&t.citiesEnabled)}async function R(){let t=await G();return t?.id?String(t.id):null}async function O(t){return t&&((await C(qt))[qt]||{})[t]||null}async function zi(t,e){if(!t)return;let i=(await C(qt))[qt]||{};e==null?delete i[t]:i[t]=e,await T({[qt]:i})}var N=!1;function Ue(){return N}function fe(){N=!0,Qt(),We()}function pt(){N=!1,L=!1,Qt()}async function En(t){Ca(),fe();let e=await O(t);if(!e){nt();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await zi(t,e),nt()}var tt=!1,Gt=null,Pt=null,ca=2e4,In=new Set,Pi="",qi="";function Ca(){tt=!1,Gt&&(l.clear(Gt),Gt=null),Pt&&(l.clear(Pt),Pt=null)}function ji(){In.clear(),Pi=""}function Qc(t){let e=String(t||"").slice(0,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(e))return;let n=String(document.querySelector("#post_select")?.value||"");n!==Pi&&(In.clear(),Pi=n),In.add(e)}function qn(t){let e=String(t||"").slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(e)&&(qi=e)}function Jc(){let t=document.querySelector("#datepicker"),e=String(t?.value||"").trim();if(!e)return qi||"";if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,r]=n;return`${r}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return qi||""}async function la(){if(N||_()||!mt())return!1;let t=await it();if(!t)return!1;let e=document.querySelector("#post_select"),n=e?String(e.value):"";if(!n)return!1;let i=Jc();i&&Qc(i);let r=(await St()).find(g=>String(g.ID)===n),c=Rn(r?.Days||[],t.from,t.to).filter(g=>!In.has(String(g.Date).slice(0,10)));if(!c.length)return!1;let d=he(c.length),f=c[d];if(!f?.Date)return!1;let h=String(f.Date).slice(0,10);return qn(h),lt(),pt(),b(`Submit failed \u2014 trying next date #${d+1} (${h}) (${c.length} left in range)\u2026`),M(`Submit failed \u2014 next date ${h} (${c.length} left)\u2026`),l.send({action:"selectFirstDate",date:h,maxMs:pe,pollMs:Y}),!0}async function Ke(t){if(_()||ua()){t?await En(t):fe(),b("Booking confirmed \u2014 Tik Tik stopped.");return}tt=!0,lt(),qe(),b("Submit clicked \u2014 waiting for confirmation (Auto Submit + City Change stay ON)\u2026"),Pt&&l.clear(Pt);let e=Date.now(),n=async()=>{if(Pt=null,!(!tt||!l.alive)){if(ua()||_()){let i=t||await R();i?await En(i):fe(),b("Booking confirmed \u2014 Tik Tik stopped.");return}if(Date.now()-e>=ca){await Fe("no confirmation yet \u2014 resuming city checks");return}Pt=l.setTimeout(n,400)}};Pt=l.setTimeout(n,400),Gt&&l.clear(Gt),Gt=l.setTimeout(()=>{Gt=null,tt&&Fe("submit wait timed out \u2014 resuming city checks")},ca)}function ua(){if(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))return!0;let t=(document.body?.innerText||"").slice(0,2500);return/appointment\s+confirmation|successfully\s+scheduled|your\s+appointment\s+has\s+been/i.test(t)}async function Fe(t=""){if(!tt&&!P&&!L){if(await la())return;ct();return}Ca(),L=!1,Qt(),N&&pt();let e=t?`Submit failed (${t})`:"Submit failed";if(await la()){b(`${e} \u2014 staying on city; trying another date\u2026`);return}if(ji(),ct(),b(`${e} \u2014 no other dates in range; hopping cities\u2026`),q)Z(Date.now()),E();else{let i=await R();if(i){let o=await O(i);Ot(o)&&await Bn()}}}function Ge(){return tt}function ze(t,e,n){let i=String(t||"").slice(0,10);return!(!i||i.length<10||e&&i<e||n&&i>n)}async function it(){if(N||_()||!mt())return null;let t=await R();if(!t)return null;let e=await O(t);return!Nt(e)||!e.from||!e.to?null:{...e,accountId:t}}async function ge(){if(N||_()||!mt())return null;let t=await R();if(!t)return null;let e=await O(t);return!Ot(e)||!e.cities?.length?null:(qa(e),{...e,accountId:t})}function Rn(t,e,n){let i=new Date;return i.setHours(0,0,0,0),(t||[]).map(o=>{if(!o)return null;let r=o.Date!=null?o.Date:o.date,s=Zc(r);return s?{...o,Date:s}:null}).filter(Boolean).filter(o=>ze(o.Date,e,n)).filter(o=>{let[r,s,c]=o.Date.slice(0,10).split("-").map(Number);return new Date(r,s-1,c)>=i}).sort((o,r)=>String(o.Date).localeCompare(String(r.Date)))}function Zc(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,r,s]=n;return`${s}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime()))return`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}-${String(o.getDate()).padStart(2,"0")}`}return null}var L=!1,Tt=null,_t=null,at=!1,$t=0,q=!1,j=0,Mt=0,Ne=0,Yt=0,ye=!1,dt=null,vt=0,P=!1,K=0,de=null,zt=null,kt=0,da=!1,fa="",ma=!1,Ri=0;function tl(t){return(t||[]).map(e=>e.id).join("")}function Ta(){let t=document.querySelector(p(a.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function pa(t){let e=document.querySelector(p(a.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function Qt(){Tt&&(l.clear(Tt),Tt=null),L=!1}function Wt(){de&&(l.clear(de),de=null)}function _a(){Wt(),K||(K=Date.now());let t=Math.max(500,Be()-(Date.now()-K));de=l.setTimeout(()=>{de=null,!(!P||!q||!l.alive)&&(P=!1,K=0,Z(Date.now()),b(`City Change \u2014 booking hold timed out (${Be()/1e3}s); next city in 13\u201318s\u2026`),E())},t)}function el(){zt&&(l.clear(zt),zt=null)}function On(t=Date.now()){let e=!1;if(at&&$t&&t-$t>=zc&&(at=!1,$t=0,e=!0),P&&(K||(K=t),t-K>=Be()?(Wt(),P=!1,K=0,e=!0):de||_a()),ye){vt||(vt=t);let i=Oi()?Ct():Kt();if(t-vt>=i)et(),e=!0;else if(!dt){let o=Math.max(500,i-(t-vt));dt=l.setTimeout(()=>{if(dt=null,!q||P)return;let r=Oi(),s=r?Ct():Kt();if(Date.now()-(vt||0)<s){On();return}et(),Z(Date.now()),b(r?`City Change \u2014 still Loading after ${Ct()/1e3}s; changing city\u2026`:`City Change \u2014 calendar up but no dates after ${Kt()/1e3}s; changing city\u2026`),E()},o)}}return L&&!Tt&&(L=!1,e=!0),e}function $a(){if(zt||!q)return;let t=()=>{if(zt=null,!q||!l.alive||N)return;let e=Date.now(),n=On(e),i=!!ie(new Date(e)),o=!!_t,r=!i&&o||ye||P||L||tt,s=!r&&kt>0&&e-kt>=Ii;if(n||s||!o&&!at&&!r)s?(at=!1,$t=0,et(),!P&&!tt&&(Wt(),K=0),L&&!Tt&&(L=!1),j=e,b(i?"City Change \u2014 unstuck; hopping now\u2026":`City Change \u2014 unstuck; waiting for IST window ${ut()}\u2026`)):n?(!P&&!tt&&(j=e),b(i?"City Change \u2014 lock cleared; hopping now\u2026":`City Change \u2014 lock cleared; next IST window ${ut()}\u2026`)):b("City Change \u2014 timer lost; restarting\u2026"),kt=e,E();else if(!i&&o){let d=$e(new Date(e));b(`City Change \u2014 waiting for slot window (IST ${ut()}, next in ${hi(d)})`)}q&&(zt=l.setTimeout(t,ra))};zt=l.setTimeout(t,ra)}function We(){Qi(),el(),dl(),Wt(),at=!1,$t=0,q=!1,P=!1,K=0,j=0,Mt=0,kt=0,et()}function et(){ye=!1,vt=0,dt&&(l.clear(dt),dt=null)}function Yi(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let i=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(i))continue;let o=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let r of o)if(r&&/\bLoading\.{0,3}\b/i.test((r.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let o=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(o))continue;let r=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(r))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function Oi(){return Yi()}function ka(){ye=!0,vt=Date.now(),dt&&l.clear(dt),dt=l.setTimeout(()=>{dt=null,!(!q||P)&&(et(),Z(Date.now()),b(`City Change \u2014 still Loading after ${Ct()/1e3}s; changing city\u2026`),E())},Ct())}function Vi(t){let e=Math.max(0,Number(t)||0)*1e3;Yt=Math.max(Yt,Date.now()+e),j=Math.max(j,Yt),et(),E()}function Ma(){et()}function lt(){N||(P=!0,K||(K=Date.now()),Qi(),et(),_a(),kt=Date.now(),q&&E(),b("City Change \u2014 paused (Auto Submit booking)\u2026"))}function ct(){if(tt){b("Submit pending \u2014 staying on this city (ignoring date reload hop)\u2026");return}P&&(Wt(),P=!1,K=0,!(!q||N)&&(Z(Date.now()),b("City Change \u2014 resuming; next city in 13\u201318s\u2026"),E()))}async function Nn(){let t=await it();if(!t)return;let e=Date.now();if(e-Ri<6e4)return;Ri=e;let i=document.querySelector("#post_select")?.value;if(!i){b("Auto Submit ON \u2014 pick a city first.");return}let r=(await St()).find(c=>String(c.ID)===String(i)),s=r?.Days;if(Array.isArray(s)&&s.length){let c=Rn(s,t.from,t.to);if(c.length){lt();let d=he(c.length),f=c[d].Date;b(`Auto Submit: picking date #${d+1} (${f.slice(0,10)})\u2026`),qn(f),l.send({action:"selectFirstDate",date:f,maxMs:pe,pollMs:Y});return}b(`Auto Submit ON \u2014 no dates in your range on ${r.Name||"this city"} yet.`);return}b("Auto Submit ON \u2014 loading slots for current city\u2026"),l.send({action:"selectPost",postId:String(i)})}function Xi(){Ri=0}function Qi(){_t&&(l.clear(_t),_t=null)}function nl(t,e){return t+Math.random()*(e-t)}function il(){return nl(Fi(),Gc())}function Z(t=Date.now()){j=t+il()}function ol(t=Date.now()){let e=$e(new Date(t));if(e>0)return e;if(Yt>t)return Yt-t;if(Mt){let n=Mt+Fi()-t;if(n>0)return n}return j>t?j-t:0}function E(){if(!q)return;if(Qi(),P||ye){_t=l.setTimeout(()=>{Ei()},500);return}let t=Date.now(),e=$e(new Date(t));if(e>0){j>t&&(j=t),e>=Ii&&(kt=t),_t=l.setTimeout(()=>{Ei()},e);return}let n=0;Yt>t&&(n=Math.max(n,Yt-t)),Mt&&(n=Math.max(n,Mt+Fi()-t)),j>t&&(n=Math.max(n,j-t)),n=Math.max(0,n),n>=Ii&&(kt=Date.now()),_t=l.setTimeout(()=>{Ei()},n)}function rl(t,e){if(!t.length)return null;if(t.length===1)return Ne=0,t[0];let n=t.findIndex(o=>String(o.id)===String(e));n<0&&(n=Math.max(0,Math.min(Ne,t.length-1)));let i=(n+1)%t.length;return Ne=i,t[i]}function Wn(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function ha(t){return String(t||"").toLowerCase().replace(/\b(vac|ofc|consular|embassy|appointment)\b/g," ").replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim()}function Hn(t){let e=Wn();if(!e.length||!t?.length)return[];let n=new Map(e.map(s=>[String(s.id),s])),i=new Map;for(let s of e){let c=ha(s.name);c&&!i.has(c)&&i.set(c,s)}let o=[],r=new Set;for(let s of t){if(!s)continue;let c=n.get(String(s.id));if(!c){let d=ha(s.name);d&&(c=i.get(d)||null)}c&&(r.has(c.id)||(r.add(c.id),o.push({id:c.id,name:c.name})))}return o}function Vt(){let t=document.querySelector(p(a.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function je(){return{from:document.querySelector(p(a.aiFrom))?.value||null,to:document.querySelector(p(a.aiTo))?.value||null}}function me(t=[],{force:e=!1,selectedCities:n=null}={}){let i=document.querySelector(p(a.aiCities));if(!i)return;let o=Wn(),r=tl(o),s=document.querySelector(p(a.aiPanel)),c=s&&!s.classList.contains(u.hidden),d=Ta();if(!e&&r===fa&&i.querySelector('input[type="checkbox"]'))return;fa=r;let f=n?.length?n:(t||[]).map(y=>({id:String(y),name:""})),h=f.length?Hn(f):[],g=new Set(c&&d.length&&!e&&!f.length?d:(h.length?h.map(y=>y.id):d).map(String));if(i.replaceChildren(),!o.length){i.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let y of o){let v=document.createElement("label"),$=document.createElement("input");$.type="checkbox",$.value=y.id,$.dataset.name=y.name,$.checked=g.has(y.id),v.append($,document.createTextNode(y.name)),i.appendChild(v)}}function al(t){let e=t?.cities||[];return e.length?e.map(n=>n.name||n.id).join(", "):"\u2014"}async function At(t,e={}){let n=await O(t)||{},{from:i,to:o}=je(),r=Vt(),s=new Set(Wn().map(h=>String(h.id))),c=Array.isArray(n.cities)?n.cities:[],d;if(r.length){let h=[...r],g=new Set(r.map(y=>String(y.id)));for(let y of c)y&&(s.has(String(y.id))||g.has(String(y.id))||h.push({id:String(y.id),name:y.name||y.id}));d=Hn(h),d.length||(d=r)}else d=c;let f={...n,from:i||n.from||null,to:o||n.to||null,cities:d.length?d:n.cities||[],loginId:document.querySelector(p(a.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(p(a.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(h=>{let g=[a.aiQ1,a.aiQ2,a.aiQ3][h],y=[a.aiA1,a.aiA2,a.aiA3][h];return{q:document.querySelector(p(g))?.value?.trim()||n.security?.[h]?.q||"",a:document.querySelector(p(y))?.value?.trim()||n.security?.[h]?.a||"",set:h+1}}),...e};return typeof f.submitEnabled=="boolean"&&(f.enabled=f.submitEnabled),f.serverUpdatedAt=Date.now(),await zi(t,f),sl(f),f}var kn=null,Ni=null;function sl(t){kn&&l.clear(kn),kn=l.setTimeout(()=>{kn=null,ia(t).catch(()=>{})},400)}async function Aa(t){if(!t||Ni===t)return null;let e=await oa();if(Ni=t,!e)return null;let n=await O(t)||{},i=ea(n,e);return i?(i.loginId=n.loginId||i.loginId||"",i.loginPass=n.loginPass||"",i.security=n.security||i.security||[],typeof i.submitEnabled=="boolean"&&(i.enabled=i.submitEnabled),await zi(t,i),i):null}async function cl(t,e){if(tt||!ie()||P||L)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let i=String(t);return String(n.value)===i?!1:(ka(),b(`Switching city \u2192 ${e||t}\u2026`),ji(),l.send({action:"selectPost",postId:i}),!0)}async function ll(t,e,{alertId:n,dayCount:i}={}){if(N||_()||!mt()||tt)return!1;let o=document.querySelector("#post_select");if(!o||!t)return!1;let r=String(t),s=e||r;return String(o.value)===r?(b(`City alert \u2014 already on ${s}`+(i?` (${i} dates reported)`:"")),!0):(Wt(),et(),P=!1,K=0,L=!1,Qt(),at=!1,$t=0,j=Date.now(),Mt=0,ka(),Mt=Date.now(),ji(),b(`City alert \u2014 switching now \u2192 ${s}`+(i?` (${i} dates)`:"")+(n?` [#${n}]`:"")),l.send({action:"selectPost",postId:r}),q&&E(),!0)}var jt=null,An=!1,ga="",ya=0,ul=150;function dl(){jt&&(l.clear(jt),jt=null),An=!1}async function fl(){if(!(An||!q||N)){An=!0;try{let t=await ge();if(!t?.cities?.length)return;let e=document.querySelector("#post_select"),n=await Zr({preferredCities:t.cities,citiesEnabled:!0,currentCityId:e?String(e.value):""});if(!n?.alertId)return;if(n.alreadyThere){$n(n.alertId),b(`City alert \u2014 already on ${n.name||n.id}`+(n.dayCount?` (${n.dayCount} dates)`:""));return}let i=`${n.id}:${n.alertId}`,o=Date.now();if(i===ga&&o-ya<6e3){$n(n.alertId);return}await ll(n.id,n.name,{alertId:n.alertId,dayCount:n.dayCount})&&(ga=i,ya=o,$n(n.alertId))}catch{}finally{An=!1}}}function Da(){if(jt||!q)return;let t=()=>{jt=null,!(!q||N||!l.alive)&&fl().finally(()=>{q&&!N&&l.alive&&(jt=l.setTimeout(t,ul))})};jt=l.setTimeout(t,50)}function Ji(){da||!document.querySelector("#post_select")||(da=!0)}async function Ei(){if(!(at||!q)){at=!0,$t=Date.now(),kt=Date.now(),_t=null;try{if(N||_()||!l.alive){We();return}if(On()){j=Date.now(),b(ie()?"City Change \u2014 auto-unstuck; hopping now\u2026":`City Change \u2014 auto-unstuck; waiting IST ${ut()}\u2026`),E();return}if(P||L){let g=K?Date.now()-K:0;if(P&&g>=Be()){Wt(),P=!1,K=0,Z(Date.now()),b("City Change \u2014 hold expired; next city in 13\u201318s\u2026"),E();return}let y=Math.max(0,Be()-g);b(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(y/1e3)}s`),E();return}let t=Date.now(),e=ie(new Date(t)),n=$e(new Date(t));if(!e){b(`City Change \u2014 waiting for slot window (IST ${ut()}, next in ${hi(n)})`),E();return}if(ye){let g=vt?t-vt:0;if(Oi()){if(g>=Ct()){et(),Z(Date.now()),b(`City Change \u2014 still Loading after ${Ct()/1e3}s; changing city\u2026`),E();return}let v=Math.max(0,Math.ceil((Ct()-g)/1e3));b(`City Change \u2014 Date Loading\u2026 stay (${v}s then hop if still Loading)`),E();return}if(g>=Kt()){et(),Z(Date.now()),b(`City Change \u2014 calendar up but no dates after ${Kt()/1e3}s; changing city\u2026`),E();return}let y=Math.max(0,Math.ceil((Kt()-g)/1e3));b(`City Change \u2014 waiting calendar dates\u2026 (${y}s then hop)`),E();return}let i=ol(t);if(i>0){let g=Math.ceil(i/1e3);b(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,g)}s`),E();return}let o=await ge();if(!o?.cities?.length){We();return}let r=new Set(Wn().map(g=>g.id)),s=Hn(o.cities);if(!s.length){b("Preferred cities not found in the dropdown \u2014 pick cities again."),We();return}s.length<(o.cities?.length||0)&&b(`City Change \u2014 using ${s.length}/${o.cities.length} preferred (some ids remapped/missing in dropdown): ${s.map(g=>g.name||g.id).join(" \u2192 ")}`);let c=document.querySelector("#post_select"),d=c?String(c.value):"",f=rl(s,d);if(!f){Z(t),E();return}if(await cl(f.id,f.name)){Mt=Date.now(),Z(Mt);let g=s.map(v=>v.name||v.id).join(" \u2192 "),y=`${Ne+1}/${s.length}`;b(`City Change \u2014 ${y} ${f.name||f.id} (path: ${g}); Loading up to ${Ct()/1e3}s, no-dates hop ${Kt()/1e3}s`)}else Z(t);E()}finally{at=!1,$t=0}}}async function Bn(){if(N||_()||!mt())return;let t=await ge();if(!t?.cities?.length)return;let e=Hn(t.cities);if(!e.length){b("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}Wt(),et(),P=!1,K=0,L=!1,at=!1,$t=0,q=!0,kt=Date.now(),j=Date.now();let n=document.querySelector("#post_select"),i=n?String(n.value):"",o=e.findIndex(s=>String(s.id)===i);Ne=o>=0?o:0;let r=e.map(s=>s.name||s.id).join(" \u2192 ");b(`City Change ON \u2014 ${e.length} cities (${r}); IST ${ut()}; hop 13\u201318s`),$a(),Da(),E()}async function Ea(){if(N||_()||!Ui()||!l.alive||!(await ge())?.cities?.length||!document.querySelector("#post_select"))return;if(!q){await Bn();return}let e=On();$a(),Da(),(e||!_t&&!at)&&(e&&(Z(Date.now()),b("City Change \u2014 auto-unstuck; next city in 13\u201318s\u2026")),E())}function Zi(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function Dn(){let t=Zi();return!!(t&&!t.disabled)}function ml(t){if(!t||t.disabled)return!1;try{let e=t.form||t.closest?.("form");if(e&&typeof e.requestSubmit=="function")return e.requestSubmit(t),!0}catch{}try{return t.click(),!0}catch{}try{return t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click(),!0}catch{}return!1}function to(){let t=Zi();if(!t||t.disabled)return!1;let e=ml(t);return l.send({action:"forceClickSubmit",prefix:m,pollMs:Y,maxMs:Math.min(1500,He)}),e}function pl(){return X()?Dn():!1}function eo(t){let e=Date.now()+Math.max(0,Number(t)||0);return X()&&Dn()?Promise.resolve(!0):new Promise(n=>{let i=!1,o=null,r=null,s=d=>{if(!i){i=!0;try{r?.disconnect()}catch{}o&&l.clear(o),n(!!d)}},c=()=>{if(!l.alive||Ue()||_())return s(!1);if(X()&&Dn())return s(!0);if(Date.now()>=e)return s(X()&&Dn())};try{r=new MutationObserver(c);let d=Zi();d&&r.observe(d,{attributes:!0,attributeFilter:["disabled","class","aria-disabled"]});let f=d?.form||d?.closest?.("form")||document.querySelector("#page_form, form");f?r.observe(f,{attributes:!0,attributeFilter:["disabled","class"],childList:!0,subtree:!0}):r.observe(document.documentElement,{attributes:!0,attributeFilter:["disabled"],childList:!0,subtree:!0})}catch{r=null}o=l.setInterval(c,Y),c()})}function Ia(){b("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function no(t){if(N||_()||L)return;let e=await O(t);if(!Nt(e))return;lt(),L=!0,qe();let n=Date.now(),i=!1,o=!1,r=async d=>{if(!(i||!L||!l.alive)){if(i=!0,window.removeEventListener("message",s),Tt&&(l.clear(Tt),Tt=null),_()){L=!1;return}if(L=!1,d){await Ke(t);return}ct(),b(q?"Auto Submit \u2014 Submit not clicked in time; City Change resuming\u2026":"Auto Submit \u2014 Submit not clicked in time; still watching\u2026")}},s=d=>{!l.alive||d.source!==window||d.data?.action===Et.sub&&r(!0)};window.addEventListener("message",s);let c=async()=>{if(i||!L||!l.alive||o)return;let d=Date.now()-n;if(pl()){o=!0,b("Submit enabled \u2014 clicking\u2026"),to();return}if(d>=He)return r(!1);b("Waiting for Submit to enable\u2026"),Tt=l.setTimeout(c,Y)};eo(He).then(d=>{i||!L||!l.alive||o||d&&c()}),c()}async function La(){if(!X()||L||N)return;let t=await it();t&&await no(t.accountId)}function b(t){let e=document.querySelector(p(a.aiStatus));e&&(e.textContent=t)}function M(t){b(t)}function ba(t){return!!(t&&t.termsAgreed)}function Pa(t){return!!(t&&t.termsPassed)}function Ln(){return!!document.querySelector(p(a.aiTermsAgree))?.checked}function io(t){let e=document.querySelector(p(a.aiTermsGate)),n=document.querySelector(p(a.aiMain)),i=document.querySelector(p(a.aiTermsAgree)),o=document.querySelector(p(a.aiTermsContinue)),r=Pa(t);e&&e.classList.toggle(u.hidden,r),n&&n.classList.toggle(u.hidden,!r),i&&(i.checked=ba(t)||Ln()),o&&(o.disabled=!(ba(t)||Ln()))}function hl(){let t=document.querySelector(p(a.aiTermsContinue)),e=Ln();t&&(t.disabled=!e),b(e?"Terms checked \u2014 tap Continue.":"Check Agree to continue.")}async function gl(){if(!Ln()){b("Check Agree first.");return}let t=await R();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=await O(t)||{},{from:n,to:i}=je(),o=Vt(),r=Fn();pt(),Qt(),Xi(),rt=!0,ft=!0,await At(t,{termsAgreed:!0,termsPassed:!0,termsAgreedAt:e.termsAgreedAt||Date.now(),submitEnabled:!0,citiesEnabled:!0,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],slotWindows:r.length?r:e.slotWindows||null,confirmedAt:Date.now()}),await nt(),st(document.querySelector(p(a.aiSubmitSw)),!0),st(document.querySelector(p(a.aiCitiesSw)),!0),rt=!0,ft=!0,Un(await O(t)),me((e.cities||[]).map(c=>c.id),{force:!0,selectedCities:e.cities||[]}),oo(e),io(await O(t)),(Vt().length?Vt():e.cities||[]).length&&(Ji(),await Bn()),(n||e.from)&&(i||e.to)&&await Nn(),b("Auto Submit and City Change ON \u2014 set dates and preferred cities.")}function qa(t){t?.slotWindows?.length?ar(t.slotWindows):pi()}function yl(t){let e="";for(let n=0;n<=59;n++){let i=Number(t)===n?" selected":"";e+=`<option value="${n}"${i}>:${String(n).padStart(2,"0")}</option>`}return e}function wa(t,e){let n=Math.min(Lt,59-Number(t||0)),i="";for(let o=1;o<=Math.max(1,n);o++){let r=Number(e)===o?" selected":"";i+=`<option value="${o}"${r}>${o} min</option>`}return i}function Ra(t,e){let n=Number(t)||0,i=Number(e)||1,o=Math.min(59,n+i);return`Runs from :${String(n).padStart(2,"0")} up to :${String(o).padStart(2,"0")}`}function Fn(){let t=document.querySelector(p(a.aiWinList));if(!t)return[];let e=[];for(let n of t.querySelectorAll(`.${u.aiWinRow}`)){let i=Number(n.querySelector('select[data-win="from"]')?.value),o=Number(n.querySelector('select[data-win="dur"]')?.value);!Number.isFinite(i)||!Number.isFinite(o)||e.push({fromMin:i,durationMin:o})}return mi(e)}function Sa(t){let e=t.querySelector('select[data-win="from"]'),n=t.querySelector('select[data-win="dur"]'),i=t.querySelector(`.${u.aiWinHelp}`);!e||!n||!i||(i.textContent=Ra(e.value,n.value))}function Oa(t=0,e=6){let n=Math.min(Lt,59-t),i=Math.min(Math.max(1,e||1),Math.max(1,n)),o=document.createElement("div");o.className=u.aiWinRow,o.innerHTML=`
    <div class="${u.aiInline}">
      <label class="${u.aiHead}">Start</label>
      <select data-win="from">${yl(t)}</select>
      <label class="${u.aiHead}" style="margin-left:10px;color:#6b7280;font-weight:500">Duration</label>
      <select data-win="dur">${wa(t,i)}</select>
      <button type="button" class="${u.aiTrash}" data-win="del" title="Delete timing" aria-label="Delete">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
        </svg>
      </button>
    </div>
    <div class="${u.aiWinHelp}">${Ra(t,i)}</div>
  `;let r=o.querySelector('select[data-win="from"]'),s=o.querySelector('select[data-win="dur"]');return l.on(r,"change",()=>{let c=Number(r.value),d=Number(s.value)||1;s.innerHTML=wa(c,d),Sa(o)}),l.on(s,"change",()=>Sa(o)),l.on(o.querySelector('button[data-win="del"]'),"click",()=>{o.remove(),ro()}),o}function oo(t){let e=document.querySelector(p(a.aiWinList));if(!e)return;e.replaceChildren();let n=t?.slotWindows?.length?sr(t.slotWindows):[];for(let i of n.slice(0,xt))e.appendChild(Oa(i.fromMin,i.durationMin));ro(t)}function ro(t){let e=document.querySelector(p(a.aiWinNote));e&&(t?.slotWindows?.length||Fn().length?e.textContent=`Custom windows active (max ${xt}, each \u2264 ${Lt} min).`:e.textContent=`Using defaults: ${ut()}. Add up to ${xt} windows below.`)}function st(t,e){t&&(t.classList.toggle(u.aiOnBtn,!!e),t.setAttribute("aria-checked",e?"true":"false"))}function bl(t){st(document.querySelector(p(a.aiSubmitSw)),Nt(t)),st(document.querySelector(p(a.aiCitiesSw)),Ot(t))}var rt=!1,ft=!1;function Un(t){let e=Nt(t)||rt,n=Ot(t)||ft,i=document.querySelector(p(a.aiSubmitBody)),o=document.querySelector(p(a.aiCitiesBody));i&&i.classList.toggle(u.hidden,!e),o&&o.classList.toggle(u.hidden,!n)}function wl(t,e){let n=document.querySelector(p(a.aiStatus)),i=document.querySelector(p(a.aiBtn));if(!n||!i)return;bl(t),Un(t);let o=Nt(t),r=Ot(t),s=o||r;s?(i.classList.add(u.aiOn),i.textContent="Tik Tik ON"):(i.classList.remove(u.aiOn),i.textContent="Tik Tik");let c=[];o&&t.from&&t.to?c.push(`Auto Submit ON (${Xt(t.from)} \u2013 ${Xt(t.to)}, clicks Submit as soon as time slot is ready)`):rt&&!o?c.push("Auto Submit \u2014 set From / To dates, then Enable again"):c.push("Auto Submit OFF"),r?c.push(`City Change ON (${al(t)}, ${ut()})`):ft&&!r?c.push("City Change \u2014 pick preferred cities, then Enable again"):c.push("City Change OFF"),n.textContent=`Account ${e||"\u2014"}: ${c.join(" \xB7 ")}`,n.classList.toggle(u.aiOk,s)}async function nt(){let t=await R();if(t)try{await Aa(t)}catch{}let e=t?await O(t):null;Nt(e)||(rt=!1),Ot(e)||(ft=!1),qa(e),wl(e,t),io(e);let n=document.querySelector(p(a.aiFrom)),i=document.querySelector(p(a.aiTo));n&&(n.value=e?.from||""),i&&(i.value=e?.to||""),Ki();let o=(e?.cities||[]).map(S=>S.id),r=document.querySelector(p(a.aiPanel)),s=r&&!r.classList.contains(u.hidden),c=document.querySelector(p(a.aiCitiesBody)),d=c&&!c.classList.contains(u.hidden),f=Ta();(d||Ot(e)||ft)&&(s&&f.length?me(f):me(o,{selectedCities:e?.cities||[]})),oo(e);let h=document.querySelector(p(a.aiLogin)),g=document.querySelector(p(a.aiPass));h&&e?.loginId&&(h.value=e.loginId),g&&e?.loginPass&&(g.value=e.loginPass);let y=e?.security||[],v=[a.aiQ1,a.aiQ2,a.aiQ3],$=[a.aiA1,a.aiA2,a.aiA3];v.forEach((S,F)=>{let wt=document.querySelector(p(S));wt&&(wt.innerHTML=Mn(F,y[F]?.q||""))}),$.forEach((S,F)=>{let wt=document.querySelector(p(S));wt&&y[F]?.a&&(wt.value=y[F].a)});let A=document.querySelector(p(a.aiLoginBody)),z=A&&!A.classList.contains(u.hidden);ao(!!z,Ml(e))}function Sl(){let t=document.querySelector(p(a.aiPanel));return!!(t&&!t.classList.contains(u.hidden))}function Wi(t){let e=document.querySelector(p(a.aiPanel));e&&(t||Rt(),e.classList.toggle(u.hidden,!t),t&&R().then(async n=>{if(n)try{Ni=null,await Aa(n)}catch{}let i=n?await O(n):null;io(i),Pa(i)?me((i?.cities||[]).map(o=>o.id),{force:!0,selectedCities:i?.cities||[]}):b("Read the terms, check Agree, then Continue.")}))}function Hi(){if(Hi._done)return;Hi._done=!0;let t=e=>{if(!Sl())return;let n=document.querySelector(p(a.aiPanel)),i=document.querySelector(p(a.aiBtn)),o=document.querySelector(p(a.aiCal)),r=Gi(e);if(!(o&&!o.classList.contains(u.hidden)&&r&&o.contains(r))){if(o&&!o.classList.contains(u.hidden)){let s=document.querySelector(p(a.aiFromBtn)),c=document.querySelector(p(a.aiToBtn));!(s&&r&&(s===r||s.contains(r)))&&!(c&&r&&(c===r||c.contains(r)))&&Rt()}n&&r&&(n===r||n.contains(r))||i&&r&&(i===r||i.contains(r))||(Rt(),Wi(!1))}};l.on(document,"pointerdown",t,{capture:!0})}async function xl(t){let e=await R();if(!e){b("Open a logged-in schedule page so we can bind this to your account.");return}let n=await O(e)||{},{from:i,to:o}=je();if(i=i||n.from||null,o=o||n.to||null,t){rt=!0,st(document.querySelector(p(a.aiSubmitSw)),!0),pt(),Qt(),Xi(),await At(e,{submitEnabled:!0,from:i||null,to:o||null,confirmedAt:Date.now()});let r=document.querySelector(p(a.aiFrom)),s=document.querySelector(p(a.aiTo));if(r&&i&&(r.value=i),s&&o&&(s.value=o),Ki(),await nt(),st(document.querySelector(p(a.aiSubmitSw)),!0),rt=!0,Un(await O(e)),!i||!o){b("Auto Submit ON \u2014 select From and To dates to start booking.");return}if(i>o){b("Auto Submit ON \u2014 From date must be before To date.");return}rt=!1,b(`Auto Submit ON (${Xt(i)} \u2013 ${Xt(o)})`),await Nn();return}rt=!1,Qt(),st(document.querySelector(p(a.aiSubmitSw)),!1),await At(e,{submitEnabled:!1,from:i||n.from,to:o||n.to}),await nt(),b("Auto Submit OFF")}async function vl(t){let e=await R();if(!e){b("Open a logged-in schedule page so we can bind this to your account.");return}let n=await O(e)||{};if(t){ft=!0,st(document.querySelector(p(a.aiCitiesSw)),!0),me((n.cities||[]).map(s=>s.id),{force:!0,selectedCities:n.cities||[]}),oo(n);let o=Vt();!o.length&&n.cities?.length&&(o=n.cities);let r=Fn();if(pt(),await At(e,{citiesEnabled:!0,cities:o.length?o:n.cities||[],slotWindows:r.length?r:n.slotWindows||null}),await nt(),st(document.querySelector(p(a.aiCitiesSw)),!0),ft=!0,Un(await O(e)),o.length||me([],{force:!0}),!o.length){b("City Change ON \u2014 select at least one preferred city to start hopping.");return}ft=!1,Ji(),await Bn(),b(`City Change ON (${o.map(s=>s.name||s.id).join(", ")})`);return}ft=!1,We(),st(document.querySelector(p(a.aiCitiesSw)),!1);let i=Vt();await At(e,{citiesEnabled:!1,cities:i.length?i:n.cities||[]}),await nt(),b("City Change OFF")}async function xa(){let t=await R();if(!t)return;let e=await O(t)||{};if(!Nt(e)&&!rt)return;let{from:n,to:i}=je();!n||!i||n>i||(await At(t,{submitEnabled:!0,from:n,to:i,confirmedAt:Date.now()}),rt=!1,await nt(),st(document.querySelector(p(a.aiSubmitSw)),!0),pt(),Xi(),b(`Auto Submit ON (${Xt(n)} \u2013 ${Xt(i)})`),await Nn())}function Cl(t){return(t||[]).map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", ")}async function Tl(){let t=document.querySelector(p(a.aiWinList));if(t){if(t.querySelectorAll(`.${u.aiWinRow}`).length>=xt){b(`Max ${xt} timing windows.`);return}t.appendChild(Oa(0,Math.min(6,Lt))),ro()}}async function _l(){let t=await R();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=Fn();if(!e.length){b("Add at least one timing (or Reset to defaults).");return}await At(t,{slotWindows:e}),await nt(),b(`Saved ${e.length} custom timing(s): ${Cl(e)}`)}async function $l(){let t=await R();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}window.confirm("Reset to default IST windows? Your custom timings will be removed.")&&(await At(t,{slotWindows:null}),pi(),await nt(),b(`Using default windows: ${ut()}`))}async function kl(){let t=await R();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let{from:e,to:n}=je(),i=Vt(),o=document.querySelector(p(a.aiLogin))?.value?.trim(),r=document.querySelector(p(a.aiPass))?.value,s=[0,1,2].map(c=>({q:document.querySelector(p([a.aiQ1,a.aiQ2,a.aiQ3][c]))?.value?.trim()||"",a:document.querySelector(p([a.aiA1,a.aiA2,a.aiA3][c]))?.value?.trim()||""}));if(!o||!r){b("Enter ID and password before saving.");return}if(s.some(c=>!c.q||!c.a)){b("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}await At(t,{}),ao(!0,!0),b("Saved ID, password, and 3 security questions (1 from each set).")}function Ml(t){let e=t?.security||[];return!!(t?.loginId&&t?.loginPass&&e.length>=3&&e.every(n=>n?.q&&n?.a))}function ao(t,e){let n=document.querySelector(p(a.aiLoginToggle));if(!n)return;let i=t?"\u25BE":"\u25B8";n.textContent=e?`Login details (saved) ${i}`:`Login details ${i}`}function Al(){let t=document.querySelector(p(a.aiLoginBody)),e=document.querySelector(p(a.aiLoginToggle));if(!t||!e)return;let n=t.classList.contains(u.hidden);t.classList.toggle(u.hidden,!n);let i=/saved/i.test(e.textContent||"");ao(n,i)}function so(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==a.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==a.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===a.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function Bi(){document.querySelector(p(a.aiPanel))?.remove(),document.querySelector(p(a.aiBtn))?.remove(),so()}function Dl(){if(_())return;if(!Ui()){Bi();return}if(document.querySelector(p(a.aiBtn)))if(!document.querySelector(p(a.aiSubmitSw))||!document.querySelector(p(a.aiTermsContinue))||!document.querySelector(p(a.aiFromBtn)))Bi();else return;let t=hr();if(!t)return;let e=document.createElement("button");e.id=a.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[k.mark]="",l.on(e,"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiPanel)),r=o&&o.classList.contains(u.hidden);Wi(!!r)}),t.appendChild(e);let n=document.createElement("div");n.id=a.aiPanel,n.className=u.hidden,n.dataset[k.mark]="",n.innerHTML=`
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
  `,t.insertAdjacentElement("afterend",n),l.on(n.querySelector(p(a.aiSubmitSw)),"click",async()=>{let i=await R(),o=i?await O(i):null;await xl(!Nt(o))}),l.on(n.querySelector(p(a.aiCitiesSw)),"click",async()=>{let i=await R(),o=i?await O(i):null;await vl(!Ot(o))}),l.on(n.querySelector(p(a.aiWinAdd)),"click",Tl),l.on(n.querySelector(p(a.aiWinSave)),"click",_l),l.on(n.querySelector(p(a.aiWinReset)),"click",$l),l.on(n.querySelector(p(a.aiSaveLogin)),"click",kl),l.on(n.querySelector(p(a.aiLoginToggle)),"click",Al),l.on(n.querySelector(p(a.aiClose)),"click",()=>Wi(!1)),l.on(n.querySelector(p(a.aiCitiesAll)),"click",()=>pa(!0)),l.on(n.querySelector(p(a.aiCitiesNone)),"click",()=>pa(!1)),l.on(n.querySelector(p(a.aiTermsAgree)),"change",()=>{hl()}),l.on(n.querySelector(p(a.aiTermsContinue)),"click",()=>{gl()}),l.on(n.querySelector(p(a.aiFromBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiCal));if(o&&!o.classList.contains(u.hidden)&&J.which==="from"){Rt();return}sa("from",i.currentTarget)}),l.on(n.querySelector(p(a.aiToBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiCal));if(o&&!o.classList.contains(u.hidden)&&J.which==="to"){Rt();return}sa("to",i.currentTarget)}),Hi(),nt()}function El(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",l.on(e,"click",()=>{R().then(n=>{Ke(n||null)})}))};t(document.querySelector("#submitbtn")),l.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function co(){if(l.alive&&!_()){if(!Ui()){Bi();return}await l.waitFor("#post_select",{attempts:on})&&(jr(t=>{let e=String(t?.message||t?.source||"error").slice(0,120);Fe(e)}),Dl(),Ji(),El(),!ma&&(ma=!0,l.setTimeout(()=>nt(),800),l.setTimeout(async()=>{await it()&&await Nn()},1500)))}}var Na=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function Wa(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function Il(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=Wa(t.data.url),i=new URLSearchParams(t.data.request||"").get("parameters");if(!i)return null;let o;try{o=JSON.parse(i)}catch{return null}return{params:o,tail:e,response:t.data.response}}async function Ll(t,e={}){t?.length&&(await Lr(t,e),await x("audioAlert")&&Sr())}async function Pl(t,e=!1){if(e||_())return null;let n=new Date;n.setHours(0,0,0,0);let i=(t||[]).map(s=>{if(!s)return null;let c=Gn(s.Date);return c?{...s,Date:c}:null}).filter(Boolean).filter(s=>{let[c,d,f]=s.Date.slice(0,10).split("-").map(Number);return!c||!d||!f?!1:new Date(c,d-1,f)>=n}).sort((s,c)=>String(s.Date).localeCompare(String(c.Date))),o=await it();if(o){let s=i.filter(d=>ze(d.Date,o.from,o.to));if(!s.length)return null;let c=he(s.length);return s[c]?.Date||null}if(!await x("autoSelectFirstDate")||!i.length)return null;let r=he(i.length);return i[r]?.Date||null}function Gn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,r,s]=n;return`${s}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime())){let r=o.getFullYear(),s=String(o.getMonth()+1).padStart(2,"0"),c=String(o.getDate()).padStart(2,"0");return`${r}-${s}-${c}`}}return null}function ql(t){if(!t)return!1;let[e,n,i]=t.slice(0,10).split("-").map(Number);if(!e||!n||!i)return!1;let o=n-1,r=String(n).padStart(2,"0")+"/"+String(i).padStart(2,"0")+"/"+e,s=document.querySelector("#datepicker");if(s){let c=String(s.value||"").trim();if(c===r)return!0;if(c.includes(String(e))&&c.includes(String(i).padStart(2,"0"))){let d=c.split(/[/-]/).map(f=>parseInt(f,10));if(d.length>=3){let f,h,g;if(d[2]>31?(h=d[0],g=d[1],f=d[2]):(f=d[0],h=d[1],g=d[2]),f===e&&h===n&&g===i)return!0}}try{let d=window.jQuery||window.$;if(d&&d(s).hasClass("hasDatepicker")){let f=d(s).datepicker("getDate");if(f&&f.getFullYear()===e&&f.getMonth()===o&&f.getDate()===i)return!0}}catch{}}for(let c of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let d=c.querySelector("a");if(!d)continue;let f=parseInt(c.getAttribute("data-month"),10),h=parseInt(c.getAttribute("data-year"),10),g=parseInt(d.textContent,10);if(h===e&&f===o&&g===i)return!0}return!1}var Kn=null;function Rl(t,e){Kn&&l.clear(Kn);let n=Date.now()+(e?pe:8e3),i=()=>{!l.alive||Date.now()>n||ql(t)||(l.send({action:"selectFirstDate",date:t,maxMs:e?pe:8e3,pollMs:Y}),Kn=l.setTimeout(i,Y))};Kn=l.setTimeout(i,80)}function Ha(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Ol(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function Ba(t){return t?.length?t.map((e,n)=>({entry:e,index:n,avail:Ol(e)})).sort((e,n)=>n.avail!==e.avail?n.avail-e.avail:e.index-n.index):[]}function Nl(t){let e=Ba(t);return e.length?{entry:e[0].entry,slotIndex:e[0].index}:{entry:null,slotIndex:0}}function Fa(){Jt&&(l.clear(Jt),Jt=null)}var Ua=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),Ka=null,Wl=null,Jt=null;function Hl(t,e){Ka=t,Wl=e?String(e).slice(0,10):null}function Bl(t,e=0){Jt&&l.clear(Jt);let n=t?String(t).slice(0,10):null,i=0,o=async()=>{if(!l.alive||Ue()||++i>240||X())return;let r=(Ka||[]).filter(s=>s&&s.Time);if(r.length){let{entry:s,slotIndex:c}=Nl(r);if(M(`Watchdog: picking time slot #${c+1}\u2026`),await Le({time:Ha(s.Time),date:s.Date?String(s.Date).slice(0,10):n,slotIndex:c,pollMs:Y,maxMs:600,prefix:m}),X())return}else if(document.querySelector(Ua)&&(M("Watchdog: picking visible time slot\u2026"),await Le({time:"00:00",date:n,slotIndex:e,pollMs:Y,maxMs:600,prefix:m}),X()))return;Jt=l.setTimeout(o,Y)};Jt=l.setTimeout(o,300)}var Fl=["#datepicker.hasDatepicker","#datepicker"].join(", ");async function Ul(t,e=!1){if(e)return null;let n=await Pl(t,e);if(!n)return null;let i=await it(),o=new Date;o.setHours(0,0,0,0);let r=(t||[]).map(d=>Gn(d?.Date)).filter(Boolean).filter(d=>{let[f,h,g]=d.slice(0,10).split("-").map(Number);return new Date(f,h-1,g)>=o}).sort((d,f)=>d.localeCompare(f)),s=i?r.filter(d=>ze(d,i.from,i.to)):r,c=he(s.length);return M(`Selecting date #${c+1}: ${n} (fast)\u2026`),qn(n),await l.waitFor(Fl,{attempts:80,interval:Y}),l.send({action:"selectFirstDate",date:n,maxMs:i?pe:8e3,pollMs:Y}),Rl(n,i),Bl(n,Pn),n}async function Kl(t,e=!1){if(e||_()||Ue())return;let n=await it();if(!n&&!await x("autoSelectFirstDate"))return;Fa();let i=(t||[]).filter(c=>!(!c||!c.Time||c.EntriesAvailable!=null&&Number(c.EntriesAvailable)<=0));n&&(i=i.filter(c=>{let d=c.Date?String(c.Date).slice(0,10):null;return d?d>=n.from&&d<=n.to:!0}));let o=Ba(i);if(!o.length)return;let r=Date.now()+1e4;for(;Date.now()<r&&l.alive&&!(Fr(i)||document.querySelector(Ua));)await new Promise(c=>l.setTimeout(c,Y));let s=o.length===1?He:va;M(o.length===1?`1 time slot \u2014 try highest avail, wait \u2264${s/1e3}s for Submit\u2026`:`${o.length} time slots \u2014 try highest\u21922nd\u21923rd\u2026 (${s/1e3}s each for Submit)`);for(let c=0;c<o.length;c++){if(!l.alive||Ue()||_())return;let{entry:d,index:f,avail:h}=o[c],g=Ha(d.Time),y=d.Date?String(d.Date).slice(0,10):null,v=c===0?"highest":c===1?"2nd-highest":c===2?"3rd-highest":`${c+1}th-highest`;if(M(`Trying ${v} avail (${h}) @ ${g} \u2014 slot ${c+1}/${o.length}\u2026`),!await Le({time:g,date:y,slotIndex:f,pollMs:Y,maxMs:4e3,prefix:m})&&!X()){M(`Could not click ${g} \u2014 trying next\u2026`);continue}if(M(`Selected ${g} (${v}) \u2014 waiting \u2264${s/1e3}s for Submit to enable\u2026`),await eo(s)){M(`Submit enabled on ${g} \u2014 clicking\u2026`),n?await no(n.accountId):to();return}c<o.length-1&&M(`Submit still disabled on ${g} \u2014 trying next (${c+2}/${o.length})\u2026`)}M(`Tried all ${o.length} time slot(s); Submit never enabled.`),n&&ct()}async function Ga(t){if(!U()||_())return;let e;try{e=Il(t)}catch{return}if(e==null)return;if(Yr(e),e.retryAfter!==void 0){let r=Number(e.retryAfter);Jo(e.cgiBlock,r),r?(pn(r),Vi(r)):x("defaultWaitTime").then(s=>{pn(s),Vi(s)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let r=e.response.Posts||[],s=new Map((await St()).map(c=>[c.ID,c]));for(let c of r)s.set(c.ID,{...s.get(c.ID),...c});await ee([...s.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let r=e.response.Members||[];if(r.length){let s=await G()||{},c=s.name&&r.find(d=>d.FullName===s.name);s.visa=(c||r[0]).VisaClassName,await T({profile:s,members:r})}}if(Na.includes(e.tail)){pt(),Tr(e);let r=(e.response.ScheduleDays||[]).map(g=>Gn(g?.Date)).filter(Boolean).length;r&&M(`${r} date${r===1?"":"s"} available \u2014 see list below`),r>0&&!e.response.HasError&&lt(),Ma();let s=await it();await ge()||x("defaultWaitTime").then(g=>{pn(g)});let d=await St(),f=d.find(g=>g.ID===e.params.postId);if(f&&(f.Days=e.response.ScheduleDays,f.Updated=Date.now(),f.HasError=e.response.HasError,f.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,ee(d)),await Ll(e.response.ScheduleDays,{postId:e.params.postId,postName:f?.Name,hasError:e.response.HasError}),!e.response.HasError&&r>0){let g=String(e.params.postId||"");M(`${r} date${r===1?"":"s"} \u2014 alerting others with this city\u2026`),Jr({postId:g,postName:f?.Name,dayCount:r}).catch(()=>{})}if(await Pr(e.response.ScheduleDays,{postId:e.params.postId,postName:f?.Name,hasError:e.response.HasError}),Ge())lt(),M("Submit pending \u2014 staying on this city (date reload ignored)\u2026");else if(s&&!e.response.HasError){let g=Rn(e.response.ScheduleDays,s.from,s.to);g.length?(lt(),M(`${g.length} date${g.length===1?"":"s"} in range \u2014 selecting (city hold)\u2026`)):ct()}else s?ct():r>0&&!e.response.HasError&&(await x("autoSelectFirstDate")||ct());let h=Ge()?null:await Ul(e.response.ScheduleDays,e.response.HasError);if(h)lt(),await qr(f?.Name,h);else if(s&&!e.response.HasError&&!Ge()){let g=(e.response.ScheduleDays||[]).map(v=>Gn(v?.Date)).filter(Boolean),y=g.filter(v=>ze(v,s.from,s.to));g.length&&!y.length?(ct(),M(`Dates found but none in ${s.from} \u2192 ${s.to}. Next city in 13\u201318s\u2026`)):g.length||(ct(),M("No dates on this city \u2014 next city in 13\u201318s\u2026"))}await li()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let r=e.params.Date.split("T")[0];Hl(e.response.ScheduleEntries,r),Fa();let s=await St(),c=s.filter(f=>f.Days&&f.Updated).sort((f,h)=>h.Updated-f.Updated).find(f=>f.Days.some(h=>h.Date===r));if(c){let f=c.Days.find(h=>h.Date===r);f&&(f.Times=e.response.ScheduleEntries,ee(s))}let d=(e.response.ScheduleEntries||[]).filter(f=>f&&f.Time);if(_r(d,r,c?.Name),d.length){let f=d.filter(y=>y.EntriesAvailable==null||Number(y.EntriesAvailable)>0),h=f.reduce((y,v)=>{let $=Number(v.EntriesAvailable);return y+(Number.isFinite($)?$:0)},0),g=h>0?` \xB7 ${h} available`:"";M(`${f.length||d.length} time slot${(f.length||d.length)===1?"":"s"} on ${r}${g}`)}await Kl(e.response.ScheduleEntries,e.response.HasError),Ge()?(lt(),M("Submit pending \u2014 staying on this city (time reload ignored)\u2026")):d.length?(lt(),await Rr(c?.Name,e.params.Date,d.length)):(ct(),M("No time slots on this date \u2014 next city in 13\u201318s\u2026")),await li()}}function za(t){if(!U()||_())return;let e=Wa(t.data.url);Na.includes(e)&&yr()}var Zt=null,uo="",lo={scanning:"Scanning for Cloudflare challenge\u2026",dom:"Trying page-level verify click\u2026",debugger:"Advanced click \u2014 targeting Turnstile iframe\u2026",retry:"Waiting before next attempt\u2026",success:"Verification passed \u2014 continuing\u2026",manual:"Stuck? Click the checkbox once, then we\u2019ll continue."};function ja(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=u.cfFlash,n.dataset[k.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),l.setTimeout(()=>n.remove(),1200)}}function Gl(){let t=document.querySelector(p(a.cfHud));return t||(t=document.createElement("div"),t.id=a.cfHud,t.dataset[k.mark]="",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.innerHTML=`
    <div class="${u.cfHud}">
      <div class="${u.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">\u{1F6E1}</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${lo.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `,document.documentElement.appendChild(t),t)}async function W(t,e){if(!chrome.runtime?.id||!l.alive||!await x("autoCloudflareTick"))return;let n=Gl(),i=n.querySelector("[data-cf-msg]"),o=n.querySelector("[data-cf-sub]"),r=n.querySelector("[data-cf-chip]"),s=n.querySelector(`.${u.cfHud}`);uo=t,i&&(i.textContent=lo[t]||lo.scanning),o&&(o.textContent=e||zl(t)),r&&(r.textContent=t==="success"?"Done":t==="manual"?"Help":"Active",r.dataset.state=t),s&&(s.dataset.state=t),Zt&&(l.clear(Zt),Zt=null),t==="success"&&(Zt=l.setTimeout(()=>fo(),2800))}function zl(t){return t==="debugger"?"Precision click via advanced browser bridge":t==="dom"?"Standard page interaction":t==="manual"?"One manual click is usually enough":t==="success"?"Resuming login and recovery":"Monitoring this tab for Turnstile"}function fo(){let t=document.querySelector(p(a.cfHud));t&&t.remove(),uo="",Zt&&(l.clear(Zt),Zt=null)}function mo(){return uo}var jl=/we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i,Yl=/\bUSG\s+[a-f0-9-]{8,}/i;var ho="vsPortalErrorReloadCount",Xa="vsPortalErrorReloadAt",Vl=2e3,Xl=1e4,Ya=!1,be=null,Ql=null;function Jl(){return(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim()}function we(){let t=Jl().slice(0,6e3);return t?!!(/a timeout occurred/i.test(t)&&(/error\s*524/i.test(t)||/origin web server timed out/i.test(t)||/cloudflare ray id/i.test(t))||/error\s*524/i.test(t)&&/cloudflare/i.test(t)&&t.length<8e3||jl.test(t)&&(Yl.test(t)||/error id\s*#/i.test(t))||/we'?re sorry,\s*but something went wrong/i.test(t)&&t.length<2500):!1}function Qa(){try{return Math.max(0,Number(sessionStorage.getItem(ho)||0))}catch{return 0}}function Zl(){try{let t=Qa()+1;return sessionStorage.setItem(ho,String(t)),sessionStorage.setItem(Xa,String(Date.now())),t}catch{return 1}}function po(){try{sessionStorage.removeItem(ho),sessionStorage.removeItem(Xa)}catch{}}function tu(t){return Math.min(Xl,Vl+Math.max(0,t-1)*1e3)}function eu(){be&&(l.clear(be),be=null)}function nu(){Zl();try{location.reload()}catch{}}function Va(){if(!l.alive||be)return;if(!we()){po();return}let t=Qa()+1,e=tu(t);be=l.setTimeout(()=>{if(be=null,!!l.alive){if(!we()){po();return}nu()}},e)}function Ja(){if(Ya)return;Ya=!0;let t=()=>{l.alive&&(we()?Va():(po(),eu()))};t(),Ql=l.setInterval(t,1500);try{let e=new MutationObserver(()=>{l.alive&&we()&&Va()});e.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),l.disposable(()=>e.disconnect())}catch{}}var zn="vsDebugLogs",iu=200;function ou(){try{return new Date().toLocaleTimeString("en-IN",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})}catch{return new Date().toISOString().slice(11,19)}}async function H(t,e,n){let i={at:Date.now(),t:ou(),tag:String(t||"app").slice(0,24),msg:String(e||"").slice(0,400)};if(n!=null)try{i.data=JSON.parse(JSON.stringify(n))}catch{i.data=String(n).slice(0,200)}try{console.log(`[VS6 ${i.tag}] ${i.msg}`,n!==void 0?n:"")}catch{}try{let o=await C({[zn]:[]}),r=Array.isArray(o[zn])?o[zn].slice():[];for(r.push(i);r.length>iu;)r.shift();await T({[zn]:r})}catch{}}var Yn=null,Ve=0,Ye=null,Dt=0,Za=0,ru=25e3;async function au(){try{let e=(await C("humanClickProfile")).humanClickProfile,n=e?.liveTrained&&e.samples?.length||0;return n<5?15e3:n<20?1e4:n<50?6e3:3500}catch{return 12e3}}var yo=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function Q(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!B()&&!mo()}function B(){if(we()||document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return yo.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:go().length>0}function jn(t){return new Promise(e=>setTimeout(e,t))}function su(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let i of n.querySelectorAll("*"))i.shadowRoot&&(t.push(i.shadowRoot),e.push(i.shadowRoot))}return t}function go(){let t=[],e=new Set,n=i=>{if(!i||e.has(i))return;let o=i.getBoundingClientRect();if(o.width<40||o.height<20||o.width>900||o.height>400)return;let r=(i.src||i.getAttribute?.("src")||"").toLowerCase(),s=(i.title||i.getAttribute?.("title")||"").toLowerCase(),c=(i.className?.toString?.()||"").toLowerCase(),d=(i.id||"").toLowerCase(),f=i.tagName==="IFRAME"&&(r.includes("challenges.cloudflare")||r.includes("turnstile")||s.includes("cloudflare")||s.includes("security challenge")),h=c.includes("cf-turnstile")||c.includes("turnstile")||d.includes("turnstile")||d.includes("challenge")||i.hasAttribute?.("data-sitekey")||i.hasAttribute?.("data-turnstile-widget");if(!f&&!h)if(i.tagName==="IFRAME"&&o.width>=120&&o.width<=420&&o.height>=45&&o.height<=120){if(!yo.test(document.body?.innerText||""))return}else return;e.add(i),t.push({el:i,rect:o})};for(let i of su()){for(let o of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let r of i.querySelectorAll(o))n(r);for(let o of i.querySelectorAll("iframe"))n(o)}return t}function cu(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function lu(t){let e=[],n=new Set,i=(o,r)=>{if(!Number.isFinite(o)||!Number.isFinite(r)||o<1||r<1||o>window.innerWidth-1||r>window.innerHeight-1)return;let s=`${Math.round(o)},${Math.round(r)}`;n.has(s)||(n.add(s),e.push({x:Math.round(o),y:Math.round(r)}))};for(let{rect:o}of t){let r=o.top+o.height/2,s=o.left+Math.min(28,Math.max(18,o.width*.11));for(let c of[0,-4,4,-8,8,12,16,20,24,28,32])for(let d of[0,-3,3,-6,6])i(s+c,r+d);i(o.left+o.width*.5,r)}return e}function uu(t){for(let{el:e,rect:n}of t)try{e.click();let i=n.left+Math.min(26,n.width*.12),o=n.top+n.height/2,r=document.elementFromPoint(i,o)||e;for(let s of["pointerdown","mousedown","mouseup","pointerup","click"])r.dispatchEvent(new MouseEvent(s,{bubbles:!0,cancelable:!0,clientX:i,clientY:o,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let i=n.getBoundingClientRect();if(i.width<4&&i.height<4)continue;let o=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!o.includes("human")&&!o.includes("verify")&&e==="input[type='checkbox']"){let r=n.closest("label, div, form");if(!yo.test(r?.textContent||""))continue}return n.click(),!0}return!1}async function ts(t){t.length&&(ja(t.slice(0,3)),l.send({action:"viewportClickPoints",points:t}),await x("cloudflareDebuggerClick")?(await W("debugger","Trained click on Verify you are human\u2026"),l.send({action:"cloudflareDebuggerClick",points:t,primaryOnly:!0})):await W("dom"))}function es(){return/\/(schedule|ofc-schedule|c-schedule)\b/i.test(location.pathname||"")}function ns(){if(!es()||!B()||Q())return;let t=Date.now();if(!(t-Za<ru)){Za=t,H("cf","verify-human on schedule \u2014 focusing Application Home for manual click"),W("manual","Verify you are human \u2014 opening Home tab so you can click it there\u2026").catch(()=>{});try{l.send({action:"focusHomeForVerify",ofcUrl:location.href})}catch{}}}async function Vn(){if(!await x("autoCloudflareTick"))return!1;if(Q())return Dt&&H("cf","challenge already solved"),Dt=0,await W("success"),!0;ns(),Dt||(Dt=Date.now(),H("cf","challenge seen \u2014 train window started"));let t=await au();if(Date.now()-Dt<t)return await W("scanning",es()?"Opening Home \u2014 click Verify you are human on the Home tab\u2026":"Train window \u2014 click Verify you are human yourself (recording your mouse)\u2026"),!1;H("cf","train window done \u2014 attempting auto click"),await W("scanning","Verify you are human page \u2014 preparing click\u2026");let e=go();cu(e),await jn(350),e=go();let n=lu(e);return n.length&&(await ts(n),await jn(1200),Q()||!B())?(Dt=0,await W("success"),!0):(await W("dom"),uu(e),await jn(600),Q()||!B()?(Dt=0,await W("success"),!0):n.length&&(await ts(n),await jn(1e3),Q()||!B())?(Dt=0,await W("success"),!0):(Ve++,Ve>=8?await W("manual","Click the checkbox once \u2014 we will continue after."):await W("retry",`Retry ${Ve}/8\u2026`),!1))}function du(){Ye||(Ye=new MutationObserver(()=>{l.alive&&B()&&!Q()&&(ns(),Vn())}),Ye.observe(document.documentElement,{childList:!0,subtree:!0}),l.disposable(()=>{Ye?.disconnect(),Ye=null}))}function bo(){Yn&&(l.clear(Yn),Yn=null),Ve=0,Dt=0,fo()}async function wo(){if(bo(),!await x("autoCloudflareTick"))return;du();let t=async()=>{if(l.alive&&await x("autoCloudflareTick")){if(B()&&!Q()){await Vn();return}mo()&&(Ve=0,await W("success"))}};t(),Yn=l.setInterval(t,1800)}var Se="sessionRecovery",So="homeKeepaliveAt",xo="homeLoadingStuckAt",To="vsResubmitContinue",is=2e3,Qn=!1,os=null,vo=null,Co=null,Xn=null,Xe=0;function ko(){try{let t=new URL(location.href);return t.searchParams.set("_vsr",String(Date.now()%1e12)),location.replace(t.pathname+t.search+t.hash),!0}catch{try{return location.href=location.pathname+location.search,!0}catch{return!1}}}function ls(){try{if(sessionStorage.getItem(To)!=="1")return!1;sessionStorage.removeItem(To)}catch{return!1}return gt()||document.querySelector("#post_select")?!1:(ko(),!0)}function rs(){return w.homeKeepaliveMinMs}function fu(){return w.homeKeepaliveMaxMs}function mu(){return w.homeKeepaliveDebounceMs}function as(){return w.loadingStuckMs}function pu(){return w.loadingStuckDebounceMs}function ss(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function hu(t,e){let n=ss(t);if(!n)return"";let i="",o=0;for(let r of e||[]){let s=ss(r.q);if(!s||!r.a)continue;if(n.includes(s)||s.includes(n))return r.a;let c=s.split(" ").filter(h=>h.length>3),d=0;for(let h of c)n.includes(h)&&d++;let f=c.length?d/c.length:0;f>o&&f>=.5&&(o=f,i=r.a)}return i}async function gu(){let t=await C([qt,"profile"]),e=t[qt]||{},n=t.profile?.id?String(t.profile.id):null,i=n?e[n]:null;return i||(i=Object.values(e).find(o=>o?.loginId&&o?.loginPass)||null),i||{}}function cs(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,i=Object.getOwnPropertyDescriptor(n,"value")?.set;i?i.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function Ht(t){return new Promise(e=>setTimeout(e,t))}function ht(t,e){return t+Math.random()*(e-t)}async function _o(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await Ht(ht(250,600)),cs(t,"");let i="";for(let o=0;o<n.length;o++){let r=n[o];i+=r,cs(t,i),t.dispatchEvent(new KeyboardEvent("keydown",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:r,bubbles:!0}));let s=ht(90,220);/[\s@._]/.test(r)&&(s+=ht(120,320)),Math.random()<.08&&(s+=ht(200,450)),await Ht(s)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await Ht(ht(200,500))}var Jn=!1,Zn=!1;function ti(t){return!t||t.disabled?!1:(t.click(),!0)}function yu(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let i of t){let o=(i.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(o))continue;let r=i.querySelector("input[type='checkbox']")||document.getElementById(i.getAttribute("for")||"");r&&!r.checked&&(ti(r),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(i=>/^(continue|ok|accept|agree)$/i.test((i.textContent||i.value||"").trim()));return e&&n&&ti(n),e>0}function us(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function bu(t){if(Jn)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;Jn=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await _o(e,t.loginId),await Ht(ht(400,900))),n&&t.loginPass&&!n.value&&(await _o(n,t.loginPass),await Ht(ht(500,1100)));let i=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(o=>/sign in|log in|continue/i.test(o.textContent||o.value||""));return i&&(n?.value||t.loginPass)?(await Ht(ht(600,1400)),ti(i),!0):!!(e||n)}finally{Jn=!1}}async function wu(t){if(Zn)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let o of n){let r=(o.textContent||"").trim();if(r.length<12||r.length>220||!/\?/.test(r)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(r))continue;let s=o.querySelector("input[type='text']")||document.getElementById(o.getAttribute("for")||"")||o.parentElement?.querySelector("input[type='text']");s&&s.offsetParent!==null&&e.push({text:r,input:s})}for(let o of["kba1_response","kba2_response","kba3_response"]){let r=document.getElementById(o);if(!r)continue;let c=(r.closest(".form-group, .entry, li, div")||r.parentElement)?.textContent||"";e.some(d=>d.input===r)||e.push({text:c,input:r})}let i=[];for(let{text:o,input:r}of e){if(r.value)continue;let s=hu(o,t.security);s&&i.push({input:r,ans:s})}if(!i.length)return!1;Zn=!0;try{for(let{input:r,ans:s}of i)await _o(r,s),await Ht(ht(350,800));await Ht(ht(600,1400));let o=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(r=>/continue|submit|verify/i.test(r.textContent||r.value||""));return o&&ti(o),!0}finally{Zn=!1}}function ds(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||B()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function gt(){return mt()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function Su(t=""){return/\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(t||""))}function $o(){if(gt()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||B()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}function xu(t){return!!(t?.loginId&&t?.loginPass)}function vu(){return ds()?!1:!!(us()||document.querySelector("#kba1_response, #kba2_response, #kba3_response")||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))}async function Cu(){let t=(await C(Se))[Se],e=!!t?.active,n=await gu();if(B()){await Vn();return}if(yu(),ds()){e&&(await T({[Se]:{...t,active:!1,doneAt:Date.now()}}),l.send({action:"recoveryReturnToOfc"}));return}vu()&&xu(n)&&await x("autofillLogin")&&(await wu(n)||(us()||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))&&await bu(n))}function fs(){if(!$o()||os)return;let t=async()=>{l.alive&&await Cu()};t(),os=l.setInterval(t,1200)}function ms(){return rs()+Math.random()*(fu()-rs())}async function ps(){try{let t=await C(So),e=Number(t[So])||0;return Date.now()-e<mu()?!1:(await T({[So]:Date.now()}),!0)}catch{return!0}}function hs(){if(gt()||!$o()||document.querySelector("#post_select")||vo)return;let t=()=>{l.alive&&(vo=l.setTimeout(async()=>{if(vo=null,!l.alive||gt()||Su(location.href)||document.querySelector("#post_select")||!$o())return;if(Jn||Zn||Qn){t();return}if((await C(Se))[Se]?.active){t();return}if(!await ps()){t();return}try{ko()}catch{t()}},ms()))};t()}function gs(){if(!gt()||Co)return;let t=()=>{l.alive&&(Co=l.setTimeout(async()=>{if(Co=null,!(!l.alive||!gt())){if(await ps())try{l.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}t()}},ms()))};t()}async function Tu(){try{let t=await C(xo),e=Number(t[xo])||0;return Date.now()-e<pu()?!1:(await T({[xo]:Date.now()}),!0)}catch{return!0}}function ys(){if(!gt()||Xn)return;let t=async()=>{if(Xn=null,!(!l.alive||!gt())){try{if(Yi()){if(Xe||(Xe=Date.now()),Date.now()-Xe>=as()){if(await Tu()){try{M(`Date Loading stuck \u2265${as()/1e3}s \u2014 reloading Application Home\u2026`)}catch{}try{l.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}}Xe=Date.now()}}else Xe=0}catch{}l.alive&&gt()&&(Xn=l.setTimeout(t,is))}};Xn=l.setTimeout(t,is)}async function bs(t){let e=String(t||"");if(/form resubmission|information that you entered|action that you took to be repeated|returning to that page might cause/i.test(e)){if(!gt()&&!document.querySelector("#post_select")){try{sessionStorage.setItem(To,"1")}catch{}l.setTimeout(()=>ko(),300)}return}if(!/PSE0501|unable to load appointment available days/i.test(e)||Qn)return;Qn=!0,l.setTimeout(()=>{Qn=!1},8e3);let n=await R();await T({[Se]:{active:!0,ofcUrl:location.href,accountId:n,startedAt:Date.now()}}),l.send({action:"recoveryStart",ofcUrl:location.href})}var ni="humanClickProfile",Ao=150,Io=120,_u=250,ws=!1,bt=[],ei=0,ot=0,Bt=0,I=null,Do=0,Je=!1,xe=null,ii=0,ri=0,Ze=[],yt=!1,te=!1;function $u(){let t=[];for(let e of document.querySelectorAll('iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]')){let n=e.getBoundingClientRect();n.width<40||n.height<20||n.width>900||n.height>400||t.push(n)}if(!t.length&&B())for(let e of document.querySelectorAll("iframe")){let n=e.getBoundingClientRect();n.width>=120&&n.width<=420&&n.height>=45&&n.height<=120&&t.push(n)}return t}function tn(){let t=$u();if(!t.length)return null;let e=t[0];return{x:e.left+Math.min(28,Math.max(18,e.width*.11)),y:e.top+e.height/2,w:e.width,h:e.height,left:e.left,top:e.top}}function ve(t,e,n){return n?t>=n.left-40&&t<=n.left+n.w+40&&e>=n.top-30&&e<=n.top+n.h+30:!1}function Cs(t){let e=performance.now();ei||(ei=e);let n=I,i=n?(t.clientX-n.x)/Math.max(24,n.w*.12):0,o=n?(t.clientY-n.y)/Math.max(20,n.h*.5):0;bt.push({nx:Math.round(i*1e3)/1e3,ny:Math.round(o*1e3)/1e3,x:Math.round(t.clientX),y:Math.round(t.clientY),t:Math.round(e-ei)}),bt.length>Io&&bt.shift()}async function ai(){return(await C(ni))[ni]||{version:2,maxSamples:Ao,samples:[],avgHoverMs:420,avgPressMs:70,avgApproachMs:800,liveTrained:!1}}function Mo(t,e,n){if(!t.length)return n;let i=t.reduce((o,r)=>o+(Number(r[e])||0),0);return Math.round(i/t.length)}async function Ts(t,{force:e=!1}={}){let n=Date.now();if(!e&&n-Do<_u)return null;Do=n;let i=await ai(),o=Array.isArray(i.samples)?i.samples.slice():[];for(t.clientId||(t.clientId=`hc-${t.at||n}-${Math.random().toString(36).slice(2,10)}`),t.uploaded=!1,o.push(t);o.length>Ao;)o.shift();let r={version:2,maxSamples:Ao,samples:o,avgHoverMs:Mo(o,"hoverMs",420),avgPressMs:Mo(o,"pressMs",70),avgApproachMs:Mo(o,"approachMs",800),updatedAt:n,liveTrained:!0,source:"visa-page-live"};return await T({[ni]:r}),ii=o.length,H("human",`saved sample locally #${o.length}`,{capture:t.capture||"page",pressMs:t.pressMs,hoverMs:t.hoverMs,pathPts:Array.isArray(t.path)?t.path.length:0,clientId:t.clientId}),_s(t,r).catch(()=>{}),$s().catch(()=>{}),r}async function ku(t){if(!t)return;let e=await ai(),n=Array.isArray(e.samples)?e.samples.slice():[],i=!1;for(let o of n)o?.clientId===t&&!o.uploaded&&(o.uploaded=!0,i=!0);i&&await T({[ni]:{...e,samples:n,updatedAt:Date.now()}})}async function _s(t,e){try{if(!await x("serverSync"))return H("upload","skipped \u2014 serverSync is OFF"),!1;let n=await G()||{},i=t.clientId||`hc-${t.at||Date.now()}-${Math.random().toString(36).slice(2,8)}`;t.clientId=i;let o={client_id:i,profile:{id:n.id||"",email:n.email||"",name:n.name||"",visa:n.visa||""},sample:t,profile_meta:{sampleCount:e?.samples?.length||0,avgHoverMs:e?.avgHoverMs,avgPressMs:e?.avgPressMs,avgApproachMs:e?.avgApproachMs,liveTrained:!0,source:"visa-page-live",extensionHost:location.host}};H("upload",`sending sample ${i}`,{sampleCount:e?.samples?.length||0,email:n.email||""}),l.send({action:"uploadHumanClickSample",payload:o});try{chrome.runtime.sendMessage({action:"uploadHumanClickSample",payload:o},r=>{if(chrome.runtime.lastError){H("upload",`SW error: ${chrome.runtime.lastError.message}`);return}r?.success?(H("upload",`server OK id=${r.id??"?"} status=${r.status??""}`,{clientId:i}),ku(i)):H("upload",`server FAIL ${r?.error||r?.status||"unknown"}`,{clientId:i})})}catch(r){H("upload",`sendMessage threw: ${r?.message||r}`)}return!0}catch(n){return H("upload",`upload threw: ${n?.message||n}`),!1}}async function $s(){try{if(!await x("serverSync"))return;let t=await ai(),n=(Array.isArray(t.samples)?t.samples:[]).filter(i=>i&&i.uploaded!==!0).slice(-40);for(let i of n)await _s(i,t),await new Promise(o=>setTimeout(o,80))}catch{}}function ks(t,e={}){let n=performance.now(),i=Math.max(25,Math.min(500,ot?n-ot:70)),o=Math.max(30,Math.min(3e3,ot?ot-(Bt||ot):200)),r=(bt.length?bt:Ze).slice(-Io),s=r.length?r[r.length-1].t:o,c=Math.max(o,Math.min(12e3,s||o)),d=xe,f=I||tn();return{hoverMs:Math.round(o),pressMs:Math.round(i),approachMs:Math.round(c),path:r,down:d?{x:Math.round(d.x),y:Math.round(d.y)}:null,up:t?{x:Math.round(t.clientX),y:Math.round(t.clientY)}:d?{x:Math.round(d.x),y:Math.round(d.y)}:f?{x:Math.round(f.x),y:Math.round(f.y)}:null,target:f?{x:Math.round(f.x),y:Math.round(f.y),w:Math.round(f.w),h:Math.round(f.h),left:Math.round(f.left),top:Math.round(f.top)}:null,viewport:{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio||1,scrollX:Math.round(window.scrollX||0),scrollY:Math.round(window.scrollY||0)},pointerType:t?.pointerType||"mouse",url:location.pathname+location.search,at:Date.now(),...e}}function Qe(){bt.length&&(Ze=bt.slice(-Io)),bt=[],ei=0,ot=0,Bt=0,xe=null}function Lo(){Je||(Je=!0,te=!0,Qe(),I=tn())}function Eo(){Je=!1,I=null,yt=!1,Qe()}function oi(t){let e=t?.target;if(!e)return!1;if(e.closest?.(".cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]"))return!0;if(e.tagName==="IFRAME"){let n=(e.src||"").toLowerCase();if(n.includes("challenges.cloudflare")||n.includes("turnstile"))return!0;let i=e.getBoundingClientRect();if(i.width>=120&&i.width<=420&&i.height>=45&&i.height<=120)return!0}return!1}async function Ss(t){if(l.alive){if(!B()||Q()){Je&&Eo();return}Lo(),I||(I=tn()),!Bt&&I&&ve(t.clientX,t.clientY,I)&&(Bt=performance.now()),I&&ve(t.clientX,t.clientY,I)&&(ri=Date.now()),Cs(t)}}async function xs(t){if(!(!l.alive||t.button!==0)&&!(!B()||Q())){Lo(),I=tn(),ot=performance.now(),Bt||(Bt=ot),xe={x:t.clientX,y:t.clientY},Cs(t),(oi(t)||I&&ve(t.clientX,t.clientY,I))&&(yt=!0,ri=Date.now()),H("human","pointer down during challenge",{onWidget:oi(t),near:!!(!I||ve(t.clientX,t.clientY,I)),x:Math.round(t.clientX),y:Math.round(t.clientY)});try{W("scanning",`Recording click\u2026 (saved ${ii} so far)`)}catch{}}}async function vs(t){if(!l.alive||t.button!==0||!ot&&!yt)return;if(!B()&&!Q()){Qe();return}if(!(I&&ve(t.clientX,t.clientY,I)||I&&xe&&ve(xe.x,xe.y,I)||oi(t)||yt||!I&&(bt.length>=2||Ze.length>=2))&&bt.length<2&&Ze.length<2){Qe();return}let n=ks(t,{capture:yt||oi(t)?"iframe-or-widget":"page"});yt=!1,Qe();let i=await Ts(n);if(!i)return;let o=i.samples?.length||0;try{W("success",`Saved verify-human click #${o} \u2014 uploaded to server`)}catch{}}async function Mu(){let t=Date.now();if(!te||!Q()&&B())return;if(!(yt||t-ri<8e3||Ze.length>=2&&t-Do>500)){te=!1,Eo();return}let n=ks(null,{capture:"challenge-solved"});yt=!1,te=!1,Eo();let i=await Ts(n,{force:!0});if(!i)return;let o=i.samples?.length||0;try{W("success",`Saved verify-human click #${o} (after checkbox) \u2014 uploaded to server`)}catch{}}async function Au(){try{let t=await ai(),e=t.liveTrained&&t.samples?.length||0;return ii=e,e}catch{return ii}}function Ms(){if(ws)return;ws=!0,H("human","train watcher started",{path:location.pathname}),l.on(window,"pointermove",Ss,{passive:!0,capture:!0}),l.on(window,"pointerdown",xs,{passive:!0,capture:!0}),l.on(window,"pointerup",vs,{passive:!0,capture:!0}),l.on(window,"mousemove",Ss,{passive:!0,capture:!0}),l.on(window,"mousedown",xs,{passive:!0,capture:!0}),l.on(window,"mouseup",vs,{passive:!0,capture:!0}),l.on(window,"blur",()=>{!B()||Q()||(yt=!0,ri=Date.now(),ot||(ot=performance.now(),Bt||(Bt=ot)),H("human","page blur during challenge (likely iframe click)"))});let t=async()=>{if(!l.alive)return;if(B()&&!Q()){te||H("human","challenge detected \u2014 recording armed"),te=!0,Lo(),I||(I=tn());let n=await Au();try{W("scanning",n?`Train mode \u2014 click Verify you are human naturally (saved ${n})`:"Train mode \u2014 move mouse naturally, then click Verify you are human (recording\u2026)")}catch{}return}(te||Je||yt)&&await Mu()};t(),l.setInterval(t,1200),l.setTimeout(()=>{H("upload","flushing unsynced local samples\u2026"),$s().catch(()=>{})},2500)}var Du=`
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
`;function As(){if(document.querySelector(p(a.styles)))return;let t=document.createElement("style");t.id=a.styles,t.dataset[k.mark]="",t.textContent=Du,(document.head||document.documentElement).appendChild(t)}Yo();so();qo(()=>{Ia(),l.destroy()});ir();Ja();_()&&R().then(t=>{if(t)return En(t);fe()}).catch(()=>fe());if(!_()){l.disposable(()=>{let i=document.querySelector(p(a.anchor)),o=document.querySelector("#post_select");i&&o&&i.replaceWith(o);for(let r of document.querySelectorAll("[data-"+k.mark+"]"))r.remove()}),As(),l.send({action:"registerBlockGuard",prefix:m}),l.send({action:"registerRedirect",prefix:m}),l.send({action:"registerAlertGuard",prefix:m}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&l.send({action:"registerOfcReader",prefix:m}),l.on(window,"message",i=>{if(l.alive&&i.source===window)switch(i.data?.action){case Et.req:return za(i);case Et.res:return Ga(i);case Et.ofc:return kr(i);case Et.err:return Re("native_alert",i.data?.text),Fe(String(i.data?.text||"alert").slice(0,120)),bs(i.data?.text);case Et.sub:xr(),qe(),Or(),it().then(o=>{Ke(o?.accountId||null)}).catch(()=>{Ke(null)});return}}),chrome.storage.onChanged.addListener((i,o)=>{o==="local"&&(i.profile&&Ci(),i.waitPillClock&&wr(i.waitPillClock.newValue),i.autoCloudflareTick&&(i.autoCloudflareTick.newValue?wo():bo()))}),l.on(document,"click",i=>{ce();let o=i.target.closest(p(a.waitTime));if(o){if(o.dataset.skipClick){delete o.dataset.skipClick;return}br()}}),l.on(document,"keydown",ce),l.on(window,"focus",()=>ce({keepConsular:!0})),l.on(document,"visibilitychange",()=>{document.hidden||ce({keepConsular:!0})}),vr(),ls(),fs(),hs(),gs(),ys(),Ms(),wo();async function t(){!l.alive||_()||!mt()||document.querySelector("#post_select")&&(pt(),await Promise.all([wi(),xi(),co()]),Br({slotIndex:Pn,shouldPick:async()=>await it()?!0:!!await x("autoSelectFirstDate"),onSlotPicked:()=>La()}))}async function e(){!l.alive||_()||!mt()||await Ea()}async function n(){Qo(),Zo(),await Promise.all([Ci(),er(),tr(),wi(),xi(),co()]),ui()}document.readyState==="complete"?n():l.on(window,"load",n),l.setInterval(t,2500),l.setInterval(e,3e4),e()}})();
