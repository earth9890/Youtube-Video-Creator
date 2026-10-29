// look: still
// @library auto
// C (the absurd moment): script clip 35, "Brain, why am I crying at a cow?" Dave huge and sobbing, a calm cow right beside him. One flat sky-blue field, green hill.
// Words: CRYING AT A COW? (yellow, black halo). Honest: the line is in the video.
// CRITIQUE (thumbnail-pro.md): round 1: focal 5 / emotion 5 / curiosity 5 / contrast 3 (cow white on pale sky) / text 4 / composition 3 / polish 3 / honesty 5 / brand 4. Fix: deeper blue, cow bigger, text two lines.
// round 2 (after the fix): focal 5 / emotion 5 / curiosity 5 / contrast 4 / text 5 / composition 4 / polish 4 / honesty 5 / brand 4. PICK (a.png).
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#1565c0", 1);
S.fill(circ(1450, 520, 700, 560), 0, 0, DS.glow("#7dd3fc", 0.55), 1);
S.draw("M-60 880 Q500 780 1000 860 T1980 820 V1140 H-60 Z", 0, 0, { fill: "#2e9e4f", c: "#111111", w: 12 });
L.put(S, "animal-cow", 1500, 1060, { s: 3.2 });
L.put(S, "kit-dave", 600, 2130, { s: 4.8, face: "sob" });
L.put(S, "fx-tears", 600, 560, { s: 1.0 });
S.text("CRYING AT", 960, 170, { size: 190, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
S.text("A COW?", 960, 360, { size: 230, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
