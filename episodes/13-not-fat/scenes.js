// look: v3
// You Are Not Fat (1-min trial, 63 s). Crossfades, ~3–5 s scenes; every gag drawn on its word.
const YF = "#ffd166", WATER = "#4a9fe0";
const dur = 0.6;
const hero = (S, x, gy, o = {}) => { const F = S.fig(x, gy, Object.assign({ s: 1.1, hair: "short", outfit: "tee", outfitC: "#2f6fd6" }, o)).draw(o.t ?? S.start, o.d ?? 0.6); F.face((o.t ?? S.start) + 0.6, o.mood || "flat", o.look || 0); if (o.pose) F.setPose((o.t ?? S.start) + 0.65, o.pose); return F; };
const you = (S, x, gy, o = {}) => hero(S, x, gy, Object.assign({ hair: "bun", hairC: "#5a3825", outfitC: "#8e5bb5" }, o));
const doc = (S, x, gy, o = {}) => hero(S, x, gy, Object.assign({ hair: "side", hairC: "#8a8a8a", outfit: "apron", outfitC: "#ffffff" }, o));
const lbl = (S, str, x, y, o = {}) => S.label(str, x, y, Object.assign({ t: S.start + 0.3, size: 78 }, o));
const mouth = (F) => [F.hd[0] + F.r * 0.35, F.hd[1] + F.r * 0.45];

// water gauge: tall tank, filled to `frac`
function tank(S, x, y, w, h, frac, t, o = {}) {
  const g = S.grp(o.parent);
  S.fill(rect(x, y + h * (1 - frac), w, h * frac), t + 0.2, 0.4, WATER, 0.9, g);
  S.draw(smooth(Array.from({ length: 9 }, (_, i) => [x + (w * i) / 8, y + h * (1 - frac) + (i % 2 ? -8 : 8)])), t + 0.4, 0.3, { w: 5, c: "#ffffff", parent: g });
  S.draw(rrect(x, y, w, h, 18), t, 0.4, { w: 8, parent: g });
  return g;
}
function bone(S, x, y, s, t, o = {}) {
  const g = S.grp(o.parent);
  [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([a, b]) => S.draw(circ(x + a * 70 * s, y + b * 18 * s, 22 * s), t, 0.25, { w: 6, fill: "#fbf6e9", parent: g }));
  S.draw(rect(x - 70 * s, y - 18 * s, 140 * s, 36 * s), t + 0.1, 0.25, { w: 6, fill: "#fbf6e9", parent: g });
  S.fill(rect(x - 66 * s, y - 14 * s, 132 * s, 28 * s), t + 0.3, 0.1, "#fbf6e9", 1, g);
  return g;
}
// atom: tiny nucleus, three tilted orbits, electrons; almost all empty
function atom(S, x, y, r, t, o = {}) {
  const g = S.grp(o.parent);
  [0, 60, 120].forEach((deg, i) => {
    const a = (deg * Math.PI) / 180, P = Array.from({ length: 33 }, (_, k) => { const u = (k / 32) * Math.PI * 2, ex = Math.cos(u) * r, ey = Math.sin(u) * r * 0.32; return [x + ex * Math.cos(a) - ey * Math.sin(a), y + ex * Math.sin(a) + ey * Math.cos(a)]; });
    S.draw(smooth(P), t + i * 0.12, 0.4, { w: 5, c: "#7d8597", parent: g });
    const u = 0.7 + i * 2, ex = Math.cos(u) * r, ey = Math.sin(u) * r * 0.32;
    S.draw(circ(x + ex * Math.cos(a) - ey * Math.sin(a), y + ex * Math.sin(a) + ey * Math.cos(a), 12), t + 0.4 + i * 0.1, 0.15, { w: 4, fill: WATER, parent: g });
  });
  S.draw(circ(x, y, 9), t + 0.1, 0.15, { w: 3, fill: RED, parent: g });
  return g;
}
function sugarCube(S, x, y, a, t, o = {}) { // (x,y) = front-bottom corner
  const g = S.grp(o.parent), h = a * 0.5;
  S.draw(poly([[x, y], [x - a, y - h], [x - a, y - h - a], [x, y - a], [x, y]], 1), t, 0.3, { w: 6, fill: "#e9e9e9", parent: g });
  S.draw(poly([[x, y], [x + a, y - h], [x + a, y - h - a], [x, y - a], [x, y]], 1), t + 0.1, 0.3, { w: 6, fill: "#d4d4d4", parent: g });
  S.draw(poly([[x, y - a], [x - a, y - h - a], [x, y - 2 * h - a], [x + a, y - h - a], [x, y - a]], 1), t + 0.2, 0.3, { w: 6, fill: "#ffffff", parent: g });
  for (let i = 0; i < 14; i++) S.fill(circ(x - a * 0.8 + rnd() * a * 1.6, y - a * 0.4 - rnd() * a * 0.9, 3), t + 0.4, 0.1, "#b5b5b5", 1, g);
  return g;
}
// a cute lump of fat: yellow blob with a face
function fatBlob(S, x, y, s, t, o = {}) {
  const g = S.grp(o.parent);
  S.draw(smooth([[x - 80 * s, y], [x - 70 * s, y - 55 * s], [x - 15 * s, y - 75 * s], [x + 45 * s, y - 65 * s], [x + 85 * s, y - 20 * s], [x + 70 * s, y + 35 * s], [x + 10 * s, y + 50 * s], [x - 55 * s, y + 40 * s], [x - 80 * s, y]]), t, 0.35, { w: 6, fill: YF, parent: g });
  [-1, 1].forEach((k) => S.fill(circ(x + k * 25 * s, y - 15 * s, 7 * s), t + 0.3, 0.1, INK, 1, g));
  S.draw(smooth(arcPts(x, y + 5 * s, 18 * s, 20, 160, 8)), t + 0.35, 0.15, { w: 4, parent: g });
  return g;
}
function balloon(S, x, y, r, t, o = {}) { // (x,y) = centre
  const g = S.grp(o.parent);
  S.draw(line([x, y + r + 12], [x + 10, y + r + 170], 0.2), t + 0.2, 0.3, { w: 4, c: "#555555", parent: g });
  S.draw(poly([[x - 10, y + r + 14], [x, y + r - 2], [x + 10, y + r + 14], [x - 10, y + r + 14]], 1), t + 0.15, 0.15, { w: 4, fill: "#f2b84b", parent: g });
  S.draw(circ(x, y, r * 0.92, r), t, 0.35, { w: 6, fill: YF, parent: g });
  S.draw(smooth(arcPts(x - r * 0.35, y - r * 0.35, r * 0.3, 200, 280, 6)), t + 0.3, 0.1, { w: 6, c: "#ffffff", parent: g });
  const eyes = S.grp(g);
  [-1, 1].forEach((k) => S.fill(circ(x + k * r * 0.28, y - r * 0.05, r * 0.08), t + 0.35, 0.1, INK, 1, eyes));
  S.draw(line([x - r * 0.18, y + r * 0.3], [x + r * 0.18, y + r * 0.3], 0), t + 0.4, 0.1, { w: 4, parent: g });
  return { g, eyes };
}
function tree(S, x, gy, s, t) {
  const g = S.grp();
  S.draw(rect(x - 28 * s, gy - 220 * s, 56 * s, 220 * s), t, 0.3, { w: 6, fill: "#8a5a3c", parent: g });
  [[-90, -260, 110], [80, -270, 115], [0, -360, 130]].forEach(([dx, dy, r], i) => S.draw(circ(x + dx * s, gy + dy * s, r * s), t + 0.15 + i * 0.1, 0.3, { w: 6, fill: "#6abb5c", parent: g }));
  return g;
}
const co2 = (S, x, y, s, t) => { const c = S.cloud(x, y, s, t, 0.3, { fill: "#e6e6ea" }); S.text("CO₂", x, y + 22 * s, { size: 64 * s, t: t + 0.2, parent: c.g }); return c.g; };

const CUES = [[1, 0], [4, 0], [6, 0], [9, 0], [12, 0], [14, 0], [16, 0], [19, 0], [22, 0], [24, 0], [28, 0], [31, 0], [34, 0]];
const WIN = sceneWindows(CUES, 0.15);
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0  You are not fat. / ~60 % water, some calcium, / and a lot of empty space.
{ const S = sc(0, { cam: "push" }); S.bg("flat");
  const F = you(S, 430, 860, { s: 1.45, mood: "flat", t: S.start });
  lbl(S, "NOT FAT", 430, 170, { t: W(1, 2), c: RED });
  tank(S, 760, 330, 170, 470, 0.6, W(2, 3)); lbl(S, "60% WATER", 845, 230, { t: W(2, 4), size: 64, c: "#2f6fd6" });
  bone(S, 1190, 420, 1.1, W(2, 6)); S.text("CALCIUM", 1190, 520, { size: 48, t: W(2, 6) + 0.2 });
  atom(S, 1560, 650, 210, W(3, 2)); lbl(S, "EMPTY SPACE", 1560, 330, { t: W(3, 3), size: 64 }); }

// 1  Squeeze the empty space out of every human alive, / and all eight billion of us fit in a sugar cube.
{ const S = sc(1); S.bg("flat");
  const G = S.grp();
  S.crowd(9, 220, 840, 120, 0.8, S.start, 0.6, { parent: G, face: "worried", dress: [{ outfitC: "#2f6fd6" }, { hair: "bun", outfitC: "#8e5bb5" }, { hair: "curly", outfitC: "#e07a5f" }, { hair: "spiky", outfitC: "#3f9e4a" }] });
  lbl(S, "SQUEEZE", 420, 200, { t: W(4, 0) + 0.2, c: RED });
  sugarCube(S, 1620, 820, 130, W(5, 6));
  S.move(G, W(5, 5), 0.9, { x: 900, y: 40, scale: 0.12, svgOrigin: "700 700" }, "power2.in");
  S.move(G, W(5, 5) + 0.85, 0.15, { opacity: 0 });
  lbl(S, "8 BILLION", 1060, 200, { t: W(5, 2), size: 90 });
  lbl(S, "SUGAR CUBE", 1560, 420, { t: W(5, 9), size: 64, c: "#2f6fd6" }); }

// 2  Fat isn't what you are. / It's what you're carrying, / stored energy waiting for a reason.
{ const S = sc(2); S.bg("day", { hy: 860 });
  const F = you(S, 640, 860, { s: 1.3, mood: "flat" });
  const pack = S.grp(F.g);
  S.draw(rrect(640 - 190, 860 - 340, 120, 170, 26), W(7, 2), 0.35, { w: 7, fill: YF, parent: pack });
  S.draw(line([640 - 80, 860 - 330], [640 - 10, 860 - 360], 0.1), W(7, 2) + 0.2, 0.15, { w: 7, parent: pack });
  S.battery(640 - 175, 860 - 280, 90, 0.85, W(8, 0), 0.4, { parent: pack });
  lbl(S, "NOT WHAT YOU ARE", 960, 160, { t: W(6, 1) });
  lbl(S, "STORED ENERGY", 1350, 330, { t: W(8, 0), size: 64, c: "#e07a5f" });
  F.walk(W(7, 0), S.end - W(7, 0) - 0.3, { x: 260 }); }

// 3  This is Dave. / Dave lost ten kilos of fat. / He'd like to report them missing.
{ const S = sc(3); S.bg("room", { window: false });
  const F = hero(S, 520, 790, { s: 1.25, mood: "flat" });
  lbl(S, "DAVE", 520, 230, { t: W(9, 2) });
  S.draw(rrect(380, 790, 280, 40, 10), W(10, 1), 0.3, { w: 6, fill: "#f4f4f4" });
  S.tag(520, 760, "-10 KG", W(10, 2), 0.3, { size: 44, tc: RED });
  F.face(W(10, 2) + 0.2, "worried", 6);
  const px = 1120, py = 300;
  S.draw(rect(px, py, 520, 560), W(11, 4) - 0.4, 0.35, { w: 7, fill: "#fbf6e9" });
  S.text("MISSING", px + 260, py + 105, { size: 96, t: W(11, 4) - 0.2, c: RED });
  fatBlob(S, px + 260, py + 300, 1.3, W(11, 4));
  S.text("10 KG · ANSWERS TO 'BELLY'", px + 260, py + 500, { size: 34, t: W(11, 5) }); }

// 4  Ask doctors and trainers, and most say: / burned off as heat.
{ const S = sc(4); S.bg("flat");
  doc(S, 620, 860, { s: 1.2, mood: "smile", t: W(12, 1) });
  const T = hero(S, 960, 860, { s: 1.2, hair: "spiky", hairC: "#222222", outfitC: "#e07a5f", mood: "smile", t: W(12, 3) });
  lbl(S, "MOST SAY", 800, 170, { t: W(12, 5) });
  S.speech(1460, 380, 230, 130, 1060, 500, W(13, 0), 0.3);
  S.flame(1340, 450, 0.8, W(13, 2), 0.3);
  S.text("HEAT", 1530, 410, { size: 74, t: W(13, 3), c: RED }); }

// 5  In twenty fourteen, physicist Ruben Meerman lost fifteen kilos himself, / and followed the atoms.
{ const S = sc(5, { cam: "push" }); S.bg("flat");
  const F = hero(S, 420, 860, { s: 1.2, hair: "curly", hairC: "#3a2a1a", outfit: "hoodie", outfitC: "#3f9e4a", mood: "determined", look: 6 });
  lbl(S, "2014", 420, 170, { t: W(14, 1), c: "#2f6fd6" });
  lbl(S, "RUBEN MEERMAN", 960, 170, { t: W(14, 4) });
  S.tag(420, 360, "-15 KG", W(14, 7), 0.3, { size: 44, tc: RED });
  S.magnifier(600, 520, 70, W(15, 1) - 0.3, 0.3, { parent: F.g });
  [[820, 540, "C"], [1010, 470, "O"], [1190, 560, "H"], [1380, 470, "C"], [1560, 540, "O"], [1740, 460, "?"]].forEach(([x, y, e], i) => {
    const t = W(15, 2) + i * 0.12;
    S.draw(circ(x, y, 44), t, 0.2, { w: 6, fill: i === 5 ? YF : "#ffffff" });
    S.text(e, x, y + 18, { size: 50, t: t + 0.1 });
    if (i) S.draw(line([x - 150, y - (i % 2 ? -50 : 60) / 2], [x - 50, y], 0.1), t, 0.15, { w: 4, c: "#9a9a9a" });
  });
  F.walk(W(15, 1), 1.0, { x: 120 }); }

// 6  Eight point four of Dave's ten kilos / leave through his mouth, / as carbon dioxide.
{ const S = sc(6); S.bg("flat");
  const F = hero(S, 520, 860, { s: 1.35, mood: "flat", look: 6 });
  lbl(S, "8.4 OF 10 KG", 960, 170, { t: W(16, 1), c: RED, size: 90 });
  const [mx, my] = mouth(F);
  F.face(W(17, 2), "wow", 6);
  [[880, 470, 0.55], [1180, 400, 0.75], [1520, 330, 0.95]].forEach(([x, y, s], i) => {
    const g = co2(S, x, y, s, W(18, 0) + i * 0.25);
    tl.from(g, { x: mx - x, y: my - y, scale: 0.2, transformOrigin: "50% 50%", duration: 0.6, ease: "power2.out", immediateRender: false }, W(18, 0) + i * 0.25);
  });
  lbl(S, "OUT THE MOUTH", 1300, 700, { t: W(17, 2), size: 64 }); }

// 7  The rest leaves as water, / as sweat, pee, / and tears.
{ const S = sc(7); S.bg("flat");
  const F = hero(S, 700, 860, { s: 1.35, mood: "flat" });
  lbl(S, "1.6 KG WATER", 960, 170, { t: W(19, 3), c: "#2f6fd6" });
  [[600, 420], [820, 400], [860, 480]].forEach(([x, y], i) => S.drop(x, y, 1.6, W(20, 1) + i * 0.08));
  S.tag(1250, 420, "SWEAT", W(20, 1), 0.25, { size: 44 });
  S.drop(1250, 560, 2.4, W(20, 2)); S.tag(1250, 660, "PEE", W(20, 2), 0.25, { size: 44, fill: "#fff6bf" });
  F.face(W(21, 1), "cry", 0); S.tag(1600, 540, "TEARS", W(21, 1), 0.25, { size: 44, fill: "#d9efff" }); }

// 8  Dave breathed out his belly. / Some of it is now part of a tree.
{ const S = sc(8); S.bg("day", { hy: 860 });
  const F = hero(S, 460, 860, { s: 1.3, mood: "wow", look: 6 });
  const [mx, my] = mouth(F);
  const puff = fatBlob(S, 700, 420, 1.1, W(22, 2));
  tl.from(puff, { x: mx - 700, y: my - 420, scale: 0.15, transformOrigin: "50% 50%", duration: 0.7, ease: "power2.out", immediateRender: false }, W(22, 2));
  lbl(S, "BREATHED OUT", 700, 190, { t: W(22, 1) });
  tree(S, 1480, 860, 1.25, S.start + 0.2);
  S.move(puff, W(23, 3), 1.0, { x: 780, y: -40, scale: 0.4, opacity: 0, transformOrigin: "50% 50%" }, "power1.inOut");
  lbl(S, "NOW A TREE", 1480, 190, { t: W(23, 6), c: "#3f9e4a" }); }

// 9  And the fat cells don't leave at all. / Lose weight, and they just shrink, / like deflated balloons, / waiting.
{ const S = sc(9); S.bg("flat");
  lbl(S, "FAT CELLS STAY", 960, 170, { t: W(24, 2) });
  const B = [[560, 520], [960, 480], [1360, 520]].map(([x, y], i) => ({ x, y, ...balloon(S, x, y, 150, S.start + 0.3 + i * 0.15) }));
  B.forEach((b, i) => S.move(b.g, W(25, 5) + i * 0.1, 0.8, { scale: 0.62, rotation: i - 1 ? 8 : -8, svgOrigin: `${b.x} ${b.y + 300}` }));
  lbl(S, "SHRINK", 960, 300, { t: W(25, 5), c: RED, size: 64 });
  B.forEach((b) => { S.move(b.eyes, W(27, 0), 0.25, { x: -14 }); S.move(b.eyes, W(27, 0) + 0.45, 0.25, { x: 14 }); }); }

// 10  "So I just breathe faster?" / "No." / Breathing harder only makes you dizzy.
{ const S = sc(10); S.bg("room", { window: false });
  const F = hero(S, 640, 790, { s: 1.25, mood: "wow", look: 4 });
  S.speech(560, 200, 270, 100, 620, 330, W(28, 0), 0.3); S.text("BREATHE FASTER?", 560, 220, { size: 52, t: W(28, 1) });
  const D = doc(S, 1380, 790, { s: 1.25, mood: "flat", look: -6, t: S.start + 0.2 });
  S.speech(1500, 220, 150, 90, 1410, 330, W(29, 0) - 0.15, 0.2); S.text("NO.", 1500, 245, { size: 80, t: W(29, 0), c: RED });
  F.face(W(30, 3), "tired", 0); S.tilt(-3, W(30, 3), 0.4);
  [0, 1, 2].forEach((i) => S.burst(640 + (i - 1) * 90, 400 - (i === 1 ? 30 : 0), 6, 22, 5, W(30, 4) + i * 0.08, 0.2, { c: YEL, w: 6 }));
  lbl(S, "DIZZY", 1020, 420, { t: W(30, 3), c: RED }); }

// 11  Breath can only carry out / what your muscles already burned. / "Fair."
{ const S = sc(11); S.bg("flat");
  S.dumbbell(420, 520, 1.3, S.start + 0.1, 0.4);
  S.flame(420, 430, 1.0, W(32, 4), 0.3); S.tag(420, 700, "MUSCLE BURNS", W(32, 3), 0.3, { size: 44 });
  S.arrow(640, 520, 1000, 520, W(31, 2), 0.4, { c: INK, w: 9 });
  co2(S, 1240, 520, 0.8, W(31, 3));
  S.tag(1240, 700, "BREATH CARRIES", W(31, 3), 0.3, { size: 44 });
  lbl(S, "BURN FIRST", 960, 170, { t: W(32, 3), c: RED });
  const F = hero(S, 1680, 860, { s: 1.0, mood: "flat", t: W(33, 0) - 0.5, d: 0.4 });
  S.speech(1680, 360, 130, 80, 1670, 470, W(33, 0), 0.2); S.text("FAIR.", 1680, 380, { size: 60, t: W(33, 0) + 0.1 }); }

// 12  So, / you are not fat. / You're water, empty space, / and a little stored energy / you're slowly breathing back out.
{ const S = sc(12, { cam: "pull" }); S.bg("day", { hy: 860 });
  const F = you(S, 760, 860, { s: 1.45, mood: "smile", t: S.start });
  lbl(S, "YOU ARE NOT FAT", 960, 160, { t: W(35, 0), size: 84 });
  tank(S, 300, 420, 140, 380, 0.6, W(36, 1)); S.text("WATER", 370, 860, { size: 44, t: W(36, 1) + 0.2 });
  atom(S, 1300, 420, 120, W(36, 2)); S.text("EMPTY SPACE", 1300, 590, { size: 44, t: W(36, 3) });
  const pack = S.grp(F.g);
  S.draw(rrect(760 - 220, 860 - 400, 130, 180, 26), W(37, 2), 0.35, { w: 7, fill: YF, parent: pack });
  S.battery(760 - 205, 860 - 340, 100, 0.6, W(37, 3), 0.3, { parent: pack });
  tree(S, 1620, 860, 0.9, S.start + 0.3);
  const [mx, my] = mouth(F);
  [0, 1, 2].forEach((i) => { const t = W(38, 2) + i * 0.35, g = S.cloud(mx + 110, my - 20, 0.32, t, 0.2, { fill: "#f0f0f3" }); S.move(g.g, t, 1.8, { x: 560 - i * 60, y: -160 + i * 40 }, "power1.out"); S.move(g.g, t + 1.3, 0.5, { opacity: 0 }); }); }
