// look: still
// You Are Not Weak (1-min, 71 s). Mystery: how do strong-willed people win the 10 pm fight with the biscuit tin? Illustrated stills, progressive changes on the spoken word.
const dave = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
// the strong-willed person (green = self-control, the same person in every scene)
const pat = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "bun", hairC: DS.c("ink"), outfitC: DS.c("green") }, o));
const T = (o, S) => o.t ?? S.start;
const GUARD = [[[-55, 25], [-58, -30]], [[55, 25], [58, -30]]]; // fists up: Dave squares up to the tin
// chocolate-chip cookie
const cookie = (S, cx, cy, r, o = {}) => {
  DS.shape(S, circ(cx, cy, r), "earth", { t: o.t, layer: o.layer, w: "detail", parent: o.parent });
  [[-0.4, -0.3], [0.35, -0.35], [0.05, 0.1], [-0.3, 0.4], [0.4, 0.35]].forEach(([dx, dy]) => S.fill(circ(cx + dx * r, cy + dy * r, r * 0.14), T(o, S), 0.3, DS.c("brown"), 1, o.parent));
};
// biscuit tin: blue drum, gold lid, a cookie on the label. by = base y
const tin = (S, cx, by, k = 1, o = {}) => {
  const L = o.layer || "near", p = o.parent, t = o.t;
  if (!o.noShadow) DS.shadow(S, cx, by, 270 * k, { t, parent: p });
  DS.shape(S, rrect(cx - 110 * k, by - 170 * k, 220 * k, 170 * k, DS.r.sm), "blue", { t, layer: L, parent: p });
  DS.shape(S, rrect(cx - 122 * k, by - 200 * k, 244 * k, 42 * k, DS.r.sm), "gold", { t, layer: L, parent: p });
  DS.shape(S, circ(cx, by - 82 * k, 56 * k), "paper", { t, layer: L, flat: true, w: "detail", parent: p });
  cookie(S, cx, by - 82 * k, 40 * k, { t, layer: L, parent: p });
};
// radish: red bulb, green leaves, root tail
const radish = (S, cx, cy, r, o = {}) => {
  [[-0.5, -2.1], [0.45, -2.2]].forEach(([dx, dy]) => DS.shape(S, smooth([[cx, cy - r * 0.8], [cx + dx * r * 1.4, cy + dy * r * 0.6], [cx + dx * r, cy + dy * r], [cx + dx * r * 0.2, cy + dy * r * 0.7], [cx, cy - r * 0.8]]) + " Z", "grass", { t: o.t, w: "detail", flat: true }));
  S.draw(line([cx, cy + r * 0.9], [cx + r * 0.1, cy + r * 1.6], 0), T(o, S), 0, { c: DS.c("pink", 2), w: DS.w.detail });
  DS.shape(S, circ(cx, cy, r), "red", { t: o.t, w: "detail" });
};
const phone = (S, cx, cy, k, o = {}) => { DS.shape(S, rrect(cx - 45 * k, cy - 85 * k, 90 * k, 170 * k, DS.r.sm), "ink", { t: o.t, w: "detail", parent: o.parent }); DS.shape(S, rect(cx - 37 * k, cy - 70 * k, 74 * k, 132 * k), o.screen || "sky", { t: o.t, w: "hair", flat: true, tone: 1, parent: o.parent }); };
// kitchen counter: cabinets + worktop; returns worktop y
const counter = (S, x, gy, w) => {
  DS.shadow(S, x + w / 2, gy, w);
  DS.shape(S, rect(x, gy - 300, w, 300), "wood");
  for (let i = 1; i < 3; i++) S.draw(line([x + (w * i) / 3, gy - 280], [x + (w * i) / 3, gy - 20], 0), S.start, 0, { c: DS.c("wood", 2), w: DS.w.hair });
  [1, 2, 3].forEach((i) => DS.shape(S, rrect(x + (w * i) / 3 - w / 6 - 30, gy - 250, 60, 14, DS.r.xs), "gray", { w: "hair" }));
  DS.shape(S, rrect(x - 20, gy - 330, w + 40, 34, DS.r.xs), "gray", { tone: 1 });
  return gy - 330;
};
// wall clock at ten o'clock
const clock10 = (S, cx, cy, r) => {
  DS.drop(S, circ(cx + 6, cy + 8, r));
  DS.shape(S, circ(cx, cy, r), "white", { w: "mid" });
  [0, 1, 2, 3].forEach((i) => { const a = (i * Math.PI) / 2; S.draw(line([cx + Math.cos(a) * r * 0.78, cy + Math.sin(a) * r * 0.78], [cx + Math.cos(a) * r * 0.9, cy + Math.sin(a) * r * 0.9], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.detail }); });
  S.draw(line([cx, cy], [cx, cy - r * 0.72], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  S.draw(line([cx, cy], [cx - r * 0.43, cy - r * 0.25], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.near });
};
const kitchen = (S, o = {}) => { const R = DS.room(S, { wall: "night", floor: "wood", window: false }); if (o.clock !== false) clock10(S, o.cx || 1460, 230, 70); return R; };
const bar = (S, x, base, h, w, name, t, label) => { DS.shape(S, rect(x, base - h, w, h), name, { t, dir: "h" }); S.text(label, x + w / 2, base - h - 24, { size: DS.type.small, t, c: DS.c("ink") }); };
const beaker = (S, cx, by, k, t, layer = "near") => { DS.shape(S, poly([[cx - 16 * k, by - 50 * k], [cx - 16 * k, by - 30 * k], [cx - 30 * k, by], [cx + 30 * k, by], [cx + 16 * k, by - 30 * k], [cx + 16 * k, by - 50 * k]], 0) + " Z", "glass", { t, layer, w: "detail" }); DS.shape(S, poly([[cx - 22 * k, by - 16 * k], [cx - 30 * k, by], [cx + 30 * k, by], [cx + 22 * k, by - 16 * k]], 0) + " Z", "green", { t, layer, w: "hair", flat: true }); };

const CUES = [[1, 0], [4, 0], [7, 0], [10, 0], [12, 0], [16, 0], [18, 0], [22, 0], [24, 0], [26, 0], [28, 0], [31, 0], [33, 0], [36, 0], [39, 0], [41, 0]];
const WIN = sceneWindows(CUES, -0.25); // each picture lands 0.25 s into its first word, so last-word reveals get a full beat before the 0.6 s crossfade
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0  This is Dave. / Every night at ten, Dave fights the biscuit tin. / The tin is undefeated.
{ const S = sc(0, { cam: "push", focus: "1000 600" }); kitchen(S, { cx: 800 });
  const top = counter(S, 860, 960, 760);
  tin(S, 1240, top, 1.0);
  const F = dave(S, 560, 960, "near", { mood: "determined", look: 6 });
  F.setPose(W(2, 5), null, GUARD);
  F.face(W(3, 3), "sad", 6);
  DS.card(S, "DAVE", 560, 480, { size: DS.type.body, t: W(1, 2) });
  DS.card(S, "UNDEFEATED", 1240, 300, { size: DS.type.body, t: W(3, 3), tc: "red" });
  DS.plant(S, 110, 1130, 0.9, 1); DS.vignette(S); }

// 1  Dave thinks he's weak. / So how do strong-willed people / win this fight?
{ const S = sc(1, { cam: "pull" }); kitchen(S, { cx: 560 });
  const top = counter(S, 720, 960, 560);
  tin(S, 1000, top, 0.9);
  dave(S, 400, 960, "near", { s: 0.85, mood: "sad", look: 6, pose: "sad" });
  DS.card(S, "WEAK?", 400, 470, { size: DS.type.body, t: W(4, 3) });
  pat(S, 1500, 960, "near", { mood: "smile", look: -6, pose: "hips", t: W(5, 3) });
  DS.card(S, "HOW DO THEY WIN?", 1100, 150, { size: DS.type.body, t: W(6, 0), tc: "green" });
  DS.vignette(S); }

// 2  Dave's excuse: / willpower is a battery. / By ten, it's flat.
{ const S = sc(2, { cam: "push", focus: "1150 520" }); kitchen(S, { clock: false });
  const F = dave(S, 420, 960, "near", { mood: "flat", look: 6, pose: "point" });
  F.face(W(9, 3), "sad", 6);
  const x = 820, y = 360, w = 640, h = 300;
  DS.drop(S, rrect(x + 6, y + 8, w, h, DS.r.md));
  DS.shape(S, rrect(x, y, w, h, DS.r.md), "white", { w: "near", flat: true, t: W(8, 3) });
  DS.shape(S, rrect(x + w, y + h / 2 - 50, 40, 100, DS.r.xs), "gray", { w: "near", t: W(8, 3) });
  [0, 1, 2, 3].forEach((i) => DS.shape(S, rrect(x + 26 + i * 152, y + 26, 132, h - 52, DS.r.xs), "green", { w: "detail", t: W(8, 3) + i * 0.08 }));
  [1, 2, 3].forEach((i) => DS.shape(S, rrect(x + 22 + i * 152, y + 22, 140, h - 44, DS.r.xs), "white", { w: "hair", flat: true, t: W(9, 3) + (3 - i) * 0.06 }));
  DS.shape(S, rrect(x + 26, y + 26, 132, h - 52, DS.r.xs), "red", { w: "detail", t: W(9, 3) });
  DS.card(S, "WILLPOWER", x + w / 2, 230, { size: DS.type.body, t: W(8, 0) });
  DS.card(S, "10 PM: FLAT", x + w / 2, 790, { size: DS.type.body, t: W(9, 1), tc: "red" });
  DS.vignette(S); }

// 3  In 1998, Roy Baumeister made hungry students eat radishes / next to fresh cookies.
{ const S = sc(3, { cam: "push", focus: "1000 640" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  const F = DS.figure(S, 520, 960, "near", { s: 1.1, hair: "curly", hairC: DS.c("ink"), outfitC: DS.c("orange"), mood: "flat", look: 6, pose: "reach" });
  F.face(W(11, 2), "worried", 8);
  const ty = 700;
  DS.shadow(S, 1110, 960, 860);
  [700, 1490].forEach((lx) => DS.shape(S, rect(lx, ty + 20, 22, 960 - ty - 20), "gray", { w: "mid" }));
  DS.shape(S, rrect(670, ty, 880, 32, DS.r.xs), "white", { tone: 2 });
  radish(S, 690, ty - 26, 22, { t: W(10, 9) });
  DS.shape(S, circ(900, ty - 10, 120, 26), "white", { w: "detail", t: W(10, 9) });
  [[840, ty - 40], [900, ty - 50], [960, ty - 40]].forEach(([rx, ry], i) => radish(S, rx, ry, 26, { t: W(10, 9) + 0.05 * i }));
  DS.shape(S, circ(1290, ty - 8, 170, 30), "white", { w: "detail", t: W(11, 3) });
  [[1200, ty - 40], [1290, ty - 46], [1380, ty - 40], [1245, ty - 92], [1335, ty - 92]].forEach(([cx, cy], i) => cookie(S, cx, cy, 44, { t: W(11, 3) + 0.05 * i }));
  [1230, 1300, 1370].forEach((sx, i) => S.draw(smooth([[sx, ty - 150], [sx - 18, ty - 200], [sx + 12, ty - 250], [sx - 8, ty - 300]]), W(11, 3) + 0.2 + i * 0.1, 0, { c: DS.c("gold", 1), w: DS.w.mid }));
  DS.card(S, "1998 · ROY BAUMEISTER", 960, 140, { size: DS.type.small, t: W(10, 3) });
  DS.card(S, "RADISHES ONLY", 900, 470, { size: DS.type.caption, t: W(10, 9), tc: "red" });
  DS.vignette(S); }

// 4  Then, an impossible puzzle. / Cookie eaters lasted nineteen minutes. / Radish eaters quit after eight. // Fair.
{ const S = sc(4, { cam: "push" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  DS.drop(S, rect(206, 288, 400, 460));
  DS.shape(S, rect(200, 280, 400, 460), "white", { w: "detail", flat: true });
  S.draw(poly([[300, 640], [300, 470], [400, 380], [500, 470], [500, 640], [300, 640], [500, 470], [300, 470], [500, 640]], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  S.text("?", 400, 720, { size: DS.type.title, t: W(12, 3), c: DS.c("red") });
  S.draw(line([760, 860], [1720, 860], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  bar(S, 860, 860, 454, 240, "earth", W(13, 3), "19 MIN");
  bar(S, 1320, 860, 200, 240, "red", W(14, 4), "8 MIN");
  cookie(S, 980, 905, 30, { t: W(13, 0) });
  radish(S, 1440, 905, 26, { t: W(14, 0) });
  DS.card(S, "IMPOSSIBLE PUZZLE", 960, 150, { size: DS.type.body, t: W(12, 2) });
  DS.card(S, "FAIR.", 1440, 440, { size: DS.type.body, t: W(15, 0) }); }

// 5  But in 2016, 23 labs re-tested the drain on 2,000 people. / It barely showed.
{ const S = sc(5, { cam: "pull" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  DS.shape(S, rect(380, 384, 1160, 18), "wood", { w: "mid" });
  for (let i = 0; i < 23; i++) beaker(S, 420 + i * 49, 382, 0.7, W(16, 4) + i * 0.025, "mid");
  S.draw(line([560, 860], [1360, 860], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.mid });
  DS.shape(S, rect(640, 860 - 320, 240, 320), "gray", { t: W(16, 7), dir: "h", tone: 1 });
  S.text("EXPECTED", 760, 915, { size: DS.type.caption, t: W(16, 7), c: DS.c("ink") });
  DS.shape(S, rect(1040, 860 - 22, 240, 22), "red", { t: W(17, 1), dir: "h" });
  S.text("FOUND", 1160, 915, { size: DS.type.caption, t: W(17, 1), c: DS.c("ink") });
  DS.card(S, "2016 · 23 LABS · 2,141 PEOPLE", 960, 150, { size: DS.type.small, t: W(16, 2) });
  DS.card(S, "BARELY THERE", 1160, 700, { size: DS.type.small, t: W(17, 1), tc: "red" });
  DS.vignette(S); }

// 6  Baumeister: / wrong test. / His own co-author ran thirty-six more labs. / Same.
{ const S = sc(6); DS.room(S, { wall: "wall", floor: "wood", window: false });
  DS.figure(S, 440, 960, "near", { s: 1.1, hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("white", 2), mood: "determined", look: 6, pose: "point" });
  S.speech(470, 380, 230, 95, 455, 548, W(18, 0), 0.25); S.text("WRONG TEST.", 470, 398, { size: DS.type.small, t: W(19, 0), c: DS.c("ink") });
  DS.shape(S, rrect(860, 200, 820, 560, DS.r.sm), "wood"); DS.shape(S, rect(890, 230, 760, 500), "navy", { flat: true });
  for (let i = 0; i < 36; i++) beaker(S, 990 + (i % 9) * 70, 330 + Math.floor(i / 9) * 100, 0.55, W(20, 4) + i * 0.02);
  DS.card(S, "2021 · 36 LABS", 1270, 140, { size: DS.type.small, t: W(20, 4) });
  DS.card(S, "SAME", 1270, 480, { size: DS.type.title, t: W(21, 0), tc: "red" });
  DS.vignette(S); }

// 7  "So I'm not even tired? / I'm just weak?"
{ const S = sc(7, { cam: "zoom", focus: "800 640" }); kitchen(S, { cx: 1620 });
  const top = counter(S, 980, 960, 700);
  tin(S, 1330, top, 1.45);
  dave(S, 600, 960, "near", { s: 0.78, mood: "cry", look: 8, pose: "sad" });
  S.speech(560, 330, 270, 110, 590, 560, W(22, 0), 0.25);
  S.text("NOT TIRED?", 560, 316, { size: DS.type.small, t: W(22, 3), c: DS.c("ink") });
  S.text("JUST WEAK?", 560, 378, { size: DS.type.small, t: W(23, 1), c: DS.c("red") });
  DS.vignette(S, 0.2); }

// 8  In 2012, Wilhelm Hofmann pinged two hundred adults all week: / what do you want, right now?
{ const S = sc(8, { cam: "push", focus: "1200 560" }); const O = DS.outdoor(S, { hy: 620, sky: "sky", sun: [260, 170], ground: "grass" });
  [[300, "purple"], [470, "orange"], [640, "red"]].forEach(([x, c], i) => { const F = DS.figure(S, x, O.hy + 60, "far", { s: 1.1, hair: ["short", "bun", "curly"][i], hairC: DS.c("brown"), outfitC: DS.c(c), mood: "flat", look: 4, pose: "hold" }); const [hx, hy] = F.hand("R"); phone(S, hx, hy - 22, 0.3, { t: W(24, 5) }); });
  const F = DS.figure(S, 760, 960, "near", { s: 1.1, hair: "short", hairC: DS.c("ink"), outfitC: DS.c("yellow"), mood: "flat", look: 6, pose: "hold" });
  F.face(W(25, 3), "wow", 6);
  const [hx, hy] = F.hand("R"); phone(S, hx, hy - 30, 0.45, { t: W(24, 5) });
  DS.drop(S, rrect(1176, 298, 300, 540, DS.r.md));
  phone(S, 1320, 560, 3.1, { t: W(24, 5) });
  ["WHAT DO", "YOU WANT", "NOW?"].forEach((s, i) => S.text(s, 1320, 470 + i * 60, { size: DS.type.caption, t: W(25, 0) + i * 0.15, c: DS.c("ink") }));
  DS.card(S, "2012 · WILHELM HOFMANN", 960, 140, { size: DS.type.small, t: W(24, 3) });
  DS.card(S, "205 ADULTS · 7 DAYS", 1320, 900, { size: DS.type.caption, t: W(24, 8) });
  DS.vignette(S); }

// 9  The most self-controlled wanted things just as often. / But they resisted less.
{ const S = sc(9); DS.room(S, { wall: "wall", floor: "wood", window: false });
  const A = DS.figure(S, 560, 960, "near", { s: 1.1, hair: "short", hairC: DS.c("brown"), outfitC: DS.c("gray"), mood: "flat", look: 4 });
  pat(S, 1300, 960, "near", { mood: "smile", look: -4 });
  [[560, 330], [1300, 330]].forEach(([cx, cy]) => { S.thought(cx, cy, 210, 110, cx, 520, W(26, 3), 0.3); cookie(S, cx - 70, cy, 42, { t: W(26, 3) }); phone(S, cx + 70, cy, 0.5, { t: W(26, 4) }); });
  A.setPose(W(27, 2), "head"); A.face(W(27, 2), "angry", 4);
  S.burst(560, 330, 230, 280, 10, W(27, 2), 0.25, { c: DS.c("red") });
  DS.card(S, "JUST AS MANY WANTS", 960, 140, { size: DS.type.small, t: W(26, 5) });
  DS.card(S, "FEWER FIGHTS", 1590, 640, { size: DS.type.small, t: W(27, 2), tc: "green" });
  DS.vignette(S); }

// 10  Psychologist Michael Ent let people choose where to work: / a boring spot, or a fun one. / The strong-willed picked boring.
{ const S = sc(10, { cam: "push" }); DS.room(S, { wall: "wall", floor: "wood", window: false });
  // left doorway: plain room with a bare desk
  DS.shape(S, rect(456, 286, 348, 488), "wood", { w: "mid" }); DS.shape(S, rect(480, 310, 300, 450), "gray", { tone: 1, flat: true, w: "detail" });
  DS.shape(S, rrect(540, 580, 180, 18, DS.r.xs), "wood", { w: "detail", layer: "mid" }); [556, 694].forEach((lx) => DS.shape(S, rect(lx, 598, 10, 150), "wood", { w: "detail", layer: "mid" }));
  // right doorway: the fun room (screen, balloons)
  DS.shape(S, rect(1116, 286, 348, 488), "wood", { w: "mid" }); DS.shape(S, rect(1140, 310, 300, 450), "purple", { tone: 1, flat: true, w: "detail" });
  DS.shape(S, rrect(1200, 470, 180, 120, DS.r.xs), "navy", { w: "detail", layer: "mid" }); DS.shape(S, poly([[1275, 505], [1315, 530], [1275, 555], [1275, 505]], 0), "red", { w: "hair", flat: true });
  [[1190, 380, "yellow"], [1250, 350, "pink"], [1400, 380, "orange"]].forEach(([bx, by, c]) => { S.draw(line([bx, by + 34], [bx + 6, by + 120], 0), S.start, 0, { c: DS.c("ink"), w: DS.w.hair }); DS.shape(S, circ(bx, by, 28, 34), c, { w: "detail" }); });
  const F = pat(S, 960, 960, "near", { mood: "flat", look: 0 });
  F.face(W(30, 1), "determined", -8);
  S.tick(630, 520, 2.2, W(30, 3), 0.25, { c: DS.c("green"), w: DS.w.near * 2 });
  DS.card(S, "2015 · MICHAEL ENT", 960, 140, { size: DS.type.small, t: W(28, 1) });
  DS.card(S, "BORING", 630, 240, { size: DS.type.small, t: W(29, 1) });
  DS.card(S, "FUN", 1290, 240, { size: DS.type.small, t: W(29, 5) });
  DS.vignette(S); }

// 11  They don't win the fight. / They don't turn up.
{ const S = sc(11, { cam: "zoom", focus: "960 680" }); DS.room(S, { wall: "navy", floor: "gray", window: false });
  DS.shape(S, poly([[260, 900], [520, 620], [1400, 620], [1660, 900], [260, 900]], 0), "blue", { w: "mid" });
  DS.shape(S, rect(260, 900, 1400, 36), "red", { w: "mid", flat: true });
  [[520, 620, 150], [1400, 620, 150], [260, 900, 250], [1660, 900, 250]].forEach(([px, py, ph]) => DS.shape(S, rrect(px - 12, py - ph, 24, ph, DS.r.xs), "gray", { w: "mid" }));
  [0.25, 0.55, 0.85].forEach((f) => { const dy = (y, ph) => y - ph * f;
    S.draw(line([520, dy(620, 150)], [1400, dy(620, 150)], 0), S.start, 0, { c: DS.c("red"), w: DS.w.mid });
    S.draw(line([520, dy(620, 150)], [260, dy(900, 250)], 0), S.start, 0, { c: DS.c("red"), w: DS.w.near });
    S.draw(line([1400, dy(620, 150)], [1660, dy(900, 250)], 0), S.start, 0, { c: DS.c("red"), w: DS.w.near }); });
  tin(S, 620, 790, 0.85);
  DS.card(S, "TONIGHT'S FIGHT", 960, 150, { size: DS.type.body, t: W(31, 4) });
  DS.card(S, "NO-SHOW", 1300, 700, { size: DS.type.title, t: W(32, 0), tc: "red" });
  DS.vignette(S, 0.18); }

// 12  Dave isn't weak. / He was fighting a fight / strong people skip.
{ const S = sc(12, { cam: "push", focus: "700 560" }); kitchen(S, { cx: 1000 });
  const top = counter(S, 1060, 960, 600);
  tin(S, 1360, top, 0.9);
  const F = dave(S, 640, 960, "near", { s: 1.35, mood: "flat", look: 6 });
  F.face(W(33, 2), "happy", 4); F.setPose(W(33, 2), "hips");
  DS.card(S, "NOT WEAK", 640, 220, { size: DS.type.title, t: W(33, 2), tc: "green" });
  DS.card(S, "A FIGHT TO SKIP", 1360, 380, { size: DS.type.small, t: W(35, 2), tc: "red" });
  DS.vignette(S); }

// 13  Tonight, move the tin, / or the phone, / to another room.
{ const S = sc(13, { cam: "pull" }); kitchen(S, { cx: 1000 });
  DS.shape(S, rect(1286, 336, 268, 424), "wood", { w: "mid" }); DS.shape(S, rect(1306, 356, 228, 404), "navy", { flat: true, w: "detail" });
  S.fill(rect(1306, 356, 228, 404), S.start, 0, DS.c("gold", 1), 0.25);
  const F = dave(S, 760, 960, "near", { mood: "determined", look: 8, pose: "hold" });
  const [hx, hy] = F.hand("R");
  tin(S, hx - 10, hy + 50, 0.62, { t: W(36, 1), noShadow: true });
  phone(S, hx + 130, hy - 10, 0.55, { t: W(37, 2) });
  S.arrow(900, 860, 1270, 700, W(38, 1), 0.4, { c: DS.c("green"), w: DS.w.near, bend: -0.15 });
  DS.card(S, "ANOTHER ROOM", 1420, 270, { size: DS.type.small, t: W(38, 1), tc: "green" });
  DS.card(S, "MOVE IT", 760, 420, { size: DS.type.body, t: W(36, 1) });
  DS.vignette(S); }

// 14  The tin is still undefeated. / It just stops getting fights.
{ const S = sc(14, { cam: "push", focus: "1300 400" }); DS.room(S, { wall: "gray", floor: "wood", window: false });
  DS.shadow(S, 1300, 960, 520);
  DS.shape(S, rect(1050, 150, 500, 810), "wood");
  [330, 560, 790].forEach((sy) => DS.shape(S, rect(1050, sy, 500, 22), "wood", { tone: 2, w: "detail" }));
  DS.shape(S, rect(1080, 180, 440, 150), "wood", { tone: 2, flat: true, w: "hair" });
  tin(S, 1300, 330, 0.7, { noShadow: true });
  [[1140, 560, 120, 110, "gray"], [1300, 560, 140, 80, "earth"], [1440, 790, 130, 120, "gray"], [1160, 790, 160, 90, "earth"]].forEach(([x, y, w, h, c]) => DS.shape(S, rect(x - w / 2, y - h, w, h), c, { w: "detail" }));
  DS.card(S, "STILL UNDEFEATED", 620, 330, { size: DS.type.body, t: W(39, 4), tc: "red" });
  DS.card(S, "FIGHTS BOOKED: 0", 620, 470, { size: DS.type.small, t: W(40, 2) });
  DS.vignette(S, 0.16); }

// 15  You are not weak. / You were standing too close.   (callback: same kitchen, ten o'clock, the counter empty, the tin far away)
{ const S = sc(15, { cam: "pull" }); kitchen(S, { cx: 1520 });
  DS.shape(S, rect(1316, 376, 248, 384), "wood", { w: "mid" }); DS.shape(S, rect(1336, 396, 208, 364), "navy", { flat: true, w: "detail" });
  S.fill(rect(1336, 396, 208, 364), S.start, 0, DS.c("gold", 1), 0.25);
  DS.shape(S, rect(1360, 560, 160, 12), "wood", { layer: "far", w: "detail" });
  tin(S, 1440, 560, 0.42, { layer: "far", noShadow: true });
  const top = counter(S, 700, 960, 480);
  S.draw(circ(940, top - 4, 100, 16), S.start, 0, { c: DS.c("gray", 2), w: DS.w.detail });
  const F = dave(S, 420, 960, "near", { s: 1.15, mood: "smile", look: 6 });
  F.face(W(41, 3), "happy", 2);
  S.arrow(560, 520, 1320, 520, W(42, 2), 0.5, { c: DS.c("green"), w: DS.w.near });
  DS.card(S, "YOU ARE NOT WEAK", 900, 170, { size: DS.type.title, t: W(41, 2), tc: "green" });
  DS.plant(S, 1820, 1130, 0.9, -1); DS.vignette(S); }
