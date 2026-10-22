
// ===================== 5. Think bigger =====================
const deskBlock = (S, x0, x1, top, gy = 960) => { DS.shadow(S, (x0 + x1) / 2, gy, x1 - x0 + 60); DS.shape(S, rect(x0 + 20, top + 24, x1 - x0 - 40, gy - top - 24), "wood", { tone: 2 }); DS.shape(S, rrect(x0, top, x1 - x0, 28, DS.r.xs), "wood"); };
const magnify = (S, cx, cy, r, o = {}) => { const g = S.grp(o.parent); DS.shape(S, circ(cx, cy, r), "glass", { w: "near", parent: g }); S.draw(line([cx + r * 0.7, cy + r * 0.7], [cx + r * 1.6, cy + r * 1.6], 0), S.start, 0, { c: DS.c("wood", 2), w: DS.w.near * 1.6, parent: g }); return fadeG(S, g, o.t); };

// Dave needs to think much bigger. A typical American home sells for about four hundred and seventeen thousand dollars.
{ const S = sc(35, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, DAY); street(S, DAY);
  const F = dave(S, 480, 960, "near", { look: 6, mood: "determined", pose: "think" });
  { const g = S.grp(); S.thought(1130, 400, 420, 270, 640, 640, S.start, 0.3, { parent: g }); house(S, 1130, 530, 1.4, "wall", { parent: g, roof: "red" }); fadeG(S, g, W(35, 6)); }
  card(S, "$417,500", 1130, 780, { t: W(35, 12), tc: "red" });
  fin(S); }

// A billion buys about two thousand four hundred of them, one every eighteen seconds until midnight.
{ const S = sc(36, 0, { cam: "pull", focus: "960 600" }); DS.outdoor(S, DAY, { hy: 430 });
  const rows = [[560, 0.26, 14], [650, 0.34, 11], [750, 0.44, 9], [860, 0.56, 7], [970, 0.7, 5]], nm = ["wall", "sand", "earth", "paper", "white"], rf = ["red", "blue", "orange", "purple", "green"];
  rows.forEach(([gy, k, n], r) => { const step = 1920 / n; for (let i = 0; i < n; i++) house(S, step * (i + 0.5) + (r % 2) * 20, gy, k, nm[(i + r) % 5], { roof: rf[(i * 2 + r) % 5], layer: r < 2 ? "far" : r < 4 ? "mid" : "near", t: W(36, 6) + r * 0.25 + i * 0.03 }); });
  countUp(S, 960, 250, 0, 2400, W(36, 3), WE(36, 9) - W(36, 3), { size: DS.type.display, fmt: (n) => Math.round(n).toLocaleString("en-US") + " HOMES", c: DS.c("red", 2), ease: "power1.out" });
  card(S, "ONE EVERY 18 SECONDS", 960, 350, { t: W(36, 10), size: DS.type.caption });
  fin(S); }

// So Dave rings an estate agent, who explains that even paying cash,
{ const S = sc(37, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  S.draw(rect(950, 90, 20, 870), S.start, 0, { fill: DS.c("gray", 1), c: DS.P.ink[0], w: DS.w.hair });
  const F = dave(S, 560, 960, "near", { look: 6, mood: "determined", armR: ARM.up });
  const [hx, hy] = F.hand("R"); mphone(S, hx + 4, hy - 70, 0.3, { screen: "green", tone: 0 });
  const A = who(S, 1400, 960, "near", Object.assign({}, AGENT, { look: -6, mood: "smile", pose: "hold" })); talk(S, A, W(37, 5), WE(37, 11));
  deskBlock(S, 1150, 1700, 790);
  nameTag(S, A, "ESTATE AGENT", W(37, 3), { y: 330, size: DS.type.caption });
  dash(S.draw(`M${hx + 40} ${hy - 150} Q960 130 1350 ${hy - 120}`, W(37, 2), 0, { c: DS.c("blue"), w: DS.w.mid }), 18, 16);
  fin(S); }

// buying a house usually takes a week or two of title searches, inspections and signatures.
{ const S = sc(37, 12, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  card(S, "A WEEK OR TWO", 960, 170, { t: W(37, 17) });
  const X = [400, 960, 1520], T = [W(37, 22), W(37, 24), W(37, 26)], L = ["TITLE SEARCH", "INSPECTION", "SIGNATURES"];
  X.forEach((x, i) => { const pg = panel(S, x, 540, 420, 440); fadeG(S, pg, T[i]); txt(S, L[i], x, 840, { size: DS.type.caption, t: T[i] }); });
  { const g = S.grp(); form(S, 400, 540, 0.62, { parent: g }); magnify(S, 460, 580, 56, { parent: g }); fadeG(S, g, T[0]); }
  { const g = S.grp(); house(S, 960, 640, 1.2, "wall", { parent: g, roof: "red" }); tick(S, 1060, 520, 1.6, T[1]); fadeG(S, g, T[1]); }
  { const g = S.grp(); form(S, 1520, 540, 0.62, { parent: g }); S.draw(`M1440 640 q20 -40 40 0 t40 0 t40 0`, S.start, 0, { c: DS.c("blue", 2), w: DS.w.near, parent: g }); fadeG(S, g, T[2]); }
  fin(S); }

// Dave would own two thousand four hundred houses, sometime next month.
{ const S = sc(38, 0, { cam: "push", focus: "900 600" }); DS.outdoor(S, DAY);
  const F = dave(S, 560, 960, "near", { look: 0, mood: "flat", pose: "stand" });
  DS.shape(S, rect(1000 - 12, 560, 24, 400), "wood", { tone: 2, flat: true, w: "detail" });
  { const g = S.grp(); DS.shape(S, rrect(780, 560, 440, 220, DS.r.sm), "white", { w: "mid", parent: g }); txt(S, "OWNED TODAY", 1000, 640, { size: DS.type.caption, t: W(38, 0), parent: g }); txt(S, "0", 1000, 750, { size: DS.type.display, t: W(38, 0), c: DS.c("red", 2), parent: g }); }
  { const pg = panel(S, 1520, 560, 560, 560); const g = S.grp(); DS.shape(S, rect(1240, 280, 560, 90), "red", { w: "detail", parent: g }); txt(S, "NEXT MONTH", 1520, 340, { size: DS.type.small, c: DS.P.white[0], t: W(38, 7), parent: g });
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) house(S, 1290 + c * 84, 510 + r * 100, 0.18, ["wall", "sand", "paper"][(r + c) % 3], { parent: g, roof: ["red", "blue", "orange"][(r * 2 + c) % 3] });
    fadeG(S, pg, W(38, 7)); fadeG(S, g, W(38, 7)); }
  txt(S, "2,400 HOUSES", 1520, 900, { size: DS.type.small, t: W(38, 3), c: DS.c("green", 2) });
  fin(S); }

// So what costs a billion dollars all by itself?
{ const S = sc(39, 0, { cam: "push", focus: "1000 560" }); DS.room(S, ROOM);
  DS.shape(S, rect(1330, 820, 260, 140), "wood", { tone: 1, w: "mid" }); DS.shape(S, rrect(1320, 800, 280, 30, DS.r.xs), "wood", { w: "mid" });
  DS.shape(S, rrect(1280, 400, 360, 400, DS.r.md), "paper", { w: "near" }); txt(S, "?", 1460, 700, { size: DS.type.display, c: DS.c("red", 2), t: W(39, 6) });
  priceTag(S, 1000, 420, "$1 BILLION", { t: W(39, 4) });
  const F = dave(S, 520, 960, "near", { look: 6, mood: "worried", pose: "think" });
  card(S, "ALL BY ITSELF", 960, 170, { t: W(39, 6) });
  fin(S); }

// A standard rocket launch costs about seventy-four million dollars.
{ const S = sc(40, 0, { cam: "push", focus: "900 560" }); DS.outdoor(S, DAY, { hy: 700 });
  const tw = 440; DS.shape(S, rect(tw - 40, 260, 80, 700), "gray", { layer: "mid", tone: 1, dir: "h", w: "mid" }); for (let y = 340; y < 940; y += 90) S.draw(`M${tw - 40} ${y} L${tw + 40} ${y + 90} M${tw + 40} ${y} L${tw - 40} ${y + 90}`, S.start, 0, { c: DS.c("gray", 2, "mid"), w: DS.w.detail });
  rocket(S, 900, 940, 1.6); priceTag(S, 1090, 560, "$74 MILLION", { t: W(40, 5) });
  card(S, "ONE ROCKET LAUNCH", 960, 170, { t: W(40, 1) });
  const F = dave(S, 1650, 960, "near", { s: 0.95, look: -8, mood: "wow" });
  fin(S); }

// A billion buys thirteen of them, and Dave has nothing to put on any of them.
{ const S = sc(40, 9, { cam: "push", focus: "900 600" }); DS.outdoor(S, DAY, { hy: 700 });
  for (let i = 0; i < 13; i++) rocket(S, 190 + i * 116, 930, 0.55, { t: W(40, 12) + i * 0.12 });
  card(S, "x 13", 960, 190, { t: W(40, 11), size: DS.type.title });
  card(S, "NOTHING TO PUT ON THEM", 960, 330, { t: W(40, 17), tc: "red", size: DS.type.small });
  const F = dave(S, 1790, 960, "near", { s: 0.95, look: -8, mood: "flat", pose: "shrug" });
  fin(S); }

// NASA's Webb Space Telescope cost about nine point seven billion dollars,
{ const S = sc(41, 0, { cam: "push", focus: "960 480" }); DS.room(S, { wall: "navy", floor: "navy", window: false });
  DS.shape(S, rect(940, 700, 40, 180), "gray", { tone: 1, dir: "h", w: "mid" }); DS.shape(S, rrect(780, 860, 360, 40, DS.r.sm), "gray", { tone: 2, w: "mid" });
  mirror(S, 960, 490, 70, { t: S.start });
  card(S, "WEBB SPACE TELESCOPE", 960, 115, { t: W(41, 1), size: DS.type.small });
  priceTag(S, 1290, 800, "$9.7 BILLION", { t: W(41, 5) });
  fin(S); }

// so a billion buys you roughly a tenth of a space telescope.
{ const S = sc(41, 11, { cam: "push", focus: "960 480" }); DS.room(S, { wall: "navy", floor: "navy", window: false });
  mirror(S, 960, 330, 62, { t: S.start });
  const bx = 270; for (let i = 0; i < 10; i++) { DS.shape(S, rrect(bx + i * 140, 640, 120, 120, DS.r.sm), i === 0 ? "green" : "gray", { tone: i === 0 ? 1 : 1, flat: true, w: "mid", t: W(41, 15) + i * 0.08 }); }
  txt(S, "YOURS", bx + 60, 830, { size: DS.type.caption, t: W(41, 16), c: DS.P.white[0] }); tick(S, bx + 60, 700, 1.6, W(41, 17));
  txt(S, "ABOUT 1/10", 960, 910, { size: DS.type.title, t: W(41, 17), c: DS.P.white[0] });
  fin(S); }

// Which tenth? Can I have the gold bit?
{ const S = sc(42, 0, { cam: "push", focus: "900 600" }); DS.room(S, { wall: "navy", floor: "navy", window: false });
  const M = mirror(S, 1450, 570, 80, { t: S.start });
  const F = dave(S, 640, 960, "near", { s: 1.45, look: 8, mood: "happy", pose: "point" }); talk(S, F, W(42, 0), END(42));
  say(S, 780, 250, 440, 140, 660, 470, ["“WHICH TENTH? CAN I", "HAVE THE GOLD BIT?”"], W(42, 0), { size: DS.type.small });
  S.draw(circ(M.hexes[4][0], M.hexes[4][1], 96), W(42, 5), 0, { c: DS.c("red"), w: DS.w.near });
  fin(S); }

// All the gold on Webb's mirrors weighs about fifty grams.
{ const S = sc(43, 0, { cam: "push", focus: "900 560" }); DS.room(S, { wall: "navy", floor: "navy", window: false });
  scaleBox(S, 620, 900, 1.5, "50 G", { tt: W(43, 6) });
  { const g = S.grp(); DS.shape(S, circ(620, 716, 56), "gold", { w: "mid", parent: g }); S.fill(circ(596, 692, 16, 10), S.start, 0, DS.P.white[0], 0.7, g); fadeG(S, g, W(43, 4)); }
  mirror(S, 1380, 500, 66, { t: W(43, 2) });
  card(S, "ALL THE GOLD", 960, 170, { t: W(43, 1) });
  card(S, "50 GRAMS", 620, 330, { t: W(43, 7), tc: "red" });
  fin(S); }

// Dave's tenth would weigh about the same as five of his banknotes.
{ const S = sc(43, 9, { cam: "push", focus: "900 560" }); DS.room(S, { wall: "navy", floor: "navy", window: false });
  scaleBox(S, 620, 900, 1.5, "5 G", { tt: W(43, 13) });
  for (let i = 0; i < 5; i++) note(S, 620 + (i - 2) * 26, 706 - i * 22, 0.7, { t: W(43, 17) + i * 0.15, tone: i % 3 });
  card(S, "5 BANKNOTES", 620, 330, { t: W(43, 17), tc: "red" });
  const F = dave(S, 1300, 960, "near", { look: -6, mood: "happy", pose: "hips" });
  card(S, "DAVE'S TENTH", 1300, 430, { t: W(43, 9) });
  fin(S); }

// And in twenty twenty-five, a university in Michigan opened a twelve-storey hospital
{ const S = sc(44, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, DAY, { hy: 700 });
  hospital(S, 960, 920, 1.1);
  card(S, "MICHIGAN, 2025", 520, 330, { t: W(44, 2), size: DS.type.caption });
  card(S, "12 STOREYS", 1560, 330, { t: W(44, 9), tc: "blue" });
  fin(S); }

// with two hundred and sixty-four private rooms and twenty operating rooms.
{ const S = sc(44, 11, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  { const P = panel(S, 590, 540, 800, 520); fadeG(S, P, W(44, 12));
    for (let r = 0; r < 12; r++) { const rg = S.grp(); for (let c = 0; c < 22; c++) DS.shape(S, rect(240 + c * 34, 330 + r * 30, 28, 24), "sky", { flat: true, tone: c % 2, w: "hair", parent: rg }); fadeG(S, rg, W(44, 12) + r * 0.12, 0.25); }
    card(S, "264 PRIVATE ROOMS", 590, 830, { t: W(44, 13), size: DS.type.caption }); }
  { const P = panel(S, 1400, 540, 560, 520); fadeG(S, P, W(44, 19));
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) DS.shape(S, rrect(1175 + c * 100, 380 + r * 100, 80, 80, DS.r.sm), "red", { flat: true, tone: 1, w: "detail", t: W(44, 19) + (r * 5 + c) * 0.05 });
    card(S, "20 OPERATING ROOMS", 1400, 830, { t: W(44, 20), size: DS.type.caption }); }
  fin(S); }

// It cost about nine hundred and twenty million dollars, and took about a decade of planning.
{ const S = sc(45, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, DAY, { hy: 700 });
  hospital(S, 480, 920, 0.95); priceTag(S, 700, 640, "$920 MILLION", { t: W(45, 3) });
  { const P = panel(S, 1500, 480, 560, 520); fadeG(S, P, W(45, 9)); const cg = calGrid(S, 1240, 370, 5, 2, 104, 96, { t: W(45, 10) }); cg.C.forEach(([cx, cy], i) => S.fill(rect(cx - 50, cy - 46, 100, 92), W(45, 10) + i * 0.2, 0, DS.c("yellow", 1), 0.95)); txt(S, "ONE DECADE", 1500, 650, { size: DS.type.title, t: W(45, 11), c: DS.c("red", 2) }); txt(S, "OF PLANNING", 1500, 730, { size: DS.type.small, t: W(45, 13) }); }
  fin(S); }

// Dave doesn't have a decade. It's two in the afternoon, and he sits down on the pavement, next to his empty backpack.
{ const S = sc(46, 0, { cam: "pull", focus: "960 640" }); DS.outdoor(S, DAWN); street(S, DAWN, { zebra: 1500 });
  const F1 = dave(S, 880, 960, "near", { look: 4, mood: "sad", pose: "sad" }); tl.to(F1.all, { opacity: 0, duration: 0.4 }, W(46, 11));
  const F2 = who(S, 900, 930, "near", Object.assign({}, DAVE, { sit: true, legL: [[70, 4], [140, 8]], legR: [[82, 10], [154, 14]], mood: "sad", look: 4, t: W(46, 11) }));
  backpack(S, 1180, 960, 1.4, 0, { t: S.start });
  fin(S); }
