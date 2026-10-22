
// ===================== 4. A hundred thousand forms =====================
const SHOW = { wall: "glass", floor: "gray", window: false };
// showroom floor: a pale turntable disc under the car
const turntable = (S, cx, cy, w) => { DS.shape(S, circ(cx, cy, w / 2, w * 0.09), "white", { flat: true, tone: 2, w: "detail" }); S.draw(circ(cx, cy, w * 0.4, w * 0.07), S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair }); };

// His first stop is a car showroom, where the whole backpack goes on the shiniest car in the building.
{ const S = sc(28, 0, { cam: "push", focus: "960 640" }); DS.room(S, SHOW);
  turntable(S, 930, 890, 900);
  car(S, 900, 880, 2.0, "red", { layer: "near" });
  S.fill(`M720 600 Q800 540 900 546 L860 600 Z`, S.start, 0, DS.P.white[0], 0.45);
  backpack(S, 1140, 690, 0.85, 1, { t: W(28, 8) }); card(S, "$100,000", 1140, 440, { t: W(28, 9), size: DS.type.small });
  const F = dave(S, 330, 960, "near", { look: 8, mood: "smile", pose: "reach" });
  const D = who(S, 1680, 960, "near", Object.assign({}, DEALER, { look: -8, pose: "cross" }));
  nameTag(S, D, "CAR DEALER", W(28, 4), { y: 880, size: DS.type.caption });
  card(S, "SHINIEST CAR", 900, 190, { t: W(28, 12) });
  fin(S); }

// At prize speed, that's under nine seconds of shopping.
{ const S = sc(28, 19, { cam: "push", focus: "960 540" }); DS.room(S, SHOW);
  const sw = stopwatch(S, 640, 540, 200, { go: W(28, 20), dur: 1.6, deg: 52 }); fadeG(S, sw, W(28, 19));
  countUp(S, 1260, 520, 0, 8.6, W(28, 20), 1.6, { size: DS.type.display, fmt: (n) => n.toFixed(1) + " S", c: DS.c("red", 2), ease: "none" });
  txt(S, "OF SHOPPING", 1260, 620, { size: DS.type.title, t: W(28, 24) });
  car(S, 1500, 960, 0.9, "red", { layer: "near", t: S.start });
  const F = dave(S, 330, 960, "near", { look: 6, mood: "flat", pose: "shrug" });
  fin(S); }

// Cash over ten thousand, son? That's a form. Every single time.
{ const S = sc(29, 0, { cam: "push", focus: "800 600" }); DS.room(S, SHOW);
  const D = who(S, 620, 960, "near", Object.assign({}, DEALER, { s: 1.5, look: 4, pose: "point" })); talk(S, D, W(29, 0), END(29));
  say(S, 1040, 270, 540, 150, 720, 560, ["“CASH OVER TEN THOUSAND, SON?", "THAT'S A FORM. EVERY TIME.”"], W(29, 0), { size: DS.type.small });
  form(S, 1560, 600, 0.95, { t: W(29, 5), stamp: "FORM" });
  nameTag(S, D, "CAR DEALER", W(29, 0), { y: 900, size: DS.type.caption });
  fin(S); }

// He's right. In America, a business that takes more than ten thousand dollars in cash
{ const S = sc(30, 0, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAY); street(S, DAY);
  house(S, 1260, 930, 1.5, "sand", { roof: "blue", layer: "near" }); card(S, "A BUSINESS", 1260, 330, { t: W(30, 4) });
  bundle(S, 390, 820, 1.3, { t: W(30, 8) }); bundle(S, 390, 750, 1.3, { t: W(30, 9) }); bundle(S, 390, 680, 1.3, { t: W(30, 10) });
  card(S, "OVER $10,000", 400, 450, { t: W(30, 8), tc: "red" });
  arrowR(S, 600, 760, 940, 760, W(30, 12));
  fin(S); }

// has to report it to the government within fifteen days.
{ const S = sc(30, 15, { cam: "push", focus: "960 600" }); DS.outdoor(S, DAY); street(S, DAY);
  house(S, 330, 930, 1.1, "sand", { roof: "blue", layer: "near" });
  columns(S, 960, 930, 0.62, "", { layer: "near" }); card(S, "GOVERNMENT", 960, 330, { t: W(30, 20), size: DS.type.caption });
  const fm = form(S, 330, 560, 0.3, { t: W(30, 16) });
  tl.fromTo(fm, { attr: { transform: "translate(0 0)" } }, { attr: { transform: "translate(630 120)" }, duration: 2.2, ease: "power1.inOut", immediateRender: false }, W(30, 17));
  const cg = calGrid(S, 1300, 250, 5, 3, 82, 72, { t: W(30, 22) });
  cg.C.forEach(([cx, cy], i) => S.fill(rect(cx - 38, cy - 33, 76, 66), W(30, 22) + 0.2 + i * 0.1, 0, DS.c("yellow", 1), 0.95));
  card(S, "15 DAYS", 1505, 540, { t: W(30, 22), tc: "red" });
  fin(S); }

// Spend a billion that way, just over ten thousand at a time, and that's nearly a hundred thousand forms.
{ const S = sc(31, 0, { cam: "push", focus: "900 560" }); DS.room(S, ROOM);
  card(S, "EVERY $10,001 = 1 FORM", 960, 190, { t: W(31, 5) });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 10; c++) form(S, 250 + c * 150 + (r % 2) * 40, 340 + r * 180, 0.26, { t: W(31, 12) + (r * 10 + c) * 0.045 });
  countUp(S, 900, 910, 0, 99990, W(31, 13), WE(31, 17) - W(31, 13), { size: DS.type.display, c: DS.c("red", 2), ease: "power1.out", fmt: (n) => Math.round(n).toLocaleString("en-US") + " FORMS" });
  const F = dave(S, 1740, 960, "near", { s: 0.95, look: -8, mood: "worried" });
  fin(S); }

// Each one asks for Dave's occupation, and he's no longer sure what to put.
{ const S = sc(32, 0, { cam: "push", focus: "800 540" }); DS.room(S, ROOM);
  form(S, 760, 520, 1.5, { occ: true });
  const F = dave(S, 1450, 960, "near", { s: 1.2, look: -6, mood: "worried", pose: "think" });
  say(S, 1450, 300, 330, 170, 1450, 560, ["WINNER?", "SHOPPER?", "???"], W(32, 7), { think: true, size: DS.type.caption });
  card(S, "OCCUPATION", 760, 130, { t: W(32, 4), tc: "red" });
  fin(S); }

// His money would be gone by midnight, and the forms would keep arriving for two weeks.
{ const S = sc(33, 0, { cam: "push", focus: "960 560" }); DS.room(S, ROOM);
  dayClock(S, 520, 500, 190, { h: 24 }); txt(S, "GONE BY MIDNIGHT", 520, 800, { size: DS.type.small, t: W(33, 4) });
  const cg = calGrid(S, 1060, 400, 7, 2, 96, 120, { t: W(33, 7) });
  cg.C.forEach(([cx, cy], i) => form(S, cx, cy, 0.2, { t: W(33, 9) + i * 0.17 }));
  txt(S, "2 WEEKS OF FORMS", 1396, 750, { size: DS.type.small, t: W(33, 12), c: DS.c("red", 2) });
  const F = dave(S, 960, 960, "near", { s: 0.95, look: 0, mood: "tired", pose: "sad" });
  fin(S, { noClock: true }); }

// By noon, Dave has spent about a hundred thousand dollars, and he still has nine hundred and ninety-nine million, nine hundred thousand left.
{ const S = sc(34, 0, { cam: "push", focus: "1000 560" }); DS.outdoor(S, DAY); street(S, DAY, { zebra: 200 });
  const F = dave(S, 460, 960, "near", { look: 8, mood: "flat", pose: "shrug" });
  backpack(S, 760, 960, 1.3, 0);
  const ph = mphone(S, 1180, 570, 1.35, {});
  txt(S, "BALANCE", 1180, 430, { size: DS.type.caption, c: DS.P.white[0], t: W(34, 3) });
  txt(S, "-$100,000", 1180, 520, { size: DS.type.small, c: DS.c("red", 1), t: W(34, 5) });
  txt(S, mon(999900000), 1180, 640, { size: DS.type.caption, c: DS.c("green", 1), t: W(34, 13) });
  fin(S); }
