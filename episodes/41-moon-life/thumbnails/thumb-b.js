// look: still
// B (old style, test partner): big uneasy Dave on the left, eyes sideways, bubble helmet frosted, striped jumper pulled over his suit, holding his suitcase.
// Earth small and fixed in the black sky top right. Text asks the cold question in white (the night hook: -130°C).
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#05040b", 1);
stars(S, 90, -50, -50, 1960, 640, { big: 4 });
earth(S, 1790, 150, 70, { night: true, nightA: 20 });
S.fill(`M-200 700 Q400 640 960 680 T2120 660 V1280 H-200 Z`, 0, 0, DS.vgrad("#9aa0a6", "#5f656b"), 1);
const F = daveM(S, 470, 1900, "near", { s: 4.2, mood: "worried", look: 9, pose: "reach", breathe: false });
jumper(S, F);
flakes(S, F.cx, F.hd[1] + 260, 9, undefined);
suitcase(S, 1010, 1030, 1.5);
DS.vignette(S, 0.2);
S.text("-130°C?", 1250, 400, { size: 230, c: "#ffffff", halo: "#111111", haloW: 0.09 });
