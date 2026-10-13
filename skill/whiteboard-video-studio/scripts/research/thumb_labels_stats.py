"""Which hand-labelled thumbnail features go with hits? Reads references/research/thumbnails/data/thumb-labels-*.json.

usage: python3 thumb_labels_stats.py LABEL_DIR
For each feature value: how many top (outlier) vs bottom (flop) tiles have it, and the median perf of the tiles that have it.
"""
import glob, json, sys, statistics as st
from collections import defaultdict

L = [x for f in sorted(glob.glob(f"{sys.argv[1]}/thumb-labels-*.json")) for x in json.load(open(f))]
perf = lambda x: float(str(x.get("perf", "")).lstrip("x")) if str(x.get("perf", "")).lstrip("x").replace(".", "").isdigit() else None


def bucket(x):
    c, t = x.get("character") or {}, x.get("text") or {}
    w = t.get("words") or 0
    h = c.get("height_pct") or 0
    return {
        "archetype": str(x.get("archetype", "?")).split(":")[0],
        "bg": x.get("bg"),
        "elements": "1-2" if x.get("elements", 0) <= 2 else "3" if x["elements"] == 3 else "4+",
        "character": "none" if not c.get("present") else "big (>=40%)" if h >= 40 else "small",
        "gaze": c.get("gaze") if c.get("present") else "-",
        "emotion": (c.get("emotion") or "-") if c.get("present") else "-",
        "words": "0" if w == 0 else "1-3" if w <= 3 else "4-5" if w <= 5 else "6+",
        "text_kind": t.get("kind") or "none",
        "text_pos": t.get("position") or "none",
        "outline": str(bool(t.get("outline"))) if w else "-",
        "arrow": str(bool(x.get("arrow"))),
        "title_relation": x.get("title_relation"),
        "glance": str(x.get("glance")),
    }


agg = defaultdict(lambda: {"top": 0, "bottom": 0, "latest": 0, "p": []})
for x in L:
    for k, v in bucket(x).items():
        a = agg[(k, str(v))]
        a[x.get("group", "?")] = a.get(x.get("group", "?"), 0) + 1
        if perf(x) is not None:
            a["p"].append(perf(x))
nt = sum(x.get("group") == "top" for x in L); nb = sum(x.get("group") == "bottom" for x in L)
print(f"{len(L)} labelled tiles: {nt} top, {nb} bottom  (lift = top share / bottom share)")
for k in dict.fromkeys(k for k, _ in agg):
    print(f"\n{k}")
    for (kk, v), a in sorted(agg.items(), key=lambda i: -i[1]["top"]):
        if kk != k or a["top"] + a["bottom"] < 3:   # free-text values (emotion) are mostly singletons
            continue
        ts, bs = a["top"] / max(nt, 1), a["bottom"] / max(nb, 1)
        lift = f"{ts / bs:5.1f}x" if bs else "  only top" if ts else "     -"
        print(f"  {v[:28]:28} top {a['top']:3} ({ts:4.0%})  bottom {a['bottom']:3} ({bs:4.0%})  lift {lift}"
              f"  median perf {st.median(a['p']) if a['p'] else float('nan'):.2f}")
