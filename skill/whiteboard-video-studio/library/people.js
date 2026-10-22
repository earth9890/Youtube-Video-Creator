// ===================== library/people.js — token-driven characters =====================
// L.person(o) -> SVG markup, feet centre at (0,0), ~300 px tall at s = 1 (same skeleton as the engine's v3 figure).
// o: { style: "man01".."man10" | "girl01".."girl10", body, skin, hair, hairC, outfit, outfitC, face, look (-1..1 gaze),
//      pose, legs, s, hands, mouth (talk shape a|e|o|m|f|l), blink }
// Character style = the design (head/limb/torso); the LOOK tokens (core.js) = line weights, colours, shading, palette.
(function () {
const L = window.L, f1 = L.f1;

// arm poses: [armL, armR], each two points relative to the arm root, at s = 1 (engine POSES + new ones)
L.POSES = {
  stand: [[[-28, 52], [-48, 100]], [[28, 52], [48, 100]]], sad: [[[-18, 55], [-26, 106]], [[18, 55], [26, 106]]],
  point: [[[-28, 52], [-48, 100]], [[70, -5], [140, -30]]], pointL: [[[-70, -5], [-140, -30]], [[28, 52], [48, 100]]],
  armsUp: [[[-35, -20], [-62, -82]], [[35, -20], [62, -82]]], shrug: [[[-45, 5], [-90, -50]], [[45, 5], [90, -50]]],
  think: [[[-28, 52], [-48, 100]], [[48, 35], [14, -8]]], hips: [[[-46, 45], [-12, 96]], [[46, 45], [12, 96]]],
  wave: [[[-28, 52], [-48, 100]], [[58, -18], [78, -92]]], cross: [[[32, 48], [-38, 58]], [[-32, 48], [38, 58]]],
  head: [[[-58, -12], [-34, -64]], [[58, -12], [34, -64]]], reach: [[[-28, 52], [-48, 100]], [[62, 10], [134, 8]]],
  reachL: [[[-62, 10], [-134, 8]], [[28, 52], [48, 100]]], hold: [[[-30, 50], [-8, 82]], [[30, 50], [10, 80]]],
  push: [[[-28, 52], [-48, 100]], [[90, 10], [170, 2]]],
  shocked: [[[-52, -6], [-86, -58]], [[52, -6], [86, -58]]],
};
// leg sets: [legL, legR] relative to the hip
L.LEGS = { stand: [[[-8, 62], [-35, 130]], [[8, 62], [35, 130]]], sit: [[[70, -5], [75, 128]], [[95, 10], [100, 128]]] };
L.POSE_LEGS = {}; // pose name -> leg set (motion.js adds run/jump/kneel/…)
// accessories: L.ACC[name] = { draw(anchors, o) -> markup, front: true (drawn over the arms) }. anchors: { hd, R, sh, hip, s, W, abL, abR, hands:[L,R], skinName, outC, hairC, shape }
L.ACC = {};
// geometry of a figure without drawing it (to place props on hands/head): same maths as L.person
L.anchors = (o = {}) => { let a; const ACC0 = L.ACC; L.ACC = new Proxy({}, { get: () => ({ draw: (x) => ((a = x), "") }) }); try { L.person(Object.assign({}, o, { acc: ["_probe"] })); } finally { L.ACC = ACC0; } return a; };

// body types: leg/torso length, width, limb thickness, head size, extras
L.BODIES = {
  regular: {}, muscular: { width: 1.35, limbK: 1.7, muscle: 1, sh: 1.25 }, skinny: { width: 0.72, limbK: 0.7, leg: 1.06 },
  chubby: { width: 1.55, limbK: 1.3, belly: 1 }, tall: { leg: 1.22, torso: 1.08 }, short: { leg: 0.78, torso: 0.9 },
  kid: { scale: 0.68, headK: 1.25 }, teen: { scale: 0.86, headK: 1.08, width: 0.9 }, elderly: { stoop: 1, leg: 0.95 },
  baby: { scale: 0.42, headK: 1.6, leg: 0.55, torso: 0.72, width: 1.2, limbK: 1.3 },
};
// character styles (cast). head: ratio/shape/fill; limb: style/k; torso: line|tee|bean|block|capsule; eyes: v3|dot|pie
const M = (o) => Object.assign({ head: {}, limb: {}, torso: "line", eyes: "v3", hands: "none", olK: 1, hair: "short", outfit: "tee" }, o);
L.CAST = {
  man01: M({ label: "Man 01 · classic v3 (current Dave)", hair: "side", hairC: "brown", outfitC: "blue" }),
  man02: M({ label: "Man 02 · pure stick", head: { fill: "white" }, limb: { k: 0.8 }, eyes: "dot", hair: "tick", outfit: "none", olK: 0.85 }),
  man03: M({ label: "Man 03 · chunky round", head: { ratio: 1.2 }, limb: { style: "tube", k: 1 }, torso: "capsule", hair: "short", outfitC: "orange" }),
  man04: M({ label: "Man 04 · tall lanky", head: { ratio: 0.82 }, limb: { k: 0.8 }, body: "tall", hair: "messy", outfitC: "green" }),
  man05: M({ label: "Man 05 · bean body", head: { ratio: 1.05, fill: "skin" }, torso: "bean", eyes: "dot", hair: "spiky", outfitC: "red" }),
  man06: M({ label: "Man 06 · block body", head: { shape: "oval" }, limb: { style: "tube" }, torso: "block", hair: "short", outfitC: "navy" }),
  man07: M({ label: "Man 07 · rubber hose", head: { ratio: 1.1 }, limb: { style: "hose", k: 1 }, torso: "bean", eyes: "pie", hands: "glove", hair: "none", outfitC: "red" }),
  man08: M({ label: "Man 08 · minimal dot-eye", head: { fill: "skin" }, limb: { k: 0.9 }, eyes: "dot", hair: "short", olK: 0.7, outfitC: "teal" }),
  man09: M({ label: "Man 09 · thick comic", head: { ratio: 1.05 }, limb: { style: "tube" }, torso: "block", olK: 1.8, flat: true, hair: "spiky", outfitC: "yellow" }),
  man10: M({ label: "Man 10 · chibi big-head", head: { ratio: 1.7 }, limb: { style: "tube", k: 0.8 }, torso: "capsule", body: "short", hair: "curly", outfitC: "purple" }),
};
// girls: the same ten structures, each with a different hair style + dress/skirt
const G = (m, o) => Object.assign({}, L.CAST[m], { outfit: "dress" }, o);
Object.assign(L.CAST, {
  girl01: G("man01", { label: "Girl 01 · classic v3, bun", hair: "bun", hairC: "brown", outfitC: "red" }),
  girl02: G("man02", { label: "Girl 02 · pure stick, ponytail", hair: "ponytail", outfit: "none" }),
  girl03: G("man03", { label: "Girl 03 · chunky round, bob", hair: "bob", hairC: "ink", outfitC: "pink" }),
  girl04: G("man04", { label: "Girl 04 · tall lanky, long hair", hair: "long", hairC: "gold", outfitC: "teal" }),
  girl05: G("man05", { label: "Girl 05 · bean body, curly", hair: "curlyLong", hairC: "brown", outfitC: "purple" }),
  girl06: G("man06", { label: "Girl 06 · block body, braids", hair: "braids", hairC: "ink", outfitC: "green", outfit: "skirt" }),
  girl07: G("man07", { label: "Girl 07 · rubber hose, pixie", hair: "pixie", hairC: "red", outfitC: "yellow" }),
  girl08: G("man08", { label: "Girl 08 · minimal, hijab", hair: "hijab", hairC: "blue", outfitC: "blue" }),
  girl09: G("man09", { label: "Girl 09 · thick comic, afro puffs", hair: "puffs", hairC: "ink", outfitC: "orange", skin: "s5" }),
  girl10: G("man10", { label: "Girl 10 · chibi, pigtails", hair: "pigtails", hairC: "brown", outfitC: "pink" }),
});

// ---------- hair (units = head radius R, head centre hx,hy). Returns { back: markup, front: markup } ----------
L.HAIR = {};
const P_ = (hx, hy, R) => (a, k) => [hx + Math.cos((a * Math.PI) / 180) * R * k, hy + Math.sin((a * Math.PI) / 180) * R * k];
const line3 = (hx, hy, R) => [[hx + 0.6 * R, hy - 0.6 * R], [hx + 0.15 * R, hy - 0.68 * R], [hx - 0.35 * R, hy - 0.62 * R], [hx - 0.75 * R, hy - 0.45 * R]];
const capTop = (hx, hy, R, k = 1.07) => [...L.arcPts(hx, hy, R * k, 192, 348, 14), P_(hx, hy, R)(344, 0.97), ...line3(hx, hy, R), P_(hx, hy, R)(196, 0.97), P_(hx, hy, R)(192, k)];
L.HAIR.none = () => ({});
L.HAIR.short = (hx, hy, R, c) => ({ front: L.shape(L.smooth(capTop(hx, hy, R)), c, { w: "hair" }) });
L.HAIR.side = (hx, hy, R, c) => { const P = P_(hx, hy, R); return { front: L.shape(L.smooth([...L.arcPts(hx, hy, R * 1.08, 190, 350, 14), P(346, 0.97), [hx + 0.55 * R, hy - 0.64 * R], [hx + 0.05 * R, hy - 0.52 * R], [hx - 0.42 * R, hy - 0.3 * R], [hx - 0.66 * R, hy - 0.5 * R], P(196, 0.97), P(190, 1.08)]), c, { w: "hair" }) }; };
L.HAIR.curly = (hx, hy, R, c) => { const P = P_(hx, hy, R); return { front: L.shape(L.smooth([...Array.from({ length: 13 }, (_, i) => P(186 + i * 14, i % 2 ? 1.07 : 1.2)), P(352, 0.97), ...line3(hx, hy, R).map(([x, y], i) => [x, y + (i % 2 ? 0.08 : 0) * R]), P(190, 0.97), P(186, 1.2)]), c, { w: "hair" }) }; };
L.HAIR.tick = (hx, hy, R) => { const P = P_(hx, hy, R); return { front: L.stroke(L.smooth([P(248, 0.98), P(262, 1.13), P(286, 1.07)]), { w: "char" }) }; };
L.HAIR.messy = (hx, hy, R, c) => { const P = P_(hx, hy, R), out = [], inn = []; for (let a = 160, i = 0; a <= 380; a += 11, i++) out.push(P(a, i % 2 ? 1.08 : 1.22)); for (let a = 380, i = 0; a >= 160; a -= 20, i++) { const p = P(a, 0.96); inn.push([p[0], Math.min(p[1], hy - (i % 2 ? 0.32 : 0.44) * R)]); } return { front: L.shape(L.poly([...out, ...inn], true), c, { w: "hair" }) }; };
L.HAIR.spiky = (hx, hy, R, c) => { const P = P_(hx, hy, R), out = []; for (let a = 190, i = 0; a <= 350; a += 16, i++) out.push(P(a, i % 2 ? 1.0 : 1.32)); return { front: L.shape(L.poly([...out, ...L.arcPts(hx, hy, R * 0.98, 350, 190, 10)], true), c, { w: "hair" }) }; };
L.HAIR.bun = (hx, hy, R, c) => { const P = P_(hx, hy, R); return { back: L.shape(L.circ(hx + 0.12 * R, hy - 1.2 * R, 0.34 * R), c, { w: "hair" }), front: L.shape(L.smooth([...L.arcPts(hx, hy, R * 1.04, 200, 340, 10), P(330, 0.7), P(270, 0.62), P(210, 0.7)]) + "Z", c, { w: "hair" }) }; };
L.HAIR.ponytail = (hx, hy, R, c) => ({ back: L.shape(L.smooth([[hx + 0.7 * R, hy - 0.7 * R], [hx + 1.45 * R, hy - 0.5 * R], [hx + 1.6 * R, hy + 0.4 * R], [hx + 1.25 * R, hy + 1.1 * R], [hx + 1.1 * R, hy + 0.2 * R], [hx + 0.7 * R, hy - 0.2 * R], [hx + 0.7 * R, hy - 0.7 * R]]), c, { w: "hair" }), front: L.HAIR.short(hx, hy, R, c).front });
L.HAIR.bob = (hx, hy, R, c) => { const P = P_(hx, hy, R); return { back: L.shape(L.smooth([P(180, 1.12), ...L.arcPts(hx, hy, R * 1.14, 180, 360, 12), P(0, 1.12), [hx + 1.12 * R, hy + 0.55 * R], [hx + 0.75 * R, hy + 0.62 * R], [hx - 0.75 * R, hy + 0.62 * R], [hx - 1.12 * R, hy + 0.55 * R], P(180, 1.12)]), c, { w: "hair" }), front: L.shape(L.smooth([P(196, 1.05), ...L.arcPts(hx, hy, R * 1.06, 196, 344, 10), [hx + 0.7 * R, hy - 0.35 * R], [hx + 0.1 * R, hy - 0.42 * R], [hx - 0.7 * R, hy - 0.35 * R], P(196, 1.05)]), c, { w: "hair" }) }; };
L.HAIR.long = (hx, hy, R, c) => { const P = P_(hx, hy, R); return { back: L.shape(L.smooth([P(185, 1.1), ...L.arcPts(hx, hy, R * 1.12, 185, 355, 12), P(355, 1.1), [hx + 1.2 * R, hy + 1.2 * R], [hx + 1.0 * R, hy + 2.2 * R], [hx + 0.5 * R, hy + 2.0 * R], [hx - 0.5 * R, hy + 2.0 * R], [hx - 1.0 * R, hy + 2.2 * R], [hx - 1.2 * R, hy + 1.2 * R], P(185, 1.1)]), c, { w: "hair" }), front: L.HAIR.side(hx, hy, R, c).front }; };
L.HAIR.curlyLong = (hx, hy, R, c) => { const P = P_(hx, hy, R), pts = []; for (let a = 150, i = 0; a <= 390; a += 15, i++) pts.push(P(a, i % 2 ? 1.25 : 1.42)); pts.push([hx + 1.3 * R, hy + 1.5 * R], [hx + 0.6 * R, hy + 1.7 * R], [hx - 0.6 * R, hy + 1.7 * R], [hx - 1.3 * R, hy + 1.5 * R], pts[0]); return { back: L.shape(L.smooth(pts), c, { w: "hair" }), front: L.HAIR.curly(hx, hy, R, c).front }; };
L.HAIR.braids = (hx, hy, R, c) => { const br = (sx) => Array.from({ length: 4 }, (_, i) => L.shape(L.circ(hx + sx * 1.0 * R, hy + (0.5 + i * 0.42) * R, 0.24 * R, 0.22 * R), c, { w: "hair" })).join(""); return { back: br(-1) + br(1), front: L.HAIR.short(hx, hy, R, c).front }; };
L.HAIR.pixie = (hx, hy, R, c) => { const P = P_(hx, hy, R); return { front: L.shape(L.poly([...L.arcPts(hx, hy, R * 1.1, 185, 355, 12), P(350, 0.9), [hx + 0.4 * R, hy - 0.45 * R], [hx + 0.1 * R, hy - 0.62 * R], [hx - 0.2 * R, hy - 0.4 * R], [hx - 0.5 * R, hy - 0.55 * R], [hx - 0.95 * R, hy - 0.1 * R], P(185, 1.1)], true), c, { w: "hair" }) }; };
L.HAIR.hijab = (hx, hy, R, c) => ({ back: L.shape(L.smooth([[hx, hy - 1.22 * R], [hx + 1.2 * R, hy - 0.4 * R], [hx + 1.15 * R, hy + 0.9 * R], [hx + 1.4 * R, hy + 1.9 * R], [hx - 1.4 * R, hy + 1.9 * R], [hx - 1.15 * R, hy + 0.9 * R], [hx - 1.2 * R, hy - 0.4 * R], [hx, hy - 1.22 * R]]), c, { w: "hair" }), frame: true });
L.HAIR.puffs = (hx, hy, R, c) => { const puff = (x, y, r) => L.shape(L.smooth(Array.from({ length: 17 }, (_, i) => { const a = (i / 16) * Math.PI * 2, k = i % 2 ? 0.86 : 1; return [x + Math.cos(a) * r * k, y + Math.sin(a) * r * k]; })), c, { w: "hair" }); return { back: puff(hx - 1.12 * R, hy - 0.55 * R, 0.5 * R) + puff(hx + 1.12 * R, hy - 0.55 * R, 0.5 * R), front: L.HAIR.short(hx, hy, R, c).front }; };
L.HAIR.pigtails = (hx, hy, R, c) => { const tail = (sx) => L.shape(L.smooth([[hx + sx * 0.85 * R, hy - 0.45 * R], [hx + sx * 1.55 * R, hy - 0.2 * R], [hx + sx * 1.75 * R, hy + 0.6 * R], [hx + sx * 1.25 * R, hy + 0.2 * R], [hx + sx * 0.85 * R, hy - 0.45 * R]]), c, { w: "hair" }); return { back: tail(-1) + tail(1), front: L.HAIR.short(hx, hy, R, c).front }; };

// ---------- faces (units of R). 26 expressions ----------
// mouth: points (open curve) or special; brow: key of BROW; eye: open|wide|closed|half|wink|x|spiral|heart|tear; extras
const MOUTH = {
  smile: [[-0.3, 0.3], [0, 0.48], [0.3, 0.3]], sad: [[-0.28, 0.52], [0, 0.38], [0.28, 0.52]], flat: [[-0.24, 0.45], [0.24, 0.45]],
  tired: [[-0.2, 0.47], [0, 0.44], [0.2, 0.47]], worried: [[-0.28, 0.48], [-0.1, 0.4], [0.1, 0.48], [0.28, 0.4]], determined: [[-0.22, 0.45], [0.22, 0.43]],
  angry: [[-0.26, 0.52], [0, 0.42], [0.26, 0.52]], smug: [[-0.24, 0.44], [0.1, 0.46], [0.3, 0.34]], small: [[-0.1, 0.46], [0.1, 0.46]],
  wavy: [[-0.3, 0.46], [-0.15, 0.4], [0, 0.46], [0.15, 0.4], [0.3, 0.46]],
};
const BROW = { up: [-0.6, -0.42], down: [-0.34, -0.54], high: [-0.68, -0.62], low: [-0.4, -0.4], mid: [-0.5, -0.5] };
L.FACES = {
  smile: { m: "smile", b: "mid" }, happy: { m: "open", b: "mid", blush: 1 }, laugh: { m: "laugh", b: "high", e: "closedUp" }, sad: { m: "sad", b: "up", look: 0.35 },
  cry: { m: "sad", b: "up", tear: 1, look: 0.35 }, angry: { m: "angry", b: "down" }, furious: { m: "teeth", b: "down", vein: 1 }, wow: { m: "o", b: "high", e: "wide" },
  shocked: { m: "O", b: "high", e: "wide", sweat: 1 }, scared: { m: "wavy", b: "up", e: "wide", sweat: 1 }, worried: { m: "worried", b: "up" },
  confused: { m: "wavy", b: "tilt", q: 1 }, thinking: { m: "small", b: "tilt", look: -0.6 }, sleepy: { m: "tired", b: "low", e: "half" }, sleep: { m: "small", e: "closed", zzz: 1 },
  sick: { m: "wavy", b: "up", e: "half", green: 1 }, bored: { m: "flat", b: "low", e: "half" }, smug: { m: "smug", b: "tilt", e: "half" },
  nervous: { m: "worried", b: "up", sweat: 1, look: 0.6 }, determined: { m: "determined", b: "down" }, dizzy: { m: "wavy", e: "spiral" },
  love: { m: "smile", b: "high", e: "heart", blush: 1 }, wink: { m: "smile", b: "mid", e: "wink" }, flat: { m: "flat", b: "low" },
  tired: { m: "tired", b: "low", e: "half" }, excited: { m: "open", b: "high", e: "wide", blush: 1 }, embarrassed: { m: "wavy", b: "up", blush: 2, look: 0.6 },
  disgust: { m: "angry", b: "down", e: "half", tongue: 1 }, proud: { m: "smile", b: "mid", e: "closedUp" },
};
// talking mouth shapes (visemes) for lip-sync: a e o m f l
L.VISEMES = { a: "talkA", e: "talkE", o: "talkO", m: "talkM", f: "talkF", l: "talkL" };
L.face = (fx, fy, R, kind = "smile", o = {}) => {
  const F = L.FACES[kind] || L.FACES.smile, eyes = o.eyes || "v3", look = Math.max(-1, Math.min(1, (o.look ?? F.look ?? 0))), ink = "ink";
  const X = (v) => fx + v * R, Y = (v) => fy + v * R, lw = Math.max(2.5, R * 0.07) * (o.olK || 1), out = [];
  const st = (d, k = 1, c = ink) => out.push(L.tag("path", { d, fill: "none", stroke: L.c(c), "stroke-width": lw * k, "stroke-linecap": "round", "stroke-linejoin": "round" }));
  const fl = (d, c, op) => out.push(L.tag("path", { d, fill: L.c(c), opacity: op }));
  const e = F.e || "open", ey = -0.08;
  [-1, 1].forEach((sd) => {
    const ex = X(sd * 0.34), eyy = Y(ey), er = 0.21 * R * (e === "wide" ? 1.2 : 1), pr = (e === "wide" ? 0.08 : 0.1) * R;
    const closed = e === "closed" || (e === "wink" && sd === 1);
    if (closed) st(L.arc(ex, eyy, er * 0.85, 20, 160), 0.9);
    else if (e === "closedUp") st(L.arc(ex, eyy + er * 0.3, er * 0.85, 200, 340), 0.9);
    else if (e === "spiral") st(L.smooth(Array.from({ length: 14 }, (_, i) => { const a = i * 0.9, r = er * (0.15 + i * 0.065); return [ex + Math.cos(a) * r, eyy + Math.sin(a) * r]; })), 0.6);
    else if (e === "heart") fl(`M${f1(ex)} ${f1(eyy + er)} C${f1(ex - er * 1.6)} ${f1(eyy - er * 0.2)} ${f1(ex - er * 0.6)} ${f1(eyy - er * 1.3)} ${f1(ex)} ${f1(eyy - er * 0.35)} C${f1(ex + er * 0.6)} ${f1(eyy - er * 1.3)} ${f1(ex + er * 1.6)} ${f1(eyy - er * 0.2)} ${f1(ex)} ${f1(eyy + er)} Z`, "red");
    else if (eyes === "dot") fl(L.circ(ex + look * er * 0.4, eyy, R * (e === "wide" ? 0.11 : 0.085)), ink);
    else if (eyes === "pie") { out.push(L.tag("path", { d: L.circ(ex, eyy - er * 0.2, er * 0.75, er * 1.25), fill: L.c("white"), stroke: L.c(ink), "stroke-width": lw * 0.7 })); fl(`M${f1(ex + look * er * 0.3)} ${f1(eyy - er * 0.1)} m${f1(-er * 0.4)} 0 a${f1(er * 0.4)} ${f1(er * 0.7)} 0 1 0 ${f1(er * 0.8)} 0 a${f1(er * 0.4)} ${f1(er * 0.7)} 0 1 0 ${f1(-er * 0.8)} 0 M${f1(ex + look * er * 0.3)} ${f1(eyy - er * 0.1)} l${f1(er * 0.25)} ${f1(-er * 0.5)} l${f1(er * 0.1)} ${f1(er * 0.3)} Z`, ink); }
    else {
      out.push(L.tag("path", { d: L.circ(ex, eyy, er), fill: L.c("white"), stroke: L.c(ink), "stroke-width": lw * 0.75 }));
      const down = F.look && kind !== "nervous" && kind !== "embarrassed" ? 0.35 : 0, px = ex + look * (er - pr - lw * 0.4), py = eyy + down * (er - pr);
      fl(L.circ(px, py, pr), ink); fl(L.circ(px - pr * 0.35, py - pr * 0.35, pr * 0.32), "white");
      if (e === "half") fl(`M${f1(ex - er - 1)} ${f1(eyy)} A${f1(er + 1)} ${f1(er + 1)} 0 0 1 ${f1(ex + er + 1)} ${f1(eyy)} Z`, o.skinName || "white"), st(L.line([ex - er, eyy], [ex + er, eyy]), 0.75);
    }
    const b = F.b === "tilt" ? (sd < 0 ? BROW.high : BROW.low) : BROW[F.b];
    if (b) st(L.smooth([[ex - sd * 0.14 * R, Y(b[0])], [ex + sd * 0.02 * R, Y((b[0] + b[1]) / 2 - 0.05)], [ex + sd * 0.2 * R, Y(b[1])]]), 0.8);
    if (F.tear) out.push(L.tag("path", { d: L.smooth([[ex, Y(0.2)], [ex - 0.08 * R, Y(0.36)], [ex, Y(0.46)], [ex + 0.08 * R, Y(0.36)], [ex, Y(0.2)]]), fill: L.c("sky"), stroke: L.c("blue"), "stroke-width": lw * 0.5 }));
    if (F.blush) fl(L.circ(X(sd * 0.56), Y(0.24), 0.13 * R * F.blush ** 0.5, 0.08 * R), "pink", 0.85);
    if (F.green) fl(L.circ(X(sd * 0.5), Y(0.25), 0.16 * R, 0.1 * R), "green", 0.35);
  });
  const mk = o.mouth ? L.VISEMES[o.mouth] : F.m, red = "#8c2f39";
  const fillM = (d) => out.push(L.tag("path", { d, fill: red, stroke: L.c(ink), "stroke-width": lw * 0.8, "stroke-linejoin": "round" }));
  if (mk === "open" || mk === "talkA") fillM(L.smooth([[X(-0.32), Y(0.3)], [X(0), Y(0.34)], [X(0.32), Y(0.3)], [X(0.2), Y(mk === "talkA" ? 0.66 : 0.58)], [X(0), Y(mk === "talkA" ? 0.72 : 0.64)], [X(-0.2), Y(mk === "talkA" ? 0.66 : 0.58)], [X(-0.32), Y(0.3)]]));
  else if (mk === "laugh") fillM(L.smooth([[X(-0.36), Y(0.26)], [X(0.36), Y(0.26)], [X(0.22), Y(0.62)], [X(0), Y(0.7)], [X(-0.22), Y(0.62)], [X(-0.36), Y(0.26)]]));
  else if (mk === "o" || mk === "talkO") fillM(L.circ(X(0), Y(0.5), 0.11 * R, 0.15 * R));
  else if (mk === "O") fillM(L.circ(X(0), Y(0.52), 0.17 * R, 0.24 * R));
  else if (mk === "teeth") { out.push(L.tag("path", { d: L.rrect(X(-0.3), Y(0.36), 0.6 * R, 0.24 * R, 0.06 * R), fill: L.c("white"), stroke: L.c(ink), "stroke-width": lw * 0.8 })); st(L.line([X(-0.3), Y(0.48)], [X(0.3), Y(0.48)]), 0.5); }
  else if (mk === "talkE") fillM(L.smooth([[X(-0.3), Y(0.38)], [X(0), Y(0.36)], [X(0.3), Y(0.38)], [X(0), Y(0.56)], [X(-0.3), Y(0.38)]]));
  else if (mk === "talkM") st(L.line([X(-0.18), Y(0.46)], [X(0.18), Y(0.46)]), 1.1);
  else if (mk === "talkF") { fillM(L.smooth([[X(-0.22), Y(0.42)], [X(0.22), Y(0.42)], [X(0.12), Y(0.52)], [X(-0.12), Y(0.52)], [X(-0.22), Y(0.42)]])); st(L.line([X(-0.16), Y(0.43)], [X(0.16), Y(0.43)]), 0.6, "white"); }
  else if (mk === "talkL") fillM(L.circ(X(0), Y(0.48), 0.16 * R, 0.12 * R));
  else st(L.smooth((MOUTH[mk] || MOUTH.smile).map((p) => [X(p[0]), Y(p[1])])), 0.85);
  if (F.tongue) fl(L.circ(X(0.08), Y(0.56), 0.09 * R, 0.07 * R), "pink");
  if (F.sweat) out.push(L.tag("path", { d: `M${f1(X(0.95))} ${f1(Y(-0.55))} Q${f1(X(1.2))} ${f1(Y(-0.1))} ${f1(X(0.95))} ${f1(Y(-0.05))} Q${f1(X(0.72))} ${f1(Y(-0.1))} ${f1(X(0.95))} ${f1(Y(-0.55))} Z`, fill: L.c("sky"), stroke: L.c("blue"), "stroke-width": lw * 0.5 }));
  if (F.vein) st(`M${f1(X(0.45))} ${f1(Y(-0.85))} l${f1(0.12 * R)} ${f1(0.08 * R)} l${f1(-0.06 * R)} ${f1(0.1 * R)} M${f1(X(0.62))} ${f1(Y(-0.78))} l${f1(-0.04 * R)} ${f1(0.14 * R)}`, 0.7, "red");
  if (F.q) out.push(L.text("?", X(1.25), Y(-0.7), { size: R * 0.9, c: "ink" }));
  if (F.zzz) out.push(L.text("z", X(1.1), Y(-0.6), { size: R * 0.5 }) + L.text("Z", X(1.45), Y(-1.0), { size: R * 0.7 }));
  return out.join("");
};

// ---------- outfits (torso clothes). Returns markup over the body; sh, hip = [x,y]; s scale; W width k; c colour ----------
L.OUTFITS = {
  none: () => "",
  tee: (sh, hip, s, W, c) => L.shape(L.rrect(sh[0] - 32 * s * W, sh[1] - 2 * s, 64 * s * W, hip[1] - sh[1] + 16 * s, 12 * s), c, { w: "char", s }),
  hoodie: (sh, hip, s, W, c) => L.shape(L.rrect(sh[0] - 36 * s * W, sh[1] - 4 * s, 72 * s * W, hip[1] - sh[1] + 18 * s, 16 * s), c, { w: "char", s }) + L.stroke(L.rrect(sh[0] - 20 * s, hip[1] - 40 * s, 40 * s, 24 * s, 6 * s), { w: "hair", s }),
  dress: (sh, hip, s, W, c) => L.shape(L.poly([[sh[0] - 26 * s * W, sh[1] - 2 * s], [sh[0] + 26 * s * W, sh[1] - 2 * s], [sh[0] + 30 * s * W, hip[1] - 40 * s], [sh[0] + 62 * s * W, hip[1] + 52 * s], [sh[0] - 62 * s * W, hip[1] + 52 * s], [sh[0] - 30 * s * W, hip[1] - 40 * s]], true), c, { w: "char", s }),
  skirt: (sh, hip, s, W, c) => L.shape(L.rrect(sh[0] - 30 * s * W, sh[1] - 2 * s, 60 * s * W, hip[1] - sh[1] - 10 * s, 12 * s), "white", { w: "char", s }) + L.shape(L.poly([[sh[0] - 30 * s * W, hip[1] - 14 * s], [sh[0] + 30 * s * W, hip[1] - 14 * s], [sh[0] + 52 * s * W, hip[1] + 44 * s], [sh[0] - 52 * s * W, hip[1] + 44 * s]], true), c, { w: "char", s }),
};

// ---------- the figure ----------
L.person = (o = {}) => {
  // Look token stick: every person in every asset becomes the pure stick figure (man02 / girl02): no clothes, white circle head
  // (Black Hole Life default since 2026-10-22, Look K). Girls keep their hair so they still read as girls; accessories stay.
  if (L.T.stick) { const girl = /^girl/.test(o.style || "") || /^(bun|ponytail|long|bob|curlyLong|braids|pixie|hijab)/.test(o.hair || "");
    o = Object.assign({}, o, { style: girl ? "girl02" : "man02", outfit: "none", hair: girl ? (o.hair || (L.CAST[o.style] || {}).hair || "ponytail") : "tick", skin: undefined }); }
  const st = L.CAST[o.style || "man01"] || L.CAST.man01, body = L.BODIES[o.body || st.body || "regular"] || {}, T = L.T;
  const s = (o.s || 1) * (body.scale || 1), leg = body.leg || 1, torso = body.torso || 1, W = body.width || 1;
  const R = 50 * s * (st.head.ratio || 1) * (T.head.ratio || 1) * (body.headK || 1);
  const shape = st.head.shape || T.head.shape, headFill = st.head.fill || T.head.fill;
  const limbStyle = st.limb.style || T.limb.style, limbK = (st.limb.k || 1) * (T.limb.k || 1) * (body.limbK || 1);
  const olK = st.olK || 1, lw = L.T.line.char * Math.sqrt(Math.max(s, 0.3)) * olK, lwOut = T.ink === "none" ? 0 : lw;
  const skin = o.skin || st.skin || "s2", skinName = headFill === "white" ? "white" : skin;
  const hipY = -(o.sit ? 10 : 130 * leg) * s, hip = [0, hipY], sh = [0, hipY - 125 * torso * s], hd = [0, sh[1] - R - 4 * s];
  const lean = body.stoop ? 8 : 0;
  const pose = L.POSES[o.pose || "stand"] || L.POSES.stand, legs = o.legs || (L.POSE_LEGS[o.pose] || (o.sit ? L.LEGS.sit : L.LEGS.stand));
  const outfit = o.outfit ?? st.outfit, outC = o.outfitC || st.outfitC || "blue", hairK = o.hair ?? st.hair, hairC = o.hairC || st.hairC || (body.stoop ? "gray" : "brown");
  const clothed = outfit && outfit !== "none" || ["bean", "block", "capsule"].includes(st.torso);
  const abY = sh[1] + 16 * s, abx = clothed ? 24 * s * W * (body.sh || 1) : 0, abL = [-abx, abY], abR = [abx, abY];
  const pts = (base, rel, k = 1) => [base, ...rel.map((p) => [base[0] + p[0] * s * k, base[1] + p[1] * s * k])];
  const ink = L.outline(st.flat ? outC : null);
  // a limb in the chosen style (fill = clothes/skin colour for thick styles)
  const limb = (p, fillName) => {
    const wk = lw * limbK;
    if (limbStyle === "stick") return L.tag("path", { d: L.poly(p), fill: "none", stroke: ink === "none" ? L.c("ink") : ink, "stroke-width": wk, "stroke-linecap": T.cap, "stroke-linejoin": T.join });
    let q = p;
    if (limbStyle === "hose") { const [a, b, c] = p; q = Array.from({ length: 9 }, (_, i) => { const t = i / 8, u = 1 - t; return [u * u * a[0] + 2 * u * t * b[0] + t * t * c[0], u * u * a[1] + 2 * u * t * b[1] + t * t * c[1]]; }); }
    const w0 = wk * (limbStyle === "taper" ? 3.4 : 2.6), w1 = wk * (limbStyle === "taper" ? 1.4 : limbStyle === "hose" ? 2.2 : 2.6);
    return L.tag("path", { d: L.limb(q, w0, w1), fill: L.paint(fillName, { flat: st.flat }), stroke: ink, "stroke-width": lwOut * 0.8, "stroke-linejoin": "round" });
  };
  const legFill = clothed ? (outfit === "dress" || outfit === "skirt" ? skinName : "navy") : skinName;
  const armFill = o.armC || (clothed ? outC : skinName); // o.armC: bare arms (caveman) or different sleeves (knight)
  const head = () => {
    const d = shape === "oval" ? L.circ(hd[0], hd[1], R * 0.86, R * 1.08) : shape === "bean" ? L.smooth([[hd[0], hd[1] - R], [hd[0] + R * 0.95, hd[1] - R * 0.35], [hd[0] + R * 0.8, hd[1] + R * 0.8], [hd[0] - R * 0.1, hd[1] + R * 1.02], [hd[0] - R * 0.9, hd[1] + R * 0.5], [hd[0] - R * 0.9, hd[1] - R * 0.5], [hd[0], hd[1] - R]]) : L.circ(hd[0], hd[1], R);
    return L.tag("path", { d, fill: headFill === "none" ? L.c("white") : L.paint(skinName, { flat: st.flat }), stroke: ink === "none" ? L.c(skinName, 2) : ink, "stroke-width": ink === "none" ? lw * 0.5 : lw, "stroke-linejoin": "round" });
  };
  const hair = (L.HAIR[hairK] || L.HAIR.none)(hd[0], hd[1], R, hairC);
  const out = [];
  out.push(L.shadow(0, 0, 150 * s * W));
  const parts = [];
  if (hair.back) parts.push(hair.back);
  parts.push(limb(pts(hip, legs[0], leg), legFill), limb(pts(hip, legs[1], leg), legFill));
  if (limbStyle !== "stick") parts.push(...[legs[0], legs[1]].map((l) => { const e = l[l.length - 1]; return L.shape(L.circ(e[0] * s * leg + (e[0] < 0 ? -8 : 8) * s, hip[1] + e[1] * s * leg + 2 * s, 16 * s, 9 * s), "ink", { w: "hair", s }); })); // shoes
  // torso
  const tw = 34 * s * W;
  if (st.torso === "bean") parts.push(L.shape(L.smooth([[0, sh[1] - 6 * s], [tw * 1.1, sh[1] + 20 * s], [tw * 1.2, hip[1] - 10 * s], [0, hip[1] + 18 * s], [-tw * 1.2, hip[1] - 10 * s], [-tw * 1.1, sh[1] + 20 * s], [0, sh[1] - 6 * s]]), outC, { w: "char", s: s * olK * olK, flat: st.flat }));
  else if (st.torso === "block") parts.push(L.shape(L.rrect(-tw * 1.1, sh[1] - 4 * s, tw * 2.2, hip[1] - sh[1] + 18 * s, 6 * s), outC, { w: "char", s: s * olK * olK, flat: st.flat }));
  else if (st.torso === "capsule") parts.push(L.shape(L.rrect(-tw * 1.15, sh[1] - 4 * s, tw * 2.3, hip[1] - sh[1] + 22 * s, tw * 1.1), outC, { w: "char", s: s * olK * olK, flat: st.flat }));
  else {
    parts.push(L.tag("path", { d: L.line([0, hd[1] + R], hip), stroke: ink === "none" ? L.c("ink") : ink, "stroke-width": lw * limbK, "stroke-linecap": "round" }));
    if (outfit && outfit !== "none") parts.push((L.OUTFITS[outfit] || L.OUTFITS.tee)(sh, hip, s, W, outC));
  }
  if (body.belly) parts.push(L.shape(L.circ(6 * s, hip[1] - 40 * s, 44 * s * W * 0.8, 40 * s), outfit === "none" ? skinName : outC, { w: "char", s }));
  parts.push(head());
  if (hair.front) parts.push(hair.front);
  const anc = { hd, R, sh, hip, s, W, abL, abR, hands: [pts(abL, pose[0]).pop(), pts(abR, pose[1]).pop()], skinName, outC, hairC, shape };
  const acc = [].concat(o.acc || []), accFront = acc.filter((a) => !(L.ACC[a] || {}).front), accTop = acc.filter((a) => (L.ACC[a] || {}).front);
  accFront.forEach((a) => L.ACC[a] && parts.push(L.ACC[a].draw(anc, o)));
  parts.push(L.face(hd[0], hd[1] + (shape === "oval" ? R * 0.05 : 0), R * (shape === "oval" ? 0.9 : 1), o.face || "smile", { eyes: st.eyes, look: o.look, mouth: o.mouth, olK, skinName }));
  // arms in front (+ muscles, hands)
  [[abL, pose[0]], [abR, pose[1]]].forEach(([root, rel]) => {
    const p = pts(root, rel); parts.push(limb(p, armFill));
    if (body.muscle) { const m = [(p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2]; parts.push(L.shape(L.circ(m[0], m[1] - 4 * s, 15 * s * limbK * 0.6, 12 * s * limbK * 0.6), clothed ? armFill : skinName, { w: "detail", s })); }
    const hand = p[p.length - 1], hs = o.hands || st.hands;
    if (hs === "glove") parts.push(L.shape(L.circ(hand[0], hand[1], 15 * s), "white", { w: "char", s: s * 0.6 }));
    else if (limbStyle !== "stick") parts.push(L.shape(L.circ(hand[0], hand[1], 11 * s * Math.max(1, limbK * 0.8)), skinName, { w: "detail", s }));
  });
  accTop.forEach((a) => parts.push(L.ACC[a].draw(anc, o)));
  out.push(lean ? L.g(parts.join(""), `rotate(${lean * 0.6} 0 ${f1(hipY)})`) : parts.join("")); // elderly: stoop from the hips
  return out.join("");
};
L.reg("cast", "person", (o) => L.person(o), { box: [-170, -400, 340, 420], selfScale: true, tags: ["figure", "character"], call: 'L.put(S, "person", x, gy, { style: "man01", body, skin, hair, outfit, outfitC, face, pose, s, t })' });
// the cast styles, each its own asset (shown in the pick sheet with 5 poses)
Object.keys(L.CAST).forEach((k) => L.reg("cast", k, (o) => L.person(Object.assign({ style: k }, o)), { box: [-170, -400, 340, 420], selfScale: true, label: L.CAST[k].label, tags: [k.startsWith("girl") ? "girl" : "man", "cast"], call: `L.put(S, "${k}", x, gy, { pose, face, s, t })` }));
})();
