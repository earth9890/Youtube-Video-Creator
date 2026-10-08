// theme: dark
// Thumbnail B: "STILL NOT STARTED." — hero flat on the floor among pages, phone glowing by the hand
const S = scene(0, 1, { cam: "none" });
S.text("STILL", 120, 300, { size: 230, c: RED, anchor: "start" });
S.text("NOT", 640, 300, { size: 230, anchor: "start" });
S.text("STARTED.", 120, 560, { size: 270, anchor: "start" });
// scattered pages: small tilted rects
const page = (cx, cy, deg) => { const a = (deg * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a), w = 55, h = 70;
  return poly([[-w, -h], [w, -h], [w, h], [-w, h], [-w, -h]].map(([x, y]) => [cx + x * c - y * s, cy + x * s + y * c]), 2); };
[[640, 860, -18], [1680, 740, 14], [560, 940, 8], [1740, 890, -8]].forEach(([x, y, d]) => S.draw(page(x, y, d), 0, 0.3, { w: 5 }));
const F = S.fig(900, 880, { s: 1.9 }).draw(0, 0.4); F.lie(0, 0.05); F.face(0.4, "tired", 0);
S.phone(1200, 680, 1.3, 0.1, 0.4, { screen: "feed", glow: true });
