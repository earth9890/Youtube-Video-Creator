# Overnight "What If" batch: script brief (episodes 39–44, 2026-10-22)

The owner wants six 8–9 min "What If…?" videos that people are *forced* to open: kid-like, out-of-the-box questions,
answered with real science and a funny Dave story. Model episode: **`episodes/38-full-brain/script.md`** (read it fully:
header comments, cast voices, runner object, chapter rhythm, twist, callback landing) and `episodes/31-moon-disappeared/`.

Everything in `LONGFORM-BRIEF.md` still applies (no copying anyone's script, every fact verified with an exact quote in
`sources.md`, skill references, lint, self-score, beat sheet, `title.md`), **with these changes:**

## Length and clips (faster voicing)
- **1,350–1,400 spoken words** (≈ 8–8.5 min after our 0.9× slow-down; measured 2.8 words/s).
- **Fewer, longer clips:** most clips 12–30 words. Use `/` and `//` sparingly (a long beat where a joke or turn needs air),
  aim for ≤ 85 clips. Never a clip under 6 words (VoiceStudio garbles them); fragments go on one line without slashes.
  Check with the clip-count snippet at the bottom.

## Voices (cast)
- Narrator = The Storyteller (no tag). **Dave speaks** in his own voice: put `(@dave)` on any line with Dave's "quote".
- Optional extra characters, one tag per line, quotes ≥ 6 words, character lines ≤ 15 % of all words:
  `(@brain)` Dave's Brain, a tired librarian who shushes (recurring from ep38), `(@doc)` a calm woman expert/doctor/scientist,
  `(@news)` a TV news anchor, `(@kid)` a small child, `(@old)` a grumpy old sea-captain type.
- Put the cast line in the header, only the tags you use, e.g.
  `# cast: dave=22393bee,brain=7f7a5b5c,doc=a2e5e553,news=98c553e7,kid=c2c98dae,old=1e82d11e`

## The hook ("forced to open")
- First line = the absurd premise as an image ("Dave has decided to eat three hundred grams of protein today. Before lunch.").
- Title question aloud by ~0:20. Then a promise of escalation ("by hour six, his kidneys file a complaint").
- Escalate in time steps or levels (hour 1 → 6 → day 3, or 10 → 50 → 100), each a chapter with a real number from
  sources.md. Twist at 70–85 %. Land on a callback to the first image; last line short.

## Safety (hard)
- Body/food/drink topics: real science, no medical advice, no doses or how-to; say plainly when something is dangerous
  and that it's a thought experiment ("please don't try this"). Cite health bodies (FDA, EFSA, NHS, WHO) for limits.
- No real people as characters or likenesses; no brands as the subject (say "energy drink", not a brand name).
- Kind, curious, funny-from-facts. No gore, nothing scary for its own sake.

## Output
`episodes/<NN>-<slug>/script.md`, `sources.md`, `title.md` (5 options, the given pick first, plus clickbait-scene
thumbnail idea A and old-style idea B per `references/thumbnail-designer.md` ★ section). Lint must PASS:
`python3 ~/.claude/skills/whiteboard-video-studio/scripts/script_lint.py script.md --long`.

Clip count check (run from the episode folder):
```
python3 -c "
src=open('/Users/harish/.claude/skills/whiteboard-video-studio/scripts/voice.py').read(); ns={}
exec(src[src.index('import hashlib'):src.index('a = sys.argv[1:]')].replace('import numpy as np, soundfile as sf',''), ns)
it=ns['parse_md']('script.md'); print(len(it),'clips'); [print(i,len(x[0].split()),x) for i,x in enumerate(it) if len(x[0].split())<6]"
```
Do not voice, build, render, upload or touch git. Use `trash`, never `rm`.
Final reply: folder, title, word count, clip count, lint result, self-score, chapter list, cast used, unsure facts.
