// theme: dark
// Thumbnail A: "I DON'T / FEEL LIKE IT." — hero slumped on the couch with a phone, flame dying on the floor
const S = scene(0, 1, { cam: "none" });
S.text("I DON'T", 640, 270, { size: 230, t: 0, dur: 0.4 });
S.text("FEEL LIKE", 1060, 540, { size: 210, anchor: "end", t: 0, dur: 0.4 });
S.text("IT.", 1105, 540, { size: 210, anchor: "start", c: RED, t: 0, dur: 0.4 });
const CO = S.couch(1000, 960, 700, 0, 0.3);
const F = S.fig(1440, CO.seatY, { s: 1.5, sit: true, pose: "hold" }).draw(0, 0.4); // ponytail: s1.5 keeps seated feet above the 1020 margin
F.slump(0, 0.05, 10);
F.face(0.4, "tired", 0);
const [hx, hy] = F.hand("R");
S.phone(hx + 14, hy - 24, 1.2, 0.2, 0.3, { screen: "feed", glow: true });
const G = S.grp();
G.setAttribute("opacity", 0.5);
S.flame(860, 960, 1.0, 0, 0.4, { parent: G });
