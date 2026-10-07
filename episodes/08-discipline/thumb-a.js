// Thumbnail A (light): "MOTIVATION LIES." — flame fading beside a clock
const S = scene(0, 1, { cam: "none" });
S.text("MOTIVATION", 760, 400, { size: 200, t: 0, dur: 0.5 });
S.text("LIES.", 760, 680, { size: 260, c: ORANGE, t: 0, dur: 0.5 });
S.clock(1560, 320, 150, 0, 0.6, { h: 9, m: 40 });
const G = S.grp();
G.setAttribute("opacity", 0.45);
S.flame(1560, 920, 2.1, 0, 0.6, { parent: G });
