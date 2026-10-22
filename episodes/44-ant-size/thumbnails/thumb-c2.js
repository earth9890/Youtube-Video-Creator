// look: still
// C2 (the consequence, at its extreme): a frame-filling raindrop beaded on a leaf, flat hot-orange sky. Dave's head is stuck in its side (the water wraps round his head, his body stays
// outside), hands pushing on the surface, side-eyeing the friendly ant who peers in from the right. Honest to the video: the drop grabs his face; comic, never drowning.
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#FF8A1E", 1);
// the leaf: a broad green surface with a midrib
DS.shape(S, `M-100 930 Q700 880 2020 950 V1180 H-100 Z`, "green", { flat: true, w: "near" });
S.draw(`M-100 1060 Q900 990 2020 1010`, 0, 0, { c: DS.c("green", 2), w: DS.w.mid });
// the drop: built in a group under Dave, shaped round his head
const gD = S.grp();
const F = dave(S, 1340, 1600, "near", { s: 3.0, mood: "flat", look: -10, pose: "hips", breathe: false });
const [hx, hy] = F.hd, R = F.r;
const cx = 820, cy = 540, rx = 580, ry = 490, by = 975, bx = rx * Math.sqrt(1 - ((by - cy) / ry) ** 2);
const drop = `M${cx - bx} ${by} A${rx} ${ry} 0 1 1 ${cx + bx} ${by} Q${cx} ${by + 22} ${cx - bx} ${by} Z`, lobe = circ(hx, hy, R * 1.38);
const OUT = "#1f5fc4";
[drop, lobe].forEach((d) => S.draw(d, 0, 0, { c: OUT, w: 30, parent: gD }));
[drop, lobe].forEach((d) => S.fill(d, 0, 0, "#a6dcf7", 1, gD));
S.fill(`M${cx - rx * 0.86} ${cy + ry * 0.38} Q${cx} ${cy + ry * 0.05} ${cx + rx * 0.86} ${cy + ry * 0.38} Q${cx + rx * 0.5} ${by + 4} ${cx} ${by + 8} Q${cx - rx * 0.5} ${by + 4} ${cx - rx * 0.86} ${cy + ry * 0.38} Z`, 0, 0, "#7ccf86", 0.85, gD); // the leaf seen through the water, bent upward
S.fill(circ(cx + rx * 0.05, by - 40, rx * 0.4, 40), 0, 0, "#f6ffb0", 0.9, gD); // light focused by the drop
// highlights and the neck meniscus, over Dave (highlight top-left of the drop, rim light lower right is hidden by Dave so it goes lower left)
S.draw(`M${cx - rx * 0.78} ${cy - ry * 0.25} Q${cx - rx * 0.66} ${cy - ry * 0.8} ${cx - rx * 0.12} ${cy - ry * 0.93}`, 0, 0, { c: "#ffffff", w: 44 });
S.fill(circ(cx + rx * 0.08, cy - ry * 0.86, 26), 0, 0, "#ffffff", 1);
S.draw(`M${cx - rx * 0.62} ${cy + ry * 0.55} Q${cx - rx * 0.86} ${cy + ry * 0.25} ${cx - rx * 0.9} ${cy - ry * 0.1}`, 0, 0, { c: "#ffffff", w: 20 });
S.draw(`M${hx - R * 0.95} ${hy + R * 1.05} Q${hx} ${hy + R * 1.5} ${hx + R * 0.95} ${hy + R * 1.05}`, 0, 0, { c: OUT, w: 22 });
S.draw(`M${hx + R * 1.05} ${hy - R * 0.45} Q${hx + R * 0.95} ${hy - R * 1.0} ${hx + R * 0.35} ${hy - R * 1.22}`, 0, 0, { c: "#ffffff", w: 26 });
// the ant, outside on the leaf, peering in from the left
ant(S, 200, 1012, 2.0, { face: "smile", look: 5 });
S.text("STUCK?", 960, 300, { size: 340, c: "#FEFE06", halo: "#111111", haloW: 0.095 });
