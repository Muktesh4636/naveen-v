(()=>{function N(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function C(t){return N()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,i]of Object.entries(t))e[n]=i;return e}):Promise.resolve(typeof t=="string"?{}:t)}function T(t){return N()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function Co(t){return N()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function To(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",i=>{String(i.reason?.message||i.reason||"").includes("Extension context invalidated")&&(i.preventDefault(),e())});let n=setInterval(()=>{N()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var Bt="https://the.gopg.online",ei=`${Bt}/contribute`,_o=`${Bt}/contribute/telegram`,mu=`${Bt}/contribute/human-click`,tn=`${Bt}/contribute/tik-tik-prefs`,$o=`${Bt}/contribute/tik-tik-coord`;var ko=20,Mo=4320*60*1e3,en=100,Ao=4,nn=100,Do=240,Eo=50,Io=1440*60*1e3,ps={recheckButton:!1,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function x(t){return C({[t]:ps[t]}).then(e=>e[t])}function Mt(){return C({posts:[]}).then(t=>t.posts)}function ee(t){return T({posts:t})}function G(){return C("profile").then(t=>t.profile)}var Ft=t=>String(t).padStart(2,"0");function Se(t){let e=Ft(t%60),n=Math.floor(t/60)%60,i=Math.floor(t/3600);return i?`${Ft(i)}:${Ft(n)}:${e}`:`${Ft(n)}:${e}`}function Po(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${Ft(n.getUTCHours())}:${Ft(n.getUTCMinutes())}:${Ft(n.getUTCSeconds())}`}}function ni(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),i=t%60,o=[];return e>0&&o.push(`${e}d`),(n>0||e>0)&&o.push(`${n}h`),o.push(`${i}m`),o.join(" ")}function Lo(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),i=o=>n.find(r=>r.type===o)?.value??"";return`${i("month")} ${i("day")} ${i("year")} ${i("hour")}:${i("minute")} ${i("dayPeriod")}`}function qo(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),i=parseInt(e[2],10),o=parseInt(e[3],10),r=e[4];r&&(r.toUpperCase()==="PM"&&n<12&&(n+=12),r.toUpperCase()==="AM"&&n===12&&(n=0));let s=new Date;return s.setHours(n,i,o,0),s.getTime()>Date.now()+6e4&&s.setDate(s.getDate()-1),s}var Ro=Symbol(),hs=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&N()}on(t,e,n,i){t.addEventListener(e,n,{...i,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!N())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=Ao,interval:n=en}={}){return new Promise(i=>{let o=r=>{if(!this.alive)return;let s=document.querySelector(t);if(s)return i(s);if(r>=e)return i(null);this.setTimeout(()=>o(r+1),n)};o(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},l=new hs;function Oo(){let t=globalThis[Ro];Object.defineProperty(globalThis,Ro,{value:l,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var on=new Uint32Array(2);crypto.getRandomValues(on);var No="abcdefghjkmnpqrstuvwxyz",gs=(on[0].toString(36)+on[1].toString(36)).replace(/[^a-z0-9]/g,""),m=(No[on[0]%No.length]+gs).slice(0,8).padEnd(8,"x");function p(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var a={selRow:m+"01",anchor:m+"02",waitTime:m+"03",recheck:m+"04",histCont:m+"05",histTbl:m+"06",cdCard:m+"07",cdTime:m+"08",ofcDate:m+"09",styles:m+"10",datesCont:m+"11",datesPara:m+"12",slotsTbl:m+"12b",aiBtn:m+"13",aiPanel:m+"14",aiFrom:m+"15",aiTo:m+"16",aiStatus:m+"17",aiConfirm:m+"18",aiCancel:m+"19",aiClose:m+"20",aiCities:m+"21",aiSubmitBtn:m+"22",aiCitiesBtn:m+"23",aiLogin:m+"24",aiPass:m+"25",aiQ1:m+"26",aiA1:m+"27",aiQ2:m+"28",aiA2:m+"29",aiQ3:m+"30",aiA3:m+"31",aiSaveLogin:m+"32",cfHud:m+"33",aiCitiesAll:m+"34",aiCitiesNone:m+"35",aiLoginToggle:m+"36",aiLoginBody:m+"37",aiSubmitOn:m+"38",aiSubmitOff:m+"39",aiCitiesOn:m+"40",aiCitiesOff:m+"41",aiWinList:m+"42",aiWinAdd:m+"43",aiWinSave:m+"44",aiWinReset:m+"45",aiWinNote:m+"46",aiSubmitSw:m+"47",aiCitiesSw:m+"48",aiInfoBox:m+"49",aiWarnBox:m+"50",aiOkBox:m+"51",aiWinCard:m+"52",aiSubmitBody:m+"53",aiCitiesBody:m+"54",aiTerms:m+"55",aiTermsAgree:m+"56",aiTermsGate:m+"57",aiMain:m+"58",aiTermsContinue:m+"59",aiFromBtn:m+"60",aiToBtn:m+"61",aiCal:m+"62"},c={pill:m+"a",pillTtl:m+"b",pillTmr:m+"c",pillWait:m+"d",pillDone:m+"e",footer:m+"f",card:m+"g",cardTtl:m+"h",histScrl:m+"i",dltDn:m+"j",dltUp:m+"k",cdDiv:m+"l",hidden:m+"m",sideLink:m+"n",datesLnk:m+"o",slotsSum:m+"o2",slotsTbl:m+"o3",aiOn:m+"p",aiRow:m+"q",aiHint:m+"r",aiCities:m+"s",aiOnBtn:m+"t",aiCityAct:m+"x",cfHud:m+"u",cfPulse:m+"v",cfFlash:m+"w",aiEn:m+"y",aiDis:m+"z",aiWinRow:m+"aa",aiFeat:m+"ab",aiSwitch:m+"ac",aiKnob:m+"ad",aiSec:m+"ae",aiInfo:m+"af",aiWarn:m+"ag",aiOk:m+"ah",aiTrash:m+"ai",aiWinHelp:m+"aj",aiInline:m+"ak",aiHead:m+"al",aiTerms:m+"am",aiTermsCb:m+"an",aiTermsList:m+"ao",aiContinue:m+"ap",aiDateBtn:m+"aq",aiCal:m+"ar",aiCalHead:m+"as",aiCalGrid:m+"at",aiCalDay:m+"au",aiCalMuted:m+"av",aiCalOn:m+"aw",aiCalToday:m+"ax"},$={mark:m,w:m+"w",mw:m+"mw"},At={req:m+"q",res:m+"r",ofc:m+"o",err:m+"e",sub:m+"s"};function rn(t){return t.map(e=>String.fromCharCode(e)).join("")}function ys(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function Wo(){let t=document.createElement("div");return t.className=c.footer,t.textContent=rn([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function bs(t){let e=document.getElementById(a.histCont);e&&e.remove(),e=document.createElement("div"),e.id=a.histCont,e.className=c.card,e.dataset[$.mark]="";let n=document.createElement("h4");n.className=c.cardTtl,n.textContent=rn([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let i=document.createElement("div");i.className=c.histScrl;let o=document.createElement("table");o.id=a.histTbl;let r=document.createElement("thead"),s=document.createElement("tr");for(let d of["Time","Est. Wait","Change"]){let h=document.createElement("th");h.textContent=d,s.appendChild(h)}r.appendChild(s),o.appendChild(r);let u=document.createElement("tbody");for(let d=t.length-1;d>=0;d--){let h=t[d],g="--",w="";if(d>0){let k=h.minutes-t[d-1].minutes;k<0?(g=`${k}m`,w=c.dltDn):k>0?(g=`+${k}m`,w=c.dltUp):g="0m"}let v=document.createElement("tr"),K=[[h.timeStr,""],[ni(h.minutes),""],[g,w]];for(let[k,z]of K){let S=document.createElement("td");z&&(S.className=z),S.textContent=k,v.appendChild(S)}u.appendChild(v)}o.appendChild(u),i.appendChild(o),e.appendChild(i),e.appendChild(Wo());let f=document.getElementById("last-updated");f&&(f.closest("div, p, section")||f.parentElement).insertAdjacentElement("afterend",e)}function ws(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function Ho(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),i=ws();if(i!==null&&i>Do&&!e.textContent.includes("(")){let s=ni(i);e.textContent=`${e.textContent} (${i} minutes / ${s})`}let o=n.textContent.trim().split(" (")[0],r=qo(o);if(r&&l.setInterval(()=>{let s=Math.floor((Date.now()-r)/1e3);s>=0&&(n.textContent=`${o} (${s}s ago)`)},1e3),i!==null){let s=ys(),u=sessionStorage.getItem(s);u||(u=Math.random().toString(36).substring(2,11),sessionStorage.setItem(s,u)),C({queueHistory:{}}).then(f=>{let d=f.queueHistory||{},h=Date.now(),g={};for(let[k,z]of Object.entries(d)){if(!Array.isArray(z))continue;let S=z[z.length-1];S&&h-S.timestamp<Io&&(g[k]=z)}let w=g[u]||[],v=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),K=w[w.length-1];(!K||K.minutes!==i||K.timeStr!==v)&&(w.push({timestamp:h,timeStr:v,minutes:i}),w.length>Eo&&w.shift(),g[u]=w,T({queueHistory:g})),bs(w)})}}function Bo(t,e){let n=document.getElementById("error_row");if(!n)return;let i;t?i=e?`Blocked for 24 hours, about ${Se(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":i="Temporarily blocked. Log in in a new tab, then refresh this page.";let o=document.createElement("div");o.className="atlas_validationalert alert alert-danger warning",o.dataset[$.mark]="",o.textContent=i,n.replaceChildren(o),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function Fo(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&C({cfRetryAfter:null}).then(n=>{let i=parseInt(n.cfRetryAfter,10);if(!isNaN(i)){Co("cfRetryAfter");let o=document.getElementById("what-happened-section");if(o){let r=document.createElement("div");r.id=a.cdCard,r.className=c.card,r.dataset[$.mark]="";let s=document.createElement("h4");s.className=c.cardTtl,s.textContent=rn([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),r.appendChild(s);let u=document.createElement("div");u.id=a.cdTime,r.appendChild(u);let f=document.createElement("div");f.className=c.cdDiv,r.appendChild(f),r.appendChild(Wo()),o.appendChild(r);let d=i,h=null,g=()=>{d>0?(u.textContent=Se(d),d--):(u.classList.add(c.cdDiv+"-over"),u.textContent="You can try refreshing now!",h!=null&&l.clear(h))};g(),h=l.setInterval(g,1e3)}}})}async function Uo(){let t=document.querySelector(".username");if(!t)return;let n=(t.innerText||"").trim().match(/^(.*)\((\d+)\)\s*$/);if(!n)return;let[,i,o]=n,r=await G()||{},s=!r.id||r.id===o||String(r.id).includes(o)?r:{};s.name=i.trim(),s.id=o;let u=document.querySelectorAll("script");for(let f of u){let d=f.innerText.trim();if(d.includes("setAuthenticatedUserContext")){let h=/setAuthenticatedUserContext\('([^']*)'\)/,g=d.match(h);g&&(s.email=g[1])}}await T({profile:s})}async function Ko(){let t=document.querySelector("#post_select");if(!t)return;let e=await Mt();for(let n of t.options){if(!n.value)continue;e.findIndex(o=>o.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await ee(e)}var Ss=["visa-information","fee-payment","appointment-confirmation"];function xs(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(i=>{let o=i.querySelector(".text-bold");if(!o)return;let r=vs(o.textContent);if(!Ss.includes(r))return;let s=Cs(i);s&&(n[r]=s)}),Object.keys(n).length?n:null}function vs(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Cs(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function ne(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>Mo)return null}catch{}return t.value}function Ts(t){let e=(t.posts||[]).filter(o=>o.Updated).sort((o,r)=>o.Updated-r.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},i=ne(t.cgiIdToken);return i&&(n.token=i),n}async function ii(){if(!N()||!await x("serverSync"))return;let t=await C(["profile","posts","cgiIdToken"]),e=Ts(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await fetch(ei,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(o=>o.json());if(!n.success)return;let i="0";n.contribs>0&&(i=n.contribs.toString()),n.contribs>10&&(i="10+"),n.contribs>0&&await T({contribs:{email:t.profile?.email,updated:Date.now(),count:i}})}catch{}}function oi(t=0){N()&&document.querySelector("#appointment-card")&&x("serverSync").then(e=>{if(!e)return;let n=xs();if(!n){t<ko&&l.setTimeout(()=>oi(t+1),en);return}C(["profile","cgiIdToken","savedDashboard"]).then(i=>{let o=ne(i.cgiIdToken);o&&JSON.stringify(n)!==JSON.stringify(i.savedDashboard)&&fetch(ei,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:i.profile,dashboard:n,token:o})}).then(r=>r.json()).then(r=>{r.success&&T({savedDashboard:n})}).catch(()=>{})})})}var _s=`${Bt}/extension-runtime-config.json`,ai="vsRuntimeConfig",$s=300*1e3,ri=0,xe=null,b={slotWindowLabel:":05\u2013:13, :14\u2013:21, :24\u2013:31, :35\u2013:50, :54\u2013:02",slotWindows:[{slot:5,fromMin:0,toMin:2},{slot:1,fromMin:5,toMin:13},{slot:2,fromMin:14,toMin:21},{slot:3,fromMin:24,toMin:31},{slot:4,fromMin:35,toMin:50},{slot:5,fromMin:54,toMin:59}],windowStartsMin:[0,5,14,24,35,54],cityLoadingMaxMs:18e4,cityCalendarNoDatesMs:2e4,cityRotateMinGapMs:13e3,cityRotateMaxGapMs:18e3,cityHoldMaxMs:45e3,homeKeepaliveMinMs:6e5,homeKeepaliveMaxMs:6e5,homeKeepaliveDebounceMs:48e4,loadingStuckMs:12e4,loadingStuckDebounceMs:9e4,remoteVersion:0,source:"bundled"};function V(t,e,n,i){let o=Number(t);return Number.isFinite(o)?Math.min(n,Math.max(e,Math.round(o))):i}function ks(t){if(!Array.isArray(t)||!t.length||t.length>24)return null;let e=[];for(let n of t){let i=V(n?.fromMin,0,59,NaN),o=V(n?.toMin,0,59,NaN);if(!Number.isFinite(i)||!Number.isFinite(o)||i>o)return null;let r=V(n?.slot,1,12,1);e.push({slot:r,fromMin:i,toMin:o})}return e}function Ms(t){let e=[...new Set(t.map(n=>n.fromMin))].sort((n,i)=>n-i);return e.length?e:b.windowStartsMin.slice()}function Go(t,e="remote"){if(!t||typeof t!="object")return!1;let n=ks(t.slotWindows);if(n){b.slotWindows.length=0;for(let i of n)b.slotWindows.push(i);b.windowStartsMin=Ms(n)}return typeof t.slotWindowLabel=="string"&&t.slotWindowLabel.length<120&&(b.slotWindowLabel=t.slotWindowLabel),b.cityLoadingMaxMs=V(t.cityLoadingMaxMs,1e4,3e5,b.cityLoadingMaxMs),b.cityCalendarNoDatesMs=V(t.cityCalendarNoDatesMs,5e3,12e4,b.cityCalendarNoDatesMs),b.cityRotateMinGapMs=V(t.cityRotateMinGapMs,5e3,6e4,b.cityRotateMinGapMs),b.cityRotateMaxGapMs=V(t.cityRotateMaxGapMs,b.cityRotateMinGapMs,9e4,Math.max(b.cityRotateMinGapMs,b.cityRotateMaxGapMs)),b.cityHoldMaxMs=V(t.cityHoldMaxMs,1e4,18e4,b.cityHoldMaxMs),b.homeKeepaliveMinMs=V(t.homeKeepaliveMinMs,12e4,18e5,b.homeKeepaliveMinMs),b.homeKeepaliveMaxMs=V(t.homeKeepaliveMaxMs,b.homeKeepaliveMinMs,18e5,Math.max(b.homeKeepaliveMinMs,b.homeKeepaliveMaxMs)),b.homeKeepaliveDebounceMs=V(t.homeKeepaliveDebounceMs,6e4,18e5,b.homeKeepaliveDebounceMs),b.loadingStuckMs=V(t.loadingStuckMs,3e4,6e5,b.loadingStuckMs),b.loadingStuckDebounceMs=V(t.loadingStuckDebounceMs,3e4,6e5,b.loadingStuckDebounceMs),b.remoteVersion=V(t.version,0,1e9,b.remoteVersion),b.source=e,!0}async function As(){try{let e=(await C(ai))[ai];e?.config&&Go(e.config,"cache")}catch{}}async function Ds(t){try{await T({[ai]:{config:t,fetchedAt:Date.now()}})}catch{}}async function Es({force:t=!1}={}){let e=Date.now();if(!t&&e-ri<$s)return b;if(xe)return xe;xe=(async()=>{await As();try{let n=await fetch(_s,{method:"GET",cache:"no-store",signal:AbortSignal.timeout(8e3)});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.json();if(!i||typeof i!="object"||Array.isArray(i))throw new Error("bad json");if(i.script||i.code||i.eval)throw new Error("unsafe keys");Go(i,"remote"),await Ds(i),ri=Date.now()}catch{ri=Date.now()}return b})();try{return await xe}finally{xe=null}}function zo(){Es().catch(()=>{})}var Dt=null,ve=null;function jo(){return Dt||b.slotWindows}function st(){return ve||(Dt?.length?Yo(Dt):b.slotWindowLabel)}var qu=b.slotWindows,ht=4,Et=6;function Yo(t){return t?.length?t.map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", "):b.slotWindowLabel}function si(t){if(!Array.isArray(t))return[];let e=[];for(let n of t){if(e.length>=ht)break;let i=Number(n?.fromMin),o=Number(n?.durationMin??n?.duration);if(!Number.isFinite(i)||i<0||i>59)continue;let r=Math.min(Et,59-i);if(r<1)continue;if(!Number.isFinite(o)||o<1){let u=Number(n?.toMin);if(!Number.isFinite(u)||u<i||u>59||(o=Math.min(r,u-i),o<1))continue}o=Math.min(r,Math.max(1,Math.round(o)));let s=Math.min(59,i+o);e.push({slot:e.length+1,fromMin:Math.round(i),toMin:s,durationMin:o})}return e}function Vo(t){let e=si(t||[]);return e.length?(Dt=e.map(({slot:n,fromMin:i,toMin:o})=>({slot:n,fromMin:i,toMin:o})),ve=Yo(Dt),Dt):(Dt=null,ve=null,null)}function ci(){Dt=null,ve=null}function Xo(t){let e=t?.length?t:b.slotWindows,n=[];for(let i of e||[]){if(n.length>=ht)break;let o=Number(i.fromMin),r=Number(i.toMin);if(!Number.isFinite(o)||!Number.isFinite(r)||r<o||o===0&&r<=2&&(e||[]).some(f=>Number(f.fromMin)>=54))continue;let s=Math.min(Et,59-o);if(s<1)continue;let u=Math.min(s,Math.max(1,r-o));n.push({fromMin:o,durationMin:u})}return n}function Qo(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=i=>Number(e.find(o=>o.type===i)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function ie(t=new Date){let{minute:e}=Qo(t),n=jo();for(let i of n)if(e>=i.fromMin&&e<=i.toMin)return i.slot;return 0}function Ce(t=new Date){if(ie(t))return 0;let{minute:e,second:n}=Qo(t),i=e*60+n,o=jo(),r=[...new Set(o.map(u=>u.fromMin))].sort((u,f)=>u-f);for(let u of r){let f=u*60;if(i<f)return(f-i)*1e3}let s=r[0]??0;return(3600-i+s*60)*1e3}function li(t){return t<9e4?`${Math.ceil(t/1e3)}s`:`${Math.ceil(t/6e4)}m`}function or(){let t=document.querySelector(p(a.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=a.selRow,t.dataset[$.mark]="",n.insertAdjacentElement("afterend",t);let i=document.createElement("span");return i.id=a.anchor,i.dataset[$.mark]="",i.dataset[$.w]=e.style.width,i.dataset[$.mw]=e.style.minWidth,i.hidden=!0,e.insertAdjacentElement("beforebegin",i),l.setStyle(e,"width","100%"),l.setStyle(e,"minWidth","0"),t.appendChild(e),t}var Te="waitPillState",Is=3600*1e3,Jo=c.pillWait,Ps=c.pillDone;function Ls(t,e){let n=document.createElement("span");n.className=`${c.pill} ${e}`;let i=(o,r)=>{let s=document.createElement("span");s.className=o,s.textContent=r,n.appendChild(s)};return i(c.pillTtl,t.title),t.timer!==void 0&&i(c.pillTmr,t.timer),n}function qs(t,e=Date.now()){if(t.kind==="waiting")return{variant:Jo};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:Jo}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:Ps}}return null}function Rs(t,e,n=new Date){let i=Po(n);return t.seconds===void 0?{title:i}:{title:i,timer:Se(t.seconds)}}var Os=class{#t=null;#e={kind:"idle"};#i=null;#n=null;#o=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get(Te))[Te];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>Is){chrome.storage.local.remove(Te);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#o=t,this.#r(),this.#c()}toggleClockMode(){l.alive&&(this.setClockMode(!this.#o),chrome.storage.local.set({waitPillClock:this.#o}))}render(t){return qs(this.#e,t)}#l(t){return Rs(t,this.#o,new Date)}#r(){if(this.#t??=Ws(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(c.hidden);return}this.#t.classList.remove(c.hidden),this.#t.replaceChildren(Ls(this.#l(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#i&&(l.clear(this.#i),this.#i=null),t.kind==="running"?(chrome.storage.local.set({[Te]:t}),this.#i=l.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove(Te),this.#r(),this.#c()}#u(){this.#r(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,x("audioAlert").then(t=>{t&&Xs()})))}#c(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=l.setInterval(()=>this.#r(),1e3):!t&&this.#n&&(l.clear(this.#n),this.#n=null)}},se=new Os,Ae="pillPosition",Zo=4;function tr(t,e,n){return Math.max(e,Math.min(n,t))}function rr(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,i=e.height>0?e.height:36;return{w:n,h:i}}function oe(t,e,n){let{w:i,h:o}=rr(t),r=tr(e,0,Math.max(0,window.innerWidth-i)),s=tr(n,0,Math.max(0,window.innerHeight-o));return t.style.setProperty("left",r+"px","important"),t.style.setProperty("top",s+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:r,top:s}}function Ns(t){var e=!1,n=!1,i=0,o=0,r=0,s=0;function u(d){if(e){var h=d.touches?d.touches[0]:d,g=h.clientX-i,w=h.clientY-o;!n&&Math.abs(g)<Zo&&Math.abs(w)<Zo||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",oe(t,r+g,s+w),d.cancelable&&d.preventDefault())}}function f(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",f),document.removeEventListener("touchmove",u),document.removeEventListener("touchend",f),n){let d=t.getBoundingClientRect();chrome.storage.local.set({[Ae]:{top:Math.round(d.top),left:Math.round(d.left)}})}n=!1}}t.addEventListener("mousedown",function(d){if(d.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let h=t.getBoundingClientRect();i=d.clientX,o=d.clientY,r=h.left,s=h.top,oe(t,h.left,h.top),document.addEventListener("mousemove",u),document.addEventListener("mouseup",f),d.preventDefault(),d.stopPropagation()}),t.addEventListener("touchstart",function(d){e=!0,n=!1,delete t.dataset.skipClick;let h=t.getBoundingClientRect();i=d.touches[0].clientX,o=d.touches[0].clientY,r=h.left,s=h.top,oe(t,h.left,h.top),document.addEventListener("touchmove",u,{passive:!1}),document.addEventListener("touchend",f)},{passive:!0})}function Ws(){let t=document.querySelector(p(a.waitTime));return t||(t=document.createElement("div"),t.id=a.waitTime,t.className=c.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),Ns(t),chrome.storage.local.get(Ae).then(e=>{let n=e[Ae];n&&typeof n.top=="number"&&typeof n.left=="number"&&oe(t,n.left,n.top)}),Us(t),t)}function er(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function Hs(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function Bs(t){let{w:e,h:n}=rr(t),i=12;return[{left:i,top:i},{left:Math.max(i,window.innerWidth-e-i),top:i},{left:i,top:Math.max(i,window.innerHeight-n-i)},{left:Math.max(i,window.innerWidth-e-i),top:Math.max(i,window.innerHeight-n-i)}]}async function Fs(){let e=(await chrome.storage.local.get(Ae))[Ae];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function Us(t){let e=!1,n=async()=>{if(!l.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(c.hidden))return;let i=Hs(),o=!!(i&&i.offsetParent!==null&&i.getBoundingClientRect().height>20),r=t.getBoundingClientRect();if(o&&er(r,i.getBoundingClientRect())){let s=i.getBoundingClientRect(),u=Bs(t),f=u.find(d=>{let h={left:d.left,top:d.top,right:d.left+r.width,bottom:d.top+r.height};return!er(h,s)})||u[2];e=!0,t.setAttribute("data-dodging",""),oe(t,f.left,f.top);return}if(e&&!o){e=!1,t.removeAttribute("data-dodging");let s=await Fs();s&&oe(t,s.left,s.top)}else o||t.removeAttribute("data-dodging")};l.setInterval(n,400),l.on(window,"resize",n)}async function mi(){if(!l.alive||!await x("defaultWaitTime")||!await l.waitFor("#post_select",{attempts:nn}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});se.setClockMode(t),await se.restore()}async function ar(){await x("defaultWaitTime")&&se.waiting()}async function mn(t){await x("defaultWaitTime")&&se.run(t)}function sr(){se.toggleClockMode()}function cr(t){se.setClockMode(t)}var _e=null,$e=null,an=null;function pi(){return an||(an=new(window.AudioContext||window.webkitAudioContext),l.disposable(()=>an?.close())),an}async function pn(t=150){try{let e=pi();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let o=e.currentTime,r=t/1e3;i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(.1,o+.01),i.gain.setValueAtTime(.1,o+Math.max(.01,r-.02)),i.gain.linearRampToValueAtTime(0,o+r),n.start(),n.stop(o+r)}catch(e){console.error("Audio beep failed:",e)}}function Ks(t,e=125,n=125){let i=0,o=()=>{i>=t||(pn(e),i++,l.setTimeout(o,e+n))};o()}var ui=4,nr=50,ir=50,Gs=600;function lr(){if($e)return;let t=()=>{Ks(ui,nr,ir);let e=ui*nr+(ui-1)*ir;$e=l.setTimeout(t,e+Gs)};t()}var zs=250,js=10,Ys=300,Vs=1e3;function Xs(){if(_e)return;let t=[];for(let o=0;o<=Ys;o+=js)t.push(o);let e=Date.now(),n=0,i=()=>{let o=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&o>=t[n];){let r=n===t.length-1;pn(r?Vs:zs),n++}if(n<t.length){let r=t[n],s=e+r*1e3,u=Math.max(0,s-Date.now());_e=l.setTimeout(i,u)}else ce()};i()}function ce(t={}){let e=!!t.keepConsular;_e&&(l.clear(_e),_e=null),$e&&(l.clear($e),$e=null),di(),e||fi()}var sn=null,cn=null,re=null,ln=null,ke=null;async function ur(){di();try{let t=pi();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=880,i.frequency.value=1320,o.gain.value=.85,r.gain.value=.65,n.connect(o).connect(e),i.connect(r).connect(e);let s=t.createOscillator(),u=t.createGain();s.type="triangle",s.frequency.value=3.2,u.gain.value=280,s.connect(u),u.connect(n.frequency),u.connect(i.frequency);let f=t.currentTime;n.start(f),i.start(f),s.start(f),re={osc1:n,osc2:i,lfo:s,master:e};let d=()=>{re&&(pn(500),cn=l.setTimeout(d,1800))};d(),sn=l.setTimeout(di,12e4),ke=document.title;let h=!1,g=()=>{re&&(document.title=h?ke:"!!! SUBMIT CLICKED !!!",h=!h,ln=l.setTimeout(g,450))};g()}catch(t){console.error("Submit alarm failed:",t)}}function di(){if(sn&&(l.clear(sn),sn=null),cn&&(l.clear(cn),cn=null),ln&&(l.clear(ln),ln=null),ke&&(document.title=ke,ke=null),re){try{let{osc1:t,osc2:e,lfo:n}=re;t.stop(),e.stop(),n.stop()}catch{}re=null}}function Qs(){let t=location.pathname||"";return/\/ofc-schedule\b/i.test(t)?!1:/\/(schedule|c-schedule)\b/i.test(t)}var Js=6e4,un=null,dn=null,fn=null,Me=null,ae=null;async function Zs(){fi();try{let t=pi();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=980,i.frequency.value=1470,o.gain.value=.95,r.gain.value=.8,n.connect(o).connect(e),i.connect(r).connect(e);let s=t.createOscillator(),u=t.createGain();s.type="square",s.frequency.value=4,u.gain.value=320,s.connect(u),u.connect(n.frequency),u.connect(i.frequency);let f=t.currentTime;n.start(f),i.start(f),s.start(f),ae={osc1:n,osc2:i,lfo:s,master:e};let d=()=>{ae&&(pn(650),dn=l.setTimeout(d,900))};d(),un=l.setTimeout(fi,Js),Me=document.title;let h=!1,g=()=>{ae&&(document.title=h?Me:"!!! OFC BOOKED \u2014 CONSULAR PAGE !!!",h=!h,fn=l.setTimeout(g,400))};g()}catch(t){console.error("Consular OFC alarm failed:",t)}}function fi(){if(un&&(l.clear(un),un=null),dn&&(l.clear(dn),dn=null),fn&&(l.clear(fn),fn=null),Me&&(document.title=Me,Me=null),ae){try{let{osc1:t,osc2:e,lfo:n}=ae;t.stop(),e.stop(),n.stop()}catch{}ae=null}}function dr(){if(Qs()){try{let t="vsConsularOfcBeep";if(sessionStorage.getItem(t)==="1")return;sessionStorage.setItem(t,"1")}catch{}Zs()}}function tc(){document.querySelector(p(a.recheck))?.remove();for(let t of document.querySelectorAll("button"))(t.textContent||"").trim()==="Recheck"&&t.remove()}async function hi(){l.alive&&tc()}async function yi(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await l.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let i=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(u=>u.innerText.trim()===i))continue;let r=document.createElement("li");r.className="usa-sidenav__item",r.dataset[$.mark]="";let s=document.createElement("a");s.href=n.link,s.className=c.sideLink,s.target="_self",s.textContent=n.text,r.appendChild(s),t.appendChild(r)}}function M(t,e,n){let i=document.createElement(t);return e&&(i.className=e),n?.appendChild(i),i}function hn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,r]=n;return`${r}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return null}function gi(t){let e=hn(t);if(!e)return String(t||"");let[n,i,o]=e.split("-").map(Number);if(!n||!i||!o)return e;try{return new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(new Date(n,i-1,o))}catch{return e}}function ec(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);if(n)return n[1].slice(0,5);let i=e.match(/^(\d{1,2}:\d{2})/);return i?i[1]:e}function fr(t){let e=document.querySelector(p(a.datesCont));if(e){let o=e.querySelector(p(a.datesPara)),r=e.querySelector("h2");if(r&&t&&(r.textContent=t),o)return{container:e,details:o}}let n=document.querySelector("#page_form");if(!n)return null;e?.remove();let i=nc(t||"");return n.appendChild(i.container),i}function mr(t){if(t.response.HasError)return;let e=document.querySelector("#post_select"),n=e?.options[e.selectedIndex]?.text??"",i=(t.response.ScheduleDays||[]).map(d=>hn(d?.Date)).filter(Boolean).sort((d,h)=>d.localeCompare(h));document.querySelector(p(a.datesCont))?.remove();let o=fr(n);if(!o)return;let{details:r}=o;r.replaceChildren();let s=M("div",c.slotsSum,r);if(!i.length){s.textContent="No slots available";return}s.textContent=`${i.length} date${i.length===1?"":"s"} available`;let u={};for(let d of i){let h=d.slice(0,7);(u[h]||=[]).push(d)}for(let[d,h]of Object.entries(u)){let g=M("div",null,r),w=document.createElement("strong");w.textContent=d,g.append(w,`: ${h.map(v=>v.slice(8,10)).join(", ")}`)}let f=M("div",null,r);f.style.marginTop="0.5em";for(let d of i){let h=M("div",null,f);h.textContent=`\u2022 ${gi(d)} (${d})`}}function pr(t,e,n){let i=document.querySelector("#post_select"),o=n||i?.options[i.selectedIndex]?.text||"",r=hn(e)||hn(t?.[0]?.Date)||"",s=(t||[]).filter(S=>S&&S.Time).map(S=>({time:ec(S.Time),avail:S.EntriesAvailable!=null&&Number.isFinite(Number(S.EntriesAvailable))?Number(S.EntriesAvailable):null,raw:S})).sort((S,O)=>String(S.time).localeCompare(String(O.time))),u=fr(o);if(!u)return;let{details:f}=u;f.replaceChildren();let d=M("div",c.slotsSum,f);if(!s.length){d.textContent=r?`No time slots on ${gi(r)}`:"No time slots available";return}let h=s.filter(S=>S.avail==null||S.avail>0),g=h.reduce((S,O)=>S+(O.avail||0),0),w=r?gi(r):"selected date";if(d.textContent=g>0?`${h.length} time slot${h.length===1?"":"s"} on ${w} \xB7 ${g} available`:`${s.length} time slot${s.length===1?"":"s"} on ${w}`,r){let S=M("div",null,f);S.style.margin="0.35em 0 0.6em",S.textContent=`Date: ${w} (${r})`}let v=M("table",c.slotsTbl,f);v.id=a.slotsTbl;let K=M("thead",null,v),k=M("tr",null,K);for(let S of["Time","Availability"]){let O=M("th",null,k);O.textContent=S}let z=M("tbody",null,v);for(let S of s){let O=M("tr",null,z);S.avail===0&&(O.style.opacity="0.55");let pt=M("td",null,O);pt.textContent=S.time;let ms=M("td",null,O);ms.textContent=S.avail==null?"\u2014":String(S.avail)}}function nc(t){let e=M("div","row");e.id=a.datesCont;let n=M("div","col-sm-12 atlas_section mt-3",e),i=M("div","col-sm-12 atlas_section_header_row",M("div","row",n));M("h2",null,i).textContent=t;let o=M("div",null,M("div","col-sm-12",M("div","row",n)));return o.id=a.datesPara,{container:e,details:o}}var hr=null;function ic(){let t=document.querySelector(p(a.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return l.setStyle(n,"display","flex"),l.setStyle(n,"alignItems","center"),l.setStyle(n,"justifyContent","flex-end"),l.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=a.ofcDate,t.dataset[$.mark]="",e.insertAdjacentElement("beforebegin",t),t}function oc(){if(!location.pathname.includes("/schedule"))return;let t=hr;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=ic();n&&(n.textContent=`OFC (Estimate): ${Lo(e.appointmentDateStr)}`)}function gr(t){chrome.runtime?.id&&(hr=t.data.data,l.waitFor("#submitbtn").then(e=>{e&&oc()}))}var gn=new Map,yr=45e3,yn=new Map,br=8e3,wr=0;function bn(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function wn(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function rc(t,e){return`${t}:${e.slice(0,5).join(",")}`}function ac(t){let e=Date.now(),n=gn.get(t);if(n&&e-n<yr)return!1;gn.set(t,e);for(let[i,o]of gn)e-o>yr*4&&gn.delete(i);return!0}function sc(t){let e=Date.now(),n=yn.get(t);if(n&&e-n<br)return!1;yn.set(t,e);for(let[i,o]of yn)e-o>br*6&&yn.delete(i);return!0}async function Sr(){return await x("telegramViaServer")!==!1}async function xr(t,{kind:e="alert",dedupKey:n="",skipDedup:i=!1,notifyMuktesh:o=!0}={}){if(t&&await Sr())try{await fetch(_o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:i,notify_muktesh:o}),signal:AbortSignal.timeout(2e4)})}catch{}}function cc(t,{kind:e="screen",dedupKey:n="",waitMs:i=0,skipDedup:o=!1,notifyMuktesh:r=!0}={}){l.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:i,skipDedup:o,notifyMuktesh:r,captureScreenshot:!0})}async function lc(t,e,n){let i=bn(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&r.push(`\u{1FAAA} <b>Visa:</b> ${n}`),r.push(`\u{1F550} <b>Checked:</b> ${o} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),r.push(`\u{1F4C6} <b>Dates (${i.length}):</b>`,"");for(let s of i.slice(0,30))r.push(`\u{1F7E2} <b>${wn(s)}</b>`);return i.length>30&&r.push("",`\u2795 <i>+${i.length-30} more dates</i>`),r.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),r.join(`
`)}function uc(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",i=document.querySelector("#datepicker")?.value||"\u2014",r=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:i,time:r}}async function vr(t,{postId:e,postName:n,hasError:i}={}){if(i||!t?.length)return;let o=bn(t);if(!o.length||!await x("telegramAlert"))return;let r=rc(e||n||"unknown",o);if(!ac(r))return;let s=await G(),u=await lc(n,t,s?.visa||"");await xr(u,{kind:"slots",dedupKey:r,notifyMuktesh:!0})}function dc(t,e,n){let i=bn(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
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
\u{1F4F2} Visa Slot 6`}function fc(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=e?wn(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${i}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function mc(t,e,n){let i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?wn(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u23F0 ${n} slot(s)
\u{1F550} ${i} IST
\u{1F4F2} Visa Slot 6`}async function le(t,{kind:e="screen",dedupKey:n,waitMs:i=0,skipDedup:o=!1}={}){if(await x("telegramScreenshots")===!1||!await Sr())return;let r=n||`${e}:${String(t).slice(0,80)}`;!o&&!sc(r)||cc(t,{kind:e,dedupKey:r,waitMs:i,skipDedup:o,notifyMuktesh:!0})}async function Cr(t,{postId:e,postName:n,hasError:i}={}){let o=dc(n,t,i),r=bn(t),s=r.length?"dates":"city";await le(o,{kind:s,dedupKey:`${s}:${e||n}:${r.length}:${i?1:0}`,waitMs:r.length?1400:900})}async function Tr(t,e){await le(fc(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function _r(t,e,n){await le(mc(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function $r(){let t=Date.now();if(t-wr<8e3)return;wr=t;let e=await G(),{city:n,date:i,time:o}=uc(),r=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),s=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${i}`,`\u23F0 <b>Time:</b> ${o}`];e?.email&&s.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&s.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),s.push(`\u{1F550} <b>When:</b> ${r} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let u=s.join(`
`);await xr(u,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await le(u,{kind:"submit",skipDedup:!0,waitMs:200})}var xn=25;function vn(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Si(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let i=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,i),n-1)}function kr(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function Mr(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function vi(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function bi(t){if(t)try{t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}}function Sn(t){if(t)try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}}function xi(t){if(!t||t.disabled)return!1;try{if(t.tagName==="SELECT")return!t.value||t.value==="0"?!1:(bi(t),t.value&&t.value!=="0"?!0:(Sn(t),!!(t.value&&t.value!=="0")));if(t.type==="radio"||t.type==="checkbox"){if(t.name)for(let i of document.getElementsByName(t.name))i!==t&&(i.checked=!1);if(t.checked=!0,bi(t),t.checked)return!0;let e=t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,n=t.closest("tr");for(let i of[e,t.closest("label"),t,n].filter(Boolean))Sn(i);return t.checked=!0,bi(t),t.checked===!0}Sn(t)}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function Ar(){let t=new Set,e=[],n=i=>{if(!i||t.has(i)||vi(i)||i.disabled)return;let o=i.closest("tr");o&&Mr(o)||(t.add(i),e.push(i))};for(let i of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let o of document.querySelectorAll(`${i}:not([disabled])`))n(o);return e}function pc(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!kr(n)||Mr(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function hc(t,e){for(let n of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(n.tagName!=="SELECT"||n.disabled||vi(n))continue;let i=[...n.options].filter(s=>!s.disabled&&s.value&&s.value!=="0"&&kr({textContent:s.textContent}));if(!i.length)continue;let o=null,r=vn(e);if(r&&r!=="00:00"&&(o=i.find(s=>(s.textContent||"").includes(r))||null,!o)){let s=r.match(/(\d{1,2}:\d{2})/);s&&(o=i.find(u=>(u.textContent||"").includes(s[1]))||null)}if(!o){let s=Si(i.length,t);o=i[s]}if(o&&(n.value=o.value,xi(n)))return!0}return!1}function gc(t,e){if(hc(t,e))return!0;let n=Ar();if(n.length){let o=null,r=vn(e);if(r&&r!=="00:00"&&(o=n.find(s=>{let u=(s.closest("tr")?.textContent||s.textContent||"").replace(/\s+/g," ");return u.includes(r)||u.includes(r.slice(0,5))})||null),!o){let s=Si(n.length,t);o=n[s]}if(o&&xi(o))return!0}let i=pc();if(i.length){let o=null,r=vn(e);if(r&&r!=="00:00"&&(o=i.find(f=>(f.textContent||"").includes(r))||null),!o){let f=Si(i.length,t);o=i[f]}if(!o)return!1;let s=o.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(s&&xi(s))return!0;let u=o.querySelector("label");if(u)return Sn(u),!!o.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function j(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!vi(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function yc({slotIndex:t=0,maxMs:e=12e3,pollMs:n=xn,time:i,onTick:o}={}){let r=Date.now()+e,s=Math.max(10,n||25);return new Promise(u=>{let f=()=>{if(!l.alive)return u(!1);if(o?.(),gc(t,i)||j())return u(!0);if(Date.now()>=r)return u(!1);l.setTimeout(f,s)};f()})}function De({time:t,date:e,slotIndex:n,pollMs:i,maxMs:o}){let r=n??0,s=o||15e3,u=i||xn;return l.send({action:"forcePickTimeSlot",slotIndex:r,maxMs:s,pollMs:u}),l.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:r,pollMs:u,domWaitMs:0,maxMs:s}),yc({slotIndex:r,maxMs:s,pollMs:u,time:t||"00:00"})}var wi=!1;function Dr({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(wi)return;wi=!0;let i=!1,o=async()=>{if(!(!l.alive||i)){if(j()){n?.();return}try{if(t&&!await t())return}catch{return}Ar().length&&(i=!0,await De({slotIndex:e,time:"00:00",maxMs:800,pollMs:xn}),i=!1,j()&&n?.())}};l.setInterval(o,xn);let r=document.querySelector("#page_form")||document.body,s=new MutationObserver(()=>o());s.observe(r,{childList:!0,subtree:!0}),l.disposable(()=>{s.disconnect(),wi=!1})}function Er(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let i=vn(n?.Time);if(!i)continue;let o=i.match(/(\d{1,2}):(\d{2})/);if(!o)continue;let[,r,s]=o;if(e.includes(`${r}:${s}`)||e.includes(`${parseInt(r,10)}:${s}`))return!0}return!1}var Cn="submitErrors",Ir=50,bc=45e3,Lr=0,Ci=new Set,Ee=null,qr=null;function Rr(t){qr=typeof t=="function"?t:null}function wc(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",i=document.querySelector("#datepicker")?.value||"";return{city:e,date:i,url:location.href}}function Ie(){Lr=Date.now()+bc,Ci.clear(),_c()}function Tn(){return Date.now()<Lr}function Sc(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function xc(t){let e=await C({[Cn]:[]}),n=Array.isArray(e[Cn])?e[Cn]:[];n.push(t),n.length>Ir&&n.splice(0,n.length-Ir),await T({[Cn]:n})}function Pr(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function vc(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${Pr(t.source)}`,`\u{1F4AC} <b>Message:</b> ${Pr(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let i=n.join(`
`);await le(i,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function Pe(t,e,n={}){let i=String(e||"").trim();if(!i||!Tn()&&!n.force)return;let o=Sc(t,i);if(Ci.has(o))return;Ci.add(o);let r=wc(),s=await G(),u={at:Date.now(),source:String(t||"unknown"),message:i.slice(0,2e3),city:n.city||r.city,date:n.date||r.date,url:n.url||r.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:s?.email||""};await xc(u);try{await vc(u)}catch{}try{qr?.(u)}catch{}}function Cc(t){if(!Tn())return;let e=t?.status,n=t?.retryAfter,i=t?.cgiBlock,o=`Request failed (HTTP ${e||"?"})`;n!=null&&(o+=` \u2014 retry after ${n}s`),i&&(o+=" \u2014 CGI access limitation"),Pe("ajax_error",o,{status:e})}function Or(t){if(!Tn()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){Cc({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",o=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";Pe("ajax_response",o,{route:t.tail||""})}var Tc=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function _c(){Ee&&l.clear(Ee);let t=()=>{if(!l.alive||!Tn()){Ee=null;return}for(let e of Tc)for(let n of document.querySelectorAll(e)){let i=(n.textContent||"").replace(/\s+/g," ").trim();!i||i.length<4||Pe("page_validation",i)}Ee=l.setTimeout(t,600)};Ee=l.setTimeout(t,500)}var Le=0,Nr="",Wr=0;async function $c(){let[t,e]=await Promise.all([G(),C(["cgiIdToken"])]),n=ne(e.cgiIdToken);return{profile:t,token:n}}async function Hr(t){if(!N()||!await x("serverSync"))return null;let{profile:e,token:n}=await $c();if(!e?.id&&!e?.email)return null;try{let i={...t,profile:e};n&&(i.token=n);let o=await fetch($o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}).then(r=>r.json());return o&&o.success?o:null}catch{return null}}async function Br({postId:t,postName:e,dayCount:n}={}){let i=String(t||"").trim(),o=Number(n)||0;if(!i||o<1)return null;let r=`${i}:${o}`,s=Date.now();if(r===Nr&&s-Wr<4e3)return null;Nr=r,Wr=s;let u=await Hr({action:"alert",city:{id:i,name:String(e||i).trim()},dayCount:o});return u?.alertId&&(Le=Math.max(Le,Number(u.alertId)||0)),u}async function Fr({preferredCities:t=[],citiesEnabled:e=!1,currentCityId:n=""}={}){if(!e||!t?.length)return null;let o=(await Hr({action:"poll",preferredCities:t,citiesEnabled:!0,currentCityId:String(n||""),lastAlertId:Le}))?.forceCity;return!o?.id||!o?.alertId?null:o}function Ur(t){let e=Number(t)||0;e>Le&&(Le=e)}var kc=["cities","from","to","submitEnabled","citiesEnabled","enabled","slotWindows","termsAgreed","termsPassed","termsAgreedAt"];function Kr(t){if(!t||typeof t!="object")return{};let e={};for(let n of kc)n in t&&(e[n]=t[n]);return typeof e.submitEnabled!="boolean"&&typeof e.enabled=="boolean"&&(e.submitEnabled=e.enabled),delete e.enabled,e}function Gr(t,e){if(!e||typeof e!="object")return t||null;let n=t&&typeof t=="object"?{...t}:{},i=Number(n.serverUpdatedAt)||0,o=Number(e.updatedAt)||0;if(o&&i&&o<i)return n;let r=Kr(e),s={...n,...r};return typeof r.submitEnabled=="boolean"&&(s.enabled=r.submitEnabled),e.updatedAt&&(s.serverUpdatedAt=e.updatedAt),s}async function zr(){let[t,e]=await Promise.all([G(),C(["cgiIdToken"])]),n=ne(e.cgiIdToken);return{profile:t,token:n}}async function jr(t){if(!N()||!await x("serverSync"))return!1;let e=Kr(t);if(!Object.keys(e).length)return!1;let{profile:n,token:i}=await zr();if(!n?.id&&!n?.email)return!1;try{let o={profile:n,prefs:e};i&&(o.token=i);let r=await fetch(tn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(s=>s.json());return!!(r&&r.success)}catch{return!1}}async function Yr(){if(!N()||!await x("serverSync"))return null;let{profile:t,token:e}=await zr();if(!t?.id&&!t?.email)return null;try{let n=new URLSearchParams;t.id&&n.set("applicant_id",String(t.id)),t.email&&n.set("email",String(t.email));let i=await fetch(`${tn}?${n.toString()}`,{method:"GET",headers:{Accept:"application/json"}}).then(r=>r.json());if(i?.prefs)return i.prefs;let o={profile:t};return e&&(o.token=e),i=await fetch(tn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(r=>r.json()),i?.prefs||null}catch{return null}}var Pt="aiSubmitByAccount",He=8e3;var X=25,Mc=80,Dn=0,En=1e4,ca=1e3;function Be(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}function Li(){return b.cityRotateMinGapMs}function Ac(){return b.cityRotateMaxGapMs}function Oe(){return b.cityHoldMaxMs}function yt(){return b.cityLoadingMaxMs}function Ut(){return b.cityCalendarNoDatesMs}var Vr=5e3,$i=2e4,Dc=15e3;function Tt(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function qi(){return/\/ofc-schedule\b/i.test(location.pathname)}function _(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var Ec=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function $n(t,e){let n=Ec[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(o=>{let r=e===o?" selected":"";return`<option value="${o.replace(/"/g,"&quot;")}"${r}>${o}</option>`}).join("")}function ue(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function Vt(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function Ic(t,e,n){return`${t}-${String(e+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`}function Pc(t){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(t))return null;let[e,n,i]=t.split("-").map(Number),o=new Date(e,n-1,i);return o.getFullYear()!==e||o.getMonth()!==n-1||o.getDate()!==i?null:o}function Ri(){for(let t of["from","to"]){let e=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo)),n=document.querySelector(p(t==="from"?a.aiFromBtn:a.aiToBtn));if(!n)continue;let i=e?.value||"";n.textContent=i?Vt(i):"Select date"}}function Ti(t,e){let n=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo));if(n&&(n.value=e||""),t==="from"){let i=document.querySelector(p(a.aiTo));i&&e&&i.value&&i.value<e&&(i.value="")}Ri()}var Q={y:0,m0:0,which:"from"};function Lt(){document.querySelector(p(a.aiCal))?.classList.add(c.hidden)}function Oi(t){let e=t.target;return e?e.nodeType===3?e.parentElement:e:null}function ki(){let t=document.querySelector(p(a.aiCal));if(!t)return;let{y:e,m0:n,which:i}=Q,o=document.querySelector(p(i==="from"?a.aiFrom:a.aiTo))?.value||"",r=ue(),s=i==="to"&&document.querySelector(p(a.aiFrom))?.value||ue(),u=new Date(e,n,1).toLocaleDateString("en-IN",{month:"long",year:"numeric"}),f=new Date(e,n,1).getDay(),d=new Date(e,n+1,0).getDate(),h=new Date(e,n,0).getDate(),g="";for(let w of["S","M","T","W","T","F","S"])g+=`<div class="${c.aiHint}">${w}</div>`;for(let w=0;w<42;w++){let v,K=e,k=n,z=!1;w<f?(v=h-f+w+1,k=n-1,k<0&&(k=11,K=e-1),z=!0):w>=f+d?(v=w-f-d+1,k=n+1,k>11&&(k=0,K=e+1),z=!0):v=w-f+1;let S=Ic(K,k,v),O=S<s,pt=[c.aiCalDay,z?c.aiCalMuted:"",O?c.aiCalMuted:"",S===r?c.aiCalToday:"",S===o?c.aiCalOn:""].filter(Boolean).join(" ");g+=`<button type="button" class="${pt}" data-iso="${S}" ${O?'disabled aria-disabled="true"':""}>${v}</button>`}t.innerHTML=`
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
  `}function Lc(t){let e=document.querySelector(p(a.aiCal)),i=Oi(t)?.closest?.("button");if(!e||!i||!e.contains(i))return;t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation();let o=i.getAttribute("data-cal"),r=Q.which,s=r==="to"&&document.querySelector(p(a.aiFrom))?.value||ue();if(o==="prev"){Q.m0-=1,Q.m0<0&&(Q.m0=11,Q.y-=1),ki();return}if(o==="next"){Q.m0+=1,Q.m0>11&&(Q.m0=0,Q.y+=1),ki();return}if(o==="clear"){Ti(r,""),Lt();return}if(o==="today"){let f=ue();f>=s&&(Ti(r,f),Lt(),sa());return}if(i.disabled||i.getAttribute("aria-disabled")==="true")return;let u=i.getAttribute("data-iso");!u||u<s||(Ti(r,u),Lt(),sa())}function Xr(t){let e=document.querySelector(p(a.aiCal));if(!e||!t)return;let n=t.getBoundingClientRect(),i=Math.min(340,window.innerWidth-16),o=e.offsetHeight||360,r=Math.max(8,Math.min(n.left,window.innerWidth-i-8)),s=n.bottom+6;s+o>window.innerHeight-8&&n.top-6-o>=8?s=n.top-6-o:s=Math.max(8,Math.min(s,window.innerHeight-o-8)),e.style.position="fixed",e.style.top=`${Math.round(s)}px`,e.style.left=`${Math.round(r)}px`,e.style.width=`${i}px`,e.style.right="auto",e.style.bottom="auto"}function Qr(t,e){let n=document.querySelector(p(a.aiCal));n||(n=document.createElement("div"),n.id=a.aiCal,n.className=`${c.aiCal} ${c.hidden}`,n.dataset[$.mark]="",document.body.appendChild(n),l.on(n,"pointerdown",Lc,{capture:!0}),l.on(n,"click",r=>{n.contains(Oi(r))&&(r.preventDefault(),r.stopPropagation())},{capture:!0}));let i=document.querySelector(p(t==="from"?a.aiFrom:a.aiTo))?.value,o=Pc(i)||new Date;Q={y:o.getFullYear(),m0:o.getMonth(),which:t},ki(),n.classList.remove(c.hidden),Xr(e),requestAnimationFrame(()=>Xr(e))}function Rt(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function qt(t){return!!(t&&t.citiesEnabled)}async function L(){let t=await G();return t?.id?String(t.id):null}async function I(t){return t&&((await C(Pt))[Pt]||{})[t]||null}async function Ni(t,e){if(!t)return;let i=(await C(Pt))[Pt]||{};e==null?delete i[t]:i[t]=e,await T({[Pt]:i})}var H=!1;function Fe(){return H}function fe(){H=!0,Qt(),Re()}function _t(){H=!1,E=!1,Qt()}async function Mn(t){la(),fe();let e=await I(t);if(!e){et();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await Ni(t,e),et()}var wt=!1,Kt=null,It=null,Jr=2e4;function la(){wt=!1,Kt&&(l.clear(Kt),Kt=null),It&&(l.clear(It),It=null)}async function Ue(t){if(_()||Zr()){t?await Mn(t):fe(),y("Booking confirmed \u2014 Tik Tik stopped.");return}wt=!0,$t(),Ie(),y("Submit clicked \u2014 waiting for confirmation (Auto Submit + City Change stay ON)\u2026"),It&&l.clear(It);let e=Date.now(),n=async()=>{if(It=null,!(!wt||!l.alive)){if(Zr()||_()){let i=t||await L();i?await Mn(i):fe(),y("Booking confirmed \u2014 Tik Tik stopped.");return}if(Date.now()-e>=Jr){await Ne("no confirmation yet \u2014 resuming city checks");return}It=l.setTimeout(n,400)}};It=l.setTimeout(n,400),Kt&&l.clear(Kt),Kt=l.setTimeout(()=>{Kt=null,wt&&Ne("submit wait timed out \u2014 resuming city checks")},Jr)}function Zr(){if(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))return!0;let t=(document.body?.innerText||"").slice(0,2500);return/appointment\s+confirmation|successfully\s+scheduled|your\s+appointment\s+has\s+been/i.test(t)}async function Ne(t=""){if(!wt&&!P&&!E){ut();return}la(),E=!1,Qt(),H&&_t(),ut();let e=await L();if(e){let i=await I(e);i&&i.submitEnabled===!1&&i.citiesEnabled}let n=t?`Submit failed (${t})`:"Submit failed";if(y(`${n} \u2014 Auto Submit + City Change still ON; hopping cities\u2026`),R)Z(Date.now()),D();else if(e){let i=await I(e);qt(i)&&await Ln()}}function Ke(){return wt}function Ge(t,e,n){let i=String(t||"").slice(0,10);return!(!i||i.length<10||e&&i<e||n&&i>n)}async function at(){if(H||_()||!Tt())return null;let t=await L();if(!t)return null;let e=await I(t);return!Rt(e)||!e.from||!e.to?null:{...e,accountId:t}}async function me(){if(H||_()||!Tt())return null;let t=await L();if(!t)return null;let e=await I(t);return!qt(e)||!e.cities?.length?null:(va(e),{...e,accountId:t})}function Wi(t,e,n){let i=new Date;return i.setHours(0,0,0,0),(t||[]).filter(o=>o&&typeof o.Date=="string"&&o.Date.length>=10).filter(o=>Ge(o.Date,e,n)).filter(o=>{let[r,s,u]=o.Date.slice(0,10).split("-").map(Number);return new Date(r,s-1,u)>=i}).sort((o,r)=>String(o.Date).localeCompare(String(r.Date)))}var E=!1,bt=null,St=null,ot=!1,xt=0,R=!1,Y=0,vt=0,qe=0,jt=0,pe=!1,ct=null,gt=0,P=!1,W=0,de=null,Gt=null,Xt=0,ta=!1,ea="",na=!1,Mi=0;function qc(t){return(t||[]).map(e=>e.id).join("")}function ua(){let t=document.querySelector(p(a.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function ia(t){let e=document.querySelector(p(a.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function Qt(){bt&&(l.clear(bt),bt=null),E=!1}function Ot(){de&&(l.clear(de),de=null)}function da(){Ot(),W||(W=Date.now());let t=Math.max(500,Oe()-(Date.now()-W));de=l.setTimeout(()=>{de=null,!(!P||!R||!l.alive)&&(P=!1,W=0,Z(Date.now()),y(`City Change \u2014 booking hold timed out (${Oe()/1e3}s); next city in 13\u201318s\u2026`),D())},t)}function Rc(){Gt&&(l.clear(Gt),Gt=null)}function In(t=Date.now()){let e=!1;if(ot&&xt&&t-xt>=Dc&&(ot=!1,xt=0,e=!0),P&&(W||(W=t),t-W>=Oe()?(Ot(),P=!1,W=0,e=!0):de||da()),pe){gt||(gt=t);let i=Ai()?yt():Ut();if(t-gt>=i)tt(),e=!0;else if(!ct){let o=Math.max(500,i-(t-gt));ct=l.setTimeout(()=>{if(ct=null,!R||P)return;let r=Ai(),s=r?yt():Ut();if(Date.now()-(gt||0)<s){In();return}tt(),Z(Date.now()),y(r?`City Change \u2014 still Loading after ${yt()/1e3}s; changing city\u2026`:`City Change \u2014 calendar up but no dates after ${Ut()/1e3}s; changing city\u2026`),D()},o)}}return E&&!bt&&(E=!1,e=!0),e}function fa(){if(Gt||!R)return;let t=()=>{if(Gt=null,!R||!l.alive||H)return;let e=Date.now(),n=In(e),i=!!ie(new Date(e)),o=!!St,s=!(!i&&o||(pe||P||E)&&o)&&Xt>0&&e-Xt>=$i;if(n||s||!o&&!ot)s?(ot=!1,xt=0,tt(),Ot(),P=!1,W=0,E&&!bt&&(E=!1),Y=e,y(i?"City Change \u2014 unstuck; hopping now\u2026":`City Change \u2014 unstuck; waiting for IST window ${st()}\u2026`)):n?(Y=e,y(i?"City Change \u2014 lock cleared; hopping now\u2026":`City Change \u2014 lock cleared; next IST window ${st()}\u2026`)):y("City Change \u2014 timer lost; restarting\u2026"),D();else if(!i&&o){let f=Ce(new Date(e));y(`City Change \u2014 waiting for slot window (IST ${st()}, next in ${li(f)})`)}R&&(Gt=l.setTimeout(t,Vr))};Gt=l.setTimeout(t,Vr)}function Re(){Ui(),Rc(),zc(),Ot(),ot=!1,xt=0,R=!1,P=!1,W=0,Y=0,vt=0,Xt=0,tt()}function tt(){pe=!1,gt=0,ct&&(l.clear(ct),ct=null)}function Hi(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let i=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(i))continue;let o=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let r of o)if(r&&/\bLoading\.{0,3}\b/i.test((r.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let o=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(o))continue;let r=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(r))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function Ai(){return Hi()}function ma(){pe=!0,gt=Date.now(),ct&&l.clear(ct),ct=l.setTimeout(()=>{ct=null,!(!R||P)&&(tt(),Z(Date.now()),y(`City Change \u2014 still Loading after ${yt()/1e3}s; changing city\u2026`),D())},yt())}function Bi(t){let e=Math.max(0,Number(t)||0)*1e3;jt=Math.max(jt,Date.now()+e),Y=Math.max(Y,jt),tt(),D()}function pa(){tt()}function $t(){H||(P=!0,W||(W=Date.now()),Ui(),tt(),da(),y("City Change \u2014 paused (Auto Submit booking)\u2026"))}function ut(){if(wt){y("Submit pending \u2014 staying on this city (ignoring date reload hop)\u2026");return}P&&(Ot(),P=!1,W=0,!(!R||H)&&(Z(Date.now()),y("City Change \u2014 resuming; next city in 13\u201318s\u2026"),D()))}async function Pn(){let t=await at();if(!t)return;let e=Date.now();if(e-Mi<6e4)return;Mi=e;let i=document.querySelector("#post_select")?.value;if(!i){y("Auto Submit ON \u2014 pick a city first.");return}let r=(await Mt()).find(u=>String(u.ID)===String(i)),s=r?.Days;if(Array.isArray(s)&&s.length){let u=Wi(s,t.from,t.to);if(u.length){$t();let f=Be(u.length),d=u[f].Date;y(`Auto Submit: picking date #${f+1} (${d.slice(0,10)})\u2026`),l.send({action:"selectFirstDate",date:d,maxMs:He,pollMs:X});return}y(`Auto Submit ON \u2014 no dates in your range on ${r.Name||"this city"} yet.`);return}y("Auto Submit ON \u2014 loading slots for current city\u2026"),l.send({action:"selectPost",postId:String(i)})}function Fi(){Mi=0}function Ui(){St&&(l.clear(St),St=null)}function Oc(t,e){return t+Math.random()*(e-t)}function Nc(){return Oc(Li(),Ac())}function Z(t=Date.now()){Y=t+Nc()}function Wc(t=Date.now()){let e=Ce(new Date(t));if(e>0)return e;if(jt>t)return jt-t;if(vt){let n=vt+Li()-t;if(n>0)return n}return Y>t?Y-t:0}function D(){if(!R)return;if(Ui(),P||pe){St=l.setTimeout(()=>{_i()},500);return}let t=Date.now(),e=Ce(new Date(t));if(e>0){Y>t&&(Y=t),e>=$i&&(Xt=t),St=l.setTimeout(()=>{_i()},e);return}let n=0;jt>t&&(n=Math.max(n,jt-t)),vt&&(n=Math.max(n,vt+Li()-t)),Y>t&&(n=Math.max(n,Y-t)),n=Math.max(0,n),n>=$i&&(Xt=Date.now()),St=l.setTimeout(()=>{_i()},n)}function Hc(t,e){if(!t.length)return null;if(t.length===1)return qe=0,t[0];let n=t.findIndex(o=>String(o.id)===String(e));n<0&&(n=Math.max(0,Math.min(qe,t.length-1)));let i=(n+1)%t.length;return qe=i,t[i]}function Ki(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function Yt(){let t=document.querySelector(p(a.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function ze(){return{from:document.querySelector(p(a.aiFrom))?.value||null,to:document.querySelector(p(a.aiTo))?.value||null}}function We(t=[],{force:e=!1}={}){let n=document.querySelector(p(a.aiCities));if(!n)return;let i=Ki(),o=qc(i),r=document.querySelector(p(a.aiPanel)),s=r&&!r.classList.contains(c.hidden),u=ua();if(!e&&o===ea&&n.querySelector('input[type="checkbox"]'))return;ea=o;let f=new Set(s&&u.length&&!e&&!t.length?u:(t.length?t:u).map(String));if(n.replaceChildren(),!i.length){n.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let d of i){let h=document.createElement("label"),g=document.createElement("input");g.type="checkbox",g.value=d.id,g.dataset.name=d.name,g.checked=f.has(d.id),h.append(g,document.createTextNode(d.name)),n.appendChild(h)}}function Bc(t){let e=t?.cities||[];return e.length?e.map(n=>n.name||n.id).join(", "):"\u2014"}async function Ct(t,e={}){let n=await I(t)||{},{from:i,to:o}=ze(),r=Yt(),s={...n,from:i||n.from||null,to:o||n.to||null,cities:r.length?r:n.cities||[],loginId:document.querySelector(p(a.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(p(a.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(u=>{let f=[a.aiQ1,a.aiQ2,a.aiQ3][u],d=[a.aiA1,a.aiA2,a.aiA3][u];return{q:document.querySelector(p(f))?.value?.trim()||n.security?.[u]?.q||"",a:document.querySelector(p(d))?.value?.trim()||n.security?.[u]?.a||"",set:u+1}}),...e};return typeof s.submitEnabled=="boolean"&&(s.enabled=s.submitEnabled),s.serverUpdatedAt=Date.now(),await Ni(t,s),Fc(s),s}var _n=null,Di=null;function Fc(t){_n&&l.clear(_n),_n=l.setTimeout(()=>{_n=null,jr(t).catch(()=>{})},400)}async function ha(t){if(!t||Di===t)return null;let e=await Yr();if(Di=t,!e)return null;let n=await I(t)||{},i=Gr(n,e);return i?(i.loginId=n.loginId||i.loginId||"",i.loginPass=n.loginPass||"",i.security=n.security||i.security||[],typeof i.submitEnabled=="boolean"&&(i.enabled=i.submitEnabled),await Ni(t,i),i):null}async function Uc(t,e){if(wt||!ie()||P||E)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let i=String(t);return String(n.value)===i?!1:(ma(),y(`Switching city \u2192 ${e||t}\u2026`),l.send({action:"selectPost",postId:i}),!0)}async function Kc(t,e,{alertId:n,dayCount:i}={}){if(H||_()||!Tt()||wt)return!1;let o=document.querySelector("#post_select");if(!o||!t)return!1;let r=String(t),s=e||r;return String(o.value)===r?(y(`City alert \u2014 already on ${s}`+(i?` (${i} dates reported)`:"")),!0):(Ot(),tt(),P=!1,W=0,E=!1,Qt(),ot=!1,xt=0,Y=Date.now(),vt=0,ma(),vt=Date.now(),y(`City alert \u2014 switching now \u2192 ${s}`+(i?` (${i} dates)`:"")+(n?` [#${n}]`:"")),l.send({action:"selectPost",postId:r}),R&&D(),!0)}var zt=null,kn=!1,Gc=1e3;function zc(){zt&&(l.clear(zt),zt=null),kn=!1}async function jc(){if(!(kn||!R||H)){kn=!0;try{let t=await me();if(!t?.cities?.length)return;let e=document.querySelector("#post_select"),n=await Fr({preferredCities:t.cities,citiesEnabled:!0,currentCityId:e?String(e.value):""});if(!n?.alertId)return;if(Ur(n.alertId),n.alreadyThere){y(`City alert \u2014 already on ${n.name||n.id}`+(n.dayCount?` (${n.dayCount} dates)`:""));return}await Kc(n.id,n.name,{alertId:n.alertId,dayCount:n.dayCount})}catch{}finally{kn=!1}}}function ga(){if(zt||!R)return;let t=()=>{zt=null,!(!R||H||!l.alive)&&jc().finally(()=>{R&&!H&&l.alive&&(zt=l.setTimeout(t,Gc))})};zt=l.setTimeout(t,400)}function Gi(){ta||!document.querySelector("#post_select")||(ta=!0)}async function _i(){if(!(ot||!R)){ot=!0,xt=Date.now(),Xt=Date.now(),St=null;try{if(H||_()||!l.alive){Re();return}if(In()){Y=Date.now(),y(ie()?"City Change \u2014 auto-unstuck; hopping now\u2026":`City Change \u2014 auto-unstuck; waiting IST ${st()}\u2026`),D();return}if(P||E){let g=W?Date.now()-W:0;if(P&&g>=Oe()){Ot(),P=!1,W=0,Z(Date.now()),y("City Change \u2014 hold expired; next city in 13\u201318s\u2026"),D();return}let w=Math.max(0,Oe()-g);y(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(w/1e3)}s`),D();return}let t=Date.now(),e=ie(new Date(t)),n=Ce(new Date(t));if(!e){y(`City Change \u2014 waiting for slot window (IST ${st()}, next in ${li(n)})`),D();return}if(pe){let g=gt?t-gt:0;if(Ai()){if(g>=yt()){tt(),Z(Date.now()),y(`City Change \u2014 still Loading after ${yt()/1e3}s; changing city\u2026`),D();return}let v=Math.max(0,Math.ceil((yt()-g)/1e3));y(`City Change \u2014 Date Loading\u2026 stay (${v}s then hop if still Loading)`),D();return}if(g>=Ut()){tt(),Z(Date.now()),y(`City Change \u2014 calendar up but no dates after ${Ut()/1e3}s; changing city\u2026`),D();return}let w=Math.max(0,Math.ceil((Ut()-g)/1e3));y(`City Change \u2014 waiting calendar dates\u2026 (${w}s then hop)`),D();return}let i=Wc(t);if(i>0){let g=Math.ceil(i/1e3);y(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,g)}s`),D();return}let o=await me();if(!o?.cities?.length){Re();return}let r=new Set(Ki().map(g=>g.id)),s=o.cities.filter(g=>r.has(String(g.id)));if(!s.length){y("Preferred cities not found in the dropdown \u2014 pick cities again."),Re();return}let u=document.querySelector("#post_select"),f=u?String(u.value):"",d=Hc(s,f);if(!d){Z(t),D();return}if(await Uc(d.id,d.name)){vt=Date.now(),Z(vt);let g=s.map(v=>v.name||v.id).join(" \u2192 "),w=`${qe+1}/${s.length}`;y(`City Change \u2014 ${w} ${d.name||d.id} (path: ${g}); Loading up to ${yt()/1e3}s, no-dates hop ${Ut()/1e3}s`)}else Z(t);D()}finally{ot=!1,xt=0}}}async function Ln(){if(H||_()||!Tt())return;let t=await me();if(!t?.cities?.length)return;let e=new Set(Ki().map(s=>s.id)),n=t.cities.filter(s=>e.has(String(s.id)));if(!n.length){y("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}Ot(),tt(),P=!1,W=0,E=!1,ot=!1,xt=0,R=!0,Xt=Date.now(),Y=Date.now();let i=document.querySelector("#post_select"),o=i?String(i.value):"",r=n.findIndex(s=>String(s.id)===o);qe=r>=0?r:0,y(`City Change ON \u2014 IST ${st()}; hop 13\u201318s; slot alerts force-switch preferred cities`),fa(),ga(),D()}async function ya(){if(H||_()||!qi()||!l.alive||!(await me())?.cities?.length||!document.querySelector("#post_select"))return;if(!R){await Ln();return}let e=In();fa(),ga(),(e||!St&&!ot)&&(e&&(Z(Date.now()),y("City Change \u2014 auto-unstuck; next city in 13\u201318s\u2026")),D())}function ba(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function qn(){let t=ba();return!!(t&&!t.disabled)}function zi(){let t=ba();if(!t||t.disabled)return!1;try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}return l.send({action:"forceClickSubmit",prefix:m,pollMs:X,maxMs:En}),!0}function Yc(){return j()?qn():!1}function wa(){y("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function ji(t){if(H||_()||E)return;let e=await I(t);if(!Rt(e))return;$t(),E=!0,Ie();let n=Date.now(),i=!1,o=j()?Date.now():0,r=async f=>{if(!(i||!E||!l.alive)){if(i=!0,window.removeEventListener("message",s),bt&&(l.clear(bt),bt=null),_()){E=!1;return}if(E=!1,f){await Ue(t);return}ut(),y(R?"Auto Submit \u2014 Submit not clicked in time; City Change resuming\u2026":"Auto Submit \u2014 Submit not clicked in time; still watching\u2026")}},s=f=>{!l.alive||f.source!==window||f.data?.action===At.sub&&r(!0)};window.addEventListener("message",s);let u=async()=>{if(i||!E||!l.alive)return;let f=Date.now(),d=f-n;if(j()&&!o&&(o=f,y("Time slot selected \u2014 waiting for Submit to enable\u2026")),o&&f-o>=Mc&&(Yc()?(y("Submit enabled \u2014 clicking\u2026"),zi()):y("Waiting for Submit button to enable\u2026")),d>=En)return r(!1);bt=l.setTimeout(u,X)};u()}async function Sa(){if(!j()||E||H)return;let t=await at();t&&await ji(t.accountId)}function y(t){let e=document.querySelector(p(a.aiStatus));e&&(e.textContent=t)}function q(t){y(t)}function oa(t){return!!(t&&t.termsAgreed)}function xa(t){return!!(t&&t.termsPassed)}function An(){return!!document.querySelector(p(a.aiTermsAgree))?.checked}function Yi(t){let e=document.querySelector(p(a.aiTermsGate)),n=document.querySelector(p(a.aiMain)),i=document.querySelector(p(a.aiTermsAgree)),o=document.querySelector(p(a.aiTermsContinue)),r=xa(t);e&&e.classList.toggle(c.hidden,r),n&&n.classList.toggle(c.hidden,!r),i&&(i.checked=oa(t)||An()),o&&(o.disabled=!(oa(t)||An()))}function Vc(){let t=document.querySelector(p(a.aiTermsContinue)),e=An();t&&(t.disabled=!e),y(e?"Terms checked \u2014 tap Continue.":"Check Agree to continue.")}async function Xc(){if(!An()){y("Check Agree first.");return}let t=await L();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let e=await I(t)||{},{from:n,to:i}=ze(),o=Yt(),r=Rn();_t(),Qt(),Fi(),it=!0,lt=!0,await Ct(t,{termsAgreed:!0,termsPassed:!0,termsAgreedAt:e.termsAgreedAt||Date.now(),submitEnabled:!0,citiesEnabled:!0,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],slotWindows:r.length?r:e.slotWindows||null,confirmedAt:Date.now()}),await et(),rt(document.querySelector(p(a.aiSubmitSw)),!0),rt(document.querySelector(p(a.aiCitiesSw)),!0),it=!0,lt=!0,On(await I(t)),We((e.cities||[]).map(u=>u.id),{force:!0}),Vi(e),Yi(await I(t)),(Yt().length?Yt():e.cities||[]).length&&(Gi(),await Ln()),(n||e.from)&&(i||e.to)&&await Pn(),y("Auto Submit and City Change ON \u2014 set dates and preferred cities.")}function va(t){t?.slotWindows?.length?Vo(t.slotWindows):ci()}function Qc(t){let e="";for(let n=0;n<=59;n++){let i=Number(t)===n?" selected":"";e+=`<option value="${n}"${i}>:${String(n).padStart(2,"0")}</option>`}return e}function ra(t,e){let n=Math.min(Et,59-Number(t||0)),i="";for(let o=1;o<=Math.max(1,n);o++){let r=Number(e)===o?" selected":"";i+=`<option value="${o}"${r}>${o} min</option>`}return i}function Ca(t,e){let n=Number(t)||0,i=Number(e)||1,o=Math.min(59,n+i);return`Runs from :${String(n).padStart(2,"0")} up to :${String(o).padStart(2,"0")}`}function Rn(){let t=document.querySelector(p(a.aiWinList));if(!t)return[];let e=[];for(let n of t.querySelectorAll(`.${c.aiWinRow}`)){let i=Number(n.querySelector('select[data-win="from"]')?.value),o=Number(n.querySelector('select[data-win="dur"]')?.value);!Number.isFinite(i)||!Number.isFinite(o)||e.push({fromMin:i,durationMin:o})}return si(e)}function aa(t){let e=t.querySelector('select[data-win="from"]'),n=t.querySelector('select[data-win="dur"]'),i=t.querySelector(`.${c.aiWinHelp}`);!e||!n||!i||(i.textContent=Ca(e.value,n.value))}function Ta(t=0,e=6){let n=Math.min(Et,59-t),i=Math.min(Math.max(1,e||1),Math.max(1,n)),o=document.createElement("div");o.className=c.aiWinRow,o.innerHTML=`
    <div class="${c.aiInline}">
      <label class="${c.aiHead}">Start</label>
      <select data-win="from">${Qc(t)}</select>
      <label class="${c.aiHead}" style="margin-left:10px;color:#6b7280;font-weight:500">Duration</label>
      <select data-win="dur">${ra(t,i)}</select>
      <button type="button" class="${c.aiTrash}" data-win="del" title="Delete timing" aria-label="Delete">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
        </svg>
      </button>
    </div>
    <div class="${c.aiWinHelp}">${Ca(t,i)}</div>
  `;let r=o.querySelector('select[data-win="from"]'),s=o.querySelector('select[data-win="dur"]');return l.on(r,"change",()=>{let u=Number(r.value),f=Number(s.value)||1;s.innerHTML=ra(u,f),aa(o)}),l.on(s,"change",()=>aa(o)),l.on(o.querySelector('button[data-win="del"]'),"click",()=>{o.remove(),Xi()}),o}function Vi(t){let e=document.querySelector(p(a.aiWinList));if(!e)return;e.replaceChildren();let n=t?.slotWindows?.length?Xo(t.slotWindows):[];for(let i of n.slice(0,ht))e.appendChild(Ta(i.fromMin,i.durationMin));Xi(t)}function Xi(t){let e=document.querySelector(p(a.aiWinNote));e&&(t?.slotWindows?.length||Rn().length?e.textContent=`Custom windows active (max ${ht}, each \u2264 ${Et} min).`:e.textContent=`Using defaults: ${st()}. Add up to ${ht} windows below.`)}function rt(t,e){t&&(t.classList.toggle(c.aiOnBtn,!!e),t.setAttribute("aria-checked",e?"true":"false"))}function Jc(t){rt(document.querySelector(p(a.aiSubmitSw)),Rt(t)),rt(document.querySelector(p(a.aiCitiesSw)),qt(t))}var it=!1,lt=!1;function On(t){let e=Rt(t)||it,n=qt(t)||lt,i=document.querySelector(p(a.aiSubmitBody)),o=document.querySelector(p(a.aiCitiesBody));i&&i.classList.toggle(c.hidden,!e),o&&o.classList.toggle(c.hidden,!n)}function Zc(t,e){let n=document.querySelector(p(a.aiStatus)),i=document.querySelector(p(a.aiBtn));if(!n||!i)return;Jc(t),On(t);let o=Rt(t),r=qt(t),s=o||r;s?(i.classList.add(c.aiOn),i.textContent="Tik Tik ON"):(i.classList.remove(c.aiOn),i.textContent="Tik Tik");let u=[];o&&t.from&&t.to?u.push(`Auto Submit ON (${Vt(t.from)} \u2013 ${Vt(t.to)}, clicks Submit as soon as time slot is ready)`):it&&!o?u.push("Auto Submit \u2014 set From / To dates, then Enable again"):u.push("Auto Submit OFF"),r?u.push(`City Change ON (${Bc(t)}, ${st()})`):lt&&!r?u.push("City Change \u2014 pick preferred cities, then Enable again"):u.push("City Change OFF"),n.textContent=`Account ${e||"\u2014"}: ${u.join(" \xB7 ")}`,n.classList.toggle(c.aiOk,s)}async function et(){let t=await L();if(t)try{await ha(t)}catch{}let e=t?await I(t):null;Rt(e)||(it=!1),qt(e)||(lt=!1),va(e),Zc(e,t),Yi(e);let n=document.querySelector(p(a.aiFrom)),i=document.querySelector(p(a.aiTo));n&&(n.value=e?.from||""),i&&(i.value=e?.to||""),Ri();let o=(e?.cities||[]).map(S=>S.id),r=document.querySelector(p(a.aiPanel)),s=r&&!r.classList.contains(c.hidden),u=document.querySelector(p(a.aiCitiesBody)),f=u&&!u.classList.contains(c.hidden),d=ua();(f||qt(e)||lt)&&We(s&&d.length?d:o),Vi(e);let h=document.querySelector(p(a.aiLogin)),g=document.querySelector(p(a.aiPass));h&&e?.loginId&&(h.value=e.loginId),g&&e?.loginPass&&(g.value=e.loginPass);let w=e?.security||[],v=[a.aiQ1,a.aiQ2,a.aiQ3],K=[a.aiA1,a.aiA2,a.aiA3];v.forEach((S,O)=>{let pt=document.querySelector(p(S));pt&&(pt.innerHTML=$n(O,w[O]?.q||""))}),K.forEach((S,O)=>{let pt=document.querySelector(p(S));pt&&w[O]?.a&&(pt.value=w[O].a)});let k=document.querySelector(p(a.aiLoginBody)),z=k&&!k.classList.contains(c.hidden);Qi(!!z,cl(e))}function tl(){let t=document.querySelector(p(a.aiPanel));return!!(t&&!t.classList.contains(c.hidden))}function Ei(t){let e=document.querySelector(p(a.aiPanel));e&&(t||Lt(),e.classList.toggle(c.hidden,!t),t&&L().then(async n=>{if(n)try{Di=null,await ha(n)}catch{}let i=n?await I(n):null;Yi(i),xa(i)?We((i?.cities||[]).map(o=>o.id),{force:!0}):y("Read the terms, check Agree, then Continue.")}))}function Ii(){if(Ii._done)return;Ii._done=!0;let t=e=>{if(!tl())return;let n=document.querySelector(p(a.aiPanel)),i=document.querySelector(p(a.aiBtn)),o=document.querySelector(p(a.aiCal)),r=Oi(e);if(!(o&&!o.classList.contains(c.hidden)&&r&&o.contains(r))){if(o&&!o.classList.contains(c.hidden)){let s=document.querySelector(p(a.aiFromBtn)),u=document.querySelector(p(a.aiToBtn));!(s&&r&&(s===r||s.contains(r)))&&!(u&&r&&(u===r||u.contains(r)))&&Lt()}n&&r&&(n===r||n.contains(r))||i&&r&&(i===r||i.contains(r))||(Lt(),Ei(!1))}};l.on(document,"pointerdown",t,{capture:!0})}async function el(t){let e=await L();if(!e){y("Open a logged-in schedule page so we can bind this to your account.");return}let n=await I(e)||{},{from:i,to:o}=ze();if(i=i||n.from||null,o=o||n.to||null,t){it=!0,rt(document.querySelector(p(a.aiSubmitSw)),!0),_t(),Qt(),Fi(),await Ct(e,{submitEnabled:!0,from:i||null,to:o||null,confirmedAt:Date.now()});let r=document.querySelector(p(a.aiFrom)),s=document.querySelector(p(a.aiTo));if(r&&i&&(r.value=i),s&&o&&(s.value=o),Ri(),await et(),rt(document.querySelector(p(a.aiSubmitSw)),!0),it=!0,On(await I(e)),!i||!o){y("Auto Submit ON \u2014 select From and To dates to start booking.");return}if(i>o){y("Auto Submit ON \u2014 From date must be before To date.");return}it=!1,y(`Auto Submit ON (${Vt(i)} \u2013 ${Vt(o)})`),await Pn();return}it=!1,Qt(),rt(document.querySelector(p(a.aiSubmitSw)),!1),await Ct(e,{submitEnabled:!1,from:i||n.from,to:o||n.to}),await et(),y("Auto Submit OFF")}async function nl(t){let e=await L();if(!e){y("Open a logged-in schedule page so we can bind this to your account.");return}let n=await I(e)||{};if(t){lt=!0,rt(document.querySelector(p(a.aiCitiesSw)),!0),We((n.cities||[]).map(s=>s.id),{force:!0}),Vi(n);let o=Yt();!o.length&&n.cities?.length&&(o=n.cities);let r=Rn();if(_t(),await Ct(e,{citiesEnabled:!0,cities:o.length?o:n.cities||[],slotWindows:r.length?r:n.slotWindows||null}),await et(),rt(document.querySelector(p(a.aiCitiesSw)),!0),lt=!0,On(await I(e)),o.length||We([],{force:!0}),!o.length){y("City Change ON \u2014 select at least one preferred city to start hopping.");return}lt=!1,Gi(),await Ln(),y(`City Change ON (${o.map(s=>s.name||s.id).join(", ")})`);return}lt=!1,Re(),rt(document.querySelector(p(a.aiCitiesSw)),!1);let i=Yt();await Ct(e,{citiesEnabled:!1,cities:i.length?i:n.cities||[]}),await et(),y("City Change OFF")}async function sa(){let t=await L();if(!t)return;let e=await I(t)||{};if(!Rt(e)&&!it)return;let{from:n,to:i}=ze();!n||!i||n>i||(await Ct(t,{submitEnabled:!0,from:n,to:i,confirmedAt:Date.now()}),it=!1,await et(),rt(document.querySelector(p(a.aiSubmitSw)),!0),_t(),Fi(),y(`Auto Submit ON (${Vt(n)} \u2013 ${Vt(i)})`),await Pn())}function il(t){return(t||[]).map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", ")}async function ol(){let t=document.querySelector(p(a.aiWinList));if(t){if(t.querySelectorAll(`.${c.aiWinRow}`).length>=ht){y(`Max ${ht} timing windows.`);return}t.appendChild(Ta(0,Math.min(6,Et))),Xi()}}async function rl(){let t=await L();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let e=Rn();if(!e.length){y("Add at least one timing (or Reset to defaults).");return}await Ct(t,{slotWindows:e}),await et(),y(`Saved ${e.length} custom timing(s): ${il(e)}`)}async function al(){let t=await L();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}window.confirm("Reset to default IST windows? Your custom timings will be removed.")&&(await Ct(t,{slotWindows:null}),ci(),await et(),y(`Using default windows: ${st()}`))}async function sl(){let t=await L();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let{from:e,to:n}=ze(),i=Yt(),o=document.querySelector(p(a.aiLogin))?.value?.trim(),r=document.querySelector(p(a.aiPass))?.value,s=[0,1,2].map(u=>({q:document.querySelector(p([a.aiQ1,a.aiQ2,a.aiQ3][u]))?.value?.trim()||"",a:document.querySelector(p([a.aiA1,a.aiA2,a.aiA3][u]))?.value?.trim()||""}));if(!o||!r){y("Enter ID and password before saving.");return}if(s.some(u=>!u.q||!u.a)){y("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}await Ct(t,{}),Qi(!0,!0),y("Saved ID, password, and 3 security questions (1 from each set).")}function cl(t){let e=t?.security||[];return!!(t?.loginId&&t?.loginPass&&e.length>=3&&e.every(n=>n?.q&&n?.a))}function Qi(t,e){let n=document.querySelector(p(a.aiLoginToggle));if(!n)return;let i=t?"\u25BE":"\u25B8";n.textContent=e?`Login details (saved) ${i}`:`Login details ${i}`}function ll(){let t=document.querySelector(p(a.aiLoginBody)),e=document.querySelector(p(a.aiLoginToggle));if(!t||!e)return;let n=t.classList.contains(c.hidden);t.classList.toggle(c.hidden,!n);let i=/saved/i.test(e.textContent||"");Qi(n,i)}function Ji(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==a.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==a.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===a.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function Pi(){document.querySelector(p(a.aiPanel))?.remove(),document.querySelector(p(a.aiBtn))?.remove(),Ji()}function ul(){if(_())return;if(!qi()){Pi();return}if(document.querySelector(p(a.aiBtn)))if(!document.querySelector(p(a.aiSubmitSw))||!document.querySelector(p(a.aiTermsContinue))||!document.querySelector(p(a.aiFromBtn)))Pi();else return;let t=or();if(!t)return;let e=document.createElement("button");e.id=a.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[$.mark]="",l.on(e,"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiPanel)),r=o&&o.classList.contains(c.hidden);Ei(!!r)}),t.appendChild(e);let n=document.createElement("div");n.id=a.aiPanel,n.className=c.hidden,n.dataset[$.mark]="",n.innerHTML=`
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
              <select id="${a.aiQ1}">${$n(0)}</select>
            </label>
            <label>Your answer for set 1
              <input type="text" id="${a.aiA1}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${c.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 2 \u2014 choose 1 question
              <select id="${a.aiQ2}">${$n(1)}</select>
            </label>
            <label>Your answer for set 2
              <input type="text" id="${a.aiA2}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${c.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 3 \u2014 choose 1 question
              <select id="${a.aiQ3}">${$n(2)}</select>
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
  `,t.insertAdjacentElement("afterend",n),l.on(n.querySelector(p(a.aiSubmitSw)),"click",async()=>{let i=await L(),o=i?await I(i):null;await el(!Rt(o))}),l.on(n.querySelector(p(a.aiCitiesSw)),"click",async()=>{let i=await L(),o=i?await I(i):null;await nl(!qt(o))}),l.on(n.querySelector(p(a.aiWinAdd)),"click",ol),l.on(n.querySelector(p(a.aiWinSave)),"click",rl),l.on(n.querySelector(p(a.aiWinReset)),"click",al),l.on(n.querySelector(p(a.aiSaveLogin)),"click",sl),l.on(n.querySelector(p(a.aiLoginToggle)),"click",ll),l.on(n.querySelector(p(a.aiClose)),"click",()=>Ei(!1)),l.on(n.querySelector(p(a.aiCitiesAll)),"click",()=>ia(!0)),l.on(n.querySelector(p(a.aiCitiesNone)),"click",()=>ia(!1)),l.on(n.querySelector(p(a.aiTermsAgree)),"change",()=>{Vc()}),l.on(n.querySelector(p(a.aiTermsContinue)),"click",()=>{Xc()}),l.on(n.querySelector(p(a.aiFromBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiCal));if(o&&!o.classList.contains(c.hidden)&&Q.which==="from"){Lt();return}Qr("from",i.currentTarget)}),l.on(n.querySelector(p(a.aiToBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(p(a.aiCal));if(o&&!o.classList.contains(c.hidden)&&Q.which==="to"){Lt();return}Qr("to",i.currentTarget)}),Ii(),et()}function dl(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",l.on(e,"click",()=>{L().then(n=>{Ue(n||null)})}))};t(document.querySelector("#submitbtn")),l.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function Zi(){if(l.alive&&!_()){if(!qi()){Pi();return}await l.waitFor("#post_select",{attempts:nn})&&(Rr(t=>{let e=String(t?.message||t?.source||"error").slice(0,120);Ne(e)}),ul(),Gi(),dl(),!na&&(na=!0,l.setTimeout(()=>et(),800),l.setTimeout(async()=>{await at()&&await Pn()},1500)))}}var _a=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function $a(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function fl(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=$a(t.data.url),i=new URLSearchParams(t.data.request||"").get("parameters");if(!i)return null;let o;try{o=JSON.parse(i)}catch{return null}return{params:o,tail:e,response:t.data.response}}async function ml(t,e={}){t?.length&&(await vr(t,e),await x("audioAlert")&&lr())}async function pl(t,e=!1){if(e||_())return null;let n=new Date;n.setHours(0,0,0,0);let i=(t||[]).map(s=>{if(!s)return null;let u=Wn(s.Date);return u?{...s,Date:u}:null}).filter(Boolean).filter(s=>{let[u,f,d]=s.Date.slice(0,10).split("-").map(Number);return!u||!f||!d?!1:new Date(u,f-1,d)>=n}).sort((s,u)=>String(s.Date).localeCompare(String(u.Date))),o=await at();if(o){let s=i.filter(f=>Ge(f.Date,o.from,o.to));if(!s.length)return null;let u=Be(s.length);return s[u]?.Date||null}if(!await x("autoSelectFirstDate")||!i.length)return null;let r=Be(i.length);return i[r]?.Date||null}function Wn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,r,s]=n;return`${s}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime())){let r=o.getFullYear(),s=String(o.getMonth()+1).padStart(2,"0"),u=String(o.getDate()).padStart(2,"0");return`${r}-${s}-${u}`}}return null}function hl(t){if(!t)return!1;let[e,n,i]=t.slice(0,10).split("-").map(Number);if(!e||!n||!i)return!1;let o=n-1,r=String(n).padStart(2,"0")+"/"+String(i).padStart(2,"0")+"/"+e,s=document.querySelector("#datepicker");if(s){let u=String(s.value||"").trim();if(u===r)return!0;if(u.includes(String(e))&&u.includes(String(i).padStart(2,"0"))){let f=u.split(/[/-]/).map(d=>parseInt(d,10));if(f.length>=3){let d,h,g;if(f[2]>31?(h=f[0],g=f[1],d=f[2]):(d=f[0],h=f[1],g=f[2]),d===e&&h===n&&g===i)return!0}}try{let f=window.jQuery||window.$;if(f&&f(s).hasClass("hasDatepicker")){let d=f(s).datepicker("getDate");if(d&&d.getFullYear()===e&&d.getMonth()===o&&d.getDate()===i)return!0}}catch{}}for(let u of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let f=u.querySelector("a");if(!f)continue;let d=parseInt(u.getAttribute("data-month"),10),h=parseInt(u.getAttribute("data-year"),10),g=parseInt(f.textContent,10);if(h===e&&d===o&&g===i)return!0}return!1}var Nn=null;function gl(t,e){Nn&&l.clear(Nn);let n=Date.now()+(e?He:8e3),i=()=>{!l.alive||Date.now()>n||hl(t)||(l.send({action:"selectFirstDate",date:t,maxMs:e?He:8e3,pollMs:X}),Nn=l.setTimeout(i,X))};Nn=l.setTimeout(i,80)}function ka(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function yl(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function Ma(t){return t?.length?t.map((e,n)=>({entry:e,index:n,avail:yl(e)})).sort((e,n)=>n.avail!==e.avail?n.avail-e.avail:e.index-n.index):[]}function bl(t){let e=Ma(t);return e.length?{entry:e[0].entry,slotIndex:e[0].index}:{entry:null,slotIndex:0}}function Aa(){Jt&&(l.clear(Jt),Jt=null)}async function wl(t){let e=Date.now()+Math.max(0,Number(t)||0);for(;l.alive&&Date.now()<e;){if(Fe()||_())return!1;if(j()&&qn())return!0;await new Promise(n=>l.setTimeout(n,X))}return!!(j()&&qn())}var Da=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),Ea=null,Sl=null,Jt=null;function xl(t,e){Ea=t,Sl=e?String(e).slice(0,10):null}function vl(t,e=0){Jt&&l.clear(Jt);let n=t?String(t).slice(0,10):null,i=0,o=async()=>{if(!l.alive||Fe()||++i>240||j())return;let r=(Ea||[]).filter(s=>s&&s.Time);if(r.length){let{entry:s,slotIndex:u}=bl(r);if(q(`Watchdog: picking time slot #${u+1}\u2026`),await De({time:ka(s.Time),date:s.Date?String(s.Date).slice(0,10):n,slotIndex:u,pollMs:X,maxMs:600,prefix:m}),j())return}else if(document.querySelector(Da)&&(q("Watchdog: picking visible time slot\u2026"),await De({time:"00:00",date:n,slotIndex:e,pollMs:X,maxMs:600,prefix:m}),j()))return;Jt=l.setTimeout(o,X)};Jt=l.setTimeout(o,300)}var Cl=["#datepicker.hasDatepicker","#datepicker"].join(", ");async function Tl(t,e=!1){if(e)return null;let n=await pl(t,e);if(!n)return null;let i=await at(),o=new Date;o.setHours(0,0,0,0);let r=(t||[]).map(f=>Wn(f?.Date)).filter(Boolean).filter(f=>{let[d,h,g]=f.slice(0,10).split("-").map(Number);return new Date(d,h-1,g)>=o}).sort((f,d)=>f.localeCompare(d)),s=i?r.filter(f=>Ge(f,i.from,i.to)):r,u=Be(s.length);return q(`Selecting date #${u+1}: ${n} (fast)\u2026`),await l.waitFor(Cl,{attempts:80,interval:X}),l.send({action:"selectFirstDate",date:n,maxMs:i?He:8e3,pollMs:X}),gl(n,i),vl(n,Dn),n}async function _l(t,e=!1){if(e||_()||Fe())return;let n=await at();if(!n&&!await x("autoSelectFirstDate"))return;Aa();let i=(t||[]).filter(u=>!(!u||!u.Time||u.EntriesAvailable!=null&&Number(u.EntriesAvailable)<=0));n&&(i=i.filter(u=>{let f=u.Date?String(u.Date).slice(0,10):null;return f?f>=n.from&&f<=n.to:!0}));let o=Ma(i);if(!o.length)return;let r=Date.now()+1e4;for(;Date.now()<r&&l.alive&&!(Er(i)||document.querySelector(Da));)await new Promise(u=>l.setTimeout(u,X));let s=o.length===1?En:ca;q(o.length===1?`1 time slot \u2014 try highest avail, wait \u2264${s/1e3}s for Submit\u2026`:`${o.length} time slots \u2014 try highest\u21922nd\u21923rd\u2026 (${s/1e3}s each for Submit)`);for(let u=0;u<o.length;u++){if(!l.alive||Fe()||_())return;let{entry:f,index:d,avail:h}=o[u],g=ka(f.Time),w=f.Date?String(f.Date).slice(0,10):null,v=u===0?"highest":u===1?"2nd-highest":u===2?"3rd-highest":`${u+1}th-highest`;if(q(`Trying ${v} avail (${h}) @ ${g} \u2014 slot ${u+1}/${o.length}\u2026`),!await De({time:g,date:w,slotIndex:d,pollMs:X,maxMs:4e3,prefix:m})&&!j()){q(`Could not click ${g} \u2014 trying next\u2026`);continue}if(q(`Selected ${g} (${v}) \u2014 waiting \u2264${s/1e3}s for Submit to enable\u2026`),await wl(s)){q(`Submit enabled on ${g} \u2014 clicking\u2026`),n?await ji(n.accountId):zi();return}u<o.length-1&&q(`Submit still disabled on ${g} \u2014 trying next (${u+2}/${o.length})\u2026`)}q(`Tried all ${o.length} time slot(s); Submit never enabled.`),n&&ut()}async function Ia(t){if(!N()||_())return;let e;try{e=fl(t)}catch{return}if(e==null)return;if(Or(e),e.retryAfter!==void 0){let r=Number(e.retryAfter);Bo(e.cgiBlock,r),r?(mn(r),Bi(r)):x("defaultWaitTime").then(s=>{mn(s),Bi(s)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let r=e.response.Posts||[],s=new Map((await Mt()).map(u=>[u.ID,u]));for(let u of r)s.set(u.ID,{...s.get(u.ID),...u});await ee([...s.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let r=e.response.Members||[];if(r.length){let s=await G()||{},u=s.name&&r.find(f=>f.FullName===s.name);s.visa=(u||r[0]).VisaClassName,await T({profile:s,members:r})}}if(_a.includes(e.tail)){_t(),mr(e);let r=(e.response.ScheduleDays||[]).map(g=>Wn(g?.Date)).filter(Boolean).length;r&&q(`${r} date${r===1?"":"s"} available \u2014 see list below`),pa();let s=await at();await me()||x("defaultWaitTime").then(g=>{mn(g)});let f=await Mt(),d=f.find(g=>g.ID===e.params.postId);d&&(d.Days=e.response.ScheduleDays,d.Updated=Date.now(),d.HasError=e.response.HasError,d.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,ee(f)),await ml(e.response.ScheduleDays,{postId:e.params.postId,postName:d?.Name,hasError:e.response.HasError}),!e.response.HasError&&r>0&&Br({postId:e.params.postId,postName:d?.Name,dayCount:r}).catch(()=>{}),await Cr(e.response.ScheduleDays,{postId:e.params.postId,postName:d?.Name,hasError:e.response.HasError}),Ke()?($t(),q("Submit pending \u2014 staying on this city (date reload ignored)\u2026")):s&&!e.response.HasError?Wi(e.response.ScheduleDays,s.from,s.to).length?$t():ut():s&&ut();let h=Ke()?null:await Tl(e.response.ScheduleDays,e.response.HasError);if(h)$t(),await Tr(d?.Name,h);else if(s&&!e.response.HasError&&!Ke()){let g=(e.response.ScheduleDays||[]).map(v=>Wn(v?.Date)).filter(Boolean),w=g.filter(v=>Ge(v,s.from,s.to));g.length&&!w.length?(ut(),q(`Dates found but none in ${s.from} \u2192 ${s.to}. Next city in 13\u201318s\u2026`)):g.length||(ut(),q("No dates on this city \u2014 next city in 13\u201318s\u2026"))}await ii()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let r=e.params.Date.split("T")[0];xl(e.response.ScheduleEntries,r),Aa();let s=await Mt(),u=s.filter(d=>d.Days&&d.Updated).sort((d,h)=>h.Updated-d.Updated).find(d=>d.Days.some(h=>h.Date===r));if(u){let d=u.Days.find(h=>h.Date===r);d&&(d.Times=e.response.ScheduleEntries,ee(s))}let f=(e.response.ScheduleEntries||[]).filter(d=>d&&d.Time);if(pr(f,r,u?.Name),f.length){let d=f.filter(w=>w.EntriesAvailable==null||Number(w.EntriesAvailable)>0),h=d.reduce((w,v)=>{let K=Number(v.EntriesAvailable);return w+(Number.isFinite(K)?K:0)},0),g=h>0?` \xB7 ${h} available`:"";q(`${d.length||f.length} time slot${(d.length||f.length)===1?"":"s"} on ${r}${g}`)}await _l(e.response.ScheduleEntries,e.response.HasError),Ke()?($t(),q("Submit pending \u2014 staying on this city (time reload ignored)\u2026")):f.length?($t(),await _r(u?.Name,e.params.Date,f.length)):(ut(),q("No time slots on this date \u2014 next city in 13\u201318s\u2026")),await ii()}}function Pa(t){if(!N()||_())return;let e=$a(t.data.url);_a.includes(e)&&ar()}var Zt=null,eo="",to={scanning:"Scanning for Cloudflare challenge\u2026",dom:"Trying page-level verify click\u2026",debugger:"Advanced click \u2014 targeting Turnstile iframe\u2026",retry:"Waiting before next attempt\u2026",success:"Verification passed \u2014 continuing\u2026",manual:"Stuck? Click the checkbox once, then we\u2019ll continue."};function La(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=c.cfFlash,n.dataset[$.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),l.setTimeout(()=>n.remove(),1200)}}function $l(){let t=document.querySelector(p(a.cfHud));return t||(t=document.createElement("div"),t.id=a.cfHud,t.dataset[$.mark]="",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.innerHTML=`
    <div class="${c.cfHud}">
      <div class="${c.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">\u{1F6E1}</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${to.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `,document.documentElement.appendChild(t),t)}async function B(t,e){if(!chrome.runtime?.id||!l.alive||!await x("autoCloudflareTick"))return;let n=$l(),i=n.querySelector("[data-cf-msg]"),o=n.querySelector("[data-cf-sub]"),r=n.querySelector("[data-cf-chip]"),s=n.querySelector(`.${c.cfHud}`);eo=t,i&&(i.textContent=to[t]||to.scanning),o&&(o.textContent=e||kl(t)),r&&(r.textContent=t==="success"?"Done":t==="manual"?"Help":"Active",r.dataset.state=t),s&&(s.dataset.state=t),Zt&&(l.clear(Zt),Zt=null),t==="success"&&(Zt=l.setTimeout(()=>no(),2800))}function kl(t){return t==="debugger"?"Precision click via advanced browser bridge":t==="dom"?"Standard page interaction":t==="manual"?"One manual click is usually enough":t==="success"?"Resuming login and recovery":"Monitoring this tab for Turnstile"}function no(){let t=document.querySelector(p(a.cfHud));t&&t.remove(),eo="",Zt&&(l.clear(Zt),Zt=null)}function io(){return eo}var Ml=/we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i,Al=/\bUSG\s+[a-f0-9-]{8,}/i;var ro="vsPortalErrorReloadCount",Oa="vsPortalErrorReloadAt",Dl=2e3,El=1e4,qa=!1,he=null,Il=null;function Pl(){return(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim()}function ge(){let t=Pl().slice(0,6e3);return t?!!(/a timeout occurred/i.test(t)&&(/error\s*524/i.test(t)||/origin web server timed out/i.test(t)||/cloudflare ray id/i.test(t))||/error\s*524/i.test(t)&&/cloudflare/i.test(t)&&t.length<8e3||Ml.test(t)&&(Al.test(t)||/error id\s*#/i.test(t))||/we'?re sorry,\s*but something went wrong/i.test(t)&&t.length<2500):!1}function Na(){try{return Math.max(0,Number(sessionStorage.getItem(ro)||0))}catch{return 0}}function Ll(){try{let t=Na()+1;return sessionStorage.setItem(ro,String(t)),sessionStorage.setItem(Oa,String(Date.now())),t}catch{return 1}}function oo(){try{sessionStorage.removeItem(ro),sessionStorage.removeItem(Oa)}catch{}}function ql(t){return Math.min(El,Dl+Math.max(0,t-1)*1e3)}function Rl(){he&&(l.clear(he),he=null)}function Ol(){Ll();try{location.reload()}catch{}}function Ra(){if(!l.alive||he)return;if(!ge()){oo();return}let t=Na()+1,e=ql(t);he=l.setTimeout(()=>{if(he=null,!!l.alive){if(!ge()){oo();return}Ol()}},e)}function Wa(){if(qa)return;qa=!0;let t=()=>{l.alive&&(ge()?Ra():(oo(),Rl()))};t(),Il=l.setInterval(t,1500);try{let e=new MutationObserver(()=>{l.alive&&ge()&&Ra()});e.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),l.disposable(()=>e.disconnect())}catch{}}var Hn="vsDebugLogs",Nl=200;function Wl(){try{return new Date().toLocaleTimeString("en-IN",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})}catch{return new Date().toISOString().slice(11,19)}}async function F(t,e,n){let i={at:Date.now(),t:Wl(),tag:String(t||"app").slice(0,24),msg:String(e||"").slice(0,400)};if(n!=null)try{i.data=JSON.parse(JSON.stringify(n))}catch{i.data=String(n).slice(0,200)}try{console.log(`[VS6 ${i.tag}] ${i.msg}`,n!==void 0?n:"")}catch{}try{let o=await C({[Hn]:[]}),r=Array.isArray(o[Hn])?o[Hn].slice():[];for(r.push(i);r.length>Nl;)r.shift();await T({[Hn]:r})}catch{}}var Fn=null,Ye=0,je=null,kt=0;async function Hl(){try{let e=(await C("humanClickProfile")).humanClickProfile,n=e?.liveTrained&&e.samples?.length||0;return n<5?15e3:n<20?1e4:n<50?6e3:3500}catch{return 12e3}}var so=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function J(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!U()&&!io()}function U(){if(ge()||document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return so.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:ao().length>0}function Bn(t){return new Promise(e=>setTimeout(e,t))}function Bl(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let i of n.querySelectorAll("*"))i.shadowRoot&&(t.push(i.shadowRoot),e.push(i.shadowRoot))}return t}function ao(){let t=[],e=new Set,n=i=>{if(!i||e.has(i))return;let o=i.getBoundingClientRect();if(o.width<40||o.height<20||o.width>900||o.height>400)return;let r=(i.src||i.getAttribute?.("src")||"").toLowerCase(),s=(i.title||i.getAttribute?.("title")||"").toLowerCase(),u=(i.className?.toString?.()||"").toLowerCase(),f=(i.id||"").toLowerCase(),d=i.tagName==="IFRAME"&&(r.includes("challenges.cloudflare")||r.includes("turnstile")||s.includes("cloudflare")||s.includes("security challenge")),h=u.includes("cf-turnstile")||u.includes("turnstile")||f.includes("turnstile")||f.includes("challenge")||i.hasAttribute?.("data-sitekey")||i.hasAttribute?.("data-turnstile-widget");if(!d&&!h)if(i.tagName==="IFRAME"&&o.width>=120&&o.width<=420&&o.height>=45&&o.height<=120){if(!so.test(document.body?.innerText||""))return}else return;e.add(i),t.push({el:i,rect:o})};for(let i of Bl()){for(let o of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let r of i.querySelectorAll(o))n(r);for(let o of i.querySelectorAll("iframe"))n(o)}return t}function Fl(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function Ul(t){let e=[],n=new Set,i=(o,r)=>{if(!Number.isFinite(o)||!Number.isFinite(r)||o<1||r<1||o>window.innerWidth-1||r>window.innerHeight-1)return;let s=`${Math.round(o)},${Math.round(r)}`;n.has(s)||(n.add(s),e.push({x:Math.round(o),y:Math.round(r)}))};for(let{rect:o}of t){let r=o.top+o.height/2,s=o.left+Math.min(28,Math.max(18,o.width*.11));for(let u of[0,-4,4,-8,8,12,16,20,24,28,32])for(let f of[0,-3,3,-6,6])i(s+u,r+f);i(o.left+o.width*.5,r)}return e}function Kl(t){for(let{el:e,rect:n}of t)try{e.click();let i=n.left+Math.min(26,n.width*.12),o=n.top+n.height/2,r=document.elementFromPoint(i,o)||e;for(let s of["pointerdown","mousedown","mouseup","pointerup","click"])r.dispatchEvent(new MouseEvent(s,{bubbles:!0,cancelable:!0,clientX:i,clientY:o,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let i=n.getBoundingClientRect();if(i.width<4&&i.height<4)continue;let o=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!o.includes("human")&&!o.includes("verify")&&e==="input[type='checkbox']"){let r=n.closest("label, div, form");if(!so.test(r?.textContent||""))continue}return n.click(),!0}return!1}async function Ha(t){t.length&&(La(t.slice(0,3)),l.send({action:"viewportClickPoints",points:t}),await x("cloudflareDebuggerClick")?(await B("debugger","Trained click on Verify you are human\u2026"),l.send({action:"cloudflareDebuggerClick",points:t,primaryOnly:!0})):await B("dom"))}async function Un(){if(!await x("autoCloudflareTick"))return!1;if(J())return kt&&F("cf","challenge already solved"),kt=0,await B("success"),!0;kt||(kt=Date.now(),F("cf","challenge seen \u2014 train window started"));let t=await Hl();if(Date.now()-kt<t)return await B("scanning","Train window \u2014 click Verify you are human yourself (recording your mouse)\u2026"),!1;F("cf","train window done \u2014 attempting auto click"),await B("scanning","Verify you are human page \u2014 preparing click\u2026");let e=ao();Fl(e),await Bn(350),e=ao();let n=Ul(e);return n.length&&(await Ha(n),await Bn(1200),J()||!U())?(kt=0,await B("success"),!0):(await B("dom"),Kl(e),await Bn(600),J()||!U()?(kt=0,await B("success"),!0):n.length&&(await Ha(n),await Bn(1e3),J()||!U())?(kt=0,await B("success"),!0):(Ye++,Ye>=8?await B("manual","Click the checkbox once \u2014 we will continue after."):await B("retry",`Retry ${Ye}/8\u2026`),!1))}function Gl(){je||(je=new MutationObserver(()=>{l.alive&&U()&&!J()&&Un()}),je.observe(document.documentElement,{childList:!0,subtree:!0}),l.disposable(()=>{je?.disconnect(),je=null}))}function co(){Fn&&(l.clear(Fn),Fn=null),Ye=0,kt=0,no()}async function lo(){if(co(),!await x("autoCloudflareTick"))return;Gl();let t=async()=>{if(l.alive&&await x("autoCloudflareTick")){if(U()&&!J()){await Un();return}io()&&(Ye=0,await B("success"))}};t(),Fn=l.setInterval(t,1800)}var ye="sessionRecovery",uo="homeKeepaliveAt",fo="homeLoadingStuckAt",Ba=2e3,Gn=!1,Fa=null,mo=null,po=null,Kn=null,Ve=0;function Ua(){return b.homeKeepaliveMinMs}function zl(){return b.homeKeepaliveMaxMs}function jl(){return b.homeKeepaliveDebounceMs}function Ka(){return b.loadingStuckMs}function Yl(){return b.loadingStuckDebounceMs}function Ga(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function Vl(t,e){let n=Ga(t);if(!n)return"";let i="",o=0;for(let r of e||[]){let s=Ga(r.q);if(!s||!r.a)continue;if(n.includes(s)||s.includes(n))return r.a;let u=s.split(" ").filter(h=>h.length>3),f=0;for(let h of u)n.includes(h)&&f++;let d=u.length?f/u.length:0;d>o&&d>=.5&&(o=d,i=r.a)}return i}async function Xl(){let t=await C([Pt,"profile"]),e=t[Pt]||{},n=t.profile?.id?String(t.profile.id):null,i=n?e[n]:null;return i||(i=Object.values(e).find(o=>o?.loginId&&o?.loginPass)||null),i||{}}function za(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,i=Object.getOwnPropertyDescriptor(n,"value")?.set;i?i.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function Nt(t){return new Promise(e=>setTimeout(e,t))}function dt(t,e){return t+Math.random()*(e-t)}async function ho(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await Nt(dt(250,600)),za(t,"");let i="";for(let o=0;o<n.length;o++){let r=n[o];i+=r,za(t,i),t.dispatchEvent(new KeyboardEvent("keydown",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:r,bubbles:!0}));let s=dt(90,220);/[\s@._]/.test(r)&&(s+=dt(120,320)),Math.random()<.08&&(s+=dt(200,450)),await Nt(s)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await Nt(dt(200,500))}var zn=!1,jn=!1;function Yn(t){return!t||t.disabled?!1:(t.click(),!0)}function Ql(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let i of t){let o=(i.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(o))continue;let r=i.querySelector("input[type='checkbox']")||document.getElementById(i.getAttribute("for")||"");r&&!r.checked&&(Yn(r),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(i=>/^(continue|ok|accept|agree)$/i.test((i.textContent||i.value||"").trim()));return e&&n&&Yn(n),e>0}function ja(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function Jl(t){if(zn)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;zn=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await ho(e,t.loginId),await Nt(dt(400,900))),n&&t.loginPass&&!n.value&&(await ho(n,t.loginPass),await Nt(dt(500,1100)));let i=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(o=>/sign in|log in|continue/i.test(o.textContent||o.value||""));return i&&(n?.value||t.loginPass)?(await Nt(dt(600,1400)),Yn(i),!0):!!(e||n)}finally{zn=!1}}async function Zl(t){if(jn)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let o of n){let r=(o.textContent||"").trim();if(r.length<12||r.length>220||!/\?/.test(r)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(r))continue;let s=o.querySelector("input[type='text']")||document.getElementById(o.getAttribute("for")||"")||o.parentElement?.querySelector("input[type='text']");s&&s.offsetParent!==null&&e.push({text:r,input:s})}for(let o of["kba1_response","kba2_response","kba3_response"]){let r=document.getElementById(o);if(!r)continue;let u=(r.closest(".form-group, .entry, li, div")||r.parentElement)?.textContent||"";e.some(f=>f.input===r)||e.push({text:u,input:r})}let i=[];for(let{text:o,input:r}of e){if(r.value)continue;let s=Vl(o,t.security);s&&i.push({input:r,ans:s})}if(!i.length)return!1;jn=!0;try{for(let{input:r,ans:s}of i)await ho(r,s),await Nt(dt(350,800));await Nt(dt(600,1400));let o=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(r=>/continue|submit|verify/i.test(r.textContent||r.value||""));return o&&Yn(o),!0}finally{jn=!1}}function Ya(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||U()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function Wt(){return Tt()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function tu(t=""){return/\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(t||""))}function go(){if(Wt()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||U()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}function eu(t){return!!(t?.loginId&&t?.loginPass)}function nu(){return Ya()?!1:!!(ja()||document.querySelector("#kba1_response, #kba2_response, #kba3_response")||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))}async function iu(){let t=(await C(ye))[ye],e=!!t?.active,n=await Xl();if(U()){await Un();return}if(Ql(),Ya()){e&&(await T({[ye]:{...t,active:!1,doneAt:Date.now()}}),l.send({action:"recoveryReturnToOfc"}));return}nu()&&eu(n)&&await x("autofillLogin")&&(await Zl(n)||(ja()||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))&&await Jl(n))}function Va(){if(!go()||Fa)return;let t=async()=>{l.alive&&await iu()};t(),Fa=l.setInterval(t,1200)}function Xa(){return Ua()+Math.random()*(zl()-Ua())}async function Qa(){try{let t=await C(uo),e=Number(t[uo])||0;return Date.now()-e<jl()?!1:(await T({[uo]:Date.now()}),!0)}catch{return!0}}function Ja(){if(Wt()||!go()||document.querySelector("#post_select")||mo)return;let t=()=>{l.alive&&(mo=l.setTimeout(async()=>{if(mo=null,!l.alive||Wt()||tu(location.href)||document.querySelector("#post_select")||!go())return;if(zn||jn||Gn){t();return}if((await C(ye))[ye]?.active){t();return}if(!await Qa()){t();return}try{location.reload()}catch{t()}},Xa()))};t()}function Za(){if(!Wt()||po)return;let t=()=>{l.alive&&(po=l.setTimeout(async()=>{if(po=null,!(!l.alive||!Wt())){if(await Qa())try{l.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}t()}},Xa()))};t()}async function ou(){try{let t=await C(fo),e=Number(t[fo])||0;return Date.now()-e<Yl()?!1:(await T({[fo]:Date.now()}),!0)}catch{return!0}}function ts(){if(!Wt()||Kn)return;let t=async()=>{if(Kn=null,!(!l.alive||!Wt())){try{if(Hi()){if(Ve||(Ve=Date.now()),Date.now()-Ve>=Ka()){if(await ou()){try{q(`Date Loading stuck \u2265${Ka()/1e3}s \u2014 reloading Application Home\u2026`)}catch{}try{l.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}}Ve=Date.now()}}else Ve=0}catch{}l.alive&&Wt()&&(Kn=l.setTimeout(t,Ba))}};Kn=l.setTimeout(t,Ba)}async function es(t){if(!/PSE0501|unable to load appointment available days/i.test(String(t||""))||Gn)return;Gn=!0,l.setTimeout(()=>{Gn=!1},8e3);let e=await L();await T({[ye]:{active:!0,ofcUrl:location.href,accountId:e,startedAt:Date.now()}}),l.send({action:"recoveryStart",ofcUrl:location.href})}var Xn="humanClickProfile",bo=150,xo=120,ru=250,ns=!1,mt=[],Vn=0,nt=0,Ht=0,A=null,wo=0,Qe=!1,be=null,Qn=0,Zn=0,Je=[],ft=!1,te=!1;function au(){let t=[];for(let e of document.querySelectorAll('iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]')){let n=e.getBoundingClientRect();n.width<40||n.height<20||n.width>900||n.height>400||t.push(n)}if(!t.length&&U())for(let e of document.querySelectorAll("iframe")){let n=e.getBoundingClientRect();n.width>=120&&n.width<=420&&n.height>=45&&n.height<=120&&t.push(n)}return t}function Ze(){let t=au();if(!t.length)return null;let e=t[0];return{x:e.left+Math.min(28,Math.max(18,e.width*.11)),y:e.top+e.height/2,w:e.width,h:e.height,left:e.left,top:e.top}}function we(t,e,n){return n?t>=n.left-40&&t<=n.left+n.w+40&&e>=n.top-30&&e<=n.top+n.h+30:!1}function as(t){let e=performance.now();Vn||(Vn=e);let n=A,i=n?(t.clientX-n.x)/Math.max(24,n.w*.12):0,o=n?(t.clientY-n.y)/Math.max(20,n.h*.5):0;mt.push({nx:Math.round(i*1e3)/1e3,ny:Math.round(o*1e3)/1e3,x:Math.round(t.clientX),y:Math.round(t.clientY),t:Math.round(e-Vn)}),mt.length>xo&&mt.shift()}async function ti(){return(await C(Xn))[Xn]||{version:2,maxSamples:bo,samples:[],avgHoverMs:420,avgPressMs:70,avgApproachMs:800,liveTrained:!1}}function yo(t,e,n){if(!t.length)return n;let i=t.reduce((o,r)=>o+(Number(r[e])||0),0);return Math.round(i/t.length)}async function ss(t,{force:e=!1}={}){let n=Date.now();if(!e&&n-wo<ru)return null;wo=n;let i=await ti(),o=Array.isArray(i.samples)?i.samples.slice():[];for(t.clientId||(t.clientId=`hc-${t.at||n}-${Math.random().toString(36).slice(2,10)}`),t.uploaded=!1,o.push(t);o.length>bo;)o.shift();let r={version:2,maxSamples:bo,samples:o,avgHoverMs:yo(o,"hoverMs",420),avgPressMs:yo(o,"pressMs",70),avgApproachMs:yo(o,"approachMs",800),updatedAt:n,liveTrained:!0,source:"visa-page-live"};return await T({[Xn]:r}),Qn=o.length,F("human",`saved sample locally #${o.length}`,{capture:t.capture||"page",pressMs:t.pressMs,hoverMs:t.hoverMs,pathPts:Array.isArray(t.path)?t.path.length:0,clientId:t.clientId}),cs(t,r).catch(()=>{}),ls().catch(()=>{}),r}async function su(t){if(!t)return;let e=await ti(),n=Array.isArray(e.samples)?e.samples.slice():[],i=!1;for(let o of n)o?.clientId===t&&!o.uploaded&&(o.uploaded=!0,i=!0);i&&await T({[Xn]:{...e,samples:n,updatedAt:Date.now()}})}async function cs(t,e){try{if(!await x("serverSync"))return F("upload","skipped \u2014 serverSync is OFF"),!1;let n=await G()||{},i=t.clientId||`hc-${t.at||Date.now()}-${Math.random().toString(36).slice(2,8)}`;t.clientId=i;let o={client_id:i,profile:{id:n.id||"",email:n.email||"",name:n.name||"",visa:n.visa||""},sample:t,profile_meta:{sampleCount:e?.samples?.length||0,avgHoverMs:e?.avgHoverMs,avgPressMs:e?.avgPressMs,avgApproachMs:e?.avgApproachMs,liveTrained:!0,source:"visa-page-live",extensionHost:location.host}};F("upload",`sending sample ${i}`,{sampleCount:e?.samples?.length||0,email:n.email||""}),l.send({action:"uploadHumanClickSample",payload:o});try{chrome.runtime.sendMessage({action:"uploadHumanClickSample",payload:o},r=>{if(chrome.runtime.lastError){F("upload",`SW error: ${chrome.runtime.lastError.message}`);return}r?.success?(F("upload",`server OK id=${r.id??"?"} status=${r.status??""}`,{clientId:i}),su(i)):F("upload",`server FAIL ${r?.error||r?.status||"unknown"}`,{clientId:i})})}catch(r){F("upload",`sendMessage threw: ${r?.message||r}`)}return!0}catch(n){return F("upload",`upload threw: ${n?.message||n}`),!1}}async function ls(){try{if(!await x("serverSync"))return;let t=await ti(),n=(Array.isArray(t.samples)?t.samples:[]).filter(i=>i&&i.uploaded!==!0).slice(-40);for(let i of n)await cs(i,t),await new Promise(o=>setTimeout(o,80))}catch{}}function us(t,e={}){let n=performance.now(),i=Math.max(25,Math.min(500,nt?n-nt:70)),o=Math.max(30,Math.min(3e3,nt?nt-(Ht||nt):200)),r=(mt.length?mt:Je).slice(-xo),s=r.length?r[r.length-1].t:o,u=Math.max(o,Math.min(12e3,s||o)),f=be,d=A||Ze();return{hoverMs:Math.round(o),pressMs:Math.round(i),approachMs:Math.round(u),path:r,down:f?{x:Math.round(f.x),y:Math.round(f.y)}:null,up:t?{x:Math.round(t.clientX),y:Math.round(t.clientY)}:f?{x:Math.round(f.x),y:Math.round(f.y)}:d?{x:Math.round(d.x),y:Math.round(d.y)}:null,target:d?{x:Math.round(d.x),y:Math.round(d.y),w:Math.round(d.w),h:Math.round(d.h),left:Math.round(d.left),top:Math.round(d.top)}:null,viewport:{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio||1,scrollX:Math.round(window.scrollX||0),scrollY:Math.round(window.scrollY||0)},pointerType:t?.pointerType||"mouse",url:location.pathname+location.search,at:Date.now(),...e}}function Xe(){mt.length&&(Je=mt.slice(-xo)),mt=[],Vn=0,nt=0,Ht=0,be=null}function vo(){Qe||(Qe=!0,te=!0,Xe(),A=Ze())}function So(){Qe=!1,A=null,ft=!1,Xe()}function Jn(t){let e=t?.target;if(!e)return!1;if(e.closest?.(".cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]"))return!0;if(e.tagName==="IFRAME"){let n=(e.src||"").toLowerCase();if(n.includes("challenges.cloudflare")||n.includes("turnstile"))return!0;let i=e.getBoundingClientRect();if(i.width>=120&&i.width<=420&&i.height>=45&&i.height<=120)return!0}return!1}async function is(t){if(l.alive){if(!U()||J()){Qe&&So();return}vo(),A||(A=Ze()),!Ht&&A&&we(t.clientX,t.clientY,A)&&(Ht=performance.now()),A&&we(t.clientX,t.clientY,A)&&(Zn=Date.now()),as(t)}}async function os(t){if(!(!l.alive||t.button!==0)&&!(!U()||J())){vo(),A=Ze(),nt=performance.now(),Ht||(Ht=nt),be={x:t.clientX,y:t.clientY},as(t),(Jn(t)||A&&we(t.clientX,t.clientY,A))&&(ft=!0,Zn=Date.now()),F("human","pointer down during challenge",{onWidget:Jn(t),near:!!(!A||we(t.clientX,t.clientY,A)),x:Math.round(t.clientX),y:Math.round(t.clientY)});try{B("scanning",`Recording click\u2026 (saved ${Qn} so far)`)}catch{}}}async function rs(t){if(!l.alive||t.button!==0||!nt&&!ft)return;if(!U()&&!J()){Xe();return}if(!(A&&we(t.clientX,t.clientY,A)||A&&be&&we(be.x,be.y,A)||Jn(t)||ft||!A&&(mt.length>=2||Je.length>=2))&&mt.length<2&&Je.length<2){Xe();return}let n=us(t,{capture:ft||Jn(t)?"iframe-or-widget":"page"});ft=!1,Xe();let i=await ss(n);if(!i)return;let o=i.samples?.length||0;try{B("success",`Saved verify-human click #${o} \u2014 uploaded to server`)}catch{}}async function cu(){let t=Date.now();if(!te||!J()&&U())return;if(!(ft||t-Zn<8e3||Je.length>=2&&t-wo>500)){te=!1,So();return}let n=us(null,{capture:"challenge-solved"});ft=!1,te=!1,So();let i=await ss(n,{force:!0});if(!i)return;let o=i.samples?.length||0;try{B("success",`Saved verify-human click #${o} (after checkbox) \u2014 uploaded to server`)}catch{}}async function lu(){try{let t=await ti(),e=t.liveTrained&&t.samples?.length||0;return Qn=e,e}catch{return Qn}}function ds(){if(ns)return;ns=!0,F("human","train watcher started",{path:location.pathname}),l.on(window,"pointermove",is,{passive:!0,capture:!0}),l.on(window,"pointerdown",os,{passive:!0,capture:!0}),l.on(window,"pointerup",rs,{passive:!0,capture:!0}),l.on(window,"mousemove",is,{passive:!0,capture:!0}),l.on(window,"mousedown",os,{passive:!0,capture:!0}),l.on(window,"mouseup",rs,{passive:!0,capture:!0}),l.on(window,"blur",()=>{!U()||J()||(ft=!0,Zn=Date.now(),nt||(nt=performance.now(),Ht||(Ht=nt)),F("human","page blur during challenge (likely iframe click)"))});let t=async()=>{if(!l.alive)return;if(U()&&!J()){te||F("human","challenge detected \u2014 recording armed"),te=!0,vo(),A||(A=Ze());let n=await lu();try{B("scanning",n?`Train mode \u2014 click Verify you are human naturally (saved ${n})`:"Train mode \u2014 move mouse naturally, then click Verify you are human (recording\u2026)")}catch{}return}(te||Qe||ft)&&await cu()};t(),l.setInterval(t,1200),l.setTimeout(()=>{F("upload","flushing unsynced local samples\u2026"),ls().catch(()=>{})},2500)}var uu=`
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
`;function fs(){if(document.querySelector(p(a.styles)))return;let t=document.createElement("style");t.id=a.styles,t.dataset[$.mark]="",t.textContent=uu,(document.head||document.documentElement).appendChild(t)}Oo();Ji();To(()=>{wa(),l.destroy()});zo();Wa();_()&&L().then(t=>{if(t)return Mn(t);fe()}).catch(()=>fe());if(!_()){l.disposable(()=>{let i=document.querySelector(p(a.anchor)),o=document.querySelector("#post_select");i&&o&&i.replaceWith(o);for(let r of document.querySelectorAll("[data-"+$.mark+"]"))r.remove()}),fs(),l.send({action:"registerBlockGuard",prefix:m}),l.send({action:"registerRedirect",prefix:m}),l.send({action:"registerAlertGuard",prefix:m}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&l.send({action:"registerOfcReader",prefix:m}),l.on(window,"message",i=>{if(l.alive&&i.source===window)switch(i.data?.action){case At.req:return Pa(i);case At.res:return Ia(i);case At.ofc:return gr(i);case At.err:return Pe("native_alert",i.data?.text),Ne(String(i.data?.text||"alert").slice(0,120)),es(i.data?.text);case At.sub:ur(),Ie(),$r(),at().then(o=>{Ue(o?.accountId||null)}).catch(()=>{Ue(null)});return}}),chrome.storage.onChanged.addListener((i,o)=>{o==="local"&&(i.profile&&yi(),i.waitPillClock&&cr(i.waitPillClock.newValue),i.autoCloudflareTick&&(i.autoCloudflareTick.newValue?lo():co()))}),l.on(document,"click",i=>{ce();let o=i.target.closest(p(a.waitTime));if(o){if(o.dataset.skipClick){delete o.dataset.skipClick;return}sr()}}),l.on(document,"keydown",ce),l.on(window,"focus",()=>ce({keepConsular:!0})),l.on(document,"visibilitychange",()=>{document.hidden||ce({keepConsular:!0})}),dr(),Va(),Ja(),Za(),ts(),ds(),lo();async function t(){!l.alive||_()||!Tt()||document.querySelector("#post_select")&&(_t(),await Promise.all([mi(),hi(),Zi()]),Dr({slotIndex:Dn,shouldPick:async()=>await at()?!0:!!await x("autoSelectFirstDate"),onSlotPicked:()=>Sa()}))}async function e(){!l.alive||_()||!Tt()||await ya()}async function n(){Ho(),Fo(),await Promise.all([yi(),Ko(),Uo(),mi(),hi(),Zi()]),oi()}document.readyState==="complete"?n():l.on(window,"load",n),l.setInterval(t,2500),l.setInterval(e,3e4),e()}})();
