
// ===================== 3. Day one =====================
// But a day on the Moon isn't really a day.
{ const S = sc(16, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  const F = daveM(S, 600, 940, "near", { s: 1.3, look: 5, mood: "worried", pose: "think" });
  say(S, 1100, 330, 300, 180, 760, 560, [], W(16, 1), { think: true });
  const ck = S.clock(1100, 330, 96, W(16, 1), 0.01, { h: 12, m: 0 }); card(S, "24 HOURS", 1100, 520, { t: W(16, 2), size: DS.type.small });
  xMark(S, 1100, 330, 3.2, W(16, 6));
  DS.vignette(S, 0.2); }

// From one sunrise to the next takes about twenty-nine and a half Earth days.
{ const S = sc(16, 10, { cam: "none" }); const L = lunar(S, { hy: 700, sun: [300, 640, 60] });
  tl.fromTo(L.sunG, { y: 190 }, { y: 0, duration: 1.8, ease: "power1.out" }, W(16, 10));
  dashed(S.draw(circ(1640, 640, 60), W(16, 14), 0, { c: DS.c("yellow"), w: DS.w.mid }), 0.05, 0.03);
  S.arrow(380, 800, 1560, 800, W(16, 14), 0.5, { c: DS.P.white[0], w: DS.w.near });
  card(S, "SUNRISE", 300, 470, { t: W(16, 11), size: DS.type.caption }); card(S, "NEXT SUNRISE", 1640, 470, { t: W(16, 14), size: DS.type.caption });
  countUp(S, 960, 330, 0, 29.5, W(16, 17), WE(16, 22) - W(16, 17), { size: DS.type.display, c: DS.P.white[0], fmt: (n) => n.toFixed(1) + " DAYS", ease: "none" });
  DS.vignette(S, 0.2); }

// That's about two weeks of sun, then two weeks of night.
{ const S = sc(17, 0, { cam: "push", focus: "960 540" }); space(S, { milky: [200, 900, 1700, 120] });
  const a = S.grp(), b = S.grp();
  DS.shape(S, rrect(200, 440, 760, 220, DS.r.md), "yellow", { w: "near", parent: a }); sun(S, 580, 550, 56, { parent: a }); growX(a, W(17, 2), 200, 550, 0.9);
  DS.shape(S, rrect(960, 440, 760, 220, DS.r.md), "navy", { w: "near", parent: b }); stars(S, 26, 990, 460, 1690, 640, { parent: b, big: 2 }); moon(S, 1340, 550, 54, { parent: b, glow: false }); growX(b, W(17, 7), 960, 550, 0.9);
  card(S, "ABOUT 2 WEEKS OF SUN", 580, 330, { t: W(17, 2), size: DS.type.small }); card(S, "ABOUT 2 WEEKS OF NIGHT", 1340, 330, { t: W(17, 7), size: DS.type.small });
  txt(S, "ONE LUNAR DAY", 960, 780, { size: DS.type.body, c: DS.P.white[0], t: W(17, 9) }); S.arrow(220, 720, 1700, 720, W(17, 9), 0.6, { c: DS.P.white[0], w: DS.w.near });
  DS.vignette(S, 0.2); }

// Dave's first day on the Moon will last a month.
{ const S = sc(17, 11, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  const g = S.grp(); for (let i = 0; i < 30; i++) tile(S, 150 + i * 56, 360, 48, "", i < 15 ? "yellow" : "navy", W(17, 17) + i * 0.05, { parent: g, tone: i < 15 ? 0 : 1 });
  card(S, "ONE DAY = ONE MONTH", 760, 220, { t: W(17, 14), size: DS.type.body });
  const F = daveM(S, 760, 940, "near", { s: 1.3, look: 0, mood: "wow", pose: "head" });
  suitcase(S, 1100, 940, 0.9);
  DS.vignette(S, 0.2); }

// With no air to spread the heat around, the ground near the equator heats up to over a hundred and twenty degrees Celsius. Hotter than boiling water.
{ const S = sc(18, 0, { cam: "push", focus: "960 640" }); const L = lunar(S, { hy: 700, sun: [760, 150, 70] });
  const ar = S.grp(); [[560, 800], [760, 860], [960, 800]].forEach(([x, y], i) => S.arrow(760 + (x - 760) * 0.2, 250, x, y - 90, W(18, 5) + i * 0.15, 0.4, { c: DS.c("orange"), w: DS.w.near, parent: ar }));
  const nac = card(S, "NO AIR TO SPREAD THE HEAT", 700, 370, { t: W(18, 1), size: DS.type.small });
  const gl = S.fill(circ(760, 940, 560, 70), W(18, 8), 0.6, DS.c("orange"), 0.35);
  const th = thermo(S, 1500, 930, 520, "red", W(18, 8)); level(th, W(18, 13), WE(18, 20) - W(18, 13), 0.08, 0.92);
  card(S, "OVER 120°C", 1500, 372, { t: W(18, 18), size: DS.type.body, tc: "red" });
  const F = daveM(S, 420, 940, "near", { s: 1.3, look: 5, mood: "worried", pose: "stand" }); sweat(S, F, W(18, 10)); tl.to(F.all, { opacity: 0, duration: 0.4 }, W(18, 23) - 0.1);
  const kg = S.grp(); kettle(S, 420, 930, 1.9, undefined, kg); fadeG(S, kg, W(18, 23)); const sm = S.grp(); steam(S, 380, 600, 1.4, W(18, 23), sm); fadeG(S, sm, W(18, 23));
  card(S, "BOILING WATER: 100°C", 420, 330, { t: W(18, 24), size: DS.type.small }); S.hide(nac.g, W(18, 23));
  dashed(S.draw(line([1300, 930 - 520 * 100 / 130], [1740, 930 - 520 * 100 / 130], 0), W(18, 25), 0, { c: DS.P.white[0], w: DS.w.mid }), 0.04, 0.03);
  DS.vignette(S, 0.2); }

// Dave puts on his sunscreen. He is very thorough about it. But sunscreen is for sunburn.
{ const S = sc(19, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  const F = daveM(S, 760, 940, "near", { s: 1.5, look: 4, mood: "smile", pose: "stand" });
  const sc1 = ITEM.sunscreen(S, 1350, 700, 2.2, { t: T0(S) });
  const k = F.s, cr = (d, t) => S.draw(d, t, 0, { c: DS.P.white[0], w: DS.w.near * 1.5, parent: F.g });
  cr(line([F.cx - 24 * k, F.sh[1] + 24 * k], [F.cx + 24 * k, F.sh[1] + 70 * k], 0), W(19, 3));
  const ls = [[F.cx - 30 * k, F.sh[1] + 30 * k, F.cx - 48 * k, F.sh[1] + 100 * k], [F.cx - 20 * k, F.hip[1], F.cx - 30 * k, F.gy - 20 * k], [F.cx + 20 * k, F.hip[1], F.cx + 30 * k, F.gy - 20 * k], [F.cx + 30 * k, F.sh[1] + 30 * k, F.cx + 48 * k, F.sh[1] + 100 * k]];
  ls.forEach(([a, b, c, d], i) => cr(line([a, b], [c, d], 0), W(19, 6) + i * 0.3));
  [[-26, 60, 26, 100], [-26, 100, 26, 140], [-22, 140, 22, 170]].forEach(([a, b, c, d], i) => cr(line([F.cx + a * k, F.sh[1] + b * k - 40 * k], [F.cx + c * k, F.sh[1] + d * k - 40 * k], 0), W(19, 7) + i * 0.3));
  card(S, "SPF 50", 1100, 600, { t: W(19, 4), size: DS.type.caption });
  plist(S, { x: 100, y: 240, cross: [[1, W(20, 3)]], t: W(20, 1) });
  const sh = S.grp(); S.draw(arc(760, 620, 330, 200, 340, 150), W(20, 1), 0, { c: DS.c("orange"), w: DS.w.near * 1.4, parent: sh });
  [600, 760, 920].forEach((x, i) => S.arrow(x, 130, x, 250, W(20, 1) + i * 0.1, 0.3, { c: DS.c("yellow"), w: DS.w.near, parent: sh }));
  card(S, "SUNBURN: BLOCKED", 1330, 400, { t: W(20, 3), size: DS.type.small }); tick(S, 1640, 400, 1.6, W(20, 4));
  DS.vignette(S, 0.2); }

// The real danger is invisible: cosmic rays, particles from deep space.
{ const S = sc(20, 5, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  [[300, -40, 700, 940], [520, -40, 920, 940], [760, -40, 1160, 940], [1000, -40, 1400, 940], [1240, -40, 1640, 940], [60, 80, 420, 940]].forEach(([a, b, c, d], i) => ray(S, a, b, c, d, W(20, 9) + i * 0.1, { delay: i * 0.4 }));
  daveM(S, 900, 940, "near", { s: 1.3, look: 0, mood: "flat", pose: "stand" });
  card(S, "INVISIBLE", 700, 190, { t: W(20, 9), size: DS.type.title }); card(S, "COSMIC RAYS FROM DEEP SPACE", 960, 330, { t: W(20, 10), size: DS.type.small });
  DS.vignette(S, 0.2); }

// On Earth, our thick air and our magnetic field protect us. The Moon has neither.
{ const S = sc(21, 0, { cam: "push", focus: "960 560" }); space(S, { milky: [200, 900, 1700, 120] });
  earth(S, 480, 560, 170);
  S.fill(circ(480, 560, 216), S.start, 0, DS.glow(DS.P.sky[0], 0.55), 1);
  [0, 1, 2].forEach((i) => { const r = 250 + i * 60; S.draw(`M480 ${560 - r * 1.15} C${480 + r * 1.6} ${560 - r * 0.9} ${480 + r * 1.6} ${560 + r * 0.9} 480 ${560 + r * 1.15}`, W(21, 6) + i * 0.15, 0, { c: DS.c("orange"), w: DS.w.mid }); S.draw(`M480 ${560 - r * 1.15} C${480 - r * 1.6} ${560 - r * 0.9} ${480 - r * 1.6} ${560 + r * 0.9} 480 ${560 + r * 1.15}`, W(21, 6) + i * 0.15, 0, { c: DS.c("orange"), w: DS.w.mid }); });
  [[1000, 300, 800, 420], [1020, 560, 820, 560], [1000, 820, 800, 700]].forEach(([a, b, c, d], i) => S.arrow(a, b, c, d, W(21, 8) + i * 0.15, 0.4, { c: DS.P.white[0], w: DS.w.near, bend: i === 1 ? 0 : (i === 0 ? -0.25 : 0.25) }));
  card(S, "THICK AIR", 480, 880, { t: W(21, 3), size: DS.type.small }); card(S, "MAGNETIC FIELD", 480, 160, { t: W(21, 6), size: DS.type.small });
  const mg = S.grp(); moon(S, 1480, 600, 200, { glow: false, parent: mg }); fadeG(S, mg, W(21, 11));
  [[1260, -20, 1320, 400], [1480, -20, 1480, 390], [1700, -20, 1640, 400], [1130, 120, 1330, 470], [1830, 120, 1630, 470]].forEach(([a, b, c, d], i) => ray(S, a, b, c, d, W(21, 11) + i * 0.1, { delay: i * 0.3, dur: 1.8 }));
  const a = card(S, "NO AIR", 1380, 880, { t: W(21, 13), size: DS.type.body }); xMark(S, 1380 - a.w / 2 - 30, 880, 1.2, W(21, 13));
  const b = card(S, "NO MAGNETIC FIELD", 1500, 160, { t: W(21, 14), size: DS.type.small }); xMark(S, 1500 - b.w / 2 - 30, 160, 1.2, W(21, 14));
  DS.vignette(S, 0.2); }

// In twenty nineteen, a Chinese lander took the first proper radiation measurements on the Moon's surface.
{ const S = sc(22, 0, { cam: "push", focus: "700 700" }); lunar(S, { sun: [260, 170, 46] });
  lander(S, 560, 900, 1.5);
  const bx = S.grp(); DS.shape(S, rrect(1010, 730, 220, 170, DS.r.sm), "gray", { tone: 1, w: "near", parent: bx }); dial(S, 1120, 800, 56, -60, 40, W(22, 7), { parent: bx, dur: 1.6 }); fadeG(S, bx, W(22, 5));
  S.draw(line([840, 780], [1010, 800], 0), W(22, 5), 0, { c: DS.P.ink[0], w: DS.w.mid });
  card(S, "2019", 560, 190, { t: W(22, 1), size: DS.type.title }); card(S, "FIRST MEASUREMENTS ON THE SURFACE", 1060, 330, { t: W(22, 8), size: DS.type.small });
  DS.vignette(S, 0.2); }

// That's about two hundred times the dose you'd get on the ground on Earth, and nearly twice the dose inside the Space Station.
{ const S = sc(23, 0, { cam: "push", focus: "960 600" }); space(S);
  const base = 840, X = [420, 960, 1500], Hh = [6, 235, 440], nm = ["green", "orange", "red"];
  S.draw(line([240, base], [1680, base], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
  const bar = (i, t) => { const g = S.grp(); DS.shape(S, rect(X[i] - 100, base - Hh[i], 200, Hh[i]), nm[i], { w: "near", parent: g }); fadeG(S, g, t); scaleY(g, t, X[i], base, 0.7, 0.02); };
  bar(2, S.start); bar(0, W(23, 9)); bar(1, W(23, 18));
  card(S, "MOON SURFACE", X[2], 900 - 20, { t: S.start, size: DS.type.caption }); card(S, "EARTH'S GROUND", X[0], 900 - 20, { t: W(23, 9), size: DS.type.caption }); card(S, "SPACE STATION", X[1], 900 - 20, { t: W(23, 19), size: DS.type.caption });
  card(S, "ABOUT 200 × MORE THAN EARTH'S GROUND", 960, 160, { t: W(23, 2), size: DS.type.small });
  card(S, "NEARLY 2 × THE STATION", 1500, 310, { t: W(23, 14), size: DS.type.small, tc: "red" });
  DS.vignette(S, 0.2); }

// You can't feel it. But over a long stay, it raises the risk of cancer.
{ const S = sc(24, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  [[500, -40, 860, 940], [760, -40, 1120, 940], [1020, -40, 1380, 940]].forEach(([a, b, c, d], i) => ray(S, a, b, c, d, S.start, { delay: i * 0.5 }));
  daveM(S, 700, 940, "near", { s: 1.3, look: 0, mood: "flat", pose: "stand" });
  card(S, "CAN'T FEEL IT", 700, 200, { t: W(24, 1), size: DS.type.body });
  const gp = S.grp(); DS.shape(S, rrect(1650, 330, 100, 520, DS.r.md), "white", { flat: true, w: "near", parent: gp }); const fl = S.grp(gp); S.fill(rrect(1662, 342, 76, 496, DS.r.sm), S.start, 0, DS.c("red"), 1, fl); fadeG(S, gp, W(24, 5));
  scaleY(fl, W(24, 6), 1700, 838, WE(24, 14) - W(24, 6), 0.06, 0.62);
  card(S, "RISK", 1700, 270, { t: W(24, 5), size: DS.type.small }); card(S, "OVER A LONG STAY", 1560, 900, { t: W(24, 5), size: DS.type.caption });
  DS.vignette(S, 0.2); }

// The scientists who built the detector had a tip: cover your home with a thick layer of Moon soil.
{ const S = sc(25, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM2);
  const F = sci(S, 420, 960, "near", { s: 1.2, look: 5, mood: "smile", pose: "point" }); talk(S, F, W(25, 8), WE(25, 18));
  card(S, "DETECTOR TEAM", 420, 380, { t: W(25, 1), size: DS.type.caption });
  panel(S, 1340, 450, 640, 520, S.start);
  const hs = S.grp(); DS.shape(S, rect(1130, 520, 220, 150), "gray", { tone: 1, w: "near", parent: hs }); DS.shape(S, rrect(1190, 560, 100, 110, DS.r.xs), "wood", { w: "detail", parent: hs });
  S.draw(line([1100, 670], [1560, 670], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.near });
  const mg = S.grp(); mound(S, 1240, 670, 380, 220, "earth", undefined, mg); S.draw(line([1100, 670], [1560, 670], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.near, parent: mg }); fadeG(S, mg, W(25, 14)); scaleY(mg, W(25, 14), 1240, 670, 1.1, 0.05);
  say(S, 880, 250, 380, 150, 600, 450, ["COVER YOUR HOME", "WITH A THICK LAYER", "OF MOON SOIL"], W(25, 8), { size: DS.type.caption });
  DS.vignette(S, 0.2); }

// Dave's home is a suitcase.
{ const S = sc(25, 19, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  suitcase(S, 1000, 940, 1.1); mound(S, 1000, 780, 240, 80, "gray", W(25, 22));
  card(S, "HOME", 1000, 560, { t: W(25, 22), size: DS.type.title });
  daveM(S, 600, 940, "near", { s: 1.4, look: 6, mood: "flat", pose: "stand" });
  DS.vignette(S, 0.2); }
