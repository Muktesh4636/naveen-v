(()=>{function U(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function T(t){return U()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,i]of Object.entries(t))e[n]=i;return e}):Promise.resolve(typeof t=="string"?{}:t)}function M(t){return U()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function dr(t){return U()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function fr(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",i=>{String(i.reason?.message||i.reason||"").includes("Extension context invalidated")&&(i.preventDefault(),e())});let n=setInterval(()=>{U()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var Qt="https://the.gopg.online",Ai=`${Qt}/contribute`,mr=`${Qt}/contribute/telegram`,Sd=`${Qt}/contribute/human-click`,Sn=`${Qt}/contribute/tik-tik-prefs`,pr=`${Qt}/contribute/tik-tik-coord`;var hr=20,gr=4320*60*1e3,xn=100,yr=4,vn=100,br=240,wr=50,Sr=1440*60*1e3,cl={recheckButton:!1,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function $(t){return T({[t]:cl[t]}).then(e=>e[t])}function Ct(){return T({posts:[]}).then(t=>t.posts)}function ue(t){return M({posts:t})}function W(){return T("profile").then(t=>t.profile)}var Xt=t=>String(t).padStart(2,"0");function Le(t){let e=Xt(t%60),n=Math.floor(t/60)%60,i=Math.floor(t/3600);return i?`${Xt(i)}:${Xt(n)}:${e}`:`${Xt(n)}:${e}`}function xr(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${Xt(n.getUTCHours())}:${Xt(n.getUTCMinutes())}:${Xt(n.getUTCSeconds())}`}}function Di(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),i=t%60,o=[];return e>0&&o.push(`${e}d`),(n>0||e>0)&&o.push(`${n}h`),o.push(`${i}m`),o.join(" ")}function vr(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),i=o=>n.find(r=>r.type===o)?.value??"";return`${i("month")} ${i("day")} ${i("year")} ${i("hour")}:${i("minute")} ${i("dayPeriod")}`}function Cr(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),i=parseInt(e[2],10),o=parseInt(e[3],10),r=e[4];r&&(r.toUpperCase()==="PM"&&n<12&&(n+=12),r.toUpperCase()==="AM"&&n===12&&(n=0));let s=new Date;return s.setHours(n,i,o,0),s.getTime()>Date.now()+6e4&&s.setDate(s.getDate()-1),s}var $r=Symbol(),ul=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&U()}on(t,e,n,i){t.addEventListener(e,n,{...i,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!U())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=yr,interval:n=xn}={}){return new Promise(i=>{let o=r=>{if(!this.alive)return;let s=document.querySelector(t);if(s)return i(s);if(r>=e)return i(null);this.setTimeout(()=>o(r+1),n)};o(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},c=new ul;function Tr(){let t=globalThis[$r];Object.defineProperty(globalThis,$r,{value:c,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var Cn=new Uint32Array(2);crypto.getRandomValues(Cn);var kr="abcdefghjkmnpqrstuvwxyz",dl=(Cn[0].toString(36)+Cn[1].toString(36)).replace(/[^a-z0-9]/g,""),f=(kr[Cn[0]%kr.length]+dl).slice(0,8).padEnd(8,"x");function h(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var a={selRow:f+"01",anchor:f+"02",waitTime:f+"03",recheck:f+"04",histCont:f+"05",histTbl:f+"06",cdCard:f+"07",cdTime:f+"08",ofcDate:f+"09",styles:f+"10",datesCont:f+"11",datesPara:f+"12",slotsTbl:f+"12b",aiBtn:f+"13",aiPanel:f+"14",aiFrom:f+"15",aiTo:f+"16",aiStatus:f+"17",aiConfirm:f+"18",aiCancel:f+"19",aiClose:f+"20",aiCities:f+"21",aiSubmitBtn:f+"22",aiCitiesBtn:f+"23",aiLogin:f+"24",aiPass:f+"25",aiQ1:f+"26",aiA1:f+"27",aiQ2:f+"28",aiA2:f+"29",aiQ3:f+"30",aiA3:f+"31",aiSaveLogin:f+"32",cfHud:f+"33",aiCitiesAll:f+"34",aiCitiesNone:f+"35",aiLoginToggle:f+"36",aiLoginBody:f+"37",aiProfiles:f+"63",aiProfilesList:f+"64",aiAddProfile:f+"65",aiLoginCancel:f+"66",aiLoginEditorTitle:f+"67",aiSubmitOn:f+"38",aiSubmitOff:f+"39",aiCitiesOn:f+"40",aiCitiesOff:f+"41",aiWinList:f+"42",aiWinAdd:f+"43",aiWinSave:f+"44",aiWinReset:f+"45",aiWinNote:f+"46",aiSubmitSw:f+"47",aiCitiesSw:f+"48",aiInfoBox:f+"49",aiWarnBox:f+"50",aiOkBox:f+"51",aiWinCard:f+"52",aiSubmitBody:f+"53",aiCitiesBody:f+"54",aiTerms:f+"55",aiTermsAgree:f+"56",aiTermsGate:f+"57",aiMain:f+"58",aiTermsContinue:f+"59",aiFromBtn:f+"60",aiToBtn:f+"61",aiCal:f+"62",hud:f+"68",hudName:f+"69",hudVisa:f+"70",hudBody:f+"71",hudHist:f+"72",hudCities:f+"73",hudSecs:f+"74"},l={pill:f+"a",pillTtl:f+"b",pillTmr:f+"c",pillWait:f+"d",pillDone:f+"e",footer:f+"f",card:f+"g",cardTtl:f+"h",histScrl:f+"i",dltDn:f+"j",dltUp:f+"k",cdDiv:f+"l",hidden:f+"m",sideLink:f+"n",datesLnk:f+"o",slotsSum:f+"o2",slotsTbl:f+"o3",aiOn:f+"p",aiRow:f+"q",aiHint:f+"r",aiCities:f+"s",aiOnBtn:f+"t",aiCityAct:f+"x",cfHud:f+"u",cfPulse:f+"v",cfFlash:f+"w",aiEn:f+"y",aiDis:f+"z",aiWinRow:f+"aa",aiFeat:f+"ab",aiSwitch:f+"ac",aiKnob:f+"ad",aiSec:f+"ae",aiInfo:f+"af",aiWarn:f+"ag",aiOk:f+"ah",aiTrash:f+"ai",aiWinHelp:f+"aj",aiInline:f+"ak",aiHead:f+"al",aiTerms:f+"am",aiTermsCb:f+"an",aiTermsList:f+"ao",aiContinue:f+"ap",aiDateBtn:f+"aq",aiCal:f+"ar",aiCalHead:f+"as",aiCalGrid:f+"at",aiCalDay:f+"au",aiCalMuted:f+"av",aiCalOn:f+"aw",aiCalToday:f+"ax",aiQl:f+"ay",aiQlTitle:f+"az",aiQlSub:f+"ba",aiQlCard:f+"bb",aiQlMeta:f+"bc",aiQlBadge:f+"bd",aiQlEdit:f+"be",aiQlAdd:f+"bf",aiQlEmpty:f+"bg",hud:f+"bh",hudHead:f+"bi",hudName:f+"bj",hudVisa:f+"bk",hudBody:f+"bl",hudCount:f+"bm",hudCountLabel:f+"bn",hudSecs:f+"bo",hudStuck:f+"bp",hudSubmit:f+"bq",hudSubmitTitle:f+"br",hudSubmitSub:f+"bs",hudHist:f+"bt",hudHistTitle:f+"bu",hudHistRow:f+"bv",hudPillOk:f+"bw",hudPillNo:f+"bx",hudCities:f+"by",hudCitiesTitle:f+"bz",hudCityLabel:f+"ca"},A={mark:f,w:f+"w",mw:f+"mw"},qt={req:f+"q",res:f+"r",ofc:f+"o",err:f+"e",sub:f+"s"};function $n(t){return t.map(e=>String.fromCharCode(e)).join("")}function fl(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function _r(){let t=document.createElement("div");return t.className=l.footer,t.textContent=$n([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function ml(t){let e=document.getElementById(a.histCont);e&&e.remove(),e=document.createElement("div"),e.id=a.histCont,e.className=l.card,e.dataset[A.mark]="";let n=document.createElement("h4");n.className=l.cardTtl,n.textContent=$n([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let i=document.createElement("div");i.className=l.histScrl;let o=document.createElement("table");o.id=a.histTbl;let r=document.createElement("thead"),s=document.createElement("tr");for(let d of["Time","Est. Wait","Change"]){let p=document.createElement("th");p.textContent=d,s.appendChild(p)}r.appendChild(s),o.appendChild(r);let u=document.createElement("tbody");for(let d=t.length-1;d>=0;d--){let p=t[d],y="--",g="";if(d>0){let C=p.minutes-t[d-1].minutes;C<0?(y=`${C}m`,g=l.dltDn):C>0?(y=`+${C}m`,g=l.dltUp):y="0m"}let S=document.createElement("tr"),w=[[p.timeStr,""],[Di(p.minutes),""],[y,g]];for(let[C,I]of w){let v=document.createElement("td");I&&(v.className=I),v.textContent=C,S.appendChild(v)}u.appendChild(S)}o.appendChild(u),i.appendChild(o),e.appendChild(i),e.appendChild(_r());let m=document.getElementById("last-updated");m&&(m.closest("div, p, section")||m.parentElement).insertAdjacentElement("afterend",e)}function pl(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function Mr(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),i=pl();if(i!==null&&i>br&&!e.textContent.includes("(")){let s=Di(i);e.textContent=`${e.textContent} (${i} minutes / ${s})`}let o=n.textContent.trim().split(" (")[0],r=Cr(o);if(r&&c.setInterval(()=>{let s=Math.floor((Date.now()-r)/1e3);s>=0&&(n.textContent=`${o} (${s}s ago)`)},1e3),i!==null){let s=fl(),u=sessionStorage.getItem(s);u||(u=Math.random().toString(36).substring(2,11),sessionStorage.setItem(s,u)),T({queueHistory:{}}).then(m=>{let d=m.queueHistory||{},p=Date.now(),y={};for(let[C,I]of Object.entries(d)){if(!Array.isArray(I))continue;let v=I[I.length-1];v&&p-v.timestamp<Sr&&(y[C]=I)}let g=y[u]||[],S=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),w=g[g.length-1];(!w||w.minutes!==i||w.timeStr!==S)&&(g.push({timestamp:p,timeStr:S,minutes:i}),g.length>wr&&g.shift(),y[u]=g,M({queueHistory:y})),ml(g)})}}function Ar(t,e){let n=document.getElementById("error_row");if(!n)return;let i;t?i=e?`Blocked for 24 hours, about ${Le(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":i="Temporarily blocked. Log in in a new tab, then refresh this page.";let o=document.createElement("div");o.className="atlas_validationalert alert alert-danger warning",o.dataset[A.mark]="",o.textContent=i,n.replaceChildren(o),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function Dr(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&T({cfRetryAfter:null}).then(n=>{let i=parseInt(n.cfRetryAfter,10);if(!isNaN(i)){dr("cfRetryAfter");let o=document.getElementById("what-happened-section");if(o){let r=document.createElement("div");r.id=a.cdCard,r.className=l.card,r.dataset[A.mark]="";let s=document.createElement("h4");s.className=l.cardTtl,s.textContent=$n([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),r.appendChild(s);let u=document.createElement("div");u.id=a.cdTime,r.appendChild(u);let m=document.createElement("div");m.className=l.cdDiv,r.appendChild(m),r.appendChild(_r()),o.appendChild(r);let d=i,p=null,y=()=>{d>0?(u.textContent=Le(d),d--):(u.classList.add(l.cdDiv+"-over"),u.textContent="You can try refreshing now!",p!=null&&c.clear(p))};y(),p=c.setInterval(y,1e3)}}})}async function Er(){let t=document.querySelector(".username");if(!t)return;let n=(t.innerText||"").trim().match(/^(.*)\((\d+)\)\s*$/);if(!n)return;let[,i,o]=n,r=await W()||{},s=!r.id||r.id===o||String(r.id).includes(o)?r:{};s.name=i.trim(),s.id=o;let u=document.querySelectorAll("script");for(let m of u){let d=m.innerText.trim();if(d.includes("setAuthenticatedUserContext")){let p=/setAuthenticatedUserContext\('([^']*)'\)/,y=d.match(p);y&&(s.email=y[1])}}await M({profile:s})}async function Ir(){let t=document.querySelector("#post_select");if(!t)return;let e=await Ct();for(let n of t.options){if(!n.value)continue;e.findIndex(o=>o.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await ue(e)}var hl=["visa-information","fee-payment","appointment-confirmation"];function gl(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(i=>{let o=i.querySelector(".text-bold");if(!o)return;let r=yl(o.textContent);if(!hl.includes(r))return;let s=bl(i);s&&(n[r]=s)}),Object.keys(n).length?n:null}function yl(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function bl(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function de(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>gr)return null}catch{}return t.value}function wl(t){let e=(t.posts||[]).filter(o=>o.Updated).sort((o,r)=>o.Updated-r.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},i=de(t.cgiIdToken);return i&&(n.token=i),n}async function Tn(){if(!U()||!await $("serverSync"))return;let t=await T(["profile","posts","cgiIdToken"]),e=wl(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await fetch(Ai,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(o=>o.json());if(!n.success)return;let i="0";n.contribs>0&&(i=n.contribs.toString()),n.contribs>10&&(i="10+"),n.contribs>0&&await M({contribs:{email:t.profile?.email,updated:Date.now(),count:i}})}catch{}}function Ei(t=0){U()&&document.querySelector("#appointment-card")&&$("serverSync").then(e=>{if(!e)return;let n=gl();if(!n){t<hr&&c.setTimeout(()=>Ei(t+1),xn);return}T(["profile","cgiIdToken","savedDashboard"]).then(i=>{let o=de(i.cgiIdToken);o&&JSON.stringify(n)!==JSON.stringify(i.savedDashboard)&&fetch(Ai,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:i.profile,dashboard:n,token:o})}).then(r=>r.json()).then(r=>{r.success&&M({savedDashboard:n})}).catch(()=>{})})})}var Sl=`${Qt}/extension-runtime-config.json`,Pi="vsRuntimeConfig",xl=300*1e3,Ii=0,qe=null,x={slotWindowLabel:":14\u2013:21, :24\u2013:31, :54\u2013:02",slotWindows:[{slot:1,fromMin:0,toMin:2},{slot:2,fromMin:14,toMin:21},{slot:3,fromMin:24,toMin:31},{slot:4,fromMin:54,toMin:59}],windowStartsMin:[0,14,24,54],cityLoadingMaxMs:12e4,cityCalendarNoDatesMs:2e4,cityRotateMinGapMs:15e3,cityRotateMaxGapMs:18e3,cityHoldMaxMs:45e3,homeKeepaliveMinMs:6e5,homeKeepaliveMaxMs:6e5,homeKeepaliveDebounceMs:48e4,loadingStuckMs:6e4,loadingStuckDebounceMs:9e4,remoteVersion:0,source:"bundled"};function X(t,e,n,i){let o=Number(t);return Number.isFinite(o)?Math.min(n,Math.max(e,Math.round(o))):i}function vl(t){if(!Array.isArray(t)||!t.length||t.length>24)return null;let e=[];for(let n of t){let i=X(n?.fromMin,0,59,NaN),o=X(n?.toMin,0,59,NaN);if(!Number.isFinite(i)||!Number.isFinite(o)||i>o)return null;let r=X(n?.slot,1,12,1);e.push({slot:r,fromMin:i,toMin:o})}return e}function Cl(t){let e=[...new Set(t.map(n=>n.fromMin))].sort((n,i)=>n-i);return e.length?e:x.windowStartsMin.slice()}function Pr(t,e="remote"){if(!t||typeof t!="object")return!1;let n=vl(t.slotWindows);if(n){x.slotWindows.length=0;for(let i of n)x.slotWindows.push(i);x.windowStartsMin=Cl(n)}return typeof t.slotWindowLabel=="string"&&t.slotWindowLabel.length<120&&(x.slotWindowLabel=t.slotWindowLabel),x.cityLoadingMaxMs=X(t.cityLoadingMaxMs,1e4,3e5,x.cityLoadingMaxMs),x.cityCalendarNoDatesMs=X(t.cityCalendarNoDatesMs,5e3,12e4,x.cityCalendarNoDatesMs),x.cityRotateMinGapMs=X(t.cityRotateMinGapMs,5e3,6e4,x.cityRotateMinGapMs),x.cityRotateMaxGapMs=X(t.cityRotateMaxGapMs,x.cityRotateMinGapMs,9e4,Math.max(x.cityRotateMinGapMs,x.cityRotateMaxGapMs)),x.cityHoldMaxMs=X(t.cityHoldMaxMs,1e4,18e4,x.cityHoldMaxMs),x.homeKeepaliveMinMs=X(t.homeKeepaliveMinMs,12e4,18e5,x.homeKeepaliveMinMs),x.homeKeepaliveMaxMs=X(t.homeKeepaliveMaxMs,x.homeKeepaliveMinMs,18e5,Math.max(x.homeKeepaliveMinMs,x.homeKeepaliveMaxMs)),x.homeKeepaliveDebounceMs=X(t.homeKeepaliveDebounceMs,6e4,18e5,x.homeKeepaliveDebounceMs),x.loadingStuckMs=X(t.loadingStuckMs,3e4,6e5,x.loadingStuckMs),x.loadingStuckDebounceMs=X(t.loadingStuckDebounceMs,3e4,6e5,x.loadingStuckDebounceMs),x.remoteVersion=X(t.version,0,1e9,x.remoteVersion),x.source=e,!0}async function $l(){try{let e=(await T(Pi))[Pi];e?.config&&Pr(e.config,"cache")}catch{}}async function Tl(t){try{await M({[Pi]:{config:t,fetchedAt:Date.now()}})}catch{}}async function kl({force:t=!1}={}){let e=Date.now();if(!t&&e-Ii<xl)return x;if(qe)return qe;qe=(async()=>{await $l();try{let n=await fetch(Sl,{method:"GET",cache:"no-store",signal:AbortSignal.timeout(8e3)});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.json();if(!i||typeof i!="object"||Array.isArray(i))throw new Error("bad json");if(i.script||i.code||i.eval)throw new Error("unsafe keys");Pr(i,"remote"),await Tl(i),Ii=Date.now()}catch{Ii=Date.now()}return x})();try{return await qe}finally{qe=null}}function Lr(){kl().catch(()=>{})}var Rt=null,Re=null;function qr(){return Rt||x.slotWindows}function pt(){return Re||(Rt?.length?Rr(Rt):x.slotWindowLabel)}var Fd=x.slotWindows,$t=4,Nt=6;function Rr(t){return t?.length?t.map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", "):x.slotWindowLabel}function Li(t){if(!Array.isArray(t))return[];let e=[];for(let n of t){if(e.length>=$t)break;let i=Number(n?.fromMin),o=Number(n?.durationMin??n?.duration);if(!Number.isFinite(i)||i<0||i>59)continue;let r=Math.min(Nt,59-i);if(r<1)continue;if(!Number.isFinite(o)||o<1){let u=Number(n?.toMin);if(!Number.isFinite(u)||u<i||u>59||(o=Math.min(r,u-i),o<1))continue}o=Math.min(r,Math.max(1,Math.round(o)));let s=Math.min(59,i+o);e.push({slot:e.length+1,fromMin:Math.round(i),toMin:s,durationMin:o})}return e}function Nr(t){let e=Li(t||[]);return e.length?(Rt=e.map(({slot:n,fromMin:i,toMin:o})=>({slot:n,fromMin:i,toMin:o})),Re=Rr(Rt),Rt):(Rt=null,Re=null,null)}function qi(){Rt=null,Re=null}function Or(t){let e=t?.length?t:x.slotWindows,n=[];for(let i of e||[]){if(n.length>=$t)break;let o=Number(i.fromMin),r=Number(i.toMin);if(!Number.isFinite(o)||!Number.isFinite(r)||r<o||o===0&&r<=2&&(e||[]).some(m=>Number(m.fromMin)>=54))continue;let s=Math.min(Nt,59-o);if(s<1)continue;let u=Math.min(s,Math.max(1,r-o));n.push({fromMin:o,durationMin:u})}return n}function Hr(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=i=>Number(e.find(o=>o.type===i)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function Jt(t=new Date){let{minute:e}=Hr(t),n=qr();for(let i of n)if(e>=i.fromMin&&e<=i.toMin)return i.slot;return 0}function Ne(t=new Date){if(Jt(t))return 0;let{minute:e,second:n}=Hr(t),i=e*60+n,o=qr(),r=[...new Set(o.map(u=>u.fromMin))].sort((u,m)=>u-m);for(let u of r){let m=u*60;if(i<m)return(m-i)*1e3}let s=r[0]??0;return(3600-i+s*60)*1e3}function Ri(t){return t<9e4?`${Math.ceil(t/1e3)}s`:`${Math.ceil(t/6e4)}m`}function Gr(){let t=document.querySelector(h(a.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=a.selRow,t.dataset[A.mark]="",n.insertAdjacentElement("afterend",t);let i=document.createElement("span");return i.id=a.anchor,i.dataset[A.mark]="",i.dataset[A.w]=e.style.width,i.dataset[A.mw]=e.style.minWidth,i.hidden=!0,e.insertAdjacentElement("beforebegin",i),c.setStyle(e,"width","100%"),c.setStyle(e,"minWidth","0"),t.appendChild(e),t}var Oe="waitPillState",_l=3600*1e3,Wr=l.pillWait,Ml=l.pillDone;function Al(t,e){let n=document.createElement("span");n.className=`${l.pill} ${e}`;let i=(o,r)=>{let s=document.createElement("span");s.className=o,s.textContent=r,n.appendChild(s)};return i(l.pillTtl,t.title),t.timer!==void 0&&i(l.pillTmr,t.timer),n}function Dl(t,e=Date.now()){if(t.kind==="waiting")return{variant:Wr};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:Wr}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:Ml}}return null}function El(t,e,n=new Date){let i=xr(n);return t.seconds===void 0?{title:i}:{title:i,timer:Le(t.seconds)}}var Il=class{#t=null;#e={kind:"idle"};#i=null;#n=null;#o=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get(Oe))[Oe];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>_l){chrome.storage.local.remove(Oe);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#o=t,this.#r(),this.#l()}toggleClockMode(){c.alive&&(this.setClockMode(!this.#o),chrome.storage.local.set({waitPillClock:this.#o}))}render(t){return Dl(this.#e,t)}#c(t){return El(t,this.#o,new Date)}#r(){if(this.#t??=Ll(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(l.hidden);return}this.#t.classList.remove(l.hidden),this.#t.replaceChildren(Al(this.#c(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#i&&(c.clear(this.#i),this.#i=null),t.kind==="running"?(chrome.storage.local.set({[Oe]:t}),this.#i=c.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove(Oe),this.#r(),this.#l()}#u(){this.#r(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,$("audioAlert").then(t=>{t&&zl()})))}#l(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=c.setInterval(()=>this.#r(),1e3):!t&&this.#n&&(c.clear(this.#n),this.#n=null)}},he=new Il,Ue="pillPosition",Br=4;function Fr(t,e,n){return Math.max(e,Math.min(n,t))}function jr(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,i=e.height>0?e.height:36;return{w:n,h:i}}function fe(t,e,n){let{w:i,h:o}=jr(t),r=Fr(e,0,Math.max(0,window.innerWidth-i)),s=Fr(n,0,Math.max(0,window.innerHeight-o));return t.style.setProperty("left",r+"px","important"),t.style.setProperty("top",s+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:r,top:s}}function Pl(t){var e=!1,n=!1,i=0,o=0,r=0,s=0;function u(d){if(e){var p=d.touches?d.touches[0]:d,y=p.clientX-i,g=p.clientY-o;!n&&Math.abs(y)<Br&&Math.abs(g)<Br||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",fe(t,r+y,s+g),d.cancelable&&d.preventDefault())}}function m(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",m),document.removeEventListener("touchmove",u),document.removeEventListener("touchend",m),n){let d=t.getBoundingClientRect();chrome.storage.local.set({[Ue]:{top:Math.round(d.top),left:Math.round(d.left)}})}n=!1}}t.addEventListener("mousedown",function(d){if(d.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let p=t.getBoundingClientRect();i=d.clientX,o=d.clientY,r=p.left,s=p.top,fe(t,p.left,p.top),document.addEventListener("mousemove",u),document.addEventListener("mouseup",m),d.preventDefault(),d.stopPropagation()}),t.addEventListener("touchstart",function(d){e=!0,n=!1,delete t.dataset.skipClick;let p=t.getBoundingClientRect();i=d.touches[0].clientX,o=d.touches[0].clientY,r=p.left,s=p.top,fe(t,p.left,p.top),document.addEventListener("touchmove",u,{passive:!1}),document.addEventListener("touchend",m)},{passive:!0})}function Ll(){let t=document.querySelector(h(a.waitTime));return t||(t=document.createElement("div"),t.id=a.waitTime,t.className=l.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),Pl(t),chrome.storage.local.get(Ue).then(e=>{let n=e[Ue];n&&typeof n.top=="number"&&typeof n.left=="number"&&fe(t,n.left,n.top)}),Ol(t),t)}function Ur(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function ql(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function Rl(t){let{w:e,h:n}=jr(t),i=12;return[{left:i,top:i},{left:Math.max(i,window.innerWidth-e-i),top:i},{left:i,top:Math.max(i,window.innerHeight-n-i)},{left:Math.max(i,window.innerWidth-e-i),top:Math.max(i,window.innerHeight-n-i)}]}async function Nl(){let e=(await chrome.storage.local.get(Ue))[Ue];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function Ol(t){let e=!1,n=async()=>{if(!c.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(l.hidden))return;let i=ql(),o=!!(i&&i.offsetParent!==null&&i.getBoundingClientRect().height>20),r=t.getBoundingClientRect();if(o&&Ur(r,i.getBoundingClientRect())){let s=i.getBoundingClientRect(),u=Rl(t),m=u.find(d=>{let p={left:d.left,top:d.top,right:d.left+r.width,bottom:d.top+r.height};return!Ur(p,s)})||u[2];e=!0,t.setAttribute("data-dodging",""),fe(t,m.left,m.top);return}if(e&&!o){e=!1,t.removeAttribute("data-dodging");let s=await Nl();s&&fe(t,s.left,s.top)}else o||t.removeAttribute("data-dodging")};c.setInterval(n,400),c.on(window,"resize",n)}async function Wi(){if(!c.alive||!await $("defaultWaitTime")||!await c.waitFor("#post_select",{attempts:vn}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});he.setClockMode(t),await he.restore()}async function Yr(){await $("defaultWaitTime")&&he.waiting()}async function Pn(t){await $("defaultWaitTime")&&he.run(t)}function Vr(){he.toggleClockMode()}function Qr(t){he.setClockMode(t)}var He=null,We=null,kn=null;function Bi(){return kn||(kn=new(window.AudioContext||window.webkitAudioContext),c.disposable(()=>kn?.close())),kn}async function Ln(t=150){try{let e=Bi();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let o=e.currentTime,r=t/1e3;i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(.1,o+.01),i.gain.setValueAtTime(.1,o+Math.max(.01,r-.02)),i.gain.linearRampToValueAtTime(0,o+r),n.start(),n.stop(o+r)}catch(e){console.error("Audio beep failed:",e)}}function qn(t,e=125,n=125){let i=0,o=()=>{i>=t||(Ln(e),i++,c.setTimeout(o,e+n))};o()}var Ni=4,zr=50,Kr=50,Hl=600;function Xr(){if(We)return;let t=()=>{qn(Ni,zr,Kr);let e=Ni*zr+(Ni-1)*Kr;We=c.setTimeout(t,e+Hl)};t()}var Wl=250,Bl=10,Fl=300,Ul=1e3;function zl(){if(He)return;let t=[];for(let o=0;o<=Fl;o+=Bl)t.push(o);let e=Date.now(),n=0,i=()=>{let o=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&o>=t[n];){let r=n===t.length-1;Ln(r?Ul:Wl),n++}if(n<t.length){let r=t[n],s=e+r*1e3,u=Math.max(0,s-Date.now());He=c.setTimeout(i,u)}else ge()};i()}function ge(t={}){let e=!!t.keepConsular;He&&(c.clear(He),He=null),We&&(c.clear(We),We=null),Oi(),e||Hi()}var _n=null,Mn=null,me=null,An=null,Be=null;async function Jr(){Oi();try{let t=Bi();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=880,i.frequency.value=1320,o.gain.value=.85,r.gain.value=.65,n.connect(o).connect(e),i.connect(r).connect(e);let s=t.createOscillator(),u=t.createGain();s.type="triangle",s.frequency.value=3.2,u.gain.value=280,s.connect(u),u.connect(n.frequency),u.connect(i.frequency);let m=t.currentTime;n.start(m),i.start(m),s.start(m),me={osc1:n,osc2:i,lfo:s,master:e};let d=()=>{me&&(Ln(500),Mn=c.setTimeout(d,1800))};d(),_n=c.setTimeout(Oi,12e4),Be=document.title;let p=!1,y=()=>{me&&(document.title=p?Be:"!!! SUBMIT CLICKED !!!",p=!p,An=c.setTimeout(y,450))};y()}catch(t){console.error("Submit alarm failed:",t)}}function Oi(){if(_n&&(c.clear(_n),_n=null),Mn&&(c.clear(Mn),Mn=null),An&&(c.clear(An),An=null),Be&&(document.title=Be,Be=null),me){try{let{osc1:t,osc2:e,lfo:n}=me;t.stop(),e.stop(),n.stop()}catch{}me=null}}function Kl(){let t=location.pathname||"";return/\/ofc-schedule\b/i.test(t)?!1:/\/(schedule|c-schedule)\b/i.test(t)}var Gl=6e4,Dn=null,En=null,In=null,Fe=null,pe=null;async function jl(){Hi();try{let t=Bi();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=980,i.frequency.value=1470,o.gain.value=.95,r.gain.value=.8,n.connect(o).connect(e),i.connect(r).connect(e);let s=t.createOscillator(),u=t.createGain();s.type="square",s.frequency.value=4,u.gain.value=320,s.connect(u),u.connect(n.frequency),u.connect(i.frequency);let m=t.currentTime;n.start(m),i.start(m),s.start(m),pe={osc1:n,osc2:i,lfo:s,master:e};let d=()=>{pe&&(Ln(650),En=c.setTimeout(d,900))};d(),Dn=c.setTimeout(Hi,Gl),Fe=document.title;let p=!1,y=()=>{pe&&(document.title=p?Fe:"!!! OFC BOOKED \u2014 CONSULAR PAGE !!!",p=!p,In=c.setTimeout(y,400))};y()}catch(t){console.error("Consular OFC alarm failed:",t)}}function Hi(){if(Dn&&(c.clear(Dn),Dn=null),En&&(c.clear(En),En=null),In&&(c.clear(In),In=null),Fe&&(document.title=Fe,Fe=null),pe){try{let{osc1:t,osc2:e,lfo:n}=pe;t.stop(),e.stop(),n.stop()}catch{}pe=null}}function Zr(){if(Kl()){try{let t="vsConsularOfcBeep";if(sessionStorage.getItem(t)==="1")return;sessionStorage.setItem(t,"1")}catch{}jl()}}function Yl(){document.querySelector(h(a.recheck))?.remove();for(let t of document.querySelectorAll("button"))(t.textContent||"").trim()==="Recheck"&&t.remove()}async function Fi(){c.alive&&Yl()}async function zi(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await c.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let i=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(u=>u.innerText.trim()===i))continue;let r=document.createElement("li");r.className="usa-sidenav__item",r.dataset[A.mark]="";let s=document.createElement("a");s.href=n.link,s.className=l.sideLink,s.target="_self",s.textContent=n.text,r.appendChild(s),t.appendChild(r)}}function R(t,e,n){let i=document.createElement(t);return e&&(i.className=e),n?.appendChild(i),i}function Rn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,r]=n;return`${r}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return null}function Ui(t){let e=Rn(t);if(!e)return String(t||"");let[n,i,o]=e.split("-").map(Number);if(!n||!i||!o)return e;try{return new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(new Date(n,i-1,o))}catch{return e}}function Vl(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);if(n)return n[1].slice(0,5);let i=e.match(/^(\d{1,2}:\d{2})/);return i?i[1]:e}function ta(t){let e=document.querySelector(h(a.datesCont));if(e){let o=e.querySelector(h(a.datesPara)),r=e.querySelector("h2");if(r&&t&&(r.textContent=t),o)return{container:e,details:o}}let n=document.querySelector("#page_form");if(!n)return null;e?.remove();let i=Ql(t||"");return n.appendChild(i.container),i}function ea(t){if(t.response.HasError)return;let e=document.querySelector("#post_select"),n=e?.options[e.selectedIndex]?.text??"",i=(t.response.ScheduleDays||[]).map(d=>Rn(d?.Date)).filter(Boolean).sort((d,p)=>d.localeCompare(p));document.querySelector(h(a.datesCont))?.remove();let o=ta(n);if(!o)return;let{details:r}=o;r.replaceChildren();let s=R("div",l.slotsSum,r);if(!i.length){s.textContent="No slots available";return}s.textContent=`${i.length} date${i.length===1?"":"s"} available`;let u={};for(let d of i){let p=d.slice(0,7);(u[p]||=[]).push(d)}for(let[d,p]of Object.entries(u)){let y=R("div",null,r),g=document.createElement("strong");g.textContent=d,y.append(g,`: ${p.map(S=>S.slice(8,10)).join(", ")}`)}let m=R("div",null,r);m.style.marginTop="0.5em";for(let d of i){let p=R("div",null,m);p.textContent=`\u2022 ${Ui(d)} (${d})`}}function na(t,e,n){let i=document.querySelector("#post_select"),o=n||i?.options[i.selectedIndex]?.text||"",r=Rn(e)||Rn(t?.[0]?.Date)||"",s=(t||[]).filter(v=>v&&v.Time).map(v=>({time:Vl(v.Time),avail:v.EntriesAvailable!=null&&Number.isFinite(Number(v.EntriesAvailable))?Number(v.EntriesAvailable):null,raw:v})).sort((v,Y)=>String(v.time).localeCompare(String(Y.time))),u=ta(o);if(!u)return;let{details:m}=u;m.replaceChildren();let d=R("div",l.slotsSum,m);if(!s.length){d.textContent=r?`No time slots on ${Ui(r)}`:"No time slots available";return}let p=s.filter(v=>v.avail==null||v.avail>0),y=p.reduce((v,Y)=>v+(Y.avail||0),0),g=r?Ui(r):"selected date";if(d.textContent=y>0?`${p.length} time slot${p.length===1?"":"s"} on ${g} \xB7 ${y} available`:`${s.length} time slot${s.length===1?"":"s"} on ${g}`,r){let v=R("div",null,m);v.style.margin="0.35em 0 0.6em",v.textContent=`Date: ${g} (${r})`}let S=R("table",l.slotsTbl,m);S.id=a.slotsTbl;let w=R("thead",null,S),C=R("tr",null,w);for(let v of["Time","Availability"]){let Y=R("th",null,C);Y.textContent=v}let I=R("tbody",null,S);for(let v of s){let Y=R("tr",null,I);v.avail===0&&(Y.style.opacity="0.55");let ce=R("td",null,Y);ce.textContent=v.time;let Vt=R("td",null,Y);Vt.textContent=v.avail==null?"\u2014":String(v.avail)}}function Ql(t){let e=R("div","row");e.id=a.datesCont;let n=R("div","col-sm-12 atlas_section mt-3",e),i=R("div","col-sm-12 atlas_section_header_row",R("div","row",n));R("h2",null,i).textContent=t;let o=R("div",null,R("div","col-sm-12",R("div","row",n)));return o.id=a.datesPara,{container:e,details:o}}var ia=null;function Xl(){let t=document.querySelector(h(a.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return c.setStyle(n,"display","flex"),c.setStyle(n,"alignItems","center"),c.setStyle(n,"justifyContent","flex-end"),c.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=a.ofcDate,t.dataset[A.mark]="",e.insertAdjacentElement("beforebegin",t),t}function Jl(){if(!location.pathname.includes("/schedule"))return;let t=ia;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=Xl();n&&(n.textContent=`OFC (Estimate): ${vr(e.appointmentDateStr)}`)}function oa(t){chrome.runtime?.id&&(ia=t.data.data,c.waitFor("#submitbtn").then(e=>{e&&Jl()}))}var Nn=new Map,ra=45e3,On=new Map,aa=8e3,sa=0;function Hn(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function Wn(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function Zl(t,e){return`${t}:${e.slice(0,5).join(",")}`}function tc(t){let e=Date.now(),n=Nn.get(t);if(n&&e-n<ra)return!1;Nn.set(t,e);for(let[i,o]of Nn)e-o>ra*4&&Nn.delete(i);return!0}function ec(t){let e=Date.now(),n=On.get(t);if(n&&e-n<aa)return!1;On.set(t,e);for(let[i,o]of On)e-o>aa*6&&On.delete(i);return!0}async function la(){return await $("telegramViaServer")!==!1}async function ca(t,{kind:e="alert",dedupKey:n="",skipDedup:i=!1,notifyMuktesh:o=!0}={}){if(t&&await la())try{await fetch(mr,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:i,notify_muktesh:o}),signal:AbortSignal.timeout(2e4)})}catch{}}function nc(t,{kind:e="screen",dedupKey:n="",waitMs:i=0,skipDedup:o=!1,notifyMuktesh:r=!0}={}){c.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:i,skipDedup:o,notifyMuktesh:r,captureScreenshot:!0})}async function ic(t,e,n){let i=Hn(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&r.push(`\u{1FAAA} <b>Visa:</b> ${n}`),r.push(`\u{1F550} <b>Checked:</b> ${o} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),r.push(`\u{1F4C6} <b>Dates (${i.length}):</b>`,"");for(let s of i.slice(0,30))r.push(`\u{1F7E2} <b>${Wn(s)}</b>`);return i.length>30&&r.push("",`\u2795 <i>+${i.length-30} more dates</i>`),r.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),r.join(`
`)}function oc(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",i=document.querySelector("#datepicker")?.value||"\u2014",r=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:i,time:r}}async function ua(t,{postId:e,postName:n,hasError:i}={}){if(i||!t?.length)return;let o=Hn(t);if(!o.length||!await $("telegramAlert"))return;let r=Zl(e||n||"unknown",o);if(!tc(r))return;let s=await W(),u=await ic(n,t,s?.visa||"");await ca(u,{kind:"slots",dedupKey:r,notifyMuktesh:!0})}function rc(t,e,n){let i=Hn(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`;if(i.length){let s=i.slice(0,5).map(u=>Wn(u)).join(", ");return`<b>DATES AVAILABLE</b>
\u{1F3DB}\uFE0F ${r}
\u{1F4C6} ${i.length} date(s)
${s}${i.length>5?"\u2026":""}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}return`<b>City changed \u2014 no dates</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}function ac(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=e?Wn(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${i}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function sc(t,e,n){let i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?Wn(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u23F0 ${n} slot(s)
\u{1F550} ${i} IST
\u{1F4F2} Visa Slot 6`}async function ye(t,{kind:e="screen",dedupKey:n,waitMs:i=0,skipDedup:o=!1}={}){if(await $("telegramScreenshots")===!1||!await la())return;let r=n||`${e}:${String(t).slice(0,80)}`;!o&&!ec(r)||nc(t,{kind:e,dedupKey:r,waitMs:i,skipDedup:o,notifyMuktesh:!0})}async function da(t,{postId:e,postName:n,hasError:i}={}){let o=rc(n,t,i),r=Hn(t),s=r.length?"dates":"city";await ye(o,{kind:s,dedupKey:`${s}:${e||n}:${r.length}:${i?1:0}`,waitMs:r.length?1400:900})}async function fa(t,e){await ye(ac(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function ma(t,e,n){await ye(sc(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function pa(){let t=Date.now();if(t-sa<8e3)return;sa=t;let e=await W(),{city:n,date:i,time:o}=oc(),r=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),s=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${i}`,`\u23F0 <b>Time:</b> ${o}`];e?.email&&s.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&s.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),s.push(`\u{1F550} <b>When:</b> ${r} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let u=s.join(`
`);await ca(u,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await ye(u,{kind:"submit",skipDedup:!0,waitMs:200})}var Fn=25;function Un(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function ji(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let i=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,i),n-1)}function ha(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function ga(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function Vi(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function Ki(t){if(t)try{t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}}function Bn(t){if(t)try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}}function Yi(t){if(!t||t.disabled)return!1;try{if(t.tagName==="SELECT")return!t.value||t.value==="0"?!1:(Ki(t),t.value&&t.value!=="0"?!0:(Bn(t),!!(t.value&&t.value!=="0")));if(t.type==="radio"||t.type==="checkbox"){if(t.name)for(let i of document.getElementsByName(t.name))i!==t&&(i.checked=!1);if(t.checked=!0,Ki(t),t.checked)return!0;let e=t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,n=t.closest("tr");for(let i of[e,t.closest("label"),t,n].filter(Boolean))Bn(i);return t.checked=!0,Ki(t),t.checked===!0}Bn(t)}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function ya(){let t=new Set,e=[],n=i=>{if(!i||t.has(i)||Vi(i)||i.disabled)return;let o=i.closest("tr");o&&ga(o)||(t.add(i),e.push(i))};for(let i of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let o of document.querySelectorAll(`${i}:not([disabled])`))n(o);return e}function lc(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!ha(n)||ga(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function cc(t,e){for(let n of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(n.tagName!=="SELECT"||n.disabled||Vi(n))continue;let i=[...n.options].filter(s=>!s.disabled&&s.value&&s.value!=="0"&&ha({textContent:s.textContent}));if(!i.length)continue;let o=null,r=Un(e);if(r&&r!=="00:00"&&(o=i.find(s=>(s.textContent||"").includes(r))||null,!o)){let s=r.match(/(\d{1,2}:\d{2})/);s&&(o=i.find(u=>(u.textContent||"").includes(s[1]))||null)}if(!o){let s=ji(i.length,t);o=i[s]}if(o&&(n.value=o.value,Yi(n)))return!0}return!1}function uc(t,e){if(cc(t,e))return!0;let n=ya();if(n.length){let o=null,r=Un(e);if(r&&r!=="00:00"&&(o=n.find(s=>{let u=(s.closest("tr")?.textContent||s.textContent||"").replace(/\s+/g," ");return u.includes(r)||u.includes(r.slice(0,5))})||null),!o){let s=ji(n.length,t);o=n[s]}if(o&&Yi(o))return!0}let i=lc();if(i.length){let o=null,r=Un(e);if(r&&r!=="00:00"&&(o=i.find(m=>(m.textContent||"").includes(r))||null),!o){let m=ji(i.length,t);o=i[m]}if(!o)return!1;let s=o.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(s&&Yi(s))return!0;let u=o.querySelector("label");if(u)return Bn(u),!!o.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function J(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!Vi(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function dc({slotIndex:t=0,maxMs:e=12e3,pollMs:n=Fn,time:i,onTick:o}={}){let r=Date.now()+e,s=Math.max(10,n||25);return new Promise(u=>{let m=()=>{if(!c.alive)return u(!1);if(o?.(),uc(t,i)||J())return u(!0);if(Date.now()>=r)return u(!1);c.setTimeout(m,s)};m()})}function ze({time:t,date:e,slotIndex:n,pollMs:i,maxMs:o}){let r=n??0,s=o||15e3,u=i||Fn;return c.send({action:"forcePickTimeSlot",slotIndex:r,maxMs:s,pollMs:u}),c.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:r,pollMs:u,domWaitMs:0,maxMs:s}),dc({slotIndex:r,maxMs:s,pollMs:u,time:t||"00:00"})}var Gi=!1;function ba({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(Gi)return;Gi=!0;let i=!1,o=async()=>{if(!(!c.alive||i)){if(J()){n?.();return}try{if(t&&!await t())return}catch{return}ya().length&&(i=!0,await ze({slotIndex:e,time:"00:00",maxMs:800,pollMs:Fn}),i=!1,J()&&n?.())}};c.setInterval(o,Fn);let r=document.querySelector("#page_form")||document.body,s=new MutationObserver(()=>o());s.observe(r,{childList:!0,subtree:!0}),c.disposable(()=>{s.disconnect(),Gi=!1})}function wa(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let i=Un(n?.Time);if(!i)continue;let o=i.match(/(\d{1,2}):(\d{2})/);if(!o)continue;let[,r,s]=o;if(e.includes(`${r}:${s}`)||e.includes(`${parseInt(r,10)}:${s}`))return!0}return!1}var zn="submitErrors",Sa=50,fc=45e3,va=0,Qi=new Set,Ke=null,Ca=null;function $a(t){Ca=typeof t=="function"?t:null}function mc(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",i=document.querySelector("#datepicker")?.value||"";return{city:e,date:i,url:location.href}}function Ge(){va=Date.now()+fc,Qi.clear(),wc()}function Kn(){return Date.now()<va}function pc(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function hc(t){let e=await T({[zn]:[]}),n=Array.isArray(e[zn])?e[zn]:[];n.push(t),n.length>Sa&&n.splice(0,n.length-Sa),await M({[zn]:n})}function xa(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function gc(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${xa(t.source)}`,`\u{1F4AC} <b>Message:</b> ${xa(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let i=n.join(`
`);await ye(i,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function je(t,e,n={}){let i=String(e||"").trim();if(!i||!Kn()&&!n.force)return;let o=pc(t,i);if(Qi.has(o))return;Qi.add(o);let r=mc(),s=await W(),u={at:Date.now(),source:String(t||"unknown"),message:i.slice(0,2e3),city:n.city||r.city,date:n.date||r.date,url:n.url||r.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:s?.email||""};await hc(u);try{await gc(u)}catch{}try{Ca?.(u)}catch{}}function yc(t){if(!Kn())return;let e=t?.status,n=t?.retryAfter,i=t?.cgiBlock,o=`Request failed (HTTP ${e||"?"})`;n!=null&&(o+=` \u2014 retry after ${n}s`),i&&(o+=" \u2014 CGI access limitation"),je("ajax_error",o,{status:e})}function Ta(t){if(!Kn()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){yc({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",o=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";je("ajax_response",o,{route:t.tail||""})}var bc=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function wc(){Ke&&c.clear(Ke);let t=()=>{if(!c.alive||!Kn()){Ke=null;return}for(let e of bc)for(let n of document.querySelectorAll(e)){let i=(n.textContent||"").replace(/\s+/g," ").trim();!i||i.length<4||je("page_validation",i)}Ke=c.setTimeout(t,600)};Ke=c.setTimeout(t,500)}var Ye=0,ka="",_a=0;async function Sc(){let[t,e]=await Promise.all([W(),T(["cgiIdToken"])]),n=de(e.cgiIdToken);return{profile:t,token:n}}async function Ma(t){if(!U()||!await $("serverSync"))return null;let{profile:e,token:n}=await Sc();if(!e?.id&&!e?.email)return null;try{let i={...t,profile:e};n&&(i.token=n);let o=await fetch(pr,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i),signal:AbortSignal.timeout(2500)}).then(r=>r.json());return o&&o.success?o:null}catch{return null}}async function Xi({postId:t,postName:e,dayCount:n,dateFrom:i=null,dateTo:o=null,bestDate:r=null,rangeFrom:s=null,rangeTo:u=null}={}){let m=String(t||"").trim(),d=Number(n)||0;if(!m||d<1)return null;let p=String(r||i||"").slice(0,10),y=`${m}:${d}:${p}`,g=Date.now();if(y===ka&&g-_a<250)return null;ka=y,_a=g;let S=await Ma({action:"alert",city:{id:m,name:String(e||m).trim()},dayCount:d,dateFrom:i||s||p||null,dateTo:o||u||p||null,bestDate:p||null,rangeFrom:s||null,rangeTo:u||null});return S?.alertId&&(Ye=Math.max(Ye,Number(S.alertId)||0)),S}async function Aa({preferredCities:t=[],citiesEnabled:e=!1,currentCityId:n="",dateFrom:i=null,dateTo:o=null}={}){if(!e||!t?.length)return null;let s=(await Ma({action:"poll",preferredCities:t,citiesEnabled:!0,currentCityId:String(n||""),lastAlertId:Ye,dateFrom:i||null,dateTo:o||null}))?.forceCity;return!s?.id||!s?.alertId?null:s}function Gn(t){let e=Number(t)||0;e>Ye&&(Ye=e)}var xc=["cities","from","to","submitEnabled","citiesEnabled","enabled","slotWindows","termsAgreed","termsPassed","termsAgreedAt"];function Da(t){if(!t||typeof t!="object")return{};let e={};for(let n of xc)n in t&&(e[n]=t[n]);return typeof e.submitEnabled!="boolean"&&typeof e.enabled=="boolean"&&(e.submitEnabled=e.enabled),delete e.enabled,e}function Ea(t,e){if(!e||typeof e!="object")return t||null;let n=t&&typeof t=="object"?{...t}:{},i=Number(n.serverUpdatedAt)||0,o=Number(e.updatedAt)||0;if(o&&i&&o<i)return n;let r=Da(e);Array.isArray(r.cities)&&!r.cities.length&&Array.isArray(n.cities)&&n.cities.length&&delete r.cities;let s={...n,...r};return typeof r.submitEnabled=="boolean"&&(s.enabled=r.submitEnabled),e.updatedAt&&(s.serverUpdatedAt=e.updatedAt),s}async function Ia(){let[t,e]=await Promise.all([W(),T(["cgiIdToken"])]),n=de(e.cgiIdToken);return{profile:t,token:n}}async function Pa(t){if(!U()||!await $("serverSync"))return!1;let e=Da(t);if(!Object.keys(e).length)return!1;let{profile:n,token:i}=await Ia();if(!n?.id&&!n?.email)return!1;try{let o={profile:n,prefs:e};i&&(o.token=i);let r=await fetch(Sn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(s=>s.json());return!!(r&&r.success)}catch{return!1}}async function La(){if(!U()||!await $("serverSync"))return null;let{profile:t,token:e}=await Ia();if(!t?.id&&!t?.email)return null;try{let n=new URLSearchParams;t.id&&n.set("applicant_id",String(t.id)),t.email&&n.set("email",String(t.email));let i=await fetch(`${Sn}?${n.toString()}`,{method:"GET",headers:{Accept:"application/json"}}).then(r=>r.json());if(i?.prefs)return i.prefs;let o={profile:t};return e&&(o.token=e),i=await fetch(Sn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(r=>r.json()),i?.prefs||null}catch{return null}}var jn=3,j=[],Zt=null;function Ve(t,e){let n=String(t||"").trim();if(!n)return;let i=String(e||n).trim()||n;if(j.length&&j[0].slots==null&&j[0].id!==n&&(j[0].slots=!1),j[0]?.id===n){j[0].name=i||j[0].name;return}j.unshift({id:n,name:i,slots:null}),j.length>jn&&(j.length=jn)}function qa(t,e,n){let i=String(t||"").trim();if(!i)return;let o=j.find(r=>r.id===i);if(o){o.slots=!!e,n&&(o.name=String(n).trim()||o.name);return}j.unshift({id:i,name:String(n||i).trim()||i,slots:!!e}),j.length>jn&&(j.length=jn)}function vc(){let t=document.querySelector(h(a.hud));return t||(t=document.createElement("div"),t.id=a.hud,t.className=l.hud,t.dataset[A.mark]="",t.innerHTML=`
    <div class="${l.hudHead}">Tik Tik</div>
    <div class="${l.hudName}" id="${a.hudName}">\u2014</div>
    <div class="${l.hudVisa}" id="${a.hudVisa}">Visa \xB7 \u2014</div>
    <div class="${l.hudBody}" id="${a.hudBody}"></div>
    <div class="${l.hudHist}" id="${a.hudHist}"></div>
  `,document.documentElement.appendChild(t),t)}function Cc(t){return t==null||!Number.isFinite(t)?null:Math.max(0,Math.floor(Number(t)+1e-9))}function $c(t,e){if(!t)return;let n=Cc(e.secondsUntilHop);if(e.submitPending){t.replaceChildren();let i=document.createElement("div");i.className=l.hudSubmit;let o=document.createElement("div");o.className=l.hudSubmitTitle,o.textContent="SUBMIT CLICKED";let r=document.createElement("div");r.className=l.hudSubmitSub,r.textContent="Waiting for confirmation\u2026",i.append(o,r),t.appendChild(i);return}if(e.loadingStuck){t.replaceChildren();let i=document.createElement("div");i.className=l.hudStuck,i.textContent="Date Loading\u2026",t.appendChild(i);return}if(e.rotateActive&&n!=null){let i=t.querySelector(`.${l.hudCount}`),o=t.querySelector(h(a.hudSecs));if(!i||!o){t.replaceChildren(),i=document.createElement("div"),i.className=l.hudCount;let r=document.createElement("span");r.className=l.hudCountLabel,r.textContent="Next city change",o=document.createElement("span"),o.id=a.hudSecs,o.className=l.hudSecs,i.append(r,o),t.appendChild(i)}o.textContent=`${n}s`;return}t.replaceChildren()}function Tc(t){if(!t)return;t.replaceChildren();let e=document.createElement("div");if(e.className=l.hudHistTitle,e.textContent="Last 3 cities",t.appendChild(e),!j.length){let n=document.createElement("div");n.className=l.hudHistRow,n.textContent="No hops yet",t.appendChild(n);return}for(let n of j){let i=document.createElement("div");i.className=l.hudHistRow;let o=document.createElement("span");o.textContent=n.name||n.id;let r=document.createElement("span");n.slots===!0?(r.className=l.hudPillOk,r.textContent="Slots"):n.slots===!1?(r.className=l.hudPillNo,r.textContent="No slots"):(r.className=l.hudPillNo,r.textContent="\u2026"),i.append(o,r),t.appendChild(i)}}async function kc(t={}){if(!c.alive)return;if(t.hide){document.querySelector(h(a.hud))?.remove();return}let e=vc();e.querySelector(h(a.hudCities))?.remove();let n=await W().catch(()=>null),i=n?.name&&String(n.name).trim()||n?.email&&String(n.email).trim()||"\u2014",o=n?.visa&&String(n.visa).trim()||n?.visaClass&&String(n.visaClass).trim()||"\u2014",r=e.querySelector(h(a.hudName)),s=e.querySelector(h(a.hudVisa));r&&(r.textContent=i),s&&(s.textContent=`Visa \xB7 ${o}`),$c(e.querySelector(h(a.hudBody)),t),Tc(e.querySelector(h(a.hudHist)))}function Ra(t){if(Zt)return;let e=async()=>{if(Zt=null,!!c.alive){try{let n=typeof t=="function"?await t():{};await kc(n||{})}catch{}c.alive&&(Zt=c.setTimeout(e,1e3))}};Zt=c.setTimeout(e,200)}function Ji(){Zt&&(c.clear(Zt),Zt=null)}var Wt="aiSubmitByAccount",$e=8e3;var z=25;var on=0,Je=1e4,es=1e3;function Te(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}function go(){return x.cityRotateMinGapMs}function _c(){return x.cityRotateMaxGapMs}function Ze(){return x.cityHoldMaxMs}function Tt(){return x.cityLoadingMaxMs}function Ht(){return x.cityCalendarNoDatesMs}var Na=5e3,io=2e4,Mc=15e3;function rn(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function yt(){return/\/ofc-schedule\b/i.test(location.pathname)}function k(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var Ac=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function Qe(t,e){let n=Ac[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(o=>{let r=e===o?" selected":"";return`<option value="${o.replace(/"/g,"&quot;")}"${r}>${o}</option>`}).join("")}function be(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function ie(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function Dc(t,e,n){return`${t}-${String(e+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`}function Ec(t){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(t))return null;let[e,n,i]=t.split("-").map(Number),o=new Date(e,n-1,i);return o.getFullYear()!==e||o.getMonth()!==n-1||o.getDate()!==i?null:o}function yo(){for(let t of["from","to"]){let e=document.querySelector(h(t==="from"?a.aiFrom:a.aiTo)),n=document.querySelector(h(t==="from"?a.aiFromBtn:a.aiToBtn));if(!n)continue;let i=e?.value||"";n.textContent=i?ie(i):"Select date"}}function Zi(t,e){let n=document.querySelector(h(t==="from"?a.aiFrom:a.aiTo));if(n&&(n.value=e||""),t==="from"){let i=document.querySelector(h(a.aiTo));i&&e&&i.value&&i.value<e&&(i.value="")}yo()}var et={y:0,m0:0,which:"from"};function Bt(){document.querySelector(h(a.aiCal))?.classList.add(l.hidden)}function bo(t){let e=t.target;return e?e.nodeType===3?e.parentElement:e:null}function oo(){let t=document.querySelector(h(a.aiCal));if(!t)return;let{y:e,m0:n,which:i}=et,o=document.querySelector(h(i==="from"?a.aiFrom:a.aiTo))?.value||"",r=be(),s=i==="to"&&document.querySelector(h(a.aiFrom))?.value||be(),u=new Date(e,n,1).toLocaleDateString("en-IN",{month:"long",year:"numeric"}),m=new Date(e,n,1).getDay(),d=new Date(e,n+1,0).getDate(),p=new Date(e,n,0).getDate(),y="";for(let g of["S","M","T","W","T","F","S"])y+=`<div class="${l.aiHint}">${g}</div>`;for(let g=0;g<42;g++){let S,w=e,C=n,I=!1;g<m?(S=p-m+g+1,C=n-1,C<0&&(C=11,w=e-1),I=!0):g>=m+d?(S=g-m-d+1,C=n+1,C>11&&(C=0,w=e+1),I=!0):S=g-m+1;let v=Dc(w,C,S),Y=v<s,ce=[l.aiCalDay,I?l.aiCalMuted:"",Y?l.aiCalMuted:"",v===r?l.aiCalToday:"",v===o?l.aiCalOn:""].filter(Boolean).join(" ");y+=`<button type="button" class="${ce}" data-iso="${v}" ${Y?'disabled aria-disabled="true"':""}>${S}</button>`}t.innerHTML=`
    <div class="${l.aiCalHead}">
      <button type="button" data-cal="prev" aria-label="Previous month">\u2039</button>
      <div class="${l.aiHead}">${u}</div>
      <button type="button" data-cal="next" aria-label="Next month">\u203A</button>
    </div>
    <div class="${l.aiCalGrid}">${y}</div>
    <div class="${l.aiRow}">
      <button type="button" data-cal="clear">Clear</button>
      <button type="button" data-cal="today">Today</button>
    </div>
  `}function Ic(t){let e=document.querySelector(h(a.aiCal)),i=bo(t)?.closest?.("button");if(!e||!i||!e.contains(i))return;t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation();let o=i.getAttribute("data-cal"),r=et.which,s=r==="to"&&document.querySelector(h(a.aiFrom))?.value||be();if(o==="prev"){et.m0-=1,et.m0<0&&(et.m0=11,et.y-=1),oo();return}if(o==="next"){et.m0+=1,et.m0>11&&(et.m0=0,et.y+=1),oo();return}if(o==="clear"){Zi(r,""),Bt();return}if(o==="today"){let m=be();m>=s&&(Zi(r,m),Bt(),Za());return}if(i.disabled||i.getAttribute("aria-disabled")==="true")return;let u=i.getAttribute("data-iso");!u||u<s||(Zi(r,u),Bt(),Za())}function Oa(t){let e=document.querySelector(h(a.aiCal));if(!e||!t)return;let n=t.getBoundingClientRect(),i=Math.min(340,window.innerWidth-16),o=e.offsetHeight||360,r=Math.max(8,Math.min(n.left,window.innerWidth-i-8)),s=n.bottom+6;s+o>window.innerHeight-8&&n.top-6-o>=8?s=n.top-6-o:s=Math.max(8,Math.min(s,window.innerHeight-o-8)),e.style.position="fixed",e.style.top=`${Math.round(s)}px`,e.style.left=`${Math.round(r)}px`,e.style.width=`${i}px`,e.style.right="auto",e.style.bottom="auto"}function Ha(t,e){let n=document.querySelector(h(a.aiCal));n||(n=document.createElement("div"),n.id=a.aiCal,n.className=`${l.aiCal} ${l.hidden}`,n.dataset[A.mark]="",document.body.appendChild(n),c.on(n,"pointerdown",Ic,{capture:!0}),c.on(n,"click",r=>{n.contains(bo(r))&&(r.preventDefault(),r.stopPropagation())},{capture:!0}));let i=document.querySelector(h(t==="from"?a.aiFrom:a.aiTo))?.value,o=Ec(i)||new Date;et={y:o.getFullYear(),m0:o.getMonth(),which:t},oo(),n.classList.remove(l.hidden),Oa(e),requestAnimationFrame(()=>Oa(e))}function It(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function Et(t){return!!(t&&t.citiesEnabled)}async function P(){let t=await W();return t?.id?String(t.id):null}async function _(t){return t&&((await T(Wt))[Wt]||{})[t]||null}async function an(t,e){if(!t)return;let i=(await T(Wt))[Wt]||{};e==null?delete i[t]:i[t]=e,await M({[Wt]:i})}var N=!1;function ke(){return N}function xe(){N=!0,Gt(),Se()}function bt(){N=!1,H=!1,Gt()}async function Xn(t){ns(),xe();let e=await _(t);if(!e){at();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await an(t,e),at()}var Q=!1,te=null,Ot=null,Wa=2e4,Jn=new Set,ro="",ao="";function ns(){Q=!1,te&&(c.clear(te),te=null),Ot&&(c.clear(Ot),Ot=null)}function ei(){Jn.clear(),ro=""}function Pc(t){let e=String(t||"").slice(0,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(e))return;let n=String(document.querySelector("#post_select")?.value||"");n!==ro&&(Jn.clear(),ro=n),Jn.add(e)}function ni(t){let e=String(t||"").slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(e)&&(ao=e)}function Lc(){let t=document.querySelector("#datepicker"),e=String(t?.value||"").trim();if(!e)return ao||"";if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,r]=n;return`${r}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return ao||""}async function wo(t="No time slots"){if(N||k()||!yt()||Q)return null;let n=await mt()||await Me();if(!n?.from||!n?.to)return null;let i=document.querySelector("#post_select"),o=i?String(i.value):"";if(!o)return null;let r=Lc();r&&Pc(r);let u=(await Ct()).find(w=>String(w.ID)===o),d=en(u?.Days||[],n.from,n.to).filter(w=>!Jn.has(String(w.Date).slice(0,10)));if(!d.length)return null;let p=Te(d.length),y=d[p];if(!y?.Date)return null;let g=String(y.Date).slice(0,10);ni(g),B=0,tt(),bt();let S=`${t} \u2014 trying next date #${p+1} (${g}) (${d.length} left in range)\u2026`;return b(S),L(S),c.send({action:"selectFirstDate",date:g,maxMs:$e,pollMs:z}),g}async function Ba(){return!!await wo("Submit failed")}async function sn(t){if(k()||Fa()){t?await Xn(t):xe(),b("Booking confirmed \u2014 Tik Tik stopped.");return}Q=!0,tt(),Ge(),b("Submit clicked \u2014 waiting for confirmation (Auto Submit + City Change stay ON)\u2026"),Ot&&c.clear(Ot);let e=Date.now(),n=async()=>{if(Ot=null,!(!Q||!c.alive)){if(Fa()||k()){let i=t||await P();i?await Xn(i):xe(),b("Booking confirmed \u2014 Tik Tik stopped.");return}if(Date.now()-e>=Wa){await tn("no confirmation yet \u2014 resuming city checks");return}Ot=c.setTimeout(n,400)}};Ot=c.setTimeout(n,400),te&&c.clear(te),te=c.setTimeout(()=>{te=null,Q&&tn("submit wait timed out \u2014 resuming city checks")},Wa)}function Fa(){if(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))return!0;let t=(document.body?.innerText||"").slice(0,2500);return/appointment\s+confirmation|successfully\s+scheduled|your\s+appointment\s+has\s+been/i.test(t)}async function tn(t=""){if(!Q&&!q&&!H){if(await Ba())return;ft();return}ns(),H=!1,Gt(),N&&bt();let e=t?`Submit failed (${t})`:"Submit failed";if(await Ba()){b(`${e} \u2014 staying on city; trying another date\u2026`);return}if(ei(),ft(),b(`${e} \u2014 no other dates in range; hopping cities\u2026`),E)Z(Date.now()),D();else{let i=await P();if(i){let o=await _(i);Et(o)&&await un()}}}function _e(){return Q}function oe(t,e,n){let i=String(t||"").slice(0,10);return!(!i||i.length<10||e&&i<e||n&&i>n)}async function Me(){if(N||k()||!yt())return null;let t=await P();if(!t)return null;let e=await _(t),n=e?.from?String(e.from).slice(0,10):"",i=e?.to?String(e.to).slice(0,10):"";return!n||!i||n.length<10||i.length<10?null:{from:n,to:i,accountId:t,submitArmed:It(e)}}async function mt(){if(N||k()||!yt())return null;let t=await P();if(!t)return null;let e=await _(t);return!It(e)||!e.from||!e.to?null:{...e,accountId:t}}async function re(){if(N||k()||!yt())return null;let t=await P();if(!t)return null;let e=await _(t);return!Et(e)||!e.cities?.length?null:(ms(e),{...e,accountId:t})}function en(t,e,n){let i=new Date;return i.setHours(0,0,0,0),(t||[]).map(o=>{if(!o)return null;let r=o.Date!=null?o.Date:o.date,s=qc(r);return s?{...o,Date:s}:null}).filter(Boolean).filter(o=>oe(o.Date,e,n)).filter(o=>{let[r,s,u]=o.Date.slice(0,10).split("-").map(Number);return new Date(r,s-1,u)>=i}).sort((o,r)=>String(o.Date).localeCompare(String(r.Date)))}function qc(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,r,s]=n;return`${s}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime()))return`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}-${String(o.getDate()).padStart(2,"0")}`}return null}var H=!1,kt=null,Mt=null,ut=!1,At=0,E=!1,V=0,nt=0,Ft=0,Ut=0,Kt=!1,ht=null,it=0,q=!1,B=0,we=null,ee=null,Dt=0,Ua=!1,to="",Xe="",So=0,za="",Ka=!1,so=0;function Rc(t){return(t||[]).map(e=>e.id).join("")}function Nc(){let t=document.querySelector(h(a.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function Ga(t){let e=document.querySelector(h(a.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function Gt(){kt&&(c.clear(kt),kt=null),H=!1}function Pt(){we&&(c.clear(we),we=null)}function is(){Pt(),B||(B=Date.now());let t=Math.max(500,Ze()-(Date.now()-B));we=c.setTimeout(()=>{we=null,!(!q||!E||!c.alive)&&(q=!1,B=0,Z(Date.now()),b(`City Change \u2014 booking hold timed out (${Ze()/1e3}s); next city in 15\u201318s\u2026`),D())},t)}function Oc(){ee&&(c.clear(ee),ee=null)}function ii(t=Date.now()){let e=!1;if(ut&&At&&t-At>=Mc&&(ut=!1,At=0,e=!0),q&&(B||(B=t),t-B>=Ze()?(Pt(),q=!1,B=0,e=!0):we||is()),Kt){it||(it=t);let i=Zn()?Tt():Ht();if(t-it>=i)rt(),e=!0;else if(!ht){let o=Math.max(500,i-(t-it));ht=c.setTimeout(()=>{if(ht=null,!E||q)return;let r=Zn(),s=r?Tt():Ht();if(Date.now()-(it||0)<s){ii();return}rt(),Z(Date.now()),b(r?`City Change \u2014 still Loading after ${Tt()/1e3}s; changing city\u2026`:`City Change \u2014 calendar up but no dates after ${Ht()/1e3}s; changing city\u2026`),D()},o)}}return H&&!kt&&(H=!1,e=!0),e}function os(){if(ee||!E)return;let t=()=>{if(ee=null,!E||!c.alive||N)return;let e=Date.now(),n=ii(e),i=!!Jt(new Date(e)),o=!!Mt,r=!i&&o||Kt||q||H||Q,s=!r&&Dt>0&&e-Dt>=io;if(n||s||!o&&!ut&&!r)s?(ut=!1,At=0,rt(),!q&&!Q&&(Pt(),B=0),H&&!kt&&(H=!1),V=e,b(i?"City Change \u2014 unstuck; hopping now\u2026":`City Change \u2014 unstuck; waiting for IST window ${pt()}\u2026`)):n?(!q&&!Q&&(V=e),b(i?"City Change \u2014 lock cleared; hopping now\u2026":`City Change \u2014 lock cleared; next IST window ${pt()}\u2026`)):b("City Change \u2014 timer lost; restarting\u2026"),Dt=e,D();else if(!i&&o){let m=Ne(new Date(e));b(`City Change \u2014 waiting for slot window (IST ${pt()}, next in ${Ri(m)})`)}E&&(ee=c.setTimeout(t,Na))};ee=c.setTimeout(t,Na)}function Se(){To(),Oc(),Yc(),Pt(),ut=!1,At=0,E=!1,q=!1,B=0,V=0,nt=0,Dt=0,rt()}async function Hc(){if(!yt()||k()||N)return{hide:!0};let t=Date.now(),e=!!Q,n=!!(Kt&&Zn()),i=null;if(E&&!e&&!n)if(Kt&&it){let o=Math.max(0,Ht()-(t-it));i=Math.max(0,Math.ceil(o/1e3))}else q||_t>t?i=null:Jt(new Date(t))?i=Math.max(0,Math.ceil(as(t)/1e3)):i=null;return{submitPending:e,loadingStuck:n,rotateActive:!!E,secondsUntilHop:i}}function oi(t,e,n){qa(t,e,n)}function rt(){Kt=!1,it=0,ht&&(c.clear(ht),ht=null)}function xo(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let i=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(i))continue;let o=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let r of o)if(r&&/\bLoading\.{0,3}\b/i.test((r.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let o=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(o))continue;let r=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(r))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function Zn(){return xo()}function vo(){Kt=!0,it=Date.now(),ht&&c.clear(ht),ht=c.setTimeout(()=>{ht=null,!(!E||q)&&(rt(),Z(Date.now()),b(`City Change \u2014 still Loading after ${Tt()/1e3}s; changing city\u2026`),D())},Tt())}function Co(t){let e=Math.max(0,Number(t)||0)*1e3;Ut=Math.max(Ut,Date.now()+e),V=Math.max(V,Ut),rt(),D()}function rs(){rt()}function tt(){N||(q=!0,B||(B=Date.now()),To(),rt(),is(),Dt=Date.now(),E&&D(),b("City Change \u2014 paused (Auto Submit booking)\u2026"))}function ft(){if(Q){b("Submit pending \u2014 staying on this city (ignoring date reload hop)\u2026");return}q&&(Pt(),q=!1,B=0,!(!E||N)&&(Z(Date.now()),b("City Change \u2014 resuming; next city in 15\u201318s\u2026"),D()))}async function ri(){let t=await mt();if(!t)return;let e=Date.now();if(e-so<6e4)return;so=e;let i=document.querySelector("#post_select")?.value;if(!i){b("Auto Submit ON \u2014 pick a city first.");return}let r=(await Ct()).find(u=>String(u.ID)===String(i)),s=r?.Days;if(Array.isArray(s)&&s.length){let u=en(s,t.from,t.to);if(u.length){tt();let d=Te(u.length),p=u[d].Date;b(`Auto Submit: picking date #${d+1} (${p.slice(0,10)})\u2026`),ni(p),c.send({action:"selectFirstDate",date:p,maxMs:$e,pollMs:z});return}let m=en(s,"1970-01-01","2999-12-31");if(m.length){let d=m[0].Date;b(`Auto Submit ON \u2014 dates outside ${t.from} \u2192 ${t.to}; jumping calendar to ${d} (not booking).`),c.send({action:"selectFirstDate",date:d,navigateOnly:!0,maxMs:4e3,pollMs:z});return}b(`Auto Submit ON \u2014 no dates in your range on ${r.Name||"this city"} yet.`);return}b("Auto Submit ON \u2014 loading slots for current city\u2026"),c.send({action:"selectPost",postId:String(i)})}function $o(){so=0}function To(){Mt&&(c.clear(Mt),Mt=null)}function Wc(t,e){return t+Math.random()*(e-t)}function Bc(){return Wc(go(),_c())}function Z(t=Date.now()){V=t+Bc()}function as(t=Date.now()){let e=Ne(new Date(t));if(e>0)return e;if(Ut>t)return Ut-t;if(nt){let n=nt+go()-t;if(n>0)return n}return V>t?V-t:0}function D(){if(!E)return;if(To(),q||Kt){Mt=c.setTimeout(()=>{no()},500);return}let t=Date.now(),e=Ne(new Date(t));if(e>0){V>t&&(V=t),e>=io&&(Dt=t),Mt=c.setTimeout(()=>{no()},e);return}let n=0;Ut>t&&(n=Math.max(n,Ut-t)),nt&&(n=Math.max(n,nt+go()-t)),V>t&&(n=Math.max(n,V-t)),n=Math.max(0,n),n>=io&&(Dt=Date.now()),Mt=c.setTimeout(()=>{no()},n)}function Fc(t,e){if(!t.length)return null;if(t.length===1)return Ft=0,t[0];let n=t.findIndex(o=>String(o.id)===String(e));n<0&&(n=Math.max(0,Math.min(Ft,t.length-1)));let i=(n+1)%t.length;return Ft=i,t[i]}function ai(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function ko(t){return String(t||"").toLowerCase().replace(/\b(vac|ofc|consular|embassy|appointment)\b/g," ").replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim()}function lo(t,e,n){if(!t)return null;let i=e.get(String(t.id));if(i)return i;let o=ko(t.name);if(!o)return null;if(i=n.get(o)||null,i)return i;for(let[r,s]of n)if(r!==o&&(r.includes(o)||o.includes(r)))return s;return null}function ln(t){let e=ai();if(!e.length||!t?.length)return[];let n=new Map(e.map(s=>[String(s.id),s])),i=new Map;for(let s of e){let u=ko(s.name);u&&!i.has(u)&&i.set(u,s)}let o=[],r=new Set;for(let s of t){let u=lo(s,n,i);u&&(r.has(u.id)||(r.add(u.id),o.push({id:u.id,name:u.name})))}return o}function ja(t,e){let n=Array.isArray(t)?t.filter(Boolean):[],i=Array.isArray(e)?e.filter(Boolean):[];if(!i.length)return n.map(g=>({id:String(g.id),name:g.name||g.id}));let o=document.querySelector(h(a.aiCities)),r=new Set(o?[...o.querySelectorAll('input[type="checkbox"]')].map(g=>String(g.value)):[]),s=ai(),u=new Map(s.map(g=>[String(g.id),g])),m=new Map;for(let g of s){let S=ko(g.name);S&&!m.has(S)&&m.set(S,g)}let d=[],p=new Set,y=g=>{if(!g)return;let S=s.length?lo(g,u,m):null,w=String(S?.id||g.id);p.has(w)||(p.add(w),d.push({id:w,name:S?.name||g.name||g.id}))};for(let g of i)y(g);for(let g of n){let S=s.length?lo(g,u,m):null,w=String(S?S.id:g.id);p.has(w)||p.has(String(g.id))||r.has(w)&&!i.some(C=>String(C.id)===w)||y(S||g)}return d}function zt(){let t=document.querySelector(h(a.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function cn(){return{from:document.querySelector(h(a.aiFrom))?.value||null,to:document.querySelector(h(a.aiTo))?.value||null}}function nn(t=[],{force:e=!1,selectedCities:n=null}={}){let i=document.querySelector(h(a.aiCities));if(!i)return;let o=ai(),r=Rc(o),s=document.querySelector(h(a.aiPanel)),u=s&&!s.classList.contains(l.hidden),m=Nc();if(!e&&r===za&&i.querySelector('input[type="checkbox"]'))return;za=r;let d=n?.length?n:(t||[]).map(g=>({id:String(g),name:""})),p=d.length?ln(d):[],y=new Set(u&&m.length&&!e&&!d.length?m:(p.length?p.map(g=>g.id):m).map(String));if(i.replaceChildren(),!o.length){i.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let g of o){let S=document.createElement("label"),w=document.createElement("input");w.type="checkbox",w.value=g.id,w.dataset.name=g.name,w.checked=y.has(g.id),S.append(w,document.createTextNode(g.name)),i.appendChild(S)}}function Uc(t){let e=t?.cities||[];return e.length?e.map(n=>n.name||n.id).join(", "):"\u2014"}async function gt(t,e={}){let n=await _(t)||{},{cities:i,...o}=e,{from:r,to:s}=cn(),u=zt(),m=Array.isArray(n.cities)?n.cities:[],d=document.querySelector(h(a.aiCities)),p=d?d.querySelectorAll('input[type="checkbox"]').length:0,y;if(i!==void 0){let S=Array.isArray(i)?i:[];!S.length&&!u.length?y=p>0?[]:m:y=ja(m,S.length?S:u)}else u.length?y=ja(m,u):y=m;let g={...n,from:r||n.from||null,to:s||n.to||null,cities:y.length?y:p>0&&i!==void 0&&!(i||[]).length?[]:n.cities||[],loginId:document.querySelector(h(a.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(h(a.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(S=>{let w=[a.aiQ1,a.aiQ2,a.aiQ3][S],C=[a.aiA1,a.aiA2,a.aiA3][S];return{q:document.querySelector(h(w))?.value?.trim()||n.security?.[S]?.q||"",a:document.querySelector(h(C))?.value?.trim()||n.security?.[S]?.a||"",set:S+1}}),...o};return typeof g.submitEnabled=="boolean"&&(g.enabled=g.submitEnabled),g.serverUpdatedAt=Date.now(),await an(t,g),zc(g),g}async function eo(){let t=await P();if(!t)return;let e=zt(),n=await gt(t,{cities:e}),i=ln(n.cities||e),o=i.map(m=>m.name||m.id).join(" \u2192 ")||"\u2014";if(!i.length){b("No preferred cities selected \u2014 tick cities anytime; hopping paused."),E&&Se();return}if(ot=!0,ve(n),!Et(n)){b(`Preferred cities saved (${i.length}): ${o} \u2014 turn City Change ON to hop.`);return}if(si(),!E){await un();return}let r=document.querySelector("#post_select"),s=r?String(r.value):"",u=i.findIndex(m=>String(m.id)===s);Ft=u>=0?u:Math.min(Ft,i.length-1),b(`Preferred cities updated (${i.length}): ${o} \u2014 City Change keeps running`),D()}var Yn=null,co=null;function zc(t){Yn&&c.clear(Yn),Yn=c.setTimeout(()=>{Yn=null,Pa(t).catch(()=>{})},400)}async function ss(t){if(!t||co===t)return null;let e=await La();if(co=t,!e)return null;let n=await _(t)||{},i=Ea(n,e);return i?(i.loginId=n.loginId||i.loginId||"",i.loginPass=n.loginPass||"",i.security=n.security||i.security||[],typeof i.submitEnabled=="boolean"&&(i.enabled=i.submitEnabled),await an(t,i),i):null}async function Kc(t,e){if(Q||!Jt()||q||H)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let i=String(t);return String(n.value)===i?!1:(Xe=i,So=Date.now(),vo(),nt=Date.now(),Z(nt),Ve(i,e||i),b(`Switching city \u2192 ${e||t}\u2026`),ei(),c.send({action:"selectPost",postId:i}),!0)}var _t=0,uo=45e3;async function Gc(t,e,{alertId:n,dayCount:i,bestDate:o}={}){if(N||k()||!yt()||Q)return!1;let r=document.querySelector("#post_select");if(!r||!t)return!1;let s=String(t),u=e||s;if(String(r.value)===s){_t=Date.now()+uo,b(`City alert \u2014 already on ${u}`+(i?` (${i} dates`:"")+(o?`, best ${o}`:"")+(i?")":"")+" \u2014 holding for booking");try{qn(2,90,60)}catch{}try{c.send({action:"focusScheduleTab"})}catch{}return tt(),!0}Pt(),rt(),q=!1,B=0,H=!1,Gt(),ut=!1,At=0,V=Date.now(),nt=0,Ut=0,Xe=s,So=Date.now(),vo(),nt=Date.now(),_t=Date.now()+uo,ei(),b(`City alert \u2014 FAST switch \u2192 ${u}`+(i?` (${i} dates`:"")+(o?`, best ${o}`:"")+(i?")":"")+(n?` [#${n}]`:""));try{qn(3,80,50)}catch{}try{c.send({action:"focusScheduleTab"})}catch{}return Ve(s,u),c.send({action:"selectPost",postId:s,force:!0}),tt(),E&&D(),!0}var ne=null,Vn=!1,Ya="",Va=0,jc=50;function Yc(){ne&&(c.clear(ne),ne=null),Vn=!1}async function Vc(){if(!(Vn||!E||N)){Vn=!0;try{let t=await re();if(!t?.cities?.length)return;let e=document.querySelector("#post_select"),n=await Aa({preferredCities:t.cities,citiesEnabled:!0,currentCityId:e?String(e.value):"",dateFrom:t.from||null,dateTo:t.to||null});if(!n?.alertId)return;if(n.alreadyThere){Gn(n.alertId),_t=Math.max(_t,Date.now()+uo),tt(),b(`City alert \u2014 already on ${n.name||n.id}`+(n.dayCount?` (${n.dayCount} dates`:"")+(n.bestDate?`, best ${n.bestDate}`:"")+(n.dayCount?")":"")+" \u2014 holding for booking");return}let i=`${n.id}:${n.alertId}`,o=Date.now();if(i===Ya&&o-Va<4e3){Gn(n.alertId);return}await Gc(n.id,n.name,{alertId:n.alertId,dayCount:n.dayCount,bestDate:n.bestDate})&&(Ya=i,Va=o,Gn(n.alertId))}catch{}finally{Vn=!1}}}function ls(){if(ne||!E)return;let t=()=>{ne=null,!(!E||N||!c.alive)&&Vc().finally(()=>{E&&!N&&c.alive&&(ne=c.setTimeout(t,jc))})};ne=c.setTimeout(t,50)}function si(){if(Ua)return;let t=document.querySelector("#post_select");if(!t)return;Ua=!0,to=String(t.value||"");let e=()=>{let n=document.querySelector("#post_select");if(!n)return;let i=String(n.value||"");!i||i===to||(to=i,Qc(i,n))};c.on(t,"change",e),c.setInterval(e,400)}function Qc(t,e){if(!E||N||!c.alive||Q)return;let n=String(t||"");if(!n)return;let i=Xe&&n===Xe&&Date.now()-So<2500;i&&(Xe=""),Pt(),q=!1,B=0,Gt(),ei(),nt=Date.now(),vo(),Z(nt),re().then(r=>{if(!r?.cities?.length)return;let u=ln(r.cities).findIndex(m=>String(m.id)===n);u>=0&&(Ft=u)}).catch(()=>{});let o=e?.selectedOptions&&e.selectedOptions[0]?.textContent?.trim()||e?.options?.[e.selectedIndex]?.textContent?.trim()||n;Ve(n,o),b(i?`City Change \u2014 on ${o}; waiting for dates\u2026`:`City Change \u2014 you switched \u2192 ${o}; waiting (same as system hop)\u2026`),D()}async function no(){if(!(ut||!E)){ut=!0,At=Date.now(),Dt=Date.now(),Mt=null;try{if(N||k()||!c.alive){Se();return}if(ii()){V=Date.now(),b(Jt()?"City Change \u2014 auto-unstuck; hopping now\u2026":`City Change \u2014 auto-unstuck; waiting IST ${pt()}\u2026`),D();return}if(q||H){let y=B?Date.now()-B:0;if(q&&y>=Ze()){Pt(),q=!1,B=0,Z(Date.now()),b("City Change \u2014 hold expired; next city in 15\u201318s\u2026"),D();return}let g=Math.max(0,Ze()-y);b(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(g/1e3)}s`),D();return}let t=Date.now();if(_t>t){let y=Math.ceil((_t-t)/1e3);b(`City alert hold \u2014 staying for booking\u2026 (${y}s)`),D();return}let e=Jt(new Date(t)),n=Ne(new Date(t));if(!e){b(`City Change \u2014 waiting for slot window (IST ${pt()}, next in ${Ri(n)})`),D();return}if(Kt){let y=it?t-it:0;if(Zn()){if(y>=Tt()){rt(),Z(Date.now()),b(`City Change \u2014 still Loading after ${Tt()/1e3}s; changing city\u2026`),D();return}let w=Math.max(0,Math.ceil((Tt()-y)/1e3));b(`City Change \u2014 Date Loading\u2026 stay (${w}s then hop if still Loading)`),D();return}let g=_t>t?Math.max(Ht(),_t-(it||t)):Ht();if(y>=g){rt(),Z(Date.now()),b(`City Change \u2014 calendar up but no dates after ${Math.round(g/1e3)}s; changing city\u2026`),D();return}let S=Math.max(0,Math.ceil((Ht()-y)/1e3));b(`City Change \u2014 waiting calendar dates\u2026 (${S}s then hop)`),D();return}let i=as(t);if(i>0){let y=Math.ceil(i/1e3);b(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,y)}s`),D();return}let o=await re();if(!o?.cities?.length){Se();return}let r=new Set(ai().map(y=>y.id)),s=ln(o.cities);if(!s.length){b("Preferred cities not found in the dropdown \u2014 pick cities again."),Se();return}s.length<(o.cities?.length||0)&&b(`City Change \u2014 using ${s.length}/${o.cities.length} preferred (some ids remapped/missing in dropdown): ${s.map(y=>y.name||y.id).join(" \u2192 ")}`);let u=document.querySelector("#post_select"),m=u?String(u.value):"",d=Fc(s,m);if(!d){Z(t),D();return}if(await Kc(d.id,d.name)){nt=Date.now(),Z(nt);let y=s.map(S=>S.name||S.id).join(" \u2192 "),g=`${Ft+1}/${s.length}`;b(`City Change \u2014 ${g} ${d.name||d.id} (path: ${y}); Loading up to ${Tt()/1e3}s, no-dates hop ${Ht()/1e3}s`)}else Z(t);D()}finally{ut=!1,At=0}}}async function un(){if(N||k()||!yt())return;let t=await re();if(!t?.cities?.length)return;let e=ln(t.cities);if(!e.length){b("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}Pt(),rt(),q=!1,B=0,H=!1,ut=!1,At=0,E=!0,Dt=Date.now(),V=Date.now();let n=document.querySelector("#post_select"),i=n?String(n.value):"",o=e.findIndex(s=>String(s.id)===i);Ft=o>=0?o:0;let r=e.map(s=>s.name||s.id).join(" \u2192 ");b(`City Change ON \u2014 ${e.length} cities (${r}); IST ${pt()}; hop 15\u201318s`),os(),ls(),D()}async function cs(){if(N||k()||!yt()||!c.alive||!(await re())?.cities?.length||!document.querySelector("#post_select"))return;if(!E){await un();return}let e=ii();os(),ls(),(e||!Mt&&!ut)&&(e&&(Z(Date.now()),b("City Change \u2014 auto-unstuck; next city in 15\u201318s\u2026")),D())}function _o(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function Qn(){let t=_o();return!!(t&&!t.disabled)}function Xc(t){if(!t||t.disabled)return!1;try{let e=t.form||t.closest?.("form");if(e&&typeof e.requestSubmit=="function")return e.requestSubmit(t),!0}catch{}try{return t.click(),!0}catch{}try{return t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click(),!0}catch{}return!1}function Mo(){let t=_o();if(!t||t.disabled)return!1;let e=Xc(t);return c.send({action:"forceClickSubmit",prefix:f,pollMs:z,maxMs:Math.min(1500,Je)}),e}function Jc(){return J()?Qn():!1}function Ao(t){let e=Date.now()+Math.max(0,Number(t)||0);return J()&&Qn()?Promise.resolve(!0):new Promise(n=>{let i=!1,o=null,r=null,s=m=>{if(!i){i=!0;try{r?.disconnect()}catch{}o&&c.clear(o),n(!!m)}},u=()=>{if(!c.alive||ke()||k())return s(!1);if(J()&&Qn())return s(!0);if(Date.now()>=e)return s(J()&&Qn())};try{r=new MutationObserver(u);let m=_o();m&&r.observe(m,{attributes:!0,attributeFilter:["disabled","class","aria-disabled"]});let d=m?.form||m?.closest?.("form")||document.querySelector("#page_form, form");d?r.observe(d,{attributes:!0,attributeFilter:["disabled","class"],childList:!0,subtree:!0}):r.observe(document.documentElement,{attributes:!0,attributeFilter:["disabled"],childList:!0,subtree:!0})}catch{r=null}o=c.setInterval(u,z),u()})}function us(){b("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function Do(t){if(N||k()||H)return;let e=await _(t);if(!It(e))return;tt(),H=!0,Ge();let n=Date.now(),i=!1,o=!1,r=async m=>{if(!(i||!H||!c.alive)){if(i=!0,window.removeEventListener("message",s),kt&&(c.clear(kt),kt=null),k()){H=!1;return}if(H=!1,m){await sn(t);return}ft(),b(E?"Auto Submit \u2014 Submit not clicked in time; City Change resuming\u2026":"Auto Submit \u2014 Submit not clicked in time; still watching\u2026")}},s=m=>{!c.alive||m.source!==window||m.data?.action===qt.sub&&r(!0)};window.addEventListener("message",s);let u=async()=>{if(i||!H||!c.alive||o)return;let m=Date.now()-n;if(Jc()){o=!0,b("Submit enabled \u2014 clicking\u2026"),Mo();return}if(m>=Je)return r(!1);b("Waiting for Submit to enable\u2026"),kt=c.setTimeout(u,z)};Ao(Je).then(m=>{i||!H||!c.alive||o||m&&u()}),u()}async function ds(){if(!J()||H||N)return;let t=await mt();t&&await Do(t.accountId)}function b(t){let e=document.querySelector(h(a.aiStatus));e&&(e.textContent=t)}function L(t){b(t)}function Qa(t){return!!(t&&t.termsAgreed)}function fs(t){return!!(t&&t.termsPassed)}function ti(){return!!document.querySelector(h(a.aiTermsAgree))?.checked}function Eo(t){let e=document.querySelector(h(a.aiTermsGate)),n=document.querySelector(h(a.aiMain)),i=document.querySelector(h(a.aiTermsAgree)),o=document.querySelector(h(a.aiTermsContinue)),r=fs(t);e&&e.classList.toggle(l.hidden,r),n&&n.classList.toggle(l.hidden,!r),i&&(i.checked=Qa(t)||ti()),o&&(o.disabled=!(Qa(t)||ti()))}function Zc(){let t=document.querySelector(h(a.aiTermsContinue)),e=ti();t&&(t.disabled=!e),b(e?"Terms checked \u2014 tap Continue.":"Check Agree to continue.")}async function tu(){if(!ti()){b("Check Agree first.");return}let t=await P();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=await _(t)||{},{from:n,to:i}=cn(),o=zt(),r=li();bt(),Gt(),$o(),ct=!0,ot=!0,await gt(t,{termsAgreed:!0,termsPassed:!0,termsAgreedAt:e.termsAgreedAt||Date.now(),submitEnabled:!0,citiesEnabled:!0,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],slotWindows:r.length?r:e.slotWindows||null,confirmedAt:Date.now()}),await at(),dt(document.querySelector(h(a.aiSubmitSw)),!0),dt(document.querySelector(h(a.aiCitiesSw)),!0),ct=!0,ot=!0,ve(await _(t)),nn((e.cities||[]).map(u=>u.id),{force:!0,selectedCities:e.cities||[]}),Io(e),Eo(await _(t)),(zt().length?zt():e.cities||[]).length&&(si(),await un()),(n||e.from)&&(i||e.to)&&await ri(),b("Auto Submit and City Change ON \u2014 set dates and preferred cities.")}function ms(t){t?.slotWindows?.length?Nr(t.slotWindows):qi()}function eu(t){let e="";for(let n=0;n<=59;n++){let i=Number(t)===n?" selected":"";e+=`<option value="${n}"${i}>:${String(n).padStart(2,"0")}</option>`}return e}function Xa(t,e){let n=Math.min(Nt,59-Number(t||0)),i="";for(let o=1;o<=Math.max(1,n);o++){let r=Number(e)===o?" selected":"";i+=`<option value="${o}"${r}>${o} min</option>`}return i}function ps(t,e){let n=Number(t)||0,i=Number(e)||1,o=Math.min(59,n+i);return`Runs from :${String(n).padStart(2,"0")} up to :${String(o).padStart(2,"0")}`}function li(){let t=document.querySelector(h(a.aiWinList));if(!t)return[];let e=[];for(let n of t.querySelectorAll(`.${l.aiWinRow}`)){let i=Number(n.querySelector('select[data-win="from"]')?.value),o=Number(n.querySelector('select[data-win="dur"]')?.value);!Number.isFinite(i)||!Number.isFinite(o)||e.push({fromMin:i,durationMin:o})}return Li(e)}function Ja(t){let e=t.querySelector('select[data-win="from"]'),n=t.querySelector('select[data-win="dur"]'),i=t.querySelector(`.${l.aiWinHelp}`);!e||!n||!i||(i.textContent=ps(e.value,n.value))}function hs(t=0,e=6){let n=Math.min(Nt,59-t),i=Math.min(Math.max(1,e||1),Math.max(1,n)),o=document.createElement("div");o.className=l.aiWinRow,o.innerHTML=`
    <div class="${l.aiInline}">
      <label class="${l.aiHead}">Start</label>
      <select data-win="from">${eu(t)}</select>
      <label class="${l.aiHead}" style="margin-left:10px;color:#6b7280;font-weight:500">Duration</label>
      <select data-win="dur">${Xa(t,i)}</select>
      <button type="button" class="${l.aiTrash}" data-win="del" title="Delete timing" aria-label="Delete">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
        </svg>
      </button>
    </div>
    <div class="${l.aiWinHelp}">${ps(t,i)}</div>
  `;let r=o.querySelector('select[data-win="from"]'),s=o.querySelector('select[data-win="dur"]');return c.on(r,"change",()=>{let u=Number(r.value),m=Number(s.value)||1;s.innerHTML=Xa(u,m),Ja(o)}),c.on(s,"change",()=>Ja(o)),c.on(o.querySelector('button[data-win="del"]'),"click",()=>{o.remove(),Po()}),o}function Io(t){let e=document.querySelector(h(a.aiWinList));if(!e)return;e.replaceChildren();let n=t?.slotWindows?.length?Or(t.slotWindows):[];for(let i of n.slice(0,$t))e.appendChild(hs(i.fromMin,i.durationMin));Po(t)}function Po(t){let e=document.querySelector(h(a.aiWinNote));e&&(t?.slotWindows?.length||li().length?e.textContent=`Custom windows active (max ${$t}, each \u2264 ${Nt} min).`:e.textContent=`Using defaults: ${pt()}. Add up to ${$t} windows below.`)}function dt(t,e){t&&(t.classList.toggle(l.aiOnBtn,!!e),t.setAttribute("aria-checked",e?"true":"false"))}function nu(t){dt(document.querySelector(h(a.aiSubmitSw)),It(t)),dt(document.querySelector(h(a.aiCitiesSw)),Et(t))}var ct=!1,ot=!1;function ve(t){let e=It(t)||ct,n=Et(t)||ot,i=document.querySelector(h(a.aiSubmitBody)),o=document.querySelector(h(a.aiCitiesBody));i&&i.classList.toggle(l.hidden,!e),o&&o.classList.toggle(l.hidden,!n)}function iu(t,e){let n=document.querySelector(h(a.aiStatus)),i=document.querySelector(h(a.aiBtn));if(!n||!i)return;nu(t),ve(t);let o=It(t),r=Et(t),s=o||r;s?(i.classList.add(l.aiOn),i.textContent="Tik Tik ON"):(i.classList.remove(l.aiOn),i.textContent="Tik Tik");let u=[];o&&t.from&&t.to?u.push(`Auto Submit ON (${ie(t.from)} \u2013 ${ie(t.to)}, clicks Submit as soon as time slot is ready)`):ct&&!o?u.push("Auto Submit \u2014 set From / To dates, then Enable again"):u.push("Auto Submit OFF"),r?u.push(`City Change ON (${Uc(t)}, ${pt()})`):ot&&!r?u.push("City Change \u2014 pick preferred cities, then Enable again"):u.push("City Change OFF"),n.textContent=`Account ${e||"\u2014"}: ${u.join(" \xB7 ")}`,n.classList.toggle(l.aiOk,s)}async function at(){let t=await P();if(t)try{await ss(t)}catch{}let e=t?await _(t):null;It(e)||(ct=!1),Et(e)?ot=!0:ot=!1,ms(e),iu(e,t),Eo(e);let n=document.querySelector(h(a.aiFrom)),i=document.querySelector(h(a.aiTo));n&&(n.value=e?.from||""),i&&(i.value=e?.to||""),yo();let o=(e?.cities||[]).map(S=>S.id),r=document.querySelector(h(a.aiCitiesBody));(r&&!r.classList.contains(l.hidden)||Et(e)||ot)&&nn(o,{selectedCities:e?.cities||[]}),Io(e);let u=gs(e),m=document.querySelector(h(a.aiLogin)),d=document.querySelector(h(a.aiPass));m&&(u?.loginId||e?.loginId)&&(m.value=u?.loginId||e.loginId||""),d&&(u?.loginPass||e?.loginPass)&&(d.value=u?.loginPass||e.loginPass||"");let p=u?.security||e?.security||[],y=[a.aiQ1,a.aiQ2,a.aiQ3],g=[a.aiA1,a.aiA2,a.aiA3];y.forEach((S,w)=>{let C=document.querySelector(h(S));C&&(C.innerHTML=Qe(w,p[w]?.q||""))}),g.forEach((S,w)=>{let C=document.querySelector(h(S));C&&p[w]?.a&&(C.value=p[w].a)}),Lo(e),Ce||fn(!1)}function ou(){let t=document.querySelector(h(a.aiPanel));return!!(t&&!t.classList.contains(l.hidden))}function fo(t){let e=document.querySelector(h(a.aiPanel));e&&(t||Bt(),e.classList.toggle(l.hidden,!t),t&&P().then(async n=>{if(n)try{co=null,await ss(n)}catch{}let i=n?await _(n):null;Eo(i),fs(i)?nn((i?.cities||[]).map(o=>o.id),{force:!0,selectedCities:i?.cities||[]}):b("Read the terms, check Agree, then Continue.")}))}function mo(){if(mo._done)return;mo._done=!0;let t=e=>{if(!ou())return;let n=document.querySelector(h(a.aiPanel)),i=document.querySelector(h(a.aiBtn)),o=document.querySelector(h(a.aiCal)),r=bo(e);if(!(o&&!o.classList.contains(l.hidden)&&r&&o.contains(r))){if(o&&!o.classList.contains(l.hidden)){let s=document.querySelector(h(a.aiFromBtn)),u=document.querySelector(h(a.aiToBtn));!(s&&r&&(s===r||s.contains(r)))&&!(u&&r&&(u===r||u.contains(r)))&&Bt()}n&&r&&(n===r||n.contains(r))||i&&r&&(i===r||i.contains(r))||(Bt(),fo(!1))}};c.on(document,"pointerdown",t,{capture:!0})}async function ru(t){let e=await P();if(!e){b("Open a logged-in schedule page so we can bind this to your account.");return}let n=await _(e)||{},{from:i,to:o}=cn();if(i=i||n.from||null,o=o||n.to||null,t){ct=!0,dt(document.querySelector(h(a.aiSubmitSw)),!0),bt(),Gt(),$o(),await gt(e,{submitEnabled:!0,from:i||null,to:o||null,confirmedAt:Date.now()});let r=document.querySelector(h(a.aiFrom)),s=document.querySelector(h(a.aiTo));if(r&&i&&(r.value=i),s&&o&&(s.value=o),yo(),await at(),dt(document.querySelector(h(a.aiSubmitSw)),!0),ct=!0,ve(await _(e)),!i||!o){b("Auto Submit ON \u2014 select From and To dates to start booking.");return}if(i>o){b("Auto Submit ON \u2014 From date must be before To date.");return}ct=!1,b(`Auto Submit ON (${ie(i)} \u2013 ${ie(o)})`),await ri();return}ct=!1,Gt(),dt(document.querySelector(h(a.aiSubmitSw)),!1),await gt(e,{submitEnabled:!1,from:i||n.from,to:o||n.to}),await at(),b("Auto Submit OFF")}async function au(t){let e=await P();if(!e){b("Open a logged-in schedule page so we can bind this to your account.");return}let n=await _(e)||{};if(t){ot=!0,dt(document.querySelector(h(a.aiCitiesSw)),!0),nn((n.cities||[]).map(s=>s.id),{force:!0,selectedCities:n.cities||[]}),Io(n);let o=zt();!o.length&&n.cities?.length&&(o=n.cities);let r=li();if(bt(),await gt(e,{citiesEnabled:!0,...o.length?{cities:o}:{},slotWindows:r.length?r:n.slotWindows||null}),await at(),dt(document.querySelector(h(a.aiCitiesSw)),!0),ot=!0,ve(await _(e)),o.length||nn([],{force:!0}),!o.length){b("City Change ON \u2014 select at least one preferred city to start hopping.");return}ot=!0,ve(await _(e)),si(),await un(),b(`City Change ON (${o.map(s=>s.name||s.id).join(", ")}) \u2014 edit cities anytime`);return}ot=!1,Se(),dt(document.querySelector(h(a.aiCitiesSw)),!1);let i=zt();await gt(e,{citiesEnabled:!1,cities:i.length?i:n.cities||[]}),await at(),b("City Change OFF")}async function Za(){let t=await P();if(!t)return;let e=await _(t)||{};if(!It(e)&&!ct)return;let{from:n,to:i}=cn();!n||!i||n>i||(await gt(t,{submitEnabled:!0,from:n,to:i,confirmedAt:Date.now()}),ct=!1,await at(),dt(document.querySelector(h(a.aiSubmitSw)),!0),bt(),$o(),b(`Auto Submit ON (${ie(n)} \u2013 ${ie(i)})`),await ri())}function su(t){return(t||[]).map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", ")}async function lu(){let t=document.querySelector(h(a.aiWinList));if(t){if(t.querySelectorAll(`.${l.aiWinRow}`).length>=$t){b(`Max ${$t} timing windows.`);return}t.appendChild(hs(0,Math.min(6,Nt))),Po()}}async function cu(){let t=await P();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=li();if(!e.length){b("Add at least one timing (or Reset to defaults).");return}await gt(t,{slotWindows:e}),await at(),b(`Saved ${e.length} custom timing(s): ${su(e)}`)}async function uu(){let t=await P();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}window.confirm("Reset to default IST windows? Your custom timings will be removed.")&&(await gt(t,{slotWindows:null}),qi(),await at(),b(`Using default windows: ${pt()}`))}var Ce=null;function po(){return`lp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`}function ts(t){if(!t||String(t).length<10)return"\u2014";try{return new Date(`${String(t).slice(0,10)}T12:00:00`).toLocaleDateString("en-US",{month:"short",day:"numeric"})}catch{return String(t).slice(0,10)}}function dn(t){let e=Array.isArray(t?.loginProfiles)?t.loginProfiles.filter(Boolean):[];return e.length?e.map(n=>({id:String(n.id||po()),loginId:String(n.loginId||"").trim(),loginPass:String(n.loginPass||""),security:Array.isArray(n.security)?n.security:[],from:n.from||null,to:n.to||null,cities:Array.isArray(n.cities)?n.cities:[],visa:n.visa||""})):t?.loginId&&t?.loginPass?[{id:t.activeLoginProfileId||po(),loginId:String(t.loginId).trim(),loginPass:String(t.loginPass),security:Array.isArray(t.security)?t.security:[],from:t.from||null,to:t.to||null,cities:Array.isArray(t.cities)?t.cities:[],visa:""}]:[]}function gs(t){let e=dn(t);if(!e.length)return null;let n=t?.activeLoginProfileId;return e.find(i=>String(i.id)===String(n))||e[0]}function du(t){let n=(t?.cities||[]).map(o=>o.name||o.id).filter(Boolean)[0]||"\u2014",i=String(t?.visa||"").trim();return i?`${n} (${i})`:n}function fu(t){return`${ts(t?.from)} \u2192 ${ts(t?.to)}`}function ys(t){let e=document.querySelector(h(a.aiLogin)),n=document.querySelector(h(a.aiPass));e&&(e.value=t?.loginId||""),n&&(n.value=t?.loginPass||"");let i=t?.security||[];[a.aiQ1,a.aiQ2,a.aiQ3].forEach((o,r)=>{let s=document.querySelector(h(o));s&&(s.innerHTML=Qe(r,i[r]?.q||""))}),[a.aiA1,a.aiA2,a.aiA3].forEach((o,r)=>{let s=document.querySelector(h(o));s&&(s.value=i[r]?.a||"")})}function mu(){ys(null)}function fn(t,e){let n=document.querySelector(h(a.aiLoginBody)),i=document.querySelector(h(a.aiLoginEditorTitle));n&&n.classList.toggle(l.hidden,!t),i&&(i.textContent=e||(t?"Edit profile":""))}function Lo(t){let e=document.querySelector(h(a.aiProfilesList));if(!e)return;let n=dn(t),i=gs(t)?.id||null;if(e.replaceChildren(),!n.length){let o=document.createElement("p");o.className=l.aiQlEmpty,o.textContent="No profiles yet. Add one for faster Home login.",e.appendChild(o);return}for(let o of n){let r=document.createElement("div");r.className=l.aiQlCard,r.dataset.profileId=o.id;let s=document.createElement("div");s.className=l.aiQlMeta;let u=document.createElement("strong");u.textContent=o.loginId||"Untitled";let m=document.createElement("span");m.textContent=du(o);let d=document.createElement("span");d.textContent=fu(o);let p=document.createElement("button");if(p.type="button",p.className=l.aiQlEdit,p.textContent="Edit",p.dataset.editProfile=o.id,s.append(u,m,d,p),r.appendChild(s),String(o.id)===String(i)){let y=document.createElement("span");y.className=l.aiQlBadge,y.textContent="Active Profile",r.appendChild(y)}else{let y=document.createElement("button");y.type="button",y.className=l.aiQlEdit,y.style.marginTop="2px",y.textContent="Use",y.dataset.activateProfile=o.id,r.appendChild(y)}e.appendChild(r)}}async function pu(t){let e=await P();if(!e)return;let n=await _(e)||{},i=dn(n),o=i.find(s=>String(s.id)===String(t));if(!o)return;await an(e,{...n,loginProfiles:i,activeLoginProfileId:o.id,loginId:o.loginId,loginPass:o.loginPass,security:o.security,serverUpdatedAt:Date.now()});let r=await _(e);Lo(r),b(`Active login profile: ${o.loginId}`)}async function hu(){Ce=null,mu(),fn(!0,"Add Quick Login Profile"),b("Enter ID, password, and 3 security answers, then Save.")}async function gu(t){let e=await P(),n=e?await _(e):null,i=dn(n).find(o=>String(o.id)===String(t));i&&(Ce=i.id,ys(i),fn(!0,`Edit \u2014 ${i.loginId}`))}function yu(){Ce=null,fn(!1),b("Profile editor closed.")}async function bu(){let t=await P();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=await _(t)||{},{from:n,to:i}=cn(),o=zt(),r=document.querySelector(h(a.aiLogin))?.value?.trim(),s=document.querySelector(h(a.aiPass))?.value,u=[0,1,2].map(w=>({q:document.querySelector(h([a.aiQ1,a.aiQ2,a.aiQ3][w]))?.value?.trim()||"",a:document.querySelector(h([a.aiA1,a.aiA2,a.aiA3][w]))?.value?.trim()||"",set:w+1}));if(!r||!s){b("Enter ID and password before saving.");return}if(u.some(w=>!w.q||!w.a)){b("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}let m="";try{let w=await W();m=String(w?.visa||"").trim()}catch{}let d=dn(e),p=Ce||po(),y={id:p,loginId:r,loginPass:s,security:u,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],visa:m},g=d.findIndex(w=>String(w.id)===String(p));g>=0?d[g]=y:d.push(y),await gt(t,{loginProfiles:d,activeLoginProfileId:p,loginId:r,loginPass:s,security:u});let S=await _(t)||{};await an(t,{...S,loginProfiles:d,activeLoginProfileId:p,loginId:r,loginPass:s,security:u,serverUpdatedAt:Date.now()}),Ce=null,fn(!1),Lo(await _(t)),b(`Quick Login profile saved \u2014 Active: ${r}`)}function wu(t){let e=t.target;if(!e||!e.closest)return;let n=e.closest("[data-edit-profile]");if(n){t.preventDefault(),gu(n.getAttribute("data-edit-profile"));return}let i=e.closest("[data-activate-profile]");i&&(t.preventDefault(),pu(i.getAttribute("data-activate-profile")))}function qo(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==a.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==a.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===a.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function ho(){document.querySelector(h(a.aiPanel))?.remove(),document.querySelector(h(a.aiBtn))?.remove(),document.querySelector(h(a.hud))?.remove(),Ji(),qo()}function Su(){if(k())return;if(!yt()){ho();return}if(document.querySelector(h(a.aiBtn)))if(!document.querySelector(h(a.aiSubmitSw))||!document.querySelector(h(a.aiTermsContinue))||!document.querySelector(h(a.aiFromBtn))||!document.querySelector(h(a.aiProfiles)))ho();else return;let t=Gr();if(!t)return;let e=document.createElement("button");e.id=a.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[A.mark]="",c.on(e,"click",i=>{i.stopPropagation();let o=document.querySelector(h(a.aiPanel)),r=o&&o.classList.contains(l.hidden);fo(!!r)}),t.appendChild(e);let n=document.createElement("div");n.id=a.aiPanel,n.className=l.hidden,n.dataset[A.mark]="",n.innerHTML=`
    <div id="${a.aiTermsGate}">
      <div id="${a.aiTerms}" class="${l.aiTerms}">
        <div class="${l.aiHead}">Terms &amp; Conditions</div>
        <div class="${l.aiHint}">Please read carefully before continuing.</div>
        <ul class="${l.aiTermsList}">
          <li>Options apply to this applicant only. They do not bypass CAPTCHAs, waiting rooms, or portal security.</li>
          <li>During your windows, City Change hops every 15\u201318s. Max ${$t} windows, each up to ${Nt} minutes.</li>
          <li>Checking too fast may trigger <b>1015 Rate Limit</b> errors.</li>
        </ul>
        <label class="${l.aiTermsCb}">
          <input type="checkbox" id="${a.aiTermsAgree}" />
          <span>I have read and agree to these terms.</span>
        </label>
        <button type="button" id="${a.aiTermsContinue}" class="${l.aiContinue}" disabled>Continue</button>
      </div>
    </div>
    <div id="${a.aiMain}" class="${l.hidden}">
      <div class="${l.aiSec}">
        <div class="${l.aiRow}" style="justify-content:space-between;margin-bottom:4px">
          <div>
            <div class="${l.aiHead}" style="font-size:17px">Auto Submit</div>
            <div class="${l.aiHint}" style="margin:2px 0 0">Book only dates in your From\u2013To range. Out of range \u2192 jump calendar, no book.</div>
          </div>
          <button type="button" id="${a.aiSubmitSw}" class="${l.aiSwitch}" role="switch" aria-checked="false" aria-label="Auto Submit">
            <span class="${l.aiKnob}"></span>
          </button>
        </div>
        <div id="${a.aiSubmitBody}" class="${l.hidden}">
          <div class="${l.aiRow}" style="margin-top:10px">
            <label>From
              <button type="button" id="${a.aiFromBtn}" class="${l.aiDateBtn}">Select date</button>
              <input type="hidden" id="${a.aiFrom}" />
            </label>
            <label>To
              <button type="button" id="${a.aiToBtn}" class="${l.aiDateBtn}">Select date</button>
              <input type="hidden" id="${a.aiTo}" />
            </label>
          </div>
        </div>
      </div>
      <div class="${l.aiSec}">
        <div class="${l.aiRow}" style="justify-content:space-between;margin-bottom:4px">
          <div>
            <div class="${l.aiHead}" style="font-size:17px">City Change</div>
            <div class="${l.aiHint}" style="margin:2px 0 0">Rotate preferred cities during release windows.</div>
          </div>
          <button type="button" id="${a.aiCitiesSw}" class="${l.aiSwitch}" role="switch" aria-checked="false" aria-label="City Change">
            <span class="${l.aiKnob}"></span>
          </button>
        </div>
        <div id="${a.aiCitiesBody}" class="${l.hidden}">
          <div class="${l.aiHint}" style="margin:10px 0 4px;font-weight:600;color:#111827">
            Preferred cities
            <button type="button" id="${a.aiCitiesAll}" class="${l.aiCityAct}">Select all</button>
            <button type="button" id="${a.aiCitiesNone}" class="${l.aiCityAct}">Clear</button>
          </div>
          <div id="${a.aiCities}" class="${l.aiCities}"></div>
          <div class="${l.aiHead}" style="font-size:16px;margin:14px 0 8px">Release Window Checks</div>
          <p id="${a.aiWinNote}" class="${l.aiHint}"></p>
          <div id="${a.aiWinList}"></div>
          <div class="${l.aiRow}" style="margin-top:8px">
            <button type="button" id="${a.aiWinAdd}">+ Add timing</button>
            <button type="button" id="${a.aiWinSave}">Save timings</button>
            <button type="button" id="${a.aiWinReset}">Reset defaults</button>
          </div>
        </div>
      </div>
      <div class="${l.aiSec}">
        <div id="${a.aiProfiles}" class="${l.aiQl}">
          <div class="${l.aiQlTitle}">Quick Login Profiles</div>
          <p class="${l.aiQlSub}">Active Profile is used for quick login to the visa portal.</p>
          <div id="${a.aiProfilesList}"></div>
          <button type="button" id="${a.aiAddProfile}" class="${l.aiQlAdd}">+ Add Profile</button>
        </div>
        <div id="${a.aiLoginBody}" class="${l.hidden}" style="margin-top:10px">
          <div id="${a.aiLoginEditorTitle}" class="${l.aiHead}" style="font-size:15px;margin:0 0 8px">Add Quick Login Profile</div>
          <div class="${l.aiHint}" style="margin:0 0 8px">Saved on this computer only. Used for auto-login on Home when logged out.</div>
          <div class="${l.aiRow}">
            <label>ID / email <input type="email" id="${a.aiLogin}" autocomplete="off" /></label>
            <label>Password <input type="password" id="${a.aiPass}" autocomplete="off" /></label>
          </div>
          <div class="${l.aiHint}" style="margin:0 0 6px">
            3 sets \xD7 5 questions. Pick <b>1 question from each set</b>, then type <b>your answer</b> for that question.
          </div>
          <div class="${l.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 1 \u2014 choose 1 question
              <select id="${a.aiQ1}">${Qe(0)}</select>
            </label>
            <label>Your answer for set 1
              <input type="text" id="${a.aiA1}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${l.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 2 \u2014 choose 1 question
              <select id="${a.aiQ2}">${Qe(1)}</select>
            </label>
            <label>Your answer for set 2
              <input type="text" id="${a.aiA2}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${l.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 3 \u2014 choose 1 question
              <select id="${a.aiQ3}">${Qe(2)}</select>
            </label>
            <label>Your answer for set 3
              <input type="text" id="${a.aiA3}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${l.aiRow}">
            <button type="button" id="${a.aiSaveLogin}">Save profile</button>
            <button type="button" id="${a.aiLoginCancel}">Cancel</button>
          </div>
        </div>
        <div class="${l.aiRow}" style="margin-top:10px">
          <button type="button" id="${a.aiClose}">Close</button>
        </div>
      </div>
    </div>
    <div id="${a.aiStatus}" class="${l.aiHint}" style="margin-top:10px"></div>
  `,t.insertAdjacentElement("afterend",n),c.on(n.querySelector(h(a.aiSubmitSw)),"click",async()=>{let i=await P(),o=i?await _(i):null;await ru(!It(o))}),c.on(n.querySelector(h(a.aiCitiesSw)),"click",async()=>{let i=await P(),o=i?await _(i):null;await au(!Et(o))}),c.on(n.querySelector(h(a.aiWinAdd)),"click",lu),c.on(n.querySelector(h(a.aiWinSave)),"click",cu),c.on(n.querySelector(h(a.aiWinReset)),"click",uu),c.on(n.querySelector(h(a.aiSaveLogin)),"click",bu),c.on(n.querySelector(h(a.aiLoginCancel)),"click",yu),c.on(n.querySelector(h(a.aiAddProfile)),"click",hu),c.on(n.querySelector(h(a.aiProfilesList)),"click",wu),c.on(n.querySelector(h(a.aiClose)),"click",()=>fo(!1)),c.on(n.querySelector(h(a.aiCitiesAll)),"click",()=>{Ga(!0),eo()}),c.on(n.querySelector(h(a.aiCitiesNone)),"click",()=>{Ga(!1),eo()}),c.on(n.querySelector(h(a.aiCities)),"change",i=>{i.target&&i.target.type==="checkbox"&&eo()}),c.on(n.querySelector(h(a.aiTermsAgree)),"change",()=>{Zc()}),c.on(n.querySelector(h(a.aiTermsContinue)),"click",()=>{tu()}),c.on(n.querySelector(h(a.aiFromBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(h(a.aiCal));if(o&&!o.classList.contains(l.hidden)&&et.which==="from"){Bt();return}Ha("from",i.currentTarget)}),c.on(n.querySelector(h(a.aiToBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(h(a.aiCal));if(o&&!o.classList.contains(l.hidden)&&et.which==="to"){Bt();return}Ha("to",i.currentTarget)}),mo(),at()}function xu(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",c.on(e,"click",()=>{P().then(n=>{sn(n||null)})}))};t(document.querySelector("#submitbtn")),c.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function Ro(){if(!c.alive||k())return;if(!yt()){ho(),Ji();return}if(!await c.waitFor("#post_select",{attempts:vn}))return;$a(e=>{let n=String(e?.message||e?.source||"error").slice(0,120);tn(n)}),Su(),si(),xu(),Ra(()=>Hc());let t=document.querySelector("#post_select");if(t?.value){let e=t.selectedOptions?.[0]?.textContent?.trim()||t.options?.[t.selectedIndex]?.textContent?.trim()||t.value;Ve(String(t.value),e)}Ka||(Ka=!0,c.setTimeout(()=>at(),800),c.setTimeout(async()=>{await mt()&&await ri()},1500))}var bs=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function ws(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function vu(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=ws(t.data.url),i=new URLSearchParams(t.data.request||"").get("parameters");if(!i)return null;let o;try{o=JSON.parse(i)}catch{return null}return{params:o,tail:e,response:t.data.response}}async function Cu(t,e={}){t?.length&&(await ua(t,e),await $("audioAlert")&&Xr())}async function $u(t,e=!1){if(e||k())return null;let n=new Date;n.setHours(0,0,0,0);let i=(t||[]).map(s=>{if(!s)return null;let u=ui(s.Date);return u?{...s,Date:u}:null}).filter(Boolean).filter(s=>{let[u,m,d]=s.Date.slice(0,10).split("-").map(Number);return!u||!m||!d?!1:new Date(u,m-1,d)>=n}).sort((s,u)=>String(s.Date).localeCompare(String(u.Date))),o=await Me();if(o){let s=i.filter(d=>oe(d.Date,o.from,o.to));if(!s.length||!(o.submitArmed||!!await $("autoSelectFirstDate")))return null;let m=Te(s.length);return s[m]?.Date||null}if(!await $("autoSelectFirstDate")||!i.length)return null;let r=Te(i.length);return i[r]?.Date||null}async function Tu(t,e){if(!t||k()||ke())return;let n=e?`none in ${e.from} \u2192 ${e.to}`:"outside preferred range";L(`Dates found but ${n} \u2014 jumping calendar to ${t} (not booking)\u2026`);try{await c.waitFor(Ts,{attempts:80,interval:z})}catch{}c.send({action:"selectFirstDate",date:t,navigateOnly:!0,maxMs:4e3,pollMs:z})}function ui(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,r,s]=n;return`${s}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime())){let r=o.getFullYear(),s=String(o.getMonth()+1).padStart(2,"0"),u=String(o.getDate()).padStart(2,"0");return`${r}-${s}-${u}`}}return null}function ku(t){if(!t)return!1;let[e,n,i]=t.slice(0,10).split("-").map(Number);if(!e||!n||!i)return!1;let o=n-1,r=String(n).padStart(2,"0")+"/"+String(i).padStart(2,"0")+"/"+e,s=document.querySelector("#datepicker");if(s){let u=String(s.value||"").trim();if(u===r)return!0;if(u.includes(String(e))&&u.includes(String(i).padStart(2,"0"))){let m=u.split(/[/-]/).map(d=>parseInt(d,10));if(m.length>=3){let d,p,y;if(m[2]>31?(p=m[0],y=m[1],d=m[2]):(d=m[0],p=m[1],y=m[2]),d===e&&p===n&&y===i)return!0}}try{let m=window.jQuery||window.$;if(m&&m(s).hasClass("hasDatepicker")){let d=m(s).datepicker("getDate");if(d&&d.getFullYear()===e&&d.getMonth()===o&&d.getDate()===i)return!0}}catch{}}for(let u of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let m=u.querySelector("a");if(!m)continue;let d=parseInt(u.getAttribute("data-month"),10),p=parseInt(u.getAttribute("data-year"),10),y=parseInt(m.textContent,10);if(p===e&&d===o&&y===i)return!0}return!1}var ci=null;function Ss(t,e){ci&&c.clear(ci);let n=Date.now()+(e?$e:8e3),i=()=>{!c.alive||Date.now()>n||ku(t)||(c.send({action:"selectFirstDate",date:t,maxMs:e?$e:8e3,pollMs:z}),ci=c.setTimeout(i,z))};ci=c.setTimeout(i,80)}function xs(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function _u(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function vs(t){return t?.length?t.map((e,n)=>({entry:e,index:n,avail:_u(e)})).sort((e,n)=>n.avail!==e.avail?n.avail-e.avail:e.index-n.index):[]}function Mu(t){let e=vs(t);return e.length?{entry:e[0].entry,slotIndex:e[0].index}:{entry:null,slotIndex:0}}function Ho(){ae&&(c.clear(ae),ae=null)}var Oo=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),di=null,fi=null,ae=null,mi="";function Au(t,e){di=t,fi=e?String(e).slice(0,10):null}var Du=8e3,No=!1;async function Cs(t){if(No||_e())return!1;No=!0;try{Ho(),di=null,fi=null;let e=await wo(t);return e?(mi=e,Ss(e,!0),$s(e,on),!0):(ft(),L("No time slots left on this city \u2014 next city in 15\u201318s\u2026"),!1)}finally{No=!1}}function $s(t,e=0){ae&&c.clear(ae);let n=t?String(t).slice(0,10):null,i=Date.now(),o=async()=>{if(!c.alive||ke()||J())return;if(Date.now()-i>=Du){let s=fi===n?(di||[]).filter(m=>m&&m.Time):[],u=document.querySelector(Oo);if(!s.length&&!u){await Cs("No time slots");return}if(Date.now()-i>=2e4)return}let r=fi===n?(di||[]).filter(s=>s&&s.Time):[];if(r.length){let{entry:s,slotIndex:u}=Mu(r);if(L(`Watchdog: picking time slot #${u+1}\u2026`),await ze({time:xs(s.Time),date:s.Date?String(s.Date).slice(0,10):n,slotIndex:u,pollMs:z,maxMs:600,prefix:f}),J())return}else if(document.querySelector(Oo)&&(L("Watchdog: picking visible time slot\u2026"),await ze({time:"00:00",date:n,slotIndex:e,pollMs:z,maxMs:600,prefix:f}),J()))return;ae=c.setTimeout(o,z)};ae=c.setTimeout(o,300)}var Ts=["#datepicker.hasDatepicker","#datepicker"].join(", ");async function Eu(t,e=!1){if(e)return null;let n=await Me(),i=await mt(),o=await $u(t,e),r=new Date;r.setHours(0,0,0,0);let s=(t||[]).map(d=>ui(d?.Date)).filter(Boolean).filter(d=>{let[p,y,g]=d.slice(0,10).split("-").map(Number);return new Date(p,y-1,g)>=r}).sort((d,p)=>d.localeCompare(p));if(!o&&n&&s.length&&!s.filter(p=>oe(p,n.from,n.to)).length)return await Tu(s[0],n),null;if(!o)return null;let u=n?s.filter(d=>oe(d,n.from,n.to)):s,m=Te(u.length);return L(`Selecting date #${m+1}: ${o} (fast)\u2026`),ni(o),mi=String(o).slice(0,10),await c.waitFor(Ts,{attempts:80,interval:z}),c.send({action:"selectFirstDate",date:o,maxMs:i||n?$e:8e3,pollMs:z}),Ss(o,i||n),$s(o,on),o}async function Iu(t,e=!1){if(e||k()||ke())return;let n=await mt(),i=await Me();if(!n&&!i&&!await $("autoSelectFirstDate"))return;Ho();let o=(t||[]).filter(d=>!(!d||!d.Time||d.EntriesAvailable!=null&&Number(d.EntriesAvailable)<=0)),r=n||i;r&&(o=o.filter(d=>{let p=d.Date?String(d.Date).slice(0,10):null;return p?p>=r.from&&p<=r.to:!0}));let s=vs(o);if(!s.length)return;let u=Date.now()+1e4;for(;Date.now()<u&&c.alive&&!(wa(o)||document.querySelector(Oo));)await new Promise(d=>c.setTimeout(d,z));let m=s.length===1?Je:es;L(s.length===1?`1 time slot \u2014 try highest avail, wait \u2264${m/1e3}s for Submit\u2026`:`${s.length} time slots \u2014 try highest\u21922nd\u21923rd\u2026 (${m/1e3}s each for Submit)`);for(let d=0;d<s.length;d++){if(!c.alive||ke()||k())return;let{entry:p,index:y,avail:g}=s[d],S=xs(p.Time),w=p.Date?String(p.Date).slice(0,10):null,C=d===0?"highest":d===1?"2nd-highest":d===2?"3rd-highest":`${d+1}th-highest`;if(L(`Trying ${C} avail (${g}) @ ${S} \u2014 slot ${d+1}/${s.length}\u2026`),!await ze({time:S,date:w,slotIndex:y,pollMs:z,maxMs:4e3,prefix:f})&&!J()){L(`Could not click ${S} \u2014 trying next\u2026`);continue}if(L(`Selected ${S} (${C}) \u2014 waiting \u2264${m/1e3}s for Submit to enable\u2026`),await Ao(m)){L(`Submit enabled on ${S} \u2014 clicking\u2026`),n?await Do(n.accountId):Mo();return}d<s.length-1&&L(`Submit still disabled on ${S} \u2014 trying next (${d+2}/${s.length})\u2026`)}L(`Tried all ${s.length} time slot(s); Submit never enabled.`),n&&ft()}async function ks(t){if(!U()||k())return;let e;try{e=vu(t)}catch{return}if(e==null)return;if(Ta(e),e.retryAfter!==void 0){let r=Number(e.retryAfter);Ar(e.cgiBlock,r),r?(Pn(r),Co(r)):$("defaultWaitTime").then(s=>{Pn(s),Co(s)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let r=e.response.Posts||[],s=new Map((await Ct()).map(u=>[u.ID,u]));for(let u of r)s.set(u.ID,{...s.get(u.ID),...u});await ue([...s.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let r=e.response.Members||[];if(r.length){let s=await W()||{},u=s.name&&r.find(m=>m.FullName===s.name);s.visa=(u||r[0]).VisaClassName,await M({profile:s,members:r})}}if(bs.includes(e.tail)){bt(),ea(e);let r=(e.response.ScheduleDays||[]).map(w=>ui(w?.Date)).filter(Boolean).sort(),s=r.length;if(s&&L(`${s} date${s===1?"":"s"} available \u2014 see list below`),s>0&&!e.response.HasError&&tt(),rs(),!e.response.HasError&&s>0){let w=String(e.params.postId||""),C=r[0],I=r[r.length-1];oi(w,!0,""),L(`${s} date${s===1?"":"s"} \u2014 alerting others FAST\u2026`),Xi({postId:w,postName:"",dayCount:s,dateFrom:C,dateTo:I,bestDate:C}).catch(()=>{})}else e.response.HasError||oi(String(e.params.postId||""),!1,"");let u=await mt(),m=await Me(),d=u||m;await re()||$("defaultWaitTime").then(w=>{Pn(w)});let y=await Ct(),g=y.find(w=>w.ID===e.params.postId);if(g&&(g.Days=e.response.ScheduleDays,g.Updated=Date.now(),g.HasError=e.response.HasError,g.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,ue(y)),!e.response.HasError&&s>0){let w=String(e.params.postId||""),C=r[0],I=r[r.length-1],v=C,Y=I,ce=s;if(d?.from&&d?.to){let Vt=r.filter(ll=>oe(ll,d.from,d.to));Vt.length&&(v=Vt[0],Y=Vt[Vt.length-1],ce=Vt.length)}Xi({postId:w,postName:g?.Name,dayCount:ce,dateFrom:v,dateTo:Y,bestDate:v,rangeFrom:d?.from||null,rangeTo:d?.to||null}).catch(()=>{}),oi(w,!0,g?.Name||"")}if(await Cu(e.response.ScheduleDays,{postId:e.params.postId,postName:g?.Name,hasError:e.response.HasError}),await da(e.response.ScheduleDays,{postId:e.params.postId,postName:g?.Name,hasError:e.response.HasError}),_e())tt(),L("Submit pending \u2014 staying on this city (date reload ignored)\u2026");else if(d&&!e.response.HasError){let w=en(e.response.ScheduleDays,d.from,d.to);w.length?(tt(),L(`${w.length} date${w.length===1?"":"s"} in range \u2014 selecting (city hold)\u2026`)):ft()}else d?ft():s>0&&!e.response.HasError&&(await $("autoSelectFirstDate")||ft());let S=_e()?null:await Eu(e.response.ScheduleDays,e.response.HasError);if(S)tt(),await fa(g?.Name,S);else if(d&&!e.response.HasError&&!_e()){let w=(e.response.ScheduleDays||[]).map(I=>ui(I?.Date)).filter(Boolean).sort((I,v)=>I.localeCompare(v)),C=w.filter(I=>oe(I,d.from,d.to));w.length&&!C.length?(ft(),L(`Dates found but none in ${d.from} \u2192 ${d.to}. Jumped calendar (not booking). Next city in 15\u201318s\u2026`)):w.length||(ft(),L("No dates on this city \u2014 next city in 15\u201318s\u2026"))}await Tn()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let r=e.params.Date.split("T")[0];Au(e.response.ScheduleEntries,r),Ho();let s=await Ct(),u=s.filter(p=>p.Days&&p.Updated).sort((p,y)=>y.Updated-p.Updated).find(p=>p.Days.some(y=>y.Date===r));if(u){let p=u.Days.find(y=>y.Date===r);p&&(p.Times=e.response.ScheduleEntries,ue(s))}let m=(e.response.ScheduleEntries||[]).filter(p=>p&&p.Time);if(mi&&r!==mi){await Tn();return}let d=m.filter(p=>p.EntriesAvailable==null||Number(p.EntriesAvailable)>0);if(na(m,r,u?.Name),m.length){let p=d.reduce((g,S)=>{let w=Number(S.EntriesAvailable);return g+(Number.isFinite(w)?w:0)},0),y=p>0?` \xB7 ${p} available`:"";L(`${d.length||m.length} time slot${(d.length||m.length)===1?"":"s"} on ${r}${y}`)}await Iu(e.response.ScheduleEntries,e.response.HasError),_e()?(tt(),L("Submit pending \u2014 staying on this city (time reload ignored)\u2026")):d.length?(tt(),await ma(u?.Name,e.params.Date,d.length)):await Cs("No time slots on this date"),await Tn()}}function _s(t){if(!U()||k())return;let e=ws(t.data.url);bs.includes(e)&&Yr()}var se=null,Bo="",Wo={scanning:"Scanning for Cloudflare challenge\u2026",dom:"Trying page-level verify click\u2026",debugger:"Advanced click \u2014 targeting Turnstile iframe\u2026",retry:"Waiting before next attempt\u2026",success:"Verification passed \u2014 continuing\u2026",manual:"Stuck? Click the checkbox once, then we\u2019ll continue."};function Ms(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=l.cfFlash,n.dataset[A.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),c.setTimeout(()=>n.remove(),1200)}}function Pu(){let t=document.querySelector(h(a.cfHud));return t||(t=document.createElement("div"),t.id=a.cfHud,t.dataset[A.mark]="",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.innerHTML=`
    <div class="${l.cfHud}">
      <div class="${l.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">\u{1F6E1}</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${Wo.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `,document.documentElement.appendChild(t),t)}async function K(t,e){if(!chrome.runtime?.id||!c.alive||!await $("autoCloudflareTick"))return;let n=Pu(),i=n.querySelector("[data-cf-msg]"),o=n.querySelector("[data-cf-sub]"),r=n.querySelector("[data-cf-chip]"),s=n.querySelector(`.${l.cfHud}`);Bo=t,i&&(i.textContent=Wo[t]||Wo.scanning),o&&(o.textContent=e||Lu(t)),r&&(r.textContent=t==="success"?"Done":t==="manual"?"Help":"Active",r.dataset.state=t),s&&(s.dataset.state=t),se&&(c.clear(se),se=null),t==="success"&&(se=c.setTimeout(()=>Fo(),2800))}function Lu(t){return t==="debugger"?"Precision click via advanced browser bridge":t==="dom"?"Standard page interaction":t==="manual"?"One manual click is usually enough":t==="success"?"Resuming login and recovery":"Monitoring this tab for Turnstile"}function Fo(){let t=document.querySelector(h(a.cfHud));t&&t.remove(),Bo="",se&&(c.clear(se),se=null)}function Uo(){return Bo}var qu=/we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i,Ru=/\bUSG\s+[a-f0-9-]{8,}/i;var Ko="vsPortalErrorReloadCount",Es="vsPortalErrorReloadAt",Nu=2e3,Ou=1e4,As=!1,Ae=null,Hu=null;function Wu(){return(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim()}function De(){let t=Wu().slice(0,6e3);return t?!!(/a timeout occurred/i.test(t)&&(/error\s*524/i.test(t)||/origin web server timed out/i.test(t)||/cloudflare ray id/i.test(t))||/error\s*524/i.test(t)&&/cloudflare/i.test(t)&&t.length<8e3||qu.test(t)&&(Ru.test(t)||/error id\s*#/i.test(t))||/we'?re sorry,\s*but something went wrong/i.test(t)&&t.length<2500):!1}function Is(){try{return Math.max(0,Number(sessionStorage.getItem(Ko)||0))}catch{return 0}}function Bu(){try{let t=Is()+1;return sessionStorage.setItem(Ko,String(t)),sessionStorage.setItem(Es,String(Date.now())),t}catch{return 1}}function zo(){try{sessionStorage.removeItem(Ko),sessionStorage.removeItem(Es)}catch{}}function Fu(t){return Math.min(Ou,Nu+Math.max(0,t-1)*1e3)}function Uu(){Ae&&(c.clear(Ae),Ae=null)}function zu(){Bu();try{location.reload()}catch{}}function Ds(){if(!c.alive||Ae)return;if(!De()){zo();return}let t=Is()+1,e=Fu(t);Ae=c.setTimeout(()=>{if(Ae=null,!!c.alive){if(!De()){zo();return}zu()}},e)}function Ps(){if(As)return;As=!0;let t=()=>{c.alive&&(De()?Ds():(zo(),Uu()))};t(),Hu=c.setInterval(t,1500);try{let e=new MutationObserver(()=>{c.alive&&De()&&Ds()});e.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),c.disposable(()=>e.disconnect())}catch{}}var pi="vsDebugLogs",Ku=200;function Gu(){try{return new Date().toLocaleTimeString("en-IN",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})}catch{return new Date().toISOString().slice(11,19)}}async function F(t,e,n){let i={at:Date.now(),t:Gu(),tag:String(t||"app").slice(0,24),msg:String(e||"").slice(0,400)};if(n!=null)try{i.data=JSON.parse(JSON.stringify(n))}catch{i.data=String(n).slice(0,200)}try{console.log(`[VS6 ${i.tag}] ${i.msg}`,n!==void 0?n:"")}catch{}try{let o=await T({[pi]:[]}),r=Array.isArray(o[pi])?o[pi].slice():[];for(r.push(i);r.length>Ku;)r.shift();await M({[pi]:r})}catch{}}var gi=null,pn=0,mn=null,Lt=0;async function ju(){try{let t=await T(["humanClickProfile","humanClickServerProfile"]),e=t.humanClickProfile?.samples?.length||0,n=t.humanClickServerProfile?.samples?.length||0;return e+n>=1?400:4e3}catch{return 800}}var jo=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function st(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!G()&&!Uo()}function G(){if(De()||document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return jo.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:yi().length>0}function hi(t){return new Promise(e=>setTimeout(e,t))}function Yu(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let i of n.querySelectorAll("*"))i.shadowRoot&&(t.push(i.shadowRoot),e.push(i.shadowRoot))}return t}function yi(){let t=[],e=new Set,n=i=>{if(!i||e.has(i))return;let o=i.getBoundingClientRect();if(o.width<40||o.height<20||o.width>900||o.height>400)return;let r=(i.src||i.getAttribute?.("src")||"").toLowerCase(),s=(i.title||i.getAttribute?.("title")||"").toLowerCase(),u=(i.className?.toString?.()||"").toLowerCase(),m=(i.id||"").toLowerCase(),d=i.tagName==="IFRAME"&&(r.includes("challenges.cloudflare")||r.includes("turnstile")||s.includes("cloudflare")||s.includes("security challenge")),p=u.includes("cf-turnstile")||u.includes("turnstile")||m.includes("turnstile")||m.includes("challenge")||i.hasAttribute?.("data-sitekey")||i.hasAttribute?.("data-turnstile-widget");if(!d&&!p){let y=i.tagName==="IFRAME"&&o.width>=180&&o.width<=460&&o.height>=40&&o.height<=160,g=jo.test(`${document.title||""} ${document.body?.innerText||""}`.slice(0,4e3));if(!y||!g)return}e.add(i),t.push({el:i,rect:o})};for(let i of Yu()){for(let o of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let r of i.querySelectorAll(o))n(r);for(let o of i.querySelectorAll("iframe"))n(o)}return t}function Vu(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function Qu(){let t=[],e=document.querySelectorAll("label, span, div, p, button");for(let n of e){if(t.length>=2)break;let i=(n.innerText||n.textContent||"").replace(/\s+/g," ").trim();if(!/verify you are human/i.test(i)||i.length>48)continue;let o=n.getBoundingClientRect();o.width<16||o.height<10||o.bottom<0||o.top>window.innerHeight||t.push({x:Math.round(o.left+Math.min(22,Math.max(12,o.width*.12))),y:Math.round(o.top+o.height/2)})}return t}function Ls(t){let e=[],n=new Set,i=(o,r)=>{if(!Number.isFinite(o)||!Number.isFinite(r)||o<1||r<1||o>window.innerWidth-1||r>window.innerHeight-1)return;let s=`${Math.round(o)},${Math.round(r)}`;n.has(s)||(n.add(s),e.push({x:Math.round(o),y:Math.round(r)}))};for(let{rect:o}of t){let r=o.top+o.height/2,s=o.left+Math.min(28,Math.max(18,o.width*.11));for(let u of[0,-4,4,-8,8,12,16,20,24,28,32])for(let m of[0,-3,3,-6,6])i(s+u,r+m);i(o.left+o.width*.5,r)}return e}function Xu(t){for(let{el:e,rect:n}of t)try{e.click();let i=n.left+Math.min(26,n.width*.12),o=n.top+n.height/2,r=document.elementFromPoint(i,o)||e;for(let s of["pointerdown","mousedown","mouseup","pointerup","click"])r.dispatchEvent(new MouseEvent(s,{bubbles:!0,cancelable:!0,clientX:i,clientY:o,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let i=n.getBoundingClientRect();if(i.width<4&&i.height<4)continue;let o=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!o.includes("human")&&!o.includes("verify")&&e==="input[type='checkbox']"){let r=n.closest("label, div, form");if(!jo.test(r?.textContent||""))continue}return n.click(),!0}return!1}async function Go(t){t.length&&(Ms(t.slice(0,3)),c.send({action:"viewportClickPoints",points:t}))}async function Yo(){if(!await $("autoCloudflareTick"))return!1;if(st())return Lt&&F("cf","challenge already solved"),Lt=0,await K("success"),!0;Lt||(Lt=Date.now(),F("cf","challenge seen \u2014 train window started"));let t=await ju();if(Date.now()-Lt<t)return await K("scanning","Verify you are human \u2014 clicking in a moment\u2026"),!1;await K("scanning","Verify you are human page \u2014 preparing click\u2026");let e=yi();Vu(e),await hi(250),e=yi();let n=Ls(e);return F("cf","train window done \u2014 attempting auto click",{widgets:e.length,points:n.length}),n.length||F("cf","no checkbox points \u2014 widget not found on this page"),n.length&&(await Go(n),await hi(1200),st()||!G())?(Lt=0,await K("success"),!0):(await K("dom"),Xu(e),await hi(600),st()||!G()?(Lt=0,await K("success"),!0):n.length&&(await Go(n),await hi(1e3),st()||!G())?(Lt=0,await K("success"),!0):(pn++,pn>=8?await K("manual","Click the checkbox once \u2014 we will continue after."):await K("retry",`Retry ${pn}/8\u2026`),!1))}function Ju(){mn||(mn=new MutationObserver(()=>{c.alive&&G()&&!st()&&Yo()}),mn.observe(document.documentElement,{childList:!0,subtree:!0}),c.disposable(()=>{mn?.disconnect(),mn=null}))}function Vo(){gi&&(c.clear(gi),gi=null),pn=0,Lt=0,Fo()}async function Qo(){Vo(),Ju();let t=async()=>{if(!c.alive)return;let e=yi(),n=[...Qu(),...Ls(e)].slice(0,3);if(!n.length){Uo()&&(pn=0,await K("success"));return}F("cf","verify widget found \u2014 clicking",{widgets:e.length,points:n}),await K("scanning","Clicking Verify you are human\u2026"),await Go(n)};t(),gi=c.setInterval(t,1800)}var Ee="sessionRecovery",Xo="homeKeepaliveAt",Jo="homeLoadingStuckAt",er="vsResubmitContinue",qs=2e3,wi=!1,Rs=null,Zo=null,tr=null,bi=null,hn=0;function or(){try{let t=new URL(location.href);return t.searchParams.set("_vsr",String(Date.now()%1e12)),location.replace(t.pathname+t.search+t.hash),!0}catch{try{return location.href=location.pathname+location.search,!0}catch{return!1}}}function Bs(){try{if(sessionStorage.getItem(er)!=="1")return!1;sessionStorage.removeItem(er)}catch{return!1}return St()||document.querySelector("#post_select")?!1:(or(),!0)}function Ns(){return x.homeKeepaliveMinMs}function Zu(){return x.homeKeepaliveMaxMs}function td(){return x.homeKeepaliveDebounceMs}function Os(){return x.loadingStuckMs}function ed(){return x.loadingStuckDebounceMs}function Hs(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function nd(t,e){let n=Hs(t);if(!n)return"";let i="",o=0;for(let r of e||[]){let s=Hs(r.q);if(!s||!r.a)continue;if(n.includes(s)||s.includes(n))return r.a;let u=s.split(" ").filter(p=>p.length>3),m=0;for(let p of u)n.includes(p)&&m++;let d=u.length?m/u.length:0;d>o&&d>=.5&&(o=d,i=r.a)}return i}async function id(){let t=await T([Wt,"profile"]),e=t[Wt]||{},n=t.profile?.id?String(t.profile.id):null,i=n?e[n]:null;return i||(i=Object.values(e).find(o=>o?.loginId&&o?.loginPass)||null),i||{}}function Ws(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,i=Object.getOwnPropertyDescriptor(n,"value")?.set;i?i.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function jt(t){return new Promise(e=>setTimeout(e,t))}function wt(t,e){return t+Math.random()*(e-t)}async function nr(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await jt(wt(250,600)),Ws(t,"");let i="";for(let o=0;o<n.length;o++){let r=n[o];i+=r,Ws(t,i),t.dispatchEvent(new KeyboardEvent("keydown",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:r,bubbles:!0}));let s=wt(90,220);/[\s@._]/.test(r)&&(s+=wt(120,320)),Math.random()<.08&&(s+=wt(200,450)),await jt(s)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await jt(wt(200,500))}var Si=!1,xi=!1;function vi(t){return!t||t.disabled?!1:(t.click(),!0)}function od(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let i of t){let o=(i.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(o))continue;let r=i.querySelector("input[type='checkbox']")||document.getElementById(i.getAttribute("for")||"");r&&!r.checked&&(vi(r),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(i=>/^(continue|ok|accept|agree)$/i.test((i.textContent||i.value||"").trim()));return e&&n&&vi(n),e>0}function Fs(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function rd(t){if(Si)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;Si=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await nr(e,t.loginId),await jt(wt(400,900))),n&&t.loginPass&&!n.value&&(await nr(n,t.loginPass),await jt(wt(500,1100)));let i=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(o=>/sign in|log in|continue/i.test(o.textContent||o.value||""));return i&&(n?.value||t.loginPass)?(await jt(wt(600,1400)),vi(i),!0):!!(e||n)}finally{Si=!1}}async function ad(t){if(xi)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let o of n){let r=(o.textContent||"").trim();if(r.length<12||r.length>220||!/\?/.test(r)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(r))continue;let s=o.querySelector("input[type='text']")||document.getElementById(o.getAttribute("for")||"")||o.parentElement?.querySelector("input[type='text']");s&&s.offsetParent!==null&&e.push({text:r,input:s})}for(let o of["kba1_response","kba2_response","kba3_response"]){let r=document.getElementById(o);if(!r)continue;let u=(r.closest(".form-group, .entry, li, div")||r.parentElement)?.textContent||"";e.some(m=>m.input===r)||e.push({text:u,input:r})}let i=[];for(let{text:o,input:r}of e){if(r.value)continue;let s=nd(o,t.security);s&&i.push({input:r,ans:s})}if(!i.length)return!1;xi=!0;try{for(let{input:r,ans:s}of i)await nr(r,s),await jt(wt(350,800));await jt(wt(600,1400));let o=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(r=>/continue|submit|verify/i.test(r.textContent||r.value||""));return o&&vi(o),!0}finally{xi=!1}}function Us(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||G()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function St(){return rn()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function sd(t=""){return/\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(t||""))}function ir(){if(St()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||G()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}function ld(t){return!!(t?.loginId&&t?.loginPass)}function cd(){return Us()?!1:!!(Fs()||document.querySelector("#kba1_response, #kba2_response, #kba3_response")||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))}async function ud(){let t=(await T(Ee))[Ee],e=!!t?.active,n=await id();if(G()){await Yo();return}if(od(),Us()){e&&(await M({[Ee]:{...t,active:!1,doneAt:Date.now()}}),c.send({action:"recoveryReturnToOfc"}));return}cd()&&ld(n)&&await $("autofillLogin")&&(await ad(n)||(Fs()||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))&&await rd(n))}function zs(){if(!ir()||Rs)return;let t=async()=>{c.alive&&await ud()};t(),Rs=c.setInterval(t,1200)}function Ks(){return Ns()+Math.random()*(Zu()-Ns())}async function Gs(){try{let t=await T(Xo),e=Number(t[Xo])||0;return Date.now()-e<td()?!1:(await M({[Xo]:Date.now()}),!0)}catch{return!0}}function js(){if(St()||!ir()||document.querySelector("#post_select")||Zo)return;let t=()=>{c.alive&&(Zo=c.setTimeout(async()=>{if(Zo=null,!c.alive||St()||sd(location.href)||document.querySelector("#post_select")||!ir())return;if(Si||xi||wi){t();return}if((await T(Ee))[Ee]?.active){t();return}if(!await Gs()){t();return}try{or()}catch{t()}},Ks()))};t()}function Ys(){if(!St()||tr)return;let t=()=>{c.alive&&(tr=c.setTimeout(async()=>{if(tr=null,!(!c.alive||!St())){if(await Gs())try{c.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}t()}},Ks()))};t()}async function dd(){try{let t=await T(Jo),e=Number(t[Jo])||0;return Date.now()-e<ed()?!1:(await M({[Jo]:Date.now()}),!0)}catch{return!0}}function Vs(){if(!St()||bi)return;let t=async()=>{if(bi=null,!(!c.alive||!St())){try{if(xo()){if(hn||(hn=Date.now()),Date.now()-hn>=Os()){if(await dd()){try{L(`Date Loading stuck \u2265${Os()/1e3}s \u2014 reloading Application Home\u2026`)}catch{}try{c.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}}hn=Date.now()}}else hn=0}catch{}c.alive&&St()&&(bi=c.setTimeout(t,qs))}};bi=c.setTimeout(t,qs)}async function Qs(t){let e=String(t||"");if(/form resubmission|information that you entered|action that you took to be repeated|returning to that page might cause/i.test(e)){if(!St()&&!document.querySelector("#post_select")){try{sessionStorage.setItem(er,"1")}catch{}c.setTimeout(()=>or(),300)}return}if(!/PSE0501|unable to load appointment available days/i.test(e)||wi)return;wi=!0,c.setTimeout(()=>{wi=!1},8e3);let n=await P();await M({[Ee]:{active:!0,ofcUrl:location.href,accountId:n,startedAt:Date.now()}}),c.send({action:"recoveryStart",ofcUrl:location.href})}var $i="humanClickProfile",ar=150,cr=120,fd=250,Xs=!1,vt=[],Ci=0,lt=0,Yt=0,O=null,sr=0,yn=!1,Ie=null,Ti=0,_i=0,bn=[],xt=!1,le=!1;function md(){let t=[];for(let e of document.querySelectorAll('iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]')){let n=e.getBoundingClientRect();n.width<40||n.height<20||n.width>900||n.height>400||t.push(n)}if(!t.length&&G())for(let e of document.querySelectorAll("iframe")){let n=e.getBoundingClientRect();n.width>=120&&n.width<=420&&n.height>=45&&n.height<=120&&t.push(n)}return t}function wn(){let t=md();if(!t.length)return null;let e=t[0];return{x:e.left+Math.min(28,Math.max(18,e.width*.11)),y:e.top+e.height/2,w:e.width,h:e.height,left:e.left,top:e.top}}function Pe(t,e,n){return n?t>=n.left-40&&t<=n.left+n.w+40&&e>=n.top-30&&e<=n.top+n.h+30:!1}function el(t){let e=performance.now();Ci||(Ci=e);let n=O,i=n?(t.clientX-n.x)/Math.max(24,n.w*.12):0,o=n?(t.clientY-n.y)/Math.max(20,n.h*.5):0;vt.push({nx:Math.round(i*1e3)/1e3,ny:Math.round(o*1e3)/1e3,x:Math.round(t.clientX),y:Math.round(t.clientY),t:Math.round(e-Ci)}),vt.length>cr&&vt.shift()}async function Mi(){return(await T($i))[$i]||{version:2,maxSamples:ar,samples:[],avgHoverMs:420,avgPressMs:70,avgApproachMs:800,liveTrained:!1}}function rr(t,e,n){if(!t.length)return n;let i=t.reduce((o,r)=>o+(Number(r[e])||0),0);return Math.round(i/t.length)}async function nl(t,{force:e=!1}={}){let n=Date.now();if(!e&&n-sr<fd)return null;sr=n;let i=await Mi(),o=Array.isArray(i.samples)?i.samples.slice():[];for(t.clientId||(t.clientId=`hc-${t.at||n}-${Math.random().toString(36).slice(2,10)}`),t.uploaded=!1,o.push(t);o.length>ar;)o.shift();let r={version:2,maxSamples:ar,samples:o,avgHoverMs:rr(o,"hoverMs",420),avgPressMs:rr(o,"pressMs",70),avgApproachMs:rr(o,"approachMs",800),updatedAt:n,liveTrained:!0,source:"visa-page-live"};return await M({[$i]:r}),Ti=o.length,F("human",`saved sample locally #${o.length}`,{capture:t.capture||"page",pressMs:t.pressMs,hoverMs:t.hoverMs,pathPts:Array.isArray(t.path)?t.path.length:0,clientId:t.clientId}),il(t,r).catch(()=>{}),ol().catch(()=>{}),r}async function pd(t){if(!t)return;let e=await Mi(),n=Array.isArray(e.samples)?e.samples.slice():[],i=!1;for(let o of n)o?.clientId===t&&!o.uploaded&&(o.uploaded=!0,i=!0);i&&await M({[$i]:{...e,samples:n,updatedAt:Date.now()}})}async function il(t,e){try{if(!await $("serverSync"))return F("upload","skipped \u2014 serverSync is OFF"),!1;let n=await W()||{},i=t.clientId||`hc-${t.at||Date.now()}-${Math.random().toString(36).slice(2,8)}`;t.clientId=i;let o={client_id:i,profile:{id:n.id||"",email:n.email||"",name:n.name||"",visa:n.visa||""},sample:t,profile_meta:{sampleCount:e?.samples?.length||0,avgHoverMs:e?.avgHoverMs,avgPressMs:e?.avgPressMs,avgApproachMs:e?.avgApproachMs,liveTrained:!0,source:"visa-page-live",extensionHost:location.host}};F("upload",`sending sample ${i}`,{sampleCount:e?.samples?.length||0,email:n.email||""}),c.send({action:"uploadHumanClickSample",payload:o});try{chrome.runtime.sendMessage({action:"uploadHumanClickSample",payload:o},r=>{if(chrome.runtime.lastError){F("upload",`SW error: ${chrome.runtime.lastError.message}`);return}r?.success?(F("upload",`server OK id=${r.id??"?"} status=${r.status??""}`,{clientId:i}),pd(i)):F("upload",`server FAIL ${r?.error||r?.status||"unknown"}`,{clientId:i})})}catch(r){F("upload",`sendMessage threw: ${r?.message||r}`)}return!0}catch(n){return F("upload",`upload threw: ${n?.message||n}`),!1}}async function ol(){try{if(!await $("serverSync"))return;let t=await Mi(),n=(Array.isArray(t.samples)?t.samples:[]).filter(i=>i&&i.uploaded!==!0).slice(-40);for(let i of n)await il(i,t),await new Promise(o=>setTimeout(o,80))}catch{}}function rl(t,e={}){let n=performance.now(),i=Math.max(25,Math.min(500,lt?n-lt:70)),o=Math.max(30,Math.min(3e3,lt?lt-(Yt||lt):200)),r=(vt.length?vt:bn).slice(-cr),s=r.length?r[r.length-1].t:o,u=Math.max(o,Math.min(12e3,s||o)),m=Ie,d=O||wn();return{hoverMs:Math.round(o),pressMs:Math.round(i),approachMs:Math.round(u),path:r,down:m?{x:Math.round(m.x),y:Math.round(m.y)}:null,up:t?{x:Math.round(t.clientX),y:Math.round(t.clientY)}:m?{x:Math.round(m.x),y:Math.round(m.y)}:d?{x:Math.round(d.x),y:Math.round(d.y)}:null,target:d?{x:Math.round(d.x),y:Math.round(d.y),w:Math.round(d.w),h:Math.round(d.h),left:Math.round(d.left),top:Math.round(d.top)}:null,viewport:{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio||1,scrollX:Math.round(window.scrollX||0),scrollY:Math.round(window.scrollY||0)},pointerType:t?.pointerType||"mouse",url:location.pathname+location.search,at:Date.now(),...e}}function gn(){vt.length&&(bn=vt.slice(-cr)),vt=[],Ci=0,lt=0,Yt=0,Ie=null}function ur(){yn||(yn=!0,le=!0,gn(),O=wn())}function lr(){yn=!1,O=null,xt=!1,gn()}function ki(t){let e=t?.target;if(!e)return!1;if(e.closest?.(".cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]"))return!0;if(e.tagName==="IFRAME"){let n=(e.src||"").toLowerCase();if(n.includes("challenges.cloudflare")||n.includes("turnstile"))return!0;let i=e.getBoundingClientRect();if(i.width>=120&&i.width<=420&&i.height>=45&&i.height<=120)return!0}return!1}async function Js(t){if(c.alive){if(!G()||st()){yn&&lr();return}ur(),O||(O=wn()),!Yt&&O&&Pe(t.clientX,t.clientY,O)&&(Yt=performance.now()),O&&Pe(t.clientX,t.clientY,O)&&(_i=Date.now()),el(t)}}async function Zs(t){if(!(!c.alive||t.button!==0)&&!(!G()||st())){ur(),O=wn(),lt=performance.now(),Yt||(Yt=lt),Ie={x:t.clientX,y:t.clientY},el(t),(ki(t)||O&&Pe(t.clientX,t.clientY,O))&&(xt=!0,_i=Date.now()),F("human","pointer down during challenge",{onWidget:ki(t),near:!!(!O||Pe(t.clientX,t.clientY,O)),x:Math.round(t.clientX),y:Math.round(t.clientY)});try{K("scanning",`Recording click\u2026 (saved ${Ti} so far)`)}catch{}}}async function tl(t){if(!c.alive||t.button!==0||!lt&&!xt)return;if(!G()&&!st()){gn();return}if(!(O&&Pe(t.clientX,t.clientY,O)||O&&Ie&&Pe(Ie.x,Ie.y,O)||ki(t)||xt||!O&&(vt.length>=2||bn.length>=2))&&vt.length<2&&bn.length<2){gn();return}let n=rl(t,{capture:xt||ki(t)?"iframe-or-widget":"page"});xt=!1,gn();let i=await nl(n);if(!i)return;let o=i.samples?.length||0;try{K("success",`Saved verify-human click #${o} \u2014 uploaded to server`)}catch{}}async function hd(){let t=Date.now();if(!le||!st()&&G())return;if(!(xt||t-_i<8e3||bn.length>=2&&t-sr>500)){le=!1,lr();return}let n=rl(null,{capture:"challenge-solved"});xt=!1,le=!1,lr();let i=await nl(n,{force:!0});if(!i)return;let o=i.samples?.length||0;try{K("success",`Saved verify-human click #${o} (after checkbox) \u2014 uploaded to server`)}catch{}}async function gd(){try{let t=await Mi(),e=t.liveTrained&&t.samples?.length||0;return Ti=e,e}catch{return Ti}}function al(){if(Xs)return;Xs=!0,F("human","train watcher started",{path:location.pathname}),c.on(window,"pointermove",Js,{passive:!0,capture:!0}),c.on(window,"pointerdown",Zs,{passive:!0,capture:!0}),c.on(window,"pointerup",tl,{passive:!0,capture:!0}),c.on(window,"mousemove",Js,{passive:!0,capture:!0}),c.on(window,"mousedown",Zs,{passive:!0,capture:!0}),c.on(window,"mouseup",tl,{passive:!0,capture:!0}),c.on(window,"blur",()=>{!G()||st()||(xt=!0,_i=Date.now(),lt||(lt=performance.now(),Yt||(Yt=lt)),F("human","page blur during challenge (likely iframe click)"))});let t=async()=>{if(!c.alive)return;if(G()&&!st()){le||F("human","challenge detected \u2014 recording armed"),le=!0,ur(),O||(O=wn());let n=await gd();try{K("scanning",n?`Train mode \u2014 click Verify you are human naturally (saved ${n})`:"Train mode \u2014 move mouse naturally, then click Verify you are human (recording\u2026)")}catch{}return}(le||yn||xt)&&await hd()};t(),c.setInterval(t,1200),c.setTimeout(()=>{F("upload","flushing unsynced local samples\u2026"),ol().catch(()=>{})},2500)}var yd=`
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

#${a.waitTime} .${l.pill} {
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  white-space: nowrap;
}

#${a.waitTime} .${l.pillTtl} {
  flex: 1;
  min-width: 0;
  padding: 0.35em 0.5em;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}

#${a.waitTime} .${l.pillTmr} {
  display: flex;
  align-items: center;
  padding: 0.35em 0.55em;
  border-radius: 5px 0 0 5px;
  background: rgba(255, 255, 255, 0.25);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-variant-numeric: tabular-nums;
}

#${a.waitTime} .${l.pillWait} { background-color: rgba(255, 0, 0, 0.35); color: #5c0000; }
#${a.waitTime} .${l.pillDone} { background-color: #1a4480; color: white; }

#atlas-sidebar .${l.sideLink} { background-color: #1a4480; color: white; }
#${a.datesPara} { margin: 0.5em 0; line-height: 1.45; }

#${a.datesCont} .${l.datesLnk} { color: white; }
#${a.datesCont} .${l.slotsSum} {
  font-weight: 700;
  font-size: 1.05em;
  margin-bottom: 0.4em;
  color: #0b3d2e;
}
#${a.datesCont} .${l.slotsTbl},
#${a.slotsTbl} {
  width: auto;
  min-width: 220px;
  border-collapse: collapse;
  margin: 0.25em 0 0.5em;
  font-size: 0.95em;
}
#${a.datesCont} .${l.slotsTbl} th,
#${a.datesCont} .${l.slotsTbl} td,
#${a.slotsTbl} th,
#${a.slotsTbl} td {
  border: 1px solid #cbd5e0;
  padding: 0.3em 0.75em;
  text-align: left;
}
#${a.datesCont} .${l.slotsTbl} th,
#${a.slotsTbl} th {
  background: #edf2f7;
  font-weight: 600;
}
#${a.ofcDate} { font-weight: bold; }

.${l.card} {
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

#${a.histCont} .${l.cardTtl} {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
}
#${a.histCont} .${l.histScrl} {
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

#${a.histTbl} td.${l.dltDn} { color: #10b981; font-weight: 500; }
#${a.histTbl} td.${l.dltUp} { color: #ef4444; font-weight: 500; }

#${a.cdCard} .${l.cardTtl} {
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

#${a.cdTime}.${l.cdDiv}-over { font-size: 20px; }
.${l.cdDiv} {
  border-top: 1px solid #edf2f7;
  margin-top: 15px;
  padding-top: 12px;
}

.${l.footer} { font-size: 11px; }
#${a.histCont} .${l.footer} { margin-top: 8px; }
#${a.cdCard} .${l.footer} { margin: 0; }

#${a.histCont} .${l.footer} a,
#${a.cdCard} .${l.footer} a {
  color: #1a4480;
  text-decoration: none;
  font-weight: 500;
}

.${l.hidden} { display: none; }

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
#${a.aiBtn}.${l.aiOn} {
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
#${a.aiPanel}.${l.hidden} {
  display: none !important;
}
#${a.aiPanel} .${l.cardTtl} {
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
#${a.aiPanel} .${l.aiHint} {
  margin: 0 0 8px;
  font-size: 14.5px;
  line-height: 1.5;
  color: #6b7280;
  font-weight: 400;
}
#${a.aiPanel} .${l.aiHead} {
  font-weight: 700;
  color: #111827;
  font-size: 16px;
}
#${a.aiPanel} .${l.aiRow} {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}
#${a.aiPanel} .${l.aiSec} {
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
#${a.aiTermsGate}.${l.hidden},
#${a.aiMain}.${l.hidden} {
  display: none;
}
#${a.aiPanel} .${l.aiInfo} {
  margin: 0 0 10px;
  padding: 10px 12px;
  background: #eff6ff;
  border: 1px solid #93c5fd;
  border-radius: 8px;
  color: #1e40af;
  font-size: 14.5px;
  line-height: 1.5;
}
#${a.aiPanel} .${l.aiWarn} {
  margin: 0 0 10px;
  padding: 10px 12px;
  background: #fffbeb;
  border: 1px solid #f59e0b;
  border-radius: 8px;
  color: #92400e;
  font-size: 14.5px;
  line-height: 1.5;
}
#${a.aiPanel} .${l.aiOk},
#${a.aiStatus}.${l.aiOk} {
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
#${a.aiPanel} .${l.aiDateBtn} {
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
#${a.aiPanel} .${l.aiDateBtn}:hover {
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
#${a.aiCal}.${l.hidden} { display: none !important; }
#${a.aiCal} .${l.aiCalHead} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
}
#${a.aiCal} .${l.aiCalHead} .${l.aiHead} {
  font-size: 17px;
  margin: 0;
  flex: 1;
  text-align: center;
}
#${a.aiCal} .${l.aiCalHead} button {
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
#${a.aiCal} .${l.aiCalGrid} {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}
#${a.aiCal} .${l.aiCalGrid} .${l.aiHint} {
  margin: 0;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: #6b7280;
  padding: 4px 0;
  pointer-events: none;
}
#${a.aiCal} .${l.aiCalDay} {
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
#${a.aiCal} .${l.aiCalDay}:hover {
  background: #eff6ff;
  border-color: #93c5fd;
}
#${a.aiCal} .${l.aiCalDay}.${l.aiCalMuted} {
  color: #9ca3af;
  font-weight: 500;
  background: #f9fafb;
}
#${a.aiCal} .${l.aiCalDay}:disabled,
#${a.aiCal} .${l.aiCalDay}[aria-disabled="true"] {
  opacity: 0.4;
  cursor: not-allowed;
  background: #f3f4f6;
  color: #9ca3af;
  pointer-events: none;
}
#${a.aiCal} .${l.aiCalDay}.${l.aiCalToday} {
  border-color: #3b82f6;
}
#${a.aiCal} .${l.aiCalDay}.${l.aiCalOn} {
  background: #3b82f6;
  border-color: #2563eb;
  color: #fff;
}
#${a.aiCal} .${l.aiRow} {
  margin: 12px 0 0;
  justify-content: space-between;
}
#${a.aiCal} .${l.aiRow} button {
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

#${a.aiPanel} .${l.aiQl} {
  margin-top: 4px;
  padding: 14px 14px 12px;
  border: 1px solid #111827;
  border-radius: 10px;
  background: #fff;
}
#${a.aiPanel} .${l.aiQlTitle} {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
}
#${a.aiPanel} .${l.aiQlSub} {
  margin: 4px 0 12px;
  font-size: 12px;
  color: #64748b;
  line-height: 1.35;
}
#${a.aiPanel} .${l.aiQlCard} {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 0;
  border-top: 1px solid #e2e8f0;
}
#${a.aiPanel} .${l.aiQlCard}:first-child {
  border-top: none;
  padding-top: 2px;
}
#${a.aiPanel} .${l.aiQlMeta} {
  min-width: 0;
  flex: 1;
}
#${a.aiPanel} .${l.aiQlMeta} strong {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  word-break: break-word;
}
#${a.aiPanel} .${l.aiQlMeta} span {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  color: #64748b;
}
#${a.aiPanel} .${l.aiQlBadge} {
  flex-shrink: 0;
  margin-top: 2px;
  padding: 4px 8px;
  border-radius: 6px;
  background: #16a34a;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}
#${a.aiPanel} .${l.aiQlEdit} {
  display: inline-block;
  margin-top: 6px;
  padding: 0;
  border: none;
  background: none;
  color: #2563eb;
  font-size: 12px;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
}
#${a.aiPanel} .${l.aiQlEdit}:hover { color: #1d4ed8; }
#${a.aiPanel} .${l.aiQlAdd} {
  width: 100%;
  margin-top: 10px;
  padding: 10px 12px;
  border: 1px solid #111827;
  border-radius: 8px;
  background: #fff;
  color: #0f172a;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
#${a.aiPanel} .${l.aiQlAdd}:hover { background: #f8fafc; }
#${a.aiPanel} .${l.aiQlEmpty} {
  margin: 0 0 4px;
  font-size: 12px;
  color: #64748b;
}

#${a.aiPanel} .${l.aiSwitch} {
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
#${a.aiPanel} .${l.aiSwitch}.${l.aiOnBtn} {
  background: #3b82f6;
  box-shadow: none;
}
#${a.aiPanel} .${l.aiKnob} {
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
#${a.aiPanel} .${l.aiSwitch}.${l.aiOnBtn} .${l.aiKnob} {
  transform: translateX(20px);
}

#${a.aiStatus} { margin: 0; }
#${a.aiPanel} .${l.aiCities} {
  max-height: 150px;
  overflow: auto;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 10px;
  margin-bottom: 0;
  background: #f9fafb;
}
#${a.aiPanel} .${l.aiCityAct} {
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
#${a.aiPanel} .${l.aiCityAct}:hover { color: #2563eb; }
#${a.aiPanel} .${l.aiCities} label {
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  margin: 5px 0;
  color: #1f2937;
  font-size: 14.5px;
}
#${a.aiPanel} .${l.aiCities} input[type="checkbox"] {
  margin: 0;
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
}
#${a.aiPanel} .${l.aiRow} label { flex: 1; min-width: 140px; }

#${a.aiWinList} {
  display: grid;
  gap: 10px;
  margin: 0 0 6px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
}
#${a.aiPanel} .${l.aiWinRow} {
  display: grid;
  gap: 4px;
  padding: 12px;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}
#${a.aiPanel} .${l.aiWinRow}:last-child {
  padding-bottom: 12px;
}
#${a.aiPanel} .${l.aiInline} {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
#${a.aiPanel} .${l.aiInline} select {
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
#${a.aiPanel} .${l.aiInline} .${l.aiHead} {
  margin: 0;
  flex-direction: row;
  font-size: 14.5px;
}
#${a.aiPanel} .${l.aiWinHelp} {
  font-size: 14.5px;
  color: #6b7280;
  margin-left: 2px;
}
#${a.aiPanel} .${l.aiTrash} {
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
#${a.aiPanel} .${l.aiTrash}:hover { background: #fef2f2; }
#${a.aiWinNote} { margin: 0 0 8px; font-size: 14.5px; color: #6b7280; }

#${a.aiPanel} .${l.aiTerms} {
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
#${a.aiPanel} .${l.aiTerms} .${l.aiHead} {
  margin: 0 0 6px;
  font-size: 20px;
  text-align: center;
}
#${a.aiPanel} .${l.aiTerms} .${l.aiHint} {
  text-align: center;
  margin: 0 0 14px;
}
#${a.aiPanel} .${l.aiTermsList} {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  display: grid;
  gap: 10px;
}
#${a.aiPanel} .${l.aiTermsList} li {
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
#${a.aiPanel} .${l.aiTermsList} li::before {
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
#${a.aiPanel} .${l.aiTermsCb} {
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
#${a.aiPanel} .${l.aiTermsCb} input[type="checkbox"] {
  margin: 2px 0 0;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  accent-color: #3b82f6;
}
#${a.aiPanel} .${l.aiContinue} {
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
#${a.aiPanel} .${l.aiContinue}:disabled {
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
#${a.cfHud} .${l.cfHud} {
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
#${a.cfHud} .${l.cfHud}[data-state="success"] {
  border-color: rgba(34, 197, 94, 0.45);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 24px rgba(34, 197, 94, 0.15);
}
#${a.cfHud} .${l.cfHud}[data-state="manual"] {
  border-color: rgba(251, 191, 36, 0.45);
}
#${a.cfHud} .${l.cfHud}[data-state="debugger"] {
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.32), 0 0 28px rgba(59, 130, 246, 0.18);
}
#${a.cfHud} .${l.cfPulse} {
  width: 10px;
  height: 10px;
  margin-top: 5px;
  border-radius: 50%;
  background: #60a5fa;
  box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.55);
  animation: ${f}cfpulse 1.6s ease-out infinite;
  flex-shrink: 0;
}
#${a.cfHud} .${l.cfHud}[data-state="success"] .${l.cfPulse} {
  background: #4ade80;
  animation: none;
  box-shadow: 0 0 12px rgba(74, 222, 128, 0.65);
}
#${a.cfHud} .${l.cfHud}[data-state="manual"] .${l.cfPulse} {
  background: #fbbf24;
}
@keyframes ${f}cfpulse {
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
.${l.cfFlash} {
  position: fixed;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid rgba(96, 165, 250, 0.85);
  box-shadow: 0 0 18px rgba(59, 130, 246, 0.55);
  z-index: 2147483647;
  pointer-events: none;
  animation: ${f}cfring 1.1s ease-out forwards;
}
@keyframes ${f}cfring {
  0% { transform: scale(0.6); opacity: 1; }
  100% { transform: scale(2.2); opacity: 0; }
}

/* Sample A \u2014 Tik Tik status HUD (bottom-right) */
#${a.hud}.${l.hud} {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 2147483646;
  width: 360px;
  max-width: calc(100vw - 20px);
  max-height: calc(100vh - 32px);
  overflow: auto;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 14px 36px rgba(11, 58, 110, 0.28);
  font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  color: #0f172a;
  pointer-events: auto;
}
#${a.hud} .${l.hudHead} {
  background: #0b3a6e;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 12px 18px;
}
#${a.hud} .${l.hudName} {
  font-size: 18px;
  font-weight: 800;
  padding: 16px 18px 0;
  line-height: 1.3;
}
#${a.hud} .${l.hudVisa} {
  font-size: 14px;
  color: #64748b;
  padding: 4px 18px 12px;
}
#${a.hud} .${l.hudBody} {
  padding: 0 18px 12px;
  min-height: 0;
}
#${a.hud} .${l.hudCount} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  background: #eef4fb;
  border: 1px solid #c7d7ee;
  border-radius: 10px;
}
#${a.hud} .${l.hudCountLabel} {
  font-size: 14px;
  color: #334155;
  font-weight: 600;
}
#${a.hud} .${l.hudSecs} {
  font-size: 36px;
  font-weight: 800;
  color: #0b3a6e;
  letter-spacing: -0.03em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
#${a.hud} .${l.hudStuck} {
  padding: 14px 16px;
  background: #f8fafc;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  color: #334155;
}
#${a.hud} .${l.hudSubmit} {
  padding: 14px 16px;
  background: #fff7ed;
  border: 1px solid #fdba74;
  border-radius: 10px;
}
#${a.hud} .${l.hudSubmitTitle} {
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #c2410c;
}
#${a.hud} .${l.hudSubmitSub} {
  margin-top: 4px;
  font-size: 13px;
  color: #9a3412;
}
#${a.hud} .${l.hudCities} {
  display: none !important;
}
#${a.hud} .${l.hudCitiesTitle},
#${a.hud} .${l.hudHistTitle} {
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 8px;
}
#${a.hud} .${l.hudCityLabel} {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  line-height: 1.35;
  color: #0f172a;
  padding: 4px 0;
  cursor: pointer;
  user-select: none;
}
#${a.hud} .${l.hudCityLabel} input {
  margin-top: 2px;
  flex-shrink: 0;
  width: 15px;
  height: 15px;
  cursor: pointer;
}
#${a.hud} .${l.hudHist} {
  border-top: 1px solid #e2e8f0;
  padding: 12px 18px 16px;
}
#${a.hud} .${l.hudHistRow} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 13px;
  padding: 5px 0;
  color: #0f172a;
}
#${a.hud} .${l.hudHistRow} > span:first-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
#${a.hud} .${l.hudPillOk},
#${a.hud} .${l.hudPillNo} {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 999px;
}
#${a.hud} .${l.hudPillOk} {
  background: #dcfce7;
  color: #166534;
}
#${a.hud} .${l.hudPillNo} {
  background: #f1f5f9;
  color: #64748b;
}
`;function sl(){if(document.querySelector(h(a.styles)))return;let t=document.createElement("style");t.id=a.styles,t.dataset[A.mark]="",t.textContent=yd,(document.head||document.documentElement).appendChild(t)}Tr();qo();fr(()=>{us(),c.destroy()});Lr();Ps();k()&&P().then(t=>{if(t)return Xn(t);xe()}).catch(()=>xe());if(!k()){c.disposable(()=>{let i=document.querySelector(h(a.anchor)),o=document.querySelector("#post_select");i&&o&&i.replaceWith(o);for(let r of document.querySelectorAll("[data-"+A.mark+"]"))r.remove()}),sl(),c.send({action:"registerBlockGuard",prefix:f}),c.send({action:"registerRedirect",prefix:f}),c.send({action:"registerAlertGuard",prefix:f}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&c.send({action:"registerOfcReader",prefix:f}),c.on(window,"message",i=>{if(c.alive&&i.source===window)switch(i.data?.action){case qt.req:return _s(i);case qt.res:return ks(i);case qt.ofc:return oa(i);case qt.err:return je("native_alert",i.data?.text),tn(String(i.data?.text||"alert").slice(0,120)),Qs(i.data?.text);case qt.sub:Jr(),Ge(),pa(),mt().then(o=>{sn(o?.accountId||null)}).catch(()=>{sn(null)});return}}),chrome.storage.onChanged.addListener((i,o)=>{o==="local"&&(i.profile&&zi(),i.waitPillClock&&Qr(i.waitPillClock.newValue),i.autoCloudflareTick&&(i.autoCloudflareTick.newValue?Qo():Vo()))}),c.on(document,"click",i=>{ge();let o=i.target.closest(h(a.waitTime));if(o){if(o.dataset.skipClick){delete o.dataset.skipClick;return}Vr()}}),c.on(document,"keydown",ge),c.on(window,"focus",()=>ge({keepConsular:!0})),c.on(document,"visibilitychange",()=>{document.hidden||ge({keepConsular:!0})}),Zr(),Bs(),zs(),js(),Ys(),Vs(),al(),Qo();async function t(){!c.alive||k()||!rn()||document.querySelector("#post_select")&&(bt(),await Promise.all([Wi(),Fi(),Ro()]),ba({slotIndex:on,shouldPick:async()=>await mt()?!0:!!await $("autoSelectFirstDate"),onSlotPicked:()=>ds()}))}async function e(){!c.alive||k()||!rn()||await cs()}async function n(){Mr(),Dr(),await Promise.all([zi(),Ir(),Er(),Wi(),Fi(),Ro()]),Ei()}document.readyState==="complete"?n():c.on(window,"load",n),c.setInterval(t,2500),c.setInterval(e,3e4),e()}})();
