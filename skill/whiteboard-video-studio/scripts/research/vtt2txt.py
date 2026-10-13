#!/usr/bin/env python3
"""YouTube .vtt -> readable transcript with delivery marks.
en-orig (ASR, word-timed) gives pauses: ' /' = 0.3-0.6 s gap, ' //' = 0.6 s+ gap, newline every 2.5 s+ gap.
Manual 'en' subs (punctuated) are written alongside as .clean.txt when present.
usage: vtt2txt.py subs/ txt/
"""
import re, sys, pathlib, json

TS = r"(\d+):(\d+):(\d+)\.(\d+)"
sec = lambda h, m, s, ms: int(h) * 3600 + int(m) * 60 + int(s) + int(ms) / 1000


def words_from_orig(text):
    out, cue_t = [], None
    for line in text.splitlines():
        m = re.match(TS + r" --> ", line)
        if m:
            cue_t = sec(*m.groups()); continue
        if "<c>" not in line and "<" not in line:
            continue
        # first word has the cue start; following words carry <ts> before them
        parts = re.split(r"<(" + r"\d+:\d+:\d+\.\d+" + r")>", line)
        first = re.sub(r"</?c[^>]*>", "", parts[0]).strip()
        if first:
            out.append((cue_t, first))
        for i in range(1, len(parts), 2):
            t = sec(*re.match(TS, parts[i]).groups())
            w = re.sub(r"</?c[^>]*>", "", parts[i + 1]).strip()
            if w:
                out.append((t, w))
    # dedupe (rolling captions repeat)
    seen, res = set(), []
    for t, w in out:
        k = (round(t, 2), w)
        if k not in seen:
            seen.add(k); res.append((t, w))
    res.sort(key=lambda x: x[0])
    return res


def clean_manual(text):
    lines, last = [], None
    for line in text.splitlines():
        if not line.strip() or "-->" in line or line.startswith(("WEBVTT", "Kind:", "Language:")) or re.match(r"^\d+$", line):
            continue
        line = re.sub(r"<[^>]+>", "", line).strip()
        if line and line != last:
            lines.append(line); last = line
    return " ".join(lines)


src, dst = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
dst.mkdir(exist_ok=True)
stats = {}
for f in sorted(src.glob("*.en-orig.vtt")):
    name = f.name.replace(".en-orig.vtt", "")
    W = words_from_orig(f.read_text())
    if len(W) < 50:
        continue
    buf, gaps = [], []
    for i, (t, w) in enumerate(W):
        if i:
            g = t - W[i - 1][0] - 0.25 * len(W[i - 1][1]) / 5  # rough: subtract spoken length of previous word
            gaps.append(g)
            buf.append("\n" if g > 2.5 else " // " if g > 0.6 else " / " if g > 0.3 else " ")
        buf.append(w)
    (dst / f"{name}.timed.txt").write_text("".join(buf))
    dur = W[-1][0] - W[0][0]
    stats[name] = {"words": len(W), "min": round(dur / 60, 2), "wpm": round(len(W) / (dur / 60)), "pauses_0.6+_per_min": round(sum(g > 0.6 for g in gaps) / (dur / 60), 1)}
    man = src / f"{name}.en.vtt"
    if man.exists():
        (dst / f"{name}.clean.txt").write_text(clean_manual(man.read_text()))
(dst / "_stats.json").write_text(json.dumps(stats, indent=1))
for k, v in stats.items():
    print(k, v)
