// Thumbnail A (light) — hook: "47 SECONDS." + hero staring at phone, tiny timer
const S = scene(0, 1, { cam: "none" });
S.text("47", 150, 450, { size: 230, c: RED, anchor: "start", t: 0, dur: 0.5 });
S.text("SECONDS.", 150, 690, { size: 190, anchor: "start", t: 0, dur: 0.5 });
const F = S.fig(1480, 960, { s: 1.35, pose: "hold" }).draw(0, 0.5);
F.face(0.5, "flat", 0);
const [hx, hy] = F.hand("R");
S.phone(hx + 6, hy - 30, 1.1, 0.1, 0.5, { screen: "feed" });
S.timer(1660, 330, 95, 0.1, 0.5, { label: "0:47" });
