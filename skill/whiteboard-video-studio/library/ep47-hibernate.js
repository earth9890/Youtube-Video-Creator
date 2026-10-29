// ===================== library/ep47-hibernate.js — hibernation props: door sign, bed, animals, cutaways, ship, gauges (ep47) =====================
(function () {
const L = window.L, f1 = L.f1;
const sm = (pts) => L.smooth(pts.concat([pts[0]]));          // closed smooth blob through points
const zz = (x, y, k = 1, c = "navy") => L.text("Z", x, y, { size: 46 * k, c }) + L.text("z", x + 34 * k, y - 38 * k, { size: 34 * k, c }) + L.text("z", x + 62 * k, y - 66 * k, { size: 24 * k, c });
const eyeArc = (x, y, r, flip) => L.stroke(`M${f1(x - r)} ${f1(y)} Q${f1(x)} ${f1(y + (flip ? -r : r) * 0.9)} ${f1(x + r)} ${f1(y)}`, { w: "detail" });

// ---------- the sign on Dave's door (runner object) ----------
// origin = the nail (top centre); the board hangs below. lines[0] is printed big, the rest are Dave's additions.
// cap = lines the board has room for; only = draw just that one line (no board) so it can fade in on its word
L.reg("objects", "ep47-sign", (o) => {
  const lines = o.lines || ["BACK IN APRIL"], cap = Math.max(o.cap || lines.length, lines.length), W = 780, top = 70, lh = 76, H = 170 + (cap - 1) * lh;
  const cols = o.colors || [];
  const txt = (i) => {
    const t = lines[i]; if (t === undefined) return "";
    const big = i === 0, size = big ? 92 : Math.min(48, 700 / (t.length * 0.56)), y = big ? top + 112 : top + 170 + (i - 1) * lh;
    return L.text(t, 0, y, { size, c: cols[i] || (big ? "ink" : "blue"), weight: 700 });
  };
  if (o.only !== undefined) return txt(o.only);
  let s = L.stroke(`M0 0 L${-W / 2 + 70} ${top + 6} M0 0 L${W / 2 - 70} ${top + 6}`, { w: "detail", c: "stone" });
  s += L.shape(L.rrect(-W / 2, top, W, H, 26), "wood", { w: "prop" });
  s += L.shape(L.rrect(-W / 2 + 16, top + 16, W - 32, H - 32, 16), "cream", { w: "detail", flat: true });
  s += L.shape(L.circ(0, 0, 11), "gray", { w: "detail" });
  s += L.shape(L.circ(-W / 2 + 70, top + 6, 8), "gray", { w: "detail" }) + L.shape(L.circ(W / 2 - 70, top + 6, 8), "gray", { w: "detail" });
  for (let i = 0; i < lines.length; i++) s += txt(i);
  return s;
}, { box: [-400, -20, 800, 560], group: "Hibernation", label: "Door sign · BACK IN APRIL (+ lines)", tags: ["sign", "door", "back in april", "note", "board", "ep47"],
  call: 'L.put(S, "ep47-sign", x, yNail, { s, t, lines: ["BACK IN APRIL", "bladder not available"], cap: 2, only: 1, colors: ["ink", "blue", "red"] })',
  demo: { lines: ["BACK IN APRIL", "bladder not available", "small tail, hot room"] } });

// ---------- Dave's front door, wide (outside, winter night) and close-up (the sign is readable) ----------
L.reg("scenery", "ep47-scene-door", (o) => {
  const day = o.time === "day", close = !!o.close;
  let s = L.flat(L.rect(0, 0, 1920, 1080), day ? "sky" : "night");
  if (!day) { const r = L.rng(47); for (let i = 0; i < 38; i++) s += L.flat(L.circ(r() * 1920, r() * 360, 1.5 + r() * 2.2), "white", 0.5 + r() * 0.4); }
  const dx = close ? 700 : 1020, dw = close ? 760 : 300, dh = close ? 1000 : 520, gy = close ? 900 : 800, dt = gy - dh;
  // house wall with siding
  const wx = close ? -40 : 640;
  s += L.shape(L.rect(wx, close ? -40 : 90, 2000 - wx, gy - (close ? -40 : 90)), "wall", { w: "scene", flat: true });
  for (let y = (close ? 40 : 150); y < gy - 20; y += close ? 78 : 52) s += L.stroke(`M${wx} ${y} H1960`, { w: "hair", c: "wall" });
  if (!close) {
    s += L.shape(L.poly([[600, 100], [1960, 100], [1960, 20], [700, 20]], true), "wood", { w: "scene", tone: 2 });           // eave
    s += L.shape(L.rrect(620, 60, 1340, 56, 18), "snow", { w: "detail", flat: true });                                          // snow on the eave
  }
  // door
  s += L.shape(L.rect(dx - 24, dt - 24, dw + 48, dh + 24), "wood", { w: "scene", tone: 2 });
  s += L.shape(L.rect(dx, dt, dw, dh), "red", { w: "scene", tone: 2 });
  const pw = dw * 0.36, ph = dh * 0.3;
  for (const [px, py] of [[dx + dw * 0.1, dt + dh * 0.08], [dx + dw * 0.54, dt + dh * 0.08], [dx + dw * 0.1, dt + dh * 0.5], [dx + dw * 0.54, dt + dh * 0.5]]) s += L.shape(L.rrect(px, py, pw, ph, 10), "red", { w: "detail", tone: 0 });
  s += L.shape(L.circ(dx + dw * 0.88, dt + dh * 0.55, close ? 20 : 11), "gold", { w: "detail" });
  // snowy ground
  s += L.shape(L.rect(-40, gy, 2000, 1160 - gy), "snow", { w: "scene", flat: true });
  s += L.shape(L.rrect(dx - 40, gy - 14, dw + 80, 34, 14), "snow", { w: "detail", tone: 1 });
  s += L.shape(L.rrect(dx + dw * 0.2, gy + 22, dw * 0.6, 26, 10), "brown", { w: "detail", flat: true, tone: 1 });                  // doormat
  if (!day) s += L.flat(L.rect(-40, -40, 2000, 1160), "navy", 0.3);   // night tint on the whole street (window and lamp stay lit)
  // window with a warm light (not on the close-up: the door fills the frame)
  if (!close) {
    s += L.shape(L.rect(1450, 330, 300, 250), "yellow", { w: "scene", flat: true, tone: 1 }) + L.stroke("M1600 330 V580 M1450 455 H1750", { w: "detail" }) + L.shape(L.rrect(1430, 580, 340, 28, 8), "snow", { w: "detail", flat: true });
  }
  // porch lamp (wide only)
  if (!close) { s += L.shape(L.rrect(1380, 360, 36, 70, 8), "gold", { w: "detail", tone: 1 }); s += L.flat(L.circ(1398, 395, 70), "yellow", 0.16); }
  if (!close) { const r = L.rng(5); for (let i = 0; i < 40; i++) s += L.flat(L.circ(r() * 1920, gy + 20 + r() * 240, 3 + r() * 5), "snow", 0.8); }
  const r2 = L.rng(9); for (let i = 0; i < (o.flakes ?? 70); i++) s += L.flat(L.circ(r2() * 1920, r2() * 1000, 2 + r2() * 3.4), "white", 0.55 + r2() * 0.35);   // falling snow: small, still
  return s;
}, { box: [0, 0, 1920, 1080], wide: true, group: "Hibernation", label: "Dave's front door · winter (wide / close)", tags: ["door", "house", "winter", "night", "snow", "front door", "ep47"],
  call: 'L.put(S, "ep47-scene-door", 0, 0, { close: false, time: "night" })  // close-up: door x 700..1460, nail for the sign at (1080, 150)', demo: { close: true } });

// ---------- Dave's bedroom (no furniture but a nightstand + lamp; the bed is ep47-bed). time: "dark" (moonlit, lamp low) | "light" ----------
L.reg("scenery", "ep47-scene-bedroom", (o) => {
  const dark = o.time !== "light", fy = 790;
  let s = L.shape(L.rect(-40, -40, 2000, fy + 40), dark ? "night" : "wall", { w: "scene", flat: true, tone: dark ? 2 : 0 });
  s += L.shape(L.rect(-40, fy, 2000, 1160 - fy), dark ? "navy" : "floor", { w: "scene", flat: true, tone: dark ? 1 : 0 });
  for (let i = 0; i < 9; i++) s += L.stroke(`M${960 + (i - 4) * 120} ${fy} L${960 + (i - 4) * 420} 1100`, { w: "hair", c: dark ? "navy" : "floor" });
  s += L.shape(L.rect(-40, fy - 22, 2000, 26), dark ? "night" : "paper", { w: "detail", flat: true, tone: dark ? 0 : 2 });
  // window: snowy night / grey winter day, moon in the night one
  s += L.shape(L.rect(200, 120, 330, 400), dark ? "navy" : "sky", { w: "scene", flat: true, tone: dark ? 1 : 1 });
  if (dark) { s += L.flat(L.circ(430, 220, 46), "cream", 1) + L.flat(L.circ(414, 206, 46), "navy", 0.9); const r = L.rng(2); for (let i = 0; i < 14; i++) s += L.flat(L.circ(210 + r() * 310, 130 + r() * 250, 1.6 + r() * 1.6), "white", 0.8); }
  s += L.shape(L.poly([[200, 520], [200, 470], [290, 440], [380, 460], [530, 430], [530, 520]], true), "snow", { w: "detail", flat: true });
  s += L.stroke("M365 120 V520 M200 320 H530", { w: "scene", c: "wood" }) + L.shape(L.rect(200, 120, 330, 400), "wood", { w: "scene", op: 0 });
  s += L.shape(L.rrect(180, 520, 370, 30, 8), "wood", { w: "prop" });
  if (dark) s += L.flat(L.poly([[200, 520], [530, 520], [760, 790], [0, 790]], true), "cream", 0.07);
  // nightstand + lamp
  s += L.shape(L.rrect(1640, fy - 170, 200, 190, 12), "wood", { w: "prop" }) + L.shape(L.circ(1740, fy - 110, 9), "gold", { w: "detail" }) + L.stroke(`M1650 ${fy - 85} H1830`, { w: "hair", c: "wood" });
  s += L.shape(L.rect(1730, fy - 250, 20, 80), "gray", { w: "detail" }) + L.shape(L.poly([[1690, fy - 250], [1790, fy - 250], [1774, fy - 330], [1706, fy - 330]], true), dark ? "orange" : "yellow", { w: "prop", tone: 1 });
  s += L.flat(L.circ(1740, fy - 290, dark ? 110 : 190), "yellow", dark ? 0.22 : 0.18);
  // a framed winter picture
  s += L.shape(L.rrect(1010, 190, 260, 190, 10), "wood", { w: "prop" }) + L.shape(L.rect(1026, 206, 228, 158), dark ? "navy" : "sky", { w: "detail", flat: true });
  s += L.shape(L.poly([[1026, 364], [1100, 290], [1150, 330], [1200, 270], [1254, 364]], true), "snow", { w: "detail", flat: true });
  return s;
}, { box: [0, 0, 1920, 1080], wide: true, group: "Hibernation", label: "Dave's bedroom · moonlit / light (no bed)", tags: ["bedroom", "room", "night", "window", "snow", "lamp", "ep47"],
  call: 'L.put(S, "ep47-scene-bedroom", 0, 0, { time: "dark"|"light" })  // floor y 790; put ep47-bed at y~925', demo: { time: "dark" } });

// ---------- Dave in bed (side view). face: sleep | open | worried ----------
L.reg("interiors", "ep47-bed", (o) => {
  const face = o.face || "sleep", bl = o.blanket || "blue";
  let s = L.shadow(0, 0, 700);
  s += L.shape(L.rrect(-318, -230, 40, 230, 12), "wood", { w: "prop", tone: 1 });                       // headboard
  s += L.shape(L.rrect(-300, -62, 620, 36, 8), "wood", { w: "prop" });                                  // frame
  s += L.shape(L.rrect(300, -120, 26, 120, 10), "wood", { w: "prop", tone: 1 });                        // footboard
  s += L.shape(L.rect(-290, -26, 22, 26), "wood", { w: "detail", tone: 2 }) + L.shape(L.rect(280, -26, 22, 26), "wood", { w: "detail", tone: 2 });
  s += L.shape(L.rrect(-290, -112, 600, 54, 20), "white", { w: "prop" });                               // mattress
  if (o.dave !== false) {
    s += L.shape(L.circ(-216, -140, 66, 30), "paper", { w: "prop", tone: 1 });                          // pillow
    s += L.shape(L.circ(-214, -176, 46), "white", { w: "char" });                                       // head
    s += L.stroke("M-232 -219 q6 -12 14 -4 M-214 -222 q8 -10 12 0", { w: "hair" });                      // hair tuft
    if (face === "sleep") s += eyeArc(-228, -176, 9) + eyeArc(-198, -176, 9) + L.stroke("M-218 -154 h10", { w: "detail" });
    else if (face === "open") s += L.flat(L.circ(-228, -178, 5), "ink") + L.flat(L.circ(-198, -178, 5), "ink") + L.shape(L.circ(-213, -154, 5, 7), "red", { w: "hair", tone: 2 });
    else s += L.flat(L.circ(-228, -178, 5), "ink") + L.flat(L.circ(-198, -178, 5), "ink") + L.stroke("M-238 -194 l18 6 M-190 -194 l-18 6 M-226 -154 q12 -8 24 0", { w: "detail" }) + L.flat("M-168 -186 q-8 14 0 22 q8 -8 0 -22 Z", "sky");
    s += L.shape(sm([[-170, -150], [-110, -176], [10, -168], [150, -164], [300, -142], [312, -108], [296, -66], [-170, -66], [-176, -110]]), bl, { w: "prop" });   // blanket over the body
    s += L.stroke("M-120 -166 q30 40 20 96 M60 -166 q20 40 10 98", { w: "hair", c: bl });
    if (face === "sleep" && o.zzz !== false) s += zz(-160, -250, 1.1);
  } else {
    s += L.shape(L.circ(-216, -140, 66, 30), "paper", { w: "prop", tone: 1 });
    s += L.shape(sm([[-170, -140], [-110, -150], [10, -144], [150, -140], [300, -130], [312, -108], [296, -66], [-170, -66]]), bl, { w: "prop" });
  }
  return s;
}, { box: [-340, -300, 680, 320], group: "Hibernation", label: "Dave in bed · side view (sleep / open / worried)", tags: ["bed", "dave", "sleep", "bedroom", "blanket", "ep47"],
  call: 'L.put(S, "ep47-bed", x, floorY, { s, t, face: "sleep"|"open"|"worried", blanket: "blue", zzz: true, dave: true })', demo: { face: "sleep" } });

// ---------- animals (all face right; flip with L.put) ----------
L.reg("animals", "ep47-bear", (o) => {                              // black bear: awake on all fours, or curled asleep (sleep: true)
  const B = "brown";
  let s = L.shadow(0, 0, 400);
  if (o.sleep) {
    s += L.shape(sm([[-190, -20], [-196, -90], [-140, -156], [-50, -184], [60, -170], [140, -120], [176, -50], [160, -8], [-150, -4]]), B, { w: "char" });
    s += L.shape(L.circ(-110, -34, 58, 28), B, { w: "detail", tone: 2 });                           // hind leg tucked
    s += L.shape(L.circ(150, -66, 54), B, { w: "char" });                                         // head resting on the paws
    s += L.shape(L.circ(112, -118, 18), B, { w: "detail", tone: 2 }) + L.shape(L.circ(112, -118, 9), "earth", { w: "hair" });
    s += L.shape(L.circ(186, -50, 28, 22), "earth", { w: "detail" }) + L.flat(L.circ(204, -58, 8, 6), "ink");
    s += eyeArc(158, -84, 8) + L.shape(L.circ(150, -18, 30, 16), B, { w: "detail", tone: 1 });
    if (o.zzz !== false) s += zz(190, -150, 1.1);
    return s;
  }
  s += L.shape(L.rrect(-130, -88, 46, 90, 20), B, { w: "detail", tone: 2 }) + L.shape(L.rrect(88, -88, 46, 90, 20), B, { w: "detail", tone: 2 });
  s += L.shape(sm([[-176, -110], [-160, -176], [-90, -212], [10, -216], [100, -192], [140, -136], [146, -72], [112, -40], [-120, -34], [-178, -58]]), B, { w: "char" });
  s += L.shape(L.rrect(-170, -90, 52, 92, 22), B, { w: "detail" }) + L.shape(L.rrect(72, -90, 52, 92, 22), B, { w: "detail" });
  s += L.shape(L.circ(158, -150, 56), B, { w: "char" }) + L.shape(L.circ(136, -204, 20), B, { w: "detail", tone: 2 }) + L.shape(L.circ(136, -204, 9), "earth", { w: "hair" });
  s += L.shape(L.circ(208, -128, 32, 25), "earth", { w: "detail" }) + L.flat(L.circ(228, -136, 9, 7), "ink") + L.flat(L.circ(176, -166, 6), "ink") + L.flat(L.circ(177, -167, 2), "white");
  return s;
}, { box: [-220, -260, 440, 280], group: "Hibernation", label: "Black bear · awake / curled asleep", tags: ["bear", "black bear", "hibernate", "sleep", "winter", "ep47"],
  call: 'L.put(S, "ep47-bear", x, gy, { s, t, sleep: true, zzz: true, flip })', demo: { sleep: false } });

L.reg("animals", "ep47-squirrel", (o) => {                          // arctic ground squirrel: fat 0..1 (round), sleep curls it into a ball
  const fat = o.fat || 0, B = "earth";
  let s = L.shadow(0, 0, 200 + fat * 60);
  if (o.sleep) {
    s += L.shape(L.circ(0, -62, 66 + fat * 14, 60 + fat * 12), B, { w: "char" });
    s += L.shape(L.circ(28, -50, 34 + fat * 6), "sand", { w: "detail", flat: true, tone: 1 });
    s += L.shape(L.circ(-22, -48, 36), B, { w: "detail", tone: 2 });                                // head tucked in
    s += L.shape(L.circ(-48, -78, 11), B, { w: "detail", tone: 2 }) + eyeArc(-22, -52, 6) + L.flat(L.circ(-5, -42, 5, 4), "ink");
    s += L.shape(L.limb([[-62, -10], [-30, 10], [40, 12], [74, -8]], 22, 14), "sand", { w: "detail" });   // tail wrapped around
    if (o.zzz) s += zz(40, -126, 0.7);
    return s;
  }
  const bx = 0, ry = 44 + fat * 34, rx = 66 + fat * 24;
  s += L.shape(L.limb([[-rx + 8, -50], [-rx - 40, -70], [-rx - 56, -36], [-rx - 40, -6]], 30, 14), "sand", { w: "detail", tone: 1 });   // thin tail
  s += L.shape(L.circ(bx, -ry - 14, rx, ry), B, { w: "char" });
  for (const [px, py] of [[-20, -ry - 40], [18, -ry - 52], [-4, -ry - 22]]) s += L.flat(L.circ(px, py, 5, 4), "sand", 0.9);
  s += L.shape(L.circ(18, -ry + 4, rx * 0.55, ry * 0.6), "sand", { w: "detail", flat: true, tone: 1, op: 0.9 });
  s += L.shape(L.rrect(-rx * 0.6, -26, 36, 28, 12), B, { w: "detail", tone: 2 }) + L.shape(L.rrect(rx * 0.3, -22, 22, 24, 10), B, { w: "detail", tone: 2 });
  const hx = rx - 6, hy = -ry - 38;
  s += L.shape(L.circ(hx, hy, 32), B, { w: "char" }) + L.shape(L.circ(hx - 14, hy - 28, 10), B, { w: "detail", tone: 2 });
  s += L.shape(L.circ(hx + 26, hy + 10, 14, 11), "sand", { w: "detail", flat: true }) + L.flat(L.circ(hx + 36, hy + 6, 4), "ink") + L.flat(L.circ(hx + 8, hy - 6, 4.5), "ink") + L.flat(L.circ(hx + 9, hy - 7, 1.6), "white");
  return s;
}, { box: [-170, -190, 340, 210], group: "Hibernation", label: "Arctic ground squirrel · thin / fat / curled asleep", tags: ["squirrel", "ground squirrel", "arctic", "hibernate", "fat", "ep47"],
  call: 'L.put(S, "ep47-squirrel", x, gy, { s, t, fat: 0..1, sleep: true, zzz: false, flip })', demo: { fat: 0 } });

L.reg("animals", "ep47-lemur", (o) => {                             // fat-tailed dwarf lemur: sitting up, or curled asleep (sleep: true); tail: 0.6..1.4
  const tk = o.tail || 1, G = "stone";
  let s = L.shadow(0, 0, 200);
  if (o.sleep) {
    s += L.shape(L.circ(0, -52, 56, 50), G, { w: "char" });
    s += L.shape(L.circ(16, -38, 30, 26), "cream", { w: "detail", flat: true });
    s += L.shape(L.circ(-6, -60, 32), G, { w: "char", tone: 1 });                                      // head tucked
    s += L.shape(L.circ(-26, -86, 9), G, { w: "detail", tone: 2 }) + L.shape(L.circ(10, -90, 9), G, { w: "detail", tone: 2 });
    s += L.shape(L.circ(-14, -62, 14, 10), "brown", { w: "hair", flat: true, op: 0.5 }) + eyeArc(-14, -62, 6) + L.flat(L.circ(8, -46, 4), "pink");
    s += L.shape(L.limb([[-54, -34], [-30, 4], [40, 12], [76, -18]], 34 * tk, 22 * tk), "cream", { w: "char", tone: 1 });  // the fat tail wraps around
    if (o.zzz) s += zz(40, -120, 0.7);
    return s;
  }
  s += L.shape(L.limb([[-30, -50], [-84, -34], [-96, 0]], 30 * tk, 40 * tk), "cream", { w: "char", tone: 1 });   // fat tail
  s += L.shape(sm([[-36, -78], [-26, -128], [8, -140], [38, -118], [40, -70], [26, -30], [-14, -26]]), G, { w: "char" });
  s += L.shape(sm([[-6, -118], [20, -112], [28, -76], [16, -46], [-6, -52]]), "cream", { w: "detail", flat: true });
  s += L.shape(L.limb([[-6, -26], [-4, -2]], 16, 14), G, { w: "detail" }) + L.shape(L.limb([[22, -34], [30, -2]], 16, 14), G, { w: "detail" });
  s += L.shape(L.limb([[22, -112], [44, -90], [40, -66]], 10, 8), G, { w: "detail" });
  const hx = 14, hy = -164;
  s += L.shape(L.circ(hx - 20, hy - 24, 12), G, { w: "detail", tone: 2 }) + L.shape(L.circ(hx + 20, hy - 24, 12), G, { w: "detail", tone: 2 });
  s += L.shape(L.circ(hx, hy, 34, 30), G, { w: "char" });
  for (const ex of [-14, 14]) s += L.shape(L.circ(hx + ex, hy - 2, 13), "brown", { w: "hair", tone: 2 }) + L.flat(L.circ(hx + ex + 2, hy - 2, 7), "ink") + L.flat(L.circ(hx + ex + 4, hy - 5, 2.5), "white");
  s += L.flat(L.circ(hx, hy + 14, 5, 4), "pink");
  return s;
}, { box: [-130, -200, 260, 220], group: "Hibernation", label: "Fat-tailed dwarf lemur · sitting / curled asleep", tags: ["lemur", "dwarf lemur", "fat tail", "madagascar", "primate", "hibernate", "ep47"],
  call: 'L.put(S, "ep47-lemur", x, gy, { s, t, sleep: true, tail: 1, zzz: false, flip })', demo: { sleep: false } });

// ---------- cutaways ----------
L.reg("scenery", "ep47-tree-hole", (o) => {                         // tropical tree trunk with a hole; the lemur sleeps inside (lemur: false = empty)
  let s = L.shadow(0, 0, 420);
  s += L.shape(L.poly([[-110, 0], [-84, -300], [-96, -640], [96, -640], [86, -300], [118, 0]], true), "wood", { w: "scene" });
  for (const [x1, y1, x2, y2] of [[-60, -20, -50, -560], [10, -10, 14, -600], [66, -20, 56, -520]]) s += L.stroke(`M${x1} ${y1} Q${x1 + 12} ${(y1 + y2) / 2} ${x2} ${y2}`, { w: "hair", c: "wood" });
  s += L.shape(sm([[-98, -460], [-110, -330], [-62, -250], [52, -250], [104, -330], [96, -460], [0, -520]]), "ink", { w: "prop", flat: true, tone: 1 });   // the hole
  s += L.shape(sm([[-76, -420], [-78, -330], [-48, -272], [44, -272], [76, -330], [72, -420], [0, -470]]), "brown", { w: "hair", tone: 2, flat: true });
  if (o.lemur !== false) s += L.g(L.inline("ep47-lemur", { sleep: true, zzz: o.zzz }), "translate(0 -270) scale(0.82)");
  s += L.shape(sm([[-230, -660], [-190, -760], [-80, -790], [0, -840], [110, -790], [220, -770], [250, -690], [160, -620], [40, -610], [-120, -620]]), "green", { w: "scene" });
  s += L.shape(sm([[-120, -700], [-40, -760], [60, -730], [20, -680]]), "green", { w: "hair", tone: 1, flat: true });
  return s;
}, { box: [-300, -860, 600, 900], group: "Hibernation", label: "Tree with a hole · lemur asleep inside", tags: ["tree", "tree hole", "lemur", "hollow", "tropical", "ep47"],
  call: 'L.put(S, "ep47-tree-hole", x, gy, { s, t, lemur: true, zzz: false })', demo: {} });

L.reg("scenery", "ep47-den", (o) => {                               // snowy hillside cut open: a bear asleep in the den; logs: true = a den built for the study
  let s = L.shadow(0, 0, 900);
  s += L.shape(sm([[-470, 0], [-420, -120], [-300, -250], [-140, -330], [20, -350], [180, -330], [320, -250], [430, -130], [480, 0]]), "snow", { w: "scene" });
  s += L.shape(sm([[-300, 0], [-290, -100], [-200, -190], [-60, -230], [90, -230], [210, -190], [290, -100], [300, 0]]), "brown", { w: "prop", flat: true, tone: 2 });   // cavity
  if (o.logs) for (let i = 0; i < 6; i++) { const x = -250 + i * 100; s += L.shape(L.rrect(x - 28, -210 + Math.abs(i - 2.5) * 22, 56, 210 - Math.abs(i - 2.5) * 22, 16), "wood", { w: "detail", tone: i % 2 ? 1 : 0 }); }
  if (o.bear !== false) s += L.g(L.inline("ep47-bear", { sleep: true, zzz: o.zzz }), "translate(0 -6) scale(0.95)");
  if (o.logs) s += L.shape(L.rrect(-330, -254, 660, 34, 14), "wood", { w: "prop", tone: 2 });
  return s;
}, { box: [-500, -380, 1000, 480], group: "Hibernation", label: "Bear den · snowy hill cut open", tags: ["den", "bear", "hibernate", "snow", "cave", "hill", "ep47"],
  call: 'L.put(S, "ep47-den", x, gy, { s, t, logs: false, bear: true, zzz: false })', demo: { logs: false } });

L.reg("scenery", "ep47-burrow", (o) => {                            // ground-squirrel burrow cut open: tunnel down to a chamber, a squirrel curled in it
  let s = L.shape(L.rect(-420, 0, 840, 380), "earth", { w: "scene", flat: true, tone: 0 });
  s += L.shape(sm([[-420, -4], [-300, -26], [-160, -12], [0, -30], [160, -14], [300, -26], [420, -4], [420, 24], [-420, 24]]), "snow", { w: "scene" });
  s += L.shape(sm([[-310, 24], [-250, 24], [-210, 110], [-120, 220], [-40, 250], [200, 250], [290, 280], [270, 340], [140, 360], [-120, 350], [-250, 300], [-300, 160]]), "brown", { w: "prop", flat: true, tone: 2 });
  const r = L.rng(11); for (let i = 0; i < 16; i++) s += L.flat(L.circ(-400 + r() * 800, 60 + r() * 300, 4 + r() * 8, 3 + r() * 5), "earth", 0.7);
  if (o.squirrel !== false) s += L.g(L.inline("ep47-squirrel", { sleep: true, zzz: o.zzz }), "translate(120 344) scale(1.25)");
  return s;
}, { box: [-440, -40, 880, 440], group: "Hibernation", label: "Squirrel burrow · cutaway", tags: ["burrow", "squirrel", "underground", "soil", "hibernate", "ep47"],
  call: 'L.put(S, "ep47-burrow", x, groundY, { s, t, squirrel: true, zzz: false })', demo: {} });

// ---------- Mars cruise ship: side view, optional crew quarters module, sleeping pods in the hull ----------
L.reg("objects", "ep47-ship", (o) => {
  const pods = o.pods || 0;
  let s = L.shape(L.poly([[-330, -52], [-410, -80], [-410, 80], [-330, 52]], true), "gray", { w: "prop", tone: 2 });   // engine bell
  if (o.panels !== false) {
    s += L.shape(L.rect(-200, -190, 220, 110), "blue", { w: "prop", tone: 0 }) + L.shape(L.rect(-200, 80, 220, 110), "blue", { w: "prop", tone: 0 });
    for (const y0 of [-190, 80]) { for (let i = 1; i < 4; i++) s += L.stroke(`M${-200 + i * 55} ${y0} v110`, { w: "hair", c: "sky" }); s += L.stroke(`M-200 ${y0 + 55} h220`, { w: "hair", c: "sky" }); }
    s += L.shape(L.rect(-98, -84, 16, 36), "gray", { w: "detail" }) + L.shape(L.rect(-98, 48, 16, 36), "gray", { w: "detail" });
  }
  if (o.quarters) {
    s += L.shape(L.rrect(-110, -300, 360, 186, 60), "paper", { w: "prop" });                                          // the crew quarters module on top
    for (let i = 0; i < 4; i++) s += L.shape(L.circ(-50 + i * 90, -206, 26), "sky", { w: "detail", tone: 1 });
    s += L.shape(L.rect(40, -124, 60, 30), "gray", { w: "detail" });
  }
  s += L.shape(sm([[-330, -70], [200, -74], [320, -50], [420, 0], [320, 50], [200, 74], [-330, 70]]), "white", { w: "scene" });
  s += L.stroke("M200 -74 V74", { w: "detail", c: "gray" }) + L.stroke("M-330 0 H-300", { w: "hair" });
  s += L.shape(L.rrect(-300, -52, 480, 104, 20), "navy", { w: "detail", tone: 2 });
  for (let i = 0; i < pods; i++) {
    const w = 470 / pods, x = -296 + i * w + 6, cx = x + (w - 12) / 2;
    s += L.shape(L.rrect(x, -40, w - 12, 80, 18), "glass", { w: "detail", flat: true, tone: 2 });
    s += L.shape(L.circ(cx - (w - 12) * 0.3, 0, 10), "white", { w: "hair" }) + L.stroke(`M${f1(cx - (w - 12) * 0.2)} 0 H${f1(cx + (w - 12) * 0.34)}`, { w: "detail" }) + L.stroke(`M${f1(cx - (w - 12) * 0.34)} -4 q3 4 8 0`, { w: "hair" });
  }
  s += L.shape(L.circ(380, 0, 18), "sky", { w: "detail", tone: 1 });
  return s;
}, { box: [-430, -320, 880, 520], group: "Hibernation", label: "Mars transit spacecraft · quarters / pods", tags: ["spaceship", "spacecraft", "mars", "crew", "pods", "ep47"],
  call: 'L.put(S, "ep47-ship", x, y, { s, t, quarters: true, pods: 6, panels: true })', demo: { quarters: true, pods: 6 } });

// ---------- gauges ----------
L.reg("info", "ep47-dial", (o) => {                                 // speed dial: v 0..1 (needle), arc coloured up to v; label under the hub
  const v = Math.max(0, Math.min(1, o.v ?? 0.25)), R = 170, ang = Math.PI * (1 - v);
  let s = L.shape(L.circ(0, 0, R + 18, R + 18), "white", { w: "prop" });
  s += L.stroke(L.arc(0, 0, R - 10, 180, 360), { w: 22, c: "gray", op: 0.35 });
  s += L.stroke(L.arc(0, 0, R - 10, 180, 180 + 180 * v), { w: 22, c: o.c || "green" });
  for (let i = 0; i <= 10; i++) { const a = Math.PI * (1 - i / 10); s += L.stroke(`M${f1(Math.cos(a) * (R - 48))} ${f1(-Math.sin(a) * (R - 48))} L${f1(Math.cos(a) * (R - 70))} ${f1(-Math.sin(a) * (R - 70))}`, { w: "detail" }); }
  s += L.stroke(`M0 0 L${f1(Math.cos(ang) * (R - 40))} ${f1(-Math.sin(ang) * (R - 40))}`, { w: 10, c: "red" }) + L.shape(L.circ(0, 0, 16), "ink", { w: "detail" });
  if (o.label) s += L.text(o.label, 0, 74, { size: 44 });
  return s;
}, { box: [-200, -200, 400, 340], group: "Hibernation", label: "Speed dial · needle at v", tags: ["dial", "gauge", "speed", "meter", "metabolism", "quarter", "ep47"],
  call: 'L.put(S, "ep47-dial", x, y, { s, t, v: 0.25, c: "green", label: "1/4 SPEED" })', demo: { v: 0.25, label: "¼ SPEED" } });

// thermometer with a degree scale: val on [min, max] °C, a red line at 0 °C; mercury turns blue below zero
L.reg("info", "ep47-thermo", (o) => {
  const mn = o.min ?? -10, mx = o.max ?? 40, val = o.val ?? 20, H = 520, y = (d) => -(d - mn) / (mx - mn) * H;
  let s = L.shape(L.rrect(-26, -H - 30, 52, H + 66, 26), "white", { w: "prop" });
  s += L.shape(L.circ(0, 40, 46), "white", { w: "prop" });
  const col = val < 0 ? "blue" : "red";
  s += L.shape(L.circ(0, 40, 34), col, { w: "detail" }) + L.shape(L.rect(-9, y(val), 18, 40 - y(val)), col, { w: "hair", flat: true });
  for (let d = Math.ceil(mn / 10) * 10; d <= mx; d += 10) s += L.stroke(`M26 ${f1(y(d))} h18`, { w: "detail" }) + L.text(d + "°", 58, y(d) + 12, { size: 34, anchor: "start" });
  s += L.stroke(`M-44 ${f1(y(0))} H44`, { w: "detail", c: "blue", dash: "8 6" });
  return s;
}, { box: [-80, -580, 240, 700], group: "Hibernation", label: "Thermometer · degree scale", tags: ["thermometer", "temperature", "degrees", "freezing", "scale", "ep47"],
  call: 'L.put(S, "ep47-thermo", x, y, { s, t, min: -10, max: 40, val: 37 })  // bulb centre at (0, 40)', demo: { val: -2.9 } });

// big wall light switch (the "switch" of hibernation); on: lever up
L.reg("props", "ep47-switch", (o) => {
  let s = L.shape(L.rrect(-120, -190, 240, 380, 26), "white", { w: "prop" });
  s += L.shape(L.circ(0, -150, 9), "gray", { w: "detail" }) + L.shape(L.circ(0, 150, 9), "gray", { w: "detail" });
  s += L.shape(L.rrect(-52, -96, 104, 192, 18), "gray", { w: "detail", tone: 2 });
  s += o.on ? L.shape(L.rrect(-40, -88, 80, 96, 14), "paper", { w: "detail" }) : L.shape(L.rrect(-40, -8, 80, 96, 14), "paper", { w: "detail" });
  return s;
}, { box: [-140, -210, 280, 420], group: "Hibernation", label: "Wall switch · on / off", tags: ["switch", "light switch", "toggle", "button", "ep47"],
  call: 'L.put(S, "ep47-switch", x, y, { s, t, on: false })', demo: { on: false } });

// month tiles: names[] in a row; hi[] = indexes drawn as winter (blue + snowflake dot); goal = index of the target month (gold)
L.reg("info", "ep47-months", (o) => {
  const names = o.names || ["NOV", "DEC", "JAN", "FEB", "MAR", "APR"], hi = o.hi || [0, 1, 2, 3, 4], goal = o.goal ?? names.length - 1, w = o.tile || 150, gap = 16, n = names.length;
  let s = "";
  names.forEach((nm, i) => {
    const x = (i - (n - 1) / 2) * (w + gap), win = hi.includes(i), g = i === goal;
    s += L.shape(L.rrect(x - w / 2, -90, w, 180, 20), g ? "gold" : win ? "sky" : "white", { w: "prop", tone: g ? 1 : 0 });
    s += L.shape(L.rrect(x - w / 2, -90, w, 52, 20), g ? "orange" : win ? "blue" : "gray", { w: "detail", tone: 0 });
    s += L.text(nm, x, -52, { size: 40, c: "white", halo: "ink", haloW: 0.04 });
    s += win ? L.flat(L.star(x, 28, 26, 9, 6, -90), "white") : g ? L.flat(L.star(x, 28, 30, 12, 5, -90), "orange") : "";
  });
  return s;
}, { box: [-560, -110, 1120, 220], group: "Hibernation", label: "Month tiles · winter blue, April gold", tags: ["months", "calendar", "winter", "april", "tiles", "ep47"],
  call: 'L.put(S, "ep47-months", x, y, { s, t, names: ["NOV","DEC","JAN","FEB","MAR","APR"], hi: [0,1,2,3,4], goal: 5, tile: 150 })', demo: {} });
})();
