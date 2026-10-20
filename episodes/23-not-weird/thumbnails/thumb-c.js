// look: still
// C (clickbait scene mode, 2026-10-20): the party at night, warm lamp light and bunting. Huge sweating Dave clutches his cup in the
// corner; Kevin, the "normal" one, laughs too loud with his arms up, but his thought bubble shows him panicking too.
// Wrongness: the normal person is secretly as nervous as Dave (the video's answer: everyone hides it). Text = Dave's question.
const dave = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "side", hairC: DS.c("brown"), outfitC: DS.c("blue") }, o));
const kevin = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "spiky", hairC: DS.c("ink"), outfitC: DS.c("green") }, o));
const GUESTS = [["curly", "brown", "pink"], ["bun", "ink", "purple"], ["short", "brown", "orange"], ["messy", "gold", "sky"], ["side", "ink", "yellow"]];
const guest = (S, i, x, gy, layer = "mid", o = {}) => { const [hair, hc, oc] = GUESTS[i % GUESTS.length]; return DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair, hairC: DS.c(hc, 0, layer), outfitC: DS.c(oc, 0, layer) }, o)); };
const cup = (S, F, side, o = {}) => { const [hx, hy] = F.hand(side); DS.shape(S, rrect(hx - 18 * F.s, hy - 40 * F.s, 36 * F.s, 46 * F.s, DS.r.xs), o.color || "orange", { t: o.t, w: "detail" }); };
const bunting = (S, x0, x1, y) => {
  const mid = (x0 + x1) / 2, half = (x1 - x0) / 2, yy = (x) => y + 50 * (1 - ((x - mid) / half) ** 2);
  S.draw(smooth([[x0, y], [mid, y + 50], [x1, y]]), S.start, 0, { c: DS.line("mid"), w: DS.w.detail });
  for (let i = 1; i < 12; i++) { const x = x0 + (i * (x1 - x0)) / 12, a = yy(x); DS.shape(S, `M${x - 26} ${a} L${x + 26} ${a} L${x} ${a + 52} Z`, ["yellow", "sky", "pink"][i % 3], { layer: "mid", w: "hair", flat: true }); }
};
const drop = (x, y, k) => S.draw(`M${x} ${y - 34 * k} Q${x + 26 * k} ${y + 2 * k} ${x} ${y + 16 * k} Q${x - 26 * k} ${y + 2 * k} ${x} ${y - 34 * k} Z`, 0, 0, { c: "#1d1b1f", w: 6, fill: "#6fc3ff" });

const S = scene(0, 1, { cam: "none" });
DS.room(S, { wall: "dusk", floor: "wood", window: false, back: [420, 40, 1720, 820] });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#3a1830", 0.22); // party at night
S.fill(circ(1150, 600, 950, 650), 0, 0, DS.glow("#ffcf80", 0.5), 1);
bunting(S, 640, 1720, 300);
// a guest dancing at the back
const Gu = guest(S, 1, 870, 900, "mid", { mood: "happy", look: 6, pose: "armsUp" });
// Kevin, laughing too loud
const K = kevin(S, 1260, 990, "near", { s: 1.3, mood: "happy", look: -7, pose: "armsUp" });
cup(S, K, "L", { color: "red" });
[-160, -138, -42, -20].forEach((a) => { const r = (a * Math.PI) / 180, [hx, hy] = K.hd; S.draw(line([hx + Math.cos(r) * 98, hy + Math.sin(r) * 98], [hx + Math.cos(r) * 138, hy + Math.sin(r) * 138], 0), 0, 0, { c: "#1d1b1f", w: 8 }); });
// ...but in his head he is panicking too
S.thought(1600, 470, 190, 140, 1330, 520, 0, 0);
{ const cx = 1600, cy = 470, R = 82;
  S.draw(circ(cx, cy, R), 0, 0, { c: "#1d1b1f", w: 7, fill: "#ffffff" });
  [-1, 1].forEach((sd) => { S.draw(circ(cx + sd * 30, cy - 8, 17), 0, 0, { c: "#1d1b1f", w: 5, fill: "#ffffff" }); S.fill(circ(cx + sd * 30 - 4, cy - 6, 8), 0, 0, "#1d1b1f", 1);
    S.draw(line([cx + sd * 12, cy - 42], [cx + sd * 44, cy - 34], 0), 0, 0, { c: "#1d1b1f", w: 6 }); });
  S.draw(`M${cx - 26} ${cy + 36} Q${cx - 13} ${cy + 26} ${cx} ${cy + 36} Q${cx + 13} ${cy + 46} ${cx + 26} ${cy + 36}`, 0, 0, { c: "#1d1b1f", w: 6 });
  drop(cx + 74, cy - 40, 0.9); }
// huge nervous Dave in the corner, clutching his cup
const F = dave(S, 400, 1900, "near", { s: 4.2, mood: "worried", look: 9, armR: [[30, 20], [60, -14]] });
{ const [hx, hy] = F.hand("R"); S.draw(`M${hx - 52} ${hy - 120} L${hx + 52} ${hy - 120} L${hx + 40} ${hy + 20} L${hx - 40} ${hy + 20} Z`, 0, 0, { c: "#1d1b1f", w: 9, fill: DS.c("red") }); S.fill(rect(hx - 50, hy - 104, 100, 16), 0, 0, "#ffffff", 0.9); }
drop(640, 430, 1.6); drop(150, 520, 1.3); drop(660, 600, 1.1);
S.text("JUST ME?", 960, 215, { size: 220, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
