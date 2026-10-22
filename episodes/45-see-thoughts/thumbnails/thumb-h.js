// look: still
// @library auto
// H (owner's request): a woman (cast g05) with a sly wink; her thought bubble reads "I WANNA F***". a man (cast m05) reads it: shocked.
// Censored word, adult figures, no imagery. Flat hot-red field.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#dc2626", ground: "#dc2626", hy: 1100 });
L.put(S, "person", 470, 1700, { style: "girl05", face: "wink", s: 3.2 });
L.put(S, "thought-pic", 640, 250, { s: 1.0, rx: 540, ry: 250, text: "I WANNA|F***", size: 175, seed: 5, tx: -150, ty: 300, w: "char" });
L.put(S, "person", 1560, 2000, { style: "man05", outfit: "tee", outfitC: "blue", face: "shocked", s: 4.2 });
L.put(S, "fx-sweat-drops", 1840, 560, { s: 1.3 });
