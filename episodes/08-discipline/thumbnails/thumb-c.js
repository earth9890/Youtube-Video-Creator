// look: still
// C (clickbait scene mode, 2026-10-20): motivation, a little flame with legs and a suitcase, walks out of Dave's bedroom door
// while big Dave reaches after it (script: "Motivation is a feeling. It shows up late, and leaves early."). Text "COME BACK!".
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#e6ad63", ground: "#a06a3e", hy: 920 });
S.fill(circ(1510, 640, 520, 420), 0, 0, "#ffe7ad", 0.35); // the flame's glow
// open door to a dark hall
DS.shape(S, rect(1280, 290, 460, 640), "wood", { t: 0, w: "near", dir: "v" });
DS.shape(S, rect(1310, 320, 400, 610), "night", { t: 0, w: "mid", flat: true, tone: 2 });
DS.shape(S, `M1740 320 L1900 360 L1900 980 L1740 930 Z`, "wood", { t: 0, w: "near", tone: 1, flat: true });
S.fill(circ(1870, 670, 14), 0, 0, "#3d2418", 1);
// the flame, leaving, glancing back
const fx = 1490, fb = 830, k = 2.5;
[[-1, -50], [1, 50]].forEach(([sd, dx]) => S.draw(`M${fx + sd * 24} ${fb - 4} L${fx + dx} ${fb + 86} l${sd * 30} 0`, 0, 0, { w: 10 }));
S.flame(fx, fb, k, 0, 0);
[-1, 1].forEach((sd) => { S.draw(circ(fx + sd * 40 - 10, fb - 170, 30, 35), 0, 0, { w: 6, fill: "#ffffff" }); S.fill(circ(fx + sd * 40 - 26, fb - 166, 14), 0, 0, "#1d1b1f", 1); });
S.draw(`M${fx + 90} ${fb - 120} L${fx + 160} ${fb - 60}`, 0, 0, { w: 10 });
DS.shape(S, rrect(fx + 110, fb - 60, 190, 140, DS.r.sm), "earth", { t: 0, w: "mid" });
[fx + 150, fx + 260].forEach((x) => S.draw(`M${x} ${fb - 60} V${fb + 80}`, 0, 0, { c: "#7f5f45", w: 12 }));
S.draw(`M${fx + 170} ${fb - 60} V${fb - 88} H${fx + 240} V${fb - 60}`, 0, 0, { w: 9 });
S.text("MOTIVATION", fx, 278, { size: 64, c: "#ffffff", halo: "#111111", haloW: 0.14 });
// big Dave reaching after it
const F = S.fig(500, 1900, { s: 4.2, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6", armR: [[70, -20], [150, -44]] }).instant(0);
F.face(0, "wow", 9);
S.drop(260, 520, 2.2, 0);
S.text("COME BACK!", 760, 200, { size: 205, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
