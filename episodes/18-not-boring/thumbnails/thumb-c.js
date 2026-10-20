// look: still
// C (clickbait scene mode, 2026-10-20): a party at night under string lights; on the snack table a printer is spitting pages
// into the air; Maya, cup in hand, smiles politely; huge Dave, hands on his cheeks, is mortified.
// Text "THE PRINTER?": the video's runner (in the replay he told her about his printer. Twice). Honest to the content.
const S = scene(0, 1, { cam: "none" });
S.bg("flat", { sky: "#9b6a8f", ground: "#6b4a3a", hy: 900 });
// string lights: a sagging wire with warm bulbs + glow
const wire = [[-20, 300], [480, 380], [960, 320], [1440, 390], [1940, 310]];
S.draw(smooth(wire), 0, 0, { w: 5, c: "#3d2418" });
for (let i = 0; i < 13; i++) {
  const x = 40 + i * 150, seg = Math.min(3, Math.floor((x + 20) / 490)), [a, b] = [wire[seg], wire[seg + 1]], f = (x - a[0]) / (b[0] - a[0]);
  const y = a[1] + (b[1] - a[1]) * f + Math.sin(f * Math.PI) * 30 + 18;
  S.fill(circ(x, y + 10, 46), 0, 0, "#ffe38a", 0.3);
  S.draw(circ(x, y + 12, 14, 18), 0, 0, { w: 4, fill: ["#ffcf33", "#f28ca0", "#6fc078", "#ffb466"][i % 4] });
}
// snack table + the printer
S.draw(rect(1000, 760, 640, 30), 0, 0, { w: 8, fill: "#b08968" });
S.draw(line([1040, 790], [1040, 905], 0) + line([1600, 790], [1600, 905], 0), 0, 0, { w: 9 });
S.draw(rect(1120, 470, 260, 110), 0, 0, { w: 6, fill: "#ffffff" });
S.draw(rrect(1060, 550, 400, 210, 18), 0, 0, { w: 9, fill: "#c4c8cc" });
S.draw(rrect(1090, 580, 160, 50, 8), 0, 0, { w: 5, fill: "#1f2a44" });
S.fill(circ(1400, 605, 14), 0, 0, "#3f9e4a", 1);
S.draw(rect(1100, 680, 320, 26), 0, 0, { w: 6, fill: "#1d1b1f" });
// pages flying out of the slot
const page = (x, y, r) => { const g = S.grp(); S.draw(rect(x - 60, y - 80, 120, 160), 0, 0, { w: 6, fill: "#ffffff", parent: g }); [-40, -10, 20, 50].forEach((dy) => S.draw(line([x - 38, y + dy], [x + 38, y + dy], 0), 0, 0, { w: 4, c: "#9aa0a6", parent: g })); g.setAttribute("transform", `rotate(${r} ${x} ${y})`); };
page(1530, 600, 25); page(1630, 440, -20); page(1470, 400, 50);
// Maya, polite smile, cup in hand
const M = S.fig(1770, 900, { s: 1.3, hair: "bun", hairC: "#2b1d14", outfit: "tee", outfitC: "#ff8c1a", pose: "hold" }).instant(0);
M.face(0, "smile", -10);
const [cx, cy] = M.hand("R");
S.draw(`M${cx - 26} ${cy - 50} L${cx + 26} ${cy - 50} L${cx + 18} ${cy + 10} L${cx - 18} ${cy + 10} Z`, 0, 0, { w: 5, fill: "#e5383b" });
// big mortified Dave, hands on his cheeks
const F = S.fig(400, 1900, { s: 4.2, hair: "side", hairC: "#5a3825", outfit: "tee", outfitC: "#2f6fd6", armL: [[-60, 0], [-20, -51]], armR: [[60, 0], [20, -51]] }).instant(0);
F.face(0, "wow", 12);
S.text("THE PRINTER?", 960, 230, { size: 200, c: "#FEFE06", halo: "#111111", haloW: 0.09 });
