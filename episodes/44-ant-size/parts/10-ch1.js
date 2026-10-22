
// ---------- shared scene helpers ----------
const END = (c) => CLIP(c)[1];
const tiny = (S, x, gy, o = {}) => dave(S, x, gy, "near", Object.assign({ s: 0.8 }, o)); // Dave at five millimetres: a small figure against big props
const COAT = { s: 1.1, hair: "side", hairC: DS.c("ink", 1), outfitC: DS.c("white", 2), tieC: "navy", specs: true };
// both arms straight up, hands together over the head, to hold something overhead (rice rests on the hands)
const HOLD = { armL: [[-30, -70], [-28, -160]], armR: [[30, -70], [28, -160]] };
const riceUp = (S, F, k, parent, t) => rice(S, F.cx, F.sh[1] + 10 * F.s - 160 * F.s - 24 * k, k, { rot: -4, parent, t });
const ghost = (F, a = 0.2) => { F.all.setAttribute("opacity", a); return F; };
const qCard = (S, t, o = {}) => card(S, "?", o.x ?? 1500, o.y ?? 300, { t, tc: o.tc || "red", size: DS.type.title });
// ===================== 1. Five millimetres =====================
// Dave has just shrunk himself to five millimetres tall. He's standing on the breakfast table, next to a toast crumb bigger than his head.
{ const S = sc(1, 0, { cam: "push", focus: "900 640" }); tbl(S, DS.room(S, TBL));
  const F = tiny(S, 700, 940, { look: 6, mood: "wow" });
  crumb(S, 1200, 940, 1.35);
  card(S, "5 MM TALL", 700, 560, { t: W(1, 6) });
  card(S, "TOAST CRUMB", 1200, 640, { t: W(1, 18), tc: "red" });
  DS.vignette(S); }

// That's three hundred and fifty times shorter than this morning, about the size of a black garden ant.
{ const S = sc(2, 0, { cam: "push", focus: "960 620" }); tbl(S, DS.room(S, TBL));
  const G = ghost(dave(S, 280, 1300, "near", { s: 3.6, mood: "smile", look: 3 }), 0.18);
  const F = tiny(S, 820, 940, { look: 5, mood: "flat" });
  const A = ant(S, 1330, 940, 1.15, { face: "smile", look: -3, dir: -1 }); A.walkIn(W(2, 11), 1.8, 760);
  card(S, "350× SHORTER", 960, 190, { t: W(2, 1) });
  card(S, "THIS MORNING", 280, 440, { t: W(2, 8), size: DS.type.caption });
  card(S, "ANT SIZE", 1330, 640, { t: W(2, 15), tc: "red" });
  DS.vignette(S); }

// So what would really happen if you shrank to the size of an ant? The shrink ray needs until dinner to recharge, so Dave is about to find out.
{ const S = sc(3, 0, { cam: "push", focus: "900 620" }); tbl(S, DS.room(S, TBL));
  const R = ray(S, 520, 960, 1.35, { level: 0.08, c: "orange" }); R.charge(W(3, 17), CLIP(3)[1] - W(3, 17) - 0.5, 0.08, 0.2);
  const F = tiny(S, 1350, 940, { look: -6, mood: "worried" });
  card(S, "WHAT WOULD REALLY HAPPEN?", 960, 190, { t: W(3, 1) });
  card(S, "SHRINK RAY", 520, 600, { t: W(3, 15), size: DS.type.caption });
  card(S, "RECHARGING UNTIL DINNER", 960, 330, { t: W(3, 18), tc: "red", size: DS.type.caption });
  DS.vignette(S); }

// Dave has seen the films, so he's made a list of dangers. Being too weak. Falling off things. Getting stepped on.
{ const S = sc(4, 0, { cam: "push", focus: "1100 560" }); tbl(S, DS.room(S, TBL));
  reel(S, 400, 360, 0.7, { t: W(4, 3) });
  dangerList(S, 1260, 540, 0.95, { rows: [W(4, 12), W(4, 15), W(4, 18)] });
  const F = tiny(S, 560, 960, { s: 1.0, look: 6, mood: "determined", pose: "hold" });
  DS.vignette(S); }

// He's underlined stepped on three times.
{ const S = sc(5, 0, { cam: "push", focus: "1100 560" }); tbl(S, DS.room(S, TBL));
  dangerList(S, 1260, 540, 0.95, { under: W(5, 1) });
  const F = tiny(S, 560, 960, { s: 1.0, look: 6, mood: "determined", pose: "point" });
  card(S, "3×", 560, 400, { t: W(5, 4), tc: "red", size: DS.type.title });
  DS.vignette(S); }

// Inside his very small head, Dave's very small brain has a different list.
{ const S = sc(6, 0, { cam: "push", focus: "1000 560" }); tbl(S, DS.room(S, TBL));
  const F = tiny(S, 560, 960, { s: 1.4, look: 4, mood: "flat" });
  const g = S.grp(); S.thought(1260, 470, 420, 290, 800, 740, S.start, 0.3, { parent: g });
  const B = brainy(S, 1160, 700, 1.05, { face: "tired", armL: "hip", parent: g });
  paperR(S, 1330, 400, 190, 250, { parent: g }); lines(S, 1350, 450, 150, 4, undefined, 40, g, DS.c("red", 1));
  fadeG(S, g, W(6, 5));
  card(S, "A DIFFERENT LIST", 1260, 190, { t: W(6, 8) });
  DS.vignette(S); }

// "Getting stepped on is the least of your problems, Dave." (Brain)
{ const S = sc(7, 0, { cam: "push", focus: "1000 560" }); tbl(S, DS.room(S, TBL));
  const F = tiny(S, 760, 960, { s: 1.4, look: 3, mood: "worried" });
  const top = 960 - 1.4 * 309 - 70, B = brainy(S, 760, top + 6, 0.95, { face: "stern", armR: "stop", armL: "hip" }); B.enter(W(7, 0) - 0.2, 0, 60, 0.5); B.talk(W(7, 0), END(7)); B.face(W(7, 5), "tired");
  card(S, "THE LEAST OF YOUR PROBLEMS", 1350, 420, { t: W(7, 5), tc: "red", size: DS.type.small });
  DS.vignette(S); }

// By lunchtime, one drop of water could hold him prisoner. By evening, his own body heat is running away, and he can't see where he's going.
{ const S = sc(8, 0, { cam: "push", focus: "960 560" }); DS.room(S, { wall: "earth", floor: "wood", window: false });
  [[420, "BY LUNCH", W(8, 0)], [960, "BY EVENING", W(8, 10)], [1500, "AND…", W(8, 19)]].forEach(([x, hd, t], i) => {
    const p = panel(S, x, 540, 480, 560, T0(S), "white"); fadeG(S, p, t);
    const ig = S.grp(); fadeG(S, ig, t + 0.2);
    S.text(hd, x, 330, { size: DS.type.small, c: DS.c("red", 2), t: T0(S), parent: ig });
    if (i === 0) { dome(S, x, 660, 150, 190, { parent: ig }); S.text("1 DROP", x, 780, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: ig }); }
    if (i === 1) { [-70, 0, 70].forEach((dx) => S.draw(`M${x + dx} 640 Q${x + dx + 26} 590 ${x + dx} 540 Q${x + dx - 26} 490 ${x + dx} 440`, S.start, 0, { c: DS.c("red", 0), w: DS.w.near, parent: ig })); thermo(S, x, 600, 160, 0.12, { c: "sky", parent: ig }); S.text("HEAT LEAKS", x, 800, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: ig }); }
    if (i === 2) { S.draw(circ(x, 540, 120, 70), S.start, 0, { fill: DS.P.white[0], c: DS.P.ink[0], w: DS.w.near, parent: ig }); S.draw(circ(x, 540, 38), S.start, 0, { fill: DS.c("blue", 0), c: DS.P.ink[0], w: DS.w.mid, parent: ig }); S.text("?", x, 700, { size: DS.type.display, c: DS.c("red", 2), t: T0(S), parent: ig }); S.text("CAN'T SEE", x, 810, { size: DS.type.small, c: DS.P.ink[0], t: T0(S), parent: ig }); }
  });
  DS.vignette(S); }

// Physicists say shrink rays are impossible, so let's pretend every part of Dave shrank evenly, and not tell the physicists.
{ const S = sc(9, 0, { cam: "push", focus: "1000 600" }); tbl(S, DS.room(S, TBL));
  [1180, 1400, 1620].forEach((x) => who(S, x, 860, "mid", Object.assign({}, COAT, { s: 1.0, pose: "cross", mood: "flat", look: -5 })));
  card(S, "PHYSICISTS", 1400, 330, { t: W(9, 0), size: DS.type.caption });
  const R = ray(S, 540, 900, 0.9, { level: 0.1, c: "orange" });
  stamp(S, 540, 560, "IMPOSSIBLE", W(9, 5), "red", { size: DS.type.small });
  const F = tiny(S, 880, 960, { s: 1.0, look: 4, mood: "smile", pose: "think" });
  card(S, "SHH", 880, 540, { t: W(9, 15), tc: "red", size: DS.type.caption });
  DS.vignette(S); }
