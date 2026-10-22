// look: still
// B (old style, test partner, archetype A): big uneasy Dave on the left, sceptical, eyes slid to the right half. A giant plain can turned to its ingredients panel: the first line reads WATER, circled in red with a red arrow.
// Wrongness: the scariest ingredient is the first word on the list (the video's twist). Flat warm-grey field, no scene, no brand.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1500), 0, 0, "#cfc7bb", 1);
S.fill(rect(-200, 900, 2320, 400), 0, 0, "#b7ad9f", 1);
// the giant can (flat teal body, blank silver top) with its ingredients label
const cx = 1400;
S.draw(rrect(cx - 250, 170, 500, 860, 40), 0, 0, { c: "#1d1b1f", w: 9, fill: DS.volHex(CANC) });
S.draw(circ(cx, 175, 250, 36), 0, 0, { c: "#1d1b1f", w: 8, fill: "#c4c8cc" });
S.draw(circ(cx + 60, 168, 70, 14), 0, 0, { c: "#1d1b1f", w: 6, fill: "#9aa0a6" });
S.draw(rrect(cx - 215, 330, 430, 520, 24), 0, 0, { c: "#1d1b1f", w: 7, fill: "#ffffff" });
S.text("INGREDIENTS", cx, 410, { size: 52, c: "#6f757b" });
S.draw(line([cx - 180, 436], [cx + 180, 436], 0), 0, 0, { c: "#1d1b1f", w: 5 });
S.text("WATER", cx, 560, { size: 112, c: "#1d1b1f" });
[0, 1, 2].forEach((i) => S.draw(line([cx - 170, 650 + i * 52], [cx + 170 - i * 70, 650 + i * 52], 0), 0, 0, { c: "#c4c8cc", w: 10 }));
// the red ring round WATER and the red arrow in from the left
S.draw(rrect(cx - 205, 462, 410, 140, 40), 0, 0, { c: "#e5383b", w: 15 });
S.draw("M880 700 Q 1000 700 1130 600", 0, 0, { c: "#e5383b", w: 18 });
S.draw(arrowHead(1130, 600, -0.62, 54), 0, 0, { c: "#e5383b", w: 18 });
// big uneasy Dave, side-eyeing the can
const F = dave(S, 400, 1900, "near", { s: 4.2, mood: "worried", look: 9, breathe: false, pose: "stand" });
S.text("WATER?", 600, 195, { size: 230, c: "#ffffff", halo: "#111111", haloW: 0.1 });
