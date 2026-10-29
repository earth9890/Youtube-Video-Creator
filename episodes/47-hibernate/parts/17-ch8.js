// ===================== chapter 8: Back in April (clips 72-75) =====================
// 72 "Dave takes down the sign and fixes the last line."
shot(72, 0, (S) => {
  bg(S, "ep47-scene-door", { close: true });
  dave(S, 560, 900, { s: 1.3, acc: GEAR, pose: "hold", face: "determined" });
  L.put(S, "ep47-sign", 1160, 240, { s: 0.98, lines: SIGN.slice(0, 5), cap: 6 });
  L.put(S, "ep47-sign", 1160, 240, { s: 0.98, lines: SIGN, cap: 6, only: 5, t: W(72, 6), colors: [, , , , , "green"] });
}, { cam: "push" });
// 73 (@dave) "Back in April. After a nap break every three weeks. Please don't wake me."
shot(73, 0, (S) => {
  bg(S, "ep47-scene-door", { close: true });
  daveTalk(S, 540, 900, { s: 1.2, acc: GEAR, pose: "reach", face: "smile" }, 73);
  L.put(S, "ep47-sign", 1080, 150, { lines: SIGN, cap: 6, colors: [, , , , , "green"] });
}, { cam: "push" });
// 74 "Dave, you will be woken. That is how it works."
shot(74, 0, (S) => {
  bg(S, "ep47-scene-bedroom");
  L.put(S, "ep47-bed", 780, 925, { s: 1.4, zzz: true });
  L.put(S, "prop-alarm-clock", 1480, 560, { s: 3.2, t: W(74, 3), pop: true });
  [300, 380, 460].forEach((r, i) => { S.draw(arc(1480, 560, r, 152, 208), W(74, 3) + 0.3 + i * 0.25, 0, { c: DS.c("ink"), w: DS.w.near }); S.draw(arc(1480, 560, r, -28, 28), W(74, 3) + 0.3 + i * 0.25, 0, { c: DS.c("ink"), w: DS.w.near }); });
  card(S, "THREE WEEKS LATER", 960, 140, { t: W(74, 0), fill: "yellow" });
});
// 75 "Wake me in April. Or in three weeks."
shot(75, 0, (S) => {
  bg(S, "ep47-scene-bedroom");
  L.put(S, "ep47-bed", 780, 925, { s: 1.4, zzz: true });
  months(S, 1100, 480, { s: 0.55, t: W(75, 2) });
  ring(S, 1100 + 2.5 * 166 * 0.55, 480, 56, 68, W(75, 3));
  card(S, "OR IN THREE WEEKS", 1100, 600, { t: W(75, 5), fill: "yellow", size: DS.type.caption });
}, { cam: "pull" });
