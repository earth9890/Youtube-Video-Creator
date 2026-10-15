// look: still
// You Are Not Too Dark (1-min, 70 s). Mystery: is Dave too dark, or is the photo wrong? Illustrated stills, progressive changes on the spoken word.
const SKIN = { dave: DS.c("brown", 1), deep: DS.c("brown"), mid: DS.c("wood"), tan: DS.c("earth"), light: DS.c("sand", 1), pale: DS.c("dusk", 1) };
const dave = (S, x, gy, layer = "near", o = {}) => DS.figure(S, x, gy, layer, Object.assign({ s: 1.1, hair: "short", hairC: DS.c("ink"), skin: SKIN.dave, outfitC: DS.c("blue") }, o));
const pal = (S, x, gy, layer, skin, outfitC, hair, o = {}) => DS.figure(S, x, gy, layer, Object.assign({ skin, outfitC: DS.c(outfitC), hair, hairC: DS.c(skin === SKIN.light || skin === SKIN.pale ? "brown" : "ink") }, o));
// a printed photo: white border, sky + grass inside
const print = (S, x, y, w, h, o = {}) => { DS.drop(S, rect(x + 8, y + 10, w, h), { t: o.t }); DS.shape(S, rect(x, y, w, h), "white", { t: o.t, w: "detail", flat: true }); const p = 18 * (o.k || 1); DS.shape(S, rect(x + p, y + p, w - 2 * p, (h - 2 * p) * 0.62), "sky", { t: o.t, w: "hair", dir: "v" }); DS.shape(S, rect(x + p, y + p + (h - 2 * p) * 0.62, w - 2 * p, (h - 2 * p) * 0.38), "grass", { t: o.t, w: "hair", dir: "v" }); };
// underexposed face: a dark veil over the head (detail lost)
const blur = () => { if (!document.getElementById("ep19blur")) { const f = el("filter", { id: "ep19blur", x: "-50%", y: "-50%", width: "200%", height: "200%" }, document.querySelector("#stage defs")); el("feGaussianBlur", { stdDeviation: 9 }, f); } return "url(#ep19blur)"; };
const veil = (S, F, t, op = 0.55) => { const p = S.fill(circ(F.hd[0], F.hd[1] + F.r * 0.3, F.r * 1.5, F.r * 1.6), t, 0.4, DS.c("ink"), op); p.setAttribute("filter", blur()); return p; };
// vintage camera, centre cx,cy
const camera = (S, cx, cy, k, o = {}) => { const t = o.t; DS.drop(S, rrect(cx - 170 * k + 8, cy - 100 * k + 10, 340 * k, 200 * k, DS.r.sm), { t }); DS.shape(S, rrect(cx - 120 * k, cy - 140 * k, 120 * k, 60 * k, DS.r.xs), "gray", { t, tone: 2 }); DS.shape(S, rrect(cx - 170 * k, cy - 100 * k, 340 * k, 200 * k, DS.r.sm), "ink", { t }); DS.shape(S, circ(cx + 20 * k, cy, 78 * k), "gray", { t }); DS.shape(S, circ(cx + 20 * k, cy, 48 * k), "navy", { t }); S.fill(circ(cx + 6 * k, cy - 14 * k, 14 * k), t ?? S.start, 0.3, DS.P.white[0], 0.7); DS.shape(S, rrect(cx + 90 * k, cy - 84 * k, 56 * k, 30 * k, DS.r.xs), "yellow", { t, w: "detail" }); };
const cork = (S, x, y, w, h) => { DS.drop(S, rect(x + 8, y + 10, w, h)); DS.shape(S, rect(x, y, w, h), "wood", { layer: "mid" }); DS.shape(S, rect(x + 20, y + 20, w - 40, h - 40), "earth", { layer: "mid", w: "hair", flat: true }); };
const pin = (S, x, y, t) => DS.shape(S, circ(x, y, 12), "red", { t, w: "detail" });
const bench = (S, x, gy, w, name = "wood") => { DS.shadow(S, x + w / 2, gy, w); DS.shape(S, rrect(x, gy - 230, w, 40, DS.r.xs), name); [x + 30, x + w - 50].forEach((lx) => DS.shape(S, rect(lx, gy - 190, 20, 190), name, { w: "mid" })); return gy - 230; };
const bar = (S, x, y, w, name, t) => { DS.shape(S, rrect(x, y, w, 70, DS.r.xs), name, { t }); [1, 2, 3].forEach((i) => S.draw(line([x + (w * i) / 4, y], [x + (w * i) / 4, y + 70], 0), t ?? S.start, 0, { c: DS.c(name, 2), w: DS.w.detail })); };
const sunIcon = (S, cx, cy, r, t, op = 1) => { S.fill(circ(cx, cy, r * 1.9), t, 0.4, DS.c("yellow", 1), 0.35 * op); DS.shape(S, circ(cx, cy, r), "yellow", { t, w: "detail", op }); };
const group = (S, x0, gy, layer, s, t, o = {}) => { // three friends + (optionally) Dave, left to right, o.gap px apart
  const g = o.gap || 170 * s;
  const F = [pal(S, x0, gy, layer, SKIN.light, "red", "bun", { s, mood: "happy", t }), pal(S, x0 + g, gy, layer, SKIN.tan, "green", "curly", { s, mood: "smile", t })];
  if (o.dave) F.push(dave(S, x0 + 2 * g, gy, layer, { s, mood: o.daveMood || "happy", t }));
  F.push(pal(S, x0 + (o.dave ? 3 : 2) * g, gy, layer, SKIN.deep, "purple", "side", { s, mood: "smile", t }));
  return F;
};

const CUES = [[1, 0], [4, 0], [7, 0], [9, 0], [12, 0], [15, 0], [17, 0], [21, 0], [24, 0], [27, 0], [31, 0], [33, 0], [35, 0], [37, 0], [41, 0]];
const WIN = sceneWindows(CUES, 0.15);
const sc = (k, o) => scene(WIN[k][0], WIN[k][1], o);

// 0  This is Dave. / Dave took four hundred group photos. / He's in none of them.
{ const S = sc(0, { cam: "push", focus: "960 600" }); DS.outdoor(S, { hy: 600, sky: "sky", sun: [1560, 170] });
  group(S, 1040, 900, "mid", 1.2, S.start);
  const D0 = dave(S, 470, 960, "near", { mood: "smile", look: 6, pose: "reach" }); const [h0x, h0y] = D0.hand("R");
  DS.shape(S, rrect(h0x - 10, h0y - 80, 64, 110, DS.r.sm), "ink"); DS.shape(S, rrect(h0x - 2, h0y - 70, 48, 86, DS.r.xs), "glass", { w: "hair" });
  DS.card(S, "DAVE", 470, 200, { size: DS.type.body, t: W(1, 2) });
  DS.card(S, "400 PHOTOS", 1290, 200, { size: DS.type.body, t: W(2, 2) });
  DS.card(S, "DAVE IN: 0", 1290, 320, { size: DS.type.small, t: W(3, 3), tc: "red" });
  DS.vignette(S); }

// 1  In the old ones, his face is a shadow. / Dave's verdict: / "I'm too dark."
{ const S = sc(1, { cam: "zoom", focus: "1100 480" }); DS.room(S, { window: [1300, 170, 240, 240] });
  print(S, 780, 200, 640, 440);
  const G = group(S, 875, 600, "far", 1.2, S.start, { dave: true, daveMood: "flat", gap: 150 });
  veil(S, G[2], W(4, 6));
  dave(S, 470, 960, "near", { mood: "sad", look: 6 });
  S.speech(470, 230, 280, 90, 470, 340, W(6, 0), 0.25); S.text("I'M TOO DARK", 470, 250, { size: DS.type.small, t: W(6, 0), c: DS.c("ink") });
  DS.card(S, "SHADOW", 1100, 740, { size: DS.type.small, t: W(4, 6) });
  DS.plant(S, 1810, 1120, 1.0, -1); DS.vignette(S); }

// 2  Is Dave too dark, / or is the photo wrong?
{ const S = sc(2, { cam: "push" }); DS.room(S, { wall: "night", floor: "wood", window: false });
  dave(S, 560, 960, "near", { mood: "worried", look: 6 });
  camera(S, 1300, 560, 1.3, { t: W(8, 2) });
  DS.card(S, "TOO DARK?", 560, 230, { size: DS.type.body, t: W(7, 1) });
  DS.card(S, "WRONG PHOTO?", 1300, 230, { size: DS.type.body, t: W(8, 2), tc: "red" });
  DS.vignette(S, 0.18); }

// 3  Suspect one: / Dave's skin. / Dave has already confessed.
{ const S = sc(3); DS.room(S, { wall: "night", floor: "wood", window: false });
  cork(S, 760, 150, 760, 520);
  DS.card(S, "SUSPECT 1", 1140, 240, { size: DS.type.body, t: W(9, 0) });
  DS.shape(S, circ(1140, 450, 120), "white", { t: W(10, 0), w: "detail" }); DS.shape(S, circ(1140, 450, 72), "brown", { t: W(10, 0), tone: 1 }); pin(S, 1140, 340, W(10, 0));
  DS.card(S, "DAVE'S SKIN", 1140, 610, { size: DS.type.small, t: W(10, 0) });
  dave(S, 440, 960, "near", { mood: "sad", look: 6, pose: "armsUp", t: W(11, 0) - 0.2 });
  DS.card(S, "CONFESSED", 440, 230, { size: DS.type.small, t: W(11, 3), tc: "red" });
  DS.vignette(S, 0.18); }

// 4  In 2000, Nina Jablonski compared skin colour with satellite maps of ultraviolet. / Strong sun, darker skin. / Weak sun, lighter skin.
{ const S = sc(4, { cam: "push", focus: "1100 450" }); DS.room(S, { wall: "glass", floor: "gray", window: false });
  const x = 760, y = 180, w = 760, h = 520;
  DS.drop(S, rect(x + 8, y + 10, w, h)); DS.shape(S, rect(x, y, w, h), "navy", { flat: true });
  const bands = [["sky", 1], ["yellow", 1], ["orange", 0], ["red", 0], ["orange", 0], ["yellow", 1], ["sky", 1]];
  bands.forEach(([n, tone], i) => S.fill(rect(x + 30, y + 30 + i * ((h - 60) / 7), w - 60, (h - 60) / 7), W(12, 9), 0.5, DS.c(n, tone), 1));
  S.text("EQUATOR", x + w / 2, y + 30 + 3.5 * ((h - 60) / 7) + 14, { size: DS.type.caption, t: W(12, 9), c: DS.P.white[0] });
  DS.shape(S, rrect(x + w - 150, y - 60, 90, 50, DS.r.xs), "gray", { t: W(12, 10) }); DS.shape(S, rect(x + w - 230, y - 50, 70, 30), "blue", { t: W(12, 10), w: "detail" }); DS.shape(S, rect(x + w - 50, y - 50, 70, 30), "blue", { t: W(12, 10), w: "detail" });
  const eq = y + 30 + 3.5 * ((h - 60) / 7), hi = y + 30 + 0.5 * ((h - 60) / 7);
  sunIcon(S, x - 80, eq - 70, 46, W(13, 0)); S.draw(circ(x - 80, eq + 60, 46), W(13, 2), 0, { fill: SKIN.deep, c: DS.line(), w: DS.w.detail });
  sunIcon(S, x + w + 80, hi + 10, 26, W(14, 0), 0.6); S.draw(circ(x + w + 80, hi + 110, 46), W(14, 2), 0, { fill: SKIN.light, c: DS.line(), w: DS.w.detail });
  DS.figure(S, 380, 960, "near", { s: 1.05, hair: "bun", hairC: DS.c("gray", 1), skin: SKIN.light, outfitC: DS.c("purple"), mood: "smile", look: 6, pose: "point" });
  DS.card(S, "2000 · NINA JABLONSKI", 1140, 820, { size: DS.type.small, t: W(12, 4) });
  DS.card(S, "SATELLITE UV MAP", 1140, 110, { size: DS.type.caption, t: W(12, 10) });
  DS.vignette(S); }

// 5  Dark skin guards folate, which growing babies need. / Light skin lets weak sun make vitamin D.
{ const S = sc(5); DS.outdoor(S, { hy: 620, sky: "sky", sun: [330, 150] });
  S.fill(circ(1560, 160, 60), S.start, 0, DS.c("yellow", 1), 0.55); S.cloud(1640, 190, 0.9, S.start, 0.1);
  pal(S, 560, 940, "near", SKIN.deep, "orange", "curly", { mood: "smile", look: 4 });
  DS.shape(S, `M760 420 L880 460 L870 600 Q820 680 760 710 Q700 680 650 600 L640 460 Z`, "gold", { t: W(15, 2) });
  pal(S, 1360, 940, "near", SKIN.light, "green", "side", { mood: "smile", look: -4 });
  DS.card(S, "GUARDS FOLATE", 560, 230, { size: DS.type.small, t: W(15, 2) });
  DS.card(S, "MAKES VITAMIN D", 1360, 330, { size: DS.type.small, t: W(16, 5) });
  DS.vignette(S); }

// 6  Every shade is a setting / for a different sun. / Dave's is set / for a strong one.
{ const S = sc(6, { cam: "push" }); DS.outdoor(S, { hy: 600, sky: "dusk", sun: false });
  const shades = [SKIN.deep, SKIN.dave, SKIN.mid, SKIN.tan, SKIN.light, SKIN.pale];
  const fits = ["orange", "blue", "green", "purple", "red", "gray"], hairs = ["curly", "short", "side", "bun", "messy", "short"];
  shades.forEach((sk, i) => { const x = 330 + i * 252;
    if (i === 1) dave(S, x, 920, "near", { s: 0.95, mood: "smile" }); else pal(S, x, 920, "near", sk, fits[i], hairs[i], { s: 0.95, mood: "smile" });
    sunIcon(S, x, 340 - i * 14, 70 - i * 9, W(18, 2) + i * 0.08); });
  DS.card(S, "A SETTING PER SUN", 960, 140, { size: DS.type.body, t: W(17, 3) });
  S.draw(circ(582, 340, 120), W(20, 2), 0, { c: DS.c("red"), w: DS.w.near });
  DS.card(S, "DAVE: STRONG SUN", 760, 520, { size: DS.type.small, t: W(19, 0), tc: "red" });
  DS.vignette(S); }

// 7  "Then why am I a shadow?" / Suspect two: / the camera.
{ const S = sc(7); DS.room(S, { wall: "night", floor: "wood", window: false });
  cork(S, 760, 150, 760, 520);
  DS.shape(S, circ(960, 430, 110), "white", { w: "detail" }); DS.shape(S, circ(960, 430, 66), "brown", { tone: 1 }); pin(S, 960, 330);
  S.draw(line([880, 360], [1040, 510], 0), S.start, 0, { c: DS.c("green"), w: DS.w.near }); S.draw(line([1040, 360], [880, 510], 0), S.start, 0, { c: DS.c("green"), w: DS.w.near });
  camera(S, 1300, 440, 0.75, { t: W(23, 0) }); pin(S, 1300, 320, W(23, 0));
  S.draw(line([960, 330], [1300, 320], 40), W(23, 0), 0, { c: DS.c("red"), w: DS.w.mid });
  dave(S, 400, 960, "near", { mood: "worried", look: 6, pose: "hold" });
  S.speech(420, 230, 300, 90, 420, 340, W(21, 0), 0.25); S.text("THEN WHY?", 420, 250, { size: DS.type.small, t: W(21, 0), c: DS.c("ink") });
  DS.card(S, "SUSPECT 2: CAMERA", 1140, 610, { size: DS.type.small, t: W(22, 0), tc: "red" });
  DS.vignette(S, 0.18); }

// 8  In the fifties, labs tuned colour prints to one photo: / a white woman called Shirley. / If Shirley looked right, the print was right.
{ const S = sc(8, { cam: "push", focus: "1000 400" }); DS.room(S, { wall: "green", floor: "wood", window: false });
  const cx = 1000, cy = 380;
  DS.drop(S, rrect(cx - 260 + 8, cy - 210 + 10, 520, 420, DS.r.xs)); DS.shape(S, rrect(cx - 260, cy - 210, 520, 420, DS.r.xs), "white", { w: "detail", flat: true });
  DS.figure(S, cx - 70, cy + 190, "mid", { s: 1.1, hair: "bun", hairC: DS.c("brown"), skin: SKIN.pale, outfit: "tunic", outfitC: DS.c("red"), mood: "smile", t: W(25, 0) });
  ["red", "yellow", "green", "blue", "gray"].forEach((n, i) => DS.shape(S, rect(cx + 110, cy - 170 + i * 72, 110, 56), n, { t: W(24, 8), w: "hair", flat: true }));
  const top = bench(S, 1250, 960, 520, "gray");
  DS.shape(S, rect(1330, top - 150, 180, 150), "white", { w: "detail", flat: true, t: W(26, 0) }); DS.shape(S, rect(1350, top - 130, 140, 110), "sky", { w: "hair", t: W(26, 0) });
  S.tick(1610, top - 110, 0.9, W(26, 3), 0.3, { c: DS.c("green") });
  DS.figure(S, 470, 960, "near", { s: 1.05, hair: "short", hairC: DS.c("brown"), skin: SKIN.light, outfit: "apron", outfitC: DS.c("white", 2), mood: "flat", look: 6 });
  DS.card(S, "1950s PHOTO LAB", 470, 200, { size: DS.type.small, t: W(24, 1) });
  DS.card(S, "SHIRLEY", cx, 130, { size: DS.type.body, t: W(25, 4), tc: "red" });
  DS.vignette(S); }

// 9  Darker faces / lost detail. / Parents complained. / Nothing changed.
{ const S = sc(9); DS.room(S, { wall: "wall", window: false });
  print(S, 360, 160, 860, 520);
  const k = [[SKIN.light, "red", "bun"], [SKIN.deep, "orange", "curly"], [SKIN.tan, "green", "side"], [SKIN.mid, "blue", "short"], [SKIN.pale, "purple", "messy"]];
  const kids = k.map(([sk, o, h], i) => pal(S, 470 + i * 160, 640, "mid", sk, o, h, { s: 0.85, mood: "smile" }));
  [1, 3].forEach((i) => veil(S, kids[i], W(28, 0)));
  DS.card(S, "SCHOOL PHOTO, 1950s", 790, 110, { size: DS.type.small });
  DS.figure(S, 1420, 960, "near", { s: 1.05, hair: "bun", hairC: DS.c("ink"), skin: SKIN.deep, outfitC: DS.c("orange"), mood: "angry", look: -6, pose: "point", t: W(29, 0) });
  DS.figure(S, 1660, 960, "near", { s: 1.1, hair: "short", hairC: DS.c("ink"), skin: SKIN.mid, outfitC: DS.c("blue"), mood: "angry", look: -6, t: W(29, 0) });
  DS.card(S, "PARENTS COMPLAINED", 1500, 420, { size: DS.type.small, t: W(29, 0) });
  DS.card(S, "NOTHING CHANGED", 790, 800, { size: DS.type.body, t: W(30, 0), tc: "red" });
  DS.vignette(S); }

// 10  Then chocolate makers complained: / milk and dark looked alike.
{ const S = sc(10, { cam: "push" }); DS.room(S, { wall: "dusk", floor: "wood", window: false });
  const top = bench(S, 860, 960, 760);
  bar(S, 920, top - 72, 280, "wood"); bar(S, 1280, top - 72, 280, "brown");
  print(S, 940, 210, 560, 330, { t: W(32, 0) }); bar(S, 1000, 340, 200, "brown", W(32, 0)); bar(S, 1240, 340, 200, "brown", W(32, 0));
  DS.figure(S, 520, 960, "near", { s: 1.1, hair: "side", hairC: DS.c("gray", 1), skin: SKIN.tan, outfit: "hoodie", outfitC: DS.c("brown", 1), mood: "angry", look: 6, pose: "point" });
  DS.card(S, "CHOCOLATE MAKERS", 520, 200, { size: DS.type.small, t: W(31, 1) });
  DS.card(S, "MILK = DARK?", 1220, 620, { size: DS.type.small, t: W(32, 3), tc: "red" });
  DS.vignette(S); }

// 11  So Kodak improved the film, / then ate the test subjects.
{ const S = sc(11); DS.room(S, { wall: "dusk", floor: "wood", window: false });
  const top = bench(S, 860, 960, 760);
  DS.shape(S, rrect(1080, top - 200, 300, 200, DS.r.sm), "yellow", { t: W(33, 3) }); S.text("NEW FILM", 1230, top - 85, { size: DS.type.small, t: W(33, 3), c: DS.c("ink") });
  DS.shape(S, rrect(930, top - 34, 110, 34, DS.r.xs), "wood", { w: "detail" }); DS.shape(S, rrect(1440, top - 34, 110, 34, DS.r.xs), "brown", { w: "detail" });
  const F = DS.figure(S, 520, 960, "near", { s: 1.1, hair: "messy", hairC: DS.c("brown"), skin: SKIN.light, outfit: "apron", outfitC: DS.c("white", 2), mood: "flat", look: 6, pose: "hold" });
  F.face(W(34, 1), "happy", 6);
  const [hx, hy] = F.hand("R"); DS.shape(S, rrect(hx - 20, hy - 30, 80, 40, DS.r.xs), "brown", { t: W(34, 1), w: "detail" });
  DS.card(S, "FILM IMPROVED", 1230, 220, { size: DS.type.small, t: W(33, 3) });
  DS.card(S, "TEST SUBJECTS: EATEN", 1230, 360, { size: DS.type.small, t: W(34, 3), tc: "red" });
  DS.vignette(S); }

// 12  Photos of dark skin got better / by accident.
{ const S = sc(12, { cam: "zoom", focus: "790 420" }); DS.room(S, { wall: "wall", window: false });
  print(S, 360, 160, 860, 520);
  const k = [[SKIN.light, "red", "bun"], [SKIN.deep, "orange", "curly"], [SKIN.tan, "green", "side"], [SKIN.mid, "blue", "short"], [SKIN.pale, "purple", "messy"]];
  const kids = k.map(([sk, o, h], i) => pal(S, 470 + i * 160, 640, "mid", sk, o, h, { s: 0.85, mood: "happy" }));
  [1, 3].forEach((i) => { const v = veil(S, kids[i], S.start); S.fadeOut(v, W(35, 3), 0.6); });
  S.fill(circ(790, 420, 520, 300), W(35, 3), 0.6, DS.c("gold", 1), 0.18);
  DS.card(S, "BETTER FILM", 790, 110, { size: DS.type.small, t: W(35, 0) });
  DS.card(S, "BY ACCIDENT", 1500, 420, { size: DS.type.body, t: W(36, 0), tc: "red" });
  DS.vignette(S); }

// 13  Photo four hundred and one. / Dave taps his face on screen. / The camera sets itself / for Dave.
{ const S = sc(13, { cam: "push", focus: "1300 520" }); DS.outdoor(S, { hy: 600, sky: "sky", sun: [300, 150] });
  group(S, 260, 900, "mid", 1.0, S.start, { dave: true });
  const px = 1040, py = 260, pw = 680, ph = 440;
  DS.drop(S, rrect(px + 10, py + 14, pw, ph, DS.r.lg)); DS.shape(S, rrect(px, py, pw, ph, DS.r.lg), "ink");
  DS.shape(S, rect(px + 40, py + 30, pw - 80, ph - 60), "sky", { w: "hair", dir: "v" }); DS.shape(S, rect(px + 40, py + 30 + (ph - 60) * 0.65, pw - 80, (ph - 60) * 0.35), "grass", { w: "hair", flat: true });
  const G = group(S, px + 150, py + ph - 50, "far", 0.95, S.start, { dave: true, gap: 125 });
  const D = G[2], fx = D.hd[0], fy = D.hd[1];
  S.draw(rect(fx - 48, fy - 48, 96, 96), W(38, 2), 0, { c: DS.c("yellow"), w: DS.w.near });
  S.draw(circ(fx, fy, 62), W(39, 2), 0, { c: DS.c("gold", 1), w: DS.w.mid });   // ring, not a fill: a fill over the face would lighten Dave's skin
  DS.card(S, "PHOTO 401", 1380, 150, { size: DS.type.body, t: W(37, 0) });
  DS.card(S, "TAP YOUR FACE", 1380, 800, { size: DS.type.small, t: W(38, 2), tc: "red" });
  DS.vignette(S); }

// 14  You are not too dark. / Cameras were set for Shirley. / Set yours for you.
{ const S = sc(14, { cam: "pull" }); DS.room(S, { window: [1340, 170, 230, 230] });
  print(S, 560, 170, 800, 520);
  const G = group(S, 680, 630, "far", 1.5, S.start, { dave: true, gap: 185 });
  S.draw(circ(G[2].hd[0], G[2].hd[1], 104), S.start, 0, { c: DS.c("gold", 1), w: DS.w.mid });   // ring keeps Dave's real tone
  DS.card(S, "NOT TOO DARK", 960, 790, { size: DS.type.title, t: W(41, 2), tc: "green" });
  DS.card(S, "SET YOURS FOR YOU", 960, 900, { size: DS.type.small, t: W(43, 0) });
  DS.plant(S, 1810, 1120, 1.0, -1); DS.vignette(S); }
