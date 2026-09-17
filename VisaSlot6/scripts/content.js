(()=>{function N(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function S(t){return N()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,o]of Object.entries(t))e[n]=o;return e}):Promise.resolve(typeof t=="string"?{}:t)}function T(t){return N()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function Qn(t){return N()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function Zn(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",o=>{String(o.reason?.message||o.reason||"").includes("Extension context invalidated")&&(o.preventDefault(),e())});let n=setInterval(()=>{N()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var Qe="https://the.gopg.online",Ze=`${Qe}/contribute`,Jn=`${Qe}/contribute/telegram`,Ks=`${Qe}/contribute/human-click`;var to=20,eo=4320*60*1e3,ge=100,no=4,Ht=100,oo=240,ro=50,io=1440*60*1e3,yi={recheckButton:!0,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function w(t){return S({[t]:yi[t]}).then(e=>e[t])}function nt(){return S({posts:[]}).then(t=>t.posts)}function Tt(t){return T({posts:t})}function B(){return S("profile").then(t=>t.profile)}var pt=t=>String(t).padStart(2,"0");function Wt(t){let e=pt(t%60),n=Math.floor(t/60)%60,o=Math.floor(t/3600);return o?`${pt(o)}:${pt(n)}:${e}`:`${pt(n)}:${e}`}function ao(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${pt(n.getUTCHours())}:${pt(n.getUTCMinutes())}:${pt(n.getUTCSeconds())}`}}function Je(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),o=t%60,r=[];return e>0&&r.push(`${e}d`),(n>0||e>0)&&r.push(`${n}h`),r.push(`${o}m`),r.join(" ")}function so(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),o=r=>n.find(i=>i.type===r)?.value??"";return`${o("month")} ${o("day")} ${o("year")} ${o("hour")}:${o("minute")} ${o("dayPeriod")}`}function co(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),o=parseInt(e[2],10),r=parseInt(e[3],10),i=e[4];i&&(i.toUpperCase()==="PM"&&n<12&&(n+=12),i.toUpperCase()==="AM"&&n===12&&(n=0));let a=new Date;return a.setHours(n,o,r,0),a.getTime()>Date.now()+6e4&&a.setDate(a.getDate()-1),a}var lo=Symbol(),bi=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&N()}on(t,e,n,o){t.addEventListener(e,n,{...o,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!N())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=no,interval:n=ge}={}){return new Promise(o=>{let r=i=>{if(!this.alive)return;let a=document.querySelector(t);if(a)return o(a);if(i>=e)return o(null);this.setTimeout(()=>r(i+1),n)};r(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},s=new bi;function uo(){let t=globalThis[lo];Object.defineProperty(globalThis,lo,{value:s,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var ye=new Uint32Array(2);crypto.getRandomValues(ye);var fo="abcdefghjkmnpqrstuvwxyz",wi=(ye[0].toString(36)+ye[1].toString(36)).replace(/[^a-z0-9]/g,""),m=(fo[ye[0]%fo.length]+wi).slice(0,8).padEnd(8,"x");function h(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var c={selRow:m+"01",anchor:m+"02",waitTime:m+"03",recheck:m+"04",histCont:m+"05",histTbl:m+"06",cdCard:m+"07",cdTime:m+"08",ofcDate:m+"09",styles:m+"10",datesCont:m+"11",datesPara:m+"12",aiBtn:m+"13",aiPanel:m+"14",aiFrom:m+"15",aiTo:m+"16",aiStatus:m+"17",aiConfirm:m+"18",aiCancel:m+"19",aiClose:m+"20",aiCities:m+"21",aiSubmitBtn:m+"22",aiCitiesBtn:m+"23",aiLogin:m+"24",aiPass:m+"25",aiQ1:m+"26",aiA1:m+"27",aiQ2:m+"28",aiA2:m+"29",aiQ3:m+"30",aiA3:m+"31",aiSaveLogin:m+"32",cfHud:m+"33",aiCitiesAll:m+"34",aiCitiesNone:m+"35",aiLoginToggle:m+"36",aiLoginBody:m+"37"},f={pill:m+"a",pillTtl:m+"b",pillTmr:m+"c",pillWait:m+"d",pillDone:m+"e",footer:m+"f",card:m+"g",cardTtl:m+"h",histScrl:m+"i",dltDn:m+"j",dltUp:m+"k",cdDiv:m+"l",hidden:m+"m",sideLink:m+"n",datesLnk:m+"o",aiOn:m+"p",aiRow:m+"q",aiHint:m+"r",aiCities:m+"s",aiOnBtn:m+"t",aiCityAct:m+"x",cfHud:m+"u",cfPulse:m+"v",cfFlash:m+"w"},x={mark:m,w:m+"w",mw:m+"mw"},ot={req:m+"q",res:m+"r",ofc:m+"o",err:m+"e",sub:m+"s"};function _t(t){return t.map(e=>String.fromCharCode(e)).join("")}function Si(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function mo(){let t=document.createElement("div");return t.className=f.footer,t.textContent=_t([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function xi(t){let e=document.getElementById(c.histCont);e&&e.remove(),e=document.createElement("div"),e.id=c.histCont,e.className=f.card,e.dataset[x.mark]="";let n=document.createElement("h4");n.className=f.cardTtl,n.textContent=_t([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let o=document.createElement("div");o.className=f.histScrl;let r=document.createElement("table");r.id=c.histTbl;let i=document.createElement("thead"),a=document.createElement("tr");for(let u of["Time","Est. Wait","Change"]){let p=document.createElement("th");p.textContent=u,a.appendChild(p)}i.appendChild(a),r.appendChild(i);let l=document.createElement("tbody");for(let u=t.length-1;u>=0;u--){let p=t[u],g="--",b="";if(u>0){let I=p.minutes-t[u-1].minutes;I<0?(g=`${I}m`,b=f.dltDn):I>0?(g=`+${I}m`,b=f.dltUp):g="0m"}let A=document.createElement("tr"),et=[[p.timeStr,""],[Je(p.minutes),""],[g,b]];for(let[I,R]of et){let U=document.createElement("td");R&&(U.className=R),U.textContent=I,A.appendChild(U)}l.appendChild(A)}r.appendChild(l),o.appendChild(r),e.appendChild(o),e.appendChild(mo());let d=document.getElementById("last-updated");d&&(d.closest("div, p, section")||d.parentElement).insertAdjacentElement("afterend",e)}function vi(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function po(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),o=vi();if(o!==null&&o>oo&&!e.textContent.includes("(")){let a=Je(o);e.textContent=`${e.textContent} (${o} minutes / ${a})`}let r=n.textContent.trim().split(" (")[0],i=co(r);if(i&&s.setInterval(()=>{let a=Math.floor((Date.now()-i)/1e3);a>=0&&(n.textContent=`${r} (${a}s ago)`)},1e3),o!==null){let a=Si(),l=sessionStorage.getItem(a);l||(l=Math.random().toString(36).substring(2,11),sessionStorage.setItem(a,l)),S({queueHistory:{}}).then(d=>{let u=d.queueHistory||{},p=Date.now(),g={};for(let[I,R]of Object.entries(u)){if(!Array.isArray(R))continue;let U=R[R.length-1];U&&p-U.timestamp<io&&(g[I]=R)}let b=g[l]||[],A=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),et=b[b.length-1];(!et||et.minutes!==o||et.timeStr!==A)&&(b.push({timestamp:p,timeStr:A,minutes:o}),b.length>ro&&b.shift(),g[l]=b,T({queueHistory:g})),xi(b)})}}function ho(t,e){let n=document.getElementById("error_row");if(!n)return;let o;t?o=e?`Blocked for 24 hours, about ${Wt(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":o="Temporarily blocked. Log in in a new tab, then press Recheck.";let r=document.createElement("div");r.className="atlas_validationalert alert alert-danger warning",r.dataset[x.mark]="",r.textContent=o,n.replaceChildren(r),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function go(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&S({cfRetryAfter:null}).then(n=>{let o=parseInt(n.cfRetryAfter,10);if(!isNaN(o)){Qn("cfRetryAfter");let r=document.getElementById("what-happened-section");if(r){let i=document.createElement("div");i.id=c.cdCard,i.className=f.card,i.dataset[x.mark]="";let a=document.createElement("h4");a.className=f.cardTtl,a.textContent=_t([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),i.appendChild(a);let l=document.createElement("div");l.id=c.cdTime,i.appendChild(l);let d=document.createElement("div");d.className=f.cdDiv,i.appendChild(d),i.appendChild(mo()),r.appendChild(i);let u=o,p=null,g=()=>{u>0?(l.textContent=Wt(u),u--):(l.classList.add(f.cdDiv+"-over"),l.textContent="You can try refreshing now!",p!=null&&s.clear(p))};g(),p=s.setInterval(g,1e3)}}})}async function yo(){let t=document.querySelector(".username");if(!t)return;let e=t.innerText.match(/(.*)\((\d*)\)/);if(!e)return;let[,n,o]=e,r=await B()||{},i=!r.id||r.id===o?r:{};i.name=n.trim(),i.id=o;let a=document.querySelectorAll("script");for(let l of a){let d=l.innerText.trim();if(d.includes("setAuthenticatedUserContext")){let u=/setAuthenticatedUserContext\('([^']*)'\)/,p=d.match(u);p&&(i.email=p[1])}}await T({profile:i})}async function bo(){let t=document.querySelector("#post_select");if(!t)return;let e=await nt();for(let n of t.options){if(!n.value)continue;e.findIndex(r=>r.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await Tt(e)}var Ti=["visa-information","fee-payment","appointment-confirmation"];function _i(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(o=>{let r=o.querySelector(".text-bold");if(!r)return;let i=Ci(r.textContent);if(!Ti.includes(i))return;let a=ki(o);a&&(n[i]=a)}),Object.keys(n).length?n:null}function Ci(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function ki(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function wo(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>eo)return null}catch{}return t.value}function Ai(t){let e=(t.posts||[]).filter(r=>r.Updated).sort((r,i)=>r.Updated-i.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},o=wo(t.cgiIdToken);return o&&(n.token=o),n}async function tn(){if(!N()||!await w("serverSync"))return;let t=await S(["profile","posts","cgiIdToken"]),e=Ai(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await fetch(Ze,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(r=>r.json());if(!n.success)return;let o="0";n.contribs>0&&(o=n.contribs.toString()),n.contribs>10&&(o="10+"),n.contribs>0&&await T({contribs:{email:t.profile?.email,updated:Date.now(),count:o}})}catch{}}function en(t=0){N()&&document.querySelector("#appointment-card")&&w("serverSync").then(e=>{if(!e)return;let n=_i();if(!n){t<to&&s.setTimeout(()=>en(t+1),ge);return}S(["profile","cgiIdToken","savedDashboard"]).then(o=>{let r=wo(o.cgiIdToken);r&&JSON.stringify(n)!==JSON.stringify(o.savedDashboard)&&fetch(Ze,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:o.profile,dashboard:n,token:r})}).then(i=>i.json()).then(i=>{i.success&&T({savedDashboard:n})}).catch(()=>{})})})}var Ei=[{slot:5,fromMin:0,toMin:2},{slot:1,fromMin:5,toMin:13},{slot:2,fromMin:14,toMin:21},{slot:3,fromMin:24,toMin:31},{slot:4,fromMin:35,toMin:50},{slot:5,fromMin:54,toMin:59}],$i=[0,5,14,24,35,54],Q=":05\u2013:13, :14\u2013:21, :24\u2013:31, :35\u2013:50, :54\u2013:02";function So(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=o=>Number(e.find(r=>r.type===o)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function ht(t=new Date){let{minute:e}=So(t);for(let n of Ei)if(e>=n.fromMin&&e<=n.toMin)return n.slot;return 0}function Ct(t=new Date){if(ht(t))return 0;let{minute:e,second:n}=So(t),o=e*60+n;for(let r of $i){let i=r*60;if(o<i)return(i-o)*1e3}return(3600-o)*1e3}function Ut(t){return t<9e4?`${Math.ceil(t/1e3)}s`:`${Math.ceil(t/6e4)}m`}function rn(){let t=document.querySelector(h(c.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=c.selRow,t.dataset[x.mark]="",n.insertAdjacentElement("afterend",t);let o=document.createElement("span");return o.id=c.anchor,o.dataset[x.mark]="",o.dataset[x.w]=e.style.width,o.dataset[x.mw]=e.style.minWidth,o.hidden=!0,e.insertAdjacentElement("beforebegin",o),s.setStyle(e,"width","100%"),s.setStyle(e,"minWidth","0"),t.appendChild(e),t}var Ft="waitPillState",Mi=3600*1e3,xo=f.pillWait,Di=f.pillDone;function Ii(t,e){let n=document.createElement("span");n.className=`${f.pill} ${e}`;let o=(r,i)=>{let a=document.createElement("span");a.className=r,a.textContent=i,n.appendChild(a)};return o(f.pillTtl,t.title),t.timer!==void 0&&o(f.pillTmr,t.timer),n}function Li(t,e=Date.now()){if(t.kind==="waiting")return{label:"Waiting For Response",variant:xo};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:xo}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:Di}}return null}function Pi(t,e,n=new Date){let o=ao(n);return t.seconds===void 0?{title:e?o:t.label,timer:e?void 0:o}:{title:o,timer:Wt(t.seconds)}}var Oi=class{#t=null;#e={kind:"idle"};#o=null;#n=null;#r=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get(Ft))[Ft];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>Mi){chrome.storage.local.remove(Ft);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#r=t,this.#i(),this.#c()}toggleClockMode(){s.alive&&(this.setClockMode(!this.#r),chrome.storage.local.set({waitPillClock:this.#r}))}render(t){return Li(this.#e,t)}#l(t){return Pi(t,this.#r,new Date)}#i(){if(this.#t??=Ri(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(f.hidden);return}this.#t.classList.remove(f.hidden),this.#t.replaceChildren(Ii(this.#l(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#o&&(s.clear(this.#o),this.#o=null),t.kind==="running"?(chrome.storage.local.set({[Ft]:t}),this.#o=s.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove(Ft),this.#i(),this.#c()}#u(){this.#i(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,w("audioAlert").then(t=>{t&&Gi()})))}#c(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=s.setInterval(()=>this.#i(),1e3):!t&&this.#n&&(s.clear(this.#n),this.#n=null)}},Et=new Oi,jt="pillPosition",vo=4;function To(t,e,n){return Math.max(e,Math.min(n,t))}function Ao(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,o=e.height>0?e.height:36;return{w:n,h:o}}function kt(t,e,n){let{w:o,h:r}=Ao(t),i=To(e,0,Math.max(0,window.innerWidth-o)),a=To(n,0,Math.max(0,window.innerHeight-r));return t.style.setProperty("left",i+"px","important"),t.style.setProperty("top",a+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:i,top:a}}function qi(t){var e=!1,n=!1,o=0,r=0,i=0,a=0;function l(u){if(e){var p=u.touches?u.touches[0]:u,g=p.clientX-o,b=p.clientY-r;!n&&Math.abs(g)<vo&&Math.abs(b)<vo||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",kt(t,i+g,a+b),u.cancelable&&u.preventDefault())}}function d(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",d),document.removeEventListener("touchmove",l),document.removeEventListener("touchend",d),n){let u=t.getBoundingClientRect();chrome.storage.local.set({[jt]:{top:Math.round(u.top),left:Math.round(u.left)}})}n=!1}}t.addEventListener("mousedown",function(u){if(u.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let p=t.getBoundingClientRect();o=u.clientX,r=u.clientY,i=p.left,a=p.top,kt(t,p.left,p.top),document.addEventListener("mousemove",l),document.addEventListener("mouseup",d),u.preventDefault(),u.stopPropagation()}),t.addEventListener("touchstart",function(u){e=!0,n=!1,delete t.dataset.skipClick;let p=t.getBoundingClientRect();o=u.touches[0].clientX,r=u.touches[0].clientY,i=p.left,a=p.top,kt(t,p.left,p.top),document.addEventListener("touchmove",l,{passive:!1}),document.addEventListener("touchend",d)},{passive:!0})}function Ri(){let t=document.querySelector(h(c.waitTime));return t||(t=document.createElement("div"),t.id=c.waitTime,t.className=f.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),qi(t),chrome.storage.local.get(jt).then(e=>{let n=e[jt];n&&typeof n.top=="number"&&typeof n.left=="number"&&kt(t,n.left,n.top)}),Wi(t),t)}function _o(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function Ni(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function Bi(t){let{w:e,h:n}=Ao(t),o=12;return[{left:o,top:o},{left:Math.max(o,window.innerWidth-e-o),top:o},{left:o,top:Math.max(o,window.innerHeight-n-o)},{left:Math.max(o,window.innerWidth-e-o),top:Math.max(o,window.innerHeight-n-o)}]}async function Hi(){let e=(await chrome.storage.local.get(jt))[jt];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function Wi(t){let e=!1,n=async()=>{if(!s.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(f.hidden))return;let o=Ni(),r=!!(o&&o.offsetParent!==null&&o.getBoundingClientRect().height>20),i=t.getBoundingClientRect();if(r&&_o(i,o.getBoundingClientRect())){let a=o.getBoundingClientRect(),l=Bi(t),d=l.find(u=>{let p={left:u.left,top:u.top,right:u.left+i.width,bottom:u.top+i.height};return!_o(p,a)})||l[2];e=!0,t.setAttribute("data-dodging",""),kt(t,d.left,d.top);return}if(e&&!r){e=!1,t.removeAttribute("data-dodging");let a=await Hi();a&&kt(t,a.left,a.top)}else r||t.removeAttribute("data-dodging")};s.setInterval(n,400),s.on(window,"resize",n)}async function an(){if(!s.alive||!await w("defaultWaitTime")||!await s.waitFor("#post_select",{attempts:Ht}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});Et.setClockMode(t),await Et.restore()}async function Eo(){await w("defaultWaitTime")&&Et.waiting()}async function ve(t){await w("defaultWaitTime")&&Et.run(t)}function $o(){Et.toggleClockMode()}function Mo(t){Et.setClockMode(t)}var Kt=null,Yt=null,be=null;function Do(){return be||(be=new(window.AudioContext||window.webkitAudioContext),s.disposable(()=>be?.close())),be}async function sn(t=150){try{let e=Do();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),o=e.createGain();n.connect(o),o.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let r=e.currentTime,i=t/1e3;o.gain.setValueAtTime(0,r),o.gain.linearRampToValueAtTime(.1,r+.01),o.gain.setValueAtTime(.1,r+Math.max(.01,i-.02)),o.gain.linearRampToValueAtTime(0,r+i),n.start(),n.stop(r+i)}catch(e){console.error("Audio beep failed:",e)}}function Ui(t,e=125,n=125){let o=0,r=()=>{o>=t||(sn(e),o++,s.setTimeout(r,e+n))};r()}var nn=4,Co=50,ko=50,Fi=600;function Io(){if(Yt)return;let t=()=>{Ui(nn,Co,ko);let e=nn*Co+(nn-1)*ko;Yt=s.setTimeout(t,e+Fi)};t()}var Ki=250,Yi=10,Vi=300,ji=1e3;function Gi(){if(Kt)return;let t=[];for(let r=0;r<=Vi;r+=Yi)t.push(r);let e=Date.now(),n=0,o=()=>{let r=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&r>=t[n];){let i=n===t.length-1;sn(i?ji:Ki),n++}if(n<t.length){let i=t[n],a=e+i*1e3,l=Math.max(0,a-Date.now());Kt=s.setTimeout(o,l)}else $t()};o()}function $t(){Kt&&(s.clear(Kt),Kt=null),Yt&&(s.clear(Yt),Yt=null),on()}var we=null,Se=null,At=null,xe=null,Vt=null;async function Lo(){on();try{let t=Do();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),o=t.createOscillator(),r=t.createGain(),i=t.createGain();n.type="square",o.type="sawtooth",n.frequency.value=880,o.frequency.value=1320,r.gain.value=.85,i.gain.value=.65,n.connect(r).connect(e),o.connect(i).connect(e);let a=t.createOscillator(),l=t.createGain();a.type="triangle",a.frequency.value=3.2,l.gain.value=280,a.connect(l),l.connect(n.frequency),l.connect(o.frequency);let d=t.currentTime;n.start(d),o.start(d),a.start(d),At={osc1:n,osc2:o,lfo:a,master:e};let u=()=>{At&&(sn(500),Se=s.setTimeout(u,1800))};u(),we=s.setTimeout(on,12e4),Vt=document.title;let p=!1,g=()=>{At&&(document.title=p?Vt:"!!! SUBMIT CLICKED !!!",p=!p,xe=s.setTimeout(g,450))};g()}catch(t){console.error("Submit alarm failed:",t)}}function on(){if(we&&(s.clear(we),we=null),Se&&(s.clear(Se),Se=null),xe&&(s.clear(xe),xe=null),Vt&&(document.title=Vt,Vt=null),At){try{let{osc1:t,osc2:e,lfo:n}=At;t.stop(),e.stop(),n.stop()}catch{}At=null}}function zi(){if(document.querySelector(h(c.recheck)))return;let t=rn();if(!t)return;let e=document.querySelector("#post_select"),n=document.createElement("button");n.id=c.recheck,n.type="button",n.textContent=_t([82,101,99,104,101,99,107]);let o=()=>{let r=ht(),i=Ct();n.disabled=!e.value||!r,n.title=r?"Recheck slots for the selected city":`Slot checks paused \u2014 IST windows ${Q}. Next in ${Ut(i)}.`,n.classList.toggle(f.hidden,!e.value)};s.on(n,"click",()=>{if(!ht()){let r=Ut(Ct());n.title=`Outside slot window \u2014 next check at IST ${Q} (in ${r})`,o();return}e.dispatchEvent(new Event("change",{bubbles:!0}))}),t.appendChild(n),o(),s.on(e,"change",o),s.setInterval(o,1e3)}async function cn(){s.alive&&await w("recheckButton")&&await s.waitFor("#post_select",{attempts:Ht})&&zi()}async function ln(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await s.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let o=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(l=>l.innerText.trim()===o))continue;let i=document.createElement("li");i.className="usa-sidenav__item",i.dataset[x.mark]="";let a=document.createElement("a");a.href=n.link,a.className=f.sideLink,a.target="_self",a.textContent=n.text,i.appendChild(a),t.appendChild(i)}}function Po(t){if(t.response.HasError)return;let e=document.querySelector("#page_form");if(!e)return;let n={};for(let l of t.response.ScheduleDays||[]){if(!l?.Date||l.Date.length<10)continue;let d=l.Date.slice(0,7),u=parseInt(l.Date.slice(8,10),10);u&&(d in n?n[d].push(u):n[d]=[u])}document.querySelector(h(c.datesCont))?.remove();let o=document.querySelector("#post_select"),r=o?.options[o.selectedIndex]?.text??"",{container:i,details:a}=Xi(r);e.appendChild(i);for(let[l,d]of Object.entries(n)){let u=document.createElement("strong");u.textContent=l,a.append(u,`: ${d.join(", ")}`,document.createElement("br"))}Object.keys(n).length||a.append("No slots available",document.createElement("br"))}function Xi(t){let e=(a,l,d)=>{let u=document.createElement(a);return l&&(u.className=l),d?.appendChild(u),u},n=e("div","row");n.id=c.datesCont;let o=e("div","col-sm-12 atlas_section mt-3",n),r=e("div","col-sm-12 atlas_section_header_row",e("div","row",o));e("h2",null,r).textContent=t;let i=e("p",null,e("div","col-sm-12",e("div","row",o)));return i.id=c.datesPara,{container:n,details:i}}var Oo=null;function Qi(){let t=document.querySelector(h(c.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return s.setStyle(n,"display","flex"),s.setStyle(n,"alignItems","center"),s.setStyle(n,"justifyContent","flex-end"),s.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=c.ofcDate,t.dataset[x.mark]="",e.insertAdjacentElement("beforebegin",t),t}function Zi(){if(!location.pathname.includes("/schedule"))return;let t=Oo;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=Qi();n&&(n.textContent=`OFC (Estimate): ${so(e.appointmentDateStr)}`)}function qo(t){chrome.runtime?.id&&(Oo=t.data.data,s.waitFor("#submitbtn").then(e=>{e&&Zi()}))}var Te=new Map,Ro=45e3,_e=new Map,No=8e3,Bo=0;function Ce(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function ke(t){try{let[e,n,o]=t.split("-").map(Number);return new Date(e,n-1,o).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function Ji(t,e){return`${t}:${e.slice(0,5).join(",")}`}function ta(t){let e=Date.now(),n=Te.get(t);if(n&&e-n<Ro)return!1;Te.set(t,e);for(let[o,r]of Te)e-r>Ro*4&&Te.delete(o);return!0}function ea(t){let e=Date.now(),n=_e.get(t);if(n&&e-n<No)return!1;_e.set(t,e);for(let[o,r]of _e)e-r>No*6&&_e.delete(o);return!0}async function Ho(){return await w("telegramViaServer")!==!1}async function Wo(t,{kind:e="alert",dedupKey:n="",skipDedup:o=!1,notifyMuktesh:r=!0}={}){if(t&&await Ho())try{await fetch(Jn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:o,notify_muktesh:r}),signal:AbortSignal.timeout(2e4)})}catch{}}function na(t,{kind:e="screen",dedupKey:n="",waitMs:o=0,skipDedup:r=!1,notifyMuktesh:i=!0}={}){s.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:o,skipDedup:r,notifyMuktesh:i,captureScreenshot:!0})}async function oa(t,e,n){let o=Ce(e),r=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&i.push(`\u{1FAAA} <b>Visa:</b> ${n}`),i.push(`\u{1F550} <b>Checked:</b> ${r} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),i.push(`\u{1F4C6} <b>Dates (${o.length}):</b>`,"");for(let a of o.slice(0,30))i.push(`\u{1F7E2} <b>${ke(a)}</b>`);return o.length>30&&i.push("",`\u2795 <i>+${o.length-30} more dates</i>`),i.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),i.join(`
`)}function ra(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",o=document.querySelector("#datepicker")?.value||"\u2014",i=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:o,time:i}}async function Uo(t,{postId:e,postName:n,hasError:o}={}){if(o||!t?.length)return;let r=Ce(t);if(!r.length||!await w("telegramAlert"))return;let i=Ji(e||n||"unknown",r);if(!ta(i))return;let a=await B(),l=await oa(n,t,a?.visa||"");await Wo(l,{kind:"slots",dedupKey:i,notifyMuktesh:!0})}function ia(t,e,n){let o=Ce(e),r=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
\u{1F3DB}\uFE0F ${i}
\u{1F550} ${r} IST
\u{1F4F2} Visa Slot 6`;if(o.length){let a=o.slice(0,5).map(l=>ke(l)).join(", ");return`<b>DATES AVAILABLE</b>
\u{1F3DB}\uFE0F ${i}
\u{1F4C6} ${o.length} date(s)
${a}${o.length>5?"\u2026":""}
\u{1F550} ${r} IST
\u{1F4F2} Visa Slot 6`}return`<b>City changed \u2014 no dates</b>
\u{1F3DB}\uFE0F ${i}
\u{1F550} ${r} IST
\u{1F4F2} Visa Slot 6`}function aa(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?ke(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function sa(t,e,n){let o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),r=e?ke(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${r}
\u23F0 ${n} slot(s)
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}async function Mt(t,{kind:e="screen",dedupKey:n,waitMs:o=0,skipDedup:r=!1}={}){if(await w("telegramScreenshots")===!1||!await Ho())return;let i=n||`${e}:${String(t).slice(0,80)}`;!r&&!ea(i)||na(t,{kind:e,dedupKey:i,waitMs:o,skipDedup:r,notifyMuktesh:!0})}async function Fo(t,{postId:e,postName:n,hasError:o}={}){let r=ia(n,t,o),i=Ce(t),a=i.length?"dates":"city";await Mt(r,{kind:a,dedupKey:`${a}:${e||n}:${i.length}:${o?1:0}`,waitMs:i.length?1400:900})}async function Ko(t,e){await Mt(aa(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function Yo(t,e,n){await Mt(sa(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function Vo(){let t=Date.now();if(t-Bo<8e3)return;Bo=t;let e=await B(),{city:n,date:o,time:r}=ra(),i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),a=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${o}`,`\u23F0 <b>Time:</b> ${r}`];e?.email&&a.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&a.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),a.push(`\u{1F550} <b>When:</b> ${i} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let l=a.join(`
`);await Wo(l,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await Mt(l,{kind:"submit",skipDedup:!0,waitMs:200})}var Ae=25;function ca(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function dn(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let o=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,o),n-1)}function Go(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function zo(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function fn(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function jo(t){if(!t||t.disabled)return!1;try{let e=t.closest("tr"),o=[t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,t.closest("label"),t,e].filter(Boolean);for(let r of o)r.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),r.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),r.click();(t.type==="radio"||t.type==="checkbox")&&(t.checked=!0),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function Xo(){let t=new Set,e=[],n=o=>{if(!o||t.has(o)||fn(o)||o.disabled)return;let r=o.closest("tr");r&&zo(r)||(t.add(o),e.push(o))};for(let o of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let r of document.querySelectorAll(`${o}:not([disabled])`))n(r);return e}function la(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!Go(n)||zo(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function ua(t){for(let e of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(e.tagName!=="SELECT"||e.disabled||fn(e))continue;let n=[...e.options].filter(r=>!r.disabled&&r.value&&r.value!=="0"&&Go({textContent:r.textContent}));if(!n.length)continue;let o=dn(n.length,t);return e.value=n[o].value,e.dispatchEvent(new Event("change",{bubbles:!0})),!0}return!1}function da(t){if(ua(t))return!0;let e=Xo();if(e.length){let o=dn(e.length,t);if(jo(e[o]))return!0}let n=la();if(n.length){let o=dn(n.length,t),r=n[o],i=r.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(i&&jo(i))return!0;let a=r.querySelector("label");if(a)return a.click(),!!r.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function L(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!fn(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function fa({slotIndex:t=0,maxMs:e=12e3,pollMs:n=Ae,onTick:o}={}){let r=Date.now()+e,i=Math.max(10,n||25);return new Promise(a=>{let l=()=>{if(!s.alive)return a(!1);if(o?.(),da(t)||L())return a(!0);if(Date.now()>=r)return a(!1);s.setTimeout(l,i)};l()})}function Gt({time:t,date:e,slotIndex:n,pollMs:o,maxMs:r}){let i=n??0,a=r||15e3,l=o||Ae;return s.send({action:"forcePickTimeSlot",slotIndex:i,maxMs:a,pollMs:l}),s.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:i,pollMs:l,domWaitMs:0,maxMs:a}),fa({slotIndex:i,maxMs:a,pollMs:l})}var un=!1;function Qo({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(un)return;un=!0;let o=!1,r=async()=>{if(!(!s.alive||o)){if(L()){n?.();return}try{if(t&&!await t())return}catch{return}Xo().length&&(o=!0,await Gt({slotIndex:e,time:"00:00",maxMs:800,pollMs:Ae}),o=!1,L()&&n?.())}};s.setInterval(r,Ae);let i=document.querySelector("#page_form")||document.body,a=new MutationObserver(()=>r());a.observe(i,{childList:!0,subtree:!0}),s.disposable(()=>{a.disconnect(),un=!1})}function Zo(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let o=ca(n?.Time);if(!o)continue;let r=o.match(/(\d{1,2}):(\d{2})/);if(!r)continue;let[,i,a]=r;if(e.includes(`${i}:${a}`)||e.includes(`${parseInt(i,10)}:${a}`))return!0}return!1}var Ee="submitErrors",Jo=50,ma=45e3,er=0,mn=new Set,zt=null;function pa(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",o=document.querySelector("#datepicker")?.value||"";return{city:e,date:o,url:location.href}}function Xt(){er=Date.now()+ma,mn.clear(),Sa()}function $e(){return Date.now()<er}function ha(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function ga(t){let e=await S({[Ee]:[]}),n=Array.isArray(e[Ee])?e[Ee]:[];n.push(t),n.length>Jo&&n.splice(0,n.length-Jo),await T({[Ee]:n})}function tr(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function ya(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${tr(t.source)}`,`\u{1F4AC} <b>Message:</b> ${tr(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let o=n.join(`
`);await Mt(o,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function Qt(t,e,n={}){let o=String(e||"").trim();if(!o||!$e()&&!n.force)return;let r=ha(t,o);if(mn.has(r))return;mn.add(r);let i=pa(),a=await B(),l={at:Date.now(),source:String(t||"unknown"),message:o.slice(0,2e3),city:n.city||i.city,date:n.date||i.date,url:n.url||i.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:a?.email||""};await ga(l);try{await ya(l)}catch{}}function ba(t){if(!$e())return;let e=t?.status,n=t?.retryAfter,o=t?.cgiBlock,r=`Request failed (HTTP ${e||"?"})`;n!=null&&(r+=` \u2014 retry after ${n}s`),o&&(r+=" \u2014 CGI access limitation"),Qt("ajax_error",r,{status:e})}function nr(t){if(!$e()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){ba({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",r=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";Qt("ajax_response",r,{route:t.tail||""})}var wa=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function Sa(){zt&&s.clear(zt);let t=()=>{if(!s.alive||!$e()){zt=null;return}for(let e of wa)for(let n of document.querySelectorAll(e)){let o=(n.textContent||"").replace(/\s+/g," ").trim();!o||o.length<4||Qt("page_validation",o)}zt=s.setTimeout(t,600)};zt=s.setTimeout(t,500)}var at="aiSubmitByAccount",re=8e3;var q=25,xa=80,Pe=0,Oe=1e4,dr=1e3;function ie(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}var De=13e3,va=18e3,ee=45e3,K=18e4,rt=2e4,or=5e3,Ta=2e4,_a=15e3;function ct(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function gn(){return/\/ofc-schedule\b/i.test(location.pathname)}function _(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var Ca=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function Me(t,e){let n=Ca[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(r=>{let i=e===r?" selected":"";return`<option value="${r.replace(/"/g,"&quot;")}"${i}>${r}</option>`}).join("")}function rr(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function Ie(t){try{let[e,n,o]=t.split("-").map(Number);return new Date(e,n-1,o).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function ae(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function qe(t){return!!(t&&t.citiesEnabled&&t.cities?.length)}async function G(){let t=await B();return t?.id?String(t.id):null}async function tt(t){return t&&((await S(at))[at]||{})[t]||null}async function fr(t,e){if(!t)return;let o=(await S(at))[at]||{};e==null?delete o[t]:o[t]=e,await T({[at]:o})}var W=!1;function se(){return W}function mr(){W=!0,Le(),te()}function It(){W=!1,O=!1,Le()}async function pr(t){mr();let e=await tt(t);if(!e){wt();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await fr(t,e),wt()}function ce(t,e,n){let o=String(t||"").slice(0,10);return!(!o||o.length<10||e&&o<e||n&&o>n)}async function z(){if(W||_()||!ct())return null;let t=await G();if(!t)return null;let e=await tt(t);return!ae(e)||!e.from||!e.to?null:{...e,accountId:t}}async function le(){if(W||_()||!ct())return null;let t=await G();if(!t)return null;let e=await tt(t);return qe(e)?{...e,accountId:t}:null}function yn(t,e,n){let o=new Date;return o.setHours(0,0,0,0),(t||[]).filter(r=>r&&typeof r.Date=="string"&&r.Date.length>=10).filter(r=>ce(r.Date,e,n)).filter(r=>{let[i,a,l]=r.Date.slice(0,10).split("-").map(Number);return new Date(i,a-1,l)>=o}).sort((r,i)=>String(r.Date).localeCompare(String(i.Date)))}var O=!1,it=null,st=null,J=!1,yt=0,H=!1,V=0,bt=0,Zt=0,Jt=0,ue=!1,Y=null,Z=0,$=!1,E=0,Dt=null,gt=null,ne=0,ir=!1,ar="",sr=!1,pn=0;function ka(t){return(t||[]).map(e=>e.id).join("")}function hr(){let t=document.querySelector(h(c.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function cr(t){let e=document.querySelector(h(c.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function Le(){it&&(s.clear(it),it=null),O=!1}function Lt(){Dt&&(s.clear(Dt),Dt=null)}function gr(){Lt(),E||(E=Date.now());let t=Math.max(500,ee-(Date.now()-E));Dt=s.setTimeout(()=>{Dt=null,!(!$||!H||!s.alive)&&($=!1,E=0,P(Date.now()),y(`City Change \u2014 booking hold timed out (${ee/1e3}s); next city in 13\u201318s\u2026`),C())},t)}function Aa(){gt&&(s.clear(gt),gt=null)}function Re(t=Date.now()){let e=!1;if(J&&yt&&t-yt>=_a&&(J=!1,yt=0,e=!0),$&&(E||(E=t),t-E>=ee?(Lt(),$=!1,E=0,e=!0):Dt||gr()),ue){Z||(Z=t);let o=hn()?K:rt;if(t-Z>=o)j(),e=!0;else if(!Y){let r=Math.max(500,o-(t-Z));Y=s.setTimeout(()=>{if(Y=null,!H||$)return;let i=hn(),a=i?K:rt;if(Date.now()-(Z||0)<a){Re();return}j(),P(Date.now()),y(i?`City Change \u2014 still Loading after ${K/1e3}s; changing city\u2026`:`City Change \u2014 calendar up but no dates after ${rt/1e3}s; changing city\u2026`),C()},r)}}return O&&!it&&(O=!1,e=!0),e}function yr(){if(gt||!H)return;let t=()=>{if(gt=null,!H||!s.alive||W)return;let e=Date.now(),n=Re(e),o=ne>0&&e-ne>=Ta;(n||o||!st&&!J)&&(n||o?(P(Date.now()),y(o?"City Change \u2014 stuck; auto-restarting hops\u2026":"City Change \u2014 lock cleared; next city in 13\u201318s\u2026")):y("City Change \u2014 timer lost; restarting\u2026"),C()),H&&(gt=s.setTimeout(t,or))};gt=s.setTimeout(t,or)}function te(){Sn(),Aa(),Lt(),J=!1,yt=0,H=!1,$=!1,E=0,V=0,bt=0,ne=0,j()}function j(){ue=!1,Z=0,Y&&(s.clear(Y),Y=null)}function bn(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let o=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(o))continue;let r=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let i of r)if(i&&/\bLoading\.{0,3}\b/i.test((i.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let r=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(r))continue;let i=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(i))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function hn(){return bn()}function Ea(){ue=!0,Z=Date.now(),Y&&s.clear(Y),Y=s.setTimeout(()=>{Y=null,!(!H||$)&&(j(),P(Date.now()),y(`City Change \u2014 still Loading after ${K/1e3}s; changing city\u2026`),C())},K)}function wn(t){let e=Math.max(0,Number(t)||0)*1e3;Jt=Math.max(Jt,Date.now()+e),V=Math.max(V,Jt),j(),C()}function br(){j()}function Pt(){W||($=!0,E||(E=Date.now()),Sn(),j(),gr(),y("City Change \u2014 paused (Auto Submit booking)\u2026"))}function lt(){$&&(Lt(),$=!1,E=0,!(!H||W)&&(P(Date.now()),y("City Change \u2014 resuming; next city in 13\u201318s\u2026"),C()))}async function wr(){let t=await z();if(!t)return;let e=Date.now();if(e-pn<6e4)return;pn=e;let o=document.querySelector("#post_select")?.value;if(!o){y("Auto Submit ON \u2014 pick a city first.");return}let i=(await nt()).find(l=>String(l.ID)===String(o)),a=i?.Days;if(Array.isArray(a)&&a.length){let l=yn(a,t.from,t.to);if(l.length){Pt();let d=ie(l.length),u=l[d].Date;y(`Auto Submit: picking date #${d+1} (${u.slice(0,10)})\u2026`),s.send({action:"selectFirstDate",date:u,maxMs:re,pollMs:q});return}y(`Auto Submit ON \u2014 no dates in your range on ${i.Name||"this city"} yet.`);return}y("Auto Submit ON \u2014 loading slots for current city\u2026"),s.send({action:"selectPost",postId:String(o)})}function $a(){pn=0}function Sn(){st&&(s.clear(st),st=null)}function Ma(t,e){return t+Math.random()*(e-t)}function Da(){return Ma(De,va)}function P(t=Date.now()){V=t+Da()}function Sr(t=Date.now()){let e=Ct(new Date(t));if(e>0)return e;if(Jt>t)return Jt-t;if(bt){let n=bt+De-t;if(n>0)return n}return V>t?V-t:0}function C(){if(!H)return;if(Sn(),$||ue){st=s.setTimeout(()=>{lr()},500);return}let t=Sr();t<De&&(bt?t=Math.max(0,bt+De-Date.now()):(V>Date.now()||P(Date.now()),t=V-Date.now())),st=s.setTimeout(()=>{lr()},t)}function Ia(t,e){if(!t.length)return null;if(t.length===1)return Zt=0,t[0];let n=t.findIndex(r=>String(r.id)===String(e));n<0&&(n=Math.max(0,Math.min(Zt,t.length-1)));let o=(n+1)%t.length;return Zt=o,t[o]}function xn(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function vn(){let t=document.querySelector(h(c.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function Tn(){return{from:document.querySelector(h(c.aiFrom))?.value||null,to:document.querySelector(h(c.aiTo))?.value||null}}function xr(t=[],{force:e=!1}={}){let n=document.querySelector(h(c.aiCities));if(!n)return;let o=xn(),r=ka(o),i=document.querySelector(h(c.aiPanel)),a=i&&!i.classList.contains(f.hidden),l=hr();if(!e&&r===ar&&n.querySelector('input[type="checkbox"]'))return;ar=r;let d=new Set(a&&l.length&&!e&&!t.length?l:(t.length?t:l).map(String));if(n.replaceChildren(),!o.length){n.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let u of o){let p=document.createElement("label"),g=document.createElement("input");g.type="checkbox",g.value=u.id,g.dataset.name=u.name,g.checked=d.has(u.id),p.append(g,document.createTextNode(u.name)),n.appendChild(p)}}function La(t){let e=t?.cities||[];return e.length?e.map(n=>n.name||n.id).join(", "):"\u2014"}async function oe(t,e={}){let n=await tt(t)||{},{from:o,to:r}=Tn(),i=vn(),a={...n,from:o||n.from||null,to:r||n.to||null,cities:i.length?i:n.cities||[],loginId:document.querySelector(h(c.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(h(c.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(l=>{let d=[c.aiQ1,c.aiQ2,c.aiQ3][l],u=[c.aiA1,c.aiA2,c.aiA3][l];return{q:document.querySelector(h(d))?.value?.trim()||n.security?.[l]?.q||"",a:document.querySelector(h(u))?.value?.trim()||n.security?.[l]?.a||"",set:l+1}}),...e};return typeof a.submitEnabled=="boolean"&&(a.enabled=a.submitEnabled),await fr(t,a),a}async function Pa(t,e){if(!ht()||$||O)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let o=String(t);return String(n.value)===o?!1:(Ea(),y(`Switching city \u2192 ${e||t}\u2026`),s.send({action:"selectPost",postId:o}),!0)}function vr(){ir||!document.querySelector("#post_select")||(ir=!0)}async function lr(){if(!(J||!H)){J=!0,yt=Date.now(),ne=Date.now(),st=null;try{if(W||_()||!s.alive){te();return}if(Re()){P(Date.now()),y("City Change \u2014 auto-unstuck; next city in 13\u201318s\u2026"),C();return}if($||O){let g=E?Date.now()-E:0;if($&&g>=ee){Lt(),$=!1,E=0,P(Date.now()),y("City Change \u2014 hold expired; next city in 13\u201318s\u2026"),C();return}let b=Math.max(0,ee-g);y(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(b/1e3)}s`),C();return}let t=Date.now(),e=ht(new Date(t)),n=Ct(new Date(t));if(!e){y(`City Change \u2014 waiting for slot window (IST ${Q}, next in ${Ut(n)})`),C();return}if(ue){let g=Z?t-Z:0;if(hn()){if(g>=K){j(),P(Date.now()),y(`City Change \u2014 still Loading after ${K/1e3}s; changing city\u2026`),C();return}let A=Math.max(0,Math.ceil((K-g)/1e3));y(`City Change \u2014 Date Loading\u2026 stay (${A}s then hop if still Loading)`),C();return}if(g>=rt){j(),P(Date.now()),y(`City Change \u2014 calendar up but no dates after ${rt/1e3}s; changing city\u2026`),C();return}let b=Math.max(0,Math.ceil((rt-g)/1e3));y(`City Change \u2014 waiting calendar dates\u2026 (${b}s then hop)`),C();return}let o=Sr(t);if(o>0){let g=Math.ceil(o/1e3);y(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,g)}s`),C();return}let r=await le();if(!r?.cities?.length){te();return}let i=new Set(xn().map(g=>g.id)),a=r.cities.filter(g=>i.has(String(g.id)));if(!a.length){y("Preferred cities not found in the dropdown \u2014 pick cities again."),te();return}let l=document.querySelector("#post_select"),d=l?String(l.value):"",u=Ia(a,d);if(!u){P(t),C();return}if(await Pa(u.id,u.name)){bt=Date.now(),P(bt);let g=a.map(A=>A.name||A.id).join(" \u2192 "),b=`${Zt+1}/${a.length}`;y(`City Change \u2014 ${b} ${u.name||u.id} (path: ${g}); Loading up to ${K/1e3}s, no-dates hop ${rt/1e3}s`)}else P(t);C()}finally{J=!1,yt=0}}}async function Tr(){if(W||_()||!ct())return;let t=await le();if(!t?.cities?.length)return;let e=new Set(xn().map(a=>a.id)),n=t.cities.filter(a=>e.has(String(a.id)));if(!n.length){y("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}Lt(),j(),$=!1,E=0,O=!1,J=!1,yt=0,H=!0,ne=Date.now(),V=Date.now();let o=document.querySelector("#post_select"),r=o?String(o.value):"",i=n.findIndex(a=>String(a.id)===r);Zt=i>=0?i:0,y(`City Change ON \u2014 IST ${Q}; hop 13\u201318s in checklist order; Loading max ${K/1e3}s; no-dates hop ${rt/1e3}s`),yr(),C()}async function _r(){if(W||_()||!gn()||!s.alive||!(await le())?.cities?.length||!document.querySelector("#post_select"))return;if(!H){await Tr();return}let e=Re();yr(),(e||!st&&!J)&&(e&&(P(Date.now()),y("City Change \u2014 auto-unstuck; next city in 13\u201318s\u2026")),C())}function Cr(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function Ne(){let t=Cr();return!!(t&&!t.disabled)}function _n(){let t=Cr();if(!t||t.disabled)return!1;try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}return s.send({action:"forceClickSubmit",prefix:m,pollMs:q,maxMs:Oe}),!0}function Oa(){return L()?Ne():!1}function kr(){y("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function Cn(t){if(W||_()||O)return;let e=await tt(t);if(!ae(e))return;Pt(),O=!0,Xt();let n=Date.now(),o=!1,r=L()?Date.now():0,i=async d=>{if(!(o||!O||!s.alive)){if(o=!0,window.removeEventListener("message",a),it&&(s.clear(it),it=null),_()){O=!1;return}if(O=!1,d){await pr(t),y("Submit clicked \u2014 all Tik Tik operations stopped.");return}lt(),y(H?"Auto Submit \u2014 Submit not clicked in time; City Change resuming\u2026":"Auto Submit \u2014 Submit not clicked in time; still watching\u2026")}},a=d=>{!s.alive||d.source!==window||d.data?.action===ot.sub&&i(!0)};window.addEventListener("message",a);let l=async()=>{if(o||!O||!s.alive)return;let d=Date.now(),u=d-n;if(L()&&!r&&(r=d,y("Time slot selected \u2014 waiting for Submit to enable\u2026")),r&&d-r>=xa&&(Oa()?(y("Submit enabled \u2014 clicking\u2026"),_n()):y("Waiting for Submit button to enable\u2026")),u>=Oe)return i(!1);it=s.setTimeout(l,q)};l()}async function Ar(){if(!L()||O||W)return;let t=await z();t&&await Cn(t.accountId)}function y(t){let e=document.querySelector(h(c.aiStatus));e&&(e.textContent=t)}function M(t){y(t)}function qa(t){let e=document.querySelector(h(c.aiSubmitBtn)),n=document.querySelector(h(c.aiCitiesBtn)),o=ae(t),r=qe(t);e&&(e.classList.toggle(f.aiOnBtn,o),e.textContent=o?"Auto Submit: ON":"Auto Submit: OFF"),n&&(n.classList.toggle(f.aiOnBtn,r),n.textContent=r?"City Change: ON":"City Change: OFF")}function Ra(t,e){let n=document.querySelector(h(c.aiStatus)),o=document.querySelector(h(c.aiBtn));if(!n||!o)return;qa(t);let r=ae(t),i=qe(t);r||i?(o.classList.add(f.aiOn),o.textContent="Tik Tik ON"):(o.classList.remove(f.aiOn),o.textContent="Tik Tik");let l=[];r&&t.from&&t.to?l.push(`Auto Submit ON (${Ie(t.from)} \u2013 ${Ie(t.to)}, clicks Submit as soon as time slot is ready)`):l.push("Auto Submit OFF"),i?l.push(`City Change ON (${La(t)}, ${Q})`):l.push("City Change OFF"),n.textContent=`Account ${e||"\u2014"}: ${l.join(" \xB7 ")}`}async function wt(){let t=await G(),e=t?await tt(t):null;Ra(e,t);let n=document.querySelector(h(c.aiFrom)),o=document.querySelector(h(c.aiTo));n&&e?.from&&(n.value=e.from),o&&e?.to&&(o.value=e.to);let r=(e?.cities||[]).map(I=>I.id),i=document.querySelector(h(c.aiPanel)),a=i&&!i.classList.contains(f.hidden),l=hr();xr(a&&l.length?l:r);let d=document.querySelector(h(c.aiLogin)),u=document.querySelector(h(c.aiPass));d&&e?.loginId&&(d.value=e.loginId),u&&e?.loginPass&&(u.value=e.loginPass);let p=e?.security||[],g=[c.aiQ1,c.aiQ2,c.aiQ3],b=[c.aiA1,c.aiA2,c.aiA3];g.forEach((I,R)=>{let U=document.querySelector(h(I));U&&(U.innerHTML=Me(R,p[R]?.q||""))}),b.forEach((I,R)=>{let U=document.querySelector(h(I));U&&p[R]?.a&&(U.value=p[R].a)});let A=document.querySelector(h(c.aiLoginBody)),et=A&&!A.classList.contains(f.hidden);kn(!!et,Wa(e))}function ur(t){let e=document.querySelector(h(c.aiPanel));e&&(e.classList.toggle(f.hidden,!t),t&&G().then(async n=>{let o=n?await tt(n):null;xr((o?.cities||[]).map(r=>r.id),{force:!0})}))}async function Na(){let t=await G();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let e=await tt(t)||{},n=!ae(e),{from:o,to:r}=Tn();if(n){if(!o||!r){y("Select both From and To dates before enabling Auto Submit.");return}if(o>r){y("From date must be before To date.");return}if(!window.confirm(`Enable Auto Submit?

Range: ${Ie(o)} \u2013 ${Ie(r)}
If a matching slot appears on the current city, it will select date + time and Submit once.

City Change is separate \u2014 use its own ON/OFF button.`))return;It(),Le(),$a(),await oe(t,{submitEnabled:!0,from:o,to:r,confirmedAt:Date.now()})}else Le(),await oe(t,{submitEnabled:!1,from:o||e.from,to:r||e.to});await wt(),n&&await wr()}async function Ba(){let t=await G();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let e=await tt(t)||{},n=!qe(e),o=vn();if(n){if(!o.length){y("Select at least one preferred city before enabling City Change.");return}if(!window.confirm(`Enable City Change?

Cities (in order): ${o.map(i=>i.name).join(" \u2192 ")}
City checks run each hour during IST windows ${Q}, switching cities every 13\u201318 seconds in that same order.

Auto Submit is separate \u2014 use its own ON/OFF button.`))return;It(),await oe(t,{citiesEnabled:!0,cities:o}),await wt(),vr(),await Tr();return}te(),await oe(t,{citiesEnabled:!1,cities:o.length?o:e.cities||[]}),await wt()}async function Ha(){let t=await G();if(!t){y("Open a logged-in schedule page so we can bind this to your account.");return}let{from:e,to:n}=Tn(),o=vn(),r=document.querySelector(h(c.aiLogin))?.value?.trim(),i=document.querySelector(h(c.aiPass))?.value,a=[0,1,2].map(l=>({q:document.querySelector(h([c.aiQ1,c.aiQ2,c.aiQ3][l]))?.value?.trim()||"",a:document.querySelector(h([c.aiA1,c.aiA2,c.aiA3][l]))?.value?.trim()||""}));if(!r||!i){y("Enter ID and password before saving.");return}if(a.some(l=>!l.q||!l.a)){y("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}await oe(t,{}),kn(!0,!0),y("Saved ID, password, and 3 security questions (1 from each set).")}function Wa(t){let e=t?.security||[];return!!(t?.loginId&&t?.loginPass&&e.length>=3&&e.every(n=>n?.q&&n?.a))}function kn(t,e){let n=document.querySelector(h(c.aiLoginToggle));if(!n)return;let o=t?"\u25BE":"\u25B8";n.textContent=e?`Login details (saved) ${o}`:`Login details ${o}`}function Ua(){let t=document.querySelector(h(c.aiLoginBody)),e=document.querySelector(h(c.aiLoginToggle));if(!t||!e)return;let n=t.classList.contains(f.hidden);t.classList.toggle(f.hidden,!n);let o=/saved/i.test(e.textContent||"");kn(n,o)}function An(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==c.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==c.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===c.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function Er(){document.querySelector(h(c.aiPanel))?.remove(),document.querySelector(h(c.aiBtn))?.remove(),An()}function Fa(){if(_())return;if(!gn()){Er();return}if(document.querySelector(h(c.aiBtn)))return;let t=rn();if(!t)return;let e=document.createElement("button");e.id=c.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[x.mark]="",s.on(e,"click",()=>{let o=document.querySelector(h(c.aiPanel)),r=o&&o.classList.contains(f.hidden);ur(!!r)}),t.appendChild(e);let n=document.createElement("div");n.id=c.aiPanel,n.className=f.hidden,n.dataset[x.mark]="",n.innerHTML=`
    <div class="${f.cardTtl}">Tik Tik (this account only)</div>
    <p class="${f.aiHint}">
      Two separate switches: <b>Auto Submit</b> books a matching date once;
      <b>City Change</b> checks slots in burst windows each hour (IST ${Q}), switching preferred cities in checklist order every 13\u201318s.
    </p>
    <div class="${f.aiRow}">
      <label>From <input type="date" id="${c.aiFrom}" min="${rr()}" /></label>
      <label>To <input type="date" id="${c.aiTo}" min="${rr()}" /></label>
    </div>
    <div class="${f.aiHint}" style="margin-bottom:4px;font-weight:600;color:#334155">
      Preferred cities
      <button type="button" id="${c.aiCitiesAll}" class="${f.aiCityAct}">Select all</button>
      <button type="button" id="${c.aiCitiesNone}" class="${f.aiCityAct}">Clear</button>
    </div>
    <div id="${c.aiCities}" class="${f.aiCities}"></div>
    <div class="${f.aiRow}" style="margin-top:6px">
      <button type="button" id="${c.aiLoginToggle}">Login details \u25B8</button>
    </div>
    <div id="${c.aiLoginBody}" class="${f.hidden}">
      <div class="${f.aiHint}" style="margin:4px 0;font-weight:600;color:#334155">Login (auto-login on Home when logged out)</div>
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
    </div>
    <div class="${f.aiRow}">
      <button type="button" id="${c.aiSubmitBtn}">Auto Submit: OFF</button>
      <button type="button" id="${c.aiCitiesBtn}">City Change: OFF</button>
      <button type="button" id="${c.aiClose}">Close</button>
    </div>
    <div id="${c.aiStatus}" class="${f.aiHint}"></div>
  `,t.insertAdjacentElement("afterend",n),s.on(n.querySelector(h(c.aiSubmitBtn)),"click",Na),s.on(n.querySelector(h(c.aiCitiesBtn)),"click",Ba),s.on(n.querySelector(h(c.aiSaveLogin)),"click",Ha),s.on(n.querySelector(h(c.aiLoginToggle)),"click",Ua),s.on(n.querySelector(h(c.aiClose)),"click",()=>ur(!1)),s.on(n.querySelector(h(c.aiCitiesAll)),"click",()=>cr(!0)),s.on(n.querySelector(h(c.aiCitiesNone)),"click",()=>cr(!1)),s.on(n.querySelector(h(c.aiFrom)),"change",o=>{let r=n.querySelector(h(c.aiTo));r&&o.target.value&&(r.min=o.target.value)}),wt()}function Ka(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",s.on(e,"click",()=>{Xt(),G().then(n=>{n?pr(n):mr()})}))};t(document.querySelector("#submitbtn")),s.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function En(){if(s.alive&&!_()){if(!gn()){Er();return}await s.waitFor("#post_select",{attempts:Ht})&&(Fa(),vr(),Ka(),!sr&&(sr=!0,s.setTimeout(()=>wt(),800),s.setTimeout(async()=>{await z()&&await wr()},1500)))}}var $r=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function Mr(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function Ya(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=Mr(t.data.url),o=new URLSearchParams(t.data.request||"").get("parameters");if(!o)return null;let r;try{r=JSON.parse(o)}catch{return null}return{params:r,tail:e,response:t.data.response}}async function Va(t,e={}){t?.length&&(await Uo(t,e),await w("audioAlert")&&Io())}async function ja(t,e=!1){if(e||_())return null;let n=new Date;n.setHours(0,0,0,0);let o=(t||[]).map(a=>{if(!a)return null;let l=$n(a.Date);return l?{...a,Date:l}:null}).filter(Boolean).filter(a=>{let[l,d,u]=a.Date.slice(0,10).split("-").map(Number);return!l||!d||!u?!1:new Date(l,d-1,u)>=n}).sort((a,l)=>String(a.Date).localeCompare(String(l.Date))),r=await z();if(r){let a=o.filter(d=>ce(d.Date,r.from,r.to));if(!a.length)return null;let l=ie(a.length);return a[l]?.Date||null}if(!await w("autoSelectFirstDate")||!o.length)return null;let i=ie(o.length);return o[i]?.Date||null}function $n(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,r,i,a]=n;return`${a}-${String(r).padStart(2,"0")}-${String(i).padStart(2,"0")}`}let o=e.match(/\/Date\((-?\d+)\)\//);if(o){let r=new Date(Number(o[1]));if(!Number.isNaN(r.getTime())){let i=r.getFullYear(),a=String(r.getMonth()+1).padStart(2,"0"),l=String(r.getDate()).padStart(2,"0");return`${i}-${a}-${l}`}}return null}function Ga(t){if(!t)return!1;let[e,n,o]=t.slice(0,10).split("-").map(Number);if(!e||!n||!o)return!1;let r=n-1;for(let i of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let a=i.querySelector("a");if(!a)continue;let l=parseInt(i.getAttribute("data-month"),10),d=parseInt(i.getAttribute("data-year"),10),u=parseInt(a.textContent,10);if(d===e&&l===r&&u===o)return!0}return!1}var Be=null;function za(t,e){Be&&s.clear(Be);let n=Date.now()+(e?re:8e3),o=()=>{!s.alive||Date.now()>n||Ga(t)||(s.send({action:"selectFirstDate",date:t,maxMs:e?re:8e3,pollMs:q}),Be=s.setTimeout(o,q))};Be=s.setTimeout(o,80)}function Dr(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Xa(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function Ir(t){return t?.length?t.map((e,n)=>({entry:e,index:n,avail:Xa(e)})).sort((e,n)=>n.avail!==e.avail?n.avail-e.avail:e.index-n.index):[]}function Qa(t){let e=Ir(t);return e.length?{entry:e[0].entry,slotIndex:e[0].index}:{entry:null,slotIndex:0}}function Lr(){St&&(s.clear(St),St=null)}async function Za(t){let e=Date.now()+Math.max(0,Number(t)||0);for(;s.alive&&Date.now()<e;){if(se()||_())return!1;if(L()&&Ne())return!0;await new Promise(n=>s.setTimeout(n,q))}return!!(L()&&Ne())}var Pr=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),Or=null,Ja=null,St=null;function ts(t,e){Or=t,Ja=e?String(e).slice(0,10):null}function es(t,e=0){St&&s.clear(St);let n=t?String(t).slice(0,10):null,o=0,r=async()=>{if(!s.alive||se()||++o>240||L())return;let i=(Or||[]).filter(a=>a&&a.Time);if(i.length){let{entry:a,slotIndex:l}=Qa(i);if(M(`Watchdog: picking time slot #${l+1}\u2026`),await Gt({time:Dr(a.Time),date:a.Date?String(a.Date).slice(0,10):n,slotIndex:l,pollMs:q,maxMs:600,prefix:m}),L())return}else if(document.querySelector(Pr)&&(M("Watchdog: picking visible time slot\u2026"),await Gt({time:"00:00",date:n,slotIndex:e,pollMs:q,maxMs:600,prefix:m}),L()))return;St=s.setTimeout(r,q)};St=s.setTimeout(r,300)}var ns=["#datepicker.hasDatepicker","#datepicker .ui-datepicker","#ui-datepicker-div"].join(", ");async function os(t,e=!1){if(e)return null;let n=await ja(t,e);if(!n)return null;let o=await z(),r=new Date;r.setHours(0,0,0,0);let i=(t||[]).map(d=>$n(d?.Date)).filter(Boolean).filter(d=>{let[u,p,g]=d.slice(0,10).split("-").map(Number);return new Date(u,p-1,g)>=r}).sort((d,u)=>d.localeCompare(u)),a=o?i.filter(d=>ce(d,o.from,o.to)):i,l=ie(a.length);return M(`Selecting date #${l+1}: ${n}\u2026`),await s.waitFor(ns,{attempts:120,interval:q}),s.send({action:"selectFirstDate",date:n,maxMs:o?re:8e3,pollMs:q}),za(n,o),es(n,Pe),n}async function rs(t,e=!1){if(e||_()||se())return;let n=await z();if(!n&&!await w("autoSelectFirstDate"))return;Lr();let o=(t||[]).filter(l=>!(!l||!l.Time||l.EntriesAvailable!=null&&Number(l.EntriesAvailable)<=0));n&&(o=o.filter(l=>{let d=l.Date?String(l.Date).slice(0,10):null;return d?d>=n.from&&d<=n.to:!0}));let r=Ir(o);if(!r.length)return;let i=Date.now()+1e4;for(;Date.now()<i&&s.alive&&!(Zo(o)||document.querySelector(Pr));)await new Promise(l=>s.setTimeout(l,q));let a=r.length===1?Oe:dr;M(r.length===1?`1 time slot \u2014 try highest avail, wait \u2264${a/1e3}s for Submit\u2026`:`${r.length} time slots \u2014 try highest\u21922nd\u21923rd\u2026 (${a/1e3}s each for Submit)`);for(let l=0;l<r.length;l++){if(!s.alive||se()||_())return;let{entry:d,index:u,avail:p}=r[l],g=Dr(d.Time),b=d.Date?String(d.Date).slice(0,10):null,A=l===0?"highest":l===1?"2nd-highest":l===2?"3rd-highest":`${l+1}th-highest`;if(M(`Trying ${A} avail (${p}) @ ${g} \u2014 slot ${l+1}/${r.length}\u2026`),!await Gt({time:g,date:b,slotIndex:u,pollMs:q,maxMs:4e3,prefix:m})&&!L()){M(`Could not click ${g} \u2014 trying next\u2026`);continue}if(M(`Selected ${g} (${A}) \u2014 waiting \u2264${a/1e3}s for Submit to enable\u2026`),await Za(a)){M(`Submit enabled on ${g} \u2014 clicking\u2026`),n?await Cn(n.accountId):_n();return}l<r.length-1&&M(`Submit still disabled on ${g} \u2014 trying next (${l+2}/${r.length})\u2026`)}M(`Tried all ${r.length} time slot(s); Submit never enabled.`),n&&lt()}async function qr(t){if(!N()||_())return;let e;try{e=Ya(t)}catch{return}if(e==null)return;if(nr(e),e.retryAfter!==void 0){let i=Number(e.retryAfter);ho(e.cgiBlock,i),i?(ve(i),wn(i)):w("defaultWaitTime").then(a=>{ve(a),wn(a)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let i=e.response.Posts||[],a=new Map((await nt()).map(l=>[l.ID,l]));for(let l of i)a.set(l.ID,{...a.get(l.ID),...l});await Tt([...a.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let i=e.response.Members||[];if(i.length){let a=await B()||{},l=a.name&&i.find(d=>d.FullName===a.name);a.visa=(l||i[0]).VisaClassName,await T({profile:a,members:i})}}if($r.includes(e.tail)){It(),Po(e),br();let i=await z();await le()||w("defaultWaitTime").then(p=>{ve(p)});let l=await nt(),d=l.find(p=>p.ID===e.params.postId);d&&(d.Days=e.response.ScheduleDays,d.Updated=Date.now(),d.HasError=e.response.HasError,d.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,Tt(l)),await Va(e.response.ScheduleDays,{postId:e.params.postId,postName:d?.Name,hasError:e.response.HasError}),await Fo(e.response.ScheduleDays,{postId:e.params.postId,postName:d?.Name,hasError:e.response.HasError}),i&&!e.response.HasError?yn(e.response.ScheduleDays,i.from,i.to).length?Pt():lt():i&&lt();let u=await os(e.response.ScheduleDays,e.response.HasError);if(u)Pt(),await Ko(d?.Name,u);else if(i&&!e.response.HasError){let p=(e.response.ScheduleDays||[]).map(b=>$n(b?.Date)).filter(Boolean),g=p.filter(b=>ce(b,i.from,i.to));p.length&&!g.length?(lt(),M(`Dates found but none in ${i.from} \u2192 ${i.to}. Next city in 13\u201318s\u2026`)):p.length||(lt(),M("No dates on this city \u2014 next city in 13\u201318s\u2026"))}await tn()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let i=e.params.Date.split("T")[0];ts(e.response.ScheduleEntries,i),Lr();let a=await nt(),l=a.filter(u=>u.Days&&u.Updated).sort((u,p)=>p.Updated-u.Updated).find(u=>u.Days.some(p=>p.Date===i));if(l){let u=l.Days.find(p=>p.Date===i);u&&(u.Times=e.response.ScheduleEntries,Tt(a))}await rs(e.response.ScheduleEntries,e.response.HasError);let d=(e.response.ScheduleEntries||[]).filter(u=>u&&u.Time);d.length?(Pt(),await Yo(l?.Name,e.params.Date,d.length)):(lt(),M("No time slots on this date \u2014 next city in 13\u201318s\u2026")),await tn()}}function Rr(t){if(!N()||_())return;let e=Mr(t.data.url);$r.includes(e)&&Eo()}var xt=null,Dn="",Mn={scanning:"Scanning for Cloudflare challenge\u2026",dom:"Trying page-level verify click\u2026",debugger:"Advanced click \u2014 targeting Turnstile iframe\u2026",retry:"Waiting before next attempt\u2026",success:"Verification passed \u2014 continuing\u2026",manual:"Stuck? Click the checkbox once, then we\u2019ll continue."};function Nr(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=f.cfFlash,n.dataset[x.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),s.setTimeout(()=>n.remove(),1200)}}function is(){let t=document.querySelector(h(c.cfHud));return t||(t=document.createElement("div"),t.id=c.cfHud,t.dataset[x.mark]="",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.innerHTML=`
    <div class="${f.cfHud}">
      <div class="${f.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">\u{1F6E1}</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${Mn.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `,document.documentElement.appendChild(t),t)}async function k(t,e){if(!chrome.runtime?.id||!s.alive||!await w("autoCloudflareTick"))return;let n=is(),o=n.querySelector("[data-cf-msg]"),r=n.querySelector("[data-cf-sub]"),i=n.querySelector("[data-cf-chip]"),a=n.querySelector(`.${f.cfHud}`);Dn=t,o&&(o.textContent=Mn[t]||Mn.scanning),r&&(r.textContent=e||as(t)),i&&(i.textContent=t==="success"?"Done":t==="manual"?"Help":"Active",i.dataset.state=t),a&&(a.dataset.state=t),xt&&(s.clear(xt),xt=null),t==="success"&&(xt=s.setTimeout(()=>In(),2800))}function as(t){return t==="debugger"?"Precision click via advanced browser bridge":t==="dom"?"Standard page interaction":t==="manual"?"One manual click is usually enough":t==="success"?"Resuming login and recovery":"Monitoring this tab for Turnstile"}function In(){let t=document.querySelector(h(c.cfHud));t&&t.remove(),Dn="",xt&&(s.clear(xt),xt=null)}function Ln(){return Dn}var ss=/we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i,cs=/\bUSG\s+[a-f0-9-]{8,}/i;var On="vsPortalErrorReloadCount",Wr="vsPortalErrorReloadAt",ls=2e3,us=1e4,Br=!1,Ot=null,ds=null;function fs(){return(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim()}function qt(){let t=fs().slice(0,6e3);return t?!!(/a timeout occurred/i.test(t)&&(/error\s*524/i.test(t)||/origin web server timed out/i.test(t)||/cloudflare ray id/i.test(t))||/error\s*524/i.test(t)&&/cloudflare/i.test(t)&&t.length<8e3||ss.test(t)&&(cs.test(t)||/error id\s*#/i.test(t))||/we'?re sorry,\s*but something went wrong/i.test(t)&&t.length<2500):!1}function Ur(){try{return Math.max(0,Number(sessionStorage.getItem(On)||0))}catch{return 0}}function ms(){try{let t=Ur()+1;return sessionStorage.setItem(On,String(t)),sessionStorage.setItem(Wr,String(Date.now())),t}catch{return 1}}function Pn(){try{sessionStorage.removeItem(On),sessionStorage.removeItem(Wr)}catch{}}function ps(t){return Math.min(us,ls+Math.max(0,t-1)*1e3)}function hs(){Ot&&(s.clear(Ot),Ot=null)}function gs(){ms();try{location.reload()}catch{}}function Hr(){if(!s.alive||Ot)return;if(!qt()){Pn();return}let t=Ur()+1,e=ps(t);Ot=s.setTimeout(()=>{if(Ot=null,!!s.alive){if(!qt()){Pn();return}gs()}},e)}function Fr(){if(Br)return;Br=!0;let t=()=>{s.alive&&(qt()?Hr():(Pn(),hs()))};t(),ds=s.setInterval(t,1500);try{let e=new MutationObserver(()=>{s.alive&&qt()&&Hr()});e.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),s.disposable(()=>e.disconnect())}catch{}}var We=null,fe=0,de=null,ut=0;async function ys(){try{let e=(await S("humanClickProfile")).humanClickProfile,n=e?.liveTrained&&e.samples?.length||0;return n<5?15e3:n<20?1e4:n<50?6e3:3500}catch{return 12e3}}var Rn=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function F(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!D()&&!Ln()}function D(){if(qt()||document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return Rn.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:qn().length>0}function He(t){return new Promise(e=>setTimeout(e,t))}function bs(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let o of n.querySelectorAll("*"))o.shadowRoot&&(t.push(o.shadowRoot),e.push(o.shadowRoot))}return t}function qn(){let t=[],e=new Set,n=o=>{if(!o||e.has(o))return;let r=o.getBoundingClientRect();if(r.width<40||r.height<20||r.width>900||r.height>400)return;let i=(o.src||o.getAttribute?.("src")||"").toLowerCase(),a=(o.title||o.getAttribute?.("title")||"").toLowerCase(),l=(o.className?.toString?.()||"").toLowerCase(),d=(o.id||"").toLowerCase(),u=o.tagName==="IFRAME"&&(i.includes("challenges.cloudflare")||i.includes("turnstile")||a.includes("cloudflare")||a.includes("security challenge")),p=l.includes("cf-turnstile")||l.includes("turnstile")||d.includes("turnstile")||d.includes("challenge")||o.hasAttribute?.("data-sitekey")||o.hasAttribute?.("data-turnstile-widget");if(!u&&!p)if(o.tagName==="IFRAME"&&r.width>=120&&r.width<=420&&r.height>=45&&r.height<=120){if(!Rn.test(document.body?.innerText||""))return}else return;e.add(o),t.push({el:o,rect:r})};for(let o of bs()){for(let r of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let i of o.querySelectorAll(r))n(i);for(let r of o.querySelectorAll("iframe"))n(r)}return t}function ws(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function Ss(t){let e=[],n=new Set,o=(r,i)=>{if(!Number.isFinite(r)||!Number.isFinite(i)||r<1||i<1||r>window.innerWidth-1||i>window.innerHeight-1)return;let a=`${Math.round(r)},${Math.round(i)}`;n.has(a)||(n.add(a),e.push({x:Math.round(r),y:Math.round(i)}))};for(let{rect:r}of t){let i=r.top+r.height/2,a=r.left+Math.min(28,Math.max(18,r.width*.11));for(let l of[0,-4,4,-8,8,12,16,20,24,28,32])for(let d of[0,-3,3,-6,6])o(a+l,i+d);o(r.left+r.width*.5,i)}return e}function xs(t){for(let{el:e,rect:n}of t)try{e.click();let o=n.left+Math.min(26,n.width*.12),r=n.top+n.height/2,i=document.elementFromPoint(o,r)||e;for(let a of["pointerdown","mousedown","mouseup","pointerup","click"])i.dispatchEvent(new MouseEvent(a,{bubbles:!0,cancelable:!0,clientX:o,clientY:r,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let o=n.getBoundingClientRect();if(o.width<4&&o.height<4)continue;let r=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!r.includes("human")&&!r.includes("verify")&&e==="input[type='checkbox']"){let i=n.closest("label, div, form");if(!Rn.test(i?.textContent||""))continue}return n.click(),!0}return!1}async function Kr(t){t.length&&(Nr(t.slice(0,3)),s.send({action:"viewportClickPoints",points:t}),await w("cloudflareDebuggerClick")?(await k("debugger","Trained click on Verify you are human\u2026"),s.send({action:"cloudflareDebuggerClick",points:t,primaryOnly:!0})):await k("dom"))}async function Ue(){if(!await w("autoCloudflareTick"))return!1;if(F())return ut=0,await k("success"),!0;ut||(ut=Date.now());let t=await ys();if(Date.now()-ut<t)return await k("scanning","Train window \u2014 click Verify you are human yourself (recording your mouse)\u2026"),!1;await k("scanning","Verify you are human page \u2014 preparing click\u2026");let e=qn();ws(e),await He(350),e=qn();let n=Ss(e);return n.length&&(await Kr(n),await He(1200),F()||!D())?(ut=0,await k("success"),!0):(await k("dom"),xs(e),await He(600),F()||!D()?(ut=0,await k("success"),!0):n.length&&(await Kr(n),await He(1e3),F()||!D())?(ut=0,await k("success"),!0):(fe++,fe>=8?await k("manual","Click the checkbox once \u2014 we will continue after."):await k("retry",`Retry ${fe}/8\u2026`),!1))}function vs(){de||(de=new MutationObserver(()=>{s.alive&&D()&&!F()&&Ue()}),de.observe(document.documentElement,{childList:!0,subtree:!0}),s.disposable(()=>{de?.disconnect(),de=null}))}function Nn(){We&&(s.clear(We),We=null),fe=0,ut=0,In()}async function Bn(){if(Nn(),!await w("autoCloudflareTick"))return;vs();let t=async()=>{if(s.alive&&await w("autoCloudflareTick")){if(D()&&!F()){await Ue();return}Ln()&&(fe=0,await k("success"))}};t(),We=s.setInterval(t,1800)}var Rt="sessionRecovery",Hn="homeKeepaliveAt",Wn="homeLoadingStuckAt",Yr=6e5,Ts=6e5,_s=48e4,Vr=12e4,Cs=9e4,jr=2e3,Ke=!1,Gr=null,Un=null,Fn=null,Fe=null,me=0;function zr(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function ks(t,e){let n=zr(t);if(!n)return"";let o="",r=0;for(let i of e||[]){let a=zr(i.q);if(!a||!i.a)continue;if(n.includes(a)||a.includes(n))return i.a;let l=a.split(" ").filter(p=>p.length>3),d=0;for(let p of l)n.includes(p)&&d++;let u=l.length?d/l.length:0;u>r&&u>=.5&&(r=u,o=i.a)}return o}async function As(){let t=await S([at,"profile"]),e=t[at]||{},n=t.profile?.id?String(t.profile.id):null,o=n?e[n]:null;return o||(o=Object.values(e).find(r=>r?.loginId&&r?.loginPass)||null),o||{}}function Xr(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,o=Object.getOwnPropertyDescriptor(n,"value")?.set;o?o.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function dt(t){return new Promise(e=>setTimeout(e,t))}function X(t,e){return t+Math.random()*(e-t)}async function Kn(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await dt(X(250,600)),Xr(t,"");let o="";for(let r=0;r<n.length;r++){let i=n[r];o+=i,Xr(t,o),t.dispatchEvent(new KeyboardEvent("keydown",{key:i,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:i,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:i,bubbles:!0}));let a=X(90,220);/[\s@._]/.test(i)&&(a+=X(120,320)),Math.random()<.08&&(a+=X(200,450)),await dt(a)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await dt(X(200,500))}var Ye=!1,Ve=!1;function je(t){return!t||t.disabled?!1:(t.click(),!0)}function Es(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let o of t){let r=(o.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(r))continue;let i=o.querySelector("input[type='checkbox']")||document.getElementById(o.getAttribute("for")||"");i&&!i.checked&&(je(i),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(o=>/^(continue|ok|accept|agree)$/i.test((o.textContent||o.value||"").trim()));return e&&n&&je(n),e>0}function Qr(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function $s(t){if(Ye)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;Ye=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await Kn(e,t.loginId),await dt(X(400,900))),n&&t.loginPass&&!n.value&&(await Kn(n,t.loginPass),await dt(X(500,1100)));let o=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(r=>/sign in|log in|continue/i.test(r.textContent||r.value||""));return o&&(n?.value||t.loginPass)?(await dt(X(600,1400)),je(o),!0):!!(e||n)}finally{Ye=!1}}async function Ms(t){if(Ve)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let r of n){let i=(r.textContent||"").trim();if(i.length<12||i.length>220||!/\?/.test(i)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(i))continue;let a=r.querySelector("input[type='text']")||document.getElementById(r.getAttribute("for")||"")||r.parentElement?.querySelector("input[type='text']");a&&a.offsetParent!==null&&e.push({text:i,input:a})}for(let r of["kba1_response","kba2_response","kba3_response"]){let i=document.getElementById(r);if(!i)continue;let l=(i.closest(".form-group, .entry, li, div")||i.parentElement)?.textContent||"";e.some(d=>d.input===i)||e.push({text:l,input:i})}let o=[];for(let{text:r,input:i}of e){if(i.value)continue;let a=ks(r,t.security);a&&o.push({input:i,ans:a})}if(!o.length)return!1;Ve=!0;try{for(let{input:i,ans:a}of o)await Kn(i,a),await dt(X(350,800));await dt(X(600,1400));let r=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(i=>/continue|submit|verify/i.test(i.textContent||i.value||""));return r&&je(r),!0}finally{Ve=!1}}function Zr(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||D()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function ft(){return ct()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function Ds(t=""){return/\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(t||""))}function Yn(){if(ft()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||D()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}function Is(t){return!!(t?.loginId&&t?.loginPass)}function Ls(){return Zr()?!1:!!(Qr()||document.querySelector("#kba1_response, #kba2_response, #kba3_response")||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))}async function Ps(){let t=(await S(Rt))[Rt],e=!!t?.active,n=await As();if(D()){await Ue();return}if(Es(),Zr()){e&&(await T({[Rt]:{...t,active:!1,doneAt:Date.now()}}),s.send({action:"recoveryReturnToOfc"}));return}Ls()&&Is(n)&&await w("autofillLogin")&&(await Ms(n)||(Qr()||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))&&await $s(n))}function Jr(){if(!Yn()||Gr)return;let t=async()=>{s.alive&&await Ps()};t(),Gr=s.setInterval(t,1200)}function ti(){return Yr+Math.random()*(Ts-Yr)}async function ei(){try{let t=await S(Hn),e=Number(t[Hn])||0;return Date.now()-e<_s?!1:(await T({[Hn]:Date.now()}),!0)}catch{return!0}}function ni(){if(ft()||!Yn()||document.querySelector("#post_select")||Un)return;let t=()=>{s.alive&&(Un=s.setTimeout(async()=>{if(Un=null,!s.alive||ft()||Ds(location.href)||document.querySelector("#post_select")||!Yn())return;if(Ye||Ve||Ke){t();return}if((await S(Rt))[Rt]?.active){t();return}if(!await ei()){t();return}try{location.reload()}catch{t()}},ti()))};t()}function oi(){if(!ft()||Fn)return;let t=()=>{s.alive&&(Fn=s.setTimeout(async()=>{if(Fn=null,!(!s.alive||!ft())){if(await ei())try{s.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}t()}},ti()))};t()}async function Os(){try{let t=await S(Wn),e=Number(t[Wn])||0;return Date.now()-e<Cs?!1:(await T({[Wn]:Date.now()}),!0)}catch{return!0}}function ri(){if(!ft()||Fe)return;let t=async()=>{if(Fe=null,!(!s.alive||!ft())){try{if(bn()){if(me||(me=Date.now()),Date.now()-me>=Vr){if(await Os()){try{M(`Date Loading stuck \u2265${Vr/1e3}s \u2014 reloading Application Home\u2026`)}catch{}try{s.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}}me=Date.now()}}else me=0}catch{}s.alive&&ft()&&(Fe=s.setTimeout(t,jr))}};Fe=s.setTimeout(t,jr)}async function ii(t){if(!/PSE0501|unable to load appointment available days/i.test(String(t||""))||Ke)return;Ke=!0,s.setTimeout(()=>{Ke=!1},8e3);let e=await G();await T({[Rt]:{active:!0,ofcUrl:location.href,accountId:e,startedAt:Date.now()}}),s.send({action:"recoveryStart",ofcUrl:location.href})}var jn="humanClickProfile",Gn=150,di=120,qs=400,ai=!1,mt=[],Ge=0,vt=0,Bt=0,v=null,si=0,pe=!1,Nt=null,ze=0;function Rs(){let t=[];for(let e of document.querySelectorAll('iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]')){let n=e.getBoundingClientRect();n.width<40||n.height<20||n.width>900||n.height>400||t.push(n)}if(!t.length&&D())for(let e of document.querySelectorAll("iframe")){let n=e.getBoundingClientRect();n.width>=120&&n.width<=420&&n.height>=45&&n.height<=120&&t.push(n)}return t}function he(){let t=Rs();if(!t.length)return null;let e=t[0];return{x:e.left+Math.min(28,Math.max(18,e.width*.11)),y:e.top+e.height/2,w:e.width,h:e.height,left:e.left,top:e.top}}function zn(t,e,n){return n?t>=n.left-40&&t<=n.left+n.w+40&&e>=n.top-30&&e<=n.top+n.h+30:!1}function fi(t){let e=performance.now();Ge||(Ge=e);let n=v,o=n?(t.clientX-n.x)/Math.max(24,n.w*.12):0,r=n?(t.clientY-n.y)/Math.max(20,n.h*.5):0;mt.push({nx:Math.round(o*1e3)/1e3,ny:Math.round(r*1e3)/1e3,x:Math.round(t.clientX),y:Math.round(t.clientY),t:Math.round(e-Ge)}),mt.length>di&&mt.shift()}async function mi(){return(await S(jn))[jn]||{version:2,maxSamples:Gn,samples:[],avgHoverMs:420,avgPressMs:70,avgApproachMs:800,liveTrained:!1}}function Vn(t,e,n){if(!t.length)return n;let o=t.reduce((r,i)=>r+(Number(i[e])||0),0);return Math.round(o/t.length)}async function Ns(t){let e=Date.now();if(e-si<qs)return null;si=e;let n=await mi(),o=Array.isArray(n.samples)?n.samples.slice():[];for(o.push(t);o.length>Gn;)o.shift();let r={version:2,maxSamples:Gn,samples:o,avgHoverMs:Vn(o,"hoverMs",420),avgPressMs:Vn(o,"pressMs",70),avgApproachMs:Vn(o,"approachMs",800),updatedAt:e,liveTrained:!0,source:"visa-page-live"};return await T({[jn]:r}),ze=o.length,Bs(t,r).catch(()=>{}),r}async function Bs(t,e){try{if(!await w("serverSync"))return;let n=await B()||{},r={client_id:`hc-${t.at||Date.now()}-${Math.random().toString(36).slice(2,8)}`,profile:{id:n.id||"",email:n.email||"",name:n.name||"",visa:n.visa||""},sample:t,profile_meta:{sampleCount:e?.samples?.length||0,avgHoverMs:e?.avgHoverMs,avgPressMs:e?.avgPressMs,avgApproachMs:e?.avgApproachMs,liveTrained:!0,source:"visa-page-live",extensionHost:location.host}};s.send({action:"uploadHumanClickSample",payload:r})}catch{}}function Xe(){mt=[],Ge=0,vt=0,Bt=0,Nt=null}function Xn(){pe||(pe=!0,Xe(),v=he())}function pi(){pe=!1,v=null,Xe()}async function ci(t){if(s.alive){if(!D()||F()){pe&&pi();return}Xn(),v||(v=he()),!Bt&&v&&zn(t.clientX,t.clientY,v)&&(Bt=performance.now()),fi(t)}}async function li(t){if(!(!s.alive||t.button!==0)&&!(!D()||F())){Xn(),v=he(),vt=performance.now(),Bt||(Bt=vt),Nt={x:t.clientX,y:t.clientY},fi(t);try{k("scanning",`Recording click\u2026 (saved ${ze} so far)`)}catch{}}}async function ui(t){if(!s.alive||t.button!==0||!vt)return;if(!D()&&!F()){Xe();return}let e=performance.now(),n=Math.max(25,Math.min(500,e-vt)),o=Math.max(30,Math.min(3e3,vt-(Bt||vt))),r=mt.length?mt[mt.length-1].t:o,i=Math.max(o,Math.min(12e3,r||o)),a=mt.slice(-di),l=v&&zn(t.clientX,t.clientY,v)||v&&Nt&&zn(Nt.x,Nt.y,v)||!v&&a.length>=2,d=Nt;if(Xe(),!l&&a.length<2||a.length<1&&!l)return;let u={hoverMs:Math.round(o),pressMs:Math.round(n),approachMs:Math.round(i),path:a,down:d?{x:Math.round(d.x),y:Math.round(d.y)}:null,up:{x:Math.round(t.clientX),y:Math.round(t.clientY)},target:v?{x:Math.round(v.x),y:Math.round(v.y),w:Math.round(v.w),h:Math.round(v.h),left:Math.round(v.left),top:Math.round(v.top)}:null,viewport:{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio||1,scrollX:Math.round(window.scrollX||0),scrollY:Math.round(window.scrollY||0)},pointerType:t.pointerType||"mouse",url:location.pathname+location.search,at:Date.now()};if(!u.target){let b=he();b&&(u.target={x:Math.round(b.x),y:Math.round(b.y),w:Math.round(b.w),h:Math.round(b.h),left:Math.round(b.left),top:Math.round(b.top)})}let p=await Ns(u);if(!p)return;let g=p.samples?.length||0;try{k("success",`Saved verify-human click #${g} \u2014 keep clicking naturally when it appears`)}catch{}}async function Hs(){try{let t=await mi(),e=t.liveTrained&&t.samples?.length||0;return ze=e,e}catch{return ze}}function hi(){if(ai)return;ai=!0,s.on(window,"pointermove",ci,{passive:!0,capture:!0}),s.on(window,"pointerdown",li,{passive:!0,capture:!0}),s.on(window,"pointerup",ui,{passive:!0,capture:!0}),s.on(window,"mousemove",ci,{passive:!0,capture:!0}),s.on(window,"mousedown",li,{passive:!0,capture:!0}),s.on(window,"mouseup",ui,{passive:!0,capture:!0});let t=async()=>{if(!s.alive)return;if(!D()||F()){pe&&pi();return}Xn(),v||(v=he());let e=await Hs();try{k("scanning",e?`Train mode \u2014 click Verify you are human naturally (saved ${e})`:"Train mode \u2014 move mouse naturally, then click Verify you are human (recording\u2026)")}catch{}};t(),s.setInterval(t,2500)}var Ws=`
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
`;function gi(){if(document.querySelector(h(c.styles)))return;let t=document.createElement("style");t.id=c.styles,t.dataset[x.mark]="",t.textContent=Ws,(document.head||document.documentElement).appendChild(t)}uo();An();Zn(()=>{kr(),s.destroy()});Fr();if(!_()){s.disposable(()=>{let o=document.querySelector(h(c.anchor)),r=document.querySelector("#post_select");o&&r&&o.replaceWith(r);for(let i of document.querySelectorAll("[data-"+x.mark+"]"))i.remove()}),gi(),s.send({action:"registerBlockGuard",prefix:m}),s.send({action:"registerRedirect",prefix:m}),s.send({action:"registerAlertGuard",prefix:m}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&s.send({action:"registerOfcReader",prefix:m}),s.on(window,"message",o=>{if(s.alive&&o.source===window)switch(o.data?.action){case ot.req:return Rr(o);case ot.res:return qr(o);case ot.ofc:return qo(o);case ot.err:return Qt("native_alert",o.data?.text),ii(o.data?.text);case ot.sub:Lo(),Xt(),Vo();return}}),chrome.storage.onChanged.addListener((o,r)=>{r==="local"&&(o.profile&&ln(),o.waitPillClock&&Mo(o.waitPillClock.newValue),o.autoCloudflareTick&&(o.autoCloudflareTick.newValue?Bn():Nn()))}),s.on(document,"click",o=>{$t();let r=o.target.closest(h(c.waitTime));if(r){if(r.dataset.skipClick){delete r.dataset.skipClick;return}$o()}}),s.on(document,"keydown",$t),s.on(window,"focus",$t),s.on(document,"visibilitychange",()=>{document.hidden||$t()}),Jr(),ni(),oi(),ri(),hi(),Bn();async function t(){!s.alive||_()||!ct()||document.querySelector("#post_select")&&(It(),await Promise.all([an(),cn(),En()]),Qo({slotIndex:Pe,shouldPick:async()=>await z()?!0:!!await w("autoSelectFirstDate"),onSlotPicked:()=>Ar()}))}async function e(){!s.alive||_()||!ct()||await _r()}async function n(){po(),go(),await Promise.all([ln(),bo(),yo(),an(),cn(),En()]),en()}document.readyState==="complete"?n():s.on(window,"load",n),s.setInterval(t,2500),s.setInterval(e,3e4),e()}})();
