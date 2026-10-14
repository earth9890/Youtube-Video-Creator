// look: v3
// B (lottery ticket): rival bookends with the twist: Dave and Maya, both sure THEY were the boring one, looking away from each other.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#202C36", ground: "#202C36", hy: 1080 });
const D = S.fig(330, 1950, { s: 4.0, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6" }).instant(0);
D.face(0, "worried", -10);
const M = S.fig(1590, 1950, { s: 4.0, hair: "curly", hairC: "#3d2418", outfit: "tee", outfitC: "#8e5bb5" }).instant(0);
M.face(0, "worried", 10);
S.text("WHO WAS", 960, 220, { size: 170, c: "#ffffff" });
S.text("BORING?", 960, 420, { size: 200, c: "#FEFE06" });
