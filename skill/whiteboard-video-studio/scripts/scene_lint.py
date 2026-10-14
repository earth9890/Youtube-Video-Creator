#!/usr/bin/env python3
"""Style-guide lint for `// look: still` scenes (references/style-guide.md). Static: reads scenes.js, no browser.

usage: python3 scene_lint.py scenes.js        exit 1 on any FAIL
Checks that every colour / stroke width / radius / text size comes from the DS tokens in kit.js, text sits inside
the safe area, and every scene has a depth background and grounded figures. Contrast + overlap: `npx hyperframes check`.
"""
import re, sys

src = open(sys.argv[1]).read()
code = re.sub(r"//[^\n]*", "", src)                       # comments may mention hex codes
TYPE = {40, 52, 64, 84, 110}
res = []
out = lambda lvl, msg: res.append((lvl, msg))
line_of = lambda i: code.count("\n", 0, i) + 1

if "// look: still" not in src[:300]:
    out("FAIL", "first line must be `// look: still` (kit.js + crisp stills only load in that look)")
for m in re.finditer(r"#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b", code):
    out("FAIL", f"line {line_of(m.start())}: raw colour {m.group(0)} -> DS.c('name', tone, layer) / DS.vol / DS.P")
for m in re.finditer(r"\bw:\s*\d+(\.\d+)?", code):
    out("FAIL", f"line {line_of(m.start())}: raw stroke '{m.group(0)}' -> w: DS.w.far|mid|near|detail|hair")
for m in re.finditer(r"rrect\(([^()]|\([^()]*\))*?,\s*(\d+)\s*\)", code):
    out("FAIL", f"line {line_of(m.start())}: raw corner radius {m.group(2)} -> DS.r.xs|sm|md|lg")
for m in re.finditer(r"\bsize:\s*(\d+)", code):
    if int(m.group(1)) not in TYPE:
        out("FAIL", f"line {line_of(m.start())}: text size {m.group(1)} off the type scale -> DS.type.caption|small|body|title|display")
for m in re.finditer(r"(?:S\.text|DS\.card|S\.label|lbl)\(\s*[^,]+,\s*(\d+),\s*(\d+)", code):
    x, y = int(m.group(1)), int(m.group(2))
    if not (96 <= x <= 1824 and 64 <= y <= 940):
        out("FAIL", f"line {line_of(m.start())}: text at ({x},{y}) outside the safe area x 96-1824, y 64-940 (captions below 980)")

scenes = [b for b in re.split(r"\n(?=\{ const S = sc\()", code) if "const S = sc(" in b]
for i, b in enumerate(scenes):
    if not re.search(r"DS\.(outdoor|room)\(|S\.bg\(", b):
        out("WARN", f"scene {i}: no depth background (DS.outdoor / DS.room)")
    if re.search(r"\bS\.fig\(", b) and "DS.shadow" not in b:
        out("WARN", f"scene {i}: S.fig without DS.shadow - use DS.figure (contact shadow + depth scale)")
    if len(re.findall(r"DS\.card\(|S\.label\(|lbl\(", b)) > 3:
        out("WARN", f"scene {i}: more than 3 labels - one idea per picture")
import json, os
sj = os.path.join(os.path.dirname(os.path.abspath(sys.argv[1])), "script.json")
if os.path.exists(sj):  # every W(clip, word) must exist, or the page throws at build time
    clips = [c[0].split() for c in json.load(open(sj))]
    for m in re.finditer(r"\bWE?\((\d+),\s*(\d+)\)", code):
        c, i = int(m.group(1)), int(m.group(2))
        if not (1 <= c <= len(clips) and i < len(clips[c - 1])):
            out("FAIL", f"line {line_of(m.start())}: W({c}, {i}) - clip {c} has {len(clips[c - 1]) if 1 <= c <= len(clips) else 0} words (0-based)")
out("INFO", f"{len(scenes)} scenes checked")

for lvl, msg in sorted(res, key=lambda r: ["FAIL", "WARN", "INFO"].index(r[0])):
    print(f"{lvl:4}  {msg}")
fails = sum(r[0] == "FAIL" for r in res)
print(f"\n{'FAIL' if fails else 'PASS'}: {fails} fail(s), {sum(r[0] == 'WARN' for r in res)} warning(s)")
sys.exit(1 if fails else 0)
