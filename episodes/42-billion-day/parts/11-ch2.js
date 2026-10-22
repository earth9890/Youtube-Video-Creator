
// ===================== 2. The supermarket =====================
// a bank card (generic: no logo)
const creditCard = (S, cx, cy, k = 1, o = {}) => {
  const g = S.grp(o.parent), w = 520 * k, h = 320 * k, x0 = cx - w / 2, y0 = cy - h / 2;
  DS.drop(S, rrect(x0 + 10, y0 + 14, w, h, DS.r.md), { parent: g });
  DS.shape(S, rrect(x0, y0, w, h, DS.r.md), "navy", { w: "mid", parent: g });
  DS.shape(S, rect(x0, y0 + 50 * k, w, 54 * k), "ink", { tone: 2, flat: true, w: "hair", parent: g });
  DS.shape(S, rrect(x0 + 40 * k, y0 + 130 * k, 84 * k, 62 * k, DS.r.xs), "gold", { w: "detail", parent: g });
  S.draw(`M${x0 + 40 * k} ${y0 + 161 * k} H${x0 + 124 * k} M${x0 + 82 * k} ${y0 + 130 * k} V${y0 + 192 * k}`, S.start, 0, { c: DS.c("gold", 2), w: DS.w.hair, parent: g });
  [0, 1, 2, 3].forEach((i) => S.fill(rrect(x0 + 40 * k + i * 104 * k, y0 + 230 * k, 84 * k, 18 * k, DS.r.xs), S.start, 0, DS.P.white[0], 0.55, g));
  return fadeG(S, g, o.t);
};

// Dave starts at the only shop open at one in the morning, a twenty-four-hour supermarket.
{ const S = sc(13, 0, { cam: "push", focus: "1000 560" }); DS.outdoor(S, NIGHT); street(S, NIGHT, { zebra: 300 });
  DS.shape(S, rect(900, 250, 900, 480), "white", { layer: "mid", tone: 2, dir: "h", w: "mid" });
  DS.shape(S, rect(900, 250, 900, 80), "red", { layer: "mid", tone: 0, w: "mid" });
  txt(S, "SUPERMARKET", 1350, 312, { size: DS.type.body, c: DS.P.white[0] });
  DS.shape(S, rect(940, 400, 380, 240), "yellow", { layer: "mid", tone: 1, flat: true, w: "detail" }); DS.shape(S, rect(1400, 400, 360, 330), "yellow", { layer: "mid", tone: 1, flat: true, w: "detail" });
  S.draw(`M1580 400 V730`, S.start, 0, { c: DS.P.ink[0], w: DS.w.detail });
  S.fill(circ(1350, 520, 460, 260), S.start, 0, DS.c("yellow", 1), 0.14);
  card(S, "OPEN 24 HOURS", 1130, 180, { t: W(13, 12), tc: "green" });
  const F = dave(S, 300, 960, "near", { look: 8, mood: "flat" }); F.walk(W(13, 0), 3.8, { x: 460 });
  fin(S); }

// The trouble is, nothing here costs eleven thousand dollars. The priciest thing on the shelves is a forty-dollar cheese.
{ const S = sc(14, 0, { cam: "push", focus: "1000 600" }); DS.room(S, STORE);
  shelves(S, 420, 170, 1080, 500); striplight(S, 960, 96, 700);
  [["$2", 560, 430], ["$3", 800, 430], ["$5", 1040, 430], ["$8", 1280, 430]].forEach(([s, x, y], i) => card(S, s, x, y, { t: W(14, 1) + i * 0.15, size: DS.type.caption, r: "sm" }));
  card(S, "NEED $11,000", 960, 170, { t: W(14, 3), tc: "red" }); xMark(S, 960, 330, 1.6, W(14, 7));
  DS.shape(S, rect(1300, 800, 420, 36), "wood", { tone: 1, w: "mid" }); DS.shape(S, rect(1330, 836, 40, 124), "wood", { tone: 2, flat: true, w: "detail" }); DS.shape(S, rect(1650, 836, 40, 124), "wood", { tone: 2, flat: true, w: "detail" });
  cheese(S, 1510, 760, 1.5, { t: W(14, 16) }); priceTag(S, 1200, 740, "$40", { t: W(14, 17) });
  S.draw(circ(1510, 730, 190, 120), W(14, 18), 0, { c: DS.c("red"), w: DS.w.near });
  const F = dave(S, 560, 960, "near", { look: 8, mood: "worried", pose: "point" });
  fin(S); }

// He fills a trolley with the most expensive things he can find,
{ const S = sc(15, 0, { cam: "push", focus: "1000 600" }); DS.room(S, STORE);
  shelves(S, 300, 170, 1300, 500, { rows: 3 }); striplight(S, 960, 96, 800);
  const F = dave(S, 700, 960, "near", { look: 6, mood: "determined", pose: "push" });
  trolley(S, 1020, 960, 1.45);
  cheese(S, 960, 650, 0.6, { t: W(15, 6) }); cheese(S, 1100, 640, 0.6, { t: W(15, 7) });
  { const g = S.grp(); DS.shape(S, rrect(1000, 560, 40, 120, DS.r.sm), "green", { tone: 2, w: "detail", parent: g }); DS.shape(S, rect(1012, 530, 16, 40), "green", { tone: 2, w: "detail", parent: g }); fadeG(S, g, W(15, 7)); }
  { const g = S.grp(); DS.shape(S, rrect(1170, 610, 120, 60, DS.r.md), "red", { tone: 1, w: "detail", parent: g }); DS.shape(S, circ(1230, 640, 14), "pink", { w: "hair", parent: g }); fadeG(S, g, W(15, 8)); }
  { const g = S.grp(); DS.shape(S, rrect(1260, 590, 110, 80, DS.r.sm), "gold", { w: "detail", parent: g }); fadeG(S, g, W(15, 9)); }
  card(S, "MOST EXPENSIVE", 900, 120, { t: W(15, 5) });
  fin(S); }

// and twenty minutes later he has spent about four hundred dollars.
{ const S = sc(15, 12, { cam: "push", focus: "900 560" }); DS.room(S, STORE);
  receipt(S, 560, 130, 560, 520, [["CHEESE", "$40"], ["CHEESE", "$40"], ["STEAK", "$60"], ["WINE", "$120"], ["LOBSTER", "$140"]], { t: S.start });
  { const g = S.grp(); S.draw(line([588, 470], [1092, 470], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g }); txt(S, "TOTAL", 588, 540, { anchor: "start", size: DS.type.small, parent: g }); txt(S, "$400", 1092, 540, { anchor: "end", size: DS.type.small, c: DS.c("red", 2), t: W(15, 19), parent: g }); }
  const F = dave(S, 1450, 960, "near", { look: -8, mood: "wow", pose: "head" });
  bag(S, 1180, 950, 1.3, "orange"); bag(S, 1700, 960, 1.2, "purple");
  card(S, "20 MINUTES", 1450, 560, { t: W(15, 13), size: DS.type.caption });
  fin(S); }

// In those twenty minutes, he was supposed to spend nearly fourteen million.
{ const S = sc(16, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM);
  DS.shape(S, rect(560, 860, 700, 18), "wood", { tone: 1, w: "detail" });
  DS.shape(S, rect(660, 852, 90, 8), "green", { w: "detail" }); DS.shape(S, rect(1000, 300, 90, 560), "red", { w: "mid" });
  card(S, "SPENT $400", 705, 780, { t: W(16, 0), size: DS.type.caption }); card(S, "$14 MILLION", 1045, 240, { t: W(16, 5), tc: "red" });
  { const g = S.grp(); S.draw(`M1130 300 L1130 850`, S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: g }); S.draw(`M1100 330 L1130 290 L1160 330 M1100 820 L1130 860 L1160 820`, S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: g }); fadeG(S, g, W(16, 9)); }
  const F = dave(S, 1560, 960, "near", { look: -8, mood: "worried", pose: "think" });
  fin(S); }

// Then there's his credit card. It has a five-thousand-dollar limit, which at prize speed lasts less than half a second.
{ const S = sc(17, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM);
  const cc = creditCard(S, 640, 450, 1.0);
  txt(S, "LIMIT", 640, 700, { size: DS.type.small, t: W(17, 5), c: DS.c("navy", 2) }); txt(S, "$5,000", 640, 800, { size: DS.type.title, t: W(17, 7), c: DS.c("red", 2) });
  const sw = stopwatch(S, 1330, 530, 170, { go: W(17, 13), dur: 0.5, deg: 6 }); fadeG(S, sw, W(17, 10));
  txt(S, "0.4 SECONDS", 1330, 800, { size: DS.type.title, t: W(17, 14), c: DS.c("red", 2) });
  const F = dave(S, 1730, 960, "near", { s: 0.95, look: -8, mood: "flat", pose: "shrug" });
  fin(S); }

// Fine. I'll take the whole thing in cash.
{ const S = sc(18, 0, { cam: "push", focus: "800 580" }); DS.outdoor(S, NIGHT); street(S, NIGHT, { zebra: 1500 });
  const F = dave(S, 640, 960, "near", { s: 1.45, look: 4, mood: "determined", pose: "point" }); talk(S, F, W(18, 0), END(18));
  say(S, 1000, 300, 500, 150, 700, 600, ["“FINE. I'LL TAKE THE WHOLE", "THING IN CASH.”"], W(18, 0), { size: DS.type.small });
  note(S, 1500, 560, 1.7, { t: W(18, 6), val: "100" }); bundle(S, 1430, 760, 1.3, { t: W(18, 7) }); bundle(S, 1620, 790, 1.3, { t: W(18, 7) + 0.15 });
  fin(S); }

// But the bank doesn't open until nine, and by then, more than a third of Dave's day is gone.
{ const S = sc(19, 0, { cam: "push", focus: "1100 600" }); DS.outdoor(S, DAWN); street(S, DAWN, { zebra: 200 });
  columns(S, 1250, 960, 1.0, "BANK", { layer: "mid" });
  card(S, "OPENS 9 AM", 1250, 800, { t: W(19, 4), tc: "red", size: DS.type.caption });
  const F = dave(S, 640, 960, "near", { look: 6, mood: "tired", pose: "cross" });
  card(S, "A THIRD GONE", 700, 450, { t: W(19, 11), tc: "red", size: DS.type.caption });
  fin(S); }
