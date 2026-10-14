#!/usr/bin/env python3
"""Lint a marked-up script against references/script-writer.md before any voice is made.

usage: script_lint.py script.md [--long] [--wpm 182]
Markup (one beat per line):  `/` short beat, `//` long beat, `(fast)` / `(slow)` delivery,
`[J]` at the end of a line = this line lands a joke beat (needed for density checks).
Story card (comment lines, required; script-writer.md §0.5):
  # engine: mystery | mission | what-if | discovery | survival | versus | rise-and-fall
  # want: ...   # obstacle: ...   # stakes: ...   # question: ...   # change: ...
  # beat: BUT|THEREFORE|SO|AND ...   (one per story beat, in order; AND = just adds)
Exit code 1 if any FAIL.
"""
import re, sys

BANNED_GAGS = r"\b(monday|mondays|traffic|wi-?fi|whatsapp|electricity bill|your ex|group chat|kinder joy|netflix|instagram)\b"
BANNED_WORDS = r"\b(basically|actually|in this video|welcome back|smash|boom|surprise|lol)\b"
HYPE = r"!"
VAGUE = r"\b(some|many|other) (scientists|physicists|astronomers|researchers|experts)\b"

args = sys.argv[1:]
LONG, WPM = "--long" in args, float(args[args.index("--wpm") + 1]) if "--wpm" in args else 182.0
lines = open(args[0]).read().splitlines()
raw = [l.rstrip() for l in lines if l.strip() and not l.lstrip().startswith("#")]
card = {}
for l in lines:
    m = re.match(r"\s*#\s*(engine|want|obstacle|stakes|question|change|beat)\s*:\s*(.+)", l, re.I)
    if m: card.setdefault(m.group(1).lower(), []).append(m.group(2).strip())

def spoken(l):
    return re.sub(r"\[J[^\]]*\]|\((fast|slow)\)|//|/", " ", l)

res = []  # (level, msg)
def out(level, msg): res.append((level, msg))

# --- timing per line (words / wpm + marked pauses) ---
t, starts, joke_t = 0.0, [], []
for l in raw:
    starts.append(t)
    w = len(spoken(l).split())
    t += w / WPM * 60 + l.count("//") * 0.6 + (l.count("/") - 2 * l.count("//")) * 0.25
    if "[J" in l:
        joke_t.append(t)
total, words = t, sum(len(spoken(l).split()) for l in raw)
out("INFO", f"{words} words, ~{total:.0f} s at {WPM:.0f} wpm incl. beats, {len(joke_t)} joke beats")

# --- length ---
if not LONG and not (140 <= words <= 200):
    out("FAIL", f"1-min script should be 150-190 words (got {words})")

# --- sentences ---
text = " ".join(spoken(l) for l in raw)
sents = [s.strip() for s in re.split(r"(?<=[.?!])\s+|\"\s+", text) if len(s.split()) > 0]
lens = [len(s.split()) for s in sents]
short = sum(n <= 5 for n in lens) / len(lens)
longs = sum(n > 20 for n in lens) / len(lens)
mean = sum(lens) / len(lens)
out("INFO", f"{len(lens)} sentences, mean {mean:.1f} words, {short:.0%} <=5 words, {longs:.0%} >20 words")
if not (0.18 <= short <= 0.45): out("WARN", "aim for 20-30 % of sentences <= 5 words (punches, fragments)")
if longs > 0.125: out("WARN", "more than 1 in 8 sentences over 20 words: split them")

# --- banned content ---
for i, l in enumerate(raw, 1):
    s = spoken(l)
    for m in re.finditer(BANNED_GAGS, s, re.I): out("FAIL", f"line {i}: bolted-on relatable gag '{m.group(0)}' (Joke Law: build the joke from the fact)")
    for m in re.finditer(BANNED_WORDS, s, re.I): out("FAIL", f"line {i}: banned word '{m.group(0)}'")
    if re.search(HYPE, s): out("WARN", f"line {i}: '!' — narrator is calm; exclamation energy only inside a character's quote")
    if re.search(r"\d", s): out("FAIL", f"line {i}: digits — write numbers as words (TTS misreads them)")
    if re.search(VAGUE, s, re.I) and not re.search(r"\b(19|20)\d\d\b|nineteen|twenty|telescope|[A-Z][a-z]+ski\b", s):
        out("WARN", f"line {i}: vague '{re.search(VAGUE, s, re.I).group(0)}' — name who/what, or make them a character with a concrete reason")

# --- story spine (the owner: "no story, goal or motive... a 5-year-old's essay") ---
miss = [k for k in ("engine", "want", "obstacle", "stakes", "question", "change") if k not in card]
if miss: out("FAIL", f"story card missing: {', '.join(miss)} (# engine/want/obstacle/stakes/question/change, script-writer.md §0.5)")
beats = card.get("beat", [])
links = [b.split()[0].upper().rstrip(":,") for b in beats]
if len(beats) < (8 if LONG else 5): out("FAIL", f"{len(beats)} '# beat:' lines; need >= {8 if LONG else 5} (BUT / THEREFORE chain)")
elif sum(x == "AND" for x in links) > len(links) / 3: out("FAIL", f"{sum(x == 'AND' for x in links)}/{len(links)} beats are AND: a list, not a story — turn them into BUT / THEREFORE")
if beats and not any(x == "BUT" for x in links): out("WARN", "no BUT beat: nothing goes wrong, so nothing is at stake")
early = " ".join(spoken(l) for l in raw[: max(2, len(raw) // 6)])
if "?" not in early: out("WARN", "central question not spoken in the first ~10 s: say it (or its clear setup) out loud")

# --- hook ---
hook = " ".join(spoken(l) for l in raw[:3]).lower()
if not re.search(r"\byou\b|\bthis is\b|\bright now\b|\btonight\b|\?", hook):
    out("WARN", "hook: no 'you' / 'this is [dummy]' / 'right now' / question in the first lines")
first_words = " ".join(spoken(raw[0]).split()[:4]).lower()
if re.search(r"\b(in (19|20)\d\d|in (nineteen|twenty))", first_words):
    out("FAIL", "hook opens with a date — open with an image or question")

# --- jokes: density + gaps + ending ---
if not joke_t:
    out("FAIL", "no [J] marks — tag every line that lands a joke beat")
else:
    need = (2 * total / 60, 3.5 * total / 60) if LONG else (4, 7)
    if len(joke_t) < need[0]: out("FAIL", f"joke beats {len(joke_t)} < {need[0]:.0f} for this length")
    if len(joke_t) > need[1]: out("WARN", f"joke beats {len(joke_t)} > {need[1]:.0f}: room to breathe? (benchmarks keep 3-4 info lines between jokes)")
    gaps = [b - a for a, b in zip([0] + joke_t, joke_t)]
    if max(gaps) > 25 and not LONG: out("WARN", f"{max(gaps):.0f} s without a joke beat (limit ~25 s)")
    tail = 0.08 if not LONG else 0.15
    late = [x for x in joke_t if x > total * (1 - tail)]
    if late and "callback" not in raw[-1].lower(): out("WARN", f"joke in the last {tail:.0%} — end on the callback / quiet turn, not a new gag")

# --- callback: opening content words come back at the end ---
STOP = set("a an the and or but so of in on to is are be it its you your we our this that what if with for at as was were".split())
cw = lambda ls: {w for w in re.findall(r"[a-z']+", " ".join(spoken(l) for l in ls).lower()) if w not in STOP and len(w) > 3}
if len(cw(raw[:2]) & cw(raw[-3:])) < 2: out("WARN", "no callback: the ending should re-use the opening image")

# --- delivery marks ---
marks = sum(l.count("/") for l in raw)
if marks < len(raw): out("WARN", "few beat marks — mark / before punch words, // after punches and at section changes")
for i, l in enumerate(raw, 1):
    if "[J" in l and "/" not in l and (i == 1 or not raw[i - 2].rstrip().endswith("/")):
        out("WARN", f"line {i}: joke line with no beat around it — add / before the punch word or // after it")

order = {"FAIL": 0, "WARN": 1, "INFO": 2}
for lvl, msg in sorted(res, key=lambda r: order[r[0]]):
    print(f"{lvl:4}  {msg}")
fails = sum(r[0] == "FAIL" for r in res)
print(f"\n{'FAIL' if fails else 'PASS'}: {fails} fail(s), {sum(r[0] == 'WARN' for r in res)} warning(s)")
sys.exit(1 if fails else 0)
