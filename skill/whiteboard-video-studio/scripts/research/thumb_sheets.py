"""Contact sheets for visual thumbnail analysis: per channel, the 12 biggest outliers, the 6 worst and the 6 newest.

usage: python3 thumb_sheets.py DIR    (after thumb_metrics.py) -> DIR/sheets/<ch>_{top,bottom,latest}.jpg + <ch>.tsv
Each tile is labelled "#n  views  xPerf"; the .tsv maps #n to id, title and OCR text.
"""
import csv, os, subprocess, sys

D = sys.argv[1]; S = f"{D}/sheets"; os.makedirs(S, exist_ok=True)
rows = list(csv.DictReader(open(f"{D}/metrics.tsv"), delimiter="\t"))
fmt = lambda v: f"{v / 1e6:.1f}M" if v >= 1e6 else f"{v / 1e3:.0f}K"
for ch in sorted({r["ch"] for r in rows}):
    R = [r for r in rows if r["ch"] == ch]
    scored = sorted([r for r in R if r["perf"]], key=lambda r: -float(r["perf"]))
    groups = {"top": scored[:12], "bottom": scored[-6:][::-1], "latest": sorted(R, key=lambda r: int(r["rank"]))[:6]}
    n = 0
    with open(f"{S}/{ch}.tsv", "w") as o:
        o.write("n\tgroup\tid\tviews\tperf\ttitle\tocr_text\n")
        for g, G in groups.items():
            args = []
            for r in G:
                n += 1
                perf = f"x{float(r['perf']):.1f}" if r["perf"] else "new"
                o.write(f"{n}\t{g}\t{r['id']}\t{r['views']}\t{perf}\t{r['title']}\t{r['text']}\n")
                args += ["-label", f"#{n}  {fmt(int(r['views']))}  {perf}", f"{D}/img/{r['id']}.jpg"]
            subprocess.run(["montage", *args, "-tile", "3x", "-geometry", "640x360+8+8", "-pointsize", "26", "-font", "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
                            "-background", "#dddddd", f"{S}/{ch}_{g}.jpg"], check=True)
    print(ch, n)
