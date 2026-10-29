// look: still
// @library auto
// A (clickbait scene, the pick): a huge prairie dog shouts and points at Dave; its speech bubble holds a YELLOW SHIRT, the same shirt Dave is wearing (video opener, clips 5-6).
// Dave: head ~40 % of the frame height, shock + sweat. Words: "IT SEES ME?" top centre, yellow with a black halo, slight tilt.
// Critique round 1 (focal 3, emotion 4, curiosity 4, contrast 3, text 5, composition 3, polish 3, honesty 5, brand 4): two subjects competed (dog too small), the cloud bubble was mostly empty with a tail that missed the mouth,
//   a white strip showed under the meadow. Fixes: dog 25 % bigger and lower-right, speech bubble tight around a big yellow tee with its tail on the mouth, call arcs toward Dave, ground fill, text tilted -3 degrees.
// Critique round 2 (focal 4, emotion 4, curiosity 5, contrast 4, text 5, composition 4, polish 4, honesty 5, brand 4): shirt in the bubble now reads at once and matches Dave's; call arcs tangled with the bubble tail and the bubble kissed the text halo.
// Round 4 (feed grid: lighter than the dark/saturated hits around it): vignette 0.32 to pull the eye to the centre.
// Round 3 fixes: arcs removed (the bubble is the shout), bubble 30 px lower, tail aimed at the mouth.
const S = scene(0, 1, { cam: "none" });
L.put(S, "sky-day", 0, 0);
L.put(S, "ground-meadow-day", 0, 700);
S.fill(rect(0, 1000, 1920, 120), 0, 0, "#6fbf63", 1);
L.put(S, "ep49-mound", 1430, 1180, { s: 4.0 });
L.put(S, "ep49-prairie-dog", 1430, 985, { s: 4.5, mouth: true, alarm: true, flip: true });
L.put(S, "thought-pic", 930, 390, { s: 0.95, rx: 210, ry: 190, tx: 350, ty: 160, pic: "ep49-tee", picO: { c: "yellow", center: true }, picS: 2.3, picY: 0, seed: 11 });
L.put(S, "kit-dave", 470, 1950, { s: 4.3, face: "shocked" });
L.put(S, "ep49-tee", 470, 1950, { s: 4.3, c: "yellow" });
DS.vignette(S, 0.32);
S.text("IT SEES ME?", 960, 190, { size: 190, c: "#FEFE06", halo: "#111111", haloW: 0.09, rot: -3 });
