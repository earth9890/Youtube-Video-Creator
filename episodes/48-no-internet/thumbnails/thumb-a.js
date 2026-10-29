// look: still
// @library auto
// FINAL A = PICK, concept C (the absurd moment): a smug giant Sun holds a plug that it has just pulled out of the outlet on Earth. Dark space field, orange Sun. Words: "THE SUN?" (script line 53: the one realistic way).
// Critique round 1 (focal / emotion / curiosity / contrast / text / composition / polish / honesty / brand): 4 / 4 / 5 / 4 / 3 / 3 / 3 / 4 / 3.
//   Rows under 4: the title ran into a Sun spike, the cable wandered across Earth so it was unclear what was unplugged, Earth's outlet was too small, brand feel (a plain cute sun).
//   Fixes: plug rotated so its cable falls out of the bottom of the frame, a bigger empty outlet with two small spark lines, text moved clear of the spikes, Sun shifted right and slightly bigger.
// Feed test (thumb_check grid vs 11 real hits): the yellow Sun and yellow words pop brightest of the three, readable at 168 px; picked over B (face) and C (cable).
// Critique round 2: 4 / 4 / 5 / 5 / 5 / 4 / 4 / 4 / 4. Emotion stays 4: the Sun's smirk is the joke, Dave is not needed (the video's twist is that nobody planned for the Sun).
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#15123b", ground: "#15123b", hy: 1100 });
[[200, 160], [520, 90], [760, 300], [1020, 130], [1560, 120], [1800, 330], [900, 470], [60, 420]].forEach(([x, y]) => S.fill(circ(x, y, 7), 0, 0, "#ffffff", 0.8));
// Earth, bottom-left, with a wall outlet in it
S.draw(circ(150, 1020, 560), 0, 0.01, { c: "#0b1220", w: 10, fill: "#2563eb", fo: 1 });
S.fill(circ(120, 760, 150, 90), 0, 0, "#22c55e", 1);
S.fill(circ(430, 900, 120, 70), 0, 0, "#22c55e", 1);
S.draw(rrect(250, 560, 210, 210, 34), 0, 0.01, { c: "#0b1220", w: 8, fill: "#f8fafc", fo: 1 });
S.fill(rect(300, 630, 26, 70), 0, 0, "#111827", 1); S.fill(rect(384, 630, 26, 70), 0, 0, "#111827", 1);
[[-30, -40], [0, -60], [30, -40]].forEach(([dx, dy]) => S.draw(`M${355 + dx} ${540 + dy} L${355 + dx * 1.6} ${500 + dy * 1.4}`, 0, 0.01, { c: "#fde047", w: 9 }));
L.put(S, "crt-sun-talking", 1440, 540, { s: 3.6, face: "smile" });
L.put(S, "ep48-plug", 1060, 640, { s: 2.2, rot: -38 });
S.text("THE SUN?", 640, 215, { size: 235, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
