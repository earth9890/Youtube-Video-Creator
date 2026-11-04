// look: still
// @library auto
// A (clickbait scene, pick): near-black space ground, a coat pocket lower-left with a tiny ringed black dot above its mouth and a mint, coin, key ring and hat orbiting it; huge shocked Dave right. Words "TOO HEAVY?".
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-40, -40, 2000, 1160), 0, 0, "#15093A", 1);
L.put(S, "star-field", 960, 500, { s: 4.4 });
// pocket (coat panel, dark mouth, stitched edge)
S.fill(rrect(-120, 640, 1120, 620, 70), 0, 0, "#8a5a34", 1);
S.draw(rrect(-120, 640, 1120, 620, 70), 0, 0, { c: "#111111", w: 8 });
S.draw(rrect(-60, 700, 1000, 500, 50), 0, 0, { c: "#c89a64", w: 5 });
S.fill("M-40 700 Q420 600 880 700 Q420 800 -40 700 Z", 0, 0, "#1a0f08", 1);
S.draw("M-40 700 Q420 600 880 700 Q420 800 -40 700 Z", 0, 0, { c: "#111111", w: 8 });
// the hole: warm halo, white-yellow ring, black dot
L.put(S, "ep89-glow", 440, 560, { s: 2.2, r: 220 });
L.put(S, "ep89-dot", 440, 560, { s: 4.2, R: 16 });
L.put(S, "ep89-mint", 220, 470, { s: 2.6 });
L.put(S, "ep-coin-plain", 700, 400, { s: 1.0 });
L.put(S, "ep89-keys", 470, 330, { s: 1.8, rot: 20 });
L.put(S, "ep89-bowler", 720, 600, { s: 1.5, rot: -18 });
L.put(S, "kit-dave", 1480, 1960, { s: 4.4, face: "shocked" });
DS.vignette(S, 0.25);
S.text("TOO HEAVY?", 770, 205, { size: 205, c: "#FEFE06", halo: "#111111", haloW: 0.09, rot: -3 });
// Critique: focal 4 (dot + ring + Dave's face), emotion 5, curiosity 5 (ordinary things orbit a dot in a coat pocket), contrast 4, text 5, composition 4. Round 2 fixes: text clipped left (moved), coin dominated the dot (shrunk), dot bigger, mint swirl looked like a symbol (now a plain ring mint).
