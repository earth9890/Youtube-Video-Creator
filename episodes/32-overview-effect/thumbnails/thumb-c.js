// look: still
// C (clickbait scene mode, 2026-10-20): inside a capsule, a big round window full of Earth. A huge generic astronaut
// (no likeness) sobs, his tears floating off in zero-g. Text "GRIEF?": the video's
// part nobody talks about (a ninety-year-old "climbed out in tears", then called it "among the strongest feelings of grief").
// @include kit.js
const S = scene(0, 1, { cam: "none" });
// padded capsule wall: warm khaki quilting, amber cabin lamp top-left, control panel bottom-right
S.fill(rect(-200, -200, 2320, 1480), 0, 0, DS.vgrad("#cdb98f", "#9c8762"), 1);
[[-40, -60, 620, 560], [-40, 520, 620, 700], [600, -60, 1400, 1200]].forEach(([x, y, w, h]) => S.draw(rrect(x, y, w, h, DS.r.lg), 0, 0, { c: "#8a7655", w: DS.w.mid }));
[[40, 40], [520, 40], [680, 40], [1900, 40], [40, 600], [520, 600]].forEach(([x, y]) => S.fill(circ(x, y, 9), 0, 0, "#8a7655", 1));
S.fill(circ(240, 110, 620), 0, 0, DS.glow("#ffd27a", 0.7), 1);
DS.shape(S, rrect(1180, 920, 780, 240, DS.r.md), "gray", { tone: 2, w: "mid" });
for (let c = 0; c < 9; c++) for (let r = 0; r < 2; r++) { const x = 1220 + c * 78, y = 955 + r * 62; if ((c + r * 2) % 3 === 0) S.fill(circ(x + 18, y + 14, 15), 0, 0, ["#ffcf33", "#ff8c1a", "#6fc078"][(c + r) % 3], 1); else DS.shape(S, rrect(x, y, 38, 28, DS.r.xs), "gray", { tone: 1, flat: true, w: "hair" }); }
// the porthole: black space, stars, the whole Earth glowing
const WX = 1340, WY = 540, WR = 330;
DS.shape(S, circ(WX, WY, WR + 44), "gray", { tone: 1, w: "mid" });
[0, 45, 90, 135, 180, 225, 270, 315].forEach((a) => { const q = (a * Math.PI) / 180; S.fill(circ(WX + Math.cos(q) * (WR + 22), WY + Math.sin(q) * (WR + 22), 9), 0, 0, DS.c("gray", 2), 1); });
const win = clipTo(S.grp(), circ(WX, WY, WR));
S.fill(rect(WX - WR, WY - WR, WR * 2, WR * 2), 0, 0, "#05031A", 1, win);
for (let i = 0; i < 40; i++) S.fill(circ(WX - WR + ((i * 733 + 151) % 660), WY - WR + ((i * 397 + 67) % 660), 2 + (i % 3)), 0, 0, "#ffffff", 0.4 + (i % 5) * 0.1, win);
S.fill(circ(WX + 40, WY + 60, 420), 0, 0, DS.glow("#30B0E9", 0.55), 1, win);
earth(S, WX + 40, WY + 60, 250, { parent: win });
S.draw(circ(WX, WY, WR), 0, 0, { c: DS.c("ink"), w: DS.w.near });
S.fill(circ(WX, WY, WR + 260), 0, 0, DS.glow("#9fd8ff", 0.25), 1); // earthlight spills into the cabin
// huge astronaut: white suit, helmet ring, sobbing
const F = who(S, 430, 1900, "near", { s: 4.3, hair: "short", hairC: DS.c("brown", 2), outfitC: DS.c("white", 2), mood: "cry", look: 6, breathe: false,
  armL: [[-50, 30], [-30, -30]], armR: [[50, 30], [30, -30]] });
const [hx, hy] = F.hd, R = F.r;
DS.shape(S, rrect(hx - R * 0.95, hy + R * 0.92, R * 1.9, R * 0.42, DS.r.md), "gray", { w: "mid" }); // collar ring
S.fill(circ(hx, hy, R * 1.36), 0, 0, DS.c("glass", 1), 0.18);
S.draw(circ(hx, hy, R * 1.36), 0, 0, { c: DS.c("gray", 2), w: 16 });
S.draw(arc(hx, hy, R * 1.22, 205, 250), 0, 0, { c: "#ffffff", w: 12 });
// wailing mouth
const mx = hx + 6 * 4.3 * 0.8;
S.draw(`M${mx - 62} ${hy + 134} Q${mx} ${hy + 18} ${mx + 62} ${hy + 134} Q${mx} ${hy + 166} ${mx - 62} ${hy + 134} Z`, 0, 0, { c: DS.c("ink"), w: 10, fill: "#8c2f39" });
// tears floating off in zero-g
[[hx - 150, hy + 10, 30], [hx - 205, hy - 70, 22], [hx - 245, hy + 40, 15], [hx - 180, hy - 150, 12], [hx + 160, hy + 0, 30], [hx + 215, hy - 80, 22], [hx + 250, hy + 30, 15], [hx + 190, hy - 160, 12]].forEach(([x, y, r]) => {
  S.draw(circ(x, y, r), 0, 0, { c: DS.c("blue"), w: 5, fill: DS.c("sky", 1) }); S.fill(circ(x - r * 0.3, y - r * 0.3, r * 0.3), 0, 0, "#ffffff", 0.9); });
S.text("GRIEF?", 960, 225, { size: 230, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
