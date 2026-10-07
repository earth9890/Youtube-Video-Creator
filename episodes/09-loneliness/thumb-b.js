// Thumb B (light) — hook: "SEND THE MESSAGE." with a chat phone
const S = scene(0, 1, { cam: "none" });
S.text("SEND", 180, 400, { size: 230, anchor: "start", c: GREEN, t: 0, dur: 0.5 });
S.text("THE", 690, 400, { size: 230, anchor: "start", t: 0, dur: 0.5 });
S.text("MESSAGE.", 180, 660, { size: 230, anchor: "start", t: 0, dur: 0.5 });
S.phone(1560, 540, 3.4, 0, 0.6, { screen: "chat" });
