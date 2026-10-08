// theme: dark
// Thumbnail A: EVERYONE IS / STARING. — hero in a light cone, six big eyes in the dark
const S = scene(0, 1, { cam: "none" });
S.text("EVERYONE IS", 960, 220, { size: 220, t: 0, dur: 0.5 });
S.text("STARING.", 960, 490, { size: 300, c: RED, t: 0, dur: 0.5 });
// ponytail: spotlight prop draws a lamp that would sit inside the text, so just the cone + pool
S.fill(poly([[900, 515], [1020, 515], [1260, 1000], [660, 1000]], 1), 0, 0.3, GLOW, 0.35);
S.fill(circ(960, 1000, 300, 40), 0, 0.3, GLOW, 0.45);
S.fig(960, 1000, { s: 1.3 }).draw(0, 0.5).face(0.5, "worried", 0);
[[280, 660], [560, 820], [330, 940], [1640, 660], [1360, 820], [1560, 920]].forEach(([x, y]) =>
  S.eye(x, y, 2.2, 0, 0.5, { dx: x < 960 ? 14 : -14 }));
