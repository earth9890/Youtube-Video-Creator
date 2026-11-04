// look: still
// @library auto
// B (old style, test partner): Dave at arm's length with the biscuit tin, a thin red ring marking the tiny dot above it. Words "1 BILLION TONNES".
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-40, -40, 2000, 1160), 0, 0, "#05031A", 1);
S.fill(rect(-40, 760, 2000, 400), 0, 0, "#1B2550", 1);
L.put(S, "star-field", 960, 400, { s: 4.4 });
L.put(S, "kit-dave", 470, 1040, { s: 2.25, face: "worried", pose: "reach" });
L.put(S, "ep89-tin", 1230, 760, { s: 2.3 });
L.put(S, "ep89-dot", 1230, 450, { s: 3.0, R: 12 });
S.draw(circ(1230, 450, 80), 0, 0, { c: "#FF3030", w: 10 });
DS.vignette(S, 0.2);
S.text("1 BILLION TONNES", 960, 210, { size: 175, c: "#FFFFFF", rot: -2 });
// Critique: round 1 text collided with Dave's head (Dave smaller, lower); tin bigger, red ring is the single accent mark. Calm and informational; the test partner for A.
