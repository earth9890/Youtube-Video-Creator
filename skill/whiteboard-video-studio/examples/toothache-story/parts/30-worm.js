// ===== THE WORM + ANCIENT REMEDIES + FAUCHARD (lines 56–95) =====
const pyramid = (S, x, y, w) => { fl(S, poly([[x - w / 2, y], [x, y - w * 0.62], [x + w / 2, y], [x - w / 2, y]], 2), "#e0c27a", { w: 7 }); dr(S, line([x, y - w * 0.62], [x + w * 0.12, y], 1), { w: 4 }); };
const peg = (S, x, y, s = 1) => fl(S, closed(x, y, s, [[-18, -120], [18, -120], [16, 60], [0, 110], [-16, 60]]), C.wood, { w: 6 });
const mud = (S, x, y, s = 1) => fl(S, closed(x, y, s, [[-200, 30], [-160, -40], [-60, -60], [40, -50], [150, -60], [210, 10], [140, 60], [-120, 60]]), "#7a5230", { w: 7 });
const egyptian = (S, x, gy, o = {}) => person(S, x, gy, Object.assign({ hair: "short", hairC: "#111111", outfit: "apron", outfitC: "#f4ecd8" }, o));
const roman = (S, x, gy, o = {}) => person(S, x, gy, Object.assign({ hair: "curly", hairC: "#3a2a1a", outfit: "tunic", outfitC: "#f4ecd8" }, o));
const tusk = (S, x, y, s = 1) => fl(S, smooth(pts(x, y, s, [[-120, 60], [-40, 0], [60, -60], [130, -150], [100, -60], [20, 30], [-100, 90], [-120, 60]])), "#f6efd9", { w: 6 });
const wigDoc = (S, x, gy, o = {}) => person(S, x, gy, Object.assign({ hair: "curly", hairC: "#eeeeee", outfit: "tee", outfitC: "#5b3a8c" }, o));

// L56 they invent one
shot(56, 0, (S) => { S.bg("kraft"); const F = cave(S, 800, FLOOR, { s: 1.7, mood: "smile", pose: "think", look: 3 }); S.bulb(F.hd[0] + 230, F.hd[1] - 140, 1.3, S.start, Q); S.label("INVENT ONE", 1350, 520, { c: C.red }); });
// L57 Mesopotamia / scribes wrote down a myth
shot(57, 0, (S) => { S.bg("desert", { hy: 720 }); tablet(S, 960, 520, 1.1); S.label("MESOPOTAMIA", 960, 150); });
shot(57, 3, (S) => { S.bg("desert", { hy: 720 }); person(S, 640, 930, { s: 1.5, hair: "curly", hairC: "#1a1a1a", outfit: "tunic", outfitC: "#d9c08a", mood: "determined", pose: "reach", look: 4 }); tablet(S, 1260, 560, 0.9); S.label("A MYTH", 1260, 150, { c: C.red }); });
// L58 heavens / earth / rivers / mud
shot(58, 0, (S) => { S.bg("space"); S.label("THE HEAVENS", 960, 560, { c: "#ffffff", size: 110 }); });
shot(58, 5, (S) => { S.bg("day", { hy: 620 }); S.label("THE EARTH", 960, 300, { size: 110 }); });
shot(58, 7, (S) => { S.bg("day", { hy: 600 }); dr(S, smooth([[-50, 820], [400, 760], [900, 880], [1400, 760], [1970, 840]]), { w: 120, c: "#4a9fe0" }); S.label("THE RIVERS", 960, 300, { size: 110 }); });
shot(58, 9, (S) => { S.bg("kraft", { floor: false }); mud(S, 960, 620, 2.4); S.label("THE MUD", 960, 300, { size: 110 }); });
// L59 And the mud created a worm.
shot(59, 0, (S) => { S.bg("kraft", { floor: false }); mud(S, 900, 760, 2); worm(S, 940, 500, 2.2, { mood: "evil" }); S.label("A WORM.", 960, 160, { c: C.red, size: 120 }); });
// L60 live between the tooth and the gum / drink its blood
shot(60, 0, (S) => { S.bg("white", { floor: false }); tooth(S, 1280, 560, 2.2, { face: "flat" }); worm(S, 560, 600, 1.6); S.speech(620, 280, 300, 110, 600, 460, S.start, Q); S.label("CAN I LIVE HERE?", 620, 300, { size: 54 }); });
shot(60, 11, (S) => { S.bg("white", { floor: false }); tooth(S, 960, 600, 2.4, { face: "pain", pain: true }); worm(S, 820, 330, 1.2, { mood: "evil" }); blood(S, 1120, 300, 0.7); S.label("SLURP", 1450, 300, { c: C.red, size: 110 }); });
// L61 That was the diagnosis. [S]
shot(61, 0, (S) => { S.bg("chalk", { floor: false }); papyrus(S, 960, 560, 900, 560, 0); S.label("DIAGNOSIS:", 960, 470, { size: 90 }); S.label("WORM.", 960, 650, { c: C.red, size: 150 }); });
// L62 the cure was a spell, read aloud / while a peg was driven in
shot(62, 0, (S) => { S.bg("desert", { hy: 720 }); person(S, 700, 930, { s: 1.5, hair: "curly", hairC: "#1a1a1a", outfit: "tunic", outfitC: "#7b2d8b", mood: "determined", pose: "armsUp", look: 4 }); S.speech(1300, 380, 320, 130, 950, 500, S.start, Q); dr(S, smooth([[1150, 390], [1200, 360], [1250, 400], [1300, 360], [1350, 400], [1400, 360], [1450, 390]]), { w: 7, c: "#7b2d8b" }); S.label("A SPELL", 960, 140); });
shot(62, 7, (S) => { S.bg("white", { floor: false }); tooth(S, 760, 600, 2.2, { face: "pain", pain: true }); peg(S, 1300, 560, 2.4); S.label("A PEG", 1300, 170, { c: C.red }); });
// L63 last a few years / L64 It lasted for thousands.
shot(63, 0, (S) => { S.bg("white", { floor: false }); worm(S, 900, 560, 2); S.label("A FEW YEARS?", 960, 170); });
shot(64, 0, (S) => { S.bg("white", { floor: false }); fl(S, rrect(160, 640, 1600, 70, 30), "#2b2b2b", { w: 7 }); worm(S, 300, 560, 1); worm(S, 1000, 560, 1); worm(S, 1650, 560, 1); S.label("THOUSANDS OF YEARS", 960, 220, { c: C.red, size: 100 }); });
// L65 In Egypt / Hesy-Ra… "chief of the dentists"
shot(65, 0, (S) => { S.bg("desert", { hy: 760 }); pyramid(S, 1350, 780, 700); pyramid(S, 820, 780, 420); S.label("EGYPT", 960, 150); });
shot(65, 6, (S) => { S.bg("desert", { hy: 760 }); egyptian(S, 760, 960, { s: 1.7, mood: "determined", look: 4 }); S.tag(1350, 420, "CHIEF OF DENTISTS?", S.start, Q, { size: 56 }); S.label("HESY-RA", 760, 150); });
// L66 Or possibly "chief of the ivory carvers."
shot(66, 0, (S) => { S.bg("desert", { hy: 760 }); egyptian(S, 760, 960, { s: 1.7, mood: "flat", look: 4 }); tusk(S, 1360, 520, 1.8); S.tag(1350, 800, "CHIEF OF IVORY CARVERS?", S.start, Q, { size: 50 }); });
// L67 Historians are still arguing.
shot(67, 0, (S) => { S.bg("kraft"); doc(S, 640, FLOOR, { s: 1.5, mood: "angry", pose: "point", look: 4 }); doc(S, 1280, FLOOR, { s: 1.5, mood: "angry", pose: "pointL", hairC: "#3b2a20", look: -4 }); S.label("DENTIST!", 560, 220, { c: C.red }); S.label("IVORY!", 1360, 220, { c: C.red }); });
// L68 Either way, the man worked with teeth.
shot(68, 0, (S) => { S.bg("white", { floor: false }); tusk(S, 620, 560, 1.6); S.label("=", 960, 590, { size: 160 }); tooth(S, 1320, 540, 1.6); S.label("TEETH. EITHER WAY.", 960, 170); });
// L69 honey / onions / incense
shot(69, 0, (S) => { S.bg("desert", { hy: 800 }); jar(S, 960, 560, 2, "#f2c14e", "HONEY"); S.label("EGYPTIAN MEDICINE", 960, 150); });
shot(69, 4, (S) => { S.bg("desert", { hy: 800 }); onion(S, 960, 560, 2.2); S.label("ONIONS", 960, 150); });
shot(69, 6, (S) => { S.bg("desert", { hy: 800 }); incense(S, 960, 820, 2.4); S.label("INCENSE", 960, 150); });
// L70 Rome, Pliny / frog boiled in vinegar
shot(70, 0, (S) => { S.bg("white"); roman(S, 760, FLOOR, { s: 1.6, mood: "determined", look: 4 }); papyrus(S, 1340, 520, 420, 300, 4); S.label("PLINY. ROME.", 960, 150); });
shot(70, 9, (S) => { S.bg("white", { floor: false }); pot(S, 960, 640, 2); frog(S, 960, 470, 1.1, { sad: true }); S.label("FROG + VINEGAR", 960, 150, { c: C.red }); });
// L71 Or… eating the frog. [S]
shot(71, 0, (S) => { S.bg("room", { window: false }); you(S, 620, 790, { s: 1.6, mood: "angry", look: 6 }); fl(S, smooth(arcPts(1300, 650, 260, 0, 360, 24, 60)) + " Z", "#ffffff", { w: 7 }); frog(S, 1300, 590, 1.2, { sad: true }); S.label("OR... EAT IT", 1100, 150, { c: C.red }); });
// L72 Romans used urine as mouthwash?
shot(72, 0, (S) => { S.bg("white"); roman(S, 700, FLOOR, { s: 1.6, mood: "flat", look: 4 }); jar(S, 1320, 600, 1.6, "#f0e14a", "URINE?"); S.label("MOUTHWASH?", 960, 150); });
// L73 made fun of a foreigner for doing that
shot(73, 0, (S) => { S.bg("white"); roman(S, 640, FLOOR, { s: 1.6, mood: "happy", pose: "point", look: 5 }); person(S, 1340, FLOOR, { s: 1.5, hair: "messy", hairC: "#a0522d", outfit: "tunic", outfitC: "#5f7f3a", mood: "sad", look: -4 }); S.label("HA!", 640, 170, { c: C.red, size: 130 }); S.label("FOREIGNER", 1340, 200); });
// L74 a roast, not a routine [S]
shot(74, 0, (S) => { S.bg("chalk", { floor: false }); S.label("ROAST", 760, 470, { c: "#ffffff", size: 130 }); S.tick(1180, 430, 2.6, S.start, Q); S.label("ROUTINE", 760, 760, { c: "#ffffff", size: 130 }); S.cross(1180, 720, 1.4, S.start, Q); });
// L75 keep their teeth clean
shot(75, 0, (S) => { S.bg("white", { floor: false }); tooth(S, 960, 560, 2.4, { face: "happy" }); S.burst(960, 520, 300, 380, 12, S.start, Q, { c: C.gold }); S.label("CLEAN", 960, 140, { c: C.green }); });
// L76 papyrus 1,700 years old / oldest toothpaste recipe
shot(76, 0, (S) => { S.bg("desert", { hy: 800 }); papyrus(S, 960, 540, 900, 520, 6); S.label("1,700 YEARS OLD", 960, 160, { c: C.red }); });
shot(76, 9, (S) => { S.bg("desert", { hy: 800 }); papyrus(S, 960, 540, 900, 520, 0); S.label("OLDEST", 960, 470, { size: 90 }); S.label("TOOTHPASTE RECIPE", 960, 620, { size: 70, c: C.red }); });
// L77 rock salt / mint / dried iris / 20 grains of pepper
shot(77, 0, (S) => { S.bg("white", { floor: false }); [[-120, 40], [0, -40], [120, 30], [-40, 120], [80, 130]].forEach(([a, b]) => fl(S, poly([[960 + a - 50, 560 + b], [960 + a, 560 + b - 60], [960 + a + 50, 560 + b], [960 + a, 560 + b + 50], [960 + a - 50, 560 + b]], 2), "#f2f2f2", { w: 6 })); S.label("ROCK SALT", 960, 160); });
shot(77, 2, (S) => { S.bg("white", { floor: false }); fl(S, closed(960, 560, 3, [[0, -80], [50, -30], [40, 40], [0, 80], [-40, 40], [-50, -30]]), "#5fbf6a", { w: 7 }); dr(S, line([960, 330], [960, 800], 1), { w: 6, c: "#2f7f3a" }); S.label("MINT", 960, 160); });
shot(77, 3, (S) => { S.bg("white", { floor: false }); [0, 120, 240].forEach((a) => fl(S, closed(960, 520, 1, [[0, 0], [-60, -150], [0, -220], [60, -150]].map(([x, y]) => { const r = (a * Math.PI) / 180; return [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)]; })), "#8e6fd1", { w: 6 })); fl(S, circ(960, 520, 34), C.yel, { w: 5 }); S.label("DRIED IRIS", 960, 160); });
shot(77, 6, (S) => { S.bg("white", { floor: false }); for (let i = 0; i < 20; i++) fl(S, circ(560 + (i % 10) * 90, 480 + Math.floor(i / 10) * 140 + (i % 2) * 20, 26), "#2b2b2b", { w: 3 }); S.label("20 GRAINS OF PEPPER", 960, 170, { c: C.red }); });
// L78 Fresh breath, and a mouth on fire. [S]
shot(78, 0, (S) => { S.bg("white"); const F = you(S, 700, FLOOR, { s: 1.7, mood: "wow", look: 6 }); S.flame(F.hd[0] + 230, F.hd[1] + 120, 1.6, S.start, Q); S.flame(F.hd[0] + 400, F.hd[1] + 110, 1.2, S.start, Q); S.label("MOUTH ON FIRE", 1250, 160, { c: C.red }); });
// L79 Etruscans, tooth bridges out of gold
shot(79, 0, (S) => { S.bg("white", { floor: false }); teethRow(S, 960, 560, 1.1, 3, { each: () => ({ gold: true }) }); S.label("ETRUSCAN GOLD", 960, 160, { c: "#b8860b" }); });
// L80 China, 659 / a medical book / silver, tin and mercury paste
shot(80, 0, (S) => { S.bg("blueprint", { floor: false }); land(S, 960, 600, 1000, 640, "#e3c27a"); pin(S, 1000, 640, 1.6); S.label("CHINA", 1000, 780, { c: "#ffffff", halo: "#111111", haloW: 0.1 }); S.label("659 AD", 960, 150, { c: C.yel }); });
shot(80, 8, (S) => { S.bg("white", { floor: false }); S.book(960, 560, 2.2, S.start, Q); S.label("A MEDICAL BOOK", 960, 160); });
shot(80, 14, (S) => { S.bg("white", { floor: false }); tooth(S, 760, 560, 2.2, { hole: "#c0c6cc" }); S.label("SILVER", 1350, 380, { c: "#7a8088" }); S.label("TIN", 1350, 540, { c: "#7a8088" }); S.label("MERCURY", 1350, 700, { c: "#7a8088" }); });
// L81 a thousand years before Europe
shot(81, 0, (S) => { S.bg("white", { floor: false }); fl(S, rrect(200, 520, 1520, 50, 20), "#2b2b2b", { w: 6 }); pin(S, 380, 515, 1.1); pin(S, 1600, 515, 1.1); S.label("CHINA 659", 380, 700, { size: 64 }); S.label("EUROPE 1800s", 1560, 700, { size: 64 }); S.label("1,000+ YEARS EARLIER", 960, 220, { c: C.red }); });
// L82 But everywhere, the worm survived.
shot(82, 0, (S) => { S.bg("black"); worm(S, 900, 560, 2.6, { mood: "evil" }); S.label("THE WORM SURVIVED", 960, 170, { c: C.red }); });
// L83 Partly because people kept seeing it.
shot(83, 0, (S) => { S.bg("white", { floor: false }); S.eye(700, 540, 3, S.start, Q, { dx: 15 }); worm(S, 1300, 560, 1.3); S.label("PEOPLE SAW IT", 960, 170); });
// L84 burn henbane seeds near a patient's mouth
shot(84, 0, (S) => { S.bg("roomNight", { window: false }); you(S, 620, 790, { s: 1.6, mood: "worried", bandage: true, look: 5, hair: "messy", outfit: "tunic", outfitC: "#8b5a2b" }); S.flame(1250, 760, 1.6, S.start, Q); for (let i = 0; i < 8; i++) fl(S, circ(1150 + (i % 4) * 60, 800 + Math.floor(i / 4) * 30, 12), "#3b2a20", { w: 2 }); S.label("HENBANE SEEDS", 1150, 200, { c: "#ffffff" }); });
// L85 tiny curled shapes that looked exactly like worms
shot(85, 0, (S) => { S.bg("white", { floor: false }); for (let i = 0; i < 6; i++) { const x = 600 + (i % 3) * 300, y = 470 + Math.floor(i / 3) * 240; dr(S, smooth([[x - 60, y], [x - 30, y - 30], [x, y], [x + 30, y + 30], [x + 60, y]]), { w: 14, c: "#c9a37a" }); } S.label("LOOK LIKE WORMS", 960, 170, { c: C.red }); });
// L86 string in a bowl of water / and pointed
shot(86, 0, (S) => { S.bg("white", { floor: false }); fl(S, smooth(arcPts(960, 560, 360, 0, 180, 18, 220)) + " Z", "#9ad4f5", { w: 8 }); for (let i = 0; i < 4; i++) dr(S, smooth([[820 + i * 80, 600], [850 + i * 80, 640], [880 + i * 80, 600], [900 + i * 80, 650]]), { w: 5, c: "#f2f2f2" }); S.label("STRING", 960, 250); });
shot(86, 11, (S) => { S.bg("room", { window: false }); person(S, 620, 790, { s: 1.6, hair: "side", hairC: "#3b2a20", outfit: "apron", outfitC: "#6d4c2f", mood: "smile", pose: "point", look: 5 }); fl(S, smooth(arcPts(1300, 640, 240, 0, 180, 18, 140)) + " Z", "#9ad4f5", { w: 7 }); });
// L87 There it is. Your worm. / That'll be one coin. [S]
shot(87, 0, (S) => { S.bg("room", { window: false }); person(S, 620, 790, { s: 1.6, hair: "side", hairC: "#3b2a20", outfit: "apron", outfitC: "#6d4c2f", mood: "happy", pose: "point", look: 5 }); fl(S, smooth(arcPts(1300, 640, 240, 0, 180, 18, 140)) + " Z", "#9ad4f5", { w: 7 }); dr(S, smooth([[1220, 680], [1260, 650], [1300, 690], [1340, 650]]), { w: 6, c: "#f2f2f2" }); S.label("YOUR WORM.", 1250, 220, { c: C.red }); });
shot(87, 5, (S) => { S.bg("room", { window: false }); person(S, 760, 790, { s: 1.6, hair: "side", hairC: "#3b2a20", outfit: "apron", outfitC: "#6d4c2f", mood: "happy", pose: "reach", look: 5 }); coin(S, 1350, 520, 2); S.label("THAT'LL BE ONE COIN", 960, 160); });
// L88 patron saint / pulled by barbers, in the street, as a show
shot(88, 0, (S) => { S.bg("white"); const F = person(S, 820, FLOOR, { s: 1.7, hair: "bun", hairC: "#6b4423", outfit: "apron", outfitC: "#3d5a99", mood: "smile", halo: true, pose: "reach" }); pliers(S, F.hand("R", "reach")[0] + 40, F.hand("R", "reach")[1] - 60, 0.8, 30); S.label("PATRON SAINT OF TOOTHACHE", 960, 150); });
shot(88, 9, (S) => { S.bg("day", { hy: 700, clouds: 1 }); const B = person(S, 1060, 920, { s: 1.5, hair: "side", hairC: "#3b2a20", outfit: "apron", outfitC: "#c0392b", mood: "happy", pose: "reach", look: -4 }); you(S, 720, 920, { s: 1.4, mood: "cry", bandage: true, hair: "messy", outfit: "tunic", outfitC: "#8b5a2b" }); pliers(S, 860, 470, 0.7, -70); for (let i = 0; i < 5; i++) mini(S, 1340 + i * 110, 930, 1.3); S.label("STREET SHOW", 960, 150, { c: C.red }); });
// L89 Paris, Big Thomas / on a bridge, with a crowd watching
shot(89, 0, (S) => { S.bg("day", { hy: 720, clouds: 1 }); person(S, 960, 1060, { s: 2.1, hair: "curly", hairC: "#2a2220", outfit: "apron", outfitC: "#c0392b", mood: "happy" }); S.label("BIG THOMAS", 960, 140, { c: C.red, size: 110 }); });
shot(89, 8, (S) => { S.bg("day", { hy: 720, clouds: 1 }); bridge(S, 960, 560, 1500); for (let i = 0; i < 8; i++) mini(S, 400 + i * 160, 540, 1.2); S.label("PARIS", 960, 150); });
// L90 1728, Pierre Fauchard / 800 pages on teeth
shot(90, 0, (S) => { S.bg("white"); wigDoc(S, 760, FLOOR, { s: 1.7, mood: "determined", look: 4 }); S.label("1728", 1350, 380, { c: C.red, size: 160 }); S.label("PIERRE FAUCHARD", 960, 150); });
shot(90, 10, (S) => { S.bg("white"); for (let i = 0; i < 6; i++) fl(S, rect(760 - i * 4, 780 - i * 70, 400, 62), ["#e8d9b5", "#d9c49a"][i % 2], { w: 6 }); S.label("800 PAGES", 960, 170, { c: C.red }); });
// L91 He said there was no worm.
shot(91, 0, (S) => { S.bg("white", { floor: false }); worm(S, 900, 560, 2.2); S.cross(960, 540, 5, S.start, Q); S.label("NO WORM.", 960, 170, { c: C.red }); });
// L92 tin, lead, and even gold
shot(92, 0, (S) => { S.bg("white", { floor: false }); [["#c0c6cc", "TIN"], ["#6e737a", "LEAD"], [C.gold, "GOLD"]].forEach(([c, t], i) => { tooth(S, 520 + i * 440, 560, 1.4, { hole: c }); S.label(t, 520 + i * 440, 880, { c: i === 2 ? "#b8860b" : INK }); }); });
// L93 scraped, cleaned, 100+ dental diseases
shot(93, 0, (S) => { S.bg("white", { floor: false }); papyrus(S, 960, 580, 760, 600, 7); S.label("100+ DENTAL DISEASES", 960, 160, { c: C.red }); });
// L94 He blamed something else.
shot(94, 0, (S) => { S.bg("white"); wigDoc(S, 640, FLOOR, { s: 1.7, mood: "angry", pose: "point", look: 6 }); S.label("THE REAL VILLAIN:", 1300, 520); });
// L95 Sugar.
shot(95, 0, (S) => { S.bg("black"); sugar(S, 960, 780, 2.2); S.label("SUGAR.", 960, 220, { c: C.red, size: 170 }); }, { cam: "push" });
