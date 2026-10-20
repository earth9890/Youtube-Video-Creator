// look: still
// C (clickbait scene mode, 2026-10-20): a New York crossing at sunrise. Huge furious Dave mashes the walk button (eleven presses
// in the video) while its cable hangs out of the bottom, cut; a small kid jabs the air for fun (the Brooklyn four-year-old).
// Wrongness: a button under a PUSH BUTTON sign, wired to nothing (2,500+ of New York's 3,250 in 2004). Text asks the question.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
DS.outdoor(S, Object.assign({}, DAWN, { sun: [860, 250] }));
street(S, DAWN, { zebra: 1450 });
// warm morning light across the pavement
S.fill(circ(1100, 980, 900, 260), 0, 0, DS.glow("#ffd9a0", 0.45), 1);
// across the road: the signal still shows the orange hand
pole(S, 820, 380, 640, { layer: "mid", float: true });
pedSig(S, 820, 420, 0.85, { layer: "mid" });
// our pole, the PUSH BUTTON plate, the button, the cut cable
pole(S, 1350, -40, 980);
S.draw(rrect(1130, 300, 440, 210, 18), 0, 0, { c: "#1d1b1f", w: 9, fill: "#ffffff" });
S.text("PUSH", 1350, 392, { size: 84, c: "#1d1b1f" });
S.text("BUTTON", 1350, 480, { size: 84, c: "#1d1b1f" });
const B = walkBox(S, 1350, 700, 1.25, { sign: false });
S.draw("M1392 815 C 1410 870, 1470 880, 1458 950", 0, 0, { c: "#3a363d", w: 30 });
S.draw("M1444 950 l-24 50 M1458 954 l2 56 M1472 950 l26 48", 0, 0, { c: "#ff8c1a", w: 10 });
S.draw(circ(1460, 978, 70), 0, 0, { c: "#e5383b", w: 12 });
// mashing bursts round the button
S.draw(rays(1350, 700, 110, 165, 10, -Math.PI / 2 + 0.3), 0, 0, { c: DS.c("orange"), w: 12 });
// small kid on the right, pressing for fun
const K = who(S, 1720, 960, "near", Object.assign({}, KID, { s: 0.95, mood: "happy", look: -6, pose: "armsUp" }));
// huge furious Dave jabbing the button
const F = dave(S, 420, 1900, "near", { s: 4.2, mood: "angry", look: 9, breathe: false });
sweat(S, F, 0);
// shouting mouth over the frown (rage, not grumpy)
S.draw(circ(F.cx + 10, F.hd[1] + 112, 74, 48), 0, 0, { c: "#1d1b1f", w: 9, fill: "#8c2f39" });
S.fill(`M${F.cx - 46} ${F.hd[1] + 82} Q${F.cx + 10} ${F.hd[1] + 60} ${F.cx + 66} ${F.hd[1] + 82} L${F.cx + 62} ${F.hd[1] + 96} Q${F.cx + 10} ${F.hd[1] + 82} ${F.cx - 42} ${F.hd[1] + 96} Z`, 0, 0, "#ffffff", 1);
const Fg = finger(S, 1300, 712, -14, 1.2, { dist: 0, sleeve: "blue" });
S.text("FAKE BUTTON?", 960, 215, { size: 190, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
