
// ===================== 2. Pound for pound =====================
const dashed = (p, a = 14, b = 12) => { p.removeAttribute("pathLength"); p.setAttribute("stroke-dasharray", `${a} ${b}`); return p; };
// "was big, now small": a dashed ghost of the old size and a small solid copy. kind: tall | square | blob
const shrinkIcon = (S, x, y, kind, parent) => {
  const ink = DS.c("gray", 2);
  if (kind === "tall") { dashed(S.draw(rrect(x - 40, y - 150, 80, 300, DS.r.sm), S.start, 0, { c: ink, w: DS.w.mid, parent })); mini(S, x + 90, y + 150, 0.9, { parent, w: DS.w.near, c: DS.c("blue", 2) }); }
  if (kind === "square") { dashed(S.draw(rect(x - 120, y - 120, 240, 240), S.start, 0, { c: ink, w: DS.w.mid, parent })); S.draw(rect(x - 20, y + 80, 40, 40), S.start, 0, { fill: DS.c("pink", 0), c: DS.P.ink[0], w: DS.w.mid, parent }); }
  if (kind === "blob") { dashed(S.draw(circ(x, y, 130, 120), S.start, 0, { c: ink, w: DS.w.mid, parent })); S.draw(circ(x, y + 100, 9), S.start, 0, { fill: DS.c("blue", 0), c: DS.P.ink[0], w: DS.w.detail, parent }); }
};
// a balance: beam level at (cx, cy), pans hang 220 below; returns the two pan centres
const balance = (S, cx, cy, hw, o = {}) => {
  const g = S.grp(o.parent), py = cy + 230;
  DS.shape(S, `M${cx - 110} 900 L${cx - 40} ${cy + 40} H${cx + 40} L${cx + 110} 900 Z`, "gray", { w: "mid", parent: g });
  DS.shape(S, rrect(cx - hw, cy - 18, hw * 2, 36, DS.r.sm), "wood", { w: "mid", parent: g });
  DS.shape(S, circ(cx, cy, 26), "gold", { w: "mid", parent: g });
  [-1, 1].forEach((sd) => { const px = cx + sd * hw; S.draw(`M${px} ${cy + 10} L${px - 150} ${py} M${px} ${cy + 10} L${px + 150} ${py}`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: g }); DS.shape(S, `M${px - 170} ${py} H${px + 170} Q${px + 150} ${py + 50} ${px} ${py + 56} Q${px - 150} ${py + 50} ${px - 170} ${py} Z`, "gold", { w: "mid", parent: g }); });
  return { g, left: [cx - hw, py], right: [cx + hw, py] };
};
const bathScale = (S, cx, gy, read, o = {}) => {
  const g = S.grp(o.parent);
  DS.shadow(S, cx, gy + 2, 420, { parent: g });
  DS.shape(S, rrect(cx - 230, gy - 70, 460, 70, DS.r.sm), "white", { w: "near", parent: g });
  DS.shape(S, rrect(cx - 110, gy - 58, 220, 46, DS.r.xs), "glass", { w: "detail", flat: true, parent: g });
  S.text(read, cx, gy - 22, { size: DS.type.caption, c: DS.c("red", 2), t: o.t ?? T0(S), parent: g });
  return g;
};

// In nineteen twenty-six, the biologist J B S Haldane wrote an essay called On Being the Right Size. It explains most of Dave's day.
{ const S = sc(10, 0, { cam: "push", focus: "900 600" }); tbl(S, DS.room(S, TBL));
  const bk = hardback(S, 640, 560, 430, 580, ["ON BEING", "THE RIGHT", "SIZE"], { t: W(10, 11) });
  card(S, "1926", 1250, 330, { t: W(10, 2), tc: "red" });
  card(S, "J B S HALDANE", 1250, 470, { t: W(10, 5), size: DS.type.small });
  card(S, "EXPLAINS DAVE'S DAY", 1250, 610, { t: W(10, 19), size: DS.type.caption });
  const F = tiny(S, 1550, 960, { s: 0.9, look: -5, mood: "smile" });
  DS.vignette(S); }

// Dave is three hundred and fifty times shorter. But he has about a hundred and twenty thousand times less skin, and he's about forty-three million times lighter.
{ const S = sc(11, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  [[330, "tall", 350, "SHORTER", W(11, 2), "×"], [960, "square", 122500, "LESS SKIN", W(11, 13), "×"], [1590, "blob", 42875000, "LIGHTER", W(11, 22), "×"]].forEach(([x, kind, n, lab, t, u]) => {
    const p = panel(S, x, 520, 520, 640, T0(S)); fadeG(S, p, t - 0.2);
    const ig = S.grp(); fadeG(S, ig, t);
    shrinkIcon(S, x, 600, kind, ig);
    countUp(S, x, 340, 0, n, t, 1.4, { size: DS.type.body, c: DS.c("red", 2), t0: t, parent: ig, fmt: (v) => Math.round(v).toLocaleString("en-US") + u });
    S.text(lab, x, 800, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: ig });
  });
  DS.vignette(S); }

// He used to weigh seventy kilos. Now he weighs less than two milligrams, about the same as a mosquito.
{ const S = sc(12, 0, { cam: "push", focus: "960 600" }); tbl(S, DS.room(S, TBL), false);
  const Bl = balance(S, 960, 420, 400);
  const F = tiny(S, Bl.left[0], Bl.left[1] + 4, { s: 0.55, look: 4, mood: "smile" });
  const M = mosquito(S, Bl.right[0], Bl.right[1] - 36, 1.1); fadeG(S, M, W(12, 17), 0.5);
  card(S, "70 KG", 560, 190, { t: W(12, 4), size: DS.type.title });
  S.draw(`M410 205 L700 175`, W(12, 5) + 0.6, 0, { c: DS.c("red", 0), w: DS.w.near });
  card(S, "1.63 MG", 960, 190, { t: W(12, 9), size: DS.type.title, tc: "red" });
  card(S, "A MOSQUITO", 1400, 330, { t: W(12, 17), size: DS.type.small });
  DS.vignette(S); }

// Dave has lost weight. Nearly all of it.
{ const S = sc(13, 0, { cam: "push", focus: "960 620" }); tbl(S, DS.room(S, TBL), false);
  bathScale(S, 960, 960, "1.63 MG");
  const F = tiny(S, 960, 890, { s: 0.9, look: 0, mood: "smile", pose: "armsUp" });
  card(S, "LOST WEIGHT", 960, 330, { t: W(13, 0), tc: "green" });
  card(S, "NEARLY ALL OF IT", 960, 470, { t: W(13, 4), size: DS.type.caption });
  DS.vignette(S); }

// Here's the good news. A muscle's strength depends on how big it is across, and that's an area, so it shrank far less than his weight.
{ const S = sc(14, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  const pan = panel(S, 960, 520, 1700, 700, T0(S));
  const L = S.grp(), Rr = S.grp(); fadeG(S, L, W(14, 9)); fadeG(S, Rr, W(14, 20));
  // muscle cross-section: area
  DS.shape(S, circ(500, 500, 130), "red", { flat: true, w: "near", parent: L }); S.text("MUSCLE", 500, 700, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: L });
  S.draw(`M650 500 H790`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: L }); S.draw(arrowHead(790, 500, 0, 28), S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: L });
  DS.shape(S, circ(880, 500, 40), "red", { flat: true, w: "near", parent: L });
  txt(S, "÷ 122,500", 880, 610, { size: DS.type.caption, c: DS.c("red", 2), t: W(14, 15), parent: L });
  card(S, "AREA", 700, 250, { t: W(14, 15), size: DS.type.small, parent: undefined });
  // weight: volume, shrinks far more
  DS.shape(S, rect(1130, 380, 190, 190), "blue", { w: "near", parent: Rr }); DS.shape(S, `M1130 380 L1170 340 H1360 L1320 380 Z`, "blue", { flat: true, tone: 1, w: "near", parent: Rr }); DS.shape(S, `M1320 380 L1360 340 V530 L1320 570 Z`, "blue", { flat: true, tone: 2, w: "near", parent: Rr });
  S.text("WEIGHT", 1240, 700, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: Rr });
  S.draw(`M1420 480 H1560`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: Rr }); S.draw(arrowHead(1560, 480, 0, 28), S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: Rr });
  S.fill(circ(1640, 480, 6), S.start, 0, DS.c("blue", 0), 1, Rr);
  txt(S, "÷ 42,875,000", 1560, 610, { size: DS.type.caption, c: DS.c("red", 2), t: W(14, 20), parent: Rr });
  DS.vignette(S); }

// On paper, pound for pound, Dave is now about three hundred and fifty times stronger.
{ const S = sc(15, 0, { cam: "push", focus: "900 620" }); tbl(S, DS.room(S, TBL), false);
  const F = tiny(S, 620, 960, { s: 1.2, look: 3, mood: "determined", pose: "armsUp" });
  card(S, "ON PAPER", 1250, 330, { t: W(15, 0), size: DS.type.small });
  card(S, "POUND FOR POUND", 1250, 460, { t: W(15, 2), size: DS.type.caption });
  countUp(S, 1250, 700, 0, 350, W(15, 9), 1.4, { size: DS.type.display, c: DS.c("red", 2), t0: W(15, 9), fmt: (v) => Math.round(v) + "×" });
  card(S, "STRONGER", 1250, 790, { t: W(15, 13), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// He lifts a grain of rice, more than ten times his own weight, and holds it over his head so everyone can see.
{ const S = sc(16, 0, { cam: "push", focus: "900 560" }); tbl(S, DS.room(S, TBL));
  const F = tiny(S, 900, 960, { s: 1.0, look: 0, mood: "determined", pose: "stand", ...HOLD });
  const r = riceUp(S, F, 1.3); fadeG(S, r, W(16, 3), 0.4);
  card(S, "RICE", 520, 330, { t: W(16, 3), size: DS.type.small });
  card(S, ">10× HIS WEIGHT", 1330, 400, { t: W(16, 6), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// A black garden ant walks past, carrying something bigger.
{ const S = sc(17, 0, { cam: "push", focus: "900 600" }); tbl(S, DS.room(S, TBL));
  const F = tiny(S, 520, 960, { s: 1.0, look: 5, mood: "smile", pose: "stand", ...HOLD }); riceUp(S, F, 1.3);
  const A = ant(S, 1240, 880, 1.25, { face: "smile", look: -3, dir: -1 }); A.walkIn(W(17, 3), 2.4, 900);
  carrySeed(S, A.XA(8), A.YA(-190), 1.4, A.g);
  card(S, "BIGGER", 1240, 330, { t: W(17, 7), tc: "red" });
  DS.vignette(S); }

// "Cute. We carry those all day, Dave." (kid)
{ const S = sc(18, 0, { cam: "push", focus: "1000 640" }); tbl(S, DS.room(S, TBL), false);
  [[1320, 800, 0.55], [1520, 800, 0.55], [1720, 800, 0.55]].forEach(([x, y, k]) => { const a = ant(S, x, y, k, { face: "smile", dir: -1 }); carrySeed(S, a.XA(8), a.YA(-190), k * 0.75, a.g); });
  const F = tiny(S, 420, 960, { s: 1.0, look: 6, mood: "sad" });
  const A = ant(S, 1060, 960, 1.8, { face: "cheeky", look: -3, dir: -1 }); A.talk(W(18, 0), END(18)); A.face(W(18, 4), "smile");
  carrySeed(S, A.XA(8), A.YA(-190), 2.0, A.g);
  card(S, "ALL DAY", 1060, 190, { t: W(18, 4), tc: "red" });
  DS.vignette(S); }

// In twenty ten, a prize-winning photo by the Cambridge scientist Thomas Endlein showed a weaver ant upside down on a glass-like surface, holding a weight a hundred times its own in its jaws.
{ const S = sc(19, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "earth", floor: "wood", window: false });
  DS.drop(S, rrect(250, 150, 1420, 720, DS.r.sm));
  DS.shape(S, rrect(230, 130, 1420, 720, DS.r.sm), "wood", { w: "near" });
  S.draw(rect(280, 180, 1320, 620), S.start, 0, { fill: DS.vgrad(DS.c("sky", 1), DS.c("grass", 1)), c: DS.P.ink[0], w: DS.w.detail });
  S.fill(rect(280, 250, 1320, 70), S.start, 0, DS.P.glass[1], 0.7); S.draw(`M280 320 H1600`, S.start, 0, { c: DS.c("sky", 2), w: DS.w.mid });
  S.draw(`M330 270 Q420 255 500 262`, S.start, 0, { c: DS.P.white[0], w: DS.w.near });
  const A = ant(S, 760, 320, 1.7, { face: "worried", dir: 1, flip: true, body: "orange" }); fadeG(S, A.g, W(19, 14), 0.5);
  const wt = S.grp(); fadeG(S, wt, W(20, 0), 0.4);
  S.draw(`M862 425 L1010 560`, S.start, 0, { c: DS.P.ink[0], w: DS.w.mid, parent: wt });
  DS.shape(S, rrect(900, 560, 220, 170, DS.r.sm), "gray", { w: "near", tone: 2, parent: wt }); S.text("100\u00D7", 1010, 670, { size: DS.type.title, c: DS.P.white[0], t: T0(S), parent: wt });
  card(S, "2010", 450, 80 + 130, { t: W(19, 1), size: DS.type.caption });
  card(S, "CAMBRIDGE", 960, 940, { t: W(19, 8), size: DS.type.caption });
  card(S, "THOMAS ENDLEIN", 1450, 940, { t: W(19, 10), size: DS.type.caption });
  card(S, "100× ITS OWN WEIGHT", 1240, 190, { t: W(20, 3), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// Dave crosses too weak off his list. So far, being tiny is going brilliantly.
{ const S = sc(21, 0, { cam: "push", focus: "1100 560" }); tbl(S, DS.room(S, TBL));
  dangerList(S, 1260, 540, 0.95, { strike: [W(21, 2)] });
  const F = tiny(S, 560, 960, { s: 1.0, look: 6, mood: "smile", pose: "wave" });
  card(S, "SO FAR: BRILLIANT", 560, 330, { t: W(21, 7), tc: "green", size: DS.type.caption });
  DS.vignette(S); }
