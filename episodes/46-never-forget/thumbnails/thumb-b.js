// look: still
// @library auto
// B (object as hero; title.md idea B): a giant red DELETE key with a padlock on it, a calm smug Dave beside it giving a thumbs-up, and one binder labelled "house smells like ham".
// Words: NO DELETE? (white, black halo).
// CRITIQUE (thumbnail-pro.md): round 1: focal 4 / emotion 3 (smug is too calm) / curiosity 4 / contrast 4 / text 4 / composition 3 / polish 3 / honesty 5 / brand 4. Fix: Dave begs instead of smug, key bigger.
// round 2: padlock hides the key label and the binder is cropped; weakest concept (focal 3 / composition 3), dropped.
const S = scene(0, 1, { cam: "none" });
S.fill(rect(-200, -200, 2320, 1480), 0, 0, "#1d3a8a", 1);
S.fill(circ(1250, 560, 820, 640), 0, 0, DS.glow("#93c5fd", 0.5), 1);
L.put(S, "ep46-delete-key", 1250, 560, { s: 3.0, c: "red", size: 82 });
L.put(S, "prop-padlock", 1560, 300, { s: 2.3 });
L.put(S, "ep46-binder", 1780, 1000, { view: "front", label: "HOUSE SMELLS|LIKE HAM", c: "yellow", bw: 220, bh: 290, s: 1.3, rot: 12 });
L.put(S, "kit-dave", 480, 2030, { s: 4.2, face: "sob", pose: "pray-hands" });
S.text("NO DELETE?", 960, 200, { size: 210, c: "#FFFFFF", halo: "#111111", haloW: 0.1 });
