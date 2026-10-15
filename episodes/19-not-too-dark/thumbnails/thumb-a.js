// look: v3
// A (floor-raiser): big uneasy Dave (dark skin) beside a group photo where everyone is sharp and his face is a shadow. Wrongness: the photo lost him.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#74C8ED", ground: "#6ABB5C", hy: 940 });
const F = S.fig(430, 1890, { s: 4.3, hair: "short", hairC: "#1d1b1f", skin: "#7a5236", outfit: "tee", outfitC: "#2f6fd6" }).instant(0);
F.face(0, "worried", 9);
S.draw(rect(960, 300, 820, 600), 0, 0.1, { w: 10, fill: "#ffffff" });
S.draw(rect(995, 335, 750, 340), 0, 0.1, { w: 4, fill: "#a9dcf5" });
S.draw(rect(995, 675, 750, 190), 0, 0.1, { w: 4, fill: "#7cc576" });
const pal = (x, skin, hair, hairC, outC) => S.fig(x, 850, { s: 1.05, hair, hairC, skin, outfit: "tee", outfitC: outC }).instant(0);
pal(1150, "#f6e7c4", "bun", "#5a3825", "#e5383b").face(0, "happy", 0);
const D = pal(1370, "#7a5236", "short", "#1d1b1f", "#2f6fd6"); D.face(0, "smile", 0);
pal(1590, "#d9a86c", "curly", "#1d1b1f", "#3f9e4a").face(0, "happy", 0);
S.fill(circ(D.hd[0], D.hd[1] + 6, D.r * 1.45, D.r * 1.4), 0, 0.1, "#1d1b1f", 0.82);
S.text("TOO DARK?", 960, 210, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
