// look: v3
// front-on black-hole icon (thumbnail-designer.md §4): flare, plum glow, red, amber, cream rim, black disc
const BH = (S, x, y, r) => {
  S.fill(circ(x, y, r * 2.7, r * 0.075), 0, 0.1, "#F4BC22", 0.85);
  S.fill(circ(x, y, r * 2.4, r * 0.025), 0, 0.1, "#FFF4D6", 1);
  S.draw(circ(x, y, r * 1.24), 0, 0.1, { w: r * 0.2, c: "#5C024F", op: 0.75 });
  S.draw(circ(x, y, r * 1.1), 0, 0.1, { w: r * 0.09, c: "#D93A45" });
  S.draw(circ(x, y, r * 1.04), 0, 0.1, { w: r * 0.06, c: "#F4BC22" });
  S.draw(circ(x, y, r * 1.0), 0, 0.1, { w: r * 0.035, c: "#FFF4D6" });
  S.fill(circ(x, y, r * 0.985), 0, 0.1, "#000000", 1);
};
const STARS = (S, n, avoid) => { for (let i = 0; i < n; i++) { const x = rnd() * 1920, y = rnd() * 1080; if (avoid && Math.hypot(x - avoid[0], y - avoid[1]) < avoid[2]) continue; S.fill(circ(x, y, 2 + rnd() * 3), 0, 0.1, "#ffffff", 0.4 + rnd() * 0.4); } };
const EARTH = (S, x, y, r) => {
  S.draw(circ(x, y, r), 0, 0.1, { w: 6, c: "#ffffff", fill: "#2F80ED" });
  S.fill(smooth([[x - r * 0.6, y - r * 0.3], [x - r * 0.2, y - r * 0.65], [x + r * 0.25, y - r * 0.4], [x + r * 0.1, y], [x - r * 0.3, y + r * 0.25], [x - r * 0.6, y - r * 0.3]]) + " Z", 0, 0.1, "#27AE60", 1);
  S.fill(smooth([[x + r * 0.3, y + r * 0.2], [x + r * 0.65, y + r * 0.15], [x + r * 0.5, y + r * 0.6], [x + r * 0.2, y + r * 0.55], [x + r * 0.3, y + r * 0.2]]) + " Z", 0, 0.1, "#27AE60", 1);
};
// C: space icon, no character. Wrongness: Earth sits inside the black hole. Text adds stakes, not the title question.
const S = scene(0, 1, { cam: "none" });
S.bg("black");
STARS(S, 80, [1010, 650, 470]);
BH(S, 1010, 650, 300);
EARTH(S, 1010, 700, 120);
S.arrow(400, 690, 850, 690, 0, 0.1, { c: "#ffffff", w: 24, head: 70, bend: 0 });
S.text("US", 250, 720, { size: 140, c: "#ffffff" });
S.text("NO WAY OUT", 960, 200, { size: 220, c: "#ffffff" });
