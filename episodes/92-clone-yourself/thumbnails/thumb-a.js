// look: still
// critique r2 (bhl-two): r1 had the title over the clone's face and his head cut at the top; lowered him under the words, boat bigger so the ONE plank reads.
// @library auto
// A (clickbait scene, the pick): the video's opening wrongness. Two identical Daves in the garage: a big shocked Dave in front, behind him the same stick figure in a baker's apron holding a loaf, flour on his cheek, a boat with ONE plank between. Words: "WHICH ONE?"
const S = scene(0, 1, { cam: "none" });
L.put(S, "room-garage-light", 0, 0);
S.fill(rect(0, 0, 1920, 1080), 0, 0, "#16264a", 0.62);  // r3: dusk-blue garage so the two white faces pop (owner rejected beige thumbs 2026-10-22)
S.fill(circ(1470, 700, 700, 700), 0, 0, "#ffb347", 0.10); S.fill(circ(1470, 700, 520, 520), 0, 0, "#ffb347", 0.12); S.fill(circ(1470, 700, 340, 340), 0, 0, "#ffb347", 0.14);
L.put(S, "ep92-boat", 1000, 1060, { s: 1.25, planks: 1 });
L.put(S, "kit-dave", 1500, 1260, { s: 2.3, flip: true, face: "smug", pose: "hold" });
L.put(S, "ep92-mark", 1500, 1260, { s: 2.3, apron: true, flour: true, flip: true });
L.put(S, "prop-bread", 1335, 760, { s: 1.15 });
L.put(S, "kit-dave", 470, 1950, { s: 4.3, face: "shocked" });
DS.vignette(S, 0.3);
S.text("WHICH ONE?", 960, 190, { size: 190, c: "#FEFE06", halo: "#111111", haloW: 0.09, rot: -3 });
