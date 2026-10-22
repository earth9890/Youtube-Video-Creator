
// ===================== 1. One suitcase =====================
// This is Dave. Dave has packed one suitcase, because Dave is moving to the Moon.
{ const S = sc(1, 0, { cam: "push", focus: "960 640" }); land(S, { hy: 720, moon: [1470, 250, 150] });
  house(S, 360, 800, 1.5, { lit: true });
  const F = dave(S, 900, 950, "near", { s: 1.3, look: 6, mood: "happy", pose: "point" });
  card(S, "DAVE", 900, 330, { t: W(1, 2) });
  fadeG(S, suitcase(S, 1120, 950, 0.9), W(1, 6));
  DS.vignette(S, 0.2); }

// He wants somewhere quiet, with a great view, where nobody knocks on the door.
{ const S = sc(2, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  const X = [400, 960, 1520];
  X.forEach((x, i) => fadeG(S, panel(S, x, 380, 440, 440, [S.start, W(2, 3), W(2, 10)][i] ?? S.start), [S.start, W(2, 3), W(2, 10)][i]));
  const t = [W(2, 3), W(2, 6), W(2, 10)];
  { const g = S.grp(); S.fill(circ(X[0], 380, 100), t[0], 0, DS.c("night"), 1, g); S.fill(circ(X[0] + 36, 355, 84), t[0], 0, DS.c("night", 2), 1, g); S.zzz(X[0] - 40, 400, t[0], 0.9); fadeG(S, g, t[0]); card(S, "QUIET", X[0], 520, { t: t[0] }); }
  { const g = S.grp(); DS.shape(S, rrect(X[1] - 170, 230, 340, 220, DS.r.xs), "wood", { w: "detail", parent: g });
    S.fill(rect(X[1] - 150, 250, 300, 180), S.start, 0, DS.vgrad(DS.P.ink[2], DS.P.navy[2]), 1, g); stars(S, 18, X[1] - 150, 250, X[1] + 150, 430, { parent: g, big: 2 }); earth(S, X[1] + 40, 340, 52, { parent: g, night: true, nightA: 20 });
    fadeG(S, g, t[1]); card(S, "GREAT VIEW", X[1], 520, { t: t[1] }); }
  { const g = S.grp(); DS.shape(S, rrect(X[2] - 80, 230, 160, 250, DS.r.sm), "wood", { t: t[2], w: "near", parent: g }); S.fill(circ(X[2] + 44, 370, 12), t[2], 0, DS.c("gold"), 1, g);
    [[-120, 320], [-120, 380]].forEach(([dx, dy], i) => S.draw(arc(X[2] + dx, dy, 22 + i * 18, -50, 50), t[2], 0, { c: DS.c("orange"), w: DS.w.near, parent: g }));
    S.draw(line([X[2] - 120, 210], [X[2] + 120, 500], 0), t[2] + 0.3, 0, { c: DS.c("red"), w: DS.w.near * 1.4, parent: g }); card(S, "NO KNOCKING", X[2], 520, { t: t[2] }); }
  dave(S, 960, 960, "near", { s: 0.82, look: 0, mood: "smile", pose: "think" });
  DS.vignette(S, 0.2); }

// So what if you tried to live on the Moon? Not visit for an afternoon. Live there.
{ const S = sc(3, 0, { cam: "pull" }); space(S, { milky: [200, 900, 1700, 120] });
  moon(S, 960, 560, 310);
  card(S, "LIVE ON THE MOON?", 960, 150, { size: DS.type.title, t: W(3, 6) });
  const a = card(S, "VISIT", 560, 900, { t: W(3, 10) }); S.draw(line([560 - a.w / 2, 900], [560 + a.w / 2, 880], 0), W(3, 12), 0, { c: DS.c("red"), w: DS.w.near * 1.4 });
  card(S, "LIVE", 1380, 900, { t: W(3, 15), fill: "gold" }); S.draw(rrect(1380 - 130, 900 - 62, 260, 124, DS.r.md), W(3, 16), 0, { c: DS.c("green"), w: DS.w.near });
  DS.vignette(S, 0.2); }

// Twelve people have walked on the Moon, and the longest anyone has stayed is about three days.
{ const S = sc(4, 0, { cam: "push", focus: "960 640" }); const L = lunar(S, { sun: [260, 170, 46] });
  const cnt = countUp(S, 960, 330, 0, 12, W(4, 0), WE(4, 3) - W(4, 0), { size: DS.type.display, c: DS.P.white[0], ease: "none" });
  const row = S.grp(); for (let i = 0; i < 12; i++) miniAstro(S, 330 + i * 114, 880, 1.9, W(4, 0) + (i / 12) * (WE(4, 3) - W(4, 0)), { parent: row });
  txt(S, "PEOPLE ON THE MOON", 960, 410, { size: DS.type.small, c: DS.P.white[0], t: W(4, 1) });
  const T = W(4, 8); S.hide(cnt, T);
  const g = S.grp(); [0, 1, 2].forEach((i) => tile(S, 640 + i * 230, 460, 190, "DAY " + (i + 1), "yellow", T + 0.15 * i, { parent: g, size: DS.type.small }));
  fadeG(S, g, T);
  card(S, "LONGEST STAY: ABOUT 3 DAYS", 780, 250, { size: DS.type.body, t: T });
  DS.vignette(S, 0.2); }

// Dave has packed for longer.
{ const S = sc(4, 14, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  const g = S.grp(); for (let i = 0; i < 12; i++) tile(S, 160 + i * 126, 330, 104, "", i < 3 ? "gray" : "yellow", W(4, 18) + i * 0.08, { parent: g, tone: i < 3 ? 2 : 1 });
  txt(S, "3 DAYS", 338, 480, { size: DS.type.caption, c: DS.P.white[0], t: S.start });
  card(S, "PACKED FOR LONGER", 760, 190, { t: W(4, 19) });
  daveM(S, 700, 940, "near", { s: 1.3, look: 6, mood: "smile", pose: "hips" });
  fadeG(S, suitcase(S, 1000, 940, 0.9), W(4, 18));
  DS.vignette(S, 0.2); }

// Earplugs, sunscreen, a warm jumper, one bottle of water, and a packet of seeds, because every home needs a garden.
{ const S = sc(5, 0, { cam: "push", focus: "700 600" }); DS.room(S, ROOM);
  suitcase(S, 740, 940, 1.6, { open: true });
  const items = [[ITEM.earplugs, 330, 340, 1.3, 0], [ITEM.sunscreen, 520, 270, 1.1, 1], [ITEM.jumper, 760, 250, 1.1, 3], [ITEM.bottle, 980, 270, 0.9, 5], [ITEM.seeds, 1150, 350, 1.1, 10]];
  items.forEach(([fn, x, y, k, w]) => { const g = fn(S, x, y, k); fadeG(S, g, W(5, w)); shift(g, W(5, w), 0.6, [0, -60], [0, 0], "power2.out"); });
  plist(S, { x: 1350, y: 150, t: W(5, 0), big: false });
  DS.vignette(S, 0.2); }

// ... because every home needs a garden.
{ const S = sc(5, 14, { cam: "push", focus: "960 600" }); DS.room(S, ROOM);
  const sp = ITEM.seeds(S, 640, 560, 3.0, { t: T0(S) });
  pot(S, 1280, 900, 2.2, T0(S)); const sg = sprout(S, 1280, 690, 2.2, W(5, 17)); scaleY(sg, W(5, 17), 1280, 690, 1.2, 0.05);
  card(S, "EVERY HOME NEEDS A GARDEN", 960, 150, { t: W(5, 15) });
  DS.vignette(S, 0.2); }

// "One suitcase. Honestly, how hard can the Moon be?"
{ const S = sc(6, 0, { cam: "push", focus: "700 560" }); land(S, { hy: 720, moon: [1560, 220, 120] });
  const F = dave(S, 560, 960, "near", { s: 1.5, look: 4, mood: "smile", pose: "hips" }); talk(S, F, W(6, 0), END(6));
  suitcase(S, 1080, 960, 1.0);
  say(S, 1180, 400, 500, 210, 680, 500, ["ONE SUITCASE.", "HONESTLY, HOW HARD", "CAN THE MOON BE?"], W(6, 0), { size: DS.type.small });
  DS.vignette(S, 0.2); }

// By hour one, he can't hear a thing. By day four, he's broken a record.
{ const S = sc(7, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  card(S, "HOUR ONE", 560, 170, { size: DS.type.title, t: W(7, 1) });
  const F = daveM(S, 960, 940, "near", { s: 1.3, look: 0, mood: "worried", pose: "head" });
  const sp = speaker(S, 400, 760, 1.4, W(7, 4)); waves(S, 450, 760, 1.1, W(7, 4)); fadeG(S, sp, W(7, 4));
  xMark(S, 400, 760, 2.4, W(7, 6));
  F.face(W(7, 9), "happy", 0); F.setPose(W(7, 9), "armsUp");
  card(S, "DAY FOUR", 1060, 330, { size: DS.type.title, t: W(7, 9) });
  const tr = S.grp(); S.trophy(1560, 900, 1.5, W(7, 12), 0.5, { parent: tr }); fadeG(S, tr, W(7, 12)); shift(tr, W(7, 12), 0.6, [0, -80], [0, 0], "power2.out");
  DS.vignette(S, 0.2); }

// And by week two, the sun goes down for two weeks.
{ const S = sc(7, 15, { cam: "push", focus: "960 640" }); const L = lunar(S, { hy: 640, sun: [960, 560, 70] });
  card(S, "WEEK TWO", 960, 170, { size: DS.type.title, t: W(7, 16) });
  tl.fromTo(L.sunG, { y: 0 }, { y: 230, duration: WE(7, 25) - W(7, 19), ease: "power1.inOut" }, W(7, 19));
  daveM(S, 600, 940, "near", { s: 1.3, look: 5, mood: "worried", pose: "stand" });
  DS.vignette(S, 0.2); }
