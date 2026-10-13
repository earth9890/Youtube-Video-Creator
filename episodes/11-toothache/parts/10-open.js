// ===== COLD OPEN + WHY IT HURTS (lines 1–22) =====
const mini = (S, x, y, s, col = PAPER, dead) => { fl(S, circ(x, y - 70 * s, 20 * s), col, { w: 5 }); dr(S, `M${x} ${y - 50 * s} L${x} ${y} M${x} ${y} L${x - 14 * s} ${y + 34 * s} M${x} ${y} L${x + 14 * s} ${y + 34 * s} M${x - 20 * s} ${y - 30 * s} L${x + 20 * s} ${y - 30 * s}`, { w: 5 }); if (dead) S.cross(x, y - 20 * s, 0.7 * s, S.start, Q); };
const alps = (S) => { S.bg("day", { hy: 700, clouds: 1 }); fl(S, poly([[-40, 700], [260, 300], [420, 470], [640, 230], [900, 520], [1100, 360], [1400, 700]], 2), "#b9c4cf", { w: 7 }); fl(S, poly([[560, 330], [640, 230], [720, 330], [680, 310], [640, 340], [600, 310]], 1), "#ffffff", { w: 4 }); fl(S, poly([[200, 375], [260, 300], [320, 375], [260, 360]], 1), "#ffffff", { w: 4 }); };

// L1 Tonight, if one of your teeth starts to throb…
shot(1, 0, (S) => { S.bg("roomNight", { window: [1300, 170, 360, 300] }); const F = you(S, 760, 790, { s: 1.5, mood: "worried", look: -3, pose: "head" }); pain(S, 760, F.hd[1] - 20, 110); S.label("TONIGHT", 760, 150, { c: "#ffffff" }); });
// L2 painkiller / complain / dentist
shot(2, 0, (S) => { S.bg("white", { floor: false }); pill(S, 960, 540, 3.4); S.label("PAINKILLER", 960, 260); });
shot(2, 4, (S) => { S.bg("white"); you(S, 700, FLOOR, { s: 1.4, mood: "sad", bandage: true }); S.speech(1180, 360, 230, 120, 860, 470, S.start, Q); S.label("OWW…", 1180, 385, { size: 76 }); });
shot(2, 7, (S) => { S.bg("white"); you(S, 640, FLOOR, { s: 1.3, mood: "worried", bandage: true }); doc(S, 1220, FLOOR, { s: 1.3, mood: "smile", look: -4 }); S.label("DENTIST", 1220, 200); });
// L3 14,000 years ago, a young man in the Italian Alps… same pain
shot(3, 0, (S) => { alps(S); S.label("14,000 YEARS AGO", 960, 160, { c: C.red, size: 100 }); });
shot(3, 11, (S) => { alps(S); const F = cave(S, 1500, 900, { s: 1.4, mood: "worried", bandage: true, look: -3 }); pain(S, F.hd[0], F.hd[1] - 20, 120); S.label("SAME PAIN", 1500, 180); });
// L4 His dentist had a rock. [S]
shot(4, 0, (S) => { S.bg("desert", { hy: 700 }); cave(S, 620, 900, { s: 1.3, mood: "worried", bandage: true, look: 4 }); const F = cave(S, 1180, 900, { s: 1.3, mood: "smile", hair: "curly", look: -4, pose: "hold" }); rock(S, F.hand("R", "hold")[0] - 10, F.hand("R", "hold")[1] - 40, 0.9); S.label("DENTIST", 1180, 230, { to: [1180, 420] }); });
// L5 And that wasn't even the worst option.
shot(5, 0, (S) => { S.bg("white"); rock(S, 600, 560, 1.8); S.label("OPTION 1", 600, 330); fl(S, rrect(1100, 330, 420, 420, 30), "#2b2b2b", { w: 7 }); S.label("?", 1310, 610, { size: 260, c: "#ffffff" }); S.label("WORSE", 1310, 290, { c: C.red }); });
// L6 For most of human history… no painkiller, no dentist, no idea why teeth rot
shot(6, 0, (S) => { S.bg("white", { floor: false }); fl(S, rrect(160, 470, 1600, 90, 30), "#2b2b2b", { w: 7 }); fl(S, rrect(1720, 470, 40, 90, 12), C.yel, { w: 5 }); S.label("HUMAN HISTORY", 960, 380); S.label("US", 1740, 680, { c: C.red, size: 70, to: [1740, 580] }); });
shot(6, 7, (S) => { S.bg("white", { floor: false }); pill(S, 960, 540, 3.4); S.cross(960, 540, 4.2, S.start, Q); S.label("NO PAINKILLER", 960, 250); });
shot(6, 9, (S) => { S.bg("white"); doc(S, 960, FLOOR, { s: 1.4, mood: "flat" }); S.cross(960, 520, 4.2, S.start, Q); S.label("NO DENTIST", 960, 160); });
shot(6, 12, (S) => { S.bg("white", { floor: false }); tooth(S, 760, 540, 1.8, { cavity: true, rot: true }); S.label("?", 1260, 650, { size: 380, c: C.red }); S.label("WHY?", 960, 190); });
// L7 So what did ancient humans actually do about toothache? (title question)
shot(7, 0, (S) => { S.bg("navy", { hy: 760 }); S.flame(1250, 860, 1.3, S.start, Q); const F = cave(S, 760, 860, { s: 1.6, mood: "cry", bandage: true, look: 4 }); pain(S, F.hd[0], F.hd[1] - 20, 120); S.label("TOOTHACHE?", 960, 170, { c: C.yel, halo: "#111111", size: 120 }); });
// L8 flint, worms, hair, frogs, and one very bad decision
shot(8, 3, (S) => { S.bg("kraft", { floor: false }); flint(S, 960, 520, 3); S.label("FLINT", 960, 200); });
shot(8, 4, (S) => { S.bg("kraft", { floor: false }); worm(S, 900, 560, 2.4, { mood: "evil" }); S.label("WORMS", 960, 200); });
shot(8, 5, (S) => { S.bg("kraft", { floor: false }); hairBall(S, 960, 560, 2); S.label("HAIR", 960, 200); });
shot(8, 6, (S) => { S.bg("kraft", { floor: false }); frog(S, 960, 600, 2.3); S.label("FROGS", 960, 200); });
shot(8, 8, (S) => { S.bg("black"); wheat(S, 700, 820, 2.2); sugar(S, 1250, 760, 1.6); S.label("ONE BAD DECISION", 960, 170, { c: "#ffffff" }); S.label("?", 960, 640, { size: 200, c: C.red }); });
// L9 why it hurts so much
shot(9, 0, (S) => { S.bg("white"); const F = you(S, 960, FLOOR, { s: 1.6, mood: "cry", bandage: true }); pain(S, F.hd[0], F.hd[1] - 20, 130); S.label("WHY SO MUCH?", 960, 140); });
// L10 Inside every tooth… pulp
shot(10, 0, (S) => { S.bg("blueprint", { floor: false }); tooth(S, 960, 520, 2.6); S.label("INSIDE", 960, 140, { c: "#ffffff" }); });
shot(10, 12, (S) => { S.bg("blueprint", { floor: false }); tooth(S, 960, 520, 2.6, { pulp: true }); S.label("PULP", 1500, 420, { c: C.yel, to: [1040, 520] }); S.label("NERVES + BLOOD", 960, 140, { c: "#ffffff", size: 72 }); });
// L11 a box made of the hardest material in your body
shot(11, 0, (S) => { S.bg("blueprint", { floor: false }); tooth(S, 960, 520, 2.6, { pulp: true }); S.label("ENAMEL", 1500, 330, { c: C.yel, to: [1170, 360] }); S.label("HARDEST IN YOUR BODY", 960, 140, { c: "#ffffff", size: 72 }); });
// L12 bacteria get in / pulp swells
shot(12, 0, (S) => { S.bg("blueprint", { floor: false }); tooth(S, 960, 520, 2.6, { pulp: true, cavity: true }); bact(S, 640, 230, 1.3); bact(S, 820, 170, 0.9); S.label("BACTERIA", 1420, 200, { c: C.yel, to: [870, 320] }); });
shot(12, 5, (S) => { S.bg("blueprint", { floor: false }); tooth(S, 960, 520, 2.6, { cavity: true }); fl(S, closed(960, 520, 2.6, [[-70, 20], [-74, -40], [-40, -55], [0, -45], [40, -55], [74, -40], [70, 20], [50, 80], [36, 125], [0, 70], [-36, 125], [-50, 80]]), C.nerve, { w: 4 }); S.label("SWELLS", 960, 140, { c: C.yel }); });
// L13 But the box doesn't.
shot(13, 0, (S) => { S.bg("blueprint", { floor: false }); tooth(S, 960, 520, 2.6, { pulp: true }); S.ring(960, 560, 290, 360, S.start, Q, { c: C.yel }); S.label("NO ROOM", 960, 140, { c: C.yel }); });
// L14 crushes the nerve… in time with your heartbeat
shot(14, 0, (S) => { S.bg("danger", { floor: false }); tooth(S, 960, 640, 2.1, { pulp: true, pain: true }); S.label("CRUSH", 960, 120, { c: "#ffffff" }); });
shot(14, 9, (S) => { S.bg("danger", { floor: false }); S.heart(620, 520, 4.4, S.start, Q); S.label("=", 960, 580, { size: 200, c: "#ffffff" }); tooth(S, 1320, 540, 1.6, { pain: true }); S.label("THUMP. THUMP.", 960, 170, { c: "#ffffff" }); });
// L15 That throbbing? That's your own pulse, used against you. [S]
shot(15, 0, (S) => { S.bg("white"); const F = you(S, 760, FLOOR, { s: 1.5, mood: "angry", bandage: true, look: 5 }); S.heart(1300, 470, 3.2, S.start, Q); [-1, 1].forEach((sd) => fl(S, circ(1300 + sd * 40, 440, 12), INK, { w: 2 })); dr(S, smooth([[1260, 500], [1300, 490], [1340, 500]]), { w: 5 }); S.label("TRAITOR", 1300, 250, { c: C.red }); });
// L16 the pain was the good news
shot(16, 0, (S) => { S.bg("white", { floor: false }); tooth(S, 640, 520, 1.8, { pain: true }); S.label("PAIN", 640, 900); S.label("=", 960, 560, { size: 180 }); S.label("GOOD NEWS", 1350, 560, { c: C.green }); });
// L17 spread into the jaw, the neck, and the blood
shot(17, 0, (S) => { S.bg("danger", { floor: false }); const F = cave(S, 960, 1100, { s: 2.6, mood: "worried", look: 0 }); fl(S, circ(F.hd[0] + F.r * 0.5, F.hd[1] + F.r * 0.45, 22), C.red, { w: 4 }); S.label("INFECTED", 1450, 200, { c: "#ffffff", to: [F.hd[0] + F.r * 0.6, F.hd[1] + F.r * 0.4] }); });
shot(17, 6, (S) => { S.bg("danger", { floor: false }); const F = cave(S, 960, 1100, { s: 2.6, mood: "wow" }); const sx = F.hd[0] + F.r * 0.5, sy = F.hd[1] + F.r * 0.45; fl(S, circ(sx, sy, 34), C.red, { w: 4 }); S.arrow(sx, sy + 30, sx - 30, sy + 200, S.start, Q, { c: C.red, w: 8 }); S.label("JAW. NECK.", 1460, 180, { c: "#ffffff" }); });
shot(17, 10, (S) => { S.bg("danger", { floor: false }); blood(S, 960, 560, 3); S.label("BLOOD", 960, 180, { c: "#ffffff" }); });
// L18 Before antibiotics… killed more than half
shot(18, 0, (S) => { S.bg("white", { floor: false }); pill(S, 960, 540, 3.4); S.cross(960, 540, 4.2, S.start, Q); S.label("NO ANTIBIOTICS", 960, 250); });
shot(18, 7, (S) => { S.bg("white"); for (let i = 0; i < 10; i++) mini(S, 240 + i * 160, 700, 2, PAPER, i < 6); S.label("MORE THAN HALF", 960, 230, { c: C.red }); });
// L19 300,000 years ago… Zambia… 10 of 15 teeth
shot(19, 0, (S) => { S.bg("kraft"); skull(S, 960, 560, 2.1, { bad: [-3, -1, 0, 2, 3] }); S.label("300,000 YEARS AGO", 960, 150, { c: C.red }); });
shot(19, 7, (S) => { S.bg("blueprint", { floor: false }); land(S, 960, 560, 900, 700, "#c9b27a"); pin(S, 1060, 620, 1.6); S.label("ZAMBIA", 1060, 760, { c: "#ffffff", halo: "#111111", haloW: 0.1 }); });
shot(19, 12, (S) => { S.bg("kraft", { floor: false }); nums(S, 960, 560, 10, 5, C.rot, 15); S.label("10 OF 15 TEETH", 960, 170, { c: C.red }); S.label("CAVITIES", 960, 980); });
// L20 Some researchers think the infection is what killed him.
shot(20, 0, (S) => { S.bg("kraft"); skull(S, 1250, 600, 1.5, { bad: [-3, -1, 0, 2, 3] }); doc(S, 620, FLOOR, { s: 1.4, mood: "worried", look: 5 }); S.magnifier(930, 470, 80, S.start, Q); S.label("INFECTION?", 1250, 220, { c: C.red }); });
// L21 they weren't being dramatic.
shot(21, 0, (S) => { S.bg("navy", { hy: 760 }); const F = cave(S, 960, 860, { s: 1.7, mood: "cry", bandage: true }); S.label("DRAMATIC?", 960, 160, { c: "#ffffff" }); S.label("NO.", 1520, 520, { c: C.red, size: 120 }); });
// L22 They were in danger.
shot(22, 0, (S) => { S.bg("black"); cave(S, 760, 900, { s: 1.5, mood: "wow", bandage: true, look: 5 }); skull(S, 1350, 560, 1.6, { bad: [0, 1] }); S.label("DANGER.", 960, 170, { c: C.red, size: 120 }); }, { cam: "push" });
