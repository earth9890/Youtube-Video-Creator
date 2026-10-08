// theme: dark
// thumb A: "EVERYONE'S AHEAD." — hero at the foot of tall stairs, phone glowing, looking up at the trophy-holder
const S = scene(0, 1, { cam: "none" });
S.text("EVERYONE'S", 660, 250, { size: 230, t: 0, dur: 0.4 });
S.text("AHEAD.", 520, 510, { size: 300, c: RED, t: 0, dur: 0.5 });
const ST = S.stairs(1000, 1010, 5, 170, 110, 0, 0.5);
const T = S.fig(ST.tops[4][0], ST.tops[4][1], { s: 0.9, pose: "hold" }).draw(0, 0.5);
const [tx, ty] = T.hand("R");
S.trophy(tx, ty + 30, 0.42, 0.2, 0.4);
const F = S.fig(880, 1010, { s: 1.3, pose: "hold" }).draw(0, 0.5);
F.face(0.5, "sad", 8);
const [hx, hy] = F.hand("R");
S.phone(hx + 12, hy - 20, 1.1, 0.2, 0.4, { screen: "heart", glow: true });
