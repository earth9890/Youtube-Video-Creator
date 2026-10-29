// look: still
// @library auto
// C (the absurd moment): a giant bee tells Dave to move (clip 32 "Two and a half seconds, that way, near the Sun. Please move."). The bubble is the words.
// Critique round 1 (focal 4, emotion 3, curiosity 3, contrast 4, text 3, composition 3, polish 4, honesty 5, brand 4): "ASK A BEE" duplicated the idea in a weak sticker, the bubble was small, Dave's face (terrified) mild next to a giant bee.
//   Fixes: drop the sticker, the bubble becomes the headline (bigger, high), Dave closer to the bee, face stays terrified with sweat.
// Critique round 2 (focal 4, emotion 4, curiosity 4, contrast 4, text 4, composition 4, polish 4, honesty 5, brand 4): funny and clear but a gag, not a hook for the whole video; third in the set.
const S = scene(0, 1, { cam: "none" });
L.put(S, "sky-day", 0, 0);
L.put(S, "ground-meadow-day", 0, 720);
S.fill(rect(0, 1000, 1920, 120), 0, 0, "#6fbf63", 1);
L.put(S, "animal-bee", 1430, 640, { s: 5.8, flip: true });
L.put(S, "bubble-round", 850, 260, { s: 1.7, text: "PLEASE MOVE.", tail: "right" });
L.put(S, "kit-dave", 420, 1960, { s: 4.3, face: "terrified" });
L.put(S, "ep49-tee", 420, 1960, { s: 4.3, c: "yellow" });
