
// ===================== 3. Ten tonnes of cash =====================
// bank counter strip along the back wall (teller window), for the bank scenes
const counter = (S, x0, x1, top) => { DS.shape(S, rect(x0, top, x1 - x0, 24), "wood", { tone: 1, w: "mid" }); DS.shape(S, rect(x0, top + 24, x1 - x0, 130), "wood", { tone: 2, flat: true, w: "detail" }); S.draw(rect(x0 + 20, top - 150, x1 - x0 - 40, 150), S.start, 0, { fill: DS.c("glass", 0), c: DS.c("gray", 2), w: DS.w.detail, op: 0.55 }); };

// Here's the thing about cash. An American banknote weighs about one gram, whatever it's worth,
{ const S = sc(20, 0, { cam: "push", focus: "960 600" }); DS.room(S, BANK);
  [[470, "1", "$1"], [1450, "100", "$100"]].forEach(([x, v, lab], i) => {
    scaleBox(S, x, 900, 1.2, "1 G", { tt: W(20, 8) + i * 0.4 });
    note(S, x, 700, 1.4, { val: v, t: W(20, i ? 11 : 6), name: "green", tone: i ? 0 : 1 });
  });
  card(S, "1 GRAM", 960, 170, { t: W(20, 9) }); card(S, "WHATEVER IT'S WORTH", 960, 300, { t: W(20, 11), size: DS.type.caption });
  const F = dave(S, 960, 960, "near", { look: 0, mood: "flat", pose: "shrug" });
  fin(S); }

// and the biggest note still issued is the hundred.
{ const S = sc(20, 15, { cam: "push", focus: "960 540" }); DS.room(S, BANK);
  const V = ["$1", "$5", "$10", "$20", "$50", "$100"], X = [330, 550, 770, 990, 1210, 1430];
  V.forEach((v, i) => { note(S, X[i], 520, 0.8, { t: W(20, 16) + i * 0.18, tone: i % 3 }); txt(S, v, X[i], 640, { t: W(20, 16) + i * 0.18, size: DS.type.small }); });
  S.draw(circ(X[5], 520, 130, 90), W(20, 21), 0, { c: DS.c("red"), w: DS.w.near }); card(S, "THE BIGGEST", 1430, 380, { t: W(20, 17), tc: "red" });
  const F = dave(S, 1730, 960, "near", { look: -6, mood: "flat" });
  fin(S); }

// So a billion dollars in cash is ten million notes, about ten tonnes of paper,
{ const S = sc(21, 0, { cam: "push", focus: "960 640" }); DS.room(S, BANK);
  cashPile(S, 960, 910, 1.0, 7, { t0: W(21, 7), dt: 0.3 });
  countUp(S, 960, 240, 0, 1e7, W(21, 6), WE(21, 9) - W(21, 6), { size: DS.type.display, c: DS.c("green", 2), ease: "power1.out" });
  txt(S, "NOTES", 960, 320, { size: DS.type.title, t: W(21, 8) });
  card(S, "10 TONNES", 1560, 520, { t: W(21, 11), tc: "red" });
  const F = dave(S, 220, 960, "near", { s: 0.95, look: 8, mood: "wow", pose: "head" });
  fin(S); }

// roughly the weight of two big elephants.
{ const S = sc(21, 15, { cam: "push", focus: "960 640" }); DS.room(S, BANK);
  const px = 960, py = 790, pl = S.grp();
  DS.shape(S, `M${px - 90} ${py + 150} L${px} ${py + 8} L${px + 90} ${py + 150} Z`, "gray", { tone: 2, w: "mid" });
  DS.shadow(S, px, py + 152, 600);
  DS.shape(S, rrect(210, py - 4, 1500, 40, DS.r.xs), "wood", { w: "mid", parent: pl });
  cashPile(S, 500, py - 4, 0.66, 6, { parent: pl });
  [[1240, 0], [1560, 0.3]].forEach(([x, dt], i) => elephant(S, x, py - 4, 0.6, { parent: pl, t: W(21, 18) + dt }));
  const tf = (a) => `rotate(${a} ${px} ${py})`; pl.setAttribute("transform", tf(-5));
  tl.fromTo(pl, { attr: { transform: tf(-5) } }, { attr: { transform: tf(0) }, duration: 1.4, ease: "power2.inOut", immediateRender: false }, W(21, 19));
  card(S, "10 TONNES", 500, 280, { t: W(21, 15), tc: "red" }); card(S, "2 ELEPHANTS", 1400, 280, { t: W(21, 19) });
  const F = dave(S, 180, 960, "near", { s: 0.9, look: 8, mood: "wow", pose: "head" });
  fin(S); }

// Stacked up, they'd make a tower about a kilometre high, taller than any building on Earth.
{ const S = sc(22, 0, { cam: "none" }); DS.outdoor(S, DAY);
  el("path", { d: "M-200 -3600 H2120 V-200 H-200 Z", fill: DS.vgrad(DS.P.navy[2], DS.P.sky[2]) }, S.g);
  [[300, -600, 170], [1500, -900, 220], [420, -1500, 190], [1480, -1750, 150]].forEach(([x, y, r]) => S.fill(circ(x, y, r, r * 0.45), S.start, 0, DS.P.white[0], 0.85));
  // the cash tower (to -1750) and the tallest building (to -1109, spire included)
  DS.shape(S, rect(1100, -1750, 170, 2650), "green", { tone: 1, dir: "h", w: "mid" });
  let d = ""; for (let y = 880; y > -1740; y -= 70) d += `M1100 ${y} H1270 `; S.draw(d, S.start, 0, { c: DS.c("green", 2), w: DS.w.hair });
  DS.shape(S, rect(640, -1000, 180, 1900), "gray", { tone: 1, dir: "h", w: "mid" }); DS.shape(S, `M700 -1000 L730 -1109 L760 -1000 Z`, "gray", { tone: 2, w: "mid" });
  d = ""; for (let y = 860; y > -980; y -= 90) d += `M660 ${y} H800 `; S.draw(d, S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail });
  const F = dave(S, 940, 960, "near", { s: 0.95, look: 0, mood: "wow" });
  S.pan(0, 1900, W(22, 4), 3.8, "power2.inOut");
  card(S, "ABOUT 1 KM", 1560, -1560, { t: W(22, 8), size: DS.type.small, tc: "red" });
  card(S, "TALLEST BUILDING", 600, -1250, { t: W(22, 11), size: DS.type.caption }); }

// Dave has come with a backpack.
{ const S = sc(23, 0, { cam: "push", focus: "1000 640" }); DS.room(S, BANK); counter(S, 380, 1540, 620);
  cashPile(S, 1330, 900, 1.0, 6);
  const F = dave(S, 560, 960, "near", { look: 8, mood: "flat", pose: "stand" });
  backpack(S, 760, 960, 1.5, 0, { t: W(23, 4) }); card(S, "BACKPACK", 790, 700, { t: W(23, 4) });
  fin(S); }

// America did once print a hundred-thousand-dollar note, in nineteen thirty-four.
{ const S = sc(24, 0, { cam: "push", focus: "960 540" }); DS.room(S, LAB2);
  note(S, 960, 500, 2.6, { val: "100,000", name: "gold", tone: 1, t: W(24, 4) });
  card(S, "1934", 960, 790, { t: W(24, 7), size: DS.type.title });
  const F = dave(S, 1680, 960, "near", { s: 0.95, look: -8, mood: "wow" });
  fin(S); }

// With those, his billion would weigh about ten kilos.
{ const S = sc(24, 10, { cam: "push", focus: "960 600" }); DS.room(S, BANK);
  scaleBox(S, 640, 900, 1.5, "10 KG", { tt: W(24, 14) });
  cashPile(S, 640, 900 - 150, 0.55, 3, { t0: W(24, 13), dt: 0.1 });
  card(S, "10,000 NOTES", 640, 360, { t: W(24, 11) });
  const F = dave(S, 1180, 960, "near", { look: -6, mood: "happy", pose: "hips" });
  backpack(S, 1500, 960, 1.5, 1, { t: W(24, 14) });
  fin(S); }

// But that note was only ever for moving money between Federal Reserve Banks, so Dave gets the elephants.
{ const S = sc(25, 0, { cam: "push", focus: "900 600" }); DS.room(S, BANK);
  columns(S, 330, 760, 0.55, "BANK", { layer: "mid" }); columns(S, 900, 760, 0.55, "BANK", { layer: "mid" });
  const nt = note(S, 330, 560, 0.5, { name: "gold", tone: 1, t: W(25, 5) });
  tl.fromTo(nt, { attr: { transform: "translate(0 0)" } }, { attr: { transform: "translate(570 0)" }, duration: 2.0, ease: "power1.inOut", immediateRender: false }, W(25, 6));
  stamp(S, 615, 330, "BANKS ONLY", W(25, 4), "red", { size: DS.type.body });
  elephant(S, 1150, 960, 0.5, { t: W(25, 15) }); elephant(S, 1640, 960, 0.5, { t: W(25, 16) });
  const F = dave(S, 1400, 960, "near", { s: 0.95, look: 0, mood: "flat", pose: "stand" });
  fin(S); }

// And counting the notes, one every second, would take about a hundred and sixteen days. Dave has fifteen hours.
{ const S = sc(26, 0, { cam: "push", focus: "960 560" }); DS.room(S, BANK);
  const cg = calGrid(S, 220, 280, 12, 10, 44, 34, { t: W(26, 6) });
  cg.C.slice(0, 116).forEach(([cx, cy], i) => S.fill(rect(cx - 20, cy - 15, 40, 30), W(26, 8) + (i / 116) * 2.6, 0, DS.c("yellow", 1), 0.95));
  countUp(S, 490, 760, 0, 116, W(26, 8), 2.6, { size: DS.type.title, fmt: (n) => Math.round(n) + " DAYS", c: DS.c("red", 2), ease: "none" });
  dayClock(S, 1440, 480, 180, {}); txt(S, "15 HOURS", 1440, 790, { size: DS.type.title, t: W(26, 15), c: DS.c("red", 2) });
  const F = dave(S, 980, 960, "near", { look: 6, mood: "tired", pose: "hold" });
  const [hx, hy] = F.hand("R", "hold"); note(S, hx + 4, hy - 8, 0.4);
  fin(S, { noClock: true }); }

// So he takes out just a hundred thousand dollars. It weighs about a kilo, and it fits in the backpack.
{ const S = sc(27, 0, { cam: "push", focus: "960 600" }); DS.room(S, BANK); counter(S, 380, 1540, 620);
  const F = dave(S, 460, 960, "near", { look: 6, mood: "smile", pose: "stand" });
  card(S, "$100,000", 960, 200, { t: W(27, 4) });
  scaleBox(S, 1500, 900, 1.0, "1 KG", { tt: W(27, 10) }); bundle(S, 1500, 770, 1.1, { t: W(27, 9) });
  backpack(S, 960, 960, 1.7, 1, { t: W(27, 15) });
  fin(S); }
