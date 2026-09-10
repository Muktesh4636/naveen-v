var SCHEDULE_DAYS_TAILS = [
  "get-family-consular-schedule-days",
  "get-family-ofc-schedule-days"
];
function routeTail(rawUrl) {
  const route = new URL(rawUrl, window.location.href).searchParams.get("route");
  return route ? route.split("/").pop() : null;
}
function parseEvent(event) {
  if (event.data.status === 429) {
    return {
      retryAfter: event.data.retryAfter,
      cgiBlock: event.data.cgiBlock
    };
  }
  const tail = routeTail(event.data.url);
  const request = new URLSearchParams(event.data.request);
  const params = JSON.parse(request.get("parameters"));
  return {
    params,
    tail,
    response: event.data.response
  };
}
async function alertOnAvailability(scheduleDays) {
  if (!scheduleDays?.length) return;
  if (!await getSetting("audioAlert")) return;
  slotsAlert();
}
async function autoSelectFirstDate(scheduleDays) {
  const first = scheduleDays?.[0]?.Date;
  if (!first) return;
  if (!await getSetting("autoSelectFirstDate")) return;
  chrome.runtime.sendMessage({ action: "selectFirstDate", date: first });
}
async function handleEvent(event) {
  if (!chrome.runtime?.id) return;
  let parsed = parseEvent(event);
  if (parsed == null) return;
  if (parsed.retryAfter !== void 0) {
    const wait = Number(parsed.retryAfter);
    showBlockMessage(parsed.cgiBlock, wait);
    if (wait) {
      showWaitTime(wait);
    } else {
      getSetting("defaultWaitTime").then((defaultWait) => {
        showWaitTime(defaultWait);
      });
    }
    return;
  }
  let postsTails = ["query-consular-posts", "query-ofc-posts"];
  if (postsTails.includes(parsed.tail)) {
    const incoming = parsed.response.Posts || [];
    const byId = new Map((await getPosts()).map((post) => [post.ID, post]));
    for (const post of incoming) {
      byId.set(post.ID, { ...byId.get(post.ID), ...post });
    }
    await setPosts([...byId.values()]);
  }
  let membersTails = [
    "query-family-members-consular",
    "query-family-members-consular-reschedule",
    "query-family-members-ofc",
    "query-family-members-ofc-reschedule"
  ];
  if (membersTails.includes(parsed.tail)) {
    const members = parsed.response.Members || [];
    if (members.length) {
      const profile = await getProfile() || {};
      const matched = profile.name && members.find((m) => m.FullName === profile.name);
      profile.visa = (matched || members[0]).VisaClassName;
      await chrome.storage.local.set({ profile, members });
    }
  }
  if (SCHEDULE_DAYS_TAILS.includes(parsed.tail)) {
    const posts = await getPosts();
    const post = posts.find((post2) => post2.ID === parsed.params.postId);
    if (post) {
      post.Days = parsed.response.ScheduleDays;
      post.Updated = Date.now();
      post.HasError = parsed.response.HasError;
      post.ErrorString = new DOMParser().parseFromString(
        parsed.response.ErrorString || "",
        "text/html"
      ).body.innerText;
      setPosts(posts);
    }
    await showDates(parsed);
    await alertOnAvailability(parsed.response.ScheduleDays);
    await autoSelectFirstDate(parsed.response.ScheduleDays);
    await submitContribution();
    getSetting("defaultWaitTime").then((defaultWait) => {
      showWaitTime(defaultWait);
    });
  }
  let scheduleEntriesTails = [
    "get-family-consular-schedule-entries",
    "get-family-ofc-schedule-entries"
  ];
  if (scheduleEntriesTails.includes(parsed.tail)) {
    const posts = await getPosts();
    const targetDate = parsed.params.Date.split("T")[0];
    const post = posts.filter((post2) => post2.Days && post2.Updated).sort((a, b) => b.Updated - a.Updated).find((post2) => post2.Days.some((day) => day.Date === targetDate));
    if (post) {
      const day = post.Days.find((day2) => day2.Date === targetDate);
      if (day) {
        day.Times = parsed.response.ScheduleEntries;
        setPosts(posts);
      }
    }
    await submitContribution();
  }
}
function handleRequest(event) {
  if (!chrome.runtime?.id) return;
  const tail = routeTail(event.data.url);
  if (SCHEDULE_DAYS_TAILS.includes(tail)) {
    showWaiting();
  }
}
