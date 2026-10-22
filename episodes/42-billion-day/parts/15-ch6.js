
// ===================== 6. Twelve cents each =====================
// small icons shared by the last chapters
const bulb = (S, cx, cy, k, o = {}) => { const g = S.grp(o.parent); S.draw(rays(cx, cy - 10 * k, 84 * k, 116 * k, 8, -2.9, 2.6), S.start, 0, { c: DS.c("gold", 2), w: DS.w.mid, parent: g }); DS.shape(S, circ(cx, cy, 58 * k), "yellow", { tone: 1, w: "mid", parent: g }); DS.shape(S, rrect(cx - 28 * k, cy + 52 * k, 56 * k, 40 * k, DS.r.xs), "gray", { w: "detail", parent: g }); return fadeG(S, g, o.t); };
const loaf = (S, cx, cy, k, o = {}) => { const g = S.grp(o.parent); DS.shape(S, rrect(cx - 130 * k, cy - 60 * k, 260 * k, 120 * k, 60 * k), "earth", { tone: 0, w: "mid", parent: g }); [-60, 0, 60].forEach((dx) => S.draw(line([cx + dx * k - 14 * k, cy - 34 * k], [cx + dx * k + 14 * k, cy + 6 * k], 0), S.start, 0, { c: DS.c("earth", 2), w: DS.w.mid, parent: g })); return fadeG(S, g, o.t); };
const scissors = (S, cx, cy, k, o = {}) => { const g = S.grp(o.parent); S.draw(line([cx - 70 * k, cy + 70 * k], [cx + 80 * k, cy - 80 * k], 0) + line([cx - 70 * k, cy - 70 * k], [cx + 80 * k, cy + 80 * k], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.4, parent: g }); [[-80, 80], [-80, -80]].forEach(([dx, dy]) => DS.shape(S, circ(cx + dx * k, cy + dy * k, 30 * k), "red", { w: "mid", parent: g })); return fadeG(S, g, o.t); };
const cup = (S, cx, cy, k, o = {}) => { const g = S.grp(o.parent); DS.shape(S, `M${cx - 70 * k} ${cy - 60 * k} H${cx + 70 * k} L${cx + 52 * k} ${cy + 70 * k} H${cx - 52 * k} Z`, "white", { tone: 2, w: "mid", parent: g }); S.draw(`M${cx + 70 * k} ${cy - 36 * k} Q${cx + 124 * k} ${cy - 20 * k} ${cx + 60 * k} ${cy + 20 * k}`, S.start, 0, { c: DS.line("near"), w: DS.w.mid, parent: g }); DS.shape(S, rect(cx - 66 * k, cy - 60 * k, 132 * k, 30 * k), "brown", { flat: true, w: "detail", parent: g }); return fadeG(S, g, o.t); };
const sack = (S, cx, cy, k, o = {}) => { const g = S.grp(o.parent); DS.shape(S, `M${cx - 80 * k} ${cy - 70 * k} Q${cx - 110 * k} ${cy + 20 * k} ${cx - 80 * k} ${cy + 80 * k} H${cx + 80 * k} Q${cx + 110 * k} ${cy + 20 * k} ${cx + 80 * k} ${cy - 70 * k} Z`, "sand", { w: "mid", parent: g }); DS.shape(S, `M${cx - 70 * k} ${cy - 70 * k} Q${cx} ${cy - 110 * k} ${cx + 70 * k} ${cy - 70 * k} Z`, "sand", { tone: 2, w: "mid", parent: g }); return fadeG(S, g, o.t); };
const laptopS = (S, cx, top, wd, ht, o = {}) => { const g = S.grp(o.parent); DS.shape(S, rrect(cx - wd / 2, top - ht, wd, ht, DS.r.sm), "gray", { tone: 2, w: "mid", parent: g }); DS.shape(S, rect(cx - wd / 2 + 16, top - ht + 16, wd - 32, ht - 38), o.screen || "sky", { flat: true, tone: 1, w: "hair", parent: g }); DS.shape(S, `M${cx - wd / 2 - 30} ${top} L${cx + wd / 2 + 30} ${top} L${cx + wd / 2 + 10} ${top - 18} L${cx - wd / 2 - 10} ${top - 18} Z`, "gray", { w: "detail", parent: g }); return g; };
const benchP = (S, x0, x1, top) => { DS.shadow(S, (x0 + x1) / 2, top + 168, x1 - x0 + 60); DS.shape(S, rect(x0, top, x1 - x0, 26), "wood", { w: "mid" }); DS.shape(S, rect(x0 + 24, top + 26, 24, 140), "wood", { tone: 2, flat: true, w: "detail" }); DS.shape(S, rect(x1 - 48, top + 26, 24, 140), "wood", { tone: 2, flat: true, w: "detail" }); DS.shape(S, rect(x0, top - 110, x1 - x0, 20), "wood", { tone: 1, w: "detail" }); DS.shape(S, rect(x0, top - 70, x1 - x0, 20), "wood", { tone: 1, w: "detail" }); };
// a button press: the group dips to 0.9 and comes back (no flash)
const press = (g, cx, cy, t) => { const tf = (k) => `translate(${cx} ${cy}) scale(${k}) translate(${-cx} ${-cy})`; tl.fromTo(g, { attr: { transform: tf(1) } }, { attr: { transform: tf(0.9) }, duration: 0.12, ease: "power2.in", immediateRender: false }, t); tl.to(g, { attr: { transform: tf(1) }, duration: 0.2, ease: "power2.out" }, t + 0.14); };

// Then Dave has one last idea. If he can't buy one enormous thing, he'll buy everybody on Earth a tiny thing.
{ const S = sc(47, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, DAY);
  const F = dave(S, 480, 960, "near", { s: 1.2, look: 6, mood: "happy", pose: "point" });
  bulb(S, 480, 380, 1.3, { t: W(47, 3) });
  { const g = S.grp(); globe(S, 1350, 520, 250, { parent: g }); fadeG(S, g, W(47, 15)); }
  [[1250, 430, "red"], [1400, 470, "blue"], [1330, 590, "purple"], [1460, 600, "orange"], [1220, 560, "green"], [1380, 380, "pink"]].forEach(([x, y, n], i) => { const g = S.grp(); DS.shape(S, rect(x - 22, y - 18, 44, 36), n, { w: "detail", parent: g }); S.draw(`M${x} ${y - 18} V${y + 18} M${x - 22} ${y} H${x + 22}`, S.start, 0, { c: DS.P.white[0], w: DS.w.hair, parent: g }); fadeG(S, g, W(47, 19) + i * 0.22, 0.3); });
  card(S, "A TINY THING EACH", 1350, 840, { t: W(47, 19), size: DS.type.caption });
  fin(S); }

// About eight point two billion people live on Earth.
{ const S = sc(48, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAY);
  crowdGrid(S, 160, 450, 23, 6, 72, 88, 0.85, W(48, 2), 0.4);
  countUp(S, 960, 260, 0, 8.2, W(48, 0), WE(48, 4) - W(48, 0), { size: DS.type.display, fmt: (n) => n.toFixed(1) + " BILLION", c: DS.c("red", 2), ease: "power1.out" });
  txt(S, "PEOPLE", 960, 350, { size: DS.type.title, t: W(48, 5) });
  fin(S); }

// Split a billion dollars between all of them, and everyone gets about twelve cents.
{ const S = sc(49, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAY);
  const F = dave(S, 330, 960, "near", { s: 1.15, look: 6, mood: "happy", pose: "reach" });
  bundle(S, 640, 640, 1.6, { t: W(49, 2) }); arrowR(S, 800, 640, 940, 640, W(49, 4));
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) { const x = 1050 + c * 150, gy = 620 + r * 150; mini(S, x, gy, 1.4, { t: W(49, 5), c: DS.c(OC[(r * 3 + c) % 8], 2), fill: DS.c(OC[(r * 3 + c) % 8], 1) }); coin(S, x, gy - 150, 18, null, { t: W(49, 9) + (r * 5 + c) * 0.08 }); }
  card(S, "12 CENTS EACH", 1400, 250, { t: W(49, 11), tc: "red" });
  fin(S); }

// Mum, a man called Dave just sent me twelve cents.
{ const S = sc(50, 0, { cam: "push", focus: "800 600" }); DS.room(S, ROOM);
  const K = who(S, 600, 960, "near", Object.assign({}, KID, { s: 1.35, look: 6, mood: "wow", pose: "hold" })); talk(S, K, W(50, 0), END(50));
  card(S, "KID", 330, 700, { t: W(50, 0), size: DS.type.caption });
  say(S, 700, 240, 520, 130, 620, 440, ["“MUM, A MAN CALLED DAVE", "JUST SENT ME TWELVE CENTS.”"], W(50, 0), { size: DS.type.small });
  const ph = mphone(S, 1480, 560, 1.15, { screen: "green", tone: 2 }); txt(S, "NEW PAYMENT", 1480, 420, { size: DS.type.caption, c: DS.P.white[0], t: W(50, 5) }); txt(S, "+12 CENTS", 1480, 560, { size: DS.type.small, c: DS.c("green", 1), t: W(50, 8) }); txt(S, "FROM DAVE", 1480, 650, { size: DS.type.caption, c: DS.P.white[0], t: W(50, 5) });
  fin(S, { no: true }); }

// And with eight hours left, Dave would need to make about two hundred and eighty-five thousand payments every second,
{ const S = sc(51, 0, { cam: "push", focus: "800 600" }); DS.room(S, ROOM);
  const F = dave(S, 900, 960, "near", { look: -6, mood: "worried", pose: "reach" }); sweat(S, F, W(51, 8));
  deskBlock(S, 260, 780, 790); laptopS(S, 520, 790, 280, 190);
  countUp(S, 1400, 500, 0, 285000, W(51, 9), WE(51, 15) - W(51, 9), { size: DS.type.display, c: DS.c("red", 2), ease: "power1.out" });
  txt(S, "PAYMENTS", 1400, 600, { size: DS.type.title, t: W(51, 15) }); txt(S, "EVERY SECOND", 1400, 690, { size: DS.type.small, t: W(51, 17) });
  fin(S); }

// to eight billion sets of bank details.
{ const S = sc(51, 19, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  panel(S, 880, 520, 640, 700);
  const lst = clipTo(S.grp(), rrect(580, 200, 600, 640, DS.r.md)), inner = S.grp(lst);
  for (let i = 0; i < 26; i++) txt(S, `${4000 + ((i * 7919) % 5999)} ${1000 + ((i * 4813) % 8999)} ${1000 + ((i * 3571) % 8999)}`, 880, 260 + i * 64, { parent: inner, c: DS.c("gray", 2) });
  shift(inner, W(51, 20), 4.6, [0, 0], [0, -900], "none");
  card(S, "8 BILLION SETS OF BANK DETAILS", 880, 120, { t: W(51, 19), size: DS.type.caption });
  const F = dave(S, 1560, 960, "near", { s: 1.1, look: -8, mood: "wow", pose: "head" });
  fin(S); }

// A billion dollars is enough to change one life completely. Or to change every life on Earth, by twelve cents.
{ const S = sc(52, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  S.draw(rect(950, 120, 20, 800), S.start, 0, { fill: DS.c("gray", 1), c: DS.P.ink[0], w: DS.w.hair });
  const P = person(S, 480, 960, "near", 2, { s: 1.35, mood: "happy", pose: "armsUp", look: 0 });
  cashPile(S, 220, 940, 0.4, 4, { t0: W(52, 5), dt: 0.15 }); house(S, 760, 940, 0.9, "wall", { roof: "red", t: W(52, 7) });
  card(S, "ONE LIFE", 480, 230, { t: W(52, 5) });
  { const g = S.grp(); globe(S, 1430, 520, 230, { parent: g }); fadeG(S, g, W(52, 11)); }
  [[1330, 450], [1480, 430], [1400, 560], [1540, 580], [1300, 600]].forEach(([x, y], i) => coin(S, x, y, 24, null, { t: W(52, 17) + i * 0.15 }));
  card(S, "EVERY LIFE: 12 CENTS", 1430, 230, { t: W(52, 13), tc: "red", size: DS.type.caption });
  fin(S, { no: true }); }
