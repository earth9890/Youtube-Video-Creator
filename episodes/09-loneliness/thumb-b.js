// theme: dark
// Thumb B — stark fact: "1 IN 2 FEEL THIS." with every other figure sad in the accent colour
const S = scene(0, 1, { cam: "none" });
S.text("1 IN", 120, 300, { size: 320, anchor: "start", t: 0, dur: 0.5 });
S.text("2", 690, 300, { size: 320, anchor: "start", c: ORANGE, t: 0, dur: 0.5 });
S.text("FEEL THIS.", 120, 560, { size: 220, anchor: "start", t: 0, dur: 0.5 });
for (let i = 0; i < 8; i++) {
  const hit = i % 2 === 0;
  const F = S.fig(260 + i * 200, 980, { s: 1.0, c: hit ? ORANGE : GRAY, pose: hit ? "sad" : "stand" }).draw(0, 0.5);
  if (hit) F.face(0.5, "sad", 0);
}
