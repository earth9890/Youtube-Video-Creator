// look: still
// You Are Not Boring (1-min, 62 s). Mystery: was Dave boring, or is the replay lying? Illustrated stills, progressive changes on the spoken word.
const dave = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
const maya = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.05, hair: "curly", hairC: DS.c("brown", 2), outfitC: DS.c("purple") }, o));
const cup = (S, F, side, o = {}) => { const [hx, hy] = F.hand(side); DS.shape(S, rrect(hx - 18 * F.s, hy - 40 * F.s, 36 * F.s, 46 * F.s, DS.r.xs), o.color || "white", { t: o.t, w: "detail" }); };
const printer = (S, cx, base, k, o = {}) => {
  const t = o.t ?? S.start, g = S.grp();
  if (o.ground) DS.shadow(S, cx, base, 260 * k, { t });
  DS.shape(S, rect(cx - 80 * k, base - 170 * k, 160 * k, 70 * k), "white", { t, w: "detail", flat: true, parent: g });
  DS.shape(S, rrect(cx - 130 * k, base - 120 * k, 260 * k, 120 * k, DS.r.sm), "gray", { t, w: o.w || "mid", parent: g });
  DS.shape(S, rrect(cx - 95 * k, base - 52 * k, 190 * k, 16 * k, DS.r.xs), "ink", { t, w: "hair", flat: true, parent: g });
  DS.shape(S, circ(cx + 95 * k, base - 92 * k, 9 * k), "green", { t, w: "hair", flat: true, parent: g });
  if (t > S.start + 0.05) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t);
  return g;
};
const bunting = (S, x0, x1, y) => {
  const mid = (x0 + x1) / 2, half = (x1 - x0) / 2, yy = (x) => y + 50 * (1 - ((x - mid) / half) ** 2);
  S.draw(smooth([[x0, y], [mid, y + 50], [x1, y]]), S.start, 0, { c: DS.line("mid"), w: DS.w.detail });
  for (let i = 1; i < 12; i++) { const x = x0 + (i * (x1 - x0)) / 12, a = yy(x); DS.shape(S, `M${x - 26} ${a} L${x + 26} ${a} L${x} ${a + 52} Z`, ["yellow", "sky", "pink"][i % 3], { layer: "mid", w: "hair", flat: true }); }
};
const house = (S, cx, base, k, o = {}) => {
  DS.shadow(S, cx, base, 420 * k);
  DS.shape(S, rect(cx - 170 * k, base - 260 * k, 340 * k, 260 * k), "wall", { layer: "mid", w: "mid", dir: "v" });
  DS.shape(S, `M${cx - 200 * k} ${base - 250 * k} L${cx} ${base - 400 * k} L${cx + 200 * k} ${base - 250 * k} Z`, "brown", { layer: "mid", w: "mid" });
  DS.shape(S, rect(cx - 30 * k, base - 120 * k, 60 * k, 120 * k), "wood", { layer: "mid", w: "detail" });
  DS.shape(S, rect(cx - 140 * k, base - 210 * k, 90 * k, 80 * k), "navy", { layer: "mid", w: "detail", flat: true });
  S.fill(rect(cx - 140 * k, base - 210 * k, 90 * k, 80 * k), o.lit ?? S.start, 0.35, DS.c("gold", 1), 1);
  return [cx - 95 * k, base - 210 * k];
};
const heartsUp = (S, x, y, t, n = 3) => { for (let i = 0; i < n; i++) S.heart(x + (i - 1) * 50, y - i * 55, 0.55 - i * 0.08, t + i * 0.15, 0.2, { fill: DS.c("red"), w: DS.w.detail }); };

const CUES = [[1, 0], [5, 0], [9, 0], [13, 0], [15, 0], [16, 0], [21, 0], [24, 0], [27, 0], [31, 0], [34, 0], [36, 0], [38, 0]];
const WIN = sceneWindows(CUES, 0.15);
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0  This is Dave. / He talked to Maya at a party. / He has replayed it / nine times.
{ const S = sc(0, { cam: "push", focus: "960 640" }); DS.room(S, { wall: "dusk", window: false });
  bunting(S, 380, 1540, 140);
  DS.frame(S, 440, 300, 170, 130, "sky");
  const D = dave(S, 780, 960, "near", { mood: "happy", look: 6, pose: "hold" }); cup(S, D, "R");
  const M = maya(S, 1160, 960, "near", { mood: "smile", look: -6, pose: "hold", t: W(2, 3) }); cup(S, M, "R", { t: W(2, 3) });
  DS.card(S, "DAVE", 780, 480, { size: DS.type.body, t: W(1, 2) });
  DS.card(S, "MAYA", 1160, 480, { size: DS.type.body, t: W(2, 3) });
  DS.card(S, "REPLAYED 9×", 960, 290, { size: DS.type.body, t: W(4, 0), tc: "red" });
  D.face(W(3, 1), "worried", 6);
  DS.vignette(S); }

// 1  In the replay, he told her about his printer. / Twice. // Was Dave boring, / or is the replay lying?
{ const S = sc(1, { cam: "zoom", focus: "1100 480" }); DS.room(S, { wall: "night", floor: "wood", window: false });
  const C = S.couch(260, 960, 480, S.start, 0);
  DS.shadow(S, 500, 960, 520);
  dave(S, 520, C.seatY, "near", { sit: true, mood: "worried", look: 6 });
  S.thought(1230, 400, 450, 260, 700, 640, S.start, 0.3);
  dave(S, 1020, 600, "mid", { s: 0.9, mood: "happy", look: 6, pose: "point" });
  printer(S, 1360, 600, 0.8, { t: W(5, 7) });
  DS.card(S, "×2", 1560, 300, { size: DS.type.title, t: W(6, 0), tc: "red" });
  DS.card(S, "BORING?", 500, 300, { size: DS.type.body, t: W(7, 2) });
  DS.vignette(S, 0.18); }

// 2  The evidence: / she said, Nice talking to you. / But chats are polite. / Nobody says the real score.
{ const S = sc(2, { cam: "push", focus: "1180 480" }); DS.room(S, { wall: "wall", window: false });
  DS.drop(S, rrect(786, 208, 800, 520, DS.r.sm)); DS.shape(S, rrect(780, 200, 800, 520, DS.r.sm), "earth");
  DS.shape(S, rect(870, 300, 620, 300), "white", { w: "detail", flat: true, t: W(10, 0) });
  S.fill(circ(1180, 300, 16), W(10, 0), 0.3, DS.c("red"), 1);
  S.text("\"NICE TALKING", 1180, 420, { size: DS.type.body, t: W(10, 2), c: DS.c("ink") });
  S.text("TO YOU\"", 1180, 510, { size: DS.type.body, t: W(10, 2), c: DS.c("ink") });
  const D = dave(S, 470, 960, "near", { mood: "flat", look: 6, pose: "point" });
  D.face(W(12, 0), "worried", 6);
  DS.card(S, "EXHIBIT A", 1180, 130, { size: DS.type.body, t: W(9, 1) });
  DS.card(S, "POLITE", 1420, 620, { size: DS.type.body, t: W(11, 3), tc: "red" });
  DS.card(S, "REAL SCORE: ?", 1020, 820, { size: DS.type.small, t: W(12, 3) });
  DS.vignette(S); }

// 3  So, case closed. / Dave was boring.
{ const S = sc(3, { cam: "pull" }); DS.room(S, { wall: "gray", floor: "wood", window: false });
  DS.shadow(S, 1100, 960, 760);
  DS.shape(S, rrect(720, 730, 760, 40, DS.r.xs), "wood"); [760, 1400].forEach((x) => DS.shape(S, rect(x, 770, 20, 190), "wood", { w: "mid" }));
  DS.shape(S, rrect(860, 300, 160, 70, DS.r.xs), "sand");
  DS.shape(S, rrect(820, 340, 560, 380, DS.r.xs), "sand");
  S.text("DAVE", 940, 332, { size: DS.type.caption, c: DS.c("ink") });
  DS.card(S, "BORING", 1100, 530, { size: DS.type.title, t: W(14, 1), tc: "red" });
  DS.card(S, "CASE CLOSED", 1100, 170, { size: DS.type.body, t: W(13, 1) });
  dave(S, 420, 960, "near", { s: 0.85, mood: "sad", look: 6 });
  DS.vignette(S, 0.18); }

// 4  But in twenty eighteen, Erica Boothby's team asked strangers after a five-minute chat,
{ const S = sc(4, { cam: "push" }); DS.room(S, { wall: "glass", floor: "gray", window: [1340, 170, 230, 230] });
  DS.shadow(S, 960, 960, 300);
  DS.shape(S, circ(960, 790, 150, 30), "wood"); DS.shape(S, rect(950, 800, 20, 160), "wood", { w: "mid" });
  maya(S, 660, 960, "near", { hair: "bun", outfitC: DS.c("green"), mood: "smile", look: 6, t: W(15, 8) });
  dave(S, 1260, 960, "near", { hair: "spiky", hairC: DS.c("ink"), outfitC: DS.c("orange"), mood: "smile", look: -6, t: W(15, 8) });
  S.clock(960, 560, 80, W(15, 10), 0.3, { h: 12, m: 5 });
  DS.card(S, "2018 · ERICA BOOTHBY", 960, 140, { size: DS.type.small, t: W(15, 3) });
  DS.card(S, "STRANGERS", 960, 280, { size: DS.type.small, t: W(15, 8) });
  DS.vignette(S); }

// 5  How interesting was your partner? / Four point three, out of five. / How interesting did they find you? / Three point six. / Same chat, two scores.
{ const S = sc(5); DS.room(S, { window: false });
  const base = 860, u = 100;
  S.draw(line([440, base], [1380, base], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  DS.shape(S, rect(560, base - 4.3 * u, 240, 4.3 * u), "green", { t: W(17, 0), dir: "h" });
  S.text("4.3 / 5", 680, base - 4.3 * u - 28, { size: DS.type.body, t: W(17, 0), c: DS.c("ink") });
  S.text("MY PARTNER", 680, base + 56, { size: DS.type.caption, t: W(16, 0), c: DS.c("ink") });
  DS.shape(S, rect(1000, base - 3.6 * u, 240, 3.6 * u), "gray", { t: W(19, 0), dir: "h" });
  S.text("3.6", 1120, base - 3.6 * u + 80, { size: DS.type.body, t: W(19, 0), c: DS.c("ink") });
  S.text("ME (MY GUESS)", 1120, base + 56, { size: DS.type.caption, t: W(18, 0), c: DS.c("ink") });
  S.draw(line([800, base - 4.3 * u], [1260, base - 4.3 * u], 0), W(20, 0), 0, { c: DS.c("red"), w: DS.w.mid });
  DS.card(S, "HOW INTERESTING? (OUT OF 5)", 910, 150, { size: DS.type.small, t: W(16, 1) });
  DS.card(S, "SAME CHAT, TWO SCORES", 1500, 300, { size: DS.type.caption, t: W(20, 0), tc: "red" });
  const D = dave(S, 1580, 960, "near", { s: 0.9, mood: "flat", look: -6 }); D.face(W(20, 0), "wow", -6);
  DS.vignette(S); }

// 6  So where did the clues go? / Coders watching films of chats / could see who liked whom.
{ const S = sc(6, { cam: "push", focus: "1240 480" }); DS.room(S, { wall: "night", floor: "wood", window: false });
  DS.shape(S, rrect(880, 200, 760, 520, DS.r.sm), "ink");
  DS.shape(S, rect(910, 230, 700, 460), "sky", { dir: "v", w: "hair", t: W(22, 2) });
  S.fill(rect(910, 590, 700, 100), W(22, 2), 0.35, DS.c("grass", 0), 1);
  dave(S, 1130, 620, "far", { s: 1.05, mood: "happy", look: 6, t: W(22, 2) });
  maya(S, 1390, 620, "far", { s: 1.05, mood: "smile", look: -6, t: W(22, 2) });
  [1130, 1390].forEach((x) => S.heart(x, 380, 0.55, W(23, 3), 0.2, { fill: DS.c("red"), w: DS.w.detail }));
  DS.figure(S, 330, 960, "near", { s: 1, hair: "bun", hairC: DS.c("ink"), outfitC: DS.c("green"), mood: "flat", look: 6, t: W(22, 0) });
  DS.figure(S, 590, 960, "near", { s: 1, hair: "short", hairC: DS.c("brown", 2), outfitC: DS.c("orange"), mood: "wow", look: 6, t: W(22, 0) });
  DS.card(S, "CODERS", 460, 420, { size: DS.type.body, t: W(22, 0) });
  DS.card(S, "WHO LIKED WHOM", 1260, 130, { size: DS.type.small, t: W(23, 2) });
  DS.vignette(S); }

// 7  The talkers missed it, / busy replaying / their own printer stories.
{ const S = sc(7, { cam: "push", focus: "960 600" }); DS.room(S, { wall: "dusk", window: false });
  bunting(S, 380, 1540, 140);
  const D = dave(S, 760, 960, "near", { mood: "worried", look: -4, pose: "hold" }); cup(S, D, "R");
  const M = maya(S, 1160, 960, "near", { mood: "worried", look: 4, pose: "hold" }); cup(S, M, "R");
  heartsUp(S, 1160, 520, S.start + 0.3); heartsUp(S, 760, 520, S.start + 0.3);
  S.thought(560, 300, 230, 140, 720, 520, W(25, 0), 0.3); printer(S, 560, 360, 0.55, { t: W(25, 0), w: "detail" });
  S.thought(1380, 300, 230, 140, 1200, 520, W(25, 0), 0.3); printer(S, 1380, 360, 0.55, { t: W(25, 0), w: "detail" });
  DS.card(S, "MISSED IT", 960, 120, { size: DS.type.body, t: W(24, 2), tc: "red" });
  DS.vignette(S); }

// 8  So I just need longer chats? / No. / From two minutes to forty-five, / same gap.
{ const S = sc(8); DS.room(S, { wall: "wall", window: [1360, 170, 230, 230] });
  dave(S, 430, 960, "near", { mood: "wow", look: 6 });
  S.speech(470, 240, 300, 100, 450, 360, S.start, 0.3); S.text("LONGER CHATS?", 470, 260, { size: DS.type.small, c: DS.c("ink") });
  DS.card(S, "NO.", 860, 470, { size: DS.type.title, t: W(28, 0), tc: "red" });
  S.clock(1100, 640, 110, W(29, 1), 0.3, { h: 12, m: 2 }); S.text("2 MIN", 1100, 820, { size: DS.type.small, t: W(29, 1), c: DS.c("ink") });
  S.clock(1500, 640, 110, W(29, 3), 0.3, { h: 12, m: 45 }); S.text("45 MIN", 1500, 820, { size: DS.type.small, t: W(29, 3), c: DS.c("ink") });
  DS.card(S, "SAME GAP", 1300, 150, { size: DS.type.body, t: W(30, 0) });
  DS.vignette(S); }

// 9  The replay was lying. / And across town, Maya is replaying it too, / sure she was the boring one.
{ const S = sc(9, { cam: "pull" }); DS.outdoor(S, { hy: 700, sky: "night", sun: false, hills: "navy", ground: "navy" });
  S.moon(960, 200, 60, S.start, 0); S.stars(30, 200, 60, 1720, 420, S.start, 0.01);
  const [lx, ly] = house(S, 430, 900, 1);
  const [rx, ry] = house(S, 1490, 900, 1, { lit: W(32, 4) });
  S.thought(520, 420, 230, 130, lx + 40, ly - 10, S.start, 0.3); printer(S, 520, 480, 0.5, { w: "detail" });
  DS.card(S, "THE REPLAY LIED", 520, 150, { size: DS.type.small, t: W(31, 1), tc: "red" });
  S.thought(1400, 420, 260, 130, rx + 40, ry - 10, W(32, 5), 0.3);
  S.text("I WAS BORING", 1400, 440, { size: DS.type.small, t: W(33, 3), c: DS.c("ink") });
  DS.card(S, "MAYA", 1490, 150, { size: DS.type.small, t: W(32, 4) });
  DS.vignette(S, 0.18); }

// 10  So Dave texts her. / Not about the printer.
{ const S = sc(10, { cam: "push", focus: "900 560" }); DS.room(S, { window: [1300, 170, 260, 260] });
  const D = dave(S, 620, 960, "near", { s: 1.3, mood: "smile", look: 6, pose: "hold" });
  const [hx, hy] = D.hand("R");
  S.phone(hx + 50, hy - 30, 1.3, S.start, 0.01, { screen: "chat" });
  DS.card(S, "COFFEE AGAIN?", 1180, 300, { size: DS.type.body, t: W(34, 2), fill: "sky" });
  printer(S, 1360, 860, 0.9, { t: W(35, 0), ground: true });
  S.cross(1360, 790, 1.4, W(35, 3), 0.25, { c: DS.c("red") });
  DS.vignette(S); }

// 11  After your next chat, assume they liked you more than you think. / Then talk to them again.
{ const S = sc(11, { cam: "push" }); DS.room(S, { wall: "dusk", floor: "wood", window: [1320, 170, 260, 260] });
  DS.shadow(S, 960, 960, 300);
  DS.shape(S, circ(960, 790, 150, 30), "wood"); DS.shape(S, rect(950, 800, 20, 160), "wood", { w: "mid" });
  DS.shape(S, rrect(880, 730, 40, 50, DS.r.xs), "white", { w: "detail" }); DS.shape(S, rrect(1010, 730, 40, 50, DS.r.xs), "white", { w: "detail" });
  dave(S, 660, 960, "near", { mood: "smile", look: 6 });
  maya(S, 1260, 960, "near", { mood: "happy", look: -6 });
  heartsUp(S, 1260, 540, W(36, 5));
  DS.card(S, "THEY LIKED YOU MORE", 960, 150, { size: DS.type.small, t: W(36, 5) });
  DS.card(S, "TALK AGAIN", 960, 290, { size: DS.type.body, t: W(37, 0), tc: "green" });
  DS.vignette(S); }

// 12  You are not boring. / You just heard it / from the inside.
{ const S = sc(12, { cam: "zoom", focus: "960 640" }); DS.room(S, { wall: "dusk", window: false });
  bunting(S, 380, 1540, 140);
  DS.frame(S, 440, 300, 170, 130, "sky");
  const D = dave(S, 780, 960, "near", { mood: "happy", look: 6, pose: "hold" }); cup(S, D, "R");
  const M = maya(S, 1160, 960, "near", { mood: "happy", look: -6, pose: "hold" }); cup(S, M, "R");
  const T = S.thought(560, 420, 200, 120, 720, 560, S.start, 0.01); const P = printer(S, 560, 480, 0.45, { w: "detail" });
  S.fadeOut(T.g, W(40, 0), 0.5); S.fadeOut(P, W(40, 0), 0.5);
  heartsUp(S, 1160, 520, W(38, 3)); heartsUp(S, 780, 520, W(40, 2));
  DS.card(S, "YOU ARE NOT BORING", 960, 150, { size: DS.type.body, t: W(38, 0), tc: "green" });
  DS.vignette(S); }
