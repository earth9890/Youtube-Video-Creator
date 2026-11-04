// look: still
// @library auto
// C (spare, the twist): Arlo's smug face huge on a warm kitchen yellow, flour on his cheek, orange neckerchief, a loaf; tiny Dave behind holding the one plank and crying. Words: "I'M NOT YOU".
const S = scene(0, 1, { cam: "none" });
L.put(S, "kit-room-kitchen-day", 0, 0);
S.fill(rect(0, 0, 1920, 1080), 0, 0, "#ffb300", 0.30);
L.put(S, "kit-dave", 470, 1010, { s: 2.3, face: "cry" });
const g = S.grp(); L.put(S, "ep92-plank", 520, 560, { s: 1.3, l: 520, parent: g }); g.setAttribute("transform", "rotate(-16 520 560)");
L.put(S, "kit-dave", 1380, 1950, { s: 4.3, flip: true, face: "smug" });
L.put(S, "ep92-mark", 1380, 1950, { s: 4.3, flip: true, apron: true, flour: true });
L.put(S, "prop-bread", 930, 820, { s: 2.4 });
DS.vignette(S, 0.3);
S.text("I'M NOT YOU", 960, 190, { size: 190, c: "#FEFE06", halo: "#111111", haloW: 0.09, rot: -3 });
