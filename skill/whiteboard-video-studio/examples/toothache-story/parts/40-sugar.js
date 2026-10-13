// ===== SUGAR ERA + TWIST + RELIEF + ENDING (lines 96–140) =====
const queen = (S, x, gy, o = {}) => person(S, x, gy, Object.assign({ hair: "bun", hairC: "#c0392b", outfit: "tee", outfitC: "#7b2d8b", crown: true }, o));
const washington = (S, x, gy, o = {}) => person(S, x, gy, Object.assign({ hair: "side", hairC: "#eeeeee", outfit: "tee", outfitC: "#1f3a68" }, o));
const wells = (S, x, gy, o = {}) => person(S, x, gy, Object.assign({ hair: "side", hairC: "#3b2a20", outfit: "tee", outfitC: "#2b2b2b" }, o));
const bundle = (S, x, y, s = 1) => { fl(S, closed(x, y, s, [[-90, -20], [-60, -70], [60, -70], [100, -10], [70, 60], [-70, 60]]), "#9ad4f5", { w: 6 }); fl(S, circ(x - 40 * s, y - 55 * s, 42 * s), PAPER, { w: 6 }); [-1, 1].forEach((sd) => fl(S, circ(x - 40 * s + sd * 14 * s, y - 58 * s, 4 * s), INK, { w: 1 })); };
const globe = (S, x, y, r) => { fl(S, circ(x, y, r), "#4a9fe0", { w: 8 }); fl(S, closed(x - r * 0.3, y - r * 0.2, r / 100, [[-40, -50], [30, -60], [50, 0], [10, 50], [-40, 30]]), C.grass, { w: 5 }); fl(S, closed(x + r * 0.4, y + r * 0.3, r / 100, [[-30, -30], [30, -40], [40, 20], [-20, 40]]), C.grass, { w: 5 }); };
const gift = (S, x, y, s = 1) => { fl(S, rect(x - 140 * s, y - 100 * s, 280 * s, 200 * s), C.red, { w: 7 }); fl(S, rect(x - 20 * s, y - 100 * s, 40 * s, 200 * s), C.gold, { w: 4 }); fl(S, rect(x - 160 * s, y - 140 * s, 320 * s, 50 * s), C.red, { w: 7 }); };
const rotGrid = (S, nRot, total, cols, label, c = C.red) => { S.bg("kraft", { floor: false }); nums(S, 960, 600, nRot, cols, C.rot, total, 0.75); S.label(label, 960, 170, { c }); };

// L96 couldn't stop eating it
shot(96, 0, (S) => { S.bg("white"); queen(S, 700, FLOOR, { s: 1.6, mood: "happy", look: 5, crown: false, hair: "curly", hairC: "#6b4423", outfitC: "#c27ba0" }); sugar(S, 1300, 760, 1.3); S.label("COULDN'T STOP", 960, 150, { c: C.red }); });
// L97 1598, a visitor / Queen Elizabeth I's teeth as black / blamed the English love of sugar
shot(97, 0, (S) => { S.bg("white"); person(S, 760, FLOOR, { s: 1.6, hair: "short", outfit: "tee", outfitC: "#5f7f3a", mood: "flat", pose: "hold", look: 4 }); S.label("1598", 1300, 420, { c: C.red, size: 170 }); S.label("A VISITOR WROTE:", 960, 150); });
shot(97, 6, (S) => { S.bg("white"); const F = queen(S, 960, FLOOR, { s: 2, mood: "happy" }); fl(S, rect(F.hd[0] - F.r * 0.22, F.hd[1] + F.r * 0.36, F.r * 0.44, F.r * 0.16), "#1a1a1a", { w: 2 }); S.label("BLACK TEETH", 1500, 300, { c: C.red, to: [F.hd[0] + 40, F.hd[1] + F.r * 0.45] }); S.label("ELIZABETH I", 420, 300); });
shot(97, 13, (S) => { S.bg("white", { floor: false }); sugar(S, 700, 760, 1.6); S.heart(1300, 520, 4, S.start, Q); S.label("ENGLAND LOVES SUGAR", 960, 160, { c: C.red }); });
// L98 Even the rich and powerful lost their teeth.
shot(98, 0, (S) => { S.bg("white"); queen(S, 700, FLOOR, { s: 1.6, mood: "sad" }); [0, 1, 2].forEach((i) => tooth(S, 1150 + i * 170, 650 + i * 60, 0.6, { rot: true })); S.label("EVEN THE RICH", 960, 150); });
// L99 Washington lost his first tooth at 24
shot(99, 0, (S) => { S.bg("white"); washington(S, 760, FLOOR, { s: 1.7, mood: "worried", look: 4 }); tooth(S, 1300, 640, 0.9); S.label("AGE 24", 1300, 380, { c: C.red, size: 120 }); S.label("GEORGE WASHINGTON", 960, 150); });
// L100 became president / exactly one of his own left
shot(100, 0, (S) => { S.bg("white"); washington(S, 960, FLOOR, { s: 1.6, mood: "determined", pose: "hips" }); S.label("PRESIDENT", 960, 150); });
shot(100, 6, (S) => { S.bg("white", { floor: false }); fl(S, closed(960, 600, 2.4, [[-170, 0], [-130, -70], [0, -95], [130, -70], [170, 0], [120, 25], [0, 10], [-120, 25]]), C.gum, { w: 7 }); tooth(S, 1160, 560, 0.7); S.label("TEETH LEFT: 1", 960, 170, { c: C.red }); });
// L101 One. [S]
shot(101, 0, (S) => card(S, "ONE.", { size: 260, c: C.red }));
// L102 not made of wood
shot(102, 0, (S) => { S.bg("white", { floor: false }); dentures(S, 960, 600, 2.2); S.label("WOOD?", 960, 170); S.label("NO.", 1500, 500, { c: C.red, size: 140 }); });
// L103 ivory, metal, animal teeth, human teeth / bought from enslaved people
shot(103, 0, (S) => { S.bg("white", { floor: false }); dentures(S, 960, 560, 2.2, { mixed: true }); S.label("IVORY. METAL.", 960, 820, { size: 80 }); S.label("ANIMAL + HUMAN TEETH", 960, 960, { size: 72 }); S.label("WHAT WAS IN THEM", 960, 170); });
shot(103, 11, (S) => { S.bg("black"); papyrus(S, 960, 600, 760, 420, 4); S.label("BOUGHT FROM ENSLAVED PEOPLE", 960, 170, { c: "#ffffff", size: 76 }); S.label("1784 LEDGER", 960, 920, { c: "#bbbbbb", size: 60 }); });
// L104 Waterloo / scavengers pulled teeth from the dead / dentists sold them as dentures
shot(104, 0, (S) => { S.bg("dusk", { hy: 700 }); for (let i = 0; i < 6; i++) fl(S, closed(300 + i * 270, 820 + (i % 2) * 40, 1, [[-50, 0], [-40, -40], [0, -55], [40, -40], [50, 0]]), "#555b63", { w: 5 }); S.label("WATERLOO, 1815", 960, 150); });
shot(104, 5, (S) => { S.bg("dusk", { hy: 700 }); const F = person(S, 800, 930, { s: 1.5, hair: "messy", hairC: "#3b2a20", outfit: "hoodie", outfitC: "#5a4a3a", mood: "flat", pose: "reach", look: 4 }); pliers(S, F.hand("R", "reach")[0] + 40, F.hand("R", "reach")[1] - 40, 0.6, 40); fl(S, closed(1350, 800, 1.4, [[-80, 60], [-90, -40], [0, -70], [90, -40], [80, 60]]), "#a0703c", { w: 6 }); S.label("SCAVENGERS", 960, 150, { c: C.red }); });
shot(104, 12, (S) => { S.bg("room", { window: false }); dentures(S, 960, 560, 1.8); S.tag(1400, 300, "FOR SALE", S.start, Q, { size: 56 }); S.label("SOLD AS DENTURES", 960, 150); });
// L105 Waterloo teeth
shot(105, 0, (S) => { S.bg("chalk", { floor: false }); dentures(S, 960, 620, 2); S.label("WATERLOO TEETH", 960, 200, { c: C.yel, size: 110 }); });
// L106 the famous claim / 1600s London, "teeth" a top cause of death
shot(106, 0, (S) => { S.bg("roomNight", { window: false }); you(S, 760, 790, { s: 1.6, mood: "wow", pose: "hold", look: 4 }); S.phone(1250, 500, 1.6, S.start, Q, { screen: "feed" }); S.label("FAMOUS CLAIM", 960, 150, { c: "#ffffff" }); });
shot(106, 9, (S) => { S.bg("kraft", { floor: false }); papyrus(S, 960, 600, 760, 560, 0); ["FEVER", "PLAGUE", "TEETH", "OLD AGE"].forEach((t, i) => S.label(t, 960, 430 + i * 105, { size: 64, c: t === "TEETH" ? C.red : INK })); S.label("LONDON, 1600s", 960, 150); });
// L107 on the old death records
shot(107, 0, (S) => { S.bg("kraft", { floor: false }); papyrus(S, 960, 600, 760, 560, 0); ["FEVER", "PLAGUE", "TEETH", "OLD AGE"].forEach((t, i) => S.label(t, 960, 430 + i * 105, { size: 64, c: t === "TEETH" ? C.red : INK })); S.ring(960, 620, 190, 60, S.start, Q); S.label("DEATH RECORDS", 960, 150); });
// L108 the man who studied those records / grouped "teeth" with children under two or three
shot(108, 0, (S) => { S.bg("white"); wigDoc(S, 640, FLOOR, { s: 1.6, mood: "worried", look: 5, glasses: true }); papyrus(S, 1300, 540, 520, 440, 5); S.magnifier(1220, 500, 90, S.start, Q); S.label("BUT WAIT", 960, 150); });
shot(108, 7, (S) => { S.bg("white", { floor: false }); S.label("\"TEETH\"", 620, 560, { size: 110, c: C.red }); S.label("=", 960, 570, { size: 160 }); bundle(S, 1320, 600, 1.8); S.label("UNDER 2 OR 3", 1320, 860, { size: 70 }); });
// L109 not adults
shot(109, 0, (S) => { S.bg("white"); you(S, 960, FLOOR, { s: 1.7, mood: "flat" }); S.cross(960, 500, 4, S.start, Q); S.label("NOT ADULTS", 960, 150); });
// L110 mostly babies / fevers and infections doctors didn't understand
shot(110, 0, (S) => { S.bg("navy", { hy: 800, moon: true }); bundle(S, 960, 600, 2.2); S.label("MOSTLY BABIES", 960, 170, { c: "#ffffff" }); });
shot(110, 11, (S) => { S.bg("navy", { hy: 800 }); doc(S, 960, 920, { s: 1.6, mood: "worried", pose: "shrug" }); S.label("FEVERS. INFECTIONS.", 960, 170, { c: "#ffffff" }); S.label("?", 1400, 560, { size: 260, c: C.yel }); });
// L111 true on paper, wrong in real life
shot(111, 0, (S) => { S.bg("white", { floor: false }); papyrus(S, 520, 560, 420, 340, 4); S.tick(520, 830, 2, S.start, Q); S.label("ON PAPER", 520, 240); S.divider(960, S.start); S.label("REAL LIFE", 1440, 240); S.cross(1440, 560, 2.4, S.start, Q); });
// L112 the part almost nobody talks about
shot(112, 0, (S) => card(S, "THE PART NOBODY TALKS ABOUT", { bg: "chalk", size: 100 }));
// L113 we imagine ancient humans had terrible teeth / modern dentistry rescued us
shot(113, 0, (S) => { S.bg("kraft"); const F = cave(S, 760, FLOOR, { s: 1.8, mood: "happy" }); fl(S, rect(F.hd[0] - F.r * 0.2, F.hd[1] + F.r * 0.36, F.r * 0.4, F.r * 0.14), C.rot, { w: 2 }); S.thought(1350, 330, 260, 130, 1050, 500, S.start, Q); S.label("TERRIBLE TEETH?", 1350, 350, { size: 56 }); });
shot(113, 10, (S) => { S.bg("white"); doc(S, 800, FLOOR, { s: 1.9, mood: "happy", pose: "armsUp" }); S.label("OUR HERO?", 1420, 420, { c: C.red, size: 110 }); });
// L114 The bones say something different.
shot(114, 0, (S) => { S.bg("kraft"); skull(S, 960, 600, 2, { bad: [] }); S.label("THE BONES DISAGREE", 960, 150, { c: C.red }); });
// L115 hunter-gatherers: cavities in only a small fraction
shot(115, 0, (S) => { rotGrid(S, 1, 15, 5, "HUNTER-GATHERERS: FEW CAVITIES", C.green); });
// L116 Morocco, 15,000 years ago / huge amounts of starchy acorns
shot(116, 0, (S) => { S.bg("blueprint", { floor: false }); land(S, 960, 600, 820, 560, "#d9b26a"); pin(S, 960, 640, 1.6); S.label("MOROCCO", 960, 780, { c: "#ffffff", halo: "#111111", haloW: 0.1 }); S.label("15,000 YEARS AGO", 960, 150, { c: C.yel }); });
shot(116, 10, (S) => { S.bg("desert", { hy: 720 }); cave(S, 620, 930, { s: 1.6, mood: "happy", look: 4 }); [[1150, 820], [1280, 820], [1410, 820], [1215, 720], [1345, 720], [1280, 620]].forEach(([x, y]) => acorn(S, x, y, 1)); S.label("ACORNS. LOTS.", 1100, 150, { c: C.red }); });
// L117 Half their teeth were rotten.
shot(117, 0, (S) => { rotGrid(S, 8, 16, 8, "HALF ROTTEN"); });
// L118 farming arrived, grain and starch took over
shot(118, 0, (S) => { S.bg("day", { hy: 620, clouds: 1 }); for (let i = 0; i < 9; i++) wheat(S, 300 + i * 170, 980, 1.3); cave(S, 1700, 930, { s: 1.3, mood: "smile", look: -3 }); S.label("FARMING", 960, 150); });
// L119 DNA in ancient tooth plaque / main cavity bacterium / exploded ~10,000 years ago
shot(119, 0, (S) => { S.bg("blueprint", { floor: false }); tooth(S, 760, 560, 2, { rot: true }); S.magnifier(1180, 500, 130, S.start, Q); S.label("ANCIENT PLAQUE DNA", 960, 150, { c: "#ffffff" }); });
shot(119, 10, (S) => { S.bg("blueprint", { floor: false }); bact(S, 960, 560, 3); S.label("THE CAVITY BACTERIUM", 960, 150, { c: C.yel }); });
shot(119, 14, (S) => { S.bg("white", { floor: false }); graph(S, 400, 300, 1100, 520, [[0, 0.05], [0.45, 0.08], [0.55, 0.35], [0.7, 0.55], [1, 0.62]], { dot: 2 }); S.label("10,000 YEARS AGO", 1000, 250, { c: C.red, size: 70 }); S.label("EXPLODED", 960, 960); });
// L120 boomed again: cheap sugar and white flour
shot(120, 0, (S) => { S.bg("white", { floor: false }); graph(S, 400, 300, 1100, 520, [[0, 0.05], [0.45, 0.08], [0.55, 0.35], [0.7, 0.55], [0.88, 0.6], [1, 1]], { dot: 5 }); sugar(S, 1620, 900, 0.7); S.label("BOOM AGAIN: SUGAR", 960, 960, { c: C.red }); });
// L121 The worm was never real.
shot(121, 0, (S) => { S.bg("chalk", { floor: false }); worm(S, 900, 560, 2.2); S.cross(960, 540, 5, S.start, Q); S.label("NEVER REAL", 960, 170, { c: "#ffffff" }); });
// L122 But the monster was.
shot(122, 0, (S) => { S.bg("black"); bact(S, 960, 600, 4.2, { c: "#5fae5a" }); S.label("THE MONSTER WAS.", 960, 160, { c: C.red }); }, { cam: "push" });
// L123 And we fed it.
shot(123, 0, (S) => { S.bg("black"); you(S, 600, 930, { s: 1.6, mood: "flat", pose: "reach", look: 5 }); bact(S, 1350, 560, 2.6); fl(S, rect(1000, 470, 70, 70), "#ffffff", { w: 5 }); S.label("WE FED IT.", 960, 160, { c: C.red, size: 120 }); });
// L124 The good news also came from a toothache.
shot(124, 0, (S) => { S.bg("white", { floor: false }); tooth(S, 960, 580, 2.4, { face: "happy" }); S.label("THE GOOD NEWS", 960, 150, { c: C.green }); });
// L125 1844, Horace Wells / a stage show, laughing gas / felt nothing
shot(125, 0, (S) => { S.bg("white"); wells(S, 760, FLOOR, { s: 1.7, mood: "flat", look: 4 }); S.label("1844", 1300, 400, { c: C.red, size: 170 }); S.label("HORACE WELLS, DENTIST", 960, 150); });
shot(125, 8, (S) => { S.bg("roomNight", { window: false }); S.spotlight(960, 0, 790, 560, S.start, Q); const F = person(S, 960, 790, { s: 1.6, hair: "curly", outfit: "tee", outfitC: "#c0392b", mood: "happy" }); gasBag(S, 1350, 420, 0.9); S.label("LAUGHING GAS", 960, 150, { c: C.yel }); });
shot(125, 17, (S) => { S.bg("roomNight", { window: false }); const F = person(S, 960, 790, { s: 1.6, hair: "curly", outfit: "tee", outfitC: "#c0392b", mood: "happy", pose: "armsUp" }); S.label("FELT NOTHING", 960, 150, { c: C.yel }); });
// L126 he breathed it himself / let a colleague pull out his own tooth
shot(126, 0, (S) => { S.bg("room", { window: false }); wells(S, 760, 790, { s: 1.7, mood: "determined", pose: "hold", look: 4 }); gasBag(S, 1150, 380, 0.8); S.label("THE NEXT DAY", 960, 150); });
shot(126, 7, (S) => { S.bg("room", { window: false }); wells(S, 700, 790, { s: 1.6, mood: "sleep", look: 4 }); const F = person(S, 1220, 790, { s: 1.6, hair: "short", outfit: "apron", outfitC: "#ffffff", mood: "determined", pose: "reachL", look: -4 }); pliers(S, 980, 380, 0.7, -80); S.label("HIS OWN TOOTH", 960, 150, { c: C.red }); });
// L127 He felt no pain.
shot(127, 0, (S) => { S.bg("room", { window: false }); wells(S, 760, 790, { s: 1.8, mood: "happy", pose: "armsUp" }); S.tick(1380, 520, 3, S.start, Q); S.label("NO PAIN", 1380, 300, { c: C.green, size: 110 }); });
// L128 prove it in front of students at Harvard
shot(128, 0, (S) => { S.bg("room", { window: false }); wells(S, 960, 700, { s: 1.4, mood: "smile", pose: "wave" }); for (let i = 0; i < 9; i++) mini(S, 260 + i * 175, 1000, 1.4); S.label("HARVARD", 960, 150); });
// L129 The patient cried out.
shot(129, 0, (S) => { S.bg("room", { window: false }); you(S, 960, 790, { s: 1.9, mood: "cry", bandage: true, hair: "side" }); S.label("OWWW!", 1450, 320, { c: C.red, size: 140 }); });
// L130 The audience laughed and called him a fraud.
shot(130, 0, (S) => { S.bg("room", { window: false }); wells(S, 960, 700, { s: 1.4, mood: "sad" }); for (let i = 0; i < 9; i++) mini(S, 260 + i * 175, 1000, 1.4); S.label("FRAUD!", 500, 300, { c: C.red, size: 120 }); S.label("HA HA!", 1450, 300, { c: C.red, size: 100 }); });
// L131 1846, his former student used ether / Boston hospital, audience of surgeons
shot(131, 0, (S) => { S.bg("white"); person(S, 760, FLOOR, { s: 1.7, hair: "short", hairC: "#3b2a20", outfit: "tee", outfitC: "#2b2b2b", mood: "determined", look: 4 }); jar(S, 1320, 600, 1.5, "#cfe8f5", "ETHER"); S.label("1846", 960, 150, { c: C.red, size: 130 }); });
shot(131, 14, (S) => { S.bg("room", { window: false }); fl(S, rrect(760, 620, 400, 80, 20), "#ffffff", { w: 6 }); for (let r = 0; r < 2; r++) for (let i = 0; i < 8; i++) mini(S, 300 + i * 190 + r * 90, 420 + r * 520 * 0 + r * 120, 1.1); S.label("BOSTON. SURGEONS WATCHING.", 960, 150, { size: 72 }); });
// L132 one of the greatest gifts in medicine, first shown by dentists
shot(132, 0, (S) => { S.bg("white", { floor: false }); gift(S, 960, 600, 1.8); S.label("PAIN-FREE SURGERY", 960, 170, { c: C.green }); });
// L133 Dentists. Of all people. [S]
shot(133, 0, (S) => { S.bg("white"); doc(S, 960, FLOOR, { s: 1.6, mood: "happy", pose: "hips" }); S.label("DENTISTS.", 960, 140, { size: 130 }); S.label("OF ALL PEOPLE.", 960, 960, { c: C.red, size: 70 }); });
// L134 untreated tooth decay, most common condition on the planet
shot(134, 0, (S) => { S.bg("space"); globe(S, 960, 600, 300); tooth(S, 1180, 430, 0.8, { rot: true, cavity: true }); S.label("#1 ON THE PLANET", 960, 160, { c: C.yel }); });
// L135 about two and a half billion people
shot(135, 0, (S) => { S.bg("white", { floor: false }); for (let i = 0; i < 40; i++) mini(S, 300 + (i % 10) * 145, 380 + Math.floor(i / 10) * 170, 0.9, i % 3 ? PAPER : "#d8c48f"); S.label("2.5 BILLION", 960, 160, { c: C.red, size: 120 }); });
// L136 So tonight… take the painkiller.
shot(136, 0, (S) => { S.bg("roomNight", { window: [1300, 170, 360, 300] }); you(S, 700, 790, { s: 1.6, mood: "worried", bandage: true, look: 5 }); pill(S, 1240, 620, 1.6); S.label("TONIGHT", 960, 150, { c: "#ffffff" }); });
// L137 Book the dentist.
shot(137, 0, (S) => { S.bg("white"); you(S, 640, FLOOR, { s: 1.6, mood: "smile", pose: "hold", look: 4 }); S.calendar(1050, 330, 4, 3, 110, 90, S.start, Q); S.tick(1270, 560, 1.4, S.start, Q); S.label("BOOK IT", 960, 150); });
// L138 remember the young man in the Alps / holding still while someone scraped his tooth with a rock
shot(138, 0, (S) => { alps(S); cave(S, 1450, 900, { s: 1.4, mood: "worried", bandage: true, look: -3 }); });
shot(138, 8, (S) => { S.bg("desert", { hy: 720 }); cave(S, 760, 980, { s: 2.2, mood: "wow", bandage: true, look: 4 }); rock(S, 1320, 520, 1.6); S.label("HOLD STILL.", 960, 140, { c: C.red }); }, { cam: "push" });
// L139 We beat the worm.
shot(139, 0, (S) => { S.bg("white", { floor: false }); worm(S, 900, 600, 1.8); S.cross(960, 580, 4, S.start, Q); S.label("WE BEAT THE WORM.", 960, 170); });
// L140 We never beat the sugar.
shot(140, 0, (S) => { S.bg("black"); sugar(S, 960, 860, 2.2); S.label("WE NEVER BEAT THE SUGAR.", 960, 220, { c: C.red, size: 100 }); }, { cam: "push" });
