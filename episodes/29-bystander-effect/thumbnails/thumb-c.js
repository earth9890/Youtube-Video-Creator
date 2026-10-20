// look: still
// C (clickbait scene mode, 2026-10-20): the smoke room. Smoke pours from the wall vent and fills the ceiling; two actor
// students keep writing and shrug; huge Dave in front panics. Text "IT'S FINE?": the video's pluralistic-ignorance beat
// ("everyone looked calm, so everyone decided it was fine"; 9 of 10 stayed in the smoke and did not open the door).
// ---------- helpers (from scenes.js) ----------
const who = (S, x, gy, layer = "near", o = {}) => {
  const s = (o.s || 1.1) * DS.depth[layer].s, g = o.parent || S.grp();
  DS.shadow(S, x, o.gs ?? gy, 150 * s, { t: o.t, parent: g });
  const F = S.fig(x, gy, Object.assign({ hair: "short", outfit: "tee" }, o, { s, parent: g, w: DS.w[DS.depth[layer].w] * 1.3 * Math.sqrt(s) })).draw(o.t ?? S.start, 0.4);
  F.face(o.t ?? S.start, o.mood || "flat", o.look || 0);
  F.all = g;
  return F;
};
const seated = (S, x, top, o = {}) => who(S, x, top + 50, "near", Object.assign({ sit: true, pose: "hold" }, o));
const table = (S, x0, x1, top, gy) => { DS.shadow(S, (x0 + x1) / 2, gy, x1 - x0 + 60); DS.shape(S, rect(x0 + 24, top + 20, x1 - x0 - 48, gy - top - 20), "wood", { tone: 2 }); DS.shape(S, rrect(x0, top, x1 - x0, 28, DS.r.xs), "wood"); };
const paperR = (S, x, y, w, h) => { DS.drop(S, rect(x + 6, y + 8, w, h)); DS.shape(S, rect(x, y, w, h), "white", { w: "detail", flat: true }); };
const vent = (S, x, y, k = 1) => { DS.shape(S, rrect(x - 70 * k, y - 40 * k, 140 * k, 80 * k, DS.r.xs), "gray", { tone: 1, w: "mid" }); for (let i = 0; i < 4; i++) S.draw(line([x - 54 * k, y - 24 * k + i * 16 * k], [x + 54 * k, y - 24 * k + i * 16 * k], 0), 0, 0, { c: DS.c("ink", 1), w: DS.w.detail }); };
// billowing smoke: circles merged into one mass (ink rim, grey body, light top-left lobes)
const smoke = (S, B) => {
  B.forEach(([x, y, r]) => S.fill(circ(x, y, r + 7), 0, 0, DS.P.ink[0], 1));
  B.forEach(([x, y, r]) => S.fill(circ(x, y, r), 0, 0, "#a7abb1", 1));
  B.forEach(([x, y, r]) => S.fill(circ(x - r * 0.12, y - r * 0.16, r * 0.84), 0, 0, "#dcdde0", 1));
  B.forEach(([x, y, r]) => S.fill(circ(x - r * 0.3, y - r * 0.34, r * 0.4), 0, 0, "#f4f4f5", 0.9));
};

const S = scene(0, 1, { cam: "none" });
DS.room(S, { wall: "earth", floor: "wood", window: false });
// back wall: door (closed) with a green EXIT sign, window with daylight, the vent
DS.shape(S, rect(686, 336, 228, 440), "white", { layer: "mid", w: "mid" });
DS.shape(S, rect(700, 350, 200, 426), "wood", { layer: "mid", dir: "h" });
DS.shape(S, circ(874, 580, 10), "gold", { layer: "mid", w: "detail" });
DS.shape(S, rrect(1396, 196, 188, 268, DS.r.xs), "white", { layer: "mid", w: "detail" });
DS.shape(S, rect(1410, 210, 160, 240), "sky", { layer: "mid", dir: "v", w: "hair" });
S.draw(`M1490 210 V450 M1410 330 H1570`, 0, 0, { c: "#ffffff", w: DS.w.mid });
S.fill(`M1410 450 L1570 450 L1700 1080 L1060 1080 Z`, 0, 0, "#fff6d6", 0.22); // sunbeam through the smoke
S.fill(circ(1490, 330, 300), 0, 0, DS.glow("#fff6d6", 0.55), 1);
vent(S, 1150, 300, 1.2);
// the smoke: thick along the ceiling, pouring from the vent
S.fill(rect(-200, -200, 2320, 1500), 0, 0, "#9aa0a6", 0.16); // the room is hazy
// a plume out of the vent, rolling left into a thick layer under the ceiling
smoke(S, [[1150, 352, 34], [1100, 392, 46], [1030, 420, 58], [940, 418, 70], [850, 380, 80], [1215, 372, 30],
  [-40, 150, 150], [150, 110, 140], [330, 170, 120], [520, 120, 130], [700, 190, 120], [880, 130, 135], [1060, 200, 115],
  [1240, 140, 130], [1420, 200, 110], [1600, 130, 135], [1790, 190, 125], [1960, 140, 140], [760, 300, 90], [600, 280, 80]]);
// two actor students at the back table, calmly writing / shrugging
const A = seated(S, 1260, 880, { s: 1.5, hair: "short", hairC: DS.c("ink", 1), outfitC: DS.c("gray"), mood: "flat", look: 0 });
const B = seated(S, 1640, 880, { s: 1.5, hair: "curly", hairC: DS.c("brown"), outfitC: DS.c("gray", 2), mood: "flat", look: -6, pose: "shrug" });
table(S, 1080, 1820, 880, 1010);
paperR(S, 1190, 868, 150, 14); paperR(S, 1570, 868, 150, 14);
S.pencil(1320, 866, 110, -40, 0, 0);
smoke(S, [[1430, 560, 44], [1490, 520, 36], [1520, 575, 30], [1385, 590, 28]]); smoke(S, [[1010, 640, 38], [1055, 610, 30], [975, 600, 26]]);
// huge Dave in front: hands on his head, eyes wide, sweating
const F = S.fig(430, 1900, { s: 4.3, hair: "side", hairC: DS.c("brown"), outfit: "tee", outfitC: DS.c("blue"), armL: [[-62, 4], [-26, -50]], armR: [[62, 4], [26, -50]], breathe: false }).instant(0);
F.face(0, "wow", 5);
S.drop(700, 420, 3.0, 0, 0.1, { fill: "#8fd3ff" }); S.drop(180, 500, 2.2, 0, 0.1, { fill: "#8fd3ff" });
S.text("IT'S FINE?", 960, 215, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
