// look: v3
// B (lottery ticket, archetype B): near-black, Dave's arm (blue sleeve) and one big white doodle hand pointing out at the viewer, poster-style (three-quarter view); a red ring round the fingertip. No text.
// The episode's payoff ("point at one person") turned on the viewer; the title "The Bystander Effect" supplies the mystery.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#05031A", ground: "#05031A", hy: 1080 });
const W0 = "#ffffff", d = (p, o = {}) => S.draw(p, 0, 0.1, Object.assign({ w: 10, fill: W0 }, o));
d(`M1150 1180 L1360 1180 L1110 700 L950 760 Z`, { fill: "#2f6fd6" });                       // forearm in Dave's blue sleeve
d(rrect(900, 690, 250, 110, 40), { fill: "#2f6fd6" });                                       // cuff
d(smooth([[780, 560], [800, 450], [900, 390], [1040, 400], [1130, 470], [1150, 590], [1100, 700], [980, 750], [850, 735], [790, 660], [780, 560]]) + " Z"); // fist
d(rrect(990, 450, 180, 78, 39)); d(rrect(1000, 524, 166, 76, 38)); d(rrect(1004, 596, 146, 70, 35));   // curled fingers, knuckles to the right
// index finger: a tapered tube from the knuckle up-left toward the viewer, the tip slightly bigger (closer)
const [bx, by, tx, ty] = [900, 470, 640, 300], len = Math.hypot(tx - bx, ty - by), ux = (tx - bx) / len, uy = (ty - by) / len, nx = -uy, ny = ux;
d(`M${bx - nx * 62} ${by - ny * 62} L${tx - nx * 78} ${ty - ny * 78} A78 78 0 0 1 ${tx + nx * 78} ${ty + ny * 78} L${bx + nx * 62} ${by + ny * 62} Z`);
[0.38, 0.66].forEach((f) => { const cx = bx + (tx - bx) * f, cy = by + (ty - by) * f, w = 62 + 16 * f; d(`M${cx - nx * w * 0.8} ${cy - ny * w * 0.8} Q${cx + ux * 14} ${cy + uy * 14} ${cx + nx * w * 0.8} ${cy + ny * w * 0.8}`, { fill: "none", w: 6 }); });
const ng = S.grp(); d(circ(0, 0, 46, 32), { fill: "#f6d2d8", w: 7, parent: ng }); ng.setAttribute("transform", `translate(${tx + ux * 18 - nx * 34} ${ty + uy * 18 - ny * 34}) rotate(${(Math.atan2(uy, ux) * 180) / Math.PI})`); // nail, on the top side near the tip
const th = S.grp(); d(rrect(780, 600, 270, 86, 43), { parent: th }); th.setAttribute("transform", "rotate(-28 915 643)"); // thumb tucked across the front
S.draw(circ(tx + ux * 10, ty + uy * 10, 150), 0, 0.1, { w: 16, c: "#e5383b" });
