(()=>{function q(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function S(t){return q()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,r]of Object.entries(t))e[n]=r;return e}):Promise.resolve(typeof t=="string"?{}:t)}function T(t){return q()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function Gn(t){return q()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function zn(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",r=>{String(r.reason?.message||r.reason||"").includes("Extension context invalidated")&&(r.preventDefault(),e())});let n=setInterval(()=>{q()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var ze="https://the.gopg.online",Xe=`${ze}/contribute`,Xn=`${ze}/contribute/telegram`,Ns=`${ze}/contribute/human-click`;var Qn=20,Zn=4320*60*1e3,he=100,Jn=4,Bt=100,tr=240,er=50,nr=1440*60*1e3,mi={recheckButton:!0,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function w(t){return S({[t]:mi[t]}).then(e=>e[t])}function tt(){return S({posts:[]}).then(t=>t.posts)}function Tt(t){return T({posts:t})}function N(){return S("profile").then(t=>t.profile)}var mt=t=>String(t).padStart(2,"0");function Ht(t){let e=mt(t%60),n=Math.floor(t/60)%60,r=Math.floor(t/3600);return r?`${mt(r)}:${mt(n)}:${e}`:`${mt(n)}:${e}`}function rr(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${mt(n.getUTCHours())}:${mt(n.getUTCMinutes())}:${mt(n.getUTCSeconds())}`}}function Qe(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),r=t%60,o=[];return e>0&&o.push(`${e}d`),(n>0||e>0)&&o.push(`${n}h`),o.push(`${r}m`),o.join(" ")}function or(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),r=o=>n.find(i=>i.type===o)?.value??"";return`${r("month")} ${r("day")} ${r("year")} ${r("hour")}:${r("minute")} ${r("dayPeriod")}`}function ir(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),r=parseInt(e[2],10),o=parseInt(e[3],10),i=e[4];i&&(i.toUpperCase()==="PM"&&n<12&&(n+=12),i.toUpperCase()==="AM"&&n===12&&(n=0));let a=new Date;return a.setHours(n,r,o,0),a.getTime()>Date.now()+6e4&&a.setDate(a.getDate()-1),a}var ar=Symbol(),pi=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&q()}on(t,e,n,r){t.addEventListener(e,n,{...r,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!q())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=Jn,interval:n=he}={}){return new Promise(r=>{let o=i=>{if(!this.alive)return;let a=document.querySelector(t);if(a)return r(a);if(i>=e)return r(null);this.setTimeout(()=>o(i+1),n)};o(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},s=new pi;function sr(){let t=globalThis[ar];Object.defineProperty(globalThis,ar,{value:s,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var ge=new Uint32Array(2);crypto.getRandomValues(ge);var cr="abcdefghjkmnpqrstuvwxyz",hi=(ge[0].toString(36)+ge[1].toString(36)).replace(/[^a-z0-9]/g,""),m=(cr[ge[0]%cr.length]+hi).slice(0,8).padEnd(8,"x");function h(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var c={selRow:m+"01",anchor:m+"02",waitTime:m+"03",recheck:m+"04",histCont:m+"05",histTbl:m+"06",cdCard:m+"07",cdTime:m+"08",ofcDate:m+"09",styles:m+"10",datesCont:m+"11",datesPara:m+"12",aiBtn:m+"13",aiPanel:m+"14",aiFrom:m+"15",aiTo:m+"16",aiStatus:m+"17",aiConfirm:m+"18",aiCancel:m+"19",aiClose:m+"20",aiCities:m+"21",aiSubmitBtn:m+"22",aiCitiesBtn:m+"23",aiLogin:m+"24",aiPass:m+"25",aiQ1:m+"26",aiA1:m+"27",aiQ2:m+"28",aiA2:m+"29",aiQ3:m+"30",aiA3:m+"31",aiSaveLogin:m+"32",cfHud:m+"33",aiCitiesAll:m+"34",aiCitiesNone:m+"35"},f={pill:m+"a",pillTtl:m+"b",pillTmr:m+"c",pillWait:m+"d",pillDone:m+"e",footer:m+"f",card:m+"g",cardTtl:m+"h",histScrl:m+"i",dltDn:m+"j",dltUp:m+"k",cdDiv:m+"l",hidden:m+"m",sideLink:m+"n",datesLnk:m+"o",aiOn:m+"p",aiRow:m+"q",aiHint:m+"r",aiCities:m+"s",aiOnBtn:m+"t",aiCityAct:m+"x",cfHud:m+"u",cfPulse:m+"v",cfFlash:m+"w"},x={mark:m,w:m+"w",mw:m+"mw"},et={req:m+"q",res:m+"r",ofc:m+"o",err:m+"e",sub:m+"s"};function _t(t){return t.map(e=>String.fromCharCode(e)).join("")}function gi(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function lr(){let t=document.createElement("div");return t.className=f.footer,t.textContent=_t([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function yi(t){let e=document.getElementById(c.histCont);e&&e.remove(),e=document.createElement("div"),e.id=c.histCont,e.className=f.card,e.dataset[x.mark]="";let n=document.createElement("h4");n.className=f.cardTtl,n.textContent=_t([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let r=document.createElement("div");r.className=f.histScrl;let o=document.createElement("table");o.id=c.histTbl;let i=document.createElement("thead"),a=document.createElement("tr");for(let u of["Time","Est. Wait","Change"]){let p=document.createElement("th");p.textContent=u,a.appendChild(p)}i.appendChild(a),o.appendChild(i);let l=document.createElement("tbody");for(let u=t.length-1;u>=0;u--){let p=t[u],g="--",b="";if(u>0){let I=p.minutes-t[u-1].minutes;I<0?(g=`${I}m`,b=f.dltDn):I>0?(g=`+${I}m`,b=f.dltUp):g="0m"}let C=document.createElement("tr"),W=[[p.timeStr,""],[Qe(p.minutes),""],[g,b]];for(let[I,ft]of W){let vt=document.createElement("td");ft&&(vt.className=ft),vt.textContent=I,C.appendChild(vt)}l.appendChild(C)}o.appendChild(l),r.appendChild(o),e.appendChild(r),e.appendChild(lr());let d=document.getElementById("last-updated");d&&(d.closest("div, p, section")||d.parentElement).insertAdjacentElement("afterend",e)}function bi(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function ur(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),r=bi();if(r!==null&&r>tr&&!e.textContent.includes("(")){let a=Qe(r);e.textContent=`${e.textContent} (${r} minutes / ${a})`}let o=n.textContent.trim().split(" (")[0],i=ir(o);if(i&&s.setInterval(()=>{let a=Math.floor((Date.now()-i)/1e3);a>=0&&(n.textContent=`${o} (${a}s ago)`)},1e3),r!==null){let a=gi(),l=sessionStorage.getItem(a);l||(l=Math.random().toString(36).substring(2,11),sessionStorage.setItem(a,l)),S({queueHistory:{}}).then(d=>{let u=d.queueHistory||{},p=Date.now(),g={};for(let[I,ft]of Object.entries(u)){if(!Array.isArray(ft))continue;let vt=ft[ft.length-1];vt&&p-vt.timestamp<nr&&(g[I]=ft)}let b=g[l]||[],C=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),W=b[b.length-1];(!W||W.minutes!==r||W.timeStr!==C)&&(b.push({timestamp:p,timeStr:C,minutes:r}),b.length>er&&b.shift(),g[l]=b,T({queueHistory:g})),yi(b)})}}function dr(t,e){let n=document.getElementById("error_row");if(!n)return;let r;t?r=e?`Blocked for 24 hours, about ${Ht(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":r="Temporarily blocked. Log in in a new tab, then press Recheck.";let o=document.createElement("div");o.className="atlas_validationalert alert alert-danger warning",o.dataset[x.mark]="",o.textContent=r,n.replaceChildren(o),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function fr(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&S({cfRetryAfter:null}).then(n=>{let r=parseInt(n.cfRetryAfter,10);if(!isNaN(r)){Gn("cfRetryAfter");let o=document.getElementById("what-happened-section");if(o){let i=document.createElement("div");i.id=c.cdCard,i.className=f.card,i.dataset[x.mark]="";let a=document.createElement("h4");a.className=f.cardTtl,a.textContent=_t([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),i.appendChild(a);let l=document.createElement("div");l.id=c.cdTime,i.appendChild(l);let d=document.createElement("div");d.className=f.cdDiv,i.appendChild(d),i.appendChild(lr()),o.appendChild(i);let u=r,p=null,g=()=>{u>0?(l.textContent=Ht(u),u--):(l.classList.add(f.cdDiv+"-over"),l.textContent="You can try refreshing now!",p!=null&&s.clear(p))};g(),p=s.setInterval(g,1e3)}}})}async function mr(){let t=document.querySelector(".username");if(!t)return;let e=t.innerText.match(/(.*)\((\d*)\)/);if(!e)return;let[,n,r]=e,o=await N()||{},i=!o.id||o.id===r?o:{};i.name=n.trim(),i.id=r;let a=document.querySelectorAll("script");for(let l of a){let d=l.innerText.trim();if(d.includes("setAuthenticatedUserContext")){let u=/setAuthenticatedUserContext\('([^']*)'\)/,p=d.match(u);p&&(i.email=p[1])}}await T({profile:i})}async function pr(){let t=document.querySelector("#post_select");if(!t)return;let e=await tt();for(let n of t.options){if(!n.value)continue;e.findIndex(o=>o.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await Tt(e)}var wi=["visa-information","fee-payment","appointment-confirmation"];function Si(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(r=>{let o=r.querySelector(".text-bold");if(!o)return;let i=xi(o.textContent);if(!wi.includes(i))return;let a=vi(r);a&&(n[i]=a)}),Object.keys(n).length?n:null}function xi(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function vi(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function hr(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>Zn)return null}catch{}return t.value}function Ti(t){let e=(t.posts||[]).filter(o=>o.Updated).sort((o,i)=>o.Updated-i.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},r=hr(t.cgiIdToken);return r&&(n.token=r),n}async function Ze(){if(!q()||!await w("serverSync"))return;let t=await S(["profile","posts","cgiIdToken"]),e=Ti(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await fetch(Xe,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(o=>o.json());if(!n.success)return;let r="0";n.contribs>0&&(r=n.contribs.toString()),n.contribs>10&&(r="10+"),n.contribs>0&&await T({contribs:{email:t.profile?.email,updated:Date.now(),count:r}})}catch{}}function Je(t=0){q()&&document.querySelector("#appointment-card")&&w("serverSync").then(e=>{if(!e)return;let n=Si();if(!n){t<Qn&&s.setTimeout(()=>Je(t+1),he);return}S(["profile","cgiIdToken","savedDashboard"]).then(r=>{let o=hr(r.cgiIdToken);o&&JSON.stringify(n)!==JSON.stringify(r.savedDashboard)&&fetch(Xe,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:r.profile,dashboard:n,token:o})}).then(i=>i.json()).then(i=>{i.success&&T({savedDashboard:n})}).catch(()=>{})})})}var _i=[{slot:5,fromMin:0,toMin:2},{slot:1,fromMin:5,toMin:13},{slot:2,fromMin:14,toMin:21},{slot:3,fromMin:24,toMin:31},{slot:4,fromMin:35,toMin:50},{slot:5,fromMin:54,toMin:59}],Ci=[0,5,14,24,35,54],X=":05\u2013:13, :14\u2013:21, :24\u2013:31, :35\u2013:50, :54\u2013:02";function gr(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=r=>Number(e.find(o=>o.type===r)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function pt(t=new Date){let{minute:e}=gr(t);for(let n of _i)if(e>=n.fromMin&&e<=n.toMin)return n.slot;return 0}function Ct(t=new Date){if(pt(t))return 0;let{minute:e,second:n}=gr(t),r=e*60+n;for(let o of Ci){let i=o*60;if(r<i)return(i-r)*1e3}return(3600-r)*1e3}function Wt(t){return t<9e4?`${Math.ceil(t/1e3)}s`:`${Math.ceil(t/6e4)}m`}function nn(){let t=document.querySelector(h(c.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=c.selRow,t.dataset[x.mark]="",n.insertAdjacentElement("afterend",t);let r=document.createElement("span");return r.id=c.anchor,r.dataset[x.mark]="",r.dataset[x.w]=e.style.width,r.dataset[x.mw]=e.style.minWidth,r.hidden=!0,e.insertAdjacentElement("beforebegin",r),s.setStyle(e,"width","100%"),s.setStyle(e,"minWidth","0"),t.appendChild(e),t}var Ut="waitPillState",ki=3600*1e3,yr=f.pillWait,Ai=f.pillDone;function Ei(t,e){let n=document.createElement("span");n.className=`${f.pill} ${e}`;let r=(o,i)=>{let a=document.createElement("span");a.className=o,a.textContent=i,n.appendChild(a)};return r(f.pillTtl,t.title),t.timer!==void 0&&r(f.pillTmr,t.timer),n}function Mi(t,e=Date.now()){if(t.kind==="waiting")return{label:"Waiting For Response",variant:yr};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:yr}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:Ai}}return null}function $i(t,e,n=new Date){let r=rr(n);return t.seconds===void 0?{title:e?r:t.label,timer:e?void 0:r}:{title:r,timer:Ht(t.seconds)}}var Di=class{#t=null;#e={kind:"idle"};#r=null;#n=null;#o=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get(Ut))[Ut];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>ki){chrome.storage.local.remove(Ut);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#o=t,this.#i(),this.#c()}toggleClockMode(){s.alive&&(this.setClockMode(!this.#o),chrome.storage.local.set({waitPillClock:this.#o}))}render(t){return Mi(this.#e,t)}#l(t){return $i(t,this.#o,new Date)}#i(){if(this.#t??=Li(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(f.hidden);return}this.#t.classList.remove(f.hidden),this.#t.replaceChildren(Ei(this.#l(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#r&&(s.clear(this.#r),this.#r=null),t.kind==="running"?(chrome.storage.local.set({[Ut]:t}),this.#r=s.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove(Ut),this.#i(),this.#c()}#u(){this.#i(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,w("audioAlert").then(t=>{t&&Ki()})))}#c(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=s.setInterval(()=>this.#i(),1e3):!t&&this.#n&&(s.clear(this.#n),this.#n=null)}},Et=new Di,Vt="pillPosition",br=4;function wr(t,e,n){return Math.max(e,Math.min(n,t))}function Tr(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,r=e.height>0?e.height:36;return{w:n,h:r}}function kt(t,e,n){let{w:r,h:o}=Tr(t),i=wr(e,0,Math.max(0,window.innerWidth-r)),a=wr(n,0,Math.max(0,window.innerHeight-o));return t.style.setProperty("left",i+"px","important"),t.style.setProperty("top",a+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:i,top:a}}function Ii(t){var e=!1,n=!1,r=0,o=0,i=0,a=0;function l(u){if(e){var p=u.touches?u.touches[0]:u,g=p.clientX-r,b=p.clientY-o;!n&&Math.abs(g)<br&&Math.abs(b)<br||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",kt(t,i+g,a+b),u.cancelable&&u.preventDefault())}}function d(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",d),document.removeEventListener("touchmove",l),document.removeEventListener("touchend",d),n){let u=t.getBoundingClientRect();chrome.storage.local.set({[Vt]:{top:Math.round(u.top),left:Math.round(u.left)}})}n=!1}}t.addEventListener("mousedown",function(u){if(u.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let p=t.getBoundingClientRect();r=u.clientX,o=u.clientY,i=p.left,a=p.top,kt(t,p.left,p.top),document.addEventListener("mousemove",l),document.addEventListener("mouseup",d),u.preventDefault(),u.stopPropagation()}),t.addEventListener("touchstart",function(u){e=!0,n=!1,delete t.dataset.skipClick;let p=t.getBoundingClientRect();r=u.touches[0].clientX,o=u.touches[0].clientY,i=p.left,a=p.top,kt(t,p.left,p.top),document.addEventListener("touchmove",l,{passive:!1}),document.addEventListener("touchend",d)},{passive:!0})}function Li(){let t=document.querySelector(h(c.waitTime));return t||(t=document.createElement("div"),t.id=c.waitTime,t.className=f.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),Ii(t),chrome.storage.local.get(Vt).then(e=>{let n=e[Vt];n&&typeof n.top=="number"&&typeof n.left=="number"&&kt(t,n.left,n.top)}),qi(t),t)}function Sr(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function Pi(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function Oi(t){let{w:e,h:n}=Tr(t),r=12;return[{left:r,top:r},{left:Math.max(r,window.innerWidth-e-r),top:r},{left:r,top:Math.max(r,window.innerHeight-n-r)},{left:Math.max(r,window.innerWidth-e-r),top:Math.max(r,window.innerHeight-n-r)}]}async function Ri(){let e=(await chrome.storage.local.get(Vt))[Vt];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function qi(t){let e=!1,n=async()=>{if(!s.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(f.hidden))return;let r=Pi(),o=!!(r&&r.offsetParent!==null&&r.getBoundingClientRect().height>20),i=t.getBoundingClientRect();if(o&&Sr(i,r.getBoundingClientRect())){let a=r.getBoundingClientRect(),l=Oi(t),d=l.find(u=>{let p={left:u.left,top:u.top,right:u.left+i.width,bottom:u.top+i.height};return!Sr(p,a)})||l[2];e=!0,t.setAttribute("data-dodging",""),kt(t,d.left,d.top);return}if(e&&!o){e=!1,t.removeAttribute("data-dodging");let a=await Ri();a&&kt(t,a.left,a.top)}else o||t.removeAttribute("data-dodging")};s.setInterval(n,400),s.on(window,"resize",n)}async function rn(){if(!s.alive||!await w("defaultWaitTime")||!await s.waitFor("#post_select",{attempts:Bt}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});Et.setClockMode(t),await Et.restore()}async function _r(){await w("defaultWaitTime")&&Et.waiting()}async function xe(t){await w("defaultWaitTime")&&Et.run(t)}function Cr(){Et.toggleClockMode()}function kr(t){Et.setClockMode(t)}var Ft=null,Kt=null,ye=null;function Ar(){return ye||(ye=new(window.AudioContext||window.webkitAudioContext),s.disposable(()=>ye?.close())),ye}async function on(t=150){try{let e=Ar();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),r=e.createGain();n.connect(r),r.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let o=e.currentTime,i=t/1e3;r.gain.setValueAtTime(0,o),r.gain.linearRampToValueAtTime(.1,o+.01),r.gain.setValueAtTime(.1,o+Math.max(.01,i-.02)),r.gain.linearRampToValueAtTime(0,o+i),n.start(),n.stop(o+i)}catch(e){console.error("Audio beep failed:",e)}}function Ni(t,e=125,n=125){let r=0,o=()=>{r>=t||(on(e),r++,s.setTimeout(o,e+n))};o()}var tn=4,xr=50,vr=50,Bi=600;function Er(){if(Kt)return;let t=()=>{Ni(tn,xr,vr);let e=tn*xr+(tn-1)*vr;Kt=s.setTimeout(t,e+Bi)};t()}var Hi=250,Wi=10,Ui=300,Fi=1e3;function Ki(){if(Ft)return;let t=[];for(let o=0;o<=Ui;o+=Wi)t.push(o);let e=Date.now(),n=0,r=()=>{let o=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&o>=t[n];){let i=n===t.length-1;on(i?Fi:Hi),n++}if(n<t.length){let i=t[n],a=e+i*1e3,l=Math.max(0,a-Date.now());Ft=s.setTimeout(r,l)}else Mt()};r()}function Mt(){Ft&&(s.clear(Ft),Ft=null),Kt&&(s.clear(Kt),Kt=null),en()}var be=null,we=null,At=null,Se=null,Yt=null;async function Mr(){en();try{let t=Ar();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),r=t.createOscillator(),o=t.createGain(),i=t.createGain();n.type="square",r.type="sawtooth",n.frequency.value=880,r.frequency.value=1320,o.gain.value=.85,i.gain.value=.65,n.connect(o).connect(e),r.connect(i).connect(e);let a=t.createOscillator(),l=t.createGain();a.type="triangle",a.frequency.value=3.2,l.gain.value=280,a.connect(l),l.connect(n.frequency),l.connect(r.frequency);let d=t.currentTime;n.start(d),r.start(d),a.start(d),At={osc1:n,osc2:r,lfo:a,master:e};let u=()=>{At&&(on(500),we=s.setTimeout(u,1800))};u(),be=s.setTimeout(en,12e4),Yt=document.title;let p=!1,g=()=>{At&&(document.title=p?Yt:"!!! SUBMIT CLICKED !!!",p=!p,Se=s.setTimeout(g,450))};g()}catch(t){console.error("Submit alarm failed:",t)}}function en(){if(be&&(s.clear(be),be=null),we&&(s.clear(we),we=null),Se&&(s.clear(Se),Se=null),Yt&&(document.title=Yt,Yt=null),At){try{let{osc1:t,osc2:e,lfo:n}=At;t.stop(),e.stop(),n.stop()}catch{}At=null}}function Yi(){if(document.querySelector(h(c.recheck)))return;let t=nn();if(!t)return;let e=document.querySelector("#post_select"),n=document.createElement("button");n.id=c.recheck,n.type="button",n.textContent=_t([82,101,99,104,101,99,107]);let r=()=>{let o=pt(),i=Ct();n.disabled=!e.value||!o,n.title=o?"Recheck slots for the selected city":`Slot checks paused \u2014 IST windows ${X}. Next in ${Wt(i)}.`,n.classList.toggle(f.hidden,!e.value)};s.on(n,"click",()=>{if(!pt()){let o=Wt(Ct());n.title=`Outside slot window \u2014 next check at IST ${X} (in ${o})`,r();return}e.dispatchEvent(new Event("change",{bubbles:!0}))}),t.appendChild(n),r(),s.on(e,"change",r),s.setInterval(r,1e3)}async function an(){s.alive&&await w("recheckButton")&&await s.waitFor("#post_select",{attempts:Bt})&&Yi()}async function sn(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await s.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let r=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(l=>l.innerText.trim()===r))continue;let i=document.createElement("li");i.className="usa-sidenav__item",i.dataset[x.mark]="";let a=document.createElement("a");a.href=n.link,a.className=f.sideLink,a.target="_self",a.textContent=n.text,i.appendChild(a),t.appendChild(i)}}function $r(t){if(t.response.HasError)return;let e=document.querySelector("#page_form");if(!e)return;let n={};for(let l of t.response.ScheduleDays||[]){if(!l?.Date||l.Date.length<10)continue;let d=l.Date.slice(0,7),u=parseInt(l.Date.slice(8,10),10);u&&(d in n?n[d].push(u):n[d]=[u])}document.querySelector(h(c.datesCont))?.remove();let r=document.querySelector("#post_select"),o=r?.options[r.selectedIndex]?.text??"",{container:i,details:a}=Vi(o);e.appendChild(i);for(let[l,d]of Object.entries(n)){let u=document.createElement("strong");u.textContent=l,a.append(u,`: ${d.join(", ")}`,document.createElement("br"))}Object.keys(n).length||a.append("No slots available",document.createElement("br"))}function Vi(t){let e=(a,l,d)=>{let u=document.createElement(a);return l&&(u.className=l),d?.appendChild(u),u},n=e("div","row");n.id=c.datesCont;let r=e("div","col-sm-12 atlas_section mt-3",n),o=e("div","col-sm-12 atlas_section_header_row",e("div","row",r));e("h2",null,o).textContent=t;let i=e("p",null,e("div","col-sm-12",e("div","row",r)));return i.id=c.datesPara,{container:n,details:i}}var Dr=null;function ji(){let t=document.querySelector(h(c.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return s.setStyle(n,"display","flex"),s.setStyle(n,"alignItems","center"),s.setStyle(n,"justifyContent","flex-end"),s.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=c.ofcDate,t.dataset[x.mark]="",e.insertAdjacentElement("beforebegin",t),t}function Gi(){if(!location.pathname.includes("/schedule"))return;let t=Dr;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=ji();n&&(n.textContent=`OFC (Estimate): ${or(e.appointmentDateStr)}`)}function Ir(t){chrome.runtime?.id&&(Dr=t.data.data,s.waitFor("#submitbtn").then(e=>{e&&Gi()}))}var ve=new Map,Lr=45e3,Te=new Map,Pr=8e3,Or=0;function _e(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function Ce(t){try{let[e,n,r]=t.split("-").map(Number);return new Date(e,n-1,r).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function zi(t,e){return`${t}:${e.slice(0,5).join(",")}`}function Xi(t){let e=Date.now(),n=ve.get(t);if(n&&e-n<Lr)return!1;ve.set(t,e);for(let[r,o]of ve)e-o>Lr*4&&ve.delete(r);return!0}function Qi(t){let e=Date.now(),n=Te.get(t);if(n&&e-n<Pr)return!1;Te.set(t,e);for(let[r,o]of Te)e-o>Pr*6&&Te.delete(r);return!0}async function Rr(){return await w("telegramViaServer")!==!1}async function qr(t,{kind:e="alert",dedupKey:n="",skipDedup:r=!1,notifyMuktesh:o=!0}={}){if(t&&await Rr())try{await fetch(Xn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:r,notify_muktesh:o}),signal:AbortSignal.timeout(2e4)})}catch{}}function Zi(t,{kind:e="screen",dedupKey:n="",waitMs:r=0,skipDedup:o=!1,notifyMuktesh:i=!0}={}){s.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:r,skipDedup:o,notifyMuktesh:i,captureScreenshot:!0})}async function Ji(t,e,n){let r=_e(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&i.push(`\u{1FAAA} <b>Visa:</b> ${n}`),i.push(`\u{1F550} <b>Checked:</b> ${o} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),i.push(`\u{1F4C6} <b>Dates (${r.length}):</b>`,"");for(let a of r.slice(0,30))i.push(`\u{1F7E2} <b>${Ce(a)}</b>`);return r.length>30&&i.push("",`\u2795 <i>+${r.length-30} more dates</i>`),i.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),i.join(`
`)}function ta(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",r=document.querySelector("#datepicker")?.value||"\u2014",i=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:r,time:i}}async function Nr(t,{postId:e,postName:n,hasError:r}={}){if(r||!t?.length)return;let o=_e(t);if(!o.length||!await w("telegramAlert"))return;let i=zi(e||n||"unknown",o);if(!Xi(i))return;let a=await N(),l=await Ji(n,t,a?.visa||"");await qr(l,{kind:"slots",dedupKey:i,notifyMuktesh:!0})}function ea(t,e,n){let r=_e(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
\u{1F3DB}\uFE0F ${i}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`;if(r.length){let a=r.slice(0,5).map(l=>Ce(l)).join(", ");return`<b>DATES AVAILABLE</b>
\u{1F3DB}\uFE0F ${i}
\u{1F4C6} ${r.length} date(s)
${a}${r.length>5?"\u2026":""}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}return`<b>City changed \u2014 no dates</b>
\u{1F3DB}\uFE0F ${i}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}function na(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=e?Ce(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${r}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function ra(t,e,n){let r=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?Ce(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u23F0 ${n} slot(s)
\u{1F550} ${r} IST
\u{1F4F2} Visa Slot 6`}async function $t(t,{kind:e="screen",dedupKey:n,waitMs:r=0,skipDedup:o=!1}={}){if(await w("telegramScreenshots")===!1||!await Rr())return;let i=n||`${e}:${String(t).slice(0,80)}`;!o&&!Qi(i)||Zi(t,{kind:e,dedupKey:i,waitMs:r,skipDedup:o,notifyMuktesh:!0})}async function Br(t,{postId:e,postName:n,hasError:r}={}){let o=ea(n,t,r),i=_e(t),a=i.length?"dates":"city";await $t(o,{kind:a,dedupKey:`${a}:${e||n}:${i.length}:${r?1:0}`,waitMs:i.length?1400:900})}async function Hr(t,e){await $t(na(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function Wr(t,e,n){await $t(ra(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function Ur(){let t=Date.now();if(t-Or<8e3)return;Or=t;let e=await N(),{city:n,date:r,time:o}=ta(),i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),a=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${r}`,`\u23F0 <b>Time:</b> ${o}`];e?.email&&a.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&a.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),a.push(`\u{1F550} <b>When:</b> ${i} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let l=a.join(`
`);await qr(l,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await $t(l,{kind:"submit",skipDedup:!0,waitMs:200})}var ke=25;function oa(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function ln(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let r=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,r),n-1)}function Kr(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function Yr(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function un(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function Fr(t){if(!t||t.disabled)return!1;try{let e=t.closest("tr"),r=[t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,t.closest("label"),t,e].filter(Boolean);for(let o of r)o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),o.click();(t.type==="radio"||t.type==="checkbox")&&(t.checked=!0),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function Vr(){let t=new Set,e=[],n=r=>{if(!r||t.has(r)||un(r)||r.disabled)return;let o=r.closest("tr");o&&Yr(o)||(t.add(r),e.push(r))};for(let r of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let o of document.querySelectorAll(`${r}:not([disabled])`))n(o);return e}function ia(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!Kr(n)||Yr(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function aa(t){for(let e of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(e.tagName!=="SELECT"||e.disabled||un(e))continue;let n=[...e.options].filter(o=>!o.disabled&&o.value&&o.value!=="0"&&Kr({textContent:o.textContent}));if(!n.length)continue;let r=ln(n.length,t);return e.value=n[r].value,e.dispatchEvent(new Event("change",{bubbles:!0})),!0}return!1}function sa(t){if(aa(t))return!0;let e=Vr();if(e.length){let r=ln(e.length,t);if(Fr(e[r]))return!0}let n=ia();if(n.length){let r=ln(n.length,t),o=n[r],i=o.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(i&&Fr(i))return!0;let a=o.querySelector("label");if(a)return a.click(),!!o.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function L(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!un(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function ca({slotIndex:t=0,maxMs:e=12e3,pollMs:n=ke,onTick:r}={}){let o=Date.now()+e,i=Math.max(10,n||25);return new Promise(a=>{let l=()=>{if(!s.alive)return a(!1);if(r?.(),sa(t)||L())return a(!0);if(Date.now()>=o)return a(!1);s.setTimeout(l,i)};l()})}function jt({time:t,date:e,slotIndex:n,pollMs:r,maxMs:o}){let i=n??0,a=o||15e3,l=r||ke;return s.send({action:"forcePickTimeSlot",slotIndex:i,maxMs:a,pollMs:l}),s.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:i,pollMs:l,domWaitMs:0,maxMs:a}),ca({slotIndex:i,maxMs:a,pollMs:l})}var cn=!1;function jr({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(cn)return;cn=!0;let r=!1,o=async()=>{if(!(!s.alive||r)){if(L()){n?.();return}try{if(t&&!await t())return}catch{return}Vr().length&&(r=!0,await jt({slotIndex:e,time:"00:00",maxMs:800,pollMs:ke}),r=!1,L()&&n?.())}};s.setInterval(o,ke);let i=document.querySelector("#page_form")||document.body,a=new MutationObserver(()=>o());a.observe(i,{childList:!0,subtree:!0}),s.disposable(()=>{a.disconnect(),cn=!1})}function Gr(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let r=oa(n?.Time);if(!r)continue;let o=r.match(/(\d{1,2}):(\d{2})/);if(!o)continue;let[,i,a]=o;if(e.includes(`${i}:${a}`)||e.includes(`${parseInt(i,10)}:${a}`))return!0}return!1}var Ae="submitErrors",zr=50,la=45e3,Qr=0,dn=new Set,Gt=null;function ua(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",r=document.querySelector("#datepicker")?.value||"";return{city:e,date:r,url:location.href}}function zt(){Qr=Date.now()+la,dn.clear(),ga()}function Ee(){return Date.now()<Qr}function da(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function fa(t){let e=await S({[Ae]:[]}),n=Array.isArray(e[Ae])?e[Ae]:[];n.push(t),n.length>zr&&n.splice(0,n.length-zr),await T({[Ae]:n})}function Xr(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function ma(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${Xr(t.source)}`,`\u{1F4AC} <b>Message:</b> ${Xr(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let r=n.join(`
`);await $t(r,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function Xt(t,e,n={}){let r=String(e||"").trim();if(!r||!Ee()&&!n.force)return;let o=da(t,r);if(dn.has(o))return;dn.add(o);let i=ua(),a=await N(),l={at:Date.now(),source:String(t||"unknown"),message:r.slice(0,2e3),city:n.city||i.city,date:n.date||i.date,url:n.url||i.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:a?.email||""};await fa(l);try{await ma(l)}catch{}}function pa(t){if(!Ee())return;let e=t?.status,n=t?.retryAfter,r=t?.cgiBlock,o=`Request failed (HTTP ${e||"?"})`;n!=null&&(o+=` \u2014 retry after ${n}s`),r&&(o+=" \u2014 CGI access limitation"),Xt("ajax_error",o,{status:e})}function Zr(t){if(!Ee()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){pa({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",o=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";Xt("ajax_response",o,{route:t.tail||""})}var ha=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function ga(){Gt&&s.clear(Gt);let t=()=>{if(!s.alive||!Ee()){Gt=null;return}for(let e of ha)for(let n of document.querySelectorAll(e)){let r=(n.textContent||"").replace(/\s+/g," ").trim();!r||r.length<4||Xt("page_validation",r)}Gt=s.setTimeout(t,600)};Gt=s.setTimeout(t,500)}var rt="aiSubmitByAccount",re=8e3;var R=25,ya=80,Le=0,Pe=1e4,so=1e3;function oe(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}var $e=13e3,ba=18e3,te=45e3,U=18e4,Jr=5e3,wa=2e4,Sa=15e3;function it(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function mn(){return/\/ofc-schedule\b/i.test(location.pathname)}function _(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var xa=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function Me(t,e){let n=xa[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(o=>{let i=e===o?" selected":"";return`<option value="${o.replace(/"/g,"&quot;")}"${i}>${o}</option>`}).join("")}function to(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function De(t){try{let[e,n,r]=t.split("-").map(Number);return new Date(e,n-1,r).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function ie(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function Oe(t){return!!(t&&t.citiesEnabled&&t.cities?.length)}async function j(){let t=await N();return t?.id?String(t.id):null}async function J(t){return t&&((await S(rt))[rt]||{})[t]||null}async function co(t,e){if(!t)return;let r=(await S(rt))[rt]||{};e==null?delete r[t]:r[t]=e,await T({[rt]:r})}var H=!1;function ae(){return H}function lo(){H=!0,Ie(),Jt()}function It(){H=!1,O=!1,Ie()}async function uo(t){lo();let e=await J(t);if(!e){bt();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await co(t,e),bt()}function se(t,e,n){let r=String(t||"").slice(0,10);return!(!r||r.length<10||e&&r<e||n&&r>n)}async function G(){if(H||_()||!it())return null;let t=await j();if(!t)return null;let e=await J(t);return!ie(e)||!e.from||!e.to?null:{...e,accountId:t}}async function ce(){if(H||_()||!it())return null;let t=await j();if(!t)return null;let e=await J(t);return Oe(e)?{...e,accountId:t}:null}function pn(t,e,n){let r=new Date;return r.setHours(0,0,0,0),(t||[]).filter(o=>o&&typeof o.Date=="string"&&o.Date.length>=10).filter(o=>se(o.Date,e,n)).filter(o=>{let[i,a,l]=o.Date.slice(0,10).split("-").map(Number);return new Date(i,a-1,l)>=r}).sort((o,i)=>String(o.Date).localeCompare(String(i.Date)))}var O=!1,nt=null,ot=null,Z=!1,gt=0,B=!1,V=0,yt=0,Qt=0,Zt=0,le=!1,Y=null,Q=0,M=!1,E=0,Dt=null,ht=null,ee=0,eo=!1,no="",ro=!1,fn=0;function va(t){return(t||[]).map(e=>e.id).join("")}function fo(){let t=document.querySelector(h(c.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function oo(t){let e=document.querySelector(h(c.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function Ie(){nt&&(s.clear(nt),nt=null),O=!1}function Lt(){Dt&&(s.clear(Dt),Dt=null)}function mo(){Lt(),E||(E=Date.now());let t=Math.max(500,te-(Date.now()-E));Dt=s.setTimeout(()=>{Dt=null,!(!M||!B||!s.alive)&&(M=!1,E=0,P(Date.now()),y(`City Change \u2014 booking hold timed out (${te/1e3}s); next city in 13\u201318s\u2026`),k())},t)}function Ta(){ht&&(s.clear(ht),ht=null)}function hn(t=Date.now()){let e=!1;if(Z&&gt&&t-gt>=Sa&&(Z=!1,gt=0,e=!0),M&&(E||(E=t),t-E>=te?(Lt(),M=!1,E=0,e=!0):Dt||mo()),le){if(Q||(Q=t),!ho()&&t-Q>=8e3)F(),e=!0;else if(t-Q>=U)F(),e=!0;else if(!Y){let n=Math.max(500,U-(t-Q));Y=s.setTimeout(()=>{Y=null,!(!B||M)&&(F(),P(Date.now()),y(`City Change \u2014 still Loading after ${U/1e3}s; changing city\u2026`),k())},n)}}return O&&!nt&&(O=!1,e=!0),e}function po(){if(ht||!B)return;let t=()=>{if(ht=null,!B||!s.alive||H)return;let e=Date.now(),n=hn(e),r=ee>0&&e-ee>=wa;(n||r||!ot&&!Z)&&(n||r?(P(Date.now()),y(r?"City Change \u2014 stuck; auto-restarting hops\u2026":"City Change \u2014 lock cleared; next city in 13\u201318s\u2026")):y("City Change \u2014 timer lost; restarting\u2026"),k()),B&&(ht=s.setTimeout(t,Jr))};ht=s.setTimeout(t,Jr)}function Jt(){bn(),Ta(),Lt(),Z=!1,gt=0,B=!1,M=!1,E=0,V=0,yt=0,ee=0,F()}function F(){le=!1,Q=0,Y&&(s.clear(Y),Y=null)}function gn(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let r=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(r))continue;let o=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let i of o)if(i&&/\bLoading\.{0,3}\b/i.test((i.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let o=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(o))continue;let i=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(i))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function ho(){return gn()}function _a(){le=!0,Q=Date.now(),Y&&s.clear(Y),Y=s.setTimeout(()=>{Y=null,!(!B||M)&&(F(),P(Date.now()),y(`City Change \u2014 still Loading after ${U/1e3}s; changing city\u2026`),k())},U)}function yn(t){let e=Math.max(0,Number(t)||0)*1e3;Zt=Math.max(Zt,Date.now()+e),V=Math.max(V,Zt),F(),k()}function go(){F()}function Pt(){H||(M=!0,E||(E=Date.now()),bn(),F(),mo(),y("City Change \u2014 paused (Auto Submit booking)\u2026"))}function at(){M&&(Lt(),M=!1,E=0,!(!B||H)&&(P(Date.now()),y("City Change \u2014 resuming; next city in 13\u201318s\u2026"),k()))}async function yo(){let t=await G();if(!t)return;let e=Date.now();if(e-fn<6e4)return;fn=e;let r=document.querySelector("#post_select")?.value;if(!r){y("Auto Submit ON \u2014 pick a city first.");return}let i=(await tt()).find(l=>String(l.ID)===String(r)),a=i?.Days;if(Array.isArray(a)&&a.length){let l=pn(a,t.from,t.to);if(l.length){Pt();let d=oe(l.length),u=l[d].Date;y(`Auto Submit: picking date #${d+1} (${u.slice(0,10)})\u2026`),s.send({action:"selectFirstDate",date:u,maxMs:re,pollMs:R});return}y(`Auto Submit ON \u2014 no dates in your range on ${i.Name||"this city"} yet.`);return}y("Auto Submit ON \u2014 loading slots for current city\u2026"),s.send({action:"selectPost",postId:String(r)})}function Ca(){fn=0}function bn(){ot&&(s.clear(ot),ot=null)}function ka(t,e){return t+Math.random()*(e-t)}function Aa(){return ka($e,ba)}function P(t=Date.now()){V=t+Aa()}function bo(t=Date.now()){let e=Ct(new Date(t));if(e>0)return e;if(Zt>t)return Zt-t;if(yt){let n=yt+$e-t;if(n>0)return n}return V>t?V-t:0}function k(){if(!B)return;if(bn(),M||le){ot=s.setTimeout(()=>{io()},500);return}let t=bo();t<$e&&(yt?t=Math.max(0,yt+$e-Date.now()):(V>Date.now()||P(Date.now()),t=V-Date.now())),ot=s.setTimeout(()=>{io()},t)}function Ea(t,e){if(!t.length)return null;if(t.length===1)return Qt=0,t[0];let n=t.findIndex(o=>String(o.id)===String(e));n<0&&(n=Math.max(0,Math.min(Qt,t.length-1)));let r=(n+1)%t.length;return Qt=r,t[r]}function wn(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function Sn(){let t=document.querySelector(h(c.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function xn(){return{from:document.querySelector(h(c.aiFrom))?.value||null,to:document.querySelector(h(c.aiTo))?.value||null}}function wo(t=[],{force:e=!1}={}){let n=document.querySelector(h(c.aiCities));if(!n)return;let r=wn(),o=va(r),i=document.querySelector(h(c.aiPanel)),a=i&&!i.classList.contains(f.hidden),l=fo();if(!e&&o===no&&n.querySelector('input[type="checkbox"]'))return;no=o;let d=new Set(a&&l.length&&!e&&!t.length?l:(t.length?t:l).map(String));if(n.replaceChildren(),!r.length){n.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let u of r){let p=document.createElement("label"),g=document.createElement("input");g.type="checkbox",g.value=u.id,g.dataset.name=u.name,g.checked=d.has(u.id),p.append(g,document.createTextNode(u.name)),n.appendChild(p)}}function Ma(t){let e=t?.cities||[];return e.length?e.map(n=>n.name||n.id).join(", "):"\u2014"}async function ne(t,e={}){let n=await J(t)||{},{from:r,to:o}=xn(),i=Sn(),a={...n,from:r||n.from||null,to:o||n.to||null,cities:i.length?i:n.cities||[],loginId:document.querySelector(h(c.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(h(c.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(l=>{let d=[c.aiQ1,c.aiQ2,c.aiQ3][l],u=[c.aiA1,c.aiA2,c.aiA3][l];return{q:document.querySelector(h(d))?.value?.trim()||n.security?.[l]?.q||"",a:document.querySelector(h(u))?.value?.trim()||n.security?.[l]?.a||"",set:l+1}}),...e};return typeof a.submitEnabled=="boolean"&&(a.enabled=a.submitEnabled),await co(t,a),a}async function $a(t,e){if(!pt()||M||O)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let r=String(t);return String(n.value)===r?!1:(_a(),y(`Switching city \u2192 ${e||t}\u2026`),s.send({action:"selectPost",postId:r}),!0)}function So(){eo||!document.querySelector("#post_select")||(eo=!0)}async function io(){if(!(Z||!B)){Z=!0,gt=Date.now(),ee=Date.now(),ot=null;try{if(H||_()||!s.alive){Jt();return}if(hn()){P(Date.now()),y("City Change \u2014 auto-unstuck; next city in 13\u201318s\u2026"),k();return}if(M||O){let g=E?Date.now()-E:0;if(M&&g>=te){Lt(),M=!1,E=0,P(Date.now()),y("City Change \u2014 hold expired; next city in 13\u201318s\u2026"),k();return}let b=Math.max(0,te-g);y(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(b/1e3)}s`),k();return}let t=Date.now(),e=pt(new Date(t)),n=Ct(new Date(t));if(!e){y(`City Change \u2014 waiting for slot window (IST ${X}, next in ${Wt(n)})`),k();return}if(le){let g=Q?t-Q:0;if(ho()){if(g>=U){F(),P(Date.now()),y(`City Change \u2014 still Loading after ${U/1e3}s; changing city\u2026`),k();return}let C=Math.max(0,Math.ceil((U-g)/1e3));y(`City Change \u2014 Date Loading\u2026 stay (${C}s then hop if still Loading)`),k();return}let b=Math.max(0,Math.ceil((U-g)/1e3));if(y(`City Change \u2014 waiting calendar result\u2026 (${b}s max)`),g>=U){F(),P(Date.now()),k();return}k();return}let r=bo(t);if(r>0){let g=Math.ceil(r/1e3);y(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,g)}s`),k();return}let o=await ce();if(!o?.cities?.length){Jt();return}let i=new Set(wn().map(g=>g.id)),a=o.cities.filter(g=>i.has(String(g.id)));if(!a.length){y("Preferred cities not found in the dropdown \u2014 pick cities again."),Jt();return}let l=document.querySelector("#post_select"),d=l?String(l.value):"",u=Ea(a,d);if(!u){P(t),k();return}if(await $a(u.id,u.name)){yt=Date.now(),P(yt);let g=a.map(C=>C.name||C.id).join(" \u2192 "),b=`${Qt+1}/${a.length}`;y(`City Change \u2014 ${b} ${u.name||u.id} (path: ${g}); waiting Date Loading (max ${U/1e3}s)`)}else P(t);k()}finally{Z=!1,gt=0}}}async function xo(){if(H||_()||!it())return;let t=await ce();if(!t?.cities?.length)return;let e=new Set(wn().map(a=>a.id)),n=t.cities.filter(a=>e.has(String(a.id)));if(!n.length){y("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}Lt(),F(),M=!1,E=0,O=!1,Z=!1,gt=0,B=!0,ee=Date.now(),V=Date.now();let r=document.querySelector("#post_select"),o=r?String(r.value):"",i=n.findIndex(a=>String(a.id)===o);Qt=i>=0?i:0,y(`City Change ON \u2014 IST ${X}; hop 13\u201318s in checklist order; auto-unstick; Loading max ${U/1e3}s`),po(),k()}async function vo(){if(H||_()||!mn()||!s.alive||!(await ce())?.cities?.length||!document.querySelector("#post_select"))return;if(!B){await xo();return}let e=hn();po(),(e||!ot&&!Z)&&(e&&(P(Date.now()),y("City Change \u2014 auto-unstuck; next city in 13\u201318s\u2026")),k())}function To(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function Re(){let t=To();return!!(t&&!t.disabled)}function vn(){let t=To();if(!t||t.disabled)return!1;try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}return s.send({action:"forceClickSubmit",prefix:m,pollMs:R,maxMs:Pe}),!0}function Da(){return L()?Re():!1}function _o(){y("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function Tn(t){if(H||_()||O)return;let e=await J(t);if(!ie(e))return;Pt(),O=!0,zt();let n=Date.now(),r=!1,o=L()?Date.now():0,i=async d=>{if(!(r||!O||!s.alive)){if(r=!0,window.removeEventListener("message",a),nt&&(s.clear(nt),nt=null),_()){O=!1;return}if(O=!1,d){await uo(t),y("Submit clicked \u2014 all Tik Tik operations stopped.");return}at(),y(B?"Auto Submit \u2014 Submit not clicked in time; City Change resuming\u2026":"Auto Submit \u2014 Submit not clicked in time; still watching\u2026")}},a=d=>{!s.alive||d.source!==window||d.data?.action===et.sub&&i(!0)};window.addEventListener("message",a);let l=async()=>{if(r||!O||!s.alive)return;let d=Date.now(),u=d-n;if(L()&&!o&&(o=d,y("Time slot selected \u2014 waiting for Submit to enable\u2026")),o&&d-o>=ya&&(Da()?(y("Submit enabled \u2014 clicking\u2026"),vn()):y("Waiting for Submit button to enable\u2026")),u>=Pe)return i(!1);nt=s.setTimeout(l,R)};l()}async function Co(){if(!L()||O||H)return;let t=await G();t&&await Tn(t.accountId)}function y(t){let e=document.querySelector(h(c.aiStatus));e&&(e.textContent=t)}function $(t){y(t)}function Ia(t){let e=document.querySelector(h(c.aiSubmitBtn)),n=document.querySelector(h(c.aiCitiesBtn)),r=ie(t),o=Oe(t);e&&(e.classList.toggle(f.aiOnBtn,r),e.textContent=r?"Auto Submit: ON":"Auto Submit: OFF"),n&&(n.classList.toggle(f.aiOnBtn,o),n.textContent=o?"City Change: ON":"City Change: OFF")}function La(t,e){let n=document.querySelector(h(c.aiStatus)),r=document.querySelector(h(c.aiBtn));if(!n||!r)return;Ia(t);let o=ie(t),i=Oe(t);o||i?(r.classList.add(f.aiOn),r.textContent="Tik Tik ON"):(r.classList.remove(f.aiOn),r.textContent="Tik Tik");let l=[];o&&t.from&&t.to?l.push(`Auto Submit ON (${De(t.from)} \u2013 ${De(t.to)}, clicks Submit as soon as time slot is ready)`):l.push("Auto Submit OFF"),i?l.push(`City Change ON (${Ma(t)}, ${X})`):l.push("City Change OFF"),n.textContent=`Account ${e||"\u2014"}: ${l.join(" \xB7 ")}`}async function bt(){let t=await j(),e=t?await J(t):null;La(e,t);let n=document.querySelector(h(c.aiFrom)),r=document.querySelector(h(c.aiTo));n&&e?.from&&(n.value=e.from),r&&e?.to&&(r.value=e.to);let o=(e?.cities||[]).map(C=>C.id),i=document.querySelector(h(c.aiPanel)),a=i&&!i.classList.contains(f.hidden),l=fo();wo(a&&l.length?l:o);let d=document.querySelector(h(c.aiLogin)),u=document.querySelector(h(c.aiPass));d&&e?.loginId&&(d.value=e.loginId),u&&e?.loginPass&&(u.value=e.loginPass);let p=e?.security||[],g=[c.aiQ1,c.aiQ2,c.aiQ3],b=[c.aiA1,c.aiA2,c.aiA3];g.forEach((C,W)=>{let I=document.querySelector(h(C));I&&(I.innerHTML=Me(W,p[W]?.q||""))}),b.forEach((C,W)=>{let I=document.querySelector(h(C));I&&p[W]?.a&&(I.value=p[W].a)})}function ao(t){let e=document.querySelector(h(c.aiPanel));e&&(e.classList.toggle(f.hidden,!t),t&&j().then(async n=>{let r=n?await J(n):null;wo((r?.cities||[]).map(o=>o.id),{force:!0})}))}async function Pa(){let t=await j();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let e=await J(t)||{},n=!ie(e),{from:r,to:o}=xn();if(n){if(!r||!o){y("Select both From and To dates before enabling Auto Submit.");return}if(r>o){y("From date must be before To date.");return}if(!window.confirm(`Enable Auto Submit?

Range: ${De(r)} \u2013 ${De(o)}
If a matching slot appears on the current city, it will select date + time and Submit once.

City Change is separate \u2014 use its own ON/OFF button.`))return;It(),Ie(),Ca(),await ne(t,{submitEnabled:!0,from:r,to:o,confirmedAt:Date.now()})}else Ie(),await ne(t,{submitEnabled:!1,from:r||e.from,to:o||e.to});await bt(),n&&await yo()}async function Oa(){let t=await j();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let e=await J(t)||{},n=!Oe(e),r=Sn();if(n){if(!r.length){y("Select at least one preferred city before enabling City Change.");return}if(!window.confirm(`Enable City Change?

Cities (in order): ${r.map(i=>i.name).join(" \u2192 ")}
City checks run each hour during IST windows ${X}, switching cities every 13\u201318 seconds in that same order.

Auto Submit is separate \u2014 use its own ON/OFF button.`))return;It(),await ne(t,{citiesEnabled:!0,cities:r}),await bt(),So(),await xo();return}Jt(),await ne(t,{citiesEnabled:!1,cities:r.length?r:e.cities||[]}),await bt()}async function Ra(){let t=await j();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let{from:e,to:n}=xn(),r=Sn(),o=document.querySelector(h(c.aiLogin))?.value?.trim(),i=document.querySelector(h(c.aiPass))?.value,a=[0,1,2].map(l=>({q:document.querySelector(h([c.aiQ1,c.aiQ2,c.aiQ3][l]))?.value?.trim()||"",a:document.querySelector(h([c.aiA1,c.aiA2,c.aiA3][l]))?.value?.trim()||""}));if(!o||!i){y("Enter ID and password before saving.");return}if(a.some(l=>!l.q||!l.a)){y("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}await ne(t,{}),y("Saved ID, password, and 3 security questions (1 from each set).")}function _n(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==c.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==c.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===c.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function ko(){document.querySelector(h(c.aiPanel))?.remove(),document.querySelector(h(c.aiBtn))?.remove(),_n()}function qa(){if(_())return;if(!mn()){ko();return}if(document.querySelector(h(c.aiBtn)))return;let t=nn();if(!t)return;let e=document.createElement("button");e.id=c.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[x.mark]="",s.on(e,"click",()=>{let r=document.querySelector(h(c.aiPanel)),o=r&&r.classList.contains(f.hidden);ao(!!o)}),t.appendChild(e);let n=document.createElement("div");n.id=c.aiPanel,n.className=f.hidden,n.dataset[x.mark]="",n.innerHTML=`
    <div class="${f.cardTtl}">Tik Tik (this account only)</div>
    <p class="${f.aiHint}">
      Two separate switches: <b>Auto Submit</b> books a matching date once;
      <b>City Change</b> checks slots in burst windows each hour (IST ${X}), switching preferred cities in checklist order every 13\u201318s.
    </p>
    <div class="${f.aiRow}">
      <label>From <input type="date" id="${c.aiFrom}" min="${to()}" /></label>
      <label>To <input type="date" id="${c.aiTo}" min="${to()}" /></label>
    </div>
    <div class="${f.aiHint}" style="margin-bottom:4px;font-weight:600;color:#334155">
      Preferred cities
      <button type="button" id="${c.aiCitiesAll}" class="${f.aiCityAct}">Select all</button>
      <button type="button" id="${c.aiCitiesNone}" class="${f.aiCityAct}">Clear</button>
    </div>
    <div id="${c.aiCities}" class="${f.aiCities}"></div>
    <div class="${f.aiHint}" style="margin:8px 0 4px;font-weight:600;color:#334155">Login (for PSE0501 recovery on Home tab)</div>
    <div class="${f.aiRow}">
      <label>ID / email <input type="email" id="${c.aiLogin}" autocomplete="off" /></label>
      <label>Password <input type="password" id="${c.aiPass}" autocomplete="off" /></label>
    </div>
    <div class="${f.aiHint}" style="margin:0 0 6px">
      3 sets \xD7 5 questions. Pick <b>1 question from each set</b>, then type <b>your answer</b> for that question.
      Login later asks any 2 of these 3.
    </div>
    <div class="${f.aiRow}" style="flex-direction:column;align-items:stretch">
      <label>Set 1 \u2014 choose 1 question
        <select id="${c.aiQ1}">${Me(0)}</select>
      </label>
      <label>Your answer for set 1
        <input type="text" id="${c.aiA1}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
      </label>
    </div>
    <div class="${f.aiRow}" style="flex-direction:column;align-items:stretch">
      <label>Set 2 \u2014 choose 1 question
        <select id="${c.aiQ2}">${Me(1)}</select>
      </label>
      <label>Your answer for set 2
        <input type="text" id="${c.aiA2}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
      </label>
    </div>
    <div class="${f.aiRow}" style="flex-direction:column;align-items:stretch">
      <label>Set 3 \u2014 choose 1 question
        <select id="${c.aiQ3}">${Me(2)}</select>
      </label>
      <label>Your answer for set 3
        <input type="text" id="${c.aiA3}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
      </label>
    </div>
    <div class="${f.aiRow}">
      <button type="button" id="${c.aiSaveLogin}">Save login details</button>
    </div>
    <div class="${f.aiRow}">
      <button type="button" id="${c.aiSubmitBtn}">Auto Submit: OFF</button>
      <button type="button" id="${c.aiCitiesBtn}">City Change: OFF</button>
      <button type="button" id="${c.aiClose}">Close</button>
    </div>
    <div id="${c.aiStatus}" class="${f.aiHint}"></div>
  `,t.insertAdjacentElement("afterend",n),s.on(n.querySelector(h(c.aiSubmitBtn)),"click",Pa),s.on(n.querySelector(h(c.aiCitiesBtn)),"click",Oa),s.on(n.querySelector(h(c.aiSaveLogin)),"click",Ra),s.on(n.querySelector(h(c.aiClose)),"click",()=>ao(!1)),s.on(n.querySelector(h(c.aiCitiesAll)),"click",()=>oo(!0)),s.on(n.querySelector(h(c.aiCitiesNone)),"click",()=>oo(!1)),s.on(n.querySelector(h(c.aiFrom)),"change",r=>{let o=n.querySelector(h(c.aiTo));o&&r.target.value&&(o.min=r.target.value)}),bt()}function Na(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",s.on(e,"click",()=>{zt(),j().then(n=>{n?uo(n):lo()})}))};t(document.querySelector("#submitbtn")),s.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function Cn(){if(s.alive&&!_()){if(!mn()){ko();return}await s.waitFor("#post_select",{attempts:Bt})&&(qa(),So(),Na(),!ro&&(ro=!0,s.setTimeout(()=>bt(),800),s.setTimeout(async()=>{await G()&&await yo()},1500)))}}var Ao=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function Eo(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function Ba(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=Eo(t.data.url),r=new URLSearchParams(t.data.request||"").get("parameters");if(!r)return null;let o;try{o=JSON.parse(r)}catch{return null}return{params:o,tail:e,response:t.data.response}}async function Ha(t,e={}){t?.length&&(await Nr(t,e),await w("audioAlert")&&Er())}async function Wa(t,e=!1){if(e||_())return null;let n=new Date;n.setHours(0,0,0,0);let r=(t||[]).map(a=>{if(!a)return null;let l=kn(a.Date);return l?{...a,Date:l}:null}).filter(Boolean).filter(a=>{let[l,d,u]=a.Date.slice(0,10).split("-").map(Number);return!l||!d||!u?!1:new Date(l,d-1,u)>=n}).sort((a,l)=>String(a.Date).localeCompare(String(l.Date))),o=await G();if(o){let a=r.filter(d=>se(d.Date,o.from,o.to));if(!a.length)return null;let l=oe(a.length);return a[l]?.Date||null}if(!await w("autoSelectFirstDate")||!r.length)return null;let i=oe(r.length);return r[i]?.Date||null}function kn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,i,a]=n;return`${a}-${String(o).padStart(2,"0")}-${String(i).padStart(2,"0")}`}let r=e.match(/\/Date\((-?\d+)\)\//);if(r){let o=new Date(Number(r[1]));if(!Number.isNaN(o.getTime())){let i=o.getFullYear(),a=String(o.getMonth()+1).padStart(2,"0"),l=String(o.getDate()).padStart(2,"0");return`${i}-${a}-${l}`}}return null}function Ua(t){if(!t)return!1;let[e,n,r]=t.slice(0,10).split("-").map(Number);if(!e||!n||!r)return!1;let o=n-1;for(let i of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let a=i.querySelector("a");if(!a)continue;let l=parseInt(i.getAttribute("data-month"),10),d=parseInt(i.getAttribute("data-year"),10),u=parseInt(a.textContent,10);if(d===e&&l===o&&u===r)return!0}return!1}var qe=null;function Fa(t,e){qe&&s.clear(qe);let n=Date.now()+(e?re:8e3),r=()=>{!s.alive||Date.now()>n||Ua(t)||(s.send({action:"selectFirstDate",date:t,maxMs:e?re:8e3,pollMs:R}),qe=s.setTimeout(r,R))};qe=s.setTimeout(r,80)}function Mo(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Ka(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function $o(t){return t?.length?t.map((e,n)=>({entry:e,index:n,avail:Ka(e)})).sort((e,n)=>n.avail!==e.avail?n.avail-e.avail:e.index-n.index):[]}function Ya(t){let e=$o(t);return e.length?{entry:e[0].entry,slotIndex:e[0].index}:{entry:null,slotIndex:0}}function Do(){wt&&(s.clear(wt),wt=null)}async function Va(t){let e=Date.now()+Math.max(0,Number(t)||0);for(;s.alive&&Date.now()<e;){if(ae()||_())return!1;if(L()&&Re())return!0;await new Promise(n=>s.setTimeout(n,R))}return!!(L()&&Re())}var Io=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),Lo=null,ja=null,wt=null;function Ga(t,e){Lo=t,ja=e?String(e).slice(0,10):null}function za(t,e=0){wt&&s.clear(wt);let n=t?String(t).slice(0,10):null,r=0,o=async()=>{if(!s.alive||ae()||++r>240||L())return;let i=(Lo||[]).filter(a=>a&&a.Time);if(i.length){let{entry:a,slotIndex:l}=Ya(i);if($(`Watchdog: picking time slot #${l+1}\u2026`),await jt({time:Mo(a.Time),date:a.Date?String(a.Date).slice(0,10):n,slotIndex:l,pollMs:R,maxMs:600,prefix:m}),L())return}else if(document.querySelector(Io)&&($("Watchdog: picking visible time slot\u2026"),await jt({time:"00:00",date:n,slotIndex:e,pollMs:R,maxMs:600,prefix:m}),L()))return;wt=s.setTimeout(o,R)};wt=s.setTimeout(o,300)}var Xa=["#datepicker.hasDatepicker","#datepicker .ui-datepicker","#ui-datepicker-div"].join(", ");async function Qa(t,e=!1){if(e)return null;let n=await Wa(t,e);if(!n)return null;let r=await G(),o=new Date;o.setHours(0,0,0,0);let i=(t||[]).map(d=>kn(d?.Date)).filter(Boolean).filter(d=>{let[u,p,g]=d.slice(0,10).split("-").map(Number);return new Date(u,p-1,g)>=o}).sort((d,u)=>d.localeCompare(u)),a=r?i.filter(d=>se(d,r.from,r.to)):i,l=oe(a.length);return $(`Selecting date #${l+1}: ${n}\u2026`),await s.waitFor(Xa,{attempts:120,interval:R}),s.send({action:"selectFirstDate",date:n,maxMs:r?re:8e3,pollMs:R}),Fa(n,r),za(n,Le),n}async function Za(t,e=!1){if(e||_()||ae())return;let n=await G();if(!n&&!await w("autoSelectFirstDate"))return;Do();let r=(t||[]).filter(l=>!(!l||!l.Time||l.EntriesAvailable!=null&&Number(l.EntriesAvailable)<=0));n&&(r=r.filter(l=>{let d=l.Date?String(l.Date).slice(0,10):null;return d?d>=n.from&&d<=n.to:!0}));let o=$o(r);if(!o.length)return;let i=Date.now()+1e4;for(;Date.now()<i&&s.alive&&!(Gr(r)||document.querySelector(Io));)await new Promise(l=>s.setTimeout(l,R));let a=o.length===1?Pe:so;$(o.length===1?`1 time slot \u2014 try highest avail, wait \u2264${a/1e3}s for Submit\u2026`:`${o.length} time slots \u2014 try highest\u21922nd\u21923rd\u2026 (${a/1e3}s each for Submit)`);for(let l=0;l<o.length;l++){if(!s.alive||ae()||_())return;let{entry:d,index:u,avail:p}=o[l],g=Mo(d.Time),b=d.Date?String(d.Date).slice(0,10):null,C=l===0?"highest":l===1?"2nd-highest":l===2?"3rd-highest":`${l+1}th-highest`;if($(`Trying ${C} avail (${p}) @ ${g} \u2014 slot ${l+1}/${o.length}\u2026`),!await jt({time:g,date:b,slotIndex:u,pollMs:R,maxMs:4e3,prefix:m})&&!L()){$(`Could not click ${g} \u2014 trying next\u2026`);continue}if($(`Selected ${g} (${C}) \u2014 waiting \u2264${a/1e3}s for Submit to enable\u2026`),await Va(a)){$(`Submit enabled on ${g} \u2014 clicking\u2026`),n?await Tn(n.accountId):vn();return}l<o.length-1&&$(`Submit still disabled on ${g} \u2014 trying next (${l+2}/${o.length})\u2026`)}$(`Tried all ${o.length} time slot(s); Submit never enabled.`),n&&at()}async function Po(t){if(!q()||_())return;let e;try{e=Ba(t)}catch{return}if(e==null)return;if(Zr(e),e.retryAfter!==void 0){let i=Number(e.retryAfter);dr(e.cgiBlock,i),i?(xe(i),yn(i)):w("defaultWaitTime").then(a=>{xe(a),yn(a)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let i=e.response.Posts||[],a=new Map((await tt()).map(l=>[l.ID,l]));for(let l of i)a.set(l.ID,{...a.get(l.ID),...l});await Tt([...a.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let i=e.response.Members||[];if(i.length){let a=await N()||{},l=a.name&&i.find(d=>d.FullName===a.name);a.visa=(l||i[0]).VisaClassName,await T({profile:a,members:i})}}if(Ao.includes(e.tail)){It(),$r(e),go();let i=await G();await ce()||w("defaultWaitTime").then(p=>{xe(p)});let l=await tt(),d=l.find(p=>p.ID===e.params.postId);d&&(d.Days=e.response.ScheduleDays,d.Updated=Date.now(),d.HasError=e.response.HasError,d.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,Tt(l)),await Ha(e.response.ScheduleDays,{postId:e.params.postId,postName:d?.Name,hasError:e.response.HasError}),await Br(e.response.ScheduleDays,{postId:e.params.postId,postName:d?.Name,hasError:e.response.HasError}),i&&!e.response.HasError?pn(e.response.ScheduleDays,i.from,i.to).length?Pt():at():i&&at();let u=await Qa(e.response.ScheduleDays,e.response.HasError);if(u)Pt(),await Hr(d?.Name,u);else if(i&&!e.response.HasError){let p=(e.response.ScheduleDays||[]).map(b=>kn(b?.Date)).filter(Boolean),g=p.filter(b=>se(b,i.from,i.to));p.length&&!g.length?(at(),$(`Dates found but none in ${i.from} \u2192 ${i.to}. Next city in 13\u201318s\u2026`)):p.length||(at(),$("No dates on this city \u2014 next city in 13\u201318s\u2026"))}await Ze()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let i=e.params.Date.split("T")[0];Ga(e.response.ScheduleEntries,i),Do();let a=await tt(),l=a.filter(u=>u.Days&&u.Updated).sort((u,p)=>p.Updated-u.Updated).find(u=>u.Days.some(p=>p.Date===i));if(l){let u=l.Days.find(p=>p.Date===i);u&&(u.Times=e.response.ScheduleEntries,Tt(a))}await Za(e.response.ScheduleEntries,e.response.HasError);let d=(e.response.ScheduleEntries||[]).filter(u=>u&&u.Time);d.length?(Pt(),await Wr(l?.Name,e.params.Date,d.length)):(at(),$("No time slots on this date \u2014 next city in 13\u201318s\u2026")),await Ze()}}function Oo(t){if(!q()||_())return;let e=Eo(t.data.url);Ao.includes(e)&&_r()}var St=null,En="",An={scanning:"Scanning for Cloudflare challenge\u2026",dom:"Trying page-level verify click\u2026",debugger:"Advanced click \u2014 targeting Turnstile iframe\u2026",retry:"Waiting before next attempt\u2026",success:"Verification passed \u2014 continuing\u2026",manual:"Stuck? Click the checkbox once, then we\u2019ll continue."};function Ro(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=f.cfFlash,n.dataset[x.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),s.setTimeout(()=>n.remove(),1200)}}function Ja(){let t=document.querySelector(h(c.cfHud));return t||(t=document.createElement("div"),t.id=c.cfHud,t.dataset[x.mark]="",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.innerHTML=`
    <div class="${f.cfHud}">
      <div class="${f.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">\u{1F6E1}</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${An.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `,document.documentElement.appendChild(t),t)}async function A(t,e){if(!chrome.runtime?.id||!s.alive||!await w("autoCloudflareTick"))return;let n=Ja(),r=n.querySelector("[data-cf-msg]"),o=n.querySelector("[data-cf-sub]"),i=n.querySelector("[data-cf-chip]"),a=n.querySelector(`.${f.cfHud}`);En=t,r&&(r.textContent=An[t]||An.scanning),o&&(o.textContent=e||ts(t)),i&&(i.textContent=t==="success"?"Done":t==="manual"?"Help":"Active",i.dataset.state=t),a&&(a.dataset.state=t),St&&(s.clear(St),St=null),t==="success"&&(St=s.setTimeout(()=>Mn(),2800))}function ts(t){return t==="debugger"?"Precision click via advanced browser bridge":t==="dom"?"Standard page interaction":t==="manual"?"One manual click is usually enough":t==="success"?"Resuming login and recovery":"Monitoring this tab for Turnstile"}function Mn(){let t=document.querySelector(h(c.cfHud));t&&t.remove(),En="",St&&(s.clear(St),St=null)}function $n(){return En}var es=/we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i,ns=/\bUSG\s+[a-f0-9-]{8,}/i;var In="vsPortalErrorReloadCount",Bo="vsPortalErrorReloadAt",rs=2e3,os=1e4,qo=!1,Ot=null,is=null;function as(){return(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim()}function Rt(){let t=as().slice(0,6e3);return t?!!(/a timeout occurred/i.test(t)&&(/error\s*524/i.test(t)||/origin web server timed out/i.test(t)||/cloudflare ray id/i.test(t))||/error\s*524/i.test(t)&&/cloudflare/i.test(t)&&t.length<8e3||es.test(t)&&(ns.test(t)||/error id\s*#/i.test(t))||/we'?re sorry,\s*but something went wrong/i.test(t)&&t.length<2500):!1}function Ho(){try{return Math.max(0,Number(sessionStorage.getItem(In)||0))}catch{return 0}}function ss(){try{let t=Ho()+1;return sessionStorage.setItem(In,String(t)),sessionStorage.setItem(Bo,String(Date.now())),t}catch{return 1}}function Dn(){try{sessionStorage.removeItem(In),sessionStorage.removeItem(Bo)}catch{}}function cs(t){return Math.min(os,rs+Math.max(0,t-1)*1e3)}function ls(){Ot&&(s.clear(Ot),Ot=null)}function us(){ss();try{location.reload()}catch{}}function No(){if(!s.alive||Ot)return;if(!Rt()){Dn();return}let t=Ho()+1,e=cs(t);Ot=s.setTimeout(()=>{if(Ot=null,!!s.alive){if(!Rt()){Dn();return}us()}},e)}function Wo(){if(qo)return;qo=!0;let t=()=>{s.alive&&(Rt()?No():(Dn(),ls()))};t(),is=s.setInterval(t,1500);try{let e=new MutationObserver(()=>{s.alive&&Rt()&&No()});e.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),s.disposable(()=>e.disconnect())}catch{}}var Be=null,de=0,ue=null,st=0;async function ds(){try{let e=(await S("humanClickProfile")).humanClickProfile,n=e?.liveTrained&&e.samples?.length||0;return n<5?15e3:n<20?1e4:n<50?6e3:3500}catch{return 12e3}}var Pn=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function K(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!D()&&!$n()}function D(){if(Rt()||document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return Pn.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:Ln().length>0}function Ne(t){return new Promise(e=>setTimeout(e,t))}function fs(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let r of n.querySelectorAll("*"))r.shadowRoot&&(t.push(r.shadowRoot),e.push(r.shadowRoot))}return t}function Ln(){let t=[],e=new Set,n=r=>{if(!r||e.has(r))return;let o=r.getBoundingClientRect();if(o.width<40||o.height<20||o.width>900||o.height>400)return;let i=(r.src||r.getAttribute?.("src")||"").toLowerCase(),a=(r.title||r.getAttribute?.("title")||"").toLowerCase(),l=(r.className?.toString?.()||"").toLowerCase(),d=(r.id||"").toLowerCase(),u=r.tagName==="IFRAME"&&(i.includes("challenges.cloudflare")||i.includes("turnstile")||a.includes("cloudflare")||a.includes("security challenge")),p=l.includes("cf-turnstile")||l.includes("turnstile")||d.includes("turnstile")||d.includes("challenge")||r.hasAttribute?.("data-sitekey")||r.hasAttribute?.("data-turnstile-widget");if(!u&&!p)if(r.tagName==="IFRAME"&&o.width>=120&&o.width<=420&&o.height>=45&&o.height<=120){if(!Pn.test(document.body?.innerText||""))return}else return;e.add(r),t.push({el:r,rect:o})};for(let r of fs()){for(let o of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let i of r.querySelectorAll(o))n(i);for(let o of r.querySelectorAll("iframe"))n(o)}return t}function ms(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function ps(t){let e=[],n=new Set,r=(o,i)=>{if(!Number.isFinite(o)||!Number.isFinite(i)||o<1||i<1||o>window.innerWidth-1||i>window.innerHeight-1)return;let a=`${Math.round(o)},${Math.round(i)}`;n.has(a)||(n.add(a),e.push({x:Math.round(o),y:Math.round(i)}))};for(let{rect:o}of t){let i=o.top+o.height/2,a=o.left+Math.min(28,Math.max(18,o.width*.11));for(let l of[0,-4,4,-8,8,12,16,20,24,28,32])for(let d of[0,-3,3,-6,6])r(a+l,i+d);r(o.left+o.width*.5,i)}return e}function hs(t){for(let{el:e,rect:n}of t)try{e.click();let r=n.left+Math.min(26,n.width*.12),o=n.top+n.height/2,i=document.elementFromPoint(r,o)||e;for(let a of["pointerdown","mousedown","mouseup","pointerup","click"])i.dispatchEvent(new MouseEvent(a,{bubbles:!0,cancelable:!0,clientX:r,clientY:o,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let r=n.getBoundingClientRect();if(r.width<4&&r.height<4)continue;let o=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!o.includes("human")&&!o.includes("verify")&&e==="input[type='checkbox']"){let i=n.closest("label, div, form");if(!Pn.test(i?.textContent||""))continue}return n.click(),!0}return!1}async function Uo(t){t.length&&(Ro(t.slice(0,3)),s.send({action:"viewportClickPoints",points:t}),await w("cloudflareDebuggerClick")?(await A("debugger","Trained click on Verify you are human\u2026"),s.send({action:"cloudflareDebuggerClick",points:t,primaryOnly:!0})):await A("dom"))}async function He(){if(!await w("autoCloudflareTick"))return!1;if(K())return st=0,await A("success"),!0;st||(st=Date.now());let t=await ds();if(Date.now()-st<t)return await A("scanning","Train window \u2014 click Verify you are human yourself (recording your mouse)\u2026"),!1;await A("scanning","Verify you are human page \u2014 preparing click\u2026");let e=Ln();ms(e),await Ne(350),e=Ln();let n=ps(e);return n.length&&(await Uo(n),await Ne(1200),K()||!D())?(st=0,await A("success"),!0):(await A("dom"),hs(e),await Ne(600),K()||!D()?(st=0,await A("success"),!0):n.length&&(await Uo(n),await Ne(1e3),K()||!D())?(st=0,await A("success"),!0):(de++,de>=8?await A("manual","Click the checkbox once \u2014 we will continue after."):await A("retry",`Retry ${de}/8\u2026`),!1))}function gs(){ue||(ue=new MutationObserver(()=>{s.alive&&D()&&!K()&&He()}),ue.observe(document.documentElement,{childList:!0,subtree:!0}),s.disposable(()=>{ue?.disconnect(),ue=null}))}function On(){Be&&(s.clear(Be),Be=null),de=0,st=0,Mn()}async function Rn(){if(On(),!await w("autoCloudflareTick"))return;gs();let t=async()=>{if(s.alive&&await w("autoCloudflareTick")){if(D()&&!K()){await He();return}$n()&&(de=0,await A("success"))}};t(),Be=s.setInterval(t,1800)}var ct="sessionRecovery",qn="homeKeepaliveAt",Nn="homeLoadingStuckAt",Fo=6e5,ys=6e5,bs=48e4,Ko=12e4,ws=9e4,Yo=2e3,Ue=!1,Vo=null,Bn=null,Hn=null,We=null,fe=0;function jo(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function Ss(t,e){let n=jo(t);if(!n)return"";let r="",o=0;for(let i of e||[]){let a=jo(i.q);if(!a||!i.a)continue;if(n.includes(a)||a.includes(n))return i.a;let l=a.split(" ").filter(p=>p.length>3),d=0;for(let p of l)n.includes(p)&&d++;let u=l.length?d/l.length:0;u>o&&u>=.5&&(o=u,r=i.a)}return r}async function xs(){let t=await S([rt,"profile"]),e=t[rt]||{},n=t.profile?.id?String(t.profile.id):null,r=n?e[n]:null;return r||(r=Object.values(e).find(o=>o?.loginId&&o?.loginPass)||null),r||{}}function Go(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,r=Object.getOwnPropertyDescriptor(n,"value")?.set;r?r.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function lt(t){return new Promise(e=>setTimeout(e,t))}function z(t,e){return t+Math.random()*(e-t)}async function Wn(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await lt(z(250,600)),Go(t,"");let r="";for(let o=0;o<n.length;o++){let i=n[o];r+=i,Go(t,r),t.dispatchEvent(new KeyboardEvent("keydown",{key:i,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:i,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:i,bubbles:!0}));let a=z(90,220);/[\s@._]/.test(i)&&(a+=z(120,320)),Math.random()<.08&&(a+=z(200,450)),await lt(a)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await lt(z(200,500))}var Fe=!1,Ke=!1;function Ye(t){return!t||t.disabled?!1:(t.click(),!0)}function vs(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let r of t){let o=(r.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(o))continue;let i=r.querySelector("input[type='checkbox']")||document.getElementById(r.getAttribute("for")||"");i&&!i.checked&&(Ye(i),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(r=>/^(continue|ok|accept|agree)$/i.test((r.textContent||r.value||"").trim()));return e&&n&&Ye(n),e>0}function Ts(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function _s(t){if(Fe)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;Fe=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await Wn(e,t.loginId),await lt(z(400,900))),n&&t.loginPass&&!n.value&&(await Wn(n,t.loginPass),await lt(z(500,1100)));let r=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(o=>/sign in|log in|continue/i.test(o.textContent||o.value||""));return r&&(n?.value||t.loginPass)?(await lt(z(600,1400)),Ye(r),!0):!!(e||n)}finally{Fe=!1}}async function Cs(t){if(Ke)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let o of n){let i=(o.textContent||"").trim();if(i.length<12||i.length>220||!/\?/.test(i)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(i))continue;let a=o.querySelector("input[type='text']")||document.getElementById(o.getAttribute("for")||"")||o.parentElement?.querySelector("input[type='text']");a&&a.offsetParent!==null&&e.push({text:i,input:a})}for(let o of["kba1_response","kba2_response","kba3_response"]){let i=document.getElementById(o);if(!i)continue;let l=(i.closest(".form-group, .entry, li, div")||i.parentElement)?.textContent||"";e.some(d=>d.input===i)||e.push({text:l,input:i})}let r=[];for(let{text:o,input:i}of e){if(i.value)continue;let a=Ss(o,t.security);a&&r.push({input:i,ans:a})}if(!r.length)return!1;Ke=!0;try{for(let{input:i,ans:a}of r)await Wn(i,a),await lt(z(350,800));await lt(z(600,1400));let o=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(i=>/continue|submit|verify/i.test(i.textContent||i.value||""));return o&&Ye(o),!0}finally{Ke=!1}}function ks(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||D()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function ut(){return it()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function As(t=""){return/\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(t||""))}function Un(){if(ut()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||D()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}async function Es(){let t=(await S(ct))[ct];if(!t?.active)return;let e=await xs();if(D()){await He();return}if(vs(),!await Cs(e)){if(Ts()){await _s(e);return}ks()&&(await T({[ct]:{...t,active:!1,doneAt:Date.now()}}),s.send({action:"recoveryReturnToOfc"}))}}function zo(){if(!Un()||Vo)return;let t=async()=>{!s.alive||!(await S(ct))[ct]?.active||await Es()};t(),Vo=s.setInterval(t,1200)}function Xo(){return Fo+Math.random()*(ys-Fo)}async function Qo(){try{let t=await S(qn),e=Number(t[qn])||0;return Date.now()-e<bs?!1:(await T({[qn]:Date.now()}),!0)}catch{return!0}}function Zo(){if(ut()||!Un()||document.querySelector("#post_select")||Bn)return;let t=()=>{s.alive&&(Bn=s.setTimeout(async()=>{if(Bn=null,!s.alive||ut()||As(location.href)||document.querySelector("#post_select")||!Un())return;if(Fe||Ke||Ue){t();return}if((await S(ct))[ct]?.active){t();return}if(!await Qo()){t();return}try{location.reload()}catch{t()}},Xo()))};t()}function Jo(){if(!ut()||Hn)return;let t=()=>{s.alive&&(Hn=s.setTimeout(async()=>{if(Hn=null,!(!s.alive||!ut())){if(await Qo())try{s.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}t()}},Xo()))};t()}async function Ms(){try{let t=await S(Nn),e=Number(t[Nn])||0;return Date.now()-e<ws?!1:(await T({[Nn]:Date.now()}),!0)}catch{return!0}}function ti(){if(!ut()||We)return;let t=async()=>{if(We=null,!(!s.alive||!ut())){try{if(gn()){if(fe||(fe=Date.now()),Date.now()-fe>=Ko){if(await Ms()){try{$(`Date Loading stuck \u2265${Ko/1e3}s \u2014 reloading Application Home\u2026`)}catch{}try{s.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}}fe=Date.now()}}else fe=0}catch{}s.alive&&ut()&&(We=s.setTimeout(t,Yo))}};We=s.setTimeout(t,Yo)}async function ei(t){if(!/PSE0501|unable to load appointment available days/i.test(String(t||""))||Ue)return;Ue=!0,s.setTimeout(()=>{Ue=!1},8e3);let e=await j();await T({[ct]:{active:!0,ofcUrl:location.href,accountId:e,startedAt:Date.now()}}),s.send({action:"recoveryStart",ofcUrl:location.href})}var Kn="humanClickProfile",Yn=150,si=120,$s=400,ni=!1,dt=[],Ve=0,xt=0,Nt=0,v=null,ri=0,me=!1,qt=null,je=0;function Ds(){let t=[];for(let e of document.querySelectorAll('iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]')){let n=e.getBoundingClientRect();n.width<40||n.height<20||n.width>900||n.height>400||t.push(n)}if(!t.length&&D())for(let e of document.querySelectorAll("iframe")){let n=e.getBoundingClientRect();n.width>=120&&n.width<=420&&n.height>=45&&n.height<=120&&t.push(n)}return t}function pe(){let t=Ds();if(!t.length)return null;let e=t[0];return{x:e.left+Math.min(28,Math.max(18,e.width*.11)),y:e.top+e.height/2,w:e.width,h:e.height,left:e.left,top:e.top}}function Vn(t,e,n){return n?t>=n.left-40&&t<=n.left+n.w+40&&e>=n.top-30&&e<=n.top+n.h+30:!1}function ci(t){let e=performance.now();Ve||(Ve=e);let n=v,r=n?(t.clientX-n.x)/Math.max(24,n.w*.12):0,o=n?(t.clientY-n.y)/Math.max(20,n.h*.5):0;dt.push({nx:Math.round(r*1e3)/1e3,ny:Math.round(o*1e3)/1e3,x:Math.round(t.clientX),y:Math.round(t.clientY),t:Math.round(e-Ve)}),dt.length>si&&dt.shift()}async function li(){return(await S(Kn))[Kn]||{version:2,maxSamples:Yn,samples:[],avgHoverMs:420,avgPressMs:70,avgApproachMs:800,liveTrained:!1}}function Fn(t,e,n){if(!t.length)return n;let r=t.reduce((o,i)=>o+(Number(i[e])||0),0);return Math.round(r/t.length)}async function Is(t){let e=Date.now();if(e-ri<$s)return null;ri=e;let n=await li(),r=Array.isArray(n.samples)?n.samples.slice():[];for(r.push(t);r.length>Yn;)r.shift();let o={version:2,maxSamples:Yn,samples:r,avgHoverMs:Fn(r,"hoverMs",420),avgPressMs:Fn(r,"pressMs",70),avgApproachMs:Fn(r,"approachMs",800),updatedAt:e,liveTrained:!0,source:"visa-page-live"};return await T({[Kn]:o}),je=r.length,Ls(t,o).catch(()=>{}),o}async function Ls(t,e){try{if(!await w("serverSync"))return;let n=await N()||{},o={client_id:`hc-${t.at||Date.now()}-${Math.random().toString(36).slice(2,8)}`,profile:{id:n.id||"",email:n.email||"",name:n.name||"",visa:n.visa||""},sample:t,profile_meta:{sampleCount:e?.samples?.length||0,avgHoverMs:e?.avgHoverMs,avgPressMs:e?.avgPressMs,avgApproachMs:e?.avgApproachMs,liveTrained:!0,source:"visa-page-live",extensionHost:location.host}};s.send({action:"uploadHumanClickSample",payload:o})}catch{}}function Ge(){dt=[],Ve=0,xt=0,Nt=0,qt=null}function jn(){me||(me=!0,Ge(),v=pe())}function ui(){me=!1,v=null,Ge()}async function oi(t){if(s.alive){if(!D()||K()){me&&ui();return}jn(),v||(v=pe()),!Nt&&v&&Vn(t.clientX,t.clientY,v)&&(Nt=performance.now()),ci(t)}}async function ii(t){if(!(!s.alive||t.button!==0)&&!(!D()||K())){jn(),v=pe(),xt=performance.now(),Nt||(Nt=xt),qt={x:t.clientX,y:t.clientY},ci(t);try{A("scanning",`Recording click\u2026 (saved ${je} so far)`)}catch{}}}async function ai(t){if(!s.alive||t.button!==0||!xt)return;if(!D()&&!K()){Ge();return}let e=performance.now(),n=Math.max(25,Math.min(500,e-xt)),r=Math.max(30,Math.min(3e3,xt-(Nt||xt))),o=dt.length?dt[dt.length-1].t:r,i=Math.max(r,Math.min(12e3,o||r)),a=dt.slice(-si),l=v&&Vn(t.clientX,t.clientY,v)||v&&qt&&Vn(qt.x,qt.y,v)||!v&&a.length>=2,d=qt;if(Ge(),!l&&a.length<2||a.length<1&&!l)return;let u={hoverMs:Math.round(r),pressMs:Math.round(n),approachMs:Math.round(i),path:a,down:d?{x:Math.round(d.x),y:Math.round(d.y)}:null,up:{x:Math.round(t.clientX),y:Math.round(t.clientY)},target:v?{x:Math.round(v.x),y:Math.round(v.y),w:Math.round(v.w),h:Math.round(v.h),left:Math.round(v.left),top:Math.round(v.top)}:null,viewport:{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio||1,scrollX:Math.round(window.scrollX||0),scrollY:Math.round(window.scrollY||0)},pointerType:t.pointerType||"mouse",url:location.pathname+location.search,at:Date.now()};if(!u.target){let b=pe();b&&(u.target={x:Math.round(b.x),y:Math.round(b.y),w:Math.round(b.w),h:Math.round(b.h),left:Math.round(b.left),top:Math.round(b.top)})}let p=await Is(u);if(!p)return;let g=p.samples?.length||0;try{A("success",`Saved verify-human click #${g} \u2014 keep clicking naturally when it appears`)}catch{}}async function Ps(){try{let t=await li(),e=t.liveTrained&&t.samples?.length||0;return je=e,e}catch{return je}}function di(){if(ni)return;ni=!0,s.on(window,"pointermove",oi,{passive:!0,capture:!0}),s.on(window,"pointerdown",ii,{passive:!0,capture:!0}),s.on(window,"pointerup",ai,{passive:!0,capture:!0}),s.on(window,"mousemove",oi,{passive:!0,capture:!0}),s.on(window,"mousedown",ii,{passive:!0,capture:!0}),s.on(window,"mouseup",ai,{passive:!0,capture:!0});let t=async()=>{if(!s.alive)return;if(!D()||K()){me&&ui();return}jn(),v||(v=pe());let e=await Ps();try{A("scanning",e?`Train mode \u2014 click Verify you are human naturally (saved ${e})`:"Train mode \u2014 move mouse naturally, then click Verify you are human (recording\u2026)")}catch{}};t(),s.setInterval(t,2500)}var Os=`
#${c.selRow} {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 11em;
  gap: 0.5em;
  width: max-content;
  max-width: 100%;
  margin: 0.25em auto 0;
  align-items: center;
}
#${c.waitTime} {
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
#${c.waitTime}[data-dragging] {
  cursor: grabbing;
  transition: none;
}
#${c.waitTime}[data-dodging] {
  box-shadow: 0 0 0 2px #22c55e, 0 2px 12px rgba(0,0,0,0.35);
}
#${c.recheck} {
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

#${c.waitTime} .${f.pill} {
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  white-space: nowrap;
}

#${c.waitTime} .${f.pillTtl} {
  flex: 1;
  min-width: 0;
  padding: 0.35em 0.5em;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}

#${c.waitTime} .${f.pillTmr} {
  display: flex;
  align-items: center;
  padding: 0.35em 0.55em;
  border-radius: 5px 0 0 5px;
  background: rgba(255, 255, 255, 0.25);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-variant-numeric: tabular-nums;
}

#${c.waitTime} .${f.pillWait} { background-color: rgba(255, 0, 0, 0.35); color: #5c0000; }
#${c.waitTime} .${f.pillDone} { background-color: #1a4480; color: white; }

#atlas-sidebar .${f.sideLink} { background-color: #1a4480; color: white; }
#${c.datesPara} { margin: 0.5em 0; }

#${c.datesCont} .${f.datesLnk} { color: white; }
#${c.ofcDate} { font-weight: bold; }

.${f.card} {
  max-width: 400px;
  width: 100%;
  text-align: center;
  font-family: inherit;
}
#${c.histCont} { margin: 15px auto 0; }
#${c.cdCard} {
  margin: 20px auto 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 20px;
  box-sizing: border-box;
}

#${c.histCont} .${f.cardTtl} {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
}
#${c.histCont} .${f.histScrl} {
  max-height: 250px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #ffffff;
}
#${c.histTbl} {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  color: #2d3748;
}
#${c.histTbl} thead tr {
  border-bottom: 1px solid #e2e8f0;
  background: #edf2f7;
  position: sticky;
  top: 0;
}
#${c.histTbl} th {
  padding: 6px 10px;
  text-align: center;
  font-weight: 600;
  color: #4a5568;
}
#${c.histTbl} tbody tr { border-bottom: 1px solid #e2e8f0; }
#${c.histTbl} td {
  padding: 6px 10px;
  text-align: center;
  color: #718096;
}

#${c.histTbl} td.${f.dltDn} { color: #10b981; font-weight: 500; }
#${c.histTbl} td.${f.dltUp} { color: #ef4444; font-weight: 500; }

#${c.cdCard} .${f.cardTtl} {
  margin: 0 0 12px 0;
  font-size: 12px;
  font-weight: 700;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
#${c.cdTime} {
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin: 10px 0 15px;
  font-family: monospace, inherit;
}

#${c.cdTime}.${f.cdDiv}-over { font-size: 20px; }
.${f.cdDiv} {
  border-top: 1px solid #edf2f7;
  margin-top: 15px;
  padding-top: 12px;
}

.${f.footer} { font-size: 11px; }
#${c.histCont} .${f.footer} { margin-top: 8px; }
#${c.cdCard} .${f.footer} { margin: 0; }

#${c.histCont} .${f.footer} a,
#${c.cdCard} .${f.footer} a {
  color: #1a4480;
  text-decoration: none;
  font-weight: 500;
}

.${f.hidden} { display: none; }

#${c.aiBtn} {
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
#${c.aiBtn}.${f.aiOn} {
  background-color: #15803d;
  box-shadow: 0 0 0 2px #86efac;
}
#${c.aiPanel} {
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
#${c.aiPanel} .${f.cardTtl} {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 700;
  color: #0f766e;
}
#${c.aiPanel} .${f.aiHint} {
  margin: 0 0 10px;
  font-size: 12px;
  line-height: 1.45;
  color: #475569;
}
#${c.aiPanel} .${f.aiRow} {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 10px;
}
#${c.aiPanel} label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #334155;
}
#${c.aiPanel} input[type="date"] {
  padding: 4px 6px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 13px;
}
#${c.aiPanel} button {
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
#${c.aiConfirm} { background: #15803d; color: #fff; }
#${c.aiCancel} { background: #64748b; color: #fff; }
#${c.aiClose} { background: #e2e8f0; color: #334155; }
#${c.aiSubmitBtn}, #${c.aiCitiesBtn} {
  min-width: 140px;
  font-weight: 600;
}
#${c.aiSubmitBtn} { background: #64748b; color: #fff; }
#${c.aiCitiesBtn} { background: #64748b; color: #fff; }
#${c.aiSubmitBtn}.${f.aiOnBtn} { background: #15803d; }
#${c.aiCitiesBtn}.${f.aiOnBtn} { background: #0f766e; }
#${c.aiStatus} { margin: 0; }
#${c.aiPanel} .${f.aiCities} {
  max-height: 220px;
  overflow: auto;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 6px 8px;
  margin-bottom: 10px;
  background: #f8fafc;
}
#${c.aiPanel} .${f.aiCityAct} {
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
#${c.aiPanel} .${f.aiCityAct}:hover {
  color: #1d4ed8;
}
#${c.aiPanel} .${f.aiCities} label {
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  margin: 4px 0;
}
#${c.aiPanel} .${f.aiCities} input[type="checkbox"] {
  margin: 0;
}
#${c.aiPanel} input[type="text"],
#${c.aiPanel} input[type="password"],
#${c.aiPanel} input[type="email"],
#${c.aiPanel} select {
  padding: 4px 6px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 13px;
  width: 100%;
  box-sizing: border-box;
}
#${c.aiPanel} .${f.aiRow} label { flex: 1; min-width: 140px; }
#${c.aiSaveLogin} { background: #334155; color: #fff; }

#${c.cfHud} {
  position: fixed;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2147483646;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
#${c.cfHud} .${f.cfHud} {
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
#${c.cfHud} .${f.cfHud}[data-state="success"] {
  border-color: rgba(34, 197, 94, 0.45);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 24px rgba(34, 197, 94, 0.15);
}
#${c.cfHud} .${f.cfHud}[data-state="manual"] {
  border-color: rgba(251, 191, 36, 0.45);
}
#${c.cfHud} .${f.cfHud}[data-state="debugger"] {
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.32), 0 0 28px rgba(59, 130, 246, 0.18);
}
#${c.cfHud} .${f.cfPulse} {
  width: 10px;
  height: 10px;
  margin-top: 5px;
  border-radius: 50%;
  background: #60a5fa;
  box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.55);
  animation: ${m}cfpulse 1.6s ease-out infinite;
  flex-shrink: 0;
}
#${c.cfHud} .${f.cfHud}[data-state="success"] .${f.cfPulse} {
  background: #4ade80;
  animation: none;
  box-shadow: 0 0 12px rgba(74, 222, 128, 0.65);
}
#${c.cfHud} .${f.cfHud}[data-state="manual"] .${f.cfPulse} {
  background: #fbbf24;
}
@keyframes ${m}cfpulse {
  0% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.55); }
  70% { box-shadow: 0 0 0 10px rgba(96, 165, 250, 0); }
  100% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0); }
}
#${c.cfHud} .cf-hud-body { flex: 1; min-width: 0; }
#${c.cfHud} .cf-hud-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
#${c.cfHud} .cf-hud-icon { font-size: 14px; line-height: 1; }
#${c.cfHud} .cf-hud-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #f8fafc;
}
#${c.cfHud} .cf-hud-chip {
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
#${c.cfHud} .cf-hud-chip[data-state="success"] {
  background: rgba(34, 197, 94, 0.18);
  color: #86efac;
  border-color: rgba(74, 222, 128, 0.35);
}
#${c.cfHud} .cf-hud-chip[data-state="manual"] {
  background: rgba(251, 191, 36, 0.15);
  color: #fcd34d;
  border-color: rgba(251, 191, 36, 0.35);
}
#${c.cfHud} .cf-hud-msg {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.35;
  color: #f1f5f9;
}
#${c.cfHud} .cf-hud-sub {
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
  animation: ${m}cfring 1.1s ease-out forwards;
}
@keyframes ${m}cfring {
  0% { transform: scale(0.6); opacity: 1; }
  100% { transform: scale(2.2); opacity: 0; }
}
`;function fi(){if(document.querySelector(h(c.styles)))return;let t=document.createElement("style");t.id=c.styles,t.dataset[x.mark]="",t.textContent=Os,(document.head||document.documentElement).appendChild(t)}sr();_n();zn(()=>{_o(),s.destroy()});Wo();if(!_()){s.disposable(()=>{let r=document.querySelector(h(c.anchor)),o=document.querySelector("#post_select");r&&o&&r.replaceWith(o);for(let i of document.querySelectorAll("[data-"+x.mark+"]"))i.remove()}),fi(),s.send({action:"registerBlockGuard",prefix:m}),s.send({action:"registerRedirect",prefix:m}),s.send({action:"registerAlertGuard",prefix:m}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&s.send({action:"registerOfcReader",prefix:m}),s.on(window,"message",r=>{if(s.alive&&r.source===window)switch(r.data?.action){case et.req:return Oo(r);case et.res:return Po(r);case et.ofc:return Ir(r);case et.err:return Xt("native_alert",r.data?.text),ei(r.data?.text);case et.sub:Mr(),zt(),Ur();return}}),chrome.storage.onChanged.addListener((r,o)=>{o==="local"&&(r.profile&&sn(),r.waitPillClock&&kr(r.waitPillClock.newValue),r.autoCloudflareTick&&(r.autoCloudflareTick.newValue?Rn():On()))}),s.on(document,"click",r=>{Mt();let o=r.target.closest(h(c.waitTime));if(o){if(o.dataset.skipClick){delete o.dataset.skipClick;return}Cr()}}),s.on(document,"keydown",Mt),s.on(window,"focus",Mt),s.on(document,"visibilitychange",()=>{document.hidden||Mt()}),zo(),Zo(),Jo(),ti(),di(),Rn();async function t(){!s.alive||_()||!it()||document.querySelector("#post_select")&&(It(),await Promise.all([rn(),an(),Cn()]),jr({slotIndex:Le,shouldPick:async()=>await G()?!0:!!await w("autoSelectFirstDate"),onSlotPicked:()=>Co()}))}async function e(){!s.alive||_()||!it()||await vo()}async function n(){ur(),fr(),await Promise.all([sn(),pr(),mr(),rn(),an(),Cn()]),Je()}document.readyState==="complete"?n():s.on(window,"load",n),s.setInterval(t,2500),s.setInterval(e,3e4),e()}})();
