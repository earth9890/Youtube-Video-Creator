// look: still
// You Are Not Unlucky (1-min). Mystery: is Dave cursed? Wiseman's newspaper test. Illustrated stills, progressive changes on the spoken word.
const dave = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
const sam = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "curly", hairC: DS.c("ink"), outfitC: DS.c("orange") }, o));
const wiseman = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "short", hairC: DS.c("gray", 2), outfitC: DS.c("navy") }, o));
// four heart-shaped leaves, points meeting at the centre, plus a stem
const clover = (S, cx, cy, k, t, parent) => {
  const G = S.grp(parent);
  S.draw(smooth([[cx, cy], [cx + 14 * k, cy + 40 * k], [cx + 6 * k, cy + 78 * k]]), t, 0, { c: DS.c("green", 2), w: DS.w.mid, parent: G });
  [0, 90, 180, 270].forEach((a) => { const g = S.grp(G); g.setAttribute("transform", `rotate(${a} ${cx} ${cy})`); S.draw(heartPath(cx, cy - 34 * k, 0.9 * k), t, 0, { fill: DS.vol("green"), c: DS.line(), w: DS.w.detail, parent: g }); });
  return G;
};
// newspaper page: masthead, photo boxes, grey text rows; returns its rect
const news = (S, x, y, w, h, o = {}) => {
  const t = o.t ?? S.start;
  DS.drop(S, rect(x + 8, y + 10, w, h), { t });
  DS.shape(S, rect(x, y, w, h), "paper", { t, w: "detail", flat: true });
  if (o.head) { S.text(o.head, x + w / 2, y + 50, { size: DS.type.caption, t, c: DS.c("ink") }); S.draw(line([x + 20, y + 68], [x + w - 20, y + 68], 0), t, 0, { c: DS.c("ink"), w: DS.w.detail }); }
  (o.photos || []).forEach(([px, py, pw, ph]) => { DS.shape(S, rect(x + px, y + py, pw, ph), "sky", { t, w: "hair", flat: true }); S.draw(`M${x + px + 10} ${y + py + ph - 10} L${x + px + pw * 0.4} ${y + py + ph * 0.45} L${x + px + pw * 0.62} ${y + py + ph * 0.7} L${x + px + pw * 0.8} ${y + py + ph * 0.5} L${x + px + pw - 10} ${y + py + ph - 10} Z`, t, 0, { fill: DS.c("grass", 0), c: DS.c("grass", 2), w: DS.w.hair }); });
  (o.rows || []).forEach(([rx, ry, rw, n]) => { for (let i = 0; i < n; i++) S.draw(line([x + rx, y + ry + i * 22], [x + rx + rw * (i === n - 1 ? 0.6 : 1), y + ry + i * 22], 0), t, 0, { c: DS.c("gray", 1), w: DS.w.detail }); });
  return { x, y, w, h };
};
const cloud = (S, cx, cy, k, t, name = "gray") => { const g = S.grp(); [[-80, 12, 62], [0, -22, 84], [82, 6, 64], [36, 34, 62], [-34, 34, 60]].forEach(([dx, dy, r]) => S.fill(circ(cx + dx * k, cy + dy * k, r * k), t, 0.35, DS.c(name), 1, g)); S.fill(circ(cx - 20 * k, cy - 40 * k, 46 * k), t, 0.35, DS.c(name, 1), 0.8, g); return g; };
const rain = (S, cx, top, w, h, t) => { for (let i = 0; i < 9; i++) { const x = cx - w / 2 + (i * w) / 8, y = top + (i % 3) * 40; S.draw(line([x, y], [x - 14, y + h * 0.35], 0), t + i * 0.03, 0, { c: DS.c("blue", 1), w: DS.w.mid }); } };
const watch = (S, cx, cy, r, label, t, tc = "ink") => { DS.drop(S, circ(cx + 4, cy + 8, r), { t }); DS.shape(S, rrect(cx - 16, cy - r - 34, 32, 30, DS.r.xs), "gray", { t, w: "detail" }); DS.shape(S, circ(cx, cy, r), "white", { t, w: "mid", flat: true }); S.text(label, cx, cy + DS.type.body * 0.36, { size: DS.type.body, t, c: DS.c(tc, tc === "ink" ? 0 : 2) }); };
const table = (S, x, gy, w) => { DS.shadow(S, x + w / 2, gy, w); DS.shape(S, rrect(x, gy - 230, w, 40, DS.r.xs), "wood"); [x + 30, x + w - 50].forEach((lx) => DS.shape(S, rect(lx, gy - 190, 20, 190), "wood", { w: "mid" })); return gy - 230; };
const town = (S) => { [[120, 330], [300, 390], [1380, 300], [1560, 370], [1740, 320]].forEach(([x, top]) => DS.shape(S, rect(x, top, 150, 640 - top), "wall", { layer: "far", w: "far" })); };

const CUES = [[1, 0], [3, 0], [5, 0], [7, 0], [9, 0], [11, 0], [15, 0], [17, 0], [19, 0], [21, 0], [23, 0], [28, 0], [30, 0], [33, 0], [36, 0], [39, 0]];
const WIN = sceneWindows(CUES, 0.15);
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0  This is Dave. / Nothing good ever happens to Dave.
{ const S = sc(0, { cam: "push", focus: "900 600" }); DS.outdoor(S, { hy: 620, sky: "sky", ground: "gray", hills: "gray", sun: [1600, 170] }); town(S);
  const F = dave(S, 900, 930, "near", { mood: "flat", look: 0 });
  DS.card(S, "DAVE", 900, 200, { size: DS.type.body, t: W(1, 2) });
  cloud(S, 900, 410, 1.0, W(2, 0)); rain(S, 900, 470, 220, 260, W(2, 1));
  F.face(W(2, 1), "sad", 0);
  DS.plant(S, 1810, 1120, 1.0, -1); DS.vignette(S); }

// 1  His friend Sam gets every lucky break. / Dave hears about them.
{ const S = sc(1, { cam: "pull" }); DS.outdoor(S, { hy: 620, sky: "sky", ground: "gray", hills: "gray", sun: [1420, 170] }); town(S);
  const F = dave(S, 480, 930, "near", { mood: "sad", look: 6 });
  cloud(S, 480, 410, 0.8, S.start, "gray");
  sam(S, 1300, 930, "near", { mood: "happy", look: -6, pose: "armsUp", t: W(3, 2) });
  S.fill(circ(1300, 640, 300, 300), W(3, 5), 0.4, DS.c("gold", 1), 0.35);
  [[1480, 520], [1430, 370], [1170, 330], [1560, 660]].forEach(([x, y], i) => { DS.shape(S, rrect(x - 50, y - 30, 100, 60, DS.r.xs), "gold", { t: W(3, 5) + i * 0.1, w: "detail" }); S.text("WIN", x, y + 14, { size: DS.type.caption, t: W(3, 5) + i * 0.1, c: DS.c("ink") }); });
  DS.card(S, "SAM", 1300, 200, { size: DS.type.body, t: W(3, 2) });
  S.speech(860, 440, 210, 80, 1190, 560, W(4, 0), 0.25); S.text("...AND THEN I WON", 860, 458, { size: DS.type.caption, t: W(4, 0), c: DS.c("ink") });
  F.face(W(4, 1), "flat", 6); DS.vignette(S); }

// 2  So, is Dave cursed? // Dave buys a lucky charm.
{ const S = sc(2, { cam: "push", focus: "800 600" }); DS.room(S, { wall: "night", floor: "wood", window: false });
  const F = dave(S, 760, 960, "near", { s: 0.95, mood: "worried", look: 4 });
  DS.card(S, "CURSED?", 760, 220, { size: DS.type.title, t: W(5, 2) });
  F.setPose(W(6, 1), "point"); F.face(W(6, 1), "determined", 6);
  S.fill(circ(1180, 560, 170, 170), W(6, 3), 0.4, DS.c("gold", 1), 0.4);
  clover(S, 1180, 540, 1.6, W(6, 3));
  DS.card(S, "LUCKY CHARM", 1180, 800, { size: DS.type.small, t: W(6, 3) }); DS.vignette(S, 0.18); }

// 3  Psychologist Richard Wiseman tested lucky charms. / Zero effect.
{ const S = sc(3, { cam: "push" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  wiseman(S, 380, 960, "near", { mood: "flat", look: 6 });
  const top = table(S, 560, 960, 500);
  clover(S, 680, top - 70, 0.9, S.start);
  S.draw(arc(840, top - 75, 50, 10, 170), S.start, 0, { c: DS.c("gray", 2), w: DS.w.near * 2.2 }); // horseshoe, open side up
  [0.2, 0.4, 0.6, 0.8].forEach((f) => { const a = Math.PI * (10 + 160 * f) / 180; S.fill(circ(840 + Math.cos(a) * 50, top - 75 + Math.sin(a) * 50, 5), S.start, 0, DS.P.white[0], 1); });
  clover(S, 980, top - 70, 0.9, S.start);
  DS.card(S, "RICHARD WISEMAN", 560, 170, { size: DS.type.small, t: W(7, 1) });
  // luck before / after: identical bars
  S.draw(line([1200, 760], [1700, 760], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  DS.shape(S, rect(1260, 540, 160, 220), "purple", { t: W(7, 3), dir: "h" }); DS.shape(S, rect(1480, 540, 160, 220), "purple", { t: W(7, 5), dir: "h" });
  S.text("BEFORE", 1340, 810, { size: DS.type.caption, t: W(7, 3), c: DS.c("ink") }); S.text("AFTER", 1560, 810, { size: DS.type.caption, t: W(7, 5), c: DS.c("ink") });
  S.text("LUCK", 1450, 500, { size: DS.type.small, t: W(7, 3), c: DS.c("ink") });
  DS.card(S, "ZERO EFFECT", 1450, 330, { size: DS.type.body, t: W(8, 0), tc: "red" }); DS.vignette(S); }

// 4  A few felt unluckier, / and were glad to give it back.
{ const S = sc(4, { cam: "zoom", focus: "1000 600" }); DS.room(S, { wall: "wall", window: [1340, 170, 230, 230] });
  const F = DS.figure(S, 620, 960, "near", { s: 1.1, hair: "bun", hairC: DS.c("brown"), outfitC: DS.c("purple"), mood: "worried", look: 6, pose: "hold" });
  const top = table(S, 960, 960, 560);
  DS.shape(S, rect(1080, top - 200, 300, 200), "earth", { w: "mid" }); DS.shape(S, rect(1060, top - 230, 340, 40), "earth", { tone: 2, w: "mid" });
  S.text("RETURNS", 1230, top - 80, { size: DS.type.small, c: DS.c("ink") });
  const [hx, hy] = F.hand("R");
  const C = clover(S, hx, hy - 72, 0.9, S.start);
  S.move(C, W(10, 2), 0.6, { x: 1230 - hx, y: top - 300 - (hy - 72) }, "power2.inOut");
  DS.card(S, "FELT UNLUCKIER", 620, 220, { size: DS.type.small, t: W(9, 2) });
  F.face(W(10, 2), "happy", 6);
  DS.card(S, "RELIEVED", 1230, 330, { size: DS.type.small, t: W(10, 4), tc: "green" }); DS.vignette(S); }

// 5  "So I'm just born unlucky?" / Wiseman doubted it. / He gave lucky and unlucky volunteers a newspaper. / Count the photos.
{ const S = sc(5, { cam: "push" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  dave(S, 420, 960, "near", { mood: "sad", look: 6 });
  S.speech(470, 230, 300, 90, 470, 340, W(11, 0), 0.25); S.text("BORN UNLUCKY?", 470, 250, { size: DS.type.small, t: W(11, 0), c: DS.c("ink") });
  const top = table(S, 700, 960, 560);
  wiseman(S, 1520, 960, "near", { mood: "flat", look: -6, t: W(12, 0), pose: "pointL" });
  news(S, 780, top - 300, 400, 300, { t: W(13, 7), head: "THE DAILY", photos: [[24, 90, 160, 110], [210, 90, 160, 110], [24, 220, 100, 60]], rows: [[140, 230, 230, 3]] });
  DS.card(S, "COUNT THE PHOTOS", 1200, 200, { size: DS.type.body, t: W(14, 0), tc: "red" }); DS.vignette(S); }

// 6  Dave takes two minutes. / Lucky people, seconds.
{ const S = sc(6); DS.room(S, { wall: "glass", floor: "gray", window: false });
  const F = dave(S, 420, 960, "near", { mood: "worried", look: 6, pose: "hold" });
  const [hx, hy] = F.hand("R"); news(S, hx - 30, hy - 100, 230, 170, { photos: [[20, 30, 80, 60], [120, 30, 90, 60]], rows: [[20, 110, 190, 2]] });
  watch(S, 420, 340, 100, "2:00", W(15, 2), "red");
  DS.card(S, "UNLUCKY", 420, 140, { size: DS.type.small, t: W(15, 0) });
  S.draw(line([960, 120], [960, 900], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail });
  const G = sam(S, 1360, 960, "near", { mood: "smile", look: -4, pose: "hold", t: W(16, 0) });
  const [gx, gy] = G.hand("R"); news(S, gx - 30, gy - 100, 230, 170, { t: W(16, 0), photos: [[20, 30, 80, 60], [120, 30, 90, 60]], rows: [[20, 110, 190, 2]] });
  watch(S, 1360, 340, 100, "0:05", W(16, 2), "green");
  DS.card(S, "LUCKY", 1360, 140, { size: DS.type.small, t: W(16, 0) }); DS.vignette(S); }

// 7  Page two said, in two-inch letters: / stop counting, there are forty-three photographs.
{ const S = sc(7, { cam: "zoom", focus: "960 520" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  const N = news(S, 380, 120, 1160, 780, { head: "PAGE 2", photos: [[40, 100, 300, 200], [380, 100, 320, 200], [740, 100, 380, 200]], rows: [[40, 320, 660, 3]] });
  DS.shape(S, rect(N.x + 40, N.y + 400, N.w - 80, 340), "yellow", { t: W(17, 4), w: "detail", flat: true, tone: 1 });
  S.text("STOP COUNTING", 960, N.y + 540, { size: DS.type.display, t: W(18, 0), c: DS.c("red", 2) });
  S.text("THERE ARE 43 PHOTOGRAPHS", 960, N.y + 660, { size: DS.type.body, t: W(18, 2), c: DS.c("ink") });
  DS.vignette(S); }

// 8  Unlucky people tended to miss it. / Half a page.
{ const S = sc(8, { cam: "push", focus: "900 600" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  const N = news(S, 700, 260, 640, 470, { head: "PAGE 2", photos: [[24, 90, 180, 110], [230, 90, 180, 110], [436, 90, 180, 110]] });
  DS.shape(S, rect(N.x + 24, N.y + 230, N.w - 48, 210), "yellow", { w: "detail", flat: true, tone: 1 });
  S.text("STOP COUNTING", 1020, N.y + 330, { size: DS.type.body, c: DS.c("red", 2) });
  S.text("THERE ARE 43", 1020, N.y + 410, { size: DS.type.small, c: DS.c("ink") });
  const F = dave(S, 420, 960, "near", { s: 1.15, mood: "determined", look: 6 });
  S.draw(line([F.hd[0] + 40, F.hd[1]], [N.x + 120, N.y + 145], 0), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail, op: 0.6 });
  DS.card(S, "MISSED IT", 420, 200, { size: DS.type.body, t: W(19, 4), tc: "red" });
  S.draw(rrect(N.x + 10, N.y + 215, N.w - 20, 240, DS.r.md), W(20, 0), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "HALF A PAGE", 1020, 820, { size: DS.type.small, t: W(20, 0) }); DS.vignette(S); }

// 9  Halfway through, another ad: / tell the experimenter you saw this, and win two hundred and fifty dollars.
{ const S = sc(9, { cam: "zoom", focus: "960 520" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  const N = news(S, 380, 120, 1160, 780, { head: "PAGE 12", photos: [[40, 100, 260, 180], [40, 320, 260, 180], [40, 540, 260, 180]], rows: [[340, 110, 300, 4]] });
  DS.shape(S, rrect(N.x + 340, N.y + 230, 780, 500, DS.r.sm), "gold", { t: W(21, 2), w: "mid", tone: 1, flat: true });
  S.text("STOP COUNTING", N.x + 730, N.y + 330, { size: DS.type.title, t: W(21, 3), c: DS.c("ink") });
  S.text("TELL THE EXPERIMENTER", N.x + 730, N.y + 430, { size: DS.type.small, t: W(22, 0), c: DS.c("ink") });
  S.text("YOU SAW THIS", N.x + 730, N.y + 500, { size: DS.type.small, t: W(22, 3), c: DS.c("ink") });
  S.text("WIN $250", N.x + 730, N.y + 650, { size: DS.type.display, t: W(22, 7), c: DS.c("red", 2) });
  DS.vignette(S); }

// 10  Dave missed that too. / Still counting. / "So I look harder?" / "No." / Dave was busy counting.
{ const S = sc(10, { cam: "push", focus: "800 620" }); DS.room(S, { wall: "night", floor: "wood", window: false });
  const top = table(S, 560, 960, 900);
  news(S, 640, top - 180, 420, 180, { photos: [[20, 30, 90, 70], [130, 30, 90, 70]], rows: [[240, 40, 160, 4]] });
  DS.shape(S, rrect(1080, top - 120, 300, 120, DS.r.xs), "gold", { tone: 1, flat: true, w: "detail" }); S.text("WIN $250", 1230, top - 45, { size: DS.type.small, c: DS.c("red", 2) });
  const F = dave(S, 420, 960, "near", { s: 1.05, mood: "determined", look: 6, pose: "reach" });
  const [hx, hy] = F.hand("R"); S.magnifier(hx + 50, hy - 40, 50, S.start, 0);
  DS.shape(S, rect(1440, top - 150, 180, 150), "white", { flat: true, w: "detail" });
  [0, 1, 2, 3, 4, 5, 6, 7].forEach((i) => S.draw(line([1470 + (i % 4) * 30 + (i > 3 ? 0 : 0), top - 130 + (i > 3 ? 70 : 0)], [1470 + (i % 4) * 30, top - 80 + (i > 3 ? 70 : 0)], 0), (i < 4 ? S.start : W(24, 0)) + (i % 4) * 0.1, 0, { c: DS.c("ink"), w: DS.w.mid }));
  DS.card(S, "STILL COUNTING", 1530, 520, { size: DS.type.small, t: W(24, 0) });
  S.speech(480, 220, 280, 85, 470, 330, W(25, 0), 0.25); S.text("LOOK HARDER?", 480, 238, { size: DS.type.small, t: W(25, 0), c: DS.c("ink") });
  DS.card(S, "NO.", 960, 230, { size: DS.type.title, t: W(26, 0), tc: "red" }); DS.vignette(S, 0.18); }

// 11  Lucky people see what's there, / not just what they're looking for.
{ const S = sc(11, { cam: "pull" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  const B = { x: 700, y: 300 }; B.w = 520; B.h = 400;
  DS.shape(S, rrect(B.x - 20, B.y - 20, B.w + 40, B.h + 40, DS.r.xs), "wood", { w: "mid" }); DS.shape(S, rect(B.x, B.y, B.w, B.h), "earth", { tone: 1, flat: true, w: "detail" });
  [[30, 30], [190, 30], [350, 30], [30, 220]].forEach(([px, py]) => { DS.shape(S, rect(B.x + px, B.y + py, 140, 150), "sky", { flat: true, w: "hair" }); });
  DS.shape(S, rect(B.x + 190, B.y + 220, 300, 150), "gold", { tone: 1, flat: true, w: "detail" }); S.text("WIN $250", B.x + 340, B.y + 315, { size: DS.type.small, c: DS.c("red", 2) });
  const L = sam(S, 340, 960, "near", { mood: "smile", look: 6 });
  S.fill(`M${L.hd[0] + 40} ${L.hd[1]} L${B.x} ${B.y - 10} L${B.x} ${B.y + B.h + 10} Z`, W(28, 2), 0.4, DS.c("gold", 1), 0.45);
  const U = dave(S, 1580, 960, "near", { mood: "determined", look: -6 });
  S.fill(`M${U.hd[0] - 40} ${U.hd[1]} L${B.x + B.w} ${B.y + 60} L${B.x + B.w} ${B.y + 140} Z`, W(29, 2), 0.4, DS.c("gray", 2), 0.45);
  DS.card(S, "SEES WHAT'S THERE", 420, 170, { size: DS.type.small, t: W(28, 2), tc: "green" });
  DS.card(S, "ONLY PHOTOS", 1540, 170, { size: DS.type.small, t: W(29, 4) }); DS.vignette(S); }

// 12  Fair warning: / pop science, not a big trial. / But it's cheap to test.
{ const S = sc(12, { cam: "push" }); DS.room(S, { wall: "wall", window: [1340, 170, 230, 230] });
  const top = table(S, 560, 960, 800);
  DS.drop(S, rrect(746, top - 330, 220, 330, DS.r.xs)); DS.shape(S, rrect(740, top - 340, 220, 330, DS.r.xs), "green"); DS.shape(S, rect(760, top - 320, 180, 290), "paper", { flat: true, w: "detail" });
  S.text("LUCK", 850, top - 200, { size: DS.type.small, c: DS.c("ink") }); clover(S, 850, top - 110, 0.5, S.start);
  DS.card(S, "FAIR WARNING", 960, 160, { size: DS.type.body, t: W(30, 0) });
  DS.card(S, "POP SCIENCE", 850, 320, { size: DS.type.small, t: W(31, 0), tc: "red" });
  DS.shape(S, `M1160 ${top - 150} L1290 ${top - 150} L1340 ${top - 90} L1290 ${top - 30} L1160 ${top - 30} Z`, "green", { t: W(32, 2), w: "mid" });
  S.text("FREE", 1235, top - 72, { size: DS.type.small, t: W(32, 2), c: DS.P.white[0] });
  DS.plant(S, 1810, 1120, 0.9, -1); DS.vignette(S); }

// 13  Lucky volunteers broke routines. / One picked a colour before parties, / and only talked to people wearing it.
{ const S = sc(13, { cam: "push", focus: "800 600" }); DS.room(S, { wall: "dusk", floor: "wood", window: false });
  DS.frame(S, 1180, 170, 170, 130, "sky");
  [[1000, "blue"], [1230, "green"], [1460, "red"], [1690, "yellow"]].forEach(([x, c], i) => DS.figure(S, x, 820, "mid", { s: 1.1, hair: ["short", "bun", "curly", "messy"][i], hairC: DS.c(i % 2 ? "brown" : "ink"), outfitC: DS.c(c), mood: "flat", look: -4 }));
  const R = DS.figure(S, 760, 960, "near", { s: 1.1, hair: "messy", hairC: DS.c("brown"), outfitC: DS.c("red"), mood: "smile", look: 6 });
  const M = DS.figure(S, 420, 960, "near", { s: 1.1, hair: "short", hairC: DS.c("ink"), outfitC: DS.c("gray"), mood: "determined", look: 6 });
  S.thought(420, 300, 130, 90, 420, 420, W(34, 3), 0.3); DS.shape(S, circ(420, 300, 50), "red", { t: W(34, 3), w: "detail" });
  DS.card(S, "BROKE ROUTINES", 960, 130, { size: DS.type.small, t: W(33, 2) });
  M.face(W(35, 2), "happy", 6); R.face(W(35, 2), "happy", -6);
  S.speech(600, 470, 90, 60, 520, 560, W(35, 2), 0.25); S.text("HI", 600, 488, { size: DS.type.small, t: W(35, 2), c: DS.c("ink") });
  DS.card(S, "RED ONLY", 1460, 330, { size: DS.type.small, t: W(35, 4), tc: "red" }); DS.vignette(S); }

// 14  So tomorrow, change one routine. / New route, new seat. / Look up.
{ const S = sc(14, { cam: "pull" }); const O = DS.outdoor(S, { hy: 620, sky: "sky", sun: [1500, 180], path: [640, 1500] });
  DS.shape(S, `M960 1280 L1000 640 L1060 640 L1880 1280 Z`, "sand", { layer: "mid", flat: true, w: "detail" });
  DS.shadow(S, 820, 930, 60); DS.shape(S, rect(808, 520, 24, 410), "wood", { w: "mid" });
  DS.shape(S, `M700 560 L820 560 L820 620 L700 620 L670 590 Z`, "gray", { w: "detail" }); S.text("SAME", 752, 604, { size: DS.type.caption, c: DS.c("ink") });
  DS.shape(S, `M830 640 L980 640 L1010 670 L980 700 L830 700 Z`, "green", { t: W(37, 0), w: "detail" }); S.text("NEW", 905, 684, { size: DS.type.caption, t: W(37, 0), c: DS.P.white[0] });
  const F = dave(S, 1180, 930, "near", { mood: "determined", look: 4 });
  F.face(W(38, 0), "wow", 0);
  S.fill(circ(1330, 300, 120), W(38, 0), 0.4, DS.c("gold", 1), 0.4); // a kite: the thing you only see when you look up
  DS.shape(S, `M1330 220 L1390 300 L1330 380 L1270 300 Z`, "yellow", { t: W(38, 0), w: "detail" });
  S.draw(smooth([[1330, 380], [1300, 440], [1340, 500], [1300, 560]]), W(38, 0), 0, { c: DS.c("ink"), w: DS.w.detail });
  DS.card(S, "CHANGE ONE ROUTINE", 960, 150, { size: DS.type.body, t: W(36, 2) }); DS.vignette(S); }

// 15  Nothing good happens to Dave? / Two good things did, / in two-inch letters. / You are not unlucky. / You were just counting.
{ const S = sc(15, { cam: "zoom", focus: "900 560" }); DS.outdoor(S, { hy: 620, sky: "sky", ground: "gray", hills: "gray", sun: [1600, 170] }); town(S);
  const F = dave(S, 560, 930, "near", { mood: "flat", look: 6 });
  DS.shadow(S, 1230, 930, 700); [900, 1540].forEach((lx) => DS.shape(S, rect(lx, 820, 22, 110), "wood", { w: "mid" }));
  const N = news(S, 820, 300, 820, 560, { head: "THE DAILY", photos: [[30, 90, 220, 140], [30, 260, 220, 140]], rows: [[30, 430, 220, 4]] });
  DS.shape(S, rect(N.x + 280, N.y + 90, 510, 200), "yellow", { tone: 1, flat: true, w: "detail" }); S.text("STOP COUNTING", N.x + 535, N.y + 210, { size: DS.type.small, c: DS.c("red", 2) });
  DS.shape(S, rect(N.x + 280, N.y + 320, 510, 200), "gold", { tone: 1, flat: true, w: "detail" }); S.text("WIN $250", N.x + 535, N.y + 445, { size: DS.type.title, c: DS.c("red", 2) });
  S.draw(rrect(N.x + 266, N.y + 76, 538, 228, DS.r.md), W(40, 0), 0, { c: DS.c("green"), w: DS.w.near });
  S.draw(rrect(N.x + 266, N.y + 306, 538, 228, DS.r.md), W(40, 2), 0, { c: DS.c("green"), w: DS.w.near });
  F.face(W(40, 1), "wow", 6);
  F.face(W(42, 0), "happy", 6);
  DS.card(S, "YOU'RE NOT UNLUCKY", 960, 170, { size: DS.type.body, t: W(42, 0), tc: "green" }); DS.vignette(S); }
