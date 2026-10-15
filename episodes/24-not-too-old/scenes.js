// look: still
// You Are Not Too Old (1-min, 73 s). Mystery: did Dave, forty, miss his peak? Illustrated stills, progressive changes on the spoken word.
const dave = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
const tache = (S, F, name, t) => S.draw(smooth([[F.hd[0] - 0.32 * F.r, F.hd[1] + 0.34 * F.r], [F.hd[0], F.hd[1] + 0.24 * F.r], [F.hd[0] + 0.32 * F.r, F.hd[1] + 0.34 * F.r]]), t, 0, { c: DS.c(name, 2), w: DS.w.near });
// Colonel Sanders: old (white hair, goatee, glasses, white suit) or at forty (dark hair, moustache, apron)
const colonel = (S, x, gy, layer, o = {}) => {
  const old = o.old !== false, t = o.t ?? S.start;
  const F = DS.figure(S, x, gy, layer, Object.assign(old ? { s: 1.1, hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("white", 2) } : { s: 1.1, hair: "side", hairC: DS.c("brown", 2), outfit: "apron", outfitC: DS.c("white", 0) }, o));
  tache(S, F, old ? "gray" : "brown", t);
  if (old) {
    DS.shape(S, `M${F.hd[0] - 0.2 * F.r} ${F.hd[1] + 0.66 * F.r} L${F.hd[0] + 0.2 * F.r} ${F.hd[1] + 0.66 * F.r} L${F.hd[0]} ${F.hd[1] + 1.12 * F.r} Z`, "white", { t, w: "detail", flat: true });
    S.draw(circ(F.hd[0] - 0.34 * F.r, F.hd[1] - 0.08 * F.r, 0.3 * F.r) + circ(F.hd[0] + 0.34 * F.r, F.hd[1] - 0.08 * F.r, 0.3 * F.r), t, 0, { c: DS.c("ink"), w: DS.w.detail });
  }
  return F;
};
// acoustic guitar, body centre (cx, cy), neck rotated by ang degrees
const guitar = (S, cx, cy, k, ang, o = {}) => {
  const g = S.grp(), t = o.t ?? S.start, half = [[0, -100], [40, -94], [58, -60], [50, -22], [46, 4], [72, 34], [84, 80], [70, 120], [34, 140], [0, 144]];
  const pts = [...half, ...half.slice(0, -1).reverse().map(([x, y]) => [-x, y])].map(([x, y]) => [cx + x * k, cy + y * k]);
  DS.shape(S, rrect(cx - 13 * k, cy - 330 * k, 26 * k, 250 * k, DS.r.xs), "brown", { t, parent: g });
  DS.shape(S, rrect(cx - 22 * k, cy - 390 * k, 44 * k, 70 * k, DS.r.xs), "brown", { t, parent: g });
  DS.shape(S, smooth(pts) + " Z", "orange", { t, parent: g });
  DS.shape(S, circ(cx, cy + 4 * k, 24 * k), "brown", { t, parent: g, w: "detail", flat: true });
  DS.shape(S, rrect(cx - 30 * k, cy + 82 * k, 60 * k, 14 * k, DS.r.xs), "brown", { t, parent: g, w: "detail" });
  [-6, 0, 6].forEach((dx) => S.draw(line([cx + dx * k, cy - 325 * k], [cx + dx * k, cy + 88 * k], 0), t, 0, { c: DS.c("white", 2), w: DS.w.hair, parent: g }));
  g.setAttribute("transform", `rotate(${ang} ${cx} ${cy})`);
  return g;
};
const receipt = (S, x, y, k, o = {}) => {
  const g = S.grp(), w = 90 * k, h = 130 * k, z = [];
  for (let i = 0; i <= 6; i++) z.push(`L${x + w - (w * i) / 6} ${y + h + (i % 2 ? 10 * k : 0)}`);
  DS.shape(S, `M${x} ${y} H${x + w} V${y + h} ${z.join(" ")} Z`, "white", { t: o.t, parent: g, w: "detail", flat: true });
  [0.25, 0.45, 0.65].forEach((f) => S.draw(line([x + 14 * k, y + h * f], [x + w - 14 * k, y + h * f], 0), o.t ?? S.start, 0, { c: DS.c("gray"), w: DS.w.hair, parent: g }));
  return g;
};
const chalkBoard = (S) => { DS.drop(S, rect(420 + 8, 130 + 10, 1080, 540)); DS.shape(S, rrect(420, 130, 1080, 540, DS.r.sm), "wood", { layer: "mid" }); DS.shape(S, rect(444, 154, 1032, 492), "white", { layer: "mid", w: "detail", flat: true }); };
const AX = (a) => 500 + (a - 10) * 13.5, BASE = 590;
const axis = (S) => { S.draw(line([480, BASE], [1460, BASE], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid }); [20, 40, 60, 80].forEach((a) => S.text(String(a), AX(a), BASE + 42, { size: DS.type.caption, c: DS.c("ink") })); };
const hill = (S, age, h, wd, name, t, tone = 0) => DS.shape(S, smooth([[AX(age - wd), BASE], [AX(age - wd * 0.45), BASE - h * 0.5], [AX(age), BASE - h], [AX(age + wd * 0.45), BASE - h * 0.5], [AX(age + wd), BASE]]) + " Z", name, { t, layer: "mid", w: "detail", tone, dir: "v" });
const balls = (S, cx, cy, k, t) => [[-60, 10], [0, -40], [60, 10]].forEach(([dx, dy], i) => DS.shape(S, circ(cx + dx * k, cy + dy * k, 18 * k), ["orange", "yellow", "orange"][i], { t, w: "detail" }));
const head = (S, cx, cy, k, t) => { DS.shape(S, circ(cx, cy, 170 * k, 190 * k), "white", { t }); S.brain(cx + 10 * k, cy - 20 * k, 0.9 * k, t, 0.3); };

const CUES = [[1, 0], [6, 0], [9, 0], [11, 0], [14, 0], [16, 0], [17, 0], [21, 0], [24, 0], [25, 0], [26, 0], [29, 0], [34, 0], [38, 0], [40, 0]];
const WIN = sceneWindows(CUES, 0.15);
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0  This is Dave. / Forty, / and he just bought his first guitar. / He kept the receipt. / Just in case.
{ const S = sc(0, { cam: "push", focus: "960 600" }); DS.room(S, { window: [1300, 170, 240, 240] });
  DS.frame(S, 420, 180, 150, 120, "grass");
  const F = dave(S, 760, 960, "near", { mood: "smile", look: 6, pose: "hold", armL: [[-48, 0], [-86, -50]] });
  const [hx, hy] = F.hand("R"), [lx, ly] = F.hand("L");
  guitar(S, hx + 30, hy + 10, 0.85, 52, { t: W(3, 5) });
  DS.card(S, "DAVE, 40", 760, 230, { size: DS.type.body, t: W(2, 0) });
  receipt(S, lx - 50, ly - 120, 1.0, { t: W(4, 3) });
  DS.card(S, "30-DAY RETURNS", lx - 20, ly - 190, { size: DS.type.caption, t: W(4, 3) });
  DS.plant(S, 1810, 1120, 1.0, -1); DS.vignette(S); }

// 1  Then he read that your brain peaks at twenty-five. / Fifteen years late. / So, did Dave miss his peak?
{ const S = sc(1, { cam: "push", focus: "960 420" }); DS.room(S, { window: false });
  chalkBoard(S); axis(S);
  DS.shape(S, smooth([[AX(8), BASE], [AX(17), BASE - 170], [AX(25), BASE - 330], [AX(36), BASE - 160], [AX(55), BASE - 30], [AX(64), BASE]]) + " Z", "gray", { t: W(6, 5), layer: "mid", w: "detail", tone: 1, dir: "v" });
  S.draw(line([AX(25), BASE - 330], [AX(25), BASE - 395], 0), W(6, 6), 0, { c: DS.c("ink"), w: DS.w.detail });
  DS.shape(S, `M${AX(25)} ${BASE - 395} L${AX(25) + 50} ${BASE - 377} L${AX(25)} ${BASE - 359} Z`, "gray", { t: W(6, 6), w: "detail", tone: 2 });
  S.text("PEAK: 25", AX(25) + 190, BASE - 360, { size: DS.type.small, t: W(6, 6), c: DS.c("ink") });
  S.draw(line([AX(40), BASE - 30], [AX(40), BASE + 8], 0), W(7, 0), 0, { c: DS.c("red"), w: DS.w.near });
  S.arrow(AX(25) + 10, BASE - 40, AX(40) - 10, BASE - 40, W(7, 0), 0.4, { c: DS.c("red"), w: DS.w.mid, bend: 0.12 });
  DS.card(S, "15 YEARS LATE", AX(40) + 230, BASE - 120, { size: DS.type.small, t: W(7, 0), tc: "red" });
  const F = dave(S, 300, 1000, "near", { s: 0.95, mood: "worried", look: 6 }); F.face(W(8, 2), "sad", 6);
  DS.card(S, "MISSED IT?", AX(66), 230, { size: DS.type.small, t: W(8, 4) }); DS.vignette(S, 0.16); }

// 2  Dave's comfort: / "Even Colonel Sanders started Kentucky Fried Chicken at sixty-five."
{ const S = sc(2); DS.room(S, { window: false });
  dave(S, 440, 960, "near", { mood: "smile", look: 6 });
  S.thought(1180, 470, 440, 320, 640, 600, W(9, 1), 0.3);
  colonel(S, 1060, 740, "mid", { s: 1.35, mood: "smile", look: 4, t: W(10, 1) });
  S.text("65", 1360, 560, { size: DS.type.display, t: W(10, 8), c: DS.c("red") });
  DS.card(S, "\"STARTED AT 65\"", 960, 130, { size: DS.type.small, t: W(10, 3) }); DS.vignette(S); }

// 3  He didn't. / He was selling chicken from a petrol station / at forty.
{ const S = sc(3, { cam: "pull" }); DS.outdoor(S, { hy: 640, sky: "dusk", sun: [1600, 220] });
  DS.shadow(S, 1300, 640, 700, {});
  DS.shape(S, rect(1050, 400, 520, 240), "wall", { layer: "mid" });
  DS.shape(S, rect(1110, 470, 150, 170), "wood", { layer: "mid" }); DS.shape(S, rect(1340, 470, 170, 110), "glass", { layer: "mid", w: "detail" });
  DS.shape(S, rect(1020, 360, 580, 50), "red", { layer: "mid", tone: 2 });
  DS.shadow(S, 760, 930, 160);
  DS.shape(S, rrect(690, 620, 140, 310, DS.r.sm), "red"); DS.shape(S, rrect(715, 650, 90, 70, DS.r.xs), "glass", { w: "detail" });
  S.draw(smooth([[830, 700], [880, 760], [870, 860], [840, 880]]), S.start, 0, { c: DS.c("ink"), w: DS.w.near });
  const F = colonel(S, 460, 960, "near", { old: false, mood: "smile", look: 6, pose: "hold" });
  const [hx, hy] = F.hand("R");
  DS.shape(S, circ(hx + 40, hy - 6, 110, 26), "white", { t: W(12, 3), w: "detail" });
  [[-30, -2], [20, -16], [60, 0]].forEach(([dx, dy]) => { S.draw(line([hx + 40 + dx + 20, hy - 30 + dy], [hx + 40 + dx + 48, hy - 44 + dy], 0), W(12, 3), 0, { c: DS.c("white", 2), w: DS.w.near }); DS.shape(S, circ(hx + 40 + dx + 52, hy - 46 + dy, 7), "white", { t: W(12, 3), w: "hair" }); DS.shape(S, circ(hx + 40 + dx - 6, hy - 24 + dy, 30, 20), "earth", { t: W(12, 3), w: "detail", tone: 2 }); });
  DS.card(S, "MYTH", 460, 200, { size: DS.type.body, t: W(11, 0), tc: "red" });
  DS.card(S, "1930 · AGE 40", 1310, 180, { size: DS.type.body, t: W(13, 1) }); DS.vignette(S); }

// 4  Dave's late bloomer / started at Dave's age.
{ const S = sc(4, { cam: "push" }); DS.room(S, { window: [1300, 170, 240, 240] });
  colonel(S, 1180, 960, "near", { old: false, mood: "smile", look: -6 });
  dave(S, 720, 960, "near", { mood: "wow", look: 6 }).face(W(15, 2), "happy", 6);
  DS.card(S, "SANDERS: 40", 1180, 230, { size: DS.type.body, t: W(14, 1) });
  DS.card(S, "DAVE: 40", 720, 230, { size: DS.type.body, t: W(15, 2), tc: "green" }); DS.vignette(S); }

// 5  In 2015, Joshua Hartshorne and Laura Germine tested nearly fifty thousand people.
{ const S = sc(5, { cam: "pull" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  for (let i = 0; i < 12; i++) DS.figure(S, 470 + i * 90, 800, "far", { s: 1.0, hair: ["short", "bun", "curly", "side"][i % 4], hairC: DS.c(["brown", "ink", "earth"][i % 3], 0, "far"), outfitC: DS.c(["green", "purple", "orange", "blue"][i % 4], 0, "far"), mood: "flat", t: W(16, 10) + i * 0.04 });
  DS.figure(S, 520, 990, "near", { s: 1.0, hair: "short", hairC: DS.c("brown"), outfitC: DS.c("green"), mood: "smile", look: 6 });
  DS.figure(S, 1400, 990, "near", { s: 1.0, hair: "bun", hairC: DS.c("brown", 2), outfitC: DS.c("purple"), mood: "smile", look: -6 });
  DS.shadow(S, 960, 990, 420);
  DS.shape(S, rrect(780, 700, 360, 230, DS.r.sm), "navy"); DS.shape(S, rect(805, 725, 310, 180), "glass", { flat: true, w: "detail" });
  DS.shape(S, rrect(730, 930, 460, 34, DS.r.xs), "gray");
  S.text("TEST", 960, 835, { size: DS.type.small, c: DS.c("ink") });
  DS.card(S, "2015 · HARTSHORNE & GERMINE", 960, 130, { size: DS.type.small, t: W(16, 3) });
  DS.card(S, "48,537 PEOPLE", 960, 260, { size: DS.type.body, t: W(16, 10), tc: "red" }); }

// 6  Speed peaked around eighteen. / Faces, early thirties. / Reading emotions, forties to fifties. / Vocabulary, late sixties.
{ const S = sc(6, { cam: "push", focus: "960 400" }); DS.room(S, { window: false });
  chalkBoard(S); axis(S);
  [[18, 300, 9, "sky", W(17, 0), "SPEED"], [32, 270, 10, "grass", W(18, 0), "FACES"], [48, 300, 11, "purple", W(19, 0), "EMOTIONS"], [68, 340, 12, "gold", W(20, 0), "WORDS"]].forEach(([a, h, wd, name, t, lab]) => {
    hill(S, a, h, wd, name, t); S.text(lab, AX(a), BASE - h - 22, { size: DS.type.caption, t, c: DS.c("ink") }); });
  DS.card(S, "WHEN EACH SKILL PEAKS", 960, 760, { size: DS.type.small }); DS.vignette(S); }

// 7  No single peak. / Dave's brain peaks in shifts. / Some shifts haven't started.
{ const S = sc(7, { cam: "zoom", focus: "1100 450" }); DS.room(S, { window: false });
  chalkBoard(S); axis(S);
  [[18, 300, 9, "sky"], [32, 270, 10, "grass"], [48, 300, 11, "purple"], [68, 340, 12, "gold"]].forEach(([a, h, wd, name]) => hill(S, a, h, wd, name, S.start));
  S.fill(circ(AX(48), BASE - 200, 130, 150), W(23, 1), 0.4, DS.c("gold", 1), 0.45); S.fill(circ(AX(68), BASE - 220, 150, 170), W(23, 1), 0.4, DS.c("gold", 1), 0.45);
  for (let y = BASE - 420; y < BASE; y += 36) S.draw(line([AX(40), y], [AX(40), y + 18], 0), W(22, 0), 0, { c: DS.c("red"), w: DS.w.mid });
  DS.card(S, "NO SINGLE PEAK", 960, 760, { size: DS.type.small, t: W(21, 0) });
  DS.card(S, "DAVE, 40", AX(40), 100, { size: DS.type.caption, t: W(22, 0), tc: "red" });
  DS.card(S, "STILL AHEAD", AX(65), 100, { size: DS.type.caption, t: W(23, 1), tc: "green" });
  const F = dave(S, 300, 1000, "near", { s: 0.95, mood: "worried", look: 6, t: W(22, 0) }); F.face(W(23, 2), "happy", 6); DS.vignette(S, 0.16); }

// 8  "Fine, but new tricks are for kids."
{ const S = sc(8); DS.room(S, { window: [1300, 170, 240, 240] });
  dave(S, 600, 960, "near", { mood: "flat", look: 6, pose: "cross" });
  S.speech(600, 260, 380, 100, 620, 400, S.start + 0.2, 0.25); S.text("NEW TRICKS = KIDS", 600, 280, { size: DS.type.small, t: S.start + 0.2, c: DS.c("ink") });
  const K = DS.figure(S, 1250, 960, "near", { s: 0.68, hair: "messy", hairC: DS.c("earth", 2), outfitC: DS.c("green"), mood: "happy", pose: "hold" });
  const [kx, ky] = K.hand("R"); balls(S, kx - 8, ky - 150, 1.2, W(24, 4)); DS.vignette(S); }

// 9  In 2008, Hamburg scientists taught forty-four people around sixty to juggle.
{ const S = sc(9, { cam: "pull" }); DS.room(S, { wall: "glass", floor: "wood", window: [1360, 170, 200, 200] });
  [[560, "short", "purple"], [960, "bun", "green"], [1360, "short", "orange"]].forEach(([x, hair, oc], i) => {
    const F = DS.figure(S, x, 960, "near", { s: 1.0, hair, hairC: DS.c("gray", 1), outfitC: DS.c(oc), mood: i === 1 ? "determined" : "worried", look: 0, pose: "hold" });
    if (i === 2) tache(S, F, "gray", S.start);
    balls(S, x, F.top()[1] - 70, 1.5, W(25, 6) + i * 0.15); });
  DS.card(S, "2008 · HAMBURG", 960, 130, { size: DS.type.body, t: W(25, 4) });
  DS.card(S, "44 PEOPLE, AROUND 60", 960, 250, { size: DS.type.small, t: W(25, 7) }); DS.vignette(S); }

// 10  Most never managed a full minute. / But their scans showed new grey matter / where the brain tracks motion.
{ const S = sc(10, { cam: "push" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  const F = DS.figure(S, 420, 960, "near", { s: 1.0, hair: "bun", hairC: DS.c("gray", 1), outfitC: DS.c("green"), mood: "worried", look: 6, pose: "shrug" });
  [[320, 950], [500, 946], [570, 955]].forEach(([x, y], i) => DS.shape(S, circ(x, y - 18, 18), ["orange", "yellow", "orange"][i], { w: "detail" }));
  S.timer(420, 360, 80, W(26, 0), 0.3, { label: "1:00", c: DS.c("gray") });
  S.cross(540, 300, 0.7, W(26, 5), 0.25, { c: DS.c("red") });
  head(S, 1300, 540, 1.15, W(27, 1));
  const gl = S.fill(circ(1430, 600, 80, 60), W(27, 4), 0.4, DS.c("gold"), 0.85); S.fill(circ(1430, 600, 150, 110), W(27, 4), 0.4, DS.c("gold", 1), 0.35);
  DS.card(S, "NEVER 1 MINUTE", 420, 160, { size: DS.type.small, t: W(26, 1) });
  DS.card(S, "MORE GREY MATTER", 1300, 140, { size: DS.type.small, t: W(27, 4), tc: "green" });
  DS.card(S, "MOTION AREA", 1430, 860, { size: DS.type.caption, t: W(28, 0) }); }

// 11  Clumsy, sixty, / and growing. / Then they stopped. / Three months later, / the new grey matter had faded.
{ const S = sc(11, { cam: "zoom", focus: "800 560" }); DS.room(S, { wall: "glass", floor: "wood", window: false });
  head(S, 760, 560, 1.3, S.start);
  const g1 = S.fill(circ(910, 630, 90, 70), S.start, 0, DS.c("gold"), 0.85), g2 = S.fill(circ(910, 630, 170, 125), S.start, 0, DS.c("gold", 1), 0.35);
  S.fadeOut(g1, W(33, 4), 0.9); S.fadeOut(g2, W(33, 4), 0.9);
  DS.card(S, "CLUMSY, 60, GROWING", 760, 130, { size: DS.type.small, t: W(29, 0), tc: "green" });
  DS.shadow(S, 1420, 940, 300);
  DS.shape(S, rect(1290, 760, 260, 180), "earth", { t: W(31, 2) });
  [[1350, 750], [1420, 740], [1490, 752]].forEach(([x, y], i) => DS.shape(S, circ(x, y, 22), ["orange", "yellow", "orange"][i], { t: W(31, 2), w: "detail" }));
  DS.card(S, "STOPPED · 3 MONTHS LATER", 1420, 600, { size: DS.type.caption, t: W(32, 0) });
  DS.card(S, "FADED", 760, 870, { size: DS.type.body, t: W(33, 4), tc: "red" }); }

// 12  "So it's hopeless?" / No. / Their brains never checked their age. / Only whether they were still juggling.
{ const S = sc(12, { cam: "push" }); DS.room(S, { window: false });
  const F = dave(S, 420, 960, "near", { mood: "worried", look: 6 }); F.face(W(37, 5), "happy", 6);
  S.speech(420, 300, 240, 90, 430, 420, S.start + 0.1, 0.25); S.text("HOPELESS?", 420, 318, { size: DS.type.small, t: S.start + 0.1, c: DS.c("ink") });
  DS.drop(S, rrect(890, 230, 760, 600, DS.r.sm)); DS.shape(S, rrect(880, 220, 760, 600, DS.r.sm), "wood");
  DS.shape(S, rect(920, 280, 680, 510), "white", { w: "detail", flat: true }); DS.shape(S, rrect(1180, 196, 160, 60, DS.r.xs), "gray");
  S.text("THE BRAIN CHECKS", 1260, 360, { size: DS.type.small, c: DS.c("ink"), t: W(36, 1) });
  const C = S.checklist(980, 500, ["YOUR AGE", "STILL PRACTISING"], W(36, 2), 1.2, { gap: 150, size: DS.type.small });
  S.strike(1050, 512, 1330, 480, W(36, 5), 0.3, { c: DS.c("red"), w: DS.w.near });
  S.tick(C.boxes[1][0], C.boxes[1][1], 1.3, W(37, 4), 0.2, { c: DS.c("green"), w: DS.w.near });
  DS.card(S, "NO.", 1260, 900, { size: DS.type.title, t: W(35, 0), tc: "red" }); }

// 13  Tonight, ten minutes, one chord. / Tomorrow, the same chord.
{ const S = sc(13, { cam: "push", focus: "900 600" }); DS.room(S, { wall: "night", floor: "wood", window: [470, 190, 200, 200] });
  const F = dave(S, 700, 960, "near", { mood: "determined", look: 6, pose: "hold" });
  const [hx, hy] = F.hand("R"); guitar(S, hx + 30, hy + 10, 0.85, 52);
  S.timer(1320, 500, 110, W(38, 1), 0.3, { label: "10:00", fillAt: W(38, 1), fillDur: 3.2, c: DS.c("green") });
  DS.card(S, "ONE CHORD", 1320, 250, { size: DS.type.body, t: W(38, 3), tc: "green" });
  DS.card(S, "TOMORROW: SAME CHORD", 1420, 760, { size: DS.type.small, t: W(39, 0) }); DS.vignette(S, 0.16); }

// 14  Dave threw away the receipt. / You are not too old. / You're just new at it.
{ const S = sc(14, { cam: "pull" }); DS.room(S, { window: [1300, 170, 240, 240] });
  DS.frame(S, 420, 180, 150, 120, "grass");
  const F = dave(S, 860, 960, "near", { mood: "smile", look: -6, pose: "hold", armL: [[-48, 0], [-86, -50]] }); F.face(W(41, 0), "happy", 0);
  const [hx, hy] = F.hand("R"), [lx, ly] = F.hand("L"); guitar(S, hx + 30, hy + 10, 0.85, 52);
  DS.shadow(S, 420, 960, 200);
  DS.shape(S, `M330 780 H510 L485 960 H355 Z`, "gray");
  DS.shape(S, rrect(320, 762, 200, 30, DS.r.xs), "gray", { tone: 2 });
  const R = receipt(S, lx - 50, ly - 120, 1.0);
  S.move(R, W(40, 1), 0.8, { x: 420 - (lx - 5), y: 760 - (ly - 60), rotation: -30, svgOrigin: `${lx - 5} ${ly - 60}` }, "power2.in");
  S.fadeOut(R, W(40, 1) + 0.7, 0.2);
  DS.card(S, "YOU'RE NOT TOO OLD", 960, 160, { size: DS.type.body, t: W(41, 0), tc: "green" });
  DS.card(S, "JUST NEW AT IT", 1500, 420, { size: DS.type.small, t: W(42, 2) });
  DS.plant(S, 1810, 1120, 1.0, -1); DS.vignette(S); }
