(()=>{function L(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function x(t){return L()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,i]of Object.entries(t))e[n]=i;return e}):Promise.resolve(typeof t=="string"?{}:t)}function C(t){return L()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function gn(t){return L()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function bn(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",i=>{String(i.reason?.message||i.reason||"").includes("Extension context invalidated")&&(i.preventDefault(),e())});let n=setInterval(()=>{L()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var yn="https://the.gopg.online",Ae=`${yn}/contribute`,wn=`${yn}/contribute/telegram`;var Sn=20,xn=4320*60*1e3,ne=100,vn=4,Et=100,Tn=240,Cn=50,kn=1440*60*1e3,ho={recheckButton:!0,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function y(t){return x({[t]:ho[t]}).then(e=>e[t])}function X(){return x({posts:[]}).then(t=>t.posts)}function ht(t){return C({posts:t})}function N(){return x("profile").then(t=>t.profile)}var at=t=>String(t).padStart(2,"0");function Dt(t){let e=at(t%60),n=Math.floor(t/60)%60,i=Math.floor(t/3600);return i?`${at(i)}:${at(n)}:${e}`:`${at(n)}:${e}`}function _n(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${at(n.getUTCHours())}:${at(n.getUTCMinutes())}:${at(n.getUTCSeconds())}`}}function $e(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),i=t%60,o=[];return e>0&&o.push(`${e}d`),(n>0||e>0)&&o.push(`${n}h`),o.push(`${i}m`),o.join(" ")}function An(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),i=o=>n.find(r=>r.type===o)?.value??"";return`${i("month")} ${i("day")} ${i("year")} ${i("hour")}:${i("minute")} ${i("dayPeriod")}`}function $n(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),i=parseInt(e[2],10),o=parseInt(e[3],10),r=e[4];r&&(r.toUpperCase()==="PM"&&n<12&&(n+=12),r.toUpperCase()==="AM"&&n===12&&(n=0));let a=new Date;return a.setHours(n,i,o,0),a.getTime()>Date.now()+6e4&&a.setDate(a.getDate()-1),a}var En=Symbol(),go=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&L()}on(t,e,n,i){t.addEventListener(e,n,{...i,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!L())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=vn,interval:n=ne}={}){return new Promise(i=>{let o=r=>{if(!this.alive)return;let a=document.querySelector(t);if(a)return i(a);if(r>=e)return i(null);this.setTimeout(()=>o(r+1),n)};o(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},c=new go;function Dn(){let t=globalThis[En];Object.defineProperty(globalThis,En,{value:c,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var ie=new Uint32Array(2);crypto.getRandomValues(ie);var In="abcdefghjkmnpqrstuvwxyz",bo=(ie[0].toString(36)+ie[1].toString(36)).replace(/[^a-z0-9]/g,""),m=(In[ie[0]%In.length]+bo).slice(0,8).padEnd(8,"x");function h(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var s={selRow:m+"01",anchor:m+"02",waitTime:m+"03",recheck:m+"04",histCont:m+"05",histTbl:m+"06",cdCard:m+"07",cdTime:m+"08",ofcDate:m+"09",styles:m+"10",datesCont:m+"11",datesPara:m+"12",aiBtn:m+"13",aiPanel:m+"14",aiFrom:m+"15",aiTo:m+"16",aiStatus:m+"17",aiConfirm:m+"18",aiCancel:m+"19",aiClose:m+"20",aiCities:m+"21",aiSubmitBtn:m+"22",aiCitiesBtn:m+"23",aiLogin:m+"24",aiPass:m+"25",aiQ1:m+"26",aiA1:m+"27",aiQ2:m+"28",aiA2:m+"29",aiQ3:m+"30",aiA3:m+"31",aiSaveLogin:m+"32",cfHud:m+"33",aiCitiesAll:m+"34",aiCitiesNone:m+"35"},d={pill:m+"a",pillTtl:m+"b",pillTmr:m+"c",pillWait:m+"d",pillDone:m+"e",footer:m+"f",card:m+"g",cardTtl:m+"h",histScrl:m+"i",dltDn:m+"j",dltUp:m+"k",cdDiv:m+"l",hidden:m+"m",sideLink:m+"n",datesLnk:m+"o",aiOn:m+"p",aiRow:m+"q",aiHint:m+"r",aiCities:m+"s",aiOnBtn:m+"t",aiCityAct:m+"x",cfHud:m+"u",cfPulse:m+"v",cfFlash:m+"w"},S={mark:m,w:m+"w",mw:m+"mw"},Z={req:m+"q",res:m+"r",ofc:m+"o",err:m+"e",sub:m+"s"};function gt(t){return t.map(e=>String.fromCharCode(e)).join("")}function yo(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function Mn(){let t=document.createElement("div");return t.className=d.footer,t.textContent=gt([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function wo(t){let e=document.getElementById(s.histCont);e&&e.remove(),e=document.createElement("div"),e.id=s.histCont,e.className=d.card,e.dataset[S.mark]="";let n=document.createElement("h4");n.className=d.cardTtl,n.textContent=gt([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let i=document.createElement("div");i.className=d.histScrl;let o=document.createElement("table");o.id=s.histTbl;let r=document.createElement("thead"),a=document.createElement("tr");for(let u of["Time","Est. Wait","Change"]){let p=document.createElement("th");p.textContent=u,a.appendChild(p)}r.appendChild(a),o.appendChild(r);let l=document.createElement("tbody");for(let u=t.length-1;u>=0;u--){let p=t[u],g="--",w="";if(u>0){let A=p.minutes-t[u-1].minutes;A<0?(g=`${A}m`,w=d.dltDn):A>0?(g=`+${A}m`,w=d.dltUp):g="0m"}let M=document.createElement("tr"),B=[[p.timeStr,""],[$e(p.minutes),""],[g,w]];for(let[A,rt]of B){let pt=document.createElement("td");rt&&(pt.className=rt),pt.textContent=A,M.appendChild(pt)}l.appendChild(M)}o.appendChild(l),i.appendChild(o),e.appendChild(i),e.appendChild(Mn());let f=document.getElementById("last-updated");f&&(f.closest("div, p, section")||f.parentElement).insertAdjacentElement("afterend",e)}function So(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function Ln(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),i=So();if(i!==null&&i>Tn&&!e.textContent.includes("(")){let a=$e(i);e.textContent=`${e.textContent} (${i} minutes / ${a})`}let o=n.textContent.trim().split(" (")[0],r=$n(o);if(r&&c.setInterval(()=>{let a=Math.floor((Date.now()-r)/1e3);a>=0&&(n.textContent=`${o} (${a}s ago)`)},1e3),i!==null){let a=yo(),l=sessionStorage.getItem(a);l||(l=Math.random().toString(36).substring(2,11),sessionStorage.setItem(a,l)),x({queueHistory:{}}).then(f=>{let u=f.queueHistory||{},p=Date.now(),g={};for(let[A,rt]of Object.entries(u)){if(!Array.isArray(rt))continue;let pt=rt[rt.length-1];pt&&p-pt.timestamp<kn&&(g[A]=rt)}let w=g[l]||[],M=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),B=w[w.length-1];(!B||B.minutes!==i||B.timeStr!==M)&&(w.push({timestamp:p,timeStr:M,minutes:i}),w.length>Cn&&w.shift(),g[l]=w,C({queueHistory:g})),wo(w)})}}function qn(t,e){let n=document.getElementById("error_row");if(!n)return;let i;t?i=e?`Blocked for 24 hours, about ${Dt(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":i="Temporarily blocked. Log in in a new tab, then press Recheck.";let o=document.createElement("div");o.className="atlas_validationalert alert alert-danger warning",o.dataset[S.mark]="",o.textContent=i,n.replaceChildren(o),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function Pn(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&x({cfRetryAfter:null}).then(n=>{let i=parseInt(n.cfRetryAfter,10);if(!isNaN(i)){gn("cfRetryAfter");let o=document.getElementById("what-happened-section");if(o){let r=document.createElement("div");r.id=s.cdCard,r.className=d.card,r.dataset[S.mark]="";let a=document.createElement("h4");a.className=d.cardTtl,a.textContent=gt([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),r.appendChild(a);let l=document.createElement("div");l.id=s.cdTime,r.appendChild(l);let f=document.createElement("div");f.className=d.cdDiv,r.appendChild(f),r.appendChild(Mn()),o.appendChild(r);let u=i,p=null,g=()=>{u>0?(l.textContent=Dt(u),u--):(l.classList.add(d.cdDiv+"-over"),l.textContent="You can try refreshing now!",p!=null&&c.clear(p))};g(),p=c.setInterval(g,1e3)}}})}async function On(){let t=document.querySelector(".username");if(!t)return;let e=t.innerText.match(/(.*)\((\d*)\)/);if(!e)return;let[,n,i]=e,o=await N()||{},r=!o.id||o.id===i?o:{};r.name=n.trim(),r.id=i;let a=document.querySelectorAll("script");for(let l of a){let f=l.innerText.trim();if(f.includes("setAuthenticatedUserContext")){let u=/setAuthenticatedUserContext\('([^']*)'\)/,p=f.match(u);p&&(r.email=p[1])}}await C({profile:r})}async function Rn(){let t=document.querySelector("#post_select");if(!t)return;let e=await X();for(let n of t.options){if(!n.value)continue;e.findIndex(o=>o.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await ht(e)}var xo=["visa-information","fee-payment","appointment-confirmation"];function vo(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(i=>{let o=i.querySelector(".text-bold");if(!o)return;let r=To(o.textContent);if(!xo.includes(r))return;let a=Co(i);a&&(n[r]=a)}),Object.keys(n).length?n:null}function To(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Co(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function Bn(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>xn)return null}catch{}return t.value}function ko(t){let e=(t.posts||[]).filter(o=>o.Updated).sort((o,r)=>o.Updated-r.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},i=Bn(t.cgiIdToken);return i&&(n.token=i),n}async function Ee(){if(!L()||!await y("serverSync"))return;let t=await x(["profile","posts","cgiIdToken"]),e=ko(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await fetch(Ae,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(o=>o.json());if(!n.success)return;let i="0";n.contribs>0&&(i=n.contribs.toString()),n.contribs>10&&(i="10+"),n.contribs>0&&await C({contribs:{email:t.profile?.email,updated:Date.now(),count:i}})}catch{}}function De(t=0){L()&&document.querySelector("#appointment-card")&&y("serverSync").then(e=>{if(!e)return;let n=vo();if(!n){t<Sn&&c.setTimeout(()=>De(t+1),ne);return}x(["profile","cgiIdToken","savedDashboard"]).then(i=>{let o=Bn(i.cgiIdToken);o&&JSON.stringify(n)!==JSON.stringify(i.savedDashboard)&&fetch(Ae,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:i.profile,dashboard:n,token:o})}).then(r=>r.json()).then(r=>{r.success&&C({savedDashboard:n})}).catch(()=>{})})})}var _o=[{slot:3,fromMin:0,toMin:2},{slot:1,fromMin:14,toMin:21},{slot:2,fromMin:24,toMin:31},{slot:3,fromMin:54,toMin:59}],Ao=[0,14,24,54],J=":14\u2013:21, :24\u2013:31, :54\u2013:02";function Nn(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=i=>Number(e.find(o=>o.type===i)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function st(t=new Date){let{minute:e}=Nn(t);for(let n of _o)if(e>=n.fromMin&&e<=n.toMin)return n.slot;return 0}function bt(t=new Date){if(st(t))return 0;let{minute:e,second:n}=Nn(t),i=e*60+n;for(let o of Ao){let r=o*60;if(i<r)return(r-i)*1e3}return 0}function It(t){return t<9e4?`${Math.ceil(t/1e3)}s`:`${Math.ceil(t/6e4)}m`}function Le(){let t=document.querySelector(h(s.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=s.selRow,t.dataset[S.mark]="",n.insertAdjacentElement("afterend",t);let i=document.createElement("span");return i.id=s.anchor,i.dataset[S.mark]="",i.dataset[S.w]=e.style.width,i.dataset[S.mw]=e.style.minWidth,i.hidden=!0,e.insertAdjacentElement("beforebegin",i),c.setStyle(e,"width","100%"),c.setStyle(e,"minWidth","0"),t.appendChild(e),t}var Mt="waitPillState",$o=3600*1e3,Wn=d.pillWait,Eo=d.pillDone;function Do(t,e){let n=document.createElement("span");n.className=`${d.pill} ${e}`;let i=(o,r)=>{let a=document.createElement("span");a.className=o,a.textContent=r,n.appendChild(a)};return i(d.pillTtl,t.title),t.timer!==void 0&&i(d.pillTmr,t.timer),n}function Io(t,e=Date.now()){if(t.kind==="waiting")return{label:"Waiting For Response",variant:Wn};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:Wn}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:Eo}}return null}function Mo(t,e,n=new Date){let i=_n(n);return t.seconds===void 0?{title:e?i:t.label,timer:e?void 0:i}:{title:i,timer:Dt(t.seconds)}}var Lo=class{#t=null;#e={kind:"idle"};#i=null;#n=null;#o=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get(Mt))[Mt];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>$o){chrome.storage.local.remove(Mt);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#o=t,this.#r(),this.#c()}toggleClockMode(){c.alive&&(this.setClockMode(!this.#o),chrome.storage.local.set({waitPillClock:this.#o}))}render(t){return Io(this.#e,t)}#l(t){return Mo(t,this.#o,new Date)}#r(){if(this.#t??=Po(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(d.hidden);return}this.#t.classList.remove(d.hidden),this.#t.replaceChildren(Do(this.#l(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#i&&(c.clear(this.#i),this.#i=null),t.kind==="running"?(chrome.storage.local.set({[Mt]:t}),this.#i=c.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove(Mt),this.#r(),this.#c()}#u(){this.#r(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,y("audioAlert").then(t=>{t&&Yo()})))}#c(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=c.setInterval(()=>this.#r(),1e3):!t&&this.#n&&(c.clear(this.#n),this.#n=null)}},St=new Lo,Ot="pillPosition",Hn=4;function Fn(t,e,n){return Math.max(e,Math.min(n,t))}function Yn(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,i=e.height>0?e.height:36;return{w:n,h:i}}function yt(t,e,n){let{w:i,h:o}=Yn(t),r=Fn(e,0,Math.max(0,window.innerWidth-i)),a=Fn(n,0,Math.max(0,window.innerHeight-o));return t.style.setProperty("left",r+"px","important"),t.style.setProperty("top",a+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:r,top:a}}function qo(t){var e=!1,n=!1,i=0,o=0,r=0,a=0;function l(u){if(e){var p=u.touches?u.touches[0]:u,g=p.clientX-i,w=p.clientY-o;!n&&Math.abs(g)<Hn&&Math.abs(w)<Hn||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",yt(t,r+g,a+w),u.cancelable&&u.preventDefault())}}function f(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",f),document.removeEventListener("touchmove",l),document.removeEventListener("touchend",f),n){let u=t.getBoundingClientRect();chrome.storage.local.set({[Ot]:{top:Math.round(u.top),left:Math.round(u.left)}})}n=!1}}t.addEventListener("mousedown",function(u){if(u.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let p=t.getBoundingClientRect();i=u.clientX,o=u.clientY,r=p.left,a=p.top,yt(t,p.left,p.top),document.addEventListener("mousemove",l),document.addEventListener("mouseup",f),u.preventDefault(),u.stopPropagation()}),t.addEventListener("touchstart",function(u){e=!0,n=!1,delete t.dataset.skipClick;let p=t.getBoundingClientRect();i=u.touches[0].clientX,o=u.touches[0].clientY,r=p.left,a=p.top,yt(t,p.left,p.top),document.addEventListener("touchmove",l,{passive:!1}),document.addEventListener("touchend",f)},{passive:!0})}function Po(){let t=document.querySelector(h(s.waitTime));return t||(t=document.createElement("div"),t.id=s.waitTime,t.className=d.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),qo(t),chrome.storage.local.get(Ot).then(e=>{let n=e[Ot];n&&typeof n.top=="number"&&typeof n.left=="number"&&yt(t,n.left,n.top)}),No(t),t)}function Un(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function Oo(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function Ro(t){let{w:e,h:n}=Yn(t),i=12;return[{left:i,top:i},{left:Math.max(i,window.innerWidth-e-i),top:i},{left:i,top:Math.max(i,window.innerHeight-n-i)},{left:Math.max(i,window.innerWidth-e-i),top:Math.max(i,window.innerHeight-n-i)}]}async function Bo(){let e=(await chrome.storage.local.get(Ot))[Ot];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function No(t){let e=!1,n=async()=>{if(!c.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(d.hidden))return;let i=Oo(),o=!!(i&&i.offsetParent!==null&&i.getBoundingClientRect().height>20),r=t.getBoundingClientRect();if(o&&Un(r,i.getBoundingClientRect())){let a=i.getBoundingClientRect(),l=Ro(t),f=l.find(u=>{let p={left:u.left,top:u.top,right:u.left+r.width,bottom:u.top+r.height};return!Un(p,a)})||l[2];e=!0,t.setAttribute("data-dodging",""),yt(t,f.left,f.top);return}if(e&&!o){e=!1,t.removeAttribute("data-dodging");let a=await Bo();a&&yt(t,a.left,a.top)}else o||t.removeAttribute("data-dodging")};c.setInterval(n,400),c.on(window,"resize",n)}async function qe(){if(!c.alive||!await y("defaultWaitTime")||!await c.waitFor("#post_select",{attempts:Et}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});St.setClockMode(t),await St.restore()}async function zn(){await y("defaultWaitTime")&&St.waiting()}async function ce(t){await y("defaultWaitTime")&&St.run(t)}function Vn(){St.toggleClockMode()}function Gn(t){St.setClockMode(t)}var Lt=null,qt=null,oe=null;function Qn(){return oe||(oe=new(window.AudioContext||window.webkitAudioContext),c.disposable(()=>oe?.close())),oe}async function Pe(t=150){try{let e=Qn();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let o=e.currentTime,r=t/1e3;i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(.1,o+.01),i.gain.setValueAtTime(.1,o+Math.max(.01,r-.02)),i.gain.linearRampToValueAtTime(0,o+r),n.start(),n.stop(o+r)}catch(e){console.error("Audio beep failed:",e)}}function Wo(t,e=125,n=125){let i=0,o=()=>{i>=t||(Pe(e),i++,c.setTimeout(o,e+n))};o()}var Ie=4,jn=50,Kn=50,Ho=600;function Xn(){if(qt)return;let t=()=>{Wo(Ie,jn,Kn);let e=Ie*jn+(Ie-1)*Kn;qt=c.setTimeout(t,e+Ho)};t()}var Fo=250,Uo=10,jo=300,Ko=1e3;function Yo(){if(Lt)return;let t=[];for(let o=0;o<=jo;o+=Uo)t.push(o);let e=Date.now(),n=0,i=()=>{let o=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&o>=t[n];){let r=n===t.length-1;Pe(r?Ko:Fo),n++}if(n<t.length){let r=t[n],a=e+r*1e3,l=Math.max(0,a-Date.now());Lt=c.setTimeout(i,l)}else xt()};i()}function xt(){Lt&&(c.clear(Lt),Lt=null),qt&&(c.clear(qt),qt=null),Me()}var re=null,ae=null,wt=null,se=null,Pt=null;async function Zn(){Me();try{let t=Qn();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),r=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=880,i.frequency.value=1320,o.gain.value=.85,r.gain.value=.65,n.connect(o).connect(e),i.connect(r).connect(e);let a=t.createOscillator(),l=t.createGain();a.type="triangle",a.frequency.value=3.2,l.gain.value=280,a.connect(l),l.connect(n.frequency),l.connect(i.frequency);let f=t.currentTime;n.start(f),i.start(f),a.start(f),wt={osc1:n,osc2:i,lfo:a,master:e};let u=()=>{wt&&(Pe(500),ae=c.setTimeout(u,1800))};u(),re=c.setTimeout(Me,12e4),Pt=document.title;let p=!1,g=()=>{wt&&(document.title=p?Pt:"!!! SUBMIT CLICKED !!!",p=!p,se=c.setTimeout(g,450))};g()}catch(t){console.error("Submit alarm failed:",t)}}function Me(){if(re&&(c.clear(re),re=null),ae&&(c.clear(ae),ae=null),se&&(c.clear(se),se=null),Pt&&(document.title=Pt,Pt=null),wt){try{let{osc1:t,osc2:e,lfo:n}=wt;t.stop(),e.stop(),n.stop()}catch{}wt=null}}function zo(){if(document.querySelector(h(s.recheck)))return;let t=Le();if(!t)return;let e=document.querySelector("#post_select"),n=document.createElement("button");n.id=s.recheck,n.type="button",n.textContent=gt([82,101,99,104,101,99,107]);let i=()=>{let o=st(),r=bt();n.disabled=!e.value||!o,n.title=o?"Recheck slots for the selected city":`Slot checks paused \u2014 IST windows ${J}. Next in ${It(r)}.`,n.classList.toggle(d.hidden,!e.value)};c.on(n,"click",()=>{if(!st()){let o=It(bt());n.title=`Outside slot window \u2014 next check at IST ${J} (in ${o})`,i();return}e.dispatchEvent(new Event("change",{bubbles:!0}))}),t.appendChild(n),i(),c.on(e,"change",i),c.setInterval(i,1e3)}async function Oe(){c.alive&&await y("recheckButton")&&await c.waitFor("#post_select",{attempts:Et})&&zo()}async function Re(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await c.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let i=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(l=>l.innerText.trim()===i))continue;let r=document.createElement("li");r.className="usa-sidenav__item",r.dataset[S.mark]="";let a=document.createElement("a");a.href=n.link,a.className=d.sideLink,a.target="_self",a.textContent=n.text,r.appendChild(a),t.appendChild(r)}}function Jn(t){if(t.response.HasError)return;let e=document.querySelector("#page_form");if(!e)return;let n={};for(let l of t.response.ScheduleDays||[]){if(!l?.Date||l.Date.length<10)continue;let f=l.Date.slice(0,7),u=parseInt(l.Date.slice(8,10),10);u&&(f in n?n[f].push(u):n[f]=[u])}document.querySelector(h(s.datesCont))?.remove();let i=document.querySelector("#post_select"),o=i?.options[i.selectedIndex]?.text??"",{container:r,details:a}=Vo(o);e.appendChild(r);for(let[l,f]of Object.entries(n)){let u=document.createElement("strong");u.textContent=l,a.append(u,`: ${f.join(", ")}`,document.createElement("br"))}Object.keys(n).length||a.append("No slots available",document.createElement("br"))}function Vo(t){let e=(a,l,f)=>{let u=document.createElement(a);return l&&(u.className=l),f?.appendChild(u),u},n=e("div","row");n.id=s.datesCont;let i=e("div","col-sm-12 atlas_section mt-3",n),o=e("div","col-sm-12 atlas_section_header_row",e("div","row",i));e("h2",null,o).textContent=t;let r=e("p",null,e("div","col-sm-12",e("div","row",i)));return r.id=s.datesPara,{container:n,details:r}}var ti=null;function Go(){let t=document.querySelector(h(s.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return c.setStyle(n,"display","flex"),c.setStyle(n,"alignItems","center"),c.setStyle(n,"justifyContent","flex-end"),c.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=s.ofcDate,t.dataset[S.mark]="",e.insertAdjacentElement("beforebegin",t),t}function Qo(){if(!location.pathname.includes("/schedule"))return;let t=ti;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=Go();n&&(n.textContent=`OFC (Estimate): ${An(e.appointmentDateStr)}`)}function ei(t){chrome.runtime?.id&&(ti=t.data.data,c.waitFor("#submitbtn").then(e=>{e&&Qo()}))}var le=new Map,ni=45e3,ue=new Map,ii=8e3,oi=0;function de(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function fe(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function Xo(t,e){return`${t}:${e.slice(0,5).join(",")}`}function Zo(t){let e=Date.now(),n=le.get(t);if(n&&e-n<ni)return!1;le.set(t,e);for(let[i,o]of le)e-o>ni*4&&le.delete(i);return!0}function Jo(t){let e=Date.now(),n=ue.get(t);if(n&&e-n<ii)return!1;ue.set(t,e);for(let[i,o]of ue)e-o>ii*6&&ue.delete(i);return!0}async function ri(){return await y("telegramViaServer")!==!1}async function ai(t,{kind:e="alert",dedupKey:n="",skipDedup:i=!1,notifyMuktesh:o=!0}={}){if(t&&await ri())try{await fetch(wn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:i,notify_muktesh:o}),signal:AbortSignal.timeout(2e4)})}catch{}}function tr(t,{kind:e="screen",dedupKey:n="",waitMs:i=0,skipDedup:o=!1,notifyMuktesh:r=!0}={}){c.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:i,skipDedup:o,notifyMuktesh:r,captureScreenshot:!0})}async function er(t,e,n){let i=de(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&r.push(`\u{1FAAA} <b>Visa:</b> ${n}`),r.push(`\u{1F550} <b>Checked:</b> ${o} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),r.push(`\u{1F4C6} <b>Dates (${i.length}):</b>`,"");for(let a of i.slice(0,30))r.push(`\u{1F7E2} <b>${fe(a)}</b>`);return i.length>30&&r.push("",`\u2795 <i>+${i.length-30} more dates</i>`),r.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),r.join(`
`)}function nr(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",i=document.querySelector("#datepicker")?.value||"\u2014",r=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:i,time:r}}async function si(t,{postId:e,postName:n,hasError:i}={}){if(i||!t?.length)return;let o=de(t);if(!o.length||!await y("telegramAlert"))return;let r=Xo(e||n||"unknown",o);if(!Zo(r))return;let a=await N(),l=await er(n,t,a?.visa||"");await ai(l,{kind:"slots",dedupKey:r,notifyMuktesh:!0})}function ir(t,e,n){let i=de(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`;if(i.length){let a=i.slice(0,5).map(l=>fe(l)).join(", ");return`<b>DATES AVAILABLE</b>
\u{1F3DB}\uFE0F ${r}
\u{1F4C6} ${i.length} date(s)
${a}${i.length>5?"\u2026":""}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}return`<b>City changed \u2014 no dates</b>
\u{1F3DB}\uFE0F ${r}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}function or(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=e?fe(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${i}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function rr(t,e,n){let i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?fe(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u23F0 ${n} slot(s)
\u{1F550} ${i} IST
\u{1F4F2} Visa Slot 6`}async function vt(t,{kind:e="screen",dedupKey:n,waitMs:i=0,skipDedup:o=!1}={}){if(await y("telegramScreenshots")===!1||!await ri())return;let r=n||`${e}:${String(t).slice(0,80)}`;!o&&!Jo(r)||tr(t,{kind:e,dedupKey:r,waitMs:i,skipDedup:o,notifyMuktesh:!0})}async function ci(t,{postId:e,postName:n,hasError:i}={}){let o=ir(n,t,i),r=de(t),a=r.length?"dates":"city";await vt(o,{kind:a,dedupKey:`${a}:${e||n}:${r.length}:${i?1:0}`,waitMs:r.length?1400:900})}async function li(t,e){await vt(or(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function ui(t,e,n){await vt(rr(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function di(){let t=Date.now();if(t-oi<8e3)return;oi=t;let e=await N(),{city:n,date:i,time:o}=nr(),r=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),a=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${i}`,`\u23F0 <b>Time:</b> ${o}`];e?.email&&a.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&a.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),a.push(`\u{1F550} <b>When:</b> ${r} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let l=a.join(`
`);await ai(l,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await vt(l,{kind:"submit",skipDedup:!0,waitMs:200})}var me=25;function ar(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Ne(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let i=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,i),n-1)}function mi(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function pi(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function We(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function fi(t){if(!t||t.disabled)return!1;try{let e=t.closest("tr"),i=[t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,t.closest("label"),t,e].filter(Boolean);for(let o of i)o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),o.click();(t.type==="radio"||t.type==="checkbox")&&(t.checked=!0),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function hi(){let t=new Set,e=[],n=i=>{if(!i||t.has(i)||We(i)||i.disabled)return;let o=i.closest("tr");o&&pi(o)||(t.add(i),e.push(i))};for(let i of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let o of document.querySelectorAll(`${i}:not([disabled])`))n(o);return e}function sr(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!mi(n)||pi(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function cr(t){for(let e of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(e.tagName!=="SELECT"||e.disabled||We(e))continue;let n=[...e.options].filter(o=>!o.disabled&&o.value&&o.value!=="0"&&mi({textContent:o.textContent}));if(!n.length)continue;let i=Ne(n.length,t);return e.value=n[i].value,e.dispatchEvent(new Event("change",{bubbles:!0})),!0}return!1}function lr(t){if(cr(t))return!0;let e=hi();if(e.length){let i=Ne(e.length,t);if(fi(e[i]))return!0}let n=sr();if(n.length){let i=Ne(n.length,t),o=n[i],r=o.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(r&&fi(r))return!0;let a=o.querySelector("label");if(a)return a.click(),!!o.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function $(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!We(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function ur({slotIndex:t=0,maxMs:e=12e3,pollMs:n=me,onTick:i}={}){let o=Date.now()+e,r=Math.max(10,n||25);return new Promise(a=>{let l=()=>{if(!c.alive)return a(!1);if(i?.(),lr(t)||$())return a(!0);if(Date.now()>=o)return a(!1);c.setTimeout(l,r)};l()})}function Rt({time:t,date:e,slotIndex:n,pollMs:i,maxMs:o}){let r=n??0,a=o||15e3,l=i||me;return c.send({action:"forcePickTimeSlot",slotIndex:r,maxMs:a,pollMs:l}),c.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:r,pollMs:l,domWaitMs:0,maxMs:a}),ur({slotIndex:r,maxMs:a,pollMs:l})}var Be=!1;function gi({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(Be)return;Be=!0;let i=!1,o=async()=>{if(!(!c.alive||i)){if($()){n?.();return}try{if(t&&!await t())return}catch{return}hi().length&&(i=!0,await Rt({slotIndex:e,time:"00:00",maxMs:800,pollMs:me}),i=!1,$()&&n?.())}};c.setInterval(o,me);let r=document.querySelector("#page_form")||document.body,a=new MutationObserver(()=>o());a.observe(r,{childList:!0,subtree:!0}),c.disposable(()=>{a.disconnect(),Be=!1})}function bi(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let i=ar(n?.Time);if(!i)continue;let o=i.match(/(\d{1,2}):(\d{2})/);if(!o)continue;let[,r,a]=o;if(e.includes(`${r}:${a}`)||e.includes(`${parseInt(r,10)}:${a}`))return!0}return!1}var pe="submitErrors",yi=50,dr=45e3,Si=0,He=new Set,Bt=null;function fr(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",i=document.querySelector("#datepicker")?.value||"";return{city:e,date:i,url:location.href}}function Nt(){Si=Date.now()+dr,He.clear(),yr()}function he(){return Date.now()<Si}function mr(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function pr(t){let e=await x({[pe]:[]}),n=Array.isArray(e[pe])?e[pe]:[];n.push(t),n.length>yi&&n.splice(0,n.length-yi),await C({[pe]:n})}function wi(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function hr(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${wi(t.source)}`,`\u{1F4AC} <b>Message:</b> ${wi(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let i=n.join(`
`);await vt(i,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function Wt(t,e,n={}){let i=String(e||"").trim();if(!i||!he()&&!n.force)return;let o=mr(t,i);if(He.has(o))return;He.add(o);let r=fr(),a=await N(),l={at:Date.now(),source:String(t||"unknown"),message:i.slice(0,2e3),city:n.city||r.city,date:n.date||r.date,url:n.url||r.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:a?.email||""};await pr(l);try{await hr(l)}catch{}}function gr(t){if(!he())return;let e=t?.status,n=t?.retryAfter,i=t?.cgiBlock,o=`Request failed (HTTP ${e||"?"})`;n!=null&&(o+=` \u2014 retry after ${n}s`),i&&(o+=" \u2014 CGI access limitation"),Wt("ajax_error",o,{status:e})}function xi(t){if(!he()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){gr({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",o=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";Wt("ajax_response",o,{route:t.tail||""})}var br=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function yr(){Bt&&c.clear(Bt);let t=()=>{if(!c.alive||!he()){Bt=null;return}for(let e of br)for(let n of document.querySelectorAll(e)){let i=(n.textContent||"").replace(/\s+/g," ").trim();!i||i.length<4||Wt("page_validation",i)}Bt=c.setTimeout(t,600)};Bt=c.setTimeout(t,500)}var et="aiSubmitByAccount",zt=8e3,Di=3500,Ii=0,I=25,Ut=80,Vt=0,Mi=6e3;function Gt(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}var be=13e3,wr=18e3,jt=45e3,O=45e3,vi=5e3,Sr=2e4,xr=15e3;function it(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function Ue(){return/\/ofc-schedule\b/i.test(location.pathname)}function T(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var vr=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function ge(t,e){let n=vr[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(o=>{let r=e===o?" selected":"";return`<option value="${o.replace(/"/g,"&quot;")}"${r}>${o}</option>`}).join("")}function Ti(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function ye(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function Qt(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function Se(t){return!!(t&&t.citiesEnabled&&t.cities?.length)}async function U(){let t=await N();return t?.id?String(t.id):null}async function Q(t){return t&&((await x(et))[et]||{})[t]||null}async function Li(t,e){if(!t)return;let i=(await x(et))[et]||{};e==null?delete i[t]:i[t]=e,await C({[et]:i})}var P=!1;function je(){return P}function qi(){P=!0,we(),Ft()}function Ct(){P=!1,D=!1,we()}async function Pi(t){qi();let e=await Q(t);if(!e){dt();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await Li(t,e),dt()}function Xt(t,e,n){let i=String(t||"").slice(0,10);return!(!i||i.length<10||e&&i<e||n&&i>n)}async function j(){if(P||T()||!it())return null;let t=await U();if(!t)return null;let e=await Q(t);return!Qt(e)||!e.from||!e.to?null:{...e,accountId:t}}async function Zt(){if(P||T()||!it())return null;let t=await U();if(!t)return null;let e=await Q(t);return Se(e)?{...e,accountId:t}:null}function Ke(t,e,n){let i=new Date;return i.setHours(0,0,0,0),(t||[]).filter(o=>o&&typeof o.Date=="string"&&o.Date.length>=10).filter(o=>Xt(o.Date,e,n)).filter(o=>{let[r,a,l]=o.Date.slice(0,10).split("-").map(Number);return new Date(r,a-1,l)>=i}).sort((o,r)=>String(o.Date).localeCompare(String(r.Date)))}var D=!1,tt=null,nt=null,G=!1,lt=0,q=!1,F=0,ut=0,Tr=0,Ht=0,Jt=!1,H=null,V=0,_=!1,k=0,Tt=null,ct=null,Kt=0,Ci=!1,ki="",_i=!1,Fe=0;function Cr(t){return(t||[]).map(e=>e.id).join("")}function Oi(){let t=document.querySelector(h(s.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function Ai(t){let e=document.querySelector(h(s.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function we(){tt&&(c.clear(tt),tt=null),D=!1}function kt(){Tt&&(c.clear(Tt),Tt=null)}function Ri(){kt(),k||(k=Date.now());let t=Math.max(500,jt-(Date.now()-k));Tt=c.setTimeout(()=>{Tt=null,!(!_||!q||!c.alive)&&(_=!1,k=0,E(Date.now()),b(`City Change \u2014 booking hold timed out (${jt/1e3}s); next city in 13\u201318s\u2026`),v())},t)}function kr(){ct&&(c.clear(ct),ct=null)}function Ye(t=Date.now()){let e=!1;if(G&&lt&&t-lt>=xr&&(G=!1,lt=0,e=!0),_&&(k||(k=t),t-k>=jt?(kt(),_=!1,k=0,e=!0):Tt||Ri()),Jt){if(V||(V=t),!Ni()&&t-V>=8e3)W(),e=!0;else if(t-V>=O)W(),e=!0;else if(!H){let n=Math.max(500,O-(t-V));H=c.setTimeout(()=>{H=null,!(!q||_)&&(W(),E(Date.now()),b(`City Change \u2014 still Loading after ${O/1e3}s; changing city\u2026`),v())},n)}}return D&&!tt&&(D=!1,e=!0),e}function Bi(){if(ct||!q)return;let t=()=>{if(ct=null,!q||!c.alive||P)return;let e=Date.now(),n=Ye(e),i=Kt>0&&e-Kt>=Sr;(n||i||!nt&&!G)&&(n||i?(E(Date.now()),b(i?"City Change \u2014 stuck; auto-restarting hops\u2026":"City Change \u2014 lock cleared; next city in 13\u201318s\u2026")):b("City Change \u2014 timer lost; restarting\u2026"),v()),q&&(ct=c.setTimeout(t,vi))};ct=c.setTimeout(t,vi)}function Ft(){Ve(),kr(),kt(),G=!1,lt=0,q=!1,_=!1,k=0,F=0,ut=0,Kt=0,W()}function W(){Jt=!1,V=0,H&&(c.clear(H),H=null)}function Ni(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let i=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(i))continue;let o=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let r of o)if(r&&/\bLoading\.{0,3}\b/i.test((r.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let o=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(o))continue;let r=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(r))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function _r(){Jt=!0,V=Date.now(),H&&c.clear(H),H=c.setTimeout(()=>{H=null,!(!q||_)&&(W(),E(Date.now()),b(`City Change \u2014 still Loading after ${O/1e3}s; changing city\u2026`),v())},O)}function ze(t){let e=Math.max(0,Number(t)||0)*1e3;Ht=Math.max(Ht,Date.now()+e),F=Math.max(F,Ht),W(),v()}function Wi(){W()}function _t(){P||(_=!0,k||(k=Date.now()),Ve(),W(),Ri(),b("City Change \u2014 paused (Auto Submit booking)\u2026"))}function ft(){_&&(kt(),_=!1,k=0,!(!q||P)&&(E(Date.now()),b("City Change \u2014 resuming; next city in 13\u201318s\u2026"),v()))}async function Hi(){let t=await j();if(!t)return;let e=Date.now();if(e-Fe<6e4)return;Fe=e;let i=document.querySelector("#post_select")?.value;if(!i){b("Auto Submit ON \u2014 pick a city first.");return}let r=(await X()).find(l=>String(l.ID)===String(i)),a=r?.Days;if(Array.isArray(a)&&a.length){let l=Ke(a,t.from,t.to);if(l.length){_t();let f=Gt(l.length),u=l[f].Date;b(`Auto Submit: picking date #${f+1} (${u.slice(0,10)})\u2026`),c.send({action:"selectFirstDate",date:u,maxMs:zt,pollMs:I});return}b(`Auto Submit ON \u2014 no dates in your range on ${r.Name||"this city"} yet.`);return}b("Auto Submit ON \u2014 loading slots for current city\u2026"),c.send({action:"selectPost",postId:String(i)})}function Ar(){Fe=0}function Ve(){nt&&(c.clear(nt),nt=null)}function $r(t,e){return t+Math.random()*(e-t)}function Er(){return $r(be,wr)}function E(t=Date.now()){F=t+Er()}function Fi(t=Date.now()){let e=bt(new Date(t));if(e>0)return e;if(Ht>t)return Ht-t;if(ut){let n=ut+be-t;if(n>0)return n}return F>t?F-t:0}function v(){if(!q)return;if(Ve(),_||Jt){nt=c.setTimeout(()=>{$i()},500);return}let t=Fi();t<be&&(ut?t=Math.max(0,ut+be-Date.now()):(F>Date.now()||E(Date.now()),t=F-Date.now())),nt=c.setTimeout(()=>{$i()},t)}function Dr(t,e){if(!t.length)return null;if(t.length===1)return t[0];let n=t.filter(i=>String(i.id)!==String(e));return n.length?n[Math.floor(Math.random()*n.length)]:t[0]}function Ge(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function Qe(){let t=document.querySelector(h(s.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function Xe(){return{from:document.querySelector(h(s.aiFrom))?.value||null,to:document.querySelector(h(s.aiTo))?.value||null}}function Ui(t=[],{force:e=!1}={}){let n=document.querySelector(h(s.aiCities));if(!n)return;let i=Ge(),o=Cr(i),r=document.querySelector(h(s.aiPanel)),a=r&&!r.classList.contains(d.hidden),l=Oi();if(!e&&o===ki&&n.querySelector('input[type="checkbox"]'))return;ki=o;let f=new Set(a&&l.length&&!e&&!t.length?l:(t.length?t:l).map(String));if(n.replaceChildren(),!i.length){n.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let u of i){let p=document.createElement("label"),g=document.createElement("input");g.type="checkbox",g.value=u.id,g.dataset.name=u.name,g.checked=f.has(u.id),p.append(g,document.createTextNode(u.name)),n.appendChild(p)}}function Ir(t){let e=t?.cities||[];return e.length?e.map(n=>n.name||n.id).join(", "):"\u2014"}async function Yt(t,e={}){let n=await Q(t)||{},{from:i,to:o}=Xe(),r=Qe(),a={...n,from:i||n.from||null,to:o||n.to||null,cities:r.length?r:n.cities||[],loginId:document.querySelector(h(s.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(h(s.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(l=>{let f=[s.aiQ1,s.aiQ2,s.aiQ3][l],u=[s.aiA1,s.aiA2,s.aiA3][l];return{q:document.querySelector(h(f))?.value?.trim()||n.security?.[l]?.q||"",a:document.querySelector(h(u))?.value?.trim()||n.security?.[l]?.a||"",set:l+1}}),...e};return typeof a.submitEnabled=="boolean"&&(a.enabled=a.submitEnabled),await Li(t,a),a}async function Mr(t,e){if(!st()||_||D)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let i=String(t);return String(n.value)===i?!1:(_r(),b(`Switching city \u2192 ${e||t}\u2026`),c.send({action:"selectPost",postId:i}),!0)}function ji(){Ci||!document.querySelector("#post_select")||(Ci=!0)}async function $i(){if(!(G||!q)){G=!0,lt=Date.now(),Kt=Date.now(),nt=null;try{if(P||T()||!c.alive){Ft();return}if(Ye()){E(Date.now()),b("City Change \u2014 auto-unstuck; next city in 13\u201318s\u2026"),v();return}if(_||D){let g=k?Date.now()-k:0;if(_&&g>=jt){kt(),_=!1,k=0,E(Date.now()),b("City Change \u2014 hold expired; next city in 13\u201318s\u2026"),v();return}let w=Math.max(0,jt-g);b(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(w/1e3)}s`),v();return}let t=Date.now(),e=st(new Date(t)),n=bt(new Date(t));if(!e){b(`City Change \u2014 waiting for slot window (IST ${J}, next in ${It(n)})`),v();return}if(Jt){let g=V?t-V:0;if(Ni()){if(g>=O){W(),E(Date.now()),b(`City Change \u2014 still Loading after ${O/1e3}s; changing city\u2026`),v();return}let M=Math.max(0,Math.ceil((O-g)/1e3));b(`City Change \u2014 Date Loading\u2026 stay (${M}s then hop if still Loading)`),v();return}let w=Math.max(0,Math.ceil((O-g)/1e3));if(b(`City Change \u2014 waiting calendar result\u2026 (${w}s max)`),g>=O){W(),E(Date.now()),v();return}v();return}let i=Fi(t);if(i>0){let g=Math.ceil(i/1e3);b(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,g)}s`),v();return}let o=await Zt();if(!o?.cities?.length){Ft();return}let r=new Set(Ge().map(g=>g.id)),a=o.cities.filter(g=>r.has(String(g.id)));if(!a.length){b("Preferred cities not found in the dropdown \u2014 pick cities again."),Ft();return}let l=document.querySelector("#post_select"),f=l?String(l.value):"",u=Dr(a,f);if(!u){E(t),v();return}await Mr(u.id,u.name)?(ut=Date.now(),E(ut),b(`City Change \u2014 switched to ${u.name||u.id}; waiting Date Loading (max ${O/1e3}s)`)):E(t),v()}finally{G=!1,lt=0}}}async function Ki(){if(P||T()||!it())return;let t=await Zt();if(!t?.cities?.length)return;let e=new Set(Ge().map(a=>a.id)),n=t.cities.filter(a=>e.has(String(a.id)));if(!n.length){b("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}kt(),W(),_=!1,k=0,D=!1,G=!1,lt=0,q=!0,Kt=Date.now(),F=Date.now();let i=document.querySelector("#post_select"),o=i?String(i.value):"",r=n.findIndex(a=>String(a.id)===o);Tr=r>=0?r:0,b(`City Change ON \u2014 IST ${J}; hop 13\u201318s; auto-unstick; Loading max ${O/1e3}s`),Bi(),v()}async function Yi(){if(P||T()||!Ue()||!c.alive||!(await Zt())?.cities?.length||!document.querySelector("#post_select"))return;if(!q){await Ki();return}let e=Ye();Bi(),(e||!nt&&!G)&&(e&&(E(Date.now()),b("City Change \u2014 auto-unstuck; next city in 13\u201318s\u2026")),v())}function zi(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function Ze(){let t=zi();if(t&&!t.disabled)try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}c.send({action:"forceClickSubmit",prefix:m,pollMs:I,maxMs:Mi})}function Lr(){if(!$())return!1;let t=zi();return!!(t&&!t.disabled)}function Vi(){b("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function Je(t){if(P||T()||D)return;let e=await Q(t);if(!Qt(e))return;_t(),D=!0,Nt();let n=Date.now(),i=!1,o=$()?Date.now():0,r=async f=>{if(!(i||!D||!c.alive)){if(i=!0,window.removeEventListener("message",a),tt&&(c.clear(tt),tt=null),T()){D=!1;return}if(D=!1,f){await Pi(t),b("Submit clicked \u2014 all Tik Tik operations stopped.");return}ft(),b(q?"Auto Submit \u2014 Submit not clicked in time; City Change resuming\u2026":"Auto Submit \u2014 Submit not clicked in time; still watching\u2026")}},a=f=>{!c.alive||f.source!==window||f.data?.action===Z.sub&&r(!0)};window.addEventListener("message",a);let l=async()=>{if(i||!D||!c.alive)return;let f=Date.now(),u=f-n;if($()&&!o&&(o=f,b(`Time slot selected \u2014 Submit in ${Ut}ms\u2026`)),o&&f-o>=Ut&&(Ze(),Lr()&&b("Clicking Submit\u2026")),u>=Mi)return r(!1);tt=c.setTimeout(l,I)};l()}async function Gi(){if(!$()||D||P)return;let t=await j();t&&await Je(t.accountId)}function b(t){let e=document.querySelector(h(s.aiStatus));e&&(e.textContent=t)}function K(t){b(t)}function qr(t){let e=document.querySelector(h(s.aiSubmitBtn)),n=document.querySelector(h(s.aiCitiesBtn)),i=Qt(t),o=Se(t);e&&(e.classList.toggle(d.aiOnBtn,i),e.textContent=i?"Auto Submit: ON":"Auto Submit: OFF"),n&&(n.classList.toggle(d.aiOnBtn,o),n.textContent=o?"City Change: ON":"City Change: OFF")}function Pr(t,e){let n=document.querySelector(h(s.aiStatus)),i=document.querySelector(h(s.aiBtn));if(!n||!i)return;qr(t);let o=Qt(t),r=Se(t);o||r?(i.classList.add(d.aiOn),i.textContent="Tik Tik ON"):(i.classList.remove(d.aiOn),i.textContent="Tik Tik");let l=[];o&&t.from&&t.to?l.push(`Auto Submit ON (${ye(t.from)} \u2013 ${ye(t.to)}, clicks Submit as soon as time slot is ready)`):l.push("Auto Submit OFF"),r?l.push(`City Change ON (${Ir(t)}, :14\u2013:21 & :24\u2013:31)`):l.push("City Change OFF"),n.textContent=`Account ${e||"\u2014"}: ${l.join(" \xB7 ")}`}async function dt(){let t=await U(),e=t?await Q(t):null;Pr(e,t);let n=document.querySelector(h(s.aiFrom)),i=document.querySelector(h(s.aiTo));n&&e?.from&&(n.value=e.from),i&&e?.to&&(i.value=e.to);let o=(e?.cities||[]).map(M=>M.id),r=document.querySelector(h(s.aiPanel)),a=r&&!r.classList.contains(d.hidden),l=Oi();Ui(a&&l.length?l:o);let f=document.querySelector(h(s.aiLogin)),u=document.querySelector(h(s.aiPass));f&&e?.loginId&&(f.value=e.loginId),u&&e?.loginPass&&(u.value=e.loginPass);let p=e?.security||[],g=[s.aiQ1,s.aiQ2,s.aiQ3],w=[s.aiA1,s.aiA2,s.aiA3];g.forEach((M,B)=>{let A=document.querySelector(h(M));A&&(A.innerHTML=ge(B,p[B]?.q||""))}),w.forEach((M,B)=>{let A=document.querySelector(h(M));A&&p[B]?.a&&(A.value=p[B].a)})}function Ei(t){let e=document.querySelector(h(s.aiPanel));e&&(e.classList.toggle(d.hidden,!t),t&&U().then(async n=>{let i=n?await Q(n):null;Ui((i?.cities||[]).map(o=>o.id),{force:!0})}))}async function Or(){let t=await U();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=await Q(t)||{},n=!Qt(e),{from:i,to:o}=Xe();if(n){if(!i||!o){b("Select both From and To dates before enabling Auto Submit.");return}if(i>o){b("From date must be before To date.");return}if(!window.confirm(`Enable Auto Submit?

Range: ${ye(i)} \u2013 ${ye(o)}
If a matching slot appears on the current city, it will select date + time and Submit once.

City Change is separate \u2014 use its own ON/OFF button.`))return;Ct(),we(),Ar(),await Yt(t,{submitEnabled:!0,from:i,to:o,confirmedAt:Date.now()})}else we(),await Yt(t,{submitEnabled:!1,from:i||e.from,to:o||e.to});await dt(),n&&await Hi()}async function Rr(){let t=await U();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let e=await Q(t)||{},n=!Se(e),i=Qe();if(n){if(!i.length){b("Select at least one preferred city before enabling City Change.");return}if(!window.confirm(`Enable City Change?

Cities: ${i.map(r=>r.name).join(", ")}
City checks run each hour during IST windows ${J}, switching cities every 13\u201318 seconds inside those windows.

Auto Submit is separate \u2014 use its own ON/OFF button.`))return;Ct(),await Yt(t,{citiesEnabled:!0,cities:i}),await dt(),ji(),await Ki();return}Ft(),await Yt(t,{citiesEnabled:!1,cities:i.length?i:e.cities||[]}),await dt()}async function Br(){let t=await U();if(!t){b("Open a logged-in schedule page so we can bind this to your account.");return}let{from:e,to:n}=Xe(),i=Qe(),o=document.querySelector(h(s.aiLogin))?.value?.trim(),r=document.querySelector(h(s.aiPass))?.value,a=[0,1,2].map(l=>({q:document.querySelector(h([s.aiQ1,s.aiQ2,s.aiQ3][l]))?.value?.trim()||"",a:document.querySelector(h([s.aiA1,s.aiA2,s.aiA3][l]))?.value?.trim()||""}));if(!o||!r){b("Enter ID and password before saving.");return}if(a.some(l=>!l.q||!l.a)){b("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}await Yt(t,{}),b("Saved ID, password, and 3 security questions (1 from each set).")}function tn(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==s.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==s.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===s.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function Qi(){document.querySelector(h(s.aiPanel))?.remove(),document.querySelector(h(s.aiBtn))?.remove(),tn()}function Nr(){if(T())return;if(!Ue()){Qi();return}if(document.querySelector(h(s.aiBtn)))return;let t=Le();if(!t)return;let e=document.createElement("button");e.id=s.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[S.mark]="",c.on(e,"click",()=>{let i=document.querySelector(h(s.aiPanel)),o=i&&i.classList.contains(d.hidden);Ei(!!o)}),t.appendChild(e);let n=document.createElement("div");n.id=s.aiPanel,n.className=d.hidden,n.dataset[S.mark]="",n.innerHTML=`
    <div class="${d.cardTtl}">Tik Tik (this account only)</div>
    <p class="${d.aiHint}">
      Two separate switches: <b>Auto Submit</b> books a matching date once;
      <b>City Change</b> checks slots in burst windows each hour (IST ${J}), switching cities every 13\u201318s inside those times.
    </p>
    <div class="${d.aiRow}">
      <label>From <input type="date" id="${s.aiFrom}" min="${Ti()}" /></label>
      <label>To <input type="date" id="${s.aiTo}" min="${Ti()}" /></label>
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
        <select id="${s.aiQ1}">${ge(0)}</select>
      </label>
      <label>Your answer for set 1
        <input type="text" id="${s.aiA1}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
      </label>
    </div>
    <div class="${d.aiRow}" style="flex-direction:column;align-items:stretch">
      <label>Set 2 \u2014 choose 1 question
        <select id="${s.aiQ2}">${ge(1)}</select>
      </label>
      <label>Your answer for set 2
        <input type="text" id="${s.aiA2}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
      </label>
    </div>
    <div class="${d.aiRow}" style="flex-direction:column;align-items:stretch">
      <label>Set 3 \u2014 choose 1 question
        <select id="${s.aiQ3}">${ge(2)}</select>
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
  `,t.insertAdjacentElement("afterend",n),c.on(n.querySelector(h(s.aiSubmitBtn)),"click",Or),c.on(n.querySelector(h(s.aiCitiesBtn)),"click",Rr),c.on(n.querySelector(h(s.aiSaveLogin)),"click",Br),c.on(n.querySelector(h(s.aiClose)),"click",()=>Ei(!1)),c.on(n.querySelector(h(s.aiCitiesAll)),"click",()=>Ai(!0)),c.on(n.querySelector(h(s.aiCitiesNone)),"click",()=>Ai(!1)),c.on(n.querySelector(h(s.aiFrom)),"change",i=>{let o=n.querySelector(h(s.aiTo));o&&i.target.value&&(o.min=i.target.value)}),dt()}function Wr(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",c.on(e,"click",()=>{Nt(),U().then(n=>{n?Pi(n):qi()})}))};t(document.querySelector("#submitbtn")),c.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function en(){if(c.alive&&!T()){if(!Ue()){Qi();return}await c.waitFor("#post_select",{attempts:Et})&&(Nr(),ji(),Wr(),!_i&&(_i=!0,c.setTimeout(()=>dt(),800),c.setTimeout(async()=>{await j()&&await Hi()},1500)))}}var Xi=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function Zi(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function Hr(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=Zi(t.data.url),i=new URLSearchParams(t.data.request||"").get("parameters");if(!i)return null;let o;try{o=JSON.parse(i)}catch{return null}return{params:o,tail:e,response:t.data.response}}async function Fr(t,e={}){t?.length&&(await si(t,e),await y("audioAlert")&&Xn())}async function Ur(t,e=!1){if(e||T())return null;let n=new Date;n.setHours(0,0,0,0);let i=(t||[]).map(a=>{if(!a)return null;let l=nn(a.Date);return l?{...a,Date:l}:null}).filter(Boolean).filter(a=>{let[l,f,u]=a.Date.slice(0,10).split("-").map(Number);return!l||!f||!u?!1:new Date(l,f-1,u)>=n}).sort((a,l)=>String(a.Date).localeCompare(String(l.Date))),o=await j();if(o){let a=i.filter(f=>Xt(f.Date,o.from,o.to));if(!a.length)return null;let l=Gt(a.length);return a[l]?.Date||null}if(!await y("autoSelectFirstDate")||!i.length)return null;let r=Gt(i.length);return i[r]?.Date||null}function nn(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,r,a]=n;return`${a}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime())){let r=o.getFullYear(),a=String(o.getMonth()+1).padStart(2,"0"),l=String(o.getDate()).padStart(2,"0");return`${r}-${a}-${l}`}}return null}function jr(t){if(!t)return!1;let[e,n,i]=t.slice(0,10).split("-").map(Number);if(!e||!n||!i)return!1;let o=n-1;for(let r of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let a=r.querySelector("a");if(!a)continue;let l=parseInt(r.getAttribute("data-month"),10),f=parseInt(r.getAttribute("data-year"),10),u=parseInt(a.textContent,10);if(f===e&&l===o&&u===i)return!0}return!1}var xe=null;function Kr(t,e){xe&&c.clear(xe);let n=Date.now()+(e?zt:8e3),i=()=>{!c.alive||Date.now()>n||jr(t)||(c.send({action:"selectFirstDate",date:t,maxMs:e?zt:8e3,pollMs:I}),xe=c.setTimeout(i,I))};xe=c.setTimeout(i,80)}function Ji(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Yr(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function to(t){if(!t?.length)return{entry:null,slotIndex:0};if(t.length===1)return{entry:t[0],slotIndex:0};let e=t.map((i,o)=>({entry:i,index:o,avail:Yr(i)})).sort((i,o)=>o.avail!==i.avail?o.avail-i.avail:i.index-o.index),n=e[1]||e[0];return{entry:n.entry,slotIndex:n.index}}var eo=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),no=null,zr=null,ve=null;function Vr(t,e){no=t,zr=e?String(e).slice(0,10):null}function io(t,e=0){ve&&c.clear(ve);let n=t?String(t).slice(0,10):null,i=0,o=async()=>{if(!c.alive||je()||++i>240||$())return;let r=(no||[]).filter(a=>a&&a.Time);if(r.length){let{entry:a,slotIndex:l}=to(r);if(K(`Watchdog: picking time slot #${l+1}\u2026`),await Rt({time:Ji(a.Time),date:a.Date?String(a.Date).slice(0,10):n,slotIndex:l,pollMs:I,maxMs:600,prefix:m}),$())return}else if(document.querySelector(eo)&&(K("Watchdog: picking visible time slot\u2026"),await Rt({time:"00:00",date:n,slotIndex:e,pollMs:I,maxMs:600,prefix:m}),$()))return;ve=c.setTimeout(o,I)};ve=c.setTimeout(o,300)}var Gr=["#datepicker.hasDatepicker","#datepicker .ui-datepicker","#ui-datepicker-div"].join(", ");async function Qr(t,e=!1){if(e)return null;let n=await Ur(t,e);if(!n)return null;let i=await j(),o=new Date;o.setHours(0,0,0,0);let r=(t||[]).map(f=>nn(f?.Date)).filter(Boolean).filter(f=>{let[u,p,g]=f.slice(0,10).split("-").map(Number);return new Date(u,p-1,g)>=o}).sort((f,u)=>f.localeCompare(u)),a=i?r.filter(f=>Xt(f,i.from,i.to)):r,l=Gt(a.length);return K(`Selecting date #${l+1}: ${n}\u2026`),await c.waitFor(Gr,{attempts:120,interval:I}),c.send({action:"selectFirstDate",date:n,maxMs:i?zt:8e3,pollMs:I}),Kr(n,i),io(n,Vt),n}async function Xr(t,e=!1){if(e||T()||je())return;let n=await j();if(!n&&!await y("autoSelectFirstDate"))return;let i=(t||[]).filter(p=>!(!p||!p.Time||p.EntriesAvailable!=null&&Number(p.EntriesAvailable)<=0));n&&(i=i.filter(p=>{let g=p.Date?String(p.Date).slice(0,10):null;return g?g>=n.from&&g<=n.to:!0}));let{entry:o,slotIndex:r}=to(i);if(!o)return;let a=Ji(o.Time),l=o.Date?String(o.Date).slice(0,10):null;K(`Waiting for time slots\u2026 (2nd-highest avail ${o.EntriesAvailable??"?"} @ ${a}, pick #${r+1})`);let f=Date.now()+1e4;for(;Date.now()<f&&c.alive&&!(bi(i)||document.querySelector(eo));)await new Promise(p=>c.setTimeout(p,I));if(await Rt({time:a,date:l,slotIndex:r,pollMs:I,maxMs:12e3,prefix:m})||$()?K(`Time ${a} selected (availability ${o.EntriesAvailable??"?"}) \u2014 Submit in ${Ut}ms\u2026`):(K("Time table visible but slot click failed \u2014 retrying\u2026"),c.send({action:"bookTimeAndSubmitFast",time:a,date:l,slotIndex:r,selectMaxMs:Di,submitWaitMs:Ut,pollMs:I,domWaitMs:Ii,prefix:m})),n){await Je(n.accountId);return}$()&&Ze()}async function oo(t){if(!L()||T())return;let e;try{e=Hr(t)}catch{return}if(e==null)return;if(xi(e),e.retryAfter!==void 0){let r=Number(e.retryAfter);qn(e.cgiBlock,r),r?(ce(r),ze(r)):y("defaultWaitTime").then(a=>{ce(a),ze(a)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let r=e.response.Posts||[],a=new Map((await X()).map(l=>[l.ID,l]));for(let l of r)a.set(l.ID,{...a.get(l.ID),...l});await ht([...a.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let r=e.response.Members||[];if(r.length){let a=await N()||{},l=a.name&&r.find(f=>f.FullName===a.name);a.visa=(l||r[0]).VisaClassName,await C({profile:a,members:r})}}if(Xi.includes(e.tail)){Ct(),Jn(e),Wi();let r=await j();await Zt()||y("defaultWaitTime").then(p=>{ce(p)});let l=await X(),f=l.find(p=>p.ID===e.params.postId);f&&(f.Days=e.response.ScheduleDays,f.Updated=Date.now(),f.HasError=e.response.HasError,f.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,ht(l)),await Fr(e.response.ScheduleDays,{postId:e.params.postId,postName:f?.Name,hasError:e.response.HasError}),await ci(e.response.ScheduleDays,{postId:e.params.postId,postName:f?.Name,hasError:e.response.HasError}),r&&!e.response.HasError?Ke(e.response.ScheduleDays,r.from,r.to).length?_t():ft():r&&ft();let u=await Qr(e.response.ScheduleDays,e.response.HasError);if(u)_t(),await li(f?.Name,u);else if(r&&!e.response.HasError){let p=(e.response.ScheduleDays||[]).map(w=>nn(w?.Date)).filter(Boolean),g=p.filter(w=>Xt(w,r.from,r.to));p.length&&!g.length?(ft(),K(`Dates found but none in ${r.from} \u2192 ${r.to}. Next city in 13\u201318s\u2026`)):p.length||(ft(),K("No dates on this city \u2014 next city in 13\u201318s\u2026"))}await Ee()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let r=e.params.Date.split("T")[0];Vr(e.response.ScheduleEntries,r),io(r,Vt);let a=await X(),l=a.filter(u=>u.Days&&u.Updated).sort((u,p)=>p.Updated-u.Updated).find(u=>u.Days.some(p=>p.Date===r));if(l){let u=l.Days.find(p=>p.Date===r);u&&(u.Times=e.response.ScheduleEntries,ht(a))}await Xr(e.response.ScheduleEntries,e.response.HasError);let f=(e.response.ScheduleEntries||[]).filter(u=>u&&u.Time);f.length?(_t(),await ui(l?.Name,e.params.Date,f.length)):(ft(),K("No time slots on this date \u2014 next city in 13\u201318s\u2026")),await Ee()}}function ro(t){if(!L()||T())return;let e=Zi(t.data.url);Xi.includes(e)&&zn()}var mt=null,rn="",on={scanning:"Scanning for Cloudflare challenge\u2026",dom:"Trying page-level verify click\u2026",debugger:"Advanced click \u2014 targeting Turnstile iframe\u2026",retry:"Waiting before next attempt\u2026",success:"Verification passed \u2014 continuing\u2026",manual:"Stuck? Click the checkbox once, then we\u2019ll continue."};function ao(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=d.cfFlash,n.dataset[S.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),c.setTimeout(()=>n.remove(),1200)}}function Zr(){let t=document.querySelector(h(s.cfHud));return t||(t=document.createElement("div"),t.id=s.cfHud,t.dataset[S.mark]="",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.innerHTML=`
    <div class="${d.cfHud}">
      <div class="${d.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">\u{1F6E1}</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${on.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `,document.documentElement.appendChild(t),t)}async function R(t,e){if(!chrome.runtime?.id||!c.alive||!await y("autoCloudflareTick"))return;let n=Zr(),i=n.querySelector("[data-cf-msg]"),o=n.querySelector("[data-cf-sub]"),r=n.querySelector("[data-cf-chip]"),a=n.querySelector(`.${d.cfHud}`);rn=t,i&&(i.textContent=on[t]||on.scanning),o&&(o.textContent=e||Jr(t)),r&&(r.textContent=t==="success"?"Done":t==="manual"?"Help":"Active",r.dataset.state=t),a&&(a.dataset.state=t),mt&&(c.clear(mt),mt=null),t==="success"&&(mt=c.setTimeout(()=>an(),2800))}function Jr(t){return t==="debugger"?"Precision click via advanced browser bridge":t==="dom"?"Standard page interaction":t==="manual"?"One manual click is usually enough":t==="success"?"Resuming login and recovery":"Monitoring this tab for Turnstile"}function an(){let t=document.querySelector(h(s.cfHud));t&&t.remove(),rn="",mt&&(c.clear(mt),mt=null)}function sn(){return rn}var Ce=null,ee=0,te=null,ln=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function At(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!Y()&&!sn()}function Y(){if(document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return ln.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:cn().length>0}function Te(t){return new Promise(e=>setTimeout(e,t))}function ta(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let i of n.querySelectorAll("*"))i.shadowRoot&&(t.push(i.shadowRoot),e.push(i.shadowRoot))}return t}function cn(){let t=[],e=new Set,n=i=>{if(!i||e.has(i))return;let o=i.getBoundingClientRect();if(o.width<40||o.height<20||o.width>900||o.height>400)return;let r=(i.src||i.getAttribute?.("src")||"").toLowerCase(),a=(i.title||i.getAttribute?.("title")||"").toLowerCase(),l=(i.className?.toString?.()||"").toLowerCase(),f=(i.id||"").toLowerCase(),u=i.tagName==="IFRAME"&&(r.includes("challenges.cloudflare")||r.includes("turnstile")||a.includes("cloudflare")||a.includes("security challenge")),p=l.includes("cf-turnstile")||l.includes("turnstile")||f.includes("turnstile")||f.includes("challenge")||i.hasAttribute?.("data-sitekey")||i.hasAttribute?.("data-turnstile-widget");if(!u&&!p)if(i.tagName==="IFRAME"&&o.width>=120&&o.width<=420&&o.height>=45&&o.height<=120){if(!ln.test(document.body?.innerText||""))return}else return;e.add(i),t.push({el:i,rect:o})};for(let i of ta()){for(let o of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let r of i.querySelectorAll(o))n(r);for(let o of i.querySelectorAll("iframe"))n(o)}return t}function ea(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function na(t){let e=[],n=new Set,i=(o,r)=>{if(!Number.isFinite(o)||!Number.isFinite(r)||o<1||r<1||o>window.innerWidth-1||r>window.innerHeight-1)return;let a=`${Math.round(o)},${Math.round(r)}`;n.has(a)||(n.add(a),e.push({x:Math.round(o),y:Math.round(r)}))};for(let{rect:o}of t){let r=o.top+o.height/2,a=o.left+Math.min(28,Math.max(18,o.width*.11));for(let l of[0,-4,4,-8,8,12,16,20,24,28,32])for(let f of[0,-3,3,-6,6])i(a+l,r+f);i(o.left+o.width*.5,r)}return e}function ia(t){for(let{el:e,rect:n}of t)try{e.click();let i=n.left+Math.min(26,n.width*.12),o=n.top+n.height/2,r=document.elementFromPoint(i,o)||e;for(let a of["pointerdown","mousedown","mouseup","pointerup","click"])r.dispatchEvent(new MouseEvent(a,{bubbles:!0,cancelable:!0,clientX:i,clientY:o,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let i=n.getBoundingClientRect();if(i.width<4&&i.height<4)continue;let o=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!o.includes("human")&&!o.includes("verify")&&e==="input[type='checkbox']"){let r=n.closest("label, div, form");if(!ln.test(r?.textContent||""))continue}return n.click(),!0}return!1}async function so(t){t.length&&(ao(t.slice(0,3)),c.send({action:"viewportClickPoints",points:t}),await y("cloudflareDebuggerClick")?(await R("debugger"),c.send({action:"cloudflareDebuggerClick",points:t})):await R("dom"))}async function ke(){if(!await y("autoCloudflareTick"))return!1;if(At())return await R("success"),!0;await R("scanning");let t=cn();ea(t),await Te(350),t=cn();let e=na(t);return e.length&&(await so(e),await Te(1200),At()||!Y())?(await R("success"),!0):(await R("dom"),ia(t),await Te(600),At()||!Y()?(await R("success"),!0):e.length&&(await so(e),await Te(1e3),At()||!Y())?(await R("success"),!0):(ee++,ee>=8?await R("manual","Click the checkbox once \u2014 we will continue after."):await R("retry",`Retry ${ee}/8\u2026`),!1))}function oa(){te||(te=new MutationObserver(()=>{c.alive&&Y()&&!At()&&ke()}),te.observe(document.documentElement,{childList:!0,subtree:!0}),c.disposable(()=>{te?.disconnect(),te=null}))}function un(){Ce&&(c.clear(Ce),Ce=null),ee=0,an()}async function dn(){if(un(),!await y("autoCloudflareTick"))return;oa();let t=async()=>{if(c.alive&&await y("autoCloudflareTick")){if(Y()&&!At()){await ke();return}sn()&&(ee=0,await R("success"))}};t(),Ce=c.setInterval(t,1800)}var $t="sessionRecovery",fn=!1,co=null;function lo(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function ra(t,e){let n=lo(t);if(!n)return"";let i="",o=0;for(let r of e||[]){let a=lo(r.q);if(!a||!r.a)continue;if(n.includes(a)||a.includes(n))return r.a;let l=a.split(" ").filter(p=>p.length>3),f=0;for(let p of l)n.includes(p)&&f++;let u=l.length?f/l.length:0;u>o&&u>=.5&&(o=u,i=r.a)}return i}async function aa(){let t=await x([et,"profile"]),e=t[et]||{},n=t.profile?.id?String(t.profile.id):null,i=n?e[n]:null;return i||(i=Object.values(e).find(o=>o?.loginId&&o?.loginPass)||null),i||{}}function uo(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,i=Object.getOwnPropertyDescriptor(n,"value")?.set;i?i.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function ot(t){return new Promise(e=>setTimeout(e,t))}function z(t,e){return t+Math.random()*(e-t)}async function hn(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await ot(z(250,600)),uo(t,"");let i="";for(let o=0;o<n.length;o++){let r=n[o];i+=r,uo(t,i),t.dispatchEvent(new KeyboardEvent("keydown",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:r,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:r,bubbles:!0}));let a=z(90,220);/[\s@._]/.test(r)&&(a+=z(120,320)),Math.random()<.08&&(a+=z(200,450)),await ot(a)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await ot(z(200,500))}var mn=!1,pn=!1;function _e(t){return!t||t.disabled?!1:(t.click(),!0)}function sa(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let i of t){let o=(i.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(o))continue;let r=i.querySelector("input[type='checkbox']")||document.getElementById(i.getAttribute("for")||"");r&&!r.checked&&(_e(r),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(i=>/^(continue|ok|accept|agree)$/i.test((i.textContent||i.value||"").trim()));return e&&n&&_e(n),e>0}function ca(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function la(t){if(mn)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;mn=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await hn(e,t.loginId),await ot(z(400,900))),n&&t.loginPass&&!n.value&&(await hn(n,t.loginPass),await ot(z(500,1100)));let i=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(o=>/sign in|log in|continue/i.test(o.textContent||o.value||""));return i&&(n?.value||t.loginPass)?(await ot(z(600,1400)),_e(i),!0):!!(e||n)}finally{mn=!1}}async function ua(t){if(pn)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let o of n){let r=(o.textContent||"").trim();if(r.length<12||r.length>220||!/\?/.test(r)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(r))continue;let a=o.querySelector("input[type='text']")||document.getElementById(o.getAttribute("for")||"")||o.parentElement?.querySelector("input[type='text']");a&&a.offsetParent!==null&&e.push({text:r,input:a})}for(let o of["kba1_response","kba2_response","kba3_response"]){let r=document.getElementById(o);if(!r)continue;let l=(r.closest(".form-group, .entry, li, div")||r.parentElement)?.textContent||"";e.some(f=>f.input===r)||e.push({text:l,input:r})}let i=[];for(let{text:o,input:r}of e){if(r.value)continue;let a=ra(o,t.security);a&&i.push({input:r,ans:a})}if(!i.length)return!1;pn=!0;try{for(let{input:r,ans:a}of i)await hn(r,a),await ot(z(350,800));await ot(z(600,1400));let o=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(r=>/continue|submit|verify/i.test(r.textContent||r.value||""));return o&&_e(o),!0}finally{pn=!1}}function da(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||Y()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function fa(){return it()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function ma(){if(fa())return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||Y()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}async function pa(){let t=(await x($t))[$t];if(!t?.active)return;let e=await aa();if(Y()){await ke();return}if(sa(),!await ua(e)){if(ca()){await la(e);return}da()&&(await C({[$t]:{...t,active:!1,doneAt:Date.now()}}),c.send({action:"recoveryReturnToOfc"}))}}function fo(){if(!ma()||co)return;let t=async()=>{!c.alive||!(await x($t))[$t]?.active||await pa()};t(),co=c.setInterval(t,1200)}async function mo(t){if(!/PSE0501|unable to load appointment available days/i.test(String(t||""))||fn)return;fn=!0,c.setTimeout(()=>{fn=!1},8e3);let e=await U();await C({[$t]:{active:!0,ofcUrl:location.href,accountId:e,startedAt:Date.now()}}),c.send({action:"recoveryStart",ofcUrl:location.href})}var ha=`
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
`;function po(){if(document.querySelector(h(s.styles)))return;let t=document.createElement("style");t.id=s.styles,t.dataset[S.mark]="",t.textContent=ha,(document.head||document.documentElement).appendChild(t)}Dn();tn();bn(()=>{Vi(),c.destroy()});if(!T()){c.disposable(()=>{let i=document.querySelector(h(s.anchor)),o=document.querySelector("#post_select");i&&o&&i.replaceWith(o);for(let r of document.querySelectorAll("[data-"+S.mark+"]"))r.remove()}),po(),c.send({action:"registerBlockGuard",prefix:m}),c.send({action:"registerRedirect",prefix:m}),c.send({action:"registerAlertGuard",prefix:m}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&c.send({action:"registerOfcReader",prefix:m}),c.on(window,"message",i=>{if(c.alive&&i.source===window)switch(i.data?.action){case Z.req:return ro(i);case Z.res:return oo(i);case Z.ofc:return ei(i);case Z.err:return Wt("native_alert",i.data?.text),mo(i.data?.text);case Z.sub:Zn(),Nt(),di();return}}),chrome.storage.onChanged.addListener((i,o)=>{o==="local"&&(i.profile&&Re(),i.waitPillClock&&Gn(i.waitPillClock.newValue),i.autoCloudflareTick&&(i.autoCloudflareTick.newValue?dn():un()))}),c.on(document,"click",i=>{xt();let o=i.target.closest(h(s.waitTime));if(o){if(o.dataset.skipClick){delete o.dataset.skipClick;return}Vn()}}),c.on(document,"keydown",xt),c.on(window,"focus",xt),c.on(document,"visibilitychange",()=>{document.hidden||xt()}),fo(),dn();async function t(){!c.alive||T()||!it()||document.querySelector("#post_select")&&(Ct(),await Promise.all([qe(),Oe(),en()]),gi({slotIndex:Vt,shouldPick:async()=>await j()?!0:!!await y("autoSelectFirstDate"),onSlotPicked:()=>Gi()}))}async function e(){!c.alive||T()||!it()||await Yi()}async function n(){Ln(),Pn(),await Promise.all([Re(),Rn(),On(),qe(),Oe(),en()]),De()}document.readyState==="complete"?n():c.on(window,"load",n),c.setInterval(t,2500),c.setInterval(e,3e4),e()}})();
