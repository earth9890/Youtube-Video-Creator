
// ===================== 2. Hour one =====================
const ROOM2 = { wall: "glass", floor: "wood", window: false };
const lander = (S, x, gy, k, parent) => { const g = S.grp(parent);
  DS.shadow(S, x, gy, 520 * k, { parent: g });
  [-1, 1].forEach((sd) => { S.draw(`M${x + sd * 60 * k} ${gy - 150 * k} L${x + sd * 210 * k} ${gy - 8 * k}`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.near, parent: g }); DS.shape(S, circ(x + sd * 214 * k, gy - 6 * k, 34 * k, 10 * k), "gray", { tone: 2, w: "detail", parent: g }); });
  DS.shape(S, `M${x - 120 * k} ${gy - 150 * k} L${x - 90 * k} ${gy - 220 * k} H${x + 90 * k} L${x + 120 * k} ${gy - 150 * k} L${x + 90 * k} ${gy - 100 * k} H${x - 90 * k} Z`, "gold", { w: "near", parent: g });
  DS.shape(S, `M${x - 80 * k} ${gy - 220 * k} L${x - 60 * k} ${gy - 300 * k} H${x + 60 * k} L${x + 80 * k} ${gy - 220 * k} Z`, "gray", { tone: 1, w: "near", parent: g });
  DS.shape(S, circ(x, gy - 262 * k, 22 * k), "glass", { w: "detail", parent: g });
  S.draw(`M${x - 40 * k} ${gy - 100 * k} L${x - 70 * k} ${gy - 8 * k} M${x - 18 * k} ${gy - 100 * k} L${x - 46 * k} ${gy - 8 * k}`, S.start, 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: g });
  for (let i = 1; i < 6; i++) S.draw(line([x - 66 * k + (i * 5 * k) , gy - 100 * k + i * 15 * k], [x - 44 * k + i * 4 * k, gy - 100 * k + i * 15 * k], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, parent: g });
  return g; };
const kangaroo = (S, x, gy, k, parent) => { const g = S.grp(parent);
  DS.shadow(S, x, gy, 240 * k, { parent: g });
  S.draw(`M${x - 40 * k} ${gy - 70 * k} Q${x - 150 * k} ${gy - 30 * k} ${x - 190 * k} ${gy}`, S.start, 0, { c: DS.c("earth", 2), w: DS.w.near * 2.2, parent: g });
  DS.shape(S, smooth([[x - 60 * k, gy - 60 * k], [x - 70 * k, gy - 170 * k], [x - 20 * k, gy - 250 * k], [x + 40 * k, gy - 180 * k], [x + 56 * k, gy - 60 * k], [x - 60 * k, gy - 60 * k]]) + " Z", "earth", { w: "near", parent: g });
  DS.shape(S, circ(x + 4 * k, gy - 118 * k, 26 * k, 36 * k), "sand", { w: "detail", parent: g });
  DS.shape(S, `M${x - 70 * k} ${gy - 70 * k} Q${x - 10 * k} ${gy - 130 * k} ${x + 70 * k} ${gy - 60 * k} L${x + 120 * k} ${gy - 8 * k} H${x - 10 * k} Z`, "earth", { w: "near", tone: 2, parent: g });
  DS.shape(S, rrect(x + 60 * k, gy - 22 * k, 90 * k, 22 * k, DS.r.sm * k), "earth", { w: "near", tone: 2, parent: g });
  DS.shape(S, circ(x - 14 * k, gy - 270 * k, 36 * k, 32 * k), "earth", { w: "near", parent: g });
  DS.shape(S, `M${x + 6 * k} ${gy - 268 * k} L${x + 62 * k} ${gy - 252 * k} L${x + 14 * k} ${gy - 236 * k} Z`, "sand", { w: "detail", parent: g });
  [-34, -6].forEach((dx) => DS.shape(S, `M${x + dx * k} ${gy - 296 * k} Q${x + (dx - 10) * k} ${gy - 360 * k} ${x + (dx + 12) * k} ${gy - 350 * k} Q${x + (dx + 22) * k} ${gy - 320 * k} ${x + (dx + 14) * k} ${gy - 294 * k} Z`, "earth", { w: "detail", parent: g }));
  S.fill(circ(x + 2 * k, gy - 276 * k, 4 * k), S.start, 0, DS.P.ink[0], 1, g);
  [[-6, -190], [24, -176]].forEach(([dx, dy]) => S.draw(`M${x + dx * k} ${dy + gy} l${28 * k} ${12 * k}`, S.start, 0, { c: DS.c("earth", 2), w: DS.w.mid, parent: g }));
  return g; };
const bell = (S, x, gy, k, parent) => { const g = S.grp(parent);
  DS.shadow(S, x, gy, 200 * k, { parent: g });
  DS.shape(S, rect(x - 8 * k, gy - 230 * k, 16 * k, 50 * k), "gray", { tone: 2, w: "detail", parent: g });
  DS.shape(S, `M${x - 100 * k} ${gy - 80 * k} Q${x - 90 * k} ${gy - 230 * k} ${x} ${gy - 240 * k} Q${x + 90 * k} ${gy - 230 * k} ${x + 100 * k} ${gy - 80 * k} Z`, "gold", { w: "near", parent: g });
  DS.shape(S, rrect(x - 116 * k, gy - 84 * k, 232 * k, 24 * k, DS.r.xs), "gold", { tone: 2, w: "mid", parent: g });
  DS.shape(S, circ(x, gy - 50 * k, 20 * k), "gold", { tone: 2, w: "mid", parent: g });
  return g; };
const earRing = (S, t, o = {}) => dashed(S.draw(circ(EX, EY, ER + (o.pad ?? 30)), t, 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.9 }), 0.025, 0.02);

// Dave steps outside and feels lighter.
{ const S = sc(8, 0, { cam: "push", focus: "960 700" }); lunar(S, { sun: [260, 170, 46], prints: [[900, 930], [1000, 910]] });
  lander(S, 330, 880, 1.3);
  const F = daveM(S, 820, 940, "near", { s: 1.3, look: 5, mood: "happy", pose: "armsUp" });
  suitcase(S, 1140, 940, 0.9);
  tl.fromTo(F.g, { y: 0 }, { y: -50, duration: 0.55, ease: "sine.out", yoyo: true, repeat: 1 }, W(8, 4));
  card(S, "LIGHTER", 900, 190, { t: W(8, 4), size: DS.type.title });
  DS.vignette(S, 0.2); }

// The Moon's gravity is about one sixth of Earth's, so in theory, he can jump about six times higher.
{ const S = sc(8, 6, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  card(S, "GRAVITY: ABOUT 1/6 OF EARTH'S", 900, 170, { t: W(8, 7), size: DS.type.body });
  const U = 70, gy = 940, rx = 1240;
  S.draw(line([rx, gy], [rx, gy - 6.4 * U], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.mid });
  for (let i = 1; i <= 6; i++) { S.draw(line([rx - 16, gy - i * U], [rx + 16, gy - i * U], 0), S.start, 0, { c: DS.P.white[0], w: DS.w.mid }); txt(S, String(i), rx + 52, gy - i * U + 14, { size: DS.type.caption, c: DS.P.white[0] }); }
  S.fill(rect(rx - 120, gy - U, 60, U), W(8, 18) - 0.2, 0, DS.c("red"), 1);
  card(S, "EARTH: 1×", rx - 70, gy - U - 60, { t: W(8, 18), size: DS.type.caption });
  card(S, "MOON: 6×", rx + 130, gy - 6 * U - 60, { t: W(8, 21), size: DS.type.caption });
  const mb = S.fill(rect(rx + 90, gy - 6 * U, 60, 6 * U), W(8, 21), 0, DS.c("green"), 1);
  const F = daveM(S, 320, gy, "near", { s: 1.3, look: 5, mood: "happy", pose: "armsUp" });
  tl.fromTo(F.g, { y: 0 }, { y: -6 * U, duration: 1.1, ease: "power2.out", yoyo: true, repeat: 1 }, W(8, 19));
  DS.vignette(S, 0.2); }

// He bounces like a kangaroo. NASA's notes say no Apollo astronaut used that hop on flat ground, except in play. Dave is playing.
{ const S = sc(9, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  const F = daveM(S, 1520, 940, "near", { s: 1.3, look: -4, mood: "happy", pose: "armsUp" });
  const K = kangaroo(S, 1000, 940, 1.3);
  tl.fromTo(K, { y: 0 }, { y: -150, duration: 0.7, ease: "sine.out", yoyo: true, repeat: 3 }, W(9, 1)); tl.to(K, { opacity: 0, duration: 0.5 }, W(9, 5) - 0.2);
  tl.fromTo(F.g, { y: 0 }, { y: -150, duration: 0.7, ease: "sine.out", yoyo: true, repeat: Math.ceil((END(9) - W(9, 1)) / 1.4) }, W(9, 1));
  const kc = card(S, "LIKE A KANGAROO", 900, 190, { t: W(9, 2), size: DS.type.body }); S.hide(kc.g, W(9, 5));
  const pg = S.grp(); paperR(S, 150, 380, 400, 480, { parent: pg }); txt(S, "NASA NOTES", 350, 450, { size: DS.type.caption, parent: pg }); lines(S, 190, 500, 320, 7, S.start, 44, pg);
  fadeG(S, pg, W(9, 5));
  const A = astro(S, 900, 940, "near", { s: 1.3, look: 5, mood: "flat", pose: "stand" }); fadeG(S, A.all, W(9, 6));
  A.walk(W(9, 7), 2.0, { x: 90 });
  card(S, "NO HOP ON FLAT GROUND", 900, 190, { t: W(9, 8), size: DS.type.body, tc: "red" });
  tl.fromTo(A.g, { y: 0 }, { y: -130, duration: 0.6, ease: "sine.out", yoyo: true, repeat: 3 }, W(9, 17));
  card(S, "EXCEPT IN PLAY", 900, 300, { t: W(9, 17), fill: "gold" });
  DS.vignette(S, 0.2); }

// Then he notices the quiet. Sound needs air to travel through, and the Moon has almost none.
{ const S = sc(10, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  const F = daveM(S, 560, 940, "near", { s: 1.3, look: 6, mood: "worried", pose: "stand", armR: [[52, -6], [44, -70]] });
  bell(S, 1300, 920, 1.3);
  card(S, "SOUND NEEDS AIR", 900, 190, { t: W(10, 5), size: DS.type.body });
  const arcs = S.grp(); [0, 1, 2, 3].forEach((i) => { const a = S.draw(arc(1300, 760, 170 + i * 70, 120, 240), W(10, 6) + i * 0.25, 0, { c: DS.c("yellow"), w: DS.w.near, op: 0.9 - i * 0.2, parent: arcs }); });
  const nx = S.grp(); S.draw(arc(1300, 760, 170 + 4 * 70, 150, 210), W(10, 13), 0, { c: DS.c("red"), w: DS.w.near, parent: nx }); xMark(S, 900, 770, 2.4, W(10, 13), nx);
  card(S, "ALMOST NO AIR", 960, 880, { t: W(10, 13), size: DS.type.small, tc: "red" });
  DS.vignette(S, 0.2); }

// A sugar cube of Earth's air holds about a hundred trillion times more molecules than the same space just above the Moon.
{ const S = sc(11, 0, { cam: "push", focus: "960 540" }); DS.room(S, ROOM2);
  const cy = 520, s = 170, L = 560, R = 1360;
  cube(S, L, cy, s, "white", S.start); dotsIn(S, L - 150, cy - 60, L + 150, cy + 130, 90, W(11, 5), DS.c("blue"), undefined, 6);
  card(S, "EARTH'S AIR", L, 190, { t: W(11, 1), size: DS.type.small });
  const mg = S.grp(); cube(S, R, cy, s, "white", S.start, { parent: mg }); S.fill(circ(R + 20, cy + 40, 6), S.start, 0, DS.c("blue"), 1, mg); fadeG(S, mg, W(11, 14));
  card(S, "ABOVE THE MOON", R, 190, { t: W(11, 15), size: DS.type.small });
  card(S, "ABOUT 100 TRILLION ×", 960, 880, { t: W(11, 9), size: DS.type.title, tc: "red" });
  DS.vignette(S, 0.2); }

// So Dave has brought earplugs to a place where sound can't even travel.
{ const S = sc(12, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [260, 170, 46] });
  plist(S, { cross: [[0, W(12, 9)]] });
  const F = daveM(S, 860, 940, "near", { s: 1.4, look: 0, mood: "flat", pose: "stand" });
  [-1, 1].forEach((sd) => DS.shape(S, circ(F.hd[0] + sd * F.r * 1.03, F.hd[1] + F.r * 0.1, 0.18 * F.r, 0.26 * F.r), "orange", { w: "hair", parent: F.g }));
  const e = ITEM.earplugs(S, 1360, 640, 2.2, { t: W(12, 4) }); fadeG(S, e, W(12, 4));
  const sp = speaker(S, 1250, 840, 0.8, W(12, 9)); fadeG(S, sp, W(12, 9)); xMark(S, 1260, 840, 1.6, W(12, 10));
  DS.vignette(S, 0.2); }

// The sky is black, even at midday, because there's no air to scatter the sunlight.
{ const S = sc(13, 0, { cam: "push", focus: "960 640" }); lunar(S, { sun: [960, 190, 64] });
  card(S, "BLACK SKY AT MIDDAY", 1160, 400, { t: W(13, 3), size: DS.type.title });
  const rg = S.grp(); [[560, 780], [760, 820], [960, 840], [1160, 820], [1360, 780]].forEach(([x, y]) => dashed(S.draw(line([960, 250], [x, y], 0), W(13, 10), 0, { c: DS.c("yellow", 1), w: DS.w.near, op: 0.7, parent: rg }), 0.04, 0.025));
  card(S, "NO AIR TO SCATTER LIGHT", 1160, 560, { t: W(13, 9), size: DS.type.small });
  daveM(S, 420, 940, "near", { s: 1.3, look: 6, mood: "wow", pose: "stand" });
  DS.vignette(S, 0.2); }

// And hanging in that black sky is the Earth.
{ const S = sc(13, 15, { cam: "none" }); lunar(S, { sun: [260, 170, 46] });
  const F = daveM(S, 700, 940, "near", { s: 1.3, look: 7, mood: "wow", pose: "point" });
  earRing(S, W(13, 21)); card(S, "THE EARTH", EX, EY + 190, { t: W(13, 22), size: DS.type.small });
  S.zoom(1100, 520, 1.12, W(13, 18), 2.4);
  DS.vignette(S, 0.2); }

// On the side of the Moon that faces us, Earth stays in almost the same spot.
{ const S = sc(14, 0, { cam: "pull" }); space(S, { milky: [200, 900, 1700, 120] });
  earth(S, 420, 540, 200);
  moon(S, 1380, 540, 140);
  const m = miniAstro(S, 1230, 540, 1.2, W(14, 3)); dashed(S.draw(line([1190, 520], [680, 520], 0), W(14, 3), 0, { c: DS.P.white[0], w: DS.w.mid, op: 0.85 }), 0.03, 0.02);
  card(S, "THE SIDE THAT FACES US", 960, 160, { t: W(14, 2), size: DS.type.body });
  card(S, "ALWAYS FACING EARTH", 1380, 800, { t: W(14, 7), size: DS.type.small });
  DS.vignette(S, 0.2); }

// Earth stays in almost the same spot. It never rises, and it never sets.
{ const S = sc(14, 9, { cam: "none" }); const L = lunar(S, { night: true, sun: [200, 160, 40] });
  tl.fromTo(L.sky, { rotation: 0 }, { rotation: 12, svgOrigin: "960 760", duration: S.len, ease: "none" }, S.start);
  earRing(S, W(14, 9)); card(S, "EARTH STAYS PUT", 900, 190, { t: W(14, 9), size: DS.type.body });
  const ar = S.grp();
  S.arrow(EX - 190, EY + 60, EX - 190, EY - 90, W(14, 17), 0.3, { c: DS.P.white[0], w: DS.w.near, parent: ar }); xMark(S, EX - 190, EY - 10, 1.4, W(14, 17));
  S.arrow(EX + 190, EY - 60, EX + 190, EY + 90, W(14, 21), 0.3, { c: DS.P.white[0], w: DS.w.near, parent: ar }); xMark(S, EX + 190, EY + 10, 1.4, W(14, 21));
  daveM(S, 800, 940, "near", { s: 1.3, look: 7, mood: "smile", pose: "stand" });
  DS.vignette(S, 0.2); }

// Dave wanted a home with a view. He got a view that never moves.
{ const S = sc(15, 0, { cam: "none" }); lunar(S, { sun: [260, 170, 46] });
  const fr = S.grp(); DS.shape(S, `M${EX - 150} ${EY - 130} H${EX + 150} V${EY + 130} H${EX - 150} Z M${EX - 120} ${EY - 100} V${EY + 100} H${EX + 120} V${EY - 100} Z`, "wood", { w: "near", parent: fr }); fadeG(S, fr, W(15, 3));
  const F = daveM(S, 760, 940, "near", { s: 1.3, look: 7, mood: "happy", pose: "hips" }); F.face(W(15, 8), "flat", 7);
  suitcase(S, 1000, 940, 0.8);
  const pn = S.grp(); S.fill(circ(EX + 70, EY - 40, 14), W(15, 11), 0, DS.c("red"), 1, pn); S.draw(line([EX + 70, EY - 26], [EX + 62, EY + 10], 0), W(15, 11), 0, { c: DS.c("gray", 2), w: DS.w.mid, parent: pn });
  card(S, "A VIEW THAT NEVER MOVES", 900, 190, { t: W(15, 9), size: DS.type.body });
  DS.vignette(S, 0.2); }
