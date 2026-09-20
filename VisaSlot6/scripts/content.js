(()=>{function j(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function k(t){return j()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,i]of Object.entries(t))e[n]=i;return e}):Promise.resolve(typeof t=="string"?{}:t)}function T(t){return j()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function Kr(t){return j()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function jr(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",i=>{String(i.reason?.message||i.reason||"").includes("Extension context invalidated")&&(i.preventDefault(),e())});let n=setInterval(()=>{j()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var yt="https://the.gopg.online",to=`${yt}/contribute`,Gr=`${yt}/contribute/telegram`,mf=`${yt}/contribute/human-click`,Rn=`${yt}/contribute/tik-tik-prefs`,Yr=`${yt}/contribute/tik-tik-coord`,Vr=`${yt}/contribute/tik-tik-auth`;var Qr=20,Xr=4320*60*1e3,On=100,Jr=4,Bn=100,Zr=240,ta=50,ea=1440*60*1e3,Zl={recheckButton:!1,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function C(t){return k({[t]:Zl[t]}).then(e=>e[t])}function At(){return k({posts:[]}).then(t=>t.posts)}function be(t){return T({posts:t})}function B(){return k("profile").then(t=>t.profile)}var ie=t=>String(t).padStart(2,"0");function Ye(t){let e=ie(t%60),n=Math.floor(t/60)%60,i=Math.floor(t/3600);return i?`${ie(i)}:${ie(n)}:${e}`:`${ie(n)}:${e}`}function na(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${ie(n.getUTCHours())}:${ie(n.getUTCMinutes())}:${ie(n.getUTCSeconds())}`}}function eo(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),i=t%60,o=[];return e>0&&o.push(`${e}d`),(n>0||e>0)&&o.push(`${n}h`),o.push(`${i}m`),o.join(" ")}function ia(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),i=o=>n.find(a=>a.type===o)?.value??"";return`${i("month")} ${i("day")} ${i("year")} ${i("hour")}:${i("minute")} ${i("dayPeriod")}`}function oa(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),i=parseInt(e[2],10),o=parseInt(e[3],10),a=e[4];a&&(a.toUpperCase()==="PM"&&n<12&&(n+=12),a.toUpperCase()==="AM"&&n===12&&(n=0));let l=new Date;return l.setHours(n,i,o,0),l.getTime()>Date.now()+6e4&&l.setDate(l.getDate()-1),l}var ra=Symbol(),tc=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&j()}on(t,e,n,i){t.addEventListener(e,n,{...i,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!j())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=Jr,interval:n=On}={}){return new Promise(i=>{let o=a=>{if(!this.alive)return;let l=document.querySelector(t);if(l)return i(l);if(a>=e)return i(null);this.setTimeout(()=>o(a+1),n)};o(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},c=new tc;function aa(){let t=globalThis[ra];Object.defineProperty(globalThis,ra,{value:c,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var Nn=new Uint32Array(2);crypto.getRandomValues(Nn);var sa="abcdefghjkmnpqrstuvwxyz",ec=(Nn[0].toString(36)+Nn[1].toString(36)).replace(/[^a-z0-9]/g,""),p=(sa[Nn[0]%sa.length]+ec).slice(0,8).padEnd(8,"x");function h(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var r={selRow:p+"01",anchor:p+"02",waitTime:p+"03",recheck:p+"04",histCont:p+"05",histTbl:p+"06",cdCard:p+"07",cdTime:p+"08",ofcDate:p+"09",styles:p+"10",datesCont:p+"11",datesPara:p+"12",slotsTbl:p+"12b",aiBtn:p+"13",aiPanel:p+"14",aiFrom:p+"15",aiTo:p+"16",aiStatus:p+"17",aiConfirm:p+"18",aiCancel:p+"19",aiClose:p+"20",aiCities:p+"21",aiSubmitBtn:p+"22",aiCitiesBtn:p+"23",aiLogin:p+"24",aiPass:p+"25",aiQ1:p+"26",aiA1:p+"27",aiQ2:p+"28",aiA2:p+"29",aiQ3:p+"30",aiA3:p+"31",aiSaveLogin:p+"32",cfHud:p+"33",aiCitiesAll:p+"34",aiCitiesNone:p+"35",aiLoginToggle:p+"36",aiLoginBody:p+"37",aiProfiles:p+"63",aiProfilesList:p+"64",aiAddProfile:p+"65",aiLoginCancel:p+"66",aiLoginEditorTitle:p+"67",aiSubmitOn:p+"38",aiSubmitOff:p+"39",aiCitiesOn:p+"40",aiCitiesOff:p+"41",aiWinList:p+"42",aiWinAdd:p+"43",aiWinSave:p+"44",aiWinReset:p+"45",aiWinNote:p+"46",aiSubmitSw:p+"47",aiCitiesSw:p+"48",aiInfoBox:p+"49",aiWarnBox:p+"50",aiOkBox:p+"51",aiWinCard:p+"52",aiSubmitBody:p+"53",aiCitiesBody:p+"54",aiTerms:p+"55",aiTermsAgree:p+"56",aiTermsGate:p+"57",aiMain:p+"58",aiTermsContinue:p+"59",aiFromBtn:p+"60",aiToBtn:p+"61",aiCal:p+"62",hud:p+"68",hudName:p+"69",hudVisa:p+"70",hudBody:p+"71",hudHist:p+"72",hudCities:p+"73",hudSecs:p+"74",authGate:p+"75",authBody:p+"76"},s={pill:p+"a",pillTtl:p+"b",pillTmr:p+"c",pillWait:p+"d",pillDone:p+"e",footer:p+"f",card:p+"g",cardTtl:p+"h",histScrl:p+"i",dltDn:p+"j",dltUp:p+"k",cdDiv:p+"l",hidden:p+"m",sideLink:p+"n",datesLnk:p+"o",slotsSum:p+"o2",slotsTbl:p+"o3",aiOn:p+"p",aiRow:p+"q",aiHint:p+"r",aiCities:p+"s",aiOnBtn:p+"t",aiCityAct:p+"x",cfHud:p+"u",cfPulse:p+"v",cfFlash:p+"w",aiEn:p+"y",aiDis:p+"z",aiWinRow:p+"aa",aiFeat:p+"ab",aiSwitch:p+"ac",aiKnob:p+"ad",aiSec:p+"ae",aiInfo:p+"af",aiWarn:p+"ag",aiOk:p+"ah",aiTrash:p+"ai",aiWinHelp:p+"aj",aiInline:p+"ak",aiHead:p+"al",aiTerms:p+"am",aiTermsCb:p+"an",aiTermsList:p+"ao",aiContinue:p+"ap",aiDateBtn:p+"aq",aiCal:p+"ar",aiCalHead:p+"as",aiCalGrid:p+"at",aiCalDay:p+"au",aiCalMuted:p+"av",aiCalOn:p+"aw",aiCalToday:p+"ax",aiQl:p+"ay",aiQlTitle:p+"az",aiQlSub:p+"ba",aiQlCard:p+"bb",aiQlMeta:p+"bc",aiQlBadge:p+"bd",aiQlEdit:p+"be",aiQlAdd:p+"bf",aiQlEmpty:p+"bg",hud:p+"bh",hudHead:p+"bi",hudName:p+"bj",hudVisa:p+"bk",hudBody:p+"bl",hudCount:p+"bm",hudCountLabel:p+"bn",hudSecs:p+"bo",hudStuck:p+"bp",hudSubmit:p+"bq",hudSubmitTitle:p+"br",hudSubmitSub:p+"bs",hudHist:p+"bt",hudHistTitle:p+"bu",hudHistRow:p+"bv",hudPillOk:p+"bw",hudPillNo:p+"bx",hudCities:p+"by",hudCitiesTitle:p+"bz",hudCityLabel:p+"ca",authCard:p+"cb",authSteps:p+"cc",authStep:p+"cd",authStepOn:p+"ce",authEmailBox:p+"cf",authTitle:p+"cg",authOtpRow:p+"ch",authOtpBox:p+"ci",authBtn:p+"cj",authLinks:p+"ck",authLink:p+"cl",authSecure:p+"cm",authClose:p+"cn",authBrand:p+"co",authEmailChip:p+"cp",authPlanList:p+"cq",authPlanRow:p+"cr",authPlanOn:p+"cs",authPlanRadio:p+"ct",authPlanMeta:p+"cu",authPlanName:p+"cv",authPlanDesc:p+"cw",authPlanPrice:p+"cx",authPlanOff:p+"cy"},P={mark:p,w:p+"w",mw:p+"mw"},Ft={req:p+"q",res:p+"r",ofc:p+"o",err:p+"e",sub:p+"s"};function Hn(t){return t.map(e=>String.fromCharCode(e)).join("")}function nc(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function la(){let t=document.createElement("div");return t.className=s.footer,t.textContent=Hn([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function ic(t){let e=document.getElementById(r.histCont);e&&e.remove(),e=document.createElement("div"),e.id=r.histCont,e.className=s.card,e.dataset[P.mark]="";let n=document.createElement("h4");n.className=s.cardTtl,n.textContent=Hn([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let i=document.createElement("div");i.className=s.histScrl;let o=document.createElement("table");o.id=r.histTbl;let a=document.createElement("thead"),l=document.createElement("tr");for(let d of["Time","Est. Wait","Change"]){let m=document.createElement("th");m.textContent=d,l.appendChild(m)}a.appendChild(l),o.appendChild(a);let u=document.createElement("tbody");for(let d=t.length-1;d>=0;d--){let m=t[d],y="--",g="";if(d>0){let $=m.minutes-t[d-1].minutes;$<0?(y=`${$}m`,g=s.dltDn):$>0?(y=`+${$}m`,g=s.dltUp):y="0m"}let x=document.createElement("tr"),w=[[m.timeStr,""],[eo(m.minutes),""],[y,g]];for(let[$,A]of w){let S=document.createElement("td");A&&(S.className=A),S.textContent=$,x.appendChild(S)}u.appendChild(x)}o.appendChild(u),i.appendChild(o),e.appendChild(i),e.appendChild(la());let f=document.getElementById("last-updated");f&&(f.closest("div, p, section")||f.parentElement).insertAdjacentElement("afterend",e)}function oc(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function ca(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),i=oc();if(i!==null&&i>Zr&&!e.textContent.includes("(")){let l=eo(i);e.textContent=`${e.textContent} (${i} minutes / ${l})`}let o=n.textContent.trim().split(" (")[0],a=oa(o);if(a&&c.setInterval(()=>{let l=Math.floor((Date.now()-a)/1e3);l>=0&&(n.textContent=`${o} (${l}s ago)`)},1e3),i!==null){let l=nc(),u=sessionStorage.getItem(l);u||(u=Math.random().toString(36).substring(2,11),sessionStorage.setItem(l,u)),k({queueHistory:{}}).then(f=>{let d=f.queueHistory||{},m=Date.now(),y={};for(let[$,A]of Object.entries(d)){if(!Array.isArray(A))continue;let S=A[A.length-1];S&&m-S.timestamp<ea&&(y[$]=A)}let g=y[u]||[],x=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),w=g[g.length-1];(!w||w.minutes!==i||w.timeStr!==x)&&(g.push({timestamp:m,timeStr:x,minutes:i}),g.length>ta&&g.shift(),y[u]=g,T({queueHistory:y})),ic(g)})}}function ua(t,e){let n=document.getElementById("error_row");if(!n)return;let i;t?i=e?`Blocked for 24 hours, about ${Ye(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":i="Temporarily blocked. Log in in a new tab, then refresh this page.";let o=document.createElement("div");o.className="atlas_validationalert alert alert-danger warning",o.dataset[P.mark]="",o.textContent=i,n.replaceChildren(o),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function da(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&k({cfRetryAfter:null}).then(n=>{let i=parseInt(n.cfRetryAfter,10);if(!isNaN(i)){Kr("cfRetryAfter");let o=document.getElementById("what-happened-section");if(o){let a=document.createElement("div");a.id=r.cdCard,a.className=s.card,a.dataset[P.mark]="";let l=document.createElement("h4");l.className=s.cardTtl,l.textContent=Hn([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),a.appendChild(l);let u=document.createElement("div");u.id=r.cdTime,a.appendChild(u);let f=document.createElement("div");f.className=s.cdDiv,a.appendChild(f),a.appendChild(la()),o.appendChild(a);let d=i,m=null,y=()=>{d>0?(u.textContent=Ye(d),d--):(u.classList.add(s.cdDiv+"-over"),u.textContent="You can try refreshing now!",m!=null&&c.clear(m))};y(),m=c.setInterval(y,1e3)}}})}async function fa(){let t=document.querySelector(".username");if(!t)return;let n=(t.innerText||"").trim().match(/^(.*)\((\d+)\)\s*$/);if(!n)return;let[,i,o]=n,a=await B()||{},l=!a.id||a.id===o||String(a.id).includes(o)?a:{};l.name=i.trim(),l.id=o;let u=document.querySelectorAll("script");for(let f of u){let d=f.innerText.trim();if(d.includes("setAuthenticatedUserContext")){let m=/setAuthenticatedUserContext\('([^']*)'\)/,y=d.match(m);y&&(l.email=y[1])}}await T({profile:l})}async function pa(){let t=document.querySelector("#post_select");if(!t)return;let e=await At();for(let n of t.options){if(!n.value)continue;e.findIndex(o=>o.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await be(e)}var rc=["visa-information","fee-payment","appointment-confirmation"];function ac(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(i=>{let o=i.querySelector(".text-bold");if(!o)return;let a=sc(o.textContent);if(!rc.includes(a))return;let l=lc(i);l&&(n[a]=l)}),Object.keys(n).length?n:null}function sc(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function lc(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function we(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>Xr)return null}catch{}return t.value}function cc(t){let e=(t.posts||[]).filter(o=>o.Updated).sort((o,a)=>o.Updated-a.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},i=we(t.cgiIdToken);return i&&(n.token=i),n}async function Wn(){if(!j()||!await C("serverSync"))return;let t=await k(["profile","posts","cgiIdToken"]),e=cc(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await fetch(to,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(o=>o.json());if(!n.success)return;let i="0";n.contribs>0&&(i=n.contribs.toString()),n.contribs>10&&(i="10+"),n.contribs>0&&await T({contribs:{email:t.profile?.email,updated:Date.now(),count:i}})}catch{}}function no(t=0){j()&&document.querySelector("#appointment-card")&&C("serverSync").then(e=>{if(!e)return;let n=ac();if(!n){t<Qr&&c.setTimeout(()=>no(t+1),On);return}k(["profile","cgiIdToken","savedDashboard"]).then(i=>{let o=we(i.cgiIdToken);o&&JSON.stringify(n)!==JSON.stringify(i.savedDashboard)&&fetch(to,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:i.profile,dashboard:n,token:o})}).then(a=>a.json()).then(a=>{a.success&&T({savedDashboard:n})}).catch(()=>{})})})}var uc=`${yt}/extension-runtime-config.json`,oo="vsRuntimeConfig",dc=300*1e3,io=0,Ve=null,v={slotWindowLabel:":14\u2013:21, :24\u2013:31, :54\u2013:02",slotWindows:[{slot:1,fromMin:0,toMin:2},{slot:2,fromMin:14,toMin:21},{slot:3,fromMin:24,toMin:31},{slot:4,fromMin:54,toMin:59}],windowStartsMin:[0,14,24,54],cityLoadingMaxMs:12e4,cityCalendarNoDatesMs:2e4,cityRotateMinGapMs:15e3,cityRotateMaxGapMs:18e3,cityHoldMaxMs:45e3,homeKeepaliveMinMs:6e5,homeKeepaliveMaxMs:6e5,homeKeepaliveDebounceMs:48e4,loadingStuckMs:6e4,loadingStuckDebounceMs:9e4,remoteVersion:0,source:"bundled"};function Z(t,e,n,i){let o=Number(t);return Number.isFinite(o)?Math.min(n,Math.max(e,Math.round(o))):i}function fc(t){if(!Array.isArray(t)||!t.length||t.length>24)return null;let e=[];for(let n of t){let i=Z(n?.fromMin,0,59,NaN),o=Z(n?.toMin,0,59,NaN);if(!Number.isFinite(i)||!Number.isFinite(o)||i>o)return null;let a=Z(n?.slot,1,12,1);e.push({slot:a,fromMin:i,toMin:o})}return e}function pc(t){let e=[...new Set(t.map(n=>n.fromMin))].sort((n,i)=>n-i);return e.length?e:v.windowStartsMin.slice()}function ma(t,e="remote"){if(!t||typeof t!="object")return!1;let n=fc(t.slotWindows);if(n){v.slotWindows.length=0;for(let i of n)v.slotWindows.push(i);v.windowStartsMin=pc(n)}return typeof t.slotWindowLabel=="string"&&t.slotWindowLabel.length<120&&(v.slotWindowLabel=t.slotWindowLabel),v.cityLoadingMaxMs=Z(t.cityLoadingMaxMs,1e4,3e5,v.cityLoadingMaxMs),v.cityCalendarNoDatesMs=Z(t.cityCalendarNoDatesMs,5e3,12e4,v.cityCalendarNoDatesMs),v.cityRotateMinGapMs=Z(t.cityRotateMinGapMs,5e3,6e4,v.cityRotateMinGapMs),v.cityRotateMaxGapMs=Z(t.cityRotateMaxGapMs,v.cityRotateMinGapMs,9e4,Math.max(v.cityRotateMinGapMs,v.cityRotateMaxGapMs)),v.cityHoldMaxMs=Z(t.cityHoldMaxMs,1e4,18e4,v.cityHoldMaxMs),v.homeKeepaliveMinMs=Z(t.homeKeepaliveMinMs,12e4,18e5,v.homeKeepaliveMinMs),v.homeKeepaliveMaxMs=Z(t.homeKeepaliveMaxMs,v.homeKeepaliveMinMs,18e5,Math.max(v.homeKeepaliveMinMs,v.homeKeepaliveMaxMs)),v.homeKeepaliveDebounceMs=Z(t.homeKeepaliveDebounceMs,6e4,18e5,v.homeKeepaliveDebounceMs),v.loadingStuckMs=Z(t.loadingStuckMs,3e4,6e5,v.loadingStuckMs),v.loadingStuckDebounceMs=Z(t.loadingStuckDebounceMs,3e4,6e5,v.loadingStuckDebounceMs),v.remoteVersion=Z(t.version,0,1e9,v.remoteVersion),v.source=e,!0}async function mc(){try{let e=(await k(oo))[oo];e?.config&&ma(e.config,"cache")}catch{}}async function hc(t){try{await T({[oo]:{config:t,fetchedAt:Date.now()}})}catch{}}async function gc({force:t=!1}={}){let e=Date.now();if(!t&&e-io<dc)return v;if(Ve)return Ve;Ve=(async()=>{await mc();try{let n=await fetch(uc,{method:"GET",cache:"no-store",signal:AbortSignal.timeout(8e3)});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.json();if(!i||typeof i!="object"||Array.isArray(i))throw new Error("bad json");if(i.script||i.code||i.eval)throw new Error("unsafe keys");ma(i,"remote"),await hc(i),io=Date.now()}catch{io=Date.now()}return v})();try{return await Ve}finally{Ve=null}}function ha(){gc().catch(()=>{})}var Ut=null,Qe=null;function ga(){return Ut||v.slotWindows}function oe(){return Qe||(Ut?.length?ya(Ut):v.slotWindowLabel)}var Rf=v.slotWindows,Dt=4,zt=6;function ya(t){return t?.length?t.map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", "):v.slotWindowLabel}function ro(t){if(!Array.isArray(t))return[];let e=[];for(let n of t){if(e.length>=Dt)break;let i=Number(n?.fromMin),o=Number(n?.durationMin??n?.duration);if(!Number.isFinite(i)||i<0||i>59)continue;let a=Math.min(zt,59-i);if(a<1)continue;if(!Number.isFinite(o)||o<1){let u=Number(n?.toMin);if(!Number.isFinite(u)||u<i||u>59||(o=Math.min(a,u-i),o<1))continue}o=Math.min(a,Math.max(1,Math.round(o)));let l=Math.min(59,i+o);e.push({slot:e.length+1,fromMin:Math.round(i),toMin:l,durationMin:o})}return e}function ba(t){let e=ro(t||[]);return e.length?(Ut=e.map(({slot:n,fromMin:i,toMin:o})=>({slot:n,fromMin:i,toMin:o})),Qe=ya(Ut),Ut):(Ut=null,Qe=null,null)}function ao(){Ut=null,Qe=null}function wa(t){let e=t?.length?t:v.slotWindows,n=[];for(let i of e||[]){if(n.length>=Dt)break;let o=Number(i.fromMin),a=Number(i.toMin);if(!Number.isFinite(o)||!Number.isFinite(a)||a<o||o===0&&a<=2&&(e||[]).some(f=>Number(f.fromMin)>=54))continue;let l=Math.min(zt,59-o);if(l<1)continue;let u=Math.min(l,Math.max(1,a-o));n.push({fromMin:o,durationMin:u})}return n}function xa(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=i=>Number(e.find(o=>o.type===i)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function re(t=new Date){let{minute:e}=xa(t),n=ga();for(let i of n)if(e>=i.fromMin&&e<=i.toMin)return i.slot;return 0}function so(t=new Date){if(re(t))return 0;let{minute:e,second:n}=xa(t),i=e*60+n,o=ga(),a=[...new Set(o.map(u=>u.fromMin))].sort((u,f)=>u-f);for(let u of a){let f=u*60;if(i<f)return(f-i)*1e3}let l=a[0]??0;return(3600-i+l*60)*1e3}function _a(){let t=document.querySelector(h(r.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=r.selRow,t.dataset[P.mark]="",n.insertAdjacentElement("afterend",t);let i=document.createElement("span");return i.id=r.anchor,i.dataset[P.mark]="",i.dataset[P.w]=e.style.width,i.dataset[P.mw]=e.style.minWidth,i.hidden=!0,e.insertAdjacentElement("beforebegin",i),c.setStyle(e,"width","100%"),c.setStyle(e,"minWidth","0"),t.appendChild(e),t}var Xe="waitPillState",yc=3600*1e3,Sa=s.pillWait,bc=s.pillDone;function wc(t,e){let n=document.createElement("span");n.className=`${s.pill} ${e}`;let i=(o,a)=>{let l=document.createElement("span");l.className=o,l.textContent=a,n.appendChild(l)};return i(s.pillTtl,t.title),t.timer!==void 0&&i(s.pillTmr,t.timer),n}function xc(t,e=Date.now()){if(t.kind==="waiting")return{variant:Sa};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:Sa}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:bc}}return null}function Sc(t,e,n=new Date){let i=na(n);return t.seconds===void 0?{title:i}:{title:i,timer:Ye(t.seconds)}}var vc=class{#t=null;#e={kind:"idle"};#i=null;#n=null;#o=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get(Xe))[Xe];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>yc){chrome.storage.local.remove(Xe);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#o=t,this.#r(),this.#l()}toggleClockMode(){c.alive&&(this.setClockMode(!this.#o),chrome.storage.local.set({waitPillClock:this.#o}))}render(t){return xc(this.#e,t)}#c(t){return Sc(t,this.#o,new Date)}#r(){if(this.#t??=kc(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(s.hidden);return}this.#t.classList.remove(s.hidden),this.#t.replaceChildren(wc(this.#c(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#i&&(c.clear(this.#i),this.#i=null),t.kind==="running"?(chrome.storage.local.set({[Xe]:t}),this.#i=c.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove(Xe),this.#r(),this.#l()}#u(){this.#r(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,C("audioAlert").then(t=>{t&&Lc()})))}#l(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=c.setInterval(()=>this.#r(),1e3):!t&&this.#n&&(c.clear(this.#n),this.#n=null)}},$e=new vc,nn="pillPosition",va=4;function $a(t,e,n){return Math.max(e,Math.min(n,t))}function Ma(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,i=e.height>0?e.height:36;return{w:n,h:i}}function xe(t,e,n){let{w:i,h:o}=Ma(t),a=$a(e,0,Math.max(0,window.innerWidth-i)),l=$a(n,0,Math.max(0,window.innerHeight-o));return t.style.setProperty("left",a+"px","important"),t.style.setProperty("top",l+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:a,top:l}}function $c(t){var e=!1,n=!1,i=0,o=0,a=0,l=0;function u(d){if(e){var m=d.touches?d.touches[0]:d,y=m.clientX-i,g=m.clientY-o;!n&&Math.abs(y)<va&&Math.abs(g)<va||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",xe(t,a+y,l+g),d.cancelable&&d.preventDefault())}}function f(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",f),document.removeEventListener("touchmove",u),document.removeEventListener("touchend",f),n){let d=t.getBoundingClientRect();chrome.storage.local.set({[nn]:{top:Math.round(d.top),left:Math.round(d.left)}})}n=!1}}t.addEventListener("mousedown",function(d){if(d.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let m=t.getBoundingClientRect();i=d.clientX,o=d.clientY,a=m.left,l=m.top,xe(t,m.left,m.top),document.addEventListener("mousemove",u),document.addEventListener("mouseup",f),d.preventDefault(),d.stopPropagation()}),t.addEventListener("touchstart",function(d){e=!0,n=!1,delete t.dataset.skipClick;let m=t.getBoundingClientRect();i=d.touches[0].clientX,o=d.touches[0].clientY,a=m.left,l=m.top,xe(t,m.left,m.top),document.addEventListener("touchmove",u,{passive:!1}),document.addEventListener("touchend",f)},{passive:!0})}function kc(){let t=document.querySelector(h(r.waitTime));return t||(t=document.createElement("div"),t.id=r.waitTime,t.className=s.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),$c(t),chrome.storage.local.get(nn).then(e=>{let n=e[nn];n&&typeof n.top=="number"&&typeof n.left=="number"&&xe(t,n.left,n.top)}),Mc(t),t)}function ka(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function Cc(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function Tc(t){let{w:e,h:n}=Ma(t),i=12;return[{left:i,top:i},{left:Math.max(i,window.innerWidth-e-i),top:i},{left:i,top:Math.max(i,window.innerHeight-n-i)},{left:Math.max(i,window.innerWidth-e-i),top:Math.max(i,window.innerHeight-n-i)}]}async function _c(){let e=(await chrome.storage.local.get(nn))[nn];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function Mc(t){let e=!1,n=async()=>{if(!c.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(s.hidden))return;let i=Cc(),o=!!(i&&i.offsetParent!==null&&i.getBoundingClientRect().height>20),a=t.getBoundingClientRect();if(o&&ka(a,i.getBoundingClientRect())){let l=i.getBoundingClientRect(),u=Tc(t),f=u.find(d=>{let m={left:d.left,top:d.top,right:d.left+a.width,bottom:d.top+a.height};return!ka(m,l)})||u[2];e=!0,t.setAttribute("data-dodging",""),xe(t,f.left,f.top);return}if(e&&!o){e=!1,t.removeAttribute("data-dodging");let l=await _c();l&&xe(t,l.left,l.top)}else o||t.removeAttribute("data-dodging")};c.setInterval(n,400),c.on(window,"resize",n)}async function fo(){if(!c.alive||!await C("defaultWaitTime")||!await c.waitFor("#post_select",{attempts:Bn}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});$e.setClockMode(t),await $e.restore()}async function Aa(){await C("defaultWaitTime")&&$e.waiting()}async function Vn(t){await C("defaultWaitTime")&&$e.run(t)}function Da(){$e.toggleClockMode()}function Pa(t){$e.setClockMode(t)}var Je=null,Ze=null,Fn=null;function po(){return Fn||(Fn=new(window.AudioContext||window.webkitAudioContext),c.disposable(()=>Fn?.close())),Fn}async function Qn(t=150){try{let e=po();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let o=e.currentTime,a=t/1e3;i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(.1,o+.01),i.gain.setValueAtTime(.1,o+Math.max(.01,a-.02)),i.gain.linearRampToValueAtTime(0,o+a),n.start(),n.stop(o+a)}catch(e){console.error("Audio beep failed:",e)}}function Xn(t,e=125,n=125){let i=0,o=()=>{i>=t||(Qn(e),i++,c.setTimeout(o,e+n))};o()}var lo=4,Ca=50,Ta=50,Ac=600;function Ea(){if(Ze)return;let t=()=>{Xn(lo,Ca,Ta);let e=lo*Ca+(lo-1)*Ta;Ze=c.setTimeout(t,e+Ac)};t()}var Dc=250,Pc=10,Ec=300,Ic=1e3;function Lc(){if(Je)return;let t=[];for(let o=0;o<=Ec;o+=Pc)t.push(o);let e=Date.now(),n=0,i=()=>{let o=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&o>=t[n];){let a=n===t.length-1;Qn(a?Ic:Dc),n++}if(n<t.length){let a=t[n],l=e+a*1e3,u=Math.max(0,l-Date.now());Je=c.setTimeout(i,u)}else ke()};i()}function ke(t={}){let e=!!t.keepConsular;Je&&(c.clear(Je),Je=null),Ze&&(c.clear(Ze),Ze=null),co(),e||uo()}var Un=null,zn=null,Se=null,Kn=null,tn=null;async function Ia(){co();try{let t=po();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),a=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=880,i.frequency.value=1320,o.gain.value=.85,a.gain.value=.65,n.connect(o).connect(e),i.connect(a).connect(e);let l=t.createOscillator(),u=t.createGain();l.type="triangle",l.frequency.value=3.2,u.gain.value=280,l.connect(u),u.connect(n.frequency),u.connect(i.frequency);let f=t.currentTime;n.start(f),i.start(f),l.start(f),Se={osc1:n,osc2:i,lfo:l,master:e};let d=()=>{Se&&(Qn(500),zn=c.setTimeout(d,1800))};d(),Un=c.setTimeout(co,12e4),tn=document.title;let m=!1,y=()=>{Se&&(document.title=m?tn:"!!! SUBMIT CLICKED !!!",m=!m,Kn=c.setTimeout(y,450))};y()}catch(t){console.error("Submit alarm failed:",t)}}function co(){if(Un&&(c.clear(Un),Un=null),zn&&(c.clear(zn),zn=null),Kn&&(c.clear(Kn),Kn=null),tn&&(document.title=tn,tn=null),Se){try{let{osc1:t,osc2:e,lfo:n}=Se;t.stop(),e.stop(),n.stop()}catch{}Se=null}}function qc(){let t=location.pathname||"";return/\/ofc-schedule\b/i.test(t)?!1:/\/(schedule|c-schedule)\b/i.test(t)}var Rc=6e4,jn=null,Gn=null,Yn=null,en=null,ve=null;async function Oc(){uo();try{let t=po();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),a=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=980,i.frequency.value=1470,o.gain.value=.95,a.gain.value=.8,n.connect(o).connect(e),i.connect(a).connect(e);let l=t.createOscillator(),u=t.createGain();l.type="square",l.frequency.value=4,u.gain.value=320,l.connect(u),u.connect(n.frequency),u.connect(i.frequency);let f=t.currentTime;n.start(f),i.start(f),l.start(f),ve={osc1:n,osc2:i,lfo:l,master:e};let d=()=>{ve&&(Qn(650),Gn=c.setTimeout(d,900))};d(),jn=c.setTimeout(uo,Rc),en=document.title;let m=!1,y=()=>{ve&&(document.title=m?en:"!!! OFC BOOKED \u2014 CONSULAR PAGE !!!",m=!m,Yn=c.setTimeout(y,400))};y()}catch(t){console.error("Consular OFC alarm failed:",t)}}function uo(){if(jn&&(c.clear(jn),jn=null),Gn&&(c.clear(Gn),Gn=null),Yn&&(c.clear(Yn),Yn=null),en&&(document.title=en,en=null),ve){try{let{osc1:t,osc2:e,lfo:n}=ve;t.stop(),e.stop(),n.stop()}catch{}ve=null}}function La(){if(qc()){try{let t="vsConsularOfcBeep";if(sessionStorage.getItem(t)==="1")return;sessionStorage.setItem(t,"1")}catch{}Oc()}}function Bc(){document.querySelector(h(r.recheck))?.remove();for(let t of document.querySelectorAll("button"))(t.textContent||"").trim()==="Recheck"&&t.remove()}async function mo(){c.alive&&Bc()}async function go(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await c.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let i=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(u=>u.innerText.trim()===i))continue;let a=document.createElement("li");a.className="usa-sidenav__item",a.dataset[P.mark]="";let l=document.createElement("a");l.href=n.link,l.className=s.sideLink,l.target="_self",l.textContent=n.text,a.appendChild(l),t.appendChild(a)}}function N(t,e,n){let i=document.createElement(t);return e&&(i.className=e),n?.appendChild(i),i}function Jn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,a]=n;return`${a}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return null}function ho(t){let e=Jn(t);if(!e)return String(t||"");let[n,i,o]=e.split("-").map(Number);if(!n||!i||!o)return e;try{return new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(new Date(n,i-1,o))}catch{return e}}function Nc(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);if(n)return n[1].slice(0,5);let i=e.match(/^(\d{1,2}:\d{2})/);return i?i[1]:e}function qa(t){let e=document.querySelector(h(r.datesCont));if(e){let o=e.querySelector(h(r.datesPara)),a=e.querySelector("h2");if(a&&t&&(a.textContent=t),o)return{container:e,details:o}}let n=document.querySelector("#page_form");if(!n)return null;e?.remove();let i=Hc(t||"");return n.appendChild(i.container),i}function Ra(t){if(t.response.HasError)return;let e=document.querySelector("#post_select"),n=e?.options[e.selectedIndex]?.text??"",i=(t.response.ScheduleDays||[]).map(d=>Jn(d?.Date)).filter(Boolean).sort((d,m)=>d.localeCompare(m));document.querySelector(h(r.datesCont))?.remove();let o=qa(n);if(!o)return;let{details:a}=o;a.replaceChildren();let l=N("div",s.slotsSum,a);if(!i.length){l.textContent="No slots available";return}l.textContent=`${i.length} date${i.length===1?"":"s"} available`;let u={};for(let d of i){let m=d.slice(0,7);(u[m]||=[]).push(d)}for(let[d,m]of Object.entries(u)){let y=N("div",null,a),g=document.createElement("strong");g.textContent=d,y.append(g,`: ${m.map(x=>x.slice(8,10)).join(", ")}`)}let f=N("div",null,a);f.style.marginTop="0.5em";for(let d of i){let m=N("div",null,f);m.textContent=`\u2022 ${ho(d)} (${d})`}}function Oa(t,e,n){let i=document.querySelector("#post_select"),o=n||i?.options[i.selectedIndex]?.text||"",a=Jn(e)||Jn(t?.[0]?.Date)||"",l=(t||[]).filter(S=>S&&S.Time).map(S=>({time:Nc(S.Time),avail:S.EntriesAvailable!=null&&Number.isFinite(Number(S.EntriesAvailable))?Number(S.EntriesAvailable):null,raw:S})).sort((S,K)=>String(S.time).localeCompare(String(K.time))),u=qa(o);if(!u)return;let{details:f}=u;f.replaceChildren();let d=N("div",s.slotsSum,f);if(!l.length){d.textContent=a?`No time slots on ${ho(a)}`:"No time slots available";return}let m=l.filter(S=>S.avail==null||S.avail>0),y=m.reduce((S,K)=>S+(K.avail||0),0),g=a?ho(a):"selected date";if(d.textContent=y>0?`${m.length} time slot${m.length===1?"":"s"} on ${g} \xB7 ${y} available`:`${l.length} time slot${l.length===1?"":"s"} on ${g}`,a){let S=N("div",null,f);S.style.margin="0.35em 0 0.6em",S.textContent=`Date: ${g} (${a})`}let x=N("table",s.slotsTbl,f);x.id=r.slotsTbl;let w=N("thead",null,x),$=N("tr",null,w);for(let S of["Time","Availability"]){let K=N("th",null,$);K.textContent=S}let A=N("tbody",null,x);for(let S of l){let K=N("tr",null,A);S.avail===0&&(K.style.opacity="0.55");let Mt=N("td",null,K);Mt.textContent=S.time;let D=N("td",null,K);D.textContent=S.avail==null?"\u2014":String(S.avail)}}function Hc(t){let e=N("div","row");e.id=r.datesCont;let n=N("div","col-sm-12 atlas_section mt-3",e),i=N("div","col-sm-12 atlas_section_header_row",N("div","row",n));N("h2",null,i).textContent=t;let o=N("div",null,N("div","col-sm-12",N("div","row",n)));return o.id=r.datesPara,{container:e,details:o}}var Ba=null;function Wc(){let t=document.querySelector(h(r.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return c.setStyle(n,"display","flex"),c.setStyle(n,"alignItems","center"),c.setStyle(n,"justifyContent","flex-end"),c.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=r.ofcDate,t.dataset[P.mark]="",e.insertAdjacentElement("beforebegin",t),t}function Fc(){if(!location.pathname.includes("/schedule"))return;let t=Ba;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=Wc();n&&(n.textContent=`OFC (Estimate): ${ia(e.appointmentDateStr)}`)}function Na(t){chrome.runtime?.id&&(Ba=t.data.data,c.waitFor("#submitbtn").then(e=>{e&&Fc()}))}var Zn=new Map,Ha=45e3,ti=new Map,Wa=8e3,Fa=0;function ei(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function ni(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function Uc(t,e){return`${t}:${e.slice(0,5).join(",")}`}function zc(t){let e=Date.now(),n=Zn.get(t);if(n&&e-n<Ha)return!1;Zn.set(t,e);for(let[i,o]of Zn)e-o>Ha*4&&Zn.delete(i);return!0}function Kc(t){let e=Date.now(),n=ti.get(t);if(n&&e-n<Wa)return!1;ti.set(t,e);for(let[i,o]of ti)e-o>Wa*6&&ti.delete(i);return!0}async function Ua(){return await C("telegramViaServer")!==!1}async function za(t,{kind:e="alert",dedupKey:n="",skipDedup:i=!1,notifyMuktesh:o=!0}={}){if(t&&await Ua())try{await fetch(Gr,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:i,notify_muktesh:o}),signal:AbortSignal.timeout(2e4)})}catch{}}function jc(t,{kind:e="screen",dedupKey:n="",waitMs:i=0,skipDedup:o=!1,notifyMuktesh:a=!0}={}){c.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:i,skipDedup:o,notifyMuktesh:a,captureScreenshot:!0})}async function Gc(t,e,n){let i=ei(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),a=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&a.push(`\u{1FAAA} <b>Visa:</b> ${n}`),a.push(`\u{1F550} <b>Checked:</b> ${o} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),a.push(`\u{1F4C6} <b>Dates (${i.length}):</b>`,"");for(let l of i.slice(0,30))a.push(`\u{1F7E2} <b>${ni(l)}</b>`);return i.length>30&&a.push("",`\u2795 <i>+${i.length-30} more dates</i>`),a.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),a.join(`
`)}function Yc(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",i=document.querySelector("#datepicker")?.value||"\u2014",a=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:i,time:a}}async function Ka(t,{postId:e,postName:n,hasError:i}={}){if(i||!t?.length)return;let o=ei(t);if(!o.length||!await C("telegramAlert"))return;let a=Uc(e||n||"unknown",o);if(!zc(a))return;let l=await B(),u=await Gc(n,t,l?.visa||"");await za(u,{kind:"slots",dedupKey:a,notifyMuktesh:!0})}function Vc(t,e,n){let i=ei(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),a=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
\u{1F3DB}\uFE0F ${a}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`;if(i.length){let l=i.slice(0,5).map(u=>ni(u)).join(", ");return`<b>DATES AVAILABLE</b>
\u{1F3DB}\uFE0F ${a}
\u{1F4C6} ${i.length} date(s)
${l}${i.length>5?"\u2026":""}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}return`<b>City changed \u2014 no dates</b>
\u{1F3DB}\uFE0F ${a}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}function Qc(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=e?ni(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${i}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function Xc(t,e,n){let i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?ni(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u23F0 ${n} slot(s)
\u{1F550} ${i} IST
\u{1F4F2} Visa Slot 6`}async function Ce(t,{kind:e="screen",dedupKey:n,waitMs:i=0,skipDedup:o=!1}={}){if(await C("telegramScreenshots")===!1||!await Ua())return;let a=n||`${e}:${String(t).slice(0,80)}`;!o&&!Kc(a)||jc(t,{kind:e,dedupKey:a,waitMs:i,skipDedup:o,notifyMuktesh:!0})}async function ja(t,{postId:e,postName:n,hasError:i}={}){let o=Vc(n,t,i),a=ei(t),l=a.length?"dates":"city";await Ce(o,{kind:l,dedupKey:`${l}:${e||n}:${a.length}:${i?1:0}`,waitMs:a.length?1400:900})}async function Ga(t,e){await Ce(Qc(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function Ya(t,e,n){await Ce(Xc(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function Va(){let t=Date.now();if(t-Fa<8e3)return;Fa=t;let e=await B(),{city:n,date:i,time:o}=Yc(),a=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),l=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${i}`,`\u23F0 <b>Time:</b> ${o}`];e?.email&&l.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&l.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),l.push(`\u{1F550} <b>When:</b> ${a} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let u=l.join(`
`);await za(u,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await Ce(u,{kind:"submit",skipDedup:!0,waitMs:200})}var oi=25;function ri(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function wo(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let i=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,i),n-1)}function Qa(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function Xa(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function So(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function yo(t){if(t)try{t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}}function ii(t){if(t)try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}}function xo(t){if(!t||t.disabled)return!1;try{if(t.tagName==="SELECT")return!t.value||t.value==="0"?!1:(yo(t),t.value&&t.value!=="0"?!0:(ii(t),!!(t.value&&t.value!=="0")));if(t.type==="radio"||t.type==="checkbox"){if(t.name)for(let i of document.getElementsByName(t.name))i!==t&&(i.checked=!1);if(t.checked=!0,yo(t),t.checked)return!0;let e=t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,n=t.closest("tr");for(let i of[e,t.closest("label"),t,n].filter(Boolean))ii(i);return t.checked=!0,yo(t),t.checked===!0}ii(t)}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function Ja(){let t=new Set,e=[],n=i=>{if(!i||t.has(i)||So(i)||i.disabled)return;let o=i.closest("tr");o&&Xa(o)||(t.add(i),e.push(i))};for(let i of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let o of document.querySelectorAll(`${i}:not([disabled])`))n(o);return e}function Jc(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!Qa(n)||Xa(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function Zc(t,e){for(let n of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(n.tagName!=="SELECT"||n.disabled||So(n))continue;let i=[...n.options].filter(l=>!l.disabled&&l.value&&l.value!=="0"&&Qa({textContent:l.textContent}));if(!i.length)continue;let o=null,a=ri(e);if(a&&a!=="00:00"&&(o=i.find(l=>(l.textContent||"").includes(a))||null,!o)){let l=a.match(/(\d{1,2}:\d{2})/);l&&(o=i.find(u=>(u.textContent||"").includes(l[1]))||null)}if(!o){let l=wo(i.length,t);o=i[l]}if(o&&(n.value=o.value,xo(n)))return!0}return!1}function tu(t,e){if(Zc(t,e))return!0;let n=Ja();if(n.length){let o=null,a=ri(e);if(a&&a!=="00:00"&&(o=n.find(l=>{let u=(l.closest("tr")?.textContent||l.textContent||"").replace(/\s+/g," ");return u.includes(a)||u.includes(a.slice(0,5))})||null),!o){let l=wo(n.length,t);o=n[l]}if(o&&xo(o))return!0}let i=Jc();if(i.length){let o=null,a=ri(e);if(a&&a!=="00:00"&&(o=i.find(f=>(f.textContent||"").includes(a))||null),!o){let f=wo(i.length,t);o=i[f]}if(!o)return!1;let l=o.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(l&&xo(l))return!0;let u=o.querySelector("label");if(u)return ii(u),!!o.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function tt(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!So(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function eu({slotIndex:t=0,maxMs:e=12e3,pollMs:n=oi,time:i,onTick:o}={}){let a=Date.now()+e,l=Math.max(10,n||25);return new Promise(u=>{let f=()=>{if(!c.alive)return u(!1);if(o?.(),tu(t,i)||tt())return u(!0);if(Date.now()>=a)return u(!1);c.setTimeout(f,l)};f()})}function on({time:t,date:e,slotIndex:n,pollMs:i,maxMs:o}){let a=n??0,l=o||15e3,u=i||oi;return c.send({action:"forcePickTimeSlot",slotIndex:a,maxMs:l,pollMs:u}),c.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:a,pollMs:u,domWaitMs:0,maxMs:l}),eu({slotIndex:a,maxMs:l,pollMs:u,time:t||"00:00"})}var bo=!1;function Za({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(bo)return;bo=!0;let i=!1,o=async()=>{if(!(!c.alive||i)){if(tt()){n?.();return}try{if(t&&!await t())return}catch{return}Ja().length&&(i=!0,await on({slotIndex:e,time:"00:00",maxMs:800,pollMs:oi}),i=!1,tt()&&n?.())}};c.setInterval(o,oi);let a=document.querySelector("#page_form")||document.body,l=new MutationObserver(()=>o());l.observe(a,{childList:!0,subtree:!0}),c.disposable(()=>{l.disconnect(),bo=!1})}function ts(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let i=ri(n?.Time);if(!i)continue;let o=i.match(/(\d{1,2}):(\d{2})/);if(!o)continue;let[,a,l]=o;if(e.includes(`${a}:${l}`)||e.includes(`${parseInt(a,10)}:${l}`))return!0}return!1}var ai="submitErrors",es=50,nu=45e3,is=0,vo=new Set,rn=null,os=null;function rs(t){os=typeof t=="function"?t:null}function iu(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",i=document.querySelector("#datepicker")?.value||"";return{city:e,date:i,url:location.href}}function an(){is=Date.now()+nu,vo.clear(),cu()}function si(){return Date.now()<is}function ou(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function ru(t){let e=await k({[ai]:[]}),n=Array.isArray(e[ai])?e[ai]:[];n.push(t),n.length>es&&n.splice(0,n.length-es),await T({[ai]:n})}function ns(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function au(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${ns(t.source)}`,`\u{1F4AC} <b>Message:</b> ${ns(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let i=n.join(`
`);await Ce(i,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function sn(t,e,n={}){let i=String(e||"").trim();if(!i||!si()&&!n.force)return;let o=ou(t,i);if(vo.has(o))return;vo.add(o);let a=iu(),l=await B(),u={at:Date.now(),source:String(t||"unknown"),message:i.slice(0,2e3),city:n.city||a.city,date:n.date||a.date,url:n.url||a.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:l?.email||""};await ru(u);try{await au(u)}catch{}try{os?.(u)}catch{}}function su(t){if(!si())return;let e=t?.status,n=t?.retryAfter,i=t?.cgiBlock,o=`Request failed (HTTP ${e||"?"})`;n!=null&&(o+=` \u2014 retry after ${n}s`),i&&(o+=" \u2014 CGI access limitation"),sn("ajax_error",o,{status:e})}function as(t){if(!si()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){su({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",o=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";sn("ajax_response",o,{route:t.tail||""})}var lu=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function cu(){rn&&c.clear(rn);let t=()=>{if(!c.alive||!si()){rn=null;return}for(let e of lu)for(let n of document.querySelectorAll(e)){let i=(n.textContent||"").replace(/\s+/g," ").trim();!i||i.length<4||sn("page_validation",i)}rn=c.setTimeout(t,600)};rn=c.setTimeout(t,500)}var ln=0,ss="",ls=0;async function uu(){let[t,e]=await Promise.all([B(),k(["cgiIdToken"])]),n=we(e.cgiIdToken);return{profile:t,token:n}}async function cs(t){if(!j()||!await C("serverSync"))return null;let{profile:e,token:n}=await uu();if(!e?.id&&!e?.email)return null;try{let i={...t,profile:e};n&&(i.token=n);let o=await fetch(Yr,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i),signal:AbortSignal.timeout(2500)}).then(a=>a.json());return o&&o.success?o:null}catch{return null}}async function $o({postId:t,postName:e,dayCount:n,dateFrom:i=null,dateTo:o=null,bestDate:a=null,rangeFrom:l=null,rangeTo:u=null}={}){let f=String(t||"").trim(),d=Number(n)||0;if(!f||d<1)return null;let m=String(a||i||"").slice(0,10),y=`${f}:${d}:${m}`,g=Date.now();if(y===ss&&g-ls<250)return null;ss=y,ls=g;let x=await cs({action:"alert",city:{id:f,name:String(e||f).trim()},dayCount:d,dateFrom:i||l||m||null,dateTo:o||u||m||null,bestDate:m||null,rangeFrom:l||null,rangeTo:u||null});return x?.alertId&&(ln=Math.max(ln,Number(x.alertId)||0)),x}async function us({preferredCities:t=[],citiesEnabled:e=!1,currentCityId:n="",dateFrom:i=null,dateTo:o=null}={}){if(!e||!t?.length)return null;let l=(await cs({action:"poll",preferredCities:t,citiesEnabled:!0,currentCityId:String(n||""),lastAlertId:ln,dateFrom:i||null,dateTo:o||null}))?.forceCity;return!l?.id||!l?.alertId?null:l}function li(t){let e=Number(t)||0;e>ln&&(ln=e)}var ci="tikTikSession",ko="tikTikDeviceId",ui="tikTikPendingOtp",et=!1,se=null,Pt=null,ae=null,Kt="",Me=!1;function Co(){return et}function ds(t){se=t}function fs(t){Pt=t}async function Ae(){let e=(await k(ko))[ko];return e||(e=crypto.randomUUID(),await T({[ko]:e})),String(e).slice(0,64)}async function pi(){return(await k(ci))[ci]||null}async function du(t,e){await T({[ci]:{token:t,email:e}})}async function To(){await T({[ci]:null})}async function ps(t){Kt=t,Me=!0,await T({[ui]:{email:t,awaitingOtp:!0,sentAt:Date.now()}})}async function De(){Me=!1,await T({[ui]:null})}async function ms(){let e=(await k(ui))[ui];return!e?.awaitingOtp||!e?.email?(Me=!1,null):Date.now()-Number(e.sentAt||0)>30*6e4?(await De(),null):(Kt=String(e.email),Me=!0,e)}async function _o(){try{let t=await B();return t?.id?String(t.id):""}catch{return""}}async function Pe(t){let e=await fetch(Vr||`${yt}/contribute/tik-tik-auth`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),signal:AbortSignal.timeout(2e4)}),n=await e.json().catch(()=>({}));return!e.ok&&!n.error&&(n.error="Something went wrong. Try again."),n}async function Mo(){let t=await pi();return t?.token?Pe({action:"status",token:t.token,deviceId:await Ae(),applicantId:await _o()}):{loggedIn:!1,access:!1}}async function un(){let t=await Mo();return t.kicked?(await To(),et=!1,Pt&&Pt(""),Po(),{ok:!1,message:""}):t.loggedIn?t.access?(et=!0,{ok:!0,message:""}):(et=!1,{ok:!1,message:""}):(et=!1,{ok:!1,message:""})}function hs(){return document.querySelector(h(r.authBody))}function R(t,e){let n=document.querySelector(h(r.authBody)+" [data-auth-msg]");n&&(n.textContent=t||"",n.style.color=e?"#9a3412":"#334155")}function _e(t){return String(t||"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e])}function Ao(t){return t?.plan?t.plan==="applicant"?!!t.applicantId:t.planEnds?new Date(t.planEnds).getTime()>Date.now():!1:!1}function gs(t){return t?.plan?t.plan==="trial"?"\u20B91 \xB7 3-day trial":t.plan==="month"?"\u20B92999 \xB7 30 days":t.plan==="applicant"?`\u20B9300 \xB7 applicant ${t.applicantId||""}`:t.plan:""}function Te(t){return t==="trial"?1:t==="applicant"?2:t==="month"?3:0}function fu(t){return Ao(t)?Te(t.plan)<Te("month"):!1}function mi(t){let e=hs();e&&(e.innerHTML=t)}function bt(t,e,n){let i=document.querySelector(t);i&&c.on(i,e,n)}async function cn(t){et=!1,mi(`
    <div class="${s.authCard}">
      <button type="button" id="${r.authBody}-close" class="${s.authClose}">Close</button>
      <div class="${s.authSteps}">
        <div class="${s.authStep} ${s.authStepOn}"><span>1</span> Enter Email</div>
        <div class="${s.authStep}"><span>2</span> Enter OTP</div>
      </div>
      <div class="${s.authTitle}">Enter Email</div>
      <div class="${s.aiHint}" style="margin:0 0 4px">We will send a 4-digit OTP to your email.</div>
      <input id="${r.authBody}-email" type="email" placeholder="Email" autocomplete="off" />
      <button type="button" id="${r.authBody}-send" class="${s.authBtn}">Send OTP</button>
      <div class="${s.authSecure}">Your data is secure and encrypted.</div>
      <div data-auth-msg class="${s.aiHint}" style="margin-top:8px"></div>
    </div>
  `),Io();let e=document.querySelector(h(`${r.authBody}-email`));e&&Kt&&(e.value=Kt),R(t||"",!!t),bt(h(`${r.authBody}-send`),"click",async i=>{i?.preventDefault?.(),i?.stopPropagation?.();let o=String(e?.value||"").trim();if(!o||!o.includes("@")){R("Enter a valid email.",!0);return}Kt=o,R("Sending OTP\u2026",!1);let a=await Pe({action:"send",email:o,deviceId:await Ae()});if(!a.success&&!a.sent){R(a.error||"Could not send the OTP.",!0);return}await ps(o),di(o,"")}),e&&(c.on(e,"pointerdown",i=>i.stopPropagation()),c.on(e,"keydown",i=>{i.key==="Enter"&&(i.preventDefault(),document.querySelector(h(`${r.authBody}-send`))?.click())}));let n=document.querySelector(h(`${r.authBody}-send`));n&&c.on(n,"pointerdown",i=>i.stopPropagation()),se&&se()}function di(t,e){if(document.querySelector(h(`${r.authBody}-otpRow`))&&Me&&Kt===t){e&&R(e,!1);return}mi(`
    <div class="${s.authCard}">
      <button type="button" id="${r.authBody}-close" class="${s.authClose}">Close</button>
      <div class="${s.authSteps}">
        <div class="${s.authStep}"><span>1</span> Enter Email</div>
        <div class="${s.authStep} ${s.authStepOn}"><span>2</span> Enter OTP</div>
      </div>
      <div class="${s.authEmailBox}">
        <span>${_e(t)}</span>
        <button type="button" id="${r.authBody}-back">Change</button>
      </div>
      <div class="${s.authTitle}">Enter OTP</div>
      <div class="${s.aiHint}" style="margin:0">We've sent a 4-digit code to your email.</div>
      <div id="${r.authBody}-otpRow" class="${s.authOtpRow}">
        <input id="${r.authBody}-d0" class="${s.authOtpBox}" inputmode="numeric" maxlength="1" autocomplete="one-time-code" />
        <input id="${r.authBody}-d1" class="${s.authOtpBox}" inputmode="numeric" maxlength="1" />
        <input id="${r.authBody}-d2" class="${s.authOtpBox}" inputmode="numeric" maxlength="1" />
        <input id="${r.authBody}-d3" class="${s.authOtpBox}" inputmode="numeric" maxlength="1" />
      </div>
      <button type="button" id="${r.authBody}-go" class="${s.authBtn}">Verify OTP</button>
      <div class="${s.authLinks}">
        <button type="button" id="${r.authBody}-resend" class="${s.authLink}">Resend OTP</button>
        <button type="button" id="${r.authBody}-back2" class="${s.authLink}">Change email</button>
      </div>
      <div class="${s.authSecure}">Your data is secure and encrypted.</div>
      <div data-auth-msg class="${s.aiHint}" style="margin-top:8px"></div>
    </div>
  `),Io(),R(e||"",!1);let i=f=>document.querySelector(h(`${r.authBody}-d${f}`)),o=()=>[0,1,2,3].map(f=>String(i(f)?.value||"").replace(/\D/g,"")).join(""),a=()=>{for(let f=0;f<4;f++){let d=i(f);d&&(d.value="")}i(0)?.focus()},l=f=>{let d=String(f||"").replace(/\D/g,"").slice(0,4).split("");for(let y=0;y<4;y++){let g=i(y);g&&(g.value=d[y]||"")}let m=Math.min(d.length,3);i(d.length>=4?3:m)?.focus()},u=async()=>{await De(),cn("")};for(let f=0;f<4;f++){let d=i(f);d&&(c.on(d,"pointerdown",m=>m.stopPropagation()),c.on(d,"input",()=>{let m=String(d.value||"").replace(/\D/g,"");if(m.length>1){l(m),o().length===4&&document.querySelector(h(`${r.authBody}-go`))?.click();return}d.value=m.slice(0,1),m&&f<3&&i(f+1)?.focus(),o().length===4&&document.querySelector(h(`${r.authBody}-go`))?.click()}),c.on(d,"keydown",m=>{if(m.key==="Backspace"&&!d.value&&f>0){i(f-1)?.focus();return}m.key==="ArrowLeft"&&f>0&&(m.preventDefault(),i(f-1)?.focus()),m.key==="ArrowRight"&&f<3&&(m.preventDefault(),i(f+1)?.focus()),m.key==="Enter"&&(m.preventDefault(),document.querySelector(h(`${r.authBody}-go`))?.click())}),c.on(d,"paste",m=>{m.preventDefault();let y=(m.clipboardData||window.clipboardData)?.getData("text")||"";l(y),o().length===4&&document.querySelector(h(`${r.authBody}-go`))?.click()}))}i(0)?.focus(),bt(h(`${r.authBody}-back`),"click",f=>{f?.stopPropagation?.(),u()}),bt(h(`${r.authBody}-back2`),"click",f=>{f?.stopPropagation?.(),u()}),bt(h(`${r.authBody}-resend`),"click",async f=>{f?.preventDefault?.(),f?.stopPropagation?.();let d=document.querySelector(h(`${r.authBody}-resend`));d&&(d.disabled=!0),R("Sending a new OTP\u2026",!1);let m=await Pe({action:"send",email:t,deviceId:await Ae()});if(d&&(d.disabled=!1),!m.success&&!m.sent){R(m.error||"Could not resend. Try again.",!0);return}await ps(t),a(),R("New OTP sent. Check your email.",!1)}),bt(h(`${r.authBody}-go`),"click",async f=>{f?.preventDefault?.(),f?.stopPropagation?.();let d=o();if(!/^\d{4}$/.test(d)){R("Enter all 4 digits.",!0);return}R("Verifying OTP\u2026",!1);let m=await Pe({action:"verify",email:t,code:d,deviceId:await Ae(),applicantId:await _o()});if(!m.token){R(m.error||"Wrong OTP. Try again or Resend.",!0),a();return}await du(m.token,m.email||t),await De(),R("OTP correct. Logged in.",!1),hi(m)});for(let f of[`${r.authBody}-go`,`${r.authBody}-back`,`${r.authBody}-back2`,`${r.authBody}-resend`]){let d=document.querySelector(h(f));d&&c.on(d,"pointerdown",m=>m.stopPropagation())}}function Do(t,e={}){let n=!!e.upgrade&&Ao(t);et=n?!!t.access:!1;let i=!!t?.trialUsed,o=n?String(t.plan||""):"",a=Te(o),l=n?"Upgrade plan":"Pick your plan",u=n?"Upgrade":"Continue",f="month",d=i||n&&a>=Te("trial"),m=n&&o==="trial",y=n&&a>=Te("applicant"),g=n&&o==="applicant",x=n&&o==="month",w=m?"Current plan":i?"Already used on this email":n?"Not available while upgrading":"3 days \xB7 once per email",$=g?"Current plan":n&&y?"Same or lower than current":"Lock to one applicant ID",A=x?"Current plan":"30 days \xB7 full access";mi(`
    <div class="${s.authCard}">
      <button type="button" id="${r.authBody}-close" class="${s.authClose}">Close</button>
      <div class="${s.authBrand}">Tik Tik</div>
      <div class="${s.authTitle}">${l}</div>
      <div class="${s.authEmailChip}">${_e(t.email||"")}</div>
      ${n?`<div class="${s.aiHint}" style="margin:0 0 10px">Current: ${_e(gs(t))}</div>`:""}
      <div class="${s.authPlanList}" role="radiogroup" aria-label="Plans">
        <button type="button" data-plan="trial" role="radio" class="${s.authPlanRow}${d||m?` ${s.authPlanOff}`:""}" ${d||m?"disabled":""} aria-checked="false">
          <span class="${s.authPlanRadio}" aria-hidden="true"></span>
          <span class="${s.authPlanMeta}">
            <span class="${s.authPlanName}">Trial</span>
            <span class="${s.authPlanDesc}">${w}</span>
          </span>
          <span class="${s.authPlanPrice}">\u20B91</span>
        </button>
        <button type="button" data-plan="month" role="radio" class="${s.authPlanRow}${x?` ${s.authPlanOff}`:""}" ${x?"disabled":""} aria-checked="false">
          <span class="${s.authPlanRadio}" aria-hidden="true"></span>
          <span class="${s.authPlanMeta}">
            <span class="${s.authPlanName}">Monthly</span>
            <span class="${s.authPlanDesc}">${A}</span>
          </span>
          <span class="${s.authPlanPrice}">\u20B92999</span>
        </button>
        <button type="button" data-plan="applicant" role="radio" class="${s.authPlanRow}${y||g?` ${s.authPlanOff}`:""}" ${y||g?"disabled":""} aria-checked="false">
          <span class="${s.authPlanRadio}" aria-hidden="true"></span>
          <span class="${s.authPlanMeta}">
            <span class="${s.authPlanName}">One applicant</span>
            <span class="${s.authPlanDesc}">${$}</span>
          </span>
          <span class="${s.authPlanPrice}">\u20B9300</span>
        </button>
      </div>
      <button type="button" id="${r.authBody}-go" class="${s.authBtn}">${u}</button>
      <div class="${s.authLinks}">
        ${n?`<button type="button" id="${r.authBody}-back" class="${s.authLink}">Back</button>`:""}
        <button type="button" id="${r.authBody}-out" class="${s.authLink}" style="color:#64748b">Logout</button>
      </div>
      <div class="${s.authSecure}">${n?"Upgrade keeps you on this laptop":"Secure payment \xB7 one laptop only"}</div>
      <div data-auth-msg class="${s.aiHint}" style="margin-top:8px"></div>
    </div>
  `);let S=f;x&&(S="");let K=()=>Array.from(document.querySelectorAll(`${h(r.authBody)} [data-plan]`)),Mt=()=>{K().forEach(D=>{let dt=!!S&&D.getAttribute("data-plan")===S&&!D.disabled;D.classList.toggle(s.authPlanOn,dt),D.setAttribute("aria-checked",dt?"true":"false")})};Mt(),!n&&i&&R("The \u20B91 trial was already used on this email.",!1),!n&&t?.reason&&t.plan&&R(t.reason,!1),n&&R("Select a higher plan, then tap Upgrade.",!1),Io(),bt(h(`${r.authBody}-out`),"click",()=>bs()),bt(h(`${r.authBody}-back`),"click",()=>ys(t)),K().forEach(D=>{c.on(D,"click",()=>{D.disabled||(S=D.getAttribute("data-plan"),Mt(),R("",!1))})}),bt(h(`${r.authBody}-go`),"click",async()=>{if(!S){R(n?"Select a higher plan.":"Select a plan.",!0);return}if(S==="trial"&&i){R("The \u20B91 trial was already used on this email.",!0);return}if(n&&Te(S)<=a){R("Pick a higher plan to upgrade.",!0);return}let D=document.querySelector(h(`${r.authBody}-go`));D&&(D.disabled=!0),R(n?"Upgrading\u2026":"Starting\u2026",!1);let dt=await pi(),Ge=await Pe({action:"choose",token:dt?.token,deviceId:await Ae(),applicantId:await _o(),plan:S});if(D&&(D.disabled=!1),Ge.error){R(Ge.error,!0);return}hi(Ge)});for(let D of[`${r.authBody}-go`,`${r.authBody}-out`,`${r.authBody}-back`]){let dt=document.querySelector(h(D));dt&&c.on(dt,"pointerdown",Ge=>Ge.stopPropagation())}K().forEach(D=>{c.on(D,"pointerdown",dt=>dt.stopPropagation())}),se&&se()}function ys(t){et=!!t.access;let e=t.planEnds?` until ${String(t.planEnds).slice(0,10)}`:"",n=fu(t)||!!t.canUpgrade;mi(`
    <div class="${s.authCard}" style="padding:12px 14px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
        <div style="min-width:0">
          <div class="${s.aiHead}" style="font-size:14px;margin:0">${_e(t.email||"")}</div>
          <div class="${s.aiHint}" style="margin:2px 0 0">${_e(gs(t))}${_e(e)}</div>
        </div>
        <button type="button" id="${r.authBody}-out" class="${s.authLink}" style="color:#64748b;flex-shrink:0">Logout</button>
      </div>
      ${n?`
        <button type="button" id="${r.authBody}-upgrade" class="${s.authBtn}" style="margin-top:12px;padding:11px 14px;font-size:14px">Upgrade plan</button>
      `:""}
      <div data-auth-msg class="${s.aiHint}" style="margin-top:8px"></div>
    </div>
  `),!t.access&&t.reason&&R(t.reason,!0),bt(h(`${r.authBody}-out`),"click",()=>bs()),bt(h(`${r.authBody}-upgrade`),"click",()=>Do(t,{upgrade:!0}));for(let i of[`${r.authBody}-out`,`${r.authBody}-upgrade`]){let o=document.querySelector(h(i));o&&c.on(o,"pointerdown",a=>a.stopPropagation())}pu(),se&&se()}function hi(t){if(t?.kicked){To(),et=!1,fi(),Pt&&Pt(""),De().then(()=>cn("This email was logged in on another laptop."));return}if(!t?.loggedIn){if(et=!1,fi(),Me&&Kt){di(Kt,"Enter the OTP from your email.");return}ms().then(e=>{e?.email?di(e.email,"Enter the OTP from your email."):cn("")});return}De(),Ao(t)?ys(t):Do(t)}async function bs(){let t=await pi();try{await Pe({action:"logout",token:t?.token,deviceId:await Ae()})}catch{}await To(),await De(),et=!1,fi(),Pt&&Pt(""),cn("")}function fi(){ae&&(c.clear(ae),ae=null)}function pu(){fi();let t=async()=>{ae=null;let e=await Mo().catch(()=>null);if(!e){ae=c.setTimeout(t,15e3);return}if(e.kicked||!e.loggedIn){hi(e);return}if(!e.access&&et){et=!1,Pt&&Pt(e.reason||"This plan has ended."),Do(e);return}ae=c.setTimeout(t,15e3)};ae=c.setTimeout(t,15e3)}async function Po(){if(!hs())return;if(!(await pi())?.token){et=!1;let n=await ms();if(n?.email){di(n.email,"Enter the OTP from your email.");return}cn("");return}let e=await Mo();hi(e)}function ws(){Po()}function Eo(){return Po()}function mu(){let t=document.querySelector(h(r.aiPanel));t&&t.classList.add(s.hidden)}function Io(){let t=document.querySelector(h(`${r.authBody}-close`));t&&(c.on(t,"pointerdown",e=>e.stopPropagation()),c.on(t,"click",e=>{e?.preventDefault?.(),e?.stopPropagation?.(),mu()}))}var hu=["cities","from","to","submitEnabled","citiesEnabled","enabled","slotWindows","termsAgreed","termsPassed","termsAgreedAt"];function xs(t){if(!t||typeof t!="object")return{};let e={};for(let n of hu)n in t&&(e[n]=t[n]);return typeof e.submitEnabled!="boolean"&&typeof e.enabled=="boolean"&&(e.submitEnabled=e.enabled),delete e.enabled,e}function Ss(t,e){if(!e||typeof e!="object")return t||null;let n=t&&typeof t=="object"?{...t}:{},i=Number(n.serverUpdatedAt)||0,o=Number(e.updatedAt)||0;if(o&&i&&o<i)return n;let a=xs(e);Array.isArray(a.cities)&&!a.cities.length&&Array.isArray(n.cities)&&n.cities.length&&delete a.cities;let l={...n,...a};return typeof a.submitEnabled=="boolean"&&(l.enabled=a.submitEnabled),e.updatedAt&&(l.serverUpdatedAt=e.updatedAt),l}async function vs(){let[t,e]=await Promise.all([B(),k(["cgiIdToken"])]),n=we(e.cgiIdToken);return{profile:t,token:n}}async function $s(t){if(!j()||!await C("serverSync"))return!1;let e=xs(t);if(!Object.keys(e).length)return!1;let{profile:n,token:i}=await vs();if(!n?.id&&!n?.email)return!1;try{let o={profile:n,prefs:e};i&&(o.token=i);let a=await fetch(Rn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(l=>l.json());return!!(a&&a.success)}catch{return!1}}async function ks(){if(!j()||!await C("serverSync"))return null;let{profile:t,token:e}=await vs();if(!t?.id&&!t?.email)return null;try{let n=new URLSearchParams;t.id&&n.set("applicant_id",String(t.id)),t.email&&n.set("email",String(t.email));let i=await fetch(`${Rn}?${n.toString()}`,{method:"GET",headers:{Accept:"application/json"}}).then(a=>a.json());if(i?.prefs)return i.prefs;let o={profile:t};return e&&(o.token=e),i=await fetch(Rn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(a=>a.json()),i?.prefs||null}catch{return null}}var gi=3,Q=[],le=null;function dn(t,e){let n=String(t||"").trim();if(!n)return;let i=String(e||n).trim()||n;if(Q.length&&Q[0].slots==null&&Q[0].id!==n&&(Q[0].slots=!1),Q[0]?.id===n){Q[0].name=i||Q[0].name;return}Q.unshift({id:n,name:i,slots:null}),Q.length>gi&&(Q.length=gi)}function Cs(t,e,n){let i=String(t||"").trim();if(!i)return;let o=Q.find(a=>a.id===i);if(o){o.slots=!!e,n&&(o.name=String(n).trim()||o.name);return}Q.unshift({id:i,name:String(n||i).trim()||i,slots:!!e}),Q.length>gi&&(Q.length=gi)}function gu(){let t=document.querySelector(h(r.hud));return t||(t=document.createElement("div"),t.id=r.hud,t.className=s.hud,t.dataset[P.mark]="",t.innerHTML=`
    <div class="${s.hudHead}">Tik Tik</div>
    <div class="${s.hudName}" id="${r.hudName}">\u2014</div>
    <div class="${s.hudVisa}" id="${r.hudVisa}">Visa \xB7 \u2014</div>
    <div class="${s.hudBody}" id="${r.hudBody}"></div>
    <div class="${s.hudHist}" id="${r.hudHist}"></div>
  `,document.documentElement.appendChild(t),t)}function yu(t){return t==null||!Number.isFinite(t)?null:Math.max(0,Math.floor(Number(t)+1e-9))}function bu(t,e){if(!t)return;let n=yu(e.secondsUntilHop);if(e.submitPending){t.replaceChildren();let i=document.createElement("div");i.className=s.hudSubmit;let o=document.createElement("div");o.className=s.hudSubmitTitle,o.textContent="SUBMIT CLICKED";let a=document.createElement("div");a.className=s.hudSubmitSub,a.textContent="Waiting for confirmation\u2026",i.append(o,a),t.appendChild(i);return}if(e.loadingStuck){t.replaceChildren();let i=document.createElement("div");i.className=s.hudStuck,i.textContent="Date Loading\u2026",t.appendChild(i);return}if(e.rotateActive&&n!=null){let i=t.querySelector(`.${s.hudCount}`),o=t.querySelector(h(r.hudSecs));if(!i||!o){t.replaceChildren(),i=document.createElement("div"),i.className=s.hudCount;let a=document.createElement("span");a.className=s.hudCountLabel,a.textContent="Next city change",o=document.createElement("span"),o.id=r.hudSecs,o.className=s.hudSecs,i.append(a,o),t.appendChild(i)}o.textContent=`${n}s`;return}t.replaceChildren()}function wu(t){if(!t)return;t.replaceChildren();let e=document.createElement("div");if(e.className=s.hudHistTitle,e.textContent="Last 3 cities",t.appendChild(e),!Q.length){let n=document.createElement("div");n.className=s.hudHistRow,n.textContent="No hops yet",t.appendChild(n);return}for(let n of Q){let i=document.createElement("div");i.className=s.hudHistRow;let o=document.createElement("span");o.textContent=n.name||n.id;let a=document.createElement("span");n.slots===!0?(a.className=s.hudPillOk,a.textContent="Slots"):n.slots===!1?(a.className=s.hudPillNo,a.textContent="No slots"):(a.className=s.hudPillNo,a.textContent="\u2026"),i.append(o,a),t.appendChild(i)}}async function xu(t={}){if(!c.alive)return;if(t.hide){document.querySelector(h(r.hud))?.remove();return}let e=gu();e.querySelector(h(r.hudCities))?.remove();let n=await B().catch(()=>null),i=n?.name&&String(n.name).trim()||n?.email&&String(n.email).trim()||"\u2014",o=n?.visa&&String(n.visa).trim()||n?.visaClass&&String(n.visaClass).trim()||"\u2014",a=e.querySelector(h(r.hudName)),l=e.querySelector(h(r.hudVisa));a&&(a.textContent=i),l&&(l.textContent=`Visa \xB7 ${o}`),bu(e.querySelector(h(r.hudBody)),t),wu(e.querySelector(h(r.hudHist)))}function Ts(t){if(le)return;let e=async()=>{if(le=null,!!c.alive){try{let n=typeof t=="function"?await t():{};await xu(n||{})}catch{}c.alive&&(le=c.setTimeout(e,1e3))}};le=c.setTimeout(e,200)}function Lo(){le&&(c.clear(le),le=null)}var Yt="aiSubmitByAccount",Oe=8e3;var G=25;var xn=0,mn=1e4,Ks=1e3;function Be(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}function Qo(){return v.cityRotateMinGapMs}function Su(){return v.cityRotateMaxGapMs}function hn(){return v.cityHoldMaxMs}function Et(){return v.cityLoadingMaxMs}function Gt(){return v.cityCalendarNoDatesMs}var _s=5e3,No=2e4,vu=15e3;function Sn(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function vt(){return/\/ofc-schedule\b/i.test(location.pathname)}function M(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var $u=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function fn(t,e){let n=$u[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(o=>{let a=e===o?" selected":"";return`<option value="${o.replace(/"/g,"&quot;")}"${a}>${o}</option>`}).join("")}function Ee(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function gn(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function ku(t,e,n){return`${t}-${String(e+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`}function Cu(t){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(t))return null;let[e,n,i]=t.split("-").map(Number),o=new Date(e,n-1,i);return o.getFullYear()!==e||o.getMonth()!==n-1||o.getDate()!==i?null:o}function Xo(){for(let t of["from","to"]){let e=document.querySelector(h(t==="from"?r.aiFrom:r.aiTo)),n=document.querySelector(h(t==="from"?r.aiFromBtn:r.aiToBtn));if(!n)continue;let i=e?.value||"";n.textContent=i?gn(i):"Select date"}}function qo(t,e){let n=document.querySelector(h(t==="from"?r.aiFrom:r.aiTo));if(n&&(n.value=e||""),t==="from"){let i=document.querySelector(h(r.aiTo));i&&e&&i.value&&i.value<e&&(i.value="")}Xo()}var ot={y:0,m0:0,which:"from"};function Vt(){document.querySelector(h(r.aiCal))?.classList.add(s.hidden)}function Jo(t){let e=t.target;return e?e.nodeType===3?e.parentElement:e:null}function Ho(){let t=document.querySelector(h(r.aiCal));if(!t)return;let{y:e,m0:n,which:i}=ot,o=document.querySelector(h(i==="from"?r.aiFrom:r.aiTo))?.value||"",a=Ee(),l=i==="to"&&document.querySelector(h(r.aiFrom))?.value||Ee(),u=new Date(e,n,1).toLocaleDateString("en-IN",{month:"long",year:"numeric"}),f=new Date(e,n,1).getDay(),d=new Date(e,n+1,0).getDate(),m=new Date(e,n,0).getDate(),y="";for(let g of["S","M","T","W","T","F","S"])y+=`<div class="${s.aiHint}">${g}</div>`;for(let g=0;g<42;g++){let x,w=e,$=n,A=!1;g<f?(x=m-f+g+1,$=n-1,$<0&&($=11,w=e-1),A=!0):g>=f+d?(x=g-f-d+1,$=n+1,$>11&&($=0,w=e+1),A=!0):x=g-f+1;let S=ku(w,$,x),K=S<l,Mt=[s.aiCalDay,A?s.aiCalMuted:"",K?s.aiCalMuted:"",S===a?s.aiCalToday:"",S===o?s.aiCalOn:""].filter(Boolean).join(" ");y+=`<button type="button" class="${Mt}" data-iso="${S}" ${K?'disabled aria-disabled="true"':""}>${x}</button>`}t.innerHTML=`
    <div class="${s.aiCalHead}">
      <button type="button" data-cal="prev" aria-label="Previous month">\u2039</button>
      <div class="${s.aiHead}">${u}</div>
      <button type="button" data-cal="next" aria-label="Next month">\u203A</button>
    </div>
    <div class="${s.aiCalGrid}">${y}</div>
    <div class="${s.aiRow}">
      <button type="button" data-cal="clear">Clear</button>
      <button type="button" data-cal="today">Today</button>
    </div>
  `}function Tu(t){let e=document.querySelector(h(r.aiCal)),i=Jo(t)?.closest?.("button");if(!e||!i||!e.contains(i))return;t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation();let o=i.getAttribute("data-cal"),a=ot.which,l=a==="to"&&document.querySelector(h(r.aiFrom))?.value||Ee();if(o==="prev"){ot.m0-=1,ot.m0<0&&(ot.m0=11,ot.y-=1),Ho();return}if(o==="next"){ot.m0+=1,ot.m0>11&&(ot.m0=0,ot.y+=1),Ho();return}if(o==="clear"){qo(a,""),Vt();return}if(o==="today"){let f=Ee();f>=l&&(qo(a,f),Vt(),Us());return}if(i.disabled||i.getAttribute("aria-disabled")==="true")return;let u=i.getAttribute("data-iso");!u||u<l||(qo(a,u),Vt(),Us())}function Ms(t){let e=document.querySelector(h(r.aiCal));if(!e||!t)return;let n=t.getBoundingClientRect(),i=Math.min(340,window.innerWidth-16),o=e.offsetHeight||360,a=Math.max(8,Math.min(n.left,window.innerWidth-i-8)),l=n.bottom+6;l+o>window.innerHeight-8&&n.top-6-o>=8?l=n.top-6-o:l=Math.max(8,Math.min(l,window.innerHeight-o-8)),e.style.position="fixed",e.style.top=`${Math.round(l)}px`,e.style.left=`${Math.round(a)}px`,e.style.width=`${i}px`,e.style.right="auto",e.style.bottom="auto"}function As(t,e){let n=document.querySelector(h(r.aiCal));n||(n=document.createElement("div"),n.id=r.aiCal,n.className=`${s.aiCal} ${s.hidden}`,n.dataset[P.mark]="",document.body.appendChild(n),c.on(n,"pointerdown",Tu,{capture:!0}),c.on(n,"click",a=>{n.contains(Jo(a))&&(a.preventDefault(),a.stopPropagation())},{capture:!0}));let i=document.querySelector(h(t==="from"?r.aiFrom:r.aiTo))?.value,o=Cu(i)||new Date;ot={y:o.getFullYear(),m0:o.getMonth(),which:t},Ho(),n.classList.remove(s.hidden),Ms(e),requestAnimationFrame(()=>Ms(e))}function Nt(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function Bt(t){return!!(t&&t.citiesEnabled)}async function I(){let t=await B();return t?.id?String(t.id):null}async function _(t){return t&&((await k(Yt))[Yt]||{})[t]||null}async function vn(t,e){if(!t)return;let i=(await k(Yt))[Yt]||{};e==null?delete i[t]:i[t]=e,await T({[Yt]:i})}var H=!1;function Ne(){return H}function Le(){H=!0,te(),fe()}function $t(){H=!1,F=!1,te()}async function xi(t){js(),Le();let e=await _(t);if(!e){lt();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await vn(t,e),lt()}var J=!1,ce=null,jt=null,Ds=2e4,Si=new Set,Wo="",Fo="";function js(){J=!1,ce&&(c.clear(ce),ce=null),jt&&(c.clear(jt),jt=null)}function Ci(){Si.clear(),Wo=""}function _u(t){let e=String(t||"").slice(0,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(e))return;let n=String(document.querySelector("#post_select")?.value||"");n!==Wo&&(Si.clear(),Wo=n),Si.add(e)}function Ti(t){let e=String(t||"").slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(e)&&(Fo=e)}function Mu(){let t=document.querySelector("#datepicker"),e=String(t?.value||"").trim();if(!e)return Fo||"";if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,a]=n;return`${a}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return Fo||""}async function Zo(t="No time slots"){if(H||M()||!vt()||J)return null;let n=await gt()||await We();if(!n?.from||!n?.to)return null;let i=document.querySelector("#post_select"),o=i?String(i.value):"";if(!o)return null;let a=Mu();a&&_u(a);let u=(await At()).find(w=>String(w.ID)===o),d=bn(u?.Days||[],n.from,n.to).filter(w=>!Si.has(String(w.Date).slice(0,10)));if(!d.length)return null;let m=Be(d.length),y=d[m];if(!y?.Date)return null;let g=String(y.Date).slice(0,10);Ti(g),U=0,it(),$t();let x=`${t} \u2014 trying next date #${m+1} (${g}) (${d.length} left in range)\u2026`;return b(x),q(x),c.send({action:"selectFirstDate",date:g,maxMs:Oe,pollMs:G}),g}async function Ps(){return!!await Zo("Submit failed")}async function $n(t){if(M()||Es()){t?await xi(t):Le(),b("Booking confirmed \u2014 Tik Tik stopped.");return}J=!0,it(),an(),b("Submit clicked \u2014 waiting for confirmation (Auto Submit + City Change stay ON)\u2026"),jt&&c.clear(jt);let e=Date.now(),n=async()=>{if(jt=null,!(!J||!c.alive)){if(Es()||M()){let i=t||await I();i?await xi(i):Le(),b("Booking confirmed \u2014 Tik Tik stopped.");return}if(Date.now()-e>=Ds){await yn("no confirmation yet \u2014 resuming city checks");return}jt=c.setTimeout(n,400)}};jt=c.setTimeout(n,400),ce&&c.clear(ce),ce=c.setTimeout(()=>{ce=null,J&&yn("submit wait timed out \u2014 resuming city checks")},Ds)}function Es(){if(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))return!0;let t=(document.body?.innerText||"").slice(0,2500);return/appointment\s+confirmation|successfully\s+scheduled|your\s+appointment\s+has\s+been/i.test(t)}async function yn(t=""){if(!J&&!O&&!F){if(await Ps())return;ht();return}js(),F=!1,te(),H&&$t();let e=t?`Submit failed (${t})`:"Submit failed";if(await Ps()){b(`${e} \u2014 staying on city; trying another date\u2026`);return}if(Ci(),ht(),b(`${e} \u2014 no other dates in range; hopping cities\u2026`),L)nt(Date.now()),E();else{let i=await I();if(i){let o=await _(i);Bt(o)&&await Tn()}}}function He(){return J}function pe(t,e,n){let i=String(t||"").slice(0,10);return!(!i||i.length<10||e&&i<e||n&&i>n)}async function We(){if(H||M()||!vt())return null;let t=await I();if(!t)return null;let e=await _(t),n=e?.from?String(e.from).slice(0,10):"",i=e?.to?String(e.to).slice(0,10):"";return!n||!i||n.length<10||i.length<10?null:{from:n,to:i,accountId:t,submitArmed:Nt(e)}}async function gt(){if(H||M()||!vt())return null;let t=await I();if(!t)return null;let e=await _(t);return!Nt(e)||!e.from||!e.to?null:{...e,accountId:t}}async function me(){if(H||M()||!vt())return null;let t=await I();if(!t)return null;let e=await _(t);return!Bt(e)||!e.cities?.length?null:(il(e),{...e,accountId:t})}function bn(t,e,n){let i=new Date;return i.setHours(0,0,0,0),(t||[]).map(o=>{if(!o)return null;let a=o.Date!=null?o.Date:o.date,l=Au(a);return l?{...o,Date:l}:null}).filter(Boolean).filter(o=>pe(o.Date,e,n)).filter(o=>{let[a,l,u]=o.Date.slice(0,10).split("-").map(Number);return new Date(a,l-1,u)>=i}).sort((o,a)=>String(o.Date).localeCompare(String(a.Date)))}function Au(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,a,l]=n;return`${l}-${String(o).padStart(2,"0")}-${String(a).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime()))return`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}-${String(o.getDate()).padStart(2,"0")}`}return null}var F=!1,It=null,qt=null,pt=!1,Rt=0,L=!1,X=0,rt=0,Qt=0,Xt=0,Zt=!1,wt=null,at=0,O=!1,U=0,Ie=null,ue=null,Ot=0,Is=!1,Ro="",pn="",tr=0,Ls="",qs=!1,Uo=0;function Du(t){return(t||[]).map(e=>e.id).join("")}function Pu(){let t=document.querySelector(h(r.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function Rs(t){let e=document.querySelector(h(r.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function te(){It&&(c.clear(It),It=null),F=!1}function Ht(){Ie&&(c.clear(Ie),Ie=null)}function Gs(){Ht(),U||(U=Date.now());let t=Math.max(500,hn()-(Date.now()-U));Ie=c.setTimeout(()=>{Ie=null,!(!O||!L||!c.alive)&&(O=!1,U=0,nt(Date.now()),b(`City Change \u2014 booking hold timed out (${hn()/1e3}s); next city in 15\u201318s\u2026`),E())},t)}function Eu(){ue&&(c.clear(ue),ue=null)}function _i(t=Date.now()){let e=!1;if(pt&&Rt&&t-Rt>=vu&&(pt=!1,Rt=0,e=!0),O&&(U||(U=t),t-U>=hn()?(Ht(),O=!1,U=0,e=!0):Ie||Gs()),Zt){at||(at=t);let i=vi()?Et():Gt();if(t-at>=i)st(),e=!0;else if(!wt){let o=Math.max(500,i-(t-at));wt=c.setTimeout(()=>{if(wt=null,!L||O)return;let a=vi(),l=a?Et():Gt();if(Date.now()-(at||0)<l){_i();return}st(),nt(Date.now()),b(a?`City Change \u2014 still Loading after ${Et()/1e3}s; changing city\u2026`:`City Change \u2014 calendar up but no dates after ${Gt()/1e3}s; changing city\u2026`),E()},o)}}return F&&!It&&(F=!1,e=!0),e}function Ys(){if(ue||!L)return;let t=()=>{if(ue=null,!L||!c.alive||H)return;let e=Date.now(),n=_i(e),i=!!re(new Date(e)),o=!!qt,a=!i&&o||Zt||O||F||J,l=!a&&Ot>0&&e-Ot>=No;(n||l||!o&&!pt&&!a)&&(l?(pt=!1,Rt=0,st(),!O&&!J&&(Ht(),U=0),F&&!It&&(F=!1),X=e,b(i?"City Change \u2014 unstuck; hopping now\u2026":`City Change \u2014 unstuck; waiting for IST window ${oe()}\u2026`)):n?(!O&&!J&&(X=e),b(i?"City Change \u2014 lock cleared; hopping now\u2026":`City Change \u2014 lock cleared; next IST window ${oe()}\u2026`)):b("City Change \u2014 timer lost; restarting\u2026"),Ot=e,E()),L&&(ue=c.setTimeout(t,_s))};ue=c.setTimeout(t,_s)}function fe(){rr(),Eu(),Wu(),Ht(),pt=!1,Rt=0,L=!1,O=!1,U=0,X=0,rt=0,Ot=0,st()}async function Iu(){if(!vt()||M()||H)return{hide:!0};let t=Date.now(),e=!!J,n=!!(Zt&&vi()),i=null;if(L&&!e&&!n)if(Zt&&at){let o=Math.max(0,Gt()-(t-at));i=Math.max(0,Math.ceil(o/1e3))}else O||Lt>t?i=null:re(new Date(t))?i=Math.max(0,Math.ceil(Qs(t)/1e3)):i=null;return{submitPending:e,loadingStuck:n,rotateActive:!!L,secondsUntilHop:i}}function Mi(t,e,n){Cs(t,e,n)}function st(){Zt=!1,at=0,wt&&(c.clear(wt),wt=null)}function er(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let i=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(i))continue;let o=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let a of o)if(a&&/\bLoading\.{0,3}\b/i.test((a.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let o=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(o))continue;let a=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(a))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function vi(){return er()}function nr(){Zt=!0,at=Date.now(),wt&&c.clear(wt),wt=c.setTimeout(()=>{wt=null,!(!L||O)&&(st(),nt(Date.now()),b(`City Change \u2014 still Loading after ${Et()/1e3}s; changing city\u2026`),E())},Et())}function ir(t){let e=Math.max(0,Number(t)||0)*1e3;Xt=Math.max(Xt,Date.now()+e),X=Math.max(X,Xt),st(),E()}function Vs(){st()}function it(){H||(O=!0,U||(U=Date.now()),rr(),st(),Gs(),Ot=Date.now(),L&&E(),b("City Change \u2014 paused (Auto Submit booking)\u2026"))}function ht(){if(J){b("Submit pending \u2014 staying on this city (ignoring date reload hop)\u2026");return}O&&(Ht(),O=!1,U=0,!(!L||H)&&(nt(Date.now()),b("City Change \u2014 resuming; next city in 15\u201318s\u2026"),E()))}async function Ai(){if(!(await un()).ok)return;let e=await gt();if(!e)return;let n=Date.now();if(n-Uo<6e4)return;Uo=n;let o=document.querySelector("#post_select")?.value;if(!o){b("Auto Submit ON \u2014 pick a city first.");return}let l=(await At()).find(f=>String(f.ID)===String(o)),u=l?.Days;if(Array.isArray(u)&&u.length){let f=bn(u,e.from,e.to);if(f.length){it();let m=Be(f.length),y=f[m].Date;b(`Auto Submit: picking date #${m+1} (${y.slice(0,10)})\u2026`),Ti(y),c.send({action:"selectFirstDate",date:y,maxMs:Oe,pollMs:G});return}let d=bn(u,"1970-01-01","2999-12-31");if(d.length){let m=d[0].Date;b(`Auto Submit ON \u2014 dates outside ${e.from} \u2192 ${e.to}; jumping calendar to ${m} (not booking).`),c.send({action:"selectFirstDate",date:m,navigateOnly:!0,maxMs:4e3,pollMs:G});return}b(`Auto Submit ON \u2014 no dates in your range on ${l.Name||"this city"} yet.`);return}b("Auto Submit ON \u2014 loading slots for current city\u2026"),c.send({action:"selectPost",postId:String(o)})}function or(){Uo=0}function rr(){qt&&(c.clear(qt),qt=null)}function Lu(t,e){return t+Math.random()*(e-t)}function qu(){return Lu(Qo(),Su())}function nt(t=Date.now()){X=t+qu()}function Qs(t=Date.now()){let e=so(new Date(t));if(e>0)return e;if(Xt>t)return Xt-t;if(rt){let n=rt+Qo()-t;if(n>0)return n}return X>t?X-t:0}function E(){if(!L)return;if(rr(),O||Zt){qt=c.setTimeout(()=>{Bo()},500);return}let t=Date.now(),e=so(new Date(t));if(e>0){X>t&&(X=t),e>=No&&(Ot=t),qt=c.setTimeout(()=>{Bo()},e);return}let n=0;Xt>t&&(n=Math.max(n,Xt-t)),rt&&(n=Math.max(n,rt+Qo()-t)),X>t&&(n=Math.max(n,X-t)),n=Math.max(0,n),n>=No&&(Ot=Date.now()),qt=c.setTimeout(()=>{Bo()},n)}function Ru(t,e){if(!t.length)return null;if(t.length===1)return Qt=0,t[0];let n=t.findIndex(o=>String(o.id)===String(e));n<0&&(n=Math.max(0,Math.min(Qt,t.length-1)));let i=(n+1)%t.length;return Qt=i,t[i]}function Di(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function ar(t){return String(t||"").toLowerCase().replace(/\b(vac|ofc|consular|embassy|appointment)\b/g," ").replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim()}function zo(t,e,n){if(!t)return null;let i=e.get(String(t.id));if(i)return i;let o=ar(t.name);if(!o)return null;if(i=n.get(o)||null,i)return i;for(let[a,l]of n)if(a!==o&&(a.includes(o)||o.includes(a)))return l;return null}function kn(t){let e=Di();if(!e.length||!t?.length)return[];let n=new Map(e.map(l=>[String(l.id),l])),i=new Map;for(let l of e){let u=ar(l.name);u&&!i.has(u)&&i.set(u,l)}let o=[],a=new Set;for(let l of t){let u=zo(l,n,i);u&&(a.has(u.id)||(a.add(u.id),o.push({id:u.id,name:u.name})))}return o}function Os(t,e){let n=Array.isArray(t)?t.filter(Boolean):[],i=Array.isArray(e)?e.filter(Boolean):[];if(!i.length)return n.map(g=>({id:String(g.id),name:g.name||g.id}));let o=document.querySelector(h(r.aiCities)),a=new Set(o?[...o.querySelectorAll('input[type="checkbox"]')].map(g=>String(g.value)):[]),l=Di(),u=new Map(l.map(g=>[String(g.id),g])),f=new Map;for(let g of l){let x=ar(g.name);x&&!f.has(x)&&f.set(x,g)}let d=[],m=new Set,y=g=>{if(!g)return;let x=l.length?zo(g,u,f):null,w=String(x?.id||g.id);m.has(w)||(m.add(w),d.push({id:w,name:x?.name||g.name||g.id}))};for(let g of i)y(g);for(let g of n){let x=l.length?zo(g,u,f):null,w=String(x?x.id:g.id);m.has(w)||m.has(String(g.id))||a.has(w)&&!i.some($=>String($.id)===w)||y(x||g)}return d}function Jt(){let t=document.querySelector(h(r.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function Cn(){return{from:document.querySelector(h(r.aiFrom))?.value||null,to:document.querySelector(h(r.aiTo))?.value||null}}function wn(t=[],{force:e=!1,selectedCities:n=null}={}){let i=document.querySelector(h(r.aiCities));if(!i)return;let o=Di(),a=Du(o),l=document.querySelector(h(r.aiPanel)),u=l&&!l.classList.contains(s.hidden),f=Pu();if(!e&&a===Ls&&i.querySelector('input[type="checkbox"]'))return;Ls=a;let d=n?.length?n:(t||[]).map(g=>({id:String(g),name:""})),m=d.length?kn(d):[],y=new Set(u&&f.length&&!e&&!d.length?f:(m.length?m.map(g=>g.id):f).map(String));if(i.replaceChildren(),!o.length){i.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let g of o){let x=document.createElement("label"),w=document.createElement("input");w.type="checkbox",w.value=g.id,w.dataset.name=g.name,w.checked=y.has(g.id),x.append(w,document.createTextNode(g.name)),i.appendChild(x)}}async function St(t,e={}){let n=await _(t)||{},{cities:i,...o}=e,{from:a,to:l}=Cn(),u=Jt(),f=Array.isArray(n.cities)?n.cities:[],d=document.querySelector(h(r.aiCities)),m=d?d.querySelectorAll('input[type="checkbox"]').length:0,y;if(i!==void 0){let x=Array.isArray(i)?i:[];!x.length&&!u.length?y=m>0?[]:f:y=Os(f,x.length?x:u)}else u.length?y=Os(f,u):y=f;let g={...n,from:a||n.from||null,to:l||n.to||null,cities:y.length?y:m>0&&i!==void 0&&!(i||[]).length?[]:n.cities||[],loginId:document.querySelector(h(r.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(h(r.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(x=>{let w=[r.aiQ1,r.aiQ2,r.aiQ3][x],$=[r.aiA1,r.aiA2,r.aiA3][x];return{q:document.querySelector(h(w))?.value?.trim()||n.security?.[x]?.q||"",a:document.querySelector(h($))?.value?.trim()||n.security?.[x]?.a||"",set:x+1}}),...o};return typeof g.submitEnabled=="boolean"&&(g.enabled=g.submitEnabled),g.serverUpdatedAt=Date.now(),await vn(t,g),Ou(g),g}async function Oo(){let t=await I();if(!t)return;let e=Jt(),n=await St(t,{cities:e}),i=kn(n.cities||e),o=i.map(f=>f.name||f.id).join(" \u2192 ")||"\u2014";if(!i.length){b("No preferred cities selected \u2014 tick cities anytime; hopping paused."),L&&fe();return}if(ft=!0,qe(n),!Bt(n)){b(`Preferred cities saved (${i.length}): ${o} \u2014 turn City Change ON to hop.`);return}if(Pi(),!L){await Tn();return}let a=document.querySelector("#post_select"),l=a?String(a.value):"",u=i.findIndex(f=>String(f.id)===l);Qt=u>=0?u:Math.min(Qt,i.length-1),b(`Preferred cities updated (${i.length}): ${o} \u2014 City Change keeps running`),E()}var yi=null,Ko=null;function Ou(t){yi&&c.clear(yi),yi=c.setTimeout(()=>{yi=null,$s(t).catch(()=>{})},400)}async function Xs(t){if(!t||Ko===t)return null;let e=await ks();if(Ko=t,!e)return null;let n=await _(t)||{},i=Ss(n,e);return i?(i.loginId=n.loginId||i.loginId||"",i.loginPass=n.loginPass||"",i.security=n.security||i.security||[],typeof i.submitEnabled=="boolean"&&(i.enabled=i.submitEnabled),await vn(t,i),i):null}async function Bu(t,e){if(J||!re()||O||F)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let i=String(t);return String(n.value)===i?!1:(pn=i,tr=Date.now(),nr(),rt=Date.now(),nt(rt),dn(i,e||i),b(`Switching city \u2192 ${e||t}\u2026`),Ci(),c.send({action:"selectPost",postId:i}),!0)}var Lt=0,jo=45e3;async function Nu(t,e,{alertId:n,dayCount:i,bestDate:o}={}){if(H||M()||!vt()||J)return!1;let a=document.querySelector("#post_select");if(!a||!t)return!1;let l=String(t),u=e||l;if(String(a.value)===l){Lt=Date.now()+jo,b(`City alert \u2014 already on ${u}`+(i?` (${i} dates`:"")+(o?`, best ${o}`:"")+(i?")":"")+" \u2014 holding for booking");try{Xn(2,90,60)}catch{}try{c.send({action:"focusScheduleTab"})}catch{}return it(),!0}Ht(),st(),O=!1,U=0,F=!1,te(),pt=!1,Rt=0,X=Date.now(),rt=0,Xt=0,pn=l,tr=Date.now(),nr(),rt=Date.now(),Lt=Date.now()+jo,Ci(),b(`City alert \u2014 FAST switch \u2192 ${u}`+(i?` (${i} dates`:"")+(o?`, best ${o}`:"")+(i?")":"")+(n?` [#${n}]`:""));try{Xn(3,80,50)}catch{}try{c.send({action:"focusScheduleTab"})}catch{}return dn(l,u),c.send({action:"selectPost",postId:l,force:!0}),it(),L&&E(),!0}var de=null,bi=!1,Bs="",Ns=0,Hu=50;function Wu(){de&&(c.clear(de),de=null),bi=!1}async function Fu(){if(!(bi||!L||H)){bi=!0;try{let t=await me();if(!t?.cities?.length)return;let e=document.querySelector("#post_select"),n=await us({preferredCities:t.cities,citiesEnabled:!0,currentCityId:e?String(e.value):"",dateFrom:t.from||null,dateTo:t.to||null});if(!n?.alertId)return;if(n.alreadyThere){li(n.alertId),Lt=Math.max(Lt,Date.now()+jo),it(),b(`City alert \u2014 already on ${n.name||n.id}`+(n.dayCount?` (${n.dayCount} dates`:"")+(n.bestDate?`, best ${n.bestDate}`:"")+(n.dayCount?")":"")+" \u2014 holding for booking");return}let i=`${n.id}:${n.alertId}`,o=Date.now();if(i===Bs&&o-Ns<4e3){li(n.alertId);return}await Nu(n.id,n.name,{alertId:n.alertId,dayCount:n.dayCount,bestDate:n.bestDate})&&(Bs=i,Ns=o,li(n.alertId))}catch{}finally{bi=!1}}}function Js(){if(de||!L)return;let t=()=>{de=null,!(!L||H||!c.alive)&&Fu().finally(()=>{L&&!H&&c.alive&&(de=c.setTimeout(t,Hu))})};de=c.setTimeout(t,50)}function Pi(){if(Is)return;let t=document.querySelector("#post_select");if(!t)return;Is=!0,Ro=String(t.value||"");let e=()=>{let n=document.querySelector("#post_select");if(!n)return;let i=String(n.value||"");!i||i===Ro||(Ro=i,Uu(i,n))};c.on(t,"change",e),c.setInterval(e,400)}function Uu(t,e){if(!L||H||!c.alive||J)return;let n=String(t||"");if(!n)return;let i=pn&&n===pn&&Date.now()-tr<2500;i&&(pn=""),Ht(),O=!1,U=0,te(),Ci(),rt=Date.now(),nr(),nt(rt),me().then(a=>{if(!a?.cities?.length)return;let u=kn(a.cities).findIndex(f=>String(f.id)===n);u>=0&&(Qt=u)}).catch(()=>{});let o=e?.selectedOptions&&e.selectedOptions[0]?.textContent?.trim()||e?.options?.[e.selectedIndex]?.textContent?.trim()||n;dn(n,o),b(i?`City Change \u2014 on ${o}; waiting for dates\u2026`:`City Change \u2014 you switched \u2192 ${o}; waiting (same as system hop)\u2026`),E()}async function Bo(){if(!(pt||!L)){pt=!0,Rt=Date.now(),Ot=Date.now(),qt=null;try{if(H||M()||!c.alive){fe();return}if(_i()){X=Date.now(),b(re()?"City Change \u2014 auto-unstuck; hopping now\u2026":`City Change \u2014 auto-unstuck; waiting IST ${oe()}\u2026`),E();return}if(O||F){let m=U?Date.now()-U:0;if(O&&m>=hn()){Ht(),O=!1,U=0,nt(Date.now()),b("City Change \u2014 hold expired; next city in 15\u201318s\u2026"),E();return}let y=Math.max(0,hn()-m);b(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(y/1e3)}s`),E();return}let t=Date.now();if(Lt>t){let m=Math.ceil((Lt-t)/1e3);b(`City alert hold \u2014 staying for booking\u2026 (${m}s)`),E();return}let e=re(new Date(t));if(!e){E();return}if(Zt){let m=at?t-at:0;if(vi()){if(m>=Et()){st(),nt(Date.now()),b(`City Change \u2014 still Loading after ${Et()/1e3}s; changing city\u2026`),E();return}let x=Math.max(0,Math.ceil((Et()-m)/1e3));b(`City Change \u2014 Date Loading\u2026 stay (${x}s then hop if still Loading)`),E();return}let y=Lt>t?Math.max(Gt(),Lt-(at||t)):Gt();if(m>=y){st(),nt(Date.now()),b(`City Change \u2014 calendar up but no dates after ${Math.round(y/1e3)}s; changing city\u2026`),E();return}let g=Math.max(0,Math.ceil((Gt()-m)/1e3));b(`City Change \u2014 waiting calendar dates\u2026 (${g}s then hop)`),E();return}let n=Qs(t);if(n>0){let m=Math.ceil(n/1e3);b(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,m)}s`),E();return}let i=await me();if(!i?.cities?.length){fe();return}let o=new Set(Di().map(m=>m.id)),a=kn(i.cities);if(!a.length){b("Preferred cities not found in the dropdown \u2014 pick cities again."),fe();return}a.length<(i.cities?.length||0)&&b(`City Change \u2014 using ${a.length}/${i.cities.length} preferred (some ids remapped/missing in dropdown): ${a.map(m=>m.name||m.id).join(" \u2192 ")}`);let l=document.querySelector("#post_select"),u=l?String(l.value):"",f=Ru(a,u);if(!f){nt(t),E();return}if(await Bu(f.id,f.name)){rt=Date.now(),nt(rt);let m=a.map(g=>g.name||g.id).join(" \u2192 "),y=`${Qt+1}/${a.length}`;b(`City Change \u2014 ${y} ${f.name||f.id} (path: ${m}); Loading up to ${Et()/1e3}s, no-dates hop ${Gt()/1e3}s`)}else nt(t);E()}finally{pt=!1,Rt=0}}}function sr(){let t=document.querySelector(h(r.aiPanel));t&&t.classList.contains(s.hidden)?ki(!0):Eo()}async function Tn(){if(H||M()||!vt())return;if(!(await un()).ok){sr();return}let e=await me();if(!e?.cities?.length)return;let n=kn(e.cities);if(!n.length){b("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}Ht(),st(),O=!1,U=0,F=!1,pt=!1,Rt=0,L=!0,Ot=Date.now(),X=Date.now();let i=document.querySelector("#post_select"),o=i?String(i.value):"",a=n.findIndex(u=>String(u.id)===o);Qt=a>=0?a:0;let l=n.map(u=>u.name||u.id).join(" \u2192 ");b(`City Change ON \u2014 ${n.length} cities (${l}); IST ${oe()}; hop 15\u201318s`),Ys(),Js(),E()}async function Zs(){if(H||M()||!vt()||!c.alive||!(await me())?.cities?.length||!document.querySelector("#post_select"))return;if(!L){await Tn();return}let e=_i();Ys(),Js(),(e||!qt&&!pt)&&(e&&(nt(Date.now()),b("City Change \u2014 auto-unstuck; next city in 15\u201318s\u2026")),E())}function lr(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function wi(){let t=lr();return!!(t&&!t.disabled)}function zu(t){if(!t||t.disabled)return!1;try{let e=t.form||t.closest?.("form");if(e&&typeof e.requestSubmit=="function")return e.requestSubmit(t),!0}catch{}try{return t.click(),!0}catch{}try{return t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click(),!0}catch{}return!1}function cr(){let t=lr();if(!t||t.disabled)return!1;let e=zu(t);return c.send({action:"forceClickSubmit",prefix:p,pollMs:G,maxMs:Math.min(1500,mn)}),e}function Ku(){return tt()?wi():!1}function ur(t){let e=Date.now()+Math.max(0,Number(t)||0);return tt()&&wi()?Promise.resolve(!0):new Promise(n=>{let i=!1,o=null,a=null,l=f=>{if(!i){i=!0;try{a?.disconnect()}catch{}o&&c.clear(o),n(!!f)}},u=()=>{if(!c.alive||Ne()||M())return l(!1);if(tt()&&wi())return l(!0);if(Date.now()>=e)return l(tt()&&wi())};try{a=new MutationObserver(u);let f=lr();f&&a.observe(f,{attributes:!0,attributeFilter:["disabled","class","aria-disabled"]});let d=f?.form||f?.closest?.("form")||document.querySelector("#page_form, form");d?a.observe(d,{attributes:!0,attributeFilter:["disabled","class"],childList:!0,subtree:!0}):a.observe(document.documentElement,{attributes:!0,attributeFilter:["disabled"],childList:!0,subtree:!0})}catch{a=null}o=c.setInterval(u,G),u()})}function tl(){b("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function dr(t){if(H||M()||F)return;let e=await _(t);if(!Nt(e))return;it(),F=!0,an();let n=Date.now(),i=!1,o=!1,a=async f=>{if(!(i||!F||!c.alive)){if(i=!0,window.removeEventListener("message",l),It&&(c.clear(It),It=null),M()){F=!1;return}if(F=!1,f){await $n(t);return}ht(),b(L?"Auto Submit \u2014 Submit not clicked in time; City Change resuming\u2026":"Auto Submit \u2014 Submit not clicked in time; still watching\u2026")}},l=f=>{!c.alive||f.source!==window||f.data?.action===Ft.sub&&a(!0)};window.addEventListener("message",l);let u=async()=>{if(i||!F||!c.alive||o)return;let f=Date.now()-n;if(Ku()){o=!0,b("Submit enabled \u2014 clicking\u2026"),cr();return}if(f>=mn)return a(!1);b("Waiting for Submit to enable\u2026"),It=c.setTimeout(u,G)};ur(mn).then(f=>{i||!F||!c.alive||o||f&&u()}),u()}async function el(){if(!tt()||F||H)return;let t=await gt();t&&await dr(t.accountId)}function b(t){let e=document.querySelector(h(r.aiStatus));if(e){if(!t){e.textContent="";return}e.textContent=t}}function q(t){b(t)}function Hs(t){return!!(t&&t.termsAgreed)}function nl(t){return!!(t&&t.termsPassed)}function $i(){return!!document.querySelector(h(r.aiTermsAgree))?.checked}function Ei(t){let e=document.querySelector(h(r.aiTermsGate)),n=document.querySelector(h(r.aiMain));if(!Co()){e&&e.classList.add(s.hidden),n&&n.classList.add(s.hidden);return}let i=document.querySelector(h(r.aiTermsAgree)),o=document.querySelector(h(r.aiTermsContinue)),a=nl(t);e&&e.classList.toggle(s.hidden,a),n&&n.classList.toggle(s.hidden,!a),i&&(i.checked=Hs(t)||$i()),o&&(o.disabled=!(Hs(t)||$i()))}function ju(){let t=document.querySelector(h(r.aiTermsContinue)),e=$i();t&&(t.disabled=!e),b(e?"Terms checked \u2014 tap Continue.":"Check Agree to continue.")}async function Gu(){if(!$i()){b("Check Agree first.");return}let t=await I();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=await _(t)||{},{from:n,to:i}=Cn(),o=Jt(),a=Ii();$t(),te(),or(),xt=!0,ft=!0,await St(t,{termsAgreed:!0,termsPassed:!0,termsAgreedAt:e.termsAgreedAt||Date.now(),submitEnabled:!0,citiesEnabled:!0,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],slotWindows:a.length?a:e.slotWindows||null,confirmedAt:Date.now()}),await lt(),mt(document.querySelector(h(r.aiSubmitSw)),!0),mt(document.querySelector(h(r.aiCitiesSw)),!0),xt=!0,ft=!0,qe(await _(t)),wn((e.cities||[]).map(u=>u.id),{force:!0,selectedCities:e.cities||[]}),fr(e),Ei(await _(t)),(Jt().length?Jt():e.cities||[]).length&&(Pi(),await Tn()),(n||e.from)&&(i||e.to)&&await Ai(),b("Auto Submit and City Change ON \u2014 set dates and preferred cities.")}function il(t){t?.slotWindows?.length?ba(t.slotWindows):ao()}function Yu(t){let e="";for(let n=0;n<=59;n++){let i=Number(t)===n?" selected":"";e+=`<option value="${n}"${i}>:${String(n).padStart(2,"0")}</option>`}return e}function Ws(t,e){let n=Math.min(zt,59-Number(t||0)),i="";for(let o=1;o<=Math.max(1,n);o++){let a=Number(e)===o?" selected":"";i+=`<option value="${o}"${a}>${o} min</option>`}return i}function ol(t,e){let n=Number(t)||0,i=Number(e)||1,o=Math.min(59,n+i);return`Runs from :${String(n).padStart(2,"0")} up to :${String(o).padStart(2,"0")}`}function Ii(){let t=document.querySelector(h(r.aiWinList));if(!t)return[];let e=[];for(let n of t.querySelectorAll(`.${s.aiWinRow}`)){let i=Number(n.querySelector('select[data-win="from"]')?.value),o=Number(n.querySelector('select[data-win="dur"]')?.value);!Number.isFinite(i)||!Number.isFinite(o)||e.push({fromMin:i,durationMin:o})}return ro(e)}function Fs(t){let e=t.querySelector('select[data-win="from"]'),n=t.querySelector('select[data-win="dur"]'),i=t.querySelector(`.${s.aiWinHelp}`);!e||!n||!i||(i.textContent=ol(e.value,n.value))}function rl(t=0,e=6){let n=Math.min(zt,59-t),i=Math.min(Math.max(1,e||1),Math.max(1,n)),o=document.createElement("div");o.className=s.aiWinRow,o.innerHTML=`
    <div class="${s.aiInline}">
      <label class="${s.aiHead}">Start</label>
      <select data-win="from">${Yu(t)}</select>
      <label class="${s.aiHead}" style="margin-left:10px;color:#6b7280;font-weight:500">Duration</label>
      <select data-win="dur">${Ws(t,i)}</select>
      <button type="button" class="${s.aiTrash}" data-win="del" title="Delete timing" aria-label="Delete">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
        </svg>
      </button>
    </div>
    <div class="${s.aiWinHelp}">${ol(t,i)}</div>
  `;let a=o.querySelector('select[data-win="from"]'),l=o.querySelector('select[data-win="dur"]');return c.on(a,"change",()=>{let u=Number(a.value),f=Number(l.value)||1;l.innerHTML=Ws(u,f),Fs(o)}),c.on(l,"change",()=>Fs(o)),c.on(o.querySelector('button[data-win="del"]'),"click",()=>{o.remove(),pr()}),o}function fr(t){let e=document.querySelector(h(r.aiWinList));if(!e)return;e.replaceChildren();let n=t?.slotWindows?.length?wa(t.slotWindows):[];for(let i of n.slice(0,Dt))e.appendChild(rl(i.fromMin,i.durationMin));pr(t)}function pr(t){let e=document.querySelector(h(r.aiWinNote));e&&(t?.slotWindows?.length||Ii().length?e.textContent=`Custom windows active (max ${Dt}, each \u2264 ${zt} min).`:e.textContent=`Using defaults: ${oe()}. Add up to ${Dt} windows below.`)}function mt(t,e){t&&(t.classList.toggle(s.aiOnBtn,!!e),t.setAttribute("aria-checked",e?"true":"false"))}function Vu(t){mt(document.querySelector(h(r.aiSubmitSw)),Nt(t)),mt(document.querySelector(h(r.aiCitiesSw)),Bt(t))}var xt=!1,ft=!1;function qe(t){let e=Nt(t)||xt,n=Bt(t)||ft,i=document.querySelector(h(r.aiSubmitBody)),o=document.querySelector(h(r.aiCitiesBody));i&&i.classList.toggle(s.hidden,!e),o&&o.classList.toggle(s.hidden,!n)}function Qu(t,e){let n=document.querySelector(h(r.aiStatus)),i=document.querySelector(h(r.aiBtn));if(!i)return;Vu(t),qe(t);let o=Nt(t),a=Bt(t);o||a?(i.classList.add(s.aiOn),i.textContent="Tik Tik ON"):(i.classList.remove(s.aiOn),i.textContent="Tik Tik"),n&&(n.textContent="",n.classList.remove(s.aiOk))}async function lt(){let t=await I();if(t)try{await Xs(t)}catch{}let e=t?await _(t):null;Nt(e)||(xt=!1),Bt(e)?ft=!0:ft=!1,il(e),Qu(e,t),Ei(e);let n=document.querySelector(h(r.aiFrom)),i=document.querySelector(h(r.aiTo));n&&(n.value=e?.from||""),i&&(i.value=e?.to||""),Xo();let o=(e?.cities||[]).map(x=>x.id),a=document.querySelector(h(r.aiCitiesBody));(a&&!a.classList.contains(s.hidden)||Bt(e)||ft)&&wn(o,{selectedCities:e?.cities||[]}),fr(e);let u=sl(e),f=document.querySelector(h(r.aiLogin)),d=document.querySelector(h(r.aiPass));f&&(u?.loginId||e?.loginId)&&(f.value=u?.loginId||e.loginId||""),d&&(u?.loginPass||e?.loginPass)&&(d.value=u?.loginPass||e.loginPass||"");let m=u?.security||e?.security||[],y=[r.aiQ1,r.aiQ2,r.aiQ3],g=[r.aiA1,r.aiA2,r.aiA3];y.forEach((x,w)=>{let $=document.querySelector(h(x));$&&($.innerHTML=fn(w,m[w]?.q||""))}),g.forEach((x,w)=>{let $=document.querySelector(h(x));$&&m[w]?.a&&($.value=m[w].a)}),mr(e),Re||Mn(!1)}function Xu(){let t=document.querySelector(h(r.aiPanel));return!!(t&&!t.classList.contains(s.hidden))}var al=0;function ki(t){let e=document.querySelector(h(r.aiPanel));e&&(t||Vt(),e.classList.toggle(s.hidden,!t),t&&(al=Date.now(),I().then(async n=>{if(n)try{Ko=null,await Xs(n)}catch{}let i=n?await _(n):null;Ei(i),nl(i)?wn((i?.cities||[]).map(o=>o.id),{force:!0,selectedCities:i?.cities||[]}):b("Read the terms, check Agree, then Continue."),Eo()})))}function Go(){if(Go._done)return;Go._done=!0;let t=e=>{if(!Xu()||Date.now()-al<900||!Co())return;let n=document.querySelector(h(r.aiPanel)),i=document.querySelector(h(r.aiBtn)),o=document.querySelector(h(r.aiCal)),a=Jo(e),l=typeof e.composedPath=="function"?e.composedPath():[],u=d=>!!(d&&(a&&(d===a||d.contains?.(a))||l.some(m=>m===d)));if(o&&!o.classList.contains(s.hidden)&&u(o))return;if(o&&!o.classList.contains(s.hidden)){let d=document.querySelector(h(r.aiFromBtn)),m=document.querySelector(h(r.aiToBtn));!u(d)&&!u(m)&&Vt()}if(u(n)||u(i))return;let f=document.activeElement;n&&f&&n.contains(f)||(Vt(),ki(!1))};c.on(document,"pointerdown",t,{capture:!0})}async function Ju(t){if(t&&!(await un()).ok){sr();return}let e=await I();if(!e){b("Open a logged-in schedule page so we can bind this to your account.");return}let n=await _(e)||{},{from:i,to:o}=Cn();if(i=i||n.from||null,o=o||n.to||null,t){xt=!0,mt(document.querySelector(h(r.aiSubmitSw)),!0),$t(),te(),or(),await St(e,{submitEnabled:!0,from:i||null,to:o||null,confirmedAt:Date.now()});let a=document.querySelector(h(r.aiFrom)),l=document.querySelector(h(r.aiTo));if(a&&i&&(a.value=i),l&&o&&(l.value=o),Xo(),await lt(),mt(document.querySelector(h(r.aiSubmitSw)),!0),xt=!0,qe(await _(e)),!i||!o){b("Auto Submit ON \u2014 select From and To dates to start booking.");return}if(i>o){b("Auto Submit ON \u2014 From date must be before To date.");return}xt=!1,b(`Auto Submit ON (${gn(i)} \u2013 ${gn(o)})`),await Ai();return}xt=!1,te(),mt(document.querySelector(h(r.aiSubmitSw)),!1),await St(e,{submitEnabled:!1,from:i||n.from,to:o||n.to}),await lt(),b("Auto Submit OFF")}async function Zu(t){if(t&&!(await un()).ok){sr();return}let e=await I();if(!e){b("Open a logged-in schedule page so we can bind this to your account.");return}let n=await _(e)||{};if(t){ft=!0,mt(document.querySelector(h(r.aiCitiesSw)),!0),wn((n.cities||[]).map(l=>l.id),{force:!0,selectedCities:n.cities||[]}),fr(n);let o=Jt();!o.length&&n.cities?.length&&(o=n.cities);let a=Ii();if($t(),await St(e,{citiesEnabled:!0,...o.length?{cities:o}:{},slotWindows:a.length?a:n.slotWindows||null}),await lt(),mt(document.querySelector(h(r.aiCitiesSw)),!0),ft=!0,qe(await _(e)),o.length||wn([],{force:!0}),!o.length){b("City Change ON \u2014 select at least one preferred city to start hopping.");return}ft=!0,qe(await _(e)),Pi(),await Tn(),b(`City Change ON (${o.map(l=>l.name||l.id).join(", ")}) \u2014 edit cities anytime`);return}ft=!1,fe(),mt(document.querySelector(h(r.aiCitiesSw)),!1);let i=Jt();await St(e,{citiesEnabled:!1,cities:i.length?i:n.cities||[]}),await lt(),b("City Change OFF")}async function Us(){let t=await I();if(!t)return;let e=await _(t)||{};if(!Nt(e)&&!xt)return;let{from:n,to:i}=Cn();!n||!i||n>i||(await St(t,{submitEnabled:!0,from:n,to:i,confirmedAt:Date.now()}),xt=!1,await lt(),mt(document.querySelector(h(r.aiSubmitSw)),!0),$t(),or(),b(`Auto Submit ON (${gn(n)} \u2013 ${gn(i)})`),await Ai())}function td(t){return(t||[]).map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", ")}async function ed(){let t=document.querySelector(h(r.aiWinList));if(t){if(t.querySelectorAll(`.${s.aiWinRow}`).length>=Dt){b(`Max ${Dt} timing windows.`);return}t.appendChild(rl(0,Math.min(6,zt))),pr()}}async function nd(){let t=await I();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=Ii();if(!e.length){b("Add at least one timing (or Reset to defaults).");return}await St(t,{slotWindows:e}),await lt(),b(`Saved ${e.length} custom timing(s): ${td(e)}`)}async function id(){let t=await I();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}window.confirm("Reset to default IST windows? Your custom timings will be removed.")&&(await St(t,{slotWindows:null}),ao(),await lt(),b(`Using default windows: ${oe()}`))}var Re=null;function Yo(){return`lp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`}function zs(t){if(!t||String(t).length<10)return"\u2014";try{return new Date(`${String(t).slice(0,10)}T12:00:00`).toLocaleDateString("en-US",{month:"short",day:"numeric"})}catch{return String(t).slice(0,10)}}function _n(t){let e=Array.isArray(t?.loginProfiles)?t.loginProfiles.filter(Boolean):[];return e.length?e.map(n=>({id:String(n.id||Yo()),loginId:String(n.loginId||"").trim(),loginPass:String(n.loginPass||""),security:Array.isArray(n.security)?n.security:[],from:n.from||null,to:n.to||null,cities:Array.isArray(n.cities)?n.cities:[],visa:n.visa||""})):t?.loginId&&t?.loginPass?[{id:t.activeLoginProfileId||Yo(),loginId:String(t.loginId).trim(),loginPass:String(t.loginPass),security:Array.isArray(t.security)?t.security:[],from:t.from||null,to:t.to||null,cities:Array.isArray(t.cities)?t.cities:[],visa:""}]:[]}function sl(t){let e=_n(t);if(!e.length)return null;let n=t?.activeLoginProfileId;return e.find(i=>String(i.id)===String(n))||e[0]}function od(t){let n=(t?.cities||[]).map(o=>o.name||o.id).filter(Boolean)[0]||"\u2014",i=String(t?.visa||"").trim();return i?`${n} (${i})`:n}function rd(t){return`${zs(t?.from)} \u2192 ${zs(t?.to)}`}function ll(t){let e=document.querySelector(h(r.aiLogin)),n=document.querySelector(h(r.aiPass));e&&(e.value=t?.loginId||""),n&&(n.value=t?.loginPass||"");let i=t?.security||[];[r.aiQ1,r.aiQ2,r.aiQ3].forEach((o,a)=>{let l=document.querySelector(h(o));l&&(l.innerHTML=fn(a,i[a]?.q||""))}),[r.aiA1,r.aiA2,r.aiA3].forEach((o,a)=>{let l=document.querySelector(h(o));l&&(l.value=i[a]?.a||"")})}function ad(){ll(null)}function Mn(t,e){let n=document.querySelector(h(r.aiLoginBody)),i=document.querySelector(h(r.aiLoginEditorTitle));n&&n.classList.toggle(s.hidden,!t),i&&(i.textContent=e||(t?"Edit profile":""))}function mr(t){let e=document.querySelector(h(r.aiProfilesList));if(!e)return;let n=_n(t),i=sl(t)?.id||null;if(e.replaceChildren(),!n.length){let o=document.createElement("p");o.className=s.aiQlEmpty,o.textContent="No profiles yet. Add one for faster Home login.",e.appendChild(o);return}for(let o of n){let a=document.createElement("div");a.className=s.aiQlCard,a.dataset.profileId=o.id;let l=document.createElement("div");l.className=s.aiQlMeta;let u=document.createElement("strong");u.textContent=o.loginId||"Untitled";let f=document.createElement("span");f.textContent=od(o);let d=document.createElement("span");d.textContent=rd(o);let m=document.createElement("button");if(m.type="button",m.className=s.aiQlEdit,m.textContent="Edit",m.dataset.editProfile=o.id,l.append(u,f,d,m),a.appendChild(l),String(o.id)===String(i)){let y=document.createElement("span");y.className=s.aiQlBadge,y.textContent="Active Profile",a.appendChild(y)}else{let y=document.createElement("button");y.type="button",y.className=s.aiQlEdit,y.style.marginTop="2px",y.textContent="Use",y.dataset.activateProfile=o.id,a.appendChild(y)}e.appendChild(a)}}async function sd(t){let e=await I();if(!e)return;let n=await _(e)||{},i=_n(n),o=i.find(l=>String(l.id)===String(t));if(!o)return;await vn(e,{...n,loginProfiles:i,activeLoginProfileId:o.id,loginId:o.loginId,loginPass:o.loginPass,security:o.security,serverUpdatedAt:Date.now()});let a=await _(e);mr(a),b(`Active login profile: ${o.loginId}`)}async function ld(){Re=null,ad(),Mn(!0,"Add Quick Login Profile"),b("Enter ID, password, and 3 security answers, then Save.")}async function cd(t){let e=await I(),n=e?await _(e):null,i=_n(n).find(o=>String(o.id)===String(t));i&&(Re=i.id,ll(i),Mn(!0,`Edit \u2014 ${i.loginId}`))}function ud(){Re=null,Mn(!1),b("Profile editor closed.")}async function dd(){let t=await I();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=await _(t)||{},{from:n,to:i}=Cn(),o=Jt(),a=document.querySelector(h(r.aiLogin))?.value?.trim(),l=document.querySelector(h(r.aiPass))?.value,u=[0,1,2].map(w=>({q:document.querySelector(h([r.aiQ1,r.aiQ2,r.aiQ3][w]))?.value?.trim()||"",a:document.querySelector(h([r.aiA1,r.aiA2,r.aiA3][w]))?.value?.trim()||"",set:w+1}));if(!a||!l){b("Enter ID and password before saving.");return}if(u.some(w=>!w.q||!w.a)){b("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}let f="";try{let w=await B();f=String(w?.visa||"").trim()}catch{}let d=_n(e),m=Re||Yo(),y={id:m,loginId:a,loginPass:l,security:u,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],visa:f},g=d.findIndex(w=>String(w.id)===String(m));g>=0?d[g]=y:d.push(y),await St(t,{loginProfiles:d,activeLoginProfileId:m,loginId:a,loginPass:l,security:u});let x=await _(t)||{};await vn(t,{...x,loginProfiles:d,activeLoginProfileId:m,loginId:a,loginPass:l,security:u,serverUpdatedAt:Date.now()}),Re=null,Mn(!1),mr(await _(t)),b(`Quick Login profile saved \u2014 Active: ${a}`)}function fd(t){let e=t.target;if(!e||!e.closest)return;let n=e.closest("[data-edit-profile]");if(n){t.preventDefault(),cd(n.getAttribute("data-edit-profile"));return}let i=e.closest("[data-activate-profile]");i&&(t.preventDefault(),sd(i.getAttribute("data-activate-profile")))}function hr(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==r.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==r.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===r.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function Vo(){document.querySelector(h(r.aiPanel))?.remove(),document.querySelector(h(r.aiBtn))?.remove(),document.querySelector(h(r.hud))?.remove(),Lo(),hr()}function pd(){if(M())return;if(!vt()){Vo();return}if(document.querySelector(h(r.aiBtn)))if(!document.querySelector(h(r.aiSubmitSw))||!document.querySelector(h(r.aiTermsContinue))||!document.querySelector(h(r.aiFromBtn))||!document.querySelector(h(r.aiProfiles)))Vo();else return;let t=_a();if(!t)return;let e=document.createElement("button");e.id=r.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[P.mark]="",c.on(e,"click",i=>{i.preventDefault(),i.stopPropagation();let o=document.querySelector(h(r.aiPanel)),a=o&&o.classList.contains(s.hidden);ki(!!a)}),c.on(e,"pointerdown",i=>{i.stopPropagation()}),t.appendChild(e);let n=document.createElement("div");n.id=r.aiPanel,n.className=s.hidden,n.dataset[P.mark]="",n.innerHTML=`
    <div id="${r.authGate}">
      <div id="${r.authBody}"></div>
    </div>
    <div id="${r.aiTermsGate}">
      <div id="${r.aiTerms}" class="${s.aiTerms}">
        <div class="${s.aiHead}">Terms &amp; Conditions</div>
        <div class="${s.aiHint}">Please read carefully before continuing.</div>
        <ul class="${s.aiTermsList}">
          <li>Options apply to this applicant only. They do not bypass CAPTCHAs, waiting rooms, or portal security.</li>
          <li>During your windows, City Change hops every 15\u201318s. Max ${Dt} windows, each up to ${zt} minutes.</li>
          <li>Checking too fast may trigger <b>1015 Rate Limit</b> errors.</li>
        </ul>
        <label class="${s.aiTermsCb}">
          <input type="checkbox" id="${r.aiTermsAgree}" />
          <span>I have read and agree to these terms.</span>
        </label>
        <button type="button" id="${r.aiTermsContinue}" class="${s.aiContinue}" disabled>Continue</button>
      </div>
    </div>
    <div id="${r.aiMain}" class="${s.hidden}">
      <div class="${s.aiSec}">
        <div class="${s.aiRow}" style="justify-content:space-between;margin-bottom:4px">
          <div>
            <div class="${s.aiHead}" style="font-size:17px">Auto Submit</div>
            <div class="${s.aiHint}" style="margin:2px 0 0">Book only dates in your From\u2013To range. Out of range \u2192 jump calendar, no book.</div>
          </div>
          <button type="button" id="${r.aiSubmitSw}" class="${s.aiSwitch}" role="switch" aria-checked="false" aria-label="Auto Submit">
            <span class="${s.aiKnob}"></span>
          </button>
        </div>
        <div id="${r.aiSubmitBody}" class="${s.hidden}">
          <div class="${s.aiRow}" style="margin-top:10px">
            <label>From
              <button type="button" id="${r.aiFromBtn}" class="${s.aiDateBtn}">Select date</button>
              <input type="hidden" id="${r.aiFrom}" />
            </label>
            <label>To
              <button type="button" id="${r.aiToBtn}" class="${s.aiDateBtn}">Select date</button>
              <input type="hidden" id="${r.aiTo}" />
            </label>
          </div>
        </div>
      </div>
      <div class="${s.aiSec}">
        <div class="${s.aiRow}" style="justify-content:space-between;margin-bottom:4px">
          <div>
            <div class="${s.aiHead}" style="font-size:17px">City Change</div>
            <div class="${s.aiHint}" style="margin:2px 0 0">Rotate preferred cities during release windows.</div>
          </div>
          <button type="button" id="${r.aiCitiesSw}" class="${s.aiSwitch}" role="switch" aria-checked="false" aria-label="City Change">
            <span class="${s.aiKnob}"></span>
          </button>
        </div>
        <div id="${r.aiCitiesBody}" class="${s.hidden}">
          <div class="${s.aiHint}" style="margin:10px 0 4px;font-weight:600;color:#111827">
            Preferred cities
            <button type="button" id="${r.aiCitiesAll}" class="${s.aiCityAct}">Select all</button>
            <button type="button" id="${r.aiCitiesNone}" class="${s.aiCityAct}">Clear</button>
          </div>
          <div id="${r.aiCities}" class="${s.aiCities}"></div>
          <div class="${s.aiHead}" style="font-size:16px;margin:14px 0 8px">Release Window Checks</div>
          <p id="${r.aiWinNote}" class="${s.aiHint}"></p>
          <div id="${r.aiWinList}"></div>
          <div class="${s.aiRow}" style="margin-top:8px">
            <button type="button" id="${r.aiWinAdd}">+ Add timing</button>
            <button type="button" id="${r.aiWinSave}">Save timings</button>
            <button type="button" id="${r.aiWinReset}">Reset defaults</button>
          </div>
        </div>
      </div>
      <div class="${s.aiSec}">
        <div id="${r.aiProfiles}" class="${s.aiQl}">
          <div class="${s.aiQlTitle}">Quick Login Profiles</div>
          <p class="${s.aiQlSub}">Active Profile is used for quick login to the visa portal.</p>
          <div id="${r.aiProfilesList}"></div>
          <button type="button" id="${r.aiAddProfile}" class="${s.aiQlAdd}">+ Add Profile</button>
        </div>
        <div id="${r.aiLoginBody}" class="${s.hidden}" style="margin-top:10px">
          <div id="${r.aiLoginEditorTitle}" class="${s.aiHead}" style="font-size:15px;margin:0 0 8px">Add Quick Login Profile</div>
          <div class="${s.aiHint}" style="margin:0 0 8px">Saved on this computer only. Used for auto-login on Home when logged out.</div>
          <div class="${s.aiRow}">
            <label>ID / email <input type="email" id="${r.aiLogin}" autocomplete="off" /></label>
            <label>Password <input type="password" id="${r.aiPass}" autocomplete="off" /></label>
          </div>
          <div class="${s.aiHint}" style="margin:0 0 6px">
            3 sets \xD7 5 questions. Pick <b>1 question from each set</b>, then type <b>your answer</b> for that question.
          </div>
          <div class="${s.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 1 \u2014 choose 1 question
              <select id="${r.aiQ1}">${fn(0)}</select>
            </label>
            <label>Your answer for set 1
              <input type="text" id="${r.aiA1}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${s.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 2 \u2014 choose 1 question
              <select id="${r.aiQ2}">${fn(1)}</select>
            </label>
            <label>Your answer for set 2
              <input type="text" id="${r.aiA2}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${s.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 3 \u2014 choose 1 question
              <select id="${r.aiQ3}">${fn(2)}</select>
            </label>
            <label>Your answer for set 3
              <input type="text" id="${r.aiA3}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${s.aiRow}">
            <button type="button" id="${r.aiSaveLogin}">Save profile</button>
            <button type="button" id="${r.aiLoginCancel}">Cancel</button>
          </div>
        </div>
        <div class="${s.aiRow}" style="margin-top:10px">
          <button type="button" id="${r.aiClose}">Close</button>
        </div>
      </div>
    </div>
    <div id="${r.aiStatus}" class="${s.aiHint}" style="margin-top:10px"></div>
  `,t.insertAdjacentElement("afterend",n),c.on(n.querySelector(h(r.aiSubmitSw)),"click",async()=>{let i=await I(),o=i?await _(i):null;await Ju(!Nt(o))}),c.on(n.querySelector(h(r.aiCitiesSw)),"click",async()=>{let i=await I(),o=i?await _(i):null;await Zu(!Bt(o))}),c.on(n.querySelector(h(r.aiWinAdd)),"click",ed),c.on(n.querySelector(h(r.aiWinSave)),"click",nd),c.on(n.querySelector(h(r.aiWinReset)),"click",id),c.on(n.querySelector(h(r.aiSaveLogin)),"click",dd),c.on(n.querySelector(h(r.aiLoginCancel)),"click",ud),c.on(n.querySelector(h(r.aiAddProfile)),"click",ld),c.on(n.querySelector(h(r.aiProfilesList)),"click",fd),c.on(n.querySelector(h(r.aiClose)),"click",()=>ki(!1)),c.on(n,"pointerdown",i=>i.stopPropagation()),c.on(n.querySelector(h(r.aiCitiesAll)),"click",()=>{Rs(!0),Oo()}),c.on(n.querySelector(h(r.aiCitiesNone)),"click",()=>{Rs(!1),Oo()}),c.on(n.querySelector(h(r.aiCities)),"change",i=>{i.target&&i.target.type==="checkbox"&&Oo()}),c.on(n.querySelector(h(r.aiTermsAgree)),"change",()=>{ju()}),c.on(n.querySelector(h(r.aiTermsContinue)),"click",()=>{Gu()}),c.on(n.querySelector(h(r.aiFromBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(h(r.aiCal));if(o&&!o.classList.contains(s.hidden)&&ot.which==="from"){Vt();return}As("from",i.currentTarget)}),c.on(n.querySelector(h(r.aiToBtn)),"click",i=>{i.stopPropagation();let o=document.querySelector(h(r.aiCal));if(o&&!o.classList.contains(s.hidden)&&ot.which==="to"){Vt();return}As("to",i.currentTarget)}),Go(),ds(()=>{I().then(i=>_(i).then(o=>Ei(o)))}),fs(i=>{fe(),b(i)}),ws(),lt()}function md(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",c.on(e,"click",()=>{I().then(n=>{$n(n||null)})}))};t(document.querySelector("#submitbtn")),c.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function gr(){if(!c.alive||M())return;if(!vt()){Vo(),Lo();return}if(!await c.waitFor("#post_select",{attempts:Bn}))return;rs(e=>{let n=String(e?.message||e?.source||"error").slice(0,120);yn(n)}),pd(),Pi(),md(),Ts(()=>Iu());let t=document.querySelector("#post_select");if(t?.value){let e=t.selectedOptions?.[0]?.textContent?.trim()||t.options?.[t.selectedIndex]?.textContent?.trim()||t.value;dn(String(t.value),e)}qs||(qs=!0,c.setTimeout(()=>lt(),800),c.setTimeout(async()=>{await gt()&&await Ai()},1500))}var cl=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function ul(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function hd(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=ul(t.data.url),i=new URLSearchParams(t.data.request||"").get("parameters");if(!i)return null;let o;try{o=JSON.parse(i)}catch{return null}return{params:o,tail:e,response:t.data.response}}async function gd(t,e={}){t?.length&&(await Ka(t,e),await C("audioAlert")&&Ea())}async function yd(t,e=!1){if(e||M())return null;let n=new Date;n.setHours(0,0,0,0);let i=(t||[]).map(l=>{if(!l)return null;let u=qi(l.Date);return u?{...l,Date:u}:null}).filter(Boolean).filter(l=>{let[u,f,d]=l.Date.slice(0,10).split("-").map(Number);return!u||!f||!d?!1:new Date(u,f-1,d)>=n}).sort((l,u)=>String(l.Date).localeCompare(String(u.Date))),o=await We();if(o){let l=i.filter(d=>pe(d.Date,o.from,o.to));if(!l.length||!(o.submitArmed||!!await C("autoSelectFirstDate")))return null;let f=Be(l.length);return l[f]?.Date||null}if(!await C("autoSelectFirstDate")||!i.length)return null;let a=Be(i.length);return i[a]?.Date||null}async function bd(t,e){if(!t||M()||Ne())return;let n=e?`none in ${e.from} \u2192 ${e.to}`:"outside preferred range";q(`Dates found but ${n} \u2014 jumping calendar to ${t} (not booking)\u2026`);try{await c.waitFor(gl,{attempts:80,interval:G})}catch{}c.send({action:"selectFirstDate",date:t,navigateOnly:!0,maxMs:4e3,pollMs:G})}function qi(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,a,l]=n;return`${l}-${String(o).padStart(2,"0")}-${String(a).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime())){let a=o.getFullYear(),l=String(o.getMonth()+1).padStart(2,"0"),u=String(o.getDate()).padStart(2,"0");return`${a}-${l}-${u}`}}return null}function wd(t){if(!t)return!1;let[e,n,i]=t.slice(0,10).split("-").map(Number);if(!e||!n||!i)return!1;let o=n-1,a=String(n).padStart(2,"0")+"/"+String(i).padStart(2,"0")+"/"+e,l=document.querySelector("#datepicker");if(l){let u=String(l.value||"").trim();if(u===a)return!0;if(u.includes(String(e))&&u.includes(String(i).padStart(2,"0"))){let f=u.split(/[/-]/).map(d=>parseInt(d,10));if(f.length>=3){let d,m,y;if(f[2]>31?(m=f[0],y=f[1],d=f[2]):(d=f[0],m=f[1],y=f[2]),d===e&&m===n&&y===i)return!0}}try{let f=window.jQuery||window.$;if(f&&f(l).hasClass("hasDatepicker")){let d=f(l).datepicker("getDate");if(d&&d.getFullYear()===e&&d.getMonth()===o&&d.getDate()===i)return!0}}catch{}}for(let u of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let f=u.querySelector("a");if(!f)continue;let d=parseInt(u.getAttribute("data-month"),10),m=parseInt(u.getAttribute("data-year"),10),y=parseInt(f.textContent,10);if(m===e&&d===o&&y===i)return!0}return!1}var Li=null;function dl(t,e){Li&&c.clear(Li);let n=Date.now()+(e?Oe:8e3),i=()=>{!c.alive||Date.now()>n||wd(t)||(c.send({action:"selectFirstDate",date:t,maxMs:e?Oe:8e3,pollMs:G}),Li=c.setTimeout(i,G))};Li=c.setTimeout(i,80)}function fl(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function xd(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function pl(t){return t?.length?t.map((e,n)=>({entry:e,index:n,avail:xd(e)})).sort((e,n)=>n.avail!==e.avail?n.avail-e.avail:e.index-n.index):[]}function Sd(t){let e=pl(t);return e.length?{entry:e[0].entry,slotIndex:e[0].index}:{entry:null,slotIndex:0}}function wr(){he&&(c.clear(he),he=null)}var br=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),Ri=null,Oi=null,he=null,Bi="";function vd(t,e){Ri=t,Oi=e?String(e).slice(0,10):null}var $d=8e3,yr=!1;async function ml(t){if(yr||He())return!1;yr=!0;try{wr(),Ri=null,Oi=null;let e=await Zo(t);return e?(Bi=e,dl(e,!0),hl(e,xn),!0):(ht(),q("No time slots left on this city \u2014 next city in 15\u201318s\u2026"),!1)}finally{yr=!1}}function hl(t,e=0){he&&c.clear(he);let n=t?String(t).slice(0,10):null,i=Date.now(),o=async()=>{if(!c.alive||Ne()||tt())return;if(Date.now()-i>=$d){let l=Oi===n?(Ri||[]).filter(f=>f&&f.Time):[],u=document.querySelector(br);if(!l.length&&!u){await ml("No time slots");return}if(Date.now()-i>=2e4)return}let a=Oi===n?(Ri||[]).filter(l=>l&&l.Time):[];if(a.length){let{entry:l,slotIndex:u}=Sd(a);if(q(`Watchdog: picking time slot #${u+1}\u2026`),await on({time:fl(l.Time),date:l.Date?String(l.Date).slice(0,10):n,slotIndex:u,pollMs:G,maxMs:600,prefix:p}),tt())return}else if(document.querySelector(br)&&(q("Watchdog: picking visible time slot\u2026"),await on({time:"00:00",date:n,slotIndex:e,pollMs:G,maxMs:600,prefix:p}),tt()))return;he=c.setTimeout(o,G)};he=c.setTimeout(o,300)}var gl=["#datepicker.hasDatepicker","#datepicker"].join(", ");async function kd(t,e=!1){if(e)return null;let n=await We(),i=await gt(),o=await yd(t,e),a=new Date;a.setHours(0,0,0,0);let l=(t||[]).map(d=>qi(d?.Date)).filter(Boolean).filter(d=>{let[m,y,g]=d.slice(0,10).split("-").map(Number);return new Date(m,y-1,g)>=a}).sort((d,m)=>d.localeCompare(m));if(!o&&n&&l.length&&!l.filter(m=>pe(m,n.from,n.to)).length)return await bd(l[0],n),null;if(!o)return null;let u=n?l.filter(d=>pe(d,n.from,n.to)):l,f=Be(u.length);return q(`Selecting date #${f+1}: ${o} (fast)\u2026`),Ti(o),Bi=String(o).slice(0,10),await c.waitFor(gl,{attempts:80,interval:G}),c.send({action:"selectFirstDate",date:o,maxMs:i||n?Oe:8e3,pollMs:G}),dl(o,i||n),hl(o,xn),o}async function Cd(t,e=!1){if(e||M()||Ne())return;let n=await gt(),i=await We();if(!n&&!i&&!await C("autoSelectFirstDate"))return;wr();let o=(t||[]).filter(d=>!(!d||!d.Time||d.EntriesAvailable!=null&&Number(d.EntriesAvailable)<=0)),a=n||i;a&&(o=o.filter(d=>{let m=d.Date?String(d.Date).slice(0,10):null;return m?m>=a.from&&m<=a.to:!0}));let l=pl(o);if(!l.length)return;let u=Date.now()+1e4;for(;Date.now()<u&&c.alive&&!(ts(o)||document.querySelector(br));)await new Promise(d=>c.setTimeout(d,G));let f=l.length===1?mn:Ks;q(l.length===1?`1 time slot \u2014 try highest avail, wait \u2264${f/1e3}s for Submit\u2026`:`${l.length} time slots \u2014 try highest\u21922nd\u21923rd\u2026 (${f/1e3}s each for Submit)`);for(let d=0;d<l.length;d++){if(!c.alive||Ne()||M())return;let{entry:m,index:y,avail:g}=l[d],x=fl(m.Time),w=m.Date?String(m.Date).slice(0,10):null,$=d===0?"highest":d===1?"2nd-highest":d===2?"3rd-highest":`${d+1}th-highest`;if(q(`Trying ${$} avail (${g}) @ ${x} \u2014 slot ${d+1}/${l.length}\u2026`),!await on({time:x,date:w,slotIndex:y,pollMs:G,maxMs:4e3,prefix:p})&&!tt()){q(`Could not click ${x} \u2014 trying next\u2026`);continue}if(q(`Selected ${x} (${$}) \u2014 waiting \u2264${f/1e3}s for Submit to enable\u2026`),await ur(f)){q(`Submit enabled on ${x} \u2014 clicking\u2026`),n?await dr(n.accountId):cr();return}d<l.length-1&&q(`Submit still disabled on ${x} \u2014 trying next (${d+2}/${l.length})\u2026`)}q(`Tried all ${l.length} time slot(s); Submit never enabled.`),n&&ht()}async function yl(t){if(!j()||M())return;let e;try{e=hd(t)}catch{return}if(e==null)return;if(as(e),e.retryAfter!==void 0){let a=Number(e.retryAfter);ua(e.cgiBlock,a),a?(Vn(a),ir(a)):C("defaultWaitTime").then(l=>{Vn(l),ir(l)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let a=e.response.Posts||[],l=new Map((await At()).map(u=>[u.ID,u]));for(let u of a)l.set(u.ID,{...l.get(u.ID),...u});await be([...l.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let a=e.response.Members||[];if(a.length){let l=await B()||{},u=l.name&&a.find(f=>f.FullName===l.name);l.visa=(u||a[0]).VisaClassName,await T({profile:l,members:a})}}if(cl.includes(e.tail)){$t(),Ra(e);let a=(e.response.ScheduleDays||[]).map(w=>qi(w?.Date)).filter(Boolean).sort(),l=a.length;if(l&&q(`${l} date${l===1?"":"s"} available \u2014 see list below`),l>0&&!e.response.HasError&&it(),Vs(),!e.response.HasError&&l>0){let w=String(e.params.postId||""),$=a[0],A=a[a.length-1];Mi(w,!0,""),q(`${l} date${l===1?"":"s"} \u2014 alerting others FAST\u2026`),$o({postId:w,postName:"",dayCount:l,dateFrom:$,dateTo:A,bestDate:$}).catch(()=>{})}else e.response.HasError||Mi(String(e.params.postId||""),!1,"");let u=await gt(),f=await We(),d=u||f;await me()||C("defaultWaitTime").then(w=>{Vn(w)});let y=await At(),g=y.find(w=>w.ID===e.params.postId);if(g&&(g.Days=e.response.ScheduleDays,g.Updated=Date.now(),g.HasError=e.response.HasError,g.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,be(y)),!e.response.HasError&&l>0){let w=String(e.params.postId||""),$=a[0],A=a[a.length-1],S=$,K=A,Mt=l;if(d?.from&&d?.to){let D=a.filter(dt=>pe(dt,d.from,d.to));D.length&&(S=D[0],K=D[D.length-1],Mt=D.length)}$o({postId:w,postName:g?.Name,dayCount:Mt,dateFrom:S,dateTo:K,bestDate:S,rangeFrom:d?.from||null,rangeTo:d?.to||null}).catch(()=>{}),Mi(w,!0,g?.Name||"")}if(await gd(e.response.ScheduleDays,{postId:e.params.postId,postName:g?.Name,hasError:e.response.HasError}),await ja(e.response.ScheduleDays,{postId:e.params.postId,postName:g?.Name,hasError:e.response.HasError}),He())it(),q("Submit pending \u2014 staying on this city (date reload ignored)\u2026");else if(d&&!e.response.HasError){let w=bn(e.response.ScheduleDays,d.from,d.to);w.length?(it(),q(`${w.length} date${w.length===1?"":"s"} in range \u2014 selecting (city hold)\u2026`)):ht()}else d?ht():l>0&&!e.response.HasError&&(await C("autoSelectFirstDate")||ht());let x=He()?null:await kd(e.response.ScheduleDays,e.response.HasError);if(x)it(),await Ga(g?.Name,x);else if(d&&!e.response.HasError&&!He()){let w=(e.response.ScheduleDays||[]).map(A=>qi(A?.Date)).filter(Boolean).sort((A,S)=>A.localeCompare(S)),$=w.filter(A=>pe(A,d.from,d.to));w.length&&!$.length?(ht(),q(`Dates found but none in ${d.from} \u2192 ${d.to}. Jumped calendar (not booking). Next city in 15\u201318s\u2026`)):w.length||(ht(),q("No dates on this city \u2014 next city in 15\u201318s\u2026"))}await Wn()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let a=e.params.Date.split("T")[0];vd(e.response.ScheduleEntries,a),wr();let l=await At(),u=l.filter(m=>m.Days&&m.Updated).sort((m,y)=>y.Updated-m.Updated).find(m=>m.Days.some(y=>y.Date===a));if(u){let m=u.Days.find(y=>y.Date===a);m&&(m.Times=e.response.ScheduleEntries,be(l))}let f=(e.response.ScheduleEntries||[]).filter(m=>m&&m.Time);if(Bi&&a!==Bi){await Wn();return}let d=f.filter(m=>m.EntriesAvailable==null||Number(m.EntriesAvailable)>0);if(Oa(f,a,u?.Name),f.length){let m=d.reduce((g,x)=>{let w=Number(x.EntriesAvailable);return g+(Number.isFinite(w)?w:0)},0),y=m>0?` \xB7 ${m} available`:"";q(`${d.length||f.length} time slot${(d.length||f.length)===1?"":"s"} on ${a}${y}`)}await Cd(e.response.ScheduleEntries,e.response.HasError),He()?(it(),q("Submit pending \u2014 staying on this city (time reload ignored)\u2026")):d.length?(it(),await Ya(u?.Name,e.params.Date,d.length)):await ml("No time slots on this date"),await Wn()}}function bl(t){if(!j()||M())return;let e=ul(t.data.url);cl.includes(e)&&Aa()}var ge=null,Sr="",xr={scanning:"Scanning for Cloudflare challenge\u2026",dom:"Trying page-level verify click\u2026",debugger:"Advanced click \u2014 targeting Turnstile iframe\u2026",retry:"Waiting before next attempt\u2026",success:"Verification passed \u2014 continuing\u2026",manual:"Stuck? Click the checkbox once, then we\u2019ll continue."};function wl(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=s.cfFlash,n.dataset[P.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),c.setTimeout(()=>n.remove(),1200)}}function Td(){let t=document.querySelector(h(r.cfHud));return t||(t=document.createElement("div"),t.id=r.cfHud,t.dataset[P.mark]="",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.innerHTML=`
    <div class="${s.cfHud}">
      <div class="${s.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">\u{1F6E1}</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${xr.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `,document.documentElement.appendChild(t),t)}async function Y(t,e){if(!chrome.runtime?.id||!c.alive||!await C("autoCloudflareTick"))return;let n=Td(),i=n.querySelector("[data-cf-msg]"),o=n.querySelector("[data-cf-sub]"),a=n.querySelector("[data-cf-chip]"),l=n.querySelector(`.${s.cfHud}`);Sr=t,i&&(i.textContent=xr[t]||xr.scanning),o&&(o.textContent=e||_d(t)),a&&(a.textContent=t==="success"?"Done":t==="manual"?"Help":"Active",a.dataset.state=t),l&&(l.dataset.state=t),ge&&(c.clear(ge),ge=null),t==="success"&&(ge=c.setTimeout(()=>vr(),2800))}function _d(t){return t==="debugger"?"Precision click via advanced browser bridge":t==="dom"?"Standard page interaction":t==="manual"?"One manual click is usually enough":t==="success"?"Resuming login and recovery":"Monitoring this tab for Turnstile"}function vr(){let t=document.querySelector(h(r.cfHud));t&&t.remove(),Sr="",ge&&(c.clear(ge),ge=null)}function $r(){return Sr}var Md=/we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i,Ad=/\bUSG\s+[a-f0-9-]{8,}/i;var Cr="vsPortalErrorReloadCount",vl="vsPortalErrorReloadAt",Dd=2e3,Pd=1e4,xl=!1,Fe=null,Ed=null;function Id(){return(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim()}function Ue(){let t=Id().slice(0,6e3);return t?!!(/a timeout occurred/i.test(t)&&(/error\s*524/i.test(t)||/origin web server timed out/i.test(t)||/cloudflare ray id/i.test(t))||/error\s*524/i.test(t)&&/cloudflare/i.test(t)&&t.length<8e3||Md.test(t)&&(Ad.test(t)||/error id\s*#/i.test(t))||/we'?re sorry,\s*but something went wrong/i.test(t)&&t.length<2500):!1}function $l(){try{return Math.max(0,Number(sessionStorage.getItem(Cr)||0))}catch{return 0}}function Ld(){try{let t=$l()+1;return sessionStorage.setItem(Cr,String(t)),sessionStorage.setItem(vl,String(Date.now())),t}catch{return 1}}function kr(){try{sessionStorage.removeItem(Cr),sessionStorage.removeItem(vl)}catch{}}function qd(t){return Math.min(Pd,Dd+Math.max(0,t-1)*1e3)}function Rd(){Fe&&(c.clear(Fe),Fe=null)}function Od(){Ld();try{location.reload()}catch{}}function Sl(){if(!c.alive||Fe)return;if(!Ue()){kr();return}let t=$l()+1,e=qd(t);Fe=c.setTimeout(()=>{if(Fe=null,!!c.alive){if(!Ue()){kr();return}Od()}},e)}function kl(){if(xl)return;xl=!0;let t=()=>{c.alive&&(Ue()?Sl():(kr(),Rd()))};t(),Ed=c.setInterval(t,1500);try{let e=new MutationObserver(()=>{c.alive&&Ue()&&Sl()});e.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),c.disposable(()=>e.disconnect())}catch{}}var Ni="vsDebugLogs",Bd=200;function Nd(){try{return new Date().toLocaleTimeString("en-IN",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})}catch{return new Date().toISOString().slice(11,19)}}async function z(t,e,n){let i={at:Date.now(),t:Nd(),tag:String(t||"app").slice(0,24),msg:String(e||"").slice(0,400)};if(n!=null)try{i.data=JSON.parse(JSON.stringify(n))}catch{i.data=String(n).slice(0,200)}try{console.log(`[VS6 ${i.tag}] ${i.msg}`,n!==void 0?n:"")}catch{}try{let o=await k({[Ni]:[]}),a=Array.isArray(o[Ni])?o[Ni].slice():[];for(a.push(i);a.length>Bd;)a.shift();await T({[Ni]:a})}catch{}}var Wi=null,Dn=0,An=null,Wt=0;async function Hd(){try{let t=await k(["humanClickProfile","humanClickServerProfile"]),e=t.humanClickProfile?.samples?.length||0,n=t.humanClickServerProfile?.samples?.length||0;return e+n>=1?400:4e3}catch{return 800}}var _r=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function ct(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!V()&&!$r()}function V(){if(Ue()||document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return _r.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:Fi().length>0}function Hi(t){return new Promise(e=>setTimeout(e,t))}function Wd(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let i of n.querySelectorAll("*"))i.shadowRoot&&(t.push(i.shadowRoot),e.push(i.shadowRoot))}return t}function Fi(){let t=[],e=new Set,n=i=>{if(!i||e.has(i))return;let o=i.getBoundingClientRect();if(o.width<40||o.height<20||o.width>900||o.height>400)return;let a=(i.src||i.getAttribute?.("src")||"").toLowerCase(),l=(i.title||i.getAttribute?.("title")||"").toLowerCase(),u=(i.className?.toString?.()||"").toLowerCase(),f=(i.id||"").toLowerCase(),d=i.tagName==="IFRAME"&&(a.includes("challenges.cloudflare")||a.includes("turnstile")||l.includes("cloudflare")||l.includes("security challenge")),m=u.includes("cf-turnstile")||u.includes("turnstile")||f.includes("turnstile")||f.includes("challenge")||i.hasAttribute?.("data-sitekey")||i.hasAttribute?.("data-turnstile-widget");if(!d&&!m){let y=i.tagName==="IFRAME"&&o.width>=180&&o.width<=460&&o.height>=40&&o.height<=160,g=_r.test(`${document.title||""} ${document.body?.innerText||""}`.slice(0,4e3));if(!y||!g)return}e.add(i),t.push({el:i,rect:o})};for(let i of Wd()){for(let o of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let a of i.querySelectorAll(o))n(a);for(let o of i.querySelectorAll("iframe"))n(o)}return t}function Fd(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function Ud(){let t=[],e=document.querySelectorAll("label, span, div, p, button");for(let n of e){if(t.length>=2)break;let i=(n.innerText||n.textContent||"").replace(/\s+/g," ").trim();if(!/verify you are human/i.test(i)||i.length>48)continue;let o=n.getBoundingClientRect();o.width<16||o.height<10||o.bottom<0||o.top>window.innerHeight||t.push({x:Math.round(o.left+Math.min(22,Math.max(12,o.width*.12))),y:Math.round(o.top+o.height/2)})}return t}function Cl(t){let e=[],n=new Set,i=(o,a)=>{if(!Number.isFinite(o)||!Number.isFinite(a)||o<1||a<1||o>window.innerWidth-1||a>window.innerHeight-1)return;let l=`${Math.round(o)},${Math.round(a)}`;n.has(l)||(n.add(l),e.push({x:Math.round(o),y:Math.round(a)}))};for(let{rect:o}of t){let a=o.top+o.height/2,l=o.left+Math.min(28,Math.max(18,o.width*.11));for(let u of[0,-4,4,-8,8,12,16,20,24,28,32])for(let f of[0,-3,3,-6,6])i(l+u,a+f);i(o.left+o.width*.5,a)}return e}function zd(t){for(let{el:e,rect:n}of t)try{e.click();let i=n.left+Math.min(26,n.width*.12),o=n.top+n.height/2,a=document.elementFromPoint(i,o)||e;for(let l of["pointerdown","mousedown","mouseup","pointerup","click"])a.dispatchEvent(new MouseEvent(l,{bubbles:!0,cancelable:!0,clientX:i,clientY:o,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let i=n.getBoundingClientRect();if(i.width<4&&i.height<4)continue;let o=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!o.includes("human")&&!o.includes("verify")&&e==="input[type='checkbox']"){let a=n.closest("label, div, form");if(!_r.test(a?.textContent||""))continue}return n.click(),!0}return!1}async function Tr(t){t.length&&(wl(t.slice(0,3)),c.send({action:"viewportClickPoints",points:t}))}async function Mr(){if(!await C("autoCloudflareTick"))return!1;if(ct())return Wt&&z("cf","challenge already solved"),Wt=0,await Y("success"),!0;Wt||(Wt=Date.now(),z("cf","challenge seen \u2014 train window started"));let t=await Hd();if(Date.now()-Wt<t)return await Y("scanning","Verify you are human \u2014 clicking in a moment\u2026"),!1;await Y("scanning","Verify you are human page \u2014 preparing click\u2026");let e=Fi();Fd(e),await Hi(250),e=Fi();let n=Cl(e);return z("cf","train window done \u2014 attempting auto click",{widgets:e.length,points:n.length}),n.length||z("cf","no checkbox points \u2014 widget not found on this page"),n.length&&(await Tr(n),await Hi(1200),ct()||!V())?(Wt=0,await Y("success"),!0):(await Y("dom"),zd(e),await Hi(600),ct()||!V()?(Wt=0,await Y("success"),!0):n.length&&(await Tr(n),await Hi(1e3),ct()||!V())?(Wt=0,await Y("success"),!0):(Dn++,Dn>=8?await Y("manual","Click the checkbox once \u2014 we will continue after."):await Y("retry",`Retry ${Dn}/8\u2026`),!1))}function Kd(){An||(An=new MutationObserver(()=>{c.alive&&V()&&!ct()&&Mr()}),An.observe(document.documentElement,{childList:!0,subtree:!0}),c.disposable(()=>{An?.disconnect(),An=null}))}function Ar(){Wi&&(c.clear(Wi),Wi=null),Dn=0,Wt=0,vr()}async function Dr(){Ar(),Kd();let t=async()=>{if(!c.alive)return;let e=Fi(),n=[...Ud(),...Cl(e)].slice(0,3);if(!n.length){$r()&&(Dn=0,await Y("success"));return}z("cf","verify widget found \u2014 clicking",{widgets:e.length,points:n}),await Y("scanning","Clicking Verify you are human\u2026"),await Tr(n)};t(),Wi=c.setInterval(t,1800)}var ze="sessionRecovery",Pr="homeKeepaliveAt",Er="homeLoadingStuckAt",qr="vsResubmitContinue",Tl=2e3,zi=!1,_l=null,Ir=null,Lr=null,Ui=null,Pn=0;function Br(){try{let t=new URL(location.href);return t.searchParams.set("_vsr",String(Date.now()%1e12)),location.replace(t.pathname+t.search+t.hash),!0}catch{try{return location.href=location.pathname+location.search,!0}catch{return!1}}}function El(){try{if(sessionStorage.getItem(qr)!=="1")return!1;sessionStorage.removeItem(qr)}catch{return!1}return Ct()||document.querySelector("#post_select")?!1:(Br(),!0)}function Ml(){return v.homeKeepaliveMinMs}function jd(){return v.homeKeepaliveMaxMs}function Gd(){return v.homeKeepaliveDebounceMs}function Al(){return v.loadingStuckMs}function Yd(){return v.loadingStuckDebounceMs}function Dl(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function Vd(t,e){let n=Dl(t);if(!n)return"";let i="",o=0;for(let a of e||[]){let l=Dl(a.q);if(!l||!a.a)continue;if(n.includes(l)||l.includes(n))return a.a;let u=l.split(" ").filter(m=>m.length>3),f=0;for(let m of u)n.includes(m)&&f++;let d=u.length?f/u.length:0;d>o&&d>=.5&&(o=d,i=a.a)}return i}async function Qd(){let t=await k([Yt,"profile"]),e=t[Yt]||{},n=t.profile?.id?String(t.profile.id):null,i=n?e[n]:null;return i||(i=Object.values(e).find(o=>o?.loginId&&o?.loginPass)||null),i||{}}function Pl(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,i=Object.getOwnPropertyDescriptor(n,"value")?.set;i?i.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function ee(t){return new Promise(e=>setTimeout(e,t))}function kt(t,e){return t+Math.random()*(e-t)}async function Rr(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await ee(kt(250,600)),Pl(t,"");let i="";for(let o=0;o<n.length;o++){let a=n[o];i+=a,Pl(t,i),t.dispatchEvent(new KeyboardEvent("keydown",{key:a,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:a,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:a,bubbles:!0}));let l=kt(90,220);/[\s@._]/.test(a)&&(l+=kt(120,320)),Math.random()<.08&&(l+=kt(200,450)),await ee(l)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await ee(kt(200,500))}var Ki=!1,ji=!1;function Gi(t){return!t||t.disabled?!1:(t.click(),!0)}function Xd(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let i of t){let o=(i.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(o))continue;let a=i.querySelector("input[type='checkbox']")||document.getElementById(i.getAttribute("for")||"");a&&!a.checked&&(Gi(a),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(i=>/^(continue|ok|accept|agree)$/i.test((i.textContent||i.value||"").trim()));return e&&n&&Gi(n),e>0}function Il(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function Jd(t){if(Ki)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;Ki=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await Rr(e,t.loginId),await ee(kt(400,900))),n&&t.loginPass&&!n.value&&(await Rr(n,t.loginPass),await ee(kt(500,1100)));let i=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(o=>/sign in|log in|continue/i.test(o.textContent||o.value||""));return i&&(n?.value||t.loginPass)?(await ee(kt(600,1400)),Gi(i),!0):!!(e||n)}finally{Ki=!1}}async function Zd(t){if(ji)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let o of n){let a=(o.textContent||"").trim();if(a.length<12||a.length>220||!/\?/.test(a)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(a))continue;let l=o.querySelector("input[type='text']")||document.getElementById(o.getAttribute("for")||"")||o.parentElement?.querySelector("input[type='text']");l&&l.offsetParent!==null&&e.push({text:a,input:l})}for(let o of["kba1_response","kba2_response","kba3_response"]){let a=document.getElementById(o);if(!a)continue;let u=(a.closest(".form-group, .entry, li, div")||a.parentElement)?.textContent||"";e.some(f=>f.input===a)||e.push({text:u,input:a})}let i=[];for(let{text:o,input:a}of e){if(a.value)continue;let l=Vd(o,t.security);l&&i.push({input:a,ans:l})}if(!i.length)return!1;ji=!0;try{for(let{input:a,ans:l}of i)await Rr(a,l),await ee(kt(350,800));await ee(kt(600,1400));let o=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(a=>/continue|submit|verify/i.test(a.textContent||a.value||""));return o&&Gi(o),!0}finally{ji=!1}}function Ll(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||V()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function Ct(){return Sn()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function tf(t=""){return/\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(t||""))}function Or(){if(Ct()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||V()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}function ef(t){return!!(t?.loginId&&t?.loginPass)}function nf(){return Ll()?!1:!!(Il()||document.querySelector("#kba1_response, #kba2_response, #kba3_response")||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))}async function of(){let t=(await k(ze))[ze],e=!!t?.active,n=await Qd();if(V()){await Mr();return}if(Xd(),Ll()){e&&(await T({[ze]:{...t,active:!1,doneAt:Date.now()}}),c.send({action:"recoveryReturnToOfc"}));return}nf()&&ef(n)&&await C("autofillLogin")&&(await Zd(n)||(Il()||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))&&await Jd(n))}function ql(){if(!Or()||_l)return;let t=async()=>{c.alive&&await of()};t(),_l=c.setInterval(t,1200)}function Rl(){return Ml()+Math.random()*(jd()-Ml())}async function Ol(){try{let t=await k(Pr),e=Number(t[Pr])||0;return Date.now()-e<Gd()?!1:(await T({[Pr]:Date.now()}),!0)}catch{return!0}}function Bl(){if(Ct()||!Or()||document.querySelector("#post_select")||Ir)return;let t=()=>{c.alive&&(Ir=c.setTimeout(async()=>{if(Ir=null,!c.alive||Ct()||tf(location.href)||document.querySelector("#post_select")||!Or())return;if(Ki||ji||zi){t();return}if((await k(ze))[ze]?.active){t();return}if(!await Ol()){t();return}try{Br()}catch{t()}},Rl()))};t()}function Nl(){if(!Ct()||Lr)return;let t=()=>{c.alive&&(Lr=c.setTimeout(async()=>{if(Lr=null,!(!c.alive||!Ct())){if(await Ol())try{c.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}t()}},Rl()))};t()}async function rf(){try{let t=await k(Er),e=Number(t[Er])||0;return Date.now()-e<Yd()?!1:(await T({[Er]:Date.now()}),!0)}catch{return!0}}function Hl(){if(!Ct()||Ui)return;let t=async()=>{if(Ui=null,!(!c.alive||!Ct())){try{if(er()){if(Pn||(Pn=Date.now()),Date.now()-Pn>=Al()){if(await rf()){try{q(`Date Loading stuck \u2265${Al()/1e3}s \u2014 reloading Application Home\u2026`)}catch{}try{c.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}}Pn=Date.now()}}else Pn=0}catch{}c.alive&&Ct()&&(Ui=c.setTimeout(t,Tl))}};Ui=c.setTimeout(t,Tl)}async function Wl(t){let e=String(t||"");if(/form resubmission|information that you entered|action that you took to be repeated|returning to that page might cause/i.test(e)){if(!Ct()&&!document.querySelector("#post_select")){try{sessionStorage.setItem(qr,"1")}catch{}c.setTimeout(()=>Br(),300)}return}if(!/PSE0501|unable to load appointment available days/i.test(e)||zi)return;zi=!0,c.setTimeout(()=>{zi=!1},8e3);let n=await I();await T({[ze]:{active:!0,ofcUrl:location.href,accountId:n,startedAt:Date.now()}}),c.send({action:"recoveryStart",ofcUrl:location.href})}var Vi="humanClickProfile",Hr=150,Ur=120,af=250,Fl=!1,_t=[],Yi=0,ut=0,ne=0,W=null,Wr=0,In=!1,Ke=null,Qi=0,Ji=0,Ln=[],Tt=!1,ye=!1;function sf(){let t=[];for(let e of document.querySelectorAll('iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]')){let n=e.getBoundingClientRect();n.width<40||n.height<20||n.width>900||n.height>400||t.push(n)}if(!t.length&&V())for(let e of document.querySelectorAll("iframe")){let n=e.getBoundingClientRect();n.width>=120&&n.width<=420&&n.height>=45&&n.height<=120&&t.push(n)}return t}function qn(){let t=sf();if(!t.length)return null;let e=t[0];return{x:e.left+Math.min(28,Math.max(18,e.width*.11)),y:e.top+e.height/2,w:e.width,h:e.height,left:e.left,top:e.top}}function je(t,e,n){return n?t>=n.left-40&&t<=n.left+n.w+40&&e>=n.top-30&&e<=n.top+n.h+30:!1}function jl(t){let e=performance.now();Yi||(Yi=e);let n=W,i=n?(t.clientX-n.x)/Math.max(24,n.w*.12):0,o=n?(t.clientY-n.y)/Math.max(20,n.h*.5):0;_t.push({nx:Math.round(i*1e3)/1e3,ny:Math.round(o*1e3)/1e3,x:Math.round(t.clientX),y:Math.round(t.clientY),t:Math.round(e-Yi)}),_t.length>Ur&&_t.shift()}async function Zi(){return(await k(Vi))[Vi]||{version:2,maxSamples:Hr,samples:[],avgHoverMs:420,avgPressMs:70,avgApproachMs:800,liveTrained:!1}}function Nr(t,e,n){if(!t.length)return n;let i=t.reduce((o,a)=>o+(Number(a[e])||0),0);return Math.round(i/t.length)}async function Gl(t,{force:e=!1}={}){let n=Date.now();if(!e&&n-Wr<af)return null;Wr=n;let i=await Zi(),o=Array.isArray(i.samples)?i.samples.slice():[];for(t.clientId||(t.clientId=`hc-${t.at||n}-${Math.random().toString(36).slice(2,10)}`),t.uploaded=!1,o.push(t);o.length>Hr;)o.shift();let a={version:2,maxSamples:Hr,samples:o,avgHoverMs:Nr(o,"hoverMs",420),avgPressMs:Nr(o,"pressMs",70),avgApproachMs:Nr(o,"approachMs",800),updatedAt:n,liveTrained:!0,source:"visa-page-live"};return await T({[Vi]:a}),Qi=o.length,z("human",`saved sample locally #${o.length}`,{capture:t.capture||"page",pressMs:t.pressMs,hoverMs:t.hoverMs,pathPts:Array.isArray(t.path)?t.path.length:0,clientId:t.clientId}),Yl(t,a).catch(()=>{}),Vl().catch(()=>{}),a}async function lf(t){if(!t)return;let e=await Zi(),n=Array.isArray(e.samples)?e.samples.slice():[],i=!1;for(let o of n)o?.clientId===t&&!o.uploaded&&(o.uploaded=!0,i=!0);i&&await T({[Vi]:{...e,samples:n,updatedAt:Date.now()}})}async function Yl(t,e){try{if(!await C("serverSync"))return z("upload","skipped \u2014 serverSync is OFF"),!1;let n=await B()||{},i=t.clientId||`hc-${t.at||Date.now()}-${Math.random().toString(36).slice(2,8)}`;t.clientId=i;let o={client_id:i,profile:{id:n.id||"",email:n.email||"",name:n.name||"",visa:n.visa||""},sample:t,profile_meta:{sampleCount:e?.samples?.length||0,avgHoverMs:e?.avgHoverMs,avgPressMs:e?.avgPressMs,avgApproachMs:e?.avgApproachMs,liveTrained:!0,source:"visa-page-live",extensionHost:location.host}};z("upload",`sending sample ${i}`,{sampleCount:e?.samples?.length||0,email:n.email||""}),c.send({action:"uploadHumanClickSample",payload:o});try{chrome.runtime.sendMessage({action:"uploadHumanClickSample",payload:o},a=>{if(chrome.runtime.lastError){z("upload",`SW error: ${chrome.runtime.lastError.message}`);return}a?.success?(z("upload",`server OK id=${a.id??"?"} status=${a.status??""}`,{clientId:i}),lf(i)):z("upload",`server FAIL ${a?.error||a?.status||"unknown"}`,{clientId:i})})}catch(a){z("upload",`sendMessage threw: ${a?.message||a}`)}return!0}catch(n){return z("upload",`upload threw: ${n?.message||n}`),!1}}async function Vl(){try{if(!await C("serverSync"))return;let t=await Zi(),n=(Array.isArray(t.samples)?t.samples:[]).filter(i=>i&&i.uploaded!==!0).slice(-40);for(let i of n)await Yl(i,t),await new Promise(o=>setTimeout(o,80))}catch{}}function Ql(t,e={}){let n=performance.now(),i=Math.max(25,Math.min(500,ut?n-ut:70)),o=Math.max(30,Math.min(3e3,ut?ut-(ne||ut):200)),a=(_t.length?_t:Ln).slice(-Ur),l=a.length?a[a.length-1].t:o,u=Math.max(o,Math.min(12e3,l||o)),f=Ke,d=W||qn();return{hoverMs:Math.round(o),pressMs:Math.round(i),approachMs:Math.round(u),path:a,down:f?{x:Math.round(f.x),y:Math.round(f.y)}:null,up:t?{x:Math.round(t.clientX),y:Math.round(t.clientY)}:f?{x:Math.round(f.x),y:Math.round(f.y)}:d?{x:Math.round(d.x),y:Math.round(d.y)}:null,target:d?{x:Math.round(d.x),y:Math.round(d.y),w:Math.round(d.w),h:Math.round(d.h),left:Math.round(d.left),top:Math.round(d.top)}:null,viewport:{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio||1,scrollX:Math.round(window.scrollX||0),scrollY:Math.round(window.scrollY||0)},pointerType:t?.pointerType||"mouse",url:location.pathname+location.search,at:Date.now(),...e}}function En(){_t.length&&(Ln=_t.slice(-Ur)),_t=[],Yi=0,ut=0,ne=0,Ke=null}function zr(){In||(In=!0,ye=!0,En(),W=qn())}function Fr(){In=!1,W=null,Tt=!1,En()}function Xi(t){let e=t?.target;if(!e)return!1;if(e.closest?.(".cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]"))return!0;if(e.tagName==="IFRAME"){let n=(e.src||"").toLowerCase();if(n.includes("challenges.cloudflare")||n.includes("turnstile"))return!0;let i=e.getBoundingClientRect();if(i.width>=120&&i.width<=420&&i.height>=45&&i.height<=120)return!0}return!1}async function Ul(t){if(c.alive){if(!V()||ct()){In&&Fr();return}zr(),W||(W=qn()),!ne&&W&&je(t.clientX,t.clientY,W)&&(ne=performance.now()),W&&je(t.clientX,t.clientY,W)&&(Ji=Date.now()),jl(t)}}async function zl(t){if(!(!c.alive||t.button!==0)&&!(!V()||ct())){zr(),W=qn(),ut=performance.now(),ne||(ne=ut),Ke={x:t.clientX,y:t.clientY},jl(t),(Xi(t)||W&&je(t.clientX,t.clientY,W))&&(Tt=!0,Ji=Date.now()),z("human","pointer down during challenge",{onWidget:Xi(t),near:!!(!W||je(t.clientX,t.clientY,W)),x:Math.round(t.clientX),y:Math.round(t.clientY)});try{Y("scanning",`Recording click\u2026 (saved ${Qi} so far)`)}catch{}}}async function Kl(t){if(!c.alive||t.button!==0||!ut&&!Tt)return;if(!V()&&!ct()){En();return}if(!(W&&je(t.clientX,t.clientY,W)||W&&Ke&&je(Ke.x,Ke.y,W)||Xi(t)||Tt||!W&&(_t.length>=2||Ln.length>=2))&&_t.length<2&&Ln.length<2){En();return}let n=Ql(t,{capture:Tt||Xi(t)?"iframe-or-widget":"page"});Tt=!1,En();let i=await Gl(n);if(!i)return;let o=i.samples?.length||0;try{Y("success",`Saved verify-human click #${o} \u2014 uploaded to server`)}catch{}}async function cf(){let t=Date.now();if(!ye||!ct()&&V())return;if(!(Tt||t-Ji<8e3||Ln.length>=2&&t-Wr>500)){ye=!1,Fr();return}let n=Ql(null,{capture:"challenge-solved"});Tt=!1,ye=!1,Fr();let i=await Gl(n,{force:!0});if(!i)return;let o=i.samples?.length||0;try{Y("success",`Saved verify-human click #${o} (after checkbox) \u2014 uploaded to server`)}catch{}}async function uf(){try{let t=await Zi(),e=t.liveTrained&&t.samples?.length||0;return Qi=e,e}catch{return Qi}}function Xl(){if(Fl)return;Fl=!0,z("human","train watcher started",{path:location.pathname}),c.on(window,"pointermove",Ul,{passive:!0,capture:!0}),c.on(window,"pointerdown",zl,{passive:!0,capture:!0}),c.on(window,"pointerup",Kl,{passive:!0,capture:!0}),c.on(window,"mousemove",Ul,{passive:!0,capture:!0}),c.on(window,"mousedown",zl,{passive:!0,capture:!0}),c.on(window,"mouseup",Kl,{passive:!0,capture:!0}),c.on(window,"blur",()=>{!V()||ct()||(Tt=!0,Ji=Date.now(),ut||(ut=performance.now(),ne||(ne=ut)),z("human","page blur during challenge (likely iframe click)"))});let t=async()=>{if(!c.alive)return;if(V()&&!ct()){ye||z("human","challenge detected \u2014 recording armed"),ye=!0,zr(),W||(W=qn());let n=await uf();try{Y("scanning",n?`Train mode \u2014 click Verify you are human naturally (saved ${n})`:"Train mode \u2014 move mouse naturally, then click Verify you are human (recording\u2026)")}catch{}return}(ye||In||Tt)&&await cf()};t(),c.setInterval(t,1200),c.setTimeout(()=>{z("upload","flushing unsynced local samples\u2026"),Vl().catch(()=>{})},2500)}var df=`
#${r.selRow} {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 11em;
  gap: 0.5em;
  width: max-content;
  max-width: 100%;
  margin: 0.25em auto 0;
  align-items: center;
}
#${r.waitTime} {
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
#${r.waitTime}[data-dragging] {
  cursor: grabbing;
  transition: none;
}
#${r.waitTime}[data-dodging] {
  box-shadow: 0 0 0 2px #22c55e, 0 2px 12px rgba(0,0,0,0.35);
}
#${r.recheck} {
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

#${r.waitTime} .${s.pill} {
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  white-space: nowrap;
}

#${r.waitTime} .${s.pillTtl} {
  flex: 1;
  min-width: 0;
  padding: 0.35em 0.5em;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}

#${r.waitTime} .${s.pillTmr} {
  display: flex;
  align-items: center;
  padding: 0.35em 0.55em;
  border-radius: 5px 0 0 5px;
  background: rgba(255, 255, 255, 0.25);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-variant-numeric: tabular-nums;
}

#${r.waitTime} .${s.pillWait} { background-color: rgba(255, 0, 0, 0.35); color: #5c0000; }
#${r.waitTime} .${s.pillDone} { background-color: #1a4480; color: white; }

#atlas-sidebar .${s.sideLink} { background-color: #1a4480; color: white; }
#${r.datesPara} { margin: 0.5em 0; line-height: 1.45; }

#${r.datesCont} .${s.datesLnk} { color: white; }
#${r.datesCont} .${s.slotsSum} {
  font-weight: 700;
  font-size: 1.05em;
  margin-bottom: 0.4em;
  color: #0b3d2e;
}
#${r.datesCont} .${s.slotsTbl},
#${r.slotsTbl} {
  width: auto;
  min-width: 220px;
  border-collapse: collapse;
  margin: 0.25em 0 0.5em;
  font-size: 0.95em;
}
#${r.datesCont} .${s.slotsTbl} th,
#${r.datesCont} .${s.slotsTbl} td,
#${r.slotsTbl} th,
#${r.slotsTbl} td {
  border: 1px solid #cbd5e0;
  padding: 0.3em 0.75em;
  text-align: left;
}
#${r.datesCont} .${s.slotsTbl} th,
#${r.slotsTbl} th {
  background: #edf2f7;
  font-weight: 600;
}
#${r.ofcDate} { font-weight: bold; }

.${s.card} {
  max-width: 400px;
  width: 100%;
  text-align: center;
  font-family: inherit;
}
#${r.histCont} { margin: 15px auto 0; }
#${r.cdCard} {
  margin: 20px auto 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 20px;
  box-sizing: border-box;
}

#${r.histCont} .${s.cardTtl} {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
}
#${r.histCont} .${s.histScrl} {
  max-height: 250px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #ffffff;
}
#${r.histTbl} {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  color: #2d3748;
}
#${r.histTbl} thead tr {
  border-bottom: 1px solid #e2e8f0;
  background: #edf2f7;
  position: sticky;
  top: 0;
}
#${r.histTbl} th {
  padding: 6px 10px;
  text-align: center;
  font-weight: 600;
  color: #4a5568;
}
#${r.histTbl} tbody tr { border-bottom: 1px solid #e2e8f0; }
#${r.histTbl} td {
  padding: 6px 10px;
  text-align: center;
  color: #718096;
}

#${r.histTbl} td.${s.dltDn} { color: #10b981; font-weight: 500; }
#${r.histTbl} td.${s.dltUp} { color: #ef4444; font-weight: 500; }

#${r.cdCard} .${s.cardTtl} {
  margin: 0 0 12px 0;
  font-size: 12px;
  font-weight: 700;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
#${r.cdTime} {
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin: 10px 0 15px;
  font-family: monospace, inherit;
}

#${r.cdTime}.${s.cdDiv}-over { font-size: 20px; }
.${s.cdDiv} {
  border-top: 1px solid #edf2f7;
  margin-top: 15px;
  padding-top: 12px;
}

.${s.footer} { font-size: 11px; }
#${r.histCont} .${s.footer} { margin-top: 8px; }
#${r.cdCard} .${s.footer} { margin: 0; }

#${r.histCont} .${s.footer} a,
#${r.cdCard} .${s.footer} a {
  color: #1a4480;
  text-decoration: none;
  font-weight: 500;
}

.${s.hidden} { display: none; }

#${r.aiBtn} {
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
#${r.aiBtn}.${s.aiOn} {
  background-color: #22c55e;
  box-shadow: none;
}
#${r.aiPanel} {
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
#${r.aiPanel}.${s.hidden} {
  display: none !important;
}
#${r.aiPanel} .${s.cardTtl} {
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
#${r.aiPanel} .${s.aiHint} {
  margin: 0 0 8px;
  font-size: 14.5px;
  line-height: 1.5;
  color: #6b7280;
  font-weight: 400;
}
#${r.aiPanel} .${s.aiHead} {
  font-weight: 700;
  color: #111827;
  font-size: 16px;
}
#${r.aiPanel} .${s.aiRow} {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}
#${r.aiPanel} .${s.aiSec} {
  margin: 0;
  padding: 16px 18px;
  background: #fff;
  border: 1.5px solid #111827;
  border-radius: 12px;
  box-sizing: border-box;
}
#${r.aiTermsGate},
#${r.aiMain} {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;
  padding: 0;
}
#${r.aiTermsGate}.${s.hidden},
#${r.aiMain}.${s.hidden} {
  display: none;
}
#${r.aiPanel} .${s.aiInfo} {
  margin: 0 0 10px;
  padding: 10px 12px;
  background: #eff6ff;
  border: 1px solid #93c5fd;
  border-radius: 8px;
  color: #1e40af;
  font-size: 14.5px;
  line-height: 1.5;
}
#${r.aiPanel} .${s.aiWarn} {
  margin: 0 0 10px;
  padding: 10px 12px;
  background: #fffbeb;
  border: 1px solid #f59e0b;
  border-radius: 8px;
  color: #92400e;
  font-size: 14.5px;
  line-height: 1.5;
}
#${r.aiPanel} .${s.aiOk},
#${r.aiStatus}.${s.aiOk} {
  margin: 0;
  padding: 10px 12px;
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 8px;
  color: #166534;
  font-size: 14.5px;
  line-height: 1.5;
}
#${r.aiPanel} label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14.5px;
  font-weight: 600;
  color: #374151;
}
#${r.aiPanel} input[type="text"],
#${r.aiPanel} input[type="password"],
#${r.aiPanel} input[type="email"],
#${r.aiPanel} select {
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
#${r.aiPanel} .${s.aiDateBtn} {
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
#${r.aiPanel} .${s.aiDateBtn}:hover {
  border-color: #2563eb;
  background: #eff6ff;
}
#${r.aiCal} {
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
#${r.aiCal}.${s.hidden} { display: none !important; }
#${r.aiCal} .${s.aiCalHead} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
}
#${r.aiCal} .${s.aiCalHead} .${s.aiHead} {
  font-size: 17px;
  margin: 0;
  flex: 1;
  text-align: center;
}
#${r.aiCal} .${s.aiCalHead} button {
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
#${r.aiCal} .${s.aiCalGrid} {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}
#${r.aiCal} .${s.aiCalGrid} .${s.aiHint} {
  margin: 0;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: #6b7280;
  padding: 4px 0;
  pointer-events: none;
}
#${r.aiCal} .${s.aiCalDay} {
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
#${r.aiCal} .${s.aiCalDay}:hover {
  background: #eff6ff;
  border-color: #93c5fd;
}
#${r.aiCal} .${s.aiCalDay}.${s.aiCalMuted} {
  color: #9ca3af;
  font-weight: 500;
  background: #f9fafb;
}
#${r.aiCal} .${s.aiCalDay}:disabled,
#${r.aiCal} .${s.aiCalDay}[aria-disabled="true"] {
  opacity: 0.4;
  cursor: not-allowed;
  background: #f3f4f6;
  color: #9ca3af;
  pointer-events: none;
}
#${r.aiCal} .${s.aiCalDay}.${s.aiCalToday} {
  border-color: #3b82f6;
}
#${r.aiCal} .${s.aiCalDay}.${s.aiCalOn} {
  background: #3b82f6;
  border-color: #2563eb;
  color: #fff;
}
#${r.aiCal} .${s.aiRow} {
  margin: 12px 0 0;
  justify-content: space-between;
}
#${r.aiCal} .${s.aiRow} button {
  background: #eef0f3;
  color: #111827;
  min-height: 40px;
  font-size: 14.5px;
  cursor: pointer;
}
#${r.aiPanel} input[type="text"]:focus,
#${r.aiPanel} input[type="password"]:focus,
#${r.aiPanel} input[type="email"]:focus,
#${r.aiPanel} select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: none;
}
#${r.aiPanel} button {
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14.5px;
  font-weight: 600;
}
#${r.aiClose} { background: #eef0f3; color: #374151; }
#${r.aiSaveLogin} { background: #374151; color: #fff; }
#${r.aiWinAdd}, #${r.aiWinSave} { background: #3b82f6; color: #fff; }
#${r.aiWinReset} { background: #eef0f3; color: #374151; }
#${r.aiLoginToggle} { background: #eef0f3; color: #111827; }

#${r.aiPanel} .${s.aiQl} {
  margin-top: 4px;
  padding: 14px 14px 12px;
  border: 1px solid #111827;
  border-radius: 10px;
  background: #fff;
}
#${r.aiPanel} .${s.aiQlTitle} {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
}
#${r.aiPanel} .${s.aiQlSub} {
  margin: 4px 0 12px;
  font-size: 12px;
  color: #64748b;
  line-height: 1.35;
}
#${r.aiPanel} .${s.aiQlCard} {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 0;
  border-top: 1px solid #e2e8f0;
}
#${r.aiPanel} .${s.aiQlCard}:first-child {
  border-top: none;
  padding-top: 2px;
}
#${r.aiPanel} .${s.aiQlMeta} {
  min-width: 0;
  flex: 1;
}
#${r.aiPanel} .${s.aiQlMeta} strong {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  word-break: break-word;
}
#${r.aiPanel} .${s.aiQlMeta} span {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  color: #64748b;
}
#${r.aiPanel} .${s.aiQlBadge} {
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
#${r.aiPanel} .${s.aiQlEdit} {
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
#${r.aiPanel} .${s.aiQlEdit}:hover { color: #1d4ed8; }
#${r.aiPanel} .${s.aiQlAdd} {
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
#${r.aiPanel} .${s.aiQlAdd}:hover { background: #f8fafc; }
#${r.aiPanel} .${s.aiQlEmpty} {
  margin: 0 0 4px;
  font-size: 12px;
  color: #64748b;
}

#${r.aiPanel} .${s.aiSwitch} {
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
#${r.aiPanel} .${s.aiSwitch}.${s.aiOnBtn} {
  background: #3b82f6;
  box-shadow: none;
}
#${r.aiPanel} .${s.aiKnob} {
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
#${r.aiPanel} .${s.aiSwitch}.${s.aiOnBtn} .${s.aiKnob} {
  transform: translateX(20px);
}

#${r.aiStatus} { margin: 0; }
#${r.aiPanel} .${s.aiCities} {
  max-height: 150px;
  overflow: auto;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 10px;
  margin-bottom: 0;
  background: #f9fafb;
}
#${r.aiPanel} .${s.aiCityAct} {
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
#${r.aiPanel} .${s.aiCityAct}:hover { color: #2563eb; }
#${r.aiPanel} .${s.aiCities} label {
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  margin: 5px 0;
  color: #1f2937;
  font-size: 14.5px;
}
#${r.aiPanel} .${s.aiCities} input[type="checkbox"] {
  margin: 0;
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
}
#${r.aiPanel} .${s.aiRow} label { flex: 1; min-width: 140px; }

#${r.aiWinList} {
  display: grid;
  gap: 10px;
  margin: 0 0 6px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
}
#${r.aiPanel} .${s.aiWinRow} {
  display: grid;
  gap: 4px;
  padding: 12px;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}
#${r.aiPanel} .${s.aiWinRow}:last-child {
  padding-bottom: 12px;
}
#${r.aiPanel} .${s.aiInline} {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
#${r.aiPanel} .${s.aiInline} select {
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
#${r.aiPanel} .${s.aiInline} .${s.aiHead} {
  margin: 0;
  flex-direction: row;
  font-size: 14.5px;
}
#${r.aiPanel} .${s.aiWinHelp} {
  font-size: 14.5px;
  color: #6b7280;
  margin-left: 2px;
}
#${r.aiPanel} .${s.aiTrash} {
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
#${r.aiPanel} .${s.aiTrash}:hover { background: #fef2f2; }
#${r.aiWinNote} { margin: 0 0 8px; font-size: 14.5px; color: #6b7280; }

#${r.aiPanel} .${s.aiTerms} {
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
#${r.aiPanel} .${s.aiTerms} .${s.aiHead} {
  margin: 0 0 6px;
  font-size: 20px;
  text-align: center;
}
#${r.aiPanel} .${s.aiTerms} .${s.aiHint} {
  text-align: center;
  margin: 0 0 14px;
}
#${r.aiPanel} .${s.aiTermsList} {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  display: grid;
  gap: 10px;
}
#${r.aiPanel} .${s.aiTermsList} li {
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
#${r.aiPanel} .${s.aiTermsList} li::before {
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
#${r.aiPanel} .${s.aiTermsCb} {
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
#${r.aiPanel} .${s.aiTermsCb} input[type="checkbox"] {
  margin: 2px 0 0;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  accent-color: #3b82f6;
}
#${r.aiPanel} .${s.aiContinue} {
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
#${r.aiPanel} .${s.aiContinue}:disabled {
  background: #94a3b8;
  cursor: not-allowed;
  opacity: 0.75;
}
#${r.aiTermsContinue}:not(:disabled) {
  background: #2563eb;
}

/* Sample D \u2014 Tik Tik email / OTP login */
#${r.authBody} .${s.authCard} {
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 14px;
  padding: 16px 16px 14px;
  box-sizing: border-box;
}
#${r.authBody} .${s.authClose} {
  float: right;
  background: none;
  border: 0;
  color: #64748b;
  cursor: pointer;
  font-size: 13px;
  padding: 0;
  margin: 0 0 8px;
}
#${r.authBody} .${s.authSteps} {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 4px 0 14px;
  clear: both;
  font-size: 13px;
  color: #94a3b8;
}
#${r.authBody} .${s.authStep} {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
#${r.authBody} .${s.authStep} span {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 1.5px solid #cbd5e1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #94a3b8;
}
#${r.authBody} .${s.authStep}.${s.authStepOn} {
  color: #0f172a;
  font-weight: 600;
}
#${r.authBody} .${s.authStep}.${s.authStepOn} span {
  border-color: #0f172a;
  background: #0f172a;
  color: #fff;
}
#${r.authBody} .${s.authEmailBox} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 10px 12px;
  margin-bottom: 14px;
  background: #f8fafc;
  font-size: 14px;
  color: #0f172a;
  word-break: break-all;
}
#${r.authBody} .${s.authEmailBox} button {
  background: none;
  border: 0;
  color: #1d4ed8;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
  padding: 0;
}
#${r.authBody} .${s.authTitle} {
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
}
#${r.authBody} .${s.authOtpRow} {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 14px 0 16px;
}
#${r.authBody} .${s.authOtpBox} {
  width: 52px;
  height: 56px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  border: 1.5px solid #cbd5e1;
  border-radius: 12px;
  box-sizing: border-box;
  background: #fff;
  color: #0f172a;
}
#${r.authBody} .${s.authOtpBox}:focus {
  outline: none;
  border-color: #0f172a;
}
#${r.authBody} .${s.authBtn} {
  width: 100%;
  padding: 13px 16px;
  background: #0f172a;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 15.5px;
  font-weight: 700;
  cursor: pointer;
}
#${r.authBody} .${s.authBtn}:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}
#${r.authBody} .${s.authLinks} {
  display: flex;
  gap: 18px;
  justify-content: center;
  margin-top: 14px;
  flex-wrap: wrap;
}
#${r.authBody} .${s.authLink} {
  background: none;
  border: 0;
  color: #1d4ed8;
  cursor: pointer;
  font-size: 13.5px;
  font-weight: 600;
  padding: 0;
}
#${r.authBody} .${s.authSecure} {
  margin: 16px 0 0;
  text-align: center;
  font-size: 12px;
  color: #94a3b8;
}
#${r.authBody} input[type="email"] {
  width: 100%;
  box-sizing: border-box;
  margin: 10px 0 12px;
  padding: 12px 14px;
  border: 1.5px solid #cbd5e1;
  border-radius: 12px;
  font-size: 15px;
  background: #fff;
}

/* Sample B \u2014 payment plans (radio list + Continue) */
#${r.authBody} .${s.authBrand} {
  margin: 0 0 2px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
}
#${r.authBody} .${s.authEmailChip} {
  display: inline-block;
  margin: 0 0 14px;
  padding: 5px 10px;
  border-radius: 999px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  font-size: 12.5px;
  color: #334155;
  word-break: break-all;
}
#${r.authBody} .${s.authPlanList} {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 0 14px;
}
#${r.authBody} .${s.authPlanRow} {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  padding: 12px 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  color: #0f172a;
  font: inherit;
}
#${r.authBody} .${s.authPlanRow}:hover:not(:disabled) {
  border-color: #94a3b8;
}
#${r.authBody} .${s.authPlanRow}.${s.authPlanOn} {
  border-color: #0f172a;
  background: #f8fafc;
  box-shadow: 0 0 0 1px #0f172a;
}
#${r.authBody} .${s.authPlanRow}.${s.authPlanOff},
#${r.authBody} .${s.authPlanRow}:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
#${r.authBody} .${s.authPlanRadio} {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 2px solid #cbd5e1;
  flex-shrink: 0;
  box-sizing: border-box;
  background: #fff;
}
#${r.authBody} .${s.authPlanRow}.${s.authPlanOn} .${s.authPlanRadio} {
  border-color: #0f172a;
  background: radial-gradient(circle, #0f172a 0 45%, #fff 48% 100%);
}
#${r.authBody} .${s.authPlanMeta} {
  flex: 1;
  min-width: 0;
}
#${r.authBody} .${s.authPlanName} {
  font-size: 14.5px;
  font-weight: 700;
  line-height: 1.25;
}
#${r.authBody} .${s.authPlanDesc} {
  margin-top: 2px;
  font-size: 12.5px;
  color: #64748b;
  line-height: 1.3;
}
#${r.authBody} .${s.authPlanPrice} {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.02em;
  flex-shrink: 0;
}

#${r.cfHud} {
  position: fixed;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2147483646;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
#${r.cfHud} .${s.cfHud} {
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
#${r.cfHud} .${s.cfHud}[data-state="success"] {
  border-color: rgba(34, 197, 94, 0.45);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 24px rgba(34, 197, 94, 0.15);
}
#${r.cfHud} .${s.cfHud}[data-state="manual"] {
  border-color: rgba(251, 191, 36, 0.45);
}
#${r.cfHud} .${s.cfHud}[data-state="debugger"] {
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.32), 0 0 28px rgba(59, 130, 246, 0.18);
}
#${r.cfHud} .${s.cfPulse} {
  width: 10px;
  height: 10px;
  margin-top: 5px;
  border-radius: 50%;
  background: #60a5fa;
  box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.55);
  animation: ${p}cfpulse 1.6s ease-out infinite;
  flex-shrink: 0;
}
#${r.cfHud} .${s.cfHud}[data-state="success"] .${s.cfPulse} {
  background: #4ade80;
  animation: none;
  box-shadow: 0 0 12px rgba(74, 222, 128, 0.65);
}
#${r.cfHud} .${s.cfHud}[data-state="manual"] .${s.cfPulse} {
  background: #fbbf24;
}
@keyframes ${p}cfpulse {
  0% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.55); }
  70% { box-shadow: 0 0 0 10px rgba(96, 165, 250, 0); }
  100% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0); }
}
#${r.cfHud} .cf-hud-body { flex: 1; min-width: 0; }
#${r.cfHud} .cf-hud-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
#${r.cfHud} .cf-hud-icon { font-size: 14px; line-height: 1; }
#${r.cfHud} .cf-hud-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #f8fafc;
}
#${r.cfHud} .cf-hud-chip {
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
#${r.cfHud} .cf-hud-chip[data-state="success"] {
  background: rgba(34, 197, 94, 0.18);
  color: #86efac;
  border-color: rgba(74, 222, 128, 0.35);
}
#${r.cfHud} .cf-hud-chip[data-state="manual"] {
  background: rgba(251, 191, 36, 0.15);
  color: #fcd34d;
  border-color: rgba(251, 191, 36, 0.35);
}
#${r.cfHud} .cf-hud-msg {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.35;
  color: #f1f5f9;
}
#${r.cfHud} .cf-hud-sub {
  margin-top: 3px;
  font-size: 11px;
  line-height: 1.35;
  color: #94a3b8;
}
.${s.cfFlash} {
  position: fixed;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid rgba(96, 165, 250, 0.85);
  box-shadow: 0 0 18px rgba(59, 130, 246, 0.55);
  z-index: 2147483647;
  pointer-events: none;
  animation: ${p}cfring 1.1s ease-out forwards;
}
@keyframes ${p}cfring {
  0% { transform: scale(0.6); opacity: 1; }
  100% { transform: scale(2.2); opacity: 0; }
}

/* Sample A \u2014 Tik Tik status HUD (bottom-right) */
#${r.hud}.${s.hud} {
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
#${r.hud} .${s.hudHead} {
  background: #0b3a6e;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 12px 18px;
}
#${r.hud} .${s.hudName} {
  font-size: 18px;
  font-weight: 800;
  padding: 16px 18px 0;
  line-height: 1.3;
}
#${r.hud} .${s.hudVisa} {
  font-size: 14px;
  color: #64748b;
  padding: 4px 18px 12px;
}
#${r.hud} .${s.hudBody} {
  padding: 0 18px 12px;
  min-height: 0;
}
#${r.hud} .${s.hudCount} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  background: #eef4fb;
  border: 1px solid #c7d7ee;
  border-radius: 10px;
}
#${r.hud} .${s.hudCountLabel} {
  font-size: 14px;
  color: #334155;
  font-weight: 600;
}
#${r.hud} .${s.hudSecs} {
  font-size: 36px;
  font-weight: 800;
  color: #0b3a6e;
  letter-spacing: -0.03em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
#${r.hud} .${s.hudStuck} {
  padding: 14px 16px;
  background: #f8fafc;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  color: #334155;
}
#${r.hud} .${s.hudSubmit} {
  padding: 14px 16px;
  background: #fff7ed;
  border: 1px solid #fdba74;
  border-radius: 10px;
}
#${r.hud} .${s.hudSubmitTitle} {
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #c2410c;
}
#${r.hud} .${s.hudSubmitSub} {
  margin-top: 4px;
  font-size: 13px;
  color: #9a3412;
}
#${r.hud} .${s.hudCities} {
  display: none !important;
}
#${r.hud} .${s.hudCitiesTitle},
#${r.hud} .${s.hudHistTitle} {
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 8px;
}
#${r.hud} .${s.hudCityLabel} {
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
#${r.hud} .${s.hudCityLabel} input {
  margin-top: 2px;
  flex-shrink: 0;
  width: 15px;
  height: 15px;
  cursor: pointer;
}
#${r.hud} .${s.hudHist} {
  border-top: 1px solid #e2e8f0;
  padding: 12px 18px 16px;
}
#${r.hud} .${s.hudHistRow} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 13px;
  padding: 5px 0;
  color: #0f172a;
}
#${r.hud} .${s.hudHistRow} > span:first-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
#${r.hud} .${s.hudPillOk},
#${r.hud} .${s.hudPillNo} {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 999px;
}
#${r.hud} .${s.hudPillOk} {
  background: #dcfce7;
  color: #166534;
}
#${r.hud} .${s.hudPillNo} {
  background: #f1f5f9;
  color: #64748b;
}
`;function Jl(){if(document.querySelector(h(r.styles)))return;let t=document.createElement("style");t.id=r.styles,t.dataset[P.mark]="",t.textContent=df,(document.head||document.documentElement).appendChild(t)}aa();hr();jr(()=>{tl(),c.destroy()});ha();kl();M()&&I().then(t=>{if(t)return xi(t);Le()}).catch(()=>Le());if(!M()){c.disposable(()=>{let i=document.querySelector(h(r.anchor)),o=document.querySelector("#post_select");i&&o&&i.replaceWith(o);for(let a of document.querySelectorAll("[data-"+P.mark+"]"))a.remove()}),Jl(),c.send({action:"registerBlockGuard",prefix:p}),c.send({action:"registerRedirect",prefix:p}),c.send({action:"registerAlertGuard",prefix:p}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&c.send({action:"registerOfcReader",prefix:p}),c.on(window,"message",i=>{if(c.alive&&i.source===window)switch(i.data?.action){case Ft.req:return bl(i);case Ft.res:return yl(i);case Ft.ofc:return Na(i);case Ft.err:return sn("native_alert",i.data?.text),yn(String(i.data?.text||"alert").slice(0,120)),Wl(i.data?.text);case Ft.sub:Ia(),an(),Va(),gt().then(o=>{$n(o?.accountId||null)}).catch(()=>{$n(null)});return}}),chrome.storage.onChanged.addListener((i,o)=>{o==="local"&&(i.profile&&go(),i.waitPillClock&&Pa(i.waitPillClock.newValue),i.autoCloudflareTick&&(i.autoCloudflareTick.newValue?Dr():Ar()))}),c.on(document,"click",i=>{ke();let o=i.target.closest(h(r.waitTime));if(o){if(o.dataset.skipClick){delete o.dataset.skipClick;return}Da()}}),c.on(document,"keydown",ke),c.on(window,"focus",()=>ke({keepConsular:!0})),c.on(document,"visibilitychange",()=>{document.hidden||ke({keepConsular:!0})}),La(),El(),ql(),Bl(),Nl(),Hl(),Xl(),Dr();async function t(){!c.alive||M()||!Sn()||document.querySelector("#post_select")&&($t(),await Promise.all([fo(),mo(),gr()]),Za({slotIndex:xn,shouldPick:async()=>await gt()?!0:!!await C("autoSelectFirstDate"),onSlotPicked:()=>el()}))}async function e(){!c.alive||M()||!Sn()||await Zs()}async function n(){ca(),da(),await Promise.all([go(),pa(),fa(),fo(),mo(),gr()]),no()}document.readyState==="complete"?n():c.on(window,"load",n),c.setInterval(t,2500),c.setInterval(e,3e4),e()}})();
