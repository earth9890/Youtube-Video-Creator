// look: still
// A (floor-raiser, archetype A on flat city colours): big-head Dave side-eyes the walk button he is pressing; its cable hangs out of the bottom, cut.
// Wrongness: a button you press every day, plugged into nothing. Text asks the question (not the title). One red mark: the ring on the cut end.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#74C8ED", 1);
S.fill(rect(-200, 820, 2320, 400), 0, 0, "#9AA0A6", 1);
S.fill(rect(-200, 820, 2320, 14), 0, 0, "#6F757B", 1);
S.fill(rect(1330, -20, 64, 860), 0, 0, "#6F757B", 1);
S.draw(rect(1330, -20, 64, 860), 0, 0, { c: "#1d1b1f", w: 7 });
// the plate
S.draw(rrect(1080, 150, 564, 230, 18), 0, 0, { c: "#1d1b1f", w: 9, fill: "#ffffff" });
S.text("PUSH", 1362, 250, { size: 92, c: "#1d1b1f" });
S.text("BUTTON", 1362, 350, { size: 92, c: "#1d1b1f" });
const B = walkBox(S, 1362, 610, 1.55, { sign: false });
// the cable: out of the bottom, cut, copper showing; one red ring
S.draw("M1420 760 C 1440 840, 1520 850, 1510 930", 0, 0, { c: "#3a363d", w: 30 });
S.draw("M1496 930 l-26 52 M1510 934 l2 58 M1524 930 l28 50", 0, 0, { c: "#ff8c1a", w: 10 });
S.draw(circ(1512, 960, 74), 0, 0, { c: "#e5383b", w: 12 });
const F = dave(S, 430, 1890, "near", { s: 4.3, mood: "worried", look: 9, breathe: false });
const Fg = finger(S, 1362 - 70, 640, -38, 1.25, { dist: 0, sleeve: "blue" });
S.text("FAKE?", 690, 230, { size: 240, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
