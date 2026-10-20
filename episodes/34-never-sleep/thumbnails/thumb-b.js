// look: still
// B (lottery ticket, archetype B): one brain on near-black, no text. The left half is pale and awake with one wide-open eye;
// the right half is deep blue and asleep with a shut eyelid and a single white "z". Wrongness: half a brain asleep while the other half keeps watch.
// @include kit.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#05031A", 1);
const cx = 960, cy = 560, k = 2.25;
S.draw(HEMI(cx - 14, cy, k, -1), 0, 0, { c: "#000000", w: 12, fill: "#f7b6c3" });
S.draw(HEMI(cx + 14, cy, k, 1), 0, 0, { c: "#000000", w: 12, fill: "#2f4a86" });
// folds (gyri), kept clear of the eyes
const wavy = (x0, y0, ang, L, A, n) => { const pts = []; for (let i = 0; i <= n * 16; i++) { const f = i / (n * 16), d = f * L, o = Math.sin(f * n * 2 * Math.PI) * A; pts.push([x0 + Math.cos(ang) * d - Math.sin(ang) * o, y0 + Math.sin(ang) * d + Math.cos(ang) * o]); } return pts; };
const G = [[-40, -240, 3.3, 170, 22, 2], [-250, -140, 1.2, 120, 18, 1.5], [-300, 40, 1.4, 120, 18, 1.5], [-70, 110, 2.2, 150, 20, 2], [-230, 190, 0.5, 130, 18, 1.5], [-60, -140, 2.0, 110, 16, 1.5]];
G.forEach(([x, y, a, L, A, n]) => { const P = wavy(x, y, a, L, A, n); S.draw(smooth(P.map(([u, v]) => [cx + u, cy + v])), 0, 0, { c: "#d0607a", w: 12 }); S.draw(smooth(P.map(([u, v]) => [cx - u, cy + v])), 0, 0, { c: "#1c2f5c", w: 12 }); });
// awake eye (left half), shut eye (right half)
S.draw(circ(cx - 200, cy - 10, 92), 0, 0, { c: "#000000", w: 10, fill: "#ffffff" });
S.draw(circ(cx - 170, cy - 4, 38), 0, 0, { c: "#000000", w: 4, fill: "#000000" });
S.fill(circ(cx - 182, cy - 16, 12), 0, 0, "#ffffff", 1);
S.draw(arc(cx + 200, cy - 20, 76, 20, 160), 0, 0, { c: "#ffffff", w: 14 });
[[-50, 70], [0, 82], [50, 70]].forEach(([dx, dy]) => S.draw(line([cx + 200 + dx * 0.9, cy - 20 + dy * 0.9], [cx + 200 + dx * 1.25, cy - 20 + dy * 1.3], 0), 0, 0, { c: "#ffffff", w: 10 }));
S.text("z", cx + 300, cy - 190, { size: 140, c: "#ffffff" });
