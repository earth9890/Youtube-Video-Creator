// look: still
// C (clickbait scene mode, 2026-10-20): Dave's kitchen at ten at night. Huge terrified Dave squares up in boxing gloves; on the
// counter, under a warm light, the smug biscuit tin wears the champion's belt and punches, biscuits flying.
// Wrongness: a biscuit tin that is undefeated (the video's runner: "the tin is undefeated"). Text = the stakes.
const GUARD = [[[-55, 25], [-58, -30]], [[55, 25], [58, -30]]]; // fists up (copied from ../scenes.js)
const cookie = (S, cx, cy, r) => {
  DS.shape(S, circ(cx, cy, r), "earth", { w: "mid" });
  [[-0.4, -0.3], [0.35, -0.35], [0.05, 0.1], [-0.3, 0.4], [0.4, 0.35]].forEach(([dx, dy]) => S.fill(circ(cx + dx * r, cy + dy * r, r * 0.14), 0, 0, DS.c("brown"), 1));
};
const clock10 = (S, cx, cy, r) => {
  DS.drop(S, circ(cx + 6, cy + 8, r));
  DS.shape(S, circ(cx, cy, r), "white", { w: "mid" });
  [0, 1, 2, 3].forEach((i) => { const a = (i * Math.PI) / 2; S.draw(line([cx + Math.cos(a) * r * 0.78, cy + Math.sin(a) * r * 0.78], [cx + Math.cos(a) * r * 0.9, cy + Math.sin(a) * r * 0.9], 0), 0, 0, { c: DS.c("ink"), w: DS.w.detail }); });
  S.draw(line([cx, cy], [cx, cy - r * 0.72], 0), 0, 0, { c: DS.c("ink"), w: DS.w.mid });
  S.draw(line([cx, cy], [cx - r * 0.43, cy - r * 0.25], 0), 0, 0, { c: DS.c("ink"), w: DS.w.near });
};
const glove = (x, y, k, d) => { // red mitt, white cuff below; d = thumb side
  S.draw(rrect(x - 75 * k, y - 85 * k, 150 * k, 170 * k, 66 * k), 0, 0, { c: "#1d1b1f", w: 9, fill: "#D93A45" });
  S.draw(rrect(x - 62 * k, y + 70 * k, 124 * k, 52 * k, 10 * k), 0, 0, { c: "#1d1b1f", w: 8, fill: "#ffffff" });
  S.draw(smooth([[x - 28 * k * d, y - 40 * k], [x - 50 * k * d, y + 6 * k], [x - 28 * k * d, y + 40 * k]]), 0, 0, { c: "#1d1b1f", w: 7 });
};
const drop = (x, y, k) => S.draw(`M${x} ${y - 34 * k} Q${x + 26 * k} ${y + 2 * k} ${x} ${y + 16 * k} Q${x - 26 * k} ${y + 2 * k} ${x} ${y - 34 * k} Z`, 0, 0, { c: "#1d1b1f", w: 6, fill: "#6fc3ff" });

const S = scene(0, 1, { cam: "none" });
DS.room(S, { wall: "wall", floor: "wood", window: false, back: [260, 40, 1760, 760] });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#3b2412", 0.32); // ten at night: dim kitchen
// the night outside, through a window
DS.shape(S, rrect(700, 330, 300, 250, DS.r.xs), "white", { w: "mid" });
DS.shape(S, rect(716, 346, 268, 218), "night", { flat: true, tone: 2, w: "hair" });
S.fill(circ(920, 400, 26), 0, 0, DS.c("yellow", 1), 1);
[[760, 380], [820, 520], [900, 480], [960, 530]].forEach(([x, y]) => S.fill(circ(x, y, 4), 0, 0, "#ffffff", 0.85));
S.draw("M850 346 V564 M716 455 H984", 0, 0, { c: "#ffffff", w: DS.w.near });
clock10(S, 1085, 330, 56);
// warm light on the champion
S.fill(circ(1400, 640, 700, 560), 0, 0, DS.glow("#ffd27a", 0.6), 1);
// counter
DS.shadow(S, 1450, 1060, 1000);
DS.shape(S, rect(980, 760, 960, 330), "wood");
DS.shape(S, rrect(960, 730, 1000, 36, DS.r.xs), "gray", { tone: 1 });
// the biscuit tin: belt, smug face, gloves
const cx = 1420, by = 732, k = 2.0;
DS.shadow(S, cx, by, 270 * k);
DS.shape(S, rrect(cx - 110 * k, by - 170 * k, 220 * k, 170 * k, DS.r.sm), "blue");
DS.shape(S, rrect(cx - 122 * k, by - 200 * k, 244 * k, 42 * k, DS.r.sm), "gold");
S.draw(rect(cx - 112 * k, by - 108 * k, 224 * k, 46 * k), 0, 0, { c: "#1d1b1f", w: 8, fill: "#1d1b1f" });
DS.shape(S, circ(cx, by - 85 * k, 40 * k, 32 * k), "gold", { w: "mid" });
cookie(S, cx, by - 85 * k, 24 * k);
[-1, 1].forEach((sd) => { // half-lidded smug eyes
  const ex = cx + sd * 50 * k, ey = by - 138 * k;
  S.draw(circ(ex, ey, 20 * k), 0, 0, { c: "#1d1b1f", w: 7, fill: "#ffffff" });
  S.fill(circ(ex - 6 * k, ey + 5 * k, 9 * k), 0, 0, "#1d1b1f", 1);
  S.draw(`M${ex - 21 * k} ${ey} A${20 * k} ${20 * k} 0 0 1 ${ex + 21 * k} ${ey} Z`, 0, 0, { c: "#1d1b1f", w: 7, fill: DS.c("blue", 2) });
});
S.draw(smooth([[cx - 44 * k, by - 40 * k], [cx - 6 * k, by - 26 * k], [cx + 40 * k, by - 46 * k]]), 0, 0, { c: "#1d1b1f", w: 9 });
// arms: one glove raised, one punching at Dave with speed lines and flying biscuits
S.draw(line([cx + 110 * k, by - 110 * k], [cx + 150 * k, by - 160 * k], 0), 0, 0, { c: "#1d1b1f", w: 12 });
glove(cx + 170 * k, by - 210 * k, 1.0, 1);
S.draw(line([cx - 110 * k, by - 100 * k], [cx - 200 * k, by - 120 * k], 0), 0, 0, { c: "#1d1b1f", w: 12 });
glove(cx - 250 * k, by - 128 * k, 1.0, -1);
[[1080, 420, 140], [1110, 520, 120]].forEach(([x, y, l]) => S.draw(line([x, y], [x + l, y], 0), 0, 0, { c: "#1d1b1f", w: 8 }));
cookie(S, 900, 700, 46); cookie(S, 1010, 615, 36);
[[960, 680], [1060, 600]].forEach(([x, y]) => S.draw(line([x + 30, y - 10], [x + 110, y - 30], 0), 0, 0, { c: "#1d1b1f", w: 6 }));
// huge terrified Dave, gloves up
const F = DS.figure(S, 450, 1900, "near", { s: 4.2, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue"), mood: "wow", look: 9, armL: GUARD[0], armR: GUARD[1] });
{ const [lx, ly] = F.hand("L"), [rx, ry] = F.hand("R"); glove(lx, ly - 30, 1.15, -1); glove(rx, ry - 30, 1.15, 1); }
drop(700, 420, 1.6); drop(200, 360, 1.3);
S.text("LOST AGAIN?", 960, 215, { size: 190, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
