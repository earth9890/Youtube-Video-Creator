
// ===================== 8. Four minutes =====================
// A wedge of a stopwatch dial: from 12 o'clock clockwise by deg
const dialWedge = (S, cx, cy, r, deg, t, name = "yellow") => { const p = arcPts(cx, cy, r * 0.92, -90, -90 + deg, 14); return S.fill(`M${cx} ${cy} ` + p.map(([x, y]) => `L${f1(x)} ${f1(y)}`).join(" ") + " Z", t, 0, DS.c(name, 1), 0.95); };

// And here's the twist. In those same four minutes, without even trying, the rest of us will spend nearly a billion dollars.
{ const S = sc(59, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, DAY); street(S, DAY);
  crowdGrid(S, 200, 760, 21, 3, 78, 88, 1.0, W(59, 11), 0.3);
  const sw = stopwatch(S, 520, 470, 150, { go: W(59, 4), dur: WE(59, 21) - W(59, 4), deg: 360 }); fadeG(S, sw, W(59, 3)); card(S, "4 MINUTES", 520, 680, { t: W(59, 4), size: DS.type.caption });
  { const pg = panel(S, 1280, 430, 700, 300, W(59, 11)); fadeG(S, pg, W(59, 11)); }
  countUp(S, 1280, 460, 0, 9e8, W(59, 11), WE(59, 21) - W(59, 11), { size: DS.type.title, fmt: mon, c: DS.c("green", 2), ease: "none" }); txt(S, "THE REST OF US", 1280, 370, { size: DS.type.caption, t: W(59, 11) });
  fin(S, { noClock: true }); }

// All the world's economies together come to about a hundred and eighteen trillion dollars a year.
{ const S = sc(60, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM);
  { const g = S.grp(); globe(S, 560, 540, 260, { parent: g }); fadeG(S, g, W(60, 2)); }
  countUp(S, 1320, 500, 0, 118, W(60, 8), WE(60, 12) - W(60, 8), { size: DS.type.display, fmt: (n) => "$" + Math.round(n), c: DS.c("green", 2), ease: "power1.out" });
  txt(S, "TRILLION", 1320, 600, { size: DS.type.title, t: W(60, 11) }); txt(S, "A YEAR", 1320, 690, { size: DS.type.title, t: W(60, 14), c: DS.c("red", 2) });
  fin(S); }

// That's nearly four million dollars every second,
{ const S = sc(61, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM);
  const sw = stopwatch(S, 540, 520, 190, { go: W(61, 4), dur: 4.0, deg: 1440 }); fadeG(S, sw, W(61, 2));
  countUp(S, 1300, 470, 0, 3750000, W(61, 1), WE(61, 4) - W(61, 1), { size: DS.type.display, fmt: (n) => "$" + (n / 1e6).toFixed(2) + " M", c: DS.c("green", 2), ease: "power1.out" });
  txt(S, "EVERY SECOND", 1300, 580, { size: DS.type.title, t: W(61, 5) });
  for (let i = 0; i < 5; i++) bundle(S, 1030 + i * 120, 760, 0.5, { t: W(61, 5) + i * 0.3 });
  fin(S); }

// or a billion about every four and a half minutes.
{ const S = sc(61, 7, { cam: "push", focus: "900 560" }); DS.room(S, ROOM);
  const sw = stopwatch(S, 640, 520, 200, { go: W(61, 11), dur: 2.4, deg: 27 }); dialWedge(S, 640, 520, 200, 27, W(61, 11));
  fadeG(S, sw, W(61, 8));
  cashPile(S, 1340, 880, 0.55, 5, { t0: W(61, 8), dt: 0.2 }); card(S, "$1 BILLION", 1340, 330, { t: W(61, 9), tc: "green" });
  txt(S, "4.5 MINUTES", 640, 840, { size: DS.type.title, t: W(61, 12), c: DS.c("red", 2) });
  fin(S); }

// Dave needed eleven and a half thousand a second, and couldn't manage it.
{ const S = sc(62, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM);
  txt(S, "DAVE: $11,574 A SECOND", 320, 310, { anchor: "start", size: DS.type.small, t: W(62, 0) });
  DS.shape(S, rect(320, 340, 14, 70), "blue", { flat: true, w: "detail" }); mini(S, 270, 410, 1.2, { c: DS.c("blue", 2), fill: DS.c("blue", 1) });
  txt(S, "EVERYONE: $3,750,000 A SECOND", 320, 560, { anchor: "start", size: DS.type.small, t: W(62, 8) });
  { const g = S.grp(); DS.shape(S, rect(320, 590, 1100, 80), "green", { w: "mid", parent: g }); fadeG(S, g, W(62, 8)); [0, 1, 2].forEach((i) => mini(S, 250 + i * 8, 670, 1.2, { c: DS.c(OC[i], 2), fill: DS.c(OC[i], 1), t: W(62, 8) })); }
  const F = dave(S, 1700, 960, "near", { s: 1.0, look: -8, mood: "worried", pose: "shrug" });
  fin(S); }

// All of us, buying bread and bus fares and haircuts,
{ const S = sc(63, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  const X = [400, 960, 1520], T = [W(63, 3), W(63, 5), W(63, 8)], L = ["BREAD", "BUS FARES", "HAIRCUTS"];
  X.forEach((x, i) => { const pg = panel(S, x, 520, 420, 440); fadeG(S, pg, T[i]); txt(S, L[i], x, 820, { size: DS.type.caption, t: T[i] }); });
  loaf(S, 400, 520, 1.1, { t: W(63, 3) }); bus(S, 960, 600, 0.4, { t: W(63, 5) }); scissors(S, 1520, 520, 1.2, { t: W(63, 8) });
  card(S, "ALL OF US", 960, 160, { t: W(63, 0) });
  fin(S); }

// spend Dave's whole prize in less time than it took him to fill one trolley.
{ const S = sc(63, 9, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  const a = stopwatch(S, 520, 480, 170, { go: W(63, 12), dur: 1.6, deg: 27 }); dialWedge(S, 520, 480, 170, 27, W(63, 12)); fadeG(S, a, W(63, 10));
  const b = stopwatch(S, 1400, 480, 170, { go: W(63, 21), dur: 1.8, deg: 120 }); dialWedge(S, 1400, 480, 170, 120, W(63, 21), "red"); fadeG(S, b, W(63, 19));
  card(S, "THE WORLD: 4.5 MIN", 520, 760, { t: W(63, 13), size: DS.type.caption }); card(S, "DAVE'S TROLLEY: 20 MIN", 1400, 760, { t: W(63, 22), size: DS.type.caption, tc: "red" });
  trolley(S, 1780, 940, 0.5, { t: W(63, 19) });
  fin(S); }

// Nobody needs ten tonnes of cash. Nobody even notices.
{ const S = sc(64, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAY); street(S, DAY);
  deskBlock(S, 1000, 1500, 780); { const g = S.grp(); DS.shape(S, rrect(1130, 700, 130, 80, DS.r.sm), "gray", { tone: 1, w: "mid", parent: g }); DS.shape(S, rect(1150, 712, 90, 34), "green", { tone: 1, flat: true, w: "hair", parent: g }); }
  const C = who(S, 1320, 960, "near", Object.assign({}, CASHIER, { look: -6, mood: "smile" }));
  deskBlock(S, 1000, 1500, 780);
  [[420, 0], [760, 1]].forEach(([x, i]) => { const P = person(S, x, 960, "near", i + 1, { mood: "smile", look: 6, armR: ARM.near }); const [hx, hy] = P.hand("R"); mphone(S, hx + 8, hy - 20, 0.2, { screen: "green", tone: 0 }); });
  card(S, "NOBODY NEEDS 10 TONNES OF CASH", 960, 190, { t: W(64, 0), size: DS.type.caption });
  card(S, "NOBODY NOTICES", 960, 300, { t: W(64, 6), size: DS.type.caption, tc: "green" });
  fin(S); }

// So the problem was never the billion. It was one person trying to spend it alone.
{ const S = sc(65, 0, { cam: "pull", focus: "960 600" }); DS.outdoor(S, DAWN, { hy: 620 });
  const F = dave(S, 960, 960, "near", { s: 1.15, look: 0, mood: "tired", pose: "stand" });
  card(S, "THE BILLION", 560, 300, { t: W(65, 4) }); tick(S, 840, 296, 1.4, W(65, 4) + 0.3);
  ringFig(S, F, W(65, 8)); card(S, "ONE PERSON, ALONE", 1380, 480, { t: W(65, 9), tc: "red" });
  fin(S); }

// So Dave makes one phone call.
{ const S = sc(66, 0, { cam: "push", focus: "900 600" }); DS.outdoor(S, DAWN); street(S, DAWN, { zebra: 1500 });
  const F = dave(S, 760, 960, "near", { s: 1.35, look: 8, mood: "determined", armR: ARM.up });
  const [hx, hy] = F.hand("R"); mphone(S, hx + 14, hy - 110, 0.5, { screen: "green", tone: 0 });
  [0, 1, 2].forEach((i) => S.draw(arc(hx + 50, hy - 120, 70 + i * 36, -55, 55), W(66, 3) + i * 0.2, 0, { c: DS.c("blue"), w: DS.w.mid }));
  fin(S); }

// He can't build a hospital in four minutes, but he can pay the people who will.
{ const S = sc(66, 6, { cam: "push", focus: "1100 560" }); DS.outdoor(S, DAWN); street(S, DAWN);
  hospital(S, 1560, 900, 0.7, { floors: 5 });
  DS.shape(S, rect(1740, 140, 22, 760), "gray", { tone: 1, flat: true, w: "detail" }); S.draw(`M1740 160 H1180`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.5 });
  const F = dave(S, 260, 960, "near", { s: 0.95, look: 8, mood: "determined", pose: "hold" });
  [980, 1180, 1370].forEach((x, i) => { worker(S, x, 960, "near", { look: -6, mood: "smile", t: W(66, 14) + i * 0.1 }); coinMove(S, [330, 700], [x, 480], W(66, 16) + i * 0.3, 1.6, 22, { stay: true }); });
  card(S, "PAY THE PEOPLE WHO WILL", 960, 200, { t: W(66, 16), size: DS.type.caption });
  fin(S); }

// At six forty-four, he sends the billion to pay for one hospital, about the size of the one in Michigan.
{ const S = sc(67, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM);
  const ph = mphone(S, 520, 540, 1.4, { screen: "navy", tone: 2 });
  txt(S, "TO: HOSPITAL", 520, 350, { size: DS.type.caption, c: DS.P.white[0], t: W(67, 8) }); txt(S, mon(1e9), 520, 450, { size: DS.type.caption, c: DS.c("green", 1), t: W(67, 4) });
  const btn = S.grp(); DS.shape(S, rrect(400, 580, 240, 90, DS.r.md), "green", { w: "detail", parent: btn }); txt(S, "SEND", 520, 640, { size: DS.type.small, c: DS.P.white[0], parent: btn });
  press(btn, 520, 625, W(67, 3));
  hospital(S, 1400, 920, 1.0, { t: W(67, 9) });
  [0, 1, 2, 3].forEach((i) => coinMove(S, [760, 560 + i * 20], [1180, 600 + i * 40], W(67, 4) + i * 0.4, 1.6, 22));
  card(S, "6:44 PM", 520, 190, { t: W(67, 0), tc: "red" });
  fin(S); }

// That's about nine hundred and twenty million. Keep the change.
{ const S = sc(68, 0, { cam: "push", focus: "800 600" }); DS.outdoor(S, DAWN); street(S, DAWN, { zebra: 1500 });
  const F = dave(S, 560, 960, "near", { s: 1.45, look: 6, mood: "smile", pose: "wave" }); talk(S, F, W(68, 0), END(68));
  say(S, 900, 250, 500, 150, 600, 520, ["“THAT'S ABOUT NINE HUNDRED", "AND TWENTY MILLION.", "KEEP THE CHANGE.”"], W(68, 0), { size: DS.type.small });
  hospital(S, 1520, 920, 0.7, { t: S.start }); card(S, "$920 MILLION", 1560, 340, { t: W(68, 2), tc: "blue" });
  fin(S); }

// The change is about eighty million dollars.
{ const S = sc(69, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  DS.shape(S, rect(330, 470, 1104, 110), "blue", { tone: 1, w: "mid" }); DS.shape(S, rect(1434, 470, 96, 110), "gold", { w: "mid" });
  txt(S, "$920 MILLION: THE HOSPITAL", 882, 540, { size: DS.type.small, c: DS.P.white[0], t: W(69, 0) });
  card(S, "THE CHANGE", 1482, 330, { t: W(69, 1), tc: "red" }); arrowR(S, 1482, 380, 1482, 450, W(69, 3));
  txt(S, "ABOUT $80 MILLION", 1482, 720, { size: DS.type.small, t: W(69, 3), c: DS.c("gold", 2) });
  txt(S, "$1 BILLION", 930, 430, { size: DS.type.caption, t: W(69, 0) });
  const F = dave(S, 330, 960, "near", { s: 1.0, look: 8, mood: "happy", pose: "hips" });
  fin(S); }
