// look: v3
// B (lottery): one symbol on black, no text. A 1950s "Shirley" lab card: a white woman in a red dress beside colour swatches, the standard every print was tuned to.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#05031A", ground: "#05031A", hy: 1080 });
S.fill(circ(960, 540, 560, 460), 0, 0.1, "#f4bc22", 0.10);
S.draw(rect(600, 150, 720, 780), 0, 0.1, { w: 12, fill: "#fbf7ef" });
const F = S.fig(860, 880, { s: 2.0, hair: "bun", hairC: "#5a3825", skin: "#fbe3cf", outfit: "tunic", outfitC: "#e5383b" }).instant(0);
F.face(0, "smile", 0);
["#e5383b", "#ffcf33", "#3f9e4a", "#2f6fd6", "#9aa0a6", "#1d1b1f"].forEach((c, i) => S.draw(rect(1110, 200 + i * 112, 160, 88), 0, 0.1, { w: 5, fill: c }));
