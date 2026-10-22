
// ===================== 9. Gone to work =====================
// So what would happen if you had to spend a billion dollars in a day?
{ const S = sc(70, 0, { cam: "push", focus: "960 540" });
  question(S, W(70, 9), W(70, 13), { mood: "smile", pose: "hips" });
  fin(S, { no: true }); }

// Shopping, you'd lose. You'd run out of seconds somewhere under ten tonnes of cash and a hundred thousand forms.
{ const S = sc(71, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM);
  cashPile(S, 380, 920, 0.95, 5, { t0: W(71, 8), dt: 0.2 }); stack(S, 1520, 940, 320, 26, "white", { h: 22, t0: W(71, 14), dt: 0.07 }); stack(S, 1790, 940, 260, 18, "white", { h: 22, t0: W(71, 14) + 0.3, dt: 0.07 });
  const F = dave(S, 960, 960, "near", { look: 0, mood: "worried", pose: "head" }); sweat(S, F, W(71, 3));
  dayClock(S, 960, 300, 130, { h: 24, t: W(71, 3) });
  card(S, "10 TONNES", 380, 330, { t: W(71, 9), tc: "green" }); card(S, "100,000 FORMS", 1560, 330, { t: W(71, 15), tc: "red", size: DS.type.caption });
  fin(S, { no: true }); }

// The only way is to pay lots of people at once, and then something odd happens. The money doesn't disappear.
{ const S = sc(72, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, DAY); street(S, DAY);
  const F = dave(S, 330, 960, "near", { s: 1.15, look: 6, mood: "determined", armR: ARM.up });
  const [hx, hy] = F.hand("R"); mphone(S, hx + 10, hy - 90, 0.4, { screen: "green", tone: 0 });
  const P = [[820, 700], [1120, 700], [1420, 700], [820, 930], [1120, 930], [1420, 930]];
  P.forEach(([x, gy], i) => { person(S, x, gy, "mid", i, { s: 1.15, mood: "smile", look: -5, t: W(72, 5) + i * 0.15 }); coinMove(S, [hx + 20, hy - 170], [x + 40, gy - 150], W(72, 6) + i * 0.3, 1.3, 20, { stay: true }); });
  card(S, "THE MONEY DOESN'T DISAPPEAR", 1100, 170, { t: W(72, 16), size: DS.type.caption, tc: "green" });
  fin(S, { no: true }); }

// Economics textbooks put it in one line: one person's spending is another person's income.
{ const S = sc(73, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  DS.drop(S, rrect(264, 150, 1400, 300, DS.r.md)); DS.shape(S, rrect(250, 134, 1420, 300, DS.r.md), "red", { tone: 2, w: "mid" });
  DS.shape(S, rect(266, 150, 690, 268), "white", { flat: true, w: "detail" }); DS.shape(S, rect(964, 150, 690, 268), "white", { flat: true, w: "detail" });
  txt(S, "ONE PERSON'S SPENDING", 610, 270, { size: DS.type.caption, t: W(73, 7) }); txt(S, "IS ANOTHER PERSON'S", 1310, 250, { size: DS.type.caption, t: W(73, 9) }); txt(S, "INCOME", 1310, 330, { size: DS.type.small, t: W(73, 12), c: DS.c("green", 2) });
  txt(S, "ECONOMICS", 610, 200, { size: DS.type.caption, t: W(73, 0), c: DS.c("gray", 2) });
  person(S, 520, 960, "near", 0, { s: 1.2, mood: "smile", pose: "reach", look: 6 }); person(S, 1400, 960, "near", 3, { s: 1.2, mood: "happy", pose: "stand", look: -6 });
  card(S, "SPENDING", 520, 480, { t: W(73, 8), tc: "red", size: DS.type.caption }); card(S, "INCOME", 1400, 480, { t: W(73, 12), tc: "green", size: DS.type.caption });
  coinMove(S, [620, 790], [1300, 790], W(73, 9), 1.6, 28, { stay: true });
  fin(S, { no: true }); }

// Builders and electricians get paid, and so do the people who make the steel and the glass.
{ const S = sc(74, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAY); street(S, DAY);
  const X = [360, 760, 1160, 1560], T = [W(74, 0), W(74, 2), W(74, 12), W(74, 15)];
  X.forEach((x, i) => { worker(S, x, 960, "near", { look: i % 2 ? -5 : 5, mood: "smile", hat: ["yellow", "orange", "red", "blue"][i], t: T[i] }); coin(S, x, 540, 34, "$", { t: T[i] + 0.3 }); });
  { const g = S.grp(); [0, 1, 2].forEach((c) => [0, 1].forEach((r) => DS.shape(S, rect(250 + c * 60 + (r ? 30 : 0), 790 - r * 36, 56, 32), "red", { tone: 1, w: "detail", parent: g }))); fadeG(S, g, T[0]); }
  { const g = S.grp(); DS.shape(S, `M690 740 L640 800 H700 L680 860 L780 780 H720 L760 740 Z`, "yellow", { w: "detail", parent: g }); fadeG(S, g, T[1]); }
  { const g = S.grp(); DS.shape(S, `M1070 780 H1250 V800 H1180 V870 H1140 V800 H1070 Z`, "gray", { w: "detail", parent: g }); fadeG(S, g, T[2]); }
  { const g = S.grp(); DS.shape(S, rect(1470, 740, 120, 150), "glass", { flat: true, w: "mid", parent: g }); S.draw(`M1490 860 L1560 760`, S.start, 0, { c: DS.P.white[0], w: DS.w.near, parent: g }); fadeG(S, g, T[3]); }
  fin(S, { no: true }); }

// Then their wages go on rent, food and haircuts.
{ const S = sc(75, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const F = worker(S, 480, 960, "near", { look: 6, mood: "happy", pose: "reach" });
  const X = [1000, 1360, 1720], T = [W(75, 4), W(75, 5), W(75, 7)], L = ["RENT", "FOOD", "HAIRCUTS"];
  house(S, 1000, 640, 0.9, "wall", { roof: "red", t: T[0] }); loaf(S, 1360, 560, 0.9, { t: T[1] }); scissors(S, 1720, 540, 1.0, { t: T[2] });
  X.forEach((x, i) => { txt(S, L[i], x, 780, { size: DS.type.caption, t: T[i] }); coinMove(S, [560, 620], [x, 460 + i * 20], T[i], 1.4, 22, { stay: true }); });
  fin(S, { no: true }); }

// And one day, a hospital that size needs about nineteen hundred staff.
{ const S = sc(76, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAY, { hy: 700 });
  hospital(S, 560, 920, 0.95);
  for (let i = 0; i < 8; i++) doctor(S, 1020 + (i % 4) * 150 + (i > 3 ? 70 : 0), i > 3 ? 780 : 960, i > 3 ? "mid" : "near", i, { s: i > 3 ? 1.2 : 1.1, mood: "smile", look: -5, t: W(76, 6) + i * 0.15 });
  countUp(S, 1370, 250, 0, 1900, W(76, 6), WE(76, 10) - W(76, 6), { size: DS.type.display, c: DS.c("red", 2), ease: "power1.out" }); txt(S, "STAFF", 1370, 340, { size: DS.type.title, t: W(76, 10) });
  fin(S, { no: true }); }

// Even Dave's four hundred dollars of shopping paid part of a cashier's wages.
{ const S = sc(77, 0, { cam: "push", focus: "1000 600" }); DS.room(S, STORE);
  const D = dave(S, 330, 960, "near", { look: 8, mood: "smile", pose: "hold" }); bag(S, 560, 950, 1.2, "orange");
  const C = who(S, 1180, 960, "near", Object.assign({}, CASHIER, { look: -6, mood: "smile" })); deskBlock(S, 860, 1500, 790);
  receipt(S, 700, 140, 300, 300, [["TOTAL", "$400"]], { t: W(77, 2) });
  coinMove(S, [880, 300], [1190, 790], W(77, 7), 1.6, 26, { stay: true });
  card(S, "A CASHIER'S WAGES", 1300, 230, { t: W(77, 9), size: DS.type.caption });
  fin(S, { no: true }); }

// She buys lunch. The café pays its baker. The baker buys flour.
{ const S = sc(77, 13, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const X = [330, 780, 1230, 1680];
  X.forEach((x, i) => fadeG(S, panel(S, x, 520, 340, 420), i ? W(77, [14, 17, 22][i - 1]) : undefined));
  who(S, 330, 740, "near", Object.assign({}, CASHIER, { s: 0.95, look: 4, mood: "smile" })); cup(S, 780, 520, 1.2, { t: W(77, 16) });
  const B = who(S, 1230, 740, "near", Object.assign({}, BAKER, { s: 0.95, look: -4, mood: "smile", t: W(77, 19) })); chefhat(S, B); sack(S, 1680, 540, 1.4, { t: W(77, 22) });
  [["CASHIER", 0, 13], ["CAFE", 1, 16], ["BAKER", 2, 19], ["FLOUR", 3, 23]].forEach(([s, i, w]) => txt(S, s, X[i], 800, { size: DS.type.caption, t: W(77, w) }));
  [[0, 14], [1, 17], [2, 22]].forEach(([i, w]) => { arrowR(S, X[i] + 190, 520, X[i + 1] - 190, 520, W(77, w)); coinMove(S, [X[i] + 190, 520], [X[i + 1] - 190, 520], W(77, w) + 0.3, 1.2, 20); });
  fin(S, { no: true }); }

// A hundred-dollar note lasts about twenty-four years, going from hand to hand to hand.
{ const S = sc(78, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAY); street(S, DAY);
  const xs = [300, 620, 940, 1260, 1580, 1800]; xs.forEach((x, i) => person(S, x, 960, "near", i, { s: 1.0, mood: "smile", look: i % 2 ? -5 : 5, pose: i < 5 ? "reach" : "stand" }));
  const nt = note(S, 300, 640, 0.6, { t: W(78, 0) });
  for (let i = 0; i < 5; i++) { const t0 = W(78, 7) + i * 0.62; tl.to(nt, { attr: { transform: `translate(${xs[i + 1] - 300} 0)` }, duration: 0.55, ease: "power1.inOut" }, t0); }
  nt.setAttribute("transform", "translate(0 0)");
  { const pg = panel(S, 960, 330, 640, 190, W(78, 3)); fadeG(S, pg, W(78, 3)); }
  countUp(S, 960, 360, 0, 24, W(78, 3), WE(78, 5) - W(78, 3), { size: DS.type.display, fmt: (n) => Math.round(n) + " YEARS", c: DS.c("red", 2), ease: "power1.out" });
  fin(S, { no: true }); }

// How much each dollar adds to the whole economy is still argued about.
{ const S = sc(79, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  person(S, 560, 960, "near", 0, { s: 1.3, specs: true, tieC: "navy", mood: "angry", pose: "point", look: 6 }); person(S, 1360, 960, "near", 1, { s: 1.3, specs: true, tieC: "red", mood: "angry", pose: "pointL", look: -6 });
  coin(S, 960, 560, 90, "$1", { t: W(79, 0) });
  say(S, 560, 330, 150, 110, 560, 580, ["!"], W(79, 8), { size: DS.type.title }); say(S, 1360, 330, 150, 110, 1360, 580, ["?"], W(79, 9), { size: DS.type.title });
  card(S, "STILL ARGUED ABOUT", 960, 160, { t: W(79, 8), size: DS.type.caption });
  fin(S, { no: true }); }

// When America's Congressional Budget Office estimated it for government purchases,
{ const S = sc(80, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, DAY); street(S, DAY);
  columns(S, 560, 940, 0.95, "", { layer: "near" }); card(S, "BUDGET OFFICE", 560, 320, { t: W(80, 2), size: DS.type.small });
  { const pg = panel(S, 1420, 520, 560, 500); fadeG(S, pg, W(80, 4)); [[1230, 90], [1330, 190], [1430, 140], [1530, 250], [1630, 170]].forEach(([x, h], i) => { const g = S.grp(); DS.shape(S, rect(x - 36, 700 - h, 72, h), ["blue", "green", "orange", "purple", "red"][i], { flat: true, tone: 1, w: "detail", parent: g }); fadeG(S, g, W(80, 4) + i * 0.2); }); }
  card(S, "ESTIMATE", 1420, 330, { t: W(80, 4), size: DS.type.caption }); card(S, "GOVERNMENT PURCHASES", 1420, 820, { t: W(80, 7), size: DS.type.caption });
  fin(S, { no: true }); }

// it gave a range from fifty cents to two dollars fifty.
{ const S = sc(80, 10, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  const ux = (v) => 300 + v * 440;
  S.draw(`M${ux(0)} 600 H${ux(3)}`, S.start, 0, { c: DS.c("ink"), w: DS.w.near });
  [0, 1, 2, 3].forEach((v) => { S.draw(`M${ux(v)} 570 V630`, S.start, 0, { c: DS.c("ink"), w: DS.w.mid }); txt(S, "$" + v, ux(v), 700, { size: DS.type.caption }); });
  { const g = S.grp(); DS.shape(S, rect(ux(0.5), 580, ux(2.5) - ux(0.5), 40), "yellow", { w: "mid", parent: g }); fadeG(S, g, W(80, 14)); }
  card(S, "$0.50", ux(0.5), 480, { t: W(80, 14), tc: "red" }); card(S, "$2.50", ux(2.5), 480, { t: W(80, 17), tc: "green" });
  card(S, "FOR EVERY $1 SPENT", 960, 200, { t: W(80, 10), size: DS.type.caption });
  fin(S, { no: true }); }

// It depends on who gets the money, and what they do with it next.
{ const S = sc(81, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  person(S, 330, 960, "near", 2, { s: 1.15, mood: "smile", pose: "reach", look: 6 }); coin(S, 330, 460, 30, null, { t: W(81, 0) });
  arrowR(S, 480, 560, 860, 360, W(81, 4)); arrowR(S, 480, 640, 860, 820, W(81, 4) + 0.2);
  { const g = S.grp(); DS.shape(S, rrect(900, 250, 200, 220, DS.r.md), "glass", { w: "mid", parent: g }); [0, 1, 2].forEach((i) => coin(S, 1000, 440 - i * 40, 36, null, { parent: g })); fadeG(S, g, W(81, 4) + 0.3); }
  card(S, "SAVES IT", 1000, 190, { t: W(81, 4) + 0.3, tc: "gray", size: DS.type.caption });
  house(S, 1000, 940, 0.9, "sand", { roof: "blue", t: W(81, 8) }); card(S, "SPENDS IT", 1000, 690, { t: W(81, 8), tc: "green", size: DS.type.caption });
  arrowR(S, 1220, 820, 1480, 820, W(81, 10)); person(S, 1640, 960, "near", 4, { s: 1.15, mood: "happy", pose: "reach", look: -6, t: W(81, 11) }); coin(S, 1640, 560, 30, null, { t: W(81, 12) });
  fin(S, { no: true }); }

// What nobody says is that the money vanishes.
{ const S = sc(82, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM);
  [[460, 0], [960, 1], [1460, 2]].forEach(([x, i]) => person(S, x, 960, "near", i, { s: 1.2, specs: true, tieC: ["navy", "red", "gold"][i], mood: "flat", pose: "shrug", look: i - 1 }));
  { const g = S.grp(); S.thought(960, 360, 560, 190, 960, 640, S.start, 0.3, { parent: g }); txt(S, "THE MONEY VANISHES", 960, 380, { size: DS.type.small, parent: g, c: DS.c("gray", 2) }); fadeG(S, g, W(82, 4)); }
  xMark(S, 960, 360, 4.4, W(82, 0) + 0.3);
  stamp(S, 960, 160, "NOBODY SAYS THIS", W(82, 0), "red", { size: DS.type.body });
  fin(S, { no: true }); }

// Dave still loves spending money. It just turns out a billion takes a lot of help.
{ const S = sc(83, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAWN); street(S, DAWN);
  worker(S, 300, 960, "near", { look: 6, mood: "smile", t: W(83, 6) }); who(S, 620, 960, "near", Object.assign({}, CASHIER, { look: 6, mood: "smile", t: W(83, 8) })); const bk = who(S, 1300, 960, "near", Object.assign({}, BAKER, { look: -6, mood: "smile", t: W(83, 10) })); chefhat(S, bk); doctor(S, 1640, 960, "near", 0, { look: -6, mood: "smile", t: W(83, 12) });
  const F = dave(S, 960, 960, "near", { s: 1.3, look: 0, mood: "happy", pose: "armsUp" });
  [[860, 400], [1060, 380]].forEach(([x, y], i) => heartP(S, x, y, 1.0, W(83, 2) + i * 0.3));
  card(S, "A LOT OF HELP", 960, 200, { t: W(83, 10), tc: "green" });
  fin(S, { no: true }); }

// At midnight, Dave's phone says zero, and nothing vanishes.
{ const S = sc(84, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, NIGHT); street(S, NIGHT, { zebra: 1500 });
  S.fill(circ(960, 560, 700, 380), S.start, 0, DS.c("yellow", 1), 0.08);
  const F = dave(S, 700, 960, "near", { s: 1.2, look: 6, mood: "smile", armR: ARM.up });
  const [hx, hy] = F.hand("R"); mphone(S, hx + 24, hy - 130, 0.62, { screen: "navy", tone: 2 });
  txt(S, "$0", hx + 24, hy - 120, { size: DS.type.title, c: DS.c("red", 1), t: W(84, 3) });
  stamp(S, 1380, 520, "NOTHING VANISHES", W(84, 6), "green", { size: DS.type.body });
  fin(S, { noMoney: false }); }

// His billion just went to work.
{ const S = sc(85, 0, { cam: "pull", focus: "960 560" }); DS.outdoor(S, DAWN); street(S, DAWN);
  const F = dave(S, 260, 960, "near", { s: 1.1, look: 6, mood: "happy", armR: ARM.up });
  const [hx, hy] = F.hand("R"); mphone(S, hx + 20, hy - 110, 0.5, { screen: "navy", tone: 2 });
  const T = [[720, 700, 0], [980, 760, 1], [1240, 700, 2], [1500, 760, 3], [1760, 700, 4], [880, 940, 5], [1380, 940, 6]];
  T.forEach(([x, gy, i], k) => { const P = i % 3 === 0 ? worker(S, x, gy, "mid", { s: 1.1, look: -5, mood: "smile", t: W(85, 0) + 0.4 + k * 0.1 }) : i % 3 === 1 ? who(S, x, gy, "mid", Object.assign({}, CASHIER, { s: 1.1, mood: "smile", t: W(85, 0) + 0.4 + k * 0.1 })) : (() => { const B = who(S, x, gy, "mid", Object.assign({}, BAKER, { s: 1.1, mood: "smile", t: W(85, 0) + 0.4 + k * 0.1 })); chefhat(S, B); return B; })();
    coinMove(S, [hx + 20, hy - 150], [x + 30, gy - 190], W(85, 0) + 0.6 + k * 0.28, 2.2, 18, { stay: true }); });
  card(S, "WENT TO WORK", 960, 200, { t: W(85, 3), tc: "green" });
  DS.vignette(S); }
