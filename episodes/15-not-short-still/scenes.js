// look: still
// You Are Not Short — still-style test (3 scenes). Every token from kit.js DS; lint: scene_lint.py.
const dave = (S, x, gy, layer, o = {}) => DS.figure(S, x, gy, layer, Object.assign({ hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
const ball = (S, x, gy, r, layer = "near") => { DS.shadow(S, x, gy, r * 2); DS.shape(S, circ(x, gy - r, r), "white", { layer }); S.fill(circ(x, gy - r, r * 0.32), S.start, 0, DS.c("ink", 0, layer)); };
const tripod = (S, x, gy, k, layer = "near") => {
  [-1, 0, 1].forEach((d) => S.draw(line([x, gy - 260 * k], [x + d * 90 * k, gy], 0), S.start, 0, { c: DS.line(layer), w: DS.w[DS.depth[layer].w] }));
  DS.shape(S, rrect(x - 120 * k, gy - 400 * k, 240 * k, 150 * k, DS.r.sm), "navy", { layer });
  DS.shape(S, circ(x, gy - 325 * k, 52 * k), "glass", { layer });
  S.fill(circ(x - 14 * k, gy - 340 * k, 14 * k), S.start, 0, DS.P.white[0]);
};

const CUES = [[1, 0], [4, 0], [6, 0], [8, 0], [9, 0], [12, 0], [14, 0], [16, 0], [19, 0], [21, 0], [23, 0], [25, 0], [28, 0], [31, 0]];
const WIN = sceneWindows(CUES, 0.15);
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0  This is Dave. / Every family photo: front row, / with the kids.
{ const S = sc(0, { cam: "push", focus: "960 640" }); const R = DS.room(S, { window: false });
  DS.frame(S, 380, 170, 160, 120, "sky"); DS.frame(S, 1400, 150, 140, 180, "grass"); DS.rug(S, 960, 935, 1100, "red");
  [[560, "bun", "purple"], [760, "short", "green"], [1160, "curly", "orange"], [1360, "spiky", "gray"]].forEach(([x, h, c]) =>
    DS.figure(S, x, R.hy + 40, "mid", { s: 1.45, hair: h, hairC: DS.c("brown"), outfitC: DS.c(c, 0, "mid"), mood: "smile" }));
  [[620, "yellow", "spiky"], [1300, "pink", "bun"]].forEach(([x, c, h]) => DS.figure(S, x, 960, "near", { s: 0.68, hair: h, hairC: DS.c("brown"), outfitC: DS.c(c), mood: "happy" }));
  dave(S, 960, 960, "near", { s: 0.9, mood: "flat", look: 0 });
  DS.card(S, "FRONT ROW", 960, 150, { size: DS.type.body, t: W(2, 3) });
  DS.card(S, "WITH THE KIDS", 960, 250, { size: DS.type.small, t: W(3, 1), tc: "red" });
  DS.plant(S, 150, 1120, 1.15, 1); DS.vignette(S); }

// 5  But look who the world looks up to. / Lionel Messi, five foot seven, Sachin Tendulkar, five foot five,
{ const S = sc(5, { cam: "pull" }); const O = DS.outdoor(S, { hy: 600, path: [700, 1220] });
  [[300, "gray"], [420, "green"], [1520, "orange"], [1640, "purple"]].forEach(([x, c]) => DS.figure(S, x, O.hy + 70, "far", { s: 1.1, outfitC: DS.c(c, 0, "far"), mood: "wow" }));
  const M = DS.figure(S, 640, 930, "near", { s: 1.05, hair: "short", hairC: DS.c("brown", 2), outfitC: DS.c("sky", 2), mood: "smile", t: W(13, 0) });
  ball(S, 760, 930, 32);
  const T = DS.figure(S, 1280, 930, "near", { s: 1.0, hair: "curly", hairC: DS.c("ink"), outfitC: DS.c("blue"), mood: "smile", t: W(13, 5) });
  const [hx, hy] = T.hand("R"); DS.shape(S, rrect(hx - 14, hy - 230, 30, 260, DS.r.sm), "wood", { t: W(13, 5) });
  DS.card(S, "WHO WE LOOK UP TO", 960, 140, { size: DS.type.body, t: W(12, 2) });
  DS.card(S, "MESSI · 5'7\"", 640, 420, { size: DS.type.caption, t: W(13, 2) });
  DS.card(S, "SACHIN · 5'5\"", 1280, 420, { size: DS.type.caption, t: W(13, 7) });
  DS.vignette(S); }

// 12  Saturday, front row, same height. / But the camera looks there first, / and Dave looks back.
{ const S = sc(12, { cam: "zoom", focus: "980 700" }); const R = DS.room(S, { wall: "dusk", floor: "wood", window: false });
  DS.frame(S, 380, 170, 170, 130, "pink"); DS.frame(S, 1400, 150, 140, 180, "gold"); DS.rug(S, 960, 935, 1100, "gold");
  [[600, "bun", "purple"], [800, "short", "green"], [1140, "curly", "orange"], [1340, "spiky", "gray"]].forEach(([x, h, c]) =>
    DS.figure(S, x, R.hy + 40, "mid", { s: 1.45, hair: h, hairC: DS.c("brown"), outfitC: DS.c(c, 0, "mid"), mood: "smile" }));
  [[680, "yellow", "spiky"], [1260, "pink", "bun"]].forEach(([x, c, h]) => DS.figure(S, x, 960, "near", { s: 0.68, hair: h, hairC: DS.c("brown"), outfitC: DS.c(c), mood: "happy" }));
  const F = dave(S, 970, 960, "near", { s: 0.9, mood: "smile", outfitC: DS.c("navy") });
  tripod(S, 1700, 1100, 1.25);
  DS.card(S, "SAME HEIGHT", 960, 150, { size: DS.type.body, t: W(28, 4) });
  S.arrow(1560, 560, 1040, 700, W(29, 4), 0.4, { c: DS.c("red"), w: DS.w.near, bend: 0.15 });
  F.face(W(30, 2), "happy", 6); DS.vignette(S); }
