// look: still
// @library auto
// B (test partner, the symbol): one huge sheep on near-black with 277 tiny dots behind it and ONE green dot, a tiny worried Dave for scale. Words: "1 IN 277?" (the HUD line of the Dolly beat, "DOLLY: 277 TRIES, 1 LAMB").
const S = scene(0, 1, { cam: "none" });
S.fill(rect(0, 0, 1920, 1080), 0, 0, "#0b1220", 1);
S.fill(circ(1180, 660, 640, 600), 0, 0, "#2f6fd6", 0.22);
const cols = 23, gap = 62, dots = [];
for (let i = 0; i < 277; i++) dots.push(circ(260 + (i % cols) * gap * 1.05, 330 + Math.floor(i / cols) * gap * 0.95, 14, 14));
S.fill(dots.join(" "), 0, 0, "#8fb4ff", 0.28);
const lx = 260 + 17 * gap * 1.05, ly = 330 + 3 * gap * 0.95;
S.fill(circ(lx, ly, 20, 20), 0, 0, "#3fe06a", 1);
S.draw(circ(lx, ly, 46, 46), 0, 0, { c: "#3fe06a", w: 9 });
L.put(S, "animal-sheep", 1240, 1040, { s: 3.7 });
L.put(S, "kit-dave", 380, 1950, { s: 3.6, face: "scared" });
DS.vignette(S, 0.3);
S.text("1 IN 277?", 960, 190, { size: 190, c: "#FEFE06", halo: "#111111", haloW: 0.09, rot: -3 });
