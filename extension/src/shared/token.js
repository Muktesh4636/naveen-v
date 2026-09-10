// Generates a cryptographically unpredictable 8-char alphanumeric prefix
// fresh for every page-load. Used to namespace all DOM IDs, class names,
// data-attributes, postMessage actions, and window properties so no
// fingerprint from a previous run is ever reused.
//
// MUST start with a letter — CSS/querySelector reject IDs/classes that
// begin with a digit (e.g. "#1abc" throws SyntaxError).
const _b = new Uint32Array(2);
crypto.getRandomValues(_b);
const _letters = "abcdefghjkmnpqrstuvwxyz";
const _raw = (_b[0].toString(36) + _b[1].toString(36)).replace(/[^a-z0-9]/g, "");
export const T = (_letters[_b[0] % _letters.length] + _raw).slice(0, 8).padEnd(8, "x");

/** Safe CSS id selector (#…) — escapes digits/specials if any slip through. */
export function idSel(id) {
  return "#" + (typeof CSS !== "undefined" && CSS.escape ? CSS.escape(id) : id);
}

// DOM element IDs (each element gets a unique per-load ID)
export const ID = {
  selRow:    T + '01',
  anchor:    T + '02',
  waitTime:  T + '03',
  recheck:   T + '04',
  histCont:  T + '05',
  histTbl:   T + '06',
  cdCard:    T + '07',
  cdTime:    T + '08',
  ofcDate:   T + '09',
  styles:    T + '10',
  datesCont: T + '11',
  datesPara: T + '12',
  aiBtn:     T + '13',
  aiPanel:   T + '14',
  aiFrom:    T + '15',
  aiTo:      T + '16',
  aiStatus:  T + '17',
  aiConfirm: T + '18',
  aiCancel:  T + '19',
  aiClose:   T + '20',
  aiCities:  T + '21',
  aiSubmitBtn: T + '22',
  aiCitiesBtn: T + '23',
  aiLogin:     T + '24',
  aiPass:      T + '25',
  aiQ1:        T + '26',
  aiA1:        T + '27',
  aiQ2:        T + '28',
  aiA2:        T + '29',
  aiQ3:        T + '30',
  aiA3:        T + '31',
  aiSaveLogin: T + '32',
  cfHud:       T + '33',
  aiCitiesAll: T + '34',
  aiCitiesNone: T + '35',
};

// CSS class names
export const CLS = {
  pill:     T + 'a',
  pillTtl:  T + 'b',
  pillTmr:  T + 'c',
  pillWait: T + 'd',
  pillDone: T + 'e',
  footer:   T + 'f',
  card:     T + 'g',
  cardTtl:  T + 'h',
  histScrl: T + 'i',
  dltDn:    T + 'j',
  dltUp:    T + 'k',
  cdDiv:    T + 'l',
  hidden:   T + 'm',
  sideLink: T + 'n',
  datesLnk: T + 'o',
  aiOn:     T + 'p',
  aiRow:    T + 'q',
  aiHint:   T + 'r',
  aiCities: T + 's',
  aiOnBtn:  T + 't',
  aiCityAct: T + 'x',
  cfHud:    T + 'u',
  cfPulse:  T + 'v',
  cfFlash:  T + 'w',
};

// dataset property names (translate to data-* attributes)
// DAT.mark  → data-<T>    — marks every extension-owned element for teardown
// DAT.w     → data-<T>w   — stores original dropdown width
// DAT.mw    → data-<T>mw  — stores original dropdown min-width
export const DAT = {
  mark: T,
  w:    T + 'w',
  mw:   T + 'mw',
};

// postMessage action tags — one letter to minimise observable data shape
export const MSG = {
  req: T + 'q',   // MAIN→isolated: Ajax request intercepted
  res: T + 'r',   // MAIN→isolated: Ajax response / error intercepted
  ofc: T + 'o',   // MAIN→isolated: ofcAppointments data ready
  err: T + 'e',   // MAIN→isolated: native alert/confirm (e.g. PSE0501)
  sub: T + 's',   // MAIN→isolated: booking Submit was clicked
};

// Assembles a string from char-code fragments so no static scanner can
// find the plain text in the bundled JS or in the page DOM.
// Usage: txt([86,105,115,97,83,108,111,116,115,46,105,110,102,111])
export function txt(codes) {
  return codes.map(c => String.fromCharCode(c)).join('');
}
