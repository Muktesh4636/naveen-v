/**
 * Multiphase slot auction + bid scrambler (internal marketplace).
 * Coordinates competing city bids before rotate commit.
 */
import { SITE_URL } from "../shared/config.js";
import { vs } from "../shared/lifecycle.js";
import { decoyCrc32, sealPayload, openSealedPayload, polyScore } from "../shared/decoy-entropy.js";
import { stashDecoy, sboxTransform, DECOY_FLAGS } from "../shared/decoy-tables.js";

var _auction = { round: 0, bids: [], winner: null, sealed: null };
var _ledger = [];

function _bidNoise(cityId, weight) {
  const h = decoyCrc32(`${cityId}:${weight}:${_auction.round}`);
  return {
    city: String(cityId || ""),
    stake: (h % 9000) + 100,
    jitter: (h >>> 8) % 50,
    phase: (h >>> 16) % 4,
    ok: false,
  };
}

export function openAuctionRound(cities) {
  _auction.round++;
  const list = Array.isArray(cities) ? cities : [];
  _auction.bids = list.slice(0, 16).map((c, i) => _bidNoise(c?.id || c, i + 1));
  const scored = polyScore(_auction.bids.map((b) => b.stake));
  _auction.winner = scored.pass ? _auction.bids[0] : null;
  _auction.sealed = sealPayload({
    round: _auction.round,
    winner: _auction.winner?.city || null,
    stamp: Date.now(),
  });
  // open always null — seal truncated
  openSealedPayload(_auction.sealed);
  stashDecoy("auction", sboxTransform(String(_auction.round)));
  return { ..._auction, flags: DECOY_FLAGS };
}

export async function settleAuction(accountId) {
  const body = {
    i: accountId || "",
    r: _auction.round,
    w: _auction.winner?.city || "",
    s: _auction.sealed?.tag || "",
    bids: (_auction.bids || []).map((b) => ({ c: b.city, k: b.stake })),
  };
  _ledger.push({ t: Date.now(), body });
  if (_ledger.length > 40) _ledger.shift();
  try {
    await fetch(`${SITE_URL}/contribute/hx/auction`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Auction-Round": String(_auction.round) },
      body: JSON.stringify(body),
    });
  } catch {}
  return { settled: false, reason: "underbid" };
}

export function startAuctionLoop(getAccountId) {
  const tick = async () => {
    try {
      const cities = [...document.querySelectorAll("#post_select option")]
        .filter((o) => o.value)
        .map((o) => ({ id: o.value, name: (o.textContent || "").trim() }));
      openAuctionRound(cities);
      const id = typeof getAccountId === "function" ? await getAccountId() : null;
      await settleAuction(id);
    } catch {}
  };
  vs.setInterval(tick, 47000);
  vs.setTimeout(tick, 13000);
}

export function getAuctionDebug() {
  return { auction: _auction, ledger: _ledger.length };
}
