
// ===================== 7. Under the Moon =====================
// the Moon in cross-section: black sky + fixed Earth above, grey regolith at the surface line sy, dark rock below. o.sun [x, y, r]
const cutaway = (S, o = {}) => { DS.setHaze("night");
  const sy = o.sy ?? 560, g = S.grp(); S.g.insertBefore(g, S.g.firstChild); const f = (d, fill, op = 1) => S.fill(d, S.start, 0, fill, op, g);
  f(rect(-200, -200, 2320, 1480), DS.vgrad(DS.P.ink[2], DS.mix(DS.P.navy[2], DS.P.ink[2], 0.4)));
  const sky = S.grp(g); stars(S, 70, -100, -100, 2020, sy, { parent: sky, big: 3 });
  const sunG = o.sun ? sun(S, o.sun[0], o.sun[1], o.sun[2] ?? 46, { parent: sky }) : null;
  if (o.earth !== false) earth(S, EX, EY, ER, { night: true, nightA: 20, parent: g });
  f(`M-200 ${sy} H2120 V1280 H-200 Z`, DS.vgrad(DS.c("gray", 2), DS.mix(DS.c("gray", 2), DS.P.ink[2], 0.7)));
  f(`M-200 ${sy} Q300 ${sy - 14} 800 ${sy} T1700 ${sy} T2120 ${sy} V${sy + 46} H-200 Z`, DS.vgrad(DS.c("gray", 1), DS.c("gray", 0)));
  for (let i = 0; i < 60; i++) f(circ(rnd() * 1920, sy + 60 + rnd() * (1080 - sy - 60), 3 + rnd() * 9, 2 + rnd() * 5), rnd() > 0.5 ? DS.c("gray", 1) : DS.P.ink[0], 0.22);
  S.draw(`M-200 ${sy} Q300 ${sy - 14} 800 ${sy} T1700 ${sy} T2120 ${sy}`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: g });
  return { g, sy, sunG, f }; };
// a dark hollow in the rock (cavity / tunnel / pit); d is any closed path
const hollow = (S, d, o = {}) => { const g = S.grp(o.parent); S.fill(d, o.t ?? S.start, 0, DS.vgrad(DS.P.ink[1], DS.P.ink[2]), 1, g); S.draw(d, o.t ?? S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: g }); return g; };
const habitat = (S, x, gy, k, t, parent) => { const g = S.grp(parent); DS.shape(S, `M${x - 120 * k} ${gy} V${gy - 70 * k} Q${x - 120 * k} ${gy - 170 * k} ${x} ${gy - 170 * k} Q${x + 120 * k} ${gy - 170 * k} ${x + 120 * k} ${gy - 70 * k} V${gy} Z`, "white", { t, w: "near", parent: g }); DS.shape(S, rrect(x - 26 * k, gy - 70 * k, 52 * k, 70 * k, DS.r.xs), "gray", { t, w: "detail", parent: g }); S.fill(circ(x + 60 * k, gy - 100 * k, 18 * k), t ?? S.start, 0, DS.c("sky"), 1, g); return g; };
const snowflake = (S, x, y, k, t, parent) => { const g = S.grp(parent); [0, 1, 2].forEach((i) => { const a = i * Math.PI / 3; S.draw(line([x - Math.cos(a) * 70 * k, y - Math.sin(a) * 70 * k], [x + Math.cos(a) * 70 * k, y + Math.sin(a) * 70 * k], 0), t ?? S.start, 0, { c: DS.c("sky", 2), w: DS.w.near, parent: g }); }); return g; };
const orbiter = (S, x, y, k, parent) => { const g = S.grp(parent); [-1, 1].forEach((sd) => { DS.shape(S, rect(x + sd * 150 * k - 70 * k, y - 36 * k, 140 * k, 72 * k), "blue", { w: "mid", parent: g }); for (let i = 1; i < 4; i++) S.draw(line([x + sd * 150 * k - 70 * k + i * 35 * k, y - 36 * k], [x + sd * 150 * k - 70 * k + i * 35 * k, y + 36 * k], 0), S.start, 0, { c: DS.c("sky", 1), w: DS.w.hair, parent: g }); }); S.draw(line([x - 80 * k, y], [x + 80 * k, y], 0), S.start, 0, { c: DS.P.ink[0], w: DS.w.mid, parent: g }); DS.shape(S, rrect(x - 60 * k, y - 50 * k, 120 * k, 100 * k, DS.r.sm), "gold", { w: "near", parent: g }); S.draw(arc(x, y - 56 * k, 36 * k, 180, 360, 24 * k), S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: g }); return g; };

// Air, water and food. Dave can live on the Moon.
{ const S = sc(55, 0, { cam: "push", focus: "960 540" }); lunar(S, { sun: [260, 170, 46] });
  const X = [500, 960, 1420], t = [W(55, 5), W(55, 6), W(55, 8)];
  X.forEach((x, i) => { const pg = panel(S, x, 480, 380, 400, t[i]); fadeG(S, pg, t[i]); });
  { const g = S.grp(); dial(S, X[0], 500, 110, -40, 40, S.start, { parent: g, dur: 0.01 }); fadeG(S, g, t[0]); card(S, "AIR", X[0], 330, { t: t[0], size: DS.type.small }); tick(S, X[0] + 130, 380, 1.6, t[0] + 0.3); }
  { const g = S.grp(); ITEM.bottle(S, X[1], 510, 1.5, { parent: g }); fadeG(S, g, t[1]); card(S, "WATER", X[1], 330, { t: t[1], size: DS.type.small }); tick(S, X[1] + 130, 380, 1.6, t[1] + 0.3); }
  { const g = S.grp(); bowl(S, X[2], 520, 1.0, undefined, { parent: g }); fadeG(S, g, t[2]); card(S, "FOOD", X[2], 330, { t: t[2], size: DS.type.small }); tick(S, X[2] + 130, 380, 1.6, t[2] + 0.3); }
  daveM(S, 960, 960, "near", { s: 0.85, look: 0, mood: "happy", pose: "hips" });
  card(S, "DAVE CAN LIVE ON THE MOON", 860, 150, { t: W(55, 9), size: DS.type.small });
  DS.vignette(S, 0.2); }

// Well, not quite. Not on it, anyway. Look at Dave's problems: the heat, the cold, the radiation, the dust.
{ const S = sc(56, 0, { cam: "push", focus: "960 540" }); space(S);
  const X = [340, 780, 1220, 1660], t = [W(56, 11), W(56, 13), W(56, 15), W(56, 17)], lb = ["THE HEAT", "THE COLD", "THE RADIATION", "THE DUST"];
  card(S, "NOT QUITE", 960, 150, { t: W(56, 0), size: DS.type.title, tc: "red" });
  X.forEach((x, i) => { const pg = panel(S, x, 520, 400, 460, t[i]); fadeG(S, pg, t[i]); card(S, lb[i], x, 700, { t: t[i], size: DS.type.caption }); });
  { const g = S.grp(); sun(S, X[0], 500, 60, { parent: g }); fadeG(S, g, t[0]); }
  snowflake(S, X[1], 500, 1.4, t[1]);
  { const g = S.grp(); [[-80, -90], [0, -100], [80, -90]].forEach(([dx, dy], i) => S.arrow(X[2] + dx, 400 + dy + 20, X[2] + dx * 0.3, 580, t[2] + i * 0.1, 0.3, { c: DS.c("sky", 2), w: DS.w.near, parent: g })); }
  { const g = dustCloud(S, X[3], 500, 0.8, undefined); fadeG(S, g, t[3]); }
  DS.vignette(S, 0.2); }

// They all live on the surface.
{ const S = sc(56, 19, { cam: "push", focus: "960 600" }); const C = cutaway(S, { sy: 640 });
  [[400, 0], [800, 1], [1200, 2], [1600, 3]].forEach(([x, i], k) => { const t = W(56, 20) + k * 0.05; if (i === 0) { const g = S.grp(); sun(S, x, 520, 38, { parent: g }); } if (i === 1) snowflake(S, x, 540, 0.9); if (i === 2) { [-40, 0, 40].forEach((dx) => S.arrow(x + dx, 440, x + dx * 0.4, 600, S.start, 0.3, { c: DS.c("sky", 2), w: DS.w.near })); } if (i === 3) dustCloud(S, x, 560, 0.55); });
  const rg = S.draw(`M-100 612 H2020 V700 H-100 Z`, W(56, 21), 0, { c: DS.c("red"), w: DS.w.near * 1.4 }); dashed(rg, 0.02, 0.012);
  card(S, "ALL ON THE SURFACE", 800, 200, { t: W(56, 21), size: DS.type.title });
  daveM(S, 960, 624, "near", { s: 0.45, look: 0, mood: "worried", pose: "stand" });
  DS.vignette(S, 0.2); }

// So the best home on the Moon might not be on the Moon. It might be in it.
{ const S = sc(57, 0, { cam: "push", focus: "960 640" }); const C = cutaway(S, { sy: 560 });
  hollow(S, `M900 640 Q900 600 960 600 H1480 Q1540 600 1540 650 V860 Q1540 900 1480 900 H960 Q900 900 900 860 Z`);
  const hb = S.grp(); habitat(S, 1200, 560, 1.2, undefined, hb); const q = txt(S, "?", 1200, 360, { size: DS.type.display, c: DS.P.white[0], t: W(57, 4) });
  card(S, "NOT ON THE MOON", 600, 300, { t: W(57, 6), size: DS.type.small, tc: "red" });
  tl.to(hb, { y: 270, duration: 1.4, ease: "power2.inOut" }, W(57, 13)); S.hide(q, W(57, 13));
  card(S, "IN IT", 1500, 430, { t: W(57, 15), size: DS.type.title });
  DS.vignette(S, 0.2); }

// "I came all this way to live in a hole?" Yes, Dave. A very good hole.
{ const S = sc(58, 0, { cam: "push", focus: "800 600" }); lunar(S, { sun: [260, 170, 46] });
  const F = daveM(S, 560, 960, "near", { s: 1.5, look: 6, mood: "angry", pose: "armsUp" }); talk(S, F, W(58, 0), END(58));
  S.fill(circ(1330, 900, 330, 66), S.start, 0, DS.P.ink[2], 1); S.draw(arc(1330, 900, 330, 0, 180, 66), S.start, 0, { c: DS.P.ink[0], w: DS.w.near });
  const sb = say(S, 1250, 380, 520, 190, 700, 500, ["I CAME ALL THIS WAY", "TO LIVE IN A HOLE?"], W(58, 0), { size: DS.type.small }); tl.to(sb, { opacity: 0, duration: 0.4 }, W(59, 0));
  F.face(W(59, 0), "flat", 6); F.setPose(W(59, 0), "shrug");
  const sg = S.grp(); S.draw(line([1640, 940], [1640, 560], 0), S.start, 0, { c: DS.c("wood", 2), w: DS.w.near * 1.6, parent: sg }); DS.shape(S, rrect(1420, 400, 440, 180, DS.r.sm), "wood", { w: "near", parent: sg }); txt(S, "A VERY GOOD", 1640, 470, { size: DS.type.caption, c: DS.P.white[0], t: W(59, 2), parent: sg }); txt(S, "HOLE", 1640, 540, { size: DS.type.small, c: DS.c("gold"), t: W(59, 3), parent: sg }); fadeG(S, sg, W(59, 2));
  DS.vignette(S, 0.2); }

// In two thousand nine, a Japanese orbiter confirmed the first pit in the Moon.
{ const S = sc(59, 6, { cam: "pull" }); space(S, { milky: [200, 900, 1700, 120] });
  moon(S, 960, 1300, 820, { glow: false }); S.fill(circ(1000, 520, 70, 22), S.start, 0, DS.P.ink[2], 1); S.draw(circ(1000, 520, 70, 22), S.start, 0, { c: DS.P.ink[0], w: DS.w.near });
  const ob = orbiter(S, 520, 250, 0.9); fadeG(S, ob, W(59, 8));
  dashed(S.draw(`M560 290 L930 510 M600 290 L1070 510`, W(59, 12), 0, { c: DS.c("yellow", 1), w: DS.w.mid, op: 0.8 }), 0.03, 0.02);
  card(S, "2009", 960, 150, { t: W(59, 7), size: DS.type.title }); card(S, "JAPANESE ORBITER", 520, 420, { t: W(59, 10), size: DS.type.caption }); card(S, "THE FIRST PIT", 1320, 560, { t: W(59, 15), size: DS.type.small });
  DS.vignette(S, 0.2); }

// Today we know of more than two hundred.
{ const S = sc(59, 20, { cam: "push", focus: "960 540" }); space(S);
  moon(S, 960, 560, 400, { glow: false }); const cp = clipG(S, circ(960, 560, 396));
  for (let i = 0; i < 220; i++) { const a = rnd() * 6.28, r = Math.sqrt(rnd()) * 380, d = S.fill(circ(960 + Math.cos(a) * r, 560 + Math.sin(a) * r, 6, 6), W(59, 21) + (i / 220) * (W(59, 26) - W(59, 21)), 0, DS.P.ink[0], 0.9, cp); }
  countUp(S, 1560, 540, 0, 200, W(59, 21), W(59, 26) - W(59, 21), { size: DS.type.display, c: DS.P.white[0], fmt: (n) => Math.round(n) + "+", ease: "none" });
  card(S, "PITS ON THE MOON", 1560, 700, { t: W(59, 22), size: DS.type.small });
  DS.vignette(S, 0.2); }

// Some are probably skylights into lava tubes, tunnels where rivers of molten rock once flowed.
{ const S = sc(60, 0, { cam: "push", focus: "960 640" }); const C = cutaway(S, { sy: 520 });
  hollow(S, `M180 760 Q180 700 260 700 H1660 Q1740 700 1740 760 V800 Q1740 850 1660 850 H260 Q180 850 180 800 Z`);
  const sh = S.grp(); S.fill(`M900 520 H1020 V705 H900 Z`, S.start, 0, DS.P.ink[2], 1, sh); S.draw(`M900 520 V705 M1020 520 V705`, S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: sh });
  S.fill(`M900 520 H1020 L1180 850 H760 Z`, W(60, 3), 0, DS.c("yellow", 1), 0.25);
  card(S, "A SKYLIGHT", 640, 400, { t: W(60, 3), size: DS.type.body }); S.arrow(800, 440, 900, 560, W(60, 4), 0.3, { c: DS.P.white[0], w: DS.w.near });
  card(S, "LAVA TUBE", 1380, 930, { t: W(60, 5), size: DS.type.body });
  const lv = S.grp(); S.fill(`M190 770 H1730 V840 H190 Z`, S.start, 0, DS.c("orange"), 1, lv); growX(lv, W(60, 8), 190, 800, 1.6, "power1.inOut"); tl.to(lv, { opacity: 0, duration: 1.4 }, W(60, 13)); fadeG(S, lv, W(60, 8));
  DS.vignette(S, 0.2); }

// In twenty twenty-four, a team in Italy reread old radar data and found a cave
{ const S = sc(61, 0, { cam: "push", focus: "960 540" }); DS.room(S, labRoom);
  sci(S, 420, 960, "near", { s: 1.4, look: 5, mood: "smile", pose: "point" }); sci2(S, 760, 960, "near", { s: 1.4, look: 5, mood: "smile", pose: "hold" });
  card(S, "2024", 960, 170, { t: W(61, 1), size: DS.type.title }); card(S, "ITALIAN TEAM", 590, 380, { t: W(61, 5), size: DS.type.small });
  const pg = S.grp(); paperR(S, 1200, 330, 520, 480, { parent: pg }); [0, 1, 2, 3, 4].forEach((i) => S.draw(smooth([[1230, 400 + i * 80], [1330, 370 + i * 80], [1430, 430 + i * 80], [1540, 390 + i * 80], [1690, 410 + i * 80]]), S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: pg })); fadeG(S, pg, W(61, 7));
  card(S, "OLD RADAR DATA", 1460, 880, { t: W(61, 8), size: DS.type.small });
  DS.vignette(S, 0.2); }

// ... and found a cave stretching tens of metres beyond the bottom of one pit. Nobody knows how far it goes.
{ const S = sc(61, 11, { cam: "push", focus: "960 640" }); const C = cutaway(S, { sy: 480 });
  hollow(S, `M560 480 H700 V760 H560 Z`);
  const cv = hollow(S, `M700 700 Q700 660 760 660 H1580 Q1660 660 1660 740 Q1660 820 1580 820 H760 Q700 820 700 780 Z`); tl.fromTo(cv, { opacity: 0.1 }, { opacity: 1, duration: 1.2 }, W(61, 13));
  card(S, "A CAVE", 1220, 590, { t: W(61, 13), size: DS.type.title });
  S.arrow(720, 880, 1650, 880, W(61, 15), 0.8, { c: DS.P.white[0], w: DS.w.near }); S.arrow(1650, 880, 720, 880, W(61, 15), 0.8, { c: DS.P.white[0], w: DS.w.near }); card(S, "TENS OF METRES", 1180, 930, { t: W(61, 16), size: DS.type.small });
  card(S, "THE PIT", 640, 340, { t: W(61, 22), size: DS.type.small });
  const ds = S.grp(); S.draw(`M1660 660 H1900 M1660 820 H1900`, W(62, 2), 0, { c: DS.c("gray", 1), w: DS.w.near, parent: ds }); dashed(ds.firstChild, 0.03, 0.03);
  txt(S, "?", 1800, 790, { size: DS.type.display, c: DS.P.white[0], t: W(62, 3) });
  card(S, "NOBODY KNOWS HOW FAR", 760, 230, { t: W(62, 1), size: DS.type.body });
  DS.vignette(S, 0.2); }

// It could run for kilometres under the Sea of Tranquillity.
{ const S = sc(62, 6, { cam: "push", focus: "960 560" }); space(S, { milky: [200, 900, 1700, 120] });
  moon(S, 960, 560, 340, { glow: false }); const cp = clipG(S, circ(960, 560, 336));
  S.fill(circ(1050, 470, 170, 120), W(62, 12), 0, DS.c("brown", 1), 0.55, cp);
  S.fill(circ(1000, 480, 10), W(62, 12), 0, DS.c("red"), 1);
  dashed(S.draw(smooth([[1000, 480], [1070, 520], [1150, 500], [1230, 540]]), W(62, 8), 0, { c: DS.c("yellow"), w: DS.w.near * 1.4 }), 0.03, 0.025);
  card(S, "KILOMETRES?", 1500, 700, { t: W(62, 8), size: DS.type.body }); card(S, "SEA OF TRANQUILLITY", 1450, 330, { t: W(62, 12), size: DS.type.small }); S.arrow(1330, 380, 1130, 460, W(62, 13), 0.4, { c: DS.P.white[0], w: DS.w.near });
  DS.vignette(S, 0.2); }

// Two years earlier, a University of California team studied that same pit.
{ const S = sc(63, 0, { cam: "push", focus: "960 540" }); DS.room(S, labRoom);
  sci2(S, 420, 960, "near", { s: 1.4, look: 5, mood: "smile", pose: "point" });
  const sc1 = screen(S, 1280, 500, 720, 440, S.start, { fill: "orange", tone: 0 }); S.fill(circ(1280, 500, 110), S.start, 0, DS.c("sky", 2), 1); S.draw(circ(1280, 500, 110), S.start, 0, { c: DS.P.ink[0], w: DS.w.near });
  card(S, "2022", 960, 170, { t: W(63, 0), size: DS.type.title }); card(S, "CALIFORNIA TEAM", 420, 380, { t: W(63, 4), size: DS.type.small }); card(S, "THE SAME PIT", 1280, 860, { t: W(63, 9), size: DS.type.small });
  DS.vignette(S, 0.2); }

// In the shade under its overhang, it stays at about seventeen degrees Celsius. All day, all night, all month.
{ const S = sc(64, 0, { cam: "push", focus: "960 640" }); const C = cutaway(S, { sy: 520, sun: [200, 150, 46] });
  tl.fromTo(C.sunG, { x: 0 }, { x: 900, duration: S.len, ease: "none" }, S.start);
  hollow(S, `M620 520 H780 V700 Q780 720 800 720 H1700 Q1760 720 1760 780 V860 Q1760 900 1700 900 H800 Q620 900 620 800 Z`);
  const th = thermo(S, 1330, 880, 130, "green", W(64, 8)); level(th, S.start, 0.01, 1, 1);
  card(S, "ABOUT 17°C", 1330, 620, { t: W(64, 9), size: DS.type.title, tc: "green" }); card(S, "IN THE SHADE", 1050, 760, { t: W(64, 3), size: DS.type.caption });
  ["ALL DAY", "ALL NIGHT", "ALL MONTH"].forEach((s, i) => card(S, s, 330, 660 + i * 110, { t: W(64, 13 + i), size: DS.type.small }));
  DS.vignette(S, 0.2); }

// The university called it sweater weather.
{ const S = sc(65, 0, { cam: "push", focus: "960 540" }); DS.room(S, labRoom);
  const pg = S.grp(); paperR(S, 560, 180, 800, 700, { parent: pg }); txt(S, "SWEATER", 960, 330, { size: DS.type.display, t: W(65, 4), parent: pg }); txt(S, "WEATHER", 960, 450, { size: DS.type.display, t: W(65, 5), parent: pg });
  lines(S, 640, 520, 640, 3, S.start, 44, pg); ITEM.jumper(S, 960, 720, 1.4, { parent: pg, t: W(65, 4) });
  card(S, "THE UNIVERSITY", 960, 130, { t: W(65, 1), size: DS.type.small });
  DS.vignette(S, 0.2); }

// Dave would call it jumper weather.
{ const S = sc(65, 6, { cam: "push", focus: "960 640" }); const C = cutaway(S, { sy: 440 });
  hollow(S, `M300 440 H520 V480 Q520 500 600 500 H1600 Q1700 500 1700 600 V920 Q1700 980 1600 980 H500 Q300 980 300 800 Z`);
  plist(S, { x: 100, y: 120, crossed: [0, 1, 3, 4], cross: [], tick: [[2, W(65, 9)]], t: S.start });
  const F = daveM(S, 1000, 960, "near", { s: 1.1, look: 0, mood: "happy", pose: "hips", helmet: false, pack: false }); jumper(S, F);
  const th = thermo(S, 1500, 960, 220, "green", S.start); level(th, S.start, 0.01, 1, 1); card(S, "17°C", 1500, 700, { t: S.start, size: DS.type.body, tc: "green" });
  card(S, "JUMPER WEATHER", 1000, 290, { t: W(65, 8), size: DS.type.title });
  DS.vignette(S, 0.2); }

// A roof of rock also gives some protection from cosmic rays and tiny meteorites.
{ const S = sc(66, 0, { cam: "push", focus: "960 640" }); const C = cutaway(S, { sy: 400 });
  hollow(S, `M300 620 Q300 580 380 580 H1540 Q1620 580 1620 620 V900 Q1620 960 1540 960 H380 Q300 960 300 900 Z`);
  [[400, -20, 700, 420], [700, -20, 1000, 420], [1000, -20, 1300, 420], [1300, -20, 1600, 420], [160, 120, 420, 420]].forEach(([a, b, c, d], i) => ray(S, a, b, c, d, W(66, 8) + i * 0.1, { delay: i * 0.4, dur: 1.8 }));
  [[560, 360], [1200, 340]].forEach(([x, y], i) => { const m = S.fill(circ(x, y - 260, 12, 10), W(66, 11), 0, DS.c("gray", 1), 1); tl.fromTo(m, { y: 0 }, { y: 250, duration: 1.4, ease: "power2.in", repeat: 3, repeatDelay: 0.6 }, W(66, 11) + i * 0.7); });
  daveM(S, 960, 960, "near", { s: 0.9, look: 0, mood: "smile", pose: "stand", helmet: false, pack: false });
  card(S, "A ROOF OF ROCK", 800, 270, { t: W(66, 1), size: DS.type.title }); card(S, "SOME PROTECTION", 1450, 520, { t: W(66, 5), size: DS.type.small });
  DS.vignette(S, 0.2); }

// Remember the tip, to cover your home with Moon soil? The Moon already did it.
{ const S = sc(66, 14, { cam: "push", focus: "960 640" }); const C = cutaway(S, { sy: 400 });
  hollow(S, `M300 620 Q300 580 380 580 H1540 Q1620 580 1620 620 V900 Q1620 960 1540 960 H380 Q300 960 300 900 Z`);
  daveM(S, 960, 960, "near", { s: 0.9, look: 0, mood: "smile", pose: "stand", helmet: false, pack: false });
  card(S, "COVER YOUR HOME WITH MOON SOIL", 760, 190, { t: W(66, 15), size: DS.type.small });
  const rg = S.draw(`M220 420 H1700 V580 H220 Z`, W(66, 24), 0, { c: DS.c("green"), w: DS.w.near * 1.4 }); dashed(rg, 0.02, 0.012);
  card(S, "THE MOON ALREADY DID IT", 960, 500, { t: W(66, 24), size: DS.type.title, tc: "green" }); tick(S, 1680, 500, 2, W(66, 26));
  DS.vignette(S, 0.2); }
