
// ---------- the cast: generic labelled figures, the same in every scene ----------
const ANCHOR = { s: 1.1, hair: "short", hairC: DS.c("ink", 1), outfitC: DS.c("navy"), tieC: "red" };
const DEALER = { s: 1.15, hair: "short", hairC: DS.c("gray", 1), outfitC: DS.c("brown", 1), tieC: "gold", mood: "angry" };
const KID = { s: 0.62, hair: "curly", hairC: DS.c("brown", 2), outfitC: DS.c("orange") };
const AGENT = { s: 1.1, hair: "bun", hairC: DS.c("brown", 2), outfitC: DS.c("purple"), tieC: "navy" };
const CASHIER = { s: 1.1, hair: "bun", hairC: DS.c("ink", 1), outfit: "apron", outfitC: DS.c("red") };
const BAKER = { s: 1.1, hair: "none", outfit: "apron", outfitC: DS.c("white", 2) };
const OC = ["green", "purple", "orange", "pink", "gold", "earth", "gray", "red"]; // no blue: blue is Dave's
const person = (S, x, gy, layer, i, o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: ["short", "bun", "curly", "side"][i % 4], hairC: DS.c(["brown", "ink", "earth", "gray"][i % 4], i % 4 === 3 ? 1 : 2), outfitC: DS.c(OC[i % 8]), mood: "flat", look: ((i % 3) - 1) * 5 }, o));
// hard hat: dome + brim in a colour, drawn over the head
const hardhat = (S, F, name = "yellow") => {
  const R = F.r, [hx, hy] = F.hd;
  DS.shape(S, `M${hx - 1.02 * R} ${hy - 0.38 * R} Q${hx - 0.98 * R} ${hy - 1.4 * R} ${hx} ${hy - 1.38 * R} Q${hx + 0.98 * R} ${hy - 1.4 * R} ${hx + 1.02 * R} ${hy - 0.38 * R} Z`, name, { w: "detail", parent: F.g });
  DS.shape(S, `M${hx - 1.22 * R} ${hy - 0.46 * R} H${hx + 1.22 * R} Q${hx + 1.3 * R} ${hy - 0.26 * R} ${hx + 1.1 * R} ${hy - 0.26 * R} H${hx - 1.1 * R} Q${hx - 1.3 * R} ${hy - 0.26 * R} ${hx - 1.22 * R} ${hy - 0.46 * R} Z`, name, { tone: 2, w: "detail", parent: F.g });
  return F;
};
const chefhat = (S, F) => {
  const R = F.r, [hx, hy] = F.hd;
  DS.shape(S, `M${hx - 0.8 * R} ${hy - 0.5 * R} Q${hx - 1.3 * R} ${hy - 1.3 * R} ${hx - 0.5 * R} ${hy - 1.5 * R} Q${hx} ${hy - 2.1 * R} ${hx + 0.5 * R} ${hy - 1.5 * R} Q${hx + 1.3 * R} ${hy - 1.3 * R} ${hx + 0.8 * R} ${hy - 0.5 * R} Z`, "white", { flat: true, w: "detail", parent: F.g });
  return F;
};
const worker = (S, x, gy, layer, o = {}) => hardhat(S, who(S, x, gy, layer, Object.assign({ s: 1.1, hair: "none", outfitC: DS.c("orange"), vest: true }, o)), o.hat || "yellow");
const doctor = (S, x, gy, layer, i, o = {}) => who(S, x, gy, layer, Object.assign({ s: 1.1, hair: ["short", "bun", "curly", "side"][i % 4], hairC: DS.c(["ink", "brown", "earth", "gray"][i % 4], 2), outfitC: DS.c("white", 2), specs: i % 2 === 0, mood: "flat" }, o));
// a speech/news label under a figure
const nameTag = (S, F, str, t, o = {}) => card(S, str, F.cx, o.y ?? F.gy + 56, Object.assign({ t, size: DS.type.caption }, o));

// side-view car (faces right); returns group for moving
const car = (S, x, gy, k = 1, name = "red", o = {}) => {
  const g = S.grp(o.parent), L = o.layer || "mid";
  DS.shadow(S, x, gy, 300 * k, { parent: g });
  DS.shape(S, `M${x - 150 * k} ${gy - 34 * k} V${gy - 84 * k} Q${x - 146 * k} ${gy - 98 * k} ${x - 120 * k} ${gy - 100 * k} L${x - 80 * k} ${gy - 104 * k} L${x - 46 * k} ${gy - 150 * k} H${x + 50 * k} L${x + 92 * k} ${gy - 102 * k} L${x + 136 * k} ${gy - 94 * k} Q${x + 154 * k} ${gy - 88 * k} ${x + 154 * k} ${gy - 66 * k} V${gy - 34 * k} Z`, name, { layer: L, w: "mid", parent: g });
  DS.shape(S, `M${x - 66 * k} ${gy - 104 * k} L${x - 40 * k} ${gy - 138 * k} H${x - 4 * k} V${gy - 104 * k} Z M${x + 8 * k} ${gy - 104 * k} V${gy - 138 * k} H${x + 44 * k} L${x + 74 * k} ${gy - 104 * k} Z`, "glass", { layer: L, w: "detail", parent: g });
  [-90, 90].forEach((dx) => { DS.shape(S, circ(x + dx * k, gy - 30 * k, 30 * k), "ink", { layer: L, tone: 1, w: "detail", parent: g }); DS.shape(S, circ(x + dx * k, gy - 30 * k, 12 * k), "gray", { layer: L, w: "hair", parent: g }); });
  DS.shape(S, rrect(x + 136 * k, gy - 84 * k, 18 * k, 14 * k, DS.r.xs), "yellow", { layer: L, w: "hair", parent: g });
  return fadeG(S, g, o.t);
};
// London double-decker bus (faces right)
const bus = (S, x, gy, k = 1, o = {}) => {
  const g = S.grp(o.parent), L = o.layer || "mid";
  DS.shadow(S, x, gy, 640 * k, { parent: g });
  DS.shape(S, rrect(x - 320 * k, gy - 400 * k, 640 * k, 370 * k, DS.r.md * k), "red", { layer: L, w: "mid", parent: g });
  [[-300, -380], [-300, -240]].forEach(([dx, dy]) => { for (let i = 0; i < 5; i++) DS.shape(S, rrect(x + (dx + i * 116) * k, gy + dy * k, 96 * k, 92 * k, DS.r.xs * k), "glass", { layer: L, w: "detail", parent: g }); });
  DS.shape(S, rect(x - 320 * k, gy - 270 * k, 640 * k, 16 * k), "red", { layer: L, tone: 2, flat: true, w: "hair", parent: g });
  [-200, 200].forEach((dx) => { DS.shape(S, circ(x + dx * k, gy - 34 * k, 40 * k), "ink", { layer: L, tone: 1, w: "detail", parent: g }); DS.shape(S, circ(x + dx * k, gy - 34 * k, 16 * k), "gray", { layer: L, w: "hair", parent: g }); });
  return fadeG(S, g, o.t);
};


// ---------- streets ----------
const BLD = [[-80, 300, 380, "earth"], [230, 250, 300, "wall"], [490, 330, 430, "gray"], [830, 270, 340, "sand"], [1110, 340, 460, "earth"], [1460, 260, 310, "wall"], [1730, 330, 400, "gray"]];
const BLD_LDN = [[-80, 420, 330, "wall"], [350, 380, 350, "sand"], [740, 420, 330, "white"], [1170, 380, 350, "wall"], [1560, 460, 330, "sand"]];
const DAY = { hy: 600, sky: "sky", hills: "gray", ground: "gray", sun: [1700, 110] }, DAWN = { hy: 600, sky: "dusk", hills: "gray", ground: "gray", sun: [1640, 420] }, NIGHT = { hy: 600, sky: "night", hills: "gray", ground: "gray", sun: false };
// city street: buildings (far), road (mid), pavement (near, ground y 960). o.ldn = London stucco terraces; o.zebra = crossing stripes x0
const street = (S, O = DAY, o = {}) => { // call DS.outdoor(S, O) first
  const hy = O.hy, night = O.sky === "night";
  (o.ldn ? BLD_LDN : BLD).forEach(([x, w, h, n], i) => {
    DS.shape(S, rect(x, hy - h, w, h + 60), n, { layer: "far", dir: "h", tone: o.ldn && n === "white" ? 2 : 0 });
    if (o.ldn) { DS.shape(S, rect(x - 10, hy - h - 24, w + 20, 30), n, { layer: "far", tone: 2, w: "far" }); for (let c = 0; c < Math.floor(w / 80); c++) DS.shape(S, rect(x + 24 + c * 80, hy - h + 40, 44, 90), night ? "yellow" : "glass", { layer: "far", flat: true, tone: night ? 1 : 2, w: "far" }); for (let c = 0; c < Math.floor(w / 80); c++) DS.shape(S, rect(x + 24 + c * 80, hy - h + 170, 44, 70), night ? "navy" : "glass", { layer: "far", flat: true, tone: 2, w: "far" }); return; }
    const cols = Math.floor((w - 30) / 72), rows = Math.floor((h - 50) / 90);
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const lit = night && (r * 3 + c * 5 + i) % 4 === 0; S.fill(rect(x + 30 + c * 72, hy - h + 36 + r * 90, 36, 50), S.start, 0, lit ? DS.c("yellow", 1, "far") : DS.c(night ? "navy" : "glass", night ? 1 : 2, "far"), 1); }
  });
  DS.shape(S, rect(-200, hy + 40, 2320, 210), "ink", { layer: "mid", tone: 1, flat: true, w: "hair" });
  for (let x = -100; x < 2000; x += 220) S.fill(rect(x, hy + 138, 110, 10), S.start, 0, DS.c("yellow", 0, "mid"), 0.8);
  if (o.zebra !== undefined) for (let i = 0; i < 6; i++) S.fill(`M${o.zebra + i * 70} ${hy + 46} h44 l20 196 h-44 Z`, S.start, 0, DS.c("white", 0, "mid"), 0.9);
  DS.shape(S, rect(-200, hy + 250, 2320, 22), "gray", { layer: "mid", tone: 1, flat: true, w: "detail" });
  DS.shape(S, rect(-200, hy + 272, 2320, 600), "paper", { tone: 2, flat: true, w: "hair" });
  for (let x = -120; x < 2100; x += 260) S.draw(line([x, hy + 272], [x - 120, 1080], 0), S.start, 0, { c: DS.c("gray", 1), w: DS.w.hair });
  return { hy, kerb: hy + 260 };
};
const heartP = (S, cx, cy, k, t) => { const g = S.grp(); S.draw(heartPath(cx, cy, k), S.start, 0, { fill: DS.c("red", 1), c: DS.c("red", 2), w: DS.w.mid, parent: g }); return fadeG(S, g, t, 0.25); };
