// look: still
// @library auto
// C (spare): the tin sinking through the floor, Dave horrified. Words "DON'T PUT IT DOWN".
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-40, -40, 2000, 1160), 0, 0, "#15093A", 1);
L.put(S, "star-field", 960, 400, { s: 4.4 });
S.fill(rect(-40, 760, 2000, 400), 0, 0, "#6b4b30", 1);
S.draw(line([-40, 760], [2000, 760]), 0, 0, { c: "#111111", w: 8 });
L.put(S, "ep89-glow", 1250, 800, { r: 330 });
L.put(S, "ep89-tin", 1250, 850, { s: 2.3 });
S.fill(rect(-40, 925, 2000, 300), 0, 0, "#6b4b30", 1);
S.draw(line([-40, 925], [2000, 925]), 0, 0, { c: "#111111", w: 8 });
S.arrow(1250, 540, 1250, 660, 0, 0, { c: "#FF3030", w: 14 });
L.put(S, "kit-dave", 540, 1960, { s: 4.4, face: "scared" });
DS.vignette(S, 0.25);
S.text("DON'T PUT IT DOWN", 960, 210, { size: 170, c: "#FEFE06", halo: "#111111", haloW: 0.09, rot: -3 });
// Critique: round 1 glow washed over the tin (glow now behind), tin did not sink (floor covers its lower third). Spare only.
