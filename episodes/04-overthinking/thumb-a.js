// theme: dark
// thumbnail A: CAN'T STOP / THINKING. — hero on the ground, hands on head, three worry bubbles crowding him
const S = scene(0, 1, { cam: "none" });
S.text("CAN'T STOP", 700, 300, { size: 240, t: 0, dur: 0.4 });
S.text("THINKING.", 700, 580, { size: 280, c: RED, t: 0.1, dur: 0.4 });
// sit:true puts the hip just above gy; custom legs stretch along the floor (feet at hip + 60·s)
const F = S.fig(1500, 900, { s: 1.6, sit: true, pose: "head", legL: [[60, -20], [150, 60]], legR: [[90, 30], [180, 60]] }).draw(0, 0.5);
F.face(0.5, "worried", 0);
S.draw(line([1330, 985], [1820, 985], 2), 0.4, 0.2, { w: 6 });
[[1430, 190, 150, 95], [1730, 230, 110, 80], [1590, 420, 140, 80]].forEach(([x, y, rx, ry], i) => {
  S.thought(x, y, rx, ry, 1500, 560, 0.1 + i * 0.1, 0.4);
  S.cloud(x, y - 15, 0.5, 0.3 + i * 0.1, 0.3, { fill: GRAY });
});
