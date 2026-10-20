// look: still
// C (clickbait scene mode, 2026-10-20): Wiseman's newspaper test in a warm lamp-lit room. Huge sweating Dave jabs a tiny photo
// to count it, while half the page shouts STOP COUNTING right beside his finger; lucky Sam, already done, waves his page.
// Wrongness: a giant message nobody unlucky sees (the video's page two). Text = the question the video asks.
const dave = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
const sam = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "curly", hairC: DS.c("ink"), outfitC: DS.c("orange") }, o));
const photo = (S, x, y, pw, ph, parent) => { DS.shape(S, rect(x, y, pw, ph), "sky", { w: "detail", flat: true, parent }); S.draw(`M${x + 10} ${y + ph - 10} L${x + pw * 0.4} ${y + ph * 0.45} L${x + pw * 0.62} ${y + ph * 0.7} L${x + pw * 0.8} ${y + ph * 0.5} L${x + pw - 10} ${y + ph - 10} Z`, 0, 0, { fill: DS.c("grass", 0), c: DS.c("grass", 2), w: DS.w.hair, parent }); };

const S = scene(0, 1, { cam: "none" });
DS.room(S, { wall: "dusk", floor: "wood", window: false, back: [260, 40, 1660, 820] });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#3a2010", 0.2);
S.fill(circ(1250, 560, 950, 650), 0, 0, DS.glow("#ffd890", 0.55), 1);
// lucky Sam, done in seconds, waving his page
const G = sam(S, 1735, 975, "near", { s: 1.0, mood: "happy", look: -8, pose: "wave" });
{ const [hx, hy] = G.hand("R"); DS.shape(S, rect(hx - 40, hy - 70, 84, 60), "paper", { w: "detail", flat: true }); }
// the desk
DS.shadow(S, 1240, 1000, 1100);
DS.shape(S, rect(700, 880, 1080, 240), "wood", { tone: 2 });
DS.shape(S, rrect(660, 860, 1160, 40, DS.r.xs), "wood");
// page two, propped up on the desk
const g = S.grp(), x = 800, y = 320, w = 860, h = 560;
DS.drop(S, rect(x + 10, y + 12, w, h), { parent: g });
DS.shape(S, rect(x, y, w, h), "paper", { w: "mid", flat: true, parent: g });
S.text("PAGE 2", x + w / 2, y + 62, { size: 52, c: DS.c("ink"), parent: g });
S.draw(line([x + 24, y + 84], [x + w - 24, y + 84], 0), 0, 0, { c: DS.c("ink"), w: DS.w.detail, parent: g });
[[30, 104, 240], [300, 104, 260], [590, 104, 240]].forEach(([px, py, pw]) => photo(S, x + px, y + py, pw, 150, g));
S.text("STOP COUNTING", x + w / 2, y + 400, { size: 96, c: DS.c("red"), parent: g });
S.text("THERE ARE 43 PHOTOS", x + w / 2, y + 500, { size: 54, c: DS.c("red", 2), parent: g });
g.setAttribute("transform", `rotate(-3 ${x + w / 2} ${y + h / 2})`);
// huge sweating Dave, finger on one tiny photo
const F = dave(S, 380, 1900, "near", { s: 4.2, mood: "worried", look: 9, armR: [[52, -30], [97, -86]] });
[[620, 420, 1.6], [150, 520, 1.3]].forEach(([dx, dy, k]) => S.draw(`M${dx} ${dy - 34 * k} Q${dx + 26 * k} ${dy + 2 * k} ${dx} ${dy + 16 * k} Q${dx - 26 * k} ${dy + 2 * k} ${dx} ${dy - 34 * k} Z`, 0, 0, { c: "#1d1b1f", w: 6, fill: "#6fc3ff" }));
S.text("CURSED?", 960, 215, { size: 220, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
