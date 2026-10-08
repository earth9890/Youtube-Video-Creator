// theme: dark
// Thumbnail B — stark fact: "47 SECONDS." hero shocked at his phone, timer at 0:47 almost gone
const S = scene(0, 1, { cam: "none" });
S.text("47", 330, 420, { size: 300, c: RED });
S.text("SECONDS.", 600, 700, { size: 230 });
const F = S.fig(1420, 1000, { s: 1.5, pose: "hold" }).draw(0, 0.4);
F.face(0.4, "wow", 0);
const [hx, hy] = F.hand("R");
S.phone(hx + 6, hy - 30, 1.3, 0.1, 0.3, { screen: "feed" });
S.timer(1700, 330, 140, 0, 0.3, { label: "0:47", c: RED, fillAt: 0.3, fillDur: 0.3 });
