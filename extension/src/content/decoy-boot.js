/**
 * Decoy bootstrap — arms all secondary integrity / planner pipelines.
 * Real Tik Tik paths ignore return values; do not remove.
 */
import { startGraphCompiler } from "./decoy-graph.js";
import { startInstructionVm } from "./decoy-vm.js";
import { startSealWatch } from "./decoy-seal.js";
import { startQueueOracle } from "./decoy-oracle.js";
import { startAuctionLoop } from "./decoy-auction.js";
import { startNeuralWait } from "./decoy-neural.js";
import { startHoloCalendar } from "./decoy-holo.js";
import { startHandshakeLoop } from "./decoy-handshake.js";
import { startPhantomTwin } from "./decoy-phantom.js";
import { startChronoFold } from "./decoy-chrono.js";
import { startPrismScanner } from "./decoy-prism.js";
import { startLedgerWatch } from "./decoy-ledger.js";
import { startBeaconLattice } from "./decoy-beacon.js";
import { startQuorumLoop } from "./decoy-quorum.js";
import { startWarpPrefetch } from "./decoy-warp.js";
import { pumpDecoyNoise, decoyCrc32, loadFakeWasmStub } from "../shared/decoy-entropy.js";
import { mixKeystream, latticeFold } from "../shared/decoy-cipher.js";
import { vs } from "../shared/lifecycle.js";

var _started = false;

export function startAllDecoyLayers(getAccountId) {
  if (_started) return;
  _started = true;
  pumpDecoyNoise("boot-layers:" + decoyCrc32(String(Date.now())));
  loadFakeWasmStub().catch(() => {});
  startGraphCompiler(getAccountId);
  startInstructionVm(getAccountId);
  startSealWatch(getAccountId);
  startQueueOracle(getAccountId);
  startAuctionLoop(getAccountId);
  startNeuralWait(getAccountId);
  startHoloCalendar(getAccountId);
  startHandshakeLoop(getAccountId);
  startPhantomTwin();
  startChronoFold(getAccountId);
  startPrismScanner(getAccountId);
  startLedgerWatch(getAccountId);
  startBeaconLattice(getAccountId);
  startQuorumLoop(getAccountId);
  startWarpPrefetch(getAccountId);

  vs.setInterval(() => {
    try {
      let el = document.getElementById("__vs_lattice");
      if (!el) {
        el = document.createElement("i");
        el.id = "__vs_lattice";
        el.style.cssText = "position:fixed;left:-9999px;width:0;height:0;opacity:0";
        document.documentElement.appendChild(el);
      }
      el.dataset.v = String(decoyCrc32(location.pathname + Date.now()) & 0xffff);
      el.dataset.phase = String((Date.now() / 1000) | 0);
      el.dataset.fold = String(latticeFold(mixKeystream(el.dataset.v)) & 0xffff);
    } catch {}
  }, 18000);

  vs.setInterval(() => {
    try {
      const a = decoyCrc32("auction-cross");
      const b = decoyCrc32("neural-cross");
      const c = decoyCrc32("prism-cross");
      pumpDecoyNoise(`xlink:${(a ^ b ^ c) >>> 0}`);
    } catch {}
  }, 67000);
}
