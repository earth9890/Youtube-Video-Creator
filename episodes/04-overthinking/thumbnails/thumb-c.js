// look: still
// C (clickbait scene mode, 2026-10-20): Dave awake in bed at night, clutching the blanket, with his own storm cloud raining
// and flashing over his head indoors (the video: "your thoughts are not facts, they're weather"). Text "91% WRONG?": the
// video's hook (91% of the worries people wrote down never happened).
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#7b5a6e", ground: "#5a4150", hy: 900 });
// night window on the left
DS.shape(S, rrect(90, 330, 330, 300, DS.r.sm), "night", { t: 0, flat: true, w: "mid" });
S.draw(line([255, 330], [255, 630], 0) + line([90, 480], [420, 480], 0), 0, 0, { c: "#1d1b1f", w: 7 });
S.fill(circ(340, 400, 34), 0, 0, "#fff3c4", 1);
[[150, 380], [190, 560], [330, 570], [380, 520]].forEach(([x, y]) => S.fill(circ(x, y, 5), 0, 0, "#ffffff", 0.9));
// bedside lamp on the right: warm glow, table, shade
S.fill(circ(1570, 560, 520, 460), 0, 0, DS.glow("#ffc061", 0.75), 1);
DS.shape(S, rrect(1420, 760, 300, 40, DS.r.xs), "wood", { t: 0, w: "mid" });
DS.shape(S, rrect(1450, 800, 240, 220, DS.r.xs), "wood", { t: 0, w: "mid" });
S.draw(line([1570, 560], [1570, 760], 0), 0, 0, { c: "#1d1b1f", w: 9 });
DS.shape(S, `M1490 560 L1650 560 L1620 440 L1520 440 Z`, "yellow", { t: 0, flat: true, w: "mid" });
// bed: headboard + pillow behind Dave
DS.shape(S, rrect(300, 600, 860, 560, DS.r.lg), "wood", { t: 0, w: "mid" });
DS.shape(S, rrect(390, 760, 680, 240, 90), "paper", { t: 0, w: "mid" });
// Dave sitting up in bed, eyes wide, gripping the blanket
const F = S.fig(730, 1960, { s: 4.25, hair: "side", hairC: DS.c("brown"), outfit: "tee", outfitC: DS.c("blue"), armL: [[-62, 40], [-24, 74]], armR: [[62, 40], [24, 74]] }).instant(0);
F.face(0, "wow", 6);
const hx = 730, hy = 1960 - 309 * 4.25, r = 212;
S.drop(hx - 1.1 * r, hy - 0.3 * r, 2.2, 0, 0); S.drop(hx + 1.12 * r, hy + 0.05 * r, 1.8, 0, 0);
// blanket over his lap, up to the hands
DS.shape(S, `M200 1010 Q480 960 740 985 Q1000 960 1280 1010 L1280 1100 L200 1100 Z`, "gold", { t: 0, w: "mid" });
S.draw(smooth([[380, 1040], [500, 1070], [600, 1050]]) + smooth([[860, 1060], [980, 1040], [1100, 1070]]), 0, 0, { c: DS.c("gold", 2), w: 6 });
// his own storm cloud, indoors: rain on his head, lightning on both sides
const CX = 730, CY = 360;
[-260, -190, -120, -50, 20, 90, 160, 230].forEach((dx, i) => { const x = CX + dx, y = CY + 110 + (i % 2) * 40; S.draw(line([x, y], [x - 16, y + 56], 0), 0, 0, { c: "#5aa0ea", w: 9 }); });
S.bolt(CX - 330, CY + 170, 1.5, 0, 0); S.bolt(CX + 340, CY + 160, 1.8, 0, 0);
S.draw(smooth([[CX - 330, CY + 70], [CX - 320, CY - 10], [CX - 240, CY - 50], [CX - 170, CY - 90], [CX - 60, CY - 100], [CX + 30, CY - 70], [CX + 120, CY - 90], [CX + 230, CY - 50], [CX + 320, CY - 10], [CX + 340, CY + 60], [CX + 280, CY + 110], [CX + 120, CY + 115], [CX - 60, CY + 105], [CX - 230, CY + 115], [CX - 330, CY + 70]]) + " Z", 0, 0, { fill: "#545967", c: "#1d1b1f", w: 7 });
S.text("91% WRONG?", 960, 230, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
