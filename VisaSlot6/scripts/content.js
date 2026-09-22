(()=>{function G(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function C(t){return G()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,i]of Object.entries(t))e[n]=i;return e}):Promise.resolve(typeof t=="string"?{}:t)}function _(t){return G()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function sa(t){return G()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function ca(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",i=>{String(i.reason?.message||i.reason||"").includes("Extension context invalidated")&&(i.preventDefault(),e())});let n=setInterval(()=>{G()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var at="https://the.gopg.online",go=`${at}/contribute`,la=`${at}/contribute/telegram`,Yf=`${at}/contribute/human-click`,Gn=`${at}/contribute/tik-tik-prefs`,ua=`${at}/contribute/tik-tik-coord`,da=`${at}/contribute/tik-tik-auth`,fa=`${at}/contribute/community-slots`;var pa=20,ma=4320*60*1e3,Vn=100,ha=4,Yn=100,ga=240,ya=50,ba=1440*60*1e3,Ml={recheckButton:!1,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function T(t){return C({[t]:Ml[t]}).then(e=>e[t])}function Dt(){return C({posts:[]}).then(t=>t.posts)}function ve(t){return _({posts:t})}function B(){return C("profile").then(t=>t.profile)}var oe=t=>String(t).padStart(2,"0");function tn(t){let e=oe(t%60),n=Math.floor(t/60)%60,i=Math.floor(t/3600);return i?`${oe(i)}:${oe(n)}:${e}`:`${oe(n)}:${e}`}function xa(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${oe(n.getUTCHours())}:${oe(n.getUTCMinutes())}:${oe(n.getUTCSeconds())}`}}function yo(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),i=t%60,o=[];return e>0&&o.push(`${e}d`),(n>0||e>0)&&o.push(`${n}h`),o.push(`${i}m`),o.join(" ")}function wa(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),i=o=>n.find(a=>a.type===o)?.value??"";return`${i("month")} ${i("day")} ${i("year")} ${i("hour")}:${i("minute")} ${i("dayPeriod")}`}function Sa(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),i=parseInt(e[2],10),o=parseInt(e[3],10),a=e[4];a&&(a.toUpperCase()==="PM"&&n<12&&(n+=12),a.toUpperCase()==="AM"&&n===12&&(n=0));let c=new Date;return c.setHours(n,i,o,0),c.getTime()>Date.now()+6e4&&c.setDate(c.getDate()-1),c}var va=Symbol(),Al=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&G()}on(t,e,n,i){t.addEventListener(e,n,{...i,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!G())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=ha,interval:n=Vn}={}){return new Promise(i=>{let o=a=>{if(!this.alive)return;let c=document.querySelector(t);if(c)return i(c);if(a>=e)return i(null);this.setTimeout(()=>o(a+1),n)};o(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},l=new Al;function $a(){let t=globalThis[va];Object.defineProperty(globalThis,va,{value:l,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var Qn=new Uint32Array(2);crypto.getRandomValues(Qn);var ka="abcdefghjkmnpqrstuvwxyz",Dl=(Qn[0].toString(36)+Qn[1].toString(36)).replace(/[^a-z0-9]/g,""),d=(ka[Qn[0]%ka.length]+Dl).slice(0,8).padEnd(8,"x");function h(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var r={selRow:d+"01",anchor:d+"02",waitTime:d+"03",recheck:d+"04",histCont:d+"05",histTbl:d+"06",cdCard:d+"07",cdTime:d+"08",ofcDate:d+"09",styles:d+"10",datesCont:d+"11",datesPara:d+"12",slotsTbl:d+"12b",aiBtn:d+"13",aiPanel:d+"14",aiFrom:d+"15",aiTo:d+"16",aiStatus:d+"17",aiConfirm:d+"18",aiCancel:d+"19",aiClose:d+"20",aiCities:d+"21",aiSubmitBtn:d+"22",aiCitiesBtn:d+"23",aiLogin:d+"24",aiPass:d+"25",aiQ1:d+"26",aiA1:d+"27",aiQ2:d+"28",aiA2:d+"29",aiQ3:d+"30",aiA3:d+"31",aiSaveLogin:d+"32",cfHud:d+"33",aiCitiesAll:d+"34",aiCitiesNone:d+"35",aiLoginToggle:d+"36",aiLoginBody:d+"37",aiProfiles:d+"63",aiProfilesList:d+"64",aiAddProfile:d+"65",aiLoginCancel:d+"66",aiLoginEditorTitle:d+"67",aiSubmitOn:d+"38",aiSubmitOff:d+"39",aiCitiesOn:d+"40",aiCitiesOff:d+"41",aiWinList:d+"42",aiWinAdd:d+"43",aiWinSave:d+"44",aiWinReset:d+"45",aiWinNote:d+"46",aiSubmitSw:d+"47",aiCitiesSw:d+"48",aiInfoBox:d+"49",aiWarnBox:d+"50",aiOkBox:d+"51",aiWinCard:d+"52",aiSubmitBody:d+"53",aiCitiesBody:d+"54",aiTerms:d+"55",aiTermsAgree:d+"56",aiTermsGate:d+"57",aiMain:d+"58",aiTermsContinue:d+"59",aiFromBtn:d+"60",aiToBtn:d+"61",aiCal:d+"62",hud:d+"68",hudName:d+"69",hudVisa:d+"70",hudBody:d+"71",hudHist:d+"72",hudCities:d+"73",hudSecs:d+"74",hudToggle:d+"7a",authGate:d+"75",authBody:d+"76",comCard:d+"77",comList:d+"78",comFoot:d+"79"},s={pill:d+"a",pillTtl:d+"b",pillTmr:d+"c",pillWait:d+"d",pillDone:d+"e",footer:d+"f",card:d+"g",cardTtl:d+"h",histScrl:d+"i",dltDn:d+"j",dltUp:d+"k",cdDiv:d+"l",hidden:d+"m",sideLink:d+"n",datesLnk:d+"o",slotsSum:d+"o2",slotsTbl:d+"o3",aiOn:d+"p",aiRow:d+"q",aiHint:d+"r",aiCities:d+"s",aiOnBtn:d+"t",aiCityAct:d+"x",cfHud:d+"u",cfPulse:d+"v",cfFlash:d+"w",aiEn:d+"y",aiDis:d+"z",aiWinRow:d+"aa",aiFeat:d+"ab",aiSwitch:d+"ac",aiKnob:d+"ad",aiSec:d+"ae",aiInfo:d+"af",aiWarn:d+"ag",aiOk:d+"ah",aiTrash:d+"ai",aiWinHelp:d+"aj",aiInline:d+"ak",aiHead:d+"al",aiTerms:d+"am",aiTermsCb:d+"an",aiTermsList:d+"ao",aiContinue:d+"ap",aiDateBtn:d+"aq",aiDateField:d+"a1",aiCal:d+"ar",aiCalHead:d+"as",aiCalGrid:d+"at",aiCalDay:d+"au",aiCalMuted:d+"av",aiCalOn:d+"aw",aiCalToday:d+"ax",aiQl:d+"ay",aiQlTitle:d+"az",aiQlSub:d+"ba",aiQlCard:d+"bb",aiQlMeta:d+"bc",aiQlBadge:d+"bd",aiQlEdit:d+"be",aiQlAdd:d+"bf",aiQlEmpty:d+"bg",hud:d+"bh",hudHead:d+"bi",hudName:d+"bj",hudVisa:d+"bk",hudBody:d+"bl",hudCount:d+"bm",hudCountLabel:d+"bn",hudSecs:d+"bo",hudStuck:d+"bp",hudSubmit:d+"bq",hudSubmitTitle:d+"br",hudSubmitSub:d+"bs",hudHist:d+"bt",hudHistTitle:d+"bu",hudHistRow:d+"bv",hudPillOk:d+"bw",hudPillNo:d+"bx",hudMin:d+"b0",hudToggle:d+"b1",hudMiniSecs:d+"b2",hudCities:d+"by",hudCitiesTitle:d+"bz",hudCityLabel:d+"ca",authCard:d+"cb",authSteps:d+"cc",authStep:d+"cd",authStepOn:d+"ce",authEmailBox:d+"cf",authTitle:d+"cg",authOtpRow:d+"ch",authOtpBox:d+"ci",authBtn:d+"cj",authLinks:d+"ck",authLink:d+"cl",authSecure:d+"cm",authClose:d+"cn",authBrand:d+"co",authEmailChip:d+"cp",authPlanList:d+"cq",authPlanRow:d+"cr",authPlanOn:d+"cs",authPlanRadio:d+"ct",authPlanMeta:d+"cu",authPlanName:d+"cv",authPlanDesc:d+"cw",authPlanPrice:d+"cx",authPlanOff:d+"cy",authPlanWas:d+"cz",authPlanOffer:d+"c0",comCard:d+"cz",comBrand:d+"da",comTitle:d+"db",comRow:d+"dc",comOpen:d+"dd",comMain:d+"de",comName:d+"df",comMeta:d+"dg",comPill:d+"dh",comChevron:d+"di",comDrop:d+"dj",comMonth:d+"dk",comMonthLabel:d+"dl",comDates:d+"dm",comDate:d+"dn",comEmpty:d+"do",comFoot:d+"dp"},P={mark:d,w:d+"w",mw:d+"mw"},Ut={req:d+"q",res:d+"r",ofc:d+"o",err:d+"e",sub:d+"s"};function Xn(t){return t.map(e=>String.fromCharCode(e)).join("")}function Pl(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function Ca(){let t=document.createElement("div");return t.className=s.footer,t.textContent=Xn([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function El(t){let e=document.getElementById(r.histCont);e&&e.remove(),e=document.createElement("div"),e.id=r.histCont,e.className=s.card,e.dataset[P.mark]="";let n=document.createElement("h4");n.className=s.cardTtl,n.textContent=Xn([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let i=document.createElement("div");i.className=s.histScrl;let o=document.createElement("table");o.id=r.histTbl;let a=document.createElement("thead"),c=document.createElement("tr");for(let f of["Time","Est. Wait","Change"]){let m=document.createElement("th");m.textContent=f,c.appendChild(m)}a.appendChild(c),o.appendChild(a);let u=document.createElement("tbody");for(let f=t.length-1;f>=0;f--){let m=t[f],y="--",g="";if(f>0){let $=m.minutes-t[f-1].minutes;$<0?(y=`${$}m`,g=s.dltDn):$>0?(y=`+${$}m`,g=s.dltUp):y="0m"}let b=document.createElement("tr"),x=[[m.timeStr,""],[yo(m.minutes),""],[y,g]];for(let[$,D]of x){let S=document.createElement("td");D&&(S.className=D),S.textContent=$,b.appendChild(S)}u.appendChild(b)}o.appendChild(u),i.appendChild(o),e.appendChild(i),e.appendChild(Ca());let p=document.getElementById("last-updated");p&&(p.closest("div, p, section")||p.parentElement).insertAdjacentElement("afterend",e)}function Il(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function Ta(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),i=Il();if(i!==null&&i>ga&&!e.textContent.includes("(")){let c=yo(i);e.textContent=`${e.textContent} (${i} minutes / ${c})`}let o=n.textContent.trim().split(" (")[0],a=Sa(o);if(a&&l.setInterval(()=>{let c=Math.floor((Date.now()-a)/1e3);c>=0&&(n.textContent=`${o} (${c}s ago)`)},1e3),i!==null){let c=Pl(),u=sessionStorage.getItem(c);u||(u=Math.random().toString(36).substring(2,11),sessionStorage.setItem(c,u)),C({queueHistory:{}}).then(p=>{let f=p.queueHistory||{},m=Date.now(),y={};for(let[$,D]of Object.entries(f)){if(!Array.isArray(D))continue;let S=D[D.length-1];S&&m-S.timestamp<ba&&(y[$]=D)}let g=y[u]||[],b=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),x=g[g.length-1];(!x||x.minutes!==i||x.timeStr!==b)&&(g.push({timestamp:m,timeStr:b,minutes:i}),g.length>ya&&g.shift(),y[u]=g,_({queueHistory:y})),El(g)})}}function _a(t,e){let n=document.getElementById("error_row");if(!n)return;let i;t?i=e?`Blocked for 24 hours, about ${tn(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":i="Temporarily blocked. Log in in a new tab, then refresh this page.";let o=document.createElement("div");o.className="atlas_validationalert alert alert-danger warning",o.dataset[P.mark]="",o.textContent=i,n.replaceChildren(o),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function Ma(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&C({cfRetryAfter:null}).then(n=>{let i=parseInt(n.cfRetryAfter,10);if(!isNaN(i)){sa("cfRetryAfter");let o=document.getElementById("what-happened-section");if(o){let a=document.createElement("div");a.id=r.cdCard,a.className=s.card,a.dataset[P.mark]="";let c=document.createElement("h4");c.className=s.cardTtl,c.textContent=Xn([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),a.appendChild(c);let u=document.createElement("div");u.id=r.cdTime,a.appendChild(u);let p=document.createElement("div");p.className=s.cdDiv,a.appendChild(p),a.appendChild(Ca()),o.appendChild(a);let f=i,m=null,y=()=>{f>0?(u.textContent=tn(f),f--):(u.classList.add(s.cdDiv+"-over"),u.textContent="You can try refreshing now!",m!=null&&l.clear(m))};y(),m=l.setInterval(y,1e3)}}})}var Jn="tikTikSession",bo="tikTikDeviceId",Zn="tikTikPendingOtp",J=!1,st=null,Et=null,zt=null,Kt="",ke=!1,re=!1;function ni(){return J}function Aa(t){st=t}function Da(t){Et=t}async function ae(){let e=(await C(bo))[bo];return e||(e=crypto.randomUUID(),await _({[bo]:e})),String(e).slice(0,64)}async function nn(){return(await C(Jn))[Jn]||null}async function Ll(t,e){await _({[Jn]:{token:t,email:e}})}async function wo(){await _({[Jn]:null})}async function Pa(t){Kt=t,ke=!0,await _({[Zn]:{email:t,awaitingOtp:!0,sentAt:Date.now()}})}async function Ce(){ke=!1,await _({[Zn]:null})}async function Ea(){let e=(await C(Zn))[Zn];return!e?.awaitingOtp||!e?.email?(ke=!1,null):Date.now()-Number(e.sentAt||0)>30*6e4?(await Ce(),null):(Kt=String(e.email),ke=!0,e)}async function ii(){try{let t=await B();return t?.id?String(t.id):""}catch{return""}}async function Te(t){let e=await fetch(da||`${at}/contribute/tik-tik-auth`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),signal:AbortSignal.timeout(2e4)}),n=await e.json().catch(()=>({}));return!e.ok&&!n.error&&(n.error="Something went wrong. Try again."),n}async function So(){let t=await nn();return t?.token?Te({action:"status",token:t.token,deviceId:await ae(),applicantId:await ii()}):{loggedIn:!1,access:!1}}async function on(){let t=await So();return t.kicked?(await wo(),J=!1,Et&&Et(""),ko(),{ok:!1,message:""}):t.loggedIn?t.access?(J=!0,{ok:!0,message:""}):(J=!1,{ok:!1,message:""}):(J=!1,{ok:!1,message:""})}function Ia(){return document.querySelector(h(r.authBody))}function q(t,e){let n=document.querySelector(h(r.authBody)+" [data-auth-msg]");n&&(n.textContent=t||"",n.style.color=e?"#9a3412":"#334155")}function Pt(t){return String(t||"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e])}function vo(t){let e=Array.isArray(t?.plans)?t.plans:[],n={};return e.forEach(i=>{i?.key&&(n[i.key]=i)}),{list:e,byKey:n}}function oi(t){return t?.plan?t.plan==="applicant"?!!t.applicantId:t.planEnds?new Date(t.planEnds).getTime()>Date.now():!1:!1}function La(t){if(!t?.plan)return"";let{byKey:e}=vo(t),n=e[t.plan],i=Number(n?n.offerPrice:t.amount),o=n?.label||t.plan;return t.plan==="applicant"?`\u20B9${i||0} \xB7 ${o} ${t.applicantId||""}`.trim():`\u20B9${i||t.amount||0} \xB7 ${o}`}function $e(t,e){let{byKey:n}=vo(e),i=n[t];return i&&i.rank!=null?Number(i.rank)||0:t==="trial"?1:t==="applicant"?2:t==="month"?3:0}function ql(t){return oi(t)?$e(t.plan,t)<$e("month",t):!1}function Ol(t){let e=Math.max(0,Number(t.offerPrice)||0),n=Math.max(0,Number(t.price)||0);return n>e?`<span class="${s.authPlanPrice}"><span class="${s.authPlanWas}">\u20B9${n}</span><span class="${s.authPlanOffer}">\u20B9${e}</span></span>`:`<span class="${s.authPlanPrice}"><span class="${s.authPlanOffer}">\u20B9${e}</span></span>`}function ri(t){let e=Ia();e&&(e.innerHTML=t)}function wt(t,e,n){let i=document.querySelector(t);i&&l.on(i,e,n)}async function en(t){J=!1,ri(`
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
  `),To();let e=document.querySelector(h(`${r.authBody}-email`));e&&Kt&&(e.value=Kt),q(t||"",!!t),wt(h(`${r.authBody}-send`),"click",async i=>{i?.preventDefault?.(),i?.stopPropagation?.();let o=String(e?.value||"").trim();if(!o||!o.includes("@")){q("Enter a valid email.",!0);return}Kt=o,q("Sending OTP\u2026",!1);let a=await Te({action:"send",email:o,deviceId:await ae()});if(!a.success&&!a.sent){q(a.error||"Could not send the OTP.",!0);return}await Pa(o),ti(o,"")}),e&&(l.on(e,"pointerdown",i=>i.stopPropagation()),l.on(e,"keydown",i=>{i.key==="Enter"&&(i.preventDefault(),document.querySelector(h(`${r.authBody}-send`))?.click())}));let n=document.querySelector(h(`${r.authBody}-send`));n&&l.on(n,"pointerdown",i=>i.stopPropagation()),st&&st()}function ti(t,e){if(document.querySelector(h(`${r.authBody}-otpRow`))&&ke&&Kt===t){e&&q(e,!1);return}ri(`
    <div class="${s.authCard}">
      <button type="button" id="${r.authBody}-close" class="${s.authClose}">Close</button>
      <div class="${s.authSteps}">
        <div class="${s.authStep}"><span>1</span> Enter Email</div>
        <div class="${s.authStep} ${s.authStepOn}"><span>2</span> Enter OTP</div>
      </div>
      <div class="${s.authEmailBox}">
        <span>${Pt(t)}</span>
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
  `),To(),q(e||"",!1);let i=p=>document.querySelector(h(`${r.authBody}-d${p}`)),o=()=>[0,1,2,3].map(p=>String(i(p)?.value||"").replace(/\D/g,"")).join(""),a=()=>{for(let p=0;p<4;p++){let f=i(p);f&&(f.value="")}i(0)?.focus()},c=p=>{let f=String(p||"").replace(/\D/g,"").slice(0,4).split("");for(let y=0;y<4;y++){let g=i(y);g&&(g.value=f[y]||"")}let m=Math.min(f.length,3);i(f.length>=4?3:m)?.focus()},u=async()=>{await Ce(),en("")};for(let p=0;p<4;p++){let f=i(p);f&&(l.on(f,"pointerdown",m=>m.stopPropagation()),l.on(f,"input",()=>{let m=String(f.value||"").replace(/\D/g,"");if(m.length>1){c(m),o().length===4&&document.querySelector(h(`${r.authBody}-go`))?.click();return}f.value=m.slice(0,1),m&&p<3&&i(p+1)?.focus(),o().length===4&&document.querySelector(h(`${r.authBody}-go`))?.click()}),l.on(f,"keydown",m=>{if(m.key==="Backspace"&&!f.value&&p>0){i(p-1)?.focus();return}m.key==="ArrowLeft"&&p>0&&(m.preventDefault(),i(p-1)?.focus()),m.key==="ArrowRight"&&p<3&&(m.preventDefault(),i(p+1)?.focus()),m.key==="Enter"&&(m.preventDefault(),document.querySelector(h(`${r.authBody}-go`))?.click())}),l.on(f,"paste",m=>{m.preventDefault();let y=(m.clipboardData||window.clipboardData)?.getData("text")||"";c(y),o().length===4&&document.querySelector(h(`${r.authBody}-go`))?.click()}))}i(0)?.focus(),wt(h(`${r.authBody}-back`),"click",p=>{p?.stopPropagation?.(),u()}),wt(h(`${r.authBody}-back2`),"click",p=>{p?.stopPropagation?.(),u()}),wt(h(`${r.authBody}-resend`),"click",async p=>{p?.preventDefault?.(),p?.stopPropagation?.();let f=document.querySelector(h(`${r.authBody}-resend`));f&&(f.disabled=!0),q("Sending a new OTP\u2026",!1);let m=await Te({action:"send",email:t,deviceId:await ae()});if(f&&(f.disabled=!1),!m.success&&!m.sent){q(m.error||"Could not resend. Try again.",!0);return}await Pa(t),a(),q("New OTP sent. Check your email.",!1)}),wt(h(`${r.authBody}-go`),"click",async p=>{p?.preventDefault?.(),p?.stopPropagation?.();let f=o();if(!/^\d{4}$/.test(f)){q("Enter all 4 digits.",!0);return}q("Verifying OTP\u2026",!1);let m=await Te({action:"verify",email:t,code:f,deviceId:await ae(),applicantId:await ii()});if(!m.token){q(m.error||"Wrong OTP. Try again or Resend.",!0),a();return}await Ll(m.token,m.email||t),await Ce(),q("OTP correct. Logged in.",!1),ai(m)});for(let p of[`${r.authBody}-go`,`${r.authBody}-back`,`${r.authBody}-back2`,`${r.authBody}-resend`]){let f=document.querySelector(h(p));f&&l.on(f,"pointerdown",m=>m.stopPropagation())}}function qa(t,e={}){let n=!!e.upgrade&&oi(t);J=n?!!t.access:!1,re=!n;let i=!!t?.trialUsed,o=n?String(t.plan||""):"",a=$e(o,t),c=n?"Upgrade plan":"Pick your plan",u=n?"Upgrade":"Continue",{list:p,byKey:f}=vo(t),m=p.length?p:[{key:"trial",label:"Trial",desc:"3 days \xB7 once per email",price:99,offerPrice:1,rank:1},{key:"month",label:"Monthly",desc:"30 days \xB7 full access",price:4999,offerPrice:2999,rank:3},{key:"applicant",label:"One applicant",desc:"Lock to one applicant ID",price:499,offerPrice:300,rank:2}],y=m.map(S=>{let k=S.key,Q=n&&o===k,et=n&&$e(k,t)<=a,aa=Q||k==="trial"&&(i||n&&et)||n&&et&&k!=="month",jn=S.desc||"";Q?jn="Current plan":k==="trial"&&i?jn="Already used on this email":n&&et&&(jn="Same or lower than current");let _l=k==="trial"?"Trial":k==="month"?"Monthly":k==="applicant"?"One applicant":S.label||k;return`
      <button type="button" data-plan="${Pt(k)}" role="radio" class="${s.authPlanRow}${aa?` ${s.authPlanOff}`:""}" ${aa?"disabled":""} aria-checked="false">
        <span class="${s.authPlanRadio}" aria-hidden="true"></span>
        <span class="${s.authPlanMeta}">
          <span class="${s.authPlanName}">${Pt(_l)}</span>
          <span class="${s.authPlanDesc}">${Pt(jn)}</span>
        </span>
        ${Ol(S)}
      </button>`}).join("");ri(`
    <div class="${s.authCard}">
      <button type="button" id="${r.authBody}-close" class="${s.authClose}">Close</button>
      <div class="${s.authBrand}">Tik Tik</div>
      <div class="${s.authTitle}">${c}</div>
      <div class="${s.authEmailChip}">${Pt(t.email||"")}</div>
      ${n?`<div class="${s.aiHint}" style="margin:0 0 10px">Current: ${Pt(La(t))}</div>`:""}
      <div class="${s.authPlanList}" role="radiogroup" aria-label="Plans">
        ${y}
      </div>
      <button type="button" id="${r.authBody}-go" class="${s.authBtn}">${u}</button>
      <div class="${s.authLinks}">
        ${n?`<button type="button" id="${r.authBody}-back" class="${s.authLink}">Back</button>`:""}
        <button type="button" id="${r.authBody}-out" class="${s.authLink}" style="color:#64748b">Logout</button>
      </div>
      <div class="${s.authSecure}">${n?"Upgrade keeps you on this laptop":"Secure payment \xB7 one laptop only"}</div>
      <div data-auth-msg class="${s.aiHint}" style="margin-top:8px"></div>
    </div>
  `);let b=m.some(S=>S.key==="month"&&!(n&&o==="month"))?"month":m.find(S=>{let k=S.key,Q=n&&o===k,et=n&&$e(k,t)<=a;return!(Q||k==="trial"&&(i||n&&et)||n&&et&&k!=="month")})?.key||"",x=()=>Array.from(document.querySelectorAll(`${h(r.authBody)} [data-plan]`)),$=()=>{x().forEach(S=>{let k=!!b&&S.getAttribute("data-plan")===b&&!S.disabled;S.classList.toggle(s.authPlanOn,k),S.setAttribute("aria-checked",k?"true":"false")})};$();let D=f.trial?Number(f.trial.offerPrice):1;!n&&i&&q(`The \u20B9${D} trial was already used on this email.`,!1),!n&&t?.reason&&q(t.reason,!t.plan),n&&q("Select a higher plan, then tap Upgrade.",!1),To(),wt(h(`${r.authBody}-out`),"click",()=>Ra()),wt(h(`${r.authBody}-back`),"click",()=>$o(t)),x().forEach(S=>{l.on(S,"click",()=>{S.disabled||(b=S.getAttribute("data-plan"),$(),q("",!1))})}),wt(h(`${r.authBody}-go`),"click",async()=>{if(!b){q(n?"Select a higher plan.":"Select a plan.",!0);return}if(b==="trial"&&i){q(`The \u20B9${D} trial was already used on this email.`,!0);return}if(n&&$e(b,t)<=a){q("Pick a higher plan to upgrade.",!0);return}let S=document.querySelector(h(`${r.authBody}-go`));S&&(S.disabled=!0),q(n?"Upgrading\u2026":"Starting\u2026",!1);let k=await nn(),Q=await Te({action:"choose",token:k?.token,deviceId:await ae(),applicantId:await ii(),plan:b});if(S&&(S.disabled=!1),Q.error){q(Q.error,!0);return}ai(Q)});for(let S of[`${r.authBody}-go`,`${r.authBody}-out`,`${r.authBody}-back`]){let k=document.querySelector(h(S));k&&l.on(k,"pointerdown",Q=>Q.stopPropagation())}x().forEach(S=>{l.on(S,"pointerdown",k=>k.stopPropagation())}),st&&st()}function $o(t){J=!!t.access,re=!1;let e=t.planEnds?` until ${String(t.planEnds).slice(0,10)}`:"",n=ql(t)||!!t.canUpgrade;ri(`
    <div class="${s.authCard}" style="padding:12px 14px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
        <div style="min-width:0">
          <div class="${s.aiHead}" style="font-size:14px;margin:0">${Pt(t.email||"")}</div>
          <div class="${s.aiHint}" style="margin:2px 0 0">${Pt(La(t))}${Pt(e)}</div>
        </div>
        <button type="button" id="${r.authBody}-out" class="${s.authLink}" style="color:#64748b;flex-shrink:0">Logout</button>
      </div>
      <div data-auth-msg class="${s.aiHint}" style="margin-top:8px"></div>
      ${n?`
        <button type="button" id="${r.authBody}-upgrade" class="${s.authBtn}" style="margin-top:12px;padding:11px 14px;font-size:14px">Upgrade plan</button>
      `:""}
    </div>
  `),!t.access&&t.reason&&q(t.reason,!0),wt(h(`${r.authBody}-out`),"click",()=>Ra()),wt(h(`${r.authBody}-upgrade`),"click",()=>qa(t,{upgrade:!0}));for(let i of[`${r.authBody}-out`,`${r.authBody}-upgrade`]){let o=document.querySelector(h(i));o&&l.on(o,"pointerdown",a=>a.stopPropagation())}xo(),st&&st()}function Oa(t){let e=J,n=re;J=!1;let i=t?.reason||"Choose a plan to use Tik Tik.";(e||!n)&&Et&&Et(i),n?t?.reason&&q(t.reason,!0):qa(t),st&&st()}function ai(t){if(t?.kicked){wo(),J=!1,re=!1,ei(),Et&&Et(""),Ce().then(()=>en("This email was logged in on another laptop."));return}if(!t?.loggedIn){if(J=!1,re=!1,ei(),ke&&Kt){ti(Kt,"Enter the OTP from your email.");return}Ea().then(e=>{e?.email?ti(e.email,"Enter the OTP from your email."):en("")});return}if(Ce(),oi(t)&&t.access){$o(t),xo(),st&&st();return}Oa(t),xo()}async function Ra(){let t=await nn();try{await Te({action:"logout",token:t?.token,deviceId:await ae()})}catch{}await wo(),await Ce(),J=!1,re=!1,ei(),Et&&Et(""),en("")}function ei(){zt&&(l.clear(zt),zt=null)}function xo(){ei();let t=async()=>{zt=null;let e=await So().catch(()=>null);if(!e){zt=l.setTimeout(t,5e3);return}if(e.kicked||!e.loggedIn){ai(e);return}if(!(oi(e)&&!!e.access)){Oa(e),zt=l.setTimeout(t,4e3);return}(!J||re)&&($o(e),st&&st()),zt=l.setTimeout(t,5e3)};zt=l.setTimeout(t,5e3)}async function ko(){if(!Ia())return;if(!(await nn())?.token){J=!1;let n=await Ea();if(n?.email){ti(n.email,"Enter the OTP from your email.");return}en("");return}let e=await So();ai(e)}async function se(){let t=await nn(),e=await ae();return{tikTikEmail:t?.email||"",tikTikToken:t?.token||"",tikTikDeviceId:e||"",applicantId:await ii()}}function Na(){ko()}function Co(){return ko()}function Rl(){let t=document.querySelector(h(r.aiPanel));if(!t)return;let e=Number(t.dataset.openedAt||0);e&&Date.now()-e<800||t.classList.add(s.hidden)}function To(){let t=document.querySelector(h(`${r.authBody}-close`));t&&(l.on(t,"pointerdown",e=>e.stopPropagation()),l.on(t,"click",e=>{e?.preventDefault?.(),e?.stopPropagation?.(),Rl()}))}async function Ba(){let t=document.querySelector(".username");if(!t)return;let n=(t.innerText||"").trim().match(/^(.*)\((\d+)\)\s*$/);if(!n)return;let[,i,o]=n,a=await B()||{},c=!a.id||a.id===o||String(a.id).includes(o)?a:{};c.name=i.trim(),c.id=o;let u=document.querySelectorAll("script");for(let p of u){let f=p.innerText.trim();if(f.includes("setAuthenticatedUserContext")){let m=/setAuthenticatedUserContext\('([^']*)'\)/,y=f.match(m);y&&(c.email=y[1])}}await _({profile:c})}async function Ha(){let t=document.querySelector("#post_select");if(!t)return;let e=await Dt();for(let n of t.options){if(!n.value)continue;e.findIndex(o=>o.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await ve(e)}var Nl=["visa-information","fee-payment","appointment-confirmation"];function Bl(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(i=>{let o=i.querySelector(".text-bold");if(!o)return;let a=Hl(o.textContent);if(!Nl.includes(a))return;let c=Wl(i);c&&(n[a]=c)}),Object.keys(n).length?n:null}function Hl(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Wl(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function _e(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>ma)return null}catch{}return t.value}function Fl(t){let e=(t.posts||[]).filter(o=>o.Updated).sort((o,a)=>o.Updated-a.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},i=_e(t.cgiIdToken);return i&&(n.token=i),n}async function si(){if(!G()||!await T("serverSync"))return;let t=await C(["profile","posts","cgiIdToken"]),e=Fl(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await se().catch(()=>({})),i=await fetch(go,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...e,...n})}).then(a=>a.json());if(!i.success)return;let o="0";i.contribs>0&&(o=i.contribs.toString()),i.contribs>10&&(o="10+"),i.contribs>0&&await _({contribs:{email:t.profile?.email,updated:Date.now(),count:o}})}catch{}}function _o(t=0){G()&&document.querySelector("#appointment-card")&&T("serverSync").then(e=>{if(!e)return;let n=Bl();if(!n){t<pa&&l.setTimeout(()=>_o(t+1),Vn);return}C(["profile","cgiIdToken","savedDashboard"]).then(async i=>{let o=_e(i.cgiIdToken);if(!o||JSON.stringify(n)===JSON.stringify(i.savedDashboard))return;let a=await se().catch(()=>({}));fetch(go,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:i.profile,dashboard:n,token:o,...a})}).then(c=>c.json()).then(c=>{c.success&&_({savedDashboard:n})}).catch(()=>{})})})}var Ul=`${at}/extension-runtime-config.json`,Ao="vsRuntimeConfig",zl=300*1e3,Mo=0,rn=null,v={slotWindowLabel:":14\u2013:21, :24\u2013:31, :54\u2013:02",slotWindows:[{slot:1,fromMin:14,toMin:21},{slot:2,fromMin:24,toMin:31},{slot:3,fromMin:54,toMin:2}],windowStartsMin:[14,24,54],cityLoadingMaxMs:12e4,cityCalendarNoDatesMs:2e4,cityRotateMinGapMs:15e3,cityRotateMaxGapMs:18e3,cityHoldMaxMs:45e3,homeKeepaliveMinMs:6e5,homeKeepaliveMaxMs:6e5,homeKeepaliveDebounceMs:48e4,loadingStuckMs:6e4,loadingStuckDebounceMs:9e4,remoteVersion:0,source:"bundled"};function nt(t,e,n,i){let o=Number(t);return Number.isFinite(o)?Math.min(n,Math.max(e,Math.round(o))):i}function Kl(t){if(!Array.isArray(t)||!t.length||t.length>24)return null;let e=[];for(let n of t){let i=nt(n?.fromMin,0,59,NaN),o=nt(n?.toMin,0,59,NaN);if(!Number.isFinite(i)||!Number.isFinite(o)||i===o)return null;let a=nt(n?.slot,1,12,1);e.push({slot:a,fromMin:i,toMin:o})}return e}function jl(t){let e=[...new Set(t.map(n=>n.fromMin))].sort((n,i)=>n-i);return e.length?e:v.windowStartsMin.slice()}function Wa(t,e="remote"){if(!t||typeof t!="object")return!1;let n=Kl(t.slotWindows);if(n){v.slotWindows.length=0;for(let i of n)v.slotWindows.push(i);v.windowStartsMin=jl(n)}return typeof t.slotWindowLabel=="string"&&t.slotWindowLabel.length<120&&(v.slotWindowLabel=t.slotWindowLabel),v.cityLoadingMaxMs=nt(t.cityLoadingMaxMs,1e4,3e5,v.cityLoadingMaxMs),v.cityCalendarNoDatesMs=nt(t.cityCalendarNoDatesMs,5e3,12e4,v.cityCalendarNoDatesMs),v.cityRotateMinGapMs=nt(t.cityRotateMinGapMs,5e3,6e4,v.cityRotateMinGapMs),v.cityRotateMaxGapMs=nt(t.cityRotateMaxGapMs,v.cityRotateMinGapMs,9e4,Math.max(v.cityRotateMinGapMs,v.cityRotateMaxGapMs)),v.cityHoldMaxMs=nt(t.cityHoldMaxMs,1e4,18e4,v.cityHoldMaxMs),v.homeKeepaliveMinMs=nt(t.homeKeepaliveMinMs,12e4,18e5,v.homeKeepaliveMinMs),v.homeKeepaliveMaxMs=nt(t.homeKeepaliveMaxMs,v.homeKeepaliveMinMs,18e5,Math.max(v.homeKeepaliveMinMs,v.homeKeepaliveMaxMs)),v.homeKeepaliveDebounceMs=nt(t.homeKeepaliveDebounceMs,6e4,18e5,v.homeKeepaliveDebounceMs),v.loadingStuckMs=nt(t.loadingStuckMs,3e4,6e5,v.loadingStuckMs),v.loadingStuckDebounceMs=nt(t.loadingStuckDebounceMs,3e4,6e5,v.loadingStuckDebounceMs),v.remoteVersion=nt(t.version,0,1e9,v.remoteVersion),v.source=e,!0}async function Gl(){try{let e=(await C(Ao))[Ao];e?.config&&Wa(e.config,"cache")}catch{}}async function Vl(t){try{await _({[Ao]:{config:t,fetchedAt:Date.now()}})}catch{}}async function Yl({force:t=!1}={}){let e=Date.now();if(!t&&e-Mo<zl)return v;if(rn)return rn;rn=(async()=>{await Gl();try{let n=await fetch(Ul,{method:"GET",cache:"no-store",signal:AbortSignal.timeout(8e3)});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.json();if(!i||typeof i!="object"||Array.isArray(i))throw new Error("bad json");if(i.script||i.code||i.eval)throw new Error("unsafe keys");Wa(i,"remote"),await Vl(i),Mo=Date.now()}catch{Mo=Date.now()}return v})();try{return await rn}finally{rn=null}}function Fa(){Yl().catch(()=>{})}var jt=null,an=null;function Ua(){return jt||v.slotWindows}function Me(){return an||(jt?.length?za(jt):v.slotWindowLabel)}var $p=v.slotWindows,mt=3,ce=8;function za(t){return t?.length?t.map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", "):v.slotWindowLabel}function Ql(t,e){return(Number(t)+Number(e))%60}function ci(t,e){return t=Number(t),e=Number(e),e>=t?e-t:60-t+e}function Xl(t,e,n){return e<=n?t>=e&&t<=n:t>=e||t<=n}function Do(t){if(!Array.isArray(t))return[];let e=[];for(let n of t){if(e.length>=mt)break;let i=Number(n?.fromMin),o=Number(n?.durationMin??n?.duration);if(!Number.isFinite(i)||i<0||i>59)continue;if(!Number.isFinite(o)||o<1){let c=Number(n?.toMin);if(!Number.isFinite(c)||c<0||c>59||(o=ci(i,c),o<1))continue}o=Math.min(ce,Math.max(1,Math.round(o)));let a=Ql(i,o);e.push({slot:e.length+1,fromMin:Math.round(i),toMin:a,durationMin:o})}return e}function Ka(t){let e=Do(t||[]);return e.length?(jt=e.map(({slot:n,fromMin:i,toMin:o})=>({slot:n,fromMin:i,toMin:o})),an=za(jt),jt):(jt=null,an=null,null)}function Po(){jt=null,an=null}function ja(t){let e=t?.length?t:v.slotWindows,n=[],i=Array.isArray(e)?[...e]:[],o=i.find(c=>Number(c.fromMin)===0&&Number(c.toMin)<=2),a=i.find(c=>Number(c.fromMin)>=54&&Number(c.toMin)>=Number(c.fromMin));for(let c of i){if(n.length>=mt)break;let u=Number(c.fromMin),p=Number(c.toMin);if(!Number.isFinite(u)||!Number.isFinite(p)||o&&a&&u===0&&p<=2)continue;let f;a&&o&&u===Number(a.fromMin)&&p===Number(a.toMin)?(f=ci(u,59)+ci(0,Number(o.toMin)),u===54&&Number(o.toMin)===2&&(f=8)):p<u?f=ci(u,p):f=Math.max(1,p-u),f=Math.min(ce,Math.max(1,f)),n.push({fromMin:u,durationMin:f})}return n}function Ga(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=i=>Number(e.find(o=>o.type===i)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function le(t=new Date){let{minute:e}=Ga(t),n=Ua();for(let i of n)if(Xl(e,i.fromMin,i.toMin))return i.slot;return 0}function Eo(t=new Date){if(le(t))return 0;let{minute:e,second:n}=Ga(t),i=e*60+n,o=Ua(),a=[...new Set(o.map(u=>u.fromMin))].sort((u,p)=>u-p);for(let u of a){let p=u*60;if(i<p)return(p-i)*1e3}let c=a[0]??0;return(3600-i+c*60)*1e3}function ts(){let t=document.querySelector(h(r.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=r.selRow,t.dataset[P.mark]="",n.insertAdjacentElement("afterend",t);let i=document.createElement("span");return i.id=r.anchor,i.dataset[P.mark]="",i.dataset[P.w]=e.style.width,i.dataset[P.mw]=e.style.minWidth,i.hidden=!0,e.insertAdjacentElement("beforebegin",i),l.setStyle(e,"width","100%"),l.setStyle(e,"minWidth","0"),t.appendChild(e),t}var sn="waitPillState",Jl=3600*1e3,Va=s.pillWait,Zl=s.pillDone;function tu(t,e){let n=document.createElement("span");n.className=`${s.pill} ${e}`;let i=(o,a)=>{let c=document.createElement("span");c.className=o,c.textContent=a,n.appendChild(c)};return i(s.pillTtl,t.title),t.timer!==void 0&&i(s.pillTmr,t.timer),n}function eu(t,e=Date.now()){if(t.kind==="waiting")return{variant:Va};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:Va}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:Zl}}return null}function nu(t,e,n=new Date){let i=xa(n);return t.seconds===void 0?{title:i}:{title:i,timer:tn(t.seconds)}}var iu=class{#t=null;#e={kind:"idle"};#i=null;#n=null;#o=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get(sn))[sn];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>Jl){chrome.storage.local.remove(sn);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#o=t,this.#r(),this.#c()}toggleClockMode(){l.alive&&(this.setClockMode(!this.#o),chrome.storage.local.set({waitPillClock:this.#o}))}render(t){return eu(this.#e,t)}#l(t){return nu(t,this.#o,new Date)}#r(){if(this.#t??=ru(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(s.hidden);return}this.#t.classList.remove(s.hidden),this.#t.replaceChildren(tu(this.#l(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#i&&(l.clear(this.#i),this.#i=null),t.kind==="running"?(chrome.storage.local.set({[sn]:t}),this.#i=l.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove(sn),this.#r(),this.#c()}#u(){this.#r(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,T("audioAlert").then(t=>{t&&hu()})))}#c(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=l.setInterval(()=>this.#r(),1e3):!t&&this.#n&&(l.clear(this.#n),this.#n=null)}},Ee=new iu,fn="pillPosition",Ya=4;function Qa(t,e,n){return Math.max(e,Math.min(n,t))}function es(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,i=e.height>0?e.height:36;return{w:n,h:i}}function Ae(t,e,n){let{w:i,h:o}=es(t),a=Qa(e,0,Math.max(0,window.innerWidth-i)),c=Qa(n,0,Math.max(0,window.innerHeight-o));return t.style.setProperty("left",a+"px","important"),t.style.setProperty("top",c+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:a,top:c}}function ou(t){var e=!1,n=!1,i=0,o=0,a=0,c=0;function u(f){if(e){var m=f.touches?f.touches[0]:f,y=m.clientX-i,g=m.clientY-o;!n&&Math.abs(y)<Ya&&Math.abs(g)<Ya||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",Ae(t,a+y,c+g),f.cancelable&&f.preventDefault())}}function p(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",p),document.removeEventListener("touchmove",u),document.removeEventListener("touchend",p),n){let f=t.getBoundingClientRect();chrome.storage.local.set({[fn]:{top:Math.round(f.top),left:Math.round(f.left)}})}n=!1}}t.addEventListener("mousedown",function(f){if(f.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let m=t.getBoundingClientRect();i=f.clientX,o=f.clientY,a=m.left,c=m.top,Ae(t,m.left,m.top),document.addEventListener("mousemove",u),document.addEventListener("mouseup",p),f.preventDefault(),f.stopPropagation()}),t.addEventListener("touchstart",function(f){e=!0,n=!1,delete t.dataset.skipClick;let m=t.getBoundingClientRect();i=f.touches[0].clientX,o=f.touches[0].clientY,a=m.left,c=m.top,Ae(t,m.left,m.top),document.addEventListener("touchmove",u,{passive:!1}),document.addEventListener("touchend",p)},{passive:!0})}function ru(){let t=document.querySelector(h(r.waitTime));return t||(t=document.createElement("div"),t.id=r.waitTime,t.className=s.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),ou(t),chrome.storage.local.get(fn).then(e=>{let n=e[fn];n&&typeof n.top=="number"&&typeof n.left=="number"&&Ae(t,n.left,n.top)}),lu(t),t)}function Xa(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function au(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function su(t){let{w:e,h:n}=es(t),i=12;return[{left:i,top:i},{left:Math.max(i,window.innerWidth-e-i),top:i},{left:i,top:Math.max(i,window.innerHeight-n-i)},{left:Math.max(i,window.innerWidth-e-i),top:Math.max(i,window.innerHeight-n-i)}]}async function cu(){let e=(await chrome.storage.local.get(fn))[fn];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function lu(t){let e=!1,n=async()=>{if(!l.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(s.hidden))return;let i=au(),o=!!(i&&i.offsetParent!==null&&i.getBoundingClientRect().height>20),a=t.getBoundingClientRect();if(o&&Xa(a,i.getBoundingClientRect())){let c=i.getBoundingClientRect(),u=su(t),p=u.find(f=>{let m={left:f.left,top:f.top,right:f.left+a.width,bottom:f.top+a.height};return!Xa(m,c)})||u[2];e=!0,t.setAttribute("data-dodging",""),Ae(t,p.left,p.top);return}if(e&&!o){e=!1,t.removeAttribute("data-dodging");let c=await cu();c&&Ae(t,c.left,c.top)}else o||t.removeAttribute("data-dodging")};l.setInterval(n,400),l.on(window,"resize",n)}async function Oo(){if(!l.alive||!await T("defaultWaitTime")||!await l.waitFor("#post_select",{attempts:Yn}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});Ee.setClockMode(t),await Ee.restore()}async function ns(){await T("defaultWaitTime")&&Ee.waiting()}async function gi(t){await T("defaultWaitTime")&&Ee.run(t)}function is(){Ee.toggleClockMode()}function os(t){Ee.setClockMode(t)}var cn=null,ln=null,li=null;function Ro(){return li||(li=new(window.AudioContext||window.webkitAudioContext),l.disposable(()=>li?.close())),li}async function yi(t=150){try{let e=Ro();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let o=e.currentTime,a=t/1e3;i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(.1,o+.01),i.gain.setValueAtTime(.1,o+Math.max(.01,a-.02)),i.gain.linearRampToValueAtTime(0,o+a),n.start(),n.stop(o+a)}catch(e){console.error("Audio beep failed:",e)}}function bi(t,e=125,n=125){let i=0,o=()=>{i>=t||(yi(e),i++,l.setTimeout(o,e+n))};o()}var Io=4,Ja=50,Za=50,uu=600;function rs(){if(ln)return;let t=()=>{bi(Io,Ja,Za);let e=Io*Ja+(Io-1)*Za;ln=l.setTimeout(t,e+uu)};t()}var du=250,fu=10,pu=300,mu=1e3;function hu(){if(cn)return;let t=[];for(let o=0;o<=pu;o+=fu)t.push(o);let e=Date.now(),n=0,i=()=>{let o=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&o>=t[n];){let a=n===t.length-1;yi(a?mu:du),n++}if(n<t.length){let a=t[n],c=e+a*1e3,u=Math.max(0,c-Date.now());cn=l.setTimeout(i,u)}else Ie()};i()}function Ie(t={}){let e=!!t.keepConsular;cn&&(l.clear(cn),cn=null),ln&&(l.clear(ln),ln=null),Lo(),e||qo()}var ui=null,di=null,De=null,fi=null,un=null;async function as(){Lo();try{let t=Ro();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),a=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=880,i.frequency.value=1320,o.gain.value=.85,a.gain.value=.65,n.connect(o).connect(e),i.connect(a).connect(e);let c=t.createOscillator(),u=t.createGain();c.type="triangle",c.frequency.value=3.2,u.gain.value=280,c.connect(u),u.connect(n.frequency),u.connect(i.frequency);let p=t.currentTime;n.start(p),i.start(p),c.start(p),De={osc1:n,osc2:i,lfo:c,master:e};let f=()=>{De&&(yi(500),di=l.setTimeout(f,1800))};f(),ui=l.setTimeout(Lo,12e4),un=document.title;let m=!1,y=()=>{De&&(document.title=m?un:"!!! SUBMIT CLICKED !!!",m=!m,fi=l.setTimeout(y,450))};y()}catch(t){console.error("Submit alarm failed:",t)}}function Lo(){if(ui&&(l.clear(ui),ui=null),di&&(l.clear(di),di=null),fi&&(l.clear(fi),fi=null),un&&(document.title=un,un=null),De){try{let{osc1:t,osc2:e,lfo:n}=De;t.stop(),e.stop(),n.stop()}catch{}De=null}}function gu(){let t=location.pathname||"";return/\/ofc-schedule\b/i.test(t)?!1:/\/(schedule|c-schedule)\b/i.test(t)}var yu=6e4,pi=null,mi=null,hi=null,dn=null,Pe=null;async function bu(){qo();try{let t=Ro();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),a=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=980,i.frequency.value=1470,o.gain.value=.95,a.gain.value=.8,n.connect(o).connect(e),i.connect(a).connect(e);let c=t.createOscillator(),u=t.createGain();c.type="square",c.frequency.value=4,u.gain.value=320,c.connect(u),u.connect(n.frequency),u.connect(i.frequency);let p=t.currentTime;n.start(p),i.start(p),c.start(p),Pe={osc1:n,osc2:i,lfo:c,master:e};let f=()=>{Pe&&(yi(650),mi=l.setTimeout(f,900))};f(),pi=l.setTimeout(qo,yu),dn=document.title;let m=!1,y=()=>{Pe&&(document.title=m?dn:"!!! OFC BOOKED \u2014 CONSULAR PAGE !!!",m=!m,hi=l.setTimeout(y,400))};y()}catch(t){console.error("Consular OFC alarm failed:",t)}}function qo(){if(pi&&(l.clear(pi),pi=null),mi&&(l.clear(mi),mi=null),hi&&(l.clear(hi),hi=null),dn&&(document.title=dn,dn=null),Pe){try{let{osc1:t,osc2:e,lfo:n}=Pe;t.stop(),e.stop(),n.stop()}catch{}Pe=null}}function ss(){if(gu()){try{let t="vsConsularOfcBeep";if(sessionStorage.getItem(t)==="1")return;sessionStorage.setItem(t,"1")}catch{}bu()}}function xu(){document.querySelector(h(r.recheck))?.remove();for(let t of document.querySelectorAll("button"))(t.textContent||"").trim()==="Recheck"&&t.remove()}async function No(){l.alive&&xu()}async function Ho(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await l.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let i=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(u=>u.innerText.trim()===i))continue;let a=document.createElement("li");a.className="usa-sidenav__item",a.dataset[P.mark]="";let c=document.createElement("a");c.href=n.link,c.className=s.sideLink,c.target="_self",c.textContent=n.text,a.appendChild(c),t.appendChild(a)}}function H(t,e,n){let i=document.createElement(t);return e&&(i.className=e),n?.appendChild(i),i}function xi(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,a]=n;return`${a}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return null}function Bo(t){let e=xi(t);if(!e)return String(t||"");let[n,i,o]=e.split("-").map(Number);if(!n||!i||!o)return e;try{return new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(new Date(n,i-1,o))}catch{return e}}function wu(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);if(n)return n[1].slice(0,5);let i=e.match(/^(\d{1,2}:\d{2})/);return i?i[1]:e}function cs(t){let e=document.querySelector(h(r.datesCont));if(e){let o=e.querySelector(h(r.datesPara)),a=e.querySelector("h2");if(a&&t&&(a.textContent=t),o)return{container:e,details:o}}let n=document.querySelector("#page_form");if(!n)return null;e?.remove();let i=Su(t||"");return n.appendChild(i.container),i}function ls(t){if(t.response.HasError)return;let e=document.querySelector("#post_select"),n=e?.options[e.selectedIndex]?.text??"",i=(t.response.ScheduleDays||[]).map(f=>xi(f?.Date)).filter(Boolean).sort((f,m)=>f.localeCompare(m));document.querySelector(h(r.datesCont))?.remove();let o=cs(n);if(!o)return;let{details:a}=o;a.replaceChildren();let c=H("div",s.slotsSum,a);if(!i.length){c.textContent="No slots available";return}c.textContent=`${i.length} date${i.length===1?"":"s"} available`;let u={};for(let f of i){let m=f.slice(0,7);(u[m]||=[]).push(f)}for(let[f,m]of Object.entries(u)){let y=H("div",null,a),g=document.createElement("strong");g.textContent=f,y.append(g,`: ${m.map(b=>b.slice(8,10)).join(", ")}`)}let p=H("div",null,a);p.style.marginTop="0.5em";for(let f of i){let m=H("div",null,p);m.textContent=`\u2022 ${Bo(f)} (${f})`}}function us(t,e,n){let i=document.querySelector("#post_select"),o=n||i?.options[i.selectedIndex]?.text||"",a=xi(e)||xi(t?.[0]?.Date)||"",c=(t||[]).filter(S=>S&&S.Time).map(S=>({time:wu(S.Time),avail:S.EntriesAvailable!=null&&Number.isFinite(Number(S.EntriesAvailable))?Number(S.EntriesAvailable):null,raw:S})).sort((S,k)=>String(S.time).localeCompare(String(k.time))),u=cs(o);if(!u)return;let{details:p}=u;p.replaceChildren();let f=H("div",s.slotsSum,p);if(!c.length){f.textContent=a?`No time slots on ${Bo(a)}`:"No time slots available";return}let m=c.filter(S=>S.avail==null||S.avail>0),y=m.reduce((S,k)=>S+(k.avail||0),0),g=a?Bo(a):"selected date";if(f.textContent=y>0?`${m.length} time slot${m.length===1?"":"s"} on ${g} \xB7 ${y} available`:`${c.length} time slot${c.length===1?"":"s"} on ${g}`,a){let S=H("div",null,p);S.style.margin="0.35em 0 0.6em",S.textContent=`Date: ${g} (${a})`}let b=H("table",s.slotsTbl,p);b.id=r.slotsTbl;let x=H("thead",null,b),$=H("tr",null,x);for(let S of["Time","Availability"]){let k=H("th",null,$);k.textContent=S}let D=H("tbody",null,b);for(let S of c){let k=H("tr",null,D);S.avail===0&&(k.style.opacity="0.55");let Q=H("td",null,k);Q.textContent=S.time;let et=H("td",null,k);et.textContent=S.avail==null?"\u2014":String(S.avail)}}function Su(t){let e=H("div","row");e.id=r.datesCont;let n=H("div","col-sm-12 atlas_section mt-3",e),i=H("div","col-sm-12 atlas_section_header_row",H("div","row",n));H("h2",null,i).textContent=t;let o=H("div",null,H("div","col-sm-12",H("div","row",n)));return o.id=r.datesPara,{container:e,details:o}}var ds=null;function vu(){let t=document.querySelector(h(r.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return l.setStyle(n,"display","flex"),l.setStyle(n,"alignItems","center"),l.setStyle(n,"justifyContent","flex-end"),l.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=r.ofcDate,t.dataset[P.mark]="",e.insertAdjacentElement("beforebegin",t),t}function $u(){if(!location.pathname.includes("/schedule"))return;let t=ds;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=vu();n&&(n.textContent=`OFC (Estimate): ${wa(e.appointmentDateStr)}`)}function fs(t){chrome.runtime?.id&&(ds=t.data.data,l.waitFor("#submitbtn").then(e=>{e&&$u()}))}var wi=new Map,ps=45e3,Si=new Map,ms=8e3,hs=0;function vi(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function $i(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function ku(t,e){return`${t}:${e.slice(0,5).join(",")}`}function Cu(t){let e=Date.now(),n=wi.get(t);if(n&&e-n<ps)return!1;wi.set(t,e);for(let[i,o]of wi)e-o>ps*4&&wi.delete(i);return!0}function Tu(t){let e=Date.now(),n=Si.get(t);if(n&&e-n<ms)return!1;Si.set(t,e);for(let[i,o]of Si)e-o>ms*6&&Si.delete(i);return!0}async function gs(){return await T("telegramViaServer")!==!1}async function ys(t,{kind:e="alert",dedupKey:n="",skipDedup:i=!1,notifyMuktesh:o=!0}={}){if(t&&await gs())try{await fetch(la,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:i,notify_muktesh:o}),signal:AbortSignal.timeout(2e4)})}catch{}}function _u(t,{kind:e="screen",dedupKey:n="",waitMs:i=0,skipDedup:o=!1,notifyMuktesh:a=!0}={}){l.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:i,skipDedup:o,notifyMuktesh:a,captureScreenshot:!0})}async function Mu(t,e,n){let i=vi(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),a=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&a.push(`\u{1FAAA} <b>Visa:</b> ${n}`),a.push(`\u{1F550} <b>Checked:</b> ${o} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),a.push(`\u{1F4C6} <b>Dates (${i.length}):</b>`,"");for(let c of i.slice(0,30))a.push(`\u{1F7E2} <b>${$i(c)}</b>`);return i.length>30&&a.push("",`\u2795 <i>+${i.length-30} more dates</i>`),a.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),a.join(`
`)}function Au(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",i=document.querySelector("#datepicker")?.value||"\u2014",a=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:i,time:a}}async function bs(t,{postId:e,postName:n,hasError:i}={}){if(i||!t?.length)return;let o=vi(t);if(!o.length||!await T("telegramAlert"))return;let a=ku(e||n||"unknown",o);if(!Cu(a))return;let c=await B(),u=await Mu(n,t,c?.visa||"");await ys(u,{kind:"slots",dedupKey:a,notifyMuktesh:!0})}function Du(t,e,n){let i=vi(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),a=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
\u{1F3DB}\uFE0F ${a}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`;if(i.length){let c=i.slice(0,5).map(u=>$i(u)).join(", ");return`<b>DATES AVAILABLE</b>
\u{1F3DB}\uFE0F ${a}
\u{1F4C6} ${i.length} date(s)
${c}${i.length>5?"\u2026":""}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}return`<b>City changed \u2014 no dates</b>
\u{1F3DB}\uFE0F ${a}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}function Pu(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=e?$i(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${i}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function Eu(t,e,n){let i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?$i(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u23F0 ${n} slot(s)
\u{1F550} ${i} IST
\u{1F4F2} Visa Slot 6`}async function Le(t,{kind:e="screen",dedupKey:n,waitMs:i=0,skipDedup:o=!1}={}){if(await T("telegramScreenshots")===!1||!await gs())return;let a=n||`${e}:${String(t).slice(0,80)}`;!o&&!Tu(a)||_u(t,{kind:e,dedupKey:a,waitMs:i,skipDedup:o,notifyMuktesh:!0})}async function xs(t,{postId:e,postName:n,hasError:i}={}){let o=Du(n,t,i),a=vi(t),c=a.length?"dates":"city";await Le(o,{kind:c,dedupKey:`${c}:${e||n}:${a.length}:${i?1:0}`,waitMs:a.length?1400:900})}async function ws(t,e){await Le(Pu(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function Ss(t,e,n){await Le(Eu(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function vs(){let t=Date.now();if(t-hs<8e3)return;hs=t;let e=await B(),{city:n,date:i,time:o}=Au(),a=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),c=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${i}`,`\u23F0 <b>Time:</b> ${o}`];e?.email&&c.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&c.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),c.push(`\u{1F550} <b>When:</b> ${a} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let u=c.join(`
`);await ys(u,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await Le(u,{kind:"submit",skipDedup:!0,waitMs:200})}var Ci=25;function Ti(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Uo(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let i=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,i),n-1)}function $s(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function ks(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function Ko(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function Wo(t){if(t)try{t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}}function ki(t){if(t)try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}}function zo(t){if(!t||t.disabled)return!1;try{if(t.tagName==="SELECT")return!t.value||t.value==="0"?!1:(Wo(t),t.value&&t.value!=="0"?!0:(ki(t),!!(t.value&&t.value!=="0")));if(t.type==="radio"||t.type==="checkbox"){if(t.name)for(let i of document.getElementsByName(t.name))i!==t&&(i.checked=!1);if(t.checked=!0,Wo(t),t.checked)return!0;let e=t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,n=t.closest("tr");for(let i of[e,t.closest("label"),t,n].filter(Boolean))ki(i);return t.checked=!0,Wo(t),t.checked===!0}ki(t)}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function Cs(){let t=new Set,e=[],n=i=>{if(!i||t.has(i)||Ko(i)||i.disabled)return;let o=i.closest("tr");o&&ks(o)||(t.add(i),e.push(i))};for(let i of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let o of document.querySelectorAll(`${i}:not([disabled])`))n(o);return e}function Iu(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!$s(n)||ks(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function Lu(t,e){for(let n of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(n.tagName!=="SELECT"||n.disabled||Ko(n))continue;let i=[...n.options].filter(c=>!c.disabled&&c.value&&c.value!=="0"&&$s({textContent:c.textContent}));if(!i.length)continue;let o=null,a=Ti(e);if(a&&a!=="00:00"&&(o=i.find(c=>(c.textContent||"").includes(a))||null,!o)){let c=a.match(/(\d{1,2}:\d{2})/);c&&(o=i.find(u=>(u.textContent||"").includes(c[1]))||null)}if(!o){let c=Uo(i.length,t);o=i[c]}if(o&&(n.value=o.value,zo(n)))return!0}return!1}function qu(t,e){if(Lu(t,e))return!0;let n=Cs();if(n.length){let o=null,a=Ti(e);if(a&&a!=="00:00"&&(o=n.find(c=>{let u=(c.closest("tr")?.textContent||c.textContent||"").replace(/\s+/g," ");return u.includes(a)||u.includes(a.slice(0,5))})||null),!o){let c=Uo(n.length,t);o=n[c]}if(o&&zo(o))return!0}let i=Iu();if(i.length){let o=null,a=Ti(e);if(a&&a!=="00:00"&&(o=i.find(p=>(p.textContent||"").includes(a))||null),!o){let p=Uo(i.length,t);o=i[p]}if(!o)return!1;let c=o.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(c&&zo(c))return!0;let u=o.querySelector("label");if(u)return ki(u),!!o.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function it(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!Ko(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function Ou({slotIndex:t=0,maxMs:e=12e3,pollMs:n=Ci,time:i,onTick:o}={}){let a=Date.now()+e,c=Math.max(10,n||25);return new Promise(u=>{let p=()=>{if(!l.alive)return u(!1);if(o?.(),qu(t,i)||it())return u(!0);if(Date.now()>=a)return u(!1);l.setTimeout(p,c)};p()})}function pn({time:t,date:e,slotIndex:n,pollMs:i,maxMs:o}){let a=n??0,c=o||15e3,u=i||Ci;return l.send({action:"forcePickTimeSlot",slotIndex:a,maxMs:c,pollMs:u}),l.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:a,pollMs:u,domWaitMs:0,maxMs:c}),Ou({slotIndex:a,maxMs:c,pollMs:u,time:t||"00:00"})}var Fo=!1;function Ts({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(Fo)return;Fo=!0;let i=!1,o=async()=>{if(!(!l.alive||i)){if(it()){n?.();return}try{if(t&&!await t())return}catch{return}Cs().length&&(i=!0,await pn({slotIndex:e,time:"00:00",maxMs:800,pollMs:Ci}),i=!1,it()&&n?.())}};l.setInterval(o,Ci);let a=document.querySelector("#page_form")||document.body,c=new MutationObserver(()=>o());c.observe(a,{childList:!0,subtree:!0}),l.disposable(()=>{c.disconnect(),Fo=!1})}function _s(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let i=Ti(n?.Time);if(!i)continue;let o=i.match(/(\d{1,2}):(\d{2})/);if(!o)continue;let[,a,c]=o;if(e.includes(`${a}:${c}`)||e.includes(`${parseInt(a,10)}:${c}`))return!0}return!1}var _i="submitErrors",Ms=50,Ru=45e3,Ds=0,jo=new Set,mn=null,Ps=null;function Es(t){Ps=typeof t=="function"?t:null}function Nu(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",i=document.querySelector("#datepicker")?.value||"";return{city:e,date:i,url:location.href}}function hn(){Ds=Date.now()+Ru,jo.clear(),zu()}function Mi(){return Date.now()<Ds}function Bu(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function Hu(t){let e=await C({[_i]:[]}),n=Array.isArray(e[_i])?e[_i]:[];n.push(t),n.length>Ms&&n.splice(0,n.length-Ms),await _({[_i]:n})}function As(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function Wu(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${As(t.source)}`,`\u{1F4AC} <b>Message:</b> ${As(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let i=n.join(`
`);await Le(i,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function gn(t,e,n={}){let i=String(e||"").trim();if(!i||!Mi()&&!n.force)return;let o=Bu(t,i);if(jo.has(o))return;jo.add(o);let a=Nu(),c=await B(),u={at:Date.now(),source:String(t||"unknown"),message:i.slice(0,2e3),city:n.city||a.city,date:n.date||a.date,url:n.url||a.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:c?.email||""};await Hu(u);try{await Wu(u)}catch{}try{Ps?.(u)}catch{}}function Fu(t){if(!Mi())return;let e=t?.status,n=t?.retryAfter,i=t?.cgiBlock,o=`Request failed (HTTP ${e||"?"})`;n!=null&&(o+=` \u2014 retry after ${n}s`),i&&(o+=" \u2014 CGI access limitation"),gn("ajax_error",o,{status:e})}function Is(t){if(!Mi()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){Fu({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",o=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";gn("ajax_response",o,{route:t.tail||""})}var Uu=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function zu(){mn&&l.clear(mn);let t=()=>{if(!l.alive||!Mi()){mn=null;return}for(let e of Uu)for(let n of document.querySelectorAll(e)){let i=(n.textContent||"").replace(/\s+/g," ").trim();!i||i.length<4||gn("page_validation",i)}mn=l.setTimeout(t,600)};mn=l.setTimeout(t,500)}var yn=0,Ls="",qs=0;async function Ku(){let[t,e]=await Promise.all([B(),C(["cgiIdToken"])]),n=_e(e.cgiIdToken);return{profile:t,token:n}}async function Os(t){if(!G()||!await T("serverSync"))return null;let{profile:e,token:n}=await Ku();if(!e?.id&&!e?.email)return null;try{let i=await se().catch(()=>({})),o={...t,profile:e,...i};n&&(o.token=n);let a=await fetch(ua,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o),signal:AbortSignal.timeout(2500)}).then(c=>c.json());return a&&a.success?a:null}catch{return null}}async function Go({postId:t,postName:e,dayCount:n,dateFrom:i=null,dateTo:o=null,bestDate:a=null,rangeFrom:c=null,rangeTo:u=null}={}){let p=String(t||"").trim(),f=Number(n)||0;if(!p||f<1)return null;let m=String(a||i||"").slice(0,10),y=`${p}:${f}:${m}`,g=Date.now();if(y===Ls&&g-qs<250)return null;Ls=y,qs=g;let b=await Os({action:"alert",city:{id:p,name:String(e||p).trim()},dayCount:f,dateFrom:i||c||m||null,dateTo:o||u||m||null,bestDate:m||null,rangeFrom:c||null,rangeTo:u||null});return b?.alertId&&(yn=Math.max(yn,Number(b.alertId)||0)),b}async function Rs({preferredCities:t=[],citiesEnabled:e=!1,currentCityId:n="",dateFrom:i=null,dateTo:o=null}={}){if(!e||!t?.length)return null;let c=(await Os({action:"poll",preferredCities:t,citiesEnabled:!0,currentCityId:String(n||""),lastAlertId:yn,dateFrom:i||null,dateTo:o||null}))?.forceCity;return!c?.id||!c?.alertId?null:c}function Ai(t){let e=Number(t)||0;e>yn&&(yn=e)}var ju=["cities","from","to","submitEnabled","citiesEnabled","enabled","slotWindows","termsAgreed","termsPassed","termsAgreedAt"];function Ns(t){if(!t||typeof t!="object")return{};let e={};for(let n of ju)n in t&&(e[n]=t[n]);return typeof e.submitEnabled!="boolean"&&typeof e.enabled=="boolean"&&(e.submitEnabled=e.enabled),delete e.enabled,e}function Bs(t,e){if(!e||typeof e!="object")return t||null;let n=t&&typeof t=="object"?{...t}:{},i=Number(n.serverUpdatedAt)||0,o=Number(e.updatedAt)||0;if(o&&i&&o<i)return n;let a=Ns(e);Array.isArray(a.cities)&&!a.cities.length&&Array.isArray(n.cities)&&n.cities.length&&delete a.cities;let c={...n,...a};return typeof a.submitEnabled=="boolean"&&(c.enabled=a.submitEnabled),e.updatedAt&&(c.serverUpdatedAt=e.updatedAt),c}async function Hs(){let[t,e]=await Promise.all([B(),C(["cgiIdToken"])]),n=_e(e.cgiIdToken);return{profile:t,token:n}}async function Ws(t){if(!G()||!await T("serverSync"))return!1;let e=Ns(t);if(!Object.keys(e).length)return!1;let{profile:n,token:i}=await Hs();if(!n?.id&&!n?.email)return!1;try{let o=await se().catch(()=>({})),a={profile:n,prefs:e,...o};i&&(a.token=i);let c=await fetch(Gn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then(u=>u.json());return!!(c&&c.success)}catch{return!1}}async function Fs(){if(!G()||!await T("serverSync"))return null;let{profile:t,token:e}=await Hs();if(!t?.id&&!t?.email)return null;try{let n=new URLSearchParams;t.id&&n.set("applicant_id",String(t.id)),t.email&&n.set("email",String(t.email));let i=await fetch(`${Gn}?${n.toString()}`,{method:"GET",headers:{Accept:"application/json"}}).then(a=>a.json());if(i?.prefs)return i.prefs;let o={profile:t};return e&&(o.token=e),i=await fetch(Gn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(a=>a.json()),i?.prefs||null}catch{return null}}var Oe=null,ue="",qe=[];function bn(t){return String(t||"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e])}function Gu(t){let e=String(t||"").slice(0,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(e))return"";let[n,i,o]=e.split("-"),a=["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${Number(o)} ${a[Number(i)]} ${n}`}async function Vu(){let t=await fetch(fa||`${at}/contribute/community-slots`,{method:"POST",headers:{"Content-Type":"application/json"},body:"{}",signal:AbortSignal.timeout(15e3)}),e=await t.json().catch(()=>({}));return!t.ok||!e.success?[]:Array.isArray(e.cities)?e.cities:[]}function Yu(t){let e=Array.isArray(t.months)?t.months:[];return e.length?e.map(n=>{let i=(n.dates||[]).map(o=>`<span class="${s.comDate}">${bn(o)}</span>`).join("");return`
        <div class="${s.comMonth}">
          <div class="${s.comMonthLabel}">${bn(n.label)} \u2014 dates</div>
          <div class="${s.comDates}">${i}</div>
        </div>`}).join(""):`<div class="${s.comEmpty}">No dates in this report.</div>`}function zs(){let t=document.querySelector(h(r.comList)),e=document.querySelector(h(r.comFoot));if(t){if(!qe.length){t.innerHTML=`<div class="${s.comEmpty}">No community dates yet. Keep checking \u2014 shared finds show here.</div>`,e&&(e.textContent="Shared by all users \xB7 refreshes live");return}t.innerHTML=qe.map(n=>{let i=ue&&ue===String(n.postId),o=Gu(n.earliest);return`
        <div class="${s.comRow}${i?` ${s.comOpen}`:""}" data-post="${bn(n.postId)}">
          <button type="button" class="${s.comMain}" data-com-toggle>
            <span class="${s.comChevron}" aria-hidden="true">${i?"\u25BE":"\u25B8"}</span>
            <span style="flex:1;min-width:0;text-align:left">
              <span class="${s.comName}">${bn(n.name)}</span>
              <span class="${s.comMeta}">${Number(n.dateCount)||0} dates${o?` \xB7 earliest ${o}`:""} \xB7 ${bn(n.seenAgo||"")} ago</span>
            </span>
            <span class="${s.comPill}">Slots</span>
          </button>
          <div class="${s.comDrop}" ${i?"":"hidden"}>${Yu(n)}</div>
        </div>`}).join(""),e&&(e.textContent=`${qe.length} cit${qe.length===1?"y":"ies"} with dates \xB7 Shared by all users`),t.querySelectorAll("[data-com-toggle]").forEach(n=>{l.on(n,"click",i=>{i?.preventDefault?.(),i?.stopPropagation?.();let a=n.closest(`.${s.comRow}`)?.getAttribute("data-post")||"";ue=ue===a?"":a,zs()}),l.on(n,"pointerdown",i=>i.stopPropagation())})}}async function Us(){if(document.querySelector(h(r.comCard))){try{qe=await Vu()}catch{}ue&&!qe.some(e=>String(e.postId)===ue)&&(ue=""),zs()}}function Ks(){xn(),Us();let t=()=>{Oe=null,Us().finally(()=>{document.querySelector(h(r.comCard))&&(Oe=l.setTimeout(t,45e3))})};Oe=l.setTimeout(t,45e3)}function xn(){Oe&&(l.clear(Oe),Oe=null)}var Di=3,X=[],de=null,Gt=!1;try{Gt=sessionStorage.getItem("tikTikHudMin")==="1"}catch{}function js(t,e){Gt=!!e;try{sessionStorage.setItem("tikTikHudMin",Gt?"1":"0")}catch{}if(!t)return;t.classList.toggle(s.hudMin,Gt);let n=t.querySelector(h(r.hudToggle));n&&(n.textContent=Gt?"+":"\u2013",n.setAttribute("aria-label",Gt?"Expand status":"Minimise status"))}function wn(t,e){let n=String(t||"").trim();if(!n)return;let i=String(e||n).trim()||n;if(X.length&&X[0].slots==null&&X[0].id!==n&&(X[0].slots=!1),X[0]?.id===n){X[0].name=i||X[0].name;return}X.unshift({id:n,name:i,slots:null}),X.length>Di&&(X.length=Di)}function Gs(t,e,n){let i=String(t||"").trim();if(!i)return;let o=X.find(a=>a.id===i);if(o){o.slots=!!e,n&&(o.name=String(n).trim()||o.name);return}X.unshift({id:i,name:String(n||i).trim()||i,slots:!!e}),X.length>Di&&(X.length=Di)}function Qu(){let t=document.querySelector(h(r.hud));if(t)return t;t=document.createElement("div"),t.id=r.hud,t.className=s.hud,t.dataset[P.mark]="",t.innerHTML=`
    <div class="${s.hudHead}">
      <span>Tik Tik</span>
      <span class="${s.hudMiniSecs}" id="${r.hudSecs}-mini"></span>
      <button type="button" id="${r.hudToggle}" class="${s.hudToggle}" aria-label="Minimise status">\u2013</button>
    </div>
    <div class="${s.hudName}" id="${r.hudName}">\u2014</div>
    <div class="${s.hudVisa}" id="${r.hudVisa}">Visa \xB7 \u2014</div>
    <div class="${s.hudBody}" id="${r.hudBody}"></div>
    <div class="${s.hudHist}" id="${r.hudHist}"></div>
  `,document.documentElement.appendChild(t);let e=t.querySelector(h(r.hudToggle));return e&&(l.on(e,"pointerdown",n=>n.stopPropagation()),l.on(e,"click",n=>{n.preventDefault(),n.stopPropagation(),js(t,!Gt)})),js(t,Gt),t}function Vs(t){return t==null||!Number.isFinite(t)?null:Math.max(0,Math.floor(Number(t)+1e-9))}function Xu(t,e){if(!t)return;let n=Vs(e.secondsUntilHop);if(e.submitPending){t.replaceChildren();let i=document.createElement("div");i.className=s.hudSubmit;let o=document.createElement("div");o.className=s.hudSubmitTitle,o.textContent="SUBMIT CLICKED";let a=document.createElement("div");a.className=s.hudSubmitSub,a.textContent="Waiting for confirmation\u2026",i.append(o,a),t.appendChild(i);return}if(e.loadingStuck){t.replaceChildren();let i=document.createElement("div");i.className=s.hudStuck,i.textContent="Date Loading\u2026",t.appendChild(i);return}if(e.rotateActive&&n!=null){let i=t.querySelector(`.${s.hudCount}`),o=t.querySelector(h(r.hudSecs));if(!i||!o){t.replaceChildren(),i=document.createElement("div"),i.className=s.hudCount;let a=document.createElement("span");a.className=s.hudCountLabel,a.textContent="Next city change",o=document.createElement("span"),o.id=r.hudSecs,o.className=s.hudSecs,i.append(a,o),t.appendChild(i)}o.textContent=`${n}s`;return}t.replaceChildren()}function Ju(t){if(!t)return;t.replaceChildren();let e=document.createElement("div");if(e.className=s.hudHistTitle,e.textContent="Last 3 cities",t.appendChild(e),!X.length){let n=document.createElement("div");n.className=s.hudHistRow,n.textContent="No hops yet",t.appendChild(n);return}for(let n of X){let i=document.createElement("div");i.className=s.hudHistRow;let o=document.createElement("span");o.textContent=n.name||n.id;let a=document.createElement("span");n.slots===!0?(a.className=s.hudPillOk,a.textContent="Slots"):n.slots===!1?(a.className=s.hudPillNo,a.textContent="No slots"):(a.className=s.hudPillNo,a.textContent="\u2026"),i.append(o,a),t.appendChild(i)}}async function Ys(t={}){if(!l.alive)return;if(t.hide){document.querySelector(h(r.hud))?.remove();return}let e=Qu();e.querySelector(h(r.hudCities))?.remove();let n=await B().catch(()=>null),i=n?.name&&String(n.name).trim()||n?.email&&String(n.email).trim()||"\u2014",o=n?.visa&&String(n.visa).trim()||n?.visaClass&&String(n.visaClass).trim()||"\u2014",a=e.querySelector(h(r.hudName)),c=e.querySelector(h(r.hudVisa));a&&(a.textContent=i),c&&(c.textContent=`Visa \xB7 ${o}`),Xu(e.querySelector(h(r.hudBody)),t),Ju(e.querySelector(h(r.hudHist)));let u=e.querySelector(h(`${r.hudSecs}-mini`));if(u){let p=Vs(t.secondsUntilHop);u.textContent=t.rotateActive&&p!=null?`${p}s`:""}e.querySelector(h(r.hudToggle))||(e.remove(),Ys(t))}function Qs(t){if(de)return;let e=async()=>{if(de=null,!!l.alive){try{let n=typeof t=="function"?await t():{};await Ys(n||{})}catch{}l.alive&&(de=l.setTimeout(e,1e3))}};de=l.setTimeout(e,200)}function Vo(){de&&(l.clear(de),de=null)}var Qt="aiSubmitByAccount",Fe=8e3;var V=25;var Dn=0,kn=1e4,mc=1e3;function Ue(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}function ur(){return v.cityRotateMinGapMs}function Zu(){return v.cityRotateMaxGapMs}function Cn(){return v.cityHoldMaxMs}function It(){return v.cityLoadingMaxMs}function Yt(){return v.cityCalendarNoDatesMs}var Xs=5e3,Zo=2e4,td=15e3;function Pn(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function kt(){return/\/ofc-schedule\b/i.test(location.pathname)}function A(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var ed=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function Sn(t,e){let n=ed[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(o=>{let a=e===o?" selected":"";return`<option value="${o.replace(/"/g,"&quot;")}"${a}>${o}</option>`}).join("")}function Re(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function Tn(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function nd(t,e,n){return`${t}-${String(e+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`}function id(t){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(t))return null;let[e,n,i]=t.split("-").map(Number),o=new Date(e,n-1,i);return o.getFullYear()!==e||o.getMonth()!==n-1||o.getDate()!==i?null:o}function dr(){for(let t of["from","to"]){let e=document.querySelector(h(t==="from"?r.aiFrom:r.aiTo)),n=document.querySelector(h(t==="from"?r.aiFromBtn:r.aiToBtn));if(!n)continue;let i=e?.value||"";n.textContent=i?Tn(i):"Select date"}}function Yo(t,e){let n=document.querySelector(h(t==="from"?r.aiFrom:r.aiTo));if(n&&(n.value=e||""),t==="from"){let i=document.querySelector(h(r.aiTo));i&&e&&i.value&&i.value<e&&(i.value="")}dr()}var lt={y:0,m0:0,which:"from"};function he(){document.querySelector(h(r.aiCal))?.classList.add(s.hidden)}function fr(t){let e=t.target;return e?e.nodeType===3?e.parentElement:e:null}function tr(){let t=document.querySelector(h(r.aiCal));if(!t)return;let{y:e,m0:n,which:i}=lt,o=document.querySelector(h(i==="from"?r.aiFrom:r.aiTo))?.value||"",a=Re(),c=i==="to"&&document.querySelector(h(r.aiFrom))?.value||Re(),u=new Date(e,n,1).toLocaleDateString("en-IN",{month:"long",year:"numeric"}),p=new Date(e,n,1).getDay(),f=new Date(e,n+1,0).getDate(),m=new Date(e,n,0).getDate(),y="";for(let g of["S","M","T","W","T","F","S"])y+=`<div class="${s.aiHint}">${g}</div>`;for(let g=0;g<42;g++){let b,x=e,$=n,D=!1;g<p?(b=m-p+g+1,$=n-1,$<0&&($=11,x=e-1),D=!0):g>=p+f?(b=g-p-f+1,$=n+1,$>11&&($=0,x=e+1),D=!0):b=g-p+1;let S=nd(x,$,b),k=S<c,Q=[s.aiCalDay,D?s.aiCalMuted:"",k?s.aiCalMuted:"",S===a?s.aiCalToday:"",S===o?s.aiCalOn:""].filter(Boolean).join(" ");y+=`<button type="button" class="${Q}" data-iso="${S}" ${k?'disabled aria-disabled="true"':""}>${b}</button>`}t.innerHTML=`
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
  `}function od(t){let e=document.querySelector(h(r.aiCal)),i=fr(t)?.closest?.("button");if(!e||!i||!e.contains(i))return;t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation();let o=i.getAttribute("data-cal"),a=lt.which,c=a==="to"&&document.querySelector(h(r.aiFrom))?.value||Re();if(o==="prev"){lt.m0-=1,lt.m0<0&&(lt.m0=11,lt.y-=1),tr();return}if(o==="next"){lt.m0+=1,lt.m0>11&&(lt.m0=0,lt.y+=1),tr();return}if(o==="clear"){Yo(a,""),he();return}if(o==="today"){let p=Re();p>=c&&(Yo(a,p),he(),fc());return}if(i.disabled||i.getAttribute("aria-disabled")==="true")return;let u=i.getAttribute("data-iso");!u||u<c||(Yo(a,u),he(),fc())}function Js(t){let e=document.querySelector(h(r.aiCal));if(!e||!t)return;let n=t.getBoundingClientRect(),i=Math.min(340,window.innerWidth-16),o=e.offsetHeight||360,a=Math.max(8,Math.min(n.left,window.innerWidth-i-8)),c=n.bottom+6;c+o>window.innerHeight-8&&n.top-6-o>=8?c=n.top-6-o:c=Math.max(8,Math.min(c,window.innerHeight-o-8)),e.style.position="fixed",e.style.top=`${Math.round(c)}px`,e.style.left=`${Math.round(a)}px`,e.style.width=`${i}px`,e.style.right="auto",e.style.bottom="auto"}var hc=0;function rd(t,e){let n=document.querySelector(h(r.aiCal));n||(n=document.createElement("div"),n.id=r.aiCal,n.className=`${s.aiCal} ${s.hidden}`,n.dataset[P.mark]="",document.body.appendChild(n),l.on(n,"pointerdown",od,{capture:!0}),l.on(n,"click",a=>{n.contains(fr(a))&&(a.preventDefault(),a.stopPropagation())},{capture:!0}));let i=document.querySelector(h(t==="from"?r.aiFrom:r.aiTo))?.value,o=id(i)||new Date;lt={y:o.getFullYear(),m0:o.getMonth(),which:t},tr(),n.classList.remove(s.hidden),hc=Date.now(),Js(e),requestAnimationFrame(()=>Js(e))}function Ht(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function Bt(t){return!!(t&&t.citiesEnabled)}async function I(){let t=await B();return t?.id?String(t.id):null}async function M(t){return t&&((await C(Qt))[Qt]||{})[t]||null}async function En(t,e){if(!t)return;let i=(await C(Qt))[Qt]||{};e==null?delete i[t]:i[t]=e,await _({[Qt]:i})}var W=!1;function ze(){return W}function Be(){W=!0,ee(),ge()}function Ct(){W=!1,U=!1,ee()}async function Li(t){gc(),Be();let e=await M(t);if(!e){ft();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await En(t,e),ft()}var tt=!1,fe=null,Vt=null,Zs=2e4,qi=new Set,er="",nr="";function gc(){tt=!1,fe&&(l.clear(fe),fe=null),Vt&&(l.clear(Vt),Vt=null)}function Bi(){qi.clear(),er=""}function ad(t){let e=String(t||"").slice(0,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(e))return;let n=String(document.querySelector("#post_select")?.value||"");n!==er&&(qi.clear(),er=n),qi.add(e)}function Hi(t){let e=String(t||"").slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(e)&&(nr=e)}function sd(){let t=document.querySelector("#datepicker"),e=String(t?.value||"").trim();if(!e)return nr||"";if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,a]=n;return`${a}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return nr||""}async function pr(t="No time slots"){if(W||A()||!kt()||tt)return null;let n=await xt()||await je();if(!n?.from||!n?.to)return null;let i=document.querySelector("#post_select"),o=i?String(i.value):"";if(!o)return null;let a=sd();a&&ad(a);let u=(await Dt()).find(x=>String(x.ID)===o),f=Mn(u?.Days||[],n.from,n.to).filter(x=>!qi.has(String(x.Date).slice(0,10)));if(!f.length)return null;let m=Ue(f.length),y=f[m];if(!y?.Date)return null;let g=String(y.Date).slice(0,10);Hi(g),K=0,rt(),Ct();let b=`${t} \u2014 trying next date #${m+1} (${g}) (${f.length} left in range)\u2026`;return w(b),O(b),l.send({action:"selectFirstDate",date:g,maxMs:Fe,pollMs:V}),g}async function tc(){return!!await pr("Submit failed")}async function In(t){if(A()||ec()){t?await Li(t):Be(),w("Booking confirmed \u2014 Tik Tik stopped.");return}tt=!0,rt(),hn(),w("Submit clicked \u2014 waiting for confirmation (Auto Submit + City Change stay ON)\u2026"),Vt&&l.clear(Vt);let e=Date.now(),n=async()=>{if(Vt=null,!(!tt||!l.alive)){if(ec()||A()){let i=t||await I();i?await Li(i):Be(),w("Booking confirmed \u2014 Tik Tik stopped.");return}if(Date.now()-e>=Zs){await _n("no confirmation yet \u2014 resuming city checks");return}Vt=l.setTimeout(n,400)}};Vt=l.setTimeout(n,400),fe&&l.clear(fe),fe=l.setTimeout(()=>{fe=null,tt&&_n("submit wait timed out \u2014 resuming city checks")},Zs)}function ec(){if(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))return!0;let t=(document.body?.innerText||"").slice(0,2500);return/appointment\s+confirmation|successfully\s+scheduled|your\s+appointment\s+has\s+been/i.test(t)}async function _n(t=""){if(!tt&&!R&&!U){if(await tc())return;bt();return}gc(),U=!1,ee(),W&&Ct();let e=t?`Submit failed (${t})`:"Submit failed";if(await tc()){w(`${e} \u2014 staying on city; trying another date\u2026`);return}if(Bi(),bt(),w(`${e} \u2014 no other dates in range; hopping cities\u2026`),L)ot(Date.now()),E();else{let i=await I();if(i){let o=await M(i);Bt(o)&&await On()}}}function Ke(){return tt}function ye(t,e,n){let i=String(t||"").slice(0,10);return!(!i||i.length<10||e&&i<e||n&&i>n)}async function je(){if(W||A()||!kt())return null;let t=await I();if(!t)return null;let e=await M(t),n=e?.from?String(e.from).slice(0,10):"",i=e?.to?String(e.to).slice(0,10):"";return!n||!i||n.length<10||i.length<10?null:{from:n,to:i,accountId:t,submitArmed:Ht(e)}}async function xt(){if(W||A()||!kt())return null;let t=await I();if(!t)return null;let e=await M(t);return!Ht(e)||!e.from||!e.to?null:{...e,accountId:t}}async function be(){if(W||A()||!kt())return null;let t=await I();if(!t)return null;let e=await M(t);return!Bt(e)||!e.cities?.length?null:(_c(e),{...e,accountId:t})}function Mn(t,e,n){let i=new Date;return i.setHours(0,0,0,0),(t||[]).map(o=>{if(!o)return null;let a=o.Date!=null?o.Date:o.date,c=cd(a);return c?{...o,Date:c}:null}).filter(Boolean).filter(o=>ye(o.Date,e,n)).filter(o=>{let[a,c,u]=o.Date.slice(0,10).split("-").map(Number);return new Date(a,c-1,u)>=i}).sort((o,a)=>String(o.Date).localeCompare(String(a.Date)))}function cd(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,a,c]=n;return`${c}-${String(o).padStart(2,"0")}-${String(a).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime()))return`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}-${String(o.getDate()).padStart(2,"0")}`}return null}var U=!1,Lt=null,Ot=null,gt=!1,Rt=0,L=!1,Z=0,ct=0,Xt=0,Jt=0,te=!1,St=null,ut=0,R=!1,K=0,Ne=null,pe=null,Nt=0,nc=!1,Qo="",vn="",mr=0,ic="",oc=!1,ir=0;function ld(t){return(t||[]).map(e=>e.id).join("")}function ud(){let t=document.querySelector(h(r.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function rc(t){let e=document.querySelector(h(r.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function ee(){Lt&&(l.clear(Lt),Lt=null),U=!1}function Wt(){Ne&&(l.clear(Ne),Ne=null)}function yc(){Wt(),K||(K=Date.now());let t=Math.max(500,Cn()-(Date.now()-K));Ne=l.setTimeout(()=>{Ne=null,!(!R||!L||!l.alive)&&(R=!1,K=0,ot(Date.now()),w(`City Change \u2014 booking hold timed out (${Cn()/1e3}s); next city in 15\u201318s\u2026`),E())},t)}function dd(){pe&&(l.clear(pe),pe=null)}function Wi(t=Date.now()){let e=!1;if(gt&&Rt&&t-Rt>=td&&(gt=!1,Rt=0,e=!0),R&&(K||(K=t),t-K>=Cn()?(Wt(),R=!1,K=0,e=!0):Ne||yc()),te){ut||(ut=t);let i=Oi()?It():Yt();if(t-ut>=i)dt(),e=!0;else if(!St){let o=Math.max(500,i-(t-ut));St=l.setTimeout(()=>{if(St=null,!L||R)return;let a=Oi(),c=a?It():Yt();if(Date.now()-(ut||0)<c){Wi();return}dt(),ot(Date.now()),w(a?`City Change \u2014 still Loading after ${It()/1e3}s; changing city\u2026`:`City Change \u2014 calendar up but no dates after ${Yt()/1e3}s; changing city\u2026`),E()},o)}}return U&&!Lt&&(U=!1,e=!0),e}function bc(){if(pe||!L)return;let t=()=>{if(pe=null,!L||!l.alive||W)return;let e=Date.now(),n=Wi(e),i=!!le(new Date(e)),o=!!Ot,a=!i&&o||te||R||U||tt,c=!a&&Nt>0&&e-Nt>=Zo;(n||c||!o&&!gt&&!a)&&(c?(gt=!1,Rt=0,dt(),!R&&!tt&&(Wt(),K=0),U&&!Lt&&(U=!1),Z=e,w(i?"City Change \u2014 unstuck; hopping now\u2026":`City Change \u2014 unstuck; waiting for IST window ${Me()}\u2026`)):n?(!R&&!tt&&(Z=e),w(i?"City Change \u2014 lock cleared; hopping now\u2026":`City Change \u2014 lock cleared; next IST window ${Me()}\u2026`)):w("City Change \u2014 timer lost; restarting\u2026"),Nt=e,E()),L&&(pe=l.setTimeout(t,Xs))};pe=l.setTimeout(t,Xs)}function ge(){xr(),dd(),wd(),Wt(),gt=!1,Rt=0,L=!1,R=!1,K=0,Z=0,ct=0,Nt=0,dt()}async function fd(){if(!kt()||A()||W)return{hide:!0};let t=Date.now(),e=!!tt,n=!!(te&&Oi()),i=null;if(L&&!e&&!n)if(te&&ut){let o=Math.max(0,Yt()-(t-ut));i=Math.max(0,Math.ceil(o/1e3))}else R||qt>t?i=null:le(new Date(t))?i=Math.max(0,Math.ceil(wc(t)/1e3)):i=null;return{submitPending:e,loadingStuck:n,rotateActive:!!L,secondsUntilHop:i}}function Fi(t,e,n){Gs(t,e,n)}function dt(){te=!1,ut=0,St&&(l.clear(St),St=null)}function hr(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let i=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(i))continue;let o=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let a of o)if(a&&/\bLoading\.{0,3}\b/i.test((a.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let o=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(o))continue;let a=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(a))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function Oi(){return hr()}function gr(){te=!0,ut=Date.now(),St&&l.clear(St),St=l.setTimeout(()=>{St=null,!(!L||R)&&(dt(),ot(Date.now()),w(`City Change \u2014 still Loading after ${It()/1e3}s; changing city\u2026`),E())},It())}function yr(t){let e=Math.max(0,Number(t)||0)*1e3;Jt=Math.max(Jt,Date.now()+e),Z=Math.max(Z,Jt),dt(),E()}function xc(){dt()}function rt(){W||(R=!0,K||(K=Date.now()),xr(),dt(),yc(),Nt=Date.now(),L&&E(),w("City Change \u2014 paused (Auto Submit booking)\u2026"))}function bt(){if(tt){w("Submit pending \u2014 staying on this city (ignoring date reload hop)\u2026");return}R&&(Wt(),R=!1,K=0,!(!L||W)&&(ot(Date.now()),w("City Change \u2014 resuming; next city in 15\u201318s\u2026"),E()))}async function Ui(){if(!(await on()).ok)return;let e=await xt();if(!e)return;let n=Date.now();if(n-ir<6e4)return;ir=n;let o=document.querySelector("#post_select")?.value;if(!o){w("Auto Submit ON \u2014 pick a city first.");return}let c=(await Dt()).find(p=>String(p.ID)===String(o)),u=c?.Days;if(Array.isArray(u)&&u.length){let p=Mn(u,e.from,e.to);if(p.length){rt();let m=Ue(p.length),y=p[m].Date;w(`Auto Submit: picking date #${m+1} (${y.slice(0,10)})\u2026`),Hi(y),l.send({action:"selectFirstDate",date:y,maxMs:Fe,pollMs:V});return}let f=Mn(u,"1970-01-01","2999-12-31");if(f.length){let m=f[0].Date;w(`Auto Submit ON \u2014 dates outside ${e.from} \u2192 ${e.to}; jumping calendar to ${m} (not booking).`),l.send({action:"selectFirstDate",date:m,navigateOnly:!0,maxMs:4e3,pollMs:V});return}w(`Auto Submit ON \u2014 no dates in your range on ${c.Name||"this city"} yet.`);return}w("Auto Submit ON \u2014 loading slots for current city\u2026"),l.send({action:"selectPost",postId:String(o)})}function br(){ir=0}function xr(){Ot&&(l.clear(Ot),Ot=null)}function pd(t,e){return t+Math.random()*(e-t)}function md(){return pd(ur(),Zu())}function ot(t=Date.now()){Z=t+md()}function wc(t=Date.now()){let e=Eo(new Date(t));if(e>0)return e;if(Jt>t)return Jt-t;if(ct){let n=ct+ur()-t;if(n>0)return n}return Z>t?Z-t:0}function E(){if(!L)return;if(xr(),R||te){Ot=l.setTimeout(()=>{Jo()},500);return}let t=Date.now(),e=Eo(new Date(t));if(e>0){Z>t&&(Z=t),e>=Zo&&(Nt=t),Ot=l.setTimeout(()=>{Jo()},e);return}let n=0;Jt>t&&(n=Math.max(n,Jt-t)),ct&&(n=Math.max(n,ct+ur()-t)),Z>t&&(n=Math.max(n,Z-t)),n=Math.max(0,n),n>=Zo&&(Nt=Date.now()),Ot=l.setTimeout(()=>{Jo()},n)}function hd(t,e){if(!t.length)return null;if(t.length===1)return Xt=0,t[0];let n=t.findIndex(o=>String(o.id)===String(e));n<0&&(n=Math.max(0,Math.min(Xt,t.length-1)));let i=(n+1)%t.length;return Xt=i,t[i]}function zi(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function wr(t){return String(t||"").toLowerCase().replace(/\b(vac|ofc|consular|embassy|appointment)\b/g," ").replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim()}function or(t,e,n){if(!t)return null;let i=e.get(String(t.id));if(i)return i;let o=wr(t.name);if(!o)return null;if(i=n.get(o)||null,i)return i;for(let[a,c]of n)if(a!==o&&(a.includes(o)||o.includes(a)))return c;return null}function Ln(t){let e=zi();if(!e.length||!t?.length)return[];let n=new Map(e.map(c=>[String(c.id),c])),i=new Map;for(let c of e){let u=wr(c.name);u&&!i.has(u)&&i.set(u,c)}let o=[],a=new Set;for(let c of t){let u=or(c,n,i);u&&(a.has(u.id)||(a.add(u.id),o.push({id:u.id,name:u.name})))}return o}function ac(t,e){let n=Array.isArray(t)?t.filter(Boolean):[],i=Array.isArray(e)?e.filter(Boolean):[];if(!i.length)return n.map(g=>({id:String(g.id),name:g.name||g.id}));let o=document.querySelector(h(r.aiCities)),a=new Set(o?[...o.querySelectorAll('input[type="checkbox"]')].map(g=>String(g.value)):[]),c=zi(),u=new Map(c.map(g=>[String(g.id),g])),p=new Map;for(let g of c){let b=wr(g.name);b&&!p.has(b)&&p.set(b,g)}let f=[],m=new Set,y=g=>{if(!g)return;let b=c.length?or(g,u,p):null,x=String(b?.id||g.id);m.has(x)||(m.add(x),f.push({id:x,name:b?.name||g.name||g.id}))};for(let g of i)y(g);for(let g of n){let b=c.length?or(g,u,p):null,x=String(b?b.id:g.id);m.has(x)||m.has(String(g.id))||a.has(x)&&!i.some($=>String($.id)===x)||y(b||g)}return f}function Zt(){let t=document.querySelector(h(r.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function qn(){return{from:document.querySelector(h(r.aiFrom))?.value||null,to:document.querySelector(h(r.aiTo))?.value||null}}function An(t=[],{force:e=!1,selectedCities:n=null}={}){let i=document.querySelector(h(r.aiCities));if(!i)return;let o=zi(),a=ld(o),c=document.querySelector(h(r.aiPanel)),u=c&&!c.classList.contains(s.hidden),p=ud();if(!e&&a===ic&&i.querySelector('input[type="checkbox"]'))return;ic=a;let f=n?.length?n:(t||[]).map(g=>({id:String(g),name:""})),m=f.length?Ln(f):[],y=new Set(u&&p.length&&!e&&!f.length?p:(m.length?m.map(g=>g.id):p).map(String));if(i.replaceChildren(),!o.length){i.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let g of o){let b=document.createElement("label"),x=document.createElement("input");x.type="checkbox",x.value=g.id,x.dataset.name=g.name,x.checked=y.has(g.id),b.append(x,document.createTextNode(g.name)),i.appendChild(b)}}async function $t(t,e={}){let n=await M(t)||{},{cities:i,...o}=e,{from:a,to:c}=qn(),u=Zt(),p=Array.isArray(n.cities)?n.cities:[],f=document.querySelector(h(r.aiCities)),m=f?f.querySelectorAll('input[type="checkbox"]').length:0,y;if(i!==void 0){let b=Array.isArray(i)?i:[];!b.length&&!u.length?y=m>0?[]:p:y=ac(p,b.length?b:u)}else u.length?y=ac(p,u):y=p;let g={...n,from:a||n.from||null,to:c||n.to||null,cities:y.length?y:m>0&&i!==void 0&&!(i||[]).length?[]:n.cities||[],loginId:document.querySelector(h(r.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(h(r.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(b=>{let x=[r.aiQ1,r.aiQ2,r.aiQ3][b],$=[r.aiA1,r.aiA2,r.aiA3][b];return{q:document.querySelector(h(x))?.value?.trim()||n.security?.[b]?.q||"",a:document.querySelector(h($))?.value?.trim()||n.security?.[b]?.a||"",set:b+1}}),...o};return typeof g.submitEnabled=="boolean"&&(g.enabled=g.submitEnabled),g.serverUpdatedAt=Date.now(),await En(t,g),gd(g),g}async function Xo(){let t=await I();if(!t)return;let e=Zt(),n=await $t(t,{cities:e}),i=Ln(n.cities||e),o=i.map(p=>p.name||p.id).join(" \u2192 ")||"\u2014";if(!i.length){w("No preferred cities selected \u2014 tick cities anytime; hopping paused."),L&&ge();return}if(ht=!0,He(n),!Bt(n)){w(`Preferred cities saved (${i.length}): ${o} \u2014 turn City Change ON to hop.`);return}if(Ki(),!L){await On();return}let a=document.querySelector("#post_select"),c=a?String(a.value):"",u=i.findIndex(p=>String(p.id)===c);Xt=u>=0?u:Math.min(Xt,i.length-1),w(`Preferred cities updated (${i.length}): ${o} \u2014 City Change keeps running`),E()}var Pi=null,rr=null;function gd(t){Pi&&l.clear(Pi),Pi=l.setTimeout(()=>{Pi=null,Ws(t).catch(()=>{})},400)}async function Sc(t){if(!t||rr===t)return null;let e=await Fs();if(rr=t,!e)return null;let n=await M(t)||{},i=Bs(n,e);return i?(i.loginId=n.loginId||i.loginId||"",i.loginPass=n.loginPass||"",i.security=n.security||i.security||[],typeof i.submitEnabled=="boolean"&&(i.enabled=i.submitEnabled),await En(t,i),i):null}async function yd(t,e){if(tt||!le()||R||U)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let i=String(t);return String(n.value)===i?!1:(vn=i,mr=Date.now(),gr(),ct=Date.now(),ot(ct),wn(i,e||i),w(`Switching city \u2192 ${e||t}\u2026`),Bi(),l.send({action:"selectPost",postId:i}),!0)}var qt=0,ar=45e3;async function bd(t,e,{alertId:n,dayCount:i,bestDate:o}={}){if(W||A()||!kt()||tt)return!1;let a=document.querySelector("#post_select");if(!a||!t)return!1;let c=String(t),u=e||c;if(String(a.value)===c){qt=Date.now()+ar,w(`City alert \u2014 already on ${u}`+(i?` (${i} dates`:"")+(o?`, best ${o}`:"")+(i?")":"")+" \u2014 holding for booking");try{bi(2,90,60)}catch{}try{l.send({action:"focusScheduleTab"})}catch{}return rt(),!0}Wt(),dt(),R=!1,K=0,U=!1,ee(),gt=!1,Rt=0,Z=Date.now(),ct=0,Jt=0,vn=c,mr=Date.now(),gr(),ct=Date.now(),qt=Date.now()+ar,Bi(),w(`City alert \u2014 FAST switch \u2192 ${u}`+(i?` (${i} dates`:"")+(o?`, best ${o}`:"")+(i?")":"")+(n?` [#${n}]`:""));try{bi(3,80,50)}catch{}try{l.send({action:"focusScheduleTab"})}catch{}return wn(c,u),l.send({action:"selectPost",postId:c,force:!0}),rt(),L&&E(),!0}var me=null,Ei=!1,sc="",cc=0,xd=50;function wd(){me&&(l.clear(me),me=null),Ei=!1}async function Sd(){if(!(Ei||!L||W)){Ei=!0;try{let t=await be();if(!t?.cities?.length)return;let e=document.querySelector("#post_select"),n=await Rs({preferredCities:t.cities,citiesEnabled:!0,currentCityId:e?String(e.value):"",dateFrom:t.from||null,dateTo:t.to||null});if(!n?.alertId)return;if(n.alreadyThere){Ai(n.alertId),qt=Math.max(qt,Date.now()+ar),rt(),w(`City alert \u2014 already on ${n.name||n.id}`+(n.dayCount?` (${n.dayCount} dates`:"")+(n.bestDate?`, best ${n.bestDate}`:"")+(n.dayCount?")":"")+" \u2014 holding for booking");return}let i=`${n.id}:${n.alertId}`,o=Date.now();if(i===sc&&o-cc<4e3){Ai(n.alertId);return}await bd(n.id,n.name,{alertId:n.alertId,dayCount:n.dayCount,bestDate:n.bestDate})&&(sc=i,cc=o,Ai(n.alertId))}catch{}finally{Ei=!1}}}function vc(){if(me||!L)return;let t=()=>{me=null,!(!L||W||!l.alive)&&Sd().finally(()=>{L&&!W&&l.alive&&(me=l.setTimeout(t,xd))})};me=l.setTimeout(t,50)}function Ki(){if(nc)return;let t=document.querySelector("#post_select");if(!t)return;nc=!0,Qo=String(t.value||"");let e=()=>{let n=document.querySelector("#post_select");if(!n)return;let i=String(n.value||"");!i||i===Qo||(Qo=i,vd(i,n))};l.on(t,"change",e),l.setInterval(e,400)}function vd(t,e){if(!L||W||!l.alive||tt)return;let n=String(t||"");if(!n)return;let i=vn&&n===vn&&Date.now()-mr<2500;i&&(vn=""),Wt(),R=!1,K=0,ee(),Bi(),ct=Date.now(),gr(),ot(ct),be().then(a=>{if(!a?.cities?.length)return;let u=Ln(a.cities).findIndex(p=>String(p.id)===n);u>=0&&(Xt=u)}).catch(()=>{});let o=e?.selectedOptions&&e.selectedOptions[0]?.textContent?.trim()||e?.options?.[e.selectedIndex]?.textContent?.trim()||n;wn(n,o),w(i?`City Change \u2014 on ${o}; waiting for dates\u2026`:`City Change \u2014 you switched \u2192 ${o}; waiting (same as system hop)\u2026`),E()}async function Jo(){if(!(gt||!L)){gt=!0,Rt=Date.now(),Nt=Date.now(),Ot=null;try{if(W||A()||!l.alive){ge();return}if(Wi()){Z=Date.now(),w(le()?"City Change \u2014 auto-unstuck; hopping now\u2026":`City Change \u2014 auto-unstuck; waiting IST ${Me()}\u2026`),E();return}if(R||U){let m=K?Date.now()-K:0;if(R&&m>=Cn()){Wt(),R=!1,K=0,ot(Date.now()),w("City Change \u2014 hold expired; next city in 15\u201318s\u2026"),E();return}let y=Math.max(0,Cn()-m);w(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(y/1e3)}s`),E();return}let t=Date.now();if(qt>t){let m=Math.ceil((qt-t)/1e3);w(`City alert hold \u2014 staying for booking\u2026 (${m}s)`),E();return}let e=le(new Date(t));if(!e){E();return}if(te){let m=ut?t-ut:0;if(Oi()){if(m>=It()){dt(),ot(Date.now()),w(`City Change \u2014 still Loading after ${It()/1e3}s; changing city\u2026`),E();return}let b=Math.max(0,Math.ceil((It()-m)/1e3));w(`City Change \u2014 Date Loading\u2026 stay (${b}s then hop if still Loading)`),E();return}let y=qt>t?Math.max(Yt(),qt-(ut||t)):Yt();if(m>=y){dt(),ot(Date.now()),w(`City Change \u2014 calendar up but no dates after ${Math.round(y/1e3)}s; changing city\u2026`),E();return}let g=Math.max(0,Math.ceil((Yt()-m)/1e3));w(`City Change \u2014 waiting calendar dates\u2026 (${g}s then hop)`),E();return}let n=wc(t);if(n>0){let m=Math.ceil(n/1e3);w(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,m)}s`),E();return}let i=await be();if(!i?.cities?.length){ge();return}let o=new Set(zi().map(m=>m.id)),a=Ln(i.cities);if(!a.length){w("Preferred cities not found in the dropdown \u2014 pick cities again."),ge();return}a.length<(i.cities?.length||0)&&w(`City Change \u2014 using ${a.length}/${i.cities.length} preferred (some ids remapped/missing in dropdown): ${a.map(m=>m.name||m.id).join(" \u2192 ")}`);let c=document.querySelector("#post_select"),u=c?String(c.value):"",p=hd(a,u);if(!p){ot(t),E();return}if(await yd(p.id,p.name)){ct=Date.now(),ot(ct);let m=a.map(g=>g.name||g.id).join(" \u2192 "),y=`${Xt+1}/${a.length}`;w(`City Change \u2014 ${y} ${p.name||p.id} (path: ${m}); Loading up to ${It()/1e3}s, no-dates hop ${Yt()/1e3}s`)}else ot(t);E()}finally{gt=!1,Rt=0}}}function Sr(){let t=document.querySelector(h(r.aiPanel));t&&t.classList.contains(s.hidden)?$n(!0):Co()}async function On(){if(W||A()||!kt())return;if(!(await on()).ok){Sr();return}let e=await be();if(!e?.cities?.length)return;let n=Ln(e.cities);if(!n.length){w("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}Wt(),dt(),R=!1,K=0,U=!1,gt=!1,Rt=0,L=!0,Nt=Date.now(),Z=Date.now();let i=document.querySelector("#post_select"),o=i?String(i.value):"",a=n.findIndex(u=>String(u.id)===o);Xt=a>=0?a:0;let c=n.map(u=>u.name||u.id).join(" \u2192 ");w(`City Change ON \u2014 ${n.length} cities (${c}); IST ${Me()}; hop 15\u201318s`),bc(),vc(),E()}async function $c(){if(W||A()||!kt()||!l.alive||!(await be())?.cities?.length||!document.querySelector("#post_select"))return;if(!L){await On();return}let e=Wi();bc(),vc(),(e||!Ot&&!gt)&&(e&&(ot(Date.now()),w("City Change \u2014 auto-unstuck; next city in 15\u201318s\u2026")),E())}function vr(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function Ii(){let t=vr();return!!(t&&!t.disabled)}function $d(t){if(!t||t.disabled)return!1;try{let e=t.form||t.closest?.("form");if(e&&typeof e.requestSubmit=="function")return e.requestSubmit(t),!0}catch{}try{return t.click(),!0}catch{}try{return t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click(),!0}catch{}return!1}function $r(){let t=vr();if(!t||t.disabled)return!1;let e=$d(t);return l.send({action:"forceClickSubmit",prefix:d,pollMs:V,maxMs:Math.min(1500,kn)}),e}function kd(){return it()?Ii():!1}function kr(t){let e=Date.now()+Math.max(0,Number(t)||0);return it()&&Ii()?Promise.resolve(!0):new Promise(n=>{let i=!1,o=null,a=null,c=p=>{if(!i){i=!0;try{a?.disconnect()}catch{}o&&l.clear(o),n(!!p)}},u=()=>{if(!l.alive||ze()||A())return c(!1);if(it()&&Ii())return c(!0);if(Date.now()>=e)return c(it()&&Ii())};try{a=new MutationObserver(u);let p=vr();p&&a.observe(p,{attributes:!0,attributeFilter:["disabled","class","aria-disabled"]});let f=p?.form||p?.closest?.("form")||document.querySelector("#page_form, form");f?a.observe(f,{attributes:!0,attributeFilter:["disabled","class"],childList:!0,subtree:!0}):a.observe(document.documentElement,{attributes:!0,attributeFilter:["disabled"],childList:!0,subtree:!0})}catch{a=null}o=l.setInterval(u,V),u()})}function kc(){w("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function Cr(t){if(W||A()||U)return;let e=await M(t);if(!Ht(e))return;rt(),U=!0,hn();let n=Date.now(),i=!1,o=!1,a=async p=>{if(!(i||!U||!l.alive)){if(i=!0,window.removeEventListener("message",c),Lt&&(l.clear(Lt),Lt=null),A()){U=!1;return}if(U=!1,p){await In(t);return}bt(),w(L?"Auto Submit \u2014 Submit not clicked in time; City Change resuming\u2026":"Auto Submit \u2014 Submit not clicked in time; still watching\u2026")}},c=p=>{!l.alive||p.source!==window||p.data?.action===Ut.sub&&a(!0)};window.addEventListener("message",c);let u=async()=>{if(i||!U||!l.alive||o)return;let p=Date.now()-n;if(kd()){o=!0,w("Submit enabled \u2014 clicking\u2026"),$r();return}if(p>=kn)return a(!1);w("Waiting for Submit to enable\u2026"),Lt=l.setTimeout(u,V)};kr(kn).then(p=>{i||!U||!l.alive||o||p&&u()}),u()}async function Cc(){if(!it()||U||W)return;let t=await xt();t&&await Cr(t.accountId)}function w(t){let e=document.querySelector(h(r.aiStatus));if(e){if(!t){e.textContent="";return}e.textContent=t}}function O(t){w(t)}function lc(t){return!!(t&&t.termsAgreed)}function Tc(t){return!!(t&&t.termsPassed)}function Ri(){return!!document.querySelector(h(r.aiTermsAgree))?.checked}function ji(t){let e=document.querySelector(h(r.aiTermsGate)),n=document.querySelector(h(r.aiMain));if(!ni()){e&&e.classList.add(s.hidden),n&&n.classList.add(s.hidden);return}let i=document.querySelector(h(r.aiTermsAgree)),o=document.querySelector(h(r.aiTermsContinue)),a=Tc(t);e&&e.classList.toggle(s.hidden,a),n&&n.classList.toggle(s.hidden,!a),i&&(i.checked=lc(t)||Ri()),o&&(o.disabled=!(lc(t)||Ri()))}function Cd(){let t=document.querySelector(h(r.aiTermsContinue)),e=Ri();t&&(t.disabled=!e),w(e?"Terms checked \u2014 tap Continue.":"Check Agree to continue.")}async function Td(){if(!Ri()){w("Check Agree first.");return}let t=await I();if(!t){w("Open a logged-in schedule page so we can bind this to your account.");return}let e=await M(t)||{},{from:n,to:i}=qn(),o=Zt(),a=Tr();Ct(),ee(),br(),vt=!0,ht=!0,await $t(t,{termsAgreed:!0,termsPassed:!0,termsAgreedAt:e.termsAgreedAt||Date.now(),submitEnabled:!0,citiesEnabled:!0,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],slotWindows:a.length?a:e.slotWindows||null,confirmedAt:Date.now()}),await ft(),yt(document.querySelector(h(r.aiSubmitSw)),!0),yt(document.querySelector(h(r.aiCitiesSw)),!0),vt=!0,ht=!0,He(await M(t)),An((e.cities||[]).map(u=>u.id),{force:!0,selectedCities:e.cities||[]}),_r(e),ji(await M(t)),(Zt().length?Zt():e.cities||[]).length&&(Ki(),await On()),(n||e.from)&&(i||e.to)&&await Ui(),w("Auto Submit and City Change ON \u2014 set dates and preferred cities.")}function _c(t){t?.slotWindows?.length?Ka(t.slotWindows):Po()}function _d(t){let e="";for(let n=0;n<=59;n++){let i=Number(t)===n?" selected":"";e+=`<option value="${n}"${i}>:${String(n).padStart(2,"0")}</option>`}return e}function uc(t,e){let n=ce,i="";for(let o=1;o<=n;o++){let a=Number(e)===o?" selected":"";i+=`<option value="${o}"${a}>${o} min</option>`}return i}function Mc(t,e){let n=Number(t)||0,i=Number(e)||1,o=(n+i)%60;return`Runs from :${String(n).padStart(2,"0")} up to :${String(o).padStart(2,"0")}`}function Tr(){let t=document.querySelector(h(r.aiWinList));if(!t)return[];let e=[];for(let n of t.querySelectorAll(`.${s.aiWinRow}`)){let i=Number(n.querySelector('select[data-win="from"]')?.value),o=Number(n.querySelector('select[data-win="dur"]')?.value);!Number.isFinite(i)||!Number.isFinite(o)||e.push({fromMin:i,durationMin:o})}return Do(e)}function dc(t){let e=t.querySelector('select[data-win="from"]'),n=t.querySelector('select[data-win="dur"]'),i=t.querySelector(`.${s.aiWinHelp}`);!e||!n||!i||(i.textContent=Mc(e.value,n.value))}function Ac(t=0,e=6){let n=Math.min(Math.max(1,e||1),ce),i=document.createElement("div");i.className=s.aiWinRow,i.innerHTML=`
    <div class="${s.aiInline}">
      <label class="${s.aiHead}">Start</label>
      <select data-win="from">${_d(t)}</select>
      <label class="${s.aiHead}" style="margin-left:10px;color:#6b7280;font-weight:500">Duration</label>
      <select data-win="dur">${uc(t,n)}</select>
      <button type="button" class="${s.aiTrash}" data-win="del" title="Delete timing" aria-label="Delete">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
        </svg>
      </button>
    </div>
    <div class="${s.aiWinHelp}">${Mc(t,n)}</div>
  `;let o=i.querySelector('select[data-win="from"]'),a=i.querySelector('select[data-win="dur"]');return l.on(o,"change",()=>{let c=Number(o.value),u=Number(a.value)||1;a.innerHTML=uc(c,u),dc(i)}),l.on(a,"change",()=>dc(i)),l.on(i.querySelector('button[data-win="del"]'),"click",()=>{i.remove(),Mr()}),i}function _r(t){let e=document.querySelector(h(r.aiWinList));if(!e)return;e.replaceChildren();let n=ja(t?.slotWindows);for(let i of n.slice(0,mt))e.appendChild(Ac(i.fromMin,i.durationMin));Mr(t)}function Mr(t){let e=document.querySelector(h(r.aiWinNote));e&&(e.textContent=`IST each hour \xB7 max ${mt}`),Dc()}function Dc(){let t=document.querySelector(h(r.aiWinList)),e=document.querySelector(h(r.aiWinAdd));if(!e||!t)return;let n=t.querySelectorAll(`.${s.aiWinRow}`).length,i=n>=mt;e.disabled=i,e.textContent=i?`+ Add timing (${n} of ${mt})`:"+ Add timing"}function yt(t,e){t&&(t.classList.toggle(s.aiOnBtn,!!e),t.setAttribute("aria-checked",e?"true":"false"))}function Md(t){yt(document.querySelector(h(r.aiSubmitSw)),Ht(t)),yt(document.querySelector(h(r.aiCitiesSw)),Bt(t))}var vt=!1,ht=!1;function He(t){let e=Ht(t)||vt,n=Bt(t)||ht,i=document.querySelector(h(r.aiSubmitBody)),o=document.querySelector(h(r.aiCitiesBody));i&&i.classList.toggle(s.hidden,!e),o&&o.classList.toggle(s.hidden,!n)}function Ad(t,e){let n=document.querySelector(h(r.aiStatus)),i=document.querySelector(h(r.aiBtn));if(!i)return;Md(t),He(t);let o=Ht(t),a=Bt(t);o||a?(i.classList.add(s.aiOn),i.textContent="Tik Tik ON"):(i.classList.remove(s.aiOn),i.textContent="Tik Tik"),n&&(n.textContent="",n.classList.remove(s.aiOk))}async function ft(){let t=await I();if(t)try{await Sc(t)}catch{}let e=t?await M(t):null;Ht(e)||(vt=!1),Bt(e)?ht=!0:ht=!1,_c(e),Ad(e,t),ji(e),ni()?Ks():xn();let n=document.querySelector(h(r.aiFrom)),i=document.querySelector(h(r.aiTo));n&&(n.value=e?.from||""),i&&(i.value=e?.to||""),dr();let o=(e?.cities||[]).map(b=>b.id),a=document.querySelector(h(r.aiCitiesBody));(a&&!a.classList.contains(s.hidden)||Bt(e)||ht)&&An(o,{selectedCities:e?.cities||[]}),_r(e);let u=Pc(e),p=document.querySelector(h(r.aiLogin)),f=document.querySelector(h(r.aiPass));p&&(u?.loginId||e?.loginId)&&(p.value=u?.loginId||e.loginId||""),f&&(u?.loginPass||e?.loginPass)&&(f.value=u?.loginPass||e.loginPass||"");let m=u?.security||e?.security||[],y=[r.aiQ1,r.aiQ2,r.aiQ3],g=[r.aiA1,r.aiA2,r.aiA3];y.forEach((b,x)=>{let $=document.querySelector(h(b));$&&($.innerHTML=Sn(x,m[x]?.q||""))}),g.forEach((b,x)=>{let $=document.querySelector(h(b));$&&m[x]?.a&&($.value=m[x].a)}),Ar(e),We||Nn(!1)}function Dd(){let t=document.querySelector(h(r.aiPanel));return!!(t&&!t.classList.contains(s.hidden))}var Ni=0;function $n(t){let e=document.querySelector(h(r.aiPanel));e&&(t||he(),e.classList.toggle(s.hidden,!t),t&&(Ni=Date.now(),e.dataset.openedAt=String(Ni),I().then(async n=>{if(n)try{rr=null,await Sc(n)}catch{}let i=n?await M(n):null;ji(i),Tc(i)?An((i?.cities||[]).map(o=>o.id),{force:!0,selectedCities:i?.cities||[]}):w("Read the terms, check Agree, then Continue."),Co()})))}function sr(){if(sr._done)return;sr._done=!0;let t=e=>{if(!Dd()||Date.now()-Ni<800||!ni())return;let n=document.querySelector(h(r.aiPanel)),i=document.querySelector(h(r.aiBtn)),o=document.querySelector(h(r.aiCal)),a=fr(e),c=typeof e.composedPath=="function"?e.composedPath():[],u=f=>!!(f&&(a&&(f===a||f.contains?.(a))||c.some(m=>m===f)));if(u(i)||u(n)||o&&!o.classList.contains(s.hidden)&&u(o))return;o&&!o.classList.contains(s.hidden)&&he();let p=document.activeElement;n&&p&&n.contains(p)||(he(),$n(!1))};l.on(document,"click",t)}async function Pd(t){if(t&&!(await on()).ok){Sr();return}let e=await I();if(!e){w("Open a logged-in schedule page so we can bind this to your account.");return}let n=await M(e)||{},{from:i,to:o}=qn();if(i=i||n.from||null,o=o||n.to||null,t){vt=!0,yt(document.querySelector(h(r.aiSubmitSw)),!0),Ct(),ee(),br(),await $t(e,{submitEnabled:!0,from:i||null,to:o||null,confirmedAt:Date.now()});let a=document.querySelector(h(r.aiFrom)),c=document.querySelector(h(r.aiTo));if(a&&i&&(a.value=i),c&&o&&(c.value=o),dr(),await ft(),yt(document.querySelector(h(r.aiSubmitSw)),!0),vt=!0,He(await M(e)),!i||!o){w("Auto Submit ON \u2014 select From and To dates to start booking.");return}if(i>o){w("Auto Submit ON \u2014 From date must be before To date.");return}vt=!1,w(`Auto Submit ON (${Tn(i)} \u2013 ${Tn(o)})`),await Ui();return}vt=!1,ee(),yt(document.querySelector(h(r.aiSubmitSw)),!1),await $t(e,{submitEnabled:!1,from:i||n.from,to:o||n.to}),await ft(),w("Auto Submit OFF")}async function Ed(t){if(t&&!(await on()).ok){Sr();return}let e=await I();if(!e){w("Open a logged-in schedule page so we can bind this to your account.");return}let n=await M(e)||{};if(t){ht=!0,yt(document.querySelector(h(r.aiCitiesSw)),!0),An((n.cities||[]).map(c=>c.id),{force:!0,selectedCities:n.cities||[]}),_r(n);let o=Zt();!o.length&&n.cities?.length&&(o=n.cities);let a=Tr();if(Ct(),await $t(e,{citiesEnabled:!0,...o.length?{cities:o}:{},slotWindows:a.length?a:n.slotWindows||null}),await ft(),yt(document.querySelector(h(r.aiCitiesSw)),!0),ht=!0,He(await M(e)),o.length||An([],{force:!0}),!o.length){w("City Change ON \u2014 select at least one preferred city to start hopping.");return}ht=!0,He(await M(e)),Ki(),await On(),w(`City Change ON (${o.map(c=>c.name||c.id).join(", ")}) \u2014 edit cities anytime`);return}ht=!1,ge(),yt(document.querySelector(h(r.aiCitiesSw)),!1);let i=Zt();await $t(e,{citiesEnabled:!1,cities:i.length?i:n.cities||[]}),await ft(),w("City Change OFF")}async function fc(){let t=await I();if(!t)return;let e=await M(t)||{};if(!Ht(e)&&!vt)return;let{from:n,to:i}=qn();!n||!i||n>i||(await $t(t,{submitEnabled:!0,from:n,to:i,confirmedAt:Date.now()}),vt=!1,await ft(),yt(document.querySelector(h(r.aiSubmitSw)),!0),Ct(),br(),w(`Auto Submit ON (${Tn(n)} \u2013 ${Tn(i)})`),await Ui())}function Id(t){return(t||[]).map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", ")}async function Ld(){let t=document.querySelector(h(r.aiWinList));if(t){if(t.querySelectorAll(`.${s.aiWinRow}`).length>=mt){w(`Max ${mt} timings.`),Dc();return}t.appendChild(Ac(0,Math.min(6,ce))),Mr()}}async function qd(){let t=await I();if(!t){w("Open a logged-in schedule page so we can bind this to your account.");return}let e=Tr();if(!e.length){w("Add at least one timing (or Reset to defaults).");return}await $t(t,{slotWindows:e}),await ft(),w(`Saved ${e.length} custom timing(s): ${Id(e)}`)}async function Od(){let t=await I();if(!t){w("Open a logged-in schedule page so we can bind this to your account.");return}window.confirm("Reset to default IST windows? Your custom timings will be removed.")&&(await $t(t,{slotWindows:null}),Po(),await ft(),w(`Using default windows: ${Me()}`))}var We=null;function cr(){return`lp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`}function pc(t){if(!t||String(t).length<10)return"\u2014";try{return new Date(`${String(t).slice(0,10)}T12:00:00`).toLocaleDateString("en-US",{month:"short",day:"numeric"})}catch{return String(t).slice(0,10)}}function Rn(t){let e=Array.isArray(t?.loginProfiles)?t.loginProfiles.filter(Boolean):[];return e.length?e.map(n=>({id:String(n.id||cr()),loginId:String(n.loginId||"").trim(),loginPass:String(n.loginPass||""),security:Array.isArray(n.security)?n.security:[],from:n.from||null,to:n.to||null,cities:Array.isArray(n.cities)?n.cities:[],visa:n.visa||""})):t?.loginId&&t?.loginPass?[{id:t.activeLoginProfileId||cr(),loginId:String(t.loginId).trim(),loginPass:String(t.loginPass),security:Array.isArray(t.security)?t.security:[],from:t.from||null,to:t.to||null,cities:Array.isArray(t.cities)?t.cities:[],visa:""}]:[]}function Pc(t){let e=Rn(t);if(!e.length)return null;let n=t?.activeLoginProfileId;return e.find(i=>String(i.id)===String(n))||e[0]}function Rd(t){let n=(t?.cities||[]).map(o=>o.name||o.id).filter(Boolean)[0]||"\u2014",i=String(t?.visa||"").trim();return i?`${n} (${i})`:n}function Nd(t){return`${pc(t?.from)} \u2192 ${pc(t?.to)}`}function Ec(t){let e=document.querySelector(h(r.aiLogin)),n=document.querySelector(h(r.aiPass));e&&(e.value=t?.loginId||""),n&&(n.value=t?.loginPass||"");let i=t?.security||[];[r.aiQ1,r.aiQ2,r.aiQ3].forEach((o,a)=>{let c=document.querySelector(h(o));c&&(c.innerHTML=Sn(a,i[a]?.q||""))}),[r.aiA1,r.aiA2,r.aiA3].forEach((o,a)=>{let c=document.querySelector(h(o));c&&(c.value=i[a]?.a||"")})}function Bd(){Ec(null)}function Nn(t,e){let n=document.querySelector(h(r.aiLoginBody)),i=document.querySelector(h(r.aiLoginEditorTitle));n&&n.classList.toggle(s.hidden,!t),i&&(i.textContent=e||(t?"Edit profile":""))}function Ar(t){let e=document.querySelector(h(r.aiProfilesList));if(!e)return;let n=Rn(t),i=Pc(t)?.id||null;if(e.replaceChildren(),!n.length){let o=document.createElement("p");o.className=s.aiQlEmpty,o.textContent="No profiles yet. Add one for faster Home login.",e.appendChild(o);return}for(let o of n){let a=document.createElement("div");a.className=s.aiQlCard,a.dataset.profileId=o.id;let c=document.createElement("div");c.className=s.aiQlMeta;let u=document.createElement("strong");u.textContent=o.loginId||"Untitled";let p=document.createElement("span");p.textContent=Rd(o);let f=document.createElement("span");f.textContent=Nd(o);let m=document.createElement("button");if(m.type="button",m.className=s.aiQlEdit,m.textContent="Edit",m.dataset.editProfile=o.id,c.append(u,p,f,m),a.appendChild(c),String(o.id)===String(i)){let y=document.createElement("span");y.className=s.aiQlBadge,y.textContent="Active Profile",a.appendChild(y)}else{let y=document.createElement("button");y.type="button",y.className=s.aiQlEdit,y.style.marginTop="2px",y.textContent="Use",y.dataset.activateProfile=o.id,a.appendChild(y)}e.appendChild(a)}}async function Hd(t){let e=await I();if(!e)return;let n=await M(e)||{},i=Rn(n),o=i.find(c=>String(c.id)===String(t));if(!o)return;await En(e,{...n,loginProfiles:i,activeLoginProfileId:o.id,loginId:o.loginId,loginPass:o.loginPass,security:o.security,serverUpdatedAt:Date.now()});let a=await M(e);Ar(a),w(`Active login profile: ${o.loginId}`)}async function Wd(){We=null,Bd(),Nn(!0,"Add Quick Login Profile"),w("Enter ID, password, and 3 security answers, then Save.")}async function Fd(t){let e=await I(),n=e?await M(e):null,i=Rn(n).find(o=>String(o.id)===String(t));i&&(We=i.id,Ec(i),Nn(!0,`Edit \u2014 ${i.loginId}`))}function Ud(){We=null,Nn(!1),w("Profile editor closed.")}async function zd(){let t=await I();if(!t){w("Open a logged-in schedule page so we can bind this to your account.");return}let e=await M(t)||{},{from:n,to:i}=qn(),o=Zt(),a=document.querySelector(h(r.aiLogin))?.value?.trim(),c=document.querySelector(h(r.aiPass))?.value,u=[0,1,2].map(x=>({q:document.querySelector(h([r.aiQ1,r.aiQ2,r.aiQ3][x]))?.value?.trim()||"",a:document.querySelector(h([r.aiA1,r.aiA2,r.aiA3][x]))?.value?.trim()||"",set:x+1}));if(!a||!c){w("Enter ID and password before saving.");return}if(u.some(x=>!x.q||!x.a)){w("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}let p="";try{let x=await B();p=String(x?.visa||"").trim()}catch{}let f=Rn(e),m=We||cr(),y={id:m,loginId:a,loginPass:c,security:u,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],visa:p},g=f.findIndex(x=>String(x.id)===String(m));g>=0?f[g]=y:f.push(y),await $t(t,{loginProfiles:f,activeLoginProfileId:m,loginId:a,loginPass:c,security:u});let b=await M(t)||{};await En(t,{...b,loginProfiles:f,activeLoginProfileId:m,loginId:a,loginPass:c,security:u,serverUpdatedAt:Date.now()}),We=null,Nn(!1),Ar(await M(t)),w(`Quick Login profile saved \u2014 Active: ${a}`)}function Kd(t){let e=t.target;if(!e||!e.closest)return;let n=e.closest("[data-edit-profile]");if(n){t.preventDefault(),Fd(n.getAttribute("data-edit-profile"));return}let i=e.closest("[data-activate-profile]");i&&(t.preventDefault(),Hd(i.getAttribute("data-activate-profile")))}function Dr(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==r.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==r.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===r.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function lr(){xn(),document.querySelector(h(r.aiPanel))?.remove(),document.querySelector(h(r.aiBtn))?.remove(),document.querySelector(h(r.hud))?.remove(),Vo(),Dr()}function jd(){if(A())return;if(!kt()){lr();return}if(document.querySelector(h(r.aiBtn)))if(!document.querySelector(h(r.aiSubmitSw))||!document.querySelector(h(r.aiTermsContinue))||!document.querySelector(h(r.aiFromBtn))||!document.querySelector(h(r.aiProfiles))||!document.querySelector(h(r.comCard)))lr();else return;let t=ts();if(!t)return;let e=document.createElement("button");e.id=r.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[P.mark]="",l.on(e,"click",o=>{o.preventDefault(),o.stopPropagation();let a=document.querySelector(h(r.aiPanel)),c=!a||a.classList.contains(s.hidden);!c&&Date.now()-Ni<800||$n(c)}),l.on(e,"pointerdown",o=>{o.stopPropagation()}),t.appendChild(e);let n=document.createElement("div");n.id=r.aiPanel,n.className=s.hidden,n.dataset[P.mark]="",n.innerHTML=`
    <div id="${r.aiTermsGate}">
      <div id="${r.aiTerms}" class="${s.aiTerms}">
        <div class="${s.aiHead}">Terms &amp; Conditions</div>
        <div class="${s.aiHint}">Please read carefully before continuing.</div>
        <ul class="${s.aiTermsList}">
          <li>Options apply to this applicant only. They do not bypass CAPTCHAs, waiting rooms, or portal security.</li>
          <li>During your windows, City Change hops every 15\u201318s. Max ${mt} windows, each up to ${ce} minutes.</li>
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
            <div class="${s.aiDateField}">From
              <button type="button" id="${r.aiFromBtn}" class="${s.aiDateBtn}">Select date</button>
              <input type="hidden" id="${r.aiFrom}" />
            </div>
            <div class="${s.aiDateField}">To
              <button type="button" id="${r.aiToBtn}" class="${s.aiDateBtn}">Select date</button>
              <input type="hidden" id="${r.aiTo}" />
            </div>
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
          <div id="${r.aiWinCard}">
            <div class="${s.aiHead}" style="font-size:16px;margin:0 0 2px">Release windows</div>
            <p id="${r.aiWinNote}" class="${s.aiHint}" style="margin:0 0 10px">IST each hour \xB7 max ${mt}</p>
            <div id="${r.aiWinList}"></div>
            <button type="button" id="${r.aiWinAdd}">+ Add timing</button>
            <button type="button" id="${r.aiWinSave}">Save timings</button>
            <button type="button" id="${r.aiWinReset}">Reset</button>
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
              <select id="${r.aiQ1}">${Sn(0)}</select>
            </label>
            <label>Your answer for set 1
              <input type="text" id="${r.aiA1}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${s.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 2 \u2014 choose 1 question
              <select id="${r.aiQ2}">${Sn(1)}</select>
            </label>
            <label>Your answer for set 2
              <input type="text" id="${r.aiA2}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${s.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 3 \u2014 choose 1 question
              <select id="${r.aiQ3}">${Sn(2)}</select>
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
      <div class="${s.aiSec}" style="padding:0;border:none;background:transparent">
        <div id="${r.comCard}">
          <div class="${s.comBrand}">Community</div>
          <div class="${s.comTitle}">Cities with dates</div>
          <div id="${r.comList}"></div>
          <div id="${r.comFoot}" class="${s.comFoot}">Shared by all users \xB7 refreshes live</div>
        </div>
      </div>
    </div>
    <div id="${r.authGate}">
      <div id="${r.authBody}"></div>
    </div>
    <div id="${r.aiStatus}" class="${s.aiHint}" style="margin-top:10px"></div>
  `,t.insertAdjacentElement("afterend",n),l.on(n.querySelector(h(r.aiSubmitSw)),"click",async()=>{let o=await I(),a=o?await M(o):null;await Pd(!Ht(a))}),l.on(n.querySelector(h(r.aiCitiesSw)),"click",async()=>{let o=await I(),a=o?await M(o):null;await Ed(!Bt(a))}),l.on(n.querySelector(h(r.aiWinAdd)),"click",Ld),l.on(n.querySelector(h(r.aiWinSave)),"click",qd),l.on(n.querySelector(h(r.aiWinReset)),"click",Od),l.on(n.querySelector(h(r.aiSaveLogin)),"click",zd),l.on(n.querySelector(h(r.aiLoginCancel)),"click",Ud),l.on(n.querySelector(h(r.aiAddProfile)),"click",Wd),l.on(n.querySelector(h(r.aiProfilesList)),"click",Kd),l.on(n.querySelector(h(r.aiClose)),"click",()=>$n(!1)),l.on(n,"pointerdown",o=>o.stopPropagation()),l.on(n.querySelector(h(r.aiCitiesAll)),"click",()=>{rc(!0),Xo()}),l.on(n.querySelector(h(r.aiCitiesNone)),"click",()=>{rc(!1),Xo()}),l.on(n.querySelector(h(r.aiCities)),"change",o=>{o.target&&o.target.type==="checkbox"&&Xo()}),l.on(n.querySelector(h(r.aiTermsAgree)),"change",()=>{Cd()}),l.on(n.querySelector(h(r.aiTermsContinue)),"click",()=>{Td()});let i=o=>a=>{a.preventDefault(),a.stopPropagation();let c=document.querySelector(h(r.aiCal)),u=c&&!c.classList.contains(s.hidden)&&lt.which===o;if(!(u&&Date.now()-hc<500)){if(u){he();return}rd(o,a.currentTarget)}};l.on(n.querySelector(h(r.aiFromBtn)),"click",i("from")),l.on(n.querySelector(h(r.aiToBtn)),"click",i("to")),sr(),Aa(()=>{I().then(o=>M(o).then(a=>ji(a)))}),Da(o=>{ge(),w(o||"Choose a plan to use Tik Tik."),$n(!0)}),Na(),ft()}function Gd(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",l.on(e,"click",()=>{I().then(n=>{In(n||null)})}))};t(document.querySelector("#submitbtn")),l.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function Pr(){if(!l.alive||A())return;if(!kt()){lr(),Vo(),xn();return}if(!await l.waitFor("#post_select",{attempts:Yn}))return;Es(e=>{let n=String(e?.message||e?.source||"error").slice(0,120);_n(n)}),jd(),Ki(),Gd(),Qs(()=>fd());let t=document.querySelector("#post_select");if(t?.value){let e=t.selectedOptions?.[0]?.textContent?.trim()||t.options?.[t.selectedIndex]?.textContent?.trim()||t.value;wn(String(t.value),e)}oc||(oc=!0,l.setTimeout(()=>ft(),800),l.setTimeout(async()=>{await xt()&&await Ui()},1500))}var Ic=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function Lc(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function Vd(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=Lc(t.data.url),i=new URLSearchParams(t.data.request||"").get("parameters");if(!i)return null;let o;try{o=JSON.parse(i)}catch{return null}return{params:o,tail:e,response:t.data.response}}async function Yd(t,e={}){t?.length&&(await bs(t,e),await T("audioAlert")&&rs())}async function Qd(t,e=!1){if(e||A())return null;let n=new Date;n.setHours(0,0,0,0);let i=(t||[]).map(c=>{if(!c)return null;let u=Vi(c.Date);return u?{...c,Date:u}:null}).filter(Boolean).filter(c=>{let[u,p,f]=c.Date.slice(0,10).split("-").map(Number);return!u||!p||!f?!1:new Date(u,p-1,f)>=n}).sort((c,u)=>String(c.Date).localeCompare(String(u.Date))),o=await je();if(o){let c=i.filter(f=>ye(f.Date,o.from,o.to));if(!c.length||!(o.submitArmed||!!await T("autoSelectFirstDate")))return null;let p=Ue(c.length);return c[p]?.Date||null}if(!await T("autoSelectFirstDate")||!i.length)return null;let a=Ue(i.length);return i[a]?.Date||null}async function Xd(t,e){if(!t||A()||ze())return;let n=e?`none in ${e.from} \u2192 ${e.to}`:"outside preferred range";O(`Dates found but ${n} \u2014 jumping calendar to ${t} (not booking)\u2026`);try{await l.waitFor(Hc,{attempts:80,interval:V})}catch{}l.send({action:"selectFirstDate",date:t,navigateOnly:!0,maxMs:4e3,pollMs:V})}function Vi(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,a,c]=n;return`${c}-${String(o).padStart(2,"0")}-${String(a).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime())){let a=o.getFullYear(),c=String(o.getMonth()+1).padStart(2,"0"),u=String(o.getDate()).padStart(2,"0");return`${a}-${c}-${u}`}}return null}function Jd(t){if(!t)return!1;let[e,n,i]=t.slice(0,10).split("-").map(Number);if(!e||!n||!i)return!1;let o=n-1,a=String(n).padStart(2,"0")+"/"+String(i).padStart(2,"0")+"/"+e,c=document.querySelector("#datepicker");if(c){let u=String(c.value||"").trim();if(u===a)return!0;if(u.includes(String(e))&&u.includes(String(i).padStart(2,"0"))){let p=u.split(/[/-]/).map(f=>parseInt(f,10));if(p.length>=3){let f,m,y;if(p[2]>31?(m=p[0],y=p[1],f=p[2]):(f=p[0],m=p[1],y=p[2]),f===e&&m===n&&y===i)return!0}}try{let p=window.jQuery||window.$;if(p&&p(c).hasClass("hasDatepicker")){let f=p(c).datepicker("getDate");if(f&&f.getFullYear()===e&&f.getMonth()===o&&f.getDate()===i)return!0}}catch{}}for(let u of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let p=u.querySelector("a");if(!p)continue;let f=parseInt(u.getAttribute("data-month"),10),m=parseInt(u.getAttribute("data-year"),10),y=parseInt(p.textContent,10);if(m===e&&f===o&&y===i)return!0}return!1}var Gi=null;function qc(t,e){Gi&&l.clear(Gi);let n=Date.now()+(e?Fe:8e3),i=()=>{!l.alive||Date.now()>n||Jd(t)||(l.send({action:"selectFirstDate",date:t,maxMs:e?Fe:8e3,pollMs:V}),Gi=l.setTimeout(i,V))};Gi=l.setTimeout(i,80)}function Oc(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Zd(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function Rc(t){return t?.length?t.map((e,n)=>({entry:e,index:n,avail:Zd(e)})).sort((e,n)=>n.avail!==e.avail?n.avail-e.avail:e.index-n.index):[]}function tf(t){let e=Rc(t);return e.length?{entry:e[0].entry,slotIndex:e[0].index}:{entry:null,slotIndex:0}}function Lr(){xe&&(l.clear(xe),xe=null)}var Ir=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),Yi=null,Qi=null,xe=null,Xi="";function ef(t,e){Yi=t,Qi=e?String(e).slice(0,10):null}var nf=8e3,Er=!1;async function Nc(t){if(Er||Ke())return!1;Er=!0;try{Lr(),Yi=null,Qi=null;let e=await pr(t);return e?(Xi=e,qc(e,!0),Bc(e,Dn),!0):(bt(),O("No time slots left on this city \u2014 next city in 15\u201318s\u2026"),!1)}finally{Er=!1}}function Bc(t,e=0){xe&&l.clear(xe);let n=t?String(t).slice(0,10):null,i=Date.now(),o=async()=>{if(!l.alive||ze()||it())return;if(Date.now()-i>=nf){let c=Qi===n?(Yi||[]).filter(p=>p&&p.Time):[],u=document.querySelector(Ir);if(!c.length&&!u){await Nc("No time slots");return}if(Date.now()-i>=2e4)return}let a=Qi===n?(Yi||[]).filter(c=>c&&c.Time):[];if(a.length){let{entry:c,slotIndex:u}=tf(a);if(O(`Watchdog: picking time slot #${u+1}\u2026`),await pn({time:Oc(c.Time),date:c.Date?String(c.Date).slice(0,10):n,slotIndex:u,pollMs:V,maxMs:600,prefix:d}),it())return}else if(document.querySelector(Ir)&&(O("Watchdog: picking visible time slot\u2026"),await pn({time:"00:00",date:n,slotIndex:e,pollMs:V,maxMs:600,prefix:d}),it()))return;xe=l.setTimeout(o,V)};xe=l.setTimeout(o,300)}var Hc=["#datepicker.hasDatepicker","#datepicker"].join(", ");async function of(t,e=!1){if(e)return null;let n=await je(),i=await xt(),o=await Qd(t,e),a=new Date;a.setHours(0,0,0,0);let c=(t||[]).map(f=>Vi(f?.Date)).filter(Boolean).filter(f=>{let[m,y,g]=f.slice(0,10).split("-").map(Number);return new Date(m,y-1,g)>=a}).sort((f,m)=>f.localeCompare(m));if(!o&&n&&c.length&&!c.filter(m=>ye(m,n.from,n.to)).length)return await Xd(c[0],n),null;if(!o)return null;let u=n?c.filter(f=>ye(f,n.from,n.to)):c,p=Ue(u.length);return O(`Selecting date #${p+1}: ${o} (fast)\u2026`),Hi(o),Xi=String(o).slice(0,10),await l.waitFor(Hc,{attempts:80,interval:V}),l.send({action:"selectFirstDate",date:o,maxMs:i||n?Fe:8e3,pollMs:V}),qc(o,i||n),Bc(o,Dn),o}async function rf(t,e=!1){if(e||A()||ze())return;let n=await xt(),i=await je();if(!n&&!i&&!await T("autoSelectFirstDate"))return;Lr();let o=(t||[]).filter(f=>!(!f||!f.Time||f.EntriesAvailable!=null&&Number(f.EntriesAvailable)<=0)),a=n||i;a&&(o=o.filter(f=>{let m=f.Date?String(f.Date).slice(0,10):null;return m?m>=a.from&&m<=a.to:!0}));let c=Rc(o);if(!c.length)return;let u=Date.now()+1e4;for(;Date.now()<u&&l.alive&&!(_s(o)||document.querySelector(Ir));)await new Promise(f=>l.setTimeout(f,V));let p=c.length===1?kn:mc;O(c.length===1?`1 time slot \u2014 try highest avail, wait \u2264${p/1e3}s for Submit\u2026`:`${c.length} time slots \u2014 try highest\u21922nd\u21923rd\u2026 (${p/1e3}s each for Submit)`);for(let f=0;f<c.length;f++){if(!l.alive||ze()||A())return;let{entry:m,index:y,avail:g}=c[f],b=Oc(m.Time),x=m.Date?String(m.Date).slice(0,10):null,$=f===0?"highest":f===1?"2nd-highest":f===2?"3rd-highest":`${f+1}th-highest`;if(O(`Trying ${$} avail (${g}) @ ${b} \u2014 slot ${f+1}/${c.length}\u2026`),!await pn({time:b,date:x,slotIndex:y,pollMs:V,maxMs:4e3,prefix:d})&&!it()){O(`Could not click ${b} \u2014 trying next\u2026`);continue}if(O(`Selected ${b} (${$}) \u2014 waiting \u2264${p/1e3}s for Submit to enable\u2026`),await kr(p)){O(`Submit enabled on ${b} \u2014 clicking\u2026`),n?await Cr(n.accountId):$r();return}f<c.length-1&&O(`Submit still disabled on ${b} \u2014 trying next (${f+2}/${c.length})\u2026`)}O(`Tried all ${c.length} time slot(s); Submit never enabled.`),n&&bt()}async function Wc(t){if(!G()||A())return;let e;try{e=Vd(t)}catch{return}if(e==null)return;if(Is(e),e.retryAfter!==void 0){let a=Number(e.retryAfter);_a(e.cgiBlock,a),a?(gi(a),yr(a)):T("defaultWaitTime").then(c=>{gi(c),yr(c)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let a=e.response.Posts||[],c=new Map((await Dt()).map(u=>[u.ID,u]));for(let u of a)c.set(u.ID,{...c.get(u.ID),...u});await ve([...c.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let a=e.response.Members||[];if(a.length){let c=await B()||{},u=c.name&&a.find(p=>p.FullName===c.name);c.visa=(u||a[0]).VisaClassName,await _({profile:c,members:a})}}if(Ic.includes(e.tail)){Ct(),ls(e);let a=(e.response.ScheduleDays||[]).map(x=>Vi(x?.Date)).filter(Boolean).sort(),c=a.length;if(c&&O(`${c} date${c===1?"":"s"} available \u2014 see list below`),c>0&&!e.response.HasError&&rt(),xc(),!e.response.HasError&&c>0){let x=String(e.params.postId||""),$=a[0],D=a[a.length-1];Fi(x,!0,""),O(`${c} date${c===1?"":"s"} \u2014 alerting others FAST\u2026`),Go({postId:x,postName:"",dayCount:c,dateFrom:$,dateTo:D,bestDate:$}).catch(()=>{})}else e.response.HasError||Fi(String(e.params.postId||""),!1,"");let u=await xt(),p=await je(),f=u||p;await be()||T("defaultWaitTime").then(x=>{gi(x)});let y=await Dt(),g=y.find(x=>x.ID===e.params.postId);if(g&&(g.Days=e.response.ScheduleDays,g.Updated=Date.now(),g.HasError=e.response.HasError,g.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,ve(y)),!e.response.HasError&&c>0){let x=String(e.params.postId||""),$=a[0],D=a[a.length-1],S=$,k=D,Q=c;if(f?.from&&f?.to){let et=a.filter(ho=>ye(ho,f.from,f.to));et.length&&(S=et[0],k=et[et.length-1],Q=et.length)}Go({postId:x,postName:g?.Name,dayCount:Q,dateFrom:S,dateTo:k,bestDate:S,rangeFrom:f?.from||null,rangeTo:f?.to||null}).catch(()=>{}),Fi(x,!0,g?.Name||"")}if(await Yd(e.response.ScheduleDays,{postId:e.params.postId,postName:g?.Name,hasError:e.response.HasError}),await xs(e.response.ScheduleDays,{postId:e.params.postId,postName:g?.Name,hasError:e.response.HasError}),Ke())rt(),O("Submit pending \u2014 staying on this city (date reload ignored)\u2026");else if(f&&!e.response.HasError){let x=Mn(e.response.ScheduleDays,f.from,f.to);x.length?(rt(),O(`${x.length} date${x.length===1?"":"s"} in range \u2014 selecting (city hold)\u2026`)):bt()}else f?bt():c>0&&!e.response.HasError&&(await T("autoSelectFirstDate")||bt());let b=Ke()?null:await of(e.response.ScheduleDays,e.response.HasError);if(b)rt(),await ws(g?.Name,b);else if(f&&!e.response.HasError&&!Ke()){let x=(e.response.ScheduleDays||[]).map(D=>Vi(D?.Date)).filter(Boolean).sort((D,S)=>D.localeCompare(S)),$=x.filter(D=>ye(D,f.from,f.to));x.length&&!$.length?(bt(),O(`Dates found but none in ${f.from} \u2192 ${f.to}. Jumped calendar (not booking). Next city in 15\u201318s\u2026`)):x.length||(bt(),O("No dates on this city \u2014 next city in 15\u201318s\u2026"))}await si()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let a=e.params.Date.split("T")[0];ef(e.response.ScheduleEntries,a),Lr();let c=await Dt(),u=c.filter(m=>m.Days&&m.Updated).sort((m,y)=>y.Updated-m.Updated).find(m=>m.Days.some(y=>y.Date===a));if(u){let m=u.Days.find(y=>y.Date===a);m&&(m.Times=e.response.ScheduleEntries,ve(c))}let p=(e.response.ScheduleEntries||[]).filter(m=>m&&m.Time);if(Xi&&a!==Xi){await si();return}let f=p.filter(m=>m.EntriesAvailable==null||Number(m.EntriesAvailable)>0);if(us(p,a,u?.Name),p.length){let m=f.reduce((g,b)=>{let x=Number(b.EntriesAvailable);return g+(Number.isFinite(x)?x:0)},0),y=m>0?` \xB7 ${m} available`:"";O(`${f.length||p.length} time slot${(f.length||p.length)===1?"":"s"} on ${a}${y}`)}await rf(e.response.ScheduleEntries,e.response.HasError),Ke()?(rt(),O("Submit pending \u2014 staying on this city (time reload ignored)\u2026")):f.length?(rt(),await Ss(u?.Name,e.params.Date,f.length)):await Nc("No time slots on this date"),await si()}}function Fc(t){if(!G()||A())return;let e=Lc(t.data.url);Ic.includes(e)&&ns()}var we=null,Or="",qr={scanning:"Scanning for Cloudflare challenge\u2026",dom:"Trying page-level verify click\u2026",debugger:"Advanced click \u2014 targeting Turnstile iframe\u2026",retry:"Waiting before next attempt\u2026",success:"Verification passed \u2014 continuing\u2026",manual:"Stuck? Click the checkbox once, then we\u2019ll continue."};function Uc(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=s.cfFlash,n.dataset[P.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),l.setTimeout(()=>n.remove(),1200)}}function af(){let t=document.querySelector(h(r.cfHud));return t||(t=document.createElement("div"),t.id=r.cfHud,t.dataset[P.mark]="",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.innerHTML=`
    <div class="${s.cfHud}">
      <div class="${s.cfPulse}" aria-hidden="true"></div>
      <div class="cf-hud-body">
        <div class="cf-hud-brand">
          <span class="cf-hud-icon" aria-hidden="true">\u{1F6E1}</span>
          <span class="cf-hud-title">Visa Slot 6 Shield</span>
          <span class="cf-hud-chip" data-cf-chip>Active</span>
        </div>
        <div class="cf-hud-msg" data-cf-msg>${qr.scanning}</div>
        <div class="cf-hud-sub" data-cf-sub>Auto Cloudflare handler</div>
      </div>
    </div>
  `,document.documentElement.appendChild(t),t)}async function j(t,e){if(!chrome.runtime?.id||!l.alive||!await T("autoCloudflareTick"))return;let n=af(),i=n.querySelector("[data-cf-msg]"),o=n.querySelector("[data-cf-sub]"),a=n.querySelector("[data-cf-chip]"),c=n.querySelector(`.${s.cfHud}`);Or=t,i&&(i.textContent=qr[t]||qr.scanning),o&&(o.textContent=e||sf(t)),a&&(a.textContent=t==="success"?"Done":t==="manual"?"Help":"Active",a.dataset.state=t),c&&(c.dataset.state=t),we&&(l.clear(we),we=null),t==="success"&&(we=l.setTimeout(()=>Rr(),2800))}function sf(t){return t==="debugger"?"Precision click via advanced browser bridge":t==="dom"?"Standard page interaction":t==="manual"?"One manual click is usually enough":t==="success"?"Resuming login and recovery":"Monitoring this tab for Turnstile"}function Rr(){let t=document.querySelector(h(r.cfHud));t&&t.remove(),Or="",we&&(l.clear(we),we=null)}function Nr(){return Or}var cf=/we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i,lf=/\bUSG\s+[a-f0-9-]{8,}/i;var Hr="vsPortalErrorReloadCount",jc="vsPortalErrorReloadAt",uf=2e3,df=1e4,zc=!1,Ge=null,ff=null;function pf(){return(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim()}function Ve(){let t=pf().slice(0,6e3);return t?!!(/a timeout occurred/i.test(t)&&(/error\s*524/i.test(t)||/origin web server timed out/i.test(t)||/cloudflare ray id/i.test(t))||/error\s*524/i.test(t)&&/cloudflare/i.test(t)&&t.length<8e3||cf.test(t)&&(lf.test(t)||/error id\s*#/i.test(t))||/we'?re sorry,\s*but something went wrong/i.test(t)&&t.length<2500):!1}function Gc(){try{return Math.max(0,Number(sessionStorage.getItem(Hr)||0))}catch{return 0}}function mf(){try{let t=Gc()+1;return sessionStorage.setItem(Hr,String(t)),sessionStorage.setItem(jc,String(Date.now())),t}catch{return 1}}function Br(){try{sessionStorage.removeItem(Hr),sessionStorage.removeItem(jc)}catch{}}function hf(t){return Math.min(df,uf+Math.max(0,t-1)*1e3)}function gf(){Ge&&(l.clear(Ge),Ge=null)}function yf(){mf();try{location.reload()}catch{}}function Kc(){if(!l.alive||Ge)return;if(!Ve()){Br();return}let t=Gc()+1,e=hf(t);Ge=l.setTimeout(()=>{if(Ge=null,!!l.alive){if(!Ve()){Br();return}yf()}},e)}function Vc(){if(zc)return;zc=!0;let t=()=>{l.alive&&(Ve()?Kc():(Br(),gf()))};t(),ff=l.setInterval(t,1500);try{let e=new MutationObserver(()=>{l.alive&&Ve()&&Kc()});e.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),l.disposable(()=>e.disconnect())}catch{}}var Ji="vsDebugLogs",bf=200;function xf(){try{return new Date().toLocaleTimeString("en-IN",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})}catch{return new Date().toISOString().slice(11,19)}}async function z(t,e,n){let i={at:Date.now(),t:xf(),tag:String(t||"app").slice(0,24),msg:String(e||"").slice(0,400)};if(n!=null)try{i.data=JSON.parse(JSON.stringify(n))}catch{i.data=String(n).slice(0,200)}try{console.log(`[VS6 ${i.tag}] ${i.msg}`,n!==void 0?n:"")}catch{}try{let o=await C({[Ji]:[]}),a=Array.isArray(o[Ji])?o[Ji].slice():[];for(a.push(i);a.length>bf;)a.shift();await _({[Ji]:a})}catch{}}var Ye="homeVerifyPendingAt",to=null,Hn=0,Bn=null,Ft=0,Yc=0,wf=25e3;function Qc(){try{return document.visibilityState==="hidden"||document.hidden===!0}catch{return!1}}function Xc(){if(Zc()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||/visa application home/i.test(document.title||"")||!!document.querySelector(".username, #appointment-card")||!!N()&&!/\/(schedule|ofc-schedule|c-schedule)\b/i.test(t)}async function Qe(){try{if(!Xc())return;N()&&!Y()?await _({[Ye]:Date.now()}):(await C(Ye))[Ye]&&await _({[Ye]:0})}catch{}}async function no(){try{if(N()&&!Y()&&Xc())return!0;let t=await C(Ye),e=Number(t[Ye])||0;return!(!e||Date.now()-e>30*6e4)}catch{return!1}}async function Sf(){try{let t=await C(["humanClickProfile","humanClickServerProfile"]),e=t.humanClickProfile?.samples?.length||0,n=t.humanClickServerProfile?.samples?.length||0;return e+n>=1?400:4e3}catch{return 800}}var Fr=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function Y(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!N()&&!Nr()}function N(){if(Ve()||document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return Fr.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:eo().length>0}function Zi(t){return new Promise(e=>setTimeout(e,t))}function vf(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let i of n.querySelectorAll("*"))i.shadowRoot&&(t.push(i.shadowRoot),e.push(i.shadowRoot))}return t}function eo(){let t=[],e=new Set,n=i=>{if(!i||e.has(i))return;let o=i.getBoundingClientRect();if(o.width<40||o.height<20||o.width>900||o.height>400)return;let a=(i.src||i.getAttribute?.("src")||"").toLowerCase(),c=(i.title||i.getAttribute?.("title")||"").toLowerCase(),u=(i.className?.toString?.()||"").toLowerCase(),p=(i.id||"").toLowerCase(),f=i.tagName==="IFRAME"&&(a.includes("challenges.cloudflare")||a.includes("turnstile")||c.includes("cloudflare")||c.includes("security challenge")),m=u.includes("cf-turnstile")||u.includes("turnstile")||p.includes("turnstile")||p.includes("challenge")||i.hasAttribute?.("data-sitekey")||i.hasAttribute?.("data-turnstile-widget");if(!f&&!m){let y=i.tagName==="IFRAME"&&o.width>=180&&o.width<=460&&o.height>=40&&o.height<=160,g=Fr.test(`${document.title||""} ${document.body?.innerText||""}`.slice(0,4e3));if(!y||!g)return}e.add(i),t.push({el:i,rect:o})};for(let i of vf()){for(let o of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let a of i.querySelectorAll(o))n(a);for(let o of i.querySelectorAll("iframe"))n(o)}return t}function $f(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function kf(){let t=[],e=document.querySelectorAll("label, span, div, p, button");for(let n of e){if(t.length>=2)break;let i=(n.innerText||n.textContent||"").replace(/\s+/g," ").trim();if(!/verify you are human/i.test(i)||i.length>48)continue;let o=n.getBoundingClientRect();o.width<16||o.height<10||o.bottom<0||o.top>window.innerHeight||t.push({x:Math.round(o.left+Math.min(22,Math.max(12,o.width*.12))),y:Math.round(o.top+o.height/2)})}return t}function Jc(t){let e=[],n=new Set,i=(o,a)=>{if(!Number.isFinite(o)||!Number.isFinite(a)||o<1||a<1||o>window.innerWidth-1||a>window.innerHeight-1)return;let c=`${Math.round(o)},${Math.round(a)}`;n.has(c)||(n.add(c),e.push({x:Math.round(o),y:Math.round(a)}))};for(let{rect:o}of t){let a=o.top+o.height/2,c=o.left+Math.min(28,Math.max(18,o.width*.11));for(let u of[0,-4,4,-8,8,12,16,20,24,28,32])for(let p of[0,-3,3,-6,6])i(c+u,a+p);i(o.left+o.width*.5,a)}return e}function Cf(t){for(let{el:e,rect:n}of t)try{e.click();let i=n.left+Math.min(26,n.width*.12),o=n.top+n.height/2,a=document.elementFromPoint(i,o)||e;for(let c of["pointerdown","mousedown","mouseup","pointerup","click"])a.dispatchEvent(new MouseEvent(c,{bubbles:!0,cancelable:!0,clientX:i,clientY:o,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let i=n.getBoundingClientRect();if(i.width<4&&i.height<4)continue;let o=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!o.includes("human")&&!o.includes("verify")&&e==="input[type='checkbox']"){let a=n.closest("label, div, form");if(!Fr.test(a?.textContent||""))continue}return n.click(),!0}return!1}async function Wr(t){t.length&&(Uc(t.slice(0,3)),l.send({action:"viewportClickPoints",points:t}))}function Zc(){return/\/(schedule|ofc-schedule|c-schedule)\b/i.test(location.pathname||"")}function Tf(){if(Zc()||document.querySelector("#post_select")||!N()||Y())return;let t=location.pathname||"";if(!(/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||/visa application home/i.test(document.title||"")||!!document.querySelector(".username, #appointment-card")))return;let n=Date.now();if(!(n-Yc<wf)){Yc=n,z("cf","verify-human on Home \u2014 focusing this tab"),j("manual","Verify you are human is on Home \u2014 switching you to that tab\u2026").catch(()=>{});try{l.send({action:"focusSenderTabForVerify"})}catch{}}}async function Ur(){if(!await T("autoCloudflareTick"))return!1;if(await Qe(),Y())return Ft&&z("cf","challenge already solved"),Ft=0,await j("success"),!0;if(Qc())return await Qe(),await j("manual","Verify you are human on Home (background) \u2014 open that tab and click once."),!1;Ft||(Ft=Date.now(),z("cf","challenge seen \u2014 train window started"));let t=await Sf();if(Date.now()-Ft<t)return await j("scanning","Verify you are human \u2014 clicking in a moment\u2026"),!1;await j("scanning","Verify you are human page \u2014 preparing click\u2026");let e=eo();$f(e),await Zi(250),e=eo();let n=Jc(e);return z("cf","train window done \u2014 attempting auto click",{widgets:e.length,points:n.length}),n.length||z("cf","no checkbox points \u2014 widget not found on this page"),n.length&&(await Wr(n),await Zi(1200),Y()||!N())?(Ft=0,await j("success"),!0):(await j("dom"),Cf(e),await Zi(600),Y()||!N()?(Ft=0,await j("success"),!0):n.length&&(await Wr(n),await Zi(1e3),Y()||!N())?(Ft=0,await j("success"),!0):(Hn++,Hn>=8?await j("manual","Click the checkbox once \u2014 we will continue after."):await j("retry",`Retry ${Hn}/8\u2026`),!1))}function _f(){Bn||(Bn=new MutationObserver(()=>{l.alive&&N()&&!Y()&&Ur()}),Bn.observe(document.documentElement,{childList:!0,subtree:!0}),l.disposable(()=>{Bn?.disconnect(),Bn=null}))}function zr(){to&&(l.clear(to),to=null),Hn=0,Ft=0,Rr()}async function Kr(){zr(),_f();let t=async()=>{if(!l.alive||(N()&&!Y()?(await Qe(),Tf()):await Qe(),Qc()))return;let e=eo(),n=[...kf(),...Jc(e)].slice(0,3);if(!n.length){Nr()&&(Hn=0,await j("success"));return}z("cf","verify widget found \u2014 clicking",{widgets:e.length,points:n}),await j("scanning","Clicking Verify you are human\u2026"),await Wr(n)};t(),to=l.setInterval(t,1800)}var Xe="sessionRecovery",jr="homeKeepaliveAt",Gr="homeLoadingStuckAt",Qr="vsResubmitContinue",tl=2e3,oo=!1,el=null,Vr=null,Yr=null,io=null,Wn=0;function Zr(){try{if(N()&&!Y())return Qe().catch(()=>{}),!1}catch{}try{let t=new URL(location.href),e=new URL(t.origin+t.pathname);return e.searchParams.set("_vsr",String(Date.now()%1e12)),location.replace(e.pathname+e.search+e.hash),!0}catch{try{return location.href=location.pathname+"?_vsr="+String(Date.now()%1e12),!0}catch{return!1}}}function al(){try{if(sessionStorage.getItem(Qr)!=="1")return!1;sessionStorage.removeItem(Qr)}catch{return!1}return _t()||document.querySelector("#post_select")?!1:(Zr(),!0)}function nl(){return v.homeKeepaliveMinMs}function Mf(){return v.homeKeepaliveMaxMs}function Af(){return v.homeKeepaliveDebounceMs}function il(){return v.loadingStuckMs}function Df(){return v.loadingStuckDebounceMs}function ol(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function Pf(t,e){let n=ol(t);if(!n)return"";let i="",o=0;for(let a of e||[]){let c=ol(a.q);if(!c||!a.a)continue;if(n.includes(c)||c.includes(n))return a.a;let u=c.split(" ").filter(m=>m.length>3),p=0;for(let m of u)n.includes(m)&&p++;let f=u.length?p/u.length:0;f>o&&f>=.5&&(o=f,i=a.a)}return i}async function Ef(){let t=await C([Qt,"profile"]),e=t[Qt]||{},n=t.profile?.id?String(t.profile.id):null,i=n?e[n]:null;return i||(i=Object.values(e).find(o=>o?.loginId&&o?.loginPass)||null),i||{}}function rl(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,i=Object.getOwnPropertyDescriptor(n,"value")?.set;i?i.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function ne(t){return new Promise(e=>setTimeout(e,t))}function Tt(t,e){return t+Math.random()*(e-t)}async function Xr(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await ne(Tt(250,600)),rl(t,"");let i="";for(let o=0;o<n.length;o++){let a=n[o];i+=a,rl(t,i),t.dispatchEvent(new KeyboardEvent("keydown",{key:a,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:a,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:a,bubbles:!0}));let c=Tt(90,220);/[\s@._]/.test(a)&&(c+=Tt(120,320)),Math.random()<.08&&(c+=Tt(200,450)),await ne(c)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await ne(Tt(200,500))}var ro=!1,ao=!1;function so(t){return!t||t.disabled?!1:(t.click(),!0)}function If(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let i of t){let o=(i.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(o))continue;let a=i.querySelector("input[type='checkbox']")||document.getElementById(i.getAttribute("for")||"");a&&!a.checked&&(so(a),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(i=>/^(continue|ok|accept|agree)$/i.test((i.textContent||i.value||"").trim()));return e&&n&&so(n),e>0}function sl(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function Lf(t){if(ro)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;ro=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await Xr(e,t.loginId),await ne(Tt(400,900))),n&&t.loginPass&&!n.value&&(await Xr(n,t.loginPass),await ne(Tt(500,1100)));let i=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(o=>/sign in|log in|continue/i.test(o.textContent||o.value||""));return i&&(n?.value||t.loginPass)?(await ne(Tt(600,1400)),so(i),!0):!!(e||n)}finally{ro=!1}}async function qf(t){if(ao)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let o of n){let a=(o.textContent||"").trim();if(a.length<12||a.length>220||!/\?/.test(a)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(a))continue;let c=o.querySelector("input[type='text']")||document.getElementById(o.getAttribute("for")||"")||o.parentElement?.querySelector("input[type='text']");c&&c.offsetParent!==null&&e.push({text:a,input:c})}for(let o of["kba1_response","kba2_response","kba3_response"]){let a=document.getElementById(o);if(!a)continue;let u=(a.closest(".form-group, .entry, li, div")||a.parentElement)?.textContent||"";e.some(p=>p.input===a)||e.push({text:u,input:a})}let i=[];for(let{text:o,input:a}of e){if(a.value)continue;let c=Pf(o,t.security);c&&i.push({input:a,ans:c})}if(!i.length)return!1;ao=!0;try{for(let{input:a,ans:c}of i)await Xr(a,c),await ne(Tt(350,800));await ne(Tt(600,1400));let o=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(a=>/continue|submit|verify/i.test(a.textContent||a.value||""));return o&&so(o),!0}finally{ao=!1}}function cl(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||N()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function _t(){return Pn()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function Of(t=""){return/\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(t||""))}function Jr(){if(_t()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||N()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}function Rf(t){return!!(t?.loginId&&t?.loginPass)}function Nf(){return cl()?!1:!!(sl()||document.querySelector("#kba1_response, #kba2_response, #kba3_response")||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))}async function Bf(){let t=(await C(Xe))[Xe],e=!!t?.active,n=await Ef();if(N()){await Ur();return}if(If(),cl()){e&&(await _({[Xe]:{...t,active:!1,doneAt:Date.now()}}),l.send({action:"recoveryReturnToOfc"}));return}Nf()&&Rf(n)&&await T("autofillLogin")&&(await qf(n)||(sl()||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))&&await Lf(n))}function ll(){if(!Jr()||el)return;let t=async()=>{l.alive&&await Bf()};t(),el=l.setInterval(t,1200)}function ul(){return nl()+Math.random()*(Mf()-nl())}async function dl(){try{if(await no())return!1;let t=await C(jr),e=Number(t[jr])||0;return Date.now()-e<Af()?!1:(await _({[jr]:Date.now()}),!0)}catch{return!0}}function fl(){if(_t()||!Jr()||document.querySelector("#post_select")||Vr)return;let t=()=>{l.alive&&(Vr=l.setTimeout(async()=>{if(Vr=null,!l.alive||_t()||Of(location.href)||document.querySelector("#post_select")||!Jr())return;if(ro||ao||oo){t();return}if((await C(Xe))[Xe]?.active){t();return}if(await no()){t();return}if(!await dl()){t();return}try{Zr()}catch{t()}},ul()))};t()}function pl(){if(!_t()||Yr)return;let t=()=>{l.alive&&(Yr=l.setTimeout(async()=>{if(Yr=null,!(!l.alive||!_t())){if(await dl())try{l.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}t()}},ul()))};t()}async function Hf(){try{let t=await C(Gr),e=Number(t[Gr])||0;return Date.now()-e<Df()?!1:(await _({[Gr]:Date.now()}),!0)}catch{return!0}}function ml(){if(!_t()||io)return;let t=async()=>{if(io=null,!(!l.alive||!_t())){try{if(hr()){if(Wn||(Wn=Date.now()),Date.now()-Wn>=il()){if(!await no()&&await Hf()){try{O(`Date Loading stuck \u2265${il()/1e3}s \u2014 reloading Application Home\u2026`)}catch{}try{l.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}}Wn=Date.now()}}else Wn=0}catch{}l.alive&&_t()&&(io=l.setTimeout(t,tl))}};io=l.setTimeout(t,tl)}async function hl(t){let e=String(t||"");if(/form resubmission|information that you entered|action that you took to be repeated|returning to that page might cause/i.test(e)){if(!_t()&&!document.querySelector("#post_select")){try{sessionStorage.setItem(Qr,"1")}catch{}l.setTimeout(()=>Zr(),300)}return}if(!/PSE0501|unable to load appointment available days/i.test(e)||oo)return;oo=!0,l.setTimeout(()=>{oo=!1},8e3);let n=await I();await _({[Xe]:{active:!0,ofcUrl:location.href,accountId:n,startedAt:Date.now()}}),l.send({action:"recoveryStart",ofcUrl:location.href})}var lo="humanClickProfile",ea=150,oa=120,Wf=250,gl=!1,At=[],co=0,pt=0,ie=0,F=null,na=0,Un=!1,Je=null,uo=0,po=0,zn=[],Mt=!1,Se=!1;function Ff(){let t=[];for(let e of document.querySelectorAll('iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]')){let n=e.getBoundingClientRect();n.width<40||n.height<20||n.width>900||n.height>400||t.push(n)}if(!t.length&&N())for(let e of document.querySelectorAll("iframe")){let n=e.getBoundingClientRect();n.width>=120&&n.width<=420&&n.height>=45&&n.height<=120&&t.push(n)}return t}function Kn(){let t=Ff();if(!t.length)return null;let e=t[0];return{x:e.left+Math.min(28,Math.max(18,e.width*.11)),y:e.top+e.height/2,w:e.width,h:e.height,left:e.left,top:e.top}}function Ze(t,e,n){return n?t>=n.left-40&&t<=n.left+n.w+40&&e>=n.top-30&&e<=n.top+n.h+30:!1}function wl(t){let e=performance.now();co||(co=e);let n=F,i=n?(t.clientX-n.x)/Math.max(24,n.w*.12):0,o=n?(t.clientY-n.y)/Math.max(20,n.h*.5):0;At.push({nx:Math.round(i*1e3)/1e3,ny:Math.round(o*1e3)/1e3,x:Math.round(t.clientX),y:Math.round(t.clientY),t:Math.round(e-co)}),At.length>oa&&At.shift()}async function mo(){return(await C(lo))[lo]||{version:2,maxSamples:ea,samples:[],avgHoverMs:420,avgPressMs:70,avgApproachMs:800,liveTrained:!1}}function ta(t,e,n){if(!t.length)return n;let i=t.reduce((o,a)=>o+(Number(a[e])||0),0);return Math.round(i/t.length)}async function Sl(t,{force:e=!1}={}){let n=Date.now();if(!e&&n-na<Wf)return null;na=n;let i=await mo(),o=Array.isArray(i.samples)?i.samples.slice():[];for(t.clientId||(t.clientId=`hc-${t.at||n}-${Math.random().toString(36).slice(2,10)}`),t.uploaded=!1,o.push(t);o.length>ea;)o.shift();let a={version:2,maxSamples:ea,samples:o,avgHoverMs:ta(o,"hoverMs",420),avgPressMs:ta(o,"pressMs",70),avgApproachMs:ta(o,"approachMs",800),updatedAt:n,liveTrained:!0,source:"visa-page-live"};return await _({[lo]:a}),uo=o.length,z("human",`saved sample locally #${o.length}`,{capture:t.capture||"page",pressMs:t.pressMs,hoverMs:t.hoverMs,pathPts:Array.isArray(t.path)?t.path.length:0,clientId:t.clientId}),vl(t,a).catch(()=>{}),$l().catch(()=>{}),a}async function Uf(t){if(!t)return;let e=await mo(),n=Array.isArray(e.samples)?e.samples.slice():[],i=!1;for(let o of n)o?.clientId===t&&!o.uploaded&&(o.uploaded=!0,i=!0);i&&await _({[lo]:{...e,samples:n,updatedAt:Date.now()}})}async function vl(t,e){try{if(!await T("serverSync"))return z("upload","skipped \u2014 serverSync is OFF"),!1;let n=await B()||{},i=t.clientId||`hc-${t.at||Date.now()}-${Math.random().toString(36).slice(2,8)}`;t.clientId=i;let o={client_id:i,profile:{id:n.id||"",email:n.email||"",name:n.name||"",visa:n.visa||""},sample:t,profile_meta:{sampleCount:e?.samples?.length||0,avgHoverMs:e?.avgHoverMs,avgPressMs:e?.avgPressMs,avgApproachMs:e?.avgApproachMs,liveTrained:!0,source:"visa-page-live",extensionHost:location.host}};z("upload",`sending sample ${i}`,{sampleCount:e?.samples?.length||0,email:n.email||""}),l.send({action:"uploadHumanClickSample",payload:o});try{chrome.runtime.sendMessage({action:"uploadHumanClickSample",payload:o},a=>{if(chrome.runtime.lastError){z("upload",`SW error: ${chrome.runtime.lastError.message}`);return}a?.success?(z("upload",`server OK id=${a.id??"?"} status=${a.status??""}`,{clientId:i}),Uf(i)):z("upload",`server FAIL ${a?.error||a?.status||"unknown"}`,{clientId:i})})}catch(a){z("upload",`sendMessage threw: ${a?.message||a}`)}return!0}catch(n){return z("upload",`upload threw: ${n?.message||n}`),!1}}async function $l(){try{if(!await T("serverSync"))return;let t=await mo(),n=(Array.isArray(t.samples)?t.samples:[]).filter(i=>i&&i.uploaded!==!0).slice(-40);for(let i of n)await vl(i,t),await new Promise(o=>setTimeout(o,80))}catch{}}function kl(t,e={}){let n=performance.now(),i=Math.max(25,Math.min(500,pt?n-pt:70)),o=Math.max(30,Math.min(3e3,pt?pt-(ie||pt):200)),a=(At.length?At:zn).slice(-oa),c=a.length?a[a.length-1].t:o,u=Math.max(o,Math.min(12e3,c||o)),p=Je,f=F||Kn();return{hoverMs:Math.round(o),pressMs:Math.round(i),approachMs:Math.round(u),path:a,down:p?{x:Math.round(p.x),y:Math.round(p.y)}:null,up:t?{x:Math.round(t.clientX),y:Math.round(t.clientY)}:p?{x:Math.round(p.x),y:Math.round(p.y)}:f?{x:Math.round(f.x),y:Math.round(f.y)}:null,target:f?{x:Math.round(f.x),y:Math.round(f.y),w:Math.round(f.w),h:Math.round(f.h),left:Math.round(f.left),top:Math.round(f.top)}:null,viewport:{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio||1,scrollX:Math.round(window.scrollX||0),scrollY:Math.round(window.scrollY||0)},pointerType:t?.pointerType||"mouse",url:location.pathname+location.search,at:Date.now(),...e}}function Fn(){At.length&&(zn=At.slice(-oa)),At=[],co=0,pt=0,ie=0,Je=null}function ra(){Un||(Un=!0,Se=!0,Fn(),F=Kn())}function ia(){Un=!1,F=null,Mt=!1,Fn()}function fo(t){let e=t?.target;if(!e)return!1;if(e.closest?.(".cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]"))return!0;if(e.tagName==="IFRAME"){let n=(e.src||"").toLowerCase();if(n.includes("challenges.cloudflare")||n.includes("turnstile"))return!0;let i=e.getBoundingClientRect();if(i.width>=120&&i.width<=420&&i.height>=45&&i.height<=120)return!0}return!1}async function yl(t){if(l.alive){if(!N()||Y()){Un&&ia();return}ra(),F||(F=Kn()),!ie&&F&&Ze(t.clientX,t.clientY,F)&&(ie=performance.now()),F&&Ze(t.clientX,t.clientY,F)&&(po=Date.now()),wl(t)}}async function bl(t){if(!(!l.alive||t.button!==0)&&!(!N()||Y())){ra(),F=Kn(),pt=performance.now(),ie||(ie=pt),Je={x:t.clientX,y:t.clientY},wl(t),(fo(t)||F&&Ze(t.clientX,t.clientY,F))&&(Mt=!0,po=Date.now()),z("human","pointer down during challenge",{onWidget:fo(t),near:!!(!F||Ze(t.clientX,t.clientY,F)),x:Math.round(t.clientX),y:Math.round(t.clientY)});try{j("scanning",`Recording click\u2026 (saved ${uo} so far)`)}catch{}}}async function xl(t){if(!l.alive||t.button!==0||!pt&&!Mt)return;if(!N()&&!Y()){Fn();return}if(!(F&&Ze(t.clientX,t.clientY,F)||F&&Je&&Ze(Je.x,Je.y,F)||fo(t)||Mt||!F&&(At.length>=2||zn.length>=2))&&At.length<2&&zn.length<2){Fn();return}let n=kl(t,{capture:Mt||fo(t)?"iframe-or-widget":"page"});Mt=!1,Fn();let i=await Sl(n);if(!i)return;let o=i.samples?.length||0;try{j("success",`Saved verify-human click #${o} \u2014 uploaded to server`)}catch{}}async function zf(){let t=Date.now();if(!Se||!Y()&&N())return;if(!(Mt||t-po<8e3||zn.length>=2&&t-na>500)){Se=!1,ia();return}let n=kl(null,{capture:"challenge-solved"});Mt=!1,Se=!1,ia();let i=await Sl(n,{force:!0});if(!i)return;let o=i.samples?.length||0;try{j("success",`Saved verify-human click #${o} (after checkbox) \u2014 uploaded to server`)}catch{}}async function Kf(){try{let t=await mo(),e=t.liveTrained&&t.samples?.length||0;return uo=e,e}catch{return uo}}function Cl(){if(gl)return;gl=!0,z("human","train watcher started",{path:location.pathname}),l.on(window,"pointermove",yl,{passive:!0,capture:!0}),l.on(window,"pointerdown",bl,{passive:!0,capture:!0}),l.on(window,"pointerup",xl,{passive:!0,capture:!0}),l.on(window,"mousemove",yl,{passive:!0,capture:!0}),l.on(window,"mousedown",bl,{passive:!0,capture:!0}),l.on(window,"mouseup",xl,{passive:!0,capture:!0}),l.on(window,"blur",()=>{!N()||Y()||(Mt=!0,po=Date.now(),pt||(pt=performance.now(),ie||(ie=pt)),z("human","page blur during challenge (likely iframe click)"))});let t=async()=>{if(!l.alive)return;if(N()&&!Y()){Se||z("human","challenge detected \u2014 recording armed"),Se=!0,ra(),F||(F=Kn());let n=await Kf();try{j("scanning",n?`Train mode \u2014 click Verify you are human naturally (saved ${n})`:"Train mode \u2014 move mouse naturally, then click Verify you are human (recording\u2026)")}catch{}return}(Se||Un||Mt)&&await zf()};t(),l.setInterval(t,1200),l.setTimeout(()=>{z("upload","flushing unsynced local samples\u2026"),$l().catch(()=>{})},2500)}var jf=`
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
#${r.aiPanel} label,
#${r.aiPanel} .${s.aiDateField} {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14.5px;
  font-weight: 600;
  color: #374151;
  flex: 1 1 140px;
  min-width: 0;
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
#${r.aiLoginToggle} { background: #eef0f3; color: #111827; }

/* Sample A \u2014 Release windows */
#${r.aiWinCard} {
  margin-top: 14px;
  padding: 14px 14px 12px;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 14px;
  box-sizing: border-box;
}
#${r.aiWinList} {
  display: grid;
  gap: 8px;
  margin: 0 0 10px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
}
#${r.aiPanel} .${s.aiWinRow} {
  display: grid;
  gap: 4px;
  padding: 12px 12px 10px;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
}
#${r.aiPanel} .${s.aiWinRow}:last-child {
  padding-bottom: 10px;
}
#${r.aiPanel} .${s.aiInline} {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
#${r.aiPanel} .${s.aiInline} select {
  width: auto;
  min-width: 88px;
  flex: 0 0 auto;
  font-size: 15px;
  font-weight: 600;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  background: #fff;
  color: #0f172a;
  min-height: 40px;
  padding: 6px 10px;
}
#${r.aiPanel} .${s.aiInline} .${s.aiHead} {
  margin: 0;
  flex-direction: row;
  font-size: 13.5px;
  color: #334155;
  font-weight: 600;
}
#${r.aiPanel} .${s.aiWinHelp} {
  font-size: 12.5px;
  color: #64748b;
  margin-left: 2px;
}
#${r.aiPanel} .${s.aiTrash} {
  margin-left: auto;
  padding: 7px;
  background: transparent;
  color: #ef4444;
  border: none;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
#${r.aiPanel} .${s.aiTrash}:hover { background: #fef2f2; }
#${r.aiWinNote} { margin: 0 0 10px; font-size: 13px; color: #64748b; }
#${r.aiWinAdd} {
  width: 100%;
  margin: 0 0 8px;
  padding: 11px 14px;
  background: #fff;
  color: #0f172a;
  border: 1.5px solid #cbd5e1;
  border-radius: 12px;
  font-size: 14.5px;
  font-weight: 700;
  cursor: pointer;
  box-sizing: border-box;
}
#${r.aiWinAdd}:hover:not(:disabled) {
  border-color: #94a3b8;
  background: #f8fafc;
}
#${r.aiWinAdd}:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  color: #64748b;
}
#${r.aiWinSave} {
  width: 100%;
  margin: 0 0 8px;
  padding: 12px 14px;
  background: #0f172a;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 14.5px;
  font-weight: 700;
  cursor: pointer;
  box-sizing: border-box;
}
#${r.aiWinSave}:hover { background: #1e293b; }
#${r.aiWinReset} {
  width: 100%;
  padding: 10px 14px;
  background: #f1f5f9;
  color: #334155;
  border: none;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  box-sizing: border-box;
}
#${r.aiWinReset}:hover { background: #e2e8f0; }

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
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1px;
  line-height: 1.15;
}
#${r.authBody} .${s.authPlanWas} {
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
  text-decoration: line-through;
}
#${r.authBody} .${s.authPlanOffer} {
  font-size: 16px;
  font-weight: 800;
  color: #0f172a;
}

/* Sample 10 \u2014 Community slots (white theme) */
#${r.comCard} {
  margin: 0;
  padding: 14px 14px 12px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  box-sizing: border-box;
}
#${r.comCard} .${s.comBrand} {
  margin: 0 0 2px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #94a3b8;
}
#${r.comCard} .${s.comTitle} {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
}
#${r.comList} {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
#${r.comCard} .${s.comRow} {
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
}
#${r.comCard} .${s.comRow}.${s.comOpen} {
  border-color: #cbd5e1;
}
#${r.comCard} .${s.comMain} {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  padding: 12px 12px;
  background: #fff;
  border: 0;
  cursor: pointer;
  color: #0f172a;
  font: inherit;
}
#${r.comCard} .${s.comMain}:hover {
  background: #f8fafc;
}
#${r.comCard} .${s.comChevron} {
  flex-shrink: 0;
  width: 14px;
  color: #64748b;
  font-size: 12px;
  line-height: 1.4;
  margin-top: 2px;
}
#${r.comCard} .${s.comName} {
  display: block;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.25;
}
#${r.comCard} .${s.comMeta} {
  display: block;
  margin-top: 3px;
  font-size: 12px;
  color: #64748b;
  line-height: 1.3;
}
#${r.comCard} .${s.comPill} {
  flex-shrink: 0;
  margin-top: 1px;
  padding: 3px 8px;
  border-radius: 999px;
  border: 1.5px solid #86efac;
  background: #f0fdf4;
  color: #15803d;
  font-size: 11px;
  font-weight: 700;
}
#${r.comCard} .${s.comDrop} {
  padding: 0 12px 12px 36px;
  border-top: 1px solid #f1f5f9;
  background: #fff;
}
#${r.comCard} .${s.comDrop}[hidden] {
  display: none;
}
#${r.comCard} .${s.comMonth} {
  margin-top: 10px;
}
#${r.comCard} .${s.comMonthLabel} {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 6px;
}
#${r.comCard} .${s.comDates} {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
#${r.comCard} .${s.comDate} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  font-size: 12.5px;
  font-weight: 600;
  color: #0f172a;
}
#${r.comCard} .${s.comEmpty} {
  padding: 12px;
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
}
#${r.comFoot} {
  margin: 12px 0 0;
  font-size: 12px;
  color: #94a3b8;
  text-align: left;
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
  animation: ${d}cfpulse 1.6s ease-out infinite;
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
@keyframes ${d}cfpulse {
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
  animation: ${d}cfring 1.1s ease-out forwards;
}
@keyframes ${d}cfring {
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
  display: flex;
  align-items: center;
  gap: 10px;
  background: #0b3a6e;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 10px 12px 10px 18px;
}
#${r.hud} .${s.hudMiniSecs} {
  display: none;
  margin-left: auto;
  font-size: 18px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.03em;
}
#${r.hud} .${s.hudToggle} {
  margin-left: auto;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
}
#${r.hud} .${s.hudToggle}:hover {
  background: rgba(255, 255, 255, 0.28);
}
#${r.hud}.${s.hudMin} {
  width: auto;
  min-width: 168px;
  overflow: hidden;
}
#${r.hud}.${s.hudMin} .${s.hudMiniSecs} {
  display: inline;
}
#${r.hud}.${s.hudMin} .${s.hudToggle} {
  margin-left: 0;
}
#${r.hud}.${s.hudMin} .${s.hudName},
#${r.hud}.${s.hudMin} .${s.hudVisa},
#${r.hud}.${s.hudMin} .${s.hudBody},
#${r.hud}.${s.hudMin} .${s.hudHist} {
  display: none;
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
`;function Tl(){if(document.querySelector(h(r.styles)))return;let t=document.createElement("style");t.id=r.styles,t.dataset[P.mark]="",t.textContent=jf,(document.head||document.documentElement).appendChild(t)}$a();Dr();ca(()=>{kc(),l.destroy()});Fa();Vc();A()&&I().then(t=>{if(t)return Li(t);Be()}).catch(()=>Be());if(!A()){l.disposable(()=>{let i=document.querySelector(h(r.anchor)),o=document.querySelector("#post_select");i&&o&&i.replaceWith(o);for(let a of document.querySelectorAll("[data-"+P.mark+"]"))a.remove()}),Tl(),l.send({action:"registerBlockGuard",prefix:d}),l.send({action:"registerRedirect",prefix:d}),l.send({action:"registerAlertGuard",prefix:d}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&l.send({action:"registerOfcReader",prefix:d}),l.on(window,"message",i=>{if(l.alive&&i.source===window)switch(i.data?.action){case Ut.req:return Fc(i);case Ut.res:return Wc(i);case Ut.ofc:return fs(i);case Ut.err:return gn("native_alert",i.data?.text),_n(String(i.data?.text||"alert").slice(0,120)),hl(i.data?.text);case Ut.sub:as(),hn(),vs(),xt().then(o=>{In(o?.accountId||null)}).catch(()=>{In(null)});return}}),chrome.storage.onChanged.addListener((i,o)=>{o==="local"&&(i.profile&&Ho(),i.waitPillClock&&os(i.waitPillClock.newValue),i.autoCloudflareTick&&(i.autoCloudflareTick.newValue?Kr():zr()))}),l.on(document,"click",i=>{Ie();let o=i.target.closest(h(r.waitTime));if(o){if(o.dataset.skipClick){delete o.dataset.skipClick;return}is()}}),l.on(document,"keydown",Ie),l.on(window,"focus",()=>Ie({keepConsular:!0})),l.on(document,"visibilitychange",()=>{document.hidden||Ie({keepConsular:!0})}),ss(),al(),ll(),fl(),pl(),ml(),Cl(),Kr();async function t(){!l.alive||A()||!Pn()||document.querySelector("#post_select")&&(Ct(),await Promise.all([Oo(),No(),Pr()]),Ts({slotIndex:Dn,shouldPick:async()=>await xt()?!0:!!await T("autoSelectFirstDate"),onSlotPicked:()=>Cc()}))}async function e(){!l.alive||A()||!Pn()||await $c()}async function n(){Ta(),Ma(),await Promise.all([Ho(),Ha(),Ba(),Oo(),No(),Pr()]),_o()}document.readyState==="complete"?n():l.on(window,"load",n),l.setInterval(t,2500),l.setInterval(e,3e4),e()}})();
