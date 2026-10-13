"""Thumbnail lint: measures a built thumbnail against what the 8-channel study found (references/thumbnail-designer.md).

usage: ~/.venvs/pocket/bin/python thumb_check.py thumbnails/a.png [b.png ...] [--space | --white]
  --space   cosmic topic: wants >= 40 % near-black (space hits x1.21-1.32 vs x1.00-1.12 under 20 %)
  --white   comedy white-page variant (Sam O'Nella / Casually Explained): skips the blank-white-page check
Also writes <name>_grid.jpg: the thumbnail at YouTube-feed size among 11 real hits from the study. READ it.
Exits 1 on any FAIL.
"""
import json, os, random, subprocess, sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "research"))
from thumb_metrics import pixels  # noqa: E402

H = os.path.dirname(os.path.abspath(__file__))
STUDY = os.path.expanduser("~/videos/research/thumbs")
OCR = os.path.expanduser("~/.cache/whiteboard-video-studio/ocr")
DANGER = {"ILLEGAL", "BANNED", "SECRET", "DEADLY", "DEATH", "DEAD", "NUKE", "NUCLEAR", "FRAUD", "MISTAKE", "WRONG",
          "FORBIDDEN", "TRAPPED", "NO", "NEVER", "IMPOSSIBLE", "LOST", "DIDN'T", "CAN'T"}


def ocr(path):
    if not os.path.exists(OCR):
        os.makedirs(os.path.dirname(OCR), exist_ok=True)
        subprocess.run(["swiftc", "-O", f"{H}/research/ocr.swift", "-o", OCR], check=True)
    o = json.loads(subprocess.run([OCR, path], capture_output=True, text=True, check=True).stdout)
    return [l for l in o["lines"] if l["c"] >= 0.5 and l["h"] >= 0.045]   # same filter as the study


def grid(path):
    """Our thumbnail at feed size (360 px) in a 4x3 grid of real hits (perf >= 2), 1-2 per channel so HAI's 579 don't dominate."""
    import csv
    rows = [r for r in csv.DictReader(open(f"{STUDY}/metrics.tsv"), delimiter="\t") if r["perf"] and float(r["perf"]) >= 2]
    rnd = random.Random(path)
    by = {}
    for r in rows:
        by.setdefault(r["ch"], []).append(r)
    for v in by.values():
        rnd.shuffle(v)
    rr = [r for k in range(2) for c in sorted(by) for r in by[c][k:k + 1]]   # round-robin: one per channel, then a second
    pick = [f"{STUDY}/img/{r['id']}.jpg" for r in rr[:11]]
    pick.insert(random.Random(path + "x").randrange(12), path)
    out = os.path.splitext(path)[0] + "_grid.jpg"
    subprocess.run(["montage", *pick, "-tile", "4x3", "-geometry", "360x203+10+10", "-background", "#0f0f0f", "-font", "/System/Library/Fonts/Supplemental/Arial Bold.ttf", out], check=True)
    return out


def check(path, space, white):
    res = []
    add = lambda lvl, msg: res.append((lvl, msg))
    p = pixels(path)
    L = ocr(path)
    words = sum(len(l["t"].split()) for l in L)
    text = " / ".join(l["t"] for l in L)
    th = max((l["h"] for l in L), default=0)

    # words: 1-3 words are 68 % of hits vs 40 % of flops; 4-5 words 12 % vs 29 %
    if words == 0:
        add("INFO", "no text: fine only when the image itself is the question (B archetype, 'inside' views)")
    elif words <= 3:
        add("PASS", f"{words} words: {text}")
    elif words <= 5:
        add("WARN", f"{words} words ({text}): 4-5 words were 2.4x more common in flops; cut to 1-3")
    else:
        add("FAIL", f"{words} words ({text}): too many to read at feed size")
    if words and th < 0.10:
        add("FAIL", f"text height {th:.2f} of frame: hits use 0.16-0.24 (Kurzgesagt 0.167, Zenn 0.24)")
    elif words and th < 0.14:
        add("WARN", f"text height {th:.2f} of frame: hits use 0.16-0.24")
    elif words:
        add("PASS", f"text height {th:.2f} of frame")
    if words and not DANGER & {w.strip("?!.,").upper() for w in text.split()}:
        add("INFO", "no stakes word (NO, NEVER, LOST, ILLEGAL, DEADLY...): on HAI they raised the hit rate 5.3x")
    # duration badge: bottom-right ~300x90 at 1920
    if any(l["x"] + l["w"] > 0.84 and l["y"] + l["h"] > 0.9 for l in L):
        add("FAIL", "text under the duration badge (bottom-right 300x90)")

    # clutter: Kurzgesagt tops 0.156; Zenn's busiest tile (0.42) flopped inside an 8M-view series
    e = p["edges"]
    add("PASS" if e <= 0.25 else "WARN" if e <= 0.32 else "FAIL", f"clutter (edges) {e:.3f}: keep <= 0.25, flops ran 0.30-0.42")
    if space:
        b = p["black"]
        add("PASS" if b >= 0.40 else "WARN", f"near-black share {b:.0%}: space hits want >= 40 %")
    if not white and p["white"] > 0.55:
        add("FAIL", f"white share {p['white']:.0%}: a blank white page is Zenn's flop mode (0.62 bottom vs 0.15 top)")
    add("INFO", f"palette {p['c1']} {p['c2']} {p['c3']}  lum {p['lum']:.2f}  sat {p['sat']:.2f}  contrast {p['contrast']:.2f}")
    return res


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    bad = False
    for f in args:
        print(f"\n{f}")
        for lvl, msg in check(f, "--space" in sys.argv, "--white" in sys.argv):
            print(f"  {lvl:4}  {msg}")
            bad |= lvl == "FAIL"
        if os.path.exists(f"{STUDY}/metrics.tsv"):
            print(f"  GRID  {grid(f)}  <- READ it: is yours the one the eye lands on?")
    sys.exit(1 if bad else 0)
