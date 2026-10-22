
// ===================== 3. The fall =====================
// the table edge in side view. Top surface at y 640; edge at x 1180; the leg is broken (zigzag) because the table is a very long way up. Call as tableEdge(S, DS.room(S, TBL2)).
const TBL2 = { wall: "wall", floor: "floor", window: false, back: [0, 0, 1920, 1000] };
const tableEdge = (S) => {
  const g = S.grp(); S.g.insertBefore(g, S.g.firstChild.nextSibling);
  DS.shape(S, rect(-100, 640, 1280, 56), "wood", { w: "near", parent: g, tone: 1 });
  DS.shape(S, rect(-100, 696, 1280, 96), "wood", { w: "near", parent: g, tone: 2, flat: true });
  DS.shape(S, rect(1020, 792, 80, 90), "wood", { w: "near", parent: g, tone: 2, flat: true });
  S.draw(`M1000 882 L1040 904 L1000 926 L1040 948 L1000 970 L1120 970 L1080 948 L1120 926 L1080 904 L1120 882 Z`, S.start, 0, { fill: DS.P.paper[0], c: DS.P.ink[0], w: DS.w.mid, parent: g });
  DS.shape(S, rect(1020, 970, 80, 130), "wood", { w: "near", parent: g, tone: 2, flat: true });
  return g;
};
const shaft = (S) => { // a mine shaft in cross-section: vertical shaft with a tunnel off the bottom, in the ground of DS.outdoor
  const g = S.grp();
  DS.shape(S, `M700 250 H860 V640 H1960 V830 H700 Z`, "brown", { w: "mid", parent: g, tone: 2, flat: true });
  DS.shape(S, rect(660, 200, 20, 90), "wood", { w: "mid", parent: g }); DS.shape(S, rect(880, 200, 20, 90), "wood", { w: "mid", parent: g }); DS.shape(S, rect(650, 190, 260, 24), "wood", { w: "mid", parent: g });
  return g;
};
const dazed = (S, cx, cy, t0, t1) => { // slow circling stars: no blinking
  const g = S.grp(); tl.to(g, { opacity: 0, duration: 0.4 }, t1 - 0.4); [0, 1, 2].forEach((i) => { const a = (i / 3) * 360; const sg = S.grp(g); S.draw(`M0 -16 L5 -5 L17 -5 L8 3 L11 15 L0 8 L-11 15 L-8 3 L-17 -5 L-5 -5 Z`, S.start, 0, { fill: DS.c("yellow", 0), c: DS.c("gold", 2), w: DS.w.detail, parent: sg }); tl.fromTo(sg, { attr: { transform: `translate(${cx} ${cy}) rotate(${a}) translate(46 0) rotate(${-a})` } }, { attr: { transform: `translate(${cx} ${cy}) rotate(${a + 360}) translate(46 0) rotate(${-a - 360})` }, duration: 3.2, ease: "none", repeat: Math.ceil((t1 - t0) / 3.2), immediateRender: true }, t0); }); return g; };
const skydiver = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), INKC = DS.P.ink[0], w = DS.w.near * Math.sqrt(k);
  S.draw(`M${cx - 70 * k} ${cy - 40 * k} L${cx - 150 * k} ${cy - 90 * k} M${cx + 70 * k} ${cy - 40 * k} L${cx + 150 * k} ${cy - 90 * k} M${cx - 30 * k} ${cy + 60 * k} L${cx - 90 * k} ${cy + 140 * k} M${cx + 30 * k} ${cy + 60 * k} L${cx + 90 * k} ${cy + 140 * k}`, o.t ?? S.start, 0, { c: DS.c("red", 0), w: w * 1.5, parent: g });
  DS.shape(S, rrect(cx - 56 * k, cy - 60 * k, 112 * k, 140 * k, 40 * k), "red", { t: o.t, w: "near", parent: g });
  S.draw(circ(cx, cy - 96 * k, 36 * k), o.t ?? S.start, 0, { fill: DS.P.paper[0], c: INKC, w: w, parent: g });
  S.draw(`M${cx - 28 * k} ${cy - 112 * k} H${cx + 28 * k} V${cy - 94 * k} H${cx - 28 * k} Z`, o.t ?? S.start, 0, { fill: DS.c("glass", 1), c: INKC, w: DS.w.detail, parent: g });
  return g;
};
const windLines = (S, x0, y0, x1, y1, n, parent, c) => { for (let i = 0; i < n; i++) { const x = x0 + ((x1 - x0) * i) / Math.max(1, n - 1); S.draw(`M${x} ${y0 + (i % 2) * 40} V${y1 - (i % 3) * 30}`, S.start, 0, { c: c || DS.c("sky", 2), w: DS.w.mid, parent, op: 0.7 }); } };

// Dave turns to show the ant his rice and walks straight off the edge of the table.
{ const S = sc(22, 0, { cam: "push", focus: "900 640" }); tableEdge(S, DS.room(S, TBL2));
  const A = ant(S, 380, 640, 1.1, { face: "smile", look: 3, dir: 1 });
  const F = dave(S, 760, 640, "near", { s: 0.8, look: -6, mood: "smile", pose: "stand", float: true, ...HOLD });
  const rg = S.grp(); riceUp(S, F, 1.1, rg);
  F.walk(W(22, 9), 2.0, { x: 480, y: 0 }, 0.35); tl.to(rg, { x: 480, y: 0, duration: 2.0, ease: "none" }, W(22, 9));
  card(S, "THE EDGE", 1000, 750, { t: W(22, 13), tc: "red", size: DS.type.caption });
  DS.vignette(S); }

// He didn't see the edge coming. Remember that.
{ const S = sc(23, 0, { cam: "push", focus: "1100 700" }); tableEdge(S, DS.room(S, TBL2));
  const F = dave(S, 1120, 640, "near", { s: 0.9, look: 4, mood: "wow", pose: "stand", float: true, ...HOLD });
  const rg = S.grp(); riceUp(S, F, 1.2, rg);
  card(S, "!", 1330, 440, { t: W(23, 2), tc: "red", size: DS.type.title });
  stamp(S, 600, 380, "REMEMBER THAT", W(23, 6), "red", { size: DS.type.small });
  DS.vignette(S); }

// Haldane wrote that you can drop a mouse down a thousand-yard mine shaft, and at the bottom, it gets a slight shock and walks away.
{ const S = sc(24, 0, { cam: "push", focus: "980 560" }); DS.outdoor(S, { hy: 250, sky: "sky", sun: false, hills: "grass", ground: "earth" }); shaft(S);
  const M = rodent(S, 780, 826, 1.3, {}); const mg = M; tl.fromTo(mg, { attr: { transform: "translate(0 0)" } }, { attr: { transform: "translate(1000 0)" }, duration: 2.6, ease: "none", immediateRender: false }, W(24, 22));
  dazed(S, 790, 668, S.start, W(24, 22));
  S.draw(`M930 270 V620 M910 290 L930 262 L950 290 M910 600 L930 628 L950 600`, S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
  card(S, "1,000 YARDS", 1180, 440, { t: W(24, 10), size: DS.type.small });
  card(S, "A SLIGHT SHOCK", 1180, 600, { t: W(24, 19), size: DS.type.caption });
  card(S, "HALDANE", 1500, 190, { t: W(24, 0), size: DS.type.caption });
  DS.vignette(S); }

// He didn't explain how he knew. Please don't check.
{ const S = sc(25, 0, { cam: "push", focus: "980 560" }); DS.outdoor(S, { hy: 250, sky: "sky", sun: false, hills: "grass", ground: "earth" }); shaft(S);
  rodent(S, 1700, 826, 1.3, {});
  card(S, "HOW DID HE KNOW?", 960, 420, { t: W(25, 2), size: DS.type.small });
  stamp(S, 1240, 600, "PLEASE DON'T CHECK", W(25, 6), "red", { size: DS.type.small });
  DS.vignette(S); }

// Here's why. Air pushes back on your surface, but gravity pulls on your weight, and Dave lost far more weight than surface.
{ const S = sc(26, 0, { cam: "push", focus: "960 540" }); DS.outdoor(S, { hy: 760, sky: "sky", sun: false, hills: "grass", ground: "grass" });
  const F = dave(S, 960, 640, "near", { s: 0.8, look: 0, mood: "wow", pose: "armsUp", float: true });
  [-210, -110, 110, 210].forEach((dx, i) => { const g = S.grp(); S.draw(`M${960 + dx} 860 V730`, S.start, 0, { c: DS.c("blue", 0), w: DS.w.near * 1.4, parent: g }); S.draw(arrowHead(960 + dx, 730, -Math.PI / 2, 30), S.start, 0, { c: DS.c("blue", 0), w: DS.w.near * 1.4, parent: g }); fadeG(S, g, W(26, 2) + i * 0.15); });
  card(S, "AIR PUSHES ON SURFACE", 960, 190, { t: W(26, 2), tc: "blue", size: DS.type.small });
  const gg = S.grp(); S.draw(`M1250 340 V450`, S.start, 0, { c: DS.c("red", 0), w: DS.w.near * 1.4, parent: gg }); S.draw(arrowHead(1250, 450, Math.PI / 2, 26), S.start, 0, { c: DS.c("red", 0), w: DS.w.near * 1.4, parent: gg }); fadeG(S, gg, W(26, 9));
  card(S, "GRAVITY PULLS ON WEIGHT", 1470, 300, { t: W(26, 9), tc: "red", size: DS.type.caption });
  DS.vignette(S); }

// A skydiver falls at about two hundred kilometres an hour. Tiny Dave tops out at roughly jogging speed, almost at once.
{ const S = sc(27, 0, { cam: "push", focus: "960 540" }); DS.outdoor(S, { hy: 640, sky: "sky", sun: false, hills: "grass", ground: "grass" });
  panel(S, 480, 500, 760, 700, T0(S)); const pr = panel(S, 1440, 500, 760, 700, T0(S)); fadeG(S, pr, W(27, 9));
  const L = S.grp(); fadeG(S, L, W(27, 1));
  windLines(S, 280, 250, 700, 800, 6, L); skydiver(S, 480, 520, 1.1, { parent: L });
  countUp(S, 480, 280, 0, 200, W(27, 5), 1.4, { size: DS.type.title, c: DS.c("red", 2), t0: W(27, 4), parent: L, fmt: (v) => Math.round(v) + " KM/H" });
  const F = tiny(S, 1440, 820, { s: 1.0, look: 6, mood: "happy", float: true }); F.walk(W(27, 12), 3.2, { x: 130, y: 0 }, 0.35);
  card(S, "JOGGING SPEED", 1440, 280, { t: W(27, 16), tc: "green", size: DS.type.small });
  card(S, "ALMOST AT ONCE", 1440, 400, { t: W(27, 18), size: DS.type.caption });
  card(S, "SKYDIVER", 480, 800, { t: W(27, 1), size: DS.type.caption });
  card(S, "TINY DAVE", 1440, 880, { t: W(27, 10), size: DS.type.caption });
  DS.vignette(S); }

// So a table, a roof or a skyscraper makes no difference. Tiny Dave lands at a jog.
{ const S = sc(28, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, { hy: 700, sky: "sky", sun: false, hills: "grass", ground: "grass" });
  const T = S.grp(), Hh = S.grp(), K = S.grp(); fadeG(S, T, W(28, 2)); fadeG(S, Hh, W(28, 4)); fadeG(S, K, W(28, 7));
  // table
  DS.shape(S, rect(250, 540, 340, 36), "wood", { w: "near", parent: T }); [270, 540].forEach((x) => DS.shape(S, rect(x, 576, 30, 200), "wood", { w: "near", parent: T, tone: 2, flat: true }));
  S.text("TABLE", 420, 480, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: T });
  // house with a roof
  DS.shape(S, rect(720, 540, 300, 236), "wall", { w: "near", parent: Hh, tone: 2, flat: true }); DS.shape(S, `M690 540 L870 400 L1050 540 Z`, "red", { w: "near", parent: Hh }); DS.shape(S, rect(840, 660, 60, 116), "wood", { w: "mid", parent: Hh });
  S.text("ROOF", 870, 350, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: Hh });
  // skyscraper
  DS.shape(S, rect(1500, 190, 190, 586), "blue", { w: "near", parent: K, tone: 2, flat: true });
  for (let r = 0; r < 8; r++) for (let c = 0; c < 3; c++) S.fill(rect(1520 + c * 56, 220 + r * 68, 36, 40), S.start, 0, DS.c("sky", 1), 1, K);
  S.text("SKYSCRAPER", 1595, 150, { size: DS.type.caption, c: DS.P.ink[0], t: T0(S), parent: K });
  const F = tiny(S, 700, 960, { s: 0.9, look: 7, mood: "happy", float: true }); F.walk(W(28, 11), 2.4, { x: 560, y: 0 }, 0.35);
  card(S, "SAME LANDING", 960, 880, { t: W(28, 13), tc: "green", size: DS.type.small });
  DS.vignette(S); }

// "I can't be crushed. I can't be broken. I'm a superhero." (Dave)
{ const S = sc(29, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.morning));
  // cape first, so it sits behind him
  S.draw(`M870 560 Q760 760 700 940 Q800 900 850 960 Q930 880 1010 960 Q1060 880 1130 920 Q1090 740 1050 560 Z`, S.start, 0, { fill: DS.c("red", 0), c: DS.P.ink[0], w: DS.w.near });
  const F = tiny(S, 960, 940, { s: 1.45, look: 0, mood: "determined", pose: "hips", hair: "side" }); talk(S, F, W(29, 0), END(29));
  card(S, "I'M A SUPERHERO", 960, 190, { t: W(29, 8), tc: "red" });
  DS.vignette(S); }
