// look: v3
// A (floor-raiser): grown-up Dave, big-head crop, squeezed into the kids' row of a family photo. Wrongness: an adult among kids.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#FCA55D", ground: "#E89F5B", hy: 940 });
const kid = (x, c, h) => { const F = S.fig(x, 1180, { s: 1.6, hair: h, hairC: "#3a2a1a", outfit: "tee", outfitC: c }).instant(0); F.face(0, "happy", 0); };
kid(260, "#f2b84b", "spiky"); kid(1660, "#e85d75", "bun");
const F = S.fig(960, 1890, { s: 4.0, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6" }).instant(0);
F.face(0, "worried", -7);
S.text("KIDS' ROW?", 960, 190, { size: 210, c: "#FEFE06", halo: "#111111", haloW: 0.1 });
