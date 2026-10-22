// look: still
// @library auto
// E (the consequence): rush-hour train. A calm man in a suit by the yellow pole; his huge thought bubble reads "LICK THE POLE?".
// Dave squashed beside him, terrified side-eye. One flat teal field. The bubble is the words (script line 76).
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#0e7490", ground: "#0e7490", hy: 1100 });
S.fill(circ(700, 330, 700, 420), 0, 0, DS.glow("#67e8f9", 0.45), 1);
S.draw(rrect(1095, -40, 74, 1180, 34), 0, 0.01, { c: "#111111", w: 10, fill: "#facc15", fo: 1 });
L.put(S, "person", 650, 1720, { style: "man05", outfit: "suit", outfitC: "navy", face: "flat", s: 3.0 });
L.put(S, "thought-pic", 700, 280, { s: 1.0, rx: 520, ry: 270, text: "LICK THE|POLE?", size: 160, seed: 9, tx: -60, ty: 330, w: "char" });
L.put(S, "kit-dave", 1560, 2060, { s: 4.4, face: "terrified" });
L.put(S, "fx-sweat-drops", 1840, 560, { s: 1.3 });
