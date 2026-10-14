// look: still
// You Are Not Lazy (1-min, ~67 s). Mystery: what dragged Dave away from the canvas? Illustrated stills, progressive changes on the spoken word.
const dave = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
const student = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.0, hair: "bun", hairC: DS.c("ink"), outfitC: DS.c("purple") }, o));
// four-point sparkle = "spotless"
const star = (S, cx, cy, k, t, layer = "near") => DS.shape(S, poly([[cx, cy - 40 * k], [cx + 10 * k, cy - 10 * k], [cx + 40 * k, cy], [cx + 10 * k, cy + 10 * k], [cx, cy + 40 * k], [cx - 10 * k, cy + 10 * k], [cx - 40 * k, cy], [cx - 10 * k, cy - 10 * k], [cx, cy - 40 * k]], 0), "gold", { t, layer, w: "detail", flat: true, tone: 1 });
// oven: white body, control strip, knobs, dark glass door with a gleam; x left, gy floor
const oven = (S, x, gy, w, h, o = {}) => {
  const L = o.layer || "near", t = o.t;
  DS.shadow(S, x + w / 2, gy, w * 1.1, { t });
  DS.shape(S, rrect(x, gy - h, w, h, DS.r.sm), "white", { t, layer: L });
  DS.shape(S, rect(x, gy - h, w, h * 0.16), "gray", { t, layer: L, tone: 1, flat: true, w: "detail" });
  [0.2, 0.4, 0.6, 0.8].forEach((f) => DS.shape(S, circ(x + w * f, gy - h * 0.92, h * 0.035), "ink", { t, layer: L, w: "hair" }));
  DS.shape(S, rrect(x + w * 0.12, gy - h * 0.8, w * 0.76, h * 0.035, DS.r.xs), "gray", { t, layer: L, w: "detail" });
  DS.shape(S, rrect(x + w * 0.12, gy - h * 0.7, w * 0.76, h * 0.55, DS.r.sm), "navy", { t, layer: L });
  if (o.clean) [[0.25, 0.18], [0.38, 0.14]].forEach(([f, k]) => S.draw(line([x + w * f, gy - h * 0.25], [x + w * (f + k), gy - h * 0.62], 0), t ?? S.start, 0, { c: DS.c("white", 0, L), w: DS.w.mid, op: 0.6 }));
  return { top: gy - h, cx: x + w / 2 };
};
// easel + canvas; returns the canvas box
const easel = (S, cx, gy, cw, ch, o = {}) => {
  const L = o.layer || "near", t = o.t, top = gy - ch - 260;
  DS.shadow(S, cx, gy, cw * 0.9, { t });
  [[cx - cw * 0.42, gy], [cx + cw * 0.42, gy], [cx, gy - 30]].forEach(([fx, fy]) => S.draw(line([cx, top - 40], [fx, fy], 0), t ?? S.start, 0, { c: DS.c("wood", 2, L), w: DS.w[DS.depth[L].w] }));
  DS.shape(S, rect(cx - cw / 2 - 20, top + ch + 6, cw + 40, 22), "wood", { t, layer: L });
  DS.drop(S, rect(cx - cw / 2 + 8, top + 10, cw, ch), { t });
  DS.shape(S, rect(cx - cw / 2, top, cw, ch), "white", { t, layer: L, w: "detail", flat: true });
  return { x: cx - cw / 2, y: top, w: cw, h: ch };
};
// the bad feeling: a small grey storm-cloud with a worried face
const feeling = (S, cx, cy, k, t, o = {}) => {
  const g = S.grp(), b = [[-1, 0.25], [-0.85, -0.25], [-0.45, -0.5], [0, -0.62], [0.45, -0.45], [0.85, -0.2], [1, 0.25], [0.5, 0.42], [0, 0.4], [-0.5, 0.42], [-1, 0.25]];
  DS.shape(S, smooth(b.map(([x, y]) => [cx + x * 150 * k, cy + y * 110 * k])), o.name || "gray", { t, parent: g });
  [-1, 1].forEach((d) => {
    S.draw(circ(cx + d * 38 * k, cy - 8 * k, 9 * k), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.hair, fill: DS.c("ink"), parent: g });
    S.draw(line([cx + d * 22 * k, cy - 32 * k], [cx + d * 56 * k, cy - 40 * k], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  });
  S.draw(smooth([[cx - 30 * k, cy + 34 * k], [cx - 10 * k, cy + 24 * k], [cx + 10 * k, cy + 34 * k], [cx + 30 * k, cy + 24 * k]]), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
  return g;
};
const desk = (S, x, gy, w, o = {}) => { DS.shadow(S, x + w / 2, gy, w, o); DS.shape(S, rrect(x, gy - 230, w, 40, DS.r.xs), "wood", o); [x + 30, x + w - 50].forEach((lx) => DS.shape(S, rect(lx, gy - 190, 20, 190), "wood", Object.assign({ w: "mid" }, o))); return gy - 230; };
const paper = (S, x, y, w, h, o = {}) => { DS.drop(S, rect(x + 6, y + 8, w, h), { t: o.t }); DS.shape(S, rect(x, y, w, h), "white", { t: o.t, w: "detail", flat: true }); [1, 2, 3].forEach((i) => S.draw(line([x + 24, y + h * 0.25 + i * h * 0.17], [x + w - 24, y + h * 0.25 + i * h * 0.17], 0), o.t ?? S.start, 0, { c: DS.c("sky", 0), w: DS.w.hair })); };
const brush = (S, F, t) => { const [hx, hy] = F.hand("L"); S.draw(line([hx + 10, hy + 10], [hx - 60, hy - 40], 0), t ?? S.start, 0, { c: DS.c("wood", 2), w: DS.w.mid }); DS.shape(S, circ(hx - 64, hy - 43, 9), "red", { t, w: "hair" }); };
const sponge = (S, x, y, t) => DS.shape(S, rrect(x - 30, y - 20, 60, 40, DS.r.xs), "yellow", { t, w: "detail" });
const cube = (S, cx, cy, k, t) => { DS.shape(S, rrect(cx - 60 * k, cy - 60 * k, 120 * k, 120 * k, DS.r.xs), "ink", { t }); ["red", "yellow", "blue", "green", "white", "orange", "blue", "red", "yellow"].forEach((c, i) => DS.shape(S, rrect(cx - 54 * k + (i % 3) * 37 * k, cy - 54 * k + Math.floor(i / 3) * 37 * k, 33 * k, 33 * k, DS.r.xs), c, { t, w: "hair", flat: true })); };
const gamepad = (S, cx, cy, k, t) => {
  DS.shape(S, rrect(cx - 110 * k, cy - 60 * k, 220 * k, 120 * k, DS.r.lg), "gray", { t });
  DS.shape(S, rrect(cx - 50 * k, cy - 42 * k, 100 * k, 70 * k, DS.r.xs), "sky", { t, w: "detail" });
  DS.shape(S, rect(cx - 92 * k, cy - 8 * k, 36 * k, 12 * k) + rect(cx - 80 * k, cy - 20 * k, 12 * k, 36 * k), "ink", { t, w: "hair", flat: true });
  [[72, -12], [88, 8]].forEach(([dx, dy]) => DS.shape(S, circ(cx + dx * k, cy + dy * k, 9 * k), "red", { t, w: "hair" }));
};
const mags = (S, x, y, t) => ["pink", "orange", "blue"].forEach((c, i) => DS.shape(S, rrect(x + i * 14, y - i * 22, 170, 24, DS.r.xs), c, { t, w: "detail" }));
const candle = (S, cx, base, k, t) => {
  S.fill(circ(cx, base - 230 * k, 220 * k), t ?? S.start, 0, DS.glow(DS.P.gold[1], 0.7));
  DS.shape(S, rrect(cx - 60 * k, base - 170 * k, 120 * k, 170 * k, DS.r.sm), "paper", { t });
  S.draw(line([cx, base - 170 * k], [cx, base - 190 * k], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.detail });
  DS.shape(S, smooth([[cx - 20 * k, base - 190 * k], [cx - 24 * k, base - 230 * k], [cx, base - 280 * k], [cx + 24 * k, base - 230 * k], [cx + 20 * k, base - 190 * k]]) + " Z", "orange", { t, w: "detail" });
  DS.shape(S, smooth([[cx - 9 * k, base - 194 * k], [cx - 10 * k, base - 220 * k], [cx, base - 244 * k], [cx + 10 * k, base - 220 * k], [cx + 9 * k, base - 194 * k]]) + " Z", "yellow", { t, w: "hair", flat: true });
};
const bar = (S, x, base, h, w, name, t, label) => { DS.shape(S, rect(x, base - h, w, h), name, { t, dir: "h" }); S.text(label, x + w / 2, base - h - 24, { size: DS.type.small, t, c: DS.c("ink") }); };
const sofa = (S, x, gy, w) => { DS.shadow(S, x + w / 2, gy, w); DS.shape(S, rrect(x + 20, gy - 330, w - 40, 200, DS.r.lg), "green"); DS.shape(S, rrect(x, gy - 150, w, 110, DS.r.md), "green"); [x - 10, x + w - 60].forEach((ax) => DS.shape(S, rrect(ax, gy - 230, 70, 190, DS.r.md), "green", { dir: "v" })); return gy - 150; };

const CUES = [[1, 0], [3, 0], [5, 0], [7, 0], [10, 0], [12, 0], [14, 0], [17, 0], [20, 0], [24, 0], [26, 0], [28, 0], [30, 0], [33, 0], [36, 0], [39, 0]];
const WIN = sceneWindows(CUES, 0.15);
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0  This is Dave. / Dave calls himself lazy.
{ const S = sc(0, { cam: "push", focus: "760 600" }); DS.room(S, { window: [1300, 170, 240, 240] });
  easel(S, 1420, 780, 200, 240, { layer: "mid" });
  DS.frame(S, 470, 200, 160, 120, "grass");
  dave(S, 700, 960, "near", { mood: "flat", look: 6 });
  DS.card(S, "DAVE", 700, 470, { size: DS.type.body, t: W(1, 2) });
  S.speech(1040, 300, 230, 90, 800, 560, W(2, 1), 0); S.text("\"I'M LAZY.\"", 1040, 320, { size: DS.type.small, t: W(2, 1), c: DS.c("ink") });
  DS.plant(S, 130, 1120, 0.9, 1); DS.vignette(S); }

// 1  Tonight, he finally sat down to paint. / Then he scrubbed the oven.
{ const S = sc(1, { cam: "pull" }); DS.room(S, { window: [1340, 150, 200, 200] });
  easel(S, 520, 960, 300, 360);
  const F = dave(S, 860, 960, "near", { mood: "worried", look: -6, pose: "reachL" }); brush(S, F);
  oven(S, 1260, 960, 380, 420);
  S.fadeOut(F.g, W(4, 0), 0.35);
  const G = dave(S, 1160, 960, "near", { mood: "determined", look: 8, pose: "reach", t: W(4, 2) });
  const [hx, hy] = G.hand("R"); sponge(S, hx + 20, hy, W(4, 2));
  [[1380, 700], [1420, 760], [1350, 790]].forEach(([x, y], i) => DS.shape(S, circ(x, y, 18 - i * 3), "glass", { t: W(4, 4), w: "hair" }));
  DS.vignette(S); }

// 2  Lazy people don't scrub ovens. / So what dragged Dave away?
{ const S = sc(2, { cam: "push", focus: "1000 600" }); DS.room(S, { window: false, wall: "wall" });
  const C = easel(S, 430, 800, 230, 280, { layer: "mid" });
  oven(S, 820, 960, 460, 500, { clean: true });
  [[900, 520], [1230, 600], [1180, 860]].forEach(([x, y], i) => star(S, x, y, 1 - i * 0.2, W(5, 3) + i * 0.1));
  const F = dave(S, 1480, 960, "near", { mood: "determined", look: -8, pose: "reachL" }); const [hx, hy] = F.hand("L"); sponge(S, hx - 10, hy, S.start);
  [[1465, 570], [1530, 590]].forEach(([x, y]) => S.drop(x, y, 0.8, S.start));
  DS.card(S, "LAZY?", 1050, 170, { size: DS.type.title, t: W(5, 0) });
  S.draw(line([920, 205], [1180, 135], 0), W(5, 2), 0, { c: DS.c("red"), w: DS.w.near });
  S.text("?", C.x + C.w / 2, C.y + C.h / 2 + 40, { size: DS.type.display, t: W(6, 2), c: DS.c("red") });
  DS.vignette(S); }

// 3  Suspect one: / his phone. / Dave locks it in a drawer.
{ const S = sc(3, { cam: "push" }); DS.room(S, { window: false, wall: "sky" });
  DS.card(S, "SUSPECT #1", 960, 160, { size: DS.type.body, t: W(7, 0), tc: "red" });
  const F = dave(S, 620, 960, "near", { mood: "determined", look: 8, pose: "hold" }); const [hx, hy] = F.hand("R");
  const ph = S.phone(hx + 20, hy - 60, 1.0, W(8, 1), 0, { screen: "feed" }); S.fadeOut(ph.g, W(9, 1), 0.3);
  DS.shadow(S, 1240, 960, 480);
  DS.shape(S, rect(1000, 600, 480, 360), "wood");
  [640, 790].forEach((y) => { DS.shape(S, rect(1030, y, 420, 130), "wood", { tone: 1, flat: true, w: "detail" }); DS.shape(S, rrect(1200, y + 55, 80, 18, DS.r.xs), "gray", { w: "detail" }); });
  S.padlock(1240, 690, 1.4, W(9, 1), 0); }

// 4  Then he alphabetises the spices. / "So I'm just lazy."
{ const S = sc(4, { cam: "zoom", focus: "1150 520" }); DS.room(S, { window: false, wall: "dusk", floor: "wood" });
  DS.shape(S, rect(820, 470, 900, 26), "wood");
  ["A", "B", "C", "D", "E", "F"].forEach((l, i) => { const x = 880 + i * 140; DS.shape(S, rrect(x - 45, 320, 90, 150, DS.r.sm), "glass", { t: W(10, 2) + i * 0.08, w: "detail" }); DS.shape(S, rect(x - 45, 300, 90, 30), ["red", "orange", "green", "yellow", "brown", "purple"][i], { t: W(10, 2) + i * 0.08, w: "detail" }); S.text(l, x, 420, { size: DS.type.caption, t: W(10, 2) + i * 0.08, c: DS.c("ink") }); });
  const F = dave(S, 560, 960, "near", { mood: "determined", look: 8, pose: "reach" }); F.face(W(11, 0), "sad", 0);
  { const [hx, hy] = F.hand("R"); DS.shape(S, rrect(hx - 10, hy - 75, 60, 100, DS.r.sm), "glass", { w: "detail" }); DS.shape(S, rect(hx - 10, hy - 90, 60, 22), "pink", { w: "detail" }); }
  S.speech(560, 230, 270, 90, 560, 450, W(11, 0), 0); S.text("\"I'M JUST LAZY.\"", 560, 250, { size: DS.type.small, t: W(11, 0), c: DS.c("ink") });
  DS.vignette(S); }

// 5  In 2001, Diane Tice and Roy Baumeister upset some students, / then gave them fifteen minutes to practise for a big test.
{ const S = sc(5, { cam: "push" }); DS.room(S, { window: false, wall: "glass", floor: "gray" });
  DS.card(S, "2001 · TICE & BAUMEISTER", 960, 150, { size: DS.type.small, t: W(12, 4) });
  const top = desk(S, 760, 960, 620);
  student(S, 560, 960, "near", { mood: "sad", look: 6 });
  S.cloud(560, 300, 0.75, W(12, 9), 0, { storm: true });
  S.timer(1500, 420, 110, W(13, 3), 0, { label: "15:00", c: DS.c("red") });
  paper(S, 940, top - 260, 260, 250, { t: W(13, 6) }); S.text("TEST", 1070, top - 200, { size: DS.type.small, t: W(13, 6), c: DS.c("red") });
  DS.vignette(S); }

// 6  Nearby: / a puzzle, a video game and magazines. / They wasted nearly fourteen minutes.
{ const S = sc(6, { cam: "pull" }); DS.room(S, { window: false, wall: "glass", floor: "gray" });
  const top = desk(S, 760, 960, 760);
  const F = student(S, 520, 960, "near", { mood: "sad", look: 6 });
  cube(S, 900, top - 80, 1.15, W(15, 1));
  gamepad(S, 1150, top - 80, 1.15, W(15, 3));
  mags(S, 1280, top - 30, W(15, 6));
  F.face(W(16, 1), "smile", 6);
  DS.card(S, "13.7 OF 15 MIN WASTED", 960, 170, { size: DS.type.body, t: W(16, 3), tc: "red" });
  DS.vignette(S); }

// 7  Then the trick: / some were told a scented candle had frozen their mood. / It was just a candle.
{ const S = sc(7, { cam: "zoom", focus: "1100 560" }); DS.room(S, { window: false, wall: "night", floor: "wood" });
  student(S, 560, 960, "near", { mood: "sad", look: 6 });
  S.cloud(560, 300, 0.55, S.start, 0, { storm: true });
  DS.shape(S, smooth([[-1, 0.25], [-0.85, -0.25], [-0.45, -0.5], [0, -0.62], [0.45, -0.45], [0.85, -0.2], [1, 0.25], [0.5, 0.42], [0, 0.4], [-0.5, 0.42], [-1, 0.25]].map(([x, y]) => [560 + x * 150 * 0.62, 300 + y * 110 * 0.62])), "glass", { t: W(18, 7) });
  const top = desk(S, 900, 960, 480);
  candle(S, 1140, top, 1.0, W(18, 5));
  DS.card(S, "\"YOUR MOOD IS FROZEN\"", 1140, 160, { size: DS.type.small, t: W(18, 7) });
  DS.card(S, "IT WAS JUST A CANDLE", 1140, 860, { size: DS.type.caption, t: W(19, 0) });
  DS.vignette(S, 0.18); }

// 8  If nothing can cheer you up, / why play the video game? / Time wasted: / under six minutes.
{ const S = sc(8, { cam: "push" }); DS.room(S, { window: false });
  gamepad(S, 400, 520, 1.3, S.start);
  S.draw(line([230, 380], [570, 660], 0), W(21, 3), 0, { c: DS.c("red"), w: DS.w.near });
  S.draw(line([780, 860], [1620, 860], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  bar(S, 880, 860, 548, 260, "red", W(22, 0), "13.7 MIN");
  bar(S, 1280, 860, 228, 260, "blue", W(23, 1), "5.7 MIN");
  S.text("MOOD CAN CHANGE", 1010, 920, { size: DS.type.caption, t: W(22, 0), c: DS.c("ink") });
  S.text("MOOD \"FROZEN\"", 1410, 920, { size: DS.type.caption, t: W(23, 1), c: DS.c("ink") });
  DS.card(S, "TIME WASTED", 1200, 160, { size: DS.type.body, t: W(22, 0) }); }

// 9  They weren't dodging work. / They were dodging a feeling.
{ const S = sc(9, { cam: "zoom", focus: "960 560" }); DS.room(S, { window: false, wall: "night", floor: "wood" });
  const C = easel(S, 1100, 960, 320, 380);
  dave(S, 520, 960, "near", { mood: "worried", look: 8 });
  feeling(S, 1100, C.y + C.h / 2 + 30, 1.25, W(25, 0));
  const nw = DS.card(S, "NOT THE WORK", 1100, 160, { size: DS.type.small, t: W(24, 0) }); S.fadeOut(nw.g, W(25, 2) - 0.3, 0.3);
  DS.card(S, "CULPRIT: A FEELING", 1100, 160, { size: DS.type.small, t: W(25, 2), tc: "red" });
  DS.vignette(S, 0.18); }

// 10  Dave's oven / was mood repair.
{ const S = sc(10, { cam: "push" }); DS.room(S, { window: [1360, 170, 220, 220] });
  oven(S, 860, 960, 440, 480, { clean: true });
  [[920, 560], [1240, 640]].forEach(([x, y]) => star(S, x, y, 0.9, S.start));
  dave(S, 560, 960, "near", { mood: "happy", look: 8 });
  DS.card(S, "MOOD REPAIR", 1080, 300, { size: DS.type.body, t: W(27, 1), tc: "green" });
  DS.vignette(S); }

// 11  "So I wait until I feel like painting?" / "No."
{ const S = sc(11); DS.room(S, { window: false });
  const seat = sofa(S, 380, 960, 560);
  dave(S, 560, seat, "near", { sit: true, mood: "flat", look: 8 });
  easel(S, 1440, 800, 220, 260, { layer: "mid" });
  S.speech(760, 240, 330, 100, 640, 450, W(28, 0), 0); S.text("WAIT TILL I FEEL LIKE IT?", 760, 258, { size: DS.type.caption, t: W(28, 0), c: DS.c("ink") });
  DS.card(S, "NO.", 1440, 170, { size: DS.type.title, t: W(29, 0), tc: "red" });
  DS.vignette(S); }

// 12  Carleton University psychologists beeped students at random for a week. / Once they started a dreaded task, / it felt less stressful.
{ const S = sc(12, { cam: "push" }); DS.room(S, { window: false, wall: "glass", floor: "gray" });
  DS.card(S, "TIM PYCHYL · CARLETON UNIVERSITY", 960, 150, { size: DS.type.small, t: W(30, 0) });
  const F = student(S, 430, 960, "near", { mood: "worried", look: 6, pose: "hold", outfitC: DS.c("orange") }); const [hx, hy] = F.hand("R");
  DS.shape(S, rrect(hx - 30, hy - 70, 80, 60, DS.r.xs), "ink", { t: W(30, 3) }); DS.shape(S, rect(hx - 20, hy - 60, 60, 26), "green", { t: W(30, 3), w: "hair", flat: true });
  S.burst(hx + 10, hy - 40, 60, 90, 5, W(30, 3), 0, { c: DS.c("red"), a0: -2.6, span: 1.6, w: DS.w.detail });
  const x0 = 800, x1 = 1680, y0 = 300, y1 = 820, xs = 1180;
  S.draw(line([x0, y0], [x0, y1], 0) + line([x0, y1], [x1, y1], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  S.text("STRESS", x0 + 120, y0 + 10, { size: DS.type.caption, c: DS.c("ink") });
  S.draw(smooth([[x0 + 20, 470], [x0 + 140, 430], [x0 + 260, 400], [xs, 380]]), W(30, 6), 0, { c: DS.c("red"), w: DS.w.near });
  S.draw(line([xs, y0 + 60], [xs, y1], 0), W(31, 2), 0, { c: DS.c("ink"), w: DS.w.detail });
  S.text("START", xs, y1 + 60, { size: DS.type.caption, t: W(31, 2), c: DS.c("ink") });
  S.draw(smooth([[xs, 380], [xs + 120, 520], [xs + 280, 650], [x1 - 20, 700]]), W(32, 2), 0, { c: DS.c("green"), w: DS.w.near }); }

// 13  Dave isn't lazy. / He scrubbed an oven / to dodge a feeling.
{ const S = sc(13, { cam: "pull" }); DS.room(S, { window: false });
  oven(S, 260, 960, 520, 560, { clean: true });
  [[340, 470], [690, 560]].forEach(([x, y]) => star(S, x, y, 1, W(34, 1)));
  dave(S, 1060, 960, "near", { mood: "smile", look: 6 });
  feeling(S, 1480, 720, 0.45, W(35, 3));
  DS.card(S, "NOT LAZY", 1060, 330, { size: DS.type.body, t: W(33, 2), tc: "green" });
  DS.vignette(S); }

// 14  So make the start too small to dread. / Tonight, two minutes, / one line.
{ const S = sc(14, { cam: "zoom", focus: "900 520" }); DS.room(S, { wall: "night", floor: "wood", window: [1450, 180, 200, 200] });
  const C = easel(S, 860, 960, 340, 400);
  const F = dave(S, 1240, 960, "near", { mood: "determined", look: -6, pose: "reachL" }); brush(S, F);
  S.timer(420, 440, 110, W(37, 1), 0, { label: "2:00", c: DS.c("green") });
  S.draw(smooth([[C.x + 50, C.y + C.h * 0.62], [C.x + C.w * 0.35, C.y + C.h * 0.45], [C.x + C.w * 0.62, C.y + C.h * 0.58], [C.x + C.w - 50, C.y + C.h * 0.4]]), W(38, 0), 0, { c: DS.c("red"), w: DS.w.near * 2 });
  DS.card(S, "TOO SMALL TO DREAD", 860, 150, { size: DS.type.small, t: W(36, 5) });
  DS.vignette(S, 0.16); }

// 15  You are not lazy. / The feeling is smaller than the oven.
{ const S = sc(15, { cam: "pull" }); DS.room(S, { wall: "night", floor: "wood", window: [1450, 180, 200, 200] });
  oven(S, 1380, 800, 300, 330, { layer: "mid", clean: true });
  const C = easel(S, 760, 960, 340, 400);
  S.draw(smooth([[C.x + 50, C.y + C.h * 0.62], [C.x + C.w * 0.35, C.y + C.h * 0.45], [C.x + C.w * 0.62, C.y + C.h * 0.58], [C.x + C.w - 50, C.y + C.h * 0.4]]), S.start, 0, { c: DS.c("red"), w: DS.w.near * 2 });
  const F = dave(S, 1120, 960, "near", { mood: "happy", look: -6, pose: "reachL" }); brush(S, F);
  const g = feeling(S, 1530, 330, 1.3, S.start);
  S.move(g, W(40, 3), 0.8, { scale: 0.3, svgOrigin: "1530 400" });
  DS.card(S, "YOU'RE NOT LAZY", 760, 150, { size: DS.type.body, t: W(39, 0), tc: "green" });
  DS.vignette(S, 0.16); }
