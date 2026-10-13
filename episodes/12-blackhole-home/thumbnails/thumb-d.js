// look: v3
// front-on black-hole icon (thumbnail-designer.md §4): flare, plum glow, red, amber, cream rim, black disc
const BH = (S, x, y, r, noFlare) => {
  if (!noFlare) { S.fill(circ(x, y, r * 2.7, r * 0.075), 0, 0.1, "#F4BC22", 0.85); S.fill(circ(x, y, r * 2.4, r * 0.025), 0, 0.1, "#FFF4D6", 1); }
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
// D (archetype A/G): Dave big-head crop, uneasy side-eye, tea; a huge cropped black hole with Earth inside.
const S = scene(0, 1, { cam: "none" });
S.bg("black");
STARS(S, 70, [1460, 640, 560]);
BH(S, 1460, 640, 390, true);
EARTH(S, 1460, 700, 110);
const F = S.fig(430, 1890, { s: 4.3, c: "#ffffff", hair: "short", outfit: "tee", outfitC: "#2f6fd6", pose: "hold" }).instant(0);
F.face(0, "worried", 9);
const [hx, hy] = F.hand("R", "hold");
S.coffee(hx + 10, Math.min(hy, 1000), 1.8, 0, 0.1);
S.text("WE'RE", 470, 190, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
S.text("INSIDE?", 520, 380, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
