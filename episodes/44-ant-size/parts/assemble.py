#!/usr/bin/env python3
# parts -> scenes.js (+ thumbnails/helpers.js = cast + props, everything before the scenes). CUES come from the sc(c, w) calls in order.
import re, glob, os
here = os.path.dirname(os.path.abspath(__file__)); os.chdir(here)
base = [open(f).read() for f in ("00-base.js", "01-cast.js", "02-props.js")]
chap = [open(f).read() for f in sorted(glob.glob("1*.js"))]
cues = []
for c in chap:
    for m in re.finditer(r"^\{ const S = sc\((\d+), (\d+)", c, re.M):
        cues.append(f"[{m[1]}, {m[2]}]")
time = """
// ---------- timing: one picture per beat (merged clips share a picture), landing just after its first word ----------
const CUES = [%s];
const WINS = sceneWindows(CUES, -0.25);
const sc = (c, w, o) => { const k = CUES.findIndex(([a, b]) => a === c && b === w); if (k < 0) throw new Error("no cue " + c + ":" + w); return scene(WINS[k][0], WINS[k][1], o); };
""" % ", ".join(cues)
open("../scenes.js", "w").write("\n".join(base) + time + "\n".join(chap))
open("../thumbnails/helpers.js", "w").write("\n".join(base))
print(len(cues), "scenes")
