// ===== THE FIRST DENTISTS (lines 23–55) =====
const stick = (S, x1, y1, x2, y2) => dr(S, line([x1, y1], [x2, y2], 2), { w: 8, c: C.wood });
const teethRow = (S, x, y, k, n, o = {}) => { for (let i = 0; i < n; i++) tooth(S, x + (i - (n - 1) / 2) * 230 * k, y + (o.off === i ? -40 * k : 0), k, Object.assign({}, (o.each || (() => ({})))(i))); };
const card = (S, txt, o = {}) => { S.bg(o.bg || "black"); S.label(txt, 960, o.y || 600, { size: o.size || 170, c: o.c || "#ffffff" }); };

// L23 The first treatment we can see is surprisingly human.
shot(23, 0, (S) => { S.bg("kraft"); cave(S, 960, FLOOR, { s: 1.7, mood: "smile" }); S.label("SURPRISINGLY HUMAN", 960, 150); });
// L24 130,000 years ago, a Neanderthal in Croatia… tooth pushed out of place
shot(24, 0, (S) => { S.bg("navy", { hy: 760 }); S.flame(1300, 860, 1.2, S.start, Q); cave(S, 760, 860, { s: 1.5, mood: "flat", hair: "spiky", hairC: "#4a3018", look: 4 }); S.label("130,000 YEARS AGO", 960, 160, { c: C.yel }); });
shot(24, 8, (S) => { S.bg("kraft"); const F = cave(S, 700, FLOOR, { s: 1.7, mood: "worried", hair: "spiky", hairC: "#4a3018", look: 4, bandage: true }); S.label("NEANDERTHAL", 700, 140); land(S, 1380, 520, 420, 300, "#a8c97f"); pin(S, 1380, 540, 1.2); S.label("CROATIA", 1380, 760, { size: 64 }); });
shot(24, 12, (S) => { S.bg("white", { floor: false }); teethRow(S, 960, 600, 0.95, 5, { off: 3, each: (i) => (i === 3 ? { pain: true } : {}) }); S.label("PUSHED OUT OF PLACE", 960, 170, { c: C.red, to: [1400, 380] }); });
// L25 what you do with your tongue every time something feels wrong
shot(25, 0, (S) => { S.bg("roomNight", { window: false }); const F = you(S, 960, 790, { s: 1.5, mood: "worried", look: 6 }); fl(S, closed(F.hd[0] + F.r * 0.3, F.hd[1] + F.r * 0.62, 1, [[-14, 0], [14, 0], [16, 20], [0, 30], [-16, 20]]), "#e8667a", { w: 4 }); S.label("YOU DO THIS TOO", 960, 150, { c: "#ffffff" }); });
// L26 They poked at it.
shot(26, 0, (S) => { S.bg("kraft"); const F = cave(S, 900, FLOOR, { s: 1.8, mood: "worried", hair: "spiky", hairC: "#4a3018", pose: "think", look: 3 }); stick(S, F.hand("R", "think")[0], F.hand("R", "think")[1] + 10, F.hd[0] + F.r * 0.3, F.hd[1] + F.r * 0.55); S.label("POKE.", 1450, 400, { size: 130, c: C.red }); });
// L27 Over and over, stick or grass… until it left grooves
shot(27, 0, (S) => { S.bg("kraft", { floor: false }); stick(S, 520, 760, 820, 300); [0, 1, 2].forEach((i) => dr(S, smooth([[1250 + i * 60, 820], [1230 + i * 70, 560], [1290 + i * 50, 300]]), { w: 9, c: "#5f9e3a" })); S.label("STICK", 640, 900); S.label("GRASS", 1320, 900); S.label("OVER AND OVER", 960, 150, { c: C.red }); });
shot(27, 11, (S) => { S.bg("kraft", { floor: false }); tooth(S, 860, 540, 2.4, { grooves: true }); S.magnifier(1280, 640, 150, S.start, Q); S.label("GROOVES", 1350, 250, { c: C.red, to: [1050, 620] }); });
// L28 The first dental patient was also the first dentist. [S]
shot(28, 0, (S) => { S.bg("white"); cave(S, 480, FLOOR, { s: 1.5, mood: "cry", hair: "spiky", hairC: "#4a3018", bandage: true }); S.label("PATIENT", 480, 170); S.divider(960, S.start); const F = cave(S, 1440, FLOOR, { s: 1.5, mood: "determined", hair: "spiky", hairC: "#4a3018", pose: "point", look: -2, bandage: true }); stick(S, F.hand("R", "point")[0] - 10, F.hand("R", "point")[1], F.hand("R", "point")[0] + 70, F.hand("R", "point")[1] - 40); S.label("DENTIST", 1440, 170, { c: C.red }); });
// L29 Then, 14,000 years ago, came the young man in the Alps.
shot(29, 0, (S) => { alps(S); cave(S, 1450, 900, { s: 1.4, mood: "worried", bandage: true, look: -3 }); S.label("14,000 YEARS AGO", 900, 160, { c: C.red }); });
// L30 molar rotting / tiny sharp flint / scraped the decay out
shot(30, 0, (S) => { S.bg("white", { floor: false }); tooth(S, 960, 540, 2.6, { rot: true, cavity: true, face: "sad" }); S.label("ROTTING", 960, 140, { c: C.rot }); });
shot(30, 9, (S) => { S.bg("white", { floor: false }); flint(S, 960, 520, 3.4); S.label("SHARP FLINT", 960, 140); });
shot(30, 12, (S) => { S.bg("white", { floor: false }); tooth(S, 820, 560, 2.4, { cavity: true, face: "pain", pain: true }); flint(S, 1260, 420, 1.4); [0, 1, 2].forEach((i) => dr(S, line([1150 - i * 20, 300 + i * 40], [1210 - i * 20, 260 + i * 40], 1), { w: 5, c: INK })); S.label("SCRAPE", 1400, 820, { c: C.red }); });
// L31 Scratch by scratch.
shot(31, 0, (S) => { S.bg("white", { floor: false }); tooth(S, 960, 560, 3, { cavity: true }); for (let i = 0; i < 6; i++) dr(S, line([780 + i * 30, 340 + (i % 2) * 20], [840 + i * 30, 300 + (i % 2) * 20], 1), { w: 5, c: C.red }); S.label("SCRATCH. SCRATCH.", 960, 140, { c: C.red }); });
// L32 While he was awake.
shot(32, 0, (S) => { S.bg("desert", { hy: 720 }); const F = cave(S, 760, 980, { s: 2.3, mood: "wow", bandage: true }); S.label("AWAKE.", 1400, 460, { c: C.red, size: 150 }); }, { cam: "push" });
// L33 Relaxing. [S]
shot(33, 0, (S) => card(S, "RELAXING.", { bg: "chalk" }));
// L34 It is the oldest dental operation ever found.
shot(34, 0, (S) => { S.bg("kraft"); S.trophy(700, FLOOR - 10, 1.8, S.start, Q); tooth(S, 1260, 520, 1.8, { cavity: true }); S.label("OLDEST OPERATION EVER", 960, 150); });
// L35 A thousand years later, near Lucca in Italy, someone went further.
shot(35, 0, (S) => { S.bg("blueprint", { floor: false }); fl(S, poly([[880, 260], [1010, 300], [1080, 470], [1200, 610], [1300, 700], [1260, 760], [1170, 720], [1100, 820], [1020, 760], [980, 610], [880, 470], [840, 330]], 3), "#c9b27a", { w: 7 }); pin(S, 960, 450, 1.2); S.label("LUCCA", 760, 420, { c: "#ffffff" }); S.label("1,000 YEARS LATER", 960, 150, { c: C.yel }); });
// L36 opened two rotten front teeth… filled the holes
shot(36, 0, (S) => { S.bg("white", { floor: false }); [-1, 1].forEach((sd) => tooth(S, 960 + sd * 170, 520, 1.9, { kind: "incisor", hole: C.rot, pulp: true })); S.label("TO THE NERVE", 960, 140, { c: C.red }); });
shot(36, 12, (S) => { S.bg("white", { floor: false }); [-1, 1].forEach((sd) => tooth(S, 960 + sd * 170, 520, 1.9, { kind: "incisor", hole: "#9aa0a6" })); S.label("FILLED", 960, 140); S.label("?", 1420, 560, { size: 220, c: C.red }); });
// L37–39 With tar. / plant fibres. / what looks like hair.
const fredian = (S, extra) => { S.bg("white", { floor: false }); [-1, 1].forEach((sd) => tooth(S, 960 + sd * 170, 540, 1.9, { kind: "incisor", hole: C.tar })); if (extra >= 1) [0, 1, 2].forEach((i) => dr(S, smooth([[760 + i * 30, 420], [800 + i * 30, 380], [840 + i * 30, 430]]), { w: 4, c: "#6cc04a" })); if (extra >= 2) dr(S, smooth([[1100, 400], [1140, 360], [1170, 410], [1200, 370]]), { w: 3, c: "#5a3a1e" }); };
shot(37, 0, (S) => { fredian(S, 0); S.label("TAR", 960, 140, { size: 130 }); });
shot(38, 0, (S) => { fredian(S, 1); S.label("+ PLANT FIBRES", 960, 140, { c: "#3a8a2a" }); });
shot(39, 0, (S) => { fredian(S, 2); S.label("+ HAIR?", 960, 140, { c: C.red, size: 120 }); });
// L40 Nobody knows why the hair was there.
shot(40, 0, (S) => { S.bg("kraft"); doc(S, 700, FLOOR, { s: 1.6, mood: "worried", pose: "shrug" }); hairBall(S, 1300, 560, 1.6); S.label("WHY?", 1300, 250, { c: C.red, size: 120 }); });
// L41 Honestly, nobody wants to know. [S]
shot(41, 0, (S) => { S.bg("kraft"); doc(S, 760, FLOOR, { s: 1.6, mood: "angry", pose: "push", look: 5 }); hairBall(S, 1400, 560, 1.2); S.label("NOPE.", 1400, 300, { c: C.red, size: 140 }); });
// L42 oldest filling on Earth
shot(42, 0, (S) => { S.bg("kraft"); S.trophy(640, FLOOR - 10, 1.8, S.start, Q); tooth(S, 1240, 520, 1.8, { kind: "incisor", hole: C.tar }); S.label("OLDEST FILLING ON EARTH", 960, 150); });
// L43 9,000 years ago, Pakistan / farmers went full power tool
shot(43, 0, (S) => { S.bg("blueprint", { floor: false }); land(S, 960, 560, 900, 620, "#d4b77a"); pin(S, 1000, 600, 1.6); S.label("PAKISTAN", 1000, 760, { c: "#ffffff", halo: "#111111", haloW: 0.1 }); S.label("9,000 YEARS AGO", 960, 150, { c: C.yel }); });
shot(43, 9, (S) => { S.bg("desert", { hy: 700 }); cave(S, 620, 920, { s: 1.5, mood: "determined", hair: "short", look: 4 }); bowDrill(S, 1250, 600, 1.4); S.bolt(1500, 330, 1.2, S.start, Q, { c: C.yel }); S.label("POWER TOOL", 1100, 150, { c: C.red }); });
// L44 bow drills they used to make beads / drilled into living people's molars
shot(44, 0, (S) => { S.bg("desert", { hy: 700 }); bowDrill(S, 700, 560, 1.3); for (let i = 0; i < 7; i++) fl(S, circ(1150 + i * 80, 600 + Math.sin(i) * 20, 30), ["#e07a3f", "#2f6fd6", "#f2c14e"][i % 3], { w: 5 }); S.label("BEADS", 1390, 450); });
shot(44, 10, (S) => { S.bg("white", { floor: false }); tooth(S, 960, 620, 1.8, { face: "pain", pain: true }); bowDrill(S, 960, 200, 1); S.label("LIVING PEOPLE", 960, 1000, { c: C.red, size: 72 }); });
// L45 we know they were alive / edges kept wearing down from chewing
shot(45, 0, (S) => { S.bg("desert", { hy: 700 }); cave(S, 960, 920, { s: 1.6, mood: "smile", hair: "short" }); S.tick(1300, 360, 3, S.start, Q); S.label("ALIVE", 1300, 220, { c: C.green }); });
shot(45, 6, (S) => { S.bg("white", { floor: false }); tooth(S, 860, 520, 2.1, { hole: "#3a3a3a" }); S.magnifier(1360, 560, 150, S.start, Q); S.label("WORN EDGES", 1360, 260, { c: C.red, to: [960, 420] }); S.label("= STILL CHEWING", 960, 980, { size: 70 }); });
// L46 Eleven drilled teeth, from nine adults.
shot(46, 0, (S) => { S.bg("white", { floor: false }); for (let i = 0; i < 11; i++) { const x = 330 + (i % 6) * 250 + (i >= 6 ? 125 : 0), y = i < 6 ? 470 : 760; fl(S, closed(x, y, 0.6, MOLAR), "#ffffff", { w: 5 }); fl(S, circ(x - 10, y - 20, 10), INK, { w: 2 }); } S.label("11 TEETH. 9 ADULTS.", 960, 160, { c: C.red }); });
// L47 And here's the strange part.
shot(47, 0, (S) => card(S, "THE STRANGE PART", { bg: "chalk", size: 140 }));
// L48 Most of those teeth show no sign of decay.
shot(48, 0, (S) => { S.bg("white", { floor: false }); teethRow(S, 960, 580, 1.3, 4, { each: () => ({ hole: "#3a3a3a" }) }); S.label("NO DECAY", 960, 160, { c: C.green }); });
// L49 So were they treating pain?
shot(49, 0, (S) => { S.bg("white", { floor: false }); tooth(S, 760, 560, 2.2, { pain: true, face: "pain" }); S.label("?", 1300, 660, { size: 360, c: C.red }); S.label("TREATING PAIN?", 960, 150); });
// L50 Testing a new hobby? [S]
shot(50, 0, (S) => { S.bg("desert", { hy: 700 }); const F = cave(S, 720, 920, { s: 1.6, mood: "happy", hair: "short", look: 4 }); bowDrill(S, 1240, 560, 1.2); S.label("NEW HOBBY?", 1100, 150, { c: C.red }); });
// L51 Nobody knows.
shot(51, 0, (S) => { S.bg("kraft"); doc(S, 960, FLOOR, { s: 1.6, mood: "flat", pose: "shrug" }); S.label("NOBODY KNOWS", 960, 140); });
// L52 the drill is still the scariest sound in the building [S]
shot(52, 0, (S) => { S.bg("room", { window: false }); const F = you(S, 760, 790, { s: 1.6, mood: "wow", look: 5 }); S.speech(1350, 380, 260, 130, 1180, 520, S.start, Q); S.label("BZZZZZ", 1350, 405, { c: C.red, size: 90 }); S.label("STILL SCARY", 960, 140); });
// L53 Slovenia, 6,500 years ago / cracked tooth with beeswax
shot(53, 0, (S) => { S.bg("blueprint", { floor: false }); land(S, 960, 560, 700, 480, "#a8c97f"); pin(S, 960, 600, 1.6); S.label("SLOVENIA", 960, 760, { c: "#ffffff", halo: "#111111", haloW: 0.1 }); S.label("6,500 YEARS AGO", 960, 150, { c: C.yel }); });
shot(53, 11, (S) => { S.bg("white", { floor: false }); tooth(S, 860, 560, 2.4, { kind: "incisor", crack: true }); fl(S, closed(860, 560, 2.4, [[2, -96], [16, -60], [14, -20], [0, 22], [-8, -20], [-10, -60]]), C.wax, { w: 3 }); jar(S, 1400, 600, 1.3, C.wax, "WAX"); S.label("BEESWAX", 960, 140, { c: "#c98d00" }); });
// L54 So the tools were there.
shot(54, 0, (S) => { S.bg("kraft", { floor: false }); flint(S, 520, 560, 2); bowDrill(S, 960, 600, 1); jar(S, 1400, 600, 1.1, C.wax); [520, 960, 1400].forEach((x) => S.tick(x, 860, 1.6, S.start, Q)); S.label("TOOLS", 960, 150); });
// L55 What was missing was an explanation.
shot(55, 0, (S) => { S.bg("chalk", { floor: false }); tooth(S, 760, 560, 2.2, { cavity: true }); S.label("?", 1300, 660, { size: 380, c: "#ffffff" }); S.label("BUT WHY?", 960, 150, { c: C.yel }); });
