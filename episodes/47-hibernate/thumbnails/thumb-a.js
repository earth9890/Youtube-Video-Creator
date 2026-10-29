// look: still
// @library auto
// CONCEPT (pick) "the absurd fact": Dave, giant, grits his teeth because a bear sleeps seven months with no toilet; the sign behind him reads "BLADDER NOT AVAILABLE".
// Words: 7 MONTHS? (yellow, black halo). True: the video says bears spend five to seven months without eating, drinking, urinating or defecating.
// CRITIQUE round 1 (1-5: focal@168px, emotion, curiosity, contrast, text, composition, polish, honesty, brand):
//   4, 5, 4, 4, 3 (text sits on the sign and the window), 3 (bear half-hidden by the nightstand), 3 (sign crowded by text), 5, 4. Fix: sign down-right under the text, bear left of the nightstand, window dimmer.
// CRITIQUE round 2: 5, 5, 4, 4, 5, 4, 4, 5, 4. Left: bear sleeps tiny next to a giant face (scale gag works). Face eyes aimed at the viewer; sign readable at 1280.
const S = scene(0, 1, { cam: "none" });
L.put(S, "ep47-scene-bedroom", 0, 0, { time: "dark" });
L.put(S, "ep47-sign", 1450, 360, { s: 0.78, lines: ["BACK IN APRIL", "bladder not available"], cap: 2 });
L.put(S, "ep47-bear", 1300, 1000, { s: 1.6, sleep: true });
L.put(S, "kit-dave", 520, 1980, { s: 4.6, face: "act-effort" });
S.text("7 MONTHS?", 1180, 250, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.09, anchor: "middle" });
