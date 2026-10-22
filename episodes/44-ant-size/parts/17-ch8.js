
// ===================== 8. The right size =====================
const KITCHEN = { wall: "wall", floor: "wood", window: false };
// a kitchen table in side view for the callback scenes: slab + two legs + a plate. Returns the plate centre.
const kTable = (S, x0, wd, ty) => { const g = S.grp(); DS.shape(S, rrect(x0, ty, wd, 40, DS.r.sm), "wood", { w: "near", parent: g, tone: 1 }); [x0 + 40, x0 + wd - 80].forEach((x) => DS.shape(S, rect(x, ty + 40, 40, 940 - ty - 40), "wood", { w: "near", parent: g, tone: 2, flat: true })); plate(S, x0 + wd / 2, ty - 4, 150, { parent: g }); return g; };
const kChair = (S, x, seatY) => { DS.shape(S, rect(x - 150, seatY - 330, 40, 330 + 130), "wood", { w: "near", tone: 2, flat: true }); DS.shape(S, rrect(x - 150, seatY - 330, 40, 60, DS.r.xs), "wood", { w: "near", tone: 1 }); DS.shape(S, rrect(x - 150, seatY, 320, 34, DS.r.sm), "wood", { w: "near" }); [x - 130, x + 130].forEach((lx) => DS.shape(S, rect(lx, seatY + 34, 30, 940 - seatY - 34 + 20), "wood", { w: "near", tone: 2, flat: true })); };
// At dinnertime, the shrink ray finishes recharging, and the ant walks Dave home along her scent trail.
{ const S = sc(77, 0, { cam: "push", focus: "960 640" }); garden(S, DS.outdoor(S, GARD.dusk), { blades: false });
  const R = ray(S, 420, 700, 0.8, { level: 0.2, c: "green" }); R.charge(W(77, 4), 1.6, 0.2, 1);
  card(S, "DINNERTIME", 960, 190, { t: W(77, 1), size: DS.type.small }); card(S, "RECHARGED", 420, 440, { t: W(77, 6), tc: "green", size: DS.type.small });
  house(S, 1560, 600, 0.9, { layer: "far" });
  const dots = S.grp(); for (let i = 0; i < 20; i++) S.fill(circ(620 + i * 46, 920 + Math.sin(i) * 5, 8), W(77, 11) + i * 0.1, 0, DS.c("purple", 1), 1, dots);
  const A = ant(S, 820, 920, 1.3, { face: "smile", look: 4, dir: 1 }); A.walk(W(77, 8), 5.0, 480);
  const F = tiny(S, 470, 920, { s: 0.95, look: 5, mood: "smile", float: true }); F.walk(W(77, 8), 5.0, { x: 480, y: 0 }, 0.35);
  DS.vignette(S); }

// So what would really happen if you shrank to the size of an ant? You'd be super strong, and you could fall off a skyscraper and walk away.
{ const S = sc(78, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.morning), { blades: false });
  const K = S.grp(); DS.shape(S, rect(1260, 180, 230, 640), "blue", { w: "near", parent: K, tone: 2, flat: true }); for (let r = 0; r < 9; r++) for (let c = 0; c < 3; c++) S.fill(rect(1282 + c * 68, 210 + r * 68, 44, 44), S.start, 0, DS.c("sky", 1), 1, K); fadeG(S, K, W(78, 22), 0.5);
  const F = tiny(S, 560, 960, { s: 1.3, look: 5, mood: "determined", pose: "armsUp" });
  card(S, "WHAT WOULD REALLY HAPPEN?", 700, 150, { t: W(78, 1), size: DS.type.caption });
  card(S, "SUPER STRONG", 560, 330, { t: W(78, 15), tc: "green", size: DS.type.small });
  card(S, "FALL OFF A SKYSCRAPER", 1375, 920, { t: W(78, 21), size: DS.type.caption }); card(S, "WALK AWAY", 1000, 790, { t: W(78, 25), tc: "green", size: DS.type.small });
  DS.vignette(S); }

// But one raindrop could hold you prisoner, a sunny afternoon would leave you freezing and starving, and the world would be a blur.
{ const S = sc(79, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "sand", floor: "wood", window: false });
  [[330, W(79, 1)], [960, W(79, 7)], [1590, W(79, 16)]].forEach(([x, t], i) => {
    const p = panel(S, x, 540, 520, 660, T0(S)); fadeG(S, p, t - 0.1); const ig = S.grp(); fadeG(S, ig, t + 0.1);
    if (i === 0) { const F = tiny(S, x, 760, { s: 0.85, look: 0, mood: "wow", parent: ig }); faceBubble(S, F, S.start, ig); S.text("TRAPPED", x, 835, { size: DS.type.small, c: DS.c("red", 2), t: T0(S), parent: ig }); }
    if (i === 1) { sunDisc(S, x + 120, 330, 48, { parent: ig }); const F = tiny(S, x - 40, 760, { s: 0.85, look: 4, mood: "sad", pose: "cross", parent: ig }); blanket(S, F, S.start); S.text("FREEZING", x, 835, { size: DS.type.small, c: DS.c("red", 2), t: T0(S), parent: ig }); }
    if (i === 2) { const hg = S.grp(ig); house(S, x, 720, 0.9, { parent: hg }); blurry(hg, 9); S.text("A BLUR", x, 835, { size: DS.type.small, c: DS.c("red", 2), t: T0(S), parent: ig }); }
  });
  DS.vignette(S); }

// "I did say getting stepped on was the least of it." (Brain)
{ const S = sc(80, 0, { cam: "push", focus: "960 560" }); garden(S, DS.outdoor(S, GARD.dusk), { blades: false });
  const F = tiny(S, 960, 960, { s: 1.5, look: 0, mood: "flat" }); blanket(S, F, S.start);
  const top = 960 - 1.5 * 309 - 75, B = brainy(S, 960, top + 6, 0.85, { face: "tired" }); B.enter(W(80, 0) - 0.2, 0, 60, 0.5); B.talk(W(80, 0), END(80)); B.face(W(80, 7), "smile");
  card(S, "THE LEAST OF IT", 1420, 330, { t: W(80, 7), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// Dave sits back at the breakfast table, full size, wrapped in a blanket, and eats this morning's toast crumb in one bite.
{ const S = sc(81, 0, { cam: "push", focus: "960 600" }); DS.room(S, KITCHEN);
  kChair(S, 700, 800); const F = dave(S, 700, 800, "near", { s: 1.45, sit: true, look: 6, mood: "smile", float: true }); blanket(S, F, S.start);
  kTable(S, 820, 900, 720); const px = 1270, py = 706;
  const cg = crumb(S, px, py, 0.32, {});
  tl.to(cg, { x: F.hd[0] + F.r * 0.7 - px, y: F.hd[1] + F.r * 0.5 - py, duration: 0.9, ease: "power2.in" }, W(81, 17)); tl.to(cg, { opacity: 0, duration: 0.1 }, W(81, 20));
  F.face(W(81, 20), "happy", 6); talk(S, F, W(81, 17), W(81, 20));
  card(S, "ONE BITE", 1200, 330, { t: W(81, 20), tc: "green", size: DS.type.title });
  card(S, "THIS MORNING'S CRUMB", 1250, 190, { t: W(81, 15), size: DS.type.caption });
  DS.vignette(S); }

// Haldane was right. Every animal has a best size.
{ const S = sc(82, 0, { cam: "push", focus: "960 600" }); garden(S, DS.outdoor(S, GARD.morning), { blades: false });
  const A = ant(S, 330, 940, 0.9, { face: "smile", dir: 1 }); rodent(S, 700, 940, 1.4, { name: "earth", long: true }); rodent(S, 1050, 940, 1.5, {});
  const F = dave(S, 1560, 960, "near", { s: 1.3, look: -3, mood: "happy" });
  [[330, 700], [700, 700], [1050, 700], [1560, 420]].forEach(([x, ty], i) => { const g = S.grp(); tick(S, x, ty, 1.0, W(82, 3) + i * 0.3, "green", g); fadeG(S, g, W(82, 3) + i * 0.3, 0.3); });
  card(S, "HALDANE WAS RIGHT", 960, 190, { t: W(82, 0), size: DS.type.small }); card(S, "EVERY ANIMAL HAS A BEST SIZE", 960, 330, { t: W(82, 3), tc: "green", size: DS.type.caption });
  DS.vignette(S); }

// And Dave was already the right size.
{ const S = sc(83, 0, { cam: "push", focus: "960 600" }); DS.room(S, KITCHEN);
  kChair(S, 700, 800); const F = dave(S, 700, 800, "near", { s: 1.45, sit: true, look: 6, mood: "happy", float: true }); blanket(S, F, S.start);
  kTable(S, 820, 900, 720);
  const A = ant(S, 1270, 712, 0.5, { face: "smile", look: -3, dir: -1 });
  S.draw(circ(F.cx, F.hd[1] + 150, 250, 340), W(83, 5), 0, { c: DS.c("gold", 0), w: DS.w.near });
  card(S, "THE RIGHT SIZE", 1240, 170, { t: W(83, 5), tc: "green", size: DS.type.title });
  DS.vignette(S); }
