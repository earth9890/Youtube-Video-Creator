// Thumbnail A (light): NOBODY IS WATCHING — hero in a spotlight, the eyes around are faded
const S = scene(0, 1, { cam: "none" });
S.text("NOBODY IS", 960, 250, { size: 200, t: 0, dur: 0.5 });
S.text("WATCHING", 960, 460, { size: 230, c: ORANGE, t: 0, dur: 0.5 });
S.spotlight(960, 515, 960, 240, 0, 0.5);
S.fig(960, 960, { s: 1.1 }).draw(0, 0.5).face(0.5, "worried");
[[330, 700], [1590, 700], [470, 880], [1450, 880]].forEach(([x, y]) => S.eye(x, y, 1.5, 0, 0.5, { dx: x < 960 ? 12 : -12 }).g.setAttribute("opacity", 0.28));
