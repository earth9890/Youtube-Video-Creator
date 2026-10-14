// look: v3
// B (lottery): no figure. A newspaper on navy: half the page screams STOP COUNTING while a magnifier hunts a tiny photo in the corner.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#1F2A55", ground: "#2c3a6b", hy: 1000 });
S.draw(rect(380, 90, 1160, 900), 0, 0.1, { w: 12, fill: "#fbf7ef" });
[[430, 140], [790, 140], [1150, 140]].forEach(([x, y]) => S.draw(rect(x, y, 330, 200), 0, 0.1, { w: 6, fill: "#a9dcf5" }));
S.draw(rect(430, 400, 1060, 540), 0, 0.1, { w: 8, fill: "#ffe38a" });
S.text("STOP", 960, 620, { size: 230, c: "#e5383b" });
S.text("COUNTING", 960, 850, { size: 200, c: "#e5383b" });
S.magnifier(1290, 230, 120, 0, 0.1, { fill: "#d6f0fc" });
