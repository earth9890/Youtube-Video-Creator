// look: still
// C (clickbait scene mode, 2026-10-20): Dave's kitchen at night under one warm lamp. Huge panicking Dave clutches his head while
// Dave at eighteen (messy hair, Thunder Wolf tee) angrily points at the "By 30" list on the fridge; calendar pages fly off the wall.
// Wrongness: an eighteen-year-old giving the orders, and it's Dave (the video's answer). Text = the stakes Dave fears.
const dave = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
// Dave at eighteen (copied from ../scenes.js): messier hair, black Thunder Wolf band tee with a yellow bolt
const young = (S, x, gy, layer = "near", o = {}) => {
  const F = DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "messy", hairC: DS.c("brown"), outfitC: DS.c("ink", 1) }, o)), k = F.s, cx = F.cx, cy = F.sh[1] + 36 * k;
  DS.shape(S, poly([[cx + 8 * k, cy - 26 * k], [cx - 12 * k, cy + 4 * k], [cx, cy + 4 * k], [cx - 8 * k, cy + 26 * k], [cx + 13 * k, cy - 5 * k], [cx + 1 * k, cy - 5 * k]], 0) + " Z", "yellow", { t: o.t, w: "hair", flat: true, parent: F.g });
  return F;
};
const PEN = DS.c("blue", 2);
const drop = (S, x, y, k) => S.draw(`M${x} ${y - 34 * k} Q${x + 26 * k} ${y + 2 * k} ${x} ${y + 16 * k} Q${x - 26 * k} ${y + 2 * k} ${x} ${y - 34 * k} Z`, 0, 0, { c: "#1d1b1f", w: 6, fill: "#6fc3ff" });

const S = scene(0, 1, { cam: "none" });
DS.room(S, { wall: "earth", floor: "wood", window: false, back: [300, 60, 1620, 800] });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#3a2414", 0.28); // night: the room is dim except under the lamp
// pendant lamp + warm glow
S.draw(line([1110, -20], [1110, 300], 0), 0, 0, { c: "#1d1b1f", w: 6 });
DS.shape(S, "M1040 360 L1180 360 L1150 296 L1070 296 Z", "yellow", { tone: 0 });
S.fill(circ(1110, 560, 900, 620), 0, 0, DS.glow("#ffd27a", 0.55), 1);
// worktop on the back wall
DS.shape(S, rect(560, 640, 640, 170), "wood", { layer: "mid" });
DS.shape(S, rrect(546, 618, 668, 26, DS.r.xs), "gray", { layer: "mid", tone: 1, w: "mid" });
// the fridge (right) with the list, big
DS.shadow(S, 1500, 990, 520);
DS.shape(S, rrect(1260, 290, 480, 700, DS.r.md), "white", { dir: "h" });
S.draw(line([1260, 470], [1740, 470], 0), 0, 0, { c: DS.line(), w: DS.w.mid });
DS.shape(S, rrect(1290, 340, 26, 100, DS.r.xs), "gray", { w: "detail" });
DS.shape(S, rrect(1290, 510, 26, 240, DS.r.xs), "gray", { w: "detail" });
const g = S.grp();
DS.drop(S, rect(1360, 466, 330, 400), { parent: g });
DS.shape(S, rect(1350, 450, 330, 400), "white", { w: "mid", flat: true, parent: g });
DS.shape(S, circ(1515, 456, 20), "red", { w: "detail", parent: g });
S.text("By 30:", 1380, 545, { size: 96, font: "caveat", anchor: "start", c: PEN, parent: g });
[630, 720, 810].forEach((y) => { DS.shape(S, rect(1385, y - 46, 46, 46), "white", { w: "mid", flat: true, parent: g }); S.draw(line([1455, y - 22], [1650, y - 26], 0), 0, 0, { c: PEN, w: DS.w.near, parent: g }); });
g.setAttribute("transform", "rotate(4 1515 650)");
// calendar pages flying off the wall (eleven months left)
[[720, 470, -18], [845, 365, 14], [680, 330, -30]].forEach(([x, y, r]) => {
  const pg = S.grp();
  S.draw(rect(x - 60, y - 70, 120, 140), 0, 0, { c: "#1d1b1f", w: 6, fill: "#ffffff", parent: pg });
  S.fill(rect(x - 57, y - 67, 114, 34), 0, 0, DS.c("red"), 1, pg);
  [-10, 18, 46].forEach((dy) => S.draw(line([x - 36, y + dy], [x + 36, y + dy], 0), 0, 0, { c: DS.c("gray", 2), w: 5, parent: pg }));
  pg.setAttribute("transform", `rotate(${r} ${x} ${y})`);
});
// Dave at eighteen, pointing at the list and glaring at Dave
const Y = young(S, 1060, 990, "near", { s: 1.4, mood: "angry", look: -8, pose: "point" });
DS.card(S, "DAVE, 18", 1060, 425, { size: DS.type.small });
// huge panicking Dave, both hands on his head
const F = dave(S, 400, 1900, "near", { s: 4.2, mood: "wow", look: 9, pose: "head" });
drop(S, 650, 560, 1.6); drop(S, 170, 560, 1.3);
S.text("BY 30?", 960, 215, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
