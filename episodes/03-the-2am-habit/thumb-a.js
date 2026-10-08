// theme: dark
// Thumbnail A — pain moment: 2 AM again, hero sitting up in bed under the blanket, phone glow on his tired face.
const S = scene(0, 1, { cam: "none" });
S.text("2:00 AM.", 100, 330, { size: 300, c: RED, anchor: "start", t: 0, dur: 0.5 });
S.text("AGAIN.", 100, 580, { size: 230, anchor: "start", t: 0, dur: 0.5 });
S.moon(1760, 150, 48, 0, 0.4);
const B = S.bed(820, 990, 980, 0, 0.5, { blanket: false });     // mattress top ≈ 880
const F = S.fig(1060, 880, { s: 1.6, sit: true, pose: "hold", legL: [[40, 0]], legR: [[44, 2]] });
F.draw(0, 0.5);
F.face(0.5, "tired", 0);
// blanket over the lap and legs, drawn after the figure so it covers the hips
S.draw(smooth([[960, 885], [1010, 820], [1120, 800], [1300, 812], [1500, 830], [1790, 850], [1790, 885]]) + " Z", 0, 0.4, { w: 9, fill: CREAM });
const [hx, hy] = F.hand("R", "hold");
S.phone(hx + 4, hy - 30, 1.15, 0, 0.5, { screen: "play", glow: true });
