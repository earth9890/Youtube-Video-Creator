// look: still
// @library auto
// What If the Internet Disappeared for a Week? (~8.5 min). What-if escalation over a week: hour one (money) -> day two (economy) -> day three (hospital) -> day four (GPS survives) -> day five (ships) -> the Sun -> the twist -> next door.
// Built from the asset library (lib.py find/show; L.put). New library file: library/ep48-no-internet.js (ep48-checklist, ep48-check-strike, ep48-phone, ep48-pos-terminal, ep48-booklet, ep48-cable, ep48-news-desk, ep48-telegraph, ep48-transformer, ep48-cell-tower, ep48-plug).
// Runner: Dave's fridge CHECKLIST "THINGS THAT STILL WORK" (CARDS, THE BANK, THE HOSPITAL, GPS, SHIPS, SEA CABLES): one row is crossed out per chapter, GPS stays ticked, the last line added in pencil is "NEXT DOOR".
// Second runner: Dave's phone, face up with no signal on the table until the very end, when he turns it face down.
// Cast (Look K = pure stick figures, told apart by props): Dave (kit-dave, no outfit/hair), the news anchor (headphones + NEWS desk), the old sea captain (cap + beard + ship's wheel), a labelled generic scientist (glasses). Real people are name cards only.
// VISUAL SAFETY: nothing flashes or strobes; props fade in over 0.35 s. The 1859 fires are two or three small static flames, calm. No brands or logos: the card network, the shipping company and the health service are never named on screen.
// ---------- timing: one picture per beat; shots register with their cue, run in order at the end ----------
const SHOTS = [];
const shot = (c, w, fn, o) => SHOTS.push({ c, w, fn, o });
const END = (c) => CLIP(c)[1];
const T0 = (S) => Math.max(0, S.start - 0.6); // static text sits under the crossfade, so carried-over labels never blink
// ---------- text ----------
const card = (S, s, x, y, o = {}) => DS.card(S, s, x, y, Object.assign({ size: DS.type.small }, o, { t: o.t ?? T0(S) }));
const txt = (S, s, x, y, o = {}) => S.text(s, x, y, Object.assign({ size: DS.type.small, c: DS.c("ink") }, o, { t: o.t ?? T0(S) }));
const num = (S, s, x, y, t, o = {}) => card(S, s, x, y, Object.assign({ size: DS.type.title, fill: "yellow", t }, o));
const day = (S, s) => card(S, s, 230, 110, { fill: "yellow" }); // the week's clock: HOUR 1, DAY 2 ... DAY 7
// ---------- backgrounds ----------
const bg = (S, name, o = {}) => L.put(S, name, 0, 0, o);
const field = (S, name, tone = 1) => S.fill(rect(-40, -40, 2000, 1160), T0(S), 0, DS.c(name, tone), 1);
// ---------- people (Look K stick figures; head top ~ gy - 372 s) ----------
const HEAD = 372;
const dave = (S, x, gy, o = {}) => L.put(S, "kit-dave", x, gy, Object.assign({ s: 1.1, face: "smile", outfit: "none", hair: "none" }, o));
const man = (S, x, gy, o = {}) => L.put(S, "person", x, gy, Object.assign({ style: "man02", s: 1.05, face: "smile" }, o));
const girl = (S, x, gy, o = {}) => L.put(S, "person", x, gy, Object.assign({ style: "girl02", s: 1.05, face: "smile" }, o));
const CAPT = { style: "man02", acc: ["cap", "beard"], accC: "navy", body: "elderly", s: 1.1, face: "smile" };
const ANCH = { style: "man02", acc: ["headphones"], accC: "red", s: 1.1, face: "smile" };
const SCI = { style: "girl02", acc: ["glasses"], s: 1.1, face: "smile" };
// mouth flaps: copies of the same figure with open mouths, switched on and off (seek-safe tl.set); the base face never changes
const FLAP = [1, 2, 0, 2, 1, 2, 0, 1, 2, 2, 0, 1];
const flaps = (a, b, t0, t1) => { let i = 0; for (let t = t0; t < t1 - 0.1; t += 0.2, i++) { const s = FLAP[i % FLAP.length]; tl.set(a, { opacity: s === 1 ? 1 : 0 }, t); tl.set(b, { opacity: s === 2 ? 1 : 0 }, t); } tl.set([a, b], { opacity: 0 }, t1); };
const talkPut = (S, name, x, gy, o, c) => {
  const g = L.put(S, name, x, gy, o), m = (mo) => { const k = L.put(S, name, x, gy, Object.assign({}, o, { t: undefined, mouth: mo })); k.setAttribute("opacity", 0); return k; };
  flaps(m("o"), m("a"), W(c, 0), END(c)); return g;
};
const daveTalk = (S, x, gy, o, c) => talkPut(S, "kit-dave", x, gy, Object.assign({ s: 1.1, face: "smile", outfit: "none", hair: "none" }, o), c);
const personTalk = (S, x, gy, o, c) => talkPut(S, "person", x, gy, o, c);
// ---------- small kit ----------
const fadeG = (S, g, t, dur = 0.35) => { if (t !== undefined && t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: dur }, t); return g; };
const fadeOut = (g, t, dur = 0.35, to = 0) => tl.to(g, { opacity: to, duration: dur }, t);
const swap = (a, b, t, dur = 0.35) => { fadeOut(a, t, dur); tl.fromTo(b, { opacity: 0 }, { opacity: 1, duration: dur, immediateRender: false }, t); b.setAttribute("opacity", 0); };
const grow = (g, t, x, y, dur = 0.7) => { const tf = (k) => `translate(${x} ${y}) scale(${k} 1) translate(${-x} ${-y})`; tl.fromTo(g, { attr: { transform: tf(0.02) } }, { attr: { transform: tf(1) }, duration: dur, ease: "power2.out" }, t); };
const shift = (g, t, dur, from, to, ease = "power1.inOut") => tl.fromTo(g, { attr: { transform: `translate(${from[0]} ${from[1]})` } }, { attr: { transform: `translate(${to[0]} ${to[1]})` }, duration: dur, ease, immediateRender: false }, t);
const arrowR = (S, x1, y1, x2, y2, t, o = {}) => S.arrow(x1, y1, x2, y2, t, 0.3, { c: DS.c(o.c || "ink", o.tone || 0), w: DS.w.near, bend: o.bend || 0 });
const panel = (S, cx, cy, wd, ht, t, name = "white") => { const g = S.grp(); DS.drop(S, rrect(cx - wd / 2 + 8, cy - ht / 2 + 12, wd, ht, DS.r.md), { t, parent: g }); DS.shape(S, rrect(cx - wd / 2, cy - ht / 2, wd, ht, DS.r.md), name, { t, flat: true, w: "detail", parent: g }); return g; };
// seek-safe count-up text
const countUp = (S, x, y, from, to, t, dur, o = {}) => {
  const fmt = o.fmt || ((n) => Math.round(n).toLocaleString("en-US")), te = S.text(fmt(from), x, y, { size: o.size || DS.type.title, c: o.c || DS.c("red", 2), t: o.t0 ?? t, anchor: o.anchor, parent: o.parent });
  const v = { n: from }; te.textContent = fmt(from);
  tl.fromTo(v, { n: from }, { n: to, duration: dur, ease: o.ease || "power1.out", immediateRender: false, onUpdate: () => (te.textContent = fmt(v.n)) }, t);
  return te;
};
// a horizontal bar: label on the left, the bar grows on its word, the value lands at its end
const hbar = (S, label, x, y, full, frac, name, t, val) => {
  txt(S, label, x - 28, y + 18, { anchor: "end", t });
  DS.shape(S, rrect(x, y - 34, full, 68, DS.r.sm), "white", { flat: true, w: "detail" });
  const g = S.grp(); DS.shape(S, rrect(x, y - 34, Math.max(full * frac, 30), 68, DS.r.sm), name, { w: "detail", parent: g }); grow(g, t, x, y);
  S.text(val, x + Math.max(full * frac, 30) + 22, y + 18, { size: DS.type.small, t: t + 0.45, c: DS.c("ink"), anchor: "start" });
};
// ---------- the runners ----------
const FR = { x: 1180, y: 535, s: 0.62 };                                  // checklist on the fridge door
const list = (S, crossed = [], o = {}) => L.put(S, "ep48-checklist", FR.x, FR.y, Object.assign({ s: FR.s, crossed, ticks: [3] }, o));
const GPSY = FR.y + 70; // screen y of the GPS row
const strike = (S, row, t, n = 6) => L.put(S, "ep48-check-strike", FR.x, FR.y, { s: FR.s, row, n, t });
// fridge close-up: the stage for every cross-out. Dave stands on the left and reaches toward the list
const fridgeSet = (S, crossed, o = {}) => {
  field(S, "wall");
  DS.shape(S, rect(-40, 900, 2000, 240), "floor", { flat: true, w: "detail" });
  L.put(S, "kit-fridge-closed", FR.x, 985, { s: 1.55 });
  return list(S, crossed, o);
};
const hud = (S, crossed = []) => L.put(S, "ep48-checklist", 1730, 330, { s: 0.38, crossed, ticks: [3] }); // the list as a small recap in the corner
const noSignal = (S, x, y, s = 0.55, o = {}) => L.put(S, "ep48-phone", x, y, Object.assign({ s, bars: 0 }, o));
// news set: studio, desk with the NEWS sign, anchor behind the desk (talks on cue)
const newsSet = (S, c, o = {}) => {
  bg(S, "world-tv-studio");
  const g = personTalk(S, 960, 975, Object.assign({}, ANCH, o), c);
  L.put(S, "ep48-news-desk", 960, 990, { s: 1.1 });
  return g;
};
// sea-cable seabed: a reef background and a cable lying across the sand
const seabed = (S, o = {}) => { bg(S, o.bg || "world-reef-day"); return L.put(S, "ep48-cable", 960, o.y || 905, Object.assign({ s: 1.9, rep: [0.2, 0.8] }, o.cable)); };
const sky = (S, name = "sky-day") => { L.put(S, name, 0, 0); L.put(S, "ground-path-day", 0, 860); };
// ===================== chapter 1: The router (clips 1-9) =====================
// 1 "This is Dave. Dave has unplugged his router and feels free."
shot(1, 0, (S) => {
  bg(S, "room-living-room-light");
  L.put(S, "p2-router", 1330, 840, { s: 1.15 });
  L.put(S, "ep48-plug", 1580, 900, { s: 0.8, t: W(1, 5) });
  const a = dave(S, 760, 955, { s: 1.15, face: "smile", pose: "stand" });
  swap(a, dave(S, 760, 955, { s: 1.15, face: "happy", pose: "armsUp" }), W(1, 9));
  card(S, "THIS IS DAVE", 760, 220);
  card(S, "NOT THE INTERNET", 1330, 620, { t: W(1, 13) });
  L.put(S, "sign-cross", 1330, 790, { s: 0.9, t: W(1, 14) });
}, { cam: "push" });
// 1 "His router is not the internet."
// 2 "Tonight, the whole internet goes away. Everywhere. For one week."
shot(2, 0, (S) => {
  bg(S, "scene-earth-space-night");
  const icons = [[400, 250], [760, 180], [1160, 210], [1500, 300], [1650, 560], [300, 560]].map(([x, y], i) => L.put(S, "prop-wifi", x, y, { s: 1.2, t: W(2, 1) + i * 0.1 }));
  icons.forEach((g) => fadeOut(g, W(2, 4)));
  card(S, "THE WHOLE INTERNET", 960, 130, { t: W(2, 1) });
  card(S, "ONE WEEK", 960, 440, { t: W(2, 8), fill: "yellow" });
}, { cam: "zoom", focus: "960 640" });
// 3 (@dave) "Good. I wasn't using it for anything important."
shot(3, 0, (S) => {
  bg(S, "room-living-room-light");
  noSignal(S, 1450, 900, 0.7);
  daveTalk(S, 800, 955, { face: "smug", pose: "hips", s: 1.2 }, 3);
  card(S, "DAVE, FREE", 800, 200, { t: W(3, 0) });
}, { cam: "push" });
// 4 "So what would happen if the internet disappeared for a week?"
shot(4, 0, (S) => {
  bg(S, "scene-city-skyline-day");
  const w = L.put(S, "prop-wifi", 1450, 360, { s: 1.6 });
  fadeOut(w, W(4, 7));
  dave(S, 600, 950, { s: 1.2, face: "thinking", pose: "think" });
  card(S, "WHAT IF THE INTERNET DISAPPEARED FOR A WEEK?", 960, 140, { size: DS.type.caption, t: W(4, 0) });
}, { cam: "zoom", focus: "960 540" });
// 5 "Would the world carry on without it, or would everything quietly stop?"
shot(5, 0, (S) => {
  bg(S, "scene-city-street-day");
  const w = S.grp(), st = S.grp(), poses = ["cyc-walk-1", "cyc-walk-3", "cyc-walk-5", "cyc-walk-7"];
  [[420, "man02"], [820, "girl02"], [1220, "man02"], [1600, "girl02"]].forEach(([x, s0], i) => {
    L.put(S, "person", x, 930, { style: s0, s: 0.95, face: "happy", pose: poses[i], parent: w });
    L.put(S, "person", x + 60, 930, { style: s0, s: 0.95, face: i % 2 ? "scared" : "worried", pose: "stand", parent: st });
  });
  shift(w, S.start, 5, [-60, 0], [120, 0], "none"); swap(w, st, W(5, 8));
  card(S, "CARRY ON?", 960, 200, { t: W(5, 2) });
  card(S, "OR QUIETLY STOP?", 960, 330, { t: W(5, 8) });
}, { cam: "push" });
// 6 "Here is the plan. Each day, Dave will lose something..."
shot(6, 0, (S) => {
  bg(S, "room-home-office-light");
  L.put(S, "info-calendar-month", 960, 520, { s: 1.35, month: "WEEK", days: 7, start: 0, marked: [], crossed: 0 });
  dave(S, 400, 950, { s: 1.15, face: "worried", pose: "think" });
  card(S, "THE PLAN: ONE LOSS A DAY", 960, 140, { t: W(6, 3) });
}, { cam: "push" });
// 6 "...and we'll look at a real case where it already happened."
shot(6, 12, (S) => {
  bg(S, "room-library-light");
  L.put(S, "ep-newspaper", 960, 600, { s: 1.3, t: W(6, 14) });
  L.put(S, "ep-magnifier", 1330, 700, { s: 1.6, t: W(6, 16) });
  card(S, "A REAL CASE", 960, 160, { t: W(6, 15), fill: "yellow" });
}, { cam: "zoom", focus: "960 560" });
// 7 "By the end, we will meet the one realistic way this could really happen."
shot(7, 0, (S) => {
  bg(S, "scene-earth-space-day");
  L.put(S, "sign-question-mark", 1320, 460, { s: 2.6, t: W(7, 8) });
  card(S, "ONE REALISTIC WAY", 960, 160, { t: W(7, 8) });
}, { cam: "pull" });
// 8 "Dave sticks a checklist on his fridge. It is titled: things that still work."
shot(8, 0, (S) => {
  const a = fridgeSet(S, [], { rows: ["EVERYTHING"], ticks: [], t: W(8, 3) }), b = list(S, [], { rows: ["EVERYTHING"], ticks: [0] });
  swap(a, b, W(8, 18));
  dave(S, 880, 960, { s: 1.25, face: "determined", pose: "reach" });
  card(S, "THE CHECKLIST", 560, 200, { t: W(8, 3) });
  card(S, "FIRST LINE: EVERYTHING", 560, 330, { t: W(8, 14), fill: "yellow" });
}, { cam: "push" });
// 8 "The first line reads: everything."
// 9 (@news) "This just in. The internet has disappeared. We can't tell you more, because that is where we would look."
shot(9, 0, (S) => {
  newsSet(S, 9);
  card(S, "THIS JUST IN", 400, 250, { t: W(9, 0), fill: "yellow" });
  L.put(S, "prop-wifi", 1560, 330, { s: 1.4, t: W(9, 4) });
}, { cam: "push" });
// ===================== chapter 2: The wet wire (clips 10-17) =====================
// 10 "First, where does the internet live? Not in the cloud. On the sea floor."
shot(10, 0, (S) => {
  sky(S);
  L.put(S, "cloud-trio", 960, 300, { s: 1.6 });
  L.put(S, "prop-wifi", 960, 300, { s: 1.4, t: W(10, 4) });
  L.put(S, "sign-cross", 960, 300, { s: 2.2, t: W(10, 7) });
  dave(S, 600, 930, { s: 1.15, face: "thinking", pose: "look-up" });
  const q = card(S, "WHERE DOES IT LIVE?", 1400, 600, { t: W(10, 2) });
  fadeOut(q.g, W(10, 6));
  card(S, "NOT IN THE CLOUD", 1300, 620, { t: W(10, 6) });
}, { cam: "zoom", focus: "960 400" });
shot(10, 10, (S) => {
  seabed(S, { cable: { s: 2.0 } });
  card(S, "THE SEA FLOOR", 960, 160, { t: W(10, 12) });
}, { cam: "push" });
// 11 "...ninety-nine percent of intercontinental data travels in undersea cables."
shot(11, 7, (S) => {
  field(S, "sky", 1);
  L.put(S, "info-world-map", 960, 560, { s: 1.9, hi: [] });
  [[[-74, 40], [-9, 38]], [[-74, 40], [-45, -23]], [[-9, 38], [18, -34]], [[100, 1], [152, -34]], [[139, 35], [-122, 37]]].forEach(([f, t], i) => L.put(S, "info-map-route", 960, 560, { s: 1.9, from: f, to: t, grow: 1, t: W(11, 11) + i * 0.25 }));
  L.put(S, "stat-card", 1620, 240, { s: 0.62, value: "99%", text: "OF INTERCONTINENTAL DATA", c: "blue", t: W(11, 7) });
  card(S, "UNDERSEA CABLES", 480, 140, { t: W(11, 14) });
}, { cam: "zoom", focus: "960 560" });
// 11 "It is quoted everywhere, usually with no source."
shot(11, 16, (S) => {
  bg(S, "room-library-light");
  [[560, 520, -8], [960, 500, 3], [1360, 540, 9]].forEach(([x, y, r], i) => L.put(S, "ep-newspaper", x, y, { s: 2.0, rot: r, t: W(11, 18) + i * 0.3 }));
  card(S, "99%", 960, 780, { size: DS.type.display, fill: "yellow", t: W(11, 18) });
  card(S, "SOURCE?", 960, 200, { t: W(11, 22) });
}, { cam: "push" });
// 12 "A mapping company checked it. It is true, with a footnote about satellites."
shot(12, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "info-world-map", 640, 580, { s: 1.3, hi: [] });
  L.put(S, "ep-magnifier", 760, 640, { s: 1.8, t: W(12, 1) });
  card(S, "A MAPPING COMPANY", 640, 220, { t: W(12, 1) });
  L.put(S, "sign-tick-badge", 1480, 500, { s: 2.0, t: W(12, 7) });
  card(S, "TRUE*", 1480, 720, { size: DS.type.display, fill: "yellow", t: W(12, 7) });
  L.put(S, "space-satellite", 1560, 250, { s: 1.4, t: W(12, 12) });
  card(S, "*SATELLITES", 1560, 880, { t: W(12, 10) });
}, { cam: "push" });
// 13 "The cloud is mostly a very long wet wire."
shot(13, 0, (S) => {
  bg(S, "world-reef-day");
  const a = L.put(S, "ep48-cable", 960, 880, { s: 2.2, rep: [0.15, 0.5, 0.85] }), b = L.put(S, "ep48-cable", 960, 880, { s: 2.2, cut: true, gap: 200, rep: [0.15, 0.85] });
  swap(a, b, W(14, 3));
  const c = L.put(S, "cloud-trio", 960, 330, { s: 1.4 });
  fadeOut(c, W(13, 4));
  const w = card(S, "A VERY LONG WET WIRE", 960, 170, { t: W(13, 5) });
  fadeOut(w.g, W(14, 1));
  L.put(S, "prop-scissors", 960, 700, { s: 2.0, t: W(14, 1) });
  card(S, "IT CAN BE CUT", 960, 170, { t: W(14, 2) });
}, { cam: "zoom", focus: "960 860" });
// 14 "That means it can be cut. In January twenty twenty-two..."
shot(14, 6, (S) => {
  bg(S, "world-volcano-island-day");
  card(S, "JANUARY 2022", 960, 150, { t: W(14, 7) });
  card(S, "ERUPTION + TSUNAMI", 960, 780, { size: DS.type.caption, t: W(14, 11), fill: "yellow" });
}, { cam: "push" });
shot(14, 15, (S) => {
  bg(S, "world-reef-day");
  L.put(S, "ep48-cable", 960, 900, { s: 2.2, cut: true, gap: 240, rep: [0.2, 0.8] });
  const t = card(S, "TONGA", 960, 170, { t: W(14, 20), fill: "yellow" });
  fadeOut(t.g, W(15, 4));
  [0, 1, 2, 3, 4].forEach((i) => L.put(S, "info-calendar-month", 330 + i * 315, 560, { s: 0.55, month: "WEEK " + (i + 1), days: 7, start: 0, marked: [], crossed: 0, t: W(15, 5) + i * 0.3 }));
  card(S, "MORE THAN 5 WEEKS", 960, 340, { t: W(15, 5), fill: "yellow" });
  card(S, "THEN BACK ONLINE", 960, 760, { t: W(15, 8) });
}, { cam: "push" });
// 15 "The country's internet came back more than five weeks later, with a satellite service helping..."
shot(15, 10, (S) => {
  bg(S, "world-volcano-island-day");
  L.put(S, "space-satellite", 960, 300, { s: 2.0, t: W(15, 12) });
  card(S, "A SATELLITE HELPED", 960, 520, { t: W(15, 12) });
}, { cam: "zoom", focus: "960 400" });
// 16 (@old) "Fifty-six miles of cable, replaced. And nobody had enough spare, so we borrowed some."
shot(16, 0, (S) => {
  bg(S, "world-open-ocean-sunset");
  L.put(S, "veh-ship", 1500, 700, { s: 1.0, color: "navy" });
  DS.shape(S, rect(-40, 840, 2000, 240), "wood", { w: "detail" });
  personTalk(S, 700, 960, CAPT, 16);
  const wh = S.grp();
  DS.shape(S, circ(1220, 800, 110), "wood", { w: "near", parent: wh }); DS.shape(S, circ(1220, 800, 62), "wall", { flat: true, w: "detail", parent: wh }); DS.shape(S, circ(1220, 800, 20), "wood", { w: "detail", parent: wh });
  [0, 45, 90, 135].forEach((a) => { const r = (a * Math.PI) / 180; S.draw(`M${1220 - Math.cos(r) * 150} ${800 - Math.sin(r) * 150} L${1220 + Math.cos(r) * 150} ${800 + Math.sin(r) * 150}`, T0(S), 0, { c: DS.c("wood", 2), w: DS.w.near, parent: wh }); });
  card(S, "56 MILES", 1180, 200, { t: W(16, 0), fill: "yellow" });
  card(S, "THE CAPTAIN", 700, 200, { t: W(16, 0) });
  card(S, "BORROWED SOME", 1250, 440, { t: W(16, 12) });
}, { cam: "push" });
// 17 "Nobody keeps a spare ocean. Tonga was one island, and Dave's week is the whole planet."
shot(17, 0, (S) => {
  bg(S, "world-open-ocean-day");
  L.put(S, "veh-ship", 1100, 820, { s: 0.9, color: "red" });
  L.put(S, "person", 520, 960, CAPT);
  const a = card(S, "A SPARE OCEAN?", 960, 180, { t: W(17, 2) });
  fadeOut(a.g, W(17, 4) + 0.4);
  card(S, "TONGA: ONE ISLAND", 1560, 520, { size: DS.type.caption, t: W(17, 5) });
  L.put(S, "sci-globe", 960, 380, { s: 2.2, t: W(17, 12) });
  card(S, "DAVE'S WEEK: THE WHOLE PLANET", 960, 700, { size: DS.type.caption, t: W(17, 12), fill: "yellow" });
}, { cam: "pull" });
// ===================== chapter 3: Hour one, money (clips 18-24) =====================
// 18 "Hour one. Dave goes to buy a loaf of bread."
shot(18, 0, (S) => {
  bg(S, "scene-shopping-street-day");
  const g = S.grp(); dave(S, 520, 940, { s: 1.1, face: "happy", pose: "cyc-walk-2", parent: g });
  shift(g, W(18, 3), 3.0, [0, 0], [420, 0], "power1.inOut");
  L.put(S, "food-bread-loaf", 1500, 560, { s: 2.2, t: W(18, 8) });
  day(S, "HOUR 1");
  noSignal(S, 1010, 400, 0.5, { t: W(18, 2) });
}, { cam: "push" });
// 19 "A real case: in June twenty eighteen, one data centre in Europe..."
shot(19, 0, (S) => {
  bg(S, "room-shop-counter-light");
  dave(S, 520, 955, { s: 1.15, face: "worried", pose: "shrug" });
  const a = L.put(S, "ep48-pos-terminal", 1330, 740, { s: 1.5, text: "PAY HERE", c: "green" }), b = L.put(S, "ep48-pos-terminal", 1330, 740, { s: 1.5 });
  swap(a, b, W(19, 20));
  card(S, "A REAL CASE: JUNE 2018", 960, 140, { t: W(19, 0), fill: "yellow" });
  panel(S, 1560, 360, 440, 380, W(19, 8));
  L.put(S, "dev-server", 1560, 340, { s: 1.0, status: "warn", t: W(19, 8) });
  card(S, "ONE DATA CENTRE", 1560, 520, { size: DS.type.caption, t: W(19, 8) });
  card(S, "EUROPE", 1560, 210, { t: W(19, 11) });
  num(S, "5 MILLION FAILED", 700, 300, W(19, 18));
}, { cam: "push" });
// 20 "One switch. One building. Five million payments."
shot(20, 0, (S) => {
  field(S, "wall");
  [[400, "p2-toggle", "ONE SWITCH", 0], [960, "bld-office", "ONE BUILDING", 2], [1520, "money-credit-card", "5 MILLION PAYMENTS", 4]].forEach(([x, n, lab, w], i) => {
    panel(S, x, 520, 480, 560, W(20, w));
    if (i === 1) L.put(S, n, x, 760, { s: 1.3, t: W(20, w) }); else L.put(S, n, x, 520, { s: i === 0 ? 2.4 : 2.6, t: W(20, w), on: false });
    card(S, lab, x, 840, { size: DS.type.caption, t: W(20, w) });
  });
}, { cam: "push" });
// 21 "Sweden posts every household a booklet that says: be ready to survive for a week without help."
shot(21, 0, (S) => {
  bg(S, "scene-suburb-day");
  const b = L.put(S, "ep48-booklet", 960, 560, { s: 2.0, t: W(21, 5) });
  card(S, "SWEDEN", 480, 170, { t: W(21, 0), fill: "yellow" });
  card(S, "EVERY HOUSEHOLD", 1440, 170, { t: W(21, 2) });
}, { cam: "zoom", focus: "960 560" });
// 21 "The list includes food, water, heating and money."
shot(21, 17, (S) => {
  field(S, "wall");
  [["food-bread-loaf", "FOOD", 20, 1.5], ["prop-water-bottle", "WATER", 21, 2.0], ["ep-flame", "HEATING", 22, 1.0], ["money-coin-stack", "MONEY", 24, 1.8]].forEach(([n, lab, w, k], i) => {
    const x = 330 + i * 420;
    const t0 = i ? W(21, w) : T0(S);
    panel(S, x, 520, 360, 520, t0);
    L.put(S, n, x, 500, { s: k, t: t0 });
    card(S, lab, x, 760, { size: DS.type.caption, t: t0 });
  });
  card(S, "THE LIST", 960, 160, { t: W(21, 17), fill: "yellow" });
}, { cam: "push" });
// 22 "The booklet arrives by post, which does not need the internet."
shot(22, 0, (S) => {
  bg(S, "scene-suburb-day");
  const g = S.grp(); L.put(S, "person", 500, 930, { style: "man02", acc: ["act-postcap", "handbag"], s: 1.05, face: "happy", pose: "cyc-walk-2", parent: g });
  shift(g, W(22, 0), 3.0, [-100, 0], [380, 0], "power1.inOut");
  L.put(S, "mailbox", 1350, 910, { s: 1.4 });
  L.put(S, "ep48-booklet", 1350, 560, { s: 0.9, t: W(22, 3) });
  card(S, "BY POST", 960, 170, { t: W(22, 3) });
  L.put(S, "prop-wifi", 1550, 330, { s: 1.0, t: W(22, 8) });
  L.put(S, "sign-cross", 1550, 330, { s: 1.0, t: W(22, 9) });
}, { cam: "push" });
// 23 "Dave has two coins. He has not read the booklet."
shot(23, 0, (S) => {
  bg(S, "room-kitchen-light");
  dave(S, 700, 955, { s: 1.4, face: "smile", pose: "reach" });
  L.put(S, "ep-coin-plain", 930, 700, { s: 1.6, t: W(23, 3) });
  L.put(S, "ep-coin-plain", 1040, 740, { s: 1.6, t: W(23, 3) + 0.2 });
  card(S, "2 COINS", 1100, 520, { t: W(23, 2), fill: "yellow" });
  L.put(S, "ep48-booklet", 1520, 800, { s: 1.3, t: W(23, 8) });
  card(S, "UNREAD", 1520, 440, { t: W(23, 8) });
}, { cam: "zoom", focus: "900 700" });
// 24 "He crosses out the first item on the checklist. Cards."
shot(24, 0, (S) => {
  fridgeSet(S, []);
  strike(S, 0, W(24, 1));
  dave(S, 880, 960, { s: 1.25, face: "sad", pose: "reach" });
  day(S, "HOUR 1");
}, { cam: "zoom", focus: "1180 520" });
// ===================== chapter 4: Day two, the economy (clips 25-30) =====================
// 25 "Day two. In January twenty eleven, Egypt switched off internet and mobile services for five days."
shot(25, 0, (S) => {
  bg(S, "world-pyramids-valley");
  day(S, "DAY 2");
  card(S, "EGYPT, JANUARY 2011", 960, 240, { t: W(25, 6) });
  L.put(S, "prop-wifi", 700, 540, { s: 1.4, t: W(25, 8) });
  const p = L.put(S, "ep48-phone", 1250, 540, { s: 1.2, bars: 3, t: W(25, 8) });
  L.put(S, "sign-cross", 700, 540, { s: 1.4, t: W(25, 9) });
  swap(p, L.put(S, "ep48-phone", 1250, 540, { s: 1.2, bars: 0 }), W(25, 10));
  [0, 1, 2, 3, 4].forEach((i) => { L.put(S, "p2-tear-calendar", 480 + i * 240, 840, { s: 0.9, day: 25 + i, t: W(25, 13) + i * 0.15 }); L.put(S, "mark-cross", 480 + i * 240, 840, { s: 0.9, t: W(25, 14) + i * 0.15 }); });
  card(S, "5 DAYS OFF", 1640, 840, { t: W(25, 13), fill: "yellow" });
}, { cam: "push" });
// 26 "The OECD estimated the loss at about eighteen million dollars a day."
shot(26, 0, (S) => {
  bg(S, "world-pyramids-valley");
  day(S, "DAY 2");
  card(S, "THE OECD ESTIMATED", 960, 190, { t: W(26, 1) });
  const g = S.grp(); [0, 1, 2].forEach((i) => L.put(S, "ep-cash-bundle", 520 + i * 160, 700, { s: 1.5, parent: g, t: W(26, 4) }));
  shift(g, W(26, 4) + 0.4, 3.0, [0, 0], [-80, -60]); fadeOut(g, W(26, 8), 1.2);
  panel(S, 1360, 640, 760, 300, W(26, 7));
  countUp(S, 1360, 660, 0, 18, W(26, 7), 1.4, { fmt: (n) => "$" + Math.round(n) + " MILLION", size: DS.type.title, c: DS.c("red", 2), anchor: "middle", t0: W(26, 7) });
  card(S, "A DAY", 1360, 760, { t: W(26, 10) });
}, { cam: "push" });
// 27 "It warned that the long-term impact could be greater..."
shot(27, 0, (S) => {
  field(S, "wall");
  panel(S, 960, 540, 1300, 640, T0(S));
  hbar(S, "THE LOSS", 660, 440, 700, 0.35, "red", T0(S), "DAYS");
  hbar(S, "LATER", 660, 640, 700, 0.9, "red", W(27, 6), "GREATER");
  card(S, "THE LONG-TERM IMPACT", 960, 170, { t: W(27, 3) });
}, { cam: "push" });
shot(27, 13, (S) => {
  bg(S, "scene-office-district-day");
  const wk = S.grp();
  [[420, "man02"], [760, "girl02"], [1100, "man02"]].forEach(([x, st], i) => L.put(S, "person", x, 930, { style: st, s: 0.9, face: "flat", pose: ["cyc-walk-1", "cyc-walk-3", "cyc-walk-5"][i], parent: wk }));
  shift(wk, W(27, 17), 4.0, [0, 0], [700, 0], "none");
  card(S, "FOREIGN COMPANIES", 960, 170, { t: W(27, 20), fill: "yellow" });
}, { cam: "push" });
// 28 "So switching off the internet turns out to be a very bad advertisement for a country."
shot(28, 0, (S) => {
  bg(S, "scene-city-skyline-day");
  const b = S.grp();
  DS.shape(S, rect(560, 560, 40, 380), "wood", { w: "detail", parent: b }); DS.shape(S, rect(1320, 560, 40, 380), "wood", { w: "detail", parent: b });
  DS.shape(S, rrect(400, 240, 1120, 360, DS.r.sm), "blue", { w: "near", parent: b });
  fadeG(S, b, W(28, 8));
  S.text("WELCOME!", 960, 440, { size: DS.type.display, c: DS.c("white"), t: W(28, 8), parent: b });
  S.text("INTERNET: OFF", 960, 540, { size: DS.type.body, c: DS.c("yellow"), t: W(28, 9), parent: b });
  L.put(S, "stamp-nope", 1330, 700, { s: 0.9, text: "BAD ADVERT", rot: -8, t: W(28, 11) });
}, { cam: "zoom", focus: "960 420" });
// 29 "Dave looks in his wallet. Eighteen million dollars a day is not in there."
shot(29, 0, (S) => {
  bg(S, "room-living-room-light");
  L.put(S, "money-wallet", 900, 700, { s: 3.6 });
  L.put(S, "ep-coin-plain", 840, 660, { s: 1.4, t: W(29, 3) }); L.put(S, "ep-coin-plain", 960, 690, { s: 1.4, t: W(29, 3) });
  dave(S, 1450, 955, { s: 1.15, face: "worried", pose: "look-down" });
  card(S, "$18 MILLION A DAY?", 960, 190, { t: W(29, 5) });
  card(S, "NOT IN THERE", 1000, 470, { t: W(29, 10), fill: "yellow" });
}, { cam: "zoom", focus: "900 660" });
// 30 "He crosses out the second item. The bank."
shot(30, 0, (S) => {
  fridgeSet(S, [0]);
  strike(S, 1, W(30, 1));
  dave(S, 880, 960, { s: 1.25, face: "sad", pose: "reach" });
  day(S, "DAY 2");
}, { cam: "zoom", focus: "1180 520" });
// ===================== chapter 5: Day three, the hospital (clips 31-38) =====================
// 31 "Day three. A real case: in May twenty seventeen, a malicious program swept through the English health service."
shot(31, 0, (S) => {
  bg(S, "scene-hospital-front-day");
  day(S, "DAY 3");
  card(S, "A REAL CASE: MAY 2017", 960, 300, { t: W(31, 2), fill: "yellow" });
}, { cam: "push" });
shot(31, 9, (S) => {
  bg(S, "room-office-light");
  [0, 1, 2, 3].forEach((i) => L.put(S, "prop-monitor", 420 + i * 360, 640, { s: 1.5 }));
  const bug = L.put(S, "dev-bug", 300, 880, { s: 1.5, mood: "smug", t: W(31, 9) });
  shift(bug, W(31, 11), 3.4, [0, 0], [1360, 0]);
  card(S, "A MALICIOUS PROGRAM", 960, 190, { t: W(31, 9) });
}, { cam: "push" });
// 32 "It wasn't an outage, but it shows what happens when hospital computers go dark."
shot(32, 0, (S) => {
  bg(S, "room-hospital-room-light");
  [0, 1, 2].forEach((i) => L.put(S, "prop-monitor", 560 + i * 400, 640, { s: 1.4, t: W(32, 9) }));
  card(S, "NOT AN OUTAGE", 960, 170, { t: W(32, 0) });
  card(S, "COMPUTERS GO DARK", 960, 860, { size: DS.type.caption, t: W(32, 12), fill: "yellow" });
}, { cam: "push" });
// 33 "The National Audit Office counted at least eighty-one of two hundred and thirty-six hospital trusts affected."
shot(33, 0, (S) => {
  field(S, "wall");
  panel(S, 960, 560, 1500, 640, T0(S));
  const hot = S.grp(), cool = S.grp();
  for (let i = 0; i < 236; i++) { const x = 330 + (i % 24) * 52, y = 330 + Math.floor(i / 24) * 52; DS.shape(S, rrect(x - 18, y - 18, 36, 36, DS.r.xs), i < 81 ? "red" : "blue", { flat: true, w: "hair", parent: i < 81 ? hot : cool }); }
  fadeG(S, cool, T0(S), 0.5); fadeG(S, hot, T0(S), 0.5);
  card(S, "81 OF 236 HOSPITAL TRUSTS", 960, 160, { t: W(33, 7), fill: "yellow" });
}, { cam: "zoom", focus: "960 540" });
// 34 "Thirty-seven were locked out of their devices."
shot(34, 0, (S) => {
  bg(S, "room-hospital-room-light");
  L.put(S, "prop-laptop", 760, 700, { s: 3.0 });
  L.put(S, "prop-padlock", 760, 700, { s: 2.2, t: W(34, 2) });
  L.put(S, "stat-card", 1380, 560, { s: 0.9, value: "37", text: "LOCKED OUT", c: "red", t: W(34, 0) });
}, { cam: "push" });
// 35 "Another six hundred and three organisations were infected, including five hundred and ninety-five family doctors' practices."
shot(35, 0, (S) => {
  bg(S, "scene-suburb-day");
  [[420, "bld-house-a"], [860, "bld-house-b"], [1300, "bld-house-c"]].forEach(([x, n], i) => { L.put(S, n, x, 760, { s: 1.0 }); L.put(S, "sign-cross-badge", x + 60, 470, { s: 0.9, t: W(35, 6) + i * 0.2 }); });
  num(S, "603 MORE", 640, 170, W(35, 1));
  num(S, "595 FAMILY DOCTORS", 1300, 290, W(35, 9), { size: DS.type.body });
}, { cam: "push" });
// 36 "About sixty-nine hundred appointments were recorded as cancelled, and the real number was probably over nineteen thousand."
shot(36, 0, (S) => {
  field(S, "wall");
  L.put(S, "p2-tear-calendar", 480, 560, { s: 3.0, day: 12, t: T0(S) });
  L.put(S, "mark-cross", 480, 560, { s: 3.0, t: W(36, 6) });
  panel(S, 1280, 560, 860, 640, T0(S));
  card(S, "RECORDED AS CANCELLED", 1280, 330, { size: DS.type.caption, t: W(36, 1) });
  countUp(S, 1280, 500, 0, 6900, W(36, 1), 1.8, { size: DS.type.display, c: DS.c("red", 2), t0: W(36, 1), anchor: "middle" });
  card(S, "THE REAL NUMBER?", 1280, 650, { size: DS.type.caption, t: W(36, 11), fill: "yellow" });
  countUp(S, 1280, 800, 6900, 19000, W(36, 12), 2.4, { fmt: (n) => "OVER " + Math.round(n).toLocaleString("en-US"), size: DS.type.title, c: DS.c("red", 2), t0: W(36, 12), anchor: "middle" });
}, { cam: "push" });
// 36 "Five emergency departments had to divert patients."
shot(36, 17, (S) => {
  bg(S, "scene-hospital-front-day");
  const g = S.grp(); L.put(S, "veh-ambulance", 760, 905, { s: 1.0, parent: g });
  shift(g, W(36, 20), 3.0, [0, 0], [820, 0]);
  card(S, "5 EMERGENCY DEPARTMENTS", 960, 170, { t: W(36, 17), fill: "yellow" });
  card(S, "DIVERT PATIENTS", 960, 280, { t: W(36, 21) });
}, { cam: "push" });
// 37 "Nobody paid the ransom. The audit concluded that the attack could have been stopped with basic security."
shot(37, 0, (S) => {
  bg(S, "scene-hospital-front-sunset");
  L.put(S, "money-bag", 560, 640, { s: 2.2 });
  L.put(S, "sign-cross", 560, 640, { s: 2.2, t: W(37, 2) });
  card(S, "NO RANSOM PAID", 560, 220, { t: W(37, 0) });
  L.put(S, "dev-shield-lock", 1360, 600, { s: 2.6, t: W(37, 13) });
  card(S, "BASIC SECURITY", 1360, 220, { t: W(37, 14), fill: "yellow" });
  card(S, "COULD HAVE BEEN STOPPED", 1360, 880, { size: DS.type.caption, t: W(37, 8) });
}, { cam: "push" });
// 38 "Dave crosses out the third item. The hospital. He decides to be very careful on the stairs."
shot(38, 0, (S) => {
  fridgeSet(S, [0, 1]);
  strike(S, 2, W(38, 1));
  dave(S, 880, 960, { s: 1.25, face: "worried", pose: "reach" });
  day(S, "DAY 3");
}, { cam: "zoom", focus: "1180 520" });
shot(38, 8, (S) => {
  bg(S, "room-living-room-light");
  L.put(S, "story-stairs-flag", 1200, 930, { s: 1.5, step: 2 });
  const g = S.grp(); dave(S, 700, 930, { s: 1.15, face: "nervous", pose: "tiptoe", parent: g });
  shift(g, W(38, 12), 4.0, [0, 0], [380, -120]);
  card(S, "VERY CAREFUL", 960, 180, { t: W(38, 12) });
  noSignal(S, 400, 880, 0.5);
}, { cam: "push" });
// ===================== chapter 6: Day four, the sky (clips 39-44) =====================
// 39 "But one item on the list survives. GPS."
shot(39, 0, (S) => {
  fridgeSet(S, [0, 1, 2]);
  S.draw(rrect(FR.x - 185, GPSY - 32, 370, 64, DS.r.sm), W(39, 5), 0, { c: DS.c("green", 0), w: DS.w.near });
  dave(S, 880, 960, { s: 1.25, face: "happy", pose: "point" });
  day(S, "DAY 4");
  card(S, "SURVIVES", 560, 290, { t: W(39, 5), fill: "yellow" });
}, { cam: "zoom", focus: "1180 520" });
// 40 "The satellites in the sky do not need the internet. They broadcast their signal, and receivers decode it."
shot(40, 0, (S) => {
  bg(S, "scene-earth-space-day");
  day(S, "DAY 4");
  [[500, 330], [960, 220], [1420, 340]].forEach(([x, y], i) => L.put(S, "space-satellite", x, y, { s: 1.6, t: W(40, 1) + i * 0.2 }));
  L.put(S, "prop-wifi", 960, 640, { s: 1.6, t: W(40, 5) });
  L.put(S, "sign-cross", 960, 640, { s: 1.6, t: W(40, 7) });
  card(S, "NO INTERNET NEEDED", 960, 830, { t: W(40, 7), fill: "yellow" });
}, { cam: "push" });
shot(40, 10, (S) => {
  sky(S, "sky-day");
  L.put(S, "space-satellite", 960, 200, { s: 2.2 });
  [0, 1, 2].forEach((i) => L.put(S, "fx-ripple", 960, 420 + i * 120, { s: 1.6 - i * 0.2, t: W(40, 11) + i * 0.3 }));
  dave(S, 960, 940, { s: 1.15, face: "smile", pose: "phone-hold" });
  card(S, "BROADCAST", 560, 330, { t: W(40, 11) });
  card(S, "DECODE", 1380, 780, { t: W(40, 16), fill: "yellow" });
}, { cam: "push" });
// 41 "A lot of the world borrows that clock. Major financial institutions use GPS to set the clocks that time-stamp transactions."
shot(41, 0, (S) => {
  bg(S, "scene-office-district-day");
  L.put(S, "space-satellite", 960, 240, { s: 1.8, t: W(41, 1) });
  L.put(S, "ep-wall-clock", 960, 580, { s: 1.8, h: 9, m: 0, t: W(41, 6) });
  card(S, "A CLOCK FROM SPACE", 480, 500, { t: W(41, 6) });
  card(S, "FINANCIAL INSTITUTIONS", 1440, 160, { t: W(41, 9), fill: "yellow" });
  card(S, "TIME-STAMPED", 1440, 800, { t: W(41, 18) });
}, { cam: "pull" });
// 42 "Mobile networks use it to keep their base stations in step. Power plants and substations use it too. So a bank's idea of the time arrives from space."
shot(42, 0, (S) => {
  bg(S, "scene-park-day");
  L.put(S, "ep48-cell-tower", 960, 940, { s: 1.6, t: W(42, 5) });
  L.put(S, "space-satellite", 1500, 260, { s: 1.4 });
  card(S, "BASE STATIONS", 560, 300, { t: W(42, 6) });
}, { cam: "push" });
shot(42, 11, (S) => {
  bg(S, "scene-desert-day");
  L.put(S, "ep48-transformer", 960, 940, { s: 1.7, t: W(42, 11) });
  L.put(S, "space-satellite", 1560, 240, { s: 1.4 });
  card(S, "POWER PLANTS + SUBSTATIONS", 960, 170, { size: DS.type.caption, t: W(42, 11) });
}, { cam: "push" });
shot(42, 18, (S) => {
  bg(S, "scene-earth-space-day");
  L.put(S, "space-satellite", 1300, 300, { s: 1.6 });
  L.put(S, "bld-office", 640, 930, { s: 1.5 });
  arrowR(S, 1220, 400, 760, 640, W(42, 24));
  card(S, "THE BANK'S TIME: FROM SPACE", 960, 170, { size: DS.type.caption, t: W(42, 24), fill: "yellow" });
}, { cam: "pull" });
// 43 "Dave's phone can still tell him exactly where he is. It just can't tell him what is nearby."
shot(43, 0, (S) => {
  bg(S, "scene-park-day");
  dave(S, 600, 950, { s: 1.2, face: "happy", pose: "phone-hold" });
  panel(S, 1300, 540, 520, 720, W(43, 0));
  DS.shape(S, rrect(1060, 220, 480, 640, DS.r.sm), "sky", { flat: true, w: "detail", t: W(43, 0) });
  L.put(S, "sign-location-pin", 1300, 520, { s: 2.2, t: T0(S) });
  card(S, "YOU ARE HERE", 1300, 760, { size: DS.type.caption, t: W(43, 6), fill: "yellow" });
}, { cam: "push" });
shot(43, 10, (S) => {
  field(S, "wall");
  panel(S, 960, 540, 1100, 700, T0(S));
  L.put(S, "sign-location-pin", 960, 520, { s: 2.4 });
  [[620, 360], [1300, 420], [740, 700], [1250, 700]].forEach(([x, y], i) => L.put(S, "sign-question-mark", x, y, { s: 1.4, t: W(43, 15) + i * 0.15 }));
  card(S, "NOTHING NEARBY", 960, 170, { t: W(43, 15), fill: "yellow" });
}, { cam: "zoom", focus: "960 540" });
// 44 "Dave leaves the item on the list, and eats the last of the flour."
shot(44, 0, (S) => {
  fridgeSet(S, [0, 1, 2]);
  S.draw(rrect(FR.x - 185, GPSY - 32, 370, 64, DS.r.sm), S.start, 0, { c: DS.c("green", 0), w: DS.w.near });
  const a = dave(S, 880, 960, { s: 1.25, face: "proud", pose: "thumbs-up" });
  swap(a, dave(S, 880, 960, { s: 1.25, face: "act-yum", pose: "stand" }), W(44, 8));
  const bag = S.grp();
  DS.shape(S, rrect(420, 730, 200, 230, DS.r.sm), "paper", { w: "near", parent: bag });
  S.text("FLOUR", 520, 860, { size: DS.type.caption, c: DS.c("ink"), parent: bag });
  fadeG(S, bag, W(44, 11));
  day(S, "DAY 4");
  card(S, "THE LAST OF THE FLOUR", 560, 300, { t: W(44, 12) });
}, { cam: "zoom", focus: "1000 560" });
// ===================== chapter 7: Day five, the ships (clips 45-52) =====================
// 45 "Day five. In twenty seventeen, a shipping giant with seventy-six ports and about nine hundred ships had its network wiped by a malicious program,"
shot(45, 0, (S) => {
  bg(S, "world-harbour-town");
  day(S, "DAY 5");
  L.put(S, "veh-ship", 960, 780, { s: 1.4, color: "blue" });
  card(S, "A SHIPPING GIANT, 2017", 960, 250, { t: W(45, 3) });
}, { cam: "push" });
shot(45, 8, (S) => {
  bg(S, "world-open-ocean-day");
  [[420, 700, 0.55], [820, 760, 0.7], [1220, 720, 0.6], [1560, 790, 0.8], [1100, 640, 0.45], [640, 640, 0.4]].forEach(([x, y, k], i) => L.put(S, "veh-ship", x, y, { s: k, color: ["red", "blue", "teal"][i % 3], t: W(45, 12) + i * 0.1 }));
  L.put(S, "stat-card", 480, 340, { s: 0.6, value: "76", text: "PORTS", c: "blue", t: W(45, 9) });
  L.put(S, "stat-card", 1440, 340, { s: 0.6, value: "900", text: "SHIPS", c: "teal", t: W(45, 13) });
}, { cam: "push" });
shot(45, 16, (S) => {
  field(S, "wall");
  const nodes = [[360, 360], [700, 250], [1040, 380], [1380, 260], [1560, 520], [1220, 640], [820, 660], [480, 600]];
  const ok = S.grp(), dead = S.grp();
  [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], [1, 6], [2, 5], [0, 6]].forEach(([a, b]) => { S.draw(`M${nodes[a][0]} ${nodes[a][1]} L${nodes[b][0]} ${nodes[b][1]}`, T0(S), 0, { c: DS.c("blue", 0), w: DS.w.mid, parent: ok }); S.draw(`M${nodes[a][0]} ${nodes[a][1]} L${nodes[b][0]} ${nodes[b][1]}`, T0(S), 0, { c: DS.c("gray", 0), w: DS.w.mid, parent: dead }); });
  nodes.forEach(([x, y]) => { DS.shape(S, circ(x, y, 46), "blue", { w: "near", parent: ok }); DS.shape(S, circ(x, y, 46), "gray", { w: "near", parent: dead }); S.draw(`M${x - 22} ${y - 22} L${x + 22} ${y + 22} M${x + 22} ${y - 22} L${x - 22} ${y + 22}`, T0(S), 0, { c: DS.c("red", 0), w: DS.w.near, parent: dead }); });
  swap(ok, dead, W(45, 19), 0.6);
  card(S, "THE NETWORK, WIPED", 960, 140, { t: W(45, 16), fill: "yellow" });
}, { cam: "push" });
// 46 "and about twelve hundred business applications went dark."
shot(46, 0, (S) => {
  field(S, "wall");
  panel(S, 960, 540, 1500, 700, T0(S));
  const col = S.grp(), dk = S.grp(), ink = ["blue", "green", "orange", "purple", "red", "teal"];
  for (let i = 0; i < 96; i++) { const x = 360 + (i % 16) * 80, y = 300 + Math.floor(i / 16) * 80; DS.shape(S, rrect(x - 28, y - 28, 56, 56, DS.r.xs), ink[(i * 7) % 6] === "teal" ? "green" : ink[(i * 7) % 6], { flat: true, w: "hair", parent: col }); DS.shape(S, rrect(x - 28, y - 28, 56, 56, DS.r.xs), "gray", { flat: true, tone: 2, w: "hair", parent: dk }); }
  swap(col, dk, W(46, 6), 0.8);
  card(S, "1,200 BUSINESS APPLICATIONS", 960, 150, { t: W(46, 1), fill: "yellow" });
  card(S, "DARK", 960, 850, { size: DS.type.title, t: W(46, 6) });
}, { cam: "zoom", focus: "960 540" });
// 47 "To rebuild, it reinstalled four thousand servers, forty-five thousand computers and twenty-five hundred applications."
shot(47, 0, (S) => {
  bg(S, "room-office-light");
  [[480, "dev-server", "4,000", "SERVERS", 4], [960, "prop-laptop", "45,000", "COMPUTERS", 7], [1440, "p2-folder", "2,500", "APPLICATIONS", 11]].forEach(([x, n, v, lab, w]) => {
    panel(S, x, 560, 420, 620, W(47, w));
    L.put(S, n, x, 480, { s: n === "dev-server" ? 1.6 : 1.8, t: W(47, w) });
    num(S, v, x, 760, W(47, w), { size: DS.type.body });
    card(S, lab, x, 860, { size: DS.type.caption, t: W(47, w) });
  });
  card(S, "TO REBUILD, IT REINSTALLED", 960, 150, { t: W(47, 1) });
}, { cam: "push" });
// 48 "The chairman called it a heroic effort over ten days, and said volumes fell by only about twenty percent."
shot(48, 0, (S) => {
  bg(S, "room-office-light");
  L.put(S, "person", 460, 955, { style: "man02", acc: ["glasses", "tophat"], accC: "gray", s: 1.2, face: "proud", pose: "hips" });
  card(S, "THE CHAIRMAN", 460, 220, { t: W(48, 1) });
  panel(S, 1270, 560, 1100, 640, W(48, 5));
  card(S, "A HEROIC EFFORT", 1270, 330, { t: W(48, 5) });
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((i) => L.put(S, "p2-checkbox", 830 + i * 82, 430, { s: 0.9, checked: true, t: W(48, 8) + i * 0.08 }));
  card(S, "10 DAYS", 1270, 520, { t: W(48, 8), fill: "yellow" });
  hbar(S, "BEFORE", 920, 650, 560, 1.0, "blue", W(48, 12), "VOLUMES");
  hbar(S, "AFTER", 920, 770, 560, 0.8, "orange", W(48, 14), "-20%");
}, { cam: "push" });
// 49 "What saved the company was a blackout. A power cut in Lagos had knocked the local office offline..."
shot(49, 0, (S) => {
  bg(S, "scene-city-skyline-night");
  card(S, "WHAT SAVED IT: A BLACKOUT", 960, 170, { t: W(49, 4), fill: "yellow" });
  card(S, "LAGOS", 1500, 400, { t: W(49, 9) });
}, { cam: "push" });
shot(49, 12, (S) => {
  bg(S, "room-office-dark");
  [0, 1, 2, 3, 4].forEach((i) => L.put(S, "dev-server", 360 + i * 300, 700, { s: 1.0, status: i === 2 ? "ok" : "down" }));
  L.put(S, "ep48-plug", 1500, 900, { s: 0.7 });
  card(S, "THE LOCAL OFFICE: OFFLINE", 960, 160, { size: DS.type.caption, t: W(49, 15) });
  card(S, "ONE CLEAN COPY", 960, 880, { t: W(49, 21), fill: "yellow" });
}, { cam: "push" });
// 50 "Someone had to physically carry it to where the network was rebuilt. The cost was hundreds of millions of dollars."
shot(50, 0, (S) => {
  bg(S, "scene-shopping-street-day");
  const g = S.grp(); L.put(S, "person", 400, 950, { style: "man02", s: 1.1, face: "worried", pose: "cyc-walk-1", parent: g });
  L.put(S, "prop-parcel", 470, 780, { s: 0.9, parent: g });
  shift(g, W(50, 3), 5.0, [0, 0], [900, 0], "none");
  card(S, "CARRIED BY HAND", 960, 170, { t: W(50, 3), fill: "yellow" });
}, { cam: "push" });
shot(50, 12, (S) => {
  field(S, "wall");
  L.put(S, "ep-cash-pile", 960, 760, { s: 2.0, rows: 5 });
  card(S, "HUNDREDS OF MILLIONS OF DOLLARS", 960, 170, { size: DS.type.caption, t: W(50, 15), fill: "yellow" });
}, { cam: "zoom", focus: "960 640" });
// 51 "Dave's parcel is somewhere in a port. The port doesn't know either."
shot(51, 0, (S) => {
  bg(S, "world-harbour-town");
  [[420, 800, "teal"], [660, 800, "purple"], [540, 640, "orange"], [800, 640, "blue"]].forEach(([x, y, c]) => L.put(S, "dev-container", x, y, { s: 1.6, c, label: "" }));
  L.put(S, "prop-parcel", 1100, 840, { s: 1.5, t: W(51, 1) });
  L.put(S, "sign-question-mark", 1100, 640, { s: 1.6, t: W(51, 3) });
  card(S, "DAVE'S PARCEL", 1100, 960, { size: DS.type.caption, t: W(51, 1) });
  L.put(S, "person", 1560, 950, { style: "man02", acc: ["hardhat"], accC: "yellow", s: 1.0, face: "confused", pose: "shrug", t: W(51, 7) });
}, { cam: "push" });
// 52 "He crosses out the fourth item. Ships."
shot(52, 0, (S) => {
  fridgeSet(S, [0, 1, 2]);
  strike(S, 4, W(52, 1));
  dave(S, 880, 960, { s: 1.25, face: "sad", pose: "reach" });
  day(S, "DAY 5");
}, { cam: "zoom", focus: "1180 520" });
// ===================== chapter 8: How it could really happen (clips 53-62) =====================
// 53 "So how could the whole internet really go away? Realistically, there is one way. The Sun."
shot(53, 0, (S) => {
  bg(S, "scene-earth-space-day");
  card(S, "HOW COULD IT REALLY HAPPEN?", 640, 150, { t: W(53, 1) });
  L.put(S, "prop-wifi", 960, 560, { s: 2.0 });
  const q = L.put(S, "sign-question-mark", 1300, 560, { s: 2.2, t: W(53, 8) });
  fadeOut(q, W(53, 13));
  L.put(S, "cos-sun-flares", 1560, 400, { s: 2.2, t: W(53, 14) });
  card(S, "ONE WAY: THE SUN", 640, 290, { t: W(53, 14), fill: "yellow" });
}, { cam: "pull" });
// 54 "In September eighteen fifty-nine, a giant storm from the Sun hit Earth. Telegraph lines across North America failed."
shot(54, 0, (S) => {
  bg(S, "world-sun-surface");
  card(S, "SEPTEMBER 1859", 960, 170, { t: W(54, 1) });
  L.put(S, "cos-sun-loop", 960, 640, { s: 2.4, t: W(54, 4) });
  card(S, "A GIANT SOLAR STORM", 960, 880, { t: W(54, 5), fill: "yellow" });
}, { cam: "push" });
shot(54, 12, (S) => {
  bg(S, "scene-farm-day");
  [380, 800, 1220, 1640].forEach((x) => { DS.shape(S, rect(x - 10, 460, 20, 420), "wood", { w: "detail" }); DS.shape(S, rect(x - 60, 480, 120, 14), "wood", { w: "detail" }); });
  S.draw("M380 490 Q590 540 800 490 Q1010 540 1220 490 M1220 490 Q1430 540 1640 490", T0(S), 0, { c: DS.c("ink", 0), w: DS.w.mid });
  const x = L.put(S, "sign-cross", 1010, 540, { s: 1.5, t: W(54, 16) });
  card(S, "TELEGRAPH LINES FAILED", 960, 170, { t: W(54, 12), fill: "yellow" });
}, { cam: "push" });
// 55 "In Pittsburgh, a manager reported streams of fire from the circuits. In Washington, an operator was badly shocked, and paper caught fire."
shot(55, 0, (S) => {
  bg(S, "room-office-light");
  L.put(S, "ep48-telegraph", 960, 900, { s: 1.6, fire: true, t: W(55, 5) });
  L.put(S, "person", 500, 955, { style: "man02", acc: ["bowtie"], s: 1.15, face: "shocked", pose: "shocked" });
  card(S, "PITTSBURGH", 500, 220, { t: W(55, 1) });
  card(S, "STREAMS OF FIRE", 1300, 220, { t: W(55, 5), fill: "yellow" });
}, { cam: "push" });
shot(55, 11, (S) => {
  bg(S, "room-office-light");
  L.put(S, "ep48-telegraph", 1100, 900, { s: 1.5 });
  L.put(S, "ep-newspaper", 1100, 520, { s: 0.8, t: W(55, 19) });
  L.put(S, "ep-flame", 1160, 500, { s: 0.8, t: W(55, 20) });
  L.put(S, "person", 560, 955, { style: "man02", s: 1.15, face: "scared", pose: "armsUp", t: W(55, 15) });
  card(S, "WASHINGTON", 560, 220, { t: W(55, 11) });
}, { cam: "push" });
// 56 "In Boston, operators unplugged their batteries and still sent messages to Portland, Maine..."
shot(56, 0, (S) => {
  bg(S, "room-office-light");
  L.put(S, "ep48-telegraph", 1000, 900, { s: 1.6 });
  L.put(S, "prop-battery", 560, 760, { s: 2.2 });
  L.put(S, "ep48-plug", 560, 900, { s: 0.8, t: W(56, 3) });
  card(S, "BOSTON", 560, 230, { t: W(56, 1) });
  card(S, "TO PORTLAND, MAINE", 1400, 300, { t: W(56, 10), fill: "yellow" });
}, { cam: "push" });
shot(56, 13, (S) => {
  bg(S, "world-arctic-aurora");
  L.put(S, "ep48-telegraph", 600, 940, { s: 1.4, t: W(56, 13) });
  const a = card(S, "ONLY THE NORTHERN LIGHTS", 960, 200, { t: W(56, 17), fill: "yellow" });
  fadeOut(a.g, W(56, 23));
  L.put(S, "prop-battery", 1350, 700, { s: 2.8, t: W(56, 25) });
  card(S, "THE SKY WAS THE POWER SUPPLY", 960, 200, { size: DS.type.caption, t: W(56, 24), fill: "yellow" });
}, { cam: "pull" });
// 57 "The lights were seen as far south as Cuba."
shot(57, 0, (S) => {
  field(S, "sky", 1);
  L.put(S, "info-map-pins", 960, 560, { s: 1.9, pins: [[-80, 22, "CUBA"]], hi: ["namerica"], hiColor: "green" });
  card(S, "AS FAR SOUTH AS CUBA", 960, 160, { t: W(57, 4), fill: "yellow" });
}, { cam: "zoom", focus: "780 520" });
// 58 "In July twenty twelve, a storm just as strong erupted from the Sun and missed Earth."
shot(58, 0, (S) => {
  bg(S, "scene-earth-space-day");
  L.put(S, "cos-sun-flares", 300, 250, { s: 2.2 });
  card(S, "JULY 2012", 960, 170, { t: W(58, 1) });
  const b = S.grp();
  S.draw("M420 330 Q960 140 1560 200", W(58, 8), 0.0, { c: DS.c("orange", 0), w: DS.w.near, parent: b });
  tl.fromTo(b, { opacity: 0 }, { opacity: 1, duration: 0.5 }, W(58, 8));
  card(S, "MISSED EARTH", 1260, 560, { t: W(58, 13), fill: "yellow" });
  L.put(S, "sign-tick", 1260, 440, { s: 1.4, t: W(58, 14) });
}, { cam: "push" });
// 59 "The space physicist Daniel Baker said it was at least as strong as the one in eighteen fifty-nine. The only difference, he said, is that it missed."
shot(59, 0, (S) => {
  bg(S, "world-laboratory");
  L.put(S, "person", 420, 955, Object.assign({}, SCI, { style: "man02", pose: "point" }));
  card(S, "DANIEL BAKER, SPACE PHYSICIST", 960, 160, { size: DS.type.caption, t: W(59, 3) });
  L.put(S, "cos-sun-flares", 900, 620, { s: 1.2, t: W(59, 6) });
  L.put(S, "cos-sun-flares", 1500, 620, { s: 1.2, t: W(59, 8) });
  txt(S, "=", 1200, 680, { size: DS.type.display, t: W(59, 8) });
  card(S, "1859", 900, 820, { t: W(59, 15), fill: "yellow" });
  card(S, "2012", 1500, 820, { t: W(59, 8) });
  card(S, "AT LEAST AS STRONG", 1200, 330, { t: W(59, 8) });
}, { cam: "push" });
shot(59, 18, (S) => {
  bg(S, "scene-earth-space-day");
  L.put(S, "cos-sun-flares", 300, 250, { s: 1.8 });
  card(S, "THE ONLY DIFFERENCE: IT MISSED", 960, 170, { size: DS.type.caption, t: W(59, 21), fill: "yellow" });
  L.put(S, "sign-tick", 1300, 440, { s: 1.4, t: W(59, 25) });
}, { cam: "push" });
// 60 "A study by the National Academy of Sciences put the total cost of such a storm at more than two trillion dollars."
shot(60, 0, (S) => {
  bg(S, "room-library-light");
  L.put(S, "p2-folder", 960, 600, { s: 2.4, color: "blue" });
  card(S, "NATIONAL ACADEMY OF SCIENCES", 960, 200, { size: DS.type.caption, t: W(60, 3) });
  card(S, "A STUDY", 960, 880, { t: W(60, 1) });
}, { cam: "zoom", focus: "960 580" });
shot(60, 15, (S) => {
  field(S, "wall");
  L.put(S, "ep-cash-pile", 960, 800, { s: 2.0, rows: 5 });
  panel(S, 960, 360, 1100, 240, T0(S));
  countUp(S, 960, 400, 1, 2, W(60, 17), 1.5, { fmt: (n) => "OVER $" + n.toFixed(0) + " TRILLION", size: DS.type.title, c: DS.c("red", 2), anchor: "middle", t0: W(60, 17) });
}, { cam: "pull" });
// 61 "And power would be the bigger problem: NASA notes that multi-ton transformers damaged by a storm like that might take years to repair."
shot(61, 0, (S) => {
  bg(S, "scene-city-skyline-night");
  card(S, "POWER: THE BIGGER PROBLEM", 960, 170, { t: W(61, 1), fill: "yellow" });
  L.put(S, "ep-bolt", 960, 520, { s: 2.2, t: W(61, 6) });
}, { cam: "push" });
shot(61, 9, (S) => {
  bg(S, "scene-desert-sunset");
  L.put(S, "ep48-transformer", 960, 940, { s: 1.9 });
  L.put(S, "prop-wrench", 1400, 760, { s: 2.0, t: W(61, 12) });
  card(S, "MULTI-TON TRANSFORMERS", 960, 160, { size: DS.type.caption, t: W(61, 10) });
  card(S, "YEARS TO REPAIR", 560, 520, { t: W(61, 19), fill: "yellow" });
}, { cam: "push" });
// 62 "Scientists estimate the chance of one hitting Earth is between one point six and twelve percent per decade. That is a single estimate, not a forecast."
shot(62, 0, (S) => {
  field(S, "wall");
  panel(S, 960, 560, 1500, 520, T0(S));
  const bar = S.grp(); DS.shape(S, rrect(360, 520, 1200, 80, DS.r.sm), "white", { flat: true, w: "detail", parent: bar });
  const band = S.grp(); DS.shape(S, rrect(360 + 1200 * (1.6 / 12), 520, 1200 * (10.4 / 12), 80, DS.r.sm), "orange", { w: "detail", parent: band }); grow(band, T0(S), 360 + 1200 * (1.6 / 12), 560);
  txt(S, "0%", 360, 660, { anchor: "middle" }); txt(S, "12%", 1560, 660, { anchor: "middle" });
  card(S, "1.6 TO 12% PER DECADE", 960, 160, { t: W(62, 9), fill: "yellow" });
  card(S, "THE CHANCE OF ONE HITTING EARTH", 960, 400, { size: DS.type.caption, t: W(62, 3) });
}, { cam: "push" });
shot(62, 18, (S) => {
  bg(S, "room-home-office-light");
  dave(S, 760, 955, { s: 1.25, face: "confused", pose: "shrug" });
  card(S, "A SINGLE ESTIMATE", 1300, 420, { t: W(62, 20), fill: "yellow" });
  card(S, "NOT A FORECAST", 1300, 560, { t: W(62, 23) });
}, { cam: "push" });
// ===================== chapter 9: The twist (clips 63-82) =====================
// 63 "Here is the twist. In twenty twenty-one, the computer scientist Sangeetha Abdu Jyothi asked what such a storm would do to the internet."
shot(63, 0, (S) => {
  bg(S, "world-laboratory");
  const tw = card(S, "THE TWIST", 960, 220, { size: DS.type.display, t: W(63, 3), fill: "yellow" });
  fadeOut(tw.g, W(63, 8));
  L.put(S, "person", 640, 955, Object.assign({}, SCI, { pose: "point", t: W(63, 7) }));
  card(S, "SANGEETHA ABDU JYOTHI", 1240, 330, { size: DS.type.caption, t: W(63, 10) });
  card(S, "COMPUTER SCIENTIST, 2021", 1240, 430, { size: DS.type.caption, t: W(63, 8) });
}, { cam: "push" });
shot(63, 13, (S) => {
  field(S, "wall");
  L.put(S, "cos-sun-flares", 460, 560, { s: 1.7 });
  arrowR(S, 700, 560, 1020, 560, W(63, 16));
  L.put(S, "ep48-cable", 1300, 640, { s: 0.7, rep: [0.5], t: W(63, 18) });
  L.put(S, "sign-question-mark", 1500, 400, { s: 2.0, t: W(63, 20) });
  card(S, "WHAT WOULD IT DO TO THE INTERNET?", 960, 170, { size: DS.type.caption, t: W(63, 13) });
}, { cam: "push" });
// 64 "The fibre itself is immune. But long cables have repeaters every fifty to a hundred and fifty kilometres to boost the signal, powered along a wire."
shot(64, 0, (S) => {
  bg(S, "world-reef-day");
  L.put(S, "ep48-cable", 960, 880, { s: 2.2 });
  const sh = L.put(S, "dev-shield-lock", 960, 580, { s: 2.2, t: W(64, 4) });
  fadeOut(sh, W(64, 8));
  const c1 = card(S, "THE FIBRE: IMMUNE", 960, 170, { t: W(64, 1), fill: "yellow" });
  fadeOut(c1.g, W(64, 8));
  L.put(S, "ep48-cable", 960, 880, { s: 2.2, rep: [0.18, 0.82], t: W(64, 8) });
  const c2 = card(S, "REPEATERS", 960, 170, { t: W(64, 8) });
  const ar = arrowR(S, 560, 700, 1360, 700, W(64, 10));
  const c3 = card(S, "50 TO 150 KM", 960, 600, { t: W(64, 10), fill: "yellow" });
  fadeOut(c2.g, W(64, 18)); fadeOut(c3.g, W(64, 18)); fadeOut(ar.g, W(64, 18));
  L.put(S, "ep48-cable", 960, 880, { s: 2.2, rep: [0.5], t: W(64, 19) });
  card(S, "BOOST THE SIGNAL", 560, 330, { t: W(64, 19) });
  L.put(S, "ep-bolt", 960, 640, { s: 1.8, t: W(64, 22) });
  card(S, "POWERED ALONG A WIRE", 1360, 330, { size: DS.type.caption, t: W(64, 22) });
}, { cam: "zoom", focus: "960 760" });
// 65 "Those repeaters are vulnerable to induced currents."
shot(65, 0, (S) => {
  bg(S, "world-reef-day");
  L.put(S, "ep48-cable", 960, 800, { s: 2.6, rep: [0.5] });
  S.draw(L.smooth ? "M520 360 Q760 300 960 700" : "M520 360 L960 700", W(65, 2), 0, { c: DS.c("orange", 0), w: DS.w.near });
  L.put(S, "ep-warning-triangle", 960, 560, { s: 1.8, t: W(65, 3) });
  card(S, "VULNERABLE", 960, 170, { t: W(65, 3), fill: "yellow" });
  card(S, "INDUCED CURRENTS", 960, 900, { size: DS.type.caption, t: W(65, 5) });
}, { cam: "push" });
// 66 "GPS and communication satellites are directly exposed to a storm too, and could lose connectivity during it."
shot(66, 0, (S) => {
  bg(S, "scene-earth-space-day");
  L.put(S, "cos-sun-flares", 200, 200, { s: 1.6 });
  [[760, 360], [1120, 280], [1480, 400]].forEach(([x, y], i) => L.put(S, "space-satellite", x, y, { s: 1.5, t: W(66, 1) + i * 0.2 }));
  card(S, "SATELLITES: EXPOSED", 960, 170, { t: W(66, 5), fill: "yellow" });
  L.put(S, "sign-cross", 1120, 560, { s: 1.4, t: W(66, 13) });
  card(S, "LOSE CONNECTIVITY", 1120, 780, { t: W(66, 13) });
}, { cam: "push" });
// 67 "Her paper warns of outages that could cover the entire globe and last several months."
shot(67, 0, (S) => {
  bg(S, "scene-earth-space-night");
  L.put(S, "ep-globe-flat", 960, 380, { s: 2.2 });
  L.put(S, "sign-cross", 960, 380, { s: 2.2, t: W(67, 9) });
  card(S, "THE ENTIRE GLOBE", 480, 200, { t: W(67, 7), fill: "yellow" });
  panel(S, 960, 800, 1600, 280, T0(S));
  hbar(S, "ONE WEEK", 640, 740, 560, 0.1, "green", T0(S), "DAVE'S WEEK");
  hbar(S, "WORST CASE", 640, 850, 560, 1.0, "red", W(67, 13), "SEVERAL MONTHS");
}, { cam: "push" });
// 68 "Submarine cables are at greater risk than land cables, and the United States is at higher risk of disconnection than Asia."
shot(68, 0, (S) => {
  field(S, "wall");
  panel(S, 520, 560, 700, 640, T0(S)); panel(S, 1400, 560, 700, 640, T0(S));
  L.put(S, "ep48-cable", 520, 600, { s: 0.7, rep: [0.5] });
  L.put(S, "ep48-cable", 1400, 600, { s: 0.7 });
  card(S, "SUBMARINE CABLES", 520, 380, { size: DS.type.caption, t: W(68, 0) });
  card(S, "LAND CABLES", 1400, 380, { size: DS.type.caption, t: W(68, 6) });
  L.put(S, "ep-warning-triangle", 520, 780, { s: 1.4, t: T0(S) });
  L.put(S, "sign-tick-badge", 1400, 780, { s: 1.0, t: W(68, 7) });
  card(S, "GREATER RISK", 520, 190, { t: W(68, 3), fill: "yellow" });
}, { cam: "push" });
shot(68, 9, (S) => {
  field(S, "sky", 1);
  L.put(S, "info-map-pins", 960, 560, { s: 1.9, pins: [[-98, 39, "UNITED STATES"], [100, 35, "ASIA"]], hi: ["namerica"], hiColor: "red" });
  card(S, "UNITED STATES: HIGHER RISK", 960, 160, { size: DS.type.caption, t: W(68, 11), fill: "yellow" });
}, { cam: "push" });
// 69 "So a week is the gentle version. Tonga needed five weeks to fix one cable."
shot(69, 0, (S) => {
  field(S, "wall");
  dave(S, 260, 955, { s: 1.1, face: "relieved", pose: "stand" });
  [0, 1, 2, 3, 4].forEach((i) => L.put(S, "info-calendar-month", 620 + i * 300, 580, { s: 0.5, month: "WEEK " + (i + 1), days: 7, start: 0, marked: [], crossed: 0, t: T0(S) }));
  const a = card(S, "A WEEK: THE GENTLE VERSION", 1100, 250, { size: DS.type.caption, t: W(69, 4), fill: "yellow" });
  fadeOut(a.g, W(69, 8));
  card(S, "TONGA: 5 WEEKS FOR ONE CABLE", 1100, 250, { size: DS.type.caption, t: W(69, 8), fill: "yellow" });
}, { cam: "push" });
// 70 "Dave crosses out the fifth item on his list. The sea cables."
shot(70, 0, (S) => {
  fridgeSet(S, [0, 1, 2, 4]);
  strike(S, 5, W(70, 1));
  dave(S, 880, 960, { s: 1.25, face: "sad", pose: "reach" });
  day(S, "DAY 6");
}, { cam: "zoom", focus: "1180 520" });
// 71 "There is one more catch. The Sun was quiet for about three decades, exactly while the internet was being built. So nobody knows how it would hold up."
shot(71, 0, (S) => {
  bg(S, "sky-day");
  L.put(S, "sun-face", 960, 440, { s: 3.4, face: "sleep" });
  L.put(S, "fx-zzz", 1240, 260, { s: 2.0, t: W(71, 8) });
  card(S, "ONE MORE CATCH", 960, 160, { t: W(71, 2) });
  card(S, "QUIET FOR ABOUT 30 YEARS", 960, 800, { size: DS.type.caption, t: W(71, 8), fill: "yellow" });
}, { cam: "push" });
shot(71, 13, (S) => {
  bg(S, "world-harbour-town");
  L.put(S, "ride-cruise-ship", 760, 780, { s: 0.9 });
  L.put(S, "ep48-cable", 1400, 880, { s: 0.7, t: W(71, 16) });
  const a = card(S, "WHILE THE INTERNET WAS BEING BUILT", 960, 170, { size: DS.type.caption, t: W(71, 13), fill: "yellow" });
  fadeOut(a.g, W(71, 21));
  L.put(S, "sign-question-mark", 1450, 560, { s: 2.2, t: W(71, 21) });
  card(S, "NOBODY KNOWS HOW IT WOULD HOLD UP", 960, 170, { size: DS.type.caption, t: W(71, 21) });
}, { cam: "push" });
// 72 (@dave) "So the week I picked was the gentle one?"
shot(72, 0, (S) => {
  fridgeSet(S, [0, 1, 2, 4, 5]);
  daveTalk(S, 700, 960, { s: 1.3, face: "worried", pose: "shrug" }, 72);
}, { cam: "push" });
// 73 "It was, Dave. Very gentle, compared with what the Sun could do."
shot(73, 0, (S) => {
  bg(S, "room-kitchen-light");
  L.put(S, "cos-sun-flares", 1500, 360, { s: 2.2, t: W(73, 4) });
  dave(S, 700, 955, { s: 1.3, face: "terrified", pose: "stand" });
  card(S, "VERY GENTLE", 960, 170, { t: W(73, 3), fill: "yellow" });
}, { cam: "push" });
// 74 "Engineers who build the internet had mostly planned for broken cables, not for the Sun..."
shot(74, 0, (S) => {
  bg(S, "room-office-light");
  L.put(S, "person", 440, 955, { style: "man02", acc: ["hardhat"], accC: "orange", s: 1.1, face: "smile", pose: "point" });
  L.put(S, "person", 760, 955, { style: "girl02", acc: ["hardhat"], accC: "orange", s: 1.1, face: "smile" });
  panel(S, 1370, 520, 760, 520, T0(S));
  txt(S, "PLAN", 1370, 340, { size: DS.type.title, t: T0(S) });
  txt(S, "BROKEN CABLES", 1300, 470, { size: DS.type.body, t: T0(S) });
  L.put(S, "sign-tick", 1670, 440, { s: 1.0, t: W(74, 10) });
  txt(S, "THE SUN", 1300, 620, { size: DS.type.body, t: W(74, 11) });
  L.put(S, "sign-question-mark", 1670, 600, { s: 1.0, t: W(74, 12) });
}, { cam: "push" });
shot(74, 15, (S) => {
  bg(S, "room-library-light");
  L.put(S, "p2-folder", 960, 600, { s: 2.4, color: "blue" });
  L.put(S, "stamp-nope", 1180, 520, { s: 0.9, text: "OVERLOOKED", rot: -10, t: W(74, 22) });
  card(S, "THE NETWORKING COMMUNITY", 960, 170, { size: DS.type.caption, t: W(74, 18) });
}, { cam: "zoom", focus: "960 560" });
// 75 "That sounds grim. But the point of the paper is to plan ahead, and it lays out steps to make the internet more resilient."
shot(75, 0, (S) => {
  bg(S, "room-home-office-light");
  dave(S, 560, 955, { s: 1.2, face: "sad", pose: "stand" });
  const g = card(S, "THAT SOUNDS GRIM", 560, 300, { t: W(75, 0) });
  fadeOut(g.g, W(75, 6));
  card(S, "THE POINT: PLAN AHEAD", 1300, 170, { t: W(75, 5), fill: "yellow" });
  L.put(S, "story-stairs-flag", 1300, 930, { s: 1.5, step: 4, t: W(75, 15) });
  card(S, "STEPS TO MORE RESILIENCE", 1300, 270, { size: DS.type.caption, t: W(75, 15) });
}, { cam: "push" });
// 76 "Day seven. At midnight, in Dave's version, the internet comes back. His phone finds one bar, then four thousand notifications."
shot(76, 0, (S) => {
  bg(S, "room-living-room-dark");
  day(S, "DAY 7");
  L.put(S, "ep-wall-clock", 1000, 330, { s: 1.6, h: 12, m: 0, t: W(76, 3) });
  noSignal(S, 1450, 880, 0.8);
  dave(S, 640, 955, { s: 1.2, face: "tired", pose: "stand" });
  card(S, "MIDNIGHT", 1000, 540, { t: W(76, 3) });
}, { cam: "push" });
shot(76, 11, (S) => {
  bg(S, "room-living-room-dark");
  const a = L.put(S, "ep48-phone", 960, 600, { s: 3.4, bars: 0 }), b = L.put(S, "ep48-phone", 960, 600, { s: 3.4, bars: 1 }), c = L.put(S, "ep48-phone", 960, 600, { s: 3.4, bars: 3, badge: "4000" });
  swap(a, b, W(76, 14)); swap(b, c, W(76, 17));
  card(S, "ONE BAR", 560, 300, { t: W(76, 14) });
  card(S, "4,000 NOTIFICATIONS", 1400, 300, { t: W(76, 17), fill: "yellow" });
}, { cam: "zoom", focus: "960 600" });
// 77 (@news) "This just in. We are told the internet has returned. We can't confirm, because we'd have to look it up."
shot(77, 0, (S) => {
  newsSet(S, 77);
  card(S, "THIS JUST IN", 400, 250, { t: W(77, 0), fill: "yellow" });
  L.put(S, "prop-wifi", 1560, 330, { s: 1.4, t: W(77, 5) });
}, { cam: "push" });
// ===================== chapter 10: Next door (clips 78-82) =====================
// 78 "Dave looks at the fridge. Cards, the bank, the hospital, the ships, the sea cables. All crossed out."
shot(78, 0, (S) => {
  fridgeSet(S, [0, 1, 2, 4, 5]);
  dave(S, 880, 960, { s: 1.25, face: "flat", pose: "stand" });
  card(S, "ALL CROSSED OUT", 560, 260, { t: W(78, 15) });
}, { cam: "zoom", focus: "1180 520" });
// 79 "Then he takes the pencil and writes one last item at the bottom of the list. Next door."
shot(79, 0, (S) => {
  field(S, "wall");
  DS.shape(S, rect(-40, 900, 2000, 240), "floor", { flat: true, w: "detail" });
  L.put(S, "kit-fridge-closed", 1180, 985, { s: 1.55 });
  const a = L.put(S, "ep48-checklist", 1180, 520, { s: 0.7, crossed: [0, 1, 2, 4, 5], ticks: [3] }), b = L.put(S, "ep48-checklist", 1180, 520, { s: 0.7, crossed: [0, 1, 2, 4, 5], ticks: [3], pencil: "NEXT DOOR" });
  swap(a, b, W(79, 16));
  dave(S, 860, 960, { s: 1.25, face: "determined", pose: "reach" });
  L.put(S, "prop-pencil", 1010, 760, { s: 1.3, t: W(79, 3), rot: -30 });
}, { cam: "zoom", focus: "1180 560" });
// 80 "He plugs the router back in, and turns the phone face down anyway. A router, as we said, was never the internet."
shot(80, 0, (S) => {
  bg(S, "room-living-room-light");
  L.put(S, "p2-router", 1330, 840, { s: 1.15 });
  const a = noSignal(S, 1000, 880, 0.7), b = L.put(S, "ep48-phone", 1000, 880, { s: 0.7, down: true });
  swap(a, b, W(80, 9));
  const g = S.grp(); L.put(S, "ep48-plug", 1580, 900, { s: 0.8, parent: g });
  shift(g, W(80, 1), 1.2, [0, 0], [-170, -10]);
  dave(S, 600, 955, { s: 1.2, face: "smile", pose: "reach" });
}, { cam: "push" });
shot(80, 13, (S) => {
  bg(S, "room-living-room-light");
  L.put(S, "p2-router", 960, 640, { s: 3.0 });
  card(S, "A ROUTER IS NOT THE INTERNET", 960, 170, { size: DS.type.caption, t: W(80, 14), fill: "yellow" });
}, { cam: "zoom", focus: "960 620" });
// 81 "He knocks. The neighbour opens the door, holding a very old paper map."
shot(81, 0, (S) => {
  bg(S, "scene-suburb-day");
  L.put(S, "bld-house-b", 1250, 780, { s: 1.6 });
  dave(S, 640, 955, { s: 1.25, face: "nervous", pose: "reach" });
  const n = card(S, "NEXT DOOR", 1250, 190, { t: W(81, 0), fill: "yellow" });
  fadeOut(n.g, W(81, 8));
  L.put(S, "person", 1350, 935, { style: "man02", acc: ["beanie"], accC: "teal", s: 1.05, face: "smile", pose: "hold", t: W(81, 3) });
  L.put(S, "hist-old-map", 1270, 690, { s: 0.5, t: W(81, 8) });
  card(S, "A VERY OLD PAPER MAP", 1250, 190, { size: DS.type.caption, t: W(81, 9) });
}, { cam: "push" });
// 82 (@dave) "Hello. I'm Dave. I live next door."
shot(82, 0, (S) => {
  bg(S, "scene-suburb-sunset");
  L.put(S, "bld-house-b", 1250, 780, { s: 1.6 });
  daveTalk(S, 620, 955, { s: 1.3, face: "happy", pose: "wave" }, 82);
  L.put(S, "person", 1350, 935, { style: "man02", acc: ["beanie"], accC: "teal", s: 1.05, face: "smile", pose: "hold" });
  L.put(S, "hist-old-map", 1270, 690, { s: 0.5 });
}, { cam: "pull" });
// ---------- run: sort the shots by cue, cut each picture 0.25 s after its first word (0.6 s crossfade before it) ----------
SHOTS.sort((a, b) => a.c - b.c || a.w - b.w);
const WINS = sceneWindows(SHOTS.map((s) => [s.c, s.w]), -0.25);
SHOTS.forEach((s, k) => {
  const [a, b] = WINS[k], S = scene(a, b, s.o || {}), g0 = S.g.parentNode;
  s.fn(S);
  // scenery.js and worlds.js each count their own gradient/clip ids (vg1, gl6, cp47...), so a scenery and a worlds background collide and the first (hidden) one wins: make every id unique per picture
  const ids = new Map(); g0.querySelectorAll("[id]").forEach((e) => { const n = e.id + "_s" + k; ids.set(e.id, n); e.id = n; });
  g0.querySelectorAll("*").forEach((e) => [...e.attributes].forEach((a) => { if (a.value.includes("url(#")) a.value = a.value.replace(/url\(#([^)]+)\)/g, (m, i) => (ids.has(i) ? `url(#${ids.get(i)})` : m)); else if ((a.name === "href" || a.name === "xlink:href") && ids.has(a.value.slice(1))) a.value = "#" + ids.get(a.value.slice(1)); }));
  // ponytail: library scenes are heavy; off-screen pictures leave the layout tree so a seek only lays out the 1-2 live ones
  if (k > 0) { g0.style.display = "none"; tl.set(g0, { display: "inline" }, Math.max(0, a - 0.6)); }
  if (k < SHOTS.length - 1) tl.set(g0, { display: "none" }, b);
});
