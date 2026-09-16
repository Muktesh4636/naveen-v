(()=>{function q(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function S(t){return q()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,r]of Object.entries(t))e[n]=r;return e}):Promise.resolve(typeof t=="string"?{}:t)}function T(t){return q()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function Fn(t){return q()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function Un(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",r=>{String(r.reason?.message||r.reason||"").includes("Extension context invalidated")&&(r.preventDefault(),e())});let n=setInterval(()=>{q()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var Kn="https://the.gopg.online",Ye=`${Kn}/contribute`,Yn=`${Kn}/contribute/telegram`;var Vn=20,jn=4320*60*1e3,pe=100,zn=4,Ot=100,Gn=240,Xn=50,Qn=1440*60*1e3,si={recheckButton:!0,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function w(t){return S({[t]:si[t]}).then(e=>e[t])}function J(){return S({posts:[]}).then(t=>t.posts)}function xt(t){return T({posts:t})}function W(){return S("profile").then(t=>t.profile)}var dt=t=>String(t).padStart(2,"0");function Nt(t){let e=dt(t%60),n=Math.floor(t/60)%60,r=Math.floor(t/3600);return r?`${dt(r)}:${dt(n)}:${e}`:`${dt(n)}:${e}`}function Zn(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${dt(n.getUTCHours())}:${dt(n.getUTCMinutes())}:${dt(n.getUTCSeconds())}`}}function Ve(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),r=t%60,o=[];return e>0&&o.push(`${e}d`),(n>0||e>0)&&o.push(`${n}h`),o.push(`${r}m`),o.join(" ")}function Jn(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),r=o=>n.find(i=>i.type===o)?.value??"";return`${r("month")} ${r("day")} ${r("year")} ${r("hour")}:${r("minute")} ${r("dayPeriod")}`}function tr(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),r=parseInt(e[2],10),o=parseInt(e[3],10),i=e[4];i&&(i.toUpperCase()==="PM"&&n<12&&(n+=12),i.toUpperCase()==="AM"&&n===12&&(n=0));let a=new Date;return a.setHours(n,r,o,0),a.getTime()>Date.now()+6e4&&a.setDate(a.getDate()-1),a}var er=Symbol(),ci=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&q()}on(t,e,n,r){t.addEventListener(e,n,{...r,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!q())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=zn,interval:n=pe}={}){return new Promise(r=>{let o=i=>{if(!this.alive)return;let a=document.querySelector(t);if(a)return r(a);if(i>=e)return r(null);this.setTimeout(()=>o(i+1),n)};o(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},c=new ci;function nr(){let t=globalThis[er];Object.defineProperty(globalThis,er,{value:c,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var he=new Uint32Array(2);crypto.getRandomValues(he);var rr="abcdefghjkmnpqrstuvwxyz",li=(he[0].toString(36)+he[1].toString(36)).replace(/[^a-z0-9]/g,""),m=(rr[he[0]%rr.length]+li).slice(0,8).padEnd(8,"x");function h(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var s={selRow:m+"01",anchor:m+"02",waitTime:m+"03",recheck:m+"04",histCont:m+"05",histTbl:m+"06",cdCard:m+"07",cdTime:m+"08",ofcDate:m+"09",styles:m+"10",datesCont:m+"11",datesPara:m+"12",aiBtn:m+"13",aiPanel:m+"14",aiFrom:m+"15",aiTo:m+"16",aiStatus:m+"17",aiConfirm:m+"18",aiCancel:m+"19",aiClose:m+"20",aiCities:m+"21",aiSubmitBtn:m+"22",aiCitiesBtn:m+"23",aiLogin:m+"24",aiPass:m+"25",aiQ1:m+"26",aiA1:m+"27",aiQ2:m+"28",aiA2:m+"29",aiQ3:m+"30",aiA3:m+"31",aiSaveLogin:m+"32",cfHud:m+"33",aiCitiesAll:m+"34",aiCitiesNone:m+"35"},d={pill:m+"a",pillTtl:m+"b",pillTmr:m+"c",pillWait:m+"d",pillDone:m+"e",footer:m+"f",card:m+"g",cardTtl:m+"h",histScrl:m+"i",dltDn:m+"j",dltUp:m+"k",cdDiv:m+"l",hidden:m+"m",sideLink:m+"n",datesLnk:m+"o",aiOn:m+"p",aiRow:m+"q",aiHint:m+"r",aiCities:m+"s",aiOnBtn:m+"t",aiCityAct:m+"x",cfHud:m+"u",cfPulse:m+"v",cfFlash:m+"w"},x={mark:m,w:m+"w",mw:m+"mw"},tt={req:m+"q",res:m+"r",ofc:m+"o",err:m+"e",sub:m+"s"};function vt(t){return t.map(e=>String.fromCharCode(e)).join("")}function ui(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function or(){let t=document.createElement("div");return t.className=d.footer,t.textContent=vt([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function di(t){let e=document.getElementById(s.histCont);e&&e.remove(),e=document.createElement("div"),e.id=s.histCont,e.className=d.card,e.dataset[x.mark]="";let n=document.createElement("h4");n.className=d.cardTtl,n.textContent=vt([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let r=document.createElement("div");r.className=d.histScrl;let o=document.createElement("table");o.id=s.histTbl;let i=document.createElement("thead"),a=document.createElement("tr");for(let u of["Time","Est. Wait","Change"]){let p=document.createElement("th");p.textContent=u,a.appendChild(p)}i.appendChild(a),o.appendChild(i);let l=document.createElement("tbody");for(let u=t.length-1;u>=0;u--){let p=t[u],g="--",b="";if(u>0){let D=p.minutes-t[u-1].minutes;D<0?(g=`${D}m`,b=d.dltDn):D>0?(g=`+${D}m`,b=d.dltUp):g="0m"}let A=document.createElement("tr"),H=[[p.timeStr,""],[Ve(p.minutes),""],[g,b]];for(let[D,ut]of H){let St=document.createElement("td");ut&&(St.className=ut),St.textContent=D,A.appendChild(St)}l.appendChild(A)}o.appendChild(l),r.appendChild(o),e.appendChild(r),e.appendChild(or());let f=document.getElementById("last-updated");f&&(f.closest("div, p, section")||f.parentElement).insertAdjacentElement("afterend",e)}function fi(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function ir(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),r=fi();if(r!==null&&r>Gn&&!e.textContent.includes("(")){let a=Ve(r);e.textContent=`${e.textContent} (${r} minutes / ${a})`}let o=n.textContent.trim().split(" (")[0],i=tr(o);if(i&&c.setInterval(()=>{let a=Math.floor((Date.now()-i)/1e3);a>=0&&(n.textContent=`${o} (${a}s ago)`)},1e3),r!==null){let a=ui(),l=sessionStorage.getItem(a);l||(l=Math.random().toString(36).substring(2,11),sessionStorage.setItem(a,l)),S({queueHistory:{}}).then(f=>{let u=f.queueHistory||{},p=Date.now(),g={};for(let[D,ut]of Object.entries(u)){if(!Array.isArray(ut))continue;let St=ut[ut.length-1];St&&p-St.timestamp<Qn&&(g[D]=ut)}let b=g[l]||[],A=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),H=b[b.length-1];(!H||H.minutes!==r||H.timeStr!==A)&&(b.push({timestamp:p,timeStr:A,minutes:r}),b.length>Xn&&b.shift(),g[l]=b,T({queueHistory:g})),di(b)})}}function ar(t,e){let n=document.getElementById("error_row");if(!n)return;let r;t?r=e?`Blocked for 24 hours, about ${Nt(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":r="Temporarily blocked. Log in in a new tab, then press Recheck.";let o=document.createElement("div");o.className="atlas_validationalert alert alert-danger warning",o.dataset[x.mark]="",o.textContent=r,n.replaceChildren(o),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function sr(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&S({cfRetryAfter:null}).then(n=>{let r=parseInt(n.cfRetryAfter,10);if(!isNaN(r)){Fn("cfRetryAfter");let o=document.getElementById("what-happened-section");if(o){let i=document.createElement("div");i.id=s.cdCard,i.className=d.card,i.dataset[x.mark]="";let a=document.createElement("h4");a.className=d.cardTtl,a.textContent=vt([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),i.appendChild(a);let l=document.createElement("div");l.id=s.cdTime,i.appendChild(l);let f=document.createElement("div");f.className=d.cdDiv,i.appendChild(f),i.appendChild(or()),o.appendChild(i);let u=r,p=null,g=()=>{u>0?(l.textContent=Nt(u),u--):(l.classList.add(d.cdDiv+"-over"),l.textContent="You can try refreshing now!",p!=null&&c.clear(p))};g(),p=c.setInterval(g,1e3)}}})}async function cr(){let t=document.querySelector(".username");if(!t)return;let e=t.innerText.match(/(.*)\((\d*)\)/);if(!e)return;let[,n,r]=e,o=await W()||{},i=!o.id||o.id===r?o:{};i.name=n.trim(),i.id=r;let a=document.querySelectorAll("script");for(let l of a){let f=l.innerText.trim();if(f.includes("setAuthenticatedUserContext")){let u=/setAuthenticatedUserContext\('([^']*)'\)/,p=f.match(u);p&&(i.email=p[1])}}await T({profile:i})}async function lr(){let t=document.querySelector("#post_select");if(!t)return;let e=await J();for(let n of t.options){if(!n.value)continue;e.findIndex(o=>o.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await xt(e)}var mi=["visa-information","fee-payment","appointment-confirmation"];function pi(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(r=>{let o=r.querySelector(".text-bold");if(!o)return;let i=hi(o.textContent);if(!mi.includes(i))return;let a=gi(r);a&&(n[i]=a)}),Object.keys(n).length?n:null}function hi(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function gi(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function ur(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>jn)return null}catch{}return t.value}function yi(t){let e=(t.posts||[]).filter(o=>o.Updated).sort((o,i)=>o.Updated-i.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},r=ur(t.cgiIdToken);return r&&(n.token=r),n}async function je(){if(!q()||!await w("serverSync"))return;let t=await S(["profile","posts","cgiIdToken"]),e=yi(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await fetch(Ye,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(o=>o.json());if(!n.success)return;let r="0";n.contribs>0&&(r=n.contribs.toString()),n.contribs>10&&(r="10+"),n.contribs>0&&await T({contribs:{email:t.profile?.email,updated:Date.now(),count:r}})}catch{}}function ze(t=0){q()&&document.querySelector("#appointment-card")&&w("serverSync").then(e=>{if(!e)return;let n=pi();if(!n){t<Vn&&c.setTimeout(()=>ze(t+1),pe);return}S(["profile","cgiIdToken","savedDashboard"]).then(r=>{let o=ur(r.cgiIdToken);o&&JSON.stringify(n)!==JSON.stringify(r.savedDashboard)&&fetch(Ye,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:r.profile,dashboard:n,token:o})}).then(i=>i.json()).then(i=>{i.success&&T({savedDashboard:n})}).catch(()=>{})})})}var bi=[{slot:3,fromMin:0,toMin:2},{slot:1,fromMin:14,toMin:21},{slot:2,fromMin:24,toMin:31},{slot:3,fromMin:54,toMin:59}],wi=[0,14,24,54],et=":14\u2013:21, :24\u2013:31, :54\u2013:02";function dr(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=r=>Number(e.find(o=>o.type===r)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function ft(t=new Date){let{minute:e}=dr(t);for(let n of bi)if(e>=n.fromMin&&e<=n.toMin)return n.slot;return 0}function Tt(t=new Date){if(ft(t))return 0;let{minute:e,second:n}=dr(t),r=e*60+n;for(let o of wi){let i=o*60;if(r<i)return(i-r)*1e3}return 0}function Bt(t){return t<9e4?`${Math.ceil(t/1e3)}s`:`${Math.ceil(t/6e4)}m`}function Qe(){let t=document.querySelector(h(s.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=s.selRow,t.dataset[x.mark]="",n.insertAdjacentElement("afterend",t);let r=document.createElement("span");return r.id=s.anchor,r.dataset[x.mark]="",r.dataset[x.w]=e.style.width,r.dataset[x.mw]=e.style.minWidth,r.hidden=!0,e.insertAdjacentElement("beforebegin",r),c.setStyle(e,"width","100%"),c.setStyle(e,"minWidth","0"),t.appendChild(e),t}var Ht="waitPillState",Si=3600*1e3,fr=d.pillWait,xi=d.pillDone;function vi(t,e){let n=document.createElement("span");n.className=`${d.pill} ${e}`;let r=(o,i)=>{let a=document.createElement("span");a.className=o,a.textContent=i,n.appendChild(a)};return r(d.pillTtl,t.title),t.timer!==void 0&&r(d.pillTmr,t.timer),n}function Ti(t,e=Date.now()){if(t.kind==="waiting")return{label:"Waiting For Response",variant:fr};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:fr}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:xi}}return null}function _i(t,e,n=new Date){let r=Zn(n);return t.seconds===void 0?{title:e?r:t.label,timer:e?void 0:r}:{title:r,timer:Nt(t.seconds)}}var Ci=class{#t=null;#e={kind:"idle"};#r=null;#n=null;#o=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get(Ht))[Ht];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>Si){chrome.storage.local.remove(Ht);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#o=t,this.#i(),this.#c()}toggleClockMode(){c.alive&&(this.setClockMode(!this.#o),chrome.storage.local.set({waitPillClock:this.#o}))}render(t){return Ti(this.#e,t)}#l(t){return _i(t,this.#o,new Date)}#i(){if(this.#t??=Ai(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(d.hidden);return}this.#t.classList.remove(d.hidden),this.#t.replaceChildren(vi(this.#l(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#r&&(c.clear(this.#r),this.#r=null),t.kind==="running"?(chrome.storage.local.set({[Ht]:t}),this.#r=c.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove(Ht),this.#i(),this.#c()}#u(){this.#i(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,w("audioAlert").then(t=>{t&&Ni()})))}#c(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=c.setInterval(()=>this.#i(),1e3):!t&&this.#n&&(c.clear(this.#n),this.#n=null)}},kt=new Ci,Kt="pillPosition",mr=4;function pr(t,e,n){return Math.max(e,Math.min(n,t))}function br(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,r=e.height>0?e.height:36;return{w:n,h:r}}function _t(t,e,n){let{w:r,h:o}=br(t),i=pr(e,0,Math.max(0,window.innerWidth-r)),a=pr(n,0,Math.max(0,window.innerHeight-o));return t.style.setProperty("left",i+"px","important"),t.style.setProperty("top",a+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:i,top:a}}function ki(t){var e=!1,n=!1,r=0,o=0,i=0,a=0;function l(u){if(e){var p=u.touches?u.touches[0]:u,g=p.clientX-r,b=p.clientY-o;!n&&Math.abs(g)<mr&&Math.abs(b)<mr||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",_t(t,i+g,a+b),u.cancelable&&u.preventDefault())}}function f(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",f),document.removeEventListener("touchmove",l),document.removeEventListener("touchend",f),n){let u=t.getBoundingClientRect();chrome.storage.local.set({[Kt]:{top:Math.round(u.top),left:Math.round(u.left)}})}n=!1}}t.addEventListener("mousedown",function(u){if(u.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let p=t.getBoundingClientRect();r=u.clientX,o=u.clientY,i=p.left,a=p.top,_t(t,p.left,p.top),document.addEventListener("mousemove",l),document.addEventListener("mouseup",f),u.preventDefault(),u.stopPropagation()}),t.addEventListener("touchstart",function(u){e=!0,n=!1,delete t.dataset.skipClick;let p=t.getBoundingClientRect();r=u.touches[0].clientX,o=u.touches[0].clientY,i=p.left,a=p.top,_t(t,p.left,p.top),document.addEventListener("touchmove",l,{passive:!1}),document.addEventListener("touchend",f)},{passive:!0})}function Ai(){let t=document.querySelector(h(s.waitTime));return t||(t=document.createElement("div"),t.id=s.waitTime,t.className=d.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),ki(t),chrome.storage.local.get(Kt).then(e=>{let n=e[Kt];n&&typeof n.top=="number"&&typeof n.left=="number"&&_t(t,n.left,n.top)}),Di(t),t)}function hr(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function Ei(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function Mi(t){let{w:e,h:n}=br(t),r=12;return[{left:r,top:r},{left:Math.max(r,window.innerWidth-e-r),top:r},{left:r,top:Math.max(r,window.innerHeight-n-r)},{left:Math.max(r,window.innerWidth-e-r),top:Math.max(r,window.innerHeight-n-r)}]}async function $i(){let e=(await chrome.storage.local.get(Kt))[Kt];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function Di(t){let e=!1,n=async()=>{if(!c.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(d.hidden))return;let r=Ei(),o=!!(r&&r.offsetParent!==null&&r.getBoundingClientRect().height>20),i=t.getBoundingClientRect();if(o&&hr(i,r.getBoundingClientRect())){let a=r.getBoundingClientRect(),l=Mi(t),f=l.find(u=>{let p={left:u.left,top:u.top,right:u.left+i.width,bottom:u.top+i.height};return!hr(p,a)})||l[2];e=!0,t.setAttribute("data-dodging",""),_t(t,f.left,f.top);return}if(e&&!o){e=!1,t.removeAttribute("data-dodging");let a=await $i();a&&_t(t,a.left,a.top)}else o||t.removeAttribute("data-dodging")};c.setInterval(n,400),c.on(window,"resize",n)}async function Ze(){if(!c.alive||!await w("defaultWaitTime")||!await c.waitFor("#post_select",{attempts:Ot}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});kt.setClockMode(t),await kt.restore()}async function wr(){await w("defaultWaitTime")&&kt.waiting()}async function Se(t){await w("defaultWaitTime")&&kt.run(t)}function Sr(){kt.toggleClockMode()}function xr(t){kt.setClockMode(t)}var Wt=null,Ft=null,ge=null;function vr(){return ge||(ge=new(window.AudioContext||window.webkitAudioContext),c.disposable(()=>ge?.close())),ge}async function Je(t=150){try{let e=vr();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),r=e.createGain();n.connect(r),r.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let o=e.currentTime,i=t/1e3;r.gain.setValueAtTime(0,o),r.gain.linearRampToValueAtTime(.1,o+.01),r.gain.setValueAtTime(.1,o+Math.max(.01,i-.02)),r.gain.linearRampToValueAtTime(0,o+i),n.start(),n.stop(o+i)}catch(e){console.error("Audio beep failed:",e)}}function Ii(t,e=125,n=125){let r=0,o=()=>{r>=t||(Je(e),r++,c.setTimeout(o,e+n))};o()}var Ge=4,gr=50,yr=50,Pi=600;function Tr(){if(Ft)return;let t=()=>{Ii(Ge,gr,yr);let e=Ge*gr+(Ge-1)*yr;Ft=c.setTimeout(t,e+Pi)};t()}var Li=250,Ri=10,qi=300,Oi=1e3;function Ni(){if(Wt)return;let t=[];for(let o=0;o<=qi;o+=Ri)t.push(o);let e=Date.now(),n=0,r=()=>{let o=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&o>=t[n];){let i=n===t.length-1;Je(i?Oi:Li),n++}if(n<t.length){let i=t[n],a=e+i*1e3,l=Math.max(0,a-Date.now());Wt=c.setTimeout(r,l)}else At()};r()}function At(){Wt&&(c.clear(Wt),Wt=null),Ft&&(c.clear(Ft),Ft=null),Xe()}var ye=null,be=null,Ct=null,we=null,Ut=null;async function _r(){Xe();try{let t=vr();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),r=t.createOscillator(),o=t.createGain(),i=t.createGain();n.type="square",r.type="sawtooth",n.frequency.value=880,r.frequency.value=1320,o.gain.value=.85,i.gain.value=.65,n.connect(o).connect(e),r.connect(i).connect(e);let a=t.createOscillator(),l=t.createGain();a.type="triangle",a.frequency.value=3.2,l.gain.value=280,a.connect(l),l.connect(n.frequency),l.connect(r.frequency);let f=t.currentTime;n.start(f),r.start(f),a.start(f),Ct={osc1:n,osc2:r,lfo:a,master:e};let u=()=>{Ct&&(Je(500),be=c.setTimeout(u,1800))};u(),ye=c.setTimeout(Xe,12e4),Ut=document.title;let p=!1,g=()=>{Ct&&(document.title=p?Ut:"!!! SUBMIT CLICKED !!!",p=!p,we=c.setTimeout(g,450))};g()}catch(t){console.error("Submit alarm failed:",t)}}function Xe(){if(ye&&(c.clear(ye),ye=null),be&&(c.clear(be),be=null),we&&(c.clear(we),we=null),Ut&&(document.title=Ut,Ut=null),Ct){try{let{osc1:t,osc2:e,lfo:n}=Ct;t.stop(),e.stop(),n.stop()}catch{}Ct=null}}function Bi(){if(document.querySelector(h(s.recheck)))return;let t=Qe();if(!t)return;let e=document.querySelector("#post_select"),n=document.createElement("button");n.id=s.recheck,n.type="button",n.textContent=vt([82,101,99,104,101,99,107]);let r=()=>{let o=ft(),i=Tt();n.disabled=!e.value||!o,n.title=o?"Recheck slots for the selected city":`Slot checks paused \u2014 IST windows ${et}. Next in ${Bt(i)}.`,n.classList.toggle(d.hidden,!e.value)};c.on(n,"click",()=>{if(!ft()){let o=Bt(Tt());n.title=`Outside slot window \u2014 next check at IST ${et} (in ${o})`,r();return}e.dispatchEvent(new Event("change",{bubbles:!0}))}),t.appendChild(n),r(),c.on(e,"change",r),c.setInterval(r,1e3)}async function tn(){c.alive&&await w("recheckButton")&&await c.waitFor("#post_select",{attempts:Ot})&&Bi()}async function en(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await c.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let r=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(l=>l.innerText.trim()===r))continue;let i=document.createElement("li");i.className="usa-sidenav__item",i.dataset[x.mark]="";let a=document.createElement("a");a.href=n.link,a.className=d.sideLink,a.target="_self",a.textContent=n.text,i.appendChild(a),t.appendChild(i)}}function Cr(t){if(t.response.HasError)return;let e=document.querySelector("#page_form");if(!e)return;let n={};for(let l of t.response.ScheduleDays||[]){if(!l?.Date||l.Date.length<10)continue;let f=l.Date.slice(0,7),u=parseInt(l.Date.slice(8,10),10);u&&(f in n?n[f].push(u):n[f]=[u])}document.querySelector(h(s.datesCont))?.remove();let r=document.querySelector("#post_select"),o=r?.options[r.selectedIndex]?.text??"",{container:i,details:a}=Hi(o);e.appendChild(i);for(let[l,f]of Object.entries(n)){let u=document.createElement("strong");u.textContent=l,a.append(u,`: ${f.join(", ")}`,document.createElement("br"))}Object.keys(n).length||a.append("No slots available",document.createElement("br"))}function Hi(t){let e=(a,l,f)=>{let u=document.createElement(a);return l&&(u.className=l),f?.appendChild(u),u},n=e("div","row");n.id=s.datesCont;let r=e("div","col-sm-12 atlas_section mt-3",n),o=e("div","col-sm-12 atlas_section_header_row",e("div","row",r));e("h2",null,o).textContent=t;let i=e("p",null,e("div","col-sm-12",e("div","row",r)));return i.id=s.datesPara,{container:n,details:i}}var kr=null;function Wi(){let t=document.querySelector(h(s.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return c.setStyle(n,"display","flex"),c.setStyle(n,"alignItems","center"),c.setStyle(n,"justifyContent","flex-end"),c.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=s.ofcDate,t.dataset[x.mark]="",e.insertAdjacentElement("beforebegin",t),t}function Fi(){if(!location.pathname.includes("/schedule"))return;let t=kr;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=Wi();n&&(n.textContent=`OFC (Estimate): ${Jn(e.appointmentDateStr)}`)}function Ar(t){chrome.runtime?.id&&(kr=t.data.data,c.waitFor("#submitbtn").then(e=>{e&&Fi()}))}var xe=new Map,Er=45e3,ve=new Map,Mr=8e3,$r=0;function Te(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function _e(t){try{let[e,n,r]=t.split("-").map(Number);return new Date(e,n-1,r).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function Ui(t,e){return`${t}:${e.slice(0,5).join(",")}`}function Ki(t){let e=Date.now(),n=xe.get(t);if(n&&e-n<Er)return!1;xe.set(t,e);for(let[r,o]of xe)e-o>Er*4&&xe.delete(r);return!0}function Yi(t){let e=Date.now(),n=ve.get(t);if(n&&e-n<Mr)return!1;ve.set(t,e);for(let[r,o]of ve)e-o>Mr*6&&ve.delete(r);return!0}async function Dr(){return await w("telegramViaServer")!==!1}async function Ir(t,{kind:e="alert",dedupKey:n="",skipDedup:r=!1,notifyMuktesh:o=!0}={}){if(t&&await Dr())try{await fetch(Yn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:r,notify_muktesh:o}),signal:AbortSignal.timeout(2e4)})}catch{}}function Vi(t,{kind:e="screen",dedupKey:n="",waitMs:r=0,skipDedup:o=!1,notifyMuktesh:i=!0}={}){c.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:r,skipDedup:o,notifyMuktesh:i,captureScreenshot:!0})}async function ji(t,e,n){let r=Te(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&i.push(`\u{1FAAA} <b>Visa:</b> ${n}`),i.push(`\u{1F550} <b>Checked:</b> ${o} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),i.push(`\u{1F4C6} <b>Dates (${r.length}):</b>`,"");for(let a of r.slice(0,30))i.push(`\u{1F7E2} <b>${_e(a)}</b>`);return r.length>30&&i.push("",`\u2795 <i>+${r.length-30} more dates</i>`),i.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),i.join(`
`)}function zi(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",r=document.querySelector("#datepicker")?.value||"\u2014",i=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:r,time:i}}async function Pr(t,{postId:e,postName:n,hasError:r}={}){if(r||!t?.length)return;let o=Te(t);if(!o.length||!await w("telegramAlert"))return;let i=Ui(e||n||"unknown",o);if(!Ki(i))return;let a=await W(),l=await ji(n,t,a?.visa||"");await Ir(l,{kind:"slots",dedupKey:i,notifyMuktesh:!0})}function Gi(t,e,n){let r=Te(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
\u{1F3DB}\uFE0F ${i}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`;if(r.length){let a=r.slice(0,5).map(l=>_e(l)).join(", ");return`<b>DATES AVAILABLE</b>
\u{1F3DB}\uFE0F ${i}
\u{1F4C6} ${r.length} date(s)
${a}${r.length>5?"\u2026":""}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}return`<b>City changed \u2014 no dates</b>
\u{1F3DB}\uFE0F ${i}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}function Xi(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=e?_e(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${r}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function Qi(t,e,n){let r=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?_e(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u23F0 ${n} slot(s)
\u{1F550} ${r} IST
\u{1F4F2} Visa Slot 6`}async function Et(t,{kind:e="screen",dedupKey:n,waitMs:r=0,skipDedup:o=!1}={}){if(await w("telegramScreenshots")===!1||!await Dr())return;let i=n||`${e}:${String(t).slice(0,80)}`;!o&&!Yi(i)||Vi(t,{kind:e,dedupKey:i,waitMs:r,skipDedup:o,notifyMuktesh:!0})}async function Lr(t,{postId:e,postName:n,hasError:r}={}){let o=Gi(n,t,r),i=Te(t),a=i.length?"dates":"city";await Et(o,{kind:a,dedupKey:`${a}:${e||n}:${i.length}:${r?1:0}`,waitMs:i.length?1400:900})}async function Rr(t,e){await Et(Xi(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function qr(t,e,n){await Et(Qi(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function Or(){let t=Date.now();if(t-$r<8e3)return;$r=t;let e=await W(),{city:n,date:r,time:o}=zi(),i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),a=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${r}`,`\u23F0 <b>Time:</b> ${o}`];e?.email&&a.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&a.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),a.push(`\u{1F550} <b>When:</b> ${i} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let l=a.join(`
`);await Ir(l,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await Et(l,{kind:"submit",skipDedup:!0,waitMs:200})}var Ce=25;function Zi(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function rn(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let r=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,r),n-1)}function Br(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function Hr(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function on(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function Nr(t){if(!t||t.disabled)return!1;try{let e=t.closest("tr"),r=[t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,t.closest("label"),t,e].filter(Boolean);for(let o of r)o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),o.click();(t.type==="radio"||t.type==="checkbox")&&(t.checked=!0),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function Wr(){let t=new Set,e=[],n=r=>{if(!r||t.has(r)||on(r)||r.disabled)return;let o=r.closest("tr");o&&Hr(o)||(t.add(r),e.push(r))};for(let r of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let o of document.querySelectorAll(`${r}:not([disabled])`))n(o);return e}function Ji(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!Br(n)||Hr(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function ta(t){for(let e of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(e.tagName!=="SELECT"||e.disabled||on(e))continue;let n=[...e.options].filter(o=>!o.disabled&&o.value&&o.value!=="0"&&Br({textContent:o.textContent}));if(!n.length)continue;let r=rn(n.length,t);return e.value=n[r].value,e.dispatchEvent(new Event("change",{bubbles:!0})),!0}return!1}function ea(t){if(ta(t))return!0;let e=Wr();if(e.length){let r=rn(e.length,t);if(Nr(e[r]))return!0}let n=Ji();if(n.length){let r=rn(n.length,t),o=n[r],i=o.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(i&&Nr(i))return!0;let a=o.querySelector("label");if(a)return a.click(),!!o.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function I(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!on(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function na({slotIndex:t=0,maxMs:e=12e3,pollMs:n=Ce,onTick:r}={}){let o=Date.now()+e,i=Math.max(10,n||25);return new Promise(a=>{let l=()=>{if(!c.alive)return a(!1);if(r?.(),ea(t)||I())return a(!0);if(Date.now()>=o)return a(!1);c.setTimeout(l,i)};l()})}function Yt({time:t,date:e,slotIndex:n,pollMs:r,maxMs:o}){let i=n??0,a=o||15e3,l=r||Ce;return c.send({action:"forcePickTimeSlot",slotIndex:i,maxMs:a,pollMs:l}),c.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:i,pollMs:l,domWaitMs:0,maxMs:a}),na({slotIndex:i,maxMs:a,pollMs:l})}var nn=!1;function Fr({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(nn)return;nn=!0;let r=!1,o=async()=>{if(!(!c.alive||r)){if(I()){n?.();return}try{if(t&&!await t())return}catch{return}Wr().length&&(r=!0,await Yt({slotIndex:e,time:"00:00",maxMs:800,pollMs:Ce}),r=!1,I()&&n?.())}};c.setInterval(o,Ce);let i=document.querySelector("#page_form")||document.body,a=new MutationObserver(()=>o());a.observe(i,{childList:!0,subtree:!0}),c.disposable(()=>{a.disconnect(),nn=!1})}function Ur(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let r=Zi(n?.Time);if(!r)continue;let o=r.match(/(\d{1,2}):(\d{2})/);if(!o)continue;let[,i,a]=o;if(e.includes(`${i}:${a}`)||e.includes(`${parseInt(i,10)}:${a}`))return!0}return!1}var ke="submitErrors",Kr=50,ra=45e3,Vr=0,an=new Set,Vt=null;function oa(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",r=document.querySelector("#datepicker")?.value||"";return{city:e,date:r,url:location.href}}function jt(){Vr=Date.now()+ra,an.clear(),ua()}function Ae(){return Date.now()<Vr}function ia(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function aa(t){let e=await S({[ke]:[]}),n=Array.isArray(e[ke])?e[ke]:[];n.push(t),n.length>Kr&&n.splice(0,n.length-Kr),await T({[ke]:n})}function Yr(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function sa(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${Yr(t.source)}`,`\u{1F4AC} <b>Message:</b> ${Yr(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let r=n.join(`
`);await Et(r,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function zt(t,e,n={}){let r=String(e||"").trim();if(!r||!Ae()&&!n.force)return;let o=ia(t,r);if(an.has(o))return;an.add(o);let i=oa(),a=await W(),l={at:Date.now(),source:String(t||"unknown"),message:r.slice(0,2e3),city:n.city||i.city,date:n.date||i.date,url:n.url||i.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:a?.email||""};await aa(l);try{await sa(l)}catch{}}function ca(t){if(!Ae())return;let e=t?.status,n=t?.retryAfter,r=t?.cgiBlock,o=`Request failed (HTTP ${e||"?"})`;n!=null&&(o+=` \u2014 retry after ${n}s`),r&&(o+=" \u2014 CGI access limitation"),zt("ajax_error",o,{status:e})}function jr(t){if(!Ae()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){ca({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",o=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";zt("ajax_response",o,{route:t.tail||""})}var la=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function ua(){Vt&&c.clear(Vt);let t=()=>{if(!c.alive||!Ae()){Vt=null;return}for(let e of la)for(let n of document.querySelectorAll(e)){let r=(n.textContent||"").replace(/\s+/g," ").trim();!r||r.length<4||zt("page_validation",r)}Vt=c.setTimeout(t,600)};Vt=c.setTimeout(t,500)}var rt="aiSubmitByAccount",ne=8e3,no=3500,ro=0,R=25,Zt=80,re=0,oo=6e3;function oe(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}var Me=13e3,da=18e3,Jt=45e3,B=45e3,zr=5e3,fa=2e4,ma=15e3;function it(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function cn(){return/\/ofc-schedule\b/i.test(location.pathname)}function C(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var pa=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function Ee(t,e){let n=pa[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(o=>{let i=e===o?" selected":"";return`<option value="${o.replace(/"/g,"&quot;")}"${i}>${o}</option>`}).join("")}function Gr(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function $e(t){try{let[e,n,r]=t.split("-").map(Number);return new Date(e,n-1,r).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function ie(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function Ie(t){return!!(t&&t.citiesEnabled&&t.cities?.length)}async function V(){let t=await W();return t?.id?String(t.id):null}async function Z(t){return t&&((await S(rt))[rt]||{})[t]||null}async function io(t,e){if(!t)return;let r=(await S(rt))[rt]||{};e==null?delete r[t]:r[t]=e,await T({[rt]:r})}var N=!1;function ln(){return N}function ao(){N=!0,De(),Qt()}function $t(){N=!1,L=!1,De()}async function so(t){ao();let e=await Z(t);if(!e){gt();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await io(t,e),gt()}function ae(t,e,n){let r=String(t||"").slice(0,10);return!(!r||r.length<10||e&&r<e||n&&r>n)}async function j(){if(N||C()||!it())return null;let t=await V();if(!t)return null;let e=await Z(t);return!ie(e)||!e.from||!e.to?null:{...e,accountId:t}}async function se(){if(N||C()||!it())return null;let t=await V();if(!t)return null;let e=await Z(t);return Ie(e)?{...e,accountId:t}:null}function un(t,e,n){let r=new Date;return r.setHours(0,0,0,0),(t||[]).filter(o=>o&&typeof o.Date=="string"&&o.Date.length>=10).filter(o=>ae(o.Date,e,n)).filter(o=>{let[i,a,l]=o.Date.slice(0,10).split("-").map(Number);return new Date(i,a-1,l)>=r}).sort((o,i)=>String(o.Date).localeCompare(String(i.Date)))}var L=!1,nt=null,ot=null,Q=!1,pt=0,O=!1,Y=0,ht=0,Gt=0,Xt=0,ce=!1,K=null,X=0,M=!1,E=0,Mt=null,mt=null,te=0,Xr=!1,Qr="",Zr=!1,sn=0;function ha(t){return(t||[]).map(e=>e.id).join("")}function co(){let t=document.querySelector(h(s.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function Jr(t){let e=document.querySelector(h(s.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function De(){nt&&(c.clear(nt),nt=null),L=!1}function Dt(){Mt&&(c.clear(Mt),Mt=null)}function lo(){Dt(),E||(E=Date.now());let t=Math.max(500,Jt-(Date.now()-E));Mt=c.setTimeout(()=>{Mt=null,!(!M||!O||!c.alive)&&(M=!1,E=0,P(Date.now()),y(`City Change \u2014 booking hold timed out (${Jt/1e3}s); next city in 13\u201318s\u2026`),_())},t)}function ga(){mt&&(c.clear(mt),mt=null)}function dn(t=Date.now()){let e=!1;if(Q&&pt&&t-pt>=ma&&(Q=!1,pt=0,e=!0),M&&(E||(E=t),t-E>=Jt?(Dt(),M=!1,E=0,e=!0):Mt||lo()),ce){if(X||(X=t),!fo()&&t-X>=8e3)F(),e=!0;else if(t-X>=B)F(),e=!0;else if(!K){let n=Math.max(500,B-(t-X));K=c.setTimeout(()=>{K=null,!(!O||M)&&(F(),P(Date.now()),y(`City Change \u2014 still Loading after ${B/1e3}s; changing city\u2026`),_())},n)}}return L&&!nt&&(L=!1,e=!0),e}function uo(){if(mt||!O)return;let t=()=>{if(mt=null,!O||!c.alive||N)return;let e=Date.now(),n=dn(e),r=te>0&&e-te>=fa;(n||r||!ot&&!Q)&&(n||r?(P(Date.now()),y(r?"City Change \u2014 stuck; auto-restarting hops\u2026":"City Change \u2014 lock cleared; next city in 13\u201318s\u2026")):y("City Change \u2014 timer lost; restarting\u2026"),_()),O&&(mt=c.setTimeout(t,zr))};mt=c.setTimeout(t,zr)}function Qt(){mn(),ga(),Dt(),Q=!1,pt=0,O=!1,M=!1,E=0,Y=0,ht=0,te=0,F()}function F(){ce=!1,X=0,K&&(c.clear(K),K=null)}function fo(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let r=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(r))continue;let o=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let i of o)if(i&&/\bLoading\.{0,3}\b/i.test((i.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let o=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(o))continue;let i=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(i))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function ya(){ce=!0,X=Date.now(),K&&c.clear(K),K=c.setTimeout(()=>{K=null,!(!O||M)&&(F(),P(Date.now()),y(`City Change \u2014 still Loading after ${B/1e3}s; changing city\u2026`),_())},B)}function fn(t){let e=Math.max(0,Number(t)||0)*1e3;Xt=Math.max(Xt,Date.now()+e),Y=Math.max(Y,Xt),F(),_()}function mo(){F()}function It(){N||(M=!0,E||(E=Date.now()),mn(),F(),lo(),y("City Change \u2014 paused (Auto Submit booking)\u2026"))}function yt(){M&&(Dt(),M=!1,E=0,!(!O||N)&&(P(Date.now()),y("City Change \u2014 resuming; next city in 13\u201318s\u2026"),_()))}async function po(){let t=await j();if(!t)return;let e=Date.now();if(e-sn<6e4)return;sn=e;let r=document.querySelector("#post_select")?.value;if(!r){y("Auto Submit ON \u2014 pick a city first.");return}let i=(await J()).find(l=>String(l.ID)===String(r)),a=i?.Days;if(Array.isArray(a)&&a.length){let l=un(a,t.from,t.to);if(l.length){It();let f=oe(l.length),u=l[f].Date;y(`Auto Submit: picking date #${f+1} (${u.slice(0,10)})\u2026`),c.send({action:"selectFirstDate",date:u,maxMs:ne,pollMs:R});return}y(`Auto Submit ON \u2014 no dates in your range on ${i.Name||"this city"} yet.`);return}y("Auto Submit ON \u2014 loading slots for current city\u2026"),c.send({action:"selectPost",postId:String(r)})}function ba(){sn=0}function mn(){ot&&(c.clear(ot),ot=null)}function wa(t,e){return t+Math.random()*(e-t)}function Sa(){return wa(Me,da)}function P(t=Date.now()){Y=t+Sa()}function ho(t=Date.now()){let e=Tt(new Date(t));if(e>0)return e;if(Xt>t)return Xt-t;if(ht){let n=ht+Me-t;if(n>0)return n}return Y>t?Y-t:0}function _(){if(!O)return;if(mn(),M||ce){ot=c.setTimeout(()=>{to()},500);return}let t=ho();t<Me&&(ht?t=Math.max(0,ht+Me-Date.now()):(Y>Date.now()||P(Date.now()),t=Y-Date.now())),ot=c.setTimeout(()=>{to()},t)}function xa(t,e){if(!t.length)return null;if(t.length===1)return Gt=0,t[0];let n=t.findIndex(o=>String(o.id)===String(e));n<0&&(n=Math.max(0,Math.min(Gt,t.length-1)));let r=(n+1)%t.length;return Gt=r,t[r]}function pn(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function hn(){let t=document.querySelector(h(s.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function gn(){return{from:document.querySelector(h(s.aiFrom))?.value||null,to:document.querySelector(h(s.aiTo))?.value||null}}function go(t=[],{force:e=!1}={}){let n=document.querySelector(h(s.aiCities));if(!n)return;let r=pn(),o=ha(r),i=document.querySelector(h(s.aiPanel)),a=i&&!i.classList.contains(d.hidden),l=co();if(!e&&o===Qr&&n.querySelector('input[type="checkbox"]'))return;Qr=o;let f=new Set(a&&l.length&&!e&&!t.length?l:(t.length?t:l).map(String));if(n.replaceChildren(),!r.length){n.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let u of r){let p=document.createElement("label"),g=document.createElement("input");g.type="checkbox",g.value=u.id,g.dataset.name=u.name,g.checked=f.has(u.id),p.append(g,document.createTextNode(u.name)),n.appendChild(p)}}function va(t){let e=t?.cities||[];return e.length?e.map(n=>n.name||n.id).join(", "):"\u2014"}async function ee(t,e={}){let n=await Z(t)||{},{from:r,to:o}=gn(),i=hn(),a={...n,from:r||n.from||null,to:o||n.to||null,cities:i.length?i:n.cities||[],loginId:document.querySelector(h(s.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(h(s.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(l=>{let f=[s.aiQ1,s.aiQ2,s.aiQ3][l],u=[s.aiA1,s.aiA2,s.aiA3][l];return{q:document.querySelector(h(f))?.value?.trim()||n.security?.[l]?.q||"",a:document.querySelector(h(u))?.value?.trim()||n.security?.[l]?.a||"",set:l+1}}),...e};return typeof a.submitEnabled=="boolean"&&(a.enabled=a.submitEnabled),await io(t,a),a}async function Ta(t,e){if(!ft()||M||L)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let r=String(t);return String(n.value)===r?!1:(ya(),y(`Switching city \u2192 ${e||t}\u2026`),c.send({action:"selectPost",postId:r}),!0)}function yo(){Xr||!document.querySelector("#post_select")||(Xr=!0)}async function to(){if(!(Q||!O)){Q=!0,pt=Date.now(),te=Date.now(),ot=null;try{if(N||C()||!c.alive){Qt();return}if(dn()){P(Date.now()),y("City Change \u2014 auto-unstuck; next city in 13\u201318s\u2026"),_();return}if(M||L){let g=E?Date.now()-E:0;if(M&&g>=Jt){Dt(),M=!1,E=0,P(Date.now()),y("City Change \u2014 hold expired; next city in 13\u201318s\u2026"),_();return}let b=Math.max(0,Jt-g);y(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(b/1e3)}s`),_();return}let t=Date.now(),e=ft(new Date(t)),n=Tt(new Date(t));if(!e){y(`City Change \u2014 waiting for slot window (IST ${et}, next in ${Bt(n)})`),_();return}if(ce){let g=X?t-X:0;if(fo()){if(g>=B){F(),P(Date.now()),y(`City Change \u2014 still Loading after ${B/1e3}s; changing city\u2026`),_();return}let A=Math.max(0,Math.ceil((B-g)/1e3));y(`City Change \u2014 Date Loading\u2026 stay (${A}s then hop if still Loading)`),_();return}let b=Math.max(0,Math.ceil((B-g)/1e3));if(y(`City Change \u2014 waiting calendar result\u2026 (${b}s max)`),g>=B){F(),P(Date.now()),_();return}_();return}let r=ho(t);if(r>0){let g=Math.ceil(r/1e3);y(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,g)}s`),_();return}let o=await se();if(!o?.cities?.length){Qt();return}let i=new Set(pn().map(g=>g.id)),a=o.cities.filter(g=>i.has(String(g.id)));if(!a.length){y("Preferred cities not found in the dropdown \u2014 pick cities again."),Qt();return}let l=document.querySelector("#post_select"),f=l?String(l.value):"",u=xa(a,f);if(!u){P(t),_();return}if(await Ta(u.id,u.name)){ht=Date.now(),P(ht);let g=a.map(A=>A.name||A.id).join(" \u2192 "),b=`${Gt+1}/${a.length}`;y(`City Change \u2014 ${b} ${u.name||u.id} (path: ${g}); waiting Date Loading (max ${B/1e3}s)`)}else P(t);_()}finally{Q=!1,pt=0}}}async function bo(){if(N||C()||!it())return;let t=await se();if(!t?.cities?.length)return;let e=new Set(pn().map(a=>a.id)),n=t.cities.filter(a=>e.has(String(a.id)));if(!n.length){y("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}Dt(),F(),M=!1,E=0,L=!1,Q=!1,pt=0,O=!0,te=Date.now(),Y=Date.now();let r=document.querySelector("#post_select"),o=r?String(r.value):"",i=n.findIndex(a=>String(a.id)===o);Gt=i>=0?i:0,y(`City Change ON \u2014 IST ${et}; hop 13\u201318s in checklist order; auto-unstick; Loading max ${B/1e3}s`),uo(),_()}async function wo(){if(N||C()||!cn()||!c.alive||!(await se())?.cities?.length||!document.querySelector("#post_select"))return;if(!O){await bo();return}let e=dn();uo(),(e||!ot&&!Q)&&(e&&(P(Date.now()),y("City Change \u2014 auto-unstuck; next city in 13\u201318s\u2026")),_())}function So(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function yn(){let t=So();if(t&&!t.disabled)try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}c.send({action:"forceClickSubmit",prefix:m,pollMs:R,maxMs:oo})}function _a(){if(!I())return!1;let t=So();return!!(t&&!t.disabled)}function xo(){y("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function bn(t){if(N||C()||L)return;let e=await Z(t);if(!ie(e))return;It(),L=!0,jt();let n=Date.now(),r=!1,o=I()?Date.now():0,i=async f=>{if(!(r||!L||!c.alive)){if(r=!0,window.removeEventListener("message",a),nt&&(c.clear(nt),nt=null),C()){L=!1;return}if(L=!1,f){await so(t),y("Submit clicked \u2014 all Tik Tik operations stopped.");return}yt(),y(O?"Auto Submit \u2014 Submit not clicked in time; City Change resuming\u2026":"Auto Submit \u2014 Submit not clicked in time; still watching\u2026")}},a=f=>{!c.alive||f.source!==window||f.data?.action===tt.sub&&i(!0)};window.addEventListener("message",a);let l=async()=>{if(r||!L||!c.alive)return;let f=Date.now(),u=f-n;if(I()&&!o&&(o=f,y(`Time slot selected \u2014 Submit in ${Zt}ms\u2026`)),o&&f-o>=Zt&&(yn(),_a()&&y("Clicking Submit\u2026")),u>=oo)return i(!1);nt=c.setTimeout(l,R)};l()}async function vo(){if(!I()||L||N)return;let t=await j();t&&await bn(t.accountId)}function y(t){let e=document.querySelector(h(s.aiStatus));e&&(e.textContent=t)}function z(t){y(t)}function Ca(t){let e=document.querySelector(h(s.aiSubmitBtn)),n=document.querySelector(h(s.aiCitiesBtn)),r=ie(t),o=Ie(t);e&&(e.classList.toggle(d.aiOnBtn,r),e.textContent=r?"Auto Submit: ON":"Auto Submit: OFF"),n&&(n.classList.toggle(d.aiOnBtn,o),n.textContent=o?"City Change: ON":"City Change: OFF")}function ka(t,e){let n=document.querySelector(h(s.aiStatus)),r=document.querySelector(h(s.aiBtn));if(!n||!r)return;Ca(t);let o=ie(t),i=Ie(t);o||i?(r.classList.add(d.aiOn),r.textContent="Tik Tik ON"):(r.classList.remove(d.aiOn),r.textContent="Tik Tik");let l=[];o&&t.from&&t.to?l.push(`Auto Submit ON (${$e(t.from)} \u2013 ${$e(t.to)}, clicks Submit as soon as time slot is ready)`):l.push("Auto Submit OFF"),i?l.push(`City Change ON (${va(t)}, :14\u2013:21 & :24\u2013:31)`):l.push("City Change OFF"),n.textContent=`Account ${e||"\u2014"}: ${l.join(" \xB7 ")}`}async function gt(){let t=await V(),e=t?await Z(t):null;ka(e,t);let n=document.querySelector(h(s.aiFrom)),r=document.querySelector(h(s.aiTo));n&&e?.from&&(n.value=e.from),r&&e?.to&&(r.value=e.to);let o=(e?.cities||[]).map(A=>A.id),i=document.querySelector(h(s.aiPanel)),a=i&&!i.classList.contains(d.hidden),l=co();go(a&&l.length?l:o);let f=document.querySelector(h(s.aiLogin)),u=document.querySelector(h(s.aiPass));f&&e?.loginId&&(f.value=e.loginId),u&&e?.loginPass&&(u.value=e.loginPass);let p=e?.security||[],g=[s.aiQ1,s.aiQ2,s.aiQ3],b=[s.aiA1,s.aiA2,s.aiA3];g.forEach((A,H)=>{let D=document.querySelector(h(A));D&&(D.innerHTML=Ee(H,p[H]?.q||""))}),b.forEach((A,H)=>{let D=document.querySelector(h(A));D&&p[H]?.a&&(D.value=p[H].a)})}function eo(t){let e=document.querySelector(h(s.aiPanel));e&&(e.classList.toggle(d.hidden,!t),t&&V().then(async n=>{let r=n?await Z(n):null;go((r?.cities||[]).map(o=>o.id),{force:!0})}))}async function Aa(){let t=await V();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let e=await Z(t)||{},n=!ie(e),{from:r,to:o}=gn();if(n){if(!r||!o){y("Select both From and To dates before enabling Auto Submit.");return}if(r>o){y("From date must be before To date.");return}if(!window.confirm(`Enable Auto Submit?

Range: ${$e(r)} \u2013 ${$e(o)}
If a matching slot appears on the current city, it will select date + time and Submit once.

City Change is separate \u2014 use its own ON/OFF button.`))return;$t(),De(),ba(),await ee(t,{submitEnabled:!0,from:r,to:o,confirmedAt:Date.now()})}else De(),await ee(t,{submitEnabled:!1,from:r||e.from,to:o||e.to});await gt(),n&&await po()}async function Ea(){let t=await V();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let e=await Z(t)||{},n=!Ie(e),r=hn();if(n){if(!r.length){y("Select at least one preferred city before enabling City Change.");return}if(!window.confirm(`Enable City Change?

Cities (in order): ${r.map(i=>i.name).join(" \u2192 ")}
City checks run each hour during IST windows ${et}, switching cities every 13\u201318 seconds in that same order.

Auto Submit is separate \u2014 use its own ON/OFF button.`))return;$t(),await ee(t,{citiesEnabled:!0,cities:r}),await gt(),yo(),await bo();return}Qt(),await ee(t,{citiesEnabled:!1,cities:r.length?r:e.cities||[]}),await gt()}async function Ma(){let t=await V();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let{from:e,to:n}=gn(),r=hn(),o=document.querySelector(h(s.aiLogin))?.value?.trim(),i=document.querySelector(h(s.aiPass))?.value,a=[0,1,2].map(l=>({q:document.querySelector(h([s.aiQ1,s.aiQ2,s.aiQ3][l]))?.value?.trim()||"",a:document.querySelector(h([s.aiA1,s.aiA2,s.aiA3][l]))?.value?.trim()||""}));if(!o||!i){y("Enter ID and password before saving.");return}if(a.some(l=>!l.q||!l.a)){y("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}await ee(t,{}),y("Saved ID, password, and 3 security questions (1 from each set).")}function wn(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==s.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==s.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===s.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function To(){document.querySelector(h(s.aiPanel))?.remove(),document.querySelector(h(s.aiBtn))?.remove(),wn()}function $a(){if(C())return;if(!cn()){To();return}if(document.querySelector(h(s.aiBtn)))return;let t=Qe();if(!t)return;let e=document.createElement("button");e.id=s.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[x.mark]="",c.on(e,"click",()=>{let r=document.querySelector(h(s.aiPanel)),o=r&&r.classList.contains(d.hidden);eo(!!o)}),t.appendChild(e);let n=document.createElement("div");n.id=s.aiPanel,n.className=d.hidden,n.dataset[x.mark]="",n.innerHTML=`
    <div class="${d.cardTtl}">Tik Tik (this account only)</div>
    <p class="${d.aiHint}">
      Two separate switches: <b>Auto Submit</b> books a matching date once;
      <b>City Change</b> checks slots in burst windows each hour (IST ${et}), switching preferred cities in checklist order every 13\u201318s.
    </p>
    <div class="${d.aiRow}">
      <label>From <input type="date" id="${s.aiFrom}" min="${Gr()}" /></label>
      <label>To <input type="date" id="${s.aiTo}" min="${Gr()}" /></label>
    </div>
    <div class="${d.aiHint}" style="margin-bottom:4px;font-weight:600;color:#334155">
      Preferred cities
      <button type="button" id="${s.aiCitiesAll}" class="${d.aiCityAct}">Select all</button>
      <button type="button" id="${s.aiCitiesNone}" class="${d.aiCityAct}">Clear</button>
    </div>
    <div id="${s.aiCities}" class="${d.aiCities}"></div>
    <div class="${d.aiHint}" style="margin:8px 0 4px;font-weight:600;color:#334155">Login (for PSE0501 recovery on Home tab)</div>
    <div class="${d.aiRow}">
      <label>ID / email <input type="email" id="${s.aiLogin}" autocomplete="off" /></label>
      <label>Password <input type="password" id="${s.aiPass}" autocomplete="off" /></label>
    </div>
    <div class="${d.aiHint}" style="margin:0 0 6px">
      3 sets \xD7 5 questions. Pick <b>1 question from each set</b>, then type <b>your answer</b> for that question.
      Login later asks any 2 of these 3.
    </div>
    <div class="${d.aiRow}" style="flex-direction:column;align-items:stretch">
      <label>Set 1 \u2014 choose 1 question
        <select id="${s.aiQ1}">${Ee(0)}</select>
      </label>
      <label>Your answer for set 1
        <input type="text" id="${s.aiA1}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
      </label>
    </div>
    <div class="${d.aiRow}" style="flex-direction:column;align-items:stretch">
      <label>Set 2 \u2014 choose 1 question
        <select id="${s.aiQ2}">${Ee(1)}</select>
      </label>
      <label>Your answer for set 2
        <input type="text" id="${s.aiA2}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
      </label>
    </div>
    <div class="${d.aiRow}" style="flex-direction:column;align-items:stretch">
      <label>Set 3 \u2014 choose 1 question
        <select id="${s.aiQ3}">${Ee(2)}</select>
      </label>
      <label>Your answer for set 3
        <input type="text" id="${s.aiA3}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
      </label>
    </div>
    <div class="${d.aiRow}">
      <button type="button" id="${s.aiSaveLogin}">Save login details</button>
    </div>
    <div class="${d.aiRow}">
      <button type="button" id="${s.aiSubmitBtn}">Auto Submit: OFF</button>
      <button type="button" id="${s.aiCitiesBtn}">City Change: OFF</button>
      <button type="button" id="${s.aiClose}">Close</button>
    </div>
    <div id="${s.aiStatus}" class="${d.aiHint}"></div>
  `,t.insertAdjacentElement("afterend",n),c.on(n.querySelector(h(s.aiSubmitBtn)),"click",Aa),c.on(n.querySelector(h(s.aiCitiesBtn)),"click",Ea),c.on(n.querySelector(h(s.aiSaveLogin)),"click",Ma),c.on(n.querySelector(h(s.aiClose)),"click",()=>eo(!1)),c.on(n.querySelector(h(s.aiCitiesAll)),"click",()=>Jr(!0)),c.on(n.querySelector(h(s.aiCitiesNone)),"click",()=>Jr(!1)),c.on(n.querySelector(h(s.aiFrom)),"change",r=>{let o=n.querySelector(h(s.aiTo));o&&r.target.value&&(o.min=r.target.value)}),gt()}function Da(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",c.on(e,"click",()=>{jt(),V().then(n=>{n?so(n):ao()})}))};t(document.querySelector("#submitbtn")),c.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function Sn(){if(c.alive&&!C()){if(!cn()){To();return}await c.waitFor("#post_select",{attempts:Ot})&&($a(),yo(),Da(),!Zr&&(Zr=!0,c.setTimeout(()=>gt(),800),c.setTimeout(async()=>{await j()&&await po()},1500)))}}var _o=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function Co(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function Ia(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=Co(t.data.url),r=new URLSearchParams(t.data.request||"").get("parameters");if(!r)return null;let o;try{o=JSON.parse(r)}catch{return null}return{params:o,tail:e,response:t.data.response}}async function Pa(t,e={}){t?.length&&(await Pr(t,e),await w("audioAlert")&&Tr())}async function La(t,e=!1){if(e||C())return null;let n=new Date;n.setHours(0,0,0,0);let r=(t||[]).map(a=>{if(!a)return null;let l=xn(a.Date);return l?{...a,Date:l}:null}).filter(Boolean).filter(a=>{let[l,f,u]=a.Date.slice(0,10).split("-").map(Number);return!l||!f||!u?!1:new Date(l,f-1,u)>=n}).sort((a,l)=>String(a.Date).localeCompare(String(l.Date))),o=await j();if(o){let a=r.filter(f=>ae(f.Date,o.from,o.to));if(!a.length)return null;let l=oe(a.length);return a[l]?.Date||null}if(!await w("autoSelectFirstDate")||!r.length)return null;let i=oe(r.length);return r[i]?.Date||null}function xn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,i,a]=n;return`${a}-${String(o).padStart(2,"0")}-${String(i).padStart(2,"0")}`}let r=e.match(/\/Date\((-?\d+)\)\//);if(r){let o=new Date(Number(r[1]));if(!Number.isNaN(o.getTime())){let i=o.getFullYear(),a=String(o.getMonth()+1).padStart(2,"0"),l=String(o.getDate()).padStart(2,"0");return`${i}-${a}-${l}`}}return null}function Ra(t){if(!t)return!1;let[e,n,r]=t.slice(0,10).split("-").map(Number);if(!e||!n||!r)return!1;let o=n-1;for(let i of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let a=i.querySelector("a");if(!a)continue;let l=parseInt(i.getAttribute("data-month"),10),f=parseInt(i.getAttribute("data-year"),10),u=parseInt(a.textContent,10);if(f===e&&l===o&&u===r)return!0}return!1}var Pe=null;function qa(t,e){Pe&&c.clear(Pe);let n=Date.now()+(e?ne:8e3),r=()=>{!c.alive||Date.now()>n||Ra(t)||(c.send({action:"selectFirstDate",date:t,maxMs:e?ne:8e3,pollMs:R}),Pe=c.setTimeout(r,R))};Pe=c.setTimeout(r,80)}function ko(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Oa(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function Ao(t){if(!t?.length)return{entry:null,slotIndex:0};if(t.length===1)return{entry:t[0],slotIndex:0};let e=t.map((r,o)=>({entry:r,index:o,avail:Oa(r)})).sort((r,o)=>o.avail!==r.avail?o.avail-r.avail:r.index-o.index),n=e[1]||e[0];return{entry:n.entry,slotIndex:n.index}}var Eo=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),Mo=null,Na=null,Le=null;function Ba(t,e){Mo=t,Na=e?String(e).slice(0,10):null}function $o(t,e=0){Le&&c.clear(Le);let n=t?String(t).slice(0,10):null,r=0,o=async()=>{if(!c.alive||ln()||++r>240||I())return;let i=(Mo||[]).filter(a=>a&&a.Time);if(i.length){let{entry:a,slotIndex:l}=Ao(i);if(z(`Watchdog: picking time slot #${l+1}\u2026`),await Yt({time:ko(a.Time),date:a.Date?String(a.Date).slice(0,10):n,slotIndex:l,pollMs:R,maxMs:600,prefix:m}),I())return}else if(document.querySelector(Eo)&&(z("Watchdog: picking visible time slot\u2026"),await Yt({time:"00:00",date:n,slotIndex:e,pollMs:R,maxMs:600,prefix:m}),I()))return;Le=c.setTimeout(o,R)};Le=c.setTimeout(o,300)}var Ha=["#datepicker.hasDatepicker","#datepicker .ui-datepicker","#ui-datepicker-div"].join(", ");async function Wa(t,e=!1){if(e)return null;let n=await La(t,e);if(!n)return null;let r=await j(),o=new Date;o.setHours(0,0,0,0);let i=(t||[]).map(f=>xn(f?.Date)).filter(Boolean).filter(f=>{let[u,p,g]=f.slice(0,10).split("-").map(Number);return new Date(u,p-1,g)>=o}).sort((f,u)=>f.localeCompare(u)),a=r?i.filter(f=>ae(f,r.from,r.to)):i,l=oe(a.length);return z(`Selecting date #${l+1}: ${n}\u2026`),await c.waitFor(Ha,{attempts:120,interval:R}),c.send({action:"selectFirstDate",date:n,maxMs:r?ne:8e3,pollMs:R}),qa(n,r),$o(n,re),n}async function Fa(t,e=!1){if(e||C()||ln())return;let n=await j();if(!n&&!await w("autoSelectFirstDate"))return;let r=(t||[]).filter(p=>!(!p||!p.Time||p.EntriesAvailable!=null&&Number(p.EntriesAvailable)<=0));n&&(r=r.filter(p=>{let g=p.Date?String(p.Date).slice(0,10):null;return g?g>=n.from&&g<=n.to:!0}));let{entry:o,slotIndex:i}=Ao(r);if(!o)return;let a=ko(o.Time),l=o.Date?String(o.Date).slice(0,10):null;z(`Waiting for time slots\u2026 (2nd-highest avail ${o.EntriesAvailable??"?"} @ ${a}, pick #${i+1})`);let f=Date.now()+1e4;for(;Date.now()<f&&c.alive&&!(Ur(r)||document.querySelector(Eo));)await new Promise(p=>c.setTimeout(p,R));if(await Yt({time:a,date:l,slotIndex:i,pollMs:R,maxMs:12e3,prefix:m})||I()?z(`Time ${a} selected (availability ${o.EntriesAvailable??"?"}) \u2014 Submit in ${Zt}ms\u2026`):(z("Time table visible but slot click failed \u2014 retrying\u2026"),c.send({action:"bookTimeAndSubmitFast",time:a,date:l,slotIndex:i,selectMaxMs:no,submitWaitMs:Zt,pollMs:R,domWaitMs:ro,prefix:m})),n){await bn(n.accountId);return}I()&&yn()}async function Do(t){if(!q()||C())return;let e;try{e=Ia(t)}catch{return}if(e==null)return;if(jr(e),e.retryAfter!==void 0){let i=Number(e.retryAfter);ar(e.cgiBlock,i),i?(Se(i),fn(i)):w("defaultWaitTime").then(a=>{Se(a),fn(a)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let i=e.response.Posts||[],a=new Map((await J()).map(l=>[l.ID,l]));for(let l of i)a.set(l.ID,{...a.get(l.ID),...l});await xt([...a.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let i=e.response.Members||[];if(i.length){let a=await W()||{},l=a.name&&i.find(f=>f.FullName===a.name);a.visa=(l||i[0]).VisaClassName,await T({profile:a,members:i})}}if(_o.includes(e.tail)){$t(),Cr(e),mo();let i=await j();await se()||w("defaultWaitTime").then(p=>{Se(p)});let l=await J(),f=l.find(p=>p.ID===e.params.postId);f&&(f.Days=e.response.ScheduleDays,f.Updated=Date.now(),f.HasError=e.response.HasError,f.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,xt(l)),await Pa(e.response.ScheduleDays,{postId:e.params.postId,postName:f?.Name,hasError:e.response.HasError}),await Lr(e.response.ScheduleDays,{postId:e.params.postId,postName:f?.Name,hasError:e.response.HasError}),i&&!e.response.HasError?un(e.response.ScheduleDays,i.from,i.to).length?It():yt():i&&yt();let u=await Wa(e.response.ScheduleDays,e.response.HasError);if(u)It(),await Rr(f?.Name,u);else if(i&&!e.response.HasError){let p=(e.response.ScheduleDays||[]).map(b=>xn(b?.Date)).filter(Boolean),g=p.filter(b=>ae(b,i.from,i.to));p.length&&!g.length?(yt(),z(`Dates found but none in ${i.from} \u2192 ${i.to}. Next city in 13\u201318s\u2026`)):p.length||(yt(),z("No dates on this city \u2014 next city in 13\u201318s\u2026"))}await je()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let i=e.params.Date.split("T")[0];Ba(e.response.ScheduleEntries,i),$o(i,re);let a=await J(),l=a.filter(u=>u.Days&&u.Updated).sort((u,p)=>p.Updated-u.Updated).find(u=>u.Days.some(p=>p.Date===i));if(l){let u=l.Days.find(p=>p.Date===i);u&&(u.Times=e.response.ScheduleEntries,xt(a))}await Fa(e.response.ScheduleEntries,e.response.HasError);let f=(e.response.ScheduleEntries||[]).filter(u=>u&&u.Time);f.length?(It(),await qr(l?.Name,e.params.Date,f.length)):(yt(),z("No time slots on this date \u2014 next city in 13\u201318s\u2026")),await je()}}function Io(t){if(!q()||C())return;let e=Co(t.data.url);_o.includes(e)&&wr()}var bt=null,Tn="",vn={scanning:"Scanning for Cloudflare challenge\u2026",dom:"Trying page-level verify click\u2026",debugger:"Advanced click \u2014 targeting Turnstile iframe\u2026",retry:"Waiting before next attempt\u2026",success:"Verification passed \u2014 continuing\u2026",manual:"Stuck? Click the checkbox once, then we\u2019ll continue."};function Po(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=d.cfFlash,n.dataset[x.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),c.setTimeout(()=>n.remove(),1200)}}function Ua(){let t=document.querySelector(h(s.cfHud));return t||(t=document.createElement("div"),t.id=s.cfHud,t.dataset[x.mark]="",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.innerHTML=`
    <div class="${d.cfHud}">
      <div class="${d.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">\u{1F6E1}</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${vn.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `,document.documentElement.appendChild(t),t)}async function k(t,e){if(!chrome.runtime?.id||!c.alive||!await w("autoCloudflareTick"))return;let n=Ua(),r=n.querySelector("[data-cf-msg]"),o=n.querySelector("[data-cf-sub]"),i=n.querySelector("[data-cf-chip]"),a=n.querySelector(`.${d.cfHud}`);Tn=t,r&&(r.textContent=vn[t]||vn.scanning),o&&(o.textContent=e||Ka(t)),i&&(i.textContent=t==="success"?"Done":t==="manual"?"Help":"Active",i.dataset.state=t),a&&(a.dataset.state=t),bt&&(c.clear(bt),bt=null),t==="success"&&(bt=c.setTimeout(()=>_n(),2800))}function Ka(t){return t==="debugger"?"Precision click via advanced browser bridge":t==="dom"?"Standard page interaction":t==="manual"?"One manual click is usually enough":t==="success"?"Resuming login and recovery":"Monitoring this tab for Turnstile"}function _n(){let t=document.querySelector(h(s.cfHud));t&&t.remove(),Tn="",bt&&(c.clear(bt),bt=null)}function Cn(){return Tn}var Ya=/we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i,Va=/\bUSG\s+[a-f0-9-]{8,}/i;var An="vsPortalErrorReloadCount",qo="vsPortalErrorReloadAt",ja=2e3,za=1e4,Lo=!1,Pt=null,Ga=null;function Xa(){return(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim()}function Lt(){let t=Xa().slice(0,6e3);return t?!!(/a timeout occurred/i.test(t)&&(/error\s*524/i.test(t)||/origin web server timed out/i.test(t)||/cloudflare ray id/i.test(t))||/error\s*524/i.test(t)&&/cloudflare/i.test(t)&&t.length<8e3||Ya.test(t)&&(Va.test(t)||/error id\s*#/i.test(t))||/we'?re sorry,\s*but something went wrong/i.test(t)&&t.length<2500):!1}function Oo(){try{return Math.max(0,Number(sessionStorage.getItem(An)||0))}catch{return 0}}function Qa(){try{let t=Oo()+1;return sessionStorage.setItem(An,String(t)),sessionStorage.setItem(qo,String(Date.now())),t}catch{return 1}}function kn(){try{sessionStorage.removeItem(An),sessionStorage.removeItem(qo)}catch{}}function Za(t){return Math.min(za,ja+Math.max(0,t-1)*1e3)}function Ja(){Pt&&(c.clear(Pt),Pt=null)}function ts(){Qa();try{location.reload()}catch{}}function Ro(){if(!c.alive||Pt)return;if(!Lt()){kn();return}let t=Oo()+1,e=Za(t);Pt=c.setTimeout(()=>{if(Pt=null,!!c.alive){if(!Lt()){kn();return}ts()}},e)}function No(){if(Lo)return;Lo=!0;let t=()=>{c.alive&&(Lt()?Ro():(kn(),Ja()))};t(),Ga=c.setInterval(t,1500);try{let e=new MutationObserver(()=>{c.alive&&Lt()&&Ro()});e.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),c.disposable(()=>e.disconnect())}catch{}}var qe=null,ue=0,le=null,at=0;async function es(){try{let e=(await S("humanClickProfile")).humanClickProfile,n=e?.liveTrained&&e.samples?.length||0;return n<5?15e3:n<20?1e4:n<50?6e3:3500}catch{return 12e3}}var Mn=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function U(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!$()&&!Cn()}function $(){if(Lt()||document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return Mn.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:En().length>0}function Re(t){return new Promise(e=>setTimeout(e,t))}function ns(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let r of n.querySelectorAll("*"))r.shadowRoot&&(t.push(r.shadowRoot),e.push(r.shadowRoot))}return t}function En(){let t=[],e=new Set,n=r=>{if(!r||e.has(r))return;let o=r.getBoundingClientRect();if(o.width<40||o.height<20||o.width>900||o.height>400)return;let i=(r.src||r.getAttribute?.("src")||"").toLowerCase(),a=(r.title||r.getAttribute?.("title")||"").toLowerCase(),l=(r.className?.toString?.()||"").toLowerCase(),f=(r.id||"").toLowerCase(),u=r.tagName==="IFRAME"&&(i.includes("challenges.cloudflare")||i.includes("turnstile")||a.includes("cloudflare")||a.includes("security challenge")),p=l.includes("cf-turnstile")||l.includes("turnstile")||f.includes("turnstile")||f.includes("challenge")||r.hasAttribute?.("data-sitekey")||r.hasAttribute?.("data-turnstile-widget");if(!u&&!p)if(r.tagName==="IFRAME"&&o.width>=120&&o.width<=420&&o.height>=45&&o.height<=120){if(!Mn.test(document.body?.innerText||""))return}else return;e.add(r),t.push({el:r,rect:o})};for(let r of ns()){for(let o of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let i of r.querySelectorAll(o))n(i);for(let o of r.querySelectorAll("iframe"))n(o)}return t}function rs(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function os(t){let e=[],n=new Set,r=(o,i)=>{if(!Number.isFinite(o)||!Number.isFinite(i)||o<1||i<1||o>window.innerWidth-1||i>window.innerHeight-1)return;let a=`${Math.round(o)},${Math.round(i)}`;n.has(a)||(n.add(a),e.push({x:Math.round(o),y:Math.round(i)}))};for(let{rect:o}of t){let i=o.top+o.height/2,a=o.left+Math.min(28,Math.max(18,o.width*.11));for(let l of[0,-4,4,-8,8,12,16,20,24,28,32])for(let f of[0,-3,3,-6,6])r(a+l,i+f);r(o.left+o.width*.5,i)}return e}function is(t){for(let{el:e,rect:n}of t)try{e.click();let r=n.left+Math.min(26,n.width*.12),o=n.top+n.height/2,i=document.elementFromPoint(r,o)||e;for(let a of["pointerdown","mousedown","mouseup","pointerup","click"])i.dispatchEvent(new MouseEvent(a,{bubbles:!0,cancelable:!0,clientX:r,clientY:o,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let r=n.getBoundingClientRect();if(r.width<4&&r.height<4)continue;let o=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!o.includes("human")&&!o.includes("verify")&&e==="input[type='checkbox']"){let i=n.closest("label, div, form");if(!Mn.test(i?.textContent||""))continue}return n.click(),!0}return!1}async function Bo(t){t.length&&(Po(t.slice(0,3)),c.send({action:"viewportClickPoints",points:t}),await w("cloudflareDebuggerClick")?(await k("debugger","Trained click on Verify you are human\u2026"),c.send({action:"cloudflareDebuggerClick",points:t,primaryOnly:!0})):await k("dom"))}async function Oe(){if(!await w("autoCloudflareTick"))return!1;if(U())return at=0,await k("success"),!0;at||(at=Date.now());let t=await es();if(Date.now()-at<t)return await k("scanning","Train window \u2014 click Verify you are human yourself (recording your mouse)\u2026"),!1;await k("scanning","Verify you are human page \u2014 preparing click\u2026");let e=En();rs(e),await Re(350),e=En();let n=os(e);return n.length&&(await Bo(n),await Re(1200),U()||!$())?(at=0,await k("success"),!0):(await k("dom"),is(e),await Re(600),U()||!$()?(at=0,await k("success"),!0):n.length&&(await Bo(n),await Re(1e3),U()||!$())?(at=0,await k("success"),!0):(ue++,ue>=8?await k("manual","Click the checkbox once \u2014 we will continue after."):await k("retry",`Retry ${ue}/8\u2026`),!1))}function as(){le||(le=new MutationObserver(()=>{c.alive&&$()&&!U()&&Oe()}),le.observe(document.documentElement,{childList:!0,subtree:!0}),c.disposable(()=>{le?.disconnect(),le=null}))}function $n(){qe&&(c.clear(qe),qe=null),ue=0,at=0,_n()}async function Dn(){if($n(),!await w("autoCloudflareTick"))return;as();let t=async()=>{if(c.alive&&await w("autoCloudflareTick")){if($()&&!U()){await Oe();return}Cn()&&(ue=0,await k("success"))}};t(),qe=c.setInterval(t,1800)}var st="sessionRecovery",In="homeKeepaliveAt",Ho=12e4,ss=18e4,cs=9e4,Ne=!1,Wo=null,Pn=null,Ln=null;function Fo(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function ls(t,e){let n=Fo(t);if(!n)return"";let r="",o=0;for(let i of e||[]){let a=Fo(i.q);if(!a||!i.a)continue;if(n.includes(a)||a.includes(n))return i.a;let l=a.split(" ").filter(p=>p.length>3),f=0;for(let p of l)n.includes(p)&&f++;let u=l.length?f/l.length:0;u>o&&u>=.5&&(o=u,r=i.a)}return r}async function us(){let t=await S([rt,"profile"]),e=t[rt]||{},n=t.profile?.id?String(t.profile.id):null,r=n?e[n]:null;return r||(r=Object.values(e).find(o=>o?.loginId&&o?.loginPass)||null),r||{}}function Uo(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,r=Object.getOwnPropertyDescriptor(n,"value")?.set;r?r.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function ct(t){return new Promise(e=>setTimeout(e,t))}function G(t,e){return t+Math.random()*(e-t)}async function Rn(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await ct(G(250,600)),Uo(t,"");let r="";for(let o=0;o<n.length;o++){let i=n[o];r+=i,Uo(t,r),t.dispatchEvent(new KeyboardEvent("keydown",{key:i,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:i,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:i,bubbles:!0}));let a=G(90,220);/[\s@._]/.test(i)&&(a+=G(120,320)),Math.random()<.08&&(a+=G(200,450)),await ct(a)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await ct(G(200,500))}var Be=!1,He=!1;function We(t){return!t||t.disabled?!1:(t.click(),!0)}function ds(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let r of t){let o=(r.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(o))continue;let i=r.querySelector("input[type='checkbox']")||document.getElementById(r.getAttribute("for")||"");i&&!i.checked&&(We(i),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(r=>/^(continue|ok|accept|agree)$/i.test((r.textContent||r.value||"").trim()));return e&&n&&We(n),e>0}function fs(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function ms(t){if(Be)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;Be=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await Rn(e,t.loginId),await ct(G(400,900))),n&&t.loginPass&&!n.value&&(await Rn(n,t.loginPass),await ct(G(500,1100)));let r=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(o=>/sign in|log in|continue/i.test(o.textContent||o.value||""));return r&&(n?.value||t.loginPass)?(await ct(G(600,1400)),We(r),!0):!!(e||n)}finally{Be=!1}}async function ps(t){if(He)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let o of n){let i=(o.textContent||"").trim();if(i.length<12||i.length>220||!/\?/.test(i)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(i))continue;let a=o.querySelector("input[type='text']")||document.getElementById(o.getAttribute("for")||"")||o.parentElement?.querySelector("input[type='text']");a&&a.offsetParent!==null&&e.push({text:i,input:a})}for(let o of["kba1_response","kba2_response","kba3_response"]){let i=document.getElementById(o);if(!i)continue;let l=(i.closest(".form-group, .entry, li, div")||i.parentElement)?.textContent||"";e.some(f=>f.input===i)||e.push({text:l,input:i})}let r=[];for(let{text:o,input:i}of e){if(i.value)continue;let a=ls(o,t.security);a&&r.push({input:i,ans:a})}if(!r.length)return!1;He=!0;try{for(let{input:i,ans:a}of r)await Rn(i,a),await ct(G(350,800));await ct(G(600,1400));let o=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(i=>/continue|submit|verify/i.test(i.textContent||i.value||""));return o&&We(o),!0}finally{He=!1}}function hs(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||$()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function de(){return it()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function gs(t=""){return/\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(t||""))}function qn(){if(de()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||$()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}async function ys(){let t=(await S(st))[st];if(!t?.active)return;let e=await us();if($()){await Oe();return}if(ds(),!await ps(e)){if(fs()){await ms(e);return}hs()&&(await T({[st]:{...t,active:!1,doneAt:Date.now()}}),c.send({action:"recoveryReturnToOfc"}))}}function Ko(){if(!qn()||Wo)return;let t=async()=>{!c.alive||!(await S(st))[st]?.active||await ys()};t(),Wo=c.setInterval(t,1200)}function Yo(){return Ho+Math.random()*(ss-Ho)}async function Vo(){try{let t=await S(In),e=Number(t[In])||0;return Date.now()-e<cs?!1:(await T({[In]:Date.now()}),!0)}catch{return!0}}function jo(){if(de()||!qn()||document.querySelector("#post_select")||Pn)return;let t=()=>{c.alive&&(Pn=c.setTimeout(async()=>{if(Pn=null,!c.alive||de()||gs(location.href)||document.querySelector("#post_select")||!qn())return;if(Be||He||Ne){t();return}if((await S(st))[st]?.active){t();return}if(!await Vo()){t();return}try{location.reload()}catch{t()}},Yo()))};t()}function zo(){if(!de()||Ln)return;let t=()=>{c.alive&&(Ln=c.setTimeout(async()=>{if(Ln=null,!(!c.alive||!de())){if(await Vo())try{c.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}t()}},Yo()))};t()}async function Go(t){if(!/PSE0501|unable to load appointment available days/i.test(String(t||""))||Ne)return;Ne=!0,c.setTimeout(()=>{Ne=!1},8e3);let e=await V();await T({[st]:{active:!0,ofcUrl:location.href,accountId:e,startedAt:Date.now()}}),c.send({action:"recoveryStart",ofcUrl:location.href})}var Nn="humanClickProfile",Bn=150,ei=120,bs=400,Xo=!1,lt=[],Fe=0,wt=0,qt=0,v=null,Qo=0,fe=!1,Rt=null,Ue=0;function ws(){let t=[];for(let e of document.querySelectorAll('iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]')){let n=e.getBoundingClientRect();n.width<40||n.height<20||n.width>900||n.height>400||t.push(n)}if(!t.length&&$())for(let e of document.querySelectorAll("iframe")){let n=e.getBoundingClientRect();n.width>=120&&n.width<=420&&n.height>=45&&n.height<=120&&t.push(n)}return t}function me(){let t=ws();if(!t.length)return null;let e=t[0];return{x:e.left+Math.min(28,Math.max(18,e.width*.11)),y:e.top+e.height/2,w:e.width,h:e.height,left:e.left,top:e.top}}function Hn(t,e,n){return n?t>=n.left-40&&t<=n.left+n.w+40&&e>=n.top-30&&e<=n.top+n.h+30:!1}function ni(t){let e=performance.now();Fe||(Fe=e);let n=v,r=n?(t.clientX-n.x)/Math.max(24,n.w*.12):0,o=n?(t.clientY-n.y)/Math.max(20,n.h*.5):0;lt.push({nx:Math.round(r*1e3)/1e3,ny:Math.round(o*1e3)/1e3,x:Math.round(t.clientX),y:Math.round(t.clientY),t:Math.round(e-Fe)}),lt.length>ei&&lt.shift()}async function ri(){return(await S(Nn))[Nn]||{version:2,maxSamples:Bn,samples:[],avgHoverMs:420,avgPressMs:70,avgApproachMs:800,liveTrained:!1}}function On(t,e,n){if(!t.length)return n;let r=t.reduce((o,i)=>o+(Number(i[e])||0),0);return Math.round(r/t.length)}async function Ss(t){let e=Date.now();if(e-Qo<bs)return null;Qo=e;let n=await ri(),r=Array.isArray(n.samples)?n.samples.slice():[];for(r.push(t);r.length>Bn;)r.shift();let o={version:2,maxSamples:Bn,samples:r,avgHoverMs:On(r,"hoverMs",420),avgPressMs:On(r,"pressMs",70),avgApproachMs:On(r,"approachMs",800),updatedAt:e,liveTrained:!0,source:"visa-page-live"};return await T({[Nn]:o}),Ue=r.length,o}function Ke(){lt=[],Fe=0,wt=0,qt=0,Rt=null}function Wn(){fe||(fe=!0,Ke(),v=me())}function oi(){fe=!1,v=null,Ke()}async function Zo(t){if(c.alive){if(!$()||U()){fe&&oi();return}Wn(),v||(v=me()),!qt&&v&&Hn(t.clientX,t.clientY,v)&&(qt=performance.now()),ni(t)}}async function Jo(t){if(!(!c.alive||t.button!==0)&&!(!$()||U())){Wn(),v=me(),wt=performance.now(),qt||(qt=wt),Rt={x:t.clientX,y:t.clientY},ni(t);try{k("scanning",`Recording click\u2026 (saved ${Ue} so far)`)}catch{}}}async function ti(t){if(!c.alive||t.button!==0||!wt)return;if(!$()&&!U()){Ke();return}let e=performance.now(),n=Math.max(25,Math.min(500,e-wt)),r=Math.max(30,Math.min(3e3,wt-(qt||wt))),o=lt.length?lt[lt.length-1].t:r,i=Math.max(r,Math.min(12e3,o||r)),a=lt.slice(-ei),l=v&&Hn(t.clientX,t.clientY,v)||v&&Rt&&Hn(Rt.x,Rt.y,v)||!v&&a.length>=2,f=Rt;if(Ke(),!l&&a.length<2||a.length<1&&!l)return;let u={hoverMs:Math.round(r),pressMs:Math.round(n),approachMs:Math.round(i),path:a,down:f?{x:Math.round(f.x),y:Math.round(f.y)}:null,up:{x:Math.round(t.clientX),y:Math.round(t.clientY)},target:v?{x:Math.round(v.x),y:Math.round(v.y),w:Math.round(v.w),h:Math.round(v.h),left:Math.round(v.left),top:Math.round(v.top)}:null,viewport:{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio||1,scrollX:Math.round(window.scrollX||0),scrollY:Math.round(window.scrollY||0)},pointerType:t.pointerType||"mouse",url:location.pathname+location.search,at:Date.now()};if(!u.target){let b=me();b&&(u.target={x:Math.round(b.x),y:Math.round(b.y),w:Math.round(b.w),h:Math.round(b.h),left:Math.round(b.left),top:Math.round(b.top)})}let p=await Ss(u);if(!p)return;let g=p.samples?.length||0;try{k("success",`Saved verify-human click #${g} \u2014 keep clicking naturally when it appears`)}catch{}}async function xs(){try{let t=await ri(),e=t.liveTrained&&t.samples?.length||0;return Ue=e,e}catch{return Ue}}function ii(){if(Xo)return;Xo=!0,c.on(window,"pointermove",Zo,{passive:!0,capture:!0}),c.on(window,"pointerdown",Jo,{passive:!0,capture:!0}),c.on(window,"pointerup",ti,{passive:!0,capture:!0}),c.on(window,"mousemove",Zo,{passive:!0,capture:!0}),c.on(window,"mousedown",Jo,{passive:!0,capture:!0}),c.on(window,"mouseup",ti,{passive:!0,capture:!0});let t=async()=>{if(!c.alive)return;if(!$()||U()){fe&&oi();return}Wn(),v||(v=me());let e=await xs();try{k("scanning",e?`Train mode \u2014 click Verify you are human naturally (saved ${e})`:"Train mode \u2014 move mouse naturally, then click Verify you are human (recording\u2026)")}catch{}};t(),c.setInterval(t,2500)}var vs=`
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

#${s.waitTime} .${d.pill} {
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  white-space: nowrap;
}

#${s.waitTime} .${d.pillTtl} {
  flex: 1;
  min-width: 0;
  padding: 0.35em 0.5em;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}

#${s.waitTime} .${d.pillTmr} {
  display: flex;
  align-items: center;
  padding: 0.35em 0.55em;
  border-radius: 5px 0 0 5px;
  background: rgba(255, 255, 255, 0.25);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-variant-numeric: tabular-nums;
}

#${s.waitTime} .${d.pillWait} { background-color: rgba(255, 0, 0, 0.35); color: #5c0000; }
#${s.waitTime} .${d.pillDone} { background-color: #1a4480; color: white; }

#atlas-sidebar .${d.sideLink} { background-color: #1a4480; color: white; }
#${s.datesPara} { margin: 0.5em 0; }

#${s.datesCont} .${d.datesLnk} { color: white; }
#${s.ofcDate} { font-weight: bold; }

.${d.card} {
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

#${s.histCont} .${d.cardTtl} {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
}
#${s.histCont} .${d.histScrl} {
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

#${s.histTbl} td.${d.dltDn} { color: #10b981; font-weight: 500; }
#${s.histTbl} td.${d.dltUp} { color: #ef4444; font-weight: 500; }

#${s.cdCard} .${d.cardTtl} {
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

#${s.cdTime}.${d.cdDiv}-over { font-size: 20px; }
.${d.cdDiv} {
  border-top: 1px solid #edf2f7;
  margin-top: 15px;
  padding-top: 12px;
}

.${d.footer} { font-size: 11px; }
#${s.histCont} .${d.footer} { margin-top: 8px; }
#${s.cdCard} .${d.footer} { margin: 0; }

#${s.histCont} .${d.footer} a,
#${s.cdCard} .${d.footer} a {
  color: #1a4480;
  text-decoration: none;
  font-weight: 500;
}

.${d.hidden} { display: none; }

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
#${s.aiBtn}.${d.aiOn} {
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
#${s.aiPanel} .${d.cardTtl} {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 700;
  color: #0f766e;
}
#${s.aiPanel} .${d.aiHint} {
  margin: 0 0 10px;
  font-size: 12px;
  line-height: 1.45;
  color: #475569;
}
#${s.aiPanel} .${d.aiRow} {
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
#${s.aiSubmitBtn}.${d.aiOnBtn} { background: #15803d; }
#${s.aiCitiesBtn}.${d.aiOnBtn} { background: #0f766e; }
#${s.aiStatus} { margin: 0; }
#${s.aiPanel} .${d.aiCities} {
  max-height: 220px;
  overflow: auto;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 6px 8px;
  margin-bottom: 10px;
  background: #f8fafc;
}
#${s.aiPanel} .${d.aiCityAct} {
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
#${s.aiPanel} .${d.aiCityAct}:hover {
  color: #1d4ed8;
}
#${s.aiPanel} .${d.aiCities} label {
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  margin: 4px 0;
}
#${s.aiPanel} .${d.aiCities} input[type="checkbox"] {
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
#${s.aiPanel} .${d.aiRow} label { flex: 1; min-width: 140px; }
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
#${s.cfHud} .${d.cfHud} {
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
#${s.cfHud} .${d.cfHud}[data-state="success"] {
  border-color: rgba(34, 197, 94, 0.45);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 24px rgba(34, 197, 94, 0.15);
}
#${s.cfHud} .${d.cfHud}[data-state="manual"] {
  border-color: rgba(251, 191, 36, 0.45);
}
#${s.cfHud} .${d.cfHud}[data-state="debugger"] {
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.32), 0 0 28px rgba(59, 130, 246, 0.18);
}
#${s.cfHud} .${d.cfPulse} {
  width: 10px;
  height: 10px;
  margin-top: 5px;
  border-radius: 50%;
  background: #60a5fa;
  box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.55);
  animation: ${m}cfpulse 1.6s ease-out infinite;
  flex-shrink: 0;
}
#${s.cfHud} .${d.cfHud}[data-state="success"] .${d.cfPulse} {
  background: #4ade80;
  animation: none;
  box-shadow: 0 0 12px rgba(74, 222, 128, 0.65);
}
#${s.cfHud} .${d.cfHud}[data-state="manual"] .${d.cfPulse} {
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
.${d.cfFlash} {
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
`;function ai(){if(document.querySelector(h(s.styles)))return;let t=document.createElement("style");t.id=s.styles,t.dataset[x.mark]="",t.textContent=vs,(document.head||document.documentElement).appendChild(t)}nr();wn();Un(()=>{xo(),c.destroy()});No();if(!C()){c.disposable(()=>{let r=document.querySelector(h(s.anchor)),o=document.querySelector("#post_select");r&&o&&r.replaceWith(o);for(let i of document.querySelectorAll("[data-"+x.mark+"]"))i.remove()}),ai(),c.send({action:"registerBlockGuard",prefix:m}),c.send({action:"registerRedirect",prefix:m}),c.send({action:"registerAlertGuard",prefix:m}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&c.send({action:"registerOfcReader",prefix:m}),c.on(window,"message",r=>{if(c.alive&&r.source===window)switch(r.data?.action){case tt.req:return Io(r);case tt.res:return Do(r);case tt.ofc:return Ar(r);case tt.err:return zt("native_alert",r.data?.text),Go(r.data?.text);case tt.sub:_r(),jt(),Or();return}}),chrome.storage.onChanged.addListener((r,o)=>{o==="local"&&(r.profile&&en(),r.waitPillClock&&xr(r.waitPillClock.newValue),r.autoCloudflareTick&&(r.autoCloudflareTick.newValue?Dn():$n()))}),c.on(document,"click",r=>{At();let o=r.target.closest(h(s.waitTime));if(o){if(o.dataset.skipClick){delete o.dataset.skipClick;return}Sr()}}),c.on(document,"keydown",At),c.on(window,"focus",At),c.on(document,"visibilitychange",()=>{document.hidden||At()}),Ko(),jo(),zo(),ii(),Dn();async function t(){!c.alive||C()||!it()||document.querySelector("#post_select")&&($t(),await Promise.all([Ze(),tn(),Sn()]),Fr({slotIndex:re,shouldPick:async()=>await j()?!0:!!await w("autoSelectFirstDate"),onSlotPicked:()=>vo()}))}async function e(){!c.alive||C()||!it()||await wo()}async function n(){ir(),sr(),await Promise.all([en(),lr(),cr(),Ze(),tn(),Sn()]),ze()}document.readyState==="complete"?n():c.on(window,"load",n),c.setInterval(t,2500),c.setInterval(e,3e4),e()}})();
