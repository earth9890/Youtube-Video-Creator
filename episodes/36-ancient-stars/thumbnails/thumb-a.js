// look: still
// A (floor-raiser, archetype A on space black): big-head Dave side-eyes a giant emu made of darkness inside the Milky Way, rim-lit amber.
// Wrongness: a bird the size of the sky, drawn with the gaps between the stars. Text asks the question (not the title).
// @include helpers.js
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#05031A", 1);
milky(S, 1.35, { from: [560, -40], to: [2240, 1220], wd: 170, bulge: 0.5, emu: "run", emuAt: [0.5, 30, 1.22], tilt: 0.12, dust: "#05031A", rim: 0, rimC: "#F4BC22" });
field(S, 0.55, 1080, { keep: (x, y) => x > 760 || y < 300 });
const F = dave(S, 430, 1890, "near", { s: 4.3, mood: "worried", look: 9, breathe: false });
S.text("SKY EMU?", 960, 215, { size: 230, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
