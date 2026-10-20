// look: still
// C (clickbait scene mode, 2026-10-20): the pub at night. Huge terrified Dave stares at the bill ($90, three friends) and goes
// blank, while behind him his three darts sit in the bullseye; two friends wait for his answer at the table.
// Wrongness: a man who never misses at darts, beaten by 90 ÷ 3 (the video's hook). Text = the sum itself.
const dave = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
// dartboard (copied from ../scenes.js): black number ring, red/green double ring, cream beds, segment lines, bull
const dartboard = (S, cx, cy, r, t) => {
  DS.drop(S, circ(cx + 8, cy + 10, r), { t });
  DS.shape(S, circ(cx, cy, r), "ink", { t, w: "mid", flat: true });
  DS.shape(S, circ(cx, cy, r * 0.8), "red", { t, w: "hair", flat: true });
  DS.shape(S, circ(cx, cy, r * 0.72), "paper", { t, w: "hair", flat: true });
  DS.shape(S, circ(cx, cy, r * 0.5), "green", { t, w: "hair", flat: true });
  DS.shape(S, circ(cx, cy, r * 0.43), "paper", { t, w: "hair", flat: true });
  for (let i = 0; i < 20; i++) { const a = (i * Math.PI) / 10; S.draw(line([cx + Math.cos(a) * r * 0.12, cy + Math.sin(a) * r * 0.12], [cx + Math.cos(a) * r * 0.8, cy + Math.sin(a) * r * 0.8], 0), t ?? S.start, 0, { c: DS.c("ink"), w: DS.w.hair }); }
  DS.shape(S, circ(cx, cy, r * 0.12), "green", { t, w: "hair", flat: true });
  DS.shape(S, circ(cx, cy, r * 0.05), "red", { t, w: "hair", flat: true });
};
// a dart stuck in the board: tip at (x, y), barrel out towards angle a (deg), k = size
const dart = (S, x, y, a, k = 1) => { const c = Math.cos((a * Math.PI) / 180), s = Math.sin((a * Math.PI) / 180), P = (d, o = 0) => [x + c * d * k - s * o * k, y + s * d * k + c * o * k];
  S.draw(line(P(0), P(110), 0), 0, 0, { c: DS.c("gray", 2), w: 9 * k });
  DS.shape(S, poly([P(96), P(150, -26), P(140), P(150, 26)], 0) + " Z", "red", { w: "detail", flat: true }); };
// halo'd yellow headline pieces (the font has no ÷, so the sign is drawn)
const Y = "#FEFE06", K = "#111111";
const divSign = (x, y, k) => { [[K, 46 * k, 33 * k], [Y, 26 * k, 23 * k]].forEach(([c, w, r]) => { S.draw(line([x - 62 * k, y], [x + 62 * k, y], 0), 0, 0, { c, w }); [-48, 48].forEach((dy) => S.fill(circ(x, y + dy * k, r), 0, 0, c, 1)); }); };

const S = scene(0, 1, { cam: "none" });
DS.room(S, { wall: "wood", floor: "floor", window: false, back: [240, 40, 1680, 820] });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#2a1608", 0.25); // night pub: dim, warm
S.fill(circ(1300, 520, 1000, 700), 0, 0, DS.glow("#ffc56b", 0.5), 1);
// wainscot rail along the back wall
DS.shape(S, rect(240, 560, 1440, 22), "wood", { tone: 2, flat: true, w: "detail", layer: "mid" });
// pub lamp over the table
S.draw(line([1250, -20], [1250, 470], 0), 0, 0, { c: "#1d1b1f", w: 6 });
DS.shape(S, "M1185 530 L1315 530 L1288 470 L1212 470 Z", "yellow");
S.fill(circ(1250, 560, 260), 0, 0, DS.glow("#fff0c0", 0.6), 1);
// the dartboard with three darts in the bull
dartboard(S, 1610, 330, 150);
dart(S, 1604, 326, -18, 1.2); dart(S, 1614, 336, 8, 1.2); dart(S, 1606, 338, 34, 1.2);
// two friends waiting behind the table
const A = DS.figure(S, 1330, 990, "near", { s: 1.15, hair: "bun", hairC: DS.c("ink"), outfitC: DS.c("green"), mood: "flat", look: -8, pose: "hips" });
const B = DS.figure(S, 1640, 990, "near", { s: 1.15, hair: "curly", hairC: DS.c("brown", 2), outfitC: DS.c("purple"), mood: "flat", look: -8, pose: "cross" });
// pub table + three pints
DS.shadow(S, 1500, 1075, 700);
DS.shape(S, rect(1240, 930, 560, 200), "wood", { tone: 2 });
DS.shape(S, rrect(1200, 900, 640, 44, DS.r.xs), "wood");
[1250, 1485, 1765].forEach((x) => { DS.shape(S, `M${x - 34} 810 L${x + 34} 810 L${x + 28} 902 L${x - 28} 902 Z`, "gold", { w: "mid" }); S.fill(rect(x - 33, 810, 66, 20), 0, 0, "#fff6e0", 1); });
// huge terrified Dave, blank
const F = dave(S, 380, 1900, "near", { s: 4.2, mood: "wow", look: 8, armL: [[-28, 52], [-48, 100]], armR: [[34, 14], [66, -22]] });
[[610, 430, 1.6], [150, 520, 1.3]].forEach(([x, y, k]) => S.draw(`M${x} ${y - 34 * k} Q${x + 26 * k} ${y + 2 * k} ${x} ${y + 16 * k} Q${x - 26 * k} ${y + 2 * k} ${x} ${y - 34 * k} Z`, 0, 0, { c: "#1d1b1f", w: 6, fill: "#6fc3ff" }));
// the bill, held up in Dave's hand, shaking
const bx = 760, by = 470, bw = 330, bh = 440;
const zz = Array.from({ length: 9 }, (_, i) => [bx + bw - (i * bw) / 8, by + bh + (i % 2 ? 18 : 0)]);
const bg = S.grp();
DS.drop(S, rect(bx + 8, by + 10, bw, bh), { parent: bg });
DS.shape(S, poly([[bx, by], [bx + bw, by], ...zz, [bx, by + bh]], 0), "white", { w: "mid", flat: true, parent: bg });
S.text("BILL", bx + bw / 2, by + 80, { size: 56, c: DS.c("ink"), parent: bg });
S.text("$90", bx + bw / 2, by + 220, { size: 130, c: DS.c("ink"), parent: bg });
S.text("3 FRIENDS", bx + bw / 2, by + 320, { size: 50, c: DS.c("gray", 2), parent: bg });
bg.setAttribute("transform", `rotate(-6 ${bx + bw / 2} ${by + bh / 2})`);
[[bx - 40, by + 60], [bx - 52, by + 120], [bx + bw + 30, by + 40], [bx + bw + 42, by + 100]].forEach(([x, y]) => S.draw(line([x, y], [x + 18, y - 30], 0), 0, 0, { c: "#1d1b1f", w: 8 }));
// headline: 90 ÷ 3?
S.text("90", 690, 230, { size: 220, c: Y, halo: K, haloW: 0.09 });
divSign(960, 160, 1);
S.text("3?", 1225, 230, { size: 220, c: Y, halo: K, haloW: 0.09 });
