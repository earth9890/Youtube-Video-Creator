
// ===================== 4. Day four: the dust =====================
const grain = (S, x, y, k, t, o = {}) => { const g = S.grp(o.parent), pts = [[-90, -20], [-50, -80], [-10, -50], [30, -96], [70, -40], [96, 10], [50, 70], [0, 40], [-40, 84], [-84, 40]];
  if (o.round) DS.shape(S, circ(x, y, 74 * k, 70 * k), o.name || "gray", { t, w: "near", parent: g });
  else DS.shape(S, poly(pts.map(([a, b]) => [x + a * k, y + b * k]), 0) + " Z", o.name || "gray", { t, w: "near", parent: g });
  return g; };
const shard = (S, x, y, k, rot, t, parent) => { const g = S.grp(parent);
  DS.shape(S, `M${x} ${y - 120 * k} L${x + 44 * k} ${y + 60 * k} L${x - 36 * k} ${y + 46 * k} Z`, "glass", { t, w: "near", parent: g });
  S.draw(`M${x - 4 * k} ${y - 90 * k} L${x + 20 * k} ${y + 40 * k}`, t ?? S.start, 0, { c: DS.P.white[0], w: DS.w.detail, parent: g });
  g.setAttribute("transform", `rotate(${rot} ${x} ${y})`); return g; };
const boot = (S, x, gy, k, t, o = {}) => { const g = S.grp(o.parent);
  DS.shape(S, `M${x - 40 * k} ${gy - 200 * k} H${x + 30 * k} V${gy - 70 * k} Q${x + 110 * k} ${gy - 60 * k} ${x + 130 * k} ${gy - 20 * k} V${gy} H${x - 60 * k} V${gy - 90 * k} Z`, "white", { t, tone: 2, w: "near", parent: g });
  S.fill(rect(x - 60 * k, gy - 22 * k, 190 * k, 22 * k), t ?? S.start, 0, DS.c("gray", 2), 1, g);
  if (o.dusty) for (let i = 0; i < 26; i++) S.fill(circ(x - 50 * k + rnd() * 170 * k, gy - 20 * k - rnd() * 180 * k, 4 + rnd() * 5), t ?? S.start, 0, DS.c("gray", 2), 0.8, g);
  return g; };
const brush = (S, x, y, k, t, parent) => { const g = S.grp(parent);
  DS.shape(S, rrect(x, y - 20 * k, 150 * k, 40 * k, DS.r.sm * k), "wood", { t, w: "mid", parent: g });
  DS.shape(S, rect(x - 70 * k, y - 28 * k, 70 * k, 56 * k), "yellow", { t, w: "mid", parent: g });
  for (let i = 0; i < 6; i++) S.draw(line([x - 66 * k + i * 11 * k, y + 28 * k], [x - 70 * k + i * 12 * k, y + 56 * k], 0), t ?? S.start, 0, { c: DS.P.ink[0], w: DS.w.detail, parent: g });
  return g; };
const dustpan = (S, x, gy, k, t, parent) => { const g = S.grp(parent);
  DS.shape(S, `M${x - 110 * k} ${gy - 30 * k} L${x + 90 * k} ${gy - 30 * k} L${x + 120 * k} ${gy} L${x - 140 * k} ${gy} Z`, "blue", { t, w: "mid", parent: g });
  S.draw(`M${x + 70 * k} ${gy - 28 * k} L${x + 200 * k} ${gy - 120 * k}`, t ?? S.start, 0, { c: DS.c("blue", 2), w: DS.w.near * 1.4, parent: g });
  brush(S, x + 300 * k, gy - 40 * k, k, t, g);
  return g; };
const balloon = (S, x, y, k, t, parent) => { const g = S.grp(parent);
  S.draw(`M${x} ${y + 76 * k} Q${x - 20 * k} ${y + 140 * k} ${x + 10 * k} ${y + 200 * k}`, t ?? S.start, 0, { c: DS.P.ink[0], w: DS.w.detail, parent: g });
  DS.shape(S, smooth([[x, y - 90 * k], [x + 66 * k, y - 40 * k], [x + 60 * k, y + 40 * k], [x, y + 80 * k], [x - 60 * k, y + 40 * k], [x - 66 * k, y - 40 * k], [x, y - 90 * k]]) + " Z", "red", { t, w: "mid", parent: g });
  S.fill(circ(x - 24 * k, y - 36 * k, 12 * k, 20 * k), t ?? S.start, 0, DS.P.white[0], 0.6, g);
  return g; };
// the lander cabin: grey walls, a porthole onto the surface, panels
const cabin = (S) => { DS.room(S, { wall: "gray", floor: "gray", window: false });
  S.fill(circ(1500, 360, 140), S.start, 0, DS.P.ink[2], 1); stars(S, 16, 1380, 240, 1620, 480, { big: 2 }); earth(S, 1540, 330, 44, { night: true, nightA: 20 });
  S.draw(circ(1500, 360, 140), S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 1.6 }); S.fill(`M1370 440 Q1500 410 1630 450 L1620 480 Q1500 520 1380 480 Z`, S.start, 0, DS.c("gray", 0), 1);
  [[200, 220], [340, 220], [200, 330], [340, 330]].forEach(([x, y]) => { DS.shape(S, rrect(x, y, 100, 80, DS.r.xs), "gray", { tone: 2, flat: true, w: "detail" }); S.fill(circ(x + 24, y + 40, 8), S.start, 0, DS.c("green"), 1); S.fill(circ(x + 56, y + 40, 8), S.start, 0, DS.c("orange"), 1); }); };

// On day four, Dave breaks the record set by Apollo seventeen's crew: about seventy-five hours.
{ const S = sc(26, 0, { cam: "push", focus: "960 700" }); lunar(S, { sun: [260, 170, 46] });
  const gy = 900, x0 = 200, x100 = 1600, x75 = x0 + 0.75 * (x100 - x0);
  S.draw(line([x0, gy + 10], [x100, gy + 10], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
  [0, 25, 50, 75, 100].forEach((h) => { const x = x0 + (h / 100) * (x100 - x0); S.draw(line([x, gy + 2], [x, gy + 22], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.mid }); });
  card(S, "DAY FOUR", 700, 190, { t: W(26, 1), size: DS.type.title });
  S.draw(line([x75, gy], [x75, gy - 230], 0), W(26, 9), 0, { c: DS.P.white[0], w: DS.w.mid }); DS.shape(S, `M${x75} ${gy - 230} L${x75 + 120} ${gy - 200} L${x75} ${gy - 170} Z`, "red", { t: W(26, 9), w: "detail" });
  card(S, "APOLLO 17: ABOUT 75 HOURS", x75 - 120, gy - 500, { t: W(26, 10), size: DS.type.caption });
  const F = daveM(S, 300, gy - 10, "near", { s: 1.1, look: 6, mood: "smile", pose: "stand" }); F.walk(W(26, 2), WE(26, 13) - W(26, 2), { x: x100 - 300 - 120 });
  const tr = S.grp(); S.trophy(1740, gy, 1.2, W(26, 13), 0.4, { parent: tr }); fadeG(S, tr, W(26, 13));
  DS.vignette(S, 0.2); }

// "Breaking news. A man on the Moon has set a new record, mostly by not leaving."
{ const S = sc(27, 0, { cam: "push", focus: "700 560" }); DS.room(S, { wall: "navy", floor: "navy", window: false });
  const sc1 = screen(S, 1300, 380, 640, 360, S.start, { fill: "red", tone: 2 });
  txt(S, "BREAKING NEWS", 1300, 330, { size: DS.type.body, c: DS.P.white[0] }); moon(S, 1300, 460, 70, { glow: false });
  const F = who(S, 560, 930, "near", Object.assign({}, ANCHOR, { s: 1.3, look: 4, mood: "smile", pose: "hold" })); talk(S, F, W(27, 0), END(27));
  const dg = S.grp(); DS.shape(S, rrect(180, 800, 760, 240, DS.r.sm), "wood", { w: "near", parent: dg }); S.fill(rect(180, 800, 760, 24), S.start, 0, DS.c("wood", 2), 1, dg);
  card(S, "NEWS", 560, 420, { t: W(27, 1), size: DS.type.caption });
  const cy = S.grp(); S.fill(rect(1000, 800, 820, 120), S.start, 0, DS.c("red", 2), 1, cy); txt(S, "A NEW RECORD", 1410, 850, { size: DS.type.small, c: DS.P.white[0], t: W(27, 9), parent: cy }); txt(S, "MOSTLY BY NOT LEAVING", 1410, 900, { size: DS.type.caption, c: DS.P.white[0], t: W(27, 12), parent: cy });
  DS.vignette(S, 0.2); }

// But Dave now has a problem that wasn't on his packing list. The dust.
{ const S = sc(28, 0, { cam: "push", focus: "960 540" }); lunar(S, { sun: [260, 170, 46] });
  plist(S, { big: true, x: 700, y: 150, crossed: [0, 1], dust: W(28, 12) });
  daveM(S, 330, 940, "near", { s: 1.3, look: 7, mood: "worried", pose: "pointL" });
  const q = txt(S, "?", 1500, 800, { size: DS.type.display, c: DS.c("red", 2), t: W(28, 8) }); S.hide(q, W(28, 12));
  const dc = dustCloud(S, 1560, 800, 1.4, W(28, 12)); fadeG(S, dc, W(28, 12));
  DS.vignette(S, 0.2); }

// On Earth, wind and water wear grains of dust smooth.
{ const S = sc(29, 0, { cam: "push", focus: "960 560" }); DS.outdoor(S, { hy: 640, ground: "sand", hills: "sand" });
  const j = grain(S, 960, 640, 1.7, S.start), r = grain(S, 960, 640, 1.7, S.start, { round: true }); tl.set(r, { opacity: 0 }, 0); tl.to(j, { opacity: 0, duration: 1.2 }, W(29, 5)); tl.to(r, { opacity: 1, duration: 1.2 }, W(29, 5));
  [-1, 1].forEach((sd, i) => { for (let n = 0; n < 3; n++) S.draw(`M${960 + sd * 640} ${520 + n * 90} Q${960 + sd * 460} ${480 + n * 90} ${960 + sd * 320} ${540 + n * 90}`, W(29, 2) + n * 0.15, 0, { c: DS.c("gray", 1), w: DS.w.near }); });
  [[820, 300], [960, 260], [1100, 300]].forEach(([x, y], i) => S.fill(`M${x} ${y - 30} Q${x + 18} ${y} ${x} ${y + 12} Q${x - 18} ${y} ${x} ${y - 30} Z`, W(29, 4) + i * 0.2, 0, DS.c("sky", 2), 1));
  card(S, "WIND + WATER", 960, 170, { t: W(29, 2), size: DS.type.title }); card(S, "SMOOTH", 960, 900, { t: W(29, 8), size: DS.type.title });
  daveM(S, 300, 940, "near", { s: 1.1, look: 6, mood: "flat", pose: "stand", helmet: false, pack: false });
  DS.vignette(S, 0.2); }

// The Moon has neither, so its dust stays as fine as flour,
{ const S = sc(29, 10, { cam: "push", focus: "960 560" }); lunar(S, { sun: [260, 170, 46] });
  grain(S, 960, 640, 1.7, S.start);
  const a = card(S, "NO WIND", 520, 440, { t: W(29, 11), size: DS.type.body }); xMark(S, 520 - a.w / 2 - 40, 440, 1.3, W(29, 12));
  const b = card(S, "NO WATER", 1400, 440, { t: W(29, 12), size: DS.type.body }); xMark(S, 1400 - b.w / 2 - 40, 440, 1.3, W(29, 13));
  card(S, "STILL JAGGED", 960, 900, { t: W(29, 16), size: DS.type.body, tc: "red" });
  DS.vignette(S, 0.2); }

// ... as fine as flour, and as sharp as broken glass.
{ const S = sc(29, 17, { cam: "push", focus: "960 600" }); DS.room(S, ROOM2);
  const fl = S.grp(); mound(S, 540, 880, 560, 300, "white", undefined, fl); S.draw(circ(540, 880, 280, 24), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: fl }); fadeG(S, fl, W(29, 18)); scaleY(fl, W(29, 18), 540, 880, 0.8, 0.05);
  card(S, "FINE AS FLOUR", 540, 190, { t: W(29, 19), size: DS.type.body });
  const gl = S.grp(); [[1300, 640, 2.4, -14], [1560, 700, 1.7, 22], [1060, 740, 1.5, -48]].forEach(([x, y, k, r]) => shard(S, x, y, k, r, undefined, gl)); fadeG(S, gl, W(29, 24));
  card(S, "SHARP AS BROKEN GLASS", 1340, 190, { t: W(29, 24), size: DS.type.body });
  DS.vignette(S, 0.2); }

// Sunlight gives it an electric charge, so it clings to everything,
{ const S = sc(30, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [860, 160, 56] });
  const F = daveM(S, 960, 940, "near", { s: 1.4, look: 0, mood: "flat", pose: "stand" });
  [[700, 280], [860, 260], [1020, 280]].forEach(([x, y], i) => S.arrow(x, y, x - (i - 1) * 40, y + 120, W(30, 1) + i * 0.15, 0.3, { c: DS.c("yellow"), w: DS.w.near }));
  const k = F.s, dots = S.grp();
  for (let i = 0; i < 34; i++) { const sx = 300 + rnd() * 1400, sy = 800 + rnd() * 140, a = rnd() * 6.28, ex = F.cx + Math.cos(a) * (26 + rnd() * 30) * k, ey = F.gy - 20 * k - rnd() * 190 * k;
    const d = S.fill(circ(sx, sy, 5 + rnd() * 3), S.start, 0, DS.c("gray", 2), 1, dots); tl.fromTo(d, { x: 0, y: 0 }, { x: ex - sx, y: ey - sy, duration: 1.6, ease: "power2.inOut" }, W(30, 7) + rnd() * 1.5); }
  card(S, "ELECTRIC CHARGE", 560, 330, { t: W(30, 3), size: DS.type.small }); card(S, "CLINGS TO EVERYTHING", 1400, 480, { t: W(30, 8), size: DS.type.small });
  DS.vignette(S, 0.2); }

// ... like static on a balloon.
{ const S = sc(30, 10, { cam: "push", focus: "960 540" }); DS.room(S, ROOM);
  const F = dave(S, 760, 960, "near", { s: 1.5, look: 5, mood: "wow", pose: "reachL" });
  const R = F.r, hx = F.hd[0], hy = F.hd[1];
  balloon(S, hx + 200, hy - 20, 1.3, S.start);
  for (let i = 0; i < 9; i++) { const a = -Math.PI / 2 + (i - 4) * 0.22; S.draw(line([hx + Math.cos(a) * R * 0.9, hy + Math.sin(a) * R * 0.9], [hx + Math.cos(a) * R * 1.9, hy + Math.sin(a) * R * 1.9 - 20], 0), W(30, 13), 0, { c: DS.c("brown"), w: DS.w.detail }); }
  card(S, "STATIC ON A BALLOON", 1200, 200, { t: W(30, 12), size: DS.type.body });
  DS.vignette(S, 0.2); }

// On Apollo, it jammed latches, scratched visors, wore through layers of boots, and broke the seals on boxes of Moon rock.
{ const S = sc(31, 0, { cam: "push", focus: "960 540" }); space(S);
  const X = [330, 780, 1230, 1650], t = [W(31, 3), W(31, 5), W(31, 11), W(31, 15)], lbl = ["JAMMED LATCHES", "SCRATCHED VISORS", "WORN BOOTS", "BROKEN SEALS"];
  X.forEach((x, i) => { const pg = panel(S, x, 520, 400, 620, t[i]); fadeG(S, pg, t[i]); card(S, lbl[i], x, 280, { t: t[i], size: DS.type.caption }); });
  { const g = S.grp(); DS.shape(S, rrect(250, 470, 160, 100, DS.r.sm), "wood", { w: "near", parent: g }); DS.shape(S, rect(300, 440, 60, 60), "gray", { w: "mid", parent: g }); S.draw(line([300, 500], [360, 500], 0), S.start, 0, { c: DS.P.ink[0], w: DS.w.detail, parent: g }); dustCloud(S, 330, 590, 0.5, undefined, { parent: g }); fadeG(S, g, t[0]); xMark(S, 330, 520, 1.2, t[0] + 0.5); }
  { const g = S.grp(); S.draw(circ(780, 500, 120), S.start, 0, { c: DS.c("sky", 2), w: DS.w.near, parent: g }); [[-70, -40, 60, 20], [-30, -10, 90, 36], [10, 40, 70, 12], [-60, 50, 40, -20]].forEach(([a, b, c, d]) => S.draw(line([780 + a, 500 + b], [780 + a + c, 500 + b + d], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: g })); fadeG(S, g, t[1]); }
  { const g = S.grp(); boot(S, 1180, 650, 1.0, undefined, { parent: g, dusty: true }); [[1180, 580, 120], [1190, 610, 110]].forEach(([x, y, w]) => S.draw(line([x - w / 2 + 40, y], [x + w / 2 + 40, y + 14], 0), S.start, 0, { c: DS.c("red"), w: DS.w.mid, parent: g })); fadeG(S, g, t[2]); }
  { const g = S.grp(); DS.shape(S, rrect(1560, 470, 190, 150, DS.r.sm), "gray", { tone: 1, w: "near", parent: g }); S.draw(line([1560, 530], [1750, 530], 0), S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: g }); mound(S, 1655, 470, 110, 60, "gray", undefined, g); S.draw(`M1640 530 l12 -14 l8 14 l12 -14`, S.start, 0, { c: DS.c("red"), w: DS.w.near, parent: g }); fadeG(S, g, t[3]); }
  DS.vignette(S, 0.2); }

// One commander said his suit looked more worn after eight hours on the Moon than his training suit after a hundred.
{ const S = sc(32, 0, { cam: "push", focus: "960 600" }); DS.room(S, ROOM2);
  const A = astro(S, 560, 960, "near", { s: 1.5, look: 4, mood: "flat" });
  for (let i = 0; i < 26; i++) S.fill(circ(A.cx + (rnd() - 0.5) * 120, A.sh[1] + rnd() * 300, 5 + rnd() * 9, 4 + rnd() * 5), W(32, 5), 0, DS.c("gray", 2), 0.65, A.g);
  const B = astro(S, 1360, 960, "near", { s: 1.5, look: -4, mood: "smile" });
  card(S, "8 HOURS ON THE MOON", 560, 250, { t: W(32, 8), size: DS.type.small }); card(S, "100 HOURS OF TRAINING", 1360, 250, { t: W(32, 18), size: DS.type.small });
  tick(S, 1360, 180, 1.2, W(32, 19)); xMark(S, 560, 180, 1.2, W(32, 9));
  DS.vignette(S, 0.2); }

// Back inside their lander, it smelled like burnt gunpowder,
{ const S = sc(33, 0, { cam: "push", focus: "960 560" }); cabin(S);
  const A = who(S, 760, 960, "near", { s: 1.5, hair: "none", outfitC: DS.c("white", 2), look: 5, mood: "worried", pose: "stand" });
  for (let i = 0; i < 24; i++) S.fill(circ(A.cx + (rnd() - 0.5) * 110, A.sh[1] + rnd() * 280, 4 + rnd() * 7, 3 + rnd() * 4), S.start, 0, DS.c("gray", 2), 0.7, A.g);
  [-1, 0, 1].forEach((i) => { const p = S.draw(`M${A.hd[0] + 80} ${A.hd[1] + 40 + i * 30} q 30 -20 60 0 t 60 0 t 60 0`, W(33, 5) + (i + 1) * 0.2, 0, { c: DS.c("orange", 2), w: DS.w.near, op: 0.85 }); tl.fromTo(p, { x: 0 }, { x: 18, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: 3 }, W(33, 5)); });
  card(S, "BURNT GUNPOWDER", 700, 200, { t: W(33, 7), size: DS.type.title });
  DS.vignette(S, 0.2); }

// ... and all twelve moonwalkers reacted to it, from sneezing to a blocked nose.
{ const S = sc(33, 9, { cam: "push", focus: "960 560" }); cabin(S);
  const row = S.grp(); for (let i = 0; i < 12; i++) { const tt = W(33, 10) + i * 0.12; miniAstro(S, 300 + i * 90, 440, 1.5, tt, { parent: row }); tick(S, 300 + i * 90, 290, 0.8, tt + 0.25, "red", row); }
  card(S, "12 OF 12", 960, 170, { t: W(33, 11), size: DS.type.title });
  const A = who(S, 760, 960, "near", { s: 1.5, hair: "none", outfitC: DS.c("white", 2), look: 5, mood: "wow", pose: "head" });
  say(S, 1250, 700, 300, 120, 880, 760, ["ACHOO!"], W(33, 16), { size: DS.type.title });
  card(S, "BLOCKED NOSE", 1450, 880, { t: W(33, 19), size: DS.type.small });
  DS.vignette(S, 0.2); }

// "Mission Control here. Dave, you have what one Apollo astronaut called lunar hay fever."
{ const S = sc(34, 0, { cam: "push", focus: "960 540" }); DS.room(S, { wall: "navy", floor: "navy", window: false });
  [[420, 270], [960, 270], [1500, 270]].forEach(([x, y], i) => { screen(S, x, y, 400, 240, S.start, { fill: "ink", tone: 1 }); S.draw(smooth([[x - 160, y + 60], [x - 80, y - 20], [x, y + 30], [x + 80, y - 50], [x + 160, y]]), S.start, 0, { c: DS.c(["green", "sky", "orange"][i]), w: DS.w.near }); });
  const dv = who(S, 960, 360, "near", { s: 0.5, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue"), mood: "wow", pose: "head", float: true }); fadeG(S, dv.all, W(34, 8));
  txt(S, "ACHOO", 1130, 200, { size: DS.type.caption, c: DS.P.white[0], t: W(34, 9) });
  const F = who(S, 560, 940, "near", Object.assign({}, DOC, { s: 1.3, look: 3, mood: "smile", pose: "hold" })); talk(S, F, W(34, 0), END(34));
  S.draw(arc(F.hd[0], F.hd[1] - 4, F.r * 1.15, 180, 360), S.start, 0, { c: DS.P.ink[0], w: DS.w.near, parent: F.g }); S.draw(`M${F.hd[0] - F.r * 1.15} ${F.hd[1] - 4} V${F.hd[1] + F.r * 0.2} Q${F.hd[0] - F.r * 1.1} ${F.hd[1] + F.r * 0.7} ${F.hd[0] - F.r * 0.3} ${F.hd[1] + F.r * 0.8}`, S.start, 0, { c: DS.P.ink[0], w: DS.w.mid, parent: F.g });
  const dg = S.grp(); DS.shape(S, rrect(180, 830, 760, 200, DS.r.sm), "gray", { tone: 2, w: "near", parent: dg });
  card(S, "MISSION CONTROL", 560, 430, { t: W(34, 1), size: DS.type.caption }); card(S, "LUNAR HAY FEVER", 1250, 600, { t: W(34, 11), size: DS.type.body, tc: "red" });
  DS.vignette(S, 0.2); }

// The last commander to leave the Moon said they could beat every other problem up there,
{ const S = sc(35, 0, { cam: "push", focus: "1000 640" }); lunar(S, { sun: [260, 170, 46], prints: [[600, 930], [700, 920], [800, 925]] });
  lander(S, 1380, 900, 1.5);
  const A = astro(S, 640, 940, "near", { s: 1.3, look: 6, mood: "determined", pose: "stand" }); A.walk(W(35, 2), 2.6, { x: 330 });
  card(S, "LAST COMMANDER TO LEAVE", 760, 200, { t: W(35, 1), size: DS.type.small });
  DS.vignette(S, 0.2); }

// ... except the dust.
{ const S = sc(35, 9, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  const A = astro(S, 480, 940, "near", { s: 1.5, look: 6, mood: "determined", pose: "point" }); talk(S, A, W(35, 9), END(35));
  [["HEAT", W(35, 10)], ["COLD", W(35, 11)], ["RADIATION", W(35, 12)]].forEach(([s, t], i) => { card(S, s, 1250, 300 + i * 130, { t, size: DS.type.body }); tick(S, 1000, 300 + i * 130, 1.4, t + 0.2); });
  card(S, "THE DUST", 1250, 700, { t: W(35, 16), size: DS.type.title, tc: "red" }); xMark(S, 940, 700, 1.7, W(35, 17));
  const D = daveM(S, 1700, 940, "near", { s: 0.9, look: -6, mood: "worried", pose: "stand" });
  DS.vignette(S, 0.2); }

// Dave didn't pack a dustpan. It wouldn't have helped.
{ const S = sc(36, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  plist(S, { big: false, crossed: [0, 1], dust: true });
  const F = daveM(S, 600, 940, "near", { s: 1.3, look: 5, mood: "flat", pose: "shrug" });
  const dp = dustpan(S, 1150, 900, 1.5, undefined); fadeG(S, dp, W(36, 3));
  S.draw(line([1000, 640], [1560, 900], 0), W(36, 5), 0, { c: DS.c("red"), w: DS.w.near * 1.6 }); S.draw(line([1560, 640], [1000, 900], 0), W(36, 5) + 0.15, 0, { c: DS.c("red"), w: DS.w.near * 1.6 });
  DS.vignette(S, 0.2); }

// On Apollo, brushing worked far better in tests than on the Moon.
{ const S = sc(36, 9, { cam: "push", focus: "960 540" }); DS.room(S, ROOM2);
  [[520, "TEST ON EARTH", true], [1400, "ON THE MOON", false]].forEach(([x, nm, ok], i) => { const t = [W(36, 10), W(36, 15)][i]; const pg = panel(S, x, 520, 700, 640, t); fadeG(S, pg, t);
    const g = S.grp(); boot(S, x - 60, 760, 1.5, undefined, { parent: g, dusty: !ok }); brush(S, x + 130, 560, 1.2, undefined, g); fadeG(S, g, t);
    card(S, nm, x, 250, { t, size: DS.type.small }); (ok ? tick : xMark)(S, x + 250, 760, ok ? 2 : 1.7, t + 0.5); });
  DS.vignette(S, 0.2); }
