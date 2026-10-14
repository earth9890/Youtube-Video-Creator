// look: v3
// B (lottery): an apartment block at night, cropped by the frame; every window is one person alone on a couch, lit by a TV. One window glows gold. No words.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#0b1230", ground: "#1a2036", hy: 1000 });
[[90, 140], [180, 420], [120, 760], [1760, 120], [1840, 460], [1710, 800]].forEach(([x, y]) => S.fill(circ(x, y, 6), 0, 0.1, "#ffffff", 0.75));
S.draw(rect(300, -40, 1320, 1160), 0, 0.1, { w: 12, fill: "#6b4a35" });
for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
  const x = 360 + c * 250, y = 60 + r * 300, gold = r === 1 && c === 3;
  S.draw(rect(x, y, 200, 230), 0, 0.1, { w: 8, fill: gold ? "#F4BC22" : "#6d9ee8" });
  S.fill(rect(x + 14, y + 170, 172, 48), 0, 0.1, "#3d2a5c", 1);
  S.fill(circ(x + 100, y + 120, 32), 0, 0.1, "#111111", 1);
  S.fill(rrect(x + 50, y + 150, 100, 70, 24), 0, 0.1, "#111111", 1);
}
