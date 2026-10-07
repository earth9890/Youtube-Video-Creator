// thumb A (light): the hook — 5,126 failures, then arms up
const S = scene(0, 1, { cam: "none" });
S.text("5,126", 960, 320, { size: 230, c: RED, t: 0, dur: 0.5 });
S.text("FAILURES.", 960, 540, { size: 190, t: 0, dur: 0.5 });
[...Array(6)].forEach((_, i) => {
  const x = 500 + i * 120;
  S.draw(rrect(x, 680, 90, 90, 10), 0, 0.3, { w: 6, fill: CREAM });
  S.cross(x + 45, 725, 0.5, 0.1, 0.2);
});
S.fig(1560, 790, { s: 0.85, pose: "armsUp" }).draw(0, 0.5).face(0.5, "happy");
