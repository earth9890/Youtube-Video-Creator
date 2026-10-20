// look: still
// C (clickbait scene mode, 2026-10-20): Dave stares at the same man twice against a height chart: as a student and,
// taller, as a professor in a graduation cap (no name tags: they read as extra words at feed size). Text "GREW 5 CM?":
// the video's hook (the 1968 study: introduced as a professor, the same man was guessed over five centimetres taller).
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#b5845c", ground: "#8a603f", hy: 1000 });
// warm ceiling-lamp glow over the chart
S.fill(circ(1500, 560, 620, 520), 0, 0, DS.glow("#ffe2a0", 0.7), 1);
// height chart on the wall: bands with marks
DS.shape(S, rrect(1100, 400, 760, 600, DS.r.xs), "paper", { t: 0, flat: true, w: "mid" });
for (let i = 1; i < 12; i++) { const y = 1000 - i * 50; S.draw(line([1100, y], [i % 2 ? 1150 : 1860, y], 0), 0, 0, { c: i % 2 ? "#1d1b1f" : "#c9b89a", w: i % 2 ? 6 : 4 }); }
// the same man twice: student (left) and professor (right, taller)
const man = (x, s) => {
  const M = S.fig(x, 1000, { s, pose: "stand", hair: "short", hairC: "#3b2a20", outfit: "tee", outfitC: DS.c("green") }).instant(0);
  M.face(0, "smile", 0);
  return M;
};
man(1300, 1.42);
man(1660, 1.62);
S.hat(1660, 1000 - 309 * 1.62 - 50 * 1.62 - 14, 1.15, 0, 0);
// red arrow: the extra height
S.arrow(1480, 640, 1480, 450, 0, 0, { c: "#e5383b", w: 16 });
// front: big shocked Dave pointing at the chart
const F = S.fig(470, 1900, { s: 4.2, pose: "point", hair: "side", hairC: DS.c("brown"), outfit: "tee", outfitC: DS.c("blue") }).instant(0);
F.face(0, "wow", 9);
const hx = 470, hy = 1900 - 309 * 4.2, r = 210;
S.drop(hx - 1.1 * r, hy - 0.3 * r, 2.2, 0, 0);
S.text("GREW 5 CM?", 960, 230, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
