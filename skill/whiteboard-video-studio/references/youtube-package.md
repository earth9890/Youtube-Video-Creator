# YouTube package
> Colour/thumbnail/title evidence and examples: `craft-playbook.md` §G–§H. Test thumbnails with YouTube Test & Compare (up to 3).

## Title (give 5, recommend 1)
≤ 60 chars (no truncation), front-load the hook, no clickbait the video can't pay off. Formulas:
1. *Why Most People Quit (And You Shouldn't)* — contrarian + stake
2. *Show Up Every Day. Even When Nobody's Watching.* — emotional imperative
3. *The One Habit Nobody Tells You About* — curiosity gap
4. *You Don't Need Talent. You Need This.* — remove-excuse
5. *Never Give Up: Do This Every Single Day* — direct promise
Pair with the thumbnail: the thumbnail text and title must not repeat; thumbnail = the hook, title = the promise.

## Thumbnail (1280×720, < 2 MB, readable at 160 px wide)
`brand/thumbs.py` makes 3 variants (run `python3 thumbs.py` in a folder with `gen.py`, `PatrickHand.ttf`, `Caveat.ttf`):
- **Dark staircase**: `MOST PEOPLE QUIT HERE.` ("QUIT" red) — sitters give up, hero climbs to flag.
- **White calendar**: `SHOW UP. EVERY DAY.` ("DAY" green) — ticked calendar, umbrella hero.
- **Brand black hole**: `NEVER GIVE UP.` ("UP." orange) — glowing black hole.
Rules: ≤ 4 words, huge hand-drawn caps, 1 accent color, 1 doodle, lots of empty space, same family as channel art. Fonts: Patrick Hand + Caveat (download: `https://github.com/google/fonts/raw/main/ofl/patrickhand/PatrickHand-Regular.ttf`, `.../ofl/caveat/Caveat%5Bwght%5D.ttf`). Render with headless Chrome (`--screenshot`, `--window-size=1280,720`).

## Description template
```
<Hook sentence that restates the video's promise.>

<2–3 line summary with the keyword once.>

⏱ Chapters
0:00 Intro
0:XX <clause from script> ...   (use clip start times from clipt.json minus lead if desired; first chapter must be 0:00; ≥ 3 chapters, ≥ 10 s each)

<CTA: subscribe + one-line reason, e.g. "New videos on discipline, focus and never quitting.">

#motivation #discipline #nevergiveup #selfimprovement
```
Tags: 8–12, mix broad (motivation, self improvement) and specific (never give up, consistency, show up every day). Pinned comment: one question that invites a personal answer ("What's one thing you showed up for today?").
Also supply: Shorts cut (first 55 s, 9:16 re-layout) if asked; end-screen text.

## Channel art (brand/gen.py → logos/, banners/)
- Logo 800×800 (shown as circle; keep content inside r=380). Variants: hero-on-horizon (no figure if user says so), BHL monogram, doodle, galaxy ring text, flat eclipse. User preference (Black Hole Life): logos 1 & 2, banners 1 & 2; **no stick man on logos**.
- Banner 2560×1440. Safe zones (from YouTube Studio crop UI): all devices x 507–2053, y 508–931; desktop full width y 508–931; TV full. Title + tagline inside all-devices box; decorative mountain/hole/hero only outside x 507–2053. Verify with an overlay rectangle before delivering.
- Brand: black hole (orange `#ff7a18`/gold `#ffb347` ring on near-black), handwritten + wide sans, tagline "show up. every day. never give up."
