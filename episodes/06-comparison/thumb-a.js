// thumb A (light): small hero vs glowing highlight-reel phone + trophy
const S = scene(0, 1, { cam: "none" });
S.text("NOT", 120, 400, { size: 220, anchor: "start", t: 0, dur: 0.4 });
S.text("BEHIND.", 120, 640, { size: 220, anchor: "start", c: GREEN, t: 0, dur: 0.5 });
const F = S.fig(1000, 1000, { s: 0.7 }).draw(0, 0.5);
F.face(0.5, "worried", 8);
S.phone(1480, 500, 2.8, 0, 0.6, { screen: "heart", glow: true });
S.trophy(1480, 1000, 0.9, 0, 0.6);
