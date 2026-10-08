// theme: dark
// Thumb A — pain moment: crying hero excluded inside a chatting gray crowd
const S = scene(0, 1, { cam: "none" });
S.text("ALONE", 90, 200, { size: 230, anchor: "start", c: RED, t: 0, dur: 0.5 });
S.text("IN", 700, 200, { size: 230, anchor: "start", t: 0, dur: 0.5 });
S.text("A CROWD.", 90, 425, { size: 290, anchor: "start", t: 0, dur: 0.5 });
const GY2 = 1020, X0 = 290, GAP = 210;
const gaze = [8, -8, -8, 0, 8, 8, -8]; // pairs look at each other, nobody looks at the hero (index 3)
for (let i = 0; i < 7; i++) {
  const hero = i === 3;
  const F = S.fig(X0 + i * GAP, GY2, { s: 1.6, c: hero ? INK : GRAY, pose: hero ? "sad" : "stand" }).draw(0, 0.5);
  F.face(0.5, hero ? "cry" : "smile", gaze[i]);
}
S.speech(1655, 330, 95, 65, 1560, 470, 0, 0.4, { fill: PAPER });
S.text("…", 1655, 350, { size: 80, c: GRAY, t: 0.4, dur: 0.2 });
