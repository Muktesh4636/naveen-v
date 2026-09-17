(()=>{function F(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function v(t){return F()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,o]of Object.entries(t))e[n]=o;return e}):Promise.resolve(typeof t=="string"?{}:t)}function _(t){return F()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function ro(t){return F()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function ao(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",o=>{String(o.reason?.message||o.reason||"").includes("Extension context invalidated")&&(o.preventDefault(),e())});let n=setInterval(()=>{F()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var Kt="https://the.gopg.online",rn=`${Kt}/contribute`,so=`${Kt}/contribute/telegram`,dc=`${Kt}/contribute/human-click`;var co=20,lo=4320*60*1e3,be=100,uo=4,we=100,fo=240,mo=50,po=1440*60*1e3,Lr={recheckButton:!1,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function x(t){return v({[t]:Lr[t]}).then(e=>e[t])}function st(){return v({posts:[]}).then(t=>t.posts)}function Mt(t){return _({posts:t})}function U(){return v("profile").then(t=>t.profile)}var wt=t=>String(t).padStart(2,"0");function Gt(t){let e=wt(t%60),n=Math.floor(t/60)%60,o=Math.floor(t/3600);return o?`${wt(o)}:${wt(n)}:${e}`:`${wt(n)}:${e}`}function ho(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${wt(n.getUTCHours())}:${wt(n.getUTCMinutes())}:${wt(n.getUTCSeconds())}`}}function an(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),o=t%60,i=[];return e>0&&i.push(`${e}d`),(n>0||e>0)&&i.push(`${n}h`),i.push(`${o}m`),i.join(" ")}function go(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),o=i=>n.find(r=>r.type===i)?.value??"";return`${o("month")} ${o("day")} ${o("year")} ${o("hour")}:${o("minute")} ${o("dayPeriod")}`}function yo(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),o=parseInt(e[2],10),i=parseInt(e[3],10),r=e[4];r&&(r.toUpperCase()==="PM"&&n<12&&(n+=12),r.toUpperCase()==="AM"&&n===12&&(n=0));let a=new Date;return a.setHours(n,o,i,0),a.getTime()>Date.now()+6e4&&a.setDate(a.getDate()-1),a}var bo=Symbol(),Rr=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&F()}on(t,e,n,o){t.addEventListener(e,n,{...o,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!F())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=uo,interval:n=be}={}){return new Promise(o=>{let i=r=>{if(!this.alive)return;let a=document.querySelector(t);if(a)return o(a);if(r>=e)return o(null);this.setTimeout(()=>i(r+1),n)};i(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},c=new Rr;function wo(){let t=globalThis[bo];Object.defineProperty(globalThis,bo,{value:c,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var Se=new Uint32Array(2);crypto.getRandomValues(Se);var So="abcdefghjkmnpqrstuvwxyz",Pr=(Se[0].toString(36)+Se[1].toString(36)).replace(/[^a-z0-9]/g,""),p=(So[Se[0]%So.length]+Pr).slice(0,8).padEnd(8,"x");function g(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var s={selRow:p+"01",anchor:p+"02",waitTime:p+"03",recheck:p+"04",histCont:p+"05",histTbl:p+"06",cdCard:p+"07",cdTime:p+"08",ofcDate:p+"09",styles:p+"10",datesCont:p+"11",datesPara:p+"12",slotsTbl:p+"12b",aiBtn:p+"13",aiPanel:p+"14",aiFrom:p+"15",aiTo:p+"16",aiStatus:p+"17",aiConfirm:p+"18",aiCancel:p+"19",aiClose:p+"20",aiCities:p+"21",aiSubmitBtn:p+"22",aiCitiesBtn:p+"23",aiLogin:p+"24",aiPass:p+"25",aiQ1:p+"26",aiA1:p+"27",aiQ2:p+"28",aiA2:p+"29",aiQ3:p+"30",aiA3:p+"31",aiSaveLogin:p+"32",cfHud:p+"33",aiCitiesAll:p+"34",aiCitiesNone:p+"35",aiLoginToggle:p+"36",aiLoginBody:p+"37"},f={pill:p+"a",pillTtl:p+"b",pillTmr:p+"c",pillWait:p+"d",pillDone:p+"e",footer:p+"f",card:p+"g",cardTtl:p+"h",histScrl:p+"i",dltDn:p+"j",dltUp:p+"k",cdDiv:p+"l",hidden:p+"m",sideLink:p+"n",datesLnk:p+"o",slotsSum:p+"o2",slotsTbl:p+"o3",aiOn:p+"p",aiRow:p+"q",aiHint:p+"r",aiCities:p+"s",aiOnBtn:p+"t",aiCityAct:p+"x",cfHud:p+"u",cfPulse:p+"v",cfFlash:p+"w"},C={mark:p,w:p+"w",mw:p+"mw"},ct={req:p+"q",res:p+"r",ofc:p+"o",err:p+"e",sub:p+"s"};function xe(t){return t.map(e=>String.fromCharCode(e)).join("")}function qr(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function xo(){let t=document.createElement("div");return t.className=f.footer,t.textContent=xe([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function Or(t){let e=document.getElementById(s.histCont);e&&e.remove(),e=document.createElement("div"),e.id=s.histCont,e.className=f.card,e.dataset[C.mark]="";let n=document.createElement("h4");n.className=f.cardTtl,n.textContent=xe([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let o=document.createElement("div");o.className=f.histScrl;let i=document.createElement("table");i.id=s.histTbl;let r=document.createElement("thead"),a=document.createElement("tr");for(let u of["Time","Est. Wait","Change"]){let m=document.createElement("th");m.textContent=u,a.appendChild(m)}r.appendChild(a),i.appendChild(r);let l=document.createElement("tbody");for(let u=t.length-1;u>=0;u--){let m=t[u],h="--",b="";if(u>0){let I=m.minutes-t[u-1].minutes;I<0?(h=`${I}m`,b=f.dltDn):I>0?(h=`+${I}m`,b=f.dltUp):h="0m"}let T=document.createElement("tr"),W=[[m.timeStr,""],[an(m.minutes),""],[h,b]];for(let[I,O]of W){let S=document.createElement("td");O&&(S.className=O),S.textContent=I,T.appendChild(S)}l.appendChild(T)}i.appendChild(l),o.appendChild(i),e.appendChild(o),e.appendChild(xo());let d=document.getElementById("last-updated");d&&(d.closest("div, p, section")||d.parentElement).insertAdjacentElement("afterend",e)}function Nr(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function vo(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),o=Nr();if(o!==null&&o>fo&&!e.textContent.includes("(")){let a=an(o);e.textContent=`${e.textContent} (${o} minutes / ${a})`}let i=n.textContent.trim().split(" (")[0],r=yo(i);if(r&&c.setInterval(()=>{let a=Math.floor((Date.now()-r)/1e3);a>=0&&(n.textContent=`${i} (${a}s ago)`)},1e3),o!==null){let a=qr(),l=sessionStorage.getItem(a);l||(l=Math.random().toString(36).substring(2,11),sessionStorage.setItem(a,l)),v({queueHistory:{}}).then(d=>{let u=d.queueHistory||{},m=Date.now(),h={};for(let[I,O]of Object.entries(u)){if(!Array.isArray(O))continue;let S=O[O.length-1];S&&m-S.timestamp<po&&(h[I]=O)}let b=h[l]||[],T=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),W=b[b.length-1];(!W||W.minutes!==o||W.timeStr!==T)&&(b.push({timestamp:m,timeStr:T,minutes:o}),b.length>mo&&b.shift(),h[l]=b,_({queueHistory:h})),Or(b)})}}function To(t,e){let n=document.getElementById("error_row");if(!n)return;let o;t?o=e?`Blocked for 24 hours, about ${Gt(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":o="Temporarily blocked. Log in in a new tab, then refresh this page.";let i=document.createElement("div");i.className="atlas_validationalert alert alert-danger warning",i.dataset[C.mark]="",i.textContent=o,n.replaceChildren(i),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function _o(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&v({cfRetryAfter:null}).then(n=>{let o=parseInt(n.cfRetryAfter,10);if(!isNaN(o)){ro("cfRetryAfter");let i=document.getElementById("what-happened-section");if(i){let r=document.createElement("div");r.id=s.cdCard,r.className=f.card,r.dataset[C.mark]="";let a=document.createElement("h4");a.className=f.cardTtl,a.textContent=xe([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),r.appendChild(a);let l=document.createElement("div");l.id=s.cdTime,r.appendChild(l);let d=document.createElement("div");d.className=f.cdDiv,r.appendChild(d),r.appendChild(xo()),i.appendChild(r);let u=o,m=null,h=()=>{u>0?(l.textContent=Gt(u),u--):(l.classList.add(f.cdDiv+"-over"),l.textContent="You can try refreshing now!",m!=null&&c.clear(m))};h(),m=c.setInterval(h,1e3)}}})}async function Co(){let t=document.querySelector(".username");if(!t)return;let e=t.innerText.match(/(.*)\((\d*)\)/);if(!e)return;let[,n,o]=e,i=await U()||{},r=!i.id||i.id===o?i:{};r.name=n.trim(),r.id=o;let a=document.querySelectorAll("script");for(let l of a){let d=l.innerText.trim();if(d.includes("setAuthenticatedUserContext")){let u=/setAuthenticatedUserContext\('([^']*)'\)/,m=d.match(u);m&&(r.email=m[1])}}await _({profile:r})}async function ko(){let t=document.querySelector("#post_select");if(!t)return;let e=await st();for(let n of t.options){if(!n.value)continue;e.findIndex(i=>i.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await Mt(e)}var Hr=["visa-information","fee-payment","appointment-confirmation"];function Br(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(o=>{let i=o.querySelector(".text-bold");if(!i)return;let r=Wr(i.textContent);if(!Hr.includes(r))return;let a=Fr(o);a&&(n[r]=a)}),Object.keys(n).length?n:null}function Wr(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Fr(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function Mo(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>lo)return null}catch{}return t.value}function Ur(t){let e=(t.posts||[]).filter(i=>i.Updated).sort((i,r)=>i.Updated-r.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},o=Mo(t.cgiIdToken);return o&&(n.token=o),n}async function sn(){if(!F()||!await x("serverSync"))return;let t=await v(["profile","posts","cgiIdToken"]),e=Ur(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await fetch(rn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(i=>i.json());if(!n.success)return;let o="0";n.contribs>0&&(o=n.contribs.toString()),n.contribs>10&&(o="10+"),n.contribs>0&&await _({contribs:{email:t.profile?.email,updated:Date.now(),count:o}})}catch{}}function cn(t=0){F()&&document.querySelector("#appointment-card")&&x("serverSync").then(e=>{if(!e)return;let n=Br();if(!n){t<co&&c.setTimeout(()=>cn(t+1),be);return}v(["profile","cgiIdToken","savedDashboard"]).then(o=>{let i=Mo(o.cgiIdToken);i&&JSON.stringify(n)!==JSON.stringify(o.savedDashboard)&&fetch(rn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:o.profile,dashboard:n,token:i})}).then(r=>r.json()).then(r=>{r.success&&_({savedDashboard:n})}).catch(()=>{})})})}var Kr=`${Kt}/extension-runtime-config.json`,un="vsRuntimeConfig",Gr=300*1e3,ln=0,Yt=null,y={slotWindowLabel:":05\u2013:13, :14\u2013:21, :24\u2013:31, :35\u2013:50, :54\u2013:02",slotWindows:[{slot:5,fromMin:0,toMin:2},{slot:1,fromMin:5,toMin:13},{slot:2,fromMin:14,toMin:21},{slot:3,fromMin:24,toMin:31},{slot:4,fromMin:35,toMin:50},{slot:5,fromMin:54,toMin:59}],windowStartsMin:[0,5,14,24,35,54],cityLoadingMaxMs:18e4,cityCalendarNoDatesMs:2e4,cityRotateMinGapMs:13e3,cityRotateMaxGapMs:18e3,cityHoldMaxMs:45e3,homeKeepaliveMinMs:6e5,homeKeepaliveMaxMs:6e5,homeKeepaliveDebounceMs:48e4,loadingStuckMs:12e4,loadingStuckDebounceMs:9e4,remoteVersion:0,source:"bundled"};function H(t,e,n,o){let i=Number(t);return Number.isFinite(i)?Math.min(n,Math.max(e,Math.round(i))):o}function Yr(t){if(!Array.isArray(t)||!t.length||t.length>24)return null;let e=[];for(let n of t){let o=H(n?.fromMin,0,59,NaN),i=H(n?.toMin,0,59,NaN);if(!Number.isFinite(o)||!Number.isFinite(i)||o>i)return null;let r=H(n?.slot,1,12,1);e.push({slot:r,fromMin:o,toMin:i})}return e}function jr(t){let e=[...new Set(t.map(n=>n.fromMin))].sort((n,o)=>n-o);return e.length?e:y.windowStartsMin.slice()}function $o(t,e="remote"){if(!t||typeof t!="object")return!1;let n=Yr(t.slotWindows);if(n){y.slotWindows.length=0;for(let o of n)y.slotWindows.push(o);y.windowStartsMin=jr(n)}return typeof t.slotWindowLabel=="string"&&t.slotWindowLabel.length<120&&(y.slotWindowLabel=t.slotWindowLabel),y.cityLoadingMaxMs=H(t.cityLoadingMaxMs,1e4,3e5,y.cityLoadingMaxMs),y.cityCalendarNoDatesMs=H(t.cityCalendarNoDatesMs,5e3,12e4,y.cityCalendarNoDatesMs),y.cityRotateMinGapMs=H(t.cityRotateMinGapMs,5e3,6e4,y.cityRotateMinGapMs),y.cityRotateMaxGapMs=H(t.cityRotateMaxGapMs,y.cityRotateMinGapMs,9e4,Math.max(y.cityRotateMinGapMs,y.cityRotateMaxGapMs)),y.cityHoldMaxMs=H(t.cityHoldMaxMs,1e4,18e4,y.cityHoldMaxMs),y.homeKeepaliveMinMs=H(t.homeKeepaliveMinMs,12e4,18e5,y.homeKeepaliveMinMs),y.homeKeepaliveMaxMs=H(t.homeKeepaliveMaxMs,y.homeKeepaliveMinMs,18e5,Math.max(y.homeKeepaliveMinMs,y.homeKeepaliveMaxMs)),y.homeKeepaliveDebounceMs=H(t.homeKeepaliveDebounceMs,6e4,18e5,y.homeKeepaliveDebounceMs),y.loadingStuckMs=H(t.loadingStuckMs,3e4,6e5,y.loadingStuckMs),y.loadingStuckDebounceMs=H(t.loadingStuckDebounceMs,3e4,6e5,y.loadingStuckDebounceMs),y.remoteVersion=H(t.version,0,1e9,y.remoteVersion),y.source=e,!0}async function zr(){try{let e=(await v(un))[un];e?.config&&$o(e.config,"cache")}catch{}}async function Vr(t){try{await _({[un]:{config:t,fetchedAt:Date.now()}})}catch{}}async function Xr({force:t=!1}={}){let e=Date.now();if(!t&&e-ln<Gr)return y;if(Yt)return Yt;Yt=(async()=>{await zr();try{let n=await fetch(Kr,{method:"GET",cache:"no-store",signal:AbortSignal.timeout(8e3)});if(!n.ok)throw new Error(`HTTP ${n.status}`);let o=await n.json();if(!o||typeof o!="object"||Array.isArray(o))throw new Error("bad json");if(o.script||o.code||o.eval)throw new Error("unsafe keys");$o(o,"remote"),await Vr(o),ln=Date.now()}catch{ln=Date.now()}return y})();try{return await Yt}finally{Yt=null}}function Ao(){Xr().catch(()=>{})}function X(){return y.slotWindowLabel}var Lc=y.slotWindows;function Do(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=o=>Number(e.find(i=>i.type===o)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function $t(t=new Date){let{minute:e}=Do(t);for(let n of y.slotWindows)if(e>=n.fromMin&&e<=n.toMin)return n.slot;return 0}function ve(t=new Date){if($t(t))return 0;let{minute:e,second:n}=Do(t),o=e*60+n,i=y.windowStartsMin||[];for(let r of i){let a=r*60;if(o<a)return(a-o)*1e3}return(3600-o)*1e3}function dn(t){return t<9e4?`${Math.ceil(t/1e3)}s`:`${Math.ceil(t/6e4)}m`}function Oo(){let t=document.querySelector(g(s.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=s.selRow,t.dataset[C.mark]="",n.insertAdjacentElement("afterend",t);let o=document.createElement("span");return o.id=s.anchor,o.dataset[C.mark]="",o.dataset[C.w]=e.style.width,o.dataset[C.mw]=e.style.minWidth,o.hidden=!0,e.insertAdjacentElement("beforebegin",o),c.setStyle(e,"width","100%"),c.setStyle(e,"minWidth","0"),t.appendChild(e),t}var jt="waitPillState",Qr=3600*1e3,Eo=f.pillWait,Zr=f.pillDone;function Jr(t,e){let n=document.createElement("span");n.className=`${f.pill} ${e}`;let o=(i,r)=>{let a=document.createElement("span");a.className=i,a.textContent=r,n.appendChild(a)};return o(f.pillTtl,t.title),t.timer!==void 0&&o(f.pillTmr,t.timer),n}function ta(t,e=Date.now()){if(t.kind==="waiting")return{variant:Eo};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:Eo}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:Zr}}return null}function ea(t,e,n=new Date){let o=ho(n);return t.seconds===void 0?{title:o}:{title:o,timer:Gt(t.seconds)}}var na=class{#t=null;#e={kind:"idle"};#o=null;#n=null;#i=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get(jt))[jt];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>Qr){chrome.storage.local.remove(jt);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#i=t,this.#r(),this.#c()}toggleClockMode(){c.alive&&(this.setClockMode(!this.#i),chrome.storage.local.set({waitPillClock:this.#i}))}render(t){return ta(this.#e,t)}#l(t){return ea(t,this.#i,new Date)}#r(){if(this.#t??=ia(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(f.hidden);return}this.#t.classList.remove(f.hidden),this.#t.replaceChildren(Jr(this.#l(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#o&&(c.clear(this.#o),this.#o=null),t.kind==="running"?(chrome.storage.local.set({[jt]:t}),this.#o=c.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove(jt),this.#r(),this.#c()}#u(){this.#r(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,x("audioAlert").then(t=>{t&&ha()})))}#c(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=c.setInterval(()=>this.#r(),1e3):!t&&this.#n&&(c.clear(this.#n),this.#n=null)}},Et=new na,Qt="pillPosition",Io=4;function Lo(t,e,n){return Math.max(e,Math.min(n,t))}function No(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,o=e.height>0?e.height:36;return{w:n,h:o}}function At(t,e,n){let{w:o,h:i}=No(t),r=Lo(e,0,Math.max(0,window.innerWidth-o)),a=Lo(n,0,Math.max(0,window.innerHeight-i));return t.style.setProperty("left",r+"px","important"),t.style.setProperty("top",a+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:r,top:a}}function oa(t){var e=!1,n=!1,o=0,i=0,r=0,a=0;function l(u){if(e){var m=u.touches?u.touches[0]:u,h=m.clientX-o,b=m.clientY-i;!n&&Math.abs(h)<Io&&Math.abs(b)<Io||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",At(t,r+h,a+b),u.cancelable&&u.preventDefault())}}function d(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",d),document.removeEventListener("touchmove",l),document.removeEventListener("touchend",d),n){let u=t.getBoundingClientRect();chrome.storage.local.set({[Qt]:{top:Math.round(u.top),left:Math.round(u.left)}})}n=!1}}t.addEventListener("mousedown",function(u){if(u.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let m=t.getBoundingClientRect();o=u.clientX,i=u.clientY,r=m.left,a=m.top,At(t,m.left,m.top),document.addEventListener("mousemove",l),document.addEventListener("mouseup",d),u.preventDefault(),u.stopPropagation()}),t.addEventListener("touchstart",function(u){e=!0,n=!1,delete t.dataset.skipClick;let m=t.getBoundingClientRect();o=u.touches[0].clientX,i=u.touches[0].clientY,r=m.left,a=m.top,At(t,m.left,m.top),document.addEventListener("touchmove",l,{passive:!1}),document.addEventListener("touchend",d)},{passive:!0})}function ia(){let t=document.querySelector(g(s.waitTime));return t||(t=document.createElement("div"),t.id=s.waitTime,t.className=f.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),oa(t),chrome.storage.local.get(Qt).then(e=>{let n=e[Qt];n&&typeof n.top=="number"&&typeof n.left=="number"&&At(t,n.left,n.top)}),ca(t),t)}function Ro(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function ra(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function aa(t){let{w:e,h:n}=No(t),o=12;return[{left:o,top:o},{left:Math.max(o,window.innerWidth-e-o),top:o},{left:o,top:Math.max(o,window.innerHeight-n-o)},{left:Math.max(o,window.innerWidth-e-o),top:Math.max(o,window.innerHeight-n-o)}]}async function sa(){let e=(await chrome.storage.local.get(Qt))[Qt];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function ca(t){let e=!1,n=async()=>{if(!c.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(f.hidden))return;let o=ra(),i=!!(o&&o.offsetParent!==null&&o.getBoundingClientRect().height>20),r=t.getBoundingClientRect();if(i&&Ro(r,o.getBoundingClientRect())){let a=o.getBoundingClientRect(),l=aa(t),d=l.find(u=>{let m={left:u.left,top:u.top,right:u.left+r.width,bottom:u.top+r.height};return!Ro(m,a)})||l[2];e=!0,t.setAttribute("data-dodging",""),At(t,d.left,d.top);return}if(e&&!i){e=!1,t.removeAttribute("data-dodging");let a=await sa();a&&At(t,a.left,a.top)}else i||t.removeAttribute("data-dodging")};c.setInterval(n,400),c.on(window,"resize",n)}async function pn(){if(!c.alive||!await x("defaultWaitTime")||!await c.waitFor("#post_select",{attempts:we}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});Et.setClockMode(t),await Et.restore()}async function Ho(){await x("defaultWaitTime")&&Et.waiting()}async function Me(t){await x("defaultWaitTime")&&Et.run(t)}function Bo(){Et.toggleClockMode()}function Wo(t){Et.setClockMode(t)}var zt=null,Vt=null,Te=null;function Fo(){return Te||(Te=new(window.AudioContext||window.webkitAudioContext),c.disposable(()=>Te?.close())),Te}async function hn(t=150){try{let e=Fo();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),o=e.createGain();n.connect(o),o.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let i=e.currentTime,r=t/1e3;o.gain.setValueAtTime(0,i),o.gain.linearRampToValueAtTime(.1,i+.01),o.gain.setValueAtTime(.1,i+Math.max(.01,r-.02)),o.gain.linearRampToValueAtTime(0,i+r),n.start(),n.stop(i+r)}catch(e){console.error("Audio beep failed:",e)}}function la(t,e=125,n=125){let o=0,i=()=>{o>=t||(hn(e),o++,c.setTimeout(i,e+n))};i()}var fn=4,Po=50,qo=50,ua=600;function Uo(){if(Vt)return;let t=()=>{la(fn,Po,qo);let e=fn*Po+(fn-1)*qo;Vt=c.setTimeout(t,e+ua)};t()}var da=250,fa=10,ma=300,pa=1e3;function ha(){if(zt)return;let t=[];for(let i=0;i<=ma;i+=fa)t.push(i);let e=Date.now(),n=0,o=()=>{let i=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&i>=t[n];){let r=n===t.length-1;hn(r?pa:da),n++}if(n<t.length){let r=t[n],a=e+r*1e3,l=Math.max(0,a-Date.now());zt=c.setTimeout(o,l)}else It()};o()}function It(){zt&&(c.clear(zt),zt=null),Vt&&(c.clear(Vt),Vt=null),mn()}var _e=null,Ce=null,Dt=null,ke=null,Xt=null;async function Ko(){mn();try{let t=Fo();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),o=t.createOscillator(),i=t.createGain(),r=t.createGain();n.type="square",o.type="sawtooth",n.frequency.value=880,o.frequency.value=1320,i.gain.value=.85,r.gain.value=.65,n.connect(i).connect(e),o.connect(r).connect(e);let a=t.createOscillator(),l=t.createGain();a.type="triangle",a.frequency.value=3.2,l.gain.value=280,a.connect(l),l.connect(n.frequency),l.connect(o.frequency);let d=t.currentTime;n.start(d),o.start(d),a.start(d),Dt={osc1:n,osc2:o,lfo:a,master:e};let u=()=>{Dt&&(hn(500),Ce=c.setTimeout(u,1800))};u(),_e=c.setTimeout(mn,12e4),Xt=document.title;let m=!1,h=()=>{Dt&&(document.title=m?Xt:"!!! SUBMIT CLICKED !!!",m=!m,ke=c.setTimeout(h,450))};h()}catch(t){console.error("Submit alarm failed:",t)}}function mn(){if(_e&&(c.clear(_e),_e=null),Ce&&(c.clear(Ce),Ce=null),ke&&(c.clear(ke),ke=null),Xt&&(document.title=Xt,Xt=null),Dt){try{let{osc1:t,osc2:e,lfo:n}=Dt;t.stop(),e.stop(),n.stop()}catch{}Dt=null}}function ga(){document.querySelector(g(s.recheck))?.remove();for(let t of document.querySelectorAll("button"))(t.textContent||"").trim()==="Recheck"&&t.remove()}async function gn(){c.alive&&ga()}async function bn(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await c.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let o=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(l=>l.innerText.trim()===o))continue;let r=document.createElement("li");r.className="usa-sidenav__item",r.dataset[C.mark]="";let a=document.createElement("a");a.href=n.link,a.className=f.sideLink,a.target="_self",a.textContent=n.text,r.appendChild(a),t.appendChild(r)}}function k(t,e,n){let o=document.createElement(t);return e&&(o.className=e),n?.appendChild(o),o}function $e(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,i,r]=n;return`${r}-${String(o).padStart(2,"0")}-${String(i).padStart(2,"0")}`}return null}function yn(t){let e=$e(t);if(!e)return String(t||"");let[n,o,i]=e.split("-").map(Number);if(!n||!o||!i)return e;try{return new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(new Date(n,o-1,i))}catch{return e}}function ya(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);if(n)return n[1].slice(0,5);let o=e.match(/^(\d{1,2}:\d{2})/);return o?o[1]:e}function Go(t){let e=document.querySelector(g(s.datesCont));if(e){let i=e.querySelector(g(s.datesPara)),r=e.querySelector("h2");if(r&&t&&(r.textContent=t),i)return{container:e,details:i}}let n=document.querySelector("#page_form");if(!n)return null;e?.remove();let o=ba(t||"");return n.appendChild(o.container),o}function Yo(t){if(t.response.HasError)return;let e=document.querySelector("#post_select"),n=e?.options[e.selectedIndex]?.text??"",o=(t.response.ScheduleDays||[]).map(u=>$e(u?.Date)).filter(Boolean).sort((u,m)=>u.localeCompare(m));document.querySelector(g(s.datesCont))?.remove();let i=Go(n);if(!i)return;let{details:r}=i;r.replaceChildren();let a=k("div",f.slotsSum,r);if(!o.length){a.textContent="No slots available";return}a.textContent=`${o.length} date${o.length===1?"":"s"} available`;let l={};for(let u of o){let m=u.slice(0,7);(l[m]||=[]).push(u)}for(let[u,m]of Object.entries(l)){let h=k("div",null,r),b=document.createElement("strong");b.textContent=u,h.append(b,`: ${m.map(T=>T.slice(8,10)).join(", ")}`)}let d=k("div",null,r);d.style.marginTop="0.5em";for(let u of o){let m=k("div",null,d);m.textContent=`\u2022 ${yn(u)} (${u})`}}function jo(t,e,n){let o=document.querySelector("#post_select"),i=n||o?.options[o.selectedIndex]?.text||"",r=$e(e)||$e(t?.[0]?.Date)||"",a=(t||[]).filter(S=>S&&S.Time).map(S=>({time:ya(S.Time),avail:S.EntriesAvailable!=null&&Number.isFinite(Number(S.EntriesAvailable))?Number(S.EntriesAvailable):null,raw:S})).sort((S,ot)=>String(S.time).localeCompare(String(ot.time))),l=Go(i);if(!l)return;let{details:d}=l;d.replaceChildren();let u=k("div",f.slotsSum,d);if(!a.length){u.textContent=r?`No time slots on ${yn(r)}`:"No time slots available";return}let m=a.filter(S=>S.avail==null||S.avail>0),h=m.reduce((S,ot)=>S+(ot.avail||0),0),b=r?yn(r):"selected date";if(u.textContent=h>0?`${m.length} time slot${m.length===1?"":"s"} on ${b} \xB7 ${h} available`:`${a.length} time slot${a.length===1?"":"s"} on ${b}`,r){let S=k("div",null,d);S.style.margin="0.35em 0 0.6em",S.textContent=`Date: ${b} (${r})`}let T=k("table",f.slotsTbl,d);T.id=s.slotsTbl;let W=k("thead",null,T),I=k("tr",null,W);for(let S of["Time","Availability"]){let ot=k("th",null,I);ot.textContent=S}let O=k("tbody",null,T);for(let S of a){let ot=k("tr",null,O);S.avail===0&&(ot.style.opacity="0.55");let Er=k("td",null,ot);Er.textContent=S.time;let Ir=k("td",null,ot);Ir.textContent=S.avail==null?"\u2014":String(S.avail)}}function ba(t){let e=k("div","row");e.id=s.datesCont;let n=k("div","col-sm-12 atlas_section mt-3",e),o=k("div","col-sm-12 atlas_section_header_row",k("div","row",n));k("h2",null,o).textContent=t;let i=k("div",null,k("div","col-sm-12",k("div","row",n)));return i.id=s.datesPara,{container:e,details:i}}var zo=null;function wa(){let t=document.querySelector(g(s.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return c.setStyle(n,"display","flex"),c.setStyle(n,"alignItems","center"),c.setStyle(n,"justifyContent","flex-end"),c.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=s.ofcDate,t.dataset[C.mark]="",e.insertAdjacentElement("beforebegin",t),t}function Sa(){if(!location.pathname.includes("/schedule"))return;let t=zo;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=wa();n&&(n.textContent=`OFC (Estimate): ${go(e.appointmentDateStr)}`)}function Vo(t){chrome.runtime?.id&&(zo=t.data.data,c.waitFor("#submitbtn").then(e=>{e&&Sa()}))}var Ae=new Map,Xo=45e3,De=new Map,Qo=8e3,Zo=0;function Ee(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function Ie(t){try{let[e,n,o]=t.split("-").map(Number);return new Date(e,n-1,o).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function xa(t,e){return`${t}:${e.slice(0,5).join(",")}`}function va(t){let e=Date.now(),n=Ae.get(t);if(n&&e-n<Xo)return!1;Ae.set(t,e);for(let[o,i]of Ae)e-i>Xo*4&&Ae.delete(o);return!0}function Ta(t){let e=Date.now(),n=De.get(t);if(n&&e-n<Qo)return!1;De.set(t,e);for(let[o,i]of De)e-i>Qo*6&&De.delete(o);return!0}async function Jo(){return await x("telegramViaServer")!==!1}async function ti(t,{kind:e="alert",dedupKey:n="",skipDedup:o=!1,notifyMuktesh:i=!0}={}){if(t&&await Jo())try{await fetch(so,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:o,notify_muktesh:i}),signal:AbortSignal.timeout(2e4)})}catch{}}function _a(t,{kind:e="screen",dedupKey:n="",waitMs:o=0,skipDedup:i=!1,notifyMuktesh:r=!0}={}){c.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:o,skipDedup:i,notifyMuktesh:r,captureScreenshot:!0})}async function Ca(t,e,n){let o=Ee(e),i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&r.push(`\u{1FAAA} <b>Visa:</b> ${n}`),r.push(`\u{1F550} <b>Checked:</b> ${i} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),r.push(`\u{1F4C6} <b>Dates (${o.length}):</b>`,"");for(let a of o.slice(0,30))r.push(`\u{1F7E2} <b>${Ie(a)}</b>`);return o.length>30&&r.push("",`\u2795 <i>+${o.length-30} more dates</i>`),r.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),r.join(`
`)}function ka(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",o=document.querySelector("#datepicker")?.value||"\u2014",r=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:o,time:r}}async function ei(t,{postId:e,postName:n,hasError:o}={}){if(o||!t?.length)return;let i=Ee(t);if(!i.length||!await x("telegramAlert"))return;let r=xa(e||n||"unknown",i);if(!va(r))return;let a=await U(),l=await Ca(n,t,a?.visa||"");await ti(l,{kind:"slots",dedupKey:r,notifyMuktesh:!0})}function Ma(t,e,n){let o=Ee(e),i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${i} IST
\u{1F4F2} Visa Slot 6`;if(o.length){let a=o.slice(0,5).map(l=>Ie(l)).join(", ");return`<b>DATES AVAILABLE</b>
\u{1F3DB}\uFE0F ${r}
\u{1F4C6} ${o.length} date(s)
${a}${o.length>5?"\u2026":""}
\u{1F550} ${i} IST
\u{1F4F2} Visa Slot 6`}return`<b>City changed \u2014 no dates</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${i} IST
\u{1F4F2} Visa Slot 6`}function $a(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?Ie(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function Aa(t,e,n){let o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=e?Ie(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${i}
\u23F0 ${n} slot(s)
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}async function Lt(t,{kind:e="screen",dedupKey:n,waitMs:o=0,skipDedup:i=!1}={}){if(await x("telegramScreenshots")===!1||!await Jo())return;let r=n||`${e}:${String(t).slice(0,80)}`;!i&&!Ta(r)||_a(t,{kind:e,dedupKey:r,waitMs:o,skipDedup:i,notifyMuktesh:!0})}async function ni(t,{postId:e,postName:n,hasError:o}={}){let i=Ma(n,t,o),r=Ee(t),a=r.length?"dates":"city";await Lt(i,{kind:a,dedupKey:`${a}:${e||n}:${r.length}:${o?1:0}`,waitMs:r.length?1400:900})}async function oi(t,e){await Lt($a(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function ii(t,e,n){await Lt(Aa(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function ri(){let t=Date.now();if(t-Zo<8e3)return;Zo=t;let e=await U(),{city:n,date:o,time:i}=ka(),r=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),a=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${o}`,`\u23F0 <b>Time:</b> ${i}`];e?.email&&a.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&a.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),a.push(`\u{1F550} <b>When:</b> ${r} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let l=a.join(`
`);await ti(l,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await Lt(l,{kind:"submit",skipDedup:!0,waitMs:200})}var Le=25;function Da(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Sn(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let o=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,o),n-1)}function si(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function ci(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function xn(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function ai(t){if(!t||t.disabled)return!1;try{let e=t.closest("tr"),o=[t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,t.closest("label"),t,e].filter(Boolean);for(let i of o)i.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),i.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),i.click();(t.type==="radio"||t.type==="checkbox")&&(t.checked=!0),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function li(){let t=new Set,e=[],n=o=>{if(!o||t.has(o)||xn(o)||o.disabled)return;let i=o.closest("tr");i&&ci(i)||(t.add(o),e.push(o))};for(let o of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let i of document.querySelectorAll(`${o}:not([disabled])`))n(i);return e}function Ea(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!si(n)||ci(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function Ia(t){for(let e of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(e.tagName!=="SELECT"||e.disabled||xn(e))continue;let n=[...e.options].filter(i=>!i.disabled&&i.value&&i.value!=="0"&&si({textContent:i.textContent}));if(!n.length)continue;let o=Sn(n.length,t);return e.value=n[o].value,e.dispatchEvent(new Event("change",{bubbles:!0})),!0}return!1}function La(t){if(Ia(t))return!0;let e=li();if(e.length){let o=Sn(e.length,t);if(ai(e[o]))return!0}let n=Ea();if(n.length){let o=Sn(n.length,t),i=n[o],r=i.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(r&&ai(r))return!0;let a=i.querySelector("label");if(a)return a.click(),!!i.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function N(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!xn(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function Ra({slotIndex:t=0,maxMs:e=12e3,pollMs:n=Le,onTick:o}={}){let i=Date.now()+e,r=Math.max(10,n||25);return new Promise(a=>{let l=()=>{if(!c.alive)return a(!1);if(o?.(),La(t)||N())return a(!0);if(Date.now()>=i)return a(!1);c.setTimeout(l,r)};l()})}function Zt({time:t,date:e,slotIndex:n,pollMs:o,maxMs:i}){let r=n??0,a=i||15e3,l=o||Le;return c.send({action:"forcePickTimeSlot",slotIndex:r,maxMs:a,pollMs:l}),c.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:r,pollMs:l,domWaitMs:0,maxMs:a}),Ra({slotIndex:r,maxMs:a,pollMs:l})}var wn=!1;function ui({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(wn)return;wn=!0;let o=!1,i=async()=>{if(!(!c.alive||o)){if(N()){n?.();return}try{if(t&&!await t())return}catch{return}li().length&&(o=!0,await Zt({slotIndex:e,time:"00:00",maxMs:800,pollMs:Le}),o=!1,N()&&n?.())}};c.setInterval(i,Le);let r=document.querySelector("#page_form")||document.body,a=new MutationObserver(()=>i());a.observe(r,{childList:!0,subtree:!0}),c.disposable(()=>{a.disconnect(),wn=!1})}function di(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let o=Da(n?.Time);if(!o)continue;let i=o.match(/(\d{1,2}):(\d{2})/);if(!i)continue;let[,r,a]=i;if(e.includes(`${r}:${a}`)||e.includes(`${parseInt(r,10)}:${a}`))return!0}return!1}var Re="submitErrors",fi=50,Pa=45e3,pi=0,vn=new Set,Jt=null;function qa(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",o=document.querySelector("#datepicker")?.value||"";return{city:e,date:o,url:location.href}}function te(){pi=Date.now()+Pa,vn.clear(),Fa()}function Pe(){return Date.now()<pi}function Oa(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function Na(t){let e=await v({[Re]:[]}),n=Array.isArray(e[Re])?e[Re]:[];n.push(t),n.length>fi&&n.splice(0,n.length-fi),await _({[Re]:n})}function mi(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function Ha(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${mi(t.source)}`,`\u{1F4AC} <b>Message:</b> ${mi(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let o=n.join(`
`);await Lt(o,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function ee(t,e,n={}){let o=String(e||"").trim();if(!o||!Pe()&&!n.force)return;let i=Oa(t,o);if(vn.has(i))return;vn.add(i);let r=qa(),a=await U(),l={at:Date.now(),source:String(t||"unknown"),message:o.slice(0,2e3),city:n.city||r.city,date:n.date||r.date,url:n.url||r.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:a?.email||""};await Na(l);try{await Ha(l)}catch{}}function Ba(t){if(!Pe())return;let e=t?.status,n=t?.retryAfter,o=t?.cgiBlock,i=`Request failed (HTTP ${e||"?"})`;n!=null&&(i+=` \u2014 retry after ${n}s`),o&&(i+=" \u2014 CGI access limitation"),ee("ajax_error",i,{status:e})}function hi(t){if(!Pe()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){Ba({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",i=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";ee("ajax_response",i,{route:t.tail||""})}var Wa=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function Fa(){Jt&&c.clear(Jt);let t=()=>{if(!c.alive||!Pe()){Jt=null;return}for(let e of Wa)for(let n of document.querySelectorAll(e)){let o=(n.textContent||"").replace(/\s+/g," ").trim();!o||o.length<4||ee("page_validation",o)}Jt=c.setTimeout(t,600)};Jt=c.setTimeout(t,500)}var ut="aiSubmitByAccount",se=8e3;var B=25,Ua=80,Be=0,We=1e4,_i=1e3;function ce(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}function Oe(){return y.cityRotateMinGapMs}function Ka(){return y.cityRotateMaxGapMs}function re(){return y.cityHoldMaxMs}function Q(){return y.cityLoadingMaxMs}function lt(){return y.cityCalendarNoDatesMs}var gi=5e3,Ci=2e4,Ga=15e3;function mt(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function Cn(){return/\/ofc-schedule\b/i.test(location.pathname)}function $(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var Ya=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function qe(t,e){let n=Ya[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(i=>{let r=e===i?" selected":"";return`<option value="${i.replace(/"/g,"&quot;")}"${r}>${i}</option>`}).join("")}function yi(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function Ne(t){try{let[e,n,o]=t.split("-").map(Number);return new Date(e,n-1,o).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function le(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function Fe(t){return!!(t&&t.citiesEnabled&&t.cities?.length)}async function tt(){let t=await U();return t?.id?String(t.id):null}async function at(t){return t&&((await v(ut))[ut]||{})[t]||null}async function ki(t,e){if(!t)return;let o=(await v(ut))[ut]||{};e==null?delete o[t]:o[t]=e,await _({[ut]:o})}var Y=!1;function ue(){return Y}function Mi(){Y=!0,He(),ie()}function qt(){Y=!1,L=!1,He()}async function $i(t){Mi();let e=await at(t);if(!e){vt();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await ki(t,e),vt()}function de(t,e,n){let o=String(t||"").slice(0,10);return!(!o||o.length<10||e&&o<e||n&&o>n)}async function et(){if(Y||$()||!mt())return null;let t=await tt();if(!t)return null;let e=await at(t);return!le(e)||!e.from||!e.to?null:{...e,accountId:t}}async function fe(){if(Y||$()||!mt())return null;let t=await tt();if(!t)return null;let e=await at(t);return Fe(e)?{...e,accountId:t}:null}function kn(t,e,n){let o=new Date;return o.setHours(0,0,0,0),(t||[]).filter(i=>i&&typeof i.Date=="string"&&i.Date.length>=10).filter(i=>de(i.Date,e,n)).filter(i=>{let[r,a,l]=i.Date.slice(0,10).split("-").map(Number);return new Date(r,a-1,l)>=o}).sort((i,r)=>String(i.Date).localeCompare(String(r.Date)))}var L=!1,rt=null,dt=null,J=!1,ft=0,K=!1,G=0,xt=0,ne=0,oe=0,Ot=!1,Z=null,it=0,D=!1,R=0,Rt=null,St=null,Pt=0,bi=!1,wi="",Si=!1,Tn=0;function ja(t){return(t||[]).map(e=>e.id).join("")}function Ai(){let t=document.querySelector(g(s.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function xi(t){let e=document.querySelector(g(s.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function He(){rt&&(c.clear(rt),rt=null),L=!1}function Tt(){Rt&&(c.clear(Rt),Rt=null)}function Di(){Tt(),R||(R=Date.now());let t=Math.max(500,re()-(Date.now()-R));Rt=c.setTimeout(()=>{Rt=null,!(!D||!K||!c.alive)&&(D=!1,R=0,j(Date.now()),w(`City Change \u2014 booking hold timed out (${re()/1e3}s); next city in 13\u201318s\u2026`),A())},t)}function za(){St&&(c.clear(St),St=null)}function Ue(t=Date.now()){let e=!1;if(J&&ft&&t-ft>=Ga&&(J=!1,ft=0,e=!0),D&&(R||(R=t),t-R>=re()?(Tt(),D=!1,R=0,e=!0):Rt||Di()),Ot){it||(it=t);let o=_n()?Q():lt();if(t-it>=o)z(),e=!0;else if(!Z){let i=Math.max(500,o-(t-it));Z=c.setTimeout(()=>{if(Z=null,!K||D)return;let r=_n(),a=r?Q():lt();if(Date.now()-(it||0)<a){Ue();return}z(),j(Date.now()),w(r?`City Change \u2014 still Loading after ${Q()/1e3}s; changing city\u2026`:`City Change \u2014 calendar up but no dates after ${lt()/1e3}s; changing city\u2026`),A()},i)}}return L&&!rt&&(L=!1,e=!0),e}function Ei(){if(St||!K)return;let t=()=>{if(St=null,!K||!c.alive||Y)return;let e=Date.now(),n=Ue(e),o=!!$t(new Date(e)),i=!!dt,a=!(!o&&i||(Ot||D||L)&&i)&&Pt>0&&e-Pt>=Ci;if(n||a||!i&&!J)a?(J=!1,ft=0,z(),Tt(),D=!1,R=0,L&&!rt&&(L=!1),G=e,w(o?"City Change \u2014 unstuck; hopping now\u2026":`City Change \u2014 unstuck; waiting for IST window ${X()}\u2026`)):n?(G=e,w(o?"City Change \u2014 lock cleared; hopping now\u2026":`City Change \u2014 lock cleared; next IST window ${X()}\u2026`)):w("City Change \u2014 timer lost; restarting\u2026"),A();else if(!o&&i){let d=ve(new Date(e));w(`City Change \u2014 waiting for slot window (IST ${X()}, next in ${dn(d)})`)}K&&(St=c.setTimeout(t,gi))};St=c.setTimeout(t,gi)}function ie(){An(),za(),Tt(),J=!1,ft=0,K=!1,D=!1,R=0,G=0,xt=0,Pt=0,z()}function z(){Ot=!1,it=0,Z&&(c.clear(Z),Z=null)}function Mn(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let o=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(o))continue;let i=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let r of i)if(r&&/\bLoading\.{0,3}\b/i.test((r.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let i=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(i))continue;let r=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(r))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function _n(){return Mn()}function Va(){Ot=!0,it=Date.now(),Z&&c.clear(Z),Z=c.setTimeout(()=>{Z=null,!(!K||D)&&(z(),j(Date.now()),w(`City Change \u2014 still Loading after ${Q()/1e3}s; changing city\u2026`),A())},Q())}function $n(t){let e=Math.max(0,Number(t)||0)*1e3;oe=Math.max(oe,Date.now()+e),G=Math.max(G,oe),z(),A()}function Ii(){z()}function Nt(){Y||(D=!0,R||(R=Date.now()),An(),z(),Di(),w("City Change \u2014 paused (Auto Submit booking)\u2026"))}function pt(){D&&(Tt(),D=!1,R=0,!(!K||Y)&&(j(Date.now()),w("City Change \u2014 resuming; next city in 13\u201318s\u2026"),A()))}async function Li(){let t=await et();if(!t)return;let e=Date.now();if(e-Tn<6e4)return;Tn=e;let o=document.querySelector("#post_select")?.value;if(!o){w("Auto Submit ON \u2014 pick a city first.");return}let r=(await st()).find(l=>String(l.ID)===String(o)),a=r?.Days;if(Array.isArray(a)&&a.length){let l=kn(a,t.from,t.to);if(l.length){Nt();let d=ce(l.length),u=l[d].Date;w(`Auto Submit: picking date #${d+1} (${u.slice(0,10)})\u2026`),c.send({action:"selectFirstDate",date:u,maxMs:se,pollMs:B});return}w(`Auto Submit ON \u2014 no dates in your range on ${r.Name||"this city"} yet.`);return}w("Auto Submit ON \u2014 loading slots for current city\u2026"),c.send({action:"selectPost",postId:String(o)})}function Xa(){Tn=0}function An(){dt&&(c.clear(dt),dt=null)}function Qa(t,e){return t+Math.random()*(e-t)}function Za(){return Qa(Oe(),Ka())}function j(t=Date.now()){G=t+Za()}function Ri(t=Date.now()){let e=ve(new Date(t));if(e>0)return e;if(oe>t)return oe-t;if(xt){let n=xt+Oe()-t;if(n>0)return n}return G>t?G-t:0}function A(){if(!K)return;if(An(),D||Ot){dt=c.setTimeout(()=>{vi()},500);return}let t=Ri();t<Oe()&&(xt?t=Math.max(0,xt+Oe()-Date.now()):(G>Date.now()||j(Date.now()),t=G-Date.now())),t>=Ci&&(Pt=Date.now()),dt=c.setTimeout(()=>{vi()},Math.max(0,t))}function Ja(t,e){if(!t.length)return null;if(t.length===1)return ne=0,t[0];let n=t.findIndex(i=>String(i.id)===String(e));n<0&&(n=Math.max(0,Math.min(ne,t.length-1)));let o=(n+1)%t.length;return ne=o,t[o]}function Dn(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function En(){let t=document.querySelector(g(s.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function In(){return{from:document.querySelector(g(s.aiFrom))?.value||null,to:document.querySelector(g(s.aiTo))?.value||null}}function Pi(t=[],{force:e=!1}={}){let n=document.querySelector(g(s.aiCities));if(!n)return;let o=Dn(),i=ja(o),r=document.querySelector(g(s.aiPanel)),a=r&&!r.classList.contains(f.hidden),l=Ai();if(!e&&i===wi&&n.querySelector('input[type="checkbox"]'))return;wi=i;let d=new Set(a&&l.length&&!e&&!t.length?l:(t.length?t:l).map(String));if(n.replaceChildren(),!o.length){n.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let u of o){let m=document.createElement("label"),h=document.createElement("input");h.type="checkbox",h.value=u.id,h.dataset.name=u.name,h.checked=d.has(u.id),m.append(h,document.createTextNode(u.name)),n.appendChild(m)}}function ts(t){let e=t?.cities||[];return e.length?e.map(n=>n.name||n.id).join(", "):"\u2014"}async function ae(t,e={}){let n=await at(t)||{},{from:o,to:i}=In(),r=En(),a={...n,from:o||n.from||null,to:i||n.to||null,cities:r.length?r:n.cities||[],loginId:document.querySelector(g(s.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(g(s.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(l=>{let d=[s.aiQ1,s.aiQ2,s.aiQ3][l],u=[s.aiA1,s.aiA2,s.aiA3][l];return{q:document.querySelector(g(d))?.value?.trim()||n.security?.[l]?.q||"",a:document.querySelector(g(u))?.value?.trim()||n.security?.[l]?.a||"",set:l+1}}),...e};return typeof a.submitEnabled=="boolean"&&(a.enabled=a.submitEnabled),await ki(t,a),a}async function es(t,e){if(!$t()||D||L)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let o=String(t);return String(n.value)===o?!1:(Va(),w(`Switching city \u2192 ${e||t}\u2026`),c.send({action:"selectPost",postId:o}),!0)}function qi(){bi||!document.querySelector("#post_select")||(bi=!0)}async function vi(){if(!(J||!K)){J=!0,ft=Date.now(),Pt=Date.now(),dt=null;try{if(Y||$()||!c.alive){ie();return}if(Ue()){G=Date.now(),w($t()?"City Change \u2014 auto-unstuck; hopping now\u2026":`City Change \u2014 auto-unstuck; waiting IST ${X()}\u2026`),A();return}if(D||L){let h=R?Date.now()-R:0;if(D&&h>=re()){Tt(),D=!1,R=0,j(Date.now()),w("City Change \u2014 hold expired; next city in 13\u201318s\u2026"),A();return}let b=Math.max(0,re()-h);w(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(b/1e3)}s`),A();return}let t=Date.now(),e=$t(new Date(t)),n=ve(new Date(t));if(!e){w(`City Change \u2014 waiting for slot window (IST ${X()}, next in ${dn(n)})`),A();return}if(Ot){let h=it?t-it:0;if(_n()){if(h>=Q()){z(),j(Date.now()),w(`City Change \u2014 still Loading after ${Q()/1e3}s; changing city\u2026`),A();return}let T=Math.max(0,Math.ceil((Q()-h)/1e3));w(`City Change \u2014 Date Loading\u2026 stay (${T}s then hop if still Loading)`),A();return}if(h>=lt()){z(),j(Date.now()),w(`City Change \u2014 calendar up but no dates after ${lt()/1e3}s; changing city\u2026`),A();return}let b=Math.max(0,Math.ceil((lt()-h)/1e3));w(`City Change \u2014 waiting calendar dates\u2026 (${b}s then hop)`),A();return}let o=Ri(t);if(o>0){let h=Math.ceil(o/1e3);w(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,h)}s`),A();return}let i=await fe();if(!i?.cities?.length){ie();return}let r=new Set(Dn().map(h=>h.id)),a=i.cities.filter(h=>r.has(String(h.id)));if(!a.length){w("Preferred cities not found in the dropdown \u2014 pick cities again."),ie();return}let l=document.querySelector("#post_select"),d=l?String(l.value):"",u=Ja(a,d);if(!u){j(t),A();return}if(await es(u.id,u.name)){xt=Date.now(),j(xt);let h=a.map(T=>T.name||T.id).join(" \u2192 "),b=`${ne+1}/${a.length}`;w(`City Change \u2014 ${b} ${u.name||u.id} (path: ${h}); Loading up to ${Q()/1e3}s, no-dates hop ${lt()/1e3}s`)}else j(t);A()}finally{J=!1,ft=0}}}async function Oi(){if(Y||$()||!mt())return;let t=await fe();if(!t?.cities?.length)return;let e=new Set(Dn().map(a=>a.id)),n=t.cities.filter(a=>e.has(String(a.id)));if(!n.length){w("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}Tt(),z(),D=!1,R=0,L=!1,J=!1,ft=0,K=!0,Pt=Date.now(),G=Date.now();let o=document.querySelector("#post_select"),i=o?String(o.value):"",r=n.findIndex(a=>String(a.id)===i);ne=r>=0?r:0,w(`City Change ON \u2014 IST ${X()}; hop 13\u201318s in checklist order; Loading max ${Q()/1e3}s; no-dates hop ${lt()/1e3}s`),Ei(),A()}async function Ni(){if(Y||$()||!Cn()||!c.alive||!(await fe())?.cities?.length||!document.querySelector("#post_select"))return;if(!K){await Oi();return}let e=Ue();Ei(),(e||!dt&&!J)&&(e&&(j(Date.now()),w("City Change \u2014 auto-unstuck; next city in 13\u201318s\u2026")),A())}function Hi(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function Ke(){let t=Hi();return!!(t&&!t.disabled)}function Ln(){let t=Hi();if(!t||t.disabled)return!1;try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}return c.send({action:"forceClickSubmit",prefix:p,pollMs:B,maxMs:We}),!0}function ns(){return N()?Ke():!1}function Bi(){w("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function Rn(t){if(Y||$()||L)return;let e=await at(t);if(!le(e))return;Nt(),L=!0,te();let n=Date.now(),o=!1,i=N()?Date.now():0,r=async d=>{if(!(o||!L||!c.alive)){if(o=!0,window.removeEventListener("message",a),rt&&(c.clear(rt),rt=null),$()){L=!1;return}if(L=!1,d){await $i(t),w("Submit clicked \u2014 all Tik Tik operations stopped.");return}pt(),w(K?"Auto Submit \u2014 Submit not clicked in time; City Change resuming\u2026":"Auto Submit \u2014 Submit not clicked in time; still watching\u2026")}},a=d=>{!c.alive||d.source!==window||d.data?.action===ct.sub&&r(!0)};window.addEventListener("message",a);let l=async()=>{if(o||!L||!c.alive)return;let d=Date.now(),u=d-n;if(N()&&!i&&(i=d,w("Time slot selected \u2014 waiting for Submit to enable\u2026")),i&&d-i>=Ua&&(ns()?(w("Submit enabled \u2014 clicking\u2026"),Ln()):w("Waiting for Submit button to enable\u2026")),u>=We)return r(!1);rt=c.setTimeout(l,B)};l()}async function Wi(){if(!N()||L||Y)return;let t=await et();t&&await Rn(t.accountId)}function w(t){let e=document.querySelector(g(s.aiStatus));e&&(e.textContent=t)}function E(t){w(t)}function os(t){let e=document.querySelector(g(s.aiSubmitBtn)),n=document.querySelector(g(s.aiCitiesBtn)),o=le(t),i=Fe(t);e&&(e.classList.toggle(f.aiOnBtn,o),e.textContent=o?"Auto Submit: ON":"Auto Submit: OFF"),n&&(n.classList.toggle(f.aiOnBtn,i),n.textContent=i?"City Change: ON":"City Change: OFF")}function is(t,e){let n=document.querySelector(g(s.aiStatus)),o=document.querySelector(g(s.aiBtn));if(!n||!o)return;os(t);let i=le(t),r=Fe(t);i||r?(o.classList.add(f.aiOn),o.textContent="Tik Tik ON"):(o.classList.remove(f.aiOn),o.textContent="Tik Tik");let l=[];i&&t.from&&t.to?l.push(`Auto Submit ON (${Ne(t.from)} \u2013 ${Ne(t.to)}, clicks Submit as soon as time slot is ready)`):l.push("Auto Submit OFF"),r?l.push(`City Change ON (${ts(t)}, ${X()})`):l.push("City Change OFF"),n.textContent=`Account ${e||"\u2014"}: ${l.join(" \xB7 ")}`}async function vt(){let t=await tt(),e=t?await at(t):null;is(e,t);let n=document.querySelector(g(s.aiFrom)),o=document.querySelector(g(s.aiTo));n&&e?.from&&(n.value=e.from),o&&e?.to&&(o.value=e.to);let i=(e?.cities||[]).map(I=>I.id),r=document.querySelector(g(s.aiPanel)),a=r&&!r.classList.contains(f.hidden),l=Ai();Pi(a&&l.length?l:i);let d=document.querySelector(g(s.aiLogin)),u=document.querySelector(g(s.aiPass));d&&e?.loginId&&(d.value=e.loginId),u&&e?.loginPass&&(u.value=e.loginPass);let m=e?.security||[],h=[s.aiQ1,s.aiQ2,s.aiQ3],b=[s.aiA1,s.aiA2,s.aiA3];h.forEach((I,O)=>{let S=document.querySelector(g(I));S&&(S.innerHTML=qe(O,m[O]?.q||""))}),b.forEach((I,O)=>{let S=document.querySelector(g(I));S&&m[O]?.a&&(S.value=m[O].a)});let T=document.querySelector(g(s.aiLoginBody)),W=T&&!T.classList.contains(f.hidden);Pn(!!W,cs(e))}function Ti(t){let e=document.querySelector(g(s.aiPanel));e&&(e.classList.toggle(f.hidden,!t),t&&tt().then(async n=>{let o=n?await at(n):null;Pi((o?.cities||[]).map(i=>i.id),{force:!0})}))}async function rs(){let t=await tt();if(!t){w("Open a logged-in schedule page so we can bind this to your account.");return}let e=await at(t)||{},n=!le(e),{from:o,to:i}=In();if(n){if(!o||!i){w("Select both From and To dates before enabling Auto Submit.");return}if(o>i){w("From date must be before To date.");return}if(!window.confirm(`Enable Auto Submit?

Range: ${Ne(o)} \u2013 ${Ne(i)}
If a matching slot appears on the current city, it will select date + time and Submit once.

City Change is separate \u2014 use its own ON/OFF button.`))return;qt(),He(),Xa(),await ae(t,{submitEnabled:!0,from:o,to:i,confirmedAt:Date.now()})}else He(),await ae(t,{submitEnabled:!1,from:o||e.from,to:i||e.to});await vt(),n&&await Li()}async function as(){let t=await tt();if(!t){w("Open a logged-in schedule page so we can bind this to your account.");return}let e=await at(t)||{},n=!Fe(e),o=En();if(n){if(!o.length){w("Select at least one preferred city before enabling City Change.");return}if(!window.confirm(`Enable City Change?

Cities (in order): ${o.map(r=>r.name).join(" \u2192 ")}
City checks run each hour during IST windows ${X()}, switching cities every 13\u201318 seconds in that same order.

Auto Submit is separate \u2014 use its own ON/OFF button.`))return;qt(),await ae(t,{citiesEnabled:!0,cities:o}),await vt(),qi(),await Oi();return}ie(),await ae(t,{citiesEnabled:!1,cities:o.length?o:e.cities||[]}),await vt()}async function ss(){let t=await tt();if(!t){w("Open a logged-in schedule page so we can bind this to your account.");return}let{from:e,to:n}=In(),o=En(),i=document.querySelector(g(s.aiLogin))?.value?.trim(),r=document.querySelector(g(s.aiPass))?.value,a=[0,1,2].map(l=>({q:document.querySelector(g([s.aiQ1,s.aiQ2,s.aiQ3][l]))?.value?.trim()||"",a:document.querySelector(g([s.aiA1,s.aiA2,s.aiA3][l]))?.value?.trim()||""}));if(!i||!r){w("Enter ID and password before saving.");return}if(a.some(l=>!l.q||!l.a)){w("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}await ae(t,{}),Pn(!0,!0),w("Saved ID, password, and 3 security questions (1 from each set).")}function cs(t){let e=t?.security||[];return!!(t?.loginId&&t?.loginPass&&e.length>=3&&e.every(n=>n?.q&&n?.a))}function Pn(t,e){let n=document.querySelector(g(s.aiLoginToggle));if(!n)return;let o=t?"\u25BE":"\u25B8";n.textContent=e?`Login details (saved) ${o}`:`Login details ${o}`}function ls(){let t=document.querySelector(g(s.aiLoginBody)),e=document.querySelector(g(s.aiLoginToggle));if(!t||!e)return;let n=t.classList.contains(f.hidden);t.classList.toggle(f.hidden,!n);let o=/saved/i.test(e.textContent||"");Pn(n,o)}function qn(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==s.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==s.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===s.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function Fi(){document.querySelector(g(s.aiPanel))?.remove(),document.querySelector(g(s.aiBtn))?.remove(),qn()}function us(){if($())return;if(!Cn()){Fi();return}if(document.querySelector(g(s.aiBtn)))return;let t=Oo();if(!t)return;let e=document.createElement("button");e.id=s.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[C.mark]="",c.on(e,"click",()=>{let o=document.querySelector(g(s.aiPanel)),i=o&&o.classList.contains(f.hidden);Ti(!!i)}),t.appendChild(e);let n=document.createElement("div");n.id=s.aiPanel,n.className=f.hidden,n.dataset[C.mark]="",n.innerHTML=`
    <div class="${f.cardTtl}">Tik Tik (this account only)</div>
    <p class="${f.aiHint}">
      Two separate switches: <b>Auto Submit</b> books a matching date once;
      <b>City Change</b> checks slots in burst windows each hour (IST ${X()}), switching preferred cities in checklist order every 13\u201318s.
    </p>
    <div class="${f.aiRow}">
      <label>From <input type="date" id="${s.aiFrom}" min="${yi()}" /></label>
      <label>To <input type="date" id="${s.aiTo}" min="${yi()}" /></label>
    </div>
    <div class="${f.aiHint}" style="margin-bottom:4px;font-weight:600;color:#334155">
      Preferred cities
      <button type="button" id="${s.aiCitiesAll}" class="${f.aiCityAct}">Select all</button>
      <button type="button" id="${s.aiCitiesNone}" class="${f.aiCityAct}">Clear</button>
    </div>
    <div id="${s.aiCities}" class="${f.aiCities}"></div>
    <div class="${f.aiRow}" style="margin-top:6px">
      <button type="button" id="${s.aiLoginToggle}">Login details \u25B8</button>
    </div>
    <div id="${s.aiLoginBody}" class="${f.hidden}">
      <div class="${f.aiHint}" style="margin:4px 0;font-weight:600;color:#334155">Login (auto-login on Home when logged out)</div>
      <div class="${f.aiRow}">
        <label>ID / email <input type="email" id="${s.aiLogin}" autocomplete="off" /></label>
        <label>Password <input type="password" id="${s.aiPass}" autocomplete="off" /></label>
      </div>
      <div class="${f.aiHint}" style="margin:0 0 6px">
        3 sets \xD7 5 questions. Pick <b>1 question from each set</b>, then type <b>your answer</b> for that question.
        Login later asks any 2 of these 3.
      </div>
      <div class="${f.aiRow}" style="flex-direction:column;align-items:stretch">
        <label>Set 1 \u2014 choose 1 question
          <select id="${s.aiQ1}">${qe(0)}</select>
        </label>
        <label>Your answer for set 1
          <input type="text" id="${s.aiA1}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
        </label>
      </div>
      <div class="${f.aiRow}" style="flex-direction:column;align-items:stretch">
        <label>Set 2 \u2014 choose 1 question
          <select id="${s.aiQ2}">${qe(1)}</select>
        </label>
        <label>Your answer for set 2
          <input type="text" id="${s.aiA2}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
        </label>
      </div>
      <div class="${f.aiRow}" style="flex-direction:column;align-items:stretch">
        <label>Set 3 \u2014 choose 1 question
          <select id="${s.aiQ3}">${qe(2)}</select>
        </label>
        <label>Your answer for set 3
          <input type="text" id="${s.aiA3}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
        </label>
      </div>
      <div class="${f.aiRow}">
        <button type="button" id="${s.aiSaveLogin}">Save login details</button>
      </div>
    </div>
    <div class="${f.aiRow}">
      <button type="button" id="${s.aiSubmitBtn}">Auto Submit: OFF</button>
      <button type="button" id="${s.aiCitiesBtn}">City Change: OFF</button>
      <button type="button" id="${s.aiClose}">Close</button>
    </div>
    <div id="${s.aiStatus}" class="${f.aiHint}"></div>
  `,t.insertAdjacentElement("afterend",n),c.on(n.querySelector(g(s.aiSubmitBtn)),"click",rs),c.on(n.querySelector(g(s.aiCitiesBtn)),"click",as),c.on(n.querySelector(g(s.aiSaveLogin)),"click",ss),c.on(n.querySelector(g(s.aiLoginToggle)),"click",ls),c.on(n.querySelector(g(s.aiClose)),"click",()=>Ti(!1)),c.on(n.querySelector(g(s.aiCitiesAll)),"click",()=>xi(!0)),c.on(n.querySelector(g(s.aiCitiesNone)),"click",()=>xi(!1)),c.on(n.querySelector(g(s.aiFrom)),"change",o=>{let i=n.querySelector(g(s.aiTo));i&&o.target.value&&(i.min=o.target.value)}),vt()}function ds(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",c.on(e,"click",()=>{te(),tt().then(n=>{n?$i(n):Mi()})}))};t(document.querySelector("#submitbtn")),c.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function On(){if(c.alive&&!$()){if(!Cn()){Fi();return}await c.waitFor("#post_select",{attempts:we})&&(us(),qi(),ds(),!Si&&(Si=!0,c.setTimeout(()=>vt(),800),c.setTimeout(async()=>{await et()&&await Li()},1500)))}}var Ui=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function Ki(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function fs(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=Ki(t.data.url),o=new URLSearchParams(t.data.request||"").get("parameters");if(!o)return null;let i;try{i=JSON.parse(o)}catch{return null}return{params:i,tail:e,response:t.data.response}}async function ms(t,e={}){t?.length&&(await ei(t,e),await x("audioAlert")&&Uo())}async function ps(t,e=!1){if(e||$())return null;let n=new Date;n.setHours(0,0,0,0);let o=(t||[]).map(a=>{if(!a)return null;let l=Ye(a.Date);return l?{...a,Date:l}:null}).filter(Boolean).filter(a=>{let[l,d,u]=a.Date.slice(0,10).split("-").map(Number);return!l||!d||!u?!1:new Date(l,d-1,u)>=n}).sort((a,l)=>String(a.Date).localeCompare(String(l.Date))),i=await et();if(i){let a=o.filter(d=>de(d.Date,i.from,i.to));if(!a.length)return null;let l=ce(a.length);return a[l]?.Date||null}if(!await x("autoSelectFirstDate")||!o.length)return null;let r=ce(o.length);return o[r]?.Date||null}function Ye(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,r,a]=n;return`${a}-${String(i).padStart(2,"0")}-${String(r).padStart(2,"0")}`}let o=e.match(/\/Date\((-?\d+)\)\//);if(o){let i=new Date(Number(o[1]));if(!Number.isNaN(i.getTime())){let r=i.getFullYear(),a=String(i.getMonth()+1).padStart(2,"0"),l=String(i.getDate()).padStart(2,"0");return`${r}-${a}-${l}`}}return null}function hs(t){if(!t)return!1;let[e,n,o]=t.slice(0,10).split("-").map(Number);if(!e||!n||!o)return!1;let i=n-1;for(let r of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let a=r.querySelector("a");if(!a)continue;let l=parseInt(r.getAttribute("data-month"),10),d=parseInt(r.getAttribute("data-year"),10),u=parseInt(a.textContent,10);if(d===e&&l===i&&u===o)return!0}return!1}var Ge=null;function gs(t,e){Ge&&c.clear(Ge);let n=Date.now()+(e?se:8e3),o=()=>{!c.alive||Date.now()>n||hs(t)||(c.send({action:"selectFirstDate",date:t,maxMs:e?se:8e3,pollMs:B}),Ge=c.setTimeout(o,B))};Ge=c.setTimeout(o,80)}function Gi(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function ys(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function Yi(t){return t?.length?t.map((e,n)=>({entry:e,index:n,avail:ys(e)})).sort((e,n)=>n.avail!==e.avail?n.avail-e.avail:e.index-n.index):[]}function bs(t){let e=Yi(t);return e.length?{entry:e[0].entry,slotIndex:e[0].index}:{entry:null,slotIndex:0}}function ji(){_t&&(c.clear(_t),_t=null)}async function ws(t){let e=Date.now()+Math.max(0,Number(t)||0);for(;c.alive&&Date.now()<e;){if(ue()||$())return!1;if(N()&&Ke())return!0;await new Promise(n=>c.setTimeout(n,B))}return!!(N()&&Ke())}var zi=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),Vi=null,Ss=null,_t=null;function xs(t,e){Vi=t,Ss=e?String(e).slice(0,10):null}function vs(t,e=0){_t&&c.clear(_t);let n=t?String(t).slice(0,10):null,o=0,i=async()=>{if(!c.alive||ue()||++o>240||N())return;let r=(Vi||[]).filter(a=>a&&a.Time);if(r.length){let{entry:a,slotIndex:l}=bs(r);if(E(`Watchdog: picking time slot #${l+1}\u2026`),await Zt({time:Gi(a.Time),date:a.Date?String(a.Date).slice(0,10):n,slotIndex:l,pollMs:B,maxMs:600,prefix:p}),N())return}else if(document.querySelector(zi)&&(E("Watchdog: picking visible time slot\u2026"),await Zt({time:"00:00",date:n,slotIndex:e,pollMs:B,maxMs:600,prefix:p}),N()))return;_t=c.setTimeout(i,B)};_t=c.setTimeout(i,300)}var Ts=["#datepicker.hasDatepicker","#datepicker .ui-datepicker","#ui-datepicker-div"].join(", ");async function _s(t,e=!1){if(e)return null;let n=await ps(t,e);if(!n)return null;let o=await et(),i=new Date;i.setHours(0,0,0,0);let r=(t||[]).map(d=>Ye(d?.Date)).filter(Boolean).filter(d=>{let[u,m,h]=d.slice(0,10).split("-").map(Number);return new Date(u,m-1,h)>=i}).sort((d,u)=>d.localeCompare(u)),a=o?r.filter(d=>de(d,o.from,o.to)):r,l=ce(a.length);return E(`Selecting date #${l+1}: ${n}\u2026`),await c.waitFor(Ts,{attempts:120,interval:B}),c.send({action:"selectFirstDate",date:n,maxMs:o?se:8e3,pollMs:B}),gs(n,o),vs(n,Be),n}async function Cs(t,e=!1){if(e||$()||ue())return;let n=await et();if(!n&&!await x("autoSelectFirstDate"))return;ji();let o=(t||[]).filter(l=>!(!l||!l.Time||l.EntriesAvailable!=null&&Number(l.EntriesAvailable)<=0));n&&(o=o.filter(l=>{let d=l.Date?String(l.Date).slice(0,10):null;return d?d>=n.from&&d<=n.to:!0}));let i=Yi(o);if(!i.length)return;let r=Date.now()+1e4;for(;Date.now()<r&&c.alive&&!(di(o)||document.querySelector(zi));)await new Promise(l=>c.setTimeout(l,B));let a=i.length===1?We:_i;E(i.length===1?`1 time slot \u2014 try highest avail, wait \u2264${a/1e3}s for Submit\u2026`:`${i.length} time slots \u2014 try highest\u21922nd\u21923rd\u2026 (${a/1e3}s each for Submit)`);for(let l=0;l<i.length;l++){if(!c.alive||ue()||$())return;let{entry:d,index:u,avail:m}=i[l],h=Gi(d.Time),b=d.Date?String(d.Date).slice(0,10):null,T=l===0?"highest":l===1?"2nd-highest":l===2?"3rd-highest":`${l+1}th-highest`;if(E(`Trying ${T} avail (${m}) @ ${h} \u2014 slot ${l+1}/${i.length}\u2026`),!await Zt({time:h,date:b,slotIndex:u,pollMs:B,maxMs:4e3,prefix:p})&&!N()){E(`Could not click ${h} \u2014 trying next\u2026`);continue}if(E(`Selected ${h} (${T}) \u2014 waiting \u2264${a/1e3}s for Submit to enable\u2026`),await ws(a)){E(`Submit enabled on ${h} \u2014 clicking\u2026`),n?await Rn(n.accountId):Ln();return}l<i.length-1&&E(`Submit still disabled on ${h} \u2014 trying next (${l+2}/${i.length})\u2026`)}E(`Tried all ${i.length} time slot(s); Submit never enabled.`),n&&pt()}async function Xi(t){if(!F()||$())return;let e;try{e=fs(t)}catch{return}if(e==null)return;if(hi(e),e.retryAfter!==void 0){let r=Number(e.retryAfter);To(e.cgiBlock,r),r?(Me(r),$n(r)):x("defaultWaitTime").then(a=>{Me(a),$n(a)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let r=e.response.Posts||[],a=new Map((await st()).map(l=>[l.ID,l]));for(let l of r)a.set(l.ID,{...a.get(l.ID),...l});await Mt([...a.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let r=e.response.Members||[];if(r.length){let a=await U()||{},l=a.name&&r.find(d=>d.FullName===a.name);a.visa=(l||r[0]).VisaClassName,await _({profile:a,members:r})}}if(Ui.includes(e.tail)){qt(),Yo(e);{let m=(e.response.ScheduleDays||[]).map(h=>Ye(h?.Date)).filter(Boolean).length;m&&E(`${m} date${m===1?"":"s"} available \u2014 see list below`)}Ii();let r=await et();await fe()||x("defaultWaitTime").then(m=>{Me(m)});let l=await st(),d=l.find(m=>m.ID===e.params.postId);d&&(d.Days=e.response.ScheduleDays,d.Updated=Date.now(),d.HasError=e.response.HasError,d.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,Mt(l)),await ms(e.response.ScheduleDays,{postId:e.params.postId,postName:d?.Name,hasError:e.response.HasError}),await ni(e.response.ScheduleDays,{postId:e.params.postId,postName:d?.Name,hasError:e.response.HasError}),r&&!e.response.HasError?kn(e.response.ScheduleDays,r.from,r.to).length?Nt():pt():r&&pt();let u=await _s(e.response.ScheduleDays,e.response.HasError);if(u)Nt(),await oi(d?.Name,u);else if(r&&!e.response.HasError){let m=(e.response.ScheduleDays||[]).map(b=>Ye(b?.Date)).filter(Boolean),h=m.filter(b=>de(b,r.from,r.to));m.length&&!h.length?(pt(),E(`Dates found but none in ${r.from} \u2192 ${r.to}. Next city in 13\u201318s\u2026`)):m.length||(pt(),E("No dates on this city \u2014 next city in 13\u201318s\u2026"))}await sn()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let r=e.params.Date.split("T")[0];xs(e.response.ScheduleEntries,r),ji();let a=await st(),l=a.filter(u=>u.Days&&u.Updated).sort((u,m)=>m.Updated-u.Updated).find(u=>u.Days.some(m=>m.Date===r));if(l){let u=l.Days.find(m=>m.Date===r);u&&(u.Times=e.response.ScheduleEntries,Mt(a))}let d=(e.response.ScheduleEntries||[]).filter(u=>u&&u.Time);if(jo(d,r,l?.Name),d.length){let u=d.filter(b=>b.EntriesAvailable==null||Number(b.EntriesAvailable)>0),m=u.reduce((b,T)=>{let W=Number(T.EntriesAvailable);return b+(Number.isFinite(W)?W:0)},0),h=m>0?` \xB7 ${m} available`:"";E(`${u.length||d.length} time slot${(u.length||d.length)===1?"":"s"} on ${r}${h}`)}await Cs(e.response.ScheduleEntries,e.response.HasError),d.length?(Nt(),await ii(l?.Name,e.params.Date,d.length)):(pt(),E("No time slots on this date \u2014 next city in 13\u201318s\u2026")),await sn()}}function Qi(t){if(!F()||$())return;let e=Ki(t.data.url);Ui.includes(e)&&Ho()}var Ct=null,Hn="",Nn={scanning:"Scanning for Cloudflare challenge\u2026",dom:"Trying page-level verify click\u2026",debugger:"Advanced click \u2014 targeting Turnstile iframe\u2026",retry:"Waiting before next attempt\u2026",success:"Verification passed \u2014 continuing\u2026",manual:"Stuck? Click the checkbox once, then we\u2019ll continue."};function Zi(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=f.cfFlash,n.dataset[C.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),c.setTimeout(()=>n.remove(),1200)}}function ks(){let t=document.querySelector(g(s.cfHud));return t||(t=document.createElement("div"),t.id=s.cfHud,t.dataset[C.mark]="",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.innerHTML=`
    <div class="${f.cfHud}">
      <div class="${f.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">\u{1F6E1}</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${Nn.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `,document.documentElement.appendChild(t),t)}async function P(t,e){if(!chrome.runtime?.id||!c.alive||!await x("autoCloudflareTick"))return;let n=ks(),o=n.querySelector("[data-cf-msg]"),i=n.querySelector("[data-cf-sub]"),r=n.querySelector("[data-cf-chip]"),a=n.querySelector(`.${f.cfHud}`);Hn=t,o&&(o.textContent=Nn[t]||Nn.scanning),i&&(i.textContent=e||Ms(t)),r&&(r.textContent=t==="success"?"Done":t==="manual"?"Help":"Active",r.dataset.state=t),a&&(a.dataset.state=t),Ct&&(c.clear(Ct),Ct=null),t==="success"&&(Ct=c.setTimeout(()=>Bn(),2800))}function Ms(t){return t==="debugger"?"Precision click via advanced browser bridge":t==="dom"?"Standard page interaction":t==="manual"?"One manual click is usually enough":t==="success"?"Resuming login and recovery":"Monitoring this tab for Turnstile"}function Bn(){let t=document.querySelector(g(s.cfHud));t&&t.remove(),Hn="",Ct&&(c.clear(Ct),Ct=null)}function Wn(){return Hn}var $s=/we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i,As=/\bUSG\s+[a-f0-9-]{8,}/i;var Un="vsPortalErrorReloadCount",er="vsPortalErrorReloadAt",Ds=2e3,Es=1e4,Ji=!1,Ht=null,Is=null;function Ls(){return(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim()}function Bt(){let t=Ls().slice(0,6e3);return t?!!(/a timeout occurred/i.test(t)&&(/error\s*524/i.test(t)||/origin web server timed out/i.test(t)||/cloudflare ray id/i.test(t))||/error\s*524/i.test(t)&&/cloudflare/i.test(t)&&t.length<8e3||$s.test(t)&&(As.test(t)||/error id\s*#/i.test(t))||/we'?re sorry,\s*but something went wrong/i.test(t)&&t.length<2500):!1}function nr(){try{return Math.max(0,Number(sessionStorage.getItem(Un)||0))}catch{return 0}}function Rs(){try{let t=nr()+1;return sessionStorage.setItem(Un,String(t)),sessionStorage.setItem(er,String(Date.now())),t}catch{return 1}}function Fn(){try{sessionStorage.removeItem(Un),sessionStorage.removeItem(er)}catch{}}function Ps(t){return Math.min(Es,Ds+Math.max(0,t-1)*1e3)}function qs(){Ht&&(c.clear(Ht),Ht=null)}function Os(){Rs();try{location.reload()}catch{}}function tr(){if(!c.alive||Ht)return;if(!Bt()){Fn();return}let t=nr()+1,e=Ps(t);Ht=c.setTimeout(()=>{if(Ht=null,!!c.alive){if(!Bt()){Fn();return}Os()}},e)}function or(){if(Ji)return;Ji=!0;let t=()=>{c.alive&&(Bt()?tr():(Fn(),qs()))};t(),Is=c.setInterval(t,1500);try{let e=new MutationObserver(()=>{c.alive&&Bt()&&tr()});e.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),c.disposable(()=>e.disconnect())}catch{}}var ze=null,pe=0,me=null,ht=0;async function Ns(){try{let e=(await v("humanClickProfile")).humanClickProfile,n=e?.liveTrained&&e.samples?.length||0;return n<5?15e3:n<20?1e4:n<50?6e3:3500}catch{return 12e3}}var Gn=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function V(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!q()&&!Wn()}function q(){if(Bt()||document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return Gn.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:Kn().length>0}function je(t){return new Promise(e=>setTimeout(e,t))}function Hs(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let o of n.querySelectorAll("*"))o.shadowRoot&&(t.push(o.shadowRoot),e.push(o.shadowRoot))}return t}function Kn(){let t=[],e=new Set,n=o=>{if(!o||e.has(o))return;let i=o.getBoundingClientRect();if(i.width<40||i.height<20||i.width>900||i.height>400)return;let r=(o.src||o.getAttribute?.("src")||"").toLowerCase(),a=(o.title||o.getAttribute?.("title")||"").toLowerCase(),l=(o.className?.toString?.()||"").toLowerCase(),d=(o.id||"").toLowerCase(),u=o.tagName==="IFRAME"&&(r.includes("challenges.cloudflare")||r.includes("turnstile")||a.includes("cloudflare")||a.includes("security challenge")),m=l.includes("cf-turnstile")||l.includes("turnstile")||d.includes("turnstile")||d.includes("challenge")||o.hasAttribute?.("data-sitekey")||o.hasAttribute?.("data-turnstile-widget");if(!u&&!m)if(o.tagName==="IFRAME"&&i.width>=120&&i.width<=420&&i.height>=45&&i.height<=120){if(!Gn.test(document.body?.innerText||""))return}else return;e.add(o),t.push({el:o,rect:i})};for(let o of Hs()){for(let i of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let r of o.querySelectorAll(i))n(r);for(let i of o.querySelectorAll("iframe"))n(i)}return t}function Bs(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function Ws(t){let e=[],n=new Set,o=(i,r)=>{if(!Number.isFinite(i)||!Number.isFinite(r)||i<1||r<1||i>window.innerWidth-1||r>window.innerHeight-1)return;let a=`${Math.round(i)},${Math.round(r)}`;n.has(a)||(n.add(a),e.push({x:Math.round(i),y:Math.round(r)}))};for(let{rect:i}of t){let r=i.top+i.height/2,a=i.left+Math.min(28,Math.max(18,i.width*.11));for(let l of[0,-4,4,-8,8,12,16,20,24,28,32])for(let d of[0,-3,3,-6,6])o(a+l,r+d);o(i.left+i.width*.5,r)}return e}function Fs(t){for(let{el:e,rect:n}of t)try{e.click();let o=n.left+Math.min(26,n.width*.12),i=n.top+n.height/2,r=document.elementFromPoint(o,i)||e;for(let a of["pointerdown","mousedown","mouseup","pointerup","click"])r.dispatchEvent(new MouseEvent(a,{bubbles:!0,cancelable:!0,clientX:o,clientY:i,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let o=n.getBoundingClientRect();if(o.width<4&&o.height<4)continue;let i=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!i.includes("human")&&!i.includes("verify")&&e==="input[type='checkbox']"){let r=n.closest("label, div, form");if(!Gn.test(r?.textContent||""))continue}return n.click(),!0}return!1}async function ir(t){t.length&&(Zi(t.slice(0,3)),c.send({action:"viewportClickPoints",points:t}),await x("cloudflareDebuggerClick")?(await P("debugger","Trained click on Verify you are human\u2026"),c.send({action:"cloudflareDebuggerClick",points:t,primaryOnly:!0})):await P("dom"))}async function Ve(){if(!await x("autoCloudflareTick"))return!1;if(V())return ht=0,await P("success"),!0;ht||(ht=Date.now());let t=await Ns();if(Date.now()-ht<t)return await P("scanning","Train window \u2014 click Verify you are human yourself (recording your mouse)\u2026"),!1;await P("scanning","Verify you are human page \u2014 preparing click\u2026");let e=Kn();Bs(e),await je(350),e=Kn();let n=Ws(e);return n.length&&(await ir(n),await je(1200),V()||!q())?(ht=0,await P("success"),!0):(await P("dom"),Fs(e),await je(600),V()||!q()?(ht=0,await P("success"),!0):n.length&&(await ir(n),await je(1e3),V()||!q())?(ht=0,await P("success"),!0):(pe++,pe>=8?await P("manual","Click the checkbox once \u2014 we will continue after."):await P("retry",`Retry ${pe}/8\u2026`),!1))}function Us(){me||(me=new MutationObserver(()=>{c.alive&&q()&&!V()&&Ve()}),me.observe(document.documentElement,{childList:!0,subtree:!0}),c.disposable(()=>{me?.disconnect(),me=null}))}function Yn(){ze&&(c.clear(ze),ze=null),pe=0,ht=0,Bn()}async function jn(){if(Yn(),!await x("autoCloudflareTick"))return;Us();let t=async()=>{if(c.alive&&await x("autoCloudflareTick")){if(q()&&!V()){await Ve();return}Wn()&&(pe=0,await P("success"))}};t(),ze=c.setInterval(t,1800)}var Wt="sessionRecovery",zn="homeKeepaliveAt",Vn="homeLoadingStuckAt",rr=2e3,Qe=!1,ar=null,Xn=null,Qn=null,Xe=null,he=0;function sr(){return y.homeKeepaliveMinMs}function Ks(){return y.homeKeepaliveMaxMs}function Gs(){return y.homeKeepaliveDebounceMs}function cr(){return y.loadingStuckMs}function Ys(){return y.loadingStuckDebounceMs}function lr(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function js(t,e){let n=lr(t);if(!n)return"";let o="",i=0;for(let r of e||[]){let a=lr(r.q);if(!a||!r.a)continue;if(n.includes(a)||a.includes(n))return r.a;let l=a.split(" ").filter(m=>m.length>3),d=0;for(let m of l)n.includes(m)&&d++;let u=l.length?d/l.length:0;u>i&&u>=.5&&(i=u,o=r.a)}return o}async function zs(){let t=await v([ut,"profile"]),e=t[ut]||{},n=t.profile?.id?String(t.profile.id):null,o=n?e[n]:null;return o||(o=Object.values(e).find(i=>i?.loginId&&i?.loginPass)||null),o||{}}function ur(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,o=Object.getOwnPropertyDescriptor(n,"value")?.set;o?o.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function gt(t){return new Promise(e=>setTimeout(e,t))}function nt(t,e){return t+Math.random()*(e-t)}async function Zn(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await gt(nt(250,600)),ur(t,"");let o="";for(let i=0;i<n.length;i++){let r=n[i];o+=r,ur(t,o),t.dispatchEvent(new KeyboardEvent("keydown",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:r,bubbles:!0}));let a=nt(90,220);/[\s@._]/.test(r)&&(a+=nt(120,320)),Math.random()<.08&&(a+=nt(200,450)),await gt(a)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await gt(nt(200,500))}var Ze=!1,Je=!1;function tn(t){return!t||t.disabled?!1:(t.click(),!0)}function Vs(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let o of t){let i=(o.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(i))continue;let r=o.querySelector("input[type='checkbox']")||document.getElementById(o.getAttribute("for")||"");r&&!r.checked&&(tn(r),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(o=>/^(continue|ok|accept|agree)$/i.test((o.textContent||o.value||"").trim()));return e&&n&&tn(n),e>0}function dr(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function Xs(t){if(Ze)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;Ze=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await Zn(e,t.loginId),await gt(nt(400,900))),n&&t.loginPass&&!n.value&&(await Zn(n,t.loginPass),await gt(nt(500,1100)));let o=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(i=>/sign in|log in|continue/i.test(i.textContent||i.value||""));return o&&(n?.value||t.loginPass)?(await gt(nt(600,1400)),tn(o),!0):!!(e||n)}finally{Ze=!1}}async function Qs(t){if(Je)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let i of n){let r=(i.textContent||"").trim();if(r.length<12||r.length>220||!/\?/.test(r)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(r))continue;let a=i.querySelector("input[type='text']")||document.getElementById(i.getAttribute("for")||"")||i.parentElement?.querySelector("input[type='text']");a&&a.offsetParent!==null&&e.push({text:r,input:a})}for(let i of["kba1_response","kba2_response","kba3_response"]){let r=document.getElementById(i);if(!r)continue;let l=(r.closest(".form-group, .entry, li, div")||r.parentElement)?.textContent||"";e.some(d=>d.input===r)||e.push({text:l,input:r})}let o=[];for(let{text:i,input:r}of e){if(r.value)continue;let a=js(i,t.security);a&&o.push({input:r,ans:a})}if(!o.length)return!1;Je=!0;try{for(let{input:r,ans:a}of o)await Zn(r,a),await gt(nt(350,800));await gt(nt(600,1400));let i=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(r=>/continue|submit|verify/i.test(r.textContent||r.value||""));return i&&tn(i),!0}finally{Je=!1}}function fr(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||q()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function yt(){return mt()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function Zs(t=""){return/\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(t||""))}function Jn(){if(yt()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||q()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}function Js(t){return!!(t?.loginId&&t?.loginPass)}function tc(){return fr()?!1:!!(dr()||document.querySelector("#kba1_response, #kba2_response, #kba3_response")||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))}async function ec(){let t=(await v(Wt))[Wt],e=!!t?.active,n=await zs();if(q()){await Ve();return}if(Vs(),fr()){e&&(await _({[Wt]:{...t,active:!1,doneAt:Date.now()}}),c.send({action:"recoveryReturnToOfc"}));return}tc()&&Js(n)&&await x("autofillLogin")&&(await Qs(n)||(dr()||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))&&await Xs(n))}function mr(){if(!Jn()||ar)return;let t=async()=>{c.alive&&await ec()};t(),ar=c.setInterval(t,1200)}function pr(){return sr()+Math.random()*(Ks()-sr())}async function hr(){try{let t=await v(zn),e=Number(t[zn])||0;return Date.now()-e<Gs()?!1:(await _({[zn]:Date.now()}),!0)}catch{return!0}}function gr(){if(yt()||!Jn()||document.querySelector("#post_select")||Xn)return;let t=()=>{c.alive&&(Xn=c.setTimeout(async()=>{if(Xn=null,!c.alive||yt()||Zs(location.href)||document.querySelector("#post_select")||!Jn())return;if(Ze||Je||Qe){t();return}if((await v(Wt))[Wt]?.active){t();return}if(!await hr()){t();return}try{location.reload()}catch{t()}},pr()))};t()}function yr(){if(!yt()||Qn)return;let t=()=>{c.alive&&(Qn=c.setTimeout(async()=>{if(Qn=null,!(!c.alive||!yt())){if(await hr())try{c.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}t()}},pr()))};t()}async function nc(){try{let t=await v(Vn),e=Number(t[Vn])||0;return Date.now()-e<Ys()?!1:(await _({[Vn]:Date.now()}),!0)}catch{return!0}}function br(){if(!yt()||Xe)return;let t=async()=>{if(Xe=null,!(!c.alive||!yt())){try{if(Mn()){if(he||(he=Date.now()),Date.now()-he>=cr()){if(await nc()){try{E(`Date Loading stuck \u2265${cr()/1e3}s \u2014 reloading Application Home\u2026`)}catch{}try{c.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}}he=Date.now()}}else he=0}catch{}c.alive&&yt()&&(Xe=c.setTimeout(t,rr))}};Xe=c.setTimeout(t,rr)}async function wr(t){if(!/PSE0501|unable to load appointment available days/i.test(String(t||""))||Qe)return;Qe=!0,c.setTimeout(()=>{Qe=!1},8e3);let e=await tt();await _({[Wt]:{active:!0,ofcUrl:location.href,accountId:e,startedAt:Date.now()}}),c.send({action:"recoveryStart",ofcUrl:location.href})}var eo="humanClickProfile",no=150,Cr=120,oc=400,Sr=!1,bt=[],en=0,kt=0,Ut=0,M=null,xr=0,ge=!1,Ft=null,nn=0;function ic(){let t=[];for(let e of document.querySelectorAll('iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]')){let n=e.getBoundingClientRect();n.width<40||n.height<20||n.width>900||n.height>400||t.push(n)}if(!t.length&&q())for(let e of document.querySelectorAll("iframe")){let n=e.getBoundingClientRect();n.width>=120&&n.width<=420&&n.height>=45&&n.height<=120&&t.push(n)}return t}function ye(){let t=ic();if(!t.length)return null;let e=t[0];return{x:e.left+Math.min(28,Math.max(18,e.width*.11)),y:e.top+e.height/2,w:e.width,h:e.height,left:e.left,top:e.top}}function oo(t,e,n){return n?t>=n.left-40&&t<=n.left+n.w+40&&e>=n.top-30&&e<=n.top+n.h+30:!1}function kr(t){let e=performance.now();en||(en=e);let n=M,o=n?(t.clientX-n.x)/Math.max(24,n.w*.12):0,i=n?(t.clientY-n.y)/Math.max(20,n.h*.5):0;bt.push({nx:Math.round(o*1e3)/1e3,ny:Math.round(i*1e3)/1e3,x:Math.round(t.clientX),y:Math.round(t.clientY),t:Math.round(e-en)}),bt.length>Cr&&bt.shift()}async function Mr(){return(await v(eo))[eo]||{version:2,maxSamples:no,samples:[],avgHoverMs:420,avgPressMs:70,avgApproachMs:800,liveTrained:!1}}function to(t,e,n){if(!t.length)return n;let o=t.reduce((i,r)=>i+(Number(r[e])||0),0);return Math.round(o/t.length)}async function rc(t){let e=Date.now();if(e-xr<oc)return null;xr=e;let n=await Mr(),o=Array.isArray(n.samples)?n.samples.slice():[];for(o.push(t);o.length>no;)o.shift();let i={version:2,maxSamples:no,samples:o,avgHoverMs:to(o,"hoverMs",420),avgPressMs:to(o,"pressMs",70),avgApproachMs:to(o,"approachMs",800),updatedAt:e,liveTrained:!0,source:"visa-page-live"};return await _({[eo]:i}),nn=o.length,ac(t,i).catch(()=>{}),i}async function ac(t,e){try{if(!await x("serverSync"))return;let n=await U()||{},i={client_id:`hc-${t.at||Date.now()}-${Math.random().toString(36).slice(2,8)}`,profile:{id:n.id||"",email:n.email||"",name:n.name||"",visa:n.visa||""},sample:t,profile_meta:{sampleCount:e?.samples?.length||0,avgHoverMs:e?.avgHoverMs,avgPressMs:e?.avgPressMs,avgApproachMs:e?.avgApproachMs,liveTrained:!0,source:"visa-page-live",extensionHost:location.host}};c.send({action:"uploadHumanClickSample",payload:i})}catch{}}function on(){bt=[],en=0,kt=0,Ut=0,Ft=null}function io(){ge||(ge=!0,on(),M=ye())}function $r(){ge=!1,M=null,on()}async function vr(t){if(c.alive){if(!q()||V()){ge&&$r();return}io(),M||(M=ye()),!Ut&&M&&oo(t.clientX,t.clientY,M)&&(Ut=performance.now()),kr(t)}}async function Tr(t){if(!(!c.alive||t.button!==0)&&!(!q()||V())){io(),M=ye(),kt=performance.now(),Ut||(Ut=kt),Ft={x:t.clientX,y:t.clientY},kr(t);try{P("scanning",`Recording click\u2026 (saved ${nn} so far)`)}catch{}}}async function _r(t){if(!c.alive||t.button!==0||!kt)return;if(!q()&&!V()){on();return}let e=performance.now(),n=Math.max(25,Math.min(500,e-kt)),o=Math.max(30,Math.min(3e3,kt-(Ut||kt))),i=bt.length?bt[bt.length-1].t:o,r=Math.max(o,Math.min(12e3,i||o)),a=bt.slice(-Cr),l=M&&oo(t.clientX,t.clientY,M)||M&&Ft&&oo(Ft.x,Ft.y,M)||!M&&a.length>=2,d=Ft;if(on(),!l&&a.length<2||a.length<1&&!l)return;let u={hoverMs:Math.round(o),pressMs:Math.round(n),approachMs:Math.round(r),path:a,down:d?{x:Math.round(d.x),y:Math.round(d.y)}:null,up:{x:Math.round(t.clientX),y:Math.round(t.clientY)},target:M?{x:Math.round(M.x),y:Math.round(M.y),w:Math.round(M.w),h:Math.round(M.h),left:Math.round(M.left),top:Math.round(M.top)}:null,viewport:{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio||1,scrollX:Math.round(window.scrollX||0),scrollY:Math.round(window.scrollY||0)},pointerType:t.pointerType||"mouse",url:location.pathname+location.search,at:Date.now()};if(!u.target){let b=ye();b&&(u.target={x:Math.round(b.x),y:Math.round(b.y),w:Math.round(b.w),h:Math.round(b.h),left:Math.round(b.left),top:Math.round(b.top)})}let m=await rc(u);if(!m)return;let h=m.samples?.length||0;try{P("success",`Saved verify-human click #${h} \u2014 keep clicking naturally when it appears`)}catch{}}async function sc(){try{let t=await Mr(),e=t.liveTrained&&t.samples?.length||0;return nn=e,e}catch{return nn}}function Ar(){if(Sr)return;Sr=!0,c.on(window,"pointermove",vr,{passive:!0,capture:!0}),c.on(window,"pointerdown",Tr,{passive:!0,capture:!0}),c.on(window,"pointerup",_r,{passive:!0,capture:!0}),c.on(window,"mousemove",vr,{passive:!0,capture:!0}),c.on(window,"mousedown",Tr,{passive:!0,capture:!0}),c.on(window,"mouseup",_r,{passive:!0,capture:!0});let t=async()=>{if(!c.alive)return;if(!q()||V()){ge&&$r();return}io(),M||(M=ye());let e=await sc();try{P("scanning",e?`Train mode \u2014 click Verify you are human naturally (saved ${e})`:"Train mode \u2014 move mouse naturally, then click Verify you are human (recording\u2026)")}catch{}};t(),c.setInterval(t,2500)}var cc=`
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

#${s.waitTime} .${f.pill} {
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  white-space: nowrap;
}

#${s.waitTime} .${f.pillTtl} {
  flex: 1;
  min-width: 0;
  padding: 0.35em 0.5em;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}

#${s.waitTime} .${f.pillTmr} {
  display: flex;
  align-items: center;
  padding: 0.35em 0.55em;
  border-radius: 5px 0 0 5px;
  background: rgba(255, 255, 255, 0.25);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-variant-numeric: tabular-nums;
}

#${s.waitTime} .${f.pillWait} { background-color: rgba(255, 0, 0, 0.35); color: #5c0000; }
#${s.waitTime} .${f.pillDone} { background-color: #1a4480; color: white; }

#atlas-sidebar .${f.sideLink} { background-color: #1a4480; color: white; }
#${s.datesPara} { margin: 0.5em 0; line-height: 1.45; }

#${s.datesCont} .${f.datesLnk} { color: white; }
#${s.datesCont} .${f.slotsSum} {
  font-weight: 700;
  font-size: 1.05em;
  margin-bottom: 0.4em;
  color: #0b3d2e;
}
#${s.datesCont} .${f.slotsTbl},
#${s.slotsTbl} {
  width: auto;
  min-width: 220px;
  border-collapse: collapse;
  margin: 0.25em 0 0.5em;
  font-size: 0.95em;
}
#${s.datesCont} .${f.slotsTbl} th,
#${s.datesCont} .${f.slotsTbl} td,
#${s.slotsTbl} th,
#${s.slotsTbl} td {
  border: 1px solid #cbd5e0;
  padding: 0.3em 0.75em;
  text-align: left;
}
#${s.datesCont} .${f.slotsTbl} th,
#${s.slotsTbl} th {
  background: #edf2f7;
  font-weight: 600;
}
#${s.ofcDate} { font-weight: bold; }

.${f.card} {
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

#${s.histCont} .${f.cardTtl} {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
}
#${s.histCont} .${f.histScrl} {
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

#${s.histTbl} td.${f.dltDn} { color: #10b981; font-weight: 500; }
#${s.histTbl} td.${f.dltUp} { color: #ef4444; font-weight: 500; }

#${s.cdCard} .${f.cardTtl} {
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

#${s.cdTime}.${f.cdDiv}-over { font-size: 20px; }
.${f.cdDiv} {
  border-top: 1px solid #edf2f7;
  margin-top: 15px;
  padding-top: 12px;
}

.${f.footer} { font-size: 11px; }
#${s.histCont} .${f.footer} { margin-top: 8px; }
#${s.cdCard} .${f.footer} { margin: 0; }

#${s.histCont} .${f.footer} a,
#${s.cdCard} .${f.footer} a {
  color: #1a4480;
  text-decoration: none;
  font-weight: 500;
}

.${f.hidden} { display: none; }

#${s.aiBtn} {
  width: 100%;
  padding: 0.35em 0.8em;
  background-color: #0f766e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  white-space: nowrap;
}
#${s.aiBtn}.${f.aiOn} {
  background-color: #15803d;
  box-shadow: 0 0 0 2px #86efac;
}
#${s.aiPanel} {
  max-width: 520px;
  margin: 0.5em auto 0;
  padding: 12px 14px;
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  font-size: 13px;
  color: #1e293b;
  text-align: left;
}
#${s.aiPanel} .${f.cardTtl} {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 700;
  color: #0f766e;
}
#${s.aiPanel} .${f.aiHint} {
  margin: 0 0 10px;
  font-size: 12px;
  line-height: 1.45;
  color: #475569;
}
#${s.aiPanel} .${f.aiRow} {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 10px;
}
#${s.aiPanel} label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #334155;
}
#${s.aiPanel} input[type="date"] {
  padding: 4px 6px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 13px;
}
#${s.aiPanel} button {
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
#${s.aiConfirm} { background: #15803d; color: #fff; }
#${s.aiCancel} { background: #64748b; color: #fff; }
#${s.aiClose} { background: #e2e8f0; color: #334155; }
#${s.aiSubmitBtn}, #${s.aiCitiesBtn} {
  min-width: 140px;
  font-weight: 600;
}
#${s.aiSubmitBtn} { background: #64748b; color: #fff; }
#${s.aiCitiesBtn} { background: #64748b; color: #fff; }
#${s.aiSubmitBtn}.${f.aiOnBtn} { background: #15803d; }
#${s.aiCitiesBtn}.${f.aiOnBtn} { background: #0f766e; }
#${s.aiStatus} { margin: 0; }
#${s.aiPanel} .${f.aiCities} {
  max-height: 220px;
  overflow: auto;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 6px 8px;
  margin-bottom: 10px;
  background: #f8fafc;
}
#${s.aiPanel} .${f.aiCityAct} {
  margin-left: 8px;
  padding: 0;
  border: none;
  background: none;
  color: #2563eb;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}
#${s.aiPanel} .${f.aiCityAct}:hover {
  color: #1d4ed8;
}
#${s.aiPanel} .${f.aiCities} label {
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  margin: 4px 0;
}
#${s.aiPanel} .${f.aiCities} input[type="checkbox"] {
  margin: 0;
}
#${s.aiPanel} input[type="text"],
#${s.aiPanel} input[type="password"],
#${s.aiPanel} input[type="email"],
#${s.aiPanel} select {
  padding: 4px 6px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 13px;
  width: 100%;
  box-sizing: border-box;
}
#${s.aiPanel} .${f.aiRow} label { flex: 1; min-width: 140px; }
#${s.aiSaveLogin} { background: #334155; color: #fff; }

#${s.cfHud} {
  position: fixed;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2147483646;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
#${s.cfHud} .${f.cfHud} {
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
#${s.cfHud} .${f.cfHud}[data-state="success"] {
  border-color: rgba(34, 197, 94, 0.45);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 24px rgba(34, 197, 94, 0.15);
}
#${s.cfHud} .${f.cfHud}[data-state="manual"] {
  border-color: rgba(251, 191, 36, 0.45);
}
#${s.cfHud} .${f.cfHud}[data-state="debugger"] {
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.32), 0 0 28px rgba(59, 130, 246, 0.18);
}
#${s.cfHud} .${f.cfPulse} {
  width: 10px;
  height: 10px;
  margin-top: 5px;
  border-radius: 50%;
  background: #60a5fa;
  box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.55);
  animation: ${p}cfpulse 1.6s ease-out infinite;
  flex-shrink: 0;
}
#${s.cfHud} .${f.cfHud}[data-state="success"] .${f.cfPulse} {
  background: #4ade80;
  animation: none;
  box-shadow: 0 0 12px rgba(74, 222, 128, 0.65);
}
#${s.cfHud} .${f.cfHud}[data-state="manual"] .${f.cfPulse} {
  background: #fbbf24;
}
@keyframes ${p}cfpulse {
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
.${f.cfFlash} {
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
`;function Dr(){if(document.querySelector(g(s.styles)))return;let t=document.createElement("style");t.id=s.styles,t.dataset[C.mark]="",t.textContent=cc,(document.head||document.documentElement).appendChild(t)}wo();qn();ao(()=>{Bi(),c.destroy()});Ao();or();if(!$()){c.disposable(()=>{let o=document.querySelector(g(s.anchor)),i=document.querySelector("#post_select");o&&i&&o.replaceWith(i);for(let r of document.querySelectorAll("[data-"+C.mark+"]"))r.remove()}),Dr(),c.send({action:"registerBlockGuard",prefix:p}),c.send({action:"registerRedirect",prefix:p}),c.send({action:"registerAlertGuard",prefix:p}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&c.send({action:"registerOfcReader",prefix:p}),c.on(window,"message",o=>{if(c.alive&&o.source===window)switch(o.data?.action){case ct.req:return Qi(o);case ct.res:return Xi(o);case ct.ofc:return Vo(o);case ct.err:return ee("native_alert",o.data?.text),wr(o.data?.text);case ct.sub:Ko(),te(),ri();return}}),chrome.storage.onChanged.addListener((o,i)=>{i==="local"&&(o.profile&&bn(),o.waitPillClock&&Wo(o.waitPillClock.newValue),o.autoCloudflareTick&&(o.autoCloudflareTick.newValue?jn():Yn()))}),c.on(document,"click",o=>{It();let i=o.target.closest(g(s.waitTime));if(i){if(i.dataset.skipClick){delete i.dataset.skipClick;return}Bo()}}),c.on(document,"keydown",It),c.on(window,"focus",It),c.on(document,"visibilitychange",()=>{document.hidden||It()}),mr(),gr(),yr(),br(),Ar(),jn();async function t(){!c.alive||$()||!mt()||document.querySelector("#post_select")&&(qt(),await Promise.all([pn(),gn(),On()]),ui({slotIndex:Be,shouldPick:async()=>await et()?!0:!!await x("autoSelectFirstDate"),onSlotPicked:()=>Wi()}))}async function e(){!c.alive||$()||!mt()||await Ni()}async function n(){vo(),_o(),await Promise.all([bn(),ko(),Co(),pn(),gn(),On()]),cn()}document.readyState==="complete"?n():c.on(window,"load",n),c.setInterval(t,2500),c.setInterval(e,3e4),e()}})();
