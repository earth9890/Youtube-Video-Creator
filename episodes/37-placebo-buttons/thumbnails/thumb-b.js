// look: still
// B (lottery ticket, archetype B: one symbol on black, no words): one glowing lift door-close button, pressed in, its wire unplugged and dangling.
// Wrongness: the button everyone jabs, plugged into nothing. The plug is the only red mark.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#05031A", 1);
S.fill(circ(960, 420, 620), 0, 0, DS.glow("#F4BC22", 0.45), 1);
// steel plate + button
S.draw(rrect(600, 70, 720, 700, 70), 0, 0, { c: "#000000", w: 10, fill: DS.vgrad("#c4c8cc", "#6f757b") });
const D = doorBtn(S, 960, 420, 270, "close", { lit: true });
D.cap.setAttribute("transform", "translate(960 420) scale(0.94) translate(-960 -420)");
// the wire: out of the plate's bottom, down, and a plug hanging free
S.draw("M960 770 C 960 860, 840 860, 880 940", 0, 0, { c: "#9aa0a6", w: 24 });
S.draw(rrect(830, 930, 100, 120, 16), 0, 0, { c: "#000000", w: 8, fill: "#D93A45" });
S.draw("M856 1050 V1090 M904 1050 V1090", 0, 0, { c: "#f2b84b", w: 12 });
