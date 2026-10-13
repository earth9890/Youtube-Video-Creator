"""Per-thumbnail pixel + text metrics and performance score for a thumbnail study.

usage: python3 thumb_metrics.py DIR     (DIR has lists/<channel>.txt from fetch_thumbs.sh, img/<id>.jpg, ocr.jsonl)
writes DIR/metrics.tsv (one row per video) and prints per-channel medians + top-vs-bottom comparisons.

Performance = views / median views of the 7 uploads either side (same channel, upload order): 1.0 = typical
for its era, 3.0 = a 3x outlier. Newest 3 uploads are excluded (views still growing).
"""
import json, sys, statistics as st, os
import numpy as np
from PIL import Image


def pixels(path):
    im = Image.open(path).convert("RGB")
    if im.size == (480, 360):                      # hqdefault fallback: drop the letterbox bars
        im = im.crop((0, 45, 480, 315))
    a = np.asarray(im.resize((320, 180)), dtype=np.float32) / 255
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
    mx, mn = a.max(2), a.min(2)
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    rg, yb = r - g, 0.5 * (r + g) - b                # Hasler–Süsstrunk colourfulness
    colorful = np.hypot(rg.std(), yb.std()) + 0.3 * np.hypot(rg.mean(), yb.mean())
    gy, gx = np.gradient(lum)
    edges = (np.hypot(gx, gy) > 0.08).mean()          # clutter: share of pixels on a hard edge
    q = (a * 7.99).astype(int); keys = q[..., 0] * 64 + q[..., 1] * 8 + q[..., 2]
    cnt = np.bincount(keys.ravel(), minlength=512); top = np.argsort(cnt)[::-1]
    hexes = ["#%02x%02x%02x" % tuple(int((k >> s & 7) * 33.6 + 15) for s in (6, 3, 0)) for k in top[:3]]
    return dict(lum=lum.mean(), contrast=lum.std(), sat=sat.mean(), colorful=colorful * 100, edges=edges,
                black=(lum < 0.08).mean(), white=(lum > 0.92).mean(), top3share=cnt[top[:3]].sum() / cnt.sum(),
                c1=hexes[0], c2=hexes[1], c3=hexes[2])



if __name__ == "__main__":
    D = sys.argv[1]
    ocr = {}
    for ln in open(f"{D}/ocr.jsonl"):
        o = json.loads(ln)
        # thumbnail text is big and confident; drops OCR noise from textures and tiny scene lettering
        ocr[os.path.basename(o["f"])[:-4]] = [l for l in o["lines"] if l["c"] >= 0.5 and l["h"] >= 0.045]

    rows = []
    for f in sorted(os.listdir(f"{D}/lists")):
        ch = f[:-4]
        vids = [l.rstrip("\n").split("|", 3) for l in open(f"{D}/lists/{f}")]
        vids = [(int(v) if v.isdigit() else 0, i, float(d) if d not in ("NA", "None") else 0, t) for v, i, d, t in vids]
        vids = [v for v in vids if v[2] == 0 or v[2] > 70]   # drop Shorts
        for k, (v, i, d, t) in enumerate(vids):
            nb = [x[0] for x in vids[max(0, k - 7):k + 8] if x[1] != i and x[0] > 0]
            perf = v / st.median(nb) if nb and k >= 3 and v > 0 else None
            p = f"{D}/img/{i}.jpg"
            if not os.path.exists(p):
                continue
            L = ocr.get(i, [])
            words = sum(len(l["t"].split()) for l in L)
            text_area = sum(l["w"] * l["h"] for l in L)
            top_y = min((l["y"] for l in L), default=None)
            rows.append(dict(ch=ch, id=i, views=v, perf=perf, rank=k, title=t, words=words,
                             text=" / ".join(l["t"] for l in L), text_area=text_area,
                             text_h=max((l["h"] for l in L), default=0), text_top=top_y, **pixels(p)))

    cols = list(rows[0])
    with open(f"{D}/metrics.tsv", "w") as o:
        o.write("\t".join(cols) + "\n")
        for r in rows:
            o.write("\t".join("" if r[c] is None else (f"{r[c]:.4g}" if isinstance(r[c], float) else str(r[c]).replace("\t", " ")) for c in cols) + "\n")

    NUM = ["lum", "contrast", "sat", "colorful", "edges", "black", "white", "top3share", "words", "text_area", "text_h"]
    med = lambda xs: st.median(xs) if xs else float("nan")
    print("channel            n   " + " ".join(f"{c[:8]:>8}" for c in NUM) + "  %text")
    for ch in sorted({r["ch"] for r in rows}):
        R = [r for r in rows if r["ch"] == ch]
        print(f"{ch[:17]:17} {len(R):3}   " + " ".join(f"{med([r[c] for r in R]):8.3f}" for c in NUM)
              + f"  {sum(r['words'] > 0 for r in R) / len(R):5.0%}")

    print("\nTop quartile vs bottom quartile by perf, within each channel (median of the differences):")
    for c in NUM:
        diffs = []
        for ch in {r["ch"] for r in rows}:
            R = sorted([r for r in rows if r["ch"] == ch and r["perf"]], key=lambda r: r["perf"])
            if len(R) < 12:
                continue
            q = len(R) // 4
            diffs.append(med([r[c] for r in R[-q:]]) - med([r[c] for r in R[:q]]))
        print(f"  {c:10} top-bottom {med(diffs):+8.3f}   per channel: " + " ".join(f"{d:+.3f}" for d in diffs))
