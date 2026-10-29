// look: still
// @library auto
// B (old style, test partner): a sperm whale on deep blue clicks a row of dots at a confused Dave, who holds a dictionary with a red question mark. Words: "WHALE ALPHABET?" (clips 62-63: an alphabet with no dictionary).
// Critique round 1 (focal 3, emotion 3, curiosity 4, contrast 3, text 5, composition 2, polish 2, honesty 5, brand 4): the dots collided with the whale's head and a stray "?" from the face, the book covered half of Dave's face, grey whale on blue was dull, Dave too small to read.
//   Fixes: whale smaller on the right with a pale rim glow, the dots sit in two clean rows above its head like speech, Dave's head bigger and unobstructed, the book low in front of his chest.
// Critique round 2 (focal 4, emotion 4, curiosity 4, contrast 4, text 5, composition 4, polish 4, honesty 5, brand 4): reads at 168 px as "man + whale + dictionary"; kept as the test partner (calmer, more curious than A).
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-40, -40, 2000, 1160), 0, 0, "#0b2a5b", 1);
S.fill(circ(1330, 640, 760, 460), 0, 0, DS.glow("#60a5fa", 0.6), 1);
L.put(S, "ep49-sperm-whale", 1380, 760, { s: 2.9, flip: true });
[[1060, 360, [90, 90, 90, 90]], [1060, 460, [50, 50, 170, 50]]].forEach(([x, y, gp]) => { let cx = x; [0].concat(gp).forEach((g) => { cx += g; S.fill(circ(cx, y, 34), 0, 0, "#ffffff", 1); }); });
L.put(S, "kit-dave", 400, 1960, { s: 4.4, face: "confused" });
L.put(S, "ep49-tee", 400, 1960, { s: 4.4, c: "yellow" });
L.put(S, "prop-book-closed", 560, 990, { s: 2.2, rot: -6 });
S.text("?", 560, 1060, { size: 280, c: "#e5383b", halo: "#ffffff", haloW: 0.1 });
S.text("WHALE ALPHABET?", 960, 190, { size: 170, c: "#FFFFFF", halo: "#111111", haloW: 0.09 });
