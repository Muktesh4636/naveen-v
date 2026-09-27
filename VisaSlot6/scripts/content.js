(()=>{function j(){try{return typeof chrome<"u"&&!!chrome.runtime?.id}catch{return!1}}function k(t){return j()?chrome.storage.local.get(t).catch(()=>{if(typeof t=="string")return{};let e={};for(let[n,i]of Object.entries(t))e[n]=i;return e}):Promise.resolve(typeof t=="string"?{}:t)}function T(t){return j()?chrome.storage.local.set(t).catch(()=>{}):Promise.resolve()}function fa(t){return j()?chrome.storage.local.remove(t).catch(()=>{}):Promise.resolve()}function pa(t){let e=()=>{try{t?.()}catch{}};window.addEventListener("unhandledrejection",i=>{String(i.reason?.message||i.reason||"").includes("Extension context invalidated")&&(i.preventDefault(),e())});let n=setInterval(()=>{j()||(clearInterval(n),e())},1500);return()=>clearInterval(n)}var at="https://the.gopg.online",So=`${at}/contribute`,ma=`${at}/contribute/telegram`,ep=`${at}/contribute/human-click`,Zn=`${at}/contribute/tik-tik-prefs`,ha=`${at}/contribute/tik-tik-coord`,ga=`${at}/contribute/tik-tik-auth`,ya=`${at}/contribute/community-slots`;var ba=20,xa=4320*60*1e3,ti=100,wa=4,ei=100,Sa=240,va=50,$a=1440*60*1e3,Ll={recheckButton:!1,defaultWaitTime:60,audioAlert:!1,autoSelectFirstDate:!0,autoCloudflareTick:!0,cloudflareDebuggerClick:!0,autofillLogin:!0,telegramAlert:!0,telegramViaAdb:!1,telegramViaServer:!0,telegramBotToken:"",telegramChatIds:"",telegramScreenshots:!0,serverSync:!0};function _(t){return k({[t]:Ll[t]}).then(e=>e[t])}function Pt(){return k({posts:[]}).then(t=>t.posts)}function $e(t){return T({posts:t})}function B(){return k("profile").then(t=>t.profile)}var re=t=>String(t).padStart(2,"0");function an(t){let e=re(t%60),n=Math.floor(t/60)%60,i=Math.floor(t/3600);return i?`${re(i)}:${re(n)}:${e}`:`${re(n)}:${e}`}function ka(t=new Date){try{return new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(t)}catch{let n=new Date(t.getTime()+(330-t.getTimezoneOffset())*6e4);return`${re(n.getUTCHours())}:${re(n.getUTCMinutes())}:${re(n.getUTCSeconds())}`}}function vo(t){let e=Math.floor(t/1440),n=Math.floor(t%1440/60),i=t%60,o=[];return e>0&&o.push(`${e}d`),(n>0||e>0)&&o.push(`${n}h`),o.push(`${i}m`),o.join(" ")}function Ca(t){let e=new Date(t);if(isNaN(e))return t;let n=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).formatToParts(e),i=o=>n.find(a=>a.type===o)?.value??"";return`${i("month")} ${i("day")} ${i("year")} ${i("hour")}:${i("minute")} ${i("dayPeriod")}`}function Ta(t){let e=t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/i);if(!e)return null;let n=parseInt(e[1],10),i=parseInt(e[2],10),o=parseInt(e[3],10),a=e[4];a&&(a.toUpperCase()==="PM"&&n<12&&(n+=12),a.toUpperCase()==="AM"&&n===12&&(n=0));let c=new Date;return c.setHours(n,i,o,0),c.getTime()>Date.now()+6e4&&c.setDate(c.getDate()-1),c}var _a=Symbol(),ql=class{constructor(){this.controller=new AbortController,this.timers=new Set,this.styles=[],this.disposables=[]}get signal(){return this.controller.signal}get alive(){return!this.signal.aborted&&j()}on(t,e,n,i){t.addEventListener(e,n,{...i,signal:this.signal})}setInterval(t,e){let n=setInterval(()=>{if(!this.alive)return this.clear(n);t()},e);return this.timers.add(n),n}setTimeout(t,e){let n=setTimeout(()=>{this.timers.delete(n),this.alive&&t()},e);return this.timers.add(n),n}clear(t){clearInterval(t),this.timers.delete(t)}setStyle(t,e,n){this.styles.push({el:t,prop:e,previous:t.style[e]}),t.style[e]=n}disposable(t){this.disposables.push(t)}send(t){try{if(!j())return;chrome.runtime.sendMessage(t,()=>{chrome.runtime.lastError})}catch{}}waitFor(t,{attempts:e=wa,interval:n=ti}={}){return new Promise(i=>{let o=a=>{if(!this.alive)return;let c=document.querySelector(t);if(c)return i(c);if(a>=e)return i(null);this.setTimeout(()=>o(a+1),n)};o(0)})}destroy(){this.controller.abort();for(let t of this.timers)clearInterval(t);this.timers.clear();for(let{el:t,prop:e,previous:n}of this.styles.reverse())t.style[e]=n;this.styles.length=0;for(let t of this.disposables.splice(0))try{t()}catch{}}},l=new ql;function Ma(){let t=globalThis[_a];Object.defineProperty(globalThis,_a,{value:l,enumerable:!1,configurable:!0,writable:!0}),t?.destroy()}var ni=new Uint32Array(2);crypto.getRandomValues(ni);var Aa="abcdefghjkmnpqrstuvwxyz",Ol=(ni[0].toString(36)+ni[1].toString(36)).replace(/[^a-z0-9]/g,""),d=(Aa[ni[0]%Aa.length]+Ol).slice(0,8).padEnd(8,"x");function h(t){return"#"+(typeof CSS<"u"&&CSS.escape?CSS.escape(t):t)}var r={selRow:d+"01",anchor:d+"02",waitTime:d+"03",recheck:d+"04",histCont:d+"05",histTbl:d+"06",cdCard:d+"07",cdTime:d+"08",ofcDate:d+"09",styles:d+"10",datesCont:d+"11",datesPara:d+"12",slotsTbl:d+"12b",aiBtn:d+"13",aiPanel:d+"14",aiFrom:d+"15",aiTo:d+"16",aiStatus:d+"17",aiConfirm:d+"18",aiCancel:d+"19",aiClose:d+"20",aiCities:d+"21",aiSubmitBtn:d+"22",aiCitiesBtn:d+"23",aiLogin:d+"24",aiPass:d+"25",aiQ1:d+"26",aiA1:d+"27",aiQ2:d+"28",aiA2:d+"29",aiQ3:d+"30",aiA3:d+"31",aiSaveLogin:d+"32",cfHud:d+"33",aiCitiesAll:d+"34",aiCitiesNone:d+"35",aiLoginToggle:d+"36",aiLoginBody:d+"37",aiProfiles:d+"63",aiProfilesList:d+"64",aiAddProfile:d+"65",aiLoginCancel:d+"66",aiLoginEditorTitle:d+"67",aiSubmitOn:d+"38",aiSubmitOff:d+"39",aiCitiesOn:d+"40",aiCitiesOff:d+"41",aiWinList:d+"42",aiWinAdd:d+"43",aiWinSave:d+"44",aiWinReset:d+"45",aiWinNote:d+"46",aiSubmitSw:d+"47",aiCitiesSw:d+"48",aiInfoBox:d+"49",aiWarnBox:d+"50",aiOkBox:d+"51",aiWinCard:d+"52",aiSubmitBody:d+"53",aiCitiesBody:d+"54",aiTerms:d+"55",aiTermsAgree:d+"56",aiTermsGate:d+"57",aiMain:d+"58",aiTermsContinue:d+"59",aiFromBtn:d+"60",aiToBtn:d+"61",aiCal:d+"62",hud:d+"68",hudName:d+"69",hudVisa:d+"70",hudBody:d+"71",hudHist:d+"72",hudCities:d+"73",hudSecs:d+"74",hudToggle:d+"7a",authGate:d+"75",authBody:d+"76",comCard:d+"77",comList:d+"78",comFoot:d+"79"},s={pill:d+"a",pillTtl:d+"b",pillTmr:d+"c",pillWait:d+"d",pillDone:d+"e",footer:d+"f",card:d+"g",cardTtl:d+"h",histScrl:d+"i",dltDn:d+"j",dltUp:d+"k",cdDiv:d+"l",hidden:d+"m",sideLink:d+"n",datesLnk:d+"o",slotsSum:d+"o2",slotsTbl:d+"o3",aiOn:d+"p",aiRow:d+"q",aiHint:d+"r",aiCities:d+"s",aiOnBtn:d+"t",aiCityAct:d+"x",cfHud:d+"u",cfPulse:d+"v",cfFlash:d+"w",aiEn:d+"y",aiDis:d+"z",aiWinRow:d+"aa",aiFeat:d+"ab",aiSwitch:d+"ac",aiKnob:d+"ad",aiSec:d+"ae",aiInfo:d+"af",aiWarn:d+"ag",aiOk:d+"ah",aiTrash:d+"ai",aiWinHelp:d+"aj",aiInline:d+"ak",aiHead:d+"al",aiTerms:d+"am",aiTermsCb:d+"an",aiTermsList:d+"ao",aiContinue:d+"ap",aiDateBtn:d+"aq",aiDateField:d+"a1",aiCal:d+"ar",aiCalHead:d+"as",aiCalGrid:d+"at",aiCalDay:d+"au",aiCalMuted:d+"av",aiCalOn:d+"aw",aiCalToday:d+"ax",aiQl:d+"ay",aiQlTitle:d+"az",aiQlSub:d+"ba",aiQlCard:d+"bb",aiQlMeta:d+"bc",aiQlBadge:d+"bd",aiQlEdit:d+"be",aiQlAdd:d+"bf",aiQlEmpty:d+"bg",hud:d+"bh",hudHead:d+"bi",hudName:d+"bj",hudVisa:d+"bk",hudBody:d+"bl",hudCount:d+"bm",hudCountLabel:d+"bn",hudSecs:d+"bo",hudStuck:d+"bp",hudSubmit:d+"bq",hudSubmitTitle:d+"br",hudSubmitSub:d+"bs",hudHist:d+"bt",hudHistTitle:d+"bu",hudHistRow:d+"bv",hudPillOk:d+"bw",hudPillNo:d+"bx",hudMin:d+"b0",hudToggle:d+"b1",hudMiniSecs:d+"b2",hudCities:d+"by",hudCitiesTitle:d+"bz",hudCityLabel:d+"ca",authCard:d+"cb",authSteps:d+"cc",authStep:d+"cd",authStepOn:d+"ce",authEmailBox:d+"cf",authTitle:d+"cg",authOtpRow:d+"ch",authOtpBox:d+"ci",authBtn:d+"cj",authLinks:d+"ck",authLink:d+"cl",authSecure:d+"cm",authClose:d+"cn",authBrand:d+"co",authEmailChip:d+"cp",authPlanList:d+"cq",authPlanRow:d+"cr",authPlanOn:d+"cs",authPlanRadio:d+"ct",authPlanMeta:d+"cu",authPlanName:d+"cv",authPlanDesc:d+"cw",authPlanPrice:d+"cx",authPlanOff:d+"cy",authPlanWas:d+"cz",authPlanOffer:d+"c0",comCard:d+"cz",comBrand:d+"da",comTitle:d+"db",comRow:d+"dc",comOpen:d+"dd",comMain:d+"de",comName:d+"df",comMeta:d+"dg",comPill:d+"dh",comChevron:d+"di",comDrop:d+"dj",comMonth:d+"dk",comMonthLabel:d+"dl",comDates:d+"dm",comDate:d+"dn",comEmpty:d+"do",comFoot:d+"dp"},q={mark:d,w:d+"w",mw:d+"mw"},Ut={req:d+"q",res:d+"r",ofc:d+"o",err:d+"e",sub:d+"s"};function ii(t){return t.map(e=>String.fromCharCode(e)).join("")}function Rl(){return"_"+(chrome.runtime?.id||"x").slice(-4)}function Da(){let t=document.createElement("div");return t.className=s.footer,t.textContent=ii([80,111,119,101,114,101,100,32,98,121,32,86,105,115,97,32,66,111,111,107,32,50]),t}function Nl(t){let e=document.getElementById(r.histCont);e&&e.remove(),e=document.createElement("div"),e.id=r.histCont,e.className=s.card,e.dataset[q.mark]="";let n=document.createElement("h4");n.className=s.cardTtl,n.textContent=ii([82,101,99,101,110,116,32,87,97,105,116,32,84,105,109,101,32,72,105,115,116,111,114,121]),e.appendChild(n);let i=document.createElement("div");i.className=s.histScrl;let o=document.createElement("table");o.id=r.histTbl;let a=document.createElement("thead"),c=document.createElement("tr");for(let p of["Time","Est. Wait","Change"]){let m=document.createElement("th");m.textContent=p,c.appendChild(m)}a.appendChild(c),o.appendChild(a);let u=document.createElement("tbody");for(let p=t.length-1;p>=0;p--){let m=t[p],y="--",g="";if(p>0){let C=m.minutes-t[p-1].minutes;C<0?(y=`${C}m`,g=s.dltDn):C>0?(y=`+${C}m`,g=s.dltUp):y="0m"}let b=document.createElement("tr"),x=[[m.timeStr,""],[vo(m.minutes),""],[y,g]];for(let[C,M]of x){let S=document.createElement("td");M&&(S.className=M),S.textContent=C,b.appendChild(S)}u.appendChild(b)}o.appendChild(u),i.appendChild(o),e.appendChild(i),e.appendChild(Da());let f=document.getElementById("last-updated");f&&(f.closest("div, p, section")||f.parentElement).insertAdjacentElement("afterend",e)}function Bl(){for(let t of document.querySelectorAll("script")){let e=t.textContent.match(/var minutes = parseInt\(\s*(\d+)\s*,\s*10\);/);if(e)return parseInt(e[1],10)}return null}function Pa(){if(!(document.getElementById("waitTime")&&document.getElementById("last-updated")&&document.querySelector(".waitingrooms-text")?.textContent.includes("Cloudflare")))return;let e=document.getElementById("waitTime"),n=document.getElementById("last-updated"),i=Bl();if(i!==null&&i>Sa&&!e.textContent.includes("(")){let c=vo(i);e.textContent=`${e.textContent} (${i} minutes / ${c})`}let o=n.textContent.trim().split(" (")[0],a=Ta(o);if(a&&l.setInterval(()=>{let c=Math.floor((Date.now()-a)/1e3);c>=0&&(n.textContent=`${o} (${c}s ago)`)},1e3),i!==null){let c=Rl(),u=sessionStorage.getItem(c);u||(u=Math.random().toString(36).substring(2,11),sessionStorage.setItem(c,u)),k({queueHistory:{}}).then(f=>{let p=f.queueHistory||{},m=Date.now(),y={};for(let[C,M]of Object.entries(p)){if(!Array.isArray(M))continue;let S=M[M.length-1];S&&m-S.timestamp<$a&&(y[C]=M)}let g=y[u]||[],b=n?n.textContent.trim().split(" (")[0]:new Date().toLocaleTimeString("en-US"),x=g[g.length-1];(!x||x.minutes!==i||x.timeStr!==b)&&(g.push({timestamp:m,timeStr:b,minutes:i}),g.length>va&&g.shift(),y[u]=g,T({queueHistory:y})),Nl(g)})}}function Ea(t,e){let n=document.getElementById("error_row");if(!n)return;let i;t?i=e?`Blocked for 24 hours, about ${an(e)} remaining. Logging in again will not help.`:"Blocked for 24 hours. Logging in again will not help.":i="Temporarily blocked. Log in in a new tab, then refresh this page.";let o=document.createElement("div");o.className="atlas_validationalert alert alert-danger warning",o.dataset[q.mark]="",o.textContent=i,n.replaceChildren(o),n.style.removeProperty("display"),n.parentElement?.style.removeProperty("display")}function Ia(){let t=document.querySelector("h1");t&&t.textContent.includes("Error")&&t.textContent.includes("1015")&&k({cfRetryAfter:null}).then(n=>{let i=parseInt(n.cfRetryAfter,10);if(!isNaN(i)){fa("cfRetryAfter");let o=document.getElementById("what-happened-section");if(o){let a=document.createElement("div");a.id=r.cdCard,a.className=s.card,a.dataset[q.mark]="";let c=document.createElement("h4");c.className=s.cardTtl,c.textContent=ii([82,97,116,101,32,76,105,109,105,116,32,67,111,111,108,100,111,119,110]),a.appendChild(c);let u=document.createElement("div");u.id=r.cdTime,a.appendChild(u);let f=document.createElement("div");f.className=s.cdDiv,a.appendChild(f),a.appendChild(Da()),o.appendChild(a);let p=i,m=null,y=()=>{p>0?(u.textContent=an(p),p--):(u.classList.add(s.cdDiv+"-over"),u.textContent="You can try refreshing now!",m!=null&&l.clear(m))};y(),m=l.setInterval(y,1e3)}}})}var oi="tikTikSession",$o="tikTikDeviceId",ri="tikTikPendingOtp",et=!1,st=null,It=null,zt=null,Kt="",Ce=!1,ae=!1;function ci(){return et}function La(t){st=t}function qa(t){It=t}async function se(){let e=(await k($o))[$o];return e||(e=crypto.randomUUID(),await T({[$o]:e})),String(e).slice(0,64)}async function cn(){return(await k(oi))[oi]||null}async function ko(t,e){await T({[oi]:{token:t,email:e}})}async function To(){await T({[oi]:null})}async function Oa(t){Kt=t,Ce=!0,await T({[ri]:{email:t,awaitingOtp:!0,sentAt:Date.now()}})}async function jt(){Ce=!1,await T({[ri]:null})}async function Ra(){let e=(await k(ri))[ri];return!e?.awaitingOtp||!e?.email?(Ce=!1,null):Date.now()-Number(e.sentAt||0)>30*6e4?(await jt(),null):(Kt=String(e.email),Ce=!0,e)}async function Te(){try{let t=await B();return t?.id?String(t.id):""}catch{return""}}async function _e(t){let e=await fetch(ga||`${at}/contribute/tik-tik-auth`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),signal:AbortSignal.timeout(2e4)}),n=await e.json().catch(()=>({}));return!e.ok&&!n.error&&(n.error="Something went wrong. Try again."),n}async function _o(){let t=await cn();return t?.token?_e({action:"status",token:t.token,deviceId:await se(),applicantId:await Te()}):{loggedIn:!1,access:!1}}async function ln(){let t=await _o();return t.kicked?(await To(),et=!1,It&&It(""),Do(),{ok:!1,message:""}):t.loggedIn?t.access?(et=!0,{ok:!0,message:""}):(et=!1,{ok:!1,message:""}):(et=!1,{ok:!1,message:""})}function Na(){return document.querySelector(h(r.authBody))}function E(t,e){let n=document.querySelector(h(r.authBody)+" [data-auth-msg]");n&&(n.textContent=t||"",n.style.color=e?"#9a3412":"#334155")}function Et(t){return String(t||"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e])}function Mo(t){let e=Array.isArray(t?.plans)?t.plans:[],n={};return e.forEach(i=>{i?.key&&(n[i.key]=i)}),{list:e,byKey:n}}function li(t){return t?.plan?t.plan==="applicant"?!!t.applicantId:t.planEnds?new Date(t.planEnds).getTime()>Date.now():!1:!1}function Ba(t){if(!t?.plan)return"";let{byKey:e}=Mo(t),n=e[t.plan],i=Number(n?n.offerPrice:t.amount),o=n?.label||t.plan;return t.plan==="applicant"?`\u20B9${i||0} \xB7 ${o} ${t.applicantId||""}`.trim():`\u20B9${i||t.amount||0} \xB7 ${o}`}function ke(t,e){let{byKey:n}=Mo(e),i=n[t];return i&&i.rank!=null?Number(i.rank)||0:t==="trial"?1:t==="applicant"?2:t==="month"?3:0}function Hl(t){return li(t)?ke(t.plan,t)<ke("month",t):!1}function Wl(t){let e=Math.max(0,Number(t.offerPrice)||0),n=Math.max(0,Number(t.price)||0);return n>e?`<span class="${s.authPlanPrice}"><span class="${s.authPlanWas}">\u20B9${n}</span><span class="${s.authPlanOffer}">\u20B9${e}</span></span>`:`<span class="${s.authPlanPrice}"><span class="${s.authPlanOffer}">\u20B9${e}</span></span>`}function ui(t){let e=Na();e&&(e.innerHTML=t)}function xt(t,e,n){let i=document.querySelector(t);i&&l.on(i,e,n)}async function sn(t){et=!1,ui(`
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
  `),Eo();let e=document.querySelector(h(`${r.authBody}-email`));e&&Kt&&(e.value=Kt),E(t||"",!!t),xt(h(`${r.authBody}-send`),"click",async i=>{i?.preventDefault?.(),i?.stopPropagation?.();let o=String(e?.value||"").trim();if(!o||!o.includes("@")){E("Enter a valid email.",!0);return}Kt=o,E("Signing in\u2026",!1);let a=await _e({action:"send",email:o,deviceId:await se(),applicantId:await Te()});if(a.token||a.skipOtp){await ko(a.token,a.email||o),await jt(),E("Logged in.",!1),Me(a);return}if(!a.success&&!a.sent){E(a.error||"Could not send the OTP.",!0);return}await Oa(o),ai(o,"")}),e&&(l.on(e,"pointerdown",i=>i.stopPropagation()),l.on(e,"keydown",i=>{i.key==="Enter"&&(i.preventDefault(),document.querySelector(h(`${r.authBody}-send`))?.click())}));let n=document.querySelector(h(`${r.authBody}-send`));n&&l.on(n,"pointerdown",i=>i.stopPropagation()),st&&st()}function ai(t,e){if(document.querySelector(h(`${r.authBody}-otpRow`))&&Ce&&Kt===t){e&&E(e,!1);return}ui(`
    <div class="${s.authCard}">
      <button type="button" id="${r.authBody}-close" class="${s.authClose}">Close</button>
      <div class="${s.authSteps}">
        <div class="${s.authStep}"><span>1</span> Enter Email</div>
        <div class="${s.authStep} ${s.authStepOn}"><span>2</span> Enter OTP</div>
      </div>
      <div class="${s.authEmailBox}">
        <span>${Et(t)}</span>
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
  `),Eo(),E(e||"",!1);let i=f=>document.querySelector(h(`${r.authBody}-d${f}`)),o=()=>[0,1,2,3].map(f=>String(i(f)?.value||"").replace(/\D/g,"")).join(""),a=()=>{for(let f=0;f<4;f++){let p=i(f);p&&(p.value="")}i(0)?.focus()},c=f=>{let p=String(f||"").replace(/\D/g,"").slice(0,4).split("");for(let y=0;y<4;y++){let g=i(y);g&&(g.value=p[y]||"")}let m=Math.min(p.length,3);i(p.length>=4?3:m)?.focus()},u=async()=>{await jt(),sn("")};for(let f=0;f<4;f++){let p=i(f);p&&(l.on(p,"pointerdown",m=>m.stopPropagation()),l.on(p,"input",()=>{let m=String(p.value||"").replace(/\D/g,"");if(m.length>1){c(m),o().length===4&&document.querySelector(h(`${r.authBody}-go`))?.click();return}p.value=m.slice(0,1),m&&f<3&&i(f+1)?.focus(),o().length===4&&document.querySelector(h(`${r.authBody}-go`))?.click()}),l.on(p,"keydown",m=>{if(m.key==="Backspace"&&!p.value&&f>0){i(f-1)?.focus();return}m.key==="ArrowLeft"&&f>0&&(m.preventDefault(),i(f-1)?.focus()),m.key==="ArrowRight"&&f<3&&(m.preventDefault(),i(f+1)?.focus()),m.key==="Enter"&&(m.preventDefault(),document.querySelector(h(`${r.authBody}-go`))?.click())}),l.on(p,"paste",m=>{m.preventDefault();let y=(m.clipboardData||window.clipboardData)?.getData("text")||"";c(y),o().length===4&&document.querySelector(h(`${r.authBody}-go`))?.click()}))}i(0)?.focus(),xt(h(`${r.authBody}-back`),"click",f=>{f?.stopPropagation?.(),u()}),xt(h(`${r.authBody}-back2`),"click",f=>{f?.stopPropagation?.(),u()}),xt(h(`${r.authBody}-resend`),"click",async f=>{f?.preventDefault?.(),f?.stopPropagation?.();let p=document.querySelector(h(`${r.authBody}-resend`));p&&(p.disabled=!0),E("Sending a new OTP\u2026",!1);let m=await _e({action:"send",email:t,deviceId:await se(),applicantId:await Te()});if(p&&(p.disabled=!1),m.token||m.skipOtp){await ko(m.token,m.email||t),await jt(),Me(m);return}if(!m.success&&!m.sent){E(m.error||"Could not resend. Try again.",!0);return}await Oa(t),a(),E("New OTP sent. Check your email.",!1)}),xt(h(`${r.authBody}-go`),"click",async f=>{f?.preventDefault?.(),f?.stopPropagation?.();let p=o();if(!/^\d{4}$/.test(p)){E("Enter all 4 digits.",!0);return}E("Verifying OTP\u2026",!1);let m=await _e({action:"verify",email:t,code:p,deviceId:await se(),applicantId:await Te()});if(!m.token){E(m.error||"Wrong OTP. Try again or Resend.",!0),a();return}await ko(m.token,m.email||t),await jt(),E("OTP correct. Logged in.",!1),Me(m)});for(let f of[`${r.authBody}-go`,`${r.authBody}-back`,`${r.authBody}-back2`,`${r.authBody}-resend`]){let p=document.querySelector(h(f));p&&l.on(p,"pointerdown",m=>m.stopPropagation())}}function Ha(t,e={}){let n=!!e.upgrade&&li(t);et=n?!!t.access:!1,ae=!n;let i=!!t?.trialUsed,o=n?String(t.plan||""):"",a=ke(o,t),c=n?"Upgrade plan":"Pick your plan",u=n?"Upgrade":"Continue",{list:f,byKey:p}=Mo(t),m=f.length?f:[{key:"trial",label:"Trial",desc:"3 days \xB7 once per email",price:99,offerPrice:1,rank:1},{key:"month",label:"Monthly",desc:"30 days \xB7 full access",price:4999,offerPrice:2999,rank:3},{key:"applicant",label:"One applicant",desc:"Lock to one applicant ID",price:499,offerPrice:300,rank:2}],y=m.map(S=>{let $=S.key,Q=n&&o===$,tt=n&&ke($,t)<=a,da=Q||$==="trial"&&(i||n&&tt)||n&&tt&&$!=="month",Jn=S.desc||"";Q?Jn="Current plan":$==="trial"&&i?Jn="Already used on this email":n&&tt&&(Jn="Same or lower than current");let Il=$==="trial"?"Trial":$==="month"?"Monthly":$==="applicant"?"One applicant":S.label||$;return`
      <button type="button" data-plan="${Et($)}" role="radio" class="${s.authPlanRow}${da?` ${s.authPlanOff}`:""}" ${da?"disabled":""} aria-checked="false">
        <span class="${s.authPlanRadio}" aria-hidden="true"></span>
        <span class="${s.authPlanMeta}">
          <span class="${s.authPlanName}">${Et(Il)}</span>
          <span class="${s.authPlanDesc}">${Et(Jn)}</span>
        </span>
        ${Wl(S)}
      </button>`}).join("");ui(`
    <div class="${s.authCard}">
      <button type="button" id="${r.authBody}-close" class="${s.authClose}">Close</button>
      <div class="${s.authBrand}">Tik Tik</div>
      <div class="${s.authTitle}">${c}</div>
      <div class="${s.authEmailChip}">${Et(t.email||"")}</div>
      ${n?`<div class="${s.aiHint}" style="margin:0 0 10px">Current: ${Et(Ba(t))}</div>`:""}
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
  `);let b=m.some(S=>S.key==="month"&&!(n&&o==="month"))?"month":m.find(S=>{let $=S.key,Q=n&&o===$,tt=n&&ke($,t)<=a;return!(Q||$==="trial"&&(i||n&&tt)||n&&tt&&$!=="month")})?.key||"",x=()=>Array.from(document.querySelectorAll(`${h(r.authBody)} [data-plan]`)),C=()=>{x().forEach(S=>{let $=!!b&&S.getAttribute("data-plan")===b&&!S.disabled;S.classList.toggle(s.authPlanOn,$),S.setAttribute("aria-checked",$?"true":"false")})};C();let M=p.trial?Number(p.trial.offerPrice):1;!n&&i&&E(`The \u20B9${M} trial was already used on this email.`,!1),!n&&t?.reason&&E(t.reason,!t.plan),n&&E("Select a higher plan, then tap Upgrade.",!1),Eo(),xt(h(`${r.authBody}-out`),"click",()=>Fa()),xt(h(`${r.authBody}-back`),"click",()=>Ao(t)),x().forEach(S=>{l.on(S,"click",()=>{S.disabled||(b=S.getAttribute("data-plan"),C(),E("",!1))})}),xt(h(`${r.authBody}-go`),"click",async()=>{if(!b){E(n?"Select a higher plan.":"Select a plan.",!0);return}if(b==="trial"&&i){E(`The \u20B9${M} trial was already used on this email.`,!0);return}if(n&&ke(b,t)<=a){E("Pick a higher plan to upgrade.",!0);return}let S=document.querySelector(h(`${r.authBody}-go`));S&&(S.disabled=!0),E(n?"Upgrading\u2026":"Starting\u2026",!1);let $=await cn(),Q=await _e({action:"choose",token:$?.token,deviceId:await se(),applicantId:await Te(),plan:b});if(S&&(S.disabled=!1),Q.error){E(Q.error,!0);return}Me(Q)});for(let S of[`${r.authBody}-go`,`${r.authBody}-out`,`${r.authBody}-back`]){let $=document.querySelector(h(S));$&&l.on($,"pointerdown",Q=>Q.stopPropagation())}x().forEach(S=>{l.on(S,"pointerdown",$=>$.stopPropagation())}),st&&st()}function Ao(t){et=!!t.access,ae=!1;let e=t.planEnds?` until ${String(t.planEnds).slice(0,10)}`:"",n=Hl(t)||!!t.canUpgrade;ui(`
    <div class="${s.authCard}" style="padding:12px 14px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
        <div style="min-width:0">
          <div class="${s.aiHead}" style="font-size:14px;margin:0">${Et(t.email||"")}</div>
          <div class="${s.aiHint}" style="margin:2px 0 0">${Et(Ba(t))}${Et(e)}</div>
        </div>
        <button type="button" id="${r.authBody}-out" class="${s.authLink}" style="color:#64748b;flex-shrink:0">Logout</button>
      </div>
      <div data-auth-msg class="${s.aiHint}" style="margin-top:8px"></div>
      ${n?`
        <button type="button" id="${r.authBody}-upgrade" class="${s.authBtn}" style="margin-top:12px;padding:11px 14px;font-size:14px">Upgrade plan</button>
      `:""}
    </div>
  `),!t.access&&t.reason&&E(t.reason,!0),xt(h(`${r.authBody}-out`),"click",()=>Fa()),xt(h(`${r.authBody}-upgrade`),"click",()=>Ha(t,{upgrade:!0}));for(let i of[`${r.authBody}-out`,`${r.authBody}-upgrade`]){let o=document.querySelector(h(i));o&&l.on(o,"pointerdown",a=>a.stopPropagation())}Co(),st&&st()}function Wa(t){let e=et,n=ae;et=!1;let i=t?.reason||"Choose a plan to use Tik Tik.";(e||!n)&&It&&It(i),n?t?.reason&&E(t.reason,!0):Ha(t),st&&st()}function Me(t){if(t?.kicked){To(),et=!1,ae=!1,si(),It&&It(""),jt().then(()=>sn("This email was logged in on another laptop."));return}if(!t?.loggedIn){if(et=!1,ae=!1,si(),Ce&&Kt){ai(Kt,"Enter the OTP from your email.");return}Ra().then(e=>{e?.email?ai(e.email,"Enter the OTP from your email."):sn("")});return}if(jt(),li(t)&&t.access){Ao(t),Co(),st&&st();return}Wa(t),Co()}async function Fa(){let t=await cn();try{await _e({action:"logout",token:t?.token,deviceId:await se()})}catch{}await To(),await jt(),et=!1,ae=!1,si(),It&&It(""),sn("")}function si(){zt&&(l.clear(zt),zt=null)}function Co(){si();let t=async()=>{zt=null;let e=await _o().catch(()=>null);if(!e){zt=l.setTimeout(t,5e3);return}if(e.kicked||!e.loggedIn){Me(e);return}if(!(li(e)&&!!e.access)){Wa(e),zt=l.setTimeout(t,4e3);return}(!et||ae)&&(Ao(e),st&&st()),zt=l.setTimeout(t,5e3)};zt=l.setTimeout(t,5e3)}async function Do(){if(!Na())return;if(!(await cn())?.token){et=!1;let n=await Ra();if(n?.email){ai(n.email,"Enter the OTP from your email.");return}sn("");return}let e=await _o();Me(e)}async function ce(){let t=await cn(),e=await se();return{tikTikEmail:t?.email||"",tikTikToken:t?.token||"",tikTikDeviceId:e||"",applicantId:await Te()}}function Ua(){Do()}function Po(){return Do()}function Fl(){let t=document.querySelector(h(r.aiPanel));if(!t)return;let e=Number(t.dataset.openedAt||0);e&&Date.now()-e<800||t.classList.add(s.hidden)}function Eo(){let t=document.querySelector(h(`${r.authBody}-close`));t&&(l.on(t,"pointerdown",e=>e.stopPropagation()),l.on(t,"click",e=>{e?.preventDefault?.(),e?.stopPropagation?.(),Fl()}))}async function za(){let t=document.querySelector(".username");if(!t)return;let n=(t.innerText||"").trim().match(/^(.*)\((\d+)\)\s*$/);if(!n)return;let[,i,o]=n,a=await B()||{},c=!a.id||a.id===o||String(a.id).includes(o)?a:{};c.name=i.trim(),c.id=o;let u=document.querySelectorAll("script");for(let f of u){let p=f.innerText.trim();if(p.includes("setAuthenticatedUserContext")){let m=/setAuthenticatedUserContext\('([^']*)'\)/,y=p.match(m);y&&(c.email=y[1])}}await T({profile:c})}async function Ka(){let t=document.querySelector("#post_select");if(!t)return;let e=await Pt();for(let n of t.options){if(!n.value)continue;e.findIndex(o=>o.ID===n.value)==-1&&e.push({ID:n.value,Name:n.text})}await $e(e)}var Ul=["visa-information","fee-payment","appointment-confirmation"];function zl(){let t=document.querySelector("#appointment-card");if(!t||!t.textContent.trim())return null;let e=t.closest("ul");if(!e)return null;let n={};return e.querySelectorAll(":scope > li").forEach(i=>{let o=i.querySelector(".text-bold");if(!o)return;let a=Kl(o.textContent);if(!Ul.includes(a))return;let c=jl(i);c&&(n[a]=c)}),Object.keys(n).length?n:null}function Kl(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function jl(t){let e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/<br\s*\/?>/gi,`
`),e.querySelectorAll("svg, script, style, .text-bold").forEach(n=>n.remove()),e.textContent.split(`
`).map(n=>n.replace(/\s+/g," ").trim()).filter(Boolean).join(" | ")}function Ae(t){if(!t||!t.value)return null;try{let e=t.value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=JSON.parse(atob(e));if(n.iat&&Date.now()-n.iat*1e3>xa)return null}catch{}return t.value}function Gl(t){let e=(t.posts||[]).filter(o=>o.Updated).sort((o,a)=>o.Updated-a.Updated).pop(),n={profile:t.profile,posts:e?[e]:[]},i=Ae(t.cgiIdToken);return i&&(n.token=i),n}async function di(){if(!j()||!await _("serverSync"))return;let t=await k(["profile","posts","cgiIdToken"]),e=Gl(t);if(!(!e.profile?.id&&!e.profile?.email))try{let n=await ce().catch(()=>({})),i=await fetch(So,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...e,...n})}).then(a=>a.json());if(!i.success)return;let o="0";i.contribs>0&&(o=i.contribs.toString()),i.contribs>10&&(o="10+"),i.contribs>0&&await T({contribs:{email:t.profile?.email,updated:Date.now(),count:o}})}catch{}}function Io(t=0){j()&&document.querySelector("#appointment-card")&&_("serverSync").then(e=>{if(!e)return;let n=zl();if(!n){t<ba&&l.setTimeout(()=>Io(t+1),ti);return}k(["profile","cgiIdToken","savedDashboard"]).then(async i=>{let o=Ae(i.cgiIdToken);if(!o||JSON.stringify(n)===JSON.stringify(i.savedDashboard))return;let a=await ce().catch(()=>({}));fetch(So,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:i.profile,dashboard:n,token:o,...a})}).then(c=>c.json()).then(c=>{c.success&&T({savedDashboard:n})}).catch(()=>{})})})}var Yl=`${at}/extension-runtime-config.json`,qo="vsRuntimeConfig",Vl=300*1e3,Lo=0,un=null,v={slotWindowLabel:":14\u2013:21, :24\u2013:31, :54\u2013:02",slotWindows:[{slot:1,fromMin:14,toMin:21},{slot:2,fromMin:24,toMin:31},{slot:3,fromMin:54,toMin:2}],windowStartsMin:[14,24,54],cityLoadingMaxMs:12e4,cityCalendarNoDatesMs:2e4,cityRotateMinGapMs:15e3,cityRotateMaxGapMs:18e3,cityHoldMaxMs:45e3,homeKeepaliveMinMs:6e5,homeKeepaliveMaxMs:6e5,homeKeepaliveDebounceMs:48e4,loadingStuckMs:6e4,loadingStuckDebounceMs:9e4,remoteVersion:0,source:"bundled"};function ot(t,e,n,i){let o=Number(t);return Number.isFinite(o)?Math.min(n,Math.max(e,Math.round(o))):i}function Ql(t){if(!Array.isArray(t)||!t.length||t.length>24)return null;let e=[];for(let n of t){let i=ot(n?.fromMin,0,59,NaN),o=ot(n?.toMin,0,59,NaN);if(!Number.isFinite(i)||!Number.isFinite(o)||i===o)return null;let a=ot(n?.slot,1,12,1);e.push({slot:a,fromMin:i,toMin:o})}return e}function Xl(t){let e=[...new Set(t.map(n=>n.fromMin))].sort((n,i)=>n-i);return e.length?e:v.windowStartsMin.slice()}function ja(t,e="remote"){if(!t||typeof t!="object")return!1;let n=Ql(t.slotWindows);if(n){v.slotWindows.length=0;for(let i of n)v.slotWindows.push(i);v.windowStartsMin=Xl(n)}return typeof t.slotWindowLabel=="string"&&t.slotWindowLabel.length<120&&(v.slotWindowLabel=t.slotWindowLabel),v.cityLoadingMaxMs=ot(t.cityLoadingMaxMs,1e4,3e5,v.cityLoadingMaxMs),v.cityCalendarNoDatesMs=ot(t.cityCalendarNoDatesMs,5e3,12e4,v.cityCalendarNoDatesMs),v.cityRotateMinGapMs=ot(t.cityRotateMinGapMs,5e3,6e4,v.cityRotateMinGapMs),v.cityRotateMaxGapMs=ot(t.cityRotateMaxGapMs,v.cityRotateMinGapMs,9e4,Math.max(v.cityRotateMinGapMs,v.cityRotateMaxGapMs)),v.cityHoldMaxMs=ot(t.cityHoldMaxMs,1e4,18e4,v.cityHoldMaxMs),v.homeKeepaliveMinMs=ot(t.homeKeepaliveMinMs,12e4,18e5,v.homeKeepaliveMinMs),v.homeKeepaliveMaxMs=ot(t.homeKeepaliveMaxMs,v.homeKeepaliveMinMs,18e5,Math.max(v.homeKeepaliveMinMs,v.homeKeepaliveMaxMs)),v.homeKeepaliveDebounceMs=ot(t.homeKeepaliveDebounceMs,6e4,18e5,v.homeKeepaliveDebounceMs),v.loadingStuckMs=ot(t.loadingStuckMs,3e4,6e5,v.loadingStuckMs),v.loadingStuckDebounceMs=ot(t.loadingStuckDebounceMs,3e4,6e5,v.loadingStuckDebounceMs),v.remoteVersion=ot(t.version,0,1e9,v.remoteVersion),v.source=e,!0}async function Jl(){try{let e=(await k(qo))[qo];e?.config&&ja(e.config,"cache")}catch{}}async function Zl(t){try{await T({[qo]:{config:t,fetchedAt:Date.now()}})}catch{}}async function tu({force:t=!1}={}){let e=Date.now();if(!t&&e-Lo<Vl)return v;if(un)return un;un=(async()=>{await Jl();try{let n=await fetch(Yl,{method:"GET",cache:"no-store",signal:AbortSignal.timeout(8e3)});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.json();if(!i||typeof i!="object"||Array.isArray(i))throw new Error("bad json");if(i.script||i.code||i.eval)throw new Error("unsafe keys");ja(i,"remote"),await Zl(i),Lo=Date.now()}catch{Lo=Date.now()}return v})();try{return await un}finally{un=null}}function Ga(){tu().catch(()=>{})}var Gt=null,dn=null;function Ya(){return Gt||v.slotWindows}function De(){return dn||(Gt?.length?Va(Gt):v.slotWindowLabel)}var Ap=v.slotWindows,mt=3,le=8;function Va(t){return t?.length?t.map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", "):v.slotWindowLabel}function eu(t,e){return(Number(t)+Number(e))%60}function fi(t,e){return t=Number(t),e=Number(e),e>=t?e-t:60-t+e}function nu(t,e,n){return e<=n?t>=e&&t<=n:t>=e||t<=n}function Oo(t){if(!Array.isArray(t))return[];let e=[];for(let n of t){if(e.length>=mt)break;let i=Number(n?.fromMin),o=Number(n?.durationMin??n?.duration);if(!Number.isFinite(i)||i<0||i>59)continue;if(!Number.isFinite(o)||o<1){let c=Number(n?.toMin);if(!Number.isFinite(c)||c<0||c>59||(o=fi(i,c),o<1))continue}o=Math.min(le,Math.max(1,Math.round(o)));let a=eu(i,o);e.push({slot:e.length+1,fromMin:Math.round(i),toMin:a,durationMin:o})}return e}function Qa(t){let e=Oo(t||[]);return e.length?(Gt=e.map(({slot:n,fromMin:i,toMin:o})=>({slot:n,fromMin:i,toMin:o})),dn=Va(Gt),Gt):(Gt=null,dn=null,null)}function Ro(){Gt=null,dn=null}function Xa(t){let e=t?.length?t:v.slotWindows,n=[],i=Array.isArray(e)?[...e]:[],o=i.find(c=>Number(c.fromMin)===0&&Number(c.toMin)<=2),a=i.find(c=>Number(c.fromMin)>=54&&Number(c.toMin)>=Number(c.fromMin));for(let c of i){if(n.length>=mt)break;let u=Number(c.fromMin),f=Number(c.toMin);if(!Number.isFinite(u)||!Number.isFinite(f)||o&&a&&u===0&&f<=2)continue;let p;a&&o&&u===Number(a.fromMin)&&f===Number(a.toMin)?(p=fi(u,59)+fi(0,Number(o.toMin)),u===54&&Number(o.toMin)===2&&(p=8)):f<u?p=fi(u,f):p=Math.max(1,f-u),p=Math.min(le,Math.max(1,p)),n.push({fromMin:u,durationMin:p})}return n}function Ja(t=new Date){try{let e=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t),n=i=>Number(e.find(o=>o.type===i)?.value||0);return{minute:n("minute"),second:n("second")}}catch{return{minute:t.getMinutes(),second:t.getSeconds()}}}function ue(t=new Date){let{minute:e}=Ja(t),n=Ya();for(let i of n)if(nu(e,i.fromMin,i.toMin))return i.slot;return 0}function No(t=new Date){if(ue(t))return 0;let{minute:e,second:n}=Ja(t),i=e*60+n,o=Ya(),a=[...new Set(o.map(u=>u.fromMin))].sort((u,f)=>u-f);for(let u of a){let f=u*60;if(i<f)return(f-i)*1e3}let c=a[0]??0;return(3600-i+c*60)*1e3}function rs(){let t=document.querySelector(h(r.selRow));if(t)return t;let e=document.querySelector("#post_select");if(!e)return null;let n=e.closest(".row");if(!n)return null;t=document.createElement("div"),t.id=r.selRow,t.dataset[q.mark]="",n.insertAdjacentElement("afterend",t);let i=document.createElement("span");return i.id=r.anchor,i.dataset[q.mark]="",i.dataset[q.w]=e.style.width,i.dataset[q.mw]=e.style.minWidth,i.hidden=!0,e.insertAdjacentElement("beforebegin",i),l.setStyle(e,"width","100%"),l.setStyle(e,"minWidth","0"),t.appendChild(e),t}var fn="waitPillState",iu=3600*1e3,Za=s.pillWait,ou=s.pillDone;function ru(t,e){let n=document.createElement("span");n.className=`${s.pill} ${e}`;let i=(o,a)=>{let c=document.createElement("span");c.className=o,c.textContent=a,n.appendChild(c)};return i(s.pillTtl,t.title),t.timer!==void 0&&i(s.pillTmr,t.timer),n}function au(t,e=Date.now()){if(t.kind==="waiting")return{variant:Za};if(t.kind==="running"){let n=Math.ceil((t.endTime-e)/1e3);return n>=0?{label:"Wait Time",seconds:n,variant:Za}:{label:"Elapsed Time",seconds:Math.floor((e-t.startTime)/1e3),variant:ou}}return null}function su(t,e,n=new Date){let i=ka(n);return t.seconds===void 0?{title:i}:{title:i,timer:an(t.seconds)}}var cu=class{#t=null;#e={kind:"idle"};#i=null;#n=null;#o=!1;#a=!1;waiting(){this.#s({kind:"waiting"})}run(t){let e=Date.now();this.#s({kind:"running",startTime:e,endTime:e+t*1e3})}async restore(){let t=(await chrome.storage.local.get(fn))[fn];if(chrome.storage.local.remove("suggestedWaitEndTime"),t?.kind==="running"){if(Date.now()-t.startTime>iu){chrome.storage.local.remove(fn);return}this.#s(t,{beeped:Date.now()>t.endTime})}}setClockMode(t){this.#o=t,this.#r(),this.#c()}toggleClockMode(){l.alive&&(this.setClockMode(!this.#o),chrome.storage.local.set({waitPillClock:this.#o}))}render(t){return au(this.#e,t)}#l(t){return su(t,this.#o,new Date)}#r(){if(this.#t??=uu(),!this.#t)return;let t=this.render();if(!t){this.#t.classList.add(s.hidden);return}this.#t.classList.remove(s.hidden),this.#t.replaceChildren(ru(this.#l(t),t.variant))}#s(t,{beeped:e=!1}={}){this.#e=t,this.#a=e,this.#i&&(l.clear(this.#i),this.#i=null),t.kind==="running"?(chrome.storage.local.set({[fn]:t}),this.#i=l.setInterval(()=>this.#u(),1e3)):chrome.storage.local.remove(fn),this.#r(),this.#c()}#u(){this.#r(),!(this.#e.kind!=="running"||this.#a)&&(Date.now()<=this.#e.endTime||(this.#a=!0,_("audioAlert").then(t=>{t&&wu()})))}#c(){let t=this.#e.kind==="waiting";t&&!this.#n?this.#n=l.setInterval(()=>this.#r(),1e3):!t&&this.#n&&(l.clear(this.#n),this.#n=null)}},Le=new cu,yn="pillPosition",ts=4;function es(t,e,n){return Math.max(e,Math.min(n,t))}function as(t){let e=t.getBoundingClientRect(),n=e.width>0&&e.width<window.innerWidth*.9?e.width:190,i=e.height>0?e.height:36;return{w:n,h:i}}function Pe(t,e,n){let{w:i,h:o}=as(t),a=es(e,0,Math.max(0,window.innerWidth-i)),c=es(n,0,Math.max(0,window.innerHeight-o));return t.style.setProperty("left",a+"px","important"),t.style.setProperty("top",c+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("width","max-content","important"),{left:a,top:c}}function lu(t){var e=!1,n=!1,i=0,o=0,a=0,c=0;function u(p){if(e){var m=p.touches?p.touches[0]:p,y=m.clientX-i,g=m.clientY-o;!n&&Math.abs(y)<ts&&Math.abs(g)<ts||(n=!0,t.setAttribute("data-dragging",""),t.dataset.skipClick="1",Pe(t,a+y,c+g),p.cancelable&&p.preventDefault())}}function f(){if(e){if(e=!1,t.removeAttribute("data-dragging"),document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",f),document.removeEventListener("touchmove",u),document.removeEventListener("touchend",f),n){let p=t.getBoundingClientRect();chrome.storage.local.set({[yn]:{top:Math.round(p.top),left:Math.round(p.left)}})}n=!1}}t.addEventListener("mousedown",function(p){if(p.button!==0)return;e=!0,n=!1,delete t.dataset.skipClick;let m=t.getBoundingClientRect();i=p.clientX,o=p.clientY,a=m.left,c=m.top,Pe(t,m.left,m.top),document.addEventListener("mousemove",u),document.addEventListener("mouseup",f),p.preventDefault(),p.stopPropagation()}),t.addEventListener("touchstart",function(p){e=!0,n=!1,delete t.dataset.skipClick;let m=t.getBoundingClientRect();i=p.touches[0].clientX,o=p.touches[0].clientY,a=m.left,c=m.top,Pe(t,m.left,m.top),document.addEventListener("touchmove",u,{passive:!1}),document.addEventListener("touchend",f)},{passive:!0})}function uu(){let t=document.querySelector(h(r.waitTime));return t||(t=document.createElement("div"),t.id=r.waitTime,t.className=s.hidden,t.title=`Shows Indian time (IST). Click to toggle.
Drag anywhere to move.
Moves aside automatically when the date calendar opens.`,document.body.appendChild(t),lu(t),chrome.storage.local.get(yn).then(e=>{let n=e[yn];n&&typeof n.top=="number"&&typeof n.left=="number"&&Pe(t,n.left,n.top)}),mu(t),t)}function ns(t,e,n=8){return!(t.right+n<e.left||t.left-n>e.right||t.bottom+n<e.top||t.top-n>e.bottom)}function du(){return document.querySelector("#ui-datepicker-div:not([style*='display: none'])")||document.querySelector(".ui-datepicker:not(.ui-helper-hidden)")||document.querySelector("#datepicker .ui-datepicker")||document.querySelector("#datepicker")}function fu(t){let{w:e,h:n}=as(t),i=12;return[{left:i,top:i},{left:Math.max(i,window.innerWidth-e-i),top:i},{left:i,top:Math.max(i,window.innerHeight-n-i)},{left:Math.max(i,window.innerWidth-e-i),top:Math.max(i,window.innerHeight-n-i)}]}async function pu(){let e=(await chrome.storage.local.get(yn))[yn];return e&&typeof e.top=="number"&&typeof e.left=="number"?e:null}function mu(t){let e=!1,n=async()=>{if(!l.alive||!t.isConnected||t.hasAttribute("data-dragging")||t.classList.contains(s.hidden))return;let i=du(),o=!!(i&&i.offsetParent!==null&&i.getBoundingClientRect().height>20),a=t.getBoundingClientRect();if(o&&ns(a,i.getBoundingClientRect())){let c=i.getBoundingClientRect(),u=fu(t),f=u.find(p=>{let m={left:p.left,top:p.top,right:p.left+a.width,bottom:p.top+a.height};return!ns(m,c)})||u[2];e=!0,t.setAttribute("data-dodging",""),Pe(t,f.left,f.top);return}if(e&&!o){e=!1,t.removeAttribute("data-dodging");let c=await pu();c&&Pe(t,c.left,c.top)}else o||t.removeAttribute("data-dodging")};l.setInterval(n,400),l.on(window,"resize",n)}async function Fo(){if(!l.alive||!await _("defaultWaitTime")||!await l.waitFor("#post_select",{attempts:ei}))return;let{waitPillClock:t}=await chrome.storage.local.get({waitPillClock:!1});Le.setClockMode(t),await Le.restore()}async function ss(){await _("defaultWaitTime")&&Le.waiting()}async function wi(t){await _("defaultWaitTime")&&Le.run(t)}function cs(){Le.toggleClockMode()}function ls(t){Le.setClockMode(t)}var pn=null,mn=null,pi=null;function Uo(){return pi||(pi=new(window.AudioContext||window.webkitAudioContext),l.disposable(()=>pi?.close())),pi}async function Si(t=150){try{let e=Uo();e.state==="suspended"&&await e.resume();let n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,e.currentTime);let o=e.currentTime,a=t/1e3;i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(.1,o+.01),i.gain.setValueAtTime(.1,o+Math.max(.01,a-.02)),i.gain.linearRampToValueAtTime(0,o+a),n.start(),n.stop(o+a)}catch(e){console.error("Audio beep failed:",e)}}function vi(t,e=125,n=125){let i=0,o=()=>{i>=t||(Si(e),i++,l.setTimeout(o,e+n))};o()}var Bo=4,is=50,os=50,hu=600;function us(){if(mn)return;let t=()=>{vi(Bo,is,os);let e=Bo*is+(Bo-1)*os;mn=l.setTimeout(t,e+hu)};t()}var gu=250,yu=10,bu=300,xu=1e3;function wu(){if(pn)return;let t=[];for(let o=0;o<=bu;o+=yu)t.push(o);let e=Date.now(),n=0,i=()=>{let o=Math.floor((Date.now()-e)/1e3);for(;n<t.length&&o>=t[n];){let a=n===t.length-1;Si(a?xu:gu),n++}if(n<t.length){let a=t[n],c=e+a*1e3,u=Math.max(0,c-Date.now());pn=l.setTimeout(i,u)}else qe()};i()}function qe(t={}){let e=!!t.keepConsular;pn&&(l.clear(pn),pn=null),mn&&(l.clear(mn),mn=null),Ho(),e||Wo()}var mi=null,hi=null,Ee=null,gi=null,hn=null;async function ds(){Ho();try{let t=Uo();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),a=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=880,i.frequency.value=1320,o.gain.value=.85,a.gain.value=.65,n.connect(o).connect(e),i.connect(a).connect(e);let c=t.createOscillator(),u=t.createGain();c.type="triangle",c.frequency.value=3.2,u.gain.value=280,c.connect(u),u.connect(n.frequency),u.connect(i.frequency);let f=t.currentTime;n.start(f),i.start(f),c.start(f),Ee={osc1:n,osc2:i,lfo:c,master:e};let p=()=>{Ee&&(Si(500),hi=l.setTimeout(p,1800))};p(),mi=l.setTimeout(Ho,12e4),hn=document.title;let m=!1,y=()=>{Ee&&(document.title=m?hn:"!!! SUBMIT CLICKED !!!",m=!m,gi=l.setTimeout(y,450))};y()}catch(t){console.error("Submit alarm failed:",t)}}function Ho(){if(mi&&(l.clear(mi),mi=null),hi&&(l.clear(hi),hi=null),gi&&(l.clear(gi),gi=null),hn&&(document.title=hn,hn=null),Ee){try{let{osc1:t,osc2:e,lfo:n}=Ee;t.stop(),e.stop(),n.stop()}catch{}Ee=null}}function Su(){let t=location.pathname||"";return/\/ofc-schedule\b/i.test(t)?!1:/\/(schedule|c-schedule)\b/i.test(t)}var vu=6e4,yi=null,bi=null,xi=null,gn=null,Ie=null;async function $u(){Wo();try{let t=Uo();t.state==="suspended"&&await t.resume();let e=t.createGain();e.gain.value=1,e.connect(t.destination);let n=t.createOscillator(),i=t.createOscillator(),o=t.createGain(),a=t.createGain();n.type="square",i.type="sawtooth",n.frequency.value=980,i.frequency.value=1470,o.gain.value=.95,a.gain.value=.8,n.connect(o).connect(e),i.connect(a).connect(e);let c=t.createOscillator(),u=t.createGain();c.type="square",c.frequency.value=4,u.gain.value=320,c.connect(u),u.connect(n.frequency),u.connect(i.frequency);let f=t.currentTime;n.start(f),i.start(f),c.start(f),Ie={osc1:n,osc2:i,lfo:c,master:e};let p=()=>{Ie&&(Si(650),bi=l.setTimeout(p,900))};p(),yi=l.setTimeout(Wo,vu),gn=document.title;let m=!1,y=()=>{Ie&&(document.title=m?gn:"!!! OFC BOOKED \u2014 CONSULAR PAGE !!!",m=!m,xi=l.setTimeout(y,400))};y()}catch(t){console.error("Consular OFC alarm failed:",t)}}function Wo(){if(yi&&(l.clear(yi),yi=null),bi&&(l.clear(bi),bi=null),xi&&(l.clear(xi),xi=null),gn&&(document.title=gn,gn=null),Ie){try{let{osc1:t,osc2:e,lfo:n}=Ie;t.stop(),e.stop(),n.stop()}catch{}Ie=null}}function fs(){if(Su()){try{let t="vsConsularOfcBeep";if(sessionStorage.getItem(t)==="1")return;sessionStorage.setItem(t,"1")}catch{}$u()}}function ku(){document.querySelector(h(r.recheck))?.remove();for(let t of document.querySelectorAll("button"))(t.textContent||"").trim()==="Recheck"&&t.remove()}async function zo(){l.alive&&ku()}async function jo(){if(!chrome.runtime?.id)return;let t=document.querySelector("#atlas-sidebar");if(!t||!await l.waitFor("#atlas-sidebar > *"))return;let e=[{link:"/AppointmentManager",text:"Manage Appointments"},{link:"/appointment-confirmation",text:"Appointment Confirmation"},{link:"/ofc-schedule?reschedule=true",text:"Reschedule OFC"},{link:"/schedule?reschedule=true",text:"Reschedule Consular"}];for(let n of e){let i=n.text.replace(/<[^>]*>/g,"");if([...t.children].some(u=>u.innerText.trim()===i))continue;let a=document.createElement("li");a.className="usa-sidenav__item",a.dataset[q.mark]="";let c=document.createElement("a");c.href=n.link,c.className=s.sideLink,c.target="_self",c.textContent=n.text,a.appendChild(c),t.appendChild(a)}}function H(t,e,n){let i=document.createElement(t);return e&&(i.className=e),n?.appendChild(i),i}function $i(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,a]=n;return`${a}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return null}function Ko(t){let e=$i(t);if(!e)return String(t||"");let[n,i,o]=e.split("-").map(Number);if(!n||!i||!o)return e;try{return new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(new Date(n,i-1,o))}catch{return e}}function Cu(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);if(n)return n[1].slice(0,5);let i=e.match(/^(\d{1,2}:\d{2})/);return i?i[1]:e}function ps(t){let e=document.querySelector(h(r.datesCont));if(e){let o=e.querySelector(h(r.datesPara)),a=e.querySelector("h2");if(a&&t&&(a.textContent=t),o)return{container:e,details:o}}let n=document.querySelector("#page_form");if(!n)return null;e?.remove();let i=Tu(t||"");return n.appendChild(i.container),i}function ms(t){if(t.response.HasError)return;let e=document.querySelector("#post_select"),n=e?.options[e.selectedIndex]?.text??"",i=(t.response.ScheduleDays||[]).map(p=>$i(p?.Date)).filter(Boolean).sort((p,m)=>p.localeCompare(m));document.querySelector(h(r.datesCont))?.remove();let o=ps(n);if(!o)return;let{details:a}=o;a.replaceChildren();let c=H("div",s.slotsSum,a);if(!i.length){c.textContent="No slots available";return}c.textContent=`${i.length} date${i.length===1?"":"s"} available`;let u={};for(let p of i){let m=p.slice(0,7);(u[m]||=[]).push(p)}for(let[p,m]of Object.entries(u)){let y=H("div",null,a),g=document.createElement("strong");g.textContent=p,y.append(g,`: ${m.map(b=>b.slice(8,10)).join(", ")}`)}let f=H("div",null,a);f.style.marginTop="0.5em";for(let p of i){let m=H("div",null,f);m.textContent=`\u2022 ${Ko(p)} (${p})`}}function hs(t,e,n){let i=document.querySelector("#post_select"),o=n||i?.options[i.selectedIndex]?.text||"",a=$i(e)||$i(t?.[0]?.Date)||"",c=(t||[]).filter(S=>S&&S.Time).map(S=>({time:Cu(S.Time),avail:S.EntriesAvailable!=null&&Number.isFinite(Number(S.EntriesAvailable))?Number(S.EntriesAvailable):null,raw:S})).sort((S,$)=>String(S.time).localeCompare(String($.time))),u=ps(o);if(!u)return;let{details:f}=u;f.replaceChildren();let p=H("div",s.slotsSum,f);if(!c.length){p.textContent=a?`No time slots on ${Ko(a)}`:"No time slots available";return}let m=c.filter(S=>S.avail==null||S.avail>0),y=m.reduce((S,$)=>S+($.avail||0),0),g=a?Ko(a):"selected date";if(p.textContent=y>0?`${m.length} time slot${m.length===1?"":"s"} on ${g} \xB7 ${y} available`:`${c.length} time slot${c.length===1?"":"s"} on ${g}`,a){let S=H("div",null,f);S.style.margin="0.35em 0 0.6em",S.textContent=`Date: ${g} (${a})`}let b=H("table",s.slotsTbl,f);b.id=r.slotsTbl;let x=H("thead",null,b),C=H("tr",null,x);for(let S of["Time","Availability"]){let $=H("th",null,C);$.textContent=S}let M=H("tbody",null,b);for(let S of c){let $=H("tr",null,M);S.avail===0&&($.style.opacity="0.55");let Q=H("td",null,$);Q.textContent=S.time;let tt=H("td",null,$);tt.textContent=S.avail==null?"\u2014":String(S.avail)}}function Tu(t){let e=H("div","row");e.id=r.datesCont;let n=H("div","col-sm-12 atlas_section mt-3",e),i=H("div","col-sm-12 atlas_section_header_row",H("div","row",n));H("h2",null,i).textContent=t;let o=H("div",null,H("div","col-sm-12",H("div","row",n)));return o.id=r.datesPara,{container:e,details:o}}var gs=null;function _u(){let t=document.querySelector(h(r.ofcDate));if(t)return t;let e=document.querySelector("#submitbtn");if(!e)return null;let n=e.parentElement;return l.setStyle(n,"display","flex"),l.setStyle(n,"alignItems","center"),l.setStyle(n,"justifyContent","flex-end"),l.setStyle(n,"gap","1em"),t=document.createElement("span"),t.id=r.ofcDate,t.dataset[q.mark]="",e.insertAdjacentElement("beforebegin",t),t}function Mu(){if(!location.pathname.includes("/schedule"))return;let t=gs;if(!Array.isArray(t)||t.length===0)return;let e=t[0];if(!e||!e.appointmentDateStr)return;let n=_u();n&&(n.textContent=`OFC (Estimate): ${Ca(e.appointmentDateStr)}`)}function ys(t){chrome.runtime?.id&&(gs=t.data.data,l.waitFor("#submitbtn").then(e=>{e&&Mu()}))}var ki=new Map,bs=45e3,Ci=new Map,xs=8e3,ws=0;function Ti(t){return(t||[]).filter(e=>e&&typeof e.Date=="string"&&e.Date.length>=10).map(e=>e.Date.slice(0,10))}function _i(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}catch{return t}}function Au(t,e){return`${t}:${e.slice(0,5).join(",")}`}function Du(t){let e=Date.now(),n=ki.get(t);if(n&&e-n<bs)return!1;ki.set(t,e);for(let[i,o]of ki)e-o>bs*4&&ki.delete(i);return!0}function Pu(t){let e=Date.now(),n=Ci.get(t);if(n&&e-n<xs)return!1;Ci.set(t,e);for(let[i,o]of Ci)e-o>xs*6&&Ci.delete(i);return!0}async function Ss(){return await _("telegramViaServer")!==!1}async function vs(t,{kind:e="alert",dedupKey:n="",skipDedup:i=!1,notifyMuktesh:o=!0}={}){if(t&&await Ss())try{await fetch(ma,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,caption:t,kind:e,dedup_key:n,skip_dedup:i,notify_muktesh:o}),signal:AbortSignal.timeout(2e4)})}catch{}}function Eu(t,{kind:e="screen",dedupKey:n="",waitMs:i=0,skipDedup:o=!1,notifyMuktesh:a=!0}={}){l.send({action:"telegramServerRelay",caption:t,kind:e,dedupKey:n,waitMs:i,skipDedup:o,notifyMuktesh:a,captureScreenshot:!0})}async function Iu(t,e,n){let i=Ti(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),a=["<b>VISA SLOTS AVAILABLE!</b>","",`\u{1F3DB}\uFE0F <b>Post:</b> ${t||"Unknown"}`];n&&a.push(`\u{1FAAA} <b>Visa:</b> ${n}`),a.push(`\u{1F550} <b>Checked:</b> ${o} IST`,"","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"),a.push(`\u{1F4C6} <b>Dates (${i.length}):</b>`,"");for(let c of i.slice(0,30))a.push(`\u{1F7E2} <b>${_i(c)}</b>`);return i.length>30&&a.push("",`\u2795 <i>+${i.length-30} more dates</i>`),a.push("","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501","\u{1F4F2} Visa Slot 6 \xB7 @visabook_slots_bot"),a.join(`
`)}function Lu(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"\u2014",i=document.querySelector("#datepicker")?.value||"\u2014",a=document.querySelector('table input[type="radio"]:checked, table input[type="checkbox"]:checked')?.closest("tr")?.textContent?.replace(/\s+/g," ").trim().slice(0,120)||"\u2014";return{city:e,date:i,time:a}}async function $s(t,{postId:e,postName:n,hasError:i}={}){if(i||!t?.length)return;let o=Ti(t);if(!o.length||!await _("telegramAlert"))return;let a=Au(e||n||"unknown",o);if(!Du(a))return;let c=await B(),u=await Iu(n,t,c?.visa||"");await vs(u,{kind:"slots",dedupKey:a,notifyMuktesh:!0})}function qu(t,e,n){let i=Ti(e),o=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),a=t||"Unknown city";if(n)return`<b>City changed \u2014 error</b>
\u{1F3DB}\uFE0F ${a}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`;if(i.length){let c=i.slice(0,5).map(u=>_i(u)).join(", ");return`<b>DATES AVAILABLE</b>
\u{1F3DB}\uFE0F ${a}
\u{1F4C6} ${i.length} date(s)
${c}${i.length>5?"\u2026":""}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}return`<b>City changed \u2014 no dates</b>
\u{1F3DB}\uFE0F ${a}
\u{1F550} ${o} IST
\u{1F4F2} Visa Slot 6`}function Ou(t,e){let n=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),i=e?_i(String(e).slice(0,10)):"\u2014";return`<b>Calendar open</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${i}
\u{1F550} ${n} IST
\u{1F4F2} Visa Slot 6`}function Ru(t,e,n){let i=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),o=e?_i(String(e).slice(0,10)):"\u2014";return`<b>Time slots loaded</b>
\u{1F3DB}\uFE0F ${t||"Unknown"}
\u{1F4C5} ${o}
\u23F0 ${n} slot(s)
\u{1F550} ${i} IST
\u{1F4F2} Visa Slot 6`}async function Oe(t,{kind:e="screen",dedupKey:n,waitMs:i=0,skipDedup:o=!1}={}){if(await _("telegramScreenshots")===!1||!await Ss())return;let a=n||`${e}:${String(t).slice(0,80)}`;!o&&!Pu(a)||Eu(t,{kind:e,dedupKey:a,waitMs:i,skipDedup:o,notifyMuktesh:!0})}async function ks(t,{postId:e,postName:n,hasError:i}={}){let o=qu(n,t,i),a=Ti(t),c=a.length?"dates":"city";await Oe(o,{kind:c,dedupKey:`${c}:${e||n}:${a.length}:${i?1:0}`,waitMs:a.length?1400:900})}async function Cs(t,e){await Oe(Ou(t,e),{kind:"calendar",dedupKey:`cal:${t}:${String(e).slice(0,10)}`,waitMs:650})}async function Ts(t,e,n){await Oe(Ru(t,e,n),{kind:"times",dedupKey:`times:${t}:${String(e).slice(0,10)}:${n}`,waitMs:500})}async function _s(){let t=Date.now();if(t-ws<8e3)return;ws=t;let e=await B(),{city:n,date:i,time:o}=Lu(),a=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),c=["<b>\u2705 SUBMIT CLICKED!</b>","",`\u{1F3DB}\uFE0F <b>City:</b> ${n}`,`\u{1F4C5} <b>Date:</b> ${i}`,`\u23F0 <b>Time:</b> ${o}`];e?.email&&c.push(`\u{1F464} <b>Account:</b> ${e.email}`),e?.visa&&c.push(`\u{1FAAA} <b>Visa:</b> ${e.visa}`),c.push(`\u{1F550} <b>When:</b> ${a} IST`,"","\u{1F4F2} Visa Slot 6 \u2014 Auto Submit");let u=c.join(`
`);await vs(u,{kind:"submit",skipDedup:!0,notifyMuktesh:!0}),await Oe(u,{kind:"submit",skipDedup:!0,waitMs:200})}var Ai=25;function Di(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function Vo(t,e){let n=Math.max(0,Number(t)||0);if(n<=0)return 0;let i=Number.isFinite(Number(e))?Number(e):0;return Math.min(Math.max(0,i),n-1)}function Ms(t){let e=(t?.textContent||"").replace(/\s+/g," ");return/\d{1,2}\s*:\s*\d{2}/.test(e)||/\b\d{1,2}\s*(AM|PM)\b/i.test(e)}function As(t){let e=t?.textContent||"";return!!/\bavailability\b[^0-9]*\b0\b/i.test(e)}function Ei(t){return!!(!t||t.closest("#ui-datepicker-div, .ui-datepicker, #post_select, #atlas-sidebar"))}function Go(t){if(t)try{t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}}function Mi(t){if(t)try{t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click()}catch{}}function Pi(t){if(!t||t.disabled)return!1;try{if(t.tagName==="SELECT")return!t.value||t.value==="0"?!1:(Go(t),t.value&&t.value!=="0"?!0:(Mi(t),!!(t.value&&t.value!=="0")));if(t.type==="radio"||t.type==="checkbox"){if(t.name)for(let i of document.getElementsByName(t.name))i!==t&&(i.checked=!1);t.checked=!0,Go(t);let e=t.id?document.querySelector(`label[for="${CSS.escape(t.id)}"]`):null,n=t.closest("tr");for(let i of[e,t.closest("label"),t,n].filter(Boolean))Mi(i);return t.checked=!0,Go(t),t.checked===!0}Mi(t)}catch{return!1}return t.checked===!0||t.tagName==="SELECT"}function Ds(){let t=document.querySelector('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked');return!t||Ei(t)?!1:Pi(t)}function Ps(){let t=new Set,e=[],n=i=>{if(!i||t.has(i)||Ei(i)||i.disabled)return;let o=i.closest("tr");o&&As(o)||(t.add(i),e.push(i))};for(let i of['#schedule-entries table input[type="radio"]','#schedule-entries table input[type="checkbox"]','#page_form table input[type="radio"]','#page_form table input[type="checkbox"]','table.atlas tbody input[type="radio"]','table tbody input[type="radio"]'])for(let o of document.querySelectorAll(`${i}:not([disabled])`))n(o);return e}function Nu(){let t=[];for(let e of["#schedule-entries table tbody tr","#page_form table tbody tr"])for(let n of document.querySelectorAll(e))!Ms(n)||As(n)||n.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])')&&t.push(n);return t}function Bu(t,e){for(let n of document.querySelectorAll('#time_select, select[name*="time" i], select[id*="time" i]')){if(n.tagName!=="SELECT"||n.disabled||Ei(n))continue;let i=[...n.options].filter(c=>!c.disabled&&c.value&&c.value!=="0"&&Ms({textContent:c.textContent}));if(!i.length)continue;let o=null,a=Di(e);if(a&&a!=="00:00"&&(o=i.find(c=>(c.textContent||"").includes(a))||null,!o)){let c=a.match(/(\d{1,2}:\d{2})/);c&&(o=i.find(u=>(u.textContent||"").includes(c[1]))||null)}if(!o){let c=Vo(i.length,t);o=i[c]}if(o&&(n.value=o.value,Pi(n)))return!0}return!1}function Hu(t,e){if(Bu(t,e))return!0;let n=Ps();if(n.length){let o=null,a=Di(e);if(a&&a!=="00:00"&&(o=n.find(c=>{let u=(c.closest("tr")?.textContent||c.textContent||"").replace(/\s+/g," ");return u.includes(a)||u.includes(a.slice(0,5))})||null),!o){let c=Vo(n.length,t);o=n[c]}if(o&&Pi(o))return!0}let i=Nu();if(i.length){let o=null,a=Di(e);if(a&&a!=="00:00"&&(o=i.find(f=>(f.textContent||"").includes(a))||null),!o){let f=Vo(i.length,t);o=i[f]}if(!o)return!1;let c=o.querySelector('input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])');if(c&&Pi(c))return!0;let u=o.querySelector("label");if(u)return Mi(u),!!o.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')}return!1}function G(){for(let t of document.querySelectorAll('#schedule-entries input[type="radio"]:checked, #schedule-entries input[type="checkbox"]:checked, #page_form table input[type="radio"]:checked, #page_form table input[type="checkbox"]:checked, table tbody input[type="radio"]:checked'))if(!Ei(t))return!0;for(let t of document.querySelectorAll('#time_select, select[name*="time" i]'))if(t.value&&t.value!=="0")return!0;return!1}function Wu({slotIndex:t=0,maxMs:e=12e3,pollMs:n=Ai,time:i,onTick:o}={}){let a=Date.now()+e,c=Math.max(10,n||25);return new Promise(u=>{let f=()=>{if(!l.alive)return u(!1);if(o?.(),Hu(t,i)||G())return u(!0);if(Date.now()>=a)return u(!1);l.setTimeout(f,c)};f()})}function bn({time:t,date:e,slotIndex:n,pollMs:i,maxMs:o}){let a=n??0,c=o||15e3,u=i||Ai;return l.send({action:"forcePickTimeSlot",slotIndex:a,maxMs:c,pollMs:u}),l.send({action:"selectFirstTime",time:t||"00:00",date:e||null,slotIndex:a,pollMs:u,domWaitMs:0,maxMs:c}),Wu({slotIndex:a,maxMs:c,pollMs:u,time:t||"00:00"})}var Yo=!1;function Es({shouldPick:t,slotIndex:e=0,onSlotPicked:n}={}){if(Yo)return;Yo=!0;let i=!1,o=async()=>{if(!(!l.alive||i)){if(G()){n?.();return}try{if(t&&!await t())return}catch{return}Ps().length&&(i=!0,await bn({slotIndex:e,time:"00:00",maxMs:800,pollMs:Ai}),i=!1,G()&&n?.())}};l.setInterval(o,Ai);let a=document.querySelector("#page_form")||document.body,c=new MutationObserver(()=>o());c.observe(a,{childList:!0,subtree:!0}),l.disposable(()=>{c.disconnect(),Yo=!1})}function Is(t){let e=(document.querySelector("#schedule-entries, #page_form")?.textContent||"").replace(/\s+/g," ");for(let n of(t||[]).slice(0,8)){let i=Di(n?.Time);if(!i)continue;let o=i.match(/(\d{1,2}):(\d{2})/);if(!o)continue;let[,a,c]=o;if(e.includes(`${a}:${c}`)||e.includes(`${parseInt(a,10)}:${c}`))return!0}return!1}var Ii="submitErrors",Ls=50,Fu=45e3,Os=0,Qo=new Set,xn=null,Rs=null;function Ns(t){Rs=typeof t=="function"?t:null}function Uu(){let t=document.querySelector("#post_select"),e=t?.options?.[t.selectedIndex]?.textContent?.trim()||"",i=document.querySelector("#datepicker")?.value||"";return{city:e,date:i,url:location.href}}function wn(){Os=Date.now()+Fu,Qo.clear(),Vu()}function Li(){return Date.now()<Os}function zu(t,e){return`${t}:${String(e||"").slice(0,240)}`}async function Ku(t){let e=await k({[Ii]:[]}),n=Array.isArray(e[Ii])?e[Ii]:[];n.push(t),n.length>Ls&&n.splice(0,n.length-Ls),await T({[Ii]:n})}function qs(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function ju(t){let e=new Date(t.at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}),n=["<b>\u26A0\uFE0F SUBMIT ERROR</b>","",`\u{1F4CD} <b>Source:</b> ${qs(t.source)}`,`\u{1F4AC} <b>Message:</b> ${qs(t.message)}`];t.city&&n.push(`\u{1F3DB}\uFE0F <b>City:</b> ${t.city}`),t.date&&n.push(`\u{1F4C5} <b>Date:</b> ${t.date}`),t.route&&n.push(`\u{1F517} <b>Route:</b> ${t.route}`),t.status&&n.push(`\u{1F310} <b>HTTP:</b> ${t.status}`),t.email&&n.push(`\u{1F464} <b>Account:</b> ${t.email}`),n.push(`\u{1F550} <b>When:</b> ${e} IST`,"","\u{1F4F2} Visa Slot 6");let i=n.join(`
`);await Oe(i,{kind:"submit_error",dedupKey:`submit_err:${t.source}:${t.message.slice(0,80)}`,waitMs:350})}async function Sn(t,e,n={}){let i=String(e||"").trim();if(!i||!Li()&&!n.force)return;let o=zu(t,i);if(Qo.has(o))return;Qo.add(o);let a=Uu(),c=await B(),u={at:Date.now(),source:String(t||"unknown"),message:i.slice(0,2e3),city:n.city||a.city,date:n.date||a.date,url:n.url||a.url,route:n.route||"",status:n.status!=null?String(n.status):"",email:c?.email||""};await Ku(u);try{await ju(u)}catch{}try{Rs?.(u)}catch{}}function Gu(t){if(!Li())return;let e=t?.status,n=t?.retryAfter,i=t?.cgiBlock,o=`Request failed (HTTP ${e||"?"})`;n!=null&&(o+=` \u2014 retry after ${n}s`),i&&(o+=" \u2014 CGI access limitation"),Sn("ajax_error",o,{status:e})}function Bs(t){if(!Li()||!t)return;let e=t.response||{};if(t.retryAfter!==void 0){Gu({status:t.status||429,retryAfter:t.retryAfter,cgiBlock:t.cgiBlock});return}if(!e.HasError)return;let n=e.ErrorString||"",o=(n?new DOMParser().parseFromString(n,"text/html").body.innerText.trim():"")||"Server returned HasError with no message";Sn("ajax_response",o,{route:t.tail||""})}var Yu=[".atlas_validationalert",".alert-danger",".validation-summary-errors","#error_row .alert",".field-validation-error"];function Vu(){xn&&l.clear(xn);let t=()=>{if(!l.alive||!Li()){xn=null;return}for(let e of Yu)for(let n of document.querySelectorAll(e)){let i=(n.textContent||"").replace(/\s+/g," ").trim();!i||i.length<4||Sn("page_validation",i)}xn=l.setTimeout(t,600)};xn=l.setTimeout(t,500)}var vn=0,Hs="",Ws=0;async function Qu(){let[t,e]=await Promise.all([B(),k(["cgiIdToken"])]),n=Ae(e.cgiIdToken);return{profile:t,token:n}}async function Xo(t){if(!j()||!await _("serverSync"))return null;let{profile:e,token:n}=await Qu();if(!e?.id&&!e?.email)return null;try{let i=await ce().catch(()=>({})),o={...t,profile:e,...i};n&&(o.token=n);let a=await fetch(ha,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o),signal:AbortSignal.timeout(2500)}).then(c=>c.json());return a&&a.success?a:null}catch{return null}}async function Fs({postId:t,postName:e}={}){let n=String(t||"").trim();return n?Xo({action:"cool",city:{id:n,name:String(e||n).trim()}}):null}async function Us({postId:t,postName:e,dayCount:n,dateFrom:i=null,dateTo:o=null,bestDate:a=null,rangeFrom:c=null,rangeTo:u=null}={}){let f=String(t||"").trim(),p=Number(n)||0;if(!f||p<1)return null;let m=String(a||i||"").slice(0,10),y=`${f}:${p}:${m}`,g=Date.now();if(y===Hs&&g-Ws<250)return null;Hs=y,Ws=g;let b=await Xo({action:"alert",city:{id:f,name:String(e||f).trim()},dayCount:p,dateFrom:i||c||m||null,dateTo:o||u||m||null,bestDate:m||null,rangeFrom:c||null,rangeTo:u||null});return b?.alertId&&(vn=Math.max(vn,Number(b.alertId)||0)),b}async function zs({preferredCities:t=[],citiesEnabled:e=!1,currentCityId:n="",dateFrom:i=null,dateTo:o=null}={}){if(!e||!t?.length)return null;let c=(await Xo({action:"poll",preferredCities:t,citiesEnabled:!0,currentCityId:String(n||""),lastAlertId:vn,dateFrom:i||null,dateTo:o||null}))?.forceCity;return!c?.id||!c?.alertId?null:c}function $n(t){let e=Number(t)||0;e>vn&&(vn=e)}var Xu=["cities","from","to","submitEnabled","citiesEnabled","enabled","slotWindows","termsAgreed","termsPassed","termsAgreedAt"];function Ks(t){if(!t||typeof t!="object")return{};let e={};for(let n of Xu)n in t&&(e[n]=t[n]);return typeof e.submitEnabled!="boolean"&&typeof e.enabled=="boolean"&&(e.submitEnabled=e.enabled),delete e.enabled,e}function js(t,e){if(!e||typeof e!="object")return t||null;let n=t&&typeof t=="object"?{...t}:{},i=Number(n.serverUpdatedAt)||0,o=Number(e.updatedAt)||0;if(o&&i&&o<i)return n;let a=Ks(e);Array.isArray(a.cities)&&!a.cities.length&&Array.isArray(n.cities)&&n.cities.length&&delete a.cities;let c={...n,...a};return typeof a.submitEnabled=="boolean"&&(c.enabled=a.submitEnabled),e.updatedAt&&(c.serverUpdatedAt=e.updatedAt),c}async function Gs(){let[t,e]=await Promise.all([B(),k(["cgiIdToken"])]),n=Ae(e.cgiIdToken);return{profile:t,token:n}}async function Ys(t){if(!j()||!await _("serverSync"))return!1;let e=Ks(t);if(!Object.keys(e).length)return!1;let{profile:n,token:i}=await Gs();if(!n?.id&&!n?.email)return!1;try{let o=await ce().catch(()=>({})),a={profile:n,prefs:e,...o};i&&(a.token=i);let c=await fetch(Zn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then(u=>u.json());return!!(c&&c.success)}catch{return!1}}async function Vs(){if(!j()||!await _("serverSync"))return null;let{profile:t,token:e}=await Gs();if(!t?.id&&!t?.email)return null;try{let n=new URLSearchParams;t.id&&n.set("applicant_id",String(t.id)),t.email&&n.set("email",String(t.email));let i=await fetch(`${Zn}?${n.toString()}`,{method:"GET",headers:{Accept:"application/json"}}).then(a=>a.json());if(i?.prefs)return i.prefs;let o={profile:t};return e&&(o.token=e),i=await fetch(Zn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(a=>a.json()),i?.prefs||null}catch{return null}}var Ne=null,de="",Re=[];function kn(t){return String(t||"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e])}function Ju(t){let e=String(t||"").slice(0,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(e))return"";let[n,i,o]=e.split("-"),a=["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${Number(o)} ${a[Number(i)]} ${n}`}async function Zu(){let t=await fetch(ya||`${at}/contribute/community-slots`,{method:"POST",headers:{"Content-Type":"application/json"},body:"{}",signal:AbortSignal.timeout(15e3)}),e=await t.json().catch(()=>({}));return!t.ok||!e.success?[]:Array.isArray(e.cities)?e.cities:[]}function td(t){let e=Array.isArray(t.months)?t.months:[];return e.length?e.map(n=>{let i=(n.dates||[]).map(o=>`<span class="${s.comDate}">${kn(o)}</span>`).join("");return`
        <div class="${s.comMonth}">
          <div class="${s.comMonthLabel}">${kn(n.label)} \u2014 dates</div>
          <div class="${s.comDates}">${i}</div>
        </div>`}).join(""):`<div class="${s.comEmpty}">No dates in this report.</div>`}function Xs(){let t=document.querySelector(h(r.comList)),e=document.querySelector(h(r.comFoot));if(t){if(!Re.length){t.innerHTML=`<div class="${s.comEmpty}">No community dates yet. Keep checking \u2014 shared finds show here.</div>`,e&&(e.textContent="Shared by all users \xB7 refreshes live");return}t.innerHTML=Re.map(n=>{let i=de&&de===String(n.postId),o=Ju(n.earliest);return`
        <div class="${s.comRow}${i?` ${s.comOpen}`:""}" data-post="${kn(n.postId)}">
          <button type="button" class="${s.comMain}" data-com-toggle>
            <span class="${s.comChevron}" aria-hidden="true">${i?"\u25BE":"\u25B8"}</span>
            <span style="flex:1;min-width:0;text-align:left">
              <span class="${s.comName}">${kn(n.name)}</span>
              <span class="${s.comMeta}">${Number(n.dateCount)||0} dates${o?` \xB7 earliest ${o}`:""} \xB7 ${kn(n.seenAgo||"")} ago</span>
            </span>
            <span class="${s.comPill}">Slots</span>
          </button>
          <div class="${s.comDrop}" ${i?"":"hidden"}>${td(n)}</div>
        </div>`}).join(""),e&&(e.textContent=`${Re.length} cit${Re.length===1?"y":"ies"} with dates \xB7 Shared by all users`),t.querySelectorAll("[data-com-toggle]").forEach(n=>{l.on(n,"click",i=>{i?.preventDefault?.(),i?.stopPropagation?.();let a=n.closest(`.${s.comRow}`)?.getAttribute("data-post")||"";de=de===a?"":a,Xs()}),l.on(n,"pointerdown",i=>i.stopPropagation())})}}async function Qs(){if(document.querySelector(h(r.comCard))){try{Re=await Zu()}catch{}de&&!Re.some(e=>String(e.postId)===de)&&(de=""),Xs()}}function Js(){Cn(),Qs();let t=()=>{Ne=null,Qs().finally(()=>{document.querySelector(h(r.comCard))&&(Ne=l.setTimeout(t,45e3))})};Ne=l.setTimeout(t,45e3)}function Cn(){Ne&&(l.clear(Ne),Ne=null)}var qi=3,J=[],fe=null,Yt=!1;try{Yt=sessionStorage.getItem("tikTikHudMin")==="1"}catch{}function Zs(t,e){Yt=!!e;try{sessionStorage.setItem("tikTikHudMin",Yt?"1":"0")}catch{}if(!t)return;t.classList.toggle(s.hudMin,Yt);let n=t.querySelector(h(r.hudToggle));n&&(n.textContent=Yt?"+":"\u2013",n.setAttribute("aria-label",Yt?"Expand status":"Minimise status"))}function Tn(t,e){let n=String(t||"").trim();if(!n)return;let i=String(e||n).trim()||n;if(J.length&&J[0].slots==null&&J[0].id!==n&&(J[0].slots=!1),J[0]?.id===n){J[0].name=i||J[0].name;return}J.unshift({id:n,name:i,slots:null}),J.length>qi&&(J.length=qi)}function Jo(t,e,n){let i=String(t||"").trim();if(!i)return;let o=J.find(a=>a.id===i);if(o){o.slots=!!e,n&&(o.name=String(n).trim()||o.name);return}J.unshift({id:i,name:String(n||i).trim()||i,slots:!!e}),J.length>qi&&(J.length=qi)}function ed(){let t=document.querySelector(h(r.hud));if(t)return t;t=document.createElement("div"),t.id=r.hud,t.className=s.hud,t.dataset[q.mark]="",t.innerHTML=`
    <div class="${s.hudHead}">
      <span>Tik Tik</span>
      <span class="${s.hudMiniSecs}" id="${r.hudSecs}-mini"></span>
      <button type="button" id="${r.hudToggle}" class="${s.hudToggle}" aria-label="Minimise status">\u2013</button>
    </div>
    <div class="${s.hudName}" id="${r.hudName}">\u2014</div>
    <div class="${s.hudVisa}" id="${r.hudVisa}">Visa \xB7 \u2014</div>
    <div class="${s.hudBody}" id="${r.hudBody}"></div>
    <div class="${s.hudHist}" id="${r.hudHist}"></div>
  `,document.documentElement.appendChild(t);let e=t.querySelector(h(r.hudToggle));return e&&(l.on(e,"pointerdown",n=>n.stopPropagation()),l.on(e,"click",n=>{n.preventDefault(),n.stopPropagation(),Zs(t,!Yt)})),Zs(t,Yt),t}function tc(t){return t==null||!Number.isFinite(t)?null:Math.max(0,Math.floor(Number(t)+1e-9))}function nd(t,e){if(!t)return;let n=tc(e.secondsUntilHop);if(e.submitPending){t.replaceChildren();let i=document.createElement("div");i.className=s.hudSubmit;let o=document.createElement("div");o.className=s.hudSubmitTitle,o.textContent="SUBMIT CLICKED";let a=document.createElement("div");a.className=s.hudSubmitSub,a.textContent="Waiting for confirmation\u2026",i.append(o,a),t.appendChild(i);return}if(e.loadingStuck){t.replaceChildren();let i=document.createElement("div");i.className=s.hudStuck,i.textContent="Date Loading\u2026",t.appendChild(i);return}if(e.rotateActive&&n!=null){let i=t.querySelector(`.${s.hudCount}`),o=t.querySelector(h(r.hudSecs));if(!i||!o){t.replaceChildren(),i=document.createElement("div"),i.className=s.hudCount;let a=document.createElement("span");a.className=s.hudCountLabel,a.textContent="Next city change",o=document.createElement("span"),o.id=r.hudSecs,o.className=s.hudSecs,i.append(a,o),t.appendChild(i)}o.textContent=`${n}s`;return}t.replaceChildren()}function id(t){if(!t)return;t.replaceChildren();let e=document.createElement("div");if(e.className=s.hudHistTitle,e.textContent="Last 3 cities",t.appendChild(e),!J.length){let n=document.createElement("div");n.className=s.hudHistRow,n.textContent="No hops yet",t.appendChild(n);return}for(let n of J){let i=document.createElement("div");i.className=s.hudHistRow;let o=document.createElement("span");o.textContent=n.name||n.id;let a=document.createElement("span");n.slots===!0?(a.className=s.hudPillOk,a.textContent="Slots"):n.slots===!1?(a.className=s.hudPillNo,a.textContent="No slots"):(a.className=s.hudPillNo,a.textContent="\u2026"),i.append(o,a),t.appendChild(i)}}async function ec(t={}){if(!l.alive)return;if(t.hide){document.querySelector(h(r.hud))?.remove();return}let e=ed();e.querySelector(h(r.hudCities))?.remove();let n=await B().catch(()=>null),i=n?.name&&String(n.name).trim()||n?.email&&String(n.email).trim()||"\u2014",o=n?.visa&&String(n.visa).trim()||n?.visaClass&&String(n.visaClass).trim()||"\u2014",a=e.querySelector(h(r.hudName)),c=e.querySelector(h(r.hudVisa));a&&(a.textContent=i),c&&(c.textContent=`Visa \xB7 ${o}`),nd(e.querySelector(h(r.hudBody)),t),id(e.querySelector(h(r.hudHist)));let u=e.querySelector(h(`${r.hudSecs}-mini`));if(u){let f=tc(t.secondsUntilHop);u.textContent=t.rotateActive&&f!=null?`${f}s`:""}e.querySelector(h(r.hudToggle))||(e.remove(),ec(t))}function nc(t){if(fe)return;let e=async()=>{if(fe=null,!!l.alive){try{let n=typeof t=="function"?await t():{};await ec(n||{})}catch{}l.alive&&(fe=l.setTimeout(e,1e3))}};fe=l.setTimeout(e,200)}function Zo(){fe&&(l.clear(fe),fe=null)}var Xt="aiSubmitByAccount",je=8e3;var Y=25;var On=0,Dn=1e4,wc=1e3;function Ge(t){let e=Math.max(0,Number(t)||0);return e<=0?-1:e===1?0:e===2?1:2}function mr(){return v.cityRotateMinGapMs}function od(){return v.cityRotateMaxGapMs}function Pn(){return v.cityHoldMaxMs}function Lt(){return v.cityLoadingMaxMs}function Qt(){return v.cityCalendarNoDatesMs}var ic=5e3,or=2e4,rd=15e3;function Rn(){return/\/(schedule|ofc-schedule)\/?$/i.test(location.pathname)||/\/(schedule|ofc-schedule)\b/i.test(location.pathname)}function kt(){return/\/ofc-schedule\b/i.test(location.pathname)}function D(){return!!(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))}var ad=[["What is your mother's maiden name?","What was the name of your first/current/favorite pet?","What was your first car?","What elementary school did you attend?","What is the name of the town/city where you were born?"],["Where did you meet your spouse?","What is your sibling's middle name?","Who was your childhood hero?","In what city or town was your first job?","What is the name of a college you applied to but didn't attend?"],["What is the name of the road/street you grew up on?","What is your least favorite food?","What was the first company that you worked for?","What is your favorite food?","What high school did you attend?"]];function _n(t,e){let n=ad[t]||[];return`<option value="">Select 1 question from set ${t+1}</option>`+n.map(o=>{let a=e===o?" selected":"";return`<option value="${o.replace(/"/g,"&quot;")}"${a}>${o}</option>`}).join("")}function He(){let t=new Date,e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function En(t){try{let[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return t}}function sd(t,e,n){return`${t}-${String(e+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`}function cd(t){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(t))return null;let[e,n,i]=t.split("-").map(Number),o=new Date(e,n-1,i);return o.getFullYear()!==e||o.getMonth()!==n-1||o.getDate()!==i?null:o}function hr(){for(let t of["from","to"]){let e=document.querySelector(h(t==="from"?r.aiFrom:r.aiTo)),n=document.querySelector(h(t==="from"?r.aiFromBtn:r.aiToBtn));if(!n)continue;let i=e?.value||"";n.textContent=i?En(i):"Select date"}}function tr(t,e){let n=document.querySelector(h(t==="from"?r.aiFrom:r.aiTo));if(n&&(n.value=e||""),t==="from"){let i=document.querySelector(h(r.aiTo));i&&e&&i.value&&i.value<e&&(i.value="")}hr()}var lt={y:0,m0:0,which:"from"};function ge(){document.querySelector(h(r.aiCal))?.classList.add(s.hidden)}function gr(t){let e=t.target;return e?e.nodeType===3?e.parentElement:e:null}function rr(){let t=document.querySelector(h(r.aiCal));if(!t)return;let{y:e,m0:n,which:i}=lt,o=document.querySelector(h(i==="from"?r.aiFrom:r.aiTo))?.value||"",a=He(),c=i==="to"&&document.querySelector(h(r.aiFrom))?.value||He(),u=new Date(e,n,1).toLocaleDateString("en-IN",{month:"long",year:"numeric"}),f=new Date(e,n,1).getDay(),p=new Date(e,n+1,0).getDate(),m=new Date(e,n,0).getDate(),y="";for(let g of["S","M","T","W","T","F","S"])y+=`<div class="${s.aiHint}">${g}</div>`;for(let g=0;g<42;g++){let b,x=e,C=n,M=!1;g<f?(b=m-f+g+1,C=n-1,C<0&&(C=11,x=e-1),M=!0):g>=f+p?(b=g-f-p+1,C=n+1,C>11&&(C=0,x=e+1),M=!0):b=g-f+1;let S=sd(x,C,b),$=S<c,Q=[s.aiCalDay,M?s.aiCalMuted:"",$?s.aiCalMuted:"",S===a?s.aiCalToday:"",S===o?s.aiCalOn:""].filter(Boolean).join(" ");y+=`<button type="button" class="${Q}" data-iso="${S}" ${$?'disabled aria-disabled="true"':""}>${b}</button>`}t.innerHTML=`
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
  `}function ld(t){let e=document.querySelector(h(r.aiCal)),i=gr(t)?.closest?.("button");if(!e||!i||!e.contains(i))return;t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation();let o=i.getAttribute("data-cal"),a=lt.which,c=a==="to"&&document.querySelector(h(r.aiFrom))?.value||He();if(o==="prev"){lt.m0-=1,lt.m0<0&&(lt.m0=11,lt.y-=1),rr();return}if(o==="next"){lt.m0+=1,lt.m0>11&&(lt.m0=0,lt.y+=1),rr();return}if(o==="clear"){tr(a,""),ge();return}if(o==="today"){let f=He();f>=c&&(tr(a,f),ge(),bc());return}if(i.disabled||i.getAttribute("aria-disabled")==="true")return;let u=i.getAttribute("data-iso");!u||u<c||(tr(a,u),ge(),bc())}function oc(t){let e=document.querySelector(h(r.aiCal));if(!e||!t)return;let n=t.getBoundingClientRect(),i=Math.min(340,window.innerWidth-16),o=e.offsetHeight||360,a=Math.max(8,Math.min(n.left,window.innerWidth-i-8)),c=n.bottom+6;c+o>window.innerHeight-8&&n.top-6-o>=8?c=n.top-6-o:c=Math.max(8,Math.min(c,window.innerHeight-o-8)),e.style.position="fixed",e.style.top=`${Math.round(c)}px`,e.style.left=`${Math.round(a)}px`,e.style.width=`${i}px`,e.style.right="auto",e.style.bottom="auto"}var yr=0;function ud(t,e){let n=document.querySelector(h(r.aiCal));n||(n=document.createElement("div"),n.id=r.aiCal,n.className=`${s.aiCal} ${s.hidden}`,n.dataset[q.mark]="",document.body.appendChild(n),l.on(n,"pointerdown",ld,{capture:!0}),l.on(n,"click",a=>{n.contains(gr(a))&&(a.preventDefault(),a.stopPropagation())},{capture:!0}));let i=document.querySelector(h(t==="from"?r.aiFrom:r.aiTo))?.value,o=cd(i)||new Date;lt={y:o.getFullYear(),m0:o.getMonth(),which:t},rr(),n.classList.remove(s.hidden),yr=Date.now(),oc(e),requestAnimationFrame(()=>oc(e))}function Wt(t){return t?typeof t.submitEnabled=="boolean"?t.submitEnabled:!!t.enabled:!1}function Bt(t){return!!(t&&t.citiesEnabled)}async function I(){let t=await B();return t?.id?String(t.id):null}async function A(t){return t&&((await k(Xt))[Xt]||{})[t]||null}async function Nn(t,e){if(!t)return;let i=(await k(Xt))[Xt]||{};e==null?delete i[t]:i[t]=e,await T({[Xt]:i})}var N=!1;function Ye(){return N}function Ue(){N=!0,ne(),ye()}function Ct(){N=!1,W=!1,ne()}async function Ni(t){$c(),Ue();let e=await A(t);if(!e){ft();return}e.submitEnabled=!1,e.citiesEnabled=!1,e.enabled=!1,e.usedAt=Date.now(),await Nn(t,e),ft()}var Z=!1,pe=null,Vt=null,rc=2e4,Bi=new Set,ar="",We="",dd=420*1e3,Hi=new Map;function Sc(){return String(document.querySelector("#post_select")?.value||"").trim()}function vc(t=Date.now()){for(let[e,n]of Hi)n<=t&&Hi.delete(e)}function Ve(t){let e=String(t||"").trim();if(!e)return!1;vc();let n=Hi.get(e);return!!(n&&n>Date.now())}function br(t,e=""){let n=String(t||Sc()||"").trim();if(n){Hi.set(n,Date.now()+dd);try{Jo(n,!1,e||void 0)}catch{}Fs({postId:n,postName:e}).catch(()=>{}),Tt(),O=!1,z=0,W=!1,L&&!N&&!Z?(nt(Date.now()),w(`Submit missing \u2014 not hot; hopping off ${e||n}\u2026`),P()):w(`Submit missing on ${e||n} \u2014 not hot (City Change off or pending)`)}}function fd(){if(!Be()||!G())return;let t=document.querySelector("#post_select"),e=t?String(t.value||""):"";if(!e||Ve(e))return;let n=t?.selectedOptions?.[0]?.textContent?.trim()||t?.options?.[t.selectedIndex]?.textContent?.trim()||e;Us({postId:e,postName:n,dayCount:1,bestDate:We||null,dateFrom:We||null,dateTo:We||null}).catch(()=>{})}function $c(){Z=!1,pe&&(l.clear(pe),pe=null),Vt&&(l.clear(Vt),Vt=null)}function Ki(){Bi.clear(),ar=""}function pd(t){let e=String(t||"").slice(0,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(e))return;let n=String(document.querySelector("#post_select")?.value||"");n!==ar&&(Bi.clear(),ar=n),Bi.add(e)}function ji(t){let e=String(t||"").slice(0,10);/^\d{4}-\d{2}-\d{2}$/.test(e)&&(We=e)}function md(){let t=document.querySelector("#datepicker"),e=String(t?.value||"").trim();if(!e)return We||"";if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,i,o,a]=n;return`${a}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}return We||""}async function xr(t="No time slots"){if(N||D()||!kt()||Z)return null;let n=await bt()||await Xe();if(!n?.from||!n?.to)return null;let i=document.querySelector("#post_select"),o=i?String(i.value):"";if(!o)return null;let a=md();a&&pd(a);let u=(await Pt()).find(x=>String(x.ID)===o),p=Ln(u?.Days||[],n.from,n.to).filter(x=>!Bi.has(String(x.Date).slice(0,10)));if(!p.length)return null;let m=Ge(p.length),y=p[m];if(!y?.Date)return null;let g=String(y.Date).slice(0,10);ji(g),z=0,rt(),Ct();let b=`${t} \u2014 trying next date #${m+1} (${g}) (${p.length} left in range)\u2026`;return w(b),R(b),l.send({action:"selectFirstDate",date:g,maxMs:je,pollMs:Y}),g}async function ac(){return!!await xr("Submit failed")}async function Bn(t){if(D()||sc()){t?await Ni(t):Ue(),w("Booking confirmed \u2014 Tik Tik stopped.");return}Z=!0,rt(),wn(),w("Submit clicked \u2014 waiting for confirmation (Auto Submit + City Change stay ON)\u2026"),Vt&&l.clear(Vt);let e=Date.now(),n=async()=>{if(Vt=null,!(!Z||!l.alive)){if(sc()||D()){let i=t||await I();i?await Ni(i):Ue(),w("Booking confirmed \u2014 Tik Tik stopped.");return}if(Date.now()-e>=rc){await In("no confirmation yet \u2014 resuming city checks");return}Vt=l.setTimeout(n,400)}};Vt=l.setTimeout(n,400),pe&&l.clear(pe),pe=l.setTimeout(()=>{pe=null,Z&&In("submit wait timed out \u2014 resuming city checks")},rc)}function sc(){if(/\/(interview|confirmation|appointment-confirmation|reschedule-confirmation|schedule\/confirm)/i.test(location.pathname)||document.querySelector("#appointment-confirmation, .appointment-confirmation"))return!0;let t=(document.body?.innerText||"").slice(0,2500);return/appointment\s+confirmation|successfully\s+scheduled|your\s+appointment\s+has\s+been/i.test(t)}async function In(t=""){if(!Z&&!O&&!W){if(await ac())return;Ht();return}$c(),W=!1,ne(),N&&Ct();let e=t?`Submit failed (${t})`:"Submit failed";if(await ac()){w(`${e} \u2014 staying on city; trying another date\u2026`);return}if(Ki(),Ht(),w(`${e} \u2014 no other dates in range; hopping cities\u2026`),L)nt(Date.now()),P();else{let i=await I();if(i){let o=await A(i);Bt(o)&&await Fn()}}}function Qe(){return Z}function be(t,e,n){let i=String(t||"").slice(0,10);return!(!i||i.length<10||e&&i<e||n&&i>n)}async function Xe(){if(N||D()||!kt())return null;let t=await I();if(!t)return null;let e=await A(t),n=e?.from?String(e.from).slice(0,10):"",i=e?.to?String(e.to).slice(0,10):"";return!n||!i||n.length<10||i.length<10?null:{from:n,to:i,accountId:t,submitArmed:Wt(e)}}async function bt(){if(N||D()||!kt())return null;let t=await I();if(!t)return null;let e=await A(t);return!Wt(e)||!e.from||!e.to?null:{...e,accountId:t}}async function xe(){if(N||D()||!kt())return null;let t=await I();if(!t)return null;let e=await A(t);return!Bt(e)||!e.cities?.length?null:(qc(e),{...e,accountId:t})}function Ln(t,e,n){let i=new Date;return i.setHours(0,0,0,0),(t||[]).map(o=>{if(!o)return null;let a=o.Date!=null?o.Date:o.date,c=hd(a);return c?{...o,Date:c}:null}).filter(Boolean).filter(o=>be(o.Date,e,n)).filter(o=>{let[a,c,u]=o.Date.slice(0,10).split("-").map(Number);return new Date(a,c-1,u)>=i}).sort((o,a)=>String(o.Date).localeCompare(String(a.Date)))}function hd(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,a,c]=n;return`${c}-${String(o).padStart(2,"0")}-${String(a).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime()))return`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}-${String(o.getDate()).padStart(2,"0")}`}return null}var W=!1,qt=null,Ot=null,gt=!1,Rt=0,L=!1,it=0,ct=0,Jt=0,Zt=0,ee=!1,wt=null,ut=0,O=!1,z=0,Fe=null,me=null,Nt=0,cc=!1,er="",Mn="",wr=0,lc="",uc=!1,sr=0;function gd(t){return(t||[]).map(e=>e.id).join("")}function yd(){let t=document.querySelector(h(r.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>String(e.value)):[]}function dc(t){let e=document.querySelector(h(r.aiCities));if(e)for(let n of e.querySelectorAll('input[type="checkbox"]'))n.checked=t}function ne(){qt&&(l.clear(qt),qt=null),W=!1}function Tt(){Fe&&(l.clear(Fe),Fe=null)}function kc(){Tt(),z||(z=Date.now());let t=Math.max(500,Pn()-(Date.now()-z));Fe=l.setTimeout(()=>{Fe=null,!(!O||!L||!l.alive)&&(O=!1,z=0,nt(Date.now()),w(`City Change \u2014 booking hold timed out (${Pn()/1e3}s); next city in 15\u201318s\u2026`),P())},t)}function bd(){me&&(l.clear(me),me=null)}function Gi(t=Date.now()){let e=!1;if(gt&&Rt&&t-Rt>=rd&&(gt=!1,Rt=0,e=!0),O&&(z||(z=t),t-z>=Pn()?(Tt(),O=!1,z=0,e=!0):Fe||kc()),ee){ut||(ut=t);let i=Wi()?Lt():Qt();if(t-ut>=i)dt(),e=!0;else if(!wt){let o=Math.max(500,i-(t-ut));wt=l.setTimeout(()=>{if(wt=null,!L||O)return;let a=Wi(),c=a?Lt():Qt();if(Date.now()-(ut||0)<c){Gi();return}dt(),nt(Date.now()),w(a?`City Change \u2014 still Loading after ${Lt()/1e3}s; changing city\u2026`:`City Change \u2014 calendar up but no dates after ${Qt()/1e3}s; changing city\u2026`),P()},o)}}return W&&!qt&&(W=!1,e=!0),e}function Cc(){if(me||!L)return;let t=()=>{if(me=null,!L||!l.alive||N)return;let e=Date.now(),n=Gi(e),i=!!ue(new Date(e)),o=!!Ot,a=!i&&o||ee||O||W||Z,c=!a&&Nt>0&&e-Nt>=or;(n||c||!o&&!gt&&!a)&&(c?(gt=!1,Rt=0,dt(),!O&&!Z&&(Tt(),z=0),W&&!qt&&(W=!1),it=e,w(i?"City Change \u2014 unstuck; hopping now\u2026":`City Change \u2014 unstuck; waiting for IST window ${De()}\u2026`)):n?(!O&&!Z&&(it=e),w(i?"City Change \u2014 lock cleared; hopping now\u2026":`City Change \u2014 lock cleared; next IST window ${De()}\u2026`)):w("City Change \u2014 timer lost; restarting\u2026"),Nt=e,P()),L&&(me=l.setTimeout(t,ic))};me=l.setTimeout(t,ic)}function ye(){Cr(),bd(),Md(),Tt(),gt=!1,Rt=0,L=!1,O=!1,z=0,it=0,ct=0,Nt=0,dt()}async function xd(){if(!kt()||D()||N)return{hide:!0};let t=Date.now(),e=!!Z,n=!!(ee&&Wi()),i=null;if(L&&!e&&!n)if(ee&&ut){let o=Math.max(0,Qt()-(t-ut));i=Math.max(0,Math.ceil(o/1e3))}else O||St>t?i=null:ue(new Date(t))?i=Math.max(0,Math.ceil(_c(t)/1e3)):i=null;return{submitPending:e,loadingStuck:n,rotateActive:!!L,secondsUntilHop:i}}function we(t,e,n){Jo(t,e,n)}function dt(){ee=!1,ut=0,wt&&(l.clear(wt),wt=null)}function Sr(){let t=document.querySelectorAll("label, span, div, p, td, th, strong, b");for(let n of t){let i=(n.textContent||"").replace(/\s+/g," ").trim();if(!/^Date\s*\(MM\/DD\/YYYY\)/i.test(i))continue;let o=[n,n.nextElementSibling,n.parentElement,n.parentElement?.nextElementSibling,n.closest(".form-group, .row, .col, [class*='date'], #datepicker")];for(let a of o)if(a&&/\bLoading\.{0,3}\b/i.test((a.textContent||"").replace(/\s+/g," ")))return!0}for(let n of document.querySelectorAll("div, span, p, label, td")){let o=((n.childNodes.length===1?n.textContent:"")||"").replace(/\s+/g," ").trim();if(!/^Loading\.{0,3}$/i.test(o))continue;let a=(n.parentElement&&n.parentElement.textContent||"").replace(/\s+/g," ");if(/Date\s*\(MM\/DD\/YYYY\)|OFC\s*Post|Calendar|#?datepicker/i.test(a))return!0}let e=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").slice(0,8e3);return!!/Date\s*\(MM\/DD\/YYYY\)\s*Loading\.{0,3}\b/i.test(e)}function Wi(){return Sr()}function vr(){ee=!0,ut=Date.now(),wt&&l.clear(wt),wt=l.setTimeout(()=>{wt=null,!(!L||O)&&(dt(),nt(Date.now()),w(`City Change \u2014 still Loading after ${Lt()/1e3}s; changing city\u2026`),P())},Lt())}function $r(t){let e=Math.max(0,Number(t)||0)*1e3;Zt=Math.max(Zt,Date.now()+e),it=Math.max(it,Zt),dt(),P()}function Tc(){dt()}function rt(){N||(O=!0,z||(z=Date.now()),Cr(),dt(),kc(),Nt=Date.now(),L&&P(),w("City Change \u2014 paused (Auto Submit booking)\u2026"))}function Ht(){if(Z){w("Submit pending \u2014 staying on this city (ignoring date reload hop)\u2026");return}O&&(Tt(),O=!1,z=0,!(!L||N)&&(nt(Date.now()),w("City Change \u2014 resuming; next city in 15\u201318s\u2026"),P()))}async function Yi(){if(!(await ln()).ok)return;let e=await bt();if(!e)return;let n=Date.now();if(n-sr<6e4)return;sr=n;let o=document.querySelector("#post_select")?.value;if(!o){w("Auto Submit ON \u2014 pick a city first.");return}let c=(await Pt()).find(f=>String(f.ID)===String(o)),u=c?.Days;if(Array.isArray(u)&&u.length){let f=Ln(u,e.from,e.to);if(f.length){rt();let m=Ge(f.length),y=f[m].Date;w(`Auto Submit: picking date #${m+1} (${y.slice(0,10)})\u2026`),ji(y),l.send({action:"selectFirstDate",date:y,maxMs:je,pollMs:Y});return}let p=Ln(u,"1970-01-01","2999-12-31");if(p.length){let m=p[0].Date;w(`Auto Submit ON \u2014 dates outside ${e.from} \u2192 ${e.to}; jumping calendar to ${m} (not booking).`),l.send({action:"selectFirstDate",date:m,navigateOnly:!0,maxMs:4e3,pollMs:Y});return}w(`Auto Submit ON \u2014 no dates in your range on ${c.Name||"this city"} yet.`);return}w("Auto Submit ON \u2014 loading slots for current city\u2026"),l.send({action:"selectPost",postId:String(o)})}function kr(){sr=0}function Cr(){Ot&&(l.clear(Ot),Ot=null)}function wd(t,e){return t+Math.random()*(e-t)}function Sd(){return wd(mr(),od())}function nt(t=Date.now()){it=t+Sd()}function _c(t=Date.now()){let e=No(new Date(t));if(e>0)return e;if(Zt>t)return Zt-t;if(ct){let n=ct+mr()-t;if(n>0)return n}return it>t?it-t:0}function P(){if(!L)return;if(Cr(),O||ee){Ot=l.setTimeout(()=>{ir()},500);return}let t=Date.now(),e=No(new Date(t));if(e>0){it>t&&(it=t),e>=or&&(Nt=t),Ot=l.setTimeout(()=>{ir()},e);return}let n=0;Zt>t&&(n=Math.max(n,Zt-t)),ct&&(n=Math.max(n,ct+mr()-t)),it>t&&(n=Math.max(n,it-t)),n=Math.max(0,n),n>=or&&(Nt=Date.now()),Ot=l.setTimeout(()=>{ir()},n)}function vd(t,e){if(!t.length)return null;vc();let n=t.filter(c=>!Ve(c.id)),i=n.length?n:t;if(i.length===1)return Jt=0,i[0];let o=i.findIndex(c=>String(c.id)===String(e));o<0&&(o=Math.max(0,Math.min(Jt,i.length-1)));let a=(o+1)%i.length;return Jt=a,i[a]}function Vi(){let t=document.querySelector("#post_select");return t?[...t.options].filter(e=>e.value).map(e=>({id:String(e.value),name:(e.textContent||"").trim()})):[]}function Tr(t){return String(t||"").toLowerCase().replace(/\b(vac|ofc|consular|embassy|appointment)\b/g," ").replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim()}function cr(t,e,n){if(!t)return null;let i=e.get(String(t.id));if(i)return i;let o=Tr(t.name);if(!o)return null;if(i=n.get(o)||null,i)return i;for(let[a,c]of n)if(a!==o&&(a.includes(o)||o.includes(a)))return c;return null}function Hn(t){let e=Vi();if(!e.length||!t?.length)return[];let n=new Map(e.map(c=>[String(c.id),c])),i=new Map;for(let c of e){let u=Tr(c.name);u&&!i.has(u)&&i.set(u,c)}let o=[],a=new Set;for(let c of t){let u=cr(c,n,i);u&&(a.has(u.id)||(a.add(u.id),o.push({id:u.id,name:u.name})))}return o}function fc(t,e){let n=Array.isArray(t)?t.filter(Boolean):[],i=Array.isArray(e)?e.filter(Boolean):[];if(!i.length)return n.map(g=>({id:String(g.id),name:g.name||g.id}));let o=document.querySelector(h(r.aiCities)),a=new Set(o?[...o.querySelectorAll('input[type="checkbox"]')].map(g=>String(g.value)):[]),c=Vi(),u=new Map(c.map(g=>[String(g.id),g])),f=new Map;for(let g of c){let b=Tr(g.name);b&&!f.has(b)&&f.set(b,g)}let p=[],m=new Set,y=g=>{if(!g)return;let b=c.length?cr(g,u,f):null,x=String(b?.id||g.id);m.has(x)||(m.add(x),p.push({id:x,name:b?.name||g.name||g.id}))};for(let g of i)y(g);for(let g of n){let b=c.length?cr(g,u,f):null,x=String(b?b.id:g.id);m.has(x)||m.has(String(g.id))||a.has(x)&&!i.some(C=>String(C.id)===x)||y(b||g)}return p}function te(){let t=document.querySelector(h(r.aiCities));return t?[...t.querySelectorAll('input[type="checkbox"]:checked')].map(e=>({id:String(e.value),name:e.dataset.name||e.value})):[]}function Wn(){return{from:document.querySelector(h(r.aiFrom))?.value||null,to:document.querySelector(h(r.aiTo))?.value||null}}function qn(t=[],{force:e=!1,selectedCities:n=null}={}){let i=document.querySelector(h(r.aiCities));if(!i)return;let o=Vi(),a=gd(o),c=document.querySelector(h(r.aiPanel)),u=c&&!c.classList.contains(s.hidden),f=yd();if(!e&&a===lc&&i.querySelector('input[type="checkbox"]'))return;lc=a;let p=n?.length?n:(t||[]).map(g=>({id:String(g),name:""})),m=p.length?Hn(p):[],y=new Set(u&&f.length&&!e&&!p.length?f:(m.length?m.map(g=>g.id):f).map(String));if(i.replaceChildren(),!o.length){i.textContent="Open the city dropdown on this page first, then reopen Tik Tik.";return}for(let g of o){let b=document.createElement("label"),x=document.createElement("input");x.type="checkbox",x.value=g.id,x.dataset.name=g.name,x.checked=y.has(g.id),b.append(x,document.createTextNode(g.name)),i.appendChild(b)}}async function $t(t,e={}){let n=await A(t)||{},{cities:i,...o}=e,{from:a,to:c}=Wn(),u=te(),f=Array.isArray(n.cities)?n.cities:[],p=document.querySelector(h(r.aiCities)),m=p?p.querySelectorAll('input[type="checkbox"]').length:0,y;if(i!==void 0){let b=Array.isArray(i)?i:[];!b.length&&!u.length?y=m>0?[]:f:y=fc(f,b.length?b:u)}else u.length?y=fc(f,u):y=f;let g={...n,from:a||n.from||null,to:c||n.to||null,cities:y.length?y:m>0&&i!==void 0&&!(i||[]).length?[]:n.cities||[],loginId:document.querySelector(h(r.aiLogin))?.value?.trim()||n.loginId||"",loginPass:document.querySelector(h(r.aiPass))?.value||n.loginPass||"",security:[0,1,2].map(b=>{let x=[r.aiQ1,r.aiQ2,r.aiQ3][b],C=[r.aiA1,r.aiA2,r.aiA3][b];return{q:document.querySelector(h(x))?.value?.trim()||n.security?.[b]?.q||"",a:document.querySelector(h(C))?.value?.trim()||n.security?.[b]?.a||"",set:b+1}}),...o};return typeof g.submitEnabled=="boolean"&&(g.enabled=g.submitEnabled),g.serverUpdatedAt=Date.now(),await Nn(t,g),$d(g),g}async function nr(){let t=await I();if(!t)return;let e=te(),n=await $t(t,{cities:e}),i=Hn(n.cities||e),o=i.map(f=>f.name||f.id).join(" \u2192 ")||"\u2014";if(!i.length){w("No preferred cities selected \u2014 tick cities anytime; hopping paused."),L&&ye();return}if(ht=!0,ze(n),!Bt(n)){w(`Preferred cities saved (${i.length}): ${o} \u2014 turn City Change ON to hop.`);return}if(Qi(),!L){await Fn();return}let a=document.querySelector("#post_select"),c=a?String(a.value):"",u=i.findIndex(f=>String(f.id)===c);Jt=u>=0?u:Math.min(Jt,i.length-1),w(`Preferred cities updated (${i.length}): ${o} \u2014 City Change keeps running`),P()}var Oi=null,lr=null;function $d(t){Oi&&l.clear(Oi),Oi=l.setTimeout(()=>{Oi=null,Ys(t).catch(()=>{})},400)}async function Mc(t){if(!t||lr===t)return null;let e=await Vs();if(lr=t,!e)return null;let n=await A(t)||{},i=js(n,e);return i?(i.loginId=n.loginId||i.loginId||"",i.loginPass=n.loginPass||"",i.security=n.security||i.security||[],typeof i.submitEnabled=="boolean"&&(i.enabled=i.submitEnabled),await Nn(t,i),i):null}async function kd(t,e){if(Z||!ue()||O||W)return!1;let n=document.querySelector("#post_select");if(!n||!t)return!1;let i=String(t);return String(n.value)===i?!1:(Mn=i,wr=Date.now(),vr(),ct=Date.now(),nt(ct),Tn(i,e||i),w(`Switching city \u2192 ${e||t}\u2026`),Ki(),l.send({action:"selectPost",postId:i}),!0)}var St=0,ur=45e3;async function Cd(t,e,{alertId:n,dayCount:i,bestDate:o}={}){if(N||D()||!kt()||Z)return!1;let a=document.querySelector("#post_select");if(!a||!t)return!1;let c=String(t),u=e||c;if(String(a.value)===c){St=Date.now()+ur,w(`City alert \u2014 already on ${u}`+(i?` (${i} dates`:"")+(o?`, best ${o}`:"")+(i?")":"")+" \u2014 holding for booking");try{vi(2,90,60)}catch{}try{l.send({action:"focusScheduleTab"})}catch{}return rt(),!0}Tt(),dt(),O=!1,z=0,W=!1,ne(),gt=!1,Rt=0,it=Date.now(),ct=0,Zt=0,Mn=c,wr=Date.now(),vr(),ct=Date.now(),St=Date.now()+ur,Ki(),w(`City alert \u2014 FAST switch \u2192 ${u}`+(i?` (${i} dates`:"")+(o?`, best ${o}`:"")+(i?")":"")+(n?` [#${n}]`:""));try{vi(3,80,50)}catch{}try{l.send({action:"focusScheduleTab"})}catch{}return Tn(c,u),l.send({action:"selectPost",postId:c,force:!0}),rt(),L&&P(),!0}var he=null,Ri=!1,pc="",mc=0,Td=50,Ac=0,_d=12e4;function Md(){he&&(l.clear(he),he=null),Ri=!1}async function Ad(){if(!(Ri||!L||N)){Ri=!0;try{if(Date.now()<Ac)return;let t=await xe();if(!t?.cities?.length)return;let e=document.querySelector("#post_select"),n=await zs({preferredCities:t.cities,citiesEnabled:!0,currentCityId:e?String(e.value):"",dateFrom:t.from||null,dateTo:t.to||null});if(!n?.alertId)return;if(Ve(n.id)){$n(n.alertId);return}if(n.alreadyThere){$n(n.alertId),St=Math.max(St,Date.now()+ur),rt(),w(`City alert \u2014 already on ${n.name||n.id}`+(n.dayCount?` (${n.dayCount} dates`:"")+(n.bestDate?`, best ${n.bestDate}`:"")+(n.dayCount?")":"")+" \u2014 holding for booking");return}let i=`${n.id}:${n.alertId}`,o=Date.now();if(i===pc&&o-mc<4e3){$n(n.alertId);return}await Cd(n.id,n.name,{alertId:n.alertId,dayCount:n.dayCount,bestDate:n.bestDate})&&(pc=i,mc=o,$n(n.alertId))}catch{}finally{Ri=!1}}}function Dc(){if(he||!L)return;let t=()=>{he=null,!(!L||N||!l.alive)&&Ad().finally(()=>{L&&!N&&l.alive&&(he=l.setTimeout(t,Td))})};he=l.setTimeout(t,50)}function Qi(){if(cc)return;let t=document.querySelector("#post_select");if(!t)return;cc=!0,er=String(t.value||"");let e=()=>{let n=document.querySelector("#post_select");if(!n)return;let i=String(n.value||"");!i||i===er||(er=i,Dd(i,n))};l.on(t,"change",e),l.setInterval(e,400)}function Dd(t,e){if(!L||N||!l.alive||Z)return;let n=String(t||"");if(!n)return;let i=Mn&&n===Mn&&Date.now()-wr<2500;i&&(Mn=""),Tt(),O=!1,z=0,ne(),Ki(),i||(Ac=Date.now()+_d,St=0),ct=Date.now(),vr(),nt(ct),xe().then(a=>{if(!a?.cities?.length)return;let u=Hn(a.cities).findIndex(f=>String(f.id)===n);u>=0&&(Jt=u)}).catch(()=>{});let o=e?.selectedOptions&&e.selectedOptions[0]?.textContent?.trim()||e?.options?.[e.selectedIndex]?.textContent?.trim()||n;Tn(n,o),w(i?`City Change \u2014 on ${o}; waiting for dates\u2026`:`City Change \u2014 you switched \u2192 ${o}; force-alerts paused 2 min\u2026`),P()}async function ir(){if(!(gt||!L)){gt=!0,Rt=Date.now(),Nt=Date.now(),Ot=null;try{if(N||D()||!l.alive){ye();return}if(Gi()){it=Date.now(),w(ue()?"City Change \u2014 auto-unstuck; hopping now\u2026":`City Change \u2014 auto-unstuck; waiting IST ${De()}\u2026`),P();return}if(O||W){let m=z?Date.now()-z:0;if(O&&m>=Pn()){Tt(),O=!1,z=0,nt(Date.now()),w("City Change \u2014 hold expired; next city in 15\u201318s\u2026"),P();return}let y=Math.max(0,Pn()-m);w(`City Change \u2014 paused (Auto Submit booking)\u2026 hop in \u2264${Math.ceil(y/1e3)}s`),P();return}let t=Date.now();if(St>t){let m=Math.ceil((St-t)/1e3);w(`City alert hold \u2014 staying for booking\u2026 (${m}s)`),P();return}let e=ue(new Date(t));if(!e){P();return}if(ee){let m=ut?t-ut:0;if(Wi()){if(m>=Lt()){dt(),nt(Date.now()),w(`City Change \u2014 still Loading after ${Lt()/1e3}s; changing city\u2026`),P();return}let b=Math.max(0,Math.ceil((Lt()-m)/1e3));w(`City Change \u2014 Date Loading\u2026 stay (${b}s then hop if still Loading)`),P();return}let y=St>t?Math.max(Qt(),St-(ut||t)):Qt();if(m>=y){dt(),nt(Date.now()),w(`City Change \u2014 calendar up but no dates after ${Math.round(y/1e3)}s; changing city\u2026`),P();return}let g=Math.max(0,Math.ceil((Qt()-m)/1e3));w(`City Change \u2014 waiting calendar dates\u2026 (${g}s then hop)`),P();return}let n=_c(t);if(n>0){let m=Math.ceil(n/1e3);w(`City Change \u2014 slot ${e} active, next switch in ${Math.max(1,m)}s`),P();return}let i=await xe();if(!i?.cities?.length){ye();return}let o=new Set(Vi().map(m=>m.id)),a=Hn(i.cities);if(!a.length){w("Preferred cities not found in the dropdown \u2014 pick cities again."),ye();return}a.length<(i.cities?.length||0)&&w(`City Change \u2014 using ${a.length}/${i.cities.length} preferred (some ids remapped/missing in dropdown): ${a.map(m=>m.name||m.id).join(" \u2192 ")}`);let c=document.querySelector("#post_select"),u=c?String(c.value):"",f=vd(a,u);if(!f){nt(t),P();return}if(await kd(f.id,f.name)){ct=Date.now(),nt(ct);let m=a.map(g=>g.name||g.id).join(" \u2192 "),y=`${Jt+1}/${a.length}`;w(`City Change \u2014 ${y} ${f.name||f.id} (path: ${m}); Loading up to ${Lt()/1e3}s, no-dates hop ${Qt()/1e3}s`)}else nt(t);P()}finally{gt=!1,Rt=0}}}function _r(){let t=document.querySelector(h(r.aiPanel));t&&t.classList.contains(s.hidden)?An(!0):Po()}async function Fn(){if(N||D()||!kt())return;if(!(await ln()).ok){_r();return}let e=await xe();if(!e?.cities?.length)return;let n=Hn(e.cities);if(!n.length){w("Preferred cities not found in the dropdown \u2014 reopen Tik Tik and pick cities again.");return}Tt(),dt(),O=!1,z=0,W=!1,gt=!1,Rt=0,L=!0,Nt=Date.now(),it=Date.now();let i=document.querySelector("#post_select"),o=i?String(i.value):"",a=n.findIndex(u=>String(u.id)===o);Jt=a>=0?a:0;let c=n.map(u=>u.name||u.id).join(" \u2192 ");w(`City Change ON \u2014 ${n.length} cities (${c}); IST ${De()}; hop 15\u201318s`),Cc(),Dc(),P()}async function Pc(){if(N||D()||!kt()||!l.alive||!(await xe())?.cities?.length||!document.querySelector("#post_select"))return;if(!L){await Fn();return}let e=Gi();Cc(),Dc(),(e||!Ot&&!gt)&&(e&&(nt(Date.now()),w("City Change \u2014 auto-unstuck; next city in 15\u201318s\u2026")),P())}function Fi(){return document.querySelector("#submitbtn")||document.querySelector("button#submitbtn")||document.querySelector("input#submitbtn")||[...document.querySelectorAll("button, input[type=submit]")].find(t=>/submit/i.test(t.textContent||t.value||""))}function Pd(t){if(!t)return null;try{t.disabled=!1,t.removeAttribute("disabled"),t.removeAttribute("aria-disabled"),t.hidden=!1,t.removeAttribute("hidden"),t.style.setProperty("display","","important"),t.style.setProperty("visibility","visible","important"),t.style.setProperty("opacity","1","important"),t.style.setProperty("pointer-events","auto","important");let e=t.parentElement;for(let n=0;n<4&&e;n++){try{e.style.setProperty("display","","important"),e.style.setProperty("visibility","visible","important")}catch{}e=e.parentElement}}catch{}return t}function Be(){if(G()&&(Fi()||document.querySelector("#page_form, form")))return!0;let t=Fi();if(!t||t.disabled||t.getAttribute("aria-disabled")==="true")return!1;let e=window.getComputedStyle?.(t);return!(e&&(e.display==="none"||e.visibility==="hidden"||e.opacity==="0")||!t.offsetParent&&e?.position!=="fixed")}function Ed(t){let e=G();if(t&&(t.disabled||t.getAttribute("aria-disabled")==="true"||!t.offsetParent)){if(!e)return!1;Pd(t)}if(t&&!t.disabled){try{let n=t.form||t.closest?.("form");if(n&&typeof n.requestSubmit=="function")return n.requestSubmit(t),!0}catch{}try{return t.click(),!0}catch{}try{return t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,view:window})),t.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,view:window})),t.click(),!0}catch{}}if(e){let n=document.querySelector("#page_form")||document.querySelector("form");if(n)try{return typeof n.requestSubmit=="function"?(n.requestSubmit(t||void 0),!0):(n.submit(),!0)}catch{}}return!1}function Mr(){let t=Fi();fd();let e=Ed(t);return l.send({action:"forceClickSubmit",prefix:d,pollMs:Y,maxMs:Math.min(1500,Dn)}),e}function Id(){return G()?Be():!1}function Ar(t){let e=Date.now()+Math.max(0,Number(t)||0);return G()&&Be()?Promise.resolve(!0):new Promise(n=>{let i=!1,o=null,a=null,c=null,u=0,f=y=>{if(!i){i=!0;try{c?.disconnect()}catch{}o&&l.clear(o),a&&l.clear(a),n(!!y)}},p=()=>{if(!l.alive||Ye()||D())return f(!1);if(G()&&Be())return f(!0);if(Date.now()>=e)return f(G()&&Be())},m=()=>{if(i||!l.alive||Be()||!G())return;let y=Date.now();if(!(y-u<350)){u=y;try{Ds()}catch{}}};try{c=new MutationObserver(p);let y=Fi();y&&c.observe(y,{attributes:!0,attributeFilter:["disabled","class","aria-disabled","style"]});let g=y?.form||y?.closest?.("form")||document.querySelector("#page_form, form");g?c.observe(g,{attributes:!0,attributeFilter:["disabled","class","style"],childList:!0,subtree:!0}):c.observe(document.documentElement,{attributes:!0,attributeFilter:["disabled","style"],childList:!0,subtree:!0})}catch{c=null}o=l.setInterval(p,Y),a=l.setInterval(m,400),m(),p()})}function Ec(){w("Extension reloaded \u2014 refresh this visa page, then turn Auto Submit ON again.")}async function Dr(t){if(N||D()||W)return;let e=await A(t);if(!Wt(e))return;rt(),W=!0,wn();let n=Date.now(),i=!1,o=!1,a=async f=>{if(!(i||!W||!l.alive)){if(i=!0,window.removeEventListener("message",c),qt&&(l.clear(qt),qt=null),D()){W=!1;return}if(W=!1,f){await Bn(t);return}br(Sc())}},c=f=>{!l.alive||f.source!==window||f.data?.action===Ut.sub&&a(!0)};window.addEventListener("message",c);let u=async()=>{if(i||!W||!l.alive||o)return;let f=Date.now()-n;if(Id()){o=!0,w("Submit enabled \u2014 clicking\u2026"),Mr();return}if(f>=Dn)return a(!1);w("Waiting for Submit to enable\u2026"),qt=l.setTimeout(u,Y)};Ar(Dn).then(f=>{i||!W||!l.alive||o||f&&u()}),u()}async function Ic(){if(!G()||W||N)return;let t=await bt();t&&await Dr(t.accountId)}function w(t){let e=document.querySelector(h(r.aiStatus));if(e){if(!t){e.textContent="";return}e.textContent=t}}function R(t){w(t)}function hc(t){return!!(t&&t.termsAgreed)}function Lc(t){return!!(t&&t.termsPassed)}function Ui(){return!!document.querySelector(h(r.aiTermsAgree))?.checked}function Xi(t){let e=document.querySelector(h(r.aiTermsGate)),n=document.querySelector(h(r.aiMain));if(!ci()){e&&e.classList.add(s.hidden),n&&n.classList.add(s.hidden);return}let i=document.querySelector(h(r.aiTermsAgree)),o=document.querySelector(h(r.aiTermsContinue)),a=Lc(t);e&&e.classList.toggle(s.hidden,a),n&&n.classList.toggle(s.hidden,!a),i&&(i.checked=hc(t)||Ui()),o&&(o.disabled=!(hc(t)||Ui()))}function Ld(){let t=document.querySelector(h(r.aiTermsContinue)),e=Ui();t&&(t.disabled=!e),w(e?"Terms checked \u2014 tap Continue.":"Check Agree to continue.")}async function qd(){if(!Ui()){w("Check Agree first.");return}let t=await I();if(!t){w("Open a logged-in schedule page so we can bind this to your account.");return}let e=await A(t)||{},{from:n,to:i}=Wn(),o=te(),a=Pr();Ct(),ne(),kr(),vt=!0,ht=!0,await $t(t,{termsAgreed:!0,termsPassed:!0,termsAgreedAt:e.termsAgreedAt||Date.now(),submitEnabled:!0,citiesEnabled:!0,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],slotWindows:a.length?a:e.slotWindows||null,confirmedAt:Date.now()}),await ft(),yt(document.querySelector(h(r.aiSubmitSw)),!0),yt(document.querySelector(h(r.aiCitiesSw)),!0),vt=!0,ht=!0,ze(await A(t)),qn((e.cities||[]).map(u=>u.id),{force:!0,selectedCities:e.cities||[]}),Er(e),Xi(await A(t)),(te().length?te():e.cities||[]).length&&(Qi(),await Fn()),(n||e.from)&&(i||e.to)&&await Yi(),w("Auto Submit and City Change ON \u2014 set dates and preferred cities.")}function qc(t){t?.slotWindows?.length?Qa(t.slotWindows):Ro()}function Od(t){let e="";for(let n=0;n<=59;n++){let i=Number(t)===n?" selected":"";e+=`<option value="${n}"${i}>:${String(n).padStart(2,"0")}</option>`}return e}function gc(t,e){let n=le,i="";for(let o=1;o<=n;o++){let a=Number(e)===o?" selected":"";i+=`<option value="${o}"${a}>${o} min</option>`}return i}function Oc(t,e){let n=Number(t)||0,i=Number(e)||1,o=(n+i)%60;return`Runs from :${String(n).padStart(2,"0")} up to :${String(o).padStart(2,"0")}`}function Pr(){let t=document.querySelector(h(r.aiWinList));if(!t)return[];let e=[];for(let n of t.querySelectorAll(`.${s.aiWinRow}`)){let i=Number(n.querySelector('select[data-win="from"]')?.value),o=Number(n.querySelector('select[data-win="dur"]')?.value);!Number.isFinite(i)||!Number.isFinite(o)||e.push({fromMin:i,durationMin:o})}return Oo(e)}function yc(t){let e=t.querySelector('select[data-win="from"]'),n=t.querySelector('select[data-win="dur"]'),i=t.querySelector(`.${s.aiWinHelp}`);!e||!n||!i||(i.textContent=Oc(e.value,n.value))}function Rc(t=0,e=6){let n=Math.min(Math.max(1,e||1),le),i=document.createElement("div");i.className=s.aiWinRow,i.innerHTML=`
    <div class="${s.aiInline}">
      <label class="${s.aiHead}">Start</label>
      <select data-win="from">${Od(t)}</select>
      <label class="${s.aiHead}" style="margin-left:10px;color:#6b7280;font-weight:500">Duration</label>
      <select data-win="dur">${gc(t,n)}</select>
      <button type="button" class="${s.aiTrash}" data-win="del" title="Delete timing" aria-label="Delete">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
        </svg>
      </button>
    </div>
    <div class="${s.aiWinHelp}">${Oc(t,n)}</div>
  `;let o=i.querySelector('select[data-win="from"]'),a=i.querySelector('select[data-win="dur"]');return l.on(o,"change",()=>{let c=Number(o.value),u=Number(a.value)||1;a.innerHTML=gc(c,u),yc(i)}),l.on(a,"change",()=>yc(i)),l.on(i.querySelector('button[data-win="del"]'),"click",()=>{i.remove(),Ir()}),i}function Er(t){let e=document.querySelector(h(r.aiWinList));if(!e)return;e.replaceChildren();let n=Xa(t?.slotWindows);for(let i of n.slice(0,mt))e.appendChild(Rc(i.fromMin,i.durationMin));Ir(t)}function Ir(t){let e=document.querySelector(h(r.aiWinNote));e&&(e.textContent=`IST each hour \xB7 max ${mt}`),Nc()}function Nc(){let t=document.querySelector(h(r.aiWinList)),e=document.querySelector(h(r.aiWinAdd));if(!e||!t)return;let n=t.querySelectorAll(`.${s.aiWinRow}`).length,i=n>=mt;e.disabled=i,e.textContent=i?`+ Add timing (${n} of ${mt})`:"+ Add timing"}function yt(t,e){t&&(t.classList.toggle(s.aiOnBtn,!!e),t.setAttribute("aria-checked",e?"true":"false"))}function Rd(t){yt(document.querySelector(h(r.aiSubmitSw)),Wt(t)),yt(document.querySelector(h(r.aiCitiesSw)),Bt(t))}var vt=!1,ht=!1;function ze(t){let e=Wt(t)||vt,n=Bt(t)||ht,i=document.querySelector(h(r.aiSubmitBody)),o=document.querySelector(h(r.aiCitiesBody));i&&i.classList.toggle(s.hidden,!e),o&&o.classList.toggle(s.hidden,!n)}function Nd(t,e){let n=document.querySelector(h(r.aiStatus)),i=document.querySelector(h(r.aiBtn));if(!i)return;Rd(t),ze(t);let o=Wt(t),a=Bt(t);o||a?(i.classList.add(s.aiOn),i.textContent="Tik Tik ON"):(i.classList.remove(s.aiOn),i.textContent="Tik Tik"),n&&(n.textContent="",n.classList.remove(s.aiOk))}async function ft(){let t=await I();if(t)try{await Mc(t)}catch{}let e=t?await A(t):null;Wt(e)||(vt=!1),Bt(e)?ht=!0:ht=!1,qc(e),Nd(e,t),Xi(e),ci()?Js():Cn();let n=document.querySelector(h(r.aiFrom)),i=document.querySelector(h(r.aiTo));n&&(n.value=e?.from||""),i&&(i.value=e?.to||""),hr();let o=(e?.cities||[]).map(b=>b.id),a=document.querySelector(h(r.aiCitiesBody));(a&&!a.classList.contains(s.hidden)||Bt(e)||ht)&&qn(o,{selectedCities:e?.cities||[]}),Er(e);let u=Bc(e),f=document.querySelector(h(r.aiLogin)),p=document.querySelector(h(r.aiPass));f&&(u?.loginId||e?.loginId)&&(f.value=u?.loginId||e.loginId||""),p&&(u?.loginPass||e?.loginPass)&&(p.value=u?.loginPass||e.loginPass||"");let m=u?.security||e?.security||[],y=[r.aiQ1,r.aiQ2,r.aiQ3],g=[r.aiA1,r.aiA2,r.aiA3];y.forEach((b,x)=>{let C=document.querySelector(h(b));C&&(C.innerHTML=_n(x,m[x]?.q||""))}),g.forEach((b,x)=>{let C=document.querySelector(h(b));C&&m[x]?.a&&(C.value=m[x].a)}),Lr(e),Ke||zn(!1)}function Bd(){let t=document.querySelector(h(r.aiPanel));return!!(t&&!t.classList.contains(s.hidden))}var zi=0;function An(t){let e=document.querySelector(h(r.aiPanel));e&&(t||ge(),e.classList.toggle(s.hidden,!t),t&&(zi=Date.now(),e.dataset.openedAt=String(zi),I().then(async n=>{if(n)try{lr=null,await Mc(n)}catch{}let i=n?await A(n):null;Xi(i),Lc(i)?qn((i?.cities||[]).map(o=>o.id),{force:!0,selectedCities:i?.cities||[]}):w("Read the terms, check Agree, then Continue."),Po()})))}function dr(){if(dr._done)return;dr._done=!0;let t=e=>{if(!Bd()||Date.now()-zi<800||Date.now()-yr<700||!ci())return;let n=document.querySelector(h(r.aiPanel)),i=document.querySelector(h(r.aiBtn)),o=document.querySelector(h(r.aiCal)),a=document.querySelector(h(r.aiFromBtn)),c=document.querySelector(h(r.aiToBtn)),u=gr(e),f=typeof e.composedPath=="function"?e.composedPath():[],p=g=>!!(g&&(u&&(g===u||g.contains?.(u))||f.some(b=>b===g))),m=!!(o&&!o.classList.contains(s.hidden));if(m&&(p(o)||p(a)||p(c)))return;if(p(i)||p(n)){m&&!p(a)&&!p(c)&&ge();return}if(m){ge();return}let y=document.activeElement;n&&y&&n.contains(y)||An(!1)};l.on(document,"click",t)}async function Hd(t){if(t&&!(await ln()).ok){_r();return}let e=await I();if(!e){w("Open a logged-in schedule page so we can bind this to your account.");return}let n=await A(e)||{},{from:i,to:o}=Wn();if(i=i||n.from||null,o=o||n.to||null,t){vt=!0,yt(document.querySelector(h(r.aiSubmitSw)),!0),Ct(),ne(),kr(),await $t(e,{submitEnabled:!0,from:i||null,to:o||null,confirmedAt:Date.now()});let a=document.querySelector(h(r.aiFrom)),c=document.querySelector(h(r.aiTo));if(a&&i&&(a.value=i),c&&o&&(c.value=o),hr(),await ft(),yt(document.querySelector(h(r.aiSubmitSw)),!0),vt=!0,ze(await A(e)),!i||!o){w("Auto Submit ON \u2014 select From and To dates to start booking.");return}if(i>o){w("Auto Submit ON \u2014 From date must be before To date.");return}vt=!1,w(`Auto Submit ON (${En(i)} \u2013 ${En(o)})`),await Yi();return}vt=!1,ne(),yt(document.querySelector(h(r.aiSubmitSw)),!1),await $t(e,{submitEnabled:!1,from:i||n.from,to:o||n.to}),await ft(),w("Auto Submit OFF")}async function Wd(t){if(t&&!(await ln()).ok){_r();return}let e=await I();if(!e){w("Open a logged-in schedule page so we can bind this to your account.");return}let n=await A(e)||{};if(t){ht=!0,yt(document.querySelector(h(r.aiCitiesSw)),!0),qn((n.cities||[]).map(c=>c.id),{force:!0,selectedCities:n.cities||[]}),Er(n);let o=te();!o.length&&n.cities?.length&&(o=n.cities);let a=Pr();if(Ct(),await $t(e,{citiesEnabled:!0,...o.length?{cities:o}:{},slotWindows:a.length?a:n.slotWindows||null}),await ft(),yt(document.querySelector(h(r.aiCitiesSw)),!0),ht=!0,ze(await A(e)),o.length||qn([],{force:!0}),!o.length){w("City Change ON \u2014 select at least one preferred city to start hopping.");return}ht=!0,ze(await A(e)),Qi(),await Fn(),w(`City Change ON (${o.map(c=>c.name||c.id).join(", ")}) \u2014 edit cities anytime`);return}ht=!1,ye(),yt(document.querySelector(h(r.aiCitiesSw)),!1);let i=te();await $t(e,{citiesEnabled:!1,cities:i.length?i:n.cities||[]}),await ft(),w("City Change OFF")}async function bc(){let t=await I();if(!t)return;let e=await A(t)||{};if(!Wt(e)&&!vt)return;let{from:n,to:i}=Wn();!n||!i||n>i||(await $t(t,{submitEnabled:!0,from:n,to:i,confirmedAt:Date.now()}),vt=!1,await ft(),yt(document.querySelector(h(r.aiSubmitSw)),!0),Ct(),kr(),w(`Auto Submit ON (${En(n)} \u2013 ${En(i)})`),await Yi())}function Fd(t){return(t||[]).map(e=>`:${String(e.fromMin).padStart(2,"0")}\u2013:${String(e.toMin).padStart(2,"0")}`).join(", ")}async function Ud(){let t=document.querySelector(h(r.aiWinList));if(t){if(t.querySelectorAll(`.${s.aiWinRow}`).length>=mt){w(`Max ${mt} timings.`),Nc();return}t.appendChild(Rc(0,Math.min(6,le))),Ir()}}async function zd(){let t=await I();if(!t){w("Open a logged-in schedule page so we can bind this to your account.");return}let e=Pr();if(!e.length){w("Add at least one timing (or Reset to defaults).");return}await $t(t,{slotWindows:e}),await ft(),w(`Saved ${e.length} custom timing(s): ${Fd(e)}`)}async function Kd(){let t=await I();if(!t){w("Open a logged-in schedule page so we can bind this to your account.");return}window.confirm("Reset to default IST windows? Your custom timings will be removed.")&&(await $t(t,{slotWindows:null}),Ro(),await ft(),w(`Using default windows: ${De()}`))}var Ke=null;function fr(){return`lp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`}function xc(t){if(!t||String(t).length<10)return"\u2014";try{return new Date(`${String(t).slice(0,10)}T12:00:00`).toLocaleDateString("en-US",{month:"short",day:"numeric"})}catch{return String(t).slice(0,10)}}function Un(t){let e=Array.isArray(t?.loginProfiles)?t.loginProfiles.filter(Boolean):[];return e.length?e.map(n=>({id:String(n.id||fr()),loginId:String(n.loginId||"").trim(),loginPass:String(n.loginPass||""),security:Array.isArray(n.security)?n.security:[],from:n.from||null,to:n.to||null,cities:Array.isArray(n.cities)?n.cities:[],visa:n.visa||""})):t?.loginId&&t?.loginPass?[{id:t.activeLoginProfileId||fr(),loginId:String(t.loginId).trim(),loginPass:String(t.loginPass),security:Array.isArray(t.security)?t.security:[],from:t.from||null,to:t.to||null,cities:Array.isArray(t.cities)?t.cities:[],visa:""}]:[]}function Bc(t){let e=Un(t);if(!e.length)return null;let n=t?.activeLoginProfileId;return e.find(i=>String(i.id)===String(n))||e[0]}function jd(t){let n=(t?.cities||[]).map(o=>o.name||o.id).filter(Boolean)[0]||"\u2014",i=String(t?.visa||"").trim();return i?`${n} (${i})`:n}function Gd(t){return`${xc(t?.from)} \u2192 ${xc(t?.to)}`}function Hc(t){let e=document.querySelector(h(r.aiLogin)),n=document.querySelector(h(r.aiPass));e&&(e.value=t?.loginId||""),n&&(n.value=t?.loginPass||"");let i=t?.security||[];[r.aiQ1,r.aiQ2,r.aiQ3].forEach((o,a)=>{let c=document.querySelector(h(o));c&&(c.innerHTML=_n(a,i[a]?.q||""))}),[r.aiA1,r.aiA2,r.aiA3].forEach((o,a)=>{let c=document.querySelector(h(o));c&&(c.value=i[a]?.a||"")})}function Yd(){Hc(null)}function zn(t,e){let n=document.querySelector(h(r.aiLoginBody)),i=document.querySelector(h(r.aiLoginEditorTitle));n&&n.classList.toggle(s.hidden,!t),i&&(i.textContent=e||(t?"Edit profile":""))}function Lr(t){let e=document.querySelector(h(r.aiProfilesList));if(!e)return;let n=Un(t),i=Bc(t)?.id||null;if(e.replaceChildren(),!n.length){let o=document.createElement("p");o.className=s.aiQlEmpty,o.textContent="No profiles yet. Add one for faster Home login.",e.appendChild(o);return}for(let o of n){let a=document.createElement("div");a.className=s.aiQlCard,a.dataset.profileId=o.id;let c=document.createElement("div");c.className=s.aiQlMeta;let u=document.createElement("strong");u.textContent=o.loginId||"Untitled";let f=document.createElement("span");f.textContent=jd(o);let p=document.createElement("span");p.textContent=Gd(o);let m=document.createElement("button");if(m.type="button",m.className=s.aiQlEdit,m.textContent="Edit",m.dataset.editProfile=o.id,c.append(u,f,p,m),a.appendChild(c),String(o.id)===String(i)){let y=document.createElement("span");y.className=s.aiQlBadge,y.textContent="Active Profile",a.appendChild(y)}else{let y=document.createElement("button");y.type="button",y.className=s.aiQlEdit,y.style.marginTop="2px",y.textContent="Use",y.dataset.activateProfile=o.id,a.appendChild(y)}e.appendChild(a)}}async function Vd(t){let e=await I();if(!e)return;let n=await A(e)||{},i=Un(n),o=i.find(c=>String(c.id)===String(t));if(!o)return;await Nn(e,{...n,loginProfiles:i,activeLoginProfileId:o.id,loginId:o.loginId,loginPass:o.loginPass,security:o.security,serverUpdatedAt:Date.now()});let a=await A(e);Lr(a),w(`Active login profile: ${o.loginId}`)}async function Qd(){Ke=null,Yd(),zn(!0,"Add Quick Login Profile"),w("Enter ID, password, and 3 security answers, then Save.")}async function Xd(t){let e=await I(),n=e?await A(e):null,i=Un(n).find(o=>String(o.id)===String(t));i&&(Ke=i.id,Hc(i),zn(!0,`Edit \u2014 ${i.loginId}`))}function Jd(){Ke=null,zn(!1),w("Profile editor closed.")}async function Zd(){let t=await I();if(!t){w("Open a logged-in schedule page so we can bind this to your account.");return}let e=await A(t)||{},{from:n,to:i}=Wn(),o=te(),a=document.querySelector(h(r.aiLogin))?.value?.trim(),c=document.querySelector(h(r.aiPass))?.value,u=[0,1,2].map(x=>({q:document.querySelector(h([r.aiQ1,r.aiQ2,r.aiQ3][x]))?.value?.trim()||"",a:document.querySelector(h([r.aiA1,r.aiA2,r.aiA3][x]))?.value?.trim()||"",set:x+1}));if(!a||!c){w("Enter ID and password before saving.");return}if(u.some(x=>!x.q||!x.a)){w("Pick 1 question from each of the 3 sets and fill all 3 answers.");return}let f="";try{let x=await B();f=String(x?.visa||"").trim()}catch{}let p=Un(e),m=Ke||fr(),y={id:m,loginId:a,loginPass:c,security:u,from:n||e.from||null,to:i||e.to||null,cities:o.length?o:e.cities||[],visa:f},g=p.findIndex(x=>String(x.id)===String(m));g>=0?p[g]=y:p.push(y),await $t(t,{loginProfiles:p,activeLoginProfileId:m,loginId:a,loginPass:c,security:u});let b=await A(t)||{};await Nn(t,{...b,loginProfiles:p,activeLoginProfileId:m,loginId:a,loginPass:c,security:u,serverUpdatedAt:Date.now()}),Ke=null,zn(!1),Lr(await A(t)),w(`Quick Login profile saved \u2014 Active: ${a}`)}function tf(t){let e=t.target;if(!e||!e.closest)return;let n=e.closest("[data-edit-profile]");if(n){t.preventDefault(),Xd(n.getAttribute("data-edit-profile"));return}let i=e.closest("[data-activate-profile]");i&&(t.preventDefault(),Vd(i.getAttribute("data-activate-profile")))}function qr(){for(let t of[...document.querySelectorAll("div[id]")])t.id!==r.aiPanel&&t.textContent?.includes("Tik Tik (this account only)")&&t.remove();for(let t of[...document.querySelectorAll("button")])(t.textContent||"").trim().startsWith("Tik Tik")&&t.id!==r.aiBtn&&t.remove();for(let t of[...document.querySelectorAll("div[id]")]){if(t.id===r.selRow||t.querySelector("#post_select"))continue;let e=[...t.querySelectorAll("button")];e.length&&e.every(n=>/^(Tik Tik|Recheck)/.test((n.textContent||"").trim()))&&t.remove()}}function pr(){Cn(),document.querySelector(h(r.aiPanel))?.remove(),document.querySelector(h(r.aiBtn))?.remove(),document.querySelector(h(r.hud))?.remove(),Zo(),qr()}function ef(){if(D())return;if(!kt()){pr();return}if(document.querySelector(h(r.aiBtn)))if(!document.querySelector(h(r.aiSubmitSw))||!document.querySelector(h(r.aiTermsContinue))||!document.querySelector(h(r.aiFromBtn))||!document.querySelector(h(r.aiProfiles))||!document.querySelector(h(r.comCard)))pr();else return;let t=rs();if(!t)return;let e=document.createElement("button");e.id=r.aiBtn,e.type="button",e.textContent="Tik Tik",e.dataset[q.mark]="",l.on(e,"click",c=>{c.preventDefault(),c.stopPropagation();let u=document.querySelector(h(r.aiPanel)),f=!u||u.classList.contains(s.hidden);!f&&Date.now()-zi<800||An(f)}),l.on(e,"pointerdown",c=>{c.stopPropagation()}),t.appendChild(e);let n=document.createElement("div");n.id=r.aiPanel,n.className=s.hidden,n.dataset[q.mark]="",n.innerHTML=`
    <div id="${r.aiTermsGate}">
      <div id="${r.aiTerms}" class="${s.aiTerms}">
        <div class="${s.aiHead}">Terms &amp; Conditions</div>
        <div class="${s.aiHint}">Please read carefully before continuing.</div>
        <ul class="${s.aiTermsList}">
          <li>Options apply to this applicant only. They do not bypass CAPTCHAs, waiting rooms, or portal security.</li>
          <li>During your windows, City Change hops every 15\u201318s. Max ${mt} windows, each up to ${le} minutes.</li>
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
              <select id="${r.aiQ1}">${_n(0)}</select>
            </label>
            <label>Your answer for set 1
              <input type="text" id="${r.aiA1}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${s.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 2 \u2014 choose 1 question
              <select id="${r.aiQ2}">${_n(1)}</select>
            </label>
            <label>Your answer for set 2
              <input type="text" id="${r.aiA2}" autocomplete="off" required placeholder="Type the answer you registered on the visa site" />
            </label>
          </div>
          <div class="${s.aiRow}" style="flex-direction:column;align-items:stretch">
            <label>Set 3 \u2014 choose 1 question
              <select id="${r.aiQ3}">${_n(2)}</select>
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
  `,t.insertAdjacentElement("afterend",n),l.on(n.querySelector(h(r.aiSubmitSw)),"click",async()=>{let c=await I(),u=c?await A(c):null;await Hd(!Wt(u))}),l.on(n.querySelector(h(r.aiCitiesSw)),"click",async()=>{let c=await I(),u=c?await A(c):null;await Wd(!Bt(u))}),l.on(n.querySelector(h(r.aiWinAdd)),"click",Ud),l.on(n.querySelector(h(r.aiWinSave)),"click",zd),l.on(n.querySelector(h(r.aiWinReset)),"click",Kd),l.on(n.querySelector(h(r.aiSaveLogin)),"click",Zd),l.on(n.querySelector(h(r.aiLoginCancel)),"click",Jd),l.on(n.querySelector(h(r.aiAddProfile)),"click",Qd),l.on(n.querySelector(h(r.aiProfilesList)),"click",tf),l.on(n.querySelector(h(r.aiClose)),"click",()=>An(!1)),l.on(n,"pointerdown",c=>c.stopPropagation()),l.on(n.querySelector(h(r.aiCitiesAll)),"click",()=>{dc(!0),nr()}),l.on(n.querySelector(h(r.aiCitiesNone)),"click",()=>{dc(!1),nr()}),l.on(n.querySelector(h(r.aiCities)),"change",c=>{c.target&&c.target.type==="checkbox"&&nr()}),l.on(n.querySelector(h(r.aiTermsAgree)),"change",()=>{Ld()}),l.on(n.querySelector(h(r.aiTermsContinue)),"click",()=>{qd()});let i=c=>u=>{u.preventDefault(),u.stopPropagation(),typeof u.stopImmediatePropagation=="function"&&u.stopImmediatePropagation();let f=document.querySelector(h(r.aiCal)),p=f&&!f.classList.contains(s.hidden)&&lt.which===c;if(!(p&&Date.now()-yr<700)){if(p){ge();return}ud(c,u.currentTarget)}},o=n.querySelector(h(r.aiFromBtn)),a=n.querySelector(h(r.aiToBtn));l.on(o,"pointerdown",c=>c.stopPropagation()),l.on(a,"pointerdown",c=>c.stopPropagation()),l.on(o,"click",i("from")),l.on(a,"click",i("to")),dr(),La(()=>{I().then(c=>A(c).then(u=>Xi(u)))}),qa(c=>{ye(),w(c||"Choose a plan to use Tik Tik."),An(!0)}),Ua(),ft()}function nf(){let t=e=>{!e||e.dataset.aiSubmitBound||(e.dataset.aiSubmitBound="1",l.on(e,"click",()=>{I().then(n=>{Bn(n||null)})}))};t(document.querySelector("#submitbtn")),l.setInterval(()=>t(document.querySelector("#submitbtn")),2e3)}async function Or(){if(!l.alive||D())return;if(!kt()){pr(),Zo(),Cn();return}if(!await l.waitFor("#post_select",{attempts:ei}))return;Ns(e=>{let n=String(e?.message||e?.source||"error").slice(0,120);In(n)}),ef(),Qi(),nf(),nc(()=>xd());let t=document.querySelector("#post_select");if(t?.value){let e=t.selectedOptions?.[0]?.textContent?.trim()||t.options?.[t.selectedIndex]?.textContent?.trim()||t.value;Tn(String(t.value),e)}uc||(uc=!0,l.setTimeout(()=>ft(),800),l.setTimeout(async()=>{await bt()&&await Yi()},1500))}var Wc=["get-family-consular-schedule-days","get-family-ofc-schedule-days"];function Fc(t){let e=new URL(t,window.location.href).searchParams.get("route");return e?e.split("/").pop():null}function of(t){if(t.data.status===429)return{retryAfter:t.data.retryAfter,cgiBlock:t.data.cgiBlock};let e=Fc(t.data.url),i=new URLSearchParams(t.data.request||"").get("parameters");if(!i)return null;let o;try{o=JSON.parse(i)}catch{return null}return{params:o,tail:e,response:t.data.response}}async function rf(t,e={}){t?.length&&(await $s(t,e),await _("audioAlert")&&us())}async function af(t,e=!1){if(e||D())return null;let n=new Date;n.setHours(0,0,0,0);let i=(t||[]).map(c=>{if(!c)return null;let u=Zi(c.Date);return u?{...c,Date:u}:null}).filter(Boolean).filter(c=>{let[u,f,p]=c.Date.slice(0,10).split("-").map(Number);return!u||!f||!p?!1:new Date(u,f-1,p)>=n}).sort((c,u)=>String(c.Date).localeCompare(String(u.Date))),o=await Xe();if(o){let c=i.filter(p=>be(p.Date,o.from,o.to));if(!c.length||!(o.submitArmed||!!await _("autoSelectFirstDate")))return null;let f=Ge(c.length);return c[f]?.Date||null}if(!await _("autoSelectFirstDate")||!i.length)return null;let a=Ge(i.length);return i[a]?.Date||null}async function sf(t,e){if(!t||D()||Ye())return;let n=e?`none in ${e.from} \u2192 ${e.to}`:"outside preferred range";R(`Dates found but ${n} \u2014 jumping calendar to ${t} (not booking)\u2026`);try{await l.waitFor(Yc,{attempts:80,interval:Y})}catch{}l.send({action:"selectFirstDate",date:t,navigateOnly:!0,maxMs:4e3,pollMs:Y})}function Zi(t){if(t==null)return null;let e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}/.test(e))return e.slice(0,10);let n=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(n){let[,o,a,c]=n;return`${c}-${String(o).padStart(2,"0")}-${String(a).padStart(2,"0")}`}let i=e.match(/\/Date\((-?\d+)\)\//);if(i){let o=new Date(Number(i[1]));if(!Number.isNaN(o.getTime())){let a=o.getFullYear(),c=String(o.getMonth()+1).padStart(2,"0"),u=String(o.getDate()).padStart(2,"0");return`${a}-${c}-${u}`}}return null}function cf(t){if(!t)return!1;let[e,n,i]=t.slice(0,10).split("-").map(Number);if(!e||!n||!i)return!1;let o=n-1,a=String(n).padStart(2,"0")+"/"+String(i).padStart(2,"0")+"/"+e,c=document.querySelector("#datepicker");if(c){let u=String(c.value||"").trim();if(u===a)return!0;if(u.includes(String(e))&&u.includes(String(i).padStart(2,"0"))){let f=u.split(/[/-]/).map(p=>parseInt(p,10));if(f.length>=3){let p,m,y;if(f[2]>31?(m=f[0],y=f[1],p=f[2]):(p=f[0],m=f[1],y=f[2]),p===e&&m===n&&y===i)return!0}}try{let f=window.jQuery||window.$;if(f&&f(c).hasClass("hasDatepicker")){let p=f(c).datepicker("getDate");if(p&&p.getFullYear()===e&&p.getMonth()===o&&p.getDate()===i)return!0}}catch{}}for(let u of document.querySelectorAll("td.ui-datepicker-current-day, td.ui-state-active, td[data-handler='selectDay'].ui-state-active")){let f=u.querySelector("a");if(!f)continue;let p=parseInt(u.getAttribute("data-month"),10),m=parseInt(u.getAttribute("data-year"),10),y=parseInt(f.textContent,10);if(m===e&&p===o&&y===i)return!0}return!1}var Ji=null;function Uc(t,e){Ji&&l.clear(Ji);let n=Date.now()+(e?je:8e3),i=()=>{!l.alive||Date.now()>n||cf(t)||(l.send({action:"selectFirstDate",date:t,maxMs:e?je:8e3,pollMs:Y}),Ji=l.setTimeout(i,Y))};Ji=l.setTimeout(i,80)}function zc(t){let e=String(t||"").trim(),n=e.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/);return n?n[1]:e}function lf(t){let e=Number(t?.EntriesAvailable);return Number.isFinite(e)?e:-1}function Kc(t){return t?.length?t.map((e,n)=>({entry:e,index:n,avail:lf(e)})).sort((e,n)=>n.avail!==e.avail?n.avail-e.avail:e.index-n.index):[]}function uf(t){let e=Kc(t);return e.length?{entry:e[0].entry,slotIndex:e[0].index}:{entry:null,slotIndex:0}}function Br(){Se&&(l.clear(Se),Se=null)}var Nr=['#schedule-entries table input[type="radio"]:not([disabled])','#schedule-entries table input[type="checkbox"]:not([disabled])','#page_form table input[type="radio"]:not([disabled])','#page_form table input[type="checkbox"]:not([disabled])','table input[type="radio"]:not([disabled])','table input[type="checkbox"]:not([disabled])'].join(", "),to=null,eo=null,Se=null,no="";function df(t,e){to=t,eo=e?String(e).slice(0,10):null}var ff=8e3,Rr=!1;async function jc(t){if(Rr||Qe())return!1;Rr=!0;try{Br(),to=null,eo=null;let e=await xr(t);return e?(no=e,Uc(e,!0),Gc(e,On),!0):(Ht(),R("No time slots left on this city \u2014 next city in 15\u201318s\u2026"),!1)}finally{Rr=!1}}function Gc(t,e=0){Se&&l.clear(Se);let n=t?String(t).slice(0,10):null,i=Date.now(),o=async()=>{if(!l.alive||Ye()||G())return;if(Date.now()-i>=ff){let c=eo===n?(to||[]).filter(f=>f&&f.Time):[],u=document.querySelector(Nr);if(!c.length&&!u){await jc("No time slots");return}if(Date.now()-i>=2e4)return}let a=eo===n?(to||[]).filter(c=>c&&c.Time):[];if(a.length){let{entry:c,slotIndex:u}=uf(a);if(R(`Watchdog: picking time slot #${u+1}\u2026`),await bn({time:zc(c.Time),date:c.Date?String(c.Date).slice(0,10):n,slotIndex:u,pollMs:Y,maxMs:600,prefix:d}),G())return}else if(document.querySelector(Nr)&&(R("Watchdog: picking visible time slot\u2026"),await bn({time:"00:00",date:n,slotIndex:e,pollMs:Y,maxMs:600,prefix:d}),G()))return;Se=l.setTimeout(o,Y)};Se=l.setTimeout(o,300)}var Yc=["#datepicker.hasDatepicker","#datepicker"].join(", ");async function pf(t,e=!1){if(e)return null;let n=await Xe(),i=await bt(),o=await af(t,e),a=new Date;a.setHours(0,0,0,0);let c=(t||[]).map(p=>Zi(p?.Date)).filter(Boolean).filter(p=>{let[m,y,g]=p.slice(0,10).split("-").map(Number);return new Date(m,y-1,g)>=a}).sort((p,m)=>p.localeCompare(m));if(!o&&n&&c.length&&!c.filter(m=>be(m,n.from,n.to)).length)return await sf(c[0],n),null;if(!o)return null;let u=n?c.filter(p=>be(p,n.from,n.to)):c,f=Ge(u.length);return R(`Selecting date #${f+1}: ${o} (fast)\u2026`),ji(o),no=String(o).slice(0,10),await l.waitFor(Yc,{attempts:80,interval:Y}),l.send({action:"selectFirstDate",date:o,maxMs:i||n?je:8e3,pollMs:Y}),Uc(o,i||n),Gc(o,On),o}async function mf(t,e=!1){if(e||D()||Ye())return;let n=await bt(),i=await Xe();if(!n&&!i&&!await _("autoSelectFirstDate"))return;Br();let o=(t||[]).filter(g=>!(!g||!g.Time||g.EntriesAvailable!=null&&Number(g.EntriesAvailable)<=0)),a=n||i;a&&(o=o.filter(g=>{let b=g.Date?String(g.Date).slice(0,10):null;return b?b>=a.from&&b<=a.to:!0}));let c=Kc(o);if(!c.length)return;let u=Date.now()+1e4;for(;Date.now()<u&&l.alive&&!(Is(o)||document.querySelector(Nr));)await new Promise(g=>l.setTimeout(g,Y));let f=c.length===1?Dn:wc;R(c.length===1?`1 time slot \u2014 try highest avail, wait \u2264${f/1e3}s for Submit\u2026`:`${c.length} time slots \u2014 try highest\u21922nd\u21923rd\u2026 (${f/1e3}s each for Submit)`);for(let g=0;g<c.length;g++){if(!l.alive||Ye()||D())return;let{entry:b,index:x,avail:C}=c[g],M=zc(b.Time),S=b.Date?String(b.Date).slice(0,10):null,$=g===0?"highest":g===1?"2nd-highest":g===2?"3rd-highest":`${g+1}th-highest`;if(R(`Trying ${$} avail (${C}) @ ${M} \u2014 slot ${g+1}/${c.length}\u2026`),!await bn({time:M,date:S,slotIndex:x,pollMs:Y,maxMs:4e3,prefix:d})&&!G()){R(`Could not click ${M} \u2014 trying next\u2026`);continue}if(R(`Selected ${M} (${$}) \u2014 waiting \u2264${f/1e3}s for Submit to enable\u2026`),await Ar(f)){R(`Submit enabled on ${M} \u2014 clicking\u2026`),n?await Dr(n.accountId):Mr();return}g<c.length-1&&R(`Submit still disabled on ${M} \u2014 trying next (${g+2}/${c.length})\u2026`)}R(`Tried all ${c.length} time slot(s); Submit never enabled.`);let p=document.querySelector("#post_select"),m=p?String(p.value||""):"",y=p?.selectedOptions?.[0]?.textContent?.trim()||p?.options?.[p.selectedIndex]?.textContent?.trim()||"";br(m,y)}async function Vc(t){if(!j()||D())return;let e;try{e=of(t)}catch{return}if(e==null)return;if(Bs(e),e.retryAfter!==void 0){let a=Number(e.retryAfter);Ea(e.cgiBlock,a),a?(wi(a),$r(a)):_("defaultWaitTime").then(c=>{wi(c),$r(c)});return}if(["query-consular-posts","query-ofc-posts"].includes(e.tail)){let a=e.response.Posts||[],c=new Map((await Pt()).map(u=>[u.ID,u]));for(let u of a)c.set(u.ID,{...c.get(u.ID),...u});await $e([...c.values()])}if(["query-family-members-consular","query-family-members-consular-reschedule","query-family-members-ofc","query-family-members-ofc-reschedule"].includes(e.tail)){let a=e.response.Members||[];if(a.length){let c=await B()||{},u=c.name&&a.find(f=>f.FullName===c.name);c.visa=(u||a[0]).VisaClassName,await T({profile:c,members:a})}}if(Wc.includes(e.tail)){Ct(),ms(e);let a=(e.response.ScheduleDays||[]).map(x=>Zi(x?.Date)).filter(Boolean).sort(),c=a.length;if(c&&R(`${c} date${c===1?"":"s"} available \u2014 see list below`),c>0&&!e.response.HasError&&rt(),Tc(),!e.response.HasError&&c>0){let x=String(e.params.postId||""),C=a[0],M=a[a.length-1];we(x,!0,""),R(`${c} date${c===1?"":"s"} \u2014 alerting others FAST\u2026`),Ve(x)?we(x,!1,""):we(x,!0,"")}else e.response.HasError||we(String(e.params.postId||""),!1,"");let u=await bt(),f=await Xe(),p=u||f;await xe()||_("defaultWaitTime").then(x=>{wi(x)});let y=await Pt(),g=y.find(x=>x.ID===e.params.postId);if(g&&(g.Days=e.response.ScheduleDays,g.Updated=Date.now(),g.HasError=e.response.HasError,g.ErrorString=new DOMParser().parseFromString(e.response.ErrorString||"","text/html").body.innerText,$e(y)),!e.response.HasError&&c>0){let x=String(e.params.postId||""),C=a[0],M=a[a.length-1],S=C,$=M,Q=c;if(p?.from&&p?.to){let tt=a.filter(wo=>be(wo,p.from,p.to));tt.length&&(S=tt[0],$=tt[tt.length-1],Q=tt.length)}Ve(x)?we(x,!1,g?.Name||""):we(x,!0,g?.Name||"")}if(await rf(e.response.ScheduleDays,{postId:e.params.postId,postName:g?.Name,hasError:e.response.HasError}),await ks(e.response.ScheduleDays,{postId:e.params.postId,postName:g?.Name,hasError:e.response.HasError}),Qe())rt(),R("Submit pending \u2014 staying on this city (date reload ignored)\u2026");else if(p&&!e.response.HasError){let x=Ln(e.response.ScheduleDays,p.from,p.to);x.length?(rt(),R(`${x.length} date${x.length===1?"":"s"} in range \u2014 selecting (city hold)\u2026`)):Ht()}else p?Ht():c>0&&!e.response.HasError&&(await _("autoSelectFirstDate")||Ht());let b=Qe()?null:await pf(e.response.ScheduleDays,e.response.HasError);if(b)rt(),await Cs(g?.Name,b);else if(p&&!e.response.HasError&&!Qe()){let x=(e.response.ScheduleDays||[]).map(M=>Zi(M?.Date)).filter(Boolean).sort((M,S)=>M.localeCompare(S)),C=x.filter(M=>be(M,p.from,p.to));x.length&&!C.length?(Ht(),R(`Dates found but none in ${p.from} \u2192 ${p.to}. Jumped calendar (not booking). Next city in 15\u201318s\u2026`)):x.length||(Ht(),R("No dates on this city \u2014 next city in 15\u201318s\u2026"))}await di()}if(["get-family-consular-schedule-entries","get-family-ofc-schedule-entries"].includes(e.tail)){let a=e.params.Date.split("T")[0];df(e.response.ScheduleEntries,a),Br();let c=await Pt(),u=c.filter(m=>m.Days&&m.Updated).sort((m,y)=>y.Updated-m.Updated).find(m=>m.Days.some(y=>y.Date===a));if(u){let m=u.Days.find(y=>y.Date===a);m&&(m.Times=e.response.ScheduleEntries,$e(c))}let f=(e.response.ScheduleEntries||[]).filter(m=>m&&m.Time);if(no&&a!==no){await di();return}let p=f.filter(m=>m.EntriesAvailable==null||Number(m.EntriesAvailable)>0);if(hs(f,a,u?.Name),f.length){let m=p.reduce((g,b)=>{let x=Number(b.EntriesAvailable);return g+(Number.isFinite(x)?x:0)},0),y=m>0?` \xB7 ${m} available`:"";R(`${p.length||f.length} time slot${(p.length||f.length)===1?"":"s"} on ${a}${y}`)}await mf(e.response.ScheduleEntries,e.response.HasError),Qe()?(rt(),R("Submit pending \u2014 staying on this city (time reload ignored)\u2026")):p.length?(rt(),await Ts(u?.Name,e.params.Date,p.length)):await jc("No time slots on this date"),await di()}}function Qc(t){if(!j()||D())return;let e=Fc(t.data.url);Wc.includes(e)&&ss()}var Hr=null,Wr="";function Xc(t){if(t?.length)for(let e of t.slice(0,2)){let n=document.createElement("div");n.className=s.cfFlash,n.dataset[q.mark]="",n.style.left=`${e.x-14}px`,n.style.top=`${e.y-14}px`,document.documentElement.appendChild(n),l.setTimeout(()=>n.remove(),1200)}}async function V(t,e){Fr(),Wr=t||""}function Fr(){let t=document.querySelector(h(r.cfHud));t&&t.remove(),Wr="",Hr&&(l.clear(Hr),Hr=null)}function Ur(){return Wr}var hf=/we'?re sorry,\s*but something went wrong|error id\s*#\s*\[|contact the website administrator/i,gf=/\bUSG\s+[a-f0-9-]{8,}/i;var Kr="vsPortalErrorReloadCount",tl="vsPortalErrorReloadAt",yf=2e3,bf=1e4,Jc=!1,Je=null,xf=null;function wf(){return(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim()}function Ze(){let t=wf().slice(0,6e3);return t?!!(/a timeout occurred/i.test(t)&&(/error\s*524/i.test(t)||/origin web server timed out/i.test(t)||/cloudflare ray id/i.test(t))||/error\s*524/i.test(t)&&/cloudflare/i.test(t)&&t.length<8e3||hf.test(t)&&(gf.test(t)||/error id\s*#/i.test(t))||/we'?re sorry,\s*but something went wrong/i.test(t)&&t.length<2500):!1}function el(){try{return Math.max(0,Number(sessionStorage.getItem(Kr)||0))}catch{return 0}}function Sf(){try{let t=el()+1;return sessionStorage.setItem(Kr,String(t)),sessionStorage.setItem(tl,String(Date.now())),t}catch{return 1}}function zr(){try{sessionStorage.removeItem(Kr),sessionStorage.removeItem(tl)}catch{}}function vf(t){return Math.min(bf,yf+Math.max(0,t-1)*1e3)}function $f(){Je&&(l.clear(Je),Je=null)}function kf(){Sf();try{location.reload()}catch{}}function Zc(){if(!l.alive||Je)return;if(!Ze()){zr();return}let t=el()+1,e=vf(t);Je=l.setTimeout(()=>{if(Je=null,!!l.alive){if(!Ze()){zr();return}kf()}},e)}function nl(){if(Jc)return;Jc=!0;let t=()=>{l.alive&&(Ze()?Zc():(zr(),$f()))};t(),xf=l.setInterval(t,1500);try{let e=new MutationObserver(()=>{l.alive&&Ze()&&Zc()});e.observe(document.documentElement,{childList:!0,subtree:!0,characterData:!0}),l.disposable(()=>e.disconnect())}catch{}}var io="vsDebugLogs",Cf=200;function Tf(){try{return new Date().toLocaleTimeString("en-IN",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})}catch{return new Date().toISOString().slice(11,19)}}async function K(t,e,n){let i={at:Date.now(),t:Tf(),tag:String(t||"app").slice(0,24),msg:String(e||"").slice(0,400)};if(n!=null)try{i.data=JSON.parse(JSON.stringify(n))}catch{i.data=String(n).slice(0,200)}try{console.log(`[VS6 ${i.tag}] ${i.msg}`,n!==void 0?n:"")}catch{}try{let o=await k({[io]:[]}),a=Array.isArray(o[io])?o[io].slice():[];for(a.push(i);a.length>Cf;)a.shift();await T({[io]:a})}catch{}}var tn="homeVerifyPendingAt",ro=null,jn=0,Kn=null,Ft=0;function il(){try{return document.visibilityState==="hidden"||document.hidden===!0}catch{return!1}}function ol(){if(Ef()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||/visa application home/i.test(document.title||"")||!!document.querySelector(".username, #appointment-card")||!!F()&&!/\/(schedule|ofc-schedule|c-schedule)\b/i.test(t)}async function en(){try{if(!ol())return;F()&&!X()?await T({[tn]:Date.now()}):(await k(tn))[tn]&&await T({[tn]:0})}catch{}}async function so(){try{if(F()&&!X()&&ol())return!0;let t=await k(tn),e=Number(t[tn])||0;return!(!e||Date.now()-e>30*6e4)}catch{return!1}}async function _f(){try{let t=await k(["humanClickProfile","humanClickServerProfile"]),e=t.humanClickProfile?.samples?.length||0,n=t.humanClickServerProfile?.samples?.length||0;return e+n>=1?400:4e3}catch{return 800}}var Gr=/verify you are human|verify you are a human|verify that you are human|performing security verification|just a moment|checking your browser|confirm you are human|not a robot|security verification|complete the security check|cloudflare/i;function X(){return document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value?!0:!F()&&!Ur()}function F(){if(Ze()||document.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]')?.value)return!1;let t=document.body?.innerText||"";return Gr.test(t)&&/verify|human|moment|checking|robot|security/i.test(t)?!0:ao().length>0}function oo(t){return new Promise(e=>setTimeout(e,t))}function Mf(){let t=[document],e=[document];for(;e.length;){let n=e.shift();for(let i of n.querySelectorAll("*"))i.shadowRoot&&(t.push(i.shadowRoot),e.push(i.shadowRoot))}return t}function ao(){let t=[],e=new Set,n=i=>{if(!i||e.has(i))return;let o=i.getBoundingClientRect();if(o.width<40||o.height<20||o.width>900||o.height>400)return;let a=(i.src||i.getAttribute?.("src")||"").toLowerCase(),c=(i.title||i.getAttribute?.("title")||"").toLowerCase(),u=(i.className?.toString?.()||"").toLowerCase(),f=(i.id||"").toLowerCase(),p=i.tagName==="IFRAME"&&(a.includes("challenges.cloudflare")||a.includes("turnstile")||c.includes("cloudflare")||c.includes("security challenge")),m=u.includes("cf-turnstile")||u.includes("turnstile")||f.includes("turnstile")||f.includes("challenge")||i.hasAttribute?.("data-sitekey")||i.hasAttribute?.("data-turnstile-widget");if(!p&&!m){let y=i.tagName==="IFRAME"&&o.width>=180&&o.width<=460&&o.height>=40&&o.height<=160,g=Gr.test(`${document.title||""} ${document.body?.innerText||""}`.slice(0,4e3));if(!y||!g)return}e.add(i),t.push({el:i,rect:o})};for(let i of Mf()){for(let o of['iframe[src*="challenges.cloudflare"]','iframe[src*="turnstile"]','iframe[title*="Cloudflare"]','iframe[title*="security challenge"]',".cf-turnstile","[data-turnstile-widget]","#challenge-stage","#cf-turnstile","#turnstile-wrapper","[data-sitekey]"])for(let a of i.querySelectorAll(o))n(a);for(let o of i.querySelectorAll("iframe"))n(o)}return t}function Af(t){for(let{el:e}of t)try{e.scrollIntoView({block:"center",behavior:"instant"})}catch{try{e.scrollIntoView({block:"center"})}catch{}}try{window.focus()}catch{}}function Df(){let t=[],e=document.querySelectorAll("label, span, div, p, button");for(let n of e){if(t.length>=2)break;let i=(n.innerText||n.textContent||"").replace(/\s+/g," ").trim();if(!/verify you are human/i.test(i)||i.length>48)continue;let o=n.getBoundingClientRect();o.width<16||o.height<10||o.bottom<0||o.top>window.innerHeight||t.push({x:Math.round(o.left+Math.min(22,Math.max(12,o.width*.12))),y:Math.round(o.top+o.height/2)})}return t}function rl(t){let e=[],n=new Set,i=(o,a)=>{if(!Number.isFinite(o)||!Number.isFinite(a)||o<1||a<1||o>window.innerWidth-1||a>window.innerHeight-1)return;let c=`${Math.round(o)},${Math.round(a)}`;n.has(c)||(n.add(c),e.push({x:Math.round(o),y:Math.round(a)}))};for(let{rect:o}of t){let a=o.top+o.height/2,c=o.left+Math.min(28,Math.max(18,o.width*.11));for(let u of[0,-4,4,-8,8,12,16,20,24,28,32])for(let f of[0,-3,3,-6,6])i(c+u,a+f);i(o.left+o.width*.5,a)}return e}function Pf(t){for(let{el:e,rect:n}of t)try{e.click();let i=n.left+Math.min(26,n.width*.12),o=n.top+n.height/2,a=document.elementFromPoint(i,o)||e;for(let c of["pointerdown","mousedown","mouseup","pointerup","click"])a.dispatchEvent(new MouseEvent(c,{bubbles:!0,cancelable:!0,clientX:i,clientY:o,view:window}))}catch{}for(let e of[".ctp-checkbox-label","label.ctp-checkbox-label","#challenge-stage label",".cf-turnstile input","#challenge-stage input[type='checkbox']","input[type='checkbox']"])for(let n of document.querySelectorAll(e)){let i=n.getBoundingClientRect();if(i.width<4&&i.height<4)continue;let o=(n.textContent||n.getAttribute("aria-label")||"").toLowerCase();if(e.includes("checkbox")&&!o.includes("human")&&!o.includes("verify")&&e==="input[type='checkbox']"){let a=n.closest("label, div, form");if(!Gr.test(a?.textContent||""))continue}return n.click(),!0}return!1}async function jr(t){t.length&&(Xc(t.slice(0,3)),l.send({action:"viewportClickPoints",points:t}))}function Ef(){return/\/(schedule|ofc-schedule|c-schedule)\b/i.test(location.pathname||"")}async function Yr(){if(!await _("autoCloudflareTick"))return!1;if(await en(),X())return Ft&&K("cf","challenge already solved"),Ft=0,await V("success"),!0;if(il())return await en(),await V("manual","Verify you are human on Home (background) \u2014 open that tab and click once."),!1;Ft||(Ft=Date.now(),K("cf","challenge seen \u2014 train window started"));let t=await _f();if(Date.now()-Ft<t)return await V("scanning","Verify you are human \u2014 clicking in a moment\u2026"),!1;await V("scanning","Verify you are human page \u2014 preparing click\u2026");let e=ao();Af(e),await oo(250),e=ao();let n=rl(e);return K("cf","train window done \u2014 attempting auto click",{widgets:e.length,points:n.length}),n.length||K("cf","no checkbox points \u2014 widget not found on this page"),n.length&&(await jr(n),await oo(1200),X()||!F())?(Ft=0,await V("success"),!0):(await V("dom"),Pf(e),await oo(600),X()||!F()?(Ft=0,await V("success"),!0):n.length&&(await jr(n),await oo(1e3),X()||!F())?(Ft=0,await V("success"),!0):(jn++,jn>=8?await V("manual","Click the checkbox once \u2014 we will continue after."):await V("retry",`Retry ${jn}/8\u2026`),!1))}function If(){Kn||(Kn=new MutationObserver(()=>{l.alive&&F()&&!X()&&Yr()}),Kn.observe(document.documentElement,{childList:!0,subtree:!0}),l.disposable(()=>{Kn?.disconnect(),Kn=null}))}function Vr(){ro&&(l.clear(ro),ro=null),jn=0,Ft=0,Fr()}async function Qr(){Vr(),If();let t=async()=>{if(!l.alive||(F()&&!X()?await en():await en(),il()))return;let e=ao(),n=[...Df(),...rl(e)].slice(0,3);if(!n.length){Ur()&&(jn=0,await V("success"));return}K("cf","verify widget found \u2014 clicking",{widgets:e.length,points:n}),await V("scanning","Clicking Verify you are human\u2026"),await jr(n)};t(),ro=l.setInterval(t,1800)}var nn="sessionRecovery",Xr="homeKeepaliveAt",Jr="homeLoadingStuckAt",ea="vsResubmitContinue",al=2e3,lo=!1,sl=null,Zr=null,ta=null,co=null,Gn=0;function oa(){try{if(F()&&!X())return en().catch(()=>{}),!1}catch{}try{let t=new URL(location.href),e=new URL(t.origin+t.pathname);return e.searchParams.set("_vsr",String(Date.now()%1e12)),location.replace(e.pathname+e.search+e.hash),!0}catch{try{return location.href=location.pathname+"?_vsr="+String(Date.now()%1e12),!0}catch{return!1}}}function fl(){try{if(sessionStorage.getItem(ea)!=="1")return!1;sessionStorage.removeItem(ea)}catch{return!1}return Mt()||document.querySelector("#post_select")?!1:(oa(),!0)}function cl(){return v.homeKeepaliveMinMs}function Lf(){return v.homeKeepaliveMaxMs}function qf(){return v.homeKeepaliveDebounceMs}function ll(){return v.loadingStuckMs}function Of(){return v.loadingStuckDebounceMs}function ul(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function Rf(t,e){let n=ul(t);if(!n)return"";let i="",o=0;for(let a of e||[]){let c=ul(a.q);if(!c||!a.a)continue;if(n.includes(c)||c.includes(n))return a.a;let u=c.split(" ").filter(m=>m.length>3),f=0;for(let m of u)n.includes(m)&&f++;let p=u.length?f/u.length:0;p>o&&p>=.5&&(o=p,i=a.a)}return i}async function Nf(){let t=await k([Xt,"profile"]),e=t[Xt]||{},n=t.profile?.id?String(t.profile.id):null,i=n?e[n]:null;return i||(i=Object.values(e).find(o=>o?.loginId&&o?.loginPass)||null),i||{}}function dl(t,e){if(!t)return;let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,i=Object.getOwnPropertyDescriptor(n,"value")?.set;i?i.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function ie(t){return new Promise(e=>setTimeout(e,t))}function _t(t,e){return t+Math.random()*(e-t)}async function na(t,e){if(!t||e==null)return;let n=String(e);if(t.value===n)return;t.focus(),await ie(_t(250,600)),dl(t,"");let i="";for(let o=0;o<n.length;o++){let a=n[o];i+=a,dl(t,i),t.dispatchEvent(new KeyboardEvent("keydown",{key:a,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:a,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:a,bubbles:!0}));let c=_t(90,220);/[\s@._]/.test(a)&&(c+=_t(120,320)),Math.random()<.08&&(c+=_t(200,450)),await ie(c)}t.dispatchEvent(new Event("change",{bubbles:!0})),t.blur(),await ie(_t(200,500))}var uo=!1,fo=!1;function po(t){return!t||t.disabled?!1:(t.click(),!0)}function Bf(){let t=[...document.querySelectorAll("label, .form-check-label, span")],e=0;for(let i of t){let o=(i.textContent||"").toLowerCase();if(!/privacy act|confidentiality statement/.test(o))continue;let a=i.querySelector("input[type='checkbox']")||document.getElementById(i.getAttribute("for")||"");a&&!a.checked&&(po(a),e++)}let n=[...document.querySelectorAll("button, input[type='submit'], a.btn")].find(i=>/^(continue|ok|accept|agree)$/i.test((i.textContent||i.value||"").trim()));return e&&n&&po(n),e>0}function pl(){return!!(document.querySelector("#password")||document.querySelector("input[type='password']")||document.querySelector("#next")||/sign in/i.test(document.querySelector("button, input[type='submit']")?.value||""))}async function Hf(t){if(uo)return!0;let e=document.querySelector("#signInName, #signInNameReadOnly, input[type='email'], input[name='loginfmt']"),n=document.querySelector("#password, input[type='password']");if(!e&&!n)return!1;uo=!0;try{e&&t.loginId&&e.value!==t.loginId&&(await na(e,t.loginId),await ie(_t(400,900))),n&&t.loginPass&&!n.value&&(await na(n,t.loginPass),await ie(_t(500,1100)));let i=document.querySelector("#next, button#next, input[type='submit']#next")||[...document.querySelectorAll("button, input[type='submit']")].find(o=>/sign in|log in|continue/i.test(o.textContent||o.value||""));return i&&(n?.value||t.loginPass)?(await ie(_t(600,1400)),po(i),!0):!!(e||n)}finally{uo=!1}}async function Wf(t){if(fo)return!0;let e=[],n=[...document.querySelectorAll("label, p, span, div.form-group")];for(let o of n){let a=(o.textContent||"").trim();if(a.length<12||a.length>220||!/\?/.test(a)&&!/born|spouse|school|pet|city|town|mother|father|street/i.test(a))continue;let c=o.querySelector("input[type='text']")||document.getElementById(o.getAttribute("for")||"")||o.parentElement?.querySelector("input[type='text']");c&&c.offsetParent!==null&&e.push({text:a,input:c})}for(let o of["kba1_response","kba2_response","kba3_response"]){let a=document.getElementById(o);if(!a)continue;let u=(a.closest(".form-group, .entry, li, div")||a.parentElement)?.textContent||"";e.some(f=>f.input===a)||e.push({text:u,input:a})}let i=[];for(let{text:o,input:a}of e){if(a.value)continue;let c=Rf(o,t.security);c&&i.push({input:a,ans:c})}if(!i.length)return!1;fo=!0;try{for(let{input:a,ans:c}of i)await na(a,c),await ie(_t(350,800));await ie(_t(600,1400));let o=document.querySelector("button#continue, #continue")||[...document.querySelectorAll("button, input[type='submit']")].find(a=>/continue|submit|verify/i.test(a.textContent||a.value||""));return o&&po(o),!0}finally{fo=!1}}function ml(){let t=location.pathname||"";return/\/(schedule|ofc-schedule)/i.test(t)||F()||document.querySelector("input[type='password']")||document.querySelector("#kba1_response, #kba2_response")?!1:!!(document.querySelector(".username, #appointment-card, .usa-sidenav")||/visa application home|manage appointments/i.test(document.body?.innerText||""))}function Mt(){return Rn()||/\/(ofc-schedule|schedule|c-schedule)/i.test(location.pathname)}function Ff(t=""){return/\/(ofc-schedule|schedule|c-schedule|interview|confirmation)/i.test(String(t||""))}function ia(){if(Mt()||document.querySelector("#post_select"))return!1;let t=location.pathname||"";return/atlasauth|b2clogin/i.test(location.host)||F()||/^\/(en-US)?\/?$/i.test(t)||/\/en-US\/?$/i.test(t)||document.querySelector(".username, #appointment-card")?!0:/visa application home/i.test(document.title||"")}function Uf(t){return!!(t?.loginId&&t?.loginPass)}function zf(){return ml()?!1:!!(pl()||document.querySelector("#kba1_response, #kba2_response, #kba3_response")||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))}async function Kf(){let t=(await k(nn))[nn],e=!!t?.active,n=await Nf();if(F()){await Yr();return}if(Bf(),ml()){e&&(await T({[nn]:{...t,active:!1,doneAt:Date.now()}}),l.send({action:"recoveryReturnToOfc"}));return}zf()&&Uf(n)&&await _("autofillLogin")&&(await Wf(n)||(pl()||document.querySelector("#signInName, #signInNameReadOnly, input[type='password']"))&&await Hf(n))}function hl(){if(!ia()||sl)return;let t=async()=>{l.alive&&await Kf()};t(),sl=l.setInterval(t,1200)}function gl(){return cl()+Math.random()*(Lf()-cl())}async function yl(){try{if(await so())return!1;let t=await k(Xr),e=Number(t[Xr])||0;return Date.now()-e<qf()?!1:(await T({[Xr]:Date.now()}),!0)}catch{return!0}}function bl(){if(Mt()||!ia()||document.querySelector("#post_select")||Zr)return;let t=()=>{l.alive&&(Zr=l.setTimeout(async()=>{if(Zr=null,!l.alive||Mt()||Ff(location.href)||document.querySelector("#post_select")||!ia())return;if(uo||fo||lo){t();return}if((await k(nn))[nn]?.active){t();return}if(await so()){t();return}if(!await yl()){t();return}try{oa()}catch{t()}},gl()))};t()}function xl(){if(!Mt()||ta)return;let t=()=>{l.alive&&(ta=l.setTimeout(async()=>{if(ta=null,!(!l.alive||!Mt())){if(await yl())try{l.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}t()}},gl()))};t()}async function jf(){try{let t=await k(Jr),e=Number(t[Jr])||0;return Date.now()-e<Of()?!1:(await T({[Jr]:Date.now()}),!0)}catch{return!0}}function wl(){if(!Mt()||co)return;let t=async()=>{if(co=null,!(!l.alive||!Mt())){try{if(Sr()){if(Gn||(Gn=Date.now()),Date.now()-Gn>=ll()){if(!await so()&&await jf()){try{R(`Date Loading stuck \u2265${ll()/1e3}s \u2014 reloading Application Home\u2026`)}catch{}try{l.send({action:"homeKeepalive",ofcUrl:location.href,ofcTabId:null})}catch{}}Gn=Date.now()}}else Gn=0}catch{}l.alive&&Mt()&&(co=l.setTimeout(t,al))}};co=l.setTimeout(t,al)}async function Sl(t){let e=String(t||"");if(/form resubmission|information that you entered|action that you took to be repeated|returning to that page might cause/i.test(e)){if(!Mt()&&!document.querySelector("#post_select")){try{sessionStorage.setItem(ea,"1")}catch{}l.setTimeout(()=>oa(),300)}return}if(!/PSE0501|unable to load appointment available days/i.test(e)||lo)return;lo=!0,l.setTimeout(()=>{lo=!1},8e3);let n=await I();await T({[nn]:{active:!0,ofcUrl:location.href,accountId:n,startedAt:Date.now()}}),l.send({action:"recoveryStart",ofcUrl:location.href})}var ho="humanClickProfile",aa=150,la=120,Gf=250,vl=!1,Dt=[],mo=0,pt=0,oe=0,U=null,sa=0,Vn=!1,on=null,go=0,bo=0,Qn=[],At=!1,ve=!1;function Yf(){let t=[];for(let e of document.querySelectorAll('iframe[src*="challenges.cloudflare"], iframe[src*="turnstile"], .cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]')){let n=e.getBoundingClientRect();n.width<40||n.height<20||n.width>900||n.height>400||t.push(n)}if(!t.length&&F())for(let e of document.querySelectorAll("iframe")){let n=e.getBoundingClientRect();n.width>=120&&n.width<=420&&n.height>=45&&n.height<=120&&t.push(n)}return t}function Xn(){let t=Yf();if(!t.length)return null;let e=t[0];return{x:e.left+Math.min(28,Math.max(18,e.width*.11)),y:e.top+e.height/2,w:e.width,h:e.height,left:e.left,top:e.top}}function rn(t,e,n){return n?t>=n.left-40&&t<=n.left+n.w+40&&e>=n.top-30&&e<=n.top+n.h+30:!1}function Tl(t){let e=performance.now();mo||(mo=e);let n=U,i=n?(t.clientX-n.x)/Math.max(24,n.w*.12):0,o=n?(t.clientY-n.y)/Math.max(20,n.h*.5):0;Dt.push({nx:Math.round(i*1e3)/1e3,ny:Math.round(o*1e3)/1e3,x:Math.round(t.clientX),y:Math.round(t.clientY),t:Math.round(e-mo)}),Dt.length>la&&Dt.shift()}async function xo(){return(await k(ho))[ho]||{version:2,maxSamples:aa,samples:[],avgHoverMs:420,avgPressMs:70,avgApproachMs:800,liveTrained:!1}}function ra(t,e,n){if(!t.length)return n;let i=t.reduce((o,a)=>o+(Number(a[e])||0),0);return Math.round(i/t.length)}async function _l(t,{force:e=!1}={}){let n=Date.now();if(!e&&n-sa<Gf)return null;sa=n;let i=await xo(),o=Array.isArray(i.samples)?i.samples.slice():[];for(t.clientId||(t.clientId=`hc-${t.at||n}-${Math.random().toString(36).slice(2,10)}`),t.uploaded=!1,o.push(t);o.length>aa;)o.shift();let a={version:2,maxSamples:aa,samples:o,avgHoverMs:ra(o,"hoverMs",420),avgPressMs:ra(o,"pressMs",70),avgApproachMs:ra(o,"approachMs",800),updatedAt:n,liveTrained:!0,source:"visa-page-live"};return await T({[ho]:a}),go=o.length,K("human",`saved sample locally #${o.length}`,{capture:t.capture||"page",pressMs:t.pressMs,hoverMs:t.hoverMs,pathPts:Array.isArray(t.path)?t.path.length:0,clientId:t.clientId}),Ml(t,a).catch(()=>{}),Al().catch(()=>{}),a}async function Vf(t){if(!t)return;let e=await xo(),n=Array.isArray(e.samples)?e.samples.slice():[],i=!1;for(let o of n)o?.clientId===t&&!o.uploaded&&(o.uploaded=!0,i=!0);i&&await T({[ho]:{...e,samples:n,updatedAt:Date.now()}})}async function Ml(t,e){try{if(!await _("serverSync"))return K("upload","skipped \u2014 serverSync is OFF"),!1;let n=await B()||{},i=t.clientId||`hc-${t.at||Date.now()}-${Math.random().toString(36).slice(2,8)}`;t.clientId=i;let o={client_id:i,profile:{id:n.id||"",email:n.email||"",name:n.name||"",visa:n.visa||""},sample:t,profile_meta:{sampleCount:e?.samples?.length||0,avgHoverMs:e?.avgHoverMs,avgPressMs:e?.avgPressMs,avgApproachMs:e?.avgApproachMs,liveTrained:!0,source:"visa-page-live",extensionHost:location.host}};K("upload",`sending sample ${i}`,{sampleCount:e?.samples?.length||0,email:n.email||""}),l.send({action:"uploadHumanClickSample",payload:o});try{chrome.runtime.sendMessage({action:"uploadHumanClickSample",payload:o},a=>{if(chrome.runtime.lastError){K("upload",`SW error: ${chrome.runtime.lastError.message}`);return}a?.success?(K("upload",`server OK id=${a.id??"?"} status=${a.status??""}`,{clientId:i}),Vf(i)):K("upload",`server FAIL ${a?.error||a?.status||"unknown"}`,{clientId:i})})}catch(a){K("upload",`sendMessage threw: ${a?.message||a}`)}return!0}catch(n){return K("upload",`upload threw: ${n?.message||n}`),!1}}async function Al(){try{if(!await _("serverSync"))return;let t=await xo(),n=(Array.isArray(t.samples)?t.samples:[]).filter(i=>i&&i.uploaded!==!0).slice(-40);for(let i of n)await Ml(i,t),await new Promise(o=>setTimeout(o,80))}catch{}}function Dl(t,e={}){let n=performance.now(),i=Math.max(25,Math.min(500,pt?n-pt:70)),o=Math.max(30,Math.min(3e3,pt?pt-(oe||pt):200)),a=(Dt.length?Dt:Qn).slice(-la),c=a.length?a[a.length-1].t:o,u=Math.max(o,Math.min(12e3,c||o)),f=on,p=U||Xn();return{hoverMs:Math.round(o),pressMs:Math.round(i),approachMs:Math.round(u),path:a,down:f?{x:Math.round(f.x),y:Math.round(f.y)}:null,up:t?{x:Math.round(t.clientX),y:Math.round(t.clientY)}:f?{x:Math.round(f.x),y:Math.round(f.y)}:p?{x:Math.round(p.x),y:Math.round(p.y)}:null,target:p?{x:Math.round(p.x),y:Math.round(p.y),w:Math.round(p.w),h:Math.round(p.h),left:Math.round(p.left),top:Math.round(p.top)}:null,viewport:{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio||1,scrollX:Math.round(window.scrollX||0),scrollY:Math.round(window.scrollY||0)},pointerType:t?.pointerType||"mouse",url:location.pathname+location.search,at:Date.now(),...e}}function Yn(){Dt.length&&(Qn=Dt.slice(-la)),Dt=[],mo=0,pt=0,oe=0,on=null}function ua(){Vn||(Vn=!0,ve=!0,Yn(),U=Xn())}function ca(){Vn=!1,U=null,At=!1,Yn()}function yo(t){let e=t?.target;if(!e)return!1;if(e.closest?.(".cf-turnstile, [data-turnstile-widget], #challenge-stage, [data-sitekey]"))return!0;if(e.tagName==="IFRAME"){let n=(e.src||"").toLowerCase();if(n.includes("challenges.cloudflare")||n.includes("turnstile"))return!0;let i=e.getBoundingClientRect();if(i.width>=120&&i.width<=420&&i.height>=45&&i.height<=120)return!0}return!1}async function $l(t){if(l.alive){if(!F()||X()){Vn&&ca();return}ua(),U||(U=Xn()),!oe&&U&&rn(t.clientX,t.clientY,U)&&(oe=performance.now()),U&&rn(t.clientX,t.clientY,U)&&(bo=Date.now()),Tl(t)}}async function kl(t){if(!(!l.alive||t.button!==0)&&!(!F()||X())){ua(),U=Xn(),pt=performance.now(),oe||(oe=pt),on={x:t.clientX,y:t.clientY},Tl(t),(yo(t)||U&&rn(t.clientX,t.clientY,U))&&(At=!0,bo=Date.now()),K("human","pointer down during challenge",{onWidget:yo(t),near:!!(!U||rn(t.clientX,t.clientY,U)),x:Math.round(t.clientX),y:Math.round(t.clientY)});try{V("scanning",`Recording click\u2026 (saved ${go} so far)`)}catch{}}}async function Cl(t){if(!l.alive||t.button!==0||!pt&&!At)return;if(!F()&&!X()){Yn();return}if(!(U&&rn(t.clientX,t.clientY,U)||U&&on&&rn(on.x,on.y,U)||yo(t)||At||!U&&(Dt.length>=2||Qn.length>=2))&&Dt.length<2&&Qn.length<2){Yn();return}let n=Dl(t,{capture:At||yo(t)?"iframe-or-widget":"page"});At=!1,Yn();let i=await _l(n);if(!i)return;let o=i.samples?.length||0;try{V("success",`Saved verify-human click #${o} \u2014 uploaded to server`)}catch{}}async function Qf(){let t=Date.now();if(!ve||!X()&&F())return;if(!(At||t-bo<8e3||Qn.length>=2&&t-sa>500)){ve=!1,ca();return}let n=Dl(null,{capture:"challenge-solved"});At=!1,ve=!1,ca();let i=await _l(n,{force:!0});if(!i)return;let o=i.samples?.length||0;try{V("success",`Saved verify-human click #${o} (after checkbox) \u2014 uploaded to server`)}catch{}}async function Xf(){try{let t=await xo(),e=t.liveTrained&&t.samples?.length||0;return go=e,e}catch{return go}}function Pl(){if(vl)return;vl=!0,K("human","train watcher started",{path:location.pathname}),l.on(window,"pointermove",$l,{passive:!0,capture:!0}),l.on(window,"pointerdown",kl,{passive:!0,capture:!0}),l.on(window,"pointerup",Cl,{passive:!0,capture:!0}),l.on(window,"mousemove",$l,{passive:!0,capture:!0}),l.on(window,"mousedown",kl,{passive:!0,capture:!0}),l.on(window,"mouseup",Cl,{passive:!0,capture:!0}),l.on(window,"blur",()=>{!F()||X()||(At=!0,bo=Date.now(),pt||(pt=performance.now(),oe||(oe=pt)),K("human","page blur during challenge (likely iframe click)"))});let t=async()=>{if(!l.alive)return;if(F()&&!X()){ve||K("human","challenge detected \u2014 recording armed"),ve=!0,ua(),U||(U=Xn());let n=await Xf();try{V("scanning",n?`Train mode \u2014 click Verify you are human naturally (saved ${n})`:"Train mode \u2014 move mouse naturally, then click Verify you are human (recording\u2026)")}catch{}return}(ve||Vn||At)&&await Qf()};t(),l.setInterval(t,1200),l.setTimeout(()=>{K("upload","flushing unsynced local samples\u2026"),Al().catch(()=>{})},2500)}var Jf=`
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
`;function El(){if(document.querySelector(h(r.styles)))return;let t=document.createElement("style");t.id=r.styles,t.dataset[q.mark]="",t.textContent=Jf,(document.head||document.documentElement).appendChild(t)}Ma();qr();pa(()=>{Ec(),l.destroy()});Ga();nl();D()&&I().then(t=>{if(t)return Ni(t);Ue()}).catch(()=>Ue());if(!D()){l.disposable(()=>{let i=document.querySelector(h(r.anchor)),o=document.querySelector("#post_select");i&&o&&i.replaceWith(o);for(let a of document.querySelectorAll("[data-"+q.mark+"]"))a.remove()}),El(),l.send({action:"registerBlockGuard",prefix:d}),l.send({action:"registerRedirect",prefix:d}),l.send({action:"registerAlertGuard",prefix:d}),/\/(schedule|ofc-schedule)/i.test(location.pathname)&&l.send({action:"registerOfcReader",prefix:d}),l.on(window,"message",i=>{if(l.alive&&i.source===window)switch(i.data?.action){case Ut.req:return Qc(i);case Ut.res:return Vc(i);case Ut.ofc:return ys(i);case Ut.err:return Sn("native_alert",i.data?.text),In(String(i.data?.text||"alert").slice(0,120)),Sl(i.data?.text);case Ut.sub:ds(),wn(),_s(),bt().then(o=>{Bn(o?.accountId||null)}).catch(()=>{Bn(null)});return}}),chrome.storage.onChanged.addListener((i,o)=>{o==="local"&&(i.profile&&jo(),i.waitPillClock&&ls(i.waitPillClock.newValue),i.autoCloudflareTick&&(i.autoCloudflareTick.newValue?Qr():Vr()))}),l.on(document,"click",i=>{qe();let o=i.target.closest(h(r.waitTime));if(o){if(o.dataset.skipClick){delete o.dataset.skipClick;return}cs()}}),l.on(document,"keydown",qe),l.on(window,"focus",()=>qe({keepConsular:!0})),l.on(document,"visibilitychange",()=>{document.hidden||qe({keepConsular:!0})}),fs(),fl(),hl(),bl(),xl(),wl(),Pl(),Qr();async function t(){!l.alive||D()||!Rn()||document.querySelector("#post_select")&&(Ct(),await Promise.all([Fo(),zo(),Or()]),Es({slotIndex:On,shouldPick:async()=>await bt()?!0:!!await _("autoSelectFirstDate"),onSlotPicked:()=>Ic()}))}async function e(){!l.alive||D()||!Rn()||await Pc()}async function n(){Pa(),Ia(),await Promise.all([jo(),Ka(),za(),Fo(),zo(),Or()]),Io()}document.readyState==="complete"?n():l.on(window,"load",n),l.setInterval(t,2500),l.setInterval(e,3e4),e()}})();
