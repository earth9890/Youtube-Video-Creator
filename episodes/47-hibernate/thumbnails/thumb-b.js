// look: still
// @library auto
// CONCEPT (partner) "the twist": Dave's red door in a snowstorm with the sign BACK IN APRIL; Dave, huge and shocked in a beanie, because a squirrel shakes his leg and an alarm clock says 3 WEEKS.
// Words: HIBERNATE? (yellow, black halo). True: the video's twist is that hibernators wake every two to three weeks.
// CRITIQUE round 1: focal 3 (two competing subjects), emotion 5, curiosity 4, contrast 4, text 2 (covers the sign and Dave's hat), composition 3 (squirrel hidden behind the clock), polish 3, honesty 5, brand 4.
//   Fix: text right of the head, sign under it, squirrel beside Dave's leg facing him, clock on the right.
// CRITIQUE round 2: 4, 5, 4, 4, 4, 4, 4, 5, 4. Weaker than the pick: the face is smaller and the clock competes; kept as the Test & Compare partner.
const S = scene(0, 1, { cam: "none" });
L.put(S, "ep47-scene-door", 0, 0, { close: true, flakes: 40 });
L.put(S, "ep47-sign", 1180, 340, { s: 0.85, lines: ["BACK IN APRIL"] });
L.put(S, "prop-alarm-clock", 1600, 690, { s: 2.1 });
S.text("3 WEEKS", 1600, 900, { size: 96, c: "#ffffff", halo: "#111111", haloW: 0.12, anchor: "middle" });
L.put(S, "ep47-squirrel", 1010, 1030, { s: 2.4, flip: true });
L.put(S, "kit-dave", 440, 1980, { s: 4.4, face: "terrified", acc: ["beanie"] });
S.text("HIBERNATE?", 1290, 230, { size: 170, c: "#FEFE06", halo: "#111111", haloW: 0.09, anchor: "middle" });
