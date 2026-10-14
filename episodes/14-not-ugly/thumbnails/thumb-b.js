// look: v3
// B (lottery): police line-up — a phone and a mirror, both tagged LIAR. No other text.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#d9d4c7", ground: "#a49c8c", hy: 900 });
[0, 1, 2, 3, 4].forEach((i) => S.draw(line([80, 820 - i * 150], [1840, 820 - i * 150], 0), 0, 0.1, { w: 5, c: "#8c8577" }));
// phone suspect with shifty eyes
S.draw(rrect(420, 230, 360, 620, 50), 0, 0.1, { w: 12, fill: "#2b2d42" });
S.draw(rect(450, 290, 300, 500), 0, 0.1, { w: 6, fill: "#eaf6ff" });
[-1, 1].forEach((k) => S.draw(circ(600 + k * 70, 470, 50, 60), 0, 0.1, { w: 8, fill: "#ffffff" })); S.fill(circ(560, 480, 22), 0, 0.1, INK, 1); S.fill(circ(700, 480, 22), 0, 0.1, INK, 1);
// mirror suspect
S.draw(rrect(1100, 160, 420, 720, 40), 0, 0.1, { w: 12, fill: "#b08968" });
S.draw(rrect(1130, 190, 360, 660, 26), 0, 0.1, { w: 6, fill: "#dff3ff" });
S.draw(line([1180, 260], [1260, 220], 0), 0, 0.1, { w: 12, c: "#ffffff" });
[-1, 1].forEach((k) => S.draw(circ(1310 + k * 70, 470, 50, 60), 0, 0.1, { w: 8, fill: "#ffffff" })); S.fill(circ(1270, 480, 22), 0, 0.1, INK, 1); S.fill(circ(1410, 480, 22), 0, 0.1, INK, 1);
[[600, 950], [1310, 950]].forEach(([cx, cy]) => { S.draw(rrect(cx - 230, cy - 95, 460, 165, 16), 0, 0.1, { w: 9, fill: "#ffffff" }); S.text("LIAR", cx, cy + 40, { size: 150, c: RED }); });
