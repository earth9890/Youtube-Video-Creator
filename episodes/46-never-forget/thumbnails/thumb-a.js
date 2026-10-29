// look: still
// @library auto
// A (clickbait scene; title.md idea A): Dave huge and glassy-eyed in a warm night office, a tower of date-labelled binders bursting out of his head and leaning over,
// a tiny exhausted Brain on top, a window behind with the tiny lost car and its "?". Words: NEVER FORGET? (yellow, black halo).
// CRITIQUE (written, per thumbnail-pro.md; scores 1-5: focal 168px / emotion / curiosity / contrast / text / composition / polish / honesty / brand)
// round 1: 4 / 4 / 4 / 3 (binders blend into the warm wall) / 4 / 3 (tower too short, Brain lost) / 3 / 5 / 4. Fix: darker wall + lamp glow, bigger tower, Brain larger.
// round 2 (fan of binders, "dizzy" face instead of the default "o"): focal 4 / emotion 4 / curiosity 4 / contrast 4 / text 4 / composition 4 / polish 4 / honesty 5 / brand 4. Test partner (b.png).
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#7c3f1d", 1);
S.fill(circ(430, 60, 1100, 820), 0, 0, DS.glow("#fbbf24", 0.55), 1);
// window with the lost car (night field, moon, tiny car + ?)
S.draw(rrect(1250, 520, 560, 460, 18), 0, 0, { fill: "#16224d", c: "#111111", w: 12 });
S.fill(circ(1640, 640, 52), 0, 0, "#fef3c7", 1);
S.fill(rect(1256, 830, 548, 144), 0, 0, "#1f6f3a", 1);
L.put(S, "veh-car", 1470, 860, { s: 0.2, color: "red" });
S.text("?", 1470, 760, { size: 120, c: "#FEFE06", halo: "#111111", haloW: 0.12 });
S.draw("M1250 520 H1810 M1530 520 V980", 0, 0, { c: "#111111", w: 10 });
// a crown of date-labelled binders bursting out of Dave's head in a fan, a tiny exhausted Brain in the middle of it
const fan = [[-52, "MON 4 OCT", "red"], [-39, "TUE 5 OCT", "blue"], [-20, "WED 6 OCT", "green"], [0, "THU 7 OCT", "orange"], [20, "FRI 8 OCT", "purple"], [39, "SAT 9 OCT", "teal"], [52, "SUN 10 OCT", "pink"]];
fan.forEach(([rot, lab, c]) => L.put(S, "ep46-binder", 700, 520, { bw: 112, bh: [430, 470, 500, 520, 500, 470, 430][fan.findIndex((f) => f[0] === rot)], label: lab, c, rot, s: 1 }));
L.put(S, "kit-dave", 700, 2010, { s: 4.2, face: "dizzy" });
L.put(S, "kit-brain-tired", 700, 470, { s: 0.75 });
S.text("NEVER", 1440, 190, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
S.text("FORGET?", 1420, 390, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
