(()=>{function K(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function T(t){return K()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,i]of Object.entries(t))e[n]=i;return e}):Promise.resolve(typeof t=="string"?{}:t)}function M(t){return K()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function Xo(t){return K()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function Jo(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",i=>{String(i.reason?.message||i.reason||"").includes("Extension context invalidated")&&(i.preventDefault(),e())});let n=setInterval(()=>{K()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var jt="https://the.gopg.online",wi=`${jt}/contribute`,Zo=`${jt}/contribute/telegram`,od=`${jt}/contribute/human-click`,gn=`${jt}/contribute/tik-tik-prefs`,tr=`${jt}/contribute/tik-tik-coord`;var er=20,nr=4320*60*1e3,yn=100,ir=4,bn=100,or=240,rr=50,ar=1440*60*1e3,Vs={recheckButton:!1,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function C(t){return T({[t]:Vs[t]}).then(e=>e[t])}function xt(){return T({posts:[]}).then(t=>t.posts)}function ae(t){return M({posts:t})}function z(){return T("profile").then(t=>t.profile)}var Yt=t=>String(t).padStart(2,"0");function De(t){let e=Yt(t%60),n=Math.floor(t/60)%60,i=Math.floor(t/3600);return i?`${Yt(i)}:${Yt(n)}:${e}`:`${Yt(n)}:${e}`}function sr(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${Yt(n.getUTCHours())}:${Yt(n.getUTCMinutes())}:${Yt(n.getUTCSeconds())}`}}function Si(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),i=t%60,o=[];return e>0&&o.push(`${e}d`),(n>0||e>0)&&o.push(`${n}h`),o.push(`${i}m`),o.join(" ")}function cr(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),i=o=>n.find(r=>r.type===o)?.value??"";return`${i("month")} ${i("day")} ${i("year")} ${i("hour")}:${i("minute")} ${i("dayPeriod")}`}function lr(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),i=parseInt(e[2],10),o=parseInt(e[3],10),r=e[4];r&&(r.toUpperCase()==="PM"&&n<12&&(n+=12),r.toUpperCase()==="AM"&&n===12&&(n=0));let a=new Date;return a.setHours(n,i,o,0),a.getTime()>Date.now()+6e4&&a.setDate(a.getDate()-1),a}var ur=Symbol(),Qs=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&K()}on(t,e,n,i){t.addEventListener(e,n,{...i,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!K())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=ir,interval:n=yn}={}){return new Promise(i=>{let o=r=>{if(!this.alive)return;let a=document.querySelector(t);if(a)return i(a);if(r>=e)return i(null);this.setTimeout(()=>o(r+1),n)};o(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},l=new Qs;function dr(){let t=globalThis[ur];Object.defineProperty(globalThis,ur,{value:l,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var wn=new Uint32Array(2);crypto.getRandomValues(wn);var fr="abcdefghjkmnpqrstuvwxyz",Xs=(wn[0].toString(36)+wn[1].toString(36)).replace(/[^a-z0-9]/g,""),m=(fr[wn[0]%fr.length]+Xs).slice(0,8).padEnd(8,"x");function h(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var s={selRow:m+"01",anchor:m+"02",waitTime:m+"03",recheck:m+"04",histCont:m+"05",histTbl:m+"06",cdCard:m+"07",cdTime:m+"08",ofcDate:m+"09",styles:m+"10",datesCont:m+"11",datesPara:m+"12",slotsTbl:m+"12b",aiBtn:m+"13",aiPanel:m+"14",aiFrom:m+"15",aiTo:m+"16",aiStatus:m+"17",aiConfirm:m+"18",aiCancel:m+"19",aiClose:m+"20",aiCities:m+"21",aiSubmitBtn:m+"22",aiCitiesBtn:m+"23",aiLogin:m+"24",aiPass:m+"25",aiQ1:m+"26",aiA1:m+"27",aiQ2:m+"28",aiA2:m+"29",aiQ3:m+"30",aiA3:m+"31",aiSaveLogin:m+"32",cfHud:m+"33",aiCitiesAll:m+"34",aiCitiesNone:m+"35",aiLoginToggle:m+"36",aiLoginBody:m+"37",aiProfiles:m+"63",aiProfilesList:m+"64",aiAddProfile:m+"65",aiLoginCancel:m+"66",aiLoginEditorTitle:m+"67",aiSubmitOn:m+"38",aiSubmitOff:m+"39",aiCitiesOn:m+"40",aiCitiesOff:m+"41",aiWinList:m+"42",aiWinAdd:m+"43",aiWinSave:m+"44",aiWinReset:m+"45",aiWinNote:m+"46",aiSubmitSw:m+"47",aiCitiesSw:m+"48",aiInfoBox:m+"49",aiWarnBox:m+"50",aiOkBox:m+"51",aiWinCard:m+"52",aiSubmitBody:m+"53",aiCitiesBody:m+"54",aiTerms:m+"55",aiTermsAgree:m+"56",aiTermsGate:m+"57",aiMain:m+"58",aiTermsContinue:m+"59",aiFromBtn:m+"60",aiToBtn:m+"61",aiCal:m+"62"},c={pill:m+"a",pillTtl:m+"b",pillTmr:m+"c",pillWait:m+"d",pillDone:m+"e",footer:m+"f",card:m+"g",cardTtl:m+"h",histScrl:m+"i",dltDn:m+"j",dltUp:m+"k",cdDiv:m+"l",hidden:m+"m",sideLink:m+"n",datesLnk:m+"o",slotsSum:m+"o2",slotsTbl:m+"o3",aiOn:m+"p",aiRow:m+"q",aiHint:m+"r",aiCities:m+"s",aiOnBtn:m+"t",aiCityAct:m+"x",cfHud:m+"u",cfPulse:m+"v",cfFlash:m+"w",aiEn:m+"y",aiDis:m+"z",aiWinRow:m+"aa",aiFeat:m+"ab",aiSwitch:m+"ac",aiKnob:m+"ad",aiSec:m+"ae",aiInfo:m+"af",aiWarn:m+"ag",aiOk:m+"ah",aiTrash:m+"ai",aiWinHelp:m+"aj",aiInline:m+"ak",aiHead:m+"al",aiTerms:m+"am",aiTermsCb:m+"an",aiTermsList:m+"ao",aiContinue:m+"ap",aiDateBtn:m+"aq",aiCal:m+"ar",aiCalHead:m+"as",aiCalGrid:m+"at",aiCalDay:m+"au",aiCalMuted:m+"av",aiCalOn:m+"aw",aiCalToday:m+"ax",aiQl:m+"ay",aiQlTitle:m+"az",aiQlSub:m+"ba",aiQlCard:m+"bb",aiQlMeta:m+"bc",aiQlBadge:m+"bd",aiQlEdit:m+"be",aiQlAdd:m+"bf",aiQlEmpty:m+"bg"},P={mark:m,w:m+"w",mw:m+"mw"},Pt={req:m+"q",res:m+"r",ofc:m+"o",err:m+"e",sub:m+"s"};function Sn(t){return t.map(e=>String.fromCharCode(e)).join("")}function Js(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function mr(){let t=document.createElement("div");return t.className=c.footer,t.textContent=Sn([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function Zs(t){let e=document.getElementById(s.histCont);e&&e.remove(),e=document.createElement("div"),e.id=s.histCont,e.className=c.card,e.dataset[P.mark]="";let n=document.createElement("h4");n.className=c.cardTtl,n.textContent=Sn([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let i=document.createElement("div");i.className=c.histScrl;let o=document.createElement("table");o.id=s.histTbl;let r=document.createElement("thead"),a=document.createElement("tr");for(let d of["Time","Est. Wait","Change"]){let p=document.createElement("th");p.textContent=d,a.appendChild(p)}r.appendChild(a),o.appendChild(r);let u=document.createElement("tbody");for(let d=t.length-1;d>=0;d--){let p=t[d],y="--",g="";if(d>0){let $=p.minutes-t[d-1].minutes;$<0?(y=`${$}m`,g=c.dltDn):$>0?(y=`+${$}m`,g=c.dltUp):y="0m"}let w=document.createElement("tr"),S=[[p.timeStr,""],[Si(p.minutes),""],[y,g]];for(let[$,D]of S){let v=document.createElement("td");D&&(v.className=D),v.textContent=$,w.appendChild(v)}u.appendChild(w)}o.appendChild(u),i.appendChild(o),e.appendChild(i),e.appendChild(mr());let f=document.getElementById("last-updated");f&&(f.closest("div, p, section")||f.parentElement).insertAdjacentElement("afterend",e)}function tc(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function pr(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),i=tc();if(i!==null&&i>or&&!e.textContent.includes("(")){let a=Si(i);e.textContent=`${e.textContent} (${i} minutes / ${a})`}let o=n.textContent.trim().split(" (")[0],r=lr(o);if(r&&l.setInterval(()=>{let a=Math.floor((Date.now()-r)/1e3);a>=0&&(n.textContent=`${o} (${a}s ago)`)},1e3),i!==null){let a=Js(),u=sessionStorage.getItem(a);u||(u=Math.random().toString(36).substring(2,11),sessionStorage.setItem(a,u)),T({queueHistory:{}}).then(f=>{let d=f.queueHistory||{},p=Date.now(),y={};for(let[$,D]of Object.entries(d)){if(!Array.isArray(D))continue;let v=D[D.length-1];v&&p-v.timestamp<ar&&(y[$]=D)}let g=y[u]||[],w=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),S=g[g.length-1];(!S||S.minutes!==i||S.timeStr!==w)&&(g.push({timestamp:p,timeStr:w,minutes:i}),g.length>rr&&g.shift(),y[u]=g,M({queueHistory:y})),Zs(g)})}}function hr(t,e){let n=document.getElementById("error_row");if(!n)return;let i;t?i=e?`Blocked for 24 hours, about ${De(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":i="Temporarily blocked. Log in in a new tab, then refresh this page.";let o=document.createElement("div");o.className="atlas_validationalert alert alert-danger warning",o.dataset[P.mark]="",o.textContent=i,n.replaceChildren(o),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function gr(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&T({cfRetryAfter:null}).then(n=>{let i=parseInt(n.cfRetryAfter,10);if(!isNaN(i)){Xo("cfRetryAfter");let o=document.getElementById("what-happened-section");if(o){let r=document.createElement("div");r.id=s.cdCard,r.className=c.card,r.dataset[P.mark]="";let a=document.createElement("h4");a.className=c.cardTtl,a.textContent=Sn([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),r.appendChild(a);let u=document.createElement("div");u.id=s.cdTime,r.appendChild(u);let f=document.createElement("div");f.className=c.cdDiv,r.appendChild(f),r.appendChild(mr()),o.appendChild(r);let d=i,p=null,y=()=>{d>0?(u.textContent=De(d),d--):(u.classList.add(c.cdDiv+"-over"),u.textContent="You can try refreshing now!",p!=null&&l.clear(p))};y(),p=l.setInterval(y,1e3)}}})}async function yr(){let t=document.querySelector(".username");if(!t)return;let n=(t.innerText||"").trim().match(/^(.*)\((\d+)\)\s*$/);if(!n)return;let[,i,o]=n,r=await z()||{},a=!r.id||r.id===o||String(r.id).includes(o)?r:{};a.name=i.trim(),a.id=o;let u=document.querySelectorAll("script");for(let f of u){let d=f.innerText.trim();if(d.includes("setAuthenticatedUserContext")){let p=/setAuthenticatedUserContext\('([^']*)'\)/,y=d.match(p);y&&(a.email=y[1])}}await M({profile:a})}async function br(){let t=document.querySelector("#post_select");if(!t)return;let e=await xt();for(let n of t.options){if(!n.value)continue;e.findIndex(o=>o.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await ae(e)}var ec=["visa-information","fee-payment","appointment-confirmation"];function nc(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(i=>{let o=i.querySelector(".text-bold");if(!o)return;let r=ic(o.textContent);if(!ec.includes(r))return;let a=oc(i);a&&(n[r]=a)}),Object.keys(n).length?n:null}function ic(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function oc(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function se(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>nr)return null}catch{}return t.value}function rc(t){let e=(t.posts||[]).filter(o=>o.Updated).sort((o,r)=>o.Updated-r.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},i=se(t.cgiIdToken);return i&&(n.token=i),n}async function xi(){if(!K()||!await C("serverSync"))return;let t=await T(["profile","posts","cgiIdToken"]),e=rc(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await fetch(wi,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(o=>o.json());if(!n.success)return;let i="0";n.contribs>0&&(i=n.contribs.toString()),n.contribs>10&&(i="10+"),n.contribs>0&&await M({contribs:{email:t.profile?.email,updated:Date.now(),count:i}})}catch{}}function vi(t=0){K()&&document.querySelector("#appointment-card")&&C("serverSync").then(e=>{if(!e)return;let n=nc();if(!n){t<er&&l.setTimeout(()=>vi(t+1),yn);return}T(["profile","cgiIdToken","savedDashboard"]).then(i=>{let o=se(i.cgiIdToken);o&&JSON.stringify(n)!==JSON.stringify(i.savedDashboard)&&fetch(wi,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:i.profile,dashboard:n,token:o})}).then(r=>r.json()).then(r=>{r.success&&M({savedDashboard:n})}).catch(()=>{})})})}var ac=`${jt}/extension-runtime-config.json`,$i="vsRuntimeConfig",sc=300*1e3,Ci=0,Ee=null,x={slotWindowLabel:":14\u2013:21, :24\u2013:31, :54\u2013:02",slotWindows:[{slot:1,fromMin:0,toMin:2},{slot:2,fromMin:14,toMin:21},{slot:3,fromMin:24,toMin:31},{slot:4,fromMin:54,toMin:59}],windowStartsMin:[0,14,24,54],cityLoadingMaxMs:12e4,cityCalendarNoDatesMs:2e4,cityRotateMinGapMs:15e3,cityRotateMaxGapMs:18e3,cityHoldMaxMs:45e3,homeKeepaliveMinMs:6e5,homeKeepaliveMaxMs:6e5,homeKeepaliveDebounceMs:48e4,loadingStuckMs:6e4,loadingStuckDebounceMs:9e4,remoteVersion:0,source:"bundled"};function V(t,e,n,i){let o=Number(t);return Number.isFinite(o)?Math.min(n,Math.max(e,Math.round(o))):i}function cc(t){if(!Array.isArray(t)||!t.length||t.length>24)return null;let e=[];for(let n of t){let i=V(n?.fromMin,0,59,NaN),o=V(n?.toMin,0,59,NaN);if(!Number.isFinite(i)||!Number.isFinite(o)||i>o)return null;let r=V(n?.slot,1,12,1);e.push({slot:r,fromMin:i,toMin:o})}return e}function lc(t){let e=[...new Set(t.map(n=>n.fromMin))].sort((n,i)=>n-i);return e.length?e:x.windowStartsMin.slice()}function wr(t,e="remote"){if(!t||typeof t!="object")return!1;let n=cc(t.slotWindows);if(n){x.slotWindows.length=0;for(let i of n)x.slotWindows.push(i);x.windowStartsMin=lc(n)}return typeof t.slotWindowLabel=="string"&&t.slotWindowLabel.length<120&&(x.slotWindowLabel=t.slotWindowLabel),x.cityLoadingMaxMs=V(t.cityLoadingMaxMs,1e4,3e5,x.cityLoadingMaxMs),x.cityCalendarNoDatesMs=V(t.cityCalendarNoDatesMs,5e3,12e4,x.cityCalendarNoDatesMs),x.cityRotateMinGapMs=V(t.cityRotateMinGapMs,5e3,6e4,x.cityRotateMinGapMs),x.cityRotateMaxGapMs=V(t.cityRotateMaxGapMs,x.cityRotateMinGapMs,9e4,Math.max(x.cityRotateMinGapMs,x.cityRotateMaxGapMs)),x.cityHoldMaxMs=V(t.cityHoldMaxMs,1e4,18e4,x.cityHoldMaxMs),x.homeKeepaliveMinMs=V(t.homeKeepaliveMinMs,12e4,18e5,x.homeKeepaliveMinMs),x.homeKeepaliveMaxMs=V(t.homeKeepaliveMaxMs,x.homeKeepaliveMinMs,18e5,Math.max(x.homeKeepaliveMinMs,x.homeKeepaliveMaxMs)),x.homeKeepaliveDebounceMs=V(t.homeKeepaliveDebounceMs,6e4,18e5,x.homeKeepaliveDebounceMs),x.loadingStuckMs=V(t.loadingStuckMs,3e4,6e5,x.loadingStuckMs),x.loadingStuckDebounceMs=V(t.loadingStuckDebounceMs,3e4,6e5,x.loadingStuckDebounceMs),x.remoteVersion=V(t.version,0,1e9,x.remoteVersion),x.source=e,!0}async function uc(){try{let e=(await T($i))[$i];e?.config&&wr(e.config,"cache")}catch{}}async function dc(t){try{await M({[$i]:{config:t,fetchedAt:Date.now()}})}catch{}}async function fc({force:t=!1}={}){let e=Date.now();if(!t&&e-Ci<sc)return x;if(Ee)return Ee;Ee=(async()=>{await uc();try{let n=await fetch(ac,{method:"GET",cache:"no-store",signal:AbortSignal.timeout(8e3)});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.json();if(!i||typeof i!="object"||Array.isArray(i))throw new Error("bad json");if(i.script||i.code||i.eval)throw new Error("unsafe keys");wr(i,"remote"),await dc(i),Ci=Date.now()}catch{Ci=Date.now()}return x})();try{return await Ee}finally{Ee=null}}function Sr(){fc().catch(()=>{})}var Lt=null,Ie=null;function xr(){return Lt||x.slotWindows}function ft(){return Ie||(Lt?.length?vr(Lt):x.slotWindowLabel)}var _d=x.slotWindows,vt=4,qt=6;function vr(t){return t?.length?t.map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", "):x.slotWindowLabel}function Ti(t){if(!Array.isArray(t))return[];let e=[];for(let n of t){if(e.length>=vt)break;let i=Number(n?.fromMin),o=Number(n?.durationMin??n?.duration);if(!Number.isFinite(i)||i<0||i>59)continue;let r=Math.min(qt,59-i);if(r<1)continue;if(!Number.isFinite(o)||o<1){let u=Number(n?.toMin);if(!Number.isFinite(u)||u<i||u>59||(o=Math.min(r,u-i),o<1))continue}o=Math.min(r,Math.max(1,Math.round(o)));let a=Math.min(59,i+o);e.push({slot:e.length+1,fromMin:Math.round(i),toMin:a,durationMin:o})}return e}function Cr(t){let e=Ti(t||[]);return e.length?(Lt=e.map(({slot:n,fromMin:i,toMin:o})=>({slot:n,fromMin:i,toMin:o})),Ie=vr(Lt),Lt):(Lt=null,Ie=null,null)}function _i(){Lt=null,Ie=null}function $r(t){let e=t?.length?t:x.slotWindows,n=[];for(let i of e||[]){if(n.length>=vt)break;let o=Number(i.fromMin),r=Number(i.toMin);if(!Number.isFinite(o)||!Number.isFinite(r)||r<o||o===0&&r<=2&&(e||[]).some(f=>Number(f.fromMin)>=54))continue;let a=Math.min(qt,59-o);if(a<1)continue;let u=Math.min(a,Math.max(1,r-o));n.push({fromMin:o,durationMin:u})}return n}function Tr(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=i=>Number(e.find(o=>o.type===i)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function ce(t=new Date){let{minute:e}=Tr(t),n=xr();for(let i of n)if(e>=i.fromMin&&e<=i.toMin)return i.slot;return 0}function Pe(t=new Date){if(ce(t))return 0;let{minute:e,second:n}=Tr(t),i=e*60+n,o=xr(),r=[...new Set(o.map(u=>u.fromMin))].sort((u,f)=>u-f);for(let u of r){let f=u*60;if(i<f)return(f-i)*1e3}let a=r[0]??0;return(3600-i+a*60)*1e3}function ki(t){return t<9e4?`${Math.ceil(t/1e3)}s`:`${Math.ceil(t/6e4)}m`}function Ir(){let t=document.querySelector(h(s.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=s.selRow,t.dataset[P.mark]="",n.insertAdjacentElement("afterend",t);let i=document.createElement("span");return i.id=s.anchor,i.dataset[P.mark]="",i.dataset[P.w]=e.style.width,i.dataset[P.mw]=e.style.minWidth,i.hidden=!0,e.insertAdjacentElement("beforebegin",i),l.setStyle(e,"width","100%"),l.setStyle(e,"minWidth","0"),t.appendChild(e),t}var Le="waitPillState",mc=3600*1e3,_r=c.pillWait,pc=c.pillDone;function hc(t,e){let n=document.createElement("span");n.className=`${c.pill} ${e}`;let i=(o,r)=>{let a=document.createElement("span");a.className=o,a.textContent=r,n.appendChild(a)};return i(c.pillTtl,t.title),t.timer!==void 0&&i(c.pillTmr,t.timer),n}function gc(t,e=Date.now()){if(t.kind==="waiting")return{variant:_r};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:_r}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:pc}}return null}function yc(t,e,n=new Date){let i=sr(n);return t.seconds===void 0?{title:i}:{title:i,timer:De(t.seconds)}}var bc=class{#t=null;#e={kind:"idle"};#i=null;#n=null;#o=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get(Le))[Le];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>mc){chrome.storage.local.remove(Le);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#o=t,this.#r(),this.#c()}toggleClockMode(){l.alive&&(this.setClockMode(!this.#o),chrome.storage.local.set({waitPillClock:this.#o}))}render(t){return gc(this.#e,t)}#l(t){return yc(t,this.#o,new Date)}#r(){if(this.#t??=Sc(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(c.hidden);return}this.#t.classList.remove(c.hidden),this.#t.replaceChildren(hc(this.#l(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#i&&(l.clear(this.#i),this.#i=null),t.kind==="running"?(chrome.storage.local.set({[Le]:t}),this.#i=l.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove(Le),this.#r(),this.#c()}#u(){this.#r(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,C("audioAlert").then(t=>{t&&Dc()})))}#c(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=l.setInterval(()=>this.#r(),1e3):!t&&this.#n&&(l.clear(this.#n),this.#n=null)}},fe=new bc,We="pillPosition",kr=4;function Mr(t,e,n){return Math.max(e,Math.min(n,t))}function Pr(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,i=e.height>0?e.height:36;return{w:n,h:i}}function le(t,e,n){let{w:i,h:o}=Pr(t),r=Mr(e,0,Math.max(0,window.innerWidth-i)),a=Mr(n,0,Math.max(0,window.innerHeight-o));return t.style.setProperty("left",r+"px","important"),t.style.setProperty("top",a+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:r,top:a}}function wc(t){var e=!1,n=!1,i=0,o=0,r=0,a=0;function u(d){if(e){var p=d.touches?d.touches[0]:d,y=p.clientX-i,g=p.clientY-o;!n&&Math.abs(y)<kr&&Math.abs(g)<kr||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",le(t,r+y,a+g),d.cancelable&&d.preventDefault())}}function f(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",f),document.removeEventListener("touchmove",u),document.removeEventListener("touchend",f),n){let d=t.getBoundingClientRect();chrome.storage.local.set({[We]:{top:Math.round(d.top),left:Math.round(d.left)}})}n=!1}}t.addEventListener("mousedown",function(d){if(d.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let p=t.getBoundingClientRect();i=d.clientX,o=d.clientY,r=p.left,a=p.top,le(t,p.left,p.top),document.addEventListener("mousemove",u),document.addEventListener("mouseup",f),d.preventDefault(),d.stopPropagation()}),t.addEventListener("touchstart",function(d){e=!0,n=!1,delete t.dataset.skipClick;let p=t.getBoundingClientRect();i=d.touches[0].clientX,o=d.touches[0].clientY,r=p.left,a=p.top,le(t,p.left,p.top),document.addEventListener("touchmove",u,{passive:!1}),document.addEventListener("touchend",f)},{passive:!0})}function Sc(){let t=document.querySelector(h(s.waitTime));return t||(t=document.createElement("div"),t.id=s.waitTime,t.className=c.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),wc(t),chrome.storage.local.get(We).then(e=>{let n=e[We];n&&typeof n.top=="number"&&typeof n.left=="number"&&le(t,n.left,n.top)}),$c(t),t)}function Ar(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function xc(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function vc(t){let{w:e,h:n}=Pr(t),i=12;return[{left:i,top:i},{left:Math.max(i,window.innerWidth-e-i),top:i},{left:i,top:Math.max(i,window.innerHeight-n-i)},{left:Math.max(i,window.innerWidth-e-i),top:Math.max(i,window.innerHeight-n-i)}]}async function Cc(){let e=(await chrome.storage.local.get(We))[We];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function $c(t){let e=!1,n=async()=>{if(!l.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(c.hidden))return;let i=xc(),o=!!(i&&i.offsetParent!==null&&i.getBoundingClientRect().height>20),r=t.getBoundingClientRect();if(o&&Ar(r,i.getBoundingClientRect())){let a=i.getBoundingClientRect(),u=vc(t),f=u.find(d=>{let p={left:d.left,top:d.top,right:d.left+r.width,bottom:d.top+r.height};return!Ar(p,a)})||u[2];e=!0,t.setAttribute("data-dodging",""),le(t,f.left,f.top);return}if(e&&!o){e=!1,t.removeAttribute("data-dodging");let a=await Cc();a&&le(t,a.left,a.top)}else o||t.removeAttribute("data-dodging")};l.setInterval(n,400),l.on(window,"resize",n)}async function Ei(){if(!l.alive||!await C("defaultWaitTime")||!await l.waitFor("#post_select",{attempts:bn}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});fe.setClockMode(t),await fe.restore()}async function Lr(){await C("defaultWaitTime")&&fe.waiting()}async function Mn(t){await C("defaultWaitTime")&&fe.run(t)}function qr(){fe.toggleClockMode()}function Rr(t){fe.setClockMode(t)}var qe=null,Re=null,xn=null;function Ii(){return xn||(xn=new(window.AudioContext||window.webkitAudioContext),l.disposable(()=>xn?.close())),xn}async function An(t=150){try{let e=Ii();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let o=e.currentTime,r=t/1e3;i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(.1,o+.01),i.gain.setValueAtTime(.1,o+Math.max(.01,r-.02)),i.gain.linearRampToValueAtTime(0,o+r),n.start(),n.stop(o+r)}catch(e){console.error("Audio beep failed:",e)}}function Dn(t,e=125,n=125){let i=0,o=()=>{i>=t||(An(e),i++,l.setTimeout(o,e+n))};o()}var Mi=4,Dr=50,Er=50,Tc=600;function Or(){if(Re)return;let t=()=>{Dn(Mi,Dr,Er);let e=Mi*Dr+(Mi-1)*Er;Re=l.setTimeout(t,e+Tc)};t()}var _c=250,kc=10,Mc=300,Ac=1e3;function Dc(){if(qe)return;let t=[];for(let o=0;o<=Mc;o+=kc)t.push(o);let e=Date.now(),n=0,i=()=>{let o=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&o>=t[n];){let r=n===t.length-1;An(r?Ac:_c),n++}if(n<t.length){let r=t[n],a=e+r*1e3,u=Math.max(0,a-Date.now());qe=l.setTimeout(i,u)}else me()};i()}function me(t={}){let e=!!t.keepConsular;qe&&(l.clear(qe),qe=null),Re&&(l.clear(Re),Re=null),Ai(),e||Di()}var vn=null,Cn=null,ue=null,$n=null,Oe=null;async function Nr(){Ai();try{let t=Ii();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=880,i.frequency.value=1320,o.gain.value=.85,r.gain.value=.65,n.connect(o).connect(e),i.connect(r).connect(e);let a=t.createOscillator(),u=t.createGain();a.type="triangle",a.frequency.value=3.2,u.gain.value=280,a.connect(u),u.connect(n.frequency),u.connect(i.frequency);let f=t.currentTime;n.start(f),i.start(f),a.start(f),ue={osc1:n,osc2:i,lfo:a,master:e};let d=()=>{ue&&(An(500),Cn=l.setTimeout(d,1800))};d(),vn=l.setTimeout(Ai,12e4),Oe=document.title;let p=!1,y=()=>{ue&&(document.title=p?Oe:"!!! SUBMIT CLICKED !!!",p=!p,$n=l.setTimeout(y,450))};y()}catch(t){console.error("Submit alarm failed:",t)}}function Ai(){if(vn&&(l.clear(vn),vn=null),Cn&&(l.clear(Cn),Cn=null),$n&&(l.clear($n),$n=null),Oe&&(document.title=Oe,Oe=null),ue){try{let{osc1:t,osc2:e,lfo:n}=ue;t.stop(),e.stop(),n.stop()}catch{}ue=null}}function Ec(){let t=location.pathname||"";return/\/ofc-schedule\b/i.test(t)?!1:/\/(schedule|c-schedule)\b/i.test(t)}var Ic=6e4,Tn=null,_n=null,kn=null,Ne=null,de=null;async function Pc(){Di();try{let t=Ii();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=980,i.frequency.value=1470,o.gain.value=.95,r.gain.value=.8,n.connect(o).connect(e),i.connect(r).connect(e);let a=t.createOscillator(),u=t.createGain();a.type="square",a.frequency.value=4,u.gain.value=320,a.connect(u),u.connect(n.frequency),u.connect(i.frequency);let f=t.currentTime;n.start(f),i.start(f),a.start(f),de={osc1:n,osc2:i,lfo:a,master:e};let d=()=>{de&&(An(650),_n=l.setTimeout(d,900))};d(),Tn=l.setTimeout(Di,Ic),Ne=document.title;let p=!1,y=()=>{de&&(document.title=p?Ne:"!!! OFC BOOKED \u2014 CONSULAR PAGE !!!",p=!p,kn=l.setTimeout(y,400))};y()}catch(t){console.error("Consular OFC alarm failed:",t)}}function Di(){if(Tn&&(l.clear(Tn),Tn=null),_n&&(l.clear(_n),_n=null),kn&&(l.clear(kn),kn=null),Ne&&(document.title=Ne,Ne=null),de){try{let{osc1:t,osc2:e,lfo:n}=de;t.stop(),e.stop(),n.stop()}catch{}de=null}}function Wr(){if(Ec()){try{let t="vsConsularOfcBeep";if(sessionStorage.getItem(t)==="1")return;sessionStorage.setItem(t,"1")}catch{}Pc()}}function Lc(){document.querySelector(h(s.recheck))?.remove();for(let t of document.querySelectorAll("button"))(t.textContent||"").trim()==="Recheck"&&t.remove()}async function Pi(){l.alive&&Lc()}async function qi(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await l.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let i=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(u=>u.innerText.trim()===i))continue;let r=document.createElement("li");r.className="usa-sidenav__item",r.dataset[P.mark]="";let a=document.createElement("a");a.href=n.link,a.className=c.sideLink,a.target="_self",a.textContent=n.text,r.appendChild(a),t.appendChild(r)}}function q(t,e,n){let i=document.createElement(t);return e&&(i.className=e),n?.appendChild(i),i}function En(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,r]=n;return`${r}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return null}function Li(t){let e=En(t);if(!e)return String(t||"");let[n,i,o]=e.split("-").map(Number);if(!n||!i||!o)return e;try{return new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(new Date(n,i-1,o))}catch{return e}}function qc(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);if(n)return n[1].slice(0,5);let i=e.match(/^(\d{1,2}:\d{2})/);return i?i[1]:e}function Hr(t){let e=document.querySelector(h(s.datesCont));if(e){let o=e.querySelector(h(s.datesPara)),r=e.querySelector("h2");if(r&&t&&(r.textContent=t),o)return{container:e,details:o}}let n=document.querySelector("#page_form");if(!n)return null;e?.remove();let i=Rc(t||"");return n.appendChild(i.container),i}function Fr(t){if(t.response.HasError)return;let e=document.querySelector("#post_select"),n=e?.options[e.selectedIndex]?.text??"",i=(t.response.ScheduleDays||[]).map(d=>En(d?.Date)).filter(Boolean).sort((d,p)=>d.localeCompare(p));document.querySelector(h(s.datesCont))?.remove();let o=Hr(n);if(!o)return;let{details:r}=o;r.replaceChildren();let a=q("div",c.slotsSum,r);if(!i.length){a.textContent="No slots available";return}a.textContent=`${i.length} date${i.length===1?"":"s"} available`;let u={};for(let d of i){let p=d.slice(0,7);(u[p]||=[]).push(d)}for(let[d,p]of Object.entries(u)){let y=q("div",null,r),g=document.createElement("strong");g.textContent=d,y.append(g,`: ${p.map(w=>w.slice(8,10)).join(", ")}`)}let f=q("div",null,r);f.style.marginTop="0.5em";for(let d of i){let p=q("div",null,f);p.textContent=`\u2022 ${Li(d)} (${d})`}}function Br(t,e,n){let i=document.querySelector("#post_select"),o=n||i?.options[i.selectedIndex]?.text||"",r=En(e)||En(t?.[0]?.Date)||"",a=(t||[]).filter(v=>v&&v.Time).map(v=>({time:qc(v.Time),avail:v.EntriesAvailable!=null&&Number.isFinite(Number(v.EntriesAvailable))?Number(v.EntriesAvailable):null,raw:v})).sort((v,j)=>String(v.time).localeCompare(String(j.time))),u=Hr(o);if(!u)return;let{details:f}=u;f.replaceChildren();let d=q("div",c.slotsSum,f);if(!a.length){d.textContent=r?`No time slots on ${Li(r)}`:"No time slots available";return}let p=a.filter(v=>v.avail==null||v.avail>0),y=p.reduce((v,j)=>v+(j.avail||0),0),g=r?Li(r):"selected date";if(d.textContent=y>0?`${p.length} time slot${p.length===1?"":"s"} on ${g} \xB7 ${y} available`:`${a.length} time slot${a.length===1?"":"s"} on ${g}`,r){let v=q("div",null,f);v.style.margin="0.35em 0 0.6em",v.textContent=`Date: ${g} (${r})`}let w=q("table",c.slotsTbl,f);w.id=s.slotsTbl;let S=q("thead",null,w),$=q("tr",null,S);for(let v of["Time","Availability"]){let j=q("th",null,$);j.textContent=v}let D=q("tbody",null,w);for(let v of a){let j=q("tr",null,D);v.avail===0&&(j.style.opacity="0.55");let re=q("td",null,j);re.textContent=v.time;let Gt=q("td",null,j);Gt.textContent=v.avail==null?"\u2014":String(v.avail)}}function Rc(t){let e=q("div","row");e.id=s.datesCont;let n=q("div","col-sm-12 atlas_section mt-3",e),i=q("div","col-sm-12 atlas_section_header_row",q("div","row",n));q("h2",null,i).textContent=t;let o=q("div",null,q("div","col-sm-12",q("div","row",n)));return o.id=s.datesPara,{container:e,details:o}}var Ur=null;function Oc(){let t=document.querySelector(h(s.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return l.setStyle(n,"display","flex"),l.setStyle(n,"alignItems","center"),l.setStyle(n,"justifyContent","flex-end"),l.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=s.ofcDate,t.dataset[P.mark]="",e.insertAdjacentElement("beforebegin",t),t}function Nc(){if(!location.pathname.includes("/schedule"))return;let t=Ur;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=Oc();n&&(n.textContent=`OFC (Estimate): ${cr(e.appointmentDateStr)}`)}function Kr(t){chrome.runtime?.id&&(Ur=t.data.data,l.waitFor("#submitbtn").then(e=>{e&&Nc()}))}var In=new Map,zr=45e3,Pn=new Map,Gr=8e3,jr=0;function Ln(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function qn(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function Wc(t,e){return`${t}:${e.slice(0,5).join(",")}`}function Hc(t){let e=Date.now(),n=In.get(t);if(n&&e-n<zr)return!1;In.set(t,e);for(let[i,o]of In)e-o>zr*4&&In.delete(i);return!0}function Fc(t){let e=Date.now(),n=Pn.get(t);if(n&&e-n<Gr)return!1;Pn.set(t,e);for(let[i,o]of Pn)e-o>Gr*6&&Pn.delete(i);return!0}async function Yr(){return await C("telegramViaServer")!==!1}async function Vr(t,{kind:e="alert",dedupKey:n="",skipDedup:i=!1,notifyMuktesh:o=!0}={}){if(t&&await Yr())try{await fetch(Zo,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:i,notify_muktesh:o}),signal:AbortSignal.timeout(2e4)})}catch{}}function Bc(t,{kind:e="screen",dedupKey:n="",waitMs:i=0,skipDedup:o=!1,notifyMuktesh:r=!0}={}){l.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:i,skipDedup:o,notifyMuktesh:r,captureScreenshot:!0})}async function Uc(t,e,n){let i=Ln(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&r.push(`\u{1FAAA} <b>Visa:</b> ${n}`),r.push(`\u{1F550} <b>Checked:</b> ${o} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),r.push(`\u{1F4C6} <b>Dates (${i.length}):</b>`,"");for(let a of i.slice(0,30))r.push(`\u{1F7E2} <b>${qn(a)}</b>`);return i.length>30&&r.push("",`\u2795 <i>+${i.length-30} more dates</i>`),r.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),r.join(`
`)}function Kc(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",i=document.querySelector("#datepicker")?.value||"\u2014",r=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:i,time:r}}async function Qr(t,{postId:e,postName:n,hasError:i}={}){if(i||!t?.length)return;let o=Ln(t);if(!o.length||!await C("telegramAlert"))return;let r=Wc(e||n||"unknown",o);if(!Hc(r))return;let a=await z(),u=await Uc(n,t,a?.visa||"");await Vr(u,{kind:"slots",dedupKey:r,notifyMuktesh:!0})}function zc(t,e,n){let i=Ln(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`;if(i.length){let a=i.slice(0,5).map(u=>qn(u)).join(", ");return`<b>DATES AVAILABLE</b>
\u{1F3DB}\uFE0F ${r}
\u{1F4C6} ${i.length} date(s)
${a}${i.length>5?"\u2026":""}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}return`<b>City changed \u2014 no dates</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}function Gc(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=e?qn(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${i}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function jc(t,e,n){let i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?qn(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u23F0 ${n} slot(s)
\u{1F550} ${i} IST
\u{1F4F2} Visa Slot 6`}async function pe(t,{kind:e="screen",dedupKey:n,waitMs:i=0,skipDedup:o=!1}={}){if(await C("telegramScreenshots")===!1||!await Yr())return;let r=n||`${e}:${String(t).slice(0,80)}`;!o&&!Fc(r)||Bc(t,{kind:e,dedupKey:r,waitMs:i,skipDedup:o,notifyMuktesh:!0})}async function Xr(t,{postId:e,postName:n,hasError:i}={}){let o=zc(n,t,i),r=Ln(t),a=r.length?"dates":"city";await pe(o,{kind:a,dedupKey:`${a}:${e||n}:${r.length}:${i?1:0}`,waitMs:r.length?1400:900})}async function Jr(t,e){await pe(Gc(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function Zr(t,e,n){await pe(jc(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function ta(){let t=Date.now();if(t-jr<8e3)return;jr=t;let e=await z(),{city:n,date:i,time:o}=Kc(),r=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),a=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${i}`,`\u23F0 <b>Time:</b> ${o}`];e?.email&&a.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&a.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),a.push(`\u{1F550} <b>When:</b> ${r} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let u=a.join(`
`);await Vr(u,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await pe(u,{kind:"submit",skipDedup:!0,waitMs:200})}var On=25;function Nn(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Ni(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let i=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,i),n-1)}function ea(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function na(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function Hi(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function Ri(t){if(t)try{t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}}function Rn(t){if(t)try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}}function Wi(t){if(!t||t.disabled)return!1;try{if(t.tagName==="SELECT")return!t.value||t.value==="0"?!1:(Ri(t),t.value&&t.value!=="0"?!0:(Rn(t),!!(t.value&&t.value!=="0")));if(t.type==="radio"||t.type==="checkbox"){if(t.name)for(let i of document.getElementsByName(t.name))i!==t&&(i.checked=!1);if(t.checked=!0,Ri(t),t.checked)return!0;let e=t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,n=t.closest("tr");for(let i of[e,t.closest("label"),t,n].filter(Boolean))Rn(i);return t.checked=!0,Ri(t),t.checked===!0}Rn(t)}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function ia(){let t=new Set,e=[],n=i=>{if(!i||t.has(i)||Hi(i)||i.disabled)return;let o=i.closest("tr");o&&na(o)||(t.add(i),e.push(i))};for(let i of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let o of document.querySelectorAll(`${i}:not([disabled])`))n(o);return e}function Yc(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!ea(n)||na(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function Vc(t,e){for(let n of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(n.tagName!=="SELECT"||n.disabled||Hi(n))continue;let i=[...n.options].filter(a=>!a.disabled&&a.value&&a.value!=="0"&&ea({textContent:a.textContent}));if(!i.length)continue;let o=null,r=Nn(e);if(r&&r!=="00:00"&&(o=i.find(a=>(a.textContent||"").includes(r))||null,!o)){let a=r.match(/(\d{1,2}:\d{2})/);a&&(o=i.find(u=>(u.textContent||"").includes(a[1]))||null)}if(!o){let a=Ni(i.length,t);o=i[a]}if(o&&(n.value=o.value,Wi(n)))return!0}return!1}function Qc(t,e){if(Vc(t,e))return!0;let n=ia();if(n.length){let o=null,r=Nn(e);if(r&&r!=="00:00"&&(o=n.find(a=>{let u=(a.closest("tr")?.textContent||a.textContent||"").replace(/\s+/g," ");return u.includes(r)||u.includes(r.slice(0,5))})||null),!o){let a=Ni(n.length,t);o=n[a]}if(o&&Wi(o))return!0}let i=Yc();if(i.length){let o=null,r=Nn(e);if(r&&r!=="00:00"&&(o=i.find(f=>(f.textContent||"").includes(r))||null),!o){let f=Ni(i.length,t);o=i[f]}if(!o)return!1;let a=o.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(a&&Wi(a))return!0;let u=o.querySelector("label");if(u)return Rn(u),!!o.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function Q(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!Hi(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function Xc({slotIndex:t=0,maxMs:e=12e3,pollMs:n=On,time:i,onTick:o}={}){let r=Date.now()+e,a=Math.max(10,n||25);return new Promise(u=>{let f=()=>{if(!l.alive)return u(!1);if(o?.(),Qc(t,i)||Q())return u(!0);if(Date.now()>=r)return u(!1);l.setTimeout(f,a)};f()})}function He({time:t,date:e,slotIndex:n,pollMs:i,maxMs:o}){let r=n??0,a=o||15e3,u=i||On;return l.send({action:"forcePickTimeSlot",slotIndex:r,maxMs:a,pollMs:u}),l.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:r,pollMs:u,domWaitMs:0,maxMs:a}),Xc({slotIndex:r,maxMs:a,pollMs:u,time:t||"00:00"})}var Oi=!1;function oa({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(Oi)return;Oi=!0;let i=!1,o=async()=>{if(!(!l.alive||i)){if(Q()){n?.();return}try{if(t&&!await t())return}catch{return}ia().length&&(i=!0,await He({slotIndex:e,time:"00:00",maxMs:800,pollMs:On}),i=!1,Q()&&n?.())}};l.setInterval(o,On);let r=document.querySelector("#page_form")||document.body,a=new MutationObserver(()=>o());a.observe(r,{childList:!0,subtree:!0}),l.disposable(()=>{a.disconnect(),Oi=!1})}function ra(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let i=Nn(n?.Time);if(!i)continue;let o=i.match(/(\d{1,2}):(\d{2})/);if(!o)continue;let[,r,a]=o;if(e.includes(`${r}:${a}`)||e.includes(`${parseInt(r,10)}:${a}`))return!0}return!1}var Wn="submitErrors",aa=50,Jc=45e3,ca=0,Fi=new Set,Fe=null,la=null;function ua(t){la=typeof t=="function"?t:null}function Zc(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",i=document.querySelector("#datepicker")?.value||"";return{city:e,date:i,url:location.href}}function Be(){ca=Date.now()+Jc,Fi.clear(),rl()}function Hn(){return Date.now()<ca}function tl(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function el(t){let e=await T({[Wn]:[]}),n=Array.isArray(e[Wn])?e[Wn]:[];n.push(t),n.length>aa&&n.splice(0,n.length-aa),await M({[Wn]:n})}function sa(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function nl(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${sa(t.source)}`,`\u{1F4AC} <b>Message:</b> ${sa(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let i=n.join(`
`);await pe(i,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function Ue(t,e,n={}){let i=String(e||"").trim();if(!i||!Hn()&&!n.force)return;let o=tl(t,i);if(Fi.has(o))return;Fi.add(o);let r=Zc(),a=await z(),u={at:Date.now(),source:String(t||"unknown"),message:i.slice(0,2e3),city:n.city||r.city,date:n.date||r.date,url:n.url||r.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:a?.email||""};await el(u);try{await nl(u)}catch{}try{la?.(u)}catch{}}function il(t){if(!Hn())return;let e=t?.status,n=t?.retryAfter,i=t?.cgiBlock,o=`Request failed (HTTP ${e||"?"})`;n!=null&&(o+=` \u2014 retry after ${n}s`),i&&(o+=" \u2014 CGI access limitation"),Ue("ajax_error",o,{status:e})}function da(t){if(!Hn()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){il({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",o=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";Ue("ajax_response",o,{route:t.tail||""})}var ol=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function rl(){Fe&&l.clear(Fe);let t=()=>{if(!l.alive||!Hn()){Fe=null;return}for(let e of ol)for(let n of document.querySelectorAll(e)){let i=(n.textContent||"").replace(/\s+/g," ").trim();!i||i.length<4||Ue("page_validation",i)}Fe=l.setTimeout(t,600)};Fe=l.setTimeout(t,500)}var Ke=0,fa="",ma=0;async function al(){let[t,e]=await Promise.all([z(),T(["cgiIdToken"])]),n=se(e.cgiIdToken);return{profile:t,token:n}}async function pa(t){if(!K()||!await C("serverSync"))return null;let{profile:e,token:n}=await al();if(!e?.id&&!e?.email)return null;try{let i={...t,profile:e};n&&(i.token=n);let o=await fetch(tr,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i),signal:AbortSignal.timeout(2500)}).then(r=>r.json());return o&&o.success?o:null}catch{return null}}async function Bi({postId:t,postName:e,dayCount:n,dateFrom:i=null,dateTo:o=null,bestDate:r=null,rangeFrom:a=null,rangeTo:u=null}={}){let f=String(t||"").trim(),d=Number(n)||0;if(!f||d<1)return null;let p=String(r||i||"").slice(0,10),y=`${f}:${d}:${p}`,g=Date.now();if(y===fa&&g-ma<250)return null;fa=y,ma=g;let w=await pa({action:"alert",city:{id:f,name:String(e||f).trim()},dayCount:d,dateFrom:i||a||p||null,dateTo:o||u||p||null,bestDate:p||null,rangeFrom:a||null,rangeTo:u||null});return w?.alertId&&(Ke=Math.max(Ke,Number(w.alertId)||0)),w}async function ha({preferredCities:t=[],citiesEnabled:e=!1,currentCityId:n="",dateFrom:i=null,dateTo:o=null}={}){if(!e||!t?.length)return null;let a=(await pa({action:"poll",preferredCities:t,citiesEnabled:!0,currentCityId:String(n||""),lastAlertId:Ke,dateFrom:i||null,dateTo:o||null}))?.forceCity;return!a?.id||!a?.alertId?null:a}function Fn(t){let e=Number(t)||0;e>Ke&&(Ke=e)}var sl=["cities","from","to","submitEnabled","citiesEnabled","enabled","slotWindows","termsAgreed","termsPassed","termsAgreedAt"];function ga(t){if(!t||typeof t!="object")return{};let e={};for(let n of sl)n in t&&(e[n]=t[n]);return typeof e.submitEnabled!="boolean"&&typeof e.enabled=="boolean"&&(e.submitEnabled=e.enabled),delete e.enabled,e}function ya(t,e){if(!e||typeof e!="object")return t||null;let n=t&&typeof t=="object"?{...t}:{},i=Number(n.serverUpdatedAt)||0,o=Number(e.updatedAt)||0;if(o&&i&&o<i)return n;let r=ga(e);Array.isArray(r.cities)&&!r.cities.length&&Array.isArray(n.cities)&&n.cities.length&&delete r.cities;let a={...n,...r};return typeof r.submitEnabled=="boolean"&&(a.enabled=r.submitEnabled),e.updatedAt&&(a.serverUpdatedAt=e.updatedAt),a}async function ba(){let[t,e]=await Promise.all([z(),T(["cgiIdToken"])]),n=se(e.cgiIdToken);return{profile:t,token:n}}async function wa(t){if(!K()||!await C("serverSync"))return!1;let e=ga(t);if(!Object.keys(e).length)return!1;let{profile:n,token:i}=await ba();if(!n?.id&&!n?.email)return!1;try{let o={profile:n,prefs:e};i&&(o.token=i);let r=await fetch(gn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(a=>a.json());return!!(r&&r.success)}catch{return!1}}async function Sa(){if(!K()||!await C("serverSync"))return null;let{profile:t,token:e}=await ba();if(!t?.id&&!t?.email)return null;try{let n=new URLSearchParams;t.id&&n.set("applicant_id",String(t.id)),t.email&&n.set("email",String(t.email));let i=await fetch(`${gn}?${n.toString()}`,{method:"GET",headers:{Accept:"application/json"}}).then(r=>r.json());if(i?.prefs)return i.prefs;let o={profile:t};return e&&(o.token=e),i=await fetch(gn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(r=>r.json()),i?.prefs||null}catch{return null}}var Nt="aiSubmitByAccount",xe=8e3;var G=25;var Yn=0,je=1e4,Wa=1e3;function ve(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}function ao(){return x.cityRotateMinGapMs}function cl(){return x.cityRotateMaxGapMs}function Ye(){return x.cityHoldMaxMs}function Ct(){return x.cityLoadingMaxMs}function Vt(){return x.cityCalendarNoDatesMs}var xa=5e3,ji=2e4,ll=15e3;function Je(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function At(){return/\/ofc-schedule\b/i.test(location.pathname)}function k(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var ul=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function ze(t,e){let n=ul[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(o=>{let r=e===o?" selected":"";return`<option value="${o.replace(/"/g,"&quot;")}"${r}>${o}</option>`}).join("")}function he(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function Zt(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function dl(t,e,n){return`${t}-${String(e+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`}function fl(t){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(t))return null;let[e,n,i]=t.split("-").map(Number),o=new Date(e,n-1,i);return o.getFullYear()!==e||o.getMonth()!==n-1||o.getDate()!==i?null:o}function so(){for(let t of["from","to"]){let e=document.querySelector(h(t==="from"?s.aiFrom:s.aiTo)),n=document.querySelector(h(t==="from"?s.aiFromBtn:s.aiToBtn));if(!n)continue;let i=e?.value||"";n.textContent=i?Zt(i):"Select date"}}function Ui(t,e){let n=document.querySelector(h(t==="from"?s.aiFrom:s.aiTo));if(n&&(n.value=e||""),t==="from"){let i=document.querySelector(h(s.aiTo));i&&e&&i.value&&i.value<e&&(i.value="")}so()}var tt={y:0,m0:0,which:"from"};function Wt(){document.querySelector(h(s.aiCal))?.classList.add(c.hidden)}function co(t){let e=t.target;return e?e.nodeType===3?e.parentElement:e:null}function Yi(){let t=document.querySelector(h(s.aiCal));if(!t)return;let{y:e,m0:n,which:i}=tt,o=document.querySelector(h(i==="from"?s.aiFrom:s.aiTo))?.value||"",r=he(),a=i==="to"&&document.querySelector(h(s.aiFrom))?.value||he(),u=new Date(e,n,1).toLocaleDateString("en-IN",{month:"long",year:"numeric"}),f=new Date(e,n,1).getDay(),d=new Date(e,n+1,0).getDate(),p=new Date(e,n,0).getDate(),y="";for(let g of["S","M","T","W","T","F","S"])y+=`<div class="${c.aiHint}">${g}</div>`;for(let g=0;g<42;g++){let w,S=e,$=n,D=!1;g<f?(w=p-f+g+1,$=n-1,$<0&&($=11,S=e-1),D=!0):g>=f+d?(w=g-f-d+1,$=n+1,$>11&&($=0,S=e+1),D=!0):w=g-f+1;let v=dl(S,$,w),j=v<a,re=[c.aiCalDay,D?c.aiCalMuted:"",j?c.aiCalMuted:"",v===r?c.aiCalToday:"",v===o?c.aiCalOn:""].filter(Boolean).join(" ");y+=`<button type="button" class="${re}" data-iso="${v}" ${j?'disabled aria-disabled="true"':""}>${w}</button>`}t.innerHTML=`
    <div class="${c.aiCalHead}">
      <button type="button" data-cal="prev" aria-label="Previous month">\u2039</button>
      <div class="${c.aiHead}">${u}</div>
      <button type="button" data-cal="next" aria-label="Next month">\u203A</button>
    </div>
    <div class="${c.aiCalGrid}">${y}</div>
    <div class="${c.aiRow}">
      <button type="button" data-cal="clear">Clear</button>
      <button type="button" data-cal="today">Today</button>
    </div>
  `}function ml(t){let e=document.querySelector(h(s.aiCal)),i=co(t)?.closest?.("button");if(!e||!i||!e.contains(i))return;t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation();let o=i.getAttribute("data-cal"),r=tt.which,a=r==="to"&&document.querySelector(h(s.aiFrom))?.value||he();if(o==="prev"){tt.m0-=1,tt.m0<0&&(tt.m0=11,tt.y-=1),Yi();return}if(o==="next"){tt.m0+=1,tt.m0>11&&(tt.m0=0,tt.y+=1),Yi();return}if(o==="clear"){Ui(r,""),Wt();return}if(o==="today"){let f=he();f>=a&&(Ui(r,f),Wt(),Oa());return}if(i.disabled||i.getAttribute("aria-disabled")==="true")return;let u=i.getAttribute("data-iso");!u||u<a||(Ui(r,u),Wt(),Oa())}function va(t){let e=document.querySelector(h(s.aiCal));if(!e||!t)return;let n=t.getBoundingClientRect(),i=Math.min(340,window.innerWidth-16),o=e.offsetHeight||360,r=Math.max(8,Math.min(n.left,window.innerWidth-i-8)),a=n.bottom+6;a+o>window.innerHeight-8&&n.top-6-o>=8?a=n.top-6-o:a=Math.max(8,Math.min(a,window.innerHeight-o-8)),e.style.position="fixed",e.style.top=`${Math.round(a)}px`,e.style.left=`${Math.round(r)}px`,e.style.width=`${i}px`,e.style.right="auto",e.style.bottom="auto"}function Ca(t,e){let n=document.querySelector(h(s.aiCal));n||(n=document.createElement("div"),n.id=s.aiCal,n.className=`${c.aiCal} ${c.hidden}`,n.dataset[P.mark]="",document.body.appendChild(n),l.on(n,"pointerdown",ml,{capture:!0}),l.on(n,"click",r=>{n.contains(co(r))&&(r.preventDefault(),r.stopPropagation())},{capture:!0}));let i=document.querySelector(h(t==="from"?s.aiFrom:s.aiTo))?.value,o=fl(i)||new Date;tt={y:o.getFullYear(),m0:o.getMonth(),which:t},Yi(),n.classList.remove(c.hidden),va(e),requestAnimationFrame(()=>va(e))}function Dt(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function Mt(t){return!!(t&&t.citiesEnabled)}async function E(){let t=await z();return t?.id?String(t.id):null}async function _(t){return t&&((await T(Nt))[Nt]||{})[t]||null}async function Ze(t,e){if(!t)return;let i=(await T(Nt))[Nt]||{};e==null?delete i[t]:i[t]=e,await M({[Nt]:i})}var W=!1;function Ce(){return W}function be(){W=!0,Ut(),ye()}function gt(){W=!1,N=!1,Ut()}async function zn(t){Ha(),be();let e=await _(t);if(!e){rt();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await Ze(t,e),rt()}var et=!1,Qt=null,Rt=null,$a=2e4,Gn=new Set,Vi="",Qi="";function Ha(){et=!1,Qt&&(l.clear(Qt),Qt=null),Rt&&(l.clear(Rt),Rt=null)}function Vn(){Gn.clear(),Vi=""}function pl(t){let e=String(t||"").slice(0,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(e))return;let n=String(document.querySelector("#post_select")?.value||"");n!==Vi&&(Gn.clear(),Vi=n),Gn.add(e)}function Qn(t){let e=String(t||"").slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(e)&&(Qi=e)}function hl(){let t=document.querySelector("#datepicker"),e=String(t?.value||"").trim();if(!e)return Qi||"";if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,r]=n;return`${r}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return Qi||""}async function Ta(){if(W||k()||!At())return!1;let t=await dt();if(!t)return!1;let e=document.querySelector("#post_select"),n=e?String(e.value):"";if(!n)return!1;let i=hl();i&&pl(i);let r=(await xt()).find(y=>String(y.ID)===n),u=Qe(r?.Days||[],t.from,t.to).filter(y=>!Gn.has(String(y.Date).slice(0,10)));if(!u.length)return!1;let f=ve(u.length),d=u[f];if(!d?.Date)return!1;let p=String(d.Date).slice(0,10);return Qn(p),J(),gt(),b(`Submit failed \u2014 trying next date #${f+1} (${p}) (${u.length} left in range)\u2026`),I(`Submit failed \u2014 next date ${p} (${u.length} left)\u2026`),l.send({action:"selectFirstDate",date:p,maxMs:xe,pollMs:G}),!0}async function tn(t){if(k()||_a()){t?await zn(t):be(),b("Booking confirmed \u2014 Tik Tik stopped.");return}et=!0,J(),Be(),b("Submit clicked \u2014 waiting for confirmation (Auto Submit + City Change stay ON)\u2026"),Rt&&l.clear(Rt);let e=Date.now(),n=async()=>{if(Rt=null,!(!et||!l.alive)){if(_a()||k()){let i=t||await E();i?await zn(i):be(),b("Booking confirmed \u2014 Tik Tik stopped.");return}if(Date.now()-e>=$a){await Ve("no confirmation yet \u2014 resuming city checks");return}Rt=l.setTimeout(n,400)}};Rt=l.setTimeout(n,400),Qt&&l.clear(Qt),Qt=l.setTimeout(()=>{Qt=null,et&&Ve("submit wait timed out \u2014 resuming city checks")},$a)}function _a(){if(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))return!0;let t=(document.body?.innerText||"").slice(0,2500);return/appointment\s+confirmation|successfully\s+scheduled|your\s+appointment\s+has\s+been/i.test(t)}async function Ve(t=""){if(!et&&!R&&!N){if(await Ta())return;ut();return}Ha(),N=!1,Ut(),W&&gt();let e=t?`Submit failed (${t})`:"Submit failed";if(await Ta()){b(`${e} \u2014 staying on city; trying another date\u2026`);return}if(Vn(),ut(),b(`${e} \u2014 no other dates in range; hopping cities\u2026`),L)X(Date.now()),A();else{let i=await E();if(i){let o=await _(i);Mt(o)&&await an()}}}function en(){return et}function te(t,e,n){let i=String(t||"").slice(0,10);return!(!i||i.length<10||e&&i<e||n&&i>n)}async function nn(){if(W||k()||!At())return null;let t=await E();if(!t)return null;let e=await _(t),n=e?.from?String(e.from).slice(0,10):"",i=e?.to?String(e.to).slice(0,10):"";return!n||!i||n.length<10||i.length<10?null:{from:n,to:i,accountId:t,submitArmed:Dt(e)}}async function dt(){if(W||k()||!At())return null;let t=await E();if(!t)return null;let e=await _(t);return!Dt(e)||!e.from||!e.to?null:{...e,accountId:t}}async function ee(){if(W||k()||!At())return null;let t=await E();if(!t)return null;let e=await _(t);return!Mt(e)||!e.cities?.length?null:(Qa(e),{...e,accountId:t})}function Qe(t,e,n){let i=new Date;return i.setHours(0,0,0,0),(t||[]).map(o=>{if(!o)return null;let r=o.Date!=null?o.Date:o.date,a=gl(r);return a?{...o,Date:a}:null}).filter(Boolean).filter(o=>te(o.Date,e,n)).filter(o=>{let[r,a,u]=o.Date.slice(0,10).split("-").map(Number);return new Date(r,a-1,u)>=i}).sort((o,r)=>String(o.Date).localeCompare(String(r.Date)))}function gl(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,r,a]=n;return`${a}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime()))return`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}-${String(o.getDate()).padStart(2,"0")}`}return null}var N=!1,$t=null,Tt=null,ct=!1,_t=0,L=!1,Y=0,nt=0,Ht=0,Ft=0,$e=!1,pt=null,mt=0,R=!1,H=0,ge=null,Xt=null,kt=0,ka=!1,Ki="",Ge="",lo=0,Ma="",Aa=!1,Xi=0;function yl(t){return(t||[]).map(e=>e.id).join("")}function bl(){let t=document.querySelector(h(s.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function Da(t){let e=document.querySelector(h(s.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function Ut(){$t&&(l.clear($t),$t=null),N=!1}function Et(){ge&&(l.clear(ge),ge=null)}function Fa(){Et(),H||(H=Date.now());let t=Math.max(500,Ye()-(Date.now()-H));ge=l.setTimeout(()=>{ge=null,!(!R||!L||!l.alive)&&(R=!1,H=0,X(Date.now()),b(`City Change \u2014 booking hold timed out (${Ye()/1e3}s); next city in 15\u201318s\u2026`),A())},t)}function wl(){Xt&&(l.clear(Xt),Xt=null)}function Xn(t=Date.now()){let e=!1;if(ct&&_t&&t-_t>=ll&&(ct=!1,_t=0,e=!0),R&&(H||(H=t),t-H>=Ye()?(Et(),R=!1,H=0,e=!0):ge||Fa()),$e){mt||(mt=t);let i=Ji()?Ct():Vt();if(t-mt>=i)ot(),e=!0;else if(!pt){let o=Math.max(500,i-(t-mt));pt=l.setTimeout(()=>{if(pt=null,!L||R)return;let r=Ji(),a=r?Ct():Vt();if(Date.now()-(mt||0)<a){Xn();return}ot(),X(Date.now()),b(r?`City Change \u2014 still Loading after ${Ct()/1e3}s; changing city\u2026`:`City Change \u2014 calendar up but no dates after ${Vt()/1e3}s; changing city\u2026`),A()},o)}}return N&&!$t&&(N=!1,e=!0),e}function Ba(){if(Xt||!L)return;let t=()=>{if(Xt=null,!L||!l.alive||W)return;let e=Date.now(),n=Xn(e),i=!!ce(new Date(e)),o=!!Tt,r=!i&&o||$e||R||N||et,a=!r&&kt>0&&e-kt>=ji;if(n||a||!o&&!ct&&!r)a?(ct=!1,_t=0,ot(),!R&&!et&&(Et(),H=0),N&&!$t&&(N=!1),Y=e,b(i?"City Change \u2014 unstuck; hopping now\u2026":`City Change \u2014 unstuck; waiting for IST window ${ft()}\u2026`)):n?(!R&&!et&&(Y=e),b(i?"City Change \u2014 lock cleared; hopping now\u2026":`City Change \u2014 lock cleared; next IST window ${ft()}\u2026`)):b("City Change \u2014 timer lost; restarting\u2026"),kt=e,A();else if(!i&&o){let f=Pe(new Date(e));b(`City Change \u2014 waiting for slot window (IST ${ft()}, next in ${ki(f)})`)}L&&(Xt=l.setTimeout(t,xa))};Xt=l.setTimeout(t,xa)}function ye(){ho(),wl(),Al(),Et(),ct=!1,_t=0,L=!1,R=!1,H=0,Y=0,nt=0,kt=0,ot()}function ot(){$e=!1,mt=0,pt&&(l.clear(pt),pt=null)}function uo(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let i=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(i))continue;let o=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let r of o)if(r&&/\bLoading\.{0,3}\b/i.test((r.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let o=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(o))continue;let r=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(r))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function Ji(){return uo()}function fo(){$e=!0,mt=Date.now(),pt&&l.clear(pt),pt=l.setTimeout(()=>{pt=null,!(!L||R)&&(ot(),X(Date.now()),b(`City Change \u2014 still Loading after ${Ct()/1e3}s; changing city\u2026`),A())},Ct())}function mo(t){let e=Math.max(0,Number(t)||0)*1e3;Ft=Math.max(Ft,Date.now()+e),Y=Math.max(Y,Ft),ot(),A()}function Ua(){ot()}function J(){W||(R=!0,H||(H=Date.now()),ho(),ot(),Fa(),kt=Date.now(),L&&A(),b("City Change \u2014 paused (Auto Submit booking)\u2026"))}function ut(){if(et){b("Submit pending \u2014 staying on this city (ignoring date reload hop)\u2026");return}R&&(Et(),R=!1,H=0,!(!L||W)&&(X(Date.now()),b("City Change \u2014 resuming; next city in 15\u201318s\u2026"),A()))}async function Jn(){let t=await dt();if(!t)return;let e=Date.now();if(e-Xi<6e4)return;Xi=e;let i=document.querySelector("#post_select")?.value;if(!i){b("Auto Submit ON \u2014 pick a city first.");return}let r=(await xt()).find(u=>String(u.ID)===String(i)),a=r?.Days;if(Array.isArray(a)&&a.length){let u=Qe(a,t.from,t.to);if(u.length){J();let d=ve(u.length),p=u[d].Date;b(`Auto Submit: picking date #${d+1} (${p.slice(0,10)})\u2026`),Qn(p),l.send({action:"selectFirstDate",date:p,maxMs:xe,pollMs:G});return}let f=Qe(a,"1970-01-01","2999-12-31");if(f.length){let d=f[0].Date;b(`Auto Submit ON \u2014 dates outside ${t.from} \u2192 ${t.to}; jumping calendar to ${d} (not booking).`),l.send({action:"selectFirstDate",date:d,navigateOnly:!0,maxMs:4e3,pollMs:G});return}b(`Auto Submit ON \u2014 no dates in your range on ${r.Name||"this city"} yet.`);return}b("Auto Submit ON \u2014 loading slots for current city\u2026"),l.send({action:"selectPost",postId:String(i)})}function po(){Xi=0}function ho(){Tt&&(l.clear(Tt),Tt=null)}function Sl(t,e){return t+Math.random()*(e-t)}function xl(){return Sl(ao(),cl())}function X(t=Date.now()){Y=t+xl()}function vl(t=Date.now()){let e=Pe(new Date(t));if(e>0)return e;if(Ft>t)return Ft-t;if(nt){let n=nt+ao()-t;if(n>0)return n}return Y>t?Y-t:0}function A(){if(!L)return;if(ho(),R||$e){Tt=l.setTimeout(()=>{Gi()},500);return}let t=Date.now(),e=Pe(new Date(t));if(e>0){Y>t&&(Y=t),e>=ji&&(kt=t),Tt=l.setTimeout(()=>{Gi()},e);return}let n=0;Ft>t&&(n=Math.max(n,Ft-t)),nt&&(n=Math.max(n,nt+ao()-t)),Y>t&&(n=Math.max(n,Y-t)),n=Math.max(0,n),n>=ji&&(kt=Date.now()),Tt=l.setTimeout(()=>{Gi()},n)}function Cl(t,e){if(!t.length)return null;if(t.length===1)return Ht=0,t[0];let n=t.findIndex(o=>String(o.id)===String(e));n<0&&(n=Math.max(0,Math.min(Ht,t.length-1)));let i=(n+1)%t.length;return Ht=i,t[i]}function Zn(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function go(t){return String(t||"").toLowerCase().replace(/\b(vac|ofc|consular|embassy|appointment)\b/g," ").replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim()}function Zi(t,e,n){if(!t)return null;let i=e.get(String(t.id));if(i)return i;let o=go(t.name);if(!o)return null;if(i=n.get(o)||null,i)return i;for(let[r,a]of n)if(r!==o&&(r.includes(o)||o.includes(r)))return a;return null}function on(t){let e=Zn();if(!e.length||!t?.length)return[];let n=new Map(e.map(a=>[String(a.id),a])),i=new Map;for(let a of e){let u=go(a.name);u&&!i.has(u)&&i.set(u,a)}let o=[],r=new Set;for(let a of t){let u=Zi(a,n,i);u&&(r.has(u.id)||(r.add(u.id),o.push({id:u.id,name:u.name})))}return o}function Ea(t,e){let n=Array.isArray(t)?t.filter(Boolean):[],i=Array.isArray(e)?e.filter(Boolean):[];if(!i.length)return n.map(g=>({id:String(g.id),name:g.name||g.id}));let o=document.querySelector(h(s.aiCities)),r=new Set(o?[...o.querySelectorAll('input[type="checkbox"]')].map(g=>String(g.value)):[]),a=Zn(),u=new Map(a.map(g=>[String(g.id),g])),f=new Map;for(let g of a){let w=go(g.name);w&&!f.has(w)&&f.set(w,g)}let d=[],p=new Set,y=g=>{if(!g)return;let w=a.length?Zi(g,u,f):null,S=String(w?.id||g.id);p.has(S)||(p.add(S),d.push({id:S,name:w?.name||g.name||g.id}))};for(let g of i)y(g);for(let g of n){let w=a.length?Zi(g,u,f):null,S=String(w?w.id:g.id);p.has(S)||p.has(String(g.id))||r.has(S)&&!i.some($=>String($.id)===S)||y(w||g)}return d}function Bt(){let t=document.querySelector(h(s.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function rn(){return{from:document.querySelector(h(s.aiFrom))?.value||null,to:document.querySelector(h(s.aiTo))?.value||null}}function Xe(t=[],{force:e=!1,selectedCities:n=null}={}){let i=document.querySelector(h(s.aiCities));if(!i)return;let o=Zn(),r=yl(o),a=document.querySelector(h(s.aiPanel)),u=a&&!a.classList.contains(c.hidden),f=bl();if(!e&&r===Ma&&i.querySelector('input[type="checkbox"]'))return;Ma=r;let d=n?.length?n:(t||[]).map(g=>({id:String(g),name:""})),p=d.length?on(d):[],y=new Set(u&&f.length&&!e&&!d.length?f:(p.length?p.map(g=>g.id):f).map(String));if(i.replaceChildren(),!o.length){i.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let g of o){let w=document.createElement("label"),S=document.createElement("input");S.type="checkbox",S.value=g.id,S.dataset.name=g.name,S.checked=y.has(g.id),w.append(S,document.createTextNode(g.name)),i.appendChild(w)}}function $l(t){let e=t?.cities||[];return e.length?e.map(n=>n.name||n.id).join(", "):"\u2014"}async function ht(t,e={}){let n=await _(t)||{},{cities:i,...o}=e,{from:r,to:a}=rn(),u=Bt(),f=Array.isArray(n.cities)?n.cities:[],d=document.querySelector(h(s.aiCities)),p=d?d.querySelectorAll('input[type="checkbox"]').length:0,y;if(i!==void 0){let w=Array.isArray(i)?i:[];!w.length&&!u.length?y=p>0?[]:f:y=Ea(f,w.length?w:u)}else u.length?y=Ea(f,u):y=f;let g={...n,from:r||n.from||null,to:a||n.to||null,cities:y.length?y:p>0&&i!==void 0&&!(i||[]).length?[]:n.cities||[],loginId:document.querySelector(h(s.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(h(s.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(w=>{let S=[s.aiQ1,s.aiQ2,s.aiQ3][w],$=[s.aiA1,s.aiA2,s.aiA3][w];return{q:document.querySelector(h(S))?.value?.trim()||n.security?.[w]?.q||"",a:document.querySelector(h($))?.value?.trim()||n.security?.[w]?.a||"",set:w+1}}),...o};return typeof g.submitEnabled=="boolean"&&(g.enabled=g.submitEnabled),g.serverUpdatedAt=Date.now(),await Ze(t,g),Tl(g),g}async function zi(){let t=await E();if(!t)return;let e=Bt(),n=await ht(t,{cities:e}),i=on(n.cities||e),o=i.map(f=>f.name||f.id).join(" \u2192 ")||"\u2014";if(!i.length){b("No preferred cities selected \u2014 tick cities anytime; hopping paused."),L&&ye();return}if(it=!0,we(n),!Mt(n)){b(`Preferred cities saved (${i.length}): ${o} \u2014 turn City Change ON to hop.`);return}if(ti(),!L){await an();return}let r=document.querySelector("#post_select"),a=r?String(r.value):"",u=i.findIndex(f=>String(f.id)===a);Ht=u>=0?u:Math.min(Ht,i.length-1),b(`Preferred cities updated (${i.length}): ${o} \u2014 City Change keeps running`),A()}var Bn=null,to=null;function Tl(t){Bn&&l.clear(Bn),Bn=l.setTimeout(()=>{Bn=null,wa(t).catch(()=>{})},400)}async function Ka(t){if(!t||to===t)return null;let e=await Sa();if(to=t,!e)return null;let n=await _(t)||{},i=ya(n,e);return i?(i.loginId=n.loginId||i.loginId||"",i.loginPass=n.loginPass||"",i.security=n.security||i.security||[],typeof i.submitEnabled=="boolean"&&(i.enabled=i.submitEnabled),await Ze(t,i),i):null}async function _l(t,e){if(et||!ce()||R||N)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let i=String(t);return String(n.value)===i?!1:(Ge=i,lo=Date.now(),fo(),nt=Date.now(),X(nt),b(`Switching city \u2192 ${e||t}\u2026`),Vn(),l.send({action:"selectPost",postId:i}),!0)}var Ot=0,eo=45e3;async function kl(t,e,{alertId:n,dayCount:i,bestDate:o}={}){if(W||k()||!At()||et)return!1;let r=document.querySelector("#post_select");if(!r||!t)return!1;let a=String(t),u=e||a;if(String(r.value)===a){Ot=Date.now()+eo,b(`City alert \u2014 already on ${u}`+(i?` (${i} dates`:"")+(o?`, best ${o}`:"")+(i?")":"")+" \u2014 holding for booking");try{Dn(2,90,60)}catch{}try{l.send({action:"focusScheduleTab"})}catch{}return J(),!0}Et(),ot(),R=!1,H=0,N=!1,Ut(),ct=!1,_t=0,Y=Date.now(),nt=0,Ft=0,Ge=a,lo=Date.now(),fo(),nt=Date.now(),Ot=Date.now()+eo,Vn(),b(`City alert \u2014 FAST switch \u2192 ${u}`+(i?` (${i} dates`:"")+(o?`, best ${o}`:"")+(i?")":"")+(n?` [#${n}]`:""));try{Dn(3,80,50)}catch{}try{l.send({action:"focusScheduleTab"})}catch{}return l.send({action:"selectPost",postId:a,force:!0}),J(),L&&A(),!0}var Jt=null,Un=!1,Ia="",Pa=0,Ml=50;function Al(){Jt&&(l.clear(Jt),Jt=null),Un=!1}async function Dl(){if(!(Un||!L||W)){Un=!0;try{let t=await ee();if(!t?.cities?.length)return;let e=document.querySelector("#post_select"),n=await ha({preferredCities:t.cities,citiesEnabled:!0,currentCityId:e?String(e.value):"",dateFrom:t.from||null,dateTo:t.to||null});if(!n?.alertId)return;if(n.alreadyThere){Fn(n.alertId),Ot=Math.max(Ot,Date.now()+eo),J(),b(`City alert \u2014 already on ${n.name||n.id}`+(n.dayCount?` (${n.dayCount} dates`:"")+(n.bestDate?`, best ${n.bestDate}`:"")+(n.dayCount?")":"")+" \u2014 holding for booking");return}let i=`${n.id}:${n.alertId}`,o=Date.now();if(i===Ia&&o-Pa<4e3){Fn(n.alertId);return}await kl(n.id,n.name,{alertId:n.alertId,dayCount:n.dayCount,bestDate:n.bestDate})&&(Ia=i,Pa=o,Fn(n.alertId))}catch{}finally{Un=!1}}}function za(){if(Jt||!L)return;let t=()=>{Jt=null,!(!L||W||!l.alive)&&Dl().finally(()=>{L&&!W&&l.alive&&(Jt=l.setTimeout(t,Ml))})};Jt=l.setTimeout(t,50)}function ti(){if(ka)return;let t=document.querySelector("#post_select");if(!t)return;ka=!0,Ki=String(t.value||"");let e=()=>{let n=document.querySelector("#post_select");if(!n)return;let i=String(n.value||"");!i||i===Ki||(Ki=i,El(i,n))};l.on(t,"change",e),l.setInterval(e,400)}function El(t,e){if(!L||W||!l.alive||et)return;let n=String(t||"");if(!n)return;let i=Ge&&n===Ge&&Date.now()-lo<2500;i&&(Ge=""),Et(),R=!1,H=0,Ut(),Vn(),nt=Date.now(),fo(),X(nt),ee().then(r=>{if(!r?.cities?.length)return;let u=on(r.cities).findIndex(f=>String(f.id)===n);u>=0&&(Ht=u)}).catch(()=>{});let o=e?.selectedOptions&&e.selectedOptions[0]?.textContent?.trim()||e?.options?.[e.selectedIndex]?.textContent?.trim()||n;b(i?`City Change \u2014 on ${o}; waiting for dates\u2026`:`City Change \u2014 you switched \u2192 ${o}; waiting (same as system hop)\u2026`),A()}async function Gi(){if(!(ct||!L)){ct=!0,_t=Date.now(),kt=Date.now(),Tt=null;try{if(W||k()||!l.alive){ye();return}if(Xn()){Y=Date.now(),b(ce()?"City Change \u2014 auto-unstuck; hopping now\u2026":`City Change \u2014 auto-unstuck; waiting IST ${ft()}\u2026`),A();return}if(R||N){let y=H?Date.now()-H:0;if(R&&y>=Ye()){Et(),R=!1,H=0,X(Date.now()),b("City Change \u2014 hold expired; next city in 15\u201318s\u2026"),A();return}let g=Math.max(0,Ye()-y);b(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(g/1e3)}s`),A();return}let t=Date.now();if(Ot>t){let y=Math.ceil((Ot-t)/1e3);b(`City alert hold \u2014 staying for booking\u2026 (${y}s)`),A();return}let e=ce(new Date(t)),n=Pe(new Date(t));if(!e){b(`City Change \u2014 waiting for slot window (IST ${ft()}, next in ${ki(n)})`),A();return}if($e){let y=mt?t-mt:0;if(Ji()){if(y>=Ct()){ot(),X(Date.now()),b(`City Change \u2014 still Loading after ${Ct()/1e3}s; changing city\u2026`),A();return}let S=Math.max(0,Math.ceil((Ct()-y)/1e3));b(`City Change \u2014 Date Loading\u2026 stay (${S}s then hop if still Loading)`),A();return}let g=Ot>t?Math.max(Vt(),Ot-(mt||t)):Vt();if(y>=g){ot(),X(Date.now()),b(`City Change \u2014 calendar up but no dates after ${Math.round(g/1e3)}s; changing city\u2026`),A();return}let w=Math.max(0,Math.ceil((Vt()-y)/1e3));b(`City Change \u2014 waiting calendar dates\u2026 (${w}s then hop)`),A();return}let i=vl(t);if(i>0){let y=Math.ceil(i/1e3);b(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,y)}s`),A();return}let o=await ee();if(!o?.cities?.length){ye();return}let r=new Set(Zn().map(y=>y.id)),a=on(o.cities);if(!a.length){b("Preferred cities not found in the dropdown \u2014 pick cities again."),ye();return}a.length<(o.cities?.length||0)&&b(`City Change \u2014 using ${a.length}/${o.cities.length} preferred (some ids remapped/missing in dropdown): ${a.map(y=>y.name||y.id).join(" \u2192 ")}`);let u=document.querySelector("#post_select"),f=u?String(u.value):"",d=Cl(a,f);if(!d){X(t),A();return}if(await _l(d.id,d.name)){nt=Date.now(),X(nt);let y=a.map(w=>w.name||w.id).join(" \u2192 "),g=`${Ht+1}/${a.length}`;b(`City Change \u2014 ${g} ${d.name||d.id} (path: ${y}); Loading up to ${Ct()/1e3}s, no-dates hop ${Vt()/1e3}s`)}else X(t);A()}finally{ct=!1,_t=0}}}async function an(){if(W||k()||!At())return;let t=await ee();if(!t?.cities?.length)return;let e=on(t.cities);if(!e.length){b("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}Et(),ot(),R=!1,H=0,N=!1,ct=!1,_t=0,L=!0,kt=Date.now(),Y=Date.now();let n=document.querySelector("#post_select"),i=n?String(n.value):"",o=e.findIndex(a=>String(a.id)===i);Ht=o>=0?o:0;let r=e.map(a=>a.name||a.id).join(" \u2192 ");b(`City Change ON \u2014 ${e.length} cities (${r}); IST ${ft()}; hop 15\u201318s`),Ba(),za(),A()}async function Ga(){if(W||k()||!At()||!l.alive||!(await ee())?.cities?.length||!document.querySelector("#post_select"))return;if(!L){await an();return}let e=Xn();Ba(),za(),(e||!Tt&&!ct)&&(e&&(X(Date.now()),b("City Change \u2014 auto-unstuck; next city in 15\u201318s\u2026")),A())}function yo(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function Kn(){let t=yo();return!!(t&&!t.disabled)}function Il(t){if(!t||t.disabled)return!1;try{let e=t.form||t.closest?.("form");if(e&&typeof e.requestSubmit=="function")return e.requestSubmit(t),!0}catch{}try{return t.click(),!0}catch{}try{return t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click(),!0}catch{}return!1}function bo(){let t=yo();if(!t||t.disabled)return!1;let e=Il(t);return l.send({action:"forceClickSubmit",prefix:m,pollMs:G,maxMs:Math.min(1500,je)}),e}function Pl(){return Q()?Kn():!1}function wo(t){let e=Date.now()+Math.max(0,Number(t)||0);return Q()&&Kn()?Promise.resolve(!0):new Promise(n=>{let i=!1,o=null,r=null,a=f=>{if(!i){i=!0;try{r?.disconnect()}catch{}o&&l.clear(o),n(!!f)}},u=()=>{if(!l.alive||Ce()||k())return a(!1);if(Q()&&Kn())return a(!0);if(Date.now()>=e)return a(Q()&&Kn())};try{r=new MutationObserver(u);let f=yo();f&&r.observe(f,{attributes:!0,attributeFilter:["disabled","class","aria-disabled"]});let d=f?.form||f?.closest?.("form")||document.querySelector("#page_form, form");d?r.observe(d,{attributes:!0,attributeFilter:["disabled","class"],childList:!0,subtree:!0}):r.observe(document.documentElement,{attributes:!0,attributeFilter:["disabled"],childList:!0,subtree:!0})}catch{r=null}o=l.setInterval(u,G),u()})}function ja(){b("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function So(t){if(W||k()||N)return;let e=await _(t);if(!Dt(e))return;J(),N=!0,Be();let n=Date.now(),i=!1,o=!1,r=async f=>{if(!(i||!N||!l.alive)){if(i=!0,window.removeEventListener("message",a),$t&&(l.clear($t),$t=null),k()){N=!1;return}if(N=!1,f){await tn(t);return}ut(),b(L?"Auto Submit \u2014 Submit not clicked in time; City Change resuming\u2026":"Auto Submit \u2014 Submit not clicked in time; still watching\u2026")}},a=f=>{!l.alive||f.source!==window||f.data?.action===Pt.sub&&r(!0)};window.addEventListener("message",a);let u=async()=>{if(i||!N||!l.alive||o)return;let f=Date.now()-n;if(Pl()){o=!0,b("Submit enabled \u2014 clicking\u2026"),bo();return}if(f>=je)return r(!1);b("Waiting for Submit to enable\u2026"),$t=l.setTimeout(u,G)};wo(je).then(f=>{i||!N||!l.alive||o||f&&u()}),u()}async function Ya(){if(!Q()||N||W)return;let t=await dt();t&&await So(t.accountId)}function b(t){let e=document.querySelector(h(s.aiStatus));e&&(e.textContent=t)}function I(t){b(t)}function La(t){return!!(t&&t.termsAgreed)}function Va(t){return!!(t&&t.termsPassed)}function jn(){return!!document.querySelector(h(s.aiTermsAgree))?.checked}function xo(t){let e=document.querySelector(h(s.aiTermsGate)),n=document.querySelector(h(s.aiMain)),i=document.querySelector(h(s.aiTermsAgree)),o=document.querySelector(h(s.aiTermsContinue)),r=Va(t);e&&e.classList.toggle(c.hidden,r),n&&n.classList.toggle(c.hidden,!r),i&&(i.checked=La(t)||jn()),o&&(o.disabled=!(La(t)||jn()))}function Ll(){let t=document.querySelector(h(s.aiTermsContinue)),e=jn();t&&(t.disabled=!e),b(e?"Terms checked \u2014 tap Continue.":"Check Agree to continue.")}async function ql(){if(!jn()){b("Check Agree first.");return}let t=await E();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=await _(t)||{},{from:n,to:i}=rn(),o=Bt(),r=ei();gt(),Ut(),po(),st=!0,it=!0,await ht(t,{termsAgreed:!0,termsPassed:!0,termsAgreedAt:e.termsAgreedAt||Date.now(),submitEnabled:!0,citiesEnabled:!0,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],slotWindows:r.length?r:e.slotWindows||null,confirmedAt:Date.now()}),await rt(),lt(document.querySelector(h(s.aiSubmitSw)),!0),lt(document.querySelector(h(s.aiCitiesSw)),!0),st=!0,it=!0,we(await _(t)),Xe((e.cities||[]).map(u=>u.id),{force:!0,selectedCities:e.cities||[]}),vo(e),xo(await _(t)),(Bt().length?Bt():e.cities||[]).length&&(ti(),await an()),(n||e.from)&&(i||e.to)&&await Jn(),b("Auto Submit and City Change ON \u2014 set dates and preferred cities.")}function Qa(t){t?.slotWindows?.length?Cr(t.slotWindows):_i()}function Rl(t){let e="";for(let n=0;n<=59;n++){let i=Number(t)===n?" selected":"";e+=`<option value="${n}"${i}>:${String(n).padStart(2,"0")}</option>`}return e}function qa(t,e){let n=Math.min(qt,59-Number(t||0)),i="";for(let o=1;o<=Math.max(1,n);o++){let r=Number(e)===o?" selected":"";i+=`<option value="${o}"${r}>${o} min</option>`}return i}function Xa(t,e){let n=Number(t)||0,i=Number(e)||1,o=Math.min(59,n+i);return`Runs from :${String(n).padStart(2,"0")} up to :${String(o).padStart(2,"0")}`}function ei(){let t=document.querySelector(h(s.aiWinList));if(!t)return[];let e=[];for(let n of t.querySelectorAll(`.${c.aiWinRow}`)){let i=Number(n.querySelector('select[data-win="from"]')?.value),o=Number(n.querySelector('select[data-win="dur"]')?.value);!Number.isFinite(i)||!Number.isFinite(o)||e.push({fromMin:i,durationMin:o})}return Ti(e)}function Ra(t){let e=t.querySelector('select[data-win="from"]'),n=t.querySelector('select[data-win="dur"]'),i=t.querySelector(`.${c.aiWinHelp}`);!e||!n||!i||(i.textContent=Xa(e.value,n.value))}function Ja(t=0,e=6){let n=Math.min(qt,59-t),i=Math.min(Math.max(1,e||1),Math.max(1,n)),o=document.createElement("div");o.className=c.aiWinRow,o.innerHTML=`
    <div class="${c.aiInline}">
      <label class="${c.aiHead}">Start</label>
      <select data-win="from">${Rl(t)}</select>
      <label class="${c.aiHead}" style="margin-left:10px;color:#6b7280;font-weight:500">Duration</label>
      <select data-win="dur">${qa(t,i)}</select>
      <button type="button" class="${c.aiTrash}" data-win="del" title="Delete timing" aria-label="Delete">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
        </svg>
      </button>
    </div>
    <div class="${c.aiWinHelp}">${Xa(t,i)}</div>
  `;let r=o.querySelector('select[data-win="from"]'),a=o.querySelector('select[data-win="dur"]');return l.on(r,"change",()=>{let u=Number(r.value),f=Number(a.value)||1;a.innerHTML=qa(u,f),Ra(o)}),l.on(a,"change",()=>Ra(o)),l.on(o.querySelector('button[data-win="del"]'),"click",()=>{o.remove(),Co()}),o}function vo(t){let e=document.querySelector(h(s.aiWinList));if(!e)return;e.replaceChildren();let n=t?.slotWindows?.length?$r(t.slotWindows):[];for(let i of n.slice(0,vt))e.appendChild(Ja(i.fromMin,i.durationMin));Co(t)}function Co(t){let e=document.querySelector(h(s.aiWinNote));e&&(t?.slotWindows?.length||ei().length?e.textContent=`Custom windows active (max ${vt}, each \u2264 ${qt} min).`:e.textContent=`Using defaults: ${ft()}. Add up to ${vt} windows below.`)}function lt(t,e){t&&(t.classList.toggle(c.aiOnBtn,!!e),t.setAttribute("aria-checked",e?"true":"false"))}function Ol(t){lt(document.querySelector(h(s.aiSubmitSw)),Dt(t)),lt(document.querySelector(h(s.aiCitiesSw)),Mt(t))}var st=!1,it=!1;function we(t){let e=Dt(t)||st,n=Mt(t)||it,i=document.querySelector(h(s.aiSubmitBody)),o=document.querySelector(h(s.aiCitiesBody));i&&i.classList.toggle(c.hidden,!e),o&&o.classList.toggle(c.hidden,!n)}function Nl(t,e){let n=document.querySelector(h(s.aiStatus)),i=document.querySelector(h(s.aiBtn));if(!n||!i)return;Ol(t),we(t);let o=Dt(t),r=Mt(t),a=o||r;a?(i.classList.add(c.aiOn),i.textContent="Tik Tik ON"):(i.classList.remove(c.aiOn),i.textContent="Tik Tik");let u=[];o&&t.from&&t.to?u.push(`Auto Submit ON (${Zt(t.from)} \u2013 ${Zt(t.to)}, clicks Submit as soon as time slot is ready)`):st&&!o?u.push("Auto Submit \u2014 set From / To dates, then Enable again"):u.push("Auto Submit OFF"),r?u.push(`City Change ON (${$l(t)}, ${ft()})`):it&&!r?u.push("City Change \u2014 pick preferred cities, then Enable again"):u.push("City Change OFF"),n.textContent=`Account ${e||"\u2014"}: ${u.join(" \xB7 ")}`,n.classList.toggle(c.aiOk,a)}async function rt(){let t=await E();if(t)try{await Ka(t)}catch{}let e=t?await _(t):null;Dt(e)||(st=!1),Mt(e)?it=!0:it=!1,Qa(e),Nl(e,t),xo(e);let n=document.querySelector(h(s.aiFrom)),i=document.querySelector(h(s.aiTo));n&&(n.value=e?.from||""),i&&(i.value=e?.to||""),so();let o=(e?.cities||[]).map(w=>w.id),r=document.querySelector(h(s.aiCitiesBody));(r&&!r.classList.contains(c.hidden)||Mt(e)||it)&&Xe(o,{selectedCities:e?.cities||[]}),vo(e);let u=Za(e),f=document.querySelector(h(s.aiLogin)),d=document.querySelector(h(s.aiPass));f&&(u?.loginId||e?.loginId)&&(f.value=u?.loginId||e.loginId||""),d&&(u?.loginPass||e?.loginPass)&&(d.value=u?.loginPass||e.loginPass||"");let p=u?.security||e?.security||[],y=[s.aiQ1,s.aiQ2,s.aiQ3],g=[s.aiA1,s.aiA2,s.aiA3];y.forEach((w,S)=>{let $=document.querySelector(h(w));$&&($.innerHTML=ze(S,p[S]?.q||""))}),g.forEach((w,S)=>{let $=document.querySelector(h(w));$&&p[S]?.a&&($.value=p[S].a)}),$o(e),Se||cn(!1)}function Wl(){let t=document.querySelector(h(s.aiPanel));return!!(t&&!t.classList.contains(c.hidden))}function no(t){let e=document.querySelector(h(s.aiPanel));e&&(t||Wt(),e.classList.toggle(c.hidden,!t),t&&E().then(async n=>{if(n)try{to=null,await Ka(n)}catch{}let i=n?await _(n):null;xo(i),Va(i)?Xe((i?.cities||[]).map(o=>o.id),{force:!0,selectedCities:i?.cities||[]}):b("Read the terms, check Agree, then Continue.")}))}function io(){if(io._done)return;io._done=!0;let t=e=>{if(!Wl())return;let n=document.querySelector(h(s.aiPanel)),i=document.querySelector(h(s.aiBtn)),o=document.querySelector(h(s.aiCal)),r=co(e);if(!(o&&!o.classList.contains(c.hidden)&&r&&o.contains(r))){if(o&&!o.classList.contains(c.hidden)){let a=document.querySelector(h(s.aiFromBtn)),u=document.querySelector(h(s.aiToBtn));!(a&&r&&(a===r||a.contains(r)))&&!(u&&r&&(u===r||u.contains(r)))&&Wt()}n&&r&&(n===r||n.contains(r))||i&&r&&(i===r||i.contains(r))||(Wt(),no(!1))}};l.on(document,"pointerdown",t,{capture:!0})}async function Hl(t){let e=await E();if(!e){b("Open a logged-in schedule page so we can bind this to your account.");return}let n=await _(e)||{},{from:i,to:o}=rn();if(i=i||n.from||null,o=o||n.to||null,t){st=!0,lt(document.querySelector(h(s.aiSubmitSw)),!0),gt(),Ut(),po(),await ht(e,{submitEnabled:!0,from:i||null,to:o||null,confirmedAt:Date.now()});let r=document.querySelector(h(s.aiFrom)),a=document.querySelector(h(s.aiTo));if(r&&i&&(r.value=i),a&&o&&(a.value=o),so(),await rt(),lt(document.querySelector(h(s.aiSubmitSw)),!0),st=!0,we(await _(e)),!i||!o){b("Auto Submit ON \u2014 select From and To dates to start booking.");return}if(i>o){b("Auto Submit ON \u2014 From date must be before To date.");return}st=!1,b(`Auto Submit ON (${Zt(i)} \u2013 ${Zt(o)})`),await Jn();return}st=!1,Ut(),lt(document.querySelector(h(s.aiSubmitSw)),!1),await ht(e,{submitEnabled:!1,from:i||n.from,to:o||n.to}),await rt(),b("Auto Submit OFF")}async function Fl(t){let e=await E();if(!e){b("Open a logged-in schedule page so we can bind this to your account.");return}let n=await _(e)||{};if(t){it=!0,lt(document.querySelector(h(s.aiCitiesSw)),!0),Xe((n.cities||[]).map(a=>a.id),{force:!0,selectedCities:n.cities||[]}),vo(n);let o=Bt();!o.length&&n.cities?.length&&(o=n.cities);let r=ei();if(gt(),await ht(e,{citiesEnabled:!0,...o.length?{cities:o}:{},slotWindows:r.length?r:n.slotWindows||null}),await rt(),lt(document.querySelector(h(s.aiCitiesSw)),!0),it=!0,we(await _(e)),o.length||Xe([],{force:!0}),!o.length){b("City Change ON \u2014 select at least one preferred city to start hopping.");return}it=!0,we(await _(e)),ti(),await an(),b(`City Change ON (${o.map(a=>a.name||a.id).join(", ")}) \u2014 edit cities anytime`);return}it=!1,ye(),lt(document.querySelector(h(s.aiCitiesSw)),!1);let i=Bt();await ht(e,{citiesEnabled:!1,cities:i.length?i:n.cities||[]}),await rt(),b("City Change OFF")}async function Oa(){let t=await E();if(!t)return;let e=await _(t)||{};if(!Dt(e)&&!st)return;let{from:n,to:i}=rn();!n||!i||n>i||(await ht(t,{submitEnabled:!0,from:n,to:i,confirmedAt:Date.now()}),st=!1,await rt(),lt(document.querySelector(h(s.aiSubmitSw)),!0),gt(),po(),b(`Auto Submit ON (${Zt(n)} \u2013 ${Zt(i)})`),await Jn())}function Bl(t){return(t||[]).map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", ")}async function Ul(){let t=document.querySelector(h(s.aiWinList));if(t){if(t.querySelectorAll(`.${c.aiWinRow}`).length>=vt){b(`Max ${vt} timing windows.`);return}t.appendChild(Ja(0,Math.min(6,qt))),Co()}}async function Kl(){let t=await E();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=ei();if(!e.length){b("Add at least one timing (or Reset to defaults).");return}await ht(t,{slotWindows:e}),await rt(),b(`Saved ${e.length} custom timing(s): ${Bl(e)}`)}async function zl(){let t=await E();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}window.confirm("Reset to default IST windows? Your custom timings will be removed.")&&(await ht(t,{slotWindows:null}),_i(),await rt(),b(`Using default windows: ${ft()}`))}var Se=null;function oo(){return`lp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`}function Na(t){if(!t||String(t).length<10)return"\u2014";try{return new Date(`${String(t).slice(0,10)}T12:00:00`).toLocaleDateString("en-US",{month:"short",day:"numeric"})}catch{return String(t).slice(0,10)}}function sn(t){let e=Array.isArray(t?.loginProfiles)?t.loginProfiles.filter(Boolean):[];return e.length?e.map(n=>({id:String(n.id||oo()),loginId:String(n.loginId||"").trim(),loginPass:String(n.loginPass||""),security:Array.isArray(n.security)?n.security:[],from:n.from||null,to:n.to||null,cities:Array.isArray(n.cities)?n.cities:[],visa:n.visa||""})):t?.loginId&&t?.loginPass?[{id:t.activeLoginProfileId||oo(),loginId:String(t.loginId).trim(),loginPass:String(t.loginPass),security:Array.isArray(t.security)?t.security:[],from:t.from||null,to:t.to||null,cities:Array.isArray(t.cities)?t.cities:[],visa:""}]:[]}function Za(t){let e=sn(t);if(!e.length)return null;let n=t?.activeLoginProfileId;return e.find(i=>String(i.id)===String(n))||e[0]}function Gl(t){let n=(t?.cities||[]).map(o=>o.name||o.id).filter(Boolean)[0]||"\u2014",i=String(t?.visa||"").trim();return i?`${n} (${i})`:n}function jl(t){return`${Na(t?.from)} \u2192 ${Na(t?.to)}`}function ts(t){let e=document.querySelector(h(s.aiLogin)),n=document.querySelector(h(s.aiPass));e&&(e.value=t?.loginId||""),n&&(n.value=t?.loginPass||"");let i=t?.security||[];[s.aiQ1,s.aiQ2,s.aiQ3].forEach((o,r)=>{let a=document.querySelector(h(o));a&&(a.innerHTML=ze(r,i[r]?.q||""))}),[s.aiA1,s.aiA2,s.aiA3].forEach((o,r)=>{let a=document.querySelector(h(o));a&&(a.value=i[r]?.a||"")})}function Yl(){ts(null)}function cn(t,e){let n=document.querySelector(h(s.aiLoginBody)),i=document.querySelector(h(s.aiLoginEditorTitle));n&&n.classList.toggle(c.hidden,!t),i&&(i.textContent=e||(t?"Edit profile":""))}function $o(t){let e=document.querySelector(h(s.aiProfilesList));if(!e)return;let n=sn(t),i=Za(t)?.id||null;if(e.replaceChildren(),!n.length){let o=document.createElement("p");o.className=c.aiQlEmpty,o.textContent="No profiles yet. Add one for faster Home login.",e.appendChild(o);return}for(let o of n){let r=document.createElement("div");r.className=c.aiQlCard,r.dataset.profileId=o.id;let a=document.createElement("div");a.className=c.aiQlMeta;let u=document.createElement("strong");u.textContent=o.loginId||"Untitled";let f=document.createElement("span");f.textContent=Gl(o);let d=document.createElement("span");d.textContent=jl(o);let p=document.createElement("button");if(p.type="button",p.className=c.aiQlEdit,p.textContent="Edit",p.dataset.editProfile=o.id,a.append(u,f,d,p),r.appendChild(a),String(o.id)===String(i)){let y=document.createElement("span");y.className=c.aiQlBadge,y.textContent="Active Profile",r.appendChild(y)}else{let y=document.createElement("button");y.type="button",y.className=c.aiQlEdit,y.style.marginTop="2px",y.textContent="Use",y.dataset.activateProfile=o.id,r.appendChild(y)}e.appendChild(r)}}async function Vl(t){let e=await E();if(!e)return;let n=await _(e)||{},i=sn(n),o=i.find(a=>String(a.id)===String(t));if(!o)return;await Ze(e,{...n,loginProfiles:i,activeLoginProfileId:o.id,loginId:o.loginId,loginPass:o.loginPass,security:o.security,serverUpdatedAt:Date.now()});let r=await _(e);$o(r),b(`Active login profile: ${o.loginId}`)}async function Ql(){Se=null,Yl(),cn(!0,"Add Quick Login Profile"),b("Enter ID, password, and 3 security answers, then Save.")}async function Xl(t){let e=await E(),n=e?await _(e):null,i=sn(n).find(o=>String(o.id)===String(t));i&&(Se=i.id,ts(i),cn(!0,`Edit \u2014 ${i.loginId}`))}function Jl(){Se=null,cn(!1),b("Profile editor closed.")}async function Zl(){let t=await E();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=await _(t)||{},{from:n,to:i}=rn(),o=Bt(),r=document.querySelector(h(s.aiLogin))?.value?.trim(),a=document.querySelector(h(s.aiPass))?.value,u=[0,1,2].map(S=>({q:document.querySelector(h([s.aiQ1,s.aiQ2,s.aiQ3][S]))?.value?.trim()||"",a:document.querySelector(h([s.aiA1,s.aiA2,s.aiA3][S]))?.value?.trim()||"",set:S+1}));if(!r||!a){b("Enter ID and password before saving.");return}if(u.some(S=>!S.q||!S.a)){b("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}let f="";try{let S=await z();f=String(S?.visa||"").trim()}catch{}let d=sn(e),p=Se||oo(),y={id:p,loginId:r,loginPass:a,security:u,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],visa:f},g=d.findIndex(S=>String(S.id)===String(p));g>=0?d[g]=y:d.push(y),await ht(t,{loginProfiles:d,activeLoginProfileId:p,loginId:r,loginPass:a,security:u});let w=await _(t)||{};await Ze(t,{...w,loginProfiles:d,activeLoginProfileId:p,loginId:r,loginPass:a,security:u,serverUpdatedAt:Date.now()}),Se=null,cn(!1),$o(await _(t)),b(`Quick Login profile saved \u2014 Active: ${r}`)}function tu(t){let e=t.target;if(!e||!e.closest)return;let n=e.closest("[data-edit-profile]");if(n){t.preventDefault(),Xl(n.getAttribute("data-edit-profile"));return}let i=e.closest("[data-activate-profile]");i&&(t.preventDefault(),Vl(i.getAttribute("data-activate-profile")))}function To(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==s.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==s.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===s.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function ro(){document.querySelector(h(s.aiPanel))?.remove(),document.querySelector(h(s.aiBtn))?.remove(),To()}function eu(){if(k())return;if(!At()){ro();return}if(document.querySelector(h(s.aiBtn)))if(!document.querySelector(h(s.aiSubmitSw))||!document.querySelector(h(s.aiTermsContinue))||!document.querySelector(h(s.aiFromBtn))||!document.querySelector(h(s.aiProfiles)))ro();else return;let t=Ir();if(!t)return;let e=document.createElement("button");e.id=s.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[P.mark]="",l.on(e,"click",i=>{i.stopPropagation();let o=document.querySelector(h(s.aiPanel)),r=o&&o.classList.contains(c.hidden);no(!!r)}),t.appendChild(e);let n=document.createElement("div");n.id=s.aiPanel,n.className=c.hidden,n.dataset[P.mark]="",n.innerHTML=`
    <div id="${s.aiTermsGate}">
      <div id="${s.aiTerms}" class="${c.aiTerms}">
        <div class="${c.aiHead}">Terms &amp; Conditions</div>
        <div class="${c.aiHint}">Please read carefully before continuing.</div>
        <ul class="${c.aiTermsList}">
          <li>Options apply to this applicant only. They do not bypass CAPTCHAs, waiting rooms, or portal security.</li>
          <li>During your windows, City Change hops every 15\u201318s. Max ${vt} windows, each up to ${qt} minutes.</li>
          <li>Checking too fast may trigger <b>1015 Rate Limit</b> errors.</li>
        </ul>
        <label class="${c.aiTermsCb}">
          <input type="checkbox" id="${s.aiTermsAgree}" />
          <span>I have read and agree to these terms.</span>
        </label>
        <button type="button" id="${s.aiTermsContinue}" class="${c.aiContinue}" disabled>Continue</button>
      </div>
    </div>
    <div id="${s.aiMain}" class="${c.hidden}">
      <div class="${c.aiSec}">
        <div class="${c.aiRow}" style="justify-content:space-between;margin-bottom:4px">
          <div>
            <div class="${c.aiHead}" style="font-size:17px">Auto Submit</div>
            <div class="${c.aiHint}" style="margin:2px 0 0">Book only dates in your From\u2013To range. Out of range \u2192 jump calendar, no book.</div>
          </div>
          <button type="button" id="${s.aiSubmitSw}" class="${c.aiSwitch}" role="switch" aria-checked="false" aria-label="Auto Submit">
            <span class="${c.aiKnob}"></span>
          </button>
        </div>
        <div id="${s.aiSubmitBody}" class="${c.hidden}">
          <div class="${c.aiRow}" style="margin-top:10px">
            <label>From
              <button type="button" id="${s.aiFromBtn}" class="${c.aiDateBtn}">Select date</button>
              <input type="hidden" id="${s.aiFrom}" />
            </label>
            <label>To
              <button type="button" id="${s.aiToBtn}" class="${c.aiDateBtn}">Select date</button>
              <input type="hidden" id="${s.aiTo}" />
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
          <button type="button" id="${s.aiCitiesSw}" class="${c.aiSwitch}" role="switch" aria-checked="false" aria-label="City Change">
            <span class="${c.aiKnob}"></span>
          </button>
        </div>
        <div id="${s.aiCitiesBody}" class="${c.hidden}">
          <div class="${c.aiHint}" style="margin:10px 0 4px;font-weight:600;color:#111827">
            Preferred cities
            <button type="button" id="${s.aiCitiesAll}" class="${c.aiCityAct}">Select all</button>
            <button type="button" id="${s.aiCitiesNone}" class="${c.aiCityAct}">Clear</button>
          </div>
          <div id="${s.aiCities}" class="${c.aiCities}"></div>
          <div class="${c.aiHead}" style="font-size:16px;margin:14px 0 8px">Release Window Checks</div>
          <p id="${s.aiWinNote}" class="${c.aiHint}"></p>
          <div id="${s.aiWinList}"></div>
          <div class="${c.aiRow}" style="margin-top:8px">
            <button type="button" id="${s.aiWinAdd}">+ Add timing</button>
            <button type="button" id="${s.aiWinSave}">Save timings</button>
            <button type="button" id="${s.aiWinReset}">Reset defaults</button>
          </div>
        </div>
      </div>
      <div class="${c.aiSec}">
        <div id="${s.aiProfiles}" class="${c.aiQl}">
          <div class="${c.aiQlTitle}">Quick Login Profiles</div>
          <p class="${c.aiQlSub}">Active Profile is used for quick login to the visa portal.</p>
          <div id="${s.aiProfilesList}"></div>
          <button type="button" id="${s.aiAddProfile}" class="${c.aiQlAdd}">+ Add Profile</button>
        </div>
        <div id="${s.aiLoginBody}" class="${c.hidden}" style="margin-top:10px">
          <div id="${s.aiLoginEditorTitle}" class="${c.aiHead}" style="font-size:15px;margin:0 0 8px">Add Quick Login Profile</div>
          <div class="${c.aiHint}" style="margin:0 0 8px">Saved on this computer only. Used for auto-login on Home when logged out.</div>
          <div class="${c.aiRow}">
            <label>ID / email <input type="email" id="${s.aiLogin}" autocomplete="off" /></label>
            <label>Password <input type="password" id="${s.aiPass}" autocomplete="off" /></label>
          </div>
          <div class="${c.aiHint}" style="margin:0 0 6px">
            3 sets \xD7 5 questions. Pick <b>1 question from each set</b>, then type <b>your answer</b> for that question.
          </div>
          <div class="${c.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 1 \u2014 choose 1 question
              <select id="${s.aiQ1}">${ze(0)}</select>
            </label>
            <label>Your answer for set 1
              <input type="text" id="${s.aiA1}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${c.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 2 \u2014 choose 1 question
              <select id="${s.aiQ2}">${ze(1)}</select>
            </label>
            <label>Your answer for set 2
              <input type="text" id="${s.aiA2}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${c.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 3 \u2014 choose 1 question
              <select id="${s.aiQ3}">${ze(2)}</select>
            </label>
            <label>Your answer for set 3
              <input type="text" id="${s.aiA3}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${c.aiRow}">
            <button type="button" id="${s.aiSaveLogin}">Save profile</button>
            <button type="button" id="${s.aiLoginCancel}">Cancel</button>
          </div>
        </div>
        <div class="${c.aiRow}" style="margin-top:10px">
          <button type="button" id="${s.aiClose}">Close</button>
        </div>
      </div>
    </div>
    <div id="${s.aiStatus}" class="${c.aiHint}" style="margin-top:10px"></div>
  `,t.insertAdjacentElement("afterend",n),l.on(n.querySelector(h(s.aiSubmitSw)),"click",async()=>{let i=await E(),o=i?await _(i):null;await Hl(!Dt(o))}),l.on(n.querySelector(h(s.aiCitiesSw)),"click",async()=>{let i=await E(),o=i?await _(i):null;await Fl(!Mt(o))}),l.on(n.querySelector(h(s.aiWinAdd)),"click",Ul),l.on(n.querySelector(h(s.aiWinSave)),"click",Kl),l.on(n.querySelector(h(s.aiWinReset)),"click",zl),l.on(n.querySelector(h(s.aiSaveLogin)),"click",Zl),l.on(n.querySelector(h(s.aiLoginCancel)),"click",Jl),l.on(n.querySelector(h(s.aiAddProfile)),"click",Ql),l.on(n.querySelector(h(s.aiProfilesList)),"click",tu),l.on(n.querySelector(h(s.aiClose)),"click",()=>no(!1)),l.on(n.querySelector(h(s.aiCitiesAll)),"click",()=>{Da(!0),zi()}),l.on(n.querySelector(h(s.aiCitiesNone)),"click",()=>{Da(!1),zi()}),l.on(n.querySelector(h(s.aiCities)),"change",i=>{i.target&&i.target.type==="checkbox"&&zi()}),l.on(n.querySelector(h(s.aiTermsAgree)),"change",()=>{Ll()}),l.on(n.querySelector(h(s.aiTermsContinue)),"click",()=>{ql()}),l.on(n.querySelector(h(s.aiFromBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(h(s.aiCal));if(o&&!o.classList.contains(c.hidden)&&tt.which==="from"){Wt();return}Ca("from",i.currentTarget)}),l.on(n.querySelector(h(s.aiToBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(h(s.aiCal));if(o&&!o.classList.contains(c.hidden)&&tt.which==="to"){Wt();return}Ca("to",i.currentTarget)}),io(),rt()}function nu(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",l.on(e,"click",()=>{E().then(n=>{tn(n||null)})}))};t(document.querySelector("#submitbtn")),l.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function _o(){if(l.alive&&!k()){if(!At()){ro();return}await l.waitFor("#post_select",{attempts:bn})&&(ua(t=>{let e=String(t?.message||t?.source||"error").slice(0,120);Ve(e)}),eu(),ti(),nu(),!Aa&&(Aa=!0,l.setTimeout(()=>rt(),800),l.setTimeout(async()=>{await dt()&&await Jn()},1500)))}}var es=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function ns(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function iu(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=ns(t.data.url),i=new URLSearchParams(t.data.request||"").get("parameters");if(!i)return null;let o;try{o=JSON.parse(i)}catch{return null}return{params:o,tail:e,response:t.data.response}}async function ou(t,e={}){t?.length&&(await Qr(t,e),await C("audioAlert")&&Or())}async function ru(t,e=!1){if(e||k())return null;let n=new Date;n.setHours(0,0,0,0);let i=(t||[]).map(a=>{if(!a)return null;let u=ii(a.Date);return u?{...a,Date:u}:null}).filter(Boolean).filter(a=>{let[u,f,d]=a.Date.slice(0,10).split("-").map(Number);return!u||!f||!d?!1:new Date(u,f-1,d)>=n}).sort((a,u)=>String(a.Date).localeCompare(String(u.Date))),o=await nn();if(o){let a=i.filter(d=>te(d.Date,o.from,o.to));if(!a.length||!(o.submitArmed||!!await C("autoSelectFirstDate")))return null;let f=ve(a.length);return a[f]?.Date||null}if(!await C("autoSelectFirstDate")||!i.length)return null;let r=ve(i.length);return i[r]?.Date||null}async function au(t,e){if(!t||k()||Ce())return;let n=e?`none in ${e.from} \u2192 ${e.to}`:"outside preferred range";I(`Dates found but ${n} \u2014 jumping calendar to ${t} (not booking)\u2026`);try{await l.waitFor(cs,{attempts:80,interval:G})}catch{}l.send({action:"selectFirstDate",date:t,navigateOnly:!0,maxMs:4e3,pollMs:G})}function ii(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,r,a]=n;return`${a}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime())){let r=o.getFullYear(),a=String(o.getMonth()+1).padStart(2,"0"),u=String(o.getDate()).padStart(2,"0");return`${r}-${a}-${u}`}}return null}function su(t){if(!t)return!1;let[e,n,i]=t.slice(0,10).split("-").map(Number);if(!e||!n||!i)return!1;let o=n-1,r=String(n).padStart(2,"0")+"/"+String(i).padStart(2,"0")+"/"+e,a=document.querySelector("#datepicker");if(a){let u=String(a.value||"").trim();if(u===r)return!0;if(u.includes(String(e))&&u.includes(String(i).padStart(2,"0"))){let f=u.split(/[/-]/).map(d=>parseInt(d,10));if(f.length>=3){let d,p,y;if(f[2]>31?(p=f[0],y=f[1],d=f[2]):(d=f[0],p=f[1],y=f[2]),d===e&&p===n&&y===i)return!0}}try{let f=window.jQuery||window.$;if(f&&f(a).hasClass("hasDatepicker")){let d=f(a).datepicker("getDate");if(d&&d.getFullYear()===e&&d.getMonth()===o&&d.getDate()===i)return!0}}catch{}}for(let u of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let f=u.querySelector("a");if(!f)continue;let d=parseInt(u.getAttribute("data-month"),10),p=parseInt(u.getAttribute("data-year"),10),y=parseInt(f.textContent,10);if(p===e&&d===o&&y===i)return!0}return!1}var ni=null;function cu(t,e){ni&&l.clear(ni);let n=Date.now()+(e?xe:8e3),i=()=>{!l.alive||Date.now()>n||su(t)||(l.send({action:"selectFirstDate",date:t,maxMs:e?xe:8e3,pollMs:G}),ni=l.setTimeout(i,G))};ni=l.setTimeout(i,80)}function is(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function lu(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function os(t){return t?.length?t.map((e,n)=>({entry:e,index:n,avail:lu(e)})).sort((e,n)=>n.avail!==e.avail?n.avail-e.avail:e.index-n.index):[]}function uu(t){let e=os(t);return e.length?{entry:e[0].entry,slotIndex:e[0].index}:{entry:null,slotIndex:0}}function rs(){ne&&(l.clear(ne),ne=null)}var as=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),ss=null,du=null,ne=null;function fu(t,e){ss=t,du=e?String(e).slice(0,10):null}function mu(t,e=0){ne&&l.clear(ne);let n=t?String(t).slice(0,10):null,i=0,o=async()=>{if(!l.alive||Ce()||++i>240||Q())return;let r=(ss||[]).filter(a=>a&&a.Time);if(r.length){let{entry:a,slotIndex:u}=uu(r);if(I(`Watchdog: picking time slot #${u+1}\u2026`),await He({time:is(a.Time),date:a.Date?String(a.Date).slice(0,10):n,slotIndex:u,pollMs:G,maxMs:600,prefix:m}),Q())return}else if(document.querySelector(as)&&(I("Watchdog: picking visible time slot\u2026"),await He({time:"00:00",date:n,slotIndex:e,pollMs:G,maxMs:600,prefix:m}),Q()))return;ne=l.setTimeout(o,G)};ne=l.setTimeout(o,300)}var cs=["#datepicker.hasDatepicker","#datepicker"].join(", ");async function pu(t,e=!1){if(e)return null;let n=await nn(),i=await dt(),o=await ru(t,e),r=new Date;r.setHours(0,0,0,0);let a=(t||[]).map(d=>ii(d?.Date)).filter(Boolean).filter(d=>{let[p,y,g]=d.slice(0,10).split("-").map(Number);return new Date(p,y-1,g)>=r}).sort((d,p)=>d.localeCompare(p));if(!o&&n&&a.length&&!a.filter(p=>te(p,n.from,n.to)).length)return await au(a[0],n),null;if(!o)return null;let u=n?a.filter(d=>te(d,n.from,n.to)):a,f=ve(u.length);return I(`Selecting date #${f+1}: ${o} (fast)\u2026`),Qn(o),await l.waitFor(cs,{attempts:80,interval:G}),l.send({action:"selectFirstDate",date:o,maxMs:i||n?xe:8e3,pollMs:G}),cu(o,i||n),mu(o,Yn),o}async function hu(t,e=!1){if(e||k()||Ce())return;let n=await dt(),i=await nn();if(!n&&!i&&!await C("autoSelectFirstDate"))return;rs();let o=(t||[]).filter(d=>!(!d||!d.Time||d.EntriesAvailable!=null&&Number(d.EntriesAvailable)<=0)),r=n||i;r&&(o=o.filter(d=>{let p=d.Date?String(d.Date).slice(0,10):null;return p?p>=r.from&&p<=r.to:!0}));let a=os(o);if(!a.length)return;let u=Date.now()+1e4;for(;Date.now()<u&&l.alive&&!(ra(o)||document.querySelector(as));)await new Promise(d=>l.setTimeout(d,G));let f=a.length===1?je:Wa;I(a.length===1?`1 time slot \u2014 try highest avail, wait \u2264${f/1e3}s for Submit\u2026`:`${a.length} time slots \u2014 try highest\u21922nd\u21923rd\u2026 (${f/1e3}s each for Submit)`);for(let d=0;d<a.length;d++){if(!l.alive||Ce()||k())return;let{entry:p,index:y,avail:g}=a[d],w=is(p.Time),S=p.Date?String(p.Date).slice(0,10):null,$=d===0?"highest":d===1?"2nd-highest":d===2?"3rd-highest":`${d+1}th-highest`;if(I(`Trying ${$} avail (${g}) @ ${w} \u2014 slot ${d+1}/${a.length}\u2026`),!await He({time:w,date:S,slotIndex:y,pollMs:G,maxMs:4e3,prefix:m})&&!Q()){I(`Could not click ${w} \u2014 trying next\u2026`);continue}if(I(`Selected ${w} (${$}) \u2014 waiting \u2264${f/1e3}s for Submit to enable\u2026`),await wo(f)){I(`Submit enabled on ${w} \u2014 clicking\u2026`),n?await So(n.accountId):bo();return}d<a.length-1&&I(`Submit still disabled on ${w} \u2014 trying next (${d+2}/${a.length})\u2026`)}I(`Tried all ${a.length} time slot(s); Submit never enabled.`),n&&ut()}async function ls(t){if(!K()||k())return;let e;try{e=iu(t)}catch{return}if(e==null)return;if(da(e),e.retryAfter!==void 0){let r=Number(e.retryAfter);hr(e.cgiBlock,r),r?(Mn(r),mo(r)):C("defaultWaitTime").then(a=>{Mn(a),mo(a)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let r=e.response.Posts||[],a=new Map((await xt()).map(u=>[u.ID,u]));for(let u of r)a.set(u.ID,{...a.get(u.ID),...u});await ae([...a.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let r=e.response.Members||[];if(r.length){let a=await z()||{},u=a.name&&r.find(f=>f.FullName===a.name);a.visa=(u||r[0]).VisaClassName,await M({profile:a,members:r})}}if(es.includes(e.tail)){gt(),Fr(e);let r=(e.response.ScheduleDays||[]).map(S=>ii(S?.Date)).filter(Boolean).sort(),a=r.length;if(a&&I(`${a} date${a===1?"":"s"} available \u2014 see list below`),a>0&&!e.response.HasError&&J(),Ua(),!e.response.HasError&&a>0){let S=String(e.params.postId||""),$=r[0],D=r[r.length-1];I(`${a} date${a===1?"":"s"} \u2014 alerting others FAST\u2026`),Bi({postId:S,postName:"",dayCount:a,dateFrom:$,dateTo:D,bestDate:$}).catch(()=>{})}let u=await dt(),f=await nn(),d=u||f;await ee()||C("defaultWaitTime").then(S=>{Mn(S)});let y=await xt(),g=y.find(S=>S.ID===e.params.postId);if(g&&(g.Days=e.response.ScheduleDays,g.Updated=Date.now(),g.HasError=e.response.HasError,g.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,ae(y)),!e.response.HasError&&a>0){let S=String(e.params.postId||""),$=r[0],D=r[r.length-1],v=$,j=D,re=a;if(d?.from&&d?.to){let Gt=r.filter(Ys=>te(Ys,d.from,d.to));Gt.length&&(v=Gt[0],j=Gt[Gt.length-1],re=Gt.length)}Bi({postId:S,postName:g?.Name,dayCount:re,dateFrom:v,dateTo:j,bestDate:v,rangeFrom:d?.from||null,rangeTo:d?.to||null}).catch(()=>{})}if(await ou(e.response.ScheduleDays,{postId:e.params.postId,postName:g?.Name,hasError:e.response.HasError}),await Xr(e.response.ScheduleDays,{postId:e.params.postId,postName:g?.Name,hasError:e.response.HasError}),en())J(),I("Submit pending \u2014 staying on this city (date reload ignored)\u2026");else if(d&&!e.response.HasError){let S=Qe(e.response.ScheduleDays,d.from,d.to);S.length?(J(),I(`${S.length} date${S.length===1?"":"s"} in range \u2014 selecting (city hold)\u2026`)):ut()}else d?ut():a>0&&!e.response.HasError&&(await C("autoSelectFirstDate")||ut());let w=en()?null:await pu(e.response.ScheduleDays,e.response.HasError);if(w)J(),await Jr(g?.Name,w);else if(d&&!e.response.HasError&&!en()){let S=(e.response.ScheduleDays||[]).map(D=>ii(D?.Date)).filter(Boolean).sort((D,v)=>D.localeCompare(v)),$=S.filter(D=>te(D,d.from,d.to));S.length&&!$.length?(ut(),I(`Dates found but none in ${d.from} \u2192 ${d.to}. Jumped calendar (not booking). Next city in 15\u201318s\u2026`)):S.length||(ut(),I("No dates on this city \u2014 next city in 15\u201318s\u2026"))}await xi()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let r=e.params.Date.split("T")[0];fu(e.response.ScheduleEntries,r),rs();let a=await xt(),u=a.filter(d=>d.Days&&d.Updated).sort((d,p)=>p.Updated-d.Updated).find(d=>d.Days.some(p=>p.Date===r));if(u){let d=u.Days.find(p=>p.Date===r);d&&(d.Times=e.response.ScheduleEntries,ae(a))}let f=(e.response.ScheduleEntries||[]).filter(d=>d&&d.Time);if(Br(f,r,u?.Name),f.length){let d=f.filter(g=>g.EntriesAvailable==null||Number(g.EntriesAvailable)>0),p=d.reduce((g,w)=>{let S=Number(w.EntriesAvailable);return g+(Number.isFinite(S)?S:0)},0),y=p>0?` \xB7 ${p} available`:"";I(`${d.length||f.length} time slot${(d.length||f.length)===1?"":"s"} on ${r}${y}`)}await hu(e.response.ScheduleEntries,e.response.HasError),en()?(J(),I("Submit pending \u2014 staying on this city (time reload ignored)\u2026")):f.length?(J(),await Zr(u?.Name,e.params.Date,f.length)):(ut(),I("No time slots on this date \u2014 next city in 15\u201318s\u2026")),await xi()}}function us(t){if(!K()||k())return;let e=ns(t.data.url);es.includes(e)&&Lr()}var ie=null,Mo="",ko={scanning:"Scanning for Cloudflare challenge\u2026",dom:"Trying page-level verify click\u2026",debugger:"Advanced click \u2014 targeting Turnstile iframe\u2026",retry:"Waiting before next attempt\u2026",success:"Verification passed \u2014 continuing\u2026",manual:"Stuck? Click the checkbox once, then we\u2019ll continue."};function ds(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=c.cfFlash,n.dataset[P.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),l.setTimeout(()=>n.remove(),1200)}}function gu(){let t=document.querySelector(h(s.cfHud));return t||(t=document.createElement("div"),t.id=s.cfHud,t.dataset[P.mark]="",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.innerHTML=`
    <div class="${c.cfHud}">
      <div class="${c.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">\u{1F6E1}</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${ko.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `,document.documentElement.appendChild(t),t)}async function F(t,e){if(!chrome.runtime?.id||!l.alive||!await C("autoCloudflareTick"))return;let n=gu(),i=n.querySelector("[data-cf-msg]"),o=n.querySelector("[data-cf-sub]"),r=n.querySelector("[data-cf-chip]"),a=n.querySelector(`.${c.cfHud}`);Mo=t,i&&(i.textContent=ko[t]||ko.scanning),o&&(o.textContent=e||yu(t)),r&&(r.textContent=t==="success"?"Done":t==="manual"?"Help":"Active",r.dataset.state=t),a&&(a.dataset.state=t),ie&&(l.clear(ie),ie=null),t==="success"&&(ie=l.setTimeout(()=>Ao(),2800))}function yu(t){return t==="debugger"?"Precision click via advanced browser bridge":t==="dom"?"Standard page interaction":t==="manual"?"One manual click is usually enough":t==="success"?"Resuming login and recovery":"Monitoring this tab for Turnstile"}function Ao(){let t=document.querySelector(h(s.cfHud));t&&t.remove(),Mo="",ie&&(l.clear(ie),ie=null)}function Do(){return Mo}var bu=/we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i,wu=/\bUSG\s+[a-f0-9-]{8,}/i;var Io="vsPortalErrorReloadCount",ps="vsPortalErrorReloadAt",Su=2e3,xu=1e4,fs=!1,Te=null,vu=null;function Cu(){return(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim()}function _e(){let t=Cu().slice(0,6e3);return t?!!(/a timeout occurred/i.test(t)&&(/error\s*524/i.test(t)||/origin web server timed out/i.test(t)||/cloudflare ray id/i.test(t))||/error\s*524/i.test(t)&&/cloudflare/i.test(t)&&t.length<8e3||bu.test(t)&&(wu.test(t)||/error id\s*#/i.test(t))||/we'?re sorry,\s*but something went wrong/i.test(t)&&t.length<2500):!1}function hs(){try{return Math.max(0,Number(sessionStorage.getItem(Io)||0))}catch{return 0}}function $u(){try{let t=hs()+1;return sessionStorage.setItem(Io,String(t)),sessionStorage.setItem(ps,String(Date.now())),t}catch{return 1}}function Eo(){try{sessionStorage.removeItem(Io),sessionStorage.removeItem(ps)}catch{}}function Tu(t){return Math.min(xu,Su+Math.max(0,t-1)*1e3)}function _u(){Te&&(l.clear(Te),Te=null)}function ku(){$u();try{location.reload()}catch{}}function ms(){if(!l.alive||Te)return;if(!_e()){Eo();return}let t=hs()+1,e=Tu(t);Te=l.setTimeout(()=>{if(Te=null,!!l.alive){if(!_e()){Eo();return}ku()}},e)}function gs(){if(fs)return;fs=!0;let t=()=>{l.alive&&(_e()?ms():(Eo(),_u()))};t(),vu=l.setInterval(t,1500);try{let e=new MutationObserver(()=>{l.alive&&_e()&&ms()});e.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),l.disposable(()=>e.disconnect())}catch{}}var oi="vsDebugLogs",Mu=200;function Au(){try{return new Date().toLocaleTimeString("en-IN",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})}catch{return new Date().toISOString().slice(11,19)}}async function B(t,e,n){let i={at:Date.now(),t:Au(),tag:String(t||"app").slice(0,24),msg:String(e||"").slice(0,400)};if(n!=null)try{i.data=JSON.parse(JSON.stringify(n))}catch{i.data=String(n).slice(0,200)}try{console.log(`[VS6 ${i.tag}] ${i.msg}`,n!==void 0?n:"")}catch{}try{let o=await T({[oi]:[]}),r=Array.isArray(o[oi])?o[oi].slice():[];for(r.push(i);r.length>Mu;)r.shift();await M({[oi]:r})}catch{}}var ai=null,un=0,ln=null,It=0,ys=0,Du=25e3;async function Eu(){try{let e=(await T("humanClickProfile")).humanClickProfile,n=e?.liveTrained&&e.samples?.length||0;return n<5?15e3:n<20?1e4:n<50?6e3:3500}catch{return 12e3}}var Lo=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function Z(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!U()&&!Do()}function U(){if(_e()||document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return Lo.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:Po().length>0}function ri(t){return new Promise(e=>setTimeout(e,t))}function Iu(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let i of n.querySelectorAll("*"))i.shadowRoot&&(t.push(i.shadowRoot),e.push(i.shadowRoot))}return t}function Po(){let t=[],e=new Set,n=i=>{if(!i||e.has(i))return;let o=i.getBoundingClientRect();if(o.width<40||o.height<20||o.width>900||o.height>400)return;let r=(i.src||i.getAttribute?.("src")||"").toLowerCase(),a=(i.title||i.getAttribute?.("title")||"").toLowerCase(),u=(i.className?.toString?.()||"").toLowerCase(),f=(i.id||"").toLowerCase(),d=i.tagName==="IFRAME"&&(r.includes("challenges.cloudflare")||r.includes("turnstile")||a.includes("cloudflare")||a.includes("security challenge")),p=u.includes("cf-turnstile")||u.includes("turnstile")||f.includes("turnstile")||f.includes("challenge")||i.hasAttribute?.("data-sitekey")||i.hasAttribute?.("data-turnstile-widget");if(!d&&!p)if(i.tagName==="IFRAME"&&o.width>=120&&o.width<=420&&o.height>=45&&o.height<=120){if(!Lo.test(document.body?.innerText||""))return}else return;e.add(i),t.push({el:i,rect:o})};for(let i of Iu()){for(let o of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let r of i.querySelectorAll(o))n(r);for(let o of i.querySelectorAll("iframe"))n(o)}return t}function Pu(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function Lu(t){let e=[],n=new Set,i=(o,r)=>{if(!Number.isFinite(o)||!Number.isFinite(r)||o<1||r<1||o>window.innerWidth-1||r>window.innerHeight-1)return;let a=`${Math.round(o)},${Math.round(r)}`;n.has(a)||(n.add(a),e.push({x:Math.round(o),y:Math.round(r)}))};for(let{rect:o}of t){let r=o.top+o.height/2,a=o.left+Math.min(28,Math.max(18,o.width*.11));for(let u of[0,-4,4,-8,8,12,16,20,24,28,32])for(let f of[0,-3,3,-6,6])i(a+u,r+f);i(o.left+o.width*.5,r)}return e}function qu(t){for(let{el:e,rect:n}of t)try{e.click();let i=n.left+Math.min(26,n.width*.12),o=n.top+n.height/2,r=document.elementFromPoint(i,o)||e;for(let a of["pointerdown","mousedown","mouseup","pointerup","click"])r.dispatchEvent(new MouseEvent(a,{bubbles:!0,cancelable:!0,clientX:i,clientY:o,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let i=n.getBoundingClientRect();if(i.width<4&&i.height<4)continue;let o=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!o.includes("human")&&!o.includes("verify")&&e==="input[type='checkbox']"){let r=n.closest("label, div, form");if(!Lo.test(r?.textContent||""))continue}return n.click(),!0}return!1}async function bs(t){t.length&&(ds(t.slice(0,3)),l.send({action:"viewportClickPoints",points:t}),await C("cloudflareDebuggerClick")?(await F("debugger","Trained click on Verify you are human\u2026"),l.send({action:"cloudflareDebuggerClick",points:t,primaryOnly:!0})):await F("dom"))}function ws(){return/\/(schedule|ofc-schedule|c-schedule)\b/i.test(location.pathname||"")}function Ss(){if(!ws()||!U()||Z())return;let t=Date.now();if(!(t-ys<Du)){ys=t,B("cf","verify-human on schedule \u2014 focusing Application Home for manual click"),F("manual","Verify you are human \u2014 opening Home tab so you can click it there\u2026").catch(()=>{});try{l.send({action:"focusHomeForVerify",ofcUrl:location.href})}catch{}}}async function si(){if(!await C("autoCloudflareTick"))return!1;if(Z())return It&&B("cf","challenge already solved"),It=0,await F("success"),!0;Ss(),It||(It=Date.now(),B("cf","challenge seen \u2014 train window started"));let t=await Eu();if(Date.now()-It<t)return await F("scanning",ws()?"Opening Home \u2014 click Verify you are human on the Home tab\u2026":"Train window \u2014 click Verify you are human yourself (recording your mouse)\u2026"),!1;B("cf","train window done \u2014 attempting auto click"),await F("scanning","Verify you are human page \u2014 preparing click\u2026");let e=Po();Pu(e),await ri(350),e=Po();let n=Lu(e);return n.length&&(await bs(n),await ri(1200),Z()||!U())?(It=0,await F("success"),!0):(await F("dom"),qu(e),await ri(600),Z()||!U()?(It=0,await F("success"),!0):n.length&&(await bs(n),await ri(1e3),Z()||!U())?(It=0,await F("success"),!0):(un++,un>=8?await F("manual","Click the checkbox once \u2014 we will continue after."):await F("retry",`Retry ${un}/8\u2026`),!1))}function Ru(){ln||(ln=new MutationObserver(()=>{l.alive&&U()&&!Z()&&(Ss(),si())}),ln.observe(document.documentElement,{childList:!0,subtree:!0}),l.disposable(()=>{ln?.disconnect(),ln=null}))}function qo(){ai&&(l.clear(ai),ai=null),un=0,It=0,Ao()}async function Ro(){if(qo(),!await C("autoCloudflareTick"))return;Ru();let t=async()=>{if(l.alive&&await C("autoCloudflareTick")){if(U()&&!Z()){await si();return}Do()&&(un=0,await F("success"))}};t(),ai=l.setInterval(t,1800)}var ke="sessionRecovery",Oo="homeKeepaliveAt",No="homeLoadingStuckAt",Fo="vsResubmitContinue",xs=2e3,li=!1,vs=null,Wo=null,Ho=null,ci=null,dn=0;function Ko(){try{let t=new URL(location.href);return t.searchParams.set("_vsr",String(Date.now()%1e12)),location.replace(t.pathname+t.search+t.hash),!0}catch{try{return location.href=location.pathname+location.search,!0}catch{return!1}}}function ks(){try{if(sessionStorage.getItem(Fo)!=="1")return!1;sessionStorage.removeItem(Fo)}catch{return!1}return bt()||document.querySelector("#post_select")?!1:(Ko(),!0)}function Cs(){return x.homeKeepaliveMinMs}function Ou(){return x.homeKeepaliveMaxMs}function Nu(){return x.homeKeepaliveDebounceMs}function $s(){return x.loadingStuckMs}function Wu(){return x.loadingStuckDebounceMs}function Ts(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function Hu(t,e){let n=Ts(t);if(!n)return"";let i="",o=0;for(let r of e||[]){let a=Ts(r.q);if(!a||!r.a)continue;if(n.includes(a)||a.includes(n))return r.a;let u=a.split(" ").filter(p=>p.length>3),f=0;for(let p of u)n.includes(p)&&f++;let d=u.length?f/u.length:0;d>o&&d>=.5&&(o=d,i=r.a)}return i}async function Fu(){let t=await T([Nt,"profile"]),e=t[Nt]||{},n=t.profile?.id?String(t.profile.id):null,i=n?e[n]:null;return i||(i=Object.values(e).find(o=>o?.loginId&&o?.loginPass)||null),i||{}}function _s(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,i=Object.getOwnPropertyDescriptor(n,"value")?.set;i?i.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function Kt(t){return new Promise(e=>setTimeout(e,t))}function yt(t,e){return t+Math.random()*(e-t)}async function Bo(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await Kt(yt(250,600)),_s(t,"");let i="";for(let o=0;o<n.length;o++){let r=n[o];i+=r,_s(t,i),t.dispatchEvent(new KeyboardEvent("keydown",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:r,bubbles:!0}));let a=yt(90,220);/[\s@._]/.test(r)&&(a+=yt(120,320)),Math.random()<.08&&(a+=yt(200,450)),await Kt(a)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await Kt(yt(200,500))}var ui=!1,di=!1;function fi(t){return!t||t.disabled?!1:(t.click(),!0)}function Bu(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let i of t){let o=(i.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(o))continue;let r=i.querySelector("input[type='checkbox']")||document.getElementById(i.getAttribute("for")||"");r&&!r.checked&&(fi(r),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(i=>/^(continue|ok|accept|agree)$/i.test((i.textContent||i.value||"").trim()));return e&&n&&fi(n),e>0}function Ms(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function Uu(t){if(ui)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;ui=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await Bo(e,t.loginId),await Kt(yt(400,900))),n&&t.loginPass&&!n.value&&(await Bo(n,t.loginPass),await Kt(yt(500,1100)));let i=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(o=>/sign in|log in|continue/i.test(o.textContent||o.value||""));return i&&(n?.value||t.loginPass)?(await Kt(yt(600,1400)),fi(i),!0):!!(e||n)}finally{ui=!1}}async function Ku(t){if(di)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let o of n){let r=(o.textContent||"").trim();if(r.length<12||r.length>220||!/\?/.test(r)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(r))continue;let a=o.querySelector("input[type='text']")||document.getElementById(o.getAttribute("for")||"")||o.parentElement?.querySelector("input[type='text']");a&&a.offsetParent!==null&&e.push({text:r,input:a})}for(let o of["kba1_response","kba2_response","kba3_response"]){let r=document.getElementById(o);if(!r)continue;let u=(r.closest(".form-group, .entry, li, div")||r.parentElement)?.textContent||"";e.some(f=>f.input===r)||e.push({text:u,input:r})}let i=[];for(let{text:o,input:r}of e){if(r.value)continue;let a=Hu(o,t.security);a&&i.push({input:r,ans:a})}if(!i.length)return!1;di=!0;try{for(let{input:r,ans:a}of i)await Bo(r,a),await Kt(yt(350,800));await Kt(yt(600,1400));let o=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(r=>/continue|submit|verify/i.test(r.textContent||r.value||""));return o&&fi(o),!0}finally{di=!1}}function As(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||U()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function bt(){return Je()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function zu(t=""){return/\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(t||""))}function Uo(){if(bt()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||U()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}function Gu(t){return!!(t?.loginId&&t?.loginPass)}function ju(){return As()?!1:!!(Ms()||document.querySelector("#kba1_response, #kba2_response, #kba3_response")||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))}async function Yu(){let t=(await T(ke))[ke],e=!!t?.active,n=await Fu();if(U()){await si();return}if(Bu(),As()){e&&(await M({[ke]:{...t,active:!1,doneAt:Date.now()}}),l.send({action:"recoveryReturnToOfc"}));return}ju()&&Gu(n)&&await C("autofillLogin")&&(await Ku(n)||(Ms()||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))&&await Uu(n))}function Ds(){if(!Uo()||vs)return;let t=async()=>{l.alive&&await Yu()};t(),vs=l.setInterval(t,1200)}function Es(){return Cs()+Math.random()*(Ou()-Cs())}async function Is(){try{let t=await T(Oo),e=Number(t[Oo])||0;return Date.now()-e<Nu()?!1:(await M({[Oo]:Date.now()}),!0)}catch{return!0}}function Ps(){if(bt()||!Uo()||document.querySelector("#post_select")||Wo)return;let t=()=>{l.alive&&(Wo=l.setTimeout(async()=>{if(Wo=null,!l.alive||bt()||zu(location.href)||document.querySelector("#post_select")||!Uo())return;if(ui||di||li){t();return}if((await T(ke))[ke]?.active){t();return}if(!await Is()){t();return}try{Ko()}catch{t()}},Es()))};t()}function Ls(){if(!bt()||Ho)return;let t=()=>{l.alive&&(Ho=l.setTimeout(async()=>{if(Ho=null,!(!l.alive||!bt())){if(await Is())try{l.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}t()}},Es()))};t()}async function Vu(){try{let t=await T(No),e=Number(t[No])||0;return Date.now()-e<Wu()?!1:(await M({[No]:Date.now()}),!0)}catch{return!0}}function qs(){if(!bt()||ci)return;let t=async()=>{if(ci=null,!(!l.alive||!bt())){try{if(uo()){if(dn||(dn=Date.now()),Date.now()-dn>=$s()){if(await Vu()){try{I(`Date Loading stuck \u2265${$s()/1e3}s \u2014 reloading Application Home\u2026`)}catch{}try{l.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}}dn=Date.now()}}else dn=0}catch{}l.alive&&bt()&&(ci=l.setTimeout(t,xs))}};ci=l.setTimeout(t,xs)}async function Rs(t){let e=String(t||"");if(/form resubmission|information that you entered|action that you took to be repeated|returning to that page might cause/i.test(e)){if(!bt()&&!document.querySelector("#post_select")){try{sessionStorage.setItem(Fo,"1")}catch{}l.setTimeout(()=>Ko(),300)}return}if(!/PSE0501|unable to load appointment available days/i.test(e)||li)return;li=!0,l.setTimeout(()=>{li=!1},8e3);let n=await E();await M({[ke]:{active:!0,ofcUrl:location.href,accountId:n,startedAt:Date.now()}}),l.send({action:"recoveryStart",ofcUrl:location.href})}var pi="humanClickProfile",Go=150,Vo=120,Qu=250,Os=!1,St=[],mi=0,at=0,zt=0,O=null,jo=0,mn=!1,Me=null,hi=0,yi=0,pn=[],wt=!1,oe=!1;function Xu(){let t=[];for(let e of document.querySelectorAll('iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]')){let n=e.getBoundingClientRect();n.width<40||n.height<20||n.width>900||n.height>400||t.push(n)}if(!t.length&&U())for(let e of document.querySelectorAll("iframe")){let n=e.getBoundingClientRect();n.width>=120&&n.width<=420&&n.height>=45&&n.height<=120&&t.push(n)}return t}function hn(){let t=Xu();if(!t.length)return null;let e=t[0];return{x:e.left+Math.min(28,Math.max(18,e.width*.11)),y:e.top+e.height/2,w:e.width,h:e.height,left:e.left,top:e.top}}function Ae(t,e,n){return n?t>=n.left-40&&t<=n.left+n.w+40&&e>=n.top-30&&e<=n.top+n.h+30:!1}function Fs(t){let e=performance.now();mi||(mi=e);let n=O,i=n?(t.clientX-n.x)/Math.max(24,n.w*.12):0,o=n?(t.clientY-n.y)/Math.max(20,n.h*.5):0;St.push({nx:Math.round(i*1e3)/1e3,ny:Math.round(o*1e3)/1e3,x:Math.round(t.clientX),y:Math.round(t.clientY),t:Math.round(e-mi)}),St.length>Vo&&St.shift()}async function bi(){return(await T(pi))[pi]||{version:2,maxSamples:Go,samples:[],avgHoverMs:420,avgPressMs:70,avgApproachMs:800,liveTrained:!1}}function zo(t,e,n){if(!t.length)return n;let i=t.reduce((o,r)=>o+(Number(r[e])||0),0);return Math.round(i/t.length)}async function Bs(t,{force:e=!1}={}){let n=Date.now();if(!e&&n-jo<Qu)return null;jo=n;let i=await bi(),o=Array.isArray(i.samples)?i.samples.slice():[];for(t.clientId||(t.clientId=`hc-${t.at||n}-${Math.random().toString(36).slice(2,10)}`),t.uploaded=!1,o.push(t);o.length>Go;)o.shift();let r={version:2,maxSamples:Go,samples:o,avgHoverMs:zo(o,"hoverMs",420),avgPressMs:zo(o,"pressMs",70),avgApproachMs:zo(o,"approachMs",800),updatedAt:n,liveTrained:!0,source:"visa-page-live"};return await M({[pi]:r}),hi=o.length,B("human",`saved sample locally #${o.length}`,{capture:t.capture||"page",pressMs:t.pressMs,hoverMs:t.hoverMs,pathPts:Array.isArray(t.path)?t.path.length:0,clientId:t.clientId}),Us(t,r).catch(()=>{}),Ks().catch(()=>{}),r}async function Ju(t){if(!t)return;let e=await bi(),n=Array.isArray(e.samples)?e.samples.slice():[],i=!1;for(let o of n)o?.clientId===t&&!o.uploaded&&(o.uploaded=!0,i=!0);i&&await M({[pi]:{...e,samples:n,updatedAt:Date.now()}})}async function Us(t,e){try{if(!await C("serverSync"))return B("upload","skipped \u2014 serverSync is OFF"),!1;let n=await z()||{},i=t.clientId||`hc-${t.at||Date.now()}-${Math.random().toString(36).slice(2,8)}`;t.clientId=i;let o={client_id:i,profile:{id:n.id||"",email:n.email||"",name:n.name||"",visa:n.visa||""},sample:t,profile_meta:{sampleCount:e?.samples?.length||0,avgHoverMs:e?.avgHoverMs,avgPressMs:e?.avgPressMs,avgApproachMs:e?.avgApproachMs,liveTrained:!0,source:"visa-page-live",extensionHost:location.host}};B("upload",`sending sample ${i}`,{sampleCount:e?.samples?.length||0,email:n.email||""}),l.send({action:"uploadHumanClickSample",payload:o});try{chrome.runtime.sendMessage({action:"uploadHumanClickSample",payload:o},r=>{if(chrome.runtime.lastError){B("upload",`SW error: ${chrome.runtime.lastError.message}`);return}r?.success?(B("upload",`server OK id=${r.id??"?"} status=${r.status??""}`,{clientId:i}),Ju(i)):B("upload",`server FAIL ${r?.error||r?.status||"unknown"}`,{clientId:i})})}catch(r){B("upload",`sendMessage threw: ${r?.message||r}`)}return!0}catch(n){return B("upload",`upload threw: ${n?.message||n}`),!1}}async function Ks(){try{if(!await C("serverSync"))return;let t=await bi(),n=(Array.isArray(t.samples)?t.samples:[]).filter(i=>i&&i.uploaded!==!0).slice(-40);for(let i of n)await Us(i,t),await new Promise(o=>setTimeout(o,80))}catch{}}function zs(t,e={}){let n=performance.now(),i=Math.max(25,Math.min(500,at?n-at:70)),o=Math.max(30,Math.min(3e3,at?at-(zt||at):200)),r=(St.length?St:pn).slice(-Vo),a=r.length?r[r.length-1].t:o,u=Math.max(o,Math.min(12e3,a||o)),f=Me,d=O||hn();return{hoverMs:Math.round(o),pressMs:Math.round(i),approachMs:Math.round(u),path:r,down:f?{x:Math.round(f.x),y:Math.round(f.y)}:null,up:t?{x:Math.round(t.clientX),y:Math.round(t.clientY)}:f?{x:Math.round(f.x),y:Math.round(f.y)}:d?{x:Math.round(d.x),y:Math.round(d.y)}:null,target:d?{x:Math.round(d.x),y:Math.round(d.y),w:Math.round(d.w),h:Math.round(d.h),left:Math.round(d.left),top:Math.round(d.top)}:null,viewport:{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio||1,scrollX:Math.round(window.scrollX||0),scrollY:Math.round(window.scrollY||0)},pointerType:t?.pointerType||"mouse",url:location.pathname+location.search,at:Date.now(),...e}}function fn(){St.length&&(pn=St.slice(-Vo)),St=[],mi=0,at=0,zt=0,Me=null}function Qo(){mn||(mn=!0,oe=!0,fn(),O=hn())}function Yo(){mn=!1,O=null,wt=!1,fn()}function gi(t){let e=t?.target;if(!e)return!1;if(e.closest?.(".cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]"))return!0;if(e.tagName==="IFRAME"){let n=(e.src||"").toLowerCase();if(n.includes("challenges.cloudflare")||n.includes("turnstile"))return!0;let i=e.getBoundingClientRect();if(i.width>=120&&i.width<=420&&i.height>=45&&i.height<=120)return!0}return!1}async function Ns(t){if(l.alive){if(!U()||Z()){mn&&Yo();return}Qo(),O||(O=hn()),!zt&&O&&Ae(t.clientX,t.clientY,O)&&(zt=performance.now()),O&&Ae(t.clientX,t.clientY,O)&&(yi=Date.now()),Fs(t)}}async function Ws(t){if(!(!l.alive||t.button!==0)&&!(!U()||Z())){Qo(),O=hn(),at=performance.now(),zt||(zt=at),Me={x:t.clientX,y:t.clientY},Fs(t),(gi(t)||O&&Ae(t.clientX,t.clientY,O))&&(wt=!0,yi=Date.now()),B("human","pointer down during challenge",{onWidget:gi(t),near:!!(!O||Ae(t.clientX,t.clientY,O)),x:Math.round(t.clientX),y:Math.round(t.clientY)});try{F("scanning",`Recording click\u2026 (saved ${hi} so far)`)}catch{}}}async function Hs(t){if(!l.alive||t.button!==0||!at&&!wt)return;if(!U()&&!Z()){fn();return}if(!(O&&Ae(t.clientX,t.clientY,O)||O&&Me&&Ae(Me.x,Me.y,O)||gi(t)||wt||!O&&(St.length>=2||pn.length>=2))&&St.length<2&&pn.length<2){fn();return}let n=zs(t,{capture:wt||gi(t)?"iframe-or-widget":"page"});wt=!1,fn();let i=await Bs(n);if(!i)return;let o=i.samples?.length||0;try{F("success",`Saved verify-human click #${o} \u2014 uploaded to server`)}catch{}}async function Zu(){let t=Date.now();if(!oe||!Z()&&U())return;if(!(wt||t-yi<8e3||pn.length>=2&&t-jo>500)){oe=!1,Yo();return}let n=zs(null,{capture:"challenge-solved"});wt=!1,oe=!1,Yo();let i=await Bs(n,{force:!0});if(!i)return;let o=i.samples?.length||0;try{F("success",`Saved verify-human click #${o} (after checkbox) \u2014 uploaded to server`)}catch{}}async function td(){try{let t=await bi(),e=t.liveTrained&&t.samples?.length||0;return hi=e,e}catch{return hi}}function Gs(){if(Os)return;Os=!0,B("human","train watcher started",{path:location.pathname}),l.on(window,"pointermove",Ns,{passive:!0,capture:!0}),l.on(window,"pointerdown",Ws,{passive:!0,capture:!0}),l.on(window,"pointerup",Hs,{passive:!0,capture:!0}),l.on(window,"mousemove",Ns,{passive:!0,capture:!0}),l.on(window,"mousedown",Ws,{passive:!0,capture:!0}),l.on(window,"mouseup",Hs,{passive:!0,capture:!0}),l.on(window,"blur",()=>{!U()||Z()||(wt=!0,yi=Date.now(),at||(at=performance.now(),zt||(zt=at)),B("human","page blur during challenge (likely iframe click)"))});let t=async()=>{if(!l.alive)return;if(U()&&!Z()){oe||B("human","challenge detected \u2014 recording armed"),oe=!0,Qo(),O||(O=hn());let n=await td();try{F("scanning",n?`Train mode \u2014 click Verify you are human naturally (saved ${n})`:"Train mode \u2014 move mouse naturally, then click Verify you are human (recording\u2026)")}catch{}return}(oe||mn||wt)&&await Zu()};t(),l.setInterval(t,1200),l.setTimeout(()=>{B("upload","flushing unsynced local samples\u2026"),Ks().catch(()=>{})},2500)}var ed=`
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

#${s.waitTime} .${c.pill} {
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  white-space: nowrap;
}

#${s.waitTime} .${c.pillTtl} {
  flex: 1;
  min-width: 0;
  padding: 0.35em 0.5em;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}

#${s.waitTime} .${c.pillTmr} {
  display: flex;
  align-items: center;
  padding: 0.35em 0.55em;
  border-radius: 5px 0 0 5px;
  background: rgba(255, 255, 255, 0.25);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-variant-numeric: tabular-nums;
}

#${s.waitTime} .${c.pillWait} { background-color: rgba(255, 0, 0, 0.35); color: #5c0000; }
#${s.waitTime} .${c.pillDone} { background-color: #1a4480; color: white; }

#atlas-sidebar .${c.sideLink} { background-color: #1a4480; color: white; }
#${s.datesPara} { margin: 0.5em 0; line-height: 1.45; }

#${s.datesCont} .${c.datesLnk} { color: white; }
#${s.datesCont} .${c.slotsSum} {
  font-weight: 700;
  font-size: 1.05em;
  margin-bottom: 0.4em;
  color: #0b3d2e;
}
#${s.datesCont} .${c.slotsTbl},
#${s.slotsTbl} {
  width: auto;
  min-width: 220px;
  border-collapse: collapse;
  margin: 0.25em 0 0.5em;
  font-size: 0.95em;
}
#${s.datesCont} .${c.slotsTbl} th,
#${s.datesCont} .${c.slotsTbl} td,
#${s.slotsTbl} th,
#${s.slotsTbl} td {
  border: 1px solid #cbd5e0;
  padding: 0.3em 0.75em;
  text-align: left;
}
#${s.datesCont} .${c.slotsTbl} th,
#${s.slotsTbl} th {
  background: #edf2f7;
  font-weight: 600;
}
#${s.ofcDate} { font-weight: bold; }

.${c.card} {
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

#${s.histCont} .${c.cardTtl} {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
}
#${s.histCont} .${c.histScrl} {
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

#${s.histTbl} td.${c.dltDn} { color: #10b981; font-weight: 500; }
#${s.histTbl} td.${c.dltUp} { color: #ef4444; font-weight: 500; }

#${s.cdCard} .${c.cardTtl} {
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

#${s.cdTime}.${c.cdDiv}-over { font-size: 20px; }
.${c.cdDiv} {
  border-top: 1px solid #edf2f7;
  margin-top: 15px;
  padding-top: 12px;
}

.${c.footer} { font-size: 11px; }
#${s.histCont} .${c.footer} { margin-top: 8px; }
#${s.cdCard} .${c.footer} { margin: 0; }

#${s.histCont} .${c.footer} a,
#${s.cdCard} .${c.footer} a {
  color: #1a4480;
  text-decoration: none;
  font-weight: 500;
}

.${c.hidden} { display: none; }

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
#${s.aiBtn}.${c.aiOn} {
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
#${s.aiPanel}.${c.hidden} {
  display: none !important;
}
#${s.aiPanel} .${c.cardTtl} {
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
#${s.aiPanel} .${c.aiHint} {
  margin: 0 0 8px;
  font-size: 14.5px;
  line-height: 1.5;
  color: #6b7280;
  font-weight: 400;
}
#${s.aiPanel} .${c.aiHead} {
  font-weight: 700;
  color: #111827;
  font-size: 16px;
}
#${s.aiPanel} .${c.aiRow} {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}
#${s.aiPanel} .${c.aiSec} {
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
#${s.aiTermsGate}.${c.hidden},
#${s.aiMain}.${c.hidden} {
  display: none;
}
#${s.aiPanel} .${c.aiInfo} {
  margin: 0 0 10px;
  padding: 10px 12px;
  background: #eff6ff;
  border: 1px solid #93c5fd;
  border-radius: 8px;
  color: #1e40af;
  font-size: 14.5px;
  line-height: 1.5;
}
#${s.aiPanel} .${c.aiWarn} {
  margin: 0 0 10px;
  padding: 10px 12px;
  background: #fffbeb;
  border: 1px solid #f59e0b;
  border-radius: 8px;
  color: #92400e;
  font-size: 14.5px;
  line-height: 1.5;
}
#${s.aiPanel} .${c.aiOk},
#${s.aiStatus}.${c.aiOk} {
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
#${s.aiPanel} .${c.aiDateBtn} {
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
#${s.aiPanel} .${c.aiDateBtn}:hover {
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
#${s.aiCal}.${c.hidden} { display: none !important; }
#${s.aiCal} .${c.aiCalHead} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
}
#${s.aiCal} .${c.aiCalHead} .${c.aiHead} {
  font-size: 17px;
  margin: 0;
  flex: 1;
  text-align: center;
}
#${s.aiCal} .${c.aiCalHead} button {
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
#${s.aiCal} .${c.aiCalGrid} {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}
#${s.aiCal} .${c.aiCalGrid} .${c.aiHint} {
  margin: 0;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: #6b7280;
  padding: 4px 0;
  pointer-events: none;
}
#${s.aiCal} .${c.aiCalDay} {
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
#${s.aiCal} .${c.aiCalDay}:hover {
  background: #eff6ff;
  border-color: #93c5fd;
}
#${s.aiCal} .${c.aiCalDay}.${c.aiCalMuted} {
  color: #9ca3af;
  font-weight: 500;
  background: #f9fafb;
}
#${s.aiCal} .${c.aiCalDay}:disabled,
#${s.aiCal} .${c.aiCalDay}[aria-disabled="true"] {
  opacity: 0.4;
  cursor: not-allowed;
  background: #f3f4f6;
  color: #9ca3af;
  pointer-events: none;
}
#${s.aiCal} .${c.aiCalDay}.${c.aiCalToday} {
  border-color: #3b82f6;
}
#${s.aiCal} .${c.aiCalDay}.${c.aiCalOn} {
  background: #3b82f6;
  border-color: #2563eb;
  color: #fff;
}
#${s.aiCal} .${c.aiRow} {
  margin: 12px 0 0;
  justify-content: space-between;
}
#${s.aiCal} .${c.aiRow} button {
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

#${s.aiPanel} .${c.aiQl} {
  margin-top: 4px;
  padding: 14px 14px 12px;
  border: 1px solid #111827;
  border-radius: 10px;
  background: #fff;
}
#${s.aiPanel} .${c.aiQlTitle} {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
}
#${s.aiPanel} .${c.aiQlSub} {
  margin: 4px 0 12px;
  font-size: 12px;
  color: #64748b;
  line-height: 1.35;
}
#${s.aiPanel} .${c.aiQlCard} {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 0;
  border-top: 1px solid #e2e8f0;
}
#${s.aiPanel} .${c.aiQlCard}:first-child {
  border-top: none;
  padding-top: 2px;
}
#${s.aiPanel} .${c.aiQlMeta} {
  min-width: 0;
  flex: 1;
}
#${s.aiPanel} .${c.aiQlMeta} strong {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  word-break: break-word;
}
#${s.aiPanel} .${c.aiQlMeta} span {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  color: #64748b;
}
#${s.aiPanel} .${c.aiQlBadge} {
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
#${s.aiPanel} .${c.aiQlEdit} {
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
#${s.aiPanel} .${c.aiQlEdit}:hover { color: #1d4ed8; }
#${s.aiPanel} .${c.aiQlAdd} {
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
#${s.aiPanel} .${c.aiQlAdd}:hover { background: #f8fafc; }
#${s.aiPanel} .${c.aiQlEmpty} {
  margin: 0 0 4px;
  font-size: 12px;
  color: #64748b;
}

#${s.aiPanel} .${c.aiSwitch} {
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
#${s.aiPanel} .${c.aiSwitch}.${c.aiOnBtn} {
  background: #3b82f6;
  box-shadow: none;
}
#${s.aiPanel} .${c.aiKnob} {
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
#${s.aiPanel} .${c.aiSwitch}.${c.aiOnBtn} .${c.aiKnob} {
  transform: translateX(20px);
}

#${s.aiStatus} { margin: 0; }
#${s.aiPanel} .${c.aiCities} {
  max-height: 150px;
  overflow: auto;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 10px;
  margin-bottom: 0;
  background: #f9fafb;
}
#${s.aiPanel} .${c.aiCityAct} {
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
#${s.aiPanel} .${c.aiCityAct}:hover { color: #2563eb; }
#${s.aiPanel} .${c.aiCities} label {
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  margin: 5px 0;
  color: #1f2937;
  font-size: 14.5px;
}
#${s.aiPanel} .${c.aiCities} input[type="checkbox"] {
  margin: 0;
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
}
#${s.aiPanel} .${c.aiRow} label { flex: 1; min-width: 140px; }

#${s.aiWinList} {
  display: grid;
  gap: 10px;
  margin: 0 0 6px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
}
#${s.aiPanel} .${c.aiWinRow} {
  display: grid;
  gap: 4px;
  padding: 12px;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}
#${s.aiPanel} .${c.aiWinRow}:last-child {
  padding-bottom: 12px;
}
#${s.aiPanel} .${c.aiInline} {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
#${s.aiPanel} .${c.aiInline} select {
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
#${s.aiPanel} .${c.aiInline} .${c.aiHead} {
  margin: 0;
  flex-direction: row;
  font-size: 14.5px;
}
#${s.aiPanel} .${c.aiWinHelp} {
  font-size: 14.5px;
  color: #6b7280;
  margin-left: 2px;
}
#${s.aiPanel} .${c.aiTrash} {
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
#${s.aiPanel} .${c.aiTrash}:hover { background: #fef2f2; }
#${s.aiWinNote} { margin: 0 0 8px; font-size: 14.5px; color: #6b7280; }

#${s.aiPanel} .${c.aiTerms} {
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
#${s.aiPanel} .${c.aiTerms} .${c.aiHead} {
  margin: 0 0 6px;
  font-size: 20px;
  text-align: center;
}
#${s.aiPanel} .${c.aiTerms} .${c.aiHint} {
  text-align: center;
  margin: 0 0 14px;
}
#${s.aiPanel} .${c.aiTermsList} {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  display: grid;
  gap: 10px;
}
#${s.aiPanel} .${c.aiTermsList} li {
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
#${s.aiPanel} .${c.aiTermsList} li::before {
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
#${s.aiPanel} .${c.aiTermsCb} {
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
#${s.aiPanel} .${c.aiTermsCb} input[type="checkbox"] {
  margin: 2px 0 0;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  accent-color: #3b82f6;
}
#${s.aiPanel} .${c.aiContinue} {
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
#${s.aiPanel} .${c.aiContinue}:disabled {
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
#${s.cfHud} .${c.cfHud} {
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
#${s.cfHud} .${c.cfHud}[data-state="success"] {
  border-color: rgba(34, 197, 94, 0.45);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 24px rgba(34, 197, 94, 0.15);
}
#${s.cfHud} .${c.cfHud}[data-state="manual"] {
  border-color: rgba(251, 191, 36, 0.45);
}
#${s.cfHud} .${c.cfHud}[data-state="debugger"] {
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.32), 0 0 28px rgba(59, 130, 246, 0.18);
}
#${s.cfHud} .${c.cfPulse} {
  width: 10px;
  height: 10px;
  margin-top: 5px;
  border-radius: 50%;
  background: #60a5fa;
  box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.55);
  animation: ${m}cfpulse 1.6s ease-out infinite;
  flex-shrink: 0;
}
#${s.cfHud} .${c.cfHud}[data-state="success"] .${c.cfPulse} {
  background: #4ade80;
  animation: none;
  box-shadow: 0 0 12px rgba(74, 222, 128, 0.65);
}
#${s.cfHud} .${c.cfHud}[data-state="manual"] .${c.cfPulse} {
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
`;function js(){if(document.querySelector(h(s.styles)))return;let t=document.createElement("style");t.id=s.styles,t.dataset[P.mark]="",t.textContent=ed,(document.head||document.documentElement).appendChild(t)}dr();To();Jo(()=>{ja(),l.destroy()});Sr();gs();k()&&E().then(t=>{if(t)return zn(t);be()}).catch(()=>be());if(!k()){l.disposable(()=>{let i=document.querySelector(h(s.anchor)),o=document.querySelector("#post_select");i&&o&&i.replaceWith(o);for(let r of document.querySelectorAll("[data-"+P.mark+"]"))r.remove()}),js(),l.send({action:"registerBlockGuard",prefix:m}),l.send({action:"registerRedirect",prefix:m}),l.send({action:"registerAlertGuard",prefix:m}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&l.send({action:"registerOfcReader",prefix:m}),l.on(window,"message",i=>{if(l.alive&&i.source===window)switch(i.data?.action){case Pt.req:return us(i);case Pt.res:return ls(i);case Pt.ofc:return Kr(i);case Pt.err:return Ue("native_alert",i.data?.text),Ve(String(i.data?.text||"alert").slice(0,120)),Rs(i.data?.text);case Pt.sub:Nr(),Be(),ta(),dt().then(o=>{tn(o?.accountId||null)}).catch(()=>{tn(null)});return}}),chrome.storage.onChanged.addListener((i,o)=>{o==="local"&&(i.profile&&qi(),i.waitPillClock&&Rr(i.waitPillClock.newValue),i.autoCloudflareTick&&(i.autoCloudflareTick.newValue?Ro():qo()))}),l.on(document,"click",i=>{me();let o=i.target.closest(h(s.waitTime));if(o){if(o.dataset.skipClick){delete o.dataset.skipClick;return}qr()}}),l.on(document,"keydown",me),l.on(window,"focus",()=>me({keepConsular:!0})),l.on(document,"visibilitychange",()=>{document.hidden||me({keepConsular:!0})}),Wr(),ks(),Ds(),Ps(),Ls(),qs(),Gs(),Ro();async function t(){!l.alive||k()||!Je()||document.querySelector("#post_select")&&(gt(),await Promise.all([Ei(),Pi(),_o()]),oa({slotIndex:Yn,shouldPick:async()=>await dt()?!0:!!await C("autoSelectFirstDate"),onSlotPicked:()=>Ya()}))}async function e(){!l.alive||k()||!Je()||await Ga()}async function n(){pr(),gr(),await Promise.all([qi(),br(),yr(),Ei(),Pi(),_o()]),vi()}document.readyState==="complete"?n():l.on(window,"load",n),l.setInterval(t,2500),l.setInterval(e,3e4),e()}})();
