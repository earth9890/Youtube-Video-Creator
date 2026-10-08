// theme: dark
// thumb B: stark fact — 5,126 failures; hero determined on the pile of crossed-out boxes
const S = scene(0, 1, { cam: "none" });
S.text("5,126", 560, 380, { size: 320, c: RED, t: 0, dur: 0.5 });
S.text("FAILURES.", 620, 640, { size: 220, t: 0, dur: 0.5 });
const boxes = [[1295, 870], [1405, 870], [1515, 870], [1625, 870], [1405, 770], [1515, 770]];
boxes.forEach(([x, y]) => {
  S.draw(rrect(x, y, 100, 100, 10), 0, 0.3, { w: 6, fill: CREAM });
  S.cross(x + 50, y + 50, 0.55, 0.1, 0.2);
});
const F = S.fig(1510, 770, { s: 1.4 }).draw(0, 0.5);
F.face(0.5, "determined", 0);
